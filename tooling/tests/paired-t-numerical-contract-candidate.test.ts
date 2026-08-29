import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  MIN_POSITIVE_NORMAL_BINARY64,
  binary64Hex,
  classifyCandidateProbabilityProjection,
  compareCandidateBinary64,
  isPositiveNormalBinary64,
  validatePairedTNumericalContractCandidate,
  type PairedTNumericalContractCandidate,
} from "../src/spikes/paired-t-numerical-contract-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const candidatePath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/numerical-contract-candidate.json",
);

function loadCandidate(): PairedTNumericalContractCandidate {
  return JSON.parse(readFileSync(candidatePath, "utf8")) as PairedTNumericalContractCandidate;
}

describe("Release 2 paired-t numerical-contract decision candidate", () => {
  it("keeps the decision checkpoint non-authoritative, partial, and non-runtime", () => {
    expect(validatePairedTNumericalContractCandidate(loadCandidate())).toEqual([]);
  });

  it("compares finite results by exact binary64 bits without a numeric tolerance", () => {
    expect(compareCandidateBinary64(1, 1)).toEqual({
      ok: true,
      bits: "3ff0000000000000",
    });
    expect(compareCandidateBinary64(1, 1 + Number.EPSILON)).toEqual({
      ok: false,
      classification: "binary64_bit_mismatch",
      declared_bits: "3ff0000000000000",
      recomputed_bits: "3ff0000000000001",
    });
    expect(compareCandidateBinary64(Number.POSITIVE_INFINITY, 1)).toEqual({
      ok: false,
      classification: "non_finite_numeric_result",
    });
    expect(compareCandidateBinary64(-0, 0)).toEqual({
      ok: false,
      classification: "negative_zero_numeric_result",
    });
  });

  it("classifies the normal-only probability projection without clamping", () => {
    expect(classifyCandidateProbabilityProjection(1)).toBe("supported_rounded_one");
    expect(classifyCandidateProbabilityProjection(MIN_POSITIVE_NORMAL_BINARY64)).toBe(
      "supported_positive_normal",
    );
    expect(classifyCandidateProbabilityProjection(Number.MIN_VALUE)).toBe(
      "refuse_positive_subnormal",
    );
    expect(classifyCandidateProbabilityProjection(0)).toBe(
      "refuse_positive_tail_not_representable",
    );
    expect(classifyCandidateProbabilityProjection(-0)).toBe("refuse_negative_zero");
    expect(classifyCandidateProbabilityProjection(1 + Number.EPSILON)).toBe(
      "refuse_invalid_probability",
    );
  });

  it("pins the binary64 normal boundary and bit encoding", () => {
    expect(MIN_POSITIVE_NORMAL_BINARY64).toBe(2.2250738585072014e-308);
    expect(binary64Hex(MIN_POSITIVE_NORMAL_BINARY64)).toBe("0010000000000000");
    expect(binary64Hex(Number.MIN_VALUE)).toBe("0000000000000001");
    expect(isPositiveNormalBinary64(MIN_POSITIVE_NORMAL_BINARY64)).toBe(true);
    expect(isPositiveNormalBinary64(Number.MIN_VALUE)).toBe(false);
  });

  it("rejects a support claim, contract freeze, or issuance claim", () => {
    const support = loadCandidate();
    support.runtime_support_enabled = true;
    expect(validatePairedTNumericalContractCandidate(support)).toContain(
      "numerical contract, runtime support, and final reason codes must remain unfrozen",
    );

    const frozen = loadCandidate();
    frozen.numerical_contract_frozen = true;
    expect(validatePairedTNumericalContractCandidate(frozen)).toContain(
      "numerical contract, runtime support, and final reason codes must remain unfrozen",
    );

    const issued = loadCandidate();
    issued.issuance = "issued";
    expect(validatePairedTNumericalContractCandidate(issued)).toContain(
      "numerical-contract candidate must remain non-authoritative, unissued, and review-bound",
    );
  });

  it("rejects a hidden df support bound or tolerance", () => {
    const supported = loadCandidate();
    supported.evidence_targets.supported_degrees_of_freedom_max = 200;
    expect(validatePairedTNumericalContractCandidate(supported)).toContain(
      "evidence targets: value or order differs from the candidate checkpoint",
    );

    const tolerance = loadCandidate();
    tolerance.selected_candidate_directions.comparison_tolerance = 4;
    expect(validatePairedTNumericalContractCandidate(tolerance)).toContain(
      "selected candidate directions: value or order differs from the candidate checkpoint",
    );
  });

  it("rejects promotion of a held decision or a private repository dependency", () => {
    const promoted = loadCandidate();
    promoted.held_decisions.shift();
    expect(validatePairedTNumericalContractCandidate(promoted)).toContain(
      "held decisions: value or order differs from the candidate checkpoint",
    );

    const privateDependency = loadCandidate();
    privateDependency.research_handoff.private_repository_dependency = true;
    expect(validatePairedTNumericalContractCandidate(privateDependency)).toContain(
      "research handoff: value or order differs from the candidate checkpoint",
    );
  });

  it("rejects an undeclared key instead of carrying a hidden decision", () => {
    const candidate = loadCandidate();
    (candidate as unknown as Record<string, unknown>).runtime_tail_branch = "absolute_t_le_one";
    expect(validatePairedTNumericalContractCandidate(candidate)).toContain(
      "numerical-contract candidate: keys are incomplete or contain an undeclared item",
    );
  });
});
