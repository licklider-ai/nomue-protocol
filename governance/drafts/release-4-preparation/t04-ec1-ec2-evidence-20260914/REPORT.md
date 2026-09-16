# R4 T04 EC1/EC2 numerical-domain and bounded-procedure evidence

Status: informative, unissued author research, 2026-09-14.
EC1 REMAINS OPEN. EC2 REMAINS OPEN. No parameter is frozen and T04 is not complete.
This packet produces new evidence and explicit derivations; it does not perform
EC3, EC4, T05, a public integration or an independent review of itself.

## Fixed inputs and provenance

Direct branch base is architecture commit
`cd9d780ac06a3b998ff5d4717429b0177a222fe8`, whose direct base is completed T03
`d9ec6984f55f09caa2f65d7714af72190d63c6d4`. The user reports
`T04 ARCHITECTURE REPOSITORY REVIEW - GO`; that supplied disposition is accepted
without reopening E01/E02/E04. T03 D01-D07 remain fixed.

Prepared by OpenAI Codex in the continuing author conversation. No independent
investigator or subagent performed this work. Algorithmic separation below is
not investigator, hardware or Python-runtime independence. New derivations and
code require independent review before promotion. No new external source was
claimed to have been inspected; reviewed local mathematical and IEEE receipts
are reused only for their stated claims.

[INPUTS.json](INPUTS.json) binds 22 source files by the fixed architecture commit,
Git blob and actual read-byte SHA-256. It distinguishes these inspected bytes
from each receipt's own historical review target. [MANIFEST.json](MANIFEST.json)
records execution provenance and hashes of new artifacts. The containing Git
commit binds the manifest; it does not contain a circular self-hash.

## 1. Existing evidence reuse matrix

All rows are read at the architecture snapshot, with file bindings in INPUTS.
A review request is not an actual review receipt; a later containing commit is
not automatically the head that a historical reviewer executed.

