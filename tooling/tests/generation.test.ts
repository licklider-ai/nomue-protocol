import * as fs from "node:fs";
import { describe, expect, it } from "vitest";
import { loadViewSources } from "../src/lib/load.js";
import { absPath } from "../src/lib/repo.js";
import { buildGeneratedViews } from "../src/lib/views.js";
import { buildTypescriptBindings } from "../src/phase1/bindings.js";

const normalize = (text: string): string => text.replace(/\r\n/g, "\n");

describe("generated views", () => {
  it("builds deterministically", () => {
    const first = buildGeneratedViews(loadViewSources());
    const second = buildGeneratedViews(loadViewSources());
    expect([...first.keys()]).toEqual([...second.keys()]);
    for (const [rel, content] of first) {
      expect(second.get(rel), rel).toBe(content);
    }
  });

  it("marks every view as generated and non-editable", () => {
    for (const [rel, content] of buildGeneratedViews(loadViewSources())) {
      expect(content, rel).toContain("GENERATED FILE - DO NOT EDIT.");
      expect(content, rel).toContain("Generation command: pnpm generate");
      expect(content, rel).toContain("Source artifacts:");
    }
  });

  it("keeps the generated README independent of mutable release gate state", () => {
    const views = buildGeneratedViews(loadViewSources());
    const readme = views.get("generated/README.md") ?? "";
    const gatesView = views.get("generated/RELEASE-1-GATES.md") ?? "";
    expect(readme).not.toContain("authority/release-1-gates.yaml");
    expect(gatesView).toContain("authority/release-1-gates.yaml");
  });

  it("matches the files on disk exactly (clean generation)", () => {
    const views = buildGeneratedViews(loadViewSources());
    for (const [rel, content] of views) {
      const onDisk = fs.readFileSync(absPath(rel), "utf8");
      expect(normalize(onDisk), rel).toBe(normalize(content));
    }
    const filesOnDisk = fs
      .readdirSync(absPath("generated"))
      .map((name) => `generated/${name}`)
      .sort();
    expect(filesOnDisk).toEqual([...views.keys()].sort());
  });

  it("keeps the TypeScript bindings clean-generated with pinned source hashes", async () => {
    const bindings = await buildTypescriptBindings();
    expect([...bindings.keys()].sort()).toEqual([
      "bindings/typescript/generated/record-0.2.ts",
      "bindings/typescript/generated/record.ts",
      "bindings/typescript/generated/routing-envelope-0.2.ts",
      "bindings/typescript/generated/verification-report-0.2.ts",
      "bindings/typescript/generated/verification-report.ts",
      "bindings/typescript/generated/verifier-refusal-0.2-draft-2.ts",
      "bindings/typescript/generated/verifier-refusal-0.2-draft-3.ts",
      "bindings/typescript/generated/verifier-refusal-0.2.ts",
    ]);
    for (const [rel, content] of bindings) {
      expect(content, rel).toContain("GENERATED FILE - DO NOT EDIT.");
      expect(content, rel).toContain("sha256:");
      const onDisk = fs.readFileSync(absPath(rel), "utf8");
      expect(normalize(onDisk), rel).toBe(normalize(content));
    }
  });

  it("covers every requirement and gate in the views", () => {
    const sources = loadViewSources();
    const views = buildGeneratedViews(sources);
    const requirementsView = views.get("generated/REQUIREMENTS.md") ?? "";
    for (const req of sources.requirements.requirements) {
      expect(requirementsView).toContain(req.id);
    }
    const gatesView = views.get("generated/RELEASE-1-GATES.md") ?? "";
    for (const gate of sources.gates.gates) {
      expect(gatesView).toContain(gate.gate_id);
    }
  });
});
