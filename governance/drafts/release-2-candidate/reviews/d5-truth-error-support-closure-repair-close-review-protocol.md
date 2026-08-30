# Release 2 D5 truth-error and support-closure repair close-only review protocol

## Assignment

Perform an independent, adversarial, close-only review of the accepted repairs for
the Release 2 paired-t truth-error and support-closure candidate.

- Repository: `https://github.com/licklider-ai/nomue-protocol`
- Original baseline: `6fad249dd715369de92c7c941a42ddcc34525381`
- Original reviewed implementation: `2b9d3f40a1e067d85a8856585f597394d5f98761`
- Original reviewed tree: `87bd33055b91cceb2da2552248fe39768b512777`
- Original independent review result: `773b0eadf02618c74c11c7e215d9b7d5c1f75528`
- Supplemental non-independent review result: `befb9dc969d352764ca71152d56f6325980267d5`
- Repair parent: `34da4fc19d38969269862f7603ca5ccfd8750659`
- Repair-parent tree: `4a6e941bde4efa116ff51ba16356b01c941fe120`
- Repair commit: `84debc3f8af699fcb317ee9c9925186de20df12f`
- Repair tree: `cf339e15d5626a67cc5406a029244b3f81149735`
- PR #46 merge: `612d0b943e34b55d8bd8cfe284d8dcdfbd3820a2`
- Public RFC: <https://github.com/licklider-ai/nomue-protocol/issues/25>

Read this protocol from its exact review-input commit, then check out the repair
commit by exact hash in a detached fresh clone or worktree. Do not review a moving
branch. Confirm that the repair's only parent and tree are exactly the values above.

This is not a new review of the numerical derivation. The original independent
review returned `GO` for candidate merge after re-deriving and attacking the proof.
This review must establish only that the bounded repair closes its reported
findings, introduces no regression, and leaves every numerical and authority
decision unselected.

## Review topology and finding sources

The independent review-result commit has the original baseline as its parent and
adds only its review report. It is not a child of the implementation commit. Confirm
the report itself pins the expected implementation, parent, tree, and exact 20-path
delta and returns `GO`, zero blockers, one should-fix item, and three nice-to-have
items.

The supplemental result is a direct child of the implementation, but is explicitly
an author-context self-review and not independent. Confirm that it returns `NO-GO`
for the unrepaired implementation based on two hostile-input exception findings and
does not report a counterexample to the numerical derivation.

The repair parent differs from the reviewed implementation only by
`governance/drafts/release-2-candidate/reviews/d5-truth-error-support-closure-adversarial-review-protocol.md`.
That protocol-only intermediate commit is not part of the implementation repair.

## Exact repair file set

The repair-parent-to-repair delta must contain exactly ten modified files, 326
insertions, and 35 deletions:

- `tooling/src/spikes/paired-t-numerical-readiness.ts`
- `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts`
- `tooling/src/spikes/paired-t-support-domain-candidate.ts`
- `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`
- `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`
- `tooling/tests/paired-t-numerical-readiness.test.ts`
- `tooling/tests/paired-t-runtime-series-evidence.test.ts`
- `tooling/tests/paired-t-runtime-table-integration-candidate.test.ts`
- `tooling/tests/paired-t-support-domain-candidate.test.ts`
- `tooling/tests/paired-t-truth-error-support-candidate.test.ts`

Report any other changed path, mode, numerical artifact, checkpoint, generator,
table cell, or authority surface before continuing. Confirm that the PR #46 merge
tree is byte-identical to the repair tree.

## Required checks

### 1. Independent S1 and supplemental filesystem boundary

Inspect the preflight and every subsequent filesystem read rather than trusting the
new test names. Starting from a valid regenerated runtime-series bundle, exercise at
least:

- a missing bundle root;
- a regular file supplied as the bundle root;
- an unexpected extra root entry;
- a required entry removed;
- a required regular file replaced by a directory;
- a required source copy replaced by a symlink;
- malformed JSON in each parsed JSON input; and
- valid JSON with an invalid top-level or nested shape.

Every case must return deterministic, nonempty validation errors without an
uncaught exception. A directory in place of
`truth-error-support-candidate.ts` must no longer produce `EISDIR`. Symlinks and
non-regular files must remain rejected, and a damaged bundle must never validate or
produce candidate support.

Confirm that error containment does not weaken the closed expected-file set,
manifest binding, source-copy binding, exact expected-commit binding, or semantic
checkpoint validation.

### 2. Independent N1 diagnostic separation

Inspect the complete `replayWithProof` result flow. Establish that:

- a failed central or lower-tail bound formation returns
  `truth_error_bound_not_finite`;
- a branch, p-value-bit, iteration-count, iteration-cap, or exhausted-loop replay
  divergence returns `proof_graph_reproduction_mismatch`;
- either failure refuses with `runtimeSupportClaimed: false` and
  `supportedDomainClaimed: false`; and
- a proof failure cannot fall through to projection-margin acceptance.

The bound-formation path may be difficult to reach through current valid inputs. Use
a reviewer-owned instrumented copy or controlled dependency substitution if needed,
and show that its only semantic difference from the repair source is exposure or
forcing of the intended internal failure. Do not modify the reviewed checkout.

### 3. Independent N2 square-root accounting

Derive the executed native square-root count directly from each operation path and
compare it with the reported distinct-label count. At minimum, check exact zero,
df-two central, df-two tail, odd and even central-series paths, and odd and even
lower-tail paths.

The required regression is:

```text
evaluatePairedTTruthErrorSupportCandidate({ degreesOfFreedom: 2, testStatistic: 2 })
  -> proof.sqrtRoundingCellChecks === 1
```

Confirm that one verified root feeding multiple downstream operations remains one
check, while different executed root labels remain distinct. Perturb each executed
host square root by one ordered cell in a reviewer-only instrumented copy and confirm
that the corresponding rounding-cell failure still refuses. The counting repair
must not weaken `sqrtRoundingCellsVerified` or omit a failed root.

### 4. Independent N3 and supplemental hostile shapes

Call the exported truth-error evaluator and table-integration evaluator directly
with at least:

- `null`, `undefined`, primitives, arrays, and empty objects;
- missing, extra, inherited-only, and wrong-typed fields;
- `NaN`, infinity, negative zero, non-integer df, and out-of-range df;
- a null-prototype object; and
- a proxy that throws during key enumeration or property access.

No input may throw. Invalid raw shapes must return the existing non-authoritative
invalid-input or runtime-graph refusal surface, with runtime and supported-domain
claims false.

Exercise `validatePairedTNumericalReadinessCandidate`,
`validatePairedTSupportDomainCandidate`, and
`validatePairedTSupportBoundaryCorpus` with hostile top-level values and malformed
nested values. Each must return a nonempty error list without throwing. Confirm that
valid documents still return no errors and that promotion, unknown-field, missing-
field, and ordering mutations remain rejected.

### 5. Numerical and graph invariance

The repair is diagnostic and validation hardening, not a numerical change. Compare
the original reviewed implementation and the repair over a reviewer-selected valid
input corpus spanning every df from 1 through 200, both graph branches, df-two
closed forms, branch-adjacent values, long series, projection transitions,
subnormal and zero truth projections, and extreme finite inputs.

Require exact agreement in graph acceptance or refusal, branch, p-value bits,
iteration count, iteration cap, gamma indices, truncation bound, input-specific ULP
bound, and projection result. The only permitted differences are the documented
distinct square-root count and the diagnostic classification for a deliberately
forced bound-formation failure. Record any other difference as at least
`SHOULD-FIX`; any understated accepted bound, changed graph value, or new acceptance
is a `BLOCKER`.

Regenerate the 20-case runtime-series bundle at the repair commit with the pinned
Python and FLINT binding. Require:

- 16 candidate acceptances;
- three `truth_error_proof_precondition_failed` refusals;
- one `projection_margin_not_established` refusal;
- the df 197 truth distance of 374 cells and candidate bound of 2,978 cells;
- zero accepted pointwise distances above their candidate bounds;
- successful validation of the unmodified bundle; and
- rejection of all 22 bundled mutation probes without an uncaught exception.

The full bundle bytes and manifest hashes include commit and repaired-source
provenance and therefore need not equal the original implementation bundle. Compare
the numerical case results, not provenance fields, when establishing invariance.

Independently recompute the reviewed inverse-beta table bytes and confirm the table
hash remains
`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`.

### 6. Authority and maturity boundary

Confirm mechanically and by inspection that the repair and PR #46 merge change no
authoritative registry, schema, conformance expectation, reference verifier, Public
Check, bundle, normative specification, or Release 1 behavior. Recompute the
authoritative snapshot and confirm it remains
`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`.

Confirm all of the following remain unselected or false:

- final input-specific or global truth-error bound;
- supported truth-error and projection-margin predicate;
- supported degrees-of-freedom maximum and supported domain;
- supported platform matrix;
- final reason-code spellings;
- final runtime table and final table hash;
- runtime support, Public Check, and interpretation bundle;
- R2-D5 completion and Release 2 publication.

The 374-cell observation and 2,978-cell input-specific witness bound must remain
pointwise facts, not a global maximum or guarantee. Public review issue #25 must
remain open.

### 7. Repository-wide checks

From a clean exact checkout of the repair commit, run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

Run the runtime-series generator, validator, and mutation probe with
`NOMUE_GENERATOR_COMMIT` pinned to the exact repair commit, following
`tooling/r2-paired-t-runtime-series/README.md`. Record the Python,
`python-flint`, FLINT, Node, and pnpm versions. If an environmental restriction
prevents one command, record it precisely and execute the underlying check through
an equivalent repository-supported entry point. Confirm `git status --porcelain`
is empty afterward.

## Required output

Return one report containing:

1. exact repository, review-input, original implementation, repair parent, repair
   commit, tree, PR merge tree, and file-delta identity;
2. the independent and supplemental review topology and finding inventory;
3. filesystem and malformed-shape attack results;
4. diagnostic-separation and square-root-accounting results;
5. direct hostile-input results for every exported surface in scope;
6. original-to-repair numerical and graph invariance results;
7. regenerated bundle, 22-probe, table-hash, and pointwise-witness results;
8. authority, Release 1, and repository-wide regression results;
9. every unexpected finding classified as `BLOCKER`, `SHOULD-FIX`, or
   `NICE-TO-HAVE`; and
10. one close-only verdict: `CLOSED` or `NOT CLOSED`.

`CLOSED` means only that independent S1 and N1-N3, plus the supplemental hostile-
input findings, are repaired and the original candidate-scoped `GO` remains valid.
It does not approve a selected bound, support predicate, supported df, platform,
reason-code set, runtime table, Public Check, bundle, paired-t support, R2-D5
completion, Release 2 publication, or RFC closure.

If operating in the repository, write only
`review-inputs/r2-d5-truth-error-support-repair-close/REVIEW-RESULT.md` on a neutral
reviewer-owned branch such as
`review/r2-d5-truth-error-repair-close-84debc3f`. Base the result branch on the exact
review-input commit containing this protocol. Do not modify the implementation,
repair branch, checkpoint, or generated artifacts.
