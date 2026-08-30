# Release 2 Paired-t Numerical Candidate

**Status: non-authoritative, unissued, and not numerically frozen.** The Steward has
approved this direction for continued candidate development. That approval does not
complete R2-D5, end the open RFC review, issue a Public Check, register a supported
bundle, or select final support bounds and mathematical-truth error bounds.

The machine-readable checkpoint is `evidence-readiness.json`. It deliberately marks
the p-value and fixed-95-percent critical-value evidence as incomplete. A passing
structural validator test is not an oracle result.

## Operation-stage support-domain candidate

`support-domain-candidate.json` is the first machine-readable support-domain
structure. It is not a supported-domain claim. It orders only the predicates that
the current G4 feasibility spike can execute, binds each predicate to its candidate
failure class and boundary fixture, and keeps runtime support disabled.

`support-domain-boundary-cases.json` exercises every active refusal predicate plus
one ordinary algebra example through `reference/spikes/paired-t.ts`. The corpus
pins exact stage classification for candidate testing; it does not establish a
neighborhood, a rectangular numerical bound, or complete validated scope.

The final support expression remains a conjunction of operation-stage predicates,
a declared validation corpus, and an oracle-enclosure predicate. The latter two
parts remain incomplete. Confidence-interval endpoint representability remains
deferred. The p-value target-format classifier and an input-specific truth-error and
projection-margin evaluator are now independently reviewed candidate tooling. Their
activation remains deferred because the supported platform predicate is not
selected, the input-specific proof is not selected for runtime, and the runtime
Student-t tail procedure and boundary evidence are not ratified.

No blanket subnormal refusal is active. The condition-number and cross-graph
disagreement observations remain diagnostics rather than runtime gates. No `df`
support ceiling, statistic bound, tolerance, final table hash, or public refusal-code
spelling is introduced by this increment.

## Numerical-contract decision candidate

`numerical-contract-candidate.json` records the bounded disposition of three
independent research handoffs without making a private repository a Protocol
dependency. Claims from those handoffs cannot close R2-D5 until the relevant result
is reproduced by reviewable material in this repository. The fact/finding/decision
separation is recorded in
`../reviews/d5-runtime-projection-tolerance-research-adjudication.md`.

The candidate separates three ledgers that must not be collapsed:

1. reproduction of the pinned binary64 operation graph;
2. error relative to the mathematical target; and
3. projection of a positive mathematical probability into the target format.

For the first ledger, exact binary64 bit identity is selected for candidate testing.
This is not a zero-valued accuracy tolerance: it asks whether a declared result is
the output of the pinned operation graph. Mathematical truth still requires its own
oracle and analytic error ledger. The helper in
`tooling/src/spikes/paired-t-numerical-contract-candidate.ts` rejects non-finite
values and negative zero before comparing the bits.

The same helper makes the proposed normal-only p-value format classification
executable. A positive normal binary64 value and a projected value of `1` are
candidate format successes. The classifier does not prove that either projection is
correct; that remains the oracle ledger's job. A positive subnormal, positive tail
that projects to `+0`, negative zero, or an invalid probability receives a distinct
candidate classification. It never clamps a positive tail to zero or substitutes the
minimum subnormal. This projection is not connected to the verifier because the
runtime Student-t tail and its boundary evidence remain incomplete.

An integer-df ceiling of `200` is only the next evidence-evaluation target. It is not
a supported `df` maximum. `runtime-series-candidate.json` and
`tooling/src/spikes/paired-t-runtime-series-candidate.ts` now make one positive-term
series graph executable for independent evaluation. The graph uses the exact
binary64 `|t| <= 1` branch, positive central and lower-tail expansions, a positive
df=1 series without host `atan`, and a cancellation-resistant df=2 algebraic path.
A host `atan`, `2 * (1 - CDF)`, and an unbounded continued fraction remain excluded.

This executable graph is not yet selected as the runtime procedure in
`numerical-contract-candidate.json`. The PR #33 evidence-reproduction path continues
to receive its inverse-beta constants per evidence case. A separate integration
wrapper now looks up the exact reviewed candidate-table cell before entering the
unchanged graph. The stop rule's binary64 roundoff is not discharged by the
mathematical series remainder, and the truth-error and platform ledgers remain
incomplete. The separate Arb evidence generator records the correctly rounded truth
and truncation enclosure without converting their ULP distance into a tolerance.

