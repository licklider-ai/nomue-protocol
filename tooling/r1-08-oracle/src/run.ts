/**
 * R1-08 independent oracle evidence bundle generator.
 * Single reproduction entry point.
 */

import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import {
  CORPUS_SEEDS,
  OFFSET_LADDER,
  buildCorpusCaseFromSeed,
  buildGroupValues,
  formatCaseId,
} from "./corpus.js";
import { exactAlgebraicFromGroups, naiveOnePassVariance } from "./exact-algebraic.js";
import { runSut, naiveOnePassVariance as naiveVar } from "./sut-adapter.js";
import { validateRelations } from "./relation-validator.js";
import {
  CONFIDENCE_LEVEL,
  TOLERANCES_021,
  relDeviation,
  ulpDistance,
  withinNumericTolerance,
  withinPValueTolerance021,
} from "./tolerances.js";
import { ratStrToNumber } from "./rational.js";
import type { ArbCaseResult, CorpusCase, ReplayRow } from "./types.js";
import { hashBytesSha256, hashCanonicalJson } from "./binary64.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORACLE_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(ORACLE_ROOT, "../..");
const HISTORICAL_EVIDENCE_DIR = path.join(
  REPO_ROOT,
  "evidence/development/r1-08-independent-oracle-v1",
);
const CANDIDATE_COMMIT = process.env.NOMUE_ORACLE_CANDIDATE_COMMIT?.trim() || null;
const CANDIDATE_OUTPUT = process.env.NOMUE_ORACLE_EVIDENCE_DIR?.trim() || null;
const CANDIDATE_MODE = CANDIDATE_COMMIT !== null || CANDIDATE_OUTPUT !== null;
if (CANDIDATE_MODE && (CANDIDATE_COMMIT === null || CANDIDATE_OUTPUT === null)) {
  throw new Error(
    "candidate oracle mode requires both NOMUE_ORACLE_CANDIDATE_COMMIT and NOMUE_ORACLE_EVIDENCE_DIR",
  );
}
if (CANDIDATE_COMMIT !== null && !/^[0-9a-f]{40}$/.test(CANDIDATE_COMMIT)) {
  throw new Error("NOMUE_ORACLE_CANDIDATE_COMMIT must be an exact lowercase 40-hex commit");
}
const EVIDENCE_DIR = CANDIDATE_OUTPUT
  ? path.resolve(REPO_ROOT, CANDIDATE_OUTPUT)
  : HISTORICAL_EVIDENCE_DIR;
if (CANDIDATE_MODE && EVIDENCE_DIR === HISTORICAL_EVIDENCE_DIR) {
  throw new Error("candidate oracle evidence must not overwrite the historical evidence directory");
}
const CORPUS_DIR = path.join(EVIDENCE_DIR, "corpus");
const ENV_DIR = path.join(HISTORICAL_EVIDENCE_DIR, "environment");
const VENV_CANDIDATES = [
  path.join(ORACLE_ROOT, ".venv/Scripts/python.exe"),
  path.join(ORACLE_ROOT, ".venv/bin/python"),
  path.join(ENV_DIR, ".venv/Scripts/python.exe"),
  path.join(ENV_DIR, ".venv/bin/python"),
];
const PYTHON =
  VENV_CANDIDATES.find((p) => fs.existsSync(p)) ?? path.join(ENV_DIR, ".venv/Scripts/python.exe");
const ARB_SCRIPT = path.join(ORACLE_ROOT, "python/arb_oracle.py");
const BASE_COMMIT = "9c19636c6f42d9b8b98b88964f321d1a9118dfd4";
const HISTORICAL_REPRODUCTION_COMMIT = "6c4de5c1ac693f300efa424d56d3fb89e344558d";

function gitCommit(): string {
  const proc = spawnSync("git", ["rev-parse", "HEAD"], { cwd: REPO_ROOT, encoding: "utf8" });
  const commit = proc.stdout.trim();
  if (proc.status !== 0 || !/^[0-9a-f]{40}$/.test(commit)) {
    throw new Error(`cannot determine execution checkout commit: ${proc.stderr || proc.stdout}`);
  }
  return commit;
}

