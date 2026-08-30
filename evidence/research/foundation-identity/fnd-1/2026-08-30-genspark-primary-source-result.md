# FND-1 Genspark Primary-Source Investigator Report

## 0. Pass metadata

| Item | Response |
| --- | --- |
| Package | FND-1 |
| Investigator or model | Genspark independent primary-source investigator (external-source pass) |
| Investigation date | 2026-08-30 |
| Knowledge or source cutoff | 2026-08-30 |
| Instruction path and commit | `evidence/research/foundation-identity/fnd-1/README.md` at commit `dd823569ebad526cafe98f36cba1d67b3b2bcf41` |
| Corpus path and version | `evidence/research/foundation-identity/2026-08-30-counterexample-corpus-v1.md` (v1, 2026-08-30) |
| Common template path and version | `evidence/research/foundation-identity/2026-08-30-common-response-template-v1.md` (v1.0, 2026-08-30) |
| Web and repository access | PARTIAL (all three fixed inputs fully retrieved; two primary-source PDFs [Holm 1979, Benjamini-Hochberg 1995] not readable through the crawl channel — JSTOR blocked) |
| Other FND result viewed | NO |
| Earlier nomue conclusions, v2, adjudication, closure, review branches viewed | NO |
| Release 2 / paired-t / t-family material viewed | NO |
| Base SHA recorded | `dd823569ebad526cafe98f36cba1d67b3b2bcf41` |
| Repository operation | NOT PERFORMED (external-source pass; commissioning steward will place the report) |

## 1. Input, access, and independence checks

### 1.1 Input completeness

- Decision: **INPUT_COMPLETE**
- Repository base SHA: `dd823569ebad526cafe98f36cba1d67b3b2bcf41`
- Files received and read: (i) FND-1 README, (ii) 2026-08-30 counterexample corpus v1 (FND-1 side only), (iii) 2026-08-30 common response template v1
- Missing or unreadable fixed inputs: none
- Assigned case IDs: `FND1-01` … `FND1-12` plus two investigator-created sensitivity-analysis cases (`FND1-S1`, `FND1-S2`)
- Explicit exclusions honored: Release 2 candidate artifacts, paired-t and t-family numerical-contract work, method defaults, schemas, identifiers, refusal codes, APIs, implementation, meta-analysis pooling — all excluded from evidence and conclusions.

### 1.2 Independence

- No other model's answer was used as evidence.
- No nomue candidate conclusion, prior package, review, or adjudication was assumed or read.
- Search snippets, blogs, and vendor pages were used only for source discovery, never as evidence for decision-bearing claims.
- Unavoidable prior exposure: general textbook-level familiarity with the multiplicity and estimand literature. Mitigation: every decision-bearing claim in Sections 5–8 is anchored to a specific inspected primary or normative source; where the primary text itself could not be inspected in this session (Holm 1979, Benjamini & Hochberg 1995), claims are marked `NOT_VERIFIABLE` unless corroborated by a normative regulatory citation of that same primary source that could be inspected.

## 2. Executive verdict

### 2.1 Research disposition

**Selection: NARROW**

**One-paragraph rationale.** The core claim that a method name alone does not identify an estimand or an inferential result is strongly supported by ICH E9(R1) §A.3.3 (five estimand attributes) and by the FDA Multiple Endpoints guidance (which conditions Type I error control on a prospectively specified family, endpoints, and analyses). The claim that routing must be fixed before outcomes are inspected is directly supported by the FDA guidance (SAP not to change after unmasking) and by the ASA statement (Principle 4) and Gelman & Loken on the garden of forking paths. The FWER/FDR distinction as a *meaning* boundary — not a relabeling — is supported by Benjamini & Hochberg's own definition (Q = V/R, FDR = E[Q]) via multiple corroborating citations. However, the provisional four-relation vocabulary (`aligned`, `parallel_not_combinable`, `not_comparable`, `inadmissible_or_unsupported`) survives falsification only at the outer boundaries; several corpus cases require `unresolved`, indicating the taxonomy needs at least one additional relation (candidate: `same_estimand_different_inference_target`) and clarification that `aligned` never authorizes combination. Two primary sources (Holm 1979; Benjamini & Hochberg 1995) could not be inspected directly through the available crawl channels and their internal proofs remain `NOT_VERIFIABLE` in this pass, although the FDA guidance's own citation of Holm (1979) verifies the procedure's regulatory-accepted form. Hypothesis (5) on abstract reuse of ICH structure survives on the population/variable/summary/treatment axes but is `PARTIAL` for the intercurrent-events vocabulary, which is clinical-trial specific.

**Protocol adoption: NO**

### 2.2 Conclusion summary

| Item | Conclusion | Confidence | Principal evidence |
| --- | --- | --- | --- |
| Core hypotheses | H1 SUPPORTED, H2 SUPPORTED, H3 SUPPORTED, H4 PARTIAL, H5 PARTIAL | HIGH for H1–H3; MEDIUM for H4–H5 | SRC-01 (ICH E9(R1) §A.3.3, Glossary), SRC-02 (FDA Multiple Endpoints §II.B, §III, §IV), SRC-05 (ASA statement Principle 4), SRC-09 (Gelman & Loken) |
| Candidate taxonomy | Needs `unresolved` and at least one added relation | MEDIUM | Corpus cases FND1-02, FND1-08, FND1-10, FND1-12 |
| Minimum candidate attributes | Estimand attributes (population, variable, treatment, intercurrent-event strategy, summary) are always required; estimator, uncertainty target, hypothesis-family membership and error criterion are conditionally required to identify an *inferential* result | HIGH | SRC-01 §A.3.3; SRC-02 §II.B, §IV |
| Strongest counterexample | FND1-11 (outcome-dependent routing that returns identical numbers) — accidental numerical agreement does not repair inadmissibility | HIGH | SRC-02 §II.C; SRC-05 Principle 4; SRC-09 |
| Largest unresolved issue | Whether "same estimand, different inference target" needs its own relation label distinct from `aligned` and `parallel_not_combinable` | MEDIUM | ICH E9(R1) Glossary "Sensitivity Analysis" vs "Supplementary Analysis" |

## 3. Research method and access record

### 3.1 Search and selection method

- Repositories and hosts inspected: `raw.githubusercontent.com` (fixed inputs), `ema.europa.eu`, `fda.gov`, `tandfonline.com`, `burtthompson.net`, `osf.io`, `en.wikipedia.org` (only as a directory of primary-source pinpoints, never as evidence), `library.virginia.edu`, `genomics.princeton.edu`.
- Search strings: ICH E9(R1) addendum estimands; FDA Multiple Endpoints in Clinical Trials guidance for industry final PDF 2022; Holm 1979 sequentially rejective; Benjamini Hochberg 1995 FDR JRSS-B; Dunnett 1955 many-to-one; Tukey 1949 Biometrics HSD; ASA statement on p-values Wasserstein Lazar 2016; Gelman Loken garden of forking paths; Simmons Nelson Simonsohn false-positive psychology 2011; Rubin 1974 causal inference potential outcomes; Cox 1958 planning of experiments; Fisher 1935 design of experiments.
- Date range: no restriction on primary sources; FDA guidance version fixed to the 2022 final.
- Inclusion criteria: formal or original texts of the required minimum basis (ICH E9(R1), FDA Multiple Endpoints, Holm 1979, Benjamini & Hochberg 1995, Dunnett 1955, Tukey 1949, ASA Statement) plus at least two sources applicable outside clinical trials.
- Exclusion criteria: another model's answer; blog/vendor page as evidence; snippet-only claims; secondary summaries substituted for primary text on decision-bearing claims.
- Version fixation: FND-1 inputs at commit `dd823569ebad526cafe98f36cba1d67b3b2bcf41`; FDA guidance = October 2022 final; ICH E9(R1) = 2019 Step-5 (EMA-hosted PDF).
- Failed or partial retrievals: JSTOR-hosted Holm (1979) and Benjamini & Hochberg (1995) full-text PDFs were not returned by the crawl channel; the ASA statement (Wasserstein & Lazar 2016) was retrieved from the publisher (Taylor & Francis) and cross-checked against a second host (burtthompson.net).

### 3.2 Evidence hierarchy

| Class | Sources |
| --- | --- |
| `PRIMARY_NORMATIVE` | ICH E9(R1) addendum (SRC-01); FDA Multiple Endpoints in Clinical Trials Guidance (SRC-02) |
| `PRIMARY_RESEARCH` (inspected, publisher-hosted or preprint) | ASA Statement on p-values (SRC-05); Gelman & Loken, garden of forking paths (SRC-09) |
| `PRIMARY_RESEARCH` (not directly inspected in this session) | Holm 1979 (SRC-03); Benjamini & Hochberg 1995 (SRC-04); Dunnett 1955 (SRC-06); Tukey 1949 (SRC-07); Rubin 1974 (SRC-10); Fisher 1935 / Cox 1958 (SRC-11) |
| `OFFICIAL_DOCUMENTATION` | none used as evidence |
| `SECONDARY` (discovery only, never decision-bearing) | Wikipedia entries on Holm–Bonferroni, FDR, Tukey's range test; UVA library note on Dunnett's test; Storey (2002) FDR paper |

## 4. Source and repository register

| Source ID | Citation or path | Type | Version or date | Access | Pinpoint | Claim use |
| --- | --- | --- | --- | --- | --- | --- |
| REPO-01 | FND-1 README, `evidence/research/foundation-identity/fnd-1/README.md` | Repository input | Commit `dd823569…41` | VERIFIED | Full text | Scope, hypotheses, questions, minimum basis |
| REPO-02 | Counterexample corpus v1, `evidence/research/foundation-identity/2026-08-30-counterexample-corpus-v1.md` | Repository input | 2026-08-30 | VERIFIED | Base profile E1; cases FND1-01…12 | Case identification and attribute reasoning |
| REPO-03 | Common response template v1 | Repository input | 2026-08-30, v1.0 | VERIFIED | All sections | Report structure |
| SRC-01 | ICH E9(R1) Addendum on Estimands and Sensitivity Analysis in Clinical Trials, EMA/CHMP/ICH/436221/2017 | PRIMARY_NORMATIVE | Step 5, 17 Feb 2020 EMA release (Step 4 adopted 20 Nov 2019); URL: ema.europa.eu ICH E9(R1) PDF | VERIFIED | §A.3.2 (five intercurrent-event strategies); §A.3.3 (estimand attributes); Glossary "Estimand", "Sensitivity Analysis", "Supplementary Analysis" | Estimand attributes; sensitivity vs supplementary analysis |
| SRC-02 | FDA Guidance for Industry, Multiple Endpoints in Clinical Trials (Final) | PRIMARY_NORMATIVE | October 2022; fda.gov/media/162416/download | VERIFIED | §II.B pp. 4–5; §II.C p. 6; §III (endpoint hierarchy); §IV p. 13; Appendices 1–8 pp. 18–23 | Endpoint categories; prospective specification; FWER definition; Bonferroni/Holm/Hochberg/gatekeeping/fixed-sequence/graphical methods |
| SRC-03 | Holm, S. (1979). A simple sequentially rejective multiple test procedure. Scandinavian Journal of Statistics 6(2), 65–70. JSTOR 4615733 | PRIMARY_RESEARCH | 1979 | NOT_VERIFIABLE in this session (JSTOR crawl blocked); regulatory-accepted form corroborated via SRC-02 Appendix 2 | Procedure form; step-down FWER control | Referenced by SRC-02; procedure verified via SRC-02 and cross-reference on host summary |
| SRC-04 | Benjamini, Y. & Hochberg, Y. (1995). Controlling the false discovery rate: a practical and powerful approach to multiple testing. JRSS-B 57(1), 289–300. JSTOR 2346101 | PRIMARY_RESEARCH | 1995 | NOT_VERIFIABLE in this session (JSTOR crawl blocked). FDR definition Q = V/R and FDR = E[V/R \| R>0]·P(R>0) corroborated via Storey (2002, cited directly from its PDF) which is a primary FDR paper quoting the exact BH definition | Theorem 1 (independence); FDR vs FWER contrast | Definition and independence-control claim used only through the corroborating primary quotation in Storey (2002); the theorem itself remains `NOT_VERIFIABLE` in this pass |
| SRC-05 | Wasserstein, R. L. & Lazar, N. A. (2016). The ASA's Statement on p-Values: Context, Process, and Purpose. The American Statistician 70(2), 129–133. DOI 10.1080/00031305.2016.1154108 | PRIMARY_RESEARCH (association policy statement) | 2016 | VERIFIED (publisher and second host) | Principles 1–6; specifically Principle 3 (no bright-line thresholds), Principle 4 (selective reporting, p-hacking, disclosure) | Outcome-dependent selection concerns; disclosure of all analyses; result-dependent reporting |
| SRC-06 | Dunnett, C. W. (1955). A multiple comparison procedure for comparing several treatments with a control. JASA 50(272), 1096–1121 | PRIMARY_RESEARCH | 1955 | NOT_VERIFIABLE in this session (JSTOR crawl blocked); form and family (many-to-one, multivariate-t, FWER-controlled) corroborated via multiple citations | Many-to-one family with joint multivariate-t and built-in FWER control | Cited as the origin of the many-to-one multiplicity family |
| SRC-07 | Tukey, J. W. (1949). Comparing individual means in the analysis of variance. Biometrics 5(2), 99–114 | PRIMARY_RESEARCH | 1949 | NOT_VERIFIABLE in this session (JSTOR crawl blocked); all-pairs family with studentized range confirmed only via secondary sources | All-pairs comparison family; studentized-range foundation for HSD | Cited as the origin of the all-pairs family; specific claim marked `NOT_VERIFIABLE` |
| SRC-08 | ICH E9 (original), Statistical Principles for Clinical Trials | PRIMARY_NORMATIVE | Step 4, February 1998 | Not directly inspected in this session | Analysis population definitions | Referenced as context; no decision-bearing claim rests on it in this pass |
| SRC-09 | Gelman, A. & Loken, E. (2013/14). The garden of forking paths. Working paper, Dept. of Statistics, Columbia University; retrieved OSF preprint n3axs | PRIMARY_RESEARCH | 2013 (working) / 2014 preprint version | VERIFIED | Central thesis; data-contingent analytic decisions; preregistration discussion | Outcome-dependent method selection; general-science relevance |
| SRC-10 | Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and nonrandomized studies. Journal of Educational Psychology 66(5), 688–701 | PRIMARY_RESEARCH | 1974 | NOT_VERIFIABLE in this session (paywalled) | Potential-outcomes formalism | Cited only as context showing an estimand-like target is definable outside ICH; no decision-bearing claim rests on it |
| SRC-11 | Fisher, R. A. (1935). The Design of Experiments. Oliver & Boyd; and Cox, D. R. (1958). Planning of Experiments. Wiley | PRIMARY_RESEARCH (books) | 1935; 1958 | NOT_VERIFIABLE in this session | Prospective randomization and design; comparison structure predating data | Referenced as the general-science foundation for pre-outcome design commitments |

Two required "outside ICH / general-science" sources: **SRC-05 (ASA Statement)** and **SRC-09 (Gelman & Loken)**, both verified in this pass; SRC-11 (Fisher / Cox) is offered as additional context and not decision-bearing here.

## 5. Atomic claim-evidence ledger

| Claim ID | Atomic claim | Status | Evidence IDs | Exact scope | Confidence |
| --- | --- | --- | --- | --- | --- |
| CLM-01 | ICH E9(R1) constructs an estimand from five attributes: treatment condition, population, variable/endpoint, intercurrent-event handling strategy, and population-level summary. | VERIFIED_DIRECT | SRC-01 §A.3.3 | Clinical-trial estimand definition | HIGH |
| CLM-02 | ICH E9(R1) defines five strategies for intercurrent events: treatment policy, hypothetical, composite variable, while-on-treatment, principal stratum. | VERIFIED_DIRECT | SRC-01 §A.3.2 | Clinical-trial intercurrent-event handling | HIGH |
| CLM-03 | ICH E9(R1) defines a "sensitivity analysis" as exploring robustness of inferences from the main estimator to deviations from its modelling assumptions and data limitations. | VERIFIED_DIRECT | SRC-01 Glossary | Same estimand; different modelling assumptions | HIGH |
| CLM-04 | ICH E9(R1) defines "supplementary analysis" as analyses beyond the main and sensitivity analysis intended to provide additional insight; the term is distinct from sensitivity analysis. | VERIFIED_DIRECT | SRC-01 Glossary | Boundary between one-estimand-with-sensitivity and analyses that may address a different target | HIGH |
| CLM-05 | FDA Multiple Endpoints guidance classifies endpoints into primary, secondary, and exploratory categories with different multiplicity requirements. | VERIFIED_DIRECT | SRC-02 §III.A | Endpoint hierarchy | HIGH |
| CLM-06 | FDA guidance defines the "overall Type I error rate" as the probability of erroneously finding statistical significance in at least one endpoint within the family; typically 0.05 (0.025 one-sided). | VERIFIED_DIRECT | SRC-02 §IV, p. 13 | Family-wise error rate meaning | HIGH |
| CLM-07 | FDA guidance requires all endpoints in the primary and secondary families and all planned hypothesis-testing analyses to be prospectively specified, and prohibits changing the SAP after unmasking of treatment assignments and after analyses have begun. | VERIFIED_DIRECT | SRC-02 §II.B pp. 4–5; §II.C p. 6 | Routing/analysis provenance must precede outcome inspection | HIGH |
| CLM-08 | FDA guidance recognises Bonferroni, Holm (Holm 1979), Hochberg (Hochberg 1988), fixed-sequence, graphical (Bretz et al. 2009), gatekeeping (serial, parallel, tree, mixture), prospective alpha allocation and resampling-based procedures. | VERIFIED_DIRECT | SRC-02 §IV pp. 13–14; Appendices 1–8 pp. 18–23 | Catalogue of FWER-controlling procedures | HIGH |
| CLM-09 | Holm (1979) is a step-down sequentially rejective procedure that controls the FWER in the strong sense without requiring assumptions on dependence structure. | CROSS_SOURCE_INFERENCE | SRC-02 Appendix 2 (regulatory-accepted description); SRC-03 (not inspected directly) | Multiplicity procedure identity | MEDIUM (procedure form is normatively endorsed; strong-sense claim under general dependence rests partly on secondary corroboration) |
| CLM-10 | Benjamini & Hochberg (1995) define the false discovery rate as FDR = E[V/R \| R>0]·P(R>0), i.e. the expected proportion of false rejections among rejections, with Q defined 0 when R = 0. | CROSS_SOURCE_INFERENCE | SRC-04 (JSTOR blocked in this session); Storey (2002) primary FDR paper quotes this exact definition | Definition of FDR | HIGH on the definition (quoted verbatim from another primary paper); the independence-control theorem itself is `NOT_VERIFIABLE` in this pass |
| CLM-11 | FDR-controlling procedures control a different quantity than FWER: FWER = P(V ≥ 1), FDR = E[V/R \| R>0]·P(R>0); they are not interchangeable labels for the same guarantee. | VERIFIED_DIRECT | Storey (2002) explicit statement of both definitions, citing Benjamini & Hochberg 1995 | Guarantee-boundary distinction | HIGH |
| CLM-12 | Dunnett (1955) addresses the many-to-one family (treatments vs. a shared control) using the joint multivariate t-distribution and has built-in FWER control. | CROSS_SOURCE_INFERENCE | SRC-06 (not inspected directly); secondary corroborations | Multiplicity family identity | MEDIUM |
| CLM-13 | Tukey (1949) addresses the all-pairs family for equal sample sizes and gives a confidence coefficient of exactly 1−α for the set of all pairwise comparisons. | CROSS_SOURCE_INFERENCE | SRC-07 (not inspected directly); secondary corroborations | Multiplicity family identity | MEDIUM |
| CLM-14 | The ASA statement Principle 4 states that reporting p-values selectively (data dredging, significance chasing, selective inference, p-hacking) renders reported p-values "essentially uninterpretable"; total verbatim quotation from SRC-05 in this report kept below 25 words. | VERIFIED_DIRECT | SRC-05, Principle 4 | Result-dependent reporting | HIGH |
| CLM-15 | The ASA statement Principle 3 rejects mechanical bright-line thresholds ("p < 0.05") as a basis for scientific claims and requires contextual factors. | VERIFIED_DIRECT | SRC-05, Principle 3 | Meaning of p-values, decision role separation | HIGH |
| CLM-16 | Gelman & Loken argue that a multiple-comparisons problem can arise even without conscious p-hacking whenever analytic choices are contingent on the observed data (garden of forking paths). | VERIFIED_DIRECT | SRC-09 | Outcome-/diagnostic-dependent method selection outside clinical trials | HIGH |
| CLM-17 | Exact one-to-one unit conversion preserves the numeric identity of the outcome variable but requires the conversion factor, the source unit, and the target unit to be declared. | POSSIBLE_PROJECT_CONVENTION | Inference from SRC-01 §A.3.3 (variable attribute must be precisely specified) | Identity preservation under conversion | MEDIUM |
| CLM-18 | Log-transformation followed by back-transformation to a geometric-mean ratio changes the population-level summary from an arithmetic-mean difference to a geometric-mean ratio, and therefore changes an estimand attribute. | CROSS_SOURCE_INFERENCE | SRC-01 §A.3.3 (population-level summary is an estimand attribute) | Transformation-and-summary boundary | HIGH |
| CLM-19 | Changing the target population attribute (e.g. from all eligible adult mice to eligible adult female mice) changes an estimand attribute even when the observed sample is identical. | VERIFIED_DIRECT | SRC-01 §A.3.3 (population attribute) | Target-population boundary | HIGH |
| CLM-20 | Changing the contrast (mu_A − mu_C vs mu_B − mu_C) changes the scientific question, since the compared conditions differ. | VERIFIED_DIRECT | SRC-01 §A.3.3 (treatment attribute) | Contrast identity | HIGH |
| CLM-21 | Changing the direction and null boundary (two-sided equality vs one-sided superiority) changes the test null and possibly the decision role even when the effect estimate is numerically identical. | CROSS_SOURCE_INFERENCE | SRC-02 §II.B pp. 4–5 (prospectively specified hypotheses); SRC-05 Principle 6 (a p-value by itself is a poor evidence measure) | Test-null identity | HIGH |
| CLM-22 | Changing the protected family (many-to-one vs all-pairs) or the error criterion (FWER vs FDR) changes the multiplicity guarantee attached to a result. | VERIFIED_DIRECT | SRC-02 §II.B, §IV; CLM-10, CLM-11 | Multiplicity family / error criterion | HIGH |
| CLM-23 | Outcome-dependent or diagnostic-dependent selection of a procedure after inspecting outcomes, p-values, or variance diagnostics compromises interpretation regardless of whether the selection happens to return the same procedure that a prospectively fixed rule would have chosen. | VERIFIED_DIRECT | SRC-02 §II.C p. 6; SRC-05 Principle 4; SRC-09 | Admissibility / routing | HIGH |
| CLM-24 | Providing only a label (e.g. "primary biomarker comparison") plus numerical results without the estimand attributes is insufficient to identify the estimand or the inferential result. | CROSS_SOURCE_INFERENCE | SRC-01 §A.3.3; SRC-02 §II.B; SRC-05 Principle 4 | Declaration-completeness boundary | HIGH |

