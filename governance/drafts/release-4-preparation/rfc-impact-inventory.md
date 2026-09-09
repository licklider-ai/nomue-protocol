# Release 4 candidate file and requirement impact inventory

Status: informative placement proposal. Earlier constraints and audit additions
were reviewed through PR 225/232 and accepted through PR 229. The revised
Contract/Profile placement below awaits review; R4-P5 remains open. Current
baseline is main `ed6e9d9bde691556b99d22e261b31c3b25df338f`; historical inputs
remain recorded in the readiness ledger.
Existing requirements below were read in their owning specification files.
A requirement constraining a new feature is not automatically a requirement
whose meaning changes. No current normative wording is proposed to change here.

## Concrete proposed destinations

Paths labelled proposed do not exist or acquire authority through this document.
They are reviewable placement recommendations, conditional on the final scope
and successor architecture. No schema or public identifier is allocated.

`spec/contracts/` is a proposed new directory convention, not an existing
repository layout. Acceptance would require a coupled `spec/README.md` layout
entry and explicit assignment of the new files to the authority manifest's
`normative-meaning` target. No authority follows from a directory name.

| Path or existing owner                                                                                  | Proposed responsibility or impact                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `spec/contracts/balanced-two-factor/design-and-estimands.md` (proposed)                                 | Candidate A declarations, cell/level ordering, signed estimands and full-model boundary                                             |
| `spec/contracts/balanced-two-factor/admissibility.md` (proposed)                                        | Balance, replication, membership and supported input preconditions                                                                  |
| `spec/contracts/balanced-two-factor/calculation.md` (proposed)                                          | Contract-defined quantities, residual df and computation-domain semantics; Public Check owns the recomputation/comparison procedure |
| `spec/profiles/balanced-two-factor/declarations.md` (proposed)                                          | Application-context declarations and the binding to the operation Contract; no duplicated statistical definitions                   |
| `spec/profiles/balanced-two-factor/non-claims.md` (proposed)                                            | Assumption declarations versus scientific validity, causality and familywise claims                                                 |
| `spec/verification/factorial-recompute.md` (proposed)                                                   | Scoped result comparisons tied to newly registered public checks                                                                    |
| `schemas/profiles/balanced-two-factor.schema.json` (proposed)                                           | Structural profile candidate; exact version and enclosing Record schema remain unresolved                                           |
| `spec/README.md`                                                                                        | Add the proposed Contract directory to the layout/navigation when the new normative files are adopted                               |
| `authority/authority-manifest.yaml`                                                                     | Assign new Contract/Profile/check specification files to `normative-meaning` and their schemas to `json-structure`                  |
| `registries/requirements.yaml`                                                                          | Allocate new design, admission, computation and check requirements once clauses are reviewed                                        |
| `registries/public-contract-surfaces.yaml`                                                              | Register new versioned surfaces; inspect whether enclosing Record/report surfaces also change                                       |
| `registries/interpretation-bundles.yaml`                                                                | Bind exact new profile, schema, check and policy versions; preserve old bundle entries                                              |
| `registries/public-checks.yaml`                                                                         | Register supported quantities, estimands, confidence level if any, and justified comparisons                                        |
| `registries/reason-codes.yaml`                                                                          | Register only justified new failure semantics after ordering review                                                                 |
| `conformance/fixtures/release-4/` and `conformance/expectations/release-4-expectations.yaml` (proposed) | Independent expected judgments and boundary cases, conditional on final conformance layout                                          |

Reference implementation destinations and generated views are assigned only after
final architecture reconciliation; this draft does not fabricate an executable
implementation plan from an unsettled graph. The concrete paths above resolve
part of the former class-only inventory gap, not every final artifact allocation.

## Existing requirement constraints

