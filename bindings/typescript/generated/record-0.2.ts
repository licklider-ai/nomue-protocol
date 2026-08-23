/**
 * GENERATED FILE - DO NOT EDIT.
 * Non-authoritative TypeScript binding generated from the Phase 1 JSON
 * Schemas; where this file and the schemas disagree, the schemas govern.
 *
 * Source schemas:
 *   schemas/common/identifier.schema.json (sha256:230796eae2baf7e3ebf5f75c9dcfe5b6afba3e320b152e7c848e38d06047b75c)
 *   schemas/common/execution-outcome.schema.json (sha256:39ec8d2ac254487c10486cd324e894bad0c7e43d334b9b533c7f4386374d7b37)
 *   schemas/common/execution-outcome-0.2.schema.json (sha256:36a1cd91fd3abb773fb279b613a4eedde4f583451690f7fec1695344cb37a78e)
 *   schemas/profiles/itgc-minimal.schema.json (sha256:5917cbc2d8de25e624bb1ea8dbced758fc66d794a6d05e3cb691c3f01351d699)
 *   schemas/profiles/itgc-guarantee-0.2.schema.json (sha256:60144b2c6c85009231a8d055aba2142b372c0f788f793b356a42c469c1de8510)
 *   schemas/record/record.schema.json (sha256:5b1006cf2724f0b4df914c0106a0d2d79b4bf3044d2ec08af67caaed34e2e67c)
 *   schemas/record/record-0.2.schema.json (sha256:78edefca1af368637f22051fbec4898df932f4378b912cd91c19ad8cc8a8cc9c)
 *   schemas/reports/verification-report.schema.json (sha256:b91f59e501242bc277a7723edadecb4a9cca00b03c4eec1e9d0882fd0f18051f)
 *   schemas/reports/verification-report-0.2.schema.json (sha256:c9fc5d15ba6a90ac5d1a348bcd1f8fd43fa93cfb70c7945ed5cf79fbe2bb27d8)
 *   schemas/reports/verifier-refusal-0.2.schema.json (sha256:45d345402cd72141ec57d4aba195bcc9278d724a31c7a0917dc6f11185b31aab)
 *   schemas/reports/verifier-refusal-0.2-draft-2.schema.json (sha256:0d10ef206e9fa1df4456be6889e2d078aae08630e608b15570a9ea187e78730b)
 *   schemas/reports/verifier-refusal-0.2-draft-3.schema.json (sha256:05cdaf9f96889f37b1f51c1d5dd0f1fabafc0bb48924e56abc9f2d1df62a5436)
 *   schemas/routing/routing-envelope-0.2.schema.json (sha256:313b80252d529cd1b32d0f5cc1fc71e705542e885284ecc3f3d6a463073e873a)
 *
 * Generation command: pnpm schema:generate-types (also run by pnpm generate)
 */

export type CommonIdentifier_Uri = string;
export type CommonIdentifier_Rfc3339UtcZ = string;
export type CommonIdentifier_LocalId = string;
export type CommonIdentifier_Label = string;
export type CommonIdentifier_Sha256Digest = string;

/**
 * The Phase 2A Record envelope with the ITGC guarantee payload. The surface is closed (NRS-CORE-0007); identifiers are identifiers, not locators (NRS-CORE-0004). The 0.1 Record schema remains registered and unchanged (NRS-CORE-0010).
 */
export interface Phase2ANomueRecord {
  $schema: "urn:nomue:schema:record:0.2.0-draft.1";
  record_type: "nomue-record";
  record_id: CommonIdentifier_Uri;
  revision_id: CommonIdentifier_Uri;
  created_at: CommonIdentifier_Rfc3339UtcZ;
  interpretation_bundle_id: string;
  profile_id: "urn:nomue:profile:itgc:0.2.0-draft.1";
  payload: Phase2AITGCGuaranteePayload;
  integrity: RecordSchema2A_Integrity;
}
/**
 * Payload structure for the Phase 2A ITGC guarantee profile. The schema deliberately represents unsupported declaration values (pairing present, weighting present, non-0.95 confidence levels, unsupported estimands, ...) so that a structurally readable Record can still fail the ITGC profile-admissibility check with a specific reason code; structural validity is never profile admissibility, and admissibility never asserts that a declaration is true (NRS-CORE-0009).
 */