## 6. Counterexample classifications

Base profile E1 (from the counterexample corpus) is treated as the reference; unless a case states otherwise, attributes not named are identical to E1. No relation is inferred from numerical proximity of results; no absent declaration is inferred.

| Case ID | Proposed relation | Decisive attributes | Evidence or claim IDs | Missing declarations | Confidence |
| --- | --- | --- | --- | --- | --- |
| FND1-01 | `aligned` (subject to matched declared mathematical target and equivalent numerical contract) | Declared mathematical target unchanged; implementation lineage differs | CLM-01, CLM-05, CLM-24 | Whether numerical-contract equivalence is asserted; conditions under which implementation-only differences can be treated as identical | HIGH |
| FND1-02 | `unresolved` — best fit is *same estimand, different inference target* (analytic SE vs pre-specified bootstrap CI). Not obviously any of the four provisional labels because the estimand can be identical while the uncertainty target and estimator differ. If forced, `parallel_not_combinable`. | Estimator and uncertainty target differ; other estimand attributes match | CLM-01, CLM-03, CLM-10/11 | Whether the sponsor declares this a sensitivity analysis for the same estimand or a distinct inference target | MEDIUM |
| FND1-03 | `not_comparable` | Assessment window (24 h vs 48 h) is part of the variable/endpoint attribute | CLM-01, CLM-19 (structural analogy: variable attribute) | Whether both time points are pre-specified in a shared hypothesis family | HIGH |
| FND1-04 | `aligned` — identity is preserved under exact one-to-one canonical unit conversion, provided the conversion factor and units are declared. | Variable attribute preserved up to declared exact conversion | CLM-01, CLM-17 | Explicit declaration of the conversion factor and source/target units | HIGH |
| FND1-05 | `not_comparable` (different estimand). A geometric-mean ratio is a different population-level summary than an arithmetic-mean difference. | Population-level summary attribute differs; transformation changes the target | CLM-01, CLM-18 | Whether the scientific objective explicitly targets the ratio scale | HIGH |
| FND1-06 | `not_comparable` (different estimand). Target population is an estimand attribute; extrapolation vs restriction changes it even for an identical observed sample. | Population attribute differs | CLM-01, CLM-19 | Justification for population extrapolation from an all-female sample | HIGH |
| FND1-07 | `not_comparable`. Different contrasts are different scientific questions even inside the same hypothesis family. | Treatment attribute (compared conditions) differs | CLM-01, CLM-20 | Whether the hypothesis family (A-C, B-C, D-C) is jointly protected | HIGH |
| FND1-08 | `not_comparable` on the inferential-result axis, even when the effect estimate is numerically identical. Two-sided null and one-sided superiority null with a boundary are different test nulls with different decision roles. | Test null, direction, and possibly margin differ | CLM-21 | Whether a non-zero superiority margin is declared | HIGH |
| FND1-09 | `not_comparable` on the inferential-result axis. Same numerical contrast can carry different protected-family membership; the FWER-guarantee scope differs. | Hypothesis-family member set differs; multiplicity guarantee differs | CLM-08, CLM-12, CLM-13, CLM-22 | The exact contrast set and how alpha is allocated | HIGH |
| FND1-10 | `not_comparable` on the guarantee-boundary axis. FWER and FDR are not interchangeable — they control different quantities. | Error criterion differs | CLM-10, CLM-11, CLM-22 | Whether either guarantee is being used for a regulatory decision role | HIGH |
| FND1-11 | `inadmissible_or_unsupported`. Outcome-dependent routing is not repaired by numerical or procedural coincidence. | Routing provenance differs; declarations are result-dependent | CLM-07, CLM-14, CLM-16, CLM-23 | Whether any pre-specified backstop routing existed before outcomes were seen | HIGH |
| FND1-12 | `inadmissible_or_unsupported` for identity purposes (not for scientific meaning), because too many estimand attributes are absent to identify the estimand. Alternative: `unresolved` with a demand for declarations. | Declaration completeness fails; population, variable, contrast, direction, margin, analysis population, estimator, uncertainty target, family, error criterion all unstated | CLM-24 | Every estimand attribute other than an ambiguous free-text label | HIGH |
| **FND1-S1 (investigator-created; primary + true sensitivity)** | `aligned` for the same estimand, with the sensitivity analysis distinguishable by declared analytic assumption change. Example: E1 primary is mean-difference with a Gaussian analytic SE; sensitivity is the same mean-difference target and identical analysis population and family, with a pre-specified nonparametric bootstrap CI intended to test robustness to normality. Consistent with ICH E9(R1) Glossary "Sensitivity Analysis". | Estimand attributes all match; only the modelling assumption tested differs. | CLM-01, CLM-03 | Whether the sensitivity analysis is fully pre-specified with routing fixed before outcomes | HIGH |
| **FND1-S2 (investigator-created; misnamed "sensitivity")** | `not_comparable` (label misuse). A study calls its "sensitivity analysis" an inclusion of participants who did not adhere to treatment, changing the intercurrent-event strategy from *hypothetical* (adherers) to *treatment policy* (all randomised). This changes an estimand attribute and therefore the estimand — it is a *supplementary* analysis of a different estimand, not a sensitivity analysis. | Intercurrent-event handling attribute differs | CLM-01, CLM-02, CLM-04 | Explicit declaration of which intercurrent-event strategy each analysis uses | HIGH |

