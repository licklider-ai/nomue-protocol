# Release 3 Multi-Group Semantic Research Result — Independent Review Result

**Status: informative independent review result; non-normative; not adopted.**
This record reviews one exact commit of the Release 3 semantic research result
against its commission. It selects no Contract, procedure, identifier, schema,
Public Check, tolerance, support domain, RFC decision, or release outcome, and it
does not merge anything. Attribution is role-based only.

**Verdict: `GO`** (Section 11), with zero `BLOCKER`, six `SHOULD-FIX`, and five
`NICE-TO-HAVE` findings (Section 10).

## 1. Review identity

| Field                 | Value                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                     |
| Reviewed pull request | #167                                                                                                                       |
| Reviewed exact head   | `03dce3ecc85dac58b00b4d57936c3c8ac031b5cc`                                                                                 |
| Sole parent / base    | `3137b9043846865cf3d01c848757b97a1c2ef4f0` (`main` at review start and at review end)                                      |
| Head tree             | `9d9ad0780d39b39b47184a2caf704b2f828fab4e`                                                                                 |
| Base tree             | `c4e74fbf3f2419b3e5c38c81b68a4347dc9b3ef5`                                                                                 |
| Changed path          | `governance/drafts/release-3-preparation/semantic-research-result.md` (1 path, +899/−0)                                    |
| Result blob           | `e21df31a5fc229c5f134fc7de5bb731d76bb3d0c`                                                                                 |
| Commission path       | `governance/drafts/release-3-preparation/semantic-research-commission.md`                                                  |
| Commission blob       | `c6760efc8450efe5fe2da6ccce2b2fac4846c066` (identical at base and head)                                                    |
| Review date           | 2026-09-03                                                                                                                 |
| Reviewer role         | independent reviewer; did not author the Release 3 scope proposal, the semantic research commission, or the PR #167 result |
| Review branch         | `review/r3-independent-multigroup-semantics-03dce3e`, created from the reviewed head as sole parent                        |
| Review posture        | falsification-oriented acceptance review; the purpose was to break the result, not to support it                           |

Live PR state was read from the hosting service at review start and re-read at
review end: head `03dce3ec…`, base `3137b904…`, one commit, one changed file,
899 additions, `mergeable_state: clean`. The head did not move during the
review, so `HEAD_MOVED` does not apply.

## 2. Fixed-value and repository-identity verification

Every expected value was re-derived from Git objects in a fresh clone, not taken
from the PR text or the result text.

| Check                                                                                                                                        | Result                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `git cat-file -p 03dce3ec…` parent                                                                                                           | exactly one parent, `3137b904…`                                                          |
| `git cat-file -p 03dce3ec…` tree                                                                                                             | `9d9ad078…`                                                                              |
| `git diff --numstat 3137b904… 03dce3ec…`                                                                                                     | one path, `899 0`, the result file only                                                  |
| `git ls-tree 03dce3ec… <result path>`                                                                                                        | blob `e21df31a…`                                                                         |
| Commission blob at base and head                                                                                                             | `c6760efc…` at both; unchanged by the PR                                                 |
| Base tree recorded in result Section 1                                                                                                       | `c4e74fbf…` matches `git rev-parse 3137b904…^{tree}`                                     |
| All 19 repository-input blobs recorded in result Section 1                                                                                   | every blob re-resolved from `3137b904…` and matched exactly (19/19)                      |
| Authoritative artifacts, registries, schemas, conformance, reference code, generated views, `evidence/`, Release 2 material, commission text | no diff between base and head outside the single added file                              |
| CI run `33727366496`                                                                                                                         | `head_sha` = `03dce3ec…`, event `pull_request`, conclusion `success`, 5/5 jobs `success` |

## 3. Source identity and inspection-reuse verification

### 3.1 SRC-01 through SRC-08 (reused direct inspections)

Each bibliographic identity, artifact SHA-256, and printed-page pinpoint in the
result's Section 2.1 and Section 4 was compared against the frozen FND-1 records
at the pinned commit:

- `2026-08-30-multiplicity-primary-text-closure-result.md` (blob
  `55d81187…`): SRC-01 Holm (1979) `43a5a102…`, SRC-02 Benjamini and Hochberg
  (1995) `e56ee415…`, SRC-03 Dunnett (1955) `1f5dcf56…`, SRC-04 Tukey (1949)
  `e109637f…` — all four hashes, journals, volumes, issues, page ranges, and
  the commission-supplied-but-not-printed DOI caveats match.
- `2026-09-01-all-pairs-successor-source-supplied-completion-result.md` (blob
  `236cd949…`): SRC-05 Kramer (1956) `6640f49f…`, SRC-06 Hayter (1984)
  `755a1cd2…`, SRC-07 Spjøtvoll and Stoline (1973) `66fb02dd…`, SRC-08 Dunnett
  (1980) `8c5b9b7a…` — all four hashes and identities match.

The review/steward chain behind those records was verified as present at the
pinned commit: close-review result `2026-08-30-multiplicity-close-review-result.md`
(`GO`, C-01–C-12 pass, no findings) and steward disposition
`2026-08-31-multiplicity-steward-disposition.md` (`FND1-H01`–`H03`
`NARROW_AND_CLOSE`); close-review result
`2026-09-01-all-pairs-successor-source-reconciliation-close-review-result.md`
(`GO`, no blocker or should-fix) and steward disposition
`2026-09-01-all-pairs-successor-source-steward-disposition.md` (named subclaims
`NARROW_AND_CLOSE`; historical-attribution residual `KEEP_OPEN`). Both steward
dispositions state that the accepted findings are reusable research input within
the recorded paper, variant, theorem, assumption, attachment, and claim scopes.

Claim-by-claim pinpoint fidelity (result Section 4 and Section 19 against the
frozen atomic ledgers):

| Result claim | Frozen ledger basis                                         | Match                                                 |
| ------------ | ----------------------------------------------------------- | ----------------------------------------------------- |
| F-01, F-02   | B2, B3, B4, B5 (p. 291)                                     | exact                                                 |
| F-03         | L1, L2 (pp. 65–66), L4 (p. 67)                              | exact                                                 |
| F-04         | D1, D2 (pp. 1096, 1101), D18 `NOT_VERIFIABLE`               | exact; the duality caution is carried, not resolved   |
| F-05         | B11 (p. 296), B12 (p. 293)                                  | exact                                                 |
| F-06         | D1                                                          | exact                                                 |
| F-07         | Hayter (1.1) p. 61 (S1–S3 `VERIFIED_DIRECT_LATER`); T10–T12 | exact; attribution boundary carried as SR-E           |
| F-08         | L1, L3, B1, B6                                              | pages exact; second clause is inference (Finding N-3) |
| F-09         | Hayter Q5, pp. 69–70                                        | exact                                                 |
| F-10, F-11   | L5, L6 (pp. 67–68); L7 (p. 68); L8 (p. 69)                  | exact                                                 |
| F-12         | B7, B8, B9 (pp. 293, 299–300)                               | exact                                                 |
| F-13         | D3–D7, D8–D10 (pp. 1099, 1101–1105)                         | exact                                                 |
| F-14         | Hayter Theorem and Remark pp. 62–63, proof pp. 63–69        | exact                                                 |
| F-15         | S6, S7 (pp. 307–309)                                        | exact                                                 |
| F-16         | S&S pp. 975–976; width comparison flagged cross-source      | exact, flag preserved                                 |
| F-17         | Dunnett (1980) Q2–Q3 (pp. 790–795)                          | exact                                                 |
| F-18, F-19   | L3, L9, L10 (pp. 66–68); B6 (p. 293)                        | exact                                                 |
| F-20, F-22   | D15 (pp. 1101–1105); D7 (p. 1103), D11 (p. 1105)            | exact                                                 |
| F-21         | T3, T7, T10–T12 (pp. 99–105)                                | exact                                                 |
| F-23         | steward disposition "Evidence carried forward"              | exact                                                 |

No reused claim was extended to a later variant, a different paper, an
uninspected theorem, or a broader assumption set, with one labeling exception
recorded as Finding S-1 (PVL-01).

### 3.2 SRC-09 through SRC-36 (discovery-only)

