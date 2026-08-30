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

## Deliberate incompleteness

The inverse-beta value is supplied per case from an Arb-certified binary64 cell.
No runtime table or final table hash is selected. The corpus ends at the existing
`df = 200` evidence target, but it does not claim contiguous df coverage and
`supported_degrees_of_freedom_max` remains null.
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
```

The generator refuses to overwrite an output directory and has no non-rigorous
fallback when the pinned Arb/FLINT dependency is missing.

## Review boundary

Independent review must attack the two positive expansions, branch predicate,
df=2 algebra, exact inverse-beta projection, Python/TypeScript graph identity,
stopping index, remainder enclosure, extreme-tail rescaling, projection classes,
provenance bindings, and authority boundary. A successful run advances candidate
engineering only; it does not close R2-D5.
