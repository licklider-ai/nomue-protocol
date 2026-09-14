# RG2: positive-tail eligibility and exact-sign derivation

Status: new author proof for independent Research Gate review. No public
eligibility rule or numerical method is adopted. [RG1](RG1-BOUNDEDNESS.md)
bounds the constructive integer route; [RG4](RG4-MACHINE-EVIDENCE.md) provides
falsification evidence, which is not a substitute for this proof.

## 1. Basis reused and new claims

The fixed primary-methods receipt supports the finite integral/positive-sum
identity for `F(1,4(n-1))`; the IEEE receipt supports binary64 spacing,
roundTiesToEven and monotonic projection. Exact receipt scope and source hashes
are inherited through [INPUTS.json](INPUTS.json) and the
[previous reuse inventory](../t04-ec1-ec2-evidence-20260914/REPORT.md).
The squared-CDF comparator, complete cost connection and eligibility selection
below are NEW author derivations. No previous receipt reviews them.
RESEARCH GATE REQUIRED before promotion; no new external method is imported
or represented as an independently inspected normative source.

## 2. Domain, integral and strictly positive tail

Let n be an integer at least two, `a=2(n-1)`, `nu=2a=4(n-1)`, and exact
nonnegative rational `q=F` be finite. Put:

```text
z = q/(2a+q), 0 <= z < 1
r = sqrt(z), 0 <= r < 1
h = integral_0^1 (1-u^2)^(a-1) du
p = integral_r^1 (1-u^2)^(a-1) du / h
P(z) = sum_j=0..a-1 [(-1)^j binom(a-1,j) z^j/(2j+1)]
H(r) = r*P(r^2)
h = P(1) = 2^(2a-1)*a!*(a-1)!/(2a)!
```

Expanding the binomial and integrating each monomial gives H. The factorial
normalization also follows from `h_1=1` and
`h_a=(2a-2)/(2a-1)*h_(a-1)` by integration by parts. The integrand is strictly
positive on the interior of `[r,1]`, which has positive length, so `p>0`.
Also `p<=1`, with equality exactly when q=0. There is no finite-F exact-zero
tail in this domain. More generally positive finite degrees of freedom have
a positive F density on positive finite arguments; this packet's finite
polynomial and its cost proof use the EVEN INTEGER denominator df above,
not arbitrary real df or a new method-family support claim.

To connect the positive-sum implementation, substitute `u=r+(1-r)t` in the
tail integral. With `d=1-r`, `s=1+r`, expand
`(s+d*t)^(a-1)` and use
`integral_0^1 t^j(1-t)^(a-1) dt = j!*(a-1)!/(a+j)!`.
This yields the positive monomials
`binom(a-1,j)*j!*(a-1)!/(a+j)! * d^(a+j)*s^(a-1-j)`.
The integral identity can itself be obtained by repeated integration by parts.
Thus the positive finite sum and `1-r*P(z)/h` have the same mathematical
meaning; no implementation equality is used to establish it.

## 3. Positivity before squaring

For `0<=z<1`,
`P(z)=integral_0^1(1-z*v^2)^(a-1)dv>0`, and h>0.
Consequently `r*P(z)/h=1-p` is nonnegative, not an unknown-sign square root.
It follows that:

```text
T = z*(P(z)/h)^2 = (1-p)^2, 0 <= T < 1
```

For any rational `v in [0,1]`, both `1-v` and `1-p` are nonnegative.
Equivalently, the difference of squares factors as
`(1-v)^2-(1-p)^2=(p-v)*(2-p-v)`.
The second factor is positive unless p=v=1, in which case both sides of the
comparison are exactly zero. Therefore:

```text
sign(p-v) = sign((1-v)^2 - T)
```

This equivalence is not asserted for arbitrary out-of-range v or a signed
CDF. The research comparator rejects such v. It never takes an approximate
square root of T or subtracts nearly equal floating-point numbers.

## 4. Exact integer decision and termination

The common-denominator construction in RG1 forms positive integer H,N and
nonnegative A with positive B0. With integer pair `(TN,TD)` for T and
`v=c/d`, `d>0`, the signed test is:

```text
sign((d-c)^2*TD - d^2*TN)
```

All comparisons are exact. No reduction of TN/TD is necessary. RG1 bounds
coefficient growth, powers, the Horner numerator and cross-products. Every
loop has an input-derived finite length; each integer operation terminates.
Ordered probability encodings from zero through one form a finite ordered
set. At most 63 bisection comparisons find the largest encoded value at most
p; an equality test and one midpoint/parity test give RN-even. One additional
zero-eligibility test makes at most 66 calls. The search has no tolerance,
iteration-to-convergence test or schedule-dependent stopping criterion.

At q=0, A=0, T=0 and p=1. At v=0, the sign is positive for all finite q.
At v=1, the sign is zero for q=0 and negative for q>0. All subnormal,
normal/subnormal and ordinary midpoint boundaries are rational and covered.
Exactly representable nonendpoint tails are handled by equality (for example
n=2, q=4/3 gives p=5/16), without searching a nonexistent successor of one.

The candidate refuses work outside its versioned count/width/cost domain,
exact SSE zero, unrepresentable mandatory arithmetic outputs, or positive-p
underflow. Invalid shape is still handled by its upstream gate. A violated
positivity invariant, execution failure or missing dependency is an error or
gated result, not indeterminate or a fabricated probability. This packet
selects no new public reason code and proves no host execution guarantee.

## 5. Binary64 zero, subnormal and one boundaries

The smallest positive subnormal is `eta=2^-1074`. Its midpoint with zero is
`eta/2=2^-1075`. Zero has the even significand, so for exact positive p:

```text
0 < p <= 2^-1075       -> RN-even(p)=0, including the exact tie
p > 2^-1075           -> positive binary64 projection
```

This is a projection fact. T03 D03 additionally prohibits comparison pass
with declared p=0 when the positive exact probability rounds to zero. Such a
case is representation/computability refusal, not exact p=0, not mismatch and
not indeterminate. Experiments may retain the zero encoding as diagnostics.
Positive subnormals remain candidates under R4's own projection rules; the
R2 normal-only restriction is not copied.

At the normal/subnormal transition, the boundary between code `2^52-1`
and `2^52` is `2^-1022-2^-1075`. The tie selects `2^52`, the even code.
Near one, the boundary between `1-2^-53` and 1 is `1-2^-54`; its tie selects
one. A positive tiny q can therefore have p<1 but projected p=1. The exact
q=0 case has p=1 itself. This distinction is preserved in evidence.
Negative effect/mean projections can produce mathematical zero but introduce
no received public -0 token; this does not modify canonicalization.

## 6. Eligibility alternatives

### Z-A: finite staged enclosure only

For closed sound `[L,H]`, `L>eta/2` proves eligibility and `H<=eta/2` proves
underflow. Otherwise neither fact is established. A raw code range `[0,k]`
cannot simply drop zero. In particular, equal lower endpoint `L=eta/2`
does not prove strict eligibility without additional endpoint information.

A fixed procedure could make final inability to prove eligibility a
versioned computability refusal (a smaller admitted domain). Calling that
upstream uncertainty final D07 indeterminate instead would require an
architecture change: D07 comparison presupposes eligibility. That variant
is not recommended under fixed T03/T04. For already eligible quantities,
ordinary finite-stage candidate ambiguity can still use D07.

Z-A is finite, sound if these gates are respected, and reproducible with a
fixed schedule and formulas. It excludes some actually representable tails;
the excluded set depends on the selected stages. Its budget includes all
stages and both endpoint projections. Research Gate would have to review that
computability predicate and its domain impact, not merely interval soundness.

### Z-B: exact-sign eligibility terminal

If enclosure does not settle the gate, compare p exactly with eta/2.
A nonpositive sign certifies positive-p underflow, including ties; a positive
sign certifies eligible projection. This single boundary test uses the same
bounded polynomial construction as a full exact projection. If only the gate
is selected, retain the prescribed staged comparison result thereafter;
additional author knowledge is not permission to upgrade that version's
indeterminate result. The full terminal can additionally distinguish
subnormal/normal cells with further exact boundary tests.

Correctness follows from sections 2-5; termination and work from RG1. Work
admission reserves the worst-case polynomial cost before evaluating it.
This removes enclosure-induced eligibility uncertainty while preserving
mathematical underflow refusals and T03 D03/D07. Membership depends only on
inputs and the versioned budget, not the host or an optional producer carrier.
Independent proof-to-code, cost and boundary review is required before use.

### Z-C: sufficient early gates plus the same exact fallback

Special-case q=0; accept/reject if enclosure or a proved analytic inequality
already settles eta/2; otherwise use Z-B. This can save work but is not a
new public eligible set if decision equivalence and worst-case budget are
preserved. No additional analytic inequality is proposed here. It is an
implementation optimization candidate, not an unexplained substitute for
proof or a reason to introduce a third policy choice.

AUTHOR RECOMMENDATION — PENDING INDEPENDENT RESEARCH GATE:
Z-B's exact eligibility predicate, with optional equivalent early gates.
The reason is a precise input-defined domain and correct tie handling, not
simply minimizing indeterminate outcomes.
