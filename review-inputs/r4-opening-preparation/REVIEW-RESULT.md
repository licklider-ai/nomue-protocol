# Release 4 Opening Preparation - Bounded Independent Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                     | Result                                                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Input integrity               | **`MATCH`**: input commit, parent, input tree and all five blobs match the handoff; the delivery commit adds exactly the handoff file (Section 3)                                                                                                      |
| Preservation                  | **`INTACT`**: no file outside the five listed paths differs between the parent and the delivery commit; numerical scripts/results, preserved reviews, source-copy records, authoritative artifacts and Release 3 files are byte-identical (Section 4)  |
| Acceptance updates            | **`ACCURATE`**: the PR 229 and PR 234 acceptance wording matches the programme acceptance record and the final scaling acceptance paragraph; SF-2 substantive closure, the author-side C-1 repair and steward acceptance stay distinct (Section 5)     |
| Claim map (eight rows)        | **`GO`** (bounded): no unsupported scientific claim, no implicit interval or multiplicity choice, no invented source requirement and no waiver of S1-S6/P1 found; one register mismatch on sample versus population quantities (S-4, Section 6)        |
| Contract/Profile/Check layout | **`GO`** (bounded): the allocation follows ADR-0032 and ID-POLICY; one duplicate-ownership subject (S-2), one undisclosed new directory convention (S-3) and one omitted binding subject (N-1) (Section 7)                                             |
| Release 3 pins and order      | **`VERIFIED`**: both blob pins resolve at the parent; no release-order condition exists in `governance/RFC.md`, `governance/RELEASE-POLICY.md` or `registries/stability-tiers.yaml`; the author's interpretation is fairly labelled (Section 8)        |
| Findings                      | 0 `BLOCKER`, 4 `SHOULD-FIX`, 4 `NICE-TO-HAVE` (Section 10)                                                                                                                                                                                             |
| Validation                    | delivery tree `2192cf27…`: format, Markdown lint, typecheck, repository validation, generated-diff and `git diff --check` all pass; the fixed input tree `24d71fef…` alone fails the link audit on the README's handoff link, as the handoff discloses |
| Public-opening readiness      | **`NOT_READY`**; unchanged; R4-P1 through R4-P6 open (Section 9)                                                                                                                                                                                       |
| Primary-source work           | **`NOT_PERFORMED`**; no acquisition attempted; S1, S2, S5 and P1 remain unsupported as recorded (Section 11)                                                                                                                                           |
| Independence                  | model, provider and work-context independence from the OpenAI-assisted author; same model identifier as the preserved reviews, in a new session with no prior involvement in this input (Section 2)                                                    |

`GO` means only that the prose increment at the fixed input `964fe864…` states its
recommendations, evidence, limits and remaining work accurately against the parent
`ed6e9d9b…`, and that the four `SHOULD-FIX` items are wording and ownership repairs
rather than unsupported claims. A preparation GO is not an R4-P6 opening GO. This
review closes no readiness condition, no source hold, adopts no method, allocates no
identifier or namespace token, opens no RFC window and changes nothing in Release 3.

## 2. Independence, roles and boundary

- **Commission.** `governance/drafts/release-4-preparation/opening-preparation-handoff.md`
  at delivery commit `2192cf277701de7d193946900b08276340066104` (blob
  `4a115217ba960ca94b0f06770a8f960441bbfd7f`), reached through the branch locator
  `research/r4-opening-claim-map`, which pointed at that commit when fetched. The handoff
  is a later author-side instruction and is not part of the five-file input.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in Claude Code remote session
  `session_019WhW6Q1NX4NtRAz8fUPBXC`. The session service reported both
  `session_context.model` and `external_metadata.last_served_model` as `claude-fable-5-1`.
  Exact model-build identity beyond that identifier is not available as authenticated
  runtime metadata.
- **Author.** The reviewed increment records OpenAI Codex assistance in the existing
  authoring context, with no separate investigator. The reviewer shares no context with
  that authoring session.
