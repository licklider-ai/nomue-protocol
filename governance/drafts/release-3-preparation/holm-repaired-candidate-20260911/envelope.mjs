// Unissued candidate engine; exact dispatch here does not register a supported bundle.
import fs from "node:fs";
import { createBudget, exhausted } from "./budget.mjs";
import crypto from "node:crypto";
import Ajv2020 from "ajv/dist/2020.js";
const root = new URL("../../../../", import.meta.url);
const local = (name) => new URL(name, import.meta.url);
export const IDS = JSON.parse(fs.readFileSync(local("./identities.json"), "utf8"));
Object.freeze(IDS.checks);
Object.freeze(IDS);
const DIAGNOSTICS = JSON.parse(fs.readFileSync(local("./diagnostics.json"), "utf8"));
export const CAPS = Object.freeze({
  recordBytes: 2359296,
  expectedBytes: 1572864,
  depth: 36,
  nodes: 28736,
  entries: 1024,
  string: 4096,
});
const SHAPES = JSON.parse(
  fs.readFileSync(local("./declaration-shapes.json"), "utf8"),
).legacy_adapter;
const STAGES = ["integrity", "context", "declaration", "admission", "arithmetic"];
const hash = (b) => crypto.createHash("sha256").update(b).digest("hex");
export const storedDigest = (bytes) =>
  "sha256:" + hash(Buffer.concat([Buffer.from("nomue/record-content/v1\n"), bytes]));
