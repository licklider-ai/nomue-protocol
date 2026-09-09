# Release 4: balanced two-factor marginal inference RFC candidate

Status: informative assembled proposal for independent pre-opening review.
Authority baseline: `0abdca8f822d0de3faf35f218f762a951fd75e9e`.
Not an opened RFC, issued namespace, supported bundle or implementation decision.
Repaired against PR 251 and PR 252; see the
[response and reconciliation](opening-rfc-review-response.md).
All choices below remain proposed and await fixed-input confirmation.

## Decision requested

Open public discussion of the bounded meaning and additive representation below,
with the enumerated numerical implementation holds. Candidate A contains four
fixed cells, equally replicated with n at least two, independent units and one
continuous outcome. Retain both main effects and the interaction in the full
model. Report signed estimates and three marginal upper-tail quantities under
the declared independent common-variance normal model.

Do not include confidence intervals, significance booleans, familywise/FDR
claims, causal/randomization assertions, historical-priority claims, unequal
cells, missing cells, mixed/random factors, clustered or repeated units,
covariates, transformations, imputation or software-selected models.
Exclusion is scope bounding, not a finding that other methods are invalid.

The [steward acceptance](normal-model-steward-acceptance-2026-09-09.md) accepts
this bounded evidence route and stages wider S1/S2/P1/S3/S4/S6 and S5 obligations
without their global closure. The [source result](normal-model-source-result.md)
separates the supplied paper's cited criteria from the independently verified
probability derivation. Its source review and repair confirmation are preserved.
A runtime comparison never establishes the truth of model assumptions.

## Candidate clauses and one-owner allocation

Every identifier below is a proposed allocation, not registered or issued.
At the baseline, BTF is absent from the Contract/Profile namespace registry,
and NRS-VERIFY ends at 0028. Recheck availability before allocation; reserve
nothing through this document. Register both namespace prefixes before issuing
any clause. Do not insert anchors or operative clauses into spec in this PR.
Each row supplies one proposed clause, with its single intended Requirement ID.
The contrast definitions below belong to BTF-0002; SS/SSE/df/F/tail
calculations belong to BTF-0005, which references those definitions.

| Proposed ID           | Proposed owner under spec/                            | Proposed clause text                                                                                                                                                                                                              | Tier          |
| --------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| NRS-CONTRACT-BTF-0001 | contracts/balanced-two-factor/design-and-estimands.md | Declare factor_order positions as A and B, level_order positions as 0 and 1, and cells in 00,01,10,11 order; use level-1 minus level-0 main contrasts. Level IDs are distinct within each factor, not necessarily across factors. | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0002 | contracts/balanced-two-factor/design-and-estimands.md | Define the three population contrasts and their sample estimates by the formulas below; retain the full four-column model in each individual-null calculation.                                                                    | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0003 | contracts/balanced-two-factor/admissibility.md        | Require four complete cells of the same integer count n at least two, one finite outcome per distinct declared experimental unit, and explicit membership in exactly one cell.                                                    | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0004 | contracts/balanced-two-factor/admissibility.md        | Define the inferential premises as independent normal errors of zero mean and one common strictly positive finite variance, with fixed cell means; declarations do not prove these premises.                                      | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0005 | contracts/balanced-two-factor/calculation.md          | Define exact mathematical estimates, SS, SSE, degrees of freedom, marginal F and tail as below, separately from numerical projection and supported execution.                                                                     | EXPERIMENTAL  |
| NRS-PROFILE-BTF-0001  | profiles/balanced-two-factor/declarations.md          | Bind the analysis to its exact Contract; require the boolean model_applicability_declared under design, admitting true and reporting false as unsupported, without redefining the Contract premises.                              | EXPERIMENTAL  |
| NRS-PROFILE-BTF-0002  | profiles/balanced-two-factor/non-claims.md            | Limit this new capability to the stated marginal model: no multiplicity control or post-quantization/conditional-on-admission calibration guarantee. Existing general non-claims retain their original owners.                    | EXPERIMENTAL  |
| NRS-VERIFY-0029       | verification/factorial-recompute.md                   | Bind BTF numerical comparison evidence to the exact result, contrast or cell, and quantity by the local evidence keys below; the existing distinct-check and non-aggregation rules retain their original owners.                  | EXPERIMENTAL  |
| NRS-VERIFY-0030       | verification/factorial-recompute.md                   | Bind BTF recomputation to finite parsed binary64 inputs, interpreted exactly for its mathematical target; execute only under registered version/domain/resource/projection/comparison rules. Unset rules supply no support.       | EXPERIMENTAL  |
| NRS-VERIFY-0031       | verification/factorial-recompute.md                   | Produce separate report evidence for the exact Record revision, bundle, check version and quantity; retain the existing execution/outcome invariant and applicable registered reason codes.                                       | STABLE-INTENT |
| NRS-CORE-0020         | core/balanced-two-factor-envelope.md                  | Bind the new closed Record envelope and payload to the exact Contract; contract_id is an opaque identifier and is never dereferenced. Preserve historical schema constants and payload meanings.                                  | STABLE-INTENT |