- **Prior involvement.** None. This session had not read, reviewed or authored any part of
  the input, the handoff or the parent before this review. The preserved reviews under
  `review-inputs/r4-*` record the same model identifier in other sessions; independence
  is at the model, provider and work-context level relative to the author. It is not
  human-investigator independence and is not claimed as such.
- **Assistance.** No other model, service or person contributed. Code executed: the
  repository's own validation tooling (`pnpm format:check`, `lint:markdown`, `typecheck`,
  `validate`, `check:generated`) and git object inspection. No submitted or reviewer-written
  numerical script was run; the handoff states numerical reproduction is not required for
  this prose-only increment, and its numerical inputs are unchanged from the parent.
- **Not performed.** No source acquisition, purchase, external message, access-control
  circumvention, merge, RFC action, identifier allocation, Release 3 change or steward
  decision.

## 3. Exact identity

All objects were fetched by exact commit; the branch name was used only as a locator.

| Object                                                                   | Handoff value | Observed                                   |
| ------------------------------------------------------------------------ | ------------- | ------------------------------------------ |
| Input commit                                                             | `964fe864…`   | `964fe8640399a984e42723ad3e6247971c067fc8` |
| Parent (accepted main baseline)                                          | `ed6e9d9b…`   | `ed6e9d9bde691556b99d22e261b31c3b25df338f` |
| Input tree                                                               | `24d71fef…`   | `24d71fef73724303fe351c0bd063445b741ca744` |
| `governance/drafts/release-4-preparation/README.md`                      | `f54579e5…`   | `f54579e51c080411044a22599c57cac71773d847` |
| `governance/drafts/release-4-preparation/public-discussion-readiness.md` | `862585b1…`   | `862585b1b2a0a4e39b76bf82fa268a1711f3c3fd` |
| `governance/drafts/release-4-preparation/opening-claim-map.md`           | `5c2c65e3…`   | `5c2c65e37127d06c07bbcf0a8f3c01843ae2d3e8` |
| `governance/drafts/release-4-preparation/rfc-impact-inventory.md`        | `1b2c22e0…`   | `1b2c22e08eb48592ad153752321217c9e597ccc3` |
| `governance/drafts/release-4-preparation/rfc-preparation-draft.md`       | `58cb18b0…`   | `58cb18b01883f860549a0407e7c842585e7fd4e0` |
| Delivery commit                                                          | locator only  | `2192cf277701de7d193946900b08276340066104` |
| Delivery tree                                                            | not listed    | `8668be98e056fa5b228567da591ba509feb1d5a9` |
| Handoff blob                                                             | not listed    | `4a115217ba960ca94b0f06770a8f960441bbfd7f` |

Diff shape: parent to input changes five files (one added, four modified; 208 insertions,
49 deletions), input to delivery adds the handoff only (80 insertions). The input commit
has the parent as its sole parent. Every hash in the handoff table matches.

Which tree was validated: the **delivery** tree. The fixed input tree was additionally
checked by removing the handoff from the working tree (confirmed identical to
`24d71fef…`) and running `pnpm validate`; it fails only on
`[link-audit] governance/drafts/release-4-preparation/README.md: broken link opening-preparation-handoff.md`.
That is the disclosed consequence of the README link being resolved by the delivery
commit, not a defect in the reviewed prose (N-3).

## 4. Governance inputs read and preservation checks

Read in the order required by `AGENTS.md`: `CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`,
`governance/ID-POLICY.md`, `governance/RFC.md`; then `spec/AGENTS.md`, `spec/README.md`,
`spec/profiles/README.md`, ADR-0032, `governance/RELEASE-POLICY.md`,
`registries/stability-tiers.yaml`, the programme acceptance record, the final scaling
acceptance paragraph, the Release 3 preparation README, the preserved reviews under
`review-inputs/r4-programme-audit/` and `review-inputs/r4-power-scale-exploration-close/`,
the QR review intake and the 2026-09-08 source follow-up.

Preservation: `git diff --name-only ed6e9d9b… 2192cf27…` lists exactly the five input
files plus the handoff. No path under `evidence/`, `review-inputs/`, `probes/`,
`spec/`, `schemas/`, `registries/`, `authority/`, `conformance/`, `generated/` or the
Release 3 preparation directory differs. `pnpm check:generated` reports all 19 generated
files in sync.

