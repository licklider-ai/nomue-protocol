import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";
import {
  assertStrictJsonEligible,
  parseStrictJson,
  scanStrictJsonIssues,
  StrictJsonError,
} from "../../reference/verifier/src/strict-json.js";
import {
  buildVerifierResources,
  loadVerifierResources,
  PHASE1_BUNDLE_ID,
  PHASE2A_BUNDLE_ID,
} from "../../reference/verifier/src/resources.js";
import {
  verifyRecordText,
  verifyRecordTextWithResources,
} from "../../reference/verifier/src/verify.js";
import { classifyStrictJsonIndependently } from "../src/phase1/strict-json-differential.js";
import { deterministicShuffle, outcomeKey } from "../src/phase1/routing-invariance.js";
import { loadConformanceFixtures } from "../src/phase1/conformance.js";
import { repoRoot } from "../src/lib/repo.js";

const codeOf = (text: string): string | null => {
  try {
    assertStrictJsonEligible(text);
    return null;
  } catch (err) {
    if (err instanceof StrictJsonError) return err.code;
    throw err;
  }
};

describe("strict JCS input eligibility (NRS-CANON-0007)", () => {
  it("rejects duplicates at top level, nested, and inside arrays - even with identical values", () => {
    for (const text of [
      '{"a": 1, "a": 2}',
      '{"a": 1, "a": 1}',
      '{"outer": {"x": 1, "x": 1}}',
      '{"arr": [{"y": 1}, {"y": 1, "y": 2}]}',
      '{"a": {"b": {"c": [{"d": 0, "d": 0}]}}}',
    ]) {
      expect(codeOf(text), text).toBe("DUPLICATE_JSON_MEMBER");
    }
  });

  it("compares member names after escape decoding (escaped-equivalent spellings collide)", () => {
    expect(codeOf('{"interpretation_bundle_id": 1, "\\u0069nterpretation_bundle_id": 2}')).toBe(
      "DUPLICATE_JSON_MEMBER",
    );
    expect(codeOf('{"a\\u0062c": 1, "abc": 2}')).toBe("DUPLICATE_JSON_MEMBER");
  });

  it("never treats member-name-like text inside string values as members", () => {
    for (const text of [
      '{"label": "\\"a\\": 1, \\"a\\": 2"}',
      '{"label": "{ } [ ] : , \\" \\\\ text"}',
      '{"a": "{\\"a\\": 1}", "b": "{\\"a\\": 2}"}',
    ]) {
      expect(codeOf(text), text).toBeNull();
    }
  });

  it("accepts distinct sibling names and same names in DIFFERENT objects", () => {
    expect(codeOf('{"a": 1, "b": 2}')).toBeNull();
    expect(codeOf('{"x": {"a": 1}, "y": {"a": 2}}')).toBeNull();
    expect(codeOf('[{"a": 1}, {"a": 2}]')).toBeNull();
  });
});

describe("strict Unicode scalar validity (NRS-CANON-0008)", () => {
  it("rejects unpaired surrogates in values and member names", () => {
    expect(codeOf('{"s": "\\uD800"}')).toBe("INVALID_UNICODE_STRING");
    expect(codeOf('{"s": "\\uDC00"}')).toBe("INVALID_UNICODE_STRING");
    expect(codeOf('{"\\uD800": 1}')).toBe("INVALID_UNICODE_STRING");
    expect(codeOf('{"s": "a\\uD800b"}')).toBe("INVALID_UNICODE_STRING");
    expect(codeOf('{"s": "\\uDE00\\uD83D"}')).toBe("INVALID_UNICODE_STRING");
    expect(codeOf('{"s": "\\uD800\\uD800"}')).toBe("INVALID_UNICODE_STRING");
    // A lone high followed by a VALID pair: the failure must not consume
    // the pair's high surrogate.
    expect(codeOf('{"s": "\\uD800\\uD83D\\uDE00"}')).toBe("INVALID_UNICODE_STRING");
  });

  it("accepts correctly paired surrogates (escaped and literal) and BMP text", () => {
    expect(codeOf('{"s": "\\uD83D\\uDE00"}')).toBeNull();
    expect(codeOf('{"s": "\u{1F600}"}')).toBeNull();
    expect(codeOf('{"s": "plain"}')).toBeNull();
  });

  it("performs no normalization: NFC and NFD stay distinct and both are eligible", () => {
    const nfc = "caf\u00e9";
    const nfd = "cafe\u0301";
    expect(nfc).not.toBe(nfd);
    expect(codeOf(`{"a": "${nfc}", "b": "${nfd}"}`)).toBeNull();
    // Distinct member names too: no normalization-driven collision.
    expect(codeOf(`{"${nfc}": 1, "${nfd}": 2}`)).toBeNull();
  });
});

