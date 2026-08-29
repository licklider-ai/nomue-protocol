import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTRuntimeSeriesCandidate,
  validatePairedTRuntimeSeriesCandidateCheckpoint,
  type PairedTRuntimeSeriesCandidateCheckpoint,
} from "../src/spikes/paired-t-runtime-series-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const candidatePath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json",
);

function loadCandidate(): PairedTRuntimeSeriesCandidateCheckpoint {
  return JSON.parse(readFileSync(candidatePath, "utf8")) as PairedTRuntimeSeriesCandidateCheckpoint;
}

const INVERSE_BETA = new Map<number, number>([
  [1, 0.3183098861837907],
  [2, 0.5],
  [3, 0.6366197723675814],
  [10, 1.23046875],
  [200, 5.634847900925642],
]);

function evaluate(df: number, statistic: number) {
  const inverseBeta = INVERSE_BETA.get(df);
  if (inverseBeta === undefined) throw new Error(`missing test inverse-beta constant for df=${df}`);
  return evaluatePairedTRuntimeSeriesCandidate({
    degreesOfFreedom: df,
    testStatistic: statistic,
    inverseBeta,
  });
}

describe("paired-t runtime-series candidate", () => {
  it("keeps the executable checkpoint non-authoritative and non-runtime", () => {
    expect(validatePairedTRuntimeSeriesCandidateCheckpoint(loadCandidate())).toEqual([]);

    const promoted = loadCandidate();
    promoted.runtime_support_enabled = true;
    promoted.correct_rounding_claimed = true;
    expect(validatePairedTRuntimeSeriesCandidateCheckpoint(promoted)).toContain(
      "runtime-series candidate overclaims selection, support, or correct rounding",
    );
  });

  it("pins the branch boundary on the exact binary64 input", () => {
    const atBoundary = evaluate(3, 1);
    const aboveBoundary = evaluate(3, 1.0000000000000002);
    expect(atBoundary).toMatchObject({
      ok: true,
      branch: "central-complement-positive-series",
      pValueBinary64Hex: "3fd9062e2bc5059a",
      iterations: 28,
    });
    expect(aboveBoundary).toMatchObject({
      ok: true,
      branch: "lower-tail-positive-series",
      pValueBinary64Hex: "3fd9062e2bc50593",
      iterations: 103,
    });
  });

  it("uses a positive df=1 series and never calls a host atan", () => {
    expect(evaluate(1, 1)).toMatchObject({
      ok: true,
      branch: "central-complement-positive-series",
      pValueBinary64Hex: "3fe0000000000000",
      iterations: 50,
    });
    expect(evaluate(1, 20)).toMatchObject({
      ok: true,
      branch: "lower-tail-positive-series",
      pValueBinary64Hex: "3fa048ae044fecfc",
      iterations: 6,
    });
  });

  it("uses cancellation-resistant algebraic df=2 paths", () => {
    expect(evaluate(2, 1)).toMatchObject({
      ok: true,
      branch: "df2-central-closed-form",
      pValueBinary64Hex: "3fdb0cb174df99c6",
      iterations: 0,
    });
    expect(evaluate(2, 20)).toMatchObject({
      ok: true,
      branch: "df2-tail-closed-form",
      pValueBinary64Hex: "3f64674cfed14338",
      iterations: 0,
    });
  });

  it("stays within the evaluation cap at its declared evaluation ceiling", () => {
    expect(evaluate(200, 1.0000000000000002)).toMatchObject({
      ok: true,
      branch: "lower-tail-positive-series",
      pValueBinary64Hex: "3fd4629ce0bba503",
      iterations: 5182,
      iterationCap: 8064,
      runtimeSupportClaimed: false,
      correctRoundingClaimed: false,
    });
  });

  it("rejects invalid inputs and an attempted evaluation-range expansion", () => {
    expect(
      evaluatePairedTRuntimeSeriesCandidate({
        degreesOfFreedom: 3,
        testStatistic: -0,
        inverseBeta: INVERSE_BETA.get(3) ?? 0,
      }),
    ).toMatchObject({ ok: false, classification: "invalid_candidate_input" });
    expect(
      evaluatePairedTRuntimeSeriesCandidate({
        degreesOfFreedom: 201,
        testStatistic: 1,
        inverseBeta: 1,
      }),
    ).toMatchObject({ ok: false, classification: "outside_evidence_evaluation_range" });
  });

  it("rejects checkpoint drift in the graph, cap, and held decisions", () => {
    const graph = loadCandidate();
    graph.operation_graph.branch_boundary_candidate = "absolute_t_less_than_three";
    expect(validatePairedTRuntimeSeriesCandidateCheckpoint(graph)).toContain(
      "operation graph: value or order differs from the runtime-series checkpoint",
    );

    const cap = loadCandidate();
    cap.stopping_rule.iteration_cap_candidate = "unbounded";
    expect(validatePairedTRuntimeSeriesCandidateCheckpoint(cap)).toContain(
      "stopping rule: value or order differs from the runtime-series checkpoint",
    );

    const held = loadCandidate();
    held.held_decisions.shift();
    expect(validatePairedTRuntimeSeriesCandidateCheckpoint(held)).toContain(
      "held decisions: value or order differs from the runtime-series checkpoint",
    );
  });

  it("accepts JSON key reordering but rejects non-JSON nested values", () => {
    const reordered = loadCandidate();
    reordered.operation_graph = Object.fromEntries(
      Object.entries(reordered.operation_graph).reverse(),
    );
    expect(validatePairedTRuntimeSeriesCandidateCheckpoint(reordered)).toEqual([]);

    const nonJson = loadCandidate();
    (nonJson.operation_graph as Record<string, unknown>).__hidden = undefined;
    expect(validatePairedTRuntimeSeriesCandidateCheckpoint(nonJson)).toContain(
      "operation graph: value or order differs from the runtime-series checkpoint",
    );
  });
});
