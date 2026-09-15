# T05 scientific and numerical review sufficiency

## Executive decision

**Option A: existing independent review evidence is sufficient for the current
unissued R4 candidate to enter the next R2-equivalent maturity step. No additional
scientific/numerical review is required. T05 COMPLETE.**

Thirty material claim families are traced in [the matrix](CLAIM-REVIEW-MATRIX.md).
No material correctness claim is supported only by an author assertion or a green
rerun. Initial arithmetic/tail separate-model/source omissions are resolved by
later primary-methods and IEEE passes. New S-C/cost claims are covered by G1-G3,
then concrete B, the full quantity graph and bounded witness by EC1/EC2 integration
close. F-01 close covers the corrected execution/numerical boundary.

This is an existing-review sufficiency audit, not a fresh correctness review,
formal adoption, supported implementation certification or Release 4 completion.

## Current candidate binding

- Main and audit base: `3880db43a64e1758494f3c78f6850daab0e3e9e9`.
- Architecture: `cd9d780ac06a3b998ff5d4717429b0177a222fe8`.
- G1-G3 reviewed target: `225eca96d485978ee01cbe08d535387900252bca`.
- EC1/EC2 candidate: `66fa2bc201c86c62f21bb94825479427c24d8522`.
- EC3/EC4 repaired candidate: `318955dc260204328ec39acb67925e68c35d0c28`.
- B: `52969003320369754284032`.
- Cost SHA-256: `f1eb1fd866d3a48589c3e7d37b3536f700e4d5271f9a85834fa3575f034512d2`.

Live origin refs matched the supplied main/numerical/execution pins at audit start.
There is no new main delta. T05 starts at current main and adds only audit files;
it does not merge two research branches. Main does not contain production S-C
integration. Execution INPUTS names the numerical/architecture pins. T03 and
Architecture bytes are unchanged in the numerical candidate; RG1-RG3/RG5 are
unchanged from their reviewed target. Opening RFC blob is unchanged across these
candidates and main. Exact source and receipt pins are in INPUTS and RECEIPTS.

## Scientific claims

C01-C07/C17 cover balanced, complete, replicated fixed-factor 2x2, equal cell counts,
full interaction and individual A/B/AB null tests under independent normal
common-variance errors; counts/df, contrast direction and normalization, SS/SSE,
exact F, model assertion and exclusions.

Tian/Styan corroborates quadratic-form criteria; the independent reviewer supplies
the probability derivation. A Record declaration is not proof of its sampling
assumptions. Unbalanced, repeated, clustered and random-factor designs, multiplicity,
effect intervals, causality, and post-quantization/conditional-on-admission calibration
remain excluded. Wider programme holds are not current-candidate review gaps.

## Numerical claims

C08-C30 cover represented-input lattice, one arithmetic graph, exact F dependency,
public projections/policy exceptions, exact-sign S-C/search/Z-B, full charged cost,
exact B and bounded preflight, all 22 comparisons, aggregation and failure separation.

The current result contains five integers plus seventeen reals, not only the
historical thirteen-real wrapper. G5 close covers four means and integer routing.
The arithmetic projector is reused; S-C is the selected exact terminal path.
Old finite-sum schedules/guards are not public meaning. Optional producer interval
consumption is historical work, not a required carrier or alternate truth source.

## Evidence and classification

[REVIEW-EVIDENCE](REVIEW-EVIDENCE.md) records actual reviewed scope, original targets
and independence limits. Review prompts/author acceptance files are not review
results. Historical pending states remain historical; later receipts supersede
only their covered holds.

- A, inherited: bounded model, lattice/arithmetic, F-beta identity, rounding algebra
  and IEEE clauses with zero/range qualifications.
- B, new and reviewed: S-C exact sign, Z-B, operand-growth/cost construction,
  concrete B and bounded engineering evidence.
- C, reviewed integration: 22 quantities, domain/procedure coupling, projection/gate
  order, evidence envelope, aggregation and execution-result boundary.
- D, material without adequate review: none identified.

Classes overlap when inherited mathematics is connected by new code. Scope, not
number of receipts or tests, establishes sufficiency.

## External and primary-source coverage