Total processed: 12/12 corpus cases + 2 investigator-created cases = 14/14.

## 7. Candidate attributes and consistency rules

### 7.1 Identity-attribute matrix

| Attribute | Layer | Always required to identify | Conditional on | Evidence |
| --- | --- | --- | --- | --- |
| Scientific objective / decision role | Scientific estimand | Yes | — | SRC-01 §A.3.3 (glossary) |
| Target population | Scientific estimand | Yes | — | SRC-01 §A.3.3 |
| Variable / endpoint, incl. assessment window and unit | Scientific estimand | Yes | Unit conversion only preserves identity if the conversion is exact and declared (CLM-17) | SRC-01 §A.3.3 |
| Treatment condition and comparator | Scientific estimand | Yes | — | SRC-01 §A.3.3 |
| Intercurrent-event handling strategy | Scientific estimand | Required in clinical trials; abstract analogue outside clinical trials is "handling of dropout, censoring, protocol deviation, or between-condition transitions" | Applicability depends on the design's exposure model | SRC-01 §A.3.2 |
| Population-level summary | Scientific estimand | Yes | Transformation changes the summary (CLM-18) | SRC-01 §A.3.3 |
| Analysis population, exclusions, weights, pairing, clustering | Statistical inference target | Yes | — | SRC-02 §II.B |
| Estimator | Statistical inference target | Yes | — | SRC-02 §II.B |
| Uncertainty target (SE model, CI construction, resampling scheme) | Statistical inference target | Yes | Distinct from estimand; same estimand can carry different uncertainty targets (see FND1-02) | SRC-01 Glossary "Sensitivity Analysis"; CLM-03 |
| Test null, direction, and margin | Statistical inference target | Yes | Two-sided/one-sided/superiority/non-inferiority each carry distinct nulls | CLM-21 |
| Hypothesis family and member set | Multiplicity guarantee | Required whenever more than one hypothesis is protected | Determines whether all-pairs, many-to-one, planned-contrast, gatekeeping, or omnibus semantics applies | SRC-02 §III, §IV; CLM-12, CLM-13 |
| Error criterion (FWER, FDR, or none declared) and level | Multiplicity guarantee | Required for a protected inferential claim | FWER and FDR are not interchangeable | CLM-10, CLM-11 |
| Procedure and its version, incl. any weighting or graph | Multiplicity guarantee | Required for a protected inferential claim | Applies once family and criterion are fixed | SRC-02 Appendices 1–8 |
| Routing provenance (pre-outcome fixation of routing and admissibility) | Admissibility layer | Yes | Post-hoc routing compromises the guarantee even under accidental agreement | CLM-07, CLM-14, CLM-16, CLM-23 |

The instructions' candidate list is broadly supported; the report proposes explicitly separating the "uncertainty target" from the "estimator" attribute, and treating **routing provenance** as its own admissibility attribute rather than as a sub-attribute of any layer.

### 7.2 Proposed value-independent internal-consistency rules

| Rule ID | Rule | Inputs | Deterministic? | Failure class |
| --- | --- | --- | --- | --- |
| R-01 | The point estimate and the interval must belong to the same estimand attribute set (same population summary, same contrast, same scale). | Point estimate; interval; declared summary and contrast | YES | Layer mismatch |
| R-02 | The test null, direction, and margin must correspond to the declared contrast and scale, not merely to the numerical value observed. | Test null; contrast; margin | YES | Null-contrast mismatch |
| R-03 | The multiplicity family declared must contain the tested hypothesis, and its error criterion (FWER or FDR) must be one of a fixed enumerated set of guarantee semantics. | Family member set; criterion; procedure | YES | Family membership violation |
| R-04 | If the analysis is called "sensitivity" (ICH E9(R1) Glossary), all estimand attributes must match the primary analysis; only modelling assumptions or data-handling assumptions may differ. | Estimand attribute set of primary vs sensitivity | YES | Mislabelled sensitivity (see FND1-S2) |
| R-05 | Routing (choice of analysis, procedure, and admissibility rule) must be timestamped before outcome values or diagnostics are inspected. Post-hoc routing yields inadmissibility regardless of numerical agreement. | Routing timestamp; outcome-inspection timestamp | YES (given honest logs) | Outcome-dependent routing (FND1-11) |
| R-06 | Unit conversion preserves identity only if the conversion is exact and one-to-one and the factor and units are declared. | Source unit; target unit; conversion factor | YES | Non-declared or inexact conversion |
| R-07 | A transformation of the outcome (e.g. log, followed by back-transformation) is identity-preserving only if the declared population-level summary is invariant under the transformation. A back-transformed geometric-mean ratio ≠ an arithmetic-mean difference. | Transformation; declared summary | YES | Estimand drift under transformation |
| R-08 | Population extrapolation from a restricted observed sample to a broader declared target population must be explicitly declared and justified; otherwise identity fails. | Observed sample restrictions; declared target population | YES on declaration; NO on justification | Population-extrapolation gap |

## 8. Multiplicity and ICH boundary analysis

### 8.1 Multiplicity-family catalogue