Proposed NRS-CORE-0021, owned by spec/core/balanced-two-factor-envelope.md
at STABLE-INTENT, binds the successor envelope to the existing exact
canonicalization identity, strict-input eligibility and domain-separated digest
procedure. Its content projection excludes exactly the root integrity member;
all scientific payload fields remain covered. This is an additive binding,
not a change to NRS-CORE-0006 or its historical schema scope.

The new contracts directory is a new layout convention: add spec/README.md
navigation and authority-manifest assignments in the eventual coupled change.
A directory does not acquire authority by name. Contract owns mathematical
meaning; Profile owns applicability declarations; schema owns JSON structure;
Public Check owns the versioned numerical procedure. No duplicate method ID.

## Exact quantities and hypotheses

Write m00,m01,m10,m11 for sample cell means and mu00,mu01,mu10,mu11 for fixed
population means. For any cell vector x define:

```text
A(x)  = (-x00-x01+x10+x11)/2
B(x)  = (-x00+x01-x10+x11)/2
AB(x) = x00-x01-x10+x11
Delta_j = j(mu); d_j = j(m)
SSA=n*d_A^2; SSB=n*d_B^2; SSAB=n*d_AB^2/4
SSE=sum_cell,sum_unit (Y_cell,unit-m_cell)^2
nu=4*(n-1)
F_j=nu*SSj/SSE, when exact SSE>0
p_j=integral from exact observed F_j to infinity of the F(1,nu) density
```

Under each null Delta_j=0 separately, the other contrasts and intercept remain
unrestricted. The accepted derivation gives the central F law under the stated
idealized model. The three ratios share SSE; no joint guarantee is implied.
Under -1/+1 coding, fitted coefficients are d_A/2,d_B/2,d_AB/4.
AB here is the full difference in differences; no external naming convention
changes that normalization. These exact identities do not select a runtime graph.

Exact SSE=0 gives no defined F or tail in this proposal, even though all input
values may be finite. Numerically unrepresentable or ambiguous quantities are
also not silently rounded into a scientific claim. Concrete machine disposition,
projection and check failure ordering remain the named numerical holds below.
A discussion of mathematical quantities does not authorize a producer or verifier
to emit undefined values, NaN, infinity, guessed tails or unregistered refusals.

## Candidate structure and versioned surfaces

All paths and strings in this section are proposals, not identifiers issued by
publication of this informative draft. The revision token is 0.1.0-draft.1 for
this new capability family, not an instruction to renumber historical Record
schema versions. All protocol-issued new strings use the adopted HTTPS grammar.
Existing canonicalization identity is reused exactly, without a new alias.

| Family         | Proposed exact identifier                                              |
| -------------- | ---------------------------------------------------------------------- |
| Contract       | `https://nomue.ai/id/contract/balanced-two-factor/0.1.0-draft.1`       |
| Profile        | `https://nomue.ai/id/profile/balanced-two-factor/0.1.0-draft.1`        |
| Record schema  | `https://nomue.ai/id/schema/record-balanced-two-factor/0.1.0-draft.1`  |
| Payload schema | `https://nomue.ai/id/schema/profile-balanced-two-factor/0.1.0-draft.1` |
| Report schema  | `https://nomue.ai/id/schema/report-balanced-two-factor/0.1.0-draft.1`  |
| Bundle         | `https://nomue.ai/id/bundle/balanced-two-factor/0.1.0-draft.1`         |

