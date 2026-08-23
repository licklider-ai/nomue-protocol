import { describe, expect, it } from "vitest";
import { recomputeContentDigest } from "../../reference/verifier/src/digest.js";
import { CHECK_IDS_2A_021, PHASE2A_021_BUNDLE_ID } from "../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../reference/verifier/src/verify.js";
import { loadYaml, readText } from "../src/lib/repo.js";

interface PublicChecksRegistry {
  checks: Array<{
    check_id: string;
    depends_on?: string[];
    dependency_propagation?: string;
  }>;
}

interface ReasonCodesRegistry {
  codes: Array<{
    id: string;
    applicable_check_ids: string[];
  }>;
}

const COMPUTABILITY_021_CODES = [
  "NRS-SCHEMA-INVALID",
  "NRS-SEMANTIC-CONFORMANCE-FAILED",
  "NRS-GROUP-COUNT-NOT-TWO",
  "NRS-DUPLICATE-OBSERVATION-ID",
  "NRS-DUPLICATE-EXPERIMENTAL-UNIT",
  "NRS-UNKNOWN-GROUP",
  "NRS-GROUP-SIZE-BELOW-TWO",
  "NRS-NON-FINITE-NUMERIC-VALUE",
  "NRS-PAIRING-NOT-SUPPORTED",
  "NRS-REPEATED-MEASURES-NOT-SUPPORTED",
  "NRS-CLUSTERING-NOT-SUPPORTED",
  "NRS-WEIGHTING-NOT-SUPPORTED",
  "NRS-TRANSFORMATION-NOT-SUPPORTED",
  "NRS-SUBSET-ANALYSIS-NOT-SUPPORTED",
  "NRS-MISSING-OUTCOMES-NOT-SUPPORTED",
  "NRS-UNSUPPORTED-ESTIMAND",
  "NRS-CONFIDENCE-LEVEL-MISMATCH",
  "NRS-UNSUPPORTED-METHOD",
  "NRS-UNSUPPORTED-ALTERNATIVE",
  "NRS-ZERO-STANDARD-ERROR",
  "NRS-CRITICAL-VALUE-CALCULATION-FAILED",
  "NRS-NUMERICAL-COMPUTABILITY-FAILED",
  "NRS-P-VALUE-UNDERFLOW",
  "NRS-T-SQUARED-OVERFLOW",
] as const;

const WELCH_021_DIRECT_ADDITIONS = [
  "NRS-DECLARED-RESULT-MISMATCH",
  "NRS-STANDARD-ERROR-MISMATCH",
  "NRS-CONFIDENCE-INTERVAL-MISMATCH",
  "NRS-CONFIDENCE-INTERVAL-ORDER-INVALID",
] as const;

const REFUSAL_ONLY_CODES = [
  "NRS-UNSUPPORTED-BUNDLE",
  "NRS-CANONICALIZATION-FAILED",
  "NRS-INTERNAL-VERIFIER-ERROR",
  "NRS-RESOURCE-LIMIT-EXCEEDED",
] as const;

function loadRegistries(): {
  publicChecks: PublicChecksRegistry;
  reasonCodes: ReasonCodesRegistry;
} {
  return {
    publicChecks: loadYaml<PublicChecksRegistry>("registries/public-checks.yaml"),
    reasonCodes: loadYaml<ReasonCodesRegistry>("registries/reason-codes.yaml"),
  };
}

function applicableCodesFor(checkId: string, registry: ReasonCodesRegistry): string[] {
  return registry.codes
    .filter((code) => code.applicable_check_ids.includes(checkId))
    .map((code) => code.id)
    .sort();
}

function loadPhase2aFixture(name: string): Record<string, unknown> {
  return JSON.parse(readText(`conformance/fixtures/public_checks/${name}.json`)) as Record<
    string,
    unknown
  >;
}

describe("reason-code applicability coherence", () => {
  it("closes reason-code applicability over declared dependency propagation", () => {
    const { publicChecks, reasonCodes } = loadRegistries();

    for (const check of publicChecks.checks) {
      if (check.dependency_propagation !== "not_run_with_blocking_reason_codes") continue;
      for (const dependencyId of check.depends_on ?? []) {
        for (const code of reasonCodes.codes) {
          if (!code.applicable_check_ids.includes(dependencyId)) continue;
          expect(
            code.applicable_check_ids,
            `${code.id} can be propagated from ${dependencyId} to ${check.check_id}`,
          ).toContain(check.check_id);
        }
      }
    }
  });

  it("pins the complete 0.2.1 computability and recomputation emission sets", () => {
    const { reasonCodes } = loadRegistries();
    expect(applicableCodesFor(CHECK_IDS_2A_021.computability, reasonCodes)).toEqual(
      [...COMPUTABILITY_021_CODES].sort(),
    );
    expect(applicableCodesFor(CHECK_IDS_2A_021.welch, reasonCodes)).toEqual(
      [...COMPUTABILITY_021_CODES, ...WELCH_021_DIRECT_ADDITIONS].sort(),
    );
  });

  it("keeps verifier-refusal-only codes out of public-check applicability", () => {
    const { reasonCodes } = loadRegistries();
    const byId = new Map(reasonCodes.codes.map((code) => [code.id, code]));
    for (const codeId of REFUSAL_ONLY_CODES) {
      expect(byId.get(codeId)?.applicable_check_ids, codeId).toEqual([]);
    }
  });

  it("propagates a 0.2.1 conformance failure onto both successor checks", () => {
    const record = loadPhase2aFixture("A2-A-001");
    record["interpretation_bundle_id"] = PHASE2A_021_BUNDLE_ID;
    delete record["created_at"];

    const outcome = verifyRecordText(JSON.stringify(record));
    expect(outcome.exitCode).toBe(2);
    expect(outcome.report?.conformance.reason_codes).toContain("NRS-SCHEMA-INVALID");

    for (const checkId of [CHECK_IDS_2A_021.computability, CHECK_IDS_2A_021.welch]) {
      const result = outcome.report?.verification_results.find(
        (entry) => entry.check_id === checkId,
      );
      expect(result?.execution).toBe("not_run");
      expect(result?.reason_codes).toContain("NRS-SCHEMA-INVALID");
    }
  });

  it("propagates a 0.2.1 admissibility failure onto both successor checks", () => {
    const record = loadPhase2aFixture("A2-A-001");
    record["interpretation_bundle_id"] = PHASE2A_021_BUNDLE_ID;
    const integrity = record["integrity"] as Record<string, unknown>;
    integrity["content_digest"] = recomputeContentDigest(record);

    const outcome = verifyRecordText(JSON.stringify(record));
    expect(outcome.exitCode).toBe(2);

    for (const checkId of [CHECK_IDS_2A_021.computability, CHECK_IDS_2A_021.welch]) {
      const result = outcome.report?.verification_results.find(
        (entry) => entry.check_id === checkId,
      );
      expect(result?.execution).toBe("not_run");
      expect(result?.reason_codes).toContain("NRS-PAIRING-NOT-SUPPORTED");
    }
  });
});
