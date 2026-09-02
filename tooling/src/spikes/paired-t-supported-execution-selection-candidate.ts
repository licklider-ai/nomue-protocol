/**
 * Non-authoritative Group 3 supported-execution selection candidate.
 *
 * The candidate selects one exact tuple, one controlled-process profile, and
 * their composition with the closed Group 2 full-trace predicate. It does not
 * issue Protocol support, close Group 3 before review preservation, or enable
 * a supported domain/runtime.
 */

import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import {
  evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate,
  type PairedTSupportedExecutionAdmissionEvidenceCandidateResult,
} from "./paired-t-supported-execution-admission-evidence-candidate.js";

const EXPECTED_CHECKPOINT_CANONICAL_SHA256 =
  "sha256:d1fd8bcbeeb6166c6ec23b0477fd1876be23e8e4c02dff79cdce135de3c8ce4d";
const SELECTION_STATUS = "non_authoritative_group_3_supported_execution_selection_evaluation";
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 140_000;

type JsonRecord = Record<string, unknown>;
type AdmissionSuccess = Extract<
  PairedTSupportedExecutionAdmissionEvidenceCandidateResult,
  { ok: true }
>;

interface SelectionBoundary {
  candidateSupportedPlatformMatrixSelected: true;
  candidateExactRuntimeAllowlistSelected: true;
  candidateControlledProcessProfileSelected: true;
  everySelectedTupleAdmissionEvidenceComplete: true;
  candidateSupportedExecutionPredicateSelected: true;
  selectionMadeByThisIncrement: true;
  selectionIndependentReviewComplete: false;
  group3Complete: false;
  authoritativeSupportedPlatformMatrixIssued: false;
  authoritativeRuntimeAllowlistIssued: false;
  authoritativeControlledProcessProfileIssued: false;
  authoritativeSupportedExecutionPredicateIssued: false;
  supportedPlatformClaimed: false;
  supportedDomainClaimed: false;
  runtimeSupportClaimed: false;
}

export type PairedTSupportedExecutionSelectionCandidateResult =
  | (SelectionBoundary & {
      ok: true;
      status: typeof SELECTION_STATUS;
      admission: AdmissionSuccess;
      candidateSupportedExecutionPredicateSatisfied: true;
    })
  | (SelectionBoundary & {
      ok: false;
      status: typeof SELECTION_STATUS;
      classification: "candidate_supported_execution_predicate_refusal";
      upstreamClassification: string;
      upstreamDetail: string | null;
      candidateSupportedExecutionPredicateSatisfied: false;
    });

const SELECTION_BOUNDARY: SelectionBoundary = {
  candidateSupportedPlatformMatrixSelected: true,
  candidateExactRuntimeAllowlistSelected: true,
  candidateControlledProcessProfileSelected: true,
  everySelectedTupleAdmissionEvidenceComplete: true,
  candidateSupportedExecutionPredicateSelected: true,
  selectionMadeByThisIncrement: true,
  selectionIndependentReviewComplete: false,
  group3Complete: false,
  authoritativeSupportedPlatformMatrixIssued: false,
  authoritativeRuntimeAllowlistIssued: false,
  authoritativeControlledProcessProfileIssued: false,
  authoritativeSupportedExecutionPredicateIssued: false,
  supportedPlatformClaimed: false,
  supportedDomainClaimed: false,
  runtimeSupportClaimed: false,
};

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (typeof value !== "object" || value === null || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

/** Evaluate the selected candidate predicate while keeping public support disabled. */
export function evaluatePairedTSupportedExecutionSelectionCandidate(
  input: unknown,
): PairedTSupportedExecutionSelectionCandidateResult {
  try {
    const admission = evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate(input);
    if (!admission.ok) {
      return deepFreeze({
        ok: false,
        status: SELECTION_STATUS,
        classification: "candidate_supported_execution_predicate_refusal",
        upstreamClassification: admission.classification,
        upstreamDetail: admission.upstreamClassification ?? null,
        candidateSupportedExecutionPredicateSatisfied: false,
        ...SELECTION_BOUNDARY,
      });
    }
    return deepFreeze({
      ok: true,
      status: SELECTION_STATUS,
      admission,
      candidateSupportedExecutionPredicateSatisfied: true,
      ...SELECTION_BOUNDARY,
    });
  } catch {
    return deepFreeze({
      ok: false,
      status: SELECTION_STATUS,
      classification: "candidate_supported_execution_predicate_refusal",
      upstreamClassification: "selection_evaluation_failed_closed",
      upstreamDetail: null,
      candidateSupportedExecutionPredicateSatisfied: false,
      ...SELECTION_BOUNDARY,
    });
  }
}

function strictDataCopy(value: unknown, ancestors = new Set<object>(), sortKeys = false): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError("Group 3 selection checkpoint contains non-canonical JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("Group 3 selection checkpoint contains a cycle");
  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("Group 3 selection checkpoint contains symbol keys");
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
      throw new TypeError("Group 3 selection checkpoint contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("Group 3 selection checkpoint contains a non-data array entry");
      }
      result.push(strictDataCopy(descriptor.value, nextAncestors, sortKeys));
    }
    return result;
  }
  if (Reflect.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("Group 3 selection checkpoint contains a non-plain object");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("Group 3 selection checkpoint contains hidden or accessor data");
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

/** Fail-closed exact validation for the Group 3 selection checkpoint. */
export function validatePairedTSupportedExecutionSelectionCheckpoint(candidate: unknown): string[] {
  try {
    return isDeepStrictEqual(canonicalSha256(candidate), EXPECTED_CHECKPOINT_CANONICAL_SHA256)
      ? []
      : ["supported-execution selection checkpoint differs from the exact candidate"];
  } catch {
    return ["supported-execution selection checkpoint differs from the exact candidate"];
  }
}
