# Phase 1 Verifier Security Note

**Status: Informative.** This is the minimal Phase 1 security note,
superseded in scope (but not in detail) by
[threat-model.md](threat-model.md), the published threat model. This note does not itself close gate R1-05; current gate state is recorded in
the Release 1 gate registry and gate index. Nothing here or in the threat model
claims that the verifier is "securely complete".

## Trust boundary

The verifier treats the entire Record as untrusted input. It trusts its own
source tree: the schemas, registries, and code of this repository as checked
out. It trusts nothing supplied by the Record beyond its literal bytes.

## Guarantees enforced by construction and audit

- **No code execution**: no Record-supplied code, containers, scripts,
  plugins, or commands are executed (NRS-SEC-0002; enforced by the
  execution-surface audit).
- **No external dereference**: no URI in a Record is fetched; there is no
  network code path (NRS-SEC-0001, NRS-CORE-0004; enforced by the
  URI-dereference audit).
- **No Record-directed writes**: reports go to stdout; the verifier writes to
  no path named by the Record.

## Resource limits (NRS-SEC-0003, NRS-SEC-0006)

| Limit                   | Value                          | Enforcement                                                              |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| Record file size        | 5 MiB                          | In-process, before parsing (NRS-SEC-0003, EXPERIMENTAL)                  |
| JSON nesting depth      | 64                             | In-process, iterative parsed-value walk (NRS-SEC-0003)                   |
| Observations            | 10,000                         | In-process (NRS-SEC-0003)                                                |
| String length per field | 16,384 UTF-16 code units       | In-process (NRS-SEC-0003)                                                |
| Groups                  | exactly 2 (profile constraint) | Schema/semantic conformance, not a resource limit                        |
| Processing time         | 5,000 ms                       | In-process, checked at pipeline checkpoints (NRS-SEC-0006, EXPERIMENTAL) |
| Peak heap usage         | 512 MiB                        | In-process, checked at the same checkpoints (NRS-SEC-0006)               |

Exceeding a limit produces a safe refusal with reason code
`NRS-RESOURCE-LIMIT-EXCEEDED` and exit code 4; a partial verification is
never presented as success. The processing-time and heap checks are
checkpoint-based, not preemptive mid-computation (Node.js has no synchronous
preemption) - see [threat-model.md](threat-model.md) and
[ADR-0022](../governance/decisions/ADR-0022-in-process-time-memory-bounds.md)
for the exact checkpoints, the value rationale, and why this is
defense-in-depth against unexpectedly expensive code paths rather than the
primary defense against oversized input (that role stays with the
size/depth/observation/string-length limits above).

Informative note: resource limits are not numerical accuracy guarantees
(NRS-CORE-0012 in [../spec/verification/public-checks.md](../spec/verification/public-checks.md)).
The observation limit of 10,000 is a safe refusal ceiling only.

## Failure behavior

- Malformed JSON: refusal of kind `parse_error` with `NRS-PARSE-FAILED`
  (exit 2); parser exhaustion (deep nesting) is treated as a resource
  refusal (exit 4). Refusals are versioned artifacts since Phase 2A (see
  [phase-2a-resource-refusal.md](phase-2a-resource-refusal.md) and
  ADR-0015).
- JCS-ineligible input: a duplicate object member name at any depth
  (`NRS-DUPLICATE-JSON-MEMBER`) or a string with an unpaired surrogate
  (`NRS-INVALID-UNICODE-STRING`) is a `parse_error` refusal (exit 2)
  raised on the raw text BEFORE routing, canonicalization, or digest
  computation - no first-wins/last-wins semantics, no Unicode
  normalization or replacement, and the same strict path guards the
  canonicalize and digest subcommands (ADR-0018). Raw input that is not
  valid UTF-8 is likewise refused, never decoded lossily.
- Missing or non-string bundle declaration: routing refusal of kind
  `routing_error` with `NRS-BUNDLE-ID-MISSING` / `NRS-BUNDLE-ID-INVALID`
  (exit 3); no bundle is selected, no default bundle exists, and no
  bundle-specific schema runs (ADR-0017).
- Unsupported bundle: fail closed with `NRS-UNSUPPORTED-BUNDLE` (exit 3);
  no guessed compatibility.
- Malformed or mismatched digest: reported in the integrity check scope;
  canonicalization failure is closed (`NRS-CANONICALIZATION-FAILED`), with no
  inferred or partial digest.
- Internal errors: exit 5 with `NRS-INTERNAL-VERIFIER-ERROR`; partial output
  is not a verification result.

## Known exclusions (open work for R1-05)

- A randomized fuzzing corpus now exists alongside the curated set of
  specific hostile-input categories - see [threat-model.md](threat-model.md)
  for both.
- No side-channel analysis. Algorithmic-complexity exposure beyond the
  declared size/depth/observation/string-length limits is now bounded
  in-process by the processing-time and heap checks above (NRS-SEC-0006),
  but this is a coarse checkpoint-based bound, not a proof that no
  pathological code path exists within those limits.
- No sandboxing of the verifier process itself.
- A vulnerability-reporting process is described in
  [threat-model.md](threat-model.md); operational contact routing is published
  separately so it can change without rewriting frozen Protocol content.
