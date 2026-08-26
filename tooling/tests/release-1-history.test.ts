import { generateKeyPairSync } from "node:crypto";
import * as fs from "node:fs";
import { describe, expect, it } from "vitest";
import { absPath } from "../src/lib/repo.js";
import {
  checkRelease1HistoricalIntegrity,
  type Release1HistorySource,
} from "../src/release/release-1-history.js";

const PUBLIC_KEY_PATH = "evidence/release-1/gates/R1-14/release-g2.pem";
const CANDIDATE_FREEZE_PATH = "evidence/release-1/candidate-freeze-manifest.json";

const repositorySource: Release1HistorySource = {
  exists: (path) => fs.existsSync(absPath(path)),
  readBytes: (path) => fs.readFileSync(absPath(path)),
};

function replacing(targetPath: string, replacement: Uint8Array): Release1HistorySource {
  return {
    exists: repositorySource.exists,
    readBytes: (path) => (path === targetPath ? replacement : repositorySource.readBytes(path)),
  };
}

describe("Release 1 historical integrity", () => {
  it("accepts the signed Release 1 baseline in a successor checkout", () => {
    expect(checkRelease1HistoricalIntegrity()).toEqual([]);
  });

  it("rejects replacement of the published Release 1 signing key", () => {
    const { publicKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
    const replacement = publicKey.export({ type: "spki", format: "pem" });
    const issues = checkRelease1HistoricalIntegrity(
      replacing(PUBLIC_KEY_PATH, Buffer.from(replacement)),
    );
    expect(issues.some((issue) => issue.message.includes("signing-key fingerprint changed"))).toBe(
      true,
    );
  });

  it("rejects byte changes to the Release 1 candidate-freeze evidence", () => {
    const replacement = Buffer.concat([
      repositorySource.readBytes(CANDIDATE_FREEZE_PATH),
      Buffer.from("\n"),
    ]);
    const issues = checkRelease1HistoricalIntegrity(replacing(CANDIDATE_FREEZE_PATH, replacement));
    expect(
      issues.some((issue) => issue.message.includes("candidate-freeze evidence bytes changed")),
    ).toBe(true);
  });

  it("rejects byte changes to a released conformance fixture", () => {
    const freeze = JSON.parse(
      Buffer.from(repositorySource.readBytes(CANDIDATE_FREEZE_PATH)).toString("utf8"),
    ) as { files: Array<{ path: string }> };
    const fixturePath = freeze.files.find((entry) =>
      entry.path.startsWith("conformance/fixtures/"),
    )?.path;
    expect(fixturePath).toBeDefined();
    if (fixturePath === undefined) return;

    const replacement = Buffer.concat([repositorySource.readBytes(fixturePath), Buffer.from("\n")]);
    const issues = checkRelease1HistoricalIntegrity(replacing(fixturePath, replacement));
    expect(
      issues.some(
        (issue) =>
          issue.file === fixturePath && issue.message.includes("fixture/vector bytes changed"),
      ),
    ).toBe(true);
  });
});
