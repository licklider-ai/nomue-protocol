# Release 2 D5 truth-error and projection-boundary evidence — independent adversarial review

## Review type

Perform a full independent adversarial review of the bounded increment in PR #34.
This is not a ratification review of the complete R2-D5 numerical contract. Report in
Japanese. Preserve exact identifiers, paths, commits, rational endpoints, and
binary64 hexadecimal values where needed.

The implementation remains a non-authoritative Draft candidate. A passing build or
the prior runtime-series GO is not by itself a GO for this increment.

## Exact targets

- Repository: `licklider-ai/nomue-protocol`
- Pull request: `#34`
- Implementation target: `973cc01ba666a9b3b5870b1d32849f00502aaa97`
- Implementation tree: `ff7207e70b41e4395a6c78f0cae58b76f71c7325`
- Baseline: `eb4285bf6df389177904943c0e2aa480dfd9d948`
- Expected baseline-to-target delta: exactly 15 files, `+1549/-2`
- Public review issue: `#25`, which must remain open

The current checkout is a transport commit. Its parent must be the implementation
target. The implementation-to-transport delta must contain only
`review-inputs/r2-d5-truth-boundary-evidence/`. Review the implementation target,
not the transport files as proposed production changes.

## Identity checks — do these first

1. Confirm the checkout commit and its parent against `TARGET.json`.
2. Resolve the implementation target, baseline, and declared tree in the same
   repository.
3. Confirm the baseline-to-target delta, file list, and line count exactly.
4. Confirm the implementation-to-transport delta is confined to this review-input
   directory.
5. Verify `REVIEW-INPUTS.sha256` and `evidence/MANIFEST.sha256`.
6. Confirm every bundled source copy is byte-identical to the corresponding file at
   the implementation target.
7. Confirm `truth-boundary-evidence.json.generator_commit` equals the implementation
   target, not the transport commit.

If identity fails, return NO-GO without substituting a moving branch, nearby commit,
or regenerated evidence.

## Known observations, not conclusions

- The supplied CI artifact reports 20 transition cases and 40 endpoints.
- It reports a finite-seed maximum of 34 ULP at
  `df100-positive_normal_to_positive_subnormal` and 10 graph/truth projection-class
  disagreement endpoints.
- `global_truth_error_bound_selected` is false, its value is null, the finite maximum
  is not a guarantee, runtime projection margin is inactive, and supported df is null.
- The first CI attempt failed only while converting an extreme-tail rational endpoint
  exceeding Python's default 4,300-digit conversion limit. The target disables that
  unrelated host limit and preserves the exact value; verify this behavior rather
  than accepting the summary.
- All three target-head workflows are recorded as successful in `WORKFLOW-RUNS.json`.
  Treat that file as metadata and rerun the checks independently.
- PR #34 is Draft and issue #25 remains open.

## A. Authority and maturity boundary

Attempt coherent promotion mutations across the candidate JSON, readiness checkpoint,
manifest, evidence, prose, and tests. Confirm the increment does not:

- issue an identifier or Requirement ID;
- register a schema, bundle, or Public Check;
- enable runtime support;
- select a supported df maximum, domain, comparison tolerance, refusal-code spelling,
  inverse-beta runtime table, or final content hash;
- promote the finite corpus maximum to a global truth-error bound;
- claim correct rounding for the runtime graph;
- close R2-D5 or issue #25.

Check the authoritative directories, reference verifier, generated surface, and
Release 1 history independently rather than relying only on prose.

## B. Transition-search mathematics

Independently establish or refute all of the following:

1. For fixed positive integer df, the exact two-sided Student-t p-value is monotone
   non-increasing in non-negative finite binary64 `|t|`, and the ordered projection
   classes used by the search are compatible with that monotonicity.
2. `locate_transition` has the correct binary-search direction, threshold rank,
   endpoints, and off-by-one behavior over all finite non-negative binary64 inputs.
3. Every reported pair consists of adjacent input cells and straddles the declared
   mathematical projection-class transition; do not confuse adjacent input cells
   with adjacent output cells.
4. The selected df seed and transition-family ordering match the manifest. Verify the
   df=1 exclusion from the subnormal-to-zero transition mathematically for every
   finite statistic.
5. The rounded-one-to-normal boundary is intentionally included for projection-class
   stability even though both classes are future support candidates. Verify that the
   code and prose now say “nearest projection-class transition,” not “nearest rejected
   class.”

Attack exact zeros, signed zero, minimum subnormal, minimum normal, values adjacent to
1, maximum finite input, and integer/bit-order conversions.

## C. Oracle, projection, and pointwise-error evidence

For every endpoint, or with a clearly justified exhaustive independent program:

- reconstruct the exact binary64 statistic as a rational;
- verify `p = I_{df/(df+t^2)}(df/2, 1/2)` with no missing factor or swapped beta
  parameter;
- verify the Arb enclosure and strict ties-to-even projection cell;
- verify precision escalation and fail-closed behavior at a cell boundary;
- verify huge rational endpoints are serialized without truncation or host-limit
  dependence;
- independently reproduce the runtime-series graph, inverse-beta projection,
  graph/truth ULP distance, class agreement, maximum, witnesses, and disagreement
  count;
- use a method-distinct high-precision route where practical. If it cannot establish
  an endpoint, report an evidence gap rather than treating cross-library agreement as
  proof.

Check especially all class-disagreement endpoints and the declared 34-ULP witness.
Determine whether any pointwise result is false, mislabeled, or silently used as a
global claim.

## D. Future projection-margin form

Review the form independently of any unselected bound. Assume only a future proven
global non-negative integer bound `B` in ordered binary64 ULP distance between the
runtime graph projection and correctly rounded mathematical truth.

- Prove or refute that requiring distance strictly greater than `B` from the nearest
  projection-class transition is sufficient for projection-class stability.
- Check the strict inequality, all off-by-one cases, ties, and the meaning of distance
  at minimum normal, maximum subnormal, largest normal below one, and exactly one.
- Check that the normal-to-rounded-one transition is deliberately conservative and is
  consistently described, even though both classes are possible future support
  classes.
- Attack invalid values, negative bounds, `-0`, NaN, infinities, values above one,
  zero, and subnormal projections.
- Confirm the helper cannot be mistaken for an active runtime rule and that no caller
  connects it to support.

Do not invent or recommend a numerical value for `B` from this finite evidence.

## E. Validator, provenance, and mutation resistance

Regenerate the evidence twice with the pinned `python-flint==0.9.0` / FLINT 3.6.0
route and the implementation commit in `NOMUE_GENERATOR_COMMIT`. Verify deterministic
payloads, provenance differences if the host environment differs, overwrite refusal,
and dependency fail-closed behavior.

Run the supplied validator and mutation probe, then add coherent mutations with all
affected hashes rebuilt. At minimum attack:

- support, issuance, closure, global-bound, margin-activation, and supported-df flips;
- source-copy substitution and repository/hash rebinding;
- transition order, identity, class, exclusion, adjacency, and endpoint changes;
- statistic exact value, truth enclosure, projection cell, graph result, ULP distance,
  witnesses, maximum, and disagreement count;
- malformed JSON, missing/extra files, duplicate manifest entries, symlinks, huge
  rationals, and undeclared keys.

Record the layer that rejects each mutation. A coherent evidence rewrite that the
validator intentionally permits must be judged against deterministic regeneration
and repository source binding rather than silently ignored.

## F. Regression and scope

From a fresh clone at the implementation target, run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
git status --porcelain
```

Also run the truth-boundary generator, validator, and mutation probe explicitly.
Confirm Release 1 guards, 132 conformance fixtures, existing oracle evidence,
generated-file checks, and the prior runtime-series candidate remain unchanged.
Distinguish a worktree `.git` pointer false positive from a clean-clone failure.

## Severity and verdict

- **BLOCKER** — mathematical/evidence falsehood, identity failure, authority leakage,
  Release 1 regression, or a fail-open path that invalidates the candidate.
- **SHOULD-FIX** — material ambiguity or integrity gap that must be repaired before
  using this increment in the next D5 decision.
- **NICE-TO-HAVE** — local improvement with no effect on evidence truth, authority,
  reproducibility, or decision safety.

Return one verdict:

- **GO** — keep Draft and use as input to the next bounded D5 decision;
- **GO WITH REPAIRS** — keep Draft, but complete the named repairs first;
- **NO-GO** — do not use this evidence until repaired and re-reviewed.

## Required report structure

1. Identity checks
2. Verdict
3. Findings with severity, exact path/reproducer, actual versus expected, impact,
   smallest repair, and review-window effect
4. Transition-search and margin-form closure table
5. Numerical endpoint and aggregate ledger
6. Evidence/provenance/mutation closure table
7. Authority and Release 1 closure table
8. Reproduced commands and observed results
9. Confirmed non-findings, especially attacked boundaries
10. External research requirement: `none` unless a precise unresolved claim needs it
11. Workspace cleanup confirmation

Do not broaden this into a full R2-D5 ratification review. Conversely, do not waive a
defect in this increment merely because the candidate is non-authoritative.
