/**
 * Emitter conformance fixture authoring (E-001..E-005, NRS-EMIT-0001/0004).
 *
 * Unlike every other fixture family in this suite, expected values here are
 * NOT derived by running the reference verifier and pinning its output.
 * Schema validity is checked with a fresh AJV instance against the raw
 * schema files (tooling/src/phase1/schemas.ts, compilePhase1Schemas);
 * digest correctness is checked with the independent `canonicalize` npm
 * package plus node:crypto directly - never
 * reference/verifier/src/jcs.ts. Both are computed and asserted FIRST,
 * before the reference verifier is even invoked. The reference verifier is
 * then run only as a consistency check (does the shipped implementation
 * agree with the independently-derived answer) and its result is what gets
 * pinned in the standard fixture shape (`expected.kind: "record"`, the same
 * shape every other record-kind fixture in this suite uses, so the shared
 * conformance runner replays E-family fixtures exactly like any other) -
 * the `independent_verification` block on each fixture is additional,
 * non-replayed evidence of how the pinned expectation was actually derived,
 * for a reviewer reading conformance/manifest.yaml directly.
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import canonicalizeModule from "canonicalize";
import { CHECK_IDS } from "../../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { repoRoot } from "../lib/repo.js";
import { compilePhase1Schemas, RECORD_SCHEMA_ID } from "./schemas.js";

const independentJcs: (value: unknown) => string | undefined =
  (canonicalizeModule as unknown as { default?: (value: unknown) => string | undefined }).default ??
  (canonicalizeModule as unknown as (value: unknown) => string | undefined);

interface Json {
  [key: string]: unknown;
}

/**
 * The record-content domain tag (NRS-CANON-0020), restated here as its own
 * literal from the specification text rather than imported from
 * reference/verifier/src/digest.ts - this module's value comes from being
 * independent of the reference implementation.
 */
const INDEPENDENT_RECORD_CONTENT_TAG = "nomue/record-content/v1\n";

/** SHA-256 of the domain tag plus the independent JCS canonical form, integrity member excluded (NRS-CORE-0006, NRS-EMIT-0004, NRS-CANON-0020/0022). Deliberately independent of reference/verifier/src/jcs.ts and digest.ts. */
function independentDigest(record: Json): string {
  const { integrity: _integrity, ...projection } = record;
  const canonical = independentJcs(projection);
  if (canonical === undefined) {
    throw new Error("independent JCS canonicalization rejected the record (non-finite value?)");
  }
  return `sha256:${createHash("sha256")
    .update(INDEPENDENT_RECORD_CONTENT_TAG + canonical, "utf8")
    .digest("hex")}`;
}

function loadBaseRecord(): Json {
  const text = fs.readFileSync(
    path.join(repoRoot, "conformance/fixtures/public_checks/V-001.json"),
    "utf8",
  );
  return JSON.parse(text) as Json;
}

function reseal(record: Json): Json {
  return {
    ...record,
    integrity: {
      canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1",
      digest_algorithm: "sha-256",
      digest_scope: "record_without_integrity",
      content_digest: independentDigest(record),
    },
  };
}

