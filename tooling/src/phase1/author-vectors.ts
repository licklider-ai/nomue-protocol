/**
 * Development-time authoring aid for canonicalization/test-vectors/.
 *
 * Every canonical expected output is computed with BOTH the reference JCS
 * implementation and the independent `canonicalize` npm package; the script
 * aborts on any disagreement, so expected values are never generated from
 * the reference canonicalizer alone. Digest expectations use node:crypto
 * SHA-256 over the agreed canonical UTF-8 bytes.
 *
 * Re-running rewrites inputs/, expected/, and manifest.yaml; changes require
 * review like any other authoritative-artifact change.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import canonicalizeModule from "canonicalize";
import {
  contentDigestOfCanonicalText,
  digestProjection,
  sha256HexOfUtf8,
} from "../../../reference/verifier/src/digest.js";
import { jcsCanonicalize } from "../../../reference/verifier/src/jcs.js";
import { StrictJsonError, parseStrictJson } from "../../../reference/verifier/src/strict-json.js";
import { repoRoot } from "../lib/repo.js";

const independentJcs: (value: unknown) => string | undefined =
  (canonicalizeModule as unknown as { default?: (value: unknown) => string | undefined }).default ??
  (canonicalizeModule as unknown as (value: unknown) => string | undefined);

interface RawVector {
  vector_id: string;
  kind: "canonical" | "projection" | "parse_error" | "digest_mismatch" | "strict_rejection";
  purpose: string;
  /** Exact input text, preserved byte-for-byte. */
  input: string;
  /** strict_rejection only: the StrictJsonError code the input must raise. */
  expected_strict_error?: string;
}

const VECTORS: RawVector[] = [
  {
    vector_id: "key-ordering",
    kind: "canonical",
    purpose: "Member names sort by UTF-16 code units regardless of input order.",
    input: '{"b":1,"a":2,"A":3,"nested":{"z":true,"y":null,"aa":"x"}}',
  },
  {
    vector_id: "unicode",
    kind: "canonical",
    purpose:
      "Non-ASCII characters stay literal; mandated control characters use short or \\u00xx escapes.",
    input:
      '{"text":"\\u20ac euro and \\u03a9 Unicode literal","control":"line\\nbreak\\ttab\\u0001end","quote":"a\\"b\\\\c"}',
  },
  {
    vector_id: "whitespace",
    kind: "canonical",
    purpose: "Insignificant whitespace in the input does not affect the canonical form.",
    input: '{\n  "a" : 1 ,\n  "b" : [ 1 ,   2 ]\n}\n',
  },
  {
    vector_id: "exponent-representation",
    kind: "canonical",
    purpose: "Numbers serialize in shortest ECMAScript round-trip form.",
    input: '{"values":[1E30,1e+2,1.0e-3,5e-324,1e21]}',
  },
  {
    vector_id: "decimal-representation",
    kind: "canonical",
    purpose: "Decimal notation normalizes to shortest round-trip form.",
    input: '{"values":[4.50,0.000001,10.0,333333333.33333329,0.0000001]}',
  },
  {
    vector_id: "zero",
    kind: "canonical",
    purpose: "All zero spellings canonicalize to 0.",
    input: '{"values":[0,0.0,0e0,0E-0]}',
  },
  {
    vector_id: "negative-zero",
    kind: "strict_rejection",
    purpose:
      "Negative zero input is REJECTED at the lexical stage (NRS-CANON-0015, Batch 5: Erratum 7920 SHOULD raised to MUST) - it is never silently normalized to 0. Reclassified from kind canonical in the pre-release canonicalization revision (ADR-0027).",
    input: '{"value":-0.0,"list":[-0]}',
    expected_strict_error: "NEGATIVE_ZERO_NUMBER",
  },
  {
    vector_id: "negative-zero-exponent",
    kind: "strict_rejection",
    purpose:
      "Exponent spellings of negative zero (-0e5, -0.00E+2) are rejected the same way (NRS-CANON-0015).",
    input: '{"a":-0e5,"b":-0.00E+2}',
    expected_strict_error: "NEGATIVE_ZERO_NUMBER",
  },
  {
    vector_id: "numeric-endpoints",
    kind: "canonical",
    purpose:
      "Binary64 endpoint values round-trip in shortest form: max double, min normal, min subnormal, and the 1e+/-308 neighborhood (Batch 5 checklist item 11).",
    input:
      '{"values":[1.7976931348623157e308,2.2250738585072014e-308,5e-324,1e308,1e-308,9007199254740991,-9007199254740991]}',
  },
  {
    vector_id: "nested-objects",
    kind: "canonical",
    purpose: "Nested objects canonicalize recursively with sorted members.",
    input: '{"outer":{"inner":{"b":[{"y":1,"x":2}],"a":{}},"empty":{}},"list":[{},{"k":"v"}]}',
  },
  {
    vector_id: "arrays",
    kind: "canonical",
    purpose: "Array element order is preserved; only objects sort.",
    input: '{"mixed":[3,1,2,"b","a",null,true,false,[2,1],{"b":1,"a":2}]}',
  },
  {
    vector_id: "integrity-exclusion",
    kind: "projection",
    purpose: "The digest projection excludes exactly the integrity member (NRS-CORE-0006).",
    input:
      '{"$schema":"urn:nomue:schema:record:0.1.0-draft.1","record_type":"nomue-record","integrity":{"digest_algorithm":"sha-256","content_digest":"sha256:0000000000000000000000000000000000000000000000000000000000000000"},"payload":{"value":1}}',
  },
  {
    vector_id: "invalid-nan-token",
    kind: "parse_error",
    purpose: "A raw NaN token is not JSON and is a parse error.",
    input: '{"value":NaN}',
  },
  {
    vector_id: "invalid-infinity-token",
    kind: "parse_error",
    purpose: "A raw Infinity token is not JSON and is a parse error.",
    input: '{"value":-Infinity}',
  },
  {
    vector_id: "bom-rejected",
    kind: "parse_error",
    purpose:
      "A UTF-8 BOM before the JSON text is not JSON and is a parse error (Batch 5 checklist item 12); nothing strips it silently.",
    input: '﻿{"a":1}',
  },
  {
    vector_id: "digest-mismatch",
    kind: "digest_mismatch",
    purpose:
      "A declared digest differing from the recomputed digest of the projection is detected.",
    input:
      '{"$schema":"urn:nomue:schema:record:0.1.0-draft.1","record_type":"nomue-record","integrity":{"digest_algorithm":"sha-256","content_digest":"sha256:1111111111111111111111111111111111111111111111111111111111111111"},"payload":{"value":2}}',
  },
];

