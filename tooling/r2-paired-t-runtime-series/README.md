# Release 2 Paired-t Runtime-Series Evidence

**Status: non-authoritative candidate evidence tooling.** This directory evaluates
an executable Student-t series spike. It does not select a supported runtime
procedure, a supported degrees-of-freedom maximum, a runtime constant table, a
comparison tolerance, a Public Check, or an interpretation bundle.

## Candidate formulas

For integer degrees of freedom `df`, let `a = df / 2` and
`x = df / (df + t^2)`. The two-sided tail is
`I_x(a, 1/2)`. When `|t| > 1`, the spike evaluates the positive expansion

```text
x^a / (a B(a, 1/2))
  * sum((a)_n (1/2)_n / ((a + 1)_n n!) * x^n, n >= 0).
```

The ratio of consecutive terms is strictly below `x`, so the mathematical
remainder after the last accumulated term is bounded using the next term and
`1 / (1 - x)`.

When `|t| <= 1`, the spike evaluates the central probability first. With
`y = t^2 / (df + t^2)`, it uses

```text
2 sqrt(y) x^a / B(a, 1/2)
  * sum((a + 1/2)_n / (3/2)_n * y^n, n >= 0),
```

then subtracts that positive quantity from one. The future term ratio is bounded
by `max(y, y * (a + 1/2) / (3/2))` on the candidate branch. The df=1 route is
therefore a positive series with no host `atan`. The df=2 route uses its separate
cancellation-resistant algebraic closed form.

The TypeScript graph stops when the next positive term no longer changes the
binary64 sum and refuses if it reaches the evaluation cap `40 * df + 64`. That is
a graph rule, not a mathematical-error proof. The Arb evidence separately encloses
the mathematical positive-series truncation interval and the exact-input
regularized-incomplete-beta result. The recorded ULP distance is an observation,
not a tolerance.

## Projection-transition evidence

`generate_truth_boundary_evidence.py` performs a separate monotone search over
non-negative finite binary64 statistics. For the selected df seed, it locates the
two adjacent input cells on each available transition from rounded one to positive
normal, positive normal to positive subnormal, and positive subnormal to zero. Arb
certifies the correctly rounded mathematical probability on both sides, while the
TypeScript graph is reproduced independently and its exact pointwise ULP distance
is recorded.

This establishes boundary witnesses, not a global error bound. The companion
candidate records only the future margin form: after a non-negative integer truth-
error bound `B` is separately proved and selected, a supported projection class is
stable only when its graph cell is more than `B` cells from the nearest projection-
class transition, including the supported normal-to-rounded-one transition. `B`
remains null and the predicate is not connected to runtime support.

## Contiguous inverse-beta table evidence

`generate_inverse_beta_table_evidence.py` evaluates all integer degrees of freedom
from `1` through `200` for the runtime-series normalization constant
`1 / B(df / 2, 1 / 2)`. Arb supplies the primary gamma-ratio enclosure. A separate
exact-rational route uses `C(df + 2) = C(df) * (df + 1) / df`; the odd sequence is
anchored by a rigorously bounded Machin series for `1 / pi`, and the even sequence is
anchored by the exact value `1 / 2`.

The generated table is contiguous evidence, not contiguous Protocol support. Its
evidence-local hash and all 200 cells passed independent adversarial review. The
later R2-D5 table-selection decision remains open.

`runtime-inverse-beta-table.candidate.json` is the exact byte-for-byte reviewed
table. `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts` verifies
its content hash and closed non-runtime metadata, then looks up the exact integer-df
cell before calling the existing series graph. This is an evaluation connection,
not final table selection. The original runtime-series evidence path continues to
receive constants per case so its reviewed reproduction contract remains unchanged.

## Deliberate incompleteness

The executable runtime-series evidence cases still receive inverse-beta values per
case. The separate integration wrapper uses the reviewed table, but no final runtime
table or final table hash is selected. The runtime-series and boundary corpora end
at the existing `df = 200` evidence target without claiming contiguous coverage;
only the separate inverse-beta table evidence covers every integer df.
`supported_degrees_of_freedom_max` remains null throughout.
Normal, rounded-one, subnormal, and zero projections are all observed; no projection
class is activated as runtime support by this tooling.

## Local run

```bash
python3 -m venv /tmp/nomue-r2-paired-t-runtime-series
/tmp/nomue-r2-paired-t-runtime-series/bin/python -m pip install \
  -r tooling/r2-paired-t-runtime-series/requirements.txt
NOMUE_GENERATOR_COMMIT=<full-40-hex-checkout-commit> \
  /tmp/nomue-r2-paired-t-runtime-series/bin/python \
  tooling/r2-paired-t-runtime-series/generate_evidence.py \
  --cases tooling/r2-paired-t-runtime-series/cases.json \
  --output /tmp/nomue-r2-paired-t-runtime-series-output
pnpm evidence:r2-paired-t-runtime-series:validate \
  /tmp/nomue-r2-paired-t-runtime-series-output \
  <full-40-hex-checkout-commit>

NOMUE_GENERATOR_COMMIT=<full-40-hex-checkout-commit> \
  /tmp/nomue-r2-paired-t-runtime-series/bin/python \
  tooling/r2-paired-t-runtime-series/generate_truth_boundary_evidence.py \
  --cases tooling/r2-paired-t-runtime-series/truth-boundary-cases.json \
  --output /tmp/nomue-r2-paired-t-truth-boundary
pnpm evidence:r2-paired-t-truth-boundary:validate \
  /tmp/nomue-r2-paired-t-truth-boundary \
  <full-40-hex-checkout-commit>

NOMUE_GENERATOR_COMMIT=<full-40-hex-checkout-commit> \
  /tmp/nomue-r2-paired-t-runtime-series/bin/python \
  tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py \
  --output /tmp/nomue-r2-paired-t-inverse-beta-table
pnpm evidence:r2-paired-t-runtime-inverse-beta-table:validate \
  /tmp/nomue-r2-paired-t-inverse-beta-table \
  <full-40-hex-checkout-commit>
```

The generator refuses to overwrite an output directory and has no non-rigorous
fallback when the pinned Arb/FLINT dependency is missing.

## Review boundary

Independent review must attack the two positive expansions, branch predicate,
df=2 algebra, exact inverse-beta projection, Python/TypeScript graph identity,
stopping index, remainder enclosure, extreme-tail rescaling, projection classes,
provenance bindings, and authority boundary. A successful run advances candidate
engineering only; it does not close R2-D5.
