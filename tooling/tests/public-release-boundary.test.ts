import { describe, expect, it } from "vitest";
import { checkPublicReleaseBoundaryFromPaths } from "../src/release/public-release-boundary.js";

describe("Release 1 public repository boundary", () => {
  it("rejects governance/research-problems material from a public candidate", () => {
    const result = checkPublicReleaseBoundaryFromPaths([
      "README.md",
      "spec/core/layer-boundary.md",
      "governance/research-problems/p1a/example.md",
    ]);
    expect(result.ok).toBe(false);
    expect(result.forbidden_paths).toEqual(["governance/research-problems/p1a/example.md"]);
    expect(result.message).toContain("private-only research material remains");
  });

  it("does not reject ordinary Protocol or release-evidence paths", () => {
    const result = checkPublicReleaseBoundaryFromPaths([
      "README.md",
      "governance/RELEASE-POLICY.md",
      "evidence/release-1/gates/R1-01/close-record.md",
    ]);
    expect(result.ok).toBe(true);
    expect(result.forbidden_paths).toEqual([]);
  });

  it("matches only the private research directory prefix", () => {
    const result = checkPublicReleaseBoundaryFromPaths([
      "governance/research-problems-archive-note.md",
      "governance/research/README.md",
    ]);
    expect(result.ok).toBe(true);
  });
});
