/**
 * Non-authoritative validators for the unissued Release 2 paired-t candidate.
 *
 * These functions validate decision-preparation artifacts only. They are not
 * called by the reference verifier and do not register a namespace, identifier,
 * schema, bundle, Public Check, reason code, or conformance judgment.
 */

import {
  validateProtocolHttpsIdentifier,
  type ProtocolIdentifierFamily,
} from "../identifiers/https-identifier.js";

export interface RequirementCandidate {
  candidate_id: string;
  state: "unissued";
  title: string;
  future_document: string;
  future_anchor: string;
}

export interface RequirementNamespaceCandidate {
  kind: "contract" | "profile";
  token: string;
  prefix: string;
  meaning: string;
  mnemonic_rationale: string;
  first_requirements: RequirementCandidate[];
}

export interface RequirementNamespaceCandidateFile {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  review_issue: string;
  namespaces: RequirementNamespaceCandidate[];
}

export interface ProtocolIdentifierCandidate {
  key: string;
  role: string;
  state: "unissued";
  family: ProtocolIdentifierFamily;
  name: string;
  revision: string;
  candidate_spelling: string;
  semantic_owner: string;
  versioning_policy: string;
}

export interface ProtocolIdentifierCandidateFile {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  review_issue: string;
  identifiers: ProtocolIdentifierCandidate[];
  legacy_coexistence: {
    aliases_created: boolean;
    new_method_identifier_for_paired_t: boolean;
    reused_exact_bindings: Array<{ role: string; identifier: string; reason: string }>;
  };
  bundle_binding: {
    state: "unissued";
    bundle_key: string;
    profile_key: string;
    candidate_versions: {
      spec_version: string;
      schema_version: string;
      public_check_set_version: string;
    };
    analysis_contract_keys: string[];
    schema_keys: string[];
    canonicalization_identifier: string;
    public_check_keys: string[];
    public_check_order_semantics: "ordered_as_listed";
    schema_bindings: Array<{
      role: "record" | "profile" | "execution_outcome" | "verification_report";
      schema_key: string;
      candidate_path: string;
      future_authoritative_path: string;
    }>;
    legacy_schema_bindings: Array<{
      role: "common_identifier";
      reuse_role: "common_identifier_schema";
      repository_path: string;
    }>;
    attestation_support: "none";
    conformance_manifest_state: "candidate_not_registered";
    future_conformance_manifest_path: string;
    verifier_support_state: "candidate_not_registered";
  };
}

const TOKEN = /^[A-Z][A-Z0-9]{1,11}$/;
const CANDIDATE_REQUIREMENT = /^NRS-(CONTRACT|PROFILE)-([A-Z][A-Z0-9]{1,11})-([0-9]{4})$/;
function isFutureSpecPath(value: string): boolean {
  const segments = value.split("/");
  if (segments.length < 3 || segments[0] !== "spec") return false;
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    return false;
  }
  return segments.every((segment, index) => {
    const isFile = index === segments.length - 1;
    return isFile
      ? /^[A-Za-z0-9][A-Za-z0-9._-]*\.md$/.test(segment)
      : /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment);
  });
}

