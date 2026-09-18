# R3 Holm D1 controlled-call checkpoint independent implementation review result

## Verdict

GO_FOR_D1_CONTINUATION

Controlled-call checkpoint verdict only, as `OUTER-CALL-HANDOFF.md` requests. It
is not D1 completion, host qualification, integration, adoption, RFC-window or
publication GO, and it closes none of the 44 acceptance rows. The prior inner-call
MINOR (m-1, expected-path access) is independently closed. The new lifecycle code
launches one fresh pinned supervisor per call, applies the candidate.4 cgroup
policy before Node startup, retains fixed failure precedence and full descendant
cleanup, accepts no saved receipt as an invocation, and forwards only the retained
original bytes after an all-pass report and complete lifecycle observations. No
probe in this review retained a report or forwarded bytes after an outer cause,
corrupted completion, wrong identity, nonzero leader exit, observed enforcement,
incomplete cleanup, changed bytes, changed declared digest, wrong scope,
noncanonical bytes or a safe failure report.

Findings: 0 BLOCKER, 0 MAJOR, 2 MINOR. Nonblocking observations in Section 7.

## 1. Fixed target and inputs

| Field            | Value                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository       | `licklider-ai/nomue-verifier` (public; read-only clone, not attached for push or API)                                                          |
| PR               | #20, branch head `3c51172a66d2c13ebec99e2dbe7c4ab892888af9` ("Connect unissued R3 controlled lifecycle and original-byte forwarding")          |
| Sole parent      | `f4b07868db999b282126b3a1c5620ee01a5252a4` (the reviewed inner-call head)                                                                      |
| Head tree        | `e3d7cc3da06ca2fccca5900c561a150c0da762ec`                                                                                                     |
| Base             | `940b8fb6990632029bcebd2ebdf6ce9dca8e9244` (default branch head at fetch time; merge base)                                                     |
| Delta            | 25 files, +2789 / −21, exactly the paths the handoff and Protocol `D0-COMPLETION.md` describe                                                  |
| Drift            | none: head, parent, tree and base equal the identities in the handoff, the Protocol PR #355 description and `CONTROLLED-HOST-EVIDENCE.json`    |
| Design authority | Protocol PR #355 DESIGN/ACCEPTANCE/LANDING at `1eb6b93`; D0 confirmation `6410025`; prior D1 reviews `31d8897`/`7b057d5`, `9d69da5`, `bcb723b` |
| Review date      | 2026-09-18 (UTC)                                                                                                                               |

Blobs at the head: `controlled-call.ts` `3be9537b…`, `controlled-call.test.ts`
`7fcd71c1…`, `outer-supervisor.py` `873b5460…`, `outer-supervisor.test.py`
`1aa2c87b…`, `outer-entry.mjs` `76332de8…`, `outer-run.mjs` `3dc07506…`,
`outer-probes.mjs` `fe968862…`, `outer-host.py` `33238b36…`, `outer-cases.ts`
`79132c97…`, `outer-fixtures.ts` `c3f2526e…`, `outer-runtime.json` `6f179075…`,
`OUTER-PROVENANCE.json` `148b61f5…`, `OUTER-CALL-HANDOFF.md` `7f441474…`,
`execution.ts` `c0c30e56…`, `inner-call.ts` `001d5971…`, `output.ts` `74185f54…`,
`README.md` `93226fcd…`, `evidence/OUTER-VALIDATION.json` `4a4171ea…`,
`evidence/outer-tests.tap` `5796af33…`, `evidence/outer-unsupported.json`
`2845aa50…`, `ci.yml` `8bdfdca9…`, `tests/boundary.ts` `6e522126…`.

