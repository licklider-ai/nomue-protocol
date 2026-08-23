# Release 1 Canonical Case CC-R1-001 — Wet-Lab-Scale Cell Viability Assay

**Informative, non-normative. Synthetic. Preregistered before evaluation.**

This is the Release 1 / 0.2.1 successor of
[`../canonical-case-wetlab-01/`](../canonical-case-wetlab-01/). The predecessor is
retained unchanged. The preregistration is
[`../../evidence/release-1/canonical-cases/CC-R1-001-preregistration.md`](../../evidence/release-1/canonical-cases/CC-R1-001-preregistration.md).

## Exact Release 1 target

The Record declares exactly:

```text
urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1
```

The underlying 0.2 Record schema and ITGC 0.2 Profile are the versions bound by that
bundle. No version-proximity fallback is used.

## Fixed synthetic source

The 16 observations and study declarations are copied mechanically from the
predecessor synthetic canonical case: n=8 biological replicates per arm, independent
groups, continuous percent-of-control readout. `Compound NM-114` is fictional. There
is no real participant, real compound, unpublished study, or third-party confidential
data in this case.

The preregistration fixes the dataset and transformation rule before this successor is
generated. A failing Release 1 verification result is retained/disclosed rather than
repaired by changing observations or selecting another case.

## Files

| File                           | Content                                                   |
| ------------------------------ | --------------------------------------------------------- |
| `record.json`                  | Preregistered 0.2.1 nomue Record                          |
| `expected-verification.json`   | Normalized machine-readable verifier report               |
| `canonical-content.json`       | JCS canonical digest projection                           |
| `hashes.sha256`                | SHA-256 hashes of the three files above                   |
| `wrroc/ro-crate-metadata.json` | Predecessor's same-study WrROC representation             |
| `bco/bco.json`                 | Predecessor's same-study BioCompute Object representation |

The WrROC/BCO files are comparative representations only. Their presence does not
make them nomue verification evidence, and they are not changed merely because the
nomue interpretation bundle moved from 0.2.0 to 0.2.1.

## Regeneration

Generate the successor mechanically:

```bash
pnpm exec tsx tooling/src/examples/generate-release1-canonical-case-wetlab.ts
```

Statistics are computed by the reference stats kernel. The content digest and
verification report are produced by the reference verifier. Declared numerical values
are not hand-edited.

Verify it directly:

```bash
pnpm nomue-record verify examples/canonical-case-release1-wetlab-01/record.json
```

A passing result means only that the scoped checks bound by the exact 0.2.1 bundle
passed for this synthetic Record. It does not assert scientific validity, declaration
truth, causal validity, or real-world reproducibility.

## Release-gate role

This case is intended to support candidate-scoped evidence for R1-02/R1-03/R1-06/R1-10
after candidate C is frozen. The checked-in example and preregistration do not by
themselves close any gate; fresh candidate run logs and steward review remain required.