export function validateRequirementNamespaceCandidates(
  candidate: RequirementNamespaceCandidateFile,
  registeredPrefixes: ReadonlySet<string>,
  registeredRequirementIds: ReadonlySet<string>,
): string[] {
  const errors: string[] = [];
  if (candidate.status !== "non_authoritative_candidate") {
    errors.push("requirement candidate file must remain non_authoritative");
  }
  if (candidate.issuance !== "unissued") {
    errors.push("requirement candidate file must remain unissued");
  }
  if (candidate.namespaces.length !== 2) {
    errors.push("exactly one Contract and one Profile namespace candidate are required");
  }

  const prefixes = new Set<string>();
  const candidateIds = new Set<string>();
  for (const namespace of candidate.namespaces) {
    const expectedPrefix = `NRS-${namespace.kind.toUpperCase()}-${namespace.token}`;
    if (!TOKEN.test(namespace.token)) {
      errors.push(`${namespace.prefix}: token is outside the ADR-0032 grammar`);
    }
    if (namespace.prefix !== expectedPrefix) {
      errors.push(`${namespace.prefix}: expected prefix ${expectedPrefix}`);
    }
    if (prefixes.has(namespace.prefix)) {
      errors.push(`${namespace.prefix}: duplicate candidate namespace`);
    }
    prefixes.add(namespace.prefix);
    if (registeredPrefixes.has(namespace.prefix)) {
      errors.push(`${namespace.prefix}: collides with a registered namespace`);
    }
    if (namespace.meaning.trim() === "" || namespace.mnemonic_rationale.trim() === "") {
      errors.push(`${namespace.prefix}: meaning and mnemonic rationale are required`);
    }
    if (namespace.first_requirements.length === 0) {
      errors.push(`${namespace.prefix}: at least one first Requirement candidate is required`);
    }

    namespace.first_requirements.forEach((requirement, index) => {
      const match = CANDIDATE_REQUIREMENT.exec(requirement.candidate_id);
      if (match === null || !requirement.candidate_id.startsWith(`${namespace.prefix}-`)) {
        errors.push(`${requirement.candidate_id}: does not belong to ${namespace.prefix}`);
      }
      const expectedSequence = String(index + 1).padStart(4, "0");
      if (match !== null && match[3] !== expectedSequence) {
        errors.push(
          `${requirement.candidate_id}: expected initial contiguous sequence ${expectedSequence}`,
        );
      }
      if (requirement.state !== "unissued") {
        errors.push(`${requirement.candidate_id}: is not marked unissued`);
      }
      if (candidateIds.has(requirement.candidate_id)) {
        errors.push(`${requirement.candidate_id}: duplicate candidate Requirement ID`);
      }
      candidateIds.add(requirement.candidate_id);
      if (registeredRequirementIds.has(requirement.candidate_id)) {
        errors.push(`${requirement.candidate_id}: collides with a registered Requirement ID`);
      }
      if (requirement.future_anchor !== requirement.candidate_id) {
        errors.push(`${requirement.candidate_id}: future anchor must equal the candidate ID`);
      }
      if (!isFutureSpecPath(requirement.future_document)) {
        errors.push(`${requirement.candidate_id}: future document must be a spec Markdown path`);
      }
      if (requirement.title.trim() === "") {
        errors.push(`${requirement.candidate_id}: title is required`);
      }
    });
  }

  const kinds = [...candidate.namespaces.map((entry) => entry.kind)].sort();
  if (kinds.join(",") !== "contract,profile") {
    errors.push("namespace candidates must contain exactly Contract and Profile roles");
  }
  return errors;
}

const EXPECTED_FAMILY_BY_ROLE: Readonly<Record<string, ProtocolIdentifierFamily>> = {
  analysis_contract: "contract",
  profile: "profile",
  record_schema: "schema",
  profile_schema: "schema",
  execution_outcome_schema: "schema",
  verification_report_schema: "schema",
  interpretation_bundle: "bundle",
  public_check: "check",
};

function candidateSpelling(candidate: ProtocolIdentifierCandidate): string {
  return `https://nomue.ai/id/${candidate.family}/${candidate.name}/${candidate.revision}`;
}

function isSafeRepositoryPath(value: string, root: string, suffix: string): boolean {
  const segments = value.split("/");
  if (segments.length < 2 || segments[0] !== root || !value.endsWith(suffix)) return false;
  return segments.every(
    (segment) =>
      segment !== "" &&
      segment !== "." &&
      segment !== ".." &&
      /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment),
  );
}

