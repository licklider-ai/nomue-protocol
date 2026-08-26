import { describe, expect, it } from "vitest";
import {
  validateInterpretationBundleVNextSpike,
  type InterpretationBundleVNextSpike,
  type UnissuedIdentifierCandidate,
} from "../src/spikes/interpretation-bundle-vnext.js";

const candidate = (
  family: UnissuedIdentifierCandidate["family"],
  name: string,
): UnissuedIdentifierCandidate => ({ state: "unissued", family, name, revision: "0.1.0-draft.1" });

const BASE: InterpretationBundleVNextSpike = {
  status: "non_authoritative_spike",
  bundle: candidate("bundle", "paired-t-l1"),
  profile: candidate("profile", "paired-two-condition-continuous"),
  analysisContracts: [candidate("contract", "paired-t")],
  canonicalization: candidate("canonicalization", "jcs"),
  publicChecks: [candidate("check", "paired-t-recompute")],
  schemas: [
    {
      role: "record",
      identifier: candidate("schema", "paired-t-record"),
      repositoryPath: "schemas/record/paired-t-record.schema.json",
    },
  ],
};

describe("Interpretation Bundle vNext non-authoritative spike", () => {
  it("keeps Contract, Profile, Public Check, schema, and bundle identities distinct", () => {
    expect(validateInterpretationBundleVNextSpike(BASE)).toEqual({ ok: true, errors: [] });
  });

  it("rejects method/Contract double identity", () => {
    const invalid = structuredClone(BASE);
    invalid.analysisContracts[0]!.family = "method";
    const result = validateInterpretationBundleVNextSpike(invalid);
    expect(result.ok).toBe(false);
    expect(result.errors.join("\n")).toContain("must use the contract family");
  });

  it("rejects a candidate that looks authoritative", () => {
    const invalid = structuredClone(BASE);
    invalid.status = "supported" as never;
    expect(validateInterpretationBundleVNextSpike(invalid).ok).toBe(false);
  });
});
