# Release 3 B-2 Mathematical and Numerical Design Review — Ordinary Supplied-p Holm

**Status: informative independent review; non-normative; not adopted.**

## 0. Correction, 2026-09-18

This document originally carried a second `SHOULD-FIX` stating that the
envelope's expected declaration and input context were reconstructed from the
Record under check, so that its suites established internal consistency rather
than agreement with an independently supplied target.

**That finding was wrong and is withdrawn.** It was reached by reading
`envelope.mjs:legacyTexts` without tracing its caller. `verify()` compares
`{record_id, revision_id, declaration, inputs}` taken from the Record against a
separately supplied `expectedText` by JCS equality, fails the `context` stage on
any difference, and only then calls `legacyTexts`. `entry.mjs:run` reads the
Record and the expected context from two different file paths, and the
candidate's own `context_binding` cases mutate the Record while leaving
`p.expected` alone and assert `context:fail` — one case re-synchronises
`p.expected.declaration` precisely in order to get past that stage.

The requirement `COUPLING.md` step 4 states, comparison "with an independently
supplied context, including exact actual record/revision IDs", is therefore
already implemented in candidate.3. The `submitted` evidence
(`record.payload.result.adjusted`) is correctly the one part not covered by that
equality, because it is what the recomputation checks.

The withdrawal is recorded rather than deleted. It does not affect any other
finding or any check result: no `C1`-`C10` outcome depended on it. Verified by
reading `envelope.mjs`, `entry.mjs` and `test_envelope.mjs`; the envelope suite
itself could not be executed here, for the runtime reason given in section 2.

## 1. Verdict

**`GO`** for the B-2 mathematical and numerical design scope at the exact head
recorded in [INPUTS.json](INPUTS.json).

- `BLOCKER`: 0
- `SHOULD-FIX`: 1 (repaired; see section 5)
- `OPTIONAL`: 2
- withdrawn after re-verification: 1 (see section 0)

The candidate's adjusted-value arithmetic reproduces Holm (1979) Scheme 1 exactly
on the paper's own level domain, its representation and projection agree with an
independently derived correctly-rounded reference, and its identity comparison
refuses every substitution attempted here, including an exact-value change that
preserves the displayed encoding. No defect was found in the derivation, the
lattice arithmetic, the cap-and-scan, the inverse mapping, the tie rule or the
refusal of the admitted domain.

The one surviving `SHOULD-FIX` item concerned portability of admission, not
whether the numbers are right, and is closed by the repair recorded in section 5.

This review supplies the separate-model pass that
[PROMOTION-CONDITIONS.md](../../governance/drafts/release-3-preparation/holm-promotion-proposal-20260911/PROMOTION-CONDITIONS.md)
requires for the B-2 row. It does not close the `Supported execution`,
`D0-to-public-surface mapping`, `Public outcomes and numerical policy` or
`Coupled implementation/conformance` rows, does not close the Research Gate for
Release 3 as a whole, and makes no adoption, registry, gate-state or release
decision.

## 2. Independence and scope

The candidate, its oracle, its tests and its reports were authored with OpenAI
Codex in the continuing preparation-author context. This review was performed in
a Claude Code session requested as `claude-opus-5`, which authored none of those
artifacts. That is the separate model required by
[governance/RFC.md](../../governance/RFC.md) research-gate item 2 for statistical
and numerical methodology.

Independence limits, stated rather than minimised:

- The reviewer read the author-side packets (`README.md`, `REPORT.md`,
  `DESIGN.md`, `PROMOTION-CONDITIONS.md`) in this session before writing its own
  checks. Every expected value in [independent_checks.py](independent_checks.py)
  is nevertheless derived from the primary source, from closed testing, or from
  CPython integer and `Fraction` primitives; no expectation is imported from the
  candidate, from `oracle.py`, or from any previous review report.
- The reviewer and the authoring context share CPython integer and `Fraction`
  foundations. That shared trust base is not removed by using different formulas.
- The exact served-model build is not attested, and the serving model can differ
  from the requested one. No human expert review and no subagent review was used.
- The review ran on CPython 3.11.15, not the candidate's pinned CPython 3.12.14.
  Checks `C1`-`C9` are exact integer and rational comparisons whose outcomes do
  not depend on the interpreter version; `C10` does, and says so.
