/**
 * Phase 2A 0.2.1 successor bundle fixture authoring.
 *
 * Expectations come from the hand-authored table
 * conformance/expectations/phase-2a-021-expectations.yaml. This module builds
 * inputs, replays the verifier, asserts against expectations, and returns
 * manifest entries. It never writes the expectations file.
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
import { A2_DATASETS } from "./datasets.js";

const independentJcs: (value: unknown) => string | undefined =
  (canonicalizeModule as unknown as { default?: (value: unknown) => string | undefined }).default ??
  (canonicalizeModule as unknown as (value: unknown) => string | undefined);

const BUNDLE_021 = "urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1";
const RECORD_SCHEMA_2A = "urn:nomue:schema:record:0.2.0-draft.1";
const PROFILE_2A = "urn:nomue:profile:itgc:0.2.0-draft.1";
const WELCH_METHOD = "urn:nomue:method:welch-two-sample-t:1";
const CI_METHOD = "urn:nomue:method:welch-satterthwaite-mean-difference-ci:1";
const CREATED_AT = "2026-08-10T00:00:00Z";
const CONFORMANCE_2A = "urn:nomue:check:record-conformance:0.2.0-draft.1";

const CHECK_KEY_MAP: Record<string, string> = {
  "record-integrity": "urn:nomue:check:record-integrity:0.2.0-draft.1",
  "itgc-profile-admissibility": "urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1",
  "welch-computability": "urn:nomue:check:welch-computability:0.2.1-draft.1",
  "welch-recompute": "urn:nomue:check:welch-recompute:0.2.1-draft.1",
};

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
    conformance?: { execution: string; outcome: string | null; reason_codes: string[] };
    checks?: Record<string, { execution: string; outcome: string | null; reason_codes: string[] }>;
  };
}

interface ExpectationsFile {
  manifest: string;
  fixtures: Record<string, ExpectationEntry>;
}

const uuidUrn = (n: number): string =>
  `urn:uuid:00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;

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

function buildRecord021(opts: {
  serial: number;
  groupA: number[];
  groupB: number[];
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

  const result = kernelResult(opts.groupA, opts.groupB);
  if (opts.mutateResult !== undefined) opts.mutateResult(result);

  const record: Json = {
    $schema: RECORD_SCHEMA_2A,
    record_type: "nomue-record",
    record_id: uuidUrn(opts.serial * 2),
    revision_id: uuidUrn(opts.serial * 2 + 1),
    created_at: CREATED_AT,
    interpretation_bundle_id: BUNDLE_021,
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
        },
        data_handling: {
          analysis_population: "all_record_observations",
          missing_outcomes: "none",
          transformation: "none",
          weighting: "none",
        },
      },
      analysis: {
        analysis_id: "analysis-1",
        design_id: "design-1",
        method_id: WELCH_METHOD,
        alternative: "two_sided",
        estimand: {
          kind: "unstandardized_arithmetic_mean_difference",
          direction: "group_order_first_minus_second",
        },
        confidence_level: 0.95,
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

const UNDERFLOW_A = Array.from({ length: 70 }, (_, i) => 10 + (i % 5) * 0.01);
const UNDERFLOW_B = Array.from({ length: 70 }, (_, i) => (i % 5) * 0.01);

function buildInputs(): Map<string, Json> {
  const inputs = new Map<string, Json>();
  const ts1 = A2_DATASETS["A2-V-002"] as { groupA: number[]; groupB: number[] };
  const ts5 = A2_DATASETS["A2-V-006"] as { groupA: number[]; groupB: number[] };

  inputs.set("A2-1-V-001", buildRecord021({ serial: 2101, ...ts1 }));
  inputs.set(
    "A2-1-V-002",
    buildRecord021({ serial: 2102, groupA: UNDERFLOW_A, groupB: UNDERFLOW_B }),
  );
  inputs.set("A2-1-V-003", buildRecord021({ serial: 2103, ...ts5 }));
  inputs.set(
    "A2-1-P-001",
    buildRecord021({
      serial: 2104,
      ...ts1,
      mutateResult: (r) => {
        (r["test"] as Json)["p_value"] = 0;
      },
    }),
  );
  inputs.set(
    "A2-1-P-002",
    buildRecord021({
      serial: 2105,
      ...ts1,
      mutateResult: (r) => {
        const p = (r["test"] as Json)["p_value"] as number;
        (r["test"] as Json)["p_value"] = p * (1 + 3e-10);
      },
    }),
  );
  inputs.set(
    "A2-1-P-004",
    buildRecord021({
      serial: 2106,
      groupA: UNDERFLOW_A,
      groupB: UNDERFLOW_B,
      mutateResult: (r) => {
        (r["test"] as Json)["p_value"] = 0.05;
      },
    }),
  );
  return inputs;
}

export interface ManifestFixture021 {
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

function independentProjectionHash(report: unknown): string {
  const projection = semanticProjection(JSON.parse(JSON.stringify(report)) as never);
  const canonical = independentJcs(JSON.parse(JSON.stringify(projection)));
  if (canonical === undefined) throw new Error("independent canonicalization failed");
  return `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

export function buildPhase2a021Fixtures(): ManifestFixture021[] {
  const expectations = loadYaml<ExpectationsFile>(
    "conformance/expectations/phase-2a-021-expectations.yaml",
  );
  const inputs = buildInputs();
  const resources = loadVerifierResources();
  const out: ManifestFixture021[] = [];

  for (const [fixtureId, spec] of Object.entries(expectations.fixtures)) {
    const built = inputs.get(fixtureId);
    if (built === undefined) throw new Error(`no input builder for ${fixtureId}`);
    const inputRel = `conformance/fixtures/${spec.family}/${fixtureId}.json`;
    const text = `${JSON.stringify(built, null, 2)}\n`;
    const abs = path.join(repoRoot, inputRel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, text, "utf8");

    const outcome = verifyRecordText(text);
    assertEqual(outcome.exitCode, spec.expected.cli_exit_code, `${fixtureId} exit`);

    const report = outcome.report;
    if (report === undefined) throw new Error(`${fixtureId}: expected a report`);

    assertEqual(report.conformance.check_id, CONFORMANCE_2A, `${fixtureId} conformance id`);
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

    const entry: Json = {
      fixture_id: fixtureId,
      classification: spec.classification,
      purpose: spec.purpose,
      input: inputRel,
      input_sha256: sha256HexOfUtf8(text),
      requirement_ids: [...spec.requirement_ids],
      expected: {
        kind: "record",
        cli_exit_code: spec.expected.cli_exit_code,
        conformance_check_id: CONFORMANCE_2A,
        conformance: {
          execution: spec.expected.conformance?.execution,
          outcome: spec.expected.conformance?.outcome ?? null,
          reason_codes: [...(spec.expected.conformance?.reason_codes ?? [])],
        },
        checks: expectedChecks,
        semantic_projection_hash: independentProjectionHash(report),
      },
    };

    if (resources.validateReport2a(report) !== true) {
      throw new Error(
        `${fixtureId}: report failed schema validation: ${JSON.stringify(resources.validateReport2a.errors)}`,
      );
    }

    out.push({ fixture_id: fixtureId, family: spec.family, entry });
  }

  return out;
}
