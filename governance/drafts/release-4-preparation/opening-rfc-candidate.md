# Release 4: balanced two-factor marginal inference RFC candidate

Status: informative assembled proposal for independent pre-opening review.
Baseline: `0abdca8f822d0de3faf35f218f762a951fd75e9e`.
Not an opened RFC, issued namespace, supported bundle or implementation decision.

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
The formulas following the table are part of the calculation row's proposal.

| Proposed ID           | Proposed owner under spec/                            | Proposed clause text                                                                                                                                                                         | Tier          |
| --------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| NRS-CONTRACT-BTF-0001 | contracts/balanced-two-factor/design-and-estimands.md | Declare two ordered factors, each with two ordered distinct levels; interpret cells in 00,01,10,11 order without sorting identifiers or labels.                                              | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0002 | contracts/balanced-two-factor/design-and-estimands.md | Define the three population contrasts and their sample estimates by the formulas below; retain the full four-column model in each individual-null calculation.                               | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0003 | contracts/balanced-two-factor/admissibility.md        | Require four complete cells of the same integer count n at least two, one finite outcome per distinct declared experimental unit, and explicit membership in exactly one cell.               | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0004 | contracts/balanced-two-factor/admissibility.md        | Define the inferential premises as independent normal errors of zero mean and one common strictly positive finite variance, with fixed cell means; declarations do not prove these premises. | EXPERIMENTAL  |
| NRS-CONTRACT-BTF-0005 | contracts/balanced-two-factor/calculation.md          | Define exact mathematical estimates, SS, SSE, degrees of freedom, marginal F and tail as below, separately from numerical projection and supported execution.                                | EXPERIMENTAL  |
| NRS-PROFILE-BTF-0001  | profiles/balanced-two-factor/declarations.md          | Bind the analysis directly to its exact Contract and record the producer's assertion that the Contract-defined premises apply; do not redefine premises in the Profile.                      | EXPERIMENTAL  |
| NRS-PROFILE-BTF-0002  | profiles/balanced-two-factor/non-claims.md            | Assert neither declaration truth, distributional validity, causality, scientific validity, multiplicity control nor statistical calibration after input quantization or admission selection. | EXPERIMENTAL  |
| NRS-VERIFY-0029       | verification/factorial-recompute.md                   | Keep structural conformance, declared-design admissibility, numerical computability and quantity comparison separately scoped; never combine them into an overall verification verdict.      | EXPERIMENTAL  |
| NRS-VERIFY-0030       | verification/factorial-recompute.md                   | Execute a new numerical check only under its registered check version, supported domain, resource limits, numerical projection and comparison rules; an unset rule supplies no support.      | EXPERIMENTAL  |
| NRS-VERIFY-0031       | verification/factorial-recompute.md                   | Produce separate report evidence for the exact Record revision, bundle, check version and quantity; retain the existing execution/outcome invariant and applicable registered reason codes.  | STABLE-INTENT |
| NRS-CORE-0020         | core/balanced-two-factor-envelope.md                  | Use a new closed versioned Record envelope and payload with direct Contract binding; preserve historical schema constants and old payload meanings unchanged.                                | STABLE-INTENT |

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

| Proposed file                                                                   | Shape and version decision                                                                                                                                                                    | Surface treatment                                                                               |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| schemas/record/record-balanced-two-factor-0.1-draft-1.schema.json               | New schema with the existing envelope member names, new schema/profile constants and a new closed payload reference. Existing record.schema.json and record-0.2.schema.json remain unchanged. | New candidate NRS-PCS-0014, STABLE-INTENT; no replacement of NRS-PCS-0001.                      |
| schemas/profiles/balanced-two-factor-0.1-draft-1.schema.json                    | Closed dataset/design/analysis/result objects as specified below; no confidence-level or method_id alias.                                                                                     | New candidate NRS-PCS-0015, STABLE-INTENT; old ITGC surfaces 0002-0005 and 0009-0010 unchanged. |
| schemas/reports/verification-report-balanced-two-factor-0.1-draft-1.schema.json | New report schema to permit new check identities and per-contrast scope; same separate-artifact and execution/outcome invariants.                                                             | New candidate NRS-PCS-0016, STABLE-INTENT; old report surfaces 0007/0008/0011 unchanged.        |
| schemas/reports/verifier-refusal-0.2-draft-3.schema.json                        | Reuse the current verifier-level refusal shape and routing stage unchanged.                                                                                                                   | NRS-PCS-0012 applicability receives an additive new bundle only when that bundle is registered. |
| schemas/routing/routing-envelope-0.2.schema.json                                | Reuse root object plus string interpretation_bundle_id with exact lookup and no fallback.                                                                                                     | NRS-PCS-0013 additive applicability only; no new routing schema.                                |
| canonicalization/record-canonicalization.md                                     | Reuse the exact JCS eligibility, canonical bytes, domain tag and digest procedure; no algorithm or normalization change.                                                                      | NRS-PCS-0006 additive applicability and new Record schema reference only.                       |

Candidate PCS numbers 0014-0016 are absent at the pinned baseline and unreserved.
Their registry entries will bind the exact proposed Requirement IDs and resolve
paths against the new schema files. A path sketch is not a validated schema.
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

Detailed constraints on stored result numbers and check evidence fields remain
numerical-design holds. A final schema cannot be issued until those domains and
failure behavior close. This review asks whether those explicit implementation
holds are compatible with opening discussion of the proposed meaning.

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
its registered computability domain. Final ordering between those latter checks,
dependency not_run semantics and concrete reason codes require their own closed
versioned specification. Global pre-routing ordering is not reopened here.

## Tier, migration and coupled implementation

Proposed highest affected tier: STABLE-INTENT, because the new Record/report
public surfaces and the additive applicability lists concern stable external
representation. New mathematical capability clauses are EXPERIMENTAL. This is
not a seven-day-only proposal. The current tier registry requires at least
30 calendar days for STABLE-INTENT; no clock starts in this document.
Preserved CORE constraints do not change meaning. If the assembled review finds
an actual CORE semantic change, revise the proposal and apply CORE's window
before opening; do not call it mere preservation to obtain a shorter process.

Existing Record schemas, bundles, report variants, numeric expectations and
check tolerances stay byte-identical. Migration produces a new Record revision
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
exploratory evidence, not a general certified procedure. Zero SSE and overflow,
underflow, subnormal values, uncertain comparisons, check dependency ordering and
reason codes need complete dispositions. Pin platforms and execution predicates.
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
