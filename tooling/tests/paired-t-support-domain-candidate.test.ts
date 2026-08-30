import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  computePairedTSpike,
  type PairedObservationSpike,
} from "../../reference/spikes/paired-t.js";
import {
  validatePairedTSupportBoundaryCorpus,
  validatePairedTSupportDomainCandidate,
  type PairedTSupportBoundaryCorpus,
  type PairedTSupportDomainCandidate,
} from "../src/spikes/paired-t-support-domain-candidate.js";
import type { PairedTNumericalReadinessCandidate } from "../src/spikes/paired-t-numerical-readiness.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const numericalRoot = path.join(repositoryRoot, "governance/drafts/release-2-candidate/numerical");

function loadJson<T>(filename: string): T {
  return JSON.parse(readFileSync(path.join(numericalRoot, filename), "utf8")) as T;
}

function loadCandidate(): PairedTSupportDomainCandidate {
  return loadJson<PairedTSupportDomainCandidate>("support-domain-candidate.json");
}

function loadCorpus(): PairedTSupportBoundaryCorpus {
  return loadJson<PairedTSupportBoundaryCorpus>("support-domain-boundary-cases.json");
}

function observationsFromPairs(pairs: Array<[number, number]>): PairedObservationSpike[] {
  return pairs.flatMap(([first, second], index) => {
    const suffix = String(index + 1).padStart(3, "0");
    return [
      {
        observationId: `before-${suffix}`,
        experimentalUnitId: `before-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "before",
        outcomeValue: first,
      },
      {
        observationId: `after-${suffix}`,
        experimentalUnitId: `after-unit-${suffix}`,
        pairId: `pair-${suffix}`,
        conditionId: "after",
        outcomeValue: second,
      },
    ];
  });
}

describe("Release 2 paired-t operation-stage support-domain candidate", () => {
  it("keeps the support structure non-authoritative, incomplete, and non-runtime", () => {
    expect(validatePairedTSupportDomainCandidate(loadCandidate())).toEqual([]);
    expect(validatePairedTSupportBoundaryCorpus(loadCorpus())).toEqual([]);
  });

  it("contains hostile candidate and corpus shapes in validation results", () => {
    for (const value of [null, undefined, [], {}, "invalid"]) {
      expect(() => validatePairedTSupportDomainCandidate(value)).not.toThrow();
      expect(validatePairedTSupportDomainCandidate(value).length).toBeGreaterThan(0);
      expect(() => validatePairedTSupportBoundaryCorpus(value)).not.toThrow();
      expect(validatePairedTSupportBoundaryCorpus(value).length).toBeGreaterThan(0);
    }

    const malformedCandidate = loadCandidate();
    malformedCandidate.composition = null as never;
    expect(validatePairedTSupportDomainCandidate(malformedCandidate)).toEqual([
      "support-domain candidate is not a structurally valid object",
    ]);

    const malformedCorpus = loadCorpus();
    malformedCorpus.cases = null as never;
    expect(validatePairedTSupportBoundaryCorpus(malformedCorpus)).toEqual([
      "support boundary corpus is not a structurally valid object",
    ]);
  });

  it("executes every active boundary fixture at its declared first failure", () => {
    for (const boundaryCase of loadCorpus().cases) {
      const outcome = computePairedTSpike({
        conditionOrder: ["before", "after"],
        repeatedMeasurements: "none",
        observations: observationsFromPairs(boundaryCase.pairs),
      });
      if (boundaryCase.expected_spike_error === null) {
        expect(outcome, boundaryCase.case_key).toMatchObject({ ok: true });
      } else {
        expect(outcome, boundaryCase.case_key).toMatchObject({
          ok: false,
          error: boundaryCase.expected_spike_error,
        });
      }
    }
  });

  it("binds active, defensive, and deferred predicates to readiness refusal classes", () => {
    const candidate = loadCandidate();
    const readiness = loadJson<PairedTNumericalReadinessCandidate>("evidence-readiness.json");
    const refusalKeys = new Map([
      ["contract_computability", new Set(readiness.refusal_classes.contract_computability)],
      ["binary64_computability", new Set(readiness.refusal_classes.binary64_computability)],
      ["scope", new Set(readiness.refusal_classes.scope)],
    ]);
    for (const predicate of [
      ...candidate.active_predicates,
      ...candidate.defensive_postconditions,
      ...candidate.deferred_predicates,
    ]) {
      expect(
        refusalKeys.get(predicate.failure_class)?.has(predicate.readiness_key),
        predicate.predicate_key,
      ).toBe(true);
    }
  });

  it("rejects a support claim, runtime enablement, or final reason-code freeze", () => {
    for (const field of [
      "supported_domain_claimed",
      "runtime_support_enabled",
      "final_reason_codes_frozen",
    ] as const) {
      const candidate = loadCandidate();
      candidate[field] = true as never;
      expect(validatePairedTSupportDomainCandidate(candidate)).toContain(
        "support, runtime enablement, and final reason codes must remain unfrozen",
      );
    }
  });

  it("rejects reordered stages and a changed first-failure classification", () => {
    const reordered = loadCandidate();
    [reordered.active_predicates[0], reordered.active_predicates[1]] = [
      reordered.active_predicates[1]!,
      reordered.active_predicates[0]!,
    ];
    expect(validatePairedTSupportDomainCandidate(reordered)).toContain(
      "active predicates: value or order differs from the candidate checkpoint",
    );

    const reclassified = loadCandidate();
    reclassified.active_predicates[2]!.failure_class = "binary64_computability";
    expect(validatePairedTSupportDomainCandidate(reclassified)).toContain(
      "active predicates: value or order differs from the candidate checkpoint",
    );
  });

  it("does not mistake JSON object key order for predicate meaning", () => {
    const candidate = loadCandidate();
    candidate.active_predicates[0] = Object.fromEntries(
      Object.entries(candidate.active_predicates[0]!).reverse(),
    ) as unknown as (typeof candidate.active_predicates)[number];
    expect(validatePairedTSupportDomainCandidate(candidate)).toEqual([]);
  });

  it("rejects an undeclared bound and activation of an unresolved policy", () => {
    const bounded = loadCandidate();
    (bounded as unknown as Record<string, unknown>).supported_df_max = 200;
    expect(validatePairedTSupportDomainCandidate(bounded)).toContain(
      "support-domain candidate: keys are incomplete or contain an undeclared item",
    );

    const subnormalPolicy = loadCandidate();
    subnormalPolicy.unselected_policies[0] = "reject_every_subnormal_intermediate";
    expect(validatePairedTSupportDomainCandidate(subnormalPolicy)).toContain(
      "unselected policies: value or order differs from the candidate checkpoint",
    );
  });

  it("rejects premature closure of corpus, oracle, or deferred predicates", () => {
    const corpusClosed = loadCandidate();
    corpusClosed.composition.validated_corpus_scope = "complete" as never;
    expect(validatePairedTSupportDomainCandidate(corpusClosed)).toContain(
      "support-domain composition cannot be marked complete by this increment",
    );

    const predicateActivated = loadCandidate();
    predicateActivated.deferred_predicates[0]!.state = "active" as never;
    expect(validatePairedTSupportDomainCandidate(predicateActivated)).toContain(
      "deferred predicates: value or order differs from the candidate checkpoint",
    );
  });

  it("rejects a corpus typo that would pass for the wrong reason", () => {
    const corpus = loadCorpus();
    corpus.cases[5]!.expected_spike_error = "SQUARED_DEVIATION_OVERFLOW";
    expect(validatePairedTSupportBoundaryCorpus(corpus)).toContain(
      "support boundary case centering-overflow has the wrong expected spike outcome",
    );
  });

  it("rejects a missing case, duplicate key, or non-finite injected operand", () => {
    const missing = loadCorpus();
    missing.cases.pop();
    expect(validatePairedTSupportBoundaryCorpus(missing)).toContain(
      "support boundary corpus is missing ordinary-passing-algebra-example",
    );

    const duplicate = loadCorpus();
    duplicate.cases[1]!.case_key = duplicate.cases[0]!.case_key;
    expect(validatePairedTSupportBoundaryCorpus(duplicate)).toContain(
      "duplicate support boundary case fewer-than-two-pairs",
    );

    const nonFinite = loadCorpus();
    nonFinite.cases[0]!.pairs[0]![0] = Number.POSITIVE_INFINITY;
    expect(validatePairedTSupportBoundaryCorpus(nonFinite)).toContain(
      "support boundary case fewer-than-two-pairs must contain finite binary64 pairs",
    );
  });
});
