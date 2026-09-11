# IEEE 754-2019 clause confirmation for the R4 arithmetic projection

Date: 2026-09-11 UTC. Review base:
`da1c53dfd70f02169014f5d882aa51aec960a019`.

## Disposition

**SOURCE LEG CLOSED, WITH A SIGNED-ZERO QUALIFICATION.** Direct inspection of
IEEE Std 754-2019 closes the clause-level source omission recorded in
`review-inputs/r4-primary-methods-20260911`. The binary64 field map, exact
finite lattice, endpoints, and nearest/ties-to-even rule used by the fixed
arithmetic candidate are consistent with the inspected standard clauses.

The standard has distinct positive-zero and negative-zero encodings. The
candidate's integer lattice maps both to mathematical integer zero, and its
rational projection emits positive zero for a zero numerator. This agrees with
the author's stated mathematical convention that signed zero has no distinction
in this calculation; it is not IEEE signed-zero preservation. Any claim that the
candidate preserves negative zero requires repair.

Refusing every exact magnitude above maximum finite is a disclosed project
admission convention. IEEE roundTiesToEven instead maps some values above maximum
finite back to maximum finite and values at or above its specified overflow
threshold to infinity. The project refusal is conservative and must not be
attributed to IEEE rounding.

This report does not certify a runtime, an adapter, a whole Research Gate or
release, PR 293, the F/beta mathematics, or complete conformance to IEEE 754.

## Independence and inputs

This was a bounded independent primary-source pass by a separate model instance,
requested as `gpt-5.6-sol`, in OpenAI Codex Work Mode. The exact served model
build and a model-binary attestation were unavailable. The source was inspected
before the fixed candidate code. No subagent or human expert review was used.

The code inputs were the arithmetic candidate at
`2864903316b4b4b2b219a56b42c535bfec7935b3` and, only for the interval-projection
consumer, the original tail oracle at
`8d1979a4cf91012d86d57df40e5a847e2f00a358`. The earlier R4 review was read as a
claim inventory, not as a substitute for the standard.

## Source facts and bounded derivations

| Topic                       | Source fact                                                                                                                                                                                                                                               | Independent derivation or project policy                                                                                                                                                                                                                                                                                                       | Finding                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Represented set and lattice | Clause 3.3, PDF page 19 / printed page 18, specifies radix 2, binary64 precision 53, `emax=1023`, `emin=1-emax=-1022`, smallest normal `2^emin`, largest finite `2^emax(2-2^(1-p))`, and every finite value as an integer multiple of `2^emin * 2^(1-p)`. | Substitution gives unit `2^-1074`, minimum normal `2^-1022`, and maximum finite `(2^53-1)2^971`.                                                                                                                                                                                                                                               | **GO**                           |
| Binary64 fields             | Clause 3.4, PDF 20 / printed 19, gives sign `S`, biased exponent `E`, trailing field `T`, normal/subnormal/zero cases. Clause 3.6 Table 3.5, PDF 24 / printed 23, gives binary64 `k=64`, `p=53`, `emax=bias=1023`, `w=11`, `t=52`.                        | For fraction integer `f=T`, multiplying by `U=2^1074` gives `f` for `E=0`, and `(2^52+f)2^(E-1)` for `1<=E<=2046`, with sign applied. This is exactly the candidate's `lattice` formula.                                                                                                                                                       | **GO**                           |
| Extended formats            | Clause 3.7 and Table 3.7, PDF 26 / printed 25, concern recommended extended/extendable arithmetic formats; an extended format associated with binary64 has at least 64 precision bits and `emax>=16383`.                                                  | These are not binary64 interchange parameters and are not used by the fixed candidate.                                                                                                                                                                                                                                                         | **OUT OF DEPENDENCY; INSPECTED** |
| Nearest/ties-to-even        | Clause 4.3.1, PDF 28 / printed 27, requires the nearest representable number and, for equally near bracketing values, the one with an even least-significant digit.                                                                                       | Exact midpoint comparison plus selection by the low bit of the adjacent encoding implements this rule for finite binary64 endpoints. For positive finite binary64, unsigned encodings increase with value, so binary search finds the floor. Reflection preserves distance and significand parity on the negative side.                        | **GO within finite range**       |
| Signed zero                 | Clauses 3.3 and 3.4 establish distinct `+0` and `-0`; clause 6.3, PDF 51 / printed 50, specifies signs of zero for operations.                                                                                                                            | The candidate maps both input zero encodings to integer zero and a rational zero has no sign; `project((0,b))` returns `+0`. This is the stated calculation convention, not preservation of IEEE zero sign. Negative nonzero values that round to zero are reflected to `-0`, but that does not recover a sign already erased from exact zero. | **GO only with qualification**   |
| Underflow neighborhood      | Clause 7.5, PDF 54 / printed 53, says the rounded result delivered for a tiny result may be zero, subnormal, or the smallest normal value.                                                                                                                | The fixed `2^-1074` lattice and exact midpoint comparison cover subnormals continuously. A positive nonzero rational below half the minimum subnormal rounds to `+0`; the reflected negative case rounds to `-0`. Exception flags are outside this candidate.                                                                                  | **GO for value projection only** |
| Above maximum finite        | Clause 4.3.1 supplies the nearest-mode infinity threshold; clause 7.4, PDF 54 / printed 53, specifies overflow results by rounding direction and sends roundTiesToEven overflows to signed infinity.                                                      | Candidate refusal begins immediately above maximum finite, earlier than IEEE's nearest-mode infinity threshold. This prevents a claimed finite point projection but is a project range policy.                                                                                                                                                 | **GO as conservative policy**    |
| Interval projection         | Clause 4.3 defines rounding from an infinitely precise value into a destination format; 4.3.1 fixes nearest/even selection.                                                                                                                               | Nearest/even projection onto an ordered discrete set is nondecreasing: each output owns an interval bounded by adjacent midpoints, with midpoint ownership set by parity. Therefore, if valid bounds `L<=x<=U` project to one encoding, `x` projects to it. Unequal endpoint encodings correctly leave the result unresolved.                  | **GO as derivation**             |

## Bounded executable checks

`independent_checks.py` uses only Python integers, `Fraction`, and bit packing. It
does not import author code. It checks the source-derived field formula at class
boundaries, finite endpoints, signed-zero encodings and their intentional lattice
collapse, midpoint parity at ordinary and subnormal boundaries, local/global
monotonicity, interval projection, and the distinction between the IEEE overflow
threshold and the project's above-maximum refusal boundary. `RESULTS.json` records
the passing run.

Validation was run as follows; both interpreter modes emitted byte-identical
output matching `RESULTS.json`:

```text
python3 independent_checks.py
python3 -O independent_checks.py
```

The script uses explicit `require(...)/raise` checks, so optimization cannot
remove its validation. `git diff --check` passed, as did the repository Prettier
formatter for the Markdown and JSON artifacts. The full repository check suite
was not run; this evidence-only change does not attest to it.

## Scope and omissions

Direct visual inspection covered clauses 3.3, 3.4, 3.6 Table 3.5, 3.7/Table 3.7,
4.3/4.3.1, 6.3, 7.4, and 7.5 on the pages listed above. Text extraction supported
navigation but was not the sole basis. Decimal formats, NaN payload details,
operation-by-operation sign rules, exception-state machinery, alternate exception
handling, conversions, language bindings, hardware behavior, and all other clauses
were not reviewed. The licensed PDF is not included, quoted substantially, or
committed.
