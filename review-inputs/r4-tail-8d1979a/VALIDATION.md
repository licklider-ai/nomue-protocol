# Review validation and reproduction

Date: 2026-09-10. Environment and input identities: INPUTS.json.
Scope: additive review evidence only, no authoritative artifacts changed.

## Executed checks

| Check                                               | Result                                                                                                                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Author verify_inputs.py before staging review files | Pass: 5 commits, 23 blobs, 13 confined paths                                                                                                                              |
| SHA256SUMS against original author directory        | Pass: all 12 entries; sums file also pinned in reviewer INPUTS.json                                                                                                       |
| Reviewer verify_pins.py                             | Pass: fixed commit/parent/tree, all 13 author files unchanged, 23 reference blobs and 5 reference commits                                                                 |
| Author probe.py in separate reproduction directory  | Pass: 220 cases, 42 rejections, 408 numerical controls, 4 midpoint cases                                                                                                  |
| Author verify_results.py in separate directory      | Pass: 220 rows, 7 rejected mutations                                                                                                                                      |
| cmp of reproduced and fixed results.json            | Pass: byte-identical; hashes in reproduction.json                                                                                                                         |
| independent_checks.py                               | Pass: 60 recurrence cases, 15 exact-root witnesses, 3,626 rounding checks, 134 unresolved midpoint intervals, 12 width checks, 5 serialization checks, 88 rejection calls |
| Additional checker-limit probes                     | 5 unchecked-field alterations and 1 false candidate enclosure accepted as predicted; exact witness saved                                                                  |
| pnpm install --offline --frozen-lockfile            | Pass: pnpm 11.19.0; no lockfile change                                                                                                                                    |
| Prettier on review Markdown/JSON                    | Pass after formatting                                                                                                                                                     |
| Repository Markdown lint                            | Pass: zero issues                                                                                                                                                         |
| TypeScript tsc --noEmit                             | Pass                                                                                                                                                                      |
| Direct tooling/src/validate.ts                      | Pass                                                                                                                                                                      |
| tooling/src/generate.ts --check                     | Pass: 19 generated files unchanged                                                                                                                                        |

Assertions were enabled. Numeric tests use only the Python standard library.
The separate recurrence and rounding search are expectations independent of the
candidate code, but share Python exact-arithmetic primitives. This is not
independent hardware, a different model, or a human review. Results do not
establish universal platform, resource or finite-precision termination claims.
No full aggregate pnpm check or unrelated statistical suites are claimed.

## Reproduce without changing author outputs

Run from the repository root:

```sh
python review-inputs/r4-tail-8d1979a/verify_pins.py
python review-inputs/r4-tail-8d1979a/independent_checks.py
```

The second command rewrites only the reviewer's independent-results.json.
JSON whitespace may differ from repository formatting; its parsed result is
identical. To replay the author's writing probe safely, use a temporary copy:

```python
import hashlib
import pathlib
import shutil
import subprocess
import sys
import tempfile

source = pathlib.Path(
    'governance/drafts/release-4-preparation/tail-feasibility-20260910'
)
with tempfile.TemporaryDirectory(prefix='r4-tail-replay-') as directory:
    target = pathlib.Path(directory)
    for path in source.glob('*.py'):
        shutil.copy2(path, target / path.name)
    subprocess.run([sys.executable, str(target / 'probe.py')], check=True)
    subprocess.run([sys.executable, str(target / 'verify_results.py')], check=True)
    fixed = (source / 'results.json').read_bytes()
    reproduced = (target / 'results.json').read_bytes()
    assert fixed == reproduced
    print(hashlib.sha256(reproduced).hexdigest())
```

Do not use author verify_inputs.py as a whole-review delta checker: it deliberately
requires all staged changes relative to the old base to be in the author directory.
After staging review files that historical restriction is no longer the current
commission. verify_pins.py preserves its identity checks without this obsolete
staging assumption. No original author script was changed.

## Source access and execution limits

DLMF and NIST formula text was inspected via public web retrieval; direct byte
capture returned 403. ACM full text was not obtained. MPFR, R and Boost direct
responses yielded the hashes in source-access.json. Error-body hashes never
represent source content. SOURCES.md records versions and formula pinpoints.

The optional process-list command failed with a runtime library lookup error;
it supplied no numerical or validation evidence. Tool output paging/truncation
was handled with targeted rereads. No blocked access was bypassed, and no
additional agent was started. No source-access failure is counted as a formula
verification. The saved review gives no numerical claim based on host Decimal
precision, two-route agreement or a finite corpus alone.

## Delivery identity

The review is committed directly above the fixed author commit, on
review/r4-tail-8d1979a, with a draft PR targeting
research/r4-tail-feasibility-20260910. The commit/parent/tree and observed CI
state are reported in the PR body and final handoff; this file does not attempt
to include its own recursive commit hash. CI is a repository integration check,
not scientific or Research Gate approval. No merge or release is authorized.
