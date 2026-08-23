/**
 * Cross-artifact checks over the Phase 1 and Phase 2A registries: public
 * checks (dependencies, tolerance completeness), reason codes
 * (applicability), state invariants, public-contract-surface path
 * resolution, interpretation-bundle tuple pinning, and requirement ->
 * schema -> fixture traceability. Conflicts fail validation (NRS-GOV-0003).
 */

import {
  computeSpkiSha256Fingerprint,
  type TrustRoot,
} from "../../../reference/verifier/src/attestation.js";
import { exists, loadJson, loadYaml, type Issue } from "../lib/repo.js";
import type { RequirementsRegistry } from "../lib/types.js";
import { loadConformanceFixtures } from "./conformance.js";
import { compilePhase1Schemas } from "./schemas.js";

interface PublicChecksRegistry {
  registry: string;
  check_sets: Array<{ version: string; check_ids: string[] }>;
  checks: Array<{
    check_id: string;
    version: string;
    requirement_ids: string[];
    depends_on?: string[];
    dependency_propagation?: string;
    tolerance_policy: {
      kind: string;
      numeric_tolerances?: Record<string, { absolute: number; relative: number }>;
    };
  }>;
}

interface ReasonCodesRegistry {
  registry: string;
  codes: Array<{
    id: string;
    applicable_check_ids: string[];
    requirement_ids: string[];
  }>;
}

interface StateInvariantsRegistry {
  registry: string;
  invariants: Array<{
    invariant_id: string;
    requirement_ids: string[];
    failure_reason_code: string | null;
  }>;
}

interface SurfacesRegistryFile {
  entries: Array<{
    surface_id: string;
    paths: string[];
    applies_to_bundle_ids: string[];
    paths_resolve_in: string;
    requirement_ids: string[];
    schema_refs: string[];
  }>;
}

interface BundlesRegistryFile {
  entries: Array<{
    bundle_id: string;
    schema_version: string;
    canonicalization_version: string;
    profile_id: string;
    public_check_set_version: string;
    allowed_check_ids: string[];
    schema_refs: string[];
    conformance_manifest_ref: string;
  }>;
}

const WELCH_TOLERANCE_KEYS_01 = [
  "mean",
  "sample_variance",
  "mean_difference",
  "test_statistic",
  "degrees_of_freedom",
  "p_value",
];

const WELCH_TOLERANCE_KEYS_02 = [
  "mean",
  "sample_variance",
  "estimate",
  "standard_error",
  "test_statistic",
  "degrees_of_freedom",
  "p_value",
  "ci_lower",
  "ci_upper",
];

type SchemaNode = Record<string, unknown>;

/** Resolve a $ref (URN with optional fragment, or local fragment) to a node. */
function deref(
  node: SchemaNode,
  owner: string,
  byId: Map<string, { schema: Record<string, unknown> }>,
): { node: SchemaNode; owner: string } | null {
  const ref = node["$ref"];
  // Draft 2020-12 allows $ref alongside other keywords; when the node itself
  // declares structure, use it directly instead of chasing the $ref.
  if (typeof ref !== "string" || node["properties"] !== undefined || node["items"] !== undefined) {
    return { node, owner };
  }
  let targetId = owner;
  let fragment = "";
  if (ref.startsWith("#")) {
    fragment = ref.slice(1);
  } else {
    const [id, frag] = ref.split("#", 2);
    targetId = id as string;
    fragment = frag ?? "";
  }
  const target = byId.get(targetId);
  if (target === undefined) return null;
  let current: unknown = target.schema;
  if (fragment !== "") {
    for (const part of fragment.split("/").filter((p) => p !== "")) {
      if (typeof current !== "object" || current === null) return null;
      current = (current as SchemaNode)[part];
    }
  }
  if (typeof current !== "object" || current === null) return null;
  return deref(current as SchemaNode, targetId, byId);
}

/** Resolve a dotted surface path (with [] for arrays) inside a schema. */
function surfacePathResolves(
  rootId: string,
  path: string,
  byId: Map<string, { schema: Record<string, unknown> }>,
): boolean {
  const root = byId.get(rootId);
  if (root === undefined) return false;
  let state = deref(root.schema as SchemaNode, rootId, byId);
  if (state === null) return false;

  for (const rawSegment of path.split(".")) {
    const isArray = rawSegment.endsWith("[]");
    const name = isArray ? rawSegment.slice(0, -2) : rawSegment;
    const properties = state.node["properties"];
    if (typeof properties !== "object" || properties === null) return false;
    const child = (properties as SchemaNode)[name];
    if (typeof child !== "object" || child === null) return false;
    state = deref(child as SchemaNode, state.owner, byId);
    if (state === null) return false;
    if (isArray) {
      const items = state.node["items"];
      if (typeof items !== "object" || items === null) return false;
      state = deref(items as SchemaNode, state.owner, byId);
      if (state === null) return false;
    }
  }
  return true;
}

