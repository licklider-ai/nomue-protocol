import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { validatePairedTSelectedFixed95TableCandidate } from "../src/spikes/paired-t-selected-fixed-95-table-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const tablePath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json",
);

function loadTable(): Record<string, any> {
  return JSON.parse(readFileSync(tablePath, "utf8")) as Record<string, any>;
}

describe("paired-t selected fixed-95 critical-value table candidate", () => {
  it("selects the exact reviewed 200-cell content for candidate CI work only", () => {
    const candidate = loadTable();
    expect(validatePairedTSelectedFixed95TableCandidate(candidate)).toEqual([]);
    expect(candidate).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      selection_state: "exact_reviewed_table_content_selected_for_candidate_ci_work_only",
      selection_review_result: "review-inputs/r2-d5-fixed-95-table-selection/REVIEW-RESULT.md",
      independent_selection_review_complete: true,
      m3_closed: true,
      runtime_support_enabled: false,
      supported_degrees_of_freedom_maximum: null,
      reviewed_source: {
        reviewed_implementation: "19139d51aad108125ef9854c304c698ce9b15ade",
        source_workflow_run_id: 33323884790,
        source_artifact_id: 9735667748,
        source_artifact_zip_sha256:
          "sha256:bebf3e84edcb5e9b5aa63882d80f105e823786aec1dd155334483ca71b1826bd",
        source_table_file_sha256:
          "sha256:666bf952e205a3a2fb54f2d197e3e9d613a3c9833b295ba6526cfc516b231bbb",
        reviewed_ordered_cell_content_hash:
          "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
      },
      coverage: {
        degrees_of_freedom_minimum: 1,
        degrees_of_freedom_maximum_evidence: 200,
        entry_count: 200,
        contiguous_evidence_coverage_claimed: true,
        contiguous_protocol_support_claimed: false,
      },
    });
    expect(candidate.critical_value_binary64_hex_by_df).toHaveLength(200);
    expect(candidate.critical_value_binary64_hex_by_df[0]).toBe("40296993aacc4d24");
    expect(candidate.critical_value_binary64_hex_by_df[199]).toBe("3fff8ce30df9d113");
  });

  it("rejects value, order, source, support, and authority mutations", () => {
    const wrongValue = loadTable();
    wrongValue.critical_value_binary64_hex_by_df[71] = "4000000000000000";
    expect(validatePairedTSelectedFixed95TableCandidate(wrongValue)).not.toEqual([]);

    const swapped = loadTable();
    [swapped.critical_value_binary64_hex_by_df[49], swapped.critical_value_binary64_hex_by_df[50]] =
      [
        swapped.critical_value_binary64_hex_by_df[50],
        swapped.critical_value_binary64_hex_by_df[49],
      ];
    expect(validatePairedTSelectedFixed95TableCandidate(swapped)).not.toEqual([]);

    const wrongSource = loadTable();
    wrongSource.reviewed_source.source_artifact_zip_sha256 = "sha256:deadbeef";
    expect(validatePairedTSelectedFixed95TableCandidate(wrongSource)).not.toEqual([]);

    const demoted = loadTable();
    demoted.independent_selection_review_complete = false;
    demoted.m3_closed = false;
    expect(validatePairedTSelectedFixed95TableCandidate(demoted)).not.toEqual([]);

    const promoted = loadTable();
    promoted.runtime_support_enabled = true;
    promoted.supported_degrees_of_freedom_maximum = 200;
    promoted.coverage.contiguous_protocol_support_claimed = true;
    promoted.held_decisions = [];
    promoted.prohibited_claims = [];
    expect(validatePairedTSelectedFixed95TableCandidate(promoted)).not.toEqual([]);
  });

  it("fails closed on hidden, symbol, accessor, sparse, proxy, and cyclic shapes", () => {
    const hidden = loadTable();
    Object.defineProperty(hidden, "hidden_support", { value: true, enumerable: false });
    expect(validatePairedTSelectedFixed95TableCandidate(hidden)).not.toEqual([]);

    const symbol = loadTable();
    Object.defineProperty(symbol, Symbol("support"), { value: true, enumerable: true });
    expect(validatePairedTSelectedFixed95TableCandidate(symbol)).not.toEqual([]);

    let getterCalls = 0;
    const accessor = loadTable();
    Object.defineProperty(accessor, "runtime_support_enabled", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return false;
      },
    });
    expect(validatePairedTSelectedFixed95TableCandidate(accessor)).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const sparse = loadTable();
    sparse.critical_value_binary64_hex_by_df.length += 1;
    expect(validatePairedTSelectedFixed95TableCandidate(sparse)).not.toEqual([]);

    const cycle = loadTable();
    cycle.cycle = cycle;
    expect(validatePairedTSelectedFixed95TableCandidate(cycle)).not.toEqual([]);

    const proxy = new Proxy(loadTable(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTSelectedFixed95TableCandidate(proxy)).not.toThrow();
    expect(validatePairedTSelectedFixed95TableCandidate(proxy)).not.toEqual([]);
  });
});