function assertEqual(actual: unknown, expected: unknown, context: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${context}: expected ${e}, got ${a}`);
}

const notRunChecks = (codes: string[]): Json[] => [
  { check_id: CHECK_IDS.integrity, execution: "not_run", outcome: null, reason_codes: codes },
  { check_id: CHECK_IDS.preconditions, execution: "not_run", outcome: null, reason_codes: codes },
  { check_id: CHECK_IDS.welch, execution: "not_run", outcome: null, reason_codes: codes },
];

const allPassChecks: Json[] = [
  { check_id: CHECK_IDS.integrity, execution: "completed", outcome: "pass", reason_codes: [] },
  { check_id: CHECK_IDS.preconditions, execution: "completed", outcome: "pass", reason_codes: [] },
  { check_id: CHECK_IDS.welch, execution: "completed", outcome: "pass", reason_codes: [] },
];

export interface EmitterManifestFixture {
  fixture_id: string;
  family: "emitter";
  entry: Json;
}

interface EmitterFixtureResult {
  fixtureId: string;
  classification: string;
  purpose: string;
  requirementIds: string[];
  record: Json;
  independentVerification: Json;
  expectedCliExitCode: number;
  expectedConformance: Json;
  expectedChecks: Json[];
}

export function buildEmitterFixtures(): EmitterManifestFixture[] {
  const compiled = compilePhase1Schemas();
  if (compiled.issues.length > 0) {
    throw new Error(
      `emitter fixtures: schema compilation issues: ${JSON.stringify(compiled.issues)}`,
    );
  }
  const validateRecord = compiled.validateRecord;
  if (validateRecord === undefined) {
    throw new Error(`emitter fixtures: ${RECORD_SCHEMA_ID} did not compile`);
  }

  const fixturesRoot = path.join(repoRoot, "conformance", "fixtures", "emitter");
  fs.mkdirSync(fixturesRoot, { recursive: true });

  const specs: EmitterFixtureResult[] = [];

  // E-001: an independently-resealed valid record. Schema-valid per the raw
  // schema files; digest matches per an independent JCS+SHA-256
  // computation performed BEFORE the reference verifier is invoked.
  {
    const record = reseal(loadBaseRecord());
    const schemaValid = validateRecord(record) === true;
    assertEqual(schemaValid, true, "E-001 independently-computed schema validity");
    const expectedDigest = (record["integrity"] as Json)["content_digest"];
    const recomputed = independentDigest(record);
    assertEqual(recomputed, expectedDigest, "E-001 independently-recomputed digest");

    specs.push({
      fixtureId: "E-001",
      classification: "emitter_valid",
      purpose:
        "An independently-resealed, schema-valid Record with a correctly (independently) computed digest. Baseline: an emitter that gets both NRS-EMIT-0001 and NRS-EMIT-0004 right produces exactly this.",
      requirementIds: ["NRS-EMIT-0001", "NRS-EMIT-0004"],
      record,
      independentVerification: {
        schema_valid: true,
        method: "AJV against schemas/record/record.schema.json (tooling/src/phase1/schemas.ts)",
        digest_matches: true,
        digest_method:
          "independent fixed record-content domain tag + `canonicalize` JCS + node:crypto SHA-256",
      },
      expectedCliExitCode: 0,
      expectedConformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      expectedChecks: allPassChecks,
    });
  }

  // E-002: an unknown top-level field. Schema-invalid per the schema's own
  // additionalProperties: false (schemas/record/record.schema.json) -
  // readable directly from that file, no verifier execution required to
  // know this in advance.
  {
    const base = loadBaseRecord();
    const withExtension: Json = { ...base, custom_extension: { note: "not a registered field" } };
    const record = reseal(withExtension);
    const schemaValid = validateRecord(record) === true;
    assertEqual(schemaValid, false, "E-002 independently-computed schema validity");

    specs.push({
      fixtureId: "E-002",
      classification: "emitter_invalid_unknown_field",
      purpose:
        "An emitted Record adds a field the pinned schema does not declare. additionalProperties: false in schemas/record/record.schema.json makes this schema-invalid independent of any verifier - reading that one schema file is sufficient to predict this fixture's outcome.",
      requirementIds: ["NRS-EMIT-0001"],
      record,
      independentVerification: {
        schema_valid: false,
        method: "AJV against schemas/record/record.schema.json (tooling/src/phase1/schemas.ts)",
      },
      expectedCliExitCode: 2,
      expectedConformance: {
        execution: "completed",
        outcome: "fail",
        reason_codes: ["NRS-SCHEMA-INVALID"],
      },
      expectedChecks: notRunChecks(["NRS-SCHEMA-INVALID"]),
    });
  }

  // E-003: schema-valid, but the declared digest was not recomputed after
  // being deliberately set to a different (syntactically valid) sha256
  // value. The independent JCS+SHA-256 computation disagrees with the
  // declared value - this is checkable by anyone who canonicalizes the
  // record and hashes it, without running this repository's verifier.
  {
    const record = reseal(loadBaseRecord());
    const wrongDigest = `sha256:${"ab".repeat(32)}`;
    const tampered: Json = {
      ...record,
      integrity: { ...(record["integrity"] as Json), content_digest: wrongDigest },
    };
    const schemaValid = validateRecord(tampered) === true;
    assertEqual(schemaValid, true, "E-003 independently-computed schema validity");
    const recomputed = independentDigest(tampered);
    assertEqual(
      recomputed === wrongDigest,
      false,
      "E-003 independently-recomputed digest mismatch",
    );

    specs.push({
      fixtureId: "E-003",
      classification: "emitter_invalid_digest_mismatch",
      purpose:
        "An emitted Record's declared content_digest was not recomputed after being set to an arbitrary (but syntactically valid) sha256 value. Independent JCS canonicalization plus domain-separated SHA-256 disagrees with the declared value - NRS-EMIT-0004 violated, checkable without this repository's verifier.",
      requirementIds: ["NRS-EMIT-0004"],
      record: tampered,
      independentVerification: {
        schema_valid: true,
        digest_matches: false,
        independently_recomputed_digest: recomputed,
        declared_digest: wrongDigest,
        digest_method:
          "independent fixed record-content domain tag + `canonicalize` JCS + node:crypto SHA-256",
      },
      expectedCliExitCode: 2,
      expectedConformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      expectedChecks: [
        {
          check_id: CHECK_IDS.integrity,
          execution: "completed",
          outcome: "fail",
          reason_codes: ["NRS-DIGEST-MISMATCH"],
        },
        {
          check_id: CHECK_IDS.preconditions,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        { check_id: CHECK_IDS.welch, execution: "completed", outcome: "pass", reason_codes: [] },
      ],
    });
  }

  // E-004: a required field removed. Schema-invalid per the schema's own
  // `required` array - directly readable, no verifier execution needed.
  {
    const base = loadBaseRecord();
    const { created_at: _createdAt, ...withoutCreatedAt } = base;
    const record = reseal(withoutCreatedAt);
    const schemaValid = validateRecord(record) === true;
    assertEqual(schemaValid, false, "E-004 independently-computed schema validity");

    specs.push({
      fixtureId: "E-004",
      classification: "emitter_invalid_missing_required_field",
      purpose:
        "An emitted Record omits created_at, a field the schema's own `required` array declares mandatory - schema-invalid independent of any verifier.",
      requirementIds: ["NRS-EMIT-0001"],
      record,
      independentVerification: {
        schema_valid: false,
        method: "AJV against schemas/record/record.schema.json (tooling/src/phase1/schemas.ts)",
      },
      expectedCliExitCode: 2,
      expectedConformance: {
        execution: "completed",
        outcome: "fail",
        reason_codes: ["NRS-SCHEMA-INVALID"],
      },
      expectedChecks: notRunChecks(["NRS-SCHEMA-INVALID"]),
    });
  }

  // E-005: created_at with a numeric UTC offset instead of Z. The schema's
  // rfc3339UtcZ pattern (schemas/common/identifier.schema.json) requires a
  // trailing Z - directly readable from that one regex, no verifier
  // execution needed to predict this outcome.
  {
    const base = loadBaseRecord();
    const withOffset: Json = { ...base, created_at: "2026-08-09T09:00:00+09:00" };
    const record = reseal(withOffset);
    const schemaValid = validateRecord(record) === true;
    assertEqual(schemaValid, false, "E-005 independently-computed schema validity");

    specs.push({
      fixtureId: "E-005",
      classification: "emitter_invalid_non_utc_timestamp",
      purpose:
        "An emitted Record declares created_at with a numeric UTC offset (+09:00) instead of a trailing Z. schemas/common/identifier.schema.json's rfc3339UtcZ pattern requires Z - schema-invalid independent of any verifier.",
      requirementIds: ["NRS-EMIT-0001"],
      record,
      independentVerification: {
        schema_valid: false,
        method: "AJV against schemas/common/identifier.schema.json's rfc3339UtcZ pattern",
      },
      expectedCliExitCode: 2,
      expectedConformance: {
        execution: "completed",
        outcome: "fail",
        reason_codes: ["NRS-SCHEMA-INVALID"],
      },
      expectedChecks: notRunChecks(["NRS-SCHEMA-INVALID"]),
    });
  }

  const results: EmitterManifestFixture[] = [];
  for (const spec of specs) {
    const text = `${JSON.stringify(spec.record, null, 2)}\n`;
    fs.writeFileSync(path.join(fixturesRoot, `${spec.fixtureId}.json`), text, "utf8");
    const sha256 = createHash("sha256").update(text, "utf8").digest("hex");

    // Reference-verifier consistency check: the independently-derived
    // expectation above must match what the shipped implementation
    // actually produces. This is the SAME role oracle cross-checks play
    // for numeric fixtures elsewhere in this suite.
    const outcome = verifyRecordText(text);
    assertEqual(
      outcome.exitCode,
      spec.expectedCliExitCode,
      `${spec.fixtureId} reference-verifier exit code`,
    );
    const report = outcome.report;
    if (report === undefined) throw new Error(`${spec.fixtureId}: expected a report`);
    assertEqual(
      {
        execution: report.conformance.execution,
        outcome: report.conformance.outcome ?? null,
        reason_codes: [...report.conformance.reason_codes].sort(),
      },
      {
        execution: (spec.expectedConformance["execution"] as string) ?? null,
        outcome: (spec.expectedConformance["outcome"] as string | null) ?? null,
        reason_codes: [...(spec.expectedConformance["reason_codes"] as string[])].sort(),
      },
      `${spec.fixtureId} reference-verifier conformance`,
    );
    for (const expectedCheck of spec.expectedChecks) {
      const checkId = expectedCheck["check_id"] as string;
      const actual = report.verification_results.find((r) => r.check_id === checkId);
      if (actual === undefined) throw new Error(`${spec.fixtureId}: missing check ${checkId}`);
      assertEqual(
        {
          execution: actual.execution,
          outcome: actual.outcome ?? null,
          reason_codes: [...actual.reason_codes].sort(),
        },
        {
          execution: expectedCheck["execution"],
          outcome: expectedCheck["outcome"],
          reason_codes: [...(expectedCheck["reason_codes"] as string[])].sort(),
        },
        `${spec.fixtureId} reference-verifier check ${checkId}`,
      );
    }

    results.push({
      fixture_id: spec.fixtureId,
      family: "emitter",
      entry: {
        fixture_id: spec.fixtureId,
        classification: spec.classification,
        purpose: spec.purpose,
        input: `conformance/fixtures/emitter/${spec.fixtureId}.json`,
        input_sha256: sha256,
        requirement_ids: spec.requirementIds,
        independent_verification: spec.independentVerification,
        expected: {
          kind: "record",
          cli_exit_code: spec.expectedCliExitCode,
          conformance: spec.expectedConformance,
          checks: spec.expectedChecks,
        },
      },
    });
  }

  return results;
}
