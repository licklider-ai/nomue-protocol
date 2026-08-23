/**
 * Strict JCS input eligibility fixture authoring (JSON-DUP-*, JSON-UNI-*).
 *
 * Expected outcomes are NOT declared here: they come from the hand-authored
 * normative table conformance/expectations/strict-json-expectations.yaml.
 * This module builds the fixture inputs (raw JSON text - duplicates cannot
 * be expressed through JSON.stringify, so refusal inputs are authored as
 * text), replays the verifier, ASSERTS the implementation against the
 * expectations (authoring aborts on any disagreement), and returns manifest
 * entries. It never writes the expectations file.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { canonicalProjection, sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { semanticProjectionHash } from "../../../reference/verifier/src/projection.js";
import { loadVerifierResources } from "../../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { loadYaml, repoRoot } from "../lib/repo.js";

const PHASE1_BUNDLE = "urn:nomue:bundle:itgc-minimal:0.1.0-draft.1";
const PHASE2A_BUNDLE = "urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1";

const CHECK_KEY_MAP: Record<string, string> = {
  "record-integrity-0.1": "urn:nomue:check:record-integrity:0.1.0-draft.1",
  "itgc-preconditions-0.1": "urn:nomue:check:itgc-preconditions:0.1.0-draft.1",
  "welch-recompute-0.1": "urn:nomue:check:welch-recompute:0.1.0-draft.1",
};

interface Json {
  [key: string]: unknown;
}

interface StrictJsonExpectationEntry {
  family: string;
  classification: string;
  purpose: string;
  requirement_ids: string[];
  expected: {
    kind: "refusal" | "record";
    cli_exit_code: number;
    refusal_kind?: string;
    refusal_reason_codes?: string[];
    conformance?: { execution: string; outcome: string | null; reason_codes: string[] };
    checks?: Record<string, { execution: string; outcome: string | null; reason_codes: string[] }>;
  };
}

interface StrictJsonExpectationsFile {
  manifest: string;
  fixtures: Record<string, StrictJsonExpectationEntry>;
}

export interface StrictJsonManifestFixture {
  fixture_id: string;
  family: string;
  entry: Json;
}

export interface StrictJsonAuthorDeps {
  /** Serialized valid Phase 1 record text used as the injection source. */
  validRecordText: (serial: number) => string;
  /** Valid Phase 1 record with a caller-chosen design.outcome label, sealed. */
  labeledRecord: (serial: number, label: string) => Json;
}

