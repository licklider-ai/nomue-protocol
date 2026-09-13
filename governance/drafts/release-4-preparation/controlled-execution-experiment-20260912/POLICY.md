# Integrated output, refusal and support proposal

This is a reviewable project proposal, not adopted numerical policy. The bounded
scope is complete balanced replicated 2-by-2 fixed-factor normal inference, with
both main effects and interaction retained. Each of four cells has the same count,
at least two independent units, and one finite continuous outcome per unit.
Independence, normal errors and common positive variance are declarations; input
truth and research-project validity are not established by numerical consistency.

Intervals for effects, significance booleans, multiple-testing guarantees, causal
claims, unequal/missing cells, repeated/clustered units, random factors and wider
factorial designs remain excluded. Probability enclosures here are numerical
error carriers, not confidence intervals for effects.

## Complete output inventory

| Quantity                 | Count   | Meaning / rule                                                                                        |
| ------------------------ | ------- | ----------------------------------------------------------------------------------------------------- |
| Signed estimates         | 3       | A and B differences of marginal means; AB difference of differences; declared level order fixes signs |
| Effect sums of squares   | 3       | A, B, AB, computed with the pinned exact arithmetic graph                                             |
| Residual sum of squares  | 1       | Exact SSE strictly positive and finite positive point representation required                         |
| F values                 | 3       | Exact rational ratios; finite point representations required                                          |
| Upper-tail probabilities | 3       | Evaluated from exact F, not its rounded display; fixed schedule 128/256/512 bits                      |
| Degrees of freedom       | 3 pairs | Each pair is (1, 4(n-1))                                                                              |

The 13 real quantities and three df pairs are all required for complete output.
Cell means and regression coefficients computed internally are not additional
mandatory outputs. Submitted probability consistency is a distinct operation:
it binds all three probability rows to independently supplied expected cells and
revision, and does not verify a separately submitted table of all 13 quantities.

## Representation decisions

| State                                              | Proposed treatment                                               | Guarantee boundary                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Exact SSE zero                                     | Refuse before tail work                                          | No positive residual variance denominator                               |
| Positive SSE rounds to zero                        | Refuse                                                           | Positive displayed denominator is a project output choice               |
| Exact SS/F zero                                    | Preserve zero; F=0 has upper tail one                            | No statement about real-world absence of an effect                      |
| Nonzero estimate/SS/F rounds to zero               | Preserve exact value and explicit projection status              | Rounded display does not replace exact F used for tail computation      |
| Positive tail rounds to zero                       | Preserve its candidate enclosure and zero encoding               | Encoding zero does not assert true probability zero                     |
| Value exceeds finite output range                  | Conservative refusal                                             | Not the full IEEE overflow-rounding rule                                |
| Signed zero in input                               | Bind sign in identity; arithmetic maps both to mathematical zero | Not a claim to preserve IEEE signed-zero arithmetic                     |
| No unique probability encoding at final precision  | Unresolved, no partial successful output                         | No silent tolerance or fallback                                         |
| Submitted interval omits fixed candidate enclosure | Refuse, even if independently valid and tighter                  | Consistency with the fixed candidate is not a generic truth certificate |

For evidence acceptance, require containment and the same unique endpoint
rounding; mere interval overlap or equal displayed numbers are insufficient.
The existing separate probability oracle is used in tests, not in acceptance.
The runtime imports its projection helper, which does not perform tail-oracle
evaluation. The candidate's mathematical correctness remains a separate premise.

## Ordered boundaries

1. Experimental host and trusted source identity, then bounded builtin transport
   shape/size validation in the supervisor. These are execution preconditions,
   not Protocol conformance judgments.
2. Hard worker limits before numerical imports, source hashes, then generated
   internal transport decoding. There is no raw Record parsing in this packet.
3. Pinned input snapshot checks. For submitted evidence: complete shape/type/size,
   expected identity, contrast and df binding, then endpoint gcd/reduction/order.
4. Exact arithmetic; zero SSE; mandatory finite/positive display policy.
5. All contrasts and all scheduled precisions preflight before any tail work.
6. Full calculation; then all submitted rows' containment and rounding checks.
7. Complete worker exit, bounded output receipt, limit readback, identity and
   complete result grammar. Only then expose the outcome.

Any worker timeout, CPU signal, allocation failure, crash, pipe overflow,
unexpected stderr, malformed output or cleanup failure suppresses result output.
Domain/evidence refusal, unresolved computation and execution failure remain
separate. An unresolved predecessor's partial diagnostic tails are deliberately
not forwarded. These local categories are not issued reason codes.

## Candidate input and execution range

The experiment preserves n=2..65 per cell, exact binary64 input values, and the
262144-bit cap on each submitted endpoint integer. These are not a claim that
every such input succeeds. Let a=2(n-1), and let w be the largest bit length of
the reduced exact F numerator and denominator. All three F values satisfy:

```text
w <= 6500
a*a*(w+512) <= 10000000
a*a*w <= 1000000
```

These scores are admission rules only. Hard worker limits are enforced separately.
The input distribution can affect admission, so normal-model calibration is not
asserted after admission selection. [admission.py](admission.py) measures all
three contrasts for five deterministic seeds at every n; it reports preflight
eligibility, not a user-population success rate or completed-tail rate.

Final supported-domain selection stays open. The practical choices are to retain
these explicit data-dependent refusals, narrow to a simpler tested range, or
develop a separately reviewed larger-budget algorithm. This packet measures the
current boundary without silently selecting a wider range or new mathematics.

## Claim-to-review applicability

| Claim group                                | Existing input                                                                                              | Reused conclusion                                               | Remaining review                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Bounded normal model and 2-by-2 meaning    | [steward receipt](../normal-model-steward-acceptance-2026-09-09.md) and RFC #261                            | Supplied-source normal-model scope and exclusions               | Final declaration/output wording and any changed claim                             |
| Exact arithmetic and projection            | PR #279/#281; numerical files pinned in INPUTS                                                              | Bounded arithmetic and separate reconstructions                 | This worker adapter and public coupling                                            |
| Tail construction and fixed-corpus checker | PR #278/#283/#285/#286                                                                                      | Bounded derivations and repaired 220-row checker                | Arbitrary supported-domain promise and final public comparison contract            |
| Numerical primary-methods and IEEE basis   | PR #287/#294; IEEE review 864766232988181e72ae18c235dbc815466b3a1d                                          | Bounded mathematical/source findings; signed-zero qualification | No inherited approval of output policy, worker limits or whole R4                  |
| Complete output and submitted evidence     | PR #295/#296/#297, source 97ef2926dbea7251d9fa611d4ada6513341f9826                                          | Experimental behavior and user-supplied review receipts         | Receipts lack reviewer identity/raw artifacts; not complete Research Gate evidence |
| Preservation                               | [R4 archive review](../../../../review-inputs/research-asset-review-20260911/r4/R4-ASSET-ARCHIVE-REVIEW.md) | Safe experimental reuse and preservation                        | Not support, adoption or fresh primary-source attestation                          |
| New execution and transport                | This packet                                                                                                 | Author tests and self-review only                               | Fixed-head implementation review; final host/limits decision                       |

Unchanged evidence is reused within those limits. The new policy, runtime and
output grammar do not become independently approved because their kernels match
the old hashes. No whole-gate closure is inferred.
