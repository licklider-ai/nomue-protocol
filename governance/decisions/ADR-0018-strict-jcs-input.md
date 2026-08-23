# ADR-0018: Strict JCS Input and Rejection of Duplicate JSON Members

**Status: Accepted** (Phase 2A repair, 2026-08-10). Complements
[ADR-0006](ADR-0006-jcs-sha256-digest-projection.md) (which adopted RFC
8785 JCS + SHA-256 without constraining raw input) and resolves the
duplicate-member residual recorded by
[ADR-0017](ADR-0017-bundle-independent-routing.md).

## Context: what was left open, and why it was a BLOCKER

After the ADR-0017 routing repair, duplicate JSON object member names were
a documented residual: the reference verifier followed ECMAScript
`JSON.parse` semantics (last member wins), the spec noted the ambiguity as
informative, and a future normative refusal was flagged. That was
misclassified as MINOR. Because nomue adopts RFC 8785 JCS as its
canonicalization authority, duplicate member names make the SAME raw bytes
mean different things across correct JSON implementations:

- **Routing**: a first-wins parser and a last-wins parser dispatch the
  same input to DIFFERENT bundles when `interpretation_bundle_id` is
  duplicated.
- **Results**: a duplicated `result.p_value` (or any result member) reads
  differently per implementation.
- **Digest**: `content_digest` is computed over whichever value survived
  the parser, so one byte sequence carries two digest meanings; a
  duplicated `integrity.content_digest` even makes the comparison target
  ambiguous.
- **Schema validation**: information is destroyed BEFORE validation - the
  collapsed object validates cleanly, so no downstream check can ever see
  the ambiguity.
- **JCS**: by the time input reaches the canonicalizer it is a parsed
  value; RFC 8785 sorts and serializes whatever members exist and cannot
  detect what was lost. Detection after `JSON.parse` is impossible in
  principle, not merely inconvenient.

This is a shared interoperability defect across routing,
canonicalization, digest, and verification - a BLOCKER, resolved before
Phase 2A final close.

## Decision

1. **Unique member names** (new requirement `NRS-CANON-0007`, CORE):
   input containing a duplicate object member name at ANY depth (nested
   objects and objects inside arrays included), compared AFTER JSON string
   escape decoding, is rejected - even when the duplicated values are
   identical. **No first-wins and no last-wins semantics exist anywhere.**
   The literal spelling and the escaped-equivalent spelling (for example
   `interpretation_bundle_id` written with the `\u0069` escape) are the same name.
2. **Unicode scalar validity** (new requirement `NRS-CANON-0008`, CORE):
   JSON strings (member names and values) whose escape-decoded sequence
   contains an unpaired surrogate are rejected. Correctly paired
   surrogates are accepted unchanged. **No Unicode normalization is
   performed**: NFC and NFD sequences are distinct code-point sequences
   and remain so through canonicalization - silently normalizing would
   change digests and forge equality between distinct inputs.
3. **Detection point**: eligibility is enforced on the RAW JSON text by a
   duplicate-aware scanner (`reference/verifier/src/strict-json.ts`),
   after `JSON.parse` establishes syntax and before parsed resource
   limits, routing, bundle schemas, canonicalization, or digest
   computation. The scanner is not a second JSON parser: syntax authority
   stays with `JSON.parse`; the scanner only tokenizes strings and tracks
   the container stack (fully iterative, regex-free), with an independent
   differential classifier (`tooling/src/phase1/strict-json-differential.ts`,
   different tokenization and detection strategy) cross-checking every
   fixture so the scanner is never its own only witness. No new
   dependency, no network, no dynamic code execution.
4. **Refusal semantics**: duplicate member -> `parse_error` /
   `NRS-DUPLICATE-JSON-MEMBER`, exit 2; invalid Unicode string ->
   `parse_error` / `NRS-INVALID-UNICODE-STRING`, exit 2 (fixed
   normatively to `parse_error`: the input never becomes an eligible
   value, which is a parse-level failure, not a canonicalization failure
   of an eligible value). In both cases: no bundle selected, no
   verification report, no conformance judgment, no canonical form, no
   digest, no partial success. The refusal schema
   `urn:nomue:schema:verifier-refusal:0.2.0-draft.2` already expresses
   both codes (reason-code pattern), so **no schema version change and no
   output-protocol version change occur**; draft.1 and draft.2 are
   untouched.
5. **Fixed pre-routing priority** (normative in
   [../../canonicalization/record-canonicalization.md](../../canonicalization/record-canonicalization.md)):
   raw resource refusal; malformed JSON syntax; duplicate member; invalid
   Unicode scalar sequence; parsed resource limits; routing envelope;
   unsupported bundle.
6. **One strict path for every entry point**: `verify`, `canonicalize`,
   and `digest` all parse through `parseStrictJson`, and the CLI decodes
   raw bytes as strict UTF-8 (invalid byte sequences are refused, never
   replaced with U+FFFD). A static audit (`strict-json-input-audit` in
   `pnpm validate`) rejects the plain spellings of raw `JSON.parse` on
   verifier input outside the sanctioned module and fails if the strict
   parser stops being referenced by the CLI or the verify pipeline. Like
   the routing audit, it is a lint over known patterns, not a soundness
   proof; the behavioral proof that the subcommands are never laxer than
   verify is the strict_json fixture suite exercised through all three
   entry points.

## What is unchanged

Valid Phase 1 and Phase 2A Records contain no duplicate members and no
unpaired surrogates, so their semantics, digests, Welch results, semantic
projections, and all 13 JCS vectors are byte-identical. This is
**verifier-level pre-release hardening** in the ADR-0015/ADR-0017 class:
the only pin refresh is the B-002..B-006 report-fixture inputs, whose
bytes embed the verifier version string (advanced to `0.2.0-draft.3`).

## Enforcement added with this decision

- Fixtures JSON-DUP-001..011 and JSON-UNI-001..005 (family `strict_json`)
  with hand-authored expectations in
  [../../conformance/expectations/strict-json-expectations.yaml](../../conformance/expectations/strict-json-expectations.yaml),
  including acceptance fixtures proving no false positives
  (member-name-like text and escaped punctuation inside string values,
  paired surrogates, NFC/NFD kept distinct).
- Duplicate-bundle-declaration inputs joined the registry-order invariance
  probe set (ROUTE-007/008): an ambiguous declaration refuses identically
  under any registry order.
- Unit tests pin the decision table, the priority order, and the
  differential agreement across the full fixture corpus.

## Rejected alternatives

- **Documenting last-wins as the reference semantics** (the ADR-0017
  residual): rejected; documentation cannot make one byte sequence mean
  one thing across implementations, and the routing/digest consequences
  contradict CORE requirements.
- **First-wins**: rejected for the same reason - any pick-a-winner rule
  fabricates a meaning for ambiguous input.
- **Detecting duplicates after `JSON.parse`**: impossible; the parser has
  already collapsed them.
- **Regex-based detection over the raw text**: rejected; `:` and `{}`
  inside string values and escaped quotes defeat pattern matching. The
  scanner is grammar-aware over strings and containers.
- **Silently replacing unpaired surrogates with U+FFFD** (WTF-8-style
  tolerance) or **normalizing to NFC**: rejected; both silently change
  content and therefore digests, and normalization forges equality
  between distinct inputs.
- **A new refusal schema version**: unnecessary; the existing draft.2
  schema expresses the new reason codes without structural change.
