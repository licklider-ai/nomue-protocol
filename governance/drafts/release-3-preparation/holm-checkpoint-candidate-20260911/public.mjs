// Trusted completed-supervisor receipt adapter. This is not a receipt authentication API.
import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import { IDS, CAPS, validateOutput as validatePrivate } from "./envelope.mjs";
const load = (n) => JSON.parse(fs.readFileSync(new URL(n, import.meta.url), "utf8"));
const policy = load("./outcomes.json");
const diagnostics = load("./diagnostics.json");
const ajv = new Ajv2020({ strict: false });
const reportSchema = ajv.compile(load("./report.schema.json"));
const refusalSchema = ajv.compile(load("./refusal.schema.json"));
const reverse = Object.fromEntries(Object.entries(policy.reasons).map(([a, b]) => [b, a]));
const clock = () => new Date().toISOString();

function refusal(stage, kind, reason, now, details) {
  const result = {
    $schema: IDS.refusal,
    output_type: "nomue-verifier-refusal",
    stage,
    refusal_kind: kind,
    reason_codes: [policy.reasons[reason]],
    message: "The candidate did not produce a complete result for the requested operation.",
    verifier: { name: "holm-public-candidate", version: "unissued-v1" },
    input_evidence: { availability: "not_observed" },
    generated_at: now(),
  };
  const limit = policy.input_limits[reason] ?? policy.execution[reason]?.limit_category;
  if (limit) result.limit_category = limit;
  if (details) result.details = details;
  return result;
}

export async function validatePublic(output) {
  if (reportSchema(output)) {
    const r = structuredClone(output);
    delete r.$schema;
    delete r.report_type;
    r.kind = IDS.report;
    for (const check of r.checks) {
      check.reasons = check.reason_codes.map((code) => reverse[code]);
      delete check.reason_codes;
    }
    return validatePrivate(r);
  }
  if (!refusalSchema(output)) return false;
  const reason = reverse[output.reason_codes[0]];
  const row =
    output.stage === "execution" ? policy.execution[reason] : diagnostics.refusals[reason];
  if (!row || row.refusal_kind !== output.refusal_kind) return false;
  if (output.stage !== "execution" && row.stage !== output.stage) return false;
  if ((policy.input_limits[reason] ?? row.limit_category ?? undefined) !== output.limit_category)
    return false;
  if (output.stage === "execution" && output.details) return false;
  return true;
}

export async function publishReceipt(receipt, { now = clock } = {}) {
  let result;
  // Categories and all causes come from the trusted supervisor, not from the Record.
  const categories = [...policy.execution_precedence, "completed_valid"];
  const known = receipt && categories.includes(receipt.category);
  const flags = receipt?.causes;
  const validFlags =
    flags &&
    typeof flags === "object" &&
    !Array.isArray(flags) &&
    Object.entries(flags).every(([k, v]) => policy.execution_precedence.includes(k) && v === true);
  const observed = validFlags
    ? (policy.execution_precedence.find((k) => flags[k]) ?? "completed_valid")
    : null;
  if (!known || !validFlags || observed !== receipt.category) {
    result = { output: refusal("execution", "internal_error", "completed_invalid_output", now) };
  } else if (receipt.category !== "completed_valid") {
    const row = policy.execution[receipt.category];
    result = { output: refusal("execution", row.refusal_kind, row.reason, now) };
  } else {
    const transport = receipt.result;
    if (!transport || !(await validatePrivate(transport.output))) {
      result = { output: refusal("execution", "internal_error", "completed_invalid_output", now) };
    } else if (transport.output.kind === IDS.refusal) {
      const r = transport.output;
      result = { output: refusal(r.stage, r.refusal_kind, r.reason, now, r.details) };
    } else {
      const r = structuredClone(transport.output);
      delete r.kind;
      r.$schema = IDS.report;
      r.report_type = "nomue-verification-report";
      for (const check of r.checks) {
        check.reason_codes = check.reasons.map((reason) => policy.reasons[reason]);
        delete check.reasons;
      }
      result = { output: r };
      if (Object.hasOwn(transport, "verified_record_base64")) {
        const b64 = transport.verified_record_base64;
        const allPass = r.checks.every((c) => c.execution === "completed" && c.outcome === "pass");
        if (typeof b64 !== "string" || b64.length > 4 * Math.ceil(CAPS.recordBytes / 3))
          result = {
            output: refusal("execution", "internal_error", "completed_invalid_output", now),
          };
        else {
          const b = Buffer.from(b64, "base64");
          if (!allPass || b.length > CAPS.recordBytes || b.toString("base64") !== b64)
            result = {
              output: refusal("execution", "internal_error", "completed_invalid_output", now),
            };
          else result.verified_record_base64 = b64;
        }
      }
    }
  }
  if (!(await validatePublic(result.output))) throw Error("public candidate invariant");
  return result;
}
