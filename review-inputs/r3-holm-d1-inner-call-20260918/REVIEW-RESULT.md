# R3 Holm D1 inner-call checkpoint independent implementation review result

## Verdict

GO_FOR_D1_CONTINUATION

Component-checkpoint verdict only, as `INNER-CALL-HANDOFF.md` requests. It is not
D1 completion, integration, adoption, RFC-window, host-qualification or
publication GO, and none of the 44 planned full-call cases becomes passing. The
previous MINOR (routing order) is closed as designed. The successor inner call
composes the reviewed local checks with the unchanged numerical worker, emits a
versioned candidate.5 report or a verifier-selected refusal and never both, cannot
launch A without six genuine passes, cannot hide an exact numerator mismatch behind
equal display bits, rejects malformed worker output as an invocation refusal,
validates every report against private evaluation evidence after serialization,
and never forwards Record bytes. Numerical sources, oracle and copied schemas equal
their Protocol sources by SHA-256 and Git blob; the candidate.5 schemas differ from
candidate.4 only in identity spellings.

Findings: 0 BLOCKER, 0 MAJOR, 1 MINOR. Nonblocking observations in Section 6.

## 1. Fixed target and inputs

| Field              | Value                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository         | `licklider-ai/nomue-verifier` (public; read-only clone, not attached for push or API)                                                                                                                                                                                                                                                                                                                   |
| PR                 | #20, head `f4b07868db999b282126b3a1c5620ee01a5252a4` ("Implement unissued R3 successor output and numerical inner call")                                                                                                                                                                                                                                                                                |
| Sole parent        | `77bb4ebaac5eca37390b8b23aede90f3d25702c0` (the previously reviewed head)                                                                                                                                                                                                                                                                                                                               |
| Head tree          | `967e008a553cba51fe02d1c03d5dcffc2e96a121`; base `940b8fb6990632029bcebd2ebdf6ce9dca8e9244`                                                                                                                                                                                                                                                                                                             |
| Delta from 77bb4eb | 26 files, +4805 / −29: new `inner-call.ts`, `output.ts`, `execution.ts`, `inner-call.test.ts`, `contracts/` (three schemas, reason policy), `numerics/` (three copied sources, loader manifest, provenance, worker test), `evidence/`, `tsconfig.json`, `INNER-CALL-HANDOFF.md`; edits to `local-checks.ts`, `stored-bytes.ts`, tests, README, `LOCAL-CHECKS-HANDOFF.md`, `ci.yml`, `tests/boundary.ts` |
| Drift              | none: head, parent, tree and base equal the identities in Protocol PR #355 `D0-COMPLETION.md` at `eddddeb`                                                                                                                                                                                                                                                                                              |
| Design authority   | Protocol PR #355 head `1eb6b93` DESIGN/ACCEPTANCE/LANDING; D0 confirmation `6410025`; prior component reviews `7b057d5` and `9d69da5`                                                                                                                                                                                                                                                                   |
| Review date        | 2026-09-18 (UTC)                                                                                                                                                                                                                                                                                                                                                                                        |

Protocol-side custody verified at PR #355 head `eddddeb` (tree `b15feba8…`, base
`0c7a685`): the local-checks review is retained byte-identical (blob
`11039218…`), intake commit `d40d61b` adds only that file, the three earlier R3
review records are unchanged, and `D0-COMPLETION.md` pins this Verifier head,
parent, tree, base and delta. Protocol CI on `eddddeb`: 12 check runs, all
`success`.

## 2. Independence, mechanism, environment and scope disclosure

- The reviewer did not author or repair PR #20, any component, candidate.4, the
  numerical sources or any R3 receipt. The same session produced the D0 design
  review, its confirmation and the two prior component reviews; that continuity is
  disclosed. Unchanged scope is reused only where Section 3 records a drift
  assessment. Probe scripts written by the reviewer live outside both repositories.
