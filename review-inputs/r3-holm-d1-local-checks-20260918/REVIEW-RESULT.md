# R3 Holm D1 local-checks checkpoint independent implementation review result

## Verdict

GO_FOR_D1_CONTINUATION

Component-checkpoint verdict only, as `LOCAL-CHECKS-HANDOFF.md` requests. It is not
D1 completion, integration, adoption, RFC-window or publication GO, and none of the
44 planned full-call cases becomes passing. The two MINOR findings of the previous
component review are closed. The new local-checks component performs actual S, K,
D, H, I and C evaluations on the reviewed storage and dependency foundations, keeps
Record-local conformance independent of caller context and digest agreement, maps
only classified expected-input failures to C error, lets unexpected and resource
failures escape without partial output, and cannot assemble a complete graph without
an actual A evaluation. All eight copied assets match their Protocol sources by
SHA-256 and Git blob; the D0 relation port reproduces the original algorithm and all
50 relation-stage vectors; the H predicates and size caps equal the original bridge.

Findings: 0 BLOCKER, 0 MAJOR, 1 MINOR. Nonblocking observations in Section 6.

## 1. Fixed target and inputs

| Field              | Value                                                                                                                                                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository         | `licklider-ai/nomue-verifier` (public; read-only clone, not attached for push or API)                                                                                                                                                                                                                       |
| PR                 | #20, head `77bb4ebaac5eca37390b8b23aede90f3d25702c0` ("Connect unissued R3 local checks and repair component review findings")                                                                                                                                                                              |
| Sole parent        | `a82997073b17277f85d524f61efb7bc9249192a5` (the previously reviewed head)                                                                                                                                                                                                                                   |
| Head tree          | `b16cb336d83454adb0d0360de3ee8308c7e53f26`; base `940b8fb6990632029bcebd2ebdf6ce9dca8e9244`                                                                                                                                                                                                                 |
| Delta from a829970 | 20 files, +4789 / −38: new `local-checks.ts` (+338), `d0-relations.ts` (+155), `local-checks.test.ts` (+402), `LOCAL-CHECKS-HANDOFF.md`, `PROVENANCE.json`, eight fixtures; edits to `dependencies.ts`, `stored-bytes.ts`, `dependencies.test.ts`, `README.md`, `HANDOFF.md`, `ci.yml`, `tests/boundary.ts` |
| Drift              | none: head, parent and tree equal the identities in Protocol PR #355 `D0-COMPLETION.md` at `6cb29a2`                                                                                                                                                                                                        |
| Design authority   | Protocol PR #355 head `1eb6b93` DESIGN/ACCEPTANCE/LANDING; D0 confirmation `6410025`; prior component review `7b057d5` (blob `3cb35145…`)                                                                                                                                                                   |
| Review date        | 2026-09-18 (UTC)                                                                                                                                                                                                                                                                                            |

Protocol-side custody verified at PR #355 head `6cb29a2` (tree `ea0f11e2…`, base
`0c7a685`): the prior component review is retained byte-identical (blob
`3cb35145…`), intake commit `3494e2d` adds only that file, the two earlier R3 review
records are unchanged, and `D0-COMPLETION.md` pins this Verifier head, parent, tree
and base. Protocol CI on `6cb29a2`: 12 check runs, all `success`.

## 2. Independence, mechanism, environment and scope disclosure

- The reviewer did not author or repair PR #20, any component, candidate.4, the D0
  experiment sources or any R3 receipt. The same session produced the D0 design
  review, its confirmation and the first component review; that continuity is
  disclosed. Unchanged scope from the first component review is reused only where
  Section 3 records a drift assessment. Probe scripts written by the reviewer live
  outside both repositories.
- The reviewer is an Anthropic language model in a Claude Code remote session
  (configured `claude-fable-5-1`; serving model may differ); not human-expert
  review, not steward review.
- Environment: Linux x64, Node 22.22.2, npm 10.9.7, `npm ci --ignore-scripts` from
  the pinned lockfile. Not the candidate execution tuple; admits no platform.
- Commands actually run at the head: the three component suites (55 tests, 55
  pass); the CI strict `tsc --noEmit` command (exit 0); `npm test` (smoke,
  boundary, reason-metadata OK); `npm run test:package` (OK); SHA-256 and blob
  comparison of the eight fixtures against Protocol PR #330 head `b52389fd…`;
  line-level comparison of `d0-relations.ts` with `d0.mjs` and of the H predicates
  and caps with `bridge.mjs` and the candidate.4 `envelope.mjs`; a twelve-case
  edge probe of `inspectLocalRecord`; Git identity and diff inspection in both
  repositories; Protocol check-run read.
