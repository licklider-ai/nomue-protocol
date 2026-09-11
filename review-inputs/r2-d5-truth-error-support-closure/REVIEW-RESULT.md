# R2-D5 truth-error and support-closure candidate — independent adversarial review result

## 1. Repository, baseline, implementation identity

| Item                  | Value                                                                      |
| --------------------- | -------------------------------------------------------------------------- |
| Repository            | `https://github.com/licklider-ai/nomue-protocol`                           |
| Baseline commit       | `6fad249dd715369de92c7c941a42ddcc34525381`                                 |
| Implementation commit | `2b9d3f40a1e067d85a8856585f597394d5f98761`                                 |
| Implementation parent | `6fad249dd715369de92c7c941a42ddcc34525381` (matches the expected baseline) |
| Implementation tree   | `87bd33055b91cceb2da2552248fe39768b512777` (matches the expected tree)     |
| Commit subject        | `Add R2 D5 truth-error support closure candidate`                          |
| Public RFC            | <https://github.com/licklider-ai/nomue-protocol/issues/25> (state `open`)  |
| Review type           | Independent, adversarial, delta-scoped                                     |
| Verdict               | **GO** (merge as non-authoritative R2-D5 candidate engineering only)       |

The implementation commit was checked out by exact hash into a detached worktree and,
separately, into a fresh clone. `git cat-file -p 2b9d3f40…` reports exactly the expected
parent and tree. No moving branch head was reviewed.

## 2. Exact changed-file assessment

`git diff --name-status 6fad249d 2b9d3f40` returns exactly 20 paths, matching the declared
file set with no extra, missing, renamed, deleted, or mode-changed path. Two paths are added
(`governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json`,
`tooling/src/spikes/paired-t-truth-error-support-candidate.ts`, plus the new test file
`tooling/tests/paired-t-truth-error-support-candidate.test.ts`); the remaining 17 are
modifications. Totals: 1,464 insertions, 25 deletions.

No path outside `governance/drafts/`, `tooling/`, and the single evidence workflow
`.github/workflows/release2-paired-t-runtime-series-evidence.yml` is touched. The reviewed
inverse-beta table file `tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json`
is byte-unchanged by this delta.

## 3. Graph replay and table binding

### Table binding

The reviewer independently recomputed the table content hash:

```text
ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08  runtime-inverse-beta-table.candidate.json
```

This equals `REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH` and the value recorded by the prior
table review. `lookupReviewedInverseBetaCandidateCell` cannot bypass validation: it reads only
`BUNDLED_TABLE`, which is produced by `loadBundledTable()` after
`validatePairedTRuntimeInverseBetaLookupTableCandidate` has enforced the exact SHA-256 byte
hash, the closed key surface, the non-promotion flags, the 200-entry ordering, and per-entry
positivity; it returns `undefined` whenever `BUNDLED_TABLE.errors` is non-empty.

Detachment was verified empirically: the returned object is a fresh `{...entry}`; mutating it
(`value`, `hex`, and an injected property) leaves subsequent lookups and the graph's
`normalizationConstant.inverseBetaBinary64Hex` unchanged, and two calls return distinct
objects. `df` values `0`, `201`, `1.5`, `NaN`, and `-1` all return `undefined`.

Fifteen table cells (`df` 1, 2, 3, 4, 5, 7, 10, 31, 64, 100, 137, 196, 197, 199, 200) were
independently re-derived as the correctly rounded binary64 of `1/B(df/2, 1/2)` from Arb ball
enclosures with precision raised until the rounding was uniquely determined. Zero mismatches.
The `df = 197` cell is `40165e893dc9e240`, which is the value the reviewed graph consumed.

### Replay identity

A reviewer-owned instrumented copy of the module (identical except for `export` keywords and
import paths — verified by diff) exposed the internal `replayWithProof`. Every integer `df`
from 1 through 200 was compared against `evaluatePairedTRuntimeSeriesWithCandidateTable` over
23 statistic magnitudes in both signs: zero; the cells immediately below and above `|t| = 1`;
exactly `1`; ordinary central values `0.25`, `0.5`, `0.75`, `0.9`, `0.999999999`; ordinary
tails `1.5`, `2`, `3`, `10`, `50.4`, `100`, `1e6`; large finite `1e100`, `1e300`,
`Number.MAX_VALUE`; and subnormal / minimum-normal-adjacent `5e-324`, `1e-300`,
`2.2250738585072014e-308` and its predecessor.

Result over **9,000 evaluated `(df, t)` pairs**:

- branch, p-value bits, iteration count, and iteration cap agreed **exactly in every case**;
- `replayIdentityFailures = 0`; no `proof_graph_reproduction_mismatch` was produced;
- 5,926 candidate acceptances and 3,074 `truth_error_proof_precondition_failed` refusals;
- negative zero was refused by both the graph and the proof evaluator at every `df`, and
  invalid `df` (`0`, `1.5`, `201`), `NaN`, and `+Infinity` refused without an uncaught
  exception.

A further **400,000 randomized trials** (reviewer-owned generator; `df` drawn uniformly from
1..200, statistics drawn across 16 binary exponent scales from `2^-1074` to `2^1023`) produced
173,004 acceptances, 177,164 `truth_error_proof_precondition_failed` and 49,832
`projection_margin_not_established` refusals — and **zero** `proof_graph_reproduction_mismatch`,
`truth_error_bound_not_finite`, or `candidate_constant_table_unavailable` results, with no
uncaught exception. Across all reviewer work the evaluator was exercised **410,354 times**
without a single replay divergence.

