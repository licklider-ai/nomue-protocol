# T10 corrected independent corpus comparison

Status: **UNISSUED CANDIDATE**. Windows and Linux normal/optimized comparisons pass;
REPORT records the final commit/push closure gate. This directory is comparison
evidence (D), not an oracle.

- [Assessment and chronology](REPORT.md), [coverage](COVERAGE-MATRIX.md)
- [Linux capture](CAPTURE.json), [packet manifest](MANIFEST.json)
- [Validation and preservation checker](verify_packet.py)
- [T09 limited closure](T09-LIMITED-CLOSE.json)
- [Immutable corrected expectation authority](../t10-independent-expectation-corpus-revision-2-20260915/AUTHORITY.md)
- [Immutable corrected expectation manifest](../t10-independent-expectation-corpus-revision-2-20260915/MANIFEST.json)
- [Original failed expectation and stop](../t10-independent-expectation-corpus-20260915/REPORT.md)
- [Windows normal](NORMAL.jsonl), [Windows optimized](OPTIMIZED.jsonl)
- [Component normal](COMPONENTS.json), [component optimized](COMPONENTS-optimized.json)

Expected data live only in B. Comparison runners cannot update B. Any mismatch stops
at the first failing case and blocks GO; no output is fitted into golden data.
All 174 raw inputs and 22 component vectors are preserved from the original freeze.
The only revised raw-fixture expectation is overflow-number's final external outcome.

## Reproduction

With the pinned Git objects and lockfile dependencies present, run from repository root:

```sh
python -B governance/drafts/release-4-preparation/t10-independent-expectation-corpus-revision-2-20260915/check_revision.py
pnpm exec tsx governance/drafts/release-4-preparation/t09-canonicalization-repair-20260915/focused.ts
pnpm exec tsx governance/drafts/release-4-preparation/t10-repaired-candidate-comparison-20260915/compare.ts --output /tmp/t10-normal.jsonl
pnpm exec tsx governance/drafts/release-4-preparation/t10-repaired-candidate-comparison-20260915/compare.ts --optimized --output /tmp/t10-optimized.jsonl
python -B governance/drafts/release-4-preparation/t10-repaired-candidate-comparison-20260915/components.py --output /tmp/t10-components.json
python -O -B governance/drafts/release-4-preparation/t10-repaired-candidate-comparison-20260915/components.py --output /tmp/t10-components-optimized.json
```

Output paths must be new. For full lifecycle Linux x86_64 / CPython 3.12.14 use the
r4-t10-corrected-corpus workflow: prepare the unchanged T09 image build recipe with
repaired report.ts, then linux_compare.py runs all 174 raw inputs in each mode through
actual containers, cleanup and final delivery. Analytic component tests run separately
and do not establish raw realization or J-cost membership for synthetic exact-F cases.

The original T09 packet checker remains bound to historical report.ts; its expected
hash is not rewritten. The new checker verifies all historical bytes except the
explicitly repaired source, which is bound to C and the Linux source manifest.
