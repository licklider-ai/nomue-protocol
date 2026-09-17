# R4 Steward Ratification / Adoption Decision Packet v1

Status: **UNISSUED CANDIDATE**. Informative; A1 is CLOSED following the
[existing close-only GO](A1-CLOSE-REVIEW-RESULT-INTAKE.md).
Main Integration Decision: **MERGE NOW**, subject to integration checks.
This package makes no formal-adoption decision.

## Decision requested later

Consider the already closed balanced two-factor candidate for final adoption,
using the bounded support, non-claims and evidence below. Do not reselect T03
D01-D07, reopen T01-T14, or infer that candidate completion issues Protocol support.
A1-01 / BR-02 / BR-03 are independently CLOSED. The immediate authorized
action is informative main integration, not further implementation.

Management's R2 85% and R4 approximately 50% are supplied operational estimates,
not values calculated here. R2-like readiness means comparable reviewed candidate
decision inputs, not completed production dispatch or publication machinery.
The distinction is fixed in [the benchmark](R2-R4-BENCHMARK.md).

## Exact identity

| Role                                 | Exact target / interpretation                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Observed current main and A1 base    | `f1c77b743f655a8c37f323794a4ebdcb820927ab`; local main and origin/main matched; clean before branching                     |
| Integrated R4 source                 | `c62ba0f4ffe0e7a1992968f84adc81bd4546b217`; post-F13-01 candidate source                                                   |
| Independently reviewed frozen target | `88a5f488db8a777c691afbf85282f9be99fb00d4`; T13 GO supplied by maintainer; original target retained                        |
| T14                                  | FINAL READINESS — GO, supplied by maintainer for that frozen candidate; not formal adoption                                |
| PR 348 head                          | `9ec48f29aebbd46b327e8693efb3be2bf6606193`                                                                                 |
| PR 348 merge                         | `f1c77b743f655a8c37f323794a4ebdcb820927ab`; MERGED at 2026-09-17T01:27:06Z                                                 |
| F13-02 correction                    | `9ec48f29aebbd46b327e8693efb3be2bf6606193`; report lineage wording plus dependent package hashes only                      |
| Numerical research dependency        | `66fa2bc201c86c62f21bb94825479427c24d8522`; fixed G5 source objects, not a claim that its whole divergent branch is merged |

T13/T14 closure provenance appears in the [T13 intake](T13-RESULT-INTAKE.md),
[T14 intake](T14-RESULT-INTAKE.md) and [evidence map](REVIEW-EVIDENCE-MAP.md). These
newly stored, user-provided existing-result intakes are not original receipts.
Source/frozen/correction commits are ancestors of the integrated main. The A1
packet's containing commit identifies the new documentation; it is not substituted
for any historical reviewed numerical target.

### Main integration lineage

