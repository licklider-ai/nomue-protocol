# R2-D5 G4-to-Tail Composition Review-State Synchronization - Adversarial Review Result

Verdict: **GO**

No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE findings. This increment is a clean,
accurate, fail-closed synchronization of the completed independent PR #60
composition review into the candidate checkpoint, numerical readiness, and
explanatory governance text. The recorded review chain matches the primary
artifacts fact for fact and hash for hash, the composition implementation
delta is provably limited to review-maturity metadata (a runtime A/B
comparison of the base and head evaluators is identical bit for bit modulo
the single reviewed flag), every promotion, demotion, and mutation attack on
the two updated validators is rejected, the stale "not yet composed"
language is gone from all live documents without any over-promotion, and
authority, registries, schemas, conformance, and Release 1 are byte-level
unchanged. The full repository regression passes at the pinned head.

`GO` means only that the independently reviewed actual-execution composition
may be recorded in the non-authoritative R2-D5 readiness state. The complete
non-claims list is in section 10.

## 1. Exact identities (independently verified in a fresh clone)

| Item                        | Value                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Review-input head (PR #62)  | `fdf524682ee1f99b003afecaa625871ce64d6a6e` (tree `e523a73eec8a34ec614f2562befb24f72ac0aa29`)                |
| Base = PR #61 merge         | `e674bacc90ad127602072432bc730d1b5c05c20a` = merge-base; head is ahead-only by exactly 1 commit             |
| Reviewed delta              | exactly 12 paths, +351/-84, matching the PR metadata (12 files, 1 commit); no unexpected path               |
| PR #60 review input         | `c8cfed942e56922dc22e0fa2f10dafd74de3c8f3` (tree `6ab4281e...`, parent `81c2d2ba...`)                       |
| Independent review result   | `480473b906f587b96a8c7cb114bd5977b332a15a` (parent `c8cfed94...`, tree `7ba12879...`), verdict GO           |
| PR #60 merge                | `106eaaf6c327975b81da71d15a498082ba0bd2b6` (parents `81c2d2ba...`, `c8cfed94...`; tree equals review input) |
| PR #61 durable-record merge | `e674bacc...` (parents `106eaaf6...`, `093849c1...`); merge tree equals the review-result commit's tree     |
| Environment                 | fresh clone, detached checkouts; Node v22.22.2, pnpm 11.7.0, Linux x86_64                                   |

The PR head did not move during the review (re-fetched and re-compared
immediately before this record was written; the base branch also still
points at `e674bacc...`).

## 2. Review-chain fidelity

- The durable retention of the original review record was verified at the
  strongest available level: the PR #61 merge tree `7ba12879...` is
  byte-identical to the tree of the review-result commit `480473b9...`, and
  the blob of
  `review-inputs/r2-d5-g4-tail-trace-composition-candidate/REVIEW-RESULT.md`
  (`5c172f212fd4d9411908bc0e20ff6afe8b7415ce`) is identical at the review
  commit, the PR #61 head, the PR #61 merge, and the PR #62 head. The
  reviews-index sentence "retained in
  `review-inputs/r2-d5-g4-tail-trace-composition-candidate/REVIEW-RESULT.md`"
  is therefore literally true at the head.
- Every claim in the new disposition
  (`d5-g4-tail-trace-composition-adversarial-review-disposition.md`) was
  checked against that primary record: verdict `GO`; zero BLOCKER,
  SHOULD-FIX, and NICE-TO-HAVE findings; O1 recorded as a design
  observation only, with its self-contained provenance boundary restated
  rather than reinterpreted or omitted; 291 reviewer checks with zero
  failures; the 11-case corpus spanning df 1, 2, 4, 9, 30, 149, and 200 and
  the exact-zero, central, and signed branches; the valid-trace swaps; the
  nine coherently re-digested link rewrites and nine coherently re-digested
  nested-trace mutations; hostile-shape checks on both validators; the 100
  checkpoint mutations; the 431-test regression; and CI #181 with paired-t
  candidate evidence #47 and runtime-series evidence #37 on the exact
  review head. Every figure matches.
- The disposition's summary of what the review established (exact
  `(t bits, df)` handoff, both nested traces re-verified rather than
  digest-trusted, p-value read from the verified tail trace with source
  sequence preserved) matches the reviewed implementation and the primary
  record, and its "does not establish" list matches the review's
  non-claims.

## 3. Composition implementation invariance

