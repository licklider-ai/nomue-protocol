import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validatePairedTFixed95EvidenceReviewSyncCandidate } from "../src/spikes/paired-t-fixed-95-evidence-review-sync-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-evidence-review-sync-candidate.json",
);

function loadCheckpoint(): Record<string, unknown> {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as Record<string, unknown>;
}

function nested(candidate: Record<string, unknown>, key: string): Record<string, unknown> {
  return candidate[key] as Record<string, unknown>;
}

describe("paired-t fixed-95 critical-value evidence review sync", () => {
  it("admits reviewed fixed-95 evidence to M3 without selecting a final Protocol table", () => {
    const candidate = loadCheckpoint();
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(candidate)).toEqual([]);
    expect(candidate).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_state: "independently_reviewed_evidence_synchronization_admitted_to_m3",
      m3_closed: true,
      evidence_review: {
        original_verdict: "GO",
        repair_verdict: "CLOSED",
        outstanding_findings: 0,
        reviewed_ordered_cell_content_hash:
          "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
        independent_numerical_review_complete: true,
        final_table_selected: false,
        final_content_hash: null,
        supported_degrees_of_freedom_maximum: null,
      },
      semantic_boundary: {
        confidence_interval_endpoint_truth_ledger_complete: true,
      },
      closure_state: {
        review_ledger_synchronized: true,
        final_table_selection: "exact_reviewed_content_selected_for_candidate_ci_work_only",
        confidence_interval_trace_composition: "independently_reviewed_complete",
        confidence_interval_endpoint_truth_ledger: "independently_reviewed_complete",
        supported_execution_predicate: "unselected",
        supported_domain: false,
        runtime_support: false,
        final_reason_codes_frozen: false,
      },
    });
  });

  it("rejects review/hash substitution, M3 demotion, and support or release promotion", () => {
    const wrongReview = loadCheckpoint();
    nested(wrongReview, "evidence_review").review_result_commit = "0".repeat(40);
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(wrongReview)).not.toEqual([]);

    const wrongHash = loadCheckpoint();
    nested(wrongHash, "evidence_review").reviewed_ordered_cell_content_hash =
      `sha256:${"0".repeat(64)}`;
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(wrongHash)).not.toEqual([]);

    const demoted = loadCheckpoint();
    demoted.m3_closed = false;
    nested(demoted, "semantic_boundary").confidence_interval_endpoint_truth_ledger_complete = false;
    nested(demoted, "closure_state").confidence_interval_trace_composition = "incomplete";
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(demoted)).not.toEqual([]);

    const promoted = loadCheckpoint();
    const review = nested(promoted, "evidence_review");
    review.final_table_selected = true;
    review.final_content_hash = review.reviewed_ordered_cell_content_hash;
    review.supported_degrees_of_freedom_maximum = 200;
    const closure = nested(promoted, "closure_state");
    closure.final_table_selection = "selected";
    closure.confidence_interval_trace_composition = "supported";
    closure.supported_platform_matrix = "selected";
    closure.supported_execution_predicate = "selected";
    closure.supported_domain = true;
    closure.runtime_support = true;
    closure.final_reason_codes_frozen = true;
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(promoted)).not.toEqual([]);
  });

  it("fails closed on hidden, symbolic, accessor, sparse, proxy, and cyclic data", () => {
    const hidden = loadCheckpoint();
    Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(hidden)).not.toEqual([]);

    const symbol = loadCheckpoint();
    symbol[Symbol("support") as unknown as string] = true;
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(symbol)).not.toEqual([]);

    const accessor = loadCheckpoint();
    let getterCalls = 0;
    Object.defineProperty(accessor, "m3_closed", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return false;
      },
    });
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(accessor)).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const sparse = loadCheckpoint();
    const claims = sparse.prohibited_claims as unknown[];
    claims.length += 1;
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(sparse)).not.toEqual([]);

    const cycle = loadCheckpoint();
    cycle.cycle = cycle;
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(cycle)).not.toEqual([]);

    const proxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTFixed95EvidenceReviewSyncCandidate(proxy)).not.toThrow();
    expect(validatePairedTFixed95EvidenceReviewSyncCandidate(proxy)).not.toEqual([]);
  });
});
