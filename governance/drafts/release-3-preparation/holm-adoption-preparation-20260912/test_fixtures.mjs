import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { verify } from "../holm-separated-candidate-20260912/envelope.mjs";
import {
  publishReceipt,
  validatePublic,
  flattenChecks,
} from "../holm-separated-candidate-20260912/public.mjs";
const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(here, "FIXTURES.json")));
const rows = [];
for (const f of manifest.fixtures) {
  const raw = fs.readFileSync(path.join(here, f.record)),
    expected = fs.readFileSync(path.join(here, f.expected_context));
  assert.equal(crypto.createHash("sha256").update(raw).digest("hex"), f.record_sha256);
  assert.equal(
    crypto.createHash("sha256").update(expected).digest("hex"),
    f.expected_context_sha256,
  );
  const r = await verify(expected.toString("utf8"), raw);
  const result = await publishReceipt({
    category: "completed_valid",
    causes: {},
    result: {
      output: r.output,
      ...(r.verified_bytes ? { verified_record_base64: r.verified_bytes.toString("base64") } : {}),
    },
  });
  assert.ok(await validatePublic(result.output), f.fixture_id);
  assert.equal(Object.hasOwn(result, "verified_record_base64"), f.expected.forward, f.fixture_id);
  if (f.expected.forward) assert.equal(result.verified_record_base64, raw.toString("base64"));
  if (f.expected.kind === "report") {
    assert.equal(result.output.report_type, "nomue-verification-report");
    const checks = flattenChecks(result.output);
    assert.deepEqual(
      checks.map((c) => (c.execution === "completed" ? c.outcome : c.execution)),
      f.expected.stages,
      f.fixture_id,
    );
    assert.deepEqual(
      checks.map((c) => c.reason_codes),
      f.expected.reasons,
      f.fixture_id,
    );
  } else {
    assert.equal(result.output.output_type, "nomue-verifier-refusal");
    assert.deepEqual(result.output.reason_codes, [f.expected.reason], f.fixture_id);
  }
  rows.push({ fixture_id: f.fixture_id, pass: true });
}
const result = { status: "PASS_FOR_FIXED_PREEXECUTION_EXPECTATIONS", fixtures: rows.length, rows };
if (process.env.NOMUE_TEST_OUTPUT) {
  fs.mkdirSync(process.env.NOMUE_TEST_OUTPUT, { recursive: true });
  fs.writeFileSync(
    path.join(process.env.NOMUE_TEST_OUTPUT, "FIXTURE-RESULTS.json"),
    JSON.stringify(result, null, 2) + "\n",
  );
}
console.log(JSON.stringify(result));
