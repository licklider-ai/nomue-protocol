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
