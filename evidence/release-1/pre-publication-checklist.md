# Pre-Publication Checklist

**Class: Evidence** (operational checklist; carries no specification
meaning). This checklist complements - never replaces - the gate registry:
open gates in
[authority/release-1-gates.yaml](../../authority/release-1-gates.yaml)
block release on their own terms.

## Release 1 out-of-band items

There is currently **no separate production-attestation ceremony item** for
Release 1.

The sole planned Release 1 Record support target is
`urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1`, and every currently
registered bundle declares `attestation_support: none`. Release 1 therefore
makes no production `nomue-attested` claim and does not require a production
trust-root generation entry merely to publish the non-attested Welch slice.

The attestation trust-root registry remains empty by design. The first
production key ceremony is deferred until a future release prepares a bundle
that actually binds production attestation support. At that time the applicable
cryptosuite/trust, key-lifecycle, negative-test, and release-gate requirements
must be satisfied before attestation ships.

This scope ruling does not delete or weaken the experimental attestation
specification, signature-suite definitions, trust semantics, or negative tests
already present in the repository.

## Current publication blockers

Publication blockers are tracked in the authoritative Release 1 gate registry,
not duplicated here.

The pre-candidate R1-12 legal-package blocker has been resolved: the adopted
repository-root `LICENSE.md` now contains the specification/code licenses,
Protocol Patent Grant, and contribution boundary, and the review/risk-acceptance
record is preserved under `evidence/release-1/gates/R1-12/`.

R1-12 nevertheless remains `open` with a null current decision until candidate
freeze/pin because the 2026-08-18 gate-reset decision requires all Release 1
gates to be reviewed and closed only against the final frozen candidate.
