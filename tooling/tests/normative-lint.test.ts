import { describe, expect, it } from "vitest";
import {
  collectAnchors,
  lintNormativeMarkdown,
  splitParagraphs,
  stripCode,
} from "../src/lib/markdown.js";
import { markdownFiles, readText } from "../src/lib/repo.js";

describe("normative lint (repository state)", () => {
  it("passes on every spec and canonicalization document", () => {
    for (const rel of [...markdownFiles("spec"), ...markdownFiles("canonicalization")]) {
      expect(lintNormativeMarkdown(readText(rel), rel), rel).toEqual([]);
    }
  });
});

describe("normative lint (unit behavior)", () => {
  it("accepts a clause bound to exactly one anchor", () => {
    const md = [
      '<a id="NRS-GOV-0001"></a>',
      "**NRS-GOV-0001 - Example** (stability: CORE, status: active)",
      "The repository MUST be self-contained.",
    ].join("\n");
    expect(lintNormativeMarkdown(md, "x.md")).toEqual([]);
  });

  it("rejects a normative keyword without an anchor", () => {
    const issues = lintNormativeMarkdown("The verifier MUST fail closed.", "x.md");
    expect(issues).toHaveLength(1);
    expect(issues[0]?.message).toContain("without a Requirement ID anchor");
  });

  it("rejects two anchors in one paragraph", () => {
    const md = [
      '<a id="NRS-GOV-0001"></a>',
      '<a id="NRS-GOV-0002"></a>',
      "Text MUST do something.",
    ].join("\n");
    const issues = lintNormativeMarkdown(md, "x.md");
    expect(issues.some((i) => i.message.includes("exactly one is allowed"))).toBe(true);
  });

  it("ignores keywords inside fenced code blocks", () => {
    const md = ["```markdown", "The repository MUST be self-contained.", "```"].join("\n");
    expect(lintNormativeMarkdown(md, "x.md")).toEqual([]);
  });

  it("ignores keywords inside inline code", () => {
    expect(lintNormativeMarkdown("Write `MUST` in backticks when mentioning it.", "x.md")).toEqual(
      [],
    );
  });

  it("ignores lowercase modal verbs", () => {
    expect(
      lintNormativeMarkdown("Implementations may do this; they must not lie.", "x.md"),
    ).toEqual([]);
  });

  it("treats separate keywords in one anchored paragraph as one clause", () => {
    const md = [
      '<a id="NRS-SEC-0001"></a>',
      "**NRS-SEC-0001** A verifier MUST operate offline and MUST NOT dereference URIs.",
    ].join("\n");
    expect(lintNormativeMarkdown(md, "x.md")).toEqual([]);
  });
});

describe("markdown helpers", () => {
  it("preserves line numbers while stripping code", () => {
    const md = ["para one", "", "```", "code MUST", "```", "", "para two"].join("\n");
    const paragraphs = splitParagraphs(stripCode(md));
    expect(paragraphs.map((p) => p.line)).toEqual([1, 7]);
  });

  it("collects anchors outside code only", () => {
    const md = [
      '<a id="NRS-GOV-0001"></a> real',
      "```",
      '<a id="NRS-GOV-0002"></a> example',
      "```",
    ].join("\n");
    expect(collectAnchors(stripCode(md)).map((a) => a.id)).toEqual(["NRS-GOV-0001"]);
  });
});