export function runPhase1CrossChecks(requirements: RequirementsRegistry): Issue[] {
  const check = "phase1-cross-checks";
  const issues: Issue[] = [];
  const knownRequirements = new Set(requirements.requirements.map((r) => r.id));

  const publicChecks = loadYaml<PublicChecksRegistry>("registries/public-checks.yaml");
  const reasonCodes = loadYaml<ReasonCodesRegistry>("registries/reason-codes.yaml");
  const invariants = loadYaml<StateInvariantsRegistry>("registries/state-invariants.yaml");
  const surfaces = loadYaml<SurfacesRegistryFile>("registries/public-contract-surfaces.yaml");
  const bundles = loadYaml<BundlesRegistryFile>("registries/interpretation-bundles.yaml");
  const { byId, issues: schemaIssues } = compilePhase1Schemas();
  issues.push(...schemaIssues);

  const checkIds = new Set(publicChecks.checks.map((c) => c.check_id));
  const reasonCodeIds = new Set(reasonCodes.codes.map((c) => c.id));
  const bundleIds = new Set(bundles.entries.map((b) => b.bundle_id));
  const checkSetByVersion = new Map(publicChecks.check_sets.map((s) => [s.version, s.check_ids]));

  // Public check registry: references, sets, dependencies, tolerances.
  for (const set of publicChecks.check_sets) {
    for (const id of set.check_ids) {
      if (!checkIds.has(id)) {
        issues.push({ check, message: `check set ${set.version} lists unregistered check ${id}` });
      }
    }
  }
  for (const entry of publicChecks.checks) {
    for (const req of entry.requirement_ids) {
      if (!knownRequirements.has(req)) {
        issues.push({ check, message: `check ${entry.check_id} references unknown ${req}` });
      }
    }
    if (!entry.check_id.endsWith(`:${entry.version}`)) {
      issues.push({
        check,
        message: `check ${entry.check_id} does not end with its version ${entry.version}`,
      });
    }
    for (const dep of entry.depends_on ?? []) {
      if (!checkIds.has(dep)) {
        issues.push({ check, message: `check ${entry.check_id} depends on unregistered ${dep}` });
      }
    }
    if (entry.depends_on !== undefined && entry.dependency_propagation === undefined) {
      issues.push({
        check,
        message: `check ${entry.check_id} declares depends_on without a dependency_propagation rule`,
      });
    }
  }
  for (const [version, keys] of [
    ["0.1.0-draft.1", WELCH_TOLERANCE_KEYS_01],
    ["0.2.0-draft.1", WELCH_TOLERANCE_KEYS_02],
  ] as const) {
    const welch = publicChecks.checks.find(
      (c) => c.check_id === `urn:nomue:check:welch-recompute:${version}`,
    );
    const tolerances = welch?.tolerance_policy.numeric_tolerances ?? {};
    for (const key of keys) {
      if (tolerances[key] === undefined) {
        issues.push({
          check,
          message: `welch-recompute ${version} tolerance for ${key} is missing`,
        });
      }
    }
  }

  // Reason codes.
  for (const code of reasonCodes.codes) {
    for (const checkId of code.applicable_check_ids) {
      if (!checkIds.has(checkId)) {
        issues.push({
          check,
          message: `reason code ${code.id} references unknown check ${checkId}`,
        });
      }
    }
    for (const req of code.requirement_ids) {
      if (!knownRequirements.has(req)) {
        issues.push({ check, message: `reason code ${code.id} references unknown ${req}` });
      }
    }
  }

  // State invariants.
  for (const invariant of invariants.invariants) {
    if (
      invariant.failure_reason_code !== null &&
      !reasonCodeIds.has(invariant.failure_reason_code)
    ) {
      issues.push({
        check,
        message: `invariant ${invariant.invariant_id} references unregistered reason code ${invariant.failure_reason_code}`,
      });
    }
    for (const req of invariant.requirement_ids) {
      if (!knownRequirements.has(req)) {
        issues.push({
          check,
          message: `invariant ${invariant.invariant_id} references unknown ${req}`,
        });
      }
    }
  }

  // Public contract surfaces: refs exist; bundles known; paths resolve in the
  // declared schema.
  for (const surface of surfaces.entries) {
    for (const ref of surface.schema_refs) {
      if (!exists(ref)) {
        issues.push({
          check,
          message: `surface ${surface.surface_id} schema_ref ${ref} does not exist`,
        });
      }
    }
    for (const req of surface.requirement_ids) {
      if (!knownRequirements.has(req)) {
        issues.push({ check, message: `surface ${surface.surface_id} references unknown ${req}` });
      }
    }
    for (const bundleId of surface.applies_to_bundle_ids) {
      if (!bundleIds.has(bundleId)) {
        issues.push({
          check,
          message: `surface ${surface.surface_id} applies to unregistered bundle ${bundleId}`,
        });
      }
    }
    if (!exists(surface.paths_resolve_in)) {
      issues.push({
        check,
        message: `surface ${surface.surface_id} paths_resolve_in ${surface.paths_resolve_in} does not exist`,
      });
      continue;
    }
    const rootSchema = loadJson<Record<string, unknown>>(surface.paths_resolve_in);
    const rootId = rootSchema["$id"];
    if (typeof rootId !== "string" || !byId.has(rootId)) {
      issues.push({
        check,
        message: `surface ${surface.surface_id} paths_resolve_in ${surface.paths_resolve_in} is not a compiled schema`,
      });
      continue;
    }
    for (const path of surface.paths) {
      if (!surfacePathResolves(rootId, path, byId)) {
        issues.push({
          check,
          message: `surface ${surface.surface_id}: path ${path} does not resolve in ${rootId}`,
        });
      }
    }
  }

  // Interpretation bundle tuples: each bundle's pins are consistent with its
  // own record schema (found via schema_refs) and the check-set registry.
  for (const bundle of bundles.entries) {
    for (const ref of bundle.schema_refs) {
      if (!exists(ref)) {
        issues.push({
          check,
          message: `bundle ${bundle.bundle_id} schema_ref ${ref} does not exist`,
        });
      }
    }
    if (!exists(bundle.conformance_manifest_ref)) {
      issues.push({
        check,
        message: `bundle ${bundle.bundle_id} conformance_manifest_ref does not exist`,
      });
    }
    for (const checkId of bundle.allowed_check_ids) {
      if (!checkIds.has(checkId)) {
        issues.push({
          check,
          message: `bundle ${bundle.bundle_id} allows unregistered check ${checkId}`,
        });
      }
    }

    const setIds = checkSetByVersion.get(bundle.public_check_set_version);
    if (setIds === undefined) {
      issues.push({
        check,
        message: `bundle ${bundle.bundle_id} pins unknown check set ${bundle.public_check_set_version}`,
      });
    } else if (
      JSON.stringify([...bundle.allowed_check_ids].sort()) !== JSON.stringify([...setIds].sort())
    ) {
      issues.push({
        check,
        message: `bundle ${bundle.bundle_id} allowed_check_ids differ from check set ${bundle.public_check_set_version}`,
      });
    }

    let recordSchema: Record<string, unknown> | undefined;
    for (const ref of bundle.schema_refs) {
      if (!exists(ref)) continue;
      const schema = loadJson<Record<string, unknown>>(ref);
      const id = schema["$id"];
      if (typeof id === "string" && id.startsWith("urn:nomue:schema:record:")) {
        recordSchema = schema;
        break;
      }
    }
    if (recordSchema === undefined) {
      issues.push({
        check,
        message: `bundle ${bundle.bundle_id} schema_refs name no record schema`,
      });
      continue;
    }
    const recordProps = (recordSchema["properties"] ?? {}) as SchemaNode;
    const profileConst = (recordProps["profile_id"] as SchemaNode | undefined)?.["const"];
    const integrityDef = (
      (recordSchema["$defs"] as SchemaNode | undefined)?.["integrity"] as SchemaNode | undefined
    )?.["properties"] as SchemaNode | undefined;
    const canonicalizationConst = (
      integrityDef?.["canonicalization_id"] as SchemaNode | undefined
    )?.["const"];
    const recordSchemaVersion = (recordSchema["$id"] as string).split(":").pop();

    if (bundle.profile_id !== profileConst) {
      issues.push({
        check,
        message: `bundle ${bundle.bundle_id} profile ${bundle.profile_id} differs from record schema const ${String(profileConst)}`,
      });
    }
    if (bundle.canonicalization_version !== canonicalizationConst) {
      issues.push({
        check,
        message: `bundle ${bundle.bundle_id} canonicalization differs from record schema const ${String(canonicalizationConst)}`,
      });
    }
    if (bundle.schema_version !== recordSchemaVersion) {
      issues.push({
        check,
        message: `bundle ${bundle.bundle_id} schema_version ${bundle.schema_version} differs from record schema version ${String(recordSchemaVersion)}`,
      });
    }
  }

  // Requirement -> schema -> fixture traceability.
  const fixtureIds = new Set(loadConformanceFixtures().map((f) => f.fixture.fixture_id));
  for (const requirement of requirements.requirements) {
    for (const ref of requirement.schema_refs) {
      if (!exists(ref)) {
        issues.push({ check, message: `${requirement.id} schema_ref ${ref} does not exist` });
      }
    }
    for (const ref of requirement.conformance_refs) {
      if (!fixtureIds.has(ref)) {
        issues.push({
          check,
          message: `${requirement.id} conformance_ref ${ref} is not a registered fixture`,
        });
      }
    }
  }

  // Fixture-level referential integrity, including reason-code applicability:
  // a code pinned on a check outside its registered applicable_check_ids is a
  // cross-artifact conflict (blocks release per NRS-GOV-0003).
  const applicability = new Map(
    reasonCodes.codes.map((c) => [c.id, new Set(c.applicable_check_ids)]),
  );
  const conformanceCheckIds = new Set([
    "urn:nomue:check:record-conformance:0.1.0-draft.1",
    "urn:nomue:check:record-conformance:0.2.0-draft.1",
  ]);
  const checkApplicability = (fixtureId: string, code: string, checkId: string): void => {
    if (!reasonCodeIds.has(code)) {
      issues.push({
        check,
        message: `fixture ${fixtureId} expects unregistered reason code ${code}`,
      });
      return;
    }
    if (applicability.get(code)?.has(checkId) !== true) {
      issues.push({
        check,
        message: `fixture ${fixtureId} pins ${code} on ${checkId}, outside the code's registered applicable_check_ids`,
      });
    }
  };

  for (const { fixture } of loadConformanceFixtures()) {
    for (const req of fixture.requirement_ids) {
      if (!knownRequirements.has(req)) {
        issues.push({
          check,
          message: `fixture ${fixture.fixture_id} references unknown ${req}`,
        });
      }
    }
    const expected = fixture.expected as {
      conformance_check_id?: string;
      conformance?: { reason_codes: string[] };
      checks?: Array<{ check_id: string; reason_codes: string[] }>;
      refusal_reason_codes?: string[];
    };
    const conformanceId =
      expected.conformance_check_id !== undefined &&
      conformanceCheckIds.has(expected.conformance_check_id)
        ? expected.conformance_check_id
        : "urn:nomue:check:record-conformance:0.1.0-draft.1";
    for (const code of expected.conformance?.reason_codes ?? []) {
      checkApplicability(fixture.fixture_id, code, conformanceId);
    }
    for (const expectedCheck of expected.checks ?? []) {
      for (const code of expectedCheck.reason_codes) {
        checkApplicability(fixture.fixture_id, code, expectedCheck.check_id);
      }
    }
    for (const code of expected.refusal_reason_codes ?? []) {
      // Refusals are not check results; only registration is required.
      if (!reasonCodeIds.has(code)) {
        issues.push({
          check,
          message: `fixture ${fixture.fixture_id} expects unregistered reason code ${code}`,
        });
      }
    }
  }

  // Trust root (NRS-ATTEST-0007/0008): every pinned key must reference an
  // ADOPTED signature suite, carry a fingerprint that re-derives from its
  // own PEM, and follow the supersession discipline. An empty key list is
  // the legitimate pre-ceremony state and passes vacuously.
  const suites = loadYaml<{ suites: Array<{ suite_id: string; status: string }> }>(
    "registries/attestation-signature-suites.yaml",
  );
  const adoptedSuiteIds = new Set(
    suites.suites.filter((s) => s.status === "adopted").map((s) => s.suite_id),
  );
  const trustRoot = loadYaml<TrustRoot>("registries/attestation-trust-root.yaml");
  const keyIds = new Set(trustRoot.keys.map((k) => k.key_id));
  for (const key of trustRoot.keys) {
    if (!adoptedSuiteIds.has(key.suite_id)) {
      issues.push({
        check,
        message: `trust root key ${key.key_id} references non-adopted suite ${key.suite_id}`,
      });
    }
    let derived: string;
    try {
      derived = computeSpkiSha256Fingerprint(key.public_key_pem);
    } catch (err) {
      issues.push({
        check,
        message: `trust root key ${key.key_id} public key does not parse: ${String(err)}`,
      });
      continue;
    }
    if (derived !== key.fingerprint) {
      issues.push({
        check,
        message: `trust root key ${key.key_id} fingerprint ${key.fingerprint} does not match derived ${derived}`,
      });
    }
    if (key.status === "superseded" && key.superseded_by === null) {
      issues.push({
        check,
        message: `trust root key ${key.key_id} is superseded but names no successor`,
      });
    }
    if (key.superseded_by !== null && !keyIds.has(key.superseded_by)) {
      issues.push({
        check,
        message: `trust root key ${key.key_id} superseded_by ${key.superseded_by} is not a registered key`,
      });
    }
  }

  return issues;
}
