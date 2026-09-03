# Release 3 Multi-Group Semantic Research Result — Close-Only Review of the Repair

**Status: informative independent close-only review result; non-normative; not
adopted.** This record reviews only the repair commit that answered the earlier
independent review of the Release 3 semantic research result. It re-reviews no
research question, selects no Contract, procedure, identifier, schema, Public
Check, tolerance, support domain, RFC decision, or release outcome, and merges
nothing. Attribution is role-based only.

**Verdict: `GO`** (Section 8). Finding states: S-1 `CLOSED`, S-2 `CLOSED`, S-3
`CLOSED`, S-4 `STILL_OPEN` (partially repaired), S-5 `CLOSED`, S-6
`SATISFIED_BY_ENFORCEABLE_INTAKE_PLAN`, N-1 through N-5 `CLOSED`. Three new
low-severity findings from the repair itself are recorded in Section 7.

## 1. Review identity

| Field                       | Value                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                  | `licklider-ai/nomue-protocol` (public)                                                                                                                                                |
| Reviewed pull request       | #167                                                                                                                                                                                  |
| Repaired exact head         | `453929507d2879dcdf7800d342b3b653cceebb63`                                                                                                                                            |
| Sole parent (original head) | `03dce3ecc85dac58b00b4d57936c3c8ac031b5cc`                                                                                                                                            |
| Repaired tree               | `cbadaa68ae0c153738a5c9f65341be7ef64760e9`                                                                                                                                            |
| Repaired path               | `governance/drafts/release-3-preparation/semantic-research-result.md` (1 path, +74/−63)                                                                                               |
| Repaired result blob        | `30474af98f66bc8973ba8b669e4901a571124e52` (was `e21df31a5fc229c5f134fc7de5bb731d76bb3d0c`)                                                                                           |
| Base (`main`)               | `3137b9043846865cf3d01c848757b97a1c2ef4f0`, unchanged throughout                                                                                                                      |
| Original review record      | commit `05f8bd6e2620df95d540eb3eed9c7029fba1915e`, tree `b4eed92b…`, blob `fc61decb…`, path `review-inputs/r3-independent-multigroup-semantics/REVIEW-RESULT.md`; verdict `GO`, 0/6/5 |
| Review date                 | 2026-09-03                                                                                                                                                                            |
| Reviewer role               | the same independent reviewer role that produced the original review; did not author the scope proposal, the commission, the result, or the repair                                    |
| Review scope                | close-only: each original finding, plus unintended semantic change introduced by the repair                                                                                           |
| Review branch               | `review/r3-independent-multigroup-semantics-repair-4539295`, created from the repaired head as sole parent                                                                            |

Live PR state was read at review start and re-read at review end: head
`45392950…`, base `3137b904…`, two commits, one changed file, `mergeable_state:
clean`. The head did not move, so `HEAD_MOVED` does not apply.

## 2. Identity verification (re-derived from Git objects)

| Check                                                                                                                                                                                                  | Result                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `git cat-file -p 45392950…` parent / tree                                                                                                                                                              | exactly one parent `03dce3ec…`; tree `cbadaa68…`                                                  |
| `git diff --numstat 03dce3ec… 45392950…`                                                                                                                                                               | one path, `74 63`, the result file only                                                           |
| `git ls-tree 45392950… <result path>`                                                                                                                                                                  | blob `30474af9…`                                                                                  |
| Authoritative artifacts, registries, schemas, spec, conformance, reference, generated views, bindings, `evidence/`, canonicalization, governance policy, Release 3 preparation README, commission text | no diff between `03dce3ec…` and `45392950…`                                                       |
| CI run `33730867793`                                                                                                                                                                                   | `head_sha` `45392950…`, event `pull_request`, attempt 1, conclusion `success`; 5/5 jobs `success` |
| Repair commit author/committer metadata                                                                                                                                                                | the steward's own identity; the original head's metadata is unchanged (S-6)                       |

## 3. Programmatic invariance check (original blob vs repaired blob)

The same extraction script was run on both blobs.

