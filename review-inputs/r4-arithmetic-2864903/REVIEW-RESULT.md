# Bounded Release 4 arithmetic candidate review

Date: 2026-09-10. Informative review evidence, not Protocol authority.

## 1. Role and independence disclosure

This review is performed by OpenAI Codex in the present task context, with local
Python, Git, repository validation tools and the GitHub connector. No additional
agent, separate model, external numerical service or human reviewer was invoked.
The served model/build is not authenticated by available runtime metadata.

This session did not create or repair the target or its earlier research. Visible
continuity summaries include earlier project work and the author's PR 279 delivery
claim, including the target hashes. They are not a complete audit of past sessions
or proof that model identity differs from the author. Prior research involvement
outside this session cannot be established from authenticated session records.
The target itself names OpenAI Codex as author. Provider separation is absent;
model separation is unestablished. This is a separately executed candidate review
with newly written checks, not a repository-blind or separate-model source review.
No human authorship, human confirmation or independent primary-source investigation
is claimed. Existing reviews' independence disclosures remain their own records.

The reviewer read the candidate before writing the additional checks. Their
algorithmic separation is therefore not epistemic blindness. The helper used for
exact rationals is still CPython Fraction, shared with the author's oracle. To
reduce common errors, this review reconstructs input values from hexadecimal
strings, obtains SSE from pairwise differences and projects by exponent selection
and quotient/remainder rather than importing either submitted expectation method.

## 2. Separate decisions

| Decision                   | Result                    | Meaning                                                                                                                                                             |
| -------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A: candidate and evidence  | **GO**                    | Suitable as a bounded exploratory input to support-domain design and tail-interface investigation; no blocker or required repair identified.                        |
| B: promotion Research Gate | **NOT SATISFIED**         | The separate-model primary-source/derivation pass required by governance/RFC.md has not been performed for the new numerical method. This review does not close it. |
| C: onward use              | **Bounded use supported** | Integer arithmetic, enclosures, conservative resource analysis and interface requirements can be used within the restrictions in Section 9.                         |

Findings: **0 BLOCKER / 0 SHOULD-FIX / 2 NICE-TO-HAVE**. Explicitly deferred support
limits and promotion research are not candidate blockers. No formal method,
platform, admission predicate, comparison tolerance, identifier, public schema,
release or Release 4 completion is approved by A.

## 3. Fixed identity and inspected scope

| Object                           | Verified value                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Review input                     | `2864903316b4b4b2b219a56b42c535bfec7935b3`                                                           |
| Sole parent                      | `dedd26a3e0655001b67e40ccfb741e43ecb07beb`                                                           |
| Input tree                       | `78a8df1ddb1269de451751419aa915a3179e70d1`                                                           |
| Separate proposal/opening input  | `022c8699befbcba375e3aa6e07c1a8dd8eace483`                                                           |
| PR 279 head, live checks         | Same as review input                                                                                 |
| Current main, GitHub observation | Same as sole parent; no intervening main changes                                                     |
| Input delta                      | Exactly 28 additions, all under the designated arithmetic-candidate directory; no deletions or edits |

The review branch starts at the review input. A detached clean worktree at that
same commit was used for numerical reproduction, before adding review evidence.
No rebase or substitution of the proposal branch occurred. The initial local
clone inherited an unrelated detached checkout; it was immediately switched to
the pinned input before reading the target. No other Lane's content is evidence.

AGENTS.md and its ordered Read-first documents were consulted: CHARTER.md,
AUTHORITY.md, authority-manifest, requirements registry, ID-POLICY and RFC process.
There is no directory-local AGENTS.md for this review destination. REPORT.md,
INPUTS.json, VALIDATION.md and SHA256SUMS were inspected. All eight candidate
Python files were read in full, including identity.py and seal.py; neither writing
utility was executed. The literal historical graph source was read in full.

Large results were inspected by structure and named diagnostic rows and subjected
to parsed all-field replay for inputs, exact-results, float-results and summary.
Every stored expected rational and candidate rational was also checked against
the reviewer's separate calculation, with matching names, keys, lengths and missing
F states. This is not a claim to have manually read 375000 result lines. All 36
present manifest blobs, two intentional absences and 27 artifact checksums passed.

## 4. Reuse of accepted research

All positions below are fixed by the author's INPUTS.json, whose Git blobs and
SHA-256 values were verified. The separate proposal owns the retained target;
the base owns the corrected residual-location explanation.

| Existing record                                                                         | Inspected/reused claim                                                                                              | Not supplied anew                                                       |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Normal-model steward acceptance; source review Section 6 and source/repair evidence map | Full interaction, three contrasts, SS normalization, rank/df and bounded individual-null F interpretation           | PDF reinspection, wider source closure or post-quantization calibration |
| Numerical-feasibility workplan and SS/F supplement; numerical review Section 5          | Exact represented inputs, explicit operation graphs, historical corpus and environment limits                       | A general QR error theorem or adopted floating path                     |
| Power-scale exploration, repair and original/close review Sections 4-8                  | Original versus transformed truth, conditional scaling invariance and corrected six-observation QR residual witness | Universal lossless scaling or BLAS-wide equivariance                    |
| Programme acceptance and audit Sections 5-8                                             | Continued disposable investigation, preserved findings and resource/projection distinctions                         | New steward acceptance or source adjudication                           |
| Pinned opening record and proposal, exact-quantity and representation sections          | Balanced complete replicated 2x2, fixed contrasts, positive SSE and finite complete result requirements             | Issuance, executable support or Release 3 dependency closure            |

Prior review bodies were read for these relevant derivations, dispositions and
limitations, not audited exhaustively or rerun as primary-source research. The
normal-model acceptance explicitly distinguishes corroborating Tian/Styan criteria
from the independently reconstructed probability derivation. That accepted split
is retained. It does not certify the new integer/projector implementation.
Historical NOT_READY wording is not substituted for the later opening record.

## 5. Independent arithmetic derivation

For a normal binary64 value with exponent field e and fraction field f,
its magnitude is (2^52+f) times 2^(e-1075). Thus multiplying by U=2^1074 gives
(2^52+f) times 2^(e-1). A subnormal gives f, and the sign bit negates either.
Exponent 2047 is excluded. Both signed zeros map to integer zero. struct's explicit
big-endian pack/unpack makes host byte order immaterial to this decoding.

Write z for the decoded integer, S_c for each cell's sum and Q_c for its sum of
squares. The four sign columns (intercept, A, B, AB) have squared length 4n and
are mutually orthogonal. Their least-squares coefficients are the signed response
sums divided by 4nU. The fitted value in each cell is S_c/(nU). Consequently
beta_A=d_A/2, beta_B=d_B/2 and beta_AB=d_AB/4, with AB the full difference in
differences. This supplies a direct fitted-column route to the SS normalization:
SS_j=4n beta_j^2=C_j^2/(4nU^2). Intercept SS is not a reported effect SS.

A second identity avoids both candidate moments and oracle residual means:

```text
sum_{i<j}(z_i-z_j)^2 = n sum_i z_i^2 - (sum_i z_i)^2
E = sum_cells sum_{i<j}(z_i-z_j)^2
SSE = E/(n U^2)
nu = 4n-4
F_j = nu SS_j/SSE = (n-1) C_j^2/E, provided E>0
```

For finite real observations and common integer n>=2, each pairwise square is
nonnegative. Their sum is zero exactly when every pair within every cell is equal.
Cells need not equal one another. This proves the implemented exact-zero test;
short-circuiting its running boolean does not skip decoding or summation.
Integer cancellation cannot lose bits. The rational reduction preserves signs,
uses a positive denominator and maps mathematical zero to (0,1).

Reversing A changes A and AB signs, reversing B changes B and AB signs, exchanging
factors swaps A/B and preserves AB. SS and F follow the squares; cell permutations
preserve SSE. Negating the response negates signed estimates and leaves SS/SSE/F.
A lossless response scale multiplies estimates by the scale and SS/SSE by its
square, leaving F unchanged. Translation must itself preserve the intended input
values before that mathematical invariance is invoked.

