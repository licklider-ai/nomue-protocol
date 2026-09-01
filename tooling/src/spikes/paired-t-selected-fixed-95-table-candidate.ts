/** Fail-closed validation for the selected fixed-95 candidate table content. */

import { createHash } from "node:crypto";

type JsonRecord = Record<string, unknown>;

const EXPECTED_CONTENT_HASH =
  "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0";
const HEX64 = /^[0-9a-f]{16}$/;

function strictJsonCopy(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("selected fixed-95 table contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("selected fixed-95 table contains a cycle");

  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key === "symbol")) {
    throw new TypeError("selected fixed-95 table contains symbol keys");
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
      throw new TypeError("selected fixed-95 table contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("selected fixed-95 table contains a non-JSON array entry");
      }
      result.push(strictJsonCopy(descriptor.value, nextAncestors));
    }
    return result;
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("selected fixed-95 table contains a non-JSON object");
  }
  const result: JsonRecord = {};
  for (const key of keys) {
    if (typeof key !== "string") {
      throw new TypeError("selected fixed-95 table contains a non-string key");
    }
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("selected fixed-95 table contains hidden or accessor data");
    }
    result[key] = strictJsonCopy(descriptor.value, nextAncestors);
  }
  return result;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactKeys(value: JsonRecord, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((entry, index) => entry === wanted[index]);
}

function orderedContentHash(hexByDf: string[]): string {
  const lines = ["nomue-paired-t-fixed-95-table-v1", "two-sided-tail-target=1/20"];
  lines.push(...hexByDf.map((hex, index) => `df=${index + 1};binary64=${hex}`));
  return `sha256:${createHash("sha256")
    .update(`${lines.join("\n")}\n`)
    .digest("hex")}`;
}

function positiveFiniteBits(hex: unknown): bigint | undefined {
  if (typeof hex !== "string" || !HEX64.test(hex)) return undefined;
  const bits = BigInt(`0x${hex}`);
  if (bits >> 63n !== 0n || bits === 0n) return undefined;
  return ((bits >> 52n) & 0x7ffn) === 0x7ffn ? undefined : bits;
}