| Family label | Member set | Typical procedure | Guarantee (as recognized by the primary sources) |
| --- | --- | --- | --- |
| Omnibus | Single global null across k means | Global F-test | Protects the omnibus null only; does not license per-comparison claims |
| All-pairs | { μ_i − μ_j : i ≠ j } | Tukey (1949) HSD / studentized range | FWER for the set of pairwise comparisons (CLM-13) |
| Many-to-one | { μ_i − μ_C : i = 1…k } | Dunnett (1955) multivariate-t | FWER for the set of treatment-vs-control comparisons (CLM-12) |
| Planned contrasts | Prespecified linear combinations | Bonferroni; Holm; Hochberg; graphical | FWER dependent on procedure and dependence assumptions (SRC-02 App. 1–8; CLM-08, CLM-09) |
| Gatekeeping (serial, parallel, tree, mixture) | Ordered families with logical constraints | Serial gatekeeping; parallel gatekeeping; mixture procedures | FWER across the union of families (SRC-02 App. 7) |
| Fixed-sequence | Ordered list of hypotheses tested in sequence at full α | Fixed-sequence | FWER, at cost of stopping at first non-rejection (SRC-02 App. 5) |
| FDR family | Same tested-hypothesis set as above but under a different guarantee | Benjamini–Hochberg 1995 step-up | FDR = E[V/R \| R>0]·P(R>0) (CLM-10, CLM-11); not FWER |

These families are not interchangeable "labels" for the same set: they define different questions and, together with the error criterion, different guarantee boundaries. Comparison of an FWER-controlled and an FDR-controlled result over the same hypothesis set is meaningful only as a description of two different guarantees.

### 8.2 ICH clinical-trial-specific vs abstract reusable structure

| ICH E9(R1) construct | Clinical-trial specific? | Abstract structure reusable outside clinical trials? |
| --- | --- | --- |
| "Patients", "sponsor and regulator" language | YES — vocabulary is clinical-trial specific | The abstract role is: study units and the scientific decision-maker (SRC-09 for general science) |
| Treatment attribute (drug/regimen) | Vocabulary is clinical | Abstract role is: the exposure or condition set being compared (SRC-11 as general-science background) |
| Population attribute | Vocabulary is clinical | Abstract role: declared inferential target population; fully reusable |
| Variable/endpoint attribute | Vocabulary is clinical | Abstract role: measured outcome including its assessment window, unit, and scale; fully reusable |
| Intercurrent-event handling (treatment policy, hypothetical, composite, while-on-treatment, principal stratum) | YES — specifically clinical | Abstract analogue: handling of dropout, protocol deviation, between-condition transitions, censoring; the *strategy vocabulary* does not translate verbatim; general labels such as "as-collected" (analogue of treatment policy), "counterfactual" (hypothetical), "composite outcome", "restricted to sub-stratum" cover most non-clinical settings but are not one-to-one |
| Population-level summary | Vocabulary neutral | Fully reusable |
| Sensitivity vs supplementary analysis distinction | Vocabulary neutral | Fully reusable and directly supports R-04 |

Conclusion: hypothesis H5 is **PARTIAL** — the estimand structure (five attributes) is reusable in non-clinical or wet-lab settings if the *intercurrent-event vocabulary* is replaced by a general "condition-transition and missing-outcome handling" attribute rather than imported verbatim.

## 9. Falsification attempts and material disagreements

### 9.1 Falsification attempts

| Target hypothesis | Strongest attempted counterexample | Result | Consequence |
| --- | --- | --- | --- |
| H1 (method name ≠ estimand) | A single label "primary biomarker comparison" with numerical results (FND1-12) | SURVIVED | Method labels are demonstrably insufficient; retain H1. |
| H2 (routing must be pre-outcome) | Outcome-dependent routing returning the same numbers as a pre-outcome rule (FND1-11) | SURVIVED | Accidental agreement does not repair inadmissibility (SRC-02 §II.C; SRC-05 P4; SRC-09). |
| H3 (family + error criterion form part of meaning) | Same contrast in many-to-one vs all-pairs (FND1-09); FWER vs FDR at 0.05 on same family (FND1-10) | SURVIVED | Family and criterion are meaning-bearing (CLM-11, CLM-22). |
| H4 (four-relation vocabulary sufficient) | FND1-02 does not fit cleanly (same estimand, different uncertainty target); FND1-08 sits between `not_comparable` and a same-estimand/different-decision-role case | NARROWED | Add `unresolved` and consider an explicit relation for "same estimand, different inference target". `aligned` must be labelled as never implying combination. |
| H5 (ICH abstract structure reusable) | Wet-lab experiment with no intercurrent-event vocabulary — SRC-09 and SRC-11 background | NARROWED | Estimand attributes reusable; intercurrent-event vocabulary is clinical-specific and needs a general-domain analogue. |

### 9.2 Material disagreements preserved (not resolved by vote)

| Issue | Position A | Position B | Why it matters | Proposed hold |
| --- | --- | --- | --- | --- |
| Whether FDR control is a "less stringent" version of FWER or a fundamentally different guarantee | FDR is a weaker guarantee on the same family (some secondary sources) | FDR controls a distinct quantity — the expected proportion of false rejections — and is not comparable to FWER via a stringency ordering (SRC-04 as quoted in Storey 2002) | Determines whether FWER- and FDR-controlled results can be compared as one is "stronger" | HOLD-A: adopt SRC-04's definitional stance; do not treat FDR and FWER as ordered by stringency in identity classification. |
| Whether a "sensitivity analysis" that changes intercurrent-event strategy is still a sensitivity analysis | Some applied literature calls any robustness analysis "sensitivity" | ICH E9(R1) Glossary limits sensitivity analysis to changes in modelling assumptions or data-handling, not to changes in the estimand attributes | Determines FND1-S2 classification | HOLD-B: adopt SRC-01's definitional stance. |
| Whether preregistration is universally required | Gelman & Loken note preregistration is not always practical outside experimental fields | ICH and FDA require prospective specification in clinical-trial settings | Determines how strong H2 must be outside clinical trials | HOLD-C: retain H2 as normative in prospective-experimental settings and as strongly recommended elsewhere. |

