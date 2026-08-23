/**
 * SUT adapter — imports reference stats kernel without modification.
 */

import {
  StatsKernelError,
  welchTwoSampleTTestWithCi,
  type WelchResultWithCi,
} from "../../../reference/stats-kernel/src/kernel.js";
import { isNumericalPUnderflow } from "../../../reference/verifier/src/numerical-comparison.js";
import type { CorpusGroup } from "./corpus.js";

export interface SutOutcome {
  status: "ok" | "error";
  error_code?: string;
  welch?: WelchResultWithCi;
  underflow?: boolean;
}

export function runSut(groupX: CorpusGroup, groupY: CorpusGroup): SutOutcome {
  try {
    const welch = welchTwoSampleTTestWithCi(
      { group_id: groupX.group_id, values: groupX.values.map((v) => v.value) },
      { group_id: groupY.group_id, values: groupY.values.map((v) => v.value) },
      0.95,
    );
    const underflow = isNumericalPUnderflow(
      welch.p_value,
      welch.test_statistic,
      welch.degrees_of_freedom,
    );
    return { status: "ok", welch, underflow };
  } catch (err) {
    if (err instanceof StatsKernelError) {
      return { status: "error", error_code: err.code };
    }
    throw err;
  }
}

export function naiveOnePassVariance(values: number[]): number {
  const n = values.length;
  const mean = values.reduce((s, v) => s + v, 0) / n;
  const sumSq = values.reduce((s, v) => s + v * v, 0);
  return (sumSq - n * mean * mean) / (n - 1);
}
