# FND-1 Non-Clinical Estimand Primary-Source Pass A — Result

## 1. Identity, input, access, and independence checks

**Role.** Independent external primary-source investigator for `FND1-H04`.

**Assignment.** Pass A of the two isolated passes commissioned in `2026-08-31-nonclinical-estimand-source-closure-commission.md`. This pass is informative research; it is non-normative, not a Protocol adoption, does not select a schema, does not close the full FND-1 Research Gate, and does not affect a release.

**Bounded question (verbatim from commission §1).** Determine which parts of an estimand description can be reused outside clinical trials — general experimental, animal, assay, and wet-lab research — without importing clinical intercurrent-event terminology or implying that one vocabulary fits every domain. The candidate proposition to attack:

> A reusable abstract scaffold may distinguish population, condition or exposure, outcome and timing, event or missing-outcome handling, and population-level summary, while domain-specific event categories and handling strategies remain separate.

**Input read before source work.** Commission only (`2026-08-31-nonclinical-estimand-source-closure-commission.md`).

**Blindness.** No Pass B result, no reconciliation, no review branch, no Release 2 artifact, no unrelated file in the repository was consulted. General background knowledge is disclosed but is not treated as evidence.

**Repository operation.** None. This report is returned as one complete Markdown document to the steward.

**Access rules applied.** Decision-bearing claims require primary or formal text with a pinpoint; snippets, abstracts, blogs, and other reports are discovery aids only. An inaccessible source did not stop the pass; only the affected claim is marked `NOT_VERIFIABLE`.

---

## 2. Disposition

**`NARROW`.**

The candidate proposition survives only in a substantially narrower form. Primary text supports a reusable abstract triple — target population, exposure/condition contrast, and outcome-with-timing — plus an explicit population-level summary. It does NOT support the further inclusion of a single "event or missing-outcome handling" attribute as part of estimand identity across all non-clinical domains, because (a) the ICH E9(R1) construct of "intercurrent event" and its five naming strategies are text-bound to clinical treatment and cannot be extended verbatim, (b) missing outcomes, censoring at a detection limit, condition switching, terminal events, and structurally-undefined outcomes have materially different consequences that a single abstract category erases, and (c) formal non-clinical primary sources reachable in this pass do not use an "estimand" construct at all — they organize analogous facts through different bearers (analyte-in-matrix quantification, experimental-unit outcome measurement).

Rationale in detail is developed in Sections 5-10.

---

## 3. Search method and version-fixed source register

**Method.** Targeted retrieval of primary and formal texts covering (i) the ICH clinical estimand reference, (ii) formal potential-outcomes / causal-effect definitions outside the ICH clinical-trial vocabulary, (iii) formal texts governing non-clinical, laboratory, animal, and assay research, (iv) primary or formal sources on missing outcomes, censoring, detection limits, post-assignment events, and terminal events outside a purely clinical framing, and (v) the nearest counter-evidence to the candidate scaffold. Each retrieval targeted full text with a pinpoint; snippet-only or abstract-only returns were rejected as evidence.

**Version-fixed register.** All sources are identified with publication or adoption date; where the primary was not reachable, the register also records the closest formal secondary consulted for discovery only.

| #   | Source                                                                                                                                                                                       | Version / date                                              | Access status                                                                                                                           | Evidence tier                                                                                                         |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| S1  | ICH E9(R1) — _Addendum on Estimands and Sensitivity Analysis in Clinical Trials_. Final Step 4.                                                                                              | Adopted 20 November 2019                                    | Retrieved in substantial part (Preface, A.1, A.3.1, A.3.2, A.3.3; later sections truncated)                                             | Primary                                                                                                               |
| S2  | ICH M10 — _Bioanalytical Method Validation and Study Sample Analysis_. Final Step 4.                                                                                                         | Adopted 24 May 2022                                         | Retrieved substantially (Sections 1-3, partial 4)                                                                                       | Primary                                                                                                               |
| S3  | ICH Q2(R2) — _Validation of Analytical Procedures_. Final.                                                                                                                                   | Adopted 1 November 2023 (error-correction 30 November 2023) | Retrieved substantially (Sections 1-3, Table 1)                                                                                         | Primary                                                                                                               |
| S4  | Percie du Sert N. et al. _The ARRIVE guidelines 2.0: Updated guidelines for reporting animal research._ PLOS Biology 18(7):e3000410.                                                         | 14 July 2020                                                | Retrieved (article text; Table 1 / Table 2 images not readable in text form)                                                            | Primary                                                                                                               |
| S5  | ARRIVE guidelines 2.0 — Essential 10 index page.                                                                                                                                             | Accessed                                                    | Retrieved (overview only)                                                                                                               | Primary (index)                                                                                                       |
| S6  | Meng X-L. & Rubin D.B. _Performing likelihood ratio tests with multiply-imputed data sets._ Biometrika 79(1):103-111.                                                                        | March 1992                                                  | Retrieved (full text)                                                                                                                   | Primary — used only for its verbatim references to MAR and to Rubin (1976); NOT a substitute for Rubin (1976) itself. |
| S7  | Rubin D.B. _Estimating causal effects of treatments in randomized and nonrandomized studies._ Journal of Educational Psychology 66(5):688-701.                                               | October 1974                                                | Primary text NOT reached. Secondary Lopes 2015 lecture notes retrieved, containing verbatim quotations of the abstract and definitions. | Secondary discovery only                                                                                              |
| S8  | Rubin D.B. _Inference and missing data._ Biometrika 63(3):581-592.                                                                                                                           | December 1976                                               | Primary text NOT reached (JSTOR anti-bot; Scribd blocked). Discovery via Meng & Rubin (1992) and Heymans (2019) secondary.              | Secondary discovery only                                                                                              |
| S9  | Splawa-Neyman J. _On the application of probability theory to agricultural experiments. Essay on principles. Section 9._ Statistical Science 5(4):465-472 (translated by Dąbrowska & Speed). | 1990 (original 1923)                                        | Primary text NOT reached (JSTOR blocked). Discovery via secondary.                                                                      | Secondary discovery only                                                                                              |
| S10 | Hernán M. & Robins J. _Causal Inference: What If_ (textbook).                                                                                                                                | 2 Jan 2024 print                                            | Primary text NOT reached (host returned network error).                                                                                 | —                                                                                                                     |
| S11 | Helsel D.R. _Less than obvious — statistical treatment of data below the detection limit._ Environmental Science & Technology 24(12):1766-1774.                                              | 1990                                                        | Primary text NOT reached; discovery via multiple downstream citations.                                                                  | Secondary discovery only                                                                                              |
| S12 | OECD Test No. 408 — _Repeated Dose 90-Day Oral Toxicity Study in Rodents._                                                                                                                   | 1998 (current)                                              | Primary text NOT reached (host returned network error).                                                                                 | —                                                                                                                     |
| S13 | Zeng J. & Wang R. _A Survey of Causal Inference Frameworks._ arXiv:2209.00869.                                                                                                               | September 2022                                              | Retrieved. Survey — discovery only, not evidence for the primary claims it summarises.                                                  | Secondary                                                                                                             |
| S14 | Heymans M.W. & Eekhout I. _Applied Missing Data Analysis with SPSS and (R)Studio_ (Bookdown chapter 7 on missing-data mechanisms).                                                           | Ongoing                                                     | Retrieved. Secondary explanation of Rubin's MCAR/MAR/MNAR.                                                                              | Secondary                                                                                                             |

