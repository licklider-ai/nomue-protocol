# Canonicalization

**Status: Informative index.**

This tree holds the Phase 1 canonicalization contract:

| Document                                                 | Content                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [record-canonicalization.md](record-canonicalization.md) | Strict input eligibility, digest projection, RFC 8785 JCS, SHA-256 (Normative) |
| [phase-1-numeric-model.md](phase-1-numeric-model.md)     | Finite binary64 numeric model (Normative)                                      |
| [numerical-comparison.md](numerical-comparison.md)       | Tolerance authority and comparison policy (Normative)                          |
| [test-vectors/](test-vectors/manifest.yaml)              | Canonicalization and digest test vectors                                       |

The canonicalization identifier registered for Phase 1 is
`urn:nomue:canonicalization:jcs:0.2.0-draft.1`.

Test-vector expected values are cross-checked against an independent existing
JCS implementation; they are never generated solely by the reference
canonicalizer and trusted blindly (see
[test-vectors/manifest.yaml](test-vectors/manifest.yaml) provenance notes).
Gate R1-08 (independent numerical oracle) is closed with decision `pass`
(see [../authority/release-1-gates.yaml](../authority/release-1-gates.yaml)
and [../tooling/r1-08-oracle/README.md](../tooling/r1-08-oracle/README.md));
this closure covers the Welch statistical kernel, not the JCS
canonicalization vectors on this page, which have their own independent
cross-check described above.