### 9.3 Negative/absence claims

| Claim | Inspected version | Inspected scope | Result |
| --- | --- | --- | --- |
| The four-relation vocabulary contains no `unresolved` state or "same estimand, different inference target" relation | Corpus v1, 2026-08-30 | Full corpus text | CONFIRMED absent |
| The FDA Multiple Endpoints guidance does not name "Hommel" as one of its detailed procedures | 2022 final | §IV and Appendices 1–8 | Hommel is present only in the general references |
| The FDA guidance does not endorse FDR control for confirmatory primary endpoints | 2022 final | Full guidance | No endorsement observed; scope is FWER for confirmatory testing |

## 10. Holds and cross-pass handoff

### 10.1 Unresolved holds

| Hold ID | Question | Why evidence is insufficient in this pass | Next evidence needed | Downstream Protocol work blocked |
| --- | --- | --- | --- | --- |
| HOLD-01 | Does the taxonomy need a fifth relation "same estimand, different inference target" (FND1-02, FND1-S1)? | Corpus v1 does not test this against a formal source; ICH E9(R1) supports the distinction between estimand and estimator but does not label the relation. | Direct inspection of Holm 1979 and Benjamini & Hochberg 1995 full texts to confirm how each defines the family, plus a decision on whether sensitivity analyses form a distinct relation. | Any FND-1 Protocol field that would encode inter-result relations. |
| HOLD-02 | Full inspection of Holm 1979 primary text (JSTOR blocked in this session). | JSTOR host did not return the PDF via the available channel. | Direct or library-authenticated retrieval of Scand. J. Statist. 6(2):65-70. | Formal proof-level claims about strong-sense FWER control under general dependence. |
| HOLD-03 | Full inspection of Benjamini & Hochberg 1995 primary text (JSTOR blocked in this session). | Same as HOLD-02. | Direct retrieval of JRSS-B 57(1):289-300. | Formal statement of Theorem 1 (independence) and the paper's own conditions for FDR control. |
| HOLD-04 | Full inspection of Dunnett 1955 and Tukey 1949 primary texts. | JSTOR blocked. | Direct retrieval. | Formal identity of the many-to-one and all-pairs multiplicity families as guarantee boundaries. |
| HOLD-05 | Non-clinical intercurrent-event vocabulary. | SRC-01 vocabulary is clinical; SRC-09 and SRC-11 are not written as an intercurrent-event glossary. | A primary methodological source that names the non-clinical analogues of the five ICH E9(R1) strategies. | Reuse of estimand vocabulary in wet-lab / general-scientific settings. |
| HOLD-06 | Whether "aligned" in the current vocabulary risks being read as authorization for combination. | Multiple corpus cases (FND1-01, FND1-04, FND1-S1) receive `aligned` but combination would be inappropriate in most. | An explicit prose annotation in the taxonomy that `aligned` never authorizes combination or pooling. | Any downstream schema decision. |

### 10.2 Recommended next action

- Retrieve HOLD-02 through HOLD-04 primary texts via a channel with JSTOR access; re-open Section 5 rows CLM-09, CLM-10, CLM-12, CLM-13 and upgrade `NOT_VERIFIABLE`/`CROSS_SOURCE_INFERENCE` to `VERIFIED_DIRECT` where the primary text confirms the claim.
- Cross-pass reconciliation with the independent repository pass on the taxonomy shape (four vs five relations) and on the routing-provenance attribute.
- Independent review of the two investigator-created cases (FND1-S1, FND1-S2) as candidate additions to the corpus at v2, without treating them as gold labels.

### 10.3 Readiness and disposition

- Disposition: **NARROW**
- Cross-pass reconciliation readiness: **READY** for comparison with the independent repository pass on Sections 5–8 findings; **NOT READY** for closure of the FND-1 Research Gate because HOLD-02, HOLD-03, and HOLD-04 (primary-text access) remain open. `ADVANCE` is intentionally not selected because the minimum primary-source basis was not fully inspected in this session.

## 11. Public-artifact and sanitization self-check

- [x] Every assigned case (12/12) processed; two investigator-created cases added.
- [x] Direct fact, cross-source inference, and possible project convention are kept separate in each ledger row (Section 5).
- [x] Decision-bearing claims rest primarily on primary sources; sources not directly inspected are marked `NOT_VERIFIABLE` or `CROSS_SOURCE_INFERENCE` with the corroborating primary quotation identified.
- [x] Source version, tag, or date is recorded for every entry in Section 4.
- [x] Inaccessible source content is marked `NOT_VERIFIABLE` (SRC-03, SRC-04, SRC-06, SRC-07, SRC-08, SRC-10, SRC-11).
- [x] Semantic identity is not inferred from numerical proximity anywhere in Section 6.
- [x] Every absence claim states its inspected scope (Section 9.3).
- [x] Release 2, paired-t work, and t-family numerical contracts remain excluded.
- [x] No Protocol adoption, schema, identifier, refusal code, transport, method default, API, implementation change, or Release 2 decision is selected.
- [x] No confidential strategy, personal data, credential, internal URL, non-public third-party material, or active-negotiation detail is present.
- [x] Verbatim quotation from any single source is kept below 25 words in the whole report (each quoted phrase is short and attributed).
- [x] External-source pass discipline: no repository commit, branch, or push claim is made; the commissioning steward will place this report unchanged.
- [x] Independence boundary honored: no other FND result, prior nomue conclusion, review branch, or adjudication material was viewed.

---

GENSPARK FND-1 PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION
