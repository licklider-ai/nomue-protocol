# R3 Holm D1 expansion and B-2 integration independent review result

## Verdict

GO_FOR_D1_CONTINUATION

Bounded continuation verdict for the Verifier range `3c51172..eda3ba9` (the
unreviewed expansion `5ee62cd` plus the B-2 wiring `eda3ba9`) and the Protocol
intake at `3233522`. It is not D1 completion, host qualification, adoption,
integration, publication or Research Gate closure for Release 3, and it does not
turn the B-2 numerical GO into any of those. The B-2 review, its SHOULD-FIX-2
withdrawal and the reviewer-authored repair are preserved byte for byte; the
repaired numerical module is the module the wired worker actually executes; the
derived comparison bound is correct, tight and interpreter-independent; the
expansion's fault-entry runs cannot be selected or accepted as ordinary calls;
the two prior controlled-call MINOR findings are closed on actual supervisor
receipts; the retained 75-check archive is byte-consistent with independently
regenerated inputs and expectations; and the R1 correction is factually right.

Findings: 0 BLOCKER, 0 MAJOR, 1 MINOR. Nonblocking observations in Section 10.

## 1. Fixed targets and identity

| Target                   | Value                                                                                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verifier PR #20 head     | `eda3ba9354429baf936212bc68572af94a5e20f6`, tree `17868936e057b20e763013b9285e5363b3ea97b4`, parent `5ee62cdb98dde2b32b7910560bc85d1ad54b16c8`, base and merge base `940b8fb6990632029bcebd2ebdf6ce9dca8e9244`        |
| Review range             | `3c51172a66d2c13ebec99e2dbe7c4ab892888af9..eda3ba9`: two commits, 33 files, +3625 / −53; `5ee62cd` (19 files, +1569 / −30) and `eda3ba9` (20 files, +2058 / −25)                                                      |
| Protocol PR #355 head    | `3233522a1062167b2ef9b8dd9d0e09a2153e169c`, tree `12a68420bdff905d3b5ddc234769c1b175b6a64d`, parent `21264758deac7372a00e9907883c38467ab4bd4e`, prior head `3d10cef7c2df26854013f497f09de8f4af147bec`, base `0c7a685` |
| B-2 source branch        | `claude/gracious-davinci-yn1hcb` at `7ac803a1b9fa71a5a0064a0e81d02b9321cf86d9` (parent `6502ad3f94b407253b0fe50fb3545a54138b998b`, parent `0c7a685`); the branch tip on the remote equals that commit                 |
| Holm (1979) supplied PDF | SHA-256 `43a5a10279f8bf1752a3e8d4a8407f9717579f8f903be4bcd62d969e82d573af`, 2,270,343 bytes, 7 pages; matches the review, intake and provenance records; not present in either repository                             |
| Drift                    | none: `refs/pull/20/head` and `refs/pull/355/head` on the remotes equal the fixed heads at fetch time; the fixed commits carry the stated trees and parents                                                           |
| Review date              | 2026-09-18 (UTC)                                                                                                                                                                                                      |

Verifier blobs at `eda3ba9`: `numerics/candidate.py` `a10a57c8…`, `replay_b2.py`
`399343cd…`, `B2-PROVENANCE.json` `fa39d717…`, `PROVENANCE.json` `9488dce9…`,
`b2-sources/{predecessor.py,independent_checks.py,test_repair.py,RESULTS.json}`
`fbebc6e4…`, `ba74efbf…`, `21fbc299…`, `f9649ace…`, `test_worker.py`
`4968961a…`, `execution.ts` `ffc051e9…`, `inner-call.ts` `edefcaee…`,
`outer-supervisor.py` `3b2ad99b…`, `fault-injections.ts` `d8a5e880…`,
`outer-fault-entry.mjs` `2c7fdf30…`, `outer-cases.ts` `02f1eeee…`,
`outer-host.py` `b542c9c5…`, `outer-runtime.json` `0bb7991d…`,
`ACCEPTANCE-COVERAGE.json` `6df6a2d6…`, `EXPANSION-HANDOFF.md` `0a54e6f1…`,
`B2-INTEGRATION-HANDOFF.md` `23227029…`. Protocol blobs at `3233522`: B-2 packet
`INTAKE.json` `8f42fff9…`, `README.md` `77a20eab…`, `R1-BOUNDARY.md` `27ae2bf7…`,
`HOST-EVIDENCE.json` `6b9d4f0a…`, `controlled-host-eda3ba9.zip` `8dd40fd5…`;
`EXPANSION-HOST-EVIDENCE.json` `fb8d143f…`, `controlled-host-5ee62cd.zip`
`d7b5c7f2…`, `D0-COMPLETION.md` `ace852ef…`.

## 2. Independence, continuity, mechanism, environment and reuse

- The reviewer is an Anthropic language model in a Claude Code remote session
  (configured `claude-fable-5-1`; the serving model may differ); not human-expert
  review, not steward review. This session did not author the B-2 review, its
  withdrawal, the merge-sort repair, the `independent_checks.py` script, any
  Verifier code, the Protocol intake or the R1 correction. The B-2 record states
  it was produced in a separate Claude session requested as `claude-opus-5`; the
  two sessions share a vendor and, for the numerical checks, the same CPython
  integer and `Fraction` foundations. That shared trust base is disclosed, not
  removed.
- Continuity: this session produced the Protocol D0 design review and the four
  earlier D1 checkpoint reviews. Section 6 therefore closes findings this
  session raised (m-2, m-3 of the controlled-call review); that is a close-only
  confirmation by the same reviewer, disclosed as such. Nothing here is a
  self-confirmation of code this session wrote, because it wrote none.
- Reuse: the B-2 mathematics is reused only within its recorded scope (exact
  blobs in the review `INPUTS.json`, `0 < alpha < 1`, arithmetic and identity).
  Its independent checks were re-executed here on the wired module as an
  additional confirmation, not as a new primary-source investigation. The
  primary source was read in full from the supplied copy (Sections 1-3, both
  schemes, both proofs, applications, references).
- Environment: Linux x64, uid 0, hybrid cgroup with a non-delegated cgroup2
  mount; Node 22.22.2 (default) and an npm-installed Node v24.19.0 binary used
  only for pinned-entry runs; Python 3.11.15, 3.12.3 and 3.13.12. Python 3.12.14
  is not obtainable here, so every actual worker or full-call path ends in the
  pinned refusal by design, and no cgroup enforcement ran locally.
- Commands run at the fixed heads and their results: the README's six
  TypeScript suites under Node 22 (91 tests: 88 pass, 3 skipped because
  `NOMUE_TEST_PYTHON` is unset); the Python-gated suites under Node 24.19.0 with
  Python 3.12.3 (2 failures, both the interpreter-pin refusal of the actual
  worker and native transport, an environment limit rather than a defect; the
  15 fault-injection tests pass); strict `tsc` exit 0; `npm test` (smoke,
  boundary, reason-metadata OK); `npm run test:package` OK; `replay_b2.py` exit
  0 under Python 3.12.3 and 3.11.15; `test_worker.py` 3 tests OK including the
  2/3/119/120/121 boundaries and 86 oracle vectors; `outer-supervisor.test.py`
  5/5 under both interpreters; the preserved `test_repair.py` and
  `independent_checks.py` in scratch copies (results identical to the retained
  files); `outer-cases.ts` regeneration at both `5ee62cd` and `eda3ba9`; Protocol
  `pnpm validate`, `pnpm format:check` and `pnpm lint:markdown` at `3233522`
  (all pass; 12 of 12 hosted check runs also `success`); `pnpm snapshot:manifest
--check-candidate` at `3233522` (fails on added successor files, Section 8);
  GitHub reads of Protocol PR #355 (draft, open, mergeable state clean), its
  check runs, the `release-1` tag, release and assets; plus independent probes
  kept in the session scratch directory.
