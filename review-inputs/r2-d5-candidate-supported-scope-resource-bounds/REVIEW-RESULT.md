# R2-D5 candidate supported-scope and resource-bounds independent review result

## Verdict

GO

The exact PR #130 head `000705ccc3b29d3ef449c5c050e7dba4723a3cab` may be
considered for merge as the non-authoritative R2-D5 Group 1 candidate
scope/resource selection. No BLOCKER, SHOULD-FIX, or NICE-TO-HAVE finding
remains in this bounded review.

Per the reviewed protocol, `GO` means only that the exact head justifiably
selects the non-authoritative Group 1 pair/df scope and primitive-trace
resource envelope, binds an executable non-domain corpus, and fails closed
under attack, while leaving independent-review preservation, Group 2,
supported-execution admission, final reason codes, authority, RFC, R2-D5,
and Release 2 open. It does not authorize runtime support, Group 2
graph/table/oracle/projection selection, platform admission, reason-code
freeze, Public Check/bundle issuance, or RFC/R2-D5/Release 2 closure. Any
different head requires a new independent exact-head review.

## 1. Exact identity and intended delta (protocol B)

- Repository: `licklider-ai/nomue-protocol`
- PR: `#130` (branch `r2-d5/candidate-supported-scope-resource-bounds`)
- Base, sole parent, and merge base:
  `16e468223917d641c2c014a59e791fafdbff00e9` (= `main` at review time; its
  tree `fbbd1fd086a86e34bde29a035d70217eb1f57587` matches the protocol's
  source-snapshot tree)
- Reviewed head: `000705ccc3b29d3ef449c5c050e7dba4723a3cab`
- Reviewed tree: `66446cb02e01adc23d55c45ee97c89b83179a8bb`
- Structure: one ahead-only commit
- Delta: exactly 9 paths, `+1764/-2`
- Review date: `2026-09-01` (UTC)

The live PR head was compared with the pinned head both before review began
and after all review work completed; it matched both times. The 9 paths are
limited to the checkpoint JSON, the corpus JSON, their validator/evaluator
module, their focused test, the readiness overlay module/JSON/test, the
review protocol, and the numerical README section. Zero paths changed under
`authority/`, `registries/`, `schemas/`, `conformance/`, `generated/`,
`spec/`, `reference/`, `bindings/`, `security/`, `evidence/`,
`canonicalization/`, `examples/`, `mappings/`, `review-inputs/`, or
`tooling/r2-paired-t-runtime-series/`; no pre-existing numerical
implementation, table byte, evidence byte, candidate checkpoint, durable
review, Public Check, bundle, verifier dispatch, or Release 1 content
changed.

## 2. Reviewer independence

This review was performed in a reviewer role in a separate working context
from the authoring context of the increment. The reviewer did not author or
modify the candidate content and did not adopt the PR description, the
checkpoint, declared hashes, or declared finite observations as evidence:
source bindings, both canonical digests, both table hashes and extents,
every resource formula and maximum, the full pair sweep, the heavy witness,
the boundary replay, and the metamorphic relations were re-derived or
re-executed with reviewer-owned constructions and an independent
canonicalization/SHA-256 implementation in a separate language. Two bound
inputs (the durable M3 closure and closure-gap review results) were produced
by this reviewer role in earlier bounded exact-head reviews; they are
consumed here as pinned repository artifacts, not re-adjudicated. All review
harnesses were temporary files outside the repository; this result file is
the review's only repository artifact.

## 3. Source reconstruction gate (protocol C)

All 22 `source_snapshot.bindings` entries were resolved at the
source-snapshot commit and every Git blob SHA-1 matched (22/22). The bound
artifacts confirm the thirteen protocol-C facts, including: the reviewed
closure-gap inventory orders Group 1 before the runtime contract and
platform admission; the operation-stage checkpoint supplies an ordered
predicate conjunction with eleven boundary cases; the durable G4
formula-close review fixes the exact node count `5n + 3` (with reviewer
controls 13/18/23/28/43/88/1,008 at n = 2, 3, 4, 5, 8, 17, 201) and keeps
201 pairs / 2,048 nodes as evaluation ceilings only; both reviewed tables
carry complete integer-df extent `1..200`; the paired-t relation is exactly
`df = n_pairs - 1`; the reviewed tail trace enforces the 100,000-node
fail-closed ceiling (`maximum_node_count_is_supported_resource_bound =
false`) and iteration cap `40 * df + 64` with support selection open; the
selected M2/M3 closures are candidate-readiness only; PR #108 remains the
sole selected M3-D identity with PR #110 the unmerged, not-selected
alternative; and platform admission, controlled-process enforcement,
full-graph support, final reason codes, Public Check/bundle, and R2-D5
remain open.

