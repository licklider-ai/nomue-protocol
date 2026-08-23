# Relying-Party Interface

**Status: Normative (EXPERIMENTAL).** This document defines how a relying
party - a human reviewer, an agent, or a CI system that receives a
verification report or refusal and must reach a decision from it -
interprets the existing report and refusal fields defined in
[verification-report.md](verification-report.md) and
[verifier-refusal.md](verifier-refusal.md). It adds no new field to the
public contract; every clause here constrains interpretation of fields that
already exist. Tracked by gate R1-13
([../../authority/release-1-gates.yaml](../../authority/release-1-gates.yaml)).

## Scope

A relying party consumes the JSON output of a conforming verifier (a
`verification-report` or a `verifier-refusal` object) and nothing else: not
the Record itself in place of the report, not out-of-band claims about the
Record, and not this specification's prose in place of the machine-readable
result. What a relying party does with its decision - accept a submission,
flag it for human review, block a pipeline step - is out of scope; only how
it may read the report is in scope.

Informative note: when the verifier output is a `verifier-refusal` object,
the input is not a verified artifact bundle and lifecycle state projection
is not defined for it; the consumer reads only `refusal_kind` and
`reason_codes` (see
[../core/record-lifecycle.md](../core/record-lifecycle.md)).

## Requirements

<a id="NRS-VERIFY-0022"></a>
**NRS-VERIFY-0022 - `not_run` is absence of evidence, not a verdict** (stability: EXPERIMENTAL, status: active)
A relying party MUST NOT treat a check result whose `execution` is `not_run`
as either `pass` or `fail`. It MUST treat it as "no evidence was produced by
this check, in this scope, for this report" - the same distinction the
execution/outcome model itself makes
([execution-outcome-model.md](execution-outcome-model.md)) between a
question posed and answered versus a question never posed.

Informative note: a `not_run` result commonly follows an upstream gating
failure (for example, `welch-recompute` does not run when
`itgc-preconditions` fails). Treating `not_run` as `fail` double-counts the
same underlying problem; treating it as `pass` fabricates evidence that was
never produced. Both are prohibited by this clause.

Informative note: a common consumer-side pattern (not a normative vocabulary
of this specification) classifies each scoped result for local workflow as
`usable`, `needs_review`, or `unusable` by applying NRS-VERIFY-0022:
`completed`/`pass` maps to `usable`, `completed`/`fail` to `unusable`,
`not_run` and `error` to `needs_review`, and `completed`/`indeterminate`
to `needs_review`. Treating that pattern as an overall verdict would
contradict NRS-VERIFY-0024.

<a id="NRS-VERIFY-0023"></a>
**NRS-VERIFY-0023 - `not_asserted` is not evidence for or against the claim** (stability: EXPERIMENTAL, status: active)
A relying party MUST NOT treat any `guarantee_boundary` field valued
`not_asserted` as evidence that the corresponding claim is true, false, or
even assessed. It MUST treat it as "this verification procedure did not
evaluate this claim at all," distinct from both `pass` (evaluated and held)
and `fail` (evaluated and failed) - the same three-way distinction
[verification-principles.md](../core/verification-principles.md)'s
NRS-VERIFY-0003 already makes for `scientific_validity` specifically,
extended here to every `guarantee_boundary` field for every relying party
that reads one.

Informative note: this is the single most common relying-party error this
clause exists to prevent - reading `not_asserted` as an implicit "probably
fine" because the report as a whole otherwise looks clean. A verification
report never implies more than it explicitly states (NRS-CORE-0011).

<a id="NRS-VERIFY-0024"></a>
**NRS-VERIFY-0024 - No relying-party-side aggregation into an overall verdict** (stability: EXPERIMENTAL, status: active)
A relying party MUST evaluate each scoped verification result
independently and MUST NOT combine multiple scoped results (across checks,
across bundles, or across Records) into a single derived overall judgment
that it then treats as if the verifier itself had emitted it.

Informative note: [verification-principles.md](../core/verification-principles.md)'s
NRS-VERIFY-0001 prohibits the verifier from emitting an overall status;
this clause closes the obvious loophole where a relying party silently
reconstructs the same prohibited status downstream by ANDing together
every `outcome` it sees. A relying party's own business logic is free to
define its own acceptance policy over the individual scoped results (for example,
"reject if any `public_checks` result is `fail`") - that policy is a
decision the relying party owns and states explicitly, not something this
specification defines or implies, and it is not itself a nomue verification
result.

## Worked example