Protocol-side custody verified at PR #355 head `eb3e380` (tree `93c731e3…`, base
and merge base `0c7a685`, draft, open, mergeable state clean, 12 of 12 check runs
`success`): the inner-call review is retained byte-identical (blob `dfc1d31a…`,
SHA-256 `13500839…d4d0` recomputed from the reviewer branch); intake `a477d40`
adds only that file (+237); `eb3e380` adds `CONTROLLED-HOST-EVIDENCE.json`
(`329ea9d9…`), `controlled-host-3c51172.zip` (`a0158be2…`, 127,935 bytes, SHA-256
`8e08314c…8fe9` recomputed and matching the metadata) and edits `D0-COMPLETION.md`,
`RELEASE-STATUS.md` and the R3 README only. Prior reviews, confirmations and the
commission are unchanged.

## 2. Independence, continuity, mechanism, environment and scope disclosure

- The reviewer did not author or repair PR #20, the supervisor port, candidate.4
  or any R3 receipt. The same session produced the Protocol D0 design review, its
  confirmation and the three earlier D1 checkpoint reviews; that continuity is
  disclosed because this review closes its own m-1 and checks the implementation
  against the design it reviewed. No Verifier or Protocol source was written by
  the reviewer; probe scripts were kept in a session scratch directory.
- The reviewer is an Anthropic language model in a Claude Code remote session
  (configured `claude-fable-5-1`; serving model may differ); not human-expert
  review, not steward review.
- Environment: Linux x64 (kernel 6.18), container uid 0, hybrid cgroup with
  `/sys/fs/cgroup` on tmpfs and a non-delegated, non-writable cgroup2 mount at
  `/sys/fs/cgroup/unified`; Node 22.22.2 (repository default), an npm-installed
  Node v24.19.0 binary used only for the pinned-entry probes, Python 3.11.15,
  3.12.3 and 3.13.12. Python 3.12.14 is not obtainable here, so the pinned
  execution tuple was NOT_RUN and every worker or full-call path that needs it
  ends in the pinned refusal by design.
- Commands actually run at the head: `node --import tsx --test
development/r3-holm/*.test.ts` under Node 22 (75 tests: 72 pass, 3 skipped for
  the unset `NOMUE_TEST_PYTHON`); the same two suites with
  `NOMUE_TEST_PYTHON=/usr/bin/python3.12` (3.12.3) under Node 22 and under Node
  24.19.0 (20 tests: 18 pass, 2 fail only on the interpreter pin, Section 3);
  `npx tsc --project development/r3-holm/tsconfig.json` (exit 0); `npm test`
  (smoke, boundary, reason-metadata OK); `npm run test:package` (OK);
  `python3.12 -B outer-supervisor.test.py` and the same under 3.11 (5/5);
  `python3.12 numerics/test_worker.py` (OK, 86 vectors); `outer-cases.ts`
  regeneration; independent hashing of the pin inventory, evidence logs, manifest
  and archive; a diff of `outer-supervisor.py` against the candidate.4 source blob
  `c7e600b8…` at Protocol `b52389f`; twenty-two path/projection/transport probes
  (Sections 3 to 5); the native entry under Node 24.19.0 on six inputs; four
  `controlledCall` launches and three direct supervisor launches on this host.
- NOT_RUN: Verifier hosted CI for this head (the GitHub API is not available for
  the unattached repository; run 35318802381 and its nine jobs are the author's
  report, checked here only through the retained archive), actual cgroup
  enforcement, cleanup under real descendants, supervisor loss, the Python 3.12.14
  worker and any all-pass forwarding through a real supervisor. None of these is
  substituted by a mock.
- No file in either repository was modified by this review; no comment, merge,
  publication, SOURCE-PIN change, identifier or dispatch action was performed.

## 3. Independent closure of the inner-call MINOR m-1