## 5. Acceptance updates against the parent records

| Statement in the input                                                                                                                                                                               | Check against the parent                                                                                                                                                                                                                                                                                    | Result   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| README: scaling exploration "accepted separately through PR 234 after PR 235 review and the C-1 repair"; acceptance paragraph "does not close public-opening conditions"                             | The final scaling acceptance paragraph records steward acceptance of PR 234 head `bc0f7452…` "including the C-1 correction", states it is not an additional independent review and keeps R4-P1 through P6 open and readiness `NOT_READY`. PR 235 is the closed review PR whose two records PR 234 preserved | accurate |
| Readiness: "SF-1 is closed; SF-2 is closed on substance, with the subsequent author-side C-1 repair included in the steward-accepted PR 234 input. This is not a new independent C-1 close verdict." | The close review at `review-inputs/r4-power-scale-exploration-close/` reviewed `a45590d5…` and returned SF-1 `CLOSED`, SF-2 `CLOSED` on substance with C-1 `SHOULD-FIX`. `bc0f7452…` (the C-1 repair) has `a45590d5…` as parent and was never independently re-reviewed; only steward acceptance covers it  | accurate |
| Readiness PR 225 row: "bounded closure accepted through PR 229, as recorded in the programme acceptance"                                                                                             | The programme acceptance accepts PR 229 head `1d4d5360…` and the PR 232 review `510cad76…`, including "the bounded audit GO and SF-R1/SF-R2 closure"                                                                                                                                                        | accurate |
| Readiness: "Neither decision closes an opening condition"                                                                                                                                            | Both acceptance records say so in their own words                                                                                                                                                                                                                                                           | accurate |
| Inventory status: "reviewed through PR 225/232 and accepted through PR 229"                                                                                                                          | Same records                                                                                                                                                                                                                                                                                                | accurate |

The three-way distinction the handoff asks to preserve (SF-2 substantive closure by the
close review, the author-side C-1 repair, steward acceptance of the repaired input) is
preserved in every place the input mentions it. No new independent C-1 close verdict is
claimed anywhere in the input, and this review does not supply one.

## 6. Claim map: eight rows

Each row was checked for an unsupported claim, an implicit interval or multiplicity
choice, an invented source requirement and a silent waiver of S1-S6/P1.

| Row                                      | Finding                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Design and signed quantities             | Correctly names the population/sample distinction as the required review outcome. The readiness contrasts are sample quantities: with cell means `m00, m01, m10, m11`, `dA`, `dB` are the Yates main effects (differences of level averages) and `dAB = m00-m01-m10+m11`; the coded-coefficient statements `dAB/4` and factorial-effect `dAB/2` are algebraically correct. The readiness text itself never says "sample" (S-4) |
| Arithmetic decomposition                 | "Exploratory evidence" is the right register. The PR 218 review (SS/F probe) and PR 232 review (scale fixture, corpus) are the reviews that reconstructed exact-input algebra; no finite corpus is called a proof or a supported domain                                                                                                                                                                                        |
| Classical marginal F calibration         | Retained as an intended claim pending S1/S5; "accepted NIST/LAPACK copies have a narrower supporting role" matches the bounded `COMPLETE_ON_PROVIDED_COPIES` acceptance. This is the only row that retains an inferential claim without primary support, and it says so                                                                                                                                                        |
| Confidence intervals                     | Explicitly undecided: no level, no pointwise/simultaneous choice. No implicit interval semantics                                                                                                                                                                                                                                                                                                                               |
| Familywise or false-discovery guarantees | Explicitly none proposed; the shared-denominator caution matches the readiness numerical table. No implicit multiplicity semantics                                                                                                                                                                                                                                                                                             |
| Historical attribution and normalization | S2 and P1 stay visible with the same wording as the hold map; attribution is separated from mathematical definition                                                                                                                                                                                                                                                                                                            |
| Wider designs and alternative inference  | S3/S4 incomplete and S6 unexecuted are restated; the required outcome is an explicit decision on S6, not a waiver. Consistent with the readiness work order and with the handoff's steward-disposition rule                                                                                                                                                                                                                    |
| Runtime computation and comparison       | All graph, bound, tolerance, resource and platform choices left open; the PR 190 restriction (numerator df one, positive even residual df) is stated the same way as the readiness table                                                                                                                                                                                                                                       |