Programmatic extraction confirms that no F-claim, no §19 row, and no unblocked
`R3-CAND` entry cites any of SRC-09 through SRC-36. Every catalogue entry whose
evidence is `SNIPPET` or `REPORT` and whose disposition is `R3-CAND` or
`RES-ONLY` carries the `†` hold mark. The exceptions are the five `TRANSFER`
entries (Findings S-2, N-1) and the two `REJECT` entries, which rest on inspected
SRC-08 simulation evidence (F-17).

### 3.3 Source-access boundary of this review

The eight inspected PDFs are not repository contents and were not available in
this review environment; the review therefore tested reuse fidelity against the
frozen, hash-pinned, independently close-reviewed, steward-accepted records, not
against the PDFs. Attempts to resolve the DOI metadata of three snippet-level
sources (SRC-16, SRC-21, SRC-22) through a public metadata service were denied by
this environment's egress policy, which corroborates the result's Section 2.2
access record. This is recorded as `SOURCE_SPOT_CHECK_NOT_AVAILABLE`; it is not
`INPUT_INCOMPLETE`, because the review's central question — whether the reused
inspections are cited within their recorded scopes and whether unsupported
material was promoted — is decidable from the repository objects.

## 4. Stop-condition and `NARROW` compatibility ruling

The commission's stop rule reads: return `INPUT_INCOMPLETE` without a semantic
disposition if a fixed repository input cannot be identified, required primary
texts cannot be inspected, or source identity is ambiguous; return `DEFER` or
`NO_GO` rather than filling a material gap with a software convention.

1. **Are the 28 uninspected sources "required primary texts"?** Not in the sense
   the stop rule uses. The commission names no external text as mandatory
   reading; its only fixed inputs are repository inputs (all 19 identified and
   blob-verified). What it requires is that every decision-bearing claim be
   grounded in an inspected primary source or authoritative guidance (inventory
   rule 4) and that access failures be recorded (inventory rule 1). A text is
   therefore "required" when a claim the report actually makes depends on it.
   The 28 sources are required for the comprehensive answer
   (`PROGRAM_SCOPE_READY`), which the result explicitly declines; they are not
   required for any claim in Sections 4, 19, or 20.
2. **Is `NARROW` a stop-condition violation?** No. The three triggers do not
   fire: (a) every fixed input was identified; (b) the texts required for the
   claims made were inspected (Section 3.1); (c) source identity for those
   texts is hash-pinned and unambiguous. Snippet-level bibliographic identity of
   the uninspected sources is used only for discovery and hold naming.
3. **Why `INPUT_INCOMPLETE` does not fire, on the commission's own text.** The
   commission cannot intend "any inaccessible relevant text" to be a stop,
   because (i) it lists access failures as a normal recorded component of a
   completed search protocol; (ii) it provides `DEFER`/`NO_GO` for material
   evidence gaps, which would be unreachable if every gap were a stop; and
   (iii) it defines only `PROGRAM_SCOPE_READY` as needing a complete disposition
   ledger. `INPUT_INCOMPLETE` is the outcome when the report cannot be produced
   honestly at all. The repository's own precedent agrees: the access-limited
   all-pairs primary-source pass returned `DEFER`, not `INPUT_INCOMPLETE`, and
   the `governance/RFC.md` research gate says insufficient evidence leads to a
   deferred or narrowed claim.
4. **Does reuse of frozen inspections satisfy "directly inspected primary
   sources"?** Yes, within scope. The commission makes the FND-1 steward
   dispositions fixed inputs, the Release 3 preparation record instructs the
   lane to use the bounded FND-1 findings as inputs, `governance/RFC.md` permits
   reuse of a prior investigation to the extent its scope still covers the
   decision, and both steward dispositions state the findings are reusable
   research input within recorded scopes. The inspections were themselves
   independently close-reviewed and hash-verified by the steward. The result
   records that it performed no re-inspection and carries the original
   pinpoints, hashes, and access dates. Reuse is therefore legitimate; what
   it cannot do is add any claim not literally present in the frozen ledgers,
   which is the test applied in Section 3.1.
