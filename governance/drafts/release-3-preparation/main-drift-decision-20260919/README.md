# Main evidence drift after PR #358 — decision request

Status: **BLOCKED_FOR_INTEGRATION**. This packet records a reproduced dependency
that the work order did not include. It does not repair main or grant approval to
change a historical receipt. The two patch attachments are proposals, not applied
repository changes. No failing check is skipped or weakened.

## Identity and process

Inspected main: `9c597d42e1c22ca908f3f7e1485d88378c049ae7`, merge of PR #358.
Previous main: `ef71f0dc1ccee01dceb77d25312f38a2feff2ad9`. Date: 2026-09-19 UTC.
Accountable role: repository contributor responding to the user's repair work
order, using OpenAI Codex for investigation, proposal authoring and self-check.
This is not an independent investigator review, numerical-method review, steward
decision or Research Gate clearance. Only public repository sources were used.

The user authorized A/B repairs after dependency assessment, required reporting
rather than silently advancing review-dependent snapshots, reserved C for steward
approval, and requested proposals only for D. The extra archive dependency below
prevents a complete A/B repair within the proposed two-file change. The contributor
has not inferred permission to retarget or exempt that historical evidence check.

## Verified failure

| Workflow on inspected main            | Run               | Observed result                             |
| ------------------------------------- | ----------------- | ------------------------------------------- |
| CI                                    | 35441533849 / 848 | Success                                     |
| Reference source consistency          | 35441533831 / 88  | Success                                     |
| R3 full-invocation admission research | 35441533830 / 114 | Success                                     |
| R3 Holm adoption map                  | 35441533834 / 113 | Failure at AUTHORITY.md SHA-256 comparison  |
| R3 Holm checkpoint candidate          | 35441533877 / 113 | Failure at RESULTS.json snapshot comparison |
| R3 Holm public candidate              | 35441533833 / 113 | Same snapshot failure                       |

All three R3 workflows passed on the preceding main (runs 35438448606,
35438448600 and 35438448607). Their failing job logs were inspected, not merely
their status labels. Local Node 24.19.0 / Python 3.12.14 reproduced both failures.
The snapshot differs at **two** locations: top-level `legacy_fixtures` and the
`legacy_regression` row's `fixtures`, both 132 to 134. Node version is not the cause.

## A — input inventory and claim dependency

[PIN-DRIFT.json](PIN-DRIFT.json) records every old/current digest, independently
calculated from the files. Of 422 pins, ten raw digests differ. The existing
AGENTS.md and checker self-pin transitions accept exactly two; eight really fail.
Neither of those existing transitions is modified or repinned in the proposal.

| Changed input                                           | Effect on this map                                                                       |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| AUTHORITY.md                                            | Clarifies bounded classification coverage; no candidate schema or ownership row changes  |
| authority/authority-manifest.yaml                       | Adds informative ERRATA.md classification; no new R3 authority or assigned target        |
| tooling/src/lib/checks.ts                               | Adds authority-coverage validation; no Holm arithmetic or map ownership algorithm change |
| tooling/src/normative-lint.ts                           | Aligns the standalone normative-lint scope with existing validation                      |
| tooling/src/validate.ts                                 | Connects coverage validation; not a new Holm semantic requirement                        |
| tooling/src/phase2a/author-fixtures-021.ts              | Adds the two df=1 fixture constructors; no edits to the old fixture constructors         |
| conformance/manifest.yaml                               | **Executed input:** the legacy regression now executes 134 fixtures                      |
| conformance/expectations/phase-2a-021-expectations.yaml | Adds the expectations for those two fixtures; not disposable inventory metadata          |

Decision: **work-order case 2**, requiring re-derivation. The map executes envelope,
public and budget suites and binds requirement locators to the resulting rows.
Therefore a hash-only refresh is insufficient even though the proposed ownership
and numerical-method conclusions are unchanged.

Parsed comparison against preceding main proves all 132 old manifest fixture rows
unchanged and all six old 0.2.1 expectation rows unchanged. The only added IDs are
`A2-1-V-004` and `A2-1-P-005`. Both new JSON files belong in the inventory under
the existing conservative conformance/test closure. They are absent from the old
list, so merely checking declared hashes misses them.

[MINIMAL-REPAIR.patch.txt](MINIMAL-REPAIR.patch.txt) is the tested, **incomplete**
two-file proposal: eight input hash updates, the B snapshot's resulting hash
update, two new fixture pins (422 to 424), and the two snapshot count changes.
The historical `base` field is retained as the map's derivation origin; this
record identifies the new comparison checkout. The automatic pin refresh script
was not run. No unrelated pin is silently accepted.

## B — snapshot and receipt assessment

Only `holm-repaired-candidate-20260911/RESULTS.json` is proposed for advancement.
The checkpoint and envelope-experiment snapshots remain their historical 132.
The workflow files select the repaired candidate, not those two old directories.
Expected outcomes remain assertions in the unchanged tests; the snapshot count
is not a new numerical oracle. The proposed old/new bytes are pinned in
PIN-DRIFT.json. Rationale: the corpus has two new approved fixture entries, every
old entry is unchanged, and the isolated replay passes all 134.

**Receipt answer: a transitive archived-source dependency exists.** It is an
author-context CI integration receipt, not a newly discovered independent
numerical approval. The exact chain is:

1. `r3-followup-review-20260911/ci/INTEGRATION.json`, `source_inputs`, fixes
   `holm-adoption-map-repair-20260911/INPUTS.json` to SHA-256
   `8188b3c2b07cb62a5c93b1f8c7f37a193029ba414a403e0ffbc0306098be71d7`.
2. That inventory fixes the repaired candidate's RESULTS.json to
   `1a8800e50746923e893c07a2a5944133cc89ad370209cdc799b0d3a154926089`.
3. The checkpoint workflow then runs `r3-followup-review-20260911/check_evidence.py`.
   Its current-source comparison rejects the proposed changed inventory. The
   inventory cannot simply be advanced while claiming this check still passes.
4. The archive's SHA256SUMS.txt also fixes INTEGRATION.json and check_evidence.py.
   Rehashing those historical files would rewrite the record, not recover the
   evidence of the old run.

The original B-2 receipt mentions 132 and byte-pins a different file under
`holm-public-candidate-20260911`; the checkpoint receipt concerns candidate.2.
Those are not direct freshness requirements on the active candidate.3 snapshot.
Repository search found no independent R3 reviewer receipt directly pinning the
active RESULTS.json bytes. It would be incorrect to say every old mention of 132
invalidates an independent review. The blocking issue is the concrete transitive
CI source-identity check above. Historical R4 source manifests also contain the
old bytes; they remain fixed observations of their own source trees.

No historical receipt, archive, signature, checksum list, checker, or live A/B
file was changed in the deliverable. The minimal patch was applied only to an
isolated diagnostic worktree and is not merge-ready.

## Required A/B decision

Recommended scope for a separately authorized repair: preserve the original
archive and its checksum assertions, validate it against its fixed historical
source inputs, and validate current R3 inputs/results separately as a dated
successor. Keep the current candidate replay and all its assertions, the old
archive/member/hash tests, and mutation controls. Reject any undocumented drift.
Record the exact old/new source identities and do not relabel old receipts as
fresh 134-fixture evidence. This changes which source generation the archival
check is applied to, so it needs an explicit evidence-scope decision before
implementation. It is not permission to weaken the test.

The alternative is a new dated map/candidate evidence generation selected by the
active workflows, with historical replay kept separately. This is larger than
the two-file repair. Reverting the new fixtures is not recommended: ER-1 cites
them and they discriminate the already repaired df=1 defect.

**Approval requested only for the recommended A/B archive/current separation.**
C and D remain independent proposals and need not be adopted to repair these
three workflows. No main merge or all-green result is claimed by this packet.

## C — proposed instruction transition, not adopted

[AGENTS-PROPOSAL.patch.txt](AGENTS-PROPOSAL.patch.txt) supplies exact replacement
wording and a matching proposed pin/test-label transition.
[AGENTS-PIN-TRANSITION.json](AGENTS-PIN-TRANSITION.json) records old/new full-file
and prefix digests. The current whole-file approved digest remains `7cbc579e…`;
the proposed digest is `b8bc9787…`. The original inventory pin `059d84dd…` remains
the historical identity. The proposed prefix digest `b216f852…` deliberately
replaces the append-only invariant for this exact approved wording; that is why
the steward must approve the instruction and pin together. This packet is not
that approval.

The wording confines candidate equivalence to the pre-publication candidate
checkout and identifies `release-1-history` in validation as the successor-tree
guard. It authorizes no re-freeze, re-signing or gate reset. The live AGENTS.md,
maintenance guard and tests are unchanged. Release 1 publication and ER-1 stay
untouched. `--check-candidate` remains a real candidate-equivalence test, not a
successor-tree gate to be disabled or made to pass artificially.

## D — proposed pre-push visibility, not adopted

[COVERAGE-PROPOSAL.md](COVERAGE-PROPOSAL.md) compares an optional fast pin inventory
check, explicit R3 replay, and inclusion in mandatory validation. No package
script, hook, workflow, required-check setting or validation rule is changed.

## Validation and remaining limits

[PROBE-RESULTS.json](PROBE-RESULTS.json) preserves the isolated minimal-patch
command results. Node 24.19.0 / Python 3.12.14 were available locally.

- Instruction-pin tests: 4/4 pass, on original and proposed A/B trees.
- Isolated map replay: 16 proposed requirements, 531 pointers, 424 pins, six
  rejected mutations; 82 envelope, 134 legacy, 93 public and 38 checkpoint checks.
- Repair cases, identity mutations and source audit: pass.
- Historical archive check: **fails**, after verifying three archives and ten
  member mappings, exactly at the changed adoption-map inventory.
- Actual cgroup/public supervisor execution is not rerun locally. Local inner
  replay does not substitute for the hosted controlled-execution workflow.
- `pnpm check` passed reference-source checks, formatting, markdown lint and
  TypeScript checking, then stopped before validation because the `tsx` CLI
  could not create its IPC socket (`listen EPERM` under `/tmp/tsx-0/`). This is
  an execution-environment limitation, not a successful full-suite result.
- Direct execution of the same validator with `node --import tsx
tooling/src/validate.ts` passed. Direct generated-file verification also
  passed (19 generated files). Neither substitutes for the uncompleted full
  `pnpm check` required before push in this work order.
- Both attached patches passed `git apply --check` against the inspected main.
  Live protected files and historical evidence remain byte-identical to main.

The pause is caused by the work order's evidence-preservation boundary and the
reproduced extra dependency, not by missing GitHub write access. This packet is
preserved on the local repair branch. No push, PR creation or merge was performed;
the work order's before-push full-suite condition was not satisfied locally.
The three existing main failures remain unresolved pending the additional
evidence-scope decision and successful verification.