| PR                                                              | Merge commit                               | Scope                                               |
| --------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| [#331](https://github.com/licklider-ai/nomue-protocol/pull/331) | `3880db43a64e1758494f3c78f6850daab0e3e9e9` | T02 controlled execution                            |
| [#335](https://github.com/licklider-ai/nomue-protocol/pull/335) | `b094f69aedacb3f85e0e5d30df86a789d810024b` | T05 review sufficiency                              |
| [#336](https://github.com/licklider-ai/nomue-protocol/pull/336) | `cd0c6b6dcdcbf4e605a587a66c11e5ef7787fe9a` | T06-T08                                             |
| [#339](https://github.com/licklider-ai/nomue-protocol/pull/339) | `e5ee16b7f2b8c4e4f67defa4965b6934faae678c` | T03 with historical-preservation integration repair |
| [#340](https://github.com/licklider-ai/nomue-protocol/pull/340) | `d4058691eb79440e1791ebbf2c7a61cafd6f6002` | T04 architecture and EC1/EC2                        |
| [#341](https://github.com/licklider-ai/nomue-protocol/pull/341) | `07b373655110afb34ab4bcc3933f83c69fba6f2c` | T04 EC3/EC4 and F-01                                |
| [#348](https://github.com/licklider-ai/nomue-protocol/pull/348) | `f1c77b743f655a8c37f323794a4ebdcb820927ab` | T09 through re-freeze; separate F13-02 correction   |

## Proposed release scope

Balanced replicated 2x2 fixed-factor normal inference, full interaction retained,
one continuous outcome, at least two distinct independent units in each complete
cell, declared independent normal errors and common positive finite variance.
The three signed contrasts A/B/AB each have their own marginal null and upper
F(1, 4(n-1)) tail. Declaring the model does not prove its real-world truth.
Scientific basis: [MODEL-ACCEPTANCE](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/normal-model-steward-acceptance-2026-09-09.md); fixed policy: [T03](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t03-candidate-numerical-policy-decision-20260914.md).

The fixed 22 quantities are four cell counts and residual df (five integers),
four cell means, three signed estimates, three contrast sums of squares, SSE and
three F statistics (fourteen arithmetic reals), and three p-values. Exact declared
paths, discriminators and comparison modes are inherited from [T06](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t06-candidate-requirement-surfaces-20260915/CANDIDATE.json).
No partial quantity set is promoted as complete support.

Excluded: confidence intervals, standardized effect sizes, multiplicity/FWER
guarantees, significance booleans, causal or randomization claims, unequal or
missing cells, repeated/clustered units, mixed/random factors, transformations,
imputation, wider designs, producer interval carriers and optional evidence
acceptance mechanisms. No exact calibration after input quantization or
conditional on admission is claimed. No whole-Record VERIFIED result, universal
host completion, real-time SLA, or production support is asserted.

## Candidate public contract

These are existing candidates, not new allocations. [T06-CLAUSES](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t06-candidate-requirement-surfaces-20260915/REQUIREMENT-CANDIDATE.md) records
the sole proposed owners: five NRS-CONTRACT-BTF clauses, four NRS-PROFILE-BTF
clauses, NRS-VERIFY-0029 through 0032, and NRS-CORE-0020 through 0022: sixteen
in total. Their unissued spellings are not reservations. Current authoritative
allocation remains [REQUIREMENTS](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/registries/requirements.yaml); future issuance rechecks collisions.

### Exact identifier candidates

| Role          | Existing unissued identity                                                          |
| ------------- | ----------------------------------------------------------------------------------- |
| contract      | `https://nomue.ai/id/contract/balanced-two-factor/0.1.0-draft.1`                    |
| profile       | `https://nomue.ai/id/profile/balanced-two-factor/0.1.0-draft.1`                     |
| record        | `https://nomue.ai/id/schema/record-balanced-two-factor/0.1.0-draft.1`               |
| payload       | `https://nomue.ai/id/schema/profile-balanced-two-factor/0.1.0-draft.1`              |
| report        | `https://nomue.ai/id/schema/report-balanced-two-factor/0.1.0-draft.1`               |
| bundle        | `https://nomue.ai/id/bundle/balanced-two-factor/0.1.0-draft.1`                      |
| conformance   | `https://nomue.ai/id/check/balanced-two-factor-record-conformance/0.1.0-draft.1`    |
| integrity     | `https://nomue.ai/id/check/balanced-two-factor-record-integrity/0.1.0-draft.1`      |
| admissibility | `https://nomue.ai/id/check/balanced-two-factor-profile-admissibility/0.1.0-draft.1` |
| computability | `https://nomue.ai/id/check/balanced-two-factor-computability/0.1.0-draft.1`         |
| recompute     | `https://nomue.ai/id/check/balanced-two-factor-recompute/0.1.0-draft.1`             |

The bundle pins its Contract, Profile, Record/payload/report schemas, the ordered
conformance, integrity, admissibility, computability and recompute checks, and
check-set revision 0.1.0-draft.1. It reuses exactly
`urn:nomue:canonicalization:jcs:0.2.0-draft.1`; `supported` remains false.
Conformance gates integrity and admissibility independently; admissibility gates
computability, which gates recomputation. Conformance is reported in its own
section, not duplicated as a verification result. See [T06-IDS](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t06-candidate-requirement-surfaces-20260915/IDENTIFIERS.md).

[T07](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t07-closed-schemas-validator-20260915/REPORT.md) supplies closed Record/payload schemas and report components with
a deliberately rejecting report root. [T09-REPORT](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/REPORT-SCHEMA.md) supplies the completed
report root under the same candidate report identity using a separate loader.
Do not publish the T07 definitions-only root as the final report or load competing
roots. Record associations come from the T07 validator; numerical targets from
the unchanged T08/G5 path; T09 assembles the report and contextual validation.

The report retains scoped results, eligibility and guarantee boundaries, plus
22-key quantity evidence when permitted. Unresolved or set-based mismatch evidence
does not invent a recomputed point. Invocation failure suppresses the entire
completed report; an external verifier refusal remains a different output type.

[T09-REASONS](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/REASONS.json) contains 27 candidate bindings. Reused
reason meanings are preserved; BTF entries remain unissued. Its three downstream
spellings distinguish supported-domain exclusion, unsupported representation and
unresolved projection. F13-01 preserves invalid UTF-8 as parse refusal with
NRS-PARSE-FAILED. Full reason/precedence scope: [T09-INTERFACE](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/REASONS.md),
[F13-01](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t13-f13-01-repair-20260915/REPORT.md) and [the decision inventory](DECISION-INVENTORY.md).

Research automation maps completed all-pass to 0, proved failure/parse failure to
2, unsupported routing/numerical dependency or refusal to 3, resource refusal to
4, internal execution error to 5, and indeterminate-only completion to 6.
This is not issuance of public exit code 6. The current [CLI-CONTRACT](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/spec/verification/relying-party-interface.md)
has no indeterminate-only bucket; T03 fixes the nonzero/fail-priority intent and
requires an explicit future coupled interface change. Preparing/activating that
formal interface is not demonstrated in R2's 85% benchmark either. Its final
policy must not be silently inferred from the research numeric code.

Versioning follows [T06-VERSIONING](https://github.com/licklider-ai/nomue-protocol/blob/f1c77b743f655a8c37f323794a4ebdcb820927ab/governance/drafts/release-4-preparation/t06-candidate-requirement-surfaces-20260915/VERSIONING-MATRIX.md): published Requirement meanings are
immutable; changed meanings require successor IDs, not per-ID version edits.
Check-observable changes belong to check versions and exact bundles. Reference
cap/host changes do not automatically change public numerical membership, but
still require appropriate evidence and interface impact assessment.

## Numerical and execution judgment

Use [DECISION-INVENTORY.md](DECISION-INVENTORY.md) for the single consolidated
judgment table, closed D01-D07 and the public/reference/observed distinction.
No candidate policy is reselected by this packet.

## Final-adoption-only decisions

The steward retains namespace allocation and Requirement issuance; permanent
identifier issuance; final schema/check/reason/bundle adoption; final numerical
and reference-support adoption within the selected bounds; release scope;
RFC/comment disposition; authoritative landing authorization; and release
authorization. Candidate choices are fixed inputs to these decisions, not an
instruction to reopen technical alternatives. A changed scope follows its own
affected review and change process.

Public CLI/interface adoption includes its explicit version/Requirement treatment;
no new exit number or silent reinterpretation is approved here. The RFC opening
timestamp is not a blanket clearance of every later interface delta.

Final approval, window expiry and publication are excluded from the preparation
completion condition. A2-A5 implementation, source promotion, distribution and
combined reviews are [STRONGER-THAN-R2](REMAINING-WORK.md) unless a specific
benchmark gap is independently established; they are not automatic 85% blockers.
