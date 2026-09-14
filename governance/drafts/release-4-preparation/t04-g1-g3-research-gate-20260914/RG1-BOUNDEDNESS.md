# RG1: full-pipeline boundedness derivation

Status: author derivation for independent Research Gate review, not a support
claim, adopted cost metric or production algorithm. Read [RG5](RG5-CLAIM-BOUNDARY.md)
for the proof/implementation/decision boundary. All bounds below are deliberately
loose; their constants are review targets, not calibrated resource guarantees.

## 1. Domain and complete quantity graph

Assume an already conformant balanced 2x2 input: four cells of n finite binary64
observations, integer `2 <= n <= 2^51-1`. This is the RFC's representational count ceiling, preserving safe-integer
total 4n and residual df 4(n-1); it is not a recommended useful support limit.
Received negative-zero tokens remain rejected upstream. No declared output supplies
an arithmetic truth value. Raw text parsing, irrelevant Record members and host
security are outside this numerical derivation, and still need their own bounds.

Let `U=2^1074`, `z_ci=U*y_ci`, `L=2098`, `r=ceil(log2 n)`.
Every observation decodes to an integer with `abs(z)<2^L`.
Define `S_c=sum(z_ci)`, `Q_c=sum(z_ci^2)`,
`E=n*sum(Q_c)-sum(S_c^2)` and contrasts
`C_A=-S00-S01+S10+S11`, `C_B=-S00+S01-S10+S11`,
`C_AB=S00-S01-S10+S11`.

The 22 comparisons consist of four counts, four means, residual df,
three effects, three SS, SSE, three F and three p. Thus there are 14 non-tail
real projections and three tail projections, plus five integer comparisons.
The exact graph is:

- Means: `S_c/(n*U)`.
- Effects: `C_A/(2*n*U)`, `C_B/(2*n*U)`, `C_AB/(n*U)`.
- SS: each `C^2/(4*n*U^2)`.
- SSE: `E/(n*U^2)`; exact zero is a computability failure.
- F: each `(n-1)*C^2/E`, reduced exactly before the tail input.
- Tail: `F(1,4(n-1))` upper probability at exact F, never at displayed F.

Deviation numerators `n*z_ci-S_c` independently give
`SSE=sum((n*z_ci-S_c)^2)/(n^2*U^2)`. Expanding the squares proves equality
with the moment graph. The canonical accounting uses moments; a residual pass
is also covered by the generous linear input allowance below. It does not
assume arbitrary repeated Fraction addition has these same intermediate bounds.

Bounds from triangle inequalities and at most n terms per cell are:

```text
S_c magnitude bits <= L+r
Q_c bits <= 2L+r
C magnitude bits <= L+r+2
C^2 bits <= 2L+2r+4
E bits <= 2L+2r+2
(n-1)C^2 bits <= 2L+3r+4
n*z_ci-S_c magnitude bits <= L+r+1
sum((n*z_ci-S_c)^2) bits <= 2L+3r+4
mean denominator bits <= 1075+r
SS denominator bits <= 2151+r
SSE denominator bits <= 2149+r
```

Gcd reduction cannot enlarge numerator or denominator. Since `r<=51`, all
reduced exact F widths obey `w<=4353`. This is an author bound for this raw
binary64 graph, not for arbitrary standalone rational F. It does not imply
that computing a small reduced F is cheap: common offsets and cancellation
can leave thousands of bits in Q/E while all F values are zero.

## 2. Explicit resource-independent charge model

Define an abstract charge for signed integer arithmetic with input AND output
magnitude at most K bits:

```text
copy/shift/compare/add/subtract: K+1
multiply or quotient/remainder by textbook algorithms: (K+1)^2
gcd: at most (2K+2) remainder steps, hence (2K+2)*(K+1)^2
U(K) = 64*(K+1)^3
```