export function validateProtocolIdentifierCandidates(
  candidate: ProtocolIdentifierCandidateFile,
): string[] {
  const errors: string[] = [];
  if (candidate.status !== "non_authoritative_candidate") {
    errors.push("identifier candidate file must remain non-authoritative");
  }
  if (candidate.issuance !== "unissued") {
    errors.push("identifier candidate file must remain unissued");
  }

  const byKey = new Map<string, ProtocolIdentifierCandidate>();
  const spellings = new Set<string>();
  for (const identifier of candidate.identifiers) {
    if (identifier.state !== "unissued") {
      errors.push(`${identifier.key}: is not marked unissued`);
    }
    if (byKey.has(identifier.key)) errors.push(`${identifier.key}: duplicate candidate key`);
    byKey.set(identifier.key, identifier);
    const expectedFamily = EXPECTED_FAMILY_BY_ROLE[identifier.role];
    if (expectedFamily === undefined) {
      errors.push(`${identifier.key}: unrecognized semantic role ${identifier.role}`);
    } else if (identifier.family !== expectedFamily) {
      errors.push(`${identifier.key}: role ${identifier.role} requires family ${expectedFamily}`);
    }
    if (identifier.family === "method") {
      errors.push(`${identifier.key}: paired t must not receive duplicate method identity`);
    }
    const constructed = candidateSpelling(identifier);
    if (identifier.candidate_spelling !== constructed) {
      errors.push(`${identifier.key}: spelling does not match its components`);
    }
    const lexical = validateProtocolHttpsIdentifier(identifier.candidate_spelling);
    if (!lexical.ok) {
      errors.push(`${identifier.key}: invalid HTTPS candidate (${lexical.errors.join(", ")})`);
    }
    if (spellings.has(identifier.candidate_spelling)) {
      errors.push(`${identifier.key}: duplicate candidate spelling`);
    }
    spellings.add(identifier.candidate_spelling);
    if (identifier.semantic_owner.trim() === "" || identifier.versioning_policy.trim() === "") {
      errors.push(`${identifier.key}: semantic owner and versioning policy are required`);
    }
  }

  if (candidate.legacy_coexistence.aliases_created) {
    errors.push("candidate must not create legacy/HTTPS aliases");
  }
  if (candidate.legacy_coexistence.new_method_identifier_for_paired_t) {
    errors.push("candidate must not mint a method alias for the paired-t Contract");
  }
  for (const binding of candidate.legacy_coexistence.reused_exact_bindings) {
    if (!binding.identifier.startsWith("urn:nomue:") || binding.reason.trim() === "") {
      errors.push(
        `${binding.role}: legacy reuse must name an exact legacy identifier and rationale`,
      );
    }
  }

  const requireKey = (
    key: string,
    family: ProtocolIdentifierFamily,
    label: string,
  ): ProtocolIdentifierCandidate | undefined => {
    const entry = byKey.get(key);
    if (entry === undefined) {
      errors.push(`${label}: unknown candidate key ${key}`);
      return undefined;
    }
    if (entry.family !== family) errors.push(`${label}: ${key} must use family ${family}`);
    return entry;
  };
  requireKey(candidate.bundle_binding.bundle_key, "bundle", "bundle binding");
  requireKey(candidate.bundle_binding.profile_key, "profile", "profile binding");
  if (candidate.bundle_binding.analysis_contract_keys.length !== 1) {
    errors.push("candidate bundle must bind exactly one Analysis Contract");
  }
  if (candidate.bundle_binding.schema_keys.length === 0) {
    errors.push("candidate bundle must bind at least one schema");
  }
  if (candidate.bundle_binding.public_check_keys.length === 0) {
    errors.push("candidate bundle must bind at least one Public Check");
  }
  for (const [label, keys] of [
    ["Analysis Contract", candidate.bundle_binding.analysis_contract_keys],
    ["schema", candidate.bundle_binding.schema_keys],
    ["Public Check", candidate.bundle_binding.public_check_keys],
  ] as const) {
    if (new Set(keys).size !== keys.length) errors.push(`${label} bindings must be unique`);
  }
  candidate.bundle_binding.analysis_contract_keys.forEach((key) =>
    requireKey(key, "contract", "Analysis Contract binding"),
  );
  candidate.bundle_binding.schema_keys.forEach((key) =>
    requireKey(key, "schema", "schema binding"),
  );
  candidate.bundle_binding.public_check_keys.forEach((key) =>
    requireKey(key, "check", "Public Check binding"),
  );
  for (const [versionRole, version] of Object.entries(
    candidate.bundle_binding.candidate_versions,
  )) {
    if (!/^[0-9]+\.[0-9]+\.[0-9]+-draft\.[0-9]+$/.test(version)) {
      errors.push(`bundle ${versionRole} is not a draft version`);
    }
  }
  if (candidate.bundle_binding.public_check_order_semantics !== "ordered_as_listed") {
    errors.push("candidate bundle must explicitly order its Public Check list");
  }
  const expectedSchemaRoles = ["execution_outcome", "profile", "record", "verification_report"];
  const schemaRoles = candidate.bundle_binding.schema_bindings
    .map((binding) => binding.role)
    .sort();
  if (schemaRoles.join(",") !== expectedSchemaRoles.join(",")) {
    errors.push("candidate bundle must bind exactly the four successor schema roles");
  }
  const schemaBindingKeys = new Set<string>();
  const candidateSchemaPaths = new Set<string>();
  const futureSchemaPaths = new Set<string>();
  for (const binding of candidate.bundle_binding.schema_bindings) {
    requireKey(binding.schema_key, "schema", `${binding.role} schema binding`);
    if (schemaBindingKeys.has(binding.schema_key)) {
      errors.push(`${binding.schema_key}: duplicate schema binding key`);
    }
    schemaBindingKeys.add(binding.schema_key);
    if (
      !isSafeRepositoryPath(binding.candidate_path, "governance", ".candidate.schema.json") ||
      !binding.candidate_path.startsWith("governance/drafts/release-2-candidate/schemas/")
    ) {
      errors.push(`${binding.schema_key}: unsafe candidate schema path`);
    }
    if (!isSafeRepositoryPath(binding.future_authoritative_path, "schemas", ".schema.json")) {
      errors.push(`${binding.schema_key}: unsafe future authoritative schema path`);
    }
    if (candidateSchemaPaths.has(binding.candidate_path)) {
      errors.push(`${binding.schema_key}: duplicate candidate schema path`);
    }
    candidateSchemaPaths.add(binding.candidate_path);
    if (futureSchemaPaths.has(binding.future_authoritative_path)) {
      errors.push(`${binding.schema_key}: duplicate future authoritative schema path`);
    }
    futureSchemaPaths.add(binding.future_authoritative_path);
  }
  if (
    schemaBindingKeys.size !== candidate.bundle_binding.schema_keys.length ||
    candidate.bundle_binding.schema_keys.some((key) => !schemaBindingKeys.has(key))
  ) {
    errors.push("candidate schema keys and exact schema bindings must match");
  }
  if (
    candidate.bundle_binding.legacy_schema_bindings.length !== 1 ||
    candidate.bundle_binding.legacy_schema_bindings[0]?.role !== "common_identifier" ||
    candidate.bundle_binding.legacy_schema_bindings[0]?.reuse_role !== "common_identifier_schema" ||
    candidate.bundle_binding.legacy_schema_bindings[0]?.repository_path !==
      "schemas/common/identifier.schema.json"
  ) {
    errors.push("candidate bundle must reuse exactly the legacy common-identifier schema binding");
  }
  const commonIdentifierReuse = candidate.legacy_coexistence.reused_exact_bindings.find(
    (entry) => entry.role === "common_identifier_schema",
  );
  if (commonIdentifierReuse?.identifier !== "urn:nomue:schema:common:identifier:0.1.0-draft.1") {
    errors.push(
      "candidate bundle common-identifier path must bind the exact declared legacy reuse",
    );
  }
  if (candidate.bundle_binding.attestation_support !== "none") {
    errors.push("candidate bundle must not claim attestation support");
  }
  if (candidate.bundle_binding.state !== "unissued") {
    errors.push("bundle binding must remain unissued");
  }
  if (
    candidate.bundle_binding.conformance_manifest_state !== "candidate_not_registered" ||
    candidate.bundle_binding.verifier_support_state !== "candidate_not_registered"
  ) {
    errors.push("candidate bundle must not claim registered conformance or verifier support");
  }
  if (candidate.bundle_binding.future_conformance_manifest_path !== "conformance/manifest.yaml") {
    errors.push("candidate bundle must name the existing conformance manifest as its future path");
  }
  const canonicalizationReuse = candidate.legacy_coexistence.reused_exact_bindings.find(
    (entry) => entry.role === "canonicalization",
  );
  if (canonicalizationReuse?.identifier !== candidate.bundle_binding.canonicalization_identifier) {
    errors.push("bundle canonicalization must equal the exact declared legacy reuse binding");
  }
  return errors;
}

