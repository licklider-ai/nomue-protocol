/**
 * Single source of the Phase 1 oracle datasets and the tail-case oracle
 * corpus (Batch 2 addendum U8), mirroring tooling/src/phase2a/datasets.ts's
 * role for the Phase 2A corpus. The same values are captured in
 * evidence/development/phase-1/oracle/python-output.json and
 * evidence/development/oracle-tail-cases/python-output.json.
 *
 * Tail-case construction is mechanical, not a statistical judgment: the
 * target p-value magnitudes (about 1e-8, 1e-12, 1e-19, and the binary64
 * underflow boundary) were given by the requester, and each dataset is a
 * fixed base group plus a shift chosen by inverting the Student t tail at
 * the corresponding degrees of freedom. TAIL_UNDERFLOW uses a constant
 * second group (legitimate zero sample variance, same construction as the
 * Phase 2A A2-V-004 one-variance-zero dataset), which fixes the
 * Welch-Satterthwaite df at exactly 4 and keeps every observation a finite
 * binary64 value while pushing the true p far below the smallest positive
 * binary64 subnormal.
 */

import type { Dataset } from "../phase2a/datasets.js";

export const PHASE1_ORACLE_DATASETS: Record<string, Dataset> = {
  V001: { groupA: [1, 2, 3], groupB: [4, 5, 6] },
  V002: { groupA: [1.1, 2.3, 3.7, 4.1], groupB: [5.2, 7.9, 8.1] },
  V003: { groupA: [1e-7, 2.5e-7, 4e-7], groupB: [6.4e-7, 5.5e-7, 8.05e-7] },
  EXAMPLE: { groupA: [12.1, 11.8, 12.5, 12], groupB: [13.9, 14.4, 13.6, 14.1] },
};

const TAIL_BASE = [1.0, 1.1, 0.9, 1.05, 0.95];

const shifted = (delta: number): number[] => TAIL_BASE.map((v) => v + delta);

/**
 * Tail-case corpus. NOT included in the pnpm-check oracle replay
 * (tooling/src/phase2a/oracle-check.ts) or in any conformance fixture: the
 * underflow case intentionally exceeds every binary64 comparison tolerance
 * (the kernel's p underflows to 0 while the 60-digit oracle value does not),
 * which is the observation this corpus exists to record for discussion item
 * S1 - not a regression to gate on.
 */
export const TAIL_ORACLE_DATASETS: Record<string, Dataset> = {
  // Equal-shape shift keeps both sample variances identical, so n1=n2=5
  // gives df = 8 exactly; SE = 0.05, t = -shift/0.05.
  TAIL_P_1E8: { groupA: TAIL_BASE, groupB: shifted(1.2) }, // t = -24, p ~ 9.5e-9
  TAIL_P_1E12: { groupA: TAIL_BASE, groupB: shifted(3.8) }, // t = -76, p ~ 1e-12
  TAIL_P_1E19: { groupA: TAIL_BASE, groupB: shifted(28.5) }, // t = -570, p ~ 1e-19
  // Constant second group: sample variance exactly 0, df = 4 exactly,
  // SE = sqrt(0.00625/5), t ~ -1.53e77, true p ~ 1e-308 - below the
  // algorithm floor of the adopted tail-evaluation path (the value itself
  // is a representable binary64 subnormal; see the tail corpus README).
  TAIL_UNDERFLOW: { groupA: TAIL_BASE, groupB: [5.4e75, 5.4e75, 5.4e75, 5.4e75, 5.4e75] },
};

const constant = (value: number): number[] => [value, value, value, value, value];

/**
 * Floor-map corpus (Batch 3 V2): target p magnitudes 1e-30 .. 1e-300,
 * mapping where the adopted tail-evaluation path starts degrading and
 * where it zeroes. Same mechanical construction as the tail corpus, with
 * one representability constraint (not a statistical choice): the equal
 * shift keeps the +-0.1 spread only while shift < ~4.5e14 (beyond that
 * the spread falls below one binary64 ULP of the shifted values and the
 * group collapses to a constant anyway), so targets 1e-150 and deeper use
 * the constant-second-group construction (df = 4 exactly) from
 * TAIL_UNDERFLOW instead. Shifts were computed by inverting the Student t
 * tail with mpmath at the given target magnitudes and rounding to short
 * decimal literals; the capture records the true p of the exact stored
 * binary64 values, so rounding shifts only moves the achieved magnitude,
 * never the honesty of the record. NOT gated on - record only.
 */
export const FLOOR_ORACLE_DATASETS: Record<string, Dataset> = {
  FLOOR_P_1E30: { groupA: TAIL_BASE, groupB: shifted(676) }, // df=8, t ~ -1.35e4
  FLOOR_P_1E50: { groupA: TAIL_BASE, groupB: shifted(2.14e5) }, // df=8, t ~ -4.28e6
  FLOOR_P_1E100: { groupA: TAIL_BASE, groupB: shifted(3.8e11) }, // df=8, t ~ -7.6e12
  FLOOR_P_1E150: { groupA: TAIL_BASE, groupB: constant(1.75e36) }, // df=4, t ~ -4.9e37
  FLOOR_P_1E200: { groupA: TAIL_BASE, groupB: constant(5.5e48) }, // df=4, t ~ -1.6e50
  FLOOR_P_1E250: { groupA: TAIL_BASE, groupB: constant(1.75e61) }, // df=4, t ~ -4.9e62
  FLOOR_P_1E300: { groupA: TAIL_BASE, groupB: constant(5.5e73) }, // df=4, t ~ -1.6e75
};
