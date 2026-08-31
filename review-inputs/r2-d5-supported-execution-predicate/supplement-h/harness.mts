/**
 * Review-only Section H harness for the R2-D5 supported-execution candidate.
 *
 * Runs a fixed deterministic corpus against the unchanged implementation at the
 * review-input commit, retains the protocol-required per-case fields, and emits
 * a machine-readable manifest with:
 *   - a platform-neutral semantic projection hash per case (trace-digest grammar
 *     minus the runtime-identity line and the identity-bound sha256 field); and
 *   - the raw runtime-identity-bound trace digest per case.
 * Modes: "cold" (first evaluation of each case in a fresh process) and "hot"
 * (after a documented warm-up, three captured passes).
 *
 * This file is reviewer-owned evidence tooling. It selects no support, platform,
 * allowlist, profile, or resource bound.
 */
import { createHash } from "node:crypto";
import { createReadStream, writeFileSync } from "node:fs";
import { evaluatePairedTSupportedExecutionCandidate as evaluate } from "../../../tooling/src/spikes/paired-t-supported-execution-candidate.js";

const b = (v: number): string => {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setFloat64(0, v, false);
  return new DataView(buf).getBigUint64(0, false).toString(16).padStart(16, "0");
};
const fromHex = (h: string): number => {
  const buf = new ArrayBuffer(8);
  new DataView(buf).setBigUint64(0, BigInt(`0x${h}`), false);
  return new DataView(buf).getFloat64(0, false);
};
const nextUp = (v: number): number =>
  fromHex((BigInt(`0x${b(v)}`) + 1n).toString(16).padStart(16, "0"));
const nextDown = (v: number): number =>
  fromHex((BigInt(`0x${b(v)}`) - 1n).toString(16).padStart(16, "0"));
const sha = (s: string): string => createHash("sha256").update(s, "utf8").digest("hex");

/** Fixed deterministic corpus. No randomness. Order is significant. */
export function corpus(): Array<{ id: string; df: number; tHex: string }> {
  const cases: Array<{ id: string; df: number; tHex: string }> = [];
  const push = (id: string, df: number, t: number) => cases.push({ id, df, tHex: b(t) });
  // every df 1..200; central branch, tail branch, and the |t| = 1 boundary
  for (let df = 1; df <= 200; df += 1) {
    push(`df${df}-central-half`, df, 0.5);
    push(`df${df}-tail-five`, df, 5);
    push(`df${df}-at-one`, df, 1);
  }
  // adjacent binary64 values around |t| = 1 at representative odd/even, closed-form, and extreme df
  for (const df of [1, 2, 3, 5, 72, 100, 197, 199, 200]) {
    push(`df${df}-above-one`, df, nextUp(1));
    push(`df${df}-below-one`, df, nextDown(1));
  }
  // required singles
  push("df1-plus-zero", 1, 0);
  push("df5-plus-zero", 5, 0);
  push("df10-min-subnormal", 10, 5e-324);
  push("df10-min-normal", 10, 2.2250738585072014e-308);
  push("df10-t-twenty", 10, 20);
  push("df197-witness", 197, 50.4);
  push("df200-long-series-b", 200, nextUp(nextUp(1)));
  push("df5-max-finite", 5, Number.MAX_VALUE);
  // representative refusals (negative zero, out-of-range df, non-integer df, NaN)
  push("refusal-negative-zero", 10, -0);
  push("refusal-nan", 10, Number.NaN);
  cases.push({ id: "refusal-df-zero", df: 0, tHex: b(1) });
  cases.push({ id: "refusal-df-201", df: 201, tHex: b(1) });
  cases.push({ id: "refusal-df-fraction", df: 1.5, tHex: b(1) });
  return cases;
}

/**
 * Platform-neutral projection: the implementation's trace-digest byte grammar
 * minus exactly the runtime-identity line and the identity-bound sha256 field.
 * Returns the neutral lines plus the excluded runtime-identity line so the raw
 * digest can be independently recomputed on-runner as
 * sha256(lines 1..3, identity line, lines 4..end), proving that the raw digest
 * binds precisely (neutral projection + runtime identity) and nothing else.
 */
