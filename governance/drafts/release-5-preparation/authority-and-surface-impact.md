# Release 5 authority and surface impact

Status: informative pre-opening inventory. This document allocates no Requirement
ID, path, registry entry, schema identifier, check or bundle. Candidate owners below
must be replaced by exact issued surfaces before adoption.

## Chosen semantic split

Release 5 adds two cross-cutting concepts:

1. a Design Declaration Envelope that deterministically projects Profile-owned
   declaration truth carriers into common cross-family terms; and
2. a registered Selection Policy mapping that projection, an exact Contract
   preference when present and a closed candidate set to zero, one or multiple exact
   Contract/Profile/bundle tuples.

Exactly one result is required for a successful selection. Profile admissibility is
then evaluated by the selected Profile against the declarations it owns. Exact
bundle dispatch remains unchanged and occurs through existing identity carriers.

## Candidate owner matrix

| Meaning or surface                              | Candidate authority                                    | Change form                            | Stability hypothesis                         |
| ----------------------------------------------- | ------------------------------------------------------ | -------------------------------------- | -------------------------------------------- |
| Design Declaration Envelope projection          | New cross-cutting specification                        | Additive; no second declaration store  | STABLE-INTENT                                |
| Selection Policy meaning and exact-one result   | New cross-cutting specification                        | Additive                               | STABLE-INTENT                                |
| `selection-policy` identifier family            | New identifier ADR and `vocabulary.yaml` term          | Additive                               | ADR/registry-owned                           |
| Registered policy identities and candidate sets | New registry authority target                          | Additive                               | Registry-owned under governing specification |
| Policy authority discovery                      | New authority-manifest target                          | Additive                               | Manifest-owned                               |
| Family-specific declarations and admissibility  | Existing or separately accepted Profile specifications | Reference or additive successor only   | Owning Profile tier                          |
| Record representation                           | New closed successor Record schema                     | Additive; legacy schemas unchanged     | EXPERIMENTAL until promoted                  |
| Selection consistency check                     | New `consistency_only` Public Check and registry entry | Additive                               | Check-owned under governing specification    |
| Supported policy/tuple combinations             | New interpretation-bundle entries                      | Additive                               | Bundle-owned                                 |
| Verification result representation              | New additive report-schema version and reason codes    | Additive; old report schemas unchanged | Schema/registry-owned                        |
| Selection non-claims                            | New successor clause                                   | Additive; no edit to `NRS-CORE-0009`   | STABLE-INTENT unless CORE meaning changes    |
| Interoperability evidence                       | New conformance fixtures and pinned expectations       | Additive                               | Test-owned                                   |

No Requirement namespace or identifier is reserved by this inventory. Candidate
names remain placeholders until the exact impact review proves that each subject has
one authority and no conflicting owner.

## Existing authority preserved

- `NRS-VERSION-0005`, `NRS-VERSION-0007` and `NRS-VERSION-0008` continue to own exact
  bundle dispatch and unsupported-bundle failure. Selection Policy does not create
  fallback dispatch.
- `NRS-CORE-0008` and `NRS-VERIFY-0011` continue to own verification-report
  separation and exact Record reference.
- `NRS-CORE-0009` is not edited. Any added non-claim is a successor clause scoped to
  selection evidence.
- Existing Contract, Profile and bundle identity fields remain the sole tuple
  identities. The successor selection surface references them rather than restating
  independent copies.

## Declaration ownership and policy composition rule

The common envelope stores no independent declaration. It is a deterministic
projection over one truth carrier owned by a Profile or its separately accepted
successor declaration schema. The projection may expose only structural facts needed
by more than one family: outcome type, experimental-unit structure,
independent/paired relationship, group or condition count, pairing-identity
presence, repeated/clustered presence, analysis-population identity, timing status
and an optional exact Contract preference.

A Profile continues to own both the source facts and family-specific semantics,
including variance structure, exact pair admissibility, flattened-design exclusions,
multiplicity, missingness and numerical preconditions. A policy candidate predicate
is composed from references to the applicable Profile's published cross-family
conditions. Registry validation rejects missing, copied or inconsistent predicate
definitions before the policy can be issued.

## Verification boundary

The proposed selection check establishes consistency among:

- the referenced Record revision;
- the envelope projection and its Profile-owned truth carriers;
- the exact registered policy and candidate set;
- the exact-one policy result;
- existing tuple identity carriers; and
- Profile-owned admissibility evidence; and
- the exact declared timing status repeated in the check evidence.

The check declares `depends_on` for Profile admissibility. It consumes that result
and does not rerun or overrule the Profile's judgment.

It does not prove declaration truth, authorization, preregistration, policy
optimality, assumption truth, causal validity, numerical correctness or whole-project
validity. These exclusions belong in an additive successor clause and check scope.

## Compatibility and migration hypothesis

The initial migration is opt-in through a successor Record schema and newly issued
bundles. Legacy Records neither acquire default declarations nor become subject to a
Selection Policy. Existing bundles keep their exact allowed-check sets and cannot
silently accept the new check. Existing report schemas and reason codes retain their
meaning.

A producer adopting Release 5 uses the applicable Profile-owned declaration surface,
selects an exact registered policy, exposes its defined envelope projection and uses
an issued R5-aware bundle. A successor schema is needed where an owning family lacks
a required truth carrier, not to create a duplicate envelope store. There is no
automatic conversion claim for historical Records because missing declarations
cannot be reconstructed safely from values or labels.

## Inventory gaps before R5-P5 can close

- exact specification paths and clause subjects;
- Requirement-ID namespace treatment and successor-clause wording;
- exact projection definitions and policy registry schemas;
- ADR adoption for the `selection-policy` identifier family;
- `vocabulary.yaml` terminology and the authority-manifest target;
- policy canonicalization and integrity binding;
- successor Record and report schema identifiers;
- exact check identifier, applicability, dependencies and failure ordering;
- reason-code registry entries for zero result, multiple result, identity mismatch,
  incomplete declaration and policy mismatch;
- exact interpretation-bundle additions and allowed-check lists;
- migration note and conformance fixture identities; and
- reconciliation against the separately accepted Contract and bundle for all three
  families.

Before public opening, the steward must also decide whether registered Selection
Policies enter the Charter's irrevocable royalty-free public Protocol surface. This
inventory does not assume that publication decision.

Until those items are fixed and reviewed, R5-P5 remains `OPEN`.
