import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  validatePairedTNumericalReadinessCandidate,
  type PairedTNumericalReadinessCandidate,
} from "../src/spikes/paired-t-numerical-readiness.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readinessPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/evidence-readiness.json",
);

function loadReadiness(): PairedTNumericalReadinessCandidate {
  return JSON.parse(readFileSync(readinessPath, "utf8")) as PairedTNumericalReadinessCandidate;
}

describe("Release 2 numerical evidence readiness", () => {
  it("records candidate approval without freezing R2-D5 meaning", () => {
    expect(validatePairedTNumericalReadinessCandidate(loadReadiness())).toEqual([]);
  });

  it("rejects a premature evidence-closure claim", () => {
    const candidate = loadReadiness();
    candidate.p_value_enclosure_evidence.closure = "closed" as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "certificate evidence cannot be marked closed by this readiness increment",
    );
  });

  it("rejects a support or tolerance freeze", () => {
    const candidate = loadReadiness();
    candidate.supported_domain = { degrees_of_freedom_max: 100 } as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "numerical support and tolerances must remain unfrozen",
    );
  });

  it("keeps the operation-stage support candidate incomplete and non-runtime", () => {
    const candidate = loadReadiness();
    candidate.support_domain_predicate_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "support-domain predicate candidate must remain incomplete and non-runtime",
    );
  });

  it("keeps the numerical-contract decision candidate incomplete and non-runtime", () => {
    const candidate = loadReadiness();
    candidate.numerical_contract_decision_candidate.supported_degrees_of_freedom_max = 200 as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "numerical-contract decision candidate must remain incomplete and non-runtime",
    );

    const runtime = loadReadiness();
    runtime.numerical_contract_decision_candidate.runtime_support_enabled = true as never;
    expect(validatePairedTNumericalReadinessCandidate(runtime)).toContain(
      "numerical-contract decision candidate must remain incomplete and non-runtime",
    );
  });

  it("rejects undeclared checkpoint keys instead of carrying hidden claims", () => {
    const candidate = loadReadiness();
    (candidate as unknown as Record<string, unknown>).supported_df_max = 30;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "numerical readiness: keys are incomplete or contain an undeclared item",
    );

    const nested = loadReadiness();
    (nested.operation_graph as unknown as Record<string, unknown>).oracle =
      "scipy_r_boost_agreement";
    expect(validatePairedTNumericalReadinessCandidate(nested)).toContain(
      "operation graph: keys are incomplete or contain an undeclared item",
    );
  });

  it("pins every operation-graph stage", () => {
    const candidate = loadReadiness();
    candidate.operation_graph.standard_error_path = "fma_fast_path" as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "operation graph does not match the approved candidate direction",
    );
  });

  it("rejects a native-sqrt cross-runtime bit-identity claim", () => {
    const candidate = loadReadiness();
    candidate.operation_graph.native_sqrt_cross_runtime_bit_identity_claimed = true as never;
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "operation graph overclaims binary64 reproducibility",
    );
  });

  it("keeps every required evidence repair and boundary case explicit", () => {
    const candidate = loadReadiness();
    candidate.required_boundary_cases.pop();
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "boundary cases: candidate set is incomplete or contains an undeclared item",
    );
  });

  it("keeps exact zero variance in Contract computability, not binary64 failure", () => {
    const candidate = loadReadiness();
    candidate.refusal_classes.binary64_computability.push(
      candidate.refusal_classes.contract_computability.pop() ?? "",
    );
    expect(validatePairedTNumericalReadinessCandidate(candidate)).toContain(
      "Contract-computability refusals: candidate set is incomplete or contains an undeclared item",
    );
  });
});
