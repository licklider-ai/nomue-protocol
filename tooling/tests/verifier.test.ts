import { describe, expect, it } from "vitest";
import { startProcessingBudget } from "../../reference/verifier/src/limits.js";
import {
  semanticProjection,
  semanticProjectionHash,
} from "../../reference/verifier/src/projection.js";
import { loadVerifierResources } from "../../reference/verifier/src/resources.js";
import {
  verifyRecordText,
  verifyRecordTextWithResources,
} from "../../reference/verifier/src/verify.js";
import { readText } from "../src/lib/repo.js";

const validRecordText = (): string => readText("conformance/fixtures/public_checks/V-001.json");

describe("reference verifier behavior", () => {
  it("verifies a valid record with scoped results and no overall status", () => {
    const outcome = verifyRecordText(validRecordText());
    expect(outcome.exitCode).toBe(0);
    const report = outcome.report;
    if (report === undefined) throw new Error("expected report");
    expect(report.conformance.outcome).toBe("pass");
    expect(report.verification_results).toHaveLength(3);
    expect(report.guarantee_boundary.scientific_validity).toBe("not_asserted");
    const keys = Object.keys(report);
    for (const forbidden of ["overall" + "_status", "VERI" + "FIED", "is" + "_valid"]) {
      expect(keys).not.toContain(forbidden);
    }
    // The declared digest is never trusted: the reference is the recomputed one.
    const declared = (JSON.parse(validRecordText()) as { integrity: { content_digest: string } })
      .integrity.content_digest;
    expect(report.record_reference.content_digest).toBe(declared);
  });

  it("fails closed on an unsupported interpretation bundle", () => {
    const record = JSON.parse(validRecordText()) as Record<string, unknown>;
    record["interpretation_bundle_id"] = "urn:nomue:bundle:itgc-minimal:99.0.0";
    const outcome = verifyRecordText(JSON.stringify(record));
    expect(outcome.exitCode).toBe(3);
    expect(outcome.report).toBeUndefined();
    expect(outcome.refusal?.reason_codes).toEqual(["NRS-UNSUPPORTED-BUNDLE"]);
  });

  it("refuses non-JSON input without producing a report", () => {
    const outcome = verifyRecordText("{ not json");
    expect(outcome.exitCode).toBe(2);
    expect(outcome.report).toBeUndefined();
    expect(outcome.refusal?.refusal_kind).toBe("parse_error");
    expect(outcome.refusal?.reason_codes).toContain("NRS-PARSE-FAILED");
  });

  it("refuses over-deep input as a resource limit with the specific limit code", () => {
    let nested = "0";
    for (let i = 0; i < 80; i += 1) nested = `{"a":${nested}}`;
    const outcome = verifyRecordText(nested);
    expect(outcome.exitCode).toBe(4);
    expect(outcome.refusal?.refusal_kind).toBe("resource_limit");
    expect(outcome.refusal?.limit_category).toBe("nesting_depth");
    expect([...(outcome.refusal?.reason_codes ?? [])].sort()).toEqual([
      "NRS-NESTING-LIMIT-EXCEEDED",
      "NRS-RESOURCE-LIMIT-EXCEEDED",
    ]);
  });

  it("dispatches the Phase 2A bundle to the guarantee pipeline", () => {
    const outcome = verifyRecordText(readText("conformance/fixtures/public_checks/A2-V-001.json"));
    expect(outcome.exitCode).toBe(0);
    const report = outcome.report;
    if (report === undefined) throw new Error("expected report");
    expect(report.$schema).toBe("urn:nomue:schema:verification-report:0.2.0-draft.1");
    expect(report.verification_results.map((r) => r.check_id)).toEqual([
      "urn:nomue:check:record-integrity:0.2.0-draft.1",
      "urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1",
      "urn:nomue:check:welch-computability:0.2.0-draft.1",
      "urn:nomue:check:welch-recompute:0.2.0-draft.1",
    ]);
    const boundary = report.guarantee_boundary as unknown as Record<string, string>;
    expect(boundary["declaration_truth"]).toBe("not_asserted");
    expect(boundary["standardized_effect_size"]).toBe("not_asserted");
  });

  it("refuses a nearby unknown 0.2 bundle version instead of guessing", () => {
    const record = JSON.parse(
      readText("conformance/fixtures/public_checks/A2-V-001.json"),
    ) as Record<string, unknown>;
    record["interpretation_bundle_id"] = "urn:nomue:bundle:itgc-guarantee:0.2.0-draft.2";
    const outcome = verifyRecordText(JSON.stringify(record));
    expect(outcome.exitCode).toBe(3);
    expect(outcome.refusal?.refusal_kind).toBe("unsupported_bundle");
  });

  it("keeps the semantic projection free of environment detail and stable", () => {
    const first = verifyRecordText(validRecordText());
    const second = verifyRecordText(validRecordText());
    if (first.report === undefined || second.report === undefined) {
      throw new Error("expected reports");
    }
    const projection = semanticProjection(first.report) as Record<string, unknown>;
    expect(projection["generated_at"]).toBeUndefined();
    expect(projection["verifier"]).toBeUndefined();
    expect(semanticProjectionHash(first.report)).toBe(semanticProjectionHash(second.report));
  });

  // NRS-SEC-0006: checked in-process at pipeline checkpoints via an
  // injectable clock/heap reader, since a genuinely slow or memory-heavy
  // input cannot be constructed within the NRS-SEC-0003 size/depth/
  // observation ceilings (see ADR-0022 and the requirement's registry
  // entry, which records this as the reason no conformance fixture covers
  // it).
  describe("in-process processing-time and memory budget (NRS-SEC-0006)", () => {
    it("refuses with processing_timeout when the injected clock reports the deadline already passed", () => {
      const resources = loadVerifierResources();
      // startProcessingBudget() reads now() twice during construction
      // (startedAtMs, then deadlineMs = now() + maxProcessingMs); every
      // checkpoint call thereafter reads it exactly once. This mock stays
      // at 0 for construction, then jumps forward for every checkpoint.
      let callCount = 0;
      const budget = startProcessingBudget({
        now: () => (callCount++ < 2 ? 0 : Number.MAX_SAFE_INTEGER),
        maxProcessingMs: 1,
      });
      const outcome = verifyRecordTextWithResources(validRecordText(), resources, budget);
      expect(outcome.exitCode).toBe(4);
      expect(outcome.refusal?.refusal_kind).toBe("resource_limit");
      expect(outcome.refusal?.limit_category).toBe("processing_timeout");
      expect([...(outcome.refusal?.reason_codes ?? [])].sort()).toEqual([
        "NRS-RESOURCE-LIMIT-EXCEEDED",
        "NRS-TIMEOUT-LIMIT-EXCEEDED",
      ]);
    });

    it("refuses with memory_limit when the injected heap reader reports usage above the budget", () => {
      const resources = loadVerifierResources();
      const budget = startProcessingBudget({
        heapUsedBytes: () => 1024 * 1024 * 1024, // 1 GiB, above the 512 MiB default
      });
      const outcome = verifyRecordTextWithResources(validRecordText(), resources, budget);
      expect(outcome.exitCode).toBe(4);
      expect(outcome.refusal?.refusal_kind).toBe("resource_limit");
      expect(outcome.refusal?.limit_category).toBe("memory_limit");
      expect([...(outcome.refusal?.reason_codes ?? [])].sort()).toEqual([
        "NRS-MEMORY-LIMIT-EXCEEDED",
        "NRS-RESOURCE-LIMIT-EXCEEDED",
      ]);
    });

    it("verifies normally under an ordinary (non-exceeded) budget", () => {
      const resources = loadVerifierResources();
      const budget = startProcessingBudget();
      const outcome = verifyRecordTextWithResources(validRecordText(), resources, budget);
      expect(outcome.exitCode).toBe(0);
      expect(outcome.report?.conformance.outcome).toBe("pass");
    });
  });
});
