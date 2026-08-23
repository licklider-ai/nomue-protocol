# Phase 2A ITGC Guarantee Profile

**Status: Informative overview.** The binding clauses of the Phase 2A profile
live in [admissibility.md](admissibility.md),
[effect-estimate.md](effect-estimate.md),
[confidence-interval.md](confidence-interval.md),
[non-claims.md](non-claims.md), and the Phase 1 documents that continue to
apply ([phase-1-minimal-profile.md](phase-1-minimal-profile.md),
[welch-calculation.md](welch-calculation.md)).

## What Phase 2A adds

Under the bundle `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1`
(profile `urn:nomue:profile:itgc:0.2.0-draft.1`), a Record:

- structures its design declarations (grouping structure, pairing, repeated
  measurements, clustering) and data handling (analysis population, missing
  outcomes, transformation, weighting) so that profile admissibility is
  machine-decidable from the declared structure;
- declares its estimand (the unstandardized arithmetic mean difference in
  group-order direction) and the required 0.95 confidence level;
- declares an effect estimate with standard error and a Welch-Satterthwaite
  95% confidence interval alongside the test result.

The verifier evaluates five checks in a declared dependency chain:
conformance, integrity, ITGC profile admissibility, Welch computability, and
Welch recomputation (see
[../../verification/profile-admissibility-check.md](../../verification/profile-admissibility-check.md)
and
[../../verification/phase-2a-welch-recompute.md](../../verification/phase-2a-welch-recompute.md)).

## Distinct failure classes

Phase 2A distinguishes, with distinct checks and reason codes:

1. a broken Record structure (conformance fails);
2. a readable Record outside the ITGC guarantee boundary (admissibility
   fails; dependent checks are not run);
3. an in-boundary Record whose supported quantities are not numerically
   computable (computability fails; recomputation is not run);
4. an in-boundary, computable Record whose declared result does or does not
   match the recomputation.

None of these classes ever states that the research is right or wrong as a
whole, and an admissibility pass never asserts that a declaration is true
(see [non-claims.md](non-claims.md)).
