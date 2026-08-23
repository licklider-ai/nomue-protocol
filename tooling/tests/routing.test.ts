import { describe, expect, it } from "vitest";
import {
  buildVerifierResources,
  loadVerifierResources,
  PHASE1_BUNDLE_ID,
  PHASE2A_BUNDLE_ID,
} from "../../reference/verifier/src/resources.js";
import {
  routeParsedInput,
  verifyRecordText,
  verifyRecordTextWithResources,
} from "../../reference/verifier/src/verify.js";
import { deterministicShuffle, outcomeKey } from "../src/phase1/routing-invariance.js";
import { loadJson } from "../src/lib/repo.js";

const resources = loadVerifierResources();

describe("bundle-independent routing (NRS-VERSION-0007, NRS-VERSION-0008)", () => {
  it("selects a bundle only for exactly registered identifiers", () => {
    for (const id of [PHASE1_BUNDLE_ID, PHASE2A_BUNDLE_ID]) {
      const decision = routeParsedInput({ interpretation_bundle_id: id }, resources);
      expect(decision).toEqual({ decision: "selected", bundleId: id });
    }
  });

  it("refuses a missing declaration with NRS-BUNDLE-ID-MISSING and selects no bundle", () => {
    for (const parsed of [{}, [], null, 42, "text", true]) {
      const decision = routeParsedInput(parsed, resources);
      expect(decision.decision).toBe("refused");
      if (decision.decision === "refused") {
        expect(decision.kind).toBe("routing_error");
        expect(decision.reasonCodes).toEqual(["NRS-BUNDLE-ID-MISSING"]);
      }
    }
  });

  it("refuses a non-string declaration with NRS-BUNDLE-ID-INVALID and selects no bundle", () => {
    for (const value of [42, null, true, ["urn"], { id: "urn" }]) {
      const decision = routeParsedInput({ interpretation_bundle_id: value }, resources);
      expect(decision.decision).toBe("refused");
      if (decision.decision === "refused") {
        expect(decision.kind).toBe("routing_error");
        expect(decision.reasonCodes).toEqual(["NRS-BUNDLE-ID-INVALID"]);
      }
    }
  });

  it("refuses unknown and nearby versions as unsupported, never dispatching", () => {
    for (const id of [
      "urn:nomue:bundle:never-registered:1.0.0",
      "urn:nomue:bundle:itgc-minimal:0.1.1-draft.1",
      "urn:nomue:bundle:itgc-guarantee:0.2.0-draft.2",
      "",
      "x",
    ]) {
      const decision = routeParsedInput({ interpretation_bundle_id: id }, resources);
      expect(decision.decision).toBe("refused");
      if (decision.decision === "refused") {
        expect(decision.kind).toBe("unsupported_bundle");
        expect(decision.reasonCodes).toEqual(["NRS-UNSUPPORTED-BUNDLE"]);
      }
    }
  });

  it("emits a schema-valid routing refusal with no report and exit 3", () => {
    const outcome = verifyRecordText("{}");
    expect(outcome.exitCode).toBe(3);
    expect(outcome.report).toBeUndefined();
    expect(outcome.refusal?.refusal_kind).toBe("routing_error");
    expect(outcome.refusal?.reason_codes).toEqual(["NRS-BUNDLE-ID-MISSING"]);
    expect(outcome.refusal?.declared_bundle_id).toBeUndefined();
    expect(resources.validateRefusal(outcome.refusal)).toBe(true);
  });

  it("keeps routing outcomes identical under permuted registry order", () => {
    const permutations = [
      buildVerifierResources((entries) => [...entries].reverse()),
      buildVerifierResources((entries) => deterministicShuffle(entries)),
    ];
    const probes = [
      "{}",
      '{"interpretation_bundle_id": 7}',
      '{"interpretation_bundle_id": null}',
      '{"interpretation_bundle_id": "urn:nomue:bundle:never-registered:1.0.0"}',
      `{"interpretation_bundle_id": "${PHASE1_BUNDLE_ID}"}`,
      `{"interpretation_bundle_id": "${PHASE2A_BUNDLE_ID}"}`,
    ];
    for (const probe of probes) {
      const canonicalKey = outcomeKey(verifyRecordTextWithResources(probe, resources));
      for (const permuted of permutations) {
        expect(outcomeKey(verifyRecordTextWithResources(probe, permuted)), probe).toBe(
          canonicalKey,
        );
      }
    }
  });

  it("shuffles deterministically and never returns the identity permutation", () => {
    for (let n = 2; n <= 6; n += 1) {
      const items = Array.from({ length: n }, (_, i) => `item-${i}`);
      const shuffled = deterministicShuffle(items);
      expect(shuffled, `n=${n}`).toEqual(deterministicShuffle(items));
      expect([...shuffled].sort(), `n=${n}`).toEqual([...items].sort());
      // An identity "shuffle" would make ROUTE-008 compare the canonical
      // order against itself and prove nothing.
      expect(shuffled, `n=${n}`).not.toEqual(items);
    }
  });
});

describe("refusal schema supersession (ADR-0017)", () => {
  it("keeps the draft.1 schema unmodified: draft.1 id, no routing_error kind", () => {
    const draft1 = loadJson<{
      $id: string;
      properties: { refusal_kind: { enum: string[] } };
    }>("schemas/reports/verifier-refusal-0.2.schema.json");
    expect(draft1.$id).toBe("urn:nomue:schema:verifier-refusal:0.2.0-draft.1");
    expect(draft1.properties.refusal_kind.enum).not.toContain("routing_error");
  });

  it("declares routing_error only in the draft.2 schema", () => {
    const draft2 = loadJson<{
      $id: string;
      properties: { refusal_kind: { enum: string[] } };
    }>("schemas/reports/verifier-refusal-0.2-draft-2.schema.json");
    expect(draft2.$id).toBe("urn:nomue:schema:verifier-refusal:0.2.0-draft.2");
    expect(draft2.properties.refusal_kind.enum).toContain("routing_error");
  });
});

describe("refusal schema supersession (ADR-0022)", () => {
  it("keeps the draft.2 schema unmodified: draft.2 id, no processing_timeout/memory_limit categories", () => {
    const draft2 = loadJson<{
      $id: string;
      properties: { limit_category: { enum: string[] } };
    }>("schemas/reports/verifier-refusal-0.2-draft-2.schema.json");
    expect(draft2.$id).toBe("urn:nomue:schema:verifier-refusal:0.2.0-draft.2");
    expect(draft2.properties.limit_category.enum).not.toContain("processing_timeout");
    expect(draft2.properties.limit_category.enum).not.toContain("memory_limit");
  });

  it("declares processing_timeout and memory_limit only in the draft.3 schema", () => {
    const draft3 = loadJson<{
      $id: string;
      properties: { limit_category: { enum: string[] } };
    }>("schemas/reports/verifier-refusal-0.2-draft-3.schema.json");
    expect(draft3.$id).toBe("urn:nomue:schema:verifier-refusal:0.2.0-draft.3");
    expect(draft3.properties.limit_category.enum).toContain("processing_timeout");
    expect(draft3.properties.limit_category.enum).toContain("memory_limit");
  });
});
