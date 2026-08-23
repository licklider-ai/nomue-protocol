# ADR-0024: S1 Close — Layer (i) Cross-Environment Deviation (D6)

**Status: Accepted** (S1 discussion item D6, 2026-08-13)

## Context

Discussion item S1 asked whether to adopt a declared per-quantity
cross-environment numerical tolerance. Layer (i) covers reproducibility of
the reference kernel across OS / CPU architecture / Node-V8 builds within
the supported CI matrix.

Pre-adoption rules (fixed before inspecting the hosted-runner data):

- **Rule (a)**: If every covered environment produces **bit-identical**
  live kernel outputs over the full oracle corpora **and** every validation
  job matches the platform-neutral digest and semantic-projection pins,
  layer (i) requires **no separate cross-environment numerical tolerance**
  beyond the existing pin-equality mechanism.
- **Rule (b)** (not triggered here): If any kernel value differs between
  environments, stop and open coordination with a per-quantity deviation
  table; do not adopt a tolerance number without that evidence.

Batch 2 addendum U4 authored CI jobs that upload per-environment
`oracle-rel-diff-*.json` matrices and `env-report-*.json` files. Run
31656773025 at HEAD `c4ca2ac` executed all five jobs successfully.

## Decision

**D6 is closed under rule (a).**

Evidence:

1. `gh run download 31656773025` collected all five `oracle-rel-diff-*`
   and `env-report-*` artifacts into
   `evidence/development/oracle-rel-diff/ci-run-c4ca2ac/`.
2. `tooling/src/evidence/oracle-rel-diff-compare.ts` over those five
   matrices returned exit 0 with **zero differing quantities** — every
   live kernel value is bit-identical across:
   - linux / x64 / Node 22.23.1 (V8 12.4)
   - linux / x64 / Node 24.18.0 (V8 13.6)
   - linux / arm64 / Node 22.23.1 (V8 12.4)
   - win32 / x64 / Node 22.23.2 (V8 12.4)
   - darwin / arm64 / Node 22.23.1 (V8 12.4)
3. The same CI run passed every digest and semantic-projection pin check
   (all workflow jobs green).

Recorded in `evidence/development/oracle-rel-diff/cross-environment-report.json`
and summarized for S1 readers in
`evidence/development/oracle-deviation-summary/S1-BRIEF.md`.

**No cross-environment numerical tolerance is adopted.** Agreement is
demonstrated by bit-identical kernel recomputation plus platform-neutral
digest pin equality, not by a widened epsilon.

## Consequences

- Layer (i) is settled for the current CI matrix and oracle corpora.
- Layer (ii) (kernel vs captured SciPy/mpmath oracle) and the underflow
  regime remain open under S1; see `S1-BRIEF.md`.
- Future CI matrix expansion (new OS, arch, or Node major) reopens the
  evidence step; rule (a) applies only after a fresh five-environment (or
  larger) compare passes.

## Rejected alternatives

- Adopting a numeric cross-environment tolerance without deviation data
  (rule (b) path not taken).
- Treating digest-pin agreement alone as sufficient without the rel_diff
  matrix compare (the compare is the quantity-level witness rule (a)
  requires).
