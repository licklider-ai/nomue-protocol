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
    analysis_contract_keys: string[];
    schema_keys: string[];
    canonicalization_identifier: string;
    public_check_keys: string[];
    conformance_manifest_state: "candidate_not_registered";
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
  if (candidate.bundle_binding.state !== "unissued") {
    errors.push("bundle binding must remain unissued");
  }
  if (
    candidate.bundle_binding.conformance_manifest_state !== "candidate_not_registered" ||
    candidate.bundle_binding.verifier_support_state !== "candidate_not_registered"
  ) {
    errors.push("candidate bundle must not claim registered conformance or verifier support");
  }
  const canonicalizationReuse = candidate.legacy_coexistence.reused_exact_bindings.find(
    (entry) => entry.role === "canonicalization",
  );
  if (canonicalizationReuse?.identifier !== candidate.bundle_binding.canonicalization_identifier) {
    errors.push("bundle canonicalization must equal the exact declared legacy reuse binding");
  }
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