5. **Reuse boundary.** The result stays inside paper, variant, theorem,
   assumption, attachment, and claim scopes for 22 of 23 F-claims and for six of
   the seven unblocked candidates. The one boundary-adjacent item is PVL-01,
   where a valid inference from ledger rows is labeled as partial direct
   evidence (Finding S-1). It does not change the disposition.

Ruling: `NARROW` is commission-valid at this head, because (a) it selects
neither `PROGRAM_SCOPE_READY` nor a full ledger; (b) every uninspected entry is
blocked by a named hold and marked DEFER-equivalent; (c) no gap is filled with a
software convention, library default, snippet, or investigator memory; and (d)
the source-established core (taxonomy F-01–F-05, and candidates PVL-03, PVL-04,
APR-01, APR-02, MTO-01, FDR-01 under an explicit independence declaration) rests
on steward-accepted inspections within scope.

## 5. Catalogue independent recount

A script extracted every `| XXX-NN |` row of result Sections 8.1–8.10 from the
blob `e21df31a…` and recomputed the totals without using the result's own
summary paragraph.

| Item                                              | Result claims | Independent recount                                                                   |
| ------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------- |
| Procedure/variant entries (§8.1–§8.8)             | 49            | 49; IDs unique; no gaps within OMN/PVL/CLS/APR/HET/MTO/MCB/FDR/RSM                    |
| Guidance entries (§8.9)                           | 2             | 2 (GUI-01, GUI-02); not counted in the 49                                             |
| Recorded exclusions (§8.10)                       | 5             | 5; not counted in the 49                                                              |
| `R3-CAND`                                         | 15            | 15                                                                                    |
| `R3-CAND` unblocked                               | 7             | 7 = {PVL-01, PVL-03, PVL-04, APR-01, APR-02, MTO-01, FDR-01}; identical set           |
| `R3-CAND` blocked                                 | 8             | 8 = {OMN-01, OMN-02, PVL-02, PVL-07, CLS-01, APR-09, HET-01, FDR-02}                  |
| `RES-ONLY`                                        | 27            | 27, counting CLS-04 by its declared primary label (Finding S-5)                       |
| `TRANSFER`                                        | 5             | 5 = {OMN-05, OMN-06, FDR-04, RSM-01, RSM-02}                                          |
| `REJECT`                                          | 2             | 2 = {APR-07, APR-08}                                                                  |
| Entries with `DIRECT` evidence                    | —             | 10 = {PVL-01, PVL-03, PVL-04, PVL-05, APR-01, APR-02, APR-03, APR-04, MTO-01, FDR-01} |
| Non-`DIRECT` entries that are unblocked `R3-CAND` | 0             | 0                                                                                     |
| Holds SR-A…SR-L declared in §17                   | 12            | 12; every hold-listed ID exists; every `†` entry is covered by a hold                 |
| SRC IDs referenced anywhere vs declared in §2     | 36            | 36 referenced, 36 declared, no dangling reference                                     |
| Commission seed procedures (16 named)             | all present   | all 16 mapped to an explicit entry (see below)                                        |

Seed mapping: Bonferroni PVL-01; Šidák PVL-02; Holm PVL-03; Holm-Šidák PVL-04;
Hochberg PVL-07; Hommel PVL-08; closed testing CLS-01; gatekeeping CLS-04/05;
Tukey APR-01; Tukey-Kramer APR-02; Dunnett MTO-01; Scheffé APR-09; Games-Howell
HET-01; Benjamini-Hochberg FDR-01; Benjamini-Yekutieli FDR-02; resampling
RSM-01/02.

Variant distinctness was checked against the frozen records: Holm Bonferroni
thresholds versus Holm product-form thresholds (both in SRC-01, L3 versus L7);
Kramer's range-test proposal versus the Tukey-Kramer interval procedure (S6–S9);
the two Dunnett 1980 JASA papers (SRC-08 pp. 789–795 versus pp. 796–800);
Kramer (1956) versus Kramer (1957); Hochberg step-up versus Hochberg GT2. No
same-name variants are silently merged, and the balanced procedure's historical
attribution is kept as attribution-only residual SR-E, matching the steward's
open residual.

