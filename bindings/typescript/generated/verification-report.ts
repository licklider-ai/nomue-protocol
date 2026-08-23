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
export type ExecutionOutcome_ConformanceResult = {
  [k: string]: unknown;
} & {
  check_id: string;
  execution: "completed" | "not_run" | "error";
  outcome?: "pass" | "fail" | "indeterminate";
  scope: ExecutionOutcome_Scope;
  reason_codes: ExecutionOutcome_ReasonCode[];
  error?: ExecutionOutcome_ErrorObject;
};
export type ExecutionOutcome_ReasonCode = string;
export type ExecutionOutcome_CheckResult = {
  [k: string]: unknown;
} & {
  check_id: string;
  check_version: string;
  execution: "completed" | "not_run" | "error";
  outcome?: "pass" | "fail" | "indeterminate";
  scope: ExecutionOutcome_Scope;
  reason_codes: ExecutionOutcome_ReasonCode[];
  evidence?: ExecutionOutcome_Evidence;
  error?: ExecutionOutcome_ErrorObject;
};
export type CommonIdentifier_Sha256Digest = string;
export type CommonIdentifier_LocalId = string;

/**
 * A verification report is a separate artifact from the Record (NRS-CORE-0008). It has no overall status, no VERIFIED value, and no whole-record validity boolean; every result is inseparable from its check identifier, version, and scope. Scientific validity is fixed to not_asserted.
 */
export interface Phase1NomueVerificationReport {
  $schema: "urn:nomue:schema:verification-report:0.1.0-draft.1";
  report_type: "nomue-verification-report";
  record_reference: ReportSchema_RecordReference;
  interpretation_bundle_id: CommonIdentifier_Uri;
  verifier: ReportSchema_Verifier;
  generated_at: string;
  conformance: ExecutionOutcome_ConformanceResult;
  verification_results: ExecutionOutcome_CheckResult[];
  guarantee_boundary: ReportSchema_GuaranteeBoundary;
}
export interface ReportSchema_RecordReference {
  record_id: CommonIdentifier_Uri;
  revision_id: CommonIdentifier_Uri;
  content_digest: string;
}
export interface ReportSchema_Verifier {
  name: string;
  version: string;
  source_commit: string;
}
export interface ExecutionOutcome_Scope {
  kind: "record" | "record_revision" | "analysis" | "result";
  id: CommonIdentifier_Uri;
}
export interface ExecutionOutcome_ErrorObject {
  error_type: string;
  message: string;
}
export interface ExecutionOutcome_Evidence {
  declared_content_digest?: CommonIdentifier_Sha256Digest;
  recomputed_content_digest?: CommonIdentifier_Sha256Digest;
  standard_error?: number;
  p_value_clamped?: boolean;
  recomputed?: ExecutionOutcome_RecomputedWelchResult;
  mismatches?: ExecutionOutcome_Mismatch[];
}
export interface ExecutionOutcome_RecomputedWelchResult {
  /**
   * @minItems 2
   * @maxItems 2
   */
  group_summaries: [ExecutionOutcome_GroupSummary, ExecutionOutcome_GroupSummary];
  mean_difference: number;
  test_statistic: number;
  degrees_of_freedom: number;
  p_value: number;
}
export interface ExecutionOutcome_GroupSummary {
  group_id: CommonIdentifier_LocalId;
  n: number;
  mean: number;
  sample_variance: number;
}
export interface ExecutionOutcome_Mismatch {
  quantity: string;
  group_id?: CommonIdentifier_LocalId;
  declared: number | string;
  recomputed: number | string;
}
export interface ReportSchema_GuaranteeBoundary {
  scientific_validity: "not_asserted";
}
