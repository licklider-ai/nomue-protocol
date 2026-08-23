# ADR-0032: Contract Identity and Capability-Scoped Requirement Namespaces

**Status: Accepted** (architecture review disposition, 2026-08-19).

## Context

The paired-t L1 adversarial review exposed two architecture decisions that must be
closed before the Protocol issues its first successor Analysis Contract identifiers
or Requirement IDs:

1. whether a successor analytical operation should mint both a Contract identifier
   and a `method` identifier for the same meaning; and
2. whether every new Contract/Profile should require another hard-coded Requirement-ID
   branch in the requirements meta-schema.

The existing Welch surfaces predate the explicit Analysis Contract architecture and
carry legacy `urn:nomue:method:*` identifiers. The Protocol Architecture now assigns
operation semantics to Contracts and Analysis Contracts. Duplicating that same
semantic identity under a new Contract family and a new method family would create a
parallel-authority risk.

The current Requirement-ID meta-schema also enumerates every namespace explicitly,
including `NRS-PROFILE-ITGC`. Repeating that pattern for dozens of future statistical
Contracts and Profiles would make the meta-schema itself a per-capability bottleneck.

This decision changes architecture/governance rules only. It does not mint a paired-t
Contract/Profile identifier, issue a paired-t Requirement ID, add a supported bundle,
or change current Welch interpretation.

## Decision

### 1. Analysis Contract is the successor analytical semantic identity

For successor analytical capabilities, the Analysis Contract identifier is the
Protocol-issued stable identity of the bounded analytical operation and its semantic
contract.

A successor Record schema that needs to identify that operation binds the Contract
identity directly, using a field such as `analysis.contract_id` defined by that
schema. The exact field layout is owned by the successor schema; this ADR fixes the
identity rule, not one JSON shape.

A second Protocol-issued `method` identifier is not minted when it would identify the
same analytical semantic fact as the Contract. This prevents two independently
versioned identifiers from becoming competing authorities for one operation.

Existing `urn:nomue:method:*` identifiers remain immutable and retain their historical
meaning inside the schemas, bundles, and snapshots that already use them. They are
not aliases of future Contract identifiers and are not silently rewritten.

The existing `method` family is therefore preserved for historical compatibility and
for any future case where a genuinely distinct semantic object is demonstrated. It is
not used as a duplicate label for an Analysis Contract.

Numerical verification procedure identity remains separate: a Public Check and its
version own the recomputation/comparison procedure that evaluates Contract-defined
quantities. Implementation/library identity never substitutes for either Contract or
Public Check identity.

### 2. Add the `contract` Protocol semantic identifier family

`contract` is added as a recognized Protocol-issued semantic identifier family under
the already-ratified grammar:

```text
https://nomue.ai/id/<family>/<name>/<revision>
```

Illustrative only, not minted by this ADR:

```text
https://nomue.ai/id/contract/paired-t/0.1.0-draft.1
```

The lexical, persistence, no-dereference, exact-string, and legacy-coexistence rules
of ADR-0031 and `governance/ID-POLICY.md` apply unchanged.

### 3. Capability-scoped Requirement-ID namespaces use one extensible grammar

Cross-cutting Requirement namespaces continue to use their existing fixed prefixes,
for example `NRS-CORE`, `NRS-VERIFY`, and `NRS-CANON`.

Capability-scoped Contract/Profile requirements use these grammars:

```text
NRS-CONTRACT-<TOKEN>-NNNN
NRS-PROFILE-<TOKEN>-NNNN
```

`TOKEN` is an uppercase ASCII allocation token that:

- begins with `A-Z`;
- contains only `A-Z` or `0-9`;
- is 2 to 12 characters long;
- is registered as part of the exact namespace prefix in
  `registries/requirements.yaml` before any Requirement ID using it is issued;
- is issued once and never reused for a different Contract/Profile meaning.

Examples such as `PT` or `PTCC` are illustrative until the corresponding namespace is
actually registered and its first Requirement ID is issued.

The registry remains the authoritative allocation list. The meta-schema validates the
extensible grammar and registry structure; it no longer requires a source-code/schema
edit merely to add another capability-scoped token.

### 4. Existing Requirement IDs are unchanged

`NRS-PROFILE-ITGC-*` keeps exactly its historical meaning, spelling, and stability.
This decision does not rename it, reissue it, or reinterpret any existing Requirement
ID. Its token happens to fit the successor Profile-token grammar, but that syntactic
fact creates no migration or aliasing semantics.

## Consequences

- Future Analysis Contracts have one semantic identity rather than Contract/method
  double identity.
- Legacy method identifiers remain valid only in the exact legacy/successor surfaces
  that explicitly bind them; no aliasing is introduced.
- Public Check identity continues to own numerical verification procedure/version
  semantics separately from statistical Contract meaning.
- Adding a new Contract/Profile Requirement namespace becomes a registry allocation,
  not a new meta-schema grammar branch.
- The requirements meta-schema and ID policy must be updated to implement this
  decision before the first capability-scoped successor Requirement ID is issued.
- The paired-t normative Profile/Contract may proceed only after those governance
  updates are green; this ADR itself does not make paired t supported.

## Review basis

This decision implements the identity and namespace repairs identified by the PR #20
paired-t L1 adversarial review. That review found no missing statistical research and
classified both items as design/governance decisions that should be resolved before
irreversible identifier issuance.
