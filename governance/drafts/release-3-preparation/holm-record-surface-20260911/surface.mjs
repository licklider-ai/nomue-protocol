// Disposable surface experiment. No registered Record, check, bundle or public API.
import fs from "node:fs";
import crypto from "node:crypto";
import Ajv2020 from "ajv/dist/2020.js";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.ts";
import { jcsCanonicalize } from "../../../../reference/verifier/src/jcs.ts";
const ajv = new Ajv2020({ strict: false, allErrors: false });
const schema = (name) =>
  ajv.compile(JSON.parse(fs.readFileSync(new URL(name, import.meta.url), "utf8")));
export const validateRecord = schema("./record-body.schema.json");
export const validateExpected = schema("./expected-context.schema.json");
export const validateReport = schema("./report-body.schema.json");
const U = 1n << 1074n;
export const CAPS = Object.freeze({
  expectedBytes: 1572864,
  recordBytes: 2097152,
  depth: 34,
  nodes: 28688,
});
class SurfaceInput extends Error {}
class ContextMismatch extends Error {}
function need(ok, message) {
  if (!ok) throw new SurfaceInput(message);
}
// Only parsed JSON values enter this traversal; arbitrary objects are not accepted.
function bound(text) {
  let depth = 0,
    quoted = false,
    escaped = false;
  for (const ch of text) {
    if (quoted) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') quoted = false;
    } else if (ch === '"') quoted = true;
    else if (ch === "{" || ch === "[") need(++depth <= CAPS.depth, "depth");
    else if (ch === "}" || ch === "]") depth--;
  }
}
function parse(text) {
  bound(text);
  let value;
  try {
    value = parseStrictJson(text);
  } catch {
    throw new SurfaceInput("strict JSON");
  }
  const stack = [value];
  let nodes = 0;
  while (stack.length) {
    const v = stack.pop();
    need(++nodes <= CAPS.nodes, "nodes");
    if (typeof v === "number") need(Number.isFinite(v), "finite");
    if (typeof v === "string") need(v.length <= 4096, "string");
    if (v && typeof v === "object") {
      const entries = Object.entries(v);
      need(entries.length <= 1024, "container");
      for (const [k, x] of entries) {
        need(k.length <= 4096, "key");
        stack.push(x);
      }
    }
  }
  return value;
}
export function toLegacyDeclaration(d) {
  const x = structuredClone(d);
  x.artifact_kind = "unissued-d0-declaration-exercise";
  for (const slot of x.result_slots) slot.payload_status = "method_payload_deferred";
  return x;
}
export function fromLegacyDeclaration(d) {
  need(d.artifact_kind === "unissued-d0-declaration-exercise", "legacy kind");
  const x = structuredClone(d);
  x.artifact_kind = "unissued-r3-declaration-body-v1";
  for (const slot of x.result_slots) {
    need(slot.payload_status === "method_payload_deferred", "legacy slot");
    delete slot.payload_status;
  }
  return x;
}
export function prepareSurface(expectedText, recordBytes) {
  need(
    typeof expectedText === "string" && expectedText.length <= CAPS.expectedBytes,
    "expected type/size",
  );
  need(Buffer.byteLength(expectedText, "utf8") <= CAPS.expectedBytes, "expected bytes");
  need(Buffer.isBuffer(recordBytes) && recordBytes.length <= CAPS.recordBytes, "record bytes");
  // Snapshot bytes so later caller mutation cannot change this operation's input.
  const bytes = Buffer.from(recordBytes);
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new SurfaceInput("UTF-8");
  }
  const expected = parse(expectedText),
    record = parse(text);
  need(Buffer.from(jcsCanonicalize(record), "utf8").equals(bytes), "canonical storage");
  need(validateExpected(expected), "expected schema");
  need(validateRecord(record), "record schema");
  const actual = {
    record_id: record.record_id,
    revision_id: record.revision_id,
    declaration: record.declaration,
    inputs: record.inputs,
  };
  if (jcsCanonicalize(actual) !== jcsCanonicalize(expected))
    throw new ContextMismatch("expected context");
  need(expected.revision_id === expected.inputs.revision, "revision ownership");
  for (const k of ["analysis_id", "family_id", "result_id"])
    need(record.result[k] === expected.inputs[k], "result ownership");
  for (const row of record.result.adjusted) {
    need(BigInt("0x" + row.adjusted_hex) <= U, "exact range");
    need(BigInt("0x" + row.display_hex) <= 0x3ff0000000000000n, "display range");
  }
  const d = toLegacyDeclaration(expected.declaration),
    s = {
      kind: "unissued-holm-binding-evidence-v0",
      binding: { declaration: toLegacyDeclaration(record.declaration), inputs: record.inputs },
      adjusted: record.result.adjusted,
    };
  return {
    texts: [jcsCanonicalize(d), jcsCanonicalize(expected.inputs), jcsCanonicalize(s)],
    scope: {
      record_id: expected.record_id,
      revision_id: expected.revision_id,
      analysis_id: expected.inputs.analysis_id,
      family_id: expected.inputs.family_id,
      result_id: expected.inputs.result_id,
    },
  };
}
const reasons = {
  consistent: "all_rows_match",
  mismatch: "context_or_value_mismatch",
  input_refused: "surface_input",
  execution_failed: "worker_or_dependency_failure",
};
function report(outcome, scope) {
  return {
    kind: "unissued-r3-holm-report-body-v1",
    check_ref: "unissued-declaration-bound-holm-check-v1",
    scope,
    outcome,
    reason: reasons[outcome],
    guarantee_boundary: {
      declaration_truth: "not_asserted",
      scientific_validity: "not_asserted",
      familywise_error_control: "not_asserted",
      source_authenticity: "not_asserted",
    },
    p_generation: "not_run",
  };
}
async function loadBridge() {
  const pins = JSON.parse(fs.readFileSync(new URL("./INPUTS.json", import.meta.url), "utf8"));
  for (const p of pins.runtime) {
    const b = fs.readFileSync(new URL(p.relative_path, import.meta.url));
    if (crypto.createHash("sha256").update(b).digest("hex") !== p.sha256)
      throw Error("runtime dependency identity");
  }
  return import("../holm-declaration-binding-experiment-20260911/bridge.mjs");
}
// Optional runner is trusted harness code only, never accepted from the Record.
export async function evaluate(expectedText, recordBytes, runner) {
  let scope = null,
    bridge;
  try {
    const p = prepareSurface(expectedText, recordBytes);
    scope = p.scope;
    bridge = await loadBridge();
    if (runner === undefined) await bridge.checkBinding(...p.texts);
    else await bridge.checkWithRunner(p.texts, runner);
    return report("consistent", scope);
  } catch (e) {
    if (e instanceof ContextMismatch) return report("mismatch", scope);
    if (e instanceof SurfaceInput) return report("input_refused", scope);
    if (bridge && e instanceof bridge.Refusal)
      return report(
        [
          "adjusted mismatch",
          "display mismatch",
          "context binding",
          "output member order",
        ].includes(e.reason)
          ? "mismatch"
          : "input_refused",
        scope,
      );
    return report("execution_failed", scope);
  }
}
