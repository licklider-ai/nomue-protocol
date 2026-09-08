# Release 3 Source-Acquisition Result Part I — Independent Primary-Source Review of the SR-H C-H4 Increment (Hayter 1986: protected and modified LSD)

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context, exact-head review of the Part I increment proposed in
PR #200 of the Release 3 semantic source-acquisition result. Part I records author-side
primary-source findings for claim `C-H4` (catalogue entries `APR-13` protected LSD and
`APR-14` Hayter's modified LSD) from supplier 26 / `SRC-35`, Hayter (1986). This review
re-read the original from the supplied bytes, checked every I.2 source statement against
the printed page images, re-derived the I.3 mathematics independently, re-ran and
independently re-derived the I.4 numerical diagnostic by a different method and precision,
and checked the I.5 disposition and counts against the commission and the fixed semantic
input. It selects no Contract, procedure, identifier, schema, Public Check, tolerance,
support domain, RFC decision, R4 method, or release outcome; it updates no hold, issue,
gate, or catalogue class; it merges nothing and accepts nothing. Attribution is role-based;
material process provenance is disclosed in Sections 1 and 12.

**Content verdict: `GO` with two `SHOULD-FIX` items** (Section 11), bounded to the Part I
delta at the exact head below. Every source statement in I.2 is supported by the printed
pages at the stated pinpoints; the I.3 deductions are mathematically correct and correctly
separated from what the original prints; the I.4 code reproduces to every printed digit and
its formula is independently confirmed; the ledger arithmetic (5 `CLOSED` / 0 `PARTIAL` / 9
`INPUT_INCOMPLETE`, overall `INPUT_INCOMPLETE`, semantic `NARROW` retained) is right.
Findings: `BLOCKER` 0, `SHOULD-FIX` 2, `NICE-TO-HAVE` 7 (Section 10). Neither
`SHOULD-FIX` changes a disposition; both concern the precision of the I.4 record.

**C-H4 support scope:** the bounded characterization in I.2/I.3 is source-supported
(Section 11). **`SR-H` stays `INPUT_INCOMPLETE`**; `APR-13`/`APR-14` stay `RES-ONLY`.
**Independence status: context `ESTABLISHED`; model level: testimony-supported for the
author side, Git-verifiable for the review side** (Section 12). **Formal hold
acceptance: `NOT PERFORMED`** and not authorized by this record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                                                                                                                                                                        |
| Reviewed pull request | #200 (draft; head branch `research/r3-srh-lsd-primary-20260908`; base `research/r3-srb-primary-completion-20260907`, the PR #198 branch, comparison only)                                                                                                                                                                                                                                                                                     |
| Reviewed exact head   | `81835178ac49f189064e20d9babda219acfd7c5f` (the PR head at the start and at the end of this review; see Section 2)                                                                                                                                                                                                                                                                                                                            |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                                                                                                                                                               |
| Review date           | 2026-09-08 (UTC)                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Reviewer role         | independent primary-source reviewer for Part I, following result Section I.5 and the user's request to review PR #200                                                                                                                                                                                                                                                                                                                         |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, any of Parts A–I of the result, the continuation record, or any prior review record. It was started fresh on 2026-09-08 (session created 00:57:29Z, after PR #200 was opened at 00:54:12Z) from a new clone. Prior review records (including the PR #199 Part H review) are treated as third-party records and are reused only with attribution (Section 9) |
| Review posture        | falsification-oriented: every identity, byte count, hash, pinpoint, equation, inequality direction, subscript, degrees-of-freedom statement, table value, count, and boundary statement in I.1–I.5 was checked against Git objects, the live PR metadata, the commission, the fixed semantic result, the supplied original (page images and text layer), and independent recomputation                                                        |
| Private material      | the supplied PDF was read locally and is not committed; no page image, text extraction, or private repository, path, package, product implementation or work item was read or committed                                                                                                                                                                                                                                                       |

**Scope (I.5).** Part I only: I.1 custody and identity; the seven I.2 source rows and the
MFWER/non-rejection paragraph; the six I.3 deductions; the I.4 formula, code, truncation,
table comparison and hedging; the I.5 entry table, disposition, ledger and handoff. Out of
scope: the other thirty-four supplied originals, content verdicts for C-H1/C-H2/C-H3,
acceptance of SR-H as a whole, method adoption, implementation guarantees, the thirteen
non-SR-H dispositions (checked for arithmetic only), and Parts A–H beyond what Part I cites.

**Model information (recorded on an ordinary accountable basis, not guessed).** This pass
ran in a managed remote execution session (Anthropic cloud environment). The
session-management service, queried during this pass, reported
`configured_model: claude-fable-5-1`, `session_context.model: claude-fable-5-1` and
`external_metadata.last_served_model: claude-fable-5-1`. No serving-build log was
requested or is required. Part I states that its author side was a "continuing
OpenAI-assisted investigator"; that statement is author testimony and is not verifiable
from Git objects (Section 12).

**Environment.** Linux container (managed cloud environment); Node v22.22.2; pnpm 11.7.0;
`pnpm install --frozen-lockfile` in this session, exit 0. Python 3.11.15 with PyMuPDF
1.28.2 (page rendering at 200 dpi, region crops at 300 dpi, and text extraction of the
PDF), SciPy 1.17.1, NumPy 2.4.6 and mpmath 1.4.1 for the reproductions in Section 7. No
repository code was used for any statistical computation.

## 2. Fixed identity verification (expected versus observed)

All identities were checked against local Git objects fetched from `origin` and against
the live GitHub PR and commit metadata. Every row matches.

| Item                               | Expected (task / Part I)                                                                                                                    | Observed                                                                                                                                                                                                                         | Result |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| PR #200 live state at start        | draft, open, head `81835178…`                                                                                                               | draft, open, `mergeable_state: clean`, head `81835178ac49f189064e20d9babda219acfd7c5f`, base `research/r3-srb-primary-completion-20260907` at `f6d39534…`, 1 commit, 1 changed file, +170/−0; `git ls-remote` head branch = same | match  |
| PR #200 live state at end          | unchanged                                                                                                                                   | `git ls-remote origin refs/heads/research/r3-srh-lsd-primary-20260908` = `81835178…` after the review branch was pushed (Section 13)                                                                                             | match  |
| Head commit                        | `81835178ac49f189064e20d9babda219acfd7c5f`                                                                                                  | commit present; tree `afef90b7b40e8c5fc12b40ce5a8ec3d6c5e06928`; author/committer date 2026-09-08T00:53:42Z; message "Record Hayter primary-source findings for protected and modified LSD"                                      | match  |
| Sole parent                        | `f6d39534e85920a8331941126a6eb384244e34f1`                                                                                                  | `git rev-list --parents -n1` lists exactly one parent, equal to the expected value; the parent is the PR #198 head reviewed in PR #199                                                                                           | match  |
| Result blob at head                | `8774beb8d1736baa8637ef60945d53834a0affb0`                                                                                                  | `git rev-parse <head>:<path>` = same; 297669 bytes; SHA-256 `80988ef92e4e5e22e03786bd1e5c9c7e5f97961e12ed641383aaa882506dc8b5`                                                                                                   | match  |
| Result blob at parent              | `b0679cbad8d384158b93ce414f8dfb7f2270ea74`                                                                                                  | `git rev-parse <parent>:<path>` = same; 283253 bytes; SHA-256 `cd625b72dbe304a2ed371045b55a3d1cfc606c8e9cb7dfc4cff0587a881187c1`                                                                                                 | match  |
| Change set                         | Part I appended to the result file only                                                                                                     | `git diff-tree --stat` parent..head: one file, the result path, +170 lines, 0 deletions; one hunk `@@ -2488,3 +2488,173 @@`                                                                                                      | match  |
| Parts A–H prefix                   | 283253 bytes preserved byte-exactly                                                                                                         | `cmp -n 283253 <head blob> <parent blob>` exits 0; SHA-256 of the head blob's first 283253 bytes equals the parent blob's SHA-256                                                                                                | match  |
| Commission                         | containing commit `f39100161cb45de15767bdb19ed54aba9489b41a`, blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                               | `git rev-parse f3910016…:governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md` = `3c7ddcc6…`; `f3910016…` is also the current `origin/main`                                                         | match  |
| Fixed semantic input               | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob `8f21526040924b891f64724c2d0fde9ea94eff92`                                          | `git rev-parse 7bd9c5ab…:governance/drafts/release-3-preparation/semantic-research-result.md` = `8f215260…`                                                                                                                      | match  |
| Continuation record                | commit `03ce30ec67904e08da70d80afd1fd6de36909dad`, blob `bc16345d5058d0b5d122c71577008716db49a89f`                                          | fetched by hash; `git rev-parse 03ce30ec…:governance/drafts/research-continuation-2026-09-07.md` = `bc16345d…`; Section 14 records the Part H independence determination and the limited SR-B acceptance                         | match  |
| Supplied original 26 (Hayter 1986) | SHA-256 `33000fec094c81a4dbb581653d28d3a72bb8a2379a8baafbc1dafab1d6032eed`; 582732 bytes; 6 PDF pages; DOI `10.1080/01621459.1986.10478364` | `sha256sum` = same; 582732 bytes; 6 pages (publisher cover + printed pp. 1000–1004); cover page prints the same DOI and JASA 81:396, 1000–1004; PDF metadata title matches the printed title                                     | match  |
| I.1 identity versus D.2/D.3        | I.1 values equal the D.2 row for `26_Hayter_1986.pdf` and the D.3 routing                                                                   | D.2 (result line 1648) lists 582732 bytes, 6 pages, the same hash; D.3 (line 1677) routes supplier 26 → SR-H / SRC-35; APR-13/14                                                                                                 | match  |
| Supplier total                     | 35, no re-count of supplier 26                                                                                                              | result line 1623: C.2 nineteen + D.2 sixteen = 35; supplier 26 is one of the sixteen; I.1 adds no artifact row                                                                                                                   | match  |
| Review branch name                 | `review/r3-srh-lsd-primary-20260908` if unused                                                                                              | `git ls-remote --heads origin` showed no such branch before this branch was created from the exact head; the name was used                                                                                                       | match  |

The upload filename carried a copy prefix (`6c64b56c-26_Hayter_1986.pdf`); byte identity,
not the filename, was used. No ZIP unpacking was needed.

## 3. Source inspection actually performed

| Original      | Read as rendered page images                                                                                                                                                                                                                                                                                     | Read as extracted text only | Not read |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| Hayter (1986) | printed pp. 1000 (abstract, Section 1, model definition), 1001 (Theorem 1, proof, (2.1)–(2.8)), 1002 ((2.9)–(2.12), Section 3, Table 1, modified critical point), 1003 (Theorem 2, Appendix, Theorems A.1/A.2 with proofs), 1004 (references); crops at 300 dpi for (2.1), (2.8), the model, A.1/A.2 and Table 1 | cover page (DOI, citation)  | none     |

Every equation, inequality direction, subscript, table value and degrees-of-freedom
statement cited below was read from the page image, not from the text layer; the text
layer of this scan damages subscripts, inequality signs (for example it renders the
p. 1001 "Pr{∪ A_r} ≥ α" as "≤ α") and table alignment.

## 4. I.2 direct source findings — claim-by-claim verification

`SUPPORTED` means the I.2 statement is an accurate account of the printed text at the
stated pinpoint. Notation: `Q_{k−1,ν}` is the Studentized range with parameters k−1 and ν;
`t_{α/2,ν}` is the upper α/2 point of Student's t with ν df; `q_{α,k−1,ν}` is the upper α
point of `Q_{k−1,ν}`.

| I.2 row                         | What the original prints (verified on page image)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Verdict                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Population and family           | p. 1000 Section 2: "the usual unbalanced fixed-effects, one-way model with k populations X_ij = μ_i + ε_ij, 1 ≤ j ≤ n_i, 1 ≤ i ≤ k, where the ε_ij's are independent N(0, σ²)"; p. 1001: S² "an unbiased estimate of σ², which is distributed independently of the X̄_i as a σ²χ²_ν/ν random variable. Usually the ANOVA mean squared error with ν = Σ n_i − k df is used"; "If the n_i are all equal, then we refer to the design as a balanced one-way model"; "the multiple comparisons problem arises only for k ≥ 3". p. 1000 Section 1: stage 2 tests "all of the k(k − 1)/2 pairs of means" | `SUPPORTED`. The general-ν versus usual-df distinction is printed as stated.                                                                                                                           |
| Protected LSD procedure         | p. 1000 Section 1: stage 1 "an α-level analysis of variance (ANOVA) F test"; if it does not reject "the k means are declared to be all equal and the test is concluded"; if it rejects, "all of the k(k − 1)/2 pairs of means are tested for equality using α-level t tests". p. 1001 (2.2): under μ_1 = ⋯ = μ_k, FWER = Pr{(stage-1 F test rejects) ∩ (at least one stage-2 t test rejects)} ≤ Pr{stage-1 F test rejects} = α                                                                                                                                                                    | `SUPPORTED`.                                                                                                                                                                                           |
| Original LSD worst-case error   | p. 1001 Theorem 1, (2.1): α\*(k, ν, α) = Pr{Q_{k−1,ν} > √2 t_{α/2,ν}} "for any balanced one-way model, and for an unbalanced one-way model with k = 3"; "t_{α/2,ν} is the upper α/2 point of the t distribution with ν df"; "For any unbalanced one-way model with k ≥ 4, the right side of Equation (2.1) provides an upper bound on the MFWER". p. 1002 (2.9) lower bound (Spjøtvoll 1971), (2.12) upper bound                                                                                                                                                                                  | `SUPPORTED`. Subscripts (k−1, ν; α/2, ν), the strict `>`, and the upper-tail definition are as printed.                                                                                                |
| Worst-case construction         | p. 1001 (2.3)–(2.5): disjoint index sets V_1, …, V_t with equal means within a set and unequal across sets, t ≥ 2; A_r the event that some pair in V_r is declared unequal; "The events A_r … do not depend on the values of the means μ_i, and conditional on S², they are independent"; "if we let the difference between the values of the means μ_i in the t clusters … tend to infinity, then the probability that the stage-1 F test rejects tends to 1". p. 1002: "If we choose t = 2, v_1 = k − 1, and v_2 = 1"                                                                           | `SUPPORTED`.                                                                                                                                                                                           |
| Unbalanced qualification        | p. 1002 paragraph after (2.12): "simulation results of Dunnett (1980) and calculations by Uusipaikka (1985) have demonstrated that unless there is very severe imbalance … there is very nearly equality in Theorem A.1 and hence in Equation (2.7)"; "if the imbalance is such that k − 1 of the k sample sizes n_i are equal, then there will be equality in Equation (2.12) because there will then be equality in Equation (2.7) for the minimizing values of the v_i and t—namely, t = 2, v_1 = 1, and v_2 = k − 1"                                                                          | `SUPPORTED`. The cited Dunnett (1980) is JASA 75:789–795 (p. 1004), i.e. the repository's `SRC-08`, not supplier 28 (N-I2). Neither cited study is inspected here; no closeness guarantee is inferred. |
| Modified LSD                    | p. 1002 bottom / p. 1003 top: "use q_{α,k−1,ν}/√2 instead of t_{α/2,ν} as the critical point in the k(k − 1)/2 stage-2 pairwise comparisons of the means (q_{α,k−1,ν} represents the upper α point of the studentized range distribution with parameters k − 1 and ν)". p. 1003 Theorem 2: MFWER "is equal to α for all balanced models and for an unbalanced model with k = 3 populations. It is no greater than α for all unbalanced models with four or more populations"                                                                                                                      | `SUPPORTED`. The stage-1 gate is retained: Theorem 2 modifies only the stage-2 critical point of "the α-level LSD test".                                                                               |
| Proof dependencies              | p. 1003 Theorem A.1: Pr{max_{1≤i,j≤p} \|X̄_i − X̄_j\|/((1/n_i + 1/n_j)/2)^{1/2} ≤ q} ≥ Pr{max \|Y_i − Y_j\|/(1/√n) ≤ q} for any positive q, equality if all n_i equal; "The rather lengthy proof of this theorem is presented in Hayter (1984) and is not given here." Theorem A.2: h_i = Pr[range of i independent N(0,1) ≤ 2q]; for i ≤ j and i − m ≥ 1, h_i h_j > h_{i−m} h_{j+m}; proof given on p. 1003                                                                                                                                                                                        | `SUPPORTED`. A.1's inequality direction (unbalanced ≥ balanced) is as printed, and is the direction needed for the (2.7) and (2.12) upper bounds.                                                      |
| MFWER / non-rejection paragraph | p. 1000: FWER "equals the probability that at least one pair of equal means is declared unequal"; MFWER "the maximum of the FWER over all possible values of the k means"; the stage-1 wording "the k means are declared to be all equal" is procedural                                                                                                                                                                                                                                                                                                                                           | `SUPPORTED`. The source's "declared equal" is a decision label, not an equivalence claim; Part I's reading is correct.                                                                                 |

## 5. I.3 investigator deductions — independent mathematical check

Each deduction was re-derived from the printed statements; the conclusion was then compared
to I.3.

1. **Weak control, and the k > 3 warning.** (2.2) gives FWER ≤ α under the complete null,
   which is weak control. For a balanced model and any ν, Pr{Q_{k−1,ν} > √2 t_{α/2,ν}} is
   strictly increasing in k because the range of more variables is stochastically larger;
   at k = 3 it equals α (item 2), so for every balanced model with k ≥ 4 the MFWER exceeds
   α at every ν. The paper states the exceedance from Table 1 (ν = ∞) and adds "It is not
   clear how the expression depends on ν" (p. 1002); the monotonicity argument is reviewer
   inference consistent with, but not printed in, the source. I.3's reading that the
   catalogue's `k > 3` strong-FWER warning is supported, while not every configuration
   exceeds α, is correct: at any partition with all clusters of size 1 the FWER is 0 by
   definition (p. 1001). See N-I1 on the "every unequal-sample-size design" clause.
2. **k = 3 reduction.** Q_{2,ν} is the range of two iid N(0,1) divided by S/σ, i.e.
   |Z_1 − Z_2|/(S/σ) = √2 |Z|/(S/σ) = √2 |t_ν| in distribution. Hence Pr{Q_{2,ν} > √2
   t_{α/2,ν}} = Pr{|t_ν| > t_{α/2,ν}} = α. Correct; the paper itself prints the same fact
   in the k = 3 equality argument ("Pr{|t_ν| ≤ t_{α/2,ν}} = 1 − α", p. 1001) and Table 1's
   k = 3 row (.0100/.0500/.1000).
3. **Maximum versus supremum.** For finite means the stage-1 non-rejection probability is
   positive, so FWER = Pr{F rejects ∩ ∪A_r} < Pr{∪A_r}; the value in (2.8) is approached
   as the cluster separation tends to infinity (2.5) and is not attained by any finite
   mean vector. I.3's worst-case/supremum reading is correct and is more precise than the
   paper's "max" notation.
4. **T_ij algebra.** With T_ij = |X̄_i − X̄_j|/(S √(1/n_i + 1/n_j)), the condition T_ij >
   q_{α,k−1,ν}/√2 is equivalent to |X̄_i − X̄_j| > q_{α,k−1,ν} S √((1/n_i + 1/n_j)/2), and
   to the paper's own (2.6) form |X̄_i − X̄_j|/(S((1/n_i + 1/n_j)/2)^{1/2}) > q_{α,k−1,ν}.
   Correct. It is pure algebra on the printed critical value, as I.3 says.
5. **Range dimension k − 1 versus k(k − 1)/2 pairs.** The k − 1 arises from the extremal
   partition (t = 2, v_1 = k − 1, v_2 = 1), i.e. the largest cluster of equal means that
   can coexist with a rejecting gate, not from the number of hypotheses, and no observed
   group is removed from the family (stage 2 still tests all k(k − 1)/2 pairs). Correct.
6. **Theorem 2 as strong control under the model; no gate removal; no Welch carry-over.**
   Theorem 2 follows from the Theorem 1 argument with the stage-2 constant replaced: the
   partition minimization (2.10)–(2.11) uses Theorem A.2, which holds for any fixed
   threshold "2q" with q > 0, and the extremal value becomes Pr{Q_{k−1,ν} > q_{α,k−1,ν}} =
   α, while the complete-null FWER stays ≤ α by (2.2). So MFWER = α for balanced models and
   unbalanced k = 3, and ≤ α for unbalanced k ≥ 4 via A.1, exactly as printed. Without the
   stage-1 gate the complete-null case is no longer covered by (2.2), so gate removal is
   not licensed. The model requires a common σ² and an S² independent of the means with a
   scaled χ²_ν law; a Welch pair uses a different variance estimator and df, so nothing in
   the paper transfers. Correct boundary statements.

The final I.3 bullet (no adjusted-p, simultaneous-interval, grouping, tolerance or
implementation adoption) is confirmed against the source: the paper's outputs are
rejection decisions and the MFWER expression only. No interval construction or adjusted
p-value is printed anywhere in pp. 1000–1004.

## 6. Proof-dependency assessment (Theorems A.1 and A.2)

- **A.2 is self-contained.** Its proof on p. 1003 was followed line by line. Reviewer
  checks: with `a = A(0)` and `B_{-1} := 1`, the printed recursion
  `h_i = a h_{i-1} + B_{i-1}` gives
  `h_i^2 - h_{i-1} h_{i+1} = B_{i-1}^2 + (a B_{i-1} - B_i) h_{i-1}`, matching the
  printed identity; `a B_{i-1} - B_i` equals the integral over `x > 0` of
  `c(x) (A(0) - A(x))^2 A(x)^{i-1}`, which is positive because
  `c(x) = 4q (exp(-xq) - exp(xq))^{-2} > 0` and `A(0) > A(x)` for `x > 0`; strict
  log-concavity of `(h_i)` then yields `h_i/h_{i-1} > h_{j+1}/h_j` for `2 <= i <= j` and,
  iterated m times, `h_i h_j > h_{i-m} h_{j+m}`. Numerically, at 2q = √2·z_{.025}, the sequence h_1..h_11
  (1, .95, .8777, .7967, .7142, .6344, .5595, .4907, .4284, .3726, .3230) is decreasing
  and satisfies h_i² > h_{i−1} h_{i+1} for every i ≥ 2, and (2.10)/(2.11) hold for every
  partition of k = 6 with t ≥ 2 (brute force). The `≥` in (2.10)/(2.11) rather than `>`
  is correct because cluster factors with v_i = 1 contribute h_1 = 1 exactly.
- **A.1 is deferred to Hayter (1984).** Within the 1986 text A.1 is used once, at (2.7).
  Its equality case (all n_i equal) is trivial because both sides then have the same
  distribution, and for k = 3 the paper proves equality in (2.7) directly (t = 3: both
  sides equal 1; t = 2: both sides equal Pr{|t_ν| ≤ t_{α/2,ν}} = 1 − α, since the
  two-population statistic is exactly a t ratio for any n_1, n_2). Consequently
  **Theorem 1's equality cases (balanced, unbalanced k = 3) and Theorem 2's equality cases
  do not depend on the 1984 proof.** Only the unbalanced k ≥ 4 statements — the upper
  bound (2.12) in Theorem 1 and the "no greater than α" clause of Theorem 2 — rest on
  A.1's inequality, whose proof is not in this paper.
- **Is the 1984 original needed for this scope?** No. The commissioned claim `C-H4` is a
  characterization of what Hayter (1986) establishes, and Part I correctly records the
  A.1 dependency as a disclosed, uninspected step rather than as verified. A future
  audit that wants to certify the unbalanced k ≥ 4 inequality itself would need the 1984
  proof (the Tukey–Kramer conservativeness proof). That original is already the
  repository's `SRC-06` with a recorded SHA-256 and a prior inspection record (fixed
  semantic result Section 2.2 row SRC-06; F-09), so no new acquisition would be required
  (N-I3). This review does not perform that audit and makes no claim about the 1984 proof.

