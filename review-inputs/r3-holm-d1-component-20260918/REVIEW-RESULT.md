# R3 Holm D1 component checkpoint independent implementation review result

## Verdict

GO_FOR_D1_CONTINUATION

Component-checkpoint verdict only, as the handoff requests. It is not D1
completion, integration, adoption, RFC-window or publication GO, and it does not
make any of the 44 planned full-call cases passing. The two components implement
the D0-reviewed design faithfully: the raw-preserving stored-byte projection and
its reference digest follow the DESIGN deletion rule byte for byte under
independent random probing, and the seven-result dependency graph propagates
blocker identities and actual reason codes deterministically with no route to a
fabricated pass. Development code stays outside the npm tarball.

Findings: 0 BLOCKER, 0 MAJOR, 2 MINOR. Nonblocking observations in Section 6.

## 1. Fixed target and inputs

| Field            | Value                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository       | `licklider-ai/nomue-verifier` (public; read-only clone, not attached for push or API)                                                                                                                       |
| PR               | #20, branch head `a82997073b17277f85d524f61efb7bc9249192a5` ("Implement unissued R3 stored-byte and dependency foundations")                                                                                |
| Sole parent      | `940b8fb6990632029bcebd2ebdf6ce9dca8e9244` (the repository default branch head at clone time; also the merge base)                                                                                          |
| Head tree        | `0695e9b67995710cd365fec944c0443c17b65107`                                                                                                                                                                  |
| Delta from base  | 9 files, +1031 / −0: `development/r3-holm/{stored-bytes,dependencies}.ts` and tests, `README.md`, `HANDOFF.md`; `.github/workflows/ci.yml` (+2), `scripts/package-smoke.mjs` (+3), `tests/boundary.ts` (+8) |
| Drift            | none: head, parent and tree equal the identities recorded in Protocol PR #355 `D0-COMPLETION.md` at `e80096c`                                                                                               |
| Design authority | Protocol PR #355 head `1eb6b93` DESIGN/ACCEPTANCE/LANDING; D0 confirmation `6410025` (`GO_FOR_UNISSUED_IMPLEMENTATION`)                                                                                     |
| Review date      | 2026-09-18 (UTC)                                                                                                                                                                                            |

Blobs at the head: `stored-bytes.ts` `a75b4b5d…`, `stored-bytes.test.ts`
`a554de86…`, `dependencies.ts` `480dee95…`, `dependencies.test.ts` `4a988880…`,
`README.md` `e96852c2…`, `HANDOFF.md` `26c22093…`, `ci.yml` `8f949695…`,
`package-smoke.mjs` `56f8dd45…`, `boundary.ts` `866b2146…`.

Protocol-side custody verified at PR #355 head `e80096c` (tree `7e63f743…`, base
`0c7a685`): the reviewer's `REPAIR-CONFIRMATION.md` is retained byte-identical
(blob `47739e97…`), the intake commit `d0063c7` adds only that file, the E-1
editorial fix removes only the K-row availability clause, and `D0-COMPLETION.md`
pins this Verifier head, tree and base.

## 2. Independence, mechanism, environment and scope disclosure

- The reviewer did not author or repair PR #20, the D1 components, candidate.4 or
  any R3 receipt. The same session produced the Protocol D0 design review and its
  close-only confirmation; that continuity is disclosed because this review checks
  the implementation against that design. No Verifier code was written by the
  reviewer except throwaway probe scripts kept outside both repositories.
- The reviewer is an Anthropic language model in a Claude Code remote session
  (configured `claude-fable-5-1`; serving model may differ); not human-expert
  review, not steward review.
- Environment: Linux x64, Node 22.22.2, npm 10.9.7, `npm ci --ignore-scripts`
  from the pinned lockfile. This is not the candidate execution tuple (Node
  24.19.0 / Python 3.12.14) and admits no platform.
- Commands actually run at the head: `node --import tsx --test
development/r3-holm/dependencies.test.ts development/r3-holm/stored-bytes.test.ts`
  (36 tests, 36 pass); `npm test` (smoke, boundary, reason-metadata: OK);
  `npm run test:package` (package-smoke: OK); the README strict `tsc --noEmit`
  command (exit 0); one deep-nesting probe; one 8,000-input differential fuzz of
  the projection; Git identity, blob and diff inspection; Protocol PR #355 `e80096c`
  diff inspection.
- NOT_RUN: hosted CI for this head (GitHub API not available for an unattached
  repository; the user reports it running), candidate.4 suites, actual-host or
  cgroup evidence, Python numerical kernels, receipt custody checks, primary
  sources. None is in this checkpoint's scope.
- No file in either repository was modified by this review; no comment, merge,
  publication, SOURCE-PIN change or dispatch activation was performed.

## 3. Verified facts

- **Projection rule.** `projection()` scans UTF-8 bytes only after strict
  syntax/eligibility and parsed bounds, decodes exactly the key token through
  `parseStrictJson`, and deletes the DESIGN span: key opening quote through the
  following comma when another member follows; preceding comma through the end
  of the value when it is last; key through value when sole; bytes untouched when
  absent. The 14 hand vectors match. An independent probe generated 8,000 random
  objects (3,758 with `integrity` at first, middle, last or sole position; escaped
  key spellings `integrity` and `integrity`; nested and string
  lookalikes; multibyte text; random whitespace including CRLF and tabs; trailing
  newline) and compared bytes against an expectation built from the DESIGN rule on
  the generated pieces, not from either implementation: all byte-exact, and every
  projection parses to the value minus `integrity`.
- **Digest.** `sha256:` + SHA-256 of `nomue/record-content/v1` + LF + P(B),
  matching the Protocol integrity model, the candidate.4 Contract and DESIGN. The
  declared digest is never read (test "digest ignores only integrity").