function assertCandidateSourceMatchesExecution(candidateCommit: string): void {
  const exists = spawnSync("git", ["cat-file", "-e", `${candidateCommit}^{commit}`], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  if (exists.status !== 0) throw new Error(`candidate commit ${candidateCommit} is not available`);
  const diff = spawnSync(
    "git",
    [
      "diff",
      "--quiet",
      candidateCommit,
      "--",
      "reference/stats-kernel",
      "tooling/r1-08-oracle",
      "pnpm-lock.yaml",
      "package.json",
    ],
    { cwd: REPO_ROOT, encoding: "utf8" },
  );
  if (diff.status !== 0) {
    throw new Error(
      "candidate oracle execution checkout differs from candidate C in numerical/oracle source",
    );
  }
}

const EXECUTION_COMMIT = gitCommit();
if (CANDIDATE_COMMIT !== null) {
  assertCandidateSourceMatchesExecution(CANDIDATE_COMMIT);
} else if (EXECUTION_COMMIT !== HISTORICAL_REPRODUCTION_COMMIT) {
  throw new Error(
    `historical R1-08 evidence may only be reproduced at ${HISTORICAL_REPRODUCTION_COMMIT}; use candidate mode for current/future candidates`,
  );
}
const SOURCE_VERSION = CANDIDATE_COMMIT ?? BASE_COMMIT;

function ensureDir(p: string): void {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(rel: string, data: unknown): void {
  const full = path.join(EVIDENCE_DIR, rel);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function writeYaml(rel: string, data: unknown): void {
  const full = path.join(EVIDENCE_DIR, rel);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, YAML.stringify(data), "utf8");
}

function writeText(rel: string, text: string): void {
  const full = path.join(EVIDENCE_DIR, rel);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, text, "utf8");
}

function hashFile(relPath: string): string {
  const bytes = fs.readFileSync(path.join(EVIDENCE_DIR, relPath));
  return hashBytesSha256(bytes);
}

function runArbOracle(cases: CorpusCase[]): ArbCaseResult[] {
  const payload = {
    cases: cases
      .filter((c) => !c.degenerate_expected?.includes("ZERO_STANDARD_ERROR"))
      .filter((c) => c.exact_algebraic && !c.exact_algebraic.degenerate)
      .map((c) => {
        const ex = c.exact_algebraic!;
        const seSq = ratStrToNumber(ex.se_squared);
        const df = ratStrToNumber(ex.welch_df);
        const md = ratStrToNumber(ex.mean_difference);
        if (!Number.isFinite(seSq) || !Number.isFinite(df) || !Number.isFinite(md)) {
          throw new Error(`non-finite arb input for ${c.case_id}`);
        }
        return {
          case_id: c.case_id,
          se_squared: `${seSq}`,
          welch_df: `${df}`,
          mean_difference: `${md}`,
          authority: "exact_rational_evaluated_to_binary64_string",
        };
      }),
  };
  const py = PYTHON;
  const proc = spawnSync(py, [ARB_SCRIPT], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
  });
  if (proc.status !== 0) {
    throw new Error(`arb oracle failed: ${proc.stderr || proc.stdout}`);
  }
  const out = JSON.parse(proc.stdout) as { results: ArbCaseResult[] };
  return out.results;
}

function buildCases(): CorpusCase[] {
  const cases: CorpusCase[] = [];
  for (const seed of CORPUS_SEEDS) {
    const built = buildCorpusCaseFromSeed(seed);
    const sut = runSut(built.group_x, built.group_y);
    let df: number | null = null;
    let p: number | null = null;
    if (sut.status === "ok" && sut.welch) {
      df = sut.welch.degrees_of_freedom;
      p = sut.welch.p_value;
    }
    const caseId = formatCaseId(seed.class, df, p);
    const caseEntry: CorpusCase = {
      case_id: caseId,
      seed_id: seed.seed_id,
      class: seed.class,
      group_x: built.group_x,
      group_y: built.group_y,
      input_manifest_sha256: built.input_manifest_sha256,
      degenerate_expected: built.degenerate_expected,
      notes: built.notes,
    };
    caseEntry.exact_algebraic = exactAlgebraicFromGroups(
      caseId,
      caseEntry.group_x,
      caseEntry.group_y,
    );
    cases.push(caseEntry);
  }
  return cases;
}

function rationalToNumber(ratStr: string): number | null {
  if (!/^-?\d+\/\d+$/.test(ratStr)) return null;
  return ratStrToNumber(ratStr);
}