| Source identity                                                                                                                                                          | Claim                                                     | Existing receipt                    | Applicability and limitation                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Tian/Styan (2006), Cochran's statistical theorem revisited, DOI 10.1016/j.jspi.2004.09.016; PDF SHA-256 baeb2fcbf82c80e9843ade396919845df42b73657d5fae3b28bce23434ebbd49 | Quadratic-form criteria                                   | MODEL, MODEL-REPAIR, MODEL-ACCEPT   | Corroboration; independent derivation supplies probability steps                                                                      |
| NIST/SEMATECH e-Handbook 1.3.6.6.5, F distribution                                                                                                                       | F to regularized beta                                     | METHOD-SOURCES, METHOD, GATE-REVIEW | Same own-null df/exact F; original receipt has no raw-page digest                                                                     |
| NIST DLMF 8.17, recorded v1.2.7 (2026-06-15), equations 1-4; 5.12 beta integral in G1-G3                                                                                 | Beta definition, normalization, symmetry                  | METHOD-SOURCES, GATE-REVIEW         | S-C polynomial/sign proof is independent derivation, not a DLMF algorithm; 8.17.5 is not applied to the half-integer parameter        |
| IEEE Std 754-2019, ISBN 978-1-5044-5924-2; PDF SHA-256 d6f6fef52ae93cdf8c8524451d144e00172555f008bf01a6f81da03aeff80e7a                                                  | Binary64 fields/lattice, nearest-even, zeros/tiny results | IEEE, IEEE-SOURCES                  | Clauses 3.3/3.4/3.6, 4.3.1, 6.3, 7.4/7.5 inspected; supplied licensed copy not redistributed or independently publisher-authenticated |

These are identities/access statements from existing receipts, not new retrieval
or current-edition verification. No new normative source is added. IEEE does not
select D04 or public zero policy. Yates priority claims, Algorithm 708 and wider
scientific programmes are not adopted dependencies.

## R2 methodology comparison

The comparison target is R2's reviewed unissued candidate, not a finally ratified
release. STATUS and R2-RATIFY distinguish review readiness from final steward
disposition. R2-FINAL targets `35ab094c9106903e6b8e87a144cfbd8cd52ae124`.

| Discipline              | R2 evidence                                                                             | R4 evidence / assessment                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Mathematical review     | R2-M2 tail closure and R2-CI truth composition                                          | MODEL/METHOD/IEEE/GATE-REVIEW separate mathematics, representation and scope                                                 |
| Oracle/truth path       | R2-FINAL exact-rational/multiprecision outside JavaScript; R2-CI reconstructs 200 cells | ARITH pairwise route, GATE integral recurrence, NUMERICAL-CLOSE residual and positive-coefficient tail calculation           |
| Boundaries              | Projection transitions, margins/collapse, coherent evidence mutations in R2-TRUTH/FINAL | Midpoint/parity, zero/SSE/D04/subnormal, C=B/B-1, cost frontier and all-slot mismatch/dependency controls                    |
| Independent calculation | Separate context, separately written digest/rational calculations                       | Separate tasks and calculations; shared runtime/ingress disclosed; no universal two-system certification                     |
| Immutable binding       | Commit/tree/blob, tables/traces and preservation chains                                 | 47 repository pins, G5 identities, separate numerical/execution snapshots, original task-message hashes                      |
| Receipt                 | Durable repository review results and non-promotions                                    | Older repository receipts plus recent task-review intake; public portability of originals is a disclosed archival limitation |
| Integration             | M2/M3/Groups 1-4 then R2-FINAL                                                          | G1-G3 then G4/G5 EC1/EC2 close then targeted T04 delivery close                                                              |

Equivalent discipline does not require equal test counts, paired-t/CI algorithms
or R2 normal-only restrictions. R4 subnormals have their own reviewed contract.
Finite fixtures support proofs and falsification; they are not whole-domain proofs.

## Over-review assessment

These reviews serve successive purposes: technical check, missing primary-source
closure, new exact-sign/cost proof, concrete budget/full integration and targeted
failure repair. G4 deliberately had no separate extra review; EC1/EC2 close covered
it. Repeating IEEE, exact-sign, J-cost or S-C integration now covers no missing
material claim. T05 does not need a newly commissioned scientific review chain.

## Review gaps and limitations

BLOCKING REVIEW GAP: none for current material scientific/numerical claims.
No Option B commission is proposed.

NON-BLOCKING REVIEW LIMITATIONS: shared integer/Fraction/ingress, finite corpora,
unauthenticated served builds, weaker historical supplied-review identity, and
recent original reviews in task history rather than a public verbatim archive.
None is the sole support of an otherwise unreviewed current material claim.
No external institutional human peer review or source-custody authentication is
invented. A portable publication archive may improve access without repeating review.

OUT OF SCOPE: formal adoption/publication, optional evidence-carrier promotion,
CLI/report/schema/registry/bundle issuance, production S-C integration and expanded
designs/support. Generic indeterminate aggregation is reviewed; normally completed
eligible S-C has terminal exact comparisons. This does not implement a future CLI.

## Provenance and stopping boundary

Prepared by OpenAI Codex in the continuing author task, 2026-09-15. No new reviewer,
subagent, primary-source investigation or numerical experiment was commissioned.
Only T05 audit files are added. Existing GO applies to unchanged scope. T06 and
later tasks, formal Release 4 and issuance remain unperformed.