Closed. `expectedFile` now converts the `regular_file_required` invocation error
and ENOENT, EACCES, EPERM, ENOTDIR, EISDIR, ELOOP and ENAMETOOLONG into
`ExpectedContextAccessError`. The author's regression ("expected directory is C
unreadable while Record-local passes remain") is the reviewer's exact close
condition and passes. An independent probe through `prepareInnerFiles` gave, for
an expected path that is a directory, a symlink loop, an overlong name, a dangling
symlink, a symlink to a directory, a character device, a FIFO without writer
(returned in 7 ms because the open is nonblocking) and a missing file: a report
with S/K/D/H/I pass, C `error` with reason `candidate:holm:expected_unreadable`
and no `outcome`, A `not_run` with that reason, and no proposed snapshot. An absent
expected argument gives C error `expected_missing`. Record-side faults stay
invocation refusals: directory, path through a file and character device give
`input_access_error`; see m-2 for two codes that do not.

## 4. Verified facts

- **Supervisor port.** `outer-supervisor.py` differs from the candidate.4
  `supervisor.py` (blob `c7e600b8…`, SHA-256 `a25997e4…` as `OUTER-PROVENANCE.json`
  records) only in: repository root depth; the pin file name; the split of
  `strict_json` from a new `strict_transport` that checks the nonce envelope,
  payload SHA-256, candidate.5 output identity, output cap and snapshot encoding;
  nonce/probe/manifest hash in the evidence; entry and probe file names; the
  optional expected argument; the receipt kind; three added probes; nonce and
  research-bound argument validation; and a 6 MiB receipt cap. Preflight,
  bootstrap attachment before `execv` of Node, policy write and read-back,
  30-second deadline started before preflight, bounded pipe pumping, cancellation
  flag, the cleanup loop (cgroup kill, leader kill, subreaper `waitpid` to ECHILD,
  populated zero, closed pipes, leaf removal, temporary removal, separate
  3-second budget), event deltas with regression check and the eleven-cause fixed
  precedence are byte-for-byte the candidate.4 logic.
- **Caller side.** `controlledCall` refuses before any launch unless Linux x64,
  Node v24.19.0 and absolute Python, delegation, Record and expected paths; it
  spawns the supervisor with `-I`, a 32-byte random nonce, `PATH=/usr/bin:/bin`
  and `LANG` only, bounded stdout (6 MiB) and stderr (64 KiB), a 40-second
  watchdog that kills and discards, and abort-signal cancellation. Any stderr
  byte, nonzero exit, signal, overflow or unparseable receipt is a refusal. The
  receipt is parsed with `parseStrictJson` and the evidence sink receives a copy
  before projection. There is no receipt-file, command, probe or Record-controlled
  option; `outer-probes.mjs` is reachable only through the supervisor's CLI.
- **Trusted projection.** `projectTrustedReceipt` requires the candidate.5
  receipt kind, causes drawn only from the eleven names with value `true`,
  category equal to the first cause in precedence, the fresh nonce, the manifest
  hash, `probe: null`, no `result` for any non-completed category, leader exit 0,
  subreaper, exactly the four cleanup observations all true, exactly the five
  controls at the fixed values, non-negative safe-integer event deltas with zero
  `max`/`oom`/`oom_kill`/`oom_group_kill` and zero pids `max`, a result with
  exactly `output` or `output` plus `proposed_record_base64`, wire validation,
  encodability, and snapshot presence if and only if all seven rows pass. The
  forwarded snapshot must decode round-trip within the byte cap, re-inspect as
  canonical storage, and agree with the report's stored-projection digest,
  Record and revision identities, bundle identity, declared `content_digest` and
  the H-scope analysis/family/result identities. The bytes are passed through;
  nothing is reserialized. Probes with an extra control key, a trailing space in
  `memory.max`, a negative delta, `oom_group_kill: 1`, a noncanonical snapshot, a
  changed Record identity in the output, a candidate.4 bundle identity, a missing
  result, a cause under a completed category, and a missing `probe` key all gave
  `internal_error` with no forwarding.
- **Native entry and transport.** Under Node 24.19.0 with the pinned source,
  `outer-entry.mjs` on the regenerated R3D-02, R3D-11, R3D-16 (absent argument)
  and R3D-07 inputs produced an envelope of exactly `nonce`, `payload`, `sha256`
  with the supplied nonce and a matching payload hash, and a payload of exactly
  `output`; R3D-01 refused `unsupported_execution` because the host worker is not
  the pinned interpreter; a missing nonce or wrong argument count exited 70 with
  no bytes. A late budget failure after serialization stays a typed refusal
  (author test "late shared-budget failure supersedes a complete inner report").
