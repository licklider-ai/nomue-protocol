/** Fail-closed validation for the non-authoritative R2-D5 closure-gap checkpoint. */

import { createHash } from "node:crypto";

const EXPECTED_CANONICAL_SHA256 =
  "sha256:d29918115aa53327f1d68c72756f217f323d0a1bfaf4956a349f834f98943fb1";

function canonicalizeStrictJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("R2-D5 closure-gap checkpoint contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) {
    throw new TypeError("R2-D5 closure-gap checkpoint contains a cycle");
  }

  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key === "symbol")) {
    throw new TypeError("R2-D5 closure-gap checkpoint contains a symbol key");
  }
  const descriptors = Object.getOwnPropertyDescriptors(value);

  if (Array.isArray(value)) {
    const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length");
    if (
      lengthDescriptor === undefined ||
      !("value" in lengthDescriptor) ||
      typeof lengthDescriptor.value !== "number" ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0 ||
      keys.length !== lengthDescriptor.value + 1
    ) {
      throw new TypeError("R2-D5 closure-gap checkpoint contains an invalid array");
    }

    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("R2-D5 closure-gap checkpoint contains a non-JSON array entry");
      }
      result.push(canonicalizeStrictJson(descriptor.value, nextAncestors));
    }
    return result;
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("R2-D5 closure-gap checkpoint contains a non-JSON object");
  }

  const entries: Array<[string, unknown]> = [];
  for (const key of keys) {
    if (typeof key !== "string") {
      throw new TypeError("R2-D5 closure-gap checkpoint contains a non-string key");
    }
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("R2-D5 closure-gap checkpoint contains hidden or accessor data");
    }
    entries.push([key, canonicalizeStrictJson(descriptor.value, nextAncestors)]);
  }

  return Object.fromEntries(
    entries.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0)),
  );
}

function canonicalSha256(value: unknown): string {
  const bytes = JSON.stringify(canonicalizeStrictJson(value));
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

export function validatePairedTR2D5ClosureGapCandidate(candidate: unknown): string[] {
  try {
    return canonicalSha256(candidate) === EXPECTED_CANONICAL_SHA256
      ? []
      : ["R2-D5 closure-gap checkpoint differs from the pinned dependency inventory"];
  } catch {
    return ["R2-D5 closure-gap checkpoint differs from the pinned dependency inventory"];
  }
}