`runtime-inverse-beta-table-candidate.json` adds the next evidence-only checkpoint:
a contiguous `df = 1..200` candidate table for the normalization constant
`1 / B(df / 2, 1 / 2)`. Each cell must be isolated by an Arb gamma-ratio enclosure
and by a method-distinct exact-rational route. Even degrees of freedom use the exact
recurrence from `df = 2`; odd degrees of freedom use the same recurrence from
`df = 1` together with an alternating Machin-series enclosure of pi. The validator
recomputes the exact secondary certificates and binary64 rounding cells. The
generated table and its content hash passed independent adversarial review. They
remain reviewed workflow evidence rather than selected runtime constants, a
supported df range, or a final table hash. The review disposition is recorded in
`../reviews/d5-runtime-inverse-beta-table-evidence-adversarial-review-disposition.md`.

`runtime-table-integration-candidate.json` binds the exact reviewed table bytes to
`tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts`. The wrapper
performs an exact integer-df lookup and passes that binary64 value to the existing
series graph. The checked-in candidate table retains its original non-support and
non-selection metadata, while the wrapper reports the evidence-local content hash
and explicitly reports that no runtime table has been selected. This connection is
accepted as a reviewed non-authoritative candidate integration. The review
disposition is recorded in
`../reviews/d5-runtime-table-integration-adversarial-review-disposition.md`. The
review does not close the graph's stopping-rule, truth-error, projection-margin, or
platform decisions.

`truth-boundary-candidate.json` keeps the next step equally narrow. Its generator
searches selected df values for adjacent binary64 statistics that straddle each
target-format class transition and certifies the mathematical projection on both
sides. The evidence records exact pointwise graph-to-truth ULP distances and class
disagreements. A finite search maximum remains an observation and is mechanically
forbidden from becoming a global truth-error guarantee.

The candidate also records the form of a future projection margin without choosing
its size. If a later proof supplies a non-negative integer truth-error bound `B` for
an evaluated input, a normal or rounded-one graph result is class-stable only when
its cell is more than `B` cells from the nearest projection-class transition. This
deliberately includes the supported normal-to-rounded-one transition. The boundary
checkpoint's global `B` remains null, the predicate is not activated, and neither
the selected df seed nor its boundary cases constitute Protocol support.

## Truth-error and supported-domain closure candidate

`truth-error-support-closure-candidate.json` and
`tooling/src/spikes/paired-t-truth-error-support-candidate.ts` instantiate that
margin form with a conservative, input-specific proof candidate. The evaluator
replays the already reviewed table-connected graph and requires exact agreement in
branch, iteration count, cap, and p-value bits. It does not change the graph result.

For positive operations whose rounded results are strictly above the minimum normal
binary64 value, it uses the standard round-to-nearest envelope
`gamma(k) = k*u/(1-k*u)`, where `u = 2^-53`. At each multiplication, division,
positive addition, and square root, the worst upper and lower compositions are
calculated exactly and re-indexed to the smallest `gamma(k)` that contains both.
Native square-root results are accepted only when exact rational midpoint checks
establish that the squared input lies strictly inside the returned root's rounding
cell. The strict minimum-normal rule deliberately refuses the boundary cell where
the exact result could be subnormal.

At series termination, the unchanged graph has observed that adding the next
positive term does not change the sum. The candidate combines that observation with
the tracked sum and term gamma indices and the existing geometric tail bounds:
multiplier `2` on the central branch and `df + 1` on the lower-tail branch. Every gamma,
remainder, relative-error, and final integer-ULP calculation is performed as an
exact rational. Displayed relative bounds are rounded upward. For relative error
`E < 1/2`, the graph-to-correctly-rounded-truth distance is conservatively bounded
by `ceil(2^54 * E + 1)` cells. No corpus maximum enters this derivation.

