/**
 * Batch 5 canonicalization/input hardening tests (E1'-E5', ADR-0027):
 * negative-zero rejection, domain-separation tags (including the
 * legacy-digest incompatibility negative), ingress gate byte identity
 * (DSSE discipline), and PAE framing.
 */

import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  ASSERTION_PAE_PAYLOAD_TYPE,
  assertionSigningPayload,
  preAuthenticationEncoding,
} from "../../reference/verifier/src/attestation.js";
import {
  DIGEST_DOMAIN_TAGS,
  canonicalProjection,
  recomputeContentDigest,
  sha256HexOfUtf8,
} from "../../reference/verifier/src/digest.js";
import { ingressAcceptCanonicalBytes } from "../../reference/verifier/src/ingress.js";
import { jcsCanonicalize } from "../../reference/verifier/src/jcs.js";
import { StrictJsonError, parseStrictJson } from "../../reference/verifier/src/strict-json.js";
import { verifyRecordText } from "../../reference/verifier/src/verify.js";
import { buildSnapshotManifest, snapshotHash } from "../src/release/snapshot-manifest.js";
import { readText } from "../src/lib/repo.js";

const validRecordText = (): string => readText("conformance/fixtures/public_checks/V-001.json");

describe("negative-zero rejection (NRS-CANON-0015)", () => {
  const rejected = (text: string): string | null => {
    try {
      parseStrictJson(text);
      return null;
    } catch (err) {
      return err instanceof StrictJsonError ? err.code : "OTHER";
    }
  };

  it("rejects every negative-zero spelling at the lexical stage", () => {
    for (const text of ['{"a":-0}', '{"a":-0.0}', '{"a":-0e5}', '{"a":-0.00E+2}', "[-0]"]) {
      expect(rejected(text), text).toBe("NEGATIVE_ZERO_NUMBER");
    }
  });

  it("accepts ordinary negative numbers and positive zero", () => {
    for (const text of ['{"a":-0.5}', '{"a":-1}', '{"a":0}', '{"a":0.0}', '{"a":-1e-30}']) {
      expect(rejected(text), text).toBeNull();
    }
  });

  it("the verifier reports the dedicated refusal code", () => {
    const outcome = verifyRecordText('{"a":-0}');
    expect(outcome.exitCode).toBe(2);
    expect(outcome.refusal?.refusal_kind).toBe("parse_error");
    expect(outcome.refusal?.reason_codes).toEqual(["NRS-NEGATIVE-ZERO-NUMBER"]);
  });
});

describe("domain separation (NRS-CANON-0020, ADR-0027)", () => {
  it("record-content, snapshot-manifest, and untagged digests of identical bytes all differ", () => {
    const canonical = jcsCanonicalize({ a: 1 });
    const record = `sha256:${sha256HexOfUtf8(DIGEST_DOMAIN_TAGS.record_content + canonical)}`;
    const snapshot = `sha256:${sha256HexOfUtf8(DIGEST_DOMAIN_TAGS.snapshot_manifest + canonical)}`;
    const untagged = `sha256:${sha256HexOfUtf8(canonical)}`;
    expect(new Set([record, snapshot, untagged]).size).toBe(3);
  });

  it("NEGATIVE: the legacy (untagged) digest of a valid Record no longer verifies", () => {
    const text = validRecordText();
    const record = JSON.parse(text) as Record<string, unknown>;
    const legacyDigest = `sha256:${sha256HexOfUtf8(canonicalProjection(record))}`;
    const currentDigest = recomputeContentDigest(record);
    expect(legacyDigest).not.toBe(currentDigest);

    const tampered = {
      ...record,
      integrity: {
        ...(record["integrity"] as Record<string, unknown>),
        content_digest: legacyDigest,
      },
    };
    const outcome = verifyRecordText(JSON.stringify(tampered));
    expect(outcome.exitCode).toBe(2);
    const integrity = outcome.report?.verification_results.find((r) =>
      r.check_id.includes("record-integrity"),
    );
    expect(integrity?.outcome).toBe("fail");
    expect(integrity?.reason_codes).toContain("NRS-DIGEST-MISMATCH");
  });

  it("the snapshot hash uses the snapshot tag (context swap changes the value)", () => {
    const manifest = buildSnapshotManifest();
    const canonical = jcsCanonicalize(manifest);
    expect(snapshotHash(manifest)).toBe(
      `sha256:${sha256HexOfUtf8(DIGEST_DOMAIN_TAGS.snapshot_manifest + canonical)}`,
    );
    expect(snapshotHash(manifest)).not.toBe(
      `sha256:${sha256HexOfUtf8(DIGEST_DOMAIN_TAGS.record_content + canonical)}`,
    );
  });

  it("the assertion signing payload is PAE-framed, not raw canonical bytes", () => {
    const unsigned = {
      assertion_id: "urn:uuid:00000000-0000-4000-8000-000000000001",
      subject: {
        record_id: "urn:a",
        revision_id: "urn:b",
        content_digest: `sha256:${"0".repeat(64)}`,
      },
      scope: { kind: "record" as const, id: "urn:a" },
      statement: "urn:nomue:attestation-statement:verification-procedure-executed:1" as const,
      verification_procedure: { check_id: "urn:c", check_version: "1", outcome: "pass" as const },
    };
    const payload = assertionSigningPayload(unsigned);
    const canonical = Buffer.from(
      jcsCanonicalize(unsigned as unknown as Record<string, unknown>),
      "utf8",
    );
    expect(payload.equals(canonical)).toBe(false);
    expect(payload.subarray(0, 7).toString("utf8")).toBe("DSSEv1 ");
    expect(payload.equals(preAuthenticationEncoding(ASSERTION_PAE_PAYLOAD_TYPE, canonical))).toBe(
      true,
    );
    expect(payload.includes(canonical)).toBe(true);
  });
});

describe("ingress gate (NRS-CANON-0016, NRS-VERIFY-0027)", () => {
  it("accepts canonical bytes and returns the ORIGINAL input (verified bytes = bytes handed onward)", () => {
    const canonical = jcsCanonicalize({ b: 2, a: 1 });
    const result = ingressAcceptCanonicalBytes(canonical);
    expect(result.accepted).toBe(true);
    expect(result.bytes).toBe(canonical);
  });

  it("NEGATIVE: rejects non-canonical bytes instead of re-canonicalizing them", () => {
    const nonCanonical = '{"b": 2, "a": 1}';
    const result = ingressAcceptCanonicalBytes(nonCanonical);
    expect(result.accepted).toBe(false);
    expect(result.reason).toBe("not_canonical_bytes");
    expect(result.bytes).toBeUndefined();
  });

  it("applies the Y1 input constraints at ingress (duplicate member, negative zero)", () => {
    expect(ingressAcceptCanonicalBytes('{"a":1,"a":2}').reason).toBe("strict_json_violation");
    expect(ingressAcceptCanonicalBytes('{"a":-0}').reason).toBe("strict_json_violation");
    expect(ingressAcceptCanonicalBytes("not json").reason).toBe("not_json");
  });

  it("idempotency holds for canonical output (canonicalize twice = once)", () => {
    const canonical = jcsCanonicalize({ z: [1, 2, { b: 1, a: 2 }], a: "x" });
    expect(jcsCanonicalize(JSON.parse(canonical))).toBe(canonical);
  });
});
