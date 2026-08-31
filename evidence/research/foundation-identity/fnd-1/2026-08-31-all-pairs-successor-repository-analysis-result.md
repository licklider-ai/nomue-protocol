# FND-1 All-Pairs Successor Repository-Analysis Result

**Status: informative repository-analysis result; non-normative; not
adopted.** This is the completed Pass B output of
[`2026-08-31-all-pairs-successor-source-closure-commission.md`](2026-08-31-all-pairs-successor-source-closure-commission.md).
It analyzes only the repository's public statements and attribution boundaries
for the retained all-pairs and unequal-size successor-source requirement. It
selects no all-pairs procedure, defines no method identifier, authorizes no
implementation, closes no part of the FND-1 Research Gate, and affects no
release. By the commission, this result by itself changes nothing about the
existing narrowed `FND1-H03` disposition.

## 1. Identity, input, access, and independence checks

| Field                                   | Value                                                                                                                      |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Role                                    | independent repository and attribution analyst (Pass B)                                                                    |
| Analysis date (local, Asia/Tokyo)       | 2026-09-01                                                                                                                 |
| Commission commit SHA                   | `34b5362338de035e2891f1525b63d7b69157a22b`                                                                                 |
| Commission path                         | `evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-source-closure-commission.md`                  |
| Inputs read in full                     | the commission and the three Section 2 baseline records only                                                               |
| Assigned output                         | this file, replacing its placeholder only                                                                                  |
| Branch                                  | `review/fnd-1-all-pairs-successor-analysis-20260901`, created from the commission commit                                   |
| Environment                             | fresh session; clean checkout of the commission commit; Node v22.22.2, pnpm 11.7.0, Linux x86_64                           |
| Permitted claim statuses                | `VERIFIED_DIRECT` (repository objects only), `NOT_VERIFIABLE`, `CONTRADICTED`; no external text was inspected in this pass |
| Permitted pass dispositions             | `ADVANCE`, `NARROW`, `DEFER`, `NO_GO`                                                                                      |
| Permitted successor-source dispositions | `CLOSE`, `NARROW_AND_CLOSE`, `KEEP_OPEN`                                                                                   |

Preflight and independence results:

| Check                                                                              | Outcome                                               |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Commission present, read in full, executed literally                               | yes                                                   |
| Three baseline records present and read in full                                    | yes                                                   |
| Assigned placeholder present at the commission commit                              | yes (blob `5588bbaa71a2dcbc6160850a47fe0d20b270ba12`) |
| Fixed inputs missing or ambiguous (`INPUT_INCOMPLETE` gate)                        | no; the gate is not triggered                         |
| Pass A result file opened                                                          | no; recorded as a path-level search match only        |
| Release 2 paths, paired-t material, or t-family numerical-contract material opened | no; recorded as path-level search matches only        |
| Future reconciliation, unrelated review branches, or private repositories read     | no; none opened, no other branch checked out          |
| External network or external primary texts accessed                                | no; all external-text claims are `NOT_VERIFIABLE`     |
| Repository-wide search limited to the Section 3.2 terms                            | yes; exact patterns recorded in Section 3             |
| Verbatim quotation used                                                            | none; zero quoted words from any source               |
| Working tree at analysis start                                                     | clean; every inspected file matches its `HEAD` blob   |

Excluded paths never opened and never used as evidence: the Pass A result
placeholder path named by the commission; `governance/drafts/release-2-candidate/**`;
the two Release 2 draft documents and the paired-t design draft under
`governance/drafts/`; `review-inputs/r2-*/**`; Release 2 workflow files;
paired-t and Release 2 spike and test sources under `tooling/`.

## 2. Pass disposition

**`DEFER`.**

All six Pass B repository tasks (commission Section 9) completed. The
repository record at the commission commit is internally consistent, and the
`FND1-H03` narrowed closure is proved unchanged and bounded (Section 5.2).
However, the retained successor-source requirement cannot be closed, narrowed,
or rejected from Pass B's inputs: no in-scope repository artifact identifies,
inspects, or pins either successor primary text, and this pass inspected no
external text. Under the commission's access rule, the requirement therefore
stays with the primary-source pass, and the correct Pass B disposition is
`DEFER` with successor-source disposition `KEEP_OPEN` (Section 10).

## 3. Source-discovery and source-identity record

### 3.1 Search scope and terms

Repository-wide text search covered every tracked file at commit
`34b5362338de035e2891f1525b63d7b69157a22b`, with matches inside the excluded
paths listed in Section 1 recorded at path level only. Case-insensitive
patterns, chosen to cover the Section 3.2 term list with inflected forms:

1. `tukey`
2. `studentized[- ]range`
3. `\bHSD\b`
4. `all[- ]pairs`
5. `kramer`
6. `unequal` (broadened from "unequal sample size")
7. `balanc` (broadened from "balance"; covers balanced and imbalance)
8. `family[- ]?wise` (covers hyphenated, solid, and spaced forms)

Match totals across the tree: `tukey` 81 in 11 files; `studentized[- ]range`
20 in 5; `\bHSD\b` 5 in 2; `all[- ]pairs` 84 in 18; `kramer` 13 in 4;
`unequal` 93 in 39; `balanc` 52 in 17; `family[- ]?wise` 40 in 7. Six matched
files lie in excluded paths (the Pass A placeholder, two Release 2 review
inputs, two Release 2 draft files, one paired-t test source); their contents
were not opened. Every remaining matched statement is enumerated and
classified in Section 5.1.

### 3.2 Source-identity findings

For the five identities the commission Section 5 requires the investigation to
resolve, the repository record in scope establishes the following:

1. **Balanced all-pairs Studentized-range procedure.** No in-scope repository
   artifact identifies a title, author, year, publication status, venue,
   archival location, or stable identifier for this work. It appears only as
   an eponym-level description ("the later Studentized-range all-pairs
   procedure") inside the baseline records and commissions. Identity:
   `NOT_VERIFIABLE` from repository contents.
2. **Unequal-sample-size extension.** Same finding. The name Kramer occurs in
   exactly four in-scope files (the two 2026-08-30 multiplicity commissions,
   the accepted primary-text closure result, and the current commission), in
   every case only inside the compound label "Tukey-Kramer" or as the
   commission's own eponym, never with a bibliographic identification.
   Identity: `NOT_VERIFIABLE` from repository contents.
3. **Test versus simultaneous-confidence character** of either successor
   procedure: no in-scope artifact asserts it. `NOT_VERIFIABLE`.
4. **Whether the label "Tukey HSD" names every variant accurately**: the label
   HSD occurs in scope only in one superseded first-round research intake
   (Section 5.1, S-13 to S-15) and in the commission itself. No accepted
   record equates it with any inspected text. `NOT_VERIFIABLE`.
5. **Which later sources the modern implemented procedure requires**: no
   in-scope artifact says. `NOT_VERIFIABLE`.

The only repository-sourced identity fact in scope is negative and already
accepted: Tukey (1949), Biometrics 5(2), 99-114, as registered and inspected
by the accepted primary-text closure, does not contain either successor
procedure (Section 8).

**Absence finding (commission Section 7 requirement).** Scope searched: all
tracked files at commit `34b5362…` except the excluded paths in Section 1;
terms: the eight patterns in Section 3.1. Result: no statement anywhere in
scope names, dates, cites, or pins a successor primary text, and no statement
on a normative or public-contract surface (`spec/`, `schemas/`, `registries/`,
`canonicalization/`, `conformance/`, `reference/`, `bindings/`) mentions the
all-pairs family, the Studentized range, HSD, or either eponym at all. All
topic matches sit in informative research evidence under
`evidence/research/foundation-identity/**`, its bookkeeping notes in
`authority/authority-manifest.yaml`, and the generated authority index.

## 4. Version-fixed primary-source register

No external text was inspected in this pass, so the register contains
repository objects only, all fixed at commit
`34b5362338de035e2891f1525b63d7b69157a22b` (parent
`48b2b5802b674c34883f86d9144efdf12e32c9ac`). Two first-round artifacts carry
legacy filenames embedding non-neutral tool names; consistent with the
repository's neutral-naming rule for public text, this report addresses them
by role and git blob identity, which resolves each file uniquely at the
commission commit.

| Register ID | Repository object                                                   | Path or address                                                                | Blob SHA at the commission commit          | Use in this pass                          |
| ----------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------ | ----------------------------------------- |
| REG-01      | Successor source-closure commission                                 | `…/fnd-1/2026-08-31-all-pairs-successor-source-closure-commission.md`          | `14b3769f7315e04859e1746d448d3b57547d4237` | full input                                |
| REG-02      | Accepted primary-text closure result (baseline)                     | `…/fnd-1/2026-08-30-multiplicity-primary-text-closure-result.md`               | `55d81187aa297697badb3266a87584f32c732871` | full input; controlling `FND1-H03` record |
| REG-03      | Accepted close-review result (baseline)                             | `…/fnd-1/2026-08-30-multiplicity-close-review-result.md`                       | `b3f06eb85d7cf8588a8fc4087dbefcee6d57a572` | full input                                |
| REG-04      | Multiplicity steward disposition (baseline)                         | `…/fnd-1/2026-08-31-multiplicity-steward-disposition.md`                       | `5e8a69ba571637408c79e1c46d9167f679b57c38` | full input                                |
| REG-05      | Assigned placeholder replaced by this report                        | `…/fnd-1/2026-08-31-all-pairs-successor-repository-analysis-result.md`         | `5588bbaa71a2dcbc6160850a47fe0d20b270ba12` | replaced only                             |
| REG-06      | FND-1 package README                                                | `…/fnd-1/README.md`                                                            | `9db239a73554a2c03e05a3de2659b5c94ff19c77` | search-located statements                 |
| REG-07      | Foundation-identity README                                          | `evidence/research/foundation-identity/README.md`                              | `71b0c3b46d3e7b6117800e565023d0b56c8db0d1` | search-located statements                 |
| REG-08      | Counterexample corpus v1                                            | `evidence/research/foundation-identity/2026-08-30-counterexample-corpus-v1.md` | `6ae2689195a0c81d849da04fb540dad72b880a02` | search-located statement                  |
| REG-09      | Authority manifest                                                  | `authority/authority-manifest.yaml`                                            | `d72ff5744bca982789228718d3ac29e57197694f` | search-located notes                      |
| REG-10      | Generated authority index                                           | `generated/AUTHORITY-INDEX.md`                                                 | `6ffbc762cbaec7161e757e7545cf0d31cad87201` | consistency check only                    |
| REG-11      | First-round external-pass commission (legacy tool-named filename)   | role + blob address                                                            | `f022cd66043320ffe00fe0e1703f4ff157949eca` | search-located statements                 |
| REG-12      | First-round external-pass intake (legacy tool-named filename)       | role + blob address                                                            | `56a2842982ae9a325bd1c2fcf5890c84d894dadb` | search-located statements                 |
| REG-13      | First-round repository-analysis result (legacy tool-named filename) | role + blob address                                                            | `9e06320d79fa9f95f5afca5d8b78a33ae318473b` | search-located statements                 |
| REG-14      | Reconciled FND-1 research result                                    | `…/fnd-1/2026-08-30-independent-research-result.md`                            | `dca6118720f8991dbdb0bd12b7528d0f18783f58` | search-located statements                 |
| REG-15      | Multiplicity primary-text closure commission                        | `…/fnd-1/2026-08-30-multiplicity-primary-text-closure-commission.md`           | `a1384636f2efe640e7648d65df639e18cce11d69` | search-located statements                 |
| REG-16      | Multiplicity close-review commission                                | `…/fnd-1/2026-08-30-multiplicity-close-review-commission.md`                   | `348f2823d8ac0099e062901f6435f9d2dfb0eb9e` | search-located statements                 |

Commit-level anchors verified as git objects in this checkout: `e674bacc…`,
`bf35ef43…`, `a09a5aa4…`, `fb437c88…`, and `7ee7bdfe…` all exist and are
ancestors of the commission commit; `a09a5aa4…` is a recorded parent of
`fb437c88…`, matching the steward disposition's intake statement.

External bibliographic identities (the two successor texts) are recorded as
`NOT_VERIFIABLE` in this pass and are deliberately not filled in from memory
or secondary recollection, per the commission's rule that a modern eponym must
not be assumed to identify one original text.

## 5. Atomic claim-evidence ledger

### 5.1 Enumerated public statements and classifications

Every relevant in-scope statement located by the Section 3.1 searches, with
one classification each from the commission's Section 9.2 set: accurate, too
broad, historically misattributed, unsupported, or pending research statement.
Pinpoints are line numbers in the registered blob.

Current layer (governing statements at the commission commit):

| #    | Statement (paraphrased)                                                                                                                                                 | Location              | Classification                                                                             |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| S-01 | The steward disposition closed `FND1-H01` through `FND1-H03` in narrowed form; `FND1-H04` through `FND1-H08` and the all-pairs successor-source requirement remain open | REG-06, lines 12-16   | accurate                                                                                   |
| S-02 | An active two-pass follow-up exists for the all-pairs and unequal-size successor sources; passes stay blind until frozen; placeholders create no closure                | REG-06, lines 18-29   | accurate; pending research statement                                                       |
| S-03 | The FND-1 package's primary-source list includes Holm (1979), Benjamini-Hochberg (1995), Dunnett (1955), and Tukey (1949)                                               | REG-06, lines 236-240 | accurate                                                                                   |
| S-04 | The foundation-identity overview lists the all-pairs successor commission with its open boundary, the retained all-pairs and unequal-size source requirement            | REG-07, lines 35-41   | accurate; pending research statement                                                       |
| S-05 | Manifest note: the successor commission is informative, bounded, two-pass, with no Protocol-adoption authority                                                          | REG-09, lines 618-622 | accurate                                                                                   |
| S-06 | Manifest notes: both successor result files are pending placeholders with no findings or decisions                                                                      | REG-09, lines 623-632 | accurate; pending research statement (this file's note now awaits steward update at merge) |
| S-07 | Generated authority index classifies the commission and both result paths as informative                                                                                | REG-10, lines 187-189 | accurate; consistent with REG-09                                                           |
| S-08 | Corpus case `FND1-09` contrasts a many-to-one member set with the all-pairs member set under FWER control, as an abstract identity question with no source attribution  | REG-08, line 93       | accurate                                                                                   |
| S-09 | The replaced placeholder recorded a pending analysis with no findings                                                                                                   | REG-05, whole file    | pending research statement; superseded by this report                                      |

Baseline records (Pass B inputs; enumerated because they carry topic matches):

| #    | Statement (paraphrased)                                                                                                                                                         | Location                             | Classification |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------------- |
| S-10 | Tukey (1949) does not contain the later Studentized-range all-pairs procedure, does not contain the unequal-size extension, and establishes no exact all-pairs protected family | REG-02, ledger rows T10-T12          | accurate       |
| S-11 | The all-pairs half of the `FND1-H03` downstream question is retained as a successor evidence requirement against the correct later primary sources                              | REG-02, Sections 2, 6.4, 7, 9        | accurate       |
| S-12 | The close review verified the closure result against C-01 through C-12 with no findings, including the original-method versus later-variant separation check                    | REG-03, Sections 1-2                 | accurate       |
| S-13 | The steward accepted the narrowed closure, preserved the successor requirement, and recorded that no method label may silently combine later variants with the inspected papers | REG-04, `FND1-H03` section and holds | accurate       |

Historical first-round research layer (2026-08-30, superseded records
preserved as immutable evidence):

| #    | Statement (paraphrased)                                                                                                                                                                        | Location                                   | Classification                                                                                                                        |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| S-14 | Source-register row describing Tukey (1949) as the all-pairs comparison family and the Studentized-range foundation for HSD, cited as the origin of the all-pairs family                       | REG-12, line 94                            | historically misattributed; bounded in place by its own not-verifiable marking, and contradicted by the later accepted closure (S-10) |
| S-15 | Claim row asserting that Tukey (1949) addresses the all-pairs family for equal sample sizes with an exact simultaneous confidence coefficient, as a medium-confidence cross-source inference   | REG-12, line 118                           | historically misattributed and too broad; the accepted closure contradicts both the attribution (T10) and the exactness (T7, T12)     |
| S-16 | Family-catalogue row instantiating the all-pairs family with Tukey (1949), HSD, and the Studentized range under an FWER guarantee                                                              | REG-12, line 197                           | historically misattributed; same basis as S-14 and S-15                                                                               |
| S-17 | Claim row attributing the many-to-one family with joint multivariate-t construction to Dunnett (1955)                                                                                          | REG-12, line 117                           | accurate; later confirmed by the accepted closure at full-text level                                                                  |
| S-18 | Statements that family membership and error criterion are meaning-bearing and not interchangeable                                                                                              | REG-12, lines 116, 127                     | accurate                                                                                                                              |
| S-19 | Boundary statements: secondary sources are discovery-only and never decision-bearing; full inspection of the 1955 and 1949 texts remains an open hold                                          | REG-12, lines 79, 257                      | accurate; pending research statement at its date, since discharged for the 1949/1955 texts by the accepted closure                    |
| S-20 | Reconciliation rows holding every Dunnett/Tukey formal-guarantee and attribution claim `NOT_VERIFIABLE`, with secondary corroboration downgraded to context                                    | REG-14, lines 53-58, 92-96, 116, 131       | accurate; this layer bounded S-14 through S-16 before the primary-text closure existed                                                |
| S-21 | Reconciliation statements that omnibus, all-pairs, many-to-one, planned-contrast, and gatekeeping structures differ by member set, claim structure, or procedure, with no default selected     | REG-14, lines 189-194, 259                 | accurate                                                                                                                              |
| S-22 | First-round repository-analysis statements: every external semantic claim `NOT_VERIFIABLE` in that pass; named procedures pin identity and version only, with nothing about internal semantics | REG-13, lines 85-91, 202-205, 536-548, 630 | accurate                                                                                                                              |
| S-23 | Multiplicity closure commission: bibliographic identification of Tukey (1949) and the requirement to separate the original method from later Tukey-Kramer and other variants                   | REG-15, lines 22-25, 71-86                 | accurate                                                                                                                              |
| S-24 | Close-review commission checks C-07 and C-08 requiring balance-condition separation and original-versus-later-variant separation                                                               | REG-16, lines 42-46                        | accurate                                                                                                                              |
| S-25 | First-round external-pass commission lists Tukey (1949) among the required minimum source basis and requires family comparison without selecting a default                                     | REG-11, lines 55-61, 88-94                 | accurate                                                                                                                              |

Design-vocabulary matches outside the successor topic:

| #    | Statement group (paraphrased)                                                                                                                                                                                            | Location                                                                                                                                                                                                                                                                                                     | Classification                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| S-26 | Balanced, unequal-group-size, and unequal-variance vocabulary of the supported independent two-group scope: fixture purposes, oracle corpus case classes, standardized-effect-size deferral rationale, and profile prose | `conformance/manifest.yaml` 644-646, 674-676, 1010-1012; `spec/profiles/independent-two-group-continuous/effect-estimate.md` 38-40; `spec/profiles/README.md` 134-136; `governance/decisions/ADR-0012-…` 23-25; oracle and fixture sources under `tooling/` and `evidence/development/**` (case labels only) | accurate within their own scope; not successor-relevant |
| S-27 | Six matched files inside excluded paths (Pass A placeholder, two Release 2 review inputs, two Release 2 drafts, one paired-t test source)                                                                                | path-level record only                                                                                                                                                                                                                                                                                       | not opened; not classified; not evidence                |

No in-scope statement was classified unsupported: every located claim either
carries its own evidence discipline, is corrected by a later accepted layer, or
is a pending research statement by design.

### 5.2 Integrity proof for the completed `FND1-H03` record

Task 9.3 result, `VERIFIED_DIRECT` from git objects in this checkout:

| #    | Claim                                                                                                                                                                                                                                            | Evidence                                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| I-01 | The accepted primary-text closure result is byte-identical between its recorded result commit and the commission commit                                                                                                                          | blob `55d81187…` at both `bf35ef43…` and `34b5362…`                                                                                                |
| I-02 | The accepted close-review result is byte-identical across its result commit, its intake commit, and the commission commit                                                                                                                        | blob `b3f06eb8…` at `a09a5aa4…`, `fb437c88…`, and `34b5362…`                                                                                       |
| I-03 | The steward disposition is byte-identical between its introducing commit and the commission commit                                                                                                                                               | blob `5e8a69ba…` at `7ee7bdfe…` and `34b5362…`                                                                                                     |
| I-04 | The recorded history is intact: all five anchor commits are ancestors of the commission commit, and the intake commit retains the review commit as a parent                                                                                      | `git merge-base --is-ancestor` for `e674bacc…`, `bf35ef43…`, `a09a5aa4…`, `fb437c88…`, `7ee7bdfe…`; parent set of `fb437c88…` includes `a09a5aa4…` |
| I-05 | The record remains bounded: every current-layer statement about `FND1-H03` (S-01 through S-08) restates the narrowed closure with the successor requirement open, and no statement on any normative or public-contract surface touches the topic | Sections 3.2 and 5.1                                                                                                                               |

The completed `FND1-H03` record is therefore unchanged and bounded at the
commission commit.

## 6. Chronology and variant-separation table

Chronology as establishable from in-scope repository records alone:

| Order | Item                                                                          | Repository-sourced identity                                                                         | Variant-separation status                                                                     |
| ----- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1     | Tukey (1949), Biometrics 5(2), 99-114                                         | fully identified and full-text inspected by the accepted closure, with an artifact SHA-256 recorded | separated: three-stage gap, straggler, upper-tail F procedure; not the successor procedure    |
| 2     | Balanced all-pairs Studentized-range procedure commonly associated with Tukey | not identified in any in-scope artifact                                                             | must remain separate from item 1; `NOT_VERIFIABLE` here                                       |
| 3     | Unequal-sample-size extension commonly associated with Kramer                 | not identified in any in-scope artifact                                                             | must remain separate from items 1 and 2; `NOT_VERIFIABLE` here                                |
| 4     | Heteroscedastic all-pairs procedures (for example the Games-Howell family)    | excluded by the commission except as a boundary                                                     | out of scope; no in-scope statement conflates them                                            |
| 5     | The modern label "Tukey HSD" as commonly implemented                          | not resolved by any in-scope artifact                                                               | which variant the label denotes is exactly commission question 5.4/5.5; `NOT_VERIFIABLE` here |

The relative order of items 2 and 3 after item 1 is asserted by the baseline
records only at eponym level ("later"); the actual dates belong to Pass A.

## 7. Required claim matrix

Rows cover every applicable claim of every source this pass inspected; the
inspected sources are repository records, so the matrix records what those
version-fixed records establish. Evidence status uses the commission's
Section 7 vocabulary.

| Source identity                                                                                               | Procedure object                                             | Member set                                                                  | Design                                                                                        | Variance model                            | Distributional assumption                                   | Guarantee                                                                                 | Sidedness                                              | Later-work boundary                                                                                                   | Evidence status                                                              |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Tukey (1949) as established by REG-02 (accepted closure, ledger rows T1-T14; artifact SHA-256 recorded there) | three-stage testing procedure (gap, straggler, upper-tail F) | ordered within-ANOVA treatment means grouped; not an exact all-pairs family | common, independently estimated standard error of the means; no stated equal-size requirement | common, estimated from another ANOVA line | normal-theory components per the closure record's pinpoints | conjectural composite error statement; no exact simultaneous claim                        | two-sided gap and straggler stages; upper-tail F stage | does not establish the Studentized-range all-pairs procedure, the unequal-size extension, or exact all-pairs coverage | direct (repository record); underlying text not reinspected in this pass     |
| Successor source 1: balanced all-pairs Studentized-range procedure                                            | unknown here (test, intervals, or both is commission Q5.3)   | expected all pairwise mean differences; unconfirmed                         | expected balanced; unconfirmed                                                                | unknown here                              | unknown here                                                | unknown here                                                                              | unknown here                                           | boundary against later refinements unresolvable until the text is identified                                          | not verifiable in this pass; no in-scope artifact identifies the text        |
| Successor source 2: unequal-sample-size extension                                                             | unknown here                                                 | expected all pairwise mean differences at unequal sizes; unconfirmed        | unequal group sizes; unconfirmed                                                              | unknown here                              | unknown here                                                | exact, conservative, approximate, or proposal-only is exactly commission Q6.5; unresolved | unknown here                                           | same as above                                                                                                         | not verifiable in this pass; no in-scope artifact identifies the text        |
| First-round intake attribution rows (REG-12, lines 94, 118, 197)                                              | all-pairs procedure attributed to the 1949 paper             | all pairwise comparisons                                                    | equal sample sizes                                                                            | not stated                                | not stated                                                  | exact simultaneous confidence claimed at eponym level                                     | not stated                                             | none drawn; that is the defect                                                                                        | contradicted by REG-02 (T7, T10, T12); superseded by REG-14 and the baseline |

Absence rows in this matrix (the two successor sources) rest on the search
scope and terms recorded in Section 3.1.

## 8. Comparison with the Tukey (1949) boundary

The completed original-paper pass fixed the boundary this commission orders
tested: the 1949 text contains a three-stage gap, straggler, and upper-tail F
procedure with a conjectural composite error statement, and does not contain
the Studentized-range all-pairs procedure or the unequal-size extension
(REG-02 rows T7, T10, T11, T12; REG-04 `FND1-H03` section).

Tested against every in-scope statement:

- Every current-layer statement (S-01 through S-09) states or presupposes the
  boundary correctly: the successor requirement is described as open, and no
  statement attributes either successor procedure to the 1949 paper.
- The three first-round intake rows (S-14 through S-16) predate the boundary
  and cross it: they attribute the all-pairs family, the Studentized-range
  basis, HSD, and an exact simultaneous guarantee to the 1949 paper at
  secondary-corroboration level. The repository's own layering bounds the
  defect: the intake itself marks the underlying source not verified, the
  reconciliation (S-20) holds every such claim `NOT_VERIFIABLE` with secondary
  corroboration downgraded to context, and the accepted closure then
  contradicts the attribution at full-text level. No later artifact repeats
  the misattribution.
- No in-scope statement attributes the unequal-size extension to the 1949
  paper, to Dunnett (1955), or to any identified text.

Conclusion: at the commission commit the Tukey (1949) boundary is intact in
the governing record, and the only crossings are inside superseded,
self-bounded historical evidence.

## 9. Overclaim and misattribution attacks

Attacks mounted against this pass's own conclusions:

| Attack                                                                                                                  | Assessment                                                                                                                                                                                                                                                                    | Outcome                                    |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| The repository already identifies the successor texts, so `KEEP_OPEN` is too weak                                       | contradicted by the Section 3.1/3.2 absence finding: no in-scope artifact carries any bibliographic identification; the Kramer name never appears outside the compound eponym                                                                                                 | attack fails                               |
| The first-round intake rows make the repository's public position misattributed today                                   | the intake is superseded, immutable evidence; the reconciliation and the accepted closure bound and contradict it; the governing layer nowhere repeats it (Section 8)                                                                                                         | attack fails                               |
| Pass B could close the requirement from the repository's descriptions of the successor procedures                       | those descriptions are eponym-level pending statements, not primary-text evidence; the commission's own baseline wording is a boundary to test, not permission to infer the later method from its modern name                                                                 | attack fails                               |
| The absence of successor identification makes the fixed inputs `INPUT_INCOMPLETE`                                       | contradicted by the commission: all fixed inputs exist and are unambiguous, and source inaccessibility is explicitly not `INPUT_INCOMPLETE`                                                                                                                                   | attack fails                               |
| Search coverage was insufficient to support the absence findings                                                        | the eight commissioned terms were broadened to inflected stems (`unequal`, `balanc`, solid `familywise`), run repository-wide at the fixed commit, and reconciled file-by-file in Section 5.1; residual risk remains only for statements using none of the commissioned terms | attack narrowed, recorded                  |
| The `FND1-H03` record could have drifted since acceptance                                                               | contradicted by blob-level identity across every recorded commit (Section 5.2)                                                                                                                                                                                                | attack fails                               |
| Classifying S-14 through S-16 as historically misattributed itself overclaims, since this pass never read the 1949 text | the classification rests on the accepted, close-reviewed, steward-ratified full-text closure record, which is the repository's controlling evidence for exactly this question; this pass adds no independent reading of the 1949 text                                         | attack fails, with the dependency recorded |
| Treating the modern HSD label as unresolved contradicts common usage                                                    | common usage is not an in-scope source, and the commission forbids assuming an eponym identifies one text; the label question stays with Pass A                                                                                                                               | attack fails                               |

Residual risk carried: a relevant statement phrased without any commissioned
term would escape Section 5.1; and the two successor-source matrix rows depend
entirely on Pass A for positive content.

## 10. Successor-source disposition

**`KEEP_OPEN`.**

### 10.1 Closure matrix for the retained successor requirement

Task 9.6 result:

| Requirement component                                                                        | Evidence present in the repository at the commission commit                                      | Evidence still needed                                         | Component disposition         |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ----------------------------- |
| Identity of the balanced all-pairs Studentized-range primary text                            | none (Section 3.2)                                                                               | Pass A full-text identification and inspection with pinpoints | `KEEP_OPEN`                   |
| Identity of the unequal-sample-size extension primary text                                   | none (Section 3.2)                                                                               | Pass A full-text identification and inspection with pinpoints | `KEEP_OPEN`                   |
| Test versus simultaneous-confidence character of each procedure                              | none                                                                                             | Pass A, from the identified texts                             | `KEEP_OPEN`                   |
| Guarantee type of the unequal-size construction (exact, conservative, approximate, proposal) | none                                                                                             | Pass A, from the identified texts                             | `KEEP_OPEN`                   |
| Accuracy of the label "Tukey HSD" across variants                                            | none beyond the negative 1949 boundary                                                           | Pass A variant separation                                     | `KEEP_OPEN`                   |
| Negative boundary: the 1949 paper contains neither successor procedure                       | closed by the accepted narrowed `FND1-H03` record; proved unchanged here (Section 5.2)           | none                                                          | already closed; intact        |
| Repository representation stays bounded while the requirement is open                        | established by this pass: no normative-surface statement, no live misattribution (Sections 3, 8) | re-verification at reconciliation time                        | supported; not itself closure |

No component can move to `CLOSE` or `NARROW_AND_CLOSE` on repository evidence,
so the requirement as a whole stays `KEEP_OPEN`, and the pass disposition is
`DEFER`.

### 10.2 Family-identity evidence versus numerical-implementation evidence

Task 9.5 result. Closing the retained requirement needs family-identity
evidence only:

- the exact primary text of each successor procedure, with printed pinpoints;
- the exact comparison family covered and its member set;
- the stated assumptions (independence, normality, common variance, balance,
  variance estimation);
- the proved or claimed simultaneous confidence or family-wise statement and
  its conditions, including sidedness and the role of Studentized-range
  constants at the construction level; and
- the separation of each inspected text from later corrections, refinements,
  and renamed variants.

Not needed for closure, and excluded by the commission: critical-value
tabulation, quantile algorithms, approximation tolerances, software behavior,
and any comparison arm or implementation work. The design-vocabulary matches
in S-26 illustrate the difference: they are implementation-scope statements of
the supported two-group capability and carry no weight for family identity.
Conversely, closing the successor requirement would still authorize no
numerical-implementation work; that separation is already how the baseline
records bound `FND1-H03`.

### 10.3 Smallest future repair

Task 9.4 result. No repair is required for the correctness of the current
layer: the governing record nowhere repeats the first-round misattribution,
and the historical artifacts are bounded by their own markings and by the
accepted closure. If the steward nevertheless wants a hardening repair, the
smallest one is a bookkeeping-note update only: extend the authority-manifest
note for the first-round intake (REG-09, lines 557-561) with one clause
recording that the intake's 1949 all-pairs attribution rows were later
contradicted by the accepted primary-text closure. That repair touches no
immutable evidence file, no normative surface, and no generated file except
by regeneration. Per the commission, it is identified here and not made.

## 11. Residual holds and exact next sources

1. The retained successor-source requirement stays open in full (Section
   10.1). The exact next sources are: the primary text of the balanced
   all-pairs Studentized-range procedure and the primary text of the
   unequal-sample-size extension, both to be identified, version-fixed, and
   full-text inspected by Pass A; if either original proves unpublished,
   incomplete, or unavailable, the commission's fallback applies, and a later
   primary or authoritative formal source supporting a narrower claim is the
   next-best evidence, recorded as such rather than silently upgraded.
2. Reconciliation of this result with the frozen Pass A result is the
   steward's next step; nothing in this pass pre-empts it.
3. `FND1-H04` through `FND1-H08` remain held; this pass makes no findings on
   them.
4. The optional hardening repair of Section 10.3 remains available to the
   steward and is not performed.
5. The residual search risk of Section 9 (statements using none of the
   commissioned terms) can be retired only by future passes with different
   term sets.

## 12. Public-artifact and sanitization self-check

- [x] Only the commission and the three Section 2 baseline records were read
      in full; every other repository fact used came from git-object metadata
      or from statements located by the permitted Section 3.2 searches.
- [x] The Pass A result file was never opened; it appears in this report only
      as a path-level match count.
- [x] No Release 2, paired-t, or t-family numerical-contract material was
      opened; matches in those paths are recorded at path level only and carry
      no evidentiary weight.
- [x] No future reconciliation, unrelated review branch, or private
      repository was read; no branch other than the commission commit's
      content was checked out.
- [x] No external network access was used; no external primary text was
      inspected; every external-content claim is marked `NOT_VERIFIABLE` and
      no secondary account was upgraded.
- [x] Zero verbatim quotation from any source appears in this report, which
      satisfies the per-source quotation limit trivially.
- [x] The twelve required result sections appear in the commission's order,
      and the six Section 9 repository tasks are discharged in Sections 5.1
      (enumeration and classification), 5.2 (integrity proof), 10.3 (smallest
      repair, not made), 10.2 (evidence-type separation), and 10.1 (closure
      matrix).
- [x] Exactly one pass disposition (`DEFER`) and one successor-source
      disposition (`KEEP_OPEN`) are selected.
- [x] Absence findings record the complete scope searched and the exact terms
      used (Sections 3.1, 3.2, 7).
- [x] All names and attributions in this report are neutral and role-based;
      no drafting, review, or analysis software, service, provider, model, or
      mechanism is identified or implied, no human authorship is claimed, and
      legacy tool-bearing filenames are addressed by role and blob identity
      instead of being repeated.
- [x] No Protocol method, default, identifier, schema, field, refusal code,
      public check, API, implementation, or release change is selected,
      proposed, or recommended; no all-pairs procedure is chosen; no method
      identifier is defined.
- [x] Only the assigned file is replaced; no other path is modified, and the
      commissioned formatting, lint, and validation commands were run on the
      replacement.

FND-1 ALL-PAIRS SUCCESSOR REPOSITORY-ANALYSIS PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION
