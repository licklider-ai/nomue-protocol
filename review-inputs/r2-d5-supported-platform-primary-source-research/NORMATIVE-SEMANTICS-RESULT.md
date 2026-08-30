# Normative-semantics investigation result

## Identity and scope

- Provenance role: independent normative-semantics investigator
- Repository baseline: `cb4c04ad5898d6e95797d252c5ecd2d839fc42c7`
- Review mode: read-only
- Scope: observable semantics used by the R2-D5 Student-t tail graph and its
  binary64 evidence helpers

This result does not attest to any particular Node or V8 binary.

## Primary-source ledger

| Source                                                                                                                                                             | Material used                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [ECMA-262 publication page](https://ecma-international.org/publications-and-standards/standards/ecma-262/)                                                         | Identifies the normative ECMAScript 2026 HTML edition                  |
| [ECMAScript 2026 Number type](https://tc39.es/ecma262/2026/multipage/ecmascript-data-types-and-values.html#sec-number-type)                                        | Binary64 value set, Number-value rounding, signed zero, and subnormals |
| [ECMAScript 2026 Number operations](https://tc39.es/ecma262/2026/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-multiply)                | `multiply`, `divide`, `add`, and `subtract`                            |
| [ECMAScript 2026 binary-expression evaluation](https://tc39.es/ecma262/2026/multipage/ecmascript-language-expressions.html#sec-applystringornumericbinaryoperator) | Source operators and evaluation routing                                |
| [ECMAScript 2026 Math.sqrt](https://tc39.es/ecma262/2026/multipage/numbers-and-dates.html#sec-math.sqrt)                                                           | Current square-root result                                             |
| [ECMAScript 2025 Math.sqrt](https://tc39.es/ecma262/2025/multipage/numbers-and-dates.html#sec-math.sqrt)                                                           | Earlier edition with the current square-root result                    |
| [ECMAScript 2024 Math.sqrt](https://tc39.es/ecma262/2024/multipage/numbers-and-dates.html#sec-math.sqrt)                                                           | Prior implementation-approximated square-root rule                     |
| [ECMAScript 2026 structured data](https://tc39.es/ecma262/2026/multipage/structured-data.html#sec-rawbytestonumeric)                                               | `DataView` and IEEE binary64 byte conversion                           |
| [IEEE 754-2019](https://standards.ieee.org/ieee/754/6210/)                                                                                                         | Referenced binary floating-point standard                              |

## Established facts

1. ECMAScript `Number` represents the IEEE 754-2019 binary64 value set, except
   that ECMAScript exposes one NaN value rather than distinct NaN payload values.
   Signed zero, normal values, and subnormal values are part of the language value
   set.
2. The ECMAScript Number value for an exact real value is the closest representable
   Number with ties resolved to the even significand. The specification identifies
   this with IEEE `roundTiesToEven`.
3. For the applicable finite cases, `Number::multiply`, `Number::divide`, and
   `Number::add` return the Number value of the exact real operation.
   `Number::subtract` is defined through addition and unary negation. Source
   `*`, `/`, `+`, and `-` expressions route through these separate Number
   operations in source evaluation order.
4. Observable fused contraction or observable extended-precision retention that
   changes any separately specified Number result would not conform to those
   semantics. The standard does not prohibit an implementation from using such
   hardware internally when the observable results remain identical.
5. ECMAScript 2024 described `Math.sqrt` as implementation-approximated. The 2025
   and 2026 editions instead return the Number value of the exact square root.
   Under those current editions, positive finite `Math.sqrt` is therefore correctly
   rounded to binary64.
6. `DataView` float64 conversion uses IEEE 754 binary64 external encoding. Explicit
   byte order makes finite-value bit extraction independent of host endianness. NaN
   payload encoding remains outside the stable identity surface.

## Non-guarantees

- A language standard defines conforming observable behavior; it does not attest
  that a particular executable, JIT tier, hardware instance, or process state is
  conforming.
- The language includes subnormal results. The candidate's requirement that tracked
  positive intermediates be strictly above the minimum normal value is a proof-side
  support predicate, not an ECMAScript guarantee.
- Correctly rounded `Math.sqrt` in current ECMAScript does not make the candidate's
  runtime rounding-cell check redundant as a fail-closed implementation check.
- The standard does not stabilize NaN payloads. The candidate finite path must not
  rely on a NaN bit pattern.

## Implications

- The proof premise should be worded as observable ECMAScript binary64 semantics,
  not as a hardware ban on FMA or extended registers.
- A current conforming ECMAScript implementation supplies the intended semantics
  for the tail graph's basic arithmetic and square root. Runtime identity and
  conformance still require a separate execution predicate.
- A broad package declaration such as `node >=20` is not a numerical platform
  predicate.

## Confidence

High for the normative conclusions. This pass intentionally makes no conclusion
about the conformance of a deployed Node/V8 build.
