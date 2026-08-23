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
 * The Phase 1 minimal Record envelope with the ITGC minimal payload. The surface is closed: undeclared properties are rejected (NRS-CORE-0007). Identifiers are identifiers, not locators (NRS-CORE-0004).
 */
export interface Phase1NomueRecord {
  $schema: "urn:nomue:schema:record:0.1.0-draft.1";
  record_type: "nomue-record";
  record_id: CommonIdentifier_Uri;
  revision_id: CommonIdentifier_Uri;
  created_at: CommonIdentifier_Rfc3339UtcZ;
  interpretation_bundle_id: string;
  profile_id: "urn:nomue:profile:itgc:0.1.0-draft.1";
  payload: Phase1MinimalITGCPayload;
  integrity: RecordSchema_Integrity;
}
/**
 * Payload structure for the Phase 1 minimal Independent Two-Group Continuous profile. Declarative preconditions that a schema cannot fully express (group_order permutation, uniqueness, group resolution, minimum group size per group, supported method) are registered state invariants evaluated by semantic conformance.
 */
export interface Phase1MinimalITGCPayload {
  dataset: ItgcPayload_Dataset;
  design: ItgcPayload_Design;
  analysis: ItgcPayload_Analysis;
  result: ItgcPayload_Result;
}
export interface ItgcPayload_Dataset {
  dataset_id: CommonIdentifier_LocalId;
  /**
   * @minItems 4
   */
  observations: [
    ItgcPayload_Observation,
    ItgcPayload_Observation,
    ItgcPayload_Observation,
    ItgcPayload_Observation,
    ...ItgcPayload_Observation[]
  ];
}
export interface ItgcPayload_Observation {
  observation_id: CommonIdentifier_LocalId;
  experimental_unit_id: CommonIdentifier_LocalId;
  group_id: CommonIdentifier_LocalId;
  outcome_value: number;
}
export interface ItgcPayload_Design {
  design_id: CommonIdentifier_LocalId;
  dataset_id: CommonIdentifier_LocalId;
  experimental_unit_type: CommonIdentifier_Label;
  /**
   * @minItems 2
   * @maxItems 2
   */
  groups: [ItgcPayload_Group, ItgcPayload_Group];
  /**
   * @minItems 2
   * @maxItems 2
   */
  group_order: [CommonIdentifier_LocalId, CommonIdentifier_LocalId];
  outcome: ItgcPayload_Outcome;
  independence_declared: boolean;
}
export interface ItgcPayload_Group {
  group_id: CommonIdentifier_LocalId;
  label: CommonIdentifier_Label;
}
export interface ItgcPayload_Outcome {
  outcome_id: CommonIdentifier_LocalId;
  label: CommonIdentifier_Label;
  scale: "continuous";
}
export interface ItgcPayload_Analysis {
  analysis_id: CommonIdentifier_LocalId;
  design_id: CommonIdentifier_LocalId;
  method_id: string;
  alternative: string;
}
export interface ItgcPayload_Result {
  result_id: CommonIdentifier_LocalId;
  analysis_id: CommonIdentifier_LocalId;
  /**
   * @minItems 2
   * @maxItems 2
   */
  group_summaries: [ItgcPayload_ResultGroupSummary, ItgcPayload_ResultGroupSummary];
  mean_difference: number;
  test_statistic: number;
  degrees_of_freedom: number;
  p_value: number;
}
export interface ItgcPayload_ResultGroupSummary {
  group_id: CommonIdentifier_LocalId;
  n: number;
  mean: number;
  sample_variance: number;
}
export interface RecordSchema_Integrity {
  canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1";
  digest_algorithm: "sha-256";
  digest_scope: "record_without_integrity";
  content_digest: CommonIdentifier_Sha256Digest;
}
