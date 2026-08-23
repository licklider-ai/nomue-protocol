/**
 * Registry-order invariance for bundle routing (NRS-VERSION-0007).
 *
 * Dispatch is exact identifier lookup, so permuting the interpretation
 * bundle registry entries must change nothing. Fixtures ROUTE-007
 * (reversed) and ROUTE-008 (deterministically shuffled) replay a pinned
 * probe set against permuted registry orders and require outcomes identical
 * to the canonical order: same exit code, same refusal kind and reason
 * codes, same selected conformance check identifier, and same verification
 * semantic projection.
 */

import {
  buildVerifierResources,
  type BundleEntry,
} from "../../../reference/verifier/src/resources.js";
import { semanticProjectionHash } from "../../../reference/verifier/src/projection.js";
import {
  verifyRecordTextWithResources,
  type VerifyOutcome,
} from "../../../reference/verifier/src/verify.js";
import { readText } from "../lib/repo.js";

export type RegistryOrder = "reversed" | "seeded_shuffle";

export interface RoutingInvarianceInput {
  routing_invariance: {
    registry_order: RegistryOrder;
    probes: string[];
  };
}

/**
 * Deterministic Fisher-Yates shuffle driven by a fixed linear congruential
 * generator (no environment-dependent randomness): the same input order
 * always yields the same permutation, so the fixture outcome is
 * reproducible on every platform.
 *
 * A shuffle that lands on the identity permutation proves nothing about
 * order independence (the independent routing review caught exactly this
 * for small registries), so an identity result is rotated by one position:
 * the returned permutation always differs from the input order for length
 * >= 2 while remaining deterministic.
 */
export function deterministicShuffle<T>(items: T[]): T[] {
  const out = [...items];
  let state = 0x6e6f6d75; // "nomu"
  const next = (): number => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    const a = out[i] as T;
    out[i] = out[j] as T;
    out[j] = a;
  }
  if (out.length >= 2 && out.every((value, index) => value === items[index])) {
    out.push(out.shift() as T);
  }
  return out;
}

function permutation(order: RegistryOrder): (entries: BundleEntry[]) => BundleEntry[] {
  if (order === "reversed") return (entries) => [...entries].reverse();
  return (entries) => deterministicShuffle(entries);
}

/**
 * Semantically comparable projection of a verify outcome. generated_at and
 * verifier identity are excluded by construction (refusal fields compared
 * are the stable ones; reports compare by conformance check id and semantic
 * projection hash).
 */
export function outcomeKey(outcome: VerifyOutcome): string {
  if (outcome.refusal !== undefined) {
    return JSON.stringify({
      exit: outcome.exitCode,
      kind: outcome.refusal.refusal_kind,
      reason_codes: [...outcome.refusal.reason_codes].sort(),
      declared_bundle_id: outcome.refusal.declared_bundle_id ?? null,
      limit_category: outcome.refusal.limit_category ?? null,
      selected_bundle: null,
    });
  }
  if (outcome.report !== undefined) {
    return JSON.stringify({
      exit: outcome.exitCode,
      conformance_check_id: outcome.report.conformance.check_id,
      semantic_projection: semanticProjectionHash(outcome.report),
    });
  }
  return JSON.stringify({ exit: outcome.exitCode });
}

export interface RoutingInvarianceResult {
  identical: boolean;
  mismatches: string[];
  probeCount: number;
}

export function runRoutingInvariance(input: RoutingInvarianceInput): RoutingInvarianceResult {
  const { registry_order: order, probes } = input.routing_invariance;
  const canonical = buildVerifierResources();
  const permuted = buildVerifierResources(permutation(order));
  const mismatches: string[] = [];
  for (const probe of probes) {
    const text = readText(probe);
    const canonicalKey = outcomeKey(verifyRecordTextWithResources(text, canonical));
    const permutedKey = outcomeKey(verifyRecordTextWithResources(text, permuted));
    if (canonicalKey !== permutedKey) {
      mismatches.push(`${probe}: ${canonicalKey} != ${permutedKey}`);
    }
  }
  return { identical: mismatches.length === 0, mismatches, probeCount: probes.length };
}
