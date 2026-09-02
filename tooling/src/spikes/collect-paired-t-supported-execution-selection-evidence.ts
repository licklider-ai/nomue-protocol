/** Collect exact-head evidence for the non-authoritative Group 3 selection candidate. */

import { createHash } from "node:crypto";
import type {
  PairedObservationSpike,
  PairedTSpikeInput,
} from "../../../reference/spikes/paired-t.js";
import { evaluatePairedTSupportedExecutionSelectionCandidate } from "./paired-t-supported-execution-selection-candidate.js";

type EvidenceMode = "cold" | "hot";

function observationsFromDifferences(differences: readonly number[]): PairedObservationSpike[] {
  return differences.flatMap((difference, index) => {
    const suffix = String(index + 1).padStart(3, "0");
    return [
      {
        observationId: `first-${suffix}`,
        experimentalUnitId: `first-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "first",
        outcomeValue: difference,
      },
      {
        observationId: `second-${suffix}`,
        experimentalUnitId: `second-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "second",
        outcomeValue: 0,
      },
    ];
  });
}

function inputFromDifferences(differences: readonly number[]): PairedTSpikeInput {
  return {
    conditionOrder: ["first", "second"],
    repeatedMeasurements: "none",
    observations: observationsFromDifferences(differences),
  };
}

function zeroMeanDifferences(nPairs: number): number[] {
  const half = Math.floor(nPairs / 2);
  const positive = Array.from({ length: half }, (_, index) => index + 1);
  const values = [...positive.map((value) => -value), ...positive];
  if (nPairs % 2 === 1) values.push(0);
  return values;
}

const nextAfterOne = 1 + Number.EPSILON;
const CASES: ReadonlyArray<{ caseId: string; input: PairedTSpikeInput }> = [
  { caseId: "minimum-pair-scope", input: inputFromDifferences([-1, 1]) },
  { caseId: "ordinary-central-branch", input: inputFromDifferences([1, 2, 3]) },
  { caseId: "ordinary-tail-branch", input: inputFromDifferences([1, 2, 4, 8]) },
  { caseId: "exact-zero-branch", input: inputFromDifferences(zeroMeanDifferences(31)) },
  { caseId: "maximum-pair-scope", input: inputFromDifferences(zeroMeanDifferences(201)) },
  {
    caseId: "confidence-interval-collapse-refusal",
    input: inputFromDifferences(
      Array.from({ length: 201 }, (_, index) => (index % 2 === 0 ? nextAfterOne : 1)),
    ),
  },
];

function candidateSelectionProjection(result: {
  candidateSupportedPlatformMatrixSelected: boolean;
  candidateExactRuntimeAllowlistSelected: boolean;
  candidateControlledProcessProfileSelected: boolean;
  everySelectedTupleAdmissionEvidenceComplete: boolean;
  candidateSupportedExecutionPredicateSelected: boolean;
  selectionMadeByThisIncrement: boolean;
  selectionIndependentReviewComplete: boolean;
  group3Complete: boolean;
}): unknown {
  return {
    candidate_supported_platform_matrix_selected: result.candidateSupportedPlatformMatrixSelected,
    candidate_exact_runtime_allowlist_selected: result.candidateExactRuntimeAllowlistSelected,
    candidate_controlled_process_profile_selected: result.candidateControlledProcessProfileSelected,
    every_selected_tuple_admission_evidence_complete:
      result.everySelectedTupleAdmissionEvidenceComplete,
    candidate_supported_execution_predicate_selected:
      result.candidateSupportedExecutionPredicateSelected,
    selection_made_by_this_increment: result.selectionMadeByThisIncrement,
    selection_independent_review_complete: result.selectionIndependentReviewComplete,
    group_3_complete: result.group3Complete,
  };
}

function publicSupportProjection(result: {
  authoritativeSupportedPlatformMatrixIssued: boolean;
  authoritativeRuntimeAllowlistIssued: boolean;
  authoritativeControlledProcessProfileIssued: boolean;
  authoritativeSupportedExecutionPredicateIssued: boolean;
  supportedPlatformClaimed: boolean;
  supportedDomainClaimed: boolean;
  runtimeSupportClaimed: boolean;
}): unknown {
  return {
    authoritative_supported_platform_matrix_issued:
      result.authoritativeSupportedPlatformMatrixIssued,
    authoritative_runtime_allowlist_issued: result.authoritativeRuntimeAllowlistIssued,
    authoritative_controlled_process_profile_issued:
      result.authoritativeControlledProcessProfileIssued,
    authoritative_supported_execution_predicate_issued:
      result.authoritativeSupportedExecutionPredicateIssued,
    supported_platform_claimed: result.supportedPlatformClaimed,
    supported_domain_claimed: result.supportedDomainClaimed,
    runtime_support_claimed: result.runtimeSupportClaimed,
  };
}

