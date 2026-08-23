# ADR-0015: Versioned Verifier Refusal Artifact

**Status: Accepted** (Phase 2A, 2026-08-10)

## Context

Phase 1's refusal output was an implementation-defined `{"refusal": {...}}`
shape with no schema and no surface registration - flagged in the Phase 1
independent review as an open finding.

## Decision

Refusals become a versioned artifact
(`urn:nomue:schema:verifier-refusal:0.2.0-draft.1`, surface NRS-PCS-0012)
with kinds `parse_error`, `unsupported_bundle`, `resource_limit`,
`canonicalization_failure`, `internal_error` (NRS-CORE-0011); every emitted
refusal validates against the schema (NRS-VERIFY-0018); refusals carry no
outcome and are never partial successes (NRS-SEC-0004); resource refusals
name the limit category (NRS-SEC-0005). Nothing unreadable is fabricated: a
refusal has no record reference.

## Documented expectation corrections (NRS-VERSION-0006)

Introducing the artifact corrected two Phase 1 behaviors, recorded here
with old and new values rather than changed silently:

1. **Fixture B-007 expected refusal reason codes.**
   Old: `[NRS-RESOURCE-LIMIT-EXCEEDED]`.
   New: `[NRS-RESOURCE-LIMIT-EXCEEDED, NRS-NESTING-LIMIT-EXCEEDED]`.
   Rationale: refusals now identify the specific limit class
   (NRS-SEC-0005); the general code is retained.
2. **Refusal kind names and parse-error code.** Old kinds `not_json` /
   `not_canonicalizable` became `parse_error` /
   `canonicalization_failure`, and non-JSON input now carries
   `NRS-PARSE-FAILED` instead of overloading `NRS-SCHEMA-INVALID`.
   Rationale: a parse failure is a property of the input bytes, not of any
   schema; no Phase 1 manifest pin referenced the old kind names or the old
   parse code. Record-fixture pins (digests, projection hashes, exit codes)
   are unchanged.
3. **Report-schema fixture input pins B-002..B-006.** The verifier version
   string advanced to `0.2.0-draft.1`; it is outside every semantic
   projection and every comparison, but the five report-schema fixture
   INPUT files embed it, so their `input_sha256` pins were refreshed.
   Old pins: those of the files carrying `0.1.0-draft.1`; new pins: those
   of the same files carrying `0.2.0-draft.1`. Every expected outcome is
   unchanged.

## Pinned versus corrected, stated precisely

Phase 1 Record interpretation semantics and successful verification
projections remain pinned. Verifier-level refusal behavior received
explicitly documented pre-release corrections under this ADR. Concretely:

- **Unchanged (pinned):** the Phase 1 Record schema; the meaning of the
  `itgc-minimal:0.1.0-draft.1` interpretation bundle; every valid Record's
  content digest; every valid Record's verification semantic projection;
  every Welch computation result.
- **Explicitly corrected (pre-release, documented above):** the verifier
  refusal kinds; the parse-failure reason code; the specificity of
  resource-limit refusals (per-limit codes and categories); the B-002..B-006
  input pins for the version-string advance.

## Rejected alternatives

- **Report-shaped refusals with placeholder record references**: rejected;
  fabricating identifiers violates the no-fabrication rule.
- **Plain-text refusals**: rejected; machine consumers need a schema.