These are exact targets for received binary64 numbers. Python objects coerced to
a binary64 value are a separate issue (N-1). The array routine does not implement
Record parsing, unit identity, factor resolution or model-applicability checks.
The continuous normal-model calibration is not a theorem about quantized samples
or samples conditional on a future numerical-admission predicate.

## 6. Projection, enclosures and zero boundaries

For positive finite binary64 bit patterns, the numerical value increases strictly
with the unsigned pattern. Search starts with a feasible zero and the maximum
finite upper bound. Each integer comparison tests z*b<=a*U. The upper-midpoint
update preserves the floor-pattern in [lo,hi] and strictly shrinks the interval
until lo=hi. There are fewer than 2^63 patterns, hence at most 63 iterations.
An equality yields a singleton; otherwise lo+1 is the adjacent upper endpoint.

The signed comparison 2*a*U-(z_lo+z_hi)*b chooses the nearest endpoint exactly.
At a midpoint, pattern parity equals the low significand bit, including binade
transitions and the subnormal/normal boundary. Reflection swaps and negates
endpoints and preserves tie-even rounding; small negative nonzero values can
project to negative zero. Exact zero has its separate canonical diagnostic.

The independent projector chooses the binary exponent from numerator/denominator
bit lengths, establishes the spacing 2^max(-1074,e-52), and uses integer
quotient/remainder and parity. It uses no author binary search and no Fraction
rounding for nonrepresentable targets. It agrees on all tested quantities and
16388 boundary probes, including every normal exponent transition and both signs.

At exact representability the width and error are zero. Otherwise the enclosure
width is one spacing and nearest-point absolute error is at most half that width.
Near zero this is at most 2^-1075; relative error can be one. Neither width nor
absolute/relative error is a public comparison tolerance or confidence interval.

Strictly beyond maximum finite, the candidate returns no nearest point, including
max-finite+1, although ordinary nearest rounding maps that value to max-finite.
The rule is an intentional range-domain choice, accurately disclosed, not an IEEE
rounding defect. Infinity is only a diagnostic endpoint. Missing F, rational pairs
and these endpoints are not valid complete proposed public results. Positive
SS/SSE/F rounding to zero remain distinct from mathematical zero.

## 7. Reproduction and added witnesses

| Check                                          | Result                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Author run.py and parsed replay in clean input | 968 cases; 18380 exact equalities and 18380 projection checks; all four replay files equal |
| Reviewer pairwise/fitted-column reconstruction | All 968 cases and 18380 quantities agree with candidate and stored expectations            |
| Additional reviewer datasets                   | 137 cases / 2597 quantities: 17 named, 120 seeded random finite-bit datasets               |
| Reviewer projection boundary checks            | 16388 passed                                                                               |
| Reviewer scalar decoding checks                | 36992 passed across corpus and additional cases                                            |
| Author resources.py                            | 20470 exponent-edge decodes; four workloads through 16384 observations passed              |
| Fresh historical script execution              | 945-case corpus digest and every non-environment field match                               |
| Malformed/nonfinite array guards               | Nine invalid array cases rejected                                                          |

The historical digest is
`558b6e65da273bf836204f7d0f5b4bae08cfd85918a23374a475197c2e851ca3`.
The review actually executed the historical script: the author's verify.py alone
only compares two stored historical records (N-2). No author evidence was rewritten.

For n=3 and each cell [1,1,1+u], u=2^-52, the exact mean is 1+u/3. Residuals
are -u/3,-u/3,2u/3, giving SSE=4*(2u^2/3)=8u^2/3. The floating mean is 1,
so raw SSE is 4u^2: exactly 50% high. Exact contrasts and F are zero; reproduced
raw QR gives F_B=2.25 and F_AB near one. This is a finite environment-specific
QR witness, not a universal prediction for every BLAS implementation.

Additional manually derived targets include:

- Each cell [-M,M], M maximum finite: means/effects/F zero; SSE=8M^2, which cannot
  be a finite binary64 SSE. Integer intermediates remain correct.
- Each cell [0,t], t=2^-1074: SSE=2t^2=2^-2147>0; its projection is zero.
- Three [-1,1] cells and one [0,t]: SSE=6+t^2/2, SS_j=t^2/8,
  F_j=t^2/(12+t^2)>0 for each effect; all F projections are zero.
- Historical mixed inputs: SSE=1/4+t^2/2. Scaling by 2^-601 loses t and gives
  transformed SSE=2^-1204; the two exact targets are kept separate. The huge finite
  exact F is not replaced by infinity as mathematical input to the next stage.
- Different constant cells: exact SSE zero and F absent. All signed-zero cells
  also have exact SSE zero.
- A third-mean witness at offset 2^900, an asymmetric n=3 fixture, translations,
  level reversal, factor exchange, within-cell reversal, negation and lossless
  scales 2^-700/2^700 pass the independently derived identities.

The first reviewer script run caught an error in its manually entered positive-F
formula (an extra factor four in the denominator). Re-deriving SS=t^2/8 and
SSE=6+t^2/2 corrected it to the formula above; the candidate was not changed.
The final complete run then passed. This records a reviewer correction, not a
candidate finding or hidden adjustment of author expectations.

CPython 3.12.14, NumPy 2.3.5 and single-thread environment match the author's
named numeric versions. Full configuration is retained in results.json. This is
one execution environment; no cross-platform guarantee is inferred. A different
historical graph digest on another Python/BLAS build would require examination,
not automatic rejection of a mathematical counterexample.

## 8. Resource bound check

Using n<2^51 and |z|<2^2098 gives |S|<2^2149, Q<2^4247,
|C|<2^2151 and both n*sum(Q) and sum(S^2)<2^4300. Their nonnegative
difference E also obeys that bound. SS numerators C^2 are below 2^4302;
the unreduced F numerator (n-1)C^2 is below 2^4353. Intercept sums and mean,
estimate, coefficient, SS and SSE denominators are smaller than these bounds.
Gcd reduction does not enlarge either operand.

For projection, target=aU<2^5427. Even the midpoint term (z_lo+z_hi)b is
below 2^6399, and 2*target<2^5428; subtraction magnitude is bounded by the
larger positive term. Thus 6500 bits covers intermediate products and comparisons,
not merely final reduced outputs. The resource script records the corresponding
upper-bound integer bit lengths without allocating a huge input array.

At most 19 rationals are produced. With at most 63 search iterations per nonzero
in-range quantity, projection requires at most 1197 search comparisons plus fixed
range/equality/midpoint work. Euclidean remainders decrease; over two steps the
larger operand at least halves. Schoolbook multiplication/division upper bounds
therefore support the deliberately loose O(N B^2+B^3) bound with B=6500 and N=4n.
This is not a claim about CPython's exact allocation strategy or elapsed time.

A fixed number of B-bit accumulators and rational outputs require O(B) numerical
storage. Supplied arrays, ingress/identity validation, oracle datasets, JSON text
and output serialization are outside that accumulator bound; the experiment
retains O(N) data. The benchmark includes candidate plus projection allocations,
excludes preallocated inputs and later oracle work, and tracemalloc omits some
native allocations. The largest workload here took about 0.0974 seconds with
20136 additional traced bytes. Neither this observation nor the algebraic count
ceiling is an adopted support limit. No proof error was found; end-to-end resource
admission remains a separate uncompleted design task.

## 9. Research Gate and onward handoff

This review supplies a traceable fixed-head implementation/derivation check,
separate expectation computations, representation-boundary checks and reproduced
finite evidence. It preserves facts, derived claims and unadopted conventions.
Under governance/RFC.md it does not supply the required separate-model independent
primary-source review for numerical promotion. A distinct model/investigator pass
must confirm the new exact-accumulation and rounding/range method against relevant
primary material and its explicit derivation; merely reusing these test results
is insufficient. Existing accepted normal-model research need not be reopened
outside a materially changed claim. Support selection still requires domain,
platform, resource, projection and public comparison decisions.

| Area               | What can pass onward                                                                                                 | Remaining restriction                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Integer arithmetic | Exact represented-input means, contrasts, SS, SSE, df and rational F; exact SSE-zero criterion                       | Only the declared ordered equal-cell finite-binary64 domain; no Record admissibility or scientific truth certification |
| Projection         | Adjacent-float enclosures, tie-even in-range projection and disclosed out-of-range diagnostics                       | Final public admission and comparison policy remain open; diagnostic objects are not public results                    |
| Resources          | Conservative bit/operation/storage analysis and four measured workloads                                              | No supported maximum count, heap/latency guarantee or platform approval                                                |
| Lane 2 interface   | Exact input binding, factor/level order, contrast identity, n, df=(1,4(n-1)), exact rational F plus enclosure/status | Proposed connection conditions only; no Lane 2 output or tail implementation reviewed                                  |

The interface must preserve original-input identity all the way to each ratio;
array order alone is not an implemented Record binding. Exact SSE=0 supplies no
F or tail. Positive SSE projected to zero does not trigger the mathematical
zero-SSE case. Positive F projected to zero does not license the exact SF(0)=1
endpoint. Large finite rational F requires adequate range and precision.

For 0<=L<=F<=U, monotonicity gives SF(U)<=SF(F)<=SF(L), with the same exact
degrees of freedom. Endpoint evaluation errors must be outwardly enclosed too;
input-enclosure width and algorithm error remain distinct. An infinity diagnostic
endpoint can supply only a coarse limiting bound, not replace finite F.
Retaining rational F internally does not resolve the proposal's finite numerical
output obligations. These are appropriate connection conditions; an integrated
proof, failure propagation and complete finite output still need joint review.

## 10. Optional improvements

**N-1 — state helper preconditions at the call boundary.** candidate.py's lattice
coerces Python bool and large int via struct.pack; 2^53+1 becomes 2^53. project
assumes a positive integer denominator and returns plausible diagnostics for
(0,0), (1,0) and (1,-1). These are outside the stated finite-binary64 input and
candidate-produced rational domain, so they do not refute A. Before reuse as an
independent callable API, document/guard these preconditions and keep exact
received-float semantics explicit. Do not infer Record input validation from the
existing shape/nonfinite checks. Evidence is in results.json.

**N-2 — distinguish stored historical comparison from fresh execution.**
verify.py compares original and author-stored historical JSON, but never invokes
the historical probe. REPORT.md Section 11's three-command sequence therefore
does not by itself execute that probe. run.py does separately reconstruct its
945 inputs and graph observations, so this is not missing numerical coverage or
a false author-run claim. Add an explicit fresh historical command/flag to the
reproduction instructions. This review's reproduce.sh includes that command and
its checker compares all non-environment historical fields.

## 11. Reproduction, validation and preservation

Files: [check.py](check.py), [reproduce.sh](reproduce.sh),
[results.json](results.json), [INPUT-RECORD.json](INPUT-RECORD.json),
[VALIDATION.json](VALIDATION.json) and [SHA256SUMS](SHA256SUMS).
From the repository root, run the shell script with an empty scratch directory:

```sh
bash review-inputs/r4-arithmetic-2864903/reproduce.sh /tmp/r4-arithmetic-review
```

It creates a detached pinned input worktree, executes the author's run/resources/
verify programs and historical probe, and runs the reviewer's checks against that
clean input. Outputs go to scratch. Timings and environment metadata may differ;
numeric replay is exact in the recorded environment. The input worktree is retained
for inspection. It never invokes seal.py or changes the author's 28 files.

Local format, Markdown, type, direct-loader validation, generated-drift and
preservation results are in VALIDATION.json. The full local release/runtime suite
is not claimed: this review adds only informative evidence and dedicated checks.
Author input CI run 34455119180 completed successfully. Return-PR CI status is
reported separately against the returned commit; ordinary repository CI does not
execute this Python arithmetic review automatically. No authoritative file,
original expected value, author checksum or historical review was modified.
