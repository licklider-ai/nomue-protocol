# Release 3 Source-Acquisition Result Part C — Close-Only Review of the SR-K / SR-G Repair

**Status: informative independent close-only review result; non-normative; not
adopted.** This record reviews only the repair commit that follows the original
Part C head reviewed in PR #187: closure of the two `SHOULD-FIX` findings (S-1,
S-2), the state of the five `NICE-TO-HAVE` findings (N-1 through N-5), the new
sections C.4.4 and C.10, and absence of regression in the untouched material. It
re-reviews no research question, selects no Contract, procedure, identifier,
schema, Public Check, tolerance, support domain, RFC decision, R4 method, or
release outcome; it closes no hold and merges nothing. Attribution is role-based
only.

**Textual repair verdict: `GO`** (Section 8). S-1 `CLOSED`, S-2 `CLOSED`; N-1,
N-2, N-3 `CLOSED`; N-4 `PARTIAL` (theorem pinpoint closed; optional calculation
deferred by the author); N-5 `DEFERRED` by the author. No regression found. New
findings: `BLOCKER` 0, `SHOULD-FIX` 0, `NICE-TO-HAVE` 2.

**Source support for the two candidates:** unchanged from PR #187 and
re-confirmed at the repaired text: `SR-K` source-supportable `CLOSED` under the
bounded reading now written in C.4.4, `SR-G` source-supportable `CLOSED`.

**Model-level independence:** `PENDING` (Section 9). Separate authoring and
review contexts are established; an exact, verifiable identifier for the
authoring session's model is not available from repository artifacts. Formal
hold acceptance was not performed and is not authorized by this record.

## 1. Review identity, scope, and independence

