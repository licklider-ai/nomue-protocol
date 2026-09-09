# Release 3 Semantic Source Acquisition — Targeted Adversarial Follow-up to the SR-D Primary-Source Investigation

**Status: informative independent follow-up investigation record; non-normative; not
adopted; not a steward decision.** This record answers the four bounded questions A–D of
the "Targeted SR-D follow-up instruction" in the body of pull request #231 against the
fixed input pull request #236 (commit `7190c78b58f9d6b36dad0d8a39ff1c3b29faa961`). It
investigates specific unresolved claims; it accepts no hold, reviews no author synthesis
(none exists for SR-D), selects no procedure, Contract, identifier, schema, Public Check,
implementation, source substitute or release outcome, changes no commission, and merges
nothing. It does not modify the PR #236 report or script, any Part A–S of the fixed
result, or any preserved review. Attribution is role-based only.

**Outcome in one paragraph.** (A) The Marcus, Peritz and Gabriel (1976) Table 1
accounting in PR #236 is wrong by one cell: at the stated tolerance of 0.001 the paper's
own formula reproduces 57 of the 64 printed cells, not 58; seven cells in six rows
differ, the (2, 2, 2, 2, 2) row contributing two. The earlier script's check labelled
"58 of 64" tests row count and pair length only; a new cell-count diagnostic in
`followup-checks.py` counts cells, and three mutation tests show that it detects changes
the row predicate misses. The count is tolerance-sensitive: 13 cells differ at half a
unit of the last printed digit, of which six (all 1 % points) are last-digit
differences of at most 0.0008. Two independent chi-square tail implementations and two
source-independent closed-form identities separate arithmetic accuracy from
transcription consistency; the level-probability formula itself remains an investigator
formula, partially corroborated. (B) The general-`I` fallback proof and the
shortcut/closure proof of PR #236 are correct as written, with two conventions to
declare (rejection at local level zero with `p = 0`; the zero-level argmin); a general
construction and proof is supplied for two-family parallel Bonferroni gatekeeping as a
graph, with exact assumptions; and the serial ε-graph identity, which the source states
in words but does not prove, is given a symbolic proof for the bounded construction with
`k ≥ 2` gatekeepers and verified by exact rational-function limits (no floating point,
no rounding); the coded construction fails for `k = 1`. (C) An independently written
closed-testing calculation reproduces Table III of Dmitrienko, Offen and Westfall (2003)
and confirms that its Bonferroni and Simes columns follow different singleton
conventions; decision-bearing differences are exhibited, including at α = 0.05. A new
finding: under the paper's own definitions the weighted-Simes parallel gatekeeping
procedure violates the paper's Condition 2 under every convention (concrete
counterexamples), and the printed Simes column violates Condition 1; "error control
unaffected" is established for the Bonferroni version only. (D) PR #236's conditional
`PARTIAL` candidate with SRC-27 (b) still required is not available under the unchanged
commission and is withdrawn as a candidate; the consistent candidate remains
`INPUT_INCOMPLETE`. The CLS-04 lineage wording is reduced from "contradicted" to
"unverified attribution". A bounded alternative-primary-basis proposal is prepared for
steward decision and remains unapproved. The 1995 chapter was not supplied; its access
status stays open with a minimum chapter acquisition request. The 7 `CLOSED` / 1
`PARTIAL` / 6 `INPUT_INCOMPLETE` ledger, overall `INPUT_INCOMPLETE`,
`SOURCE_SET_READY=false`, `NARROW`, the SR-I acceptance, all other holds and R4 are
preserved unchanged. Fifty-seven supplemental checks pass.

## 1. Investigation identity

| Field                            | Value                                                                                                                                                                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                       | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                  |
| Fixed input                      | pull request #236, commit `7190c78b58f9d6b36dad0d8a39ff1c3b29faa961`, tree `24c77b7098cd0eddae1469c6fcfa80ddabd586f9`, sole parent `1c013a6bc07f7d066fa43c692abe2be91241b384`                                                                                           |
| Input report                     | `review-inputs/r3-srd-primary-investigation/REVIEW-RESULT.md`, blob `785785bef368694d4643be5eada6524231f8e244`, 101944 bytes, SHA-256 `06c9de684706f1ca1da016d6c4600093bf6bb962855d67860dc3d1f6c4e1dec1`                                                                |
| Input script                     | `review-inputs/r3-srd-primary-investigation/reproduce-sr-d.py`, blob `ef6e2c15bd90b8d9a0164bc9caaa35997504e236`, 31967 bytes, SHA-256 `caa2f95fb49e7e0bd57125ee6fb396388861b0ca002bee5403c604291ee86dde`                                                                |
| Commission                       | `governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md`, blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`, 8158 bytes, SHA-256 `9bbb22f6002692baa5e1e341b5998cc71c1937d99c0ee4babcefca8bd79a9418` (present unchanged at `1c013a6b…`)         |
| Fixed semantic input             | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, `governance/drafts/release-3-preparation/semantic-research-result.md`, blob `8f21526040924b891f64724c2d0fde9ea94eff92`, 102312 bytes, SHA-256 `61b20c9b5e4c43ed54e67c74630fb1d5f87f0b972af76f3876ad09340dd9d06f`     |
| Acquisition result at the parent | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`, blob `34ee7f83368462a4782d86eff02b72cf5c18a0a0` at `1c013a6b…` (Parts A–S; read for Sections C.2, N.3, N.4 only)                                                                       |
| Live state at start (02:00 UTC)  | `review/r3-srd-primary-investigation-20260909` at `7190c78b…`; `research/r3-sri-acceptance-20260909` at `1c013a6b…`; `origin/main` at `fa82ccc174f33c4e68658a6b279034fd8399e055` in the clone and `ed6e9d9bde691556b99d22e261b31c3b25df338f` on the remote at 02:11 UTC |
| Investigation date               | 2026-09-09 (01:53–03:00 UTC approximately)                                                                                                                                                                                                                              |
| Investigator role                | separate-context follow-up investigator for SR-D (not the author of PR #236; see Section 2)                                                                                                                                                                             |
| Investigation branch             | `review/r3-srd-targeted-followup-20260909`, created from `7190c78b…` as sole parent (name confirmed unused on the remote: `git ls-remote origin 'refs/heads/review/r3-srd-targeted*'` empty)                                                                            |
| Files added                      | this file and `followup-checks.py` (same directory)                                                                                                                                                                                                                     |
| Files changed                    | none                                                                                                                                                                                                                                                                    |
| Comment on any pull request      | none posted                                                                                                                                                                                                                                                             |

### 1.1 Identity gate (re-derived from Git objects)

| Check                                                         | Expected                                | Observed                                                                                                                                                                                                                                         | Result |
| ------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Input commit, parent, tree                                    | `7190c78b…` / `1c013a6b…` / `24c77b70…` | `git cat-file -p 7190c78b…` → one `parent` line `1c013a6b…`, `tree 24c77b70…`                                                                                                                                                                    | match  |
| Report blob, bytes, SHA-256                                   | `785785be…` / 101944 / `06c9de68…`      | `git ls-tree -r 7190c78b…` → `785785be…` at the report path; `git cat-file blob … \| wc -c` → 101944; `sha256sum` → `06c9de68…`                                                                                                                  | match  |
| Script blob, bytes, SHA-256                                   | `ef6e2c15…` / 31967 / `caa2f95f…`       | same commands → `ef6e2c15…`, 31967, `caa2f95f…`                                                                                                                                                                                                  | match  |
| Commission blob at the parent                                 | `3c7ddcc6…`                             | `git ls-tree -r 1c013a6b…` → `3c7ddcc6…`; 8158 bytes; SHA-256 `9bbb22f6…`                                                                                                                                                                        | match  |
| Semantic input commit and blob                                | `7bd9c5ab…` / `8f215260…`               | `git cat-file -t` → commit; `git ls-tree -r 7bd9c5ab…` → `8f215260…`; 102312 bytes; SHA-256 `61b20c9b…`                                                                                                                                          | match  |
| Acquisition result blob at the parent                         | `34ee7f83…`                             | `git ls-tree -r 1c013a6b…` → `34ee7f83…`                                                                                                                                                                                                         | match  |
| Input head moved?                                             | `7190c78b…`                             | `git ls-remote origin refs/heads/review/r3-srd-primary-investigation-20260909` → `7190c78b…` at 02:11 UTC and before commit                                                                                                                      | no     |
| Read first documents at the input commit versus `origin/main` | identical                               | `git diff --quiet 7190c78b… origin/main -- AGENTS.md CHARTER.md AUTHORITY.md governance/ID-POLICY.md governance/RFC.md authority/authority-manifest.yaml registries/requirements.yaml` → no difference (see Section 11 for the refreshed `main`) | match  |
| Unchanged PR #236 script rerun                                | exit 0, 55 `[ok]`                       | `python3 reproduce-sr-d.py` from the blob → exit 0, 55 `[ok]`, 2 `[info]`                                                                                                                                                                        | match  |

## 2. Independence, prior involvement, reading order and model testimony

**Prior involvement (disclosed).** This investigator did not author PR #236, its report or
its script, any Part of the acquisition result, either commission, the fixed semantic
result, or any preserved review; this is therefore an independent follow-up, not
investigator repair. It ran in a fresh session created at 01:53 UTC on 2026-09-09 from a
clean clone, after PR #236 was opened at 01:43 UTC.

**Not blind (disclosed).** Before opening the PDFs this investigator read the PR #231
body (including the follow-up instruction and the coordinator's receipt paragraph, which
already states the seven-cells-in-six-rows observation), the PR #236 body, the PR #236
report in full and its script in full, the commission, and the acquisition-result
passages named in Section 1. The coordinator's cell-count observation was therefore known
before it was verified here; Section 4 records what was verified and how.

**Model and context basis (disclosed).** The session-description service reports
configured model `claude-fable-5-1` and last-served model `claude-fable-5-1` for this
session. PR #236 records the same service-reported model. Separate-context independence
from PR #236 and from every author Part is claimed; same-model-family independence is not
claimed. The "independently written" calculation of Section 6 was written from the
printed formulas after the earlier script had been read, so it is independent in code
and in derivation path, not in authorship lineage; its results were also checked by hand
(Section 6.2).

**Reading order (exact).** (1) `AGENTS.md`; (2) `CHARTER.md`, `AUTHORITY.md`, the
authority manifest, requirements registry, `governance/ID-POLICY.md` and
`governance/RFC.md` (confirmed byte-identical between the input commit and `main`; not
studied in full because no authoritative artifact is touched); (3) the PR #231 body and
the follow-up instruction; (4) the PR #236 body, files and identity gate; (5) the PR #236
report, Sections 1–18; (6) the PR #236 script; (7) the commission, in particular
"Required source coverage" and "Hold dispositions"; (8) acquisition result Sections C.2,
N.3 and N.4; (9) PDF hashing, page counts and per-page text extraction with PyMuPDF
1.28.2; (10) page images at 150–200 dpi for the pages listed in Section 3.2; (11) the
supplemental script; (12) this record.

## 3. Source custody and re-inspection boundary

### 3.1 Identity of the four supplied originals

Recomputed with `sha256sum` and `stat`; page counts with PyMuPDF. All four match PR #236
Section 3.1, acquisition result Part C Section C.2 (supplier 15, row 15) and Part N
Section N.3 (suppliers 40, 41, 43) byte for byte.

| Supplier | File                     |  Bytes | PDF pages | SHA-256 (recomputed)                                               | Matches C.2 / N.3 and PR #236 3.1 | Printed page = PDF page +   |
| -------- | ------------------------ | -----: | --------: | ------------------------------------------------------------------ | --------------------------------- | --------------------------- |
| 15       | `15_Marcus_1976.pdf`     | 446500 |         7 | `7b81e37b502d885658249196f25db32e1682d6461f3c15f7a3d56e3732899a24` | yes                               | 653 (PDF page 1 is a cover) |
| 40       | `40_Bretz_2009.pdf`      | 439933 |        19 | `87041fa4b4d17e6a2832536d586cc26b253422255df59cd00a86344f6b0a5664` | yes                               | 585                         |
| 41       | `41_Dmitrienko_2003.pdf` | 106251 |        14 | `c1df1453c5001cfeae4bd3d52d31e46f7248cd7b3524ec7d46e2d47ef0a07ed4` | yes                               | 2386                        |
| 43       | `43_Wiens_2003.pdf`      | 120883 |         5 | `f9634c824d637b2f1e262d226c8bd3d7d01f540501facdaead9c1e802eed5bd7` | yes                               | 210                         |

The Maurer, Hothorn and Lehmacher (1995) chapter (SRC-27 (b)) was not supplied with this
instruction, which makes it optional for this pass. Custody was re-checked: no receipt,
hash or page for it exists at the input commit (`git grep` over the tree for "Hothorn"
finds only citations in the acquisition result and PR #236). PR #236 Section 18.1 was
therefore not executed; Section 7.4 keeps the access status open.

### 3.2 Direct versus reused reading

PR #236's full reading of the four originals is reused explicitly for everything not
listed here. Directly re-inspected on page images and extracted text for this record:

| Supplier | Printed pages re-inspected                            | Purpose                                                                                                                                                                                                                                                                 |
| -------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 15       | 657, 658, 659                                         | definition of `p(·; m; λ)` (657); the equal-`n` mixture formula and every cell of Table 1 (658); Tables 2–3 and "taken from Table 1" (659)                                                                                                                              |
| 43       | 212, 213                                              | fixed-sequence definition (212); fallback definition, rule and the `I = 2` proof (213)                                                                                                                                                                                  |
| 41       | 2388, 2390, 2391, 2392, 2393, 2394, 2395              | gatekeeping citations (2388); Conditions 1–2 and Algorithm 1 (2390); Table I and Algorithm 2 (2391); properties (2392); weighted Simes (2393); Table II (2394); Table III and equation (1) (2395)                                                                       |
| 40       | 587, 588, 591, 592, 593, 596, 597, 598, 602, 603, 604 | the [9] subclass sentence (587); Figure 2 text (588); Algorithm 1 (591); Remarks (592); fixed sequence and fallback graphs (593); ε rules and family statement (596–597); improved gatekeeping example (598); Appendix (602–603); references 2, 3, 5, 6, 7, 9, 18 (604) |

Not re-inspected: everything else (reused from PR #236 as recorded there). Nothing
outside the four originals and the fixed repository records was consulted. No PDF, page
image or extract is committed.

## 4. Question A — Marcus Table 1 accounting and the check itself

### 4.1 What the printed page says (direct)

Printed p. 658 gives, for equal sample sizes, `pr(D²_g > t²) = Σ_{M=r}^{k} Σ* Π_{j=1}^{r}
p(m_j; λ_j) pr(χ²_{M−r} > t²)`, with `Σ*` over all `(m_1, …, m_r)` with `1 ≤ m_j ≤ λ_j`
and `Σ m_j = M`. Printed p. 657 defines `p(·; m; λ)` only as "the probability that the
amalgamation process leads to exactly m different values" and refers to Bartholomew (1959)
and Barlow et al. (1972); no formula for it is printed. Table 1 (p. 658) has 32 rows in
three column blocks, each row with a 5 % and a 1 % point: 64 cells. Every cell was
re-transcribed from the page image for this record; the transcription agrees with the
earlier script's `table1` dictionary in all 64 cells.

### 4.2 What PR #236 says, and where it is wrong (direct)

Section 4.6 of the PR #236 report says "six cells" and "58 of the 64 printed points",
then lists the 5 % point of (2, 3, 4), the 5 % points of the four four-block rows, and
"both points of the five-block row (2, 2, 2, 2, 2)": that is seven cells in six rows. Its
`expected_discrepancies` dictionary has six keys and seven non-`None` values. Its check
"58 of 64 printed points agree … to within 0.001" asserts `len(discrepancies) == 6 and
all(len(v) == 2 …)`, i.e. six differing rows each recorded as a pair; it never counts
cells. The PR #236 body, commit message and Finding N-1 repeat "six … cells". The 55
passes observed by the coordinator and reproduced here (Section 1.1) do not validate the
"58 of 64" label; they validate that six rows differ.

### 4.3 Verified count at the stated tolerance (direct computation)

`followup-checks.py` Part A recomputes all 64 points from the p. 658 formula with the
level probabilities `p(m; λ) = |s(λ, m)| / λ!` (unsigned Stirling numbers of the first
kind, the equal-weights form; an investigator formula, see 4.4) and counts differing
cells:

| Tolerance | Differing cells | Rows containing one | Agreeing cells |
| --------: | --------------: | ------------------: | -------------: |
|    0.0005 |              13 |                  11 |             51 |
|     0.001 |               7 |                   6 |             57 |
|     0.002 |               7 |                   6 |             57 |
|     0.005 |               6 |                   5 |             58 |
|      0.01 |               6 |                   5 |             58 |

At the tolerance stated by PR #236 (0.001) the actual count is **57 of 64 agreeing, seven
differing cells in six rows**: (2, 3, 4) 5 % (printed 7.394, computed 7.397); (2, 2, 2, 2)
5 % (6.322 / 6.498); (2, 2, 2, 3) 5 % (6.966 / 7.185); (2, 2, 2, 4) 5 % (7.440 / 7.688);
(2, 2, 3, 3) 5 % (7.585 / 7.840); (2, 2, 2, 2, 2) 5 % (7.248 / 7.480) and 1 % (11.001 /
11.183). The tolerance is not borderline for these seven: the smallest gap is 0.0032 and
the widest gap among agreeing cells is 0.0008. Six further cells, all 1 % points ((2, 2),
(3, 4), (2, 2, 2), (2, 2, 6), (3, 3, 4), (2, 2, 2, 4)), differ only in the last printed
digit (0.0005–0.0008), which is why the count is 13 at the rounding tolerance 0.0005. The
"58 of 64" figure is correct only at a tolerance of 0.005 or more, where the (2, 3, 4) 5 %
cell no longer counts; that is not the tolerance PR #236 states.

### 4.4 Internal consistency versus independent accuracy (direct)

Two things are separated:

- **Transcription and arithmetic consistency.** The 64 printed values were transcribed
  twice (PR #236 and here) with identical results, and the recomputation is
  deterministic; the count above is the exact consequence of the formula as implemented.
- **Independent accuracy of the chi-bar-square calculation.** This has three parts. (i)
  The chi-square tails: the earlier closed forms were re-implemented and compared with a
  second, independent implementation (regularized incomplete gamma by series and Lentz
  continued fraction); all 64 critical points agree to 3.6 × 10⁻¹⁵. (ii) The level
  probabilities: the Stirling formula is not printed in the source. Two identities that
  do not use Stirling numbers corroborate it partially: for λ = 3 and λ = 4 the
  probability of a single level equals the orthant probability that every partial mean
  is at least the overall mean, computed from the bivariate (arcsine) and trivariate
  (Plackett) orthant formulas as 1/3 and 1/4, matching |s(3, 1)|/3! and |s(4, 1)|/4!;
  and the probability of λ levels is 1/λ! in both. The middle probabilities for λ ≥ 4
  and all probabilities for λ ≥ 5 rest on the formula alone (a standard result of
  Barlow et al. 1972, an uninspected text). (iii) Two source-printed anchors reproduce:
  the (2, 2) 5 % point 4.231 from the direct two-term form 0.5 pr(χ²₁ > t) + 0.25
  pr(χ²₂ > t) = 0.0500, and the four single-block 5 % points 3.820, 4.528, 5.049, 5.460
  printed in Table 3 (p. 659). Together with the agreement of 57 cells to within 0.001,
  including all 1 % points of the rows whose 5 % points differ, this supports reading the
  seven cells as errors in those cells rather than a different definition; it remains an
  investigator observation, not an acknowledged erratum.

### 4.5 The corrected diagnostic and detection (direct)

`followup-checks.py` counts differing cells (`differing_cells`) and keeps the earlier
row predicate (`row_count_predicate`) for comparison. Three mutation tests: (a) changing
the (2, 3, 4) 1 % cell to 11.200 leaves the row predicate passing while the cell count
moves 7 → 8; (b) replacing the (2, 2, 2, 2, 2) 1 % cell by its computed value leaves the
row predicate passing while the cell count moves 7 → 6; (c) changing the (2, 2) 1 % cell
fails both. A changed discrepancy count is therefore detected by the new diagnostic and,
in the two cases that matter, not by the old one.

### 4.6 Consequence for PR #236

The correct statements are: 57 of 64 cells agree within 0.001; seven cells in six rows
differ; N-1, Section 4.6, Section 10 F-D-12/I-D-06, Section 13 and the PR body should say
"seven cells" and "57 of 64". Nothing changes for CLS-01: the catalogue does not use
Table 1 (PR #236 4.6), and reopen condition R-D7 stands. Severity: SHOULD-FIX for the
record's own accuracy (Finding F-1, Section 8).

## 5. Question B — mathematical scope versus numerical examples

### 5.1 The general-`I` fallback proof (PR #236 Section 5.3): reviewed, holds

Source basis (direct, printed p. 213): the rule, the strong-FWE claim, the `I = 2`
four-case proof, and "A proof for I > 2 would be analogous". The investigator proof
was checked step by step:

- Let the true null hypotheses be `t_1 < t_2 < …` in the testing order and `F_j` the
  (possibly empty) set of false hypotheses strictly between `t_{j−1}` and `t_j` (`F_1`:
  those before `t_1`). On the event that no true hypothesis before `t_j` has been
  rejected, the level of `H^(t_j)` is `α'_{t_j}` plus the `α'` of the maximal run of
  consecutive rejections ending at `t_j − 1`; that run cannot contain `t_{j−1}` (not
  rejected) so it lies inside `F_j`, giving the deterministic bound `c_j = α'_{t_j} +
Σ_{l ∈ F_j} α'_l`. Correct.
- `{H^(t_j) is the first true hypothesis rejected} ⊆ {p_{t_j} ≤ c_j}`; the events for
  different `j` are disjoint; so `P(any true rejected) ≤ Σ_j P(p_{t_j} ≤ c_j) ≤ Σ_j c_j ≤
Σ_i α'_i = α`, using only marginal validity `P(p_i ≤ c) ≤ c` for true `H_i` and the
  disjointness of the sets `{t_j} ∪ F_j`. Correct; no dependence assumption; the bound
  is attained (equality) when, for example, the false hypotheses all precede the last
  true one and are always rejected (script check B-2, `I = 4`).

Assumptions and edge cases: (i) marginal validity of each true p-value at every level
`c ∈ [0, 1]`; (ii) `Σ α'_i = α ≤ 1` (the source) — `≤ α` suffices; (iii) a hypothesis
at level `α_i = 0` is rejected only if `p_i = 0`; a true hypothesis contributes
`P(p_i ≤ 0) ≤ 0`; a false hypothesis with `p_i = 0` rejected at level 0 passes level 0,
so no later level changes whichever convention is used, and the guarantee is
convention-free; (iv) no stopping, no selection, deterministic order; (v) if no
hypothesis is true the bound is trivial. Needed narrowing: none for the guarantee. The
only convention to declare is the treatment of `p_i = 0` at level 0 for the decision on
that hypothesis itself; the earlier script never rejects at level 0, the source's rule
`p_i ≤ α_i` does. Script check B-1 confirms the exact worst-case FWER for `I = 4` in all
15 true/false configurations.

### 5.2 The shortcut/closure proof under (A1)–(A2) (PR #236 Section 7.2): reviewed, holds

Source basis (direct, printed pp. 602–603): (A1), (A2), the [9, Theorem 1] shortcut
quoted, Appendix (ii) (order-independence and induction of (A1)–(A2)), Appendix (iii)
(shortcut = Algorithm 1). The investigator proof replaces the sufficiency direction of
[9]. Checked:

- (a) For the `u`-th shortcut rejection `j_u` with `I_u = M \ {j_1, …, j_{u−1}}` and
  `p_{j_u} ≤ α_{j_u}(I_u)`: any `J ∋ j_u` either contains some earlier `j_v` — with `v`
  minimal, `J ⊆ I_v` and by (A2) `α_{j_v}(I_v) ≤ α_{j_v}(J)`, so the local test of `H_J`
  rejects — or contains none, so `J ⊆ I_u` and `p_{j_u} ≤ α_{j_u}(I_u) ≤ α_{j_u}(J)`.
  Correct; (A2) is applied with `J ⊆ I`, including `J = I` trivially.
- (b) If the shortcut stops at `I` with `p_i > α_i(I)` for all `i ∈ I`, the local test
  of `H_I` fails and no `H_i`, `i ∈ I`, is a closed-test rejection. Correct.
- Together the rejection sets coincide for every admissible selection rule, which gives
  Remark (iii); strong FWER control follows because each local test has level `Σ_{i∈I}
α_i(I) ≤ α` under marginal validity, with `α_i(I) = 0` contributing `P(p_i ≤ 0) ≤ 0`.
  The necessity direction of [9] and consonance are not used; consonance is a
  by-product.

Assumptions and edge cases: (A1) and (A2) for every non-empty `I ⊆ M` (Bretz Appendix
(ii) proves them for graph-generated levels); local tests of the form "reject `H_I` iff
some `i ∈ I` has `p_i ≤ α_i(I)`"; the same rejection rule in the shortcut and in the
local tests. Needed narrowing (not an implementation import): with `p_i = 0` and
`α_i(I) = 0` the literal rule rejects and the earlier script's rule does not; unlike the
fallback, in a graph procedure a rejection at level zero changes the transition matrix
for the remaining vertices, so the two conventions can give different rejection sets
when some observed `p_i = 0`. The equivalence and the guarantee hold under either
convention applied consistently; the convention has to be declared wherever the
procedure is transcribed (extends N-5). Script checks B-3 and B-4 verify shortcut =
closure under every selection order (not only the argmin) for the Figure 5 loop graph
and the parallel gatekeeping graph.

### 5.3 General two-family parallel Bonferroni gatekeeping as a graph: construction and proof (investigator)

PR #236 Section 9.1 generalized from `k = 2, m = 4` and `k = 3, m = 6`. A proof is
supplied here so that the claim no longer rests on tested instances.

**Construction.** Gatekeepers `1, …, k`, secondaries `k+1, …, m`, weights `w_i > 0` with
`Σ_{i≤k} w_i = 1` and `Σ_{i>k} w_i = 1`. Initial levels `α_i = w_i α` for gatekeepers, `0`
for secondaries. Edges: gatekeeper `i` → secondary `j`: `w_j`; secondary `i` →
secondary `j ≠ i`: `w_j / (1 − w_i)`; no other edges. Regularity holds (each row sums to
1; a single secondary has no outgoing edge, row sum 0). Assumptions: `k ≥ 1`, `m − k ≥ 1`,
all weights positive.

**Claim.** For every non-empty `H ⊆ {1, …, m}`, the levels generated by removing the
vertices outside `H` (Bretz Remark (v), Appendix (ii)) equal `α ×` Algorithm 1 weights
(printed p. 2390) in all three cases.

**Proof.** Write `A` for the gatekeepers in `H`, `B` for the secondaries in `H`, `W_S =
Σ_{l∈S} w_l` for a secondary set `S`. Because the generated levels do not depend on
removal order (Appendix (ii), source-proved for any real graph), remove the secondaries
outside `B` first, then the gatekeepers outside `A`.

_Invariant under removal of a secondary `j` from the current secondary set `S`
(gatekeepers untouched):_ secondary levels stay 0 (nothing to pass); gatekeeper levels
and gatekeeper-to-gatekeeper edges (all 0) are unchanged, since a secondary has no edge
to a gatekeeper (`g_{ji} = 0`); the secondary sub-graph stays proportional: with `g_{lk} =
w_k / (W_S − w_l)`, the update (A4) gives `(g_{lk} + g_{lj} g_{jk}) / (1 − g_{lj} g_{jl})
= [w_k W_S / ((W_S − w_l)(W_S − w_j))] / [W_S (W_S − w_l − w_j) / ((W_S − w_l)(W_S −
w_j))] = w_k / (W_{S∖j} − w_l)`; and gatekeeper-to-secondary edges stay proportional:
`g_{ik} = w_k / W_S` becomes `(w_k/W_S + (w_j/W_S)(w_k/(W_S − w_j))) / 1 = w_k /
W_{S∖j}`. So after this phase: gatekeeper levels `w_i α`, secondary levels 0, `g_{ik} =
w_k / W_B`, secondary sub-graph proportional over `B`.

_Removal of a gatekeeper `j`:_ its level `w_j α` goes to secondary `k ∈ B` in the amount
`w_j α w_k / W_B`; gatekeeper-to-gatekeeper edges are 0 so no gatekeeper level changes and
(A4) leaves every other edge unchanged (`g_{lj} = 0` for every remaining `l`). If `B` is
empty the level is lost (no outgoing edge to a remaining vertex).

_Cases._ `A = {1, …, k}` (Case 1): no gatekeeper is removed; levels `(w_i α)_{i∈A}`, 0 on
`B`. `∅ ≠ A ⊊ {1, …, k}`, `B ≠ ∅` (Case 2): secondaries in `B` receive `Σ_{j∉A} w_j α
w_k / W_B = α w_k (1 − Σ_{i∈A} w_i) / W_B`, gatekeepers in `A` keep `w_i α`. `∅ ≠ A ⊊ {1,
…, k}`, `B = ∅` (Case 2 with no secondary): `(w_i α)_{i∈A}`, sum below `α`, matching
PR #236's reading of Algorithm 1's vacuous secondary formula (its 6.2 (c)). `A = ∅`
(Case 3): each removed gatekeeper passes `w_j α w_k / W_B` to `k ∈ B`, total `α w_k /
W_B`. In every case the levels are `α ×` the Algorithm 1 weights. ∎

Boundaries: Algorithm 1 divides by `Σ_{secondaries in H} w_j`, which is undefined if
some weights are 0 and `H` contains only zero-weight secondaries; the proof assumes all
`w_i > 0`, which the source implies ("relative importance") but does not state. `k = 1`
has no Case 2; `m − k = 1` has no secondary edges; both are covered. Script check B-5
verifies the identity exactly for `(k, m) = (1, 3), (2, 3), (3, 4), (2, 6), (3, 7),
(4, 6)` with unequal rational weights on every intersection; B-6 verifies removal-order
independence for `(3, 5)` over all orders. Status: investigator result with exact
assumptions; the source states the representation for `k = 2, m = 4` only (p. 588); the
general statement is not a source claim.

### 5.4 Serial gatekeeping as an ε-graph: source status, symbolic limit, boundaries

**What the source establishes (direct, pp. 596–597).** The ε calculation rules (ε a
fixed positive real in transition updates; `ε → 0` when levels are read); the Figure 9
and 10 examples; and the family statement "The significance level for the hypotheses in
`F_k` is then shifted to hypotheses outside of `F_k` only if all hypotheses in `F_k` have
been rejected", with "it makes no difference which hypotheses in `F_k` are chosen as the
origin of the ε edges". These are stated, not proved, and the equivalence with
Dmitrienko et al.'s Algorithm 2 weights is not stated anywhere in the source. The
identity PR #236 needs is therefore investigator work.

**What PR #236 did.** Its script uses an exact rational `ε = 10⁻⁹`, reads levels by
converting to float and rounding to 10⁻⁸, and compares with Algorithm 2 for `k = 2, m =
4`, weights (0.9, 0.1, 0.5, 0.5). That is a finite-ε numerical corroboration for one
instance whose levels happen to be terminating decimals; it is not a limit and not an
error certificate. Script check B-11 shows that the same rounding would misreport an exact
level `α/3 = 1/60` as unequal, so the method does not even generalize numerically.

**Symbolic proof for the bounded construction (investigator).** Construction (as in the
PR #236 script): `k ≥ 2` gatekeepers, `m − k ≥ 1` secondaries, weights `w_i > 0` summing to
1 within each family; initial levels `w_i α` on gatekeepers, 0 on secondaries;
gatekeeper `i` → gatekeeper `j ≠ i`: `(1 − ε) w_j / (1 − w_i)`; gatekeeper `i` → secondary
`j`: `ε w_j`; secondary `i` → secondary `j ≠ i`: `w_j / (1 − w_i)`. Every row sums to 1.
Claim: `lim_{ε→0}` of the generated level of `i ∈ H` equals `α ×` Algorithm 2 weight
(printed p. 2391) for every `H`.

Proof. For fixed `ε > 0` this is an ordinary graph, so Appendix (ii) applies: the levels
are well-defined rational functions of `ε`, independent of removal order. Four facts hold
at every stage, by induction on removals (each verified by the (A3)/(A4) formulas exactly
as in 5.3): (F1) row sums stay 1 (`Σ_k g'_{lk} = [(1 − g_{lj}) + g_{lj}(1 − g_{jl})] /
(1 − g_{lj} g_{jl}) = 1`); (F2) the secondary sub-graph stays proportional and is never
altered by a gatekeeper removal (no secondary → gatekeeper edge); (F3) every
gatekeeper-to-secondary edge is `e_i(ε) · w_k / W_S` with a common factor `e_i(ε)` per
gatekeeper, because a gatekeeper removal multiplies the whole secondary block of row `i`
by the same factor and a secondary removal preserves proportionality; (F4) `e_i(ε) > 0`
for `ε > 0`. Now fix `H` with gatekeeper set `A` and secondary set `B`.

_Case `A ≠ ∅`._ Remove the secondaries outside `B` first (levels 0, nothing passed), then
the gatekeepers outside `A`. While at least three gatekeepers remain, every denominator
`1 − g_{lj} g_{jl}` in the gatekeeper block is bounded away from 0 at `ε = 0` (at `ε = 0`
the gatekeeper block is the proportional closed graph with `g_{lj} = w_j / (W_A − w_l) < 1`
when a third gatekeeper remains), so the gatekeeper levels and edges are continuous at
`ε = 0` and equal their `ε = 0` values: the proportional closed graph gives `α w_i / W_A`
for `i ∈ A`, and `e_i(0) = 0` (rows sum to 1 inside the gatekeeper block at `ε = 0`).
When exactly two gatekeepers `l, j` remain and `j` is removed, the levels use `g_{jl}`
and `e_j`, both continuous at 0 with limits 1 and 0; so `l` receives the whole remaining
gatekeeper level in the limit and the secondaries receive `O(ε)`. Hence
`lim α_i(H) = α w_i / W_A` for `i ∈ A` and 0 for `i ∈ B`: Algorithm 2 Case 1.

_Case `A = ∅`._ Remove all gatekeepers but one as above; the survivor `l` has level
`α − O(ε)` (total level is conserved by (F1) and the secondaries hold `O(ε)`). By (F1) and
(F3) its outgoing row is `e_l w_k / W_S` with `e_l = 1` exactly, since no other
gatekeeper remains: `g_{lk} = w_k / W_S` for every `ε > 0`, no limit needed. Removing `l`
gives each secondary `α w_k / W_S + O(ε)`; removing the secondaries outside `B` in the
proportional block (5.3) gives `α w_k / W_B + O(ε)`. Limit: Algorithm 2 Case 2. ∎

Exact verification: `followup-checks.py` implements rational functions in ε with
`Fraction` coefficients and takes the exact limit (order comparison of numerator and
denominator at ε = 0; no floating point). Check B-7 confirms the identity on every
intersection for `(k, m) = (2, 3), (2, 4)` (two weight sets, one with levels `α/3`),
`(3, 5)` and `(3, 6)`; B-8 confirms the survivor's edges are exactly `w_k` (constant in
ε); B-9 that its level is `α − O(ε)`, not a constant.

Boundaries. (i) `k ≥ 2` is necessary for this construction: with `k = 1` the coded
gatekeeper row sums to ε, the level passed is `O(ε)` and the limit levels of the
secondary-only intersections are 0, not Algorithm 2's `w_k / W_B` (check B-10); a
single-gatekeeper serial procedure needs ordinary weight-1 edges, as in the source's
fixed-sequence graph. (ii) The proof is for this construction only; the source's
assertion that the choice of ε-edge origin is immaterial is neither used nor proved
here. (iii) Nothing is claimed for graphs with more than two families or for the
ε-improved parallel procedure (Figure 12), which remain reopen triggers R-D6. No graph
research programme beyond this is launched.

## 6. Question C — Dmitrienko ambiguity and guarantee partition

### 6.1 Direct re-inspection (printed pp. 2390–2395)

- p. 2390: Conditions 1 and 2 (verbatim: gatekeeper adjusted p-values "do not depend on
  the significance of the p-values associated with `H_{k+1}, …, H_m`"; secondary
  adjusted p-values "are greater than the minimum of `p̃_1, …, p̃_k`"); Algorithm 1 Cases
  1–3 as transcribed in PR #236 6.2.
- p. 2391: Table I (15 rows; singleton rows `H_1: (0.5, 0, 0, 0)`, `H_2: (0, 0.5, 0, 0)`,
  `H_3: (0, 0, 1, 0)`, `H_4: (0, 0, 0, 1)`); Algorithm 2 Cases 1–2.
- p. 2392: "the adjusted p-values associated with the gatekeeper hypotheses are given by
  `p̃_i = p_i / w_i`"; Condition 2 "easy to demonstrate"; the Simes section states the
  unweighted Simes test with the Sarkar positive-dependence citation.
- p. 2393: the weighted Simes p-value `p_H = min_{1≤l≤t} p_(l)H / Σ_{i≤l} v_(i)H`, credited
  to Benjamini and Hochberg [15], with "Proof of type I error control for this procedure
  under positive regression dependency is given by Kling and Benjamini (unpublished
  manuscript, 2002)"; the resampling step 2 says the intersection p-values use "the
  weight vectors defined by algorithm 1".
- p. 2394: Table II lists `p_1000 = p_1` and `p_0100 = p_2` (singleton gatekeepers at
  full level) and `p_1011 = min(p_1/0.9, p_3/0.05, p_4/0.05)`, `p_0111 = min(p_2/0.1,
p_3/0.45, p_4/0.45)`, and states that its p-values "are based on the weighted
  Bonferroni rule" and "are defined using the weighting scheme defined in algorithm 1".
- p. 2395: Table III (verified on the page image cell by cell against the values used in
  both scripts) and equation (1).

### 6.2 Independent calculation and hand check

`followup-checks.py` Part C implements the closure over bitmask intersections, Algorithm
1 weights by direct transcription, the Table II singleton override, the weighted
Bonferroni local test, and the printed weighted Simes formula with and without rescaling
of the weights to sum to one over `H` (a term whose cumulative weight is zero is skipped,
the only reading under which the printed formula is defined). The scenario 1 Bonferroni
column was also computed by hand from Table II: `p̃_1 = max(0.0267, 0.0267, 0.0267,
0.0267, 0.0267, 0.0267, 0.0200, p_1000) = 0.0267` either way; `p̃_2 = max(0.0267 ×4,
0.00444, 0.0289, 0.00222, p_0100)`, which is 0.0300 only if `p_0100 = p_2/0.1 = 0.03`
(Algorithm 1) and 0.0289 if `p_0100 = p_2` (Table II); `p̃_3 = 0.0289` from `p_0110 =
min(p_2/0.1, p_3/0.9)`; `p̃_4 = 0.0267`. Results (checks C-1 to C-6):

| Column of Table III          | Reproduced by                                                                                    | Not reproduced by                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Bonferroni (three scenarios) | Algorithm 1 weights including the singleton gatekeeper at weight `w_i` (`p_i / w_i`)             | Table II's own singleton convention (`p_i`): mortality 0.0289              |
| Simes (three scenarios)      | printed formula with weights rescaled to sum 1 within `H`, equivalently with Table II singletons | printed formula with unrescaled Algorithm 1 weights: vent-free days 0.0267 |

So the two columns of the same table follow different singleton conventions, and Table
II's stated convention matches neither its own "Bonferroni rule" sentence nor the
Bonferroni column. This confirms PR #236 Finding S-2 by an independent route.

### 6.3 Decision-bearing differences

- Scenario 1, mortality, Bonferroni: 0.0300 (Algorithm 1) versus 0.0289 (Table II); the
  decisions differ for any `α ∈ [0.0289, 0.0300)` (C-3).
- Scenario 1, vent-free days, Simes: 0.0267 (unrescaled) versus 0.0260 (rescaled); the
  decisions differ for `α ∈ [0.0260, 0.0267)` (C-4). The printed 0.0260 is exactly
  `p_3 = 0.026`, attained at `H_1010 = min(p_1/0.9, p_3/1.0)` (C-5).
- At `α = 0.05`, `p = (0.04, 0.006, 0.02, 0.02)`: Bonferroni `p̃_2 = 0.0600` (Algorithm 1,
  `H_2` not rejected) versus 0.0444 (Table II, rejected) (C-7).
- At `α = 0.05`, `p = (0.046, 0.03, 0.01, 0.01)`: Simes `p̃_1 = 0.0511` (unrescaled, `H_1`
  not rejected) versus 0.0460 (rescaled, rejected) (C-8).

### 6.4 Conditions 1 and 2 under each convention (new investigator findings)

| Local test / singleton convention         | Condition 1 (`p̃_i` independent of secondary p-values)             | Condition 2 (`p̃_s ≥ min_i p̃_i`)          |
| ----------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| Bonferroni / Algorithm 1 (printed column) | holds: `p̃_i = min(p_i/w_i, 1)` exactly (C-9)                      | holds (C-13; PR #236 derivation 6.2 (b)) |
| Bonferroni / Table II                     | fails: mortality moves 0.0289 → 0.0300 with `p_3` (C-11)          | holds (C-13)                             |
| Simes unrescaled / Algorithm 1            | holds: `p̃_i = min(p_i/w_i, 1)` exactly (C-9)                      | **fails** (C-14, C-15)                   |
| Simes rescaled (printed column) / any     | **fails**: vent-free days moves 0.0260 → 0.0266 with `p_3` (C-10) | **fails** (C-14, C-16)                   |

Counterexamples (exact, hand-checkable from the printed formulas):

- Unrescaled Simes, `α = 0.05`, `p = (0.048, 0.03, 0.001, 0.001)`: `p̃_1 = 0.048/0.9 =
0.0533`, `p̃_2 = 0.3`, `p̃_3 = p̃_4 = 0.048` (the binding intersection is `H_{1234}` with
  ordered terms skip, skip, `0.03/0.1`, `0.048/1.0`). Both secondaries are rejected while
  neither gatekeeper is (C-15).
- Rescaled Simes (the printed convention), `α = 0.0215`, `p = (0.02, 0.021, 0.001, 0.03)`:
  `p̃_1 = 0.0222` (from `H_{1001} = min(0.02/0.9, 0.03/1)`), `p̃_2 = 0.03` (from
  `H_{0101}`), `p̃_3 = 0.021` (from `H_{1110}`, `H_{1111}`: skip, `0.02/0.9`, `0.021/1.0`).
  `H_3` is rejected while neither gatekeeper is (C-16).

Consequence: the source proves Conditions 1–2 (p. 2392) for the Bonferroni weighting
only. Its Simes-based procedure, defined by substituting the weighted Simes test into
the same closure (pp. 2392–2394), is not a parallel gatekeeping procedure in the sense of
its own Condition 2, under either singleton convention. Familywise error control is a
separate question (6.5). The source does not claim Conditions 1–2 for the Simes version
in so many words; it presents Table III's Simes column as "the Simes gatekeeping
procedure" and says (p. 2395) that in scenario 1 "the gatekeeping procedures have
rejected both gatekeeper hypotheses and continued to test the secondary hypotheses",
which is consistent with the example but not with the general property.

### 6.5 Guarantee partition

| Component                                                                                           | Basis in the supplied originals                                                                                 | Status                                                                                                                                   |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Weighted Bonferroni closed testing, any admissible weights (`Σ v ≤ 1`), either singleton convention | Marcus et al. p. 656 + Bonferroni inequality, Dmitrienko et al. pp. 2389–2390; no dependence assumption         | strong FWER established; adjusted p-values and rejection sets depend on the convention (S-2); "error control unaffected" is correct here |
| Weighted Simes local test, weights summing to 1 (Benjamini–Hochberg 1997 form = rescaled)           | cited: positive regression dependency, Kling and Benjamini unpublished manuscript (p. 2393)                     | validity not established in the supplied texts; uninspected and unpublished dependency                                                   |
| Weighted Simes with unrescaled Algorithm 1 weights (the printed formula read literally)             | investigator: `p_H(unrescaled) ≥ p_H(rescaled)` for every `H` (C-12), so it is the more conservative of the two | valid whenever the rescaled test is valid; that premise is the uninspected one; zero-weight terms are undefined in the printed formula   |
| Conditions 1–2 for the Simes version                                                                | investigator counterexamples (6.4)                                                                              | false in general under either convention; not a source claim                                                                             |
| Resampling version                                                                                  | p. 2393: plug-in, multivariate normal, simulation                                                               | outside this pass; unchanged from PR #236 6.4                                                                                            |

"Error control unaffected" (PR #236 S-2) is therefore to be read as a statement about
the Bonferroni version only; for the Simes version neither validity nor the gatekeeping
property is established by the supplied texts, and the latter is false as defined.

### 6.6 What is source-stated, investigator-reconstructed, or unresolved

| Item                                                                                | Class                                           |
| ----------------------------------------------------------------------------------- | ----------------------------------------------- |
| Algorithm 1 weights, Table I, Conditions 1–2, `p̃_i = p_i/w_i`, Bonferroni guarantee | source-stated                                   |
| Table II singleton at full level; Table II "Bonferroni rule" sentence               | source-stated (conflicting)                     |
| Bonferroni column = Algorithm 1 singleton convention                                | investigator-reconstructed (6.2)                |
| Simes column = rescaled weights / Table II singletons                               | investigator-reconstructed (6.2)                |
| Printed weighted Simes formula with unrescaled weights ≠ printed column             | investigator-reconstructed (6.2)                |
| Which convention the authors intended for either column                             | unresolved in the text                          |
| Validity of the weighted Simes test under dependence                                | unresolved (cited to an unpublished manuscript) |
| Conditions 1–2 for the Simes version                                                | investigator-derived: fail (6.4)                |
| Multi-family extension (Section 5 of the source)                                    | unresolved (PR #236 6.5), unchanged             |

No variant is chosen for implementation. Reopen trigger R-D3 stands and is extended: any
dependent proposal using the Simes version needs both the dependence proof and a
separate demonstration of the gatekeeping property (Section 10).

## 7. Question D — missing source and disposition

### 7.1 Internal inconsistency in PR #236 Sections 8 and 15 (b), and its resolution

The commission (blob `3c7ddcc6…`, "Hold dispositions") assigns `INPUT_INCOMPLETE` when
"required source text cannot be identified or inspected", and separately `PARTIAL` when
"some claims are supported but named gaps remain"; exactly one disposition is assigned.
The same rule is stated in "Required source coverage": "If required primary source text
cannot be identified or inspected, assign `INPUT_INCOMPLETE`". PR #236 Section 15 (b)
offers `PARTIAL` "if the steward keeps SRC-27 (b) required but accepts that some claims
are supported", and Section 8 lists "keep SRC-27 (b) required and treat CLS-02 and CLS-04
as the named gaps of a `PARTIAL` disposition" as a reduced-scope alternative. Under the
unchanged commission that combination is not available: while a required text is
uninspected, the `INPUT_INCOMPLETE` condition is met and `PARTIAL` cannot be assigned.
Resolution (no waiver, no commission change):

- Candidate disposition for SR-D: `INPUT_INCOMPLETE` — proposed, not enacted — the same
  as PR #236's primary candidate.
- PR #236 15 (b) is withdrawn as a candidate. `PARTIAL` becomes available only after a
  steward decision that removes SRC-27 (b) from the required basis for CLS-02 and CLS-04
  (Section 7.3) while keeping the attribution as a named gap; `CLOSED` only if, under
  that decision, the attribution is not a decision-bearing claim and every remaining claim
  is directly supported (PR #236 15 (a)), subject to review.
- PR #236 15 (c) (chapter obtained and read) is unchanged.

### 7.2 Attribution wording

The supplied originals establish only: Dmitrienko et al. (p. 2388) attribute gatekeeping
to Bauer et al. [5] (1998; authors Bauer, Röhmel, Maurer and Hothorn per its reference 5),
Westfall and Krishen [6] and Gong et al. [7], and do not cite the 1995 chapter; Bretz et
al. cite the 1995 chapter as reference 2 for fixed-sequence tests (p. 593: "[2, 3]") and
credit Bonferroni gatekeeping to [7]. The absence of a citation, and the presence of
others, does not show what the unread chapter contains — two of its three authors are
co-authors of the 1998 paper the 2003 text does cite. PR #236 Section 8's row "contradicted
as an attribution by the citation structure of both 2003 and 2009 texts" overstates;
the status to carry is **unverified attribution** (Finding F-3), which is also how PR #236
S-1 phrases it ("an unverified bibliographic claim"). The fixed-sequence attribution to
the 1995 chapter is likewise unverified but is at least consistent with the 2009
citation.

### 7.3 Bounded alternative-primary-basis proposal (for steward decision; unapproved)

Separate two things for CLS-02 and CLS-04:

| Entry  | Construction and guarantee (decision-bearing)                                                                                                                                                                                                                                                                                | Historical attribution (bibliographic)                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| CLS-02 | fixed-sequence definition: Wiens (2003) p. 212 §2.2; Bretz et al. (2009) p. 593 (Figure 6); guarantee: Wiens p. 213 as the special case of the fallback (`I = 2` proof) plus the general-`I` proof of PR #236 5.3 (reviewed in 5.1), and independently Bretz et al. Appendix plus the proof of PR #236 7.2 (reviewed in 5.2) | Maurer, Hothorn and Lehmacher (1995): unverified; cited by Bretz et al. reference 2                   |
| CLS-04 | serial Bonferroni gatekeeping: Dmitrienko et al. (2003) p. 2391 Algorithm 2 with the closed weighted-Bonferroni guarantee pp. 2389–2390; graph form: Bretz et al. pp. 596–597 with the symbolic ε-limit proof of 5.4 (`k ≥ 2`)                                                                                               | "1995 lineage": unverified; the 2003 text credits Westfall and Krishen (2001) and Bauer et al. (1998) |

What would change in the commission's required basis if the steward adopted this: in the
required-source set for SR-D (the commission's "exact source names are those in Sections
2.2 and 17 of the fixed semantic result"), SRC-27 (b) would move from "required primary
text for CLS-02 and CLS-04" to "attribution reference, unverified, not required for the
SR-D disposition"; CLS-02's decision-bearing basis would be SRC-27 (c) and SRC-26,
CLS-04's SRC-27 (a) and SRC-26; the catalogue label of CLS-04 would be reworded by the
author synthesis (for example "Serial gatekeeping (Dmitrienko–Offen–Westfall 2003
formulation after Westfall–Krishen 2001; 1995 attribution unverified)"). This is a
commission change for two entries and a steward decision; nothing here enacts it. The
investigator proofs cited in the table remain investigator work reviewed here; they do
not become a primary source by declaration, and the guarantee rows above rest on the
supplied originals with the proofs closing the stated gaps (`I > 2`; the [9] direction;
the ε identity).

### 7.4 The 1995 chapter: access status and minimum acquisition request

Not supplied; not in custody; access status **open**. No claim is made that acquisition
routes have failed; the fixed result records the route as "library" (X-5) and no attempt
is recorded. Minimum request: the single chapter Maurer W, Hothorn L, Lehmacher W,
"Multiple comparisons in drug clinical trials and preclinical assays: a-priori ordered
hypotheses", in Vollmar J (ed.), _Biometrie in der chemisch-pharmazeutischen Industrie_,
Fischer Verlag, Stuttgart, 1995, pp. 3–18 (16 pages; German-language per X-5; identity
from Bretz et al. reference 2). The full volume is not needed. Because the chapter's
internal structure is unknown, the whole chapter is the minimum; if only part can be
supplied, the pages defining the a-priori ordered procedure, its error-rate statement or
proof, any family-level (gatekeeping) rule, and the reference list are required. On
receipt, record bytes, page count, SHA-256, printed-to-PDF mapping and language, then
execute PR #236 Section 18.1 unchanged (its identities remain valid; the report location
may be this directory or PR #236's).

## 8. Findings

### BLOCKER

None. Nothing found contradicts the catalogue treatment of any SR-D entry; `NO_GO` is
not indicated.

### SHOULD-FIX (for the author synthesis when it reuses PR #236)

- **F-1 (A) — cell count.** PR #236 4.6, 10 (F-D-12, I-D-06), 13, N-1, its PR body and
  commit message say "six cells" / "58 of 64"; the count at the stated tolerance 0.001 is
  seven cells in six rows, 57 of 64. The script's "58 of 64" check label does not match
  its predicate. Repair: cite `followup-checks.py` A-3/A-4 or correct the label; keep the
  observation as N-1 and R-D7 (CLS-01 unaffected).
- **F-2 (C) — Simes version is not a gatekeeping procedure as defined.** Under the
  source's own definitions the weighted-Simes parallel procedure violates Condition 2
  under both singleton conventions, and the printed convention violates Condition 1
  (6.4). PR #236 S-2's "error control unaffected" holds for the Bonferroni version only.
  Repair: restate S-2 for Bonferroni; add the Simes version's failure of Conditions 1–2
  and unestablished validity to the CLS-05 narrowing and to D-D-04; extend R-D2/R-D3.
- **F-3 (D) — disposition candidates and attribution wording.** PR #236 15 (b) is not
  available under the unchanged commission (7.1); Section 8's "contradicted as an
  attribution" is to read "unverified attribution" (7.2). Repair: withdraw 15 (b) as
  written; condition `PARTIAL`/`CLOSED` on D-D-01; carry S-1 as unverified.
- **F-4 (B) — proof boundaries to record.** The general two-family graph result (I-D-05)
  now has a proof with assumptions `w_i > 0`, `k ≥ 1`, `m − k ≥ 1` (5.3); the serial
  ε-graph result has a symbolic proof for `k ≥ 2` and fails as coded for `k = 1` (5.4);
  the finite-ε rounding check is corroboration only. Repair: replace "verified for `k = 2,
m = 4`" and "so … graph-representable in general" in 9.1 by references to these proofs
  and their assumptions; note the `p = 0` at level 0 convention alongside N-5.

### NICE-TO-HAVE

- N-A. Six Table 1 1 % cells differ from the formula in the last printed digit only
  (4.3); immaterial for any use at three decimals.
- N-B. The earlier `eps_levels` reading fails for non-terminating levels (B-11); the
  supplemental exact-limit code can replace it if the script is ever revised.
- N-C. Table II's description of its own p-values ("weighted Bonferroni rule", "algorithm
  1") is inconsistent with its singleton rows; a third printed doubt to add to PR #236
  6.6.

## 9. Direct versus reused evidence, by question

| Question | Direct evidence produced here                                                                                                                                                                                       | Reused from PR #236 (as recorded there)                                           | Formulas / counterexamples / proof boundaries                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| A        | p. 657–659 re-read; Table 1 re-transcribed from the image; recomputation with two tail implementations; tolerance table; orthant and two-term identities; mutation tests                                            | reading of the rest of the paper; Tables 2–3 reproduction                         | p. 658 mixture formula; `p(m; λ) = \|s(λ, m)\|/λ!` (investigator, partially corroborated)     |
| B        | p. 213, 591–593, 596–598, 602–603 re-read; proofs 5.1–5.4 written and checked; exact `I = 4` FWER; all-order shortcut checks; general graph identity on six `(k, m)`; exact ε-limits on five cases; `k = 1` failure | the rest of the source reading; PR #236's derivations as the objects reviewed     | proofs in 5.1–5.4 with stated assumptions; boundaries: `p = 0` at level 0; `w_i > 0`; `k ≥ 2` |
| C        | pp. 2388–2395 re-read; independent closure code; hand computation of scenario 1; four decision-bearing examples; Conditions 1–2 table; dominance check                                                              | Table I reproduction; the multi-family reconstruction; the resampling description | counterexamples in 6.4; dominance `p_H(unrescaled) ≥ p_H(rescaled)`                           |
| D        | commission re-read; custody re-checked; reference lists of 41 and 40 re-read                                                                                                                                        | PR #236 Section 8 partition (agreed except the wording of one row)                | none (disposition logic)                                                                      |

## 10. Remaining exact gaps and reopen conditions

- G-1. SRC-27 (b) uninspected: CLS-02 attribution and original formulation; CLS-04
  lineage. Completion: PR #236 18.1 on the chapter, or steward decision D-D-01 per 7.3.
- G-2. Level probabilities `p(m; λ)` for `λ ≥ 4` (middle values) and `λ ≥ 5` rest on the
  standard formula, not on an inspected text or an independent identity; needed only if
  Table 1 is ever cited as an oracle (R-D7).
- G-3. Validity of the weighted Simes test under dependence (unpublished manuscript);
  and whether any modification of the Simes version restores Conditions 1–2. Both are
  outside SR-D's decision-bearing claims for the Bonferroni procedures; reopen triggers
  R-D2 and R-D3 (extended: a dependent proposal using a Simes-based gatekeeping procedure
  needs a demonstrated gatekeeping property, not only a dependence proof).
- G-4. The ε-edge-origin immateriality (p. 597) and multi-family ε-graphs: not proved
  here; R-D6.
- G-5. Bretz Appendix (ii)'s symbolic (A5) symmetry was relied on as source-proved and
  numerically confirmed (B-6), not re-derived.

## 11. Validation record and unverified scope

Commands run on the investigation branch with the two added files staged; outputs as
printed (see the pull request body for the same list):

- `pnpm install --frozen-lockfile`: "Done in 6.2s using pnpm v11.7.0"; exit 0 (existing
  lockfile; the clone had no `node_modules`).
- `pnpm format:check` (after `pnpm prettier --write` on this file): recorded in Section
  11.1 below.
- `pnpm lint:markdown`, `node --import tsx tooling/src/validate.ts`, `git diff --cached
--check`: recorded in Section 11.1 below.
- `python3 review-inputs/r3-srd-targeted-followup/followup-checks.py`: "all checks
  passed"; 57 `[ok]` lines, 5 `[info]` lines; exit 0; about 10 s.
- `python3` on the unchanged PR #236 script from blob `ef6e2c15…`: "all checks passed";
  55 `[ok]`; exit 0.
- `origin/main` was re-fetched before committing; the read-first documents at the input
  commit were compared against the refreshed `main` (Section 11.1).

Not run: full `pnpm check`, `pnpm test`, `pnpm typecheck`, `pnpm check:generated`, the
Phase 1 suite. No authoritative artifact is touched; the omission is disclosed, not
excused.

### 11.1 Actual outputs

Run on branch `review/r3-srd-targeted-followup-20260909` at `7190c78b…` with the two
added files present, after the final edit of this file (the two quick checks were rerun
after the edit; the other outputs are from the run immediately before it):

- `pnpm format:check`: "Checking formatting... All matched files use Prettier code
  style!"; exit 0.
- `pnpm lint:markdown`: "markdownlint-cli2 v0.23.2 (markdownlint v0.41.1) … Linting: 357
  files … Summary: 0 issues in 0 files"; exit 0. (PR #236 reported 356 files at its
  head; this file is the one addition. No stronger count claim is made.)
- `node --import tsx tooling/src/validate.ts`: "validate: OK - registries,
  traceability, normative lint, authority, gates, conformance manifest, links,
  private-dependency and language audits, phase-1 schemas, cross-checks, code-path
  audits, and the snapshot manifest mechanism are clean."; exit 0.
- `git diff --check` (with the new files intent-added) and `git diff --cached --check`
  before the commit: no output; exit 0.
- `git fetch origin main` moved the clone's `origin/main` from `cd217f88…` to
  `ed6e9d9b…`; the read-first documents at `7190c78b…` are identical to that `main`.
- `git ls-remote origin refs/heads/review/r3-srd-primary-investigation-20260909` →
  `7190c78b…` before the commit: the input head has not moved.

Unverified scope: everything not listed in Section 3.2; the contents of every uninspected
text named in PR #236 Sections 3.3, 8 and 15; the 1995 chapter; whether any erratum exists
for the printed doubts; the middle level probabilities of G-2.

## 12. Preserved state and public-artifact self-check

- Ledger 7 `CLOSED` / 1 `PARTIAL` / 6 `INPUT_INCOMPLETE`; overall `INPUT_INCOMPLETE`;
  `SOURCE_SET_READY=false`; `NARROW`; `TRANSFER`; every `R3-CAND`† and `RES-ONLY`†
  token; the SR-I acceptance of Part S; all other holds; the separate R4 state; SR-D's
  candidate `INPUT_INCOMPLETE` — all unchanged.
- PR #236's report and script, Parts A–S and every prior review are byte-identical to
  the input commit; the two added files are the only change.
- English throughout; role-based attribution; model and execution context disclosed in
  Section 2 as required provenance. No PDF, page image, full extract, private reference,
  normative keyword, identifier, schema, fixture, registry or generated file is added or
  touched. No hold accepted, no source substituted, no method adopted, no discussion
  opened, nothing merged or released.

## 13. Author-synthesis handoff

The author result for SR-D can be written now for CLS-01, CLS-03, CLS-05 and CLS-06 and
for the procedure-and-guarantee components of CLS-02 and CLS-04, reusing PR #236 Sections
4–7 and 11–12 with the corrections F-1 to F-4 applied, and reusing both scripts by blob
identity rather than re-deriving. It should: (i) state 57 of 64 / seven cells for Table 1;
(ii) restate S-2 for the Bonferroni version and record the Simes version's failure of
Conditions 1–2 and unestablished validity in the CLS-05 narrowing (D-D-04); (iii) cite the
proofs of 5.3 and 5.4 with their assumptions in place of the finite checks of PR #236
9.1, and record the `p = 0` at level 0 and zero-level argmin conventions with N-5;
(iv) keep the candidate disposition `INPUT_INCOMPLETE`, withdraw PR #236 15 (b), and put
D-D-01 (Section 7.3) to the steward with the attribution carried as unverified;
(v) preserve everything listed in Section 12; (vi) commission the exact-head independent
review of that author result with the four supplier hashes of 3.1 attached. No further
research requirement is invented by this record.

## 14. Additional-investigation prompt (unfinished item only)

The only unfinished item is the SRC-27 (b) reading, which was not possible because the
chapter was not supplied. PR #236 Section 18.1 already contains the executable prompt for
it and remains valid verbatim, with two additions: verify this record's commit, tree and
blob identities from its draft pull request as well; and, on the chapter's content,
record whether it defines a family-level (gatekeeping) rule at all, since F-3 keeps the
CLS-04 lineage as unverified rather than contradicted. Completion and stopping conditions
are those of 18.1. No repeated full review is prescribed; questions A–C are complete.
