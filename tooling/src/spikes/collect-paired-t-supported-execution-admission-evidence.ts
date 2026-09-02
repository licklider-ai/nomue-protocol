/** Collect non-authoritative exact-head Group 3 admission evidence. */

import { createHash } from "node:crypto";
import type {
  PairedObservationSpike,
  PairedTSpikeInput,
} from "../../../reference/spikes/paired-t.js";
import { evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate } from "./paired-t-supported-execution-admission-evidence-candidate.js";

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

function projectCase(caseId: string, input: PairedTSpikeInput): unknown {
  const result = evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate(input);
  if (!result.ok) {
    if (caseId !== "confidence-interval-collapse-refusal") {
      throw new Error(
        `${caseId} unexpectedly refused: ${result.classification}/${result.upstreamClassification ?? "none"}`,
      );
    }
    return {
      case_id: caseId,
      ok: false,
      classification: result.classification,
      upstream_classification: result.upstreamClassification ?? null,
      support_claims: {
        exact_runtime_allowlist_selected: result.exactRuntimeAllowlistSelected,
        controlled_process_profile_selected: result.controlledProcessProfileSelected,
        cross_platform_admission_evidence_complete: result.crossPlatformAdmissionEvidenceComplete,
        supported_execution_predicate_selected: result.supportedExecutionPredicateSelected,
        group_3_complete: result.group3Complete,
        supported_execution_predicate_satisfied: result.supportedExecutionPredicateSatisfied,
        supported_platform_claimed: result.supportedPlatformClaimed,
        supported_domain_claimed: result.supportedDomainClaimed,
        runtime_support_claimed: result.runtimeSupportClaimed,
      },
    };
  }
  if (caseId === "confidence-interval-collapse-refusal") {
    throw new Error("confidence-interval collapse case unexpectedly succeeded");
  }
  return {
    case_id: caseId,
    ok: true,
    n_pairs: result.group2.result.nPairs,
    degrees_of_freedom: result.group2.result.degreesOfFreedom,
    p_value_binary64_hex: result.group2.result.pValueBinary64Hex,
    lower_endpoint_binary64_hex: result.group2.envelope.link.lower_endpoint_binary64_hex,
    upper_endpoint_binary64_hex: result.group2.envelope.link.upper_endpoint_binary64_hex,
    full_trace_sha256: result.group2.envelope.sha256,
    g4_trace_sha256: result.group2.envelope.link.g4_trace_sha256,
    tail_trace_sha256: result.group2.envelope.link.tail_trace_sha256,
    ci_trace_sha256: result.group2.envelope.link.ci_trace_sha256,
    tail_table_content_hash: result.group2.envelope.link.tail_table_content_hash,
    fixed_95_table_content_hash: result.group2.envelope.link.fixed_95_table_content_hash,
    resource: result.group2.envelope.resource,
    support_claims: {
      exact_runtime_allowlist_selected: result.exactRuntimeAllowlistSelected,
      controlled_process_profile_selected: result.controlledProcessProfileSelected,
      cross_platform_admission_evidence_complete: result.crossPlatformAdmissionEvidenceComplete,
      supported_execution_predicate_selected: result.supportedExecutionPredicateSelected,
      group_3_complete: result.group3Complete,
      supported_execution_predicate_satisfied: result.supportedExecutionPredicateSatisfied,
      supported_platform_claimed: result.supportedPlatformClaimed,
      supported_domain_claimed: result.supportedDomainClaimed,
      runtime_support_claimed: result.runtimeSupportClaimed,
    },
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
      const warm = evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate(CASES[1]!.input);
      if (!warm.ok) throw new Error(`hot warm-up refused: ${warm.classification}`);
    }
  }

  const rows = CASES.map(({ caseId, input }) => projectCase(caseId, input));
  const environmentResult = evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate(
    CASES[1]!.input,
  );
  if (!environmentResult.ok) {
    throw new Error(`environment capture refused: ${environmentResult.classification}`);
  }
  const manifest = {
    format: "paired-t-supported-execution-admission-evidence-v1",
    status: "non_authoritative_candidate_evidence",
    candidate_commit: candidateCommit,
    mode,
    environment: environmentResult.environment,
    case_count: rows.length,
    rows,
    platform_neutral_rollup: sha256(rows),
    support_selected_or_claimed: false,
  };
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  if (mode === "hot") process.stderr.write(serialized);
  else process.stdout.write(serialized);
}

main();
