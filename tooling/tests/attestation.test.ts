/**
 * Attestation contract tests: NRS-ATTEST-0002..0005 (first increment) plus
 * the Batch 4 signature-infrastructure additions - trust root
 * (NRS-ATTEST-0007/0008) and the optional RFC 3161 timestamp field
 * (NRS-ATTEST-0011, draft-3 schema) - against the reference implementation
 * in reference/verifier/src/attestation.ts. Unit tests, not conformance
 * fixtures (see NRS-ATTEST-*'s registry notes).
 */

import { createHash, createPublicKey } from "node:crypto";
import { Ajv2020 } from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";
import {
  ATTESTATION_STATEMENT_ID,
  ED25519_SUITE_ID,
  attachAttestations,
  computeSpkiSha256Fingerprint,
  generateEd25519KeyPair,
  loadTrustRoot,
  signAssertion,
  verifyAssertionAsNomueAttested,
  verifyAssertionSignature,
  type Assertion,
  type Attestation,
  type TrustRoot,
  type TrustRootKey,
  type UnsignedAssertion,
} from "../../reference/verifier/src/attestation.js";
import { verifyRecordText } from "../../reference/verifier/src/verify.js";
import { loadJson, readText } from "../src/lib/repo.js";

const validRecordText = (): string => readText("conformance/fixtures/public_checks/V-001.json");
const validPhase2aRecordText = (): string =>
  readText("conformance/fixtures/public_checks/A2-V-001.json");

function buildValidReport() {
  const outcome = verifyRecordText(validRecordText());
  if (outcome.report === undefined) throw new Error("expected a report");
  return outcome.report;
}

/** A Phase 2A report: the only bundle whose report schema (0.2.x) the draft.2 attestation schema extends. */
function buildValidPhase2aReport() {
  const outcome = verifyRecordText(validPhase2aRecordText());
  if (outcome.report === undefined) throw new Error("expected a report");
  return outcome.report;
}

function attestationReportValidator() {
  const ajv = new Ajv2020({
    allErrors: true,
    strictSchema: true,
    strictTypes: true,
    strictRequired: false,
  });
  for (const file of [
    "schemas/common/identifier.schema.json",
    "schemas/common/execution-outcome.schema.json",
    "schemas/common/execution-outcome-0.2.schema.json",
    "schemas/reports/verification-report-0.2-draft-2.schema.json",
  ]) {
    ajv.addSchema(loadJson<object>(file));
  }
  const validate = ajv.getSchema("urn:nomue:schema:verification-report:0.2.0-draft.2");
  if (validate === undefined) throw new Error("draft.2 report schema failed to compile");
  return validate;
}

function buildUnsignedAssertion(report: ReturnType<typeof buildValidReport>): UnsignedAssertion {
  return {
    assertion_id: "urn:uuid:00000000-0000-4000-8000-000000000001",
    subject: report.record_reference,
    scope: { kind: "record_revision", id: report.record_reference.revision_id },
    statement: ATTESTATION_STATEMENT_ID,
    verification_procedure: {
      check_id: report.verification_results[0]!.check_id,
      check_version: report.verification_results[0]!.check_version,
      outcome: "pass",
    },
  };
}

describe("attestation first increment (NRS-ATTEST-0001..0005)", () => {
  it("signs and verifies a real Ed25519 signature", () => {
    const report = buildValidReport();
    const { publicKey, privateKey } = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, privateKey, "test-key-1");
    expect(signed.signature.algorithm).toBe(ED25519_SUITE_ID);
    expect(signed.signature_verification.execution).toBe("not_run");

    const result = verifyAssertionSignature(signed, publicKey);
    expect(result.execution).toBe("completed");
    expect(result.outcome).toBe("pass");
    expect(result.reason_codes).toEqual([]);
  });

  it("fails closed on a tampered signature", () => {
    const report = buildValidReport();
    const { publicKey, privateKey } = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, privateKey, "test-key-1");
    const tampered = {
      ...signed,
      signature: { ...signed.signature, value: `${signed.signature.value.slice(0, -4)}AAAA` },
    };

    const result = verifyAssertionSignature(tampered, publicKey);
    expect(result.execution).toBe("completed");
    expect(result.outcome).toBe("fail");
    expect(result.reason_codes).toContain("NRS-SIGNATURE-INVALID");
  });

  it("fails closed on content mutated after signing", () => {
    const report = buildValidReport();
    const { publicKey, privateKey } = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, privateKey, "test-key-1");
    const mutated = {
      ...signed,
      verification_procedure: { ...signed.verification_procedure, outcome: "fail" as const },
    };

    const result = verifyAssertionSignature(mutated, publicKey);
    expect(result.outcome).toBe("fail");
    expect(result.reason_codes).toContain("NRS-SIGNATURE-INVALID");
  });

  it("verifies against the correct key but not a different one", () => {
    const report = buildValidReport();
    const keyA = generateEd25519KeyPair();
    const keyB = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, keyA.privateKey, "key-a");

    expect(verifyAssertionSignature(signed, keyA.publicKey).outcome).toBe("pass");
    expect(verifyAssertionSignature(signed, keyB.publicKey).outcome).toBe("fail");
  });

  it("refuses an algorithm outside the allow-list (NRS-ATTEST-0003)", () => {
    const report = buildValidReport();
    const { publicKey, privateKey } = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, privateKey, "test-key-1");
    const hostile = {
      ...signed,
      signature: { ...signed.signature, algorithm: "urn:nomue:signature-suite:rsa-pss:1" as never },
    };

    const result = verifyAssertionSignature(hostile, publicKey);
    expect(result.outcome).toBe("fail");
    expect(result.reason_codes).toContain("NRS-SIGNATURE-ALGORITHM-NOT-ALLOWED");
  });

  it("does not mutate conformance or verification_results when an attestation is attached (B5 non-promotion, NRS-VERIFY-0004)", () => {
    const report = buildValidReport();
    const before = {
      conformance: JSON.stringify(report.conformance),
      results: JSON.stringify(report.verification_results),
    };

    const { publicKey, privateKey } = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, privateKey, "test-key-1");
    const verified = {
      ...signed,
      signature_verification: verifyAssertionSignature(signed, publicKey),
    };
    const attestation: Attestation = {
      attestation_id: "urn:uuid:00000000-0000-4000-8000-000000000002",
      attester: { name: "Test Attester", key_id: "test-key-1" },
      created_at: "2026-08-13T00:00:00Z",
      assertions: [verified],
    };

    const attested = attachAttestations(report, [attestation]);

    expect(JSON.stringify(attested.conformance)).toBe(before.conformance);
    expect(JSON.stringify(attested.verification_results)).toBe(before.results);
    expect(attested.conformance).toBe(report.conformance);
    expect(attested.verification_results).toBe(report.verification_results);
  });

  it("never places an attestation-derived result inside verification_results (NRS-ATTEST-0005)", () => {
    const report = buildValidReport();
    const { publicKey, privateKey } = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, privateKey, "test-key-1");
    const verified = {
      ...signed,
      signature_verification: verifyAssertionSignature(signed, publicKey),
    };
    const attestation: Attestation = {
      attestation_id: "urn:uuid:00000000-0000-4000-8000-000000000002",
      attester: { name: "Test Attester", key_id: "test-key-1" },
      created_at: "2026-08-13T00:00:00Z",
      assertions: [verified],
    };

    const attested = attachAttestations(report, [attestation]);

    const signatureCheckIds = new Set(["urn:nomue:check:attestation-signature:0.1.0-draft.1"]);
    for (const result of attested.verification_results) {
      expect(signatureCheckIds.has(result.check_id)).toBe(false);
    }
    expect(attested.attestations[0]!.assertions[0]!.signature_verification.outcome).toBe("pass");
  });

  it("produces a report that validates against the draft.2 schema, with and without attestations", () => {
    const validate = attestationReportValidator();
    const report = buildValidPhase2aReport();
    const normalized = JSON.parse(JSON.stringify(report)) as Record<string, unknown>;
    normalized["$schema"] = "urn:nomue:schema:verification-report:0.2.0-draft.2";
    normalized["verifier"] = {
      ...(normalized["verifier"] as object),
      source_commit: "0".repeat(40),
    };

    expect(validate(normalized)).toBe(true);

    const { publicKey, privateKey } = generateEd25519KeyPair();
    const unsigned = buildUnsignedAssertion(report);
    const signed = signAssertion(unsigned, privateKey, "test-key-1");
    const verified = {
      ...signed,
      signature_verification: verifyAssertionSignature(signed, publicKey),
    };
    const withAttestations = {
      ...normalized,
      attestations: [
        {
          attestation_id: "urn:uuid:00000000-0000-4000-8000-000000000002",
          attester: { name: "Test Attester", key_id: "test-key-1" },
          created_at: "2026-08-13T00:00:00Z",
          assertions: [verified],
        },
      ],
    };
    expect(validate(withAttestations)).toBe(true);
  });

  it("rejects a signature value that is not valid base64 as schema-invalid", () => {
    const validate = attestationReportValidator();
    const report = buildValidPhase2aReport();
    const normalized = JSON.parse(JSON.stringify(report)) as Record<string, unknown>;
    normalized["$schema"] = "urn:nomue:schema:verification-report:0.2.0-draft.2";
    normalized["verifier"] = {
      ...(normalized["verifier"] as object),
      source_commit: "0".repeat(40),
    };
    normalized["attestations"] = [
      {
        attestation_id: "urn:uuid:00000000-0000-4000-8000-000000000002",
        attester: { name: "Test Attester", key_id: "test-key-1" },
        created_at: "2026-08-13T00:00:00Z",
        assertions: [
          {
            assertion_id: "urn:uuid:00000000-0000-4000-8000-000000000001",
            subject: report.record_reference,
            scope: { kind: "record_revision", id: report.record_reference.revision_id },
            statement: ATTESTATION_STATEMENT_ID,
            verification_procedure: {
              check_id: report.verification_results[0]!.check_id,
              check_version: report.verification_results[0]!.check_version,
              outcome: "pass",
            },
            signature: {
              algorithm: ED25519_SUITE_ID,
              key_id: "test-key-1",
              value: "not valid base64!!",
            },
            signature_verification: {
              check_id: "urn:nomue:check:attestation-signature:0.1.0-draft.1",
              check_version: "0.1.0-draft.1",
              execution: "completed",
              outcome: "fail",
              scope: { kind: "record_revision", id: report.record_reference.revision_id },
              reason_codes: ["NRS-SIGNATURE-INVALID"],
            },
          },
        ],
      },
    ];

    expect(validate(normalized)).toBe(false);
  });
});

describe("trust root (NRS-ATTEST-0007/0008, Batch 4)", () => {
  const buildTrustRoot = (
    overrides?: Partial<TrustRootKey>,
  ): {
    trustRoot: TrustRoot;
    privateKey: string;
  } => {
    const { publicKey, privateKey } = generateEd25519KeyPair();
    const key: TrustRootKey = {
      key_id: "urn:nomue:attestation-key:test:1",
      generation: 1,
      suite_id: ED25519_SUITE_ID,
      public_key_pem: publicKey,
      fingerprint: computeSpkiSha256Fingerprint(publicKey),
      valid_from: "2026-01-01T00:00:00Z",
      valid_until: "2027-01-01T00:00:00Z",
      status: "active",
      superseded_by: null,
      ...overrides,
    };
    return {
      trustRoot: {
        registry: "nrs-attestation-trust-root",
        registry_version: "0.0.0-test",
        updated: "2026-08-13",
        fingerprint_method: "sha256 over DER SPKI (test)",
        keys: [key],
      },
      privateKey,
    };
  };

  const signedAssertion = (privateKey: string, keyId: string): Assertion => {
    const report = buildValidReport();
    const unsigned = buildUnsignedAssertion(report);
    return signAssertion(unsigned, privateKey, keyId);
  };

  it("repository trust root parses, pins no keys yet, and states the fingerprint method", () => {
    const real = loadTrustRoot();
    expect(real.registry).toBe("nrs-attestation-trust-root");
    expect(real.keys).toEqual([]);
    expect(real.fingerprint_method).toContain("sha256");
  });

  it("fingerprints are sha256 over DER SPKI and match the crypto module's own derivation", () => {
    const { publicKey } = generateEd25519KeyPair();
    const fingerprint = computeSpkiSha256Fingerprint(publicKey);
    const der = createPublicKey(publicKey).export({ type: "spki", format: "der" });
    const expected = `sha256:${createHash("sha256").update(der).digest("hex")}`;
    expect(fingerprint).toBe(expected);
    expect(fingerprint).toMatch(/^sha256:[0-9a-f]{64}$/);
  });

  it("accepts a pinned, in-window, cryptographically valid signature as nomue-attested", () => {
    const { trustRoot, privateKey } = buildTrustRoot();
    const assertion = signedAssertion(privateKey, "urn:nomue:attestation-key:test:1");
    const result = verifyAssertionAsNomueAttested(assertion, trustRoot, "2026-08-13T00:00:00Z");
    expect(result.execution).toBe("completed");
    expect(result.outcome).toBe("pass");
    expect(result.reason_codes).toEqual([]);
  });

  it("fails a cryptographically valid signature from an unpinned key (NRS-SIGNATURE-KEY-NOT-PINNED)", () => {
    const { trustRoot } = buildTrustRoot();
    // A DIFFERENT keypair, cryptographically valid over the same content,
    // claiming an unpinned key_id: structurally perfect, still not
    // nomue-attested (NRS-ATTEST-0007).
    const rogue = generateEd25519KeyPair();
    const assertion = signedAssertion(rogue.privateKey, "urn:nomue:attestation-key:rogue:1");
    const selfCheck = verifyAssertionSignature(assertion, rogue.publicKey);
    expect(selfCheck.outcome).toBe("pass");
    const result = verifyAssertionAsNomueAttested(assertion, trustRoot, "2026-08-13T00:00:00Z");
    expect(result.outcome).toBe("fail");
    expect(result.reason_codes).toEqual(["NRS-SIGNATURE-KEY-NOT-PINNED"]);
  });

  it("fails a pinned key outside its validity window (NRS-SIGNATURE-KEY-OUTSIDE-VALIDITY)", () => {
    const { trustRoot, privateKey } = buildTrustRoot();
    const assertion = signedAssertion(privateKey, "urn:nomue:attestation-key:test:1");
    const before = verifyAssertionAsNomueAttested(assertion, trustRoot, "2025-12-31T23:59:59Z");
    const after = verifyAssertionAsNomueAttested(assertion, trustRoot, "2027-01-01T00:00:01Z");
    for (const result of [before, after]) {
      expect(result.outcome).toBe("fail");
      expect(result.reason_codes).toEqual(["NRS-SIGNATURE-KEY-OUTSIDE-VALIDITY"]);
    }
  });

  it("fails a tampered signature from a pinned, in-window key via the pinned key (NRS-SIGNATURE-INVALID)", () => {
    const { trustRoot, privateKey } = buildTrustRoot();
    const assertion = signedAssertion(privateKey, "urn:nomue:attestation-key:test:1");
    const tampered: Assertion = {
      ...assertion,
      scope: { kind: "record_revision", id: "urn:tampered:after-signing" },
    };
    const result = verifyAssertionAsNomueAttested(tampered, trustRoot, "2026-08-13T00:00:00Z");
    expect(result.outcome).toBe("fail");
    expect(result.reason_codes).toEqual(["NRS-SIGNATURE-INVALID"]);
  });
});

describe("draft-3 report schema (NRS-ATTEST-0011, optional RFC 3161 timestamp)", () => {
  function draft3Validator() {
    const ajv = new Ajv2020({
      allErrors: true,
      strictSchema: true,
      strictTypes: true,
      strictRequired: false,
    });
    for (const file of [
      "schemas/common/identifier.schema.json",
      "schemas/common/execution-outcome.schema.json",
      "schemas/common/execution-outcome-0.2.schema.json",
      "schemas/reports/verification-report-0.2-draft-3.schema.json",
    ]) {
      ajv.addSchema(loadJson<object>(file));
    }
    const validate = ajv.getSchema("urn:nomue:schema:verification-report:0.2.0-draft.3");
    if (validate === undefined) throw new Error("draft.3 report schema failed to compile");
    return validate;
  }

  const attestedReport = (withTimestamp: boolean): Record<string, unknown> => {
    const report = buildValidPhase2aReport();
    const { publicKey: _pk, privateKey } = generateEd25519KeyPair();
    const signed = signAssertion(buildUnsignedAssertion(report), privateKey, "test-key-1");
    const verified: Assertion = withTimestamp
      ? {
          ...signed,
          rfc3161_timestamp: {
            token: "MIIBBQYJKoZIhvcNAQcCoIH3MIH0AgEDMQ8=",
            tsa_name: "test TSA",
          },
        }
      : signed;
    const attached = attachAttestations(report, [
      {
        attestation_id: "urn:uuid:00000000-0000-4000-8000-000000000002",
        attester: { name: "Test Attester", key_id: "test-key-1" },
        created_at: "2026-08-13T00:00:00Z",
        assertions: [verified],
      },
    ]);
    const normalized = JSON.parse(JSON.stringify(attached)) as Record<string, unknown>;
    normalized["$schema"] = "urn:nomue:schema:verification-report:0.2.0-draft.3";
    normalized["verifier"] = {
      ...(normalized["verifier"] as object),
      source_commit: "0".repeat(40),
    };
    return normalized;
  };

  it("accepts an attested report without a timestamp (absence carries no claim)", () => {
    const validate = draft3Validator();
    expect(validate(attestedReport(false)), JSON.stringify(validate.errors)).toBe(true);
  });

  it("accepts the optional rfc3161_timestamp member", () => {
    const validate = draft3Validator();
    expect(validate(attestedReport(true)), JSON.stringify(validate.errors)).toBe(true);
  });

  it("draft-2 rejects the timestamp member, proving the addition is a real schema version", () => {
    const validate = attestationReportValidator();
    const withTs = attestedReport(true);
    withTs["$schema"] = "urn:nomue:schema:verification-report:0.2.0-draft.2";
    expect(validate(withTs)).toBe(false);
  });
});
