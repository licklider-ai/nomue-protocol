/**
 * Phase 2A fixture authoring.
 *
 * Expected outcomes, reason codes, and exit codes are NOT declared here:
 * they come from the hand-authored normative table
 * conformance/expectations/phase-2a-expectations.yaml, written from the
 * specification before the verifier ran. This module builds the fixture
 * inputs, replays the verifier, ASSERTS the implementation against the
 * expectations (authoring aborts on any disagreement), and returns manifest
 * entries. It never writes the expectations file.
 *
 * Semantic-projection hashes are computed through the independent
 * `canonicalize` JCS implementation plus node:crypto, not the verifier's
 * canonicalizer; the projection CONTENT still originates from the verifier,
 * which is a disclosed residual under gate R1-03 (implementation evidence
 * for conformance, verification, and attestations), still open. The
 * numerical-value oracle gap this note used to also cite (gate R1-08) is
 * closed with decision "pass" (authority/release-1-gates.yaml,
 * tooling/r1-08-oracle/README.md); it no longer covers the
 * execution-state/projection-shape residual described here.
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import canonicalizeModule from "canonicalize";
import { welchTwoSampleTTestWithCi } from "../../../reference/stats-kernel/src/kernel.js";
import { sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { recomputeContentDigest } from "../../../reference/verifier/src/digest.js";
import { semanticProjection } from "../../../reference/verifier/src/projection.js";
import { loadVerifierResources } from "../../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { loadYaml, repoRoot } from "../lib/repo.js";
import { A2_DATASETS, EXAMPLE_2A_DATASET } from "./datasets.js";

const independentJcs: (value: unknown) => string | undefined =
  (canonicalizeModule as unknown as { default?: (value: unknown) => string | undefined }).default ??
  (canonicalizeModule as unknown as (value: unknown) => string | undefined);

const BUNDLE_2A = "urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1";
const BUNDLE_01 = "urn:nomue:bundle:itgc-minimal:0.1.0-draft.1";
const RECORD_SCHEMA_2A = "urn:nomue:schema:record:0.2.0-draft.1";
const PROFILE_2A = "urn:nomue:profile:itgc:0.2.0-draft.1";
const WELCH_METHOD = "urn:nomue:method:welch-two-sample-t:1";
const CI_METHOD = "urn:nomue:method:welch-satterthwaite-mean-difference-ci:1";
const CREATED_AT = "2026-08-10T00:00:00Z";

const CHECK_KEY_MAP: Record<string, string> = {
  "record-integrity": "urn:nomue:check:record-integrity:0.2.0-draft.1",
  "itgc-profile-admissibility": "urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1",
  "welch-computability": "urn:nomue:check:welch-computability:0.2.0-draft.1",
  "welch-recompute": "urn:nomue:check:welch-recompute:0.2.0-draft.1",
  "record-integrity-0.1": "urn:nomue:check:record-integrity:0.1.0-draft.1",
  "itgc-preconditions-0.1": "urn:nomue:check:itgc-preconditions:0.1.0-draft.1",
  "welch-recompute-0.1": "urn:nomue:check:welch-recompute:0.1.0-draft.1",
};

const CONFORMANCE_2A = "urn:nomue:check:record-conformance:0.2.0-draft.1";
const CONFORMANCE_01 = "urn:nomue:check:record-conformance:0.1.0-draft.1";

interface Json {
  [key: string]: unknown;
}

interface ExpectationEntry {
  family: string;
  classification: string;
  purpose: string;
  requirement_ids: string[];
  expected: {
    kind: "record" | "refusal";
    cli_exit_code: number;
    conformance_bundle?: string;
    conformance?: { execution: string; outcome: string | null; reason_codes: string[] };
    checks?: Record<string, { execution: string; outcome: string | null; reason_codes: string[] }>;
    refusal_kind?: string;
    limit_category?: string;
    refusal_reason_codes?: string[];
  };
}

interface ExpectationsFile {
  manifest: string;
  fixtures: Record<string, ExpectationEntry>;
}

const uuidUrn = (n: number): string =>
  `urn:uuid:00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;

const DATASETS = A2_DATASETS;

const BASE = DATASETS["A2-V-001"] as { groupA: number[]; groupB: number[] };

function kernelResult(groupA: number[], groupB: number[]): Json {
  const welch = welchTwoSampleTTestWithCi(
    { group_id: "group-a", values: groupA },
    { group_id: "group-b", values: groupB },
    0.95,
  );
  return {
    result_id: "result-1",
    analysis_id: "analysis-1",
    group_summaries: welch.group_summaries.map((s) => ({
      group_id: s.group_id,
      n: s.n,
      mean: s.mean,
      sample_variance: s.sample_variance,
    })),
    effect_estimate: {
      kind: "unstandardized_arithmetic_mean_difference",
      estimate: welch.mean_difference,
      standard_error: welch.standard_error,
      confidence_interval: {
        method_id: CI_METHOD,
        confidence_level: 0.95,
        lower: welch.confidence_interval.lower,
        upper: welch.confidence_interval.upper,
      },
    },
    test: {
      test_statistic: welch.test_statistic,
      degrees_of_freedom: welch.degrees_of_freedom,
      p_value: welch.p_value,
    },
  };
}

function buildRecord2a(opts: {
  serial: number;
  groupA: number[];
  groupB: number[];
  declarations?: Partial<Record<string, string>>;
  dataHandling?: Partial<Record<string, string>>;
  estimand?: { kind: string; direction: string };
  confidenceLevel?: number;
  resultOverride?: Json;
  mutateResult?: (result: Json) => void;
}): Json {
  const observations: Json[] = [];
  let unit = 1;
  opts.groupA.forEach((value, i) => {
    observations.push({
      observation_id: `observation-${i + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-a",
      outcome_value: value,
    });
    unit += 1;
  });
  opts.groupB.forEach((value, i) => {
    observations.push({
      observation_id: `observation-${opts.groupA.length + i + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-b",
      outcome_value: value,
    });
    unit += 1;
  });

  const result = opts.resultOverride ?? kernelResult(opts.groupA, opts.groupB);
  if (opts.mutateResult !== undefined) opts.mutateResult(result);

  const record: Json = {
    $schema: RECORD_SCHEMA_2A,
    record_type: "nomue-record",
    record_id: uuidUrn(opts.serial * 2),
    revision_id: uuidUrn(opts.serial * 2 + 1),
    created_at: CREATED_AT,
    interpretation_bundle_id: BUNDLE_2A,
    profile_id: PROFILE_2A,
    payload: {
      dataset: { dataset_id: "dataset-1", observations },
      design: {
        design_id: "design-1",
        dataset_id: "dataset-1",
        experimental_unit_type: "biological replicate",
        groups: [
          { group_id: "group-a", label: "Control" },
          { group_id: "group-b", label: "Treatment" },
        ],
        group_order: ["group-a", "group-b"],
        outcome: {
          outcome_id: "outcome-1",
          label: "Synthetic continuous outcome",
          scale: "continuous",
        },
        declarations: {
          grouping_structure: "independent_groups",
          pairing: "none",
          repeated_measurements: "none",
          clustering: "none_declared",
          ...opts.declarations,
        },
        data_handling: {
          analysis_population: "all_record_observations",
          missing_outcomes: "none",
          transformation: "none",
          weighting: "none",
          ...opts.dataHandling,
        },
      },
      analysis: {
        analysis_id: "analysis-1",
        design_id: "design-1",
        method_id: WELCH_METHOD,
        alternative: "two_sided",
        estimand: opts.estimand ?? {
          kind: "unstandardized_arithmetic_mean_difference",
          direction: "group_order_first_minus_second",
        },
        confidence_level: opts.confidenceLevel ?? 0.95,
      },
      result,
    },
  };
  record["integrity"] = {
    canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1",
    digest_algorithm: "sha-256",
    digest_scope: "record_without_integrity",
    content_digest: recomputeContentDigest(record as Record<string, unknown>),
  };
  return record;
}

const ZERO_SE_RESULT: Json = {
  result_id: "result-1",
  analysis_id: "analysis-1",
  group_summaries: [
    { group_id: "group-a", n: 3, mean: 5, sample_variance: 0 },
    { group_id: "group-b", n: 3, mean: 5, sample_variance: 0 },
  ],
  effect_estimate: {
    kind: "unstandardized_arithmetic_mean_difference",
    estimate: 0,
    standard_error: 1,
    confidence_interval: { method_id: CI_METHOD, confidence_level: 0.95, lower: -1, upper: 1 },
  },
  test: { test_statistic: 0, degrees_of_freedom: 4, p_value: 1 },
};

/** Fixture input builders; expectations come from the hand-authored table. */
function buildInputs(): Map<string, string | Json> {
  const inputs = new Map<string, string | Json>();

  let serial = 1001;
  for (const [id, data] of Object.entries(DATASETS)) {
    inputs.set(id, buildRecord2a({ serial, ...data }));
    serial += 1;
  }

  const admissibility: Array<
    [string, Partial<Record<string, string>>, Partial<Record<string, string>>]
  > = [
    ["A2-A-001", { pairing: "present" }, {}],
    ["A2-A-002", { repeated_measurements: "present" }, {}],
    ["A2-A-003", { clustering: "present" }, {}],
    ["A2-A-004", {}, { weighting: "present" }],
    ["A2-A-005", {}, { transformation: "present" }],
    ["A2-A-006", {}, { analysis_population: "subset_or_exclusions_present" }],
    ["A2-A-007", {}, { missing_outcomes: "present" }],
  ];
  serial = 1101;
  for (const [id, declarations, dataHandling] of admissibility) {
    inputs.set(id, buildRecord2a({ serial, ...BASE, declarations, dataHandling }));
    serial += 1;
  }
  inputs.set(
    "A2-A-008",
    buildRecord2a({
      serial: 1108,
      ...BASE,
      estimand: {
        kind: "standardized_mean_difference",
        direction: "group_order_first_minus_second",
      },
    }),
  );
  inputs.set("A2-A-009", buildRecord2a({ serial: 1109, ...BASE, confidenceLevel: 0.9 }));

  const mutate = (fn: (result: Json) => void, serialValue: number): Json =>
    buildRecord2a({ serial: serialValue, ...BASE, mutateResult: fn });
  const effectOf = (result: Json): Json => result["effect_estimate"] as Json;
  const ciOf = (result: Json): Json => effectOf(result)["confidence_interval"] as Json;

  inputs.set(
    "A2-P-001",
    mutate((r) => {
      effectOf(r)["standard_error"] = (effectOf(r)["standard_error"] as number) + 0.25;
    }, 1201),
  );
  inputs.set(
    "A2-P-002",
    mutate((r) => {
      ciOf(r)["lower"] = (ciOf(r)["lower"] as number) - 0.5;
    }, 1202),
  );
  inputs.set(
    "A2-P-003",
    mutate((r) => {
      ciOf(r)["upper"] = (ciOf(r)["upper"] as number) + 0.5;
    }, 1203),
  );
  inputs.set(
    "A2-P-004",
    mutate((r) => {
      ciOf(r)["confidence_level"] = 0.9;
    }, 1204),
  );
  inputs.set(
    "A2-P-005",
    mutate((r) => {
      ciOf(r)["method_id"] = "urn:nomue:method:normal-approximation-ci:1";
    }, 1205),
  );
  inputs.set(
    "A2-P-006",
    mutate((r) => {
      const lower = ciOf(r)["lower"];
      ciOf(r)["lower"] = ciOf(r)["upper"];
      ciOf(r)["upper"] = lower;
    }, 1206),
  );
  inputs.set(
    "A2-P-007",
    mutate((r) => {
      effectOf(r)["estimate"] = -(effectOf(r)["estimate"] as number);
    }, 1207),
  );
  inputs.set(
    "A2-P-008",
    mutate((r) => {
      ciOf(r)["lower"] = (ciOf(r)["lower"] as number) - 0.3;
      ciOf(r)["upper"] = (ciOf(r)["upper"] as number) - 0.3;
    }, 1208),
  );
  inputs.set(
    "A2-P-009",
    mutate((r) => {
      (r["test"] as Json)["p_value"] = 0.5;
    }, 1209),
  );

  inputs.set(
    "A2-C-001",
    buildRecord2a({
      serial: 1301,
      groupA: [5, 5, 5],
      groupB: [5, 5, 5],
      resultOverride: ZERO_SE_RESULT,
    }),
  );

  // Finite-but-extreme observations whose variance overflows binary64: a
  // computability failure, never an internal verifier error.
  inputs.set(
    "A2-C-002",
    buildRecord2a({
      serial: 1302,
      groupA: [1.7e308, 1.6e308],
      groupB: [-1.7e308, -1.6e308],
      resultOverride: {
        result_id: "result-1",
        analysis_id: "analysis-1",
        group_summaries: [
          { group_id: "group-a", n: 2, mean: 1.65e308, sample_variance: 1 },
          { group_id: "group-b", n: 2, mean: -1.65e308, sample_variance: 1 },
        ],
        effect_estimate: {
          kind: "unstandardized_arithmetic_mean_difference",
          estimate: 0,
          standard_error: 1,
          confidence_interval: {
            method_id: CI_METHOD,
            confidence_level: 0.95,
            lower: -1,
            upper: 1,
          },
        },
        test: { test_statistic: 0, degrees_of_freedom: 4, p_value: 1 },
      },
    }),
  );

  inputs.set("A2-R-001", `{"pad":"${"a".repeat(5 * 1024 * 1024)}"}`);
  let nested = "0";
  for (let i = 0; i < 80; i += 1) nested = `{"a":${nested}}`;
  inputs.set("A2-R-002", nested);
  inputs.set(
    "A2-R-003",
    `{"payload":{"dataset":{"observations":[${new Array(10001).fill(0).join(",")}]}}}`,
  );
  inputs.set("A2-R-004", `{"s":"${"x".repeat(16385)}"}`);
  inputs.set("A2-R-005", '{"record_type": "nomue-record", this is not json');

  const truncSource = JSON.stringify(inputs.get("A2-V-001"), null, 2);
  inputs.set("A2-R-006", truncSource.slice(0, 200));

  // Hostile non-URI bundle identifier: refused, with declared_bundle_id
  // omitted from the refusal so the refusal stays schema-conformant.
  const hostileBundle = buildRecord2a({ serial: 1404, ...BASE });
  hostileBundle["interpretation_bundle_id"] = "x";
  (hostileBundle["integrity"] as Json)["content_digest"] = recomputeContentDigest(
    hostileBundle as Record<string, unknown>,
  );
  inputs.set("A2-R-008", hostileBundle);

  const unknownBundle = buildRecord2a({ serial: 1401, ...BASE });
  unknownBundle["interpretation_bundle_id"] = "urn:nomue:bundle:not-registered:1.0.0";
  (unknownBundle["integrity"] as Json)["content_digest"] = recomputeContentDigest(
    unknownBundle as Record<string, unknown>,
  );
  inputs.set("A2-R-007", unknownBundle);

  // A2-B-001 reuses the pinned Phase 1 V-001 input (no new file).

  const phase2aWithPhase1Bundle = buildRecord2a({ serial: 1402, ...BASE });
  phase2aWithPhase1Bundle["interpretation_bundle_id"] = BUNDLE_01;
  (phase2aWithPhase1Bundle["integrity"] as Json)["content_digest"] = recomputeContentDigest(
    phase2aWithPhase1Bundle as Record<string, unknown>,
  );
  inputs.set("A2-B-002", phase2aWithPhase1Bundle);

  const phase1Shaped = JSON.parse(
    fs.readFileSync(path.join(repoRoot, "conformance/fixtures/public_checks/V-001.json"), "utf8"),
  ) as Json;
  phase1Shaped["interpretation_bundle_id"] = BUNDLE_2A;
  (phase1Shaped["integrity"] as Json)["content_digest"] = recomputeContentDigest(
    phase1Shaped as Record<string, unknown>,
  );
  inputs.set("A2-B-003", phase1Shaped);

  const nearby = buildRecord2a({ serial: 1403, ...BASE });
  nearby["interpretation_bundle_id"] = "urn:nomue:bundle:itgc-guarantee:0.2.2-draft.1";
  (nearby["integrity"] as Json)["content_digest"] = recomputeContentDigest(
    nearby as Record<string, unknown>,
  );
  inputs.set("A2-B-004", nearby);

  return inputs;
}

