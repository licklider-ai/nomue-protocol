// Check the public projection of actual CI receipts, including failed calls and trusted probes.
import fs from "node:fs";
import assert from "node:assert/strict";
import { publishReceipt, validatePublic } from "./public.mjs";
const data = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
assert.equal(data.cgroup_tests, "RUN");
assert.equal(data.passed, data.controls);
const receipts = [];
function walk(value) {
  if (!value || typeof value !== "object") return;
  if (value.kind === "unissued-controlled-execution") receipts.push(value);
  else for (const child of Object.values(value)) walk(child);
}
walk(data.rows);
let forwarded = 0;
for (const receipt of receipts) {
  const r = await publishReceipt(receipt);
  assert.ok(await validatePublic(r.output));
  if (receipt.category !== "completed_valid" || receipt.result?.output?.kind === "trusted-probe") {
    assert.equal(r.output.output_type, "nomue-verifier-refusal");
    assert.equal(r.verified_record_base64, undefined);
  }
  if (r.verified_record_base64) {
    forwarded++;
    assert.equal(r.verified_record_base64, receipt.result.verified_record_base64);
    assert.ok(r.output.checks.every((c) => c.execution === "completed" && c.outcome === "pass"));
  }
}
assert.ok(receipts.length >= 25);
assert.equal(forwarded, 5); // baseline, maximum, large, six variants, unaffected sibling
const result = {
  receipts: receipts.length,
  original_byte_forwards: forwarded,
  all_public_outputs_valid: true,
};
fs.writeFileSync("candidate-public-receipts.json", JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