function projectTrace(trace: any): { neutralLines: string[]; identityLine: string } {
  const lines: string[] = [];
  lines.push(trace.format);
  lines.push(`${trace.input.degrees_of_freedom}|${trace.input.test_statistic_binary64_hex}`);
  lines.push(
    `${trace.normalization_constant.inverse_beta_binary64_hex}|${trace.normalization_constant.candidate_table_content_hash}`,
  );
  const p = trace.proof_input;
  lines.push(
    `${p.roundoff_gamma_index}|${p.accumulated_sum_gamma_index}|${p.next_term_gamma_index}|${p.series_remainder_multiplier}|${p.sqrt_rounding_cell_checks}|${p.truncation_relative_upper_bound_numerator}/${p.truncation_relative_upper_bound_denominator}|${p.relative_error_upper_bound_numerator}/${p.relative_error_upper_bound_denominator}`,
  );
  const o = trace.outcome;
  lines.push(
    `${o.branch}|${o.iterations}|${o.iteration_cap}|${o.p_value_binary64_hex}|${String(o.p_value_source_sequence)}|${o.positive_series_remainder_binary64_hex}|${String(o.positive_series_remainder_source_sequence)}`,
  );
  lines.push(`${trace.node_count}|${trace.maximum_node_count}`);
  for (const n of trace.nodes) {
    lines.push(
      `${n.sequence}|${n.label}|${n.operation}|${n.operand_sources.map(String).join(",")}|${n.operand_binary64_hex.join(",")}|${n.result_binary64_hex}`,
    );
  }
  const ri = trace.runtime_identity;
  const identityLine = `${ri.runtime_family}|${ri.runtime_version}|${ri.engine_family}|${ri.engine_version}|${ri.platform}|${ri.architecture}`;
  return { neutralLines: lines, identityLine };
}

function evaluateCase(entry: { id: string; df: number; tHex: string }): Record<string, unknown> {
  const input = { degreesOfFreedom: entry.df, testStatistic: fromHex(entry.tHex) };
  const r: any = evaluate(input);
  if (
    r.supportedExecutionPredicateSatisfied !== false ||
    r.supportedPlatformClaimed !== false ||
    r.runtimeSupportClaimed !== false ||
    r.supportedDomainClaimed !== false
  ) {
    throw new Error(`${entry.id}: unexpected support claim`);
  }
  if (!r.ok) {
    // The refusal classification AND its recorded reasons are platform-neutral
    // outcomes; binding them into the neutral hash makes a platform-dependent
    // refusal-reason difference visible to the cross-runner comparison.
    const traceErrors = r.traceErrors ?? null;
    const proofFailures = r.proofFailures ?? null;
    return {
      id: entry.id,
      df: entry.df,
      t_hex: entry.tHex,
      ok: false,
      classification: r.classification,
      graph_classification: r.graphClassification ?? null,
      trace_errors: traceErrors,
      proof_failures: proofFailures,
      neutral_sha256: sha(
        [
          "refusal",
          r.classification,
          String(r.graphClassification ?? ""),
          JSON.stringify(traceErrors),
          JSON.stringify(proofFailures),
        ].join("|"),
      ),
      raw_trace_sha256: null,
    };
  }
  if (
    r.executionProfile.exactRuntimeAllowlistSelected !== false ||
    r.executionProfile.controlledProcessProfileEnforced !== false ||
    r.executionProfile.crossPlatformAdmissionEvidenceComplete !== false
  ) {
    throw new Error(`${entry.id}: unexpected profile claim`);
  }
  const t = r.trace;
  const { neutralLines, identityLine } = projectTrace(t);
  // On-runner raw-digest recomputation: the digest grammar is the neutral
  // lines with the runtime-identity line inserted after line 3, each line
  // newline-terminated. Equality with the implementation-reported sha256
  // proves the raw digest binds exactly (neutral projection + identity line).
  const rawRecomputed = `sha256:${sha(
    [...neutralLines.slice(0, 3), identityLine, ...neutralLines.slice(3)]
      .map((l) => `${l}\n`)
      .join(""),
  )}`;
  if (rawRecomputed !== t.sha256) {
    throw new Error(`${entry.id}: raw digest recomputation mismatch`);
  }
  return {
    id: entry.id,
    df: entry.df,
    t_hex: entry.tHex,
    ok: true,
    branch: r.branch,
    p_value_binary64_hex: r.pValueBinary64Hex,
    iterations: r.iterations,
    iteration_cap: r.iterationCap,
    node_count: t.node_count,
    raw_trace_sha256: t.sha256,
    table_hash: t.normalization_constant.candidate_table_content_hash,
    inverse_beta_hex: t.normalization_constant.inverse_beta_binary64_hex,
    proof_indices: [
      t.proof_input.roundoff_gamma_index,
      t.proof_input.accumulated_sum_gamma_index,
      t.proof_input.next_term_gamma_index,
      t.proof_input.series_remainder_multiplier,
      t.proof_input.sqrt_rounding_cell_checks,
    ],
    truncation_bound: `${t.proof_input.truncation_relative_upper_bound_numerator}/${t.proof_input.truncation_relative_upper_bound_denominator}`,
    relative_bound: `${t.proof_input.relative_error_upper_bound_numerator}/${t.proof_input.relative_error_upper_bound_denominator}`,
    p_value_source_sequence: t.outcome.p_value_source_sequence,
    remainder_source_sequence: t.outcome.positive_series_remainder_source_sequence,
    neutral_sha256: sha(neutralLines.join("\n")),
    raw_digest_recomputed_ok: true,
    trace_runtime_identity_line: identityLine,
  };
}