export interface ExactDispatchMigrationMatrix {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  review_issue: string;
  candidate_bundle: {
    bundle_key: string;
    candidate_spelling: string;
    current_registry_state: "not_registered";
    current_verifier_state: "not_supported";
    current_exact_dispatch_outcome: {
      decision: "refused";
      kind: "unsupported_bundle";
      reason_code: "NRS-UNSUPPORTED-BUNDLE";
    };
    post_ratification_dispatch_policy: "exact_identifier_only";
    legacy_shape_fallback: false;
  };
  legacy_bundle_preservation: Array<{
    bundle_id: string;
    expected_current_route: "selected";
    record_schema_path: string;
    record_schema_id: string;
    profile_schema_path: string;
    profile_schema_id: string;
    verification_report_schema_path: string;
    verification_report_schema_id: string;
    meaning_change: "none";
  }>;
  unsupported_exact_match_probes: Array<{
    case: string;
    declared_bundle_id: string;
    expected_decision: "refused";
    expected_kind: "unsupported_bundle";
    expected_reason_code: "NRS-UNSUPPORTED-BUNDLE";
  }>;
  cross_shape_policy: {
    candidate_record_with_legacy_bundle: "legacy_bundle_schema_only";
    legacy_record_with_candidate_bundle_after_support: "candidate_bundle_schema_only";
    fallback_between_legacy_and_candidate_shapes: false;
  };
}

export interface RegisteredBundleCandidateFacts {
  bundle_id: string;
  schema_refs: string[];
}