Given a Phase 2A report where `record-integrity` and
`itgc-profile-admissibility` are `completed`/`pass`,
`welch-computability` is `completed`/`fail`, and `welch-recompute` is
`not_run`, with `guarantee_boundary.declaration_truth: not_asserted`:

| Reading                                                                                                                                                                          | Correct?                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| "The Record is invalid overall."                                                                                                                                                 | No - no overall status exists to read (NRS-VERIFY-0001, NRS-VERIFY-0024).       |
| "`welch-recompute` passed since nothing said it failed."                                                                                                                         | No - `not_run` is not evidence of passing (NRS-VERIFY-0022).                    |
| "The declaration is truthful since nothing flagged it as false."                                                                                                                 | No - `not_asserted` is not evidence either way (NRS-VERIFY-0023).               |
| "Integrity and admissibility held; computability failed; recomputation produced no evidence because it was gated; declaration truth was not evaluated by this procedure at all." | Yes - each field read at its own scope, nothing inferred beyond what is stated. |

## Exit-code contract (CLI relying parties, e.g. CI)

A relying party that scripts against a CLI implementation's process exit
code, rather than parsing the JSON body, reads a narrower signal: it learns
which of five buckets the outcome fell into, not the outcome's actual
content. NRS-VERIFY-0022's caution applies with extra force here - an exit
code is a coarser summary than the report it stands in for, so the bucket
boundaries below are exactly as stated and are never re-derived by
guessing from a specific implementation's behavior.

<a id="NRS-VERIFY-0025"></a>
**NRS-VERIFY-0025 - Exit-code contract** (stability: EXPERIMENTAL, status: active)
A conforming CLI implementation of `verify` MUST use exactly these five
exit codes, with exactly this meaning, and MUST NOT use any of them for a
different meaning. Code `2` is emitted in two distinct situations (a
completed report with a failed check, or a `parse_error` /
`canonicalization_failure` refusal with no report); a relying party that
needs to distinguish them MUST inspect the output's
`output_type`/`report_type` field rather than assume from the exit code
alone.

| Code | Meaning                                                                                                                                                                          |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`  | Completed: a report exists and every applicable check outcome is `pass`.                                                                                                         |
| `2`  | Either a report exists and at least one applicable check outcome is `fail`, or a `parse_error` / `canonicalization_failure` refusal was emitted (no report exists in that case). |
| `3`  | A `routing_error` or `unsupported_bundle` refusal was emitted; no report exists.                                                                                                 |
| `4`  | A `resource_limit` refusal (a safe refusal) was emitted; no report exists.                                                                                                       |
| `5`  | An `internal_error` refusal was emitted, or the CLI could not even attempt verification (a usage error, an unreadable file); no report exists.                                   |

Informative note: exit code `2` covering two different `output_type` values
is a deliberate design choice already present in the reference
implementation (`reference/verifier/README.md`), not something this clause
introduces; this clause makes it a cross-implementation requirement rather
than an implementation detail. This table is drift-tested against the
reference implementation's actual behavior in
`tooling/tests/exit-code-contract.test.ts`.

<a id="NRS-VERIFY-0028"></a>
**NRS-VERIFY-0028 - `indeterminate` is not a pass surrogate** (stability: EXPERIMENTAL, status: active)
A relying party that reads a completed check result whose `outcome` is
`indeterminate` MUST NOT treat that outcome as `pass` or as equivalent
acceptance evidence.

Informative note: `indeterminate` is a schema-permitted outcome for forward
compatibility; the v0 reference verifier does not emit it.

## Relationship to other interfaces

This document does not define a wire protocol, an API, or a UI; it defines
reading rules for the JSON already produced by
`pnpm nomue-record verify`. It does not cover interactive clarification,
command availability, or any other Layer 2 concern excluded by
[layer-boundary.md](../core/layer-boundary.md).

## Informative: reading lifecycle state

A relying party may additionally consult a Record's lifecycle state view
(the derived projection of
[../core/record-lifecycle.md](../core/record-lifecycle.md)): six
orthogonal axis values, each with its truth-carrier pointer. Reading
discipline mirrors this document's core rule - the state view contains NO
overall verdict (NRS-CORE-0013, NRS-VERIFY-0001), the `verification` axis
reports artifact existence and trust-root linkage only, and the `check`
axis reports execution coverage only; whether checks PASSED is read
per-check from the report exactly as before. The `disclosure` axis is
where a relying party learns that a revision was withdrawn or superseded
(a fact carried by append-only notices, never by mutating the Record).
The next-stage MCP reference implementation is planned as the first
consumer of this state surface.
