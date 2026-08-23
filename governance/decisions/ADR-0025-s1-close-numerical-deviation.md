# ADR-0025: S1 Close - Cross-Implementation Numerical Deviation

**Status: Accepted** (S1 main close, 2026-08-13). Ratified by the steward's
Batch 3 instruction ("implement S1 closure"); this record implements and
documents the ratified decisions. Layer (i) cross-environment deviation
(D6) closed separately and earlier in
[ADR-0024](ADR-0024-s1-close-layer-i-cross-environment-deviation.md) under
its rule (a); this ADR integrates with, and does not restate or amend, that
record.

## Context

Discussion item S1 opened in Batch 2 when tail-corpus measurement showed
the kernel's p-value zeroing at `~1e-308` while the 60-digit oracle value
(`~1.10e-308`) remained a representable binary64 subnormal. The initial
Batch 2 record mischaracterized this as a "representational floor of the
shared binary64 evaluation strategy"; that wording was corrected in Batch 3
V1 across the evidence records: the zeroing is an **algorithm floor of the
adopted tail-evaluation path** - intermediate underflow inside the
regularized-incomplete-beta evaluation - not a limit of binary64
representation (smallest positive subnormal `~4.94e-324`; ULP relative
width at `1.1e-308` about `4.5e-16`). This ADR uses the corrected
characterization throughout; no earlier ADR stated the incorrect one, so no
historical ADR needed a correction appendix.

## Decisions

- **D1 - comparison formula maintained.** The relative-difference formula
  of `canonicalization/numerical-comparison.md` (NRS-CANON-0006 authority,
  zero-vs-positive never equivalent per NRS-VERIFY-0020) stays unchanged.
- **D2 - current tolerances ratified.** The public-contract tolerances
  (p-value absolute `0` / relative `1e-10` under 0.2.1; others `1e-12`)
  are ratified as-is. The measured-vs-contract distinction is documented in
  the S1 brief's "two different numbers" section
  (`evidence/development/oracle-deviation-summary/S1-BRIEF.md`): measured
  oracle agreement (~16 epsilon) is an observation about two specific
  implementations; the contract (~450,000 epsilon) is an obligation signed
  by every future independent implementation. Neither replaces the other.
