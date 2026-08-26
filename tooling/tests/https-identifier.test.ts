import { describe, expect, it } from "vitest";
import {
  isProtocolHttpsIdentifier,
  validateProtocolHttpsIdentifier,
} from "../src/identifiers/https-identifier.js";

describe("ADR-0031/ADR-0032 HTTPS identifier minting validator", () => {
  it.each([
    "https://nomue.ai/id/schema/record/0.3.0-draft.1",
    "https://nomue.ai/id/contract/paired-t/0.1.0-draft.1",
    "https://nomue.ai/id/signature-suite/ed25519/1",
  ])("accepts canonical illustrative spelling: %s", (value) => {
    expect(validateProtocolHttpsIdentifier(value)).toMatchObject({ ok: true });
    expect(isProtocolHttpsIdentifier(value)).toBe(true);
  });

  it.each([
    "http://nomue.ai/id/schema/record/1",
    "https://NOMUE.ai/id/schema/record/1",
    "https://nomue.ai:443/id/schema/record/1",
    "https://user@nomue.ai/id/schema/record/1",
    "https://nomue.ai/id/schema/record/1?next=2",
    "https://nomue.ai/id/schema/record/1#fragment",
    "https://nomue.ai/id/schema/record%2Fother/1",
    "https://nomue.ai/id/schema//1",
    "https://nomue.ai/id/schema/record/1/",
    "https://nomue.ai/id/schema/../1",
    "https://nomue.ai/id/Schema/record/1",
    "https://nomue.ai/id/schema/Record/1",
    "https://nomue.ai/id/not-adopted/example/1",
    "https://nomue.ai/id/contract/paired-t/bad\\revision",
    'https://nomue.ai/id/contract/paired-t/bad"revision',
    "https://nomue.ai/id/contract/paired-t/bad<revision",
  ])("rejects non-canonical or unrecognized spelling: %s", (value) => {
    expect(validateProtocolHttpsIdentifier(value).ok).toBe(false);
    expect(isProtocolHttpsIdentifier(value)).toBe(false);
  });

  it("does not normalize before comparison", () => {
    const canonical = "https://nomue.ai/id/contract/paired-t/1";
    const encoded = "https://nomue.ai/id/contract/paired%2Dt/1";
    expect(isProtocolHttpsIdentifier(canonical)).toBe(true);
    expect(isProtocolHttpsIdentifier(encoded)).toBe(false);
  });
});
