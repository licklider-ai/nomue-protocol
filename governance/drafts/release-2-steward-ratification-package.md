# Release 2 Steward Ratification Package

**Status: Informative decision-preparation package.** Nothing in this file issues an
identifier, allocates a Requirement namespace, freezes a numerical contract, opens a
public RFC window, or authorizes publication.

## Completed reversible groundwork

- Release 1 signed snapshot evidence, historical schemas, fixture/vector inputs, and
  issued registry identifiers have a successor-development audit.
- The ADR-0031/ADR-0032 HTTPS lexical rules have a draft minting validator with
  adversarial examples. It is not wired into an authoritative schema or registry.
- An Interpretation Bundle vNext shape spike keeps Bundle, Contract, Profile, schema,
  canonicalization, and Public Check identities separate. All candidate components
  are marked `unissued`.
- A non-authoritative paired-t spike builds explicit complete pairs and computes
  differences, mean, sample variance, standard error, t statistic, and integer
  degrees of freedom. It does not compute p-values or confidence intervals and does
  not define tolerances or support bounds.
- The proposed Release 2 scope is captured in
  `release-2-foundation-and-paired-t-rfc.md`.

## Ratification sequence

The items below should be decided in order. A later item does not become eligible
merely because an earlier item is approved.

### R2-D1 — RFC scope and discussion opening

Decision: whether to open the paired-t vertical-slice RFC with STABLE-INTENT as the
highest affected tier and a 30-day minimum discussion window.

Approval authorizes public discussion only. It does not authorize identifier minting
or authoritative implementation.

### R2-D2 — Requirement namespace allocation

Decision: the immutable allocation tokens for the paired-t Analysis Contract and the
paired two-condition Profile.

Inputs required before approval:

- collision check against every registered namespace;
- a short mnemonic rationale;
- confirmation that each token is scoped to exactly one enduring meaning;
- the exact first Requirement IDs and their normative anchors.

No candidate token is selected in this package.

### R2-D3 — Permanent Protocol identifiers

Decision: the exact HTTPS spellings and revisions for the Contract, Profile, schemas,
Public Checks, canonicalization binding if a successor is needed, and bundle.

Inputs required before approval:

- clean output from the draft lexical validator;
- exact semantic owner and versioning policy for every identifier;
- evidence that no identifier duplicates a Contract meaning under the `method`
  family;
- confirmation that each spelling appears first in the same authoritative change set
  that defines its meaning;
- explicit legacy coexistence and non-alias statement.

No valid permanent spelling is selected in this package.

### R2-D4 — Successor schema and bundle surface

Decision: the exact field layout, schema versions, bundle meta-schema evolution, and
public contract surfaces.

Inputs required before approval:

- closed-schema draft with positive and negative fixtures;
- explicit `analysis.contract_id` binding;
- explicit pair, condition-order, experimental-unit, declaration, result, and
  integrity relationships;
- exact bundle binding for Contract, Profile, schemas, canonicalization, checks,
  conformance, and verifier output;
- migration matrix proving Release 1 exact dispatch is unchanged;
- public-contract-surface version-impact table.

### R2-D5 — Numerical contract freeze

Decision: the supported sample-size/value/t-statistic domain, operation graph,
Student-t tail procedure, fixed-95-percent critical-value table, failure boundaries,
and quantity-specific comparison tolerances.

Inputs required before approval:

- independent high-precision oracle corpus and reproducible environment record;
- certified critical-value table evidence;
- separate maximum-error ledgers for algebraic quantities, p-values, and interval
  endpoints;
- boundary and metamorphic tests;
- explicit validated-corpus versus domain-bounded guarantee statement;
- a numerical reviewer disposition independent of the implementation authoring
  context.

This is the hard stop for the current implementation batch. No Public Check or
expected numeric conformance value is frozen before R2-D5 approval.

### R2-D6 — Release Candidate scope

Decision: whether the completed paired-t slice is the sole new Release 2 support
target and whether any other repository work is informative-only or deferred.

Inputs required before approval:

- green full validation/conformance suite;
- closed adversarial review findings;
- clean Release 1 historical-integrity audit;
- source/public snapshot boundary review;
- explicit list of excluded capabilities, including signed-rank, Mann-Whitney,
  standardized effects, and any unbound approval/attestation expansion.

## Current stop condition

Work may continue on disposable spike refactoring, validator hardening, fixture/oracle
tool scaffolding that pins no expectations, and RFC discussion repairs. Work stops
before:

- registering a capability namespace;
- inserting a permanent HTTPS identifier into an authoritative artifact;
- changing a schema or public contract surface;
- adding a supported interpretation bundle;
- adding a normative paired-t clause or Requirement ID;
- pinning a numerical tolerance, critical value, support bound, or expected result;
- declaring a Release 2 candidate.

