# Release 2 D5 truth-error and support-closure adversarial review protocol

## Assignment

Perform an independent, adversarial, delta-scoped review of the Release 2 paired-t
truth-error and support-closure candidate.

- Repository: `https://github.com/licklider-ai/nomue-protocol`
- Baseline commit: `6fad249dd715369de92c7c941a42ddcc34525381`
- Implementation commit: `2b9d3f40a1e067d85a8856585f597394d5f98761`
- Expected implementation tree: `87bd33055b91cceb2da2552248fe39768b512777`
- Public RFC: <https://github.com/licklider-ai/nomue-protocol/issues/25>
- Reviewed table-integration predecessor: PR #41

Check out the implementation commit by exact hash in a detached worktree. Do not
review a moving branch head. Confirm its parent and tree are exactly the values
above before evaluating the change.

This implementation is deliberately a non-authoritative candidate. A `GO` may
approve only its merge as reviewable R2-D5 candidate engineering. Return `NO-GO` if
the derivation is unsound, the implementation can understate its bound, the graph
replay diverges, evidence can be forged, a refusal can become support, or the change
claims authority that its checkpoint withholds.

Do not report intentionally open final decisions as defects merely because they
remain open. In particular, this review cannot select a final truth-error predicate,
a global bound, supported degrees of freedom, a platform matrix, public reason
codes, a Public Check, a bundle, paired-t support, R2-D5 completion, or Release 2
publication.

## Intended delta

The implementation is intended to do exactly the following:

1. expose a fresh copy of one already validated cell from the reviewed contiguous
   inverse-beta candidate table;
2. replay the unchanged table-connected binary64 runtime-series graph while tracking
   a conservative input-specific mathematical-truth error candidate;
3. require every derived positive operation used by the proof to be strictly above
   the minimum normal binary64 value;
4. verify every executed native square root against its exact rational binary64
   rounding cell;
5. calculate worst-direction roundoff composition exactly and re-index it to the
   smallest covering `gamma(k) = k*u/(1-k*u)`, with `u = 2^-53`;
6. combine that roundoff envelope with the positive-series stopping observation and
   geometric remainder multiplier;
7. convert the resulting relative bound to a conservative integer cell-distance
   bound using exact rational arithmetic;
8. require the graph result to be strictly farther from the nearest selected
   projection-class transition than that input-specific bound;
9. bind the evaluator and checkpoint into regenerated Arb runtime-series evidence;
10. add the `df = 197` high-error witness and require all accepted evidence cases to
    remain inside their derived candidate bounds;
11. keep the new predicate deferred in the support-domain candidate; and
12. keep runtime support, selected bounds, selected supported df, platform closure,
    final reason codes, Public Checks, bundles, and identifier issuance disabled.

The readiness state must remain `incomplete_pending_independent_review`.

## Exact implementation file set

Confirm that the baseline-to-implementation delta contains exactly these 20 paths:

- `.github/workflows/release2-paired-t-runtime-series-evidence.yml`
- `governance/drafts/release-2-candidate/README.md`
- `governance/drafts/release-2-candidate/numerical/README.md`
- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
- `governance/drafts/release-2-candidate/numerical/support-domain-candidate.json`
- `governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json`
- `governance/drafts/release-2-steward-ratification-package.md`
- `tooling/r2-paired-t-runtime-series/README.md`
- `tooling/r2-paired-t-runtime-series/cases.json`
- `tooling/r2-paired-t-runtime-series/generate_evidence.py`
- `tooling/src/spikes/paired-t-numerical-readiness.ts`
- `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts`
- `tooling/src/spikes/paired-t-support-domain-candidate.ts`
- `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`
- `tooling/src/spikes/probe-paired-t-runtime-series-evidence.ts`
- `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`
- `tooling/tests/paired-t-numerical-readiness.test.ts`
- `tooling/tests/paired-t-runtime-series-evidence.test.ts`
- `tooling/tests/paired-t-runtime-table-integration-candidate.test.ts`
- `tooling/tests/paired-t-truth-error-support-candidate.test.ts`

Report and inspect any extra path before continuing. Also inspect the unchanged
runtime-series graph, projection-margin evaluator, reviewed table candidate, table
integration checkpoint, and their prior review disposition as dependencies.

## Required checks

### 1. Identity, graph replay, and table binding

- Verify the exact baseline, implementation commit, parent, tree, and changed-file
  set.
- Independently recompute the reviewed table file hash and confirm the new lookup
  cannot bypass existing closed-surface and exact-byte validation.
- Confirm every returned lookup object is detached from module-level state.
- For every integer df from 1 through 200, compare the proof replay with the existing
  table-connected graph over zero, both cells adjacent to `|t| = 1`, exactly `1`,
  ordinary central and tail inputs, large finite inputs, and both signs where valid.