Every claim below carries an explicit tier: `VERIFIED_DIRECT` (primary text with pinpoint), `CROSS_SOURCE_INFERENCE`, `POSSIBLE_PROJECT_CONVENTION`, `CONTRADICTED`, or `NOT_VERIFIABLE`.

Verbatim quotation from any single source is kept below 25 words throughout.

---

## 4. Atomic claim-evidence ledger

| #   | Atomic claim                                                                                                                                                                                                                                                                  | Evidence                                                                                                                                                       | Tier                                                                                                                                                                                               |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | ICH E9(R1) defines the estimand as a precise description of the treatment effect reflecting the clinical question of interest.                                                                                                                                                | S1 §A.3, opening paragraph: an estimand summarises at a population level what the outcomes would be in the same patients under different treatment conditions. | VERIFIED_DIRECT                                                                                                                                                                                    |
| C2  | ICH E9(R1) says the description of an estimand involves precise specifications of certain attributes based on clinical considerations and on how intercurrent events are reflected.                                                                                           | S1 §A.3 last paragraph before A.3.1.                                                                                                                           | VERIFIED_DIRECT                                                                                                                                                                                    |
| C3  | ICH E9(R1) treats intercurrent events as events occurring after treatment initiation that affect either the interpretation or the existence of the measurements associated with the clinical question of interest.                                                            | S1 §A.3.1 opening.                                                                                                                                             | VERIFIED_DIRECT                                                                                                                                                                                    |
| C4  | ICH E9(R1) explicitly separates intercurrent events from missing data: "Unlike missing data, intercurrent events are not to be thought of as a drawback to be avoided in clinical trials."                                                                                    | S1 §A.3.1, ~word count ≤ 25.                                                                                                                                   | VERIFIED_DIRECT                                                                                                                                                                                    |
| C5  | ICH E9(R1) distinguishes discontinuation of randomised treatment (an intercurrent event, addressed via the estimand) from study withdrawal (giving rise to missing data, addressed in analysis).                                                                              | S1 §A.1 (paragraph on data handling and missing data) and §A.3.1 last paragraph.                                                                               | VERIFIED_DIRECT                                                                                                                                                                                    |
| C6  | ICH E9(R1) names five strategies for addressing intercurrent events: treatment policy, hypothetical, composite variable, while on treatment, principal stratum.                                                                                                               | S1 §A.3.2 subheadings.                                                                                                                                         | VERIFIED_DIRECT                                                                                                                                                                                    |
| C7  | ICH E9(R1) explicitly warns that the treatment policy strategy generally cannot be implemented for terminal events, because values for the variable after the event do not exist.                                                                                             | S1 §A.3.2 (Treatment policy strategy).                                                                                                                         | VERIFIED_DIRECT                                                                                                                                                                                    |
| C8  | ICH E9(R1) itself situates its principles as applying whenever a treatment effect is estimated, with regulatory focus on confirmatory clinical trials.                                                                                                                        | S1 §A.1 penultimate paragraph.                                                                                                                                 | VERIFIED_DIRECT                                                                                                                                                                                    |
| C9  | ICH E9(R1) says composite-variable and while-on-treatment strategies impact the definition of the variable itself; principal-stratum strategy impacts the population.                                                                                                         | S1 §A.3.2 (respective subsections).                                                                                                                            | VERIFIED_DIRECT                                                                                                                                                                                    |
| C10 | ICH M10 defines a bioanalytical method as a set of procedures used for measuring analyte concentrations in biological samples.                                                                                                                                                | S2 §2.2.1.                                                                                                                                                     | VERIFIED_DIRECT                                                                                                                                                                                    |
| C11 | ICH M10 specifies calibration range as bounded by the LLOQ and ULOQ; concentrations below LLOQ are quantitation-limited.                                                                                                                                                      | S2 §3.2.4.                                                                                                                                                     | VERIFIED_DIRECT                                                                                                                                                                                    |
| C12 | ICH M10 does not use the term "estimand" and does not define a treatment or exposure contrast between arms.                                                                                                                                                                   | S2, full available text inspected — the concepts organized are analyte quantification, selectivity/specificity, matrix effect, accuracy, precision, stability. | VERIFIED_DIRECT (scoped absence: full retrieved text through §4.3.2, and the Table of Contents through Section 9 Glossary; the term "estimand" does not appear.)                                   |
| C13 | ICH Q2(R2) organizes analytical procedure validation around performance characteristics: specificity/selectivity, range/response, accuracy, precision, robustness.                                                                                                            | S3 §3, Table 1.                                                                                                                                                | VERIFIED_DIRECT                                                                                                                                                                                    |
| C14 | ICH Q2(R2) states the objective of validation of an analytical procedure is to demonstrate it is fit for the intended purpose.                                                                                                                                                | S3 §1.1.                                                                                                                                                       | VERIFIED_DIRECT                                                                                                                                                                                    |
| C15 | ICH Q2(R2) does not use the term "estimand" and does not describe treatment effects, intercurrent events, or population summaries; its target quantities are analyte-in-matrix concentrations and product-quality attributes.                                                 | S3, full retrieved text inspected.                                                                                                                             | VERIFIED_DIRECT (scoped absence over retrieved text and Table of Contents.)                                                                                                                        |
| C16 | ARRIVE 2.0 organizes in vivo animal-experiment reporting around: study design, sample size, inclusion/exclusion criteria, randomisation, blinding, outcome measures, statistical methods, experimental animals, experimental procedures, results.                             | S4, ARRIVE Essential 10 list; S5.                                                                                                                              | VERIFIED_DIRECT                                                                                                                                                                                    |
| C17 | ARRIVE 2.0 explicitly identifies inclusion and exclusion criteria as a key aspect of data handling that prevents ad hoc exclusion of data.                                                                                                                                    | S4, "Introducing ARRIVE 2.0" paragraph on new additions.                                                                                                       | VERIFIED_DIRECT                                                                                                                                                                                    |
| C18 | ARRIVE 2.0 does not define an "estimand" and does not use ICH E9(R1) intercurrent-event terminology; it is a reporting checklist, not a target-quantity specification.                                                                                                        | S4, article body inspected in full.                                                                                                                            | VERIFIED_DIRECT (scoped absence.)                                                                                                                                                                  |
| C19 | Rubin (1974) formalized potential outcomes for both randomized and nonrandomized studies, with the target being an average (typical) causal effect defined by contrasting the outcome that would occur under treatment E and the outcome under treatment C for the same unit. | Secondary S7 quotes the paper's abstract and definitions verbatim.                                                                                             | CROSS_SOURCE_INFERENCE (primary text not reached; secondary contains verbatim block quotes that agree with the very widely cited abstract).                                                        |
| C20 | Neyman (1923, English translation 1990) is credited as the earliest formal statement of potential outcomes for randomized (agricultural) experiments, with two-index notation on units × treatments.                                                                          | S9 discovery only; also confirmed as background in S13.                                                                                                        | NOT_VERIFIABLE (primary not reached in this pass; framework attribution is universally acknowledged in the field but the pinpoint is not read).                                                    |
| C21 | Rubin (1976) defined missing-data mechanisms MCAR / MAR / MNAR (later so named) via the joint distribution of the observed-data pattern and the missingness indicator.                                                                                                        | Discovery via S6 (Meng & Rubin 1992 explicitly cites Rubin 1976 as the origin of the missing-at-random definition) and S14.                                    | CROSS_SOURCE_INFERENCE (primary not reached; multiple independent secondary sources agree).                                                                                                        |
| C22 | The potential-outcomes framework treats causal inference as intrinsically a missing-data problem: at most one potential outcome is observed per unit.                                                                                                                         | Explicit sentence in S13 §2 attributing this to Rubin (1976); also present in S7 abstract framing.                                                             | CROSS_SOURCE_INFERENCE.                                                                                                                                                                            |
| C23 | Observations below a detection or quantification limit are treated formally as left-censored, not as missing at random.                                                                                                                                                       | Discovery via S11 register only.                                                                                                                               | NOT_VERIFIABLE for the specific 1990 pinpoint; but the concept is confirmed indirectly by S2 §3.2.4 (LLOQ defines the lower calibration bound, i.e., below-LLOQ values are analytically censored). |
| C24 | ICH E9(R1) framework is written for a _treatment effect_ being estimated, but the addendum itself notes the principles are also applicable for single-arm trials and observational studies within the same clinical scope.                                                    | S1 §A.1, last paragraph of that section.                                                                                                                       | VERIFIED_DIRECT                                                                                                                                                                                    |
| C25 | No inspected non-clinical primary text uses the ICH E9(R1) five-strategy naming scheme (treatment policy / hypothetical / composite / while on treatment / principal stratum).                                                                                                | S2, S3, S4 full inspected.                                                                                                                                     | VERIFIED_DIRECT (scoped absence, over the specific documents inspected and their retrieved sections).                                                                                              |

