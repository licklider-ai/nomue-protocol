# Release 5 authority and surface impact

Status: informative pre-opening inventory. This document allocates no Requirement
ID, path, registry entry, schema identifier, check or bundle. Candidate owners below
must be replaced by exact issued surfaces before adoption.

## Chosen semantic split

Release 5 adds four cross-cutting Protocol concepts:

1. a Design Declaration Envelope that deterministically projects Profile-owned
   declaration truth carriers into common cross-family terms through explicit,
   versioned per-Profile mappings;
2. a required selection-timing status owned by a successor Record surface;
3. a successor eleven-item non-claim boundary; and
4. a common inspectable verification-report evidence view.

Issued conformance owns bundle and Profile identities. Contract identity depends
on each family's separately accepted successor schema; it is not an alias of legacy
`method_id`. The selected Profile owns admissibility, and existing integrity and
exact bundle dispatch remain unchanged.
R5 consumes those results. The selection policy, recommendation algorithm and
question sequence remain Layer 2 product technology and receive no Protocol
authority.

## Candidate owner matrix

| Meaning or surface                             | Candidate authority                                           | Change form                            | Stability hypothesis                      |
| ---------------------------------------------- | ------------------------------------------------------------- | -------------------------------------- | ----------------------------------------- |
| Projection, mapping tables and non-claims      | One new cross-cutting specification                           | Additive; no second declaration store  | STABLE-INTENT                             |
| Family-specific declarations and admissibility | Existing or separately accepted Profile specifications        | Reference or additive successor only   | Owning Profile tier                       |
| Timing representation                          | R5 Record addition: timing and identity references only       | Additive; legacy schemas unchanged     | EXPERIMENTAL until promoted               |
| Cross-family consistency check                 | New Public Check with `consistency_only` calculation evidence | Additive                               | Check-owned under governing specification |
| Supported tuple combinations                   | New interpretation-bundle entries                             | Additive                               | Bundle-owned                              |
| Common report evidence view                    | New additive report-schema version and reason codes           | Additive; old report schemas unchanged | Schema/registry-owned                     |
| Interoperability evidence                      | New conformance fixtures and pinned expectations              | Additive                               | Test-owned                                |

No identifier is reserved by this inventory. The projected-fact and timing clauses
fit `NRS-CORE`, and the check fits `NRS-VERIFY`; no new Requirement-ID prefix is
needed. There is no `selection-policy` identifier family, policy registry, policy ADR,
`vocabulary.yaml` policy term or policy authority-manifest target.

## Existing authority preserved

- `NRS-VERSION-0005`, `NRS-VERSION-0007` and `NRS-VERSION-0008` continue to own exact
  bundle dispatch and unsupported-bundle failure.
- `NRS-CORE-0008` and `NRS-VERIFY-0011` continue to own verification-report
  separation and exact Record reference.
- `NRS-CORE-0009` is not edited. Any added non-claim is a successor clause scoped to
  selection evidence.
- Issued bundle and Profile carriers are reused. A Contract carrier comes from the
  applicable family's separately accepted successor schema; the two-group family
  has none issued. The R5 check adds no competing identity field.

## Declaration ownership rule

The common envelope stores no independent declaration. It is a deterministic
projection over one truth carrier in the owning Profile's versioned declaration
surface, including any separately accepted successor of that same surface. One cross-cutting specification owns the explicit,
versioned mapping table for each participating Profile version. It may expose only
outcome type, experimental-unit structure, independent/paired relationship, group or
condition count, pairing-identity presence, repeated/clustered presence and
analysis-population status, not a population identifier. Timing status is its sole non-Profile input and is
owned by the successor Record schema. The R5-specific Record addition contains
only timing and identity references. Missing design-fact carriers go into the owning
Profile's versioned declaration surface and its version-specific projection table.

A Profile continues to own the source facts and family-specific semantics, including
variance structure, exact pair admissibility, flattened-design exclusions,
multiplicity, missingness and numerical preconditions.

## Verification boundary

The proposed cross-family check establishes consistency among:

- the referenced Record revision;
- the envelope projection and its Profile-owned truth carriers;
- the tuple supplied by conformance to the applicable accepted family schema;
- the selected Profile's admissibility evidence; and
- the exact declared timing status repeated in the check evidence.

The check declares `depends_on` for Profile admissibility. It consumes that result
and does not rerun or overrule the Profile's judgment.

Executed results emit projection values and exact Profile source paths, mapping
identifier and version, timing, consumed tuple identities and exact depended-on
admissibility result. Blocked and errored outcomes follow the RFC's
[Common verification-report view](opening-rfc-candidate.md#common-verification-report-view):
no computed projection after conformance failure or a blocked dependency, and no
invented evidence on error.

All results retain the RFC's
[eleven-item non-claim boundary](opening-rfc-candidate.md#non-claim-boundary),
including no declarant authentication or scientific classification claim.

## Product boundary

The Protocol does not receive or disclose the product's recommendation rules,
preference model, question sequence, ranking, telemetry or policy-improvement data.
Opaque extra-Record provenance, attribution, attestation and approver identity are
excluded from the first slice.

## Compatibility and migration hypothesis

The initial migration is opt-in through a successor Record schema and newly issued
bundles. Legacy Records acquire no default declarations or timing status. Existing
bundles keep their exact allowed-check sets. Existing report
schemas and reason codes retain their meaning.

A producer adopting Release 5 uses the applicable Profile-owned declaration
surface, exposes its defined projection, records one selected tuple and uses an
issued R5-aware bundle. Every participating family needs a successor Record schema
for timing; any missing design fact separately requires a versioned successor of
its owning Profile's declaration surface. Historical Records
are not automatically converted.

## Inventory gaps before R5-P5 can close

- exact specification paths and clause subjects;
- Requirement-ID namespace treatment and successor non-claim wording;
- exact projection definitions;
- successor Record and report schema identifiers;
- exact check identifier, applicability, `depends_on` relation and failure ordering;
- reason-code registry entries for projection-mapping or emitted-evidence mismatch;
- exact interpretation-bundle additions and allowed-check lists;
- exact per-Profile version mapping tables and common report-view encoding;
- migration note and conformance fixture identities; and
- reconciliation against the separately accepted Contract and bundle for all three
  families.

Until those items are fixed and reviewed, R5-P5 remains `OPEN`.