- **Launches on this host.** `controlledCall` through `outer-run.mjs` with Node
  24.19.0 and Python 3.12.3 returned `unsupported_execution` in about 0.5 s with a
  receipt of category `unsupported_host` (`pinned Python 3.12.14 required`), no
  result, and the manifest hash `6dd9b7c5…` equal to the local SHA-256 of
  `outer-runtime.json`; the `-` form (no expected path) behaved the same; a
  nonexistent Python executable gave `internal_error` in about 0.4 s with no
  receipt (Node emits `close` after a spawn failure, so the watchdog is not
  needed); a relative Record path refused before any launch. Direct supervisor
  launches rejected a malformed nonce and out-of-bound memory with exit 2.
- **Pins and evidence.** All 29 rows of `outer-runtime.json` match the head
  bytes; the row list equals the sorted `pin-outer.py` inventory; the
  `OUTER-VALIDATION.json` source list equals it; both log hashes match; the
  manifest hash in the local unsupported receipt, the author's
  `outer-unsupported.json` and all 39 archived receipts is that same value.
- **Archive.** The retained ZIP unpacks to 117 files. `RESULTS.json` reports Node
  v24.19.0, Python 3.12.14, 39 of 39 rows passing. The 26 input Records and 24
  expected files are byte-identical to inputs regenerated here from
  `outer-cases.ts`, and `cases.json` equals the local one modulo directory. All 26
  call receipts are `completed_valid`, leader exit 0, `probe: null`, cleanup all
  true, the five controls at the fixed values, zero enforcement deltas, and 26
  distinct nonces. Every result matches its predetermined expectation, including
  the propagated reason sets, and only R3D-01 carries `verified_record_base64`,
  which equals the archived original bytes. The thirteen fault receipts have the
  expected categories, no `result`, complete cleanup and observed evidence: OOM
  group kills for both memory probes at 64 MiB, `nr_throttled` 19 for the CPU
  probe, pids `max` 1668 for the task probe, 4,587,520 and 196,608 bytes for the
  overflow probes, deadline after a provisional write, and cancellation after
  SIGTERM.
- **Packaging and inventory.** `tests/boundary.ts` lists the 17 new files by
  name; `package-smoke.mjs` still rejects any `development/` tarball entry; the
  npm `files` allowlist is unchanged.
- **Acceptance accounting.** The handoff table and the Protocol receipt claim 26
  representative variants and 13 controls, not closed rows, and list the
  remaining conditions per row; the counts match the archive.

## 5. Answers to the handoff's failure questions

1. Retain a report after expected resource failure, late budget exhaustion,
   output corruption, wrong completion identity, nonzero leader exit, observed
   enforcement, incomplete cleanup or supervisor loss: none found. Expected byte
   or structural limits and unexpected host failures escape the C path as
   whole-call refusals (author test); the entry's post-serialization checkpoint
   converts a late failure to a refusal proposal; the supervisor discards any
   result under any cause and the caller independently rejects every such
   receipt; supervisor loss yields no receipt and therefore a refusal.
2. Cgroup attachment before startup, reaping, bounded pipes, fixed precedence,
   absence of a saved-receipt API: confirmed by inspection of the unchanged
   candidate.4 logic and the caller code; the only receipt input is the closed
   pipe of the process this call spawned.
3. Forward changed bytes, a changed declared digest, wrong selected scope,
   noncanonical bytes or a safe failure report: all refused (author tests plus
   the probes above).
4. Pure projection tests versus controlled-call evidence: the local suites,
   `projectTrustedReceipt` tests and the inner file adapter are structural or
   inner evidence; only the archived host lane is controlled-call evidence, and
   the handoff labels them so.
5. Overclaim of the 44-case expansion: none found.

## 6. Findings

### MINOR

**m-2. Record-path ELOOP and ENAMETOOLONG refuse as `internal_error`.**
`prepareInnerFiles` converts only ENOENT, EACCES, EPERM and ENOTDIR from
`readBounded` into `input_access_error`; a symlink loop or an overlong Record path
therefore surfaces as `internal_error`. It is still a refusal, so no report or
forwarding results, but the kind contradicts the refusal migration in DESIGN,
which reserves `internal_error` for verifier faults and assigns caller-input
access failures to `input_access_error`, and it is now asymmetric with the
repaired expected side. Minimal correction: use the same seven-code predicate as
`expectedFile` (shared helper preferred) and add a test with a loop and an
overlong Record path. Closure check: both probes return `input_access_error`.

**m-3. The host lane never launches the no-expected-argument form.**
`outer-cases.ts` always records an `expected` path, and for R3D-16 and R3D-20 it
simply does not create the file, so `outer-host.py` passes a missing path and the
archived R3D-16 reason is `expected_unreadable`, not `expected_missing`. The
`expectedPath === undefined` branch of `controlledCall`, the supervisor's optional
positional argument and the entry's three-argument form have unit and local-entry
evidence only, and `cases.json` lists expected paths that do not exist. Minimal
correction: emit `expected: null` for absent-context variants, pass `-` through
`outer-run.mjs`, keep the missing-file input as an R3D-17 variant, and assert the
`expected_missing` reason. Closure check: the next archive's R3D-16 result carries
`expected_missing` and its `cases.json` has no phantom path.

### NONE

No BLOCKER or MAJOR finding. The inner-call MINOR m-1 is closed (Section 3).

## 7. Nonblocking observations

- Every archived normal call reaped exactly one non-leader descendant with exit
  status 0 (refusal-only inputs included), while the plain-Node probes reaped
  none and a local Node 24.19.0 entry run showed no child process. The receipt
  vocabulary does not distinguish an expected short-lived helper from an
  unexpected leftover, and `projectTrustedReceipt` accepts any
  `reaped_descendants` list. Recording which process this is would strengthen the
  cleanup evidence.
- `supported()` checks the interpreter pin before the cgroup mount, so the
  `unsupported_host` reason on an unpinned host is the Python pin. The author
  test "direct launcher rejects unavailable delegation before Record access"
  passes on this host for that reason, and on the Node 20/22 matrix jobs it
  passes without any launch; only the Node 24 jobs exercise a real supervisor.
- `invalid_input` (leader exit 65) maps to `input_access_error`, but no shipped
  entry uses exit 65; the mapping is dead but harmless.
- On cancellation or overflow the caller returns before parsing, so the evidence
  sink never receives the cancelled or overflow receipt; the host lane observes
  those categories through direct supervisor probes instead.
- The nonce travels on the supervisor command line and in the child environment;
  the handoff correctly states it is local completion framing, not a defense
  against same-UID code.
- `outer-host.py`, `outer-cases.ts`, `outer-fixtures.ts`, `tsconfig.json`, tests
  and fixture example files are outside the runtime pin inventory; the tsx
  loader does read `tsconfig.json`, so a later change there would not be caught
  by the manifest check.
- `p_generation: not_asserted` and symlink following are documented choices that
  still need the D3 disposition the handoff names.

## 8. Custody note

This session cannot push to `nomue-verifier`. The fixed-head record is preserved
in the Protocol reviewer branch under
`review-inputs/r3-holm-d1-controlled-call-20260918/REVIEW-RESULT.md`; the author
may import it byte-for-byte into either repository as prior reviews were
imported.

## 9. Actions not taken

No adoption, issuance, integration, publication, SOURCE-PIN, host-qualification
or dispatch action was performed. No comment was posted to PR #20, PR #355,
PR #330 or issue #274. Nothing was merged. No historical receipt, candidate byte
or numerical source was changed.
