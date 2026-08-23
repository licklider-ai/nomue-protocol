# Independent Two-Group Continuous Profile (ITGC)

**Status: Informative.**

The ITGC profile covers a scientific analysis comparing one continuous outcome
between exactly two independent groups, with the two-sided Welch two-sample
t-test as the only supported method. Two profile versions exist, each
exercised only through its exact interpretation bundle:

| Version                                | Bundle                                          | Adds                                                                                                                                                |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `urn:nomue:profile:itgc:0.1.0-draft.1` | `urn:nomue:bundle:itgc-minimal:0.1.0-draft.1`   | Minimal slice: Welch test recomputation (Phase 1, preserved unchanged)                                                                              |
| `urn:nomue:profile:itgc:0.2.0-draft.1` | `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1` | Guarantee profile: structured admissibility declarations, mean-difference effect estimate, Welch standard error, 95% confidence interval (Phase 2A) |

Binding documents:

- [phase-1-minimal-profile.md](phase-1-minimal-profile.md) - profile
  preconditions and required declared result (both versions).
- [welch-calculation.md](welch-calculation.md) - the Welch calculation (both
  versions).
- [admissibility.md](admissibility.md) - Phase 2A admissibility boundaries.
- [effect-estimate.md](effect-estimate.md) - the supported estimand and the
  standardized-effect-size non-claim.
- [confidence-interval.md](confidence-interval.md) - standard error, level,
  and interval.
- [non-claims.md](non-claims.md) - declaration truth and the interpretation
  boundary.
- [phase-2a-guarantee-profile.md](phase-2a-guarantee-profile.md) - overview
  of the Phase 2A slice.

## Deliberately out of scope in Phase 1

Effect sizes, confidence intervals, significance booleans, multiple
comparisons, missing-value and outlier policies, assumption-driven method
switching, pooled (Student) t-tests, nonparametric alternatives, paired or
repeated-measures designs, and ANOVA are not part of this profile in Phase 1
and have no fields, schemas, or placeholder implementations. A verifier does
not claim to detect an untruthful independence declaration; it checks the
declaration's consistency with the Record structure.
