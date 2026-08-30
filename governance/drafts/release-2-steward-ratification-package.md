# Release 2 Steward Ratification Package

**Status: Informative decision-preparation package; public review open.** The
Release 2 RFC review is recorded in
<https://github.com/licklider-ai/nomue-protocol/issues/25>. It opened at
`2026-08-26T20:52:54Z`, and its earliest decision timestamp is
`2026-09-25T20:52:54Z`. Nothing in this file issues an identifier, allocates a
Requirement namespace, freezes a numerical contract, registers support, or
authorizes publication.

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
- A machine-readable Release 2 candidate surface under `release-2-candidate/`
  proposes unissued Requirement namespace tokens and first IDs, exact unissued HTTPS
  identifier spellings and bundle roles, closed Record/Profile/output schemas,
  hand-authored structural/relationship fixtures, a Release 1 exact-dispatch
  migration matrix, and a public-contract-surface impact table. The candidate is not
  loaded by the reference verifier or any authoritative registry.
- The proposed Release 2 scope is captured in
  `release-2-foundation-and-paired-t-rfc.md`.

## Ratification sequence

The items below should be decided in order. Inputs and candidate implementations for
later items may be prepared in parallel during public review, but preparation does
not make an item approved, issue permanent meaning, or authorize authoritative
landing.

### R2-D1 — RFC scope and discussion opening

Disposition: **OPENED**. The paired-t vertical-slice RFC has STABLE-INTENT as the
highest affected tier and a 30-day minimum discussion window.

The discussion is <https://github.com/licklider-ai/nomue-protocol/issues/25>. The
window opened at `2026-08-26T20:52:54Z`; the earliest decision timestamp is
`2026-09-25T20:52:54Z`.

Opening authorizes public review and candidate development only. It does not
authorize identifier minting, registered support, or authoritative landing.

### R2-D2 — Requirement namespace allocation

Decision: the immutable allocation tokens for the paired-t Analysis Contract and the
paired two-condition Profile.

Inputs required before approval:

- collision check against every registered namespace;
- a short mnemonic rationale;
- confirmation that each token is scoped to exactly one enduring meaning;
- the exact first Requirement IDs and their normative anchors.

The non-authoritative candidate in
`release-2-candidate/requirement-namespaces.json` proposes `PT` for the Contract and
`PTCC` for the Profile, together with contiguous first Requirement candidates and
future anchors. These values remain unissued and are inputs to the later decision,
not a disposition of R2-D2.

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

The non-authoritative candidate in
`release-2-candidate/protocol-identifiers.json` proposes exact spellings, semantic
owners, versioning policies, legacy reuse, and bundle-role bindings. Every entry is
marked `unissued`; the candidate creates no `method` alias and does not dispose
R2-D3.

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

The complete structural decision-preparation candidate is under
`release-2-candidate/`: four closed schema candidates, Record/report fixtures, exact
future bundle-schema paths, an explicitly ordered check set, an attestation-support
value of `none`, the Release 1 migration matrix, and the version-impact table. These files are
outside the authoritative schema, conformance, registry, and specification
directories. They make the R2-D4 choices reviewable but do not approve them, issue
their candidate IDs, or dispose R2-D4.

### R2-D5 — Numerical contract freeze

Candidate-development disposition: **APPROVED on 2026-08-27** for the bounded work
recorded under `release-2-candidate/numerical/`. This selects the G4 pairwise
two-pass graph for candidate testing, exact-dyadic classification of parsed
binary64 differences, explicit representational failure classes, and strict
certificate-bundle closure rules. It is not the final R2-D5 disposition.

The next non-authoritative checkpoint separates graph reproduction, mathematical-
truth error, and target-format projection. It selects exact binary64 identity for
candidate graph-reproduction tests and a normal-only p-value projection candidate,
while keeping runtime support disabled. The `df = 200` value is an evidence-
evaluation target, not a supported maximum. The contiguous inverse-beta table and
its unchanged connection to the runtime-series graph have passed independent
adversarial review as non-authoritative candidate evidence and integration.

The current follow-on adds an exact-rational, input-specific truth-error and
projection-margin evaluator. It fails closed when the positive graph leaves its
normal-arithmetic proof preconditions or when the derived bound reaches a projection
transition. A certified `df = 197` witness records an observed 374-ULP graph-to-truth
distance under a 2,978-ULP input-specific candidate bound. The finite observation is
not a global guarantee, and the derivation remains pending independent review. The
final truth-error predicate, supported platform matrix, supported df range,
subnormal first-failure ordering, complete critical-value table, and final reason-
code spellings remain open.

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

This is the hard stop for authoritative numerical meaning, not for candidate
development. A candidate Public Check and expected conformance values may be
prepared and tested, but none is frozen or issued before R2-D5 approval.

The current readiness record deliberately leaves the supported domain, critical-
value table, and all comparison tolerances unset. It also marks the p-value and
critical-value evidence as incomplete until exact enclosure/cell data, executed
secondary and low-df closed-form paths, dependency failure behavior, boundary cases,
and complete provenance hashes are present.

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

Work may continue on the complete candidate change set in public draft branches,
including normative text, validators, schemas, fixtures, oracle evidence, candidate
expectations, Public Check definitions, and reference verifier code. Candidate
identifiers stay marked unissued, and candidate verifier paths do not register or
claim support. Work stops before authoritative landing that would:

- register a capability namespace;
- issue a permanent HTTPS identifier in an authoritative artifact;
- change an authoritative schema or public contract surface;
- add a supported interpretation bundle;
- issue a normative paired-t clause or Requirement ID;
- freeze a numerical tolerance, critical value, support bound, or expected result;
- declare a Release 2 candidate.
