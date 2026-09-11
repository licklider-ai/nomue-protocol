# Candidate decisions and scope

## Full stored Record

The envelope has the existing nine field names: `$schema`, `record_type`,
`record_id`, `revision_id`, `created_at`, `interpretation_bundle_id`, `profile_id`,
`payload`, and `integrity`. Instance IDs use the existing URI-shaped schema
constraints and are compared as exact strings. No prefix is added to a short ID,
no URI is dereferenced, and no Unicode normalization is performed.

This is a new experimental schema, not an extension accepted under the closed
ITGC Record version. Its profile, bundle, schema and check identity strings live
under example.invalid and have no Protocol allocation or public meaning.
Allocation under ID-POLICY.md remains part of the future coupled change.

Payload contains the complete reviewed declaration, supplied inputs and selected
numeric result. It retains all six D0 slot variants; only the selected ordinary
Holm operation runs. Exact values remain hexadecimal lattice-numerator strings
and displays remain binary64 words. No raw p generation or new statistical
procedure is introduced. The original reviewed bridge still enforces all-pairs
3–16 groups and 3–120 supplied members.

The new input object removes the redundant revision label and changes its unissued
kind. The envelope revision is the actual ownership source. The separately supplied
expected context names the actual record/revision URI and complete declaration and
inputs. Only after their equality is established does the private reverse adapter
restore the old declaration kind, constant deferred slot fields and an internal
carrier revision label. Actual identities are never replaced by that label in the
report. Result ownership is checked before any numeric worker starts.

The caller obtains the expected context independently; deriving it from an
untrusted submitted Record defeats association checking. Digest consistency does
not establish source authenticity or rule out conflicting revisions elsewhere.

## Stored-byte and parsed-value paths

The implementation copies the bounded Buffer synchronously before its first await.
Subsequent caller mutation cannot change that run. Strict UTF-8 decoding and the
existing strict JSON parser run before routing. Syntax, decoded duplicate member
names, unpaired surrogates and negative zero retain their established priority;
parsed depth/node/container/string bounds run afterwards. The expected context is
processed separately after stored Record integrity succeeds.

After exact bundle routing and closed schema admission, the complete stored bytes
are compared with JCS serialization. A byte scanner then records top-level member
spans and excludes exactly the `integrity` member. It copies all other key/value
spans from the original Buffer without decoding and re-encoding their content.
Offsets are bytes, including when strings contain multibyte UTF-8.

SHA-256 is computed directly over the fixed `nomue/record-content/v1` plus LF tag
and this stored projection. Independently, the parsed projection is canonicalized
and compared to the stored projection. The declared digest is compared to the
stored-byte digest; recomputing JSON from parsed data is not the only digest path.
This directly exercises the NRS-CANON-0016/0017/0022 and NRS-CORE-0006 reuse proposal.
A canonicalizer-fault control demonstrates rejection when a faulty parsed
projection would otherwise confirm the old digest of changed data. It is not a
proof against every possible implementation fault or malicious runtime.

On complete scoped success the API returns the byte-identical snapshot and the
payload object from the original parse alongside the separate report. It does not
parse again to recover the payload. Failed or refused operations return only their
output artifact; no successful subset of rows is forwarded. The API wrapper is not
a public serialized report or an overall Record-validity assertion.

## Output stages and causes

A normal experimental report has five ordered scoped checks: `integrity`,
`context`, `declaration`, `admission`, `arithmetic`. Every check has an exact
exercise check reference, actual record/revision URI, and local analysis/family/
result scope. All check scopes agree. After the first failed or errored check,
later checks are `not_run` with `prerequisite_failed` and no outcome. A completed
check has `pass` or `fail`; an errored arithmetic check has no outcome and includes
a bounded error object. No overall status or significance boolean is defined.

