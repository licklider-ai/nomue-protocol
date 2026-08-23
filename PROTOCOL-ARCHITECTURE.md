# nomue Protocol Architecture

**Status: Informative architecture map.**

This document fixes the long-term architecture of the nomue Protocol as a
map of responsibilities, dependency directions, and authority boundaries.
It creates no new normative semantics: every binding meaning stays with
the target-specific authoritative artifacts assigned by
[AUTHORITY.md](AUTHORITY.md) and
[authority/authority-manifest.yaml](authority/authority-manifest.yaml).
If this map and an authoritative artifact disagree, the authoritative
artifact governs and this map is corrected. Terms used here are defined
in [registries/vocabulary.yaml](registries/vocabulary.yaml); this
document does not redefine them.

One reading rule above all: the presence of a concept in this
architecture does not mean the capability is supported. Support is
established only by the applicable authoritative specification, the
machine-readable structure where one is required, the version bindings of
a registered interpretation bundle, and conformance evidence - never by
this map.

## Five planes

The Protocol is organized as five planes rather than a single tree:

1. **Semantic plane** - what things mean.
2. **Interpretation and versioning plane** - which exact versions apply
   to a Record.
3. **Publication and change-control plane** - what has been published as
   authority and how it changes.
4. **Evaluation plane** - what checking establishes.
5. **Implementation plane** - who produces and consumes all of the above.

## Plane 1 - Semantic plane

### Core responsibilities

"Core" names an architectural grouping, not a separate sub-specification:
the cross-cutting Protocol responsibilities that do not vary by
scientific domain or by any individual method. Representative
responsibilities:

- authority and governance;
- identifier principles;
- the layer boundary;
- version-identity principles;
- canonicalization and integrity foundations;
- verification principles;
- fail-closed interpretation principles.

The `NRS-CORE` requirement namespace is a historical grouping of
requirement identifiers; it overlaps with, but is not identical to, this
architectural Core. Core responsibilities are deliberately not defined in
terms of any specific analytical domain (see the anti-coupling principle
below).

### NRS - Record representation

The nomue Record Specification owns the structure and Record-level
semantics of a nomue Record: how declarations, links, lifecycle facts,
provenance references, and other Record-carried material are represented
machine-readably. NRS does not itself own statistical methods, domain
admissibility policy, or workflow composition semantics; it provides the
carrier those semantics bind into.

### Contracts - capability semantics

A Contract owns the semantics of one bounded capability or analytical
operation: the inputs and declarations it requires, what the operation
means, the outputs it produces, and the verification obligations that
apply to it. Concrete schema field sets are not defined by this map.

An Analysis Contract is the scientific-analysis specialization of a
Contract. The architectural slot is method-agnostic: a Welch comparison,
a regression, a mixed model, a survival analysis, a
differential-expression analysis, a machine-learning evaluation, and a
Bayesian analysis all occupy the same slot when they are specified.

### Profiles - contextual specialization

A Profile owns the specialization and admissibility context of Protocol
semantics for a bounded scientific, design, or domain context: which
declarations are admissible and which guarantees are supported in that
context. A Profile is not a Contract, not a method, and not an
interpretation bundle, and it never silently redefines Contract
semantics.

### Workflows - composition and dependency

A Workflow owns the composition of multiple Protocol-recognized
operations or contracts: their ordering and dependency semantics where
those are relevant to interpretation, provenance, or verification. A
Protocol Workflow is a scientific/analytical concept; Layer 2 product
workflow orchestration is a different thing and stays outside the
Protocol.

An Analysis DAG is one possible representation of a Workflow's
dependencies - nodes as declared operations, edges as declared data or
dependency relationships. Nothing here requires every Workflow to be
expressed as a DAG.

### Extensions - additive typed semantics

An Extension is the architectural slot for adding typed semantics beyond
a base surface without silently changing the meaning or guarantees of
existing covered behavior. No concrete extension mechanism is implemented
by this map.

## Plane 2 - Interpretation and versioning plane

### Interpretation Bundle

An Interpretation Bundle owns the exact supported combination of
versioned Protocol components needed to interpret and verify a Record.
Schema, canonicalization, profile, public checks, and other explicitly
bound procedures each carry independent version identities; the bundle
pins one exact combination of them. Interpretation is exact-match and
fail-closed: a combination outside a registered bundle is refused, never
guessed. A bundle is not a compatibility heuristic, not a Profile, and
not a Protocol Snapshot.

Exact interpretation does not require publishing every permissible
cross-product of versioned Contracts, Workflow operations, or other
components as a separate bundle. A successor bundle representation can
scale by binding an exact versioned component set or structured
composition together with the exact rules under which that composition is
supported. Scalability does not relax exactness: every component that
participates in interpretation remains explicitly version-bound, and no
compatibility is inferred from version proximity, omitted component
identity, registry order, fallback, similarity, or implementation
behavior. The concrete successor representation and admission rule are
deliberately left to the capability and versioning design that needs them.

