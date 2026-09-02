# R2-D5 Group 2 runtime numerical-contract independent review result

## Verdict

GO

The exact PR #134 head `adea5c12d709350cbd8d4fbf918ea8344c111000` may be
considered for merge as the non-authoritative R2-D5 Group 2 runtime
numerical-contract and full-trace-predicate candidate selection. No BLOCKER,
SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

Per the reviewed protocol, `GO` means only that the exact head justifiably
selects a non-authoritative Group 2 runtime numerical contract and full-trace
predicate, binds one input and one G4 trace through the reviewed truth,
projection, table, and resource checks, and fails closed under attack, while
leaving review preservation, Group 2 closure, platform admission, support,
runtime, authority, RFC, R2-D5, and Release 2 open. It does not freeze the
numerical contract, select a platform or full supported-execution predicate,
freeze reason codes, or issue a Public Check/bundle. Any different head
requires a new independent exact-head review.

## 1. Exact identity and intended delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#134` (branch `r2-d5/group-2-runtime-contract-candidate`)
- Sole parent, base, and merge base:
  `9d53f7b9ae2e6059eb8b6d9f1e3ca70002f8f24f` (= `main` at review time; its
  tree `c23b636d6aac296bea285bdf9af694b7d465b4dd` matches the protocol's
  source-snapshot tree)
- Reviewed head: `adea5c12d709350cbd8d4fbf918ea8344c111000`
- Reviewed tree: `7d56ad8f8b97b4c0baef336716a1dfc97338d3ac`
- Structure: one ahead-only commit
- Delta: exactly 8 paths, `+1737/-0` (all additions)
- Review date: `2026-09-02` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times. The 8 paths are
limited to the Group 2 checkpoint JSON, its full-trace evaluator/verifier
module, its focused test, the aggregate readiness overlay JSON/module/test,
the review protocol, and the numerical README section. Zero paths changed
under `authority/`, `registries/`, `schemas/`, `conformance/`, `generated/`,
`spec/`, `reference/`, `bindings/`, `security/`, `evidence/`,
`canonicalization/`, `examples/`, `mappings/`, `review-inputs/`, or the
table/evidence directories; no pre-existing numerical formula, component
trace evaluator, exact primitive verifier, table cell, corpus, checkpoint,
or durable review changed.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context of the increment. The implementation under review
was not used as the mathematical oracle: every numerical contract below was
reconstructed with an independent exact-rational implementation (arbitrary
precision integer rationals with an independent binary64 bit decoder and an
independent 2048-bit integer square-root enclosure) plus 400-bit
regularized-incomplete-beta arithmetic for the mathematical Student-t
quantities, and every digest was recomputed from serialized bytes with a
separate SHA-256 implementation, including independent reimplementations of
the tail trace's line-protocol digest and the composition's `{format, link}`
digest. Several bound durable results (the Group 1 selection/closure and
M2/M3 closure reviews) were produced by this reviewer role in earlier
bounded exact-head reviews; they are consumed here as pinned repository
artifacts. All review harnesses were temporary files outside the repository;
this result file is the review's only repository artifact.

## 3. Source reconstruction and Group 1 gate (protocol C)

All 26 `source_snapshot.bindings` entries were resolved at the
source-snapshot commit and every Git blob SHA-1 matched (26/26). The bound
artifacts confirm the eight protocol-C facts: Group 1 is closed with its
exact-head `GO` preserved byte-identically on `main` (selection result blob
`18d3b6e4...`, closure result blob `93df7580...`); pair count `2..201` with
exact `df = n_pairs - 1` and df `1..200`; the Group 1 resource envelope
(`5n + 3 = 1,008`; 100,000; `40df + 64 <= 8,064`; three CI nodes; 101,011);
the reviewed G4 actual-trace, G4 exact-truth, G4-tail composition, tail
numerical selection, fixed-95 table, CI actual-trace, and selected CI
endpoint-truth results all carry `GO` (the cross-runner supplement
`H-CLOSED`); the M2 and M3 closure reviews are durable and
candidate-readiness-scoped; both tables cover every integer df `1..200`;
PR #108 remains the selected M3-D implementation with PR #110 the
not-selected, unmerged alternative; and platform admission,
controlled-process enforcement, full supported-execution admission,
reason-code freeze, authority, and R2-D5 remain open. The historical
tail-only supported-execution review was not treated as Group 3 admission.

## 4. Same-trace binding and operation graph (protocol D)

