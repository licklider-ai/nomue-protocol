# Holm B-2 comparison-guard repair

**Status: informative unissued candidate repair; non-normative; not adopted.**
No registry, schema, Public Check, bundle, reason code, gate state, adoption or
release change is made here.

This packet closes `SHOULD-FIX-1` of the
[independent B-2 review](../../../../review-inputs/r3-holm-b2-numerical-review-20260918/REVIEW-RESULT.md).
It changes nothing that the review confirmed correct.

## The defect

The predecessor's `ordered` delegates to the interpreter's `sorted` through
`cmp_to_key` and refuses a family once either sort passes a fixed ceiling of
10240 comparisons. The comparisons CPython's Timsort spends are a property of
that sort implementation, so at the admitted maximum of 1024 members a family's
admission depended on the runtime rather than on any declared property of the
input. Two implementations following the same written admission rule could
disagree about accept and refuse for the same family.

The recorded evidence put the observed maximum at 8962 comparisons. The review's
independent search reached 9285 against the 10240 ceiling, leaving 9.3% headroom
with no derived bound behind it.

## The repair

`ordered` is now a stable bottom-up merge sort implemented in the module. Its
merge schedule is fixed by the item count, and merging a left block of `a` with
a right block of `b` costs at most `a + b - 1` comparisons, so the cost of any
family is bounded by `comparison_bound(n)` — a function of `n` alone.

At the admitted maximum, `comparison_bound(1024)` is **9217**, below the
predecessor's fixed ceiling. The guard therefore cannot fire for any admissible
family on any conforming Python. It remains in the code as an internal
invariant, not as an admission rule.

The comparison counts still vary with the input, because a merge stops as soon
as either block is exhausted. What they no longer vary with is the interpreter.

## What is unchanged

`decode`, `project`, `transform`, `identical`, `evidence_view` and
`check_evidence` are unchanged; `transform` is byte-identical to the
predecessor's. The admitted domain, the label rules, the family-size limit, the
refusal reasons and their order, and the evidence view all keep their previous
behaviour. Comparison counters remain outside evidence identity.

The review's `OPTIONAL-1` — that a malformed `p` field is detected only after the
identity sort — is deliberately **not** repaired here. Moving that check would
change which reason a multiply-malformed carrier reports, and refusal precedence
is its own decision.

## Checks

`test_repair.py` imports the predecessor read-only and never writes to it.

```sh
python3 governance/drafts/release-3-preparation/holm-b2-repair-20260918/test_repair.py
```

| Check | What it establishes                                                                                                                 | Result            |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `C1`  | Over 6000 carriers, 2385 of them malformed, the repaired module returns the identical evidence view or the identical refusal reason | **0 divergences** |
| `C2`  | Over 3000 sorts with deliberate key ties, the repaired sort returns the predecessor's exact permutation                             | **0 divergences** |
| `C3`  | Across thirteen family sizes and structured plus random orderings, no ordering exceeds `comparison_bound(n)`                        | **0 violations**  |
| `C4`  | 60 maximal 1024-member families are admitted, and neither module refuses any of them                                                | **0 refusals**    |
| `C5`  | Published `adjusted_lattice` and `display` values are untouched                                                                     | **0 divergences** |

Re-running rewrites `RESULTS.json`. The repository formats JSON with Prettier and
the script does not, so run `pnpm format` afterwards before `pnpm check`.

## Limits

This is an arithmetic-module repair. It supplies no scientific validity for
supplied p-values, no `alpha` input, no rejection decision and no FWER claim; the
review's claim boundaries are unchanged. It does not promote the module into the
declaration bridge, the envelope or any registered surface — the bridge still
pins the predecessor, and rewiring it is a separate decision with its own
evidence. It closes one review finding and nothing else.
