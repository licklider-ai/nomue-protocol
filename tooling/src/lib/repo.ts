import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

/** Absolute path of the repository root. */
export const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
);

const SKIP_DIRS = new Set([".git", "node_modules", ".venv"]);

export function toPosix(p: string): string {
  return p.split(path.sep).join("/");
}

export function absPath(rel: string): string {
  return path.join(repoRoot, rel);
}

export function exists(rel: string): boolean {
  return fs.existsSync(absPath(rel));
}

export function readText(rel: string): string {
  return fs.readFileSync(absPath(rel), "utf8");
}

export function loadYaml<T>(rel: string): T {
  return parseYaml(readText(rel)) as T;
}

export function loadJson<T>(rel: string): T {
  return JSON.parse(readText(rel)) as T;
}

export interface WalkedFile {
  /** Repository-relative POSIX path. */
  rel: string;
  isSymlink: boolean;
  /** Resolved absolute target for symlinks, undefined otherwise. */
  symlinkTarget?: string;
}

/** Walk all files in the repository, skipping .git and node_modules. */
export function walkFiles(subdir = "."): WalkedFile[] {
  const out: WalkedFile[] = [];
  const start = path.join(repoRoot, subdir);
  if (!fs.existsSync(start)) return out;

  const visit = (dirAbs: string): void => {
    for (const entry of fs.readdirSync(dirAbs, { withFileTypes: true })) {
      const entryAbs = path.join(dirAbs, entry.name);
      const rel = toPosix(path.relative(repoRoot, entryAbs));
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) visit(entryAbs);
        continue;
      }
      if (entry.isSymbolicLink()) {
        let target: string | undefined;
        try {
          target = fs.realpathSync(entryAbs);
        } catch {
          target = undefined;
        }
        out.push({ rel, isSymlink: true, symlinkTarget: target });
        continue;
      }
      if (entry.isFile()) out.push({ rel, isSymlink: false });
    }
  };
  visit(start);
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

/** All markdown files under a repository-relative directory. */
export function markdownFiles(subdir: string): string[] {
  return walkFiles(subdir)
    .filter((f) => !f.isSymlink && f.rel.endsWith(".md"))
    .map((f) => f.rel);
}

/** A single validation finding. */
export interface Issue {
  check: string;
  file?: string;
  message: string;
}

export function formatIssue(issue: Issue): string {
  const loc = issue.file ? `${issue.file}: ` : "";
  return `[${issue.check}] ${loc}${issue.message}`;
}
