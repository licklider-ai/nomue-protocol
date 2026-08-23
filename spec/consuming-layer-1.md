# Consuming Layer 1: an entry point for Layer-2 implementers

**Status: Informative.** This document is a map for someone building a
Layer-2 product (an agent environment, a SaaS, a CI integration) on top of
the nomue Protocol. It defines nothing; every statement of meaning below is
owned by the linked normative document.

## Read in this order

1. [spec/core/layer-boundary.md](core/layer-boundary.md) - what Layer 1
   will and will not define (NRS-CORE-0001/0002). Agent sessions, valid
   operation lists, MCP transport, clarification dialogue, and UI are
   Layer-2 territory; Layer 1 owns only stored, finalized facts.
2. [spec/core/record-envelope.md](core/record-envelope.md) and
   [spec/core/integrity-model.md](core/integrity-model.md) - the Record
   you will emit or read.
3. [spec/verification/relying-party-interface.md](verification/relying-party-interface.md) -
   how to read a verification report or refusal and reach your own
   decision (NRS-VERIFY-0022..0025, including the CLI exit-code
   contract). The three-layer judgment discipline lives here: `execution`
   (completed / not_run / error) x `outcome` (pass / fail /
   indeterminate) x `guarantee_boundary` (`not_asserted`), and there is
   deliberately no overall verdict (NRS-VERIFY-0001).
4. [spec/core/record-lifecycle.md](core/record-lifecycle.md) - the
   six-axis state projection, declarative operation preconditions
   (registry: [../registries/lifecycle-operations.yaml](../registries/lifecycle-operations.yaml)),
   and the structured `needs_clarification` shape (NRS-CORE-0013..0019).
5. [spec/approval/README.md](approval/README.md) and
   [spec/attestation/README.md](attestation/README.md) - experimental
   stored forms of human approval and attestation. Their presence in the
   specification does not mean a registered Record bundle supports them.
6. [canonicalization/record-canonicalization.md](../canonicalization/record-canonicalization.md)
   and [canonicalization/numerical-comparison.md](../canonicalization/numerical-comparison.md) -
   JCS/SHA-256 canonical form, the finite-binary64 numeric model, and the
   rule that tolerances belong to check versions, never to Records
   (NRS-CANON-0006).
7. Registries: [../registries/public-checks.yaml](../registries/public-checks.yaml)
   (check IDs, tolerances),
   [../registries/reason-codes.yaml](../registries/reason-codes.yaml)
   (reason codes and remediation hints), and
   [../registries/interpretation-bundles.yaml](../registries/interpretation-bundles.yaml)
   (exact bundle dispatch; no default fallback, NRS-VERSION-0005/0007).

## What to pin

Layer-2 products consume Layer 1 as a pinned, versioned artifact set:
specification + exact interpretation bundle + verification/check versions +
conformance suite. Dispatch on exact registered `interpretation_bundle_id`
values only.

The sole Release 1 public support target declared by this candidate content is:

```text
urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1
```

It remains `EXPERIMENTAL` because Release 1 is a Public Draft, but it is
explicitly registered with `public_release: true` in the candidate content.
That flag identifies the exact bundle intended for Release 1 public support; it
does not itself prove that publication has occurred or that Release 1 gates are
closed. The older 0.1 and 0.2.0 bundles remain immutable
historical/development surfaces and are not Release 1 public support targets.

Every currently registered bundle declares `attestation_support: none`.
A Layer-2 consumer therefore does not treat approval/attestation specification
material or an empty trust-root registry as Release 1 Record support, and
Release 1 makes no production `nomue-attested` claim.

## Current status caveats

- **Candidate-content promotion is not publication.** The registry now declares
  the exact 0.2.1 public support target. A Release Candidate is not authoritative
  until the final candidate content is merged, frozen, and pinned by the Release
  Policy; public publication remains blocked until every applicable Release 1 gate
  closes.
- **Release 1 scope is narrow.** Paired t, signed-rank, Mann-Whitney, and
  other later analytical capabilities remain successor work even where
  research/design artifacts exist.
- **Stability tiers matter**: CORE / STABLE-INTENT / EXPERIMENTAL
  ([../registries/stability-tiers.yaml](../registries/stability-tiers.yaml)).
  Compatibility between Public Draft snapshots is not guaranteed
  ([../governance/RELEASE-POLICY.md](../governance/RELEASE-POLICY.md)).
- The reference implementation under `reference/` is non-normative
  (NRS-GOV-0006); Protocol authority, registered bundles/checks, and
  conformance artifacts define the supported meaning.