The newly pinned `df = 197`, `t = 50.4` binary64 witness has graph bits
`284f4ce6230625df`, Arb-certified truth bits `284f4ce623062755`, and an observed
distance of 374 ULP. The input-specific candidate bound is 2,978 ULP and its
projection margin is larger. The runtime-series corpus has 20 cases: 16 satisfy the
candidate predicate, three refuse because proof preconditions fail, and one refuses
because the projection margin is not established. All accepted cases have an
Arb-certified pointwise distance no larger than their derived candidate bound.

The derivation and its repairs passed independent adversarial review as a
non-authoritative input-specific proof candidate. This is not a selected runtime
bound, a complete validation corpus, a supported platform matrix, or a supported
domain. The readiness checkpoint records `reviewed_candidate_proof`; the
support-domain artifact still lists the predicate as deferred and keeps runtime
support disabled. The review disposition is recorded in
`../reviews/d5-truth-error-support-closure-adversarial-review-disposition.md`.

Research also supports stage-specific scrutiny of subnormal algebra intermediates,
but activating a sample-variance refusal would change the reviewed first-failure
order for the existing standard-error-squared underflow witness. This increment
therefore leaves the PR #29 operation-stage predicates unchanged until that ordering
has its own witness and review. It does not turn the research observation into a
blanket subnormal refusal.

## Supported execution predicate research

Independent primary-source investigation and separate adjudication have now closed
the research question needed to design the supported-platform predicate. Current
ECMAScript specifies the observable roundTiesToEven binary64 semantics required by
the tail graph, including correctly rounded `Math.sqrt` in the 2025 and 2026
editions. Node build identifiers and support tiers do not, however, attest to active
floating-point state or the behavior of a particular invocation. V8 source also
shows that denormal-flush controls are concrete mutable process/thread state.

The adjudicated direction is therefore a supported execution predicate rather than
a platform-name matrix alone. `supported-execution-predicate-candidate.json` and
`tooling/src/spikes/paired-t-supported-execution-candidate.ts` now implement the
first non-authoritative predicate candidate. They leave the previously reviewed
runtime-series and truth-error source files unchanged. The new evaluator instead
produces the returned p-value, branch, iteration disposition, series remainder, and
truth-error proof inputs from one operation trace.

Each trace node binds its unique sequence and operation label, operand source
sequences, operand bits, and result bits. The trace header also binds the input
bits, reviewed inverse-beta table hash and cell, runtime identity, branch,
iteration count, cap, proof gamma indices and exact-rational bound inputs,
remainder, and returned p-value. Nodes and their containing trace are frozen before
return. A digest covers the full ordered representation. The validator reconstructs
the proof indices and bounds independently from the trace before acceptance.
The evaluator verifies the completed trace before reporting a candidate success;
mutated, malformed, incomplete, reordered, duplicated, unbound, or over-limit
traces fail closed.

For `+`, `-`, `*`, and `/`, the verifier lifts each actual binary64 operand to its
exact signed dyadic rational, calculates the exact operation with `BigInt`, and
reconstructs the roundTiesToEven binary64 result, including normal, subnormal,
signed-zero, and overflow boundaries. Every executed square root is checked by
strict exact-rational rounding-cell containment. Absolute-value and maximum
selections are also bit-bound. Integer loop control uses safe integers or `BigInt`
and is kept separate from the binary64 roundoff ledger. The 100,000-node ceiling is
an evaluation limit for review, not a selected supported resource bound.

Hard-coded binary64 and intrinsic-identity sentinels run at module startup and
before and after every evaluated invocation. They are diagnostics, not a substitute
for the trace proof. The candidate reports the exact current Node, V8, OS, and
architecture identity but contains no allowlist entries. It also records the
required exclusions for a controlled process profile without claiming that an
ordinary library call can enforce them. The successful result therefore says only
that the arithmetic execution was verified; `supportedExecutionPredicateSatisfied`,
platform support, domain support, and runtime support remain false.

Neither the research closure nor this implementation selects a platform tuple or
activates support. The implementation still needs independent adversarial review,
selection of an exact runtime/build/platform allowlist and controlled-process
enforcement, selection of a supported trace resource bound, and complete admission
evidence for every proposed tuple. It is limited to the table-connected tail graph
that accepts `(df, t)`; the upstream G4 data-to-statistic graph still needs separate
closure. The commission, independent results, and disposition are recorded in
`../reviews/d5-supported-platform-primary-source-research-commission.md` and
`../reviews/d5-supported-platform-primary-source-research-disposition.md`.

