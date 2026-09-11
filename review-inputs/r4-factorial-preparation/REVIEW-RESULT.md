# Release 4 Factorial Research Preparation — Independent Adversarial Review Result

**Status: informative independent review result; non-normative; not adopted.** This
record reviews one exact merge commit of the Release 4 research preparation package
and the two public execution issues that activate its commissions. It reviews the
research work-start structure only: scope of the investigation, Research Gate
placement, independence, dependencies, authority boundary, and failure handling. It
does not evaluate or approve the scientific validity of any factorial methodology,
and it selects no Contract, procedure, identifier, schema, Public Check, tolerance,
support domain, RFC decision, or release outcome. Attribution is role-based only.

## 1. Final disposition

**`REPAIR_REQUIRED`**, with zero `BLOCKER`, four `SHOULD-FIX`, and five
`NICE-TO-HAVE` findings (Section 13).

The preparation package itself is correctly bounded: it issues nothing, adopts
nothing, opens nothing, and every adversarial misreading attempted in Section 11 is
prevented by the fixed repository text. The four `SHOULD-FIX` findings are gaps
between what the fixed commissions require and what the mutable execution issues
and one commission clause actually say. Every `SHOULD-FIX` can be closed by editing
the text of Issue #177 or Issue #178, or by an erratum note in Issue #178, without
changing any repository file, re-pinning the containing commit, or re-issuing the
commission blobs. Research under Issues #177 and #178 should start only after those
issue-level repairs are visible, because the issues are the instructions the
investigators will execute.

The disposition would have been `GO` had the four `SHOULD-FIX` items been absent.
`REPAIR_REQUIRED` here does not mean the package structure or authority boundary is
unsafe; Section 14 states the exact limits.

## 2. Reviewer role and independence statement

| Field                 | Value                                                                                                                                                                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reviewer role         | independent adversarial reviewer of the Release 4 preparation work-start package                                                                                                                                                                                 |
| Independence boundary | did not author, revise, or integrate the Release 4 preparation README, either commission, the release-horizon change, PR #176, Issue #177, or Issue #178; did not author the Release 3 research results or their reviews                                         |
| Evidence basis        | fixed Git objects of the public repository at the review input commit, the governance documents in that tree, and the live public PR and issue records read directly from the hosting service at the times recorded in Section 4.3; no prior summaries or memory |
| Review posture        | falsification-oriented: the purpose was to find a way to misread the package as authority, to bypass the Research Gate, or to start unsafe work, not to support it                                                                                               |
| Inspection date       | 2026-09-06 (UTC)                                                                                                                                                                                                                                                 |
| Private material      | none read; no private repository, private path, or non-public document was used                                                                                                                                                                                  |
| Software identity     | intentionally not recorded, per the repository's neutral-provenance rule                                                                                                                                                                                         |

## 3. Repository identity

| Field                        | Expected                                                                       | Observed                                        | Result |
| ---------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------- | ------ |
| Review input commit          | `58675e66dbf263c94688d47867c731ad4efddbf6`                                     | checked out detached; `git rev-parse HEAD` same | match  |
| Commit tree                  | `a1c81b6480d5518271c1a4787cf9ab0879f6c2af`                                     | `git rev-parse HEAD^{tree}` same                | match  |
| First parent                 | `638dd80e4f74254e881af2eae74b2ccc95859033`                                     | first `parent` line of `git cat-file -p`        | match  |
| Second parent                | `c5e1a1eb8344085219a0d2d57fdbdc5695d68510`                                     | second `parent` line of `git cat-file -p`       | match  |
| First-parent tree            | `d3697227340e3ec380d99218398308f52edd5432` (claimed in the preparation README) | `git rev-parse 638dd80e…^{tree}` same           | match  |
| Diff `c5e1a1eb… → 58675e66…` | empty (merge carries the PR head content unchanged)                            | empty                                           | match  |

`IDENTITY_MISMATCH` does not apply.

## 4. Inspected files and blob verification

### 4.1 Review-input files

| Path                                                                       | Expected blob                              | `git ls-tree HEAD`                         | Result |
| -------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------ | ------ |
| `governance/drafts/release-horizon-r3-r20.md`                              | `8cfe5c4226caf5545a84b30bf71f20488ae065bf` | `8cfe5c4226caf5545a84b30bf71f20488ae065bf` | match  |
| `governance/drafts/release-4-preparation/README.md`                        | `34fa11bd35bbb48218ee13fa9986b61a8204cffd` | `34fa11bd35bbb48218ee13fa9986b61a8204cffd` | match  |
| `governance/drafts/release-4-preparation/semantic-research-commission.md`  | `f1a75907215252a466c6ad4f53120c84c3b19f9c` | `f1a75907215252a466c6ad4f53120c84c3b19f9c` | match  |
| `governance/drafts/release-4-preparation/numerical-research-commission.md` | `48836247c50ce388e1a21e5b0dd893291095809c` | `48836247c50ce388e1a21e5b0dd893291095809c` | match  |

`git diff --name-status 638dd80e… 58675e66…` lists exactly the four paths above:
three added (`A`) and the horizon modified (`M`); `--stat` reports 415 insertions
and 1 deletion across 4 files. The horizon change is confined to the "Release 4
parallel start" paragraph (one sentence replaced by a five-line paragraph). No
authoritative artifact, registry, schema, conformance artifact, reference code,
generated file, evidence file, Release 2 or Release 3 artifact changed.
`INPUT_SCOPE_MISMATCH` does not apply.

