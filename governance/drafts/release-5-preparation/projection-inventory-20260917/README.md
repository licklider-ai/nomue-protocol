# Release 5 projection source inventory

Status: informative, unissued preparation during public discussion, 2026-09-17.
Base: `a24958e1107cc75ecf189eb0176691357812a6ba`.
This packet advances R5-P3/P5/P6 preparation; none of those gates closes.
It defines no new public field, identifier, mapping version or supported bundle.

## What is concrete now

[inventory.json](inventory.json) records 24 family/fact cells across the three
proposed families. Repeated and clustered structure are inventoried separately
within the RFC's combined category. Each located source has an exact schema JSON
Pointer, its existing fragment and a descriptive instance path. Twelve input
files, including the frozen RFC, research result and historical owners, are pinned
by SHA-256. These pins supplement their repository identity, not replace it.

Run from the repository root:

```sh
node governance/drafts/release-5-preparation/projection-inventory-20260917/check.mjs
```

The check fails on changed pinned source bytes, missing schema pointers or changed
fragments. It checks the inventory's family/fact coverage and retained blocked
admission state. It does not validate Records, resolve scientific meanings, check
schema conformance, run projections or prove that a mapping is complete.
The descriptive paths using `[]` are not executable JSON Pointers. Schema pointers
resolve within their named schema document and point at the located evidence,
not necessarily at the complete enclosing required-field constraints.

## Findings requiring explicit disposition

| Finding                                                | Exact repository observation                                                                  | Consequence for preparation                                                                                                                                                              |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repetition is not one interchangeable Boolean          | ITGC permits the declaration values `none`/`present`; R2 permits `none`/`within_pair_only`    | Preserve the difference. A common output vocabulary needs an explicit mapping and independent semantic review before freeze. A generic repeated=true rejection would add a new judgment. |
| Pair identity and pairing declaration differ           | ITGC has a pairing enum but no pair-ID field; R2 has observation `pair_id`                    | Never invent a pair identifier or turn an absent field into a declared absence. Decide the inapplicable independent-family case explicitly.                                              |
| R3 has no dedicated repetition/clustering/pairing enum | D0 has independent-one-way, independence and not-flattened declarations                       | These may constrain meaning, but their combination is not already an issued R5 mapping. Decide whether reviewed mappings suffice or the owning Profile needs successor declarations.     |
| Population status is represented differently           | ITGC/R2 have a status enum; D0 carries per-analysis definition and observation IDs            | Do not copy an identifier into a status slot. Any membership-to-status derivation needs exact set semantics and explicit analysis binding.                                               |
| R3 timing is a different source concept                | D0 has several selection objects with `before`/`after`/`not_declared`                         | These do not establish the R5 aggregate decision covering every identity and projected declaration, supplied-dataset access and later edits. No automatic rename to R5 timing values.    |
| R3 has multiple analyses                               | D0 has `analyses[]` and analysis-specific populations and selections                          | Bind the projection to exactly the selected analysis through the accepted family surface. Never choose the first or last array element.                                                  |
| Contract identity is conditional in all families       | Issued ITGC has `method_id`; R2 has an unissued `contract_id`; D0 has unissued `contract_ref` | None of these three source documents currently admits an R5 combination. A D0 reference string is not proof of an accepted Contract or bundle.                                           |

These are source observations and candidate-design questions, not newly established
scientific results. The opening proposal already requires explicit mappings and
accepted successors; this packet exposes where that requirement needs work. It
does not change the opening question or its discussion clock.

## Family reconciliation

- **Independent two-group:** locate sources in ITGC 0.2. Its existing legacy
  numerical support remains distinct from the missing explicit successor Contract
  carrier and R5 timing representation.
- **Paired two-condition:** use the exact unissued R2 candidate as a preparation
  input. R2 adoption and any R5-aware successor acceptance remain separate.
- **Independent multi-group:** use D0 as a structural exploration input, not an
  accepted Profile or production Record. The supplied-p Holm candidate in PR #330
  is a different operation; it does not substitute for a raw-outcome multi-group
  family or discharge this dependency.

The common check consumes the owning Profile's admissibility result. Group count,
labels and repeated experimental-unit IDs do not independently select or classify
a scientific method. Four groups alone never establish that a design is one-way.

## Candidate authority work, ordered by dependency

