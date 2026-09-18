# Draft RFC 261 amendment: D01/D07 candidate delta

**Do not post this text until the independent review commission is GO and a steward
has selected the tier and discussion window.**

## Proposed amendment scope

RFC 261 opened discussion on a bounded balanced two-factor Release 4 proposal at
commit `21453d82109106e9e811571383228dcef8f60fac`. This amendment presents two
later candidate decisions that were not part of that opening input:

- D01: exact-target projection to nearest-ties-to-even binary64 followed by strict
  value equality for eligible declared quantities; and
- D07: sound candidate-set comparison, including pass, proved mismatch, and
  completed indeterminate outcomes without fabricating a recomputed point.

The exact delta, preservation boundary, and unresolved CLI decision are recorded in
the reviewable package at `[COMMIT TO INSERT]/governance/drafts/release-4-preparation/rfc-261-d01-d07-delta-readiness-20260918/`.

## Affected surfaces and compatibility

D01 affects only a new Release 4 check-owned comparison procedure and its successor
Bundle; it does not reinterpret an existing bundle. D07 affects Release 4 quantity
evidence and reason/report handling. Its public CLI treatment is explicitly:

**[STEWARD MUST INSERT ONE SELECTED, REVIEWED PATH HERE.]**

No existing identifier, schema, Public Check, Bundle, or CLI behavior is changed by
this discussion post. Any eventual authoritative change will be separately coupled,
versioned, reviewed, and implemented after RFC decision.

## Tier and discussion window

**[STEWARD MUST INSERT INDEPENDENT REVIEW FINDING.]**

Highest affected tier: **[TIER]**. This amendment opens at
**[UTC TIMESTAMP]**. Earliest decision time: **[UTC TIMESTAMP]**. The original
RFC 261 unchanged-scope timestamp is not used as a substitute for this delta's
discussion period.

## Requested feedback

Please comment on the exact D01/D07 semantics, the proposed compatibility boundary,
the selected CLI treatment, and the tier/window assessment. Concrete counterexamples
are especially useful. This post does not adopt Release 4, issue identifiers, enable
support, alter existing bundles, or authorize implementation.
