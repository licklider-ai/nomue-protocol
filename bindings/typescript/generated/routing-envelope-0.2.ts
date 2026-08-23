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

/**
 * Bundle-independent verifier-level routing contract (NRS-VERSION-0008). Before any interpretation bundle is selected, the verifier validates ONLY the minimum needed for exact bundle dispatch: the JSON root is an object and interpretation_bundle_id is present as a string. This is NOT a Record conformance schema: it never judges Record conformance, it does not interpret the scientific or structural meaning of any other field, and it never selects a default bundle (NRS-VERSION-0007). Bundle selection itself is exact registered identifier equality against the interpretation-bundle registry; registry order has no semantic meaning.
 */
export interface NomueVerifierRoutingEnvelope {
  interpretation_bundle_id: string;
}
