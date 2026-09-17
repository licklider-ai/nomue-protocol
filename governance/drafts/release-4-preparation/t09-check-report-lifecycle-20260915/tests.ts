/** UNISSUED CANDIDATE. Integration and mutation checks, fixed G5 expectations. */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluate, assemble, validateFinal, exitCode, refusal, profile } from "./report.js";
import { validateRecord } from "../t07-closed-schemas-validator-20260915/validator.js";
import {
  prepareRecord,
  serializePrepared,
  bindNumericalResult,
} from "../t08-limited-numerical-adapter-20260915/adapter.js";
const here = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => JSON.parse(readFileSync(resolve(here, p), "utf8"));
const mode = process.argv.includes("--optimized") ? 1 : 0;
const child = spawn(
  "python",
  [
    ...(mode ? ["-O"] : []),
    "-B",
    resolve(here, "../t08-limited-numerical-adapter-20260915/numerical_bridge.py"),
  ],
  { stdio: ["pipe", "pipe", "pipe"], windowsHide: true },
);
let pending: any;
let version = "";
let stderr = "";
child.stderr.on("data", (b) => (stderr += b));
createInterface({ input: child.stdout }).on("line", (line) => {
  try {
    const x = JSON.parse(line);
    assert.equal(x.python_optimize, mode);
    version = x.python_version;
    pending.resolve(x);
  } catch (e) {
    pending.reject(e);
  }
  pending = undefined;
});
child.on("error", (e) => pending?.reject(e));
child.on("exit", (c) => pending?.reject(Error(String(c) + stderr)));
const invoke = (packet: string): Promise<any> =>
  new Promise((resolveResult, reject) => {
    assert.equal(pending, undefined);
    pending = { resolve: resolveResult, reject };
    child.stdin.write(packet + "\n");
  });
let assertions = 0;
const check = (x: unknown, s: string) => {
  assert.ok(x, s);
  assertions++;
};
const rows: any[] = [];
try {
  const fixtures = read("../t08-limited-numerical-adapter-20260915/fixtures/cases.json").cases;
  for (const f of fixtures) {
    const raw = JSON.stringify(f.record);
    const out = await evaluate(raw, invoke);
    check(validateFinal(out, raw), f.id + ": valid final");
    check(out.execution === "completed", f.id + ": completed pipeline " + JSON.stringify(out));
    const r = out.report;
    const rc = r.verification_results[3];
    if (f.expected.gate === "eligible") {
      check(
        rc.execution === "completed" &&
          rc.outcome === (f.expected.mismatches.length ? "fail" : "pass"),
        f.id + ": unchanged aggregate",
      );
      check(r.quantity_evidence.quantity_results.length === 22, f.id + ": full quantity binding");
    } else
      check(
        rc.execution === "not_run" && !r.quantity_evidence,
        f.id + ": no partial gated results",
      );
    rows.push({
      id: f.id,
      execution: rc.execution,
      outcome: rc.outcome ?? null,
      reasons: rc.reason_codes,
    });
  }
  const base = fixtures.find((x: any) => x.id === "ordinary_dyadic_n3");
  const raw = JSON.stringify(base.record);
  const pass = await evaluate(raw, invoke);
  check(exitCode(pass) === 0, "pass exit");
  check(JSON.stringify(await evaluate(raw, invoke)) === JSON.stringify(pass), "repeat determinism");
  const reverse = (x: any): any =>
    Array.isArray(x)
      ? x.map(reverse)
      : x && typeof x === "object"
        ? Object.fromEntries(
            Object.keys(x)
              .reverse()
              .map((k) => [k, reverse(x[k])]),
          )
        : x;
  check(validateFinal(reverse(pass), raw), "report object ordering");
  check(
    JSON.stringify(await evaluate(JSON.stringify(reverse(base.record)), invoke)) ===
      JSON.stringify(pass),
    "input key ordering",
  );
  const mutators: Record<string, (x: any) => void> = {
    unknown: (x) => (x.report.extra = 1),
    wrong_version: (x) => (x.report.verification_results[3].check_version = "wrong"),
    wrong_revision: (x) => (x.report.record_reference.revision_id = "urn:wrong"),
    missing_quantity: (x) => x.report.quantity_evidence.quantity_results.pop(),
    duplicate_quantity: (x) =>
      (x.report.quantity_evidence.quantity_results[1] =
        x.report.quantity_evidence.quantity_results[0]),
    reason_contradiction: (x) =>
      (x.report.verification_results[3].reason_codes = ["NRS-DECLARED-RESULT-MISMATCH"]),
    pass_mismatch: (x) => {
      const q = x.report.quantity_evidence.quantity_results[0];
      q.outcome = "fail";
      q.reason_codes = ["NRS-DECLARED-RESULT-MISMATCH"];
    },
    failed_with_report: (x) => (x.execution = "execution_refusal"),
    unknown_reason: (x) => (x.report.verification_results[0].reason_codes = ["NRS-NOT-A-REASON"]),
    wrong_eligibility: (x) => (x.report.profile_eligibility = "ineligible"),
    wrong_core: (x) => (x.provenance.numerical_commit = "wrong"),
    duplicate_check: (x) => (x.report.verification_results[3] = x.report.verification_results[0]),
  };
  for (const [name, fn] of Object.entries(mutators)) {
    const m = structuredClone(pass);
    fn(m);
    check(!validateFinal(m, raw), "mutation rejected: " + name);
  }
  const wrongRefusal = refusal("NRS-PARSE-FAILED", 1);
  wrongRefusal.refusal.refusal_kind = "resource_limit";
  check(!validateFinal(wrongRefusal), "invalid refusal combination");
  const token = prepareRecord(raw);
  assert.ok(token.accepted);
  const actual = await invoke(serializePrepared(token.value));
  for (const mixed of [false, true]) {
    const x = structuredClone(actual);
    x.numerical.quantities[5].outcome = "indeterminate";
    delete x.numerical.quantities[5].projected;
    if (mixed) {
      x.numerical.quantities[6].outcome = "fail";
      delete x.numerical.quantities[6].projected;
    }
    x.numerical.recomputation = mixed ? "completed/fail" : "completed/indeterminate";
    const result = assemble(raw, validateRecord(raw), bindNumericalResult(token.value, x));
    check(validateFinal(result, raw), "generic unresolved encoding");
    check(exitCode(result) === (mixed ? 2 : 6), "fail priority / unresolved non-success");
  }
  let accepted = 0,
    rejected = 0;
  for (const f of read("../t07-closed-schemas-validator-20260915/fixtures/cases.json").cases.filter(
    (x: any) => x.kind === "record",
  )) {
    let called = false;
    const r = await evaluate(f.raw, async (p) => {
      called = true;
      return invoke(p);
    });
    check(validateFinal(r, f.raw), f.name + ": closed output");
    if (f.expected.category === "accepted") {
      check(called, f.name + ": T08 called");
      accepted++;
    } else {
      check(!called, f.name + ": no T08 bypass");
      rejected++;
    }
  }
  const oversize = await evaluate(" ".repeat(profile.raw_bytes + 1), invoke);
  check(
    oversize.refusal.reason_codes[0] === "NRS-FILE-SIZE-LIMIT-EXCEEDED",
    "raw bound separate from J-cost",
  );
  const error = await evaluate(raw, async () => {
    throw Error("worker failure");
  });
  check(error.execution === "execution_refusal" && !error.report, "execution suppresses report");
  const summary = {
    status: "UNISSUED CANDIDATE",
    mode,
    python: version,
    node: process.version,
    assertions,
    t07: { accepted, rejected },
    fixtures: rows,
    mutations: Object.keys(mutators).length + 1,
    generic_unresolved_controls: 2,
    result: "PASS",
    boundary: "Report integration only; resource enforcement is separately tested in Linux",
  };
  const save = process.argv.indexOf("--save");
  if (save >= 0 && mode === 0)
    writeFileSync(resolve(here, "fixtures/pass-report.json"), JSON.stringify(pass, null, 2) + "\n");
  if (save >= 0)
    writeFileSync(resolve(here, process.argv[save + 1]), JSON.stringify(summary, null, 2) + "\n");
  console.log(JSON.stringify({ ...summary, fixtures: rows.length }));
} finally {
  child.stdin.end();
}