| Evidence                                                                                                                                                                                                                        | Exact claim supported                                                                                       | Input/domain covered                             | Commit binding                                                                                                                                  | Independent review?                                                           | EC1/EC2 reuse and limit                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [T03](../t03-candidate-numerical-policy-decision-20260914.md)                                                                                                                                                                   | Targets, strict projection, zero/underflow/finite boundary, scoped decisions                                | Proposed public R4 quantities                    | d9ec6984f55f09caa2f65d7714af72190d63c6d4                                                                                                        | User-supplied completed decision process                                      | Fixed policy, not concrete work/procedure proof                                                          |
| [T04 architecture](../t04-candidate-execution-architecture-decision-20260914.md)                                                                                                                                                | Versioned predicate, deterministic procedure, parameter coupling                                            | Architecture only                                | cd9d780ac06a3b998ff5d4717429b0177a222fe8                                                                                                        | User reports architecture and repository GO                                   | Fixed architecture; concrete semantics remain open                                                       |
| [Opening RFC](../opening-rfc-candidate.md)                                                                                                                                                                                      | 22 mandatory scalars; mathematical/admissibility boundaries                                                 | Balanced replicated fixed 2x2                    | Blob 807e4bf0c22e5270b8fc15824329d04b5c37b146                                                                                                   | Opening review provenance preserved                                           | Quantity and dependency authority for candidate; no numerical support                                    |
| [Arithmetic report](../arithmetic-candidate-20260910/REPORT.md) and [review](../../../../review-inputs/r4-arithmetic-2864903/REVIEW-RESULT.md)                                                                                  | Integer moments, exact SSE/F, final rational projection; 968 dataset evidence                               | Finite binary64 arithmetic and bounded witnesses | Review target 2864903316b4b4b2b219a56b42c535bfec7935b3; review record 87adcec680f90271d0a6e571c1892ec38a392751                                  | Separate execution disclosed; separate-model independence unestablished there | Algebra and bounded checks; not whole support or promotion gate                                          |
| [Primary methods review](../../../../review-inputs/r4-primary-methods-20260911/REPORT.md)                                                                                                                                       | F/beta mapping, positive finite sum, root enclosure, relative width, polynomial oracle                      | Fixed arithmetic/tail inputs; no new adapter     | Commission bc1c1ace426d51e55c9551090f6e400af2ac17d2; author inputs 2864903 / 8d1979a; published review db67b69580b524b58822183895137bd37a5f6ecb | Separate-model review disclosed, no human independence claim                  | Bounded mathematics GO; original IEEE source hold read with later receipt; no full runtime/domain GO     |
| [IEEE review](../../../../review-inputs/r4-ieee-clause-confirmation-20260911/REPORT.md)                                                                                                                                         | Binary64 lattice, ties-even, monotonic projection, signed-zero qualification, conservative range convention | Listed IEEE clauses and bounded checks           | Input manifest names review 864766232988181e72ae18c235dbc815466b3a1d; exact current bytes separately pinned                                     | Separate clause-level review record                                           | Supports projection reasoning, not new candidate-set semantics or whole-domain closure                   |
| [Rational composition report](../rational-tail-composition-20260911/REPORT.md) and [receipt](../rational-tail-composition-20260911/EXTERNAL-REVIEW.md)                                                                          | Rational F composition and repaired experimental admission                                                  | Research n=2..65 with width/work guards          | Initial cd121030d40942493d24c104ff87e05070826c42; repair receipt bdc2cc4; inherited source c61e734a1f19f6572100f2594dd24b1e01ea4d49             | User-supplied bounded reviews; identity/raw independence unverified           | Guard rationale and regression, explicitly not a proved operation/time bound                             |
| [Rational candidate](../tail-evidence-experiment-20260911/rational_candidate.py) and [budget](../tail-evidence-experiment-20260911/budget.py)                                                                                   | Exact implemented finite sum and guard behavior                                                             | n<=65, w<=6500, helper bits 8..2048              | Inherited source c61e734a1f19f6572100f2594dd24b1e01ea4d49; byte pins in local INPUTS                                                            | Via bounded predecessor receipts                                              | Comparison subject; implementation behavior alone is not soundness proof                                 |
| [Complete procedure](../tail-evidence-experiment-20260911/complete.py)                                                                                                                                                          | Exact-F tail handoff, all-contrast preflight, 13-real experimental output                                   | Experimental schedule 128/256/512                | Wrapper predecessor f8f3feb71404962262d1a9f78b5d37f04454f746; runtime SHA in inherited INPUTS                                                   | Scoped predecessor review/intake                                              | Does not implement 22-scalar public comparison or continue after first unresolved                        |
| [Probability consumer](../tail-evidence-experiment-20260911/REPORT.md)                                                                                                                                                          | Expected-input binding, containment and unique projection                                                   | Optional submitted intervals, bounded experiment | Supplied review target 60d62f61eb8bd5bf4c915098b6af50a683122025                                                                                 | User-supplied receipt, identity/raw artifacts absent                          | Binding/negative tests only; D05/D06 exclude a mandatory public carrier; no generic interval truth proof |
| [Controlled execution](../controlled-execution-experiment-20260912/INPUTS.json)                                                                                                                                                 | Frozen runtime identity and experimental invocation separation                                              | Trusted worker; historical caps                  | P=2732a26fd61d4e726fbd95b4d7622574cfcd9d82; numerical inheritance 97ef2926dbea7251d9fa611d4ada6513341f9826                                      | T02 close supplied as complete                                                | Reuse exact bytes; no EC3/EC4 investigation here                                                         |
| [R2 Group 1](../../release-2-candidate/numerical/candidate-supported-scope-resource-bounds-candidate.json)                                                                                                                      | Count/domain/resource selection tied to complete graph and reviewed extents                                 | R2 paired-t candidate, not R4                    | Candidate 000705ccc3b29d3ef449c5c050e7dba4723a3cab; review b3ad38ea36ea66573033133ee94889508f72308f                                             | Independently reviewed candidate                                              | Methodology only; do not copy 201, Student-t policy or normal-only p restriction                         |
| [R2 review protocol](../../release-2-candidate/reviews/d5-candidate-supported-scope-resource-bounds-adversarial-review-protocol.md) and [M2 review](../../../../review-inputs/r2-d5-m2-tail-numerical-closure/REVIEW-RESULT.md) | Exact graph/node counts, immutable bindings and truth/error closure before support                          | R2 scoped candidate                              | M2 reviewed head 764674bdd3f72ac7774ad456854e8e3a05183765                                                                                       | Recorded independent bounded review                                           | Reuse review discipline, not a mathematical theorem about R4                                             |

