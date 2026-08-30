# D5 runtime-series evidence candidate adversarial-review disposition

## Review identity

- Reviewed implementation: `2f2672fe45704d9860d52247862a13fb1dd30ca4`
- Reviewed tree: `a2cdd126b0dabbfda0cf04b60c67d32bca67050a`
- Baseline: `e64342522977ca4eea473b0915953cf32b0bdf27`
- Review-input commit: `80768e3765177086fee5d41d463be1d6f04e5b4d`
- Review type: external, independent, candidate-scoped adversarial review
- Verdict: **GO**
- Findings: zero blockers, zero should-fix items, and one nice-to-have item
- External research requested: none

The reviewer resolved the exact implementation and baseline from the repository,
confirmed the declared eighteen-file `+2321/-16` delta and implementation tree,
and verified both repository-native SHA-256 manifests. The unpacked GitHub
Actions evidence was bound to the implementation commit and its four source
copies were byte-identical to the reviewed tree.

## Evidence established by the review

The review independently derived the two-sided Student-t incomplete-beta
identity, both positive-series recurrences, the exact branch boundary, the
df-one and df-two special paths, exponent rescaling, pinned integer-power order,
iteration cap, candidate remainder expressions, and refusal behavior. No factor,
parameter, complement, sign, or recurrence discrepancy was found.

All nineteen evidence cases passed an Arb-independent, method-distinct route
using directed decimal interval arithmetic, exact rationals, closed-form
inverse-beta constants, and an independently bounded Machin-series value of pi.
The reviewer also reproduced deterministic evidence generation with the pinned
FLINT binding and confirmed that only documented environment provenance differed
from the repository-native evidence.

An independently selected 308-point corpus plus boundary sweeps found:

- no iteration-cap refusal or unresolved correctly rounded truth value;
- exact agreement between the TypeScript graph and an independent operation
  mirror;
- a maximum observed graph-to-truth distance of 105 ULP in that corpus;
- complete symmetry for the tested positive and negative statistics; and
- one explicitly recorded projection-boundary observation where the graph
  produced the minimum positive subnormal while the mathematical truth rounded
  to zero.

These are observations, not comparison tolerances, correct-rounding guarantees,
or a supported domain. The boundary observation remains input to the already
held truth-error-bound and projection-margin decisions.

The reviewer further reproduced twenty built-in coherent-mutation rejections,
additional hash-rebuilt mutations, strict non-JSON rejection, repository-level
promotion failures, the full repository check, all 132 conformance fixtures,
and Release 1 and authority guards.

## Finding disposition

One nice-to-have CLI consistency finding was accepted for immediate local
closure. A syntactically invalid JSON file in an otherwise reconstructed
evidence bundle caused the validator to exit nonzero through an uncaught
`SyntaxError` stack trace rather than through its structured error list.
Fail-closed behavior was preserved, and the issue did not affect mathematical
truth, evidence binding, authority, or the next D5 decision.

The repair catches JSON parse failures for the case manifest, environment, and
runtime-series evidence files, records `<file>: not valid JSON`, and stops
semantic validation when any parsed document is unavailable. Dedicated tests
cover all three malformed inputs. This repair requires only a close-only review;
it does not restart public review issue #25.

## Disposition

The runtime-series evidence candidate is accepted as independently reviewed
candidate work. It may remain Draft and proceed as an input to the next bounded
D5 decision after the local repair receives close-only confirmation.

This disposition does not establish correct rounding, a mathematical-truth
error bound, a projection-boundary margin, a supported domain or df ceiling,
final comparison tolerances or refusal-code spellings, runtime constants or
their final hash, runtime support, identifier issuance, Public Check or bundle
registration, R2-D5 completion, or any authoritative paired-t capability.
Public review issue #25 remains open.