---

## 5. Clinical-specific versus reusable-structure matrix

The comparison below asks, for each named element, whether ICH E9(R1)'s formulation is (a) intrinsically clinical, (b) potentially reusable if rephrased, or (c) genuinely domain-neutral in the primary text.

| ICH E9(R1) element                                    | Clinical vocabulary carried in the E9(R1) text                                                                                         | Reusable core if rephrased                                                    | Assessment                                                                                                                                                                                   |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Treatment(s) being compared                           | "medicine", "randomised treatment", "assigned treatment"                                                                               | An abstract exposure or condition contrast between labelled arms              | (b) Reusable at the level of "exposure contrast between labelled sets", but "treatment" as used in E9(R1) implies a clinical intervention assigned to a person, so the word does not travel. |
| Population                                            | Patients / subjects                                                                                                                    | Experimental units in a defined target set                                    | (c) Reusable — "target set of units defined a priori".                                                                                                                                       |
| Variable / endpoint                                   | Clinical outcome measurements                                                                                                          | Measurable outcome with a defined assessment time or window                   | (c) Reusable.                                                                                                                                                                                |
| Intercurrent events                                   | "occurring after treatment initiation", "discontinuation of assigned treatment", "additional therapy", "terminal events such as death" | Post-assignment events that affect existence or interpretation of the outcome | The **generic idea** (post-assignment events affecting the outcome) is reusable; the **specific taxonomy** and its five naming strategies (see Section 8) are not. See C3, C6, C9.           |
| Population-level summary                              | Contrast between distributions of outcomes across arms                                                                                 | Summary of the outcome distribution over the target set under each condition  | (c) Reusable.                                                                                                                                                                                |
| Missing data (kept separate from intercurrent events) | Study withdrawal, administrative censoring                                                                                             | Missing observations for outcomes that remain conceptually defined            | E9(R1) EXPLICITLY separates this from intercurrent events (C4-C5). Any reusable scaffold that folds them back together therefore contradicts the source.                                     |

