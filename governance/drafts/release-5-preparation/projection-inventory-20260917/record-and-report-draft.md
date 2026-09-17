# Release 5 conditional Record and report draft

Status: unissued, informative design proposal, 2026-09-17. Fixed input commit:
`2b8b6a829b4bc25d7cb8bed75d63af602360eaa6`. This prose contract makes review
choices concrete without allocating JSON paths, schema identifiers, check IDs or
reason codes. Research, predecessor, surface and preservation gates remain open.
It is not an executable schema or a supported bundle.

## Record composition proposal

The family schema owns the selected analysis occurrence, its Contract carrier,
dataset/design relationships and design declarations. The successor Record
composition owns the R5 timing addition. The draft recommends attaching timing to
the existing family-defined selected-analysis occurrence, so a second analysis ID
or selected-tuple object is unnecessary. This is a composition proposal for owner
review, not a claim that current family schemas already permit such a property.

| Piece                            | Candidate ownership and content                                                                        | Before it can apply                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Record identity and integrity    | Reuse family Record identity, revision and canonical integrity fields                                  | Exact accepted successor Record schema and bundle                                |
| Contract/Profile/bundle identity | Consume the family's sole existing identity carriers                                                   | No alias of `method_id`; accepted Contract carrier required for all families     |
| Design facts                     | Remain solely in the Profile-owned declaration surface                                                 | Accepted per-version mapping and any required carrier successor                  |
| Timing                           | One non-defaulted status for each covered selected decision, owned by the successor Record composition | Owner-reviewed composition site, cardinality and exact selected-analysis binding |
| Mapping choice                   | Comes from accepted bundle/check configuration                                                         | Not chosen by a producer field and never dereferenced over the network           |

For a family allowing multiple analyses, the successor must decide whether it
covers one explicitly selected analysis or several individually scoped decisions.
This draft recommends per-covered-decision timing bound through the existing
analysis occurrence. It does not infer one common timing value for all analyses or
select the first/last entry. Timing cardinality is a named owner-review condition;
a schema that cannot resolve it remains ineligible. This proposal treats one
non-Profile input as one timing value per projected decision; that interpretation
and composition still need confirmation against the frozen RFC.

The candidate status meanings remain the RFC's `pre_outcome`, `post_outcome` and
`unknown`. The complete decision includes Contract, Profile and bundle identities
and every projected declaration. Covered outcome access concerns the exact supplied
dataset, including later-excluded observations and selector input context.
Post-access changes, including restoration, cannot truthfully be pre-outcome.
Neither an event log nor a timestamp/attestation field is introduced. The value is
an unproved producer declaration, not an authentication or preregistration claim.

Missing timing and an invalid enum are successor-conformance failures; there is no
implicit `unknown`. Legacy Records retain their legacy meaning and acquire no
timing default. Timing participates in the successor Record's applicable integrity
scope, so any change requires the normal revision/digest handling. R5 does not
modify historical canonicalization or infer that its own pass means integrity or
numerical checks passed.

Closed historical schemas cannot be extended merely by an `allOf` wrapper that
adds a forbidden property. Draft the actual closed successor boundary and its
references together. Preserve the historical schemas byte-for-byte.

## Check and mapping binding proposal

Prefer separately versioned family-specific R5 check entries governed by one shared
cross-family meaning. Each entry has a static `depends_on` relation to the exact
applicable family admissibility check. Its definition and accepted bundle fix its
mapping revision and allowed family versions. This fits the current static dependency
model without introducing conditional dependency semantics into old check entries.

This is a candidate registry design, not identifier issuance. Names and version
numbers remain unallocated. Mapping identity could use a versioned specification
reference; this draft does not assume an already recognized mapping identifier
family. The exact reference grammar and any required identifier-policy decision
remain part of R5-P5. If a shared check is chosen instead, its bundle-specific
dependency resolution requires separate explicit specification and review; a list
of all three family dependencies is not an acceptable substitute.

Each check instance retains exact Record revision and covered analysis identity.
The consumed dependency retains its actual check ID, version, scope, execution and,
only if completed, outcome. Record-scoped admissibility remains Record-scoped.
A same-ID result for a different subject or revision cannot satisfy the dependency.
No second admissibility computation is introduced by R5.

Mapping definitions are validated before registration: exact source owners and
paths, complete fact coverage, no competing carrier, no defaults, accepted enum
meaning and one deterministic transformation per cell. A missing mapping or a
conflicting registered definition is not evidence that a conforming researcher
Record is scientifically wrong. The responsible configuration/error handling and
reason-code treatment remain a surface decision, distinct from declaration failure.

## Candidate report contents

These are conceptual content requirements, not field names. A successor report
composes successor result definitions; it does not reuse a closed legacy evidence
object and append extra fields. The R2 candidate's exact four-result report remains
unchanged. The R5-aware successor expressly defines its result count and ordering.