| Existing file                                | Registered requirements                                        | Treatment in this proposal                                                                               |
| -------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `spec/versioning/interpretation-bundle.md`   | NRS-VERSION-0003 (CORE), NRS-VERSION-0004 (STABLE-INTENT)      | Reuse exact declared bundle and pinned version combination; no reinterpretation                          |
| `spec/versioning/multi-bundle-dispatch.md`   | NRS-VERSION-0005/0007 (CORE), NRS-VERSION-0008 (STABLE-INTENT) | Preserve exact dispatch, no fallback and bundle-independent routing                                      |
| `spec/versioning/multi-bundle-dispatch.md`   | NRS-CORE-0010 (CORE), NRS-VERSION-0006 (STABLE-INTENT)         | Preserve old surface meanings and pinned conformance results                                             |
| `spec/versioning/public-check-versioning.md` | NRS-VERSION-0009 (CORE)                                        | New comparison semantics require new check/bundle versions; no edits to old comparisons                  |
| `spec/verification/verifier-refusal.md`      | NRS-CORE-0011 and NRS-VERIFY-0018 (STABLE-INTENT)              | Preserve distinct refusal and schema-valid output; inspect output-schema impact                          |
| `spec/verification/verifier-refusal.md`      | NRS-SEC-0004 (CORE), NRS-SEC-0005 (EXPERIMENTAL)               | Preserve safety failure separation and resource evidence                                                 |
| `spec/verification/public-checks.md`         | NRS-VERIFY-0005 and NRS-CORE-0012 (CORE)                       | Preserve conformance/verification distinction and resource/numerical distinction                         |
| `spec/verification/public-checks.md`         | NRS-VERIFY-0008 (EXPERIMENTAL)                                 | Existing Welch-specific meaning stays Welch-specific; new factorial checks do not generalize it in place |

These are identified constraints, not an exhaustive affected-ID certification.
Inspect strict-input, canonicalization, report and profile requirements in the
final architecture as well. New requirement IDs remain unallocated under the
ID policy; the draft enumerates their intended subjects instead of inventing IDs.

## Schema and identity decisions still required

Recommend additive, versioned factorial surfaces, with no edits to historical
Welch schemas or old bundle meanings. Whether a new enclosing Record/report
schema is needed cannot be decided from a profile sketch. The final surface
inventory records every new and affected schema version before R4-P5 closure.
New Contract, Profile, schema, Public Check and bundle identifiers use the
`https://nomue.ai/id/<family>/<name>/<revision>` minting grammar of
[ID-POLICY](../../ID-POLICY.md) and
[ADR-0032](../../decisions/ADR-0032-contract-identity-and-capability-requirement-namespaces.md).
Existing `urn:nomue:*` identifiers remain immutable and are not aliases of new
identifiers. The registry discipline reused here is exact-version binding,
not legacy identifier spelling. No candidate identifier is issued here and
no Release 2/3 candidate spelling is automatically reused. Any needed change to refusal outputs is evaluated as the
verifier output contract, which is independent of a selected bundle.

Proposed new factorial-specific material remains a candidate for EXPERIMENTAL.
Preserving an existing CORE constraint does not by itself change its tier or
force a CORE semantic amendment. Conversely, changing its meaning requires the
applicable CORE process. Final tier and discussion window need the complete
clause/ID impact assessment, so neither is declared resolved here.

Authoring assistance: OpenAI Codex in the existing task context. No independent review of the new inventory additions or final R4-P5 closure
is claimed.

## Contract/Profile allocation and additional constraints

The revised path table proposes Contract ownership for operation semantics
and Profile ownership for contextual declarations. This replaces the older
Profile-only placement recommendation, not any issued file or identifier.
Under ADR-0032, the Analysis Contract owns the bounded analytical operation;
a Profile may bind its application context and declarations, while a Public Check
owns recomputation/comparison procedure identity. Independently review this proposed allocation before accepting the path table. Contract/Profile namespace
tokens are registered in `registries/requirements.yaml` before issuing IDs.
The Contract paths are now concrete proposals; no path has been created under
`spec/`, and no token or new requirement is allocated.

