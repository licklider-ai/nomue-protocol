# FND-1 and FND-2 Counterexample Corpus, Version 1

- **Completion date:** 2026-08-30
- **Status:** informative research input; non-normative; no gold labels
- **Coverage:** 12 FND-1 cases and 12 FND-2 cases
- **Excluded:** Release 2 and its candidate work, paired-t procedures, t-family
  numerical contracts, Protocol schemas, implementation, and adoption decisions

## Purpose

This corpus is a counterexample design table for testing the candidate concepts
in FND-1 and FND-2. It is not a fixture set that supplies correct answers. Each
case changes one declaration between A and B where practical and asks an
independent investigator whether that difference changes:

- the estimand, inference target, or hypothesis meaning;
- the ability to compare or combine results;
- analysis-data identity;
- the assurance class that can be established; or
- a declaration or refusal boundary.

Equal, close, or accidentally identical numerical results do not establish
semantic identity. Unless a case states otherwise, attributes not named in the
case are identical to the applicable base profile.

## Use rules

1. The FND-1 investigator classifies only `FND1-01` through `FND1-12`.
2. The FND-2 investigator classifies only `FND2-01` through `FND2-12`.
3. The tables contain no gold labels. Classification is based on primary sources
   and explicit declarations, not inferred designer intent.
4. The provisional relation vocabulary is itself a falsifiable hypothesis:
   `aligned`, `parallel_not_combinable`, `not_comparable`, and
   `inadmissible_or_unsupported`.
5. When evidence or declarations do not support a classification, use
   `unresolved` and explain any better taxonomy.
6. `aligned` never implies automatic combination, pooling, or Protocol adoption.
7. Do not infer missing attributes from free text.

## Base profiles

### FND-1 base E1

| Attribute                 | Declaration                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| Scientific objective      | Compare biomarker Y at 24 hours after compound X versus vehicle C       |
| Target population         | Adult mice meeting prospectively declared eligibility criteria          |
| Sampling and assignment   | Independent experimental units randomized at the animal level to X or C |
| Unit of analysis          | Animal                                                                  |
| Outcome                   | Biomarker Y at 24 hours, measured in `ng/mL`                            |
| Scale and transformation  | Original scale; no transformation                                       |
| Analysis population       | All prospectively eligible animals; no missingness or censoring         |
| Population summary        | Arithmetic mean                                                         |
| Contrast                  | `mu_X - mu_C`                                                           |
| Direction and margin      | Two-sided; margin 0                                                     |
| Estimator and uncertainty | Sample mean difference and 95% confidence interval                      |
| Multiplicity              | One-member hypothesis family; FWER 0.05                                 |
| Routing                   | Fixed before outcomes or diagnostic results are inspected               |

### FND-1 multi-group base E2

E2 extends E1 to four groups, `C / A / B / D`. Outcome, assessment time,
target population, analysis population, and scale remain identical. Each case
states its comparison family.

### FND-2 base D1

| Attribute              | Declaration                                                    |
| ---------------------- | -------------------------------------------------------------- |
| Source                 | Immutable snapshot `S1` with a content hash                    |
| Schema                 | `animal_id`, `group`, `y24`                                    |
| Key                    | `animal_id` is unique; one row per animal                      |
| Selection              | Includes every prospectively eligible animal                   |
| Join and deduplication | No join and no duplicate rows                                  |
| Missingness            | No missingness, censoring, or imputation                       |
| Transformation         | No transformation                                              |
| Execution              | Deterministic; software and version fixed                      |
| Output                 | Ordered schema, row count, and content hash recorded           |
| Provenance             | The derivation from source to analysis dataset can be resolved |

## FND-1 cases

| ID        | A                                                                                                 | B                                                                                                                                        | Isolated difference                     | Question for independent research                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `FND1-01` | Compute E1 with implementation P                                                                  | Compute E1 with method-distinct implementation Q; the declared mathematical target is unchanged                                          | Software or implementation lineage only | Does the implementation difference affect estimand identity, inference identity, or only result verification?                                |
| `FND1-02` | Infer the arithmetic mean difference with an analytic standard error                              | Infer the same mean difference with a nonparametric bootstrap confidence interval fixed before results are seen                          | Uncertainty estimator only              | Is this a different estimator or sensitivity analysis for the same estimand, or a different inference target? Which declarations must agree? |
| `FND1-03` | Assess Y at 24 hours                                                                              | Assess Y at 48 hours                                                                                                                     | Assessment time only                    | Which relation classification follows from the time-point difference?                                                                        |
| `FND1-04` | Declare Y in `ng/mL`                                                                              | Declare the same measurement in `pg/uL` with an exact one-to-one conversion                                                              | Unit representation only                | Can canonical unit conversion preserve identity, and what conversion information is needed?                                                  |
| `FND1-05` | Arithmetic mean difference on the original scale                                                  | Mean difference of `log(Y)`, reported after back-transformation as a geometric-mean ratio                                                | Transformation and population summary   | Can these be the same estimand even when the scientific objective is described similarly?                                                    |
| `FND1-06` | For the same all-female observed sample, declare the target population as all eligible adult mice | For that sample, declare the target population as eligible adult female mice                                                             | Target population only                  | Does population inclusion or extrapolation affect identity, parallelism, or admissibility?                                                   |
| `FND1-07` | Under E2, contrast `mu_A - mu_C`                                                                  | Under E2, contrast `mu_B - mu_C`                                                                                                         | Contrast coefficients only              | Are these different questions even when outcome and hypothesis family are shared?                                                            |
| `FND1-08` | Two-sided inference for `mu_X - mu_C = 0`                                                         | One-sided superiority inference for `mu_X - mu_C <= 0`                                                                                   | Direction and null boundary             | How should different nulls and claim directions be related when the effect estimate is identical?                                            |
| `FND1-09` | Evaluate `mu_A - mu_C` within the many-to-one family `{A-C, B-C, D-C}` under FWER control         | Evaluate the same contrast within the all-pairs family under FWER control                                                                | Hypothesis-family member set only       | Can these be called the same inferential result when the protected family differs?                                                           |
| `FND1-10` | Control FWER at 0.05 for a fixed family                                                           | Control FDR at 0.05 for the same family                                                                                                  | Error criterion only                    | How does the error criterion affect result identity and comparison?                                                                          |
| `FND1-11` | Fix routing and inference before results are observed                                             | Choose the procedure after inspecting a variance diagnostic or interim p-value; it happens to return the same procedure and numbers as A | Routing provenance only                 | Does outcome-dependent selection change admissibility despite the accidental agreement?                                                      |
| `FND1-12` | Declare every structured E1 attribute                                                             | Provide only the label `primary biomarker comparison` and numerical results                                                              | Declaration completeness only           | How far can classification proceed without guessing, and which attributes are indispensable?                                                 |

## FND-2 cases

| ID        | A                                                                       | B                                                                                                                                   | Isolated difference                          | Question for independent research                                                                            |
| --------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `FND2-01` | `data.csv` identifies snapshot `S1` and hash `h1`                       | A file also named `data.csv` identifies snapshot `S2` and hash `h2` after one cell changed                                          | Source content identity only                 | Are these different datasets despite the filename, and what snapshot information is minimally needed?        |
| `FND2-02` | Store S1 rows in ascending `animal_id` order                            | Store the same logical rows in reverse order; keys and cell values match                                                            | Row order only                               | Should byte identity and logical dataset identity be distinct, and what canonicalization conditions apply?   |
| `FND2-03` | Analysis-set label `complete_case_v1`; predicate `y24 is present`       | Same label; predicate `y24 and unused_covariate are present`                                                                        | Selection predicate only                     | Does an equal label hide a different analysis population, and how should the predicate be identified?        |
| `FND2-04` | One-to-one join to a unique lookup table                                | Many-to-many join to a lookup with duplicate keys, followed by first-row retention; final values and row count accidentally match A | Join cardinality and deduplication rule only | Does equal final tabular content imply equal derivation identity, and which provenance is needed?            |
| `FND2-05` | Declare a blank cell `not_collected`                                    | Declare the same blank cell `structurally_nonexistent`                                                                              | Value state only                             | Is there primary support for distinguishing these states, and can the distinction affect analysis?           |
| `FND2-06` | Declare a blank cell `not_relevant_to_estimand`                         | Declare the same cell `excluded` by the analysis-set rule                                                                           | Value state only                             | Can value irrelevance and exclusion of an observational unit share one state?                                |
| `FND2-07` | Record `5.0` as an exact observation                                    | The assay establishes only `Y <= 5.0`, but stores the boundary value `5.0`                                                          | Exact observation versus censored or bounded | Must the identical numeric representation retain different meaning, and is implicit substitution acceptable? |
| `FND2-08` | Record `7.2` as observed                                                | Record the same `7.2` as generated by a declared imputation method                                                                  | Observed versus imputed                      | Does equal value leave identity and verifiability unchanged, and what imputation provenance is needed?       |
| `FND2-09` | Record `3.0` as directly observed                                       | Derive `3.0` as the mean of technical replicates `2.8` and `3.2`                                                                    | Observed versus derived                      | Which input, operation, and ordering identity is needed for the derived value?                               |
| `FND2-10` | Stochastic preprocessing uses PRNG A version 1 and seed 42              | The same method and seed use PRNG A version 2; the fixture output accidentally matches                                              | PRNG version only                            | Is a shared seed enough for reproducibility identity, and are draw order or execution details also needed?   |
| `FND2-11` | Compute `mean(log(Y))`                                                  | Compute `log(mean(Y))` from the same input and functions                                                                            | Transformation order only                    | Must identity include a transformation DAG rather than only operation names?                                 |
| `FND2-12` | Give a third party dataset bytes, hash, and a recomputation environment | Keep the same dataset private and expose only a commitment plus a signed local-verification result                                  | Evidence availability and privacy boundary   | Which parts of dataset identity can be checked, and how should the reachable assurance class be narrowed?    |

## Additional required investigation outside the 24 cases

### FND-1

- Conditions under which primary and sensitivity analyses address the same
  estimand.
- A counterexample labelled sensitivity analysis that actually changes the
  estimand.
- Internal alignment among effect estimate, confidence interval, test null,
  direction, margin, and multiplicity family.
- The boundary between clinical-trial-specific ICH E9(R1) language and any
  abstract structure transferable to non-clinical or wet-lab research.

### FND-2

- A primary-source crosswalk for all eight candidate value states.
- Separation of MCAR, MAR, and MNAR assumptions from cell-level value states.
- Multiple imputation represented as derived entities plus a pooling activity,
  alongside a serious alternative representation.
- A candidate linking profile between USDM v4.0.0 and ARS v1.0.
- Assurance differences among commitments, attestations, trusted local
  verification, and public recomputation for private data.

## Use boundary

No Protocol field, identifier, schema, refusal code, implementation default, or
release decision follows directly from this corpus. Results return evidence,
counterexamples, ambiguities, standard boundaries, and unresolved disputes to
Research Gate adjudication.