**Conclusion of matrix.** The genuinely domain-neutral core is the quadruple {target unit set, exposure/condition contrast, outcome with timing, population-level summary}. Anything about how post-assignment events are named and handled is domain-tied at the level of ICH E9(R1). Attempting to lift the five clinical strategies wholesale into non-clinical domains would be a category import unwarranted by any primary text this pass reached.

---

## 6. Six-or-more counterexample classifications

Nine cases across five domains are analyzed. For each: **Domain** — the field; **Bearer** — the smallest object of which the fact is true; **Time relation** — timing of the event relative to the outcome window; **Estimand-identity effect** — does the change alter what is being estimated (target quantity), or only how it is estimated?; **Procedure effect** — analytical/statistical handling; **Missing declaration** — is the outcome missing, censored, or structurally undefined?; **Evidence basis**; **Cross-domain-term information loss** — what is lost if this case is filed under a single "event or missing-outcome handling" label.

### Case 1 — Analytical chemistry: value below the LLOQ

- **Domain.** Bioanalytical (regulated small-molecule LC-MS quantification).
- **Bearer.** A single analyte concentration measurement on a single biological sample from one experimental unit.
- **Time relation.** Not a post-assignment event at all; a property of the measurement at the assessment time.
- **Estimand-identity effect.** None — the target quantity (analyte concentration in the sample) remains defined; only its numerical value is not resolvable below LLOQ (C11).
- **Procedure effect.** Substantial — imputation by LLOQ/2, formal left-censored likelihood, or reporting as "<LLOQ" (discovery via S11).
- **Missing declaration.** Left-censored, NOT missing at random.
- **Evidence basis.** VERIFIED_DIRECT for LLOQ existence (C11); the censoring vs. missing distinction is CROSS_SOURCE_INFERENCE.
- **Cross-domain-term information loss.** Filing this under "missing-outcome handling" erases the fact that the outcome is bounded, not absent — the sample has a value that is known to be less than LLOQ.

### Case 2 — Animal in vivo study: unit reaches terminal event before the measurement time

- **Domain.** Animal (in vivo pharmacology / toxicology).
- **Bearer.** One animal, one primary outcome scheduled at end of study.
- **Time relation.** Post-assignment, pre-measurement.
- **Estimand-identity effect.** Depends on target quantity: if the outcome is "survival at day X" the event is the outcome itself; if the outcome is "biomarker at day X" the outcome does not exist for that unit.
- **Procedure effect.** Composite endpoint, competing-risk analysis, or truncation-by-death methods.
- **Missing declaration.** Structurally undefined, not missing.
- **Evidence basis.** VERIFIED_DIRECT — ICH E9(R1) explicitly warns that measurements after death do not exist (C7 and the sentence "Measurements after a subject dies do not exist" in S1 §A.1).
- **Cross-domain-term information loss.** Erases the difference between "no data was recorded" (missing) and "no data can exist" (structurally impossible). This is one of the two distinctions ICH E9(R1) itself refuses to collapse.

### Case 3 — Animal in vivo study: unit is excluded per pre-specified inclusion/exclusion criterion

- **Domain.** Animal (ARRIVE-scope experiment).
- **Bearer.** One animal at enrollment.
- **Time relation.** Before or at treatment assignment — NOT post-assignment.
- **Estimand-identity effect.** Restricts the target population; is a definitional matter of who is in the target set (C17).
- **Procedure effect.** None; the unit is not part of the analysis set.
- **Missing declaration.** Not missing — outside the target set.
- **Evidence basis.** VERIFIED_DIRECT (S4 identifies inclusion/exclusion criteria as core to avoid ad hoc data exclusion).
- **Cross-domain-term information loss.** If this is filed under "event handling", the fact that the unit is _out of scope by definition_ is lost.

### Case 4 — Ligand-binding assay: matrix interference in one lot renders the sample invalid

- **Domain.** Assay (LBA under ICH M10 §4).
- **Bearer.** One study sample from one biological source lot.
- **Time relation.** At measurement.
- **Estimand-identity effect.** None — the analyte concentration in the sample is still defined.
- **Procedure effect.** Sample is rejected per acceptance criteria; may trigger reanalysis. Discovery via S2 §4.2.
- **Missing declaration.** Missing (data not obtained), but for a fully technical reason unrelated to outcome value.
- **Evidence basis.** VERIFIED_DIRECT (S2 assay-acceptance framework).
- **Cross-domain-term information loss.** Filing under "post-assignment condition change" would be a category mistake — this is an analytical failure, not a change in the subject's exposure or condition.

### Case 5 — Ecology / environmental monitoring: water sample below detection limit

- **Domain.** Environmental (a distinct domain from the clinical, animal, and assay domains above).
- **Bearer.** A water sample at a monitoring station at one time point.
- **Time relation.** At measurement.
- **Estimand-identity effect.** None; the target (concentration in the water body) exists.
- **Procedure effect.** Censored regression (Kaplan-Meier for left-censoring, Tobit, ROS, MLE); NOT single-value substitution by design.
- **Missing declaration.** Left-censored — analogous to Case 1 but a different physical bearer (environmental medium, not biological matrix) and a different regulatory frame.
- **Evidence basis.** NOT_VERIFIABLE for the S11 pinpoint; concept is CROSS_SOURCE_INFERENCE from multiple independent citation records.
- **Cross-domain-term information loss.** As Case 1; adds that some non-clinical domains lack any "treatment" concept at all, so the estimand-attribute "condition or exposure contrast" is not automatic here — a single-sample census may have no contrast.

### Case 6 — Repeated-dose animal toxicology: a subset of animals is moved to a satellite recovery group

- **Domain.** Animal (regulated toxicology; OECD Test 408-family design).
- **Bearer.** One animal with a scheduled endpoint measurement.
- **Time relation.** Post-assignment, during study.
- **Estimand-identity effect.** Depending on scope, may partition target populations into main-study and recovery cohorts with distinct target quantities.
- **Procedure effect.** Analyses are done per cohort.
- **Missing declaration.** Not missing — the target quantity itself is per-cohort.
- **Evidence basis.** NOT_VERIFIABLE for the OECD 408 pinpoint (S12 not reached); framework-level plausibility is CROSS_SOURCE_INFERENCE only. The case is retained because the analogous partitioning is unambiguously described in the routine toxicology literature the pass cannot access here, and its category status is analytically independent of the pinpoint.
- **Cross-domain-term information loss.** Filing this as an "intercurrent event" imports the E9(R1) treatment-discontinuation frame; it is actually a _design-time cohort assignment_, not a post-assignment change.

### Case 7 — Wet-lab molecular biology: qPCR run fails plate-level QC

- **Domain.** Wet-lab (in vitro / molecular biology).
- **Bearer.** A plate of samples (bearer is not the individual unit).
- **Time relation.** At measurement.
- **Estimand-identity effect.** None; the biological quantity is defined.
- **Procedure effect.** Whole plate rerun.
- **Missing declaration.** Missing at the plate level, not the unit level.
- **Evidence basis.** CROSS_SOURCE_INFERENCE from S2/S3 (which set precedents for run-acceptance criteria). No dedicated pinpoint reached.
- **Cross-domain-term information loss.** The bearer is a plate, not a unit; a scaffold that assumes the bearer of a missing-outcome fact is always the unit erases this. This directly attacks any proposal to put "event or missing-outcome handling" at unit level as an estimand attribute.

### Case 8 — Same datum is relevant to one estimand and irrelevant to another

- **Domain.** Cross-domain (an animal toxicology example: a Day-14 clinical-observation record for an animal that dies on Day-15).
- **Bearer.** One observation on one animal at Day 14.
- **Time relation.** Prior to a terminal event.
- **Estimand-identity effect.** The Day-14 observation is relevant to a "while-alive" target quantity but irrelevant to a "Day-90 body weight" target quantity, for the same animal.
- **Procedure effect.** The datum stays in one analysis dataset and leaves another.
- **Missing declaration.** Not missing anywhere; only in-scope or out-of-scope depending on the target.
- **Evidence basis.** VERIFIED_DIRECT (this is the very point ICH E9(R1) makes in §A.3.2 while-on-treatment strategy — the observation window is defined by the target quantity, not by the datum; C9).
- **Cross-domain-term information loss.** Numerical agreement of the datum across the two estimands does NOT establish semantic identity; this is why the commission (§7) forbids that inference and this case makes it concrete.

### Case 9 — Observation is missing while the outcome remains conceptually defined

- **Domain.** Animal / clinical / assay (this pattern crosses domains; picked here at animal in vivo).
- **Bearer.** One outcome measurement for one animal at the pre-specified assessment time.
- **Time relation.** At the outcome window.
- **Estimand-identity effect.** None; the outcome is defined.
- **Procedure effect.** Imputation, weighting, or sensitivity analysis under a stated missingness mechanism (MCAR / MAR / MNAR per C21).
- **Missing declaration.** Missing (proper).
- **Evidence basis.** CROSS_SOURCE_INFERENCE (Rubin 1976 primary not reached; S6 and S14 secondary confirm).
- **Cross-domain-term information loss.** The critical distinction from Case 2 is that in Case 9 the outcome exists; conflating Case 9 and Case 2 under a single label is the specific category mistake ICH E9(R1) warns against (C4 + C7).

