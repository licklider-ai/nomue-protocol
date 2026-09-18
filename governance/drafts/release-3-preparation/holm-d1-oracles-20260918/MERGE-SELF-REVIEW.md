# R3 development merge self-review

Date: 2026-09-18 UTC. Scope: Verifier PR #20 and Protocol PR #355.
The owner requested adversarial self-review, necessary repair, and then merger of
both PRs. This record concerns the repository merge of unissued development
assets; it grants no D1 completion, D2/D3 disposition, host qualification, Research
Gate closure, supported bundle, adoption, release or publication approval.

## Fixed targets and disposition

| Target                           | Commit                                     | Tree                                       | Base                                       |
| -------------------------------- | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| Verifier reviewed implementation | `37bf9faa1b802bb41b0441e1ff23ee15374e4a60` | `473bd4afea08adff0fd13a5800c53dbf4e2da434` | `940b8fb6990632029bcebd2ebdf6ce9dca8e9244` |
| Protocol reviewed packet         | `4f707baac8b6648ba2076c29f7217b4d9d9cd0bb` | `73550e6ff71a26062cbede7c047721d9fd9211af` | `0c7a685a1ea6b2b2d0dbe8966c572be95b82755a` |
| Verifier documentation repair    | `e2e0ac16da468d394b0e48e5e0bbdf77a28c4b8f` | `4a59ad847ecd95f7b1386a3b81abd1c7c42a1de9` | same base                                  |

Final main-integration target: Verifier
`f040f1428a204b90b9745afb90ffa547bfe9d0e6`, tree
`2eb5a853d85a35b0ed5c3c9a21eb432561c90047`, with parents `e2e0ac1` and
`421756e69e9911858a79f1f9314aa883b466c6ac`. The current base is the latter
commit; the table above preserves the initial review targets.

**Self-review disposition: ready for merging unissued development assets after
successful CI on the repaired heads.** No new Holm algorithm defect was found in the
reviewed scope. Two documentation defects and a newly exposed integration defect
were repaired below. This does not
convert the earlier reviewer's scoped GO into approval of later heads. In
particular, independent close-only review of the retained-result repair and new
oracle/runner evidence remains pending.

The entire outgoing PR file inventories and changes to released boundaries were
checked. Changed runtime paths and later test/evidence deltas were examined for
routing/refusal precedence, faithful storage references, prerequisite propagation,
context independence, isolated arithmetic, receipt validation and original-byte
forwarding. Existing independent D0/D1 and B-2 reviews were reused for their
unchanged scope; this is not a new independent source investigation.

## Findings and repairs

1. **Stale current-state navigation.** Verifier README still called the outer-call
   handoff current, while later expansion/B-2/oracle checkpoints existed. Protocol's
   active preparation links still described the expansion/wiring review and the
   two controlled-call findings as awaiting independent review. The latest receipt
   already accepts that scope through `eda3ba9` and closes those two findings.
   Repair: point current Verifier navigation to ORACLES-HANDOFF; label earlier
   handoffs as chronology; reconcile the active Protocol links. Preserve the dated
   original handoffs and reviewer records unchanged.
2. **Stale implementation provenance and test wording.** Verifier README said the
   numerical kernel was unchanged and the historical supervisor was not imported.
   The later bounded-sort successor and adapted supervisor are already present.
   It also described exactly one actual-child skip despite the expanded suites.
   Repair: identify the kernel repair, unchanged worker/oracle, adapted supervisor
   and plural actual-child tests. This changes documentation only, without
   modifying runtime pins, algorithms, contracts, expected values or evidence.