| Field                  | Value                                                                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository             | `licklider-ai/nomue-protocol` (public)                                                                                                                                  |
| Reviewed pull request  | #186 (draft; head branch `research/r3-source-intake-srk-20260907`; base `main`)                                                                                         |
| Reviewed exact head    | `9eee0caf6a423d509a996be71df8cff8b4d1e9df` (second commit on the PR)                                                                                                    |
| Sole parent            | `37d3ed1626964c20080c26614052e2ce1971d635` (the head reviewed in PR #187)                                                                                               |
| Recomputed head tree   | `e72cae8b40e0c37924115162f63901b8e72a64a6`                                                                                                                              |
| Base (`main`)          | `f39100161cb45de15767bdb19ed54aba9489b41a`, unchanged throughout                                                                                                        |
| Changed path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md` (1 path, +72/−14 against the parent; +519/−0 against base)                              |
| Result blob (head)     | `47b497d67bcf7e02382c1fe20cd69a8e615c31cf`, SHA-256 `444fa1d78f585c21ea26db3e8d7c2dfe39dc0728a4d6a3d996665df060f10680`                                                  |
| Result blob (parent)   | `ab3db6a9a7fe82745da28530df8d807a33cf19e8`                                                                                                                              |
| Result blob (base)     | `5465cbcfd00708facac94785d9244b79166cb81e` (Parts A and B)                                                                                                              |
| Original review (kept) | PR #187, commit `f8c17dba9bb2e7cc5e3ebe5a9f837f54af0fdd88`, blob `a92da5e6c2ed105e3074f51861c4c08d1b4df66e`, `review-inputs/r3-srk-srg-source-closure/REVIEW-RESULT.md` |
| Review date            | 2026-09-07                                                                                                                                                              |
| Reviewer role          | the same independent reviewer as PR #187; did not author or repair the investigation, the commissions, the intake, or the PR #186 text                                  |
| Review branch          | `review/r3-srk-srg-source-closure-repair-20260907`, previously absent on the remote, created from the reviewed head as sole parent                                      |
| Review posture         | close-only: the repair delta and its regression context; nothing else is re-adjudicated                                                                                 |

**Scope.** The diff between the parent and the head, read in full (Section 3);
the repaired statements checked against the same five originals; the unchanged
material checked for byte, code, transcript, table, and count preservation
(Section 5). Everything PR #187 marked out of scope stays out of scope: the
other twelve C.5 dispositions, the other fourteen artifacts, Rom and Romano–Wolf
diagnostics, PR 184, RSM entries, Release 4.

**Independence boundary.** This review was performed in the same separate
LLM-assisted review session that produced PR #187, with its own context, in a
managed remote execution environment. The review session did not author or
repair the result, either commission, the intake, or the PR #186 text, and had
no access to the authoring session's context beyond the committed artifacts and
the live PR metadata; it is therefore not a second pass in the authoring
context. Model provenance is treated separately in Section 9, as the steward's
instruction requires.

**Environment.** Linux container; Node v22.22.2; pnpm 11.7.0 with the pinned
lockfile (installed earlier in this session by `pnpm install --frozen-lockfile`,
exit 0); Python 3.11 with PyMuPDF 1.28.2 for text extraction and page images;
exact rational arithmetic from the Python standard library. No private
repository, private package, or product implementation was read.

## 2. Identity verification (re-derived from Git objects and file bytes)

| Check                                                                            | Result                                                                                                                               |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `git cat-file -t 9eee0caf…`; `git log -1 --format=%P`                            | commit; exactly one parent `37d3ed16…`                                                                                               |
| `git rev-parse 9eee0caf…^{tree}`                                                 | `e72cae8b…` (recomputed; no expected tree was supplied)                                                                              |
| `git diff-tree --no-commit-id -r 37d3ed16… 9eee0caf…`                            | one path, `100644`, blob `ab3db6a9…` → `47b497d6…`, status `M`                                                                       |
| `git diff-tree --no-commit-id -r f3910016… 9eee0caf…`                            | one path, blob `5465cbcf…` → `47b497d6…`; no other path differs from base                                                            |
| `git diff --numstat` parent → head                                               | `72 14`, the result file only                                                                                                        |
| SHA-256 of blob `47b497d6…`                                                      | `444fa1d7…` (matches the PR's stated value)                                                                                          |
| Byte-prefix test (`cmp -n 164493 base-blob head-blob`)                           | the 164 493-byte base blob is byte-for-byte the prefix of the 213 491-byte head blob; Parts A and B unchanged                        |
| Live PR #186 (read at review start and re-read before the verdict)               | head `9eee0caf…`, base `f3910016…`, two commits, one changed file, 519 additions, `mergeable_state: clean`, draft; head did not move |
| PR #187 objects                                                                  | branch `review/r3-srk-srg-source-closure-20260907` still at `f8c17dba…`; blob `a92da5e6…` unchanged; not overwritten                 |
| Remote branch `review/r3-srk-srg-source-closure-repair-20260907` before creation | absent in `git ls-remote`; created locally from `9eee0caf…`                                                                          |
| `git diff --check 37d3ed16… 9eee0caf…`                                           | exit 0                                                                                                                               |

**Original artifacts.** The five PDFs supplied for this review were re-hashed;
each is byte-identical to the copy verified in PR #187 Section 4 and to the C.2
table: 04 `4bfbec2b…`, 09 `bb0bd080…`, 10 `df5671bf…`, 16 `d96aea58…`, 19
`4eafd121…` (full values in PR #187 Section 4 and result C.2). Page images used
below were re-rendered from these bytes. `SOURCE_ACCESS_INCOMPLETE` applies to no
in-scope claim.

## 3. The repair delta, read in full

The diff touches six places, all inside Part C:

1. C.4.1 table, row "1182 discussion" (S-1) and the table's re-padding.
2. C.4.1 output/numerical boundary paragraph (N-2).
3. C.4.2 Theorem 1 pinpoint (N-4, first part).
4. C.4.3 closing sentence (N-3).
5. New subsection C.4.4 "SR-K reopen conditions and closure scope" (S-2 and the
   closure-scope statement).
6. C.6 rank-condition clause (N-1); and new section C.10 "Repair after the
   limited independent review" appended after the C.9 status line.

Nothing else in the file changed; the C.5 table, the C.6 corrections ledger,
the C.7 code and transcript, C.8, C.9, and all of Parts A and B are identical
to the parent (Section 5).

## 4. Item-by-item closure

### S-1 — all-pairs row versus 04 p.1182: `CLOSED`

- New row text: "The paper states that MTP2 and PRDS do not hold for the
  discussed normal all-pairs statistics; whether BH controls FDR there remains
  open in its account." Boundary column unchanged.
- Source (page image, 04 p.1182, second paragraph): "Another important open
  question is whether the same procedure controls the FDR when testing pairwise
  comparisons of normal means, either Studentized or not. Simulation studies …
  show that this is the case. It is known that the distribution of the test
  statistics is not MTP2. The PRDS condition does not hold as well."
- The row now separates the source's negative PRDS/MTP2 statement from its open
  FDR-control question, exactly as PR #187 S-1 asked. The refusal scope in the
  "Concrete scope mapping" bullets is unchanged: all-pairs still receives no
  unadjusted BH control, and the harmonic correction is offered only with valid
  marginal p-values and is not selected.

### S-2 — exact SR-K reopen conditions: `CLOSED`

C.4.4 now states reopen triggers for each sub-claim. Checked against commission
required-analysis item 8 and PR #187 Section 9 (S-2's list (a)–(d)):

| PR #187 S-2 element                                                                                                                   | C.4.4 text                                                                                                                                                                                                                                                                                              | Status |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| (a) unadjusted BH for all-pairs or other non-Case-3/4 families; sidedness; member set; model; `q < 1/2`; Theorem 1.3 p-value validity | "Reopen C-K1/SR-K before relying on unadjusted BH for all-pairs or any family outside the stated Case 3/4 conditions, changing one/two-sidedness, the fixed member set, normal/covariance/independent-scale assumptions or q<1/2 restriction, or relaxing valid marginal null p-values for Theorem 1.3" | met    |
| (b) adaptive variant other than Definition 6; use under dependence                                                                    | "Reopen C-K2/SR-K for an adaptive variant other than Definition 6, changes to its stopping/counting rules, or a dependence guarantee"                                                                                                                                                                   | met    |
| (c) Storey estimates as guaranteed rejection rules; `+1`, `p ≤ λ`; data-driven `λ`                                                    | "Reopen C-K3/SR-K for treating Storey estimates as guaranteed rejection rules, +1 or p≤lambda modifications, data-selected lambda/regions, changed mixture/power assumptions, or new truncation or endpoint conventions"                                                                                | met    |
| (d) contradictions in the proofs of 04 Theorems 1.2/1.3, 16 Theorem 1, 19 Theorem 2                                                   | "Reopen the affected claim for a source-version/hash change or a material contradiction in the proofs of 04 Theorems 1.2/1.3, 16 Theorem 1, or 19 Theorem 2"                                                                                                                                            | met    |
| No silent fallback adoption                                                                                                           | "the harmonic correction is not silently adopted as a fallback"                                                                                                                                                                                                                                         | met    |
| Catalogue classes untouched                                                                                                           | "Unchanged fixed catalogue classes remain in force"                                                                                                                                                                                                                                                     | met    |

Each trigger names a concrete family, sidedness, model, `q`, variant, tuning,
estimator, source-identity, or theorem-conflict condition; none is vague, and
none widens the closure. The commission's item 8 is satisfied for SR-K.

### N-1 — rank conditions spelled out: `CLOSED`

C.6 now reads "with the paper's rank conditions (p.88): covariance rank k for
unrestricted means, or rank k−1 when both the means and their estimates satisfy
restriction (1)". Source (page image, 09 p.88): "if the `μ_i` are unrestricted
the rank of the covariance matrix with elements (4) is `k`, and … if the `μ_i`
are subject to a restriction (1) then the `μ̂_i` are subject to the same
restriction (1) and the rank of the covariance matrix is `k − 1`." Matches.

### N-2 — adjusted p-value pinpoint: `CLOSED`

C.4.1 now reads "Source 16 p.493 gives the ordinary-BH suffix-minimum formula
m p_(j)/j. The harmonic variant m H_m p_(j)/j is investigator algebra; both are
capped at 1 for the threshold-equivalent adjusted-value representation here."
Source (page image, 16 p.493): `p^LSU_(i) = min{ m p_(j)/j | j ≥ i }` as "the
FDR-adjusted p-value". The ordinary-BH form is now source-cited and the harmonic
form is still labelled investigator algebra, as asked. The printed formula
carries no explicit cap at 1; the text attributes the cap to "the representation
here", which is accurate (finding R-N1 records this for precision only).

### N-3 — "reproduced in C.7" wording: `CLOSED`

C.4.3 now reads "this distinction is stated in source 19 p.481; C.7 demonstrates
the finite-m estimator difference, not a simulation of the all-null identity."
Source (page image, 19 p.481): "pFDR is identically 1 when all null hypotheses
are true (`m = m0`)". C.7's Storey block prints 0.08 and 0.4333 from the
finite-`m` factor. The sentence is now correct.

### N-4 — Theorem 1 pinpoint and optional calculation: `PARTIAL` (by design)

- Pinpoint: C.4.2 now reads "Theorem 1 and its proof, pp.497–498 (section setup
  on p.496)". Source (page images, 16 pp.496–498): §5 "Analytical results" opens
  on p.496 with the independence, super-uniform-null, and increasing-`m̂0`
  setup; Theorem 1 and its proof are on pp.497–498. Closed.
- Optional second-example level (`≈ 0.0632` from the printed counts 138 and
  34): not added. C.4.2 still says the second example was not reproduced. The
  author defers this explicitly in C.10. Recorded as deferred, not completed.

### N-5 — original-token column in the corrections table: `DEFERRED`

The C.6 corrections table is unchanged (nine rows, same locators and
corrections as verified in PR #187 Section 6). The author defers the column in
C.10. Recorded as deferred, not completed. No impact on the closure candidate.

## 5. Regression checks on the untouched material

| Item                            | Method                                                                                                            | Result                                                                                                                                                                                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parts A and B                   | byte-prefix comparison against blob `5465cbcf…`                                                                   | preserved                                                                                                                                                                                                                               |
| C.2 artifact table (19 rows)    | table rows extracted from parent and head blobs and compared                                                      | identical                                                                                                                                                                                                                               |
| C.5 disposition rows and totals | rows `SR-A`…`SR-L`, `RSM-01/02`, and the totals line extracted and compared                                       | identical: `CLOSED` 3, `INPUT_INCOMPLETE` 11, overall `INPUT_INCOMPLETE`                                                                                                                                                                |
| C.6 corrections ledger          | diff shows no change to the table                                                                                 | identical                                                                                                                                                                                                                               |
| C.7 code and transcript         | code block and transcript extracted from parent and head; head code re-executed                                   | identical; rerun exit 0; output matches the transcript exactly                                                                                                                                                                          |
| In-scope calculations           | reviewer's own exact-rational code from PR #187 Section 7 re-run on the printed inputs                            | BH 4, stage 1 4, `q* = 5/77`, TST 8; Storey `FDR̂ = 2/25`, `pFDR̂ ≈ 0.43331`                                                                                                                                                              |
| Five source identities          | SHA-256 recomputed on the supplied bytes                                                                          | all match C.2 and PR #187 Section 4                                                                                                                                                                                                     |
| C.4.4 and C.10 scope            | read for any all-pairs guarantee, removal of I-03, model-independence assertion, or widening to other holds or R4 | none found: C.4.4 keeps the all-pairs question open and I-03 in force for unsupported families; C.10 states RFC rule 2 is not marked satisfied and no hold acceptance is recorded; neither section mentions other holds or an R4 method |
| Prior review objects            | `git ls-remote`; blob lookup                                                                                      | PR #187 branch, commit, and blob unchanged                                                                                                                                                                                              |

The new prose introduces no statement that the five sources contradict, and
no statement that the steward's scope direction is used as evidence of
scientific correctness. C.4.4 correctly records the limited source-acquisition
reading of `CLOSED` and the alternative `PARTIAL` reading without choosing
between them.

## 6. Repository validation at the exact head

Working tree at `9eee0caf…` on the new review branch:

| Command                                                                                              | Result                                       | Exit |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | ---: |
| `pnpm format:check`                                                                                  | "All matched files use Prettier code style!" |    0 |
| `pnpm lint:markdown`                                                                                 | 0 issues                                     |    0 |
| `node --import tsx tooling/src/validate.ts`                                                          | "validate: OK …"                             |    0 |
| `git diff --check 37d3ed1626964c20080c26614052e2ce1971d635 9eee0caf6a423d509a996be71df8cff8b4d1e9df` | no output                                    |    0 |

The same three repository commands were re-run after adding this record and
passed (recorded in the review commit). A clean repository check is not source
verification; Sections 4 and 5 are.

## 7. Findings

### BLOCKER

None.

### SHOULD-FIX

None.

### NICE-TO-HAVE

- **R-N1 — Cap at 1 is a representation choice, not a printed feature.** File:
  result C.4.1 output/numerical boundary paragraph. Source: 16 p.493 prints
  `p^LSU_(i) = min{ m p_(j)/j | j ≥ i }` with no explicit cap. The repaired text
  attributes the cap to "the representation here", which is correct; a
  three-word clarification ("the source prints no cap") would remove any
  residual ambiguity. Re-review condition: none required; no impact on any
  disposition.
- **R-N2 — The C.9 terminal status line is no longer terminal.** File: result,
  end of C.9 and C.10. The line "SOURCE-ACQUISITION INCREMENT C:
  INPUT_INCOMPLETE — …" now sits before C.10 rather than closing the file. A
  future increment could move the status line to the end or add a C.10-level
  closing line. Re-review condition: none required; no impact on any
  disposition.

Both items can be carried in the acceptance record or a successor; neither
warrants a repair commit, and any edit would require a new exact-head review.

## 8. Verdicts

| Determination                               | Verdict                                                                                                                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Textual repair review (this record's scope) | **`GO`** — S-1 `CLOSED`, S-2 `CLOSED`, N-1/N-2/N-3 `CLOSED`, N-4 `PARTIAL` (deferred part is explicit), N-5 `DEFERRED`; no regression; 0 `BLOCKER`, 0 `SHOULD-FIX`, 2 `NICE-TO-HAVE` |
| `SR-K` source support (04, 16, 19)          | source-supportable `CLOSED` under the bounded reading written in C.4.4; the `PARTIAL` reading remains recorded for the steward; unchanged from PR #187                               |
| `SR-G` source support (09, 10)              | source-supportable `CLOSED`; X-1 resolved to pp. 87–104; unchanged from PR #187                                                                                                      |
| Model-level independence                    | `PENDING` (Section 9)                                                                                                                                                                |
| Formal hold acceptance                      | not performed; not authorized by this record                                                                                                                                         |

`GO` means only that, at exact head `9eee0caf6a423d509a996be71df8cff8b4d1e9df`,
the repair closes what it says it closes, defers what it says it defers, and
changes nothing else. It does not close either hold, approve PR #186 for merge,
approve the other twelve dispositions or the fourteen uninspected artifacts,
reconsider the `NARROW` programme disposition, open public discussion, adopt
any FDR, Scheffé, or R4 method, or authorize a release. The steward's scope
direction recorded in the PR is treated as authorization to proceed and as the
reading of `CLOSED` to be applied at acceptance; it is not treated as evidence
of scientific correctness or of model identity, and this review did not need it
to reach any source finding.

## 9. Model-level independence and accessible provenance

Kept separate from the textual verdict, as instructed.

- **Established.** Separate authoring and review contexts (Section 1). The
  review session's own configured and last-served model identifiers were read
  from the session-management service during PR #187 and again during this
  review, and both readings agree; the identifier is recorded by the author in
  result C.10 from the reviewer's session report and in the review session
  record, and it is not restated in this file.
- **Pending.** An exact, verifiable identifier for the model that served the
  authoring turns. C.10 discloses that the authoring environment "identifies the
  assistant as GPT but does not expose a verifiable exact serving-model
  identifier for the prior authoring turns". Per the steward's instruction, a
  generic family self-identification, a branch name, a commit author, or user
  assent is not taken as identity evidence. The two disclosures, if accurate,
  describe different model families, but neither the reviewer nor the
  repository can verify the authoring side's disclosure.
- **What would close it.** A steward-recorded comparison of the two session
  identities from the respective session records (or provider-side logs),
  recorded in the acceptance record. Until then RFC rule 2's "separate
  LLM/model" criterion is `PENDING` at the model level while satisfied at the
  context level; this is an acceptance prerequisite, not missing source access.

## 10. Outstanding acceptance prerequisites and non-promotions

- Steward recording of the model-identity comparison (Section 9).
- Steward acceptance of `SR-K` and `SR-G` through the existing hold process,
  applying the reading of `CLOSED` stated in the PR's scope direction and C.4.4,
  and carrying R-N1, R-N2, and the deferred N-4/N-5 parts.
- Everything listed as remaining in PR #187 Section 11 and result C.8 stays
  open: the other twelve holds and their originals, the numerical lane, Release
  4 successors, PR 184 Section 5.4, RFC and pre-opening review, release
  decisions.
- This record is a review input only; it is not an authoritative artifact.

## Public-artifact self-check

- [x] Only the public repository at the fixed head, parent, and base, the live
      PR metadata, and the five user-supplied original PDFs were used; no
      private repository, work item, or product implementation was read.
- [x] This file is the only change in the review commit; the reviewed result,
      both commissions, the original review (PR #187), the source PDFs, and
      every authoritative artifact are unchanged. No source PDF or extraction is
      committed.
- [x] Attribution is role-based. Material process provenance is disclosed
      (separate LLM-assisted review session, environment, tooling, date,
      hashes); model identifiers are handled in Section 9 and are not restated
      here. No human authorship is claimed for this record.
- [x] Facts re-derived from Git objects and page images, reviewer inference,
      findings, verdicts, and the independence status are kept separate.
- [x] No merge, hold update, Issue change, discussion opening, method
      adoption, ratification, or release was performed, and none is authorized
      by this record.

RELEASE 3 SR-K / SR-G SOURCE-CLOSURE REPAIR CLOSE-ONLY REVIEW COMPLETE - GO (TEXTUAL REPAIR) - MODEL-INDEPENDENCE PENDING - NOT MERGE APPROVAL - NOT HOLD CLOSURE - NOT PROTOCOL ADOPTION
