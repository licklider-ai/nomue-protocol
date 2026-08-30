# PR #34 truth-boundary evidence repair — close-only independent review

## Review type

Perform a close-only independent adversarial review of the two findings from the
full review of implementation commit
`973cc01ba666a9b3b5870b1d32849f00502aaa97`. Report in Japanese.

Do not reopen the already-closed transition-search mathematics, the 40 numerical
endpoint results, the 34-ULP maximum, the 10 projection-class disagreements, the
valid-bigint margin proof, or the Release 1 invariance unless the four-file repair
invalidates one of those results.

## Exact targets

- Repository: `licklider-ai/nomue-protocol`
- Pull request: `#34`
- Repaired implementation: `78c96328aeeee153aa6df92e01ee45bc1111fe4f`
- Repaired implementation tree: `7bdd03fb6b1ce65f82c765274d485bbd41ff4546`
- Original reviewed implementation: `973cc01ba666a9b3b5870b1d32849f00502aaa97`
- Original full-review record:
  `48ec887eb5d602a2058f6bcd773a5127a1989c3c`
- Expected repair delta: exactly four files, `+203/-28`

The current checkout is a transport commit. Its parent must be the repaired
implementation. The implementation-to-transport delta must be confined to
`review-inputs/r2-d5-truth-boundary-evidence-close/`.

## Identity checks

1. Confirm the checkout, parent, target tree, original target, and four-file repair
   delta against `TARGET.json`.
2. Confirm the transport-only delta is confined to this directory.
3. Verify `REVIEW-INPUTS.sha256` and the nested evidence `MANIFEST.sha256`.
4. Confirm every bundled source copy is byte-identical to its target-commit source.
5. Confirm `truth-boundary-evidence.json.generator_commit` is the repaired target.
6. Confirm issue #25 remains open and PR #34 remains Draft.

Identity failure is NO-GO. Do not substitute a moving branch or nearby commit.

## Finding 1 — BLOCKER-1 validator fail-open

The original validator accepted all five coherently rehashed rewrites below:

1. false inverse-beta enclosure and projection cell;
2. false graph remainder hex;
3. non-numeric truth precision history;
4. fabricated graph projection class with agreement and aggregate count updated;
5. FLINT `999.0.0` with environment and manifest hashes rebuilt.

Close this finding only if all of the following hold:

- a genuine target-head artifact validates;
- the permanent probe rejects 20 coherent mutations;
- inverse-beta enclosure, rounding cell, strict containment, and positive finite
  projection are checked;
- Python 3.12, python-flint 0.9.0, FLINT 3.6.0, exact environment keys, and non-empty
  platform provenance are checked;
- graph projection class and positive-series remainder hex are reproduced from the
  TypeScript graph;
- precision history is the exact doubling sequence from 128 through at most 8192;
- each of the five original rewrites, with every affected hash rebuilt, is rejected;
- the genuine 20-transition / 40-endpoint bundle remains accepted; and
- malformed nested structures now return errors rather than an unstructured crash
  where the repair touched structure validation.

Record the rejecting validator layer and message for each original mutation.

## Finding 2 — SHOULD-FIX-1 non-bigint margin bounds

The original emitted JavaScript returned
`candidate_stable_for_supplied_bound` for several values outside the declared
non-negative integer ULP-bound type.

Close this finding only if number `0`, number `-0`, `0.5`, `NaN`, positive and
negative infinity, `undefined`, null, and string `"0"` all return
`candidate_refusal / invalid_candidate_input`. Negative bigint must do the same.

Confirm that valid bigint behavior is unchanged at:

- minimum normal with `B=0` and `B=1`;
- largest normal below one with `B=0` and `B=1`;
- exactly one with `B=0` and `B=1`; and
- zero, minimum subnormal, and maximum subnormal.

## Regression and scope

From the repaired commit, rerun the normal repository check. If the local sandbox
has the known `tsx` IPC `EPERM`, rerun each entry point with `node --import tsx` and
distinguish that wrapper constraint from a repository failure.

Confirm:

- 33 test files / 351 tests;
- 132 conformance fixtures;
- generated, Phase 1, Phase 2A, oracle, history, authority, and private-dependency
  checks remain green;
- the evidence generator is unchanged;
- regenerated scientific payload is unchanged except for generator commit and
  environment provenance; and
- no support, truth bound, tolerance, identifier, Public Check, schema, bundle, or
  R2-D5 closure was introduced.

## Verdict and report

Return exactly one verdict:

- **GO** — both findings closed; PR may be marked Ready and merged as a
  non-authoritative candidate increment;
- **NO-GO** — at least one named finding remains open or regressed.

Report:

1. identity checks;
2. verdict;
3. finding closure table;
4. mutation closure table;
5. valid-bound regression table;
6. repository regression and authority table;
7. reproduced commands and results;
8. external research requirement (`none` unless a precise new external claim is
   exposed);
9. workspace cleanup confirmation.

Do not broaden this close review into final R2-D5 ratification.