Check identities and versions will be proposed with closed numerical procedures;
no operational bundle can be registered using the incomplete check list here.
No old urn identifier is an alias of any proposed HTTPS identifier.

| Proposed file                                                                   | Shape and version decision                                                                                                                                                                    | Surface treatment                                                                                                                                    |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| schemas/record/record-balanced-two-factor-0.1-draft-1.schema.json               | New schema with the existing envelope member names, new schema/profile constants and a new closed payload reference. Existing record.schema.json and record-0.2.schema.json remain unchanged. | NRS-PCS-0001 additive applicability, schema_refs and successor binding; envelope field paths stay identical.                                         |
| schemas/profiles/balanced-two-factor-0.1-draft-1.schema.json                    | Closed dataset/design/analysis/result objects as specified below; no confidence-level or method_id alias.                                                                                     | New candidate NRS-PCS-0014 for BTF payload structure and NRS-PCS-0015 for BTF declarations/results, both STABLE-INTENT; old ITGC surfaces unchanged. |
| schemas/reports/verification-report-balanced-two-factor-0.1-draft-1.schema.json | New report schema with local check-result/evidence definitions, HTTPS checks and result-scoped quantity entries; same separate-artifact and execution/outcome invariants.                     | New candidate NRS-PCS-0016, STABLE-INTENT; old report surfaces 0007/0008/0011 unchanged.                                                             |
| schemas/reports/verifier-refusal-0.2-draft-3.schema.json                        | Reuse the current verifier-level refusal shape and routing stage unchanged.                                                                                                                   | NRS-PCS-0012 applicability receives an additive new bundle only when that bundle is registered.                                                      |
| schemas/routing/routing-envelope-0.2.schema.json                                | Reuse root object plus string interpretation_bundle_id with exact lookup and no fallback.                                                                                                     | NRS-PCS-0013 additive applicability only; no new routing schema.                                                                                     |
| canonicalization/record-canonicalization.md                                     | Reuse the exact JCS eligibility, canonical bytes, domain tag and digest procedure; no algorithm or normalization change.                                                                      | NRS-PCS-0006 additive applicability and new Record schema reference only.                                                                            |

Candidate PCS numbers 0014-0016 are absent at the pinned baseline and unreserved.
Their registry entries will bind the exact proposed Requirement IDs and resolve
paths against the new schema files. PCS-0014 covers dataset/design/analysis
structure; PCS-0015 covers design.model_applicability_declared and result;
PCS-0016 covers the new report. The assertion is not duplicated in PCS-0014.
A path sketch is not a validated schema.
The reference schema loader and registry validator are eventual tooling changes,
not external authority or permission to weaken validation.

Proposed payload member ownership:

- dataset: dataset_id and observations, each with observation_id,
  experimental_unit_id, cell_id and outcome_value. Unit and observation IDs are
  unique within this dataset; this does not prove physical independence.
- design: design_id, dataset_id, factor_order (two IDs), factors (objects with factor_id and level_order, an ordered pair of distinct
  level IDs), cells (objects with cell_id and levels, a two-element level-ID tuple), and
  model_applicability_declared. Tuple positions follow factor_order; cell labels
  never define order. The two factor IDs are distinct; factor_order names each
  exactly once. The four distinct cell IDs cover the Cartesian product of the
  declared levels exactly once. References resolve only within the declared Record.
- analysis: analysis_id, design_id, contract_id. Exactly the bound three
  contrasts are evaluated; no producer-selected model reduction or tail option.
- result: result_id, analysis_id, cell_summaries, residual_sum_of_squares,
  residual_degrees_of_freedom and contrasts. Each contrast has kind A/B/AB,
  signed_estimate, sum_of_squares, f_statistic and p_value. Require exactly one
  of each kind and four cell summaries with cell_id, n and mean, resolving
  each declared cell exactly once; no array-order pairing shortcut.

