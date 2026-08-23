import { describe, expect, it } from "vitest";
import {
  auditImportSpecifiers,
  auditPackageJson,
  auditTextContent,
  runPrivateDependencyAudit,
} from "../src/lib/private-audit.js";

// Forbidden samples are assembled from fragments so this test file does not
// itself trip the repository-wide audit.
const join = (...parts: string[]): string => parts.join("");

describe("private-dependency audit (repository state)", () => {
  it("passes on the repository", () => {
    expect(runPrivateDependencyAudit()).toEqual([]);
  });
});

describe("private-dependency audit (unit behavior)", () => {
  it("flags foreign authority IDs", () => {
    const bad = join("LI", "NT", "-0042");
    const issues = auditTextContent("doc.md", `See ${bad} for details.`);
    expect(issues.some((i) => i.message.includes("foreign-authority-id"))).toBe(true);
  });

  it("flags private planning paths", () => {
    const bad = join("docs/planning/", "intent", "-portfolio", "/file.md");
    const issues = auditTextContent("doc.md", bad);
    expect(issues.some((i) => i.message.includes("private-planning-path"))).toBe(true);
  });

  it("flags references to the private product repository", () => {
    const bad = join("../", "nomue", "-master", "-repo/spec.md");
    const issues = auditTextContent("doc.md", bad);
    expect(issues.some((i) => i.message.includes("private-repo-reference"))).toBe(true);
  });

  it("flags Windows and Unix absolute user paths", () => {
    const win = join("C:", "\\", "Us", "ers", "\\someone\\project");
    const unix = join(" /", "ho", "me", "/someone/project");
    const mac = join(" /", "Us", "ers", "/someone/project");
    expect(auditTextContent("a.md", win).length).toBeGreaterThan(0);
    expect(auditTextContent("b.md", unix).length).toBeGreaterThan(0);
    expect(auditTextContent("c.md", mac).length).toBeGreaterThan(0);
  });

  it("accepts clean prose mentioning the company and repository", () => {
    const text = "Licklider publishes the nomue Record Specification in nomue-record.";
    expect(auditTextContent("doc.md", text)).toEqual([]);
  });

  it("flags local-protocol package specifiers", () => {
    const pkg = { dependencies: { internal: "file:../somewhere" } };
    const issues = auditPackageJson(pkg);
    expect(issues.some((i) => i.message.includes("local or private protocol"))).toBe(true);
  });

  it("flags imports escaping the repository", () => {
    const spec = ["..", "..", "..", "..", "outside", "module.js"].join("/");
    const source = `import { x } from ${JSON.stringify(spec)};`;
    const issues = auditImportSpecifiers("tooling/src/lib/example.ts", source);
    expect(issues.some((i) => i.message.includes("escapes the repository"))).toBe(true);
  });

  it("accepts in-repository relative imports", () => {
    const source = 'import { x } from "./markdown.js";';
    expect(auditImportSpecifiers("tooling/src/lib/example.ts", source)).toEqual([]);
  });
});
