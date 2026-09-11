# Release 4 Factorial Research — Independent Exact-Head Review Result

**Status: informative independent review result; non-normative; not adopted.** This
record reviews three exact heads of the Release 4 factorial research programme: the
semantic research result (PR #181), the repaired preliminary numerical research result
(PR #180), and the author-side self-review and preparation repair (PR #182). It checks
research-record correctness, primary-source consistency where sources were reachable,
the effectiveness of the numerical diagnostics, the evidence boundary, and mutual
consistency. It selects no Contract, procedure, identifier, schema, Public Check,
tolerance, support domain, RFC decision, or release outcome. Attribution is role-based
only.

## 1. Dispositions

| Target                                          | Exact head                                 | Disposition                |
| ----------------------------------------------- | ------------------------------------------ | -------------------------- |
| A. Semantic research result (PR #181)           | `a2687f10719b399dafb511999cc1ef5b406a0c02` | `SOURCE_ACCESS_INCOMPLETE` |
| B. Repaired numerical research result (PR #180) | `5bae1f2548a7126c254c51b65b0eda4ae4941343` | `SOURCE_ACCESS_INCOMPLETE` |
| C. Self-review and preparation repair (PR #182) | `973ae5d2062095989d491ab00450effb16770af5` | `GO`                       |
| Overall                                         | —                                          | `SOURCE_ACCESS_INCOMPLETE` |

Finding counts: 0 `BLOCKER`, 0 `SHOULD-FIX`, 7 `NICE-TO-HAVE` (Section 12).

The two `SOURCE_ACCESS_INCOMPLETE` dispositions are not defects of the reviewed
records. Every repository-checkable claim of heads A and B was recomputed and found
correct, every embedded probe was reproduced, and the numerical diagnostics were
independently attacked without a false acceptance (Sections 6–8). The dispositions
record only that this review environment could not reach any of the primary-source
hosts named by the two results, so the raw-artifact hashes, page pinpoints, formula
transcriptions, the arXiv version question, and the four upstream documentation pages
were not independently re-inspected (Section 5). A reviewer with access to those
hosts must complete Section 5.4 before either research head is treated as fully
reviewed. The `GO` on head C covers its repository-verifiable content; its one
external bibliographic claim is likewise carried as not independently retrieved
(Section 9.4).

`GO` here means only that the exact head is accurate as a bounded informative record,
does not overclaim, and passed independent review. It does not resolve the semantic or
numerical `INPUT_INCOMPLETE`, complete the Research Gate, adopt any methodology, start
an RFC, open public discussion, authorize implementation, ratify or publish Release 4,
or approve a merge. Merge remains a separate steward action.

## 2. Reviewer role and independence

| Field                 | Value                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewer role         | independent exact-head reviewer of the Release 4 factorial research results and self-review                                                                                                                                                                                                                                                     |
| Independence boundary | did not author, revise, or repair the Release 4 preparation README, either commission, the horizon change, PR #176, Issue #177, Issue #178, the semantic result, the original or repaired numerical result, the self-review result, PR #179, or its two preserved reviews; did not author any Release 3 research result or review               |
| Evidence basis        | fixed Git objects fetched from the public repository; live PR and issue bodies read from the hosting service API on 2026-09-06 and hashed as returned; the embedded scripts extracted byte-exactly from the result blobs and executed; an independently installed arbitrary-precision library as numerical oracle; no prior summaries or memory |
| Review posture        | falsification-oriented: recompute every identity, reproduce every transcript, attack every acceptance criterion, and look for any reading that treats research records as adoption, gate closure, or authority                                                                                                                                  |
| Inspection date       | 2026-09-06 (UTC)                                                                                                                                                                                                                                                                                                                                |
| Private material      | none read; no private repository, path, or non-public document was used; no source purchase was attempted                                                                                                                                                                                                                                       |
| Software identity     | intentionally not recorded, per the repository's neutral-provenance rule                                                                                                                                                                                                                                                                        |

## 3. Identity verification

All values were recomputed from Git objects; the pull-request head refs were fetched
directly and compared with the API-reported head SHA.

### 3.1 Fixed preparation input and reviewed heads

| Object                                          | Expected                                                                                  | Observed                                                                                                                                                                                                                  | Result |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Fixed preparation commit / tree                 | `58675e66dbf263c94688d47867c731ad4efddbf6` / `a1c81b6480d5518271c1a4787cf9ab0879f6c2af`   | type `commit`; `^{tree}` same                                                                                                                                                                                             | match  |
| A. PR #181 head / tree / parents                | `a2687f10…` / `8a7c299542da206aaaeae7bb969f52bc2e3e8e2c` / sole parent `58675e66…`        | API head `a2687f10…`; tree same; exactly one parent, `58675e66…`                                                                                                                                                          | match  |
| A. changed files                                | exactly `governance/drafts/release-4-preparation/semantic-research-result.md` (added)     | `git diff-tree` lists exactly that path, status `A`                                                                                                                                                                       | match  |
| A. result blob                                  | `f70e89e995b0ec88d61d1a7eddf681ddb6d454b3`                                                | `git rev-parse a2687f10…:<path>` same                                                                                                                                                                                     | match  |
| B. PR #180 head / tree / parents                | `5bae1f25…` / `755d9b352b44e6e70807dc385240fdf107b483bd` / sole parent `e5d5ba4e…`        | API head `5bae1f25…`; tree same; exactly one parent, `e5d5ba4e87d6dac05ad1df541a7b25aa0d8b08ab`                                                                                                                           | match  |
| B. original result commit / sole parent         | `e5d5ba4e…` / `58675e66…`                                                                 | exactly one parent, `58675e66…`; tree `561aac0dd786e3c790a2e56277c10e0f73e5b288`                                                                                                                                          | match  |
| B. original result blob                         | `da509af2ebe55795f4afe8035c7a003664672187`                                                | `git rev-parse e5d5ba4e…:<path>` same                                                                                                                                                                                     | match  |
| B. changed file (repair commit)                 | exactly `governance/drafts/release-4-preparation/numerical-research-result.md` (modified) | `git diff-tree` lists exactly that path, status `M`                                                                                                                                                                       | match  |
| B. repaired result blob                         | `5b3668b8fb1b3c23f975654b21ffb8e8a1d41c46`                                                | `git rev-parse 5bae1f25…:<path>` same                                                                                                                                                                                     | match  |
| C. PR #182 head / tree / parents                | `973ae5d2…` / `23bb764cf4dcf071aafb2261d9bcc2ab963b9af6` / sole parent `58675e66…`        | API head `973ae5d2…`; tree same; exactly one parent, `58675e66…`                                                                                                                                                          | match  |
| C. changed files                                | exactly 5                                                                                 | Git and API both list exactly: preparation `README.md` (M), `numerical-research-commission.md` (M), `self-review-result.md` (A), `semantic-research-commission.md` (M), `governance/drafts/release-horizon-r3-r20.md` (M) | match  |
| C. self-review result blob                      | `04cd6970fa605e501316f5bae6011d82810b035c`                                                | `git rev-parse 973ae5d2…:<path>` same                                                                                                                                                                                     | match  |
| CI runs 34029031208 / 34029504271 / 34029753034 | `success` on heads A / B / C                                                              | workflow `CI`, event `pull_request`, `completed` / `success`, head SHAs match                                                                                                                                             | match  |

`IDENTITY_FAILURE` does not apply. Branch names `research/r4-factorial-semantics-58675e6`,
`research/r4-factorial-numerics-58675e6`, and `repair/r4-self-audit-20260906` are
task-oriented and neutral. Commit messages are one-line neutral subjects with no
trailers.

### 3.2 Preserved preparation reviews (PR #179), prior review only

| Object                        | Expected                                   | Observed                                                                        | Result |
| ----------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------- | ------ |
| PR #179 head                  | `f8e212a8c86b83b712933e3ac785d824220eb449` | API head same; branch `review/r4-factorial-preparation-20260906`                | match  |
| Close-only commit sole parent | `4a68ef6ef54a76007ebda223993f3fbf67034a67` | exactly one parent, same; that commit's sole parent is `58675e66…`              | match  |
| Original review blob          | `0529de440afb9ec88a223f1511fa0eb519a2c184` | `review-inputs/r4-factorial-preparation/REVIEW-RESULT.md` at both commits       | match  |
| Close-only review blob        | `ef3e0a727cf767c6a9e4ff654daf49d090cbbe30` | `review-inputs/r4-factorial-preparation-repair/REVIEW-RESULT.md` at `f8e212a8…` | match  |
| PR #179 changed files         | exactly the two review files               | API `changed_files` 2; both commits add one file each                           | match  |

PR #179's body distinguishes the historical `REPAIR_REQUIRED` (0/4/5) from the
current close-only `GO`, names both files with their blobs, records both issue hashes,
states that the preparation `GO` does not approve PR #180 or PR #181, and contains no
link to any generation service or session. Its one comment is the steward repair
completion note; its commits are authored under the role name "Independent Reviewer".
Neither preserved review's conclusion was inherited here; both were read in full.

### 3.3 Issue bodies

Each body was obtained from the hosting service API as the `body` field, decoded from
its JSON string form to UTF-8 bytes without alteration, and hashed. Title, metadata,
comments, and rendering were excluded.

| Issue | Expected bytes / SHA-256                                                  | Observed                                                                  | Result |
| ----- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------ |
| #177  | 3974 / `6da2af2a510d80289be5c5c8b3e885c0172332f18fec8c8cfbd602945158cf7e` | 3974 / `6da2af2a510d80289be5c5c8b3e885c0172332f18fec8c8cfbd602945158cf7e` | match  |
| #178  | 4242 / `362e603339f81ca72de3f3578a73b1c530ce3d0ead8dbc29e66a7c5187bf3b41` | 4242 / `362e603339f81ca72de3f3578a73b1c530ce3d0ead8dbc29e66a7c5187bf3b41` | match  |

Both issues are open, each with one steward repair-record comment whose stated
lengths and hashes agree with the values above. The bodies match the hashes recorded in
heads A, B, and C, in PR #179's close-only review, and in PR #179's body.

### 3.4 Blobs and heads cited by the results

Every input blob cited by the semantic result (preparation README `34fa11bd…`, semantic
commission `f1a75907…`, Release 3 semantic result `8f215260…`, the three Release 3
semantic reviews `fc61decb…`, `e6464295…`, `395054fd…`, the source-acquisition result
`5465cbcf…`, the SR-L repair review `6624d462…`, the original numerical review
`7a27fe44…`) and by the numerical result (README, numerical commission `48836247…`,
Release 3 semantic and acquisition results) resolves to exactly that blob at
`58675e66…`. The three reviewed heads `03dce3ec…`, `45392950…`, `778f295e…` are
commits; the Release 3 semantic result at those heads resolves to `e21df31a…`,
`30474af9…`, and `8f215260…` respectively, which is the chain the final-repair review
records, and `778f295e…` is the head whose `GO` covers the pinned blob. The acquisition
review's source commit `1e220f67…` has tree `a683e12a…` and the numerical review's
source commit `32e9f3c5…` has tree `67666821…`, as the semantic result states. The
horizon blob `8cfe5c42…` cited by the self-review matches.

Release 3 states cited by the results were confirmed from the pinned files: the
semantic result's header is `NARROW` with a 49-entry catalogue; the acquisition result
records SR-L `CLOSED` and 13 items `INPUT_INCOMPLETE` with `SOURCE_SET_READY=false`;
the SR-L repair review is `GO` for that scoped repair; the original numerical review
is `NO_GO` for PR #174.

### 3.5 Main-branch drift

`main` has advanced one commit beyond the fixed input (`648cc17e…`, "Standardize
artifact and provenance hygiene", which only extends the `AGENTS.md` neutrality rule to
signatures, footers, trailers, workflow names, and generated output). The three PRs
still base on `58675e66…`. This review branch is created from `58675e66…` as
instructed; the extended neutrality rule was applied to the review of the three heads
anyway (Section 9.13).

## 4. Documents read

Read in full at `58675e66…` unless stated: `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`,
`governance/ID-POLICY.md`, `governance/RFC.md`,
`governance/drafts/release-horizon-r3-r20.md` (also at head C), the Release 4
preparation README (also at head C), both commissions (also at head C), the semantic
result at head A, the original and repaired numerical results at `e5d5ba4e…` and head
B, the self-review result at head C, both PR #179 review results, the pinned bodies of
Issues #177 and #178, the four PR bodies and their comments, and `AGENTS.md` at
`main`. The directory-local `AGENTS.md` files exist only under `spec/`, `reference/`,
and `conformance/`; none governs the changed paths. Release 3 artifacts were consulted
only for the identity and state checks in Section 3.4.

## 5. Primary-source access record

### 5.1 Attempted routes

Every primary-source and upstream-documentation host named by heads A and B, and the
publisher route named by heads A and C, was requested directly from this environment.
Every request was refused by the environment's egress policy before any bytes were
transferred (gateway `403` on `CONNECT`). Policy denials were not retried or routed
around.

| Source                                                                          | Host                          | Outcome          |
| ------------------------------------------------------------------------------- | ----------------------------- | ---------------- |
| P1, Dasgupta, Pillai, Rubin, arXiv 1211.2481 (PDF and abstract/version listing) | `arxiv.org`                   | blocked, 0 bytes |
| P2/P3, NBS Special Publication 503 (PDF)                                        | `nvlpubs.nist.gov`            | blocked, 0 bytes |
| Williams, DOI `10.1093/biomet/39.1-2.65` (DOI resolver and publisher record)    | `doi.org`, `academic.oup.com` | blocked          |
| NIST/SEMATECH Handbook 5.6.1.5 and 1.3.6.6.5                                    | `itl.nist.gov`                | blocked          |
| DLMF 8.17                                                                       | `dlmf.nist.gov`               | blocked          |
| LAPACK 3.12.1 DGELS documentation                                               | `netlib.org`                  | blocked          |

No copy of either PDF, and no record of the expected hashes
`8cc5bb404cae91ee5c917e2dbb834ef8a178e69ce53f50d52293ce2126512d6c` (330248 bytes) or
`7fa4e615d2846bfea23c88cf3e788e1692591a7e20497335397bc70070cce3f4` (22689184 bytes),
exists anywhere in the repository history, so no offline hash comparison was possible.

### 5.2 Consequence

The following claims of head A are therefore **not independently verified** here:
the two raw-artifact hashes and sizes; the printed-page and equation pinpoints for P1
§3, Theorems 4.1–4.2, Corollary 4.2.1, equations (26)–(27), and pp. 16–17; the P2 pp.
40–45 and P3 pp. 66–70 pinpoints; the arXiv version/date discrepancy and the p. 7
example-vector transcription question; and the publisher record identifying E. J.
Williams as the author of the Biometrika 39 paper. The following claims of head B are
not independently verified here: the four upstream page facts (two-level factorial
product terms and least-squares route; F CDF via the complementary regularized
incomplete beta with numerically computed quantile; DLMF 8.17.1–4, 8.17.7, 8.17.22–23;
DGELS full-rank assumption and rank-deficiency warning).

Head A itself records the arXiv version/date discrepancy and the p. 7 transcription
doubt as unresolved reopen work and does not use the questioned example as an oracle;
head B records that no archived, hashed copies of its pages exist and that this gap
prevents promotion. This review leaves those holds exactly as recorded and closes none
of them. The mathematical content head B attributes to DLMF 8.17 (integral definition,
normalization, series in the form used by its Decimal recurrence) was checked
independently against the reviewer's own derivation and an independent library
(Section 7); that check verifies the mathematics, not the citation.

### 5.3 What was verified without source access

Everything in Sections 6–9 that depends only on repository objects, executable
evidence, algebra, or an independent numerical oracle was verified. In particular the
semantic result's algebra, catalogue, dispositions, refusal logic, and executable
ledger; the numerical result's derivation, enclosure direction, diagnostics, corpus,
transcripts, and script hashes; and every consistency and boundary claim of the
self-review.

### 5.4 Completion requirement

A reviewer with access to the six hosts must: download both PDFs and confirm the two
hashes and sizes; confirm each pinpoint in head A's source table against page images
where formulas or OCR are in doubt; read the arXiv version listing and the PDF's first
page stamp and resolve or re-record the version/date discrepancy; retrieve the
publisher record for DOI `10.1093/biomet/39.1-2.65` and confirm the author identity
(without treating that as full-text inspection); and read the four upstream pages to
confirm they support exactly the facts head B attributes to them and nothing more. Until
then, heads A and B stay `SOURCE_ACCESS_INCOMPLETE` in this record.

## 6. Semantic result review (head A)

| #   | Check                                                                             | Evidence at head A                                                                                                                                                                                                                                                                                  | Result             |
| --- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| 1   | Non-authorship boundary stated                                                    | "Independence and repository identity": "did not author the preparation package, and has not authored a Release 4 semantic or numerical implementation. This is an independence statement, not an independent review of this result."                                                               | present; see N-A4  |
| 2   | Release 3 semantic result and three reviews pinned by commit, blob, reviewed head | input table lists all nine blobs; the three review paths, blobs, and reviewed heads `03dce3ec…`, `45392950…`, `778f295e…` are stated; all recomputed (Section 3.4)                                                                                                                                  | correct            |
| 3   | 34-entry catalogue covering Candidates A–D                                        | 34 rows counted mechanically: 16 `INPUT_INCOMPLETE`, 8 `RESEARCH_ONLY`, 5 `TRANSFER`, 3 `R4-CANDIDATE`, 2 `REJECT`; A (A-\*, E-\*), B (B-A, B-B, B-AB), C (C-I…C-IV, C-EQUAL, C-WEIGHT), D (D-NOREP … D-STD) including the required more-than-two-factor entry D-MULTI                              | complete           |
| 4   | Candidate B balanced, C unbalanced                                                | B-A/B-B/B-AB "Balanced general …"; C-\* "unbalanced"; "In arbitrary balanced `a × b`…"                                                                                                                                                                                                              | consistent         |
| 5   | No Candidate D behaviour mixed into A                                             | proposed refusals name repeated/clustered/blocked units, random/mixed factors, covariates, missing cell, unequal counts; D-MULTI, D-EMPTY, D-BLOCK, D-MIX, D-REPEAT, D-COV carry their own dispositions                                                                                             | prevented          |
| 6   | Facts / inference / conventions separated                                         | separate sections "Source-established facts", "Investigator inference: bounded meanings and algebra", "Proposed project conventions and refusal boundary", "Conflicts and unresolved interpretation"                                                                                                | separated          |
| 7   | Nothing unconfirmed written as adopted                                            | every test, interval, Type I–IV, robust, permutation, and post-hoc entry is `INPUT_INCOMPLETE` or `RESEARCH_ONLY`; "No critical-value algorithm or coverage claim is approved here"; "No Tukey, Dunnett, BH, or resampling method is selected"; causal claims limited to P1's randomization setting | prevented          |
| 8   | No final adoption without qualification                                           | header "not adopted. Programme: INPUT_INCOMPLETE"; "`R4-CANDIDATE` below concerns source-bounded effect meaning only and does not override the programme hold"; `SEMANTIC_PROGRAM_READY` never assigned                                                                                             | prevented          |
| 9   | Executable falsification ledger reproducible                                      | the single `js` fence was extracted byte-exactly (SHA-256 `c2870b0d0f3556edb71fa69edac752db3ab20ed47a81f42f586f56903f41a756`) and run under Node.js v22.22.2: printed `PASS: algebra, declared refusals, and unequal-weight counterexample`, exit 0; the result records v24.19.0                    | reproduced         |
| 10  | Unequal-weight counterexample bounded                                             | "It falsifies interchangeability of the explicit equal-weight and observed-frequency questions. It does not assert that every Type III implementation selects either one."; S6 "Two-system execution NOT COMPLETED"                                                                                 | bounded            |
| 11  | No overclaim on detecting false independence declarations                         | "Unverifiable independence and variance declarations remain explicit limits of verification, not purported mechanically detectable violations"; ledger row "False independence declarations cannot be detected from numbers alone"                                                                  | prevented          |
| 12  | Source holds and reopen conditions complete                                       | S1–S6 cover Yates, Williams, Type I–IV, robust/permutation, classical test/interval basis, two-system comparison; reopen conditions repeat all six plus P1 version/formula ambiguities                                                                                                              | complete; see N-A3 |

Algebra re-derived independently: with `dA = c_A/2`, `dB = c_B/2`, `dAB = c_AB`, the
stated `SSA = n·dA²`, `SSB = n·dB²`, `SSAB = n·dAB²/4` all equal `n·c²/4`, agreeing
with head B's Section 3; `T = SSA + SSB + SSAB + W` and ranks `1, 1, 1, 4(n−1)` are
correct; `SE(dA) = SE(dB) = √(MSE/n)` and `SE(dAB) = 2√(MSE/n)` follow from contrast
variance `σ²·Σw²/n`. The ledger's `decompose` uses `n = 2` cells `[v−1, v+1]`, so its
`[2dA², 2dB², dAB²/2, 8]` is exactly the general formula. The unequal-weight fixture
`(1, 9, 9, 1)` with means `(0, 10, 0, 10)` gives equal-weight A effect `0` and
frequency-weighted difference `−8` as stated.

## 7. Numerical result review (head B)

### 7.1 Reproduction

| Item                             | Expected                                                           | Observed                                                                                        | Result |
| -------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ------ |
| Original embedded script SHA-256 | `65b32feeb662b7dd3fdac36a3608e82c15b943a9a6d6086b0f05bd13b15558fc` | single `python` fence at blob `da509af2…`, extracted byte-exactly, same hash                    | match  |
| Original transcript              | as recorded at `da509af2…`                                         | run under Python 3.11.15 x86_64, exit 0; identical except the version line (`3.12.13` recorded) | match  |
| Repaired embedded script SHA-256 | `b66f7826badf2d335fa7faf9669a625752c30848a1fc24a1dae0dd41eba9cf0e` | single `python` fence at blob `5b3668b8…`, same hash                                            | match  |
| Repaired transcript              | as recorded at `5b3668b8…`                                         | exit 0; identical except the version line; last line prints the repaired hash                   | match  |
| Diff original → repaired         | Sections 4, 9 (script), 10 (transcript), 11 and header only        | `git diff e5d5ba4e… 5bae1f25…` touches exactly those regions; no other section changed          | match  |

### 7.2 Independent mathematical inspection

Derivation of the rational enclosure re-done from the definition `Q(F) = I_x(ν/2, 1/2)`
with `x = ν/(ν+F)` and `d = 1`: substituting `t = 1 − u²` in `B_x(a, 1/2)` gives
`2∫_{√(1−x)}^{1}(1−u²)^{a−1}du = 2[H(1) − H(√(1−x))]`, `B(a,1/2) = 2H(1)`, hence
`Q = 1 − H(√(F/(ν+F)))/H(1)` with `H(u) = Σ_k (−1)^k C(a−1,k) u^{2k+1}/(2k+1)`, as head
B states. `H′(u) = (1−u²)^{a−1} ≥ 0` on `[0,1]`, so `H` is non-decreasing; with
`l ≤ √z < h` the script's returned pair `(1 − H(h)/H(1), 1 − H(l)/H(1))` is a valid
(lower, upper) enclosure. The integer-square-root bracket `j = ⌊√(⌊N·s²/D⌋)⌋` satisfies
`j/s ≤ √z < (j+1)/s`. The Decimal recurrence ratio `(a+k−1)(2k−1)x/((a+k)(2k))` is the
term ratio of `x^a·₂F₁(a, 1/2; a+1; x)/(a·B(a,1/2))`, and the script's `B(a,1/2)`
product (`2·Π 2j/(2j+1)`) is correct for integer `a` (checked at `a = 1, 2`). The
formula therefore matches the DLMF 8.17.7 form head B cites, subject to Section 5.

Independent oracle: an arbitrary-precision library was installed (the investigator
records it as unavailable) and `betainc(ν/2, 1/2, 0, x, regularized)` at 80 digits was
compared with the script's `tail_bounds`:

- 49 `(ν, F)` cases over `ν ∈ {2, 4, 6, 8, 10, 60, 200}` and `F ∈ {10⁻¹⁰, 1/2, 1, ν, 8ν, 10⁶, 2¹⁰⁰}`: the oracle value lies inside the rational enclosure in every case (0 failures);
- the nine diagnostic points: oracle inside the enclosure; Decimal series relative difference from the oracle `≤ 1.6·10⁻⁸⁰`, limited by the oracle's own precision; true tails at `F = 2¹⁰⁰` are `3.7·10⁻⁶⁰` (ν=4), `4.3·10⁻¹¹⁸` (ν=8), `1.8·10⁻⁸⁵¹` (ν=60);
- the four binary64 projections at `ν = 4`, `F = 2⁵¹⁰, 2⁵³⁰, 2⁵⁴⁰, 2⁶⁰⁰`: oracle values `5.3·10⁻³⁰⁷`, `4.9·10⁻³¹⁹`, `4.6·10⁻³²⁵`, `3.5·10⁻³⁶¹`, all positive, whose nearest binary64 values have exactly the recorded hexadecimal forms `0x1.8p-1018`, `0x0.0000000018000p-1022`, `0x0.0p+0`, `0x0.0p+0`; the last two are positive reals projecting to zero, as head B says.

The critical bracket `0x1.ed5a7ab7a937bp+2 ≈ 7.7086` at `α = 1/20`, `ν = 4` is the
`F(1,4)` upper 5% point; the midpoint projection `float(1 + 2⁻⁵³) = 1.0` is
round-to-nearest-even. Both were reproduced.

### 7.3 Diagnostic effectiveness and adversarial mutation

Independently reproduced: at `F = 2¹⁰⁰`, `ν = 60`, the enclosure midpoint is below
`10⁻¹⁴⁰`, so the original absolute criterion `|q − mid| < 10⁻¹⁴⁰` accepts `0`, `2q`,
and `10⁻¹⁴¹` alike; at `ν = 4` the same criterion correctly rejects `0` (tail
`3.7·10⁻⁶⁰`). The repaired `diagnostic_agrees` was loaded from the extracted script and
attacked without executing its own assertions:

| Mutation                                                                                              | Outcome                                     |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| true series value; exact lower endpoint; exact upper endpoint; old midpoint                           | accepted (correct)                          |
| zero; doubled; halved; negated; `1`; `10⁻¹⁴⁰`; relative error `±10⁻¹⁰⁰`; relative `+2·10⁻¹²⁰`         | rejected                                    |
| relative error `+5·10⁻¹²¹` (inside the declared diagnostic tolerance)                                 | accepted, by design                         |
| reversed bounds; `lo = 0`; negative `lo`; `hi > 1`; equal bounds; wide bounds; bounds straddling zero | rejected for both the true value and zero   |
| `NaN`, `+∞`, `−∞` as the candidate                                                                    | exception before comparison; never accepted |
| the eighteen zero/doubled controls at all nine points                                                 | rejected (transcript reproduced)            |

No false acceptance was found. Extreme parameters: `ν = 2` with `F = 2⁻²⁰⁰` and
`ν = 1000` with `F = 1` and `F = 2¹⁰⁰` all enclose the oracle; `F = 0` returns the exact
pair `(1, 1)`; at `F = 2¹⁰⁰⁰` (ν=2) and `F = 2¹⁰²³` (ν=4) with 512 bits the upper
square-root bracket exceeds `1` and the returned lower bound is `≤ 0` — still a valid
but useless bound, which the script's `0 < lo` assertions would reject fail-closed and
which head B documents ("a general endpoint routine would clamp `h` to 1"). Odd `ν`
is silently computed with `a = ν // 2` and gives a wrong enclosure (ν=3, F=3: computed
`0.2929…` versus true `0.1817…`); head B states the even-`ν` restriction in text and
comment and notes the oracle "does not cover all" Candidate B parameters (N-B1).

### 7.4 Content checks

| #   | Check                                                                                  | Evidence at head B                                                                                                                                                                                                                                                                                      | Result     |
| --- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 6   | `10⁻¹²⁰` scale-relative threshold not promoted                                         | §4 "This is a diagnostic threshold, not a Protocol tolerance or a rigorous series remainder bound"; §4 "a portable certificate needs an independent explicit nearest-even converter"; §11 "does not certify series truncation or a support domain"                                                      | prevented  |
| 8   | Four binary64 endpoint equalities asserted                                             | script line `assert 0<lo<hi and float(lo)==float(hi)` inside the projection loop                                                                                                                                                                                                                        | asserted   |
| 9   | Zero projection not confused with exact zero probability                               | §5 "zero projection is not exact probability zero"; §11 "positive real tails whose binary64 projection is zero"; oracle confirms positivity                                                                                                                                                             | prevented  |
| 10  | F-tail, critical value, interval, adjustment, resource, platform, projection left open | §5 "still required" column for every quantity; §6 `PRELIM-PENDING` for intervals and adjustment; §8 blocking handoff list; "No observed duration or largest corpus count is a global resource bound"; "No Release 3 platform allowlist is copied"                                                       | open       |
| 11  | Toy admission and manifest tests not treated as production evidence                    | §7 "Their policy is a probe guard only"; "not a certificate validator or evidence that production tampering is detected"; transcript "(toy only)"                                                                                                                                                       | prevented  |
| 12  | Candidate B balanced, C unbalanced                                                     | §4 "Candidate B changes d to a-1, b-1 and (a-1)(b-1)"; §6 rows "Candidate B balanced a by b", "Candidate C complete unbalanced"; "Candidate B is balanced, not unbalanced"                                                                                                                              | consistent |
| 13  | No final numerical judgement before the semantic handoff                               | §1 "No later input or reviewed Release 4 semantic handoff is incorporated"; §8 "no final feasibility labels are assigned"                                                                                                                                                                               | prevented  |
| 14  | Programme `INPUT_INCOMPLETE`; per-entry labels `PRELIM-*` only (mechanical search)     | header and §8/§11 `INPUT_INCOMPLETE`; assessment column contains only `PRELIM-PARTIAL`, `PRELIM-PROBED`, `PRELIM-PENDING` (×5), `PRELIM-DERIVED`; five `PRELIM-*` labels are defined in §6; `NUMERIC_FEASIBLE`, `ORACLE_ONLY`, `NUMERIC_PROGRAM_READY`, `NARROW`, `DEFER` appear nowhere as assignments | confirmed  |

## 8. Self-review and preparation repair review (head C)

| #   | Check                                                                                                 | Evidence at head C                                                                                                                                                                                                                                                                                                                        | Result     |
| --- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1   | Self-review does not claim independence                                                               | line 5 "This is not an independent review of the preparation or either research result"; "Self-review does not satisfy this"; PR #182 body "explicitly not independent review"                                                                                                                                                            | prevented  |
| 2   | Does not close the semantic source holds                                                              | "No scientific or source hold is closed, and PR #181's result is unchanged"; follow-up item 2 lists S1–S6 material and the arXiv discrepancy as open                                                                                                                                                                                      | prevented  |
| 3   | Does not promote the numerical repair                                                                 | "The scale-relative 1e-120 threshold is an exploratory diagnostic only, not a new public-check tolerance. The self-derived enclosure proof still requires independent review."; "These checks do not prove scientific validity, a portable projection certificate, or a supported numerical domain"                                       | prevented  |
| 4   | Williams/Tukey correction bibliographic only                                                          | README "This correction establishes no methodological claim or primary-text completion"; ledger row "full text and exact scope remain uninspected"; SA-3 "no full-text or methodological claim added"; the row's planned role is unchanged                                                                                                | limited    |
| 5   | Candidate B/C consistent across README, both commissions, both results, issue erratum                 | README table rows B (balanced `a × b`) and C (unbalanced) unchanged; numerical commission Q11 rewritten "For Candidate C (unbalanced)… For Candidate B (balanced `a × b`)… without reclassifying it as unbalanced"; semantic and numerical results as in Sections 6.4 and 7.4; Issue #178 erratum                                         | consistent |
| 6   | Semantic non-authorship boundary consistent between Issue #177 and the next commission version        | commission now: "who did not author or revise the preparation README, either commission, the horizon change, or PR #176. The result records this non-authorship boundary. This later clarification mirrors repaired Issue #177; it does not replace that issue's fixed commission blob"                                                   | consistent |
| 7   | `INPUT_INCOMPLETE`, `PRELIM-*`, review-state rules consistent between Issue #178 and the next version | commission now: "A preliminary-only result returns programme disposition `INPUT_INCOMPLETE`. Per-entry assessments use explicitly preliminary `PRELIM-*` labels… Every later input records its exact commit, tree, blob, and review state. These clarifications mirror repaired Issue #178 and do not replace its fixed commission blob." | consistent |
| 8   | No reading lets discussion open before R4-P1, P2, P4, P5, P6 are resolved                             | README step 6 now: "after R4-P1, R4-P2, R4-P4, R4-P5, and R4-P6 are reviewably resolved. Only R4-P3 may remain…"; horizon still "opens only after its own bounded question and Research Gate handoff are reviewable"                                                                                                                      | prevented  |
| 9   | R4-P3 exception not readable as design freeze or implementation                                       | step 6 continues "that exception does not authorize design freeze or implementation while numerical evidence is open"; `AGENTS.md` hard rule and `RFC.md` research gate independently bar it                                                                                                                                              | prevented  |
| 10  | Release 3 `NARROW`, 13 holds, unaccepted numerics not presented as an existing foundation             | README adds a dated snapshot: `NARROW`, 13 holds, PR #174 open and unaccepted, "not a live status or a claim that an accepted numerical foundation already exists"; horizon row changed from "Should reuse … foundation established for Release 3" to "May reuse … only after acceptance and scope verification"                          | prevented  |
| 11  | Fixed inputs of Issues #177/#178 not retroactively replaced                                           | README "This subsequent informative self-review revision does not replace the fixed inputs of Issues #177 and #178. Their original blobs and repaired issue bodies remain the commissioned inputs."; both commissions "does not replace that issue's fixed commission blob"; the issue bodies are unchanged (Section 3.3)                 | prevented  |
| 12  | Informative documents create no authority                                                             | none of the five paths is in `authority/authority-manifest.yaml`; no `MUST`/`SHOULD`/`MAY` keyword or `NRS-` anchor added (the only uppercase `SHOULD-FIX` tokens are finding severities); `registries/requirements.yaml` unchanged; `validate.ts` clean at head C                                                                        | none       |
| 13  | Neutral provenance in metadata, branches, commit messages, PR bodies, result bodies                   | no provider, model, service, or session identifier found by search of the three heads' changed files, the six commit messages, the four PR bodies, and their comments; authorship is a personal name or the role "Independent Reviewer"; no trailers; see N-A2 and N-B2 for two mechanism-implying phrases                                | clean      |

The self-review's inspected-identity table, both issue hashes, the PR #180 head and
blob update, the original and repaired script hashes, the CI run identity, and the
statement that PR #179's two review blobs were not changed were each recomputed and
match. Its statement that formatting, lint, typecheck, direct validation, and
`git diff --check` pass at head C was reproduced (Section 11).

## 9. Cross-consistency

- Issue hashes: identical in heads A, B, C, PR #179's close-only review, PR #179's body, both issue comments, and this review.
- Candidate B/C: identical treatment in the README (both revisions), both commissions at head C, Issue #178, head A, head B, and head C.
- Release 3 state: head A ("NARROW… 49-entry catalogue… acquisition result remains INPUT_INCOMPLETE… original numerical review is NO_GO"), head B ("No Release 3 numerical certificate is used"), and head C (dated snapshot) agree with the pinned files.
- Numerical repair provenance: head B §11, head C SA-1/SA-4 and its "Numerical repair identity" section, and PR #180's body agree on old/new heads, blobs, script hashes, nine positive cases, eighteen controls, and four assertions.
- Williams attribution: head A S2, head C SA-3, and the README correction agree that only publisher-indexed metadata was consulted and that no full text was inspected; head A keeps S2 open, and head C does not close it. The attribution itself is `SOURCE_ACCESS_INCOMPLETE` here (Section 5).
- PR #179: head C's SA-2 description matches the current PR #179 body (historical versus current disposition, two files, no footer); the two review blobs are unchanged.
- Carried-forward conditions from the close-only review: head A records the three Release 3 review pins and the non-authorship boundary; head B states `INPUT_INCOMPLETE`, defines and uses only `PRELIM-*` labels, and records B as balanced. All three carried-forward conditions are met.

## 10. Adversarial misreadings

| #   | Attempted misreading                                                                | Blocking text                                                                                                                                                                                          | Outcome   |
| --- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| 1   | Candidate A is already adopted                                                      | head A "not adopted… research boundary, not yet a source-complete inference Contract"; catalogue note on `R4-CANDIDATE`; README "not selected for adoption"; Issue #177 "rather than an adopted scope" | prevented |
| 2   | The Release 4 Research Gate is complete                                             | all three heads `INPUT_INCOMPLETE`; head C "No Research Gate, public-opening hold, methodology, or release is approved here"; R4-P1…R4-P6 unresolved                                                   | prevented |
| 3   | A review `GO` resolves the semantic or numerical `INPUT_INCOMPLETE`                 | Section 1 of this record; head C "not an independent GO"; both commissions require source completion and a successor bound to the reviewed semantic handoff                                            | prevented |
| 4   | PR #180's repaired diagnostic is the Protocol tolerance                             | head B §4 and §11; head C "not a new public-check tolerance"; `AGENTS.md` "Tolerances live only in `registries/public-checks.yaml`"                                                                    | prevented |
| 5   | A positive probability that projects to binary64 zero is truly zero                 | head B §5, §11; independent oracle values `4.6·10⁻³²⁵` and `3.5·10⁻³⁶¹` are positive                                                                                                                   | prevented |
| 6   | Correcting Williams's name confirms the paper's methodology                         | README "establishes no methodological claim or primary-text completion"; head A S2 open; head C SA-3                                                                                                   | prevented |
| 7   | Candidate B is unbalanced                                                           | README table; Issue #178 erratum; commission Q11 at head C; heads A and B                                                                                                                              | prevented |
| 8   | Release 3 numerical methods are adopted for Release 4                               | head B §1, §8; head A "do not transfer from the reviewed NO_GO state"; README snapshot and horizon row at head C; Issue #178 on PR #174                                                                | prevented |
| 9   | A final numerical judgement can be issued before the semantic review                | Issue #178; head B §8; mechanical label search (Section 7.4 #14); commission at head C                                                                                                                 | prevented |
| 10  | The self-review satisfies the independent-review requirement                        | head C line 5 and follow-up item 1; head B header; PR #182 body; `AGENTS.md` "a second pass in the authoring context is not enough"; `RFC.md` rule 2                                                   | prevented |
| 11  | CI success proves scientific correctness                                            | head C "does not establish primary-source or methodological correctness"; head B §10 "No numerical gate closure is inferred"; head A validation record; this review's Section 11                       | prevented |
| 12  | Merging the PRs opens discussion, authorizes implementation, ratifies, or publishes | README step 6 "distinct steward action"; head C "Merge of review/research records is a separate steward action and is not methodology adoption"; all PR bodies; `RFC.md` stages                        | prevented |

Two further attempts: (a) reading head A's source-table identity
"arXiv:1211.2481v2, revised 2012-11-16" as a settled version identity — the conflicts
section records the 2018 cover date as unresolved and the reopen conditions include it,
so the misreading is prevented within the document, but the identity row itself could
carry the caveat (N-A1); (b) reading head A's three `R4-CANDIDATE` effect entries as
the F tests being candidates — the test entries A-F-\* are separately `INPUT_INCOMPLETE`
and the note limits `R4-CANDIDATE` to effect meaning: prevented. Whether P1 in fact
supports the effect definitions is `not assessable` here (Section 5).

## 11. Validation

Executed in three fresh clones of the public repository, each checked out detached at
the exact head, after `pnpm install --frozen-lockfile` (exit 0; Node v22.22.2, package
manager 11.7.0). The heads change Markdown under `governance/drafts/` only; none touches
`tooling/`, so the required scope for each head is the repository-wide hygiene suite.

| Command                                     | Head A                                                                                                                                                                                                          | Head B                                     | Head C                                     |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| `pnpm install --frozen-lockfile`            | exit 0                                                                                                                                                                                                          | exit 0                                     | exit 0                                     |
| `pnpm format:check`                         | pass, exit 0                                                                                                                                                                                                    | pass, exit 0                               | pass, exit 0                               |
| `pnpm lint:markdown`                        | 357 files, 0 issues, exit 0                                                                                                                                                                                     | 357 files, 0 issues, exit 0                | 357 files, 0 issues, exit 0                |
| `pnpm typecheck`                            | pass, exit 0                                                                                                                                                                                                    | pass, exit 0                               | pass, exit 0                               |
| `node --import tsx tooling/src/validate.ts` | `validate: OK`, exit 0                                                                                                                                                                                          | `validate: OK`, exit 0                     | `validate: OK`, exit 0                     |
| `git diff --check`                          | pass, exit 0                                                                                                                                                                                                    | pass, exit 0                               | pass, exit 0                               |
| `pnpm check`                                | pass, exit 0 (sequential run): tests 55 files / 520 passed, generated diff, Phase 1 132 fixtures, Phase 2A 44, refusal 8, oracle 7 datasets (max rel. diff 8.96e-15), evidence 8 and 10 files, 0.2.1 fixtures 6 | pass, exit 0 (sequential run): same counts | pass, exit 0 (sequential run): same counts |

Environment notes. A first attempt used `git worktree` checkouts; there the
private-dependency audit rejected the worktree's `.git` pointer file for containing an
absolute home path. That is a property of worktree checkouts, not of the heads, and the
fresh clones above are the recorded evidence. A first `pnpm check` attempt ran the three
clones concurrently on one container and failed only with four vitest timeouts in
Release 2 paired-t tests that none of the heads touches
(`paired-t-candidate-supported-scope-resource-bounds`,
`paired-t-runtime-numerical-contract-full-trace-candidate`,
`paired-t-supported-execution-candidate`; 516 of 520 tests passed); the sequential
re-run reported above is the evidence of record. Hosted CI runs 34029031208,
34029504271, and 34029753034 were confirmed `success` on the three heads; CI is
auxiliary repository-hygiene evidence and was not used for any content judgement.

Not executable here: every network retrieval in Section 5.1. No substitute was used;
the affected claims are recorded as not independently verified.

## 12. Findings

No `BLOCKER` or `SHOULD-FIX` finding. The seven `NICE-TO-HAVE` findings below do not
hide a gap, assert an unverified fact as verified, or present anything as adopted;
each concerns precision or neutrality of wording or a probe guard.

### N-A1 — Source-table identity of P1 does not carry the version/date caveat

- **Severity:** `NICE-TO-HAVE`
- **Target:** head A `a2687f10…`, blob `f70e89e9…`, source table row P1 ("arXiv:1211.2481v2, revised 2012-11-16") versus "Conflicts and unresolved interpretation" (printed cover date August 30, 2018; image-level resolution and comparison remain reopen work)
- **Observation:** the identity row states a version and revision date as settled while the conflicts section records that the hashed PDF's printed date disagrees and is unresolved.
- **Failure path:** a later reader citing only the source table pins "v2, 2012-11-16" to hash `8cc5bb40…` although head A itself does not know which arXiv version the bytes are.
- **Impact:** provenance precision only; no methodological claim depends on the version.
- **Minimal fix:** in the next revision, add the PDF's first-page arXiv stamp text verbatim to the row and mark the version identity "unresolved, see conflicts".
- **Close condition:** the row and the conflicts section state the same version status; a source-access-complete reviewer confirms the stamp.

### N-A2 — A phrase implies the retrieval mechanism

- **Severity:** `NICE-TO-HAVE`
- **Target:** head A, "Independence and repository identity": "fetched through the repository connector"
- **Observation:** `AGENTS.md` requires public artifacts not to "identify or imply the … mechanism used"; "repository connector" implies a tool-integration mechanism without naming a provider.
- **Failure path:** none for authority; a neutrality-audit reader may flag the phrase.
- **Minimal fix:** "fetched from the hosting service's issue API".
- **Close condition:** phrase replaced in the next revision.

### N-A3 — Hold S5's affected-entry list omits E-SIM

- **Severity:** `NICE-TO-HAVE`
- **Target:** head A, unresolved source ledger row S5 ("A-F-A, A-F-B, A-F-AB, E-CI, B-A, B-B, B-AB") versus catalogue row E-SIM ("INPUT_INCOMPLETE — S5 and exact family/interval method")
- **Observation:** E-SIM cites S5 but S5 does not list E-SIM.
- **Failure path:** a reader clearing S5 by entry list would leave E-SIM's hold reference dangling.
- **Minimal fix:** add E-SIM to the S5 row.
- **Close condition:** every catalogue reference to S1–S6 appears in that hold's affected-entry list.

### N-A4 — Non-authorship statement is not itemized as Issue #177 words it

- **Severity:** `NICE-TO-HAVE`
- **Target:** head A, "Independence and repository identity": "did not author the preparation package"
- **Observation:** Issue #177 requires that the investigator "must not have authored or revised the Release 4 preparation README, either Release 4 commission, the release-horizon change, or PR #176" and that the identity section record the boundary explicitly. The result's sentence covers the package as a whole and omits "revised". The carried-forward close condition from PR #179's close-only review is met in substance.
- **Failure path:** a strict reader cannot confirm from the sentence alone that the horizon change was included or that revision (not only authorship) is excluded.
- **Minimal fix:** itemize the four artifacts and add "or revised".
- **Close condition:** the identity section names the README, both commissions, the horizon change, and PR #176 with "authored or revised".

### N-B1 — Even-degrees-of-freedom restriction is not guarded in the probe

- **Severity:** `NICE-TO-HAVE`
- **Target:** head B `5bae1f25…`, blob `5b3668b8…`, §9 `tail_bounds` (`a=nu//2`) and §4 ("For integer A=nu/2")
- **Observation:** odd `ν` is silently floored; the returned pair is then not an enclosure of `Q` (ν=3, F=3: `0.2929…` versus true `0.1817…`). Candidate A's `ν = 4(n−1)` is always even, and head B already states the oracle "does not cover all" Candidate B parameters, where `ν = ab(n−1)` can be odd.
- **Failure path:** a successor reusing the function for Candidate B with odd `ν` would obtain a confident wrong enclosure with no exception.
- **Impact:** none for the recorded corpus; hazard for reuse.
- **Minimal fix:** `assert nu % 2 == 0` at the top of `tail_bounds`, or state in §4 that the routine must reject odd `ν`; note that the script hash changes with any edit and must be re-recorded.
- **Close condition:** the successor's routine rejects odd `ν` or a general-`b` route replaces it.

### N-B2 — A sentence implies a tooling mechanism

- **Severity:** `NICE-TO-HAVE`
- **Target:** head B, §7 "Failed routes": "A page-read call with an unsupported viewport argument failed and was corrected."
- **Observation:** the sentence describes a tool interface rather than a research failure and implies the mechanism used to read pages; it records nothing decision-bearing.
- **Minimal fix:** delete the sentence or reduce it to "one page retrieval was retried".
- **Close condition:** sentence removed or neutralized in the next revision.

### N-C1 — PR #182's body does not record its own CI run

- **Severity:** `NICE-TO-HAVE`
- **Target:** head C `973ae5d2…`; PR #182 body "Validation" (mutable, read 2026-09-06) and self-review "Maintenance validation" ("Hosted CI for the separate maintenance PR is recorded in that PR rather than inferred from this run")
- **Observation:** the self-review defers to the PR body, and the PR body records only the numerical head's run 34029504271; run 34029753034 for head C completed `success` after the body was written and is not recorded anywhere.
- **Failure path:** a reader following the self-review's pointer finds no CI record for head C.
- **Minimal fix:** add run 34029753034 and its head SHA to the PR body.
- **Close condition:** PR body names the run; no repository change needed.

## 13. Exact limits of this review

- `SOURCE_ACCESS_INCOMPLETE` on heads A and B is a statement about this environment's access, not a defect finding; Section 5.4 lists the exact residual work. Nothing in this record confirms or denies what P1, P2, P3, the Williams record, or the four upstream pages say.
- No finding changes the research dispositions: the semantic programme and the numerical programme remain `INPUT_INCOMPLETE` as their results state, and this review closes no source hold, semantic dependency, or numerical certificate.
- The independent oracle establishes that head B's enclosure encloses the true tail at every tested point and that its diagnostic rejects every tested wrong value; it does not establish a portable binary64 projection certificate, a series remainder proof, a support domain, or a tolerance, and head B claims none of these.
- Validation shows repository hygiene only.
- Independence is not machine-checkable; the boundary in Section 2 is the reviewer's own statement.
- PR and issue bodies are mutable; the hashes and readings here apply to the 2026-09-06 states recorded.
- This record does not approve merging PR #180, #181, or #182. Merge is a separate steward action.

## 14. Required next action

1. A reviewer with access to the six blocked hosts completes Section 5.4 against the same exact heads and records the outcome; until then heads A and B are not fully reviewed.
2. Fold N-A1 through N-A4 and N-B1, N-B2 into the next revisions of the two results (each revision requires a fresh exact-head review of the changed blob) and N-C1 into the PR #182 body.
3. Continue the programme as the results and the self-review already require: complete or narrow the semantic source holds S1–S6; bind a successor numerical result to the independently reviewed semantic handoff before any final numerical label; keep Release 3 reuse conditional on accepted, pinned inputs.
4. Merge of PR #179, #180, #181, or #182, if any, is a separate steward action and adopts nothing.

This file is the only change on its branch, created from
`58675e66dbf263c94688d47867c731ad4efddbf6`. It modifies none of the reviewed heads,
PR #179's files, any authoritative artifact, or either issue.