| Invariant                                      | Original `e21df31a…`                                             | Repaired `30474af9…`                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Disposition                                    | `NARROW` (line 10, §20, final line)                              | `NARROW` (line 10, §20, final line)                                               |
| Procedure/variant entries (§8.1–§8.8)          | 49, unique, no gaps                                              | 49, unique, no gaps                                                               |
| Guidance / exclusions                          | 2 / 5, not counted in the 49                                     | 2 / 5, not counted in the 49                                                      |
| `R3-CAND` / `RES-ONLY` / `TRANSFER` / `REJECT` | 15 / 27 / 5 / 2                                                  | 15 / 27 / 5 / 2                                                                   |
| Unblocked `R3-CAND` set                        | {PVL-01, PVL-03, PVL-04, APR-01, APR-02, MTO-01, FDR-01}         | identical set                                                                     |
| Blocked `R3-CAND` set                          | {OMN-01, OMN-02, PVL-02, PVL-07, CLS-01, APR-09, HET-01, FDR-02} | identical set                                                                     |
| Entries with more than one disposition token   | 1 (CLS-04)                                                       | 0                                                                                 |
| `RES-ONLY` count needing an interpretive rule  | yes (CLS-04 "primary label")                                     | no — the recount is single-valued without any rule                                |
| `DIRECT` evidence entries                      | 10 (including PVL-01)                                            | 11 (PVL-01 moved to `INFERENCE`; APR-07/08 moved to `DIRECT (SRC-08 simulation)`) |
| SRC IDs referenced / declared                  | 36 / 36                                                          | 36 / 36                                                                           |
| Holds SR-A…SR-L declared                       | 12                                                               | 12                                                                                |
| Counterexample attacks in §14                  | 19                                                               | 19 (section untouched by the diff)                                                |
| F-claims / §19 rows                            | 23 / 23                                                          | 23 / 23 (F-08 and its §19 row reworded only)                                      |
| Neutral-language grep on the result file       | clean                                                            | clean                                                                             |

The repair diff touches only: §2.2 and §2.3 (access record), §3.1 (instrument),
§3.2 (chaining), F-08, the §8 legend, §8.1, §8.2, §8.3, §8.4 rows APR-07/08,
§8.7, §8.8, the §19 F-08 row, and §20. Sections 5, 6, 7, 9–18 and the
claim-to-source pinpoints are byte-identical to the reviewed head, so no
unintended semantic change was found outside the finding repairs, with the
three residuals in Section 7.

## 4. Finding-by-finding closure

### S-1 — Bonferroni evidence classification: `CLOSED`

- PVL-01 evidence is now `INFERENCE from DIRECT (SRC-01 pp. 66–68 …) + SNIPPET
(SRC-14)`; the §8 legend defines `INFERENCE` as an investigator derivation from
  a `DIRECT` result, not a guarantee printed for the named procedure.
- The inference content is stated as "the Bonferroni-threshold rejection set is
  a subset of Holm's sourced rejection set" and the rationale cites F-03/F-10/F-18.