export interface ManifestFixture2a {
  fixture_id: string;
  family: string;
  entry: Json;
}

function assertEqual(actual: unknown, expected: unknown, context: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${context}: expected ${e}, got ${a}`);
}

const sortCodes = (codes: string[]): string[] => [...codes].sort();

/** Independent-path projection hash: independent JCS + node:crypto. */
function independentProjectionHash(report: unknown): string {
  const projection = semanticProjection(JSON.parse(JSON.stringify(report)) as never);
  const canonical = independentJcs(JSON.parse(JSON.stringify(projection)));
  if (canonical === undefined) throw new Error("independent canonicalization failed");
  return `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

export function buildPhase2aFixtures(): ManifestFixture2a[] {
  const expectations = loadYaml<ExpectationsFile>(
    "conformance/expectations/phase-2a-expectations.yaml",
  );
  const inputs = buildInputs();
  const resources = loadVerifierResources();
  const out: ManifestFixture2a[] = [];

  for (const [fixtureId, spec] of Object.entries(expectations.fixtures)) {
    let inputRel: string;
    let text: string;
    if (fixtureId === "A2-B-001") {
      inputRel = "conformance/fixtures/public_checks/V-001.json";
      text = fs.readFileSync(path.join(repoRoot, inputRel), "utf8");
    } else {
      const built = inputs.get(fixtureId);
      if (built === undefined) throw new Error(`no input builder for ${fixtureId}`);
      inputRel = `conformance/fixtures/${spec.family}/${fixtureId}.json`;
      text = typeof built === "string" ? `${built}\n` : `${JSON.stringify(built, null, 2)}\n`;
      const abs = path.join(repoRoot, inputRel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, text, "utf8");
    }

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
      assertEqual(refusal.refusal_kind, spec.expected.refusal_kind, `${fixtureId} kind`);
      assertEqual(
        sortCodes(refusal.reason_codes),
        sortCodes(spec.expected.refusal_reason_codes ?? []),
        `${fixtureId} refusal codes`,
      );
      if (spec.expected.limit_category !== undefined) {
        assertEqual(refusal.limit_category, spec.expected.limit_category, `${fixtureId} category`);
      }
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
        ...(spec.expected.limit_category === undefined
          ? {}
          : { limit_category: spec.expected.limit_category }),
        refusal_reason_codes: [...(spec.expected.refusal_reason_codes ?? [])],
        refusal_schema_valid: true,
      };
    } else {
      const report = outcome.report;
      if (report === undefined) throw new Error(`${fixtureId}: expected a report`);
      const conformanceId =
        spec.expected.conformance_bundle === "phase-1" ? CONFORMANCE_01 : CONFORMANCE_2A;
      assertEqual(report.conformance.check_id, conformanceId, `${fixtureId} conformance id`);
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
        conformance_check_id: conformanceId,
        conformance: {
          execution: spec.expected.conformance?.execution,
          outcome: spec.expected.conformance?.outcome ?? null,
          reason_codes: [...(spec.expected.conformance?.reason_codes ?? [])],
        },
        checks: expectedChecks,
        semantic_projection_hash: independentProjectionHash(report),
      };
    }

    out.push({ fixture_id: fixtureId, family: spec.family, entry });
  }

  return out;
}