### 4.2 Governance documents read in full at the review input commit

| Path                                                                    | Blob                                       |
| ----------------------------------------------------------------------- | ------------------------------------------ |
| `AGENTS.md`                                                             | `94dbfdcec7d099f492b08d287dfdd41d876f08fa` |
| `CHARTER.md`                                                            | `1dead95488bae31f80f25424bb3a5515fda119fb` |
| `AUTHORITY.md`                                                          | `7b55e8ba6698d69431d952945a9253c2331122d0` |
| `authority/authority-manifest.yaml`                                     | `b8ccf048a8340ebb9b64ca7c68308731f0bff241` |
| `registries/requirements.yaml`                                          | `52bdd7483c7f043376e30d2e78028ff749f49528` |
| `governance/ID-POLICY.md`                                               | `2bb2fe4613d156bb7ddab81d9a24a2e29f4ccdce` |
| `governance/RFC.md`                                                     | `9fa3bdd2e273ed9569385e34bce0bbef2559b131` |
| `governance/drafts/research-frontier-map.md`                            | `92d928eee9a91fbfdd01899af46711c05444b4a7` |
| `governance/drafts/release-horizon-r3-r20.md`                           | `8cfe5c4226caf5545a84b30bf71f20488ae065bf` |
| `governance/drafts/release-3-preparation/README.md`                     | `4dbb5170f839f83ef22d3297dae832098d5cc95d` |
| `governance/drafts/release-3-preparation/readiness-audit-2026-09-06.md` | `bc0bb942d429fe9a9ee4e959ea483972d4dbae4d` |

No `AGENTS.md` exists under `governance/` or `review-inputs/`; the directory-local
`spec/AGENTS.md`, `conformance/AGENTS.md`, and `reference/AGENTS.md` do not govern
the changed paths. The Release 3 semantic result (`8f21526040924b891f64724c2d0fde9ea94eff92`)
header and Section 20, the three Release 3 semantic review results, the SR-L repair
review, and the original numerical review were consulted for the dependency checks
in Section 9.

### 4.3 Live public records

PR and issue text is mutable. Each body below was read once from the hosting
service between `2026-09-06T09:33Z` and `2026-09-06T09:37Z` and hashed as UTF-8
bytes of the body field exactly as returned; the hash covers the body only, not
the title or metadata.

| Record     | State at inspection                                                                                                                         | Head / base                                                                                      | Body SHA-256                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| PR #176    | closed, merged `2026-09-06T09:24:19Z`; 1 commit, 4 files, +415/−1; branch `research/r4-factorial-preparation-20260906`                      | head `c5e1a1eb8344085219a0d2d57fdbdc5695d68510`; base `638dd80e4f74254e881af2eae74b2ccc95859033` | `5b6aa1e14a98c2de903a2db2b284d8e2002a2b4c57f80d88d9ab613349ec83d9` (1361 bytes) |
| PR #174    | open, not merged; 1 commit, 1 file, +2684; last updated `2026-09-04T08:18:44Z`; branch `research/r3-multiplicity-numerical-oracles-65a53a4` | head `9f39eafd4b0a676e6615956b5a7899f195fc0358`; base `0eb388e11c240795282b6b17d7718501757d1e43` | `31ac81285c76fa9ab069e0f03d214f9b9d073c567a773a5b37b97bf3988c0c49` (2956 bytes) |
| Issue #177 | open; created `2026-09-06T09:25:19Z`; unchanged since creation; no linked closing PR                                                        | —                                                                                                | `f548fab92c8577f5c1cf10a5fe7e55adb25d61b7949044aa64613ae7dd46bde8` (2856 bytes) |
| Issue #178 | open; created `2026-09-06T09:25:36Z`; unchanged since creation; no linked closing PR                                                        | —                                                                                                | `5d6a75e519aa127fe7e0ddf6983120a602a785f297f121814261ea07c81cc273` (3169 bytes) |

The merge commit `58675e66…` has PR #176's head as its second parent and PR #176's
base as its first parent, so the review input is the recorded merge of PR #176.
None of these records was treated as Protocol authority.

### 4.4 Pins recorded in the execution issues