- NOT_RUN: Verifier hosted CI (runs 35321867056 and 35324192158) is not
  retrievable through this session's API access; its jobs are the author's
  report. The synthetic merge for `eda3ba9` was fetched as `refs/pull/20/merge`
  and equals the recorded checkout `d3730adf…` with tree `17868936…`; the
  `5ee62cd` checkout `e899187c…` is no longer served and is unverified. Actual
  cgroup enforcement, real descendant cleanup, supervisor loss, the Python
  3.12.14 worker, and all-pass forwarding through a real supervisor were NOT_RUN
  by the reviewer; the archives below are the only controlled-call evidence and
  they are the author's executions.
- No file in either repository other than this record was created or modified;
  no comment, merge, publication, RFC, gate, identifier or SOURCE-PIN action was
  performed.

## 3. Section A: preservation and scope of the B-2 receipt

1. **Nine-file intake, byte for byte.** Protocol `2126475` adds exactly nine
   files (+1405) and nothing else. Each blob equals the blob at the same path on
   the source branch `7ac803a`, and the nine SHA-256 values in `INTAKE.json`
   match. The latest `REVIEW-RESULT.md` hashes to `85b9747c…8ff236` at `7ac803a`
   and at `3233522`. The source branch differs from `main` by exactly those nine
   files; neither of its two commits touches `authority/`, `evidence/`,
   `registries/` or `tooling/`.
2. **No historical rewrite.** `git diff 0c7a685..3233522` over `authority`,
   `evidence`, `registries`, `schemas`, `generated`, `spec`, `canonicalization`,
   `conformance`, `reference`, `bindings`, `tooling` and `package.json` is empty.
   The prior D1 reviews (`4694d748…` controlled-call, `dfc1d31a…` inner-call)
   and the D0 chain are unchanged. The repair packet's `INPUTS.json` pins the
   initial review blob `29714a1c…` from `6502ad3`, and the intake README states
   that chronology rather than substituting the amended review into the pin.
3. **SHOULD-FIX-2 withdrawal preserved.** The amended review keeps Section 0
   (withdrawal with the tracing rationale), reduces the count to one SHOULD-FIX
   plus one withdrawn item, and keeps the withdrawn heading. `INTAKE.json`,
   the packet README, `D0-COMPLETION.md`, `RELEASE-STATUS.md` and
   `B2-INTEGRATION-HANDOFF.md` all record "withdrawn; no defect remains". No
   document in the range lists a missing independent-context defect as open
   work. The withdrawal's reasoning was spot-checked by reading: the successor
   `local-checks.ts` compares the Record's identities, declaration and inputs
   with the separately supplied expected text before any binding work, which
   is the same property the withdrawal describes for candidate.3.
4. **Scope not widened.** Every packet document bounds the B-2 GO to the
   adjusted-value derivation, decode, projection, ties, identity and source
   connection, and states that controlled execution, D1, D2/D3, adoption,
   publication and the whole Research Gate remain open. `RELEASE-STATUS.md`
   says "Review the expansion plus this delta against `3c51172` before dependent
   promotion". No wording promotes the numerical GO to a release or execution
   claim.
5. **Reviewer-authored repair not treated as reviewed.** `INTAKE.json`
   dispositions the repair as "author-validated and wired; independent successor
   wiring review open"; the README, the handoff and `B2-PROVENANCE.json` state
   that the reviewer also authored the repair and that its receipt is not
   independent clearance of that repair.
6. **Author rerun labelled correctly.** `replay_b2.py` prints "author replay on
   successor, not a new independent review or whole-call acceptance";
   `B2-VALIDATION.json`, the handoff and the Protocol README repeat that it
   reuses independent expectations and is not a new investigation.

## 4. Section B: the stable-sort repair and its wiring

1. **Bytes.** Verifier `numerics/candidate.py` hashes to `a1b0bf80…5a694`,
   equal to the preserved repair (Protocol blob `a10a57c8…`) and to the values
   in `INPUTS.json`, `PROVENANCE.json`, `B2-PROVENANCE.json`, `outer-runtime.json`
   and `B2-VALIDATION.json`. `b2-sources/predecessor.py` hashes to
   `70924d2b…c606`, the historical `holm-experiment-20260911/candidate.py` (blob
   `fbebc6e4…` at `0c7a685`). `worker.py` and `oracle.py` are unchanged since
   `3c51172` and still match the PR #330 blobs.
2. **Bound derivation, independently.** The bottom-up schedule's final merge
   joins `[0, W)` with `[W, n)` for the largest power of two `W < n`, and every
   smaller block boundary inside `[W, n)` is aligned because `W` is a multiple of
   every smaller width, so `T(n) = T(W) + T(n − W) + n − 1`, `T(1) = 0`. A
   reviewer-written recursion agrees with `comparison_bound` for every `n` in
   `0..1024`, giving 9217 at 1024, 9207 at 1023 and 713 at 120. The bound is also
   tight: a reviewer-written adversarial "unmerge" construction (assign the two
   largest ranks of every merge to different blocks, recursively) made the
   implementation spend exactly the bound for all 1024 sizes, and a 1024-member
   family built from it was admitted with 9217 comparisons in both the identity
   and the value sort. Because the guard is `count <= comparison_bound(n)` and
   the count can never exceed the bound, the guard cannot fire for any family.
3. **Stability, ties, malformed input.** Ties take the left element (`<`, not
   `<=`), so the sort is stable; 3,000 random key sets with heavy ties, sizes up
   to 1024, returned exactly the permutation of Python's stable `sorted` and of
   the predecessor, with no bound violation. All-equal, ascending and descending
   inputs at 2, 3, 120 and 1024 stay within the bound. `comparison_bound`
   refuses `-1`, `1.5`, `"3"` and `True` with `bound domain`. Non-comparable
   keys cannot reach the sort because `transform` validates label type and `p`
   bytes before each sort, exactly as before.
4. **Interpreter independence.** The sort is in-module and iterative; no call to
   `sorted`, `cmp_to_key` or recursion remains, so no path lets an interpreter's
   sort algorithm change admission. The preserved `test_repair.py` C1 (6,000
   carriers, 2,385 refusing) and C2 (3,000 tie sorts) reproduce here with zero
   divergences from the predecessor's results and refusal reasons.
5. **Unchanged functions.** By a reviewer-written AST comparison, `require`,
   `decode`, `project`, `transform`, `identical`, `evidence_view` and
   `check_evidence` are unchanged; `ordered` is the only changed function and
   `comparison_bound` the only new one; the `transform` source text is
   byte-identical; `LIMIT`, `U`, `ALPHABET` and `DIAGNOSTICS` are unchanged. The
   refusal order inside `transform` is therefore unchanged, and the only refusal
   the predecessor could raise that the successor cannot is `comparison budget`.
6. **Pins point at the executed bytes.** `worker.py` reads `INPUTS.json`, hashes
   `candidate.py`, refuses on mismatch and executes the very bytes it hashed; the
   pin is `a1b0bf80…`. `outer-runtime.json` (32 rows) matches every head file,
   equals the sorted `pin-outer.py` inventory (now including `tsconfig.json`,
   `fault-injections.ts` and `outer-fault-entry.mjs`), and hashes to
   `f2a2811e…a260`, the value carried by every receipt in the `eda3ba9` archive.
   The `5ee62cd` inventory hashes to `916f57d1…1886`, the value in every
   `5ee62cd` receipt. No test exercises the predecessor while the runtime
   executes the successor: `test_worker.py` runs the wired module through the
   real worker, and the preserved predecessor is loaded only as a comparison
   baseline in the replay's temporary tree.
7. **Replay isolation.** `replay_b2.py` verifies the five provenance hashes,
   builds a temporary Protocol-shaped tree, runs the preserved `test_repair.py`
   there with the real predecessor as baseline and the wired module as
   candidate, then overwrites the temporary predecessor path with the wired
   module so that the preserved `independent_checks.py` imports it, asserts that
   the imported module's path and hash are the wired bytes, calls `c1_c2_c3`,
   `c4_c5` and `c6_c7_c8_c9` (never `main`, so no result file is written), and
   asserts equality of all nine result groups with the retained review
   `RESULTS.json`. Running it here under Python 3.12.3 and 3.11.15 exits 0 with
   the expected 9,600 level cases, 1,200 closed-testing families, 20,012 decodes,
   102,940 projections and 2,000 tie families all matching, 13,088 repair checks,
   1,024 bound sizes and 46,233 permutations. The one gap is m-1 below.
8. **119-member worker test.** The private worker admits `3..120` members on a
   trusted channel; the public path in `local-checks.ts` still requires an
   `all_pairs` family whose member count is exactly `k(k−1)/2` for `k` in
   `[3, 16]` and an exact member order, so 119 members are refused at D
   (`family_scope`) before any worker launch. Public admission is not widened.
9. **Domain, alpha, exact versus display, precedence.** `decode` still refuses
   negative zero (`p domain`, `C6`); `R3D-21` in the archive fails H with
   `p_domain` before any worker call. No `alpha` argument, rejection output or
   significance boolean exists in the module, worker, bridge or output schema.
   `compareArithmetic` still compares the exact numerator and the display bits
   separately (`R3D-22` fails A with `exact_value_mismatch` while display
   collides). Refusal precedence in TypeScript is unchanged because
   `output.ts`, `dependencies.ts`, `local-checks.ts`, `stored-bytes.ts`,
   `controlled-call.ts` and the contracts are untouched in the range.

## 5. Section B: primary source cross-check

Read from the supplied PDF: Holm's Definition requires the supremum of the
rejection probability over any true subset to be "smaller than or equal to" the
multiple level; Scheme 1 is stated for "a fixed number alpha, 0 < alpha < 1";
its steps compare the ordered obtained levels with `alpha/n`, `alpha/(n−1)`, …;
the Theorem 1 proof complements the event `R_i > alpha/m for all i in I` and
concludes the test "stops in the step n + 1 − m or earlier"; the paper states
that "there are no restrictions on the type of tests, the only requirement being
that it should be possible to calculate the obtained level"; and no adjusted
p-value appears anywhere in the paper (the applications section and Scheme 2
concern weighted levels, not adjusted values). Every decision-bearing fact the
B-2 review attributes to the source is therefore supported. The text extraction
renders the scheme's inequality glyph ambiguously; the non-strict reading the
review adopts is the one forced by the proof's strict complement. The reviewer's
own re-execution of `independent_checks.py` in a scratch copy reproduced all ten
retained result groups exactly, including C10's 9,183 at 6,000 iterations.

## 6. Section C: the expansion and closure of the prior MINOR findings

1. **m-2 closed.** `isInputAccessError` in `execution.ts` is shared by the Record
   and expected adapters and covers the regular-file violation plus ENOENT,
   EACCES, EPERM, ENOTDIR, EISDIR, ELOOP and ENAMETOOLONG. Reviewer probes
   through `prepareInnerFiles` at `eda3ba9`: a Record symlink loop, an overlong
   Record path, a dangling symlink, a path through a file and a character device
   all refuse `input_access_error`; a symlink to a regular Record still reports;
   the expected side keeps its C error (`expected_unreadable`) for the same
   faults. The archived `ACCESS-loop` and `ACCESS-overlong` runs are real
   controlled calls with `input_access_error` results and complete cleanup.
2. **m-3 closed.** `outer-cases.ts` records `expected: null` for absent
   context, `outer-host.py` passes `-`, `outer-run.mjs` maps `-` to `undefined`,
   `controlledCall` omits the positional argument, the supervisor's `expected`
   is `nargs="?"`, and the entry accepts three arguments. The archived `R3D-16`
   result carries C error `expected_missing`, a reason that `local-checks.ts`
   emits only when no path was supplied, so the omitted-argument path ran on
   the actual supervisor. The separate `R3D-17-missing-file` and
   `R3D-17-directory` runs carry `expected_unreadable`; the two conditions are
   no longer conflated.
3. **Fault entries cannot be selected or accepted.** `controlled-call.ts` is
   unchanged in the range and never passes `--probe`; `fault-injections.ts` is
   imported only by `outer-fault-entry.mjs` and its test; the supervisor routes
   only its fixed `--probe` enumeration to the fault entry. Feeding the archived
   `fault-a-pass`, `fault-s-pass` and `fault-late-budget` receipts to
   `projectTrustedReceipt` returns `internal_error` with no forwarding; even
   with `probe` forced to `null` they yield only the inner refusal, never a
   report, because their results contain refusal output. Archived normal
   receipts project to reports with forwarding as recorded.
4. **Fabricated success.** All fourteen fixed faults (impossible A pass,
   graph-consistent all-pass lie, swapped, duplicated and omitted rows, outcome
   on C error and on A not_run, generic-only, missing and unrelated blockers,
   missing reason, late all-pass and S-failure budgets, malformed worker output)
   end in a refusal with no `record_reference` in the 15 local tests and in the
   14 archived supervisor runs, each of which carries `probe` set to the mode
   and a result of exactly `output` with `kind: refusal`. The all-pass lie is
   first shown to pass `validateWire` and is then rejected by the private
   evidence comparison in `validateCompletion`; the code order in `complete()`
   (report, `beforeValidate`, checkpoint, `validateCompletion`, encode, re-parse,
   `validateCompletion`) leaves no route from a mutated output to encoding.
5. **No unintended change.** The range changes `execution.ts` (shared
   classification only), `inner-call.ts` (uses it), `outer-supervisor.py`
   (probe routing and enumeration only), `candidate.py`, pins, tests, cases,
   evidence and documents. Dependency graph, reason ownership, output schema,
   refusal kinds, wire validation and forwarding checks are untouched.

## 7. Section D: the 120-member maximum and the execution archives

- **Checkout.** `refs/pull/20/merge` fetched today is commit `d3730adf…` with
  tree `17868936…` (equal to the fixed head's tree) and parents `940b8fb` and
  `eda3ba9`, as `HOST-EVIDENCE.json` records.
- **Archive integrity.** `controlled-host-eda3ba9.zip` from Protocol `3233522`
  hashes to `ca20d25d…bf80e`, 273,257 bytes, 216 files, as recorded.
  `RESULTS.json` reports Node v24.19.0, Python 3.12.14, 75 of 75: 48 ordinary
  rows, 14 `fault-` rows and 13 `host-` rows, the stated breakdown.
- **Inputs.** `outer-cases.ts` at `eda3ba9`, run here, regenerates 48 cases
  whose 90 input files are byte-identical to the archived `inputs/` files
  (`record-loop`, the cyclic link, is absent from the archive as documented; no
  symlink is archived). The archived `cases.json` equals the local one after
  replacing the input root directory only, so the only normalization the
  author's comparison needed is the one claimed. The same holds for `5ee62cd`:
  47 cases, 88 files, byte-identical, and its archive hashes to `400160b5…dfc3c`.
- **Receipts.** All 48 ordinary receipts are `completed_valid`, leader exit 0,
  `probe: null`, cleanup all true, the five controls at the fixed values, zero
  enforcement deltas, manifest `f2a2811e…` and 48 distinct nonces. Every result
  matches its predetermined expectation, including the reason lists and the
  `R3D-42` blocker order and union checked by the host runner. The 14 fault
  receipts and 13 host controls match their plans (OOM group kills for both
  memory probes, `nr_throttled` 19, pids `max` 1567, overflow, deadline after a
  provisional write, cancellation). A reviewer re-check of the `5ee62cd`
  receipts gives the same result for its 47 calls.
- **Forwards.** Exactly five results carry `verified_record_base64`: `R3D-01`,
  `R3D-23-zero`, `R3D-23-subnormal-tie`, `R3D-23-one` and
  `R3D-23-maximum-family`; each decodes to the archived original bytes.
- **Maximum family.** The archived Record has 16 groups, 16 units, 16
  observations, 120 all-pairs members, every `p_hex` equal to
  `0000000000000001` and every adjusted entry `78` / `0000000000000078`. The
  expectation is independently derivable: with 120 tied least subnormals the
  rank-0 product is `120 × 2^-1074`, all later products are smaller, the running
  maximum stays at numerator 120 (hex `78`), and 120 units of `2^-1074` is the
  subnormal whose bit pattern is 120, so the display is `0000000000000078`. The
  result row shows H, C and A pass with the selected scope `a-0`/`f-0`/`r-0`,
  the receipt is a complete-cleanup normal call (0.92 s, 21 peak tasks), and
  the forwarded bytes equal the input. The same reasoning fixes the other three
  numeric fixtures (all zero gives 0; three tied least subnormals give 3; all
  ones give `2^1074` capped, displayed as `3ff0000000000000`), and none of them
  was produced by the worker.
- **Distinction.** Everything above is verification of the author's retained
  archive plus local regeneration and projection probes. The reviewer executed
  no cgroup-controlled call.

## 8. Section E: the R1 correction

- **Facts checked against GitHub and git.** Release `release-1` exists, id
  375423969, `draft: false`, `prerelease: false`, `published_at`
  2026-08-24T03:22:47Z, eight assets. The annotated tag object is
  `1be66121…dacbacf` and peels to `5db97826…f9be95`, "Release 1: close R1-14 and
  authorize publication (D)", an ancestor of `main`. The tag message and the
  release body carry C8 `83d07d03…` (exists as "Release 1 Candidate C8"), P
  `bed7823a…`, R `47eeafb0…` ("establish final release source R") and snapshot
  `sha256:fc26c770…ab06`. The downloaded `release-checksums.json` hashes to the
  asset digest GitHub reports and names the same C8, R and snapshot. Every value
  in the `R1-BOUNDARY.md` table is therefore correct; the tag itself is
  unsigned, which the note does not contradict because it speaks of the signed
  assets.
- **Two separate problems.** `pnpm snapshot:manifest --check-candidate` at
  `3233522` fails because the candidate-frozen file set has grown by the R2/R3/R4
  successor workflows, evidence and tests added since C8, with nothing removed.
  `governance/RELEASE-POLICY.md` scopes that check to "before publication" and
  makes every published draft an immutable snapshot changed only through
  successor releases; `AGENTS.md` scopes the freeze constraint "until
  publication"; and `tooling/src/release/release-1-history.ts` "deliberately
  permits additive successor artifacts" while verifying the signing-key
  fingerprint, the candidate-freeze evidence bytes, the three detached
  signatures and the snapshot manifest. `pnpm validate` at `3233522`, which runs
  that checker, passes. The development-tree comparison and the published
  history audit are different code paths with different subjects, so the
  correction's separation is right.
- **No refreeze or resigning needed.** Nothing in the range edits R1 gate
  states, signatures, audit constants, freeze manifest, evidence or the tag; the
  diff of `authority/`, `evidence/` and `tooling/` between `main` and the PR head
  is empty, and so is the source branch's. Replacing a published signed artifact
  would be a separate steward decision under the Release Policy; the R3 work
  does not require one. The reviewer could not inspect the original takeover
  report, which is not in either repository; the correction is judged on its
  checkable claims, all of which hold.

## 9. Section F: remaining work and publication boundary

- `ACCEPTANCE-COVERAGE.json` keeps all 44 locators at "partial; no whole-row
  closure claimed". Every variant it names exists in the archive or the fault
  plan; six locators (R3D-26, 27, 33, 35, 41, 44) list no variant and name
  their remaining evidence, and the two ACCESS regressions are listed at the
  top level. Nothing in the map, handoffs or Protocol records claims a closed
  row, host qualification or D1 completion; D2 (dispatcher, legacy argument)
  and D3 (schema, reason, authority, `p_generation` vocabulary) are explicitly
  outside this delta.
- The range touches no file under `reference/`, `bin/`, `package.json`,
  SOURCE-PIN or the npm `files` allowlist; `npm run test:package` still rejects
  any `development/` tarball entry; `tests/boundary.ts` lists every new file by
  name. The supported dispatch is unchanged.
- The Holm PDF is absent from both repositories; only its hash and citation are
  recorded. The archives contain synthetic inputs, plans, results and receipts
  with GitHub runner temporary paths; no credential, private path or internal
  note was found in the public diff.

## 10. Findings

### MINOR

**m-1. The replay does not compare the repair rerun with the preserved repair
results, and those results are not in the source closure.** `replay_b2.py`
asserts the nine review result groups against `b2-sources/RESULTS.json` (the
review's file, blob `f9649ace…`) but records the `test_repair.py` rerun only
through its exit status; the repair packet's own `RESULTS.json` (Protocol blob
`e4802b3f…`, SHA-256 `7eeb3725…db45`, 13,088 checks with observed maxima per
size) is neither imported into `numerics/b2-sources` nor pinned in
`B2-PROVENANCE.json`, although the handoff says the preserved scripts and
results are under `b2-sources`. Reproduction: run `replay_b2.py` and compare
its `preserved_repair_checks` with the Protocol file by hand; nothing in the
tree does so. Expected: the author's "13,088 checks and no divergences" claim
is verified against the retained expectation, as the review groups are.
Actual: only `test_repair.py`'s internal zero-divergence exit is checked.
Impact: low, because the repair checks are self-contained comparisons against
the predecessor and the reviewer's rerun in a scratch copy matched the retained
file exactly; the gap is in reproducibility bookkeeping, not correctness.
Minimal correction: copy the repair `RESULTS.json` into `b2-sources` with a
`B2-PROVENANCE.json` row and assert equality of all result groups except
`environment` in `replay_b2.py`. Closure check: the replay fails when the
retained repair results are altered.

### NONE

No BLOCKER or MAJOR finding. Prior m-2 and m-3 are closed (Section 6).

## 11. Nonblocking observations

- The coverage map cites the 13 host lifecycle controls only in prose for
  R3D-26, R3D-27 and R3D-36; naming them per locator would make the map
  self-contained.
- `outer-cases.ts` still writes regular `ACCESS-loop.record` and
  `ACCESS-overlong.record` files that no call reads; they are counted among the
  90 matched inputs. The handoff discloses this; dropping the unused files would
  remove the ambiguity.
- Every normal call in the new archive still reaps exactly one non-leader
  descendant with exit status 0; the expansion handoff records it as
  unidentified and the reviewer has no new evidence about its identity.
- On unpinned hosts the author test "direct launcher rejects unavailable
  delegation before Record access" passes for the interpreter-pin reason, as
  noted in the previous review; unchanged.
- `AGENTS.md` states the freeze constraint less explicitly than the Release
  Policy; the policy and the checker are the controlling sources and agree with
  `R1-BOUNDARY.md`.

## 12. Dispositions of the B-2 items

- **B-2 GO:** reusable as bounded numerical and source evidence for the exact
  predecessor blobs and, by the unchanged-function and replay evidence above,
  for the wired successor's arithmetic; not evidence for controlled execution,
  D1, D2/D3, adoption or publication.
- **SHOULD-FIX-1 repair:** correct, tight, interpreter-independent and wired to
  the executing bytes; this section is this reviewer's independent check of the
  repair, which its author's rerun could not supply.
- **SHOULD-FIX-2 withdrawal:** preserved and consistent with the successor
  code; no open item should be derived from the withdrawn text.
- **OPTIONAL-1 and OPTIONAL-2:** dispositions recorded as stated; no code
  change required and none made.

## 13. What can proceed and what cannot

Can proceed: the m-1 bookkeeping repair; expansion of the parameterized
44-locator matrices (limits below/equal/above, owned-reason and scope
combinations, rounding and tie sets), independently authored raw-projection and
digest oracles for full calls, injected helper corruption for R3D-43/44, and
actual failed-cleanup and supervisor-loss evidence, all within the unissued
development tree.

Cannot proceed on this verdict: D1 completion, host qualification, the D2
dispatcher or legacy-argument behaviour, D3 schema/reason/authority
integration, any SOURCE-PIN or supported-dispatch change, any RFC, gate or
release action, and any claim that the B-2 GO or this checkpoint clears the
Release 3 Research Gate.

## 14. Custody note and actions not taken

This session cannot push to `nomue-verifier`. The fixed-head record is
preserved in the Protocol reviewer branch under
`review-inputs/r3-holm-d1-b2-integration-20260918/REVIEW-RESULT.md`; the author
may import it byte for byte as prior reviews were imported. No comment was
posted to PR #20 or PR #355; nothing was merged, published, adopted, issued,
reset or re-pinned; no product code, design document, prior review or original
evidence was changed.
