# Identifier Policy

This policy governs Requirement IDs and all other stable public identifiers of
the nomue Protocol. The nomue Record Specification (NRS) is the Protocol's
sub-specification for Record structure and Record-level semantics; NRS
Requirement IDs remain one identifier class governed here.

## Namespaces

Requirement IDs end in a four-digit numeric sequence. Cross-cutting
namespaces keep their existing fixed prefixes:

| Namespace     | Subject                                           |
| ------------- | ------------------------------------------------- |
| `NRS-GOV`     | Governance and authority                          |
| `NRS-CORE`    | Core Record semantics and layer boundary          |
| `NRS-VERIFY`  | Verification semantics and verifier behavior      |
| `NRS-CANON`   | Canonicalization                                  |
| `NRS-ATTEST`  | Attestation                                       |
| `NRS-EXT`     | Extensions                                        |
| `NRS-SEC`     | Security                                          |
| `NRS-VERSION` | Versioning and snapshots                          |
| `NRS-INTEROP` | Interoperability                                  |
| `NRS-PROV`    | Provenance (input/execution/output/relationships) |
| `NRS-EMIT`    | Emitter (third-party Record-producer) conformance |
| `NRS-APPROVE` | Human approval (first increment, draft)           |

Capability-scoped Analysis Contract and Profile requirements use one
extensible grammar:

```text
NRS-CONTRACT-<TOKEN>-<NNNN>
NRS-PROFILE-<TOKEN>-<NNNN>
```

`TOKEN` is an uppercase ASCII allocation token. It begins with `A-Z`, contains
only `A-Z` or `0-9`, and is 2 through 12 characters long. The complete prefix
(for example `NRS-PROFILE-ITGC`) is present in the namespace list of
[../registries/requirements.yaml](../registries/requirements.yaml) before any
Requirement ID using it is issued. An allocated token is issued once and is
never reused for a different Contract or Profile meaning.

`NRS-PROFILE-ITGC` is the existing Independent Two-Group Continuous Profile
namespace. Its historical meaning and issued IDs are unchanged; the fact that
its spelling conforms to the extensible Profile grammar creates no migration or
aliasing semantics.

The requirement registry is the authoritative allocation list. The meta-schema
validates the fixed cross-cutting prefixes and the extensible Contract/Profile
grammar; adding another capability token does not require another meta-schema
grammar branch.

## Rules

1. **Issued once, never changed.** An ID, once published, keeps its meaning
   permanently.
2. **Never reused.** A retired ID is never assigned to a different meaning.
3. **Tombstones.** A withdrawn requirement stays in the registry with status
   `withdrawn`; it is never deleted, and registry history is never rewritten.
4. **Wording change is not ID change.** Editorial rewording that preserves
   meaning keeps the ID. A change that breaks the meaning issues a **new ID**;
   the old entry records `superseded_by` and the new entry records
   `supersedes`.
5. **Registry and document stay bound.** Every active ID resolves to exactly
   one anchor (`<a id="NRS-..."></a>`) in exactly one normative document, and
   every anchor resolves to a registry entry. Orphans in either direction fail
   validation.
6. **No foreign authority schemes.** Identifiers from other projects' authority
   systems are never imported, and no parallel identifier scheme is introduced
   for material this registry covers.

## Repository and governance identifiers

Gate IDs (`R1-NN`), authority-manifest target IDs, registry names, public
contract surface IDs (`NRS-PCS-NNNN`), and conformance fixture and
canonicalization vector IDs are repository-governance identifiers. They follow
the same rules: issued once, never reused, tombstoned rather than deleted. A
fixture or vector whose expected judgment inverts gets a new ID; the old ID is
retired, not repurposed.

## Protocol semantic identifiers

The Protocol also issues stable semantic identifiers whose meaning is fixed by
the published snapshot, registries, and normative documents that bind them.
The families currently in use under the legacy pre-release `urn:nomue:*`
namespace are: `schema`, `bundle`, `profile`, `method`, `check`,
`canonicalization`, `signature-suite`, `attestation-statement`,
`approval-statement`, `attestation-key`, `release-key`, and the verifier's
`unidentified` sentinel. These identifiers follow rules 1-4 above: issued
once, never reused, superseded rather than edited, tombstoned rather than
deleted.

The recognized successor family `contract` identifies an Analysis Contract or
other bounded Protocol Contract whose normative documents own the operation's
semantics. Successor analytical schemas bind that Contract identity directly
when they need to identify the analytical operation. A new `method` identifier
is not minted merely as a second identifier for the same Contract meaning.
Existing `urn:nomue:method:*` identifiers remain immutable and retain their
historical meaning inside the schemas and bundles that bind them. The `method`
family is not removed; a future new use requires a semantic role distinct from
an existing Contract or Public Check rather than serving as an alias.

Public Check identifiers remain the identity of versioned verification
procedures. Contract identity, Public Check identity, and implementation/library
identity are distinct and are never substituted for one another.

### Future minting grammar

Protocol-issued identifiers minted from now on use:

```text
https://nomue.ai/id/<family>/<name>/<revision>
```

Canonical lexical form - a newly minted identifier is well-formed only if all
of the following hold:

- the scheme is exactly `https` and the host is exactly `nomue.ai`;
- the path starts with exactly `/id/`;
- there is no userinfo, no explicit port, no query, and no fragment;
- there is no percent-encoding, no `.` or `..` path segment, no empty path
  segment, and no trailing slash;
- `family` and `name` are lowercase ASCII kebab-case;
- `revision` is an opaque ASCII version token owned by the family's
  versioning policy (SemVer is not imposed across families).

One identifier has exactly one canonical spelling. Protocol processing
compares identifiers by exact string identity; URI-normalization equivalence
(case folding, port elision, dot-segment removal, percent-decoding) is never
used to treat two spellings as the same identifier.

Recognized families are the legacy families above plus additive families adopted
through governance decisions, including `contract` from ADR-0032. A family token,
once adopted, is never reused for another meaning.

### Identifier / locator separation

An HTTPS-shaped identifier is an identifier, not a locator. The `https`
scheme does not make dereference part of Protocol interpretation: DNS
results, HTTP availability or status, redirect targets, and retrieved
representations do not define an identifier's meaning. Implicit dereference
by a verifier remains prohibited by NRS-CORE-0004; this policy adds no new
meaning to that clause.

### Legacy coexistence and migration

Existing `urn:nomue:*` identifiers are immutable legacy identifiers: they
are never reused, they keep their meaning inside the historical and current
legacy bundles, schemas, and snapshots that reference them, and they are not
aliases of any future HTTPS identifier. Migration never happens by in-place
replacement, silent reinterpretation, or accepting an old and a new
identifier interchangeably inside the same bundle. It happens through new
identifiers, successor versioned surfaces and schemas where applicable, a
successor interpretation bundle, and explicit compatibility or supersession
evidence.

For analytical operation identity specifically, a successor schema may bind a
Contract identifier directly while a legacy schema continues to carry its
historical `method_id`. The two strings are not aliases and a verifier accepts
each only through the exact schema/bundle that defines it.

### Persistence

An issued identifier is never reassigned to a different meaning. Meaning is
fixed by the published Protocol authority and snapshot that issued the
identifier, not by current web content, and HTTP availability is never a
verification dependency. Loss of control over the `nomue.ai` domain freezes
new minting until the governance/security incident is resolved; it never
reinterprets historical identifiers.

### Design rationale

The base identifier architecture and coexistence model are recorded in
[decisions/ADR-0031-nomue-ai-identifier-architecture.md](decisions/ADR-0031-nomue-ai-identifier-architecture.md).
The Contract-identity and capability-scoped Requirement-namespace decision is
recorded in
[decisions/ADR-0032-contract-identity-and-capability-requirement-namespaces.md](decisions/ADR-0032-contract-identity-and-capability-requirement-namespaces.md).
The binding rules themselves are the ones stated in this policy.

## Instance and producer-assigned identifiers

Identifiers assigned per instance by a Record producer or an external system -
`record_id`, `revision_id`, `dataset_id`, `design_id`, `analysis_id`,
`result_id`, `observation_id`, `experimental_unit_id`, `group_id`,
`approver_id`, `attestation_id`, `assertion_id`, and similar - are not
Protocol-issued and are outside the namespace grammar above. They obey only
the syntactic constraints of the applicable schemas and profiles; nothing
requires them to live under any nomue-controlled namespace.
