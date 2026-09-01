/**
 * Fail-closed validation for the non-authoritative R2-D5 Group 1 candidate.
 *
 * This module pins the candidate checkpoint and its review corpus and exposes a
 * pure resource-envelope check. It does not select runtime support, a supported
 * platform, a public reason code, or an authoritative domain.
 */

import { createHash } from "node:crypto";

export const PAIRED_T_CANDIDATE_PAIR_COUNT_MINIMUM = 2;
export const PAIRED_T_CANDIDATE_PAIR_COUNT_MAXIMUM = 201;
export const PAIRED_T_CANDIDATE_DF_MINIMUM = 1;
export const PAIRED_T_CANDIDATE_DF_MAXIMUM = 200;
export const PAIRED_T_CANDIDATE_G4_TRACE_NODE_MAXIMUM = 1_008;
export const PAIRED_T_CANDIDATE_TAIL_TRACE_NODE_MAXIMUM = 100_000;
export const PAIRED_T_CANDIDATE_TAIL_ITERATION_CAP_MAXIMUM = 8_064;
export const PAIRED_T_CANDIDATE_CI_SPECIFIC_TRACE_NODE_COUNT = 3;
export const PAIRED_T_CANDIDATE_COMBINED_PRIMITIVE_TRACE_NODE_MAXIMUM = 101_011;

const EXPECTED_CHECKPOINT_CANONICAL_SHA256 =
  "sha256:f9337f1530a7835e8662c81935c205348fb13387bfbf5b1f4835f1c98d2d0a87";
const EXPECTED_CORPUS_CANONICAL_SHA256 =
  "sha256:19349e5ed5e4ebbe582abe426a6024398940915da04f5c1085f797b4c82d46a7";

const RESOURCE_KEYS = [
  "n_pairs",
  "degrees_of_freedom",
  "g4_trace_nodes",
  "tail_iterations",
  "tail_iteration_cap",
  "tail_trace_nodes",
  "ci_specific_trace_nodes",
  "combined_primitive_trace_nodes",
] as const;

export interface PairedTCandidateResourceEnvelopeInput {
  n_pairs: number;
  degrees_of_freedom: number;
  g4_trace_nodes: number;
  tail_iterations: number;
  tail_iteration_cap: number;
  tail_trace_nodes: number;
  ci_specific_trace_nodes: number;
  combined_primitive_trace_nodes: number;
}