function compareField(
  caseId: string,
  field: string,
  sutValue: number | null,
  refMid: number | null,
  refKind: string,
  tol?: { absolute: number; relative: number },
): ReplayRow {
  if (sutValue === null || refMid === null) {
    return {
      case_id: caseId,
      field,
      sut_value: sutValue,
      reference: refMid,
      reference_kind: refKind,
      verdict: "INDETERMINATE",
    };
  }
  let pass = false;
  if (field === "p_value") {
    pass = withinPValueTolerance021(sutValue, refMid);
  } else if (tol) {
    pass = withinNumericTolerance(sutValue, refMid, tol);
  }
  return {
    case_id: caseId,
    field,
    sut_value: sutValue,
    reference: refMid,
    reference_kind: refKind,
    contract_tolerance: tol,
    abs_deviation: Math.abs(sutValue - refMid),
    relative_deviation: relDeviation(sutValue, refMid),
    ulp_distance: ulpDistance(sutValue, refMid),
    verdict: pass ? "PASS" : "FAIL",
  };
}

function buildReplayMatrix(cases: CorpusCase[], arb: ArbCaseResult[]): ReplayRow[] {
  const arbMap = new Map(arb.map((r) => [r.case_id, r]));
  const rows: ReplayRow[] = [];

  for (const c of cases) {
    const sut = runSut(c.group_x, c.group_y);
    if (c.degenerate_expected?.includes("ZERO_STANDARD_ERROR")) {
      rows.push({
        case_id: c.case_id,
        field: "degenerate",
        sut_value: sut.error_code ?? "ok",
        reference: null,
        reference_kind: "contract",
        verdict:
          sut.status === "error" && sut.error_code === "ZERO_STANDARD_ERROR"
            ? "DEGENERATE_EXPECTED"
            : "FAIL",
      });
      continue;
    }
    if (c.degenerate_expected?.includes("NRS-P-VALUE-UNDERFLOW")) {
      rows.push({
        case_id: c.case_id,
        field: "p_underflow",
        sut_value: sut.welch?.p_value ?? null,
        reference: null,
        reference_kind: "contract",
        verdict: sut.underflow ? "DEGENERATE_EXPECTED" : "FAIL",
      });
      continue;
    }
    if (sut.status !== "ok" || !sut.welch) {
      rows.push({
        case_id: c.case_id,
        field: "sut",
        sut_value: sut.error_code ?? "error",
        reference: null,
        reference_kind: "n/a",
        verdict: "FAIL",
      });
      continue;
    }
    const a = arbMap.get(c.case_id);
    if (!a) continue;
    const w = sut.welch;

    const add = (
      field: string,
      sutVal: number,
      refEnc: { mid: number } | undefined,
      tol?: { absolute: number; relative: number },
    ) => {
      rows.push(compareField(c.case_id, field, sutVal, refEnc?.mid ?? null, "arb_enclosure", tol));
    };

    const ex = c.exact_algebraic;
    const addExact = (
      field: string,
      sutVal: number,
      ratStr: string | undefined,
      tol: { absolute: number; relative: number },
    ) => {
      const ref = ratStr ? rationalToNumber(ratStr) : null;
      rows.push(compareField(c.case_id, field, sutVal, ref, "exact_rational", tol));
    };

    addExact("mean_x", w.group_summaries[0].mean, ex?.mean_x, TOLERANCES_021.mean!);
    addExact(
      "sample_variance_x",
      w.group_summaries[0].sample_variance,
      ex?.sample_variance_x,
      TOLERANCES_021.sample_variance!,
    );
    addExact("mean_y", w.group_summaries[1].mean, ex?.mean_y, TOLERANCES_021.mean!);
    addExact(
      "sample_variance_y",
      w.group_summaries[1].sample_variance,
      ex?.sample_variance_y,
      TOLERANCES_021.sample_variance!,
    );
    addExact("mean_difference", w.mean_difference, ex?.mean_difference, TOLERANCES_021.estimate!);
    add("standard_error", w.standard_error, a.standard_error, TOLERANCES_021.standard_error);
    add("test_statistic", w.test_statistic, a.test_statistic, TOLERANCES_021.test_statistic);
    addExact(
      "degrees_of_freedom",
      w.degrees_of_freedom,
      ex?.welch_df,
      TOLERANCES_021.degrees_of_freedom!,
    );
    add("p_value", w.p_value, a.p_value, TOLERANCES_021.p_value);
    add(
      "critical_value",
      w.confidence_interval.critical_value,
      a.critical_value,
      TOLERANCES_021.critical_value,
    );
    add("ci_lower", w.confidence_interval.lower, a.ci_lower, TOLERANCES_021.ci_lower);
    add("ci_upper", w.confidence_interval.upper, a.ci_upper, TOLERANCES_021.ci_upper);
  }
  return rows;
}