- NOT_RUN: hosted CI for Verifier head `77bb4eb` (GitHub API not available for an
  unattached repository; the user reports success), candidate.4 suites, Python
  numerical kernel, actual-host or cgroup evidence, custody checks, primary
  sources. None is in this checkpoint's scope.
- No file in either repository was modified; no comment, merge, publication,
  SOURCE-PIN change or dispatch activation was performed.

## 3. Verified facts

- **Prior MINOR repairs.** m-1: `ci.yml` adds a strict typecheck step naming all
  seven component files, matching the README command; it passes locally. m-2: every
  graph invariant throws `GraphInvariantError` with `kind = "internal_error"`; the
  README requires every graph-component exception to become an invocation refusal
  and treats `StoredInspection.value` as read-only; tests assert the typed error on
  both exported operations. Both closed.
- **Drift from a829970 in the reviewed foundations.** `dependencies.ts` changes
  only the error class; `stored-bytes.ts` adds `expectedBytes`, exports
  `parsedBounds` and parameterizes its reason prefix. Projection, digest,
  canonicality and graph semantics are unchanged, so the first review's byte-exact
  fuzz and 192-combination evidence remains applicable.
- **Provenance.** All eight fixtures equal their named Protocol sources at
  `b52389fd…` by SHA-256 and by Git blob id, including `d0-cases.json` (`cases.json`)
  and `d0-example.json` (`example.json`) from the declaration-binding experiment.
  `cases.json` holds 70 cases: 50 `relations`, 14 `schema`, 5 `raw_json`, 1
  `numeric_domain`; the port test replays exactly the 50 relation cases and asserts
  identical sorted code sets. The handoff's "50 of 70" claim is exact.
- **D0 relation port.** `checkD0Relations` reproduces `d0.mjs` lines 36 to 148:
  same index and duplicate handling, unit/observation/group references and
  coverage, analysis input and family references, contract catalog and family-kind
  match, omnibus/contrast/pair/control rules, result-slot references, kinds, member
  coverage and cardinality, same code names, sorted set output. Parser, shape
  check, numeric-domain check and CLI are removed as stated; the caller performs
  strict parse, closed schema and bounds first.
