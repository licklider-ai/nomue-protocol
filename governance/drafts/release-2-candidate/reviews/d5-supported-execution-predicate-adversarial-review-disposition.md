# D5 supported-execution predicate candidate adversarial-review disposition

## Review identity

- Baseline: `43e02f366982fc7a8e1e5774235584e9755abb46`
- Reviewed implementation: `cb4bfbc9417d0b837972acf7c2c45c6e54d888e1`
- Reviewed implementation tree: `bf652f8e256aee71b0bdf5e926741ef864c21165`
- Review-input commit: `e8fd88e2f9a421274fc1644d8b4b0f03fe303f6b`
- Independent review-result commit: `db26ad4cf46773386046ed8be36c34efee4d5b97`
- PR #52 merge: `9d9f54a4a75441bf0938a16a7ae12388589143d9`
- Review type: external, independent, candidate-scoped adversarial review
- Verdict: **GO** for an unissued, non-authoritative candidate only
- Findings: none
- Additional primary-source research requested for this increment: none

The review-result commit is a direct child of the review-input commit and adds only
`review-inputs/r2-d5-supported-execution-predicate/REVIEW-RESULT.md`. The reviewer
used fresh detached checkouts, confirmed the implementation tree, sole parent, and
exact eleven-path `+3312/-15` delta, and found no unexpected implementation path.
PR #52's merge tree equals the review-input tree, so the implementation and its
review protocol landed without an additional content change.

## Evidence established by the independent review

The reviewer built a separate exact-rational binary64 oracle and exercised 80,039
ordinary arithmetic vectors and 45,017 square-root vectors. The candidate accepted
no wrong result, rejected no valid in-scope result, accepted no adjacent-cell error,
and leaked no uncaught exception. The reviewer also confirmed the exact-bit behavior
of the absolute-value and maximum selectors used by the trace.

The returned p-value and the truth-error proof inputs were confirmed to come from
one frozen execution trace. The reviewer independently rebuilt the trace digest and
attacked omission, duplication, reordering, relabeling, operands, results, table
identity, branch, iterations, proof inputs, and returned-value bindings while
rebuilding dependent digests. All twenty coherent attacks were rejected. The
validator reconstructs the required schedule and proof indices from the input,
branch, and iteration count instead of trusting trace declarations.

A 1,360-input invariance corpus covered every integer degree of freedom from 1
through 200, branch boundaries, adjacent binary64 cells, subnormal and normal
extremes, and the existing high-error witness. Candidate values were bit-identical
to the reviewed table-connected graph, and the complete proof surface was
bit-identical to the reviewed truth-error evaluator. The reviewed inverse-beta table,
fixed-95 table, truth-error artifacts, and authoritative snapshot remained unchanged.

Hostile inputs, accessors, symbols, cycles, and throwing proxies were exercised
through every public candidate surface. No data-property accessor ran, no exception
escaped, and no refused input produced a support claim. Resource-bound boundaries,
checkpoint mutations, readiness mutations, and sixteen promotion attacks were all
rejected. The exact runtime allowlist remained empty, the controlled-process profile
remained unenforced, the 100,000-node ceiling remained an evaluation limit rather
than a selected support bound, and upstream G4 remained outside the candidate scope.

The full repository check and focused tests passed from the exact review input. The
review confirmed successful existing CI execution on Linux x64 with two Node lines,
Windows x64, macOS arm64, and Linux arm64, while explicitly withholding any inference
that those runs completed a platform matrix or selected support.

## Section H close-only supplement

- Evidence-tooling commit: `0bc988701d84683f147a652acc39adb535d58dc7`
- Local-reference-manifest commit: `f3a1c2130bb6e93659b2d76db909f4146355aba3`
- Supplement result commit: `b9023c9d2110ec1ba7cc4969991217c163498d89`
- Workflow run: `33344920611`
- Verdict: **H-CLOSED**
- New findings: none

The same independent reviewing role ran a fixed 631-case corpus on five hosted
runner tuples and one local reference environment. Every runner produced the same
ordered case set, 623 complete traces, eight fail-closed refusals, and byte-identical
cold and warmed results. The platform-neutral per-case fields had zero mismatches and
the shared rollup was
`e93ff4d17f406afd333c1731a001f46757234e6a6ffc9046ff6ff7a51a8edba7`.
Each runner independently rebuilt every raw trace digest, and differences between
raw rollups were explained only by the runtime-identity line bound into the trace.

Section H establishes that the reviewed trace and proof projection reproduced on
the tested runner set. It does not establish universal execution behavior, a complete
admission matrix, or support for any tuple. The candidate continued to report every
support field as false throughout the corpus.

The durable result, supplement, harness, comparator, comparison manifest, and local
reference manifests were added to the public repository by PR #53, whose merge is
`8a45ff8fdfc038125375a1717fbd5f5dc22918e9`. The temporary reviewer workflow
`.github/workflows/review-supplement-h.yml` was intentionally not added to the main
branch. Its run identity and evidence hashes remain recorded in the supplement.

## Disposition

The tail-only supported-execution implementation is accepted as independently
reviewed, non-authoritative R2-D5 decision-preparation material. The readiness summary
may record `reviewed_tail_only_implementation_candidate`, completion of the independent
candidate review, and completion of the bounded Section H cross-runner review.

The remaining open conditions are selection of a supported trace resource bound,
an exact runtime/build/platform allowlist, enforcement of the controlled-process
profile, complete per-tuple admission evidence, a public unsupported-platform reason
code, and final selection of the supported-execution predicate. The upstream G4
data-to-statistic graph also remains outside this tail-only candidate.

This disposition does not select a runtime or platform, claim a supported execution
or domain, complete cross-platform admission, select the 100,000-node ceiling, issue
a reason code, authorize a Public Check or bundle, complete R2-D5, publish Release 2,
or close public review issue #25.