function projectCase(caseId: string, input: PairedTSpikeInput): unknown {
  const result = evaluatePairedTSupportedExecutionSelectionCandidate(input);
  if (!result.ok) {
    if (caseId !== "confidence-interval-collapse-refusal") {
      throw new Error(`${caseId} unexpectedly refused: ${result.upstreamClassification}`);
    }
    return {
      case_id: caseId,
      ok: false,
      classification: result.classification,
      upstream_classification: result.upstreamClassification,
      upstream_detail: result.upstreamDetail,
      candidate_selection: candidateSelectionProjection(result),
      public_support_claims: publicSupportProjection(result),
    };
  }
  if (caseId === "confidence-interval-collapse-refusal") {
    throw new Error("confidence-interval collapse case unexpectedly succeeded");
  }
  const group2 = result.admission.group2;
  return {
    case_id: caseId,
    ok: true,
    n_pairs: group2.result.nPairs,
    degrees_of_freedom: group2.result.degreesOfFreedom,
    p_value_binary64_hex: group2.result.pValueBinary64Hex,
    lower_endpoint_binary64_hex: group2.envelope.link.lower_endpoint_binary64_hex,
    upper_endpoint_binary64_hex: group2.envelope.link.upper_endpoint_binary64_hex,
    full_trace_sha256: group2.envelope.sha256,
    g4_trace_sha256: group2.envelope.link.g4_trace_sha256,
    tail_trace_sha256: group2.envelope.link.tail_trace_sha256,
    ci_trace_sha256: group2.envelope.link.ci_trace_sha256,
    tail_table_content_hash: group2.envelope.link.tail_table_content_hash,
    fixed_95_table_content_hash: group2.envelope.link.fixed_95_table_content_hash,
    resource: group2.envelope.resource,
    candidate_selection: candidateSelectionProjection(result),
    public_support_claims: publicSupportProjection(result),
  };
}

function sha256(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex");
}

function main(): void {
  const mode = process.argv[2] as EvidenceMode | undefined;
  if (mode !== "cold" && mode !== "hot") throw new Error("usage: collector <cold|hot>");
  const candidateCommit = process.env.NOMUE_CANDIDATE_COMMIT;
  if (candidateCommit === undefined || !/^[0-9a-f]{40}$/.test(candidateCommit)) {
    throw new Error("NOMUE_CANDIDATE_COMMIT must be the exact 40-character head");
  }

  if (mode === "hot") {
    for (let pass = 0; pass < 24; pass += 1) {
      const warm = evaluatePairedTSupportedExecutionSelectionCandidate(CASES[1]!.input);
      if (!warm.ok) throw new Error(`hot warm-up refused: ${warm.upstreamClassification}`);
    }
  }

  const rows = CASES.map(({ caseId, input }) => projectCase(caseId, input));
  const environmentResult = evaluatePairedTSupportedExecutionSelectionCandidate(CASES[1]!.input);
  if (!environmentResult.ok) {
    throw new Error(`environment capture refused: ${environmentResult.upstreamClassification}`);
  }
  const manifest = {
    format: "paired-t-supported-execution-selection-evidence-v1",
    status: "non_authoritative_group_3_selection_candidate_evidence",
    candidate_commit: candidateCommit,
    selection_checkpoint_canonical_sha256:
      "sha256:5b00688bb049c37cd07ec7a3a92b15f82a8bb1e6dae382f180cdcbaf8a8be22d",
    mode,
    environment: environmentResult.admission.environment,
    case_count: rows.length,
    rows,
    platform_neutral_rollup: sha256(rows),
    candidate_selection_claimed: true,
    authoritative_support_selected_or_claimed: false,
  };
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  if (mode === "hot") process.stderr.write(serialized);
  else process.stdout.write(serialized);
}

main();