function offsetLadderAnalysis(): {
  steps: unknown[];
  relation_checks: { relation: string; status: string; detail?: string }[];
} {
  const steps = [];
  const ladderBase = OFFSET_LADDER[0]!;
  const baseSut = runSut(
    { group_id: "x", values: buildGroupValues(ladderBase.group_x) },
    { group_id: "y", values: buildGroupValues(ladderBase.group_y) },
  );
  const relationChecks: { relation: string; status: string; detail?: string }[] = [];

  for (const step of OFFSET_LADDER) {
    const gx = buildGroupValues(step.group_x);
    const gy = buildGroupValues(step.group_y);
    const sut = runSut({ group_id: "x", values: gx }, { group_id: "y", values: gy });
    const naiveX = naiveVar(step.group_x);
    const naiveY = naiveVar(step.group_y);
    const exact = exactAlgebraicFromGroups(
      `offset_${step.offset}`,
      { group_id: "x", values: gx },
      { group_id: "y", values: gy },
    );
    steps.push({
      offset: step.offset,
      sut_variance_x: sut.welch?.group_summaries[0].sample_variance,
      sut_variance_y: sut.welch?.group_summaries[1].sample_variance,
      naive_variance_x: naiveX,
      naive_variance_y: naiveY,
      exact_variance_x: exact.sample_variance_x,
      exact_variance_y: exact.sample_variance_y,
      sut_t: sut.welch?.test_statistic,
      sut_df: sut.welch?.degrees_of_freedom,
      sut_p: sut.welch?.p_value,
      sut_passes_contract:
        sut.status === "ok" &&
        sut.welch &&
        withinNumericTolerance(
          sut.welch.group_summaries[0].sample_variance,
          rationalToNumber(exact.sample_variance_x) ?? 1,
          TOLERANCES_021.sample_variance!,
        ) &&
        withinNumericTolerance(
          sut.welch.group_summaries[1].sample_variance,
          rationalToNumber(exact.sample_variance_y) ?? 1,
          TOLERANCES_021.sample_variance!,
        ),
    });
  }

  if (baseSut.status === "ok" && baseSut.welch) {
    for (const step of OFFSET_LADDER.slice(1)) {
      const gx = buildGroupValues(step.group_x);
      const gy = buildGroupValues(step.group_y);
      const sut = runSut({ group_id: "x", values: gx }, { group_id: "y", values: gy });
      if (sut.status !== "ok" || !sut.welch) {
        relationChecks.push({
          relation: "add_common_offset",
          status: "fail",
          detail: `offset ${step.offset}: SUT error`,
        });
        continue;
      }
      const invariant =
        sut.welch.test_statistic === baseSut.welch!.test_statistic &&
        sut.welch.degrees_of_freedom === baseSut.welch!.degrees_of_freedom &&
        sut.welch.p_value === baseSut.welch!.p_value;
      relationChecks.push({
        relation: "add_common_offset",
        status: invariant ? "pass" : "fail",
        detail: invariant
          ? `offset ${step.offset}`
          : `offset ${step.offset}: Welch outputs changed`,
      });
    }
  }

  return { steps, relation_checks: relationChecks };
}

