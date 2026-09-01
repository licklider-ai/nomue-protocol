# FND-1 Non-Clinical Estimand Reconciliation Close Review Result

**Status: informative close-only review result; non-normative; not adopted.**
This report answers only the commission at
[`2026-09-01-nonclinical-estimand-source-reconciliation-close-review-commission.md`](2026-09-01-nonclinical-estimand-source-reconciliation-close-review-commission.md).
It reviews the fixed reconciliation candidate for `FND1-H04` and records no
hold closure, Research Gate decision, Protocol adoption, vocabulary
registration, schema or identifier selection, implementation permission, or
release change.

## 1. Identity and input checks

### 1.1 Review identity

| Item                  | Value                                                                            |
| --------------------- | -------------------------------------------------------------------------------- |
| Role                  | Independent close-only reviewer for the `FND1-H04` reconciliation candidate      |
| Review date           | 2026-09-01                                                                       |
| Execution-base commit | `6d5e8eb05f0007e49a2dac78a065f286440cf779` (recorded before reading conclusions) |
| Checkout              | Fresh checkout at the execution-base commit, as supplied by the steward          |
| Assigned output       | This file only                                                                   |
| Web access            | Not used; no external retrieval was performed                                    |

### 1.2 Fixed-input verification

All seven fixed inputs exist at the execution-base commit and were read in
full. Object identities were verified directly against repository objects:

| Fixed input                         | Commission identity                             | Verified at execution base                      | Match |
| ----------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----- |
| Source-closure commission           | blob `c19bcff2ac1d3d8666869e186c530eb885da67f8` | blob `c19bcff2ac1d3d8666869e186c530eb885da67f8` | Yes   |
| Primary-source result (Pass A)      | blob `6566923b7f08c59d8f5fd1c13c8aa2b3e0d53116` | blob `6566923b7f08c59d8f5fd1c13c8aa2b3e0d53116` | Yes   |
| Repository-analysis result (Pass B) | blob `1c72c759b5d5a0d3cf024b53bcd1bd3a582aee53` | blob `1c72c759b5d5a0d3cf024b53bcd1bd3a582aee53` | Yes   |
| Accepted FND-1 baseline             | blob `dca6118720f8991dbdb0bd12b7528d0f18783f58` | blob `dca6118720f8991dbdb0bd12b7528d0f18783f58` | Yes   |
| Multiplicity steward disposition    | blob `5e8a69ba571637408c79e1c46d9167f679b57c38` | blob `5e8a69ba571637408c79e1c46d9167f679b57c38` | Yes   |
| Counterexample corpus v1            | path fixed; no blob given                       | blob `6ae2689195a0c81d849da04fb540dad72b880a02` | Yes   |
| Reconciliation candidate            | blob `f06e4f2dbc6fea1b40559730064a6bf5cf291f9d` | blob `f06e4f2dbc6fea1b40559730064a6bf5cf291f9d` | Yes   |

Candidate identity checks:

- candidate commit `55d727e770831c159e5645a0b3e6621b8abadb2a` exists and is an
  ancestor of intake merge `8b21134e28a9a645fad65506830ebdcc91499013`;
- the intake merge is an ancestor of the execution-base commit;
- the candidate path
  `evidence/research/foundation-identity/fnd-1/2026-09-01-nonclinical-estimand-source-reconciliation.md`
  carries blob `f06e4f2dbc6fea1b40559730064a6bf5cf291f9d` at both the
  candidate commit and the execution base (unchanged);
- the close-review commission and this result's placeholder are both present
  at the execution base.

The reconciliation's own Section 1 identity claims were also verified: Pass A
result commit `aace6fba32c0c95aa5f2396130c9755442fa405f` carries the Pass A
blob and is an ancestor of intake merge
`761b30dc39ae7c91131b2610e53d7666bc459e5b`; Pass B result commit
`cb563a897c51fe66afcad07a4948cb47e125376d` carries the Pass B blob and is an
ancestor of intake merge `929c92c9af192f1ef13f1152c5be04c8de3823a4`; both
intake merges are ancestors of the execution base.

Decision: `INPUT_COMPLETE`.

### 1.3 Review-context disclosure

The working context that performed this close-only review also produced the
frozen Pass B result earlier, under its own isolated commission, and the
steward assigned this review with that history known. The exposure is
disclosed rather than concealed: every fidelity judgment below is made against
the frozen artifact texts at their verified blobs and against repository
objects, not against memory of authorship or intent, and the review adds no
new research claim of its own. The Pass A result and the reconciliation
candidate were first read in this review.

