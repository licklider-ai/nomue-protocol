/**
 * Private-dependency audit: fails on any mechanically detectable dependency on
 * or reference to private repositories, private authority systems, or
 * machine-local absolute paths.
 *
 * Forbidden patterns are assembled from fragments so that this file does not
 * itself contain the literal strings it forbids.
 */

import * as path from "node:path";
import { repoRoot, walkFiles, readText, type Issue } from "./repo.js";

export interface ContentRule {
  rule: string;
  regex: RegExp;
}

const join = (...parts: string[]): string => parts.join("");

export function forbiddenContentRules(): ContentRule[] {
  return [
    {
      // Numbered IDs from the private authority scheme, e.g. <scheme>-001.
      rule: "foreign-authority-id",
      regex: new RegExp("\\b" + join("LI", "NT") + "-\\d+\\b"),
    },
    {
      // Private planning tree of the product repository.
      rule: "private-planning-path",
      regex: new RegExp(join("docs/planning/", "intent", "-portfolio")),
    },
    {
      // The private product repository by name (any path form, relative or absolute).
      rule: "private-repo-reference",
      regex: new RegExp(join("nomue", "-master")),
    },
    {
      // Windows user-profile absolute paths (drive letter, colon, user tree).
      rule: "windows-absolute-path",
      regex: new RegExp("[A-Za-z]:[\\\\/]+" + join("Us", "ers") + "[\\\\/]"),
    },
    {
      // Unix home-directory absolute paths.
      rule: "unix-home-absolute-path",
      regex: new RegExp("(^|[\\s\"'`(=:])" + "/" + join("ho", "me") + "/[A-Za-z]"),
    },
    {
      // macOS home-directory absolute paths.
      rule: "macos-home-absolute-path",
      regex: new RegExp("(^|[\\s\"'`(=:])" + "/" + join("Us", "ers") + "/[A-Za-z]"),
    },
  ];
}

export function auditTextContent(rel: string, content: string): Issue[] {
  const issues: Issue[] = [];
  for (const { rule, regex } of forbiddenContentRules()) {
    const match = regex.exec(content);
    if (match !== null) {
      issues.push({
        check: "private-dependency-audit",
        file: rel,
        message: `forbidden pattern (${rule}): "${match[0].trim()}"`,
      });
    }
  }
  return issues;
}

const DEP_FIELDS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const;

export function auditPackageJson(pkg: Record<string, unknown>): Issue[] {
  const issues: Issue[] = [];
  for (const field of DEP_FIELDS) {
    const deps = pkg[field];
    if (deps === undefined || deps === null || typeof deps !== "object") continue;
    for (const [name, spec] of Object.entries(deps as Record<string, string>)) {
      if (/^(file:|link:|portal:|workspace:)/.test(spec) || /(git\+)?ssh:/.test(spec)) {
        issues.push({
          check: "private-dependency-audit",
          file: "package.json",
          message: `${field}.${name} uses a local or private protocol specifier: ${spec}`,
        });
      }
      if (forbiddenContentRules().some((r) => r.regex.test(name))) {
        issues.push({
          check: "private-dependency-audit",
          file: "package.json",
          message: `${field}.${name} matches a forbidden private name`,
        });
      }
    }
  }
  return issues;
}

/** Relative import specifiers in source files must stay inside the repository. */
export function auditImportSpecifiers(rel: string, content: string): Issue[] {
  const issues: Issue[] = [];
  const importRe = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)["']([^"'\n]+)["']/g;
  for (const match of content.matchAll(importRe)) {
    const spec = match[1] as string;
    if (spec.startsWith(".")) {
      const resolved = path.resolve(path.dirname(path.join(repoRoot, rel)), spec);
      const relative = path.relative(repoRoot, resolved);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        issues.push({
          check: "private-dependency-audit",
          file: rel,
          message: `import specifier escapes the repository: ${spec}`,
        });
      }
    } else if (path.isAbsolute(spec) || /^[A-Za-z]:[\\/]/.test(spec)) {
      issues.push({
        check: "private-dependency-audit",
        file: rel,
        message: `import specifier uses an absolute path: ${spec}`,
      });
    }
  }
  return issues;
}

/** Full repository audit: content patterns, symlinks, package.json, imports. */
export function runPrivateDependencyAudit(): Issue[] {
  const issues: Issue[] = [];

  for (const entry of walkFiles(".")) {
    if (entry.isSymlink) {
      const target = entry.symlinkTarget;
      const escapes = target === undefined || path.relative(repoRoot, target).startsWith("..");
      issues.push({
        check: "private-dependency-audit",
        file: entry.rel,
        message: escapes
          ? `symlink points outside the repository (${target ?? "unresolvable"})`
          : "symlinks are not allowed in this repository",
      });
      continue;
    }

    if (entry.rel === "pnpm-lock.yaml") {
      // Lockfile integrity hashes can coincidentally contain forbidden
      // substrings; audit only its structure-relevant lines.
      const lockText = readText(entry.rel);
      if (/(specifier|version):\s*(file|link):/.test(lockText)) {
        issues.push({
          check: "private-dependency-audit",
          file: entry.rel,
          message: "lockfile contains local file/link dependency specifiers",
        });
      }
      continue;
    }

    let content: string;
    try {
      content = readText(entry.rel);
    } catch {
      continue;
    }
    issues.push(...auditTextContent(entry.rel, content));
    if (/\.(ts|js|mjs|cjs|tsx)$/.test(entry.rel)) {
      issues.push(...auditImportSpecifiers(entry.rel, content));
    }
    if (entry.rel === "package.json") {
      issues.push(...auditPackageJson(JSON.parse(content) as Record<string, unknown>));
    }
  }

  return issues;
}