Structural number constraints, declaration treatment, zero-SSE representation
and result-scoped evidence are now proposed explicitly below. They are not
numerical holds. Final schema issuance still requires the remaining versioned
numerical support and comparison rules; this is not an implemented schema.

## Existing Requirement ID and strict-input crosswalk

No existing Requirement ID is superseded or has its meaning changed by this
proposal. Phase-specific clauses remain phase-specific; successor clauses and
new schemas carry the new capability. The following are compatibility constraints,
not in-place widening of Phase 1 or ITGC meanings.

| Existing owner                                                                          | Existing IDs                                                               | Required treatment                                                                                                                                          |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| spec/core/record-envelope.md                                                            | NRS-CORE-0003/0007                                                         | Retain old closed envelopes and constants; proposed CORE-0020 owns the new envelope.                                                                        |
| Same owner                                                                              | NRS-CORE-0004/0005                                                         | Preserve no dereference and immutable revisions; direct Contract identity obeys ID-POLICY/ADR-0032.                                                         |
| spec/core/integrity-model.md                                                            | NRS-CORE-0006                                                              | Preserve old projection; new envelope proposes the same exclusion of exactly integrity, with no unsigned scientific fields.                                 |
| canonicalization/record-canonicalization.md                                             | NRS-CANON-0007/0008/0014/0015/0023                                         | Preserve raw duplicate detection after escape decoding, scalar Unicode, lexical negative-zero rejection and pre-routing priority.                           |
| Same owner                                                                              | NRS-CANON-0001/0005/0016/0017/0018/0020/0021/0022 and NRS-VERIFY-0027      | Explicitly bind the successor to unchanged canonicalization identity and byte/digest rules; no reparsing or normalization shortcut.                         |
| spec/core/verification-principles.md                                                    | NRS-VERIFY-0001/0003/0004                                                  | Preserve scoped guarantees, scientific validity not_asserted and non-escalation.                                                                            |
| spec/verification/execution-outcome-model.md                                            | NRS-VERIFY-0010                                                            | Preserve completed/outcome versus not_run/error separation in the new report.                                                                               |
| spec/verification/verification-report.md                                                | NRS-CORE-0008; NRS-VERIFY-0011/0012                                        | Preserve separate report, exact revision/digest/bundle/check reference and reason-code obligations.                                                         |
| spec/verification/verifier-refusal.md                                                   | NRS-CORE-0011; NRS-VERIFY-0018; NRS-SEC-0004/0005                          | Preserve bundle-independent refusal and no partial success; do not map numerical zero SSE to a global safety refusal without separate justification.        |
| spec/core/versioning-principles.md and spec/versioning/multi-bundle-dispatch.md         | NRS-VERSION-0002/0005/0007/0008; NRS-CORE-0010; NRS-VERSION-0006           | Exact unsupported-tuple refusal, dispatch and historical conformance preservation.                                                                          |
| spec/versioning/interpretation-bundle.md and spec/versioning/public-check-versioning.md | NRS-VERSION-0003/0004/0009                                                 | New exact bundle and check versions; no inherited tolerance from nearby versions.                                                                           |
| spec/verification/public-checks.md                                                      | NRS-VERIFY-0005/0006/0007/0008/0009; NRS-CORE-0012; NRS-SEC-0002/0003/0006 | Preserve old integrity/ITGC checks, no executable Record code, and separate safety bounds from numerical accuracy; new numerical procedures get new checks. |

Schema conformance enforces representation; a declaration-admissibility check
handles structurally representable unsupported designs; a numerical check handles
its registered computability domain. NRS-VERIFY-0013 already requires
admissibility and computability to be distinct
checks, not just labels in one check. NRS-VERIFY-0017 already requires failed
admissibility to block dependent computability/recomputation with execution
not_run and the blocking reason. Integrity has no admissibility dependency.
Only the concrete new check graph, ordering within that graph and remaining
numerical reason assignments are open. Global pre-routing ordering is fixed.

## Supplemental bindings and exact representation decisions

The following proposed clauses bind the new capability, rather than editing or
reissuing the old phase-qualified rules. All IDs are unissued candidates.