function assertEqual(actual: unknown, expected: unknown, context: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${context}: expected ${e}, got ${a}`);
}

const sortCodes = (codes: string[]): string[] => [...codes].sort();

/** Inject a duplicate by replacing the FIRST occurrence of `needle`. */
function inject(text: string, needle: string, replacement: string, context: string): string {
  if (!text.includes(needle)) throw new Error(`${context}: injection needle not found`);
  return text.replace(needle, replacement);
}

const NFC_NFD_LABEL = "caf\u00e9 (NFC) vs cafe\u0301 (NFD)";
const EMOJI_LABEL = "grinning face \u{1F600} outcome";
const FAKE_KEY_LABEL =
  '"interpretation_bundle_id": 1, "interpretation_bundle_id": 2 (value text, not member names)';
const ESCAPED_PUNCT_LABEL = 'quote " backslash \\ brace { } bracket [ ] colon : comma ,';

function buildInputs(deps: StrictJsonAuthorDeps): Map<string, string> {
  const inputs = new Map<string, string>();
  const source = deps.validRecordText(2001);

  inputs.set(
    "JSON-DUP-001",
    `{"interpretation_bundle_id": "${PHASE1_BUNDLE}", "interpretation_bundle_id": "${PHASE1_BUNDLE}"}\n`,
  );
  inputs.set(
    "JSON-DUP-002",
    `{"interpretation_bundle_id": "${PHASE1_BUNDLE}", "interpretation_bundle_id": "${PHASE2A_BUNDLE}"}\n`,
  );
  inputs.set(
    "JSON-DUP-003",
    `{"interpretation_bundle_id": "${PHASE2A_BUNDLE}", "interpretation_bundle_id": "${PHASE1_BUNDLE}"}\n`,
  );
  inputs.set(
    "JSON-DUP-004",
    `{"interpretation_bundle_id": "${PHASE1_BUNDLE}", "\\u0069nterpretation_bundle_id": "${PHASE1_BUNDLE}"}\n`,
  );
  inputs.set(
    "JSON-DUP-005",
    inject(source, '"p_value": ', '"p_value": 0.5, "p_value": ', "JSON-DUP-005"),
  );
  inputs.set(
    "JSON-DUP-006",
    inject(
      source,
      '"content_digest": "',
      `"content_digest": "sha256:${"ab".repeat(32)}", "content_digest": "`,
      "JSON-DUP-006",
    ),
  );
  inputs.set(
    "JSON-DUP-007",
    inject(source, '"outcome_value": 1', '"outcome_value": 1, "outcome_value": 1', "JSON-DUP-007"),
  );
  inputs.set(
    "JSON-DUP-008",
    inject(
      source,
      '"dataset_id": "dataset-1"',
      '"dataset_id": "dataset-1", "dataset_id": "dataset-1"',
      "JSON-DUP-008",
    ),
  );
  inputs.set(
    "JSON-DUP-009",
    inject(
      source,
      '"scale": "continuous"',
      '"scale": "ordinal", "scale": "continuous"',
      "JSON-DUP-009",
    ),
  );

  inputs.set("JSON-UNI-001", '{"s": "\\uD800"}\n');
  inputs.set("JSON-UNI-002", '{"s": "\\uDC00"}\n');
  inputs.set("JSON-UNI-003", '{"\\uD800": 1}\n');

  // Negative-zero series (NRS-CANON-0015, Batch 5): rejected at the lexical
  // stage, never normalized to 0.
  inputs.set("JSON-NEG-001", '{"value": -0}\n');
  inputs.set(
    "JSON-NEG-002",
    inject(source, '"outcome_value": 1', '"outcome_value": -0.0', "JSON-NEG-002"),
  );
  inputs.set("JSON-NEG-003", '{"value": -0e5}\n');

  const jsonText = (value: unknown): string => `${JSON.stringify(value, null, 2)}\n`;
  inputs.set("JSON-DUP-010", jsonText(deps.labeledRecord(2010, FAKE_KEY_LABEL)));
  inputs.set("JSON-DUP-011", jsonText(deps.labeledRecord(2011, ESCAPED_PUNCT_LABEL)));

  // The emoji is serialized literally by JSON.stringify; rewriting it as a
  // correctly paired surrogate ESCAPE decodes to the same value, so the
  // sealed digest still matches and the escaped-pair path is exercised
  // end to end.
  const emojiRecord = deps.labeledRecord(2012, EMOJI_LABEL);
  const emojiText = jsonText(emojiRecord);
  if (!emojiText.includes("\u{1F600}")) throw new Error("JSON-UNI-004: emoji not serialized");
  inputs.set("JSON-UNI-004", emojiText.replace("\u{1F600}", "\\uD83D\\uDE00"));

  const nfcNfdRecord = deps.labeledRecord(2013, NFC_NFD_LABEL);
  inputs.set("JSON-UNI-005", jsonText(nfcNfdRecord));
  // No normalization: both spellings survive into the canonical form as
  // distinct code-point sequences.
  const canonical = canonicalProjection(nfcNfdRecord as Record<string, unknown>);
  if (!canonical.includes("caf\u00e9") || !canonical.includes("cafe\u0301")) {
    throw new Error("JSON-UNI-005: NFC/NFD sequences did not survive canonicalization distinctly");
  }

  return inputs;
}

