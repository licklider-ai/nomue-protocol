# FND-1 Dual-Pass Reconciliation and Steward Disposition

## 0. Research metadata

| Item                       | Response                                                                                                                                                                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package                    | `FND-1`                                                                                                                                                                             |
| Role                       | Commissioning steward; cross-pass comparison and source-strength adjudication                                                                                                       |
| Completion date            | 2026-08-30                                                                                                                                                                          |
| Commission commit          | `28165f97d0d30ac6832f783839ba89514a3d522c`                                                                                                                                          |
| Genspark fixed-input base  | `dd823569ebad526cafe98f36cba1d67b3b2bcf41`                                                                                                                                          |
| Genspark result            | [`2026-08-30-genspark-primary-source-result.md`](2026-08-30-genspark-primary-source-result.md), verbatim SHA-256 `9211f29e32c619071b08c16c58c8899bcaebdc19690fc3fd6f24480ec3dfa467` |
| Repository-analysis result | [`2026-08-30-claude-code-repository-analysis-result.md`](2026-08-30-claude-code-repository-analysis-result.md), intake commit `82774b93dae5959532e8bfe191eaacdb0a7e5452`            |
| Explicit exclusions        | Release 2, paired-t and t-family numerical contracts, method defaults, schema or identifier adoption, APIs, implementation, and meta-analysis pooling                               |

This is informative Research Gate input. It records no Protocol adoption and
grants no implementation permission.

## 1. Identity and input checks

### 1.1 Input completeness

- Decision: `INPUT_COMPLETE`
- Both commissioned result files are present and distinguishable.
- The Genspark report was ingested without changing its bytes.
- The repository pass is the accepted source-bounded intake from commit
  `82774b93dae5959532e8bfe191eaacdb0a7e5452`.
- All 12 corpus cases and both investigator-created cases from each pass were
  available. Corpus Version 1 remains gold-label-free.

### 1.2 Independence and reconciliation boundary

- The investigators did not read one another's result before completing their
  isolated passes.
- Genspark did not operate the repository; its report is preserved as supplied.
- The repository pass disclosed incidental exposure to an excluded profile
  overview. The accepted intake records, but does not use, that exposure.
- Agreement is not evidence by vote. Each accepted claim remains bounded by its
  inspected source or repository scope.
- Steward reconciliation may select a research disposition and preserve holds;
  it does not select Protocol surfaces or implementation behavior.

## 2. Executive verdict

### 2.1 Research disposition

**Selection:** `NARROW`

**Steward disposition:** `ACCEPTED AS DUAL-PASS SOURCE-BOUNDED FND-1 INPUT / NARROW`

The passes jointly support a layered identity model and reject the proposed
four relation labels as a sufficient single-axis taxonomy. Estimand identity,
inference procedure, tested hypothesis, multiplicity guarantee, declaration or
admissibility status, and verification or lineage assurance are different
questions. The full Gate remains open because the original Holm,
Benjamini-Hochberg, Dunnett, and Tukey papers were not inspected in the external
pass, formal procedure claims remain `NOT_VERIFIABLE`, and no formal
non-clinical analogue of intercurrent-event semantics was established.

**Protocol adoption:** `NO`

### 2.2 Conclusion summary

| Item                     | Reconciled conclusion                                                                                                 | Confidence                                           | Basis                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| H1                       | A method identifier does not identify an estimand in general; a versioned bundle may pin a one-to-one supported slice | HIGH                                                 | ICH attributes; repository method/estimand separation |
| H2                       | Prospective declarations and historical truth or assurance must be separated                                          | HIGH                                                 | FDA, ASA, Gelman-Loken; repository provenance limits  |
| H3                       | Family membership and error criterion form a guarantee boundary; named-procedure theorem conditions remain held       | HIGH for boundary; LOW to MEDIUM for held procedures | FDA; cross-source FWER/FDR definitions; cases 09/10   |
| H4                       | Four labels are insufficient as one taxonomy; at most they are derived summaries                                      | HIGH                                                 | Both passes; cases 02, 08, 09, 10, 11, 12             |
| H5                       | An abstract estimand scaffold is reusable; clinical event-strategy labels do not transfer verbatim                    | MEDIUM                                               | ICH; repository gaps; missing non-clinical glossary   |
| Strongest counterexample | FND1-11: post-outcome selection remains inadmissible despite accidental numerical agreement                           | HIGH                                                 | FDA, ASA, Gelman-Loken, repository posture            |

