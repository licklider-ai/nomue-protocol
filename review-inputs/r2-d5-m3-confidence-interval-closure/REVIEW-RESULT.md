# R2-D5 M3 confidence-interval numerical closure integration independent review result

## Verdict

GO

The exact PR #117 head `171f18bd79a015b0680cc9afd524b7352be1bbe5` may be
considered for merge as the M3 confidence-interval numerical-closure
integration increment. No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding
remains in this bounded review.

Per the reviewed protocol, `GO` means only that M3 fixed-95
confidence-interval numerical closure is internally complete as an
independently reviewed, unissued, non-authoritative Release 2 candidate
milestone, with PR #108 as the sole selected M3-D identity, while support,
platform, execution, runtime, final reason codes, Public Check/bundle,
R2-D5, RFC closure, and Release 2 remain open. Any different head requires a
new independent exact-head review.

## 1. Identity gate (protocol A)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#117` (branch `r2-d5/m3-confidence-interval-closure-integration`)
- Base and sole parent: `76b18866f8972917dd5e6050272398eb04236f4b`
  (= `main` at review time)
- Reviewed head: `171f18bd79a015b0680cc9afd524b7352be1bbe5`
- Reviewed tree: `e5551fd010b59a820e0c4bdea6b3f354785046ea`
- Structure: one ahead-only commit
- Delta: exactly 16 paths, `+619/-97`
- Review date: `2026-09-01` (UTC)

The live PR head was compared with the pinned head before review began and
matched. The 16 paths are limited to the five M3 checkpoint JSONs, the five
corresponding validators/modules, the five focused test files, and this
increment's review protocol. Both PR #110 implementation paths named by the
protocol are absent from the review tree, as are the PR #110 checkpoint,
test, and review-protocol paths. Zero paths changed under `authority/`,
`registries/`, `schemas/`, `conformance/`, `generated/`, `spec/`,
`reference/`, `bindings/`, `security/`, `evidence/`, `canonicalization/`,
`examples/`, or `mappings/`; authority inputs, authoritative schemas,
conformance, Public Checks, bundles, verifier authoritative dispatch, and
Release 1 content are byte-identical to the pinned base.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context of the increment. The reviewer did not author or
modify the candidate content, did not adopt the PR description's validation
summary as evidence, and re-derived every gate below from repository bytes,
diffs against pinned commits, independently recomputed digests, and
reviewer-owned adversarial executions. All review harnesses were temporary
files outside the repository; this result file is the review's only
repository artifact.

## 3. Durable review inputs (protocol B)

All four durable results were read in full from the exact base (each is
byte-identical between base and reviewed head; blob identities recorded):

1. M3-A `review-inputs/r2-d5-fixed-95-evidence-review-sync/REVIEW-RESULT.md`
   (blob `62697014d5b6817da47d36fdaf4daacc1478eea8`): verdict `GO`, zero
   outstanding findings, PR #93 head
   `fae3d5eab08bfd61f6720185737315e7d66432df`, tree `b65ca383...`.
2. M3-B `review-inputs/r2-d5-fixed-95-table-selection/REVIEW-RESULT.md`
   (blob `8b450f86fb5d89c4dcfda196bf63dc1192229dea`): verdict `GO`, zero
   outstanding findings, PR #97 head
   `d3096d2b9dce94209001411632c039e3d5c79743`, tree `9dc2de74...`.
3. M3-C `review-inputs/r2-d5-ci-execution-trace-candidate/REVIEW-RESULT.md`
   (blob `2a35633bb2c33d07b0b2e75bc7338ff5764569ad`): verdict `GO`, zero
   outstanding findings, PR #100 head
   `c571e8076a92ddd500309cf9702619feeb946b4c`, tree `6e5f759b...`.
4. M3-D `review-inputs/r2-d5-ci-endpoint-truth-error-candidate/REVIEW-RESULT.md`
   (blob `1cdedef140b9eae1e7ab85502859b147fd79fe10`): verdict `GO`, zero
   outstanding findings, PR #108 head
   `ba3d81e62f8f77884628c59c4b27d1c5ff3cb340`, tree `63777392...`.

All four reviewed heads resolve in repository history and are ancestors of
the current `main`.

## 4. Candidate-conflict adjudication (protocol C)

Merged PR #108 and closed-unmerged PR #110 are alternative implementations
of the same M3-D endpoint mathematical-truth role. The integration selects
only candidate key
`paired-t-d5-ci-endpoint-mathematical-truth-error-candidate-1`, exact
reviewed commit `ba3d81e62f8f77884628c59c4b27d1c5ff3cb340`, and the durable
M3-D review result above, and records PR #110 (key
`paired-t-d5-ci-endpoint-mathematical-truth-candidate-1`, commit
`bbfcb104889b7ce3ed219dc30d49bd7ca1723f80`) strictly as a not-selected,
not-merged alternative (`not_selected_alternative_merged = false`). The
PR #110 implementation, checkpoint, test, and review-protocol paths are
absent from the review tree, and reviewer-owned substitution attacks
(section 7) confirm the aggregate rejects any promotion of that alternative.

## 5. Maturity synchronization (protocol D-G) and table identity (protocol E)

The full 16-path diff against the base was read line by line. Every change
in the five checkpoint JSONs and five validators/modules is a review-maturity
state, binding, prohibited-claim rewording
(`complete_confidence_interval_truth_bound` →
`global_confidence_interval_error_constant`, matching the now-complete truth
ledger while keeping the global constant prohibited), held-decision removal
of the two completed CI work items, or refusal-message string. No numerical
code path changed.

- M3-A sync checkpoint advances only to independently reviewed M3 admission;
  final Protocol table, final content hash, and all support surfaces remain
  unselected.
- M3-B selected-table checkpoint adds only the selection-review binding,
  `independent_selection_review_complete`, and `m3_closed`; the validator
  still enforces exactly 200 positive-finite strictly-decreasing binary64
  cells and the ordered content hash. The 200-cell payload was extracted from
  the reviewed head, the pinned base, and the reviewed M3-B head
  `d3096d2b...`; all three are byte-identical, and the ordered-cell content
  hash was independently recomputed from raw bytes with a separate SHA-256
  implementation in all three trees:
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.
  Evidence coverage `1..200` remains marked as evidence, not support
  (`contiguous_protocol_support_claimed = false`,
  `supported_degrees_of_freedom_maximum = null`).
- M3-C trace checkpoint advances only to reviewed M3 admission. The module
  still describes and verifies exactly the three CI-specific binary64
  operations (critical value times standard error; mean minus margin; mean
  plus margin), and its per-evaluation
  `confidenceIntervalEndpointTruthComplete` result remains `false`.
- M3-D endpoint checkpoint identifies the selected reviewed candidate;
  successful evaluations now report independently reviewed/complete endpoint
  truth; refused inputs keep `confidenceIntervalEndpointTruthComplete =
false` and fail closed (verified live: the known collapse witness is
  refused as `ci_stage_refusal` / `confidence_interval_endpoint_collapse`).

The endpoint-truth and CI-trace modules at the pinned base are byte-identical
to the PR #108 reviewed head `ba3d81e...` versions, so the head-vs-`ba3d81e`
diff equals the fully read base-vs-head diff: 11/11 and 7/8 changed lines,
all maturity flags and message strings. No critical midpoint, positive
interval product, endpoint interval construction, exact graph-to-truth
distance, digest, same-trace binding, or hostile-input validation rule
changed. As a live spot check at the reviewed head, one success envelope was
evaluated and all five digests in its chain (outer, CI trace, both nested G4
traces, G4 truth envelope) were recomputed independently in a separate
language and matched, and the envelope verified after a JSON round trip with
frozen outputs.

## 6. Aggregate readiness (protocol H) and non-promotions (protocol I-J)

`evidence-readiness.json` and the readiness validator bind the exact M3-A/B/C/D
artifacts, candidate keys, durable review paths, the selected table hash
above, the selected PR #108 key/commit, and the PR #110 not-selected
alternative, all pinned by strict equality with exact-key-set enforcement.
Fixed-95 critical-value evidence advances to `reviewed_complete`.

All protocol-J non-promotions were verified held in the reviewed bytes:
global confidence-interval error constant (false and newly present in the
prohibited-claims list), global Student-t truth-error constant, supported df
maximum (`null`), value/pair/resource bounds, platform matrix (`pending`),
supported-execution predicate (unselected/false), controlled process
profile, supported domain (false/null), runtime support (false), final
reason codes (unfrozen), comparison tolerances (`null`), numerical-contract
freeze (false), Public Check/bundle (unissued), final R2-D5 disposition
(`pending_public_review_and_evidence_closure`), RFC #25 (open), and
Release 2 completion (unclaimed). No finite corpus quantity is promoted to a
bound (`finite_corpus_maximum_is_a_bound = false`).

## 7. Reviewer-owned state-transition and hostile-shape battery (protocol K)

74 reviewer-owned attacks were executed against the five changed validators
(readiness, evidence-review-sync, selected-table, CI-trace checkpoint,
endpoint checkpoint) from the pristine repository checkpoints; all five
pristine checkpoints validate cleanly and every attack was rejected
fail-closed with zero validator exceptions leaked:

- demotions: closure to pending, `m3_closed = false` (aggregate and
  per-checkpoint), endpoint-truth completeness false, selection review
  demoted, trace/ledger demoted;
- PR #110 substitution: selected key only, selected commit only, coherent
  key+commit+artifact+review-path substitution, `not_selected_alternative_merged
= true`, alternative-identity swap;
- table integrity: selected-table hash change in the aggregate, single-cell
  mutation, cell reorder, truncation to 199 cells, reviewed-hash change in
  the sync checkpoint;
- promotions: global CI error constant, finite-corpus maximum as bound,
  supported df maximum 200, platform selected, predicate selected, domain
  claimed, runtime enabled, reason codes frozen, Public Check/bundle issued,
  dropped and extended prohibition lists, df-max/runtime promotion on the
  table, runtime/predicate promotion on the trace, domain/reason-code
  promotion on the endpoint checkpoint;
- undeclared identities: `second_selected_candidate` key, top-level extra
  candidate section, extra authority/support/claim keys, removed fields; and
- hostile shapes, per validator: hidden non-enumerable own properties,
  symbol keys, accessors, cycles, proxies throwing from `ownKeys`, and
  sparse/extended arrays.

Caller-supplied getters executed zero times across all validators
(invocation counter confirmed 0).

## 8. Regression, CI, and RFC boundary (protocol L-M)

At the exact head in this checkout:

- `pnpm install --frozen-lockfile`: success.
- Formatting, Markdown lint, TypeScript typecheck, and repository
  validation (registries, traceability, normative lint, authority manifest,
  links, private-dependency and code-path audits): all green.
- Focused suites (fixed-95 review sync, selected table, CI trace, CI
  endpoint truth, aggregate readiness): 5 files / 37 tests, all passed.
- Unit tests: the full parallel `pnpm test` run passed 47 of 48 files
  (466/467 tests); the single failure was a 60-second per-test timeout on
  the pre-existing heavy supported-execution equivalence test (~61 s under
  full-suite container load). That file is not among the 16 changed paths
  and its module is unchanged in this increment; the identical test passes
  in isolation at this exact head (14/14) and passes inside both hosted
  Full check jobs. The failure is an execution-environment resource
  constraint, not a candidate defect; every one of the 467 tests passed at
  the exact head in this environment across the two runs.
- Remaining `pnpm check` stages, executed with the same arguments:
  generated-artifact check 19/19; Phase 1 (13 schemas, 16 canonicalization
  vectors, 132 conformance fixtures, verifier example, evidence 8/8);
  Phase 2A (regression 88, conformance 44, example, refusal 8, oracle
  comparison with max relative difference 8.96e-15, evidence 10/10);
  Phase 2A-021 conformance 6/6 — all green, exit 0.

Hosted CI on the exact head `171f18bd...` — 7/7 check runs successful:

- CI run `33495187568`: Full check (Linux x64), Full check (Linux x64,
  Node 24), Phase 1 + 2A validation (Linux arm64, macOS arm64,
  Windows x64) — 5/5 jobs success.
- paired-t evidence run `33495187508`: success.
- runtime-series evidence run `33495187563`: success.

RFC #25 was checked independently: state open, public review window OPEN,
earliest decision `2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`)
unchanged. M3 closure does not close or shorten the RFC window.

## 9. Findings

- BLOCKER: 0
- SHOULD-FIX: 0
- NICE-TO-HAVE: 0

Remark (out of increment, no action required here): the PR #110 review
result previously recorded that the endpoint-envelope outer digest is
computed over a serialization preserving nested key order, so semantically
equal envelopes can carry distinct valid digests. The selected PR #108
module family shares that construction. It is pre-existing reviewed
behavior, unchanged by this increment, and does not affect any value or
fail-closed property.

## 10. Review execution record

Identity and diffs via `git cat-file`, `git diff --numstat/--name-status`,
per-path blob comparison against the pinned base, the M3-B reviewed head,
and the PR #108 reviewed head; table bytes and content hash recomputed
independently in a separate language from raw JSON bytes in three trees;
live module spot-check with independent digest recomputation; 74
reviewer-owned validator attacks; `pnpm install --frozen-lockfile`,
`pnpm check` (with the constituent stages of the test-and-later phases
re-executed as described in section 8), and the five focused suites; hosted
CI check-run and run-ID verification via the GitHub API; RFC #25 state via
the GitHub API. This file is added in a dedicated review commit whose parent
is the exact reviewed head on a neutral review branch, changing no candidate
file.

`GO` is bound to `171f18bd79a015b0680cc9afd524b7352be1bbe5` only. Do not
merge PR #117 on the basis of this result without an explicit steward merge
decision, and re-review any different head. After an approved merge,
preserve this result unchanged through the established review-preservation
flow.
