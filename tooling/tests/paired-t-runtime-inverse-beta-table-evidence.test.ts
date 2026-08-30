import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  validatePairedTRuntimeInverseBetaTableCandidate,
  validatePairedTRuntimeInverseBetaTableEvidenceBundle,
} from "../src/spikes/validate-paired-t-runtime-inverse-beta-table-evidence.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const temporaryDirectories: string[] = [];
const EXPECTED_COMMIT = "6072dd2be046f25a1857db305ea9d526c867c41a";

function loadCandidate(): Record<string, unknown> {
  return JSON.parse(
    readFileSync(
      path.join(
        repositoryRoot,
        "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json",
      ),
      "utf8",
    ),
  ) as Record<string, unknown>;
}

function createBundle(): string {
  const directory = mkdtempSync(path.join(tmpdir(), "nomue-inverse-beta-table-evidence-"));
  temporaryDirectories.push(directory);
  copyFileSync(
    path.join(
      repositoryRoot,
      "tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py",
    ),
    path.join(directory, "generator.py"),
  );
  copyFileSync(
    path.join(
      repositoryRoot,
      "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json",
    ),
    path.join(directory, "runtime-inverse-beta-table-candidate.json"),
  );
  writeFileSync(path.join(directory, "MANIFEST.sha256"), "malformed\n");
  writeFileSync(path.join(directory, "environment.json"), "{}\n");
  writeFileSync(path.join(directory, "runtime-inverse-beta-table.json"), "{}\n");
  writeFileSync(path.join(directory, "inverse-beta-table-evidence.json"), "{}\n");
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("paired-t runtime inverse-beta table candidate", () => {
  it("keeps the candidate non-authoritative and non-runtime", () => {
    expect(validatePairedTRuntimeInverseBetaTableCandidate(loadCandidate())).toEqual([]);
    const promoted = loadCandidate();
    promoted.runtime_support_enabled = true;
    expect(validatePairedTRuntimeInverseBetaTableCandidate(promoted)).toContain(
      "inverse-beta table candidate differs from the closed non-runtime checkpoint",
    );
  });
});

describe("paired-t runtime inverse-beta table evidence validator", () => {
  for (const fileName of [
    "runtime-inverse-beta-table-candidate.json",
    "environment.json",
    "runtime-inverse-beta-table.json",
    "inverse-beta-table-evidence.json",
  ] as const) {
    it(`rejects malformed ${fileName} without throwing`, () => {
      const bundlePath = createBundle();
      writeFileSync(path.join(bundlePath, fileName), "{ broken");
      let errors: string[] | undefined;
      expect(() => {
        errors = validatePairedTRuntimeInverseBetaTableEvidenceBundle(bundlePath, EXPECTED_COMMIT);
      }).not.toThrow();
      expect(errors).toContain(`${fileName}: not valid JSON`);
    });
  }
});