| Proposed ID          | Proposed owner under spec/                     | Proposed clause text                                                                                                                                                                                               | Tier          |
| -------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| NRS-PROFILE-BTF-0003 | profiles/balanced-two-factor/representation.md | Bind all payload numbers, required result members and undefined-result exclusions to the representation rules below; no distinct negative-zero meaning.                                                            | STABLE-INTENT |
| NRS-PROFILE-BTF-0004 | profiles/balanced-two-factor/representation.md | Bind the BTF result/analysis/design/dataset and observation/cell chain through exact local references below, with Contract identity rather than a method alias.                                                    | STABLE-INTENT |
| NRS-VERIFY-0032      | verification/factorial-recompute.md            | Bind the new check set to independent integrity checking and to execution of registered procedures only, never Record-supplied code; preserve structural-conformance gating separately from numeric admissibility. | STABLE-INTENT |
| NRS-CORE-0022        | core/balanced-two-factor-lifecycle.md          | Bind profile_eligibility for this bundle to its declared-design admissibility check; retain the existing axis domains, single truth-carrier and absence-of-evaluation behavior.                                    | STABLE-INTENT |

### Payload and declaration

All listed payload members are required, all objects closed, and all local IDs
use the existing nonempty localId string shape. The single dataset contains
its observations; membership in that array binds the containing dataset without
a second dataset_id field per observation. An observation's cell_id resolves
to design.cells; the design references that dataset; analysis references that
design and the exact Contract pinned by the bundle; result references that
analysis. Equality is exact string equality. Level IDs are unique only within
their factor, with tuple position disambiguating identical spellings.

Choose a single required boolean model_applicability_declared, not the ITGC
0.2 structured declarations/data_handling design. Both true and false are
structurally representable. True is a producer assertion, not proof; false
makes declared-design admissibility complete with fail and proposed reason
NRS-BTF-MODEL-NOT-DECLARED. Missing or non-boolean is structural conformance
failure, using the existing NRS-SCHEMA-INVALID reason, not a false declaration.
This payload cannot describe which excluded sampling/data-handling design was
used; it cannot discover an undeclared transformation, weighting, clustering,
imputation or dependence. Declaring true for such data provides no guarantee.
Only explicit cell/unit structure and the assertion are checkable here.

### Numeric members and exact zero SSE

All numbers are finite parsed binary64 JSON numbers. Integers are safe integers.
Each cell-summary n is in [2, 2251799813685247], so both total 4n and 4(n-1)
are safe integers. This ceiling is representational, not a supported runtime
resource bound. Declared residual_degrees_of_freedom is an integer in
[4, 9007199254740984]. Counts and degrees of freedom are compared by exact
equality to observations and 4(n-1), rather than trusting declared summaries.

Signed estimates, means and outcome values may have either sign. sum_of_squares
and f_statistic are non-negative; p_value lies in [0,1].
Choose residual_sum_of_squares strictly greater than zero, and require all
three f_statistic/p_value pairs. Null, omission, NaN, infinity and special
undefined-value objects are not allowed. Consequently no truthful result with
exact SSE=0 is representable as a complete BTF result in this proposal.
A fabricated positive SSE/F can satisfy structural shape; if observations
yield exact SSE=0, computability completes with fail and proposed reason
NRS-BTF-ZERO-RESIDUAL, and dependent recomputation is not_run. This is a
scoped computability result, not a verifier-level safety refusal.
Declaring SSE=0 itself fails schema conformance. False declaration,
structural failure and true exact-zero computation are distinct cases.

Classification of very small positive, rounded-to-zero or uncertain SSE is
still numerical work. A declared p_value of zero is structurally allowed,
but this does not certify an exact-zero tail or permit an underflow match.
Check-specific projections and zero/positive comparison rules remain held.
No change to the Welch 0.2.1 endpoint rule is proposed.

### Report scope and boundary

Use scope.kind=result and scope.id (the same localId string type) equal to
the exact result_id for numerical computability/recomputation. Do not add a contrast scope kind to the registry.
The new report owns local definitions for checkResult, scope and evidence;
do not reference or edit the closed ITGC execution-outcome definitions.
Conformance and integrity retain their appropriate revision scope.

