# R2-D5 Group 3 supported-execution admission-evidence independent review result

## Verdict

GO

The exact PR #141 head `5563bae511069cc3bc73a2e3db24d8448de9fe2a` may be
considered for merge as non-authoritative R2-D5 Group 3 admission-evidence
infrastructure. No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding remains in
this bounded review.

Per protocol section L, `GO` means only that the exact head safely implements
non-authoritative evidence infrastructure: a controlled runner that checks the
one proposed exact tuple, its composition with the closed Group 2 full-trace
candidate, the cold/post-warm-up exact-head evidence workflow with a
compiled-file digest manifest, the evidence validator, and the review
protocol, while keeping every support promotion false, pending, or
unselected. It does not select the exact runtime allowlist, select the
controlled-process profile for a supported runtime, complete cross-platform
admission evidence, select the supported-execution predicate, close Group 3,
claim a supported platform/domain/runtime, freeze bounds/contract/tables/
constants/tolerances/reason codes, issue a Public Check or bundle, or change
RFC #25, R2-D5, or Release 2 state. Any different head requires a new
independent exact-head review.

## 1. Exact identity and delta (protocol A)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#141` (branch `r2-d5/group-3-admission-evidence-candidate`)
- Sole parent, base, and merge base:
  `68e2cb2d8b8a6bae9991b04fca4be73bc3f6144c` (= live `main`, tree
  `e4229513dbfb86f21592d9abd22e3a57a36488ff`)
- Reviewed head: `5563bae511069cc3bc73a2e3db24d8448de9fe2a`
- Reviewed tree: `1b256b4e7a969da61efb135f2c22a9166332e6d6`
- Structure: one ahead-only commit
- Delta: exactly the 12 declared paths, `+2066/-0` (pure additions)
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times. The 12 paths are
limited to the admission-evidence workflow, checkpoint JSON, review protocol,
collector/evaluator/validator modules, the readiness overlay JSON/module and
its test, the focused evidence test, the numerical README section, and one
added package.json script. No pre-existing numerical implementation, component
checkpoint, table, corpus, evidence byte, durable review, authority input,
registry, authoritative schema, conformance fixture, Public Check, bundle,
reference verifier dispatch, or Release 1 content changed; `AGENTS.md`,
`CHARTER.md`, `AUTHORITY.md`, `governance/ID-POLICY.md`, `governance/RFC.md`,
and the registries tree are byte-identical to the previously reviewed state.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context. No declared SHA, digest, tuple, rollup, or
verdict was trusted: every source binding was re-resolved from Git objects;
the proposed runtime executable was re-obtained from the official Node.js
distribution and re-hashed; the evidence content was reproduced end-to-end in
a reviewer-controlled process; and the numerical rows were re-verified with
the same independent exact-rational/high-precision oracle used for the
Group 2 reviews. All harnesses were temporary files outside the repository;
this result file is the review's only repository artifact.

## 3. Source reconstruction (protocol B)

The checkpoint's `source_snapshot` declares commit
`68e2cb2d8b8a6bae9991b04fca4be73bc3f6144c` and tree `e4229513...`; both were
independently confirmed, and all 13 bindings were re-resolved with
`git rev-parse <commit>:<path>`: 13/13 blob SHA-1 values match. In
particular:

- Group 1 and Group 2 are recorded and bound only as closed non-authoritative
  candidate-selection milestones with preserved exact-head reviews;
- the Group 2 selection review blob independently re-resolves to
  `fc4da85398eeda3220b0ae0f4401195db0228250` and the Group 2 closure review
  blob to `c24d14e8f9ea830cb9ec07815f80dc8db5c9038d`, byte-identical to the
  durable results preserved on `main`;
- the bound Group 1/Group 2 checkpoints, corpus, full-trace evaluator, tail
  supported-execution checkpoint/implementation/disposition, Section H
  supplement/comparison, and platform-research disposition are byte-identical
  to the artifacts examined in the earlier Group 1/Group 2 exact-head reviews
  of this series;
- the historical Section H records are bound as historical only
  (`historical_evidence_is_current_admission: false`,
  `current_group_2_exact_head_evidence: "pending"`); and
- the supported-platform research disposition still records the supported
  platform as unselected and requires an exact allowlist plus cross-platform
  admission evidence as future, separately reviewed work.

## 4. Proposed tuple independently reproduced (protocol C)

The official `node-v24.19.0-linux-x64.tar.xz` was downloaded from
`nodejs.org` and matched the official `SHASUMS256.txt` entry
(`14b342e71204f811bde6153be8e04b62aef63c236fef92b55f9c83154b409647`). Its
`bin/node` executable hashes to exactly the pinned
`bc17c508ffeed0ec622934f9b7fa72f8e78da65350e63c3eceb56fa688aa5e12`, and
running it reports Node `24.19.0`, V8 `13.6.233.17-node.51`, `linux`, `x64`
— the complete proposed tuple. The Section H comparison confirms runner
`supplement-h-linux-x64-node24` exercised this identity line with the same
abbreviated executable hash, and the supplement records the exported entry
function as verifiably optimized (mid-tier) on that runner while explicitly
not sampling deeper helper tiers. The new checkpoint retains those records
as historical evidence that cannot become current admission by itself.

## 5. Controlled-process enforcement (protocol D)

The exact-head candidate was compiled with the workflow's exact `tsc`
invocation into a `compiled` tree (19 files; local digest manifest recorded),
and the collector was executed under the independently obtained exact
executable with exactly
`--permission --no-addons --disallow-code-generation-from-strings
--frozen-intrinsics` plus the two read grants (compiled tree, executable).
Inside the controlled process:

- the permission API reports addons/child/worker/WASI/inspector/fs-write all
  denied and both read grants present;
- live probes were refused with recorded boundaries: child process, worker
  threads, filesystem write, filesystem read outside the grants, WASI, and
  inspector at the Node permission boundary (`ERR_ACCESS_DENIED`); native
  addons via `--no-addons` (`ERR_DLOPEN_DISABLED`); `eval` and `Function`
  via `--disallow-code-generation-from-strings` (`EvalError`); and
  `Math.sqrt` assignment/redefinition, `Array.prototype`, and
  `Object.prototype` mutation via `--frozen-intrinsics` (`TypeError`);
- `Math` is frozen and `Math.sqrt` is non-writable, non-configurable; all
  eight binary64 sentinels pass; pre/post environment identity holds; the
  accepted result is deep-frozen with all nine public support flags `false`.

Negative executions all refused without a support claim, with the correct
classification: an ordinary review-environment process and a
tampered-executable copy refuse as `runtime_build_platform_tuple_mismatch`;
a missing `--frozen-intrinsics`/`--no-addons`/`--disallow-code-generation`,
a duplicated `--permission`, a wildcard/third/parent-directory grant, and
forbidden `--allow-child-process`/`--allow-fs-write`/`--allow-worker` grants
refuse as `controlled_process_profile_not_established`. Environment-validator
attacks additionally covered empty, whitespace, `.`,`..`, root, above-tree,
single, duplicate-executable, and retyped grants, every forbidden permission,
each intrinsic and sentinel flip, and hostile shapes.

## 6. Group 2 composition and same-invocation binding (protocol E)

For accepted cases the candidate calls the selected Group 2 full-trace
evaluator (module byte-identical to the closed Group 2 selection except its
already-reviewed checkpoint pin), re-verifies the returned envelope, and
requires deep-equal pre/post environment reports. The six evidence-case
projections were re-derived directly from raw inputs with the Group 2
evaluator under the exact tuple and compared field-by-field with the
controlled-process rows: 0 mismatches, including binary64 p-value and
endpoint bits, all four digests, both pinned table hashes
(`sha256:ba1f9921...76c08`, `sha256:24ccc86d...ea3c0`), and the Group 1
resource envelope values. The independent exact-rational oracle (integer
rationals, independent binary64 decoder, 2048-bit dyadic square-root
enclosures, 400-bit regularized incomplete beta, and independent
reimplementations of every digest recipe) re-verified the five accepted
envelopes end-to-end: 311 checks, zero failures. The collapse case remains a
fail-closed Group 2 refusal (`group_2_full_trace_refusal` with upstream
`g4_tail_stage_refusal`). Composition attacks — substituted digests from a
different valid input, coherently re-digested rows, changed resource
values, changed table hashes, stale environment identity, and cold/hot
environment drift — are all rejected by the pinned-rollup evidence
validator.

## 7. Cold and optimized evidence (protocol F)

Hosted run `33586026811` ("Release 2 paired-t supported-execution admission
evidence") completed successfully on the exact head with artifact
`release-2-paired-t-group-3-admission-5563bae5...` (ID `9830100535`,
25,649 bytes). Its ZIP SHA-256 is recorded by both the GitHub artifact API
and the run's upload log as
`04d39b25d631ec6acc02d03d88a954d1302174f8e5790e5c6b755fdcb9af84b9`, matching
the expected digest. The job log's validation step prints exactly the pinned
result: candidate commit = exact head, 6 cases,
`platform_neutral_rollup a6274fb82627f0be78bc71a5e46e9641586cc8749a2c2a07de77adfddb5ddd4a`,
cold/hot identical, no support selected or claimed.

The review environment's egress policy does not permit fetching the artifact
ZIP bytes from GitHub's blob storage host, so the artifact contents were
verified by full independent reproduction instead: the identical compile
procedure, the independently obtained exact executable, and the identical
controlled flags produced local cold and hot manifests whose
`platform_neutral_rollup` is byte-identical to the hosted value above, whose
rows are byte-identical cold-vs-hot, and which the repository evidence
validator accepts against the exact head. The cold environment records no
`--trace-opt`; the hot environment records exactly one. The local hot run's
optimization trace contains 145 matching named-function lines; the engine
completed optimized-tier compilations for `normalizeDyadic` (MAGLEV then
TURBOFAN_JS, including a `completed optimizing` entry), `buildTrace`
(MAGLEV), and `runDiagnosticSentinels` (MAGLEV). No deeper helper
optimization is claimed beyond these logged functions. The six ordered cases
cover both scope ends (2 and 201 pairs), ordinary central and tail branches,
exact zero, and the confidence-interval collapse refusal.

## 8. Validator and hostile-shape battery (protocol G)

The checkpoint's canonical SHA-256 was independently recomputed with a
separate implementation and equals the evaluator pin:
`sha256:b0adf7c9d1a7241a1aaaff67988fa74343e9dbc04b3b34307f200f63bb002e0f`;
object-key reordering remains accepted (non-semantic) while array
reordering fails closed.

A reviewer-owned battery of 250 attacks ran across the five public surfaces
(checkpoint validator, environment validator, admission-evaluator input,
in-memory cold/hot manifests validator, aggregate readiness validator):
missing/extra/reordered/duplicated/retyped fields; source
commit/tree/path/blob/role and binding-order changes; tuple, executable
hash, flag, grant, permission, intrinsic, and sentinel changes; mode, case
identity/order, row, rollup, digest, table, resource, and commit changes;
one-sided and two-sided cold/hot changes; coherent rollup recomputation
after every meaningful row mutation (the pinned rollup still refuses);
every selection/completion/support/issuance/RFC promotion; and NaN,
infinities, negative zero, BigInt, functions, hidden properties, Symbols,
accessors, sparse and extended arrays, throwing proxies, cycles, non-plain
prototypes, and null/string/array roots. 249 were rejected
deterministically. The single non-rejection was a reviewer-harness
expectation error, not a candidate defect: the mode-agnostic environment
validator intentionally does not bound the count of the diagnostic
`--trace-opt` flag, because the mode-aware evidence validator owns that
constraint — and its attacks (a `--trace-opt` in cold, a missing one in
hot, a duplicated one in hot) are all rejected, so no duplicated-flag
manifest can reach accepted evidence. Zero caller-provided getters ran on
any surface (five independent counters), no exception escaped any public
surface, repeated attacks returned identical results, and accepted
evaluator outputs are deep-frozen.

## 9. Regression and hosted checks (protocol H)

`pnpm install --frozen-lockfile` succeeded. The `pnpm check` wrapper ran in
this environment through format, Markdown lint, typecheck, and
`validate: OK`, stopping only at the full-test stage on the one
container-slowed test below; the remaining stages (generated, Phase 1,
Phase 2A, Phase 2A-021) were then run individually and are all green. The full Vitest suite is 52 files / 493 tests;
492 passed and one failed: the pre-existing Group 1 test "replays
operation-stage boundaries and the reviewed tail resource edge", untouched
by this PR, which carries an explicit in-source 30-second limit and needed
about 36 seconds in this review container (a measured container slowdown
also observed in the previous review). Its complete body was replayed
through a timeout-free reviewer harness at this head: all 17 assertions
pass (11/11 boundary-case replays, the 5,182-iteration / 8,064-cap /
72,567-node heavy witness, the resource-envelope edge acceptance, and the
72,566-refuses / 72,567-accepts review-limit edge). The focused Group 3
evidence, aggregate readiness, and Group 2 full-trace suites pass 35/35.

Hosted checks on the exact head are 8/8 green:

- CI run `33586026802`: 5/5 jobs — Full check (Linux x64, Node 22), Full
  check (Linux x64, Node 24), Phase 1 + 2A (Linux arm64), Phase 1 + 2A
  (macOS arm64), Phase 1 + 2A (Windows x64);
- paired-t candidate evidence run `33586026781`: success;
- runtime-series evidence run `33586026798`: success; and
- supported-execution admission evidence run `33586026811`: success.

Only runs bound to `5563bae511069cc3bc73a2e3db24d8448de9fe2a` were used;
runs on the superseded draft head were ignored.

## 10. Non-promotion audit (protocol I)

Directly from the exact head bytes: authoritative bounds, numerical-contract
freeze, final table promotion, the platform matrix, the runtime allowlist
(empty), controlled-profile selection/enforcement for a supported runtime,
admission-evidence completion, the supported-execution predicate, supported
domain/runtime, global truth-error constants and comparison tolerances
(null), final reason-code freeze, Public Check and supported bundle
(unissued), RFC #25 (open), R2-D5 and Release 2 (incomplete) all remain
unpromoted in the checkpoint, the readiness overlay, and the evaluator's
public result fields; the prohibited-claims list and both validators refuse
every attempted promotion. The finite historical values 374 ULP, 2,978 ULP,
5,182 iterations, and 72,567 tail nodes remain observations, and the
100,000-node tail value remains Group 1's reviewed fail-closed design
ceiling, not a corpus maximum.

## 11. RFC boundary (protocol J)

Issue #25 was inspected live during this review: state open, public review
window OPEN, earliest decision `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`) unchanged. This increment is reviewable and
mergeable before that time only as non-authoritative development material,
and it does not close or shorten the window.

## 12. Review-environment limitations

Two limitations of this review environment are recorded for transparency;
neither is a candidate defect. First, the organization's egress policy
blocks GitHub's artifact blob-storage host, so the hosted artifact ZIP bytes
(including the hosted `compiled-sha256.txt` and `hot-optimization.log`)
could not be fetched directly; the artifact's identity was verified through
the GitHub API record and the run's upload log, and its content through the
byte-identical independent local reproduction described in Section 7.
Second, the review container runs measurably slower than hosted runners, so
one pre-existing 30-second-limited heavy test exceeds its in-source limit
locally; its behavior was fully verified timeout-free, and the hosted Full
check jobs are green on the exact head.

## 13. Binding

This result is bound to exactly
`5563bae511069cc3bc73a2e3db24d8448de9fe2a` and approves merge consideration
of the non-authoritative Group 3 admission-evidence infrastructure only. It
does not merge the PR, does not select the runtime allowlist, controlled
profile, or supported-execution predicate, does not complete or close
Group 3, and does not change authority, RFC #25, R2-D5, or Release 2 state.
A later selection increment requires its own exact-head independent review.