- The reviewer is an Anthropic language model in a Claude Code remote session
  (configured `claude-fable-5-1`; serving model may differ); not human-expert
  review, not steward review.
- Environment: Linux x64, Node 22.22.2, npm 10.9.7, Python 3.11.15, `npm ci
--ignore-scripts` from the pinned lockfile. Not the candidate execution tuple
  (Node 24.19.0 / Python 3.12.14); admits no platform.
- Commands actually run at the head: the four component suites (66 tests: 65 pass,
  1 skipped, the actual-child test, because no Python 3.12.14 is available here);
  `npx tsc --project development/r3-holm/tsconfig.json` (exit 0); `npm test`
  (smoke, boundary, reason-metadata OK); `npm run test:package` (OK);
  `python3 development/r3-holm/numerics/test_worker.py` under Python 3.11.15
  (2 tests OK, the 86-vector oracle comparison included); SHA-256 and blob
  comparison of the three numerical sources against Protocol PR #330 head
  `b52389fd…`; an identity-only diff between the candidate.4 fixture schemas and
  the candidate.5 contract schemas; a programmatic comparison of
  `reason-policy.json` with the reasons the components emit; comparison of the
  carrier construction with the original bridge; sixteen probes of
  `evaluateInner` and `evaluateInnerFiles`; Git identity and diff inspection in
  both repositories; Protocol check-run read.
- NOT_RUN: the actual Python 3.12.14 child through the TypeScript inner call
  (skipped here; the author's `evidence/inner-tests.tap` and the dedicated CI job
  report it, and the user reports hosted CI success), hosted CI for Verifier head
  `f4b0786` (GitHub API not available for an unattached repository), candidate.4
  suites, outer cgroup or whole-host evidence, custody checks, primary sources.
- No file in either repository was modified; no comment, merge, publication,
  SOURCE-PIN change or dispatch activation was performed.

## 3. Verified facts

- **Prior MINOR (routing order).** `parseStoredBytes` (raw safety, strict parse,
  bounds, object check) is now separate from `inspectParsedBytes` (canonicalize,
  project, digest). `inspectLocalRecord` checks bundle presence and exact value and
  validates `record_id` and `revision_id` with their own schema fragments between
  the two phases. Tests fix each crossed outcome: strict eligibility and bounds
  first; `{"x":1e999}` is `routing_error`; unsupported bundle plus non-finite
  data is `unsupported_bundle`; valid routing with invalid references is
  `unrepresentable_input`; valid routing and references with non-finite data is
  `canonicalization_failure`. Closed.
- **Provenance.** `numerics/candidate.py`, `worker.py` and `oracle.py` equal
  their declaration-binding-experiment sources at `b52389fd…` by SHA-256 and by
  Git blob (`fbebc6e4…`, `7656beae…`, `69fa6c33…`); `INPUTS.json` carries the
  candidate hash the unchanged worker checks at every run, and `execution.ts`
  re-hashes all three files before each launch. The eight earlier fixtures are
  unchanged. `contracts/record.schema.json` and `expected.schema.json` are
  byte-identical to the candidate.4 fixtures after replacing the candidate.4 and
  candidate.5 spellings; no constraint changes.
- **Reason ownership.** `reason-policy.json` equals the emitted reason sets exactly:
  D = the 31 lowercased `d0_*` codes of `d0-relations.ts`; H = the 13 bridge
  admission reasons; C = the six context reasons; S, K, I, A singletons or pairs.
  `makeReport` rejects any evaluated reason outside its stage owner.
- **Output contract.** `output.schema.json` (`holm-successor-output/0.3.0-candidate.5`)
  is a `oneOf` of one report shape and ten refusal shapes with constant kinds.
  Reports carry `record_reference` with the stored-projection digest and the
  fixed meaning "inspected bytes, not authenticated identity", four conformance
  rows S/K/D/H, three verification rows I/C/A, eight `not_asserted` guarantee
  fields and `input_evidence.availability: not_observed`; rows are closed objects
  with `completed` (outcome), `error` or `not_run` (no outcome) shapes; H and A
  carry the selected analysis, family and result or `selection: unavailable`.
  Refusals carry protocol, kind, refusal kind and one fixed invocation reason, no
  bundle and no Record reference. No overall verdict and no forwarded bytes exist
  in either shape.
