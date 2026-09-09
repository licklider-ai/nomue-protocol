# Release 4 Factorial Numerical Reuse and Oracle Commission

**Status: informative research commission; non-normative; not adopted.** This
commission evaluates numerical feasibility for the bounded Release 4 factorial
candidates and the exact limits of Release 3 reuse. It selects no operation graph,
table, tolerance, platform, support domain, Public Check, implementation, or release
outcome.

## Independence and sequencing

Assign this work to an investigator independent of future Release 4 numerical
implementation and independent of the semantic investigator where practical. The
execution issue must pin the containing commit, this commission, the preparation
README, the reviewed semantic result when available, and each Release 3 result used.

Preliminary reuse analysis and self-contained probes may begin before the semantic
result. A final numerical disposition requires the reviewed semantic catalogue and
may cover only its exact hypotheses, outputs, design boundary, and degrees of freedom.
Release 3 candidates are precedent to test, not Release 4 authority.

Directly inspect primary numerical literature, standards, or authoritative upstream
documentation. Two agreeing libraries do not establish mathematical truth or a
portable operation graph.

## Bounded question

Can every numerical quantity required by the leading complete balanced replicated
`2 × 2` fixed-effects candidate be recomputed deterministically from admitted cell
observations with independently certified truth/projection evidence and bounded
resources? Which parts of Release 3's F-distribution and multiplicity work transfer
unchanged in principle, and which require a new factorial-specific graph or proof?

## Questions to answer

1. Give the exact input algebra from four cells to cell counts, sums, means,
   within-cell residual sum of squares, main-effect and interaction contrasts, effect
   sums of squares, mean squares, F statistics, and degrees of freedom.
2. Identify every operation whose evaluation order changes binary64 output. Compare
   direct cell-contrast, orthogonal coded-design, and full least-squares routes without
   silently choosing one.
3. State the normal-arithmetic, overflow, underflow, cancellation, exact-integer,
   zero-variance, and representational preconditions of each graph.
4. Determine whether one F-tail procedure can serve all three Candidate A tests when
   numerator degrees of freedom equal one, and which parts change for general `a × b`.
5. Separate mathematical-truth error, graph reproduction, target-format projection,
   declared-result comparison, and decision-threshold comparison for every quantity.
6. Determine when test/interval duality is exact for the reported contrasts and when
   interval construction needs additional critical values or multiplicity semantics.
7. If all three tests are reported, evaluate the exact arithmetic and ordering rules
   for any candidate adjustment without treating unadjusted outputs as familywise
   control.
8. Give independent oracle routes for algebra, F tails/quantiles, intervals, and any
   adjustment. Identify what can reuse an accepted Release 3 certificate and what
   requires new parameters, domains, or tables.
9. Derive resource formulas from factor levels, cell counts, trace nodes, precision,
   and iterations. A finite corpus maximum is not a global bound.
10. Define a supported-execution evidence strategy and exact platform/build/process
    admission boundary without copying a Release 3 allowlist.
11. Determine whether general balanced Candidate B and unbalanced Candidate C require
    matrix-rank, pivoting,
    generalized-inverse, or iterative behavior that creates distinct numerical
    Contracts or a defer disposition.
12. Identify which factorial numerical results can later serve higher-factor,
    regression, blocked, repeated, or mixed-model work, and state the non-reusable
    assumptions.

## Required probes

At minimum include independently generated cases for:

- every integer cell count from the proposed minimum through a justified preliminary
  ceiling, without converting the largest tested case into a support bound;
- exact zero for each main effect and interaction separately;
- near-zero and near-critical F statistics on both sides of projection transitions;
- equal observations, zero residual variance, one unit per cell, duplicated units,
  unequal cell counts, a missing cell, non-finite input, signed zero, and extreme
  finite magnitudes;
- factor-level reversal, factor exchange, observation permutation, outcome sign
  reversal, exact power-of-two scaling, and common translation where mathematically
  applicable;
- algebraically equivalent graphs whose binary64 outputs differ;
- far F tails, subnormal and zero projections, quantile boundaries, and threshold
  equality; and
- trace, table, certificate, resource, environment, and declared-result tampering.

Use at least two implementation-independent routes where feasible, including exact
rational arithmetic for algebra and an arbitrary-precision or rigorous enclosure
route for F probabilities. Record versions, hashes, precision, convergence or
enclosure evidence, and all failed routes.

## Required coverage and dispositions

Cover every implementation candidate in the reviewed semantic catalogue. Give each
one a numerical family, required graph, oracle strategy, support hazards, and one
disposition: `NUMERIC_FEASIBLE`, `ORACLE_ONLY`, `DEFER`, `NO_GO`, or
`INPUT_INCOMPLETE`. Give one programme disposition:
`NUMERIC_PROGRAM_READY`, `NARROW`, `DEFER`, `NO_GO`, or `INPUT_INCOMPLETE`.

`NUMERIC_PROGRAM_READY` means that each semantic implementation candidate has a
feasible evidence path or an explicit blocking hold. It does not select that path,
establish support, or authorize implementation.

## Required output and review

Write one English report at:

`governance/drafts/release-4-preparation/numerical-research-result.md`

The report must contain exact repository/source identity, directly established facts,
inference, a complete coverage matrix, graph alternatives, independent oracle plans,
projection and error ledgers, resource and supported-execution plans, adversarial
corpora, Release 3 reuse and non-reuse, blockers, reopen conditions, and dispositions.

Change only the required result file. Do not modify this commission, the preparation
README, Release 3 artifacts, authoritative files, registries, schemas, conformance,
reference implementation, or generated files. Run formatting, Markdown lint, type
checking, and direct repository validation. Open a pull request and do not merge it.
Require a separate-context exact-head primary-source and numerical review before the
result informs an RFC, design freeze, or implementation.