## 2. Overall verdict

**`GO`.**

All twelve closure-matrix items pass. No `BLOCKER` and no `SHOULD_FIX`
finding exists; two `NICE_TO_HAVE` observations are recorded in Section 4 and
do not affect the handoff.

## 3. Closure matrix (C-01 through C-12)

| Item | Requirement                                    | Result | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---- | ---------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-01 | Fixed identities are exact                     | PASS   | Section 1.2: all seven inputs present at the execution base; every commit, merge, path, and blob in commission Section 1 matches repository objects; ancestry and blob-stability checks pass                                                                                                                                                                                                                                                          |
| C-02 | Intake boundaries stated accurately            | PASS   | Candidate §1: the Pass A note describes only removal of one pre-report workflow sentence, relocation of the unchanged appendix, marker unquoting, and repository formatting — no scientific rewrite is implied; the Pass B independence note is read with its stated five-input exception (Pass B §§1.2-1.3) and is not broadened                                                                                                                     |
| C-03 | Both pass dispositions faithfully carried      | PASS   | Candidate §§1, 3: both passes remain `NARROW / KEEP_OPEN`; neither is promoted; §3 explains agreement through complementary access sets and states agreement cannot be used as a vote to close the hold                                                                                                                                                                                                                                               |
| C-04 | `FND1-H04` remains open                        | PASS   | Candidate §7: research disposition `NARROW`, hold `KEEP_OPEN`, full Research Gate open; the missing direct non-ICH source evidence is described as material to the positive cross-domain claim, and `NARROW_AND_CLOSE` is explicitly declined for that reason                                                                                                                                                                                         |
| C-05 | Reusable core is narrow and conditional        | PASS   | Candidate §4.1: the core is exactly target unit set, condition or exposure, outcome with assessment occasion, and population-level summary with contrast direction; the contrast is conditional (single-condition quantification recognized); the core is labeled `POSSIBLE_PROJECT_CONVENTION`, not a formal cross-domain standard                                                                                                                   |
| C-06 | Bearers and value states remain separate       | PASS   | Candidate §4.2: assigned condition, realized condition trajectory, terminal event, outcome-existence status, observation-information state, analysis-set membership, datum relevance, and mechanism assumption are kept distinct with distinct bearers; the single undifferentiated attribute is rejected; no binary missingness collapse is introduced (§4.1 notes the existing binary declarations fail closed rather than represent the semantics) |
| C-07 | Estimand/procedure effects remain conditional  | PASS   | Candidate §3 row 4 and §6: `always estimand-defining` and `never estimand-defining` are both rejected as universal rules; condition-transition and terminal-event cases may change the target while a defined-but-unobserved outcome may change only the procedure                                                                                                                                                                                    |
| C-08 | Clinical-language boundary is evidence-bounded | PASS   | Candidate §5: verbatim transfer of ICH strategy names is rejected on the inspected text without banning underlying mathematical or causal concepts; Pass A's `principal stratum` rejection is explicitly narrowed to non-adoption rather than a universal ban; `terminal event` stays descriptive candidate language                                                                                                                                  |
| C-09 | Public-surface and repair claims stay bounded  | PASS   | Candidate §§6, 8: the current surface is described only as partial analogues; the claim that it implements the scaffold is rejected; the no-repair conclusion is bounded to the inspected surface and the currently bounded Welch-only profile; missing bearers are research and design gaps routed to open holds, not defects requiring schema changes                                                                                               |
| C-10 | Residual source requirement exact & sufficient | PASS   | Candidate §9: requires at least two direct non-ICH target-quantity or potential-outcomes texts with pinpoints, a source separating defined-but-unobserved from structurally nonexistent or terminal-event-truncated outcomes, and a source separating bounded or censored observations from ordinary missing observations; named candidate sources are explicitly discovery leads (identification is not verification)                                |
| C-11 | Other holds, authority, releases untouched     | PASS   | Candidate §§2, 8, 10: `FND1-H05`-`FND1-H08`, the full Research Gate, and release gates remain open or untouched; no field, schema, identifier, vocabulary, method, default, reason code, API, implementation, or check is selected; Release 2, paired-t, and t-family work remain excluded; the term searches of Section 5 confirm authorization-flavored words occur only in negations and exclusions                                                |
| C-12 | Public attribution and diff scope are clean    | PASS   | Candidate commit `55d727e…` changes exactly five files: the reconciliation report, informative authority-manifest notes (stale placeholder descriptions replaced by completed-disposition notes), an informative research-record README paragraph, and two regenerated views; all names and prose are neutral and role-based; no drafting, investigation, or review software, service, provider, or mechanism is identified or implied                |

## 4. Findings by severity

- `BLOCKER`: none.
- `SHOULD_FIX`: none.
- `NICE_TO_HAVE`:
  1. The candidate's Section 1 pins the baseline and multiplicity inputs by
     blob "at the reconciliation base" without naming that base commit inline;
     the close-review commission fixes the candidate commit externally, so
     identity remains exact, but naming the base commit in the candidate would
     make it self-contained.
  2. In candidate §4.1 item 3, "unit" denotes the measurement unit while §4.2
     uses "unit" for the experimental unit; a one-word clarification such as
     "measurement unit" would remove the ambiguity. Neither observation
     changes any direction, boundary, or disposition.

## 5. Reconciliation and diff-scope assessment

The reconciliation was compared line by line with both frozen pass results,
the accepted baseline, the hold boundary in the multiplicity steward
disposition, and the relevant corpus cases. The commissioned term searches
(`NARROW`, `KEEP_OPEN`, `NARROW_AND_CLOSE`, `CLOSE`, `Research Gate`; `event`,
`missing`, `terminal`, `censor`, `bounded`, `existence`, `bearer`; `estimand`,
`procedure`, `mechanism`, `relevance`, `analysis-set`; `ICH`, `intercurrent`,
`principal stratum`, `treatment policy`; `adopt`, `support`, `default`,
`implement`, `authorize`, `release`; Release 2 references) were run over the
candidate and its changed bookkeeping. Every occurrence of an
authorization-flavored term appears inside a negation, exclusion, or
boundary statement; Release 2 and the excluded numerical work appear only as
exclusions; the disposition vocabulary is used consistently with
`NARROW / KEEP_OPEN`.

Specific fidelity observations:

- The cross-pass table (candidate §3) attributes to each pass only findings
  present in that pass's frozen text, including Pass B's seven cases across
  six domains and Pass A's inaccessible non-ICH primary texts.
- The candidate core (§4.1) is Pass A's supported quadruple; Pass B's
  additional per-event-class handling analysis is carried in full as the
  §4.2 bearer separations rather than silently dropped or promoted into the
  core — a faithful reconciliation of the two shapes.
- The one place the reconciliation deliberately departs from a pass —
  narrowing Pass A's `principal stratum` rejection so that non-transfer does
  not become a universal ban — is flagged in the candidate's own text as a
  narrowing, which is exactly what close-review item C-08 requires.
- The diff scope of candidate commit `55d727e…` is limited to the report,
  informative bookkeeping, and generated views; the authority-manifest note
  changes replace stale placeholder descriptions and create no authority.

## 6. Exact residual source requirement

Carried forward unchanged from candidate §9, and confirmed sufficient for the
open hold: the smallest completion package must directly inspect (1) at least
two primary or formal texts defining target quantities, potential outcomes,
or exposure effects outside the ICH E9(R1) vocabulary, with exact pinpoints
for unit set, condition, outcome, time, and population summary; (2) a primary
or formal source distinguishing defined-but-unobserved outcomes from
structurally nonexistent outcomes or terminal-event truncation; (3) a primary
or formal source distinguishing detection-limit or censored observations from
ordinary missing observations; and (4) where available, a non-clinical
experimental or animal source addressing post-assignment condition change or
terminal events without importing the ICH strategy names. The candidate
sources named by Pass A remain discovery leads, not verified evidence, until
a completion pass inspects full text and records stable identities and
pinpoints.

## 7. Source-access boundary

`SOURCE_SPOT_CHECK_NOT_AVAILABLE`. This close-only review performed no
external retrieval and did not attempt to reopen or spot-check the external
sources; reconciliation fidelity was evaluated against the frozen results and
their bounded source claims, per commission §2. No source text was
reconstructed from memory, search fragments, or secondary material. This is
an access boundary, not `INPUT_INCOMPLETE`.

## 8. Final handoff statement

The reconciliation candidate faithfully narrows the two frozen `FND1-H04`
passes, keeps the hold and its primary-source requirement open, keeps every
bearer and value-state distinction separate, bounds the clinical-language
and no-repair conclusions to their evidence, and makes no unauthorized
Protocol or release decision. The candidate is ready for the steward
disposition; the hold itself remains open pending the residual source
completion package.

READY FOR FND-1 NON-CLINICAL ESTIMAND STEWARD DISPOSITION - NOT PROTOCOL ADOPTION