- **Composition and A gating.** `preparedArithmetic` returns a copy of a private
  worker request keyed by object identity in a `WeakMap`, set only when all six
  local evaluations completed as pass; a structured clone of the inspection has
  none (test). The carrier maps `hypothesis` to `member_id`, `origin` to
  `source_id`, `p` to `p_hex`, `family` to `family_id` and the constant revision
  string of the candidate.4 envelope, matching the original bridge. A
  `compareArithmetic` result exists only when that request exists, so
  `assembleResults` throws for six passes without A (test) and A is never supplied
  for a blocked stage.
- **Arithmetic comparison.** Worker output is capped, strict-parsed with BOM
  preserved, bounded, shape-checked (exactly two arrays of the submitted length),
  domain-checked (minimal lowercase numerator at most 2^1074, sixteen lowercase hex
  display digits at most 1.0) and compared string-for-string with the submitted
  `adjusted_hex` and `display_hex`; a numerator one lattice unit off with unchanged
  display bits is `exact_value_mismatch` (test). Probes: uppercase or
  leading-zero numerators, a BOM, an array, a length mismatch, a display above one
  and a duplicate key are all `internal_error` refusals; a lowercase differing
  numerator is an A failure.
- **Refusal mapping.** `refused` maps `InvocationError`, `StoredInputError` and
  `LocalInputError` kinds and everything else to `internal_error`; the three
  error classes cover exactly the ten schema refusal kinds. Record parse failures
  are now typed `parse_error`; parser exhaustion is `resource_limit`. Arbitrary
  callback exceptions, a `GraphInvariantError`, a rejected runner and a
  cancelled signal each yield the expected refusal (tests and probes).
- **Private-evidence validation.** `validateCompletion` checks the schema, rebuilds
  internal rows, validates the graph, then requires the JCS of the output to equal
  the JCS of a report rebuilt from the private evidence; the fabricated
  graph-consistent S pass and six wire mutations are rejected (test). The output is
  validated before and after serialization; the encoded output is capped.
- **Execution controls.** One budget object samples a monotonic clock and heap at
  every checkpoint (non-monotonic or non-finite observations are internal errors);
  `remainingMs` is taken before spawn; the child gets a fixed absolute interpreter
  in isolated mode, a fixed environment, no shell, bounded stdin, capped stdout and
  stderr, a deadline timer, abort handling and a close-before-return promise; a
  budget failure at close supersedes a successful exit; a non-zero exit, a signal
  or any stderr is `worker_failure`. The platform, absolute path and exact
  `3.12.14` version are checked before the worker runs. `readBounded` opens
  non-blocking, requires a regular file, refuses by size before reading, reads at
  most cap+1 bytes and detects growth. Expected files are opened only inside C, so
  S failure performs no read (test with a 1,572,865-byte expected file).
- **Packaging and inventory.** `tests/boundary.ts` names every new file; the
  package allowlist is unchanged; `npm run test:package` passes; CI runs the four
  suites, the project typecheck and a dedicated Node 24.19.0 / Python 3.12.14 job
  for the actual child and the worker test.
- **Handoff accounting.** The case table claims inner evidence only; 33, 35, 41,
  43 and 44 carry no new full-path claim; the closing line states every full-call
  obligation remains open. No overclaim found.

## 4. Answers to the handoff's failure questions

1. Launch A with a failed or error prerequisite: not possible; the request exists
   only for six completed passes and the graph rejects an evaluation for a blocked
   stage.
