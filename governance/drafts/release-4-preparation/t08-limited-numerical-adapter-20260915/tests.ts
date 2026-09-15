/** UNISSUED CANDIDATE. Limited adapter integration, not production supervision. */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { adapt, prepareRecord, serializePrepared, bindNumericalResult } from "./adapter.js";
const here = dirname(fileURLToPath(import.meta.url));
const metadata = (name: string) => JSON.parse(readFileSync(resolve(here, name), "utf8"));
const mode = process.argv.includes("--optimized") ? 1 : 0;
const child = spawn(
  "python",
  [...(mode ? ["-O"] : []), "-B", resolve(here, "numerical_bridge.py")],
  { stdio: ["pipe", "pipe", "pipe"], windowsHide: true },
);
let pythonVersion = "";
let stderr = "";
child.stderr.on("data", (x) => {
  stderr += x.toString();
});
let pending: { resolve: (x: any) => void; reject: (e: Error) => void } | undefined;
const lines = createInterface({ input: child.stdout });
lines.on("line", (line) => {
  try {
    const x = JSON.parse(line);
    assert.equal(x.python_optimize, mode);
    pythonVersion = x.python_version;
    pending?.resolve(x);
  } catch (e) {
    pending?.reject(e as Error);
  }
  pending = undefined;
});
child.on("error", (e) => pending?.reject(e));
child.on("exit", (code) => {
  if (pending) pending.reject(new Error("bridge exit " + code + ": " + stderr));
});
const invoke = (packet: string): Promise<any> =>
  new Promise((resolve, reject) => {
    assert.equal(pending, undefined);
    pending = { resolve, reject };
    child.stdin.write(packet + "\n");
  });
const fixtures = metadata("fixtures/cases.json").cases;
const results: any[] = [];
let assertions = 0;
const check = (ok: unknown, msg: string) => {
  assert.ok(ok, msg);
  assertions++;
};
const projection = (x: any) =>
  JSON.stringify({
    gate: x.numerical.gate,
    cost: x.numerical.cost,
    membership: x.numerical.membership,
    recomputation: x.numerical.recomputation,
    quantities: x.numerical.quantities,
    quantity_evidence: x.quantity_evidence,
  });