## Runtime input and reason-code candidate

`runtime-input-reason-code-candidate.json` addresses one candidate-tooling input
asymmetry without selecting numerical support. The table-integration and truth-error
entrypoints now share one parser that accepts exactly two own enumerable data
properties, `degreesOfFreedom` and `testStatistic`. Extra or symbolic keys,
inherited required properties, accessors, and custom object prototypes receive a
structured candidate refusal; accessors are not invoked. Valid plain and
null-prototype data objects produce the same fresh two-field input and enter the
unchanged reviewed graph.

The same checkpoint proposes one unissued reason-code spelling for each of the ten
reviewed active operation-stage predicates and the reviewed defensive
`NON_FINITE_INTERMEDIATE` postcondition. These eleven mappings preserve the existing
predicate order, failure class, readiness key, and future paired-t computability
check owner. The checkpoint claims only this reviewed numerical subset, not a
complete Release 2 reason-code inventory; Profile, Record-validation, and
declared-result comparison codes are outside this increment. It also records that the
runtime graph's non-finite classification delegates to the reviewed postcondition
and that a truth-error wrapper refusal delegates to its underlying graph
classification. The
candidate spellings do not add anything to the authoritative reason-code registry.

Ten decisions remain unmapped because their public meaning depends on work that is
still open: final supported df, the supported iteration resource bound, selection of
the truth-error and projection predicates, subnormal projection and intermediate
policy, confidence-interval endpoint truth, and the supported-platform predicate.
Candidate-input rejection, missing candidate table data, and proof-graph divergence
are classified as input-processing, candidate-configuration, or implementation-
invariant failures rather than Record-caused Public Check reasons. Final reason codes
remain unfrozen and runtime support remains disabled. The shared input contract and
partial operation-stage inventory passed independent adversarial review as
non-authoritative decision-preparation material; the disposition is recorded in
`../reviews/d5-runtime-input-reason-code-adversarial-review-disposition.md`.

## Candidate four-layer separation

| Layer               | Candidate responsibility                                                                                                      | Current state                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Mathematical target | Paired differences, mean, sample variance, standard error, Student-t statistic, two-sided tail, and fixed 95 percent interval | Defined by the existing informative P1-A design; not issued here      |
| Binary64 procedure  | Canonical pair order, G4 pairwise two-pass algebra, explicit operation-stage failures                                         | Selected for candidate testing                                        |
| Oracle certificate  | Exact-rational input, Arb enclosure, a method-distinct secondary path, target-format-aware projection, provenance             | Independently reviewed 200-cell candidate; final selection open       |
| Comparison policy   | Exact graph reproduction, separate mathematical-truth error, and target-format projection                                     | Independently reviewed input-specific proof candidate; selection open |

The secondary oracle path is method-distinct but not library-independent. It
shares Arb ball arithmetic with the primary and closed-form paths, so their
agreement supplies only weak independence against shared-library defects.

The exact mathematical difference for one pair is the subtraction of the two parsed
binary64 operands after each operand is lifted to its exact dyadic-rational value.
The binary64 procedure then performs one binary64 subtraction. These two levels are
not interchangeable. In particular, different exact differences can round to the
same binary64 difference.

The G4 candidate uses a fixed recursive reduction tree for the mean and for the sum
of squared centered deviations. Each non-leaf range is split after `floor(n / 2)`
items, recursively, so the tree is defined for non-power-of-two pair counts as well
as powers of two. It then divides by `n - 1`, divides by `n`, applies the host native
square root, and divides the mean by the standard error. Fused multiply-add and
implicit extended intermediates are outside this candidate graph.

The graph does not yet claim a closed cross-runtime platform matrix after native
square root. Exact bit comparison is the candidate contract once an implementation
has satisfied the eventual platform predicate; it is not evidence that every
unexamined runtime already produces those bits.

## Failure classification

Exact equality of all exact dyadic paired differences is the mathematical
zero-variance state and a Contract-computability refusal. It is not a Profile-
admissibility failure. It stays separate from representational failures such as:

