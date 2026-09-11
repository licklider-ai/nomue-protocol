// Isolated whole-call admission/resource probes; no portable performance claim.
import { performance } from "node:perf_hooks";
import crypto from "node:crypto";
const start = performance.now();
const { checkWithRunner, runWorker, Refusal, boundedNodes, resourceMetrics } =
  await import("./bridge.mjs");
const { fixture, texts, sync } = await import("./fixtures.mjs");
const name = process.argv[2],
  optimized = process.argv.includes("--optimized");
let f;
if (name === "baseline") f = fixture();
else if (name === "max-family") f = fixture(16, 16, 1);
else if (name === "large-admitted") f = fixture(16, 256, 16);
else if (name === "max-count-refusal") f = fixture(16, 1024, 16);
else if (name === "wide-strings") {
  f = fixture(16, 256, 16);
  for (const a of f.d.analyses) a.assumption_statements = Array(8).fill("x".repeat(4096));
  sync(f);
} else if (name === "origin-long") {
  f = fixture(16, 256, 16);
  f.expected.revision = "R".repeat(64);
  f.expected.members.forEach((m, i) => {
    m.origin.source_id = "S".repeat(64);
    m.origin.hypothesis_id = ("H" + i).padEnd(64, "x");
  });
  sync(f);
} else throw Error("unknown probe");
const t = texts(f);
let launches = 0,
  decision;
try {
  const r = await checkWithRunner(t, (c) => {
    launches++;
    return runWorker(c, optimized);
  });
  decision = r.outcome;
} catch (e) {
  if (!(e instanceof Refusal)) throw e;
  decision = e.reason;
}
const expected =
  name === "max-count-refusal"
    ? "document nodes"
    : "declaration_bound_supplied_p_arithmetic_consistent";
if (decision !== expected || launches !== (name === "max-count-refusal" ? 0 : 1))
  throw Error("probe decision: " + decision);
const count = (x) => boundedNodes(x, 1000000);
console.log(
  JSON.stringify({
    ...resourceMetrics(),
    name,
    decision,
    launches,
    node_counts: [f.d, f.expected, f.submitted].map(count),
    text_bytes: t.map((x) => Buffer.byteLength(x)),
    input_sha256: t.map((x) => crypto.createHash("sha256").update(x).digest("hex")),
    elapsed_seconds: (performance.now() - start) / 1000,
  }),
);
