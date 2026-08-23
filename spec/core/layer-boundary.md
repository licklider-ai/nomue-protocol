# Layer 1 Boundary

**Status: Normative.** This document binds the contract boundary of Layer 1, the
public nomue Protocol layer (`NRS-CORE` namespace).

## Boundary requirements

<a id="NRS-CORE-0001"></a>
**NRS-CORE-0001 - Layer 1 contract boundary** (stability: CORE, status: active)
The Layer 1 specification MUST define public Record semantics and MUST NOT define
agent session state, user-interface behavior, MCP transport behavior, or
product-specific workflow orchestration.

<a id="NRS-CORE-0002"></a>
**NRS-CORE-0002 - Finalized facts versus interaction protocol** (stability: CORE, status: active)
Layer 1 MAY define the representation of finalized clarification, decision,
approval, and execution facts, but MUST NOT define the interactive protocol used by
an agent or user interface to obtain those facts.

## Informative: what Layer 1 covers

Layer 1 covers Protocol semantics, including - centrally, but not only -
the public semantics of Records. Record semantics sit alongside the
Protocol's verification, canonicalization, versioning, conformance, and
governance material, which is Layer 1 as well. A Record's public
semantics comprise:

- declarations,
- analytical decisions,
- provenance references,
- results,
- artifact bindings,
- revision lineage,
- verification results,
- finalized human-approval facts,
- attestations,
- extensions,
- profiles, and
- the stored form of policy-evaluation results.

## Informative: what Layer 1 excludes

The following belong to Layer 2 products and are out of scope here:

- agent session state,
- the list of currently available operations,
- command execution and command precondition protocols,
- MCP transport,
- conversational structured-clarification protocols,
- stale-session recovery,
- user-interface operation, and
- SaaS-specific workflow orchestration.

When a Layer 2 product finalizes a clarification, an approval, or a command result,
Layer 1 defines only the stored form of that finalized fact - never the interaction
that produced it.

A Protocol-defined scientific Workflow (a declared composition of
analytical operations, see
[../../registries/vocabulary.yaml](../../registries/vocabulary.yaml)) is
Layer 1 vocabulary; the product workflow orchestration excluded above is
a different, Layer 2 concept.

## Informative: lifecycle state semantics (2026-08-13 clarification)

Record lifecycle state semantics - the orthogonal state axes, the
declarative operation preconditions, and the structured
`needs_clarification` shape of
[record-lifecycle.md](record-lifecycle.md) - is Layer 1 material: it
describes finalized facts about a Record and the machine-readable form of
a finalized ask, exactly the NRS-CORE-0002 split. The interactive
protocol that negotiates those facts (agent sessions, dialogue, MCP
transport) remains Layer 2; the next-stage MCP reference implementation
is planned as the first Layer 2 consumer of this contract. The boundary
decision itself is unchanged (ADR-0001, appended clarification).