Completed recomputation evidence contains quantity_results entries. Each has quantity,
declared and recomputed values plus exactly the applicable discriminator:
contrast_kind (A/B/AB) for signed_estimate, sum_of_squares, f_statistic or
p_value; cell_id for quantity mean or n; neither for residual_sum_of_squares or
residual_degrees_of_freedom. Keys (result scope, discriminator, quantity) are
unique. Complete successful recomputation supplies every compared quantity;
mismatches use the same keys. Array order never associates entries.
Numeric values have the finite domains above. A non-executed comparison emits
no invented recomputed value or quantity success; its check retains the existing
execution/outcome/reason invariant. Error-enclosure metadata remains check-owned
numerical design work, not an undefined scoping decision.

The new closed guarantee_boundary retains the five required not_asserted keys:
scientific_validity, declaration_truth, distributional_model_validity,
causal_interpretation and standardized_effect_size. Add multiplicity_control,
post_quantization_calibration and admission_conditional_calibration, each
required with constant not_asserted. These expose capability non-claims;
they confer no new aggregate verdict.

### Structural reasons and lifecycle carrier

Proposed unissued admissibility reasons are NRS-BTF-MODEL-NOT-DECLARED,
NRS-BTF-CELL-COVERAGE-INVALID, NRS-BTF-CELL-COUNTS-UNSUPPORTED,
NRS-BTF-UNIT-NOT-UNIQUE and NRS-BTF-LOCAL-REFERENCE-INVALID. They identify,
respectively, false assertion, invalid factor/level/Cartesian cover, unequal
counts or fewer than two units per cell, duplicate observation/unit IDs, and
unresolved local references. Structural type/required-member/unknown-property
failures use NRS-SCHEMA-INVALID before admissibility. Contract mismatch is
structural conformance failure under the exact new bundle/schema binding,
not a guessed alternative Contract. Level reversal and factor exchange are
valid changes of declared orientation, not refusal reasons; incorrect numerical
claims after such a change are result mismatches.

The BTF declared-design admissibility check is the sole profile_eligibility
truth-carrier for this bundle: completed pass gives eligible, completed fail
gives ineligible, and absence/error/not_run gives not_evaluated. Numeric
computability never overwrites this axis. A normative bundle-to-carrier mapping
belongs to the new lifecycle binding and check-set specification; the reference
lifecycle.ts mapping implements it, not vice versa. No new lifecycle operation,
axis, attestation capability or state-invariant entry is proposed.

### Authoritative registry grammar and coupling

These are authoritative json-structure changes, not merely loader changes:

| Existing file under schemas/meta/    | Proposed additive change                                                                                                                                                                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| interpretation-bundles.schema.json   | Permit adopted family-specific HTTPS bundle/profile/check identifiers at bundle_id, profile_id and allowed_check_ids; align requirementId with requirements-registry.schema.json; add optional contract_id, required for the new BTF bundle and absent from historical entries. |
| public-contract-surfaces.schema.json | Permit HTTPS bundle applicability and extensible Contract/Profile Requirement IDs. Keep exact schema-path resolution and old entries.                                                                                                                                           |
| public-checks-registry.schema.json   | Permit HTTPS check IDs in checks, sets and depends_on; align requirementId; retain existing scope_kind and propagation vocabulary.                                                                                                                                              |
| reason-codes-registry.schema.json    | Permit HTTPS applicable_check_ids and extensible requirementId; register the proposed new scoped reasons with complete check applicability.                                                                                                                                     |

Each identity field accepts its existing legacy grammar or its own adopted
HTTPS family/name/revision grammar, not arbitrary URIs or cross-family aliases.
Use the exact current requirementId grammar of requirements-registry.schema.json,
including the capability-token branch, without broadening unregistered issuance.
Retain the canonicalization URN and current attestation state; no new family
is used there. Existing supported_ci_method_id and confidence-level constants
are unused by BTF and remain unchanged. No new scope kind is needed.
The bundle's contract_id equals analysis.contract_id and is pinned as part of
the exact interpretation tuple by the new envelope binding.

