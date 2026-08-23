# Minimal ITGC Example Record

**Informative, non-normative.** This example exists so a first-time reader
can follow every field of a Phase 1 Record; it is not a conformance fixture
(those live under [../../conformance/](../../conformance/README.md) with
pinned expectations).

| File | Content |
| --- | --- |
| `record.json` | A complete, valid Phase 1 Record |
| `expected-verification.json` | The verification report (with `generated_at` and `verifier.source_commit` normalized to fixed placeholder values) |
| `canonical-content.json` | The JCS canonical form of the digest projection |
| `hashes.sha256` | SHA-256 hashes of the three files above |

Verify it yourself:

```bash
pnpm nomue-record verify examples/minimal-itgc-record/record.json
```

## About the data

The observations are **synthetic**: eight numbers invented for illustration,
with four biological replicates per group. They come from no real experiment
and no published paper. A passing verification means only that the declared
result is consistent with the declared data under the declared method and
that the covered structural properties hold - it does not make the
"experiment" good science. Scientific validity is `not_asserted`.

## Not covered by Phase 1 (and so not in this example)

Attestation and signatures, human approvals, figure or text binding, effect
sizes, confidence intervals, multiple comparisons, missing-value handling,
and every method other than the two-sided Welch two-sample t-test.
