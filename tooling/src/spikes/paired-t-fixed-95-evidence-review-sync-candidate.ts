/** Fail-closed validation for the non-authoritative fixed-95 evidence review sync. */

const EXPECTED_CHECKPOINT = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: "paired-t-d5-fixed-95-critical-value-evidence-review-sync-1",
  decision_state: "reviewed_evidence_synchronization_candidate_pending_independent_review",
  m3_closed: false,
  evidence_review: {
    review_disposition:
      "governance/drafts/release-2-candidate/reviews/d5-critical-value-table-evidence-adversarial-review-disposition.md",
    reviewed_implementation: "19139d51aad108125ef9854c304c698ce9b15ade",
    review_result_commit: "24456c9d3d7faef56bbb731dac57045401780ea6",
    repair_commit: "0738558902dbcc851adbfd037a4f8f157370a46d",
    close_review_input_commit: "943a36fc82cacf163a20d49d58aff6e2e9988a27",
    close_review_result_commit: "ca68deadae3ccd6cc24f1bb49f4ac97ec5babd52",
    original_verdict: "GO",
    repair_verdict: "CLOSED",
    outstanding_findings: 0,
    reviewed_ordered_cell_content_hash:
      "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0",
    degrees_of_freedom_minimum: 1,
    degrees_of_freedom_maximum_evaluation: 200,
    entry_count: 200,
    contiguous_evidence_coverage_claimed: true,
    independent_numerical_review_complete: true,
    final_table_selected: false,
    final_content_hash: null,
    supported_degrees_of_freedom_maximum: null,
  },
  semantic_boundary: {
    table_lookup_reproduction_error: "zero_only_after_exact_selected_table_bytes",
    critical_value_truth_quantization_bound: "absolute_half_ulp_of_correctly_rounded_cell",
    confidence_interval_endpoint_truth_ledger_complete: false,
    two_route_independence: "method_distinct_shared_arb_flint_common_cause",
  },
  closure_state: {
    review_ledger_synchronized: true,
    final_table_selection: "unselected",
    confidence_interval_trace_composition: "incomplete",
    supported_platform_matrix: "pending",
    supported_execution_predicate: "unselected",
    supported_domain: false,
    runtime_support: false,
    final_reason_codes_frozen: false,
  },
  prohibited_claims: [
    "final_fixed_95_table_selected",
    "final_critical_value_table_content_hash",
    "supported_df_max",
    "complete_confidence_interval_truth_bound",
    "supported_platform_or_execution_predicate",
    "supported_runtime_paired_t",
    "final_reason_codes_frozen",
    "authoritative_public_check_or_bundle",
    "r2_d5_complete",
    "release_2_complete",
  ],
} as const;

function canonicalizeJson(value: unknown, ancestors = new Set<object>()): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    throw new TypeError("fixed-95 evidence sync contains non-JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("fixed-95 evidence sync contains a cycle");

  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key === "symbol")) {
    throw new TypeError("fixed-95 evidence sync contains a symbol key");
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
      throw new TypeError("fixed-95 evidence sync contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("fixed-95 evidence sync contains a non-JSON array entry");
      }
      result.push(canonicalizeJson(descriptor.value, nextAncestors));
    }
    return result;
  }

  if (Object.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("fixed-95 evidence sync contains a non-JSON object");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys) {
    if (typeof key !== "string") throw new TypeError("fixed-95 evidence sync has a non-string key");
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("fixed-95 evidence sync contains hidden or accessor data");
    }
    entries.push([key, canonicalizeJson(descriptor.value, nextAncestors)]);
  }
  return Object.fromEntries(
    entries.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0)),
  );
}

export function validatePairedTFixed95EvidenceReviewSyncCandidate(candidate: unknown): string[] {
  try {
    return JSON.stringify(canonicalizeJson(candidate)) ===
      JSON.stringify(canonicalizeJson(EXPECTED_CHECKPOINT))
      ? []
      : ["fixed-95 evidence review-sync checkpoint differs from the pending-review candidate"];
  } catch {
    return ["fixed-95 evidence review-sync checkpoint differs from the pending-review candidate"];
  }
}
