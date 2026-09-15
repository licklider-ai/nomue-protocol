# T09 closed report candidate

Status: **UNISSUED CANDIDATE**.

[report.schema.json](report.schema.json) completes the T07 definitions-only root using
its exact candidate report identity. T07 files stay unchanged. A separate Ajv instance
loads this root; it does not register two competing definitions in the public dispatcher.
The generator copies fixed T07 components and tightens reason membership to the T09
inventory. No Record schema or relational rule is copied or changed.

Root names follow existing reports and the opening RFC: record_reference, verifier,
generated_at, conformance, verification_results, profile_eligibility and guarantee_boundary.
T09 places the existing T07 quantityEvidence component in quantity_evidence, following
the T08 handoff field name; this is candidate assembly syntax, not a new Record field. Conformance is reported only in its section. Integrity,
admissibility, computability and recompute appear exactly once. Digest uses the existing
record-content domain tag and excludes only root integrity. Existing unidentified
Record/revision placeholders are retained for unreadable identities on structural failure.

No overall Record outcome is added. The internal [invocation envelope](invocation.schema.json)
has no public $id and separates completed report from existing draft.3 verifier refusal.
It carries fixed T07/T08/G5 commits and the exact report-schema hash. This provenance
is research metadata, not attestation or a new Protocol identity. The containing Git
commit and source manifest bind the T09 implementation. The verifier has a research
name/version; no uncommitted source is falsely labeled with an ancestor commit.
The generated_at value is this artifact's fixed date, excluded from semantic claims.

## Required contextual validation

[report.ts](report.ts) adds defensive consistency checks after closed shape validation:
exact check set/version, revision/digest/scope binding, T07 quantity/declaration association,
22 unique quantities, reason/result consistency, eligibility, dependency blocking,
no partial quantity delivery for gates, and T08 aggregate consistency. It never
recomputes numerical targets. A point mismatch is checked against its declared/projected
pair; generic set-based mismatch can omit the point. Execution refusal cannot contain a
report, and no quantity success is manufactured for not_run.

Determinate quantity evidence is T08's existing output. T09 fills only the previously
deferred generic unresolved encoding using the same T07 names and reason distinction.
The public body omits full rational/tail audit witnesses; bounded identity/projection/
comparison evidence stays sufficient for the selected report contract.
