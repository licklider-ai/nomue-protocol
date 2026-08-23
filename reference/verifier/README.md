# Reference Verifier (Non-Normative)

Implements the normative verification behavior of
[../../spec/verification/](../../spec/verification/public-checks.md) for the
currently registered bundles it supports. Where this implementation and the
specification disagree, the specification, registries, schemas, and
conformance suite govern.

## CLI

```bash
pnpm nomue-record verify examples/minimal-itgc-record/record.json
```

| Command                      | Output (stdout)                              |
| ---------------------------- | -------------------------------------------- |
| `verify <record.json>`       | Verification report (JSON) or refusal object |
| `canonicalize <record.json>` | Canonical JCS form of the digest projection  |
| `digest <record.json>`       | Recomputed content digest (JSON)             |

Machine-readable JSON goes to stdout with no colors or decoration; the human
summary goes to stderr.

## Exit codes (`verify`)

| Code | Meaning                                                                                                               |
| ---- | --------------------------------------------------------------------------------------------------------------------- |
| 0    | The verifier ran to completion and conformance, integrity, profile preconditions, and recompute comparison all passed |
| 2    | Conformance, integrity, a profile precondition, or the recompute comparison failed                                    |
| 3    | Routing failure (bundle declaration missing/invalid) or unsupported bundle - fail closed, no interpretation           |
| 4    | Resource limit exceeded / safe refusal                                                                                |
| 5    | Verifier internal error                                                                                               |

**Exit codes never assert that the research as a whole is correct.** They
summarize scoped check results for scripting; the report is the actual
result, and scientific validity is always `not_asserted`.

## Routing and bundle dispatch

The pipeline order is: raw resource limits, strict UTF-8 decoding, JSON
parse, **strict JCS input eligibility** (duplicate object member names at
any depth and unpaired-surrogate strings are rejected on the raw text -
`NRS-DUPLICATE-JSON-MEMBER` / `NRS-INVALID-UNICODE-STRING`, no first-wins
or last-wins semantics, no Unicode normalization; NRS-CANON-0007/0008),
parsed resource limits, **bundle-independent routing-envelope validation**
(`urn:nomue:schema:routing-envelope:0.2.0-draft.1`: object root, string
`interpretation_bundle_id` - nothing else is inspected), exact registry
lookup, then the selected bundle's own schema validation, semantic
conformance, and checks. No bundle-specific Record schema runs before a
bundle is selected, and **no default bundle exists**: a missing or
non-string declaration produces a routing refusal; registry order has no
semantic meaning (NRS-VERSION-0007, NRS-VERSION-0008).

The verifier supports exactly three registered bundles and dispatches by
exact identifier:

- `urn:nomue:bundle:itgc-minimal:0.1.0-draft.1` — Phase 1 pipeline, behavior
  preserved and pinned.
- `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1` — conformance, integrity,
  profile admissibility, Welch computability, and Welch recomputation with
  effect estimate and 95% CI.
- `urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1` — reuses the 0.2 structural
  schemas while pinning the hardened 0.2.1 numerical computability and
  recomputation checks.

Any other declared bundle - including nearby versions - is refused; nothing
is inferred from version proximity
([../../spec/versioning/multi-bundle-dispatch.md](../../spec/versioning/multi-bundle-dispatch.md)).

## Refusal output

When no report can honestly be produced, the CLI emits a **versioned refusal
artifact** (`urn:nomue:schema:verifier-refusal:0.2.0-draft.3`, surface
NRS-PCS-0012; supersedes draft.2 by adding the processing-timeout and
memory-limit categories of ADR-0022, while draft.2 superseded draft.1 per
ADR-0017) instead of a report; a refusal is never a verification result and
never a partial success. Kinds and exit codes: `parse_error` (2),
`canonicalization_failure` (2), `routing_error` (3, bundle declaration
missing or not a string), `unsupported_bundle` (3), `resource_limit` (4,
with a `limit_category`), `internal_error` (5). Exit 2 therefore covers both
"checks ran and failed" (a report exists) and the two input refusals (no
report); scripts that need the distinction inspect the output object's
`output_type`, not the exit code.

## What the verifier never does

- fetch or dereference URIs (identifiers stay identifiers),
- execute Record-supplied code, containers, scripts, plugins, or commands,
- load remote schemas dynamically,
- write to any path named by the Record,
- change verification meaning based on environment variables,
- emit an overall VERIFIED-style status.

Resource limits and the trust boundary are documented in
[../../security/phase-1-verifier-security.md](../../security/phase-1-verifier-security.md).

## Scope identifiers (implementation note)

For analysis- and result-scoped check results, the scope identifier is the
revision URI with the local identifier as a fragment (for example
`urn:uuid:...#analysis-1`); a future phase may standardize this composition.

## Placeholder identifiers (implementation note)

When a Record fails conformance so badly that it declares no usable record
or revision identifiers, the report's record reference uses the sentinel
values `urn:nomue:unidentified:record` and `urn:nomue:unidentified:revision`.
These sentinels are implementation-defined in Phase 1 and never collide
with real identifiers; a future phase may standardize or replace them.
There is no bundle sentinel: routing enforces, as a routing-level structural
invariant (not a claim about Record correctness), that a string bundle
identifier is present before any pipeline runs; a pipeline invoked without
one throws instead of fabricating a value (ADR-0017).

## Bundle-independent subcommands (implementation note)

`canonicalize` and `digest` perform no bundle routing: all currently
registered bundles pin the same canonicalization
(`urn:nomue:canonicalization:jcs:0.2.0-draft.1`) and digest scope, so the
projection is bundle-independent today. If a future bundle ever pins a
different canonicalization, these subcommands must route first; this
assumption is recorded here deliberately. All three subcommands share the
SAME strict input path (`parseStrictJson`): strict UTF-8 decoding, JSON
syntax, duplicate-member rejection, and Unicode scalar validity are
enforced identically, so no canonical form or digest can ever be produced
from input that `verify` would reject as ambiguous (ADR-0018).