These are defined charged units, not a statement that a Python call uses that
many CPU instructions. Schoolbook multiplication and long division supply a
constructive quadratic bit-complexity implementation. In Euclid's algorithm
at least every second remainder halves; therefore the stated linear number
of remainder steps is safe. A compound rational operation uses a bounded
number of products/sums, one gcd and exact divisions; U dominates those charges
when K also bounds the unreduced cross-products. Sign bits and loop counters
are included in the constants. This demonstrates a finite polynomial
bit-cost connection without making object allocation, wall time or a library's
algorithm choice public semantics.

Alternatives and limits:

- Operation count times bits is suitable for scans/additions but undercounts
  schoolbook multiplication/division and repeated gcd; not sufficient alone.
- Quadratic multiplication/division charge plus the Euclid bound is auditable
  and machine-independent, although much looser than modern implementations.
- A fast-multiplication `M(K)` model could reduce bounds but needs its own
  fixed definition, division/gcd derivation and versioned predicate.
- Stage-specific symbolic scores are convenient only after linking their
  coefficients to the whole graph and operand envelopes. The old scores do
  not establish this link.

An implementation can use different internal algorithms. If this charge is
selected, membership evaluates the fixed symbolic function of mathematical
inputs, not that implementation's actual operation trace.

## 3. Preflight and arithmetic ledger

Use `K0=2L+4r+2200` and `N0=128n+2048`, and define
`Cpre=N0*U(K0)`. This includes the entire non-tail projection/comparison work,
so calling it preflight is intentionally conservative. A constructive ledger is:

- At most `4n` decodes, counts, lattice copies, squares, sum and square-sum
  additions. Fewer than `24n` primitive/compound slots with exponent extraction.
- Optional explicit deviation pass: fewer than `32n` further slots, using
  common integer denominators rather than accumulating arbitrary rationals.
- Fixed E/three contrasts, three squared contrasts, denominator construction,
  means/effects/SS/SSE/F, fourteen reductions, df and count comparisons: fewer
  than 256 slots.
- Fourteen magnitude projection searches: at most 63 encoding comparisons,
  endpoint equality and midpoint comparison per quantity. Use at most
  `14*66=924` compound slots, including negative sign/canonical result zero.
- The remaining slack covers finite-range/SSE tests, width extraction,
  loop accounting, bounds evaluation and result comparisons.

`128n+2048` exceeds this ledger. K0 bounds moment/residual components and the
cross-products with binary64 values/midpoints (denominators up to `2^1075`),
even before gcd. Count and bounded cost-arithmetic integers are much smaller.
D04 compares the exact mandatory magnitude with MAX_FINITE; the bound does not
silently replace that convention with an IEEE overflow threshold.

For a budget B, reject counts whose Cpre already exceeds B before arithmetic.
Counts can be accumulated with an input iterator capped at the derived count
ceiling plus one item, without scanning arbitrary excess observations. Schema
validation/parsing remains an upstream operation; this is not a whole-document
host-boundary claim. At the mathematical RFC count ceiling even an unfiltered
scan is finite, but practical implementations need the early numerical bound.

The admitted count ceiling for J-cost can be found by integer bisection of
Cpre on `[2,2^51-1]` in at most 51 iterations. Then compute exact S, Q, E,
contrasts, reduced F and widths, evaluate the full score, and reject before
any polynomial if over budget. Zero SSE is detected before division. The
symbolic expressions use a fixed number of additions/multiplications with
fixed exponents; with the RFC count/width maxima their intermediate values
are below 2048 bits for schedules in this packet. A future version with other
schedule/parameter ranges rederives that bound. B is a version constant, not
an arbitrarily long Record-supplied integer. No empirical final-F shortcut is
used to justify Cpre.

## 4. Exact-sign terminal ledger

For each reduced nonnegative `f=u/v`, put `a=2(n-1)`,
`ell=ceil(log2(2a))`, `t=w+ell+2`, `A=u`, `B0=u+2a*v`.
Both A and B0 have at most t bits, and `0<=A<B0`.
Let `D=product(2j+1, j=0..a-1)`, integer
`c_j=(-1)^j*binom(a-1,j)*D/(2j+1)`, and `H=sum(c_j)=D*h>0`.
Homogeneous Horner forms `N=B0^(a-1)*D*P(A/B0)` without rational gcds.

