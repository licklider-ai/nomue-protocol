/**
 * Markdown analysis helpers for the normative lint and traceability checks.
 * Pure functions: no filesystem access.
 */

export interface Paragraph {
  text: string;
  /** 1-based line number of the paragraph's first line. */
  line: number;
}

export interface AnchorHit {
  id: string;
  /** 1-based line number. */
  line: number;
}

export interface LintIssue {
  file: string;
  line: number;
  message: string;
}

const keywordRe = (): RegExp => /\b(?:MUST NOT|MUST|SHOULD NOT|SHOULD|MAY)\b/g;
const anchorRe = (): RegExp => /<a id="(NRS-[A-Z]+(?:-[A-Z]+)*-[0-9]{4})"><\/a>/g;

/**
 * Blank out fenced code blocks and inline code spans while preserving line
 * numbering and paragraph boundaries. Keyword and anchor occurrences inside
 * code never count as normative usage.
 */
export function stripCode(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];
  let fenceChar: string | null = null;
  for (const line of lines) {
    const fence = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (fenceChar === null && fence !== undefined && fence !== null) {
      fenceChar = (fence[1] as string)[0] as string;
      out.push("");
      continue;
    }
    if (fenceChar !== null) {
      if (fence !== null && (fence[1] as string)[0] === fenceChar) fenceChar = null;
      out.push("");
      continue;
    }
    out.push(line.replace(/`[^`\n]*`/g, (s) => " ".repeat(s.length)));
  }
  return out.join("\n");
}

/** Split text into blank-line-separated paragraphs. */
export function splitParagraphs(text: string): Paragraph[] {
  const lines = text.split("\n");
  const paragraphs: Paragraph[] = [];
  let buffer: string[] = [];
  let start = 0;
  const flush = (): void => {
    if (buffer.length > 0) paragraphs.push({ text: buffer.join("\n"), line: start + 1 });
    buffer = [];
  };
  lines.forEach((line, index) => {
    if (line.trim() === "") {
      flush();
    } else {
      if (buffer.length === 0) start = index;
      buffer.push(line);
    }
  });
  flush();
  return paragraphs;
}

/** All requirement anchors in (already code-stripped) markdown. */
export function collectAnchors(strippedMarkdown: string): AnchorHit[] {
  const hits: AnchorHit[] = [];
  strippedMarkdown.split("\n").forEach((line, index) => {
    for (const m of line.matchAll(anchorRe())) {
      hits.push({ id: m[1] as string, line: index + 1 });
    }
  });
  return hits;
}

/**
 * Normative language lint: every paragraph that uses an uppercase requirement
 * keyword outside code binds to exactly one requirement anchor, and no
 * paragraph carries more than one anchor.
 */
export function lintNormativeMarkdown(markdown: string, file: string): LintIssue[] {
  const issues: LintIssue[] = [];
  for (const paragraph of splitParagraphs(stripCode(markdown))) {
    const keywords = paragraph.text.match(keywordRe()) ?? [];
    const anchors = [...paragraph.text.matchAll(anchorRe())].map((m) => m[1] as string);
    if (anchors.length > 1) {
      issues.push({
        file,
        line: paragraph.line,
        message: `paragraph binds ${anchors.length} Requirement IDs (${anchors.join(", ")}); exactly one is allowed`,
      });
    }
    if (keywords.length > 0 && anchors.length === 0) {
      const unique = [...new Set(keywords)];
      issues.push({
        file,
        line: paragraph.line,
        message: `normative keyword(s) ${unique.join(", ")} used without a Requirement ID anchor`,
      });
    }
  }
  return issues;
}