3. **Main advanced during review; stale package pins rejected every host call.**
   Main moved from `940b8fb` to `421756e69e9911858a79f1f9314aa883b466c6ac`
   while the documentation repair was being checked. The separately merged PR #21
   adds decimal.js 10.6.0 and a guarded Welch interval path. On synthetic merge
   `0aeb4e0fd6b81368d17ca3eed183d5db07dd8433`, CI run `35341982290`
   correctly failed the source-hash test and all 85 controlled-host cases because
   package.json/package-lock.json no longer matched the R3 inventory. This was a
   real integration failure, not a flaky host or permission failure. Repair:
   merge that main commit into the development branch and regenerate the explicit
   inventory. Only the two package hashes change; the other 30 hashes and all
   Holm algorithms/contracts/invocation source remain identical. R3 has no import
   of the changed Welch kernel or decimal.js. The existing main changes are
   retained without redefining their separate review or scientific disposition.
   New inventory SHA-256:
   `b5c9fa18eee6381d319e1302a124b8375e12fa18feb8faf56729ef0cfb1d35ca`.
   Historical archives still identify their earlier runtime; they are not evidence
   of execution with the new inventory. The new exact-head controlled-host run
   passes 85/85, as recorded in MERGE-HOST-EVIDENCE.json. Pin enforcement is retained.

The previous independent m-1 (retained repair RESULTS not compared) is already
implemented in the reviewed Verifier head. This self-review confirms all
non-environment fields are compared, including absent/extra groups and changed
counts; Boolean/integer differences do not silently compare equal. It retains
its status as author repair rather than independent closure.

## Adversarial checks executed

Local execution: Linux x64, Node 24.19.0, Python 3.12.14; pinned dependencies.

- **334 stored-byte targets:** a separate scratch probe uses the standard-library
  `JSONDecoder.raw_decode` to locate top-level key/value spans in each raw input,
  records delimiter offsets, and applies the DESIGN removal interval. This differs
  from the generator's predetermined-fragment assembly and the Verifier's lexical
  byte scanner. Every resulting UTF-8 byte string and domain-separated SHA-256
  matches the saved target, including preserved whitespace and Unicode. No
  candidate projection/digest helper was imported by this probe.
- **Two deliberately corrupted implementations:** export the fixed Verifier tree
  into a temporary directory, change only the indicated line, and run the 30
  oracle tests with the actual pinned worker. Replacing
  `const projected = projection(original, checkpoint);` with
  `const projected = canonicalProjection;` produces six assertion failures.
  Replacing the `nomue/record-content/v1` plus LF hash prefix with the empty string
  produces twelve assertion failures. Both processes exit nonzero, with no skips;
  failures are wrong bytes/digests, not setup errors. Mutations never enter the
  repository. These are inner/component sensitivity checks, not full controlled
  helper-corruption evidence or closure of R3D-43/44.
- **121 TypeScript tests:** all pass, zero skips, including inner calls using the
  pinned Python child. Strict `tsc --project development/r3-holm/tsconfig.json`,
  `npm test`, and `npm run test:package` pass. The actual tarball excludes
  `development/`; the released CLI/support surface remains unchanged.
- **Three retained-result regression tests:** pass, including eight malformed or
  changed expectation cases and an end-to-end altered saved count with a
  consistently changed temporary hash pin. The latter fails at result equality,
  so provenance hashes alone cannot make an incorrect count pass.
- **B-2 author replay:** C1-C9 and all 13088 repair checks match retained results
  except environment; 1024 size bounds and 46233 small permutations pass. This
  rerun is not a fresh independent numerical review.
- **Custody:** the latest independent receipt equals source commit `4bc8925`
  byte for byte, SHA-256
  `7e59e123868af38c6af5e8b67f477d64b764cefce3316d560ee0e47a12b88a66`.
  All nine original B-2 intake assets equal their `7ac803a` source bytes and saved
  hashes. The withdrawal of SHOULD-FIX-2 is retained; it is not revived as work.
