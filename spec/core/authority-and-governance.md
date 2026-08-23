# Authority and Governance Requirements

**Status: Normative.** This document binds the governance requirements of the nomue
Record Specification (`NRS-GOV` namespace). The prose model behind these
requirements is described informatively in [../../AUTHORITY.md](../../AUTHORITY.md).

## Repository self-containment

<a id="NRS-GOV-0001"></a>
**NRS-GOV-0001 - Self-contained public authority** (stability: CORE, status: active)
The nomue Record repository MUST be self-contained and MUST NOT depend normatively
or operationally on a private product repository.

Informative note: this covers submodules, subtrees, symlinks, package dependencies,
file paths, and identifier systems originating in private repositories. The
private-dependency audit in the repository tooling enforces the mechanically
detectable part of this requirement.

## Generated artifacts

<a id="NRS-GOV-0002"></a>
**NRS-GOV-0002 - Generated artifacts are non-authoritative** (stability: CORE, status: active)
Generated indexes, summaries, language bindings, and views MUST NOT override their
declared authoritative sources.

Informative note: files under `generated/` carry a header naming their sources and
the generation command. Divergence between a generated view and its sources is
resolved by regenerating the view, never by editing it.

## Conflicts

<a id="NRS-GOV-0003"></a>
**NRS-GOV-0003 - Authority conflicts block release** (stability: CORE, status: active)
A detected conflict between authoritative artifacts MUST fail validation and MUST
block release until corrected.

Informative note: no authoritative artifact is implicitly preferred over another;
the conflict-handling procedure is described in
[../../AUTHORITY.md](../../AUTHORITY.md).

## Identifiers

<a id="NRS-GOV-0004"></a>
**NRS-GOV-0004 - Identifiers are immutable** (stability: CORE, status: active)
Published Requirement IDs and other stable public identifiers MUST NOT be reused
for a different meaning.

Informative note: withdrawn identifiers remain in the registry as tombstones. A
change that breaks the meaning of a requirement is expressed as a new identifier
that supersedes the old one. See
[../../governance/ID-POLICY.md](../../governance/ID-POLICY.md).

## Normative language

<a id="NRS-GOV-0005"></a>
**NRS-GOV-0005 - Normative language requires a Requirement ID** (stability: CORE, status: active)
Every normative clause using MUST, MUST NOT, SHOULD, SHOULD NOT, or MAY MUST be
bound to exactly one registered Requirement ID.

Informative note: the binding is expressed by placing the clause in the same
paragraph as its requirement anchor; the normative lint enforces this mechanically.

## Reference implementations

<a id="NRS-GOV-0006"></a>
**NRS-GOV-0006 - Reference implementations are non-normative** (stability: CORE, status: active)
A reference implementation MUST NOT silently define behavior absent from the
normative specification and conformance artifacts.

Informative note: when an implementation needs behavior the specification does not
define, the specification gap is fixed first (or recorded in a release gate); the
implementation never becomes the de facto source of meaning.

## Language

<a id="NRS-GOV-0007"></a>
**NRS-GOV-0007 - Public normative language** (stability: CORE, status: active)
Public normative artifacts MUST be written in English.

Informative note: internal working notes and execution reports may use other
languages; machine identifiers are always English.
