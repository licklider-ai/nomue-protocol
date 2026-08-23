# ADR-0012: Standardized Effect Sizes Deferred

**Status: Accepted** (Phase 2A, 2026-08-10)

## Context

Cohen's d, Hedges' g, and Glass's delta are widely reported, and their
absence from a "statistical guarantee profile" needs an explicit, recorded
rationale rather than silence.

## Decision

Phase 2A supports **no standardized effect size**, and the profile is
prohibited from emitting or implying one (NRS-PROFILE-ITGC-0026). The
report's guarantee boundary states `standardized_effect_size: not_asserted`.

### Why pooled Hedges' g was not adopted

- The ITGC profile's only test is Welch's, chosen precisely because it does
  not assume equal variances. Pooled-SD standardization (Cohen's d, pooled
  Hedges' g) divides by an equal-variance pooled estimator, so the
  effect-size denominator would assume what the test refuses to assume -
  the variance models diverge in meaning.
- Under unequal variances there is **no single canonical definition** of a
  standardized mean difference: candidates include Glass's delta with
  either group's SD, averaged-variance denominators, and
  Shieh/Kulinskaya-style variants; their values and interpretations differ.
  Picking one silently would bake a contested choice into the guarantee
  surface.
- Small-sample bias corrections (Hedges) add a second layer of convention.

### Why the mean difference is supported instead

Its meaning is unique, it is in outcome units, it shares the test's
variance model exactly, and its confidence interval follows from quantities
the verifier already recomputes.

### Conditions for adding a standardized effect size later

A future phase may add one only with: a precise named definition (including
denominator and bias-correction convention), new Requirement IDs, a new
method identifier, a new check version with its own tolerance policy and
oracle evidence, and a new bundle version. Nothing may be retrofitted into
the 0.2 bundle.

## Consequences

- Consumers wanting standardization must compute it themselves, outside the
  guarantee boundary - which is honest, because that is where its
  assumptions live.

## Rejected alternatives

- **Ship Cohen's d "because everyone expects it"**: rejected; expectation
  is not a variance model.
- **Ship several standardized variants and let Records choose**: rejected;
  it moves a contested scientific choice into Record-author hands inside
  the guarantee surface.
