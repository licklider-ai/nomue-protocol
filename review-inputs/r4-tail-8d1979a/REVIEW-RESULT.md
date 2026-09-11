# Fixed-input Release 4 tail candidate review

Date: 2026-09-10. Informative review; no authority or release-state changes.

## 1. Reviewer disclosure recorded before disposition

Reviewer: OpenAI Codex assistant acting as Lane 2 reviewer in this session.
No additional agents were started. No human review is claimed. The exact served
model build and an independently attested actor identity are unavailable.
The visible current-session transcript has no earlier creation or repair of the
fixed candidate. Supplied conversation summaries nevertheless mention prior
R4 work and PR 278 creation; they are not sufficient to identify the underlying
investigator across sessions. This is not a claim of no prior involvement in
all related research. Repository history and these summaries are visible; no
other Lane's unreviewed output is used as expected-value authority.

Author REPORT Section 1 explicitly identifies OpenAI Codex, visible prior
summaries, and no separate investigator. Both author and reviewer therefore have
the same disclosed provider/tool identity. A new thread, different code, or a
separate arithmetic formula does not establish a different LLM/model. The
Research Gate's separate-model primary-source pass remains **NOT_ESTABLISHED**.
Shared trusted components include CPython, integers, Fraction and mathematical
target definitions. Author routes additionally share isqrt; reviewer root
bisection does not use it. No hardware or human-investigator independence is
claimed. This limitation does not prevent the requested bounded technical review.

## 2. Fixed identity and dispositions

| Item                   | Identity                                                             |
| ---------------------- | -------------------------------------------------------------------- |
| Author commit          | `8d1979a4cf91012d86d57df40e5a847e2f00a358`                           |
| Sole parent            | `dedd26a3e0655001b67e40ccfb741e43ecb07beb`                           |
| Tree                   | `9a8d8cb4398747a4fc2fe373cf6f4fef40b5d040`                           |
| Proposal/opening input | `022c8699befbcba375e3aa6e07c1a8dd8eace483`, PR 249 / issue 261       |
| Reviewed directory     | `governance/drafts/release-4-preparation/tail-feasibility-20260910/` |

All 13 delivered files are pinned by blob, length and SHA-256 in INPUTS.json;
12 author SHA256SUMS entries pass and the sums file is independently pinned.
Author verify_inputs checks all five commit identities and 23 source blobs.
No moving main or PR head replaces these objects. Required root documents and
the numerical workplan/commission were read; no applicable governance or
review-inputs local AGENTS was found. The present commission narrows the older
programme commission and specifies the additive review directory. Opening
status is read at the proposal commit, not inferred from stale base navigation.

| Question                                       | Disposition                                                 | Basis                                                                                                                                                                                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A: mathematical/code/record research candidate | **GO — limited research-candidate GO for fixed binary64 F** | Direct derivations and proof/code correspondence hold; author evidence reproduced byte for byte; added expectations use a separately coded recurrence and encoding search. Checker limits below constrain reuse.                            |
| B: Research Gate                               | **Not fully satisfied; no gate closure**                    | Primary formula text inspected, direct algebra checked, scope/provenance documented. Different-model investigator not established; blocked stable source captures and any future Algorithm 708-specific claims remain separate obligations. |
| C: reuse                                       | **Bounded reuse with conditions**                           | Finite sum, exact enclosure, oracles, rational rounding and resource analysis can inform next research. Runtime support, rational/interval input adapter and raw-data composition are not implemented or approved.                          |

This verdict does not establish raw-data-to-probability correctness, model
calibration, formal support, an issued verifier procedure, or Release 4 readiness.
There are no required author repairs for this bounded disposition. Two concrete
non-blocking checker observations appear in Section 7; they become required
work if wider certificate/checker claims are proposed.

### Research Gate condition ledger

| RFC discipline                        | Result in this review                                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Research before design freeze         | Preserved: exploratory result only, no frozen behavior or formal support                                                          |
| Separate-model primary-source pass    | Not established: same disclosed provider/tool identity and no different-model evidence                                            |
| Primary-source basis                  | Beta/F/rounding formula pinpoints directly inspected; Algorithm 708 details unavailable; stable blocked-page captures remain open |
| Facts, inference, decision separation | Preserved: source facts, reviewer derivations, measured probes and non-adoption are distinct                                      |
| Material disagreement                 | No contradiction found for the inspected formulas; this does not settle unavailable sources or broader model claims               |
| Traceable handoff                     | Fixed Git identities, hashes, proof/code mapping, executable tests and reuse limits supplied                                      |

