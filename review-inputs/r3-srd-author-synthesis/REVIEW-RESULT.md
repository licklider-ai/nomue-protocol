# Limited independent review of the SR-D author synthesis (Part T, PR #242)

**Status: informative independent review of one author synthesis record, 2026-09-09.
Verdict for the content of Part T only: `GO`, zero BLOCKER, zero SHOULD-FIX, four
NICE-TO-HAVE notes.** This review does not accept SR-D as a hold, merge anything,
adopt a procedure, select a variant, open public discussion or release. It permits the
separate steward acceptance decision to be presented. Formal SR-D hold acceptance
remains `PENDING`.

## 1. Task, fixed input and identity gate

The steward supplied the pinned commit `8a1b5f9da70c654c03e0deb0229d2abd592aee44`
(PR #242) and the four supplier PDFs, and asked for Section T.7 of the result file to
be executed in full. Every identity below was re-derived from Git objects fetched into
a fresh clone and from local bytes; nothing was copied from a PR body without checking.

| Fixed object                                  | Verified value                                                                                                                                                                    |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Part T commit (reviewed head)                 | `8a1b5f9da70c654c03e0deb0229d2abd592aee44`; live `research/r3-srd-author-synthesis-20260909` head at start and immediately before this review's commit                            |
| Sole parent                                   | `00f50638d3389d2d901fcadb5e2d03a5f2bd4f78` (PR #241; exactly one parent per `git rev-list --parents`)                                                                             |
| Tree                                          | `f453bb9d6a5246dcefa4ac1562c9e77fe18b0c49`                                                                                                                                        |
| Changed paths versus parent                   | exactly one: `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`, 309 insertions, 0 deletions                                                         |
| Result blob / bytes / SHA-256                 | `0077a749490ac6b288eb578e520071e5fe1a1a98` / 454817 / `016605bec49391177c84fa0549ba40e6ef82b3a6873a1150c833a76e81c7de89`                                                          |
| Parts A-S prefix                              | first 426114 bytes hash to `736c6484f12d0e59330ae257e23e597b868f9c5930ff86809ba8cf8d4c97b044`, equal to the parent's whole file and to the Part S blob `34ee7f83…` at `1c013a6b…` |
| Part S commit / tree (PR #231)                | `1c013a6bc07f7d066fa43c692abe2be91241b384` / `0f8b6baa728099dc21880016fbace8c44166e088`; result blob 426114 bytes as above                                                        |
| PR #236 commit / tree / report                | `7190c78b58f9d6b36dad0d8a39ff1c3b29faa961` / `24c77b7098cd0eddae1469c6fcfa80ddabd586f9` / `785785bef368694d4643be5eada6524231f8e244`, 101944 bytes, SHA-256 `06c9de68…1dec1`      |
| PR #237 commit / tree / report                | `ea9c74de316515dcfa592b52328b1af7005ed32d` / `2e7b4158f31bf7505427854ad6296279ce47d851` / `e0bfa5094e41ed7cdd693cd32f29699a99b97d53`, 69702 bytes, SHA-256 `083f26e9…69bd7b`      |
| PR #238 commit / tree / report                | `862dfe2bcf55b206c9f87ac06164b02b2cc3c079` / `703c4af0e6ade14634947cf5a204ef4ade1162b5` / `2c8839e3a1d12778557ea4ae3e0babda64f7c597`, 39160 bytes, SHA-256 `a7a1f711…ea8061b`     |
| PR #241 commit / tree / report                | `00f50638d3389d2d901fcadb5e2d03a5f2bd4f78` / `45ae68798fcdbc6dd269f37a42197671db8cadf0` / `fad66a294e9a966d62d2abf9335df26fe50af1be`, 25875 bytes, SHA-256 `4e0bc664…415c8d5`     |
| Acquisition commission blob                   | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at the reviewed head and at `f39100161cb45de15767bdb19ed54aba9489b41a`                                                                 |
| Semantic comparison commit / blob             | `7bd9c5ab854777c3e99e624d9d2ed62731228852` / `8f21526040924b891f64724c2d0fde9ea94eff92`                                                                                           |
| PR #242 body identity block                   | commit, parent, tree, blob, 454817 bytes, SHA-256 and 426114-byte prefix hash all equal to the values above                                                                       |
| Live `main` at start                          | `ed6e9d9bde691556b99d22e261b31c3b25df338f`                                                                                                                                        |
| Live heads of PR #236/#237/#238/#241 branches | unchanged at their fixed commits                                                                                                                                                  |

The full SHA-256 values abbreviated above are the ones printed in T.1; each was
recomputed from the blob at its fixed commit and matched in full. PR #237's commit is
not an ancestor of the reviewed head (`git merge-base --is-ancestor` is false); T.1's
statement that it is a separate fixed input reachable only through its own commit is
correct, and it was fetched by that commit. PR #236's commit is an ancestor.

The seven Read-first files (`AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`,
`governance/ID-POLICY.md`, `governance/RFC.md`) have identical blob identities at the
reviewed head and at live `main`. No `AGENTS.md` exists under `review-inputs/` or
`governance/`.

### Supplied originals

The four PDFs were supplied as attachments to this session and re-hashed; page counts
were recomputed with PyMuPDF. Every value equals T.3 and PR #241 Section 1.

| Supplier                           | Bytes / pages | SHA-256                                                            |
| ---------------------------------- | ------------- | ------------------------------------------------------------------ |
| 15 Marcus, Peritz and Gabriel 1976 | 446500 / 7    | `7b81e37b502d885658249196f25db32e1682d6461f3c15f7a3d56e3732899a24` |
| 40 Bretz et al. 2009               | 439933 / 19   | `87041fa4b4d17e6a2832536d586cc26b253422255df59cd00a86344f6b0a5664` |
| 41 Dmitrienko et al. 2003          | 106251 / 14   | `c1df1453c5001cfeae4bd3d52d31e46f7248cd7b3524ec7d46e2d47ef0a07ed4` |
| 43 Wiens 2003                      | 120883 / 5    | `f9634c824d637b2f1e262d226c8bd3d7d01f540501facdaead9c1e802eed5bd7` |

T.3's printed-to-PDF mapping was confirmed from page text: Marcus printed 655-657 =
PDF 2-4 (JSTOR cover at PDF 1, so 658 = PDF 5); Bretz printed 590-593 = PDF 5-8, 596 =
PDF 11, 601-603 = PDF 16-18 (offset 585); Dmitrienko printed 2389-2395 = PDF 3-9
(offset 2386); Wiens printed 212-213 = PDF 2-3 (offset 210). No PDF, page image or full
extraction enters Git.

## 2. Role, independence and reading order

- Role: separate-context limited reviewer of the author synthesis at the reviewed
  head, executing T.7. This is a review of Part T's faithful application of the
  approved exception, its six-entry characterizations, its carried corrections and its
  disposition logic. It is not a repeat of the A-D investigation, not a review of PR
  #237's broader graph proofs (which Part T does not adopt) and not a hold acceptance.
- Prior involvement: none. This session did not author PR #236, #237, #238, #241, any
  Part A-T or any earlier review. It was created for this task on 2026-09-09.
- Model and context basis: the session service reports configured model
  `claude-fable-5-1` and last-served model `claude-fable-5-1`. PR #236, #237 and #241
  report the same model identifier, so same-model-family independence is not claimed;
  what is claimed is a separate session and context with no shared conversation state.
  The record under review is, by its own account, OpenAI-assisted author/coordinator
  work, and this review inherits none of its assertions and none of Part S's SR-I
  independence determination. Git identity is not model evidence.
- Not blind: Part T, the PR #242, #241, #238 and #231 bodies, the #241 report in
  full, the #238 report in full, #237 Sections 4-8, 10, 13-14 and #236 Sections 3-8,
  9-12, 14-15 and 18 were read before the PDF pages in Section 3 were opened.
- Reading order: AGENTS and the ordered Read-first files, the acquisition commission
  (blob `3c7ddcc6…`), T.1-T.7, the PR #242 body and the approval accounts in the PR #231
  and #238 bodies, the fixed reports above, then the PDF pages.

The approval that T.2 records is a conversation approval by the steward. It cannot be
verified from Git objects. What can be verified is that three independently posted
accounts agree: T.2, the PR #242 body and the PR #231 body's final receipt (all posted
under the steward's GitHub account), and that the proposal approved is the one in
PR #238 Section 5 and the PR #231 "concrete steward proposal" paragraph, unchanged
in scope. T.2 itself discloses that this is not an independently signed GitHub vote. This
review follows T.7 and does not ask for the approval again.

## 3. Reading boundary: direct versus reused evidence

Directly inspected on extracted page text for this review (page images were not
re-rendered; the extraction of these pages is unambiguous for the sentences relied on):

- Marcus pp. 655-657: the closed-under-intersection definition of `W` (p. 655, Section
  2), the level-alpha local test condition, the test-only-after-all-implied-rejected
  rule, the `pr(A ∩ B) = pr(B) pr(A | B) ≤ α`, `A ∩ B = A` argument, the Dunnett example's
  loss of one-sided confidence bounds (p. 656), and the two-sided/directional sentence
  "Until now no closed testing procedure has been shown to have this property" (p. 657).
- Wiens pp. 212-213: the fixed testing sequence definition (Section 2.2, p. 212), the
  "closed testing"/"fixed sequence" terminology sentence, the fallback definition with
  `Σ α'_i = α`, the special-case sentence, the strong-FWE claim, the four-case `I = 2`
  proof and "A proof for I > 2 would be analogous" (Section 2.3, p. 213).
- Dmitrienko pp. 2389-2393: the two-family framework, the closed-testing adjusted
  p-value and rejection rule, the weighted Bonferroni condition with `Σ v_i(H) ≤ 1` and
  the "for any set of weight vectors" guarantee (pp. 2389-2390), Conditions 1-2 and
  Algorithm 1 (p. 2390), Table I and Algorithm 2 with its "greater than the maximum"
  property (p. 2391), `p̃_i = p_i / w_i` (p. 2392), the weighted Simes formula with the
  Kling and Benjamini attribution (p. 2393); and pp. 2394-2395: Table II rows
  `p_1000 = p_1`, `p_0100 = p_2` and Table III's 24 printed adjusted values.
- Bretz pp. 590-593, 596, 601-603: regularity conditions (1), Algorithm 1, the
  strong-FWER statement following it, Remarks (iii)-(v) including the `m ≥ 4` coverage
  limit, the fixed-sequence and fallback graphs with citations [2, 3] and [4], the
  epsilon calculation rules, Appendix (i) importing [9, Theorem 1] as "necessary and
  sufficient", Appendix (ii) (A3)-(A5) and Appendix (iii).

Reused, explicitly: PR #236's full reading of all four papers and its Sections 4-7
findings; PR #237's Table 1 recount, tolerance table, data-level mutation tests and
Conditions 1-2 counterexamples; PR #238's proofs, endpoint examples, 2+2 epsilon
algebra and four-row Dmitrienko table; PR #241's A-D checks, its symbolic epsilon
verification, its independent closure and its four-atom-law check. A reviewer-written
exact-rational closure (about forty lines, not committed) was used only to spot-check
the numbers that Part T restates; see Section 6.

Not inspected: the 1995 chapter (not supplied; not required under T.2's approved
scope), Hommel, Bretz and Maurer (2007), Westfall and Krishen (2001), the Kling and
Benjamini manuscript, and every other text that the four originals cite. No new source
was needed for any claim Part T makes.

## 4. Faithful application of the approved two-entry exception (T.2)

**Supported.** The exception as recorded matches the proposal it claims to enact:

- Scope. T.2's table gives CLS-02 the basis Wiens pp. 212-213 (with Bretz p. 593 and
  Appendix as separately attributed supporting graph treatment) and CLS-04 the basis
  Dmitrienko pp. 2389-2391 (Algorithm 2 and the closed-testing bound). This is the PR
  #238 Section 5 table and the PR #231 proposal paragraph, entry for entry, with the
  same exclusions. SRC-27 (b) is removed from the required source-completion basis
  "for those two bounded characterizations only"; T.2 says in terms that no other
  source obligation changes and that the commission's general rules are untouched.
- 1995 access stays unverified. T.2, T.3, T.4 (both rows), T.6's first residual and
  T.7 all carry the attribution/original formulation (CLS-02) and lineage (CLS-04) as
  unverified, and T.6 names receipt of the chapter as a reopen trigger. The wording is
  "unverified", not "contradicted", which is the PR #237 7.2 / PR #238 D2 correction.
- No own proof is presented as an inspected original. T.2 states that the approval
  does not "relabel our own proofs as primary sources"; T.5 labels the general-`I`
  fallback proof and the shortcut sufficiency proof "author derivations" and keeps
  "Bretz's source statement, imported theorem and Appendix graph argument" separately
  identified. T.4 CLS-03 says "I=2 proof in source, general proof separately attributed
  below". This satisfies the RFC research-gate rule that facts, inference and decision
  stay separate.
- Historical records are not recast. T.2 says earlier `INPUT_INCOMPLETE` conclusions
  were correct under the then-required basis and are not retrospectively recast as
  `PARTIAL`; T.6 says the old PARTIAL-with-required-text proposal is not reused. This
  is consistent with PR #237 7.1 and PR #238 D1.
- Nothing else is smuggled in. T.2 lists what the approval does not do (read or certify
  the 1995 chapter, select an adjusted-p convention, guarantee Simes or resampling,
  endorse broad graphical equivalence, adopt a procedure, formally accept SR-D). Each
  of those exclusions is honoured in T.4-T.6.

The pinpoints in the exception were checked on the pages: Wiens's fixed-sequence rule
(prospective order, each at level `α`, stop at the first non-rejection) is Section 2.2
on p. 212; the special-case and strong-FWE sentences are on p. 213. Dmitrienko's
Algorithm 2 is on p. 2391 and the closed weighted-Bonferroni bound on pp. 2389-2390.

## 5. Six-entry check against the fixed investigation and corrections (T.3, T.4)

Each T.4 row was compared with the source pages in Section 3 and with PR #236 Sections
4.7, 5.6, 6.7 and 7.8 as corrected by PR #237/#238 and checked by PR #241.

| Entry  | Sources and pinpoints                                                                                            | Hypotheses, local validity, dependence, order/weights                                                                                                                                                                                                                  | Outputs and exclusions                                                                                                                                                                                                          | Result    |
| ------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| CLS-01 | Marcus pp. 655-656 (construction, level condition, bound); pp. 656-657 (directional limitation): all on the page | closed family, level-alpha local tests, reject only after every implied intersection rejects; no dependence condition used (p. 656); each local test carries its own assumptions                                                                                       | rejections, not intervals (p. 656 Dunnett example); no directional guarantee (p. 657); ordered-ANOVA machinery (Section 3 of the paper) kept separate                                                                           | supported |
| CLS-02 | Wiens p. 212 Section 2.2, p. 213 special case; Bretz p. 593 Figure 6 as supporting treatment                     | finite prospective order, each at `α`, stop at first non-rejection; no observed-p ordering; guarantee via Wiens's stated special case, with the general-`I` proof attributed to the author                                                                             | rejection/stop rule only; 1995 attribution and original formulation unverified; zero-level equivalence with fallback convention-dependent (PR #238 B1)                                                                          | supported |
| CLS-03 | Wiens p. 213 Section 2.3                                                                                         | fixed order, nonnegative prespecified `α'_i` with `Σ α'_i = α`, carry after rejection, reset after non-rejection, never stop early; strong-FWE claim, `I = 2` proof in source, `I > 2` asserted                                                                        | decisions only (no adjusted p, no intervals in the source); improved/modified fallback excluded as different procedures (PR #236 5.6, 9.2)                                                                                      | supported |
| CLS-04 | Dmitrienko p. 2391 Algorithm 2; pp. 2389-2390 bound; p. 2389 adjusted-p and rejection rule                       | two fixed families, normalized gate weights while any gate remains, otherwise normalized secondary weights; weighted Bonferroni local tests under `Σ v ≤ 1` with valid marginal p-values                                                                               | adjusted p and decisions from the source; secondary adjusted p "at least" maximum gate adjusted p (equality possible, PR #236 6.3); positive original weights; 1995 lineage unverified; no epsilon/multi-family theorem adopted | supported |
| CLS-05 | Dmitrienko p. 2390 Algorithm 1, Conditions 1-2; p. 2392 properties; pp. 2394-2395 conflicting tables             | two fixed families, importance weights summing to one within each family, three cases; raw gate adjusted values `p_i / w_i` (source), clipped at one (reviewed convention, see N-1), independent of secondary values; secondary values at least the minimum gate value | raw and normalized/Table II reconstructions kept distinct; only raw keeps Condition 1 (PR #237 6.4); no variant selected; Simes/resampling outside the guarantee                                                                | supported |
| CLS-06 | Bretz pp. 590-592 (conditions (1), Algorithm 1, Remarks), p. 596 (epsilon), pp. 601-603 (Appendix)               | finite prespecified graph, nonnegative levels with total at most `α`, nonnegative edges, zero diagonal, row sums at most one; weighted Bonferroni transfer/update; strong FWER stated on p. 591 and Appendix (iii), shortcut equivalence imported from [9]             | graph construction and sufficient shortcut/closure characterization; several named procedures represented, not all (Remark (iv)); intervals, necessity, epsilon-origin and multi-family claims kept as separate dependencies    | supported |

Two boundary statements were checked specifically because T.7 asks whether a
decision-bearing source gap is hidden:

- CLS-02/CLS-03 guarantee strength. Wiens asserts strong FWE for the fallback and
  proves it only for `I = 2`; the fixed-sequence guarantee is inherited through the
  special-case sentence and stated again by Bretz p. 593. No supplied original proves
  the general-`I` statement. Part T does not claim one does: T.4 says "I=2 proof in
  source, general proof separately attributed below" and T.5 calls the general proof an
  author derivation checked in PR #241. Under the commission's `CLOSED` definition
  (decision-bearing source claims directly supported with pinpoints), the claim the
  catalogue makes, "strong FWER (reported)", is directly supported by a source
  statement; the proof-strength qualification is recorded rather than hidden. This is
  the same evidence pattern accepted for SR-I's conditional proof dependencies in Part S.
- CLS-06 shortcut/closure. Bretz's Appendix (i) imports the consonance/shortcut
  theorem from [9] and calls the condition "necessary and sufficient"; Appendix (ii)
  and (iii) are proved in the source. Part T carries this exactly: "states/imports
  shortcut result and proves graph-level properties" (T.3) and "sufficient
  shortcut/closure characterization" (T.4) with necessity listed as a separate
  dependency. Hommel, Bretz and Maurer (2007) is not an assigned source for SR-D and
  T.6 says the classification "does not certify every cited proof". No gap.

The T.3 custody table's evidence boundaries are accurate for every row, including the
statement that PR #236 records complete reading of all four papers (its Section 3.3)
and that PR #238 and PR #241 re-hashed the files.

## 6. Corrections carried into the synthesis (T.5) and the five PR #241 notes

**All five PR #241 notes are carried accurately**, each with its attribution:

| Note | PR #241 content                                                                           | Where and how Part T carries it                                                                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N-1  | `check_a` mutates a flag dictionary; cite PR #237 4.5 for data-level mutation coverage    | T.5 "Marcus arithmetic": "#238's mutation is a flag-dictionary counting test; #237 Section 4.5 supplies the separately attributed data-path mutation coverage (#241 N-1)"              |
| N-2  | a sole secondary has no secondary-to-secondary edge; the earlier sentence was too strict  | T.5 "Graph scope": the too-restrictive sentence is withdrawn with the reason, and no arbitrary-weight or general-family extension is adopted (#241 N-2)                                |
| N-3  | the zero-denominator branch belongs to the parent script's `remove_vertex`, not the paper | T.5 "Zero and endpoint boundaries": "a script convention, not a newly attributed sentence of Bretz's paper (#241 N-3)"; the script's line 171 `if den != 0 else F(0)` was located here |
| N-4  | the normalized example's fourth adjusted value `3/100` was unasserted by `check_c`        | T.5 "Simes guarantee partition": the full vector `(1/45, 3/100, 21/1000, 3/100)` is given, "including the fourth value verified by #241 N-4"                                           |
| N-5  | SciPy 1.17.0 (author) versus 1.17.1 (reviewer) with identical results                     | T.5 "Marcus arithmetic": "#241 reran with SciPy 1.17.1 versus the author's 1.17.0 and found identical reported results (N-5)"                                                          |

The remaining T.5 content was checked against its sources:

- Guarantee restatement: the Marcus argument for nonempty true-null set and the empty
  event with no true null match p. 656 and PR #236 4.2. The Bonferroni union bound
  paragraph matches PR #238 C2.
- Proof provenance: the fallback and shortcut proofs are attributed to PR #238 Section
  3 with PR #241 Section 5 as the check; the assumptions listed (fixed order and
  allocations, marginal validity, no conditional validity; monotone predetermined
  levels, common zero rule, arbitrary eligible selection, stop when none eligible) are
  the ones PR #241 B1/B2 verified.
- Zero and endpoint boundaries: allocations `(.05, 0)`, `p = (.1, 0)`; fixed sequence
  stops at the first non-rejection; the `α = 1` clipping caveat; all as in PR #238 B1/B2
  and PR #241 B1.
- Graph scope: the 2+2 epsilon algebra proves the limit of local weights only; the two
  decision examples `p = (.09, .004, 1e-12, 1)` and `p = (.05, .004, 1, 1)` with
  `(.9, .1, .5, .5)`, `ε = 1e-9`, `α = .05` are the PR #238 B4 examples that PR #241
  reproduced with the literal Algorithm 1; PR #237 5.3-5.4 are received, not adopted.
- Dmitrienko conflict: the four-row table was recomputed here with a reviewer-written
  exact closure (bitmask intersections, Algorithm 1 transcribed from p. 2390, optional
  normalization, weighted Bonferroni and weighted Simes local values, adjusted values
  clipped at one) and reproduces all sixteen entries exactly: `(2/75, 3/100, 13/450,
2/75)`, `(2/75, 13/450, 13/450, 2/75)`, `(2/75, 3/100, 13/500, 12/475)`, `(13/500,
13/500, 13/500, 12/475)`. Table III's printed scenario-1 values (Bonferroni 0.0267,
  0.0300, 0.0289, 0.0267; Simes 0.0260, 0.0260, 0.0260, 0.0253) and Table II's
  `p_1000 = p_1`, `p_0100 = p_2` were confirmed on pp. 2394-2395, so "Bonferroni column
  matches raw weights; Simes column matches the normalized reconstruction" is a correct
  computational observation. The `α = .029` H2 difference (`3/100` versus `13/450`) and
  the `k = 3` gate-pair change `(.5, .3) → (5/8, 3/8)` also reproduce.
- Simes partition: the four-atom law's local error `3/40 = .075` is the PR #238/#241
  value; the two PR #237 Condition-2 vectors reproduce here as `(4/75, 3/10, 6/125,
6/125)` and `(1/45, 3/100, 21/1000, 3/100)`. Part T correctly says these disprove a
  general gatekeeping-order property under those conventions and not the uninspected
  conditional FWER theorem.
- Marcus arithmetic: six rows, seven cells, 57/64 at `> .001`; 13 flagged cells at
  `.0005` with six additional last-digit discrepancies; these are PR #237 4.3's numbers
  as checked in PR #241 Section 4. The F(1, 10^9) handover correction matches PR #238
  and PR #241 (the parent script's `F(10**9)` sentinels at lines 196 and 213 and the
  `F(1, 10**9)` epsilon at line 551 were located here).

No full recomputation of Table 1, no symbolic epsilon work and no general graph
programme was run; T.7 asks for these only on a concrete new issue, and none arose.

## 7. Disposition, ledger and residuals (T.6)

- Ledger arithmetic. Part S's S.6 ledger is 7 `CLOSED` (SR-B, SR-C, SR-F, SR-G, SR-I,
  SR-K, SR-L) / 1 `PARTIAL` (SR-H) / 6 `INPUT_INCOMPLETE` (SR-A, SR-D, SR-E, SR-J,
  RSM-01, RSM-02). Moving SR-D alone gives T.6's 8 / 1 / 5 with exactly the listed
  members. Verified.
- Distinction from acceptance. T's status line, T.1, T.6 (twice) and T.7 all say formal
  steward acceptance is pending and that eight `CLOSED` rows are not eight formally
  accepted holds. The PR #242 body and the PR #231 receipt say the same. Verified.
- Wider state. Overall `INPUT_INCOMPLETE` follows from five remaining `INPUT_INCOMPLETE`
  rows under the commission's precedence; `SOURCE_SET_READY` false, `NARROW`,
  `TRANSFER`, every `R3-CAND`/`RES-ONLY` token, the SR-I acceptance, historical
  `PENDING` records, R4 and custody 42 + 1 = 43 are preserved as stated.
- `CLOSED` candidate sufficiency. Under T.2's approved basis, the required artifacts
  for the six entries are SRC-18 (supplier 15), SRC-26 (supplier 40), SRC-27 (a)
  (supplier 41) and SRC-27 (c) (supplier 43), the partition fixed in Part A Section 11
  and PR #236 3.2. All four are inspected with pinpoints; the conflicts (Dmitrienko
  singleton convention, Table 1 cells) are recorded as conflicts with reopen conditions
  rather than adjudicated; the derivation limits are named. No `NO_GO` is indicated:
  nothing inspected contradicts the catalogue treatment of any entry, and the Simes
  version's failure of Condition 2 is outside the bounded Bonferroni characterization,
  as T.6 says. **The bounded `CLOSED` author candidate is justified, and no
  decision-bearing source gap is hidden.** The remaining gaps are the ones T.6 names.
- Residuals. T.6's five bullets cover PR #236's R-D1 through R-D10 in substance: R-D1
  (1995 chapter, with the #236 18.1 / #237 14 request), R-D2 and R-D3 (Simes/resampling;
  raw versus normalized declaration), R-D4 (necessity/representability), R-D5
  (confidence bounds), R-D6 (improved/modified fallback, epsilon-origin, multi-family),
  R-D7 (Table 1 oracle), R-D8 (directional error), R-D9 (SR-J X-8 kept separate) and
  R-D10 (zero/tie/alpha-domain conventions). Nothing is dropped.

## 8. Validation record

Run at the reviewed head in a fresh clone after `pnpm install --frozen-lockfile`
(exit 0; the clone had no `node_modules`), with this report added and nothing else
changed. Outputs as printed are recorded in Section 8.1; the same four checks are
reported in the pull request body together with this review's commit, parent, tree and
blob identities.

### 8.1 Actual outputs

- `pnpm install --frozen-lockfile`: "Done in 5.6s using pnpm v11.7.0"; exit 0.
- `pnpm format:check`: "Checking formatting... All matched files use Prettier code
  style!"; exit 0.
- `pnpm lint:markdown`: "Linting: 359 files … Summary: 0 issues in 0 files"; exit 0.
  A first run reported one MD018 issue in this report (a wrapped line beginning with a
  pull-request number); the line was re-wrapped and the run repeated.
- `node --import tsx tooling/src/validate.ts`: "validate: OK - registries,
  traceability, normative lint, authority, gates, conformance manifest, links,
  private-dependency and language audits, phase-1 schemas, cross-checks, code-path
  audits, and the snapshot manifest mechanism are clean."; exit 0.
- `git diff --cached --check` with this file staged: no output; exit 0.
- Staged tree: exactly one added path, `review-inputs/r3-srd-author-synthesis/REVIEW-RESULT.md`.

Not run: full `pnpm check`, `pnpm test`, `pnpm typecheck`, `pnpm check:generated`, the
Phase 1 suite, the parent 55-check script, the PR #237 57-check script and the PR #238
diagnostic. Part T changes no script and no authoritative artifact and claims none of
these; the omission is disclosed, not excused. No Monte Carlo study, repeated full
survey, general graph programme or exact model-build log was requested or performed.
A reviewer scratch script (not committed) produced the exact-rational spot checks in
Section 6.

## 9. Findings

### BLOCKER

None.

### SHOULD-FIX

None. The approved exception is applied as approved; the six characterizations match
the fixed investigation as corrected; the corrections and all five PR #241 notes are
carried with attribution; the ledger and the acceptance distinction are correct; no
decision-bearing source gap is hidden.

### NICE-TO-HAVE (editorial; none moves the verdict)

- **N-1 (T.4, CLS-05).** "Raw Algorithm 1 gate values are min(1, p_i/w_i)" is the
  clipped form used by the reviewed scripts (PR #237 C-9, PR #238 C1). The source's own
  statement on p. 2392 is the uncapped `p̃_i = p_i / w_i`. Decisions are identical for
  every `α ≤ 1`; the successor could mark the clip as a convention so that the source
  statement and the reviewed convention stay visibly separate.
- **N-2 (T.2, process).** PR #238 Section 5 anticipated "an append-only
  decision/commission-scope record" for the exception. T.2 is that record in substance
  (append-only, names the commission blob, states the exact boundary). The formal
  acceptance record, when the steward presents it, should restate the exception and
  the decision in the steward's own words, as Part S did for SR-I, so that the
  approval account does not rest solely on the author's transcription.
- **N-3 (T.4/T.5, CLS-03).** T.4 gives the source premise `Σ α'_i = α`; T.5's carried
  proof uses "sum to at most alpha". Both are correct and the weaker premise is the
  author's generalization, but one clause saying so would keep source and derivation
  premises from being read as the same statement.
- **N-4 (T.3).** The Bretz row's page list omits p. 587 (the `[9]`-attributed subclass
  sentence) and p. 604 (reference 2, the only supplied bibliographic identity of the
  1995 chapter). Both are relied on indirectly through PR #236 F-D-09/S-3; adding them
  would make the pinpoint list self-contained.

## 10. Remaining exact gaps (unchanged by this review)

- SRC-27 (b), the 1995 chapter: uninspected; not required under the approved scope;
  its receipt reopens CLS-02/04 if its content conflicts (T.6 first bullet; PR #236
  18.1 with PR #237 14 remain the executable reading instruction).
- Weighted-Simes validity under dependence and any Simes-based gatekeeping property:
  outside the Bonferroni characterization; reopen before use.
- General graph representability, necessity, epsilon-origin invariance, multi-family
  procedures, compatible intervals and directional error: separate dependencies, not
  adopted.
- Raw versus normalized gatekeeping, zero-weight and zero-level handling, ties, alpha
  domain: implementation-time declarations, not source content.
- Marcus Table 1 as an oracle: requires its own basis.

No additional investigation or repair prompt is needed for the synthesis itself.

## 11. Verdict and preserved state

`GO` for the content of Part T at `8a1b5f9da70c654c03e0deb0229d2abd592aee44`: the
already approved two-entry source-basis exception is applied faithfully and no further
than approved; 1995 access remains unverified; no other source obligation is dropped;
no author proof is presented as an inspected original; the six entries' sources,
hypotheses, local validity, dependence, order/weights, outputs and exclusions match the
fixed investigation and its reviewed corrections; the bounded `CLOSED` author candidate
is justified without a hidden decision-bearing source gap; the 8 / 1 / 5 author ledger
is correct and formal SR-D acceptance is correctly left pending.

Severity of the open notes: four NICE-TO-HAVE, no condition on the verdict. A GO here
permits the separate steward acceptance decision to be presented; it does not grant it.

Preserved unchanged: Parts A-T, the commission, the semantic comparison, every prior
report, script and review, ledger 8 / 1 / 5 as an author result, SR-D `CLOSED` as an
author candidate only, overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`, `NARROW`,
`TRANSFER`, every `R3-CAND` and `RES-ONLY` token, the SR-I acceptance, all other holds,
historical `PENDING` records and the separate R4 state. This review adds one file and
changes nothing else. No merge, procedure adoption, hold acceptance, source
substitution, public opening or release.