The reviewer also confirmed operation-by-operation that the replay reproduces the graph's
binary64 association order in all five branches (`exact-zero`, `df2-central-closed-form`,
`df2-tail-closed-form`, `central-complement-positive-series`, `lower-tail-positive-series`),
including the left-associative `((2 * sqrt(y)) * xPower) * inverseBeta` prefactor, the
`integerPower` binary-exponentiation sequence, the odd-`df` `sqrt(df) * (1/t) / sqrt(1 + df/t²)`
rescaling, and both series recurrences. Independently of that inspection, soundness does not
depend on path identity: the proof bounds the replay's _value_ against the mathematical truth,
and the module refuses unless `binary64Hex(replay.pValue)` equals the graph's bits, so a
matching value transfers the bound.

No changed graph output, hidden table replacement, or replay mismatch was observed.

## 4. Independently written roundoff derivation

Let `u = 2^-53` and `gamma(k) = k*u/(1 - k*u)`. A tracked positive `v̂` with index `k` asserts
`v̂ = v·(1 + θ)` with `|θ| ≤ gamma(k)`, `v` the exact mathematical value.

### Per-operation worst directions

- **Multiplication.** `fl(â·b̂) = a·b·(1+θ₁)(1+θ₂)(1+δ)`. The exact range of the composite
  factor is `[(1-γᵢ)(1-γⱼ)(1-u), (1+γᵢ)(1+γⱼ)(1+u)]` — exactly the interval the code forms.
- **Division.** `fl(â/b̂) = (a/b)·((1+θ₁)/(1+θ₂))·(1+δ)`, whose range is
  `[(1-γᵢ)/(1+γⱼ)·(1-u), (1+γᵢ)/(1-γⱼ)·(1+u)]`. The code forms exactly this, and
  `divideRational` returns `undefined` when `1-γⱼ ≤ 0` (i.e. `j ≥ 2^52`), failing closed.
- **Positive addition.** With `a, b > 0`, `â + b̂ = (a+b)(1 + w)` where `w` is the convex
  combination `(a·θ₁ + b·θ₂)/(a+b)`, so `|w| ≤ max(|θ₁|, |θ₂|)`. The code's
  `largerRational(γᵢ, γⱼ)` is therefore correct, and strict positivity of both summands (which
  holds for every tracked addition here) is exactly the hypothesis that makes it correct.
- **Square root.** `sqrt(v(1+θ)) = sqrt(v)·sqrt(1+θ)`, and for `0 ≤ γ < 1`,
  `1-γ ≤ sqrt(1-γ)` and `sqrt(1+γ) ≤ 1+γ`. The code does **not** exploit the contraction: it
  reuses `[1-γ, 1+γ]`, which strictly contains the true image. Conservative, hence sound.
- **Inverse-beta cell.** The correctly rounded table cell satisfies
  `|cell − true| ≤ u·|true|/(1+u) < gamma(1)·|true|`, so the initial index `1` is valid.

### Re-indexing, and the division shortcut attack

The code computes `worst = max(roundedUpper − 1, 1 − roundedLower)` as an exact rational and
returns the smallest `k ≥ start` with `gamma(k) ≥ worst`, so `[1−gamma(k), 1+gamma(k)]`
contains both directions by construction.

The naive shortcut `firstIndex + secondIndex + 1` is **genuinely invalid for division**. Exact
algebra gives, with `n = i+j`,

```text
(1+γᵢ)/(1−γⱼ) − (1+γₙ)  has the sign of  j(j − i)·u²
```

so for `j > i` the quotient exceeds `1 + gamma(i+j)`; the `×(1+u)` step only absorbs the excess
while `j(j−i)·u ≲ 1`. The reviewer reproduced this independently in exact rational arithmetic
and confirmed the implementation's search agrees index-for-index:

| `i`   | `j`   | naive `i+j+1` | naive covers? | index chosen by the implementation |
| ----- | ----- | ------------- | ------------- | ---------------------------------- |
| 0     | 1     | 2             | yes           | 2                                  |
| 1     | 2     | 4             | yes           | 4                                  |
| 0     | 1e5   | 100001        | **no**        | 100002                             |
| 0     | 1e7   | 10000001      | **no**        | 10000002                           |
| 0     | 1e8   | 100000001     | **no**        | 100000003                          |
| 0     | 3e8   | 300000001     | **no**        | 300000011                          |
| 0     | 1e9   | 1000000001    | **no**        | 1000000113                         |
| 78820 | 77730 | 156551        | yes           | 156551                             |

The re-indexing therefore does real work — the first failing divisor index (`1e5`) is inside
the index magnitude this graph actually reaches (`78,820` observed at `df = 200`) — and it
covers the higher-order term that the shortcut drops. For `multiply`, `positive_add`, and
`square_root` the starting index was sufficient in every probed pair, consistent with the
closed-form proofs above (`γᵢ + γⱼ + γᵢγⱼ ≤ γ_{i+j}` and `γₘ + u(1+γₘ) = (m+1)u/(1−mu) < γ_{m+1}`).

### Search-limit attack

The 1,024-step limit fails closed rather than resetting: at `i=0`, `j=2^30` the search needs
129 extra steps and succeeds; at `j=2^31`, 513 steps and succeeds; at `j=2^32` and `2^33` it
exhausts and `composedGammaIndex` returns `undefined`. `rounded()` then pushes
`${label}_roundoff_composition` into `failures`, the index falls back to `0` **only inside a
record that already carries a failure**, and `evaluatePairedTTruthErrorSupportCandidate`
refuses with `truth_error_proof_precondition_failed` before any bound is formed. No error
envelope is silently reset. `gamma(k)` itself returns `undefined` for `k ≥ 2^53` and for
non-safe-integer or negative `k`.

