# D5 truth-error and support-closure adversarial-review disposition

## Review identity

- Baseline: `6fad249dd715369de92c7c941a42ddcc34525381`
- Reviewed implementation: `2b9d3f40a1e067d85a8856585f597394d5f98761`
- Reviewed implementation tree: `87bd33055b91cceb2da2552248fe39768b512777`
- Independent review-result commit: `773b0eadf02618c74c11c7e215d9b7d5c1f75528`
- Supplemental self-review result: `befb9dc969d352764ca71152d56f6325980267d5`
- Repair commit: `84debc3f8af699fcb317ee9c9925186de20df12f`
- Repair tree: `cf339e15d5626a67cc5406a029244b3f81149735`
- PR #46 merge: `612d0b943e34b55d8bd8cfe284d8dcdfbd3820a2`
- Independent review type: external, independent, candidate-scoped adversarial review
- Independent verdict: **GO** for non-authoritative candidate merge only
- Independent findings: zero blockers, one should-fix item, and three nice-to-have items
- Additional primary-source research requested for the candidate increment: none

The independent reviewer used a detached exact checkout and a separate fresh clone,
confirmed the implementation parent and tree, and found no unexpected implementation
path. The review-result commit itself has the baseline as its parent and adds only the
review report; it is not a child of the implementation commit. The report's explicit
implementation, parent, tree, and 20-path identity checks therefore establish the
review target. This disposition does not infer target identity from reviewer-branch
topology.

The supplemental result is an author-context adversarial self-review. It is a direct
child of the reviewed implementation, but it is explicitly non-independent and cannot
replace the independent review. It returned `NO-GO` for the unrepaired implementation
under a stricter no-uncaught-exception reading and identified two should-fix boundary
findings. Its evidence is used only as additional repair input.

## Evidence established by the independent review

The reviewer independently reproduced the reviewed inverse-beta table binding as
`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`
and confirmed that table lookup cannot bypass exact-byte and closed-surface
validation. The proof replay matched the existing table-connected graph in branch,
p-value bits, iteration count, and iteration cap throughout the deterministic and
randomized attacks. Across 410,354 evaluations, no replay divergence was observed.

The review independently re-derived the normal binary64 roundoff composition,
adverse division direction, gamma re-indexing, square-root cell check, stopping
observation, positive-series remainder bounds, central-complement conversion, and
relative-error-to-ordered-cell conversion. It specifically attacked the invalid
simple-index shortcut for division and the bounded re-index search. No understated
accepted bound, projection leak, or fail-open search exhaustion was found.

The required df 197 witness reproduced with a mathematical-truth distance of 374
ordered cells and a conservative candidate input-specific bound of 2,978 cells. The
df 200 long-series checkpoint reproduced at 5,182 iterations with candidate bound
158,044 cells. The closed 20-case evidence bundle produced 16 candidate acceptances,
three proof-precondition refusals, and one projection-margin refusal. Its 22 bundled
mutations and the reviewer's additional coherent mutations were rejected.

The reviewer also checked every integer df from 1 through 200 in independently
selected numerical work, exercised projection transitions and extreme values, and
found no accepted case outside its input-specific candidate bound. These finite
checks are diagnostic evidence, not contiguous support or a global bound. The
platform premise for correctly rounded basic operations remains unselected.

No authoritative registry, schema, conformance expectation, reference verifier,
Public Check, bundle, normative specification, or Release 1 behavior changed. The
authoritative snapshot hash remained
`sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`.

## Editorial normalization

The independent report says that two paths were added while immediately listing
three added paths. The Git delta contains three added and seventeen modified paths,
for the correctly reported total of twenty paths and `+1464/-25`. This is a
non-substantive transcription error and does not change the evidence, findings, or
verdict.

## Finding disposition

The independent review reported the following findings:

1. **S1:** a required bundle file replaced by a directory could escape the validator
   as an uncaught filesystem exception;
2. **N1:** bound-formation failure and graph-reproduction mismatch shared one
   diagnostic classification;
3. **N2:** a square root reused by two downstream operations was counted twice; and
4. **N3:** raw `null` or `undefined` evaluator input could throw.

The supplemental self-review reported the raw-input failure as its S1 and broadened
the filesystem issue into S2, covering missing roots, wrong file types, malformed
top-level or nested shapes, and other exported candidate validators. These overlap
the independent findings but require a wider hostile-input regression surface.

All findings were accepted for repair in
`84debc3f8af699fcb317ee9c9925186de20df12f`. Its only parent is the original review
protocol commit `34da4fc19d38969269862f7603ca5ccfd8750659`; that parent differs from the
reviewed implementation only by the protocol document. The exact repair-parent to
repair delta changes ten implementation and test files with 326 insertions and 35
deletions:

- `tooling/src/spikes/paired-t-numerical-readiness.ts`
- `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts`
- `tooling/src/spikes/paired-t-support-domain-candidate.ts`
- `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`
- `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`
- `tooling/tests/paired-t-numerical-readiness.test.ts`
- `tooling/tests/paired-t-runtime-series-evidence.test.ts`
- `tooling/tests/paired-t-runtime-table-integration-candidate.test.ts`
- `tooling/tests/paired-t-support-domain-candidate.test.ts`
- `tooling/tests/paired-t-truth-error-support-candidate.test.ts`

The repair:

- preflights the evidence root and closed file set, rejects symlinks and non-regular
  entries, and contains read and structural failures in validation errors;
- makes graph-reproduction and truth-error-bound-formation failures distinct;
- counts verified square roots by distinct labels rather than dependency-path use;
- parses the truth-error and table-integration inputs as closed two-key unknown
  objects before evaluation; and
- contains hostile top-level and nested shapes in the readiness, support-domain,
  and boundary-corpus validators.

The repair changes no formula, roundoff envelope, remainder multiplier, table cell,
evidence case, generator, checkpoint JSON, selected bound, supported df, platform
state, or authority state. PR #46's merge commit has the same tree as the repair
commit.

## Close-only review

- Review-input commit: `1234b8a256b01455c984f4ebcd35a45b8ab114a1`
- Independent review-result commit: `8783491dbf168d177faa30238349d1c7fc9663af`
- Review type: external, independent, close-only review of S1 and N1-N3 plus the
  supplemental hostile-input findings
- Verdict: **CLOSED**
- New findings: zero blockers, zero should-fix items, and one nice-to-have item
- Additional primary-source research requested: none

The review-result commit is a direct child of the review-input commit and adds only
`review-inputs/r2-d5-truth-error-support-repair-close/REVIEW-RESULT.md`. The reviewer
confirmed the repair commit, tree, single parent, ten-file `+326/-35` delta, and the
byte-identical PR #46 merge tree in a detached fresh clone.

The filesystem battery covered 26 damaged-bundle and malformed-shape cases. Every
case returned a structured, nonempty error list without an exception or stack trace;
the original directory-for-file `EISDIR` reproducer is contained, while the closed
file set and manifest, source, commit, and checkpoint bindings remain enforced.

Reviewer-owned instrumentation forced both bound-formation failure and graph-replay
divergence. They returned `truth_error_bound_not_finite` and
`proof_graph_reproduction_mismatch`, respectively, with both support claims false
and no projection-margin fall-through. Distinct square-root counts matched an
independent path derivation for all 1,234 accepted corpus cases, the df-two tail
regression reports one check, and one-cell root perturbations still refuse.

The two evaluators handled 58 hostile calls without throwing or leaking a claim, and
the three candidate validators handled 90 hostile calls with deterministic errors.
A 1,380-input original-to-repair comparison found no non-permitted difference; the
only differences were seven df-two tail square-root counts corrected from two to
one. The regenerated 20-case bundle retained its 16/3/1 dispositions, rejected all
22 mutations, and preserved the df 197 374-cell observation under its 2,978-cell
candidate bound. The inverse-beta table and authoritative snapshot hashes remained
unchanged, the full repository check passed, and issue #25 remained open.

The one new nice-to-have observation, C1, notes that the truth-error evaluator now
requires exactly two own input keys while the table-integration evaluator retains
its previously reviewed, type-checked acceptance of extra or inherited fields. This
is not a regression, throw, value change, or support-claim leak. It is deferred to a
later input-contract and final-reason-code increment; changing another reviewed
surface solely for stylistic symmetry would add a new review loop without advancing
R2-D5 closure.

## Disposition

The truth-error and support-closure implementation is accepted as independently
reviewed, non-authoritative candidate proof engineering. The original `GO` approved
PR #46's merge in that limited state, and its S1 and N1-N3 repairs plus the
supplemental hostile-input repairs are independently closed. The readiness summary
may record `reviewed_candidate_proof` while every selection and support field remains
unset.

This disposition does not select an input-specific or global truth-error bound,
activate a projection-margin predicate, establish a supported domain or supported
degrees-of-freedom maximum, select a platform matrix, freeze final reason codes,
select a final runtime table or hash, issue a Public Check or bundle, establish
paired-t support, complete R2-D5, publish Release 2, or close public review issue #25.