- **Real-host archive reinspection:** the unmodified 37bf9fa archive has SHA-256
  `8744625dea4705e1034976a0de57da5ccc04478cba25283fe484ae3c5ce5ebba`.
  It contains 256 files and 85 passing checks: 58 ordinary calls, 14 fault-entry
  runs and 13 lifecycle controls. All 110 raw input files match regeneration;
  ordinary receipts have 58 distinct nonces, complete cleanup and zero enforcement
  deltas. All ten new reference hashes match reports; six forwarded byte strings
  equal their original input. Runtime manifest SHA-256 remains
  `f2a2811eb595b633f2b55b4b221d0d51a1e888570d555b5e789397cc4d78a260`.
  GitHub run `35339649977` was independently fetched in this self-review and has
  nine successful jobs, including the actual controlled-host lane. This is
  archive verification plus API status, not local reproduction of cgroup controls.

The Protocol packet adds informative drafts, exact review intakes and original
archives. Its outgoing diff does not alter authority registries, schemas,
conformance, reference code, generated outputs, signed R1 evidence or gates.
The published R1 historical audit remains the relevant audit; a later development
tree's mismatch with the old candidate freeze does not require refreezing R1.
No licensed source PDF or private product source is included.

The refreshed inventory was then executed at Verifier `f040f14` in
[run 35342377714](https://github.com/licklider-ai/nomue-verifier/actions/runs/35342377714),
host job `105591013886`: **85/85 pass**. Synthetic merge `708de6b` has the same
tree as that fixed head. [MERGE-HOST-EVIDENCE.json](MERGE-HOST-EVIDENCE.json)
fixes the new raw archive and its reinspection: 256 files, 110 matched input files,
58 distinct ordinary nonces, complete cleanup, six original-byte forwards and
all ten independent reference digests. The archive SHA-256 is
`dccd3787ed2c785c42791527f44ceb77da730298d32cee853875128c10feece2`.
This supersedes no historical receipt; it adds evidence for the changed inventory.

## Merge conditions and remaining work

The main-integrated target again passes all 121 R3 TypeScript tests with zero
skips, five supervisor tests (including all 32 source hashes), strict typecheck,
`npm test` including the separately merged 96 Welch reference rows, and the real
package smoke test. These results cover the actual merged dependency lockfile.

The first Verifier repair is documentation-only. The later main-integration
repair updates two package inventory hashes as described above and retains all
previous archives. This Protocol continuation adds this record, the new host
evidence and navigation updates. Validate the repaired Protocol tree and require
successful GitHub CI at each final PR head before merging. Merge commits preserve
all fixed review/implementation commits; do not squash away their ancestry.
The resulting merge identities and final CI are recorded by GitHub on the PRs.

Protocol format, markdown lint and typecheck passed locally. The complete
`pnpm check` command stopped at the environment's denial of the tsx CLI IPC pipe
(`listen EPERM`). Running the same validator directly with
`node --import tsx tooling/src/validate.ts` passed, including R1 history. The
complete hosted suite remains a mandatory final merge check; the interrupted
local aggregate command is not recorded as a pass.

D1's 44 locators remain partial. The pending independent changed-scope review,
remaining reason/context/numerical and narrower bound matrices, full controlled
helper-corruption cases, actual setup/cleanup failure and supervisor loss with
external-owner cleanup evidence still need their own work and disposition.
D2/D3, whole Research Gate closure and formal adoption remain pending. This merge
does not update SOURCE-PIN, enable dispatch, issue identifiers, start/restart an
RFC clock, edit gates, create a release or publish an npm package.

## Independence and limitations

Performed with OpenAI Codex in the continuing implementation/coordinator context,
at the owner's express request for self-review and merge. Author and reviewer are
not independent. No human expert review or steward scientific decision is
inferred from this work or from the merge authorization. Existing independent
language-model reviews retain their original authorship, scope and limitations.

NOT_RUN in this review: local actual cgroup enforcement (read-only mount), actual
cleanup failure/supervisor-loss recovery, full controlled-path helper corruption,
a new primary-source numerical investigation, and the still-missing D1 matrices.
No additional pass or gate closure is claimed for those items.