The full byte diff of
`tooling/src/spikes/paired-t-g4-tail-trace-composition-candidate.ts`
between base and head consists of exactly: the result-envelope maturity
flag `tailTraceCompositionIndependentlyReviewed` moving `false -> true` at
its two type sites and two literal sites; the expected-checkpoint constant
moving to the reviewed state (decision state, readiness-admission block,
closure implementation, composition review `pending -> closed`, and removal
of the now-satisfied `reviewed_end_to_end_p_value_trace` prohibited claim);
and one doc-comment word. No parsing, evaluator-invocation, handoff, link,
digest, verifier, ordering, classification, numerical, or freezing line
changes.

This was additionally proven at runtime: the base implementation was
materialized beside the head implementation (both importing the same
unchanged underlying evaluators) and both were run over a 12-input
reviewer corpus (5 successes including exact-zero, df 30, and negative-t;
7 refusals including zero-variance, overflow, a df-3 subnormal-t tail-stage
witness, and hostile shapes). For every input the two outputs are
canonically identical except the single reviewed flag, classifications are
equal, freeze behavior is identical, each verifier accepts the other
implementation's composition envelope, and the outer digest, link fields,
p-value bits, test statistic, and df are bit-equal. The exact-zero branch
retains the `+0` handoff and the `null` p-value source. 65 checks, zero
failures. The underlying G4 candidate, supported-execution candidate,
reference implementations, and all evidence files are outside the 12-path
delta entirely.

The removed prohibited claim was scrutinized separately: it legitimizes
only the claim the completed PR #60 review actually established (a reviewed
end-to-end actual-execution p-value trace), while
`complete_g4_mathematical_truth_error_bound`, the confidence-interval,
supported-bound, domain, runtime, and issuance prohibitions all remain in
the committed list, and re-adding the removed entry or removing any
remaining entry is rejected by the validator.

## 4. Machine-state synchronization (checkpoint and readiness)

- `g4-tail-trace-composition-candidate.json` changes exactly mirror the
  expected-checkpoint constant (same six state movements, nothing else).
  At the head it still records `status: non_authoritative_candidate`,
  `issuance: unissued`, the unchanged issue #25 binding,
  `runtime_support_enabled: false`, `supported_domain_claimed: false`,
  truth-bound and confidence-interval closure `pending`, resource bound and
  execution predicate `unselected`, and the admission state limited to
  `admitted_as_independently_reviewed_non_authoritative_candidate`.
- `evidence-readiness.json` changes exactly three lines in the G4 block:
  two new exact path bindings (composition artifact and composition review
  disposition) and `tail_trace_composition_complete: false -> true`. Truth
  bound, confidence-interval composition, domain, and runtime remain
  `false`; ceilings remain marked as not supported resource bounds; the
  numerical contract remains unfrozen, comparison tolerances `null`, the
  execution predicate unselected, and reason codes unfrozen.
- `paired-t-numerical-readiness.ts` updates type, closed key list, and
  equality pins symmetrically, and now rejects the stale
  `tail_trace_composition_complete: false` state as fail-closed as it
  rejects promotions.
- Transition semantics were proven in both directions: the head validator
  accepts exactly the committed head checkpoint and rejects the base
  (stale) checkpoint; the base validator rejects the head checkpoint; the
  head readiness validator rejects the base readiness file.

## 5. Promotion, demotion, and mutation battery (212 checks, 0 failures)

Reviewer-owned battery at the head, all rejections verified fail-closed:

- Checkpoint recursive walk: 75 mutations (every scalar wrong-valued, every
  key deleted, an extra key injected at every object level) - all rejected;
  a full key-reorder is accepted (canonicalization control, proving the
  sweep is non-vacuous) while a `prohibited_claims` array reorder is
  rejected (order-sensitive).
- 27 named checkpoint attacks: runtime and domain promotion; admission
  demoted to held, promoted to bare `admitted`, or promoted to
  `admitted_as_supported`; stale review-pending and stale pre-review
  decision/implementation strings; fabricated truth bound and
  confidence-interval completion; resource-bound and predicate selection;
  removal of each remaining prohibited claim and re-addition of the
  satisfied one; hidden support keys; `status: authoritative`;
  `issuance: issued` - all rejected, plus the base/head cross-state
  rejections above.
- Hostile shapes against both validators (null, undefined, number, string,
  array, function, symbol-keyed, accessor-bearing, throwing proxy,
  inherited-only): no exception escapes, everything rejected, and zero
  accessor invocations were observed.
- 22 named readiness attacks: composition demotion to `false`; wrong,
  deleted, and swapped artifact/disposition paths; truth, CI, domain, and
  runtime promotion; review-flag regression; stale closure; wrong G4 review
  disposition; ceilings promoted to supported bounds; hidden
  `supported_platform_selected`; whole-block deletion; contract frozen;
  non-null tolerances; reason codes frozen; predicate selection; extra keys
  at top level and in the block - all rejected.
