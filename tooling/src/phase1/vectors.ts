/**
 * Canonicalization/digest vector runner: replays every vector in
 * canonicalization/test-vectors/manifest.yaml against the reference JCS
 * implementation AND the independent `canonicalize` npm package.
 */

import canonicalizeModule from "canonicalize";
import {
  contentDigestOfCanonicalText,
  digestProjection,
  sha256HexOfUtf8,
} from "../../../reference/verifier/src/digest.js";
import { jcsCanonicalize } from "../../../reference/verifier/src/jcs.js";
import { StrictJsonError, parseStrictJson } from "../../../reference/verifier/src/strict-json.js";
import { loadYaml, readText, type Issue } from "../lib/repo.js";

const independentJcs: (value: unknown) => string | undefined =
  (canonicalizeModule as unknown as { default?: (value: unknown) => string | undefined }).default ??
  (canonicalizeModule as unknown as (value: unknown) => string | undefined);

interface VectorEntry {
  vector_id: string;
  kind: "canonical" | "projection" | "parse_error" | "digest_mismatch" | "strict_rejection";
  input: string;
  input_sha256: string;
  expected_canonical?: string;
  expected_digest?: string;
  declared_digest?: string;
  expected_mismatch?: boolean;
  expected_parse_error?: boolean;
  expected_strict_error?: string;
}

interface VectorManifest {
  manifest: string;
  vectors: VectorEntry[];
}

export function runCanonicalizationVectors(): Issue[] {
  const check = "canonicalization-vectors";
  const issues: Issue[] = [];
  const manifest = loadYaml<VectorManifest>("canonicalization/test-vectors/manifest.yaml");

  for (const vector of manifest.vectors) {
    const inputRel = `canonicalization/test-vectors/${vector.input}`;
    let input: string;
    try {
      input = readText(inputRel);
    } catch (err) {
      issues.push({ check, file: inputRel, message: `missing input: ${String(err)}` });
      continue;
    }
    if (sha256HexOfUtf8(input) !== vector.input_sha256) {
      issues.push({
        check,
        file: inputRel,
        message: `${vector.vector_id}: input hash does not match the pinned input_sha256`,
      });
      continue;
    }

    if (vector.kind === "parse_error") {
      let failed = false;
      try {
        JSON.parse(input);
      } catch {
        failed = true;
      }
      if (!failed) {
        issues.push({
          check,
          file: inputRel,
          message: `${vector.vector_id}: expected a JSON parse error but the input parsed`,
        });
      }
      continue;
    }

    if (vector.kind === "strict_rejection") {
      let code: string | null = null;
      try {
        parseStrictJson(input);
      } catch (err) {
        if (err instanceof StrictJsonError) code = err.code;
      }
      if (code !== vector.expected_strict_error) {
        issues.push({
          check,
          file: inputRel,
          message: `${vector.vector_id}: expected strict rejection ${vector.expected_strict_error ?? "?"}, got ${code ?? "acceptance"}`,
        });
      }
      continue;
    }

    const parsed = JSON.parse(input) as Record<string, unknown>;
    const subject = vector.kind === "canonical" ? parsed : digestProjection(parsed);
    const ours = jcsCanonicalize(subject);
    const independent = independentJcs(subject);
    if (ours !== independent) {
      issues.push({
        check,
        file: inputRel,
        message: `${vector.vector_id}: reference JCS and independent implementation disagree`,
      });
    }
    const expectedRel = `canonicalization/test-vectors/${vector.expected_canonical ?? ""}`;
    const expectedText = readText(expectedRel);
    if (ours !== expectedText) {
      issues.push({
        check,
        file: expectedRel,
        message: `${vector.vector_id}: canonical form differs from the pinned expectation`,
      });
    }
    // Idempotency (Batch 5 checklist item 5): re-canonicalizing the
    // canonical output must reproduce it byte-identically.
    if (jcsCanonicalize(JSON.parse(ours)) !== ours) {
      issues.push({
        check,
        file: inputRel,
        message: `${vector.vector_id}: canonical output is not idempotent under re-canonicalization`,
      });
    }
    // expected_digest is the record-content digest (domain tag + SHA-256,
    // NRS-CANON-0020) since the Batch 5 canonicalization revision.
    const digest = contentDigestOfCanonicalText(ours);
    if (digest !== vector.expected_digest) {
      issues.push({
        check,
        file: inputRel,
        message: `${vector.vector_id}: digest ${digest} differs from pinned ${vector.expected_digest ?? "(none)"}`,
      });
    }
    if (vector.kind === "digest_mismatch") {
      if (vector.declared_digest === digest || vector.expected_mismatch !== true) {
        issues.push({
          check,
          file: inputRel,
          message: `${vector.vector_id}: declared digest unexpectedly matches the recomputed digest`,
        });
      }
    }
  }
  return issues;
}
