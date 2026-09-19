# Release 5 report and registry integration follow-up

Status: informative author-side preparation, 2026-09-17. This document proposes
work boundaries, not field spellings, identifiers, accepted schemas or support.
Inspected baseline: `52e39c7a6cda4a2fdee89d0b8b22e068854f4852`, tree
`969d5d74b649c68ad069b62f90cc1ac366c05a1c`. All repository observations below
refer to those bytes. Scientific mapping dispositions belong to the separately
attributed research addendum and subsequent steward decision.

## Concrete schema dependencies

Paths in this section are repository-relative; pointers are JSON Pointers within
the named JSON document. These observations do not require scientific inference.

| Existing file                                                                                 | Inspected location                                                                                                                        | Observation and R5 consequence                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schemas/common/execution-outcome-0.2.schema.json`                                            | `/$defs/evidence`, `/$defs/checkResult`                                                                                                   | Evidence and result objects reject additional properties. Existing evidence has digest/numerical/declaration-mismatch fields, not the proposed R5 projection, mapping, timing or dependency evidence. A new report wrapper alone cannot extend the referenced closed definition. |
| `schemas/reports/verification-report-0.2.schema.json`                                         | `/properties/verification_results/items`, `/$defs/guaranteeBoundary`                                                                      | Results refer to the closed 0.2 definitions; the boundary has five fixed fields and rejects additional properties. The eleven-item R5 boundary needs explicit successor encoding, not extra properties injected into this historical schema.                                     |
| `schemas/reports/verification-report-0.2-draft-3.schema.json`                                 | `/properties/verification_results/items`, `/$defs/assertion/properties/rfc3161_timestamp`                                                 | Draft.3 still refers to the same result definitions. Its optional timestamp is on an attestation assertion; it is not the R5 selection-timing declaration. Attestation remains outside this R5 slice.                                                                            |
| `governance/drafts/release-2-candidate/schemas/verification-report-0.3.candidate.schema.json` | `/properties/verification_results`                                                                                                        | The unissued paired report fixes exactly four ordered results, each with exact check identity/version. Appending an R5 result would violate this candidate even if its other fields were acceptable. R2 acceptance would not itself accept an R5 report.                         |
| `governance/drafts/release-2-candidate/schemas/execution-outcome-0.3.candidate.schema.json`   | `/$defs/verificationCheckIdentity`, `/$defs/evidence`                                                                                     | The four check identities and closed evidence definitions are specific to R2. Reuse requires a separately accepted successor, not in-place expansion of a retained candidate.                                                                                                    |
| `schemas/meta/public-checks-registry.schema.json`                                             | `/properties/check_sets/items/properties/check_ids/items`, `/$defs/check/properties/check_id`, `/$defs/check/properties/depends_on/items` | Current patterns accept legacy check URNs. New issuance follows the HTTPS identifier policy. Reconcile the registry validator with the applicable accepted migration before an R5 entry can be registered. Do not mint a legacy ID to evade that work.                           |
| `registries/public-checks.yaml`                                                               | Dependency and pre-conformance scope comments; existing `depends_on` entries                                                              | Existing dependency propagation and scope fallback are reusable within their stated coverage. R5 needs exact dependency identity/version/scope binding for each accepted family combination. An analysis-scoped dependency from a different analysis cannot satisfy it.          |
| `registries/public-contract-surfaces.yaml`                                                    | Record, report and declaration surface entries                                                                                            | Public paths are tied to named schemas and exact bundle lists. New R5 surfaces need their own applicable successors and path-resolution evidence; existing bundle lists do not acquire R5 implicitly.                                                                            |
| `authority/authority-manifest.yaml`                                                           | `normative-meaning`, `json-structure`, `public-checks`, `public-contract-surfaces`, `vocabulary`, `conformance-judgment`                  | Proposed clauses, successor schemas and fixtures need explicit assignments to their existing subject owners. No selection-policy authority target is introduced.                                                                                                                 |

The identifier-validator observation is a cross-release integration prerequisite,
not a request to change all historical identifier grammars. Inspect and reuse any
accepted predecessor migration at integration time. The R2 candidate already uses
HTTPS check identities; its mere presence does not update the authoritative
registry validator or issue those checks.

## Ordered work items after semantic disposition

1. Fix each participating Profile version, selected-analysis binding and reviewed
   mapping. Identify any Profile-owned carrier additions before drafting Record
   composition. Retain the source inventory's blocked admission state until the
   separate family and R5 acceptance requirements are met.
2. Draft the successor result-evidence shape and its outcome-dependent completeness
   rules. Compose it into an explicit successor report. Keep the eleven-item
   non-claim list's meaning in the cross-cutting specification; specify how the
   report makes that exact version discoverable without implicit URI retrieval.
3. Define the successor Record's timing addition and composition with the family
   identity carriers. Reported consumed identifiers are evidence references; they
   do not create a second Record truth carrier.
4. Specify the new check's scope and applicable dependencies. Determine whether a
   shared check has bundle-specific dependency bindings or separately versioned
   family checks. The current registry's `depends_on` is a static list: do not
   list all three families and accidentally require all three on every Record.
5. Register accepted clauses, identifiers, schemas, surfaces and exact new bundle
   combinations together. Reconcile registry meta-schemas and generation tooling
   with accepted identifier changes. Keep legacy schemas and check sets pinned.
6. Implement the accepted checker in nomue-verifier, then consume the appropriate
   pinned public source according to repository policy. Execute new conformance
   cases and historical replay before claiming R5-P6 closure.

These are ordered preparation dependencies, not authorization to implement a
scientific mapping before Research Gate closure or to bypass public adoption.

## Evidence-state decisions to settle

The table separates boundaries already stated in the frozen RFC from unresolved
integration cases exposed by the inspected schemas and registry. The future
schema needs to settle the listed decisions; no result enum is introduced here.

| Situation                                                                 | Required preparation boundary                                                                                                                  | Exact unresolved encoding or decision                                                                                                             |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Record conformance fails                                                  | No projection or trusted analysis-local identity; use the existing pre-conformance scope convention where applicable                           | How successor reports carry the R5 non-claim boundary without trusting missing timing                                                             |
| Conformance passes; applicable admissibility blocks                       | No computed projection; retain acquired timing, exact blocking result and reasons                                                              | Encode dependency identity, version, scope and execution; blocked/error dependencies have no `outcome`, so do not fabricate one                   |
| Required dependency is indeterminate                                      | No unreviewed inference that indeterminate means pass                                                                                          | Establish applicability from the family's accepted check; if reachable, settle propagation explicitly rather than extending legacy rules silently |
| Projection check completes                                                | Bind projection values, exact source paths, mapping version, selected family identities, timing and dependency evidence to the Record revision | Closed evidence requirements per completed outcome; exact handling of incomplete or invalid registered mappings                                   |
| Projection execution errors                                               | Keep timing acquired at conformance and other actually acquired evidence; no fabricated projection or dependency result                        | Distinguish partial acquisition from complete projection evidence; preserve error/reason requirements                                             |
| Mapping is absent or its registered definition is internally inconsistent | Do not substitute a nearby mapping, infer defaults or blame a conforming Record for an implementation/configuration defect                     | Resolve unsupported-combination versus mapping-validation failure and responsible stage before assigning reason codes                             |

The existing registry describes propagation for fail, not-run and error. This
follow-up does not claim to change that rule or prove that every family can return
indeterminate. Applicability and unreachable outcomes are checked against each
accepted dependency before the new check is frozen.

## Additional planned integration checks

These six cases supplement the original 31 cases. They are not executed R5 tests
and their local labels are not issued conformance identifiers.

| Case | Counterexample                                                                           | Expected boundary before acceptance                                                                                    |
| ---- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| R01  | Append an R5 result to the retained four-result R2 candidate report                      | The historical candidate remains closed; a separately identified successor is required                                 |
| R02  | Add R5 timing or projection to legacy result evidence                                    | No widening of old evidence definitions or legacy bundle behavior                                                      |
| R03  | Use admissibility evidence from another analysis or Record revision                      | No dependency satisfaction across different subjects, even when outcome and check ID match                             |
| R04  | Block on a dependency whose execution is error or not-run                                | Retain execution and reasons without inventing an outcome; emit no computed projection                                 |
| R05  | Configure one shared R5 check with all three family checks as unconditional dependencies | Definition review rejects the unintended all-families requirement; exact accepted combination determines applicability |
| R06  | Register a newly issued HTTPS check in a legacy-URN-only validator                       | Resolve the accepted registry migration first; no invented legacy alias or historical schema rewrite                   |

Review of these cases checks requirements and ownership. It does not claim runtime
validation, schema compilation or scientific correctness. Full CI for an
informative preparation PR is likewise not evidence that future R5 behavior works.

## Gate and provenance effect

R5-P3/P5/P6 remain OPEN. Source evidence and a separate investigator's report may
advance P2 preparation, but no steward research acceptance is inferred here.
The public RFC question and its clock remain unchanged. New material semantic
findings are assessed through the established review process before freeze.

Prepared with OpenAI Codex assistance in the continuing author/coordinator
context. The schema observations are an author-side technical inspection, not the
separate primary-source research pass required by the Research Gate.
