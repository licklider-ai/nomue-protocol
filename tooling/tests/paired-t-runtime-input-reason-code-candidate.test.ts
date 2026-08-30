import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  parsePairedTCandidateEvaluationInput,
  validatePairedTRuntimeInputReasonCodeCandidate,
  type PairedTRuntimeInputReasonCodeCandidate,
} from "../src/spikes/paired-t-runtime-input-reason-code-candidate.js";
import { evaluatePairedTRuntimeSeriesWithCandidateTable } from "../src/spikes/paired-t-runtime-table-integration-candidate.js";
import { evaluatePairedTTruthErrorSupportCandidate } from "../src/spikes/paired-t-truth-error-support-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/runtime-input-reason-code-candidate.json",
);
const supportDomainPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/support-domain-candidate.json",
);
const protocolIdentifiersPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/protocol-identifiers.json",
);

function loadCheckpoint(): PairedTRuntimeInputReasonCodeCandidate {
  return JSON.parse(readFileSync(checkpointPath, "utf8")) as PairedTRuntimeInputReasonCodeCandidate;
}

function cloneCheckpoint(): PairedTRuntimeInputReasonCodeCandidate {
  return JSON.parse(JSON.stringify(loadCheckpoint())) as PairedTRuntimeInputReasonCodeCandidate;
}

