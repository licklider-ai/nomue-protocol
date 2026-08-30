# Release 2 D5 runtime-series evidence candidate — independent adversarial review

## Review type and reporting language

Perform an independent adversarial review of the non-authoritative paired-t
runtime-series evidence candidate in PR #33. Report in Japanese. Preserve exact
identifiers, paths, hashes, formulas, binary64 values, and quoted English text
where needed.

This is a full review of this new numerical increment, not a ratification review
of the complete R2-D5 contract. The only permissible GO conclusion is that the
candidate may remain in a Draft PR and become an input to the next D5 decision.
It must not be described as supported, issued, authoritative, or complete.

## Repository-native review inputs

The reviewer invocation supplies an exact review-transport commit on branch
`review/r2-d5-runtime-series-evidence-2f2672fe`. Check out that exact commit
before starting. If the invocation does not pin the transport commit, stop and
request it; do not review a moving branch head.

All review inputs are under:

`review-inputs/r2-d5-runtime-series-evidence/`

Read and verify:

- `TARGET.json`;
- `WORKFLOW-RUNS.json`;
- `REVIEW-INPUTS.sha256`;
- `evidence/MANIFEST.sha256`; and
- every file in `evidence/`.

No ZIP attachment, Git bundle, or external file is part of this review.

Pinned implementation target:

- repository: `licklider-ai/nomue-protocol`
- PR: `#33`
- implementation commit: `2f2672fe45704d9860d52247862a13fb1dd30ca4`
- implementation tree: `a2cdd126b0dabbfda0cf04b60c67d32bca67050a`
- base commit: `e64342522977ca4eea473b0915953cf32b0bdf27`
- expected delta: exactly 18 files, `+2321/-16`

The review-transport commit is not the implementation target. Create a separate
clean worktree at the implementation commit for all builds, tests, code probes,
and numerical experiments.

The unpacked Actions artifact contains generated JSON whose exact bytes are not
Prettier-normalized. Preserve those bytes. Repository-wide formatting and test
commands belong only in the clean implementation-target worktree.

## Identity checks — do these first

1. Confirm the checked-out review-transport commit equals the exact SHA supplied
   in the invocation.
2. Confirm the implementation commit and base resolve in the same repository.
3. Confirm the implementation commit has the declared tree.
4. Confirm the base-to-implementation delta is exactly the declared 18 files and
   line count.
5. Confirm the implementation-to-transport delta contains only
   `review-inputs/r2-d5-runtime-series-evidence/`.
6. Verify every review input against `REVIEW-INPUTS.sha256`.
7. Verify every unpacked Actions artifact file against
   `evidence/MANIFEST.sha256`.
8. Confirm `evidence/runtime-series-evidence.json` and its copied sources bind
   to the implementation commit, not the transport commit.
9. Treat `WORKFLOW-RUNS.json` as metadata only; independently inspect and run
   the code instead of accepting its conclusions.

If identity fails, stop and return NO-GO. Do not substitute a current branch,
nearby commit, local working tree, live Actions artifact, or regenerated output.

## Known scope facts, not conclusions

- All candidate state must remain `non_authoritative_candidate` and unissued.
- `evaluation_df_max: 200` is an evidence target, not a supported maximum.
- `contiguous_evaluation_coverage_claimed: false` and
  `runtime_support_enabled: false` must remain true statements.
- ULP observations are diagnostics, not tolerances or accuracy promises.
- The per-case inverse-beta factor is evidence input. No runtime constant table
  or final table hash has been selected.
- Public review issue #25 remains open. R2-D5 closure remains incomplete.
- Candidate identifiers and Requirements remain unissued.

## Review questions

### A. Exact graph and formula correctness

Independently derive and check the implemented formulas, including:

- the Student-t two-sided tail identity through regularized incomplete beta;
- the lower-tail positive series and its coefficient recurrence;
- the central complementary positive series and recurrence;
- the exact `|t| <= 1` branch boundary and complement direction;
- the df=1 positive-series path without host `atan`;
- the cancellation-resistant df=2 algebraic path;
- exponent scaling and the pinned right-to-left binary integer-power order;
- the declared `40 * df + 64` evaluation cap; and
- every precondition, refusal, and finite-intermediate check.

Look specifically for missing factors of two, swapped beta parameters,
off-by-one recurrence terms, wrong complement, sign loss, premature rounding,
overflow in rescaling, and a code path that differs from the JSON/README graph.

### B. Termination, rounding, and binary64 behavior

Attack the stop rule `next positive term no longer changes the binary64 sum`.
Determine whether it can terminate before the correctly rounded result is
established, hide a later nonzero term, or interact incorrectly with the cap.

Probe at least:

- both sides of zero and `|t| = 1`, using adjacent binary64 values;
- df `{1,2,3,5,10,30,100,200}`;
- p near one, ordinary tails, normal/subnormal boundary, positive subnormal
  truth, and true values that round to zero;
- very large finite `t`, including maximum finite binary64 where applicable;
- signed zero, NaN, infinities, invalid df, and missing or invalid constants; and
- non-power-of-two exponents and cases sensitive to multiply order.

Check that refusal and diagnostic classifications remain distinct from support
or correctness claims.

### C. Independent numerical verification

Use an independent high-precision route for truth values. Do not use SciPy,
Boost, R, or another wrapper around the same implementation as a vote. Arb may
be used to validate the bundled enclosures, but use a method-distinct route
where feasible to attack the generator's assumptions.

For every repository-native evidence case:

- reconstruct the exact binary64 inputs;
- verify the declared inverse-beta enclosure and rounding cell;
- verify the exact-input Student-t p enclosure;
- verify the series truncation enclosure;
- recompute the TypeScript graph result and ULP observation; and
- confirm the certificate does not upgrade an observation into a guarantee.

Also run an independently chosen dense or adversarial corpus. Report the exact
sample design, maximum observed ULP distance, maximum iteration count, refusal
count, and any uncovered class. Observations must not be converted into a
tolerance or rectangular support domain.

### D. Evidence generator and provenance

Review the Python generator and TypeScript validator as mutually hostile
components. Test:

- exact input conversion and Arb enclosure extraction;
- rounding-cell construction and midpoint or tie handling;
- positive-tail versus rounded-zero classification;
- source copies, commit, environment, dependency, and content hashes;
- overwrite refusal, missing dependency behavior, and deterministic output;
- missing, added, reordered, duplicated, malformed, and coherently rewritten
  cases; and
- mutations that rebuild all superficial hashes while changing formulas,
  branch policy, cap, stop rule, state, or support claims.

Do not count a hash mismatch as sufficient coverage of a semantic mutation.

### E. Cross-artifact closure and strict JSON behavior

Confirm that JSON candidate, README, TypeScript graph, evidence cases,
generator, validator, readiness checkpoint, numerical-contract checkpoint,
workflow, and tests are mechanically tied together. Attack one-sided edits.

Specifically close the prior PR #31 NICE-TO-HAVE finding: nested `undefined`,
bigint, function, symbol, nonfinite, cyclic, and non-JSON object values must be
rejected by programmatic validation, while ordinary JSON key reordering remains
semantically irrelevant.

### F. Authority, maturity, and regression boundary

Try to turn the candidate into a support claim by mutating every relevant state
and prose surface. Confirm that no path can silently:

- issue an identifier or Requirement ID;
- register a schema, bundle, or Public Check;
- select a supported df maximum or supported domain;
- freeze a tolerance or refusal-code spelling;
- select a final constant table or content hash;
- close D5 or public review issue #25; or
- change Release 1 dispatch, meaning, schema bytes, fixtures, vectors, or
  history pins.

From a clean implementation-target worktree run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
git status --porcelain
```

Also reproduce the evidence workflow with the pinned Python dependency, validate
the result, run the coherent mutation probe, regenerate twice, and compare
bytes. Compare the regenerated semantic payload with the repository-native
evidence while accounting only for explicitly documented environment
provenance.

## Severity and verdict

Use:

- **BLOCKER** — mathematical or evidence invalidity, authority leak, Release 1
  regression, identity failure, or silent support or issuance claim.
- **SHOULD-FIX** — meaningful but locally repairable correctness,
  reproducibility, cross-artifact, or fail-closed defect.
- **NICE-TO-HAVE** — local improvement with no effect on mathematical truth,
  evidence binding, authority, or the next D5 decision.

Return exactly one verdict:

- **GO** — keep the Draft candidate and use it as a D5 decision input;
- **GO WITH REPAIRS** — keep it Draft, but repair named findings first; or
- **NO-GO** — do not use this candidate as a D5 decision input.

## Required report structure

1. Identity checks
2. Verdict
3. Findings with severity, exact path, reproducer, actual versus expected,
   impact, smallest repair, and review-window effect
4. Formula and branch closure table
5. Numerical corpus and enclosure ledger
6. Evidence, provenance, and mutation closure table
7. Authority and Release 1 closure table
8. Reproduced commands and observed results
9. Confirmed non-findings, especially attacked boundaries
10. External research requirement: `none` unless a specific unresolved claim
    genuinely requires new research
11. Workspace cleanup confirmation

A passing CI run, internal consistency, or prior research report is not by
itself a GO. Judge the exact numerical graph, independent evidence, fail-closed
behavior, and maturity boundary.