## 3. Research method

### 3.1 Reconciliation method

1. Preserve both reports as separate informative artifacts.
2. Compare access, claim status, cases, attributes, consistency rules, attacks,
   and holds.
3. Downgrade claims whose strength exceeds the inspected source.
4. Resolve case differences by identifying the axis each pass classified.
5. Keep source facts, inference, and possible project convention separate.
6. Carry unresolved questions forward without adding Protocol surface.

### 3.2 Evidence hierarchy and source-strength rulings

| Basis                                | Reconciled treatment                                                                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| ICH E9(R1)                           | Accepted within Genspark's pinpoints for five estimand attributes, clinical event strategies, and sensitivity/supplementary terminology |
| FDA Multiple Endpoints, October 2022 | Accepted for prospective specification, families, FWER framing, and procedures described by the guidance                                |
| ASA Statement and Gelman-Loken       | Accepted for selective reporting and data-contingent analytical-choice concerns within reported scope                                   |
| Storey (2002), as reported           | Primary research for its own FDR definitions; not direct verification of the Benjamini-Hochberg original                                |
| Holm (1979)                          | FDA corroborates a regulatory description; original proof-level strong-control and dependence claims remain `NOT_VERIFIABLE`            |
| Benjamini and Hochberg (1995)        | FDR definition is cross-source supported; original theorem and conditions remain `NOT_VERIFIABLE`                                       |
| Dunnett (1955), Tukey (1949)         | Exact distributions, attribution details, and formal guarantees remain `NOT_VERIFIABLE`; secondary corroboration is context only        |
| Repository inspection                | Accepted only as a version-fixed observation of current representation, authority boundaries, gaps, and name collisions                 |

Genspark's metadata mentions two inaccessible primary-source PDFs, while its
source register records additional uninspected originals. The register
controls: the minimum primary-source basis is incomplete. Storey (2002) is also
listed as `SECONDARY` and later used as a primary FDR paper; this disposition
treats it as primary only for its own statements.

## 4. Source register

| ID         | Artifact or source                              | Type              | Version/access                                       | Reconciled use                             |
| ---------- | ----------------------------------------------- | ----------------- | ---------------------------------------------------- | ------------------------------------------ |
| `PASS-G`   | Genspark result linked above                    | Informative input | 2026-08-30; verified as supplied                     | External findings, cases, holds            |
| `PASS-R`   | Repository result linked above                  | Informative input | commit `82774b9…`; repository-verified               | Repository facts, cases, gaps              |
| `SRC-ICH`  | ICH E9(R1) Addendum                             | Primary normative | 2019 Step 4 / 2020 EMA release; verified by `PASS-G` | Clinical estimand structure                |
| `SRC-FDA`  | FDA Multiple Endpoints Guidance                 | Primary normative | October 2022; verified by `PASS-G`                   | Prospective specification and multiplicity |
| `SRC-ASA`  | Wasserstein and Lazar, ASA Statement            | Primary statement | 2016; DOI `10.1080/00031305.2016.1154108`; verified  | Selective reporting boundary               |
| `SRC-GL`   | Gelman and Loken, Garden of Forking Paths       | Primary research  | 2013/2014 version; verified                          | Data-contingent choice                     |
| `SRC-HOLM` | Holm, Sequentially Rejective Procedure          | Primary research  | 1979; not directly verified                          | Original theorem held                      |
| `SRC-BH`   | Benjamini and Hochberg, False Discovery Rate    | Primary research  | 1995; not directly verified                          | Original theorem held                      |
| `SRC-DT`   | Dunnett (1955) and Tukey (1949) original papers | Primary research  | Not directly verified                                | Procedure-specific claims held             |

## 5. Claim-evidence ledger

| ID       | Atomic claim                                                           | Class                               | Result                   | Disposition                        |
| -------- | ---------------------------------------------------------------------- | ----------------------------------- | ------------------------ | ---------------------------------- |
| `RCL-01` | Estimand and inference procedure are distinct identity objects         | INFERENCE                           | SUPPORTED                | Retain E and P axes                |
| `RCL-02` | Method identifier alone does not identify an estimand in general       | INFERENCE                           | SUPPORTED                | Narrow H1 for bundle-pinned slices |
| `RCL-03` | Null, direction, and margin may differ while estimand is fixed         | INFERENCE                           | SUPPORTED                | Add H axis distinct from E         |
| `RCL-04` | Family membership and error criterion change the protected guarantee   | DIRECT_FACT plus inference          | SUPPORTED                | Add M axis; adopt no procedure     |
| `RCL-05` | Declaration consistency can be checked without proving timing or truth | REPOSITORY_FACT plus inference      | SUPPORTED                | Separate D from V                  |
| `RCL-06` | Exact declared one-to-one unit conversion can preserve E               | POSSIBLE_PROJECT_CONVENTION         | PARTIAL                  | Hold canonical representation      |
| `RCL-07` | Summary, population, assessment time, or contrast changes E            | DIRECT_FACT plus corpus application | SUPPORTED                | Retain E distinctions              |
| `RCL-08` | `aligned` never authorizes combination or pooling                      | POSSIBLE_PROJECT_CONVENTION         | Required safety boundary | Carry to later design              |
| `RCL-09` | Four labels cannot losslessly encode all relevant axes                 | FALSIFICATION_RESULT                | SUPPORTED                | Reject as primary taxonomy         |
| `RCL-10` | Dunnett/Tukey formal guarantees were directly verified                 | DIRECT_FACT                         | NOT_VERIFIABLE           | Hold                               |
| `RCL-11` | Holm/BH original theorem conditions were directly verified             | DIRECT_FACT                         | NOT_VERIFIABLE           | Hold                               |
| `RCL-12` | Free-text objective substitutes for structured identity                | POSSIBLE_PROJECT_CONVENTION         | CONTRADICTED             | Context only, never a substitute   |

## 6. Counterexample case classification

Axes: E = estimand; P = inference procedure/uncertainty; H = tested
hypothesis/decision target; M = multiplicity guarantee; D =
declaration/admissibility; V = verification, lineage, or assurance.

| Case    | Genspark                      | Repository pass               | Reconciled axis result                                                   | Derived summary                                     |
| ------- | ----------------------------- | ----------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------- |
| FND1-01 | `aligned`                     | `aligned`                     | Same E/P/H/M; implementation differs on V                                | `aligned`, no combination authority                 |
| FND1-02 | `unresolved`                  | `unresolved`                  | Same E; P differs                                                        | `unresolved`; no fifth atomic relation              |
| FND1-03 | `not_comparable`              | `not_comparable`              | E differs by assessment time; no joint structure                         | `not_comparable`                                    |
| FND1-04 | `aligned`                     | conditional `aligned`         | E equivalent only under exact, declared, consistently applied conversion | conditional `aligned`                               |
| FND1-05 | `not_comparable`              | `not_comparable`              | E differs by population summary                                          | `not_comparable`                                    |
| FND1-06 | `not_comparable`              | `not_comparable`              | E differs by population; support affects D/V, not target identity        | `not_comparable`                                    |
| FND1-07 | `not_comparable`              | `parallel_not_combinable`     | E contrasts differ inside a declared shared family                       | `parallel_not_combinable` as narrower summary       |
| FND1-08 | `not_comparable`              | `unresolved`                  | Same E; H differs                                                        | `unresolved` pending derivation rules               |
| FND1-09 | `not_comparable`              | `unresolved`                  | Same marginal E/P; M member set differs                                  | `unresolved` pending derivation rules               |
| FND1-10 | `not_comparable`              | `parallel_not_combinable`     | Same member set; M criterion differs                                     | related/non-combinable summary only                 |
| FND1-11 | `inadmissible_or_unsupported` | same                          | D fails through outcome-dependent selection                              | `inadmissible`, distinct from unsupported scope     |
| FND1-12 | same or `unresolved`          | `inadmissible_or_unsupported` | D is insufficient; E/P/H/M are unidentified                              | `insufficient_declaration`, not unsupported science |