export function validateExactDispatchMigrationMatrix(
  matrix: ExactDispatchMigrationMatrix,
  identifierCandidate: ProtocolIdentifierCandidateFile,
  registeredBundles: readonly RegisteredBundleCandidateFacts[],
  schemaIdsByPath: ReadonlyMap<string, string>,
): string[] {
  const errors: string[] = [];
  if (matrix.status !== "non_authoritative_candidate" || matrix.issuance !== "unissued") {
    errors.push("dispatch migration matrix must remain non-authoritative and unissued");
  }
  const candidateBundle = identifierCandidate.identifiers.find(
    (entry) => entry.key === matrix.candidate_bundle.bundle_key,
  );
  if (candidateBundle?.candidate_spelling !== matrix.candidate_bundle.candidate_spelling) {
    errors.push("dispatch matrix candidate bundle must equal the D3 spelling");
  }
  if (
    matrix.candidate_bundle.current_registry_state !== "not_registered" ||
    matrix.candidate_bundle.current_verifier_state !== "not_supported" ||
    matrix.candidate_bundle.current_exact_dispatch_outcome.decision !== "refused" ||
    matrix.candidate_bundle.current_exact_dispatch_outcome.kind !== "unsupported_bundle" ||
    matrix.candidate_bundle.current_exact_dispatch_outcome.reason_code !==
      "NRS-UNSUPPORTED-BUNDLE" ||
    matrix.candidate_bundle.post_ratification_dispatch_policy !== "exact_identifier_only" ||
    matrix.candidate_bundle.legacy_shape_fallback
  ) {
    errors.push("dispatch matrix crosses the current unsupported/exact-only boundary");
  }

  const registeredById = new Map(registeredBundles.map((entry) => [entry.bundle_id, entry]));
  const matrixLegacyIds = new Set<string>();
  for (const row of matrix.legacy_bundle_preservation) {
    const registered = registeredById.get(row.bundle_id);
    if (registered === undefined) errors.push(`${row.bundle_id}: not a registered legacy bundle`);
    if (matrixLegacyIds.has(row.bundle_id))
      errors.push(`${row.bundle_id}: duplicate migration row`);
    matrixLegacyIds.add(row.bundle_id);
    if (row.expected_current_route !== "selected" || row.meaning_change !== "none") {
      errors.push(`${row.bundle_id}: legacy route or meaning would change`);
    }
    for (const [label, path, expectedId] of [
      ["record", row.record_schema_path, row.record_schema_id],
      ["profile", row.profile_schema_path, row.profile_schema_id],
      [
        "verification report",
        row.verification_report_schema_path,
        row.verification_report_schema_id,
      ],
    ] as const) {
      if (registered !== undefined && !registered.schema_refs.includes(path)) {
        errors.push(`${row.bundle_id}: ${label} schema path is not pinned by the registry`);
      }
      if (schemaIdsByPath.get(path) !== expectedId) {
        errors.push(`${row.bundle_id}: ${label} schema identity drift`);
      }
    }
  }
  if (
    matrixLegacyIds.size !== registeredById.size ||
    registeredBundles.some((entry) => !matrixLegacyIds.has(entry.bundle_id))
  ) {
    errors.push("dispatch matrix must preserve every registered legacy bundle exactly once");
  }

  const probeIds = new Set<string>();
  for (const probe of matrix.unsupported_exact_match_probes) {
    if (probe.case.trim() === "" || probeIds.has(probe.declared_bundle_id)) {
      errors.push(`${probe.case}: invalid or duplicate unsupported probe`);
    }
    probeIds.add(probe.declared_bundle_id);
    if (registeredById.has(probe.declared_bundle_id)) {
      errors.push(`${probe.case}: unsupported probe collides with a registered bundle`);
    }
    if (
      probe.expected_decision !== "refused" ||
      probe.expected_kind !== "unsupported_bundle" ||
      probe.expected_reason_code !== "NRS-UNSUPPORTED-BUNDLE"
    ) {
      errors.push(`${probe.case}: unsupported probe does not fail closed`);
    }
  }
  if (!probeIds.has(matrix.candidate_bundle.candidate_spelling)) {
    errors.push("dispatch matrix must probe the exact unissued candidate bundle");
  }
  if (matrix.cross_shape_policy.fallback_between_legacy_and_candidate_shapes) {
    errors.push("dispatch matrix must prohibit cross-shape fallback");
  }
  return errors;
}

export interface PublicContractSurfaceImpactCandidate {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  review_issue: string;
  candidate_bundle_key: string;
  legacy_registry_change_before_ratification: "none";
  reused_existing_surfaces: Array<{
    surface_id: string;
    action_after_ratification: "extend_bundle_application";
    candidate_schema_key: string | null;
    meaning_change: "none";
    schema_version_impact: string;
  }>;
  new_surface_candidates: Array<{
    candidate_surface_id: string;
    state: "unissued";
    title: string;
    paths: string[];
    candidate_schema_key: string;
    candidate_schema_path: string;
    stability: "EXPERIMENTAL";
    candidate_requirement_ids: string[];
    change_policy: {
      breaking_change: "requires a new schema version";
      silent_reinterpretation: "prohibited";
    };
  }>;
  non_applicable_preserved_surfaces: Array<{ surface_id: string; reason: string }>;
}

