# Schema family coverage

Status: **UNISSUED CANDIDATE**. Exact IDs come from fixed T06; none is issued.

## Family inventory

| Identifier                                                             | Purpose                                                 | Producer                   | Consumer                             | Version binding                                 | Candidate path                                                          | Downstream |
| ---------------------------------------------------------------------- | ------------------------------------------------------- | -------------------------- | ------------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------- | ---------- |
| `https://nomue.ai/id/schema/record-balanced-two-factor/0.1.0-draft.1`  | Closed Record envelope                                  | Emitter                    | T07, T08                             | T06 exact bundle/profile/schema                 | schemas/record-balanced-two-factor-0.1-draft-1.schema.json              | T08        |
| `https://nomue.ai/id/schema/profile-balanced-two-factor/0.1.0-draft.1` | Closed BTF input and all declarations                   | Emitter                    | T07 relations, T08 numerical adapter | Exact Contract and Record schema                | schemas/balanced-two-factor-0.1-draft-1.schema.json                     | T08        |
| `https://nomue.ai/id/schema/report-balanced-two-factor/0.1.0-draft.1`  | Local check/evidence/outcome definitions; root deferred | Verifier boundary producer | T07 validation, T09 assembly         | Exact check ID/version, bundle and Record scope | schemas/verification-report-balanced-two-factor-0.1-draft-1.schema.json | T09        |

The report root rejects all instances intentionally. T07 does not publish an incomplete
whole-report schema as a usable final report contract. `checkResult`, `quantityResult`,
`quantityEvidence`, `violation`, `guaranteeBoundary` and `profileEligibility` are local
$defs, not separately issued public identities. The other local definitions support
their closed types. No extra schema-family ID is introduced.

## Every T06 surface

| T06 surface   | Schema / explicit defer                                             | Boundary                                                                                       |
| ------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| envelope      | record                                                              | Exact closed envelope and integrity metadata; digest computation T08                           |
| input         | payload                                                             | Shape, association and structural admissibility facts T07; model truth not asserted            |
| declarations  | payload                                                             | All 22 declarations, no truth recomputation                                                    |
| conformance   | record, payload, report#/$defs/violation, report#/$defs/checkResult | Raw/shape/relations implemented; final conformance report T09                                  |
| admissibility | payload, report#/$defs/checkResult                                  | T07 supplies model/count/unit facts; T08 consumes, T09 maps lifecycle                          |
| computability | report#/$defs/checkResult                                           | Result grammar only; domain/representation evaluation T08, refusal delivery T09                |
| comparison    | report#/$defs/quantityResult                                        | Represented declarations/results only; recomputation T08                                       |
| integrity     | record, report#/$defs/checkResult                                   | Metadata and scoped result shape; digest T08                                                   |
| evidence      | report#/$defs/quantityEvidence, report#/$defs/quantityResult        | Required public evidence boundary; full report T09; audit witness stays pinned research format |
| outcomes      | report#/$defs/checkResult, report#/$defs/profileEligibility         | Existing execution/outcome invariant only; final lifecycle/CLI and refusal mapping T09         |
| guarantee     | report#/$defs/guaranteeBoundary                                     | Closed eight-key not_asserted boundary; placement T09                                          |

COVERAGE.json resolves the shorthand above to exact schema references and maps all
16 Requirement candidates to their T06 surfaces. Requirement IDs remain context
metadata; no extra Requirement field is required in a Record. Check ID/version belongs
to output/context, not producer input. The Record carries only the existing envelope
identity fields and analysis.contract_id specified by T06.

Reused exact common identifier definitions are not an R2 analytical schema dependency.
Refusal and routing schemas retain their existing identities and have no new files:
T09 consumes the existing verifier-level refusal/routing machinery. PCS-0001/0006/
0012/0013 are future applicability bindings only; candidate PCS-0014/0015/0016 remain
unregistered. There is no implicit HTTPS retrieval.

## Optional and closed fields

Every Record/payload field is explicitly required. Quantity results require quantity,
declared, outcome and reason_codes plus exactly the applicable cell_id or contrast_kind.
Recomputed is required for a resolved pass, prohibited for indeterminate and optional
for fail because sound set exclusion can prove mismatch without a point. Projection
state is required exactly when an established recomputed value is zero. Reason codes
are nonempty for fail/indeterminate. These are representation conditions, not a
numerical proof of their values or outcome.

Check results require check_id/check_version, execution, scope and reason_codes.
Outcome exists exactly for completed; error details exist exactly for error;
not_run/error omit outcome and have reasons. The admissibility carrier cannot complete
indeterminate. Numerical completed/error scopes are result-local; numerical not_run
can use revision scope before conformance or result scope afterwards. T09 determines
which dependency stage applies. Context validation checks referenced IDs without
implementing that lifecycle. Full report/execution-failure finalization remains T09.

Audit rational/tail witnesses and internal scratch state are not public required
schema properties. Resource profile metadata and empirical tolerance fields are absent.
