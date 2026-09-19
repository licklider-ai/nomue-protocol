# Release 5 conditional mapping draft

Status: unissued, informative design proposal, 2026-09-17. This is a conditional
prose draft permitted by the independent addendum, not an accepted mapping or an
executable projector. Its inputs are fixed at
`2b8b6a829b4bc25d7cb8bed75d63af602360eaa6`. R5-P2 remains PARTIAL and all
three families remain blocked pending separately accepted successors. No public
identifier, Requirement ID, enum spelling or schema version is allocated here.

## Reviewable design choice

Use one mapping definition per exact participating Profile version. Resolve it
from an accepted bundle/check configuration, not a producer-supplied mapping URL,
field-name matching or a version-range lookup. A mapping revision owns a fixed
ordered list of eight fact cells, each with an exact source rule, an output meaning
and an applicability rule. Timing is separate from those eight Profile facts.

A fact cell can be a compound of distinct, named subfacts. Each subfact has one
Profile-owned carrier; the mapping does not create two stores of the same fact or
pick between competing carriers. Source-qualified values retain their owning
Profile meaning. They are not a newly inferred scientific classification.

Before a mapping applies, the exact family Record and Profile schemas, selected
Contract identity, bundle and required admissibility check must all be accepted.
Historical ITGC 0.2, the R2 candidate and R3 D0 below are source references for
preparation only. The final mapping names the exact accepted successors and is
rechecked against their actual bytes. No pointer in this draft grants admission.

## Candidate transformation operations

These are prose operation descriptions, not registered operation names or code.

| Operation                | Candidate meaning                                                                                     | Excluded shortcut                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Exact copy               | Retain the declared scalar without parsing its scientific meaning                                     | No label classification, case folding or enum synonym                                         |
| Source-qualified copy    | Retain the declared scalar together with its exact source/meaning reference                           | No common Boolean replacing different meanings of repetition                                  |
| Declared cardinality     | Count elements in the named, owning-validated design collection                                       | No count from outcome values, distinct labels or pair count                                   |
| Structured linkage       | Expose the declared label and ID-linkage components as distinct subfacts                              | No assertion that IDs prove real independence or correct assignment                           |
| Explicit inapplicability | Emit a reviewed applicability result justified by the owning relationship declarations                | No inference from an absent pair-ID field                                                     |
| Conditional set equality | A proposed R3 owner-approved transform from one analysis's declared membership to a population status | No free-text inference, row-order selection, duplicate erasure or fabricated subset semantics |

The proposed output representation separates applicability from value. An
inapplicable fact has an explicit applicability result and its declared basis;
it does not have a fabricated value such as an absent pair identifier. An
applicable fact has its actual value. These mutually exclusive alternatives are
candidate report-schema requirements; their JSON field and enum spellings remain
open. A carrier gap is a blocked design dependency, not a third successful result
that a producer may use to bypass a required fact.

## Exact source tables

The paths below are descriptive instance paths matching
[inventory.json](inventory.json); `[]` denotes a collection, not an executable
JSON Pointer. The final report resolves actual source instances to concrete
pointers within the exact Record revision. The source schema and schema pointer
for every located carrier remain in the pinned inventory. All rows below depend
on owning conformance and admissibility; none repeats those judgments.

### Independent two-group source: ITGC 0.2

| Fact                        | Source path                                                                                    | Conditional transform and evidence                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Outcome type                | `payload.design.outcome.scale`                                                                 | Exact copy of `continuous`; retain concrete source pointer                                                                          |
| Experimental-unit structure | `payload.design.experimental_unit_type`; `payload.dataset.observations[].experimental_unit_id` | Opaque label plus observation-to-unit linkage components; copy declared links, not an inferred unit category                        |
| Relationship                | `payload.design.declarations.grouping_structure`; `payload.design.declarations.pairing`        | Retain grouping and pairing as separate declared subfacts; admissibility owns contradictions                                        |
| Group count                 | `payload.design.groups`                                                                        | Collection cardinality; owning validation supplies the exactly-two constraint                                                       |
| Pair-identity presence      | `payload.design.declarations.grouping_structure`; `payload.design.declarations.pairing`        | Proposed explicit inapplicability under admitted independent grouping and `pairing: none`; the absent pair-ID field is not evidence |
| Repeated structure          | `payload.design.declarations.repeated_measurements`                                            | Source-qualified copy; `present` remains the owning check's blocker and yields no successful R5 projection                          |
| Clustered structure         | `payload.design.declarations.clustering`                                                       | Source-qualified copy; `none_declared` is a declaration, not proof of absence                                                       |
| Population status           | `payload.design.data_handling.analysis_population`                                             | Copy the existing status enum; no population identifier or newly inferred exclusion policy                                          |

A successor must first supply an accepted Contract carrier. The existing
`payload.analysis.method_id` never becomes its alias.

### Paired two-condition source: R2 candidate

| Fact                        | Source path                                                                                       | Conditional transform and evidence                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Outcome type                | `payload.design.outcome.scale`                                                                    | Exact copy of `continuous`                                                                                                                    |
| Experimental-unit structure | `payload.design.experimental_unit_type`; `payload.dataset.observations[].experimental_unit_id`    | Opaque label and declared observation-to-unit links; keep experimental-unit and pair identity distinct                                        |
| Relationship                | `payload.design.declarations.grouping_structure`; `payload.design.declarations.pair_independence` | Retain paired-two-condition grouping and declared independence between pairs as distinct subfacts                                             |
| Condition count             | `payload.design.conditions`                                                                       | Count conditions; two conditions remain two regardless of the number of pairs                                                                 |
| Pair-identity presence      | `payload.dataset.observations[].pair_id`                                                          | Applicable: presence is backed by each required pair-ID carrier in the owning scope; consume complete-pair admissibility rather than rerun it |
| Repeated structure          | `payload.design.declarations.repeated_measurements`                                               | Preserve `none` versus `within_pair_only`, qualified by the paired Profile; do not reinterpret the latter as ITGC `present`                   |
| Clustered structure         | `payload.design.declarations.clustering`                                                          | Preserve the declared enum independently of pair-independence evidence                                                                        |
| Population status           | `payload.design.data_handling.analysis_population`                                                | Copy the status enum, with its owning admissibility result                                                                                    |

R2 adoption alone does not add timing, an R5 check, or an R5 report. R5 participation
also needs accepted R5-aware successors. The draft Contract carrier at
`payload.analysis.contract_id` is an input to predecessor reconciliation, not an
issued identifier merely because it is present in that candidate.

### Independent multi-group source: R3 D0

| Fact                        | Source path or gap                                                             | Conditional transform and unresolved owner work                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Outcome type                | `dataset.scale_declaration`                                                    | Draft exact copy of `continuous`; final pointer depends on accepted Record composition                                                                                               |
| Experimental-unit structure | `design.experimental_unit_definition`; `design.units`                          | Opaque definition and declared unit-to-group links; any observation linkage exposed also needs an exact owned carrier in the successor mapping                                       |
| Relationship                | `design.kind`; `design.independence_declared`; `design.not_flattened_declared` | Retain the compound declarations as separate subfacts; no method-selection or factorial-classification algorithm                                                                     |
| Group count                 | `design.groups`                                                                | Count declared groups after owning checks; at least three in D0, and four alone does not establish a one-way design                                                                  |
| Pair-identity presence      | No dedicated carrier                                                           | Draft explicit independent-family applicability only after owner review of its precise declaration basis, or add the needed Profile-owned declaration; no default from field absence |
| Repeated structure          | No dedicated carrier                                                           | Proposed route: an owning Profile successor supplies the declaration; no projection while the carrier is missing                                                                     |
| Clustered structure         | No dedicated carrier                                                           | Proposed route: an owning Profile successor supplies the declaration; no projection from independence text alone                                                                     |
| Population status           | `analyses[].population.observation_ids`                                        | Conditional owner-reviewed set-equality transform for exactly the selected analysis, as specified below; free-text `definition` is not a status                                      |

This draft keeps the full eight-fact target and represents R3 as blocked until the
owner supplies the missing meaning. It does not silently reduce the public common
coverage to fit D0. Any future reduction is an explicit scope decision. Supplied-p
Holm support is not a substitute for this raw-outcome family.

For the proposed population transform, the owner first establishes unique,
known observation IDs, exact analysis/dataset/design binding, and the admitted
population rules. Equal membership sets may map to the narrow existing concept
`all_record_observations`; this is not proof that the dataset contains every
observation collected in the study. Unequal sets do not automatically map to the
ITGC subset enum: the R3 owner must define that status and its admissibility first.
Duplicate IDs are a validation failure, not an instruction to deduplicate silently.

## Selected-analysis binding and deterministic evidence

The family successor owns the selected analysis and its Contract relationship.
R5 adds no competing analysis or Contract ID to the Record. For a multi-analysis
Record, each check instance binds exactly one already identified analysis and the
correct admissibility scope. A dependency scoped to the whole Record remains
Record-scoped; it is not relabeled analysis-scoped. If the family surface cannot
identify the selected analysis unambiguously, it is not ready for this mapping.

Candidate determinism rules for review:

- Fact order follows the eight rows above; no iteration over arbitrary object keys.
- Collection-derived components retain source array order and concrete pointers.
  Stable analysis identity, not array position, determines the selected analysis.
- Reordering a source array may change pointers and the Record revision. Semantic
  membership can remain the same, but byte-identical evidence is not promised
  across different Record revisions. Runs on the same revision agree exactly.
- Source-qualified values are identified by the exact Profile/mapping definition;
  no new generic repetition or independence judgement is computed.
- Missing or competing required carriers invalidate the mapping or owning Record
  at its responsible stage. They never yield a default successful cell.

## Review conditions before schema promotion

The [independent addendum](independent-research-addendum.md) supports conditional
drafting after the identified repairs; it does not independently approve this new
draft. Review the applicability/value alternatives, compound ownership,
collection evidence, exact successor paths and R3 population semantics before
freezing them. Read the companion
[Record and report draft](record-and-report-draft.md) for outcome boundaries.
No executable mapping or candidate conformance expectation is introduced here.

Prepared with OpenAI Codex assistance in the continuing author context. Primary
research claims remain attributed to the independent addendum; this is a proposed
design response and requires review of its own concrete choices.