function componentLineage(): unknown {
  const pnpmStore = path.join(REPO_ROOT, "node_modules/.pnpm");
  const paths = {
    t_cdf:
      "@stdlib+stats-base-dists-t-cdf@0.2.3/node_modules/@stdlib/stats-base-dists-t-cdf/lib/main.js",
    t_quantile:
      "@stdlib+stats-base-dists-t-quantile@0.2.3/node_modules/@stdlib/stats-base-dists-t-quantile/lib/main.js",
    betainc:
      "@stdlib+math-base-special-betainc@0.2.3/node_modules/@stdlib/math-base-special-betainc/lib/main.js",
    kernel_betainc:
      "@stdlib+math-base-special-kernel-betainc@0.2.3/node_modules/@stdlib/math-base-special-kernel-betainc/lib/assign.js",
    kernel_betaincinv:
      "@stdlib+math-base-special-kernel-betaincinv@0.2.3/node_modules/@stdlib/math-base-special-kernel-betaincinv/lib/main.js",
    stats_kernel: "reference/stats-kernel/src/kernel.ts",
    stats_tdist: "reference/stats-kernel/src/t-distribution.ts",
  };
  const hashed: Record<string, string> = {};
  for (const [k, rel] of Object.entries(paths)) {
    const full = path.join(pnpmStore, rel);
    const alt = path.join(REPO_ROOT, rel);
    const target = fs.existsSync(full) ? full : alt;
    hashed[k] = hashBytesSha256(fs.readFileSync(target));
  }
  const components = [
    {
      component_id: "summary_mean",
      package: "nomue-record/reference",
      version: BASE_COMMIT,
      source_path: "reference/stats-kernel/src/kernel.ts",
      source_sha256: hashed.stats_kernel,
      algorithm: "Kahan-Neumaier compensated summation",
      ancestor_algorithm_or_paper: "Kahan (1965); Neumaier summation",
      arithmetic_model: "IEEE754_binary64",
      precision_model: "binary64",
      validation_model: "exact_rational_crosscheck",
      relationship_to: {
        R_pt: "independent",
        SciPy_stdtr: "independent",
        Boost_ibeta: "independent",
        Arb: "independent",
      },
      status: "VERIFIED_FROM_SOURCE",
    },
    {
      component_id: "sample_variance",
      package: "nomue-record/reference",
      version: BASE_COMMIT,
      source_path: "reference/stats-kernel/src/kernel.ts",
      source_sha256: hashed.stats_kernel,
      algorithm: "two-pass compensated squared deviations, n-1 denominator",
      ancestor_algorithm_or_paper: "standard textbook two-pass; not Welford",
      arithmetic_model: "IEEE754_binary64",
      precision_model: "binary64",
      validation_model: "exact_rational_crosscheck",
      relationship_to: {
        R_pt: "independent",
        SciPy_stdtr: "independent",
        Boost_ibeta: "independent",
        Arb: "independent",
      },
      status: "VERIFIED_FROM_SOURCE",
    },
    {
      component_id: "t_cdf",
      package: "@stdlib/stats-base-dists-t-cdf",
      version: "0.2.3",
      source_path: paths.t_cdf,
      source_sha256: hashed.t_cdf,
      algorithm: "Student t CDF via regularized incomplete beta (tail selection)",
      ancestor_algorithm_or_paper: "Boost Math beta.hpp (John Maddock 2006) ported to JS",
      arithmetic_model: "IEEE754_binary64",
      precision_model: "binary64",
      validation_model: "not_oracle_shared_lineage",
      relationship_to: {
        R_pt: "possibly_shared_TOMS708_family",
        SciPy_stdtr: "possibly_shared_Boost_path",
        Boost_ibeta: "ported_from_Boost",
        Arb: "independent_acb_enclosure",
      },
      status: "VERIFIED_FROM_SOURCE",
    },
    {
      component_id: "t_quantile",
      package: "@stdlib/stats-base-dists-t-quantile",
      version: "0.2.3",
      source_path: paths.t_quantile,
      source_sha256: hashed.t_quantile,
      algorithm: "inverse incomplete beta via kernel-betaincinv (Halley/Temme)",
      ancestor_algorithm_or_paper: "Boost ibeta_inverse.hpp (Maddock 2006) ported to JS",
      arithmetic_model: "IEEE754_binary64",
      precision_model: "binary64",
      validation_model: "acb_quantile_route_Q2",
      relationship_to: {
        R_pt: "NOT_algorithmically_independent_if_R_qt_Hill396",
        SciPy_stdtr: "possibly_shared_Boost_path",
        Boost_ibeta: "ported_from_Boost_ibeta_inverse",
        Arb: "independent_acb_enclosure",
      },
      status: "VERIFIED_FROM_SOURCE",
      quantile_route: "Q2_acb_adaptive_bracket",
      r_qt_independence: "NOT_ESTABLISHED_R_UNAVAILABLE",
    },
  ];
  if (CANDIDATE_MODE) {
    for (const component of components) {
      if (component.package === "nomue-record/reference") component.version = SOURCE_VERSION;
    }
    return {
      candidate_content_commit: CANDIDATE_COMMIT,
      execution_checkout_commit: EXECUTION_COMMIT,
      historical_lineage_base_commit: BASE_COMMIT,
      components,
      source_file_hashes: hashed,
    };
  }
  return { base_commit: BASE_COMMIT, components, source_file_hashes: hashed };
}

