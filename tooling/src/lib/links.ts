/**
 * Link audit: relative markdown links resolve to existing files, and NRS
 * requirement-anchor fragments resolve to a real anchor in the target file.
 * External URIs are never fetched (offline-by-default applies to tooling too).
 */

import * as path from "node:path";
import { collectAnchors, stripCode } from "./markdown.js";
import type { Issue } from "./repo.js";

const linkRe = (): RegExp => /!?\[[^\]]*\]\(([^()\s]+)(?:\s+"[^"]*")?\)/g;

export interface LinkAuditCtx {
  /** Whether a repository-relative path exists (file or directory). */
  exists(rel: string): boolean;
  /** Raw content of a repository-relative markdown file, or undefined. */
  content(rel: string): string | undefined;
}

function normalizeRel(fromFile: string, target: string): string {
  const joined = path.posix.join(path.posix.dirname(fromFile), target);
  return path.posix.normalize(joined);
}

export function auditMarkdownLinks(files: ReadonlyMap<string, string>, ctx: LinkAuditCtx): Issue[] {
  const check = "link-audit";
  const issues: Issue[] = [];

  for (const [file, raw] of files) {
    const content = stripCode(raw);
    for (const match of content.matchAll(linkRe())) {
      const target = match[1] as string;
      if (/^(https?:|mailto:|urn:)/i.test(target)) continue;

      const [pathPart = "", fragment] = target.split("#", 2) as [string, string?];

      if (pathPart === "") {
        if (fragment !== undefined && /^NRS-/.test(fragment)) {
          const anchors = new Set(collectAnchors(stripCode(raw)).map((a) => a.id));
          if (!anchors.has(fragment)) {
            issues.push({
              check,
              file,
              message: `fragment #${fragment} does not exist in this file`,
            });
          }
        }
        continue;
      }

      const resolved = normalizeRel(file, pathPart);
      if (resolved.startsWith("..")) {
        issues.push({ check, file, message: `link ${target} escapes the repository` });
        continue;
      }
      if (!ctx.exists(resolved)) {
        issues.push({ check, file, message: `broken link ${target} (resolved: ${resolved})` });
        continue;
      }
      if (fragment !== undefined && /^NRS-/.test(fragment)) {
        const targetContent = ctx.content(resolved);
        if (targetContent !== undefined) {
          const anchors = new Set(collectAnchors(stripCode(targetContent)).map((a) => a.id));
          if (!anchors.has(fragment)) {
            issues.push({
              check,
              file,
              message: `link ${target}: anchor #${fragment} not found in ${resolved}`,
            });
          }
        }
      }
    }
  }
  return issues;
}