- Readiness G4-block walk: 38 per-field wrong-value and deletion mutations,
  all rejected. The committed files are accepted exactly as committed.

## 6. Documentation consistency

The candidate README, numerical README, reviews README, steward
ratification package, and new disposition were read in full at the head
against their base versions. The stale statements that the G4 and tail
traces are not yet composed ("does not compose the G4 trace with the
Student-t tail trace", "the two traces are not yet composed", "composition
with the tail ... remain(s) open/pending") are all removed or reworded, and
each new composition paragraph carries the bounding language: the
composition review closes only the actual-execution composition
requirement, the G4 mathematical-truth error bound and confidence-interval
composition remain pending, and no supported execution, platform, domain,
runtime, Public Check, bundle, R2-D5, RFC, or Release 2 claim is made.
Tree-wide scans for over-promotion ("mathematically true", "production",
"certified", completion language) found no new occurrence attributable to
this delta; remaining "certified" occurrences are the pre-existing,
previously reviewed inverse-beta table-evidence terminology, and the one
"composition remains pending" sentence refers to the confidence-interval
composition, which is genuinely pending.

Scoped observation (not a finding under this protocol's Section J): the
upstream G4 checkpoint `g4-execution-trace-candidate.json` retains
`"tail_trace_composition": "pending"` in its own closure ledger. This
protocol's Section B forbids this increment from touching the G4 candidate
beyond the composition candidate's metadata, the residual string is in the
conservative (anti-promotion) direction, and the live composition state now
lives in the composition checkpoint and readiness surfaces that all updated
documents point to. A future G4-side increment may reconcile that ledger
entry; nothing about it blocks this synchronization.

## 7. Authority, issuance, and RFC state

None of the 12 delta paths touches `authority/`, registries, authoritative
schemas, `spec/`, `conformance/`, `generated/`, `bindings/`, Public Checks,
bundles, verifier dispatch, or Release 1 surfaces, and `authority/` is
byte-identical between base and head. The content-addressed authority
snapshot recomputed at the head is
`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`,
identical to the durable recorded constant. Public RFC issue #25 is OPEN
with the public review window OPEN and the pinned earliest decision
`2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`); nothing in the PR
implies RFC closure, a final R2-D5 decision, or Release 2.

## 8. Regression

Fresh clone at the pinned head: `pnpm install --frozen-lockfile` and the
full `pnpm check` pass end to end (exit 0; 41 test files, 431 tests), with
a clean working tree afterward. The focused composition and
numerical-readiness suites pass standalone (2 files, 26 tests). All three
known CI runs completed successfully on the exact head
`fdf524682ee1f99b003afecaa625871ce64d6a6e` on their first attempt:
CI #185 (`33378462540`), Release 2 paired-t candidate evidence #48
(`33378462502`), and runtime-series candidate evidence #38
(`33378462503`). CI was used as corroboration only; the conclusions above
rest on local byte-level and runtime verification.

## 9. Findings and reviewer separation

No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE findings. (Section 6 records one
scoped, non-blocking observation about a conservative residual outside this
increment's permitted boundary.)

The PR #60 composition review summarized by this synchronization was
produced by the same reviewing role that wrote this report. All identity,
content, and quantitative checks here were re-derived from git objects,
committed files, and re-execution at the pinned head, not from memory of
the earlier review; the durable in-tree copy of that review record was the
comparison source.

## 10. Verdict meaning and non-claims

`GO` means only that the independently reviewed actual-execution
composition (raw paired observations -> verified G4 trace -> exact
`(t bits, df)` handoff -> verified Student-t tail trace -> returned
p-value) may be recorded in the non-authoritative R2-D5 readiness state as
an unissued candidate. It does not approve, select, or advance any of the
following, which all remain open:

- a G4 mathematical-truth error bound;
- confidence-interval trace composition;
- supported resource bounds (the 201-pair / 2,048-node ceilings remain
  evaluation limits);
- a supported platform;
- a supported execution predicate;
- a supported domain;
- runtime support;
- the final reason-code freeze;
- a Public Check or bundle;
- R2-D5 completion;
- RFC closure (issue #25 remains open);
- Release 2.

## 11. Deliverable identity

- Branch: `review/r2-d5-g4-tail-trace-composition-review-disposition-fdf5246`,
  based on the PR #62 head `fdf52468...`.
- This file is the only addition; no implementation, checkpoint, readiness,
  protocol, authority, or other repository file is modified, and the
  working tree was clean after all verification runs.
