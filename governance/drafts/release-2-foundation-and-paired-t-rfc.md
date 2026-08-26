# Draft RFC: Release 2 Foundation and Paired-t Vertical Slice

**Status: Informative RFC draft; public discussion has not started.** This draft
does not issue identifiers, Requirement IDs, schemas, Public Checks, conformance
expectations, or supported bundles. Approval and the applicable public-discussion
window are required before an authoritative implementation batch starts.

## Summary

Release 2 should add one narrow successor capability: an explicit paired
two-condition continuous Profile and a two-sided paired-t Analysis Contract. The
change should also introduce the minimum successor infrastructure required by that
capability:

- canonical `https://nomue.ai/id/...` identifiers under ADR-0031;
- direct Analysis Contract identity under ADR-0032, without a duplicate method ID;
- an additive Interpretation Bundle shape that binds Contract, Profile, schemas,
  canonicalization, and versioned Public Checks by exact identity;
- a closed successor Record schema for explicit pair membership and the declared
  paired result;
- Profile-admissibility, computability, and paired-t recomputation checks;
- positive and negative conformance fixtures plus independent numerical evidence.

Release 1 remains an immutable supported historical snapshot. Its schemas, bundles,
checks, fixtures, and identifier meanings are not migrated in place.

## Motivation

The current public support target covers one independent-two-group Welch slice. The
repository already contains a completed informative research disposition and a
paired-t design candidate, but it has no successor schema, supported bundle, or
verifier dispatch path. A single vertical slice tests the new Contract identity and
HTTPS identifier architecture without spreading unfinished semantics across several
statistical methods.

Signed-rank and Mann-Whitney procedures are outside this RFC. They have distinct
estimands, zero/tie rules, exact-procedure semantics, and unresolved interval or
numeric-binding work. They should not be represented as switches inside the paired-t
Contract.

## Proposed authoritative change set

The eventual implementation change set is expected to update these authority
classes together:

1. normative Profile and Analysis Contract documents;
2. `registries/requirements.yaml`, including newly allocated capability-scoped
   namespaces;
3. successor Record/Profile/report schemas and schema identity bindings;
4. `registries/interpretation-bundles.yaml` through a new meta-schema version or a
   successor registry surface;
5. `registries/public-checks.yaml` with new check versions and quantity-specific
   tolerance policies;
6. `registries/reason-codes.yaml` for paired admissibility and computability;
7. `registries/public-contract-surfaces.yaml` with explicit schema-version impact;
8. conformance fixtures and independently established expectations;
9. exact-bundle reference dispatch and a non-authoritative paired-t implementation;
10. authority-manifest assignments and regenerated views.

No item in this list is changed by this draft.

## Semantic scope

The proposed Profile represents exactly two declared conditions and explicit,
complete one-to-one pairs. Pairing is never inferred from row order, timestamps,
values, labels, or experimental-unit identity. Every admitted observation belongs to
one complete pair, and the initial procedure performs no imputation, hidden
complete-case selection, weighting, transformation, or duplicate resolution.

The Analysis Contract is the one-sample two-sided Student-t procedure on differences
formed as the first declared condition minus the second. Its estimand is the
population arithmetic mean paired difference. Reversing the declared condition order
reverses the signed estimand; it does not select a different Contract.

The initial result surface contains the unstandardized mean paired difference,
standard error, a fixed 95 percent confidence interval for that mean, the t statistic,
integer degrees of freedom, and the two-sided p-value. It contains no standardized
effect size and no significance boolean.

An incomplete pair, fewer than two complete pairs, zero sample variance of the
differences, a non-finite input/intermediate, or a value outside the versioned
numerical support domain fails closed. No alternate statistical procedure is selected
automatically.

## Identity and bundle model

The successor Record schema binds `analysis.contract_id` directly. It does not mint
a second `method` identifier for the same operation. Contract, Profile, Public Check,
schema, canonicalization, and bundle identities remain distinct.

The successor bundle is additive and selected only by exact bundle identifier. It
binds at least:

- one Profile identity;
- one or more Analysis Contract identities, with one Contract in this initial slice;
- each representation schema by identity and repository path;
- the canonicalization identity;
- an ordered or explicitly unordered Public Check set, as decided by the owning
  bundle semantics;
- conformance-manifest and verifier-output protocol bindings.

The current non-authoritative shape spike is
`tooling/src/spikes/interpretation-bundle-vnext.ts`. It uses identifier components
marked `unissued` and cannot register support.

## Numerical contract and oracle gate

The statistical meaning above is covered by the completed P1-A research disposition
in `spec/profiles/README.md` and the handoff in
`governance/drafts/p1a-paired-t-l1-design.md`. ADR-0032 records that the independent
review found no missing statistical research for this bounded direction.

Promotion still requires independent numerical evidence for the exact Public Check:

- exact/algebraic evidence for pair construction, direction, sample size, and
  degrees of freedom;
- an implementation-independent calculation of mean, variance, standard error, and
  t statistic;
- high-precision Student-t tail enclosures over the proposed support domain;
- independently certified fixed-95-percent critical values;
- separate error ledgers for p-values and confidence-interval endpoints;
- boundary fixtures for representable positive tails, underflow refusal,
  intermediate overflow, p near one, and zero variance.

Cross-library agreement is a divergence probe, not the sole oracle. The exact support
domain, operation graph, critical-value table, and tolerance values remain undecided
until this evidence is reviewed.

## Compatibility and migration

This is an additive successor surface. Existing `urn:nomue:*` identifiers are not
aliases of successor HTTPS identifiers. Existing Records continue to route only
through their exact legacy bundle. There is no fallback by version proximity,
registry order, URI normalization, redirect, or inferred compatibility.

Release 1 fixture inputs and versioned schemas remain byte-preserved. Existing
registry identifiers remain present as historical entries. The development guard is
implemented by `tooling/src/release/release-1-history.ts`.

## Stability and discussion window

The proposed pairing/admissibility intent and Contract semantics are expected to be
STABLE-INTENT. The first schema layout, numerical Public Check, reason codes, and
reference path are expected to be EXPERIMENTAL. If review concludes that an existing
CORE clause must change rather than merely receive an additive implementation, the
RFC is reclassified to CORE before decision.

Under the current tier registry, the highest presently proposed tier is
STABLE-INTENT, so the minimum public-discussion window is 30 days. This draft does not
start that window.

## Alternatives rejected by this proposal

- adding paired t to a legacy Welch bundle;
- changing an existing Record schema or identifier in place;
- minting both Contract and method identities for paired t;
- automatically selecting paired t from a diagnostic or from observation shape;
- bundling signed-rank or Mann-Whitney as mode flags;
- copying a library's support threshold, quantile table, or tolerance without
  independent evidence;
- declaring support before schema, checks, fixtures, or oracle evidence are complete.

## Decision requested

The steward is asked to approve only the scope and public-discussion opening for this
RFC. Permanent identifier spellings, namespace tokens, schema/bundle versions,
support bounds, critical values, tolerances, and Release 2 publication scope are
separate ratification items in
`governance/drafts/release-2-steward-ratification-package.md`.
