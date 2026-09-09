# Release 4 factorial verification: RFC preparation draft

Status: informative editorial preparation, updated 2026-09-09. Not an opened RFC.
The preparation commission requires independent research review before a result
informs an RFC. This document organizes the proposed questions and required
artifact changes for that handoff; unreviewed methodology is not adopted here.
No opening date, discussion deadline, identifier or supported method is issued.

## Motivation and proposed outcome

A two-factor experiment asks how each factor relates to an outcome and whether
one factor's effect changes with the other factor. A portable verification
contract needs explicit factor ordering, cell membership, effect definitions,
error assumptions and numerical behavior. A software package's default analysis
is not enough to identify all of those choices.

Prepare a first proposal for complete balanced replicated 2 by 2 fixed-factor
designs with independent units and one continuous outcome. This is Candidate A
from the existing commission, still a recommendation for review. Keep both main
effects and the interaction in the full model. The detailed proposed directions
and normalization remain in [the readiness document](public-discussion-readiness.md).

The intended verification claim concerns declared inputs, supported calculations
and scoped comparisons. It does not establish that experimental independence,
normality, common variance, random assignment, absence of bias, or a causal
interpretation is true of the world. It does not imply overall scientific validity.

## Decisions to resolve in the assembled RFC

| Question                             | Working recommendation for review                                       | Evidence or decision still needed                                                               |
| ------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| First design                         | Candidate A only                                                        | Independently reviewed estimands, balance and replication boundary                              |
| Reported effects                     | Signed main effects and explicitly normalized difference-in-differences | Verify direction, weights and every coefficient-to-effect conversion                            |
| Marginal inference                   | Investigate separate full-model F tests                                 | Original-source support for nulls, common variance, normal errors, independence and residual df |
| Confidence intervals                 | Keep inclusion undecided until source and numerical review              | Fix pointwise versus simultaneous meaning and supported confidence level if included            |
| Multiple claims                      | No implicit familywise guarantee from three tests                       | A protected family requires its own reviewed procedure and exact identity                       |
| Numerical route                      | Compare candidate graphs                                                | No QR, centering, direct-cell route or tolerance selected by the probe                          |
| Zero residual or numerical ambiguity | Treat as a required computability decision                              | Independently justify domain test, ordering and eventual reason-code behavior                   |
| Wider designs                        | Stage general balanced and unbalanced designs separately                | Review exclusions and preserve the existing S6 comparison obligation                            |

The final RFC records choices, alternatives and evidence dispositions. Merely
copying this table with undecided scientific meaning is not sufficient to close
R4-P1, R4-P2 or R4-P6.

## Proposed authority and change inventory

Current preparation changes are informative documents only. The eventual implementation
proposal inventories exact files and registered Requirement IDs before opening;
new IDs are not guessed or allocated here.

| Subject                            | Existing owner or artifact class                                              | Eventual coupled change                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Meaning and guarantees             | Authoritative specification under `spec/`, assigned by the authority manifest | Add bounded factorial meaning, assumptions and non-claims with registered requirements   |
| Requirement identity and stability | `registries/requirements.yaml`                                                | Allocate new requirements after scope review; preserve existing meanings and identifiers |
| JSON structure                     | Authoritative schemas under `schemas/`                                        | Specify factor, cell, claim and result shapes; reject ambiguous declarations             |
| Public surfaces and compatibility  | `registries/public-contract-surfaces.yaml`                                    | Record schema-version impact and new surfaces explicitly                                 |
| Interpretation combinations        | `registries/interpretation-bundles.yaml`                                      | Bind exact reviewed versions; no nearest-version dispatch                                |
| Public checks and tolerances       | `registries/public-checks.yaml`                                               | Define candidate admission and recomputation checks only after numerical closure         |
| Refusal vocabulary                 | `registries/reason-codes.yaml`                                                | Register necessary semantics and deterministic ordering after review                     |
| Expected judgments                 | Authoritative conformance artifacts                                           | Add positive, negative, boundary and migration fixtures from independent truth           |
| Execution                          | Reference implementation                                                      | Implement the approved graph and dispatch; implementation is not authority               |
| Derived views                      | Generated artifacts                                                           | Regenerate after the coupled authoritative change                                        |

Propose EXPERIMENTAL for genuinely new factorial-specific requirements while
learning continues. This is not a way to downgrade affected existing material.
The exact requirement impact assessment determines the highest affected tier;
its minimum discussion period comes from `registries/stability-tiers.yaml`.
If CORE meaning changes, the CORE process applies. No discussion clock starts
from this preparation commit or its draft PR.

## Staged contracts and public checks

These are descriptive work stages, not registered Contract names or IDs.

1. Close the design and estimand declarations, including four explicit cells,
   common replication, unit identity, factor/level order and full-model meaning.
2. Close finite-input arithmetic, effect estimates, sums of squares and residual
   computation, with an explicit supported domain and failure behavior.
3. Close marginal F inference and tails after both methodological and numerical
   evidence cover the exact procedure. Add interval claims only if separately
   justified and reviewed.
4. Add protected-family claims only through reviewed multiplicity semantics and
   an exact compatible dependency. Wider factorial designs remain separate work.

These stages do not authorize partial public support. Each issued vertical slice
needs its own complete Contract, schema, public checks, conformance and reviewed
execution support. No result produced by the disposable probe is a public fixture.

## Numerical evidence map

