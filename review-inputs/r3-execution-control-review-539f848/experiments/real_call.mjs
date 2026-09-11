// One real envelope verification (real isolated Python worker) using the packet's own example files.
// Run from the repository root with NOMUE_EXPERIMENT_PYTHON set to an absolute Python 3 path.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const dir = path.join(
  root,
  "governance/drafts/release-3-preparation/holm-envelope-experiment-20260911/",
);
const { verify } = await import(path.join(dir, "envelope.mjs"));
const rec = fs.readFileSync(path.join(dir, "example-record.jcs"));
const exp = fs.readFileSync(path.join(dir, "example-expected.json"), "utf8");
const t0 = performance.now();
const r = await verify(exp, rec);
console.log(
  JSON.stringify({
    kind: r.output.kind,
    checks: r.output.checks?.map((c) => [c.stage, c.execution, c.outcome ?? null]),
    reason: r.output.reason ?? null,
    forwarded: !!r.verified_bytes,
    ms: Math.round(performance.now() - t0),
  }),
);
