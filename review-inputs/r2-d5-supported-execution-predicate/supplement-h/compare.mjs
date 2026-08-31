/**
 * Review-only Section H cross-runner comparison for the R2-D5
 * supported-execution candidate.
 *
 * Reads one directory per tested runner (each containing cold.json and
 * hot.json produced by harness.mts), performs the Section H comparisons, and
 * writes plus prints a machine-readable comparison manifest:
 *   - within each runner: cold versus hot rollups and rows are byte-identical,
 *     and the three post-warm-up passes are deterministic;
 *   - across runners: the ordered case list and every platform-neutral field
 *     (including the per-case neutral projection hash) are identical;
 *   - raw trace digests: on every runner every raw digest was recomputed
 *     on-runner as sha256(neutral projection + runtime-identity line), so with
 *     neutral projections identical across runners, raw-digest differences are
 *     explained only by the recorded runtime-identity line.
 *
 * Plain Node with no dependencies. Selects no support, platform, allowlist,
 * profile, or resource bound.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const inDir = process.argv[2];
const outPath = process.argv[3];
if (!inDir || !outPath) throw new Error("usage: compare.mjs <manifest-dir> <out.json>");

const runnerNames = readdirSync(inDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
if (runnerNames.length === 0) throw new Error("no runner manifest directories found");

const problems = [];
const runners = [];
for (const name of runnerNames) {
  const cold = JSON.parse(readFileSync(join(inDir, name, "cold.json"), "utf8"));
  const hot = JSON.parse(readFileSync(join(inDir, name, "hot.json"), "utf8"));
  if (cold.mode !== "cold" || cold.passes.length !== 1 || cold.passes[0].label !== "cold") {
    problems.push(`${name}: malformed cold manifest`);
  }
  if (hot.mode !== "hot" || hot.passes.length !== 3) {
    problems.push(`${name}: malformed hot manifest`);
  }
  const coldRollup = cold.passes[0];
  const hotDeterministic = hot.passes.every(
    (p) =>
      p.neutralRollup === hot.passes[0].neutralRollup && p.rawRollup === hot.passes[0].rawRollup,
  );
  if (!hotDeterministic) problems.push(`${name}: post-warm-up passes are not deterministic`);
  const coldEqualsHot =
    coldRollup.neutralRollup === hot.passes[0].neutralRollup &&
    coldRollup.rawRollup === hot.passes[0].rawRollup;
  if (!coldEqualsHot) problems.push(`${name}: cold and hot rollups differ`);
  const rowsIdentical = JSON.stringify(cold.rows) === JSON.stringify(hot.rows);
  if (!rowsIdentical) problems.push(`${name}: cold and hot per-case rows differ`);
  const recomputedOk = cold.rows
    .filter((row) => row.ok === true)
    .every((row) => row.raw_digest_recomputed_ok === true);
  if (!recomputedOk) problems.push(`${name}: raw digest recomputation missing or failed`);
  if (cold.trace_runtime_identity_line !== hot.trace_runtime_identity_line) {
    problems.push(`${name}: cold and hot trace runtime identity differ`);
  }
  runners.push({
    name,
    runtime: cold.runtime,
    hot_runtime: hot.runtime,
    trace_runtime_identity_line: cold.trace_runtime_identity_line,
    optimization_evidence: { cold: cold.optimization_evidence, hot: hot.optimization_evidence },
    case_count: cold.case_count,
    cold_neutral_rollup: coldRollup.neutralRollup,
    cold_raw_rollup: coldRollup.rawRollup,
    hot_passes: hot.passes,
    checks: {
      cold_equals_hot_rollups: coldEqualsHot,
      cold_equals_hot_rows: rowsIdentical,
      hot_deterministic: hotDeterministic,
      raw_digest_recomputed_on_runner: recomputedOk,
    },
    rows: cold.rows,
  });
}

// Cross-runner: ordered case list and every platform-neutral field identical.
const reference = runners[0];
const NEUTRAL_FIELDS = [
  "id",
  "df",
  "t_hex",
  "ok",
  "classification",
  "graph_classification",
  "trace_errors",
  "proof_failures",
  "branch",
  "p_value_binary64_hex",
  "iterations",
  "iteration_cap",
  "node_count",
  "table_hash",
  "inverse_beta_hex",
  "proof_indices",
  "truncation_bound",
  "relative_bound",
  "p_value_source_sequence",
  "remainder_source_sequence",
  "neutral_sha256",
];
let neutralFieldMismatches = 0;
const mismatchExamples = [];
for (const runner of runners.slice(1)) {
  if (runner.case_count !== reference.case_count) {
    problems.push(`${runner.name}: case count differs from ${reference.name}`);
    continue;
  }
  for (let i = 0; i < reference.rows.length; i += 1) {
    for (const field of NEUTRAL_FIELDS) {
      const a = JSON.stringify(reference.rows[i][field] ?? null);
      const b = JSON.stringify(runner.rows[i][field] ?? null);
      if (a !== b) {
        neutralFieldMismatches += 1;
        if (mismatchExamples.length < 5) {
          mismatchExamples.push({
            runner: runner.name,
            case: reference.rows[i].id,
            field,
            reference: a,
            observed: b,
          });
        }
      }
    }
  }
}
if (neutralFieldMismatches > 0) {
  problems.push(
    `${neutralFieldMismatches} platform-neutral per-case field mismatches across runners`,
  );
}
const neutralRollups = [...new Set(runners.map((runner) => runner.cold_neutral_rollup))];
if (neutralRollups.length !== 1)
  problems.push("platform-neutral rollup hashes differ across runners");

// Raw digests: runners sharing a runtime-identity line must agree byte-for-byte;
// differing raw rollups must coincide with differing identity lines. Because
// every raw digest was recomputed on-runner as
// sha256(neutral projection + identity line) and the neutral projections are
// identical across runners, any raw difference is explained only by the
// recorded identity line.
for (const a of runners) {
  for (const b of runners) {
    if (a.name >= b.name) continue;
    const sameIdentity = a.trace_runtime_identity_line === b.trace_runtime_identity_line;
    const sameRaw = a.cold_raw_rollup === b.cold_raw_rollup;
    if (sameIdentity && !sameRaw) {
      problems.push(`${a.name} and ${b.name}: same runtime identity but different raw digests`);
    }
    if (!sameIdentity && sameRaw) {
      problems.push(`${a.name} and ${b.name}: different runtime identity but identical raw rollup`);
    }
  }
}

const witness = runners.map((runner) => {
  const row = runner.rows.find((r) => r.id === "df197-witness");
  return {
    runner: runner.name,
    trace_runtime_identity_line: runner.trace_runtime_identity_line,
    neutral_sha256: row?.neutral_sha256 ?? null,
    raw_trace_sha256: row?.raw_trace_sha256 ?? null,
  };
});

const manifest = {
  supplement: "r2-d5-supported-execution-section-h-cross-runner-comparison",
  runner_count: runners.length,
  case_count: reference.case_count,
  shared_neutral_rollup: neutralRollups.length === 1 ? neutralRollups[0] : null,
  neutral_rollups_identical_across_runners: neutralRollups.length === 1,
  neutral_field_mismatches: neutralFieldMismatches,
  mismatch_examples: mismatchExamples,
  raw_difference_explained_only_by_runtime_identity:
    neutralRollups.length === 1 &&
    neutralFieldMismatches === 0 &&
    runners.every((runner) => runner.checks.raw_digest_recomputed_on_runner),
  witness_case: witness,
  // Shared across all runners (verified above): the ordered case list and the
  // per-case platform-neutral projection hashes.
  case_ids: reference.rows.map((row) => row.id),
  neutral_sha256_by_case: reference.rows.map((row) => row.neutral_sha256),
  runners: runners.map(({ rows, ...rest }) => ({
    ...rest,
    // Per-runner retention: the ordered raw runtime-identity-bound trace
    // digest for every case (null marks a refusal, which carries no trace).
    raw_trace_sha256_by_case: rows.map((row) => row.raw_trace_sha256 ?? null),
  })),
  problems,
  section_h_comparisons_satisfied: problems.length === 0,
};
writeFileSync(outPath, `${JSON.stringify(manifest, null, 1)}\n`);
console.log("===BEGIN-SECTION-H-COMPARISON-MANIFEST===");
console.log(JSON.stringify(manifest, null, 1));
console.log("===END-SECTION-H-COMPARISON-MANIFEST===");
if (problems.length > 0) {
  console.error(`SECTION H COMPARISON FAILED: ${problems.length} problem(s)`);
  process.exit(1);
}
console.log("SECTION H COMPARISONS SATISFIED");
