# ADR-0031: nomue.ai Identifier Architecture

**Status: Accepted** (identifier-architecture design decision, 2026-08-18).

## Problem

The Protocol currently mints its stable public identifiers under the
unregistered URN namespace `urn:nomue:*`. That namespace is not registered
with IANA, and registering it is not planned. The project needs a durable,
owner-controlled base for the identifiers it will mint in future releases,
a ratified grammar for minting them, an explicit persistence commitment,
and an explicit coexistence policy for the already-issued `urn:nomue:*`
identifiers - before any successor surface, key ceremony, or public
snapshot multiplies the set of identifiers that would otherwise need
transition handling.

This ADR ratifies the design only. It changes no identifier byte, no
schema, no registry entry, no verifier behavior, and no fixture. Migration
is a separate, versioned implementation decision.

## Current identifier inventory (mechanically extracted)

Protocol-issued stable identifier families in use under `urn:nomue:*` at
the time of this decision (extracted from `schemas/`, `registries/`,
`spec/`, `canonicalization/`, `reference/`, `conformance/`, `examples/`,
`governance/`, `security/`):

| Family                  | Role                                                     |
| ----------------------- | -------------------------------------------------------- |
| `schema`                | JSON Schema identity (`$id` / `$schema` values)          |
| `bundle`                | Interpretation-bundle identity (exact-dispatch key)      |
| `profile`               | Statistical profile identity                             |
| `method`                | Declared analysis / CI method identity                   |
| `check`                 | Public-check identity and version                        |
| `canonicalization`      | Canonicalization contract identity                       |
| `signature-suite`       | Attestation signature-suite identity                     |
| `attestation-statement` | Fixed attestation statement identity                     |
| `approval-statement`    | Fixed approval statement identity                        |
| `attestation-key`       | Trust-root key-generation identity (steward-minted)      |
| `release-key`           | Release-signing key-generation identity (steward-minted) |
| `unidentified`          | Verifier-minted sentinel for absent record/revision ids  |

Distinct from these, and **not** governed by this ADR's grammar, are
producer- and instance-assigned identifiers: `record_id`, `revision_id`,
`dataset_id`, `design_id`, `analysis_id`, `result_id`, `observation_id`,
`experimental_unit_id`, `group_id`, `approver_id`, `attestation_id`,
`assertion_id`, and similar per-instance values. These are assigned by the
Record producer or an external system, are constrained only by the
applicable schemas (for example, the generic URI shape of `record_id`),
and are never required to live under any nomue-controlled namespace. The
`urn:nomue:record:example:*` / `urn:nomue:revision:example:*` /
`urn:nomue:approver:*` strings that appear in fixtures are example
instance values, not a Protocol-issued family.

## Decision

### 1. Authority base and grammar

Protocol-issued stable identifiers minted after this decision use the
HTTPS base `https://nomue.ai/id/` with the grammar:

```text
https://nomue.ai/id/<family>/<name>/<revision>
```

Illustrative examples only - none of these is minted, registered, or used
by any artifact as of this decision:

- `https://nomue.ai/id/schema/record/0.3.0-draft.1`
- `https://nomue.ai/id/bundle/itgc-guarantee/0.3.0-draft.1`
- `https://nomue.ai/id/profile/itgc/0.3.0-draft.1`
- `https://nomue.ai/id/method/welch-two-sample-t/1`
- `https://nomue.ai/id/check/record-integrity/0.3.0-draft.1`
- `https://nomue.ai/id/canonicalization/jcs/0.3.0-draft.1`
- `https://nomue.ai/id/signature-suite/ed25519/1`

No IANA URN namespace registration is assumed or pursued.

### 2. Canonical lexical form

A Protocol-issued HTTPS identifier has exactly one canonical spelling,
minted once. The canonical form is:

- scheme exactly `https`; host exactly `nomue.ai`; path prefix exactly
  `/id/`;
- no userinfo, no explicit port, no query, no fragment;
- no percent-encoding, no `.` or `..` path segments, no empty path
  segment, no trailing slash;
- `family` and `name` in lowercase ASCII kebab-case;
- `revision` an opaque ASCII token owned by the family's versioning
  policy. SemVer is not imposed across families: both `1` (integer
  revisions such as method or suite identities) and `0.2.1-draft.1`
  (draft-versioned identities) remain expressible.

Protocol processing treats the minted canonical spelling as an exact
string identity, in the same way exact bundle dispatch works today
(NRS-VERSION-0005). No generic-URI normalization (case folding, port
elision, dot-segment removal, percent-decoding) is relied on to make two
spellings equivalent: two different strings are two different
identifiers. A lexical validator for minting is deferred to the first
migration implementation batch; this ADR fixes the rules the validator
will enforce.

### 3. Identifier, not locator

An HTTPS URI is used here as a durable identifier. Its use of the `https`
scheme does not make network retrieval part of nomue Protocol
interpretation. None of the following is an authority for what an
identifier means: DNS resolution results, HTTP availability or status
codes, redirect targets, retrieved HTML or JSON, or the current content
of any website. A Protocol verifier does not implicitly dereference
identifiers and does not perform network access to interpret them - this
is the existing NRS-CORE-0004 (CORE) behavior, unchanged by this
decision. Identifier meaning is fixed by the published Protocol snapshot,
the registries, and the normative documents that bind the identifier.

### 4. Persistence

1. **Issued once.** A published HTTPS identifier is never reassigned to a
   different meaning. Retirement follows the existing supersession and
   tombstone discipline of [../ID-POLICY.md](../ID-POLICY.md).
2. **Meaning is snapshot-fixed, not served-content-dependent.** What an
   identifier means is determined by the published Protocol snapshot,
   registries, and normative authority that issued it - never by what a
   web server returns for it.
3. **HTTP availability is optional.** `nomue.ai/id/...` paths may later
   serve informative documentation, but successful Protocol verification
   never depends on any HTTP response. No endpoint is implemented by this
   decision.
4. **DNS or HTTP outage.** Temporary unavailability of the domain or its
   web service does not suspend or alter the Protocol meaning of
   already-issued identifiers.
5. **Domain compromise or loss.** Losing control of `nomue.ai` is a
   governance and security incident, not a semantic event: historical
   published identifiers are never reinterpreted; HTTP responses served
   by a party outside the project's control are never semantic authority;
   minting of new identifiers under `nomue.ai` halts until ownership
   continuity is resolved; historical snapshots remain evidence of the
   already-issued meanings. Concrete domain-transfer and recovery
   mechanics are deliberately not designed here.

### 5. Legacy `urn:nomue:*` coexistence

Existing `urn:nomue:*` identifiers are legacy pre-release identifiers.
They are immutable, are not deleted, keep their meaning inside the
bundles, schemas, and snapshots that reference them, and are never
reassigned to a different meaning.

The future migration follows the successor-surface model already used by
this Protocol's versioning machinery: new HTTPS identifiers are
introduced through new schema versions where applicable, successor
interpretation bundles, and explicit compatibility or supersession
evidence. Legacy bundles keep legacy identifiers; successor bundles carry
HTTPS identifiers.

Explicitly rejected mechanisms:

- in-place replacement of existing identifier bytes;
- silent reinterpretation of an existing string;
- treating `urn:nomue:X` and any `https://nomue.ai/id/...` string as
  aliases of one identifier;
- treating an HTTP redirect as semantic equivalence;
- verifier routing that implicitly accepts both an old and a new
  identifier inside one bundle;
- registry-order fallback or version-proximity inference;
- string-normalization equivalence.

No alias registry, redirect registry, resolution service, or
compatibility translation layer is created by this decision; whether any
is needed is judged at migration implementation time.

### 6. Family extensibility

The recognized Protocol-issued families are those in the inventory table
above. Adding a family is an additive governance change recorded in a
decision record; it is not a change to this grammar. A family token, once
used, is never reused for a different meaning. No identifier-family
registry is created by this decision.

## Standards basis (informative)

- RFC 3986: a URI identifies a resource; identification does not imply
  access, and comparison is defined on the string itself - supporting the
  single-canonical-spelling rule.
- RFC 8820: URI structure and semantics belong to the URI's owner;
  third parties do not assign meaning inside another owner's space.
- W3C Architecture of the World Wide Web: reference does not imply
  dereference, and URI persistence is a policy commitment of the owner,
  which section 4 above makes explicit for `nomue.ai`.

These sources are design rationale only. No external web page, including
anything served at `nomue.ai`, becomes semantic authority for the
Protocol.

## Consequences

- Future Protocol-issued identifiers have a ratified grammar, persistence
  policy, and coexistence model before any successor surface or key
  ceremony mints them.
- Every existing identifier byte, schema, registry, bundle, fixture, and
  verifier behavior is unchanged; `pnpm check` verifies this batch is
  inert at runtime.
- [../ID-POLICY.md](../ID-POLICY.md) is extended in the same change set to
  classify Requirement IDs, repository/governance identifiers, Protocol
  semantic identifiers, and producer/instance-assigned identifiers.
- An informative note under NRS-CORE-0004 explains that HTTPS-shaped
  identifiers do not weaken the no-dereference rule; the normative clause
  itself is unchanged and no new Requirement ID is issued.
- Migration (successor bundles, HTTPS minting, any validator or alias
  decision) remains a separate, versioned implementation batch.
