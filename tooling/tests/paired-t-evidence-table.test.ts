import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  validateCriticalTableManifest,
  type CaseManifest,
  type CertificateBundle,
  type CriticalTableManifest,
} from "../src/spikes/validate-paired-t-evidence-bundle.js";

const COMMIT = "a".repeat(40);
const temporaryDirectories: string[] = [];

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function sortedJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortedJson);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, sortedJson(child)]),
  );
}

function stableJson(value: unknown): string {
  return `${JSON.stringify(sortedJson(value), null, 2)}\n`;
}

function tableContent(cases: CaseManifest): string {
  const lines = ["nomue-paired-t-fixed-95-table-v1", "two-sided-tail-target=1/20"];
  lines.push(
    ...cases.fixed_95_critical_value_certificates.map(
      (entry) => `df=${entry.degrees_of_freedom};binary64=${entry.candidate_binary64_hex}`,
    ),
  );
  return `${lines.join("\n")}\n`;
}

function candidate(): {
  bundleDir: string;
  cases: CaseManifest;
  certificates: CertificateBundle;
  table: CriticalTableManifest;
} {
  const cases: CaseManifest = {
    status: "non_authoritative_candidate",
    fixed_95_critical_value_table: {
      table_key: "research-seed-v1",
      coverage_kind: "explicit_research_seed_not_runtime_support",
      ordered_degrees_of_freedom: [1, 2],
      contiguous_runtime_support_claimed: false,
      supported_df_max: null,
    },
    p_value_certificates: [],
    fixed_95_critical_value_certificates: [
      {
        case_id: "critical-df1",
        degrees_of_freedom: 1,
        candidate_binary64_hex: "40296993aacc4d24",
      },
      {
        case_id: "critical-df2",
        degrees_of_freedom: 2,
        candidate_binary64_hex: "401135ea98e146bb",
      },
    ],
    boundary_probes: [],
  };
  const certificates = {
    status: "non_authoritative_candidate",
    artifact_kind: "paired-t-certificate-pilot-bundle",
    scope: "pilot_evidence_only_not_r2_d5_closure",
    generator_commit: COMMIT,
    p_value_certificates: [],
    fixed_95_critical_value_certificates: cases.fixed_95_critical_value_certificates.map(
      (entry) => ({
        case_id: entry.case_id,
        certificate: {
          input: {
            degrees_of_freedom: entry.degrees_of_freedom,
            candidate_binary64_hex: entry.candidate_binary64_hex,
          },
        },
      }),
    ),
    boundary_probe_case_ids: [],
  } as unknown as CertificateBundle;
  const bundleDir = mkdtempSync(path.join(tmpdir(), "nomue-critical-table-"));
  temporaryDirectories.push(bundleDir);
  const certificateBytes = `${JSON.stringify(certificates, null, 2)}\n`;
  writeFileSync(path.join(bundleDir, "certificates.json"), certificateBytes);

  const table: CriticalTableManifest = {
    status: "non_authoritative_candidate",
    artifact_kind: "paired-t-fixed-95-critical-value-table-evidence-manifest",
    scope: "explicit_research_seed_only_not_runtime_support_or_r2_d5_closure",
    generator_commit: COMMIT,
    table_key: "research-seed-v1",
    target: {
      confidence_level: "19/20",
      two_sided_tail_probability: "1/20",
      target_format: "binary64",
      rounding_mode: "roundTiesToEven",
    },
    coverage: {
      kind: "explicit_research_seed_not_runtime_support",
      ordered_degrees_of_freedom: [1, 2],
      contiguous_runtime_support_claimed: false,
      supported_df_max: null,
    },
    table_content_sha256: `sha256:${sha256(tableContent(cases))}`,
    certificate_bundle_sha256: `sha256:${sha256(certificateBytes)}`,
    cells: certificates.fixed_95_critical_value_certificates.map((entry) => ({
      degrees_of_freedom: entry.certificate.input.degrees_of_freedom,
      candidate_binary64_hex: entry.certificate.input.candidate_binary64_hex,
      certificate_sha256: `sha256:${sha256(stableJson(entry.certificate))}`,
    })),
  };
  return { bundleDir, cases, certificates, table };
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("Release 2 fixed-95 critical-value table evidence", () => {
  it("accepts an ordered, hash-bound, explicitly non-supporting research seed", () => {
    const value = candidate();
    const errors: string[] = [];
    validateCriticalTableManifest(
      value.bundleDir,
      COMMIT,
      value.cases,
      value.certificates,
      value.table,
      errors,
    );
    expect(errors).toEqual([]);
  });

  it("rejects a runtime-support or df-ceiling claim", () => {
    const value = candidate();
    value.table.coverage.contiguous_runtime_support_claimed = true;
    value.table.coverage.supported_df_max = 2 as never;
    const errors: string[] = [];
    validateCriticalTableManifest(
      value.bundleDir,
      COMMIT,
      value.cases,
      value.certificates,
      value.table,
      errors,
    );
    expect(errors).toContain(
      "critical table coverage does not match the non-supporting research seed",
    );
  });

  it("rejects reordered cells and incomplete declared coverage", () => {
    const value = candidate();
    value.table.cells.reverse();
    value.table.coverage.ordered_degrees_of_freedom = [1];
    const errors: string[] = [];
    validateCriticalTableManifest(
      value.bundleDir,
      COMMIT,
      value.cases,
      value.certificates,
      value.table,
      errors,
    );
    expect(errors).toContain("critical table df order or declared coverage is incomplete");
  });

  it("rejects table-content, bundle, and per-certificate hash drift", () => {
    const value = candidate();
    value.table.table_content_sha256 = `sha256:${"0".repeat(64)}`;
    value.table.certificate_bundle_sha256 = `sha256:${"1".repeat(64)}`;
    value.table.cells[0]!.certificate_sha256 = `sha256:${"2".repeat(64)}`;
    const errors: string[] = [];
    validateCriticalTableManifest(
      value.bundleDir,
      COMMIT,
      value.cases,
      value.certificates,
      value.table,
      errors,
    );
    expect(errors).toContain("critical table content hash does not bind the ordered df/hex cells");
    expect(errors).toContain("critical table manifest does not bind certificates.json");
    expect(errors).toContain("critical-df1: critical table cell does not bind its certificate");
  });

  it("rejects undeclared table-manifest keys", () => {
    const value = candidate();
    (value.table as unknown as Record<string, unknown>).supported = true;
    const errors: string[] = [];
    validateCriticalTableManifest(
      value.bundleDir,
      COMMIT,
      value.cases,
      value.certificates,
      value.table,
      errors,
    );
    expect(errors).toContain(
      "critical table manifest keys are incomplete or contain an undeclared item",
    );
  });
});
