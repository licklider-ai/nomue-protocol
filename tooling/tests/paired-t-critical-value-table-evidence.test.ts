import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import {
  validatePairedTCriticalValueTableCandidate,
  validatePairedTCriticalValueTableEvidenceBundle,
} from "../src/spikes/validate-paired-t-critical-value-table-evidence.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const temporaryDirectories: string[] = [];
const EXPECTED_COMMIT = "6072dd2be046f25a1857db305ea9d526c867c41a";

function loadCandidate(): Record<string, unknown> {
  return JSON.parse(
    readFileSync(
      path.join(
        repositoryRoot,
        "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-candidate.json",
      ),
      "utf8",
    ),
  ) as Record<string, unknown>;
}

function createBundle(): string {
  const directory = mkdtempSync(path.join(tmpdir(), "nomue-critical-value-table-evidence-"));
  temporaryDirectories.push(directory);
  const sources: Array<[string, string]> = [
    ["cases.json", "tooling/r2-paired-t-evidence/cases.json"],
    [
      "fixed-95-critical-value-table-candidate.json",
      "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-candidate.json",
    ],
    ["generate_certificates.py", "tooling/r2-paired-t-evidence/generate_certificates.py"],
    ["generator.py", "tooling/r2-paired-t-evidence/generate_critical_value_table_evidence.py"],
    ["requirements.txt", "tooling/r2-paired-t-evidence/requirements.txt"],
  ];
  for (const [bundleName, sourceName] of sources) {
    copyFileSync(path.join(repositoryRoot, sourceName), path.join(directory, bundleName));
  }
  writeFileSync(path.join(directory, "MANIFEST.sha256"), "malformed\n");
  writeFileSync(path.join(directory, "certificates.json"), "{}\n");
  writeFileSync(path.join(directory, "environment.json"), "{}\n");
  writeFileSync(path.join(directory, "fixed-95-critical-value-table.json"), "{}\n");
  writeFileSync(path.join(directory, "raw-evidence.json"), "{}\n");
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("paired-t fixed-95 critical-value table candidate", () => {
  it("keeps contiguous evidence separate from table selection and runtime support", () => {
    expect(validatePairedTCriticalValueTableCandidate(loadCandidate())).toEqual([]);
    const promoted = loadCandidate();
    promoted.runtime_support_enabled = true;
    expect(validatePairedTCriticalValueTableCandidate(promoted)).toContain(
      "critical-value table checkpoint differs from the closed non-supporting candidate surface",
    );
  });

  it("rejects a final table hash before independent review and selection", () => {
    const promoted = loadCandidate();
    const evidenceSurface = promoted.evidence_surface as Record<string, unknown>;
    evidenceSurface.table_content_hash = `sha256:${"a".repeat(64)}`;
    expect(validatePairedTCriticalValueTableCandidate(promoted)).not.toEqual([]);
  });
});

describe("paired-t fixed-95 critical-value table evidence validator", () => {
  for (const fileName of [
    "fixed-95-critical-value-table-candidate.json",
    "environment.json",
    "raw-evidence.json",
    "certificates.json",
    "fixed-95-critical-value-table.json",
    "cases.json",
  ] as const) {
    it(`rejects malformed ${fileName} without throwing`, () => {
      const bundlePath = createBundle();
      writeFileSync(path.join(bundlePath, fileName), "{ broken");
      let errors: string[] | undefined;
      expect(() => {
        errors = validatePairedTCriticalValueTableEvidenceBundle(bundlePath, EXPECTED_COMMIT);
      }).not.toThrow();
      expect(errors).toContain(`${fileName}: not valid JSON`);
    });
  }

  it("contains hostile JSON root shapes", () => {
    const bundlePath = createBundle();
    writeFileSync(path.join(bundlePath, "certificates.json"), "null\n");
    expect(() =>
      validatePairedTCriticalValueTableEvidenceBundle(bundlePath, EXPECTED_COMMIT),
    ).not.toThrow();
    expect(validatePairedTCriticalValueTableEvidenceBundle(bundlePath, EXPECTED_COMMIT)).toContain(
      "evidence bundle contains a structurally invalid JSON root",
    );
  });
});