### Correlated and repeated intermediates

The pairwise composition maximises over the _product_ of the two input intervals, which
contains the correlated diagonal, so shared error sources can only make the result
conservative, never optimistic. Concretely: `multiply(factor, factor)` in `integerPower`
models `(1+θ)²` by `[(1−γ)², (1+γ)²]`, which is exactly the true range for a shared `θ`;
`y = squared/denominator` and `x = df/denominator` share `denominator` and are later
multiplied together, which the model treats as independently ranging (a superset); and the
series recurrence carries the accumulated index forward, adding roughly the constant index of
`x`/`y` plus one per rounded operation each iteration (`77,730` after 5,182 iterations — about
15 per step — consistent with 5 rounded operations plus the re-injected `x` index). Nowhere
does the model assume cancellation.

## 5. Normal arithmetic, square roots, stopping rule, and remainder

### Minimum-normal sufficiency, and the deliberate boundary refusal

Claim: if `fl(z)` is a positive binary64 strictly greater than `2^-1022`, then
`|fl(z) − z| ≤ u·|z|`. Proof: let `fl(z) ∈ [2^e, 2^{e+1})`, `e ≥ -1022`. If `z ≥ 2^e` then
`|fl(z) − z| ≤ 2^{e-53} ≤ z·2^{-53}`. If `z < 2^e` (round-up across the binade floor) then
`z ≥ 2^e − 2^{e-54}` and `|fl(z) − z| ≤ 2^{e-54} < 2^{-53}(2^e − 2^{e-54}) ≤ u·z`.

The excluded equality case is real, not defensive padding. For `fl(z) = 2^-1022` exactly, the
predecessor is subnormal, the lower midpoint is `2^-1022 − 2^-1075`, and at
`z = 2^-1022 − 2^-1075` the error is `2^-1075` while `u·z = 2^-1075 − 2^-1128 < 2^-1075` — the
ordinary relative model **fails** by a hair. `rounded()`'s `!(value > MINIMUM_NORMAL)` refuses
exactly that cell, at the cost of one boundary cell. The successor `2^-1022 + 2^-1074` already
satisfies the model. The check is therefore exactly sufficient, and `Number.isFinite` covers
overflow.

Subnormal and extreme inputs were exercised: subnormal `t` underflows at `t·t` and refuses;
`Number.MAX_VALUE` and `1e300` tails refuse; the corpus and 9,000-pair scan include
minimum-normal-adjacent statistics throughout. Untracked `exact()` values are the genuinely
exact quantities only (`|t|`, `df`, `1`, `2`, `df/2`, and the half-integer series constants
`halfDf+0.5+index`, `1.5+index`, `index+0.5`, `halfDf+index+1`, `index+1`, all exactly
representable for `index ≤ 8,064`), so no unchecked rounding hides behind them.

### Square-root rounding cells

`sqrtCellStrictlyContainsInput` converts the root's neighbours to exact rationals, forms the
two midpoints, squares them exactly, and requires strict containment — precisely the condition
for correct rounding. Ties cannot occur: a midpoint has 54 significant bits, so its square
needs about 107, which no binary64 input can equal; the strictness therefore never refuses a
legitimate root. `rootBits ≤ 1` and `rootBits ≥ 0x7fefffffffffffff` are refused so the
neighbour cells always exist.

Testing across 12 inputs (`2`, the exact square `2.25`, `1`, `4`, `0.5`, `3`, `1e-300`,
`5e-324`, `1e-320`, `2.2250738585072014e-308`, `1e308`, `Number.MAX_VALUE`): the correctly
rounded root was accepted in every case and **both** the +1-ULP and −1-ULP perturbations were
rejected in every case, including the subnormal-input, minimum-normal, and maximum-root
attacks. Hostile direct inputs (`NaN`, `±Infinity`, negative, zero on either argument) all
return `false`.

End-to-end, the reviewer simulated a host whose `Math.sqrt` returns a result one ULP high.
Across `df` 2, 3, 4, 5, 197, 199, 200 on both branches, every case that accepted under an
honest host **refused** under the perturbed host with the exact per-label failures
(`central_sqrt_y_rounding_cell`, `central_sqrt_x_rounding_cell`, `tail_sqrt_df_rounding_cell`,
`tail_sqrt_denominator_rounding_cell`, `df2_central_root_rounding_cell`,
`df2_tail_root_rounding_cell`). Zero leaks. A host square root not established by the exact
cell check does refuse.

This establishes runtime verification per executed square root. It supports no claim about any
platform not executed; the checkpoint's `supported_platform_matrix` remains `pending` and
`correctly_rounded_runtime_p_value_for_every_input` remains a prohibited claim.

### Stopping observation

When `fl(s + t) = s` with `s, t > 0`, then `t ≤ ½·ulp(s) ≤ u·s` (with equality attainable only
at a binade floor and under ties-to-even; `s ≥ 1` always here since the positive series starts
at `1`, so no subnormal edge arises). Combining with the tracked envelopes,

```text
T_true ≤ t̂/(1 − gamma(term)) ≤ u·ŝ/(1 − gamma(term)) ≤ S_true · u·(1 + gamma(sum))/(1 − gamma(term))
```

