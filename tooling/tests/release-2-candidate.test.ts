import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";
import { loadRequirements } from "../src/lib/load.js";
import { exists, loadJson, loadYaml, readText } from "../src/lib/repo.js";
import { loadVerifierResources } from "../../reference/verifier/src/resources.js";
import { routeParsedInput, verifyRecordText } from "../../reference/verifier/src/verify.js";
import {
  validateExactDispatchMigrationMatrix,
  validatePairedCandidateRelationships,
  validatePublicContractSurfaceImpact,
  validateProtocolIdentifierCandidates,
  validateRequirementNamespaceCandidates,
  type ExactDispatchMigrationMatrix,
  type PairedCandidateRecord,
  type PairedCandidateRelationshipCode,
  type ProtocolIdentifierCandidateFile,
  type PublicContractSurfaceImpactCandidate,
  type RequirementNamespaceCandidateFile,
} from "../src/spikes/release-2-candidate.js";

const CANDIDATE_ROOT = "governance/drafts/release-2-candidate";
const RECORD_SCHEMA_ID = "https://nomue.ai/id/schema/record/0.3.0-draft.1";
const REPORT_SCHEMA_ID = "https://nomue.ai/id/schema/verification-report/0.3.0-draft.1";

interface FixtureMutation {
  operation: "add" | "replace" | "remove";
  path: string;
  value?: unknown;
}

interface FixtureEntry {
  candidate_key: string;
  mutations: FixtureMutation[];
  expected_schema_valid: boolean;
  expected_schema_keyword?: string;
  expected_relationship_codes?: PairedCandidateRelationshipCode[];
}

interface FixtureManifest {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  source: string;
  entries: FixtureEntry[];
}

interface AuthorityManifest {
  targets: Array<{ authoritative_artifacts: string[] }>;
  artifacts: Array<{ path: string; class: string }>;
}

interface BundleRegistry {
  entries: Array<{ bundle_id: string; schema_refs: string[] }>;
}

interface PublicSurfaceRegistry {
  entries: Array<{ surface_id: string; paths: string[] }>;
}

interface CompiledCandidateSchemas {
  validateRecord: ValidateFunction;
  validateReport: ValidateFunction;
  byId: Map<string, Record<string, unknown>>;
}

function compileCandidateSchemas(): CompiledCandidateSchemas {
  const ajv = new Ajv2020({
    allErrors: true,
    strictSchema: true,
    strictTypes: true,
    strictRequired: false,
  });
  const schemas = [
    loadJson<Record<string, unknown>>("schemas/common/identifier.schema.json"),
    loadJson<Record<string, unknown>>(
      `${CANDIDATE_ROOT}/schemas/paired-two-condition-continuous-0.1.candidate.schema.json`,
    ),
    loadJson<Record<string, unknown>>(`${CANDIDATE_ROOT}/schemas/record-0.3.candidate.schema.json`),
    loadJson<Record<string, unknown>>(
      `${CANDIDATE_ROOT}/schemas/execution-outcome-0.3.candidate.schema.json`,
    ),
    loadJson<Record<string, unknown>>(
      `${CANDIDATE_ROOT}/schemas/verification-report-0.3.candidate.schema.json`,
    ),
  ];
  schemas.forEach((schema) => ajv.addSchema(schema));
  const validateRecord = ajv.getSchema(RECORD_SCHEMA_ID);
  const validateReport = ajv.getSchema(REPORT_SCHEMA_ID);
  if (validateRecord === undefined || validateReport === undefined) {
    throw new Error("candidate Record or report schema did not compile");
  }
  return {
    validateRecord,
    validateReport,
    byId: new Map(schemas.map((schema) => [String(schema["$id"]), schema])),
  };
}

function decodePointerSegment(segment: string): string {
  return segment.replaceAll("~1", "/").replaceAll("~0", "~");
}

