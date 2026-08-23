/**
 * Record lifecycle state model tests (NRS-CORE-0013..0019, ADR-0028):
 * schema compilation, the NRS-VERIFY-0001 guard (closed predicate
 * vocabulary contains no outcome aggregate - the design document's
 * self-observation promoted to a test, per the approval ruling), the
 * nomue_attested projection path with generated keys, and clarification
 * schema validity of produced output.
 */

import { Ajv2020 } from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";
import {
  attachAttestations,
  generateEd25519KeyPair,
  computeSpkiSha256Fingerprint,
  signAssertion,
  ATTESTATION_STATEMENT_ID,
  ED25519_SUITE_ID,
  type TrustRoot,
} from "../../reference/verifier/src/attestation.js";
import {
  evaluateOperation,
  loadLifecycleOperations,
  projectState,
} from "../../reference/verifier/src/lifecycle.js";
import { loadVerifierResources } from "../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../reference/verifier/src/verify.js";
import { loadJson, readText } from "../src/lib/repo.js";

const EVALUATION_TIME = "2026-08-13T00:00:00Z";

const lifecycleSchemas = [
  "schemas/lifecycle/state-view-0.1.schema.json",
  "schemas/lifecycle/clarification-0.1.schema.json",
  "schemas/lifecycle/disclosure-notice-0.1.schema.json",
];

function compileLifecycleSchemas() {
  const ajv = new Ajv2020({
    allErrors: true,
    strictSchema: true,
    strictTypes: true,
    strictRequired: false,
  });
  for (const file of lifecycleSchemas) ajv.addSchema(loadJson<object>(file));
  return ajv;
}

const validRecord = () => {
  const text = readText("conformance/fixtures/public_checks/A2-V-001.json");
  const outcome = verifyRecordText(text);
  if (outcome.report === undefined) throw new Error("expected report");
  return { record: JSON.parse(text) as Record<string, unknown>, report: outcome.report };
};

const registeredBundleIds = () => [...loadVerifierResources().bundles.keys()];

describe("lifecycle schemas", () => {
  it("all three lifecycle schemas compile and a produced state view validates", () => {
    const ajv = compileLifecycleSchemas();
    const { record, report } = validRecord();
    const view = projectState({
      record,
      report,
      registeredBundleIds: registeredBundleIds(),
      evaluationTimeIso: EVALUATION_TIME,
    });
    const validate = ajv.getSchema("urn:nomue:schema:state-view:0.1.0-draft.1");
    if (validate === undefined) throw new Error("state-view schema missing");
    expect(validate(JSON.parse(JSON.stringify(view))), JSON.stringify(validate.errors)).toBe(true);
  });

  it("a produced needs_clarification validates against the clarification schema", () => {
    const ajv = compileLifecycleSchemas();
    const { record } = validRecord();
    const view = projectState({
      record,
      registeredBundleIds: registeredBundleIds(),
      evaluationTimeIso: EVALUATION_TIME,
    });
    const decision = evaluateOperation("attest", view, loadLifecycleOperations());
    expect(decision.result).toBe("needs_clarification");
    if (decision.result !== "needs_clarification") throw new Error("unreachable");
    const validate = ajv.getSchema("urn:nomue:schema:clarification:0.1.0-draft.1");
    if (validate === undefined) throw new Error("clarification schema missing");
    expect(
      validate(JSON.parse(JSON.stringify(decision.clarification))),
      JSON.stringify(validate.errors),
    ).toBe(true);
  });

  it("the disclosure-notice schema requires superseded_by exactly for supersession", () => {
    const ajv = compileLifecycleSchemas();
    const validate = ajv.getSchema("urn:nomue:schema:disclosure-notice:0.1.0-draft.1");
    if (validate === undefined) throw new Error("notice schema missing");
    const base = {
      $schema: "urn:nomue:schema:disclosure-notice:0.1.0-draft.1",
      notice_type: "nomue-disclosure-notice",
      subject: {
        record_id: "urn:a",
        revision_id: "urn:b",
        content_digest: `sha256:${"0".repeat(64)}`,
      },
      issued_at: EVALUATION_TIME,
    };
    expect(validate({ ...base, notice_kind: "withdrawal" })).toBe(true);
    expect(validate({ ...base, notice_kind: "withdrawal", superseded_by: "urn:c" })).toBe(false);
    expect(validate({ ...base, notice_kind: "supersession" })).toBe(false);
    expect(validate({ ...base, notice_kind: "supersession", superseded_by: "urn:c" })).toBe(true);
  });

  it("lifecycle conformance notices validate against the disclosure-notice schema", () => {
    const ajv = compileLifecycleSchemas();
    const validate = ajv.getSchema("urn:nomue:schema:disclosure-notice:0.1.0-draft.1");
    if (validate === undefined) throw new Error("notice schema missing");
    for (const fixtureId of ["LC-006", "LC-007", "LC-022"]) {
      const input = JSON.parse(readText(`conformance/fixtures/lifecycle/${fixtureId}.json`)) as {
        notices: unknown[];
      };
      expect(input.notices.length, fixtureId).toBeGreaterThan(0);
      for (const notice of input.notices) {
        expect(validate(notice), `${fixtureId}: ${JSON.stringify(validate.errors)}`).toBe(true);
      }
    }
  });
});

