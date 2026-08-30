import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { evaluatePairedTRuntimeSeriesCandidate } from "../src/spikes/paired-t-runtime-series-candidate.js";
import {
  evaluatePairedTRuntimeSeriesWithCandidateTable,
  REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH,
  validatePairedTRuntimeInverseBetaLookupTableCandidate,
  validatePairedTRuntimeTableIntegrationCheckpoint,
  type PairedTRuntimeTableIntegrationCheckpoint,
} from "../src/spikes/paired-t-runtime-table-integration-candidate.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const tablePath = path.join(
  repositoryRoot,
  "tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json",
);
const checkpointPath = path.join(
  repositoryRoot,
  "governance/drafts/release-2-candidate/numerical/runtime-table-integration-candidate.json",
);

interface TableEntry {
  degrees_of_freedom: number;
  inverse_beta_binary64_hex: string;
}

function floatFromHex(value: string): number {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(`0x${value}`), false);
  return view.getFloat64(0, false);
}

function loadCheckpoint(): PairedTRuntimeTableIntegrationCheckpoint {
  return JSON.parse(
    readFileSync(checkpointPath, "utf8"),
  ) as PairedTRuntimeTableIntegrationCheckpoint;
}

function loadEntries(): Map<number, TableEntry> {
  const value = JSON.parse(readFileSync(tablePath, "utf8")) as { entries: TableEntry[] };
  return new Map(value.entries.map((entry) => [entry.degrees_of_freedom, entry]));
}

describe("paired-t runtime table integration candidate", () => {
  it("pins the exact independently reviewed table bytes", () => {
    const bytes = readFileSync(tablePath);
    expect(validatePairedTRuntimeInverseBetaLookupTableCandidate(bytes)).toEqual([]);

    const mutated = Buffer.from(
      bytes.toString("utf8").replace("3fd45f306dc9c883", "3fd45f306dc9c884"),
      "utf8",
    );
    expect(validatePairedTRuntimeInverseBetaLookupTableCandidate(mutated)).toContain(
      "candidate inverse-beta table bytes differ from the independently reviewed hash",
    );
  });

  it("keeps the integration checkpoint non-authoritative and non-runtime", () => {
    expect(validatePairedTRuntimeTableIntegrationCheckpoint(loadCheckpoint())).toEqual([]);

    const promoted = loadCheckpoint();
    promoted.runtime_support_enabled = true;
    promoted.table_connection.runtime_table_selected = true;
    promoted.table_connection.final_table_content_hash = REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH;
    expect(validatePairedTRuntimeTableIntegrationCheckpoint(promoted)).toContain(
      "runtime-table integration candidate differs from the closed non-runtime checkpoint",
    );
  });

  it("uses the reviewed cells without changing the existing series graph", () => {
    const entries = loadEntries();
    for (const [df, statistic] of [
      [1, 20],
      [3, 1],
      [10, 0.5],
      [200, 1.0000000000000002],
    ] as const) {
      const entry = entries.get(df);
      expect(entry).toBeDefined();
      const integrated = evaluatePairedTRuntimeSeriesWithCandidateTable({
        degreesOfFreedom: df,
        testStatistic: statistic,
      });
      const direct = evaluatePairedTRuntimeSeriesCandidate({
        degreesOfFreedom: df,
        testStatistic: statistic,
        inverseBeta: floatFromHex(entry?.inverse_beta_binary64_hex ?? ""),
      });
      expect(integrated).toMatchObject(direct);
      expect(integrated).toMatchObject({
        ok: true,
        runtimeSupportClaimed: false,
        correctRoundingClaimed: false,
        normalizationConstant: {
          source: "reviewed_contiguous_candidate_table",
          inverseBetaBinary64Hex: entry?.inverse_beta_binary64_hex,
          candidateTableContentHash: REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH,
          runtimeTableSelected: false,
        },
      });
    }
  });

  it("preserves the evaluation boundary and input refusals", () => {
    expect(
      evaluatePairedTRuntimeSeriesWithCandidateTable({
        degreesOfFreedom: 201,
        testStatistic: 1,
      }),
    ).toMatchObject({ ok: false, classification: "outside_evidence_evaluation_range" });
    expect(
      evaluatePairedTRuntimeSeriesWithCandidateTable({
        degreesOfFreedom: 3,
        testStatistic: -0,
      }),
    ).toMatchObject({ ok: false, classification: "invalid_candidate_input" });
  });
});