`truncationRelativeBound(m, sum, term)` returns
`m·(2^53 − term) / ((2^53 − sum)·(2^53 − 2·term))`, which is the exact simplification of
`m·u·(1+gamma(sum))/(1−gamma(term))`; the reviewer verified the algebra symbolically and the
returned rationals numerically. It fails closed for `sum ≥ 2^53`, `2·term ≥ 2^53`, negative or
non-integer `m`.

The implementation uses the **pre-add** `sum` (the loop's `sum`, not `nextSum`) for both
`core = multiply(prefactor, sum, …)` and `accumulatedSumGammaIndex`. Term indexing is correct
with no off-by-one: at loop index `i`, `sum = Σ_{k≤i} T_k` and `nextTerm = T_{i+1}` is the
first omitted term.

Attacks: a term that underflows to `0` makes `rounded()` record a failure on the term label,
the loop stops, and the case refuses; a tie-valued next term still satisfies `t ≤ u·s`; the
cap boundary is reached by the _graph_ first, which refuses with
`positive_series_iteration_cap_reached`, so the proof never has to; branch-adjacent statistics
(both cells around `|t| = 1` and exactly `1`) were covered at every `df`.

### Remainder multipliers

Central branch (`df ≠ 2`, `|t| ≤ 1`): `r_k = y·(df/2 + 1/2 + k)/(3/2 + k)` with
`y = t²/(df + t²) ≤ 1/(df+1)`. For `df > 2`, `r_k` decreases in `k` and `r_0 ≤ 1/3`; for
`df = 1`, `r_k` increases to the limit `y ≤ 1/2` without attaining it. Exact-rational
evaluation over every `df` in 1..200 gives a supremum of exactly `1/2` (at `df = 1`,
`|t| = 1`), so the multiplier `2 = 1/(1 − 1/2)` is valid, and tight only in that limit.

Lower-tail branch (`|t| > 1`, hence `t² > 1` exactly since the least binary64 above `1` is
`1 + 2^-52`): `r_k = x·(df/2+k)(k+½)/((df/2+k+1)(k+1)) < x = df/(df + t²) < df/(df+1)`, so
`m = df + 1` is valid. Exact-rational evaluation over every `df` in 1..200 at the worst
statistic found no violation; the tightest ratio `sup r_k ÷ (df/(df+1))` is `0.999511` at
`df = 200`. Valid, and close to the boundary.

The `df = 2` closed forms carry **no** series remainder and were checked separately: the tail
form `s/(√(1+s)(√(1+s)+1))` with `s = 2/t²` is an exact algebraic identity for
`1 − t/√(2+t²)`, so `relative = gamma(p.gammaIndex)` is the correct whole-expression bound;
the central form uses the complement path below. Both appear in the independently certified
corpus.

## 6. Central complement, ULP conversion, projection margin

### Central complement

`centralComplementRelativeBound` forms `absolute = gamma(core) + truncation + u` and treats it
as an **absolute** bound on the p-value. This is sound because the truncated positive series
under-estimates: with `ρ = R/S_n ≥ 0`,

```text
core − C_true = (prefactor_true · S_n)·(θ_c − ρ),   prefactor_true · S_n = C_true/(1+ρ) ≤ C_true ≤ 1
```

so `|core − C_true| ≤ gamma(core) + truncation`, using only that the complement is a
probability in `[0,1]`. The final `1 − core` contributes `|fl(1−core) − (1−core)| ≤ u·|1−core| ≤ u`
(in fact at most `2^-54`, and exactly `0` on the Sterbenz range), which the `+ u` term covers
with room. `p̂ ≤ 0` or `core ≥ 1` cannot slip through: `rationalFromBits` rejects a negative
sign and `lowerTruth.numerator ≤ 0` returns `undefined`.

`pValue − absolute` is then a strict positive lower bound on the truth (checked before use),
and `relative = absolute/(p̂ − absolute) ≥ |p̂ − P|/P` is a valid relative bound. The lower-tail
branch needs no complement step: `p̂/P = (1+θ)/(1+ρ)` gives `|p̂ − P|/P ≤ gamma(core) + truncation`
directly.

Every quantity that affects acceptance — gamma values, the truncation term, the relative bound,
and the final integer ceiling — is exact `bigint` rational arithmetic. Only the two reported
display fields go through `upwardBinary64`, which binary-searches for the least binary64 not
below the exact rational, i.e. rounds **upward**.

### ULP conversion

Claim: if `|p̂ − P|/P ≤ E < 1/2`, then the ordered-cell distance between `p̂` and the correctly
rounded `P` is at most `ceil(2^54·E + 1)`.

Derivation: `P ∈ [p̂/(1+E), p̂/(1−E)]`. For positive finite `a ≤ b`,
`bits(b) − bits(a) ≤ (b−a)/ulp(a)` because cell widths are non-decreasing upward, and
`ulp(z) ≥ z·2^-53` holds for **all** positive finite binary64 including subnormals
(`2^-1074 > z·2^-53` when `z < 2^-1022`). Upward: `cells ≤ 2^53·E/(1−E) < 2^54·E`. Downward:
`cells ≤ 2^53·E`. Correct rounding of `P` can add at most one further cell, giving
`< 2^54·E + 1 ≤ ceil(2^54·E + 1)`.

Empirical confirmation: 52,245 exact-rational trials over probe points placed at binade floors
and ceilings, one cell above and below binade boundaries, the normal/subnormal transition,
subnormal values, the two checkpoint p-values, and values adjacent to `1`, crossed with nine
`E` values from `1/2 − 10^-9` down to `10^-18`, sampling both interval endpoints plus interior
points. **Zero violations.** The tightest observed distance-to-bound ratio was `0.5`, matching
the roughly twofold conservatism the derivation predicts.

The `E < 1/2` precondition is enforced (`relativeBelowHalf`), as are non-negativity and
`bound ≤ Number.MAX_SAFE_INTEGER`; failures return `truth_error_bound_not_finite`.

### Projection margin

`evaluateProjectionMarginCandidate` requires `cellsToNearestClassTransition > bound` strictly,
where the distance is `min(bits − MAX_SUBNORMAL_BITS, ONE_BITS − bits)` for a positive normal
and `1` for a rounded one. If the truth lies within `bound` cells of `p̂`, its bit pattern stays
strictly inside `(MAX_SUBNORMAL_BITS, ONE_BITS)` and its projection class is therefore the
same. Sound.

The exact-zero branch legitimately carries bound `0`: `P(|T| > 0) = 1` exactly, the graph
returns exactly `1.0`, and the distance is `0`; the code hardcodes `0n` for that branch rather
than deriving it. Conversely a **nonzero** rounded-one result cannot pass: any non-exact-zero
branch has `E > 0` (the core index is at least 1 and the central path adds `u`), so
`bound = ceil(2^54·E + 1) ≥ 2 > 1 = margin`, and the case refuses. This was observed live —
14 `projection_margin_not_established` refusals in the reviewer corpus and 1 in the evidence
bundle.

## 7. Independent numerical reproduction and reviewer corpus

### Independent oracle

The reviewer built an oracle that does not reuse the implementation's or the generator's code,
with **two mutually independent rigorous routes**, both in Arb ball arithmetic over the exact
rational statistic:

- **Route A** — the regularized incomplete beta `arb.beta_lower`, with the
  `x > 1/2` complement switch.
- **Route B** — the classical _finite_ closed form for integer `df` in terms of
  `θ = atan(t/√df)` (Abramowitz & Stegun 26.7.3/26.7.4), a different function family entirely.

Each route raises precision until the ball's lower and upper bounds round to the same binary64
(rounding is monotone, so this determines the correct rounding), using the reviewer's own exact
rational round-to-nearest-ties-to-even implementation. A result is accepted only when the two
routes agree on the binary64 **and** their enclosures overlap. No agreement among ordinary
statistics libraries was used anywhere.

### Required checkpoints

| Input                                    | Graph result (reproduced)                              | Independent fact (reproduced)                         | Candidate checkpoint (reproduced)                                             |
| ---------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| `df 197`, statistic `4049333333333333`   | p bits `284f4ce6230625df`, 14 iterations               | truth bits `284f4ce623062755`, distance **374** cells | gamma indices **1290/196/210**, remainder multiplier **198**, bound **2,978** |
| `df 200`, statistic `1.0000000000000002` | p bits `3fd4629ce0bba503`, 5,182 iterations, cap 8,064 | truth bits `3fd4629ce0bba539` enclosed, distance 54   | core gamma index **78,820**, bound **158,044**                                |

Every value matches. The `df = 197` truth was reached at 256 bits by route A and 512 bits by
route B, both agreeing on `284f4ce623062755` (`≈ 1.5887712139867575e-114`).

### Closed 20-case bundle

Regenerated from the fresh clone at the exact implementation commit with
`NOMUE_GENERATOR_COMMIT` pinned and verified against `git rev-parse HEAD`:

- validator: `paired-t runtime-series evidence bundle: valid`;
- **16** candidate acceptances;
- **3** `truth_error_proof_precondition_failed` refusals (`df1-max-finite-tail`,
  `df2-max-finite-tail`, `df5-positive-subnormal`);
- **1** `projection_margin_not_established` refusal (`df10-rounds-to-one`);
- **zero** certified pointwise distances above a candidate bound;
- mutation probe: `paired-t runtime-series evidence mutations rejected: 22`.

The reviewer re-certified all 20 cases with the independent oracle: every
`mathematical_truth.projection.binary64_hex` and every recorded ULP distance matched, with
**zero** mismatches. Observed distances versus derived bounds ranged from `0/0` (exact zero) to
`374/2978`; the largest ratio in the bundle is `374 ÷ 2978 ≈ 0.126`.

### Reviewer-selected corpus

A corpus of **1,354 cases** was generated from a reviewer-owned deterministic generator (a
64-bit LCG seeded independently), not copied from the implementation: for every `df` 1..200, a
random central statistic, exactly `1`, both adjacent cells around `1`, a random ordinary tail,
and a random deep tail; plus, for 14 selected `df`, rounded-one candidates (`1e-300`, `1e-16`),
a subnormal statistic (`5e-324`), a near-one result (`1e-8`), far/very-far/extreme tails
(`1e2`, `1e4`, `1e8`), huge finite values (`1e150`, `1e300`, `Number.MAX_VALUE`), and exact
zero. Every `df` from 1 through 200 appears at least once; both branch neighbourhoods, long
iteration paths, ordinary tails, projection transitions, extreme finite statistics, subnormal
results, and rounded-one results are covered.

Every accepted case was certified with the independent oracle:

| Metric                                      | Value                                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Cases                                       | 1,354                                                                                     |
| Accepted                                    | 1,230                                                                                     |
| Refused                                     | 124 (`truth_error_proof_precondition_failed` 110, `projection_margin_not_established` 14) |
| Certified distances above a candidate bound | **0**                                                                                     |
| Largest observed distance ÷ bound           | `0.1137` (169 cells observed against a 1,486-cell bound, `df 103`, deep tail)             |
| Next largest ratios                         | `0.0867` (`df 100`), `0.0826` (`df 25`), `0.0746` (`df 121`), `0.0686` (`df 169`)         |

The worst ratios all occur on the lower-tail branch at deep tails. This finite scan is
diagnostic only; it is neither the proof nor evidence of contiguous support, and is not
reported as either.

## 8. Mutation, promotion, malformed-input, and authority-boundary results

### Checkpoint-level

Under a realistic threat model (the attacker supplies a JSON **document**, so mutations are
round-tripped through `JSON.stringify`/`JSON.parse` and value-identical mutations are counted
separately), an exhaustive walk of every key at every nesting level — setting each to `true`,
`null`, `"promoted"`, `0`, `[]`, `{}`; deleting it; and adding an undeclared sibling — plus a
hand-written promotion battery gave:

- **454 mutations rejected, 0 passed**, 13 no-ops (mutations that produced identical JSON);
- rejected promotions include `runtime_support_enabled`, `supported_domain_claimed`,
  `truth_error_bound_selected`, `supported_degrees_of_freedom_maximum = 200`,
  `final_supported_degrees_of_freedom_maximum`, `global_constant_truth_error_bound_selected`,
  `input_specific_bound_selected_for_runtime`, `supported_platform_matrix = "closed"`,
  `final_reason_codes_frozen`, `analytic_derivation_review = "complete"`,
  `issuance = "issued"`, `status = "authoritative"`,
  `finite_corpus_maximum_is_a_bound = true`, `finite_pointwise_fact_not_global_bound = false`,
  every witness bit/index/distance/bound rewrite, weakening the projection-margin rule to
  non-strict, widening the projection classes to include `positive_subnormal`, dropping the
  minimum-normal requirement, and removing/reordering/duplicating/emptying `prohibited_claims`;
- hostile shapes (`null`, `undefined`, string, number, array, a cycle, a `bigint`, a function,
  `NaN`, a null-prototype object, a polluted prototype) were all rejected **without an uncaught
  exception**.

An earlier pass that mutated the in-memory object without a JSON round-trip showed 13 apparent
passes; each was verified to be either a value-identical no-op or a named property attached to
a JSON **array**, which `JSON.parse` can never produce and which `canonicalizeJson`'s
`Array.prototype.map` correctly ignores. Neither is reachable from a document.

### Bundle-level

Starting from the valid regenerated bundle, each attack coherently rebuilt every
`source_hashes` entry, `environment_hash`, and `MANIFEST.sha256` in the generator's exact
serialization. A no-mutation control was included and **passes**, confirming the harness does
not reject by construction. All 18 material mutations were rejected:

forging the copied proof source; promoting the copied checkpoint; altering the witness Arb
truth projection; altering the recorded ULP distance; removing, duplicating, reordering, and
renaming the high-error witness; promoting `supported_degrees_of_freedom_max` and
`runtime_support_claimed` in the evidence document; malformed JSON in the checkpoint copy;
missing checkpoint copy; missing proof source copy; symlinked proof source; symlinked
checkpoint; an undeclared extra file; and a witness graph p-value bit flip.

Forging a copied file cannot succeed even with fully coherent hashes, because the validator
independently compares each bundle copy against the repository file it declares.

### Authority boundary

- The **content-addressed authoritative snapshot hash is byte-identical** across the delta:
  `sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c` at both
  `6fad249d` and `2b9d3f40`. No authoritative registry, schema, conformance expectation,
  reference verifier, Public Check, bundle, or normative specification changed; Release 1
  frozen and supported behavior is unchanged.
- No changed path lies under `registries/`, `schemas/`, `conformance/`, `reference/`, `spec/`,
  `authority/`, `bindings/`, `generated/`, or `evidence/release-1/`.
- The checkpoint is `non_authoritative_candidate`, `unissued`,
  `candidate_testing_pending_independent_review`, with `runtime_support_enabled: false`,
  `supported_domain_claimed: false`, `truth_error_bound_selected: false` — and the
  numerical-readiness validator mechanically pins each of these.
- `supported_degrees_of_freedom_maximum`, `final_supported_degrees_of_freedom_maximum`,
  `global_truth_error_bound_ulp`, and `supported_platform_matrix` remain `null`/`pending`; the
  final table hash is unchanged and unselected (`final_table_selected: false`).
- The support-domain candidate adds `truth_error_and_projection_margin_support` with state
  `deferred`, blocked by
  `closure_candidate_independent_review_platform_and_final_selection_pending`.
- The readiness state is `incomplete_pending_independent_review`, as required.
- The 374-cell observation appears only as `certified_high_error_witness_ulp` /
  `graph_to_truth_ulp_distance` alongside `finite_pointwise_fact_not_global_bound: true` and
  `global_truth_error_bound_ulp: null`; it is never relabelled a global maximum or guarantee.
- The 2,978-cell figure appears only as `candidate_input_specific_bound_ulp` /
  `candidate_high_error_witness_bound_ulp`; it is never relabelled universal or selected, and
  `finite_corpus_maximum_is_a_bound: false` is pinned.
- Issue #25 is `open` with the public review window open (opened `2026-08-26T20:52:54Z`,
  earliest decision `2026-09-25T20:52:54Z`). The delta adds candidate evidence and tooling
  inside the already-proposed scope, which that issue explicitly permits during the window and
  explicitly states does not restart the clock. Nothing in the delta closes, extends, or
  restarts the window.
