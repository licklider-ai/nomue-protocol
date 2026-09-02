import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTSupportedExecutionSelectionCandidate,
  validatePairedTSupportedExecutionSelectionCheckpoint,
} from "../src/spikes/paired-t-supported-execution-selection-candidate.js";
import {
  validateDurablePairedTAdmissionEvidenceBundle,
  validatePairedTSupportedExecutionSelectionEvidenceManifests,
} from "../src/spikes/validate-paired-t-supported-execution-selection-evidence.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/supported-execution-selection-candidate.json",
);
const priorEvidenceDirectory = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/group-3-admission-evidence-5563bae",
);
const selectionRollup = "a53970d7f00b5823b2e601faaafa6dd900b7cf69ab51b4896feba7433761be20";
const checkpointSha256 = "sha256:5b00688bb049c37cd07ec7a3a92b15f82a8bb1e6dae382f180cdcbaf8a8be22d";

type MutableJson = Record<string, any>;

function loadCheckpoint(): MutableJson {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as MutableJson;
}

function ordinaryInput(): unknown {
  return {
    conditionOrder: ["first", "second"],
    repeatedMeasurements: "none",
    observations: [1, 2, 3].flatMap((difference, index) => [
      {
        observationId: `first-${index}`,
        experimentalUnitId: `first-unit-${index}`,
        pairId: `pair-${index}`,
        conditionId: "first",
        outcomeValue: difference,
      },
      {
        observationId: `second-${index}`,
        experimentalUnitId: `second-unit-${index}`,
        pairId: `pair-${index}`,
        conditionId: "second",
        outcomeValue: 0,
      },
    ]),
  };
}

function selectionClaims(): unknown {
  return {
    candidate_supported_platform_matrix_selected: true,
    candidate_exact_runtime_allowlist_selected: true,
    candidate_controlled_process_profile_selected: true,
    every_selected_tuple_admission_evidence_complete: true,
    candidate_supported_execution_predicate_selected: true,
    selection_made_by_this_increment: true,
    selection_independent_review_complete: false,
    group_3_complete: false,
  };
}

function publicClaims(): unknown {
  return {
    authoritative_supported_platform_matrix_issued: false,
    authoritative_runtime_allowlist_issued: false,
    authoritative_controlled_process_profile_issued: false,
    authoritative_supported_execution_predicate_issued: false,
    supported_platform_claimed: false,
    supported_domain_claimed: false,
    runtime_support_claimed: false,
  };
}

function selectionManifest(mode: "cold" | "hot", commit: string): MutableJson {
  const prior = JSON.parse(
    readFileSync(path.join(priorEvidenceDirectory, `${mode}.normalized.json`), "utf8"),
  ) as MutableJson;
  const rows = prior.rows.map((row: MutableJson) => {
    const { support_claims: _supportClaims, ...core } = row;
    if (row.ok === false) {
      return {
        case_id: row.case_id,
        ok: false,
        classification: "candidate_supported_execution_predicate_refusal",
        upstream_classification: row.classification,
        upstream_detail: row.upstream_classification,
        candidate_selection: selectionClaims(),
        public_support_claims: publicClaims(),
      };
    }
    return {
      ...core,
      candidate_selection: selectionClaims(),
      public_support_claims: publicClaims(),
    };
  });
  return {
    format: "paired-t-supported-execution-selection-evidence-v1",
    status: "non_authoritative_group_3_selection_candidate_evidence",
    candidate_commit: commit,
    selection_checkpoint_canonical_sha256: checkpointSha256,
    mode,
    environment: prior.environment,
    case_count: 6,
    rows,
    platform_neutral_rollup: selectionRollup,
    candidate_selection_claimed: true,
    authoritative_support_selected_or_claimed: false,
  };
}

