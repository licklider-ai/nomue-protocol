# FND-1 Non-Clinical Estimand Repository-Analysis Result

**Status: informative research result; non-normative; not adopted.** This is the
Pass B (independent repository and representation analyst) result commissioned
by
[`2026-08-31-nonclinical-estimand-source-closure-commission.md`](2026-08-31-nonclinical-estimand-source-closure-commission.md).
It addresses only `FND1-H04`. It records no hold closure, Research Gate
decision, Protocol adoption, vocabulary registration, schema selection,
implementation permission, or release change. The steward reconciles this
result with the frozen Pass A result later; neither pass closes the hold by
itself.

## 1. Identity, input, access, and independence checks

### 1.1 Research metadata

| Item                | Response                                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package and hold    | `FND-1`, `FND1-H04` only                                                                                                                                                     |
| Role                | Independent repository and representation analyst (Pass B)                                                                                                                   |
| Completion date     | 2026-09-01                                                                                                                                                                   |
| Commission commit   | `586b9dfa748dd45995991463b569a0e883b2838d`                                                                                                                                   |
| Analysis base       | The exact working tree of the commission commit; no other revision inspected                                                                                                 |
| Web access          | Not used; this pass performed no external source retrieval                                                                                                                   |
| Repository access   | `AVAILABLE` (read-only inspection plus replacement of the one assigned placeholder)                                                                                          |
| Assigned output     | This file only                                                                                                                                                               |
| Explicit exclusions | Release 2 artifacts and candidate work, paired-t and t-family numerical-contract work, Pass A result, other passes' results, unrelated review branches, private repositories |

### 1.2 Input completeness

