# ADR-0001: Separate Layer 1 Repository

**Status: Accepted** (Phase 0, 2026-08-10)

## Context

nomue consists of a public specification layer (Layer 1: Record semantics) and
private product layers (Layer 2a, Layer 2b: agent runtime, protocols, UI,
SaaS). A specification that silently depends on a private product repository
cannot be independently cloned, read, verified, or trusted, and private
authority systems would leak into the public contract.

## Decision

Layer 1 lives in this repository, `nomue-record`, separate from all Layer 2
repositories, with:

- **no shared authority**: no artifact outside this repository is authoritative
  for anything this repository covers, and vice versa;
- **no private dependency**: no submodules, subtrees, symlinks, package
  dependencies, file paths, or identifiers pointing into private repositories;
- **self-contained verification**: this repository can be cloned and fully
  validated on its own (`pnpm check`).

An automated private-dependency audit enforces the mechanically detectable part
of this decision, and requirement NRS-GOV-0001 binds it normatively.

## Consequences

- Layer 2 products consume the public specification like any third party.
- Facts finalized by Layer 2 interactions (approvals, decisions) appear in
  Layer 1 only as finalized-record representations (NRS-CORE-0002).
- Some duplication of documentation effort between repositories is accepted as
  the cost of a trustworthy boundary.

## Rejected alternatives

- **Monorepo with a public export**: rejected; export pipelines leak paths,
  IDs, and implicit ordering, and the public artifact stops being the real
  source.
- **Public repo that references private planning documents**: rejected; the
  public specification must be evaluable without access to private context.

## Boundary clarification (2026-08-13, appended - the decision above is unchanged)

Record LIFECYCLE STATE SEMANTICS - the orthogonal state axes of a
finalized Record, declaratively machine-decidable operation
preconditions, and the structured `needs_clarification` shape - is Layer
1 material (spec/core/record-lifecycle.md, ADR-0028). This is a boundary
CLARIFICATION under the original decision, not a re-scope: NRS-CORE-0002
already placed finalized clarification/decision/approval/execution FACTS
in Layer 1 while excluding the interactive protocol that obtains them.
Agent session state, dialogue protocols, and MCP transport behavior
remain Layer 2 exactly as decided above.