**Domain coverage.** Analytical / bioanalytical (Cases 1, 4), animal in vivo (Cases 2, 3, 6, 9), environmental (Case 5), wet-lab molecular biology (Case 7), and cross-domain (Case 8). Five domains, nine cases — exceeds the "at least six, at least four domains" floor. Numerical agreement between two cases (e.g., a censored value and an imputed value that happen to coincide) never establishes semantic identity — Cases 1 and 9 show this explicitly.

---

## 7. Candidate attribute and bearer matrix

For each candidate attribute of a reusable scaffold, this matrix records: the correct bearer, whether the primary text this pass reached supports it as _estimand-defining_, whether it depends on domain, and the falsification path (Section 6 case number).

| Candidate attribute                                                                                                          | Correct bearer                                        | Estimand-defining across domains?                                                                                                                                                        | Domain-conditional?                                                                                      | Falsified / restricted by                                   |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Target population (set of units)                                                                                             | Analysis population                                   | Yes                                                                                                                                                                                      | Only in whether the concept of "unit" is a subject/animal, a sample, a plate, or an environmental medium | Case 7 (plate bearer), Case 5 (environmental medium bearer) |
| Exposure or condition contrast                                                                                               | Assignment / condition-labelling procedure over units | Yes when a contrast exists                                                                                                                                                               | Yes — Cases 1 and 5 may have no contrast at all (pure quantification)                                    | Case 5 (single-arm environmental census)                    |
| Outcome with time origin / assessment window                                                                                 | Observation on a unit at a defined time               | Yes                                                                                                                                                                                      | Time model varies (single time-point, longitudinal, time-to-event, run-level)                            | Case 7 (run-level bearer differs)                           |
| Population-level summary (mean, median, ratio, distributional)                                                               | Target-population level                               | Yes                                                                                                                                                                                      | Yes — the summary function is domain- and question-specific                                              | (none — retained)                                           |
| Contrast function (difference, ratio, HR, …)                                                                                 | Between conditions at population level                | Only when a contrast attribute exists                                                                                                                                                    | Yes                                                                                                      | Case 5 (may be no contrast)                                 |
| Event- or missing-outcome handling as a single attribute                                                                     | Would-be at estimand level                            | **No** — the primary evidence contradicts a single label (see Sections 5-6). ICH E9(R1) already keeps intercurrent events separate from missing data.                                    | Yes — see below                                                                                          | Cases 1, 2, 3, 4, 6, 7, 8, 9                                |
| Any of the five ICH E9(R1) strategies (treatment policy / hypothetical / composite / while on treatment / principal stratum) | Estimand level                                        | **No, outside clinical trials.** The strategies are text-bound to clinical treatment (C6) and one of them (treatment policy) is even declared unimplementable for terminal events in C7. | Clinical only                                                                                            | Cases 2, 5, 6, 7                                            |

The bearer analysis alone rules out a universal "event- or missing-outcome handling" attribute: the bearer differs across cases (unit / observation / sample / plate / analytical medium / cohort), and no primary text this pass reached defines a common bearer for such a compound category.

---

## 8. Candidate vocabulary attack, including rejected terms

Terms that were tested against primary text for cross-domain adoption:

| Term                                                                                                                                                  | Status                                                                                                                                     | Reason                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Estimand"                                                                                                                                            | **Narrow reuse only.**                                                                                                                     | ICH E9(R1) (S1) is the only primary text this pass reached that defines the term; its formulation is bound to treatment effects and intercurrent events (C1-C3). Rubin (1974) and Neyman (1923) provide a compatible _causal target quantity_ concept but the primary texts were not directly reached in this pass.     |
| "Intercurrent event"                                                                                                                                  | **Reject for cross-domain use.**                                                                                                           | Definitionally bound to "after treatment initiation" (C3), and its handling strategies are named around clinical treatment vocabulary (C6). Adopting the term outside clinical trials would import that vocabulary.                                                                                                     |
| "Treatment policy strategy"                                                                                                                           | **Reject.**                                                                                                                                | Definitionally references "the intercurrent event is considered to be part of the treatments being compared" (S1 §A.3.2). Non-clinical exposures cannot inherit this without reinterpretation.                                                                                                                          |
| "Hypothetical strategy"                                                                                                                               | **Reject as a named strategy; the underlying idea (counterfactual target) is reusable via potential outcomes but under a different term.** | The strategy name in E9(R1) is intertwined with clinical scenarios like ethical rescue-medication considerations.                                                                                                                                                                                                       |
| "Composite variable strategy"                                                                                                                         | **Reject as a named strategy; the underlying idea (redefine the variable to encode the event) is reusable.**                               | The E9(R1) treatment of composite variables refers explicitly to death and clinical failure modes (S1 §A.3.2).                                                                                                                                                                                                          |
| "While on treatment strategy"                                                                                                                         | **Reject as a named strategy.**                                                                                                            | "On treatment" imports the clinical treatment vocabulary.                                                                                                                                                                                                                                                               |
| "Principal stratum"                                                                                                                                   | **Reject for cross-domain reuse.**                                                                                                         | The term is technically well-defined in potential-outcomes theory, but ICH E9(R1)'s clinical instantiation carries substantial baggage (C6, S1 §A.3.2). Direct use in a wet-lab or assay context is likely to be misread.                                                                                               |
| **Candidate phrase in the commission**: "condition-transition and missing-outcome handling"                                                           | **Rejected as a single estimand attribute — see Section 7.**                                                                               | Category-overloaded: it groups (a) post-assignment condition change, (b) missing-outcome missingness, (c) terminal events, (d) structural undefinition, (e) sub-limit censoring. Cases 1-9 show these have distinct estimand and procedure consequences. The phrase is at best a discussion category, not an attribute. |
| Neutral alternative: **"target quantity" or "target of estimation"** (as used in ICH E9(R1) §A.2 itself and by Rubin 1974)                            | **Candidate for reuse.**                                                                                                                   | Language-neutral, does not import "intercurrent event".                                                                                                                                                                                                                                                                 |
| Neutral alternative: **"unit population / exposure or condition contrast / outcome-with-timing / population-level summary"** — the reusable quadruple | **Candidate for reuse.**                                                                                                                   | Attaches only to concepts each of which is separately supported by primary text (C1-C2, and by the potential-outcomes literature in the primary texts this pass could not reach directly).                                                                                                                              |

