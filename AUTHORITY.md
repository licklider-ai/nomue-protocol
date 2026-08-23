# Authority Model

This document defines where authority lives in the nomue Protocol repository, how
artifact classes relate, how authoritative and normative roles differ, and how
conflicts between authoritative artifacts are handled.

[authority/authority-manifest.yaml](authority/authority-manifest.yaml) is the
exhaustive authoritative assignment of targets to artifacts.

[generated/AUTHORITY-INDEX.md](generated/AUTHORITY-INDEX.md) is the
non-authoritative human-readable view generated from that manifest (`pnpm generate`).
Tooling validates the manifest structure and generated-view drift
(`pnpm check:generated`). This document does not duplicate the exhaustive
assignment list.

## Protocol authority model

The **nomue Protocol** is the umbrella public specification system. Protocol
authority is not concentrated in a single document; it is assigned by subject
(target), and each authoritative artifact is authoritative only for the target
assigned to it in the authority manifest.

- [CHARTER.md](CHARTER.md) governs project mission, scope, non-goals, and
  non-claims.
- The **nomue Record Specification (NRS)** is the sub-specification of the nomue
  Protocol responsible for nomue Record structure and Record-level semantics.
  NRS normative documents under `spec/` govern the Record behavior assigned to
  them; other normative documents and material under `canonicalization/` govern
  the Protocol behavior assigned to them.
- Registries govern the registered identifiers, versions, vocabularies, and
  policies assigned to each registry target.
- Schemas govern the structural surfaces declared for their assigned targets.
- Conformance artifacts govern expected conformance judgments for the covered
  behavior assigned to them.
- Reference implementations demonstrate and execute the Protocol but do not
  define it.
- Layer 2 product implementations may implement, produce, or consume Protocol
  artifacts but do not define Protocol meaning.

## NRS within the Protocol

The nomue Record Specification (NRS) is the sub-specification of the nomue
Protocol responsible for nomue Record structure and Record-level semantics. NRS
is not the umbrella specification. Normative meaning for verification,
canonicalization, profiles, and versioning is assigned to the normative
documents and registries listed in the authority manifest, each within its
assigned target.

## Artifact classes

The authority manifest classifies every tracked artifact using the machine
model below. These are artifact-authority classifications, not semantic
normative status.

| Class             | Meaning                                                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authoritative** | An artifact that carries authority for one or more explicitly assigned targets according to the authority manifest. It is authoritative only for its assigned target(s).                                                        |
| **Informative**   | Explanation, motivation, or history. No authority over Protocol meaning or assigned targets.                                                                                                                                    |
| **Generated**     | Mechanically derived view. Never authority.                                                                                                                                                                                     |
| **Reference**     | Implementation or example guidance. Never Protocol authority.                                                                                                                                                                   |
| **Evidence**      | Record of observations, reviews, or decisions. May carry limited authority only when explicitly assigned to an allowed evidence/decision target, and only about what was observed or decided. Never normative Protocol meaning. |

In the manifest:

- `class: authoritative` artifacts carry authority only for explicitly assigned
  targets.
- `class: evidence` artifacts may carry limited observation/decision authority
  only when explicitly assigned to an allowed evidence/decision target (see
  below).
- `informative`, `generated`, and `reference` artifacts have no authority.
- Artifacts not classified in the manifest have no authority.

There is no parallel authority: no second artifact may claim authority over a
target already assigned in the manifest, inside or outside this repository.

## Authoritative versus Normative

**Authoritative** is an artifact-authority classification in the manifest.

**Normative** is a semantic status of binding specification content.

In `spec/` and `canonicalization/`:

- normative clauses use the keywords MUST / MUST NOT / SHOULD / SHOULD NOT / MAY,
- each binding clause is bound to exactly one Requirement ID,
- and the owning document must be `class: authoritative` in the manifest.

But:

- an authoritative registry may contain no normative prose,
- an authoritative schema may contain no Requirement keyword,
- authoritative [CHARTER.md](CHARTER.md) has a different authority role,
- and evidence never becomes normative merely because it is assigned to an
  evidence/decision target.

## Authority assignments

Exhaustive target → artifact assignment authority:

- [authority/authority-manifest.yaml](authority/authority-manifest.yaml)

Human-readable generated view (non-authoritative):

- [generated/AUTHORITY-INDEX.md](generated/AUTHORITY-INDEX.md)

Anything wishing to know the exact current target membership reads the manifest
or the generated index derived from it. This document does not restate that
list.

## Schema, registry, and conformance authority

Each authoritative artifact or limited-authority evidence artifact is
authoritative only within its assigned target:

- A **schema** is authoritative for its assigned structural target only.
- A **registry** is authoritative for its assigned registry target only.
- A **conformance artifact** is authoritative for expected conformance judgment
  within its covered behavior only.

None of them silently creates meaning outside its assigned target.

