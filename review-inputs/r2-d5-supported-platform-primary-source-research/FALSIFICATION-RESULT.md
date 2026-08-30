# Supported-platform predicate falsification result

## Identity and scope

- Provenance role: independent platform-predicate falsification investigator
- Repository baseline: `cb4c04ad5898d6e95797d252c5ecd2d839fc42c7`
- Review mode: read-only
- Scope: false-accept and false-refuse analysis for the current table-connected
  Student-t tail graph and input-specific truth-error proof

## Repository boundary established

The current truth-error evaluator first runs the tail graph and then performs a
separate proof replay. It compares final branch, iteration, cap, and p-value bits,
and performs exact rounding-cell checks for roots encountered by the replay. It
does not record and independently verify every primitive result of the original
execution.

The evaluator receives `(degreesOfFreedom, testStatistic)`. It does not prove the
upstream G4 pair subtraction, reduction, variance, standard-error square root, or
statistic division in `reference/spikes/paired-t.ts`.

## Strategy attack

| Strategy                                | False-accept path                                                                                                   | Useful role                                    | Disposition                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| Static runtime/OS/architecture matrix   | Identical labels can cover custom builds, changed controls, native interference, or a later backend revision        | Reproducibility scope and maintenance boundary | Necessary but insufficient                           |
| Finite startup self-test                | The test can pass before state drift, intrinsic mutation, tier change, or execution of an uncovered arithmetic cell | Early refusal and deployment diagnostics       | Necessary diagnostic, not proof of the returned call |
| Separate graph and proof replay         | Equal final bits can hide unbound or unverified original intermediates; the replay is not the returned execution    | Development cross-check                        | Insufficient for the final predicate                 |
| Per-invocation exact trace verification | Conservative rejection at missing, malformed, or unverifiable nodes                                                 | Direct evidence about the returned computation | Required core within the trusted runtime boundary    |
| Native FP-state guard                   | Samples concrete control state but creates its own native surface and cannot prove every interval between samples   | Optional deployment diagnostic                 | Hardening, not a replacement for trace verification  |

## Minimum proof obligations proposed

1. Bind code identity, table identity, input, branch, iterations, operation order,
   proof data, and returned binary64 bits to one immutable invocation trace.
2. Decode every actual `+`, `-`, `*`, and `/` operand and result as exact dyadic
   rationals and independently verify roundTiesToEven with exact integer arithmetic.
3. Apply the existing strict exact-rational rounding-cell proof to each actual
   `Math.sqrt` result.
4. Reject a trace with an omitted, duplicated, reordered, relabeled, or unexplained
   primitive operation.
5. Preserve the existing normal-intermediate, remainder, truth-error, and strict
   projection-margin predicates.
6. State and enforce a controlled execution profile. If the profile cannot exclude
   unreviewed native callbacks or establish its code and intrinsic identity, refuse
   support.
7. Treat a cross-platform corpus as admission and regression evidence, not as the
   mathematical proof of unexecuted cases.

## Hostile cases for a later implementation review

- source-order operations whose exact result is immediately below, at, and above a
  binary64 rounding midpoint;
- both tail branches, both sides of `|t| = 1`, long-series and cap-adjacent cases,
  and the reviewed high-error witness;
- minimum-normal and subnormal boundaries, signed zero, overflow, and non-finite
  intermediates;
- a state or intrinsic change after startup diagnostics;
- a graph/replay divergence that preserves the final p-value bits;
- missing, duplicated, reordered, or hash-consistent forged trace nodes; and
- a platform tuple or executable that is absent from the exact allowlist.

## Conclusion

No finite predicate establishes that a named runtime will behave correctly for
every future execution. Within a non-malicious pinned-runtime threat model, a
static allowlist plus diagnostics and exact verification of the one returned
invocation supplies a fail-closed candidate. Without the actual-trace binding and
exact primitive checks, the present supported-platform premise should remain
unselected.
