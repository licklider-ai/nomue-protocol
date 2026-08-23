# Verifier Refusal

**Status: Normative.** This document binds the verifier refusal artifact
(`NRS-CORE`, `NRS-VERIFY`, `NRS-SEC` namespaces, continued). The current
structural representation is
[../../schemas/reports/verifier-refusal-0.2-draft-3.schema.json](../../schemas/reports/verifier-refusal-0.2-draft-3.schema.json)
(`urn:nomue:schema:verifier-refusal:0.2.0-draft.3`). It supersedes
0.2.0-draft.2 additively by extending `limit_category` with
`processing_timeout` and `memory_limit` for the in-process bounds of
NRS-SEC-0006 (ADR-0022). Draft.2 had previously superseded draft.1 by adding
the `routing_error` kind (ADR-0017). Both earlier schema files are retained
unmodified as historical artifacts, and the full supersession chain is recorded
machine-readably in the interpretation-bundle registry's
`verifier_output_contract`.

## Separation

<a id="NRS-CORE-0011"></a>
**NRS-CORE-0011 - Verifier refusal separation** (stability: STABLE-INTENT, status: active)
When a normal verification report cannot be produced, a verifier MUST emit
or expose a distinct refusal artifact rather than fabricating a partial
successful report.

<a id="NRS-VERIFY-0018"></a>
**NRS-VERIFY-0018 - Refusal output validity** (stability: STABLE-INTENT, status: active)
A machine-readable verifier refusal MUST conform to its declared refusal
Schema.

## Safety posture

<a id="NRS-SEC-0004"></a>
**NRS-SEC-0004 - No partial success on safety refusal** (stability: CORE, status: active)
A safety or resource-limit refusal MUST NOT be represented as a successful
partial verification.

<a id="NRS-SEC-0005"></a>
**NRS-SEC-0005 - Resource-limit refusal evidence** (stability: EXPERIMENTAL, status: active)
A resource-limit refusal MUST identify the applicable registered reason code
and the enforced limit category without exposing untrusted content as
executable output.

## Informative: refusal kinds and exit codes

| refusal_kind               | Meaning                                                           | Reference CLI exit code |
| -------------------------- | ----------------------------------------------------------------- | ----------------------- |
| `parse_error`              | Input is not parseable JSON (malformed or truncated)              | 2                       |
| `canonicalization_failure` | Valid JSON outside the numeric model; no digest projection exists | 2                       |
| `routing_error`            | Bundle declaration missing or not a string; no bundle is selected | 3                       |
| `unsupported_bundle`       | Declared bundle is not supported; nothing is interpreted          | 3                       |
| `resource_limit`           | A declared input limit was exceeded; safe refusal                 | 4                       |
| `internal_error`           | The verifier failed unexpectedly; output is not a result          | 5                       |

A refusal carries no overall status, no verification outcome, and no
scientific-validity evaluation. Identifiers that could not be read from the
input - or that cannot be carried faithfully within the schema's
constraints, such as a hostile malformed bundle identifier - are omitted,
never guessed, fabricated, or truncated: a refusal has no record reference
because no Record was interpreted. For resource-limit refusals the artifact
names the limit category (`file_size`, `nesting_depth`, `observation_count`,
`string_length`, `parser_exhaustion`, `processing_timeout`, or `memory_limit`)
alongside the registered reason codes.

A `routing_error` refusal reports a bundle declaration that is missing
(`NRS-BUNDLE-ID-MISSING`) or not a string (`NRS-BUNDLE-ID-INVALID`): no
bundle is selected, no default bundle exists, no bundle-specific Record
schema runs, and no verification report, conformance judgment, or Record
identifier is produced or inferred (NRS-VERSION-0007, NRS-VERSION-0008).

A `parse_error` refusal also covers JCS-ineligible input: a duplicate
object member name (`NRS-DUPLICATE-JSON-MEMBER`) or a JSON string that is
not a valid Unicode scalar-value sequence (`NRS-INVALID-UNICODE-STRING`),
both rejected before routing, canonicalization, or digest computation. The
fixed pre-routing rejection priority is normative in
[../../canonicalization/record-canonicalization.md](../../canonicalization/record-canonicalization.md).

## Informative: bundle independence

The refusal is a **verifier-level output contract, independent of any
interpretation bundle**: routing, parse failures, and pre-dispatch resource
refusals occur before any bundle can be identified, so they cannot depend
on one. This selection rule is machine-readable as
`verifier_output_contract` in
[../../registries/interpretation-bundles.yaml](../../registries/interpretation-bundles.yaml):
verification reports are selected by the interpreted bundle; the routing
envelope and refusals by the verifier output protocol. The refusal schema's
version therefore tracks the verifier output protocol, not a bundle, and
the 0.1 bundle acquires no dependency on any 0.2 Record schema.