function applyMutation(root: unknown, mutation: FixtureMutation): void {
  if (!mutation.path.startsWith("/")) throw new Error(`invalid JSON pointer ${mutation.path}`);
  const segments = mutation.path.slice(1).split("/").map(decodePointerSegment);
  const finalSegment = segments.pop();
  if (finalSegment === undefined) throw new Error(`empty JSON pointer ${mutation.path}`);

  let parent: unknown = root;
  for (const segment of segments) {
    if (Array.isArray(parent)) {
      const index = Number(segment);
      if (!Number.isInteger(index) || index < 0 || index >= parent.length) {
        throw new Error(`array pointer does not resolve: ${mutation.path}`);
      }
      parent = parent[index];
    } else if (typeof parent === "object" && parent !== null) {
      if (!Object.prototype.hasOwnProperty.call(parent, segment)) {
        throw new Error(`object pointer does not resolve: ${mutation.path}`);
      }
      parent = (parent as Record<string, unknown>)[segment];
    } else {
      throw new Error(`pointer does not resolve: ${mutation.path}`);
    }
  }

  if (Array.isArray(parent)) {
    if (mutation.operation === "add" && finalSegment === "-") {
      parent.push(mutation.value);
      return;
    }
    const index = Number(finalSegment);
    if (!Number.isInteger(index) || index < 0)
      throw new Error(`array pointer is not an index: ${mutation.path}`);
    if (mutation.operation === "add") {
      if (index > parent.length) throw new Error(`array add is out of range: ${mutation.path}`);
      parent.splice(index, 0, mutation.value);
      return;
    }
    if (index >= parent.length) throw new Error(`array pointer does not resolve: ${mutation.path}`);
    if (mutation.operation === "remove") parent.splice(index, 1);
    else parent[index] = mutation.value;
    return;
  }
  if (typeof parent !== "object" || parent === null) {
    throw new Error(`pointer parent is not a container: ${mutation.path}`);
  }
  const objectParent = parent as Record<string, unknown>;
  const exists = Object.prototype.hasOwnProperty.call(objectParent, finalSegment);
  if (mutation.operation !== "add" && !exists) {
    throw new Error(`object pointer does not resolve: ${mutation.path}`);
  }
  if (mutation.operation === "remove") delete objectParent[finalSegment];
  else objectParent[finalSegment] = mutation.value;
}

type SchemaNode = Record<string, unknown>;

function dereferenceCandidateSchema(
  node: SchemaNode,
  owner: string,
  byId: ReadonlyMap<string, SchemaNode>,
): { node: SchemaNode; owner: string } | null {
  const ref = node["$ref"];
  if (typeof ref !== "string" || node["properties"] !== undefined || node["items"] !== undefined) {
    return { node, owner };
  }
  const [targetPart, fragmentPart] = ref.startsWith("#")
    ? [owner, ref.slice(1)]
    : ref.split("#", 2);
  const targetId = targetPart ?? owner;
  const target = byId.get(targetId);
  if (target === undefined) return null;
  let current: unknown = target;
  for (const part of (fragmentPart ?? "").split("/").filter((entry) => entry !== "")) {
    if (typeof current !== "object" || current === null) return null;
    current = (current as SchemaNode)[part];
  }
  if (typeof current !== "object" || current === null) return null;
  return dereferenceCandidateSchema(current as SchemaNode, targetId, byId);
}

function candidateSurfacePathResolves(
  rootId: string,
  path: string,
  byId: ReadonlyMap<string, SchemaNode>,
): boolean {
  const root = byId.get(rootId);
  if (root === undefined) return false;
  let state = dereferenceCandidateSchema(root, rootId, byId);
  if (state === null) return false;
  for (const rawSegment of path.split(".")) {
    const isArray = rawSegment.endsWith("[]");
    const name = isArray ? rawSegment.slice(0, -2) : rawSegment;
    const properties = state.node["properties"];
    if (typeof properties !== "object" || properties === null) return false;
    const child = (properties as SchemaNode)[name];
    if (typeof child !== "object" || child === null) return false;
    state = dereferenceCandidateSchema(child as SchemaNode, state.owner, byId);
    if (state === null) return false;
    if (isArray) {
      const items = state.node["items"];
      if (typeof items !== "object" || items === null) return false;
      state = dereferenceCandidateSchema(items as SchemaNode, state.owner, byId);
      if (state === null) return false;
    }
  }
  return true;
}

