# Release 2 Paired-t Numerical Candidate

**Status: non-authoritative, unissued, and not numerically frozen.** The Steward has
approved this direction for continued candidate development. That approval does not
complete R2-D5, end the open RFC review, issue a Public Check, register a supported
bundle, or select final support bounds and mathematical-truth error bounds.

The machine-readable checkpoint is `evidence-readiness.json`. It now records the
p-value and fixed-95-percent critical-value evidence as independently reviewed and
complete for candidate readiness, together with the reviewed M3 confidence-interval
numerical closure. These are evidence and candidate-integration results, not support
or issuance decisions. A passing structural validator test is not an oracle result.

## R2-D5 closure-gap checkpoint

`r2-d5-closure-gap-candidate.json` is a source-bound dependency inventory for the
work remaining after M2 and M3 closure. It does not replace the aggregate readiness
checkpoint, alter an earlier review result, or close R2-D5. It distinguishes old
dependency labels that were resolved by the reviewed M2/M3 and platform-research
work from the support-dependent conditions that remain open.

The remaining work is ordered as candidate scope and resource bounds, runtime
numerical-contract and full-trace-predicate selection, supported-execution admission,
final reason-code inventory, and final exact-head R2-D5 review and Steward
disposition. This ordering prevents admission evidence from being collected against
an incomplete graph and prevents public reason codes from being frozen before their
support boundaries exist.

The checkpoint selects none of those outputs. The runtime allowlist is empty, the
controlled-process profile is unenforced, comparison tolerances and supported bounds
remain null, support and runtime remain false, and Public Check and bundle issuance
remain separate later work. A global truth-error constant is not required for the
reviewed pointwise candidate form. Finite evidence and evaluation values remain
ineligible for promotion to global or supported bounds. Independent review is defined
by `../reviews/d5-r2-d5-closure-gap-adversarial-review-protocol.md`.

## Candidate scope and resource-bound selection

`candidate-supported-scope-resource-bounds-candidate.json` is the first successor
increment for the ordered closure-gap inventory. It selects a candidate Group 1
scope and resource envelope. Its exact-head independent review returned `GO` with no
findings, and the byte-identical review result is preserved on `main`; Group 1 is
therefore closed as a non-authoritative candidate-selection milestone. It does not
establish an authoritative supported domain, activate runtime support, or choose a
platform.

The pair-count candidate is `2..201`, with the exact paired-t relation
`df = n_pairs - 1`, so the candidate df range is `1..200`. The selection is based on
the complete reviewed `df = 1..200` extents of both the tail and fixed-95 table
candidates joined to that relation. It is not a promotion of the largest value in a
finite corpus. Parsed outcomes must be finite binary64 values after strict ingress;
negative zero is outside the candidate scope. No scalar magnitude box is selected.
The numerical scope remains the conjunction of the reviewed operation-stage
predicates, same-trace truth checks, and strict pointwise projection margin.

The G4 primitive trace has the reviewed exact size `5 * n_pairs + 3`, selecting a
maximum of `1,008` at 201 pairs. The older 2,048-node value remains an evaluation
ceiling, not the selected bound. The tail candidate deliberately selects the existing
reviewed fail-closed 100,000-node ceiling and the iteration cap `40 * df + 64`, whose
maximum is `8,064`; 100,000 is a design ceiling, not the observed 72,567-node corpus
maximum. The confidence-interval trace contributes exactly three specific primitive
nodes. The component envelope is therefore `1,008 + 100,000 + 3 = 101,011` primitive
nodes. Reaching a cap or exceeding a selected ceiling fails closed without a support
claim.

`candidate-supported-scope-resource-corpus.json` binds the reviewed operation-stage,
tail-truth, and projection-transition corpora; exercises every pair count from 2
through 201; checks the known 5,182-iteration/72,567-node witness at its resource
edge; and declares permutation, direction, sign, exact power-of-two scale, and common
translation metamorphisms. This finite corpus is executable review material, not a
domain definition or universal proof. Inputs outside it still require the same
per-input operation, trace, truth, and projection checks.

