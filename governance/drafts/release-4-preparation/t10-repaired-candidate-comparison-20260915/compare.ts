/** UNISSUED CANDIDATE. Compare fixed independent semantics; never write expected data. */
import { readFileSync, appendFileSync, existsSync } from "node:fs";
import { spawn, execFileSync } from "node:child_process";
import { createInterface } from "node:readline";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import {
  evaluate,
  validateFinal,
  exitCode,
} from "../t09-check-report-lifecycle-20260915/report.js";
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../../..");
const mode = process.argv.includes("--optimized") ? 1 : 0;
const arg = process.argv.indexOf("--output");
if (arg < 0) throw Error("--output path required");
const output = resolve(process.argv[arg + 1]!);
if (existsSync(output)) throw Error("Never overwrite candidate comparison evidence");
execFileSync(
  "python",
  [
    "-B",
    resolve(here, "../t10-independent-expectation-corpus-revision-2-20260915/check_revision.py"),
  ],
  { cwd: root },
);
const manifest = readFileSync(
  resolve(here, "../t10-independent-expectation-corpus-revision-2-20260915/MANIFEST.json"),
);
const freeze = createHash("sha256").update(manifest).digest("hex");
const fixtures = readFileSync(
  resolve(here, "../t10-independent-expectation-corpus-revision-2-20260915/corpus/fixtures.jsonl"),
  "utf8",
)
  .trim()
  .split("\n")
  .map((s) => JSON.parse(s));
const child = spawn(
  "python",
  [
    "-B",
    ...(mode ? ["-O"] : []),
    resolve(here, "../t08-limited-numerical-adapter-20260915/numerical_bridge.py"),
  ],
  { stdio: ["pipe", "pipe", "pipe"], windowsHide: true },
);
let pending: any;
let stderr = "";
let pythonVersion = "";
let seenMode: number | null = null;
let numerical: any;
child.stderr.on("data", (b) => (stderr += b));
createInterface({ input: child.stdout }).on("line", (line) => {
  try {
    const x = JSON.parse(line);
    if (x.python_optimize !== mode) throw Error("actual core optimization flag mismatch");
    seenMode = x.python_optimize;
    pythonVersion = x.python_version;
    numerical = x.result ?? x;
    pending.resolve(x);
  } catch (e) {
    pending.reject(e);
  }
  pending = undefined;
});
child.on("error", (e) => pending?.reject(e));
child.on("exit", (code) => pending?.reject(Error(String(code) + stderr)));
const invoke = (packet: string): Promise<any> =>
  new Promise((accept, reject) => {
    if (pending) throw Error("serial transport only");
    pending = { resolve: accept, reject };
    child.stdin.write(packet + "\n");
  });
const code = (value: number, ordinal: number): string => {
  if (ordinal < 5) return String(value);
  const b = Buffer.alloc(8);
  b.writeDoubleBE(value === 0 ? 0 : value);
  return b.readBigUInt64BE().toString();
};
function semantic(out: any, f: any): any {
  if (f.expected.required_reason_codes) {
    const e = f.expected;
    return {
      execution: out.execution,
      refusal_kind: out.refusal?.refusal_kind,
      output_type: out.refusal?.output_type,
      schema: out.refusal?.$schema,
      required_reason_codes: e.required_reason_codes.filter((c: string) =>
        out.refusal?.reason_codes?.includes(c),
      ),
      report_present: "report" in out,
      external_check_results_present: [out, out.refusal ?? {}].some((x: any) =>
        ["conformance", "verification_results", "quantity_evidence"].some((k) => k in x),
      ),
      exit_code: exitCode(out),
    };
  }
  if (out.execution !== "completed")
    return { execution: out.execution, reason: out.refusal?.reason_codes?.[0] };
  const p = out.report;
  const e: any = {
    execution: "completed",
    conformance: p.conformance.outcome,
    profile_eligibility: p.profile_eligibility,
    checks: p.verification_results.map((c: any) =>
      c.execution === "completed" ? "completed/" + c.outcome : c.execution,
    ),
    reasons: p.verification_results.map((c: any) => c.reason_codes),
    quantities: (p.quantity_evidence?.quantity_results ?? []).map((q: any, i: number) => ({
      identity: {
        quantity: q.quantity,
        ...(q.cell_id ? { cell_id: q.cell_id } : {}),
        ...(q.contrast_kind ? { contrast_kind: q.contrast_kind } : {}),
      },
      expected_code: code(q.recomputed, i),
      outcome: q.outcome,
      reason: q.reason_codes[0] ?? null,
    })),
  };
  if (p.conformance.outcome === "fail") e.conformance_reason = p.conformance.reason_codes[0];
  return e;
}
let passed = 0;
try {
  for (const f of fixtures) {
    let calls = 0;
    numerical = undefined;
    const actual = await evaluate(f.raw, (packet) => {
      calls++;
      return invoke(packet);
    });
    const got = semantic(actual, f);
    const issues: string[] = [];
    if (!isDeepStrictEqual(got, f.expected))
      issues.push("independent semantic expectation differs");
    if (!validateFinal(actual, actual.execution === "completed" ? f.raw : undefined))
      issues.push("candidate output not valid");
    if (f.category === "D" && calls !== 0)
      issues.push("structural/admissibility fixture reached numerical core");
    if (
      actual.report &&
      Object.values(actual.report.guarantee_boundary).some((v) => v !== "not_asserted")
    )
      issues.push("guarantee boundary");
    // Cost is private numeric audit data; delivered public report does not expose it.
    const numeric = numerical?.numerical ?? numerical;
    if (
      f.ledger &&
      numeric?.cost !== undefined &&
      numeric.cost !== null &&
      String(numeric.cost) !== f.ledger.C
    )
      issues.push("independent J-cost differs");
    const row = {
      id: f.id,
      mode,
      core_optimize: calls ? seenMode : null,
      python_version: calls ? pythonVersion : null,
      platform: process.platform,
      freeze_sha256: freeze,
      input_sha256: f.input_sha256,
      numerical_calls: calls,
      delivered: actual,
      actual: got,
      issues,
      result: issues.length ? "MISMATCH" : "PASS",
      ...(issues.length ? { expected: f.expected, sources: f.claims, raw_candidate: actual } : {}),
    };
    appendFileSync(output, JSON.stringify(row) + "\n");
    if (issues.length) {
      console.error(JSON.stringify({ id: f.id, issues, expected: f.expected, actual: got }));
      process.exitCode = 1;
      break;
    }
    passed++;
    if (passed % 20 === 0) console.log(JSON.stringify({ mode, passed }));
  }
} finally {
  child.stdin.end();
}
console.log(
  JSON.stringify({
    mode,
    passed,
    planned: fixtures.length,
    freeze_sha256: freeze,
    python_version: pythonVersion,
    actual_optimize: seenMode,
    result: passed === fixtures.length ? "PASS" : "MISMATCH",
  }),
);