- **D3 - resolved by band declaration.** The tail regime is handled by
  declaring a guarantee band with an explicit floor (D7'), not by changing
  the evaluation path. Two external surveys informed this: their
  decision-relevant conclusions, as transmitted in the ratified
  instruction, are (1) a log10(raw p) reporting channel computed WITHOUT a
  native log-tail evaluation does not remove the algorithm floor - it
  re-encodes the already-floored value; and (2) native log-tail
  implementations serve regimes (for example genome-wide association
  scans) far below this profile's guarantee-domain needs. The survey
  documents themselves were not supplied to this implementation session;
  attaching their full text and primary-source lists is left to the
  steward (recorded as pending material, not fabricated here). A publicly
  verifiable primary reference consistent with (2) is the GWAS-SSF summary
  statistics format, which standardizes p-value OR negative-log10-p
  reporting for that regime.
- **D4 - 60-digit mpmath unification: done.** Batch 2 addendum U8
  (commit 144e158) re-captured the Phase 1 oracle at 60 digits and made
  the capture script (`tooling/oracle-capture/capture_oracle.py`) and the
  matrix regeneration (`pnpm evidence:oracle-matrix`) checked-in and
  reproducible.
- **D5 - definition of "declared".** A **declared** value is a value
  asserted inside a Record by its emitter (for example
  `payload.result.p_value`), as distinct from a **recomputed** value (the
  verifier's live computation from the Record's own observations) and a
  **reference/oracle** value (a captured independent-oracle output under
  the decimal reference layer of NRS-CANON-0012/0013). Verification
  compares declared against recomputed under the contract tolerances; the
  truth of a declaration about the world is never asserted
  (`guarantee_boundary.declaration_truth: not_asserted`).
- **D6 - closed under rule (a): see ADR-0024.** The Batch 3 instruction
  listed D6 as remaining open pending the first hosted CI run; that run
  (31656773025 at `c4ca2ac`) has since executed, and the steward closed D6
  with bit-identical kernel outputs across the five covered environments.
  This ADR records the ordering honestly and defers entirely to ADR-0024.
- **D7' - guarantee band declared.** The band's lower edge is derived by
  the pre-fixed rule: P_floor = the smallest p with maximum relative error
  over all target quantities `<= 1e-11` (10x margin under the contract's
  `1e-10`), rounded up to a power of ten. Applying the rule to the
  measured floor map (`evidence/development/oracle-floor-map/floor-map.md`)
  yields **candidate `1e-300`**: every point from `~1e-8` down to
  `~1e-300` meets the criterion (worst `2.6e-14`), and the first failure
  is the abrupt algorithm floor at `~1e-308`. **Adoption of the candidate
  value is a steward decision and has not happened in this batch.**

## Rejected options (recorded, with reasons)

- **B - neg_log10 reporting channel: rejected.** Without a native
  log-tail evaluation, `log10` of the raw p preserves the algorithm floor
  exactly (log of a floored zero is undefined; log of a near-floor value
  carries the same error), and a native log-tail implementation is
  disproportionate to the guarantee domain's needs (see D3). **Reserved
  for the future**: a GWAS-scale profile extension, if one is ever
  chartered, should align its reporting with GWAS-SSF (p_value OR
  neg_log_10_p_value) rather than inventing a third convention - one-line
  design reservation, no work items exist.
- **C - log-first kernel: rejected.** Rewriting the kernel to evaluate in
  the log domain is a precision project, not a safety fix; it would change
  every pinned numerical expectation and oracle capture for a regime the
  guarantee band (D7') explicitly excludes.
- **E - arbitrary-precision runtime: rejected.** A decimal/arbitrary-
  precision runtime path contradicts the profile's parsed-binary64
  authority (NRS-CANON-0009 family) and would make the reference
  implementation's arithmetic diverge from the contract every independent
  implementer actually faces. The decimal layer is adopted for ORACLE
  REFERENCES only (option D, NRS-CANON-0012/0013) - captured evidence, not
  runtime arithmetic.

## Implementation in this batch (Batch 3)

- **V1**: wording corrected everywhere the mischaracterization appeared
  (S1-BRIEF, tail-corpus README, matrix descriptions).
- **V2**: floor-map corpus (`FLOOR_ORACLE_DATASETS`, 1e-30..1e-300),
  degradation map and P_floor rule application
  (`pnpm evidence:oracle-floor-map`).
- **V3**: t-squared-overflow safety guard (NRS-VERIFY-0026,
  `NRS-T-SQUARED-OVERFLOW`, kernel `T_SQUARED_OVERFLOW`, fixtures
  B-010/B-011): beyond `|t| ~ 1.34e154` the tail evaluation now refuses
  explicitly instead of silently returning an endpoint. This is disjoint
  from the algorithm floor (which zeroes with all intermediates finite)
  and is a safety fix, not a precision change.
- **V4**: decimal oracle reference layer formalized (NRS-CANON-0012/0013
  in `canonicalization/numerical-comparison.md`), EXPERIMENTAL, no public
  check consumes it yet.

## Consequences

The guarantee band, once the P_floor value is adopted, gives relying
parties an explicit statement of where the numerical contract's p-value
comparison is meaningful; below it, the decimal oracle reference layer
keeps truth citable without pretending the runtime can represent it. No
public-check version, tolerance, or conformance expectation changed in
this close except the new explicit refusal path of NRS-VERIFY-0026.

## Adoption record (2026-08-13, appended - the sections above are unchanged)

The P_floor candidate derived under D7' was **adopted by the steward on
2026-08-13** ("I approve P_floor"): the guarantee band's lower edge is
**P_floor = 1e-300**. The statements above that describe the value as
"candidate" or adoption as "not happened in this batch" were accurate when
written and are retained unrewritten per this repository's ADR discipline;
this appendix is the adoption.

With this adoption, S1 has no remaining open items: D1-D5 and D7' close in
this ADR, D6 closed in ADR-0024, and the D3 external-survey attachment
remains a pending steward material (a documentation debt, not an open
decision). Reflecting the adopted band as a clause of the public numerical
contract - a normative declaration with its own Requirement ID, subject to
the normal versioning/RFC discipline - is deliberately NOT performed by
this appendix; it is available as a future batch item if the steward
directs it.
