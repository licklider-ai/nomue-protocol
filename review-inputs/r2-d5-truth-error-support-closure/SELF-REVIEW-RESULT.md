# Release 2 D5 truth-error and support-closure supplemental adversarial review

## Disposition

- Review date: `2026-08-30`
- Review role: author-context supplemental adversarial self-review
- Independence boundary: **not independent**; this result cannot satisfy the
  independent-review gate or replace a separate reviewer
- Repository: `https://github.com/licklider-ai/nomue-protocol`
- Baseline: `6fad249dd715369de92c7c941a42ddcc34525381`
- Implementation: `2b9d3f40a1e067d85a8856585f597394d5f98761`
- Implementation parent: `6fad249dd715369de92c7c941a42ddcc34525381`
- Implementation tree: `87bd33055b91cceb2da2552248fe39768b512777`
- Overall verdict for the exact implementation commit: **NO-GO**
- Numerical-derivation result: no counterexample or understated accepted bound found
- Findings: zero `BLOCKER`, two `SHOULD-FIX`, zero `NICE-TO-HAVE`

The `NO-GO` is caused by two hostile-input exception findings against an explicit
review-protocol condition. It is not a rejection of the roundoff, stopping-rule,
remainder, central-complement, ULP-conversion, or projection-margin derivation. The
repairs are candidate-tooling boundary hardening and do not require a semantic
change, a new numerical decision, or a restart of the public review window.

## 1. Identity and exact delta

The review used a detached fresh clone at the exact implementation hash. `git
rev-parse` reproduced the expected implementation, parent, and tree identities.
The baseline-to-implementation delta contains exactly 20 paths and no extra path:

