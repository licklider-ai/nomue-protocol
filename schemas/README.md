# Schemas

All schemas use JSON Schema Draft 2020-12 with URN identifiers; identifiers
are never fetched.

## Phase 1 schemas (normative structural representation)

| Schema                                                                             | $id                                                       | Validates                       |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------- |
| [record/record.schema.json](record/record.schema.json)                             | `urn:nomue:schema:record:0.1.0-draft.1`                   | The Phase 1 Record envelope     |
| [profiles/itgc-minimal.schema.json](profiles/itgc-minimal.schema.json)             | `urn:nomue:schema:profile:itgc-minimal:0.1.0-draft.1`     | The ITGC minimal payload        |
| [reports/verification-report.schema.json](reports/verification-report.schema.json) | `urn:nomue:schema:verification-report:0.1.0-draft.1`      | Verification reports            |
| [common/identifier.schema.json](common/identifier.schema.json)                     | `urn:nomue:schema:common:identifier:0.1.0-draft.1`        | Shared identifier definitions   |
| [common/execution-outcome.schema.json](common/execution-outcome.schema.json)       | `urn:nomue:schema:common:execution-outcome:0.1.0-draft.1` | Shared check-result definitions |

## Phase 2A schemas (bundle itgc-guarantee 0.2 / 0.2.1)

The 0.2.1 numerical-contract bundle reuses the same Record, profile, report,
and common structural schemas as 0.2; it changes the pinned public-check set,
not these structural surfaces. Exact registered bundle identifiers and version
tuples are authoritative in
[../registries/interpretation-bundles.yaml](../registries/interpretation-bundles.yaml).

| Schema                                                                                     | $id                                                       | Validates                                                                    |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [record/record-0.2.schema.json](record/record-0.2.schema.json)                             | `urn:nomue:schema:record:0.2.0-draft.1`                   | The Phase 2A Record envelope                                                 |
| [profiles/itgc-guarantee-0.2.schema.json](profiles/itgc-guarantee-0.2.schema.json)         | `urn:nomue:schema:profile:itgc-guarantee:0.2.0-draft.1`   | The ITGC guarantee payload (admissibility declarations, effect estimate, CI) |
| [reports/verification-report-0.2.schema.json](reports/verification-report-0.2.schema.json) | `urn:nomue:schema:verification-report:0.2.0-draft.1`      | Phase 2A verification reports (five-field guarantee boundary)                |
| [common/execution-outcome-0.2.schema.json](common/execution-outcome-0.2.schema.json)       | `urn:nomue:schema:common:execution-outcome:0.2.0-draft.1` | Phase 2A check-result definitions                                            |

### Additive attestation-capable report variants

These are authoritative EXPERIMENTAL structural artifacts, but no currently
registered interpretation bundle selects them (`attestation_support: none`). The
reference verifier pipeline emits the base 0.2 report above.

- `reports/verification-report-0.2-draft-3.schema.json`
  (`urn:nomue:schema:verification-report:0.2.0-draft.3`) is the current additive
  attestation-capable variant. It supersedes draft.2 by adding the optional RFC
  3161 timestamp member to an assertion.
- `reports/verification-report-0.2-draft-2.schema.json`
  (`urn:nomue:schema:verification-report:0.2.0-draft.2`) is retained unmodified
  after supersession by draft.3.

## Verifier-level schemas (bundle-independent output protocol)

- `routing/routing-envelope-0.2.schema.json`
  (`urn:nomue:schema:routing-envelope:0.2.0-draft.1`) is the routing envelope
  validated before any bundle is selected.
- `reports/verifier-refusal-0.2-draft-3.schema.json`
  (`urn:nomue:schema:verifier-refusal:0.2.0-draft.3`) is the current refusal
  schema; it adds the in-process time/memory limit categories to draft.2.
- `reports/verifier-refusal-0.2-draft-2.schema.json`
  (`urn:nomue:schema:verifier-refusal:0.2.0-draft.2`) is retained unmodified
  after supersession by draft.3; it had added `routing_error` to draft.1.
- `reports/verifier-refusal-0.2.schema.json`
  (`urn:nomue:schema:verifier-refusal:0.2.0-draft.1`) is retained unmodified
  after supersession by draft.2.

These track the verifier output protocol, not any bundle: routing and
refusals occur before or instead of bundle interpretation, and no bundle
pins them (see `verifier_output_contract` in
[../registries/interpretation-bundles.yaml](../registries/interpretation-bundles.yaml)).

## Lifecycle structural artifacts (EXPERIMENTAL)

- `lifecycle/state-view-0.1.schema.json`
  (`urn:nomue:schema:state-view:0.1.0-draft.1`) validates the derived
  orthogonal lifecycle state view.
- `lifecycle/clarification-0.1.schema.json`
  (`urn:nomue:schema:clarification:0.1.0-draft.1`) validates structured
  `needs_clarification` responses.
- `lifecycle/disclosure-notice-0.1.schema.json`
  (`urn:nomue:schema:disclosure-notice:0.1.0-draft.1`) validates the
  withdrawal/supersession satellite notice.

The 0.1 schemas remain registered and unchanged (NRS-CORE-0010); unsupported
declaration values are structurally readable in the 0.2 profile schema and
fail the profile-admissibility check, not schema validation.

Semantic constraints that a schema cannot fully express (uniqueness,
reference resolution, group-order permutation, supported method) live in
[../registries/state-invariants.yaml](../registries/state-invariants.yaml)
and are evaluated by semantic conformance, not crammed into the schemas.

TypeScript bindings generated from these schemas live under
[../bindings/typescript/generated/](../bindings/typescript/README.md) and are
non-authoritative.

## Meta-schemas

[meta/](meta/) validates the hand-written YAML registries and authority files,
including authority, release gates, requirements, vocabulary, stability tiers,
public contract surfaces, interpretation bundles, public checks, reason codes,
state invariants, lifecycle operations, and attestation registries.