export function validatePairedTSelectedFixed95TableCandidate(candidate: unknown): string[] {
  let copied: unknown;
  try {
    copied = strictJsonCopy(candidate);
  } catch {
    return ["selected fixed-95 table is not strict closed JSON"];
  }
  if (!isRecord(copied)) return ["selected fixed-95 table root is not an object"];

  const errors: string[] = [];
  if (
    !exactKeys(copied, [
      "status",
      "issuance",
      "review_issue",
      "candidate_key",
      "selection_state",
      "selection_review_result",
      "independent_selection_review_complete",
      "m3_closed",
      "runtime_support_enabled",
      "supported_degrees_of_freedom_maximum",
      "target",
      "reviewed_source",
      "coverage",
      "critical_value_binary64_hex_by_df",
      "held_decisions",
      "prohibited_claims",
    ])
  ) {
    errors.push("selected fixed-95 table keys are incomplete or contain an undeclared item");
    return errors;
  }

  if (
    copied.status !== "non_authoritative_candidate" ||
    copied.issuance !== "unissued" ||
    copied.review_issue !== "https://github.com/licklider-ai/nomue-protocol/issues/25" ||
    copied.candidate_key !== "paired-t-d5-fixed-95-critical-value-table-selected-candidate-1" ||
    copied.selection_state !== "exact_reviewed_table_content_selected_for_candidate_ci_work_only" ||
    copied.selection_review_result !==
      "review-inputs/r2-d5-fixed-95-table-selection/REVIEW-RESULT.md" ||
    copied.independent_selection_review_complete !== true ||
    copied.m3_closed !== true ||
    copied.runtime_support_enabled !== false ||
    copied.supported_degrees_of_freedom_maximum !== null
  ) {
    errors.push("selected fixed-95 table identity, maturity, or support boundary is not pinned");
  }

  const target = copied.target;
  if (
    !isRecord(target) ||
    !exactKeys(target, [
      "confidence_level",
      "two_sided_tail_probability",
      "target_format",
      "rounding_mode",
    ]) ||
    target.confidence_level !== "19/20" ||
    target.two_sided_tail_probability !== "1/20" ||
    target.target_format !== "binary64" ||
    target.rounding_mode !== "roundTiesToEven"
  ) {
    errors.push("selected fixed-95 target differs from the reviewed target");
  }

  const source = copied.reviewed_source;
  if (
    !isRecord(source) ||
    !exactKeys(source, [
      "reviewed_implementation",
      "evidence_review_sync_artifact",
      "evidence_review_result",
      "source_workflow_run_id",
      "source_artifact_id",
      "source_artifact_zip_sha256",
      "source_table_file_sha256",
      "reviewed_ordered_cell_content_hash",
    ]) ||
    source.reviewed_implementation !== "19139d51aad108125ef9854c304c698ce9b15ade" ||
    source.evidence_review_sync_artifact !==
      "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-evidence-review-sync-candidate.json" ||
    source.evidence_review_result !==
      "review-inputs/r2-d5-fixed-95-evidence-review-sync/REVIEW-RESULT.md" ||
    source.source_workflow_run_id !== 33323884790 ||
    source.source_artifact_id !== 9735667748 ||
    source.source_artifact_zip_sha256 !==
      "sha256:bebf3e84edcb5e9b5aa63882d80f105e823786aec1dd155334483ca71b1826bd" ||
    source.source_table_file_sha256 !==
      "sha256:666bf952e205a3a2fb54f2d197e3e9d613a3c9833b295ba6526cfc516b231bbb" ||
    source.reviewed_ordered_cell_content_hash !== EXPECTED_CONTENT_HASH
  ) {
    errors.push("selected fixed-95 source receipt differs from the reviewed evidence");
  }

  const coverage = copied.coverage;
  if (
    !isRecord(coverage) ||
    !exactKeys(coverage, [
      "degrees_of_freedom_minimum",
      "degrees_of_freedom_maximum_evidence",
      "entry_count",
      "contiguous_evidence_coverage_claimed",
      "contiguous_protocol_support_claimed",
    ]) ||
    coverage.degrees_of_freedom_minimum !== 1 ||
    coverage.degrees_of_freedom_maximum_evidence !== 200 ||
    coverage.entry_count !== 200 ||
    coverage.contiguous_evidence_coverage_claimed !== true ||
    coverage.contiguous_protocol_support_claimed !== false
  ) {
    errors.push("selected fixed-95 evidence coverage or non-support boundary is not pinned");
  }

  const values = copied.critical_value_binary64_hex_by_df;
  if (!Array.isArray(values) || values.length !== 200) {
    errors.push("selected fixed-95 table must contain exactly 200 values");
  } else {
    let previousBits: bigint | undefined;
    for (let index = 0; index < values.length; index += 1) {
      const bits = positiveFiniteBits(values[index]);
      if (bits === undefined) {
        errors.push(`selected fixed-95 df=${index + 1} is not positive finite binary64`);
        continue;
      }
      if (previousBits !== undefined && bits >= previousBits) {
        errors.push(`selected fixed-95 values are not strictly decreasing at df=${index + 1}`);
      }
      previousBits = bits;
    }
    if (orderedContentHash(values as string[]) !== EXPECTED_CONTENT_HASH) {
      errors.push("selected fixed-95 ordered content hash differs from reviewed evidence");
    }
  }

  if (
    JSON.stringify(copied.held_decisions) !==
      JSON.stringify([
        "final_supported_degrees_of_freedom_maximum",
        "supported_platform_matrix",
        "supported_execution_predicate",
        "runtime_support_activation",
        "final_reason_codes",
      ]) ||
    JSON.stringify(copied.prohibited_claims) !==
      JSON.stringify([
        "supported_df_max",
        "global_confidence_interval_error_constant",
        "supported_platform_or_execution_predicate",
        "supported_runtime_paired_t",
        "authoritative_public_check_or_bundle",
        "r2_d5_complete",
        "release_2_complete",
      ])
  ) {
    errors.push("selected fixed-95 held decisions or prohibited claims changed");
  }

  return errors;
}
