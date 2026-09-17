/** UNISSUED CANDIDATE. Bounded diagnosis of the frozen overflow mismatch. */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateRecord } from "../t07-closed-schemas-validator-20260915/validator.js";
import { evaluate } from "../t09-check-report-lifecycle-20260915/report.js";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.js";
import { recomputeContentDigest } from "../../../../reference/verifier/src/digest.js";
const here = dirname(fileURLToPath(import.meta.url));
const f = readFileSync(resolve(here, "corpus/fixtures.jsonl"), "utf8")
  .trim()
  .split("\n")
  .map((s) => JSON.parse(s))
  .find((f) => f.id === "structure/overflow-number");
let calls = 0;
let error = "";
try {
  recomputeContentDigest(parseStrictJson(f.raw) as any);
} catch (e) {
  error = e instanceof Error ? e.message : String(e);
}
const actual = await evaluate(f.raw, async () => {
  calls++;
  throw Error("unexpected numerical execution");
});
console.log(
  JSON.stringify(
    {
      id: f.id,
      input_sha256: f.input_sha256,
      input_contains_1e400: f.raw.includes("1e400"),
      t07: validateRecord(f.raw),
      canonicalization_error: error,
      numerical_calls: calls,
      actual,
      expected: f.expected,
      diagnosis:
        "Structural rejection precedes report assembly; reportBase recomputes a JCS digest of the rejected nonfinite input; the exception becomes internal verifier error. No numerical core or mode-dependent arithmetic is reached.",
    },
    null,
    2,
  ),
);
