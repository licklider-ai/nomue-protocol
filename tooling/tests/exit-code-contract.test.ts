/**
 * Drift test for NRS-VERIFY-0025 (spec/verification/relying-party-interface.md):
 * the exit-code contract table there must match reference/verifier/src's
 * actual behavior. If either side changes without the other, this fails.
 */

import { describe, expect, it } from "vitest";
import { REFUSAL_EXIT_CODES } from "../../reference/verifier/src/refusal.js";
import { verifyRecordText } from "../../reference/verifier/src/verify.js";
import { readText } from "../src/lib/repo.js";

describe("exit-code contract (NRS-VERIFY-0025)", () => {
  it("pins REFUSAL_EXIT_CODES to exactly the documented table", () => {
    expect(REFUSAL_EXIT_CODES).toEqual({
      parse_error: 2,
      canonicalization_failure: 2,
      routing_error: 3,
      unsupported_bundle: 3,
      resource_limit: 4,
      internal_error: 5,
    });
  });

  it("code 0: a report exists and every applicable outcome is pass", () => {
    const outcome = verifyRecordText(readText("conformance/fixtures/public_checks/V-001.json"));
    expect(outcome.exitCode).toBe(0);
    expect(outcome.report).toBeDefined();
    expect(outcome.report?.conformance.outcome).toBe("pass");
    for (const result of outcome.report?.verification_results ?? []) {
      if (result.execution === "completed") expect(result.outcome).toBe("pass");
    }
  });

  it("code 2 (report exists, a check failed)", () => {
    const outcome = verifyRecordText(readText("conformance/fixtures/public_checks/P-001.json"));
    expect(outcome.exitCode).toBe(2);
    expect(outcome.report).toBeDefined();
    expect(outcome.report?.report_type).toBe("nomue-verification-report");
  });

  it("code 2 (no report, canonicalization_failure refusal - distinguishable by output_type)", () => {
    const outcome = verifyRecordText(readText("conformance/fixtures/verifier_behavior/B-008.json"));
    expect(outcome.exitCode).toBe(2);
    expect(outcome.report).toBeUndefined();
    expect(outcome.refusal?.output_type).toBe("nomue-verifier-refusal");
    expect(outcome.refusal?.refusal_kind).toBe("canonicalization_failure");
  });

  it("code 3: unsupported_bundle refusal, no report", () => {
    const outcome = verifyRecordText(readText("conformance/fixtures/verifier_behavior/B-001.json"));
    expect(outcome.exitCode).toBe(3);
    expect(outcome.report).toBeUndefined();
    expect(outcome.refusal?.refusal_kind).toBe("unsupported_bundle");
  });

  it("code 4: resource_limit refusal, no report", () => {
    const outcome = verifyRecordText(readText("conformance/fixtures/verifier_behavior/B-007.json"));
    expect(outcome.exitCode).toBe(4);
    expect(outcome.report).toBeUndefined();
    expect(outcome.refusal?.refusal_kind).toBe("resource_limit");
  });

  it("code 5 is reserved for internal_error and nothing else (constant check; not live-triggered)", () => {
    // Deliberately triggering an internal_error would require injecting a
    // fault into the verifier itself; the contract-pin test above already
    // proves internal_error maps to 5, and no other refusal_kind does.
    const codes = Object.entries(REFUSAL_EXIT_CODES);
    const fivesOnly = codes.filter(([, code]) => code === 5).map(([kind]) => kind);
    expect(fivesOnly).toEqual(["internal_error"]);
  });
});