The successor also records the closure-gap review's editorial clarification without
rewriting the reviewed predecessor: the historical label
`closure_candidate_independent_review_platform_and_final_selection_pending` appears
literally in `support-domain-candidate.json`, while
`truth-error-support-closure-candidate.json` is the later checkpoint that resolved
the numerical part of that dependency. Group 2 graph/oracle selection, platform
admission, final reason codes, Public Check/bundle issuance, R2-D5, and Release 2 all
remain open. The review identity and preservation merge are pinned by the candidate
checkpoint and aggregate readiness overlay; changing any of them fails closed.

## Runtime numerical-contract full-trace candidate

`runtime-numerical-contract-full-trace-candidate.json` is the Group 2 successor
increment. It selects one non-authoritative candidate numerical contract and one
executable full-trace predicate. Its exact-head independent numerical review returned
`GO` with no findings, and the byte-identical review result is preserved on `main`;
Group 2 is therefore closed as a non-authoritative candidate-selection milestone. The
candidate composes the reviewed G4 actual trace and exact-rational truth envelope,
the reviewed tail actual trace and input-specific truth/projection proof, the selected
fixed-95 confidence-interval trace and same-trace endpoint-truth envelope, and the
closed Group 1 resource envelope.

The executable envelope requires the tail and confidence-interval paths to contain
the identical verified G4 trace. It binds the returned p-value and interval endpoint
bits to their component traces, pins the reviewed tail and fixed-95 table hashes,
reconstructs the Group 1 resource accounting, and verifies every nested component
before accepting. Its outer digest uses recursively key-sorted canonical JSON, so
object-key order is non-semantic while array order and all values remain pinned.

The reviewed selection remains only a candidate Group 2 graph, table, truth,
projection, and full-trace contract; the numerical contract is not authoritative or
frozen. Platform/build/runtime allowlisting, controlled-process enforcement, and
full supported-execution admission are the next open Group 3 decision. No supported
domain, runtime support, comparison tolerance, global truth-error constant, final
reason-code inventory, Public Check, bundle, RFC disposition, R2-D5 completion, or
Release 2 completion is claimed. The review identity and preservation merge are
pinned by the candidate checkpoint and aggregate readiness overlay; changing any of
them fails closed.

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

## G4 actual-execution trace candidate

`g4-execution-trace-candidate.json` and
`tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts` apply the actual-trace
pattern to the upstream G4 paired-data graph. They do not replace or modify
`reference/spikes/paired-t.ts`. The candidate accepts the same explicit paired
observations, performs the same canonical pair ordering and fixed recursive
floor-half reductions, and binds the paired differences, mean difference, sample
variance, standard error, test statistic, and integer degrees of freedom to one
immutable trace.

Each node records its unique sequence, deterministic operation label, operand source
sequences, operand binary64 bits, and result bits. Pair subtraction, both pairwise
sums, mean division, centering, squaring, sample-variance division, standard-error
division and square root, and the final t division are all traced. The candidate
reuses the exact binary64 primitive verifier from the independently reviewed
tail-only supported-execution candidate. Before reporting a candidate success, the
trace verifier re-executes the deterministic schedule from the trace-bound canonical
input, checks every primitive, and requires exact structural, source, result, and
digest agreement. Returned values are then read from that same verified trace.

The implementation has completed its bounded independent adversarial-review cycle.
The initial review found exactly two refusal-classification blockers: a later pair
could preempt an earlier `DIFFERENCE_OVERFLOW`, and non-root reduction overflow could
be misclassified as primitive-verification failure. The accepted repair restored the
reference graph's first-failure order and graph-level overflow classifications. A
fixed close-only review returned `CLOSED` with no repair-induced findings. The
bounded disposition is recorded in
`../reviews/d5-g4-execution-trace-adversarial-review-disposition.md`.