export type PairedTCandidateResourceEnvelopeResult =
  | {
      ok: true;
      status: "non_authoritative_candidate_resource_envelope_evaluation";
      resource: Readonly<PairedTCandidateResourceEnvelopeInput>;
      candidateResourceEnvelopeSatisfied: true;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: "non_authoritative_candidate_resource_envelope_evaluation";
      classification: "outside_candidate_scope_or_resource_envelope";
      candidateResourceEnvelopeSatisfied: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

function canonicalizeStrictJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError("candidate scope data contains non-canonical JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("candidate scope data contains a cycle");

  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key === "symbol")) {
    throw new TypeError("candidate scope data contains a symbol key");
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
      throw new TypeError("candidate scope data contains an invalid array");
    }

    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("candidate scope data contains a non-JSON array entry");
      }
      result.push(canonicalizeStrictJson(descriptor.value, nextAncestors));
    }
    return result;
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("candidate scope data contains a non-JSON object");
  }

  const entries: Array<[string, unknown]> = [];
  for (const key of keys) {
    if (typeof key !== "string") {
      throw new TypeError("candidate scope data contains a non-string key");
    }
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("candidate scope data contains hidden or accessor data");
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

function failure(): PairedTCandidateResourceEnvelopeResult {
  return {
    ok: false,
    status: "non_authoritative_candidate_resource_envelope_evaluation",
    classification: "outside_candidate_scope_or_resource_envelope",
    candidateResourceEnvelopeSatisfied: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

function parseResourceInput(value: unknown): PairedTCandidateResourceEnvelopeInput | undefined {
  const copied = canonicalizeStrictJson(value);
  if (typeof copied !== "object" || copied === null || Array.isArray(copied)) return undefined;
  const record = copied as Record<string, unknown>;
  const keys = Object.keys(record);
  if (
    keys.length !== RESOURCE_KEYS.length ||
    keys.some((key) => !RESOURCE_KEYS.includes(key as (typeof RESOURCE_KEYS)[number]))
  ) {
    return undefined;
  }
  if (RESOURCE_KEYS.some((key) => !Number.isSafeInteger(record[key]))) return undefined;
  return record as unknown as PairedTCandidateResourceEnvelopeInput;
}

/** Validate the exact unissued Group 1 checkpoint without promoting it. */
export function validatePairedTCandidateSupportedScopeResourceBounds(candidate: unknown): string[] {
  try {
    return canonicalSha256(candidate) === EXPECTED_CHECKPOINT_CANONICAL_SHA256
      ? []
      : ["candidate supported-scope/resource checkpoint differs from its pinned selection"];
  } catch {
    return ["candidate supported-scope/resource checkpoint differs from its pinned selection"];
  }
}

/** Validate the exact executable review corpus without treating it as a domain. */
export function validatePairedTCandidateSupportedScopeResourceCorpus(candidate: unknown): string[] {
  try {
    return canonicalSha256(candidate) === EXPECTED_CORPUS_CANONICAL_SHA256
      ? []
      : ["candidate supported-scope/resource corpus differs from its pinned review corpus"];
  } catch {
    return ["candidate supported-scope/resource corpus differs from its pinned review corpus"];
  }
}

/**
 * Check exact resource identities and selected candidate ceilings.
 *
 * This is intentionally a pure, candidate-only check. Passing it is necessary
 * but not sufficient for a future supported-execution admission decision.
 */
export function evaluatePairedTCandidateResourceEnvelope(
  value: unknown,
): PairedTCandidateResourceEnvelopeResult {
  try {
    const resource = parseResourceInput(value);
    if (resource === undefined) return failure();

    const expectedDf = resource.n_pairs - 1;
    const expectedG4Nodes = 5 * resource.n_pairs + 3;
    const expectedTailIterationCap = 40 * resource.degrees_of_freedom + 64;
    const expectedCombinedNodes =
      resource.g4_trace_nodes + resource.tail_trace_nodes + resource.ci_specific_trace_nodes;

    if (
      resource.n_pairs < PAIRED_T_CANDIDATE_PAIR_COUNT_MINIMUM ||
      resource.n_pairs > PAIRED_T_CANDIDATE_PAIR_COUNT_MAXIMUM ||
      resource.degrees_of_freedom !== expectedDf ||
      resource.degrees_of_freedom < PAIRED_T_CANDIDATE_DF_MINIMUM ||
      resource.degrees_of_freedom > PAIRED_T_CANDIDATE_DF_MAXIMUM ||
      resource.g4_trace_nodes !== expectedG4Nodes ||
      resource.g4_trace_nodes > PAIRED_T_CANDIDATE_G4_TRACE_NODE_MAXIMUM ||
      resource.tail_iteration_cap !== expectedTailIterationCap ||
      resource.tail_iteration_cap > PAIRED_T_CANDIDATE_TAIL_ITERATION_CAP_MAXIMUM ||
      resource.tail_iterations < 0 ||
      resource.tail_iterations > resource.tail_iteration_cap ||
      resource.tail_trace_nodes < 1 ||
      resource.tail_trace_nodes > PAIRED_T_CANDIDATE_TAIL_TRACE_NODE_MAXIMUM ||
      resource.ci_specific_trace_nodes !== PAIRED_T_CANDIDATE_CI_SPECIFIC_TRACE_NODE_COUNT ||
      resource.combined_primitive_trace_nodes !== expectedCombinedNodes ||
      resource.combined_primitive_trace_nodes >
        PAIRED_T_CANDIDATE_COMBINED_PRIMITIVE_TRACE_NODE_MAXIMUM
    ) {
      return failure();
    }

    return {
      ok: true,
      status: "non_authoritative_candidate_resource_envelope_evaluation",
      resource: Object.freeze({ ...resource }),
      candidateResourceEnvelopeSatisfied: true,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    };
  } catch {
    return failure();
  }
}