## 2. Full mandatory quantity graph

Let U=2^1074, z_ci=U*y_ci (an integer), S_c=sum_i z_ci,
Q_c=sum_i z_ci^2, n the common cell count, and
E=n*sum_c Q_c-sum_c S_c^2. Define
C_A=-S00-S01+S10+S11, C_B=-S00+S01-S10+S11,
C_AB=S00-S01-S10+S11. The full inventory is 22 scalar comparisons:
17 real quantities plus four counts and one residual df. Experimental df pairs
and coded regression coefficients do not add public fields.

The graph is counts and observations -> S/Q -> means, contrasts and E ->
effects/SS/SSE -> exact F -> exact tail -> projection candidates -> comparisons.
The displayed F is never substituted for exact F. Declared values do not supply
preflight truth. Existing conformance and admissibility gates remain upstream.

| Quantity    | Count | Exact target and dependencies      | Public projection / refusal                                                                      | Comparison and candidate set                                        | Cost driver                                       |
| ----------- | ----- | ---------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------- |
| Cell counts | 4     | Actual resolved observation counts | Exact safe integer; invalid design belongs to prior gates                                        | Exact integer singleton                                             | Scan all 4n observations                          |
| Cell means  | 4     | S_c/(nU)                           | T03 nearest-even; canonical public zero; finite by convexity of finite inputs                    | Exact rational projection singleton                                 | Summation, reduction, projection                  |
| Residual df | 1     | 4(n-1)                             | Exact safe integer                                                                               | Exact integer singleton                                             | Constant integer work after count                 |
| A effect    | 1     | C_A/(2nU)                          | T03 D02/D04, including nonzero rounded zero and conservative finite refusal                      | Exact rational projection singleton                                 | Contrast, reduction, projection                   |
| B effect    | 1     | C_B/(2nU)                          | Same                                                                                             | Same                                                                | Same                                              |
| AB effect   | 1     | C_AB/(nU)                          | Same; full difference in differences                                                             | Same                                                                | Same                                              |
| SS A/B/AB   | 3     | C_j^2/(4nU^2)                      | Nonnegative finite projection; D02 rounded zero allowed; D04 refusal                             | Exact rational projection singleton                                 | Squaring, reduction, projection                   |
| SSE         | 1     | E/(nU^2)                           | Exact zero: computability fail; positive rounded zero: representation/computability refusal; D04 | Exact rational projection singleton only after gates                | Exact moments or residual squares                 |
| F A/B/AB    | 3     | (n-1)C_j^2/E, E>0                  | Finite boundary; rounded display zero allowed; exact F retained                                  | Exact rational projection singleton                                 | Numerator growth, gcd, projection                 |
| p A/B/AB    | 3     | F(1,4(n-1)) survival at exact F_j  | D03: no positive-tail zero match; positive subnormals retained                                   | Sound encoding range or other reviewed construction; bounded stages | Tail enclosure/sign method, projection boundaries |

Repeated experimental SSE/F checks do not establish raw-Record identity or
admissibility. The new checker starts with parsed, ordered cells; it is not a
Record parser or a public verifier. T03 requires comparison of all 22 scalars,
not just a tail-only budget or the old 13-real output.

## 3. Exact preflight boundedness: author derivation for review