## 3. Independent mathematical derivation

Let a=nu/2 and nu=4(n-1). The retained domain implies n>=2 integer, a positive
even integer, numerator df one. The specialized algebra actually works for
any positive integer a; that wider identity does not enlarge the retained API.

Starting from the inspected central F density,

```text
g(v)=v^(-1/2)*(1+v/nu)^(-a-1/2)/(sqrt(nu)*B(1/2,a)).
t=nu/(nu+v), v=nu*(1-t)/t, |dv/dt|=nu/t^2.
g(v)|dv/dt|=t^(a-1)*(1-t)^(-1/2)/B(a,1/2).
```

The limits v=f..infinity become t=x..0, x=nu/(nu+f). Reversing limits gives
Q=I_x(a,1/2), including Q(0)=1. For finite f>0, the integral and its complement
are positive; hence 0<Q<1. Infinity is only a mathematical limit here.
These substitutions, rather than agreement with a library, establish orientation.

Set t=1-u^2, r=sqrt(f/(nu+f)). Then

```text
H_a(w)=integral_0^w (1-u^2)^(a-1) du,
h_a=H_a(1)=B(1/2,a)/2,
Q=(h_a-H_a(r))/h_a.
```

An independent normalization proof avoids trusting the candidate factorials.
Integrate the derivative of u*(1-u^2)^(a-1): for a>=2, vanishing boundary
values give (2a-1)h_a=(2a-2)h_(a-1), h_1=1. Multiplying this recurrence gives
h_a=2^(2a-1)_a!_(a-1)!/(2a)!, matching candidate.py. Expanding the integrand
also gives the oracle's alternating rational sum for h_a, with h_a>0 proved
by its integral, not assumed from floating cancellation.

With d=1-r and s=1+r, substitute u=r+d*t in the tail integral. The integrand
and differential give d^a*(1-t)^(a-1)*(s+d*t)^(a-1). Expanding the last factor
produces exactly a terms, k=0..a-1, of degree (a+k)+(a-1-k)=2a-1. Repeated
integration by parts gives integral_0^1 t^k*(1-t)^(a-1)dt=k!*(a-1)!/(a+k)!.
Thus every coefficient and exponent in REPORT Section 5 and finite_enclosure
matches the derivation. The Decimal recurrence ratio follows by dividing
successive terms; its first reduced term is s^(a-1)/a. Decimal is a diagnostic
approximation with inherited context, not a rigorous enclosure.

For finite f>0, x>0 and d=x/(1+r)>0 even when a rounded root is one. For
z=f/(nu+f), k=isqrt(floor(z*2^(2b))) yields k/2^b<=sqrt(z)<(k+1)/2^b,
unless the lower square is exactly z. Exact equality is tested rationally.
Clamping the upper bound at one preserves inclusion because 0<=z<=1.
At f=0 the APIs return the exact endpoint before root evaluation. At positive
finite f, mathematical z=1 is never reached; an upper root bound of one is
permitted and does not set d to zero.

If l<=r<=u, d lies in [x/(1+u),x/(1+l)] and s in [1+l,1+u]. All finite-sum
monomials are coordinatewise nondecreasing on these positive intervals.
Their lower/upper corners bound the actual coupled point. Ignoring dependence
widens the rectangle; it cannot exclude that point. Intersecting the final
interval with [0,1] preserves the independently proved probability range.

Let rho=(1+u)/(1+l). Each variable's upper/lower ratio is rho, so each
monomial's ratio, and therefore the whole **unclipped** sum's ratio, is
rho^(2a-1). Since u-l<=2^-b and 1+l>=1, rho<=1+2^-b. After clipping, the
ratio is no larger; relative width (upper-lower)/lower is at most
rho^(2a-1)-1. This requires a positive lower bound, finite positive f, exact
rational evaluation and the positive integer-a expression. It says nothing
about Decimal roundoff, upstream F error or universal rounding termination.

## 4. Oracle proof and independent expected values

H_a'(u)=(1-u^2)^(a-1)>=0 on [0,1]. Therefore the polynomial oracle's bounds
1-H_a(u)/h_a and 1-H_a(l)/h_a have the correct orientation even though its
expanded polynomial alternates in sign. Fraction evaluation is exact.
The f<nu branch keeps r<sqrt(1/2), but monotonicity itself is valid throughout
[0,1]. Polynomial evaluation is not suitable as an unqualified floating oracle.

For the series route, expansion of (1-t)^(-1/2) gives c_0=1 and
c_(k+1)/c_k=(2k+1)/(2k+2). Integrating its nonnegative terms gives
Q=x^a/(2h_a)*sum c_k*x^k/(a+k). Termwise integration is justified on
0<=t<=x<1 by convergence (or monotone convergence). Every next/current ratio
is x*(2k+1)/(2k+2)*(a+k)/(a+k+1)<x. After the accumulated term k, all omitted
terms are bounded by next_term/(1-x), including that next term exactly once.
The prefactor is positive. The code tests this bound before extending total,
so there is no index shift in its stopping condition. x<=1/2 is exactly f>=nu.
Relative remainder <=2^-bits is an enclosure criterion, not a rounding result.
The 512-step cap may fail even at admissible requested precision; exhaustion
raises ArithmeticError. In particular bits=2048 at f=nu,n=2 exhausts the cap.
This is a deliberate no-guess outcome, not a promise all budget tuples succeed.

The reviewer implements a third evaluation route using integration by parts:

```text
J_m(r)=integral_r^1 (1-u^2)^(m-1)du,
J_1=1-r,
(2m-1)J_m=(2m-2)J_(m-1)-r*(1-r^2)^(m-1).
```

Independent binary bisection of the rational squared root supplies bounds;
J_a/h_a at their reversed endpoints supplies expected intervals. No candidate
or author oracle output generates these expectations. This still shares the
beta target and Python Fraction foundation. Fifteen exact rational-root
witnesses further avoid root uncertainty, including roots 1/2 and 3/4.
This alternate recurrence is test code, not a new adopted algorithm or Lane 1
adapter. Its exact cancellation can be costly; it is not a performance proposal.

## 5. Rounding and serialized evidence

In round_probability, the bit-length difference followed by an exact comparison
finds e=floor(log2(q)). Binary64 spacing is 2^max(e-52,-1074). Dividing the exact
rational by that spacing yields integer sig and remainder. The comparison
2*remainder with denominator decides nearest rounding; equality increments an
odd sig only. A carry at 2^53 increments the exponent. At spacing 2^-1074,
sig<2^52 maps directly to the subnormal encoding, including zero; sig=2^52
maps to minimum normal. q=1 maps to its exact encoding. q outside [0,1] is
rejected. This is an exact-rational helper; accepting arbitrary hostile types
or reversed external intervals is not a declared safe API.

Nearest/even rounding is nondecreasing. For a valid interval [L,U] containing
the target, equal endpoint encodings therefore force every interior value to
that encoding, including ties assigned by parity. Ordered valid intervals,
correct containment and exact projector behavior are essential premises.
An overlap between two intervals alone does not establish either one's
containment. Distinct endpoint encodings yield None; no endpoint is guessed.
No unbounded precision refinement or guarantee that every exact midpoint can
be resolved by these two enclosure routines is claimed.

The reviewer encoding search reconstructs rational values from binary64 fields,
binary-searches all nonnegative encodings through one, then compares exact
distances and parity. It does not use the author's logarithm/spacing routine
or host float conversion for expected bits. Tests cover every power-of-two
exponent from -1074 through 0, nearby rationals, 134 midpoint neighborhoods,
subnormal/normal carry, zero and rounding to one.

probe.dyadic floors the scaled rational for lower bounds and adds one exactly
when the upper-bound remainder is nonzero. Its exponent selection controls
precision but does not affect inclusion. decode reconstructs exact dyadics.
Thus widening before serialization preserves inclusion; projection is checked
again afterwards. Five extra serialization witnesses include 2^-20000 and a
rational deficit from one below binary64 precision.

Saved mathematical_tail separates Q=1 at f=0 from rounded-one at f>0;
56 positive tails round to zero in the author corpus. A zero encoding is not
an exact-zero mathematical tail, nor does rounded-one establish exact Q=1.
No formal Protocol comparison or output-class policy is selected here.

### Proof-to-code correspondence