- The reviewer inspected the supplied Holm PDF directly. It did **not** inspect
  IEEE Std 754-2019; see finding `OPTIONAL-2` and section 4.

Scope covered: (A) arithmetic and derivation, and (B) identity and scientific
claim boundaries. Scope **not** covered: (C) the experiment resource and
controlled-execution plan. `(C)` belongs to the separate `Supported execution`
row with its own accountable execution reviewer, and the runtimes the candidate
pins — CPython 3.12.14 and Node 24.19.0 — were unavailable here, so the guarded
CLI and its host-guard suite could not be executed. Section 7 records what a
separate execution pass would need to run.

## 3. What the primary source establishes

Read in full from the supplied copy: sections 1-3, Scheme 1, and the Theorem 1
proof. The decision-bearing facts used below are:

| Source fact                                                                                                                                                                                                                      | Where                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| For ordered obtained levels `R(1) <= ... <= R(n)`, Scheme 1 rejects `H(k)` when `R(k) <= alpha/(n-k+1)` and otherwise accepts `H(k)..H(n)` and stops                                                                             | Scheme 1, printed p. 66-67                                          |
| The comparison is non-strict. The Theorem 1 proof complements the rejection region as `{R_i > alpha/m for all i in I}` and concludes the test "stops in the step `n+1-m` or earlier"                                             | Theorem 1 proof, printed p. 67                                      |
| `alpha` is a fixed number with `0 < alpha < 1`                                                                                                                                                                                   | Scheme 1 preamble, printed p. 66                                    |
| The multiple level of significance is defined with `<= alpha`, and the Boole step requires the obtained levels to satisfy `P(R_i <= u) <= u` under a true `H_i`, with `R_k = d_k(Y_k)` the supremum of `P(Y_k >= y)` under `H_k` | Definition, printed p. 65; construction and proof, printed p. 66-67 |
| The paper contains no adjusted p-value. Scheme 1 is a decision procedure at a fixed level                                                                                                                                        | whole of section 2                                                  |
| The only stated requirement on the separate tests is that the obtained level can be calculated; there is no restriction on the type of test                                                                                      | printed p. 68                                                       |

The last two rows matter for the candidate's claim wording. The adjusted-value
form the candidate emits is a **downstream derivation**, and `DESIGN.md` says so
in those words. That disclosure is correct and should survive into any adoption
text unchanged.

## 4. Checks performed and results

[independent_checks.py](independent_checks.py) is self-contained and writes
[RESULTS.json](RESULTS.json). Run from the repository root:

```sh
python3 review-inputs/r3-holm-b2-numerical-review-20260918/independent_checks.py
```

Re-running rewrites `RESULTS.json`. The repository formats JSON with Prettier and
the script does not, so run `pnpm format` afterwards before `pnpm check`.

| Check | What it establishes                                                                                                                                                                                                                                              | Result                              |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `C1`  | The candidate's `adjusted_lattice`, compared as `<= alpha`, selects exactly the set Scheme 1 rejects, for 1200 random families over eight exact rational levels spanning `1/1000` to `999/1000`                                                                  | 9600 level-cases, **0 mismatches**  |
| `C2`  | At `alpha = 1` and above, the capped representation and Scheme 1 diverge, so the design's exclusion of `alpha = 1` is necessary and not merely cautious                                                                                                          | divergence reproduced independently |
| `C3`  | The same values agree with closed testing using Bonferroni local tests over every non-empty subset, an independent route to the adjusted values                                                                                                                  | 1200 families, **0 mismatches**     |
| `C4`  | `decode` returns the exact represented value of the eight bytes on the `2^-1074` lattice                                                                                                                                                                         | 20012 checks, **0 mismatches**      |
| `C5`  | `project` agrees with correctly rounded nearest, ties-to-even: exhaustive over the low subnormal band, over both class boundaries, over every binade for both significand parities and both midpoint directions, over the cap neighbourhood, plus a random sweep | 102940 checks, **0 mismatches**     |
| `C6`  | The admitted domain is exactly `[+0, 1]` in binary64. Negative zero, negative values, values above one, infinity, NaN, wrong byte length and `bytearray` are all refused                                                                                         | as tabulated                        |
| `C7`  | Permuting members, including tied p-values, does not change any member's adjusted value                                                                                                                                                                          | 2000 families, **0 violations**     |
| `C8`  | With a genuine display collision available, a one-unit change to an exact adjusted value is still refused. Exact comparison has priority over the displayed encoding                                                                                             | refused                             |
| `C9`  | Non-dict evidence, deeply nested evidence, extra and missing keys, `bool` where `int` is expected, `int` where `bytes` are expected, and an object with a hostile `__eq__` are all refused, and the hostile method never executes                                | all refused                         |
| `C10` | Search for an admissible 1024-member ordering that exhausts the 10240-comparison guard                                                                                                                                                                           | see `SHOULD-FIX-1`                  |

Three further properties were established by reading rather than by execution:

- **The tie rule is faithful to the source, not a convenience.** Under literal
  Scheme 1 a tie block cannot be split: step `k+1` compares against
  `alpha/(n-k)`, which is strictly larger than step `k`'s `alpha/(n-k+1)`, so a
  tied level that passes at rank `k` also passes at rank `k+1`. The candidate's
  prefix maximum gives every member of a tie block the same adjusted value, which
  is the same behaviour. `C1` exercises this because its generator draws repeated
  values deliberately.
- **The cap is safe only below `alpha = 1`, which is exactly Holm's domain.**
  `min(1, max_j T_j) <= alpha` and `max_j T_j <= alpha` agree for every
  `alpha < 1`; at `alpha = 1` the capped form rejects everything. `DESIGN.md`
  states this with a correct counterexample; `C2` reproduces it.
- **The declaration bridge does not re-implement the arithmetic.**
  `bridge.mjs` compares hexadecimal integers and `BigInt` values against the
  worker's reply and performs no floating-point work, so there is no second
  numerical implementation to diverge. Its identifier rule,
  `/^[A-Za-z0-9_.-]{1,64}$/`, is exactly the Python module's alphabet and length
  bound, so the narrowing from D0 identifiers to Holm labels happens before the
  worker and involves no truncation, normalisation or renaming. That closes the
  label-width gap recorded in `next-work-plan-20260911/PLAN.md`.

On IEEE mapping: this review establishes by independent computation that
`project` implements round-to-nearest, ties-to-even over the binary64 lattice. It
does **not** independently re-read IEEE Std 754-2019. The attribution of that rule
to clause 4.3.1, and of the field decomposition to clauses 3.3, 3.4 and 3.6, rests
on the separate-model clause pass preserved at
[`review-inputs/r4-ieee-clause-confirmation-20260911`](../r4-ieee-clause-confirmation-20260911/REPORT.md).
Within that reliance, the `IEEE source` row's bounded applicability to this
candidate is confirmed, subject to `OPTIONAL-2`.

## 5. Findings

### SHOULD-FIX-1 — the comparison guard is empirical, and its recorded headroom is optimistic

`candidate.ordered` refuses when either sort exceeds 10240 comparisons.
`REPORT.md` records that 3308 adversarial 1024-member orderings needed at most
8962 comparisons. An independent hill-climb over orderings reached **9285** on
CPython 3.11.15, 323 above the recorded maximum, leaving 9.3% headroom rather
than the 12.5% the record implies. A separate simulated-annealing search over
eight restarts and 360000 candidate orderings peaked at 9259, below the greedy
result. No ordering exceeding the budget was found by either strategy, and none
is claimed to exist.

Two consequences:

1. At `m = 1024`, whether an input is admitted depends on the interpreter's sort
   implementation rather than on any declared property of the input. Two
   implementations conforming to the same written admission rule could disagree
   about accept and refuse for the same family. For an experiment that is a
   documented limit; for a versioned public check it would be a determinism
   defect.
2. The recorded headroom must not be cited as a bound. The candidate's own report
   already says observed headroom is not a worst-case proof; this review supplies
   a concrete reason to treat that sentence as load-bearing.

The exposure is narrower than it first appears. The D0-bound path in `bridge.mjs`
admits only `all_pairs` families with `k` in `[3, 16]`, so at most 120 members,
where the guard is nowhere near binding. Only the standalone `transform` entry
point reaches `m = 1024`.

Suggested dispositions, any one of which resolves it: derive a comparison bound
for the admitted maximum and set the guard from it; replace the counted sort with
one whose comparison count is a function of `m` alone; or restrict the standalone
entry point to the bound path's family sizes and record `m <= 1024` as
experiment-only.

Reproduction of the 9285 figure: greedy hill-climb, seed 31337, 60000 iterations
over swap, segment-reversal and segment-shuffle moves, seeded from the best of
six structured starts. `C10` in the committed script runs a shorter search and
reports what that budget of iterations finds.

**Repaired, 2026-09-18.**
[holm-b2-repair-20260918](../../governance/drafts/release-3-preparation/holm-b2-repair-20260918/README.md)
replaces the counted runtime sort with a stable bottom-up merge sort whose merge
schedule is fixed by the item count. Comparisons are bounded by
`comparison_bound(n)`, which is 9217 at the admitted maximum of 1024 members and
therefore below the previous fixed ceiling, so the guard cannot fire for an
admissible family on any conforming Python. The repair leaves `transform`
byte-identical to the predecessor and is checked against it over 6000 carriers,
2385 of them malformed, with no divergence in any result or refusal reason. The
predecessor is not modified, so the packets that pin its bytes stay valid. This
closes the finding for the arithmetic module; wiring the successor into the
declaration bridge remains a separate decision.

### SHOULD-FIX-2 — withdrawn

Withdrawn on re-verification. See [section 0](#0-correction-2026-09-18). The
envelope compares the Record's declaration and input context against an
independently supplied expected context before any binding work, so the property
this finding claimed was missing is present.

### OPTIONAL-1 — a malformed p field is detected after a full identity sort

`transform` validates carrier shape, member shape and label alphabet, then runs
the identity sort over `m` labels, then checks duplicates, and only then checks
that each `p` is exactly eight bytes. A 1024-member family whose `p` fields are
the wrong type pays an `O(m log m)` sort before refusal. The work is bounded by
the same guard, so this is not a resource defect, but moving the `p` type and
length check ahead of the sort would match the ordering the design states for
itself — malformed structures refused before expensive work.

### OPTIONAL-2 — the IEEE signed-zero row reads backwards if applied to Holm

`review-inputs/r4-ieee-clause-confirmation-20260911/REPORT.md` states that the
candidate "maps both input zero encodings to integer zero" and projects exact
zero as `+0`. That describes the R4 arithmetic candidate. The Holm module refuses
`-0.0` outright, which `AUTHOR-INTAKE.md` records correctly in its own prose. A
reader connecting the IEEE report to the Holm slice could invert the convention.
A one-line pointer in the Holm packet, naming the refusal as the Holm-side policy
and the map-to-zero as the R4-side one, removes the ambiguity. No code change is
indicated.

## 6. Claim boundaries

The candidate's stated boundary is accurate and should be preserved verbatim.

Holm's guarantee is conditional on the obtained levels being genuine
(super-uniform) levels: the Boole step in the Theorem 1 proof needs
`P(R_i <= alpha/m) <= alpha/m` for each true `H_i`. Nothing in the candidate
checks, or can check, that supplied p-values have that property. Exact arithmetic
on eight bytes, unique labels and an `origin` string establish none of it; an
`origin` label is repeatable across hypotheses and is not evidence of
p-generation.

Accordingly the capability establishes arithmetic and identity consistency only.
It takes no `alpha`, emits no rejection decision and no significance boolean, and
supports no unconditional FWER claim. A supplied exact zero does not establish
that the upstream mathematical p was zero. These are the candidate's own words
and this review confirms they are the correct ones.

## 7. What a separate execution pass would need to run

Not performed here, and not required for B-2. If the `Supported execution` row is
taken up, it needs the pinned runtimes — CPython 3.12.14 and Node 24.19.0 — and
should cover the guarded CLI entry, the Node 22 host-guard refusal and its
cleanup receipt, the cgroup budget job, the worker cancellation boundary, and the
whole-call resource accounting. None of those bear on the findings above.

## 8. Reopen conditions

This result applies to the exact blobs in [INPUTS.json](INPUTS.json). It reopens
if the decode, cap-and-scan, projection, tie rule, admitted domain or evidence
comparator changes; if the family-size admission changes; if an `alpha` input,
rejection output or significance boolean is added; if the expected-context entry
is redesigned; or if the claimed equivalence is extended beyond `0 < alpha < 1`.
Ordinary typo and generated-file synchronisation work does not reopen it. The
`SHOULD-FIX-1` repair is checked against this exact predecessor; adopting it in
place of the pinned module is a separate wiring decision, not a reopen.
