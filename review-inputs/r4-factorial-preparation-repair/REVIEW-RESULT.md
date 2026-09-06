# Release 4 Factorial Research Preparation — Close-Only Review of the Issue-Body Repairs

**Status: informative independent close-only review result; non-normative; not adopted.**
This record examines only whether the repaired bodies of Issue #177 and Issue #178 close
the four `SHOULD-FIX` findings S-1 through S-4 recorded in the preserved independent
review of the Release 4 research preparation package. It does not re-review the
preparation package, does not evaluate any factorial methodology, semantics, numerical
method, or primary source, and selects no Contract, procedure, identifier, schema,
Public Check, tolerance, support domain, RFC decision, or release outcome. Attribution is
role-based only.

## 1. Final disposition

**`GO`**

- S-1: `CLOSED`
- S-2: `CLOSED`
- S-3: `CLOSED`
- S-4: `CLOSED`
- New `BLOCKER` findings: 0
- New `SHOULD-FIX` findings: 0
- New `NICE-TO-HAVE` findings: 0

`GO` means only that the repaired bodies of Issue #177 (SHA-256 `6da2af2a…`) and of
Issue #178 (SHA-256 `362e6033…`), as identified in Section 5, close S-1 through S-4 of
the original review, and that the semantic investigation under Issue #177 and the
preliminary numerical phase under Issue #178 may each start on the fixed commit
`58675e66dbf263c94688d47867c731ad4efddbf6`. Section 13 states the exact limits.

## 2. Reviewer role and independence

| Field                 | Value                                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Reviewer role         | independent close-only reviewer of the Issue #177 and Issue #178 body repairs                                                                                                                                                                                                                                |
| Independence boundary | did not author, propose, draft, or apply the body repairs to Issue #177 or Issue #178; did not author the original review result (blob `0529de44…`) or its branch; did not author, revise, or integrate the Release 4 preparation README, either commission, the release-horizon change, PR #176, or PR #179 |
| Inspection scope      | S-1 through S-4 of the original review, their close conditions, the regression list in Section 10, and the `NICE-TO-HAVE` items N-3, N-4, and N-5; nothing else was re-reviewed                                                                                                                              |
| Evidence basis        | fixed Git objects of the public repository; the live public bodies of Issue #177, Issue #178, and their steward comments and the PR #179 comment, read directly from the hosting service through its API at the time recorded below; no summaries, paste-ins, or memory                                      |
| Inspection date       | 2026-09-06, between `10:27Z` and `10:31Z` (UTC)                                                                                                                                                                                                                                                              |
| Private material      | none read; no private repository, private path, non-public document, or Release 4 primary source was used                                                                                                                                                                                                    |
| Software identity     | intentionally not recorded, per the repository's neutral-provenance rule                                                                                                                                                                                                                                     |

## 3. Original review identity

All values were recomputed from Git objects in a fresh clone of the public repository.

| Field                                       | Expected                                                           | Observed                                                                  | Result |
| ------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- | ------ |
| Review input commit                         | `58675e66dbf263c94688d47867c731ad4efddbf6`                         | `git rev-parse origin/main` same; object type `commit`                    | match  |
| Review input tree                           | `a1c81b6480d5518271c1a4787cf9ab0879f6c2af`                         | `git rev-parse 58675e66…^{tree}` same                                     | match  |
| Original review result commit               | `4a68ef6ef54a76007ebda223993f3fbf67034a67`                         | `git cat-file -p` succeeds; type `commit`                                 | match  |
| Sole parent of the result commit            | `58675e66dbf263c94688d47867c731ad4efddbf6`                         | exactly one `parent` line in `git cat-file -p 4a68ef6e…`, same value      | match  |
| Original review path                        | `review-inputs/r4-factorial-preparation/REVIEW-RESULT.md`          | `git diff --name-status 58675e66… 4a68ef6e…` lists exactly this path, `A` | match  |
| Original review result blob                 | `0529de440afb9ec88a223f1511fa0eb519a2c184`                         | `git rev-parse 4a68ef6e…:<path>` same                                     | match  |
| Review branch head at start of this review  | `4a68ef6ef54a76007ebda223993f3fbf67034a67`                         | `git rev-parse origin/review/r4-factorial-preparation-20260906` same      | match  |
| `AGENTS.md` and `governance/RFC.md` at head | blobs `94dbfdce…` and `9fa3bdd2…` (as in the original Section 4.2) | identical blobs at `58675e66…` and at `4a68ef6e…`                         | match  |