This is an algebraic worst-size proposal, not a wall-time, heap or formal
machine-verification claim. Put L=2098 and r=ceil(log2 n)=(n-1).bit_length().
Every finite binary64 y has integer |z|<2^L: the largest normal significand
has 53 bits and its lattice shift is 2045. No extra observation exponent box
is necessary to obtain a finite size bound once a practical count bound is
chosen. Such a box might reduce cost, but it would narrow public membership.

| Operation                                 | Input-size driver                      | Integer/rational growth bound                                                           | Operation-count driver                                                                             | Existing / missing bound                                             |
| ----------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Decode parsed finite binary64             | 4n fixed-width scalars                 | abs(z)<2^L                                                                              | 4n decodes                                                                                         | Lattice source reviewed; parsed input only                           |
| S_c and Q_c                               | n per cell                             | abs(S_c)<2^(L+r); Q_c<2^(2L+r)                                                          | 4n squares and 8n additions                                                                        | New explicit worst-size derivation; independent review needed        |
| Means                                     | S_c, nU                                | Numerator bits <=L+r; denominator bits <=1075+r                                         | Four reductions                                                                                    | Finite mean follows convexity; cost not from F width                 |
| Deviations for independent residual route | nz-S                                   | Absolute numerator <2^(L+r+1), denominator nU                                           | 4n subtractions/multiplications                                                                    | Not needed by moment route; included to avoid omitting oracle cost   |
| Squared deviations / sum                  | 4n deviations                          | Numerator sum <2^(2L+3r+4), common denominator n^2 U^2                                  | 4n squares and summation                                                                           | Rational cancellation is exact; not floating cancellation            |
| E                                         | n*sum Q and sum S^2                    | Both nonnegative terms <2^(2L+2r+2); 0<=E below same bound                              | Four S squares plus fixed work                                                                     | Size bound survives near cancellation                                |
| C_j and C_j^2                             | Four S values                          | abs(C_j)<2^(L+r+2); C_j^2<2^(2L+2r+4)                                                   | Three fixed linear combinations and squares                                                        | New bound includes signs                                             |
| SS/SSE denominators                       | n and U^2                              | SS denominator bits <=2151+r; SSE denominator <=2149+r                                  | Fixed denominator construction                                                                     | Gcd reduction does not increase size                                 |
| Unreduced F numerator / denominator       | C_j, E, n                              | Numerator bits <=2L+3r+4; denominator <=2L+2r+2                                         | Three products, then reductions                                                                    | Final reduced width alone is insufficient                            |
| Gcd / reduction                           | Above operand sizes K                  | Inputs <=K bits; outputs no larger                                                      | Euclid has <=2K+1 remainder steps as a loose bound                                                 | Constructive bounded implementation exists; no Python timing theorem |
| Bit length and projections                | Reduced pairs and fixed encoding space | Bit length scans bounded operands; midpoint products add bounded binary64 lattice width | 14 arithmetic projections, <=63 ordered-encoding comparisons each, or equivalent quotient rounding | Counts/df are exact; tails accounted separately                      |

A constructive moment graph needs 4n decodes, 4n squares, 8n accumulation
additions and fixed-size graph work, followed by 14 rational reductions and
projections. This is an O(n) count of large-integer operations, not O(n) bit
complexity. Schoolbook multiplication and long division with the displayed bit
bounds give a finite constructive bit-cost bound; efficient implementations
can differ while preserving the result. E>=0 and the constant-within-cell
zero condition follow from the sum-of-squares identity, not tests alone.

Two consequences are material:

1. Even at the RFC representational maximum n<=2^51-1, r<=51 gives reduced
   F component width <=2*2098+3*51+4=4353. Thus w<=6500 is redundant for
   F derived by this graph from conforming finite binary64 observations.
   It still restricts a standalone arbitrary-F research API. This bound needs
   independent review; it does not make the RFC maximum practical.
2. Small reduced width does not bound earlier cost. A tested n=2 large-common-
   offset dataset has all F widths equal to 1, while Q reaches 3150 bits and
   E reaches 3047 bits. Opposite max-finite inputs reach 4200-bit E with the
   same reduced F widths, though their SSE then fails public representation.

## 4. Reconstructed domain candidates and n decision

Define a candidate family D(N,B,bmax): upstream conformance/admissibility holds;
2<=n<=N; exact arithmetic follows the bounded preflight above; all mandatory
arithmetic targets satisfy T03 representation gates; then each exact F satisfies
the selected deterministic cost predicate B(n,w_j,bmax). Tail public eligibility,
including positive-p underflow, has a separately specified bounded gate. False
membership is distinguished from failure to evaluate it. No elapsed time,
Python object size or observed allocation enters membership.

All mandatory arithmetic and all-contrast domain checks precede dependent tail
comparisons. Record-level admission is the conjunction of per-quantity guards;
preflight does not pass a Record merely because the first contrast is cheap.
The cost of establishing membership itself is part of the procedure.

| Candidate | Concrete research input                                                                        | What it establishes                                                                | Why not frozen                                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| J65       | N=65, old joint scores, bmax=512, T03 gates                                                    | Reconstructible starting point, with new complete-preflight size explanation       | 65 and score constants lack whole-procedure selection rationale; underflow gate and candidate semantics need selection |
| J70       | Remove standalone 65; retain old scores at 512 and derive n<=70 before exact work              | Shows an input-count precheck can follow from a deterministic aggregate constraint | Inherits unproved score adequacy and changes historical membership; 70 is not a new accepted boundary                  |
| J-cost    | N derived jointly from a selected bit-operation budget and full arithmetic/tail/decision costs | Implementation-independent route with a complete cost model                        | Budget, useful range and tail procedure not yet selected                                                               |

Why 70 arises: reduced nonnegative F always has w>=1. With bmax=512,
a^2(w+512)<=10,000,000 implies a<=138 for even a=2(n-1), hence n<=70.
At n=71 even the cheapest width fails. At n=65 the separate a^2*w score
allows w<=61. At bmax=1024, the cheapest-width count ceiling falls to 50.
These are consequences of historical constants, not mathematical natural limits.
The width=6500 cap does not repair their missing full-procedure cost rationale.

There is no special mathematical, representation or finite-sum transition at 65.
The source explicitly calls it a research budget, not a proposed supported count.
Exact arithmetic and F=0 tail identity work for larger counts: new n=66/70/71/128
fixtures establish that bounded fact, while the historical tail API still refuses
n>65. No guard was bypassed to claim historical support. Work-only admission
at n=70 is reported separately from its failing historical n gate.

Decision: retain a count bound, or a cheaply evaluable deterministic work bound
that implies one, together with other size/work/representation predicates.
Do not freeze 65, 70 or another value yet. n alone misses dynamic range; final
F width alone misses preflight cost; count safe-integer range is representation,
not practical numerical support. Material count/whole-procedure evidence remains
open, so neither J65 nor J70 is promoted by these finite tests.

## 5. Candidate-set construction and proof obligations

For exact arithmetic outputs the target is rational, so a separately reviewed
exact nearest-even projection yields a singleton after its representation gate.
Counts and df are exact integer singletons. Received negative-zero tokens remain
upstream refusals; a generated rounded-zero value uses public zero with exact
versus rounded-zero state, without normalizing invalid received tokens.

For a tail, nu=4(n-1), a=nu/2 and q=exact F. For q>0 set
x=2a/(2a+q), z=q/(2a+q), r=sqrt(z). The reviewed target is
p=integral_r^1 (1-u^2)^(a-1) du / h, with
`h=2^(2a-1)*a!*(a-1)!/(2a)!`.
At stage b, integer root bracketing gives l<=r<=u on a 2^-b grid.
Bounds on d=x/(1+r) and s=1+r feed the positive monomial sum from the
pinned rational candidate. Positive coefficients and powers preserve enclosure;
refinement tightens l/u and therefore nests the resulting intervals.
The existing primary-methods review supports these algebraic steps, not this
packet's complete decision construction or its work selection.

For a valid closed interval [L,U] inside [0,1], define the raw encoding range
as every integer code from RN(L) through RN(U), inclusive. Monotonic ties-even
rounding and its adjacent midpoint cells imply that this is exactly the image
of the whole closed interval. A pair of endpoints denotes an inclusive range,
not the two-element set containing endpoints only. Interior encodings cannot
be dropped. The checker independently intersects rounding cells with intervals,
including exact midpoint parity, zero/subnormal and normal transitions.

This is not yet sufficient to select the public eligible set at the zero
boundary. If positive p projects to zero, T03 prohibits a public match. If the
interval's raw projection range is [0,k], deleting zero without proof that the
true projection is eligible is unsound. If k=0, underflow is certified. If
k>0, representation eligibility is not established merely by projection range.
The checker labels that situation underflow_gate_unresolved_OPEN, an internal
research diagnostic, not a new public outcome or permission to use D07 before
its gate. One concrete remedy is the exact-sign eligibility test below; its
selection, cost and independent review remain open. This is an EC1/EC2 coupling,
not a reopening of T03 D03.

### Separate exact-sign oracle: new derivation, not selected method

The already-reviewed polynomial is H(r)=r*P(z), where
P(z)=sum\_{j=0}^{a-1} (-1)^j binom(a-1,j) z^j/(2j+1) and h=P(1)>0.
For 0<=z<1, P(z)=integral_0^1(1-z*v^2)^(a-1)dv>0.
Consequently T=z*(P(z)/h)^2=(1-p)^2 is rational. For any rational v in [0,1],
sign(p-v) is the opposite of sign(T-(1-v)^2). Positivity is essential before
squaring. This supplies an exact comparison with every binary64 midpoint
without root approximation. At q=0, T=0 and p=1.

The new oracle evaluates P by rational Horner recurrence, then uses at most 63
ordered-encoding search comparisons and exact midpoint parity. It imports no
historical numerical implementation. On tested cases it provides an exact
projection to check the historical enclosure, not merely an overlapping second
interval. The 180/300/600-bit rational-root witnesses also have independently
known rational p and validate this sign route directly.

This derivation offers two possible future uses: an exact underflow eligibility
precheck while retaining a selected staged public comparison, or an exact-sign
terminal procedure with different decision capability. It is not silently used
to upgrade a staged check's prescribed indeterminate result. The new construction
has not received independent proof-to-code or full-cost review:
RESEARCH GATE REQUIRED before promotion to a public-method basis.

## 6. Precision and work assessment

b in the historical candidate is the number of fractional bits in the dyadic
square-root bracket, not decimal precision, output precision or p significant
bits. The reviewed relative enclosure factor is at most
(1+2^-b)^(2a-1) for finite positive q. At n=65 its exponent is 255.
It becomes small quickly, but supplies no positive separation from every
binary64 midpoint. Even tiny intervals can straddle a rounding boundary.

| Schedule candidate                                                        | Assessment                                                                                                                                                                                                             |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-A: 128/256/512                                                          | Existing deterministic stages and nesting; reuse possible, not selected. Final ambiguity remains part of its decision semantics                                                                                        |
| P-B: another fixed finite schedule, e.g. terminal 512 or 128/256/512/1024 | Different costs and potentially different public decisions; compare on the same inputs, with domain coupling                                                                                                           |
| P-C: input-derived stages with versioned maximum stages/work              | Possible if derived solely from mathematical input and prescribed rules. Needs exact formula, stage/decision equivalence and full cost evidence                                                                        |
| P-D: exact-sign terminal comparison                                       | Newly derived alternative with finite rational work and no numerical projection ambiguity in its mathematical scope; may materially change which schedule/budget is appropriate. Not adopted or independently reviewed |

The original 36 exact-F cross-grid cases have, at each of 128/256/512, 26
singleton ranges, six certified positive-p underflows and four work refusals.
These are chosen probes, not a population resolution rate or an all-domain proof.
Three additional exact-F inputs are constructed near a p midpoint with dyadic
sqrt(z) of 180, 300 and 600 bits. Their exact rational tails are known. They
exercise refinement beyond 128 and unresolved-at-512 behavior resolved at 1024.
Their realization by a complete raw binary64 Record is not established; do not
use them as proof of a public-domain unresolved rate.

The raw-observation fixture positive_p_underflow separately realizes exact
F_A=2^541 with positive representable SSE and finite arithmetic projections;
its positive tail projects to zero. This tests a real input-domain boundary,
not just an arbitrary F. The independent sign oracle remains test evidence,
never a runtime replacement.

Historical guard provenance:

- w<=6500 is an absolute standalone rational-operand research ceiling.
- a^2(w+b)<=10,000,000 and a^2*w<=1,000,000 were introduced after an external
  review reported impractical large-width n=65 inputs. They proxy monomial
  operand growth times term count. The receipt explicitly denies a proved
  CPU-operation or wall-time guarantee.
- The guards cover tail admission. They do not account for decoded input,
  arithmetic preflight, all public quantities, candidate-set decisions or
  evidence size. Changing bmax can change both admitted n/w and decisions.
- Classification: experiment-only as selected constants; useful engineering
  guards, but replace/refine required for the complete public cost contract.
  Their mathematical form could be publicly defined; that alone does not
  justify their adequacy or thresholds.

### Constructive tail bit-growth envelope for review

Let ell=ceil(log2(2a)), t=w+ell+2 and D=t+b+2. The reduced x/z components
have at most t bits; d/s endpoint rational components have at most D bits.
One monomial has total degree 2a-1. A conservative envelope for its numerator
and denominator, including factorial coefficients and normalization, is
B=2a*D+6a*ell+4a+8 bits. A sum of a such rational terms has components bounded
by a*B+ceil(log2 a)+2 bits using a product common denominator. Gcd reduction
never increases these bounds. This deliberately loose envelope explains why
a^2(w+b) resembles an operand-growth proxy but is not a bit-operation count:
multiplication, powering and gcd costs on those operands still need accounting.
Repeated multiplication supplies O(a^2) multiplications per endpoint/stage;
three tails and every scheduled stage are included. These are author-derived
constructive bounds, not a calibrated supported work budget.

For the exact-sign alternative, a Horner common denominator can be bounded by
z_den^(a-1) times the product of a odd coefficient denominators, giving a bit
bound of (a-1)*t+a*ell+1. Intermediate numerator magnitudes add at most an O(a)
coefficient bound; normalized T requires bounded products and squares, followed
by at most 63 rational comparisons. Proving a tight accounting, comparing it
with the positive-sum procedure and selecting the budget remain material work.
The new oracle demonstrates feasibility on its corpus, not reference runtime
support, EC3 coverage or a whole-domain cost calibration.

## 7. Mandatory aggregation and reproducibility

Candidate procedure skeleton:

1. Preserve upstream conformance/admissibility and independent check scopes.
2. Evaluate the bounded count and exact-arithmetic preflight; evaluate every
   mandatory representation/domain condition required for dependent work.
3. Resolve counts/df and all 14 non-tail real projections exactly where eligible.
4. For each eligible tail use the same versioned construction/stages. Finalize
   a quantity on a sound singleton match or proved mismatch. Continue other
   executable comparisons after an unresolved quantity.
5. Within a normally completed valid comparison scope: all mandatory pass ->
   pass; any proved mismatch -> fail; otherwise a remaining mandatory unresolved
   comparison -> indeterminate. Failed dependencies stay not_run; skipped checks
   do not produce vacuous pass or fabricated numerical values.
6. Invocation failure suppresses provisional completed results. This is preserved
   architecture, not new execution/resource evidence in this packet.

The checker includes late mismatch after unresolved, no-fail unresolved,
all-22-pass, dependency gating and invocation-failure suppression controls.
These finite controls check the skeleton, not an implemented public report.

Membership, mandatory comparisons and normally completed public decisions are
identical for the same Record and check version. Internal algorithms, memory
layout and optimization may differ. Public evidence encoding may differ only
where not fixed by its eventual contract, while preserving honest identity,
soundness and the canonical decision. A concrete candidate range can be the
canonical mathematical decision reference without requiring identical bytewise
internal interval objects. Decision-equivalence needs demonstration. A stronger
private method is not permission to replace that version's unresolved decision.
No exact evidence encoding or public schema is selected here.

## 8. New artifacts, validation and reproduction

- check_evidence.py: independent residual arithmetic, quotient projection,
  inverse rounding-cell checks, polynomial bracket and new exact-sign oracle;
  historical arithmetic/tail routines are comparison subjects only.
- RESULTS.jsonl: deterministic canonical JSON line, with 34 raw-cell fixtures,
  36 exact-F tail cases at three stages, three midpoint-tail cases up to 1024,
  528 n/width/precision guard rows, boundary controls and explicit open gaps.
- INPUTS.json: fixed input commit, source blobs and read-byte hashes.
- MANIFEST.json: commands, environment, output and artifact hashes.

From the repository root, without importing production code or writing pycache:

```text
python -B governance/drafts/release-4-preparation/t04-ec1-ec2-evidence-20260914/check_evidence.py --check
python -O -B governance/drafts/release-4-preparation/t04-ec1-ec2-evidence-20260914/check_evidence.py --check
```

The initial evidence command substitutes --write for --check. The check mode
requires byte equality with the saved canonical JSONL. Result bytes exclude
wall-clock/environment variation; environment and actual executable hash live
separately in the manifest. Normal/optimized agreement does not establish a
supported Python/host profile. Windows CPython 3.12.10 is a research execution
host, not the Linux worker validation basis. No full numerical experiment,
reference supervisor, EC3 or EC4 test is run.

## 9. Research Gate and remaining gaps

Existing primary-methods and IEEE reviews are reusable for their bounded
algebra/clauses. They do not review the new growth theorem, exact-sign oracle,
public eligible candidate-set construction, domain selection or complete
aggregation. RESEARCH GATE REQUIRED for promoting the new concrete numerical
method/derivations; no separate primary investigator is claimed in this packet.
No newly imported external method is declared source-reviewed by this author.

Material gaps are specific and can change parameter selection:

- G1: choose and independently justify a count/full bit-work budget. The old
  scores omit stages; their constants do not select 65 or 70. Review the new
  growth bounds and cost arithmetic, not just sampled bit lengths.
- G2: select the tail underflow eligibility gate. A range straddling zero cannot
  simply discard zero or enter D07 with unproved eligibility. The new exact-sign
  test is a concrete route requiring cost and proof review.
- G3: compare staged finite-sum and exact-sign terminal procedures. The latter
  may remove numerical ambiguity with different cost; its existence can change
  the appropriate schedule, candidate-set construction and work predicate.
- G4: establish useful resolution / refusal behavior over the selected raw-input
  domain. Exact-F midpoint witnesses are not yet raw-Record realizations; finite
  ordinary probes do not prove a domain separation or utility guarantee.
- G5: complete and independently review the 22-quantity candidate with its
  underflow/domain gates and aggregation. Algebra and skeleton tests do not
  constitute public-check implementation or whole candidate closure.

EC1 REMAINS OPEN: concrete research alternatives are bound to evidence, but G1,
G2 and G3 can alter membership/parameters. EC2 REMAINS OPEN: exact soundness and
refinement inputs have advanced, but G2-G5 can alter the concrete procedure.
Neither satisfies the user's READY condition that remaining gaps cannot overturn
parameter choice. These are evidence gaps, not a request to shrink the domain
arbitrarily or to label most inputs indeterminate. Architecture remains fixed.

T04 is not complete. EC3, EC4 and T05 remain untouched. Architecture/T03 branches,
PR #331, main, all historical sources, receipts and captures are preserved.
