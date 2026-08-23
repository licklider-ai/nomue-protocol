# ADR-0010: Reference Statistics Dependency and Oracle Separation

**Status: Accepted** (Phase 1, 2026-08-10)

## Context

The two-sided p-value needs a Student t CDF. Hand-writing special functions
invites subtle numerical bugs; using a dependency raises the question of what
counts as independent evidence of correctness.

## Decision

- The reference kernel uses **`@stdlib/stats-base-dists-t-cdf`**
  (Apache-2.0, pinned in `pnpm-lock.yaml`) behind the wrapper boundary
  `reference/stats-kernel/src/t-distribution.ts`. Attribution and license
  information ship with the dependency and it belongs in any future SBOM; it
  is recorded in the shared-dependency inventory in
  [../../evidence/development/phase-1/oracle/README.md](../../evidence/development/phase-1/oracle/README.md).
- **This dependency is not counted as an independent oracle.** The verifier
  and anything else in this repository that computes a p-value share it, so
  agreement among them has a potential common cause (a defect in the
  dependency). Independence requires a disjoint implementation lineage:
  SciPy and mpmath serve as preliminary oracles, with the comparison recorded
  under `evidence/development/phase-1/oracle/`.
- The normative p-value definition is mathematical
  (NRS-PROFILE-ITGC-0011); no library is the source of truth.
- Gate R1-08 (independent numerical oracle and common-cause failure control)
  **remains open**; Phase 1 evidence is preliminary.

## Consequences

- A defect in the dependency would make verifier and declared results agree
  wrongly; only disjoint oracles can catch that class, which is exactly what
  R1-08 demands before release.
- The wrapper keeps the dependency replaceable without touching kernel
  callers.

## Rejected alternatives

- **Hand-written incomplete-beta implementation**: rejected for Phase 1;
  unreviewed special-function code is the riskiest part of the pipeline.
- **Calling SciPy/R at verification time**: rejected; the verifier must be
  self-contained, offline, and execute no external processes.
- **Counting a second JavaScript library as the oracle**: rejected; shared
  ecosystem and possible shared upstream algorithms weaken independence.