Additional existing clauses inspected in the self-audit:

| Owner                                | Requirement and tier                              | Assessment                                                                                                                  |
| ------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `spec/core/versioning-principles.md` | NRS-VERSION-0002, CORE                            | Preserve failure on unsupported tuples; exact registration is required                                                      |
| `spec/verification/public-checks.md` | NRS-VERIFY-0006, EXPERIMENTAL                     | Existing Phase 1 integrity check; assess successor applicability without expanding its historical scope in place            |
| Same owner                           | NRS-VERIFY-0007 and NRS-VERIFY-0009, EXPERIMENTAL | Existing ITGC precondition and comparison clauses; define successor checks and their scope explicitly                       |
| Same owner                           | NRS-SEC-0002, CORE                                | Preserve no Record-supplied code execution; research probe code is never Record-executable payload                          |
| Same owner                           | NRS-SEC-0003 and NRS-SEC-0006, EXPERIMENTAL       | Existing bounded-input/time/memory context; derive new workload limits, do not copy numeric ceilings as accuracy guarantees |

The proposed schema filename is a placement placeholder: final versioned paths,
IDs and supersession records remain part of the surface assessment. The proposed
release-named conformance directory is a possible new grouping convention, not
an established repository pattern. For reused enclosing surfaces, explicitly
inspect whether `applies_to_bundle_ids` entries need additive changes in
`registries/public-contract-surfaces.yaml`; preserve their old bundle meanings.
Canonicalization, strict-input, report and final Contract/Profile clauses remain
a final crosswalk task. This added coverage is still not R4-P5 closure.

## Clause subjects to resolve before final ID allocation

These subjects turn the placement recommendation into reviewable work. They are
not registered Requirement IDs, and do not complete the affected-ID assessment.

| Proposed owner                          | Clause subjects needing final wording                                                                                                                                         | Boundary to preserve                                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Contract design and estimands           | Factor and level ordering; population targets versus sample estimates; full-model hypothesis definitions and normalization                                                    | No software-default ordering, causal assertion or silent interaction rescaling                         |
| Contract admissibility                  | Four explicit cells, common admitted count, unit membership; the mathematical model premises required by the operation                                                        | Checkable data conditions are separate from scientific assumptions that cannot be proved from a Record |
| Contract calculation                    | Mathematical quantities, degrees of freedom and permitted result domain                                                                                                       | No runtime graph or tail algorithm selected by this placement                                          |
| Profile declarations and non-claims     | Application context, exact Contract binding and the producer's declaration that the Contract-defined premises apply to this analysis                                          | No second operation identity or guarantee beyond the bound Contract                                    |
| Public Check specification and registry | Recomputable quantities, projection/comparison rule, check version, admitted execution and failure ordering                                                                   | Tolerances are check-owned; they are never producer-selected Record values                             |
| Coupled schemas and fixtures            | Successor Record schema owns the direct JSON Contract-identity binding; claim-object fields, exact version binding, report/refusal shape and independently justified fixtures | No reinterpretation of historical bundles or reference-generated truth alone                           |

The Contract defines the model premises and target, protected-family, error-criterion
and result-class meanings if retained. The Profile owns the applicability
declaration, referring to those premises without redefining them. A declaration
is not evidence that the premises hold. The successor Record schema owns their
JSON representation, including direct Contract identity binding under ADR-0032;
field spellings and any conditional R3 reuse remain unsettled. This separates
mathematical meaning, applicability assertion and structural representation.

Before R4-P5 closure, replace these subjects with exact proposed clauses and their
Requirement-ID treatment under the ID policy, finish the enclosing schema/report
and strict-input crosswalk, and identify the highest actually affected tier.
Final candidate identifier spelling and namespace registration remain coupled
review work; this informative table does not bypass the RFC draft requirements.