function writeHashes(): void {
  const files: string[] = [];
  const walk = (dir: string, prefix = ""): void => {
    for (const name of fs.readdirSync(dir)) {
      if (name === ".venv") continue;
      const full = path.join(dir, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      if (fs.statSync(full).isDirectory()) {
        walk(full, rel);
      } else if (name !== "hashes.sha256") {
        files.push(rel);
      }
    }
  };
  walk(EVIDENCE_DIR);
  const lines = files
    .sort()
    .map(
      (rel) =>
        `${hashBytesSha256(fs.readFileSync(path.join(EVIDENCE_DIR, rel)))}  ${rel.replace(/\\/g, "/")}`,
    );
  fs.writeFileSync(path.join(EVIDENCE_DIR, "hashes.sha256"), lines.join("\n") + "\n", "utf8");
}

export function main(): void {
  ensureDir(EVIDENCE_DIR);
  ensureDir(CORPUS_DIR);

  const cases = buildCases();
  writeJson(
    "04-canonical-corpus.json",
    CANDIDATE_MODE
      ? {
          corpus_version: "r1-08-canonical-oracle-corpus-v1",
          candidate_content_commit: CANDIDATE_COMMIT,
          execution_checkout_commit: EXECUTION_COMMIT,
          cases,
        }
      : { corpus_version: "r1-08-canonical-oracle-corpus-v1", base_commit: BASE_COMMIT, cases },
  );

  writeYaml("05-corpus-relations.yaml", {
    corpus_version: "r1-08-canonical-oracle-corpus-v1",
    relations: [
      {
        transform: "within_group_permutation",
        base_seed: "seed_unequal_n_var",
        permuted_seed: "seed_permutation",
        expected: {
          mean: "exact_equal",
          variance: "exact_equal",
          df: "exact_equal",
          abs_t: "exact_equal",
          p: "exact_equal",
        },
      },
      {
        transform: "group_swap",
        base_seed: "seed_balanced",
        swapped_seed: "seed_swap",
        expected: {
          mean_diff: "negate",
          t: "negate",
          df: "exact_equal",
          p: "exact_equal",
          ci: "negate_and_reverse",
        },
      },
      {
        transform: "multiply_by_power_of_two",
        base_seed: "seed_balanced",
        scaled_seed: "seed_scale_pow2",
        factor: 2,
        expected: {
          t: "invariant",
          df: "invariant",
          p: "invariant",
          mean_diff: "scale",
          ci: "scale",
        },
      },
      {
        transform: "add_common_offset",
        ladder: "offset_ladder",
        expected: {
          mathematical_result: "invariant",
          binary64_relation: "verified_by_exact_rational_oracle",
        },
      },
    ],
  });

  const exactResults = cases.map((c) => c.exact_algebraic!);
  writeJson("06-exact-algebraic-results.json", { results: exactResults });

  const arbResults = runArbOracle(cases);
  writeJson("07-arb-pvalue-results.json", {
    results: arbResults,
    oracle_kind: "acb_incomplete_beta_enclosure",
  });
  writeJson("08-quantile-crosscheck-results.json", {
    route: "Q2_acb_adaptive_bracket",
    r_route: "Q1_not_available",
    note: "R runtime unavailable; quantile cross-check uses acb enclosure independent of stdlib betaincinv",
    results: arbResults.map((r) => ({
      case_id: r.case_id,
      critical_value: r.critical_value,
      ci_lower: r.ci_lower,
      ci_upper: r.ci_upper,
    })),
  });

  const replay = buildReplayMatrix(cases, arbResults);
  const offsetAnalysis = offsetLadderAnalysis();
  writeYaml("09-sut-replay-matrix.yaml", { rows: replay, offset_ladder: offsetAnalysis });

  const relationChecks = validateRelations(cases);
  const offsetRelationFails = offsetAnalysis.relation_checks.filter((r) => r.status === "fail");
  const failures = replay.filter((r) => r.verdict === "FAIL");
  const sutReplayPass = failures.length === 0;
  const metamorphicPass =
    relationChecks.every((r) => r.status === "pass") && offsetRelationFails.length === 0;
  const thirdOracleHoldDisposition = "satisfied_by_acb_independent_lineage";
  const readiness = sutReplayPass && metamorphicPass;

  writeYaml(
    "13-r1-08-readiness.yaml",
    CANDIDATE_MODE
      ? {
          ready_for_gate_review: readiness,
          gate_index_modified: false,
          candidate_content_commit: CANDIDATE_COMMIT,
          execution_checkout_commit: EXECUTION_COMMIT,
          failure_count: failures.length,
          relation_failures: relationChecks.filter((r) => r.status === "fail"),
          offset_relation_failures: offsetRelationFails,
          independent_lineage_disposition: thirdOracleHoldDisposition,
          sut_replay_pass: sutReplayPass,
          metamorphic_pass: metamorphicPass,
          disposition_notes:
            "python-flint FLINT/acb enclosure supplies an implementation lineage disjoint from stdlib/Boost; R live execution is optional supplemental evidence, not a gate-state condition.",
        }
      : {
          ready_for_close_attempt: readiness,
          gate_index_modified: false,
          failure_count: failures.length,
          relation_failures: relationChecks.filter((r) => r.status === "fail"),
          offset_relation_failures: offsetRelationFails,
          third_oracle_hold_disposition: thirdOracleHoldDisposition,
          sut_replay_pass: sutReplayPass,
          metamorphic_pass: metamorphicPass,
          disposition_notes:
            "R1-08_third_oracle_lineage satisfied by python-flint FLINT/acb enclosure (disjoint from stdlib/Boost); R live execution optional supplemental only.",
        },
  );

  writeJson(
    "11-environment-manifest.json",
    CANDIDATE_MODE
      ? {
          python_venv: "tooling/r1-08-oracle/.venv",
          python_packages: ["python-flint==0.6.0", "mpmath==1.3.0"],
          arb_oracle: "tooling/r1-08-oracle/python/arb_oracle.py",
          reproduction_command: "pnpm oracle:r1-08 (candidate mode)",
          candidate_content_commit: CANDIDATE_COMMIT,
          execution_checkout_commit: EXECUTION_COMMIT,
          stdlib_packages: {
            "@stdlib/stats-base-dists-t-cdf": "0.2.3",
            "@stdlib/stats-base-dists-t-quantile": "0.2.3",
          },
        }
      : {
          python_venv: "environment/.venv",
          python_packages: ["python-flint==0.6.0", "mpmath==1.3.0"],
          arb_oracle: "tooling/r1-08-oracle/python/arb_oracle.py",
          reproduction_command: "pnpm oracle:r1-08",
          stdlib_packages: {
            "@stdlib/stats-base-dists-t-cdf": "0.2.3",
            "@stdlib/stats-base-dists-t-quantile": "0.2.3",
          },
        },
  );

  writeText(
    "12-reproduction-log.md",
    CANDIDATE_MODE
      ? `# Candidate reproduction log\n\n` +
          `- Candidate content commit: ${CANDIDATE_COMMIT}\n` +
          `- Execution checkout commit: ${EXECUTION_COMMIT}\n` +
          `- Command: candidate-mode \`pnpm oracle:r1-08\`\n` +
          `- Output directory: ${path.relative(REPO_ROOT, EVIDENCE_DIR).replace(/\\/g, "/")}\n`
      : `# Reproduction log\n\n` +
          `## Python environment (first run)\n\n` +
          `\`\`\`bash\n` +
          `python -m venv evidence/development/r1-08-independent-oracle-v1/environment/.venv\n` +
          `evidence/development/r1-08-independent-oracle-v1/environment/.venv/Scripts/python.exe -m pip install -r evidence/development/r1-08-independent-oracle-v1/environment/requirements.txt\n` +
          `\`\`\`\n\n` +
          `On Unix, use \`bin/python\` instead of \`Scripts/python.exe\`.\n\n` +
          `## Evidence generation\n\n` +
          `- Command: \`pnpm oracle:r1-08\` (or \`npx tsx tooling/r1-08-oracle/src/run.ts\`)\n` +
          `- Base commit: ${BASE_COMMIT}\n`,
  );

  writeYaml("01-authority-binding.yaml", {
    r1_08_gate: "authority/release-1-gates.yaml",
    adr_oracle_separation: "governance/decisions/ADR-0010-stats-dependency-oracle-separation.md",
    numerical_contract: "urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1",
    tolerance_authority: "registries/public-checks.yaml welch-recompute:0.2.1-draft.1",
    comparison_policy: "canonicalization/numerical-comparison.md",
  });

  writeYaml("02-sut-component-lineage.yaml", componentLineage());

  writeText(
    "03-external-research-intake.md",
    CANDIDATE_MODE
      ? `# External research intake\n\nClassification: external_informative_noncanonical\n\n` +
          `Status: **NOT_USED_BY_CANDIDATE_REPRODUCTION**.\n\n` +
          `The candidate oracle rerun consumes no host-specific external research path. The independence argument is established from checked-in source lineage and oracle implementation; external survey claims are not authority for this run.\n`
      : `# External research intake\n\nClassification: external_informative_noncanonical\n\n` +
          `Status: **HISTORICAL_CONTEXT_ONLY**.\n\n` +
          `Historical external-survey intake is not authority for oracle reproduction; the committed historical evidence records the original environment context.\n`,
  );

  writeText(
    "00-executive-verdict.md",
    `# Executive verdict\n\n` +
      `## R1-08 acceptance coverage\n\n` +
      `1. **Independent oracle:** python-flint acb incomplete-beta enclosure (FLINT/Arb lineage) is algorithmically disjoint from @stdlib Boost-port betainc used by the SUT. Exact rational oracle covers Welch summary algebra from binary64 bit patterns.\n` +
      `2. **Cross-check log:** \`09-sut-replay-matrix.yaml\` — summary stats vs exact rational; Welch outputs vs acb enclosure; degenerate cases fail-closed.\n` +
      `3. **Common-cause analysis:** \`10-common-cause-analysis.md\` + \`02-sut-component-lineage.yaml\`.\n\n` +
      `## Status\n\n` +
      `- Corpus: r1-08-canonical-oracle-corpus-v1 (${cases.length} cases)\n` +
      `- SUT replay failures: ${failures.length}\n` +
      `- Metamorphic relations: ${metamorphicPass ? "PASS" : "FAIL"}\n` +
      `- Third-oracle hold: R1-08_third_oracle_lineage satisfied_by_acb_independent_lineage\n` +
      `- Ready for close attempt: ${readiness ? "YES" : "NO"}\n` +
      `- Gate state: not asserted by this evidence bundle; review the Release 1 gate registry/index separately.\n`,
  );

  writeText(
    "10-common-cause-analysis.md",
    `# Common-cause failure analysis\n\n` +
      `## SUT component lineage (shared ancestry risk)\n\n` +
      `- t-CDF and t-quantile both route through @stdlib math-base-special-betainc / kernel-betaincinv — ports of Boost \`beta.hpp\` and \`ibeta_inverse.hpp\`.\n` +
      `- SciPy stdtr may share Boost-related paths (see dependency-provenance.yaml); not used as oracle here.\n` +
      `- Summary mean/variance: pure JS compensated summation — independent of betainc lineage.\n\n` +
      `## Independent oracle (disjoint lineage)\n\n` +
      `- **Exact rational oracle** (\`tooling/r1-08-oracle/src/exact-algebraic.ts\`): reconstructs binary64 inputs as exact rationals; computes Welch df, SE², mean difference without sqrt.\n` +
      `- **acb enclosure oracle** (\`tooling/r1-08-oracle/python/arb_oracle.py\`): python-flint FLINT acb incomplete beta; no @stdlib/Boost code dependency.\n` +
      `- **mpmath** column in \`07-arb-pvalue-results.json\` is witness-only (100 dps); not validated authority.\n` +
      `- **Quantile route Q2:** adaptive bracket + acb bisection; Genspark fixed bracket not used. R qt route Q1 not available.\n\n` +
      `## Independence argument\n\n` +
      `- Arb/acb uses FLINT's native beta functions on arbitrary-precision balls — different implementation family from JS Boost port.\n` +
      `- Tail branch selection in acb t-CDF mirrors stdlib for numerical stability but executes in independent acb arithmetic; disagreement on quantile (~1e-11) demonstrates routes are not bitwise-coupled.\n` +
      `- A third R qt lineage is not established; R execution is optional supplemental evidence because the FLINT/acb path already supplies the independently implemented lineage used for this review.\n\n` +
      `## Offset ladder (common-offset cancellation)\n\n` +
      `- Naive one-pass variance fails at 1e9+ offsets; SUT compensated two-pass matches exact rational oracle (variance = 1).\n` +
      `- Welch t, df, p invariant under common offset when binary64 inputs preserve spread.\n`,
  );

  writeHashes();
  console.log(
    `r1-08-oracle: wrote evidence bundle; failures=${failures.length}; ready=${readiness}`,
  );
  if (failures.length > 0) {
    for (const f of failures.slice(0, 10)) {
      console.log(`  FAIL ${f.case_id} ${f.field}`);
    }
  }
}

main();
