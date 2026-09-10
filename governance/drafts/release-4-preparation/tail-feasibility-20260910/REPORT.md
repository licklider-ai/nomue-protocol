# Release 4 fixed-input F-tail feasibility

Date: 2026-09-10. Lane 2, research author. Status: exploratory, non-authoritative,
not adopted. Bounded disposition: **NARROW — reviewable oracle candidates prepared**.
Release 4 numerical support remains **NOT_ESTABLISHED**. This is new research,
not an independent review of its own findings or a complete numerical programme.

## 1. Fixed inputs and authority boundary

- Base and sole intended parent: `dedd26a3e0655001b67e40ccfb741e43ecb07beb`.
- Base tree: `31cade5ea601c896a1841296a3d3aca14bae479d`.
- Proposal/opening input: `022c8699befbcba375e3aa6e07c1a8dd8eace483`,
  [draft PR 249](https://github.com/licklider-ai/nomue-protocol/pull/249).
- Discussion: [issue 261](https://github.com/licklider-ai/nomue-protocol/issues/261).
- Historical numerical input: `5962cc2def5b1aca7e30d219f12a9a6486ca7b11`,
  result blob `200296de5745a3bc7087de4d924e1759f4c0f84e` (PR 190).
- All consulted repository file identities, SHA-256 digests, commit trees and
  parents are recorded in [inputs.json](inputs.json).

Root AGENTS and the ordered Charter, Authority, authority manifest, requirement
registry, ID policy and RFC were consulted before authoring. No governance-local
AGENTS exists. The current task narrows the older numerical commission: only tails
on fixed F inputs, only this new directory, and no intervals, inverse operations,
multiplicity, other lanes or edits to the old result. It takes precedence over the
older commission's broader output path and corpus. The numerical workplan and
commission were inspected at both base and proposal identities.

The connector's main lookup and a separate `git ls-remote` both returned the base.
No newer main input was substituted. The proposal is a separate unmerged input;
its opening record supersedes historical NOT_READY navigation operationally.
The accepted normal-model evidence split is reused within its scope, without
reopening staged historical sources or treating their absence as a tail blocker.
The opening record does not establish numerical support.

PR 191's review at `2e3698ba32c0dae6dcd07ab8c71272d990fbaf49` confirms the
PR 190 degree guard, with N-B1 closed on content. It explicitly leaves programme
INPUT_INCOMPLETE, source-access limitations and model-level independence pending.
PR 184's Section 5 source limits were inspected at
`1d493622af970145925f35c8d2cd95f6cbf03cc7`. Neither review certifies the present
algorithm, endpoints or complete domain. The earlier polynomial idea is credited
to PR 190; this report adds bounded guards, another finite expression, explicit
remainder/projection evidence and a larger tail-only corpus. No novelty claim.

Process: OpenAI Codex in this authoring session, with prior conversation summaries
visible. No separate agent or independent investigator participated. No human
review of these new results is claimed. The precise served model build was not
exposed. Repository, public upstream text, local exact arithmetic and the stated
standard-library environment were used; no other lane's unreviewed outputs or
private product repository was used.

## 2. Mathematical target and retained degrees of freedom

The proposal defines equal cell count n, four complete cells, three contrasts
A/B/AB, and exact positive residual SSE. Each contrast has numerator df one;
residual df is nu = 4(n-1). Thus n is an integer at least 2, nu is a positive
multiple of four, and a = nu/2 = 2(n-1) is a positive even integer. There is no
reason in the retained scope to admit noninteger df or a multidimensional numerator.
The proposal's representational count ceiling is 2251799813685247, yielding
nu at most 9007199254740984. This is not a feasible linear-time computation ceiling.

For a supplied exact real f >= 0 and finite, this lane's target is

```text
Q_nu(f) = integral_f^infinity g_nu(v) dv
g_nu(v) = v^(-1/2) (1+v/nu)^(-(nu+1)/2) / (sqrt(nu) B(1/2,nu/2))
x = nu/(nu+f), a=nu/2
Q_nu(f) = I_x(a,1/2)
```

The beta substitution follows by setting t=nu/(nu+v) in this density integral.
For f=0, Q=1 exactly. For every finite f>0, 0<Q<1. Infinity is a limiting
argument, not an accepted F input; negative, NaN and infinite inputs are rejected.
Probe APIs additionally require a Python float, excluding signed negative zero,
and a strict integer count in 2..65. This is an experimental API/budget guard,
not a new Protocol admission rule. The negative-zero handling is consistent with
the proposal's existing strict-input boundary, not a new statistical distinction.

The accepted idealized model establishes central F calibration for each null
separately, with nuisance effects retained. This report evaluates a function of
given f; it does not test normality, independence, equal variance, joint coverage,
post-quantization calibration or calibration conditional on admission. The three
tails share the family but generally have different inputs and a shared SSE.
No independence of the resulting three probabilities is inferred.

## 3. Source inspection and remaining access limits

The ledger below records direct public-page inspection through web retrieval,
not reliance on model memory or search snippets. Access date: 2026-09-10.
Immutable web captures were not obtained. The direct-download batch produced
[source-access.json](source-access.json): DLMF/NIST/ACM returned 403, Boost returned
a URL error, and MPFR returned 558879 bytes with the recorded SHA-256. The process
completion call separately reported cancellation of network approval; the saved
per-request record is retained rather than treating the batch as wholly successful.
No blocked route was retried or bypassed. An earlier attempt lacked the optional
requests module; the completed request code used the standard library. No such
module is required by the numerical scripts. The MPFR byte hash records the
retrieved representation, not an independently archived copy. No copyrighted
source files are committed.

| Source and version                                                                                                                                    | Inspected location and established fact                                                                                                                                                                             | Limit                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [NIST DLMF 8.17](https://dlmf.nist.gov/8.17), page footer version 1.2.7, 2026-06-15                                                                   | 8.17.1–4: beta integral, normalization, symmetry. 8.17.7: hypergeometric representation. 8.17.22–23: continued fraction and coefficients. The section states a,b>0 and 0<=x<=1; 8.17.5 requires integer parameters. | Authoritative upstream mathematical reference; not a runtime proof. The specialized derivations below are author algebra, not quoted DLMF algorithms. Full historical source lineage not inspected. |
| [NIST/SEMATECH Handbook 1.3.6.6.5](https://www.itl.nist.gov/div898/handbook/eda/section3/eda3665.htm), web edition, no immutable revision established | Density and CDF sections relate the central F law to the beta integral.                                                                                                                                             | No global binary64 error guarantee or factorial-model validation.                                                                                                                                   |
| [R stats F distribution manual](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/Fdist.html), mutable R-devel page, footer stats 4.6.0        | Details/Source/Examples: F and beta relation, t-squared relation, central pf through pbeta (pchisq for large df2).                                                                                                  | Documentation of mathematical relationships and implementation lineage; not a certified independent oracle or a pinned runtime.                                                                     |
| [Boost.Math 1.88.0 incomplete beta](https://www.boost.org/doc/libs/1_88_0/libs/math/doc/html/math_toolkit/sf_beta/ibeta_function.html)                | Testing and Implementation: Algorithm 708 lineage; multiple region-dependent formulas; different continued fraction used for high-precision test data.                                                              | Error tables are measured results. Do not turn them into a global bound. No Boost execution claimed.                                                                                                |
| DiDonato and Morris (1992), [Algorithm 708](https://dl.acm.org/doi/10.1145/131766.131776), ACM TOMS 18(3), 360–373                                    | Bibliographic/algorithm identity corroborated through upstream documentation; publisher open returned an internal retrieval error.                                                                                  | Full paper not inspected. Its detailed branch/error claims remain unestablished here; no algorithm copied or adopted from it.                                                                       |
| [GNU MPFR 4.2.1 manual](https://www.mpfr.org/mpfr-4.2.1/mpfr.html), Section 4.4                                                                       | Directed rounding and ties-to-even semantics distinguish rounding a primitive from enclosing a compound expression.                                                                                                 | MPFR is not executed. Using high precision alone would not certify this whole calculation.                                                                                                          |

The beta identities and this report's explicit algebra suffice for the exploration
without claiming Algorithm 708 details. Independent review should obtain stable
copies or independently capture the cited pages and inspect their formulas. The
unavailable Algorithm 708 paper blocks only adoption of its uninspected algorithmic
claims, not the exact arithmetic work below. Historical PR 184 source holds are
neither globally closed nor silently imported as new requirements for this scope.

## 4. Candidate comparison

| Method                                            | Scope and attraction                                                                 | Error and resource issue                                                                                                                    | Present disposition                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Positive finite sum below                         | Integer a, numerator df one; exactly a positive terms, stable large-f transformation | O(a) recurrence operations; finite-precision recurrence still needs roundoff accounting; large a is expensive                               | Promising candidate; exact-arithmetic enclosure demonstrated, independent review pending |
| PR 190 alternating polynomial integral            | Integer a; exact rational evaluation and square-root bracket                         | Cancellation is harmless in exact rationals but can require large integers; computing 1-H(r)/H(1) is poor floating arithmetic for far tails | Independent oracle near f=0; not a floating production candidate                         |
| Positive infinite series                          | Any a>0 with b=1/2; explicit geometric remainder for x<1                             | Slow at x near 1; choose x<=1/2 in the oracle; no arbitrary stop on small increments                                                        | Independent oracle for f>=nu                                                             |
| Direct incomplete beta / continued fraction       | General positive beta parameters; known region transformations                       | DLMF gives ordered convergents; exact parameter/index/prefactor handling and rounded evaluation require their own certificate and cap       | Deferred comparison option, not implemented here                                         |
| Student-t relationship                            | Q_nu(f)=2*Pr(T_nu>=sqrt(f)) in exact arithmetic                                      | Rounded sqrt(f), its subsequent square, branch/table constraints and tail projection rules change the computation                           | Conditional Release 2 research reuse only                                                |
| Black-box high precision or two library agreement | Useful additional diagnostics                                                        | Agreement is not a mathematical enclosure; libraries can share algorithms                                                                   | Not used as expected-value authority                                                     |

DLMF 8.17.5's integer-binomial shortcut is not directly applicable to (a,1/2).
The finite sum below comes from a change of integration variable and elementary
polynomial integration. It does not pretend that 1/2 is an integer.

## 5. Positive finite-sum derivation and enclosure

All algebra in this section is supplied for independent checking. Define

```text
r = sqrt(f/(nu+f)), d = 1-r = x/(1+r), s = 1+r
H_a(u) = integral_0^u (1-v^2)^(a-1) dv
h_a = H_a(1) = 2^(2a-1) a! (a-1)! / (2a)!
Q = integral_r^1 (1-u^2)^(a-1) du / h_a
```

Put u=r+d*t. Then 1-u=d*(1-t) and 1+u=s+d*t. Expand only the latter
factor and integrate each t^k*(1-t)^(a-1) term on [0,1]. Repeated integration
by parts gives its integral k!*(a-1)!/(a+k)!. Therefore

```text
Q = (1/h_a) sum_{k=0}^{a-1} C(a-1,k) k! (a-1)!/(a+k)!
                            * d^(a+k) * s^(a-1-k)
```

Every term is positive for finite f, since d=x/s>0. The Decimal experiment
uses t0=s^(a-1)/a and t_(k+1)/t_k=(a-1-k)*d/((a+k+1)*s), then
multiplies the sum by d^a/h_a. This has no subtraction of two nearly equal
tail quantities. It uses a wide Decimal exponent range, not binary64 intermediates.
At low precision r may round to 1; d is still computed through x/(1+r), not
set to zero. This stabilizes a candidate, but Decimal arithmetic itself is not
claimed to give an interval guarantee.

The exact-arithmetic enclosure separately computes a dyadic bracket l<=r<=u
with integer square root at b bits. It recognizes exact squares and clamps the
upper endpoint to 1. It then uses

```text
x/(1+u) <= d <= x/(1+l)
1+l <= s <= 1+u
```

All exponents and coefficients in the positive sum are nonnegative. Evaluating
each monomial at its lower endpoints gives a lower bound; upper endpoints give
an upper bound. Dependency between d and s may widen the enclosure but cannot
invalidate it. Intersecting with [0,1] uses the proved probability range.
F=0 is handled exactly before any square-root bracket. Arithmetic in this route
is exact rational arithmetic, including f and the transformation x; neither
binary64 addition overflow nor x rounded to 0 or 1 occurs.

Let rho=(1+u)/(1+l). Both endpoint ratios, d_upper/d_lower and
s_upper/s_lower, equal rho. Every monomial has total degree 2a-1, so before
clipping the upper/lower ratio is rho^(2a-1), at most
(1+2^(-b))^(2a-1). This is an author-derived relative enclosure-width bound,
valid for finite positive f and fixed integer a. It is not a bound for the
Decimal recurrence. The exact arithmetic implementation and this proof still
need independent review. No measured error maximum is promoted into a tolerance.

## 6. Independent expected-value and projection evidence

The oracle imports no candidate code. It normalizes with the exact alternating
sum h_a=sum_j (-1)^j*C(a-1,j)/(2j+1), not the candidate's factorial expression.
The routes share Python's integer/Fraction/isqrt primitives and the beta target;
they are algorithmically separated, not independent hardware or investigators.

For f<nu it evaluates the antiderivative polynomial H_a at rational bounds of
r. Because H'_a(u)=(1-u^2)^(a-1)>=0 on [0,1],
1-H_a(u)/h_a <= Q <= 1-H_a(l)/h_a. No floating subtraction enters the proof.
Here r<sqrt(1/2); extreme far-tail cancellation is avoided by the other branch.

For f>=nu, x<=1/2. Expanding (1-t)^(-1/2) into its positive binomial
series and integrating gives

```text
Q = x^a/(2h_a) * sum_{k=0}^infinity c_k*x^k/(a+k)
c_0=1, c_(k+1)/c_k=(2k+1)/(2k+2)
term_(k+1)/term_k = x*(2k+1)/(2k+2)*(a+k)/(a+k+1) < x
remainder after k <= next_term/(1-x)
```

The oracle accumulates exact rational terms and stops only when the rigorous
remainder is at most the accumulated sum times 2^(-b). The loop is capped at
512 steps; exhaustion raises an error. It never treats observed stagnation as
proof. At x<=1/2, the geometric envelope explains convergence; at larger x
the implementation deliberately uses the polynomial. A diagnostic threshold
of 10^(-65) relative to the oracle upper bound checks the 80-digit candidate,
but is not the mathematical guarantee. The actual absolute-error upper bound
max(|candidate-L|,|candidate-U|) is saved per input.

The rational witness n=4, nu=12, f=4 has r=1/2 and
Q=35995/524288 exactly. This follows by integrating
1-5u^2+10u^4-10u^6+5u^8-u^10 between 1/2 and 1 and dividing by its
integral on [0,1]. It is asserted independently of candidate output.

`round_probability` converts an exact nonnegative rational to binary64 bits by
integer quotient/remainder arithmetic: locate the binary exponent, use spacing
2^max(e-52,-1074), and round the significand with explicit midpoint parity.
It uses no host rational-to-float conversion. Equal encoded results for both
enclosure endpoints certify one rounded value conditional on the enclosed target
and integer implementation. Otherwise the result is unresolved; no value is guessed.
The saved enclosures are widened outward to compact dyadics, and are checked
again after serialization. `verify_results.py` recomputes the oracle without
importing the candidate; it is a research evidence checker, not a Protocol verifier.

This separates three facts: a high-precision approximate answer, a proved-form
interval computed with exact primitives, and a uniquely determined target-format
projection. All are still author-side research and subject to code/proof review.

## 7. Executed corpus and boundaries

[results.json](results.json) holds all 220 exact float-hex inputs, both interval
records, candidate decimal values, error upper bounds, oracle work and output bits.
[probe-transcript.txt](probe-transcript.txt) is the run summary.

- Every n=2..16 was exercised on 14 inputs: zero, minimum positive subnormal F,
  three near-zero powers, moderate F, three far-tail powers and maximum finite F.
- Four additional cases at n=65 (nu=256) test a larger integer workload and a
  degree beyond the inspected Release 2 candidate's maximum of 200.
- Six adjacent-float inputs locate the one/normal/subnormal/zero class transitions
  for nu=4. This is probability-projection fixture discovery, not an inverse
  distribution or a critical-value table deliverable.
- Both enclosure routes yielded the same unique rounding at all 220 points.
  Classes: 47 rounded-one (including 16 exact F=0), 115 other normal,
  2 subnormal, 56 positive-rounds-zero. All nonzero F targets remain strictly
  positive and less than one mathematically.
- 42 domain/resource rejection calls; 408 wrong-zero/doubled-value oracle controls;
  4 exact midpoint cases; 7 altered evidence records rejected by recomputation.
- Series maximum observed: 251 steps. This is an observation, not a selected cap
  or a proof of supported execution over a whole domain.

| Boundary at nu=4                      | Last F before crossing   | First F after crossing   | Encoded outputs                        |
| ------------------------------------- | ------------------------ | ------------------------ | -------------------------------------- |
| Rounded one to less than one          | `0x1.c71c71c71c71cp-108` | `0x1.c71c71c71c71dp-108` | `3ff0000000000000`, `3fefffffffffffff` |
| Normal to subnormal                   | `0x1.3988e1409212ep+512` | `0x1.3988e1409212fp+512` | `0010000000000001`, `000fffffffffffff` |
| Positive subnormal to zero projection | `0x1.bb67ae8584caap+538` | `0x1.bb67ae8584cabp+538` | `0000000000000001`, `0000000000000000` |

The exact probability thresholds for round-to-nearest-even are 1-2^(-54),
2^(-1022)-2^(-1075), and 2^(-1075), respectively. At equality the endpoints
1, minimum normal, and zero win by parity. The normal-boundary F pair happens
to skip the minimum-normal output itself. The table records class transitions,
not a claim that every representable probability is attained by binary64 F.

Eight-bit root precision at f=1, n=2 is deliberately unresolved. At 128 and
256 bits it resolves, and refinement narrows the interval. An oracle one-step
cap is deliberately exhausted; invalid bit/digit limits are rejected. The
probe permits b<=2048, digits<=700 and n<=65 solely as research budgets.
No automated unbounded precision loop is present. At an unresolved maximum,
a future procedure would return a classified inability to establish projection;
it would not choose an endpoint. Exact midpoint cases may need separate algebra,
and universal finite-precision termination is not proved here.

## 8. Fixed binary64 error versus upstream F error

The scripts interpret the supplied binary64 f as an exact dyadic rational.
Their probability intervals enclose Q(f), not Q(F_star) where F_star is the exact
SS/SSE ratio from input observations. These are different targets when F was
rounded upstream. Correctly rounding Q(f) cannot by itself certify Q(F_star).

For finite positive v, Q'(v)=-g_nu(v). Thus, on a positive finite upstream
interval [L,U], a derivative bound gives
|Q(f)-Q(F_star)| <= sup_[L,U] g_nu times |f-F_star| when both inputs lie there.
Near zero the density diverges like v^(-1/2); an unqualified global Lipschitz
constant is unsuitable. Monotonic interval transport is simpler and also works
at zero:

```text
L <= F_star <= U  implies  Q(U) <= Q(F_star) <= Q(L)
```

Evaluate the endpoints with outward tail bounds. If upstream rounded to zero
but F_star>0, Q(0)=1 does not prove that Q(F_star) is exactly one or rounds to one.
The exact deficit is H_a(r)/h_a, bounded between
r*(1-r^2)^(a-1)/h_a and r/h_a; this also avoids using an infinite derivative
bound at zero. An adjacent-F interval around f=4 is exercised in the probe;
this is interface evidence, not a raw-data end-to-end proof.

Lane 1 handoff candidate:

1. Exact integer n and nu=4(n-1), contrast identity A/B/AB, input revision/digest,
   and the definition of F_star pinned to exact represented observations.
2. Proof of SSE>0; distinguish exact-zero SSE, rounded-zero SSE, finite exact F_star,
   overflowed projection, and unresolved arithmetic. Never send infinity as a
   substitute for a finite real F_star.
3. Either exact F_star as a bounded rational, or certified ordered nonnegative
   rational endpoints [L,U], with byte/bit budgets and provenance. Include the
   actual rounded f separately if its operation graph is being checked.
4. Tail evidence binds to the same contrast/input and states whether it concerns
   Q(f) or Q(F_star). Propagate upstream and tail uncertainties separately before
   output rounding or comparison.

Current APIs accept binary64 point inputs only. Rational endpoint support,
overflowed F_star handling and an interval carrier are proposed interfaces, not
implemented public behavior. Monotonic conversion to enclosing finite floats is
an alternative when possible; it may widen the answer or fail at maximum finite F.
No SS, SSE or raw observation calculation is performed by this lane.

## 9. Release 2 compatibility is conditional

Inspected at the base: `numerical-contract-candidate.json`,
`tail-numerical-selection-candidate.json` and
`runtime-numerical-contract-full-trace-candidate.json` under the Release 2
numerical directory (exact blobs in inputs.json). The older generic candidate
record is not the final runtime contract. The later full-trace record has integer
df 1..200, a same-trace requirement, input-specific error proofs, selected positive
normal/rounded-one classes, and refusal for subnormal/zero tail outputs. Its
supported-domain and runtime-support claims remain disabled.

Only nu=4,8,...,200, equivalently n=2..51, intersects that count range.
The R4 representational range is vastly larger. Even within the intersection,
the reviewed t graph expects a t input derived from its own paired-t graph;
feeding sqrt(f) changes both provenance and the numerical target. If t_hat is
the rounded square root, a subsequent t_hat*t_hat need not equal f. A transfer
would need bounds on sqrt(f), its squared image, the beta argument, all tail
operations, table entries, iteration/refusal behavior and projection margin,
bound to the R4 input. The mathematical t relation alone supplies none of these.

Potential reuse: analytic positive-series/remainder reasoning, explicit rounding
cells and evidence-separation patterns after exact parameter and trace checks.
Not reused: production code, tables, support decisions, reason codes, tolerances,
allowlists, confidence intervals or proof that a paired-t trace certifies R4.
Computing x=nu/(nu+f) directly avoids the sqrt-then-square detour, but is itself
a new operation graph needing review if implemented in binary64.

## 10. Workload, refusal boundaries and remaining decisions

The Decimal recurrence takes a terms, one root, two powers and normalization;
term accumulation uses O(a) arithmetic operations and O(1) Decimal working values.
Factorial computation and arbitrary-precision integer conversion have their own
cost. The exact finite-sum implementation deliberately prioritizes transparency:
it separately powers each monomial, roughly O(a log a) rational multiplications
with binary powering, plus normalization and additions. Polynomial oracle cost is
similar; positive-series oracle cost is O(K) rational operations plus a power.

Arithmetic operation counts are not constant-time cost. Let L bound input-rational
bit lengths, b root bits and a the half df. A monomial can carry O(a(L+b+log a))
bits. A conservative unreduced product-denominator bound across a terms is
O(a^2(L+b+log a)); Fraction gcd reduction usually reduces this, but is not a
portable resource allowance. Series integers grow with K and L. Root extraction
uses O(L+b) bit operands. Result serialization is compact outward dyadics, while
intermediate memory can be much larger. No wall-time or memory guarantee for
the Python runtime is established by these bounds.

The 2..16 complete-count grid extends the historical small-count investigation;
n=65 is a deliberate larger-a stress sample. Neither is selected as the supported
count ceiling. For n near the proposal's representational ceiling a linear sum
is impractical: investigate narrower admission or a separately certified
asymptotic/continued-fraction route, without silently expanding this study.

| Remaining item                | Required evidence before promotion                                                                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Source and mathematical proof | Separate investigator checks change of variable, normalization, positive finite sum, root-enclosure propagation, oracle remainder, density sensitivity and source-version pinpoints. Obtain stable source copies.        |
| Exact implementation          | Independently examine guards, integer root and rational arithmetic assumptions, projector parity/exponent logic, dyadic serialization and proof-to-code correspondence; add a different arithmetic stack if useful.      |
| Binary64 runtime candidate    | Select an operation graph only after primitive roundoff/underflow/overflow accounting or outward interval execution. Decimal agreement is insufficient.                                                                  |
| Supported range and budgets   | Justify n, input/rational bit lengths, b/K limits, memory/time/serialized evidence bounds, deterministic failure ordering and supported platforms.                                                                       |
| Projection and comparison     | Decide allowed output classes; zero projection remains positive mathematical probability. R2's normal-only policy is not silently adopted. Fix pointwise projection evidence and a separately versioned comparison rule. |
| Upstream composition          | Receive reviewed Lane 1 F_star/SSE evidence; implement and review the exact-rational/interval adapter. Preserve target/graph distinction and input bindings.                                                             |
| Formal adoption               | Independent review and steward process; this report creates no specification, registry entry, public check, bundle or release.                                                                                           |

Reopen on scope expansion, changed df/numerator, new source contradiction,
counterexample to proof/code, different numeric target, precision/resource policy,
or another platform/rounding environment. A finite corpus alone closes none of
these. Candidate status: finite-sum and independent rational routes ORACLE_ONLY
pending review; binary64 runtime and direct R2 transfer DEFER. The complete R4
numerical programme remains INPUT_INCOMPLETE.

## 11. Reproduction and validation

From this directory, run `python probe.py`, then `python verify_results.py`.
Python standard library only; see [environment.json](environment.json).
The first command rewrites results and prints its summary; the second independently
recomputes oracle evidence and rejects seven deliberate alterations. Neither is
a production API, authenticated certificate system or independent peer review.

Repository checks and artifact hashes are recorded in VALIDATION.md and
SHA256SUMS. Only this new directory changes. Shared documents, authoritative
files, existing reviews, Release 2/3 and the discussion proposal remain unchanged.
