# Validation and unresolved conditions

This record reports checks actually executed for the informative source packet.
It does not attest statistical replication, release adoption or runtime support.

## Executed results

Environment: Windows x64, Node 24.14.0, pnpm 11.19.0; dependencies installed
from the unchanged lockfile. Sandboxed dependency reads initially failed with
EPERM/EACCES; authorized execution using the same checkout/dependencies was
then used. Those infrastructure failures are not scientific test results.

- **PASS:** `python governance/drafts/source-reconciliation-20260924/check.py
--archive <received-zip>`: 17 PDF byte streams and archive SHA-256 match;
  16 hashes found in exact prior Git records; six scientific target files match.
- **PASS:** the existing R5 projection inventory checker: 12 pinned inputs,
  24 family/fact cells, 36 schema fragments. Semantic mapping validation was
  not performed and R5 support remains unissued.
- **PASS:** reference-source mirror check and its four tests, repository-wide
  Prettier check, Markdown lint (777 files), TypeScript and `pnpm validate`
  including links, private-dependency, language, authority and snapshot-mechanism
  audits, in the full-check run.
- **FAIL:** `pnpm check` stops at unit tests: 522 passed, 3 failed, 525 total;
  53 test files passed and 2 failed. No skip, changed expectation or forced green
  was introduced. See the baseline comparison below.
- **PASS, separately executed after that stop:** `pnpm check:generated` (19
  files), `pnpm check:phase1` (13 schemas, 16 canonicalization vectors, 134
  fixtures and pinned evidence), `pnpm check:phase2a` (including 7 datasets
  against captured SciPy/mpmath output), and `pnpm check:phase2a-021` (8 fixtures).
  The oracle check explicitly reports R unavailable; it is not a fresh R run.
- **PASS:** outgoing packet scan for local/private repository paths, download
  addresses and source licensee identities; no PDFs, rendered pages or extracted
  source full text added. Original reviewer prose is retained.
- **FAIL, intentionally preserved original bytes:** the full base-to-packet
  `git diff --check` reports three trailing-whitespace findings in the original
  reviewer-return files. Repository-authored files are clean when those original
  byte files are excluded. The earlier working-tree-only PASS did not establish
  a clean full range; no original byte was cleaned up to suppress these findings.
- **GO_FOR_ADDITIVE_EVIDENCE:** the separate-context bounded primary-source review
  found no repair-level scientific defect in the fixed target. See
  [review intake](REVIEW-INTAKE.md) for exact identity, scope and limitations.
  For R5 it uses the same model/model family as the earlier R5 review; the
  cross-model condition remains unmet. This recommendation is not a release
  gate PASS or steward acceptance.

## Unchanged-main comparison

The six scientific target files also match their exact Git bytes at commit
`00031b52c748b48aefb11684929909816eac9b83`. Git's initial newline conversion of
two reviewer returns was caught and repaired using packet-local `-text`
attributes; both stored Git-blob digests now match the original received returns.
The ZIP and all 17 extracted copies were compared byte-for-byte again after
reading. Neither the original ZIP nor any extracted PDF changed.

A separate clean detached checkout of
`9146a342ce40881b16aad198c80dbf94d7e24332` reproduced the same three failures in
the same two test files (8 passing, 3 failing among those 11 tests):

1. `tooling/tests/paired-t-supported-execution-admission-evidence-candidate.test.ts`,
   line 137: filesystem-read grants do not bind the executable/compiled tree.
2. `tooling/tests/paired-t-supported-execution-selection-candidate.test.ts`,
   line 213: supported-execution selection evidence differs from exact candidate.
3. The same file, line 222: the same exact-candidate evidence diagnostic.

Thus these failures are demonstrably present without this source-packet change
on this Windows environment. Their full cause is not repaired or reclassified
here. They remain failures, not a claim that all supported environments fail.
Existing numerical expectations and execution-admission code were untouched.

**FAIL:** `pnpm snapshot:manifest --check-candidate` compares current work against
the historical Release 1 pre-publication whole-tree inventory and reports added
successor-era files. The clean main checkout also produces this failure, including
preexisting workflows, ERRATA and research/draft files; the worktree `.git` file
also appears. The current preserved-history audit in `pnpm validate` passes.
No old candidate manifest, signature or gate is regenerated to hide this result.
This packet is not conducting a new Release 1 candidate review or publication.

## Unresolved conditions

- Authorized private durable storage and its verified retrieval/retention receipt.
- Accountable acceptance of the received review and final source-task disposition;
  no source receipt or reviewer recommendation is a steward decision.
- R5 owner/semantic prerequisites and the existing release-level decisions and
  discussion windows, all unchanged.
- The baseline Windows test failures above, outside this evidence-only task.

No R2-R5 candidate runtime, new numerical oracle, statistical simulation or R5
planned conformance case was executed as a consequence of receiving these PDFs.

## Bounded repair verification, 2026-09-24

Repair target commit: `1448286f10dcd2c1948a411f7b5b5f8c3a5c3e3c`.
Current target digest and impact are recorded in [REVIEW-INTAKE.md](REVIEW-INTAKE.md).

- **PASS:** packet checker against the received archive; 17 original byte streams,
  16 prior matches and five self-contained R5 prior matches. No PDF digest changed.
- **PASS:** fresh-clone-equivalent check using `git clone --no-local --single-branch`
  of only the repair branch. No object sharing or alternates are used.
  `git cat-file -e a79d0d7900ceaa88a8a73cae2bac6dc36f83d9cf` exits 1:
  the historical local-only commit is absent. `check.py --commit HEAD` nevertheless
  passes all packet/Git target checks and all five R5 prior matches. Licensed PDFs
  are not in that clone; the archive check above is a separate local operation.
  This tests a transferable branch without the old branch, not a published remote
  URL: no push or publication has occurred.
- **PASS:** original reviewer-return byte digests unchanged, including the neutral
  filename rename; source-completion copy matches its original Git-blob digest.
- **PASS:** Prettier, Markdown lint (779 files), and `pnpm validate` after repair.
- **FAIL as expected:** full range `git diff --check` from base
  `9146a342ce40881b16aad198c80dbf94d7e24332` to the repair target exits 2 with
  exactly three trailing-whitespace findings: `bounded-review-original.md.txt:3`,
  `naik-review-original.md.txt:55`, and `r5-review-original.md.txt:61`.
  **PASS:** the same range with packet `*-original.md.txt` excluded exits 0.
  These findings are preserved original bytes, not silently repaired text.
- **UNCHANGED BASELINE FAILURES:** the earlier three test failures and historical
  R1 candidate-check failure remain documented above. This documentation/identity
  repair does not classify them as new regressions or rerun broad scientific tests.

The requested bounded confirmation is limited to evidence portability,
independence wording, author metadata, validation accuracy and absence of changes
to scientific judgments or Release state. It cannot close the outstanding R5
cross-model condition, custody or steward acceptance.

The separate-context [bounded confirmation](bounded-repair-confirmation-original.md.txt)
returned PASS, independently reproducing the isolated-clone, identity, whitespace,
Markdown lint and repository validation checks. The receipt in REVIEW-INTAKE.md
records its exact bytes and scope; no target or scientific result changed afterward.

## Subsequent bounded steward acceptance

The [2026-09-24 steward disposition](2026-09-24-source-reconciliation-steward-disposition.md)
records explicit acceptance of this additive evidence packet at commit
`85e0430c0a8e4615f4a911deea160de10bf7867b`. Earlier acceptance-pending statements
above describe their historical state and are superseded only for packet acceptance.
The historical raw-return custody remains PENDING; the R5 cross-model condition
and other existing Release conditions remain OPEN or retain their existing states.
No scientific review, test result, Research Gate or Release decision is changed.

## Historical raw-return durable preservation

The owner/operator selected public Git preservation for the recovered historical
raw return, following content inspection and the existing original-review practice.
[RAW-RETURN-RECOVERY.md](RAW-RETURN-RECOVERY.md) records the completed preservation
receipt; earlier raw-return private-custody PENDING statements are superseded by
this authorized storage method, not by a claim of private Drive upload.

- **PASS:** recovered transfer copy, packet file and staged Git blob are identical:
  18,810 bytes, SHA-256
  `5b5a41500b7284cc10a8902e69209af83226472bdc01bdd8cba3100ae160a253`.
- **PASS:** existing `*-original.md.txt -text` attribute applies; the original was
  excluded from formatting and no encoding or newline conversion was performed.
- **PASS:** packet checker now also checks this exact raw return and its receipt;
  `--commit` additionally compares its stored Git bytes. Existing TARGET files
  and the 17 PDF identities/custody attestations remain unchanged.
- **PASS:** Markdown lint (783 files), `pnpm validate`, and change-local whitespace
  checks. Historical full-range original-byte whitespace findings remain intact.

No raw-return preservation condition remains after the preserved blob is pushed.
The existing baseline failures, steward acceptance and R5 cross-model condition
are unchanged. This is preservation validation, not a new scientific review.
