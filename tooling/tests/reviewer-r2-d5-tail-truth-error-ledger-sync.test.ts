import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
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

function rejects(candidate: PairedTTruthErrorSupportCheckpoint): void {
  expect(validatePairedTTruthErrorSupportCheckpoint(candidate)).not.toEqual([]);
}

describe("reviewer-owned tail truth-error ledger synchronization battery", () => {
  it("rejects review demotion and support promotion mutations", () => {
    const mutations: Array<(candidate: PairedTTruthErrorSupportCheckpoint) => void> = [
      (candidate) => {
        candidate.status = "authoritative";
      },
      (candidate) => {
        candidate.issuance = "issued";
      },
      (candidate) => {
        candidate.runtime_support_enabled = true;
      },
      (candidate) => {
        candidate.supported_domain_claimed = true;
      },
      (candidate) => {
        candidate.truth_error_bound_selected = true;
      },
      (candidate) => {
        candidate.closure_state.analytic_derivation_review = "pending_independent_review";
      },
      (candidate) => {
        candidate.closure_state.global_constant_truth_error_bound_selected = true;
      },
      (candidate) => {
        candidate.closure_state.input_specific_bound_selected_for_runtime = true;
      },
      (candidate) => {
        candidate.closure_state.supported_platform_matrix = "selected";
      },
      (candidate) => {
        candidate.closure_state.final_supported_degrees_of_freedom_maximum = 200;
      },
      (candidate) => {
        candidate.closure_state.final_reason_codes_frozen = true;
      },
      (candidate) => {
        candidate.prohibited_claims = candidate.prohibited_claims.slice(1);
      },
    ];

    for (const mutate of mutations) {
      const candidate = loadCheckpoint();
      mutate(candidate);
      rejects(candidate);
    }
  });

  it("fails closed on non-JSON hidden, symbol, accessor, proxy, and cyclic shapes", () => {
    const hidden = loadCheckpoint() as PairedTTruthErrorSupportCheckpoint & {
      hidden_runtime_support?: boolean;
    };
    Object.defineProperty(hidden, "hidden_runtime_support", {
      value: true,
      enumerable: false,
      configurable: true,
    });
    rejects(hidden);

    const symbolCandidate = loadCheckpoint() as PairedTTruthErrorSupportCheckpoint & {
      [key: symbol]: unknown;
    };
    symbolCandidate[Symbol("runtime_support")] = true;
    rejects(symbolCandidate);

    let getterCalls = 0;
    const accessorCandidate = loadCheckpoint();
    Object.defineProperty(accessorCandidate, "runtime_support_enabled", {
      enumerable: true,
      configurable: true,
      get() {
        getterCalls += 1;
        return false;
      },
    });
    rejects(accessorCandidate);
    expect(getterCalls).toBe(0);

    const throwingProxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTTruthErrorSupportCheckpoint(throwingProxy)).not.toThrow();
    rejects(throwingProxy);

    const cyclic = loadCheckpoint() as PairedTTruthErrorSupportCheckpoint & {
      cycle?: unknown;
    };
    cyclic.cycle = cyclic;
    rejects(cyclic);
  });
});