class Stop extends Error {
  constructor(stage, kind, reason, details) {
    super(reason);
    Object.assign(this, { stage, kind, reason, details });
  }
}
const stop = (stage, kind, reason, details) => {
  throw new Stop(stage, kind, reason, details);
};
let cached;
async function setup() {
  const pins = JSON.parse(fs.readFileSync(local("./INPUTS.json"), "utf8"));
  for (const pin of pins.runtime)
    if (hash(fs.readFileSync(new URL(pin.path, root))) !== pin.sha256)
      throw Error("dependency drift");
  if (cached) return cached;
  const ajv = new Ajv2020({ strict: false, allErrors: false });
  const schemas = {};
  const sources = {};
  for (const n of ["record", "expected", "report", "refusal"]) {
    const b = fs.readFileSync(
      local("./" + (["report", "refusal"].includes(n) ? "private-" : "") + n + ".schema.json"),
    );
    sources[n] = hash(b);
    schemas[n] = ajv.compile(JSON.parse(b));
  }
  for (const n of ["identities.json", "diagnostics.json", "INPUTS.json", "envelope.mjs"])
    sources[n] = hash(fs.readFileSync(local("./" + n)));
  const strict = await import("../../../../reference/verifier/src/strict-json.ts");
  const { jcsCanonicalize } = await import("../../../../reference/verifier/src/jcs.ts");
  const bridge = await import("../holm-declaration-binding-experiment-20260911/bridge.mjs");
  cached = {
    schemas,
    parse: strict.parseStrictJson,
    jcs: jcsCanonicalize,
    bridge,
    sourceDigest: "sha256:" + hash(JSON.stringify(sources)),
  };
  return cached;
}
function parseBounded(text, env, target) {
  let value;
  try {
    value = env.parse(text);
  } catch (e) {
    if (e instanceof RangeError) stop("raw", "resource_limit", target + "_parser_exhaustion");
    const codes = {
      DUPLICATE_JSON_MEMBER: "duplicate_member",
      INVALID_UNICODE_STRING: "invalid_unicode",
      NEGATIVE_ZERO_NUMBER: "negative_zero",
    };
    stop("raw", "parse_error", target + "_" + (codes[e.code] ?? "malformed_json"));
  }
  // Strict syntax/eligibility wins over parsed bounds and routing. No recursive walk.
  const stack = [[value, 0]];
  let nodes = 0;
  while (stack.length) {
    const [v, d] = stack.pop();
    if (++nodes > CAPS.nodes) stop("parsed", "resource_limit", target + "_nodes");
    if (typeof v === "string" && v.length > CAPS.string)
      stop("parsed", "resource_limit", target + "_string");
    if (v && typeof v === "object") {
      if (d + 1 > CAPS.depth) stop("parsed", "resource_limit", target + "_depth");
      const entries = Object.entries(v);
      if (entries.length > CAPS.entries) stop("parsed", "resource_limit", target + "_container");
      for (const [k, x] of entries) {
        if (k.length > CAPS.string) stop("parsed", "resource_limit", target + "_key");
        stack.push([x, d + 1]);
      }
    }
  }
  return value;
}
function finite(value) {
  const stack = [value];
  while (stack.length) {
    const x = stack.pop();
    if (typeof x === "number" && !Number.isFinite(x)) return false;
    if (x && typeof x === "object") stack.push(...Object.values(x));
  }
  return true;
}
// Trusted helper: bytes have already passed strict JSON, closed schema and storage admission.
// Token spans are byte offsets, so non-ASCII content is copied without UTF-16 offset conversion.
export function projectStoredBytes(bytes) {
  const quote = (i) => {
    if (bytes[i] !== 34) throw Error("string span");
    for (i++; i < bytes.length; i++) {
      if (bytes[i] === 92) i++;
      else if (bytes[i] === 34) return i + 1;
    }
    throw Error("string span");
  };
  const value = (i) => {
    if (bytes[i] === 34) return quote(i);
    if (bytes[i] === 123 || bytes[i] === 91) {
      let depth = 0;
      for (; i < bytes.length; i++) {
        const c = bytes[i];
        if (c === 34) {
          i = quote(i) - 1;
          continue;
        }
        if (c === 123 || c === 91) depth++;
        else if (c === 125 || c === 93) {
          if (--depth === 0) return i + 1;
        }
      }
      throw Error("container span");
    }
    for (; i < bytes.length && bytes[i] !== 44 && bytes[i] !== 125; i++);
    return i;
  };
  if (bytes[0] !== 123 || bytes.at(-1) !== 125) throw Error("root span");
  const spans = [];
  let i = 1,
    removed = 0;
  while (i < bytes.length - 1) {
    const start = i,
      endKey = quote(i);
    if (bytes[endKey] !== 58) throw Error("separator span");
    const end = value(endKey + 1);
    if (bytes.subarray(start, endKey).equals(Buffer.from('"integrity"'))) removed++;
    else spans.push(bytes.subarray(start, end));
    i = end;
    if (bytes[i] === 44) i++;
    else if (bytes[i] !== 125) throw Error("member span");
  }
  if (removed !== 1) throw Error("integrity span count");
  return Buffer.concat([
    Buffer.from("{"),
    ...spans.flatMap((b, j) => (j ? [Buffer.from(","), b] : [b])),
    Buffer.from("}"),
  ]);
}
export function legacyTexts(record, jcs) {
  const d = structuredClone(record.payload.declaration);
  for (const item of [...d.analyses, ...d.result_slots]) {
    item.contract_ref = SHAPES[item.operation_kind];
    delete item.operation_kind;
  }
  d.artifact_kind = "unissued-d0-declaration-exercise";
  for (const slot of d.result_slots) slot.payload_status = "method_payload_deferred";
  // Actual URI identities were compared before this adapter. This label is private to the carrier.
  const inputs = {
    ...record.payload.inputs,
    kind: "unissued-holm-binding-input-v0",
    revision: "internal-bound-revision",
  };
  return [
    d,
    inputs,
    {
      kind: "unissued-holm-binding-evidence-v0",
      binding: { declaration: d, inputs },
      adjusted: record.payload.result.adjusted,
    },
  ].map((value) => jcs(value));
}
function newReport(r, digest, env, now) {
  const scope = {
    record_id: r.record_id,
    revision_id: r.revision_id,
    ...Object.fromEntries(
      ["analysis_id", "family_id", "result_id"].map((k) => [k, r.payload.inputs[k]]),
    ),
  };
  return {
    kind: IDS.report,
    record_reference: {
      record_id: r.record_id,
      revision_id: r.revision_id,
      content_digest: digest,
    },
    interpretation_bundle_id: IDS.bundle,
    verifier: {
      name: "holm-envelope-exercise",
      version: "unissued-v1",
      source_digest: env.sourceDigest,
    },
    generated_at: now(),
    checks: STAGES.map((stage) => ({
      stage,
      check_ref: IDS.checks[stage],
      scope: { ...scope },
      execution: "not_run",
      reasons: ["prerequisite_failed"],
    })),
    guarantee_boundary: {
      scientific_validity: "not_asserted",
      declaration_truth: "not_asserted",
      distributional_model_validity: "not_asserted",
      causal_interpretation: "not_asserted",
      standardized_effect_size: "not_asserted",
      familywise_error_control: "not_asserted",
      source_authenticity: "not_asserted",
      p_generation: "outside_scope",
    },
  };
}
function set(report, stage, outcome, reason, details) {
  const c = report.checks[STAGES.indexOf(stage)];
  Object.assign(c, { execution: "completed", outcome, reasons: reason ? [reason] : [] });
  if (details) c.details = details;
}
function reportValid(report, env) {
  if (!env.schemas.report(report)) return false;
  let gated = false;
  for (const c of report.checks) {
    if (
      c.scope.record_id !== report.record_reference.record_id ||
      c.scope.revision_id !== report.record_reference.revision_id
    )
      return false;
    if (env.jcs(c.scope) !== env.jcs(report.checks[0].scope)) return false;
    if (
      c.execution === "error" &&
      (c.stage !== "arithmetic" ||
        c.error.error_type !== "worker_failure" ||
        c.reasons.length !== 1 ||
        c.reasons[0] !== "worker_failure")
    )
      return false;
    if (
      c.execution === "not_run" &&
      (c.reasons.length !== 1 || c.reasons[0] !== "prerequisite_failed" || c.details)
    )
      return false;
    if (c.execution === "completed" && c.outcome === "pass" && c.details) return false;
    if (
      c.execution === "completed" &&
      c.outcome === "fail" &&
      (c.reasons.length !== 1 ||
        !DIAGNOSTICS.checks[c.stage].includes(c.reasons[0]) ||
        c.reasons[0] === "worker_failure")
    )
      return false;
    if (gated) {
      if (c.execution !== "not_run") return false;
    } else if (c.execution === "not_run") return false;
    if (c.execution !== "completed" || c.outcome !== "pass") gated = true;
  }
  return true;
}
export async function validateOutput(output) {
  try {
    const env = await setup();
    if (output.kind === IDS.report) return reportValid(output, env);
    const declared = DIAGNOSTICS.refusals[output.reason];
    return (
      env.schemas.refusal(output) &&
      !!declared &&
      declared.stage === output.stage &&
      declared.refusal_kind === output.refusal_kind
    );
  } catch {
    return false;
  }
}
const resourceReasons = new Set([
  "raw size",
  "raw depth",
  "document nodes",
  "document string",
  "document container",
  "document key",
  "D0 count",
  "D0 member count",
]);
const admissionReasons = new Set([
  "input kind",
  "input id",
  "input count",
  "member id",
  "sidedness",
  "p encoding",
  "p domain",
  "source hypothesis duplicate",
  "shape inputs",
  "shape input member",
  "shape origin",
  "shape submitted",
  "shape binding",
  "shape adjusted row",
  "submitted kind",
  "adjusted count",
  "adjusted member id",
  "adjusted encoding",
  "adjusted domain",
  "display encoding",
  "display domain",
  "selection binding",
  "selection kind",
  "family kind",
  "family scope",
  "D0 selected id",
  "member order",
  "context binding",
  "output member order",
]);
const details = (e) => ({
  source_stage: e.details?.stage ?? null,
  codes: Array.isArray(e.details?.codes) ? e.details.codes : [],
  bridge_reason: e.reason,
});
// Options are trusted harness-only fault injection / clock controls, never Record-supplied code.
export async function verify(expectedText, recordBytes, options = {}) {
  let env;
  const budget = options.budget ?? createBudget();
  const checkpoint = (name) => {
    const reason = exhausted(budget, name);
    if (reason) stop("processing", "resource_limit", reason);
  };
  try {
    if (!Buffer.isBuffer(recordBytes)) stop("raw", "parse_error", "record_bytes_type");
    if (recordBytes.length > CAPS.recordBytes) stop("raw", "resource_limit", "record_bytes");
    const bytes = Buffer.from(recordBytes);
    if (options.failSetup) throw Error("injected setup failure");
    env = await setup();
    let text;
    try {
      text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
    } catch {
      stop("raw", "parse_error", "record_utf8");
    }
    const record = parseBounded(text, env, "record");
    checkpoint("record_parsed");
    if (!record || typeof record !== "object" || !Object.hasOwn(record, "interpretation_bundle_id"))
      stop("routing", "routing_error", "bundle_missing");
    if (typeof record.interpretation_bundle_id !== "string")
      stop("routing", "routing_error", "bundle_type");
    if (record.interpretation_bundle_id !== IDS.bundle)
      stop("routing", "unsupported_bundle", "bundle_unsupported");
    if (!finite(record)) stop("schema", "canonicalization_failure", "record_nonfinite");
    if (!env.schemas.record(record)) stop("schema", "schema_error", "record_schema");
    const jcs = options.canonicalize ?? env.jcs;
    if (!Buffer.from(jcs(record)).equals(bytes))
      stop("storage", "noncanonical_storage", "stored_bytes_noncanonical");
    const projection = projectStoredBytes(bytes);
    const digest = storedDigest(projection);
    const { integrity: excluded, ...parsedProjection } = record;
    if (!Buffer.from(jcs(parsedProjection)).equals(projection))
      stop("storage", "canonicalization_failure", "projection_disagreement");
    checkpoint("storage");
    const report = newReport(record, digest, env, options.now ?? (() => new Date().toISOString()));
    const finish = (success = false) => {
      if (!reportValid(report, env)) stop("reporting", "internal_error", "report_invariant");
      checkpoint("report");
      return success
        ? { output: report, verified_bytes: Buffer.from(bytes), payload: record.payload }
        : { output: report };
    };
    if (digest !== record.integrity.content_digest) {
      set(report, "integrity", "fail", "digest_mismatch");
      return finish();
    }
    set(report, "integrity", "pass");
    if (typeof expectedText !== "string")
      stop("expected_context", "expected_context_error", "expected_type");
    if (
      expectedText.length > CAPS.expectedBytes ||
      Buffer.byteLength(expectedText) > CAPS.expectedBytes
    )
      stop("raw", "resource_limit", "expected_bytes");
    const expected = parseBounded(expectedText, env, "expected");
    checkpoint("expected_parsed");
    if (!finite(expected) || !env.schemas.expected(expected))
      stop("expected_context", "expected_context_error", "expected_schema");
    const actual = {
      record_id: record.record_id,
      revision_id: record.revision_id,
      declaration: record.payload.declaration,
      inputs: record.payload.inputs,
    };
    // Security-relevant association uses the pinned canonicalizer, not a storage-test injection.
    if (env.jcs(actual) !== env.jcs(expected)) {
      set(report, "context", "fail", "context_mismatch");
      return finish();
    }
    set(report, "context", "pass");
    checkpoint("context");
    let prepared;
    try {
      prepared = env.bridge.prepare(...legacyTexts(record, env.jcs));
      checkpoint("declaration");
    } catch (e) {
      if (e instanceof Stop) throw e;
      checkpoint("declaration");
      if (!(e instanceof env.bridge.Refusal)) throw e;
      if (resourceReasons.has(e.reason))
        stop("binding", "resource_limit", "legacy_admission_limit", details(e));
      if (e.reason === "D0 validation") {
        set(report, "declaration", "fail", "declaration_invalid", details(e));
        return finish();
      }
      if (!admissionReasons.has(e.reason)) throw e;
      set(report, "declaration", "pass");
      set(report, "admission", "fail", "holm_input_invalid", details(e));
      return finish();
    }
    set(report, "declaration", "pass");
    if (
      ["analysis_id", "family_id", "result_id"].some(
        (k) => record.payload.result[k] !== record.payload.inputs[k],
      )
    ) {
      set(report, "admission", "fail", "result_ownership");
      return finish();
    }
    set(report, "admission", "pass");
    checkpoint("admission");
    try {
      const reply = await (options.runner ?? env.bridge.runWorker)(prepared.carrier);
      checkpoint("worker");
      env.bridge.verifyReply(reply, prepared.submitted);
      set(report, "arithmetic", "pass");
      return finish(true);
    } catch (e) {
      if (e instanceof Stop) throw e;
      checkpoint("worker");
      if (
        e instanceof env.bridge.Refusal &&
        ["adjusted mismatch", "display mismatch"].includes(e.reason)
      ) {
        set(
          report,
          "arithmetic",
          "fail",
          e.reason === "adjusted mismatch" ? "exact_value_mismatch" : "display_value_mismatch",
          details(e),
        );
      } else {
        const c = report.checks[4];
        Object.assign(c, {
          execution: "error",
          reasons: ["worker_failure"],
          error: {
            error_type: "worker_failure",
            message: "The isolated computation did not yield a complete valid reply.",
          },
        });
      }
      return finish();
    }
  } catch (e) {
    const output =
      e instanceof Stop
        ? {
            kind: IDS.refusal,
            stage: e.stage,
            refusal_kind: e.kind,
            reason: e.reason,
            ...(e.details ? { details: e.details } : {}),
          }
        : {
            kind: IDS.refusal,
            stage: env ? "reporting" : "setup",
            refusal_kind: "internal_error",
            reason: env ? "internal_failure" : "setup_failure",
          };
    return { output };
  }
}