Total corpus cases reconciled: 12/12.

## 7. Package-specific required analysis

### 7.1 Candidate identity decomposition

| Axis | Meaning                               | Candidate declarations                                                                                         | Status                                       |
| ---- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| E    | Scientific estimand                   | population; condition/comparator; outcome/timing/unit/scale; event handling; transformation; summary; contrast | Research candidate only                      |
| P    | Inference procedure                   | analysis set; estimator; variance model; resampling; uncertainty target; confidence level                      | Research candidate only                      |
| H    | Tested hypothesis and decision target | null; direction; margin; role                                                                                  | Research candidate only                      |
| M    | Multiplicity guarantee                | member set; error criterion/level; procedure/version                                                           | Research candidate; procedures held          |
| D    | Declaration and admissibility         | completeness; contradiction; prospective procedure selection; supported-scope status                           | Research candidate; terms not adopted        |
| V    | Verification and assurance            | lineage; attestation; provenance evidence; check version                                                       | Non-semantic axis; deferred phases respected |

The original relation labels are not promoted to primary identity values. If
retained, they are derived summaries over E/P/H/M/D, with V separate.
`inadmissible_or_unsupported` should be split into insufficient declaration,
contradiction, unsupported Protocol scope, and inadmissible provenance.

### 7.2 Internal-consistency rules retained for later design

| Candidate                                                           | Checkability                | Ruling/hold                                                          |
| ------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------- |
| Estimate, interval, null, margin, and unit refer to the same E/H    | PARTIAL                     | Sound; structured surfaces absent                                    |
| Every tested H is a declared member of M                            | PARTIAL                     | Sound; family surface absent                                         |
| M declares criterion, level, procedure, and version                 | PARTIAL                     | Sound; procedure semantics not closed                                |
| Sensitivity link preserves E while allowing declared P perturbation | PARTIAL                     | Sound narrow candidate; link semantics held                          |
| Exact unit conversion applies to estimate, interval, and margin     | PARTIAL                     | Sound; canonical units undecided                                     |
| Procedure-selection declaration has no outcome-dependent branch     | PARTIAL                     | Structurally checkable; cannot prove historical timing               |
| Routing timestamp predates outcome inspection                       | NO as pure structural truth | Genspark's “given honest logs” rule is narrowed to V-level assurance |
| Extrapolation justification is present                              | PARTIAL                     | Validity/support check, not identity check                           |

### 7.3 Multiplicity and ICH boundary

- Omnibus, all-pairs, many-to-one, planned-contrast, fixed-sequence, and
  gatekeeping structures differ by member set, claim structure, or procedure.
  FND-1 selects no default.
- FWER and FDR are different guarantee quantities, not interchangeable labels
  or a universal scalar ordering.
- ICH population, condition, variable, summary, and event-handling structure
  informs E. Clinical strategy names are not copied verbatim to general science.
- Scientific objective and role provide context but never replace E/H.

### 7.4 Investigator-created cases

The passes supplied complementary examples. True sensitivity keeps E fixed and
perturbs a predeclared P-level assumption. Mislabeled sensitivity changes the
analysis population or event strategy and therefore the target. A future corpus
Version 2 should include one of each pattern, subject to independent corpus
review rather than treating investigator labels as gold labels.

## 8. Adversarial findings

### 8.1 Falsification results

| Hypothesis | Result                  | Narrow form                                                                   |
| ---------- | ----------------------- | ----------------------------------------------------------------------------- |
| H1         | NARROWED                | General method identity is not E identity; a bundle may bind a narrow pair    |
| H2         | NARROWED                | Require prospective declarations, but do not claim structural proof of timing |
| H3         | SURVIVED within bounds  | H/M define guarantee boundaries; named theorems stay held                     |
| H4         | FALSIFIED as sufficient | Use E/P/H/M/D/V; relation words are derived summaries                         |
| H5         | NARROWED                | Reuse an abstract scaffold, not clinical terms verbatim                       |

### 8.2 Material disagreements

