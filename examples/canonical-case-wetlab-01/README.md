# Canonical Case: Wet-Lab-Scale Cell Viability Assay (Synthetic)

**Informative, non-normative** (see [../README.md](../README.md)); not a
conformance fixture. A complete, valid Record under the Phase 2A guarantee
bundle `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1`, at a scale and
shape typical of a small wet-lab pilot experiment (n=8 biological
replicates per arm), rather than the minimal n=3-5 examples elsewhere in
this directory.

## What this is a stand-in for

This is **synthetic data**, not a real experiment, and makes no scientific
claim about any real compound - "Compound NM-114" does not exist. It exists
because [comparison/](../../comparison/README.md)'s field-by-field
representation comparison (Batch 2 U2) needs a canonical case realistic
enough to exercise every semantic element a real publication's Record
would carry, before a rights-cleared real published-paper Record is
available to replace it. When one is, this example is superseded, not
edited in place (this repository's fixture-immutability convention,
[../../conformance/AGENTS.md](../../conformance/AGENTS.md), extended here
by analogy even though this is not a conformance fixture).

The dataset shape and scale are chosen to be typical (independent two-group
continuous outcome, n=8/arm, a percent-of-control readout), not to
represent any specific published study design.

## What this is not

This example does not exercise any statistical method, effect size, or
profile capability beyond what
[urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1](../../registries/interpretation-bundles.yaml)
already supports - no new judgment about tolerances, comparison rules, or
method definitions was made to produce it (see this repository's standing
rule against extending statistical scope outside an explicit RFC decision).

## Files

| File                           | Content                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `record.json`                  | The Record                                                                         |
| `expected-verification.json`   | Its verification report (`generated_at`/`verifier.source_commit` normalized)       |
| `canonical-content.json`       | The JCS canonical form of the digest projection                                    |
| `hashes.sha256`                | SHA-256 hashes of the three files above                                            |
| `wrroc/ro-crate-metadata.json` | The same case represented as a Workflow Run RO-Crate (see comparison/)             |
| `bco/bco.json`                 | The same case represented as an IEEE 2791-2020 BioCompute Object (see comparison/) |

Regenerate with `pnpm exec tsx tooling/src/examples/generate-canonical-case-wetlab.ts`
(computes the statistics with the reference stats kernel, seals with the
reference verifier's own digest recompute - values are never hand-typed).

## What is not included, and why

A third planned representation - actually building this same case as a
runnable Galaxy workflow and exporting it through Galaxy's own RO-Crate/BCO
export - is **not included**. Producing it requires an actual running
Galaxy instance (install, configure, build the workflow interactively,
execute it, export); no such instance is available in the environment this
example was authored in, and none was fabricated in its place. The
[wrroc/](wrroc/ro-crate-metadata.json) and [bco/](bco/bco.json)
representations here were hand-authored directly against the same
canonical case instead - a different, and weaker, form of evidence than
"a real tool's real export," which a reviewer should keep in mind when
reading [../../comparison/nomue-vs-wrroc-vs-bco.md](../../comparison/nomue-vs-wrroc-vs-bco.md).

Verify it yourself:

```bash
pnpm nomue-record verify examples/canonical-case-wetlab-01/record.json
```
