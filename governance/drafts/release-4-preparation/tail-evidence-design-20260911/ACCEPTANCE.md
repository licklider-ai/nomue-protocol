# Consumer acceptance and adversarial cases

This is a proposed test inventory, not executed consumer conformance. Every
planned refusal matches its exact reason with explicit checks in normal and
optimized Python. Unexpected exceptions and timeouts fail tests. Expected
numeric values use independent formulas, not the candidate alone.

| Case                                                                          | Expected result                                                                                                                    |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Exact three-row evidence emitted from the fixed target                        | Scoped acceptance                                                                                                                  |
| Widened candidate enclosure still inside one rounding cell                    | Scoped acceptance                                                                                                                  |
| Candidate enclosure replaced with [0,1]                                       | Encoding ambiguity refusal                                                                                                         |
| Tighter valid independently established enclosure not containing C            | Conservative containment refusal; no assertion that the interval is false                                                          |
| Same pinned candidate at 512 bits when the target resolved at 128             | Nested strictly inside C; conservative containment refusal without any oracle                                                      |
| False singleton with same displayed value                                     | Containment refusal                                                                                                                |
| Altered encoding with valid candidate bounds                                  | Encoding refusal                                                                                                                   |
| Swapped/missing/duplicate contrast, changed df                                | Shape or target-binding refusal before probability work                                                                            |
| Changed revision, translated same-F observations or altered signed input zero | Identity refusal before probability work                                                                                           |
| Same identity string copied onto evidence for different target F              | Numerical containment/encoding refusal unless evidence genuinely satisfies the expected target; identity alone is never sufficient |
| One valid row followed by invalid row                                         | No overall probability acceptance                                                                                                  |
| Bool/int subclass/Fraction/float endpoint/custom object                       | Type refusal before numeric comparison or overloaded equality                                                                      |
| Extra keys, wrong key types, oversized containers                             | Shape refusal before expensive work                                                                                                |
| Oversized numerator or denominator                                            | Size refusal before gcd, Fraction or cross-products                                                                                |
| Zero denominator, negative endpoint, unreduced fraction or reversed interval  | Exact representation/domain refusal                                                                                                |
| Expected input fails PR #295 admission or tail is unresolved                  | No evidence acceptance; retain the underlying scoped failure                                                                       |
| Modified dependency or same-name module from another path                     | Named dependency refusal                                                                                                           |
| Submitter-selected precision, cache hint or code/URI                          | Extra-field refusal; no execution or dereference                                                                                   |
| Worst admitted endpoint sizes with all three target tails                     | Measure entire call; timeout/crash blocks experimental acceptance                                                                  |

## Historical O2 as a raw-input regression

Use cells [0,1], [0,1], [1,2], [1,2] with n=2. Direct arithmetic gives SSE=2,
A estimate=1, SS_A=2, F_A=4 and df=(1,4); B and AB have zero effects.
This realizes the original PR #283 O2 target (n=2, F=4) in the new raw-input path.

Reconstruct the witness from the fixed independent oracle: take its 256-bit lower
bound l, set p=ceil(l*2^400)/2^400, and independently verify p lies inside that
256-bit interval but below the oracle's 384-bit lower bound. Submitting [p,p]
for A, with p in reduced form, then supplies a demonstrably false interval. Preserve B/AB's valid rows.
Require a containment refusal with otherwise correct identity and encoding.
The original singleton proof and the consumer's conservative rejection condition
are distinct checks. Do not relabel a generic containment failure as proof that
every rejected interval excludes truth.

## Simple predicate witnesses

For predicate-only reasoning let the target be t=3/4, e=2^-56 and C=[t-e,t+e].
Both endpoints project to t. These are illustrative rational intervals, not an
assertion that the tail candidate emits C for some raw data.

- S=[t-2e,t+2e] contains C and still projects to t at both ends: accepted predicate.
- S=[t-e/2,t+e/2] contains t but not C: conservative refusal.
- S=[t-e,t-e] excludes t but projects to t: containment refusal.
- S=[0,1] contains C but cannot determine one encoding: encoding refusal.

`check_design_witnesses.py` executes the O2 reconstruction, the same-algorithm
tighter case and these predicate toys against the pinned PR #295 modules, and
records frontier endpoint sizes. It is reviewer-side design evidence, not the
consumer. Add natural producer enclosures for end-to-end tests; predicate toys
alone do not cover the consumer. Retain exact row operands and record test counts from actual
execution. Benchmarks and test-only diagnostics do not form submitted evidence.
