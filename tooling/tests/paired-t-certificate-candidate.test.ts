import { describe, expect, it } from "vitest";
import {
  binary64RoundingCellFromHex,
  validateCriticalValueCertificateCandidate,
  validatePValueCertificateCandidate,
  type CriticalValueCertificateCandidate,
  type PValueCertificateCandidate,
} from "../src/spikes/paired-t-certificate-candidate.js";

const HASH = `sha256:${"a".repeat(64)}`;
const PROVENANCE = {
  generator_commit: "a".repeat(40),
  generator_sha256: HASH,
  environment_sha256: HASH,
  source_output_sha256: HASH,
};

function pCertificate(): PValueCertificateCandidate {
  const cell = binary64RoundingCellFromHex("3fe0000000000000");
  if (cell === undefined) throw new Error("unit-test p cell is unavailable");
  return {
    status: "non_authoritative_candidate",
    artifact_kind: "paired-t-p-value-certificate",
    result: "certified",
    input: {
      degrees_of_freedom: 1,
      test_statistic_binary64_hex: "3ff0000000000000",
      exact_x_numerator: "1",
      exact_x_denominator: "2",
    },
    primary: {
      method: "arb-regularized-incomplete-beta",
      branch: "lower",
      exact_rational_input: true,
      escalation: {
        precision_bits_history: [96, 192],
        precision_bits_final: 192,
        precision_bits_ceiling: 8192,
        stopping_predicate: "strict-binary64-rounding-cell-containment",
      },
      enclosure: { lower: "1/2", upper: "1/2" },
    },
    secondary: {
      method: "rigorous-density-quadrature-with-analytic-tail-bound",
      enclosure: { lower: "1/2", upper: "1/2" },
      overlap_with_primary: true,
    },
    closed_form: {
      method: "df1-cauchy-tail",
      enclosure: { lower: "1/2", upper: "1/2" },
      overlap_with_primary: true,
    },
    projection: {
      target_format: "binary64",
      rounding_mode: "roundTiesToEven",
      projected_binary64_hex: "3fe0000000000000",
      cell_lower: cell.lower,
      cell_upper: cell.upper,
      strict_containment: true,
    },
    provenance: { ...PROVENANCE },
  };
}

function criticalCertificate(): CriticalValueCertificateCandidate {
  const cell = binary64RoundingCellFromHex("4000000000000000");
  if (cell === undefined) throw new Error("unit-test critical-value cell is unavailable");
  return {
    status: "non_authoritative_candidate",
    artifact_kind: "paired-t-fixed-95-critical-value-certificate",
    result: "certified",
    input: {
      degrees_of_freedom: 3,
      two_sided_tail_target: "1/20",
      candidate_binary64_hex: "4000000000000000",
    },
    primary: {
      method: "arb-regularized-incomplete-beta-midpoint-bracketing",
      exact_rational_input: true,
      escalation: {
        precision_bits_history: [192],
        precision_bits_final: 192,
        precision_bits_ceiling: 4096,
        stopping_predicate: "strict-binary64-rounding-cell-containment",
      },
      tail_at_cell_lower: { lower: "3/50", upper: "7/100" },
      tail_at_cell_upper: { lower: "3/100", upper: "1/25" },
    },
    secondary: {
      method: "rigorous-quantile-enclosure",
      quantile_enclosure: { lower: "2/1", upper: "2/1" },
      projects_to_same_candidate: true,
    },
    closed_form: null,
    projection: {
      target_format: "binary64",
      rounding_mode: "roundTiesToEven",
      projected_binary64_hex: "4000000000000000",
      cell_lower: cell.lower,
      cell_upper: cell.upper,
      strict_containment: true,
    },
    provenance: { ...PROVENANCE },
  };
}

