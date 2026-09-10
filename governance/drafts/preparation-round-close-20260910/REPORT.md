# Preparation round close: Releases 3 and 4

Date: 2026-09-10. Informative management handoff, not a release decision.

## Disposition and authority boundary

The four commissioned candidate/review work packages are complete at the fixed
identities in INPUTS.json. All four have bounded A-level GO determinations; none
requires an author repair for that commissioned use. Workers are paused. This
closes this preparation round, not Release 3, Release 4, D0, the Research Gate,
or the original objective of bringing R4 to R2 candidate maturity.

No PR is merged or closed, no release is published, and no scientific acceptance,
source hold, registered behavior, identifier or public-discussion state changes.
The author/review branches retain their reviewed bytes. This document supplies
additive usage clarification and a restart inventory, not another scientific review.

Prepared by the OpenAI Codex management session with all lane summaries visible.
The manager checked fixed Git objects, review content and GitHub CI observations;
it did not repeat the numerical suites or perform a separate-model primary review.
The reviews' disclosed independence limits remain applicable.

## Completed packages

| Lane | Author PR                                                      | Review PR                                                      | Completed scope                                                                              | Remaining boundary                                                       |
| ---- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1    | [279](https://github.com/licklider-ai/nomue-protocol/pull/279) | [281](https://github.com/licklider-ai/nomue-protocol/pull/281) | Exact represented-input arithmetic, enclosures, projection and resource evidence: limited GO | Separate-model source/derivation pass; support and composition decisions |
| 2    | [278](https://github.com/licklider-ai/nomue-protocol/pull/278) | [283](https://github.com/licklider-ai/nomue-protocol/pull/283) | Fixed-binary64-F tail derivation, enclosure/oracle and rounding: limited GO                  | Research Gate; checker limits; rational/interval API and composition     |
| 3    | [277](https://github.com/licklider-ai/nomue-protocol/pull/277) | [282](https://github.com/licklider-ai/nomue-protocol/pull/282) | Fifteen candidate evidence connections and 49 classifications: management GO                 | Holm provenance connection and candidate-specific design/review          |
| 4    | [276](https://github.com/licklider-ai/nomue-protocol/pull/276) | [280](https://github.com/licklider-ai/nomue-protocol/pull/280) | Unissued common declarations and result bindings: limited GO                                 | Scientific payloads, numerical evidence and formal identities            |

Review evidence, attributed rather than rerun by management:

- Lane 1: 968 cases / 18,380 quantities, 20,470 decode checks, fresh historical
  945-case execution; independent 137 additional cases / 2,597 quantities and
  16,388 projection checks. Zero blockers, zero required fixes, two optional notes.
- Lane 2: 220 cases replayed byte for byte; 42 rejection calls, 408 numerical
  negative controls, four midpoints and seven rejected record mutations. Added
  60 tail cases, 15 exact witnesses, 3,626 rounding checks and 88 rejections.
  Two concrete checker limitations do not invalidate these fixed results.
- Lane 3: all 15 connections and all 49 exact IDs/names/classes consistent;
  classification remains 15/27/5/2. A has zero required fixes and one optional
  locator note. B's two blockers apply to future implementation promotion.
- Lane 4: 70 structural, 12 compatibility and 67 reviewer checks passed;
  25 fixed inputs match. No findings requiring action.

Full commit/tree identities and all author/review file hashes are in INPUTS.json.
Fetch the numbered PR head, then verify the recorded commit and sole parent;
a later moving branch head is not covered by these reviews. The inventory does
not copy original papers or claim to archive external source bytes.

## Small clarifications completed in this handoff

### Lane 1 helper preconditions and historical replay

Use the lattice helper only on the stated finite binary64 values, and the
projector only on integer rational pairs with a strictly positive denominator.
Do not use their current coercion behavior as an input-validation API: Python
bool/large-int coercion and invalid denominators are outside the reviewed domain.
Input guards become implementation work before independent callable reuse.
No guard or numerical behavior is changed by this clarification.

For a fresh historical execution, use the review's reproduce.sh at review commit
87adcec680f90271d0a6e571c1892ec38a392751. From a checkout of that commit:

```sh
bash review-inputs/r4-arithmetic-2864903/reproduce.sh /tmp/r4-arithmetic-review-fresh
```

Supply an unused scratch directory and the review's documented dependencies.
The script creates a pinned author worktree and runs the historical probe as
well as candidate/reviewer checks. In contrast, author verify.py compares stored
historical records and does not itself launch the historical script. The reviewer
already ran the fresh sequence; management did not rerun it for this editorial note.

### Lane 3 APR-02 source locator

For the APR-02 unequal-size display, add Hayter (1984), p.62 equation (1.2),
alongside the balanced display on p.61 equation (1.1). This additive navigation
clarification follows PR 282 Section 4 and the linked all-pairs source record
Section 3.2. It changes no accepted mathematics and is not a fresh PDF reading.
The reviewed six-file map remains immutable.

### Lane 2 evidence-checker limits

The current verify_results.py is a research consistency checker. Its success
is not whole-record authentication, complete-corpus validation or proof that a
supplied candidate interval contains the target. In particular it does not check
all of decimal_80_digits, decimal_abs_error_upper, mathematical_tail,
projection_class and family, nor bind a frozen complete row roster and counters.
Use the fixed file hashes and recorded full replay when referring to this corpus.
A digest binds bytes; it does not prove mathematical assertions in those bytes.

PR 283 Section 7 demonstrates an interval at n=2, f=4 that overlaps the oracle
interval and has the correct rounded encoding but excludes the true probability.
Therefore interval overlap plus rounded-output agreement is insufficient evidence
of containment. Do not reuse that check as a candidate interval certificate.
The delivered candidate's mathematical derivation and fixed replay are separate
reviewed evidence; the counterexample concerns a mutated supplied interval.

Before broader checker reuse, bind an independently fixed roster/digest, specify
exactly which fields are checked, and recompute any fields claimed as certified.
Recompute the candidate enclosure at pinned precision and require the serialized
interval to contain it, or independently verify a complete root/sum certificate.
Retain the separate oracle condition and add the review's counterexamples as
negative tests. These behavioral changes and their verification are deferred;
this handoff does not falsely report O1/O2 as code defects repaired or closed.

## Remaining work and restart conditions

The following are descriptive work items, not new Protocol gate identifiers.
No further worker prompt is issued in this round.

| Priority     | Work package                                                                           | Completion evidence before promotion                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R4 first     | Independent primary-source and derivation pass for the new arithmetic and tail methods | Actual separate-model/investigator provenance; claim-level source/derivation findings; source access limits preserved                                           |
| R4 next      | Supported domain, resource and output design                                           | Explicit input/count/bit/time/memory/platform bounds, refusal rules, rounding and comparison policy; reviewed reasoning                                         |
| R4 next      | Tail checker hardening and exact-rational/interval adapter                             | O1/O2 negative controls, bound roster and checked fields, containment checks, no-guess failure paths; independent review                                        |
| R4 next      | Arithmetic-to-tail composition                                                         | Same input digest, contrast, n and df; exact positive SSE; rational F or certified interval; outward error propagation and integrated evidence                  |
| R3 parallel  | Holm B-1 evidence connection                                                           | Locate applicable existing independent-review testimony first; only if insufficient, perform the bounded existing-Holm-PDF confirmation in PR 282 Section 5     |
| R3 parallel  | Holm B-2 semantics/numerical design                                                    | Adjusted-p derivation and domain, thresholds, ties/member mapping, clipping, rounding versus decisions, input origin and resource limits independently reviewed |
| R3 later     | Bounded Holm implementation and common-structure connection                            | Applicable research conditions satisfied; separately reviewed implementation/evidence; no scientific guarantee inferred from supplied p-values alone            |
| R2 afterward | Resume R2 work after the agreed R4 maturation phase, with R3 parallel                  | Reassess current fixed R2 evidence and remaining formal decisions; do not treat this round as closing R2 work                                                   |

For R4, exact SSE=0 stops before F/tail; positive SSE or F rounded to zero does
not become mathematical zero. Finite exact F beyond binary64 range is not infinity.
For 0 <= L <= F <= U, combine outward bounds using Q(U) <= Q(F) <= Q(L), preserving
upstream and tail uncertainty separately. The current tail API accepts float
points only; an interface description is not an implemented adapter. Internal
rationals do not settle the proposal's finite public-output requirements.

New R4 original confirmation need not reopen the accepted normal-model scope.
Algorithm 708 access blocks claims depending on its unread details, not the
reviewed direct finite-sum derivation. Stable source-capture gaps remain explicit.
R3 retains the accepted ordinary-Holm research and historical classifications,
opening exclusions and numerical holds. B-1 is an unresolved connection, not proof
that an independent review never existed. B-2 design may be drafted with gaps
visible, but is not frozen or implemented on the strength of management GO.

## Current maturity and stopping point

R4 now has separately reviewed arithmetic and fixed-F tail components. It still
lacks the integrated supported-domain/runtime/comparison evidence that made R2
the reference maturity level. R4 has progressed but has not reached that level.
R3 now has reviewed planning evidence and a reviewed structural shell; it still
has no completed Holm numerical capability. Neither release is declared supported.

All four workers can stop at this round boundary. Reopen for the work packages
above or a material counterexample, changed fixed input/scope, or source conflict.
A later merge or formal adoption needs its own applicable process; it is not
implied by this management close. Public-discussion windows are unaffected.
