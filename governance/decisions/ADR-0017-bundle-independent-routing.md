# ADR-0017: Bundle-Independent Routing and Removal of the Default-Bundle Fallback

**Status: Accepted** (Phase 2A repair, 2026-08-10). Amends
[ADR-0016](ADR-0016-exact-bundle-dispatch.md), whose bundle-less-Record
fallback decision is superseded by this record. The duplicate-member-name
residual noted below (last-wins `JSON.parse` semantics, "a future revision
may refuse duplicates outright") was subsequently resolved by
[ADR-0018](ADR-0018-strict-jcs-input.md): duplicate members are now
refused before routing, and no first-wins or last-wins semantics exist.

## Context: the defect that existed

Through Phase 2A close, the reference verifier and its documentation
carried this behavior: a Record whose `interpretation_bundle_id` was
missing or not a string was **evaluated against the first registered
bundle's schema** ("a reporting convenience"), where it failed structural
conformance and produced a verification report with exit code 2 (fixture
S-001 pinned this). ADR-0016 documented it and explicitly rejected refusing
bundle-less Records "because it would change a pinned Phase 1 result
without necessity; may be revisited with a documented correction." This is
that documented correction.

## Why the fallback was wrong

- It contradicted **exact bundle dispatch** (NRS-VERSION-0005): behavior
  was selected for an input that had declared no bundle at all.
- It made **registry order semantic**: "first registered" is not an
  authority, and no meta-rule granted it one. Reordering the registry
  would have silently changed which schema judged a bundle-less Record.
- It violated the **fail-closed posture** for unsupported bundles: an
  undeclared bundle received an interpretation (a conformance judgment
  against a specific Record schema) instead of a refusal.
- It amounted to **version/default inference**, the exact class of guessing
  the versioning principles prohibit.
- It contradicted the Phase 2A Not-Close conditions, which require that no
  implicit bundle selection exist.

## Decision

1. **No default bundle** (new requirement `NRS-VERSION-0007`, CORE): a
   verifier selects a bundle solely by exact registered identifier
   equality; never from registry order, insertion order, version
   proximity, or any other implicit fallback. The interpretation-bundle
   registry declares `entry_order_semantics: none`; registry order is
   non-normative.
2. **Bundle-independent routing validation** (new requirement
   `NRS-VERSION-0008`, STABLE-INTENT): before a bundle is selected, the
   verifier validates only the routing envelope
   (`urn:nomue:schema:routing-envelope:0.2.0-draft.1`,
   [../../schemas/routing/routing-envelope-0.2.schema.json](../../schemas/routing/routing-envelope-0.2.schema.json)):
   the JSON root is an object carrying a string
   `interpretation_bundle_id`. It is not a Record conformance schema and
   interprets nothing else. No bundle-specific Record schema runs before a
   bundle is selected.
3. **Routing pipeline order**: raw resource limits, JSON parse, parsed
   resource limits, routing-envelope validation, exact registry lookup,
   then (only for a selected bundle) that bundle's schema validation,
   semantic conformance, and verification checks.
4. **Refusal semantics**: a missing declaration refuses with
   `routing_error` / `NRS-BUNDLE-ID-MISSING`; a present-but-non-string
   declaration with `routing_error` / `NRS-BUNDLE-ID-INVALID`; a
   well-formed but unregistered identifier with `unsupported_bundle` /
   `NRS-UNSUPPORTED-BUNDLE`. All exit 3. In every case: no verification
   report, no conformance judgment, no Record or revision identifier
   inference, no bundle selection, no scientific-validity evaluation, no
   partial success.
5. **Refusal schema version**: `routing_error` required a schema change, so
   a new version was issued -
   `urn:nomue:schema:verifier-refusal:0.2.0-draft.2`
   ([../../schemas/reports/verifier-refusal-0.2-draft-2.schema.json](../../schemas/reports/verifier-refusal-0.2-draft-2.schema.json)).
   The draft.1 schema file is **retained unmodified** (it was used by Phase
   2A development evidence and fixtures before this correction); its
   supersession is recorded machine-readably in the
   `verifier_output_contract` of
   [../../registries/interpretation-bundles.yaml](../../registries/interpretation-bundles.yaml),
   and the verifier output protocol version advanced to `0.2.0-draft.2`.
   No silent mutation occurred. The refusal schema was also removed from
   the 0.2 bundle's `schema_refs`: the refusal is a bundle-independent
   verifier-level output, not a bundle artifact.

## Missing / invalid / unknown, distinguished

| Declaration state                        | Kind                 | Reason code              | Bundle selected |
| ---------------------------------------- | -------------------- | ------------------------ | --------------- |
| Absent (or non-object JSON root)         | `routing_error`      | `NRS-BUNDLE-ID-MISSING`  | none            |
| Present, not a string                    | `routing_error`      | `NRS-BUNDLE-ID-INVALID`  | none            |
| String, not exactly registered           | `unsupported_bundle` | `NRS-UNSUPPORTED-BUNDLE` | none            |
| String, exactly registered + implemented | (no refusal)         | -                        | that bundle     |

## S-001 expectation correction

S-001 (a full Record-shaped document with `interpretation_bundle_id`
deleted) keeps its fixture id and its **input bytes unchanged** (the
authoring script asserts the historical input hash
`afe74c54bb4f9c45e0fb25c9dc548ea5ff2b93993ebf9b30d8dab9dbeb3d3845`), and
was reclassified from the structural family to the new routing family.

- Old expectation: verification report; conformance `completed`/`fail`
  with `NRS-SCHEMA-INVALID`; downstream checks `not_run`; exit 2; a
  pinned semantic projection (produced by the first-registered-bundle
  fallback).
- New expectation: `routing_error` refusal with `NRS-BUNDLE-ID-MISSING`;
  exit 3; no report, no projection, no bundle selected.
- Reason: the old expectation pinned the defective fallback itself. This
  is an explicitly documented **pre-release verifier-level correction** in
  the same class as the ADR-0015 refusal corrections.

**Pinned versus corrected, stated precisely**: Phase 1 Record
interpretation semantics and successful verification projections remain
pinned. Verifier-level refusal behavior received explicitly documented
pre-release corrections under ADR-0015 and, for routing, under this
record. Valid Phase 1 and Phase 2A Records keep their meaning, digests,
Welch results, and pinned semantic projections unchanged; the B-002..B-006
report-schema fixture input pins refreshed with the verifier version-string
advance to 0.2.0-draft.2 (expectations unchanged), as in ADR-0015
correction 3.

## Enforcement added with this decision

- Fixtures ROUTE-001..ROUTE-006 (missing / number / null / unregistered /
  nearby Phase 1 / nearby Phase 2A) and the corrected S-001, all with
  hand-authored expectations in
  [../../conformance/expectations/routing-expectations.yaml](../../conformance/expectations/routing-expectations.yaml).
- Fixtures ROUTE-007 (registry reversed) and ROUTE-008 (registry
  deterministically shuffled): the probe set replays against a permuted
  registry and every outcome must be identical to the canonical order.
- A static code-path audit (`bundle-routing-audit` in `pnpm validate`)
  rejects default/first/fallback bundle members in registries and the
  named historical patterns of positional or first-element access to the
  bundle registry in verifier code. The audit is a lint over known
  patterns, not a completeness proof: the behavioral proof of order
  independence is the routing fixture suite, and the registry surface is
  structurally closed by the interpretation-bundle meta-schema
  (`additionalProperties: false` at every level plus
  `entry_order_semantics: none`).
- Routing unit tests pin the decision table above and pin that the draft.1
  refusal schema file still carries the draft.1 `$id` without
  `routing_error` (non-mutation).

## Rejected alternatives

- **Keeping the fallback as a documented edge**: rejected; documentation
  does not repair a contradiction with NRS-VERSION-0005 and the fail-closed
  posture, and registry order is not an authority.
- **Adding an explicit `default_bundle_id` to the registry**: rejected; a
  declared default is still compatibility inference and is now prohibited
  by NRS-VERSION-0007 and the registry meta-schema.
- **Extending the draft.1 refusal schema in place**: rejected; released
  evidence referenced draft.1, and silent mutation of a versioned schema is
  prohibited. A new draft version was issued instead.