Completion packet: Cochran and Yates are named as candidates with an explicit
alternative-original clause; no purchase, download or named-file requirement is
imposed; the NIST/LAPACK provided-copy status is preserved. One sentence about raw HTML
equality reads as a relaxation of the raw-versus-extracted traceability distinction
requested by the QR intake and close review (N-2).

Population targets versus sample estimates: no document in the input names a population
target for `dA`, `dB` or `dAB`. The claim map treats that as open work, which is correct;
the readiness scope section, the outsider-facing text, presents the same quantities as
"signed main effects and difference-in-differences" without the word "sample" (S-4).

## 7. Contract/Profile/Public Check allocation

Checked against ADR-0032 (Contract owns the bounded operation; Profile binds context and
declarations; Public Check owns recomputation/comparison identity), ID-POLICY (minting
grammar, `contract` family, `NRS-CONTRACT-<TOKEN>` / `NRS-PROFILE-<TOKEN>` namespaces
registered in `registries/requirements.yaml` before issue) and the authority manifest.

- The revised path table's division (operation semantics under Contract, contextual
  declarations under Profile, recomputation under Public Check) follows ADR-0032. The
  inventory correctly says the earlier Profile-only placement is superseded as a
  recommendation only, creates no normative destination and allocates no token or ID.
- Six clause-subject rows: ownership is clear for factor/level order, hypotheses,
  admissibility conditions, calculation quantities, Public Check rule and version, and
  schemas/fixtures. Two problems: "declared model assumptions" appears under Contract
  admissibility and "assumption declarations" under Profile declarations (S-2); the
  JSON-level Contract-identity binding required by ADR-0032 §1 has no named owner (N-1).
- `spec/contracts/` does not exist and has no precedent in `spec/README.md`'s layout table
  or in the manifest's `normative-meaning` target, which enumerates files under
  `spec/core`, `spec/profiles`, `spec/verification` and `spec/versioning`. The inventory
  discloses the release-named conformance directory as a possible new convention but
  gives `spec/contracts/` no equivalent disclosure and does not list `spec/README.md` as a
  coupled change (S-3).
- The RFC draft still carries a paragraph describing the path table as having an
  "explicit unresolved Contract/Profile allocation" and a "provisional layout"; the same
  document's new closing section describes the revised concrete allocation (S-1).

## 8. Release 3 pins and release-order interpretation

- `governance/drafts/release-3-preparation/README.md` at the parent is blob
  `4dbb5170f839f83ef22d3297dae832098d5cc95d`; `readiness-audit-2026-09-06.md` is blob
  `bc0bb942d429fe9a9ee4e959ea483972d4dbae4d`. Both match the RFC draft.
- The conditional dependency table keeps every R3 reuse conditional and says to repeat the
  comparison against the exact final scope before R4-P4 is treated as resolved. No R3
  scope or release number changes.
- Release order: `governance/RFC.md` defines stages, a research gate and tier windows; it
  contains no condition that a lower-numbered release's discussion must open first.
  `governance/RELEASE-POLICY.md` governs Release 1 commit roles and gates only.
  `registries/stability-tiers.yaml` carries windows only. The Release 3 README's "Release
  4 handoff" section calls its findings "evidence reuse, not automatic Release 4 adoption"
  and imposes no ordering. The author's statement that no numerical-release-order
  condition was found is therefore correct for the inspected process, and the text
  correctly labels the conclusion as an interpretation for review rather than a
  permission. Whether a steward wants a calendar ordering as policy is a steward
  question, not something this review can settle.

## 9. Preparation completeness versus opening readiness

R4-P1 through R4-P6 remain open; nothing in the input claims otherwise. Still incomplete:
exact proposed clauses and their Requirement-ID treatment, the enclosing schema/report
and strict-input crosswalk, and the highest actually affected tier. No discussion clock,
window, URL or method support is authorized by the input or by this review.

**Next concrete item.** Execute the primary-source completion packet for S5 (and the S1
part it depends on): identify and inspect the exact pages that establish the normal
fixed-effects model, independent errors with common variance, the F null distribution
and the residual degrees of freedom for four equal cells, with Cochran and Yates as
candidates or a mapped alternative original, returning the packet's five items. Reason:
"Classical marginal F calibration" is the only claim-map row that retains an
inferential claim, and the interval decision, the S6 staging decision and the tier
assessment all depend on what that support turns out to cover. The clause/ID crosswalk
for R4-P5 can proceed in parallel but cannot close before the scope is
source-supported.

## 10. Findings

### BLOCKER

None.

### S-1 (`SHOULD-FIX`) - stale "unresolved allocation" paragraph in the RFC draft

`rfc-preparation-draft.md`, section "Programme audit qualifications", still says to read
the impact path table "with its explicit unresolved Contract/Profile allocation; no
Profile-owned statistical operation is selected by that provisional layout". The same
input revises that table to a concrete Contract/Profile/Public Check proposal and says
so in "Proposed opening decision and sequence". Date-qualify the older paragraph as the
state at the PR 227 audit, or replace it with a pointer to the revised allocation, so
one document does not describe the placement as both unresolved and proposed.

### S-2 (`SHOULD-FIX`) - model assumptions listed under two owners

`rfc-impact-inventory.md`, clause-subject table: "declared model assumptions" is a
Contract admissibility subject and "assumption declarations" is a Profile subject. The
Contract row's own boundary says checkable data conditions are separate from scientific
assumptions that cannot be proved from a Record, which points the assumption
declarations at the Profile under ADR-0032. Assign the assumption declaration to exactly
one owner. If the intent is that the Contract states its mathematical premises (the
model it defines) while the Profile carries the applicability assertion, say that
explicitly so the two rows do not read as one meaning in two places.

### S-3 (`SHOULD-FIX`) - `spec/contracts/` is an undisclosed new directory convention

The path table proposes three files under `spec/contracts/balanced-two-factor/`. No
such directory exists; `spec/README.md`'s layout table and the authority manifest's
`normative-meaning` target enumerate only `spec/core`, `spec/profiles`,
`spec/verification`, `spec/versioning`, `spec/attestation`, `spec/approval`,
`spec/emission` and `spec/extensions`. The inventory discloses the release-named
conformance directory as "a possible new grouping convention, not an established
repository pattern" but gives `spec/contracts/` no equivalent sentence, and does not list
`spec/README.md` among coupled changes. Add the same disclosure, and add `spec/README.md`
(layout row) and the manifest target assignment as coupled changes.

### S-4 (`SHOULD-FIX`) - readiness presents sample contrasts as "effects" without saying so

`public-discussion-readiness.md`, "Proposed first discussion scope": `dA`, `dB` and `dAB`
are computed from cell means and described as "signed main effects and
difference-in-differences". The claim map calls the same quantities "signed sample
contrasts" and makes the population/sample distinction a required review outcome. The
readiness document is the outsider-facing text; state there that these are sample
estimates of population contrasts whose exact definition is still under review. Also
complete the normalization note: it gives the coded/factorial distinction for the
interaction only (`dAB/4` versus `dAB/2`), while the coded main-effect coefficients are
`dA/2` and `dB/2`. Both statements were checked algebraically by the reviewer; no value
in the input is wrong.

### N-1 (`NICE-TO-HAVE`) - name an owner for the Contract-identity binding in JSON

ADR-0032 §1 requires a successor Record schema to bind the Contract identity directly
(an `analysis.contract_id`-style field owned by that schema). The six-row table's
"Coupled schemas and fixtures" row lists "Structure" and "exact version binding" only,
and the Profile row's "exact Contract binding" is a prose binding. Add the JSON-level
Contract-identity binding, and the claim-object separation (target, protected family,
error criterion, result class) that the R3 reuse table calls an architecture candidate,
as named subjects with an owner.

### N-2 (`NICE-TO-HAVE`) - clarify the raw HTML sentence in the completion packet

"raw HTML equality is not required for dynamic pages when content can be compared" can be
read as relaxing the raw-versus-extracted traceability distinction that the QR intake
and close review asked for. If the intent is only that two retrievals of a dynamic page
need not be byte-identical, say that, and keep the requirement to record raw and
extracted forms separately with their hashes.

### N-3 (`NICE-TO-HAVE`) - the fixed input does not validate standalone

At `964fe864…` the README links to `opening-preparation-handoff.md`, which the delivery
commit adds; `pnpm validate` on the input tree alone fails the link audit. The handoff
discloses this. For future increments, add the navigation link in the same commit as the
linked file so the fixed editorial input is self-validating.

### N-4 (`NICE-TO-HAVE`) - add the scaling reviews to the review-state table

The readiness "Review state and review scope" table has no rows for the two scaling
reviews; they appear in prose only. Rows with their exact inputs (original review of
`431ac4e6…`, close review of `a45590d5…`) and results would keep the table complete.

## 11. Separate primary-source work

Not performed. This session did not attempt to acquire, download or purchase any source
and did not send any external message, so no new access limitation is reported. The
claims that remain without inspected primary support are exactly those the hold map
records: S1 (Yates original), S5 (normal-model, independence, common-variance, F null
and residual-df support for the retained F calibration and any interval), S2 (Williams
full text) and P1 (normalization source-version and formula ambiguity). S3, S4 and S6
remain open research obligations, not closed by omission. The accepted NIST/LAPACK
`COMPLETE_ON_PROVIDED_COPIES` status is preserved. No narrowed scope or S6 staging is
proposed by this review.

## 12. Validation record

Environment: Node v22.22.2, pnpm 11.7.0, `pnpm install --frozen-lockfile`, delivery tree
`8668be98…` at commit `2192cf27…`.

| Check                                               | Result                                                                                                      |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                                 | pass                                                                                                        |
| `pnpm lint:markdown`                                | pass (388 files, 0 issues)                                                                                  |
| `pnpm typecheck`                                    | pass                                                                                                        |
| `pnpm validate`                                     | pass                                                                                                        |
| `pnpm check:generated`                              | pass (19 generated files match)                                                                             |
| `git diff --check` (input to delivery)              | clean                                                                                                       |
| `pnpm validate` on the fixed input tree `24d71fef…` | fails only on the README's handoff link (link audit); see Section 3                                         |
| Aggregate `pnpm check`                              | not run; no authoritative, registry, schema, conformance, reference, generated or evidence artifact changed |

After adding this review file the same five checks were re-run on the review branch and
pass; the result is recorded in the review pull request.

## 13. Bounded verdict

| Item                                     | Disposition                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Fixed input `964fe864…` (five files)     | Preparation **`GO`** (bounded) with S-1 through S-4 to repair before the next editorial increment relies on it |
| Delivery commit `2192cf27…` (handoff)    | Validated; accurate description of the input and of the tree-versus-input distinction                          |
| Acceptance wording                       | Accurate; SF-2 closure, C-1 repair and steward acceptance preserved as distinct facts                          |
| Claim map                                | No unsupported claim, implicit semantics, invented source requirement or waiver                                |
| Contract/Profile/Public Check allocation | Consistent with ADR-0032 and ID-POLICY; ownership repairs S-2, S-3, N-1                                        |
| R3 pins and order                        | Verified; interpretation fairly labelled; steward question remains                                             |
| R4-P1 through R4-P6                      | Open; unchanged                                                                                                |
| S1-S6, P1                                | Open; unchanged                                                                                                |
| Public opening                           | **`NOT_READY`**; no R4-P6 opening GO                                                                           |
| Next item                                | S5/S1 primary-source completion packet (Section 9)                                                             |

RELEASE 4 OPENING PREPARATION REVIEW COMPLETE - INPUT MATCH - PREPARATION GO WITH FOUR SHOULD-FIX WORDING/OWNERSHIP REPAIRS - NO UNSUPPORTED CLAIM - NO HOLD CLOSED - NOT AN OPENING GO - NOT READY TO OPEN - NEW-SESSION REVIEW DISCLOSED - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
