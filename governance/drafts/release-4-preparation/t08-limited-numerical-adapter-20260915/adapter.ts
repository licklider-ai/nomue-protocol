/** UNISSUED CANDIDATE. T07 validation -> lossless private transport -> G5 result. */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateRecord,
  validateQuantityEvidence,
  ids,
  type RecordCandidate,
  type Result,
} from "../t07-closed-schemas-validator-20260915/validator.js";
const here = dirname(fileURLToPath(import.meta.url));
const inputs = JSON.parse(readFileSync(resolve(here, "INPUTS.json"), "utf8"));
const admitted = new WeakSet<object>();
export type Prepared = { readonly packet: string; readonly rawRecord: string };
export type Preparation =
  { accepted: true; value: Prepared } | { accepted: false; validation: Result };
function bits(value: number): string {
  const b = Buffer.alloc(8);
  b.writeDoubleBE(value);
  return b.toString("hex");
}
function tagged(value: any): any {
  if (typeof value === "number") return { $binary64: bits(value) };
  if (Array.isArray(value)) return value.map(tagged);
  if (value !== null && typeof value === "object")
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, tagged(value[k])]),
    );
  return value;
}
export function prepareRecord(rawRecord: string): Preparation {
  const validation = validateRecord(rawRecord);
  if (validation.category !== "accepted" || !validation.record)
    return { accepted: false, validation };
  const r: RecordCandidate = validation.record;
  const record = tagged(r);
  const context = {
    record_id: r.record_id,
    revision_id: r.revision_id,
    result_id: r.payload.result.result_id,
    interpretation_bundle_id: ids.bundle,
    check_id: ids.recompute,
    check_version: "0.1.0-draft.1",
    numerical_commit: inputs.numerical_commit,
    // Content binding for research evidence, not a new public digest/canonicalization.
    transport_sha256: createHash("sha256").update(JSON.stringify(record)).digest("hex"),
  };
  const token = Object.freeze({ packet: JSON.stringify({ record, context }), rawRecord });
  admitted.add(token);
  return { accepted: true, value: token };
}
export function serializePrepared(token: Prepared): string {
  if (!admitted.has(token)) throw new TypeError("T08 adapter invariant: input did not pass T07");
  return token.packet;
}
function decodeCode(code: string): number {
  const b = Buffer.alloc(8);
  b.writeBigUInt64BE(BigInt(code));
  return b.readDoubleBE();
}
export function bindNumericalResult(token: Prepared, result: any): any {
  const packet = JSON.parse(serializePrepared(token));
  if (result.execution === "error")
    return { ...result, context: packet.context, numerical: null, delivery: "T09 pending" }; // No numerical success fabricated.
  if (
    !result.context ||
    Object.keys(result.context).length !== Object.keys(packet.context).length ||
    Object.keys(packet.context).some((k) => result.context[k] !== packet.context[k])
  )
    throw new TypeError("T08 adapter invariant: returned context differs");
  const n = result.numerical;
  const coreKeys = [
    ...Array.from({ length: 4 }, (_, i) => "n:" + i),
    "df",
    ...Array.from({ length: 4 }, (_, i) => "mean:" + i),
    ...["effect", "ss"].flatMap((k) => ["A", "B", "AB"].map((c) => k + ":" + c)),
    "sse",
    ...["f", "p"].flatMap((k) => ["A", "B", "AB"].map((c) => k + ":" + c)),
  ];
  if (
    n.quantities.length !== 22 ||
    n.quantities.some((q: any, i: number) => q.identity !== coreKeys[i])
  )
    throw new TypeError("T08 adapter invariant: core quantity identity/order");
  const completed = n.recomputation.startsWith("completed/");
  if (!completed)
    return {
      status: "UNISSUED CANDIDATE",
      context: packet.context,
      numerical: n,
      quantity_evidence: null,
      delivery: "T09 pending",
    };
  // The reviewed S-C path resolves eligible quantities. Preserve the generic
  // architecture's unresolved result if supplied by a labeled control; do not turn
  // it into mismatch/error or mint an unresolved public reason before T09.
  if (n.quantities.some((q: any) => q.outcome === "indeterminate"))
    return {
      status: "UNISSUED CANDIDATE",
      context: packet.context,
      numerical: n,
      quantity_evidence: null,
      evidence_reason_binding: "T09 pending; generic unresolved control",
      delivery: "T09 pending",
    };
  const canonical = JSON.parse(
    readFileSync(
      resolve(here, "../t06-candidate-requirement-surfaces-20260915/CANDIDATE.json"),
      "utf8",
    ),
  ).quantities;
  const quantity_results = n.quantities.map((row: any, i: number) => {
    const q = canonical[i];
    const r: any = {
      quantity: q.quantity,
      declared: i < 5 ? Number(row.declared) : decodeCode(row.declared),
      outcome: row.outcome,
      reason_codes: row.outcome === "pass" ? [] : ["NRS-DECLARED-RESULT-MISMATCH"],
    };
    if (q.discriminator.cell_id)
      r.cell_id =
        n.scope.cell_order[
          ["cell(00)", "cell(01)", "cell(10)", "cell(11)"].indexOf(q.discriminator.cell_id)
        ];
    if (q.discriminator.contrast_kind) r.contrast_kind = q.discriminator.contrast_kind;
    if (row.projected !== undefined) {
      r.recomputed = i < 5 ? Number(row.projected) : decodeCode(row.projected);
      if (r.recomputed === 0)
        r.projection_state =
          row.exact && row.exact[0] !== "0x0" ? "nonzero_rounded_to_zero" : "exact_zero";
    }
    // Actual eligible S-C completion is determinate; no synthetic unresolved override
    // is exposed through the adapter. T09 owns any future public reason allocation.

    return r;
  });
  const evidence = {
    record_reference: {
      record_id: packet.context.record_id,
      revision_id: packet.context.revision_id,
    },
    interpretation_bundle_id: ids.bundle,
    check_id: ids.recompute,
    check_version: "0.1.0-draft.1",
    scope: { kind: "result", id: packet.context.result_id },
    quantity_results,
  };
  const check = validateQuantityEvidence(JSON.stringify(evidence), token.rawRecord);
  if (check.category !== "accepted")
    throw new TypeError("T08 adapter invariant: T07 output boundary " + JSON.stringify(check));
  return {
    status: "UNISSUED CANDIDATE",
    context: packet.context,
    numerical: n,
    quantity_evidence: evidence,
    delivery: "T09 pending",
  };
}

export type Transport = (packet: string) => Promise<unknown>;
/** The transport is trusted harness infrastructure, never selected by a Record. */
export async function adapt(rawRecord: string, invoke: Transport): Promise<any> {
  const prepared = prepareRecord(rawRecord);
  if (!prepared.accepted)
    return {
      status: "UNISSUED CANDIDATE",
      stage: "T07",
      validation: prepared.validation,
      numerical: null,
    };
  const failure = (error: unknown, error_type: "transport" | "adapter_invariant") => ({
    status: "UNISSUED CANDIDATE",
    execution: "error",
    category: "execution failure",
    error_type,
    reason_code: "NRS-INTERNAL-VERIFIER-ERROR",
    context: JSON.parse(prepared.value.packet).context,
    numerical: null,
    detail: error instanceof Error ? error.message : String(error),
    delivery: "T09 pending",
  });
  let result: unknown;
  try {
    result = await invoke(serializePrepared(prepared.value));
  } catch (error) {
    return failure(error, "transport");
  }
  try {
    return bindNumericalResult(prepared.value, result);
  } catch (error) {
    return failure(error, "adapter_invariant");
  }
}