- Documentation consistently states that the derivation "still requires independent review",
  that the corpus counts are "regression expectations … not a supported-domain coverage claim",
  that the change "does not turn the 20 evidence points or `df = 1..200` table cells into
  contiguous input support", and that a successful run "advances candidate engineering only; it
  does not close R2-D5". No paired-t support, R2-D5 completion, or Release 2 publication is
  implied.

No authority leak or premature support claim was found.

## 9. Fresh-clone repository and environment results

From a fresh clone of the public repository checked out at
`2b9d3f40a1e067d85a8856585f597394d5f98761` (verified `HEAD` and tree):

- `corepack pnpm install --frozen-lockfile` — success;
- `corepack pnpm check` — **exit 0** (format, markdown lint, typecheck, validate, tests,
  generated diff, Phase 1 suite);
- fresh Python 3.12 virtual environment created with only the pinned requirement
  (`python-flint==0.9.0`, `--only-binary=:all:`);
- bundle regenerated with the exact implementation hash, validated, and mutation-probed as
  reported in section 7;
- the checkout remained clean (`git status --porcelain` empty) after all steps; all reviewer
  probes were written outside the repository and removed.

The `tsx` command created its IPC socket without incident, so no waiver was needed; the
repository's own scripts already invoke `node --import tsx`, which the reviewer also used for
ad-hoc probes.

