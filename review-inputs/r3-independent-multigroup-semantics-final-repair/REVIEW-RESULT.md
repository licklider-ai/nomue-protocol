# Release 3 Multi-Group Semantic Research Result — Close-Only Review of the Final Repair

**Status: informative independent close-only review result; non-normative; not
adopted.** This record reviews only the final repair commit of the Release 3
semantic research result: closure of the items left open by the previous
close-only review (S-4, R-1, R-2, R-3) and absence of regression on items
already closed. It re-reviews no research question, selects no Contract,
procedure, identifier, schema, Public Check, tolerance, support domain, RFC
decision, or release outcome, and merges nothing. Attribution is role-based
only.

**Verdict: `GO`** (Section 8). S-4 `CLOSED`, R-1 `CLOSED`, R-2 `CLOSED`, R-3
`CLOSED`; no regression on S-1, S-2, S-3, S-5, N-1 through N-5; S-6 remains
`SATISFIED_BY_ENFORCEABLE_INTAKE_PLAN` pending intake. New findings: `BLOCKER`
0, `SHOULD-FIX` 0, `NICE-TO-HAVE` 0.

## 1. Review identity

| Field                         | Value                                                                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                    | `licklider-ai/nomue-protocol` (public)                                                                                                                         |
| Reviewed pull request         | #167                                                                                                                                                           |
| Reviewed exact head           | `778f295ec549c3fe93a5f0493fa65e03cf6ed043`                                                                                                                     |
| Sole parent (first repair)    | `453929507d2879dcdf7800d342b3b653cceebb63`                                                                                                                     |
| Tree                          | `be25155b15906b97b856b62961d3b7cc21f56b26`                                                                                                                     |
| Path                          | `governance/drafts/release-3-preparation/semantic-research-result.md`                                                                                          |
| Result blob                   | `8f21526040924b891f64724c2d0fde9ea94eff92` (was `30474af9…` at the first repair, `e21df31a…` at the original head)                                             |
| Diff from parent              | exactly 1 path, `+28/−27`                                                                                                                                      |
| Diff from base                | exactly 1 path, `+911/−0`                                                                                                                                      |
| Base (`main`)                 | `3137b9043846865cf3d01c848757b97a1c2ef4f0`, unchanged throughout                                                                                               |
| Prior review 1 (full)         | commit `05f8bd6e…`, blob `fc61decb…`, `review-inputs/r3-independent-multigroup-semantics/REVIEW-RESULT.md`; `GO`, 0/6/5                                        |
| Prior review 2 (first repair) | commit `4d1c16e2…` (parent `45392950…`, tree `55114017…`), blob `e6464295…`, `review-inputs/r3-independent-multigroup-semantics-repair/REVIEW-RESULT.md`; `GO` |
| Review date                   | 2026-09-03                                                                                                                                                     |
| Reviewer role                 | independent reviewer; did not author the scope proposal, the commission, the research result, or any repair                                                    |
| Review branch                 | `review/r3-independent-multigroup-semantics-final-repair-778f295`, created from the reviewed head as sole parent                                               |

Both prior review records were re-read in full from their Git blobs. Live PR
state was read at review start and re-read immediately before the verdict:
head `778f295e…`, base `3137b904…`, three commits, one changed file, 911
additions, `mergeable_state: clean`. The head did not move.

## 2. Identity verification (re-derived from Git objects)

| Check                                                                                                                                                                                                   | Result                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `git cat-file -p 778f295e…`                                                                                                                                                                             | exactly one parent `45392950…`; tree `be25155b…`                                                  |
| `git diff --numstat 45392950… 778f295e…`                                                                                                                                                                | one path, `28 27`, the result file only                                                           |
| `git diff --numstat 3137b904… 778f295e…`                                                                                                                                                                | one path, `911 0`, the result file only                                                           |
| `git ls-tree 778f295e… <result path>`                                                                                                                                                                   | blob `8f215260…`                                                                                  |
| Authoritative artifacts, registries, schemas, spec, conformance, reference, generated views, bindings, `evidence/`, canonicalization, governance policy, Release 3 preparation README, both commissions | no diff between base and head                                                                     |
| CI run `33732659195`                                                                                                                                                                                    | `head_sha` `778f295e…`, event `pull_request`, attempt 1, conclusion `success`; 5/5 jobs `success` |
| Repair commit author/committer metadata                                                                                                                                                                 | the steward's own identity; the original head's metadata is unchanged (S-6 plan unchanged)        |

## 3. Item closure

### S-4 — access record: `CLOSED`

- §2.2 now names exactly the five hosts backed by the retained record:
  `www.fda.gov`, `www.ema.europa.eu`, `projecteuclid.org`, `arxiv.org`,
  `doi.org`.
- The four unsubstantiated hosts (`www.jstor.org`, `onlinelibrary.wiley.com`,
  `www.tandfonline.com`, `academic.oup.com`) appear nowhere in the result
  (grep over the whole blob: zero matches).
