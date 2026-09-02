/**
 * Fail-closed validator for the non-authoritative final R2-D5 review-readiness
 * package. The package assembles reviewed candidate evidence; it does not make
 * the final R2-D5 selection or Steward disposition.
 */

import { createHash } from "node:crypto";

const EXPECTED_CHECKPOINT_CANONICAL_SHA256 =
  "sha256:ebd69fa3eb30483e6be54e90e0146cd2f52a8b6648eca4bfdd4052dbfbe7712f";
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 20_000;
const VALIDATION_ERROR = "final R2-D5 review-readiness checkpoint differs from the exact candidate";

function strictDataCopy(value: unknown, ancestors = new Set<object>(), sortKeys = false): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError("final R2-D5 review-readiness checkpoint is not canonical JSON");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) {
    throw new TypeError("final R2-D5 review-readiness checkpoint contains a cycle");
  }
  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("final R2-D5 review-readiness checkpoint contains symbol keys");
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
      throw new TypeError("final R2-D5 review-readiness checkpoint contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError(
          "final R2-D5 review-readiness checkpoint contains a non-data array entry",
        );
      }
      result.push(strictDataCopy(descriptor.value, nextAncestors, sortKeys));
    }
    return result;
  }
  if (Reflect.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("final R2-D5 review-readiness checkpoint contains a non-plain object");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError(
        "final R2-D5 review-readiness checkpoint contains hidden or accessor data",
      );
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

/** Validate the exact candidate package without invoking caller-owned accessors. */
export function validatePairedTFinalR2D5ReviewReadinessCandidate(candidate: unknown): string[] {
  try {
    return canonicalSha256(candidate) === EXPECTED_CHECKPOINT_CANONICAL_SHA256
      ? []
      : [VALIDATION_ERROR];
  } catch {
    return [VALIDATION_ERROR];
  }
}