2. Hide an exact mismatch behind display equality: not possible; both fields are
   compared independently and the exact mismatch is reported (test).
3. Pass malformed worker output: not possible; every probe and test case is an
   `internal_error` refusal with no report.
4. Mutate scopes, sections or blockers, or fabricate a graph-consistent S pass:
   rejected by schema, graph or private-evidence comparison (tests).
5. Make unexpected, late-budget, cancellation or child-close failures leak a
   report: not possible; each is a refusal and the report path is not reached
   (tests; the close handler re-checks the budget).
6. Bounded reader and absence of forwarding: verified; no API returns Record bytes
   and the output schema admits no such member.
7. Evidence table claiming full-call, legacy or host completion: none.

## 5. Findings

### MINOR

**m-1. A non-regular file at the expected path is a whole-invocation refusal
instead of a C error.** Location: `execution.ts` `expectedFile`, which converts
only `ENOENT`, `EACCES`, `EPERM` and `ENOTDIR` into `ExpectedContextAccessError`;
`readBounded` throws `InvocationError("input_access_error", "regular_file_required")`
for a directory or other non-regular file, and that error is rethrown.
Failure scenario: a valid Record with an expected path that names a directory
(probe) produces `refusal: input_access_error`, discarding the completed S/K/D/H/I
evaluations. DESIGN's refusal migration says an expected-only missing or
unreadable input becomes C error when Record inspection completes safely, and
R3D-17 expects "C error without outcome; Record-local results retained". The same
applies to expected-only `EISDIR`, `ELOOP` and `ENAMETOOLONG`. The size cap
correctly remains a resource refusal. The current behavior fails closed, so no
unsafe output results.
Minimal correction: in `expectedFile`, wrap the regular-file requirement and
expected-only path errors (`EISDIR`, `ELOOP`, `ENAMETOOLONG`, `EACCES`, `EPERM`,
`ENOENT`, `ENOTDIR`) as `ExpectedContextAccessError`, leaving Record-path errors
and host failures as invocation refusals; add a test with a directory at the
expected path asserting C error `expected_unreadable` with the Record rows
retained. Closure check: that test passes and the file-adapter test keeps the
S-fail no-read and oversize-refusal cases.

### NONE

No BLOCKER or MAJOR finding.

## 6. Nonblocking observations

- The successor sets `p_generation: not_asserted`, whereas candidate.4 reports
  used `outside_scope`. The eight-field boundary is preserved, but the vocabulary
  changed; the D3 report-schema and public-contract-surface work should record
  the choice.
- `readBounded` follows symbolic links to regular files (probe). The README's
  "only regular files" claim holds for the opened target; if link following should
  be excluded, add `O_NOFOLLOW` where the platform supports it and document it.
- Worker-output bound violations inside `compareArithmetic` surface through the
  Record-scoped `parsedBounds` reasons as `resource_limit`; with a trusted child
  and a 256 KiB cap this is unreachable in practice, but classifying it as
  malformed worker output (`internal_error`) would match the other reply checks.
- The heap budget samples `heapUsed` and excludes native buffers, as the candidate
  Contract already notes; the outer supervisor remains the memory authority.
- The actual-child path was exercised here only through the Python worker test
  under 3.11.15, not through the TypeScript inner call, because the inner call
  pins 3.12.14. The pin is correct; the gap is environmental and is covered by
  the dedicated CI job.

## 7. Custody note

This session cannot push to `nomue-verifier`. The fixed-head record is preserved in
the Protocol reviewer branch at the path the handoff names,
`review-inputs/r3-holm-d1-inner-call-20260918/REVIEW-RESULT.md`; the author may
import it byte-for-byte into either repository.

## 8. Actions not taken

No adoption, issuance, integration, publication, SOURCE-PIN or dispatch action was
performed. No comment was posted to PR #20, PR #355, PR #330 or issue #274. Nothing
was merged. No historical receipt, candidate byte, numerical source or fixture was
changed.