- Require exact equality of branch, p-value bits, iteration count, and iteration cap.
- Confirm invalid df, non-finite statistics, and negative zero refuse without an
  uncaught exception.

Any changed graph output, hidden table replacement, or replay mismatch that can be
reported as candidate support is a `BLOCKER`.

### 2. Roundoff derivation

Re-derive the complete error algebra independently. Do not accept the implementation
comments or the finite Arb corpus as the proof.

For every tracked operation, verify both the upper and lower worst directions:

- positive multiplication of two values enclosed by gamma indices;
- positive division, including the denominator's adverse direction;
- positive addition as a weighted relative error bounded by the larger input
  envelope;
- square-root contraction of a positive relative perturbation followed by one
  correctly rounded result; and
- the correctly rounded inverse-beta table cell represented by the initial envelope.

Confirm that exact rational comparison selects a `gamma(k)` that contains both
directions. Specifically attack the invalid shortcut of always using only
`firstIndex + secondIndex + 1` for division; demonstrate that the implementation's
re-indexing covers the higher-order term. Check repeated use of the same intermediate,
binary exponentiation, shared numerator/denominator dependencies, and long series
recurrences rather than assuming independent errors.

Attack the 1,024-step re-index search limit. It must fail closed if no containing
index is found and must not silently reset an error envelope.

### 3. Normal arithmetic and square roots

- Prove that requiring a rounded result strictly above the minimum normal value is
  sufficient for the ordinary relative roundoff model used here.
- Check the deliberate refusal of the minimum-normal result itself, where the exact
  predecessor may be subnormal.
- Exercise subnormal inputs, underflowed products, minimum-normal outputs, largest
  finite values, and overflow-adjacent operations.
- Independently inspect exact binary64-to-rational conversion, adjacent cells,
  midpoint construction, midpoint squaring, and strict containment for every native
  square root.
- Test midpoint, adjacent-root, subnormal-root, and maximum-root attacks. A host
  square-root result not established by the exact cell check must refuse.

No blanket claim about every runtime platform may be inferred from these checks.

### 4. Stopping observation and positive-series remainder

For both series branches, verify that `nextSum === sum` with positive normal values
implies the exact next term is bounded through:

- the pre-add accumulated sum's gamma index;
- the next term's gamma index; and
- one unit roundoff from the no-change observation.

Confirm the implementation uses the pre-add sum, not the equal-valued post-add
tracked expression. Independently derive:

- multiplier `2` for the central series over every integer df in the evaluation
  target and every exact binary64 `|t| <= 1`; and
- multiplier `df + 1` for the lower-tail series from exact `|t| > 1`.

Attack off-by-one term indexing, the cap boundary, exact branch-adjacent statistics,
term underflow, and a stopped sum whose next term is exactly a tie. Verify the df=2
central and tail closed forms separately because they have no series remainder.

### 5. Central complement and ULP conversion

- Verify that the central branch converts relative core error and the missing
  positive tail into a valid absolute probability error before accounting for the
  final subtraction from one.
- Verify that `pValue - absoluteBound` is a strict positive lower bound before it is
  used to form a relative bound.
- Check that every bound calculation affecting acceptance is exact rational
  arithmetic and that display-only binary64 bounds round upward.
- Independently prove or refute the conversion from relative error `E < 1/2` to
  `ceil(2^54 * E + 1)` ordered binary64 cells. Include downward and upward binade
  crossings, the normal/subnormal transition, and final correct rounding of the
  mathematical truth.
- Confirm the exact-zero branch legitimately has bound zero and that a nonzero
  rounded-one result cannot pass the one-cell projection margin.

An underestimated integer bound or an incorrect projection distance is a
`BLOCKER`.

### 6. Independent numerical checks

Independently reproduce at least the following exact checkpoints:

| Input                                     | Required graph result                                  | Required independent fact                         | Candidate checkpoint                                                    |
| ----------------------------------------- | ------------------------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------- |
| df 197, statistic bits `4049333333333333` | p bits `284f4ce6230625df`, 14 iterations               | truth bits `284f4ce623062755`, distance 374 cells | gamma indices 1290/196/210, remainder multiplier 198, bound 2,978 cells |
| df 200, statistic `1.0000000000000002`    | p bits `3fd4629ce0bba503`, 5,182 iterations, cap 8,064 | independently enclosed truth                      | core gamma index 78,820, bound 158,044 cells                            |

Use Arb/FLINT or a genuinely independent rigorous route for truth enclosures. Do not
use agreement among ordinary statistics libraries as an oracle.

Regenerate the closed 20-case bundle and require:

- 16 candidate acceptances;
- three `truth_error_proof_precondition_failed` refusals;
- one `projection_margin_not_established` refusal;
- zero certified pointwise distances above a candidate bound; and
- rejection of all 22 bundled mutation probes.