The current ceilings of 201 pairs and 2,048 trace nodes remain evidence-evaluation
limits only and are mechanically marked as not being supported resource bounds. The
G4 trace is now connected to the reviewed Student-t tail trace by
`g4-tail-trace-composition-candidate.json` and
`tooling/src/spikes/paired-t-g4-tail-trace-composition-candidate.ts`. The composition
starts from raw paired observations, re-verifies both nested traces, requires exact
bit-level equality of the G4 test statistic and integer df at the tail handoff, and
binds the returned p-value to the verified tail outcome. Its independent adversarial
review returned `GO` with no findings; the bounded disposition is recorded in
`../reviews/d5-g4-tail-trace-composition-adversarial-review-disposition.md`.

The actual-execution composition review requirement is closed. A separate
`g4-truth-error-candidate.json` now binds exact truth intervals and exact-rational
absolute-error bounds to the verified G4 trace. Its independent adversarial review
used a separately constructed exact-arithmetic oracle and returned `GO` with no
findings after 568 reviewer checks. The bounded disposition is recorded in
`../reviews/d5-g4-truth-error-adversarial-review-disposition.md`.

This closes the G4 mathematical-truth error readiness requirement for the trace-bound
paired differences, mean, sample variance, standard error, and test statistic. The
subsequent reviewed M2 integration closes Student-t tail numerical readiness, and the
reviewed M3 integration closes the fixed-95 confidence-interval numerical readiness
chain using PR #108 as its sole endpoint-truth candidate. Their truth-error
guarantees remain input-specific, and the milestones remain unissued and
non-authoritative. They do not select a global error constant, supported execution,
platform, df range, domain, runtime, Public Check, bundle, final R2-D5 disposition,
or Release 2 completion.

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
activates support. The implementation passed independent adversarial review, and a
close-only Section H supplement reproduced the platform-neutral trace and proof
projection across a fixed five-runner set. Those results close the candidate review,
not cross-platform admission. Selection of an exact runtime/build/platform allowlist,
controlled-process enforcement, selection of a supported trace resource bound, and
complete admission evidence for every proposed tuple remain open. The candidate is
limited to the table-connected tail graph that accepts `(df, t)`. The upstream G4
data-to-statistic trace and this tail trace are now joined by the separately reviewed
G4-to-tail actual-execution composition candidate, but that composition does not
select or certify a supported platform, execution predicate, domain, or runtime. The
commission, research disposition, implementation-review disposition, and composition
disposition are recorded in
`../reviews/d5-supported-platform-primary-source-research-commission.md`,
`../reviews/d5-supported-platform-primary-source-research-disposition.md`,
`../reviews/d5-supported-execution-predicate-adversarial-review-disposition.md`, and
`../reviews/d5-g4-tail-trace-composition-adversarial-review-disposition.md`.

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

- the authoritative maximum supported pair count or integer degrees of freedom
  (`201` pairs / `df = 200` is only the Group 1 candidate pending review);
- the supported input, variance, standard-error, statistic, and p-value domain;
- whether any subnormal stage is supported through target-format-aware evidence or
  refused;
- final runtime selection of the reviewed Student-t operation graph, stopping rule,
  input-specific mathematical-truth predicate, and supported resource boundary;
- full-graph supported-execution composition, exact runtime/build/platform admission,
  and controlled-process enforcement;
- final Protocol selection of the reviewed critical-value table bytes and content
  hash (the M3 selection remains limited to candidate confidence-interval work); and
- the ten support-dependent reason-code decisions, final reason-code freeze, and
  authoritative Public Check revision.

Support will be expressed as machine-testable operation-stage predicates plus a
declared validation corpus and oracle claim. It will not be inferred from a single
rectangular `|t|` bound or from agreement among SciPy, R, and Boost.