| Component        | Version                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| Node.js          | v22.22.2                                                                                          |
| pnpm (corepack)  | 11.7.0                                                                                            |
| Python           | 3.12.3                                                                                            |
| python-flint     | 0.9.0                                                                                             |
| FLINT/Arb        | `libflint.so.24.0.0` bundled in the python-flint manylinux wheel (Arb is integrated into FLINT 3) |
| Operating system | Ubuntu 24.04.4 LTS, Linux 6.18.44                                                                 |
| Architecture     | x86_64                                                                                            |

One additional platform was exercised only as a diagnostic. This review does not and cannot
select the supported platform matrix.

**Environmental note (not a finding).** `pnpm check` fails in a Git _worktree_ checkout because
the private-dependency audit reads the worktree's `.git` pointer file, which contains the
administrative absolute path and trips the `unix-home-absolute-path` pattern. The fresh clone
passes. The same artifact was reported by the prior table-integration review. Separately,
`pnpm snapshot:manifest --check-candidate` fails identically at the **baseline** `6fad249d` and
at the implementation commit; it is pre-existing repository state, is not part of `pnpm check`,
and is not attributable to this delta.

## 10. Research-gate assessment

The delta contains no new externally grounded numerical decision beyond the self-contained
derivation and the already reviewed table/graph family.