- Historical attribution via SRC-14 remains separate under hold SR-B ("original-
  source attribution still carries hold SR-B"); SR-B row lists "PVL-01
  attribution".
- §20 now reads: six entries `R3-CAND` on directly inspected primary text
  (PVL-03, PVL-04, APR-01, APR-02, MTO-01, FDR-01); PVL-01 is a seventh unblocked
  candidate by explicit investigator inference. The PR body matches.
- Residual (not blocking): two untouched sentences still describe PVL-01 as
  sourced (Section 7, R-2 and R-3).

### S-2 — FDR-04: `CLOSED`

- Exactly one disposition token: `TRANSFER(high-dimensional or omics program,
Releases 16–20 horizon)`†.
- The target is the named Releases 16–20 high-dimensional/omics horizon from the
  release-horizon index.
- The row states that estimator semantics and output "remain blocked by hold
  SR-K"; no semantics are fixed from the snippet.
- Residual (Section 7, R-1): the §17 SR-K hold row still lists only "FDR-01
  dependence scope; FDR-02, FDR-03" and does not name FDR-04, so the entry-level
  hold citation and the hold table disagree.

### S-3 — TRANSFER entries OMN-05, OMN-06, RSM-01, RSM-02: `CLOSED`

Each row now states that the transfer follows the repository planning boundary
(rank-based Release 5 horizon; queued seeded-stochastic randomness foundation),
"not uninspected source semantics", and that statistical characterization or
subset-pivotality/permutation semantics remain pending primary inspection.
Source semantics are not hidden and are not used as the transfer basis.

### S-4 — Access and search record: `STILL_OPEN` (partially repaired)

Satisfied components:

- The environment-provided web index is described as exposing no stable public
  index or provider identity (§2.2, §2.3, §3.1).
- Non-reachability of any scholarly citation database is stated (§2.2, §3.1).
- The unauditable "cross-checked across at least two independent search
  results" claim is withdrawn and replaced by an explicit statement that
  per-source result identities were not retained and no two-result cross-check
  is claimed.

Component this review cannot corroborate:

- The host list was expanded from five to nine (`www.jstor.org`,
  `onlinelibrary.wiley.com`, `www.tandfonline.com`, `academic.oup.com` added)
  under the wording "The recorded attempts covered …". No attempt record (host,
  timestamp, response) exists in the repository or in the PR, and the four
  added hosts are exactly the hosts the original review named as implied by the
  SRC list. The reviewer therefore cannot distinguish a genuine record from a
  list reconstructed after the review. Per the close-only instruction, S-4 is
  not closed on this component.

Specific shortfall to close S-4: either (a) attach or cite the actual attempt
record for 2026-09-03 (host, time, response code) as a repository-tracked
appendix or a stably referenced intake note, or (b) restate §2.2 to name only
the five hosts originally recorded and describe the remaining publishers as
"not attempted / not recorded", so that the text claims no more than the
retained record supports. Either form leaves the `NARROW` disposition and the
catalogue unaffected.

### S-5 — CLS-04 / CLS-05: `CLOSED`

Each entry carries exactly one Release 3 disposition, `RES-ONLY`†, under hold
SR-D; the Releases 11–15 multiple-endpoint use is a note ("applicable findings
may later be transferred …"), not a second token. The programmatic recount gives
27 `RES-ONLY` with no "primary label" rule. Residual (Section 7, R-2): the
totals paragraph still contains the phrase "counting CLS-04/CLS-05 by their
primary Release 3 label", which is now stale text rather than a needed rule.

### S-6 — Commit metadata: `SATISFIED_BY_ENFORCEABLE_INTAKE_PLAN`

The original head's author/committer metadata is unchanged, the public feature
history was not force-pushed, the repair commit carries the steward's own
identity, and the PR body records that S-6 "is reserved for role-based squash or
re-record at main intake". The plan is enforceable because the single steward
controls the merge and the repository's earlier intake records document the
same practice. This state is conditional: the metadata of the actual `main`
intake commit must be checked after merge, and this review does not treat S-6
as closed. No automated check enforces the plan.

### N-1 through N-5: `CLOSED`

1. OMN-03 and OMN-04 rows now name hold SR-A in-row.
2. §3.2 chaining attributes Genizi-Hochberg (1978) and Gabriel (1978) to Dunnett
   (1980) pp. 789–790 and removes them from the Hayter chain; this matches the
   frozen completion record.
3. F-08 now separates the sourced statement (SRC-01 pp. 65–67; SRC-02 pp. 291, 293) from an explicitly labeled investigator inference, and the §19 row says
   "membership-as-input clause is inference".
4. The two-result cross-check claim for SRC-09 through SRC-36 is withdrawn.
5. APR-07 and APR-08 show `DIRECT (SRC-08 simulation)` with the F-17 rationale
   unchanged.

## 5. Validation at the repaired head

In a fresh checkout at `45392950…` after `pnpm install --frozen-lockfile`:

| Command                                     | Result                                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                         | clean                                                                                                    |
| `pnpm lint:markdown`                        | 0 issues                                                                                                 |
| `node --import tsx tooling/src/validate.ts` | OK; all audits clean                                                                                     |
| `pnpm check`                                | green, exit 0 (format, markdown lint, typecheck, validate, tests, generated diff, Phase 1 and 2A suites) |
| Catalogue recount script                    | Section 3                                                                                                |

CI run `33730867793` on this exact head: 5/5 jobs `success` ("Full check (Linux
x64)", "Full check (Linux x64, Node 24)", "Phase 1 + 2A validation (Linux
arm64)", "Phase 1 + 2A validation (macOS arm64)", "Phase 1 + 2A validation
(Windows x64)").

## 6. Non-promotion and neutrality

- Nothing is promoted: no Protocol method, identifier, Public Check, support
  domain, tolerance, or RFC outcome is selected; the repaired text keeps the
  candidate/project-choice labeling of Sections 7, 10–13 unchanged.
- The repaired result file, the repair commit message, and the PR body contain
  no reference to any drafting, search, or review software, service, provider,
  or mechanism.
- Branch hygiene: the duplicate branch `claude/nomue-protocol-pr167-review-vy8ixz`
  (pointing at the original review commit `05f8bd6e…`) could not be deleted
  from this environment — ref deletion is refused by the environment's Git
  egress proxy (HTTP 403 on the delete refspec). The canonical neutral branch
  `review/r3-independent-multigroup-semantics-03dce3e` is untouched. Deleting
  the duplicate remains a steward action (Section 7, R-4).

## 7. New findings from the repair

`BLOCKER`: none.

`SHOULD-FIX`:

- **R-1 (hold table).** §17 row SR-K lists "FDR-01 dependence scope; FDR-02,
  FDR-03" but FDR-04 now cites SR-K with `†`; add FDR-04 to the SR-K row so the
  hold table and entry-level citations agree.
- **R-4 (branch hygiene, outside the result file).** The non-neutral duplicate
  branch still exists on the public remote and must be deleted by a party whose
  push path permits ref deletion.

`NICE-TO-HAVE`:

- **R-2 (stale totals text).** The §8 totals paragraph still reads "7 unblocked
  — PVL-01, …" without the §20 qualification and still carries "counting
  CLS-04/CLS-05 by their primary Release 3 label", which no longer describes
  the table.
- **R-3 (D2 lane wording).** §10 stage D2 lists PVL-01 with PVL-03/PVL-04 as
  "Sourced now"; consistent wording would be "PVL-03/PVL-04 sourced; PVL-01 by
  inference".

None of these changes the disposition, the counts, the unblocked set, or any
hold.

## 8. Verdict and its limits

**`GO`.**

`GO` means only that the repair commit at exact head
`453929507d2879dcdf7800d342b3b653cceebb63` faithfully addresses the original
findings as classified above, introduces no unintended semantic change, keeps
every invariant of Section 3, and may proceed to merge consideration as an
informative research record with S-4 (host-record corroboration), R-1, R-2, R-3
recorded for repair in or before the steward disposition, S-6 conditional on
the intake commit's metadata, and R-4 pending steward action.

`GO` does not approve the Release 3 program scope, an RFC publication, any
method selection, any implementation, Protocol adoption, or closure of any
hold; it does not re-verify the eight inspected PDFs; and it does not
re-review research content outside the repaired hunks.

## Public-artifact self-check

- [x] Only the public repository at the pinned base, the original head, and the
      repaired head, the live PR metadata, and the CI run record were used.
- [x] This file is the only change in the review commit; the reviewed result,
      the commission, and every authoritative artifact are unchanged.
- [x] Attribution is role-based; no drafting, search, or review software,
      service, provider, or mechanism is identified; no human authorship is
      claimed.
- [x] No merge was performed, and none is authorized by this record.

RELEASE 3 SEMANTIC RESEARCH RESULT REPAIR CLOSE-ONLY REVIEW COMPLETE - GO - S-4 STILL OPEN - S-6 CONDITIONAL - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