These meta-schema files use unversioned urn:nrs:meta identities: revise them
additively within a new content-addressed specification snapshot, preserving
their historical snapshots and identities, rather than silently altering an
issued snapshot. Proposed registry revisions: bundles 0.6.0 to 0.7.0,
surfaces 0.5.0 to 0.6.0, checks 0.2.0 to 0.3.0, reasons 0.9.0 to 0.10.0.
Recheck current revisions at implementation; numbers here are not issued.
New external Record/payload/report schema identities remain separately versioned.
The meta-schema changes implement adopted grammar and additive references,
without changing any existing CORE meaning; include them in the STABLE-INTENT
impact assessment, with CORE reassessment if that preservation claim fails.

Require positive and negative fixtures for legacy registries, valid new HTTPS
families/capability IDs, wrong families, malformed tokens, duplicate identities,
unregistered references and missing/mismatched Contract pins. Grammar acceptance
alone never establishes registry membership. Add schemas/README.md navigation,
new report-local definitions, tooling/src/phase1/schemas.ts loading,
tooling/src/phase1/registry-cross-checks.ts exact-ID handling, reference resources.ts
schema lists, lifecycle carrier dispatch, and their regression coverage.
Do not widen the common historical report schema. State-invariant meta-schema
changes are not needed unless a later proposal adds BTF references there.

### Additional existing-ID treatment

| IDs                                         | Existing owner                                               | Treatment                                                                                                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NRS-CANON-0003/0004/0009                    | canonicalization/phase-1-numeric-model.md                    | Preserve phase-qualified text; PROFILE-BTF-0003 and VERIFY-0030 carry successor numeric/parsed-input bindings.                                                                |
| NRS-CANON-0010/0011                         | Same owner                                                   | Preserve source-decimal non-claim and versioned-domain evidence requirement; thresholds cannot be invented from probes.                                                       |
| NRS-CANON-0006                              | canonicalization/numerical-comparison.md                     | Preserve check-version tolerance authority; the Record carries none.                                                                                                          |
| NRS-VERIFY-0020                             | Same owner                                                   | Preserve Welch 0.2.1 check-qualified endpoint semantics; no automatic BTF extension or tolerance inheritance.                                                                 |
| NRS-VERIFY-0021/0026                        | spec/verification/welch-computability-check.md               | Preserve general finite-input underflow non-zero-truth rule; retain Welch bundle disposition and squared-t path as historical check-specific rules, not an adopted BTF graph. |
| NRS-VERIFY-0013/0017                        | spec/verification/profile-admissibility-check.md             | Preserve distinct checks and failed-admissibility propagation; only new edges and in-rule ordering remain open.                                                               |
| NRS-VERIFY-0002; NRS-SEC-0001               | spec/core/verification-principles.md                         | Preserve scoped outputs and offline-by-default behavior.                                                                                                                      |
| NRS-CORE-0009                               | spec/profiles/independent-two-group-continuous/non-claims.md | Preserve declaration-truth non-claim; do not reissue generic truth guarantees as EXPERIMENTAL BTF meanings.                                                                   |
| NRS-CORE-0013/0014/0015/0016/0017/0018/0019 | spec/core/record-lifecycle.md                                | Preserve axes, carriers and operation rules; CORE-0022 binds the new carrier without changing them.                                                                           |
| NRS-PROV-0001/0002                          | spec/core/provenance-model.md                                | Preserve old method-bound chain and extra-Record non-claims; PROFILE-BTF-0004 binds the new Contract/local-reference chain explicitly.                                        |
| NRS-VERSION-0001                            | spec/core/versioning-principles.md                           | Preserve immutable content-addressed snapshots, including pre-change meta-schemas.                                                                                            |
| NRS-VERIFY-0006/0007/0008; NRS-SEC-0002     | spec/verification/public-checks.md                           | Preserve Phase 1 clauses; VERIFY-0032 binds the new capability to conformance/integrity separation and no Record-supplied code.                                               |

The table enumerates concrete IDs rather than adopting PR 252's inconsistent
omission/count summary. PR 251 correctly distinguishes VERIFY-0020's Welch
scope; a CORE stability label alone does not erase a clause's scope.

## Tier, migration and coupled implementation