describe("NRS-VERIFY-0001 guard (no overall verdict through the back door)", () => {
  it("the registry meta-schema's predicate vocabulary contains no outcome aggregate", () => {
    const meta = loadJson<{
      properties: {
        operations: {
          items: {
            properties: {
              preconditions: { items: { properties: { predicate: { enum: string[] } } } };
            };
          };
        };
      };
    }>("schemas/meta/lifecycle-operations.schema.json");
    const vocabulary =
      meta.properties.operations.items.properties.preconditions.items.properties.predicate.enum;
    for (const predicate of vocabulary) {
      expect(predicate, predicate).not.toMatch(/pass|fail|verdict|outcome/);
    }
    expect(vocabulary).not.toContain("all_checks_pass");
  });

  it("the evaluator throws on an outcome-aggregating predicate instead of evaluating it", () => {
    const { record, report } = validRecord();
    const view = projectState({
      record,
      report,
      registeredBundleIds: registeredBundleIds(),
      evaluationTimeIso: EVALUATION_TIME,
    });
    const rogueRegistry = {
      registry: "nrs-lifecycle-operations",
      registry_version: "0.0.0-test",
      operations: [
        {
          operation: "attest",
          preconditions: [{ axis: "check" as const, predicate: "all_checks_pass" }],
        },
      ],
    };
    expect(() => evaluateOperation("attest", view, rogueRegistry)).toThrow(/closed/);
  });

  it("the state view exposes no aggregate verdict field and the check axis carries execution values only", () => {
    const { record, report } = validRecord();
    const view = projectState({
      record,
      report,
      registeredBundleIds: registeredBundleIds(),
      evaluationTimeIso: EVALUATION_TIME,
    });
    const serialized = JSON.stringify(view);
    expect(serialized).not.toMatch(/overall|VERIFIED|verdict/i);
    expect(["all_completed", "some_not_run", "some_error", "not_evaluated"]).toContain(
      view.axes.check.value,
    );
  });
});

describe("nomue_attested projection path (generated keys, injected trust root)", () => {
  it("reaches nomue_attested only via a pinned, in-window key", () => {
    const { record, report } = validRecord();
    const { publicKey, privateKey } = generateEd25519KeyPair();
    const trustRoot: TrustRoot = {
      registry: "nrs-attestation-trust-root",
      registry_version: "0.0.0-test",
      updated: "2026-08-13",
      fingerprint_method: "sha256 over DER SPKI (test)",
      keys: [
        {
          key_id: "urn:nomue:attestation-key:test:1",
          generation: 1,
          suite_id: ED25519_SUITE_ID,
          public_key_pem: publicKey,
          fingerprint: computeSpkiSha256Fingerprint(publicKey),
          valid_from: "2026-01-01T00:00:00Z",
          valid_until: null,
          status: "active",
          superseded_by: null,
        },
      ],
    };
    const assertion = signAssertion(
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
      },
      privateKey,
      "urn:nomue:attestation-key:test:1",
    );
    const attested = attachAttestations(report, [
      {
        attestation_id: "urn:uuid:00000000-0000-4000-8000-000000000002",
        attester: { name: "Test", key_id: "urn:nomue:attestation-key:test:1" },
        created_at: EVALUATION_TIME,
        assertions: [assertion],
      },
    ]);

    const withPin = projectState({
      record,
      report,
      attestations: attested.attestations,
      trustRoot,
      registeredBundleIds: registeredBundleIds(),
      evaluationTimeIso: EVALUATION_TIME,
    });
    expect(withPin.axes.verification.value).toBe("nomue_attested");

    const emptyRoot: TrustRoot = { ...trustRoot, keys: [] };
    const withoutPin = projectState({
      record,
      report,
      attestations: attested.attestations,
      trustRoot: emptyRoot,
      registeredBundleIds: registeredBundleIds(),
      evaluationTimeIso: EVALUATION_TIME,
    });
    expect(withoutPin.axes.verification.value).toBe("report_exists");
  });
});