| Evidence component  | Proposed content and scope                                                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subject             | Exact Record ID, revision, independently computed digest and covered analysis from the owning surface                                                     |
| Procedure           | R5 check identity/version/scope plus actual execution and, when completed, outcome                                                                        |
| Configuration       | Exact consumed Contract/Profile/bundle identities and the applicable mapping identity/version                                                             |
| Facts               | Eight ordered cells; each has its typed/source-qualified value or explicit applicability result and concrete source pointers, following the mapping draft |
| Timing              | Exact status already obtained at successful Record conformance; no defaults                                                                               |
| Dependency          | Actual admissibility result identity/version/scope/execution, outcome only if present, and relevant reasons                                               |
| Boundary            | The exact versioned eleven-item non-claim clause reference; the implementing package supplies its meaning locally without implicit URI retrieval          |
| Failure information | Registered reasons and error information required by the owning execution/outcome model; no fabricated success or overall status                          |

Reported identities and facts are derived output about a fixed Record. They do not
add Record truth carriers. The eight fact cells exclude timing; the latter remains
the only non-Profile projection input. No non-claim text is duplicated here: the
[frozen RFC list](../opening-rfc-candidate.md#non-claim-boundary) remains the single
preparation reference until an accepted successor clause exists.

Source paths are concrete pointers into the referenced Record revision, not schema
pointers or wildcard strings. Collection transformations retain the exact source
collection and any per-element evidence needed by the accepted mapping. The final
schema needs a deterministic bounded representation; this draft does not prescribe
production optimizations or silently truncate evidence.

## Execution-state contract

| State                                              | Evidence retained                                                                                                             | Evidence unavailable or prohibited                                                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Unknown bundle                                     | Existing exact-dispatch refusal, before family interpretation                                                                 | No guessed mapping, Profile, timing or R5 projection                                                                         |
| Record conformance fails                           | Existing conformance/refusal evidence and appropriate Record/revision scope                                                   | No trusted analysis-local identity, fabricated timing or computed projection                                                 |
| Conformance passes; dependency completes with fail | Actual dependency ID/version/scope/execution/outcome and blocking reasons; obtained timing and non-claim boundary             | R5 is `not_run`; no R5 outcome or computed projection                                                                        |
| Conformance passes; dependency is not-run or error | Actual dependency ID/version/scope/execution and blocking reasons; obtained timing and non-claim boundary                     | No invented dependency outcome; R5 is `not_run` without outcome or computed projection                                       |
| R5 completes with pass                             | Complete subject, procedure, configuration, all eight cells, timing, dependency and boundary                                  | A bare pass is not a complete report; no endorsement of selection or numerical correctness                                   |
| R5 completes with fail or indeterminate            | Completed outcome with registered reasons, obtained timing/boundary and inspectable evidence of the comparison that completed | No unsupported cell presented as successfully projected; exact evidence completeness depends on the reviewed failure meaning |
| R5 starts and errors                               | Registered reasons/error plus timing already acquired at conformance and other actually obtained evidence                     | No fabricated missing dependency, tuple, mapping or projection; no outcome field                                             |

A successful conformance stage has already obtained timing, so the execution-error
row retains it. A conformance-failure report does not pretend that stage succeeded.
Partial projection evidence, if a later schema allows it, is explicitly partial and
cannot inhabit the complete-success shape.

The fail/indeterminate row does not introduce a new scientific failure predicate.
Before assigning it to any concrete case, specify what comparison completes and
why its result belongs there rather than at registration validation or execution
error. Likewise, the current propagation description covers dependency fail,
not-run and error; do not silently classify a reachable dependency-indeterminate
result as pass or extend old semantics. Either prove it unreachable for the exact
accepted dependency or obtain an explicit successor rule. These are named review
conditions rather than hidden implementation defaults.

## Before schema and implementation promotion

| Review condition                         | Required output                                                                          | Related planned cases                         |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------- |
| Timing location and cardinality          | Exact successor composition and analysis-binding rule consistent with the RFC            | M03, M12, M13, T01–T06                        |
| Mapping applicability/value alternatives | Closed successor shapes with source-qualified repetition and explicit pair applicability | M05–M10; independent addendum counterexamples |
| Dependency binding                       | Exact family check entries, scopes and reachable outcomes                                | M06, T07, R03–R05                             |
| Outcome-specific evidence                | Accepted complete/blocked/error report shapes and reason-code treatment                  | T07–T11, R01–R04                              |
| Identifier migration                     | Accepted validator/schema migration for new HTTPS identifiers                            | R06                                           |
| Historical compatibility                 | New bundle allow-lists plus unchanged old schemas, dispatch and replay evidence          | H01–H06                                       |

The related labels refer to [the original cases](verification-cases.md) and
[the report follow-up](report-surface-followup.md). They remain plans. Independent
research does not count as independent acceptance of this newly concrete design.
Public verification implementation belongs in nomue-verifier after the required
research and governance decisions.

## Author-side review

The author checked this draft against the fixed RFC and independent addendum.
The review explicitly retains timing after successful conformance even on error;
forbids invented dependency outcomes; distinguishes a new revision's changed source
pointers from nondeterminism on the same revision; and exposes timing cardinality
and mapping-reference grammar as review choices. The input inventory and received
independent report are unchanged. This is self-review of a prose proposal, not
independent design acceptance or evidence of implemented R5 behavior.

Prepared with OpenAI Codex assistance in the continuing author context. This draft
records proposed composition and report semantics for review, not an independent
methodological conclusion or an adopted public contract.