/** The Phase 2A example (informative, non-fixture). */
export function buildPhase2aExample(): void {
  const exampleDir = path.join(repoRoot, "examples", "itgc-guarantee-0.2");
  const record = buildRecord2a({ serial: 1901, ...EXAMPLE_2A_DATASET });
  const text = `${JSON.stringify(record, null, 2)}\n`;
  fs.mkdirSync(exampleDir, { recursive: true });
  fs.writeFileSync(path.join(exampleDir, "record.json"), text, "utf8");

  const outcome = verifyRecordText(text);
  if (outcome.exitCode !== 0 || outcome.report === undefined) {
    throw new Error("phase-2a example record must verify cleanly");
  }
  const expectedReport = JSON.parse(JSON.stringify(outcome.report)) as Json;
  expectedReport["generated_at"] = CREATED_AT;
  (expectedReport["verifier"] as Json)["source_commit"] = "0".repeat(40);
  const reportText = `${JSON.stringify(expectedReport, null, 2)}\n`;
  fs.writeFileSync(path.join(exampleDir, "expected-verification.json"), reportText, "utf8");

  const projection: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (key !== "integrity") projection[key] = value;
  }
  const canonical = independentJcs(JSON.parse(JSON.stringify(projection)));
  if (canonical === undefined) throw new Error("example canonicalization failed");
  fs.writeFileSync(path.join(exampleDir, "canonical-content.json"), canonical, "utf8");

  const hashLines = [
    `${sha256HexOfUtf8(text)}  record.json`,
    `${sha256HexOfUtf8(reportText)}  expected-verification.json`,
    `${sha256HexOfUtf8(canonical)}  canonical-content.json`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(exampleDir, "hashes.sha256"), hashLines, "utf8");
}
