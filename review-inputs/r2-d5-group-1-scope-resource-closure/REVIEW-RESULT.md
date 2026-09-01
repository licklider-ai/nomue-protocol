# R2-D5 Group 1 scope/resource closure integration independent review result

## Verdict

GO

The exact PR #132 head `897bd5b0ff0d9723fd6a319fc8c1a3b9d586b186` may be
considered for merge as the Group 1 closure-synchronization increment. No
BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

Per the reviewed protocol, `GO` means only that the exact head correctly
binds the preserved independent review and closes the non-authoritative
Group 1 candidate scope/resource milestone without changing its reviewed
numerical content or promoting support, runtime, platform, reason codes,
authority, RFC, R2-D5, or Release 2 state. It does not reselect scope or
resources and does not begin Group 2. Any different head requires a new
independent exact-head review.

## 1. Exact identity and permitted delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#132` (branch `r2-d5/group-1-scope-resource-closure`)
- Sole parent, base, and merge base:
  `8aac3c192b972d679308c230efc0cb3b4eff41cf` (= `main` at review time,
  = the review-preservation merge)
- Reviewed head: `897bd5b0ff0d9723fd6a319fc8c1a3b9d586b186`
- Reviewed tree: `758388b928f6d1cd258e0aadbf6751d6497954cb`
- Structure: one ahead-only commit
- Delta: exactly 8 paths, `+378/-34`
- Review date: `2026-09-01` (UTC)

All identity facts were reconstructed from Git objects, not from the PR
description; the live PR head was compared with the pinned head both before
review began and after all review work completed, and matched both times.
The 8 paths are limited to the checkpoint's maturity/review-binding fields,
its canonical-hash pin and focused test, the aggregate readiness overlay,
its validator and test, the numerical README, and this increment's review
protocol. Zero paths changed under `authority/`, `registries/`, `schemas/`,
`conformance/`, `generated/`, `spec/`, `reference/`, `bindings/`,
`security/`, `evidence/`, `canonicalization/`, `examples/`, `mappings/`,
`review-inputs/`, or the table/evidence directories.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context of the increment, with every gate re-derived from
Git objects, raw bytes, an independent canonicalization/SHA-256
implementation in a separate language, and reviewer-owned adversarial
executions; the PR description and the new closure fields were not trusted
as evidence. The preserved Group 1 review result and its review commit were
produced by this reviewer role in the immediately preceding bounded
exact-head review; this closure review verifies their preservation chain and
binding from repository objects rather than re-adjudicating the underlying
numerical review. All review harnesses were temporary files outside the
repository; this result file is the review's only repository artifact.

## 3. Review and preservation identity (protocol C)

Independently resolved from Git objects:

- Reviewed candidate head `000705ccc3b29d3ef449c5c050e7dba4723a3cab` with
  tree `66446cb02e01adc23d55c45ee97c89b83179a8bb`.
- Review commit `b3ad38ea36ea66573033133ee94889508f72308f` whose commit
  header carries exactly one parent, the reviewed candidate head, and tree
  `4c5590b0b8b45df5e08e0414386e3297c9220d35`.
- Result path
  `review-inputs/r2-d5-candidate-supported-scope-resource-bounds/REVIEW-RESULT.md`
  with Git blob `18d3b6e42e3ce4eaf38a4583e89ab6b9f8405910`.
- Preservation head `776ca93ccb94f116362bad46e56647ca07aec5bd` ("Preserve
  R2-D5 candidate scope and resource review result"), a single commit on top
  of the PR #130 merge whose tree is byte-identical to the review commit's
  tree, and preservation merge `8aac3c192b972d679308c230efc0cb3b4eff41cf`
  (parents: the PR #130 merge and the preservation head) with the same tree.
- The result blob is byte-identical at all five required locations: the
  review commit, the preservation head, the preservation merge, this
  increment's base, and the exact PR head. The reviewed candidate head is an
  ancestor of the preservation lineage via the merged PR #130.

The complete preserved result was read: verdict `GO` with 0 BLOCKER,
0 SHOULD-FIX, and 0 NICE-TO-HAVE findings, bound to the reviewed candidate
head only, and approving merge consideration of the non-authoritative
Group 1 selection, not support or runtime. The working-tree copy at the
reviewed head hashes to exactly the pinned blob.

## 4. Reviewed-selection invariance (protocol D)

A field-level comparison of the closure checkpoint against the candidate
reviewed at `000705cc...` enumerated every changed field. Exactly eight
fields differ: `decision_state`, `independent_review`, `group_1_complete`,
the new `independent_review_binding` object, and the four
`downstream_dependency_state` ordering strings. Every reviewed numerical
field is unchanged and was re-verified directly at the head: pairs `2..201`;
exact `df = n_pairs - 1` with df `1..200`; tail table hash
`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`;
fixed-95 ordered-cell hash
`sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`;
G4 maximum 1,008 from `5n + 3`; tail maximum 100,000 with cap `40df + 64`
and maximum 8,064; exactly three CI-specific primitive nodes; combined
maximum 101,011; the same operation-stage/truth/projection predicates; and
the same corpus hash
`sha256:19349e5ed5e4ebbe582abe426a6024398940915da04f5c1085f797b4c82d46a7`.

The corpus file is byte-identical (same Git blob) between the reviewed
candidate tree and the exact PR head, and its canonical SHA-256 was
independently recomputed and still matches the unchanged validator pin. The
resource-envelope evaluator module differs from the reviewed candidate
version by exactly one changed line, the checkpoint canonical-hash pin; no
evaluation branch or result shape changed, and its behavior was re-exercised
(exact-identity acceptance at the heavy-witness point; rejection of
relation, sum, extra-key, negative-zero, and hostile inputs). The checkpoint
and evaluator at this increment's base are byte-identical to the reviewed
candidate head versions, and both table artifacts are unchanged blobs.

## 5. Group 1 closure meaning and readiness (protocol E-F)

The checkpoint records `independent_review = "complete"`,
`group_1_complete = true`, the exact review/preservation binding (verdict
`GO`, 0/0/0 counts, reviewed head/tree, review commit and its parent, result
path/blob, preservation merge), and retains
`status = non_authoritative_candidate`, `issuance = unissued`. The new
checkpoint canonical SHA-256 was independently recomputed as
`sha256:f9337f1530a7835e8662c81935c205348fb13387bfbf5b1f4835f1c98d2d0a87`
and matches the validator pin. The readiness overlay binds the same
identities and values with exact-key enforcement. Downstream ordering is
recorded and pinned as: Group 2 runtime numerical contract and full-trace
predicate next and open; supported-execution admission blocked by Group 2;
final reason-code inventory blocked by Groups 2 and 3; final R2-D5
review/disposition blocked by Groups 2-4 and the RFC window.

## 6. Mandatory non-promotions (protocol G)

Verified in the reviewed bytes: no authoritative supported pair/df/value/
intermediate/statistic/endpoint/resource bounds; no numerical-contract
freeze; no runtime graph/table/truth/projection selection; final Protocol
fixed-95 table unselected; platform/build/runtime allowlist empty;
controlled-process enforcement false; full supported-execution predicate
unselected; supported domain and runtime false; global truth-error constants
and comparison tolerances null; final reason codes unfrozen; Public Check
and supported bundle unissued; RFC #25 open; R2-D5 and Release 2 incomplete.
The finite observations 374, 2,978, 5,182, and 72,567 remain non-bounds, and
100,000 remains the pre-existing fail-closed design ceiling, not a corpus
maximum.

## 7. Fail-closed attacks (protocol H)

116 reviewer-owned attacks were executed across the checkpoint validator,
corpus validator, resource evaluator, and aggregate readiness validator;
every one was rejected fail-closed with a deterministic result and zero
leaked exceptions: review verdict and each finding count; reviewed
head/tree, review commit and parent, result path/blob, and preservation
merge (on both the checkpoint and the readiness overlay); review-state
demotion, Group 1 reopening, decision-state rollback, and status/issuance
promotion; pair/df range and relation changes; both table hashes; G4
formula/maximum, tail ceiling/cap, CI count, and combined sum; corpus hash
and guarantee-boundary drift; historical-clarification collapse; each
downstream-ordering unblocking; every mandatory non-promotion; undeclared
keys and extra array entries; and NaN, Infinity, negative zero, BigInt,
functions, hidden own properties, symbol keys, accessors, sparse and
extended arrays, throwing proxies, cycles, and non-plain prototypes on
every surface. The pristine checkpoint, corpus, and readiness artifacts
validate cleanly; object-key reordering is accepted (non-semantic) while
array order and all values are pinned. Caller-provided getters executed
zero times across all four surfaces.

## 8. Regression, hosted CI, and RFC boundary (protocol I-J)

At the exact head in this checkout:

- `pnpm install --frozen-lockfile`: success.
- `pnpm check`: fully green with exit 0 — formatting, Markdown lint,
  TypeScript, repository validation (including the private-dependency and
  code-path audits), unit tests 480/480 across 50 files, generated-artifact
  check, Phase 1, Phase 2A, and Phase 2A-021. No environment constraint
  interrupted this run; no IPC-free fallback was needed.
- Focused candidate-scope/resource + aggregate-readiness suites: 29/29.
- Reviewer-owned adversarial harness as described above.

Hosted CI on the exact head `897bd5b0...` — 7/7 check runs successful: run
`33541835708` (Full check Linux x64; Full check Linux x64 Node 24; Phase 1 +
2A validation on Linux arm64, macOS arm64, Windows x64 — 5/5 jobs),
paired-t evidence run `33541835799`, and runtime-series evidence run
`33541835489`.

Issue #25 was inspected live: state open, public review window OPEN,
earliest decision `2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`)
unchanged. Group 1 closure does not close or shorten the RFC window.

## 9. Findings

- BLOCKER: 0
- SHOULD-FIX: 0
- NICE-TO-HAVE: 0

## 10. Review execution record

Identity via `git cat-file`, `git rev-parse`, `git merge-base`, and
`git diff --numstat/--name-status` with start- and end-of-review live
PR-head comparison; the full preservation chain resolved from commit
headers, tree identities, and blob identities at five locations; a
field-level checkpoint comparison against the reviewed candidate head
enumerating the complete change set; independent canonical SHA-256
recomputation for the closure checkpoint and the unchanged corpus;
blob-identity checks for the corpus, both tables, and the base's checkpoint/
evaluator; 116 validator/evaluator attacks with getter counters (0
invocations); `pnpm install --frozen-lockfile`, `pnpm check` (exit 0), and
the focused suites; hosted CI check-run and run-ID verification and live
issue #25 inspection via the GitHub API. This file is added in a dedicated
review commit whose sole parent is the exact reviewed head on a neutral
review branch, changing no candidate file.

`GO` is bound to `897bd5b0ff0d9723fd6a319fc8c1a3b9d586b186` only. Do not
merge PR #132 on the basis of this result without an explicit steward merge
decision, and re-review any different head. After an approved merge,
preserve this result unchanged through the established review-preservation
flow.
