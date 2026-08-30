import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluateProjectionMarginCandidate,
  validatePairedTTruthBoundaryCandidate,
  type PairedTTruthBoundaryCandidate,
} from "../src/spikes/paired-t-truth-boundary-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const candidatePath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/truth-boundary-candidate.json",
);

function loadCandidate(): PairedTTruthBoundaryCandidate {
  return JSON.parse(readFileSync(candidatePath, "utf8")) as PairedTTruthBoundaryCandidate;
}

describe("paired-t truth-boundary candidate", () => {
  it("keeps the evidence pointwise and the runtime bound unselected", () => {
    expect(validatePairedTTruthBoundaryCandidate(loadCandidate())).toEqual([]);

    const promoted = loadCandidate();
    promoted.truth_error_bound_complete = true;
    promoted.runtime_support_enabled = true;
    expect(validatePairedTTruthBoundaryCandidate(promoted)).toContain(
      "truth-boundary candidate overclaims maturity, closure, or support",
    );
  });

  it("requires the supported projection to be farther than the supplied bound", () => {
    const minimumNormal = 2 ** -1022;
    expect(evaluateProjectionMarginCandidate(minimumNormal, 0n)).toMatchObject({
      status: "candidate_stable_for_supplied_bound",
      cellsToNearestClassTransition: 1n,
    });
    expect(evaluateProjectionMarginCandidate(minimumNormal, 1n)).toMatchObject({
      status: "candidate_refusal",
      classification: "projection_margin_not_larger_than_supplied_bound",
    });
    expect(evaluateProjectionMarginCandidate(1, 1n)).toMatchObject({
      status: "candidate_refusal",
      classification: "projection_margin_not_larger_than_supplied_bound",
    });
  });

  it("never promotes zero or subnormal probabilities through a margin", () => {
    expect(evaluateProjectionMarginCandidate(0, 0n)).toMatchObject({
      classification: "projection_class_not_selected_for_support",
    });
    expect(evaluateProjectionMarginCandidate(Number.MIN_VALUE, 0n)).toMatchObject({
      classification: "projection_class_not_selected_for_support",
    });
  });

  it("rejects a finite-corpus observation promoted to a global bound", () => {
    const promoted = loadCandidate();
    promoted.truth_error_evidence.global_bound_selected = true;
    promoted.truth_error_evidence.global_bound_ulp = 236;
    promoted.truth_error_evidence.finite_corpus_maximum_is_a_guarantee = true;
    expect(validatePairedTTruthBoundaryCandidate(promoted)).toContain(
      "truth-error evidence: value differs from the candidate checkpoint",
    );
  });
});
