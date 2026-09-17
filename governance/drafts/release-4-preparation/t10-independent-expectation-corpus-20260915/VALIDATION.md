# T10 stopped-packet validation

Status: **UNISSUED CANDIDATE — NOT READY**.

## Candidate comparison

Expectation freeze commit: `d7fcb703da0aa15a78e0d1594b24fc3d34bf622e`.
Candidate: unchanged T09 `60ce3a41770edde6e3cf6dc67ff470cd6207af10`.

- Windows / CPython 3.12.10 / actual core optimize=0: 170 matched, one mismatch;
  stopped before the last three raw fixtures. See NORMAL and DIAGNOSIS.
- Optimized comparison: not executed because the material mismatch stopped T10.
- Linux comparison: not executed for the same reason. Historical T09 Linux data
  are lifecycle references only and are not reused as T10 numerical results.
- Projection/tail components: independent exact self-checks passed; no component
  candidate comparison executed. No additional mathematical close claim follows.

## Corpus and artifact checks

The self-check verified 174 unique ids and input hashes, all 22 single mutations,
complete numeric vectors, three cost relations, exact analytic tail rounding cells,
33 source pins and the builder/sealer import/subprocess allowlist. These checks
establish construction/provenance consistency, not universal expectation correctness:
T10-F01 remains a known invalid final-state expectation.

The expectation freeze and its source/output hashes remain unchanged. The stopped
packet checker verifies the 171-row prefix, 170 matches and the retained mismatch,
diagnosis source pins, T10-only additions and the complete file manifest. Its PASS
means artifact integrity only, never T10 GO.

TypeScript and Prettier checks on the added files pass. Markdown lint reports no
issues. Repository validation initially found the not-yet-created MANIFEST link;
the completed manifest is included for the final validation. Final pnpm validate,
packet validation and git diff --check are recorded by the completion run.

The existing T09/T08 packet checkers are used only to verify historical pins,
unchanged runtime eleven and stored evidence. They do not rerun numerical/resource
experiments and do not expand historical review coverage.

## Commands

```sh
python -B governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/check_corpus.py
python -B governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/verify_packet.py
pnpm exec tsc -p governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/tsconfig.json --noEmit
pnpm validate
pnpm exec markdownlint-cli2 "governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/*.md"
pnpm exec prettier --check "governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915/*.{ts,mjs,json,md}"
git diff --check
```

JSONL is deterministic evidence serialization, not an incidental full-report golden.
Only the failing row retains the actual report/refusal for diagnosis. No private
product source, process identifiers or environment-specific runtime paths are added.