- The text states that the record "does not preserve a complete per-host
  attempt log, so no broader host enumeration is claimed".
- The index-identity statement, the no-citation-database statement, and the
  withdrawal of the two-result cross-check (all closed at the first repair)
  are retained verbatim.
- No source status changed: `ACCESS_FAILED_IN_ENVIRONMENT` usage is identical,
  the §2.2 SRC table (SRC-09–SRC-36) is byte-identical after whitespace
  collapse, and no F-claim, §19 row, or disposition was touched by this hunk.

### R-1 — SR-K completeness: `CLOSED`

- FDR-04 row (§8.7): evidence `SNIPPET (SRC-24)`, disposition
  `TRANSFER(high-dimensional or omics program, Releases 16–20 horizon)`†,
  rationale unchanged ("estimator semantics and output remain blocked by hold
  SR-K").
- §17 SR-K row now reads blocked items `FDR-01 dependence scope; FDR-02,
FDR-03, FDR-04` and exact next sources `SRC-22, SRC-23, SRC-24`.
- Every other SR-A…SR-L row is identical after whitespace collapse; the added
  table-row lines in the diff are Prettier column re-padding only.

### R-2 — catalogue summary: `CLOSED`

- The §8 totals paragraph now reads: 15 `R3-CAND` (7 unblocked: six with
  direct source support — PVL-03, PVL-04, APR-01, APR-02, MTO-01, FDR-01 — and
  PVL-01 by the explicit inference in §8.2; 8 blocked by SR-x holds), 27
  `RES-ONLY`, 5 `TRANSFER` (OMN-05, OMN-06, FDR-04, RSM-01, RSM-02), 2 `REJECT`
  (APR-07, APR-08).
- The phrase "counting CLS-04/CLS-05 by their primary Release 3 label" is gone.
- PVL-01 is not presented as a directly inspected single-step guarantee: its
  §8.2 row remains `INFERENCE from DIRECT …` and §20 remains "six … on directly
  inspected primary text; PVL-01 … by explicit investigator inference".
- Programmatic recount on blob `8f215260…` (Section 5) matches the paragraph.

### R-3 — D2 wording: `CLOSED`

- §10 D2 now reads: "(PVL-01, PVL-03, PVL-04). PVL-03/PVL-04 are sourced now;
  PVL-01 is supported by the explicit inference recorded in §8.2. Needs only D0
  and scalar/sort numerics. Can close before D1."
- Membership of D2, its dependency (D0 only), its closable-before-D1 ordering,
  and every other stage D0–D8 and the deferred lanes are unchanged.

### S-6 — commit metadata: `SATISFIED_BY_ENFORCEABLE_INTAKE_PLAN` (unchanged)

The original head's author/committer metadata is unchanged, no force-push
occurred, and the PR body now states the plan explicitly: "At main intake, use
a role-based squash or re-record and verify the resulting author and committer
metadata." This review precedes intake and does not treat S-6 as fulfilled;
the intake commit's metadata must be verified after merge.

## 4. Regression check on closed items

| Item | Evidence at `8f215260…`                                                                                                  | State         |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | ------------- |
| S-1  | PVL-01 `INFERENCE from DIRECT` row, legend entry, SR-B attribution split, §20 six-plus-one wording all present unchanged | no regression |
| S-2  | FDR-04 single token, named Releases 16–20 target, `†`, SR-K citation unchanged                                           | no regression |
| S-3  | OMN-05, OMN-06, RSM-01, RSM-02 planning-boundary rationales unchanged                                                    | no regression |
| S-5  | CLS-04 and CLS-05 each carry only `RES-ONLY`†; transfer remains a note; zero entries with two tokens                     | no regression |
| N-1  | OMN-03/04 rows name "hold SR-A" in-row                                                                                   | no regression |
| N-2  | §3.2 chaining (Genizi-Hochberg/Gabriel via Dunnett 1980) unchanged                                                       | no regression |
| N-3  | F-08 sourced clause plus labeled "Investigator inference"; §19 row note unchanged                                        | no regression |
| N-4  | "per-source result identities were not retained; no … two-result cross-check is claimed" retained                        | no regression |
| N-5  | APR-07/08 `DIRECT (SRC-08 simulation)` unchanged                                                                         | no regression |

## 5. Invariance (first repair blob `30474af9…` vs final blob `8f215260…`)

| Invariant                                      | First repair                                                     | Final                                                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Disposition                                    | `NARROW` (line 10, §20, final line)                              | `NARROW` (line 10, §20, final line)                                                                                    |
| Procedure/variant entries (§8.1–§8.8)          | 49, unique IDs, no gaps                                          | 49, unique IDs, no gaps                                                                                                |
| Guidance entries / recorded exclusions         | 2 / 5                                                            | 2 / 5                                                                                                                  |
| `R3-CAND` / `RES-ONLY` / `TRANSFER` / `REJECT` | 15 / 27 / 5 / 2                                                  | 15 / 27 / 5 / 2                                                                                                        |
| Duplicate IDs                                  | 0                                                                | 0                                                                                                                      |
| Unblocked `R3-CAND` set                        | {PVL-01, PVL-03, PVL-04, APR-01, APR-02, MTO-01, FDR-01}         | identical                                                                                                              |
| Blocked `R3-CAND` set                          | {OMN-01, OMN-02, PVL-02, PVL-07, CLS-01, APR-09, HET-01, FDR-02} | identical                                                                                                              |
| Per-entry disposition tokens                   | one per entry                                                    | one per entry; every ID's token unchanged                                                                              |
| SRC IDs referenced / declared                  | 36 / 36                                                          | 36 / 36                                                                                                                |
| Holds SR-A…SR-L                                | 12                                                               | 12                                                                                                                     |
| F-claims (F-01–F-23) / §19 rows                | 23 / 23                                                          | 23 / 23, byte-identical                                                                                                |
| Counterexample attacks (§14)                   | 19                                                               | 19, byte-identical                                                                                                     |
| Sections byte-identical                        | —                                                                | §1, §3–§7, §9, §11–§16, §18–§20, self-check                                                                            |
| Sections changed                               | —                                                                | §2 (S-4 paragraph only), §8 (totals paragraph only), §10 (D2 sentence only), §17 (SR-K row; other rows re-padded)      |
| Non-whitespace changed lines in the diff       | —                                                                | 31 of 55 raw diff lines, all inside the four repair hunks; the remaining 24 are Prettier column re-padding of §17 rows |
| Neutral-language grep on the result file       | clean                                                            | clean                                                                                                                  |

The semantic change is therefore confined to the S-4, R-1, R-2, and R-3
repairs. No source status, decision-bearing claim, hold, counterexample
boundary, candidate decision, or reuse boundary changed.

## 6. Validation at the reviewed head

Fresh checkout at `778f295e…` after `pnpm install --frozen-lockfile`:

| Command                                     | Result                                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| `pnpm format:check`                         | clean                                                                                   |
| `pnpm lint:markdown`                        | 0 issues                                                                                |
| `pnpm typecheck`                            | clean (`tsc --noEmit`)                                                                  |
| `node --import tsx tooling/src/validate.ts` | OK; all audits clean                                                                    |
| `pnpm check`                                | green, exit 0; no TSX IPC limitation occurred, so no IPC-free substitute run was needed |
| Catalogue recount script                    | Section 5                                                                               |

CI run `33732659195` on this exact head: `head_sha` `778f295e…`, 5/5 jobs
`success` ("Full check (Linux x64)", "Full check (Linux x64, Node 24)", "Phase 1

- 2A validation (Linux arm64)", "Phase 1 + 2A validation (macOS arm64)", "Phase
  1 + 2A validation (Windows x64)"). No new validator implementation handling
  caller input exists in this diff, so no hostile-shape battery was added.

## 7. Findings

`BLOCKER`: none. `SHOULD-FIX`: none. `NICE-TO-HAVE`: none.

Outstanding actions outside the result file, carried forward unchanged: the
S-6 intake-metadata verification after merge, and deletion of the non-neutral
duplicate branch pointing at the first review commit (R-4 of the previous
review), which this environment still cannot delete.

## 8. Verdict and its limits

**`GO`.**

`GO` means only that, at exact head `778f295ec549c3fe93a5f0493fa65e03cf6ed043`,
S-4, R-1, R-2, and R-3 are closed, no closed item regressed, the `NARROW`
disposition and catalogue semantics are unchanged, the exact-head identity and
CI hold, and the research result may proceed to merge consideration as an
informative research record with S-6 conditional on the intake commit's
metadata.

`GO` does not approve opening Release 3 public discussion, an RFC publication,
any authoritative selection (Contract, procedure, default, identifier, schema,
field, Public Check, reason or refusal code, tolerance, numerical
implementation, support domain, runtime), Protocol adoption, or closure of any
hold. Holds SR-A through SR-L, `FND1-H05` through `FND1-H08`, the Tukey (1953)
attribution residual, FND-2 `HOLD-01` through `HOLD-05`, and the queued
seeded-stochastic and missingness lines remain open; the numerical lane remains
with the numerical commission. No merge was performed.

## Public-artifact self-check

- [x] Only the public repository at the base, the two prior heads, and the
      reviewed head, the live PR metadata, and the CI run record were used.
- [x] This file is the only change in the review commit; the reviewed result,
      the commission, and every authoritative artifact are unchanged.
- [x] Attribution is role-based; no drafting, search, or review software,
      service, provider, or mechanism is identified; no human authorship is
      claimed.
- [x] No merge, squash, rebase, or candidate repair was performed.

RELEASE 3 SEMANTIC RESEARCH RESULT FINAL-REPAIR CLOSE-ONLY REVIEW COMPLETE - GO - S-6 CONDITIONAL ON INTAKE - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
