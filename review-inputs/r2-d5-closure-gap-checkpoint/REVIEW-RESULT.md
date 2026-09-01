# R2-D5 closure-gap checkpoint independent review result

## Verdict

GO

The exact PR #127 head `4a2641c0ba5b4df5ccc53361013973b32818984f` may be
considered for merge as the non-authoritative R2-D5 closure-gap dependency
inventory. No BLOCKER or SHOULD-FIX finding remains; one NICE-TO-HAVE
observation is recorded below.

Per the reviewed protocol, `GO` means only that the exact head accurately
pins the completed candidate-readiness inputs and the dependency-ordered work
still required for final R2-D5 review, while making no support, runtime,
numerical-contract, reason-code, authority, RFC, R2-D5, or Release 2
promotion. Any different head requires a new independent exact-head review.

## 1. Exact identity and scope (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#127` (branch `r2-d5/closure-gap-checkpoint`)
- Base, sole parent, and merge base:
  `5c265b79ff36e6920bb0998a50d5aed376087412` (= `main` at review time; its
  tree `681aa3a728dfece8e3d93e87aaa3cf9285fbe5a8` matches the protocol's
  source-snapshot tree)
- Reviewed head: `4a2641c0ba5b4df5ccc53361013973b32818984f`
- Reviewed tree: `bcb219fa511641f6f4549a4341a332fc475bec0d`
- Structure: one ahead-only commit
- Delta: exactly 5 paths, `+949/-6`
- Review date: `2026-09-01` (UTC)

The live PR head was compared with the pinned head before review began and
matched, and matched again at review completion. The increment is limited to
the checkpoint JSON, its fail-closed validator, its focused adversarial test,
the review protocol, and the numerical README discoverability section. Zero
paths changed under `authority/`, `registries/`, `schemas/`, `conformance/`,
`generated/`, `spec/`, `reference/`, `bindings/`, `security/`, `evidence/`,
`canonicalization/`, `examples/`, `mappings/`, or `review-inputs/`; no
numerical formula, operation graph, table cell, evidence byte, prior review
result, Public Check, bundle, verifier dispatch, or Release 1 content
changed.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context of the increment. The reviewer did not author or
modify the candidate content and did not adopt the PR description's
validation summary as evidence; source bindings, the canonical checkpoint
digest, artifact states, decision ordering, and refusal behavior were all
re-derived from repository bytes with independent tooling. One bound input,
the durable M3 closure review result, was produced by this reviewer role in
an earlier bounded exact-head review; it is consumed here as a pinned
repository artifact, not re-adjudicated. All review harnesses were temporary
files outside the repository; this result file is the review's only
repository artifact.

## 3. Source reconstruction gate (protocol C)

All 13 `source_snapshot.bindings` paths were resolved at the source-snapshot
commit `5c265b79...` and every Git blob SHA-1 matched exactly (13/13). The
bound artifacts were then read and the claimed states reconstructed:

1. The steward ratification package is informative decision-preparation
   material with public review open; nothing issues identifiers, freezes a
   numerical contract, registers support, or authorizes publication.
2. The durable M2 review result (`GO`, PR #89 head `764674bd...`) closes only
   Student-t tail numerical readiness.
3. The durable M3 review result (`GO`, PR #117 head `171f18bd...`) closes
   only fixed-95 confidence-interval numerical readiness.
4. The aggregate readiness checkpoint (byte-identical to the reviewed
   PR #117 head content) selects PR #108 as the sole M3-D candidate and
   records PR #110 as closed/unmerged and not selected.
5. The supported-execution review disposition records `GO` for the tail-only
   implementation candidate only (table-connected tail graph, df and test
   statistic; upstream G4 out of scope), with allowlist, controlled-process
   enforcement, resource selection, admission evidence, and predicate
   selection all pending/unselected.
6. The platform research disposition records research closed and an
   implementation candidate authorized, conditional on an exact allowlist,
   an enforceable controlled execution profile, and per-tuple admission
   evidence — all open.
7. The truth-error support-closure candidate records its analytic derivation
   review closed while runtime selection of the input-specific bound, the
   platform matrix, a global constant, and final reason codes remain
   open/false/null.
8. The runtime-input reason-code candidate carries exactly 11 reviewed
   operation-stage candidates (disposition `GO`, decision-preparation only)
   and exactly 10 deferred support-dependent reason-code decisions.

## 4. Completed readiness boundary (protocol D)

`completed_candidate_readiness` lists exactly the six durable-review-backed
items (G4 execution and mathematical truth; M2; M3; p-value and fixed-95
oracle evidence; the tail-only supported-execution implementation review; the
parser and partial reason-code inventory), each with a bounding string that
keeps the first four as evidence/numerical-integration milestones and the
last two as implementation-review results, not predicate selection or
issuance.

## 5. M3-D candidate-conflict invariant (protocol E)

The disposition pins PR #108 / key
`paired-t-d5-ci-endpoint-mathematical-truth-error-candidate-1` / commit
`ba3d81e62f8f77884628c59c4b27d1c5ff3cb340` as the sole M3-D identity, and
PR #110 / key `paired-t-d5-ci-endpoint-mathematical-truth-candidate-1` /
commit `bbfcb104889b7ce3ed219dc30d49bd7ca1723f80` as a not-selected, unmerged
alternative with `implementation_paths_present = false`. All four PR #110
candidate-specific paths were confirmed absent from the review tree.

## 6. Historical dependency-label classification (protocol F)

The older candidate checkpoints were read directly. All five classified
transitions were independently confirmed against repository bytes: the M3
closure resolves the unratified critical-table/endpoint-ledger dependency;
M2 resolves tail numerical readiness but not runtime selection or admission;
reviewed p-value and fixed-95 evidence resolve oracle-evidence readiness but
not proposed-domain coverage; the truth-error candidate's independent review
is complete while runtime selection and supported execution remain open; and
platform research is complete with its old blocker superseded by resource,
allowlist, enforcement, and per-tuple admission conditions. No historical
candidate file or durable review result is rewritten
(`durable_review_results_rewritten = false`,
`historical_labels_are_current_blockers = false`), and the checkpoint
requires a later selection increment to synchronize the live candidate
checkpoints. Labels for ordinals 1-3 and 5 were located verbatim in their
named source checkpoints; see the NICE-TO-HAVE below for ordinal 4.

## 7. Remaining-decision dependency order (protocol G)

The five ordered decision groups and every `depends_on` edge were verified:
group 1 (candidate supported scope and resource bounds) has no dependencies;
group 2 (runtime numerical contract and full-trace predicate) depends on
group 1; group 3 (supported-execution admission) depends on groups 1-2, so
platform admission cannot precede the full graph; group 4 (final reason-code
inventory) depends on groups 1-3, so reason-code freeze cannot precede the
underlying support decisions; group 5 (final R2-D5 review and disposition)
depends on all four. Every group carries
`selection_made_by_this_checkpoint = false` and `state = "open"`. Group 2
records `global_truth_error_constant_required = false`, consistent with the
protocol's statement that the input-specific same-trace bound compared with
that input's projection margin suffices for the reviewed M2 candidate form
and that no finite maximum may substitute for a global constant.

## 8. Mandatory non-promotions (protocol H)

Every listed surface was verified in the reviewed bytes: contract freeze
false; supported pair/value/statistic/df/trace-resource bounds null; platform
matrix pending; runtime allowlist empty; controlled-process enforcement
false; execution predicate unselected; domain and runtime false; runtime
selection of the input-specific tail truth-error contract false; final
Protocol table unselected with null hash; global Student-t and
confidence-interval constants null; comparison tolerances null; reason codes
unfrozen; Public Check and bundle unissued; R2-D5 and Release 2 incomplete.
The seven finite observations (200, 201, 2,048, 100,000, 374, 2,978, 5,182)
are each recorded with `eligible_as_global_or_supported_bound = false`.

## 9. Adversarial checkpoint validation (protocol I)

The canonical checkpoint SHA-256 was independently recomputed in a separate
language (strict-JSON canonicalization with key-sorted objects and compact
serialization) from the raw checkpoint bytes and equals the validator's
pinned value
`sha256:d29918115aa53327f1d68c72756f217f323d0a1bfaf4956a349f834f98943fb1`.

69 reviewer-owned attacks were executed against the validator; every one was
rejected with the single deterministic error string and no leaked exception:
source commit/tree/path/blob substitution, binding removal, duplication, and
reordering; M2/M3 demotion, boundary broadening, readiness-item removal and
addition; coherent PR #110 selection, merged/selected/paths-present claims,
and a second selected candidate; historical-classification rollback, row
removal, and historical-policy inversion; decision-group deletion,
reordering, dependency-edge weakening (admission before the full graph;
reason-code freeze without support edges), required-output removal, group
closure, `selection_made_by_this_checkpoint` promotion, and a required
global constant; finite-observation promotion; every non-promotion
promotion (contract freeze, platform, allowlist entry, process enforcement,
predicate, domain/runtime, runtime truth-contract selection, final
table/hash, global constants, tolerances, reason codes, Public Check/bundle,
R2-D5, RFC closure and earlier decision timestamp, Release 2, prohibited-
claim and post-R2-D5 item removal); undeclared top-level and nested keys;
and NaN, Infinity, BigInt, functions, hidden own properties, symbol keys,
sparse and extended arrays, cycles, non-plain prototypes, throwing proxies
(top-level `ownKeys` and nested `getOwnPropertyDescriptor`), and null,
array, and string roots.

The pristine checkpoint validates cleanly; top-level and nested JSON
object-key reordering is accepted (key order is not semantic) while array
order and all values are pinned. Caller-provided getters executed zero times
(top-level and deep accessor counters both 0). The focused suite passes 5/5.

## 10. Regression, CI, and RFC boundary (protocol J-K)

At the exact head in this checkout:

- `pnpm install --frozen-lockfile`: success.
- `pnpm check`: formatting, Markdown lint, TypeScript, and repository
  validation (registries, traceability, normative lint, authority manifest,
  links, private-dependency and code-path audits) all green. The full
  parallel test stage passed 48 of 49 files (471/472 tests); the single
  failure was the documented execution-environment constraint — a 60-second
  per-test timeout on the pre-existing heavy supported-execution equivalence
  test (~82 s under full-suite container load), a file untouched by this
  increment. The identical test passes in isolation at this exact head
  (14/14) and inside both hosted Full check jobs. All remaining stages were
  executed with the same arguments through IPC-free entrypoints:
  generated-artifact check, Phase 1 (schemas, canonicalization, conformance,
  example, evidence), Phase 2A (regression, conformance, example, refusal,
  oracle, evidence), and Phase 2A-021 — 13/13 stage results OK, exit 0.
- Focused closure-gap suite: 5/5.

Hosted CI on the exact head `4a2641c0...` — 7/7 check runs successful: run
`33524885968` (Full check Linux x64; Full check Linux x64 Node 24; Phase 1 +
2A validation on Linux arm64, macOS arm64, Windows x64 — 5/5 jobs), paired-t
evidence run `33524885882`, and runtime-series evidence run `33524885640`.

Issue #25 was inspected independently: state open, public review window
OPEN, earliest decision `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`) unchanged — matching the checkpoint's
`rfc_boundary` and `authoritative_decision_allowed_by_this_checkpoint =
false`.

## 11. Findings

- BLOCKER: 0
- SHOULD-FIX: 0
- NICE-TO-HAVE: 1

NICE-TO-HAVE 1 - ordinal-4 historical-label source attribution. In
`historical_dependency_label_classification`, ordinal 4 records
`source_checkpoint = "truth-error-support-closure-candidate.json"` for the
label `closure_candidate_independent_review_platform_and_final_selection_pending`,
but at the source snapshot that label string appears only in
`support-domain-candidate.json` (the `blocked_by` of the
`truth_error_and_projection_margin_support` predicate) and its validator.
Ordinals 1-3 and 5 name the checkpoint that literally contains their label,
so ordinal 4 is internally inconsistent metadata: it names the checkpoint
whose pending state the label described rather than the file carrying the
string. The classified transition itself is accurate and independently
confirmed (the truth-error candidate's review is closed; runtime selection
and supported execution remain open), so no decision content, ordering, or
non-promotion is affected. Suggested repair, in the already-required future
synchronization increment or a later checkpoint revision (the pinned
canonical hash means any fix is a new reviewed increment): point
`source_checkpoint` at `support-domain-candidate.json` or add an explicit
`resolved_checkpoint` field for the file whose review resolved the label.

## 12. Review execution record

Identity via `git cat-file`, `git diff --numstat/--name-status`, and live
PR-head comparison before and after review; 13/13 blob bindings resolved
with `git rev-parse` at the source snapshot; canonical checkpoint SHA-256
recomputed independently; bound artifacts read and states reconstructed for
protocol sections C-H; 69 reviewer-owned validator attacks with getter
counters; `pnpm install --frozen-lockfile`, `pnpm check` with IPC-free
completion of the post-test stages, the focused suite, and the isolated
heavy-test rerun; hosted CI check-run and run-ID verification and issue #25
inspection via the GitHub API. This file is added in a dedicated review
commit whose parent is the exact reviewed head on a neutral review branch,
changing no candidate file.

`GO` is bound to `4a2641c0ba5b4df5ccc53361013973b32818984f` only. Do not
merge PR #127 on the basis of this result without an explicit steward merge
decision, and re-review any different head. After an approved merge,
preserve this result unchanged through the established review-preservation
flow.