| Work                  | Concrete next output                                                                                                                         | Required owner or gate                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Common meanings       | Review each row's semantic transformation, especially repeated structure, unit structure and population status                               | Research addendum plus owning Profiles; R5-P2/P3                            |
| Mapping specification | One versioned table per accepted Profile version with source path, transform, applicability and report evidence                              | New cross-cutting specification, prospective placement under `spec/`; R5-P5 |
| Identity and timing   | Compose family identity carriers; specify only the R5 timing addition and its evidence use                                                   | Accepted family successor plus successor Record surface; no duplicate IDs   |
| Dependency behavior   | Exact admissibility dependency, blocked/error behavior and mapping-failure handling                                                          | Public-check specification and later registered check version               |
| Report encoding       | Bind Record revision, analysis, Profile/mapping versions, actual values, source paths, dependency outcome, timing and eleven-item non-claims | Successor report schema and corresponding reason codes                      |
| Bundles and migration | Exact new combinations and unchanged prior bundle allow-lists                                                                                | Bundle registry and historical-preservation evidence                        |

No public schema path, Requirement ID, check ID or reason-code spelling is allocated
here. A machine-readable draft of the output vocabulary waits for disposition of
the above semantic questions. Preparation scripts remain in this informative
packet; implementation of a public checker belongs in nomue-verifier under the
repository's implementation-ownership policy.

## Verification cases and research handoff

[verification-cases.md](verification-cases.md) gives concrete inputs to construct,
the expected ownership boundary and the evidence to retain. They are planned
acceptance cases, not executed conformance fixtures.
[research-addendum-handoff.md](research-addendum-handoff.md) narrows the independent
investigation to the open source hold, Q11–Q14 and the mapping questions exposed
here. Existing independent results remain immutable; the author does not claim to
close their source-access hold.

## Independent addendum received

[The separate-model research addendum](independent-research-addendum.md) answers
Q11–Q14 and the seven inventory questions against the fixed inventory commit.
[The coordination intake](research-intake.md) records preparation directions and
remaining source/mapping holds. R5-P2 remains PARTIAL; the source audit and this
research recommendation do not issue a mapping or admit a family.

## Report integration follow-up

[The report and registry follow-up](report-surface-followup.md) locates the
closed result-evidence definitions, the four-result R2 candidate report,
identifier-validator migration and family-specific dependency binding work.
It adds six planned integration cases to the original 31; none is an executed
R5 conformance fixture. Its observations are author-side technical inspection.

## Conditional design drafts and source completion

[The conditional mapping draft](conditional-mapping-draft.md) supplies per-family
source and transformation tables for all 24 cells, including explicit R3 carrier
gaps. [The Record/report draft](record-and-report-draft.md) proposes composition,
family-specific dependency entries and outcome-dependent evidence. Both are
unissued prose designs, with timing cardinality and other new choices reserved
for review; neither is an executable mapping or accepted schema.

[The primary-source completion request](primary-source-completion-request.md)
prioritizes full-text review of the two unread Zimmerman works, followed by
reproducible copies of three already-read sources. It is ready to give to a
researcher and does not require a ResearchGate account from the steward.

## Bounded design follow-up while sources are pending

[The decision-binding proposal](decision-binding-proposal.md) specifies the
proposed per-analysis timing unit and a mapping reference qualified by an existing
check identity and local table key. [The case specifications](case-specifications.md)
expand all 37 existing cases into controlled inputs, expected boundaries, evidence
and outstanding prerequisites. These are proposed designs and handwritten plans,
not accepted schemas or executed R5 tests. The retained
[independent diff review and repair confirmation](bounded-design-diff-review.md)
resolved two case-definition findings and one coverage improvement. No outstanding
blocker or should-fix remains for retaining this informative increment. This work
now pauses for source findings and the already named owner decisions; no further
schema or runtime work is authorized by this packet.

## Review and gate effect

The [2026-09-24 source-receipt reconciliation](../../source-reconciliation-20260924/R5-RECONCILIATION.md)
matches all five supplied artifacts to the retained completion-review branch and
provides bounded claim pinpoints. Read it alongside the historical access holds;
custody, review qualification and acceptance remain pending. No gate changes.

The source inventory has 12 pinned inputs, 24 family/fact cells and 36 schema
fragments. Source validation succeeds. An author-side review checked that no new
authority asset or old bundle changes; every family remains blocked; no R3 timing
alias or implicit absent-field default is encoded; and planned cases are not
reported as passing runtime tests. Four controlled corruptions (source hash,
schema pointer, expected fragment and family admission) were rejected by the
inventory checker in disposable copies.

R5-P2 remains PARTIAL; R5-P3/P5/P6 remain OPEN; R5-P7 remains PROVISIONAL. P1/P4
retain opening preparation and P8 retains its opening-only closure. This packet
does not close numerical or methodological review or authorize implementation.

Prepared with OpenAI Codex assistance in the continuing coordinator context.
This is source inspection and reversible preparation, not an independent primary-
source review. The source and review limitations are material to later reuse.