## 4. Pair/df selection and table bindings (protocol D)

Independently verified:

- The tail table artifact bytes hash to
  `sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`
  (recomputed from the raw blob), with `entry_count = 200` and contiguous
  integer df `1..200` in its entries.
- The fixed-95 ordered-cell hash was recomputed from the raw table bytes as
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`,
  with exactly 200 positive-finite strictly-decreasing binary64 cells for
  df `1..200`.
- The selection basis is the join of both complete reviewed extents with the
  exact relation `df = n_pairs - 1`, giving pairs `2..201` and df `1..200`;
  `finite_evidence_maximum_alone_is_selection_basis = false`. 202 pairs /
  df 201 are outside scope (verified upstream refusal and envelope
  rejection). The two-pair minimum and df = 1 are preserved.
- Neither hash is promoted to a final Protocol runtime-table selection;
  scope remains a per-stage predicate conjunction with no scalar magnitude
  bound, no rectangular magnitude domain, and no corpus-membership domain;
  negative zero remains outside scope (the canonicalizer rejects `-0`).

## 5. Resource-bound derivation (protocol F)

Independently derived and verified: `5 * 201 + 3 = 1,008` (G4 maximum, with
the 5n + 3 identity confirmed empirically at every n in `2..201` and the
2,048 evaluation ceiling not selected); the tail maximum is the pre-existing
reviewed fail-closed 100,000-node design ceiling, not the observed
72,567-node witness; `40 * 200 + 64 = 8,064` (cap maximum, formula
verified); exactly 3 CI-specific primitive nodes
(critical-times-SE, mean-minus-margin, mean-plus-margin); and
`1,008 + 100,000 + 3 = 101,011` (combined envelope). The pure resource
evaluator was exercised at both ends and rejects relation violations,
formula deviations, ceiling excess, inconsistent sums, extra/missing keys,
non-integers, negatives, negative zero, and a claimed support bit. The
finite observations 374, 2,978, 5,182, and 72,567 remain non-bounds.

## 6. Executable corpus, witness, and metamorphic checks (protocol G)

The corpus canonical SHA-256 was independently recomputed as
`sha256:19349e5ed5e4ebbe582abe426a6024398940915da04f5c1085f797b4c82d46a7`
and the checkpoint canonical SHA-256 as
`sha256:f5029f16ac8197853679344ea2741f6e692e47b25771ee6838ea625c019e1762`,
both matching the validator pins; the checkpoint binds the corpus digest.
Source corpora verified: 11 operation-stage boundary cases (each replayed
through the reference implementation and matching its declared first failure
or ordinary success), 20 tail truth cases, and the projection-transition
manifest with df `[1, 2, 3, 10, 30, 100, 200]` and the three declared
transition families.

With a reviewer-owned zero-mean nonzero-variance construction (independent
of the shipped test helper), every integer pair count from 2 through 201 was
executed through the G4-tail composition and fixed-95 CI evaluators:
`df = n - 1` exactly, exact-zero tail branch, p-value bits
`3ff0000000000000`, G4 trace nodes `5n + 3`, exactly 3 CI-specific nodes,
and acceptance by the pure resource envelope with no support/runtime claim,
at every n. The heavy witness at df = 200,
`t = 0x3ff0000000000001`, reproduced 5,182 iterations, cap 8,064, and
72,567 trace nodes; a review limit of 72,566 refuses
(`execution_trace_resource_bound_exceeded`) while 72,567 accepts; neither
observation is the selected bound. On the declared four-pair base, all five
metamorphic relations were verified with independently derived expectations:
observation/pair permutation preserves all returned values and canonical
traces; condition-direction swap and outcome sign reversal negate mean and
statistic, preserve variance/SE/p, and negate-and-reverse the CI endpoints;
exact multiplication by two scales mean/SE/margin/endpoints by two and
variance by four while preserving statistic and p; and exact translation by
sixteen preserves all returned values. In total the reviewer corpus harness
executed 21 independent corpus checks with zero mismatches.

## 7. Historical-label clarification (protocol H)

The successor records the closure-gap review's NICE-TO-HAVE clarification
with both `literal_source_checkpoint` (`support-domain-candidate.json`,
where the label string appears) and `resolved_checkpoint`
(`truth-error-support-closure-candidate.json`), and states that the reviewed
predecessor was not rewritten. The predecessor checkpoint and its durable
review result are byte-identical to the source snapshot.

## 8. Readiness synchronization and non-promotions (protocol I)

The readiness overlay records the Group 1 selection as
`selection_pending_independent_review` with
`selection_made_by_this_increment = true`, `independent_review = "pending"`,
and `group_1_complete = false`, pinning the selected scope/resource values
and both table hashes by strict equality with exact-key enforcement. All
mandatory non-promotions were verified in the reviewed bytes: no
authoritative supported bounds; no numerical-contract freeze; no runtime
selection of graph, final table, tail truth predicate, projection policy, or
CI truth policy; platform matrix pending with an empty allowlist and
unenforced process profile; execution predicate unselected; supported domain
and runtime false; global truth-error constants and comparison tolerances
null; reason codes unfrozen; Public Check and bundle unissued; Group 1
incomplete before review; R2-D5 and Release 2 incomplete.

## 9. Fail-closed validation and attacks (protocol J)

113 reviewer-owned attacks were executed across the checkpoint validator,
corpus validator, resource evaluator, and readiness validator; every one was
rejected fail-closed with a deterministic result and zero leaked exceptions:
source commit/tree/blob/role substitutions and binding-count changes; pair
and df extension, relation change, and finite-maximum-as-basis promotion;
G4 formula/maximum, tail ceiling/basis, iteration-cap, CI-count, and
combined-sum changes; relabeling 72,567 or 5,182 as bounds; predicate
removal and broadening and projection-class widening; corpus source-count,
sweep, resource-edge, witness-value, metamorphic-relation, and
guarantee-boundary drift; early independent-review and Group 1 completion
claims; every support/runtime/platform/predicate/graph/table/tolerance/
reason-code/authority/R2-D5/RFC/Release-2 promotion; historical
clarification collapse and predecessor-rewrite claims; undeclared keys and
array entries; and the full hostile-shape battery (NaN, Infinity, negative
zero, BigInt, functions, hidden own properties, symbol keys, accessors,
sparse and extended arrays, cycles, non-plain prototypes, throwing proxies,
and null/array roots) on every surface. The pristine checkpoint, corpus,
and readiness artifacts validate cleanly; JSON object-key reordering is
accepted (key order non-semantic) while array order and all values are
pinned. Caller-provided getters executed zero times across all four
surfaces.

## 10. Regression, hosted CI, and RFC boundary (protocol K-L)

At the exact head in this checkout:

- `pnpm install --frozen-lockfile`: success.
- `pnpm check`: fully green with exit 0 — formatting, Markdown lint,
  TypeScript, repository validation (registries, traceability, normative
  lint, authority manifest, links, private-dependency and code-path audits),
  unit tests 480/480 across 50 files, generated-artifact check, Phase 1,
  Phase 2A, and Phase 2A-021. No environment constraint interrupted this
  run; no IPC-free fallback was needed.
- Focused Group 1 + aggregate-readiness suites: 29/29.
- Reviewer-owned corpus and adversarial harnesses as described above.

Hosted CI on the exact head `000705cc...` — 7/7 check runs successful: run
`33532178553` (Full check Linux x64; Full check Linux x64 Node 24; Phase 1 +
2A validation on Linux arm64, macOS arm64, Windows x64 — 5/5 jobs),
paired-t evidence run `33532178870`, and runtime-series evidence run
`33532178802`.

Issue #25 was inspected independently: state open, public review window
OPEN, earliest decision `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`) unchanged. This increment allows no earlier
Steward disposition or authoritative landing.

## 11. Findings

- BLOCKER: 0
- SHOULD-FIX: 0
- NICE-TO-HAVE: 0

## 12. Review execution record

Identity via `git cat-file`, `git rev-parse`, `git merge-base`, and
`git diff --numstat/--name-status`, with live PR-head comparison at review
start and completion; 22/22 blob bindings via `git rev-parse` at the source
snapshot; canonical checkpoint/corpus SHA-256, tail-table byte SHA-256, and
fixed-95 ordered-cell SHA-256 recomputed independently in a separate
language; resource arithmetic re-derived; reviewer-owned full pair sweep,
boundary replay, heavy-witness and review-limit edge, and metamorphic
harness (21 checks, 0 mismatches); 113 validator/evaluator attacks with
getter counters (0 invocations); `pnpm install --frozen-lockfile`,
`pnpm check` (exit 0), and the focused suites; hosted CI check-run and
run-ID verification and issue #25 inspection via the GitHub API. This file
is added in a dedicated review commit whose sole parent is the exact
reviewed head on a neutral review branch, changing no candidate file.

`GO` is bound to `000705ccc3b29d3ef449c5c050e7dba4723a3cab` only. Do not
merge PR #130 on the basis of this result without an explicit steward merge
decision, and re-review any different head. Group 1 may be recorded as
complete only after this result is preserved through the established
review-preservation flow.