try {
  for (const f of fixtures) {
    const result = await adapt(JSON.stringify(f.record), invoke);
    check(!!result.numerical, f.id + ": no numerical result " + JSON.stringify(result));
    const n = result.numerical;
    check(n.gate === f.expected.gate, f.id + ": gate");
    check(n.cost === f.expected.cost, f.id + ": cost");
    if (n.gate === "eligible") {
      check(
        n.quantities.length === 22 && result.quantity_evidence.quantity_results.length === 22,
        f.id + ": 22 quantities",
      );
      check(
        JSON.stringify(n.quantities.map((q: any) => q.projected)) ===
          JSON.stringify(f.expected.target_codes),
        f.id + ": frozen independent expected codes",
      );
      check(
        JSON.stringify(
          n.quantities.flatMap((q: any, i: number) => (q.outcome === "fail" ? [i] : [])),
        ) === JSON.stringify(f.expected.mismatches),
        f.id + ": mismatches",
      );
      check(
        n.recomputation === (f.expected.mismatches.length ? "completed/fail" : "completed/pass"),
        f.id + ": aggregate",
      );
    } else {
      check(
        n.recomputation === "not_run" &&
          result.quantity_evidence === null &&
          n.quantities.every((q: any) => q.outcome === "not_run"),
        f.id + ": gate dependency",
      );
    }
    check(!("integrity" in n), f.id + ": no uncomputed integrity claim");
    results.push({
      id: f.id,
      gate: n.gate,
      cost: n.cost,
      recomputation: n.recomputation,
      mismatches: f.expected.mismatches,
      compact_evidence_sha256: n.compact_evidence_sha256 ?? null,
    });
  }
  const f = fixtures.find((x: any) => x.id === "ordinary_dyadic_n3");
  const base = await adapt(JSON.stringify(f.record), invoke);
  for (let i = 0; i < 3; i++)
    check(
      projection(await adapt(JSON.stringify(f.record), invoke)) === projection(base),
      "deterministic rerun",
    );
  const permuted = structuredClone(f.record);
  permuted.payload.dataset.observations.reverse();
  permuted.payload.design.cells.reverse();
  permuted.payload.design.factors.reverse();
  permuted.payload.result.cell_summaries.reverse();
  permuted.payload.result.contrasts.reverse();
  const other = await adapt(JSON.stringify(permuted), invoke);
  check(projection(other) === projection(base), "unordered arrays preserve numerical result");
  check(
    other.context.transport_sha256 !== base.context.transport_sha256,
    "content binding distinguishes representation, not numerical meaning",
  );
  const reversedKeys = (x: any): any =>
    Array.isArray(x)
      ? x.map(reversedKeys)
      : x && typeof x === "object"
        ? Object.fromEntries(
            Object.keys(x)
              .reverse()
              .map((k) => [k, reversedKeys(x[k])]),
          )
        : x;
  check(
    projection(await adapt(JSON.stringify(reversedKeys(f.record)), invoke)) === projection(base),
    "object key order",
  );
  let calls = 0;
  const blocked = await adapt(JSON.stringify({ ...f.record, profile_id: "wrong" }), async () => {
    calls++;
    throw Error("must not call");
  });
  check(calls === 0 && blocked.stage === "T07", "schema blocks transport");
  let forged = false;
  try {
    serializePrepared({ packet: "{}", rawRecord: "{}" });
  } catch {
    forged = true;
  }
  check(forged, "no forged prepared token");
  const token = prepareRecord(JSON.stringify(f.record));
  check(token.accepted, "prepared token");
  if (token.accepted) {
    const core = await invoke(serializePrepared(token.value));
    core.context.revision_id = "urn:wrong:revision";
    let rejected = false;
    try {
      bindNumericalResult(token.value, core);
    } catch {
      rejected = true;
    }
    check(rejected, "no other-revision evidence reuse");
  }
  const genericToken = prepareRecord(JSON.stringify(f.record));
  if (genericToken.accepted) {
    const actual = await invoke(serializePrepared(genericToken.value));
    const synthetic = structuredClone(actual);
    synthetic.numerical.quantities[0].outcome = "indeterminate";
    delete synthetic.numerical.quantities[0].projected;
    synthetic.numerical.recomputation = "completed/indeterminate";
    const bound = bindNumericalResult(genericToken.value, synthetic);
    check(
      bound.numerical.recomputation === "completed/indeterminate" &&
        bound.quantity_evidence === null,
      "generic unresolved preserved with T09 reason binding deferred",
    );
    for (const key of ["check_version", "numerical_commit", "transport_sha256"]) {
      const wrong = structuredClone(actual);
      wrong.context[key] = "wrong";
      let rejected = false;
      try {
        bindNumericalResult(genericToken.value, wrong);
      } catch {
        rejected = true;
      }
      check(rejected, "evidence binding: " + key);
    }
    const classified = await adapt(JSON.stringify(f.record), async () => {
      const wrong = structuredClone(actual);
      wrong.context.check_version = "wrong";
      return wrong;
    });
    check(
      classified.error_type === "adapter_invariant" && classified.numerical === null,
      "adapter defect separate from transport failure",
    );
    const bad = structuredClone(actual);
    bad.numerical.quantities.reverse();
    let rejected = false;
    try {
      bindNumericalResult(genericToken.value, bad);
    } catch {
      rejected = true;
    }
    check(rejected, "wrong core ordinal identity rejected");
  }
  const error = await adapt(JSON.stringify(f.record), async () => {
    throw Error("synthetic transport unavailable");
  });
  check(
    error.execution === "error" && error.numerical === null && error.error_type === "transport",
    "transport failure is not public refusal or numerical fail",
  );
  const t07 = metadata("../t07-closed-schemas-validator-20260915/fixtures/cases.json").cases.filter(
    (x: any) => x.kind === "record",
  );
  let accepted = 0,
    rejected = 0;
  for (const test of t07) {
    let called = false;
    const result = await adapt(test.raw, async (p) => {
      called = true;
      return invoke(p);
    });
    if (test.expected.category === "accepted") {
      check(called && result.stage !== "T07", test.name + ": T07 accepted handoff");
      accepted++;
    } else {
      check(!called && result.stage === "T07", test.name + ": T07 rejected before core");
      rejected++;
    }
  }
  const summary = {
    status: "UNISSUED CANDIDATE",
    mode: mode ? "optimized" : "normal",
    python_optimize: mode,
    python: pythonVersion,
    node: process.version,
    assertions,
    fixtures: results,
    t07: { accepted, rejected },
    result: "PASS",
    limits:
      "Local research bridge only; no Linux/CPython 3.12.14 supervisor or production enforcement claim",
  };
  console.log(JSON.stringify({ ...summary, fixtures: results.length }));
  const save = process.argv.indexOf("--save");
  if (save >= 0)
    writeFileSync(resolve(here, process.argv[save + 1]), JSON.stringify(summary, null, 2) + "\n");
} finally {
  child.stdin.end();
}
