/** UNISSUED CANDIDATE. Report encoding and defensive invariants; no numerical truth. */
import { isDeepStrictEqual } from "node:util";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Ajv2020 } from "ajv/dist/2020.js";
import {
  validateRecord,
  validateQuantityEvidence,
  ids,
  candidate,
  type Result,
} from "../t07-closed-schemas-validator-20260915/validator.js";
import { adapt, type Transport } from "../t08-limited-numerical-adapter-20260915/adapter.js";
import { parseStrictJson } from "../../../../reference/verifier/src/strict-json.js";
import { recomputeContentDigest } from "../../../../reference/verifier/src/digest.js";
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../../..");
const read = (p: string) => JSON.parse(readFileSync(p, "utf8"));
export const profile = read(resolve(here, "PROFILE.json"));
const schemaBytes = readFileSync(resolve(here, "report.schema.json"));
const reportSchema = JSON.parse(schemaBytes.toString());
export const reasons = read(resolve(here, "REASONS.json")).reasons as Record<string, string>;
export const provenance = {
  t07_commit: "fb773cc2092678f8409c2f0d25289028356eeb86",
  t08_commit: "76542b5d0370fc51d60f22efda2af00cafe33ad1",
  numerical_commit: "66fa2bc201c86c62f21bb94825479427c24d8522",
  report_schema_sha256: createHash("sha256").update(schemaBytes).digest("hex"),
};
const verifier = { name: "nomue-r4-t09-research", version: "0.1.0-draft.1" };
const generated_at = "2026-09-15T00:00:00Z"; // Artifact date, not invocation timing or semantic identity.
const ajv = new Ajv2020({
  strict: true,
  strictTypes: false,
  strictRequired: false,
  allErrors: true,
  validateFormats: false,
});
ajv.addSchema(read(resolve(root, "schemas/common/identifier.schema.json")));
ajv.addSchema(read(resolve(root, "schemas/reports/verifier-refusal-0.2-draft-3.schema.json")));
ajv.addSchema(reportSchema);
const shape = ajv.compile(read(resolve(here, "invocation.schema.json")));
export const ensure = (ok: unknown, label: string): void => {
  if (!ok) throw new Error(label);
};
const wrap = (body: any) => ({ status: "UNISSUED CANDIDATE", provenance, ...body });
export function refusal(code: string, bytes: number): any {
  ensure(code in reasons, "unknown refusal reason");
  let kind = reasons[code];
  if (
    !["parse_error", "unsupported_bundle", "resource_limit", "canonicalization_failure"].includes(
      kind,
    )
  )
    kind = "internal_error";
  const categories: Record<string, string> = {
    "NRS-FILE-SIZE-LIMIT-EXCEEDED": "file_size",
    "NRS-NESTING-LIMIT-EXCEEDED": "nesting_depth",
    "NRS-STRING-LIMIT-EXCEEDED": "string_length",
    "NRS-OBSERVATION-LIMIT-EXCEEDED": "observation_count",
    "NRS-TIMEOUT-LIMIT-EXCEEDED": "processing_timeout",
    "NRS-MEMORY-LIMIT-EXCEEDED": "memory_limit",
  };
  return wrap({
    execution: "execution_refusal",
    refusal: {
      $schema: "urn:nomue:schema:verifier-refusal:0.2.0-draft.3",
      output_type: "nomue-verifier-refusal",
      refusal_kind: kind,
      reason_codes: [code],
      message: code,
      verifier,
      input_evidence: { input_size_bytes: bytes },
      generated_at,
      ...(kind === "resource_limit" && categories[code]
        ? { limit_category: categories[code] }
        : {}),
    },
  });
}
function reportBase(raw: string, v: Result): any {
  const r = v.record ?? (parseStrictJson(raw) as any);
  const identity = (x: unknown, fallback: string) =>
    typeof x === "string" && x.includes(":") ? x : fallback;
  const record_id = identity(r?.record_id, "urn:nomue:unidentified:record");
  const revision_id = identity(r?.revision_id, "urn:nomue:unidentified:revision");
  const digest = recomputeContentDigest(r);
  const reason = v.reason ? [v.reason] : [];
  const conf = v.category !== "conformance_failure";
  const scope = { kind: "record_revision", id: revision_id };
  const notrun = (key: string) => ({
    check_id: ids[key],
    check_version: verifier.version,
    execution: "not_run",
    scope,
    reason_codes: reason,
  });
  return {
    $schema: ids.report,
    report_type: "nomue-verification-report",
    record_reference: { record_id, revision_id, content_digest: digest },
    interpretation_bundle_id: ids.bundle,
    verifier,
    generated_at,
    conformance: {
      check_id: ids.conformance,
      check_version: verifier.version,
      execution: "completed",
      outcome: conf ? "pass" : "fail",
      scope,
      reason_codes: conf ? [] : reason,
      violations: conf ? [] : [{ stage: v.stage, reason_code: v.reason, path: v.path }],
    },
    verification_results: ["integrity", "admissibility", "computability", "recompute"].map(notrun),
    profile_eligibility: "not_evaluated",
    guarantee_boundary: Object.fromEntries(
      Object.keys(reportSchema.$defs.guaranteeBoundary.properties).map((k) => [k, "not_asserted"]),
    ),
  };
}
/** Generic unresolved encoding only; actual determinate evidence comes directly from T08. */
function unresolvedEvidence(out: any): any {
  const n = out.numerical;
  const rows = n.quantities.map((row: any, i: number) => {
    const spec = candidate.quantities[i];
    const x: any = {
      quantity: spec.quantity,
      declared: i < 5 ? Number(row.declared) : decode(row.declared),
      outcome: row.outcome,
      reason_codes:
        row.outcome === "pass"
          ? []
          : [
              row.outcome === "fail"
                ? "NRS-DECLARED-RESULT-MISMATCH"
                : "NRS-BTF-PROJECTION-UNRESOLVED",
            ],
    };
    if (spec.discriminator.cell_id)
      x.cell_id =
        n.scope.cell_order[
          ["cell(00)", "cell(01)", "cell(10)", "cell(11)"].indexOf(spec.discriminator.cell_id)
        ];
    if (spec.discriminator.contrast_kind) x.contrast_kind = spec.discriminator.contrast_kind;
    if (row.projected !== undefined) {
      x.recomputed = i < 5 ? Number(row.projected) : decode(row.projected);
      if (x.recomputed === 0)
        x.projection_state =
          row.exact && row.exact[0] !== "0x0" ? "nonzero_rounded_to_zero" : "exact_zero";
    }
    return x;
  });
  return {
    record_reference: { record_id: out.context.record_id, revision_id: out.context.revision_id },
    interpretation_bundle_id: ids.bundle,
    check_id: ids.recompute,
    check_version: verifier.version,
    scope: { kind: "result", id: out.context.result_id },
    quantity_results: rows,
  };
}
function decode(code: string): number {
  const b = Buffer.alloc(8);
  b.writeBigUInt64BE(BigInt(code));
  return b.readDoubleBE();
}
export function assemble(raw: string, v: Result, out?: any): any {
  const report = reportBase(raw, v);
  if (v.category === "conformance_failure") return wrap({ execution: "completed", report });
  const r = v.record!;
  const scope = { kind: "result", id: r.payload.result.result_id };
  const checks = report.verification_results;
  const complete = (i: number, outcome: string, codes: string[]) => {
    checks[i] = {
      ...checks[i],
      execution: "completed",
      outcome,
      reason_codes: codes,
      ...(i >= 2 ? { scope } : {}),
    };
  };
  const digestPass = report.record_reference.content_digest === r.integrity.content_digest;
  complete(0, digestPass ? "pass" : "fail", digestPass ? [] : ["NRS-DIGEST-MISMATCH"]);
  const admissible = v.category === "accepted";
  complete(1, admissible ? "pass" : "fail", admissible ? [] : [v.reason!]);
  report.profile_eligibility = admissible ? "eligible" : "ineligible";
  if (!admissible) return wrap({ execution: "completed", report });
  ensure(out && out.numerical, "missing T08 numerical result");
  const n = out.numerical;
  if (n.gate !== "eligible") {
    const code =
      n.gate === "computability fail"
        ? "NRS-BTF-ZERO-RESIDUAL"
        : n.gate === "supported-domain refusal"
          ? "NRS-BTF-SUPPORTED-DOMAIN-EXCLUDED"
          : n.gate === "representation refusal"
            ? "NRS-BTF-REPRESENTATION-UNSUPPORTED"
            : null;
    ensure(code, "unexpected numerical gate");
    checks[2] = { ...checks[2], scope, reason_codes: [code] };
    checks[3] = { ...checks[3], scope, reason_codes: [code] };
    if (n.gate === "computability fail") complete(2, "fail", [code!]);
  } else {
    complete(2, "pass", []);
    ensure(
      ["completed/pass", "completed/fail", "completed/indeterminate"].includes(n.recomputation),
      "numerical aggregate",
    );
    const outcome = n.recomputation.split("/")[1];
    const evidence = out.quantity_evidence ?? unresolvedEvidence(out);
    const codes = [
      ...new Set<string>(evidence.quantity_results.flatMap((q: any) => q.reason_codes)),
    ].sort();
    complete(3, outcome, codes);
    report.quantity_evidence = evidence;
  }
  return wrap({ execution: "completed", report });
}
export function validateFinal(value: any, raw?: string): boolean {
  try {
    ensure(shape(value), "closed shape");
    ensure(isDeepStrictEqual(value.provenance, provenance), "provenance");
    ensure(Buffer.byteLength(JSON.stringify(value)) <= profile.full_report_bytes, "report size");
    if (value.execution === "execution_refusal") {
      const f = value.refusal;
      ensure(
        f.reason_codes.every((x: string) => x in reasons),
        "closed refusal reasons",
      );
      ensure(f.reason_codes.length === 1, "one refusal reason");
      const expected = refusal(f.reason_codes[0], f.input_evidence.input_size_bytes).refusal;
      ensure(isDeepStrictEqual(f, expected), "refusal reason contract");
      return true;
    }
    const p = value.report;
    const c = p.verification_results;
    ensure(
      c.map((x: any) => x.check_id).join() ===
        [ids.integrity, ids.admissibility, ids.computability, ids.recompute].join(),
      "exact check set",
    );
    ensure(p.conformance.scope.id === p.record_reference.revision_id, "conformance scope");
    ensure(
      c.slice(0, 2).every((x: any) => x.scope.id === p.record_reference.revision_id),
      "record scopes",
    );
    if (raw !== undefined) {
      const v = validateRecord(raw);
      ensure(
        ["accepted", "admissibility_failure", "conformance_failure"].includes(v.category),
        "report input context",
      );
      const base = reportBase(raw, v);
      ensure(
        isDeepStrictEqual(p.record_reference, base.record_reference),
        "revision/digest binding",
      );
      ensure(isDeepStrictEqual(p.conformance, base.conformance), "conformance binding");
      if (v.record) {
        const r = v.record;
        ensure(
          c
            .slice(2)
            .every(
              (x: any) =>
                x.scope.id ===
                (x.scope.kind === "result" ? r.payload.result.result_id : r.revision_id),
            ),
          "check scope",
        );
        ensure(
          c[0].outcome ===
            (p.record_reference.content_digest === r.integrity.content_digest ? "pass" : "fail"),
          "independent integrity",
        );
        ensure(c[1].outcome === (v.category === "accepted" ? "pass" : "fail"), "T07 admissibility");
      }
    }
    if (p.conformance.outcome === "fail") {
      ensure(
        p.conformance.violations.length === 1 &&
          p.conformance.reason_codes[0] === p.conformance.violations[0].reason_code,
        "conformance violation",
      );
      ensure(
        c.every(
          (x: any) =>
            x.execution === "not_run" &&
            JSON.stringify(x.reason_codes) === JSON.stringify(p.conformance.reason_codes),
        ),
        "conformance blocks all checks",
      );
      ensure(p.profile_eligibility === "not_evaluated" && !p.quantity_evidence, "blocked evidence");
      return true;
    }
    ensure(
      p.conformance.reason_codes.length === 0 && p.conformance.violations.length === 0,
      "conformance pass reasons",
    );
    ensure(c[0].execution === "completed" && c[1].execution === "completed", "independent checks");
    ensure(
      JSON.stringify(c[0].reason_codes) ===
        JSON.stringify(c[0].outcome === "pass" ? [] : ["NRS-DIGEST-MISMATCH"]),
      "integrity reasons",
    );
    ensure(
      p.profile_eligibility === (c[1].outcome === "pass" ? "eligible" : "ineligible"),
      "eligibility",
    );
    ensure(
      c[1].outcome === "pass"
        ? c[1].reason_codes.length === 0
        : c[1].reason_codes.length === 1 && reasons[c[1].reason_codes[0]] === "admissibility",
      "admissibility reason",
    );
    if (c[1].outcome === "fail")
      ensure(
        c
          .slice(2)
          .every(
            (x: any) =>
              x.execution === "not_run" &&
              JSON.stringify(x.reason_codes) === JSON.stringify(c[1].reason_codes),
          ),
        "admissibility blocking",
      );
    const rc = c[3];
    if (rc.execution !== "completed") {
      ensure(!p.quantity_evidence, "no partial quantity delivery");
      if (c[1].outcome === "pass") {
        ensure(rc.execution === "not_run" && rc.reason_codes.length === 1, "numerical gate");
        const code = rc.reason_codes[0];
        ensure(
          [
            "NRS-BTF-ZERO-RESIDUAL",
            "NRS-BTF-SUPPORTED-DOMAIN-EXCLUDED",
            "NRS-BTF-REPRESENTATION-UNSUPPORTED",
          ].includes(code),
          "gate reason",
        );
        ensure(
          JSON.stringify(c[2].reason_codes) === JSON.stringify(rc.reason_codes),
          "gate blocking",
        );
        ensure(
          code === "NRS-BTF-ZERO-RESIDUAL"
            ? c[2].execution === "completed" && c[2].outcome === "fail"
            : c[2].execution === "not_run",
          "computability distinction",
        );
      }
      return true;
    }
    ensure(
      c[1].outcome === "pass" &&
        c[2].execution === "completed" &&
        c[2].outcome === "pass" &&
        c[2].reason_codes.length === 0,
      "recompute dependencies",
    );
    const e = p.quantity_evidence;
    ensure(e, "completed evidence");
    ensure(
      e.record_reference.record_id === p.record_reference.record_id &&
        e.record_reference.revision_id === p.record_reference.revision_id &&
        e.scope.id === rc.scope.id,
      "quantity context",
    );
    if (raw !== undefined)
      ensure(
        validateQuantityEvidence(JSON.stringify(e), raw).category === "accepted",
        "T07 quantity contract",
      );
    const keys = e.quantity_results.map((q: any) =>
      JSON.stringify([q.quantity, q.cell_id ?? null, q.contrast_kind ?? null]),
    );
    ensure(new Set(keys).size === 22, "distinct quantities");
    for (const q of e.quantity_results) {
      ensure(
        JSON.stringify(q.reason_codes) ===
          JSON.stringify(
            q.outcome === "pass"
              ? []
              : [
                  q.outcome === "fail"
                    ? "NRS-DECLARED-RESULT-MISMATCH"
                    : "NRS-BTF-PROJECTION-UNRESOLVED",
                ],
          ),
        "quantity reason",
      );
      if (q.recomputed !== undefined)
        ensure(
          q.outcome === (q.declared === q.recomputed ? "pass" : "fail"),
          "comparison consistency",
        );
    }
    // Consistency assertion only: the emitted outcome is T08's aggregate, not this expression.
    const states = e.quantity_results.map((q: any) => q.outcome);
    ensure(
      rc.outcome ===
        (states.includes("fail")
          ? "fail"
          : states.includes("indeterminate")
            ? "indeterminate"
            : "pass"),
      "aggregate consistency",
    );
    ensure(
      JSON.stringify(rc.reason_codes) ===
        JSON.stringify(
          [...new Set<string>(e.quantity_results.flatMap((q: any) => q.reason_codes))].sort(),
        ),
      "aggregate reasons",
    );
    return true;
  } catch {
    return false;
  }
}
export async function evaluate(raw: string, invoke: Transport): Promise<any> {
  const bytes = Buffer.byteLength(raw);
  if (bytes > profile.raw_bytes) return refusal("NRS-FILE-SIZE-LIMIT-EXCEEDED", bytes);
  const v = validateRecord(raw);
  if (!["accepted", "admissibility_failure", "conformance_failure"].includes(v.category))
    return refusal(v.reason!, bytes);
  try {
    let out: any;
    if (v.category === "accepted") {
      out = await adapt(raw, async (packet) => {
        ensure(Buffer.byteLength(packet) <= profile.internal_transport_bytes, "transport bound");
        return invoke(packet);
      });
      if (out.execution === "error") return refusal("NRS-INTERNAL-VERIFIER-ERROR", bytes);
    }
    const value = assemble(raw, v, out);
    ensure(validateFinal(value, raw), "constructed report invalid");
    return value;
  } catch {
    return refusal("NRS-INTERNAL-VERIFIER-ERROR", bytes);
  }
}
/** Research automation only: preserve existing 0/2/3/4/5, add internal unresolved 6. */
export function exitCode(x: any): number {
  if (x.execution !== "completed")
    return x.refusal.refusal_kind === "internal_error"
      ? 5
      : x.refusal.refusal_kind === "resource_limit"
        ? 4
        : x.refusal.refusal_kind === "unsupported_bundle"
          ? 3
          : 2;
  const checks = [x.report.conformance, ...x.report.verification_results];
  if (checks.some((c) => c.outcome === "fail")) return 2;
  if (checks.some((c) => c.outcome === "indeterminate")) return 6;
  if (checks.some((c) => c.execution !== "completed")) return 3;
  return 0;
}
