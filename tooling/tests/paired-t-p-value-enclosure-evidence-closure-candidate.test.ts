import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  validatePairedTNumericalReadinessCandidate,
  type PairedTNumericalReadinessCandidate,
} from "../src/spikes/paired-t-numerical-readiness.js";
import {
  validatePairedTPValueEnclosureEvidenceClosureCandidate,
  type PairedTPValueEnclosureEvidenceClosureCandidate,
} from "../src/spikes/paired-t-p-value-enclosure-evidence-closure-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/p-value-enclosure-evidence-closure-candidate.json",
);
const readinessPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/evidence-readiness.json",
);

function loadCheckpoint(): PairedTPValueEnclosureEvidenceClosureCandidate {
  return JSON.parse(
    readFileSync(checkpointPath, "utf8"),
  ) as PairedTPValueEnclosureEvidenceClosureCandidate;
}

function loadReadiness(): PairedTNumericalReadinessCandidate {
  return JSON.parse(readFileSync(readinessPath, "utf8")) as PairedTNumericalReadinessCandidate;
}

function mutableCheckpoint(): Record<string, any> {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as Record<string, any>;
}

describe("paired-t p-value enclosure evidence closure candidate", () => {
  it("pins one unissued artifact receipt while keeping p evidence and M2 open", () => {
    const candidate = loadCheckpoint();
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(candidate)).toEqual([]);
    expect(candidate).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_state: "fixed_evidence_artifact_pending_independent_numerical_review",
      p_value_enclosure_evidence_closed: false,
      m2_closed: false,
      source_evidence: {
        generator_commit: "98da47599053d3e29a2c42f274ffc9c239621ded",
        workflow_run_id: 33452181213,
        artifact_id: 9780152851,
        artifact_zip_sha256:
          "sha256:cf092f0b3bfd4cdb8a32e5fb9864f564390dd0027f847b591be1262c134d1299",
      },
      closure_state: {
        independent_numerical_review: "pending",
        readiness_admission: "held_pending_independent_numerical_review",
        supported_degrees_of_freedom_maximum: null,
        supported_platform_matrix: "pending",
        supported_execution_predicate: "unselected",
        supported_domain: false,
        runtime_support: false,
        final_reason_codes_frozen: false,
      },
    });
  });

  it("rejects artifact substitution, weakened closure evidence, and premature promotion", () => {
    const artifact = mutableCheckpoint();
    artifact.source_evidence.artifact_zip_sha256 = "sha256:deadbeef";
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(artifact)).not.toEqual([]);

    const source = mutableCheckpoint();
    source.source_evidence.repository_source_blobs["generator.py"] = "deadbeef";
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(source)).not.toEqual([]);

    const overlap = mutableCheckpoint();
    overlap.closure_items.secondary_overlap_success_path.validator_requires_declared_and_exact_enclosure_overlap = false;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(overlap)).not.toEqual([]);

    const cell = mutableCheckpoint();
    cell.closure_items.exact_enclosure_endpoints_and_rounding_cells.strict_rounding_cell_containment = false;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(cell)).not.toEqual([]);

    const dependency = mutableCheckpoint();
    dependency.closure_items.missing_oracle_dependency_fail_closed.fallback_oracle_path = true;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(dependency)).not.toEqual([]);

    const promoted = mutableCheckpoint();
    promoted.p_value_enclosure_evidence_closed = true;
    promoted.m2_closed = true;
    promoted.closure_state.independent_numerical_review = "complete";
    promoted.closure_state.readiness_admission = "admitted";
    promoted.closure_state.supported_degrees_of_freedom_maximum = 200;
    promoted.closure_state.supported_platform_matrix = "selected";
    promoted.closure_state.supported_execution_predicate = "selected";
    promoted.closure_state.supported_domain = true;
    promoted.closure_state.runtime_support = true;
    promoted.closure_state.final_reason_codes_frozen = true;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(promoted)).not.toEqual([]);
  });

  it("fails closed on hidden, symbol, accessor, sparse, proxy, and cyclic shapes", () => {
    const hidden = loadCheckpoint() as PairedTPValueEnclosureEvidenceClosureCandidate & {
      hidden?: boolean;
    };
    Object.defineProperty(hidden, "hidden", { value: true, enumerable: false });
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(hidden)).not.toEqual([]);

    const symbol = loadCheckpoint() as PairedTPValueEnclosureEvidenceClosureCandidate & {
      [key: symbol]: unknown;
    };
    symbol[Symbol("closure")] = true;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(symbol)).not.toEqual([]);

    let getterCalls = 0;
    const accessor = loadCheckpoint();
    Object.defineProperty(accessor, "m2_closed", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return false;
      },
    });
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(accessor)).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const sparse = loadCheckpoint();
    sparse.prohibited_claims.length += 1;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(sparse)).not.toEqual([]);

    const proxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTPValueEnclosureEvidenceClosureCandidate(proxy)).not.toThrow();
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(proxy)).not.toEqual([]);

    const cyclic = loadCheckpoint() as PairedTPValueEnclosureEvidenceClosureCandidate & {
      cycle?: unknown;
    };
    cyclic.cycle = cyclic;
    expect(validatePairedTPValueEnclosureEvidenceClosureCandidate(cyclic)).not.toEqual([]);
  });

  it("does not alter the current numerical-readiness incompleteness", () => {
    const readiness = loadReadiness();
    expect(validatePairedTNumericalReadinessCandidate(readiness)).toEqual([]);
    expect(readiness.p_value_enclosure_evidence.closure).toBe("incomplete");
    expect(readiness.p_value_enclosure_evidence.known_closure_items).toHaveLength(6);
    expect(readiness.tail_numerical_selection_candidate.m2_closed).toBe(false);
  });
});
