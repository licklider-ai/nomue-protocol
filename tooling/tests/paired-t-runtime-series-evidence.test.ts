import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { validatePairedTRuntimeSeriesEvidenceBundle } from "../src/spikes/validate-paired-t-runtime-series-evidence.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const temporaryDirectories: string[] = [];
const EXPECTED_COMMIT = "2f2672fe45704d9860d52247862a13fb1dd30ca4";

function createBundle(): string {
  const directory = mkdtempSync(path.join(tmpdir(), "nomue-runtime-series-evidence-"));
  temporaryDirectories.push(directory);
  const sourceMappings = {
    "cases.json": "tooling/r2-paired-t-runtime-series/cases.json",
    "generator.py": "tooling/r2-paired-t-runtime-series/generate_evidence.py",
    "runtime-series-candidate.json":
      "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json",
    "runtime-series-candidate.ts": "tooling/src/spikes/paired-t-runtime-series-candidate.ts",
    "truth-error-support-candidate.json":
      "governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json",
    "truth-error-support-candidate.ts":
      "tooling/src/spikes/paired-t-truth-error-support-candidate.ts",
  } as const;
  for (const [copyName, sourcePath] of Object.entries(sourceMappings)) {
    copyFileSync(path.join(repositoryRoot, sourcePath), path.join(directory, copyName));
  }
  writeFileSync(path.join(directory, "MANIFEST.sha256"), "malformed\n");
  writeFileSync(path.join(directory, "environment.json"), "{}\n");
  writeFileSync(path.join(directory, "runtime-series-evidence.json"), "{}\n");
  return directory;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("paired-t runtime-series evidence validator", () => {
  for (const fileName of [
    "cases.json",
    "environment.json",
    "runtime-series-evidence.json",
  ] as const) {
    it(`rejects malformed ${fileName} without throwing`, () => {
      const bundlePath = createBundle();
      writeFileSync(path.join(bundlePath, fileName), "{ broken");

      let errors: string[] | undefined;
      expect(() => {
        errors = validatePairedTRuntimeSeriesEvidenceBundle(bundlePath, EXPECTED_COMMIT);
      }).not.toThrow();
      expect(errors).toContain(`${fileName}: not valid JSON`);
    });
  }

  it("returns a stable validation error for a missing bundle root", () => {
    const parent = mkdtempSync(path.join(tmpdir(), "nomue-runtime-series-evidence-parent-"));
    temporaryDirectories.push(parent);
    const missing = path.join(parent, "missing");
    expect(() =>
      validatePairedTRuntimeSeriesEvidenceBundle(missing, EXPECTED_COMMIT),
    ).not.toThrow();
    expect(validatePairedTRuntimeSeriesEvidenceBundle(missing, EXPECTED_COMMIT)).toEqual([
      "evidence bundle cannot be read",
    ]);
  });

  it("rejects a directory where a regular bundle file is required", () => {
    const bundlePath = createBundle();
    const candidatePath = path.join(bundlePath, "truth-error-support-candidate.ts");
    rmSync(candidatePath);
    mkdirSync(candidatePath);

    expect(() =>
      validatePairedTRuntimeSeriesEvidenceBundle(bundlePath, EXPECTED_COMMIT),
    ).not.toThrow();
    expect(validatePairedTRuntimeSeriesEvidenceBundle(bundlePath, EXPECTED_COMMIT)).toContain(
      "truth-error-support-candidate.ts: evidence bundle entries must be regular files",
    );
  });

  it("contains valid-JSON shape errors instead of throwing", () => {
    const bundlePath = createBundle();
    writeFileSync(path.join(bundlePath, "runtime-series-evidence.json"), "{}\n");

    const errors = validatePairedTRuntimeSeriesEvidenceBundle(bundlePath, EXPECTED_COMMIT);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors).toContain(
      "runtime-series evidence bundle cannot be read or is structurally invalid",
    );
  });
});