describe("pre-routing rejection priority (NRS-CANON-0023)", () => {
  it("reports malformed syntax before duplicates", () => {
    expect(() => parseStrictJson('{"a": 1, "a": 2')).toThrow(SyntaxError);
  });

  it("reports duplicates before invalid Unicode", () => {
    const issues = scanStrictJsonIssues('{"s": "\\uD800", "s": "\\uD800"}');
    expect(issues.some((i) => i.code === "DUPLICATE_JSON_MEMBER")).toBe(true);
    expect(codeOf('{"s": "\\uD800", "s": "\\uD800"}')).toBe("DUPLICATE_JSON_MEMBER");
  });

  it("reports duplicates before routing: no bundle is selected, no report exists", () => {
    const dup = `{"interpretation_bundle_id": "${PHASE1_BUNDLE_ID}", "interpretation_bundle_id": "${PHASE2A_BUNDLE_ID}"}`;
    const outcome = verifyRecordText(dup);
    expect(outcome.exitCode).toBe(2);
    expect(outcome.report).toBeUndefined();
    expect(outcome.refusal?.refusal_kind).toBe("parse_error");
    expect(outcome.refusal?.reason_codes).toEqual(["NRS-DUPLICATE-JSON-MEMBER"]);
    expect(loadVerifierResources().validateRefusal(outcome.refusal)).toBe(true);
  });

  it("refuses duplicate bundle declarations identically under permuted registry order", () => {
    const canonical = loadVerifierResources();
    const permutations = [
      buildVerifierResources((entries) => [...entries].reverse()),
      buildVerifierResources((entries) => deterministicShuffle(entries)),
    ];
    for (const text of [
      `{"interpretation_bundle_id": "${PHASE1_BUNDLE_ID}", "interpretation_bundle_id": "${PHASE2A_BUNDLE_ID}"}`,
      `{"interpretation_bundle_id": "${PHASE2A_BUNDLE_ID}", "interpretation_bundle_id": "${PHASE1_BUNDLE_ID}"}`,
    ]) {
      const key = outcomeKey(verifyRecordTextWithResources(text, canonical));
      for (const permuted of permutations) {
        expect(outcomeKey(verifyRecordTextWithResources(text, permuted))).toBe(key);
      }
    }
  });
});

describe("strict-JSON differential (independent classifier)", () => {
  const CORPUS = [
    '{"a": 1, "a": 2}',
    '{"a": 1, "a": 1}',
    '{"a": 1, "\\u0061": 2}',
    '{"outer": {"x": 1, "x": 1}}',
    '{"arr": [{"y": 1, "y": 2}]}',
    '{"label": "\\"a\\": 1, \\"a\\": 2"}',
    '{"s": "\\uD800"}',
    '{"s": "\\uDC00"}',
    '{"\\uD800": 1}',
    '{"s": "\\uD83D\\uDE00"}',
    '{"s": "caf\u00e9 cafe\u0301"}',
    '{"a": {"b": 1}, "c": [1, 2, 3], "d": "x"}',
    "[]",
    "{}",
    '"top-level string"',
    "42",
  ];

  it("agrees with the reference scanner on the adversarial corpus", () => {
    for (const text of CORPUS) {
      const independent = classifyStrictJsonIndependently(text);
      const issues = scanStrictJsonIssues(text);
      expect(
        issues.some((i) => i.code === "DUPLICATE_JSON_MEMBER"),
        `duplicates: ${text}`,
      ).toBe(independent.duplicates);
      expect(
        issues.some((i) => i.code === "INVALID_UNICODE_STRING"),
        `unicode: ${text}`,
      ).toBe(independent.invalidUnicode);
    }
  });

  it("agrees with the reference scanner on every parseable conformance fixture input", () => {
    let compared = 0;
    for (const { fixture } of loadConformanceFixtures()) {
      const text = fs.readFileSync(path.join(repoRoot, fixture.input), "utf8");
      try {
        JSON.parse(text);
      } catch {
        continue; // syntax fixtures are out of eligibility scope
      }
      const independent = classifyStrictJsonIndependently(text);
      const issues = scanStrictJsonIssues(text);
      expect(
        issues.some((i) => i.code === "DUPLICATE_JSON_MEMBER"),
        `duplicates: ${fixture.fixture_id}`,
      ).toBe(independent.duplicates);
      expect(
        issues.some((i) => i.code === "INVALID_UNICODE_STRING"),
        `unicode: ${fixture.fixture_id}`,
      ).toBe(independent.invalidUnicode);
      compared += 1;
    }
    expect(compared).toBeGreaterThan(90);
  });
});