- The incomplete-beta series identities that define the graph
  (`I_y(1/2, df/2)` via `₂F₁(1, (1+df)/2; 3/2; y)` and `I_x(df/2, 1/2)` via
  `₂F₁(df/2, 1/2; df/2+1; x)`, DLMF 8.17.7/8.17.8, A&S 26.5.4/26.5.5) live in the **unchanged**
  runtime-series graph and were dispositioned in earlier D5 reviews. The reviewer re-derived
  both to confirm the replay, but they are not introduced here.
- The `gamma(k) = k·u/(1 − k·u)` composition lemma (Higham, _Accuracy and Stability of
  Numerical Algorithms_, 2nd ed., SIAM 2002, Lemma 3.1/3.3) is used **only as the starting
  index of a search**. Correctness does not depend on it: the implementation recomputes the
  worst-direction composition exactly and accepts an index only after an exact rational
  comparison. As section 4 shows, the naive index is in fact insufficient for division, and the
  code's own check catches that. This converts a literature premise into a machine-verified
  one, which is the right posture for a candidate under review.
- The geometric remainder multipliers `2` and `df + 1` are derived from the series term ratios
  within the delta and were verified exactly over the whole evaluation domain.
- The classical finite Student-t closed form (A&S 26.7.3/26.7.4) used by the reviewer's second
  oracle route is a review instrument, not part of the implementation.

The one premise that is external and **not** verified at runtime is IEEE 754-2019 correctly
rounded `+`, `×`, and `÷` on the executing host (IEEE 754-2019 §5.1, §5.4.1); square roots are
verified per call. The checkpoint holds `supported_platform_matrix: "pending"` and prohibits
`correctly_rounded_runtime_p_value_for_every_input`, so that premise is not being promoted
here. No further primary-source review is required for this increment; one will be required
before a platform matrix or a runtime bound is selected.

## 11. Findings

### BLOCKER

None.

### SHOULD-FIX

**S1 — An unreadable bundle file raises an uncaught exception in the validator.**

- File/function: `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`,
  `validatePairedTRuntimeSeriesEvidenceBundle`, the `sourceMappings` loop
  (`const copy = readFileSync(path.join(bundlePath, copyName));`) and the matching
  `source_hashes` comparison.
- Minimal reproducer: in a valid bundle, replace `truth-error-support-candidate.ts` with a
  directory of the same name, then run the validator.
- Actual: `Error: EISDIR: illegal operation on a directory, read` with a stack trace, process
  exit 1.
- Expected: a collected error such as `truth-error-support-candidate.ts: cannot be read`.
- Impact: presentational and robustness only. It never yields a false `valid`; the run still
  fails closed with a non-zero exit. It is **not** reachable from adversarial file _content_ —
  only from an adversarial filesystem layout.
- Smallest sufficient repair: wrap the copy read in `try/catch` and push a
  `${copyName}: cannot be read` error, mirroring how missing files and symlinks are already
  handled.
