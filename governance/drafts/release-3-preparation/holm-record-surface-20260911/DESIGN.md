# Candidate representation and boundary

## Representation

The experimental body contains `kind`, local `record_id`, local `revision_id`,
`declaration`, `inputs` and `result`. All schema objects are closed. Input p-values
and rounded displays remain 16 lowercase hexadecimal binary64 words. An exact
adjusted value is the canonical lowercase hexadecimal integer numerator on the
existing 2^-1074 lattice. The runtime checks the numerator is at most 2^1074.
No conversion of that integer through JavaScript Number occurs.

A result names one analysis, family and result slot and contains ordered rows of
`member_id`, `adjusted_hex` and `display_hex`. All rows are compared. This is the
existing supplied-p Holm arithmetic domain: all-pairs families of 3 through 16
groups, 3 through 120 members. No raw p-value generation, alpha selection or
familywise-error-control assertion is introduced.

The new declaration retains every old D0 field, including unrelated analyses,
families and slot ordering, except for two explicit changes:

| Old D0 exercise                                          | Candidate declaration                          | Internal reverse adapter           |
| -------------------------------------------------------- | ---------------------------------------------- | ---------------------------------- |
| `artifact_kind: unissued-d0-declaration-exercise`        | `unissued-r3-declaration-body-v1`              | Restore old constant               |
| Every slot has `payload_status: method_payload_deferred` | Field absent; numeric result stored separately | Restore old constant on every slot |
| Other fields and array orders                            | Retained exactly                               | Retained exactly                   |

These transformations are inverse on admitted declarations. This is a new
experimental shape, not permission to attach numeric fields to the old closed
schema or reinterpret its deferred status. The existing bridge sees its original
shape only internally. Its numerical implementation is reused without edits.
The test checks inverse equality and identical prepared bridge input.

## Binding and storage

`evaluate(expectedText, recordBytes)` accepts an external expected context and a
Buffer snapshot of the stored record bytes. Expected context is supplied by the
caller independently; extracting it from an untrusted submitted record defeats
this binding. The example context is illustrative, not an authenticated source.

Both texts pass the existing strict JSON parser before schema interpretation.
The stored bytes additionally equal the UTF-8 JCS serialization exactly: pretty
printing, trailing newlines, BOMs, duplicate names, malformed UTF-8 and unpaired
surrogates are refused. Object property order in external JSON is immaterial;
array order and the complete declaration remain bound. The full record context
matches the separately supplied context, its input revision matches the local
revision, and selected result ownership matches the bound input. The reused bridge
then performs D0 relations, domain checks and numeric comparison.

The optional injected runner and exported adapter helpers are trusted test harness
facilities, not Record fields or a supported public API. No submitted code is run
and no input URI is dereferenced. Runtime dependency hashes detect local drift;
they do not authenticate a hostile host or already loaded module. Trusted schema
compilation and module startup occur before `evaluate`; an outer caller handles
startup failure rather than expecting a report from an unavailable module.

## Scoped report

| Outcome            | Meaning within this experiment                                    |
| ------------------ | ----------------------------------------------------------------- |
| `consistent`       | Bound supplied-p arithmetic agrees in every exact and display row |
| `mismatch`         | Expected context or ordered submitted numeric evidence disagrees  |
| `input_refused`    | Admission, domain or declaration relation is unsupported/invalid  |
| `execution_failed` | Worker output, worker execution or dependency loading fails       |

Every outcome retains explicit non-claims for declaration truth, scientific
validity, familywise error control and source authenticity; p generation is
`not_run`. A success has an explicit local scope. Early refusal or context mismatch
can have null scope. A populated scope on failure identifies the attempted check,
not a verified result. No overall Record status is defined.

This coarse report deliberately does not yet retain the bridge's complete
relation-stage diagnostic codes. The final mapping to registered public reasons,
stages and execution outcomes remains open; this report is not their replacement.

## Resource admission

The outer exercise admits at most 1.5 MiB of expected UTF-8 text and 2 MiB of stored
bytes, raw nesting depth 34, 28,688 parsed value nodes, 1,024 entries per container,
and 4,096 UTF-16 code units per string/key. These are provisional independent
refusal bounds, not a proof of feasible maximum dimensions or peak memory.
Parsing allocates within the byte/depth preflight before the node traversal.

The reconstructed legacy texts are also subject to every original bridge cap.
Admission is the conjunction of both layers, so a schema-valid body can still be
refused; not all combinations of maximum counts are supported. Extra copies and
canonical strings consume memory. There is no whole-call RSS upper-bound claim,
portable resource ceiling, or resource-policy adoption in this packet.

## Full Record coupling remains separate

This is a payload/body exercise, not a complete Record envelope. Its short ASCII
record and revision labels are local synthetic identifiers, not the public URI
identifier grammar. Existing Record 0.2 envelope fields include `$schema`,
`record_type`, `record_id`, `revision_id`, `created_at`,
`interpretation_bundle_id`, `profile_id`, `payload` and `integrity`.

A later coupled candidate needs proper identity and revision semantics, integrity
coverage, exact profile/bundle dispatch, a versioned schema and registered check
and requirement ownership. No permanent identifier or version is allocated here.
Source labels in supplied inputs are declarations, not authenticity evidence.