---

## 9. Falsification attempts, disagreements, and scoped absence claims

**Falsification attempts against the candidate proposition.**

1. _Attempt._ Reject the entire scaffold on the ground that no primary text uses it. _Result._ Overreach — the _quadruple_ {population, exposure/condition contrast, outcome with timing, population-level summary} is supported by ICH E9(R1) §A.3.3 language (C1-C2) and — through discovery only — by Rubin (1974). The falsification does not succeed against the quadruple.
2. _Attempt._ Reject only the "event or missing-outcome handling" element. _Result._ Succeeds. ICH E9(R1) itself refuses to collapse intercurrent events and missing data (C4-C5), and Cases 1-9 supply direct semantic distinctions that a single label erases.
3. _Attempt._ Reject the addition of an "exposure or condition contrast" element as universally applicable. _Result._ Partially succeeds. Case 5 (environmental census) has no contrast — so this element is _conditional_, not universal.
4. _Attempt._ Reject the whole scaffold on the ground that "estimand" is inherently clinical. _Result._ Fails at the level of primary text: ICH E9(R1) §A.1 itself states the framework's principles apply to single-arm trials and observational studies (C24), and secondary discovery (S7, S13) points to primary literature that defines analogous target quantities without importing the ICH clinical vocabulary. However, the primary texts of that non-clinical literature were **not directly reached** in this pass (S7, S8, S9, S10 all `NOT_VERIFIABLE` in the strict sense).

**Disagreements to preserve for reconciliation.**

- _Between the ICH E9(R1) source and the candidate scaffold._ E9(R1) folds "intercurrent-event handling" into estimand identity as _a strategy per event_, not as one attribute; a scaffold with a single event/missing-handling attribute is thus not a faithful abstraction of E9(R1).
- _Between the non-clinical analytical sources (S2, S3) and the estimand framing itself._ S2 and S3 do not organize their subject matter around a target _treatment effect_; they organize around fitness-for-purpose of an analytical procedure. This is a genuine conceptual gap, not just missing vocabulary.
- _Between the animal-research reporting framework (S4) and the estimand framing._ ARRIVE 2.0 organizes reporting elements, not target quantities. Some of its Essential 10 items (sample size, outcome measures, statistical methods, inclusion/exclusion) touch the same substance an estimand attribute would touch, but ARRIVE does not adopt or require an estimand construct.

**Scoped absence claims.** All absence claims below are bound to the specific documents and specific retrieved sections.

- Over ICH M10 §§1-4.3 (retrieved) and the Section 5-9 Table of Contents (retrieved header): the term "estimand" does not appear.
- Over ICH Q2(R2) §§1-3 (retrieved) and Sections 4-7 Table of Contents (retrieved header): the term "estimand" does not appear.
- Over the ARRIVE 2.0 article body (retrieved in full): the term "estimand" does not appear; the ICH E9(R1) strategies are not referenced.
- Over ICH E9(R1) §§A.1, A.3.1, A.3.2, A.3.3 (retrieved substantially): the addendum does not attempt to define an estimand outside clinical trials.

Any of these absence claims can be tightened only by re-retrieval of the corresponding sections not reached in this pass; none is claimed for other versions or documents.

---

## 10. `FND1-H04` disposition

**`NARROW_AND_CLOSE` is NOT recommended by this pass; the correct disposition from Pass A is `KEEP_OPEN` pending Pass B — with the narrowing statement below available for the steward's reconciliation.**

Rationale: the primary evidence reached in this pass is _sufficient_ to reject a broad closure statement (a universal five-attribute estimand with an event-handling attribute), and _sufficient_ to identify a candidate narrow statement (a quadruple {population, exposure/condition contrast, outcome with timing, population-level summary}, with domain-specific event categories and handling strategies kept separate). However, the pass could not reach three primary texts (S7 Rubin 1974, S8 Rubin 1976, S9 Neyman 1923) whose direct reading is materially load-bearing for the reusable _quadruple_ claim outside clinical trials. Section 4 marks those claims `CROSS_SOURCE_INFERENCE` or `NOT_VERIFIABLE`. Closing `FND1-H04` on Pass A alone would rest on an inference chain whose most-cited primary links are not directly verified here.

