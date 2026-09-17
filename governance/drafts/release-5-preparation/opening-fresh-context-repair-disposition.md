# Release 5 fresh-context review repair disposition

Status: informative author-side repair record. No gate is closed by this document.

## Fixed inputs and preservation

- Reviewed proposal: `0d6265f6fee059d8f8f8650600483b3a1b5e2090`.
- Fresh-context review commit: `5bca708be2004b7306db4f95d065e7e2b8bdaec7`.
- Review blob: `b1a71ff1b53ad6679ebea0bde96aaee27c219a99`.
- [Original report](opening-fresh-context-review-result.md), retained byte-for-byte.

The review found no blocker, four SHOULD_FIX and six NICE_TO_HAVE findings. Its
fresh-session disclosure is retained as review evidence; this repair is written in
the proposal author's context and is not independent clearance.

## Repair dispositions

| Finding | Author-side repair                                                                                                                                                                                 | Remaining closure                                                              |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| S-1     | Timing covers Contract, Profile and bundle identities and every projected design-fact declaration; a change after outcome access excludes `pre_outcome`, including restoration of an earlier value | Close-only diff confirmation                                                   |
| S-2     | R5-specific Record additions own only timing and identity references; missing design facts belong in the owning Profile's versioned declaration surface and mapping table                          | Close-only confirmation; exact surfaces remain R5-P3/P5 work                   |
| S-3     | RFC contains one eleven-item non-claim list, adding declarant identity/authentication/authorization and scientific classification; companion documents reference it                                | Close-only diff confirmation                                                   |
| S-4     | Issued bundle/Profile carriers are distinguished from unissued Contract carriers; legacy `method_id` is never a Contract alias                                                                     | Text repair confirmation; acceptance of actual family successors remains R5-P3 |
| N-1     | `consistency_only` is described as calculation evidence, not a check class                                                                                                                         | Confirm terminology                                                            |
| N-2     | No projection after conformance failure or blocked admissibility; `not_run` retains dependency identity/outcome, blocking codes, timing and non-claims; errors retain only obtained evidence       | Exact report encoding remains R5-P5                                            |
| N-3     | Outcome access covers the supplied dataset, including values outside a later declared subset; explicitly a proposed convention, not preregistration proof                                          | Confirm bounded wording; methodological assessment remains in R5-P2 addendum   |
| N-4     | Projected analysis-population value is explicitly a status, not an identifier                                                                                                                      | Per-Profile mapping tables remain R5-P5                                        |
| N-5     | Readiness explicitly records commission Q11 to Q14 as unanswered                                                                                                                                   | Independent full-text addendum                                                 |
| N-6     | Research frontier map points stale frozen rank-based R5 references to the canonical release horizon                                                                                                | Historical records unchanged                                                   |

## Counterexamples for the diff confirmation

1. Contract chosen before outcome access but pairing or population declaration
   finalized afterwards: `pre_outcome` is unavailable.
2. All declarations fixed before access, then one changed and later restored:
   `pre_outcome` is unavailable for that revision.
3. Selector sees outcomes that are later excluded from an analysis subset: access
   still counts under the supplied-dataset convention.
4. Producer cannot establish ordering: use `unknown`; the verifier does not
   authenticate the producer or prove the timing declaration.
5. Family lacks a design-fact carrier: a Profile-owned successor is required; the
   cross-cutting timing surface cannot absorb the missing fact.
6. Legacy Record has a method identifier but no Contract carrier: it remains a
   legacy Record, not an R5 tuple by aliasing or inference.
7. Profile admissibility blocks R5: retain the dependency and blocking codes, but
   emit no computed R5 projection.
8. A passed R5 result is shown as authentication of a declarant or proof of a
   scientific family classification: the eleven-item non-claim boundary excludes
   both readings.

## Gate and review boundary

R5-P1, R5-P4 and R5-P8 remain OPEN. The fresh-context report is valid evidence for
the unchanged scope; only one close-only diff confirmation is requested. The same
independent reviewer may perform that confirmation and disclose the continuation;
it need not repeat a full fresh-context review.

R5-P2 remains PARTIAL: this repair neither fetches primary sources nor answers the
methodological commission. `R5-RH-1`, Q11 to Q14 and assessment of the repaired
timing convention remain for the independent addendum. R5-P3, R5-P5 and R5-P6 remain
OPEN; R5-P7 remains PROVISIONAL. Exact mapping tables, report encoding, fixture
inventory and family successor acceptance are not supplied by this prose repair.

The next decision is whether the repaired question is ready for opening
authorization with explicit holds. No public issue, discussion clock, identifier,
normative change or release decision is created by this record.
