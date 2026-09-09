# Release 4 numerical feasibility workplan

Status: informative author-side planning, 2026-09-09; no condition is closed.
Baseline: `f01b870bdce4e051476e4b74d56b4deb4217307e` (PR 227).
This expands R4-P3 into reviewable work without selecting a production algorithm.
Read [current readiness](public-discussion-readiness.md) and
[the programme audit](programme-self-audit-2026-09-09.md) for evidence and source limits.

## Distinct questions

For each proposed quantity, distinguish the exact mathematical target on the
declared binary64 inputs, a floating operation graph, projection into the proposed
output representation, and a public comparison rule. Agreement between two graphs
does not establish the exact target; a correctly rounded target does not choose a
comparison tolerance. Distributional calibration is a separate source question.

The following are work descriptions, not Requirement IDs or a new gate registry.
Each output is an informative research record until separately reviewed and adopted.

| Work                      | Existing evidence                                                     | Next concrete output                                                                 | Completion evidence for this work                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Signed estimates and SS   | Reviewed 945-case SS/F record; normalization proposal                 | Crosswalk from each declared estimand to coefficient, SS and factor-order convention | Independently checked equations, input assumptions and sign/normalization transformations; source ambiguities explicitly resolved or held                       |
| Residual and F arithmetic | Finite corpus, zero-residual diagnostics, three scale witnesses       | Case table separating exact positive SSE, exact zero SSE, rounded zero and overflow  | Independently derived witnesses and graph observations; no conflation of arithmetic failure with a mathematical zero residual                                   |
| Scale strategy            | All three old graphs fail at the two extreme scales                   | Compare bounded admission and rescaled computation as alternatives                   | Exact target invariance, input-conversion effects, underflow/overflow and mixed-scale counterexamples assessed; no claim of a global bound from a finite corpus |
| Tail evaluation           | PR 190 exploratory numerator-df-one, positive-even-residual-df routes | Domain table for the proposed F inputs, endpoints and resource limits                | Exact parameter guards; documented F=0, large-F, probability-underflow and projection behavior; independent numerical review before promotion                   |
| Critical values           | Exploratory brackets                                                  | Evidence map for any retained inverse operation                                      | Bracket validity, stopping rule, precision/resource limit and projection assessed; a bracket is not a complete quantile implementation                          |
| Intervals                 | Inclusion and construction undecided                                  | Explicit include/defer decision with dependencies                                    | If included, source-backed pointwise/simultaneous meaning, level, normalization, endpoints and rounding reviewed; no inference from test/interval duality alone |
| Comparisons and execution | Toy controls only; environment dependence observed                    | Proposed graph/target/projection/comparison contract and workload study              | Tolerance rationale independent of observed maximum error; supported runtime and rejection ordering justified; real trace checks if trace support is claimed    |

PR 190 here means input `5962cc2def5b1aca7e30d219f12a9a6486ca7b11`,
not a subsequently moving branch. Its oracle specialization covers a parameter
shape relevant to Candidate A, not general balanced Candidate B. Numerical
feasibility does not establish the normal-model F null distribution.

## Scale investigation specification

First reproduce the existing fixture without importing the author's exact routine:
cell means 0, 2, 4, 8, two observations per cell at mean plus/minus 0.5.
Exact SSE is 2, residual df is 4, SS values are 50, 18, 2, and F values are
100, 36, 4. Uniform scales 1, 2^-600 and 2^600 preserve those F ratios.

A subsequent disposable investigation can compare the unchanged graphs with
explicit rescaling experiments. Record the transformation and its rounding before
interpreting an apparent repair. Include these adversarial families:

- Uniform scale, where inputs remain exactly representable, to isolate squared
  intermediate failure.
- Large common offset with small representable deviations, to separate
  cancellation from scale failure.
- Mixed magnitudes and subnormal deviations, where a common rescaling may erase
  input information; do not assume power-of-two rescaling is always exact.
- Exact zero residual and exact zero effect controls, assessed separately from
  rounded zeros and from positive exact values too small for output projection.

Report exact input rationals, transformation losses, SS/SSE/F targets, floating
outputs including nonfinite values, and operation/environment provenance. Preserve
the original corpus and transcript. A successful rescaling witness establishes
only that witness; it does not select the supported domain or a refusal policy.

## Sequencing and discussion boundary

Independent review of PR 227 and the preceding two wording repairs can proceed
now using [the pinned handoff](programme-review-handoff.md). Algebraic and
computability exploration can proceed alongside source acquisition, provided it
does not claim statistical calibration or promote an algorithm.

After the semantic handoff fixes the retained claims, bind each row above to that
exact scope. For public discussion, unresolved runtime proofs can remain explicit
implementation holds where the preparation process permits; unsupported retained
scientific claims cannot. Ask the assembled opening reviewer to assess the adequacy
of the evidence map rather than treating this workplan as a completion certificate.
R4-P5 artifact allocation and R4-P6 assembled review remain separate work.

Prepared with OpenAI Codex assistance in the existing authoring context. This
document adds no independent derivation, new experiment, source acquisition or
review verdict. It preserves Release 3 dependencies as conditional.