- Semantic scope: none — non-normative candidate tooling, no authoritative surface.
- Public-review-window impact: none.
- Note on attribution: the same unguarded pattern exists at the baseline for
  `runtime-series-candidate.ts` and `cases.json` and behaves identically; this delta extends
  it by two new paths rather than introducing it. Symlinks, malformed JSON, and missing files
  are all already handled with clean, explicit refusals.

### NICE-TO-HAVE

**N1 — `proof_graph_reproduction_mismatch` also reports bound-formation failures.**

- File/function: `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`,
  `evaluatePairedTTruthErrorSupportCandidate`, the `replay === undefined || …` guard.
- `replayWithProof` returns `undefined` both when the replay genuinely diverges and when the
  bound cannot be formed (`centralComplementRelativeBound` or `truncationRelativeBound`
  returning `undefined`). Both surface as `proof_graph_reproduction_mismatch`.
- Impact: diagnostic only — the case refuses either way, and a reviewer cannot distinguish the
  two causes from the classification alone. The classification did not fire once across 410,354
  evaluations, so the conflation appears currently unreachable in practice.
- Smallest sufficient repair: have `replayWithProof` return a discriminated failure reason and
  map bound-formation failures to `truth_error_bound_not_finite`.
- Semantic scope: none. Public-review-window impact: none.

**N2 — `sqrtRoundingCellChecks` over-counts when a root feeds two downstream operations.**

- File/function: same file, `rounded()`
  (`inputs.reduce((total, entry) => total + entry.sqrtChecks, 0) + sqrtChecks`).
- Minimal reproducer: `evaluatePairedTTruthErrorSupportCandidate({ degreesOfFreedom: 2, testStatistic: 2 })`
  reports `sqrtRoundingCellChecks: 2`, but the `df2-tail-closed-form` graph executes exactly one
  `Math.sqrt`. The single `root` is counted twice because it feeds both
  `addPositive(root, exact(1))` and `multiply(root, rootPlusOne)`. All other branches checked
  (`df` 3, 4, 5, 197, 199, 200, and `df 2` central) report the correct count.
- Impact: cosmetic. The counter plays no part in acceptance; `sqrtRoundingCellsVerified` is
  gated on `proofFailures.length === 0`, which does carry every `*_rounding_cell` failure, as
  the perturbed-host test in section 5 confirms. It is nonetheless an inaccurate number in a
  published proof field.
- Smallest sufficient repair: count distinct verified roots (e.g. accumulate a set of labels)
  rather than summing along every path.
- Semantic scope: none. Public-review-window impact: none.

**N3 — The evaluator throws on `null`/`undefined` input.**

- `evaluatePairedTTruthErrorSupportCandidate(null)` and `(undefined)` raise
  `TypeError: Cannot destructure property 'degreesOfFreedom' of 'input'`, originating in
  `evaluatePairedTRuntimeSeriesWithCandidateTable`
  (`tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts:299`).
- The destructure is **unchanged from the baseline** and behaves identically there, and the
  declared TypeScript signature excludes these values, so reaching it requires a deliberate
  cast. Every other hostile input (`NaN`, `Infinity`, `-0`, non-integer `df`, out-of-range
  `df`, wrong-typed fields, boxed numbers, null-prototype objects) refuses cleanly with
  `runtimeSupportClaimed: false` and `supportedDomainClaimed: false`.
- Smallest sufficient repair: guard with `if (input === null || typeof input !== "object")`
  before destructuring, in the predecessor module.
- Semantic scope: none. Public-review-window impact: none.

## 12. Verdict

**GO.**

Implementation commit `2b9d3f40a1e067d85a8856585f597394d5f98761` may be merged as a
non-authoritative R2-D5 truth-error/support-closure candidate.

This verdict approves **only** that merge. It does not approve a selected input-specific or
global truth-error bound, a supported truth-error or projection-margin predicate, a supported
degrees-of-freedom maximum, a supported platform matrix, final reason codes, a Public Check, a
bundle, paired-t support, R2-D5 completion, or Release 2 publication. The readiness state
remains `incomplete_pending_independent_review`, and the analytic derivation remains subject to
whatever further review the steward requires before any of those decisions is taken.

The three intentionally open decisions the protocol named — the final truth-error predicate,
the supported platform matrix, and the selected bound — are recorded here as open, not as
defects.

## Provenance

- Contributor role: independent reviewer, separate from the implementation author.
- Review scope: delta from `6fad249dd715369de92c7c941a42ddcc34525381` to
  `2b9d3f40a1e067d85a8856585f597394d5f98761` (tree
  `87bd33055b91cceb2da2552248fe39768b512777`), plus the unchanged runtime-series graph,
  projection-margin evaluator, reviewed table candidate, and table-integration checkpoint as
  dependencies.
- Independence boundary: all truth enclosures, the roundoff re-derivation, the remainder and
  ULP-conversion proofs, the statistic corpus, and the mutation batteries were produced by the
  reviewer without reusing implementation or generator code. Neither library agreement nor the
  finite Arb corpus shipped with the implementation was used as an oracle.
- Inspected sources: the 20 changed paths; `paired-t-runtime-series-candidate.ts`;
  `paired-t-truth-boundary-candidate.ts`; `paired-t-numerical-contract-candidate.ts`;
  `runtime-inverse-beta-table.candidate.json`
  (`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`);
  `governance/drafts/release-2-candidate/reviews/`; `AGENTS.md`; and issue #25.
- Authoritative snapshot hash, unchanged across the delta:
  `sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`.
- Date: 2026-08-30.