`IDENTITY_MISMATCH` does not apply.

## 4. PR #179 head verification

| Field           | Observed                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------- |
| PR #179 state   | open, not merged, not draft; `mergeable_state` `clean`; 1 commit; 1 changed file; +396 lines |
| PR #179 head    | `review/r4-factorial-preparation-20260906` at `4a68ef6ef54a76007ebda223993f3fbf67034a67`     |
| PR #179 base    | `main` at `58675e66dbf263c94688d47867c731ad4efddbf6`                                         |
| PR last updated | `2026-09-06T09:54:41Z` (the steward repair completion note, Section 5.3)                     |

The head equals the original review result commit. `HEAD_MOVED` does not apply. The
close-only result in this file is committed as the sole child of `4a68ef6e…` on the same
branch; the original result blob is not modified (Section 14).

## 5. Issue body identity verification

### 5.1 Method

Each issue's `body` field was obtained directly from the hosting service's issue API,
encoded as UTF-8 exactly as returned, and hashed with SHA-256. Title, metadata, rendered
HTML, comments, and any trailing newline were excluded. A local clone was not used for
this step.

### 5.2 Repaired bodies

| Issue | Expected SHA-256                                                   | Observed SHA-256                                                   | Expected bytes | Observed bytes | Result |
| ----- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | -------------- | -------------- | ------ |
| #177  | `6da2af2a510d80289be5c5c8b3e885c0172332f18fec8c8cfbd602945158cf7e` | `6da2af2a510d80289be5c5c8b3e885c0172332f18fec8c8cfbd602945158cf7e` | 3974           | 3974           | match  |
| #178  | `362e603339f81ca72de3f3578a73b1c530ce3d0ead8dbc29e66a7c5187bf3b41` | `362e603339f81ca72de3f3578a73b1c530ce3d0ead8dbc29e66a7c5187bf3b41` | 4242           | 4242           | match  |

`ISSUE_BODY_MISMATCH` does not apply. Both issues are open with one comment each and no
linked closing pull request.

The pre-repair identities recorded by the original review (Issue #177: `f548fab9…`,
2856 bytes; Issue #178: `5d6a75e5…`, 3169 bytes) differ from the values above. That
difference is the expected effect of the repair and is not a finding. The pre-repair bodies themselves
are not retrievable through the issue API; their identity is taken from the original
review (Section 4.3 there) and from the steward records below.

### 5.3 Steward records

| Record                                        | Content checked                                                                                                                                                                                                             | Result     |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Issue #177 "Steward issue-body repair record" | fixed commit `58675e66…` and tree `a1c81b64…`; repaired-body time `2026-09-06T09:52:49Z`; repaired length `3974`; repaired SHA-256 `6da2af2a…`; previous SHA-256 `f548fab9…`; repairs listed as S-1, S-2, N-4, N-5          | consistent |
| Issue #178 "Steward issue-body repair record" | fixed commit and tree as above; repaired-body time `2026-09-06T09:53:28Z`; repaired length `4242`; repaired SHA-256 `362e6033…`; previous SHA-256 `5d6a75e5…`; repairs listed as S-3, S-4, N-3, N-4                         | consistent |
| PR #179 "Steward repair completion note"      | both repaired lengths and SHA-256 values as above; fixed preparation commit unchanged; closure targets S-1/S-2 in #177, S-3/S-4 in #178, N-3/N-4/N-5; states that the original review disposition is not revised            | consistent |
| Ordering of the recorded times                | each repair time precedes its repair-record comment (`09:54:10Z`, `09:54:20Z`) and the PR note (`09:54:41Z`); the issue API exposes no separate body-edit timestamp, so the repair times are recorded as stated, not proven | consistent |

Both steward records state that they are not an independent close-only review and not a
Release 4 authority action; nothing in them was treated as authority.

## 6. S-1 close result — Release 3 semantic review pins

**`CLOSED`**

Original close condition: Issue #177 lists the three review blobs (with the reviewed
heads they record); the later semantic result records them among its inputs.

Issue #177, "Fixed repository inputs", now carries three lines naming path, blob, and
reviewed head for the preserved full review, the first-repair close-only review, and the
final-repair close-only review of the Release 3 semantic result. Every value was
recomputed at the fixed commit.

| Review pinned in Issue #177 | Path in issue                                                                     | Blob in issue | `git rev-parse 58675e66…:<path>`           | Reviewed head in issue | Head object | Head named inside the review file | Result |
| --------------------------- | --------------------------------------------------------------------------------- | ------------- | ------------------------------------------ | ---------------------- | ----------- | --------------------------------- | ------ |
| Full review                 | `review-inputs/r3-independent-multigroup-semantics/REVIEW-RESULT.md`              | `fc61decb…`   | `fc61decb017821c403841a6db822ccd5e5b7233d` | `03dce3ec…`            | `commit`    | yes ("Reviewed exact head")       | match  |
| First-repair close-only     | `review-inputs/r3-independent-multigroup-semantics-repair/REVIEW-RESULT.md`       | `e6464295…`   | `e646429582d206d5299ce5ff1d0c2b8978323cd3` | `45392950…`            | `commit`    | yes ("Repaired exact head")       | match  |
| Final-repair close-only     | `review-inputs/r3-independent-multigroup-semantics-final-repair/REVIEW-RESULT.md` | `395054fd…`   | `395054fd1e2f22a5ad63460b86be0394de429605` | `778f295e…`            | `commit`    | yes ("Reviewed exact head")       | match  |

Supplementary cross-check, not required by the close condition: at reviewed head
`778f295e…` the Release 3 semantic result path resolves to blob `8f215260…`, the same blob
Issue #177 pins as the current Release 3 semantic result; at `03dce3ec…` and
`45392950…` it resolves to `e21df31a…` and `30474af9…`, which is the chain the
final-repair review itself records. The three directories are the only
`review-inputs/r3-independent-multigroup-semantics*` entries in the tree at
`58675e66…`, so the commission's requirement to pin "its preserved independent reviews"
is met in full. The remaining pins in Issue #177 (README, semantic commission, Release 3
semantic result, source-acquisition result, SR-L repair review with source commit
`1e220f67…`, original numerical review with source commit `32e9f3c5…`) were also
recomputed and match, both at `58675e66…` and at their stated source commits.

The second half of the original close condition (the semantic result records the pins
among its inputs) concerns a result that does not exist yet; it is a condition on the
future result, not on the issue, and is carried forward to that result's exact-head
review.

## 7. S-2 close result — semantic investigator independence

**`CLOSED`**

Original close condition: Issue #177 carries the boundary; the result's identity section
records non-authorship of the package.

Issue #177, "Work authorization", second paragraph: "Independence requirement: the
investigator must not have authored or revised the Release 4 preparation README, either
Release 4 commission, the release-horizon change, or PR #176. The result's identity
section must record this non-authorship boundary explicitly."

| Required non-authorship element                 | Text in Issue #177                                        | Result  |
| ----------------------------------------------- | --------------------------------------------------------- | ------- |
| Release 4 preparation README                    | "the Release 4 preparation README"                        | present |
| Both Release 4 commissions                      | "either Release 4 commission"                             | present |
| Release-horizon change                          | "the release-horizon change"                              | present |
| PR #176                                         | "or PR #176"                                              | present |
| "authored" and "revised" both excluded          | "must not have authored or revised"                       | present |
| Result identity section must state the boundary | "The result's identity section must record … explicitly"  | present |
| Independence named against specific artifacts   | the four artifacts above, not the bare word "independent" | present |

The sentence is phrased as a requirement ("must not"), names every artifact the original
finding listed, and binds the result's identity section. The commission blob
`f1a75907…` is unchanged and still states the narrower implementation-only boundary; the
issue's stronger boundary adds to it and does not contradict it. The pinned commission's
own sentence "Assign this work to an investigator independent of any future Release 4
semantic or numerical implementation" remains in force alongside the issue text.

## 8. S-3 close result — form of the preliminary numerical result

**`CLOSED`**

Original close condition: Issue #178 carries the rule; the preliminary result's summary
states `INPUT_INCOMPLETE` and uses preliminary labels only.

Issue #178, "Preliminary task now allowed", last paragraph, read with the "Work
authorization" and final paragraphs.

| Required element                                                                         | Text in Issue #178                                                                                                                                                                                                                                                                    | Result  |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Programme disposition of a preliminary-only result is `INPUT_INCOMPLETE`                 | "A preliminary-only result must return programme disposition `INPUT_INCOMPLETE`."                                                                                                                                                                                                     | present |
| Per-entry assessments use a `PRELIM-*` form distinct from the final vocabulary           | "Every per-entry assessment must use an explicitly defined `PRELIM-*` label distinct from the final commission vocabulary."                                                                                                                                                           | present |
| The preliminary label is explicitly defined in the result                                | "explicitly defined `PRELIM-*` label"; the issue and the pinned commission define no `PRELIM-*` label themselves, and the result is the only file the investigator may create, so the definition can lawfully appear only inside the result                                           | present |
| No final per-entry vocabulary before a successor bound to the reviewed semantic handoff  | "The final labels `NUMERIC_FEASIBLE`, `ORACLE_ONLY`, `DEFER`, `NO_GO` … must not be assigned until a successor result is bound to the independently reviewed semantic handoff."                                                                                                       | present |
| No final programme disposition other than `INPUT_INCOMPLETE` before the semantic handoff | "… and the final programme dispositions other than `INPUT_INCOMPLETE` must not be assigned until a successor result is bound to the independently reviewed semantic handoff."; "A final numerical programme disposition is prohibited until the reviewed semantic result is pinned …" | present |
| Unresolved semantic choices are not filled with assumptions                              | "Execute only self-contained probes whose meaning does not require unresolved semantic choices."; "Record dependent sections as `INPUT_INCOMPLETE` or preliminary rather than filling them with assumptions."                                                                         | present |

Adversarial readings attempted on the repaired text:

| Attempted reading                                                                                                  | Blocking text                                                                                                                                                                                                                             | Outcome   |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Assign `NUMERIC_FEASIBLE` to the three Candidate A tests in the preliminary result                                 | `NUMERIC_FEASIBLE` is named in the prohibited list; "must not be assigned until a successor result is bound to the independently reviewed semantic handoff"                                                                               | prevented |
| Add an "expected final disposition" column carrying final labels                                                   | "Every per-entry assessment must use an explicitly defined `PRELIM-*` label"; such a column is a per-entry assessment and would not use a `PRELIM-*` label                                                                                | prevented |
| Report no programme disposition, leaving the summary silent                                                        | "must return programme disposition `INPUT_INCOMPLETE`"                                                                                                                                                                                    | prevented |
| Report `NARROW` or `DEFER` as the preliminary programme disposition                                                | "the final programme dispositions other than `INPUT_INCOMPLETE` must not be assigned"                                                                                                                                                     | prevented |
| Use a preliminary label that coincides with a final label (for example `PRELIM` as a prefix on `NUMERIC_FEASIBLE`) | the `PRELIM-*` form is by construction outside the commission's `NUMERIC_FEASIBLE` / `ORACLE_ONLY` / `DEFER` / `NO_GO` / `INPUT_INCOMPLETE` set; the label must be "distinct from the final commission vocabulary" and explicitly defined | prevented |
| Bind the successor to an unreviewed semantic draft                                                                 | "bound to the independently reviewed semantic handoff"; final paragraph requires "a separate-context exact-head primary-source and numerical review"                                                                                      | prevented |
| Fill a semantics-dependent section with an assumed hypothesis or degrees of freedom                                | "Execute only self-contained probes whose meaning does not require unresolved semantic choices"; "rather than filling them with assumptions"                                                                                              | prevented |
| Treat the preliminary result as informing an RFC or implementation                                                 | "Until then the result remains preliminary and cannot inform an RFC, design freeze, implementation, or public-opening decision."                                                                                                          | prevented |

Observation, no finding: `INPUT_INCOMPLETE` belongs to both the per-entry and the
programme vocabulary of the pinned commission, and the issue allows dependent
"sections" to be recorded as `INPUT_INCOMPLETE`. A per-entry `INPUT_INCOMPLETE` asserts no
feasibility, so it opens no preliminary-read-as-final path; the entry-level `PRELIM-*`
rule still governs every assessment that does assert something.

The second half of the original close condition (the preliminary result's summary states
`INPUT_INCOMPLETE` and uses preliminary labels only) concerns a result that does not
exist yet and is carried forward to that result's exact-head review.

## 9. S-4 close result — Candidate B erratum

**`CLOSED`**

Original close condition: Issue #178 carries the erratum; the numerical result records B
as balanced in its coverage matrix.

Issue #178 has a dedicated section "Binding candidate erratum": "The candidate
definitions in the preparation README govern. Read numerical commission Question 11 as
follows: Candidate B is the complete balanced replicated `a × b` design and is assessed
for rank and dimension consequences of general balanced factor sizes; Candidate C is the
unbalanced complete two-factor design and is assessed for non-orthogonality,
matrix-rank, pivoting, generalized-inverse, or iterative behavior. Do not treat
Candidate B as unbalanced."

| Required element                                                                                  | Text in Issue #178                                                                                  | Result  |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------- |
| README candidate definitions prevail                                                              | "The candidate definitions in the preparation README govern."                                       | present |
| Candidate B is the complete balanced replicated `a × b` design                                    | "Candidate B is the complete balanced replicated `a × b` design"                                    | present |
| Candidate C is the unbalanced complete two-factor design                                          | "Candidate C is the unbalanced complete two-factor design"                                          | present |
| Candidate B is not treated as unbalanced                                                          | "Do not treat Candidate B as unbalanced."                                                           | present |
| Candidate B assessed for rank and dimension effects of general balanced factor sizes              | "assessed for rank and dimension consequences of general balanced factor sizes"                     | present |
| Candidate C assessed for non-orthogonality, matrix rank, pivoting, generalized inverse, iteration | "assessed for non-orthogonality, matrix-rank, pivoting, generalized-inverse, or iterative behavior" | present |
| Binding form                                                                                      | section title "Binding candidate erratum"; "govern"; "Read … as follows"; "Do not treat"            | present |

The erratum matches the README table at blob `34fa11bd…` (B: "Complete balanced
replicated `a × b`, two fixed factors with arbitrary finite levels"; C: "Unbalanced
complete two-factor fixed-effects design"). The issue's shorter phrase for C omits
"fixed-effects", but the README is declared to govern, so no second definition of C is
created. The commission blob `48836247…` is unchanged and the issue does not claim
otherwise (Section 10). The second half of the original close condition (the numerical
result's coverage matrix records B as balanced) is carried forward to that result's
exact-head review.

## 10. Regression check on the repaired text

The pre-repair bodies are not retrievable from the issue API. The changed sentences were
identified from the steward repair records and from the original review's quotations of
the pre-repair text; to avoid depending on that identification, every item below was
checked against the entire current body of each issue.

| Regression tested                                                                | Evidence in the repaired bodies                                                                                                                                                                                                                                                                                                 | Result |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| New Protocol authority, gate, identifier, Contract, or Public Check issued       | #177: "activates research only; it does not … authorize specification or implementation work"; #178: "selects no operation graph, table, tolerance, platform, support domain, Public Check, implementation, or release outcome"; `PRELIM-*` is a result-internal label form, registered nowhere and declared to be nothing else | none   |
| Release 4 public discussion opened                                               | #177: "does not open Release 4 public discussion"; #178: preliminary result "cannot inform … public-opening decision"                                                                                                                                                                                                           | none   |
| Release 4 scope or Candidate A adopted                                           | #177: "as the leading candidate rather than an adopted scope"; the erratum restates candidate definitions and assigns questions, it selects no candidate                                                                                                                                                                        | none   |
| Release 3 results treated as Release 4 authority                                 | #177 pins them as inputs with required commit, tree, blob, and review state; #178: "without adopting a Release 3 candidate"                                                                                                                                                                                                     | none   |
| PR #174 treated as an accepted result                                            | #178: "open Release 3 numerical result PR #174 is preliminary and unaccepted; do not treat its head, transcripts, algorithms, bounds, tolerances, or dispositions as main-branch authority" (retained)                                                                                                                          | none   |
| Implementation, design freeze, or RFC synthesis allowed before the Research Gate | #177: "before the result may inform an RFC, design freeze, implementation, or public-opening decision"; #178: same, plus the separate-context review requirement before any final disposition                                                                                                                                   | none   |
| Scientific conclusion decided by an issue-level erratum                          | the erratum restates the README's candidate definitions and names which numerical questions apply to which candidate; it asserts no rank, estimability, feasibility, or methodological result                                                                                                                                   | none   |
| Meaning of the final numerical vocabulary changed                                | #178 lists the commission's final labels and restricts only when they may be assigned; it defines none of them differently                                                                                                                                                                                                      | none   |
| False claim that the repository commission was revised                           | #178 says "Read numerical commission Question 11 as follows", an issue-level reading instruction; the commission blob pin `48836247…` is unchanged and matches the tree at `58675e66…`                                                                                                                                          | none   |
| Neutral branch, commit-message, or pull-request-text rule weakened               | both issues: "Use a neutral task-oriented branch, neutral commit message, and neutral pull-request text" (strengthened from branch-only)                                                                                                                                                                                        | none   |
| Fixed inputs silently changed                                                    | both issues still pin commit `58675e66…`, tree `a1c81b64…`, README `34fa11bd…`, and their commission blobs; all recomputed and matching                                                                                                                                                                                         | none   |

No new `BLOCKER` or `SHOULD-FIX` arises from the repaired text.

## 11. N-3, N-4, and N-5 status

| Item | Requirement                                                                                                       | Evidence                                                                                                                                                                                                                             | Status   |
| ---- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| N-3  | Issue #178 requires exact commit, tree, blob, and review state to be recorded in the result for every later input | #178: "Every later input, including the reviewed Release 4 semantic result and any accepted Release 3 numerical result, may be used only when its exact commit, tree, blob, and review state are recorded explicitly in the result." | `CLOSED` |
| N-4  | Both issues require neutrality of branch name, commit message, and pull-request text                              | #177 and #178, "Output and change boundary": "Use a neutral task-oriented branch, neutral commit message, and neutral pull-request text."                                                                                            | `CLOSED` |
| N-5  | Issue #177 requires an explicit more-than-two-factor catalogue entry with its own disposition                     | #177, "Required task": "The catalogue must include an explicit more-than-two-factor entry with its own disposition."                                                                                                                 | `CLOSED` |

N-1 and N-2 were not targets of this repair. They are not reclassified and are not
conditions of this disposition; the original review assigns them to the next informative
revision of the preparation README.

## 12. New findings

None. No `BLOCKER`, `SHOULD-FIX`, or `NICE-TO-HAVE` finding was produced by the repaired
text. The two observations recorded in Sections 8 and 9 (per-entry `INPUT_INCOMPLETE`,
and the shortened phrase for Candidate C) create no misreading path under the governing
text and are not findings.

## 13. Exact limits of the disposition

- `GO` covers only the closure of S-1 through S-4 by the exact issue bodies identified
  in Section 5.2. Any later edit to either body invalidates Sections 6 through 11 until
  the new body is re-read and re-hashed.
- The second halves of the close conditions for S-1, S-3, and S-4 and the result-side
  statement required by S-2 concern research results that do not yet exist. They are
  carried forward to the separate-context exact-head reviews that both commissions
  already require; this review does not pre-approve those results.
- Nothing here adopts the Release 4 scope or Candidate A, approves any factorial,
  interaction, or numerical methodology, completes the Research Gate, publishes an RFC,
  opens public discussion, issues any identifier, freezes a design, authorizes
  implementation, or ratifies or publishes Release 4.
- This review inspected no Release 4 primary source, executed no probe, and did not
  re-review the preparation README, either commission, the horizon change, the original
  review's other findings, or any Release 3 artifact beyond blob and commit identity.
- The steward repair-record times (`09:52:49Z`, `09:53:28Z`) are recorded as stated by
  the steward; the issue API offers no independent body-edit timestamp.
- Independence is not machine-checkable; the boundary in Section 2 is the reviewer's
  own statement.
- The validation commands in Section 14 show repository hygiene only.

## 14. Validation and required next action

### 14.1 Validation

Executed on the review branch with this file present in the working tree, in a fresh
clone after `pnpm install --frozen-lockfile` (exit 0; runtime Node 22, package manager
11.7). The table was completed before the commit carrying this file was created, so the
`HEAD` form of the diff check is recorded against the working tree; the exact
`git diff --check 4a68ef6e… HEAD` command was re-run after the commit and its result is
reported with the commit.

| Command                                             | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                                 | pass ("All matched files use Prettier code style!"), exit 0                                                                                                                                                                                                                                                                                                                                                                                           |
| `pnpm lint:markdown`                                | pass, 0 issues, exit 0 (a first run reported two `MD018` errors from lines beginning with an issue number; the two sentences were reworded and the check re-run)                                                                                                                                                                                                                                                                                      |
| `pnpm typecheck`                                    | pass, exit 0                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `node --import tsx tooling/src/validate.ts`         | pass ("… private-dependency and language audits, phase-1 schemas, cross-checks, code-path audits, and the snapshot manifest mechanism are clean"), exit 0                                                                                                                                                                                                                                                                                             |
| `git diff --check 4a68ef6e…` (against working tree) | pass, exit 0                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `pnpm check`                                        | pass, exit 0: format, Markdown lint (358 files, 0 issues), typecheck, validate, tests (55 files, 520 tests), generated-artifact diff (19 files), Phase 1 suite (132 fixtures), Phase 2A conformance (44 fixtures), refusal fixtures (8), oracle comparison (7 datasets, max relative difference 8.96e-15), evidence checks (8 and 10 files), and the 0.2.1 numerical-contract fixtures (6); run twice, the second time on the final text of this file |

### 14.2 Required next action

1. Start the semantic commission under Issue #177 and the preliminary numerical phase
   under Issue #178, in parallel, on the fixed commit
   `58675e66dbf263c94688d47867c731ad4efddbf6`, reading the repaired bodies identified in
   Section 5.2.
2. Require each result's separate-context exact-head review to verify the carried-forward
   conditions: the semantic result records the three Release 3 review pins among its
   inputs and states the investigator's non-authorship boundary in its identity section;
   the preliminary numerical result states programme disposition `INPUT_INCOMPLETE`,
   defines and uses only `PRELIM-*` per-entry labels, and records Candidate B as
   balanced in its coverage matrix.
3. Keep PR #179 unmerged until the steward has read both the original review and this
   close-only result; merging remains a separate steward action.
4. Fold N-1, N-2, and the commission Question 11 wording into the next informative
   revision of the preparation package; that revision is not a precondition for
   starting research.

This file is the only change in its commit. It does not modify the original review
result, any of the four reviewed preparation files, any Release 3 artifact, any
authoritative artifact, or either issue.
