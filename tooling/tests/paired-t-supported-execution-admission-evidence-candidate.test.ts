import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate,
  validatePairedTAdmissionEnvironmentCandidate,
  validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint,
  type PairedTAdmissionEnvironmentCandidate,
} from "../src/spikes/paired-t-supported-execution-admission-evidence-candidate.js";
import { validatePairedTSupportedExecutionAdmissionEvidenceManifests } from "../src/spikes/validate-paired-t-supported-execution-admission-evidence.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/supported-execution-admission-evidence-candidate.json",
);

type MutableJson = Record<string, any>;

function loadCheckpoint(): MutableJson {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as MutableJson;
}

function validEnvironment(): PairedTAdmissionEnvironmentCandidate {
  return {
    runtime: "node",
    runtimeVersion: "24.19.0",
    engine: "v8",
    engineVersion: "13.6.233.17-node.51",
    platform: "linux",
    architecture: "x64",
    executableSha256: "bc17c508ffeed0ec622934f9b7fa72f8e78da65350e63c3eceb56fa688aa5e12",
    executablePath: "/candidate/runtime",
    modulePath: "/candidate/compiled/tooling/src/spikes/candidate.js",
    execArgv: [
      "--permission",
      "--no-addons",
      "--disallow-code-generation-from-strings",
      "--frozen-intrinsics",
      "--allow-fs-read=/candidate/compiled",
      "--allow-fs-read=/candidate/runtime",
    ],
    permissions: {
      addons: false,
      childProcess: false,
      workerThreads: false,
      wasi: false,
      inspector: false,
      filesystemWrite: false,
      executableRead: true,
      moduleRead: true,
    },
    intrinsics: {
      mathFrozen: true,
      arrayPrototypeFrozen: true,
      objectPrototypeFrozen: true,
      sqrtWritable: false,
      sqrtConfigurable: false,
    },
    sentinels: {
      addNext: true,
      addSubnormal: true,
      subtract: true,
      multiplySubnormal: true,
      divideTieToZero: true,
      divideTenth: true,
      sqrtTwo: true,
      negativeZero: true,
    },
  };
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

describe("R2-D5 Group 3 admission-evidence infrastructure candidate", () => {
  it("pins the exact non-promoting checkpoint", () => {
    const checkpoint = loadCheckpoint();
    expect(validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(checkpoint)).toEqual([]);
    expect(
      validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(
        Object.fromEntries(Object.entries(checkpoint).reverse()),
      ),
    ).toEqual([]);
    expect(checkpoint).toMatchObject({
      status: "non_authoritative_candidate",
      issuance: "unissued",
      decision_group: "supported_execution_admission",
      decision_state:
        "admission_evidence_infrastructure_pending_exact_head_evidence_and_independent_review",
      selection_made_by_this_checkpoint: false,
      group_1_dependency: "closed_with_preserved_exact_head_review",
      group_2_dependency: "closed_with_preserved_exact_head_review",
      proposed_runtime_build_platform_matrix: {
        entry_count: 1,
        exact_runtime_allowlist_selected: false,
        historical_evidence_is_current_admission: false,
      },
      controlled_process_profile_candidate: {
        evidence_runner_enforces_profile: true,
        selected_for_supported_runtime: false,
      },
      exact_head_admission_evidence_plan: {
        current_exact_head_evidence: "pending",
        independent_review: "pending",
        cross_platform_admission_evidence_complete: false,
      },
      closure_state: {
        group_3_complete: false,
        supported_execution_predicate: "unselected",
      },
    });
  });

  it("accepts only the exact tuple and permissioned controlled-process shape", () => {
    expect(validatePairedTAdmissionEnvironmentCandidate(validEnvironment())).toEqual({
      ok: true,
      tupleMatches: true,
      profileEstablished: true,
      errors: [],
    });
    const hot = validEnvironment();
    hot.execArgv.push("--trace-opt");
    expect(validatePairedTAdmissionEnvironmentCandidate(hot).ok).toBe(true);

    const attacks: Array<(value: MutableJson) => void> = [
      (value) => {
        value.runtimeVersion = "24.19.1";
      },
      (value) => {
        value.executableSha256 = "0".repeat(64);
      },
      (value) => {
        value.execArgv.push("--allow-worker");
      },
      (value) => {
        value.execArgv[4] = "--allow-fs-read=*";
      },
      (value) => {
        value.execArgv[4] = "--allow-fs-read=/";
      },
      (value) => {
        value.execArgv[4] = "--allow-fs-read=/candidate";
      },
      (value) => {
        value.execArgv[4] = "--allow-fs-read=";
      },
      (value) => {
        value.execArgv[5] = "--allow-fs-read=/candidate/compiled";
      },
      (value) => {
        value.permissions.workerThreads = true;
      },
      (value) => {
        value.permissions.filesystemWrite = true;
      },
      (value) => {
        value.intrinsics.mathFrozen = false;
      },
      (value) => {
        value.sentinels.sqrtTwo = false;
      },
      (value) => {
        value.undeclared = true;
      },
    ];
    for (const attack of attacks) {
      const candidate = structuredClone(validEnvironment()) as unknown as MutableJson;
      attack(candidate);
      expect(validatePairedTAdmissionEnvironmentCandidate(candidate).ok).toBe(false);
    }
  });

  it("refuses an ordinary process and never promotes the candidate into support", () => {
    const result = evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate(ordinaryInput());
    expect([
      "runtime_build_platform_tuple_mismatch",
      "controlled_process_profile_not_established",
    ]).toContain(result.ok ? null : result.classification);
    expect(result).toMatchObject({
      ok: false,
      candidateAdmissionPredicateSatisfied: false,
      admissionEvidenceInfrastructureImplemented: true,
      exactRuntimeAllowlistSelected: false,
      controlledProcessProfileSelected: false,
      crossPlatformAdmissionEvidenceComplete: false,
      supportedExecutionPredicateSelected: false,
      group3Complete: false,
      supportedExecutionPredicateSatisfied: false,
      supportedPlatformClaimed: false,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
  });

  it("rejects checkpoint drift, promotions, and hostile object shapes fail closed", () => {
    const attacks: Array<(value: MutableJson) => void> = [
      (value) => {
        value.source_snapshot.repository_commit = "0".repeat(40);
      },
      (value) => {
        value.proposed_runtime_build_platform_matrix.entries[0].runtime_version = "24.19.1";
      },
      (value) => {
        value.proposed_runtime_build_platform_matrix.exact_runtime_allowlist_selected = true;
      },
      (value) => {
        value.controlled_process_profile_candidate.selected_for_supported_runtime = true;
      },
      (value) => {
        value.exact_head_admission_evidence_plan.current_exact_head_evidence = "complete";
      },
      (value) => {
        value.closure_state.group_3_complete = true;
      },
      (value) => {
        value.non_promotions.supported_domain = true;
        value.non_promotions.runtime_support = true;
      },
      (value) => {
        value.undeclared = true;
      },
    ];
    for (const attack of attacks) {
      const checkpoint = structuredClone(loadCheckpoint()) as MutableJson;
      attack(checkpoint);
      expect(validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(checkpoint)).not.toEqual(
        [],
      );
    }

    const hidden = loadCheckpoint();
    Object.defineProperty(hidden, "support", { value: true, enumerable: false });
    expect(validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(hidden)).not.toEqual([]);

    const symbolic = loadCheckpoint() as Record<PropertyKey, unknown>;
    symbolic[Symbol("support")] = true;
    expect(validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(symbolic)).not.toEqual([]);

    const accessor = validEnvironment() as unknown as MutableJson;
    let getterCalls = 0;
    Object.defineProperty(accessor, "runtime", {
      enumerable: true,
      get() {
        getterCalls += 1;
        return "node";
      },
    });
    expect(validatePairedTAdmissionEnvironmentCandidate(accessor).ok).toBe(false);
    expect(getterCalls).toBe(0);

    const proxy = new Proxy(loadCheckpoint(), {
      ownKeys() {
        throw new Error("hostile ownKeys");
      },
    });
    expect(() => validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(proxy)).not.toThrow();
    expect(validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(proxy)).not.toEqual([]);

    const cyclic = loadCheckpoint();
    cyclic.cycle = cyclic;
    expect(validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(cyclic)).not.toEqual([]);

    const sparse = loadCheckpoint();
    sparse.source_snapshot.bindings.length += 1;
    expect(validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(sparse)).not.toEqual([]);
  });

  it("exposes a fail-closed in-memory evidence-manifest review surface", () => {
    const exactCommit = "a".repeat(40);
    expect(
      validatePairedTSupportedExecutionAdmissionEvidenceManifests({}, {}, exactCommit),
    ).not.toEqual([]);

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
      validatePairedTSupportedExecutionAdmissionEvidenceManifests(accessor, accessor, exactCommit),
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
      validatePairedTSupportedExecutionAdmissionEvidenceManifests(proxy, proxy, exactCommit),
    ).not.toThrow();

    const cyclic: MutableJson = {};
    cyclic.cycle = cyclic;
    expect(
      validatePairedTSupportedExecutionAdmissionEvidenceManifests(cyclic, cyclic, exactCommit),
    ).not.toEqual([]);

    const sparse: unknown[] = [];
    sparse.length = 2;
    expect(
      validatePairedTSupportedExecutionAdmissionEvidenceManifests(sparse, sparse, exactCommit),
    ).not.toEqual([]);
  });
});