| Cause                                                                                | Candidate result                                                            |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Malformed/ambiguous raw JSON, invalid UTF-8, or resource bound                       | Distinct refusal, with input or bound identified by diagnostic code         |
| Missing/non-string/unsupported bundle                                                | Distinct routing or unsupported-bundle refusal                              |
| Invalid envelope, integrity metadata or payload shape                                | `schema_error` refusal; no invented Record reference                        |
| Noncanonical storage or disagreement between stored and parsed projection            | Distinct storage/canonicalization refusal                                   |
| Digest mismatch                                                                      | Integrity completed/fail; later checks not run                              |
| External expected context mismatch                                                   | Context completed/fail; later checks not run                                |
| D0 relation defects                                                                  | Declaration completed/fail, preserving original stage and complete code set |
| Unsupported supplied p domain, selection/order mismatch, or foreign result ownership | Admission completed/fail; no numeric worker                                 |
| Exact numerator/display mismatch in any row                                          | Arithmetic completed/fail with a distinct exact/display reason              |
| Broken, partial or invalid worker reply, or worker process exception                 | Arithmetic error with no numeric outcome                                    |
| Trusted dependency/setup failure, or inability to form a valid report                | Distinct internal failure refusal                                           |

`diagnostics.json` is an unissued vocabulary, not a public reason-code registry.
The report schema constrains vocabulary and execution/outcome structure; runtime
validation additionally enforces common scopes, ordered prerequisites and
stage/reason pairings. Refusal validation checks its stage/kind/reason pairing.
D0 code ordering is retained without assigning priority within its complete set.
Unknown bridge failure reasons become internal errors rather than guessed
admission judgments.

A deliberate candidate choice resolves the plan's post-routing schema ambiguity:
this experiment returns `schema_error` refusal when no valid envelope/report
reference exists. That refusal kind is not in the registered verifier output
contract. Its final public mapping requires a reviewed successor output contract;
it is not silently substituted into an existing refusal version. Expected-context
errors also remain explicitly caller-input failures, not scientific judgments.

The report references the independently computed Record digest and exact exercise
bundle. Metadata gives a hash of runtime-module/schema/catalog/manifest file
identities loaded during setup; the manifest in turn pins reused dependencies.
This is provenance under a trusted host, not code signing or hostile-host
attestation. Scientific validity, declaration truth, distributional-model validity,
causal interpretation, standardized effect size, FWER control and source
authenticity all remain `not_asserted`; p generation is explicitly outside scope.

## Resources and trusted setup

Outer caps are 2.25 MiB stored Record bytes, 1.5 MiB expected-context UTF-8 bytes,
36 container levels, 28,736 value nodes, 1,024 entries per container and 4,096
UTF-16 code units per string/key. They are provisional exercise admission bounds.
Strict parsing allocates within the byte cap before the parsed-resource walk.
All original legacy bridge caps also apply after reconstruction. Admission is the
conjunction, not a promise that every combination of maximum counts fits.

The existing isolated Python worker retains its 25-second timeout and stdout cap.
Worker failures yield no arithmetic outcome. This packet does not establish a
portable whole-call RSS bound or distinguish timeout from every possible external
process termination. No benchmark sample is promoted into a universal ceiling.

Schemas and executable modules are trusted setup, not Record-provided resources.
Runtime dependency hashes are checked on calls; compiled schemas/modules are
cached for this module lifetime. Hot replacement of trusted source files is not a
supported operating mode. If the module or its top-level imports cannot load at
all, an outer caller handles startup failure because no callable verifier exists.
Trusted test options inject a runner, canonicalizer fault, clock or setup failure;
none is accepted from Record fields. No code or URI in submitted data is executed.

## What remains before formal promotion

This packet exercises all 24 planning categories as an unissued candidate. The
future-identifier category uses an HTTPS-shaped fixture sentinel; it does not
prove allocation or adoption of a public identifier. Local report-schema rejection
of incompatible legacy forms is not a migration decision.

A fixed-candidate independent review is the next acceptance step. After findings
are resolved, the formal change still needs the scoped research/RFC decision,
allocated Contract/Profile/check/schema/bundle identities, public diagnostic and
refusal assignment, authoritative requirement and surface ownership, independent
conformance expectations, supported-runtime evidence and coordinated reference
implementation/registry changes. Existing supported bundles remain unchanged.