- **H predicates and caps.** `holmReasons` equals the bridge admission set: p and
  display domains bounded by `0x3ff0000000000000`, adjusted numerator bounded by
  `U = 2^1074` (the Contract's exact-numerator domain), source/hypothesis
  uniqueness, adjusted count, selection binding and kind, family kind `all_pairs`,
  `3 ≤ k ≤ 16` with `k(k−1)/2` members, the `^[A-Za-z0-9_.-]{1,64}$` id pattern,
  member order, output order and result ownership. `localBounds` equals the bridge
  `CAPS` (bytes 1048576/262144/2097152, depth 32/32/34, nodes 24576/2048/28672) and
  the six count caps plus the 120-member cap. Candidate.4's public report
  collapsed these into `holm_input_invalid` and `result_ownership`; the successor
  emits fine-grained unissued labels, which the LANDING reason-ownership work must
  map.
- **Design conformance.** Order: raw safety and strict parse, bounds,
  canonicalization and projection digest, exact bundle routing (`routing_error` /
  `unsupported_bundle`), reference identity (`unrepresentable_input`), freeze of the
  private parsed Record, S. On S pass: K from the storage observation; D on a
  structurally cloned legacy declaration after bridge caps; H only when D has no
  codes; I only when storage is canonical (K fail leaves I absent, so the graph
  makes I not_run from K); C last. S fail returns only S and never calls the
  acquisition callback (test). D and H do not read the expected context or the
  declared digest. C compares JCS of `{record_id, revision_id, declaration,
inputs}` taken from the Record against the independently supplied, schema-valid
  text; identity mismatch is C fail (R3D-40). Missing, unreadable
  (`ExpectedContextAccessError`), non-string, syntax, strict-eligibility and
  schema failures are C error with no outcome; size and parsed bounds are
  `resource_limit` refusals; parser exhaustion is a resource refusal; any other
  callback exception is rethrown. Six passes cannot be assembled: `assembleResults`
  throws for the missing A (test and probe).
- **Probe results.** Uppercase `p_hex` is S fail (schema); an extra input member
  yields H `adjusted_count`, `member_order`, `source_hypothesis_duplicate` without
  any crash; an extra adjusted row yields `adjusted_count`, `output_member_order`;
  expected text with a BOM or a raw lone surrogate is C error `expected_parse`; an
  expected array is C error `expected_schema`; a 1025-entry expected object is a
  `resource_limit: expected_container` refusal with no preparation; a `TypeError`
  from the callback escapes unchanged; changing one analysis's operation kind is D
  `d0_result_analysis_mismatch` with H absent and I/C still evaluated.
- **Packaging and inventory.** `tests/boundary.ts` names every new file
  explicitly; `package-smoke` still rejects any `development/` entry; the `files`
  allowlist is unchanged; `npm run test:package` passes.
- **Handoff accounting.** The case table claims prerequisite evidence only and
  keeps 26-27, 32-36, 41 and 43-44 without new evidence; "every one of the 44
  full-call cases remains open" is stated. No overclaim found.

## 4. Answers to the handoff's failure questions

1. Local conformance depending on expected context or digest agreement: not
   possible. S, K, D and H are computed before and without C or I inputs; tests and
   probes show D and H unchanged under C mismatch, C error and I failure.
2. `p = −0`, non-finite or out-of-domain input, mismatched ownership, reordered
   members: each is an H failure with the expected reason and never a pass
   (tests for the seven hex values and seven mutations; probes above).
3. Resource or internal failure becoming C error, or a partial preparation
   leaking: not found. Only `ExpectedContextAccessError`, `SyntaxError`,
   `StrictJsonError`, missing, non-string and schema failures map to C error;
   `RangeError`, size and bounds map to `StoredInputError`; anything else rethrows;
   a late checkpoint failure after acquisition returns nothing (test).
4. Component boundary and table: no full-call, host or output-protocol claim is
   made; helpers are documented as not a verifier invocation.
5. Prior MINOR repairs, eight asset hashes, complete D0 extraction and all bridge
   predicates: all verified (Section 3).

## 5. Findings

### MINOR

**m-1. Canonicalization and digest work precede exact bundle routing.**
Location: `local-checks.ts` `inspectLocalRecord` calls `inspectStoredBytes`
(which canonicalizes, projects and digests) before checking
`interpretation_bundle_id`; the test "resource and canonicalization failure
dominate schema/routing failures" fixes that precedence.
Failure scenario: an input with an unsupported or missing bundle that also
contains a non-finite number or another canonicalization failure is refused as
`canonicalization_failure` rather than `routing_error` / `unsupported_bundle`. The
candidate.4 Contract orders parse, bounds, exact dispatch, schema admission, then
canonical-storage admission, and the canonicalization identity is bundle-pinned in
the Protocol registry, so canonicalizing before the bundle is known applies a
canonicalizer the input has not yet selected. The DESIGN refusal table asks to
"keep established pre-routing rejection priority"; the R3D-10 and R3D-34
expectations will be authored against whichever precedence the design fixes.
Minimal correction: either check bundle presence and exact match (and the two
reference identities) on the parsed value before canonicalization, for example by
splitting `inspectStoredBytes` into a parse-and-bounds phase and a
canonicalize-and-digest phase, and invert the precedence assertion in that test; or
record the deliberate precedence in `LOCAL-CHECKS-HANDOFF.md` and propose it for
the DESIGN refusal-precedence table. Closure check: a test asserts the chosen
precedence for "unsupported bundle plus non-finite number", and the handoff or
DESIGN states it.

### NONE

No BLOCKER or MAJOR finding.

## 6. Nonblocking observations

- `identity` is compiled from the `record_id` schema fragment and applied to
  `revision_id` too. The two fragments are identical today; compiling each from
  its own fragment removes a silent coupling if candidate.4's successor schema
  diverges.
- The expected-text byte cap is checked after the callback has returned the whole
  string; the README already assigns the bounded reader to the future acquisition
  adapter. Keep that requirement in the adapter's acceptance.
- `localBounds` serializes three derived values with JCS to enforce the bridge byte
  caps; this is bounded by the Record limits and precedes relational work, matching
  the bridge, but it is the one place a derived value is canonicalized before D.
- The fine-grained H reasons and the `d0_*` reason prefix are unissued local labels;
  the LANDING reason-ownership step decides the registered mapping.
- Protocol `D0-COMPLETION.md` and the Verifier handoff describe the same head,
  parent, tree, base and delta; navigation in `RELEASE-STATUS.md` and the R3 README
  is consistent with them.

## 7. Custody note

This session cannot push to `nomue-verifier`. The fixed-head record is preserved in
the Protocol reviewer branch at the path the handoff names,
`review-inputs/r3-holm-d1-local-checks-20260918/REVIEW-RESULT.md`; the author may
import it byte-for-byte into either repository.

## 8. Actions not taken

No adoption, issuance, integration, publication, SOURCE-PIN or dispatch action was
performed. No comment was posted to PR #20, PR #355, PR #330 or issue #274. Nothing
was merged. No historical receipt, candidate byte or fixture was changed.