describe("non-authoritative paired-t certificate bundle checks", () => {
  it("accepts a fully linked structural p-certificate example", () => {
    expect(validatePValueCertificateCandidate(pCertificate())).toEqual([]);
  });

  it("does not let a claimed secondary overlap override disjoint exact intervals", () => {
    const candidate = pCertificate();
    candidate.secondary.enclosure = { lower: "2/3", upper: "2/3" };
    expect(validatePValueCertificateCandidate(candidate)).toContain(
      "p secondary: declared overlap is false for the exact enclosures",
    );
  });

  it("rejects vacuous independent probability enclosures", () => {
    const secondary = pCertificate();
    secondary.secondary.enclosure = { lower: "0/1", upper: "1/1" };
    expect(validatePValueCertificateCandidate(secondary)).toContain(
      "p secondary: probability enclosure cannot be the vacuous [0, 1] interval",
    );

    const closedForm = pCertificate();
    closedForm.closed_form = {
      method: "df1-cauchy-tail",
      enclosure: { lower: "0/1", upper: "1/1" },
      overlap_with_primary: true,
    };
    expect(validatePValueCertificateCandidate(closedForm)).toContain(
      "p closed form: probability enclosure cannot be the vacuous [0, 1] interval",
    );
  });

  it("recomputes exact x from the binary64 statistic and integer df", () => {
    const candidate = pCertificate();
    candidate.input.exact_x_numerator = "2";
    candidate.input.exact_x_denominator = "3";
    expect(validatePValueCertificateCandidate(candidate)).toContain(
      "p certificate exact x does not match df/(df+t^2)",
    );
  });

  it("rejects a non-finite statistic and a forged incomplete-beta branch", () => {
    const nonFinite = pCertificate();
    nonFinite.input.test_statistic_binary64_hex = "7ff8000000000000";
    expect(validatePValueCertificateCandidate(nonFinite)).toContain(
      "p certificate test statistic must be exact binary64 hex",
    );

    const wrongBranch = pCertificate();
    wrongBranch.primary.branch = "complementary-lower";
    expect(validatePValueCertificateCandidate(wrongBranch)).toContain(
      "p primary: incomplete-beta branch does not match the exact x region",
    );
  });

  it("requires the independent closed form for df=1 and df=2", () => {
    const candidate = pCertificate();
    candidate.closed_form = null;
    expect(validatePValueCertificateCandidate(candidate)).toContain(
      "p certificate df=1 requires the Cauchy-tail closed-form path",
    );
  });

  it("rejects a projected p enclosure that crosses its exact binary64 cell", () => {
    const candidate = pCertificate();
    candidate.primary.enclosure = {
      lower: candidate.projection.cell_lower,
      upper: "1/2",
    };
    expect(validatePValueCertificateCandidate(candidate)).toContain(
      "projection: primary enclosure is not strictly inside the rounding cell",
    );
  });

  it("rejects placeholder provenance rather than accepting a syntactic hash", () => {
    const candidate = pCertificate();
    candidate.provenance.generator_sha256 = `sha256:${"0".repeat(64)}`;
    expect(validatePValueCertificateCandidate(candidate)).toContain(
      "provenance: generator hash cannot be a placeholder",
    );
  });

  it("accepts structurally complete critical midpoint-bracketing evidence", () => {
    expect(validateCriticalValueCertificateCandidate(criticalCertificate())).toEqual([]);
  });

  it("rejects critical evidence that does not strictly separate the tail target", () => {
    const candidate = criticalCertificate();
    candidate.primary.tail_at_cell_upper = { lower: "1/25", upper: "1/20" };
    expect(validateCriticalValueCertificateCandidate(candidate)).toContain(
      "critical upper midpoint: tail enclosure does not prove p < 1/20",
    );
  });

  it("cross-binds the critical candidate to its exact rounding cell", () => {
    const candidate = criticalCertificate();
    candidate.projection.cell_upper = "3/1";
    expect(validateCriticalValueCertificateCandidate(candidate)).toContain(
      "projection: exact rounding-cell endpoints do not match the projected binary64",
    );
  });

  it("requires the secondary quantile enclosure to occupy the same rounding cell", () => {
    const candidate = criticalCertificate();
    candidate.secondary.quantile_enclosure = { lower: "3/1", upper: "3/1" };
    expect(validateCriticalValueCertificateCandidate(candidate)).toContain(
      "projection: primary enclosure is not strictly inside the rounding cell",
    );
  });

  it("requires a matching independent closed form for low degrees of freedom", () => {
    const candidate = criticalCertificate();
    candidate.input.degrees_of_freedom = 2;
    expect(validateCriticalValueCertificateCandidate(candidate)).toContain(
      "critical-value df=2 requires the algebraic-sqrt closed-form path",
    );
  });

  it("checks a low-df closed form as an enclosure rather than a label", () => {
    const candidate = criticalCertificate();
    candidate.input.degrees_of_freedom = 2;
    candidate.closed_form = {
      method: "df2-algebraic-sqrt",
      quantile_enclosure: { lower: "3/1", upper: "3/1" },
      projects_to_same_candidate: true,
    };
    expect(validateCriticalValueCertificateCandidate(candidate)).toContain(
      "projection: primary enclosure is not strictly inside the rounding cell",
    );
  });
});
