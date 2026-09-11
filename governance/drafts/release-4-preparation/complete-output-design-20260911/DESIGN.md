# R4 complete-output and admission design proposal

## Status and provenance

Informative, unfrozen proposal dated 2026-09-11. Prepared with OpenAI Codex in
its continuing author context. This is neither an independent source review nor
an implemented public interface. IEEE 754-2019 was unavailable at the original
head. PR #294 now supplies bounded clause confirmation at
`864766232988181e72ae18c235dbc815466b3a1d`, with independent source report
`bfe7d2307da8f72cd241fd6e7dc423a8e807e112`. Signed-zero collapse and
above-maximum refusal remain project conventions; no whole-gate closure follows.

This packet completes the output-policy proposal in PR #291 and specifies a
bounded successor experiment. It adds no authoritative schema, reason code,
registered check, tolerance or supported range. Choices below are proposed
project conventions, not conclusions compelled by statistical sources.

## Fixed inputs

| Artifact                        | Fixed commit                               | Use                                                                   |
| ------------------------------- | ------------------------------------------ | --------------------------------------------------------------------- |
| Opening proposal                | `022c8699befbcba375e3aa6e07c1a8dd8eace483` | Balanced full-model 2x2 scope and three separate marginal tests       |
| Arithmetic candidate            | `2864903316b4b4b2b219a56b42c535bfec7935b3` | Exact represented-input quantities and conservative finite projection |
| Repaired composition, PR #288   | `c61e734a1f19f6572100f2594dd24b1e01ea4d49` | Single-contrast binding, rational tails and work guards               |
| Support plan, PR #291           | `4d4988b55cc4924c77f61d837dba7ba0a514f609` | Count/width envelope and current versus proposed behavior             |
| Primary-methods review, PR #287 | `da1c53dfd70f02169014f5d882aa51aec960a019` | Bounded algebra assessment; normative IEEE leg remains incomplete     |

Existing proposal meaning is retained: cells ordered A0B0, A0B1, A1B0, A1B1;
four equal cells, independent normal errors with common positive variance;
full A/B/AB model. The experimental count ceiling remains 65, with data-dependent
resource refusal. Count alone never establishes support. Computation does not
validate declarations, quantization effects or statistical behavior conditional
on numerical admission. No R3 multiplicity dependency is introduced.

## Proposed complete quantity set

| Quantity                               | Count   | Proposed representation and completeness condition                                                   |
| -------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| Signed estimates dA, dB, dAB           | 3       | Exact internal rational plus finite projected binary64                                               |
| Effect SS for A, B, AB                 | 3       | Exact nonnegative rational plus finite projection                                                    |
| Residual SSE                           | 1       | Exact positive rational plus strictly positive finite projection                                     |
| Numerator and residual df              | 3 pairs | Exact integers (1, 4(n-1)); same residual df for every contrast                                      |
| F for A, B, AB                         | 3       | Exact nonnegative rational plus finite projection                                                    |
| Individual-null upper-tail probability | 3       | Pinned candidate bounds determine one binary64 encoding in [0,1]; oracle comparison is test evidence |

These 13 real-valued quantities and three df pairs are the proposed minimum
complete experimental output. Repeated shared df or SSE storage is unnecessary.
Cell means, intercept, coded beta coefficients, projection bounds and operation
counts may remain diagnostics; they do not replace signed estimates. This is an
experimental inventory, not a prescription for a future Record serialization.

For cell means m00, m01, m10, m11, retain
`dA=(-m00-m01+m10+m11)/2`, `dB=(-m00+m01-m10+m11)/2` and
`dAB=m00-m01-m10+m11`. Coded beta values dA/2, dB/2, dAB/4 are not substitutes.
SS values are n*dA^2, n*dB^2, n*dAB^2/4. Residual SSE is the sum of exact
within-cell squared deviations; F is SS/(SSE/df), using exact quantities.

At runtime, the pinned finite-sum candidate supplies the probability enclosure;
no independent probability oracle is run to accept a result. Oracle agreement is
required evidence in the experiment's tests, not a second runtime certificate.
The existing projection helper located in `rational_oracle.py` may be reused for
encoding bounds; calling that helper is not running its probability oracle.
Pin the complete dependency set and preserve this distinction in runtime claims.

## Representation decisions proposed for the experiment

1. Require absolute exact magnitude at most maximum finite binary64 for each
   mandatory arithmetic output. Refuse larger magnitudes even if a nearest-round
   convention could map a slightly larger value to maximum finite. This retains
   the arithmetic candidate's conservative boundary; it is not an IEEE claim.