| Issue                 | Steward ruling                                                             |
| --------------------- | -------------------------------------------------------------------------- |
| Fifth relation        | Do not add one primary relation; use the multi-axis decomposition          |
| FND1-07               | Shared family supports `parallel_not_combinable` only as a derived summary |
| FND1-08/09            | Record H/M differences; leave summary `unresolved` pending rules           |
| FND1-10               | Record distinct M guarantees; imply no ordering or pooling                 |
| Routing timestamp     | Consistency is checkable; timing/truth requires V-level assurance          |
| Extrapolation support | Declared E can be identified while adequacy remains unasserted             |
| `aligned`             | Never authorizes combination, pooling, or interchangeability               |

### 8.3 Negative and absence claims

Repository absence findings are limited to commission commit `28165f97…` and
the paths searched by `PASS-R`; they do not generalize to excluded paths, later
revisions, or external standards. The inspected scope had no structured
multiplicity surface, sensitivity link, assessment-time/unit/margin surface, or
general analysis-set predicate. These gaps identify research questions, not
permission to add fields.

## 9. Required narrowing and unresolved holds

### 9.1 Candidate-hypothesis revision

| Candidate                         | Disposition          | Output                                                 |
| --------------------------------- | -------------------- | ------------------------------------------------------ |
| Single method/result identity     | Split                | E/P/H/M/D/V                                            |
| Four relations as taxonomy        | Reject as sufficient | Derived summaries only; `unresolved` during research   |
| Combined inadmissible/unsupported | Split                | Declaration, contradiction, support, provenance differ |
| ICH vocabulary in general science | Narrow               | Abstract scaffold only after domain research           |
| Numerical agreement as identity   | Reject               | Declaration-based, value-independent identity          |

### 9.2 Holds

| Hold       | Question/evidence needed                                                   | Downstream work blocked               |
| ---------- | -------------------------------------------------------------------------- | ------------------------------------- |
| `FND1-H01` | Direct Holm (1979) inspection for control/dependence conditions            | Formal Holm semantics/support         |
| `FND1-H02` | Direct Benjamini-Hochberg (1995) theorem inspection                        | Formal BH semantics/support           |
| `FND1-H03` | Direct Dunnett/Tukey original-paper inspection                             | Named many-to-one/all-pairs semantics |
| `FND1-H04` | Primary non-clinical event/missing-outcome sources                         | General estimand vocabulary           |
| `FND1-H05` | Adversarial review of derived-summary rules on expanded corpus             | Relation vocabulary/schema            |
| `FND1-H06` | Design research for units, timing, margins, transformations, analysis sets | Public schema/fields                  |
| `FND1-H07` | Attestation/provenance research for procedure-selection assurance          | Provenance field/reason code          |
| `FND1-H08` | Domain-specific sensitivity-link research                                  | Sensitivity role/link                 |

## 10. Research Gate handoff

### 10.1 Deliverables achieved

- Two isolated passes preserved and source strengths reconciled.
- 12/12 corpus cases reconciled value-independently.
- Complementary investigator sensitivity patterns compared.
- E/P/H/M/D/V decomposition and eight holds recorded.

### 10.2 Recommended next action

1. Run a targeted primary-text closure pass for Holm, Benjamini-Hochberg,
   Dunnett, and Tukey.
2. Run a separate non-clinical estimand/event-handling vocabulary pass.
3. Expand and independently review the corpus and derived-summary rules.
4. Only after holds close, decide whether any part advances to RFC design.

Unauthorized work remains: every Protocol field, schema, identifier, vocabulary
registration, refusal code, supported method, default, public check, API,
implementation, release change, and Release 2 decision.

### 10.3 Final statement

The evidence is ready for targeted follow-up research, not FND-1 Gate closure.

## 11. Public-artifact and sanitization self-check

- [x] Both reports remain separately reviewable.
- [x] Genspark input is preserved byte-for-byte.
- [x] Every corpus case was reconciled.
- [x] Facts, inference, conventions, and disposition are separated.
- [x] Uninspected primary texts remain `NOT_VERIFIABLE`.
- [x] No identity comes from numerical proximity.
- [x] Absence claims are version- and scope-bounded.
- [x] Release 2, paired-t, and t-family work remain excluded.
- [x] No Protocol adoption or implementation decision is selected.
- [x] No confidential, personal, credential, or non-public material is present.

NOT READY FOR FND-1 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION
