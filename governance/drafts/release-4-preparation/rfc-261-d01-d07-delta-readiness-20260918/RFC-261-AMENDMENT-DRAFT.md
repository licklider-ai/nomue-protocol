# Draft RFC 261 amendment: D01/D07 candidate delta

**This draft is preparation material only. The posted RFC 261 comment, with its
exact commit and timestamps, is the discussion record.**

## Proposed amendment scope

RFC 261 opened discussion on a bounded balanced two-factor Release 4 proposal at
commit `21453d82109106e9e811571383228dcef8f60fac`. This amendment presents two
later candidate decisions that were not part of that opening input:

- D01: exact-target projection to nearest-ties-to-even binary64 followed by strict
  value equality for eligible declared quantities; and
- D07: sound candidate-set comparison, including pass, proved mismatch, and
  completed indeterminate outcomes without fabricating a recomputed point.

The exact delta, preservation boundary, and selected CLI treatment are recorded in
the [reviewed discussion input at `5996da5a7869f2b21ae8f73407c434285c9862bb`](https://github.com/licklider-ai/nomue-protocol/tree/5996da5a7869f2b21ae8f73407c434285c9862bb/governance/drafts/release-4-preparation/rfc-261-d01-d07-delta-readiness-20260918).

## Affected surfaces and compatibility

D01 affects only a new Release 4 check-owned comparison procedure and its successor
Bundle; it does not reinterpret an existing bundle. D07 affects Release 4 quantity
evidence and reason/report handling. Its public CLI treatment is explicitly:

Release 4 excludes CLI exit-code semantics for a completed indeterminate result.
NRS-VERIFY-0025 remains unmodified, including its five existing exit-code meanings.
Relying parties that need the D07 distinction use the detailed verification report;
no new code or reinterpretation of success is proposed.

No existing identifier, schema, Public Check, Bundle, or CLI behavior is changed by
this discussion post. Any eventual authoritative change will be separately coupled,
versioned, reviewed, and implemented after RFC decision.

## Tier and discussion window

The bounded exact-head review found this scope suitable for discussion as an
additive STABLE-INTENT candidate, provided that the authoritative eventual change
remains a new Release 4 procedure rather than an in-place change to existing CORE
semantics.

Highest affected tier for this discussion: **STABLE-INTENT**. The posted amendment
comment supplies its own UTC opening timestamp and a new minimum 30-day discussion
window. The original RFC 261 unchanged-scope timestamp is not used as a substitute
for this delta's discussion period.

## Requested feedback

Please comment on the exact D01/D07 semantics, the proposed compatibility boundary,
the selected CLI treatment, and the tier/window assessment. Concrete counterexamples
are especially useful. This post does not adopt Release 4, issue identifiers, enable
support, alter existing bundles, or authorize implementation.
