# Release 4 programme adversarial self-audit

Date: 2026-09-09. Role: preparation author performing adversarial self-review
with OpenAI Codex assistance. This is not an independent investigator or
primary-source review and supplies no independent GO or gate closure.

## Inputs, scope and method

Repository main was resolved as `cd217f88238a2ecc57b72f5835a813d92270f5ad`.
The working input is PR 223 at `68a8726ea564a88fe3663dfd84bfde8c4550d6e6`.
The previous reviewed input remains `ed7bfeb9f9ca2cee6e8766e90d9ee6a5091cb68b`.
The two-sentence successor repair has not yet received independent closure.
Live PR metadata confirmed the following unmerged research/review heads:

| Input                      | Commit                                     | Inspected result blob                      |
| -------------------------- | ------------------------------------------ | ------------------------------------------ |
| Semantic catalogue, PR 181 | `a2687f10719b399dafb511999cc1ef5b406a0c02` | `f70e89e995b0ec88d61d1a7eddf681ddb6d454b3` |
| Numerical research, PR 190 | `5962cc2def5b1aca7e30d219f12a9a6486ca7b11` | `200296de5745a3bc7087de4d924e1759f4c0f84e` |
| Repair review, PR 225      | `f505a1f06a4f36500ec8d88895821c41e2c1820b` | `28aa4f8dcefe5bc0285c65c6374a5ae5040b2bbe` |

The PR 191 metadata still identifies head
`2e3698ba32c0dae6dcd07ab8c71272d990fbaf49`. Its earlier recorded independence
question is retained, not adjudicated from metadata. Immutable research inputs
are not silently updated by this audit. All PR 225 review bytes are preserved
in the corresponding review-inputs path, including observations qualified below.

Read scope includes the preparation README, both commissions, semantic source and
ambiguity ledger and catalogue, numerical algebra/graph/oracle and reuse limits,
QR acceptance intake, SS/F script/result/supplement, readiness, RFC preparation,
impact inventory, source follow-up, and the returned review findings. Governance
and owning versioning, public-check and refusal clauses were used to test the
proposal's claims. The source paper contents were not newly obtained or reviewed.
Historical Release 3 reuse is checked as a conditional dependency, not a live
certification of unrelated Release 3 research branches.

Attack questions: can a reader mistake a local GO for release support, overlook
a source ambiguity, generalize a specialized oracle, infer a domain from finite
inputs, copy a legacy identity or old tolerance, assign Contract meaning to a
Profile prematurely, or silently waive an unexecuted comparison?

## Findings and author repairs

| Finding                                                                       | Evidence and consequence                                                                                                                               | Action                                                                                                                                                               |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1: stale status and fragmented navigation                                    | Readiness still said independent review pending/no review, despite returned numerical/editorial/repair reviews; original start sequence looked current | Add exact-input review index, preserve limits, link current readiness from README and label original sequence historical; remove conversational percentage           |
| A2: compressed source ledger omitted important ambiguities                    | S1/S5 dominated summaries while S2 and the P1 date/version/formula mismatch were absent from the actionable overview                                   | Add complete S1-S6 and P1 map; require claim-specific original support, not a mandatory single named paper                                                           |
| A3: numerical feasibility overview omitted specialization and evidence limits | PR 190 tail routes have numerator df 1 and positive even residual df; toy manifest inequality does not test a certificate verifier                     | Add precise oracle-domain and trace/support limits; keep numerical programme incomplete                                                                              |
| A4: placement inventory could imply an unresolved architecture choice         | Statistical semantics were placed only under proposed Profile paths; Contract/Profile allocation and several existing constraints were missing         | Explicitly leave split/path allocation open under ADR-0032, list additional inspected clauses, token registration, schema version and surface applicability work     |
| A5: current preparation retained known factual labels                         | README called Williams's 1952 paper Tukey's; numerical commission called both B/C unbalanced                                                           | Correct author attribution and distinguish general balanced B from unbalanced C; old pinned commission/result inputs remain unchanged                                |
| A6: the finite SS/F corpus was insufficient to assess scale safety            | Three exact power-of-two scale cases below produce NaN on all graphs at the extreme scales                                                             | Add separate reproducible boundary evidence and explicit remaining computability decision; do not patch the historical graph into an unreviewed production algorithm |

A1-A5 are preparation defects repaired by this author-side change. A6 is a
confirmed limitation of disposable candidate graphs outside their original
corpus, not a failure of an issued Protocol implementation. No supported-domain
or numerical-completion claim existed to revoke. There is no blanket programme
GO: source, semantic handoff, numerical feasibility, final allocation and
assembled opening review remain unfinished.

## Scale boundary reproduction

Run from repository root:

```sh
python governance/drafts/release-4-preparation/probes/scale-boundary-audit.py
```

The new script loads the unchanged original probe, reproduces its corpus and
calls its exact and floating routines. It reuses author code and is not an
independent oracle. A separately stated elementary fixture supplies the expected
values: four cells are `[-0.5,0.5]`, `[1.5,2.5]`, `[3.5,4.5]`, `[7.5,8.5]`.
Their means are 0,2,4,8, within-cell SSE is 2, residual df is 4, and the effect
SS are 50,18,2. Thus F is 100,36,4. This is algebra, not F calibration.
The script checks that multiplying by each exact power of two changes no input
through conversion. Scaling squares both SS and SSE and leaves these ratios
unchanged; positive exact SSE is asserted in all cases.