| Code location                         | Reviewed obligation                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| candidate.guard                       | Strict float/count domain; exact Fraction conversion; derived a                                         |
| candidate.decimal_candidate           | Positive recurrence coefficients; approximate Decimal-only role; inherited context recorded             |
| candidate.finite_enclosure            | Exact transform, isqrt bounds/equality, positive corner sums, clipping                                  |
| oracle.oracle                         | Independent normalization, branch f=nu, monotone polynomial or rigorous series remainder/cap            |
| oracle.round_probability / projection | Exponent/spacing/parity/carry; conditional interval-to-rounding theorem                                 |
| probe.dyadic / decode / enc           | Exact outward serialization; post-serialization projection                                              |
| probe.run                             | Fixed evidence generation, negative controls, boundaries, no-guess fixture discovery                    |
| verify_results.check / main           | Recomputed oracle, df/route/work/projection; overlap-only candidate check and unchecked fields in O1/O2 |
| verify_inputs.main                    | Historical Git identities and source hashes; original author staging scope only                         |

## 6. Reproduction and new tests

| Check                                        | Result                                                         |
| -------------------------------------------- | -------------------------------------------------------------- |
| Original corpus replay in a separate copy    | 220 cases; results.json byte-identical to fixed input          |
| Original domain/resource failures            | 42 reproduced                                                  |
| Original numerical negative controls         | 408 reproduced                                                 |
| Original midpoint / tamper probes            | 4 / 7 reproduced                                               |
| New recurrence/bisection tail inputs         | 60 pass, including before/at/after f=nu and counts 51/52/64/65 |
| New exact-root witnesses                     | 15 pass with exact rational expected probabilities             |
| Independent encoding-search checks           | 3,626 pass                                                     |
| Midpoint-straddling unresolved intervals     | 134 return None                                                |
| Relative-width / outward-storage probes      | 12 / 5 pass                                                    |
| Additional type/domain/budget/cap rejections | 88 pass                                                        |

Precision tests include unresolved 8-bit bounds, admitted maximum precision at
zero, and deliberate 2048-bit/512-step series exhaustion. Count/type tests include
bool, subclasses, Fraction, float count, strings, null-like values, huge integers,
n=1/66 and invalid F values. The API derives df from n; it accepts no independently
supplied df. Saved-row degree mismatch is checked separately. Successful cases
are finite observations; neither their number nor two-formula agreement proves
a universal bound. The mathematical proof and its trusted primitive assumptions
carry that separate obligation. See independent-results.json and VALIDATION.md.

## 7. Concrete checker observations and minimal follow-up

### O1: unchecked ancillary fields and corpus membership

verify_results.check does not inspect decimal_80_digits, decimal_abs_error_upper,
mathematical_tail, projection_class or family. Five individual altered fields
pass. main does not compare a frozen input roster or verify summary counters;
it iterates the supplied rows. Therefore seven rejected mutations do not mean
whole-record authentication or complete-corpus validation. The fixed hashes
and byte-identical replay in this review establish the actual delivered bytes.

Minimal follow-up before broader checker reuse: explicitly document the checked
fields and require a separately pinned roster/digest. If those numeric/class
fields are to be certified, recompute their asserted relations and add negative
probes. Do not simply turn an unbound summary into an authority source.
For this research record, O1 is non-blocking: REPORT does not claim a production
or authenticated certificate system, and its actual observations were reproduced.

### O2: candidate overlap is not a containment certificate

At n=2,f=4, choose a 400-bit dyadic point just above the 256-bit series lower
bound. It lies inside the 256-bit oracle interval, shares the correct rounded
encoding, but is strictly below the 384-bit series lower bound. Replacing both
candidate_bounds endpoints by this point passes verify_results.check although
the point interval excludes the true tail. independent-results.json stores the
exact dyadic witness; independent_checks.py reproduces the strict inequality.
The oracle's positive remainder and tighter lower bound prove exclusion, rather
than relying on a decimal approximation.

This follows directly from the final overlap/projection test in check. That test
certifies consistency and rounded output, not the candidate interval's inclusion.
The actual candidate algorithm's inclusion follows from Sections 3–5, and its
fixed 220 saved outputs are also reproduced. Thus this is a non-blocking limit
of the explicitly research-only checker, not a demonstrated wrong tail or
wrong rounding in the delivered candidate. Before calling this a candidate
interval verifier, minimally recompute the candidate enclosure at fixed precision
and check that the serialized interval encloses it, or check a complete root/sum
certificate independently. Preserve the independent oracle check as a separate
condition. Author artifacts were not repaired by this review.

## 8. Resources and support boundary

Decimal term accumulation has a terms, O(a) arithmetic operations and O(1)
working Decimal values; powers, factorials and integer conversion add cost.
The actual exact candidate separately powers a monomials, approximately
O(a log a) rational multiplications for binary powering, plus addition and
normalization. The polynomial oracle has analogous growth; the series has
O(K) rational recurrence operations plus its prefactor power. These are
arithmetic-operation counts, not constant-time or machine-memory bounds.

With input-rational bit bound L, root precision b and half-df a, powered
monomials need O(a(L+b+log a)) bits; unreduced product denominators across a
terms give a conservative O(a^2(L+b+log a)) bound. Factorial bit growth is
O(a log a). Fraction reductions add gcd/division cost. Root operands have
O(L+b) bits. Series growth depends on K and L, including the rising integer
coefficients and denominators. Storage uses compact approximately 180-bit
dyadic significands plus exponent metadata; intermediate objects may be much
larger. Python allocation/GC and process peaks are not bounded by these counts.
No measured wall-time/peak-memory/all-domain guarantee was established.

n<=65, root bits<=2048, Decimal digits<=700 and max_terms<=512 are exploratory
budgets. They are neither the representational ceiling nor formal support or
Protocol refusal rules. The inspected proposal's count ceiling gives a vastly
larger a; testing n=65 says nothing about feasibility there. For promotion,
justify bit-length admission, worst-case time/memory/storage, failure ordering,
supported environments and output policy. No giant-input execution was needed.

## 9. Lane 1 composition and Release 2 reuse

Before composition, obtain reviewed evidence binding exact input revision/digest,
cell/contrast identity A/B/AB, n, nu=4(n-1), and the same definition of F. Require
proof of exact SSE>0 and either exact rational F or a guaranteed ordered
nonnegative [L,U]. For each tail, decreasing Q gives Q(U)<=Q(F)<=Q(L); outward
tail bounds at the two endpoints then contain Q(F). Keep upstream F uncertainty
separate from tail evaluation uncertainty until final rounding/comparison.
A valid raw-data model assertion is separate from this numerical certificate.

Q'(v)=-g(v) for v>0. A finite density supremum can propagate local input error
on a strictly positive compact interval; it cannot supply a global bound at
zero. Direct monotone interval transport works at zero. The deficit bound
r*(1-r^2)^(a-1)/h_a <= 1-Q <= r/h_a follows from bounding the decreasing
integrand over [0,r]. A positive F rounded upstream to zero can have Q<1;
Q(0)=1 cannot settle even its rounded tail without further bounds. A finite
mathematical F beyond binary64 maximum cannot be passed as infinity. Exact
SSE=0 has no F/tail in the retained proposal and stops before tail evaluation;
rounded-zero SSE and positive exact SSE are distinct cases.

The present point APIs reject rational endpoints and non-float inputs. An
exact-rational or certified interval adapter, and treatment of beyond-maximum
finite F, remain unimplemented. Enclosing by finite floats can sometimes work
but may widen intervals or fail at the maximum. No connection code or Lane 1
acceptance is added in this review.

Mathematically T_nu squared has F(1,nu), and symmetry gives
Q_nu(f)=2*Pr(T_nu>=sqrt(f)). The three pinned R2 candidate records distinguish
this identity from numerical traces. The later full-trace record uses df 1..200,
so the overlapping R4 values are nu=4,8,...,200, n=2..51. It still has support
claims disabled, requires one bound input/trace, and selects normal/rounded-one
outputs while refusing subnormal/zero probabilities. R4's diagnostic projector
therefore does not inherit its output policy. Rounded sqrt(f) followed by a
square need not recover f; originating paired-t input/trace assumptions also
fail to transfer automatically. Reusable ideas are remainder bounds, exact
rounding cells, trace binding and separate error ledgers after scope checking;
no R2 tables, operation graph, tolerances, reason codes or support decisions are
adopted or expanded. These are source-record comparisons, not a new R2 audit.

## 10. Remaining conditions versus candidate defects

The finite-F research candidate is reusable within this report's boundaries.
Different-model primary review, stable source capture, formal runtime/domain
budgets, complete outward binary64 operation accounting, projection/comparison
policy, rational/interval API and Lane 1 composition are explicit future work.
Their absence is not a defect in an API that openly implements fixed float
inputs only. O1/O2 document specific checker limitations and guard against
misuse; they do not invalidate the reproduced data or proved candidate formula.

Algorithm 708 full text remains unavailable. This blocks reliance on its detailed
algorithmic assertions, not the direct integral derivation reviewed here.
Any new domain, changed df/numerator, different target, changed arithmetic or
budget, source contradiction or proof/code counterexample requires a scoped
re-review. No holds are lifted; no specification, registry, existing verifier,
formal adoption, merge or release action is taken.