- finite operands whose binary64 subtraction overflows;
- unequal exact differences that binary64 subtraction maps to one value;
- a positive variance or standard-error-squared value that underflows to zero;
- a later intermediate that overflows; and
- confidence-interval endpoints that collapse under binary64 rounding.

This separation prevents a well-defined input whose information is lost by the
candidate graph from being mislabeled as mathematically degenerate.

## Certificate closure rules

`tooling/src/spikes/paired-t-certificate-candidate.ts` checks certificate-bundle
structure without calculating the statistical quantity. It requires:

- exact rational enclosure endpoints rather than display-only ball strings;
- exact binary64 rounding-cell endpoints and strict containment;
- a real interval-overlap check for the secondary path;
- the df=1 and df=2 closed-form path where applicable;
- monotonic midpoint bracketing for every fixed 95 percent critical value;
- increasing precision history with a declared ceiling; and
- generator-commit, generator-file, and environment hashes.

This closes the earlier test-harness holes in which overlap could be forced true,
closed-form paths were labels rather than executed evidence, and summary JSON lacked
the exact cells needed for independent verification. The dedicated CI route now
regenerates a reproducible candidate bundle with the pinned Arb/FLINT dependency.
That bundle is an evidence artifact for the explicit research seed, not a complete
critical-value table or an authoritative numerical contract.

`tooling/r2-paired-t-evidence/` now supplies a pinned, fail-closed pilot generator
and a dedicated CI artifact route. Its current corpus exercises three p-value
certificates, nine fixed-95-percent critical-value certificates at the explicit
research-seed degrees of freedom `1, 2, 4, 5, 6, 10, 30, 100, 1000`, and six
boundary probes. The generated bundle is hash-bound to the generator commit, copied
generator, environment, case manifest, and raw oracle output, then passed through
the candidate certificate validator. A separate table manifest also binds the
ordered df/binary64 cells, the complete certificate bundle, and each individual
certificate.

The missing degrees of freedom in the pilot are deliberate. Its manifest records
that the seed is not contiguous runtime support and leaves `supported_df_max` null.
For df greater
than 2, the secondary critical-value route uses segmented rigorous density
quadrature and expands its finite endpoint until the analytic tail bound is below a
case-derived evidence ceiling. For df=1 and df=2, the executed closed form is the
secondary route. The evidence ceiling is only a proof-construction condition; it is
not a runtime tolerance or supported-domain predicate.

The separate `fixed-95-critical-value-table-candidate.json` checkpoint now drives a
contiguous `df = 1..200` evidence generator. It rigorously searches binary64 cell
midpoints, cross-checks all nine pilot cells, reuses the primary and method-distinct
secondary certificates, and emits a hash-bound table artifact. Its validator and
coherent mutation probes are part of the dedicated evidence workflow. This closes
the implementation gap for a reviewable table candidate, but independent review,
final table selection, a final content hash, endpoint truth, support, and issuance
remain open. The readiness closure therefore remains `incomplete`.

For a certified binary64 critical value `t_c`, table lookup has zero reproduction
error. Its truth error is different: correct rounding establishes the absolute bound
`|t_c - t_true| <= 0.5 * ULP(t_c)`. The interval endpoint truth ledger must propagate
that absolute quantization term together with mean and standard-error error. It must
not multiply the ULP by `|t_c|` a second time.

## Items intentionally still open

- the maximum supported pair count or integer degrees of freedom (`200` is only an
  evidence target);
- the supported input, variance, standard-error, statistic, and p-value domain;
- whether any subnormal stage is supported through target-format-aware evidence or
  refused;
- closure of the complete runtime Student-t operation graph, stopping rule, and
  iteration-cap evidence;
- the final reviewed mathematical-truth error predicate or bound and the supported-
  platform predicate (the input-specific candidate is not selected for runtime);
- independent review and final selection of the critical-value table and its final
  content hash (the contiguous candidate hash remains evidence-local); and
- the ten support-dependent reason-code decisions, final reason-code freeze, and
  authoritative Public Check revision.

Support will be expressed as machine-testable operation-stage predicates plus a
declared validation corpus and oracle claim. It will not be inferred from a single
rectangular `|t|` bound or from agreement among SciPy, R, and Boost.
