# Phase 1 Numeric Model

**Status: Normative.** This document binds the Phase 1 numeric domain
(`NRS-CANON` namespace, continued).

## Domain

<a id="NRS-CANON-0003"></a>
**NRS-CANON-0003 - Finite binary64 numeric domain** (stability: EXPERIMENTAL, status: active)
Numeric values in the Phase 1 profile MUST be finite JSON numbers
representable within the declared IEEE 754 binary64 domain.

Informative note: concretely -

- every numeric value is a JSON number interpreted as an IEEE 754 binary64
  value;
- NaN, positive infinity, and negative infinity are excluded; the raw tokens
  `NaN` and `Infinity` are not JSON and are parse errors;
- integer-valued fields (such as group sample sizes) lie within the JavaScript
  safe-integer range;
- outcome values, means, variances, statistics, degrees of freedom, and
  p-values are finite; p-values lie in `[0, 1]`; sample variances are at least
  `0`; degrees of freedom are greater than `0`.

## Signed zero

<a id="NRS-CANON-0004"></a>
**NRS-CANON-0004 - Signed zero not preserved** (stability: EXPERIMENTAL, status: active)
The Phase 1 profile MUST NOT assign distinct scientific meaning to negative
zero and positive zero.

Informative note: JCS serializes negative zero as `0`, and the profile
assigns `-0` and `0` the same meaning, which keeps meaning aligned with the
canonical form. Since the Batch 5 input-stage hardening, a `-0` number
token never actually reaches the canonicalizer: it is rejected at the
lexical stage
([record-canonicalization.md#NRS-CANON-0015](record-canonicalization.md#NRS-CANON-0015)),
so the silent `-0`-to-`0` collapse can no longer occur on any accepted
input; this clause remains as the meaning-level statement for the value
domain.

## Informative: relation to JCS

JCS serializes numbers in the shortest ECMAScript round-trip form. Because the
Phase 1 domain is exactly the finite binary64 numbers, every supported value
has one canonical serialization, and two Records whose numbers are equal as
binary64 values canonicalize identically regardless of how the numbers were
written in the source JSON (decimal versus exponent notation, trailing zeros,
and so on).

## Informative: deliberately unsupported numeric states

Exact decimals, arbitrary precision, typed NaN or infinity values,
signed-zero preservation, missing values, undefined statistics, and
calculation-error value objects are not representable in Phase 1 and have no
placeholder fields. Where a computation has no defined value (zero standard
error), the profile fails the precondition check instead of encoding a special
value ([../spec/profiles/independent-two-group-continuous/phase-1-minimal-profile.md#NRS-PROFILE-ITGC-0014](../spec/profiles/independent-two-group-continuous/phase-1-minimal-profile.md#NRS-PROFILE-ITGC-0014)).

## Parsed binary64 authority

<a id="NRS-CANON-0009"></a>
**NRS-CANON-0009 - Parsed binary64 numeric authority** (stability: CORE, status: active)
A conforming verifier MUST base Phase 1 and Phase 2 numerical recomputation on
the finite IEEE 754 binary64 values produced by the declared JSON parsing path.

## Source-decimal fidelity not asserted

<a id="NRS-CANON-0010"></a>
**NRS-CANON-0010 - Source-decimal fidelity not asserted** (stability: CORE, status: active)
Conformance and verification MUST NOT assert that a parsed binary64 value
exactly preserves the source decimal token, the originating measurement-system
value, or an author's intended real number.

## Versioned numerical domain restrictions

<a id="NRS-CANON-0011"></a>
**NRS-CANON-0011 - Versioned numerical domain restrictions** (stability: CORE, status: active)
An empirical numerical condition threshold MUST NOT be used as a normative
rejection rule unless it is explicitly owned by a versioned public check and
covered by declared conformance evidence.