D uses at most `a*ell` bits, each coefficient at most `a*ell+a` bits.
A Horner numerator has at most
`(a-1)*t+a*ell+a+ceil(log2 a)+2` bits; this follows by bounding each
coefficient and summing at most a terms with `A<=B0`. Then:

```text
T_num = A*N^2
T_den = B0^(2a-1)*H^2
Kx = 8a*(t+ell+4)+8192
Nx = 32a+256
Cx = Nx*U(Kx)
```

Kx exceeds coefficient/power/Horner/T and binary64-boundary cross-product
widths, including squared boundary denominators of at most 2152 bits.
Coefficient generation can use one odd-product loop and a binomial recurrence
with exact divisions, not factorial calls with unaccounted work. Powers and
Horner require linear loops. Fewer than `32a` slots cover this construction.
No gcd of the large T pair is required: compare cross-products directly.
At most 63 encoding bisection steps, equality, midpoint and zero eligibility
use at most 66 boundary comparisons. The 256 fixed slots include projection,
eligibility, candidate result and witness copying. Three tails are charged,
even when equal; sharing is an optional implementation optimization.

Target boundaries affect actual integer widths, but every boundary in `[0,1]`
used for binary64 projection is covered by Kx. Comparisons with arbitrary
rational diagnostic v require adding twice its component width instead;
the fixed public score does not cover unlimited submitted rational witnesses.

## 5. Staged enclosure ledger

For each stage b, root enclosure can use at most `b+1` rational bisection
comparisons, independent of integer-square-root implementation. Let
`D0=t+b+2`. The positive monomials have total degree `2a-1`; coefficient and
normalization factorials use O(a*ell) bits. A monomial component bound is
`Bterm=2a*D0+6a*ell+4a+8`. Summing a terms via product denominators gives
components at most `a*Bterm+ceil(log2 a)+2` bits.

Use the conservative compound envelope and loop allowance:

```text
Ks(b) = 64a^2*(t+b+ell+8)+8192
Ns(b) = 64a^2+8b+512
Cs(b) = Ns(b)*U(Ks(b))
```

Ks includes unreduced cross-products, normalization, gcd inputs, root tests,
clipping and projection midpoints. Repeated multiplication to form all terms
and coefficients takes O(a^2) operations per endpoint; a linear root loop,
two at-most-66 projection searches and fixed range operations fit Ns.
No assumption about cancellation reducing the positive sum is used.
Every stage for every tail is charged; short-circuit savings are not necessary
to prove the bound. Coefficient sharing/recurrent evaluation could improve
these envelopes only after a separate accounting revision.

## 6. Candidate sets, aggregation and bounded evidence

For a sound interval `[L,H]` within `[0,1]`, the raw candidate set is ALL integer
encoding codes between `RN(L)` and `RN(H)`, inclusive. Monotonicity and the
contiguous parity-aware rounding cells justify this range. Never enumerate
its potentially huge membership; store two 64-bit endpoints. Eligibility
intersects this set only after proving the true projection is positive.
An exact-sign tail uses a singleton eligible code, or an underflow refusal.

There are always 22 quantity slots. Five integer slots and 17 real slots
have fixed identity/order. An existence witness for bounded numerical evidence
is 22 tuples each with at most four rational pairs of K-bit components,
candidate code endpoints, declared code, fixed-size state/reason/index tags,
and bounded comparison flags. `8K+512` bits per tuple is a conservative
abstract representation allowance; plus 320 bits for the five exact integers.
It is NOT a proposed public schema, serialized report, reason registry or EC3
implementation. Including unbounded diagnostic prose would invalidate it.

Use `Ebits=22*(8K+512)+320` and `Ce=Ebits^2` for bounded construction,
copying and conservative integer-to-string conversion if needed. K is the
maximum envelope of stages actually in the candidate procedure. Evidence
proves neither overall Record validity nor external scientific correctness.

```text
C(S-C) = Cpre + sum_three_tails(Cx) + Ce(exact K)
C(S-A) = Cpre + sum_three_tails,sum_stages(Cs) + Ce(staged K)
C(S-B) = Cpre + sum_three_tails,sum_stages(Cs) + sum_three_tails(Cx)
         + Ce(max staged/exact K)
```

These costs also cover twenty-two state comparisons and fail-priority
aggregation. They do not instantiate the G5 full candidate or EC3 runtime.

## 7. Guard disposition and candidate domains

The following are recommendations pending independent Research Gate:

- `n<=65`: EXPERIMENT ONLY. Preserve the historical experiment; no theorem
  privileges 65. Count is bounded by the whole cost predicate instead.
- `w<=6500`: KEEP AS REFERENCE GUARD ONLY. It safely limits the historical
  standalone arbitrary-rational interface. For this raw-input graph the
  derived 4353 bound makes it redundant; do not promote 6500 as policy.
- `a^2(w+512)<=10,000,000`: REPLACE as a public candidate predicate with the
  complete C expression. Preserve it unchanged in historical code.
- `a^2*w<=1,000,000`: REPLACE as a public candidate predicate for the same
  reason. It omits multiplication/gcd, three tails and all arithmetic work.

Let R mean RFC shape/count rules, T03 arithmetic representation gates and
exact positive projection eligibility for each required tail. The following
are candidate families, not an assertion that historical implementations
already implement R or the 22 comparisons:

- J65: R, `n<=65`, and all three old width/work guards at bmax=512.
  Membership computes the bounded moment preflight then guards. A finite
  whole cost follows from substituting n<=65, w<=6500 in the C expressions;
  the old numerical constants still do not select that bound for a purpose.
- J70: R, `n<=70`, same three old guards at bmax=512, without the independent
  65 ceiling. Since w>=1, `a^2*513<=10,000,000` gives n<=70 and n=71 fails.
  Preflight can check 70 early. Whole costs are likewise finite; 70 reflects
  a historical score constant, not scientific/implementation necessity.
- J-cost(B,S): R and `C(S,n,w_A,w_B,w_AB)<=B`, with early Cpre rejection.
  B and S are explicit check-version constants. After count/width evaluation,
  membership needs no tail computation to decide work admission; R's
  positive-tail eligibility is then tested within the reserved cost.
  The work predicate and the final eligible domain are distinguished.

For these domain comparisons, R uses exact eligibility (Z-B), and J65/J70 can be
charged with S-C or S-B. For S-A plus Z-B, add the three Cx construction bounds
to the S-A expression; pure S-A/Z-A instead has the stricter stage-proved
eligibility predicate and is not identical to R. The work cost and eligibility
predicate cannot be mixed across these variants without this adjustment.

All are reproducible by producers without using a particular Python runtime.
Changing B, S or eligibility rules can change membership/decisions and thus
requires public check-version treatment. Expected usefulness of J65/J70 is
limited by their small-width joint guards (at n65, w<=61 at b512).
J-cost connects the whole procedure to a reviewable bound and permits count
versus width tradeoffs; loose envelopes can over-refuse. That is a cost-model
quality risk, not evidence that a narrower domain is better.

The saved 50-row grid compares symbolic scores for n=2..the RFC ceiling,
selected widths and B=`2^65,2^70,2^75,2^80,2^90`. These are sensitivity inputs,
not recommended budget values or actual raw-domain membership assertions.
For w=1, B=2^65 admits n65/n66 by cost but not n70; B=2^70 admits n128.
This shows why neither 65 nor 70 is intrinsically determined. These very loose
charged units cannot be interpreted as feasible CPU operations. Selecting B
needs independent cost-proof review and later usefulness evidence; no numeric
B is frozen or justified by these probes.