The full-trace evaluator was exercised from raw input over a reviewer-owned
corpus (df 1, 2, 3, 30, 100, 200; positive, negative, and mixed means; two
exact-zero-statistic cases; a near-transition small-separation case; a
1e150-scale large-finite case; and the known CI-collapse witness). For every
accepted case the tail and CI components contained the byte-identical
complete G4 trace (verified by full structural comparison, not by df or
scalar equality), and the cross-stage link bound the G4, tail-composition,
tail-trace, CI-trace, and endpoint-truth digests plus the returned p-value
and endpoint binary64 bits, with both table hashes pinned. Nested component
verifiers run before acceptance; the raw-input evaluator returned no success
under component refusal, same-trace mismatch, resource refusal, or envelope
verification failure (all five refusal classifications were exercised). The
known collapse witness fails closed: inside the composition it is refused at
the tail projection stage (`g4_tail_stage_refusal` / `tail_stage_refusal`)
before CI evaluation, and the CI-only component refuses the same input as
`confidence_interval_endpoint_collapse`; no truth proof is emitted on either
path.

## 5. Table selection and exact identities (protocol E)

The tail table artifact bytes hash to
`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`
and the fixed-95 ordered-cell hash recomputes to
`sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`
(both independently recomputed from raw bytes in the prior Group 1 review of
the identical blobs, which are unchanged at this head, and re-pinned here in
every accepted envelope and in the checkpoint/readiness overlays). Both
artifacts carry 200 contiguous integer-df entries. Neither becomes a final
authoritative Protocol table in this increment
(`authoritative_protocol_table_selected = false`).

## 6. Independent numerical reconstruction (protocol F)

The reviewer oracle executed 621 checks over the corpus with zero failures,
reconstructing per accepted case:

- G4 mean, sample variance, standard-error 2048-bit dyadic enclosure, and
  signed test-statistic enclosure from raw observation bits, matching the
  nested G4 exact-truth envelope and the endpoint proof's top-level
  mean/standard-error intervals, with normalized rationals;
- the fixed-95 critical rounding cell from the selected cell's exact
  predecessor/successor bit patterns, the quantization bound as the maximum
  distance to either boundary, the two-corner margin interval, the
  lower/upper endpoint truth intervals, and every graph-to-truth absolute
  error bound, with the endpoint intervals strictly separated;
- the mathematical fixed-95 Student-t critical value at 400-bit precision by
  incomplete-beta bisection, strictly inside the candidate's rounding cell
  at every corpus df (1, 2, 3, 30, 100, 200);
- the returned two-sided p-value against the high-precision
  incomplete-beta value, within the trace's declared input-specific
  relative error bound at every non-zero-statistic case (observed relative
  errors orders of magnitude below the declared bounds), the exact-zero
  branch returning p bits `3ff0000000000000`, and every p in `(0, 1]`;
- the resource object from the accepted component traces with exact
  `df = n - 1`, G4 nodes `5n + 3`, cap `40df + 64`, three CI nodes, the
  exact component sum, and all Group 1 ceilings; and
- the complete digest chain from serialized bytes without trusting declared
  values: the G4 trace and CI/endpoint envelopes (JSON serialization), the
  tail trace (independent reimplementation of its line-protocol digest), the
  G4-tail composition (`{format, link}` digest), and the outer envelope
  digest under recursively key-sorted canonical JSON, plus every link and
  proof digest binding.

No finite corpus result is promoted to a global error constant or universal
domain proof.

## 7. Subnormal and comparison contract (protocol G)

The checkpoint pins stage-specific choices with no blanket subnormal rule:
parsed input subnormals are not refused solely for being subnormal; G4 uses
the reviewed operation predicates and finite postcondition; proof-tracked
positive tail intermediates stay strictly above minimum normal binary64;
zero/subnormal p projections fail closed; CI intermediates are finite with
strictly ordered endpoints. Operation-graph reproduction is exact binary64
bit identity; mathematical-truth error uses exact rational enclosures and
input-specific bounds; target-format projection uses exact rounding cells
with strict pointwise margins; generic and quantity-specific tolerances
remain null.

## 8. Canonical envelope and fail-closed attacks (protocol H-I)

The checkpoint canonical SHA-256 was independently recomputed as
`sha256:72caa3e86b8eec0fb0c1f6ad21de9d8f480121f29e385ecec946c2dab39d3005`,
matching the validator pin, and the outer envelope digest was independently
recomputed under key-sorted canonical JSON for every accepted case.
Object-key reordering (top-level and nested, with the digest unchanged) is
accepted as non-semantic; array order and all values are pinned.