2. Refuse exact SSE=0 before division. If exact SSE is positive but its projection
   is zero, refuse complete output as a representation limitation. This case is
   not undefined mathematics and is not evidence of zero residual variation.
   The asymmetry is a proposed output convention: keep the displayed residual
   denominator positive to avoid an apparent undefined division, while rounded
   SS/F displays remain usable only with exact quantities driving computation;
   a displayed zero never establishes an absent or negligible scientific effect.
3. Permit a nonzero signed estimate, SS or F to round to zero if otherwise within
   range. Retain exact-zero versus rounded-zero diagnostics and the sign of a
   nonzero signed estimate's zero projection. Exact zero projects to positive
   zero. Tails always consume exact F or its guaranteed enclosure, never its
   projected display. No displayed SS/SSE/F recomputation is an acceptance rule.
4. Permit a strictly positive probability to project to zero, or a probability
   below one to project to one, only when outward bounds determine that encoding.
   Such a display is not a claim of mathematical probability zero or one.
5. If any mandatory tail remains unresolved within the fixed precision schedule,
   there is no complete output. Preserve its bounds as diagnostics without a
   guessed encoding. No adaptive unbounded precision increase is proposed.

The positive displayed SSE choice narrows the domain deliberately. An alternative
would expose positive exact SSE alongside a zero display, but that would require
a separately reviewed consumer representation. Do not silently relax this choice
inside the wrapper. Requiring finite displayed F deliberately narrows PR #288's
rational-tail adapter, which can evaluate tails for some exact F values above
maximum binary64 even when SS and positive SSE are displayable. This wrapper
refuses such a complete output before tail work. IEEE clause confirmation does
not approve this narrower output policy.

## Admission and refusal order for a successor experiment

Use one owned snapshot of primitive input values throughout. Proposed input is
an in-memory four-list cell array plus revision, not raw JSON or an arbitrary
object parser. A future Record entry point retains the existing strict parser.
The wrapper accepts no submitted probability evidence in this stage.

| Order | Proposed action                                                                               | On failure                                                    |
| ----- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1     | Check exact built-in list types, four cells, equal n in 2..65 before traversal or copying     | Input shape/count refusal                                     |
| 2     | Check revision exact str type, length 1..64, ASCII letters/digits/underscore/dot/hyphen       | Identity refusal before serialization                         |
| 3     | Check every observation is an exact built-in finite float; copy to owned storage              | Observation refusal                                           |
| 4     | Compute exact arithmetic once; retain fixed cell order, original float encodings and revision | Exact SSE=0 stops before F division/tails                     |
| 5     | Project mandatory estimates, SS, SSE and F in table order, A/B/AB within each row             | First representation failure prevents all tail work           |
| 6     | Preflight all A/B/AB exact F values against the existing guard at every planned precision     | Any resource refusal prevents all tail work                   |
| 7     | Evaluate tails in A/B/AB order with fixed precisions (128,256,512)                            | First unresolved tail stops complete construction             |
| 8     | Assemble every required result with the same snapshot identity and contrast mapping           | Emit complete experimental quantities only if all are present |

Diagnostics identify the failed stage and quantity. Earlier local tail results
may be retained after step 7 failure but never labeled a complete analysis.
These are local experiment outcomes, not a single overall VERIFIED status or
scientific validity result. Unexpected implementation exceptions are experiment
failures, never counted as planned refusal.

For a later interval-carrier variant, verify shape, primitive types, identical
revision/input digest/contrast/df and containment of recomputed exact F before
preflighting both endpoints for every contrast. Both endpoints pass all budgets
before either is evaluated. Equal numeric F from a different input is not the
same carrier. Preserve signed input zero bytes in identity. This variant is
specified for later work, not silently included in the first raw-input wrapper.

The runtime budget is not established by the per-tail guard: three contrasts and
full arithmetic/output construction cost more than one tail. Measure the whole
call under an explicit process envelope before proposing any complete-call
runtime ceiling. Do not advertise the prior 7-second observation as that ceiling.

## Explicitly deferred

Submitted-tail evidence consumption (PR #288 plan row 14, including PR #283 O2)
remains unimplemented. A new consumer needs its own exact claim: containment of a
recomputed enclosure is conservative and can reject a tighter valid interval;
it is not a complete truth-inclusion decision. Public identity wiring, schema
impact, tolerances, supported platform, all-output error evidence and governance
adoption remain separate work. No confidence intervals, significance booleans,
FWER/FDR claim or input-model truth assertion is added.