describe("paired-t runtime input and reason-code candidate", () => {
  it("accepts only the exact non-authoritative checkpoint", () => {
    expect(validatePairedTRuntimeInputReasonCodeCandidate(loadCheckpoint())).toEqual([]);

    const promoted = cloneCheckpoint();
    promoted.final_reason_codes_frozen = true as never;
    promoted.runtime_support_enabled = true as never;
    expect(validatePairedTRuntimeInputReasonCodeCandidate(promoted)).toContain(
      "runtime-input reason-code candidate differs from the closed non-runtime checkpoint",
    );

    const omitted = cloneCheckpoint();
    omitted.selected_operation_stage_reason_code_candidates.pop();
    expect(validatePairedTRuntimeInputReasonCodeCandidate(omitted)).toContain(
      "runtime-input reason-code candidate differs from the closed non-runtime checkpoint",
    );

    const undeclared = cloneCheckpoint() as unknown as Record<string, unknown>;
    undeclared["supported"] = true;
    expect(validatePairedTRuntimeInputReasonCodeCandidate(undeclared)).toContain(
      "runtime-input reason-code candidate differs from the closed non-runtime checkpoint",
    );
  });

  it("binds every reviewed operation-stage outcome to one unique unissued code candidate", () => {
    const checkpoint = loadCheckpoint();
    const supportDomain = JSON.parse(readFileSync(supportDomainPath, "utf8")) as {
      active_predicates: Array<{
        ordinal: number;
        spike_error: string;
        failure_class: string;
        readiness_key: string;
      }>;
      defensive_postconditions: Array<{
        spike_error: string;
        failure_class: string;
        readiness_key: string;
      }>;
    };
    const expectedSources = [
      ...supportDomain.active_predicates.map((entry) => ({
        ordinal: entry.ordinal,
        source_spike_error: entry.spike_error,
        failure_class: entry.failure_class,
        readiness_key: entry.readiness_key,
      })),
      ...supportDomain.defensive_postconditions.map((entry, index) => ({
        ordinal: supportDomain.active_predicates.length + index + 1,
        source_spike_error: entry.spike_error,
        failure_class: entry.failure_class,
        readiness_key: entry.readiness_key,
      })),
    ];
    const mappings = checkpoint.selected_operation_stage_reason_code_candidates as Array<{
      ordinal: number;
      source_spike_error: string;
      failure_class: string;
      readiness_key: string;
      candidate_reason_code: string;
      candidate_check_key: string;
      state: string;
    }>;
    const protocolIdentifiers = JSON.parse(readFileSync(protocolIdentifiersPath, "utf8")) as {
      identifiers: Array<{ key: string; role: string; state: string }>;
    };
    expect(protocolIdentifiers.identifiers).toContainEqual(
      expect.objectContaining({
        key: "paired_t_computability_check",
        role: "public_check",
        state: "unissued",
      }),
    );
    expect(
      mappings.map(({ ordinal, source_spike_error, failure_class, readiness_key }) => ({
        ordinal,
        source_spike_error,
        failure_class,
        readiness_key,
      })),
    ).toEqual(expectedSources);
    expect(new Set(mappings.map((entry) => entry.candidate_reason_code)).size).toBe(
      mappings.length,
    );
    for (const mapping of mappings) {
      expect(mapping.candidate_reason_code).toMatch(/^NRS-[A-Z][A-Z-]*[A-Z]$/);
      expect(mapping.candidate_check_key).toBe("paired_t_computability_check");
      expect(mapping.state).toBe("candidate_unissued");
    }
  });

  it("keeps internal failures and unresolved support decisions out of the public code subset", () => {
    const checkpoint = loadCheckpoint();
    const publicSources = new Set(
      checkpoint.selected_operation_stage_reason_code_candidates.map(
        (entry) => entry["source_spike_error"],
      ),
    );
    for (const entry of checkpoint.internal_only_classifications) {
      expect(publicSources.has(entry["source_classification"])).toBe(false);
    }
    expect(checkpoint.inventory_scope).toMatchObject({
      public_code_subset: "reviewed_operation_stage_failures_only",
      complete_release_2_reason_code_inventory_claimed: false,
      support_dependent_runtime_codes: "deferred",
    });
    expect(checkpoint.delegated_classifications).toEqual([
      {
        source_classification: "non_finite_candidate_intermediate",
        delegates_to: "NON_FINITE_INTERMEDIATE",
      },
      {
        source_classification: "runtime_graph_refusal",
        delegates_to: "graphClassification",
      },
    ]);
    for (const entry of checkpoint.deferred_reason_code_decisions) {
      expect(entry["candidate_reason_code"]).toBeNull();
      expect(publicSources.has(entry["source_classification"])).toBe(false);
    }
  });

  it("parses ordinary and null-prototype data objects into a fresh exact input", () => {
    const ordinary = { degreesOfFreedom: 3, testStatistic: 1 };
    expect(parsePairedTCandidateEvaluationInput(ordinary)).toEqual(ordinary);
    expect(parsePairedTCandidateEvaluationInput(Object.freeze(ordinary))).toEqual(ordinary);

    const nullPrototype = Object.assign(Object.create(null) as object, ordinary);
    expect(parsePairedTCandidateEvaluationInput(nullPrototype)).toEqual(ordinary);
    const parsed = parsePairedTCandidateEvaluationInput(ordinary);
    expect(parsed).not.toBe(ordinary);
  });

  it("rejects extra, inherited, symbolic, accessor, and non-data input without invoking accessors", () => {
    const extra = { degreesOfFreedom: 3, testStatistic: 1, extra: true };
    const inherited = Object.create({ degreesOfFreedom: 3, testStatistic: 1 }) as object;
    const customPrototype = Object.assign(Object.create({ extra: true }) as object, {
      degreesOfFreedom: 3,
      testStatistic: 1,
    });
    const symbolic = { degreesOfFreedom: 3, testStatistic: 1 } as Record<PropertyKey, unknown>;
    symbolic[Symbol("extra")] = true;
    let getterCalls = 0;
    const accessors = Object.defineProperties(
      {},
      {
        degreesOfFreedom: {
          enumerable: true,
          get: () => {
            getterCalls += 1;
            return 3;
          },
        },
        testStatistic: { enumerable: true, value: 1 },
      },
    );
    const nonEnumerable = Object.defineProperties(
      {},
      {
        degreesOfFreedom: { enumerable: false, value: 3 },
        testStatistic: { enumerable: true, value: 1 },
      },
    );

    for (const input of [extra, inherited, customPrototype, symbolic, accessors, nonEnumerable]) {
      expect(parsePairedTCandidateEvaluationInput(input)).toBeUndefined();
    }
    expect(getterCalls).toBe(0);
  });

  it("contains hostile meta-object failures and both entrypoints return structured refusals", () => {
    const throwing = new Proxy(
      {},
      {
        getPrototypeOf: () => {
          throw new Error("hostile prototype");
        },
      },
    );
    const throwingKeys = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile keys");
        },
      },
    );
    const inputs: unknown[] = [
      null,
      undefined,
      [],
      {},
      "invalid",
      { degreesOfFreedom: "3", testStatistic: 1 },
      throwing,
      throwingKeys,
      { degreesOfFreedom: 3, testStatistic: 1, extra: true },
      Object.create({ degreesOfFreedom: 3, testStatistic: 1 }) as object,
    ];
    for (const input of inputs) {
      expect(() => parsePairedTCandidateEvaluationInput(input)).not.toThrow();
      expect(parsePairedTCandidateEvaluationInput(input)).toBeUndefined();
      expect(() => evaluatePairedTRuntimeSeriesWithCandidateTable(input)).not.toThrow();
      expect(evaluatePairedTRuntimeSeriesWithCandidateTable(input)).toMatchObject({
        ok: false,
        classification: "invalid_candidate_input",
      });
      expect(() => evaluatePairedTTruthErrorSupportCandidate(input)).not.toThrow();
      expect(evaluatePairedTTruthErrorSupportCandidate(input)).toMatchObject({
        ok: false,
        classification: "runtime_graph_refusal",
        graphClassification: "invalid_candidate_input",
        runtimeSupportClaimed: false,
        supportedDomainClaimed: false,
      });
    }
  });

  it("contains hostile checkpoint shapes without accepting a partial inventory", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic["self"] = cyclic;
    const hostile = new Proxy(
      {},
      {
        ownKeys: () => {
          throw new Error("hostile checkpoint");
        },
      },
    );
    for (const candidate of [null, undefined, [], {}, cyclic, hostile]) {
      expect(() => validatePairedTRuntimeInputReasonCodeCandidate(candidate)).not.toThrow();
      expect(validatePairedTRuntimeInputReasonCodeCandidate(candidate).length).toBeGreaterThan(0);
    }
  });
});