92 reviewer-owned attacks were executed across the envelope verifier,
checkpoint validator, readiness validator, and raw-input evaluator; every
one was rejected fail-closed with zero leaked exceptions and one
deterministic outcome per attack, including: coherent cross-input G4-tail
and CI substitutions with fully recomputed attacker-controlled links and
outer digests; a tail-trace splice with the complete attacker digest chain
rebuilt; a forged p-value whose tail line digest, composition digest, link,
and outer digest were all coherently recomputed (caught by the verifier-side
tail truth/projection replay); resource, link, table-hash, format, endpoint,
truth-interval, and G4-truth mutations under coherent outer-digest
recomputation; digest-only corruption; undeclared keys and removed fields;
36 checkpoint attacks (bindings, Group 1 demotion, early review/closure/
freeze claims, scope/stage/table/truth/projection/subnormal/tolerance/
resource drift, every downstream promotion, prohibited-claim and
finite-observation removal, hostile shapes); readiness overlay attacks; and
the full hostile-shape battery (NaN, Infinity, negative zero, BigInt,
functions, hidden own properties, symbol keys, accessors, sparse and
extended arrays, throwing proxies, cycles, non-plain prototypes, null/array/
string roots). Caller-provided getters executed zero times on the envelope,
checkpoint, and readiness surfaces and on the raw-input evaluator; single
pair, 202 pairs, NaN observations, and null input are refused without any
support/runtime claim; returned envelopes and results are deeply frozen.

## 9. Readiness synchronization and non-promotions (protocol J)

The aggregate readiness overlay records Group 1 complete and the Group 2
candidate as `selection_pending_independent_review` with selection made,
independent review pending, `group_2_complete = false`, and
`numerical_contract_frozen = false`, pinning the scope values, both table
hashes, and the source snapshot by strict equality with exact-key
enforcement. All mandatory non-promotions were verified held: no
authoritative bounds; no authoritative or frozen runtime contract; no final
Protocol tables; platform matrix pending with an empty allowlist and
unenforced process profile; execution predicate unselected; supported domain
and runtime false; global truth-error constants and comparison tolerances
null; reason codes unfrozen; Public Check and bundle unissued; Group 2
incomplete before review preservation; RFC #25 open; R2-D5 and Release 2
incomplete. The finite observations 374, 2,978, 5,182, and 72,567 remain
non-bounds, and 100,000 remains the pre-existing fail-closed design ceiling.

## 10. Regression, hosted CI, and RFC boundary (protocol K-L)

At the exact head in this checkout:

- `pnpm install --frozen-lockfile`: success.
- `pnpm check`: fully green with exit 0 — formatting, Markdown lint,
  TypeScript, repository validation (including the private-dependency and
  code-path audits), unit tests 487/487 across 51 files, generated-artifact
  check, Phase 1, Phase 2A, and Phase 2A-021. No environment constraint
  interrupted this run; no IPC-free fallback was needed.
- Focused Group 2 + Group 1 + aggregate-readiness suites: 36/36.
- Reviewer-owned oracle (621 checks) and attack battery (92 attacks) as
  described above.

Hosted CI on the exact head `adea5c12...` — 7/7 check runs successful: run
`33574536833` (Full check Linux x64; Full check Linux x64 Node 24; Phase 1 +
2A validation on Linux arm64, macOS arm64, Windows x64 — 5/5 jobs),
paired-t evidence run `33574536840`, and runtime-series evidence run
`33574536786`.

Issue #25 was inspected live: state open, public review window OPEN,
earliest decision `2026-09-25T20:52:54Z` (`2026-09-26T05:52:54+09:00`)
unchanged. This candidate review cannot shorten the window or authorize an
early Steward disposition.

## 11. Findings

- BLOCKER: 0
- SHOULD-FIX: 0
- NICE-TO-HAVE: 0

Remark (no action required): within the full-trace composition, the known
CI endpoint-collapse witness is refused at the earlier tail projection stage,
so the composition's own `ci_truth_stage_refusal` path never sees that
specific witness; the CI component's collapse refusal was verified directly
on the component surface, and both paths fail closed with no truth proof.

## 12. Review execution record

Identity via `git cat-file`, `git rev-parse`, `git merge-base`, and
`git diff --numstat/--name-status`, with live PR-head comparison at review
start and completion; 26/26 blob bindings via `git rev-parse` at the source
snapshot; bound durable-review verdicts re-read; checkpoint canonical
SHA-256, outer envelope canonical digests, tail line-protocol digests,
composition digests, and all component JSON digests recomputed independently
in a separate language; a 621-check exact-rational and 400-bit
incomplete-beta oracle over an 11-case reviewer corpus; 92 validator/
verifier/evaluator attacks with getter counters (0 invocations);
`pnpm install --frozen-lockfile`, `pnpm check` (exit 0), and the focused
suites; hosted CI check-run and run-ID verification and live issue #25
inspection via the GitHub API. This file is added in a dedicated review
commit whose sole parent is the exact reviewed head on a neutral review
branch, changing no candidate file.

`GO` is bound to `adea5c12d709350cbd8d4fbf918ea8344c111000` only. Do not
merge PR #134 on the basis of this result without an explicit steward merge
decision, and re-review any different head. After an approved merge,
preserve this result byte-identically through the established
review-preservation flow before the separate Group 2 closure
synchronization increment.
