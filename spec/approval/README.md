# Approval

**Status: Normative (EXPERIMENTAL), first increment, DRAFT.** This document
defines a first-increment approval contract: what the fixed approval
statement says, the concept-level shape of an approval element
(approver/scope/timestamp/statement), why a scope mismatch is a semantic
check outcome rather than a schema failure, and why v0 ships as an unsigned
placeholder. This increment is merged into the repository's specification history; git,
not prose, is authoritative for merge state. No Release-1 gate currently tracks
human-approval evidence specifically; this increment establishes requirement
and reference-implementation groundwork should such a gate be added in a
future increment, and closes no existing gate by itself.

**Why EXPERIMENTAL, not CORE, for now**: this is CORE-candidate material by
its nature (it defines part of a Record's provenance/responsibility
surface), but the 60-day public RFC discussion and named-steward approval
this repository's own process requires for CORE material
([../../governance/RFC.md](../../governance/RFC.md),
[../../registries/stability-tiers.yaml](../../registries/stability-tiers.yaml))
has not happened. Marking it EXPERIMENTAL here is honest about that, not a
statement that the content is expected to be unstable in substance.

## What is fixed by this increment

<a id="NRS-APPROVE-0001"></a>
**NRS-APPROVE-0001 - The approval statement** (stability: EXPERIMENTAL, status: active)
An approval element whose `statement` is
`urn:nomue:approval-statement:content-reviewed-responsibility-accepted:1` MUST
be read as meaning exactly this, and nothing more (fixed English wording):

> An approval records that the approver reviewed the content within the
> specified scope and accepted responsibility for that approval. It does not
> guarantee scientific correctness.

This wording is fixed by this increment and is not to be paraphrased or
extended in a conforming implementation; a different claim requires a
different, newly registered statement identifier, not a reinterpretation of
this one.

<a id="NRS-APPROVE-0002"></a>
**NRS-APPROVE-0002 - Approval shape** (stability: EXPERIMENTAL, status: active)
An approval element MUST carry, at minimum: an approver (a name and an
opaque `approver_id`), a scope (using the same scope shape as a public check
result: `{kind, id}`), an RFC 3339 UTC timestamp, and the fixed statement
identifier of NRS-APPROVE-0001. This is bound in code at
[../../reference/verifier/src/approval.ts](../../reference/verifier/src/approval.ts)'s
`Approval` interface; no schema in this increment marks it as a field of any
registered Record bundle (see "What this increment does not decide" below).

<a id="NRS-APPROVE-0003"></a>
**NRS-APPROVE-0003 - v0 is an unsigned placeholder** (stability: EXPERIMENTAL, status: active)
An approval element in this increment carries no signature. It is a
structural record of an approver's declared intent, not a non-repudiable
cryptographic claim; a relying party MUST NOT treat an unsigned approval as
carrying the same evidentiary weight as a signed attestation would. The
attestation contract is a separate, merged EXPERIMENTAL increment with its own
signature-suite and trust semantics; it does not make this approval element
signed or change the evidentiary meaning of NRS-APPROVE-0003. Whether a future
increment requires a signature for approval, and if so whether it reuses the
attestation signature machinery or defines its own, remains an open discussion
item (see below), not decided by this increment.

<a id="NRS-APPROVE-0004"></a>
**NRS-APPROVE-0004 - Scope consistency is a semantic check outcome, not a schema failure** (stability: EXPERIMENTAL, status: active)
Whether an approval's declared `scope` actually identifies the Record it is
attached to cannot be expressed as a JSON Schema structural constraint (it
requires comparing two sibling values at check time), and this increment
does not adopt a schema-level cross-field constraint mechanism to force it.
An implementation MUST evaluate scope consistency as a semantic check
(depth ②: consistency evidence) producing an execution/outcome result with
reason code `NRS-APPROVAL-SCOPE-MISMATCH` on mismatch or
`NRS-APPROVAL-ABSENT` when no approval element is present to check
(`execution: not_run`, never silently treated as a pass). Here depth ② is
shorthand for the authoritative `consistency_evidence` evidence-class
dimension in
[../../registries/public-checks.yaml](../../registries/public-checks.yaml)
and its meta-schema; it is not a separate classification table in
`public-checks.md`. The non-normative reference implementation is
[../../reference/verifier/src/approval.ts](../../reference/verifier/src/approval.ts)'s
`checkApprovalScope`.

## What this increment does not decide (open discussion items)

- **Signature requirement**: whether an approval element must be signed to
  be relying-party-usable, and if so how it relates to the attestation
  contract's signature machinery, is explicitly not decided here (see
  NRS-APPROVE-0003). v0 ships unsigned.
- **Record-envelope attachment mechanism**: this increment defines the
  approval element's shape (NRS-APPROVE-0002) and a standalone scope
  consistency check (NRS-APPROVE-0004), but does not wire either into any
  registered Record schema or interpretation bundle. A future increment
  decides whether approval becomes an optional field on a new Record schema
  version (requiring a new bundle registration and verifier dispatch code,
  mirroring how a new numerical-contract bundle was added in
  `urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1`), or a companion artifact
  attached alongside a Record the way an attestation attaches to a
  verification report. Neither path is taken in this increment; taking
  either is real, non-editorial implementation work, not a documentation
  change.
- **Approver identity verification**: nothing here establishes that the
  party named in `approver.name` is who they claim to be, beyond whatever an
  `approver_id` scheme a future increment defines.
- **Multiple and sequential approvals, withdrawal, supersession**: a Record
  with more than one approval, an approval that withdraws or supersedes an
  earlier one, and how a relying party should combine multiple approvals
  into a single judgment are all undecided.

A future increment resolves these through the normal RFC process; this
increment does not pre-decide them by shipping ad hoc behavior.

## Reference implementation (non-normative, this increment only)

`reference/verifier/src/approval.ts` implements the `Approval`/`Approver`
types and a pure `checkApprovalScope(input)` function taking `{approval:
Approval | null, record_reference}` and returning a single check result:
`not_run` with `NRS-APPROVAL-ABSENT` when `approval` is `null`, `pass` when
`scope.id` matches either the record's `record_id` or `revision_id`, `fail`
with `NRS-APPROVAL-SCOPE-MISMATCH` otherwise. It is not wired into the
`verify` CLI pipeline or any registered bundle - there is no schema that
declares an `approval` field on any Record in this increment (see "Record-
envelope attachment mechanism" above).

Unlike the attestation first increment, this one does ship machine-checkable
conformance coverage: the `approval` fixture family (D1-001 approval-present,
D1-002 approval-absent, D1-003 approval-scope-mismatch,
`conformance/fixtures/approval/`) is replayed by the shared conformance
runner (`tooling/src/phase1/conformance.ts`) through a dedicated
`approval_check` fixture kind that calls `checkApprovalScope` directly on
each fixture's input, exactly as `reference/verifier/src/verify.ts` is
called for ordinary Record fixtures. This is a narrower commitment than full
Record-envelope wiring would be - the check runs, but nothing routes to it
automatically from a real Record yet - and is scoped intentionally: giving
NRS-APPROVE-0004 real, non-fabricated conformance evidence without
prejudging the attachment-mechanism discussion item above.