| Scale  | Exact F values | Observed all-three-route behavior in this environment       |
| ------ | -------------- | ----------------------------------------------------------- |
| 1      | 100, 36, 4     | Finite results; QR variants have small rounding differences |
| 2^-600 | 100, 36, 4     | SS and SSE underflow to zero; F values are NaN              |
| 2^600  | 100, 36, 4     | SS and SSE overflow to infinity; F values are NaN           |

All input values are finite and exactly representable. This is not the same
case as mathematically zero residual variance. A policy that examines only a
rounded SSE without distinguishing arithmetic failure can confuse the two.
No automatic scaling, threshold, refusal code or allowed magnitude is selected.

Execution: CPython 3.12.14, NumPy 2.3.5, default threading; full NumPy build
configuration and script/input hashes are in
[the recorded JSON](probes/scale-boundary-audit-result.json).
The original corpus digest reproduced as
`558b6e65da273bf836204f7d0f5b4bae08cfd85918a23374a475197c2e851ca3`.
The original probe and result file are unchanged from the reviewed inputs.
The new JSON is a new self-audit observation, not a revised old transcript.

## Preserved-review counting qualification

The PR 218 independent review's Section 5.3 says all 8505 evaluated values were
finite. In its full SS/SSE/F context that count is incomplete: 8505 is the
three-route F count alone. There are 2835 SS + 945 SSE + 2835 F values per route,
or 19845 quantity values across three routes, excluding diagnostics. The
original summary fields provide these totals. The old review is preserved
verbatim; this audit corrects the interpretation, not its independent verdict
or any of its 54 metrics. Review this counting qualification independently if
it is later used in an acceptance record.

## Remaining substantive work and exit conditions

1. Complete claim-specific original semantic support, including the P1 ambiguity
   and S2 role; obtain the independent semantic handoff. Lawful source substitution
   is possible only with an explicit evidence mapping and separate review.
2. Bind numerical feasibility to that handoff, covering chosen quantities, df,
   graph/true-value/projection/comparison distinctions, scaling, zero residual,
   tail endpoints, precision and resource hazards. Keep every unsupported step
   explicit. The new three-case probe does not supply a global bound.
3. Resolve Contract/Profile roles, namespace tokens, new clauses/IDs, exact schema
   versions, public-surface applicability and highest affected tier for R4-P5.
   Existing Phase 1 clauses are not widened in place by analogy.
4. Preserve S6 until the commissioned two-system test is done or its pre-opening
   necessity is explicitly bounded for the chosen proposal; no algebraic toy is
   relabelled as two-system execution. Keep Release 3 reuse conditional by exact scope.
5. Assemble the proposal and obtain independent pre-opening review. Opening,
   adoption, implementation support and release publication remain separate acts.

A follow-up reviewer can start from the branch
`research/r4-programme-adversarial-audit`, resolve it once and record full head,
parent, tree and blobs. Expected parent is `68a8726ea564a88fe3663dfd84bfde8c4550d6e6`.
Review A1-A6 across all changed documents, reconstruct the scale fixture without
the submitted exact routine, verify review/probe preservation and original corpus
digest, and adjudicate the remaining hold map without inventing source closure.
Also close-check the preceding SF-R1/SF-R2 wording if qualified to do so; this
author has not done an independent close review. Return a bounded review record
on a neutral branch and draft PR; do not merge, allocate IDs or open discussion.

## Validation

The scale diagnostic ran successfully and reproduced the original 945-case corpus
hash on the recorded environment. Repository formatting, Markdown lint, typecheck,
validation, diff whitespace and byte-preservation checks are recorded in the PR
body after execution. No authoritative, production, historical numerical or
Release 3 artifact is changed. The full authoritative-change test gate is not
triggered by this informative research increment.

## Post-review qualifications

The [independent review](../../../review-inputs/r4-programme-audit/REVIEW-RESULT.md)
at `510cad76132b1d18d581da581fe9c1ee162c8b59` reports bounded GO on the prior
fixed audit input `f01b870bdce4e051476e4b74d56b4deb4217307e`. This appended
qualification is later author-side text, not part of that reviewed input.

At scale 2^-600, the exact SS/SSE targets are below half the smallest binary64
subnormal; at scale 2^600 they exceed the finite binary64 range. Under
round-to-nearest with overflow to infinity, zero and infinity are the respective
projections of those targets. Exact F remains 100, 36, 4 and is representable;
forming F from already projected SS/MSE encounters 0/0 or inf/inf. A future
computability decision therefore concerns output representation as well as graph
choice; this does not choose either one.

The submitted graph uses NumPy float64 division under its stated errstate.
Pure Python float division raises ZeroDivisionError for 0.0/0.0, whereas
float infinity divided by float infinity returns NaN. The division type and
error handling matter; the tiny-scale and huge-scale cases are not identical
exception cases. No refusal semantics is adopted here.

The original summary's nonfinite metric is zero in all nine route/quantity cells.
Thus all 19845 SS/SSE/F quantity values in that original corpus are finite, not
only its 8505 F values. The separate scale witnesses do not belong to that corpus.