describe("Release 2 non-authoritative candidate surface", () => {
  it("keeps Requirement namespace and first-ID candidates unissued and collision-free", () => {
    const registry = loadRequirements();
    const candidate = loadJson<RequirementNamespaceCandidateFile>(
      `${CANDIDATE_ROOT}/requirement-namespaces.json`,
    );
    expect(
      validateRequirementNamespaceCandidates(
        candidate,
        new Set(registry.namespaces.map((namespace) => namespace.prefix)),
        new Set(registry.requirements.map((requirement) => requirement.id)),
      ),
    ).toEqual([]);
  });

  it("rejects a Requirement candidate that collides with an issued namespace", () => {
    const candidate = structuredClone(
      loadJson<RequirementNamespaceCandidateFile>(`${CANDIDATE_ROOT}/requirement-namespaces.json`),
    );
    candidate.namespaces[0]!.token = "ITGC";
    candidate.namespaces[0]!.prefix = "NRS-PROFILE-ITGC";
    const errors = validateRequirementNamespaceCandidates(
      candidate,
      new Set(["NRS-PROFILE-ITGC"]),
      new Set(),
    );
    expect(errors.join("\n")).toContain("collides with a registered namespace");
  });

  it("rejects an unsafe future normative-document path", () => {
    const candidate = structuredClone(
      loadJson<RequirementNamespaceCandidateFile>(`${CANDIDATE_ROOT}/requirement-namespaces.json`),
    );
    candidate.namespaces[0]!.first_requirements[0]!.future_document =
      "spec/contracts/../outside.md";
    const errors = validateRequirementNamespaceCandidates(candidate, new Set(), new Set());
    expect(errors.join("\n")).toContain("future document must be a spec Markdown path");
  });

  it("validates exact unissued HTTPS candidates and bundle-role separation", () => {
    const candidate = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    expect(validateProtocolIdentifierCandidates(candidate)).toEqual([]);
  });

  it("rejects method/Contract double identity and a support claim", () => {
    const candidate = structuredClone(
      loadJson<ProtocolIdentifierCandidateFile>(`${CANDIDATE_ROOT}/protocol-identifiers.json`),
    );
    const contract = candidate.identifiers.find((entry) => entry.key === "paired_t_contract");
    if (contract === undefined) throw new Error("paired_t_contract candidate is missing");
    contract.family = "method";
    contract.candidate_spelling = "https://nomue.ai/id/method/paired-t/0.1.0-draft.1";
    candidate.bundle_binding.verifier_support_state = "supported" as never;
    const errors = validateProtocolIdentifierCandidates(candidate).join("\n");
    expect(errors).toContain("requires family contract");
    expect(errors).toContain("must not receive duplicate method identity");
    expect(errors).toContain("must not claim registered conformance or verifier support");
  });

  it("keeps every schema identity and binding equal to the D3 candidates", () => {
    const candidate = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    const byKey = new Map(
      candidate.identifiers.map((entry) => [entry.key, entry.candidate_spelling]),
    );
    const recordSchema = loadJson<{
      $id: string;
      properties: {
        profile_id: { const: string };
        payload: { $ref: string };
      };
    }>(`${CANDIDATE_ROOT}/schemas/record-0.3.candidate.schema.json`);
    const profileSchema = loadJson<{
      $id: string;
      $defs: { analysis: { properties: { contract_id: { const: string } } } };
    }>(`${CANDIDATE_ROOT}/schemas/paired-two-condition-continuous-0.1.candidate.schema.json`);
    const executionOutcomeSchema = loadJson<{
      $id: string;
      $defs: {
        verificationCheckIdentity: {
          oneOf: Array<{
            properties: {
              check_id: { const: string };
              check_version: { const: string };
            };
          }>;
        };
        conformanceResult: { properties: { check_id: { const: string } } };
      };
    }>(`${CANDIDATE_ROOT}/schemas/execution-outcome-0.3.candidate.schema.json`);
    const reportSchema = loadJson<{
      $id: string;
      properties: {
        conformance: { $ref: string };
        verification_results: {
          items: { $ref: string };
          prefixItems: Array<{
            allOf: [
              { $ref: string },
              {
                properties: {
                  check_id: { const: string };
                  check_version: { const: string };
                };
              },
            ];
          }>;
        };
      };
    }>(`${CANDIDATE_ROOT}/schemas/verification-report-0.3.candidate.schema.json`);
    expect(recordSchema.$id).toBe(byKey.get("record_schema"));
    expect(recordSchema.properties.profile_id.const).toBe(byKey.get("paired_profile"));
    expect(recordSchema.properties.payload.$ref).toBe(byKey.get("profile_schema"));
    expect(profileSchema.$id).toBe(byKey.get("profile_schema"));
    expect(profileSchema.$defs.analysis.properties.contract_id.const).toBe(
      byKey.get("paired_t_contract"),
    );
    expect(executionOutcomeSchema.$id).toBe(byKey.get("execution_outcome_schema"));
    expect(reportSchema.$id).toBe(byKey.get("verification_report_schema"));
    expect(reportSchema.properties.conformance.$ref).toContain(executionOutcomeSchema.$id);
    expect(reportSchema.properties.verification_results.items.$ref).toContain(
      executionOutcomeSchema.$id,
    );
    const publicChecks = candidate.bundle_binding.public_check_keys.map((key) => {
      const check = candidate.identifiers.find((identifier) => identifier.key === key);
      if (check === undefined) throw new Error(`candidate Public Check ${key} is missing`);
      return { check_id: check.candidate_spelling, check_version: check.revision };
    });
    const [conformanceCheck, ...verificationChecks] = publicChecks;
    expect(executionOutcomeSchema.$defs.conformanceResult.properties.check_id.const).toBe(
      conformanceCheck?.check_id,
    );
    const executionOutcomeChecks = executionOutcomeSchema.$defs.verificationCheckIdentity.oneOf.map(
      (entry) => ({
        check_id: entry.properties.check_id.const,
        check_version: entry.properties.check_version.const,
      }),
    );
    expect(
      [...executionOutcomeChecks].sort((a, b) => a.check_id.localeCompare(b.check_id)),
    ).toEqual([...verificationChecks].sort((a, b) => a.check_id.localeCompare(b.check_id)));
    const orderedReportChecks = reportSchema.properties.verification_results.prefixItems.map(
      (entry) => ({
        check_id: entry.allOf[1].properties.check_id.const,
        check_version: entry.allOf[1].properties.check_version.const,
      }),
    );
    expect(orderedReportChecks).toEqual(verificationChecks);
    for (const binding of candidate.bundle_binding.schema_bindings) {
      const schema = loadJson<{ $id: string }>(binding.candidate_path);
      expect(schema.$id, binding.role).toBe(byKey.get(binding.schema_key));
    }
    const commonBinding = candidate.bundle_binding.legacy_schema_bindings[0];
    const commonReuse = candidate.legacy_coexistence.reused_exact_bindings.find(
      (binding) => binding.role === commonBinding?.reuse_role,
    );
    expect(loadJson<{ $id: string }>(String(commonBinding?.repository_path)).$id).toBe(
      commonReuse?.identifier,
    );
  });

  it("keeps unissued future schema paths unoccupied and legacy reuse paths present", () => {
    const candidate = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    expect(candidate.issuance).toBe("unissued");
    for (const binding of candidate.bundle_binding.schema_bindings) {
      expect(exists(binding.future_authoritative_path), binding.role).toBe(false);
    }
    for (const binding of candidate.bundle_binding.legacy_schema_bindings) {
      expect(exists(binding.repository_path), binding.role).toBe(true);
    }
  });

  it("keeps fixture mutation operations strict and array-add insertion-based", () => {
    expect(() =>
      applyMutation({ present: 1 }, { operation: "replace", path: "/missing", value: 2 }),
    ).toThrow("object pointer does not resolve");
    expect(() => applyMutation({ list: [] }, { operation: "remove", path: "/list/0" })).toThrow(
      "array pointer does not resolve",
    );
    const value = { list: ["first", "third"] };
    applyMutation(value, { operation: "add", path: "/list/1", value: "second" });
    expect(value.list).toEqual(["first", "second", "third"]);
  });

  it("keeps every candidate spelling absent from authoritative artifacts", () => {
    const candidate = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    const authority = loadYaml<AuthorityManifest>("authority/authority-manifest.yaml");
    const authoritativePaths = [
      ...new Set(authority.targets.flatMap((target) => target.authoritative_artifacts)),
    ];
    expect(authority.artifacts.some((artifact) => artifact.path.startsWith(CANDIDATE_ROOT))).toBe(
      false,
    );
    for (const identifier of candidate.identifiers) {
      const owners = authoritativePaths.filter((path) =>
        readText(path).includes(identifier.candidate_spelling),
      );
      expect(owners, `${identifier.key} already appears authoritative`).toEqual([]);
    }
    const impact = loadJson<PublicContractSurfaceImpactCandidate>(
      `${CANDIDATE_ROOT}/public-contract-surface-impact.json`,
    );
    for (const surface of impact.new_surface_candidates) {
      const owners = authoritativePaths.filter((path) =>
        readText(path).includes(surface.candidate_surface_id),
      );
      expect(owners, `${surface.candidate_surface_id} already appears authoritative`).toEqual([]);
    }
  });

  it("compiles the candidate schemas and exercises every hand-authored fixture disposition", () => {
    const { validateRecord } = compileCandidateSchemas();
    const manifest = loadJson<FixtureManifest>(`${CANDIDATE_ROOT}/fixtures/manifest.json`);
    expect(manifest.status).toBe("non_authoritative_candidate");
    expect(manifest.issuance).toBe("unissued");
    expect(new Set(manifest.entries.map((entry) => entry.candidate_key)).size).toBe(
      manifest.entries.length,
    );
    const source = loadJson<unknown>(manifest.source);

    for (const entry of manifest.entries) {
      const record = structuredClone(source);
      entry.mutations.forEach((mutation) => applyMutation(record, mutation));
      const schemaValid = validateRecord(record);
      expect(schemaValid, `${entry.candidate_key}: ${JSON.stringify(validateRecord.errors)}`).toBe(
        entry.expected_schema_valid,
      );
      if (!schemaValid) {
        expect(
          validateRecord.errors?.some((error) => error.keyword === entry.expected_schema_keyword),
          `${entry.candidate_key}: expected keyword ${String(entry.expected_schema_keyword)}`,
        ).toBe(true);
        continue;
      }
      const codes = [
        ...new Set(
          validatePairedCandidateRelationships(record as PairedCandidateRecord).map(
            (issue) => issue.code,
          ),
        ),
      ].sort();
      expect(codes, entry.candidate_key).toEqual(
        [...(entry.expected_relationship_codes ?? [])].sort(),
      );
    }
  });

  it("keeps the candidate report closed and exercises every output disposition", () => {
    const { validateReport } = compileCandidateSchemas();
    const manifest = loadJson<FixtureManifest>(`${CANDIDATE_ROOT}/fixtures/output-manifest.json`);
    expect(manifest.status).toBe("non_authoritative_candidate");
    expect(manifest.issuance).toBe("unissued");
    expect(new Set(manifest.entries.map((entry) => entry.candidate_key)).size).toBe(
      manifest.entries.length,
    );
    const source = loadJson<unknown>(manifest.source);
    for (const entry of manifest.entries) {
      const report = structuredClone(source);
      entry.mutations.forEach((mutation) => applyMutation(report, mutation));
      const schemaValid = validateReport(report);
      expect(schemaValid, `${entry.candidate_key}: ${JSON.stringify(validateReport.errors)}`).toBe(
        entry.expected_schema_valid,
      );
      if (!schemaValid) {
        expect(
          validateReport.errors?.some((error) => error.keyword === entry.expected_schema_keyword),
          `${entry.candidate_key}: expected keyword ${String(entry.expected_schema_keyword)}`,
        ).toBe(true);
      }
    }
  });

  it("proves the exact-dispatch migration matrix against the current registry and router", () => {
    const identifiers = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    const matrix = loadJson<ExactDispatchMigrationMatrix>(
      `${CANDIDATE_ROOT}/exact-dispatch-migration-matrix.json`,
    );
    const bundles = loadYaml<BundleRegistry>("registries/interpretation-bundles.yaml");
    const schemaIdsByPath = new Map<string, string>();
    for (const row of matrix.legacy_bundle_preservation) {
      for (const path of [
        row.record_schema_path,
        row.profile_schema_path,
        row.verification_report_schema_path,
      ]) {
        schemaIdsByPath.set(path, loadJson<{ $id: string }>(path).$id);
      }
    }
    expect(
      validateExactDispatchMigrationMatrix(matrix, identifiers, bundles.entries, schemaIdsByPath),
    ).toEqual([]);

    const resources = loadVerifierResources();
    for (const row of matrix.legacy_bundle_preservation) {
      expect(routeParsedInput({ interpretation_bundle_id: row.bundle_id }, resources)).toEqual({
        decision: "selected",
        bundleId: row.bundle_id,
      });
    }
    for (const probe of matrix.unsupported_exact_match_probes) {
      const decision = routeParsedInput(
        { interpretation_bundle_id: probe.declared_bundle_id },
        resources,
      );
      expect(decision.decision, probe.case).toBe("refused");
      if (decision.decision === "refused") {
        expect(decision.kind, probe.case).toBe(probe.expected_kind);
        expect(decision.reasonCodes, probe.case).toEqual([probe.expected_reason_code]);
      }
    }

    const candidateRecord = loadJson<Record<string, unknown>>(
      `${CANDIDATE_ROOT}/fixtures/valid-complete-pairs.json`,
    );
    for (const row of matrix.legacy_bundle_preservation) {
      const crossShaped = structuredClone(candidateRecord);
      crossShaped["interpretation_bundle_id"] = row.bundle_id;
      const outcome = verifyRecordText(JSON.stringify(crossShaped));
      expect(outcome.refusal, row.bundle_id).toBeUndefined();
      expect(outcome.report?.interpretation_bundle_id, row.bundle_id).toBe(row.bundle_id);
      expect(outcome.report?.conformance.outcome, row.bundle_id).toBe("fail");
    }

    const legacyRecord = loadJson<Record<string, unknown>>(
      "examples/minimal-itgc-record/record.json",
    );
    legacyRecord["interpretation_bundle_id"] = matrix.candidate_bundle.candidate_spelling;
    const candidateRoute = verifyRecordText(JSON.stringify(legacyRecord));
    expect(candidateRoute.report).toBeUndefined();
    expect(candidateRoute.refusal?.refusal_kind).toBe("unsupported_bundle");
    expect(candidateRoute.refusal?.reason_codes).toEqual(["NRS-UNSUPPORTED-BUNDLE"]);
  });

  it("classifies every public surface and resolves every new candidate path", () => {
    const identifiers = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    const namespaceCandidates = loadJson<RequirementNamespaceCandidateFile>(
      `${CANDIDATE_ROOT}/requirement-namespaces.json`,
    );
    const impact = loadJson<PublicContractSurfaceImpactCandidate>(
      `${CANDIDATE_ROOT}/public-contract-surface-impact.json`,
    );
    const surfaces = loadYaml<PublicSurfaceRegistry>("registries/public-contract-surfaces.yaml");
    const requirements = loadRequirements();
    const registeredSurfaceIds = new Set(surfaces.entries.map((entry) => entry.surface_id));
    const candidateRequirementIds = new Set(
      namespaceCandidates.namespaces.flatMap((namespace) =>
        namespace.first_requirements.map((requirement) => requirement.candidate_id),
      ),
    );
    expect(
      validatePublicContractSurfaceImpact(
        impact,
        identifiers,
        registeredSurfaceIds,
        new Set(requirements.requirements.map((requirement) => requirement.id)),
        candidateRequirementIds,
      ),
    ).toEqual([]);

    const { byId } = compileCandidateSchemas();
    const schemaIdByKey = new Map(
      identifiers.identifiers
        .filter((identifier) => identifier.family === "schema")
        .map((identifier) => [identifier.key, identifier.candidate_spelling]),
    );
    for (const entry of impact.new_surface_candidates) {
      const rootId = schemaIdByKey.get(entry.candidate_schema_key);
      expect(rootId, entry.candidate_surface_id).toBeDefined();
      for (const path of entry.paths) {
        expect(
          candidateSurfacePathResolves(String(rootId), path, byId),
          `${entry.candidate_surface_id}: ${path}`,
        ).toBe(true);
      }
    }
    for (const reused of impact.reused_existing_surfaces) {
      if (reused.candidate_schema_key === null) continue;
      const rootId = schemaIdByKey.get(reused.candidate_schema_key);
      const registered = surfaces.entries.find(
        (surface) => surface.surface_id === reused.surface_id,
      );
      expect(rootId, reused.surface_id).toBeDefined();
      expect(registered, reused.surface_id).toBeDefined();
      for (const path of registered?.paths ?? []) {
        expect(
          candidateSurfacePathResolves(String(rootId), path, byId),
          `${reused.surface_id}: ${path}`,
        ).toBe(true);
      }
    }
  });
});