Informative note: conformance artifacts do not create general Protocol semantics
outside the behavior covered by their fixtures or vectors.

## Evidence authority

Evidence artifacts may appear in `targets[*].authoritative_artifacts` only for
targets whose subject is evidence or decision state. Current allowed targets:

- `phase-1-development-evidence`
- `phase-2a-development-evidence`
- `release-decision`

Evidence artifacts MUST NOT be used as authority for normative-meaning,
vocabulary, JSON structure, public checks, reason codes, version semantics, or
other Protocol-semantic targets.

Evidence class artifacts:

- do not define Protocol semantics,
- may record what was observed, what was decided, or the current evidence state
  only when assigned to an allowed target above,
- and never become normative-meaning authority.

Historical evidence bundles do not retroactively define Protocol meaning.

### Release-decision authority versus Protocol snapshot authority

The `release-decision` target answers whether a candidate may be published. It
is operational decision authority, not authority over the meaning of the
Protocol snapshot being evaluated.

For a Public Draft snapshot, an authoritative artifact participates in the
content-addressed Protocol snapshot only when it is assigned to at least one
target other than `release-decision`. An artifact assigned exclusively to
`release-decision` remains authoritative about release state but is excluded
from the Protocol snapshot hash. This boundary is defined by
[governance/RELEASE-POLICY.md](governance/RELEASE-POLICY.md) and ADR-0033.

This permits gate state to be recorded after a candidate is pinned without
mutating the Protocol meaning under review. It does not permit specification,
registry, schema, public documentation, or other candidate content to change
silently during gate closure.

## Reference implementations

Reference verifier, reference stats kernel, and other implementation code under
`reference/`:

- may implement normative procedures,
- may expose bugs or specification gaps,
- may provide executable evidence,

but:

- does not create Protocol meaning,
- does not resolve an ambiguity by its behavior,
- does not override normative specification, registry, schema, or conformance
  authority,
- and if implementation behavior requires semantics absent from the Protocol, the
  specification gap is resolved first (or recorded in a release gate).

Implementation technique is explicitly non-authoritative under `reference/`. This
is consistent with NRS-GOV-0006 in
[spec/core/authority-and-governance.md](spec/core/authority-and-governance.md).

## Layer 2 boundary

Layer 2 product implementations:

- may produce Records,
- may consume Records,
- may implement Protocol-defined calculations,
- may present verification results,
- may add product-only behavior outside Protocol scope.

Layer 2-specific implementation behavior is never authority for Layer 1 /
Protocol semantics. Product behavior not defined by the Protocol is not silently
elevated to Protocol-backed, conforming, or verified semantics.

## Conflict policy

When two authoritative artifacts disagree (for example, a registry entry and a
specification anchor, or a schema and a conformance expectation):

1. Neither artifact is automatically preferred. There is no implicit precedence
   order — not specification over schema, not schema over the verifier, nor any
   other ordering.
2. Validation fails and reports the conflict.
3. The conflict is treated as a release blocker until corrected at its source.
4. After correction, all derived artifacts and affected evidence are regenerated;
   stale evidence for affected gates is invalidated.

## Change coupling

A change to a normative clause is not complete until, in the same change set:

- the requirement registry entry (ID, stability, testability, references) is updated,
- affected schemas, conformance artifacts, and public-contract-surface entries are
  updated or explicitly marked as pending via a release gate, and
- generated views are regenerated (`pnpm generate`) with zero residual diff.

## Release invalidation

A change to candidate-frozen Protocol or public content after gate evidence was
produced invalidates the candidate and every gate whose evidence depends on that
content. A new candidate is pinned and affected evidence is regenerated.

After a candidate is pinned, changes confined to the explicitly permitted
release-decision/evidence paths in
[governance/RELEASE-POLICY.md](governance/RELEASE-POLICY.md) do not alter the
Protocol snapshot and do not invalidate the candidate merely by recording gate
review. Before publication, candidate-equivalence tooling must prove that no
other file or Protocol snapshot byte changed. Gate decisions are valid only for
the candidate against which their evidence was produced.

## Generated artifacts

Files under `generated/` are produced by `pnpm generate` from the sources named in
each file's header. They are never edited by hand, never cited as authority, and CI
fails if they drift from their sources (`pnpm check:generated`).

## Requirement traceability

Every normative clause is bound to exactly one Requirement ID registered in
[registries/requirements.yaml](registries/requirements.yaml), anchored in the owning
document as `<a id="NRS-..."></a>`. Tooling enforces that: every registry entry
resolves to exactly one anchor; every anchor resolves to a registry entry; orphans in
either direction fail validation.

## Private repository independence

The nomue Protocol repository is self-contained. It does not read, reference, embed,
or depend on private product repositories: no submodules, subtrees, symlinks, private
packages, private paths, or identifiers imported from private authority systems. An
automated audit (`tooling/src/private-dependency-audit.ts`) enforces this and failing
it blocks release.