## Plane 3 - Publication and change-control plane

### Protocol Snapshot

A Protocol Snapshot is the immutable, content-addressed publication unit
of Protocol authority artifacts. A snapshot answers "what authority set
was published"; an interpretation bundle answers "how is a given Record
interpreted". The two are never interchangeable.

### Public Contract Surfaces

A Public Contract Surface tracks the compatibility and change policy of a
Protocol surface that external parties rely on across versions.

### Stability Tiers

A Stability Tier is a change-control discipline for specification
material. A tier says how material changes; it does not say whether a
capability is implemented, validated, or bundle-bound.

### Capability maturity - an orthogonal planning axis

Capability maturity describes how far one versioned capability has progressed
from architectural fit to independently evidenced verification. It is a planning
and review axis, not a Protocol guarantee, compatibility promise, support flag,
or substitute for a Stability Tier. Maturity and stability answer different
questions: stability governs how specification material may change; maturity
describes what has actually been defined, made checkable, and independently
evidenced for a bounded capability.

The four planning levels are:

- **L0 - Architecture-ready.** The capability fits the Protocol responsibility
  model: its semantic owner, Record carrier needs, version-binding path, and
  verification/conformance path can be identified without changing Core
  principles. No authoritative capability semantics or implementation are
  implied.
- **L1 - Contract-defined.** The capability's bounded semantics and guarantee
  boundary are specified and version-identifiable, with the declarations,
  outputs, and machine-readable surfaces needed to express those semantics
  defined where required. When the choice depends on external knowledge, the
  applicable research gate in `governance/RFC.md` precedes this design freeze.
  L1 does not imply an executable independent check.
- **L2 - Native-verifiable.** The Protocol defines enough machine-readable
  structure, explicit version binding, public verification procedure or check,
  and conformance evidence for an independent implementation to evaluate the
  covered properties without trusting a vendor service or reference
  implementation. Reaching L2 during development does not by itself make the
  capability part of a currently registered supported bundle.
- **L3 - Validated.** The L2 verification behavior has independent evidence
  beyond self-consistency or the reference implementation alone, appropriate to
  the capability: for example independent numerical oracles, cross-implementation
  agreement, standard vectors, empirical validation, or another domain-appropriate
  validation study. Known limitations and the scope of that evidence are explicit.
  L3 still does not establish Scientific Validity outside the scoped procedures.

Maturity is assigned to a named, versioned capability or surface, not to the
Protocol as a whole. A successor version does not inherit a maturity level merely
because its predecessor reached it; the changed semantics and evidence determine
the successor's level. Composite Profiles or Workflows can only be summarized at a
level whose relevant constituent capabilities and composition semantics actually
support that summary. This document does not assign maturity labels to current
capabilities; such claims require scoped evidence rather than architectural
inference.

## Plane 4 - Evaluation plane

### Verification and Public Checks

Verification is Record-specific: executing Protocol-defined checks or
procedures against a Record and its locally available material, producing
scope-bound Verification Results or a versioned refusal. A Public Check
is the versioned public surface of one such procedure; a check can target
properties defined by Core responsibilities, NRS, a Contract, a Profile,
or a Workflow. Verification never asserts Scientific Validity as a whole.

### Conformance

Conformance is adherence assessment: whether a specification artifact,
implementation, or produced artifact follows the Protocol for a declared
scope. Verification and Conformance are distinct: verification says what
a specific check established about a specific Record; conformance says
whether an artifact or implementation adheres to the Protocol.

## Plane 5 - Implementation plane

- **Emitters** implement the Protocol to produce Records. Emitting grants
  no authority over Protocol semantics.
- **Verifiers** implement Protocol-defined verification. Implementing
  verification grants no authority over Protocol semantics.
- **Reference implementations** (such as the nomue reference verifier)
  demonstrate the Protocol and are non-normative.
- **Layer 2 products** (such as a nomue application) produce, consume,
  present, orchestrate, and assist - and never redefine Protocol
  semantics.

## Ownership

The load-bearing boundary of this architecture, with no overlaps:

- **NRS owns representation** - what is expressed and referenced inside a
  Record, and how.
- **Contract owns operation semantics** - what a bounded
  capability/analysis means.
- **Profile owns contextual specialization and admissibility** - what is
  applicable in which scientific/design context.
- **Workflow owns composition and dependency** - how multiple operations
  connect.
- **Verification owns checking procedures and results** - what was
  checked, how, and what was established.
- **Conformance owns adherence assessment** - whether implementations and
  artifacts follow the Protocol.

## Dependency directions

Allowed conceptual direction:

```text
Core responsibilities
    v
NRS / Contracts / Profiles / Workflows / Extensions
    v
Interpretation Bundle (pins exact supported versions)
    v
Verification / Conformance (evaluate Protocol-defined properties)
    v
Emitters / Verifiers / Layer 2 (consume Protocol semantics)
```

- NRS provides the Record carrier and representation.
- Profiles specialize or constrain the applicability of Contracts.
- Workflows compose Contracts and operations; an Analysis DAG represents
  Workflow dependencies.
- The Interpretation Bundle pins the exact supported versions;
  the Protocol Snapshot publishes the immutable authority set.
- Implementations consume Protocol semantics.

Never in reverse:

- a reference implementation's behavior does not define Protocol meaning;
- Layer 2 product behavior does not define Protocol meaning;
- a generated artifact does not carry Protocol authority;
- an HTTP representation does not define identifier meaning.

## Not a containment hierarchy

Contracts, Profiles, and Workflows are different semantic dimensions, not
levels of one tree. Their relations are:

- a Profile may constrain the applicability of a Contract;
- a Workflow may compose operations governed by Contracts;
- a Profile may constrain a Workflow or the operations within it.

How many Profiles or Workflows one Record can or must declare is not
decided by this map.

## Architecture diagram

Indentation groups concepts by plane; it does not assert containment.

```text
                        nomue Protocol

  Semantic plane
    Core responsibilities   (cross-cutting, domain-agnostic)
    NRS                     - Record representation
    Contracts               - capability/operation semantics
      Analysis Contracts    - scientific-analysis specialization
    Profiles                - contextual specialization/admissibility
    Workflows               - composition and dependencies
      Analysis DAG          - one representation of dependencies
    Extensions              - additive typed semantics

  Interpretation / versioning plane
    Interpretation Bundle   - exact supported version combination

  Publication / change-control plane
    Protocol Snapshot       - immutable published authority set
    Public Contract Surfaces- tracked external-reliance surfaces
    Stability Tiers         - change-control discipline

  Evaluation plane
    Verification            - scoped checks on a specific Record
      Public Checks         - versioned check surfaces
    Conformance             - adherence to the Protocol

  Implementation plane
    Emitters                - produce Records
    Verifiers               - execute verification
      Reference implementations (non-normative)
    Layer 2 products        - produce/consume/present/orchestrate/assist
```

## Record interpretation flow

Conceptually, and independent of any implementation:

```text
Record
  -> declared Interpretation Bundle
  -> exact component identities the bundle pins
  -> applicable NRS / Profile / Contract / Workflow semantics,
     where represented and bound by the applicable bundle/surface
  -> verification procedures
  -> scoped Verification Results, or a versioned refusal
```

Contract and Workflow identities appear in this flow as architectural
concepts; whether and where a given Record surface represents them is
owned by the applicable specification and bundle, not by this map.

## Support is explicit

A capability is supported only to the extent that the applicable
authoritative specification, machine-readable structure where required,
version bindings, and conformance evidence define it. Concepts documented
in this architecture - Analysis Contracts and Workflows among them - are
not thereby supported, implemented, verified, or bundle-bound; the
currently registered bundles define exactly what is interpretable today.

## Core anti-coupling principle

Core cross-cutting responsibilities are not defined in terms of any
specific analytical domain - not Welch comparisons, two-group analysis,
regression, survival analysis, omics, single-cell workflows, machine
learning, or Bayesian inference. Specific scientific semantics belong in
Contracts, Profiles, Workflows, and Extensions. This is an architecture
principle of this map, not a new normative clause.

## Evolution without Core redesign

Ordinary future evolution - none of it a Core architecture redesign:

- a new Contract or Analysis Contract;
- a new Profile;
- a new Workflow or Analysis DAG representation/version;
- a new Extension;
- a successor NRS schema version;
- a new Public Check or check version;
- a successor Interpretation Bundle.

Core architecture pressure - a change that would break one of these is
treated as pressure on the architecture itself, not as ordinary
evolution:

- the identifier authority model;
- interpretation exactness and the fail-closed principle;
- the scoped verification model (no overall verdict);
- implementation non-authority;
- the separation of Record/evidence responsibilities from Protocol
  definition.

This distinction is the yardstick for the Phase 1-5 architecture stress
test.

## Architecture stress-test criteria

The following questions are fixed here as the evaluation criteria for the
Phase 1-5 stress test; they are deliberately not answered in this
document:

- Can a new analytical method be added as a Contract/Profile without
  changing Core principles?
- Can a multi-step omics analysis be represented through Workflow /
  Analysis DAG concepts without redefining Record identity or
  verification?
- Can clinical/survival semantics be added without changing the
  implementation-authority boundary?
- Can ML/Bayesian capabilities add new contracts/workflows/checks without
  changing exact bundle interpretation?
- Can third parties independently implement the new capability from
  Protocol authority rather than reference code?
