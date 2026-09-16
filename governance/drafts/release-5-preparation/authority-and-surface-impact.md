# Release 5 authority and surface impact

Status: informative pre-opening inventory. This document allocates no Requirement
ID, path, registry entry, schema identifier, check or bundle. Candidate owners below
must be replaced by exact issued surfaces before adoption.

## Chosen semantic split

Release 5 adds two cross-cutting Protocol concepts:

1. a Design Declaration Envelope that deterministically projects Profile-owned
   declaration truth carriers into common cross-family terms; and
2. an integrity-bound reference to exactly one finalized selected
   Contract/Profile/bundle tuple.

The selected Profile owns admissibility. Exact bundle dispatch remains unchanged.
The selection policy, recommendation algorithm and question sequence remain Layer 2
product technology and receive no Protocol authority.

## Candidate owner matrix

| Meaning or surface                              | Candidate authority                                    | Change form                            | Stability hypothesis                      |
| ----------------------------------------------- | ------------------------------------------------------ | -------------------------------------- | ----------------------------------------- |
| Design Declaration Envelope projection          | New cross-cutting specification                        | Additive; no second declaration store  | STABLE-INTENT                             |
| Finalized selected-tuple binding and non-claims | New cross-cutting specification                        | Additive                               | STABLE-INTENT                             |
| Family-specific declarations and admissibility  | Existing or separately accepted Profile specifications | Reference or additive successor only   | Owning Profile tier                       |
| Record representation                           | New closed successor Record schema                     | Additive; legacy schemas unchanged     | EXPERIMENTAL until promoted               |
| Binding consistency check                       | New `consistency_only` Public Check and registry entry | Additive                               | Check-owned under governing specification |
| Supported tuple combinations                    | New interpretation-bundle entries                      | Additive                               | Bundle-owned                              |
| Verification result representation              | New additive report-schema version and reason codes    | Additive; old report schemas unchanged | Schema/registry-owned                     |
| Interoperability evidence                       | New conformance fixtures and pinned expectations       | Additive                               | Test-owned                                |

No Requirement namespace or identifier is reserved by this inventory. There is no
`selection-policy` identifier family, policy registry, policy ADR,
`vocabulary.yaml` policy term or policy authority-manifest target.

## Existing authority preserved

- `NRS-VERSION-0005`, `NRS-VERSION-0007` and `NRS-VERSION-0008` continue to own exact
  bundle dispatch and unsupported-bundle failure.
- `NRS-CORE-0008` and `NRS-VERIFY-0011` continue to own verification-report
  separation and exact Record reference.
- `NRS-CORE-0009` is not edited. Any added non-claim is a successor clause scoped to
  selection evidence.
- Existing Contract, Profile and bundle identity fields remain the sole tuple
  identities. The successor binding references them rather than restating copies.

## Declaration ownership rule

The common envelope stores no independent declaration. It is a deterministic
projection over one truth carrier owned by a Profile or its separately accepted
successor declaration schema. It may expose only outcome type, experimental-unit
structure, independent/paired relationship, group or condition count,
pairing-identity presence, repeated/clustered presence, analysis-population identity
and timing status.

A Profile continues to own the source facts and family-specific semantics, including
variance structure, exact pair admissibility, flattened-design exclusions,
multiplicity, missingness and numerical preconditions.

## Verification boundary

The proposed binding check establishes consistency among:

- the referenced Record revision;
- the envelope projection and its Profile-owned truth carriers;
- exactly one selected tuple through existing identity carriers;
- the selected Profile's admissibility evidence; and
- the exact declared timing status repeated in the check evidence.

The check declares `depends_on` for Profile admissibility. It consumes that result
and does not rerun or overrule the Profile's judgment.

It does not prove declaration truth, authorization, preregistration, selection
policy identity, selection quality, uniqueness, optimality, assumption truth, causal
validity, numerical correctness or whole-project validity.

## Product boundary

The Protocol does not receive or disclose the product's recommendation rules,
preference model, question sequence, ranking, telemetry or policy-improvement data.
An opaque provenance reference may identify a product-side selection event, but the
check assigns no portable meaning to the private procedure behind it.

## Compatibility and migration hypothesis

The initial migration is opt-in through a successor Record schema and newly issued
bundles. Legacy Records acquire no default declarations, tuple binding or timing
status. Existing bundles keep their exact allowed-check sets. Existing report
schemas and reason codes retain their meaning.

A producer adopting Release 5 uses the applicable Profile-owned declaration
surface, exposes its defined projection, records one selected tuple and uses an
issued R5-aware bundle. A successor schema is needed where an owning family lacks a
required truth carrier, not to create a duplicate envelope store. Historical Records
are not automatically converted.

## Inventory gaps before R5-P5 can close

- exact specification paths and clause subjects;
- Requirement-ID namespace treatment and successor non-claim wording;
- exact projection definitions;
- successor Record and report schema identifiers;
- exact check identifier, applicability, `depends_on` relation and failure ordering;
- reason-code registry entries for incomplete declarations, tuple identity mismatch,
  inadmissibility dependency failure and evidence mismatch;
- exact interpretation-bundle additions and allowed-check lists;
- optional opaque provenance-reference meaning, or its exclusion;
- migration note and conformance fixture identities; and
- reconciliation against the separately accepted Contract and bundle for all three
  families.

Until those items are fixed and reviewed, R5-P5 remains `OPEN`.
