# Release 4 Preliminary Factorial Numerical Research Result

Status: informative, preliminary research only; not adopted.
Programme disposition: `INPUT_INCOMPLETE`.
Investigator role: independent numerical investigator, 2026-09-06.
No semantic-investigator output or preferred implementation was supplied or used.
This authoring pass is not independent review of this report. No implementation,
RFC, design freeze, public opening, support domain, tolerance, or release is authorized.

## 1. Identity and evidence boundary

The independently fetched live [execution issue #178](https://github.com/licklider-ai/nomue-protocol/issues/178)
had 4242 UTF-8 bytes and SHA-256
`362e603339f81ca72de3f3578a73b1c530ce3d0ead8dbc29e66a7c5187bf3b41`.
Its repaired preliminary-only instructions and Candidate B erratum govern this pass.

Containing commit: `58675e66dbf263c94688d47867c731ad4efddbf6`.
Containing tree: `a1c81b6480d5518271c1a4787cf9ab0879f6c2af`.
All following blob identities were verified against that tree:

| Input                               | Blob                                       |
| ----------------------------------- | ------------------------------------------ |
| Preparation README                  | `34fa11bd35bbb48218ee13fa9986b61a8204cffd` |
| Numerical commission                | `48836247c50ce388e1a21e5b0dd893291095809c` |
| Release 3 semantic result           | `8f21526040924b891f64724c2d0fde9ea94eff92` |
| Release 3 source-acquisition result | `5465cbcfd00708facac94785d9244b79166cb81e` |

Root AGENTS, CHARTER, AUTHORITY, authority manifest, requirement registry,
ID-POLICY, RFC, preparation README, and numerical commission were read.
There is no governance-local AGENTS file. Release 3 inspection was limited to
semantic result sections 16–17 and acquisition result section 12: these record
reuse boundaries and unresolved source work, not an imported algorithm.
Their presence in the fixed merged tree does not establish numerical acceptance.
No Release 3 numerical certificate is used; open PR #174 is expressly excluded.
No later input or reviewed Release 4 semantic handoff is incorporated.

## 2. Direct source ledger

Only authoritative upstream pages below support external facts. Page text was
directly inspected, not merely a search snippet. No original factorial paper
was acquired; Yates 1937 and the original F-test and numerical-analysis lineage
remain source-completion work. No historical priority claim is made.

| Source                                                                                                            | Exact inspected location and identity                                             | Directly established fact                                                                                              | Limit                                                                                |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [NIST factorial effects](https://itl.nist.gov/div898/handbook/pri/section6/pri615.htm)                            | Handbook 5.6.1.5, Effects Estimation, retrieved 2026-09-06                        | Two-level full factorial models have product terms and a least-squares route                                           | Worked page is three-factor; two-factor specialization below is investigator algebra |
| [NIST F distribution](https://www.itl.nist.gov/div898/handbook/eda/section3/eda3665.htm)                          | Handbook 1.3.6.6.5, density, CDF and percent-point sections, retrieved 2026-09-06 | F CDF uses complementary regularized incomplete beta; quantile is computed numerically                                 | No portable binary64 error certificate                                               |
| [DLMF incomplete beta](https://dlmf.nist.gov/8.17)                                                                | Equations 8.17.1–4, 8.17.7, 8.17.22–23; retrieved 2026-09-06                      | Integral, normalization, symmetry, series representation, continued-fraction alternatives                              | No iteration cap or floating-point tolerance follows from the identity               |
| [LAPACK DGELS](https://netlib.org/lapack/explore-html/d8/d83/group__gels_gaa65298f8ef218a625e40d0da3c95803c.html) | LAPACK 3.12.1 documentation, Purpose and rank-deficiency warning                  | QR/LQ route assumes full rank and detects only exact zero triangular diagonals; near-rank deficiency can lose accuracy | Not a factorial hypothesis definition or support certificate                         |

Exact downloaded byte hashes and immutable archived revisions of these web
pages are unavailable. The direct DLMF byte-download route returned HTTP 403;
it was not retried or bypassed. The already accessible page text is bounded
evidence, not a fabricated source archive. The DLMF full release version was
not established; equation identifiers and retrieval date are the pinpoints.
This source-identity gap prevents promotion without archived, hashed source
copies and separate review. No paid source access was attempted.

## 3. Investigator-derived exact algebra

This is a self-contained mathematical experiment, not a selected result schema.
Let cells be ordered (00,01,10,11), with n observations each, n at least 2,
N=4n, sums S_ij and means m_ij=S_ij/n. Let g=sum(m)/4 and

- c_A = -m00-m01+m10+m11;
- c_B = -m00+m01-m10+m11;
- c_AB = m00-m01-m10+m11.

Then SSE=sum_ijk (y_ijk-m_ij)^2, df_E=4(n-1), MSE=SSE/df_E.
Each effect SS is n*c^2/4 and has one degree of freedom, so F=SS/MSE
when MSE>0. Total centered SS equals SSE+SS_A+SS_B+SS_AB.

Under this coordinate convention the marginal mean differences are c_A/2
and c_B/2. The difference-in-differences is c_AB; another common factorial
effect coordinate is c_AB/2. The coded regression coefficient is c/4.
Those scalings have the same zero hypothesis and F, but different reported
estimates and standard errors: selecting one is semantic work still missing.

For a contrast L=sum(w_ij*m_ij), its variance under independent common-variance
errors is sigma^2*sum(w^2)/n; plug-in SE uses MSE. Under an additional normal
common-variance model the signed t=L/SE squares to the corresponding
one-dimensional F. Interval exclusion of zero and a two-sided t test coincide
in exact arithmetic only with identical level, hypothesis, variance estimate,
critical value and endpoint convention. Rounded endpoints and rounded
probabilities need not preserve that equivalence. Multi-df Candidate B omnibus
tests do not become a single signed contrast interval. Joint intervals need
separate family and critical-value semantics.

| Graph alternative          | Exact relation                                                                                                | Numerical hazard / preliminary assessment                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Direct four-cell contrasts | Means, contrasts, centered SSE, effect SS above                                                               | PRELIM-PROBED: small exact corpus; order and scale remain unspecified                       |
| Orthogonal coded design    | Rows (1,x_A,x_B,x_A*x_B), x in {-1,1}; X'X=N*I; beta=X'y/N                                                    | PRELIM-DERIVED: orthogonality removes mathematical rank ambiguity, not summation order      |
| Full least squares         | Cell-indicator Gram matrix n*I; solve fitted means, form residual norm; equivalent reparameterized full model | PRELIM-PARTIAL: exact diagonal solve probed; generic QR/SVD binary64 implementation not run |
| Uncentered SS difference   | sum(y^2)-sum(S_ij^2/n)                                                                                        | PRELIM-HAZARD: exact identity; catastrophic binary64 cancellation demonstrated              |

Counts, cell sums, dot products, centering, subtraction, squaring, division,
SS aggregation, F formation and beta-argument formation can all round.
Even multiplication by a power of two can overflow or underflow. Pairwise,
sequential, compensated, translated and scaled graphs are distinct until their
node order, rounding and exceptional behavior are declared.
Normal-arithmetic relative error models require finite normal intermediates;
they do not cover subnormal flush-to-zero or overflow. A finite input is not
a finite-intermediate guarantee. Zero SSE produces undefined F when SS=0,
and division by zero otherwise; this report selects no endpoint or refusal code.
Integer counts, products abn and degrees of freedom need exact checked integer
arithmetic before conversion; binary64 cannot distinguish all integers above
2^53. Declared unit identity is separately necessary and cannot be inferred
from numeric rank.

## 4. F probabilities and independent truth routes

For df (d,nu), Q(F)=I_x(nu/2,d/2), x=nu/(nu+d*F).
Candidate A's three tests can share this mathematical tail family at d=1
and nu=4(n-1), not necessarily one accepted implementation.
Candidate B changes d to a-1, b-1 and (a-1)(b-1), nu=ab(n-1);
the half-integer-specialized oracle below does not cover all those parameters.
Avoiding 1-CDF cancellation is useful but does not alone prevent overflow in
d*F, underflow in x or an uncertified final projection.

The self-derived enclosure route substitutes t=1-u^2 in DLMF's integral.
For integer A=nu/2, define H(u)=sum[k=0..A-1]
(-1)^k*binom(A-1,k)*u^(2k+1)/(2k+1).
Then Q(F)=1-H(sqrt(F/(nu+F)))/H(1).
H'(u)=(1-u^2)^(A-1)>=0 on [0,1]. Integer square root gives rational
l<=sqrt(z)<h; exact rational evaluation yields
1-H(h)/H(1) <= Q <= 1-H(l)/H(1).
Thus finite-arithmetic cancellation in this polynomial costs integer resources
but not mathematical accuracy. This proof is investigator-derived and unreviewed.
The script uses valid interior bounds; a general endpoint routine would clamp
h to 1 and handle F=0 explicitly. Equal rational endpoint projections establish
a candidate rounded value conditional on the host's rational-to-float conversion;
a portable certificate needs an independent explicit nearest-even converter.

A separate Decimal positive-series recurrence evaluates DLMF 8.17.7 at 150
digits for nine moderate/far-tail points. Agreement to 1e-140 is a diagnostic
only, not a rigorous remainder bound. The routes share special-function
identities but not the polynomial algorithm. They do not share reference-kernel
code. Exact rational cell algebra is checked by a diagonal least-squares
identity and total-SS decomposition, not an independent library implementation.

## 5. Error and comparison ledger

| Quantity                          | Mathematical truth / reproduction                                                               | Projection / comparisons still required                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Counts and df                     | Exact integers; separately validate cells and unit identity                                     | Exact integer conversion and overflow policy                                                            |
| Means, contrasts, SSE, SS, MSE, F | Exact rational truth; operation graph node-by-node values would measure reproduction separately | Rational midpoint/tie proof; no tolerance selected                                                      |
| SE and interval endpoints         | Rational radicand plus square-root enclosure; critical bracket                                  | Propagate all enclosures through endpoint arithmetic; compare endpoint convention independently         |
| F probability                     | Positive real tail with enclosure; Decimal comparison diagnostic                                | Positive tail may round to subnormal or zero; zero projection is not exact probability zero             |
| Critical value                    | Monotone tail bracket                                                                           | Quantile precision, enclosure width and threshold direction; no rounded-value equality surrogate        |
| Adjustments                       | Exact transforms on specified p inputs and fixed family                                         | Sorting ties, clipping, multiplication order, monotone closure, family remapping and threshold equality |
| Declared result                   | Compare only after truth and graph layers are distinguished                                     | Quantity-specific versioned tolerance requires evidence, absent here                                    |

For an illustrative three-member Bonferroni arithmetic transform,
q_i=min(1,3*p_i) and threshold alpha/3 can be implemented in exact rationals.
For an illustrative step-down transform, sort by (p, stable member identity),
form q_(i)=min(1,max[j<=i] (4-j)*p_(j)), and restore member identity.
These are arithmetic examples, not adopted multiplicity procedures or claims
of source-closed familywise protection. The common MSE couples the three test
statistics; orthogonal numerators do not license an independence assumption
for resulting p-values. No FDR, resampling or joint-family claim is selected.
An accepted procedure's family definition and assumptions are mandatory later
inputs. Adjustment and interval implementations remain unprobed.

## 6. Coverage and resources

Labels used only here: PRELIM-PROBED means executed bounded evidence;
PRELIM-DERIVED means algebraic investigation without implementation evidence;
PRELIM-PARTIAL means an executed subcase with missing required coverage;
PRELIM-HAZARD means a demonstrated failure mode; PRELIM-PENDING means a missing
semantic/source/execution dependency. None is a final commission disposition.

| Entry                                            | Numerical family / graph                                                                           | Oracle and hazards                                                                              | Assessment     |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------- |
| Candidate A cell summaries and three SS/F values | Direct, coded, least-squares alternatives                                                          | Rational routes; cancellation, zero error, order, finite intermediates                          | PRELIM-PARTIAL |
| Candidate A tails and critical values            | F(1,4(n-1))                                                                                        | Rational polynomial enclosure and Decimal series; rare projection/tail regimes                  | PRELIM-PROBED  |
| Candidate A estimate/interval outputs            | Contrast SE and critical products                                                                  | Enclosure propagation; coordinate and level unresolved                                          | PRELIM-PENDING |
| Three-test adjustment                            | Exact ordered p transforms                                                                         | Family identity, ties, shared denominator, interval semantics                                   | PRELIM-PENDING |
| Candidate B balanced a by b                      | Orthogonal subspaces; rank ab in full cell-mean model                                              | df a-1, b-1, (a-1)(b-1), ab(n-1); larger dimensions                                             | PRELIM-DERIVED |
| Candidate C complete unbalanced                  | Full cell-indicator fit remains rank ab if every cell populated; factorial subspaces nonorthogonal | Hypothesis weights and reduced-model comparisons first; QR/pivot/rank policy is route-dependent | PRELIM-PENDING |
| Candidate D                                      | Missing cells/dependence/random effects/etc.                                                       | Estimability, covariance, iterative or model-specific truth required                            | PRELIM-PENDING |
| Complete reviewed semantic catalogue             | Not yet available                                                                                  | Cannot assert enumeration closure                                                               | PRELIM-PENDING |

Candidate B is balanced, not unbalanced. Neither B nor complete C automatically
requires a generalized inverse: a nonredundant cell-mean basis has full rank.
An overparameterized coding can introduce redundancy in either. Numerical
rank thresholds are not statistical estimability definitions. Missing cells
and new covariance structures require new arguments.

With C=ab cells and N=sum(n_ij), direct two-pass cell accumulation is O(N+C)
arithmetic and O(C) numeric state if observations can be replayed. Identity
validation needs O(N) set storage or a separately bounded sorting pass.
Dense least squares with p=ab uses O(Np^2+p^3) arithmetic and O(Np+p^2)
storage in a conventional dense route; structural simplifications need their
own graph. A trace with T nodes and b-bit values costs at least O(Tb) bits,
plus identifiers/metadata. Fixed-precision oracle polynomial work uses A terms;
straight rational powers grow numerators and denominators with A and precision,
so operation count alone is not a byte bound. A cap on input bit length,
A, precision P, iterations K and certificate/trace bytes is necessary.
Bisection uses K tail enclosures; a degree/alpha table with D entries and
P-bit certificates costs O(DP) before certificate metadata.
No observed duration or largest corpus count is a global resource bound.

Preliminary count ceiling 16 was chosen to execute every count 2..16 with exact
arithmetic and residual df 4..60, including odd and even counts. It is a small
investigation budget, not a justified support limit. The F cross-check sampled
df 4,8,60, not every count's probability domain.

## 7. Executed corpus and failures

The embedded script is disposable, not production or conformance code.
It runs in Python 3.12.13, x86_64, standard library only. No browser/runtime
matrix, compiler setting, process isolation or numerical platform is admitted.
The source SHA-256 before embedding is
`65b32feeb662b7dd3fdac36a3608e82c15b943a9a6d6086b0f05bd13b15558fc`.
Extract the Python fence verbatim to a temporary file and execute with Python 3.12.

Executed: all counts 2..16; isolated zero main and interaction contrasts;
permutation, sign reversal, scaling, translation, factor reversal and exchange;
Gram/SSE and decomposition equality; zero residual; overflow, underflow,
integer collapse and contrasting binary64 SS graphs; nine F oracle comparisons;
near-zero and adjacent critical-value float points; positive normal/subnormal/zero
tail projections; exact alpha equality and a nearest-even midpoint example.
Seven toy admission negatives cover count one, duplicate units, missing cell,
imbalance, infinity, NaN and signed zero. Their policy is a probe guard only.
All-equal global observations are not separately executed; zero residual is
executed with within-cell equality. Generic QR and a near-zero nonzero contrast
projection family remain unexecuted.

Six tampering controls alter trace/table/certificate/resource/environment/declared
manifest fields and demonstrate strict dictionary inequality only. They are
not a certificate validator or evidence that production tampering is detected.
No accepted table, trace format, certificate, environment predicate or declared
result comparator exists to attack. Those required system-level probes remain
INPUT_INCOMPLETE rather than being claimed from the toy controls.

Failed routes: importing mpmath failed with ModuleNotFoundError in both available
Python invocations. The first Decimal-series attempt at F=2^-40 exhausted 99,999
iterations; it was not silently reported as converged. The final comparison
corpus restricts x<=1/2, while low F is tested through the rational enclosure.
An initial use of Python's built-in sum hid the intended sequential-order
counterexample; an explicit loop now fixes its graph. An initial issue-body
hash command had shell interpolation errors and was discarded; the corrected
literal-byte computation produced the verified issue hash in section 1.
A page-read call with an unsupported viewport argument failed and was corrected.
These failures do not alter source or Protocol semantics.

## 8. Supported-execution and handoff holds

A future admission predicate needs exact executable/source hashes, dependency
lock hashes, runtime and architecture identities, floating-point rounding,
subnormal behavior, contraction/FMA and compiler flags where relevant,
process resource limits, locale/parsing and deterministic ordering.
A separate process should verify certificates and deliberately mutate each
bound identity, integer parameter, node, table entry, enclosure endpoint and
reported result. Cross-platform disagreement is evidence to adjudicate, never
a reason to widen tolerance silently. No Release 3 platform allowlist is copied.

Reusable in principle: exact binary64 input lifting, oracle separation,
direct-tail evaluation, monotone quantile brackets, checked integer dimensions,
bounded refusal and identity-bound evidence patterns. Not reused: an accepted
F algorithm, table, tolerance, platform, domain or certificate; none is pinned
as accepted here. Factorial cell membership, coordinate directions, averaging,
common residual variance, interaction and the three-claim family are new work.
Higher-factor orthogonal tensor algebra may reuse projection concepts;
regression, blocked, repeated and mixed models cannot inherit independence,
equal replication, fixed rank or common-error df without new research.

Blocking handoff items: independently reviewed semantic catalogue with exact
commit/tree/blob/review state; archived hashed numerical primary sources;
separate-context review of this exact report head and its self-derived proof;
portable projection proof; full QR/graph comparison and the omitted adversarial
cases; quantity-specific error budget; interval and adjustment evidence;
resource and supported-execution certificates. Reopen upon changed candidate
hypothesis, output coordinate, weights, missingness, rank, variance model,
source correction, input domain, graph, platform or precision.

Programme disposition remains `INPUT_INCOMPLETE`; no final feasibility labels
are assigned. A successor result must bind the reviewed semantic handoff and
obtain separate-context primary-source and numerical review before promotion.

## 9. Reproduction script

```python
from fractions import Fraction as Q
from math import comb, isqrt, nextafter, inf, copysign
from decimal import Decimal as D, localcontext
import sys, hashlib, platform

def algebra(cells):
    n=len(cells[0]); cells=[[Q(x) for x in c] for c in cells]
    means=[sum(c)/n for c in cells]
    signs=[[-1,-1,1,1],[-1,1,-1,1],[1,-1,-1,1]]
    contrast=[sum(s*m for s,m in zip(v,means)) for v in signs]
    ss=[n*c*c/4 for c in contrast]
    e=sum((x-m)**2 for c,m in zip(cells,means) for x in c)
    # Independent cell-indicator least squares: diagonal Gram solve,
    # total minus intercept and orthogonal fitted coordinates.
    totals=[sum(c) for c in cells]; fitted=[t/Q(n) for t in totals]
    e2=sum(x*x for c in cells for x in c)-sum(t*t/n for t in totals)
    assert e==e2 and means==fitted
    grand=sum(means)/4
    total=sum((x-grand)**2 for c in cells for x in c)
    assert total==e+sum(ss)
    return contrast,ss,e

def tail_bounds(f,nu,bits=256):
    # For nu even, a=nu/2 integer. Substitute t=1-u^2 in
    # integral B_x(a,1/2); full integral is a rational polynomial.
    a=nu//2; z=Q(f)/(nu+Q(f)); scale=1<<bits
    j=isqrt(z.numerator*scale*scale//z.denominator)
    lo=Q(j,scale); hi=Q(j+1,scale)
    def h(u):
        return sum(Q((-1)**k*comb(a-1,k),2*k+1)*u**(2*k+1) for k in range(a))
    den=h(Q(1))
    return 1-h(hi)/den,1-h(lo)/den

def series(f,nu,precision=100):
    with localcontext() as c:
        c.prec=precision
        a=nu//2; x=D(nu)/(D(nu)+D(f.numerator)/D(f.denominator))
        beta=Q(2)
        for j in range(1,a): beta*=Q(2*j,2*j+1)
        term=D(1); s=term
        for k in range(1,100000):
            term*=D(a+k-1)*D(2*k-1)*x/(D(a+k)*D(2*k)*1)
            old=s; s+=term
            if s==old: break
        else: raise RuntimeError('series cap')
        return x**a*s/(D(a)*(D(beta.numerator)/D(beta.denominator))),k

print(sys.version.split()[0],platform.machine())
for n in range(2,17):
    cells=[[((i+2)*k+3*i)%19-9 for k in range(n)] for i in range(4)]
    c,ss,e=algebra(cells)
    assert algebra([list(reversed(v)) for v in cells])==(c,ss,e)
    assert algebra([[x+1024 for x in v] for v in cells])==(c,ss,e)
    nc,nss,ne=algebra([[-x for x in v] for v in cells]); assert nc==[-x for x in c] and nss==ss and ne==e
    sc,sss,se=algebra([[8*x for x in v] for v in cells]); assert sc==[8*x for x in c] and sss==[64*x for x in ss] and se==64*e
    rc,rss,re=algebra([cells[i] for i in [2,3,0,1]]); assert rc==[-c[0],c[1],-c[2]] and rss==ss and re==e
    xc,xss,xe=algebra([cells[i] for i in [0,2,1,3]]); assert xc==[c[1],c[0],c[2]] and xss==[ss[1],ss[0],ss[2]] and xe==e
print('counts 2..16; six exact transformations; Gram and decomposition: PASS')
for means,zero in [([0,1,0,1],0),([0,0,1,1],1),([0,1,1,2],2)]:
    assert algebra([[m-1,m+1] for m in means])[0][zero]==0
print('three isolated zero contrasts: PASS')
def sequential(v):
    s=0.
    for x in v:s+=x
    return s
print('order',sequential([1e16,1.,-1e16]),sequential([1e16,-1e16,1.]))
v=[1e8-1,1e8+1]; print('SSE cancellation',sum(x*x for x in v)-sum(v)**2/2,sum((x-1e8)**2 for x in v))
print('extremes',1e308+1e308,1e-200*1e-200,'degree collapse',float(2**53)==float(2**53+1))
print('zero residual',algebra([[i,i] for i in range(4)])[2])
for nu in [4,8,60]:
    for f in [Q(nu),Q(8*nu),Q(2**100)]:
        lo,hi=tail_bounds(f,nu,1024)
        p,it=series(f,nu,150)
        # Decimal precision agreement is diagnostic, not enclosure proof.
        q=Q(p); assert abs(q-(lo+hi)/2)<Q(1,10**140)
print('9 F tails: exact enclosure vs 150-digit series PASS')
for power in [510,530,540,600]:
    f=Q(2**power);lo,hi=tail_bounds(f,4,4096)
    assert 0<lo<hi
    print('F=2^'+str(power),'positive',lo>0,'same binary64 projection',float(lo)==float(hi),'hex',float(lo).hex())
# Critical bracket at alpha=1/20, nu=4, independently enclosed bisection.
l,r=Q(0),Q(32);alpha=Q(1,20)
for _ in range(90):
    m=(l+r)/2;lo,hi=tail_bounds(m,4)
    if lo>alpha:l=m
    elif hi<alpha:r=m
    else:raise RuntimeError('precision insufficient')
assert tail_bounds(l,4)[0]>alpha and tail_bounds(r,4)[1]<alpha
print('critical bracket',float(l).hex(),float(r).hex(),'width',str(r-l))
center=float((l+r)/2)
assert tail_bounds(Q(nextafter(center,0)),4)[0]>alpha
assert tail_bounds(Q(nextafter(center,inf)),4)[1]<alpha
for x in [nextafter(0.,1.),nextafter(2**-40,0.),nextafter(2**-40,inf)]:
    lo,hi=tail_bounds(Q(x),4,2048);assert 0<lo<hi<=1
print('near-zero and adjacent critical projections: PASS')
def admission(cells,ids):
    if len(cells)!=4 or not cells or len(cells[0])<2:return False
    if len({len(c) for c in cells})!=1:return False
    if len(ids)!=sum(map(len,cells)) or len(set(ids))!=len(ids):return False
    return all(x==x and abs(x)!=inf and not (x==0 and copysign(1,x)<0) for c in cells for x in c)
good=[[1.,2.]]*4;ids=list(range(8));assert admission(good,ids)
assert not admission([[1.]]*4,list(range(4)))
assert not admission(good,ids[:-1]+[0])
assert not admission(good[:3],ids)
assert not admission(good[:3]+[[1.]],list(range(7)))
for x in [inf,float('nan'),-0.]:assert not admission(good[:3]+[[x,2.]],ids)
print('7 preliminary admission negatives: PASS')
manifest={'trace':'t1','table':'b1','certificate':'c1','resource':128,'environment':'e1','declared':'d1'}
for k in manifest:
    bad=dict(manifest);bad[k]='altered';assert bad!=manifest
print('6 manifest equality tampering controls: PASS (toy only)')
print('threshold equality',Q(1,20)==alpha,'projection midpoint',float(Q(1)+Q(1,2**53)).hex())
print('script sha256',hashlib.sha256(open(__file__,'rb').read()).hexdigest())
```

## 10. Validation record

Formatting the result with Prettier succeeded. Repository-wide `pnpm format:check`,
`pnpm lint:markdown` (357 files, zero issues), and `pnpm typecheck` passed.
`pnpm validate` failed before validator execution because the command wrapper
attempted an IPC socket and received `listen EPERM`; no permission escalation or
socket retry was attempted. The separately commissioned direct invocation
`node --import tsx tooling/src/validate.ts` is recorded separately below.
It passed (exit 0): registries, traceability, normative lint, authority,
gates, conformance manifest, links, private-dependency and language audits,
Phase 1 schemas, cross-checks, code-path audits and snapshot mechanism were clean.
The observed command runtime was Node 24.19.0 and pnpm 11.19.0, not the
package's requested pnpm 11.7.0; this is validation provenance, not an admitted
supported-execution environment.

Probe transcript (exit 0):

```text
3.12.13 x86_64
counts 2..16; six exact transformations; Gram and decomposition: PASS
three isolated zero contrasts: PASS
order 0.0 1.0
SSE cancellation 0.0 2.0
extremes inf 0.0 degree collapse True
zero residual 0
9 F tails: exact enclosure vs 150-digit series PASS
F=2^510 positive True same binary64 projection True hex 0x1.8000000000000p-1018
F=2^530 positive True same binary64 projection True hex 0x0.0000000018000p-1022
F=2^540 positive True same binary64 projection True hex 0x0.0p+0
F=2^600 positive True same binary64 projection True hex 0x0.0p+0
critical bracket 0x1.ed5a7ab7a937bp+2 0x1.ed5a7ab7a937bp+2 width 1/38685626227668133590597632
near-zero and adjacent critical projections: PASS
7 preliminary admission negatives: PASS
6 manifest equality tampering controls: PASS (toy only)
threshold equality True projection midpoint 0x1.0000000000000p+0
script sha256 65b32feeb662b7dd3fdac36a3608e82c15b943a9a6d6086b0f05bd13b15558fc
```