export interface Phase2AITGCGuaranteePayload {
  dataset: ItgcGuaranteePayload_Dataset;
  design: ItgcGuaranteePayload_Design;
  analysis: ItgcGuaranteePayload_Analysis;
  result: ItgcGuaranteePayload_Result;
}
export interface ItgcGuaranteePayload_Dataset {
  dataset_id: CommonIdentifier_LocalId;
  /**
   * @minItems 4
   */
  observations: [
    ItgcGuaranteePayload_Observation,
    ItgcGuaranteePayload_Observation,
    ItgcGuaranteePayload_Observation,
    ItgcGuaranteePayload_Observation,
    ...ItgcGuaranteePayload_Observation[]
  ];
}
export interface ItgcGuaranteePayload_Observation {
  observation_id: CommonIdentifier_LocalId;
  experimental_unit_id: CommonIdentifier_LocalId;
  group_id: CommonIdentifier_LocalId;
  outcome_value: number;
}
export interface ItgcGuaranteePayload_Design {
  design_id: CommonIdentifier_LocalId;
  dataset_id: CommonIdentifier_LocalId;
  experimental_unit_type: CommonIdentifier_Label;
  /**
   * @minItems 2
   * @maxItems 2
   */
  groups: [ItgcGuaranteePayload_Group, ItgcGuaranteePayload_Group];
  /**
   * @minItems 2
   * @maxItems 2
   */
  group_order: [CommonIdentifier_LocalId, CommonIdentifier_LocalId];
  outcome: ItgcGuaranteePayload_Outcome;
  declarations: ItgcGuaranteePayload_AdmissibilityDeclarations;
  data_handling: ItgcGuaranteePayload_DataHandlingDeclarations;
}
export interface ItgcGuaranteePayload_Group {
  group_id: CommonIdentifier_LocalId;
  label: CommonIdentifier_Label;
}
export interface ItgcGuaranteePayload_Outcome {
  outcome_id: CommonIdentifier_LocalId;
  label: CommonIdentifier_Label;
  scale: "continuous";
}
export interface ItgcGuaranteePayload_AdmissibilityDeclarations {
  grouping_structure: "independent_groups";
  pairing: "none" | "present";
  repeated_measurements: "none" | "present";
  clustering: "none_declared" | "present";
}
export interface ItgcGuaranteePayload_DataHandlingDeclarations {
  analysis_population: "all_record_observations" | "subset_or_exclusions_present";
  missing_outcomes: "none" | "present";
  transformation: "none" | "present";
  weighting: "none" | "present";
}
export interface ItgcGuaranteePayload_Analysis {
  analysis_id: CommonIdentifier_LocalId;
  design_id: CommonIdentifier_LocalId;
  method_id: string;
  alternative: string;
  estimand: {
    kind: string;
    direction: string;
  };
  confidence_level: number;
}
export interface ItgcGuaranteePayload_Result {
  result_id: CommonIdentifier_LocalId;
  analysis_id: CommonIdentifier_LocalId;
  /**
   * @minItems 2
   * @maxItems 2
   */
  group_summaries: [ItgcGuaranteePayload_ResultGroupSummary, ItgcGuaranteePayload_ResultGroupSummary];
  effect_estimate: ItgcGuaranteePayload_EffectEstimate;
  test: ItgcGuaranteePayload_TestResult;
}
export interface ItgcGuaranteePayload_ResultGroupSummary {
  group_id: CommonIdentifier_LocalId;
  n: number;
  mean: number;
  sample_variance: number;
}
export interface ItgcGuaranteePayload_EffectEstimate {
  kind: "unstandardized_arithmetic_mean_difference";
  estimate: number;
  standard_error: number;
  confidence_interval: {
    method_id: string;
    confidence_level: number;
    lower: number;
    upper: number;
  };
}
export interface ItgcGuaranteePayload_TestResult {
  test_statistic: number;
  degrees_of_freedom: number;
  p_value: number;
}
export interface RecordSchema2A_Integrity {
  canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1";
  digest_algorithm: "sha-256";
  digest_scope: "record_without_integrity";
  content_digest: CommonIdentifier_Sha256Digest;
}