export function buildStrictJsonFixtures(deps: StrictJsonAuthorDeps): StrictJsonManifestFixture[] {
  const expectations = loadYaml<StrictJsonExpectationsFile>(
    "conformance/expectations/strict-json-expectations.yaml",
  );
  const inputs = buildInputs(deps);
  const resources = loadVerifierResources();
  const out: StrictJsonManifestFixture[] = [];

  for (const [fixtureId, spec] of Object.entries(expectations.fixtures)) {
    const text = inputs.get(fixtureId);
    if (text === undefined) throw new Error(`no input builder for ${fixtureId}`);
    const inputRel = `conformance/fixtures/strict_json/${fixtureId}.json`;
    const abs = path.join(repoRoot, inputRel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, text, "utf8");

    const outcome = verifyRecordText(text);
    assertEqual(outcome.exitCode, spec.expected.cli_exit_code, `${fixtureId} exit`);

    const entry: Json = {
      fixture_id: fixtureId,
      classification: spec.classification,
      purpose: spec.purpose,
      input: inputRel,
      input_sha256: sha256HexOfUtf8(text),
      requirement_ids: [...spec.requirement_ids],
    };

    if (spec.expected.kind === "refusal") {
      const refusal = outcome.refusal;
      if (refusal === undefined) throw new Error(`${fixtureId}: expected a refusal`);
      if (outcome.report !== undefined) throw new Error(`${fixtureId}: no report may exist`);
      assertEqual(refusal.refusal_kind, spec.expected.refusal_kind, `${fixtureId} kind`);
      assertEqual(
        sortCodes(refusal.reason_codes),
        sortCodes(spec.expected.refusal_reason_codes ?? []),
        `${fixtureId} refusal codes`,
      );
      if (resources.validateRefusal(refusal) !== true) {
        throw new Error(
          `${fixtureId}: refusal does not validate against the refusal schema: ${JSON.stringify(
            resources.validateRefusal.errors,
          )}`,
        );
      }
      entry["expected"] = {
        kind: "refusal",
        cli_exit_code: spec.expected.cli_exit_code,
        refusal_kind: spec.expected.refusal_kind,
        refusal_reason_codes: [...(spec.expected.refusal_reason_codes ?? [])],
        refusal_schema_valid: true,
      };
    } else {
      const report = outcome.report;
      if (report === undefined) throw new Error(`${fixtureId}: expected a report`);
      assertEqual(
        {
          execution: report.conformance.execution,
          outcome: report.conformance.outcome ?? null,
          reason_codes: sortCodes(report.conformance.reason_codes),
        },
        {
          execution: spec.expected.conformance?.execution,
          outcome: spec.expected.conformance?.outcome ?? null,
          reason_codes: sortCodes(spec.expected.conformance?.reason_codes ?? []),
        },
        `${fixtureId} conformance`,
      );
      const expectedChecks: Json[] = [];
      for (const [key, expectedCheck] of Object.entries(spec.expected.checks ?? {})) {
        const checkId = CHECK_KEY_MAP[key];
        if (checkId === undefined) throw new Error(`${fixtureId}: unknown check key ${key}`);
        const actual = report.verification_results.find((r) => r.check_id === checkId);
        if (actual === undefined) throw new Error(`${fixtureId}: missing ${checkId}`);
        assertEqual(
          {
            execution: actual.execution,
            outcome: actual.outcome ?? null,
            reason_codes: sortCodes(actual.reason_codes),
          },
          {
            execution: expectedCheck.execution,
            outcome: expectedCheck.outcome,
            reason_codes: sortCodes(expectedCheck.reason_codes),
          },
          `${fixtureId} ${checkId}`,
        );
        expectedChecks.push({
          check_id: checkId,
          execution: expectedCheck.execution,
          outcome: expectedCheck.outcome,
          reason_codes: [...expectedCheck.reason_codes],
        });
      }
      entry["expected"] = {
        kind: "record",
        cli_exit_code: spec.expected.cli_exit_code,
        conformance: {
          execution: spec.expected.conformance?.execution,
          outcome: spec.expected.conformance?.outcome ?? null,
          reason_codes: [...(spec.expected.conformance?.reason_codes ?? [])],
        },
        checks: expectedChecks,
        semantic_projection_hash: semanticProjectionHash(report),
      };
    }

    out.push({ fixture_id: fixtureId, family: spec.family, entry });
  }

  return out;
}
