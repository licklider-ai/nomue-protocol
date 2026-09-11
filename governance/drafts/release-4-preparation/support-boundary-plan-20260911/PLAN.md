# R4 support and refusal boundary proposal

## Status and purpose

This 2026-09-11 informative plan turns the current experiment's limits into
reviewable support decisions. It is not a supported domain, source-gate closure,
new interface, candidate implementation or release decision. The preparation
worker used OpenAI Codex in the authoring context; analysis of existing code and
integer inequalities is not an independent scientific review. R3 PR #290 remains
under separate review and is not modified or assumed approved here.

The target is the balanced complete replicated 2x2 fixed-factor normal-model
proposal: four equal cells, finite observations, n>=2, A/B/AB contrasts, common
variance and individual-null F upper tails. It does not include multiplicity,
confidence intervals, arbitrary factorial designs or proof of model assumptions.

## Fixed inputs and remaining boundaries

| Input                                    | Commit                                                                              | Relevant boundary                                                                                   |
| ---------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Repository base                          | dedd26a3e0655001b67e40ccfb741e43ecb07beb                                            | Governing AGENTS/RFC and authority retained                                                         |
| R4 opening proposal                      | 022c8699befbcba375e3aa6e07c1a8dd8eace483                                            | Existing scientific scope and finite-output questions                                               |
| Arithmetic candidate / review            | 2864903316b4b4b2b219a56b42c535bfec7935b3 / 87adcec680f90271d0a6e571c1892ec38a392751 | Exact represented-input arithmetic; range and runtime policy not adopted                            |
| Tail candidate / review                  | 8d1979a4cf91012d86d57df40e5a847e2f00a358 / e7ddd16f6d2272cb7c9267f7f2aa8d35103f1c44 | Initially fixed binary64 F; no raw-input guarantee                                                  |
| Primary-methods review                   | da1c53dfd70f02169014f5d882aa51aec960a019                                            | Bounded mathematical GO; IEEE clause source leg incomplete                                          |
| Composition and repair receipt / PR #288 | c61e734a1f19f6572100f2594dd24b1e01ea4d49                                            | Exact rational/interval experiment, conservative work refusal, submitted-tail-evidence row deferred |

These are evidence references, not adopted dependencies. Original sources and
reviews are preserved. A scientific-source review, a code review, a runtime
experiment and a supported-domain decision establish different things.

## Current executable path and proposed interpretation

| Condition                                                           | Current experiment                          | Proposed downstream treatment                                                                                  |
| ------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Wrong shape, unequal cells, n outside 2..65, nonfinite observations | Explicit refusal                            | Keep deterministic input refusal; no dropping cells or observations                                            |
| Exact SSE=0                                                         | `prepare` stops before F/tail               | Undefined under retained scope; no infinity substitution or p=0                                                |
| Exact SSE>0 but displayed SSE would be zero                         | Exact arithmetic proceeds                   | Keep exact status distinct; separately decide whether mandatory output representation admits the case          |
| Exact effect=0 with positive SSE                                    | F=0, tail=1                                 | Preserve mathematical endpoint                                                                                 |
| Positive F whose binary64 projection is zero                        | Exact rational F remains positive           | No replacement by zero before tail evaluation                                                                  |
| Finite exact F exceeds maximum binary64                             | Rational tail can proceed if budget permits | Do not infer complete Record support; a required finite displayed F may still make the full output unsupported |
| F interval excludes recomputed exact F                              | Binding/containment refusal                 | No downstream tail acceptance                                                                                  |
| Identity, contrast, df or origin input mismatch                     | Binding refusal                             | Identity consistency is required even for numerically equal F                                                  |
| Rational width/count exceeds guard                                  | Refusal before expensive tail arithmetic    | Resource refusal, not a statistical conclusion                                                                 |
| Valid bounds round to one common encoding                           | `resolved`, encoding and bounds             | A local rounding conclusion only; no overall verification or model-validity status                             |
| Valid bounds do not determine encoding after attempted precisions   | `unresolved`, no encoding                   | Preserve uncertainty and stop; do not guess or silently increase limits                                        |
| Submitted probability evidence                                      | No entry point                              | Deferred; upstream F checks do not implement tail-evidence validation                                          |

The adapter currently computes one chosen contrast at a time. A future complete
three-contrast output needs an explicit completeness policy: proposed behavior
is to retain each local result/refusal for research diagnostics, and to admit a
complete public bundle only if every required output meets its own contract.
Never present two completed contrasts as an implicitly complete three-contrast
analysis. This is a proposed policy, not implemented behavior.

## Exact admission envelope

For a=2(n-1), w=max(bit_length(F numerator), bit_length(F denominator)), the
current guard requires w<=6500, a^2*w<=1,000,000 and
a^2*(w+b)<=10,000,000. The adapter attempts b in {128,256,512}.
For n<=65 and b<=512, the second score is redundant once the first holds:
1,000,000 + 128^2*512 = 9,388,608 < 10,000,000.
This is a property of the adapter range; the directly callable candidate/oracle
allow other precisions, so do not delete their second guard on this argument.

`admission-envelope.json` gives every n from 2 through 65 and the exact maximum
width min(6500, floor(1,000,000/a^2)). It is a deterministic score table, not a
runtime benchmark. Examples: n=33 admits at most 244 bits, n=46 at most 123,
n=47 at most 118, and n=65 at most 61. The previous seeded ordinary-data probes
show that a stated count range of 2..65 is not uniform raw-data support.
Acceptance depends on the exact reduced fraction width as well as count.

For interval inputs both endpoints need to meet the guard. The current code
checks them as evaluations occur; it does not promise that both have been
preflighted before evaluating either. Proposed next admission wrapper preflights
both endpoints and reports resource refusal before tail evaluation. Its code and
refusal precedence need separate review; this plan does not silently change them.

## Minimum remaining work in dependency order

1. **IEEE clause confirmation:** inspect the recovered standard when available,
   limited to field mapping and rounding. Keep existing algebra findings; repair
   only any actual conflict. No extra paper acquisition is proposed here.
2. **Output completeness and representation proposal:** choose which of estimates,
   SS, SSE, df, F and tail are mandatory and distinguish internal rational success
   from permitted public numeric outputs. Use the table above and counterexamples;
   do not redefine the original Profile through the adapter.
3. **Bounded admission wrapper experiment:** preflight count, scalar input sizes,
   both F endpoints and selected contrast identity; retain point versus interval
   semantics and unresolved results. Keep wrappers small and reuse the existing
   exact arithmetic, not a second production implementation.
4. **Submitted-tail-evidence design:** define what a consumer receives and which
   exact target/rounding claim it checks. Decide whether it uses fixed-recomputation
   containment or another proved criterion; explicitly retain the conservative
   tighter-valid-interval rejection distinction. Include PR #283 O2 and widened
   false evidence. Do not copy the original fixed corpus checker as a generic API.
5. **One bounded integrated review:** review the final interface, its independent
   numerical evidence, maximum admitted workloads and complete-output behavior.
   Then prepare the explicit supported-range proposal. A successful sample or
   elapsed public-discussion window does not close governance gates.

Steps 2 and the interface design portions of 3/4 can be drafted while IEEE is
unavailable. No methodology or public interface is frozen before applicable
review. These steps are successors to the completed repair round, not reasons
to reopen all original reviews or claim R4 has reached R2 maturity.

## Evidence plan for the next experiment

Use ordinary seeded binary64 observations as well as short dyadic fixtures,
retaining exact input bytes and source hashes. Cover count/width frontier values
on both sides, all three contrasts, both endpoint orientations, exact and
rounded-zero SSE, zero/underflow/overflow F representation, probability rounding
near zero/one, unresolved intervals and altered identity. For large-width probes,
measure complete admission plus output construction in isolated processes with
explicit time/memory caps; resource termination is a failed experiment, never
numerical evidence. Pin the environment and report measured distributions, not a
universal latency claim. Include malformed input length and label-size limits
before serialization; the present nonempty revision check is not a byte budget.

At the next trust-boundary change (new evidence consumer or supported-domain
freeze), commission a bounded external adversarial review and save its target
identity, scope, findings and dispositions. Mere document wording cleanup does
not require another whole-method review.

## Validation of this packet

The envelope checker passed all 64 count boundaries using exact integer
inequalities, including maximal-width rejection at the next bit where applicable.
Prettier, Markdown lint (399 files) and whitespace checks passed. These checks
validate this proposal and score table only; no tail benchmark, production suite
or independent source investigation was rerun. No authoritative files changed.
