# Phase 2A Resource Refusal Note

**Status: Informative.** Complements
[phase-1-verifier-security.md](phase-1-verifier-security.md); the limits and
trust boundary there continue to apply. This note does not itself close gate
R1-05; current gate state is recorded in the Release 1 release-control artifacts.

## What Phase 2A hardens

Phase 1 left refusals as an implementation-defined diagnostic shape and
covered only the nesting-depth limit with a pinned fixture. Phase 2A:

- gives refusals a versioned schema
  ([../schemas/reports/verifier-refusal-0.2.schema.json](../schemas/reports/verifier-refusal-0.2.schema.json))
  and a registered public surface (NRS-PCS-0012);
- pins a fixture for every limit class: file size (A2-R-001), nesting depth
  (A2-R-002), observation count (A2-R-003), string length (A2-R-004), plus
  malformed (A2-R-005) and truncated (A2-R-006) JSON;
- adds per-limit reason codes (`NRS-FILE-SIZE-LIMIT-EXCEEDED`,
  `NRS-NESTING-LIMIT-EXCEEDED`, `NRS-OBSERVATION-LIMIT-EXCEEDED`,
  `NRS-STRING-LIMIT-EXCEEDED`) and `NRS-PARSE-FAILED`, alongside the general
  `NRS-RESOURCE-LIMIT-EXCEEDED`;
- names the enforced limit category in the refusal artifact
  (NRS-SEC-0005) without echoing untrusted content as executable output.

## Refusal behavior summary

Every refusal is a safe stop: no code execution, no external access, no
partial verification presented as success (NRS-SEC-0004), no fabricated
record reference, and exit codes as documented in
[../spec/verification/verifier-refusal.md](../spec/verification/verifier-refusal.md).
The fixed pre-routing rejection priority (raw resource, malformed syntax,
duplicate member, invalid Unicode, parsed limits, routing, unsupported
bundle) is normative in
[../canonicalization/record-canonicalization.md](../canonicalization/record-canonicalization.md);
duplicate members and unpaired surrogates are rejected before any bundle
is selected and before any canonical form or digest exists (ADR-0018).

## Historical gaps at the time of this Phase 2A note

At the time this note was authored, fuzzing/adversarial coverage, deeper
algorithmic-complexity analysis, process-level sandboxing, and a
vulnerability-reporting policy were still incomplete. This is historical
context, not live project status; [threat-model.md](threat-model.md) records
the current security evidence and residual-risk boundary for the candidate.
