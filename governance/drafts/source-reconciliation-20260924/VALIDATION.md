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