export function validatePublicContractSurfaceImpact(
  impact: PublicContractSurfaceImpactCandidate,
  identifierCandidate: ProtocolIdentifierCandidateFile,
  registeredSurfaceIds: ReadonlySet<string>,
  registeredRequirementIds: ReadonlySet<string>,
  candidateRequirementIds: ReadonlySet<string>,
): string[] {
  const errors: string[] = [];
  if (impact.status !== "non_authoritative_candidate" || impact.issuance !== "unissued") {
    errors.push("public-surface impact must remain non-authoritative and unissued");
  }
  if (impact.legacy_registry_change_before_ratification !== "none") {
    errors.push("public-surface impact must not change the registry before ratification");
  }
  if (impact.candidate_bundle_key !== identifierCandidate.bundle_binding.bundle_key) {
    errors.push("public-surface impact must name the D3 candidate bundle key");
  }
  const schemaKeys = new Set(identifierCandidate.bundle_binding.schema_keys);
  const classifiedExisting = new Set<string>();
  for (const entry of impact.reused_existing_surfaces) {
    if (!registeredSurfaceIds.has(entry.surface_id)) {
      errors.push(`${entry.surface_id}: reused surface is not registered`);
    }
    if (classifiedExisting.has(entry.surface_id)) {
      errors.push(`${entry.surface_id}: existing surface is classified more than once`);
    }
    classifiedExisting.add(entry.surface_id);
    if (
      entry.action_after_ratification !== "extend_bundle_application" ||
      entry.meaning_change !== "none" ||
      entry.schema_version_impact.trim() === ""
    ) {
      errors.push(`${entry.surface_id}: reused surface changes existing meaning`);
    }
    if (entry.candidate_schema_key !== null && !schemaKeys.has(entry.candidate_schema_key)) {
      errors.push(`${entry.surface_id}: unknown candidate schema key`);
    }
  }
  for (const entry of impact.non_applicable_preserved_surfaces) {
    if (!registeredSurfaceIds.has(entry.surface_id)) {
      errors.push(`${entry.surface_id}: preserved surface is not registered`);
    }
    if (classifiedExisting.has(entry.surface_id)) {
      errors.push(`${entry.surface_id}: existing surface is classified more than once`);
    }
    classifiedExisting.add(entry.surface_id);
    if (entry.reason.trim() === "")
      errors.push(`${entry.surface_id}: preservation reason is empty`);
  }
  if (
    classifiedExisting.size !== registeredSurfaceIds.size ||
    [...registeredSurfaceIds].some((id) => !classifiedExisting.has(id))
  ) {
    errors.push("public-surface impact must classify every registered surface exactly once");
  }

  const maxRegistered = Math.max(
    ...[...registeredSurfaceIds].map((id) => Number(id.slice("NRS-PCS-".length))),
  );
  const newIds = new Set<string>();
  impact.new_surface_candidates.forEach((entry, index) => {
    const expected = `NRS-PCS-${String(maxRegistered + index + 1).padStart(4, "0")}`;
    if (entry.candidate_surface_id !== expected) {
      errors.push(`${entry.candidate_surface_id}: expected contiguous candidate ${expected}`);
    }
    if (entry.state !== "unissued" || registeredSurfaceIds.has(entry.candidate_surface_id)) {
      errors.push(`${entry.candidate_surface_id}: surface candidate is already issued`);
    }
    if (newIds.has(entry.candidate_surface_id)) {
      errors.push(`${entry.candidate_surface_id}: duplicate surface candidate`);
    }
    newIds.add(entry.candidate_surface_id);
    if (entry.title.trim() === "" || entry.paths.length === 0) {
      errors.push(`${entry.candidate_surface_id}: title and paths are required`);
    }
    if (new Set(entry.paths).size !== entry.paths.length) {
      errors.push(`${entry.candidate_surface_id}: duplicate public path`);
    }
    if (!schemaKeys.has(entry.candidate_schema_key)) {
      errors.push(`${entry.candidate_surface_id}: unknown candidate schema key`);
    }
    const binding = identifierCandidate.bundle_binding.schema_bindings.find(
      (candidateBinding) => candidateBinding.schema_key === entry.candidate_schema_key,
    );
    if (binding?.candidate_path !== entry.candidate_schema_path) {
      errors.push(
        `${entry.candidate_surface_id}: candidate schema path differs from bundle binding`,
      );
    }
    if (entry.stability !== "EXPERIMENTAL") {
      errors.push(`${entry.candidate_surface_id}: first schema layout must remain EXPERIMENTAL`);
    }
    if (entry.candidate_requirement_ids.length === 0) {
      errors.push(`${entry.candidate_surface_id}: Requirement bindings are required`);
    }
    for (const requirementId of entry.candidate_requirement_ids) {
      if (
        !registeredRequirementIds.has(requirementId) &&
        !candidateRequirementIds.has(requirementId)
      ) {
        errors.push(`${entry.candidate_surface_id}: unknown Requirement ${requirementId}`);
      }
    }
    if (
      entry.change_policy.breaking_change !== "requires a new schema version" ||
      entry.change_policy.silent_reinterpretation !== "prohibited"
    ) {
      errors.push(`${entry.candidate_surface_id}: invalid change policy`);
    }
  });
  return errors;
}