function runPass(): {
  rows: Array<Record<string, unknown>>;
  neutralRollup: string;
  rawRollup: string;
} {
  const rows = corpus().map(evaluateCase);
  const neutralRollup = sha(rows.map((row) => String(row["neutral_sha256"])).join("\n"));
  const rawRollup = sha(rows.map((row) => String(row["raw_trace_sha256"] ?? "refusal")).join("\n"));
  return { rows, neutralRollup, rawRollup };
}

async function fileSha256(path: string): Promise<string> {
  const hash = createHash("sha256");
  await new Promise((resolve, reject) => {
    createReadStream(path)
      .on("data", (chunk) => hash.update(chunk))
      .on("end", resolve)
      .on("error", reject);
  });
  return hash.digest("hex");
}

const mode = process.argv[2];
const outPath = process.argv[3];
if (mode !== "cold" && mode !== "hot") throw new Error("usage: harness.mts <cold|hot> <out.json>");
const runtime = {
  node: process.version,
  v8: process.versions.v8,
  platform: process.platform,
  arch: process.arch,
  runner_os: process.env.RUNNER_OS ?? null,
  runner_arch: process.env.RUNNER_ARCH ?? null,
  image_os: process.env.ImageOS ?? null,
  image_version: process.env.ImageVersion ?? null,
  exec_path_sha256: await fileSha256(process.execPath),
  commit: process.env.GITHUB_SHA ?? null,
};
let passes: Array<{ label: string; neutralRollup: string; rawRollup: string }> = [];
let rows: Array<Record<string, unknown>> = [];
let optimizationEvidence: string = "unavailable";
if (mode === "cold") {
  const p = runPass(); // first evaluation of every case in this fresh process
  rows = p.rows;
  passes.push({ label: "cold", neutralRollup: p.neutralRollup, rawRollup: p.rawRollup });
} else {
  // documented fixed warm-up: two full uncaptured corpus passes
  runPass();
  runPass();
  try {
    const status = new Function("fn", "return %GetOptimizationStatus(fn);")(evaluate) as number;
    optimizationEvidence = `v8_get_optimization_status=0b${(status >>> 0).toString(2)}`;
  } catch {
    optimizationEvidence = "natives_syntax_unavailable_repeated_hot_path_only";
  }
  for (let i = 1; i <= 3; i += 1) {
    const p = runPass();
    if (i === 1) rows = p.rows;
    passes.push({ label: `hot${i}`, neutralRollup: p.neutralRollup, rawRollup: p.rawRollup });
  }
}
const identityLines = [
  ...new Set(
    rows
      .filter((row) => row["ok"] === true)
      .map((row) => String(row["trace_runtime_identity_line"])),
  ),
];
if (identityLines.length !== 1) throw new Error("non-uniform trace runtime identity");
const manifest = {
  supplement: "r2-d5-supported-execution-section-h",
  mode,
  runtime,
  trace_runtime_identity_line: identityLines[0],
  optimization_evidence: optimizationEvidence,
  case_count: rows.length,
  passes,
  rows,
};
writeFileSync(outPath, `${JSON.stringify(manifest, null, 1)}\n`);
const witness = rows.find((row) => row["id"] === "df197-witness");
console.log(
  JSON.stringify(
    {
      mode,
      runtime,
      traceRuntimeIdentityLine: identityLines[0],
      optimizationEvidence,
      passes,
      caseCount: rows.length,
      witness,
    },
    null,
    1,
  ),
);
