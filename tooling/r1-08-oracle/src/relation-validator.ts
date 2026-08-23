/**
 * Metamorphic relation validation for canonical corpus v1.
 */

import { runSut } from "./sut-adapter.js";
import type { CorpusCase } from "./types.js";

export interface RelationCheck {
  relation: string;
  status: "pass" | "fail";
  detail?: string;
}

export function validateRelations(cases: CorpusCase[]): RelationCheck[] {
  const bySeed = new Map(cases.map((c) => [c.seed_id, c]));
  const checks: RelationCheck[] = [];

  const balanced = bySeed.get("seed_balanced");
  const unequal = bySeed.get("seed_unequal_n_var");
  const perm = bySeed.get("seed_permutation");
  const swap = bySeed.get("seed_swap");
  const scale = bySeed.get("seed_scale_pow2");

  if (unequal && perm) {
    const a = runSut(unequal.group_x, unequal.group_y);
    const b = runSut(perm.group_x, perm.group_y);
    if (a.status === "ok" && b.status === "ok" && a.welch && b.welch) {
      const pass =
        a.welch.group_summaries[0].mean === b.welch.group_summaries[0].mean &&
        a.welch.group_summaries[0].sample_variance === b.welch.group_summaries[0].sample_variance &&
        a.welch.group_summaries[1].mean === b.welch.group_summaries[1].mean &&
        a.welch.group_summaries[1].sample_variance === b.welch.group_summaries[1].sample_variance &&
        a.welch.degrees_of_freedom === b.welch.degrees_of_freedom &&
        a.welch.test_statistic === b.welch.test_statistic &&
        a.welch.p_value === b.welch.p_value;
      checks.push({
        relation: "within_group_permutation",
        status: pass ? "pass" : "fail",
        detail: pass ? undefined : "permuted order changed Welch outputs",
      });
    }
  }

  if (balanced && swap) {
    const a = runSut(balanced.group_x, balanced.group_y);
    const b = runSut(swap.group_x, swap.group_y);
    if (a.status === "ok" && b.status === "ok" && a.welch && b.welch) {
      const pass =
        a.welch.mean_difference === -b.welch.mean_difference &&
        a.welch.test_statistic === -b.welch.test_statistic &&
        a.welch.degrees_of_freedom === b.welch.degrees_of_freedom &&
        a.welch.p_value === b.welch.p_value &&
        a.welch.confidence_interval.lower === -b.welch.confidence_interval.upper &&
        a.welch.confidence_interval.upper === -b.welch.confidence_interval.lower;
      checks.push({
        relation: "group_swap",
        status: pass ? "pass" : "fail",
      });
    }
  }

  if (balanced && scale) {
    const a = runSut(balanced.group_x, balanced.group_y);
    const b = runSut(scale.group_x, scale.group_y);
    if (a.status === "ok" && b.status === "ok" && a.welch && b.welch) {
      const pass =
        a.welch.degrees_of_freedom === b.welch.degrees_of_freedom &&
        a.welch.test_statistic === b.welch.test_statistic &&
        a.welch.p_value === b.welch.p_value &&
        b.welch.mean_difference === 2 * a.welch.mean_difference;
      checks.push({
        relation: "multiply_by_power_of_two",
        status: pass ? "pass" : "fail",
      });
    }
  }

  return checks;
}