| Quantity or boundary         | Available evidence                                                            | Remaining prerequisite                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Coded coefficients           | Accepted as an accurate exploratory QR cancellation record                    | Applicability to the final chosen graph and supported domain                             |
| SS, SSE and F ratio          | Reviewed and accepted 945-case probe, scale witnesses and scaling exploration | Independent finite-record checks accepted; general domain and error analysis remain open |
| F tails and quantiles        | Conditional research reuse candidates                                         | Exact source, algorithm, parameter range and projection review                           |
| Signed effects and intervals | Proposed normalization; interval inclusion undecided                          | Source-based inferential construction plus numerical propagation                         |
| Resource and platform limits | Finite probe environment only                                                 | Supported bounds and execution evidence; no extrapolation from 945 cases                 |

See [the SS/F supplement](ss-f-propagation-supplement.md). Bitwise disagreement
counts are not statistical rejection rates and do not rank general algorithms.

## Release 3 dependency reconciliation

This comparison is pinned to the main baseline
`ed6e9d9bde691556b99d22e261b31c3b25df338f`, including the Release 3 preparation
README and its 2026-09-06 readiness audit. It is not a claim about later branches
or a final accepted Release 3 contract. Repeat against the exact final scope
before treating R4-P4 as resolved.

| Potential reuse                                | Present treatment                 | Reconciliation before dependent adoption                             |
| ---------------------------------------------- | --------------------------------- | -------------------------------------------------------------------- |
| Claim target, family and result separation     | Architecture candidate            | Check final semantics and field identities                           |
| Multiplicity procedures                        | Optional, conditional dependency  | Verify protected family, error criterion and exact procedure version |
| F tails and quantiles                          | Numerical research candidate      | Check algorithm, domain, df, error and source coverage individually  |
| Projection, oracle and resource patterns       | Reusable investigation pattern    | Derive Release 4-specific bounds; no inherited tolerance by analogy  |
| Exact-bundle dispatch and historical integrity | Existing architectural obligation | Test old bundles and reject unsupported combinations                 |

The inspected Release 3 README blob is
`4dbb5170f839f83ef22d3297dae832098d5cc95d`; its readiness-audit blob is
`bc0bb942d429fe9a9ee4e959ea483972d4dbae4d`. These are snapshots of preparation,
not accepted R3 procedure or interface definitions.

Release 4 research can continue while those dependencies remain conditional.
Release 3 numbering and scope remain unchanged. Earlier releases retain their
historical inputs, interpretation and outputs; any future legitimate correction
requires its own explicit versioning and decision record.

## Exclusions and review questions

No automatic support is proposed for unequal replication, missing cells, random
or mixed effects, repeated or clustered units, covariates, model selection,
transformations, imputation, simple-effects searches, standardized effects or
implicit causal claims. Researching them is still permitted.

Ask independent reviewers whether Candidate A is useful and sufficiently bounded,
whether each retained inferential claim has adequate primary evidence, whether
S6 is needed for the exclusion rationale, and whether a proposed dependency or
numerical policy hides an unreviewed choice. A disagreement is recorded and
adjudicated rather than settled by a convenient software default.

## Opening disposition

R4-P1 through R4-P6 remain as recorded in the readiness document. The new editorial
structure advances R4-P5 preparation; it does not close the standalone RFC or
pre-opening review requirements. The future steward request is for opening a
bounded proposal for discussion after those requirements are resolved or explicitly
bounded, not for adoption, implementation support or publication of a release.

Authorship assistance: OpenAI Codex, in the existing maintainer task context.
No independent primary-source review occurred in the authoring increment;
subsequent bounded numerical/editorial reviews are indexed in the readiness
document. They do not close the original-methodology source ledger. Research sources
and acquisition limits are recorded in [the source follow-up](source-followup-2026-09-08.md).

## Review follow-up

The independent editorial review is preserved at
[the review record](../../../review-inputs/r4-rfc-preparation/REVIEW-RESULT.md).
It grants bounded editorial GO at `bf400469` and leaves R4-P5 open.
The [candidate impact inventory](rfc-impact-inventory.md) now identifies concrete
proposed paths and existing requirement constraints. It does not allocate new
requirements or complete the final RFC impact assessment. Read numerical evidence
with the repaired supplement's magnitude table and interpreter dependency.

## Programme audit qualifications

The readiness document now carries the complete S1-S6 and P1 ambiguity map,
exact-input review status, and numerical-domain limitations. The new scale
boundary observations concern finite-input computability, not the distributional
validity of F. At the PR 227 audit the Contract/Profile placement was unresolved.
The revised impact inventory now proposes Contract-owned operation semantics,
Profile-owned applicability declarations and Public Check-owned recomputation.
That concrete allocation awaits acceptance; it is no longer an unspecified
placement choice. Neither the audit nor the proposal selects a numerical
algorithm or opens a public-discussion window.

## Proposed opening decision and sequence

The eventual decision request is to open discussion of the independently reviewed
Candidate A proposal, with its explicitly listed implementation holds, after the
readiness conditions are resolved. The current request is only to review this
preparation. It does not ask to open that discussion now.

No numerical-release-order condition was found in the inspected RFC process.
On that basis, the author proposes evaluating R4 opening on its own evidence and
actual dependencies even if R3 discussion has not opened. This is an interpretation
for review, not a new governance permission or a change to either release number.
A dependent R3 claim remains conditional until its exact source and decision scope
are reconciled; an earlier calendar opening cannot establish compatibility.

Use the [opening claim map](opening-claim-map.md) to complete source-supported
scope decisions first, then the [impact inventory](rfc-impact-inventory.md) to
finish authority placement, affected IDs, surface versions and tier assessment.
The revised inventory proposes operation definitions under a Contract, contextual
declarations under a Profile, and recomputation/comparison under Public Checks.
It proposes paths and clause subjects without creating normative artifacts.

The standalone RFC remains incomplete while those decisions are unresolved. Once
assembled, obtain a separate pre-opening review of its exact content and request
steward opening approval with the applicable tier, discussion URL and timestamps.
Preserve unclosed research obligations and all historical review limitations.
