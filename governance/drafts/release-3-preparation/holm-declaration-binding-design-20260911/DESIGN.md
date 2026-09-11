# D0-to-Holm declaration binding design

## Status and first slice

Unfrozen, unimplemented exploratory design, 2026-09-11. Prepared by OpenAI Codex
in the continuing author context. This is a successor to the work plan in PR #298,
not an independent review or a public Record/Contract/check definition.

Connect the reviewed D0 structure to the repaired ordinary supplied-p Holm
experiment without changing either historical packet. The first bridge selects
one `multiplicity_adjustment` result slot whose family is `all_pairs`, for 3..16
independent one-way groups and one outcome. There are exactly k*(k-1)/2 supplied
p encodings, hence 3..120 members. This narrower bridge does not remove support
from the generic 1..1024-member Holm experiment or declare another R3 family
scientifically invalid. Many-to-one, finite contrasts and omnibus families are
out of this first bridge even though the D0 example descriptor admits them.

The bridge checks declared identity and exact supplied-number transformation.
It computes no raw-data p-values, certifies no selection chronology, and asserts
no scientific input validity, FWER, significance decision or confidence interval.
No omnibus result is required before supplied-p adjustment. Naik and R4 outputs
are not dependencies; the latter's factorial design is outside this R3 slice.

## Fixed dependencies

| Packet                    | Commit                                     | Reuse                                                                            |
| ------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| Work plan / PR #298       | `4eb31733f5e221ed211a6cc4448057e6dd2fc0dc` | Scope and close criteria                                                         |
| D0 plus review / PR #280  | `25de2d2b97934476dc2ae49eeb3fa5143a74e131` | Candidate schema, relations, example descriptors and strict ingress dependencies |
| Holm / PR #292            | `c4ad231471deba354bd018550b2378f2d740b944` | Exact transformation and binary64 projection                                     |
| Holm source / PR #289     | `9793fd2f1540c26491651ff02bf51d0bd292f821` | Ordinary unweighted procedure, conditional theorem, separate-source connection   |
| IEEE supplement / PR #294 | `864766232988181e72ae18c235dbc815466b3a1d` | Bounded encoding/rounding source and author R3 applicability                     |

INPUTS.json pins inspected files. The implementation successor pins every copied
or imported runtime dependency, including D0 schema/descriptors, strict parser,
JCS, the Holm worker and runtime lockfile dependencies. File hashes and actual
module origins are checked before reuse; loader, manifest, trusted runtime and
process path remain explicit trust roots. No submitted source path or executable
is loaded. Separate-formula oracle calculations remain tests only.

## Caller inputs and submission

Proposed coordinator operation:
`checkBinding(expectedD0Text, expectedInputsText, submittedText)`.
All three arguments are primitive strings from an ordinary trusted caller. Expected
D0 and expected input association come from that caller's own context, not from
fields copied out of submitted evidence. The submitter cannot select its target.
All three raw texts pass the existing `parseStrictJson` and JCS eligibility checks
before interpretation; there is no permissive alternative external JSON parser.
Pretty-printed candidate text is permitted for this experiment; it is not official
canonical Record storage ingress. Comparison uses existing JCS output.

`expectedInputsText` describes a closed sidecar object with exactly these fields:

| Field                                   | Exact meaning                                                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `kind`                                  | Literal `unissued-holm-binding-input-v0`, an exercise marker only                                                              |
| `revision`                              | Caller-owned nonempty ASCII label, at most 64 characters                                                                       |
| `analysis_id`, `family_id`, `result_id` | Exact selection of one D0 analysis, its family and its single adjustment slot                                                  |
| `members`                               | Ordered array; exactly the selected D0 family's member order                                                                   |
| each member                             | Exactly `member_id`, `origin`, `p_hex`                                                                                         |
| `origin`                                | Exactly `source_id`, `hypothesis_id`, `sidedness`; IDs are opaque caller-owned labels; sidedness is `one_sided` or `two_sided` |
| `p_hex`                                 | Exactly 16 lowercase hex characters, big-endian binary64 encoding, positive zero through 1 inclusive                           |

All sidecar IDs use `[A-Za-z0-9_.-]{1,64}` with exact case-sensitive comparison.
Apply the same restriction to selected D0 analysis/family/result/member IDs;
refuse incompatible IDs rather than truncate, normalize or relabel. Other D0
strings remain subject to the bounded document checks below.

`origin.source_id` and `hypothesis_id` identify an external supplied-number
association, not an issued Contract, URI or proof of a p-generating method.
The pair (source_id, hypothesis_id) is unique across members; source_id alone
may repeat. Binding is on the tuple, never a concatenated string. Sidedness is
retained as a declaration and is not used to double/halve p-values. Reusing the
same source/hypothesis pair for two members is conservatively outside this slice,
not a theorem about logical hypothesis equivalence.

The selected analysis and result slot use the exact unissued descriptor
`example-contract-multiplicity-adjustment-v0`. The family member array determines
Holm input order; result-slot member_ids still has D0 set coverage semantics,
and its actual array order is separately bound by the full declaration.

A repeated local member_id in another D0 family is allowed; full analysis/family
context determines its meaning. Pair direction (minuend, subtrahend), all input
observations, population membership, selection and variance declarations remain
bound through the full D0 object, even though Holm does not calculate with them.

The submitted sidecar is a closed object with exactly:

- `kind`: literal `unissued-holm-binding-evidence-v0`;
- `binding`: closed object with `declaration` (the full D0 parsed value) and
  `inputs` (the full expected sidecar shape);
- `adjusted`: ordered array of exactly m closed rows, each with `member_id`,
  `adjusted_hex`, and `display_hex`.

Require `JCS(submitted.binding)` to equal
`JCS({declaration: expectedD0, inputs: expectedInputs})` byte-for-byte. Compare
complete canonical bytes; this slice introduces no new digest scheme or official
Record identifier. Object-key ordering and whitespace are immaterial; arrays,
string normalization forms, declarations and parsed numbers remain significant.
All changes to unrelated analyses in the full document also change the binding.
That is deliberate conservative identity, not a claim that they change Holm's
mathematical answer. Original decimal spelling is not bound beyond the existing
parsed/JCS value semantics. Negative-zero numeric input is rejected by ingress.

`adjusted_hex` is the exact integer A on the Holm U=2^1074 lattice: lowercase
`0` or a nonzero first hex digit followed by lowercase hex digits, at most 269
digits, with 0<=A<=U. No prefix, leading zero, sign, decimal coercion, float or
JSON integer is used for A. `display_hex` is exactly 16 lowercase hex characters.
Decode to bytes and compare to the pinned projection, not a decimal display.
These are experimental sidecar string encodings, not new public numeric fields.
No sorted trace, comparison count, alpha, guarantee, interval, code or URI field
is accepted. The old D0 slots keep `payload_status=method_payload_deferred`;
no numerical payload is inserted into that closed historical schema.

## Deterministic processing order

1. Primitive type and raw length limits for all three texts, then a bounded
   quote/escape-aware bracket-depth preflight on each. It does not parse, accept
   syntax or decode values. The existing strict parser remains syntax authority.
2. Parse expected D0, expected inputs and submitted evidence in argument order
   with existing strict parsing and finite/JCS eligibility. Apply generic
   iterative document bounds before recursive canonicalization/schema traversal.
3. Run the fixed D0 schema and relation checks on expected D0. Require
   `stage=relations` and an empty code set; do not invent a priority among D0's
   unordered relation errors. Preserve the stage and full codes on refusal.
4. Validate closed expected-sidecar and submitted shapes and scalar limits;
   selected family kind/count, exact reference ownership, descriptor/result kind,
   member order/coverage and source-hypothesis uniqueness. Member-ID uniqueness
   within the selected family is already refused at step 3 by D0's `DUPLICATE_ID`
   relation code, so the Holm worker's own duplicate-hypothesis refusal is never
   the first line of defense. Validate all p encodings
   and all adjusted integer/display syntax/ranges before numerical execution.
5. Compare complete canonical binding and selected output member order. Refuse
   any mismatch before starting the numerical worker. Unknown or after-inspection
   selection declarations do not prevent arithmetic-only operation if D0 permits
   them; their truth and scientific eligibility are not inferred.
6. Build the internal Holm carrier solely from expected inputs: `family` is the
   selected family ID, `revision` is the caller revision, and each member uses
   `hypothesis=member_id`, `origin=origin.source_id`, `p=bytes.fromhex(p_hex)`.
   The remaining origin fields and full D0 context stay in the coordinator's
   binding; do not pretend the smaller Holm carrier checks them.
7. Call pinned `transform` exactly once. Compare every submitted exact adjusted
   integer and display encoding to recomputed outputs in original member order.
   Accept only after all m rows match. Diagnostic comparison counters are neither
   submitted nor part of the output identity; no reintroduction of the repaired
   PR #292 comparison-counter defect.

Proposed scoped success: `declaration_bound_supplied_p_arithmetic_consistent`,
with `declaration_truth` and `scientific_validity` both `not_asserted` and raw-p
recomputation `not_run`. No overall VERIFIED verdict is introduced. Refusals,
worker crashes/timeouts and integrity failures remain distinct. Early valid rows
never produce an accepted partial result.

## Coordinator and worker boundary

Reuse D0 in a Node coordinator and the unchanged Holm transform in a fresh Python
worker; do not port the numerical algorithm to JavaScript in this slice. External
texts terminate at the coordinator's existing strict parser. The worker receives
only a newly constructed bounded internal JSON message containing the validated
expected carrier with p bytes represented as the fixed hex strings. It receives
no submitted evidence, source URI, path or user-selected method.

The Python worker's internal decoder is not an alternate external verifier
parser: only the trusted coordinator can supply this channel. It still checks
exact closed shape, scalar types and byte limits. Its bounded response carries
only exact integer hex and display hex arrays; coordinator parses it with the
existing strict parser and validates m and widths. No stdout logging may share
the response channel; any malformed response fails the experiment. Repeated or
unsolicited responses are refused. Trusted executable paths and argument arrays
are fixed; no shell interpolation. The full request/response experiment gets its
own dependency-origin, subprocess-failure and malformed-response tests.

## Admission and measured-envelope proposal

| Limit                  | First bridge proposal                                                                                                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input text sizes       | expected D0 <=1 MiB UTF-8, expected sidecar <=256 KiB, submitted evidence <=2 MiB; reject UTF-16 code-unit excess first, then UTF-8 size                                                                         |
| Nesting                | Expected texts: at most 32 open array/object levels; submitted evidence: at most 34, because `binding.declaration` embeds the D0 two levels deeper; brackets within strings ignored                              |
| Parsed document budget | Expected D0 <=24576 nodes, expected sidecar <=2048 nodes, submitted evidence <=28672 nodes (D0 plus sidecar plus adjusted rows plus envelope); <=4096 UTF-16 code units per string, <=1024 entries per container |
| D0 counts              | 3..16 groups, <=1024 observations/units, <=16 analyses, <=16 families, <=16 result slots, <=120 members per family                                                                                               |
| Selected family        | all_pairs only; 3..120 members with exact D0 pair coverage                                                                                                                                                       |
| Worker transport       | Each request/response <=256 KiB UTF-8, checked before decode; exactly one response                                                                                                                               |
| Numerical limits       | Inherit fixed Holm operand and comparison guards; do not enlarge them                                                                                                                                            |
| Experiment envelope    | Whole coordinator/worker call <=30 seconds; Python worker address space <=256 MiB; Node old-space cap 256 MiB; measure process-tree RSS with a 512-MiB experimental ceiling                                      |

The submitted budgets are sized for embedding: the submitted evidence carries
the complete expected D0 and sidecar, so its node and nesting limits must exceed
the sum of the embedded limits, and a D0 at the expected nesting limit must
still embed. From the pinned example's per-object costs, a D0 at every count
limit needs about 23,000 nodes, so the D0 node budget is set above the count
limits rather than below them; `check_design_witnesses.py` records the estimate.
The strict parser calls `JSON.parse` before its eligibility scan, so the step 1
raw-size and depth preflight is the only guard that runs before parsing.

These are proposed admission and test limits, not measured guarantees. Node heap
cap is not total process memory. The harness must sample combined process-tree
RSS and terminate a failed probe on the experimental ceiling, documenting sampling
resolution and its non-hard-limit nature. Timeout, worker termination and memory
failure do not count as designed input refusals. Narrow admission if the combined
D0, canonicalization, transport and arithmetic probes fail. Holm's standalone
millisecond observations do not establish a full bridge bound. Maximum submitted
binding duplication must be included in measurements.

## Review and closure

Before implementation, obtain the bounded external design review in REVIEW.md.
Then build one disposable connection experiment, verify ACCEPTANCE.md, obtain
bounded implementation review, repair concrete findings and close that round.
Public registration, official identifiers and schema versioning, supported
platform claims, raw-p validity/selection evidence and scientific FWER acceptance
remain separate. Existing 49 classifications and enabling exclusions stay intact.
