# Release 3 Source-Acquisition Result Part K — Independent Primary-Source Review of the Ordered-Range Synthesis (Keuls 1952, Ryan 1960, Einot–Gabriel 1975, Welsch 1977)

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context, exact-head review of the Part K increment proposed in
PR #204 of the Release 3 semantic source-acquisition result. Part K records author-side
primary-source findings for SR-H claims `C-H1` (catalogue entry `APR-10`) and `C-H3`
(`APR-12`), an author-side calibration comparison for `C-H2` (`APR-11`), the reuse of the
accepted `C-H4` evidence (`APR-13`/`APR-14`), and a candidate `SR-H` disposition of
`PARTIAL`. This review re-hashed and re-read the four supplied originals, checked every
K.2 source statement against the printed page images at the stated pinpoints, re-derived
the K.3 mathematics independently, re-ran and extended the K.5 arithmetic diagnostic,
verified the K.4 printed inconsistencies on page images, and assessed the K.6 disposition
and ledger against the acquisition commission and the fixed semantic input. It selects no
Contract, procedure, identifier, schema, Public Check, tolerance, critical value,
implementation, RFC decision, R4 method, or release outcome; it updates no hold, issue,
gate, or catalogue class; it merges nothing and accepts nothing. Attribution is
role-based; material process provenance is disclosed in Sections 1 and 12.

**Content verdict: `GO` with one `SHOULD-FIX` item** (Section 11), bounded to the Part K
delta at the exact head below. Every K.2 source statement is supported by the printed
pages at the stated pinpoints; the K.3 deductions are mathematically correct and are
correctly separated from what the originals print; the K.5 diagnostic reproduces exactly
and is not presented as a proof; the three K.4 inconsistencies are confirmed on page
images and are correctly held as unresolved print conflicts rather than corrections.
Findings: `BLOCKER` 0, `SHOULD-FIX` 1, `NICE-TO-HAVE` 5 (Section 10). The `SHOULD-FIX`
does not change any disposition.

**`SR-H` candidate `PARTIAL`: consistent with the commission definition** (Section 8).
Every source text assigned to `SR-H` has now been inspected on the author side, so
`INPUT_INCOMPLETE` no longer describes the hold; the sources support some
decision-bearing claims and leave the named gaps recorded in K.6; `CLOSED` is not
reachable because the compound `APR-12` entry does not resolve to one reviewed
characterization. This review independently confirms the four-original basis only.
The `C-H1` Newman and `C-H2` Duncan readings (C.3 rows 06 and 17) have never been
independently reviewed by any record on the repository (Section 9); the minimal
additional scope needed before a hold-level `PARTIAL` is treated as independently
confirmed is stated there. **`APR-10`–`APR-14` stay `RES-ONLY`**; candidate ledger
5 `CLOSED` / 1 `PARTIAL` / 8 `INPUT_INCOMPLETE`; overall `INPUT_INCOMPLETE`; semantic
`NARROW`; 35 originals in custody. **Independence status: context `ESTABLISHED`; model
level: session-service-recorded for the review side, testimony-supported for the author
side; no steward determination is made here** (Section 12). **Formal hold acceptance,
merge, method adoption, critical-value adoption, numerical guarantee, public opening,
release: `NOT PERFORMED`** and not authorized by this record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                                                                                                                                                               |
| Reviewed pull request | #204 (draft; head branch `research/r3-srh-range-synthesis-20260908`; base `research/r3-srh-lsd-repair-20260908`, the PR #202 head accepted in continuation Section 16, comparison only)                                                                                                                                                                                                                                              |
| Reviewed exact head   | `070e5dd569f0dfcb6f15ec49daebc0544af217d9` (the PR head at the start and at the end of this review; see Section 2)                                                                                                                                                                                                                                                                                                                   |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                                                                                                                                                      |
| Review date           | 2026-09-08 (UTC)                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Reviewer role         | independent exact-head primary-source reviewer of the Part K delta, following result Section K.7, the acquisition commission's review clause, and the user's request to review PR #204                                                                                                                                                                                                                                               |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, any of Parts A–K of the result, the continuation record, or any prior review record. It was started fresh on 2026-09-08 (session created 01:55:15Z, after the reviewed commit at 01:51:18Z and PR #204 at 01:52:12Z) from a new clone. C.3 rows 06/17, Parts I/J, PR #201/#203 and continuation Section 16 are reused with attribution (Section 9) |
| Originals inspected   | four lawfully supplied PDFs (Section 3), delivered to the review environment by the user as local uploads; no retrieval, purchase, or redistribution                                                                                                                                                                                                                                                                                 |
| Review branch         | `review/r3-srh-range-synthesis-20260908`, created from the reviewed head as sole parent; an unused name at creation time                                                                                                                                                                                                                                                                                                             |
| Files added           | this file only                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Not stored in Git     | the PDFs, page images, crops, and full text extractions (kept in the session scratch directory only)                                                                                                                                                                                                                                                                                                                                 |
| Comment on the PR     | none posted                                                                                                                                                                                                                                                                                                                                                                                                                          |

Read before source work: `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `governance/ID-POLICY.md`,
`governance/RFC.md` (research gate rules 2–5 in particular), the pinned acquisition
commission (Section 2), result Section K.7, and the fixed semantic input's SR-H rows
(Sections 6, 8 and 17 of that document). No directory-local `AGENTS.md` exists under
`review-inputs/` or `governance/`.

## 2. Fixed identity verification (expected versus observed)

Live head checked at review start (before any source work) and again immediately before
the review commit; it did not move. `STALE_HEAD` does not apply.

| Check                                 | Expected                                                                                           | Observed                                                                                                                                                                           | Result |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Live head (start)                     | `070e5dd569f0dfcb6f15ec49daebc0544af217d9`                                                         | PR `head.sha` and `origin/research/r3-srh-range-synthesis-20260908` both `070e5dd5…`                                                                                               | match  |
| Live head (end)                       | same                                                                                               | re-fetched before commit: `070e5dd5…`; PR still open, draft, unmerged                                                                                                              | match  |
| Sole parent                           | `1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b`                                                         | `git cat-file -p 070e5dd5…` shows exactly one `parent` line, `1b2a1efa…`; equals PR `base.sha`                                                                                     | match  |
| Head tree                             | `859f257ed72331bcfb7d7b947b6f5481a1379142`                                                         | `git cat-file -p 070e5dd5…` → tree `859f257e…`                                                                                                                                     | match  |
| Result blob at head                   | `5ee739767f3b29db6a7628f092e26d9b909830c8`                                                         | `git rev-parse 070e5dd5…:<result path>` → `5ee73976…`                                                                                                                              | match  |
| Result bytes                          | 326756                                                                                             | `git cat-file -s` → 326756                                                                                                                                                         | match  |
| Result SHA-256                        | `ecddbd708a163c07e025098bc33f4b2225ac5b8c4a1db6c36c1970b54028cac9`                                 | `git show … \| sha256sum` → `ecddbd70…28cac9`                                                                                                                                      | match  |
| Changed paths parent → head           | the result file only, append-only                                                                  | `git diff --name-status` → `M` on the result path only; `+247/−0`                                                                                                                  | match  |
| Parts A–J prefix                      | first 303208 bytes identical to parent blob `94751f095f5b669c40520c84c40aaf3080eb552a`             | parent blob is 303208 bytes; SHA-256 of `head -c 303208` of the head blob equals SHA-256 of the parent blob (`53f71d64…7a93`)                                                      | match  |
| Commission blob                       | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at `f39100161cb45de15767bdb19ed54aba9489b41a`           | `git rev-parse f3910016…:<commission path>` → `3c7ddcc6…`; `f3910016…` is an ancestor of the head and is `origin/main`                                                             | match  |
| Fixed semantic input                  | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob `8f21526040924b891f64724c2d0fde9ea94eff92` | `git rev-parse 7bd9c5ab…:<semantic result path>` → `8f215260…`                                                                                                                     | match  |
| Continuation Section 16 locator (K.1) | commit `0202eb00c1e9b4f62b80ae4074160e1b58e77c57`, blob `000f27e012c5ab3446b16fd5f08f4c4d3a3b9ebb` | commit exists; `git ls-tree -r` carries that blob at `governance/drafts/research-continuation-2026-09-07.md`; its Section 16 records Part J acceptance and does not mention Part K | match  |
| Continuous integration on the head    | green                                                                                              | five check runs on `070e5dd5…`, all `completed` / `success`                                                                                                                        | match  |
| Prior SR-H review records             | present on their own branches, untouched                                                           | `review/r3-srh-lsd-primary-20260908` and `review/r3-srh-lsd-repair-20260908` add only their `REVIEW-RESULT.md`; not modified here                                                  | match  |

## 3. Source artifact identity and inspection performed

All four files were re-hashed from the supplied bytes and opened with an independent PDF
library; page counts were recomputed. Every value matches K.1 and D.2.

| Supplier / file           |   Bytes | PDF pages | SHA-256 (recomputed)                                               | Printed pages read (text)       | Page images inspected at 200 dpi                                                                                                      |
| ------------------------- | ------: | --------: | ------------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 35 / `35_Keuls_1952.pdf`  |  564826 |        11 | `3c15767f3d732bd3268b2dc7dacba397fd736e8181bb9ddbc0fc9a63941e1616` | 112–122 in full                 | 115, 116, 117 (full pages), 121 (footnote and closing paragraphs)                                                                     |
| 36 / `36_Ryan_1960.pdf`   |  750050 |        11 | `4a8b0f3429c4f538f5d34da776c6b410506b95e95b0a3d5d0bb21c6f2e522c99` | 318–322, 328                    | 319 (both columns, rules 1–3 and basis), 320 (block formula), 321 (EW expansion, footnote 3)                                          |
| 24 / `24_Einot_1975.pdf`  | 1211995 |        11 | `1b097f5cdf16785e0aebf9c29359b957beb94caf51bb46255eaceb3d841cd57b` | 574–579, 583 (§2.7, references) | 576 (all four quadrants: (1.6)–(1.19), footnote 2), 578 (left column: (1.23)–(1.26) and cross-references)                             |
| 25 / `25_Welsch_1977.pdf` |  954326 |        11 | `1111684b7f639503ae40caa063556f79f0da5729c34fcef6286ba9b2498a0600` | 566–571, 575                    | 567 (right column: model, T(i,k), P(d_i), Theorem 1 and proof), 568 (left column: A/B, §4, Theorem 2), 569 (Appendix A monotone rule) |

PDF page 1 is printed page 112 (Keuls) and 318 (Ryan); for the two JASA files PDF page 1
is a publisher cover and PDF page 2 is printed page 574 and 566 respectively, as D.2
states. Not inspected by this review, and not approved by it: Keuls's figures and the full
cabbage table; Ryan's proportion, variance and nonparametric procedures (pp.323–327);
Einot–Gabriel's Monte Carlo tables (pp.579–582); Welsch's critical-value tables and
Appendix B/C (pp.572–574). Newman (1939) and Duncan (1955) were not supplied and were not
read (Section 9).

## 4. K.2 source statements checked against the originals

Each row states what the printed page shows at the K.2 pinpoint and whether K.2's
statement is supported. "Supported" means the statement is a faithful, bounded reading of
the printed text; reviewer additions are marked as such.

| K.2 row                                      | Printed evidence at the pinpoint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Result                                              |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| C-H1 Keuls construction                      | p.115 proposition: chance deviations "of the same order of magnitude σ", "uncorrelated"; p.116 adds "the normal law of error"; balanced randomized blocks (13 varieties × 3 blocks). p.117: means arranged from high to low; the greatest difference 78,3 is compared with △_0,05 = 33,61 (13 means, 24 df). p.120: after concluding 1 differs from 3, "we ascertain whether 8 is distinct from 1" using the criterion for 12 means (33,09) and "removing each time a lowest variety"; p.121: "by eliminating each time the highest variety … a group of 5 varieties will remain … range 26,6 … smaller than △_0,05 = 26,91. Consequently variety 3 does no longer differ significantly from …". p.120: "Both criteria though not being identical, are nearly equivalent. Our experience is that, if F > F_0,05, also D > △_0,05". p.121 footnote 1: "gives more detailed conclusions than drawn by NEWMAN in his two examples and the same results as attained by TUKEY in the same two examples". | Supported (see N-K1 on the footnote's Tukey clause) |
| C-H1 limits of Keuls's argument              | p.120: "Therefore we have neglected the possible error in the first conclusion"; "the chances that the next conclusions are wrong become greater and greater because accumulation of faulty conclusions may occur. The smaller the remaining group … the greater the chances of a less exact test"; p.121: "Mathematical study about a good test remains to be done."                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Supported                                           |
| C-H3 Ryan's 1960 rule                        | p.318: layered testing, extremes first, "Whenever the extremes of a particular subgroup are found to be nonsignificant, we conclude that there are no significant differences within that subgroup"; p.319 rules 1–3 (image): first test at nominal two-tailed level 2a/n(n−1); next at 2a/n(n−2); general rule for a subgroup of k samples 2a/n(k−1); "we use whatever tables would ordinarily be used in testing the difference between a single pair of samples". p.328 step 4 restates 2a/n(k−1).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Supported                                           |
| C-H3 Ryan's error allocation and outputs     | p.320 (image): k₁(k₁−1)/2 · 2a/n(k₁−1) = (k₁/n)·a for the first population; "The error rate for the total experiment is not exactly the sum … but fortunately their sum is a good approximation"; the "complete expression" is the product 1 − Π(1 − k_i a/n). p.321 (image): EW ≤ Σ(k_i/n)a = a; worked example 1 − (1 − .01)⁵ = .0490099501; footnote 3: a share 1/n is "allotted to this single sample even though there will be no errors involving this mean except for false reversals", example (5·4/2)(2a/(6·4)) + 0 = 5a/6. pp.321–322: erroneous reversals discussed. p.322: "we pay no attention to the order of the means"; nominal rate 2a/n(n−1) per statement; "rate per experiment, and is also an upper limit for the error rate experimentwise".                                                                                                                                                                                                                                  | Supported (see N-K2 on the product form)            |
| C-H3 Einot–Gabriel model and containing sets | p.575 §1.2: independent normal means with variances σ²/n_i; s² with n_e s²/σ² chi-square, independent of the means. (1.2): ω_P rejected iff T_R > ζ_r for all R with P ⊆ R ⊆ K; "ω_P is retained if T_R ≤ ζ_r for at least one set R containing P, including P itself and the total set K". p.577 §1.6 stepwise procedure: a retained set retains "all its subsets".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Supported                                           |
| C-H3 distinct statistics and allocations     | p.576 (images): (1.8) T_P^(1) = (max ȳ_i − min ȳ_e)√n/s; (1.9) T_P^(2) = (Σn_iȳ_i² − (Σn_iȳ_i)²/Σn_i)/s² "equal to (p−1) times the F ratio"; (1.11) γ_p^NK = α; (1.12) γ_p^D = 1 − (1−α)^((p−1)/(k−1)) "when adjusted so as to ensure experimentwise level α"; (1.13) γ_p^R = 1 − (1−α)^(p/k); footnote 2: "Ryan himself chose the very slightly more conservative γ_p = αp/k (1.13′)". p.576 lines after (1.10): range and sum-of-squares decisions differ "for these decisions depend also on what has been decided on larger sets".                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Supported                                           |
| C-H1/C-H3 error-control distinction          | p.578 (image): for q widely separated homogeneous sets, Kimball's improved Bonferroni inequality gives (1.23) P(∪(T_{P_i} > ζ_{p_i})) ≤ 1 − Π(1 − γ_{p_i}); "In the case of known σ², the statistics are actually independent and (1.23) becomes an equality"; (1.24) P^NK = 1 − (1−α)^q for known σ² "and, approximately, for large error d.f."; (1.25) > α for q > 1; (1.26) P^R ≤ 1 − Π(1−α)^(p_i/k) = α "because Σp_i = k"; "A fortiori, under the Duncan allocation and the STP … never exceeds α".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Supported                                           |
| C-H3 Welsch ordering and model               | p.567: ordered treatment means "with equal sample sizes"; rules (1)–(3) for stretches; "The SNK procedure … examines the t stretch first"; step-up "Looking at the two stretches first"; t independent Gaussian populations, S² an independent χ²_ν/ν estimator; "Note that m₁, the smallest sample mean, does not necessarily come from M₁".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Supported                                           |
| C-H3 Welsch A/B and step-up/down variants    | p.568 (image): "A. P(j) = jα/t, j = 2, …, t−2, t, with P(t−1) = α" and "B. P(j) = jα/t, j = 2, …, t"; names GAPA/GAPB. p.567 (image): P(d_i) = P{∪*{j=2}^{d_i} T(j,d_i) > SC_j}; Theorem 1 "For a step-up procedure with C₂ ≤ C₃ ≤ … ≤ C_t … ≤ ΣP(d_i)"; requirement Σ*{i=1}^{q} P(d_i) ≤ α "for all sequences {d_i} such that Σd_i ≤ t and C₂ ≤ … ≤ C_t". p.568: R(d_i) = P{T(d_i,d_i) > SC(d_i)}; Theorem 2 "For a step-down procedure with C_t ≥ C_{t−1} ≥ … ≥ C₂ … ≤ ΣR(d_i)"; NKA/NKB "use the studentized range"; §4: Ryan "chose … to base his test statistics for all subsets on the two-sample t test rather than on the Studentized range".                                                                                                                                                                                                                                                                                                                                               | Supported                                           |
| C-H3 numerical and directional boundaries    | p.569 §5.2: "Clearly, the HSD is designed to control the union of type I and type III errors. We cannot prove such a result for the tests we propose, except in very special cases. We conjecture that such a result is true generally." Appendix A: step-up C_k found by conditional Monte Carlo with inverse interpolation, 1,000 samples. p.571: "Since NKA and NKB are step-down procedures, no conditioning and, therefore, no Monte Carlo is necessary to compute tables for them." p.575: "Linear harmonic ν-wise interpolation is recommended."                                                                                                                                                                                                                                                                                                                                                                                                                                             | Supported                                           |
| Unequal-size paragraph after the table       | p.576: (1.6) T_P^(1) = max{(ȳ_i − ȳ_e)·√min(n_i, n_e)}/s; "If (1.7) does not hold, the corresponding augmented Studentized range distribution produces very slightly conservative tests [27]". Reference [27] not read.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Supported; external proof unread, as K.2 says       |

Notational translation: K.2's k/p (Einot–Gabriel) and t/j (Welsch) and n/k (Ryan) are the
originals' own symbols; the K.2 header states this, and no formula was altered by the
translation.

## 5. Distinctions the review was asked to test strictly

1. **Keuls's historical procedure versus later Newman–Keuls descriptions.** Keuls prints a
   worked stepwise range procedure (order the means; test the widest span at the
   Studentized-range point for the span size and 24 df; remove an extreme and repeat at
   the point for the smaller size; stop inside a non-significant span), justified by
   experience and by an explicit, admittedly unresolved discussion of the accumulation of
   errors (pp.120–121). It contains no theorem, no "all containing sets" formalization and
   no error-rate definition. The formal object called Newman–Keuls in Einot–Gabriel
   (γ_p = α with the all-containing-set rule (1.2)) and in Welsch (SNK, rules (1)–(3)
   with C_t ≥ … ≥ C₂) is a later formalization. K.2 and K.6 keep these apart ("Keuls and
   Newman are not asserted to be byte-identical algorithms"); the review agrees. Keuls's
   p.116 t-test discussion and the p.120 remark that F and the range criterion are
   "nearly equivalent" are historical observations about the complete null and do not
   bear on strong control, exactly as K.3 item 4 states.
2. **Ryan's pairwise-level rule versus a range-statistic rule.** Ryan's rules 1–3 change
   the nominal two-tailed level of an ordinary two-sample test (2a/n(k−1)); the statistic
   is whatever pairwise test applies, not a Studentized-range quantile. Welsch p.568
   states the same contrast. K.2 is correct that the two are different procedures even
   under the same B-type allocation; Einot–Gabriel's "Ryan allocation" (1.13) applied to a
   range statistic is a third object.
3. **Einot–Gabriel: all-containing-set condition, range versus F, product allocation
   versus conventional Duncan.** (1.2) is strict (>), requires every containing set, and
   retention of any containing set retains the subset; (1.10)'s two-mean relation does not
   make the range and sum-of-squares procedures equivalent because containing-set
   decisions differ (p.576 text; also K.4's coefficient issue, Section 7). The Duncan
   allocation compared in the paper is (1.12), explicitly "adjusted so as to ensure
   experimentwise level α", not the conventional pairwise-α protection levels
   (1−α)^(p−1) that C.3 row 17 attributes to Duncan (1955); p.574–575 state that
   conventional Duncan tables are "usually tabulated in terms of the pairwise comparison
   error rate". K.6's `APR-11` row keeps this distinction; the review agrees.
4. **Welsch: GAPA/GAPB versus NKA/NKB, A versus B, monotone critical values, Type I
   versus Type III.** GAPA/GAPB are step-up (gaps first) and calibrate the union event
   P(d_i) over all stretch sizes inside a block; NKA/NKB are step-down (range first) and
   calibrate the single block-range event R(d_i). A and B differ only at j = t−1. Both
   theorems are stated under a nondecreasing critical sequence. The Type I guarantee is
   the theorem; the union of Type I and Type III errors is explicitly a conjecture
   (p.569). K.2 records all four distinctions correctly. One attribution gap is recorded
   as S-K1 (Section 10): the monotone enforcement C_k := C_{k−1} is a stated step of
   Welsch's step-up table construction (p.569, Appendix A), not only investigator
   reasoning.

## 6. Independent derivation of the K.3 deductions and reproduction of K.5

- **K.3 item 2 (Ryan's block budget).** A block of d equal means contains d(d−1)/2 pairs;
  each pair tested at nominal two-tailed level 2a/(n(d−1)) gives the Bonferroni bound
  (d(d−1)/2)·2a/(n(d−1)) = ad/n; summing over blocks gives a·Σd/n ≤ a. This matches
  Ryan's p.320 formula exactly. Reviewer addition, not in Part K: the step from "a false
  rejection inside the block" to "the block's extremes exceed the block-size criterion"
  needs the containing-span rule and monotone critical values. Any within-block pair lies
  inside the stretch from the block's smallest to its largest sample mean; that stretch
  has size j ≥ d (other blocks' means may interleave), its range equals the block range,
  and it must have been declared significant before the pair is tested, so the block range
  exceeds the criterion for size j, which is at least the criterion for size d when the
  criteria are nondecreasing in span size. Ryan's B-type levels 2a/n(k−1) are decreasing
  in k, so with one pairwise reference distribution the criteria are monotone and the
  argument closes; this is exactly the "logical consistency" point Welsch makes about
  Ryan p.321 and the A levels. K.3's caveat that the arithmetic is not a proof for every
  plug-in statistic, unequal-size ordering or directional claim is therefore right, and
  the review adds that the monotonicity requirement is what makes the budget argument
  valid under interleaving, not only under Ryan's "far enough apart" simplification.
- **K.3 item 3 (Welsch A/B budgets), general proof for every t.** B: Σ_{d_i≥2} d_iα/t ≤
  α·Σd_i/t ≤ α. A: if some block has d_i ≥ t−1, the other blocks sum to at most 1, so
  they are singletons with zero Type I budget and the sum is α; otherwise every block has
  d_i ≤ t−2 and the B argument applies. Sequences with Σd_i < t are covered by padding
  with singletons. This is a complete argument for all t, so the K.5 finite check is a
  confirmation, not the proof; K.5 itself says "It does not establish either theorem",
  which the review reads as correct: the budget inequality is proven in K.3, and the
  theorems' error bounds are Welsch's, resting on the monotone sequence and the model.
- **K.3 item 4.** From (1.24) with q = 2 and known σ²: 1 − (1−α)² = 2α − α² = 0.0975 at
  α = 0.05. The finite-df statement is an inequality via (1.23), as K.3 says.
- **K.3 items 1 and 5.** The compound-label conclusion follows from Sections 4–5:
  Ryan-pairwise-B, range-with-(1.13), range-with-(1.13′), Welsch-NKA/NKB, GAPA/GAPB, and
  the F-statistic analogues are six distinct executable procedures under one catalogue
  entry. The output limits cite p.577 §1.6 (only STPs extend to contrasts and
  simultaneous bounds) and p.583 §2.7 / p.569 (simulation scope); both verified.
- **K.5 reproduction.** The code block was extracted verbatim from the head blob and run
  in an isolated Python 3.11.2 interpreter (`fractions` only). Output:
  `partitions checked: 2712`, `NK two-block limit: 39/400`,
  `two-mean augmented-F/range-squared: 1/2`. The partition count equals
  Σ_{t=2}^{20} p(t) with the standard partition numbers 2, 3, 5, 7, 11, 15, 22, 30, 42,
  56, 77, 101, 135, 176, 231, 297, 385, 490, 627. Reviewer extension: a numerical check of
  (1.9)/(1.8)² = 1/2 for p = 2 on random balanced inputs, and of Bernoulli's inequality
  1 − (1−α)^(p/k) ≥ αp/k for 2 ≤ p ≤ k ≤ 7 at α = 0.05, confirming footnote 2's "more
  conservative" direction and (1.17)'s ordering (p/k > (p−1)/(k−1) iff p < k).

## 7. K.4 printed inconsistencies verified on page images

| Item                                 | Page image shows                                                                                                                                  | Direct arithmetic                                                                                          | Assessment                                                                                                                                                                                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keuls p.115 divisor/df/quotient      | `s_e² = 2983,03 : 12 = 124,29` printed directly under `s_c² = 16713,74 : 12 = 1392,81`; the same page derives n_e = 24 and `39 = 1 + 12 + 2 + 24` | 2983.03/12 = 248.585833…; 2983.03/24 = 124.292916…; 16713.74/12 = 1392.8117                                | Confirmed as printed. Reviewer addition (N-K3): the page's F = 11,21 (1392.81/124.29 = 11.206) and p.116's σ = 11,15 (√124.29 = 11.149) are consistent with divisor 24, which supports "plausible intended divisor" without being an erratum |
| Keuls p.116 subtraction and p.117    | p.116: `176,0 – 97,7 = 78,2`; p.117: `176,0 – 97,7 = 78,3`; p.120 uses 78,3                                                                       | 176.0 − 97.7 = 78.3                                                                                        | Confirmed; p.116 is the discrepant print. K.4 retains the print without correction, as the commission requires                                                                                                                               |
| Einot–Gabriel p.576 (1.10)           | `T_P^(2) = 2{T_P^(1)}² when p = 2`, with (1.8) and (1.9) as transcribed in Section 4                                                              | for n₁ = n₂ = n: (1.9) = n(ȳ₁−ȳ₂)²/(2s²) = (1.8)²/2; K.4's example (n=1, means 0 and 2, s=1) gives 4 and 2 | Confirmed: the printed factor 2 is inconsistent with the printed definitions; the consistent factor is 1/2. Not an erratum finding; no publisher correction was searched by this review either                                               |
| Einot–Gabriel p.578 cross-references | "Under the Newman-Keuls allocation of levels (1.10)" and "Under the Ryan allocation (1.12)"                                                       | the allocations are printed as (1.11) and (1.13) on p.576                                                  | Confirmed; the formula content is unambiguous. K.4's instruction to cite formula content and page rather than the printed equation numbers is appropriate                                                                                    |

No formal erratum search, publisher-correction lookup, or external database query was
performed by this review; the review environment has no such access and none was claimed
by Part K. The record correctly distinguishes a formal erratum (none found or claimed) from
the investigator's correction reasoning (recorded, not adopted).

## 8. Disposition assessment

**Commission definitions applied.** `INPUT_INCOMPLETE`: "required source text cannot be
identified or inspected." `PARTIAL`: "some claims are supported but named gaps remain."
`CLOSED`: "all decision-bearing source claims needed by the hold are directly supported,
with exact artifact identity and pinpoints." `CLOSED` "does not select the procedure".

**SR-H source set.** Section 17 of the fixed semantic input assigns SR-H to SRC-29 and
SRC-35; Section 2.2 names SRC-29's members (Newman 1939, Keuls 1952, Duncan 1955, Ryan
1960, Einot–Gabriel 1975, Welsch 1977) and SRC-35 (Hayter 1986). Author-side inspection
now covers all seven: Newman and Duncan in C.3 (rows 06, 17), Hayter in Parts I/J, and the
four texts in Part K. The obstacle that defines `INPUT_INCOMPLETE` has therefore been
removed for every named text, so retaining `INPUT_INCOMPLETE` would misdescribe the hold
and would not be the reviewer's alternative recommendation.

**Why not `CLOSED`.** `APR-12` is one catalogue entry naming three papers; Sections 4–6
show the papers define several distinct procedures with different statistics,
allocations, stepping directions, and guarantee conditions. The commission's own rule for
this case is "If the evidence resolves to multiple variants rather than one reviewed
family characterization, assign PARTIAL with named gaps." The K.6 named gaps (intended
`APR-12` variant boundary including GAPA/GAPB as separate reopen candidates; exact
monotonicity and selection conditions; resolution or explicit exclusion of the disputed
print material before affected use) are real, specific, and traceable to the pages.

**Assessment: the `SR-H` `PARTIAL` candidate is consistent with the commission
definition.** This is the reviewer's own conclusion from the definitions and the pages,
not an acceptance. It is bounded in two ways:

1. Independent confirmation covers the four originals reviewed here and, by reuse, the
   independently reviewed `C-H4` evidence. The Newman (`C-H1`) and Duncan (`C-H2`) readings
   are author-side records that no review on the repository has verified (Section 9).
   Whether hold-level `PARTIAL` may be accepted on those author readings as ordinary
   evidence, or only after their independent verification, is a steward decision; the
   minimal additional inspection scope is stated in Section 9. Even without those two
   readings, `PARTIAL` rather than `INPUT_INCOMPLETE` would still describe the hold,
   because the two texts were inspected and `C-H1`/`C-H3`/`C-H4` claims are supported by
   independently reviewed pages.
2. `PARTIAL` records that the source-acquisition obstacle is gone and gaps remain; it does
   not narrow `APR-12` to one variant, choose a critical-value table, or make any of
   `APR-10`–`APR-14` a candidate. K.6 keeps `RES-ONLY` on all five; the review agrees.

**Ledger arithmetic.** Prior ledger (Part J, continuation Section 16): 5 `CLOSED`
(SR-B, SR-C, SR-G, SR-K, SR-L) / 0 `PARTIAL` / 9 `INPUT_INCOMPLETE`. Part K moves only
SR-H: 5 / 1 / 8 = 14 entries (12 holds plus RSM-01 and RSM-02). Commission precedence: no
`NO_GO`; at least one `INPUT_INCOMPLETE` (SR-A, SR-D, SR-E, SR-F, SR-I, SR-J, RSM-01,
RSM-02), so overall `INPUT_INCOMPLETE`; `SOURCE_SET_READY` is false. All entries remain
`RES-ONLY`; semantic `NARROW` remains (K.6 and the fixed input Section 12 logic are
consistent). Custody stays 35 (I.1, H.1, K.1 concur; no new supplier number). The five
`CLOSED` entries are carried as existing candidate statuses and are not re-accepted by
Part K or by this review.

## 9. Reused evidence and unverified scope

- **Newman (1939), C.3 row 06, and Duncan (1955), C.3 row 17.** Reused by Part K as prior
  author-side readings. This review did not read either paper and makes no claim about
  them. The review records on the repository that cover Part C (`review/r3-srk-srg-source-closure-20260907`,
  `review/r3-srk-srg-additional-primary-20260907`, and the repair review) state that C.3
  rows other than 09 and 10 (and the page mapping) are out of their scope; no other record
  mentions Newman or Duncan. **Consequently, no independent primary-source review of
  rows 06 and 17 exists.** Minimal scope if the steward requires it before hold-level
  acceptance: Newman (1939) printed pp.20–24 and 27–28 for the C.3 row-06 statements
  (Studentized range with an independent scale estimate; the √2 relation between the
  two-member point and two-sided t); Duncan (1955) printed pp.5–7, 16, 28 and 41 for the
  row-17 statements (equal-precision model; p-mean protection level (1−α)^(p−1); the
  containing-subset rule; the p.41 monotonization of critical ranges). This is a
  reviewer-identified gap, not a finding against Part K, which discloses the reuse.
- **`C-H4` (Hayter 1986), Parts I/J.** Reused as accepted evidence: PR #201's `GO` with two
  `SHOULD-FIX`, PR #203's `GO` on the repair, and continuation Section 16's acceptance. K.6
  changes nothing there; this review re-read neither Hayter nor those records beyond their
  verdict summaries and Section 16.
- **The other 31 originals.** Not touched by Part K or this review; no approval is implied.
- **Not reviewed here:** Welsch's printed tables and Appendices B/C; Einot–Gabriel's
  Monte Carlo results and their conclusions; Ryan's specific proportion/variance/
  nonparametric procedures; Keuls's figures; reference [27] of Einot–Gabriel; any external
  proof cited by any of the four papers.

## 10. Findings

**BLOCKER:** none.

**SHOULD-FIX:**

- **S-K1 — K.3 item 3 under-attributes the monotone-enforcement step.** K.3 describes
  "Taking successive maxima of raw critical values" as "investigator reasoning, not an
  adopted algorithm or a claim that every printed table used that exact construction."
  Welsch p.569, Appendix A, states for the step-up tables: "If C_k turns out as a result of
  this computation to be less than C_{k−1}, we shall put C_k = C_{k−1} in order to
  preserve the ordering of the C_i." The p.575 usage example shows its effect (GAPA,
  t = 5, ν = 20: 3.58, 3.97, 3.97, 4.29). C.3 row 17 records the analogous device in
  Duncan p.41. For NKA/NKB, p.571 states only that inverse interpolation "was the same as
  that described for C₂" and does not state an enforcement step. Because "exact
  monotonicity/selection conditions" is one of the named `PARTIAL` gaps, the record should
  cite the Appendix A sentence as a source statement for the step-up tables and state that
  the step-down tables carry no such printed statement. No disposition changes; the
  investigator's caution that a bare quantile list is not a complete procedure stands.

**NICE-TO-HAVE:**

- **N-K1** — Keuls p.121 footnote 1 also states that the procedure gives "the same results
  as attained by TUKEY in the same two examples" and that Keuls finds his own method "more
  plausible"; K.2 cites only the Newman clause. Adding the Tukey clause makes the
  historical-status row complete.
- **N-K2** — Ryan p.320 calls the product 1 − Π(1 − k_i a/n) "the complete expression for
  the error rate experimentwise"; that form presumes independence across blocks, which the
  paper does not establish, while the first-order sum Σk_i a/n is the valid union bound.
  K.2/K.3 rely only on the sum, which is right; a one-line note that the product form is
  the source's approximation would prevent later readers from treating it as a theorem.
- **N-K3** — K.4 could record that Keuls's printed F = 11,21 and σ = 11,15 are numerically
  consistent with divisor 24 (Section 7), strengthening "plausible intended divisor"
  without adopting a correction.
- **N-K4** — K.2's Ryan row could add that rule 2's level 2a/n(n−2) is the k = n−1 case
  of rule 3, and that p.328 step 4 restates the general rule; this makes the pinpoint
  self-contained.
- **N-K5** — K.1's Einot–Gabriel inspection line could name p.583 §2.7 explicitly (K.3
  item 5 cites it; K.1 says "closing discussion pp.582–583").

## 11. Content verdict

`GO` for the Part K delta at head `070e5dd569f0dfcb6f15ec49daebc0544af217d9`, with S-K1
to be repaired on the author side and N-K1–N-K5 optional. Basis: Sections 2–8. Scope
limits: Section 9. The `SR-H` `PARTIAL` candidate is assessed as consistent with the
commission definition on the four-original basis plus reused `C-H4` evidence; its
hold-level acceptance, and whether the author-only Newman/Duncan readings suffice for it,
are steward decisions not made here. Nothing in this record adopts a procedure, variant,
critical value, interpolation rule, software default, or numerical guarantee, and nothing
opens public discussion, closes a gate, or authorizes a release.

## 12. Independence record

- **Context separation (Git- and service-verifiable):** this review's session was created
  at 2026-09-08T01:55:15Z, after the reviewed commit (01:51:18Z) and PR #204 (01:52:12Z),
  from a fresh clone of `main` at `f39100161cb45de15767bdb19ed54aba9489b41a`. The review
  branch was created from the exact head and adds one file; the reviewed result, the
  commission, the continuation record, all prior reviews and `main` are untouched
  (Section 13). The reviewer did not participate in the investigation, drafting or repair
  of Parts A–K and did not read any prior review record before fixing the provisional
  verdict, except the verdict summaries of PR #201/#203 and continuation Section 16 needed
  for `C-H4` reuse (Section 9). **Context: `ESTABLISHED`.**
- **Model level (ordinary evidence):** the review side is recorded from the session
  service as `claude-fable-5-1` (configured, current, and last served, read during this
  session). The author side's "continuing OpenAI-assisted author investigation" statement
  is first-hand testimony in K.1 and the PR #204 body, not a Git fact. The two sides are
  therefore different providers on the ordinary-evidence basis the continuation record
  has used for Parts G–J; this record makes no steward determination.
- **Git identity is not model testimony.** The reviewed commit carries the steward's Git
  identity; the review commit carries this session's configured Git identity. Neither
  proves which model produced the text.
- **Not required and not demanded:** exact serving-build logs on either side.
- **A new chat is not independence.** Independence here rests on the non-involvement
  statement above, verifiable from session and commit timestamps and from the absence of
  this session's identity in any author-side object, not on the fact that a new session
  was opened.
- Historical `PENDING` statements in Parts A–K, the prior review records and the
  continuation record are unchanged and are not reinterpreted by this record.

## 13. Deliverable identity and validation

- Branch `review/r3-srh-range-synthesis-20260908`, sole parent
  `070e5dd569f0dfcb6f15ec49daebc0544af217d9`; one added file,
  `review-inputs/r3-srh-range-synthesis/REVIEW-RESULT.md`; no other path touched. The
  review commit, tree, and blob identifiers are reported in the draft PR body and were
  checked against the GitHub-side objects after push.
- Environment: fresh clone; Node 22.22.2; pnpm 11.7.0; `pnpm install --frozen-lockfile`
  succeeded; Python 3.11.2 for the K.5 rerun; an independent PDF library for hashing, text
  extraction and 200 dpi page rendering. Outbound network only through the session proxy;
  no publisher, DOI, or erratum host was contacted.
- Validation results on the review branch with this file present (actual results,
  recorded after execution; see the PR body for the final run):
  `pnpm format:check` — PASS; `pnpm lint:markdown` — PASS; `node --import tsx
tooling/src/validate.ts` — PASS; `git diff --check` — clean. No aggregate `pnpm check`,
  test suite, generated-diff check, or Phase 1 suite is claimed.

## 14. Reproduction

```text
git fetch origin 070e5dd569f0dfcb6f15ec49daebc0544af217d9
git cat-file -p 070e5dd569f0dfcb6f15ec49daebc0544af217d9            # tree 859f257e…, one parent 1b2a1efa…
git rev-parse 070e5dd5…:governance/drafts/release-3-preparation/semantic-source-acquisition-result.md   # 5ee73976…
git show 070e5dd5…:<result path> | wc -c                             # 326756
git show 070e5dd5…:<result path> | sha256sum                        # ecddbd70…28cac9
git show 070e5dd5…:<result path> | head -c 303208 | sha256sum       # equals sha256sum of parent blob 94751f09…
sha256sum 24_Einot_1975.pdf 25_Welsch_1977.pdf 35_Keuls_1952.pdf 36_Ryan_1960.pdf   # Section 3
python3 - <<'PY'   # K.5 block copied verbatim from the head blob; expected 2712, 39/400, 1/2
PY
```
