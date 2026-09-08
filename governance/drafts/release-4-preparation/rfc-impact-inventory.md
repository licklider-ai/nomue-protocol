# Release 4 candidate file and requirement impact inventory

Status: informative author proposal; independent review pending. This advances
R4-P5 but does not close it. Baseline is main `cd217f88238a2ecc57b72f5835a813d92270f5ad`
and the reviewed PR 219 input `bf4004694f68018534e01bde2f2a33214accba19`.
Existing requirements below were read in their owning specification files.
A requirement constraining a new feature is not automatically a requirement
whose meaning changes. No current normative wording is proposed to change here.

## Concrete proposed destinations

Paths labelled proposed do not exist or acquire authority through this document.
They are reviewable placement recommendations, conditional on the final scope
and successor architecture. No schema or public identifier is allocated.

| Path or existing owner                                                                                  | Proposed responsibility or impact                                                             |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `spec/profiles/balanced-two-factor/design-and-estimands.md` (proposed)                                  | Candidate A declarations, cell/level ordering, signed estimands and full-model boundary       |
| `spec/profiles/balanced-two-factor/admissibility.md` (proposed)                                         | Balance, replication, membership and supported input preconditions                            |
| `spec/profiles/balanced-two-factor/calculation.md` (proposed)                                           | Reviewed graph, residual df and computation-domain rules                                      |
| `spec/profiles/balanced-two-factor/non-claims.md` (proposed)                                            | Assumption declarations versus scientific validity, causality and familywise claims           |
| `spec/verification/factorial-recompute.md` (proposed)                                                   | Scoped result comparisons tied to newly registered public checks                              |
| `schemas/profiles/balanced-two-factor.schema.json` (proposed)                                           | Structural profile candidate; exact version and enclosing Record schema remain unresolved     |
| `authority/authority-manifest.yaml`                                                                     | Assign accepted new specification and schema files to existing targets                        |
| `registries/requirements.yaml`                                                                          | Allocate new design, admission, computation and check requirements once clauses are reviewed  |
| `registries/public-contract-surfaces.yaml`                                                              | Register new versioned surfaces; inspect whether enclosing Record/report surfaces also change |
| `registries/interpretation-bundles.yaml`                                                                | Bind exact new profile, schema, check and policy versions; preserve old bundle entries        |
| `registries/public-checks.yaml`                                                                         | Register supported quantities, estimands, confidence level if any, and justified comparisons  |
| `registries/reason-codes.yaml`                                                                          | Register only justified new failure semantics after ordering review                           |
| `conformance/fixtures/release-4/` and `conformance/expectations/release-4-expectations.yaml` (proposed) | Independent expected judgments and boundary cases, conditional on final conformance layout    |

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
Follow the existing bundle registry's identity scheme and bind exact versions;
no candidate identifier is issued here and no Release 2/3 candidate spelling is
automatically reused. Any needed change to refusal outputs is evaluated as the
verifier output contract, which is independent of a selected bundle.

Proposed new factorial-specific material remains a candidate for EXPERIMENTAL.
Preserving an existing CORE constraint does not by itself change its tier or
force a CORE semantic amendment. Conversely, changing its meaning requires the
applicable CORE process. Final tier and discussion window need the complete
clause/ID impact assessment, so neither is declared resolved here.

Authoring assistance: OpenAI Codex in the existing task context. No independent
review of this inventory or final R4-P5 closure is claimed.