**Candidate narrow closure statement** (for the steward's reconciliation, not adopted by this pass):

> Outside clinical trials, an estimand-like target quantity may be defined by a target population of units, an exposure or condition contrast (when a contrast is present), an outcome with a specified time origin or assessment window, and a population-level summary. Whether and how post-assignment events, missing observations, censoring below detection limits, structural non-existence of outcomes, and out-of-scope units are represented is domain-specific and does NOT belong to a single estimand-level attribute; and the five ICH E9(R1) strategies do not travel verbatim outside clinical trials.

That statement is compatible with all nine counterexamples in Section 6 and with the retrieved primary text of S1-S5.

---

## 11. Residual holds and next evidence

**Residual holds inherited or opened by this pass.**

1. `FND1-H04` remains open. Pass A recommends the narrow candidate wording above but does not close on its own.
2. Because Neyman (1923), Rubin (1974) and Rubin (1976) were not directly read, any Protocol-adjacent claim that leans on their exact wording remains subject to primary re-verification.
3. The candidate phrase "condition-transition and missing-outcome handling" as a single scaffold attribute is judged **overbroad and category-mistaken** in this pass. If a later reconciliation wishes to retain the phrase, it should keep it as a discussion label, not an estimand attribute.

**Next evidence that would materially change the disposition.**

- Direct primary retrieval of the three unavailable texts (S7, S8, S9). If they confirm the CROSS_SOURCE_INFERENCE claims C19-C22, `NARROW_AND_CLOSE` becomes defensible for `FND1-H04`.
- Direct primary retrieval of a non-clinical formal source (OECD Test 408 or an equivalent regulatory design guideline, S12) confirming that non-clinical designs already use a target-quantity vocabulary distinct from ICH E9(R1) but structurally aligned with the candidate quadruple.
- Direct primary retrieval of a censored-data / detection-limit primary paper (S11 or its formal successor) to lock down Case 1 / Case 5 as `VERIFIED_DIRECT` rather than `CROSS_SOURCE_INFERENCE`.
- A source that explicitly _contradicts_ the separation of intercurrent events and missing data at a formal level would change the analysis materially; none was surfaced.

**Explicit exclusions preserved from the commission.** No Release 2 artifact, no paired-t work, no method selection, no schema, no identifier, no reason code, and no legal/regulatory judgment has been advanced by this pass.

---

## 12. Public-artifact and sanitization self-check

Self-check items:

- [x] Report is written in English, as a single Markdown document, and preserves the twelve-section structure requested in commission §8.
- [x] The role identifier used throughout is "independent external primary-source investigator". No software, service, provider, or generation mechanism is named or implied anywhere in the report.
- [x] No verbatim quotation from any single source exceeds 25 words; all quoted phrases are short and inline.
- [x] All Protocol, adoption, schema, identifier, method, implementation, and Release 2 questions are explicitly declined.
- [x] Absence claims are bound to specific documents and specific retrieved sections (Section 9).
- [x] Each atomic claim carries a tier label (VERIFIED_DIRECT / CROSS_SOURCE_INFERENCE / POSSIBLE_PROJECT_CONVENTION / CONTRADICTED / NOT_VERIFIABLE).
- [x] No repository operation, branch, commit, push, or PR has been performed.
- [x] The Pass B result has not been read, and neither has any reconciliation, review branch, or Release 2 artifact.
- [x] The counterexample floor (≥ 6 cases across ≥ 4 domains) is met and exceeded (9 cases, 5 domains).
- [x] The report separates what a primary source says (Section 4 VERIFIED_DIRECT rows), what follows by cross-source inference (Section 4 CROSS_SOURCE_INFERENCE rows and Section 9 falsification attempts), what could only be a future project convention (Section 8 neutral alternatives, marked as candidates only), and what remains unknown (Section 4 NOT_VERIFIABLE rows and Section 11 next-evidence list).

## Appendix — Sources that could not be reached in full text (required-material access log)

The following primary sources were sought and, in this pass, **could not be reached in full primary text**. Each affected claim in Section 4 is marked accordingly; the pass proceeded without them per commission §4.

1. **Splawa-Neyman J. (1990 English translation of the 1923 Polish original), _Statistical Science_ 5(4):465-472** — JSTOR host returned an anti-bot shell page; no primary text obtained.
2. **Rubin D.B. (1974), _Journal of Educational Psychology_ 66(5):688-701** — primary PDF not surfaced by reachable hosts; only a secondary lecture-notes source with verbatim block quotes was retrievable (S7).
3. **Rubin D.B. (1976), _Biometrika_ 63(3):581-592** — JSTOR anti-bot shell, Scribd blocked; obtained only through downstream references in Meng & Rubin (1992) and secondary tutorials.
4. **Hernán M.A. & Robins J.M., _Causal Inference: What If_ (2 Jan 2024 print)** — host returned a network error at the canonical Harvard T.H. Chan URL; not retrieved by any alternative in this pass.
5. **OECD Test Guideline No. 408, _Repeated Dose 90-Day Oral Toxicity Study in Rodents_** — host returned a network error; not retrieved.
6. **Helsel D.R. (1990), _Environmental Science & Technology_ 24(12):1766-1774** — primary text not surfaced by any reachable host; concept confirmed only indirectly via multiple citation records.

None of these access failures altered the disposition of this pass because (a) the load-bearing narrowing decision rests on ICH E9(R1) primary text (S1) that WAS reached, plus the two-way separation of intercurrent events from missing data that S1 itself carries; and (b) the counterexample analysis relies on primary/formal sources that WERE reached (S1, S2, S3, S4, S5) or on cross-source inference that is explicitly marked as such. The affected `CROSS_SOURCE_INFERENCE` and `NOT_VERIFIABLE` claims are the reason Section 10 recommends `KEEP_OPEN` (with a narrow candidate) rather than `NARROW_AND_CLOSE`.

FND-1 NON-CLINICAL ESTIMAND PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION
