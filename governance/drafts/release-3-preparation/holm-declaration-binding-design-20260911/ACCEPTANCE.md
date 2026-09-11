# Binding acceptance matrix

Proposed end-to-end tests for the implementation successor, not executed bridge
conformance. Use fixed D0 example family f-4, analysis a-4, slot r-4 (all_pairs,
three groups), preserving all other declaration content. Supply one origin source
with three distinct source hypothesis labels and explicit two-sided declarations.
No p-generator or scientific validity is asserted by this synthetic example.

| Family member order | Supplied p                | Expected exact adjusted p | Expected display   |
| ------------------- | ------------------------- | ------------------------- | ------------------ |
| m-0                 | 1/64 (`3f90000000000000`) | 3/64                      | `3fa8000000000000` |
| m-1                 | 1/32 (`3fa0000000000000`) | 1/16                      | `3fb0000000000000` |
| m-2                 | 1/8 (`3fc0000000000000`)  | 1/8                       | `3fc0000000000000` |

Expected adjusted lattice values are respectively 3*2^1068, 2^1070 and 2^1071.
The expected result follows directly from the rank products (3/64, 1/16, 1/8),
which are increasing and below one. Exact Fraction calculations and binary64
encodings were checked while preparing this design; the bridge is not implemented.

| Case                                                                           | Required outcome / observation                                                                        |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Baseline expected context and complete matching evidence                       | Scoped arithmetic/identity success; declaration truth and science not asserted                        |
| Reordered object keys or pretty JSON whitespace only                           | Same canonical binding; acceptance                                                                    |
| Same local member names and p values in two valid analyses/families            | Selecting the other context while keeping old evidence fails binding before worker start              |
| Changed revision, origin source, source hypothesis, sidedness or p bytes       | Old evidence fails binding; no implicit p-value conversion                                            |
| Same origin source for distinct source hypothesis IDs                          | Allowed; source sharing alone is not duplicate hypothesis identity                                    |
| Same source/hypothesis pair assigned twice                                     | Bridge admission refusal even if p values agree                                                       |
| Changed observation, population description, variance or selection declaration | Old evidence fails binding; altered reference consistency may fail D0 earlier                         |
| after/not_declared selection in a D0-admissible fully matching context         | Arithmetic can proceed; no scientific eligibility or chronology claim                                 |
| Pair direction reversed consistently in expected D0                            | Old evidence fails binding even for equal/two-sided supplied p values                                 |
| Changed unrelated analysis only                                                | Old evidence conservatively fails full-document binding                                               |
| Missing/duplicate/swapped expected member, wrong selected result or family     | Coverage/order/reference refusal before worker start                                                  |
| Missing or duplicate group pair in D0                                          | Preserve existing D0 relation codes; do not silently drop p-values                                    |
| Selected slot is pairwise, interval or omnibus instead of adjustment           | Refuse selection                                                                                      |
| Selected family is many_to_one, finite_contrasts or omnibus                    | Refuse first-slice admission; does not label the method scientifically invalid                        |
| 16 groups with 120 pairs                                                       | Admissible only if all document/transport limits also pass; measure full call                         |
| 17 groups, 121 selected members, or over-limit unrelated D0 container          | Deterministic size/scope refusal before numerical work                                                |
| Selected ID length 64 versus 65; A versus a; non-ASCII ID                      | Boundary accepted / refused / case distinction / refused, with no normalization                       |
| Numeric -0, duplicate decoded JSON key, unpaired surrogate, 1e999              | Existing strict parser or finite/JCS rejection; no alternate parse route                              |
| Noncanonical p_hex, negative-zero bits, NaN, infinity, p>1                     | Exact encoding/domain refusal; no coercion                                                            |
| p=0 and p=1 with otherwise valid context                                       | Transform as represented numbers; do not infer exact ideal upstream probability                       |
| Wrong exact adjusted value with unchanged display                              | Refuse exact integer disagreement; use a proved display-collision vector                              |
| Correct exact adjusted value, wrong display                                    | Refuse encoding disagreement                                                                          |
| Earlier rows correct, final row false/missing                                  | No partial success                                                                                    |
| Comparison counters or sorted trace added to submission                        | Closed shape refusal; those diagnostics are not accepted evidence fields                              |
| Numeric payload inserted into old D0 slot                                      | Existing closed-schema rejection; sidecar stays separate                                              |
| Added alpha, FWER, interval, URI, method selector or code field                | Closed shape refusal, no execution or dereference                                                     |
| Excessive raw size, 33-level nesting, nodes or string width                    | Refuse before recursive schema/canonical work; bracket characters inside strings do not inflate depth |
| Any malformed response, excess worker stdout or worker crash                   | Experiment failure, never a successful designed evidence refusal                                      |
| Changed pinned file, wrong module origin or wrong worker executable            | Integrity failure with named dependency; no numerical acceptance                                      |
| Whole-call maximum documents, duplicated binding and 120-member families       | Measured normal/-O results agree and satisfy experimental envelope; timeout is failure                |

Concrete exact/display collision: use supplied p=(x,3/4,1), where
x=1/4+3*2^-54 has encoding `3fd0000000000003`. The first exact adjusted
value is a=3/4+9*2^-54 and the other two are 1. Replace only the submitted
first adjusted value with b=3/4+8*2^-54. Both a and b display as
`3fe8000000000004`, but a!=b, so exact comparison refuses. Supply a*U
versus b*U as canonical integer hex strings; the input p encodings stay valid.
This witness was checked with exact fractions and binary64 packing during design
preparation. It is an output mutation, not a new p-value rounding policy.

Tests check exact scoped reasons with explicit assertions active under -O. Count
executed checks dynamically. Unexpected exception types/messages are failures.
Recompute numerical expectations with the independent small-family oracle where
applicable. Use synthetic cross-analysis witnesses with both contexts independently
D0-valid; merely breaking references does not test the later binding boundary.
Instrument worker launches: every earlier rejection launches zero; a complete
valid check launches once. Record exact input bytes, fixed dependencies, runtime,
limits, measured memory and timing separately from scientific claims.
