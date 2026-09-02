/**
 * Fail-closed validator and lookup surface for the non-authoritative R2-D5
 * Group 4 final reason-code inventory candidate.
 *
 * The candidate does not issue or freeze reason codes. Its exact checkpoint
 * only selects the inventory that must receive independent review.
 */

import { createHash } from "node:crypto";

const EXPECTED_CHECKPOINT_CANONICAL_SHA256 =
  "sha256:ad2c69ed530686b95f02d83b425391d4c87da0eefa22ce0e66914066dd00ad45";
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 20_000;
const VALIDATION_ERROR = "final reason-code inventory checkpoint differs from the exact candidate";

type JsonRecord = Record<string, unknown>;

export interface PairedTFinalReasonCodeResolution {
  classification: string;
  disposition: "reason_code" | "delegate" | "internal_only";
  reasonCode: string | null;
  reasonCodeState: "candidate_unissued" | "registered_reuse" | null;
  routing: string | null;
}

function strictDataCopy(value: unknown, ancestors = new Set<object>(), sortKeys = false): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError("reason-code inventory contains non-canonical JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("reason-code inventory contains a cycle");
  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("reason-code inventory contains symbol keys");
  }
  const descriptors = Object.getOwnPropertyDescriptors(value);
  if (Array.isArray(value)) {
    const lengthDescriptor = Reflect.getOwnPropertyDescriptor(value, "length");
    if (
      Reflect.getPrototypeOf(value) !== Array.prototype ||
      lengthDescriptor === undefined ||
      !("value" in lengthDescriptor) ||
      typeof lengthDescriptor.value !== "number" ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0 ||
      lengthDescriptor.value > MAXIMUM_CLOSED_JSON_ARRAY_LENGTH ||
      keys.length !== lengthDescriptor.value + 1
    ) {
      throw new TypeError("reason-code inventory contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("reason-code inventory contains a non-data array entry");
      }
      result.push(strictDataCopy(descriptor.value, nextAncestors, sortKeys));
    }
    return result;
  }
  if (Reflect.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("reason-code inventory contains a non-plain object");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("reason-code inventory contains hidden or accessor data");
    }
    entries.push([key, strictDataCopy(descriptor.value, nextAncestors, sortKeys)]);
  }
  if (sortKeys) {
    entries.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
  }
  return Object.fromEntries(entries);
}

function canonicalSha256(value: unknown): string {
  const canonical = strictDataCopy(value, new Set<object>(), true);
  return `sha256:${createHash("sha256").update(JSON.stringify(canonical), "utf8").digest("hex")}`;
}

function asRecord(value: unknown): JsonRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("expected a record");
  }
  return value as JsonRecord;
}

function asRecords(value: unknown): JsonRecord[] {
  if (!Array.isArray(value)) throw new TypeError("expected an array");
  return value.map(asRecord);
}

/** Fail-closed exact validation for the Group 4 selection checkpoint. */
export function validatePairedTFinalReasonCodeInventoryCandidate(candidate: unknown): string[] {
  try {
    return canonicalSha256(candidate) === EXPECTED_CHECKPOINT_CANONICAL_SHA256
      ? []
      : [VALIDATION_ERROR];
  } catch {
    return [VALIDATION_ERROR];
  }
}

/**
 * Resolve a source classification from an already exact candidate checkpoint.
 * Unknown classifications fail closed by returning null.
 */
export function resolvePairedTFinalReasonCodeCandidate(
  candidate: unknown,
  classification: string,
): PairedTFinalReasonCodeResolution | null {
  try {
    const copied = asRecord(strictDataCopy(candidate));
    if (canonicalSha256(copied) !== EXPECTED_CHECKPOINT_CANONICAL_SHA256) return null;
    const mappingGroups = [
      asRecords(copied.record_level_reason_mappings),
      asRecords(copied.relationship_reason_mappings),
      asRecords(copied.resolved_support_dependent_reason_code_decisions),
      asRecords(copied.runtime_classification_routing),
    ];
    for (const group of mappingGroups) {
      const entry = group.find((item) => item.source_classification === classification);
      if (entry !== undefined) {
        const reasonCode = typeof entry.reason_code === "string" ? entry.reason_code : null;
        const reasonCodeState =
          entry.reason_code_state === "candidate_unissued" ||
          entry.reason_code_state === "registered_reuse"
            ? entry.reason_code_state
            : null;
        const routing = typeof entry.routing === "string" ? entry.routing : null;
        return Object.freeze({
          classification,
          disposition: reasonCode === null ? "delegate" : "reason_code",
          reasonCode,
          reasonCodeState,
          routing,
        });
      }
    }
    const internal = copied.internal_only_classifications;
    if (Array.isArray(internal) && internal.includes(classification)) {
      return Object.freeze({
        classification,
        disposition: "internal_only",
        reasonCode: null,
        reasonCodeState: null,
        routing: "not_record_caused",
      });
    }
    return null;
  } catch {
    return null;
  }
}
