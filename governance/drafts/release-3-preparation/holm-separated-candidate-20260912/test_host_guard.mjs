// Actual unsupported runtime, not a mocked version string. No fixture writes.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
const here = path.dirname(fileURLToPath(import.meta.url));
const node = process.env.NOMUE_UNSUPPORTED_NODE;
assert.ok(
  node && path.isAbsolute(node),
  "NOMUE_UNSUPPORTED_NODE requires an actual Node 22 executable",
);
const version = spawnSync(node, ["--version"], { encoding: "utf8", timeout: 10000 });
assert.equal(version.status, 0);
assert.match(version.stdout.trim(), /^v22\./);
const run = (entry) =>
  spawnSync(node, [entry, "/absent-record", "/absent-expected"], {
    encoding: "utf8",
    timeout: 10000,
    env: { PATH: "/usr/bin:/bin" },
  });
const want = (r) => {
  assert.equal(r.status, 78, r.stderr);
  assert.equal(r.stdout, "");
  assert.equal(r.stderr, "");
};
want(run(path.join(here, "entry.mjs")));
want(run(path.join(here, "probes.mjs")));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "nomue-host-guard-"));
try {
  // No runtime dependencies exist here: they must not be resolved before exit 78.
  const copy = path.join(temp, "entry.mjs");
  const source = fs.readFileSync(path.join(here, "entry.mjs"), "utf8");
  fs.writeFileSync(copy, source);
  want(run(copy));
  // Restore the offending static import in an isolated copy: the control must fail.
  fs.writeFileSync(
    copy,
    source.replace(
      'const { verify, validateOutput, CAPS, IDS } = await import("./envelope.mjs");',
      'import { verify, validateOutput, CAPS, IDS } from "./envelope.mjs";',
    ),
  );
  const broken = run(copy);
  assert.notEqual(broken.status, 78);
  assert.match(broken.stderr, /ERR_MODULE_NOT_FOUND/);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
const result = {
  node: version.stdout.trim(),
  direct_entries: 2,
  isolated_guard: true,
  static_import_mutation_rejected: true,
};
const at = process.argv.indexOf("--delegation");
if (at !== -1) {
  const python = process.env.NOMUE_EXPERIMENT_PYTHON;
  assert.ok(python && path.isAbsolute(python));
  const r = spawnSync(
    python,
    [
      "-I",
      path.join(here, "supervisor.py"),
      "--delegation",
      process.argv[at + 1],
      "--node",
      node,
      "--python",
      python,
      "/absent-record",
      "/absent-expected",
    ],
    { encoding: "utf8", timeout: 30000 },
  );
  assert.equal(r.status, 0, r.stderr);
  const receipt = JSON.parse(r.stdout);
  assert.equal(receipt.category, "unsupported_host");
  assert.equal(receipt.evidence.leader_exit, 78);
  assert.equal(receipt.result, undefined);
  for (const key of ["stdout", "stderr"]) assert.equal(receipt.evidence.bytes_observed[key], 0);
  assert.deepEqual(receipt.evidence.cleanup, {
    populated_zero: true,
    echild: true,
    cgroup_removed: true,
    temporary_removed: true,
  });
  assert.equal(fs.existsSync(receipt.evidence.temporary), false);
  assert.equal(fs.existsSync(receipt.evidence.leaf), false);
  const { publishReceipt } = await import("./public.mjs");
  const publicResult = await publishReceipt(receipt);
  assert.equal(publicResult.output.output_type, "nomue-verifier-refusal");
  assert.deepEqual(publicResult.output.reason_codes, ["candidate:holm:unsupported_host"]);
  assert.equal(publicResult.verified_record_base64, undefined);
  result.receipt = receipt;
  result.public_output = publicResult.output;
}
const out = process.argv.indexOf("--output");
if (out !== -1) fs.writeFileSync(process.argv[out + 1], JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
