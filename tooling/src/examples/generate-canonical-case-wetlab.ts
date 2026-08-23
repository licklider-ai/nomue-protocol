/**
 * Regenerates examples/canonical-case-wetlab-01/ (Batch 2 U2): a synthetic,
 * wet-lab-scale (n=8/arm) canonical case under the existing ITGC guarantee
 * profile - a stand-in for a real published-paper Record pending rights
 * clearance (see examples/canonical-case-wetlab-01/README.md), not a new
 * statistical judgment or a new profile capability. Numbers are computed by
 * the reference stats kernel exactly as any other example is (never
 * hand-typed), and the digest by the reference verifier's own recompute.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { welchTwoSampleTTestWithCi } from "../../../reference/stats-kernel/src/kernel.js";
import {
  canonicalProjection,
  recomputeContentDigest,
} from "../../../reference/verifier/src/digest.js";
import { sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { repoRoot } from "../lib/repo.js";

interface Json {
  [key: string]: unknown;
}

// Synthetic cell-viability assay, vehicle vs compound, n=8 biological
// replicates per arm - a typical small pilot-study scale. Values are
// invented for this example only; no scientific claim is made about any
// real compound (see the example's own README).
const VEHICLE = [98.2, 101.4, 96.8, 103.1, 99.5, 97.3, 100.9, 102.0];
const TREATED = [61.4, 58.9, 65.2, 60.1, 63.7, 57.8, 62.5, 59.6];

function buildRecord(): Json {
  const welch = welchTwoSampleTTestWithCi(
    { group_id: "group-vehicle", values: VEHICLE },
    { group_id: "group-treated", values: TREATED },
    0.95,
  );

  const observations: Json[] = [];
  let unit = 1;
  VEHICLE.forEach((v, i) => {
    observations.push({
      observation_id: `observation-${i + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-vehicle",
      outcome_value: v,
    });
    unit += 1;
  });
  TREATED.forEach((v, i) => {
    observations.push({
      observation_id: `observation-${VEHICLE.length + i + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-treated",
      outcome_value: v,
    });
    unit += 1;
  });

  return {
    $schema: "urn:nomue:schema:record:0.2.0-draft.1",
    record_type: "nomue-record",
    record_id: "urn:uuid:00000000-0000-4000-8000-000000009001",
    revision_id: "urn:uuid:00000000-0000-4000-8000-000000009002",
    created_at: "2026-08-13T00:00:00Z",
    interpretation_bundle_id: "urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1",
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

  const dir = path.join(repoRoot, "examples", "canonical-case-wetlab-01");
  fs.mkdirSync(dir, { recursive: true });

  const recordText = `${JSON.stringify(record, null, 2)}\n`;
  fs.writeFileSync(path.join(dir, "record.json"), recordText, "utf8");

  const outcome = verifyRecordText(recordText);
  if (outcome.exitCode !== 0 || outcome.report === undefined) {
    throw new Error(
      `canonical case wetlab-01 must verify cleanly; got exit ${outcome.exitCode}, refusal: ${JSON.stringify(outcome.refusal)}`,
    );
  }
  const expectedReport = JSON.parse(JSON.stringify(outcome.report)) as Json;
  expectedReport["generated_at"] = "2026-08-13T00:00:00Z";
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

  console.log(
    `generate-canonical-case-wetlab: wrote examples/canonical-case-wetlab-01/ (verifies: exit 0)`,
  );
}

main();