export interface CandidateObservation {
  observation_id: string;
  experimental_unit_id: string;
  pair_id: string;
  condition_id: string;
  outcome_value: number;
}

export interface PairedCandidateRecord {
  payload: {
    dataset: { dataset_id: string; observations: CandidateObservation[] };
    design: {
      design_id: string;
      dataset_id: string;
      conditions: Array<{ condition_id: string; label: string }>;
      condition_order: [string, string];
      declarations: {
        grouping_structure: string;
        pair_independence: string;
        repeated_measurements: "none" | "within_pair_only";
        clustering: string;
      };
      data_handling: {
        analysis_population: string;
        missing_outcomes: string;
        transformation: string;
        weighting: string;
      };
    };
    analysis: {
      analysis_id: string;
      design_id: string;
      alternative: string;
      model: { paired_difference_distribution: string };
      estimand: { kind: string; direction: string };
      confidence_level: number;
    };
    result: {
      analysis_id: string;
      pair_summary: { n_pairs: number };
      effect_estimate: { confidence_interval: { confidence_level: number } };
    };
  };
}

export type PairedCandidateRelationshipCode =
  | "DATASET_REFERENCE_MISMATCH"
  | "DESIGN_REFERENCE_MISMATCH"
  | "ANALYSIS_REFERENCE_MISMATCH"
  | "DUPLICATE_CONDITION_ID"
  | "CONDITION_ORDER_MISMATCH"
  | "DUPLICATE_OBSERVATION_ID"
  | "UNKNOWN_CONDITION"
  | "DUPLICATE_PAIR_CONDITION"
  | "INCOMPLETE_PAIR"
  | "EXPERIMENTAL_UNIT_REUSED_ACROSS_PAIRS"
  | "EXPERIMENTAL_UNIT_DECLARATION_MISMATCH"
  | "PAIR_COUNT_BELOW_TWO"
  | "PAIR_SUMMARY_COUNT_MISMATCH"
  | "PAIR_INDEPENDENCE_NOT_DECLARED"
  | "CLUSTERING_UNSUPPORTED"
  | "ANALYSIS_POPULATION_UNSUPPORTED"
  | "MISSING_OUTCOMES_UNSUPPORTED"
  | "TRANSFORMATION_UNSUPPORTED"
  | "WEIGHTING_UNSUPPORTED"
  | "ALTERNATIVE_UNSUPPORTED"
  | "MODEL_UNSUPPORTED"
  | "ESTIMAND_UNSUPPORTED"
  | "DIRECTION_UNSUPPORTED"
  | "CONFIDENCE_LEVEL_UNSUPPORTED"
  | "RESULT_CONFIDENCE_LEVEL_MISMATCH";

export interface PairedCandidateRelationshipIssue {
  code: PairedCandidateRelationshipCode;
  detail?: string;
}

interface PairMembers {
  first?: CandidateObservation;
  second?: CandidateObservation;
}

/**
 * Validate the non-numerical relationships that the candidate JSON Schema
 * cannot express. Callers first establish candidate-schema validity.
 */
