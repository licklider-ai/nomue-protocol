# Exact rational arithmetic to tail composition experiment

## Status and scope

This disposable author-side experiment connects represented binary64 observations
in a balanced replicated 2-by-2 design to a central F upper-tail enclosure. It is
not a supported Protocol implementation, a new Record surface, an accepted domain,
or a Research Gate decision. Scientific validity remains not asserted. No source
review of this new adapter, formal adoption, merge, or release is claimed.

The accountable drafting role is the preparation implementer, assisted by OpenAI
Codex on 2026-09-11. Tests and adapted oracle were prepared in the same authoring
context. Shared Python integers, Fraction, isqrt, and upstream code limit
independence. A separate-model review of the original methods is commissioned
separately; it does not automatically review this composition implementation.

## What the experiment computes

`prepare` validates four lists of finite binary64 observations, with equal counts
from 2 through 65, and recomputes the original integer-lattice arithmetic. The
fixed cell order is A0B0, A0B1, A1B0, A1B1; A, B, and AB use the upstream contrast
convention. Real-world factor names and scientific applicability are not checked.
A domain-separated digest binds exact float hexadecimal spellings, this order,
and a caller-supplied revision. The contrast, count, degrees of freedom, and
strictly positive exact SSE are also bound by recomputation. These are local
experiment carriers, not proposed public identifiers or schemas.

`compose` checks the carrier against the actual supplied observations. Changing
identity fields is rejected even when a resulting F happens to agree. A supplied
F interval is accepted only when it contains the recomputed exact rational F.
Exact SSE zero stops computation; positive SSE that rounds to zero does not.

`tail` also exposes a standalone nonnegative rational interval experiment. For
endpoints L and U, it evaluates the positive finite-sum candidate at both
endpoints and returns an outward enclosure using Q(U) <= Q(F) <= Q(L). Upstream
interval width and finite-sum evaluation uncertainty both contribute to the
returned width. It tries 128, 256, then 512 square-root bits. Binary64 projection
is reported only if both probability endpoints round identically; exhaustion
returns unresolved with no encoding. A wide upstream interval need not resolve.
No intermediate conversion of F to float occurs. Positive values below binary64
range and finite rationals beyond the largest binary64 remain distinct from
mathematical zero and infinity.

## Sources and adaptations

`INPUTS.json` pins the original arithmetic and tail commits and source hashes.
`upstream_arithmetic.py` is a byte-identical copy of the original candidate.
`rational_candidate.py` adapts the original candidate input guard to Fraction,
a 6500-bit absolute operand ceiling, and a joint count/width/precision admission
score implemented in `budget.py`. Its finite-sum formula is unchanged.
`rational_oracle.py` makes the corresponding guard adaptation to the distinct
polynomial-integral / remainder-bounded series implementation. Its exact
probability projection remains unchanged. Neither adapted file is an independent
new scientific investigation. Original source packets and reviews are unchanged.
The inherited Decimal diagnostic is unused by this composition experiment.

## Validation and limits

Run from the repository root:

```sh
python governance/drafts/release-4-preparation/rational-tail-composition-20260911/test_adapter.py
```

The executable report covers the 220 fixed binary64 tail inputs; non-dyadic
rationals; exact n=4, F=4 probability 35995/524288; point composition; widened and
false upstream intervals; identity mismatches; exact versus rounded-zero SSE;
malformed observations; resource guards; and deliberate precision exhaustion.
`RESULTS.json` contains measured assertion counts. The rational oracle shares
historical foundations and basic runtime primitives with the candidate. Tests
support the experiment; they do not establish all-input proofs or approvals.

The bit/count/precision caps and joint admission score restrict this experiment only. They are not a validated
wall-time or memory budget and are not a final supported domain. No serialization
parser, production API, significance decision, multiplicity adjustment, or
comparison tolerance is added. Internal rational success does not resolve public
finite SS/F representation requirements. A real execution deadline and full
support policy remain open. Standalone `tail` assumes the supplied F interval;
only `compose` establishes its relation to the supplied observations.

## Next checkpoint

Seek a bounded adversarial review of the exact first composition commit before
freezing any interface or support range. Focus on identity substitution, false
intervals, exact-zero versus rounded-zero behavior, non-dyadic endpoint propagation,
precision exhaustion, and runtime limits. Keep source-gate outcomes separate from
implementation evidence. Small repairs can then close this experiment round;
production promotion and Release 2 parity require further scoped decisions.

## Adversarial repair of the first composition

See `EXTERNAL-REVIEW.md` for the user-supplied external review receipt and each
disposition. The initial 312-check result remains in commit cd12103. The successor
replays all 220 historical rows: 219 retain their encoding; n=65, F=2^100 now
receives an explicit resource refusal. This is an intentional experimental
admission reduction, not unchanged 220-row acceptance.

The admission score checks a^2*w <= 1,000,000 and a^2*(w+b) <= 10,000,000,
where a=2(n-1), w is the larger rational component bit length, and b is root
precision. It is a conservative workload proxy, not a proved CPU-operation count
or wall-time guarantee. It rejects the reported expensive n=65 inputs before
root or monomial evaluation in both implementations. Sample timings are in
`REPAIR-RESULTS.json`; they are observations, not platform guarantees.

At adapter import, `pins.verify` checks SHA-256 for seven local dependencies,
including original source copies, adapted implementations, budget code, and the
historical 220-row expectations. The loader and manifest remain trusted; replacing
both is outside this integrity check. Tests mutate each pinned file separately.

Acceptance-plan row 14, submitted tail-evidence widening/falsification including
PR #283 O2, is **DEFERRED and unimplemented** in this adapter. It has no submitted
probability-evidence API. Its false/widened interval checks concern upstream F
only. The historical fixed checker does not close this adapter acceptance row.
A later evidence-consumer design and adversarial review are needed before such
an interface is frozen. Point-route equivalence is a wiring regression only;
the distinct-formula oracle supplies numerical cross-checks. Midpoint ambiguity
and wider-output containment are now explicitly tested. The oracle boundary
n=65, F=256 at 512 bits is tested within the existing 512-term cap; cap exhaustion
remains an explicit ArithmeticError. No larger oracle domain is claimed.

## Effective admission for ordinary observations

The guard reduces raw-data admission much more than the single refusal in the
historical fixed-F corpus suggests. At n=65, the first score permits at most
61 bits in either reduced rational F component. Ordinary binary64 observations
need not produce such a short fraction: the bounded seeded [0,10) probes in
`ADMISSION-PROBES.json` yield 119--123 bits at n=65 and all five refuse. At
n=45 and 46 all five tested samples pass admission; n=47 has both outcomes.
Passing admission here does not mean a tail was evaluated or resolved.

For a fixed width w, the first condition implies
n <= 1 + floor(sqrt(1,000,000/(4w))). For w=110--120 this is approximately
46--48 observations per cell, not a universal supported maximum of 46. Short
exact fractions can still pass at n=65. Thus the external review's observed
ordinary-data refusal is material, but cannot be generalized to every binary64
dataset. The final platform/resource domain remains open. Reproduce using
`python governance/drafts/release-4-preparation/rational-tail-composition-20260911/probe_admission.py`.
