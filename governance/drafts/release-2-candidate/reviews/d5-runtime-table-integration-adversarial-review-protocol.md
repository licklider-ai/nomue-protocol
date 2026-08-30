# Release 2 D5 runtime-table integration adversarial review protocol

## Assignment

Perform an independent, adversarial, delta-scoped review of the Release 2
paired-t runtime-table integration candidate.

- Repository: `https://github.com/licklider-ai/nomue-protocol`
- Baseline commit: `a9f8bf157a327810cc81a56f998d3aefac65944e`
- Implementation commit: `f9b039d746fb32364d1cc9c517a71d56873dbc79`
- Public RFC: <https://github.com/licklider-ai/nomue-protocol/issues/25>
- Prior table-evidence target: `5d58990e8cb25920bda791d0f0308ab29dcea3fb`
- Prior independent review result:
  `ff808eb42e6d8382ad09dd36441d167d12d5c104`

Check out the implementation commit by exact hash in a detached worktree. Do not
review a moving branch head. Record the implementation tree hash and confirm that
its parent is the baseline commit above.

This is a non-authoritative candidate increment. Do not turn its intentionally
open decisions into findings merely because they remain open. Conversely, return
`NO-GO` if the change claims or activates Protocol support, silently selects a
final runtime table, changes the previously reviewed series graph, or cannot fail
closed when the candidate table differs from the reviewed bytes.

## Intended delta

The implementation is intended to do exactly the following:

1. record the independent `GO` disposition for PR #37's contiguous inverse-beta
   evidence table;
2. check in the exact reviewed table bytes with SHA-256
   `ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`;
3. validate that exact byte hash, closed JSON surface, ascending `df = 1..200`
   coverage, and positive finite binary64 cells;
4. look up the exact integer-df cell and pass its decoded binary64 value to the
   existing PR #33 runtime-series evaluation graph;
5. preserve the older per-case evidence-reproduction entry point unchanged; and
6. keep final table selection, supported df, truth-error bound, projection margin,
   iteration-cap guarantee, supported platform matrix, reason codes, Public Check,
   bundle, identifier issuance, and runtime support open.

The integration itself is intentionally marked
`incomplete_pending_independent_review`.

## Files in scope

Inspect every path changed between the exact baseline and implementation commits.
The intended changed-file set is:

- `governance/drafts/release-2-candidate/README.md`
- `governance/drafts/release-2-candidate/numerical/README.md`
- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
- `governance/drafts/release-2-candidate/numerical/runtime-table-integration-candidate.json`
- `governance/drafts/release-2-candidate/reviews/d5-runtime-inverse-beta-table-evidence-adversarial-review-disposition.md`
- `tooling/r2-paired-t-runtime-series/README.md`
- `tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json`
- `tooling/src/spikes/paired-t-numerical-readiness.ts`
- `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts`
- `tooling/tests/paired-t-numerical-readiness.test.ts`
- `tooling/tests/paired-t-runtime-table-integration-candidate.test.ts`

If the actual delta contains another path, report the identity mismatch and inspect
the extra path before continuing.

Also inspect, without treating them as changed files:

- `tooling/src/spikes/paired-t-runtime-series-candidate.ts`
- `tooling/src/spikes/validate-paired-t-runtime-series-evidence.ts`
- `tooling/src/spikes/validate-paired-t-runtime-inverse-beta-table-evidence.ts`
- `governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json`
- `governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json`
- the full prior independent review result at commit
  `ff808eb42e6d8382ad09dd36441d167d12d5c104`.

## Required checks

### 1. Identity and provenance

- Confirm the exact baseline, implementation commit, tree, and 11-file delta.
- Confirm the checked-in table is byte-identical to
  `review-inputs/r2-d5-runtime-inverse-beta-table/artifact/runtime-inverse-beta-table.json`
  at prior review-result commit
  `ff808eb42e6d8382ad09dd36441d167d12d5c104`.
- Independently recompute the checked-in file's SHA-256.
- Confirm the disposition accurately reports the prior target, review-input, result,
  verdict, findings, and evidence-local table hash.
- Confirm no private repository, private path, external authority system, or moving
  artifact is introduced.

### 2. Table validation and fail-closed behavior

Attempt at least the following mutations against the real validator:

