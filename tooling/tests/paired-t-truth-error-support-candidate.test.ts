import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTTruthErrorSupportCandidate,
  validatePairedTTruthErrorSupportCheckpoint,
  type PairedTTruthErrorSupportCheckpoint,
} from "../src/spikes/paired-t-truth-error-support-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json",
);

function loadCheckpoint(): PairedTTruthErrorSupportCheckpoint {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as PairedTTruthErrorSupportCheckpoint;
}

function floatFromHex(value: string): number {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  return view.getFloat64(0, false);
}

describe("paired-t truth-error/support closure candidate", () => {
  it("keeps the independently reviewed proof candidate non-authoritative and unselected", () => {
    expect(validatePairedTTruthErrorSupportCheckpoint(loadCheckpoint())).toEqual([]);
    expect(loadCheckpoint()).toMatchObject({
      decision_state:
        "independently_reviewed_candidate_proof_pending_bound_selection_platform_and_support",
      truth_error_bound_selected: false,
      runtime_support_enabled: false,
      supported_domain_claimed: false,
      closure_state: {
        analytic_derivation_review: "closed",
        supported_platform_matrix: "pending",
        final_supported_degrees_of_freedom_maximum: null,
        final_reason_codes_frozen: false,
        global_constant_truth_error_bound_selected: false,
        input_specific_bound_selected_for_runtime: false,
      },
    });

    const promoted = loadCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.supported_domain_claimed = true;
    promoted.truth_error_bound_selected = true;
    expect(validatePairedTTruthErrorSupportCheckpoint(promoted)).toContain(
      "truth-error support checkpoint differs from the closed non-runtime candidate",
    );
  });

  it("contains the independently certified 374-ULP witness without treating it as a bound", () => {
    const result = evaluatePairedTTruthErrorSupportCandidate({
      degreesOfFreedom: 197,
      testStatistic: floatFromHex("4049333333333333"),
    });
    expect(result).toMatchObject({
      ok: true,
      pValueBinary64Hex: "284f4ce6230625df",
      iterations: 14,
      proof: {
        roundoffGammaIndex: 1290,
        accumulatedSumGammaIndex: 196,
        nextTermGammaIndex: 210,
        seriesRemainderMultiplier: 198,
        positiveIntermediatesStrictlyAboveMinimumNormal: true,
        sqrtRoundingCellsVerified: true,
        truthErrorBoundSelected: false,
      },
      candidateDomainDisposition: "inside_candidate_truth_error_support_predicate",
      runtimeSupportClaimed: false,
      supportedDomainClaimed: false,
    });
    if (!result.ok) throw new Error("374-ULP witness unexpectedly refused");
    expect(result.proof.candidateTruthErrorBoundUlp).toBe(2978);
    expect(result.projectionMargin.cellsToNearestClassTransition).toBeGreaterThan(
      result.projectionMargin.candidateTruthErrorBoundUlp,
    );
  });

  it("derives an input-specific bound for the iteration-heavy evaluation case", () => {
    const result = evaluatePairedTTruthErrorSupportCandidate({
      degreesOfFreedom: 200,
      testStatistic: 1.0000000000000002,
    });
    expect(result).toMatchObject({
      ok: true,
      branch: "lower-tail-positive-series",
      iterations: 5182,
      iterationCap: 8064,
      proof: {
        positiveIntermediatesStrictlyAboveMinimumNormal: true,
        truthErrorBoundSelected: false,
      },
    });
    if (!result.ok) throw new Error("iteration-heavy candidate unexpectedly refused");
    expect(result.proof.roundoffGammaIndex).toBeGreaterThan(70_000);
    expect(result.proof.candidateTruthErrorBoundUlp).toBeGreaterThan(374);
  });

  it("recognizes the exact-zero branch without inventing numerical error", () => {
    expect(
      evaluatePairedTTruthErrorSupportCandidate({ degreesOfFreedom: 1, testStatistic: 0 }),
    ).toMatchObject({
      ok: true,
      branch: "exact-zero",
      pValueBinary64Hex: "3ff0000000000000",
      proof: {
        relativeErrorUpperBound: 0,
        candidateTruthErrorBoundUlp: 0,
      },
    });
  });

  it("fails closed before support when a tail path leaves normal arithmetic", () => {
    expect(
      evaluatePairedTTruthErrorSupportCandidate({
        degreesOfFreedom: 5,
        testStatistic: floatFromHex("4d03726987666191"),
      }),
    ).toMatchObject({
      ok: false,
      classification: "truth_error_proof_precondition_failed",
      runtimeSupportClaimed: false,
    });
    expect(
      evaluatePairedTTruthErrorSupportCandidate({
        degreesOfFreedom: 5,
        testStatistic: Number.MAX_VALUE,
      }),
    ).toMatchObject({
      ok: false,
      classification: "truth_error_proof_precondition_failed",
      runtimeSupportClaimed: false,
    });
  });

  it("inherits graph input refusals without throwing", () => {
    for (const input of [
      { degreesOfFreedom: 0, testStatistic: 1 },
      { degreesOfFreedom: 1.5, testStatistic: 1 },
      { degreesOfFreedom: 201, testStatistic: 1 },
      { degreesOfFreedom: 10, testStatistic: Number.NaN },
      { degreesOfFreedom: 10, testStatistic: Number.POSITIVE_INFINITY },
      { degreesOfFreedom: 10, testStatistic: -0 },
    ]) {
      expect(() => evaluatePairedTTruthErrorSupportCandidate(input)).not.toThrow();
      expect(evaluatePairedTTruthErrorSupportCandidate(input)).toMatchObject({
        ok: false,
        classification: "runtime_graph_refusal",
        runtimeSupportClaimed: false,
      });
    }
  });

  it("returns a structured refusal for hostile raw input shapes", () => {
    const throwingProxy = new Proxy(
      {},
      {
        ownKeys() {
          throw new Error("hostile key enumeration");
        },
      },
    );
    for (const input of [
      null,
      undefined,
      "invalid",
      1,
      [],
      {},
      { degreesOfFreedom: 3, testStatistic: "1" },
      { degreesOfFreedom: 3, testStatistic: 1, undeclared: true },
      throwingProxy,
    ]) {
      expect(() => evaluatePairedTTruthErrorSupportCandidate(input)).not.toThrow();
      expect(evaluatePairedTTruthErrorSupportCandidate(input)).toMatchObject({
        ok: false,
        classification: "runtime_graph_refusal",
        graphClassification: "invalid_candidate_input",
        runtimeSupportClaimed: false,
        supportedDomainClaimed: false,
      });
    }
  });

  it("counts each verified square root once when it feeds multiple operations", () => {
    const result = evaluatePairedTTruthErrorSupportCandidate({
      degreesOfFreedom: 2,
      testStatistic: 2,
    });
    expect(result).toMatchObject({
      ok: true,
      branch: "df2-tail-closed-form",
      proof: { sqrtRoundingCellChecks: 1, sqrtRoundingCellsVerified: true },
    });
  });

  it("refuses a rounded-one result whose nonzero error budget reaches the class boundary", () => {
    expect(
      evaluatePairedTTruthErrorSupportCandidate({
        degreesOfFreedom: 10,
        testStatistic: floatFromHex("3c9cd2b297d889bc"),
      }),
    ).toMatchObject({
      ok: false,
      classification: "projection_margin_not_established",
      runtimeSupportClaimed: false,
    });
  });

  it("rejects an attempted checkpoint rewrite of the pointwise witness", () => {
    const changed = loadCheckpoint();
    changed.certified_pointwise_witness.graph_to_truth_ulp_distance = 0;
    expect(validatePairedTTruthErrorSupportCheckpoint(changed)).toContain(
      "truth-error support checkpoint differs from the closed non-runtime candidate",
    );
  });
});
