# D5 runtime, projection, and tolerance research adjudication

## Status and scope

This is a non-authoritative candidate-development record for R2-D5. It records how
three independent research handoffs affect the next paired-t candidate increment:

1. a Student-t runtime-procedure investigation;
2. a binary64 target-projection investigation; and
3. a numerical-comparison and tolerance investigation.

The handoffs are research inputs, not Protocol authority. This repository does not
link to, copy from, or depend on a private product repository. A research claim that
has not been reproduced by reviewable artifacts in this repository cannot close
R2-D5.

This record does not freeze a numerical contract, select a supported domain, issue a
Public Check, register a bundle, or change Release 1 behavior.

## Separation used in adjudication

The following ledgers answer different questions and stay separate:

| Ledger                       | Question                                                                 | Candidate state                                      |
| ---------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------- |
| Operation-graph reproduction | Did the implementation execute the pinned binary64 graph?                | Exact bit identity selected for candidate testing    |
| Mathematical-truth error     | How far is the pinned graph result from the exact mathematical target?   | Oracle and analytic bounds remain incomplete         |
| Target-format projection     | Can a positive mathematical probability be represented under the policy? | Normal-only classifier implemented; runtime inactive |

A fixture that reproduces the pinned graph is therefore not, by itself, a truth
anchor. Conversely, an oracle enclosure does not establish that an implementation
executed the pinned graph.

## Candidate directions accepted for continued development

### Exact graph reproduction

Candidate numeric-result comparison uses exact binary64 bit identity after strict
JSON parsing and before any display formatting. This has zero false-accept width for
the graph-reproduction question. It is not a claim of zero mathematical error and is
not a generic cross-implementation tolerance.

The current executable helper rejects non-finite values and negative zero, then
compares the two bit patterns. Cross-runtime closure remains conditional on a later
supported-platform predicate; untested runtimes are not presumed to produce the same
bits.

### Probability target format

The candidate p-value target is a positive normal binary64 value or a projection of
`1`. The classifier checks the target-format class; an oracle enclosure separately
establishes whether the projection is correctly rounded. The classifier keeps four
failures distinct:

- a positive mathematical tail that projects to `+0`;
- a positive subnormal projection, refused by the current policy candidate;
- negative zero; and
- a non-finite, negative, or greater-than-one value.

The candidate does not clamp a positive tail to zero, replace it with the minimum
subnormal, or add a log-p field to the Release 2 surface.

### Runtime-family direction

A rigorously stopped positive-term series is the candidate family for continued
runtime work. The stopping proof uses an a posteriori remainder form based on the
next term and `x / (1 - x)`, with `40 * df + 64` retained only as an evaluation-cap
candidate. The complete operation graph, branch boundary, and cap evidence are not
yet implemented here.

For the candidate bit contract:

- `2 * (1 - CDF)` is excluded because of tail cancellation;
- host `atan` is excluded from the df=1 path because implementation-approximated
  transcendentals do not supply the required bit contract; and
- a continued fraction without a rigorous truncation bound is limited to a
  non-normative divergence probe.

### Evidence ceiling

`df = 200` is the next contiguous evidence-evaluation target. It is not a supported
maximum. The final ceiling requires the complete certified table, runtime-series
evidence, support predicates, resource measurements, and the public-review decision.

### Algebra intermediates and intervals

Subnormal policy remains stage-specific. Research indicates that the ordinary
relative-error model does not cover a subnormal sample variance, but activating a
sample-variance refusal would change the already reviewed first-failure result of
the standard-error-squared-underflow witness. That ordering therefore remains held
instead of being silently changed.

Confidence-interval endpoint collapse remains a candidate refusal. A separate
truth-error and sign-stability bound is still required for endpoints near zero.
Condition-number `kappa` remains diagnostic until either a gate or a direct truth
bound is justified.

## Held decisions

The following choices remain open and are pinned as such by
`numerical-contract-candidate.json`:

- final integer-df ceiling;
- complete runtime series graph and branch boundary;
- `kappa` gate versus direct truth bound;
- supported platform and engine-version matrix;
- the one-cell projection-boundary refusal margin;
- subnormal-intermediate first-failure order and activation;
- confidence-interval sign-stability bound;
- complete critical-value table and final content hash; and
- final public refusal-code spellings.

None of these is inferred from the value `200`, from a passing candidate test, or
from agreement among software libraries.

## Directions rejected for this candidate

The candidate rejects the following as decision bases:

- `2 * (1 - CDF)` in the tail;
- cross-library majority as an oracle;
- a generic ULP tolerance intended to admit arbitrary implementation graphs;
- host `atan` as part of the df=1 bit contract;
- an unbounded continued fraction as the normative runtime route;
- zero clamping or minimum-subnormal substitution for a positive tail; and
- blanket refusal of every subnormal input regardless of stage.

## Closure and reopen conditions

This adjudication advances candidate construction only. Before final R2-D5 closure,
the repository still needs:

- an executable runtime-series candidate and its independent numerical review;
- a contiguous certified critical-value table for the selected df range;
- operation-graph truth-error ledgers, including interval endpoints;
- boundary evidence for projection and subnormal first-failure decisions;
- a supported-platform predicate and cross-platform corpus run;
- a complete support expression and final content hashes; and
- an independent adversarial review of the assembled numerical-contract candidate.

The adjudication reopens if the runtime graph changes, a primary-source result
invalidates the selected family, the platform matrix contradicts exact-bit
reproduction, or new boundary evidence changes a support/refusal decision.
