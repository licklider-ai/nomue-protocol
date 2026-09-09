# Independent focused review of the SR-D author-side follow-up (PR #238)

**Status: informative independent review of one author-side correction record,
2026-09-09. Verdict for the content of that record only: `GO`, zero BLOCKER, zero
SHOULD-FIX, five NICE-TO-HAVE notes.** This review does not close SR-D, accept a
hold, substitute a source, select a procedure variant, approve the alternative
primary basis, open public discussion, merge or release anything. SR-D remains
`INPUT_INCOMPLETE`.

## 1. Task, fixed input and identity gate

The caller supplied `FOLLOWUP_HEAD = 862dfe2bcf55b206c9f87ac06164b02b2cc3c079` and
asked for Section 8 of the fixed report, "Independent focused review before
promoting these corrections", to be executed in full. Every identity below was
re-derived from Git objects in a fresh clone and from local bytes; nothing is
copied from the PR body without checking.

| Fixed object                                        | Verified value                                                                                                                   |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| FOLLOWUP_HEAD                                       | `862dfe2bcf55b206c9f87ac06164b02b2cc3c079`; live `research/r3-srd-author-followup-20260909` head at start and before this commit |
| Sole parent                                         | `7190c78b58f9d6b36dad0d8a39ff1c3b29faa961` (the PR #236 input; exactly one parent)                                               |
| Tree                                                | `703c4af0e6ade14634947cf5a204ef4ade1162b5`                                                                                       |
| Added files                                         | exactly two, both `A` in `git diff-tree`; no other path changed                                                                  |
| Author report blob / bytes / SHA-256                | `2c8839e3a1d12778557ea4ae3e0babda64f7c597` / 39160 / `a7a1f7111575484840cb615b57435fd63c9dad1332e7819589db2a864ea8061b`          |
| Author script blob / bytes / SHA-256                | `bda6527be84eedd6d9f8e42f4ec1460a04df25ed` / 11660 / `195cddefe1f2625a68edba65d81b8a56b213836fa387d08f32037832caf4c854`          |
| Parent report blob / bytes / SHA-256                | `785785bef368694d4643be5eada6524231f8e244` / 101944 / `06c9de684706f1ca1da016d6c4600093bf6bb962855d67860dc3d1f6c4e1dec1`         |
| Parent script blob / bytes / SHA-256                | `ef6e2c15bd90b8d9a0164bc9caaa35997504e236` / 31967 / `caa2f95fb49e7e0bd57125ee6fb396388861b0ca002bee5403c604291ee86dde`          |
| Parts A-S result blob / bytes / SHA-256             | `34ee7f83368462a4782d86eff02b72cf5c18a0a0` / 426114 / `736c6484f12d0e59330ae257e23e597b868f9c5930ff86809ba8cf8d4c97b044`         |
| Acquisition commission blob                         | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at FOLLOWUP_HEAD and at `f39100161cb45de15767bdb19ed54aba9489b41a`                    |
| Semantic result blob at `7bd9c5ab…`                 | `8f21526040924b891f64724c2d0fde9ea94eff92`                                                                                       |
| PR #237 commit / parent / tree                      | `ea9c74de316515dcfa592b52328b1af7005ed32d` / `7190c78b…` / `2e7b4158f31bf7505427854ad6296279ce47d851`                            |
| PR #237 report blob / bytes / SHA-256               | `e0bfa5094e41ed7cdd693cd32f29699a99b97d53` / 69702 / `083f26e9a0d0e33811204eead6089e716ebf126a005b07cc7706f0f7fe69bd7b`          |
| PR #237 script blob / bytes / SHA-256               | `8349df4b3a854ba879d8835ab309efeefcedb1d3` / 40620 / `9bcb5ea4628c74178637b11f2f1423d259d634cf80af4a9b0f7b9ce3ac55f8ca`          |
| Live `main` at start                                | `ed6e9d9bde691556b99d22e261b31c3b25df338f`                                                                                       |
| Live `review/r3-srd-primary-investigation-20260909` | `7190c78b…` (unchanged)                                                                                                          |

All values match Section 1 of the author report and the PR #238 identity block. The
live head did not differ from FOLLOWUP_HEAD, so no retargeting question arose. The
seven Read-first/root instruction files (`AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`,
`governance/ID-POLICY.md`, `governance/RFC.md`) have identical blob identities at
FOLLOWUP_HEAD and at live `main`. No `AGENTS.md` exists under `review-inputs/`.

### Supplied originals

All four PDFs were supplied as attachments and re-hashed; page counts were
recomputed with PyMuPDF. Every value matches the author report, PR #237 Section 3.1
and the PR #231 instruction.

| Supplier                           | Bytes / pages | SHA-256                                                            |
| ---------------------------------- | ------------- | ------------------------------------------------------------------ |
| 15 Marcus, Peritz and Gabriel 1976 | 446500 / 7    | `7b81e37b502d885658249196f25db32e1682d6461f3c15f7a3d56e3732899a24` |
| 40 Bretz et al. 2009               | 439933 / 19   | `87041fa4b4d17e6a2832536d586cc26b253422255df59cd00a86344f6b0a5664` |
| 41 Dmitrienko et al. 2003          | 106251 / 14   | `c1df1453c5001cfeae4bd3d52d31e46f7248cd7b3524ec7d46e2d47ef0a07ed4` |
| 43 Wiens 2003                      | 120883 / 5    | `f9634c824d637b2f1e262d226c8bd3d7d01f540501facdaead9c1e802eed5bd7` |

Printed-to-PDF mapping confirmed from page text: Marcus printed 658 = PDF 5; Bretz
printed 591-592 = PDF 6-7, 595-596 = PDF 10-11, 601-603 = PDF 16-18; Dmitrienko
printed 2389-2395 = PDF 3-9; Wiens printed 212-213 = PDF 2-3. No PDF, page image or
full extraction enters Git.

## 2. Role, independence and reading order

- Role: separate-context focused reviewer of the author-side record at
  FOLLOWUP_HEAD. This is a review of that record's new claims and boundaries, not
  a repeat of the A-D investigation and not a review of an author synthesis (none
  exists yet).
- Prior involvement: none. This session did not author PR #236, PR #237, PR #238,
  any Part A-S, or any earlier review. It was created for this task.
- Model and context basis: the session reports configured model `claude-fable-5-1`
  and last-served model `claude-fable-5-1`. PR #236 and PR #237 report the same
  model identifier. Same-model-family independence is therefore not claimed; what
  is claimed is a separate session and context with no shared conversation state.
  The author record under review is, by its own description, OpenAI-assisted
  author/coordinator work; this review inherits none of its assertions and none
  of Part S's SR-I independence determination.
- Not blind: the PR #238, #237 and #231 bodies, the author report and script, the
  parent Sections 4.6, 5.3, 6.2-6.5, 7.2, 8-9, 13-16 and PR #237 Sections 4-14
  were read before the PDFs were opened.
- Reading order: AGENTS and the ordered Read-first files, the acquisition
  commission, the PR #231 targeted follow-up instruction, the parent sections
  above, the author report and `check-followup.py`, PR #237, then the PDF pages
  in Section 3.

## 3. Reading boundary: direct versus reused evidence

Directly inspected on page images or extracted page text for this review:

- Marcus p. 658: the two displayed mixture formulas and all 64 Table 1 cells,
  re-read from a 230 dpi crop and compared cell by cell with the parent
  transcription (all 64 equal).
- Dmitrienko pp. 2389-2391, 2393-2395: closed-testing framework, Conditions 1-2,
  Algorithm 1, Table I, Algorithm 2, the weighted Simes formula with the Kling and
  Benjamini attribution, Table II (singleton rows `p_1000 = p_1`, `p_0100 = p_2`),
  Table III (all 24 adjusted values).
- Wiens pp. 212-213: fixed-sequence definition, the fallback rule, the `I = 2`
  proof and the "analogous for I > 2" sentence.
- Bretz pp. 591-592, 595-596, 602-603: Algorithm 1, Remarks (iii)-(v), Algorithm
  2, the epsilon calculation rules, (A1)-(A5) and the import of [9, Theorem 1].

Reused, explicitly: the parent's full readings of all four papers; PR #237's
re-transcription of Table 1, its tolerance table, its data-level mutation tests,
its general two-family graph proof (5.3), its symbolic serial epsilon proof
(5.4), and its Conditions 1-2 counterexamples (6.4). PR #237's broad graph proofs
were not re-reviewed here because the author record does not adopt them (Section
8 of the author report limits their review to a synthesis that elects that scope).

## 4. A: Marcus Table 1 accounting

**Supported.** A reviewer-written recomputation, independent of both scripts
(unsigned Stirling numbers of the first kind by recurrence, block polynomial
convolution in exact rationals, SciPy `chi2.sf` tails, Brent root finding),
reproduces the author's count at the parent's rule `|computed - printed| > 0.001`:
six differing rows, seven differing cells, 57 of 64 agreeing. The seven cells and
their recomputed values agree with the author's table to the displayed digits.
Tolerance sensitivity agrees with PR #237 4.3: 13 cells at 0.0005, 7 at 0.001 and
0.002, 6 at 0.005. The printed 5 % points of the four- and five-block rows have
upper-tail probabilities 0.054-0.056 by this recomputation, consistent with the
parent's "roughly 0.054".

The author's description of the parent defect is accurate: the parent's check at
`reproduce-sr-d.py` line 720 asserts six dictionary keys and pair length two under
a "58 of 64" label, and its `expected_discrepancies` dictionary (lines 712-719)
holds seven non-`None` values. The author's `check_a` counts cells and asserts
`(6, 7, 57)`.

Running `check-followup.py` here printed a maximum two-route engine gap of
`1.5987e-13` (author: "about 1.60e-13") under SciPy 1.17.1 (author observed
1.17.0). The author's limitation statements are correct and needed: both routes
share the equal-n Stirling mixture premise, which the printed page does not
derive; the recomputation is conditional numerical corroboration without
certified error bounds; no erratum is established; no CLS-01 claim depends on the
table.

On the mutation check: the author's `check_a` mutates the boolean flag dictionary
(removing the second discrepancy of the five-block row) and shows that the new
`accounting` assertion rejects `(6, 6, 58)` while the row/pair-length structure is
unchanged. That is what the report says it is, a negative check of the counting
defect. It does not push a changed printed value through transcription and
recomputation; PR #237's three data-level mutation tests (4.5) do, and are reused
for that purpose. See N-1.

## 5. B: proofs, endpoints and graph generality

### B1 fallback bound and zero-level semantics

**Supported.** The first-true-error argument is checked step by step: with
`t_0 = 0`, the level tested at the first true error `t_j` cannot include any
allocation at or before `t_(j-1)` (not rejected), so it is at most the
deterministic `c_j = sum_{i = t_(j-1)+1}^{t_j} a_i`; the disjoint first-error
events have total probability at most `sum c_j <= alpha` under marginal validity
`P(p_i <= c) <= c` for every deterministic `c`. The direct fixed-sequence proof is
also correct. The assumptions listed (fixed order, fixed nonnegative allocations,
marginal validity, no conditioning on observed decisions) are exactly those used.
Wiens p. 213 supplies the rule, the strong-FWE claim and the `I = 2` proof only;
the author correctly labels the general argument as author-side mathematics.

The zero-level example is correct on the parent code: `wiens_fallback` tests
`level > 0 and p <= level`, so allocations (0.05, 0) with p = (0.1, 0) reject
nothing, whereas the literal `p <= level` rejects the second null at level 0. The
author correctly refuses to select a convention and correctly notes that both
satisfy the bound.

### B2 closure/shortcut sufficiency proof

**Supported.** For a shortcut-rejected `j` and any intersection `J` containing
`j`, the earliest shortcut-rejected member `v` of `J` exists, `J` is a subset of the
family remaining at `v`'s removal, and monotonicity gives `p_v <= a_v(I_v) <= a_v(J)`,
so `H_J` rejects locally; when the shortcut stops with nonempty `I`, the local test
of `H_I` fails under the same zero rule and blocks every survivor. This is the
sufficiency direction only, it holds for every selection order, and validity
follows from the union bound. Bretz p. 602 imports the theorem from [9] and calls
the condition necessary and sufficient; the author does not claim necessity or an
inspection of [9]. The requirement that shortcut eligibility and the local test
use the same zero-level rule is the right narrowing. The grid check (640 chain
cases, all selection orders, both zero conventions) ran and passed here; the
author correctly says the proof, not the grid, establishes the result.

### B3 parallel graphs

**Narrowed as required.** The author carries only the parent-tested k = 2, m = 4
and positive-weight k = 3, m = 6 instances plus Bretz Figure 2, and adopts no
general two-family theorem. The `1 - w_i` denominator and the zero-original-weight
normalization are named explicitly as outside the reused positive-weight
calculations. PR #237 5.3 offers a general proof under `w_i > 0`, `k >= 1`,
`m - k >= 1`; the author receives it without adopting it, which is consistent with
the bounded scope. See N-2 for one sentence of precision.

### B4 finite epsilon versus the limit

**Supported, with the strongest new content checked symbolically.** Bretz p. 596
does prescribe treating epsilon as a fixed positive real in the transition updates
and letting it tend to zero only when levels are read; the parent's rounded
finite-epsilon comparison is therefore correctly characterised as numerical
corroboration. For the 2 + 2 construction (gate weights `a, b`, secondary weights
`c, d`, mutual gate edges `1 - epsilon`, gate-to-secondary edges `epsilon (c, d)`,
mutual secondary edges 1), this review re-implemented Bretz (A3)/(A4) in SymPy
with epsilon symbolic and, without importing either script, confirmed:

- all 15 nonempty-subset formulas in the author's table hold as exact rational
  functions of epsilon (the one-gate row is `1 - w_j epsilon` on the survivor and
  `w_j epsilon q_s` on each surviving secondary; the gate-to-secondary edge after
  one gate removal is exactly `q_s`, as the author's `epsilon (2 - epsilon) q_s /
(1 - (1 - epsilon)^2)` simplification states);
- the epsilon-to-zero limit equals Dmitrienko Algorithm 2 weights times alpha on
  all 15 subsets;
- removal order does not change the result on the multi-removal subsets tested.

Both decision counterexamples reproduce exactly at epsilon = 10^-9 with the
literal positive-level Bretz Algorithm 1: p = (0.09, 0.004, 10^-12, 1) rejects
{H2, H3} while H1 survives at level `0.05 - 5 x 10^-12`; p = (0.05, 0.004, 1, 1)
rejects only H2 for every positive epsilon because H1's level is strictly below
0.05, while the limiting procedure rejects H1 at equality. The author's conclusion
that convergence of levels does not imply convergence of boundary decisions is
correct. The author correctly limits the algebra to this strictly positive 2 + 2
construction and does not certify the Figure 9/10/12 extensions. PR #237 5.4's
general `k >= 2` symbolic proof is received, not adopted.

### Handover correction

**Supported.** Neither fixed PR #236 file contains an F(1, 10^9) or
infinite-degrees-of-freedom computation. The parent script's `F(10**9)` is a
Fraction sentinel in two `argmin` keys (lines 196 and 213) and `F(1, 10**9)` is the
epsilon at line 551; the Marcus engine evaluates chi-square tails in closed form
(lines 322-358). The parent report's only "degrees of freedom" mentions are the
`nu` of the unknown-variance extension (line 251) and the script description
(line 768).

## 6. C: Dmitrienko variants and guarantee partition

### C1 variant ambiguity

**Supported by direct page inspection and independent computation.** On the page
images: Algorithm 1 (p. 2390) and Table I (p. 2391) leave a singleton gatekeeper at
its original weight (row `H_1`: 0.5, 0, 0, 0); Table II (p. 2394) lists
`p_1000 = p_1` and `p_0100 = p_2` while saying its p-values follow "the weighted
Bonferroni rule" and "algorithm 1"; Table III (p. 2395) prints Bonferroni
(0.0267, 0.0300, 0.0289, 0.0267) and Simes (0.0260, 0.0260, 0.0260, 0.0253) for
scenario 1.

A reviewer-written closure (bitmask intersections, Algorithm 1 weights transcribed
from p. 2390, optional normalisation of the intersection mass to one, weighted
Bonferroni and weighted Simes local p-values, exact rationals) reproduces all four
rows of the author's table exactly: raw Bonferroni `(2/75, 3/100, 13/450, 2/75)`,
normalised Bonferroni `(2/75, 13/450, 13/450, 2/75)`, raw Simes
`(2/75, 3/100, 13/500, 12/475)`, normalised Simes `(13/500, 13/500, 13/500, 12/475)`.
Raw Bonferroni matches the printed Bonferroni column and normalised Simes matches
the printed Simes column, so the author's reading of the source's internal
inconsistency is confirmed without adjudicating intent. The 0.029 decision
difference on H2, the Condition 1 failure under normalisation (H1 adjusted value
`3/125` versus `2/75` as secondary p-values move from 0.001 to 1), the k = 3
gate-pair normalisation `(0.5, 0.3)` to `(5/8, 3/8)`, and the k = 2 confinement of
the difference to singleton gatekeepers all check. No variant is selected.

### C2 guarantee partition

**Supported.** The weight-sum union bound proves strong FWER for weighted
Bonferroni with any predetermined nonnegative local weights summing to at most
one, under marginal validity only; it proves nothing about Simes. The p. 2393 text
attributes weighted-Simes validity under positive regression dependency to Kling
and Benjamini (unpublished manuscript, 2002), as the author states. The scaling
identity (normalised uncapped Simes value equals `s` times the raw value, so a
valid normalised test implies a conservative raw test) was verified on 200 random
p-vectors over all 15 intersections. The exact four-atom law was verified to have
super-uniform marginals at every support point and to give local error `3/40`
for equal-weight Simes and `1/20` for Bonferroni at alpha = 0.05, so it does what
the author says: it defeats the extension from marginal validity to Simes and
asserts nothing about positive dependence.

### PR #237 Condition 2 examples

**Reproduced independently.** Raw Simes with p = (0.048, 0.03, 0.001, 0.001)
gives `(4/75, 3/10, 6/125, 6/125)`; normalised Simes with p = (0.02, 0.021, 0.001,
0.03) gives `(1/45, 3/100, 21/1000, 3/100)`. The author's attribution of these to
PR #237 and its statement that they do not disprove the uninspected
positive-dependence FWER theorem are correct.

## 7. D: source obligation and proposal boundary

**Supported; no substitution or acceptance is made.** The commission's "Hold
dispositions" and "Required source coverage" sections assign `INPUT_INCOMPLETE`
whenever required source text cannot be identified or inspected, so the author's
D1 correction (no `PARTIAL` while SRC-27 (b) stays required and unread) follows the
unchanged commission, as PR #237 7.1 also concluded. D2's replacement of
"contradicted as an attribution by the citation structure" with "unverified
attribution / original formulation" is the supportable wording: the reference
lists of the 2003 and 2009 papers do not establish what the unread chapter says.

The alternative-primary-basis table is explicitly labelled unapproved, changes
only the required decision-bearing basis of CLS-02/04, keeps the attribution as a
named residual, keeps the other source requirements, and states the steps
(synthesis, independent exact-head review, separate steward acceptance) that a
source-basis decision does not replace. Source statements, uninspected cited
proofs and author derivations are kept in separate columns and sentences
throughout Sections 3-5 of the author report. The minimum acquisition request
names the single chapter and pages and does not claim exhausted routes. The
1995 chapter was not needed for this bounded review and remains required under
the unchanged commission.

## 8. Validation record

Run at FOLLOWUP_HEAD in a fresh clone after `pnpm install --frozen-lockfile`
(exit 0; the clone had no `node_modules`) and `pip install scipy pymupdf sympy`
(SciPy 1.17.1, SymPy 1.14.0). Outputs as printed:

- `python3 review-inputs/r3-srd-author-followup/check-followup.py`: `Python
numerical environment: SciPy 1.17.1`; the six `A differing row` lines; `A PASS: 6
rows, 7 cells, 57/64 agreeing; cell-count mutation rejected; max engine gap
1.5987211554602254e-13`; `B PASS: 640 chain cases, both zero conventions and all
selections; finite epsilon rejects H2,H3 while H1 survives; p1=alpha boundary
misses H1`; the four `C` value lines; `C PASS: .029 decision changes; secondary
dependence demonstrated; exact Simes error 3/40 Bonferroni 1/20 ; both PR 237
Condition 2 counterexamples reproduced`; `ALL FOLLOW-UP DIAGNOSTICS PASSED`;
  exit 0; about 1.6 s.
- `pnpm format:check`: "Checking formatting... All matched files use Prettier code
  style!"; exit 0.
- `pnpm lint:markdown`: "Linting: 357 files … Summary: 0 issues in 0 files"; exit
  0 (no stronger coverage claim).
- `node --import tsx tooling/src/validate.ts`: "validate: OK - registries,
  traceability, normative lint, authority, gates, conformance manifest, links,
  private-dependency and language audits, phase-1 schemas, cross-checks, code-path
  audits, and the snapshot manifest mechanism are clean."; exit 0.
- `git diff --check` at FOLLOWUP_HEAD: no output; exit 0.

The same four repository checks were rerun on this branch with this file added;
their outputs are recorded in the pull request body. A reviewer scratch script
(not committed) produced the independent A, C and symbolic B4 results quoted
above.

Not run: full `pnpm check`, `pnpm test`, `pnpm typecheck`, `pnpm check:generated`,
the Phase 1 suite, the parent 55-check main, the PR #237 57-check script. No
authoritative artifact is touched by FOLLOWUP_HEAD or by this review; the omission
is disclosed, not excused. No Monte Carlo study, repeated full survey, general
graph programme or exact model-build log was requested or performed.

## 9. Findings

### BLOCKER

None.

### SHOULD-FIX

None. Each A-D issue in the author record is supported, narrowed, or assigned an
exact remaining gap that the record itself names (Section 10 below).

### NICE-TO-HAVE (editorial; none moves the verdict)

- **N-1 (A).** The `check_a` mutation exercises the `accounting` function on an
  edited flag dictionary, not a changed printed cell through recomputation. The
  report describes it accurately; the synthesis should cite PR #237 4.5 for
  data-level mutation coverage rather than this check alone.
- **N-2 (B3).** "A secondary family of size one or a unit weight requires a
  separately defined construction" is stricter than needed: with one secondary
  there are no secondary-to-secondary edges, so the `1 - w_i` denominator is never
  evaluated (PR #237 5.3 treats `m - k = 1` as covered). Since the author adopts no
  general claim, this is a wording point only.
- **N-3 (B2).** In the paragraph on Bretz pp. 601-603, "Its update uses the zero
  branch when the reciprocal-edge product is one" refers to the parent script's
  `remove_vertex` (`if den != 0 else F(0)`), not to the paper; the referent should
  be named.
- **N-4 (C).** `check_c` asserts only the first three normalised adjusted values of
  the PR #237 example; the fourth (`3/100`) is unasserted. Verified here.
- **N-5 (Section 7).** The observed SciPy version differs between the author
  (1.17.0) and this run (1.17.1) with identical outputs; the synthesis may record
  both.

## 10. Remaining exact gaps (unchanged by this review)

- SRC-27 (b), the 1995 chapter: uninspected; CLS-02 attribution/original
  formulation and CLS-04 lineage stay unverified; completion is the parent's
  Section 18.1 reading or a separate steward source-basis decision. Neither is
  made here.
- Weighted-Simes validity under dependence and the Simes version's gatekeeping
  property: outside the Bonferroni characterisation; reopen triggers R-D2/R-D3
  stand as extended by PR #237.
- General parallel-graph representability, epsilon-edge-origin immateriality and
  multi-family epsilon graphs: not adopted by the author record; PR #237 5.3-5.4
  are available as investigator input if a synthesis elects that scope.
- Marcus level probabilities for larger blocks rest on the Stirling formula, not
  on an inspected derivation (PR #237 G-2); relevant only if Table 1 is ever used
  as an oracle.

## 11. Verdict and preserved state

`GO` for the content of the author-side correction record at FOLLOWUP_HEAD: its
A count, B proofs and boundaries, C partition and D corrections are supported by
direct page inspection, independent recomputation and the reused PR #237 evidence,
and its scope statements are not overstated. This is not source closure and not a
GO for SR-D.

Preserved unchanged: ledger 7 `CLOSED` / 1 `PARTIAL` / 6 `INPUT_INCOMPLETE`;
SR-D `INPUT_INCOMPLETE`; overall `INPUT_INCOMPLETE`; `SOURCE_SET_READY=false`;
`NARROW`; `TRANSFER`; every `R3-CAND` and `RES-ONLY` token; the SR-I acceptance
of Part S; all other holds; the separate R4 state; the parent report/script,
Parts A-S, both commissions, PR #237's files and every prior review, all
byte-identical to FOLLOWUP_HEAD. This review adds one file and changes nothing
else. No merge, procedure adoption, hold acceptance, source substitution, public
opening or release.
