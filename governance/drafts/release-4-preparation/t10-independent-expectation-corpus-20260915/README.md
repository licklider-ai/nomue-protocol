# R4 T10 independent-expectation corpus

Status: **UNISSUED CANDIDATE — NOT READY**. T10 is not complete.

The first candidate comparison exposed a material mismatch. Work stopped without
changing the frozen expectations or any T03-T09 candidate artifact.

- [Assessment and mismatch](REPORT.md)
- [Independent evidence inventory and claim provenance](EXPECTATION-PROVENANCE.md)
- [Coverage and unexecuted work](COVERAGE-MATRIX.md)
- [Frozen expectation manifest](EXPECTATIONS-FREEZE.json), [source pins](INPUTS.json)
- [Self-check/import audit](SELF-CHECK.json), [normal comparison](NORMAL.jsonl)
- [Bounded diagnosis and additional authority pins](DIAGNOSIS.json)
- [Packet hashes](MANIFEST.json)

## Reproduce without changing expectations

From repository root, with the locked Node dependencies and Python available:

```sh
python -B governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/check_corpus.py
pnpm exec tsx governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/diagnose.ts
```

The comparison runner requires a fresh `--output` path and stops on the first
mismatch. `--optimized` selects the actual Python core mode. It never writes expected
data. `build_corpus.py` is the pre-execution authoring command, not a repair command:
do not regenerate or overwrite the frozen corpus to fit candidate output.

The immutable expectation commit is
`d7fcb703da0aa15a78e0d1594b24fc3d34bf622e`. The direct T09 target is
`60ce3a41770edde6e3cf6dc67ff470cd6207af10`; only additive T10 files follow it.
No additional numerical semantics, production support or authority is issued.