1. `.github/workflows/release2-paired-t-runtime-series-evidence.yml`
2. `governance/drafts/release-2-candidate/README.md`
3. `governance/drafts/release-2-candidate/numerical/README.md`
4. `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
5. `governance/drafts/release-2-candidate/numerical/support-domain-candidate.json`
6. `governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json`
7. `governance/drafts/release-2-steward-ratification-package.md`
8. `tooling/r2-paired-t-runtime-series/README.md`
9. `tooling/r2-paired-t-runtime-series/cases.json`
10. `tooling/r2-paired-t-runtime-series/generate_evidence.py`
11. `tooling/src/spikes/paired-t-numerical-readiness.ts`
12. `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts`
13. `tooling/src/spikes/paired-t-support-domain-candidate.ts`
14. `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`
15. `tooling/src/spikes/probe-paired-t-runtime-series-evidence.ts`
16. `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`
17. `tooling/tests/paired-t-numerical-readiness.test.ts`
18. `tooling/tests/paired-t-runtime-series-evidence.test.ts`
19. `tooling/tests/paired-t-runtime-table-integration-candidate.test.ts`
20. `tooling/tests/paired-t-truth-error-support-candidate.test.ts`

The unchanged runtime-series graph, projection-margin evaluator, inverse-beta table
candidate, table-integration checkpoint, and accepted table-integration review
disposition were inspected as dependencies. No dependency was silently replaced.

## 2. Graph replay and table binding

The reviewed table bytes independently hash to:

```text
sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08
```

This equals the constant enforced before the table is parsed or exposed. A coherent
JSON change still fails the unconditional byte hash. The table loader returns no
entries after any validation error. Two lookups of the same `df` return detached
objects; mutating the first object did not alter a later lookup.

A separately selected 3,000-case replay grid covered every integer `df` from 1
through 200. For every `df`, it included zero, both cells adjacent to `|t| = 1`,
exactly `1`, ordinary central and tail values, `50`, `2^40`, and both signs for every
nonzero statistic. Results were:

- graph successes: 3,000;
- successful truth-error candidate evaluations: 2,654;
- proof-precondition refusals after exact graph reproduction: 346;
- branch, p-value bits, iteration count, or cap mismatches: zero; and
- `proof_graph_reproduction_mismatch` results: zero.

Seven typed invalid inputs covering invalid `df`, non-finite statistics, and negative
zero all refused without throwing. Raw `null` and `undefined` are addressed in
finding S1.

## 3. Independently derived roundoff model

Let `U = 2^53`, `u = 1/U`, and

```text
gamma(k) = k / (U - k).
```

For tracked approximations with relative envelopes `gamma(m)` and `gamma(n)`, the
two multiplication directions are bounded by:

```text
(1 + gamma(m))(1 + gamma(n))(1 + u) - 1
1 - (1 - gamma(m))(1 - gamma(n))(1 - u).
```

For division, the denominator must move in the adverse direction:

```text
((1 + gamma(m)) / (1 - gamma(n)))(1 + u) - 1
1 - ((1 - gamma(m)) / (1 + gamma(n)))(1 - u).
```

Positive addition inherits the larger operand envelope because its pre-rounding
relative error is a positive weighted average of the operand errors. One final
rounding is then composed. For a square root, if `|theta| <= gamma < 1`, then both
`sqrt(1 + theta) - 1` and `1 - sqrt(1 + theta)` are no greater than `gamma`; using
the full inherited envelope before the final rounding is conservative. The reviewed
correctly rounded inverse-beta cell starts at `gamma(1)`, which is strictly larger
than the usual one-rounding `u` bound.

The implementation compares these exact rational directions and selects the least
covering gamma index. An independent 374-composition attack included multiplication,
division, addition, square root, zero indices, the observed long-path range, and
indices through `10^9`. It confirmed minimal containment in every case. It also
demonstrated why the naive division shortcut is invalid: dividing an exact numerator
by a `gamma(2)` denominator and rounding requires `gamma(4)`, while
`m + n + 1` proposes only `gamma(3)`. The implementation selected the larger index.

The 1,024-step search did not under-cover any tested composition; the largest extra
offset on the deliberately oversized grid was 112 at an index of `10^9`. More
importantly, exhaustion is fail-closed rather than assumed impossible. A temporary
probe forced every re-index search to exhaust. The evaluator returned
`truth_error_proof_precondition_failed`, with propagated
`*_roundoff_composition` failures, and did not produce candidate support.

Repeated use of an intermediate, squaring during binary exponentiation, shared
numerator/denominator dependencies, and the long recurrence do not require error
independence. The implementation composes interval extrema, so treating correlated
errors as independently adverse only enlarges the envelope.

## 4. Normal arithmetic and square roots

If a finite rounded positive result is strictly greater than the minimum normal
binary64 value, the exact pre-rounding result lies above the midpoint between the
minimum-normal cell and its successor. It is therefore itself normal, and the
ordinary relative roundoff model applies. Equality is correctly refused because the
exact predecessor of a minimum-normal rounded result can be subnormal.

Subnormal statistics, minimum-normal values, underflowed products, maximum finite
statistics, and overflow-adjacent results were exercised. A failed or non-finite
derived operation propagated a proof failure and never became candidate support.

The exact binary64-to-rational conversion, adjacent roots, midpoint construction,
and midpoint squaring were independently reconstructed. Nine inputs spanning the
smallest subnormal, minimum normal and its successor, ordinary squares, and the
largest finite input passed the exact cell test for the host square root. Both
adjacent tampered roots for every input were rejected (18 of 18). The strict test
also intentionally refuses a midpoint tie rather than relying on a platform claim.
No supported-platform conclusion follows from this single environment.

## 5. Stopping observation and series remainders

For positive normal binary64 values, `RN(sum_hat + term_hat) = sum_hat` implies:

```text
term_hat <= u * sum_hat.
```

Using the pre-add accumulated sum and next-term envelopes gives:

```text
T / S <= u * (1 + gamma(sumIndex)) / (1 - gamma(termIndex)).
```

The exact simplification implemented by the candidate is:

```text
(U - termIndex) / ((U - sumIndex)(U - 2*termIndex)).
```

The code uses the pre-add `sum`, not the equal-valued post-add expression. The
post-add tracked object is used only to retain failure information.

For the central series, the successive-term ratio is

```text
y * (df/2 + 1/2 + n) / (3/2 + n),
```

with `y <= 1/(df + 1)`. For `df = 1` it is below `1/2`; for every integer
`df >= 3` its maximum is at `n = 0` and is at most `1/3`. Therefore the complete
remainder is no greater than twice the first omitted term. `df = 2` correctly uses a
separate closed form.

For the tail series, each non-`x` factor in the successive-term ratio is below one,
so the ratio is below `x`. Exact `|t| > 1` gives
`x < df/(df + 1)` and hence `1/(1 - x) < df + 1`. The candidate multiplier
`df + 1` is conservative. Branch-adjacent inputs, cap handling, stopped sums, term
underflow, and both `df = 2` closed forms were exercised without an off-by-one or
bound violation.

## 6. Central complement, ULP conversion, and projection margin

On the central branch, the candidate converts the core relative envelope and
positive omitted remainder into an absolute probability error:

```text
D = gamma(coreIndex) + truncationRelativeBound + u.
```

The core and omitted central probability are each at most one, so this is a valid
absolute bound. The final `u` covers subtraction from one. The evaluator requires
`p_hat - D > 0` and then uses `D/(p_hat - D)` as a valid relative truth-error bound.
All acceptance-bearing arithmetic is exact rational arithmetic. Display-only bounds
are converted to the least binary64 value not below the exact rational.

For a positive normal graph value `H` and truth-relative error `E < 1/2`,
`|p - H| <= E*p` and `p <= H/(1-E) < 2H`. Across the resulting interval, the
smallest relevant ordered-cell spacing is at least `H/2^53`, including a downward
binade crossing. At the normal/subnormal transition the fixed subnormal spacing is
larger than that lower estimate. Thus the exact-value displacement is below
`2^54*E` cells; final correct rounding adds at most one cell. The implemented
`ceil(2^54*E + 1)` is conservative.

An exact-rational 1,672-case attack crossed ordinary binades and the
normal/subnormal transition and included `E` from one unit roundoff to immediately
below `1/2`. There was no underestimate. The largest observed endpoint-to-bound
ratio was below `0.5`.

The exact-zero branch legitimately has zero error. Every nonzero path has a positive
bound whose integer conversion is at least two cells, so a rounded-one result with
only a one-cell class margin cannot pass. The projection evaluator's strict
`distance > bound` condition therefore preserves the selected projection class.

## 7. Independent numerical reproduction

The two pinned cases reproduced as follows:

| Input                                       | Graph                                                  | Independent Arb truth                       | Candidate proof                                                                |
| ------------------------------------------- | ------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------ |
| `df=197`, statistic bits `4049333333333333` | p bits `284f4ce6230625df`; 14 iterations; cap 7,944    | truth bits `284f4ce623062755`; distance 374 | gamma indices 1,290 / 196 / 210; multiplier 198; bound 2,978                   |
| `df=200`, statistic `1.0000000000000002`    | p bits `3fd4629ce0bba503`; 5,182 iterations; cap 8,064 | truth bits `3fd4629ce0bba539`; distance 54  | core gamma 78,820; sum 77,716; next term 77,730; multiplier 201; bound 158,044 |

The 20-case bundle was regenerated from the exact implementation hash. Its validator
confirmed 16 acceptances, three `truth_error_proof_precondition_failed` refusals,
one `projection_margin_not_established` refusal, and zero accepted cases above their
candidate bound. All 22 bundled mutation probes were rejected.

A new 347-case reviewer corpus was constructed independently of the checked-in case
manifest. It covered every `df` from 1 through 200, both sides of the branch,
long-iteration paths, ordinary and extreme tails, the smallest subnormal input,
minimum normal, maximum finite, rounded-one results, and independently searched
projection transitions. Results were:

- accepted: 276;
- projection-margin refusals: 12;
- proof-precondition refusals: 59;
- truth projections: 268 normal, 41 rounded-one, three subnormal, and 35 zero;
- accepted bound violations: zero; and
- largest accepted truth-distance/bound ratio: `374/2978`, approximately
  `0.1255876427`, at the pinned `df = 197` witness.

For `df = 7`, independent bit-space searches located adjacent statistic pairs at
all three projection transitions:

| Transition            | Left statistic bits | Right statistic bits |
| --------------------- | ------------------- | -------------------- |
| rounded-one to normal | `3c94c79940c4752c`  | `3c94c79940c4752d`   |
| normal to subnormal   | `4921be87c567f3a0`  | `4921be87c567f3a1`   |
| subnormal to zero     | `499a5e2c9637b7d4`  | `499a5e2c9637b7d5`   |

The finite corpus is diagnostic only. It is not treated as the analytic proof,
contiguous input coverage, a supported `df` range, or a global bound.

## 8. Mutation, promotion, malformed-input, and authority attacks

In addition to the 22 bundled probes, 12 coherent bundle mutations were applied with
outer manifests rebuilt. They covered a truth projection, proof-model field, witness
bits, witness gamma index, witness bound, projection rule, removal/duplication/order
of the high-error witness, malformed JSON, a missing checkpoint, and an undeclared
evidence field. All 12 were rejected without acceptance.

Sixteen direct checkpoint/readiness/support mutations covered runtime promotion,
supported-domain promotion, supported `df`, a selected global bound, platform
promotion, proof parameters, witness values, bound values, undeclared fields,
missing fields, and array order. All 16 were rejected. Source-copy forgeries with
coherently rebuilt source and manifest hashes, altered ULP observations, and symlinks
were also rejected by the bundled probes.

Malformed JSON and a missing expected file produced validation errors. A missing
bundle directory, a regular file supplied as the bundle root, a directory supplied
where a file was expected, and several direct non-object validator/evaluator inputs
raised uncaught exceptions. Those failures are findings S1 and S2. No hostile input
or mutation was observed to become candidate support, forge evidence, or promote an
authority claim.

Mechanically, the implementation changes no authoritative registry, schema,
conformance expectation, reference verifier, Public Check, interpretation bundle,
normative specification, Release 1 gate, or generated authoritative view. Release 1
regressions passed. The checkpoint remains non-authoritative, unissued,
review-pending, non-runtime, and unselected. Supported `df`, global bound, final table
hash, and platform matrix remain unset. The support predicate remains deferred. The
374-cell observation and 2,978-cell witness bound are consistently pointwise and are
not relabeled as universal guarantees. Public issue #25 remains open and retains its
original review window.

## 9. Fresh-clone reproduction and environment

`corepack pnpm install --frozen-lockfile` succeeded in the detached fresh clone.
The top-level `corepack pnpm check` completed format, Markdown lint, and typecheck,
then encountered the known environment restriction:

```text
Error: listen EPERM ... /tmp/tsx-0/157.pipe
```

No underlying check was waived. Every TypeScript source command was rerun through
`node --import tsx`; all passed:

- repository validation;
- 36 test files / 372 tests;
- generated-file check;
- schema, canonicalization, conformance, verifier-example, and evidence checks;
- Phase 1 regressions;
- Phase 2A and Phase 2A-0.2.1 checks.

A new Python 3.12 virtual environment was populated with only the pinned
`python-flint==0.9.0` requirement from a locally reconstructed copy of the same
installed wheel payload because network package download was unavailable. `pip
freeze` contained only that package. The exact-hash bundle was regenerated, validated,
and probed; it was byte-identical to the first reproduction. The detached checkout
finished clean.

Environment:

- Ubuntu 24.04.3 LTS, Linux 6.18.35, x86_64;
- Node 24.19.0, V8 13.6.233.17, pnpm 11.7.0;
- Python 3.12.13;
- python-flint 0.9.0; and
- FLINT 3.6.0.

This one platform is diagnostic and does not select a supported platform matrix.

## 10. Research-gate assessment

The target adds no externally grounded numerical decision beyond the already
reviewed inverse-beta table/runtime-graph family and a self-contained derivation of
ordinary round-to-nearest error envelopes, positive-series remainders, and ordered
binary64 cell distance. The critical premises were re-derived directly and attacked
with exact rational arithmetic. No new primary-source claim is needed to merge a
repaired version as non-authoritative candidate engineering.

Any later selection of a supported platform predicate, runtime bound, supported
domain, Public Check, or bundle remains research- and governance-gated. This
author-context pass is not the separate independent numerical review required by the
repository process.

## 11. Findings

### BLOCKER

None.

### SHOULD-FIX S1: the new evaluator throws on raw non-object input

- Exact location:
  `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`,
  `evaluatePairedTTruthErrorSupportCandidate`
- Minimal reproducer:

  ```ts
  evaluatePairedTTruthErrorSupportCandidate(null as never);
  evaluatePairedTTruthErrorSupportCandidate(undefined as never);
  ```

- Actual behavior: both calls throw `TypeError` while the delegated table-connected
  graph tries to destructure the input.
- Expected behavior: a structured non-authoritative refusal with both runtime and
  supported-domain claims false, consistent with the review protocol's direct
  invalid-value attack.
- Impact: no valid typed input is affected and no numerical bound is understated,
  but a hostile JavaScript caller can escape the fail-closed result surface and
  crash a consumer.
- Smallest sufficient repair: validate that the input is a non-array object with
  exactly the required numeric fields before delegation; return the existing
  graph-refusal form (or a candidate-only invalid-input classification while reason
  codes remain unfrozen).
- Semantic scope: candidate-tooling hardening only; no normative or numerical
  semantic change.
- Public-review-window impact: none; no restart.

### SHOULD-FIX S2: exported validators do not contain filesystem and shape errors

- Exact locations:
  - `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`,
    `validatePairedTRuntimeSeriesEvidenceBundle`;
  - `tooling/src/spikes/paired-t-numerical-readiness.ts`,
    `validatePairedTNumericalReadinessCandidate`; and
  - `tooling/src/spikes/paired-t-support-domain-candidate.ts`,
    `validatePairedTSupportDomainCandidate`.
- Minimal reproducers:

  ```ts
  validatePairedTRuntimeSeriesEvidenceBundle("/missing", exactCommit);
  validatePairedTNumericalReadinessCandidate({} as never);
  validatePairedTSupportDomainCandidate(null as never);
  ```

  Replacing `cases.json` in an otherwise valid bundle with a directory also reaches
  an uncaught `readFileSync` error.

- Actual behavior: the calls throw filesystem `Error` or `TypeError` instead of
  returning validation errors. Primitive, array, empty-object, and partial-object
  inputs likewise throw in the readiness and support validators. The unsafe
  preflight pattern predates part of this delta, but all three exported validators
  are modified and explicitly in scope for this review protocol.
- Expected behavior: deterministic nonempty error arrays, with no uncaught exception
  in an exported validation path.
- Impact: malformed evidence cannot pass and no promotion succeeds, but hostile or
  damaged input can crash the validation CLI/caller rather than fail through its
  documented error surface. This violates a required protocol check.
- Smallest sufficient repair: add top-level and nested object guards to the JSON
  validators; preflight the bundle root and every expected regular file; contain
  `readdirSync`, `lstatSync`, and `readFileSync` failures and append stable validation
  errors. Preserve symlink refusal.
- Semantic scope: validation/tooling hardening only; no proof, support, authority, or
  public-contract change.
- Public-review-window impact: none; no restart.

### NICE-TO-HAVE

None.

## 12. Overall verdict

**NO-GO** for merging exact implementation commit
`2b9d3f40a1e067d85a8856585f597394d5f98761` under the published adversarial-review
protocol, because S1 and S2 violate its explicit hostile-input/no-uncaught-exception
condition.

After the two small fail-closed boundary repairs, a targeted rerun of direct-invalid,
missing/unreadable-file, symlink, mutation, and fresh-clone checks should be
sufficient for this self-review's findings. The repaired numerical candidate must
still receive a genuinely independent adversarial review before its non-authoritative
merge disposition can be approved.

Even after such a `GO`, no selected runtime bound, supported predicate, supported
`df`, supported platform, Public Check, bundle, paired-t support, R2-D5 completion,
or Release 2 publication would be approved by this review.
