# Submitted probability-evidence consumer experiment

## Status and claim

Disposable, unissued R4 experiment, 2026-09-11. The PR #296 design now has an
executable consumer for three submitted probability intervals bound to expected
raw input. It is ready for bounded external adversarial implementation review;
it has not passed that review. No Research Gate, public registration, interface
freeze, scientific guarantee, merge or release is inferred.

`consume(expected_cells, expected_revision, submitted)` accepts only when all
three rows contain the fixed recomputed candidate enclosures and their endpoints
round to the submitted and expected encodings. Success is named
`probability_evidence_consistent_experiment`; scientific validity is `not_asserted`.
This conditional numerical consistency is not an independent proof that the
candidate contains truth. A tighter, mathematically valid interval can fail the
conservative containment check. There is no tolerance or overlap-only acceptance.

## Fixed inputs and implementation

| Input                             | Commit                                     | Use                                                          |
| --------------------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| Reviewed design, PR #296          | `dc3c1c88b684aed6f90c7d35b6d06fce501f8858` | Shape, refusal order, containment semantics and endpoint cap |
| Full output, PR #295              | `f8f3feb71404962262d1a9f78b5d37f04454f746` | Wrapper baseline and unchanged regression harness            |
| Rational arithmetic/tail, PR #288 | `c61e734a1f19f6572100f2594dd24b1e01ea4d49` | Four byte-identical numerical dependencies                   |
| IEEE supplement, PR #294          | `864766232988181e72ae18c235dbc815466b3a1d` | Existing bounded source confirmation; not consumer review    |

Only this new directory is added. Existing evidence and review packets remain
unchanged. `complete.py` is a local derivative of PR #295: input snapshot and
identity generation are extracted into shared helpers; `complete_snapshot` is an
internal entry for an already validated, owned snapshot. The numerical formulas,
representation policy, all-contrast preflight and tail schedule are unchanged.
Eleven full-output/refusal comparisons run against the hash-checked original
wrapper in fresh processes. Its copied 318-check harness also passes here.

The public entry for this experiment is `consume`; internal helpers assume their
validated operands. This is an in-memory Python test, not a JSON parser, Record
schema, check-version dispatch or implementation of a public verification API.
The caller supplies expected context independently of the submitted envelope.
Concurrent caller mutation is outside this contract.

All container shapes and key types are checked before field lookup/comparison
with unchecked objects. All endpoint types and bit limits pass before any gcd,
Fraction construction or cross-products. Identity and degrees of freedom bind
before exact arithmetic or tail work. All three rows complete before scoped
acceptance. Underlying input refusals preserve PR #295's `Refusal`; an unresolved
tail returns `unresolved_experiment` with no probability acceptance. Unexpected
exceptions and timeout are failed experiments, never counted as designed refusals.

The runtime loads the fixed candidate and binary64 projection helper. It never
calls the separate probability oracle. Submitted data selects no precision, cache,
source, URI or executable code. Exact integer zero, signed input zero identity,
positive quantities rounding to zero, finite-output refusal, and resource
admission remain those of PR #295.

## Evidence

- Consumer: 124 explicit checks, normal and optimized results identical. Includes
  O2 false singleton, same-algorithm 512-bit and independent-oracle tighter valid
  intervals, natural widened intervals, encoding changes, final-row failure,
  malformed and oversized endpoints, hostile equality controls, input binding,
  all-contrast preflight, unresolved control flow and one complete recomputation.
- Wrapper: unchanged 318-check harness, normal and optimized results identical.
  Uses a separate arithmetic formula and probability oracle, not only self-checks.
- O2 uses raw cells [0,1], [0,1], [1,2], [1,2], giving F_A=4 and df=(1,4).
  Its reduced singleton is inside the 256-bit oracle interval but below the
  384-bit lower bound, shares the displayed encoding and is rejected for candidate
  containment. Exact operands are retained as hexadecimal integers in RESULTS.
- Five runtime dependencies each reject a file mutation and a preloaded module
  with missing origin by name. Test-only wrapper baseline and harness hashes are
  checked too. The four numerical modules retain their upstream byte identities.
- Twelve isolated consumer probes cover six cases in normal and optimized Python.
  Largest observed elapsed time: 14.308 seconds; largest recorded peak RSS:
  22360 KiB. Every subprocess completes within 30 seconds and 256 MiB address space.

`BENCHMARKS.json` includes exact raw inputs, F widths, endpoint sizes, decisions
and environment. Ordinary n=46 uses 262144-bit endpoints. Wide n=33 exercises
large F and probabilities rounding to zero; n=65 zero effects remain admissible.
The stress n=46 control forces all three scheduled precisions for every contrast,
then checks outward dyadic intervals made from the ordinary producer enclosure.
The Fibonacci n=46 control uses consecutive Fibonacci endpoints (262125 bits)
for expensive gcd work, forces the same full schedule and ends in the intended
containment refusal. These are probes, not exhaustive worst-input or portable
latency proofs. Fixture construction happens outside the timed child; child
startup, fixture decoding and the entire consumer call are inside the measurement.

The first test run exposed a fixture mistake: increasing the encoding of 1 by
one triggers scalar-range refusal, not endpoint-encoding refusal. The test now
uses the adjacent smaller finite encoding to exercise the intended later stage.
No consumer behavior was changed to accommodate that mistaken expectation.

## Reproduction and trust boundary

From this directory on Linux with Python 3.12:

```sh
python run_checks.py > /tmp/tail-evidence-results.json
python benchmark.py > /tmp/tail-evidence-benchmarks.json
sha256sum -c SHA256SUMS
```

Results are printed; these commands do not rewrite committed results. Environment
fields can differ across hosts and benchmark timings vary. `run_checks.py` runs
both normal and `-O` subprocesses with a 30-second / 256-MiB envelope and checks
full result equality between the two modes. Counts are derived from executed
checks. The runtime numerical candidate remains the producer under examination;
separate-formula test evidence is not separate-investigator attestation.

INPUTS hashes bind the four numerical modules and derived wrapper before import,
with module-origin checks before and after import. The loader (`consumer.py`),
manifest and trusted fresh Python runtime/module path are the trust root.
SHA256SUMS inventories other files for reviewer verification, not self-authentication.
A forged in-memory module with a matching `__file__` is not ruled out. This is not
a hostile-code sandbox. No uploaded licensed source is redistributed.

Formatting, Markdown lint (409 files), repository validation and whitespace
checks pass. GitHub CI is assessed separately on the published commit.

## Disposition and next gate

PR #288's deferred submitted-tail-evidence row now has an experimental
implementation and O2 regression here. Its review/acceptance gate remains open.
Obtain a bounded external review of operand validation order, runtime dependency
binding, containment and rounding semantics, partial-failure handling, and the
combined endpoint/tail resource probes. Repair only concrete defects, record the
review against a fixed commit, then close this experiment round.

R4 public support policy, Record/Contract binding, schema and public check-version
integration, independent gate decisions and scientific input/model validity remain
outside this packet. R3 and Release 2 are unchanged.

Prepared and tested by OpenAI Codex in the continuing author context. The work
reuses the user-supplied external PR #296 review recorded in that packet; no new
independent reviewer or model identity is claimed. Runtime environment is captured
in RESULTS and BENCHMARKS. The immutable content identity is the containing commit
and SHA256SUMS inventory.

## External implementation review receipt

A user-supplied bounded adversarial implementation review of commit
`60d62f61eb8bd5bf4c915098b6af50a683122025` found no BLOCKER and no SHOULD-FIX
code defect. Reviewer/model identity and raw artifacts were not supplied; the
receipt is attributed to the user. This record was prepared in that reviewer's
session on 2026-09-11, not by the original author context, and is not an
independent close review of itself. No consumer, wrapper, test or benchmark
code was changed; only this section and the inventory hash of this file.

Reported checks on CPython 3.11.15: `run_checks.py` reproduced 124 consumer
and 318 wrapper checks with parsed results equal to the committed record apart
from environment fields; `benchmark.py` reproduced all twelve probes with the
same decisions and a largest elapsed time of 14.62 seconds; all fifteen
inventory hashes matched and the four numerical modules matched PR #288
byte-for-byte; the derivative wrapper differs from its pinned predecessor only
by the snapshot/identity extraction; expected-input validation precedes
submission validation, identity and df binding precede endpoint gcd work, and
gcd work precedes the single recomputation; hostile objects, oversized scalars
and oversized integers at every envelope and row position were refused by the
intended shape, type, size or range reason within milliseconds and before any
overloaded comparison; the `target encoding` branch is unreachable because
containment plus unique endpoint rounding already fix the encoding, so it is
defensive only; a heavier admitted case than the recorded probes, n=46 raw
data with all three F widths at 121 bits, cap-size consecutive-Fibonacci
endpoints on every row and the forced full precision schedule, ended in the
intended containment refusal after 14.93 seconds with 25,072 KiB peak RSS.

The measured margin against the 30-second envelope is therefore about two on
this host; a host about two times slower would approach it. This remains an
observation, not a portable bound, and the envelope is not a supported limit.
