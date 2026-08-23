/**
 * Generates the preregistered Release 1 canonical case CC-R1-001 as a
 * versioned successor of examples/canonical-case-wetlab-01/. The predecessor
 * is never edited in place. Dataset/design declarations are fixed by
 * evidence/release-1/canonical-cases/CC-R1-001-preregistration.md before this
 * generator is evaluated.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { welchTwoSampleTTestWithCi } from "../../../reference/stats-kernel/src/kernel.js";
import {
  canonicalProjection,
  recomputeContentDigest,
  sha256HexOfUtf8,
} from "../../../reference/verifier/src/digest.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { repoRoot } from "../lib/repo.js";

interface Json {
  [key: string]: unknown;
}

const VEHICLE = [98.2, 101.4, 96.8, 103.1, 99.5, 97.3, 100.9, 102.0];
const TREATED = [61.4, 58.9, 65.2, 60.1, 63.7, 57.8, 62.5, 59.6];
const BUNDLE_021 = "urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1";
const OUTPUT_DIR = "canonical-case-release1-wetlab-01";

function buildRecord(): Json {
  const welch = welchTwoSampleTTestWithCi(
    { group_id: "group-vehicle", values: VEHICLE },
    { group_id: "group-treated", values: TREATED },
    0.95,
  );

  const observations: Json[] = [];
  let unit = 1;
  VEHICLE.forEach((value, index) => {
    observations.push({
      observation_id: `observation-${index + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-vehicle",
      outcome_value: value,
    });
    unit += 1;
  });
  TREATED.forEach((value, index) => {
    observations.push({
      observation_id: `observation-${VEHICLE.length + index + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-treated",
      outcome_value: value,
    });
    unit += 1;
  });

  return {
    $schema: "urn:nomue:schema:record:0.2.0-draft.1",
    record_type: "nomue-record",
    record_id: "urn:uuid:00000000-0000-4000-8000-000000009101",
    revision_id: "urn:uuid:00000000-0000-4000-8000-000000009102",
    created_at: "2026-08-19T00:00:00Z",
    interpretation_bundle_id: BUNDLE_021,
    profile_id: "urn:nomue:profile:itgc:0.2.0-draft.1",
    payload: {
      dataset: { dataset_id: "dataset-1", observations },
      design: {
        design_id: "design-1",
        dataset_id: "dataset-1",
        experimental_unit_type: "biological replicate",
        groups: [
          { group_id: "group-vehicle", label: "Vehicle (DMSO 0.1%)" },
          { group_id: "group-treated", label: "Compound NM-114, 10 uM, 48h" },
        ],
        group_order: ["group-vehicle", "group-treated"],
        outcome: {
          outcome_id: "outcome-1",
          label: "Cell viability (% of vehicle control), CellTiter-Glo luminescence",
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
        method_id: "urn:nomue:method:welch-two-sample-t:1",
        alternative: "two_sided",
        estimand: {
          kind: "unstandardized_arithmetic_mean_difference",
          direction: "group_order_first_minus_second",
        },
        confidence_level: 0.95,
      },
      result: {
        result_id: "result-1",
        analysis_id: "analysis-1",
        group_summaries: welch.group_summaries.map((summary) => ({
          group_id: summary.group_id,
          n: summary.n,
          mean: summary.mean,
          sample_variance: summary.sample_variance,
        })),
        effect_estimate: {
          kind: "unstandardized_arithmetic_mean_difference",
          estimate: welch.mean_difference,
          standard_error: welch.standard_error,
          confidence_interval: {
            method_id: "urn:nomue:method:welch-satterthwaite-mean-difference-ci:1",
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
      },
    },
  };
}

function main(): void {
  const record = buildRecord();
  const digest = recomputeContentDigest(record);
  record["integrity"] = {
    canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1",
    digest_algorithm: "sha-256",
    digest_scope: "record_without_integrity",
    content_digest: digest,
  };

  const dir = path.join(repoRoot, "examples", OUTPUT_DIR);
  fs.mkdirSync(dir, { recursive: true });

  const recordText = `${JSON.stringify(record, null, 2)}\n`;
  fs.writeFileSync(path.join(dir, "record.json"), recordText, "utf8");

  const outcome = verifyRecordText(recordText);
  if (outcome.exitCode !== 0 || outcome.report === undefined) {
    throw new Error(
      `CC-R1-001 preregistered case failed verification; exit=${outcome.exitCode}; refusal=${JSON.stringify(outcome.refusal)}`,
    );
  }
  const expectedReport = JSON.parse(JSON.stringify(outcome.report)) as Json;
  expectedReport["generated_at"] = "2026-08-19T00:00:00Z";
  (expectedReport["verifier"] as Json)["source_commit"] = "0".repeat(40);
  const expectedReportText = `${JSON.stringify(expectedReport, null, 2)}\n`;
  fs.writeFileSync(path.join(dir, "expected-verification.json"), expectedReportText, "utf8");

  const canonicalText = canonicalProjection(record);
  fs.writeFileSync(path.join(dir, "canonical-content.json"), canonicalText, "utf8");

  const hashLines = [
    `${sha256HexOfUtf8(recordText)}  record.json`,
    `${sha256HexOfUtf8(expectedReportText)}  expected-verification.json`,
    `${sha256HexOfUtf8(canonicalText)}  canonical-content.json`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(dir, "hashes.sha256"), hashLines, "utf8");

  const predecessorDir = path.join(repoRoot, "examples", "canonical-case-wetlab-01");
  for (const comparativeDir of ["wrroc", "bco"] as const) {
    fs.cpSync(path.join(predecessorDir, comparativeDir), path.join(dir, comparativeDir), {
      recursive: true,
      force: true,
    });
  }

  console.log(`CC-R1-001: wrote examples/${OUTPUT_DIR}/ with exact ${BUNDLE_021} verification`);
}

main();
