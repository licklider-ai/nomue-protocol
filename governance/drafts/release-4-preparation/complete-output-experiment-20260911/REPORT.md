# R4 complete-output experiment

## Scope and disposition

This 2026-09-11 disposable experiment implements the raw-input wrapper proposed
at PR #293 repair `1ae29058f44dce65ba3a3ef0d018bdbea0d9f940`. It adds a
complete A/B/AB path over the existing exact arithmetic and finite-sum candidate,
with early input, representation and resource refusals. It is ready for a bounded
implementation review, not a supported Protocol procedure or release decision.

Prepared by OpenAI Codex in the continuing author context. The independent
arithmetic formula in the test harness and the reused tail oracle are separate
calculations, not independent investigators. The source assessment in PR #294,
`864766232988181e72ae18c235dbc815466b3a1d`, remains bounded to the inspected
IEEE clauses; no new source fact or whole-gate closure is claimed here.

## Reused code and trust boundary

Four files are byte-preserving copies from PR #288 at
`c61e734a1f19f6572100f2594dd24b1e01ea4d49`: `upstream_arithmetic.py`,
`rational_candidate.py`, `rational_oracle.py`, and `budget.py`.
`INPUTS.json` records the original paths, fixed commit and SHA-256. The wrapper
checks all four on import before importing them. The manifest, wrapper loader,
Python standard library, trusted module search path and a fresh process are
trusted. There is no hostile-code sandbox, generic evidence parser or claim that
hashes authenticate themselves. `SHA256SUMS` additionally inventories the packet
for reviewers; it is not an independently signed manifest.

Runtime probability bounds come from the pinned finite-sum candidate only.
The `projection` helper imported from the oracle module maps rational bounds to
an encoding; the independent probability function is used only by tests. Neither
Decimal diagnostics nor floating F is used to evaluate a runtime probability.
The unchanged upstream assertion is an internal exact-arithmetic invariant, not
a wrapper acceptance condition. The new wrapper and test decisions do not rely
on assertions that vanish under Python -O.

The input is an in-memory list of four equal lists of built-in finite floats,
with n in 2..65 and a 1..64 ASCII-character revision. Caller mutation during the
call, custom Python import state and arbitrary attacker-supplied Python objects
are outside this experimental runtime contract. No Record parsing path changes.

## Behavior

The wrapper owns a copy of observations, computes exact arithmetic once, and
binds revision, fixed cell order and original signed float encodings into the
identity digest. Arithmetic itself collapses both exact zero signs to mathematical
zero; input identity preserves their distinction.

It projects the mandatory estimates, SS, SSE and F in that order. Exact SSE=0
stops before F/tails; positive SSE projected to zero and any required exact
magnitude above maximum finite cause representation refusal. Signed estimates,
SS and F may project to zero but retain their exact rational values and projection
status. Displayed zero is not evidence of a scientifically negligible effect.

All three exact F values pass the existing count/width and precision work guards
before any tail evaluation. Candidate tails then run in A/B/AB order, at precision
128, 256 and 512 until their endpoint encodings agree. An unresolved tail returns
only an unresolved local outcome, its bounds and any earlier diagnostic tails;
it never returns a complete arithmetic/tail bundle. Unexpected exceptions fail
the experiment, rather than counting as planned refusal.

A complete experimental result has the 10 mandatory exact arithmetic quantities,
three tail quantities and three df pairs. Each exact/display quantity remains
associated with the fixed A/B/AB order. No scientific validity, multiplicity,
interval estimate, significance boolean or overall VERIFIED state is emitted.

## Verification and measured limits

`RESULTS.json` records 314 checks over 12 accepted arithmetic/oracle fixtures
and the refusal/control cases; optimized execution produced identical output. It includes actual check counts and exact input hex encodings. The tests
compare arithmetic with direct Fraction cell means and within-cell residuals,
compare projected quantities with rational-to-float conversion, and compare tail
encodings and overlapping bounds with the separate polynomial/series oracle.

Coverage includes ordinary/zero-effect inputs, positive F displayed as zero,
strictly positive probabilities displayed as zero, zero SSE, zero-rounded and
overflowed representations, and exact late-contrast resource refusal. Thirteen
planned refusal cases check exact stage/quantity/reason and zero tail calls.
Four temporary copied-packet dependency modifications fail with named hash errors.
Revision, translated same-F data and signed-zero input identity stay distinct.

The unresolved-tail path and missing-contrast invariant are injected control-flow
checks, not evidence that a naturally occurring raw-input unresolved case was
found. Interval carriers and submitted probability evidence remain unimplemented.
The design's maximum-finite and IEEE projection boundary evidence is reused;
this wrapper test suite does not repeat every upstream rounding case.

`BENCHMARKS.json` records ten input families in separate normal and optimized
Linux processes (20 runs), each limited to 30 seconds and 256 MiB address space.
Raw input encodings, decisions, Python/platform and peak resident memory are
recorded. Ordinary seeded n=46 completed; n=47 and n=65 refused by the work guard.
Zero-effect n=65 completed. The wide n=33 case reached the maximum admitted F
width of 244 bits and completed. This is data-dependent admission, not uniform
support for every n<=65.

The stress-46 family deliberately suppresses the first two projection successes
to exercise all three precisions for all contrasts. It is an instrumented
worst-schedule probe, not an observed natural need for 512 bits. The slowest
measured full call including imports took about 12.45 seconds; maximum measured
RSS was 15,068 KiB. No process timed out or hit its memory limit. These observations
do not prove the worst runtime over all admitted inputs, nor certify a platform.
The first wide probe at exponent 120 refused by the guard; the final exponent
116 fixture reaches the admitted frontier. No success is inferred from a refusal.

## Reproduction and remaining work

From this directory in a fresh Python process:

```sh
python test_complete.py > /tmp/r4-complete-normal.json
python -O test_complete.py > /tmp/r4-complete-optimized.json
cmp /tmp/r4-complete-normal.json /tmp/r4-complete-optimized.json
python benchmark.py > /tmp/r4-complete-benchmarks.json
sha256sum -c SHA256SUMS
```

Compare parsed test JSON with RESULTS.json; formatting tools may reflow JSON.
Benchmark timing/RSS values are observations and are expected to change. Timeouts,
nonzero child exits and unexpected exceptions fail the benchmark command; they
are not recorded as legitimate refusal evidence. No acquired PDF is redistributed.

Next: review complete-output semantics, pin/identity boundaries, preflight ordering,
partial-result behavior and resource evidence. Make only bounded repairs, then
close this experiment round. Supported-domain approval, public schemas/comparison
rules, interval carriers and the submitted-tail evidence consumer require separate
work. No authoritative file, existing verifier, Release 2/3 implementation,
prior review, formal decision, merge or public release is changed.

## Repository validation

Prettier, Markdown lint (404 files), repository validation through the Node
import loader, and staged whitespace checks passed. The four copied dependencies
were compared byte-for-byte with their pinned Git source, in addition to runtime
hash verification. The new code remains entirely in the disposable draft packet;
no production type or generated artifact changed. GitHub CI is reported on the PR.
