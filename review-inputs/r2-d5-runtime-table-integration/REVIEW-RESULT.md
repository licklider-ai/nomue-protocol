# R2-D5 runtime-table integration candidate — independent adversarial review result

**Review date:** 2026-08-30 (Asia/Tokyo)
**Review type:** independent, adversarial, delta-scoped review of PR
[#41](https://github.com/licklider-ai/nomue-protocol/pull/41)
**Reviewer-owned branch:** `review/r2-d5-runtime-table-integration-f9b039d7`
(based on `main`, no implementation file touched)
**Protocol identity confirmation:** the review instructions supplied for this
pass are byte-for-byte identical to the repository-native protocol document
at commit `b3670f98dd40d2d08516e037ad36f1c2bc3b4100`
(`governance/drafts/release-2-candidate/reviews/d5-runtime-table-integration-adversarial-review-protocol.md`),
which PR #41 itself references. No divergent instruction was substituted.

---

## 1. Repository and commit identity

| #   | Check                                                   | Result                                                                                                                |
| --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | Detached worktree checkout at the implementation commit | **PASS** — `git rev-parse HEAD` = `f9b039d746fb32364d1cc9c517a71d56873dbc79`                                          |
| 2   | Implementation tree                                     | **PASS** — `git rev-parse HEAD^{tree}` = `e2954ceac411038390a7239ad723abec9c25a58d`                                   |
| 3   | Parent = baseline                                       | **PASS** — `git rev-parse HEAD^` = `a9f8bf157a327810cc81a56f998d3aefac65944e`, matching the declared baseline exactly |
| 4   | Not a moving branch head                                | **PASS** — checked out by exact hash in a detached worktree; PR #41's head branch was never checked out directly      |

No identity failure.

---

## 2. Exact changed-file assessment

```text
$ git diff --shortstat a9f8bf15... f9b039d7...
11 files changed, 1541 insertions(+), 26 deletions(-)
```

The actual changed-file set is exactly the 11 paths named in the review
protocol's "intended delta," with no additions or omissions:

- `governance/drafts/release-2-candidate/README.md` (M)
- `governance/drafts/release-2-candidate/numerical/README.md` (M)
- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json` (M)
- `governance/drafts/release-2-candidate/numerical/runtime-table-integration-candidate.json` (A)
- `governance/drafts/release-2-candidate/reviews/d5-runtime-inverse-beta-table-evidence-adversarial-review-disposition.md` (A)
- `tooling/r2-paired-t-runtime-series/README.md` (M)
- `tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json` (A)
- `tooling/src/spikes/paired-t-numerical-readiness.ts` (M)
- `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts` (A)
- `tooling/tests/paired-t-numerical-readiness.test.ts` (M)
- `tooling/tests/paired-t-runtime-table-integration-candidate.test.ts` (A)

**No identity mismatch.** There is no extra path to inspect. Every file was
read in full before testing, including the six unchanged reference files
named in the protocol (the existing series candidate, both existing
validators, the two prior candidate JSONs, and the full prior review result
at commit `ff808eb42e6d8382ad09dd36441d167d12d5c104`).

---

## 3. Provenance and byte-identity results

| Check                                                                              | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checked-in table byte-identical to the prior review's authenticated artifact       | **PASS** — `cmp tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json <(git show ff808eb4...:review-inputs/r2-d5-runtime-inverse-beta-table/artifact/runtime-inverse-beta-table.json)` reports no difference                                                                                                                                                                                                                                                                                                                                                                                             |
| Independent SHA-256 recomputation of the checked-in file                           | **PASS** — `sha256sum tooling/r2-paired-t-runtime-series/runtime-inverse-beta-table.candidate.json` = `ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`, matching the declared value exactly                                                                                                                                                                                                                                                                                                                                                                                                                   |
| The prior review-target checkpoint file is otherwise unchanged                     | **PASS** — `governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json` (the file that was the actual PR #37 review subject) is byte-identical to its state at the prior review-result commit; it is correctly **not** among the 11 changed files                                                                                                                                                                                                                                                                                                                                                |
| Disposition doc accuracy                                                           | **PASS** — `d5-runtime-inverse-beta-table-evidence-adversarial-review-disposition.md` was checked point by point against the actual prior review result (commit `ff808eb4...`, this reviewer's own prior work): implementation target, review-input commit, review-result commit, verdict (`GO`), findings (`none` — accurately reflects zero `BLOCKER`/`SHOULD-FIX`/`NICE-TO-HAVE`), additional-research requirement (`none`), the three-route derivation description, the 200-cell agreement claim, the 53-mutation-scenario count, and the fresh-clone `pnpm check` success all match the prior result verbatim in substance |
| No private repository, private path, external authority system, or moving artifact | **PASS** — `git diff` was scanned for private-path, credential, and external-authority patterns; none found. All new artifacts are plain repository-relative paths; the only external reference is the already-public GitHub issue #25                                                                                                                                                                                                                                                                                                                                                                                          |

**Minor observation, not a finding:** the unchanged `runtime-inverse-beta-table-candidate.json` still carries `evidence_surface.independent_review_complete: false` and `evidence_surface.table_content_hash: null`, even though the table has since been reviewed with a `GO` verdict. This is intentional, not a defect: that file is PR #37's own closed checkpoint, whose values are pinned by PR #37's own unmodified validator (`validate-paired-t-runtime-inverse-beta-table-evidence.ts`'s `EXPECTED_CANDIDATE`, verified in this review to reject any deviation, including flipping this field to `true` — see §4). The current review-completion state is correctly tracked in the newer, purpose-built location (`evidence-readiness.json`'s `runtime_inverse_beta_table_evidence_candidate.closure = "reviewed_candidate_evidence"`, confirmed present and validated in §6). Because this is an intentionally frozen prior decision rather than an open one this PR was supposed to close, it is reported here as an observation only.

---

## 4. Table-validation and mutation results

A standalone harness imported `validatePairedTRuntimeInverseBetaLookupTableCandidate` directly and attacked it with every category named in the protocol, plus additional hex edge cases.

```text
$ node --import tsx table_mutation_probe.mts
ok [baseline (original bytes)]: accepted
ok [change one table bit (valid JSON)]: rejected (candidate inverse-beta table bytes differ from the independently reviewed hash)
ok [reorder two entries]: rejected (...)
ok [omit one df + coherent entry_count]: rejected (...)
ok [duplicate df, retain 200 entries]: rejected (...)
ok [df=0 in first entry]: rejected (...)
ok [df=201 in last entry]: rejected (...)
ok [entries[0].hex = NaN-like / +Inf / -Inf / negative / zero / negative-zero /
    subnormal / uppercase / short / long / malformed]: rejected (11/11)
ok [change scope / candidate_key / target_format / min / max]: rejected (5/5)
ok [runtime_support_claimed = true]: rejected
ok [final_table_selected = true]: rejected
ok [supported_degrees_of_freedom_max = 200]: rejected
ok [undeclared top-level field]: rejected
ok [undeclared entry field]: rejected
ok [malformed JSON (truncated / "{ broken")]: rejected (2/2)
ok [entries replaced with a string]: rejected
ok [coherently-mutated table, internally self-consistent, re-hashed to a
    DIFFERENT value than the pinned reviewed hash]: rejected

32 table-validation mutation cases run, 0 failures
```

**32/32 rejected; zero uncaught exceptions in every case, including
malformed JSON.**

The exact reviewed byte hash is enforced **unconditionally**: inspection of
the exported function confirms
`REVIEWED_INVERSE_BETA_TABLE_CONTENT_HASH = "sha256:ba1f9921..."` is a
hardcoded source-level constant, and the hash comparison against it is the
_first_ check performed, independent of whether the mutated bytes are
otherwise well-formed JSON or schema-conformant. Full error arrays were
inspected to confirm this layering:

```text
one bit changed (structurally valid) full errors:
  [ 'candidate inverse-beta table bytes differ from the independently reviewed hash' ]
entries=string (structurally invalid) full errors:
  [ 'candidate inverse-beta table bytes differ from the independently reviewed hash',
    'candidate inverse-beta table differs from the closed non-runtime surface' ]
malformed JSON full errors:
  [ 'candidate inverse-beta table bytes differ from the independently reviewed hash',
    'candidate inverse-beta table is not valid JSON' ]
```

This directly answers the protocol's central concern: **a coherently
changed table cannot pass merely because its internal metadata remains
self-consistent**, because internal self-consistency is never what is
checked first or primarily — byte-for-byte equality with the pinned reviewed
hash is, and that check does not depend on the mutation being otherwise
well-formed.

---

## 5. Full-df lookup and graph-equivalence results

Binary64 hex cells were decoded with a from-scratch IEEE-754 bit-unpacking
routine (not reusing the wrapper's own `floatFromHex` helper code, though
both implement the same standard).

### Part A — full df = 1..200 sweep

For every integer df from 1 through 200, `evaluatePairedTRuntimeSeriesWithCandidateTable`
was called at a representative statistic (`t = 1.5`) and compared field-by-field
against `evaluatePairedTRuntimeSeriesCandidate` called directly with the
independently decoded table value as `inverseBeta`.

```text
Part A (full df=1..200 sweep at t=1.5): 200/200 exact matches, 0 failures
```

### Part B — independently selected statistic corpus × selected df

Corpus: `+0`; the smallest positive subnormal (`Number.MIN_VALUE`); ordinary
small values (`1e-8`, `0.0078125`); the binary64 cells immediately below and
above `|t| = 1`, plus exactly `1`; moderate (`3.7`, `10`) and large
(`31000000`, `1e150`) finite statistics; the largest finite statistic
(`Number.MAX_VALUE`); each tested at both signs. Degrees of freedom: 1, 2,
an odd and an even df above 2 (3, 4), two internal values (57, 118), and the
endpoint 200 — matching every category the protocol names.

```text
Part B (7 df x 12 magnitudes x +/-): 161 cases, 0 failures, 0 both-refused
  pairs (classification-matched)
```

All 161 cases returned `ok: true` on both paths with **exact** equality of
`branch`, `pValueBinary64Hex`, `iterations`, `iterationCap`,
`positiveSeriesRemainderContributionCandidate`, and `projection`; the
wrapper's `runtimeSupportClaimed`/`correctRoundingClaimed` were confirmed
`false` throughout. Concrete spot checks at the extremes (subnormal
boundary, max-finite tail, both parities at exactly `|t| = 1`) were printed
and confirmed meaningful, non-trivial results (e.g., `df=1` at the smallest
subnormal statistic resolves to the `central-complement-positive-series`
branch, `p = 3ff0000000000000` (rounded one, 1 iteration); `df=200` at the
largest finite statistic resolves to `lower-tail-positive-series`,
`p = 0000000000000000` (`refuse_positive_tail_not_representable`
projection) — matching between the two entry points exactly).

**The wrapper adds only the documented `normalizationConstant` metadata; the
series graph's own output is byte-for-byte unchanged in every tested case.**

### Part C — invalid-input classification and ordering

```text
Part C ok: non-integer df (2.5): integrated=invalid_candidate_input direct=invalid_candidate_input
Part C ok: df below 1 (0 and -5): integrated=invalid_candidate_input (direct path N/A, df outside [1,200])
Part C ok: df above 200 (201 and 1000): integrated=outside_evidence_evaluation_range (direct path N/A)
Part C ok: non-finite statistic (NaN / +Inf / -Inf): integrated=invalid_candidate_input direct=invalid_candidate_input
Part C ok: negative zero statistic: integrated=invalid_candidate_input direct=invalid_candidate_input
Part C ok: non-integer df + non-finite statistic (ordering): integrated=invalid_candidate_input direct=invalid_candidate_input

10 cases, 0 failures
```

The wrapper's own input guard (non-integer df, df below the minimum,
non-finite statistic, negative zero) fires with the same classification as
the underlying evaluator uses for the same conditions, and correctly
precedes any table lookup; the df-above-maximum check
(`outside_evidence_evaluation_range`) is likewise applied before a lookup is
attempted, matching the existing evaluator's own boundary semantics.

**Grand total across Parts A–C: 371 cases, 0 failures.**

---

## 6. Maturity and authority-boundary results

Mechanical and by-inspection confirmation of every listed item:

| Item                                                                                                                              | Result                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Candidate table `final_table_selected: false`, `runtime_support_claimed: false`                                                   | **Confirmed** in the checked-in table JSON and re-validated live by `validatePairedTRuntimeInverseBetaLookupTableCandidate`                                                                                                            |
| Integration checkpoint non-authoritative, unissued, `runtime_support_enabled: false`                                              | **Confirmed** — `status: "non_authoritative_candidate"`, `issuance: "unissued"`, `runtime_support_enabled: false` in `runtime-table-integration-candidate.json`, enforced by `validatePairedTRuntimeTableIntegrationCheckpoint`        |
| `supported_degrees_of_freedom_max` and final table hash null                                                                      | **Confirmed** in both `table_connection.supported_degrees_of_freedom_max`/`final_table_content_hash` (checkpoint JSON) and the readiness JSON's mirrored fields                                                                        |
| Evidence-local reviewed hash not relabeled as final runtime hash                                                                  | **Confirmed** — `table_connection.reviewed_evidence_table_content_hash` and `final_table_content_hash` are distinct, differently-named fields; the former is populated (the evidence-local hash), the latter stays `null`              |
| `correct_rounding_claimed` and `truth_error_bound_complete` false                                                                 | **Confirmed** in the checkpoint JSON and the readiness JSON respectively                                                                                                                                                               |
| Not loaded by an authoritative verifier, schema, registry, Public Check, bundle, conformance manifest, or normative specification | **Confirmed** — `grep -rl` for the new file names across `schemas/`, `registries/`, `spec/`, `conformance/`, `reference/` returns nothing; the only in-repository referents of the wrapper module are itself and the readiness tracker |
| Release 1 frozen/supported behavior unchanged                                                                                     | **Confirmed** — the 11-file delta touches none of `schemas/`, `registries/`, `spec/`, `conformance/`, `reference/`                                                                                                                     |
| Issue #25 remains open, not restarted or closed                                                                                   | **Confirmed via the GitHub API** — issue #25 is `state: open`, `updated_at: 2026-08-28T11:22:40Z` (before this increment), public review window still shows earliest decision `2026-09-25T20:52:54Z`                                   |

### Promotion-mutation attacks (both checkpoint JSON files plus the readiness JSON)

Direct-code attack against `validatePairedTRuntimeTableIntegrationCheckpoint`
(12 mutations: `runtime_support_enabled=true`, `correct_rounding_claimed=true`,
`table_connection.runtime_table_selected=true`,
`table_connection.final_table_content_hash=<hash>`,
`table_connection.supported_degrees_of_freedom_max=200`,
`operation_graph.existing_series_graph_changed=true`, removing a
`held_decisions` entry, removing a `prohibited_claims` entry,
`selection_state="runtime_selected"`, `issuance="issued"`, an undeclared
top-level key, an undeclared nested key) — **12/12 rejected.**

Repository-file-level promotion attacks, each applied to a fresh clone, with
the relevant Vitest suite run and the file reverted afterward:

| Target file                                                                                                                           | Mutation                                                                                                                                                                                                                 | Result                    |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `runtime-table-integration-candidate.json`                                                                                            | `runtime_support_enabled`, `correct_rounding_claimed`, `table_connection.runtime_table_selected`, `final_table_content_hash`, `supported_degrees_of_freedom_max=200` all promoted                                        | **1 test failed**, caught |
| `runtime-inverse-beta-table-candidate.json` (the PR #37 checkpoint, unchanged by this PR but re-attacked to confirm it stays guarded) | `runtime_support_enabled`, `final_table_selected`, `degrees_of_freedom_evaluation.supported_maximum=200`, `evidence_surface.table_content_hash=<hash>`, `evidence_surface.independent_review_complete=true` all promoted | **1 test failed**, caught |
| `evidence-readiness.json`                                                                                                             | `runtime_table_integration_candidate.{runtime_table_selected, final_content_hash, supported_degrees_of_freedom_max, truth_error_bound_complete, runtime_support_enabled, closure}` all promoted                          | **1 test failed**, caught |

All three files were restored via `git checkout --` and confirmed via an
empty `git status --porcelain`.

**15/15 promotion-mutation attacks caught. No path to a silent maturity or
authority upgrade was found.**

---

## 7. Repository-wide check results

From a fresh `git clone` at the exact implementation commit:

```text
$ git clone https://github.com/licklider-ai/nomue-protocol nomue-integration-clone
$ git checkout f9b039d746fb32364d1cc9c517a71d56873dbc79
$ corepack pnpm install --frozen-lockfile
$ corepack pnpm check
  ... format:check && lint:markdown && typecheck && validate && test
      && check:generated && check:phase1 && check:phase2a
      && check:phase2a-021 chain runs to completion ...
PNPM_CHECK_EXIT=0
$ git status --porcelain   # (empty)
```

The ordinary `pnpm check` entrypoint completed successfully end to end in
this review's sandbox and did not encounter the `tsx` CLI IPC restriction
the PR author mentioned hitting locally; no substitution to
`node --import tsx` was necessary here, so none is reported as an
environmental limitation for this pass. GitHub CI independently confirms
7/7 check runs successful on the same commit (`Full check` on two
architectures, `Phase 1+2A validation` on four platforms, `non-authoritative
pilot evidence`, `non-authoritative runtime-series evidence` — confirmed via
the GitHub API).

`git status --porcelain` was empty after the full check.

Targeted suites for the changed files were additionally run directly and
passed in full: `paired-t-runtime-table-integration-candidate.test.ts` and
`paired-t-numerical-readiness.test.ts`, 18/18 tests passed.

---

## 8. Research-gate assessment

This increment is a **straightforward, bounded implementation of the
already researched and independently reviewed formula/table family**. It
introduces no new externally grounded numerical decision.

Basis for this judgment:

1. The mathematics — `C(df) = 1 / B(df/2, 1/2)` for `df = 1..200`, and the
   Student-t series evaluation graph it feeds — is unchanged from what was
   independently reviewed and found `GO` with zero findings in two prior
   passes: PR #33 (the series graph, `paired-t-runtime-series-candidate.ts`,
   confirmed unmodified in this delta) and PR #37 (the contiguous table,
   confirmed byte-identical to its reviewed state in §3).
2. This PR's own content is exclusively **plumbing**: a SHA-256 pin, a
   closed-JSON-surface validator, an exact-integer-df map lookup, and a
   pass-through call into the unmodified evaluator. None of that requires
   primary-source research — it is a provenance-binding and
   software-engineering concern, verified in this review by direct
   execution and mutation testing (§4–§6) rather than by literature review.
3. No agreement among external special-function libraries was used or
   needed anywhere in this review; the equivalence claims in §5 were
   established by direct, exact-field comparison of the repository's own
   two entry points against each other and against an independently decoded
   binary64 value, not by inferring consensus from any library.
4. The `held_decisions` this PR explicitly leaves open (final runtime table
   selection and hash, supported df maximum, complete operation graph truth
   bound, iteration-cap resource-bound guarantee, global truth-error bound,
   projection-boundary margin, supported platform matrix, final refusal
   codes) are exactly the items that would eventually require new
   externally grounded numerical work; this PR touches none of them.

**No additional primary-source research pass is required for this
increment.**

---

## 9. Findings

**BLOCKER: None**
**SHOULD-FIX: None**
**NICE-TO-HAVE: None**

Across 32 table-validation mutations, 371 lookup/graph-equivalence cases
(a full df = 1..200 sweep plus a 161-case rich statistic corpus plus 10
invalid-input classification cases), 15 promotion-mutation attacks across
three JSON files, and a fresh-clone full repository check, no finding
requiring a repair was produced. The one item flagged for transparency in
§3 (a frozen field in an out-of-scope prior checkpoint) is reported as an
observation, not a finding, because it reflects an intentionally closed
prior decision this PR was correctly not asked to reopen.

---

## 10. Overall verdict: `GO`

PR #41's runtime-table integration increment **may be merged as a
non-authoritative R2-D5 candidate.**

This verdict does not approve a final runtime table, a supported df range,
a numerical guarantee, a Public Check, a bundle, paired-t support, R2-D5
completion, or Release 2 publication. It confirms specifically that: the
wrapper binds the exact, previously reviewed table bytes by an
unconditionally enforced hash; every coherent or incoherent forgery of that
table is rejected without an uncaught exception; the lookup-and-delegate
design does not alter the previously reviewed series graph's output for any
tested case across the full `df = 1..200` range and a rich statistic corpus;
every maturity and authority-boundary claim holds under direct promotion
attack; Release 1 and the authoritative surface are untouched; and issue
\#25 remains open, unrestarted, and unaffected by this merge.