## 7. I.4 numerical diagnostic — reproduction and independent recomputation

**Formula.** Q_{k−1,∞} is the range of r = k − 1 iid N(0,1) variables, and √2 t_{α/2,∞} =
√2 Φ^{−1}(1 − α/2) =: q. Conditioning on the minimum being at x, the other r − 1 variables
must lie in [x, x + q], so Pr{range ≤ q} = r ∫ φ(x) [Φ(x + q) − Φ(x)]^{r−1} dx over the
real line. This is the I.4 formula; it is the same object as Hayter's h_r with threshold
2q' = q. Independently derived; correct.

**Truncation.** For |x| > 12 the integrand is bounded by r φ(x), so the omitted mass is at
most 2 r Φ(−12) ≈ 3.2 × 10^{−32} for r = 9. I.4's bound statement is correct, and the
truncation cannot affect any reported digit. The `quad` error estimate is, as I.4 says, a
heuristic of the adaptive routine, not an enclosure.

**Verbatim re-run of the listed code** (SciPy 1.17.1 here; Part I reports 1.17.0):

```text
3 0.04999999999999993 7.139809493385745e-13
4 0.12226630594424204 3.832325726334028e-13
10 0.5715912453416663 1.7032949633544515e-14
```

Every digit, including the reported quadrature error estimates, matches the I.4 table.

**Independent recomputation by a different route** (mpmath, 30 significant digits,
`mp.quad` over (−∞, −q, 0, q, ∞) with `erfinv` for the quantile; script in Section 14):

| α   |   k | Reviewer value (mpmath) | Printed Table 1 | Rounded to 4 dp |
| --- | --: | ----------------------: | --------------: | --------------: |
| .05 |   3 |        0.05000000000000 |           .0500 |           .0500 |
| .05 |   4 |        0.12226630594424 |           .1222 |           .1223 |
| .05 |  10 |        0.57159124534167 |           .5715 |           .5716 |

The three cells agree with the author's SciPy values to all printed digits. Two further
routes agree: `scipy.stats.studentized_range.sf(q, k−1, df=10⁶)` gives .050000, .122266,
.571591; Monte Carlo with 4 × 10⁶ draws gives .12228 ± .00016 (k = 4) and .57110 ± .00025
(k = 10). The author's diagnostic is therefore confirmed by an independent implementation,
higher precision and a different quadrature, within the limits of numerical evidence (this
is not a rigorous interval enclosure).

**Whole-table comparison (reviewer diagnostic beyond I.4's scope).** All 54 printed cells
(α = .01, .05, .10; k = 3..20) were compared with the mpmath value of the ν = ∞
expression, rounded to four decimals:

| α   | Cells whose 4-dp rounding differs from the printed value | Largest \|exact − printed\| | Direction                     |
| --- | -------------------------------------------------------- | --------------------------: | ----------------------------- |
| .01 | 16 of 18 (every k ≥ 5)                                   |            0.00065 (k = 20) | printed below exact in all 16 |
| .05 | 14 of 18 (k = 4..15, 17, 18)                             |            0.00013 (k = 15) | printed below exact in all 14 |
| .10 | 8 of 18 (k = 5, 7, 8, 9, 10, 11, 13, 17)                 |             0.00012 (k = 8) | printed above exact in all 8  |

So 38 of 54 printed cells differ from the exact ν = ∞ expression in the fourth decimal,
with a column-dependent sign and a magnitude up to 6.5 × 10^{−4}. The two cells Part I
flagged are part of a table-wide pattern, not isolated last-place rounding differences
(S-I1). A rounded-critical-value hypothesis was tested and does not account for the
pattern (with z = 2.576, 1.96, 1.645 the .01 column still mismatches 16 of 18 cells); no
cause is asserted, and no erratum was searched for or found. None of this changes the
theorem: the printed table is a numerical illustration, and Part I correctly adopts no
value from it.

**Finite ν (reviewer diagnostic, informative only).** With the proper threshold
√2 t_{α/2,ν}, the k = 4, α = .05 value is .1143 at ν = 10 and .1196 at ν = 30 (SciPy
`studentized_range.sf`, cross-checked by Monte Carlo .1144 ± .0002 and .1196 ± .0002),
versus .1223 at ν = ∞. This is consistent with the paper's caveat that the ν dependence is
not characterized; it is not a finite-ν closure and no finite-ν value is adopted.

## 8. Disposition, ledger, and scope checks (I.5)

| Check                                                               | Observed                                                                                                                                                                                                                      | Result |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| C-H4 bounded characterization matches the fixed catalogue           | fixed semantic result: C-H4 "maximum FWER of protected LSD; failure for `k > 3`; modified LSD"; APR-13 "reported strong-FWER failure for `k > 3`"; APR-14 "Hayter's modified LSD (1986)"; all three are printed in the source | pass   |
| APR-13 / APR-14 remain `RES-ONLY`                                   | I.5 table rows retain RES-ONLY; no candidacy change                                                                                                                                                                           | pass   |
| SR-H remains `INPUT_INCOMPLETE`; C-H1/C-H3 not closed               | I.5 states this explicitly; APR-10/11/12 rows make no new content claim                                                                                                                                                       | pass   |
| Ledger 5 `CLOSED` / 0 `PARTIAL` / 9 `INPUT_INCOMPLETE`, total 14    | equals H.5's table (CLOSED SR-B, SR-C, SR-G, SR-K, SR-L; INPUT_INCOMPLETE SR-A, SR-D, SR-E, SR-F, SR-H, SR-I, SR-J, RSM-01, RSM-02); Part I changes no row                                                                    | pass   |
| Overall `INPUT_INCOMPLETE`; semantic `NARROW` retained              | stated in I.5                                                                                                                                                                                                                 | pass   |
| No adjusted p, simultaneous CI, grouping, implementation, tolerance | I.3 last bullet and I.5; confirmed against the source, which prints none of these                                                                                                                                             | pass   |
| R4 source gaps and Dunn numerical conflicts not auto-resolved       | I.5 last paragraph retains both                                                                                                                                                                                               | pass   |
| Section 14 acceptance not applied to Part I                         | I.1 says so; this review also does not apply it                                                                                                                                                                               | pass   |
| Historical PENDING statements unchanged                             | Parts A–H byte-identical (Section 2)                                                                                                                                                                                          | pass   |
| Supplier 26 not double counted                                      | Section 2                                                                                                                                                                                                                     | pass   |

## 9. Reused versus performed inspections

| Item                                              | Status in this review                                                                                                                                     |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supplier 26 bytes, pages, DOI, printed pinpoints  | performed here (Sections 2–4)                                                                                                                             |
| Theorem 1/2 statements, proof, A.1/A.2, Table 1   | performed here on page images (Sections 4–7)                                                                                                              |
| I.4 code, formula, truncation, three cells        | performed here: verbatim re-run plus independent mpmath, SciPy `studentized_range`, and Monte Carlo (Section 7)                                           |
| Whole Table 1, finite ν                           | performed here as reviewer diagnostics beyond I.4 (Section 7)                                                                                             |
| D.2 hash/page table, D.3 routing, 35-count        | read at the exact head and re-checked for supplier 26 only; the other 34 hashes are reused from D.2 without re-hashing (no files supplied)                |
| Hayter (1984) proof of A.1 (`SRC-06`)             | not inspected; its existence as a hashed repository source is taken from the fixed semantic result Section 2.2 (reused identity, no content reuse)        |
| PR #199 Part H review and continuation Section 14 | read for format, identity chain and the independence determination; their content verdicts and the SR-B acceptance are not reused or re-applied to Part I |
| Prior SR-B / SR-C source reviews                  | not redone                                                                                                                                                |

## 10. Findings

**BLOCKER:** none.

**SHOULD-FIX** (precision of the record; neither changes a disposition):

- **S-I1. Table 1 precision is a table-wide pattern, not two last-place differences.**
  I.4 compares three cells and describes "last-place differences" in two. The reviewer's
  full comparison (Section 7) shows 38 of 54 printed cells differ from the exact ν = ∞
  expression at four decimals, by up to 6.5 × 10^{−4} in the .01 column, with printed
  values below the exact value in the .01/.05 columns and above it in the .10 column. A
  successor increment should record that Table 1 is reliable to about three decimals
  against the expression it tabulates, so that any future numerical use (already gated by
  I.5) is not framed as a two-cell question. No cause is asserted.
- **S-I2. The I.4 prose formula lost its multiplication signs.** Result lines 2579–2580
  read `q=sqrt(2)_Phi_inverse(1-alpha/2)` and `phi(x)_(Phi(x+q)-Phi(x))^(r-1)`; the
  underscores are Markdown emphasis delimiters in place of `*`, so the prose formula no
  longer states the product. The code block is correct and unambiguous, and this review
  used it. A successor increment should write the prose formula in backticks or in words.

**NICE-TO-HAVE:**

- **N-I1.** I.3 cautions against reading the source as saying "every unequal-sample-size
  design exceeds alpha". That is correct as a statement of what the source proves. To
  avoid the opposite misreading, a successor could note (as reviewer inference, Section
  5 item 1) that for any design with k ≥ 4 a cluster of three or more equal means makes
  the supremum FWER strictly exceed α; the source simply does not state it.
- **N-I2.** The Dunnett (1980) cited on p. 1002 for the near-equality simulations is JASA
  75:789–795 (repository `SRC-08`), not supplier 28 (Dunnett 1980b, JASA 75:796–800,
  unequal variances). Recording this prevents conflation if the "very close" bound is ever
  followed up. Uusipaikka (1985) is not in custody.
- **N-I3.** Hayter (1984) is already `SRC-06` with a recorded SHA-256 and prior
  inspection; the I.5 sentence on the 1984 proof could say that an A.1 audit needs no new
  acquisition.
- **N-I4.** The proof-dependency row could state precisely which claims depend on A.1:
  only the unbalanced k ≥ 4 upper bound in Theorem 1 and the "no greater than α" clause of
  Theorem 2 (Section 6); the equality cases are self-contained in the 1986 paper.
- **N-I5.** The k = 3 reduction in I.3 can cite the paper's own line "Pr{|t_ν| ≤
  t_{α/2,ν}} = 1 − α" (p. 1001) and the Table 1 k = 3 row as printed corroboration.
- **N-I6.** I.4 names SciPy 1.17.0; this review's SciPy 1.17.1 reproduced every digit. A
  successor could record that the result is version-stable across these two releases.
- **N-I7.** The text layer of the scan inverts the p. 1001 inequality "Pr{∪A_r} ≥ α" to
  "≤ α". Part I did not rely on the text layer here, but a note that the direction was
  image-verified would help later readers who only have the extraction.

## 11. Content verdict and C-H4 support scope

**Verdict: `GO`** for the Part I delta at head `81835178…`, bounded as follows.

- **Source-supported (I.2):** the model (independent normal, common σ², S² independent with
  a scaled χ²_ν law, ν general with Σ n_i − k usual, k ≥ 3, all k(k − 1)/2 pairs); the
  two-stage protected LSD with an α-level F gate; (2.2) weak control; Theorem 1's exact
  MFWER expression for balanced models and unbalanced k = 3 and its upper-bound status
  for unbalanced k ≥ 4; the k − 1 equal sample sizes equality case; the modified critical
  point q_{α,k−1,ν}/√2 with the gate retained; Theorem 2's equality and ≤ α statements; the
  A.1 deferral to Hayter (1984) and the self-contained A.2.
- **Correct investigator inference (I.3), not source text:** weak-versus-strong reading,
  the k = 3 reduction to α, the supremum reading, the T_ij algebra, the k − 1 dimension
  explanation, and the no-gate-removal / no-Welch boundaries.
- **Numerical diagnostic (I.4):** reproduced and independently confirmed for the three
  cells; the table-wide discrepancy (S-I1) widens the precision caveat but does not touch
  the theorem-based characterization.
- **Not supported by this review and not claimed by Part I:** the proof of A.1; the
  cited Dunnett/Uusipaikka closeness results; any finite-ν value; any adjusted-p,
  interval, grouping or implementation semantics; any statement about the other SR-H
  sources.

**C-H4:** the bounded characterization "maximum FWER of protected LSD; failure for
k > 3; modified LSD" is supported by the printed source at the pinpoints Part I gives,
with the balanced/k = 3 equality versus k ≥ 4 unbalanced upper-bound distinction and the
A.1 dependency disclosed. This is a content verdict on one claim. **`SR-H` remains
`INPUT_INCOMPLETE`** because C-H1/C-H2/C-H3 source work is not complete; **`APR-13` and
`APR-14` remain `RES-ONLY`**; the ledger stays 5 / 0 / 9; overall `INPUT_INCOMPLETE` and
semantic `NARROW` are retained. Nothing here is a hold acceptance, method adoption,
implementation guarantee, ratification, discussion opening, or release.

## 12. Independence record

- **Context separation (Git-verifiable):** this review's session was created at
  2026-09-08T00:57:29Z, after the reviewed commit (00:53:42Z) and PR #200 (00:54:12Z).
  The review branch was created from the exact head and adds one file; the reviewed
  result, the commission, the fixed semantic input, the continuation record, prior
  reviews and `main` are untouched (Section 13). The reviewer did not participate in the
  investigation, drafting, or repair of Parts A–I. **Context: `ESTABLISHED`.**
- **Model level (ordinary evidence):** the review side is recorded from the session
  service as `claude-fable-5-1` (configured and last served). The author side's
  "OpenAI-assisted" statement is first-hand testimony in Part I and the PR body, not a
  Git fact. The two statements are consistent with RFC research-gate rule 2's
  separate-model requirement; whether they satisfy it is a steward determination on
  ordinary evidence, as continuation Section 14 did for Part H. **That determination is
  not made here and Section 14's Part H determination is not applied to Part I.**
- **Not required:** exact serving-build logs on either side.
- Historical `PENDING` statements in Parts A–H and prior reviews are unchanged.

## 13. Deliverable identity and validation

| Item          | Value                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Review branch | `review/r3-srh-lsd-primary-20260908`, created from `81835178ac49f189064e20d9babda219acfd7c5f` (sole parent of the review commit) |
| Review file   | `review-inputs/r3-srh-lsd-primary/REVIEW-RESULT.md` (the only change)                                                            |
| Not committed | the PDF, page images, text extraction, and the scratch scripts (their code is reproduced in Section 14)                          |
| Unchanged     | the reviewed result, the commission, the fixed semantic input, the continuation record, all prior review records, `main`         |

Checks run on the fixed head before adding this file, and again on the final state with
this file added (both from a fresh `pnpm install --frozen-lockfile`):

| Check                                       | Fixed head `81835178…`     | Final review state                                |
| ------------------------------------------- | -------------------------- | ------------------------------------------------- |
| `pnpm format:check`                         | pass ("All matched files") | pass ("All matched files"), exit 0                |
| `pnpm lint:markdown`                        | pass (355 files, 0 issues) | pass (356 files, 0 issues), exit 0                |
| `node --import tsx tooling/src/validate.ts` | pass ("validate: OK")      | pass ("validate: OK"), exit 0                     |
| `git diff --check`                          | pass (no output), exit 0   | pass (unstaged and `--cached`, no output), exit 0 |

No aggregate `pnpm check`, test suite, typecheck or generated-file check is claimed.

## 14. Reproduction

Independent recomputation used in Section 7 (mpmath 1.4.1; any recent version should do):

```python
import mpmath as mp

mp.mp.dps = 30


def range_tail(r, q):
    """P(range of r iid N(0,1) > q)."""
    if r == 1:
        return mp.mpf(0)
    f = lambda x: r * mp.npdf(x) * (mp.ncdf(x + q) - mp.ncdf(x)) ** (r - 1)
    return 1 - mp.quad(f, [-mp.inf, -q, 0, q, mp.inf])


for alpha in ("0.01", "0.05", "0.10"):
    q = mp.sqrt(2) * mp.sqrt(2) * mp.erfinv(1 - mp.mpf(alpha))  # sqrt(2) * z_{alpha/2}
    for k in range(3, 21):
        print(alpha, k, mp.nstr(range_tail(k - 1, q), 12))
```

Cross-checks: `scipy.stats.studentized_range.sf(q, k - 1, 1e6)` with
`q = sqrt(2) * norm.ppf(0.975)`; Monte Carlo with `numpy.random.default_rng(20260908)`,
4 × 10⁶ draws of k − 1 standard normals. Finite ν: threshold `sqrt(2) * t.ppf(0.975, nu)`
against `studentized_range.sf(threshold, k - 1, nu)` and Monte Carlo with
`S = sqrt(chi2(nu)/nu)`. The A.2 sanity checks compute h_i by the same integral with
threshold q and test monotonicity, h_i² > h_{i−1} h_{i+1}, and (2.10)/(2.11) over all
integer partitions of k = 6 with t ≥ 2.

RELEASE 3 PART I INDEPENDENT REVIEW COMPLETE - C-H4 BOUNDED CHARACTERIZATION SOURCE-SUPPORTED -
GO WITH TWO SHOULD-FIX - SR-H AND OVERALL INPUT_INCOMPLETE - NOT ACCEPTED - NOT ADOPTED