- change one table bit while preserving valid JSON;
- reorder two entries;
- omit one df and coherently adjust `entry_count`;
- duplicate one df while retaining 200 entries;
- use df 0 or 201;
- use NaN, infinity, negative, zero, subnormal, uppercase, short, or malformed hex;
- change the scope, candidate key, target format, or evaluation endpoints;
- set `runtime_support_claimed` or `final_table_selected` to true;
- set `supported_degrees_of_freedom_max` to 200;
- add an undeclared top-level or entry field; and
- supply malformed JSON or an unreadable/missing table.

The exact reviewed byte hash must be independently enforced. A coherently changed
table must not pass merely because its internal metadata remains self-consistent.
Malformed inputs must not produce an uncaught exception in exported validation
functions.

### 3. Lookup and graph-equivalence checks

Independently decode the binary64 hex cells. For every integer df from 1 through
200, verify that the wrapper supplies the exact reviewed cell to the existing
runtime-series evaluator.

Use an independently selected statistic corpus that covers at least:

- `+0`, the smallest positive subnormal statistic, and ordinary small values;
- the two binary64 cells immediately below and above `|t| = 1`, plus exactly 1;
- moderate and large finite statistics;
- the largest finite statistic;
- positive and negative symmetry; and
- df 1, df 2, both parities above 2, internal values, and df 200.

For all cases where both paths return a result, require exact equality of branch,
p-value bits, iteration count, iteration cap, remainder bits, and projection. The
wrapper may add normalization-source metadata but must not change the series graph.

Confirm invalid input classification and ordering for non-integer df, df below 1,
df above 200, non-finite statistics, and negative zero.

### 4. Maturity and authority boundary

Confirm mechanically and by inspection that:

- the candidate table remains `final_table_selected: false` and
  `runtime_support_claimed: false`;
- the integration checkpoint remains non-authoritative, unissued, and
  `runtime_support_enabled: false`;
- `supported_degrees_of_freedom_max` and final table hash remain null;
- the evidence-local reviewed hash is not relabeled as the final runtime hash;
- `correct_rounding_claimed` and `truth_error_bound_complete` remain false;
- the integration is not loaded by the authoritative verifier, schema, registry,
  Public Check, bundle, conformance manifest, or normative specification;
- Release 1 frozen and supported behavior is unchanged; and
- issue #25 remains open and this increment does not restart or close its window.

Attempt promotion mutations in both checkpoint JSON files and the readiness JSON.
They must fail the relevant tests or validators.

### 5. Repository-wide checks

From a fresh clone at the exact implementation commit, install the pinned
dependencies and run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

If the environment prevents the `tsx` CLI from creating its IPC socket, record the
environmental limitation and run each underlying command with
`node --import tsx` instead. Do not treat that sandbox restriction as a repository
defect if the same source commands complete successfully through the IPC-free
entrypoint.

Confirm `git status --porcelain` is empty after the checks.

## Research-gate assessment

Determine whether this increment is a straightforward, bounded implementation of
the already researched and independently reviewed formula/table family, or whether
it introduces a new externally grounded numerical decision. Do not infer community
consensus from library agreement. If a new decision is present, identify the exact
decision and required primary-source work. Otherwise state why no new research pass
is required.

## Required output

Return one report with:

1. repository and commit identity;
2. exact changed-file assessment;
3. provenance and byte-identity results;
4. table-validation and mutation results;
5. full-df lookup and graph-equivalence results;
6. maturity and authority-boundary results;
7. repository-wide check results;
8. research-gate assessment;
9. findings classified as `BLOCKER`, `SHOULD-FIX`, or `NICE-TO-HAVE`; and
10. one overall verdict: `GO` or `NO-GO`.

`GO` means only that the integration increment may be merged as a
non-authoritative R2-D5 candidate. It does not approve a final runtime table,
supported df range, numerical guarantee, Public Check, bundle, paired-t support,
R2-D5 completion, or Release 2 publication.

If operating in the repository, write only `REVIEW-RESULT.md` under a new
`review-inputs/r2-d5-runtime-table-integration/` directory, commit it on a neutral
reviewer-owned branch such as
`review/r2-d5-runtime-table-integration-f9b039d7`, and do not modify the
implementation branch or implementation files.
