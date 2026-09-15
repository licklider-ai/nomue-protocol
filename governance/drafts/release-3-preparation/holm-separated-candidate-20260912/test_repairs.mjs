import assert from "node:assert/strict";
import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import { transport } from "./entry.mjs";
import { publishReceipt } from "./public.mjs";
const record = fs.readFileSync(new URL("example-record.jcs", import.meta.url));
const r = JSON.parse(
  await transport("record", "expected", {
    read: (name) => (name === "record" ? record : Buffer.from([255])),
  }),
);
assert.equal(r.output.reason, "expected_utf8");
const p = await publishReceipt({ category: "completed_valid", causes: {}, result: r });
const schema = new Ajv2020({ strict: false }).compile(
  JSON.parse(fs.readFileSync(new URL("refusal.schema.json", import.meta.url))),
);
assert.ok(schema(p.output));
const wrong = structuredClone(p.output);
wrong.stage = "processing";
assert.equal(schema(wrong), false);
assert.ok(p.output.reason_codes.every((code) => code.startsWith("candidate:holm:")));
console.log("UTF-8, schema combination and local vocabulary checks passed");

// Final transport policy preserves ingress refusals, but invalidates late routing output.
const { createBudget } = await import("./budget.mjs");
for (const [bytes, expected] of [
  [Buffer.from('{"interpretation_bundle_id":"urn:unsupported"}'), "processing_timeout"],
  [Buffer.from('{"x":1,"x":2}'), "record_duplicate_member"],
]) {
  let time = 0;
  const budget = createBudget({
    now: () => time,
    heapUsedBytes: () => 0,
    onCheckpoint: (name) => {
      if (name === "transport") time = 5001;
    },
  });
  const out = JSON.parse(await transport("record", "expected", { budget, read: () => bytes }));
  assert.equal(out.output.reason, expected);
  assert.equal(out.verified_record_base64, undefined);
}
console.log("Late routing and ingress transport precedence checked");
