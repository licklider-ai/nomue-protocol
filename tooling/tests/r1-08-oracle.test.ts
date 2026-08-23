import { describe, expect, it } from "vitest";
import { binary64FromHex } from "../r1-08-oracle/src/binary64.js";
import {
  CORPUS_SEEDS,
  buildCorpusCaseFromSeed,
  buildGroupValues,
} from "../r1-08-oracle/src/corpus.js";
import { exactAlgebraicFromGroups } from "../r1-08-oracle/src/exact-algebraic.js";
import { validateRelations } from "../r1-08-oracle/src/relation-validator.js";
import { runSut } from "../r1-08-oracle/src/sut-adapter.js";
import type { CorpusCase } from "../r1-08-oracle/src/types.js";

function buildTestCases(): CorpusCase[] {
  const cases: CorpusCase[] = [];
  for (const seed of CORPUS_SEEDS) {
    const built = buildCorpusCaseFromSeed(seed);
    const sut = runSut(built.group_x, built.group_y);
    const caseEntry: CorpusCase = {
      case_id: `${seed.class}_test`,
      seed_id: seed.seed_id,
      class: seed.class,
      group_x: built.group_x,
      group_y: built.group_y,
      input_manifest_sha256: built.input_manifest_sha256,
      degenerate_expected: built.degenerate_expected,
      notes: built.notes,
    };
    caseEntry.exact_algebraic = exactAlgebraicFromGroups(
      caseEntry.case_id,
      caseEntry.group_x,
      caseEntry.group_y,
    );
    if (
      sut.status === "ok" &&
      sut.welch &&
      seed.degenerate_expected?.includes("NRS-P-VALUE-UNDERFLOW")
    ) {
      expect(sut.underflow).toBe(true);
    }
    cases.push(caseEntry);
  }
  return cases;
}

describe("r1-08 canonical corpus v1", () => {
  it("defines fifteen case-class seeds", () => {
    expect(CORPUS_SEEDS.length).toBe(15);
    const classes = new Set(CORPUS_SEEDS.map((s) => s.class));
    expect(classes.size).toBe(15);
  });

  it("pins binary64 hex patterns for every input value", () => {
    for (const seed of CORPUS_SEEDS) {
      const built = buildCorpusCaseFromSeed(seed);
      for (const group of [built.group_x, built.group_y]) {
        for (const v of group.values) {
          expect(v.hex).toMatch(/^[0-9a-f]{16}$/);
          expect(v.value).toBe(binary64FromHex(v.hex).value);
        }
      }
    }
  });

  it("marks both-variance-zero as degenerate and underflow as binary64 p=0", () => {
    const bothZero = CORPUS_SEEDS.find((s) => s.class === "both_groups_variance_zero");
    const underflow = CORPUS_SEEDS.find((s) => s.class === "p_underflow_boundary");
    expect(bothZero?.degenerate_expected).toContain("ZERO_STANDARD_ERROR");
    const bothSut = runSut(
      buildCorpusCaseFromSeed(bothZero!).group_x,
      buildCorpusCaseFromSeed(bothZero!).group_y,
    );
    expect(bothSut.status).toBe("error");
    expect(bothSut.error_code).toBe("ZERO_STANDARD_ERROR");

    const underSut = runSut(
      buildCorpusCaseFromSeed(underflow!).group_x,
      buildCorpusCaseFromSeed(underflow!).group_y,
    );
    expect(underSut.underflow).toBe(true);
    expect(underSut.welch?.p_value).toBe(0);
  });

  it("passes metamorphic relation checks", () => {
    const cases = buildTestCases();
    const checks = validateRelations(cases);
    expect(checks.every((c) => c.status === "pass")).toBe(true);
  });

  it("exact algebraic oracle yields rational Welch df for non-degenerate seeds", () => {
    for (const seed of CORPUS_SEEDS) {
      if (seed.degenerate_expected?.includes("ZERO_STANDARD_ERROR")) continue;
      const built = buildCorpusCaseFromSeed(seed);
      const exact = exactAlgebraicFromGroups("t", built.group_x, built.group_y);
      expect(exact.degenerate).toBeFalsy();
      expect(exact.welch_df).toMatch(/^-?\d+\/\d+$/);
      expect(exact.mean_difference).toMatch(/^-?\d+\/\d+$/);
    }
  });
});