export function validatePairedCandidateRelationships(
  record: PairedCandidateRecord,
): PairedCandidateRelationshipIssue[] {
  const issues: PairedCandidateRelationshipIssue[] = [];
  const { dataset, design, analysis, result } = record.payload;
  if (design.dataset_id !== dataset.dataset_id) issues.push({ code: "DATASET_REFERENCE_MISMATCH" });
  if (analysis.design_id !== design.design_id) issues.push({ code: "DESIGN_REFERENCE_MISMATCH" });
  if (result.analysis_id !== analysis.analysis_id)
    issues.push({ code: "ANALYSIS_REFERENCE_MISMATCH" });

  const conditionIds = design.conditions.map((condition) => condition.condition_id);
  if (new Set(conditionIds).size !== conditionIds.length) {
    issues.push({ code: "DUPLICATE_CONDITION_ID" });
  }
  if (
    conditionIds.length !== 2 ||
    design.condition_order.length !== 2 ||
    !conditionIds.every((id) => design.condition_order.includes(id))
  ) {
    issues.push({ code: "CONDITION_ORDER_MISMATCH" });
  }
  const firstCondition = design.condition_order[0];
  const secondCondition = design.condition_order[1];

  const observationIds = new Set<string>();
  const experimentalUnitPairs = new Map<string, string>();
  const pairs = new Map<string, PairMembers>();
  for (const observation of dataset.observations) {
    if (observationIds.has(observation.observation_id)) {
      issues.push({ code: "DUPLICATE_OBSERVATION_ID", detail: observation.observation_id });
    }
    observationIds.add(observation.observation_id);
    if (
      observation.condition_id !== firstCondition &&
      observation.condition_id !== secondCondition
    ) {
      issues.push({ code: "UNKNOWN_CONDITION", detail: observation.observation_id });
      continue;
    }
    const priorPair = experimentalUnitPairs.get(observation.experimental_unit_id);
    if (priorPair !== undefined && priorPair !== observation.pair_id) {
      issues.push({
        code: "EXPERIMENTAL_UNIT_REUSED_ACROSS_PAIRS",
        detail: observation.experimental_unit_id,
      });
    }
    experimentalUnitPairs.set(observation.experimental_unit_id, observation.pair_id);

    const members = pairs.get(observation.pair_id) ?? {};
    const key = observation.condition_id === firstCondition ? "first" : "second";
    if (members[key] !== undefined) {
      issues.push({ code: "DUPLICATE_PAIR_CONDITION", detail: observation.pair_id });
    } else {
      members[key] = observation;
    }
    pairs.set(observation.pair_id, members);
  }

  if (pairs.size < 2) issues.push({ code: "PAIR_COUNT_BELOW_TWO" });
  for (const [pairId, members] of pairs) {
    if (members.first === undefined || members.second === undefined) {
      issues.push({ code: "INCOMPLETE_PAIR", detail: pairId });
      continue;
    }
    const sameUnit = members.first.experimental_unit_id === members.second.experimental_unit_id;
    if (
      (design.declarations.repeated_measurements === "within_pair_only" && !sameUnit) ||
      (design.declarations.repeated_measurements === "none" && sameUnit)
    ) {
      issues.push({ code: "EXPERIMENTAL_UNIT_DECLARATION_MISMATCH", detail: pairId });
    }
  }
  if (result.pair_summary.n_pairs !== pairs.size) {
    issues.push({ code: "PAIR_SUMMARY_COUNT_MISMATCH" });
  }

  if (design.declarations.pair_independence !== "declared") {
    issues.push({ code: "PAIR_INDEPENDENCE_NOT_DECLARED" });
  }
  if (design.declarations.clustering !== "none_declared") {
    issues.push({ code: "CLUSTERING_UNSUPPORTED" });
  }
  if (design.data_handling.analysis_population !== "all_record_observations") {
    issues.push({ code: "ANALYSIS_POPULATION_UNSUPPORTED" });
  }
  if (design.data_handling.missing_outcomes !== "none") {
    issues.push({ code: "MISSING_OUTCOMES_UNSUPPORTED" });
  }
  if (design.data_handling.transformation !== "none") {
    issues.push({ code: "TRANSFORMATION_UNSUPPORTED" });
  }
  if (design.data_handling.weighting !== "none") {
    issues.push({ code: "WEIGHTING_UNSUPPORTED" });
  }
  if (analysis.alternative !== "two_sided") issues.push({ code: "ALTERNATIVE_UNSUPPORTED" });
  if (analysis.model.paired_difference_distribution !== "normal") {
    issues.push({ code: "MODEL_UNSUPPORTED" });
  }
  if (analysis.estimand.kind !== "arithmetic_mean_paired_difference") {
    issues.push({ code: "ESTIMAND_UNSUPPORTED" });
  }
  if (analysis.estimand.direction !== "first_condition_minus_second_condition") {
    issues.push({ code: "DIRECTION_UNSUPPORTED" });
  }
  if (analysis.confidence_level !== 0.95) {
    issues.push({ code: "CONFIDENCE_LEVEL_UNSUPPORTED" });
  }
  if (result.effect_estimate.confidence_interval.confidence_level !== 0.95) {
    issues.push({ code: "RESULT_CONFIDENCE_LEVEL_MISMATCH" });
  }
  return issues;
}
