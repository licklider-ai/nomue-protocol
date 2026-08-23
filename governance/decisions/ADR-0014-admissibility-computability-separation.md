# ADR-0014: Profile Admissibility Separated from Numerical Computability

**Status: Accepted** (Phase 2A, 2026-08-10)

## Context

Phase 1 folded "is this Record in scope?" into semantic conformance and a
single precondition check. That conflates four different failure stories:
broken structure, out-of-boundary declarations, non-computable numbers, and
mismatched results - which have different audiences and different fixes.

## Decision

Phase 2A separates (NRS-VERIFY-0013):

1. **record-conformance**: structural/semantic coherence of the Record;
2. **itgc-profile-admissibility**: whether the DECLARED structure lies
   inside the ITGC guarantee boundary (pairing, repeated measures,
   clustering, weighting, transformation, population, missingness, method,
   alternative, estimand, confidence level) - judgment basis
   `declared_record_structure`, never real-world truth (NRS-CORE-0009);
3. **welch-computability**: whether the supported quantities are finite and
   computable from the observations;
4. **welch-recompute**: recomputation and comparison.

Dependencies are machine-readable in the check registry (`depends_on`,
`dependency_propagation: not_run_with_blocking_reason_codes`); admissibility
failure gates 3 and 4 to not_run with the blocking codes (NRS-VERIFY-0017).

## Consequences

- A rejected paired design reads as "outside the guarantee boundary", not
  as "wrong research" and not as a crash.
- New profiles can reuse the admissibility/computability split unchanged.
- More checks means more result objects per report; scoped-results
  philosophy makes that a feature.

## Rejected alternatives

- **Admissibility as schema constraints**: rejected; unsupported
  declarations would become unreadable instead of readable-but-refused,
  destroying the distinction between "broken" and "out of scope".
- **One combined precondition check**: rejected; it collapses failure
  classes the registry now distinguishes with reason codes.