| Pin in Issue #177 / #178                                                                             | Re-derived from Git objects                                                            | Result |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------ |
| containing commit `58675e66…`, tree `a1c81b64…`                                                      | Section 3                                                                              | match  |
| README blob `34fa11bd…`, semantic commission blob `f1a75907…`, numerical commission blob `48836247…` | Section 4.1                                                                            | match  |
| Release 3 semantic result blob `8f21526040924b891f64724c2d0fde9ea94eff92`                            | `git ls-tree HEAD governance/drafts/release-3-preparation/semantic-research-result.md` | match  |
| Release 3 source-acquisition result blob `5465cbcfd00708facac94785d9244b79166cb81e`                  | `git ls-tree HEAD …/semantic-source-acquisition-result.md`                             | match  |
| SR-L repair review blob `6624d462…`, source commit `1e220f67…` (Issue #177 only)                     | blob present at HEAD and at `1e220f67…` (fetched; `git cat-file -t` → commit)          | match  |
| original numerical review blob `7a27fe44…`, source commit `32e9f3c5…` (Issue #177 only)              | blob present at HEAD and at `32e9f3c5…` (fetched; `git cat-file -t` → commit)          | match  |

## 5. Governance and authority review (item A)

Attack: read any of the four files as issuing or approving Release 4 meaning.

| Check                                                                                          | Evidence                                                                                                                                                                                                                                                            | Result    |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| No specification, identifier, Requirement ID, Contract, Public Check, or implementation issued | README status line: "creates no Protocol meaning, identifier, Requirement ID, supported capability, RFC window, implementation authority, or release commitment"; both commissions: "non-normative; not adopted" and "selects no …"                                 | prevented |
| No public discussion, ratification, or publication                                             | README: "Release 4 public discussion is not open"; Immediate sequence step 6 requires "a distinct steward action"                                                                                                                                                   | prevented |
| No normative keyword introduced                                                                | grep for `MUST`, `SHOULD`, `MAY` as whole words in the four files: no match; no `<a id="NRS-…">` anchor added; `registries/requirements.yaml` unchanged                                                                                                             | prevented |
| No parallel authority scheme or foreign identifier                                             | none of the four paths is listed in `authority/authority-manifest.yaml`; per `AUTHORITY.md` an unclassified artifact has no authority; `pnpm validate` (authority-manifest and private-dependency audits) passes                                                    | prevented |
| Informative candidates separated from adopted content                                          | README: "The candidates are ordered for investigation, not selected for adoption"; "Candidate priority is not a Protocol decision"                                                                                                                                  | prevented |
| `R4-P1`–`R4-P6` not misreadable as formal gates                                                | README: "These labels are planning references inside this informative package … they are not Protocol gate identifiers"; the `R1-NN` gate family in `ID-POLICY.md` is distinct in form and the labels are not registered anywhere                                   | prevented |
| No Release 2 or Release 3 candidate reused as Release 4 authority                              | README reuse boundary: "A Release 3 candidate table, algorithm, tolerance, support bound, platform predicate, or identifier is not automatically a Release 4 decision"; numerical commission: "Release 3 candidates are precedent to test, not Release 4 authority" | prevented |

Observation (no finding): the README's Candidate A boundary uses imperative-sounding
bullets ("exactly two declared fixed factors…"). They are introduced as a "boundary to
investigate" and the semantic commission may narrow or reject them; no reader with the
status line in view can take them as adopted admissibility rules.

## 6. Research sequencing review (item B)

| Check                                                                                         | Evidence                                                                                                                                                                                                                                                                                                                                   | Result          |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| Starting Release 4 research during Release 3 research is consistent with `governance/RFC.md`  | RFC.md "Research before design freeze"; "Research may therefore run ahead of implementation at the shared-foundation or method-family level"; the gate constrains design freeze and implementation, not the start of investigation; the frontier map states "research may run in parallel across near-term and long-horizon subjects"      | consistent      |
| The horizon change itself                                                                     | Replaces "may begin while Release 3 is under public discussion" with "may begin while Release 3 research is active" and adds that Release 4 discussion "opens only after its own bounded question and Research Gate handoff are reviewable"; the horizon is informative and its update discipline permits this without a Protocol decision | consistent      |
| Research start, RFC drafting, public opening, design freeze, and implementation kept distinct | README Immediate sequence steps 1–6 order them; both commissions bar a result from informing "an RFC, design freeze, implementation, or public-opening decision" before separate-context review; AGENTS.md hard rule requires an independent primary-source review before promotion into design or implementation                          | distinct        |
| Work depending on unresolved Release 3 items is conditional                                   | README: "Every Release 3 dependency stays conditional until the relevant Release 3 research and Protocol decisions close"; hold R4-P4                                                                                                                                                                                                      | conditional     |
| Which holds may remain open at public opening                                                 | README step 6: "after R4-P1 through R4-P6 are reviewably resolved or explicitly bounded" does not say which holds may be merely bounded; the Release 3 README limits this to the numerical lane                                                                                                                                            | see finding N-1 |

## 7. Semantic commission review (item D)

| Check                                                                                                                                                                   | Evidence                                                                                                                                                                                                                                                                                                                               | Result           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Coverage of main effect, interaction, level ordering, averaging weights, replication, unit, error term, estimability, causal interpretation, multiplicity, result class | Questions 1 (target and averaging weights), 2 (interaction null and sign under level order), 3 (causal), 4 (unit, replication, cell membership), 5–6 (assumptions, error term, degrees of freedom), 9 (multiplicity), 10 (estimates and intervals), 13 (estimability); output must include "candidate declarations and result classes" | covered          |
| Sign and hypothesis change under factor renaming or level reordering                                                                                                    | falsification cases "level-order reversal for either factor" and "row/column exchange and outcome-unit-preserving data permutation"; Question 2 asks "which relabellings preserve the hypothesis while changing a reported signed contrast"                                                                                            | covered          |
| Repeated measurement mistaken for replication                                                                                                                           | Question 4 "Distinguish replication from repeated measurements and technical replicates"; falsification case "repeated measurements mislabelled as independent replication"                                                                                                                                                            | covered          |
| Unbalanced hypotheses not collapsed by software defaults                                                                                                                | Question 12: enumerate sequential, partial, marginal, estimable-function definitions; "never call software-default agreement scientific consensus"; falsification case with two systems differing under one label                                                                                                                      | covered          |
| Finite catalogue variants                                                                                                                                               | minimum entries: three `2 × 2` effects, joint family, simple effects and planned contrasts, general `a × b`, every unbalanced hypothesis family, no-replication, empty-cell, fractional/aliased, random/mixed, repeated/clustered, blocked, covariate-adjusted, heteroscedastic/randomization, estimation/interval outputs             | covered; see N-5 |
| `INPUT_INCOMPLETE` available                                                                                                                                            | "If a required primary text cannot be identified or inspected, return `INPUT_INCOMPLETE` … Do not fill it from memory or a software default"                                                                                                                                                                                           | available        |
| `SEMANTIC_PROGRAM_READY` not misreadable as adoption                                                                                                                    | "means only that the public question is source-backed and bounded; it does not adopt the catalogue or authorize implementation"                                                                                                                                                                                                        | prevented        |
| Change boundary                                                                                                                                                         | "Change only the required result file. Do not modify this commission, the preparation README, Release 3 artifacts, authoritative files, registries, schemas, conformance, reference code, or generated files"                                                                                                                          | clear            |
| Exact-head review by a separate context                                                                                                                                 | "Require a separate-context exact-head primary-source review before any result informs the RFC"; Issue #177 repeats it for RFC, design freeze, implementation, and public opening                                                                                                                                                      | required         |
| Investigator independence boundary                                                                                                                                      | "independent of any future Release 4 semantic or numerical implementation" only; the Release 3 semantic commission required an investigator "who did not author the Release 3 scope proposal or its future implementation"                                                                                                             | see finding S-2  |
| Pins the execution issue must carry                                                                                                                                     | commission requires "the current Release 3 semantic result and its preserved independent reviews"; Issue #177 pins the result but not its reviews                                                                                                                                                                                      | see finding S-1  |

## 8. Numerical commission review (item E)

| Check                                                                                                    | Evidence                                                                                                                                                                                                                                                                                             | Result           |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Preliminary work separated from semantics-dependent work                                                 | "Preliminary reuse analysis and self-contained probes may begin before the semantic result. A final numerical disposition requires the reviewed semantic catalogue and may cover only its exact hypotheses, outputs, design boundary, and degrees of freedom"                                        | separated        |
| No operation route preselected                                                                           | Question 2: "Compare direct cell-contrast, orthogonal coded-design, and full least-squares routes without silently choosing one"                                                                                                                                                                     | prevented        |
| binary64 order, cancellation, overflow, underflow, zero variance, integers, tail projection              | Questions 2–3; probes for "algebraically equivalent graphs whose binary64 outputs differ", "far F tails, subnormal and zero projections", zero residual variance, extreme finite magnitudes, signed zero, exact power-of-two scaling                                                                 | covered          |
| Truth, graph reproduction, projection, declared-result comparison, threshold comparison separated        | Question 5 lists the five ledgers per quantity                                                                                                                                                                                                                                                       | separated        |
| Independent oracle not reducible to the reference implementation or two related libraries                | "Two agreeing libraries do not establish mathematical truth"; "at least two implementation-independent routes … exact rational arithmetic for algebra and an arbitrary-precision or rigorous enclosure route for F probabilities"; AGENTS.md rule that the reference stats kernel is never an oracle | prevented        |
| Corpus maximum not a support bound                                                                       | "without converting the largest tested case into a support bound"; Question 9 "A finite corpus maximum is not a global bound"                                                                                                                                                                        | prevented        |
| Release 3 F-tail, critical value, multiplicity, resource, supported-execution not reused unconditionally | "Release 3 candidates are precedent to test, not Release 4 authority"; Question 8 "what can reuse an accepted Release 3 certificate" (none is accepted today); Question 10 "without copying a Release 3 allowlist"                                                                                   | conditional      |
| Final numerical judgment impossible without semantic result                                              | commission text above; Issue #178 "A final numerical programme disposition is prohibited until the reviewed semantic result is pinned"; enforcement is textual plus the required separate-context review                                                                                             | enforced by text |
| `NUMERIC_PROGRAM_READY` not misreadable as implementation approval                                       | "It does not select that path, establish support, or authorize implementation"                                                                                                                                                                                                                       | prevented        |
| Form of a preliminary-only result                                                                        | no mandated programme disposition for a preliminary-only result and no per-entry label distinct from the final vocabulary; the Release 3 commission mandated `INPUT_INCOMPLETE` in that case and the Release 3 review required `PRELIM-*` per-entry labels                                           | see finding S-3  |
| Candidate labelling                                                                                      | Question 11 reads "unbalanced Candidates B/C"; the README defines Candidate B as "Complete balanced replicated `a × b`"                                                                                                                                                                              | see finding S-4  |

## 9. Release 3 dependency review (item F)

| Check                                                                                                    | Evidence                                                                                                                                                                                                                                                                                                                                                    | Result              |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Current Release 3 semantic state                                                                         | result blob `8f21526…` header: "Disposition: `NARROW`"; Section 20: six `R3-CAND` entries on inspected text, the remaining lanes blocked under holds SR-A through SR-L; final-repair review verdict `GO` at head `778f295e…` on that blob; Release 3 README: SR-L `CLOSED`, 13 items `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`                           | verified            |
| Release 4 package does not overstate `NARROW`                                                            | README reuse list is limited to structural patterns ("claim-object separation", "fixed family identity", "generic multiplicity transforms applied to an explicitly declared family") and is prefixed "Potentially reusable after scope verification"; hold R4-P4 requires reconciliation "against its exact final scope"                                    | not overstated      |
| Primary-source gaps beyond SR-L not hidden                                                               | the README does not restate the Release 3 hold ledger at all; Issue #177 pins the source-acquisition result (`5465cbcf…`), which records every open hold; the numerical commission requires new factorial-specific inspection and the ledger says the Release 3 packet "cannot close the factorial-specific rows merely by arriving"                        | not hidden; see N-2 |
| PR #174 treated as unaccepted preliminary work                                                           | Issue #178: "open Release 3 numerical result PR #174 is preliminary and unaccepted; do not treat its head, transcripts, algorithms, bounds, tolerances, or dispositions as main-branch authority"; PR #174 body itself says it must not be merged before close-only review and records `INPUT_INCOMPLETE`; the README and Issue #177 do not mention PR #174 | correct             |
| No instruction to use PR #174 transcript, algorithm, support bound, tolerance, or disposition as settled | none found in the four files or either issue                                                                                                                                                                                                                                                                                                                | none                |
| Later Release 3 results usable only when pinned                                                          | semantic commission: pin "every later Release 3 result used as an input"; Issue #177: "only when its exact commit, tree, blob, and review state are added explicitly to the result"; numerical commission: pin "each Release 3 result used"; Issue #178: "Pin every later input … before relying on it" (omits the words "review state"; see N-3)           | closed              |

## 10. Issue #177 and #178 consistency review (item G)

| Check                                                       | Issue #177                                                                                                                                                                                                                                | Issue #178                                                                                                                                                                                                |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed commit, tree, blobs correct                           | all six pins re-derived and matched (Section 4.4)                                                                                                                                                                                         | all four pins re-derived and matched (Section 4.4)                                                                                                                                                        |
| Commission requirements not weakened                        | "Follow the commission in full"; **but** the commission's required pin of the Release 3 semantic result's preserved reviews is absent (S-1); the commission's independence boundary is not strengthened to cover package authorship (S-2) | preliminary phase correctly limited; final programme disposition prohibited; **but** the form of the preliminary result is under-specified (S-3)                                                          |
| Output file correct                                         | `governance/drafts/release-4-preparation/semantic-research-result.md` — matches the commission                                                                                                                                            | `governance/drafts/release-4-preparation/numerical-research-result.md` — matches the commission                                                                                                           |
| Change scope one result file                                | "Change no other file"                                                                                                                                                                                                                    | "Change no other file"                                                                                                                                                                                    |
| Neutral branch, commit message, PR text                     | "Use a neutral task-oriented branch"; commit message and PR text are covered only through AGENTS.md, which the commission requires reading                                                                                                | same (see N-4)                                                                                                                                                                                            |
| No automatic merge                                          | "Open a pull request and do not merge it"                                                                                                                                                                                                 | "Open a pull request and do not merge it"                                                                                                                                                                 |
| No route to RFC or implementation before independent review | "A separate-context reviewer must inspect the exact result head … before the result may inform an RFC, design freeze, implementation, or public-opening decision"                                                                         | "obtain a separate-context exact-head primary-source and numerical review. Until then the result remains preliminary and cannot inform an RFC, design freeze, implementation, or public-opening decision" |
| Preliminary not misreadable as final                        | not applicable                                                                                                                                                                                                                            | the issue states the result "remains preliminary"; the residual path is the label vocabulary inside the result (S-3)                                                                                      |

## 11. Adversarial misreading results (item H)

| #   | Attempted misreading                                                    | Blocking text                                                                                                                                                                                                                                                                | Outcome   |
| --- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | Candidate A is the adopted Release 4 scope                              | README "ordered for investigation, not selected for adoption"; "Candidate priority is not a Protocol decision"; Issue #177 "leading candidate rather than an adopted scope"                                                                                                  | prevented |
| 2   | Release 4 public discussion has already opened                          | README "Release 4 public discussion is not open"; horizon "opens only after its own bounded question and Research Gate handoff are reviewable"; both issues "does not open Release 4 public discussion"                                                                      | prevented |
| 3   | `R4-P1`–`R4-P6` are formal Protocol gate IDs                            | README "not Protocol gate identifiers"; unregistered anywhere                                                                                                                                                                                                                | prevented |
| 4   | Release 3 F-distribution results port automatically to Release 4        | README reuse boundary and non-reuse list; numerical commission "precedent to test"; Issue #178 "without adopting a Release 3 candidate"; no accepted Release 3 numerical result exists (PR #174 open, `INPUT_INCOMPLETE`)                                                    | prevented |
| 5   | Reporting three F tests yields familywise error control                 | README "no familywise claim across the three tests unless a separately identified multiplicity procedure protects that declared family"; semantic Question 9; numerical Question 7; falsification case "three unadjusted effect tests presented as one familywise guarantee" | prevented |
| 6   | A balanced `2 × 2` licenses a causal claim                              | README "no causal interpretation inferred from the factorial layout"; semantic Question 3; falsification case; CHARTER non-claim on causal relationships                                                                                                                     | prevented |
| 7   | Repeated measurements count as cell replication                         | README exclusion; semantic Question 4; falsification case                                                                                                                                                                                                                    | prevented |
| 8   | PR #174 content is already accepted                                     | Issue #178 explicit statement; PR #174 body "Do not merge this successor until …"; Release 3 README table "not an accepted research result"; the four fixed files never cite PR #174 content                                                                                 | prevented |
| 9   | Implementation can start from preliminary numerical research            | Issue #178 "cannot inform an RFC, design freeze, implementation"; `NUMERIC_PROGRAM_READY` definition; AGENTS.md hard rule                                                                                                                                                    | prevented |
| 10  | Software-default agreement fixes semantics when primary text is missing | semantic commission "agreement among software packages are not decision-bearing evidence"; `INPUT_INCOMPLETE` rule; Question 12; Issue #177 "Do not substitute textbooks, search snippets, software defaults, or model memory"                                               | prevented |

Two further attacks not on the list: (a) treating the horizon table's phrase
"foundation established for Release 3" as a statement that such a foundation exists —
the phrase predates this change and is not touched by the diff; the README's
conditional reuse text and the Release 3 README's status table contradict the reading
(N-2); (b) treating the numerical commission's "unbalanced Candidates B/C" as a
redefinition of Candidate B — the README, which both commissions name as the
candidate definition, defines B as balanced (S-4).

## 12. Validation results (item 7)

Executed at the review input commit in a fresh checkout after
`pnpm install --frozen-lockfile` (exit 0; runtime Node 22, package manager 11.7).

| Command                                     | Result                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                         | pass ("All matched files use Prettier code style!"), exit 0                                                                                                                                                                                                                                                      |
| `pnpm lint:markdown`                        | pass (356 files, 0 issues), exit 0                                                                                                                                                                                                                                                                               |
| `pnpm typecheck`                            | pass, exit 0                                                                                                                                                                                                                                                                                                     |
| `node --import tsx tooling/src/validate.ts` | pass ("… private-dependency and language audits, phase-1 schemas, cross-checks, code-path audits, and the snapshot manifest mechanism are clean"), exit 0                                                                                                                                                        |
| `git diff --check`                          | pass, exit 0                                                                                                                                                                                                                                                                                                     |
| `pnpm check`                                | pass, exit 0: full suite including tests, generated-artifact diff, Phase 1 regression (88 fixtures), Phase 2A conformance (44 fixtures), refusal fixtures (8), oracle comparison (7 datasets, max relative difference 8.96e-15), evidence checks (8 and 10 files), and the 0.2.1 numerical-contract fixtures (6) |

`pnpm check` ran to completion in this environment; the `tsx` IPC stop recorded by
the Release 3 readiness audit did not occur here.

Hosted CI for PR #176 head `c5e1a1eb8344085219a0d2d57fdbdc5695d68510`: workflow
`CI`, run `34024451402`, event `pull_request`, status `completed`, conclusion
`success`, 5 jobs:

| Job                                   | Status    | Conclusion |
| ------------------------------------- | --------- | ---------- |
| Full check (Linux x64)                | completed | success    |
| Full check (Linux x64, Node 24)       | completed | success    |
| Phase 1 + 2A validation (Linux arm64) | completed | success    |
| Phase 1 + 2A validation (macOS arm64) | completed | success    |
| Phase 1 + 2A validation (Windows x64) | completed | success    |

CI success proves only that the changed files do not break the repository suite; it
was not treated as evidence for any content judgement above.

## 13. Findings

### S-1 — Issue #177 omits the pin the semantic commission requires for the Release 3 semantic result's reviews

- **Severity:** `SHOULD-FIX`
- **Location:** `semantic-research-commission.md`, "Independence and fixed inputs", pin list item 4; Issue #177, "Fixed repository inputs"
- **Facts:** The commission requires the execution issue to pin "the current Release 3 semantic result and its preserved independent reviews". Issue #177 pins the result blob `8f21526…` and two other reviews (the SR-L repair review and the original numerical review), but not the three preserved reviews of the semantic result itself: `review-inputs/r3-independent-multigroup-semantics/REVIEW-RESULT.md` (blob `fc61decb017821c403841a6db822ccd5e5b7233d`), `…-repair/REVIEW-RESULT.md` (`e646429582d206d5299ce5ff1d0c2b8978323cd3`), and `…-final-repair/REVIEW-RESULT.md` (`395054fd1e2f22a5ad63460b86be0394de429605`), all present at `58675e66…`. The final-repair review is the one whose `GO` covers blob `8f21526…`.
- **Failure path:** The semantic investigator answers Question 14 (which Release 3 findings transfer) from the `NARROW` result without the review record that lists its `SHOULD-FIX` corrections and limits, and the later exact-head reviewer cannot tell from the issue which review state the investigator relied on.
- **Impact:** evidence-provenance gap in the Research Gate handoff; no authority impact.
- **Minimal fix:** add the three review paths with their blobs (and the reviewed heads they record) to Issue #177's pin list; no repository change.
- **Close condition:** Issue #177 lists the three review blobs; the semantic result's Section 1 records them among its inputs.

### S-2 — The semantic investigator's independence boundary is narrower than the Release 3 precedent and than RFC.md rule 2

- **Severity:** `SHOULD-FIX`
- **Location:** `semantic-research-commission.md`, "Independence and fixed inputs", first sentence; Issue #177, "Work authorization"
- **Facts:** The commission requires only an investigator "independent of any future Release 4 semantic or numerical implementation". The Release 3 semantic commission (blob `c6760efc…`, read at HEAD) required an investigator "who did not author the Release 3 scope proposal or its future implementation". `governance/RFC.md` rule 2 requires a research pass "independently of the agent or reviewer responsible for the proposed solution", and rule 1 notes the question should be framed "without exposing a preferred design"; the README does expose a preferred candidate (A as "Primary candidate"). Issue #177 says "as an independent primary-source investigation" without saying independent of whom.
- **Failure path:** the context that authored the README, the candidate ordering, and the commission executes the semantic commission; the text of both the commission and the issue is satisfied, yet the falsification of Candidate A is performed by its proposer. The separate-context review would still be independent, but the Research Gate's first pass would not be.
- **Impact:** independence gap on the research pass; authority unaffected.
- **Minimal fix:** state in Issue #177 that the investigator did not author or revise the Release 4 preparation README, the commissions, the horizon change, or PR #176, and require the result's investigator-role line to say so; the commission blob need not change.
- **Close condition:** Issue #177 carries the boundary; the result's identity section records non-authorship of the package.

### S-3 — The form of a preliminary-only numerical result is under-specified, leaving a preliminary-read-as-final path

- **Severity:** `SHOULD-FIX`
- **Location:** `numerical-research-commission.md`, "Independence and sequencing" and "Required coverage and dispositions"; Issue #178, "Preliminary task now allowed"
- **Facts:** The commission allows preliminary work before the semantic result and prohibits a "final numerical disposition" without it, but it neither mandates which programme disposition a preliminary-only result returns nor provides a per-entry label distinct from the final vocabulary (`NUMERIC_FEASIBLE`, `ORACLE_ONLY`, `DEFER`, `NO_GO`, `INPUT_INCOMPLETE`). The Release 3 numerical commission stated "preliminary probes may be recorded but the commission returns `INPUT_INCOMPLETE` for its program disposition", and the Release 3 exact-head review's finding B-1 required "official-looking per-entry dispositions" to be replaced with preliminary labels (`PRELIM-*`), which PR #174 now uses. Issue #178 says "Record dependent sections as `INPUT_INCOMPLETE` or preliminary" without fixing the label.
- **Failure path:** the preliminary result assigns `NUMERIC_FEASIBLE` to the three Candidate A tests and reports no programme disposition; a reader of the PR, or a later RFC drafter, cites those entries as feasibility findings although the hypotheses and degrees of freedom they assume are not yet semantically reviewed. This is exactly the defect the Release 3 review had to repair.
- **Impact:** misreading path across the semantic-before-numerical ordering the package otherwise enforces; authority unaffected.
- **Minimal fix:** state in Issue #178 that the preliminary result returns programme disposition `INPUT_INCOMPLETE`, that per-entry assessments use an explicitly preliminary label distinct from the final vocabulary, and that final labels may appear only in the successor bound to the reviewed semantic handoff; no repository change.
- **Close condition:** Issue #178 carries the rule; the preliminary result's summary states `INPUT_INCOMPLETE` and uses preliminary labels only.

### S-4 — The numerical commission mislabels Candidate B as unbalanced

- **Severity:** `SHOULD-FIX`
- **Location:** `numerical-research-commission.md`, Question 11 ("Determine whether unbalanced Candidates B/C require matrix-rank, pivoting, generalized-inverse, or iterative behavior…"); README "Scope candidates" table
- **Facts:** The README defines Candidate B as "Complete balanced replicated `a × b`" and Candidate C as "Unbalanced complete two-factor fixed-effects design". The commission blob is pinned in Issue #178 and cannot be edited in place.
- **Failure path:** the numerical investigator treats B as an unbalanced family and gives it a rank- or pivoting-driven `DEFER`, or the later coverage matrix carries two incompatible definitions of B, one from each document.
- **Impact:** candidate-boundary inconsistency inside the fixed instruction set; authority unaffected.
- **Minimal fix:** add an erratum line to Issue #178: the README's candidate definitions govern; Question 11 is to be read as "Candidate C (unbalanced) and, for rank and dimension only, Candidate B (balanced `a × b`)". Correct the commission text in the next informative revision of the package.
- **Close condition:** Issue #178 carries the erratum; the numerical result records B as balanced in its coverage matrix.

### N-1 — README step 6 does not say which pre-opening holds may remain merely "explicitly bounded"

- **Severity:** `NICE-TO-HAVE`
- **Location:** README, "Immediate sequence", step 6
- **Facts:** Opening is allowed "after R4-P1 through R4-P6 are reviewably resolved or explicitly bounded". The Release 3 README permits only the numerical lane to remain open at opening. The horizon and the commissions already prevent opening without a reviewed semantic handoff, so the misreading is not reasonably available today.
- **Minimal fix:** in the next README revision, state that R4-P1, R4-P2, R4-P4, R4-P5, and R4-P6 must be resolved and that only R4-P3 may remain an explicitly named open hold at opening.
- **Close condition:** README revision carries the distinction.

### N-2 — The README carries no snapshot of the Release 3 research state it conditionally reuses

- **Severity:** `NICE-TO-HAVE`
- **Location:** README, "Release 3 reuse boundary" and "Primary-source planning ledger"; horizon table rows for Release 3 and Release 4 (pre-existing text)
- **Facts:** The README never states that the Release 3 semantic result is `NARROW`, that 13 source holds are `INPUT_INCOMPLETE`, or that PR #174 is open and unaccepted; the execution issues and the pinned Release 3 files carry that state. The unchanged horizon row still says Release 4 "should reuse the … foundation established for Release 3" and lists both Release 3 and Release 4 as `next candidate`.
- **Minimal fix:** add a dated status line to the README in its next revision and reconcile the horizon wording; no change is needed for research to start.
- **Close condition:** README revision records the Release 3 state with blobs.

### N-3 — Issue #178's later-input rule omits "review state"

- **Severity:** `NICE-TO-HAVE`
- **Location:** Issue #178, "Fixed repository inputs", last paragraph
- **Facts:** Issue #177 requires later Release 3 material to carry "exact commit, tree, blob, and review state"; Issue #178 requires pinning "every later input … before relying on it" and names "any accepted Release 3 numerical result" without requiring the review state to be recorded.
- **Minimal fix:** copy the Issue #177 wording into Issue #178.
- **Close condition:** Issue #178 text updated.

### N-4 — Neutral commit-message and PR-text requirements are inherited, not stated

- **Severity:** `NICE-TO-HAVE`
- **Location:** Issues #177 and #178, "Output and change boundary"
- **Facts:** Both issues require a neutral branch name only. The commit-message and PR-text neutrality rule lives in AGENTS.md, which the semantic commission requires reading and which binds every contributor; the numerical commission does not list AGENTS.md explicitly.
- **Minimal fix:** add "commit message and pull-request text" to the neutrality sentence in both issues.
- **Close condition:** issue text updated.

### N-5 — The semantic minimum catalogue does not name a more-than-two-factor entry

- **Severity:** `NICE-TO-HAVE`
- **Location:** `semantic-research-commission.md`, "Required catalogue and dispositions"
- **Facts:** Candidate D includes "more than two factors"; the catalogue minimum lists every other Candidate D component but not a multi-factor entry. "Evaluate every Candidate A through D" still requires a disposition for it.
- **Minimal fix:** the investigator adds the entry under the "newly discovered material variant" rule; no text change needed before start.
- **Close condition:** the semantic result contains a multi-factor entry with a disposition.

## 14. Residual risks and exact limits of the disposition

- `REPAIR_REQUIRED` applies to the execution instructions, not to the fixed package.
  All four `SHOULD-FIX` items close by editing Issue #177 and Issue #178. If the
  steward prefers to leave the issues untouched, the same content may be placed in
  the first comment of each issue, but the investigators must then be told to read
  it.
- This review did not evaluate the scientific validity of any factorial or
  interaction methodology, did not inspect any primary methodological or numerical
  source, and did not execute any probe. Nothing here bears on whether Candidate A
  is defensible.
- PR and issue bodies are mutable. The hashes in Section 4.3 identify the exact text
  reviewed; a later edit invalidates the corresponding row of Section 10 and Section
  13 until re-read.
- The two preserved review files pinned in Issue #177 were verified to exist at their
  stated source commits, but their content was not re-reviewed here.
- The Release 3 dependency is inherently unstable: `NARROW` may be reconsidered, PR
  #174 may be repaired, merged, or superseded. Hold R4-P4 and the pin rules in both
  issues are the only protection; they were found adequate in text (Section 9) but
  are not machine-enforced.
- Neither commission's independence is machine-checkable. The separate-context
  exact-head review required by both commissions remains the enforcement point.
- `pnpm check` passing here and CI passing on `c5e1a1eb…` show repository hygiene
  only.
- A disposition of `GO` after repair would still not adopt the Release 4 scope,
  approve any methodology, complete the Research Gate, publish an RFC, open public
  discussion, issue any identifier, freeze a design, authorize implementation, or
  ratify or publish Release 4.

## 15. Required next action

1. Edit Issue #177 to add the three Release 3 semantic review pins (S-1) and the
   investigator non-authorship boundary (S-2).
2. Edit Issue #178 to mandate `INPUT_INCOMPLETE` and preliminary per-entry labels
   for the preliminary-only result (S-3) and to carry the Candidate B erratum (S-4);
   optionally add "review state" and commit/PR neutrality wording (N-3, N-4).
3. Record the post-edit body hashes of both issues in the steward's own note or in
   the next README revision so the repaired instructions are identifiable.
4. Then start the semantic commission under Issue #177 and the preliminary numerical
   phase under Issue #178, in parallel, on the pinned commit `58675e66…`.
5. Fold N-1, N-2, and N-5 into the next informative revision of the preparation
   README and commissions; that revision is not a precondition for starting
   research.

This review file is the only change on its branch. It does not modify any of the
four reviewed files, any Release 3 artifact, any authoritative artifact, or either
issue.