function main(): void {
  const base = path.join(repoRoot, "canonicalization", "test-vectors");
  fs.mkdirSync(path.join(base, "inputs"), { recursive: true });
  fs.mkdirSync(path.join(base, "expected"), { recursive: true });

  const manifestEntries: string[] = [];

  for (const vector of VECTORS) {
    const ext =
      vector.kind === "parse_error" || vector.kind === "strict_rejection" ? "txt" : "json";
    const inputRel = `inputs/${vector.vector_id}.${ext}`;
    fs.writeFileSync(path.join(base, inputRel), vector.input, "utf8");
    const inputHash = sha256HexOfUtf8(vector.input);

    let expectedLines: string[] = [];
    if (vector.kind === "parse_error") {
      let parseFailed = false;
      try {
        JSON.parse(vector.input);
      } catch {
        parseFailed = true;
      }
      if (!parseFailed) throw new Error(`${vector.vector_id}: input unexpectedly parsed`);
      expectedLines = ["    expected_parse_error: true"];
    } else if (vector.kind === "strict_rejection") {
      let code: string | null = null;
      try {
        parseStrictJson(vector.input);
      } catch (err) {
        if (err instanceof StrictJsonError) code = err.code;
      }
      if (code !== vector.expected_strict_error) {
        throw new Error(
          `${vector.vector_id}: expected strict rejection ${vector.expected_strict_error ?? "?"}, got ${code ?? "acceptance"}`,
        );
      }
      expectedLines = [`    expected_strict_error: ${code}`];
    } else {
      const parsed = JSON.parse(vector.input) as Record<string, unknown>;
      const subject = vector.kind === "canonical" ? parsed : digestProjection(parsed);
      const ours = jcsCanonicalize(subject);
      const independent = independentJcs(subject);
      if (ours !== independent) {
        throw new Error(
          `${vector.vector_id}: reference JCS and independent canonicalize disagree:\n${ours}\n${independent}`,
        );
      }
      // Idempotency (Batch 5 checklist item 5): canonicalize of the
      // canonical output is byte-identical to the canonical output.
      if (jcsCanonicalize(JSON.parse(ours)) !== ours) {
        throw new Error(`${vector.vector_id}: canonical output is not idempotent`);
      }
      const expectedRel = `expected/${vector.vector_id}.canonical.txt`;
      fs.writeFileSync(path.join(base, expectedRel), ours, "utf8");
      // expected_digest is the record-content digest of the canonical text
      // (domain tag + SHA-256, NRS-CANON-0020) since the Batch 5 revision.
      const digest = contentDigestOfCanonicalText(ours);
      expectedLines = [
        `    expected_canonical: ${expectedRel}`,
        `    expected_digest: "${digest}"`,
      ];
      if (vector.kind === "digest_mismatch") {
        const declared = (parsed["integrity"] as { content_digest: string }).content_digest;
        if (declared === digest) {
          throw new Error(`${vector.vector_id}: declared digest accidentally matches`);
        }
        expectedLines.push(`    declared_digest: "${declared}"`, "    expected_mismatch: true");
      }
    }

    manifestEntries.push(
      [
        `  - vector_id: ${vector.vector_id}`,
        `    kind: ${vector.kind}`,
        `    purpose: >-`,
        `      ${vector.purpose}`,
        `    input: ${inputRel}`,
        `    input_sha256: "${inputHash}"`,
        ...expectedLines,
      ].join("\n"),
    );
  }

  const manifest = [
    "# Canonicalization and digest test vectors.",
    "# Authored via tooling/src/phase1/author-vectors.ts: every canonical",
    "# expectation is cross-checked against the independent `canonicalize`",
    "# npm package before being written, so expected values never come from",
    "# the reference canonicalizer alone. Executed by pnpm canonicalization:test.",
    "",
    "manifest: nrs-canonicalization-vectors",
    'manifest_version: "0.1.0"',
    'updated: "2026-08-10"',
    "",
    "vectors:",
    manifestEntries.join("\n\n"),
    "",
  ].join("\n");
  fs.writeFileSync(path.join(base, "manifest.yaml"), manifest, "utf8");
  console.log(`authored ${VECTORS.length} vectors`);
}

main();
