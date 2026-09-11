# Release 4 arithmetic execution candidates

Status: **author-side exploratory candidates, ready to request independent review**.
Date: 2026-09-10. Lane 1 covers means, signed estimates, coded coefficients,
SS, SSE, degrees of freedom and F. Numerical support remains **NOT_ESTABLISHED**;
no procedure, tolerance, identifier, bundle, release or additional gate is adopted.

## 1. Role, fixed inputs and current authority

The author is OpenAI Codex in this task conversation. Prior continuity summaries
were visible. No separate agent, model or human investigator performed this work.
Algorithmically separate candidate and oracle programs are provided, but this
is not an independent review, a human review or an author-issued independent GO.
The exact served model/build is not available as authenticated runtime metadata.

The checkout and sole intended commit parent are
`dedd26a3e0655001b67e40ccfb741e43ecb07beb`, tree
`31cade5ea601c896a1841296a3d3aca14bae479d`.
The separate opening/proposal input is
`022c8699befbcba375e3aa6e07c1a8dd8eace483`, tree
`ea0c0dd13b7af1b1efd6a6c9c42815ca1d45600d`.
[INPUTS.json](INPUTS.json) records existence, parents, trees, file blobs,
SHA-256 and sizes at both inputs, including the ordered Read-first documents.
There is no governance-directory AGENTS.md at the base. No private product
repository was read or used.

At the recorded fetch, origin/main equals BASE exactly: no intervening authority
or semantic change. The proposal is on the unmerged [draft PR 249](https://github.com/licklider-ai/nomue-protocol/pull/249),
not part of BASE. Its opening and candidate files are absent from BASE; this is
intentional separate-input use, not missing-data substitution or a cherry-pick.
The live PR and issue responses are preserved in [pr-249-snapshot.json](pr-249-snapshot.json)
and [issue-261-snapshot.json](issue-261-snapshot.json).

The operational state is PUBLIC_DISCUSSION_OPEN in
[issue 261](https://github.com/licklider-ai/nomue-protocol/issues/261), opened
2026-09-09T05:59:47Z. The proposal's older pre-opening text and the acceptance's
NOT_READY wording remain historical. PR 260 supplies the recorded opening-review
GO, not numerical support. The earliest stated decision time is
2026-10-09T05:59:47Z, with no automatic adoption.

The five other requested files were reconciled between the two inputs. BASE's
latest power-scale explanation corrects the mixed-case QR residuals: the six
smaller observations carry them; the two 0.5 observations have zero residual.
The numerical scripts, transcripts and review blobs did not change. The older
proposal branch's contrary sentence is not used as current evidence.

## 2. Reused evidence and its limits

| Input evidence                                                                           | Reuse here                                                                                     | Retained boundary                                                                                                             |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Normal-model steward acceptance, PR 246 source/derivation review and repair confirmation | Three contrasts, full interaction, SS normalization, residual df and individual-null F meaning | Accepted derivation plus supplied-paper criteria; no new PDF inspection or claim that the paper proves every probability step |
| Programme steward acceptance and PR 232 audit/repair record                              | Continued disposable research and accepted preparation                                         | No numerical adoption or new authority                                                                                        |
| SS/F supplement and its numerical review                                                 | Exact-input corpus, three historical graphs, interpreter dependence, exact-zero diagnostics    | Finite evidence only; graph accuracy and source/calibration are separate                                                      |
| Power-scale exploration, repair and close-review correction                              | Uniform extremes, common offset, mixed scale and residual-location witness                     | Scaling neither lossless in general nor sufficient                                                                            |
| Pinned opening candidate and PR 260                                                      | Current proposed exact quantities and representation boundaries                                | Issuance and execution held; no widening to other designs                                                                     |

The review records were inspected for the relevant verdicts, arithmetic derivation,
reproduction and limitations, not re-performed as new independent source reviews.
The accepted source obligations and staged wider holds remain unchanged. Research
Gate requirements for new numerical methodology remain unfulfilled for promotion:
the integer path, projection procedure and anchored floating alternative need a
separate primary-source/derivation and implementation review. They are isolated
research code, not reference-verifier implementation behavior.

## 3. Exact mathematical target and operation crosswalk

Input is four arrays in declared 00,01,10,11 order with the same n >= 2. Each
scalar is the exact real value of the supplied finite binary64 value, not the
pre-conversion decimal or an intended higher-precision measurement. Factor and
level identity resolution belongs to the proposed upstream conformance checks;
these research routines start with already ordered arrays, not Record JSON.
They do not implement ingress, unit-identity or model-declaration checks.

Let m be the four exact sample cell means. Define the sign vectors
A=(-1,-1,+1,+1), B=(-1,+1,-1,+1), AB=(+1,-1,-1,+1).

| Quantity           | Exact target                                               | Evaluated floating or integer path                                                                            |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Cell mean          | m_c = sum_i y_ci / n                                       | Historical sum/divide; anchored mean; or integer S_c/(n U)                                                    |
| Signed A estimate  | d_A = (-m00-m01+m10+m11)/2                                 | Twice coded beta_A in historical cell graph; paired differences in anchored graph; C_A/(2n U) in integer path |
| Signed B estimate  | d_B = (-m00+m01-m10+m11)/2                                 | Analogous, preserving B sign vector                                                                           |
| Signed AB estimate | d_AB = m00-m01-m10+m11                                     | Four times beta_AB; difference in differences; C_AB/(n U)                                                     |
| Coded coefficients | beta0=sum(m)/4; beta_A=d_A/2; beta_B=d_B/2; beta_AB=d_AB/4 | The coefficient and the signed estimate are distinct quantities                                               |
| SS_A, SS_B, SS_AB  | n d_A^2, n d_B^2, n d_AB^2/4                               | Historical left-associated (4n beta) beta; anchored (n d) d with d_AB/2; integer C_j^2/(4n U^2)               |
| SSE                | sum_c,i (y_ci-m_c)^2                                       | Historical residual squares; anchor-residual squares; integer E/(n U^2)                                       |
| Degrees of freedom | numerator 1 each; residual nu=4(n-1)                       | Exact integer; derived from actual array count                                                                |
| F_j                | nu SS_j/SSE, only if exact SSE>0                           | Historical SS/(SSE/nu); integer (n-1) C_j^2/E                                                                 |

Under the fixed proposal, n <= 2251799813685247 and nu <= 9007199254740984
are representational bounds, not runtime support. Exact SSE=0 gives undefined F,
even when SS>0. No infinity-valued statistic or zero tail is substituted.
The candidate returns missing F in its diagnostic object; that object is not a
permitted proposed BTF result, whose SSE is positive and whose three F/tail pairs
are required finite values. Subnormal inputs and negative responses are included.
Signed zero has no mathematical distinction here; Record ingress remains separate.

## 4. Competing computation paths

[float_graphs.py](float_graphs.py) loads only the literal sign matrix and `graphs`
function from the pinned historical SS/F script using AST. It never imports that
script's exact routine into the new oracle. The unmodified historical script is
also rerun separately as a provenance comparison.

1. **Historical cell, QR and centered QR.** The exact source defines operation
   order; QR uses reduced NumPy QR, solve and response-minus-fitted residuals.
   Centered QR subtracts the initial observation before both fit and residuals.
   CPython sum and the NumPy/BLAS implementation are part of the observed graph.
2. **The same three graphs after common scaling.** Set k=-frexp(max(abs(y))).exponent,
   transform by ldexp(y,k), and compare to the exact values of the transformed
   binary64 inputs. Each original/transformed scalar and every lost index are
   recorded. Scaled SS/SSE are in scaled units; recovery of original units would
   multiply by 2^(-2k), which can itself fail binary64 projection. F is unchanged
   mathematically only when the transformation is lossless (or by coincidence).
3. **Minimal anchored-cell alternative after common scaling.** Subtract each
   cell's first value, use math.fsum of these deviations divided by n, compute
   residuals before adding the anchor back, and form pairwise mean differences.
   This avoids one common-offset residual failure. It still rounds means, anchor
   subtractions, contrasts and squares, and can lose mixed-scale inputs.
4. **Integer-lattice candidate with final binary64 projection.** Decode input bits
   exactly, aggregate integers, form rational quantities and only then project.
   It removes intermediate floating arithmetic rather than claiming a repaired
   QR graph. It costs larger integer operations and still encounters output-range
   and representation limits. This is a candidate for review, not the selected
   final algorithm.

A restricted-domain floating route remains an alternative, but neither an admission
predicate nor a proved error bound is supplied for it. Successful probes do not
select such a predicate. No general QR stability claim is refuted or imported.

## 5. Integer candidate derivation and proposed enclosures

[candidate.py](candidate.py) uses U=2^1074. Every finite binary64 input has an
integer z=y U. From the bit pattern, subnormal z is its fraction field; a normal
value has z=(2^52+fraction) shifted left by exponent_field-1, with its sign.
No rescaling into a smaller float discards low bits. This decoding is distinct
from the oracle's `as_integer_ratio` conversion.

For each cell collect S_c=sum z and Q_c=sum z^2; put C_j=sum signs_j S_c and
E=n sum Q_c - sum S_c^2. Expanding exact within-cell residual squares gives
SSE=E/(n U^2). Hence all entries in Section 3 follow by substitution, especially
F=(n-1) C^2/E without squaring or dividing in binary64. Cancellation in E is an
exact integer subtraction, not floating loss of significant digits.

For every finite input in the mathematical scope, E>=0. Moreover E=0 iff every
observation is identical within its own cell: a sum of real squares vanishes
iff every residual does. The code independently checks this equality condition
while scanning each cell. This distinguishes exact zero from a positive SSE
whose projection is zero. This derivation is an author proof proposal requiring
review; a tested program is not a formally verified implementation of it.

Rational numerator/denominator pairs are reduced by gcd. `project` uses integer
comparisons and binary search over ordered positive finite binary64 bit patterns,
then reflects signs. It finds the enclosing adjacent representable numbers in
at most 63 iterations. Integer comparison to their exact midpoint chooses the
nearest endpoint; an exact tie chooses the even significand bit. Exact zero is
reported separately from a nonzero value rounding to zero.

For a target strictly outside the finite range, the candidate intentionally emits
no point projection, even in the tiny above-max interval that round-to-nearest
could map to max-finite. The diagnostic enclosure uses max-finite/infinity (or
the negative counterparts); this is not a finite public value. Within range,
rounding error is bounded by half the enclosing spacing, with half-min-subnormal
as the absolute underflow bound. At exact representability the error is zero.
There is no relative-error promise near zero. The interval is a numerical
containment interval, not a statistical confidence interval or a tolerance.

The original exact rational survives projection and is always available to the
next numerical stage. Decimal-looking diagnostics and nonfinite hex strings in
the transcripts are research representations, never a change to Record schema.

## 6. Independent expectation construction and coverage

[oracle.py](oracle.py) has no candidate imports. It forms Fraction inputs using
`as_integer_ratio`, computes marginal mean differences directly, sums squared
within-cell deviations, and forms SS/(SSE/nu). It also checks the exact centered
total partition. It does not copy candidate outputs or the historical exact
routine. Expectations are evaluated before the candidate in [run.py](run.py).
The candidate's integer-moment SSE and the oracle's direct residual SSE are
algebraically different; both are written in this author context.

The run contains 945 reconstructed historical datasets and 23 additional named
fixtures: n=2 through 16 for the corpus; ordinary, signs, level reversals, factor
exchange, within-cell order reversal, offset 2^40, uniform powers -1073/-600/600/1020,
mixed magnitudes, exact zero effects, zero SSE (constant/nonconstant/all-zero),
minimum subnormal residuals, positive SSE and F that project to zero, opposite
max-finite inputs, max-finite constants and a nonrepresentable n=3 mean.
Input hex values in [results/inputs.json](results/inputs.json) are the executable
input identity, including rounding in historical fixture construction.

- 968 datasets; all **18,380 exact quantity comparisons** agree.
- All **18,380 projection/enclosure checks** agree with a separate Fraction-to-float
  and nextafter path; 12 additional midpoint/range/zero checks pass.
- Decode checks cover every dataset scalar; another **20,470 exponent-edge checks**
  cover both signs, every finite exponent field and five significand patterns.
- Five malformed/nonfinite array guards pass. This is not Record conformance.
- Explicit sign/ordering and lossless-scale invariants pass; the mixed scaling
  witness loses original index 1 as expected. Undefined F has no invariance verdict.
- Historical 945-case rerun matches the recorded corpus digest and numerical
  summaries; exact environment differences are preserved, not hidden.

Full rational expectations, candidate outputs and enclosures are in
[results/exact-results.json](results/exact-results.json). Original/transformed
inputs, conversion loss, transformed exact targets and all floating observations
are in [results/float-results.json](results/float-results.json).
[results/summary.json](results/summary.json) separates nonfinite, spurious finite
nonzero, positive-target zero and undefined-target finite observations.
Scaled metrics compare transformed truth, not the unscaled target.

## 7. Findings and candidate disposition

| Witness                                           | Finding                                                                                    | Implication                                                                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Ordinary cell means 0,2,4,8 with +/-0.5 residuals | d=(5,3,2), SS=(50,18,2), SSE=2, nu=4, F=(100,36,4)                                         | Normalization and exact baseline retained                                                                                        |
| Uniform 2^-600 / 2^600                            | Original squares underflow/overflow; lossless common scaling recovers unit-scale F outputs | Range mitigation works on these witnesses only; original SS/SSE can still be unrepresentable                                     |
| Offset 2^40                                       | QR's SSE and F differ from exact targets; common scaling leaves those F outputs unchanged  | Scaling does not remove offset cancellation                                                                                      |
| Mixed historical fixture                          | Common scaling erases min-subnormal input; transformed exact SSE=2^-1204; QR SSE=17*2^-110 | Finite QR F is far below the exact F, which exceeds max-finite; conversion loss and spurious residual are distinct mechanisms    |
| Constant 7 in all cells                           | Exact SSE=0, but uncentered QR yields positive SSE and finite F                            | A computed positive residual alone cannot certify the mathematical denominator domain                                            |
| Each cell [1,1,nextafter(1,+inf)]                 | Exact SSE=(8/3)*2^-104; raw cell SSE=2^-102, a 50% relative error                          | Even compensated summation does not fix residuals around an already rounded mean                                                 |
| Same n=3 witness                                  | All exact contrasts/F are zero; raw QR gives F_B=2.25 and F_AB approximately 1             | Larger spurious ratios occur when denominator and effect errors are of comparable size; no significance decision is inferred     |
| Each cell [0,2^-1074]                             | Exact SSE=2^-2147>0; raw SSE rounds to zero                                                | Positive underflow differs from exact zero; normalized success cannot satisfy an original-unit positive binary64 SSE requirement |
| Three [-1,1] cells and one [0,2^-1074] cell       | All exact F are positive but round to zero                                                 | A rounded zero F is insufficient to determine an exact endpoint tail                                                             |
| Scaled anchored path on full corpus               | Still loses 96 positive exact F values as zero                                             | Local centering is a useful comparison candidate, not a global solution                                                          |

No observed finite maximum error becomes an admission threshold, tolerance or
proof over all inputs. The descriptive maximum absolute errors in the summary
exclude nonfinite outputs and mix intentionally different scales; they do not
rank scientific quality. Exact-zero-rich corpus counts are not usage rates.

The integer path is the most direct candidate here for preserving the represented
input and producing a true-F handoff. Promotion is unresolved, including its cost,
implementation verification, environment portability, final projection/admission
policy and independent Research Gate review. The floating alternatives are kept
as counterexamples and competing designs, not silently discarded.

## 8. Complexity and resource evidence

Let b=ceil(log2(n+1)); the proposed count ceiling gives b<=51. A finite binary64
input satisfies |z|<2^2098. Then |S_c|<n*2^2098, Q_c<n*2^4196,
|C_j|<4n*2^2098, and 0<=E<4n^2*2^4196. These conservative bounds give
E below 2^4300 and the unreduced F numerator below 2^4353 at the representational
ceiling. Projection cross-products can be bounded below 2^6500 using these
inequalities (a deliberately loose bound). Gcd reduction cannot enlarge them.
These are author-derived integer size bounds, not a measured or adopted heap cap.

The candidate scans N=4n observations: N squares, O(N) integer additions and
a fixed number of further products, gcds and divisions for at most 19 quantities.
Projection performs at most 19*63 search comparisons plus fixed midpoint work.
Euclidean gcd terminates; every two remainder steps reduce the larger positive
operand by at least half, giving at most twice its bit length in such steps.
A loose schoolbook bit-cost bound is O(N B^2 + B^3) for B=6500; this is deliberately
pessimistic and is not a CPython timing specification. There is no arbitrary-
precision iterative convergence criterion or unbounded accuracy escalation.
Auxiliary accumulator storage is O(B) for a fixed number of integers, excluding
the supplied input arrays. The experiment/oracle/transcripts themselves store
O(N) data and are not a proposed memory-limited verifier pipeline.

Historical cell and anchored paths take O(N) floating operations; fixed four-column
QR takes O(N*4^2) algebraic work and O(N*4) matrix storage, with BLAS implementation
cost and branches unspecified here. No worst-case error or cost certification
is inferred for them. Input parsing, identity checks and output serialization
are outside this numerical candidate and remain part of future resource design.

[resources.py](resources.py) measured n=2,16,256,4096 (up to 16,384 observations)
with exact-oracle crosschecks. On this run the largest workload took about 0.104 s
for candidate plus projection under tracemalloc; observed additional traced memory
was about 20 KB. Input allocation was excluded; native allocation is not fully
observed. [results/resources.json](results/resources.json) has the precise values.
These observations do not support n up to the representational ceiling, any fixed
latency SLA or a public resource limit. A supported observation count and real
end-to-end time/memory cap remain unresolved.

## 9. Lane 2 connection requirements

No unreviewed Lane 2 output is consumed. The proposed handoff consists of:

- Exact input/case digest, factor/level order and contrast kind A/B/AB, plus
  actual n and exact integer nu=4(n-1), numerator df exactly 1. The tail domain
  here is nu>=4 and a multiple of four, not arbitrary positive-even df.
- Original-input exact SS/SSE and, when SSE>0, reduced nonnegative rational F.
  Attach its enclosure and projection status; keep the original rational even
  if F is too small or too large for binary64. All three ratios share SSE.
- An explicit exact-zero-SSE state that blocks a tail call. Distinguish it from
  positive SSE projection underflow and from arithmetic/resource failure.
- A reviewed original-input containment claim. A rounded float without an error
  enclosure is adequate only if F is exactly representable, or if Lane 2's
  certified input-error treatment explicitly covers the missing discrepancy.

For F in [L,U], monotonic upper-tail probability lies between SF(U) and SF(L),
provided Lane 2 encloses both evaluations and their rounding. A point-value
library call does not provide that evidence. The width due to input F and the
tail algorithm's own error remain separate; neither inherits Welch tolerances.
If an endpoint is infinity merely because F exceeds max-finite, the coarse
interval may be useless. Lane 2 should consume the rational directly or an
adequately tight higher-range enclosure, not substitute an infinite statistic.
Likewise a positive F rounding to zero is not the exact F=0 endpoint.

A potential exact range-safe argument is x=nu/(nu+F), evaluated as a rational
from numerator/denominator integers. This is an interface option only; Lane 1
does not select or implement an incomplete-beta or other tail method. Exact
F=0 with positive SSE permits the mathematical SF(0)=1 endpoint; positive finite
F has a positive tail whose binary64 projection may underflow. Tail evaluation,
its endpoint comparison policy and proof belong to Lane 2 and later review.

The rational/enclosure object is research-internal evidence. It adds no payload
field and cannot make an unrepresentable original-unit SSE or F into a valid
complete result under the existing proposed finite-number representation.
Runtime admission, propagated check failures and public reason assignments still
need joint review without silently broadening that proposal.

## 10. Evidence status for independent review

| Topic               | Established by existing accepted evidence                           | This candidate                                                      | Unresolved                                                      |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| Scope/normalization | Bounded 2x2 full-model targets and accepted source/derivation split | Explicit code crosswalk and order fixtures                          | No broader designs or guarantees                                |
| Input preservation  | Existing mixed-scale counterexample                                 | Bit decoder, exact integer arithmetic and checks                    | Independent implementation proof and platform validation        |
| Arithmetic/error    | Existing finite graph failures                                      | Integer derivation and adjacent-float enclosures; 968-case evidence | Independent review; no floating-route uniform bound             |
| Output projection   | Finite-number proposal; exact-zero SSE undefined                    | Explicit zero/positive/range diagnostic split                       | Final admitted domain, public comparison policy and propagation |
| Resources           | Representation ceiling is not a runtime ceiling                     | Algebraic bit-size/work bounds and four finite workloads            | Adopted end-to-end count/time/memory/platform limits            |
| Tail                | Accepted mathematical F upper-tail meaning                          | Rational/enclosure handoff proposal                                 | Lane 2 method, error proof, endpoint and cost integration       |

A separate reviewer can start with BASE, the pinned proposal commit, this PR's
exact head and SHA256SUMS, then independently derive the equations and expectations
without either submitted arithmetic routine. Review the bit decoder, zero-SSE
criterion, integer growth, bracket search/ties/range policy, source/gate boundary,
legacy graph extraction, fixture coverage, explicit n=3 witness and Lane 2 contract.
A separate-provider/model primary-source/derivation pass is still needed before
promotion under the repository Research Gate. No new source purchase or scope
reapproval is needed merely to review this arithmetic packet. This is ready for
candidate review, not a claim that Release 4 has completed independent review or
reached Release 2's overall maturity.

## 11. Reproduction, checks and preservation

Use the recorded CPython 3.12.14 / NumPy 2.3.5 environment, with BLAS thread
variables set to 1. Full NumPy configuration is in
[results/environment.json](results/environment.json). Run from the repository root:

```sh
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 python governance/drafts/release-4-preparation/arithmetic-candidate-20260910/run.py --out /tmp/r4-arithmetic-rerun
python governance/drafts/release-4-preparation/arithmetic-candidate-20260910/resources.py --out /tmp/r4-arithmetic-rerun/resources.json
python governance/drafts/release-4-preparation/arithmetic-candidate-20260910/verify.py --rerun /tmp/r4-arithmetic-rerun
```

The rerun destination is scratch output, not repository input. Numeric replay
compares parsed JSON, so repository formatting is not a numeric change.
Environment/timing observations are deliberately excluded from exact replay.
[VALIDATION.md](VALIDATION.md) records commands, exit results and limitations,
including the failed tsx wrapper and successful direct-loader alternative.
No authoritative artifact is changed, so the aggregate full release/runtime suite
is not claimed as run. All changes are additions inside this directory only;
no shared document, original, historical review, registry, specification, Release 2
or Release 3 file is edited. This packet is committed and proposed to main as a
draft PR only; merge, official adoption and release are outside this work.