- Decision: `INPUT_COMPLETE`
- Fixed inputs received and read in full:
  1. [`2026-08-31-nonclinical-estimand-source-closure-commission.md`](2026-08-31-nonclinical-estimand-source-closure-commission.md);
  2. [`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md)
     (the accepted source-bounded FND-1 reconciliation baseline);
  3. [`2026-08-31-multiplicity-steward-disposition.md`](2026-08-31-multiplicity-steward-disposition.md);
  4. [`../2026-08-30-counterexample-corpus-v1.md`](../2026-08-30-counterexample-corpus-v1.md); and
  5. [`../2026-08-30-common-response-template-v1.md`](../2026-08-30-common-response-template-v1.md).
- Missing or unreadable fixed inputs: none.
- All explicit exclusions could be honored: yes.

### 1.3 Independence

- The Pass A result file exists at the fixed commit; its existence was observed
  only from a directory listing. Its content was not opened, read, or used.
- No earlier investigation result, earlier pass result, external-investigator
  intake, future reconciliation, unrelated review branch, unpublished
  conclusion, or private repository was opened as evidence. The five fixed
  inputs are the only documents read in full.
- Repository-wide text search was used only to locate public statements
  relevant to the bounded question, as the commission permits. Search hit
  listings unavoidably displayed short line fragments from non-input evidence
  files; these fragments were treated as location pointers only, and no claim
  in this report rests on any of them.
- Release 2 paths (`review-inputs/r2-*`, `tooling/r2-*`,
  `governance/drafts/release-2*`, and the paired-t design drafts and spike
  tests) were excluded from search scope and are not used as evidence.
- General background knowledge is disclosed as present but is not evidence;
  every decision-bearing claim below carries a repository or fixed-input
  pinpoint or is marked `NOT_VERIFIABLE`.

## 2. Disposition

**Selection:** `NARROW`

**One-paragraph rationale:** The candidate proposition survives on the
repository side only in a narrowed, bearer-explicit form. The current public
surface already demonstrates a small domain-neutral estimand scaffold in
working form — declared population of record observations, condition as
declared groups, outcome, first-class estimand kind and direction, and closed
data-handling declarations that fail closed — and it does so without importing
any clinical intercurrent-event vocabulary (Section 9.3). However, the six
required counterexample cases show that a single abstract "event or
missing-outcome handling" attribute collapses materially distinct situations
(a below-limit value that is present as an interval, a terminal event after
which the outcome does not exist, and a missing observation of a
conceptually defined outcome), and the timing attribute currently has no
structured bearer at all, surviving only inside free-text labels. Whether the
narrowed scaffold matches formal non-clinical primary sources cannot be
established from repository inspection; every external-source question remains
`NOT_VERIFIABLE` in this pass and is deferred to reconciliation with Pass A.

**Protocol adoption:** `NO`

### 2.1 Conclusion summary

| Item                        | Conclusion                                                                                                                                                   | Confidence | Principal evidence          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | --------------------------- |
| Candidate proposition       | Reusable only as a narrowed scaffold: five slots survive, but handling must be declared per event class with an explicit bearer and outcome-existence status | MEDIUM     | Sections 5, 6, 7            |
| Timing attribute            | Genuinely domain-neutral but currently bearer-less on the public surface; free text only                                                                     | HIGH       | `CLM-07`, `CLM-08`, CX-7    |
| One umbrella handling label | Falsified as a lossless single category                                                                                                                      | HIGH       | CX-1, CX-4, CX-5, Section 8 |
| Strongest counterexample    | CX-4: a terminal event leaves nothing missing; calling it missing-outcome handling is a category mistake                                                     | HIGH       | Section 6                   |
| Largest unresolved issue    | No non-clinical primary source was inspectable in this pass; the clinical-inseparability boundary is external                                                | HIGH       | `CLM-13`, Section 10        |

## 3. Search method and version-fixed source register

### 3.1 Search method

- Scope: the working tree of commit `586b9dfa748dd45995991463b569a0e883b2838d`,
  excluding `review-inputs/`, `tooling/r2-*`, `governance/drafts/release-2*`,
  the paired-t design drafts and spike tests, `node_modules/`, lockfiles, the
  Pass A result file, and all prior investigation-result and
  external-investigator intake files other than the five fixed inputs.
- Technique: case-insensitive regular-expression text search over file
  contents, followed by direct reading of located public statements with line
  pinpoints. No web retrieval, no external database, and no source outside the
  repository was used.
- Search terms (each searched independently): `estimand`, `intercurrent`,
  `ICH E9` / `E9(R1)`, `treatment policy`, `principal stratum`,
  `hypothetical`, `while on treatment`, `composite strategy`, `censor`,
  `detection limit`, `dropout`, `withdrawal`, `adverse event`,
  `terminal event`, `sacrifice`, `assessment time`, `time point`,
  `measurement time`, `margin`, `sensitivity`, `treatment`, `clinical`,
  `patient`, `trial`, `missing`.
- Evidence rule: search snippets were discovery aids only; every
  decision-bearing repository claim below was confirmed by opening the named
  file at the named lines.

### 3.2 Version-fixed source register

All repository sources are fixed at commit
`586b9dfa748dd45995991463b569a0e883b2838d`.

| Source ID | Artifact                                                                               | Type                          | Access           | Pinpoints used                           |
| --------- | -------------------------------------------------------------------------------------- | ----------------------------- | ---------------- | ---------------------------------------- |
| `REG-1`   | The commission (this pass's instruction)                                               | Fixed input                   | `VERIFIED`       | §§1-11                                   |
| `REG-2`   | `fnd-1/2026-08-30-independent-research-result.md` (baseline reconciliation)            | Fixed input                   | `VERIFIED`       | §§2.2, 5, 6, 7.1, 7.3, 8.3, 9.2          |
| `REG-3`   | `fnd-1/2026-08-31-multiplicity-steward-disposition.md`                                 | Fixed input                   | `VERIFIED`       | Holds table; evidence carried forward    |
| `REG-4`   | `2026-08-30-counterexample-corpus-v1.md`                                               | Fixed input                   | `VERIFIED`       | Base E1; FND1-03/06/11; FND2-05/06/07/08 |
| `REG-5`   | `2026-08-30-common-response-template-v1.md`                                            | Fixed input                   | `VERIFIED`       | Response structure and claim classes     |
| `REPO-A`  | `spec/profiles/independent-two-group-continuous/effect-estimate.md`                    | Public normative statement    | `VERIFIED`       | L9-12, L22-24                            |
| `REPO-B`  | `spec/profiles/independent-two-group-continuous/admissibility.md`                      | Public normative statement    | `VERIFIED`       | L6-8, L38-45, L49-58                     |
| `REPO-C`  | `schemas/profiles/itgc-guarantee-0.2.schema.json`                                      | Public schema                 | `VERIFIED`       | L5, L101-121, L161-174                   |
| `REPO-D`  | `registries/reason-codes.yaml`                                                         | Public registry               | `VERIFIED`       | L612-631                                 |
| `REPO-E`  | `registries/state-invariants.yaml`                                                     | Public registry               | `VERIFIED`       | L276-286                                 |
| `REPO-F`  | `registries/vocabulary.yaml`                                                           | Public registry               | `VERIFIED`       | L54-68 and full term inventory           |
| `REPO-G`  | `examples/canonical-case-wetlab-01/record.json`                                        | Public example                | `VERIFIED`       | L118, L122, L131, L141-142, L152-154     |
| `REPO-H`  | `examples/itgc-guarantee-0.2/record.json`; `examples/minimal-itgc-record/record.json`  | Public examples               | `VERIFIED`       | L86; L74                                 |
| `REPO-I`  | `PROTOCOL-ARCHITECTURE.md`                                                             | Public architecture statement | `VERIFIED`       | L401-402                                 |
| `REPO-J`  | `spec/profiles/README.md`                                                              | Public design statement       | `VERIFIED`       | L59-60                                   |
| `REPO-K`  | `spec/core/record-lifecycle.md`; `schemas/lifecycle/disclosure-notice-0.1.schema.json` | Public normative statement    | `VERIFIED`       | L119; L17                                |
| `REPO-L`  | `comparison/nomue-vs-wrroc-vs-bco.md`                                                  | Public comparison             | `VERIFIED`       | L57-58                                   |
| `REPO-M`  | `governance/decisions/ADR-0011-phase-2a-mean-difference-effect-estimate.md`            | Public decision record        | `VERIFIED`       | L14-17, L34-35                           |
| `REPO-N`  | `spec/profiles/independent-two-group-continuous/phase-2a-guarantee-profile.md`         | Public overview               | `VERIFIED`       | L16-22                                   |
| `REPO-O`  | `governance/decisions/ADR-0014-admissibility-computability-separation.md`              | Public decision record        | `VERIFIED`       | L19-21                                   |
| `EXT-01`  | ICH E9(R1) and every other external formal or primary source                           | External text                 | `NOT_VERIFIABLE` | None; named by inputs, not inspected     |

## 4. Atomic claim-evidence ledger

Classes follow the commission: `VERIFIED_DIRECT` (the named text says it),
`CROSS_SOURCE_INFERENCE`, `POSSIBLE_PROJECT_CONVENTION`, `CONTRADICTED`,
`NOT_VERIFIABLE`. Claims about fixed inputs assert what those inputs state,
not external truth.

| Claim ID | Atomic claim                                                                                                                                                                                    | Class                         | Source and pinpoint                       | Domain limit                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------- | ------------------------------------------------ |
| `CLM-01` | The current public surface supports exactly one estimand kind: the unstandardized arithmetic mean difference in group-order direction                                                           | `VERIFIED_DIRECT`             | `REPO-A` L9-12; `REPO-E` L276-286         | This commit; ITGC 0.2 bundle                     |
| `CLM-02` | The estimand is a first-class declared object with required `kind` and `direction`, separate from `method_id`                                                                                   | `VERIFIED_DIRECT`             | `REPO-C` L161-174; `REPO-M` L14-17        | Same                                             |
| `CLM-03` | An unsupported estimand declaration is structurally representable and fails admissibility with the registered reason code `NRS-UNSUPPORTED-ESTIMAND`, never silently                            | `VERIFIED_DIRECT`             | `REPO-C` L5; `REPO-D` L612-631            | Same                                             |
| `CLM-04` | Data handling is declared through four closed binary enums: `analysis_population`, `missing_outcomes`, `transformation`, `weighting`                                                            | `VERIFIED_DIRECT`             | `REPO-C` L101-121; `REPO-B` L49-58        | Same                                             |
| `CLM-05` | A Record declaring missing outcomes is rejected rather than receiving an implicit missingness policy (`NRS-PROFILE-ITGC-0025`)                                                                  | `VERIFIED_DIRECT`             | `REPO-B` L42-45                           | Same                                             |
| `CLM-06` | The registered Protocol vocabulary defines Contracts over target quantities or estimands, inputs, procedure identity, outputs, and verification semantics, and registers no clinical-trial term | `VERIFIED_DIRECT`             | `REPO-F` L54-68 and term inventory        | Same; see absence claim `ABS-01`                 |
| `CLM-07` | No structured bearer exists on the public surface for assessment time, time origin, outcome unit, or a non-zero margin                                                                          | `VERIFIED_DIRECT` (absence)   | Section 9.3 `ABS-02`; `REPO-G` L122, L131 | Bounded to inspected scope and terms             |
| `CLM-08` | The public non-clinical canonical case declares condition and exposure only as free-text group labels, with exposure duration inside a label and units inside the outcome label                 | `VERIFIED_DIRECT`             | `REPO-G` L118, L122, L131                 | Same                                             |
| `CLM-09` | Profile admissibility judges declared record structure only and never asserts a declaration is true                                                                                             | `VERIFIED_DIRECT`             | `REPO-B` L6-8; `REPO-O` L19-21            | Same                                             |
| `CLM-10` | The term `withdrawal` is already occupied on the public surface by the Record-lifecycle disclosure sense                                                                                        | `VERIFIED_DIRECT`             | `REPO-K` L119; L17                        | Same                                             |
| `CLM-11` | The baseline reconciliation holds event handling as conditionally estimand-defining and refuses verbatim transfer of clinical strategy names                                                    | `VERIFIED_DIRECT`             | `REG-2` §2.2 H5, §7.1, §7.3               | Statement of the fixed input                     |
| `CLM-12` | Corpus v1 already separates below-limit boundary storage, observed versus imputed, `not_collected` versus `structurally_nonexistent`, and irrelevance versus exclusion                          | `VERIFIED_DIRECT`             | `REG-4` FND2-05/06/07/08; FND1-03/06/11   | Statement of the fixed input                     |
| `CLM-13` | The content of ICH E9(R1) and of every candidate non-clinical formal source is unestablished in this pass                                                                                       | `NOT_VERIFIABLE`              | `EXT-01`                                  | Applies to every external-content statement here |
| `CLM-14` | Four of the proposition's five scaffold slots have at least a partial working repository analogue; timing is the exception                                                                      | `CROSS_SOURCE_INFERENCE`      | `CLM-01`..`CLM-08`; Section 5             | This commit only                                 |
| `CLM-15` | One umbrella event-or-missing-outcome handling attribute cannot represent the six required cases without losing material distinctions                                                           | `CROSS_SOURCE_INFERENCE`      | Section 6; `REG-4`                        | Value-independent analysis                       |
| `CLM-16` | A per-event-class handling declaration carrying bearer, time relation, and outcome-existence status could express all six cases in research prose without a public schema                       | `POSSIBLE_PROJECT_CONVENTION` | Section 6, expressibility column          | Convention candidate only; nothing adopted       |

### 4.1 Separation statement

- **What a source says:** `CLM-01`..`CLM-12` (repository text and fixed inputs
  at the fixed commit).
- **What follows by cross-source inference:** `CLM-14`, `CLM-15`, the Section 5
  matrix rows marked inference, and the Section 6 classifications.
- **What could only be a future project convention:** `CLM-16`, the Section 8
  replacement candidates, and the Section 11 candidate narrow statement.
- **What remains unknown:** every claim about external text (`CLM-13`), the
  clinical-inseparability boundary (commission question 2), and formal
  non-clinical analogues of event-handling semantics (Section 10).

## 5. Clinical-specific versus reusable-structure matrix

The clinical-specific column reports what this pass can and cannot establish;
external clinical text itself is `NOT_VERIFIABLE` here (`CLM-13`), so
clinical-side entries are bounded to what the fixed inputs state.

| Proposition element               | Clinical-specific portion (bounded)                                                                       | Reusable abstract portion (repository-tested)                                                       | Current repository representation                                                                   | Corpus / E-P-H-M-D-V test                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Population                        | Trial-population and analysis-set conventions; unverifiable here                                          | Declared target population and declared analyzed population, kept distinct                          | `data_handling.analysis_population` binary enum (`REPO-C` L105-108); target population is free text | E axis; corpus FND1-06 shows population declaration changes E              |
| Condition or exposure             | Treatment, dose, and regimen conventions; unverifiable here                                               | Declared groups with order; exposure history as unit-level events                                   | `groups` + `group_order` structured; exposure detail free text (`REPO-G` L118, L122)                | E axis; corpus FND1-07 contrast within family                              |
| Outcome and timing                | Clinical endpoint and visit-window conventions; unverifiable here                                         | Outcome definition with scale; assessment occasion and time origin                                  | `outcome` structured with `scale`; timing has no bearer (`CLM-07`, CX-7)                            | E axis; corpus FND1-03 shows assessment time changes E                     |
| Event or missing-outcome handling | Intercurrent-event strategy vocabulary is clinically anchored per `REG-2` §7.3; content unverifiable here | Per-event-class declarations distinguishing value state, observation loss, and outcome nonexistence | Single binary `missing_outcomes` enum; `present` fails closed (`CLM-04`, `CLM-05`)                  | Conditionally E-defining (`CLM-11`); Section 6 shows one category is lossy |
| Population-level summary          | Clinical summary-measure conventions; unverifiable here                                                   | Declared summary and contrast direction                                                             | Estimand `kind` + `direction` encode summary and contrast jointly (`CLM-01`, `CLM-02`)              | E axis; corpus FND1-05 transformation/summary changes E                    |
| Domain-specific event categories  | Clinical category lists; unverifiable here                                                                | Kept separate from the scaffold, as the proposition requires                                        | Not represented; no category list exists on the public surface (`ABS-01`)                           | Separation confirmed necessary by CX-1..CX-7                               |

Repository task 1 result: every proposed reusable attribute was tested against
the corpus base profile E1 and the E/P/H/M/D/V decomposition of `REG-2` §7.1.
No attribute contradicts the decomposition; the timing attribute and the
event-handling attribute are the two whose repository bearers are missing or
too coarse, respectively.

## 6. Counterexample classifications

Seven value-independent cases across six domains; each row includes the six
commission-required case types. No classification uses outcome values;
numerical agreement never establishes semantic identity. The expressibility
column is repository task 3 (whether the case can be expressed without adding
a public schema).

| Case   | Required type                                 | Domain                           | Bearer                                    | Time relation                        | Estimand effect                                                                   | Procedure effect                                                    | Missing declaration                                                                           | Expressible today without new schema?                                                                       |
| ------ | --------------------------------------------- | -------------------------------- | ----------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `CX-1` | Below detection or quantification limit       | Immunoassay (cytokine ELISA)     | Observation value state, not the unit     | At the assessment occasion           | None if E targets the true concentration scale; outcome remains defined           | Substitution versus censored-likelihood choices change P            | The value is not missing; it is interval-known (at or below the limit)                        | In prose, yes; in a Record only by collapsing to `missing_outcomes: present`, which fails closed (`CLM-05`) |
| `CX-2` | Unit never reaches applicable time            | Microbiology (culture growth)    | Experimental unit's time course           | Event before the assessment occasion | Depends on declared handling: survivors-only versus all-assigned targets differ   | Complete-case versus model-based choices change P once E is fixed   | Unit-level ineligibility for the occasion, not a lost value                                   | Same collapse; unit removal also forces `analysis_population: subset_or_exclusions_present`, failing closed |
| `CX-3` | Condition or exposure change after assignment | Agronomy (field spray drift)     | Unit-level exposure-history event         | After assignment, before assessment  | As-assigned versus as-exposed targets are different estimands; handling defines E | Given a fixed E, estimator choice is separately declared            | Nothing is missing; the exposure record diverges from the assignment record                   | Not declarable: no exposure-history bearer exists; only free-text labels (`CLM-08`)                         |
| `CX-4` | Terminal event; later outcome impossible      | In-vivo oncology (death day 10)  | Unit-terminating event                    | Before the assessment occasion       | Strongest effect: while-alive, composite, and survivor targets are distinct E     | P choices exist only after one of those E choices                   | Category mistake to call it missing: no day-28 value exists to be missing                     | Same collapse as CX-2; the impossibility/missingness distinction is lost                                    |
| `CX-5` | Missing while outcome conceptually defined    | Analytical chemistry (lost read) | Observation record                        | At the assessment occasion           | None: the outcome existed and E is unchanged                                      | Handling (complete case, imputation) plus assumptions change P only | Genuine missing observation; the assumption (e.g. ignorability) is scientific, not structural | Collapse to `missing_outcomes: present` loses only the reason, not the state                                |
| `CX-6` | Same datum, different relevance               | Animal biomarker (corpus E1)     | The (estimand, datum) pair, not the datum | Datum at 48h; E defined at 24h       | None for the 24h E; constitutive for a 48h E (corpus FND1-03)                     | None                                                                | Irrelevance is not missingness and not exclusion (corpus FND2-06 separation)                  | In prose, yes; the Record has no relevance relation, and none is needed for the research question           |
| `CX-7` | Attribute without bearer (added case)         | Cell-based assay (`REPO-G`)      | Assessment occasion itself                | Identity-level, not event-level      | Two Records differing only in a label's `48h` versus `72h` are different E        | Unchanged                                                           | Nothing missing; the declaration surface is missing instead                                   | Not expressible as structure today; timing lives in free text (`CLM-07`, `CLM-08`)                          |

Cross-domain-term information loss (required per case): a single
"condition-transition and missing-outcome handling" attribute loses the
value-state/observation/existence distinction in `CX-1`, `CX-4`, and `CX-5`
(three different bearers reduced to one flag), loses the unit-versus-value
bearer distinction in `CX-2`, misdescribes `CX-3` (an exposure-history fact,
not an outcome fact), and does not apply to `CX-6` or `CX-7` at all
(relevance and timing are not handling questions). Domains spanned:
immunoassay, microbiology, agronomy, in-vivo animal research, analytical
chemistry, and cell-based assay — six domains, satisfying the four-domain
minimum.

Repository task 3 conclusion: all six required cases are expressible as
research prose and as corpus-style A/B rows without adding any public schema.
At the Record level the existing surface can only collapse them into its
binary declarations, and every collapse fails closed with a registered reason
code rather than silently reinterpreting the case (`CLM-03`, `CLM-05`,
`CLM-09`). Lossless Record-level declaration would require new surfaces, which
remain unauthorized and are already held under `FND1-H06`.

## 7. Candidate attribute and bearer matrix

Commission question 3 asks for the correct bearers. Recommendations use the
template vocabulary and adopt nothing.

| Candidate attribute                 | Correct bearer (this analysis)                                                 | Bearer on current surface                          | Evidence                        | Recommendation                                  |
| ----------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- | ------------------------------- | ----------------------------------------------- |
| Target population                   | Estimand                                                                       | Free text only                                     | `REPO-G`; corpus FND1-06        | `KEEP` (bearer: estimand)                       |
| Analyzed population                 | Analysis declaration (procedure side)                                          | `data_handling.analysis_population` enum           | `REPO-C` L105-108               | `KEEP`; keep distinct from target population    |
| Condition or exposure assignment    | Experimental unit (assignment fact)                                            | `groups` + `group_order`, labels free text         | `REPO-G` L118-122               | `KEEP`                                          |
| Exposure-history transition         | Unit-level event                                                               | None                                               | CX-3                            | `KEEP` as research concept; no surface exists   |
| Outcome definition and scale        | Estimand                                                                       | `outcome` object with `scale`                      | `REPO-G` L131                   | `KEEP`                                          |
| Assessment occasion and time origin | Estimand                                                                       | None (free text)                                   | `CLM-07`; CX-7                  | `KEEP` concept; bearer gap routes to `FND1-H06` |
| Outcome-existence status            | The (unit, occasion) pair                                                      | None                                               | CX-2, CX-4                      | `SPLIT` from missingness                        |
| Value state (e.g. below-limit)      | Observation                                                                    | None; `outcome_value` is a plain number            | CX-1; corpus FND2-07            | `SPLIT` from missingness; FND-2 boundary noted  |
| Missing-observation record          | Observation                                                                    | Binary `missing_outcomes` at design level          | `REPO-C` L109-112               | `NARROW` to conceptually defined outcomes       |
| Handling declaration                | Estimand when it selects the target; procedure when it selects the computation | Not present beyond the binary enums                | `CLM-11`; CX-3/CX-4 versus CX-5 | `SPLIT` by event class; see Section 8           |
| Population-level summary            | Estimand                                                                       | `estimand.kind` (jointly with contrast)            | `CLM-01`                        | `KEEP`                                          |
| Contrast and direction              | Estimand                                                                       | `estimand.direction` + `group_order`               | `REPO-A` L22-24                 | `KEEP`                                          |
| Relevance to an estimand            | The (estimand, datum) relation                                                 | Not present; not needed for this research question | CX-6; corpus FND2-06            | `KEEP` as relation concept only                 |

Commission question 5 answer from this matrix: an event-handling attribute
belongs to estimand identity **only conditionally** — exactly when the
declared handling selects the target (CX-3, CX-4, and the survivor/composite
choice in CX-2), and not when it selects only the computation under separately
declared assumptions (CX-5). Commission question 6 follows: changing handling
changes the estimand when it changes population membership, outcome
definition, or occasion; it changes only the inference procedure when the
target is fixed and the change is a declared P-level assumption. This matches
and sharpens the baseline's conditional ruling (`CLM-11`).

## 8. Candidate vocabulary attack

Attack on candidate terms, including the phrase named by commission
question 8. Verdicts are research judgments, not registrations.

| Candidate term                                                                         | Verdict for general non-clinical use   | Reason                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intercurrent event` (outside clinical trials)                                         | REJECT as imported vocabulary          | Clinically anchored per the fixed inputs (`REG-2` §7.3); its formal external definition is unverifiable in this pass; nothing on the public surface needs it                                             |
| `condition-transition and missing-outcome handling`                                    | REJECT as one attribute; half survives | Overbroad and partly category-mistaken: bundles an exposure-history fact (CX-3) with three distinct absence situations (CX-1/4/5); the `condition-transition` half alone remains a usable narrow concept |
| `missing-outcome handling` as the umbrella category                                    | REJECT as umbrella; NARROW as leaf     | Loses the value-state/observation/existence distinctions (Section 6); survives only for CX-5-type cases where the outcome remains conceptually defined                                                   |
| `dropout`                                                                              | REJECT                                 | Human-subject connotation; ambiguous bearer (unit versus observation); the corpus never needs it                                                                                                         |
| `withdrawal`                                                                           | REJECT for event vocabulary            | Already occupied by the Record-lifecycle disclosure sense (`CLM-10`); reuse would create a public name collision                                                                                         |
| `censoring` as the umbrella for CX-1 plus CX-4                                         | UNRESOLVED                             | A formal statistical sense plausibly exists, but no primary text was inspectable here (`CLM-13`); also risks merging value-interval knowledge with existence loss                                        |
| `terminal event`                                                                       | KEEP as descriptive candidate          | Domain-neutral, bearer-explicit (unit-terminating); still `POSSIBLE_PROJECT_CONVENTION` pending external sources                                                                                         |
| Per-event-class handling declaration (bearer, time relation, outcome-existence status) | Candidate replacement                  | Expresses all seven cases without loss (Section 6); `POSSIBLE_PROJECT_CONVENTION` only (`CLM-16`)                                                                                                        |

## 9. Falsification attempts, disagreements, and scoped absence claims

### 9.1 Falsification attempts

| Target                                                                                   | Strongest attempted counterexample                                     | Result                   | Consequence                                                                       |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------- |
| Scaffold distinguishes population, condition/exposure, outcome+timing, handling, summary | CX-7 (timing without a bearer)                                         | `NARROWED`               | The scaffold survives only with an explicit assessment-occasion bearer            |
| One abstract event/missing-outcome category suffices                                     | CX-4 (nothing is missing after a terminal event)                       | `FALSIFIED`              | Handling must be declared per event class with outcome-existence status           |
| Event handling always belongs to estimand identity                                       | CX-5 (lost reading; target unchanged)                                  | `FALSIFIED` as universal | Conditional rule stated in Section 7                                              |
| Event handling never belongs to estimand identity                                        | CX-3 and CX-4 (handling selects the target)                            | `FALSIFIED`              | Same conditional rule                                                             |
| Domain-specific event categories can stay separate from the scaffold                     | None found; all seven cases classify without a universal category list | `SURVIVED`               | Supports the proposition's separation clause                                      |
| The current binary surface silently misinterprets the six cases                          | None: every collapse fails closed with a reason code                   | `SURVIVED`               | `CLM-03`, `CLM-05`, `CLM-09`; fail-closed posture is adequate for research safety |

### 9.2 Material disagreements

No material disagreement with any fixed input was found. Two boundary notes
are recorded for the steward rather than as disagreements: (a) this pass
cannot test commission question 2 (clinical inseparability) at all, because no
clinical text was inspectable; any Pass A finding there has no repository
counterpart to conflict with. (b) The `CX-1`/`corpus FND2-07` below-limit case
sits on the FND-1/FND-2 package boundary: its value state is FND-2 subject
matter, while its handling strategy is FND-1 subject matter; one datum, two
bearers, two packages.

### 9.3 Scoped absence claims

All claims are bounded to commit `586b9dfa748dd45995991463b569a0e883b2838d`,
to the inspected scope named per row, to case-insensitive whole-content search
with the listed terms, and to nothing else. They do not generalize to excluded
paths, other revisions, or external standards.

| ID       | Claim                                                                                                | Inspected scope                                               | Search terms                                                                                                              | Result                                                                                                                                                                                   | Residual uncertainty                                     |
| -------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `ABS-01` | No public normative or registry surface imports clinical intercurrent-event terminology              | `spec/`, `schemas/`, `registries/`, `generated/VOCABULARY.md` | `intercurrent`, `treatment policy`, `principal stratum`, `hypothetical`, `while on treatment`, `adverse event`, `dropout` | 0 occurrences of each                                                                                                                                                                    | Prose synonyms outside the term list would not be caught |
| `ABS-02` | No structured bearer exists for assessment time, time origin, measurement unit, or a non-zero margin | Same scope plus `examples/`                                   | `assessment time`, `time point`, `measurement time`, `unit_of_measure`, `margin`                                          | 0 structural occurrences; `margin` matched only a prose word (`spec/profiles/README.md:150`)                                                                                             | A differently named surface would not be caught          |
| `ABS-03` | No censoring or detection-limit surface exists                                                       | Same scope                                                    | `censor`, `detection limit`                                                                                               | 0 occurrences                                                                                                                                                                            | Same                                                     |
| `ABS-04` | `withdrawal` occurs on the public surface only in the Record-lifecycle disclosure sense              | `spec/`, `schemas/`, `registries/`                            | `withdrawal`                                                                                                              | 6 occurrences, all lifecycle (`spec/approval/README.md:103`, `spec/core/record-lifecycle.md:119`, `schemas/lifecycle/disclosure-notice-0.1.schema.json:5,17,41`, `schemas/README.md:75`) | None within scope                                        |
| `ABS-05` | No current public statement imports clinical terminology too broadly (repository task 2)             | Full permitted search scope of Section 3.1                    | All Section 3.1 terms                                                                                                     | No over-broad import found; nearest instances listed below                                                                                                                               | Judgment-bounded: "too broadly" is a research judgment   |

Nearest instances examined for `ABS-05`, with exact path and line, all judged
not to be over-broad imports:

1. `examples/itgc-guarantee-0.2/record.json:86` and
   `examples/minimal-itgc-record/record.json:74` — the free-text group label
   `Treatment`. This is user-supplied example text in the general
   experimental-design sense, carried by a `label` field with no registered
   semantics; the wet-lab canonical case (`REPO-G` L118, L122) shows the same
   field carrying vehicle/compound labels instead.
2. `PROTOCOL-ARCHITECTURE.md:401-402` — names clinical/survival semantics
   only as a deliberately unanswered extension stress-test question; nothing
   is imported.
3. `spec/profiles/README.md:59-60` — states that missingness and
   preprocessing belong to the declared analysis population rather than to
   hidden procedure behavior; domain-neutral and consistent with `CLM-04`.

## 10. FND1-H04 disposition and closure matrix

**`FND1-H04` disposition from this pass alone: `KEEP_OPEN`.**

The hold's preserved question (`REG-3`) is primary non-clinical event and
missing-outcome sources. A repository pass structurally cannot supply external
primary sources, and this pass inspected none. The repository-side evidence
narrows the shape of any future closure but cannot close the hold.

Closure matrix (repository task 4) for the commission's ten required research
questions:

| Question (commission §6)                            | Direct repository evidence                         | Inference                                                    | Contradiction | Unresolved source need                                       |
| --------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ |
| 1. Domain-neutral attributes                        | `CLM-01`..`CLM-08`: five slots partially working   | `CLM-14`; timing needs a bearer                              | None          | Non-clinical formal attribute definitions                    |
| 2. Inseparable ICH concepts                         | None possible in this pass                         | None                                                         | None          | Entirely external (`CLM-13`); Pass A territory               |
| 3. Correct bearers                                  | Section 7 matrix, repository columns               | Section 7 bearer assignments                                 | None          | External confirmation of bearer conventions                  |
| 4. Can seven situations share one abstract category | Binary enum collapse observed (`CLM-04`, `CLM-05`) | `CLM-15`: no, not losslessly                                 | None          | Formal non-clinical taxonomy, if one exists                  |
| 5. Handling in estimand identity                    | Fail-closed posture (`CLM-03`, `CLM-09`)           | Conditional rule (Section 7)                                 | None          | External support for the conditional rule                    |
| 6. When handling changes E versus P                 | Corpus FND1-03/06 rows (`REG-4`)                   | Section 7 rule                                               | None          | Same                                                         |
| 7. Structurally checkable versus assumed            | `CLM-09`; declared-structure judgment basis        | Assumptions (e.g. ignorability in CX-5) are never structural | None          | None repository-side; external framing open                  |
| 8. The candidate phrase                             | Name-collision fact `CLM-10`                       | Section 8 verdict: reject as one attribute                   | None          | Whether a better formal concept already occupies this ground |
| 9. Minimum defeating counterexample                 | —                                                  | CX-4 defeats any universal missing-outcome mapping           | None          | None                                                         |
| 10. Exact narrow closing statement                  | —                                                  | Candidate recorded in Section 11                             | None          | Pass A sources plus steward reconciliation                   |

## 11. Residual holds and next evidence

| Hold       | Status after this pass                | Next evidence needed                                                                                  | Downstream work still blocked   |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------- |
| `FND1-H04` | `KEEP_OPEN`; repository side narrowed | Pass A primary non-clinical sources; steward reconciliation of both frozen results                    | General estimand vocabulary     |
| `FND1-H05` | Untouched                             | Adversarial review of derived-summary rules on an expanded corpus                                     | Relation vocabulary and schema  |
| `FND1-H06` | Sharpened, not closed                 | Design research for the bearer gaps found here: assessment occasion, units, margins, exposure history | Public schema and fields        |
| `FND1-H07` | Untouched                             | Attestation and provenance research                                                                   | Provenance field or reason code |
| `FND1-H08` | Untouched                             | Domain-specific sensitivity-link research                                                             | Sensitivity role and link       |

Candidate narrow closing statement for commission question 10, recorded as
`POSSIBLE_PROJECT_CONVENTION` for the steward and adopted by nothing: a
domain-neutral estimand scaffold distinguishing declared target population,
declared condition or exposure, outcome with an explicit assessment occasion,
population-level summary with contrast direction, and per-event-class handling
declarations (each carrying bearer, time relation, and outcome-existence
status) is reusable outside clinical trials, provided domain-specific event
categories and strategies remain separately declared and no clinical strategy
vocabulary is imported verbatim. Whether this statement can close `FND1-H04`
in `NARROW_AND_CLOSE` form depends on Pass A's external sources and is left
entirely to reconciliation (repository task 5): this pass selects no Protocol
vocabulary, field, schema, identifier, category list, or authority change.

## 12. Public-artifact and sanitization self-check

- [x] Only the assigned placeholder file was replaced; no other file changed.
- [x] The pass started from the exact commission commit.
- [x] Only the five fixed inputs were read in full; the Pass A result was not
      opened.
- [x] Release 2 paths, paired-t and t-family numerical-contract work, and
      unrelated review artifacts were excluded from evidence.
- [x] All seven counterexample cases are value-independent; no semantic
      identity was inferred from numerical proximity.
- [x] Direct fact, cross-source inference, possible project convention, and
      unknowns are separated (Section 4.1).
- [x] Every absence claim is bounded to the exact commit, scope, and search
      terms (Section 9.3).
- [x] Inaccessible external content is marked `NOT_VERIFIABLE`; none is
      reconstructed from memory.
- [x] Verbatim quotation from any one source totals fewer than 25 words;
      repository text is cited by path and line instead.
- [x] No Protocol adoption, schema, identifier, vocabulary registration,
      refusal code, default, API, implementation, or release decision is
      selected.
- [x] Branch name, filenames, commit message, and report prose identify only
      the research role and task; they do not identify or imply any drafting,
      review, or operating software, service, provider, or mechanism.
- [x] No confidential, personal, credential, private-repository, or
      non-public third-party material is present.

FND-1 NON-CLINICAL ESTIMAND REPOSITORY-ANALYSIS PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION
