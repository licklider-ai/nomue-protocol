# R2-D5 Group 3 supported-execution selection independent review result

## Verdict

GO

The exact PR #143 head `9e58eccb3cde54a4f653340d13170fbdf559b62b` may be
considered for merge as the non-authoritative, one-entry R2-D5 Group 3
supported-execution candidate selection. No BLOCKER, SHOULD-FIX, or
NICE-TO-HAVE finding remains in this bounded review.

Per protocol section K, `GO` means only that the exact head safely makes the
non-authoritative one-entry candidate selection — the single reviewed tuple,
its controlled-process profile, and their composition with the closed
Group 2 full-trace predicate — and may be considered for merge. It does not
close Group 3 before review preservation, issue an authoritative allowlist,
controlled profile, or supported-execution predicate, claim broad
cross-platform support or a supported domain/runtime, freeze reason codes,
issue a Public Check or bundle, or change RFC #25, R2-D5, or Release 2
state. Group 3 closure requires a separate, separately reviewed
closure-synchronization increment. Any different head requires a new
independent exact-head review.

## 1. Exact identity and boundary (protocol A)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#143` (branch `r2-d5/group-3-supported-execution-selection`)
- Sole parent, base, and merge base:
  `3b4eab15bf3f5bb02819d27b4ab9e28bf2055f0b` (the #141 review-preservation
  merge; live `main` at review start)
- Reviewed head: `9e58eccb3cde54a4f653340d13170fbdf559b62b`
- Reviewed tree: `fb83d6635e95d4bb50048bfcfb98bdbd835c5f28`
- Structure: one ahead-only commit
- Delta: exactly the 18 declared paths, `+2636/-50`; mergeable (clean)
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times. The 18 paths are
limited to the selection workflow, checkpoint, review protocol, selection
evaluator/collector/validator, the durable admission-evidence directory (six
preserved files), the readiness overlay JSON/module/tests, the numerical
README, and one added package.json script. `AGENTS.md`, `CHARTER.md`,
`AUTHORITY.md`, `governance/ID-POLICY.md`, `governance/RFC.md`, the
registries tree, and the authority tree are byte-identical to the previously
reviewed state.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context. No declared SHA, digest, tuple, rollup, or
verdict was trusted: all bindings and the review/preservation chain were
re-resolved from Git objects; every preserved-evidence byte pin was
recomputed from file bytes; the checkpoint canonical hash was recomputed
with a separate implementation; and the exact-head evidence was reproduced
end-to-end in a reviewer-controlled process using the independently obtained
official Node executable. The bound admission-evidence review result and its
preserved evidence originate from this reviewer role's own earlier
exact-head review of PR #141 and are consumed here as pinned repository
artifacts, re-verified from bytes. All harnesses were temporary files
outside the repository; this result file is the review's only repository
artifact.

## 3. Source and preserved-review reconstruction (protocol B)

The checkpoint's `source_snapshot` declares commit
`3b4eab15bf3f5bb02819d27b4ab9e28bf2055f0b` with tree `6ee8ea33...`; both
were independently confirmed, and all 14 bindings were re-resolved with Git
object commands: 14/14 blob SHA-1 values match, including the Group 1 and
Group 2 closure review results and the Group 3 admission-evidence
checkpoint, guard, collector, validator, workflow, protocol, and review
result.

The review/preservation chain was reconstructed independently and matches
every pin:

- reviewed infrastructure head `5563bae511069cc3bc73a2e3db24d8448de9fe2a`
  with tree `1b256b4e7a969da61efb135f2c22a9166332e6d6`;
- candidate merge `4f48278bd50806bd16f62af4d1cc346321f7a1dc` with parents
  `68e2cb2d...` and the reviewed head (second parent) and with the reviewed
  tree as its tree;
- review commit `e2274e8b844dcf08d5f4e0a8e14225528ac561bb` whose sole
  parent is the reviewed head, whose tree is `6ee8ea33...`, and whose only
  added file is the result blob
  `97bcc1ac0b59e56f84d997e83d10e43d3285933a`;
- preservation head `ff5834199b3393d3fa85294d0112213aa432aa25` (sole parent
  = the candidate merge; tree `6ee8ea33...`); and
- preservation merge `3b4eab15bf3f5bb02819d27b4ab9e28bf2055f0b` (parents =
  candidate merge and preservation head; tree `6ee8ea33...`).

The result blob is byte-identical at the review commit, preservation head,
preservation merge, source snapshot, and the exact PR head; it is absent
from the candidate merge tree, which predates it (not applicable). The
preserved result was read in full: verdict `GO` with zero BLOCKER, zero
SHOULD-FIX, and zero NICE-TO-HAVE findings, bounded to admission-evidence
infrastructure only, and explicitly requiring a separate exact-head review
for any later selection — it does not pre-authorize this increment.

## 4. Durable #141 evidence binding (protocol C)

`artifact-manifest.json` was independently hashed:
`sha256:2aef6ddd1177a6bcae62d32325a03486c7b0ee838b48f57d6b11078fa7cf42f2`,
matching the checkpoint, the readiness overlay, and the validator pin. All
five preserved members match their declared sizes and SHA-256 values
(`cold.normalized.json` 10,861 B; `hot.normalized.json` 10,881 B;
`compiled-sha256.txt` 2,550 B; `hot-optimization-matches.txt` 20,628 B /
145 lines; `validation.normalized.json` 325 B). The durable bundle
validator accepts, including its internal re-validation of the normalized
cold/hot manifests against candidate head `5563bae5...` with rollup
`a6274fb82627f0be78bc71a5e46e9641586cc8749a2c2a07de77adfddb5ddd4a`.

The normalization was verified independently and exactly: applying only the
declared substitutions (hosted-runner `executablePath`, `modulePath`, and
the two corresponding read-grant spellings, to `/candidate/runtime/node`
and `/candidate/compiled`) to this reviewer's own fully independent #141
local reproduction produces files byte-identical to the preserved
`cold.normalized.json` and `hot.normalized.json`, and the independently
compiled digest manifest is byte-identical to the preserved
`compiled-sha256.txt`. Numerical rows, tuple facts, permissions,
intrinsics, sentinels, p/endpoint bits, all digests, table hashes, resource
accounting, and case order are therefore unchanged from the original
artifact content. The matches file contains only lines naming
`buildTrace`, `runDiagnosticSentinels`, and `normalizeDyadic`.

The manifest retains the original artifact identities: run `33586026811`,
artifact `9830100535`, ZIP SHA-256
`04d39b25d631ec6acc02d03d88a954d1302174f8e5790e5c6b755fdcb9af84b9` (also
confirmed by the GitHub artifact API record and that run's upload log), the
original cold/hot member sizes and hashes, and the unpreserved full
optimization log (252,258 B,
`sha256:2d7d8ea382084ea04d3f0b19d7efa452f0dd6086a868ce0c29ab54904b4891b2`).
This review environment's egress policy blocks GitHub's artifact
blob-storage host, so the ZIP bytes could not be fetched directly; the ZIP
digest is confirmed through two independent GitHub records, and every
preserved member was verified through the byte-identical independent
reproduction above. The 90-day artifact retention is not the durable
evidence; the in-tree preservation is.

## 5. Candidate selection semantics (protocol D)

The checkpoint's key-sorted compact-JSON SHA-256 was independently
recomputed with a separate implementation:
`sha256:5b00688bb049c37cd07ec7a3a92b15f82a8bb1e6dae382f180cdcbaf8a8be22d`,
matching the evaluator and validator pins. The candidate matrix contains
exactly one entry — Node `24.19.0` / V8 `13.6.233.17-node.51` / `linux` /
`x64` / executable SHA-256 `bc17c508...aa5e12` — and the candidate matrix,
exact allowlist, controlled profile, and supported-execution predicate
selection flags are true only at the candidate layer.
"Every selected tuple has admission evidence" is quantified over this
single-entry matrix only; unlisted tuples refuse candidate admission
(`candidate_admission_refusal_without_frozen_protocol_reason_code`), and
`broad_cross_platform_support_claimed` is false. Independent review remains
pending, Group 3 remains open, and every authoritative or public support
field remains false or unissued.

## 6. Controlled-process and full-trace replay (protocol E)

The exact head was compiled with the workflow's exact `tsc` invocation into
a `compiled` tree (20 files; digest manifest recorded) and run under the
independently obtained official Node 24.19.0 executable (bytes re-hashed to
the pinned SHA-256; provenance re-verified against nodejs.org
`SHASUMS256.txt`) with exactly the four required flags and the two exact
read grants. Cold and post-warm-up collections both succeeded:

- selection rollup
  `a53970d7f00b5823b2e601faaafa6dd900b7cf69ab51b4896feba7433761be20`,
  byte-identical to the pinned expected value and to the hosted run's
  logged validation output;
- cold and hot rows byte-identical; six cases in the declared order;
- every accepted row's numerical content (p-value and endpoint bits, all
  four digests, both table hashes, resource accounting) equal to the
  preserved #141 reviewed evidence, enforced by the validator's strict
  row-by-row deep equality and re-verified through the rollup;
- the collapse case remains a fail-closed wrapper refusal with the recorded
  ancestry `candidate_supported_execution_predicate_refusal` →
  `group_2_full_trace_refusal` → `g4_tail_stage_refusal`;
- pre/post environment identity holds and evaluator outputs are deeply
  frozen with candidate-selection flags true and all public support flags
  false.

Negative executions refuse without a support claim: an ordinary
review-environment process refuses as
`runtime_build_platform_tuple_mismatch`; a wildcard grant, an extra grant,
a forbidden `--allow-worker`, and a duplicated flag refuse as
`controlled_process_profile_not_established`; and omitting `--permission`
is refused by the Node runtime itself at startup (`ERR_MISSING_OPTION`)
before any candidate code runs. The exhaustive #141 controlled-process
probe results carry over byte-for-byte: the admission guard module and both
table files are blob-identical to the reviewed #141 head, and no Group 1/2
numerical formula, rounding cell, truth/projection bound, digest recipe,
resource formula, or table byte changes in this increment (verified by
diff and by execution).

## 7. Exact-head selection evidence (protocol F)

Hosted run `33594125427` completed successfully on the exact head and
uploaded artifact `9832784332`
(`release-2-paired-t-group-3-selection-9e58eccb...`, 26,226 bytes) with ZIP
SHA-256
`b512265545ad7805d86e4a14b8083f826e715c68387d0a3ded05fcfe0a1dc8fa`,
confirmed by both the GitHub artifact API record and the run's upload log.
The run's logged validation output is byte-identical to this reviewer's
local validator output: exact head, checkpoint pin `5b00688b...`, six
cases, rollup `a53970d7...`, cold/hot identical, candidate selection
claimed, no authoritative support, durable admission evidence validated.
Because the rollup pins every row byte, the hosted rows equal the local
independently reproduced rows. The egress policy blocks direct ZIP
download, so member-level hashes of this artifact were verified through
the independent local reproduction plus the two GitHub records.

The local hot optimization trace contains 145 named-function match lines
(the hosted run's match file reports 148; the count varies with engine
scheduling and is not a pinned contract). Functions actually present in
the trace: `buildTrace` (completed MAGLEV compilations),
`runDiagnosticSentinels` (completed MAGLEV compilations), and
`normalizeDyadic` (MAGLEV and a completed TURBOFAN_JS optimization). No
deeper helper optimization is claimed.

## 8. Adversarial and coherent-mutation battery (protocol G)

A reviewer-owned battery of 194 attacks ran across the five surfaces
(selection checkpoint validator, aggregate readiness validator, selection
evaluator input, durable bundle validator, and the selection-evidence
manifests validator): source/review/preservation/artifact identity
substitution (including run/artifact IDs, ZIP and manifest hashes, and
member hashes with a coherent manifest re-hash); a second matrix entry;
tuple/build/profile changes; unlisted-tuple admission; missing, extra,
swapped, and truncated evidence; broad-platform interpretation; selection
demotion; premature review, preservation, Group 3, authoritative
predicate/support/domain/runtime, reason-code, Public Check/bundle, RFC,
R2-D5, and Release 2 promotion; mode/row/order/case/rollup/p/endpoint/
digest/table/resource/environment/flag/permission/intrinsic/sentinel/
exact-head changes; coherent row-and-rollup recomputation after every
meaningful mutation (the pinned rollup still refuses); cross-input trace
transplantation; stale pre/post environment and cold/hot drift; forged
refusal ancestry; and the full hostile-shape suite (NaN, infinities,
negative zero, BigInt, functions, hidden properties, Symbols, accessors,
sparse/extended arrays, throwing proxies, cycles, non-plain prototypes,
and null/string/array roots). All 194 were rejected deterministically with
zero caller-getter invocations (four independent counters) and zero
exception leaks. Checkpoint object-key reordering remains accepted
(declared non-semantic) while binding and claim array order stays pinned.

## 9. Regression, merge simulation, and RFC (protocols H, I)

`pnpm install --frozen-lockfile` succeeded; the focused Group 3 selection,
admission-evidence, and readiness suites pass 35/35; the dedicated
selection-evidence validator succeeds against the local reproduction; and
the full `pnpm check` wrapper completed every stage in this environment
(format, Markdown lint, typecheck, `validate: OK`, full tests, generated,
Phase 1, Phase 2A, Phase 2A-021). The full Vitest suite is 53 files /
499 tests, all passing locally at the exact head.

Hosted checks on the exact head are 9/9 green: CI run `33594125377` (5/5
jobs — Full check Linux x64 Node 22, Full check Linux x64 Node 24, and
Phase 1 + 2A on Linux arm64, macOS arm64, and Windows x64), paired-t
candidate evidence `33594125367`, runtime-series evidence `33594125395`,
supported-execution admission evidence `33594125366`, and selection
evidence `33594125427`; every run reports the exact head as its head SHA.

`main` advanced during the review from the PR base to
`a0d23552bfab56d8f8dccff53bd10e903ff53d32` via two unrelated FND-1
research-intake merges. A non-mutating synthetic merge of the exact head
into live `main` produced tree `9a2b710b7201f9f5e26fecfb19a9a685994fc928`
with no conflicts: all 18 PR paths are byte-identical to the feature head,
all 6 main-only paths are byte-identical to `main`, and the merged tree
passes typecheck and the focused suites (35/35). This is a mergeability
verification only, not merge approval.

Non-promotion audit: authoritative bounds, numerical-contract freeze,
final Protocol tables, authoritative platform matrix/allowlist/profile/
predicate issuance, supported domain/runtime, global truth-error constants
and comparison tolerances (null), final reason codes, Public Check and
bundle (unissued), RFC #25 (open), and R2-D5/Release 2 (incomplete) all
remain unpromoted in the checkpoint, readiness overlay, and evaluator
results. The values 374 ULP, 2,978 ULP, 5,182 iterations, and 72,567 nodes
remain observations; 100,000 remains the reviewed fail-closed Group 1
design ceiling.

Issue #25 was inspected live during the review: open, public review window
OPEN, earliest decision `2026-09-25T20:52:54Z` unchanged. This
non-authoritative candidate is reviewable before that time; no early RFC
disposition is made.

## 10. Binding

This result is bound to exactly
`9e58eccb3cde54a4f653340d13170fbdf559b62b` and approves merge consideration
of the non-authoritative one-entry Group 3 candidate selection only. It
does not merge the PR, does not close Group 3, and does not issue or claim
any authoritative allowlist, profile, predicate, or support. After steward
approval, merge, and byte-identical preservation of this result, a
separate closure-synchronization increment with its own exact-head
independent review may close Group 3 and open Group 4 reason-code
finalization.