describe("R2-D5 Group 3 supported-execution selection candidate", () => {
  it("pins a one-entry candidate selection without authoritative support", () => {
    const checkpoint = loadCheckpoint();
    expect(validatePairedTSupportedExecutionSelectionCheckpoint(checkpoint)).toEqual([]);
    expect(
      validatePairedTSupportedExecutionSelectionCheckpoint(
        Object.fromEntries(Object.entries(checkpoint).reverse()),
      ),
    ).toEqual([]);
    expect(checkpoint).toMatchObject({
      decision_state: "candidate_selection_pending_exact_head_independent_review",
      selection_made_by_this_checkpoint: true,
      independent_review: "pending",
      group_3_complete: false,
      candidate_supported_platform_matrix: {
        selection_scope: "one_exact_tuple_only",
        entry_count: 1,
        candidate_matrix_selected: true,
        broad_cross_platform_support_claimed: false,
      },
      candidate_supported_execution_predicate: {
        candidate_predicate_selected: true,
        authoritative_protocol_predicate_issued: false,
      },
      non_promotions: {
        supported_domain: false,
        runtime_support: false,
        public_check: "unissued",
        supported_bundle: "unissued",
      },
    });
  });

  it("selects only the candidate boundary and keeps public support disabled", () => {
    const result = evaluatePairedTSupportedExecutionSelectionCandidate(ordinaryInput());
    expect(result).toMatchObject({
      ok: false,
      classification: "candidate_supported_execution_predicate_refusal",
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
      candidateSupportedExecutionPredicateSatisfied: false,
    });
    expect(Object.isFrozen(result)).toBe(true);
  });

  it("validates the durable reviewed evidence bundle byte-for-byte", () => {
    expect(validateDurablePairedTAdmissionEvidenceBundle()).toEqual([]);
  });

  it("accepts exact cold/hot selection evidence and rejects coherent drift", () => {
    const exactCommit = "a".repeat(40);
    const cold = selectionManifest("cold", exactCommit);
    const hot = selectionManifest("hot", exactCommit);
    expect(
      validatePairedTSupportedExecutionSelectionEvidenceManifests(cold, hot, exactCommit),
    ).toEqual([]);

    const attacks: Array<(value: MutableJson) => void> = [
      (value) => {
        value.rows[0].candidate_selection.group_3_complete = true;
      },
      (value) => {
        value.rows[0].public_support_claims.runtime_support_claimed = true;
      },
      (value) => {
        value.rows[0].p_value_binary64_hex = "0000000000000000";
      },
      (value) => {
        value.selection_checkpoint_canonical_sha256 = `sha256:${"0".repeat(64)}`;
      },
      (value) => {
        value.authoritative_support_selected_or_claimed = true;
      },
      (value) => {
        value.undeclared = true;
      },
    ];
    for (const attack of attacks) {
      const attackedCold = structuredClone(cold) as MutableJson;
      const attackedHot = structuredClone(hot) as MutableJson;
      attack(attackedCold);
      attack(attackedHot);
      attackedCold.platform_neutral_rollup = selectionRollup;
      attackedHot.platform_neutral_rollup = selectionRollup;
      expect(
        validatePairedTSupportedExecutionSelectionEvidenceManifests(
          attackedCold,
          attackedHot,
          exactCommit,
        ),
      ).not.toEqual([]);
    }
  });

  it("rejects checkpoint promotion and hostile JavaScript shapes without getters", () => {
    const attacks: Array<(value: MutableJson) => void> = [
      (value) => {
        value.source_snapshot.repository_commit = "0".repeat(40);
      },
      (value) => {
        value.candidate_supported_platform_matrix.entry_count = 2;
      },
      (value) => {
        value.candidate_supported_platform_matrix.broad_cross_platform_support_claimed = true;
      },
      (value) => {
        value.review_and_closure_state.group_3_complete = true;
      },
      (value) => {
        value.non_promotions.authoritative_supported_execution_predicate_issued = true;
      },
      (value) => {
        value.non_promotions.runtime_support = true;
      },
      (value) => {
        value.undeclared = true;
      },
    ];
    for (const attack of attacks) {
      const checkpoint = structuredClone(loadCheckpoint()) as MutableJson;
      attack(checkpoint);
      expect(validatePairedTSupportedExecutionSelectionCheckpoint(checkpoint)).not.toEqual([]);
    }

    const hidden = loadCheckpoint();
    Object.defineProperty(hidden, "support", { value: true, enumerable: false });
    expect(validatePairedTSupportedExecutionSelectionCheckpoint(hidden)).not.toEqual([]);

    const symbolic = loadCheckpoint() as Record<PropertyKey, unknown>;
    symbolic[Symbol("support")] = true;
    expect(validatePairedTSupportedExecutionSelectionCheckpoint(symbolic)).not.toEqual([]);

    let getterCalls = 0;
    const accessor = loadCheckpoint();
    Object.defineProperty(accessor, "status", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return "non_authoritative_candidate";
      },
    });
    expect(validatePairedTSupportedExecutionSelectionCheckpoint(accessor)).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const proxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTSupportedExecutionSelectionCheckpoint(proxy)).not.toThrow();

    const cyclic = loadCheckpoint();
    cyclic.cycle = cyclic;
    expect(validatePairedTSupportedExecutionSelectionCheckpoint(cyclic)).not.toEqual([]);

    const sparse = loadCheckpoint();
    sparse.source_snapshot.bindings.length += 1;
    expect(validatePairedTSupportedExecutionSelectionCheckpoint(sparse)).not.toEqual([]);
  });

  it("keeps the selection-evidence attack surface fail closed", () => {
    const exactCommit = "a".repeat(40);
    let getterCalls = 0;
    const accessor = {} as MutableJson;
    Object.defineProperty(accessor, "rows", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return [];
      },
    });
    expect(
      validatePairedTSupportedExecutionSelectionEvidenceManifests(accessor, accessor, exactCommit),
    ).not.toEqual([]);
    expect(getterCalls).toBe(0);

    const proxy = new Proxy(
      {},
      {
        ownKeys() {
          throw new Error("hostile ownKeys");
        },
      },
    );
    expect(() =>
      validatePairedTSupportedExecutionSelectionEvidenceManifests(proxy, proxy, exactCommit),
    ).not.toThrow();

    const cyclic: MutableJson = {};
    cyclic.cycle = cyclic;
    expect(
      validatePairedTSupportedExecutionSelectionEvidenceManifests(cyclic, cyclic, exactCommit),
    ).not.toEqual([]);

    const sparse: unknown[] = [];
    sparse.length = 2;
    expect(
      validatePairedTSupportedExecutionSelectionEvidenceManifests(sparse, sparse, exactCommit),
    ).not.toEqual([]);
  });
});