Proposed highest affected tier: STABLE-INTENT, because the new Record/report
public surfaces and the additive applicability lists concern stable external
representation. New mathematical capability clauses are EXPERIMENTAL. This is
not a seven-day-only proposal. The current tier registry requires at least
30 calendar days for STABLE-INTENT; no clock starts in this document.
Preserved CORE constraints do not change meaning. If the assembled review finds
an actual CORE semantic change, revise the proposal and apply CORE's window
before opening; do not call it mere preservation to obtain a shorter process.

Existing Record/report schemas, historical bundle entries, numeric expectations
and check tolerances stay byte-identical; additive registries and meta-schemas
evolve only in the eventual coupled snapshot. Migration produces a new Record
revision
under the new exact bundle; old records are never interpreted as factorial
records or accepted by guessing an equivalent identifier. No automatic conversion
from a Welch record is specified. Add independent positive/negative fixtures for
identity mismatch, level reversal, factor swap, unequal cells, duplicate units,
unknown properties, strict-input multi-fault priority and old-bundle regression.
Expected numbers require independent oracles, not the reference code alone.

Eventual coupled change: new spec files and spec/README.md; authority manifest;
requirement namespace/ID registry; the three new schemas; public surface and
interpretation-bundle registries; complete check/reason-code entries and ordering;
conformance manifest, fixtures and independent expectations; reference dispatch
and schema loader; regenerated authority/requirement/schema views. No incomplete
bundle or partial supported procedure is issued during research.

## Numerical implementation holds

For each output quantity, close the represented-input exact target, projection,
error enclosure, comparison rule, supported domain, endpoints and resource bounds.
For SS/SSE/F, select a reviewed graph only after cancellation and range evidence;
QR/centering/scaling has not been adopted. For F tails, PR 190 is restricted
exploratory evidence, not a general certified procedure. Reliable zero-SSE
detection (with the representation and exact-zero disposition fixed above), overflow,
underflow, subnormal values, uncertain comparisons, check dependency ordering and
reason codes need complete dispositions within the preserved constraints.
Finite statistic/positive-df tail underflow is not an exact probability zero
(NRS-VERIFY-0021); no Welch-specific failure code or comparison tolerance is
automatically imported. Pin platforms and execution predicates.
Existing finite probes cannot establish a whole supported domain.

These holds block issuance and support. They are proposed as explicit work during
the discussion window, subject to the independent opening review. They do not
postpone an unacknowledged scientific premise or widen the accepted model.

## Release 3 dependency reconciliation

Re-read at this baseline: R3 preparation README blob
`4dbb5170f839f83ef22d3297dae832098d5cc95d` and readiness audit blob
`bc0bb942d429fe9a9ee4e959ea483972d4dbae4d`. Both match the earlier pins.
This is a comparison of the main-tree interfaces, not a new audit of every R3
research branch or a claim that its historical progress table is current.

No issued or candidate R3 procedure, protected-family ID, multiplicity claim,
Record schema or runtime is required by this proposal. The factorial operation
and payload are independently defined here; no R3 field spelling is imported.
Future numerical research reuse requires exact source/domain reconciliation.
No R3 readiness hold is changed, and no R3 calendar event is an opening condition
for this dependency-free bounded proposal. Recheck main and changed interfaces
immediately before opening; a new actual dependency reopens this assessment.

## Opening readiness decision request

R4-P1 has bounded accepted source/derivation evidence; wider source holds are
staged. R4-P2 has the accepted bounded scope. R4-P3 has reviewed exploratory
numerical evidence and explicit implementation holds. R4-P4 has the main-tree
comparison above. R4-P5 now has proposed clauses, ID treatment, exact candidate
surfaces and tier reasoning, pending independent assessment. R4-P6 remains open.
This author assessment closes none of those items by itself.

Ask the independent reviewer to judge this entire candidate, its evidence and
hold dispositions as one fixed input. A source GO or a set of passing validators
is not opening GO. Only after remaining decision-bearing findings are resolved
can the user's conditional opening authorization be exercised with an actual
issue URL, opening time, highest tier and earliest decision date.

Authoring assistance: OpenAI Codex in the existing context. New architectural
choices are proposals for review, not independently reviewed findings.