Add a reviewer-selected corpus that was not copied from the implementation. It must
cover every df from 1 through 200 at least once, both branch neighborhoods, long
iteration paths, ordinary tails, projection transitions, extreme finite statistics,
subnormal results, and rounded-one results. Record accepted/refused counts and every
largest observed truth-distance-to-bound ratio. A finite scan remains diagnostic and
must not be reported as the proof or as contiguous support.

### 7. Fail-closed and promotion attacks

Starting from valid files and a valid generated bundle, attempt at least:

- changing any proof-model field, gamma index, witness bit, observed distance,
  candidate bound, or projection rule;
- setting runtime support, supported domain, selected input-specific bound, selected
  global bound, supported df, final table hash, or closure to a promoted value;
- adding an undeclared field or removing a required field at every new JSON level;
- altering the copied proof source and coherently rebuilding source and manifest
  hashes;
- altering checkpoint JSON and rebuilding the manifest;
- altering an Arb truth projection or ULP distance while rebuilding outer hashes;
- removing, duplicating, or reordering the high-error witness;
- supplying malformed JSON, missing files, unreadable files, or symlinks; and
- passing invalid values directly to every exported validator and evaluator.

No material mutation may pass, and hostile input must not cause an uncaught
exception in an exported validation path.

### 8. Authority, maturity, and publication boundary

Confirm mechanically and by inspection that:

- the implementation commit changes no authoritative registry, schema, conformance
  expectation, reference verifier, Public Check, bundle, or normative specification;
- Release 1 frozen and supported behavior is unchanged;
- the checkpoint is non-authoritative, unissued, review-pending, and non-runtime;
- `supported_degrees_of_freedom_maximum`, the global truth bound, final table hash,
  and supported platform matrix remain unset;
- the support-domain predicate remains deferred;
- the 374-cell observation is not relabeled as a global maximum or guarantee;
- the 2,978-cell witness bound is not relabeled as a universal or selected bound;
- issue #25 remains open and its review window is neither closed nor restarted by
  this candidate increment; and
- documentation does not imply paired-t support, R2-D5 completion, or Release 2
  publication.

An authority leak or premature support claim is a `BLOCKER`.

### 9. Reproduction and repository checks

From a fresh clone at the exact implementation commit:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

Create a fresh Python 3.12 environment using only the pinned requirement, regenerate
the runtime-series bundle with the exact implementation hash, run its validator and
mutation probe, and confirm the checkout remains clean.

If the environment prevents the `tsx` command from creating its IPC socket, record
that environmental limitation and execute each underlying source with
`node --import tsx`. Do not waive any underlying check.

Record Node, Python, python-flint, FLINT, operating-system, and architecture versions.
Additional platform runs are useful diagnostics but cannot select the supported
platform matrix in this review.

## Research-gate assessment

Determine whether the implementation contains any externally grounded numerical
decision beyond the self-contained derivation and already reviewed table/graph
family. If primary literature is needed to validate a theorem or floating-point
premise, cite the exact primary source and separate that source-backed premise from
the code review. Do not infer correctness or consensus from library agreement.

## Required report

Return one report with:

1. repository, baseline, implementation commit, parent, and tree identity;
2. exact changed-file assessment;
3. graph replay and table-binding results;
4. an independently written roundoff derivation, including division and square-root
   attacks;
5. stopping-rule and remainder derivations;
6. central-complement, ULP-conversion, and projection-margin results;
7. independent numerical reproduction and reviewer-selected corpus results;
8. mutation, promotion, malformed-input, and authority-boundary results;
9. fresh-clone repository and environment results;
10. research-gate assessment;
11. findings ordered as `BLOCKER`, `SHOULD-FIX`, or `NICE-TO-HAVE`; and
12. one overall verdict: `GO` or `NO-GO`.

Each finding must identify the exact file/function, minimal reproducer, actual and
expected behavior, mathematical or authority impact, smallest sufficient repair,
semantic-scope classification, and public-review-window impact.

`GO` means only that implementation commit
`2b9d3f40a1e067d85a8856585f597394d5f98761` may be merged as a non-authoritative
R2-D5 truth-error/support-closure candidate. It does not approve a selected bound,
supported predicate, supported df, supported platform, Public Check, bundle,
paired-t support, R2-D5 completion, or Release 2 publication.

If operating in the repository, write only
`review-inputs/r2-d5-truth-error-support-closure/REVIEW-RESULT.md`, commit it on a
neutral reviewer-owned branch such as
`review/r2-d5-truth-error-support-closure-2b9d3f4`, and do not modify the
implementation branch or implementation files. Remove temporary probes and finish
with a clean worktree.
