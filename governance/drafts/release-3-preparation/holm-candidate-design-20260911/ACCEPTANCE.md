# Proposed acceptance evidence before implementation promotion

These are hand-derived expectations and future test obligations, not executed
candidate tests. No candidate implementation accompanies this packet. Fractions
below are mathematical values; the future harness records exact eight-byte input
encodings. Every listed p input is dyadic.

| Case                | Inputs in original order            | Exact adjusted values in original order | Required observation                                                    |
| ------------------- | ----------------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| Single              | 1/8                                 | 1/8                                     | m=1 identity                                                            |
| Unsorted            | 1/2, 1/64, 1/16                     | 1/2, 3/64, 1/8                          | Correct inverse permutation                                             |
| Ties                | 1/8, 1/8, 1/2                       | 3/8, 3/8, 1/2                           | Equal values share adjusted value                                       |
| Plateau             | 1/8, 3/16, 1/4                      | 3/8, 3/8, 3/8                           | Cumulative maximum, not pointwise multiplication                        |
| Endpoints           | 0, 0, 1                             | 0, 0, 1                                 | Genuine represented endpoints                                           |
| Clipping            | 3/4, 1                              | 1, 1                                    | Cap is applied                                                          |
| Inclusive threshold | 1/8, 1/4, 1/2; diagnostic alpha=3/8 | 3/8, 1/2, 1/2                           | Only first member passes exact level comparison                         |
| First failure       | 1/4, 1/4, 1/4; diagnostic alpha=1/2 | 3/4, 3/4, 3/4                           | Sequential stop, not three independent passing thresholds               |
| Excluded level      | 3/4, 1; diagnostic alpha=1          | 1, 1                                    | Demonstrate false equivalence at alpha=1; diagnostic refuses that level |
| Smallest subnormal  | 1/U, 1/U                            | 2/U, 2/U                                | Exact positive output, no premature underflow                           |
| Upward midpoint     | x, x, x with x=1/4+2^-54            | 3/4+3*2^-54 for every member            | Display is 3/4+2^-52, strictly above the exact target                   |

For the last row, the exact result lies halfway between adjacent binary64 values
3/4+2^-53 and 3/4+2^-52. The latter has even low significand bit and is selected
by ties-to-even. The exact result is below that selected display.

Companion collision: x=1/4+3*2^-54, repeated three times. The exact adjusted value
is 3/4+9*2^-54, midway between 3/4+4*2^-53 and 3/4+5*2^-53. The former has even
low bit and is selected. At diagnostic alpha=3/4+4*2^-53 the displayed value
passes but the exact value fails. Distinguish these two midpoint directions.

## Independent checks requested

For small m<=8, compare the proposed prefix-maximum formula with closed-testing
Bonferroni: for member i, enumerate each nonempty subset S containing i, compute
min(1, |S|*min(p_j for j in S)), and take the maximum. This is a distinct finite
oracle, not the proposed production scan. The reviewer first checks its
mathematical equivalence; enumeration is not permitted in the large-m candidate.
Also compare exact step-down decisions for alpha strictly between zero and one.

Exercise permutations, tie-label exchanges, all-zero/all-one families, clipped
plateaus, both midpoint parity directions, normal/subnormal boundaries and
unchanged exact outputs under ambient Decimal/float settings. Input rejection
covers empty and 1025-member families, duplicate hypotheses, missing/mismatched
family or revision, invalid labels, negative zero, NaN/infinity, p>1 and malformed
byte lengths. Evidence substitutions include changed origin, changed member,
permutation mismatch, changed exact value with identical display and a swapped
family with identical numerical outputs. All failures refuse the whole carrier.

Resource experiments include m=1024 reverse order, full ties, extremes spanning
zero through one, maximum label sizes and maximum trace construction. Tests run
both normally and with Python optimization if Python is selected. Test success
checks explicit conditions and expected failure reasons; crashes do not count as
valid refusals. Record input/source hashes and verify trusted dependencies before
execution. Do not embed literal outcome counts or regenerate expected values
from the candidate alone.