- **K and the anti-reserialization guard.** `canonicalStorage` is
  `original.equals(JCS(parsed))`, the NRS-CANON-0017 idempotency comparison. On
  the canonical path the code independently requires P(B) to equal
  JCS(parsed minus integrity) and refuses with `canonicalization_failure` on
  disagreement, so no reserialized digest can be the sole success route. Noncanonical
  input yields a reference digest over the stored projection and
  `canonicalStorage: false`; no I result exists at this layer.
- **Limits and ordering.** Byte cap before decoding; fatal UTF-8 decode with BOM
  preserved so the strict parser rejects it; strict eligibility (duplicates,
  surrogates, negative zero); parsed depth/nodes/entries/string/key bounds; then
  object check, canonicalization, projection, digest. `LIMITS` equal the candidate.4
  envelope constants (2,359,296 bytes; depth 36; nodes 28,736; entries 1,024;
  string 4,096 UTF-16 units, keys excluded from the node count). A one-million-level
  nesting probe under the byte cap ends in `resource_limit: record_depth`, not a
  stack error, because both `JSON.parse` and the strict scanner are iterative.
- **Budget hooks.** Checkpoint callbacks run at each phase and every 256 scanned
  bytes; injected early and late exceptions propagate unchanged (test).
- **Graph.** `DEPENDS` equals the DESIGN table (K:S, D:S, H:D, I:S+K, C:S,
  A:K+D+H+I+C); stage order and check labels are runtime-frozen. Blocked rows list
  direct prerequisite identities in declared order and the first-occurrence
  deduplicated union of their reasons, so transitive causes reach A. Supplying an
  evaluation for a blocked stage throws; `error` execution is accepted only for C;
  pass requires empty reasons and fail or error requires non-empty reasons; the
  generic `candidate:holm:prerequisite_failed` is rejected as a root reason;
  reasons are copied. `validateResults` rebuilds the graph and compares execution,
  reasons and blockers exactly. The 192-combination test uses an independent boolean
  expression, and 15 mutations are rejected.
- **Packaging and inventory.** `tests/boundary.ts` adds exactly the six development
  files; `package-smoke.mjs` fails on any `development/` tarball entry; the package
  `files` allowlist is unchanged; `npm run test:package` passes. CI adds the two
  component test files by name.
- **Handoff accounting.** The R3D coverage table claims only prerequisite
  evidence and marks 26-27, 32-34 and 40-41 as none; no full-call or host claim
  is made. Test counts (36; 192 combinations; 15 mutations) match.

## 4. Answers to the handoff's failure questions

1. Raw-byte projection violating the deletion span, strict eligibility, limit
   ordering, UTF-8 offsets or copy isolation: none found by inspection, hand
   vectors or the fuzz probe. Multibyte sequences cannot contain the ASCII
   delimiters the scanner keys on; escapes are skipped pairwise; input and output
   buffers are copies (test).
2. Impossible graph, suppressed independent result, omitted blocking reason or
   changed reason union: none found. D, H and C stay evaluated under K, I or C
   failure; a pass for a blocked stage is rejected at assembly and at validation.
3. Development code in the npm tarball or a helper mistaken for a verification
   call: none. Both modules state they are not entry points; no forwarding,
   report or refusal API exists here.
4. Coverage overclaim: none.

## 5. Findings

### MINOR

**m-1. Strict typecheck is not part of CI.** `ci.yml` runs the component tests but
not the README's `tsc --noEmit --strict` command, so a type regression on the
Node 20/22 matrix would pass CI. Minimal correction: add the README typecheck
command as a CI step next to the component test step. Closure check: the step
appears in `ci.yml` and passes.

**m-2. Untyped errors from the graph component.** `assembleResults` and
`validateResults` throw plain `Error`, whereas the byte component throws a typed
`StoredInputError` with a refusal `kind`. When the full call maps exceptions to
refusals, a plain `Error` from the graph must become an `internal_error`
invocation refusal, never a graph row or a report. Minimal correction: either
introduce a typed error for the graph component or record in `README.md` that any
graph-component exception is an internal-error refusal at integration. Closure
check: the typed error exists or the README sentence is present, and the future
full-call adapter test asserts it.

### NONE

No BLOCKER or MAJOR finding.

## 6. Nonblocking observations

- `StoredInspection.value` returns the parsed object by reference. The README
  covers buffer mutability; the later D0/Holm validators should treat `value` as
  read-only too, or the adapter should freeze it before handing it on.
- `LIMITS` duplicate the candidate.4 envelope constants. At integration keep one
  owner for these bounds so a later change cannot diverge silently.
- The projection-disagreement guard runs whenever storage is canonical, before S
  is known. That is stricter than DESIGN's "S/K-pass path" wording and consistent
  with the rule that projection or canonicalization failure always refuses.
- Blocked rows name direct prerequisites; the root cause is recoverable through
  the propagated reasons and the chain of not_run rows. This satisfies the DESIGN
  text; the versioned public report schema will decide whether root identities
  are also listed explicitly.

## 7. Custody note

This session cannot push to `nomue-verifier`. The fixed-head record is preserved in
the Protocol reviewer branch under
`review-inputs/r3-holm-d1-component-20260918/REVIEW-RESULT.md`; the author may
import it byte-for-byte into either repository as prior reviews were imported.

## 8. Actions not taken

No adoption, issuance, integration, publication, SOURCE-PIN or dispatch action was
performed. No comment was posted to PR #20, PR #355, PR #330 or issue #274.
Nothing was merged. No historical receipt or candidate byte was changed.
