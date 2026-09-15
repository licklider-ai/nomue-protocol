/** UNISSUED CANDIDATE. Focused refusal regression against pre-repair B freeze. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluate,
  exitCode,
  validateFinal,
} from "../t09-check-report-lifecycle-20260915/report.js";
import { CanonicalizationError } from "../../../../reference/verifier/src/digest.js";
const here = dirname(fileURLToPath(import.meta.url));
const fixtures = readFileSync(
  resolve(here, "../t10-independent-expectation-corpus-revision-2-20260915/corpus/fixtures.jsonl"),
  "utf8",
)
  .trim()
  .split("\n")
  .map((s) => JSON.parse(s));
const rows: any[] = [];
for (const name of [
  "structure/overflow-number",
  "structure/negative-zero",
  "structure/duplicate-member",
  "structure/unpaired-surrogate",
  "structure/malformed-json",
  "structure/missing-n",
  "structure/false-model",
]) {
  const f = fixtures.find((f) => f.id === name);
  let calls = 0;
  const actual = await evaluate(f.raw, async () => {
    calls++;
    throw Error("unexpected core invocation");
  });
  assert.equal(calls, 0);
  assert.ok(validateFinal(actual));
  if (name === "structure/overflow-number") {
    const e = f.expected;
    assert.equal(actual.execution, e.execution);
    assert.equal(actual.refusal.refusal_kind, e.refusal_kind);
    assert.equal(actual.refusal.output_type, e.output_type);
    assert.equal(actual.refusal.$schema, e.schema);
    assert.equal(exitCode(actual), e.exit_code);
    for (const code of e.required_reason_codes)
      assert.ok(actual.refusal.reason_codes.includes(code));
    assert.ok(!("report" in actual));
    assert.ok(!("verification_results" in actual.refusal));
  } else if (f.expected.execution === "execution_refusal") {
    assert.equal(actual.execution, "execution_refusal");
    assert.ok(actual.refusal.reason_codes.includes(f.expected.reason));
  } else {
    assert.equal(actual.execution, "completed");
    assert.equal(actual.report.conformance.outcome, f.expected.conformance);
    assert.deepEqual(
      actual.report.verification_results.map((c: any) =>
        c.execution === "completed" ? "completed/" + c.outcome : c.execution,
      ),
      f.expected.checks,
    );
  }
  rows.push({
    id: name,
    numerical_calls: calls,
    execution: actual.execution,
    refusal_kind: actual.refusal?.refusal_kind ?? null,
    reason_codes: actual.refusal?.reason_codes ?? null,
    report_present: "report" in actual,
    exit_code: exitCode(actual),
    result: "PASS",
  });
}
// A transport failure, even of this Error class, is outside report canonicalization.
for (const error of [Error("transport failure"), new CanonicalizationError("transport boundary")]) {
  const f = fixtures.find((f) => f.id === "g5/ordinary_dyadic_n3");
  let calls = 0;
  const actual = await evaluate(f.raw, async () => {
    calls++;
    throw error;
  });
  assert.equal(calls, 1);
  assert.equal(actual.refusal.refusal_kind, "internal_error");
  assert.equal(exitCode(actual), 5);
  rows.push({
    id: "transport-" + error.name,
    numerical_calls: calls,
    report_present: false,
    refusal_kind: actual.refusal.refusal_kind,
    result: "PASS",
  });
}
console.log(
  JSON.stringify({
    status: "UNISSUED CANDIDATE",
    expectation_commit: "c262931584bbdac0018ffdef59a9b5a186b7cc5c",
    rows,
    result: "PASS",
  }),
);
