# RG4: machine evidence and reproduction

Status: finite author-executed falsification evidence, not independent research
clearance. Code and input/result hashes are fixed by [MANIFEST.json](MANIFEST.json)
and the containing commit. All source material is from this public repository.

## 1. Distinct mathematical and implementation paths

[check_evidence.py](check_evidence.py) introduces an integer homogeneous-Horner
implementation, with odd-product integer coefficients, no Fraction polynomial
arithmetic, no root approximation and no gcd of the large T pair. It is
cross-checked through:

- All polynomial coefficients of the expanded positive-tail integral identity
  for every integer a=2..10. This covers the entire finite coefficient vectors,
  not just values at selected points. It is not a proof for all a.
- 385 rational-root cases: all n=2..6, denominators 2..12 and numerators
  0..denominator-1 (duplicates intentionally retained). Exact p is obtained
  by the positive substituted-tail integral, not the squared-CDF formula.
- Separately coded exponent/quotient RN-even projection in the prior author
  checker, and inverse lower/upper rounding-cell inequalities with tie parity.
- Prior Fraction-Horner squared-CDF as an additional comparison route. This
  shares the new formula and is not treated as the only or independent truth.
- Historical positive finite-sum root enclosures at guarded stage inputs.
  Exact-sign truth is tested for containment; on rational-root fixtures the
  interval is independently tested against known rational p.
- False-singleton rejection and exact endpoint/tie controls.

All routes share Python integer arithmetic, the host and the author context.
No separate investigator, external service, model review or hardware oracle is
claimed. Exact Fraction enclosures use no floating-point high-precision library;
root intervals and polynomial integration give exact rational bounds instead.

## 2. Saved corpus

[RESULTS.jsonl](RESULTS.jsonl) is one canonical JSON line containing:

- Nine full coefficient-identity checks (a=2..10).
- 385 exhaustive-within-the-stated-grid rational-root cases.
- 30 exact-F probes at n=2,3,5,17,65,70: F=0, the smallest positive binary64,
  4/3, 2^540 and MAX_FINITE. Historical guard refusal is recorded rather than
  bypassed; the new research route has no inherited n65 admission claim.
- Eight two-sided rational-root witnesses around four p boundaries: an
  ordinary midpoint near 1/2, the normal/subnormal midpoint, zero/subnormal
  midpoint and the midpoint adjacent to one. Root grids use 640 or 1200 bits.
- Four finite rational-F tails with exact ordinary midpoint probabilities,
  constructed with dyadic r of denominator 2^18. Both lower-code parities
  exercise the new terminal equality/tie branch directly. These are synthetic
  mathematical tail fixtures, not established raw Record realizations.
- Eight additional synthetic midpoint/tie controls including even/odd subnormal codes,
  the normal boundary, ordinary codes and one. These synthetic comparator
  controls do not claim the midpoint is a realized finite-F tail.
- Seven raw binary64 observation fixtures, with hexadecimal observations,
  exact SSE, intermediate bit observations and exact F widths.
- Four 22-slot aggregation controls plus invocation-failure suppression.
- Fifty symbolic cost/guard rows, with five illustrative budget magnitudes.

The result reports 35,227 executed checks. Validation remains active under
normal and optimized Python because the new and reused checking functions
raise explicitly; no correctness assertion depends on Python's assert keyword.
The deterministic payload excludes host/version/optimization metadata;
commands print the process's actual `sys.flags.optimize` separately.

## 3. Adversarial observations and limits

For all eight boundary witnesses, the historical 128/256/512 enclosure remains
ambiguous about the adjacent encodings. At the zero boundary its range is
`[0,1]`; this is unresolved eligibility, not an eligible D07 comparison. The
exact-sign route selects the correct side of eta/2. At b1024 all eight selected
witnesses resolve; this does not prove that 1024 is universally sufficient.
Exact ordinary tail ties exercise the terminal directly; other boundary ties
are checked with explicit mathematical midpoint controls;
no unproved raw-Record tie realization is asserted.

F=0 gives exact p=1. Tiny positive F can also project to one while exact p<1.
Very large finite F can have a positive tail projected to zero. These exact-F
probes and the boundary witnesses are labeled synthetic mathematical fixtures;
their raw binary64 Record realization is not established.

Raw observations exercise cancellation at one, a common offset of 2^500,
opposite MAX_FINITE values, constant maxima, real positive-tail underflow,
positive SSE projected to zero and negative means projected to unsigned public
zero. The underflow fixture realizes `F_A=2^541`, whose width is 542 bits,
with positive representable SSE. The common-offset and maximal fixtures can
have all F widths equal to one despite large exact intermediates. Some raw
fixtures fail upstream SSE/representation gates; their separately computed
tail diagnostics do not constitute a public comparison on a refused Record.
They are observation arrays, not schema-conformant complete Records.

Mixed pass/fail/unresolved controls exercise fail priority and gated absence
in a fixed 22-slot skeleton. They do not implement or close G5, EC3 or a full
public report. No empirical population coverage, refusal rate, runtime limit
or full-domain implementation success is inferred from this corpus.

## 4. Reproduction

Run from the repository root, at the containing research commit:

```text
python -B governance/drafts/release-4-preparation/t04-g1-g3-research-gate-20260914/check_evidence.py --check
python -O -B governance/drafts/release-4-preparation/t04-g1-g3-research-gate-20260914/check_evidence.py --check
python -B governance/drafts/release-4-preparation/t04-g1-g3-research-gate-20260914/verify_artifacts.py
```

`--check` recomputes and requires exact saved-byte equality. `--write` is only
for explicitly creating new evidence; reviewers use --check. `-B` avoids
writing pycache into historical input directories. The artifact verifier
checks source bytes, their historical Git blobs and all saved artifact hashes.

Windows CPython 3.12.10 is the author research execution environment; detailed
version and executable hash are in MANIFEST. This is not the Linux CPython
worker support profile, and no EC3 runtime execution was performed.
Formatting, Markdown lint, repository validation and whitespace checks are
recorded against the final containing commit in the handoff. No old result
is renamed as execution of this new method.
