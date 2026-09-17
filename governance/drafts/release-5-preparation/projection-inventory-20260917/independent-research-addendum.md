# Release 5 independent research addendum

**Status: informative Research Gate addendum; independently attributable;
non-normative; not adopted.** This report closes part of the source-access work and
answers the questions assigned by the
[independent research handoff](research-addendum-handoff.md). It issues no Protocol
meaning, identifier, Requirement ID, schema, mapping, check, bundle, supported
capability or release decision.

**Bounded recommendation: `PROCEED_AFTER_REPAIR`.** The next step may be an unissued
mapping/report-schema draft and counterexample fixtures after the repairs in Section 10. Design freeze, adoption, issuance, implementation, runtime support and release
remain held.

## 1. Fixed target and method

| Field              | Fixed value or result                                                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository         | `licklider-ai/nomue-protocol`                                                                                                                                                                                                                                                                  |
| Proposed packet    | PR #349                                                                                                                                                                                                                                                                                        |
| Reviewed head      | `52e39c7a6cda4a2fdee89d0b8b22e068854f4852`                                                                                                                                                                                                                                                     |
| Parent             | `a24958e1107cc75ecf189eb0176691357812a6ba`                                                                                                                                                                                                                                                     |
| Tree               | `969d5d74b649c68ad069b62f90cc1ac366c05a1c`                                                                                                                                                                                                                                                     |
| Identity check     | The public `refs/pull/349/head` resolved to the reviewed head. Local commit, parent and tree objects matched the values above. Review used a clean archive of that commit, not the dirty working tree.                                                                                         |
| Inventory check    | `node governance/drafts/release-5-preparation/projection-inventory-20260917/check.mjs` returned `source_inventory_consistent`, with 12 sources, 24 family-fact cells and 36 schema fragments. It expressly reported `semantic_mapping_validation: not_performed` and `r5_support: not_issued`. |
| Investigation date | 2026-09-17 UTC                                                                                                                                                                                                                                                                                 |

The decision-bearing repository inputs were `AGENTS.md`, `CHARTER.md`,
`AUTHORITY.md`, `authority/authority-manifest.yaml`, `governance/RFC.md`,
`governance/ID-POLICY.md`, `registries/requirements.yaml`, the Release 5 opening
RFC, public opening record, research commission and prior research result, and this
packet's `README.md`, `inventory.json`, `check.mjs`, `verification-cases.md` and
research handoff. I also inspected the three source schemas and their governing
documents named by `inventory.json`: ITGC 0.2, the Release 2 paired candidate, and
the Release 3 D0 declaration-surface candidate and report. The inventory's twelve
SHA-256 pins matched the files in the fixed archive.

The labels used below are:

- **SOURCE FACT**: a bounded statement supported by an inspected decision-bearing
  part of a primary source;
- **DEDUCTION**: a logical consequence of repository structures or a constructed
  counterexample, not an empirical claim; and
- **PROPOSED CONVENTION**: a possible Protocol rule that requires ordinary owner and
  governance review.

## 2. Independence and access disclosure

This investigation was performed by an OpenAI Codex agent using the
`gpt-5.6-sol` model. I did not author the Release 5 proposal, original research
result, inventory or implementation and had no prior involvement in their creation.
The coordinator supplied the fixed target, the bounded commission, repository
locations and several source locators or failed-access observations. It did not
supply the methodological conclusions in this report. I independently opened the
decision-bearing source text described below, checked it against the repository
claims and produced this report in a separate model context. I did read the prior
result because the handoff requires a close-only addendum; therefore this is an
independent review of its claims, not a blinded reproduction.

Public web and repository access only were used. No human-expert review occurred.
Three sources were inspected through complete web-rendered text without a stable raw
download; those readings can support claim review but not byte-for-byte reproduction.
Two Zimmerman articles could not be obtained as full text. Abstracts, search snippets
and metadata for those articles were treated only as discovery aids and support no
decision claim here.

## 3. Primary-source access and claim-level disposition

All access dates are 2026-09-17. Page references are printed article or guideline
pages where available. The local source files were transient research artifacts and
are not committed.

| Source and stable identity                                                                                                                                                                                                        | Actual access and inspected location                                                                                                                                                                                                                                                                                                                                                                                    | Decision-bearing fact, within scope                                                                                                                                                                                                                                                                                                                                | Disposition                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hurlbert (1984), _Pseudoreplication and the Design of Ecological Field Experiments_, DOI [`10.2307/1942661`](https://doi.org/10.2307/1942661)                                                                                     | Complete 26-page JSTOR scan from a [UCF-hosted PDF](https://sciences.ucf.edu/biology/d4lab/wp-content/uploads/sites/23/2018/08/Hurlbert-1984.pdf); 3,362,874 bytes; SHA-256 `bcb8b5046b4910abd853451625b386061a1af67f7c14b64094a369a6c42cb185`. Inspected article pp. 187–202, especially the abstract, p. 192 and pp. 200–202.                                                                                         | **SOURCE FACT:** in the ecological-field-experiment setting, treatment replication and independence are distinct from multiple measurements inside an experimental unit. Multiple samples can improve the estimate for that unit without becoming treatment-effect replication or adding independent treatment degrees of freedom.                                 | Full-text claim review complete for the unit/replication distinction. Source domain remains ecology; it does not validate a universal schema vocabulary.                                                                          |
| Lazic (2010), _The problem of pseudoreplication in neuroscientific studies_, DOI [`10.1186/1471-2202-11-5`](https://doi.org/10.1186/1471-2202-11-5)                                                                               | Complete [publisher HTML](https://link.springer.com/article/10.1186/1471-2202-11-5). Inspected Background and the sections on repeated measurements and hierarchical structure. Raw export timed out, so artifact byte count and SHA-256 are unavailable.                                                                                                                                                               | **SOURCE FACT:** the experimental unit is tied to independent treatment assignment; biological units must be distinguished from repeated or technical observations. Measurements within a subject and observations within a hierarchy can be dependent.                                                                                                            | Content review complete for the bounded distinction. Reproducible byte pin remains open. Neuroscience examples do not establish the Protocol mapping by themselves.                                                               |
| Percie du Sert et al. (2020), ARRIVE 2.0 Explanation and Elaboration, DOI [`10.1371/journal.pbio.3000411`](https://doi.org/10.1371/journal.pbio.3000411)                                                                          | Complete [PLOS HTML](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3000411); 739,754 bytes; SHA-256 `bc265b436715645347a42d77f08c3fe806b013818d5b59c54c4bff085a78068f`. Inspected Item 1(b), Item 2 and Item 3 (experimental unit, sample size and exclusions).                                                                                                                                 | **SOURCE FACT:** in reported animal research, the unit is the entity independently exposed to an intervention; it can be an animal, cage, litter or another entity. Sample size concerns experimental units, while exclusions and the analyzed number must be reported per analysis.                                                                               | Full-text claim review complete within the animal-research reporting domain. A free-text label is still not a verified scientific classification.                                                                                 |
| Zimmerman (1997), _A note on interpretation of the paired-samples t test_, DOI [`10.3102/10769986022003349`](https://doi.org/10.3102/10769986022003349)                                                                           | Full text not obtained. The SAGE PDF did not return and JSTOR stable item `1165289` exposed no article body.                                                                                                                                                                                                                                                                                                            | No decision-bearing claim accepted from the abstract. In particular, this pass does not confirm the exact Type I error consequences attributed to correlation or their boundary conditions.                                                                                                                                                                        | **OPEN CONTENT HOLD.** Lazic supports the broader within-unit/between-unit distinction but is not a substitute for this article's exact claim.                                                                                    |
| Zimmerman (2004), _A note on preliminary tests of equality of variances_, DOI [`10.1348/000711004849222`](https://doi.org/10.1348/000711004849222)                                                                                | Full text not obtained; the publisher response was access-blocked.                                                                                                                                                                                                                                                                                                                                                      | No decision-bearing claim accepted from the abstract. The article cannot support a general preliminary-test or method-selection theorem in this addendum.                                                                                                                                                                                                          | **OPEN CONTENT HOLD.** Reacquire and inspect methods, simulations, results and limitations before citing its exact conclusion.                                                                                                    |
| Rasch, Kubinger and Moder (2011), _The two-sample t test: pre-testing its assumptions does not pay off_, DOI [`10.1007/s00362-009-0224-x`](https://doi.org/10.1007/s00362-009-0224-x)                                             | Full 11-page author-upload presentation in the [ResearchGate page](https://www.researchgate.net/publication/226351592_The_two-sample_t_test_Pre-testing_its_assumptions_does_not_pay_off), identified there as uploaded by Dieter Rasch on 2014-09-16. Inspected the Introduction, simulation design and pp. 10–11 discussion/conclusion. Direct PDF export failed, so artifact byte count and SHA-256 are unavailable. | **SOURCE FACT:** for the article's specified two-sample procedures, using the same observations for assumption pretests and the chosen main test produces a dependent combined procedure whose overall risks are not those of either component in isolation. The simulations support the authors' scoped recommendation for Welch's test in the examined settings. | Content review complete for that scoped result; raw byte pin remains open. It does **not** establish that every data-dependent procedure choice invalidates every nominal error rate or that one method is universally preferred. |
| Nosek et al. (2018), _The preregistration revolution_, DOI [`10.1073/pnas.1708274114`](https://doi.org/10.1073/pnas.1708274114)                                                                                                   | Complete seven-page [PNAS PDF text](https://www.pnas.org/doi/pdf/10.1073/pnas.1708274114) through web extraction. Inspected pp. 2600–2603, including the definition, deviations and preexisting-data discussion. The direct file request returned an access response rather than the PDF, so a raw artifact SHA-256 is unavailable.                                                                                     | **SOURCE FACT:** preregistration separates planned and unplanned analysis by committing a plan before observing relevant results, commonly through an independent registry; deviations can remain scientifically useful when disclosed. For preexisting data, what was observed and indirect exposure through related variables or datasets matters.               | Content review complete for the distinction. A self-reported R5 timing enum without registry, lineage or timestamp evidence is not preregistration. Raw byte pin remains open.                                                    |
| ICH E9 (1998), _Statistical Principles for Clinical Trials_, CPMP/ICH/363/96 Step 5, [official EMA PDF](https://www.ema.europa.eu/en/documents/scientific-guideline/ich-e-9-statistical-principles-clinical-trials-step-5_en.pdf) | Complete 37-page PDF; 332,364 bytes; SHA-256 `6dd74185bb88a6f48a4b3a154893f9d8953b2fa4784c56fedda102e45f410b96`. Inspected §§1.2, 5.1, 5.2 and 7 (pp. 5–6, 24–26 and 32–33).                                                                                                                                                                                                                                            | **SOURCE FACT:** principally for confirmatory clinical trials, principal analysis and analysis sets are to be planned prospectively; the statistical analysis plan is finalized before breaking the blind, formal records are retained, and the report distinguishes decisions made before and after unblinding.                                                   | Full-text claim review complete within the clinical-trial scope. This does not make the proposed R5 timing boundary a universal scientific standard.                                                                              |

### R5-RH-1 disposition

`R5-RH-1` is **partially closed, not closed**. Decision-bearing full text was
inspected for six of the eight named works. Zimmerman (1997) and Zimmerman (2004)
remain content holds. Lazic, Rasch and Nosek also retain artifact-reproducibility
subholds because the complete rendered text was inspectable but a stable raw artifact
could not be retained and hashed. Those byte-pin limitations do not turn the content
review into an abstract-only review, but they prevent exact artifact reproduction.

The source access is sufficient to narrow the next mapping design step because the
recommended repairs rest on explicit candidate-schema differences, logical
counterexamples and bounded source distinctions. It is insufficient for design
freeze while the original result continues to name the two uninspected Zimmerman
claims as decision support.

## 4. Source facts, deductions and proposed conventions

### Source facts

1. Experimental-unit identity is determined by the intervention and dependence
   structure, not merely by the number of rows or samples (Hurlbert; Lazic; ARRIVE,
   within their domains).
2. Repeated observations inside a unit and independent replication are different
   roles. Treating the former as the latter can produce pseudoreplication (Hurlbert;
   Lazic).
3. Analysis populations and exclusions should be specified and reported, with the
   analyzed number linked to each analysis in the relevant reporting domains (ARRIVE;
   ICH E9).
4. A plan fixed without knowledge of relevant outcomes is categorically different
   from a plan selected after such knowledge. Preregistration and regulated clinical
   planning use stronger commitment or record mechanisms than a bare declaration
   (Nosek; ICH E9).
5. Same-data assumption pretesting plus a selected two-sample test is itself a
   combined procedure. Rasch et al.'s evidence and recommendation are limited to the
   procedures and conditions they examined.

### Logical deductions from the fixed repository target

1. A string such as `mouse` cannot prove whether the intervention was assigned by
   mouse, cage or litter. A verifier can project the string as opaque source evidence
   and can inspect declared identifier links; it cannot classify the real scientific
   unit from the string.
2. ITGC `repeated_measurements: present` and R2
   `repeated_measurements: within_pair_only` have different admissibility meanings.
   Reducing both to `true` loses a decision-bearing distinction.
3. Absence of a field cannot distinguish “not applicable under this exact Profile”
   from “the producer omitted required pairing evidence.” Inapplicability therefore
   needs an explicit mapping result tied to exact Profile meaning.
4. The R3 D0 schema has no dedicated carrier for pairing, repetition or clustering.
   Its compound one-way/independence/not-flattened declarations cannot silently create
   three missing declarations.
5. A group count of four is compatible with both a declared one-way design and a
   flattened 2-by-2 factorial design. Count alone cannot select or classify the family.
6. Two byte-identical final Records can have different selection histories. A
   Record-only verifier cannot recover access time, edits, restoration or authorship.

### Proposed conventions requiring owner review

1. Preserve a source-qualified value and applicability state for repeated structure
   instead of a common Boolean.
2. Represent pair-identity inapplicability explicitly in the mapping output, with the
   exact accepted Profile/mapping as its basis; never infer it from an absent field.
3. Treat any observed outcome in the exact supplied-dataset revision, including a
   later excluded observation and data placed in a selector's input context, as
   outcome access for the candidate timing enum.
4. Bind timing to the complete selected tuple, projected declarations, exact dataset
   and Record revision. A post-access edit disqualifies `pre_outcome` even if the old
   value is later restored.
5. Leave access to other datasets outside that narrow enum's affirmative claim, and
   say so. `pre_outcome` is therefore not a general absence-of-data-influence claim.

## 5. Answers to commission Q11–Q14

### Q11. Residual independently checkable facts

**DEDUCTION.** After schema conformance, Profile admissibility and exact bundle
dispatch have been accounted for by their existing owners, the residual R5 evidence
depends on those outcomes:

- the exact projection-mapping identity and version are applicable to the selected
  Profile identity and version;
- every required common fact has exactly the source carrier named by that mapping,
  no default supplied a missing value, and the deterministic transformation produced
  the reported value;
- source paths, applicability states, group/condition count and selected-analysis
  binding are reported consistently;
- the Contract, Profile and bundle identities in evidence equal the already accepted
  tuple carriers, rather than a newly selected tuple;
- the exact admissibility-result identity and outcome used as a dependency are
  reported without re-performing its judgment;
- for a passed R5 result, a non-defaulted timing enum is present and copied
  consistently, and the report carries the complete projection, exact
  mapping/tuple/dependency evidence and applicable non-claim reference;
- for `not_run` caused by a completed blocking admissibility dependency, the report
  carries that dependency's actual check identity, version, scope, outcome and reason
  codes, plus the readable timing value and non-claim reference already obtained
  after Record conformance; it emits no computed projection or projection-success
  claim;
- for an execution error, the report retains only evidence actually obtained and
  registered reason codes, and never invents a missing dependency outcome,
  projection value, timing value or tuple evidence; and
- if Record conformance fails, no R5 projection is emitted and R5 does not fabricate
  timing or other Record evidence that conformance did not yield; the existing
  conformance/refusal report governs.

It cannot independently check whether the unit label names the true experimental
unit, whether independence or pairing is scientifically true, whether a hidden
factorial/clustered/repeated structure exists, whether the analysis population was
chosen well, why a tuple was chosen, whether timing is true, or whether the selected
method is appropriate, optimal or unique. Calling the result “successful selection
evidence” would overstate these residuals; “projection and selection-declaration
consistency” describes them more accurately.

### Q12. Two-group/multi-group boundary

**DEDUCTION plus PROPOSED CONVENTION.** Emit the exact accepted Profile identity, the
declared count and its exact source path. Do not infer a family from `count == 2` or
`count >= 3`. The multi-group value is available only because the exact accepted R3
Profile declares `independent_one_way`, declares independence and not-flattened
status, and its own checks accepted the Record. R5 consumes that decision; it does
not reclassify a table.

Counterexample: four cells `A0B0`, `A0B1`, `A1B0`, `A1B1` and four unrelated labels
both have count four. The first naming can encode a 2-by-2 factorial and the second a
one-way four-level factor. Count and outcome values do not distinguish them. A
flattened factorial must be blocked by the owning Profile declaration/admissibility
boundary or remain outside R5; R5 cannot cure it by relabeling the count.

### Q13. More than one valid Contract

**DEDUCTION.** Exact selected-Contract identity and prominent non-claims are necessary
and sufficient only for the narrow statement that the reported projection is bound
to the producer's selected tuple. They are not evidence that the private choice was
sound. If two Contracts are valid for the same declarations, both can pass the same
R5 consistency check. The result must therefore avoid “chosen by the Protocol,”
“recommended,” “best” and unqualified “successful selection.” It must say that
selection policy, comparative merit, uniqueness and endorsement are outside scope.

Counterexample: two accepted Contracts differ in a permitted variance treatment but
consume the same design declarations. Product X records Contract A and product Y
records Contract B. Both reports can be internally consistent; neither report supplies
a reason to prefer A or B. Any claim of endorsement would require a separately
specified selection policy, which is excluded from this slice.

### Q14. Strongest Record-only timing claim

**DEDUCTION.** The strongest claim is: the inspected conforming Record revision
contains one schema-valid, producer-supplied but unproved timing declaration from the
closed enum, and the report reproduces that value consistently for the exact revision,
dataset and selection tuple to which the schema binds it. Under the proposed
convention, `pre_outcome` asserts that the tuple and mapped declarations were
completed before covered access; `post_outcome` asserts at least one covered access
preceded completion; and `unknown` means the producer cannot supply either assertion.
If Record conformance fails, this R5 claim is unavailable; a verifier must not infer or
fabricate a timing value from the failed input.

The verifier cannot establish the assertion's truth, who selected or declared it,
their authentication or authority, when either event occurred, whether an earlier
revision differed, whether a post-access edit was restored, or whether other data
influenced the decision. External immutable lineage, trusted time evidence or
attestation could strengthen a different future claim. A self-declaration is not
preregistration.

Counterexample: two final Records and reports are byte-identical. In history A, the
tuple was fixed before outcome access. In history B, the selector saw outcomes,
changed the tuple and later restored its original values. A Record-only verifier sees
no distinction.

## 6. Answers to the seven mapping questions

### 1. Common experimental-unit facts without classifying free text

**DEDUCTION.** Project the free-text label or definition only as an opaque declared
value with its source path. Separately project structural facts that the owning Profile
already accepted: declared unit identifiers, observation-to-unit links,
unit-to-group/condition links and their relevant cardinalities. Keep pair identity
separate from experimental-unit identity. The verifier may say the mapped carriers
exist and were transformed accurately; it may not say the label correctly identifies
the real unit or proves independence.

Counterexample: two Records both say `experimental_unit_type: mouse`. In one study
each mouse is independently assigned treatment. In the other, one treatment is applied
to each cage and all mice in a cage receive it. The same label maps to different true
units, so parsing it cannot close the distinction.

### 2. Independent repetition versus R2 within-pair repetition

**DEDUCTION and PROPOSED CONVENTION.** Use a tagged or source-qualified value, for
example the exact source enum plus Profile/mapping identity and applicability. In ITGC,
`none` is admissible and `present` is readable but outside the admitted family. In R2,
`within_pair_only` describes the permitted dependence inside each pair and must not be
reported as a generic forbidden repeated design. R5 should copy the accepted
Profile-owned meaning and dependency; it should not re-adjudicate it.

Counterexample: a Boolean `repeated: true` would make an inadmissible ITGC Record with
multiple measurements look identical to a valid R2 before/after pair. A Boolean loses
the fact needed to interpret the check result.

### 3. Whether D0 compound declarations suffice

**DEDUCTION.** They suffice to report the accepted relationship as
`independent_one_way` when an owning Profile has accepted that exact compound. They do
not supply dedicated pairing, repetition or clustering states. Pair identity may be
reported as explicitly **not applicable under the accepted independent-one-way
mapping**, provided owner review adopts that mapping; this is an applicability result,
not a hidden declaration that no pairs exist. Repetition and clustering require
successor Profile carriers, or the first slice must omit those projected facts for R3
and consequently narrow its claim. No schema-only inference closes the gaps.

Counterexample: two designs can both truthfully declare “independent one-way” at the
stated analysis-unit level while one contains repeated technical readings within each
unit and the other contains one reading per unit. D0 has no field that distinguishes
them. Likewise, absence of a cluster field cannot distinguish no clustering from an
omitted cluster structure.

### 4. D0 per-analysis population membership

**DEDUCTION.** A D0 analysis can yield the narrow status
`all_record_observations` only if all of these prerequisites are owned and accepted:

1. the selected analysis is bound explicitly by stable identity to the exact selected
   Contract and dataset/design; never choose the first or last array entry;
2. dataset observation identifiers and population identifiers are unique, known and
   compared as sets rather than by order;
3. the population set equals the complete supplied-dataset observation set, with no
   extras or duplicates; and
4. the owning Profile has already accepted all relevant unit/group coverage and the
   intended one-observation-per-unit constraint.

The free-text population `definition` is opaque. If membership differs, the current
D0 surface does not support the R5 family rather than silently converting the result
to a status whose admissibility it never defined. These semantics require an accepted
successor or owner-reviewed mapping; R5 should not invent them.

Counterexample: `analyses[0]` names all 30 observations while `analyses[1]` names 24.
Selecting by array position yields opposite status values after harmless reordering.
Only exact selected-analysis identity plus set equality is deterministic.

### 5. Pair-identity inapplicability for independent families

**PROPOSED CONVENTION.** Emit an explicit applicability state such as “not applicable
under mapping M for Profile P,” and cite the relationship carrier that justifies it.
Do not emit `false`, `absent` or a fabricated pair identifier. For ITGC, the mapping
can be conditioned on the accepted `independent_groups` and `pairing: none`
declarations. For D0, owner review or a successor carrier is needed because the
surface has no dedicated pairing declaration.

Counterexample: Dataset A is truly independent and correctly has no `pair_id`.
Dataset B is matched-pair data whose producer omitted `pair_id`. Both have the same
field absence. Treating absence as “not applicable” makes the error in B disappear.

### 6. Supplied-dataset-wide outcome access

**SOURCE FACT:** Nosek and ICH E9 support the narrower distinction between decisions
fixed before relevant outcome knowledge and decisions made after it, using stronger
planning or record mechanisms in their domains. Rasch et al. show a concrete same-data
two-stage procedure whose combined operating characteristics require direct analysis.
None of these sources establishes the proposed R5 dataset boundary as a universal
scientific standard.

**PROPOSED CONVENTION:** the supplied-dataset-wide boundary is coherent and
conservative if “supplied dataset” is bound to an exact dataset/Record revision and
the access statement covers the whole selected tuple and all mapped declarations.
Outcome access includes later-excluded rows and values placed in a selector system's
input context even if no human displays them. A post-access change disqualifies
`pre_outcome`, including when the original bytes are restored. Use `unknown` whenever
the producer cannot supply either covered timing assertion.

Access to a different dataset is outside this narrow affirmative claim. The report
must state that limit because related or prior data may still influence a choice.
The convention establishes a portable declaration boundary, not absence of all
outcome influence and not preregistration.

Counterexamples:

- A producer sees the outcome for a row later excluded. A subset-only rule would call
  the selection pre-outcome; the proposed whole-supplied-dataset rule calls it
  post-outcome.
- A selector API receives the outcome column but its user interface hides it. The
  system context has access, so the proposed rule calls it post-outcome even though a
  human did not look.
- A producer changes a declaration after access and restores the old text. The final
  bytes match a pre-access Record, but the proposed history-sensitive meaning is
  post-outcome and cannot be verified from those bytes.
- A producer uses outcomes from a different dataset. The narrow enum might still be
  `pre_outcome` for the supplied dataset, which shows why the non-claim about other
  data is necessary.

### 7. Record-only timing verification

**DEDUCTION.** A Record-only verifier can establish required presence, lack of a
schema default, lexical enum validity, exact binding fields that the eventual schema
actually supplies, and consistency between Record and report. It cannot establish
truth, selector/declarant identity, authentication, authorization, timestamps, prior
versions, restoration history, actual access or access to other datasets. `post_outcome`
and `unknown` are reportable facts and are not structural failures unless a separately
reviewed owning Profile imposes a narrower rule.

Counterexample: a producer writes `pre_outcome` after seeing every value. The field is
present, valid and report-consistent; all Record-only checks pass. Only evidence outside
the field can challenge its truth.

## 7. Explicit mapping dispositions

`ADVANCE` below means advance only to an unissued, explicitly conditional draft
mapping and fixtures. It does not mean accepted support. Predecessor family acceptance
is an admission and design-freeze prerequisite, not a prohibition on preparing that
conditional draft while the owning decision remains pending. No draft mapping becomes
applicable until its named Contract, Profile and bundle surfaces are separately
accepted.

| Projected fact                       | Independent two-group / ITGC 0.2                                                                                                                                                                                                                                 | Paired two-condition / R2 candidate                                                                                                                  | Independent multi-group / R3 D0                                                                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Outcome type                         | **ADVANCE:** map exact constant `continuous`; report source path.                                                                                                                                                                                                | **CONDITIONAL ADVANCE:** draft the same bounded constant; admission waits for R2 acceptance.                                                         | **CONDITIONAL ADVANCE:** D0 constant is structurally mappable, but admission waits for an accepted successor.                                                |
| Experimental-unit structure          | **ADVANCE AFTER REPAIR:** opaque label plus declared observation-to-unit IDs; no label classification.                                                                                                                                                           | **ADVANCE AFTER REPAIR:** same, while keeping unit and pair identity distinct.                                                                       | **ADVANCE AFTER REPAIR:** opaque definition plus explicit unit/group links; no semantic parsing.                                                             |
| Independent/paired relationship      | **ADVANCE:** preserve `independent_groups` and `pairing` separately; consume admissibility.                                                                                                                                                                      | **CONDITIONAL ADVANCE:** preserve `paired_two_condition` and pair-independence declarations separately; admission waits for R2 acceptance.           | **CONDITIONAL ADVANCE:** draft the compound mapping without turning R5 into a classifier; admission waits for the owning successor.                          |
| Group/condition count                | **ADVANCE:** count declared `groups`, exactly two after owning checks.                                                                                                                                                                                           | **CONDITIONAL ADVANCE:** count declared `conditions`, exactly two; do not count pairs; admission waits for R2 acceptance.                            | **CONDITIONAL ADVANCE:** count declared groups and preserve the flattened-design dependency; admission waits for the owning successor.                       |
| Pair-identity presence               | **ADVANCE AFTER REPAIR:** explicit `not_applicable` mapping derived from accepted independent grouping plus `pairing: none`; never from absent `pair_id`.                                                                                                        | **CONDITIONAL ADVANCE:** presence comes from observation `pair_id`; complete-pair judgment remains Profile-owned; admission waits for R2 acceptance. | **PROFILE SUCCESSOR OR OWNER-RATIFIED APPLICABILITY MAPPING:** a conditional draft may state the open choice, but no absent-field default is allowed.        |
| Repeated structure                   | **ADVANCE AFTER REPAIR:** preserve exact enum; `present` remains an owning-admissibility blocker.                                                                                                                                                                | **CONDITIONAL ADVANCE after vocabulary repair:** preserve `none` versus valid `within_pair_only`; admission waits for R2 acceptance.                 | **PROFILE SUCCESSOR OR NARROW SCOPE:** a conditional draft may capture the gap, but D0 has no carrier and compound declarations are insufficient.            |
| Clustered structure                  | **ADVANCE:** preserve exact enum and the distinction between `none_declared` and proof of absence; consume admissibility.                                                                                                                                        | **CONDITIONAL ADVANCE:** preserve the enum separately from pair independence; admission waits for R2 acceptance.                                     | **PROFILE SUCCESSOR OR NARROW SCOPE:** a conditional draft may capture the gap; no inference from `independence_declared` or absence.                        |
| Analysis-population status           | **ADVANCE:** preserve the exact status enum; it is not a population identity.                                                                                                                                                                                    | **CONDITIONAL ADVANCE:** preserve the same limitation; admission waits for R2 acceptance.                                                            | **PROFILE SUCCESSOR/OWNER REVIEW REQUIRED:** conditionally draft only `all_record_observations` under exact binding and set equality; otherwise unsupported. |
| Selection timing (non-Profile input) | **ADVANCE AFTER REPAIR for all three families:** required closed enum, no default, exact revision/dataset/tuple binding and outcome-specific report handling. Where available after conformance, its claim remains a producer-supplied but unproved declaration. | Same disposition.                                                                                                                                    | Same disposition.                                                                                                                                            |

The R3 cells with carrier gaps cannot participate in a claim that every supported
family supplies one Profile-owned truth carrier for every listed fact until a
successor fills the gap or the common fact set is narrowed.

## 8. Additional counterexamples for the draft fixture set

| Case                     | Construction                                                                                  | Required result                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Unit-label ambiguity     | Same label `mouse`; assignment is by mouse in one Record and by cage in another.              | No scientific classification from the string.                                      |
| Replication ambiguity    | Same ten outcome rows represent ten independently treated units or five units observed twice. | Values and row count do not determine repetition or effective replication.         |
| Repetition collision     | ITGC `present` and R2 `within_pair_only` both collapse to Boolean true.                       | Common mapping must retain source-scoped meanings.                                 |
| Four-group ambiguity     | Four one-way levels versus four cells of a 2-by-2 factorial.                                  | Count is evidence, not a family classifier.                                        |
| Analysis-array ambiguity | Two D0 analyses have full and subset populations; array order is reversed.                    | Mapping must bind exact selected analysis; first/last is invalid.                  |
| Pair absence ambiguity   | Independent data and matched data with omitted IDs both lack `pair_id`.                       | No default from absence; explicit applicability required.                          |
| Timing-history ambiguity | Final bytes match, but one tuple was changed after outcome access and restored.               | Record-only verifier reports the declaration, not history truth.                   |
| Selector-context access  | Outcome column entered an automated selector although no human viewed it.                     | `post_outcome` under the proposed convention; verification cannot prove the event. |
| Excluded-row access      | Outcome viewed for a row later excluded.                                                      | `post_outcome` under the proposed whole-dataset convention.                        |
| Other-dataset access     | No supplied-dataset outcome seen, but a related dataset's outcomes influenced the choice.     | May remain `pre_outcome` only under the narrow definition; report the non-claim.   |
| Multiple valid Contracts | Two accepted Contracts consume the same declarations and each yields a consistent report.     | Both may pass; neither pass endorses the private choice.                           |

## 9. Earlier claims changed or preserved

### Preserved, with scope

- The prior result's central distinction between experimental units and observations,
  and between independent and within-unit repetition, is supported by Hurlbert, Lazic
  and ARRIVE within their stated domains.
- Design relations cannot be recovered from values, row order or labels. This remains
  a logical conclusion supported by the constructed counterexamples.
- A check can validate declared structure and identity consistency without asserting
  scientific truth. The non-claims remain necessary.
- A bare timing declaration is weaker than preregistration, lineage or trusted time
  evidence. Nosek and ICH E9 strengthen that distinction.
- The two-group/multi-group count boundary is a bounded Protocol convention, and a
  four-group count does not by itself distinguish one-way from factorial structure.

### Changed or narrowed

- The prior Q6 statement that choosing a procedure after inspecting the same data,
  “including by a preliminary test,” invalidates the nominal error rate is too broad.
  Rasch et al. establish operating-characteristic problems for the specific combined
  two-sample procedures and simulation conditions they study. Zimmerman (2004) was
  not inspected. No universal method-selection theorem is established here.
- The prior Zimmerman (1997) attribution about the exact consequences of correlation
  remains unconfirmed. General within-unit dependence is supported independently by
  Lazic, but that does not close the article-specific claim.
- Clinical planning and reporting practices in ICH E9 are preserved only as
  clinical-trial guidance. They do not establish the proposed R5 enum as a general
  scientific rule.
- “Successful selection” should be replaced by language describing projection and
  declaration consistency. Exact tuple identity plus non-claims cannot make a pass an
  endorsement when multiple Contracts are valid.
- The proposed common repeated-structure fact cannot be a Boolean, and R3 D0 cannot
  supply all listed common facts from its current compound declarations.

## 10. Repairs, holds and bounded recommendation

The following repairs are prerequisites for the bounded next design step:

1. define source-qualified repeated-structure values so ITGC `present` and R2
   `within_pair_only` do not collapse;
2. define an explicit applicability representation for pair identity, tied to exact
   Profile and mapping identities;
3. keep unit labels/definitions opaque and project only separately declared structural
   links;
4. obtain an R3 Profile successor for repetition and clustering, or remove those R3
   projections and narrow the common-coverage claim;
5. give R3 population mapping an exact selected-analysis identity and owner-reviewed
   set-equality semantics, or mark it unsupported;
6. report group count without treating it as method or scientific-family selection;
7. bind the timing enum to exact Record revision, supplied dataset and complete
   decision tuple; define the later-excluded-row, selector-context and restoration
   cases; and state the other-dataset non-claim;
8. define outcome-specific report evidence: a pass carries the complete projection,
   exact mapping/tuple/dependency evidence, timing declaration and non-claim reference;
   dependency-blocked `not_run` carries only the actual blocking dependency evidence,
   readable timing already obtained and non-claim reference, with no projection; an
   execution error retains only evidence actually acquired; and a conformance failure
   produces no R5 projection or fabricated timing, tuple or dependency evidence; and
9. remove endorsement-bearing “successful selection” language from the check and
   evidence descriptions.

Remaining holds and reopening conditions are:

| Hold                                  | Closure condition                                                                                                                                                                                       | Blocks                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Zimmerman (1997) content              | Obtain full text; record artifact identity and inspect the exact correlation/paired-versus-independent claim and limitations.                                                                           | Use of that article's exact claim; design freeze while it remains named decision support.  |
| Zimmerman (2004) content              | Obtain full text; inspect procedure definitions, evaluated conditions, results and limitations.                                                                                                         | Use of that article's exact claim; any general preliminary-test conclusion.                |
| Lazic/Rasch/Nosek byte pins           | Retain stable full-text artifacts and record SHA-256, or record a steward-approved reproducible archive identity.                                                                                       | Exact artifact reproduction, not the bounded content disposition above.                    |
| R3 carrier gaps                       | Accepted owner successor for repetition, clustering and any necessary pair applicability, or an expressly narrowed common fact set.                                                                     | R3 participation in the full common-projection claim.                                      |
| R3 population semantics               | Accepted selected-analysis binding and set comparison, including dataset scope and failure cases.                                                                                                       | R3 population-status projection.                                                           |
| Timing semantics and evidence         | Owner decision on the exact convention, schema binding, report behavior and non-claims.                                                                                                                 | Design freeze and any claim stronger than presence/consistency.                            |
| Multiple-Contract wording             | Consistency-only check name/meaning and explicit no-endorsement language.                                                                                                                               | A fair design review once a family has multiple valid Contracts.                           |
| Existing family issuance dependencies | Separately accepted successor Contract/Profile/bundle surfaces for each participating family. Conditional unissued mapping work may precede those decisions, but cannot imply applicability or support. | R5 admission and design freeze for the affected family, not conditional draft preparation. |

Reopen the scientific mapping when a new family changes unit hierarchy, repetition,
clustering, factor structure or outcome-access scope; when a second Contract introduces
a new declared selection basis; when either blocked Zimmerman source changes a claim;
or when lineage, attestation or external time evidence enters the supported surface.

The final disposition is **`PROCEED_AFTER_REPAIR`** for an **unissued mapping and
report-schema draft plus counterexample fixtures only**. This report does not close
`R5-RH-1` in full, approve the RFC, close a gate, start or reset an RFC clock, or
authorize adoption, issuance, implementation, runtime support or release. The steward
must assess this separately attributable result and the remaining holds.