Search reproducibility: 13 verbatim queries, a citation-chaining record split
into decision-grade (from inspected text) and discovery-grade (from snippets), an
inclusion boundary quoted from the commission, an exclusion list, a
deduplication key, a closure rule, and a reopen rule are all present. The
completeness claim is bounded to the recorded method and 2026-09-03, and the
freeze hash is stated to be the file's Git blob at the result commit, which
matches `e21df31a…`. Reproducibility limits are recorded as Finding S-4.

## 6. Evidence-hierarchy checks

- Web-search snippets, library defaults, software behavior, and investigator
  memory are not used as primary evidence anywhere in Sections 4, 7, 14, or 19;
  Section 5 (inference) and Section 6 (disagreement) label their status.
- D-02 and D-04 correctly record widely reported claims (heteroscedastic
  omnibus targets; multiple-range error control) as unverified rather than as
  fact.
- I-03 and D-03 correctly hold open whether shared-variance one-way p-values
  satisfy step-up dependence conditions, instead of asserting it.
- Access failures are assigned to holds SR-A through SR-L consistently; the
  hold table's blocked-item lists and the entry-level hold citations agree
  (one in-row omission, Finding N-1).
- Every §19 decision-bearing claim reaches an inspected artifact with a printed
  pinpoint (Section 3.1 above).

## 7. Counterexample verification

All 19 commissioned attacks are addressed in result Section 14. For each, the
review confirmed that a declaration (Section 11), a candidate refusal class
(Section 13), a project-choice boundary (Section 7), or a deferral is named, and
that no future Contract or Public Check is described as existing:

| Attack | Boundary named                                  | Independent check                                                                           |
| ------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1      | P-01 claim object; F-23, I-07                   | conflation, not routing, is the rejected act; consistent with F-23                          |
| 2, 4   | member-set semantics; P-03; I-05                | omnibus and follow-up kept as separate families; no "significant ANOVA authorizes post hoc" |
| 3      | no equality field; equivalence excluded (§8.10) | consistent                                                                                  |
| 5, 15  | refusal class 6; P-02; a-priori variance model  | observed variances never route; matches the preparation record's boundary exclusion         |
| 6      | selection-timing declaration + `FND1-H07`       | limit that value-level verification cannot detect timing is stated as permanent residual    |
| 7, 8   | refusal class 10; F-03/F-05, F-02               | weak/strong FWER and FWER/FDR are directional, never substituted                            |
| 9      | refusal class 11; F-18                          | adjusted p-values and intervals not mixed across families                                   |
| 10     | §12 ordered members, tie rule, thresholds, stop | I-06                                                                                        |
| 11     | refusal class 8; F-06, SRC-03 p. 1097           | many-to-one constants not reused for all-pairs                                              |
| 12     | refusal class 7; F-13, F-14, F-15               | balanced instruments not silently extended                                                  |
| 13     | refusal class 12; RSM lane transferred          | no stochastic result without randomness identity                                            |
| 14     | declaration-only independence                   | consistent with carried-forward FND findings                                                |
| 16     | refusal class 3; FND-2 holds untouched          | refuse-not-impute; no missingness semantics adopted                                         |
| 17     | refusal classes 1–2 + declared structure        | flattening limit honestly recorded as residual risk                                         |
| 18     | family identity is claim identity; `FND1-H05`   | relation vocabulary left open                                                               |
| 19     | facts / inference / project choice separation   | verified structurally: §4, §5, §7 are separate and §7 items are labeled                     |

`FND1-H05`, `FND1-H06`, `FND1-H07`, `FND1-H08` and FND-2 `HOLD-01`–`HOLD-05` are
cited in their recorded meanings and left open. Omnibus, pairwise, many-to-one,
all-pairs, planned contrasts, post-hoc, FWER, FDR, and simultaneous coverage are
never treated as substitutes. Release 2 reuse (Section 15) is limited to
architecture patterns and numerical inputs "subject to the numerical
commission's own lane"; the Welch two-group Contract is explicitly not
generalized to OMN-02. Release 4+ reuse (Section 16) is labeled evidence reuse,
not adoption.

## 8. Governance and non-promotion

- Unselected and unissued at this head: R3 Contract, procedure, default;
  identifier, schema, field; Public Check, reason/refusal code; tolerance,
  numerical implementation; support domain/runtime; RFC decision; Release 3
  outcome. Candidate field values in P-04 and Section 12 are labeled project
  choices or candidates, and no `NRS-*`, `contract`, or `check` identifier is
  minted.
- No change to authoritative artifacts, registries, schemas, conformance,
  reference implementation, generated views, Release 2 artifacts, or the
  commission text (Section 2).
- Neutral role-based language: the result file contains no reference to any
  drafting, search, or review software, service, provider, or mechanism; the
  branch name `research/r3-independent-multigroup-semantics-3137b90`, the commit
  message, and the PR body are neutral. The commit's author/committer identity
  metadata is not role-based (Finding S-6).

## 9. Validation, CI, and base-advance check

At the exact head, in a fresh checkout with `pnpm install --frozen-lockfile`:

| Command                                     | Result                                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                         | clean                                                                                                    |
| `pnpm lint:markdown`                        | 345 files, 0 issues                                                                                      |
| `node --import tsx tooling/src/validate.ts` | OK; all audits clean                                                                                     |
| `pnpm check`                                | green, exit 0 (format, markdown lint, typecheck, validate, tests, generated diff, Phase 1 and 2A suites) |

CI run `33727366496`: `head_sha` `03dce3ec…`, `run_attempt` 1, conclusion
`success`; jobs "Full check (Linux x64)", "Full check (Linux x64, Node 24)",
"Phase 1 + 2A validation (Linux arm64)", "Phase 1 + 2A validation (macOS
arm64)", "Phase 1 + 2A validation (Windows x64)" all `success`.

`main` remained at `3137b904…` throughout the review, so the PR head is a
fast-forward of `main`; no synthetic merge was needed and no path can conflict.
This statement is a byte-identity observation, not merge approval.

## 10. Findings

### BLOCKER

None.

### SHOULD-FIX

- **S-1 (PVL-01 evidence label).** PVL-01 (Bonferroni single-step) is counted
  among the seven unblocked candidates "on directly inspected primary text" with
  evidence `DIRECT (partial: SRC-01 pp. 66–68 …)`. The frozen Holm ledger has
  no atomic row establishing the single-step Bonferroni guarantee; it records
  the classical thresholds (L3) and the Bonferroni confidence-set equivalence
  (L10). The strong, dependence-free FWER guarantee for PVL-01 follows from
  L3/L4/L6 by a subset argument (Bonferroni rejections are a subset of Holm
  rejections), which is a valid investigator inference, not a reused direct
  claim. Relabel PVL-01's basis as inference from F-03/F-10/F-18 (add an I-row
  and a §19 note), or state "six on directly inspected text plus one by
  inference". Disposition unaffected.
- **S-2 (FDR-04 transfer).** `TRANSFER(estimation-oriented FDR program, later
release)` is not a named later release as the commission requires, and its
  rationale (estimator-based target; different output object) rests on
  `SNIPPET` evidence without a `†` mark. Either name the horizon release or
  mark FDR-04 `RES-ONLY†` under SR-K until SRC-24 is inspected.
- **S-3 (TRANSFER rationale basis).** OMN-05, OMN-06, RSM-01, and RSM-02 are
  transferred on `SNIPPET` evidence without `†`. Their transfers are defensible
  because they rest on repository planning boundaries (rank-based Release 5
  horizon; queued seeded-stochastic foundation) and bibliographic identity, not
  on source semantics; say so explicitly in each row so the reader does not
  read an uninspected semantic characterization as the basis.
- **S-4 (access and search record completeness).** Section 2.2 lists "at
  least" five denied hosts and Section 3.1 names the reachable instrument only
  as "a general-purpose web search index". Inventory rule 1 requires access
  failures and indexes to be recorded; enumerate every attempted host
  (including the JSTOR, Wiley, Taylor & Francis, and Biometrika hosts implied
  by the SRC list) and identify the index, which is a discovery instrument
  rather than a drafting mechanism and so is compatible with the neutrality
  rule.
- **S-5 (CLS-04 dual disposition).** CLS-04 carries two disposition tokens
  (`RES-ONLY†` and `TRANSFER(…)`), and the totals count it by "primary label".
  The commission requires one explicit disposition per entry. Keep the Release
  3 disposition as the single token and move the multiple-endpoint transfer to
  a note, or split the entry; the count then needs no interpretive rule.
- **S-6 (commit metadata at merge).** The head commit's author and committer
  identity names the drafting mechanism rather than a role. The result file,
  branch name, commit message, and PR body are neutral, and three earlier
  `main` commits carry the same identity, so this is not novel; still, the
  repository's own intake records describe "neutral, role-based metadata" as
  the intake standard. Recommend that the steward record the intake with
  role-based metadata (squash or re-record) at merge time. No change to the
  result content is needed.

### NICE-TO-HAVE

- **N-1.** OMN-03 and OMN-04 carry `†` but do not name SR-A in-row; the SR-A
  hold table covers them. Add "hold SR-A" in-row for uniformity.
- **N-2.** Section 3.2 attributes Genizi-Hochberg (1978) and Gabriel (1978) to
  Hayter chaining at pp. 62/70; in the frozen completion record those two are
  introduced through Dunnett (1980) pp. 789–790. Discovery-grade only.
- **N-3.** F-08's clause "membership is an input, not derived from the data" is
  an absence-based reading of L1/B1 rather than a ledger statement; mark that
  clause as investigator addition in §19.
- **N-4.** "Cross-checked across at least two independent search results" is
  not recorded per source for SRC-09 through SRC-36.
- **N-5.** APR-07 and APR-08 show evidence `REPORT (via SRC-08)` while their
  rejection rests on SRC-08's own inspected simulation (F-17); `DIRECT (SRC-08
simulation)` would state the basis more precisely.

## 11. Verdict and its limits

**`GO`.**

`GO` means only that, at exact head `03dce3ecc85dac58b00b4d57936c3c8ac031b5cc`,
the research result conforms to the semantic research commission, its `NARROW`
disposition is compatible with the commission's stop conditions, its
source-established core is reused within the steward-accepted scopes, its
catalogue counts and identities recompute exactly, and it may proceed to merge
consideration as an informative research record with the findings above
recorded for repair in or before the steward's disposition.

`GO` does not approve the Release 3 program scope, an RFC publication, any
method selection, any implementation, Protocol adoption, or closure of any hold.
It does not certify the completeness of the catalogue beyond the recorded method
and date, and it does not re-verify the eight inspected PDFs.

## 12. Remaining holds and non-promotions

- Source-acquisition holds SR-A through SR-L remain open exactly as recorded;
  every `†` entry stays DEFER-equivalent until its hold closes with inspected
  primary text, and reopen condition 6 applies when full-text access becomes
  available.
- `FND1-H05` through `FND1-H08`, the Tukey (1953) attribution residual, FND-2
  `HOLD-01` through `HOLD-05`, the seeded-stochastic and missingness research
  lines, and the full FND-1 and FND-2 Research Gates remain open.
- The numerical lane (F, t, Studentized range, augmented range, maximum modulus,
  multivariate-t equicoordinate probabilities, adjusted-p arithmetic) is owned by
  the parallel numerical commission and is untouched.
- Nothing in this review or in the reviewed result issues or selects a
  Contract, procedure, default, identifier, schema, field, Public Check, reason
  or refusal code, tolerance, numerical implementation, support domain, runtime,
  RFC decision, or Release 3 outcome.

## Public-artifact self-check

- [x] Only the public repository at the pinned base and exact head, the live
      PR metadata, and the CI run record were used; no private repository, work
      item, or product implementation was read.
- [x] This file is the only change in the review commit; the reviewed result,
      the commission, and every authoritative artifact are unchanged.
- [x] Attribution is role-based; no drafting, search, or review software,
      service, provider, or mechanism is identified; no human authorship is
      claimed.
- [x] Facts re-derived from Git objects, findings, and the verdict's limits are
      kept separate.
- [x] No merge was performed, and none is authorized by this record.

RELEASE 3 SEMANTIC RESEARCH RESULT INDEPENDENT REVIEW COMPLETE - GO - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
