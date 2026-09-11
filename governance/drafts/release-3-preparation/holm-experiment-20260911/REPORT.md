# Ordinary Holm exact supplied-p experiment

## Disposition and provenance

An executable disposable candidate and distinct small-family oracle now accompany
the design at `f203eb12c036b40b3602f22603d39702cdba9bba` (PR #290). This is
an author-side exploration under the RFC carve-out, not design freeze, supported
Protocol behavior or full Research Gate closure. IEEE clause confirmation and
candidate-specific independent implementation review remain pending.

The preparation implementer used OpenAI Codex in the continuing author context
on 2026-09-11. Candidate, oracle, tests and this report share that authorship and
CPython integer/Fraction/runtime foundations. Different formulas do not establish
independent investigators. PR #289 supplies the separately recorded bounded Holm
source connection; it does not review this implementation. No normative schema,
check, tolerance, method selection, gate state, merge or release changes.

## Executable behavior

`candidate.transform` takes the proposed typed in-memory carrier and validates
shape, count, ASCII labels, exact case-sensitive unique hypothesis labels, and
p-value bytes. It decodes represented p-values to integers on the 2^-1074
lattice, sorts by (value, original index), computes capped cumulative maxima of
rank-scaled p-values, and maps exact outputs back to the original member order.
The standard runtime sort has an explicit comparison counter for both identity
and value sorting, with a 10240-comparison ceiling for each sort.

`project` uses integer rounding once after capping. Its returned eight bytes are
supplementary display evidence. `check_evidence` recomputes from the expected
carrier and compares complete evidence with exact types, integers and bytes.
Changing family, revision, member, origin, order, exact result or display refuses
the evidence, including an exact-value substitution that preserves its display.
No alpha input, scientific significance boolean, p-value generator, interval
consumer, or input-validity/FWER assertion is added.

`oracle.closed_testing` independently enumerates Bonferroni local tests over
all nonempty subsets for m<=8, and takes the largest containing-subset value for
each member. It imports no candidate code. It decodes through struct/Fraction
and projects through Fraction-to-float, rather than the candidate lattice code.
These shared runtime primitives and the design derivation remain trust limits.
The oracle is a trusted test helper, not a public malformed-input validator.

## Measured checks

The normal and optimized Python runs each passed 5361 explicit assertions,
including 320 small families against the subset oracle, 320 exact step-down
comparisons at rational levels strictly between zero and one, 4052 projection
checks, early-cap/endpoints, permutations, case identity and changed evidence.
Expected mathematical values are not produced from the candidate alone.

At m=1024, reverse order, full ties and mixed extreme values with maximum label
lengths passed. Transform plus evidence recheck took about 14--16 milliseconds
per case on this CPython 3.12.14 Linux run. Both entire suites ran under an
external 10-second timeout and 256-MiB virtual-memory ceiling. Maximum RSS is
recorded in RESULTS; it is distinct from the imposed virtual-memory limit.
These finite samples do not prove worst-case time or portable platform support.

The harness verifies the SHA-256 of candidate, oracle and test script before
importing them, including its own script bytes. INPUTS and the startup verification
logic remain trusted; this is not authenticated storage. Raw callers importing
candidate directly do not get this harness source-integrity check. The future
registered checker would need its own reviewed loading/distribution boundary.

## Reproduction

From the repository root on a Unix host with Python and `timeout`:

```sh
timeout 10s bash -c 'ulimit -v 262144; python governance/drafts/release-3-preparation/holm-experiment-20260911/test_candidate.py'
timeout 10s bash -c 'ulimit -v 262144; python -O governance/drafts/release-3-preparation/holm-experiment-20260911/test_candidate.py'
```

Each run rewrites RESULTS with that run's timings and environment. The submitted
RESULTS additionally retains the second run under `optimized_run` after comparing
its assertion mapping with the first; reproducing a single command does not
preserve that combined snapshot byte-for-byte. Never count timeout, memory failure,
an unrelated exception, or disabled assertions as successful refusal.

## Limits and next checkpoint

This first experiment executes a representative subset of the proposed acceptance
matrix, not every possible malformed shape, comparison-budget exhaustion or
maximum-size sorting pattern. The 1024-member samples are not a complete sorting
worst-case proof. The evidence comparator assumes ordinary acyclic in-memory
objects from this experimental caller; arbitrary deep/cyclic hostile object graphs,
JSON parsing and network ingress are outside its contract. It is not yet a
production hostile-input boundary. No undefined-input behavior is a public API.

Request a bounded adversarial review of this fixed implementation before any
promotion. Focus on the integer display encoding, cap/scan and inverse mapping,
identity and type substitutions, exact/display collision, startup integrity,
comparison exhaustion and admitted resource extremes. Extend tests only to close
specific findings. Preserve the source/IEEE and scientific-input limitations;
small code repairs can close this implementation experiment independently of
formal release decisions.
