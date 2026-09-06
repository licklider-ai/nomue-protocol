# Release 4 Factorial and Interaction Semantics Research Commission

**Status: informative research commission; non-normative; not adopted.** This
commission investigates a bounded fixed-effects factorial and interaction programme.
It selects no Profile, Contract, hypothesis, identifier, schema, Public Check,
multiplicity procedure, implementation, or release outcome.

## Independence and fixed inputs

Assign this work to an investigator independent of any future Release 4 semantic or
numerical implementation. The execution issue must pin:

- the containing repository commit and tree;
- this commission's exact blob;
- the Release 4 preparation README blob;
- the current Release 3 semantic result and its preserved independent reviews; and
- every later Release 3 result used as an input.

Read `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `governance/RFC.md`, the release
horizon, the research frontier map, and the pinned preparation files. Private
repositories are outside scope. Verify every Git identity before source work.

Directly inspect primary methodological sources. An official handbook or software
documentation may provide an authoritative cross-check for its own definitions and
implementation, but it does not replace the original methodological basis. Search
snippets, model memory, textbooks, and agreement among software packages are not
decision-bearing evidence.

## Bounded question

Can a first Release 4 vertical slice represent and recompute fixed-effects factorial
main-effect and interaction inference with an unambiguous estimand, design, member
set, error term, output class, and refusal boundary? Is the complete balanced
replicated `2 × 2` design a defensible first Contract, and which broader candidates
must be staged, split, narrowed, transferred, or rejected?

## Candidate set

Evaluate every Candidate A through D in the preparation README. Do not silently add
unbalanced, missing-cell, fractional, random/mixed, repeated, clustered, blocked,
covariate-adjusted, transformed, stochastic, or model-selection behavior to Candidate
A. A newly discovered material variant is catalogued with its own identity and
disposition.

## Questions to answer

1. What population or finite-population quantity does each factor main effect target,
   and over which declared distribution or weights of the other factor is it averaged?
2. What exact interaction null is tested in a balanced `2 × 2` design, how does its
   sign depend on factor-level order, and which relabellings preserve the hypothesis
   while changing a reported signed contrast?
3. Which claims require randomized assignment, and which statements remain valid as
   descriptive or model-based inference for non-randomized data? Prevent a design
   label from creating an unsupported causal claim.
4. Which experimental-unit, independent-unit, factor-level, cell-membership,
   replication, equal-cell-count, analysis-population, and outcome declarations are
   necessary? Distinguish replication from repeated measurements and technical
   replicates.
5. What common-variance, normal-error, independence, fixed-factor, complete-design,
   and model assumptions belong to the Contract, and which are input-checkable versus
   declared or outside verification?
6. Which numerator and denominator degrees of freedom and sums-of-squares identities
   are justified for Candidate A? State whether the three effect sums of squares and
   residual sum of squares form the relevant orthogonal decomposition.
7. Does a main-effect test retain the same scientific interpretation when interaction
   is present? Which hierarchy or heredity rules are scientific guidance, selection
   policies, or Contract requirements rather than mathematical necessities?
8. Are simple effects, cell-mean comparisons, planned contrasts, post-hoc contrasts,
   and interaction decomposition part of Candidate A, separate Contracts, or later
   work? Each protected member set and selection timing must be explicit.
9. Does reporting all three F tests create one multiplicity family? Separate three
   marginal test outputs from any FWER/FDR guarantee, and identify the exact
   procedure needed for a joint claim.
10. Which effect estimates and confidence intervals are coherent with each tested
    hypothesis? Standardized effect sizes remain outside this commission.
11. For arbitrary `a × b` balance, what meanings and output shapes differ from `2 ×
2`, and does that change justify a distinct Contract or staged revision?
12. For unbalanced designs, enumerate the distinct hypotheses induced by sequential,
    partial, marginal, or estimable-function definitions commonly labelled Type I,
    II, III, or IV. Decide whether any one is sufficiently portable for Candidate C;
    never call software-default agreement scientific consensus.
13. What becomes non-estimable with empty cells, no replication, aliasing, or rank
    deficiency? Define refusals without choosing a generalized inverse silently.
14. Which source-bounded Release 3 claim-family and multiplicity findings transfer to
    factorial member sets, and which one-way assumptions do not?
15. Which findings are reusable by later multi-factor, repeated, mixed-model,
    regression, or multiple-endpoint Contracts, within what limits?

## Required falsification cases

Attempt to break each proposed meaning with at least:

- level-order reversal for either factor;
- row/column exchange and outcome-unit-preserving data permutation;
- a large interaction with zero averaged main effects;
- large main effects with zero interaction;
- equal cell means and nonzero within-cell variance;
- unequal cell counts that would leave Candidate A;
- a missing cell, one unit per cell, a duplicated unit, and a unit assigned to two
  cells;
- repeated measurements mislabelled as independent replication;
- a non-randomized factorial layout presented with a causal conclusion;
- three unadjusted effect tests presented as one familywise guarantee; and
- two software systems producing different unbalanced-design hypotheses under the
  same informal label.

## Required catalogue and dispositions

Produce a finite entry catalogue. At minimum give separate entries to:

- `2 × 2` main effect A, main effect B, and A-by-B interaction;
- the joint three-effect family, if a protected-family claim is considered;
- simple effects and planned interaction contrasts;
- balanced general `a × b` main effects and interaction;
- every materially distinct unbalanced hypothesis family;
- no-replication, empty-cell, fractional/aliased, random/mixed, repeated/clustered,
  blocked, covariate-adjusted, and heteroscedastic/randomization variants; and
- effect-estimation and interval outputs that are not identical to test procedures.

Assign one disposition per entry: `R4-CANDIDATE`, `RESEARCH_ONLY`, `TRANSFER`,
`REJECT`, `INPUT_INCOMPLETE`, or `NO_GO`. Give one programme disposition:
`SEMANTIC_PROGRAM_READY`, `NARROW`, `DEFER`, `NO_GO`, or `INPUT_INCOMPLETE`.
`SEMANTIC_PROGRAM_READY` means only that the public question is source-backed and
bounded; it does not adopt the catalogue or authorize implementation.

## Required source record

For every decision-bearing source, record complete bibliographic identity,
acquisition route, inspection date, artifact SHA-256, exact printed page, section,
theorem, table, or equation, and its role. Keep source-established facts,
investigator inference, proposed project convention, conflicts, and unresolved gaps
in separate sections. Identify superseded editions and material disagreement.

If a required primary text cannot be identified or inspected, return
`INPUT_INCOMPLETE` for the affected entry and for the programme when the missing text
prevents a bounded public question. Do not fill it from memory or a software default.

## Required output and review

Write one English report at:

`governance/drafts/release-4-preparation/semantic-research-result.md`

The report must include repository/source identity, search and inclusion method,
source facts, inference, conventions, conflicts, the complete catalogue and
dispositions, candidate declarations and result classes, refusal boundaries,
Release 3 reuse, later-release handoff, reopen conditions, and final programme
disposition.

Change only the required result file. Do not modify this commission, the preparation
README, Release 3 artifacts, authoritative files, registries, schemas, conformance,
reference code, or generated files. Run formatting, Markdown lint, type checking,
and direct repository validation. Open a pull request and do not merge it. Require a
separate-context exact-head primary-source review before any result informs the RFC.
