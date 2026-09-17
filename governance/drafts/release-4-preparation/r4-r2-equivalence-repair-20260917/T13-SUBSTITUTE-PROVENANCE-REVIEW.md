# R4 T13 SUBSTITUTE PROVENANCE REVIEW — GO

Review date: 2026-09-17 UTC. The preserved evidence is sufficient to retain the reported T13 result as a durable R4 decision input, with this separate substitute review attached. No new BLOCKER or SHOULD-FIX was identified.

This review was performed in a fresh reviewer context, independent of the authoring thread, using OpenAI Codex. It is **not the original T13 review or receipt**, claims no continuity of reviewer identity, and does not authenticate the missing original chat receipt. It independently examines the fixed Git target and preserved evidence. No original reviewer identity, receipt hash, receipt byte length, earlier receipt path, or served-model attestation is asserted.

The following checks support the verdict:

1. **Repository and target identity.** The repository remote is `licklider-ai/nomue-protocol`. Both specified commits exist. Frozen target `88a5f488db8a777c691afbf85282f9be99fb00d4` has candidate source `c62ba0f4ffe0e7a1992968f84adc81bd4546b217` as its immediate parent. Both are ancestors of live GitHub main `554818683d037d378ef3c11f1758b848adca1ec3`, confirmed at the beginning and end. The checkout had nine pre-existing untracked files; they were excluded from evidence. HEAD, branch, tracked differences and untracked-file inventory remained unchanged.

2. **Freeze and package integrity.** All 54 inventory bindings and four package-file bindings matched their recorded hashes and byte lengths. The original 46 inventory entries were preserved exactly. The [frozen manifest](https://github.com/licklider-ai/nomue-protocol/blob/88a5f488db8a777c691afbf85282f9be99fb00d4/governance/drafts/release-4-preparation/t12-refreeze-f13-01-20260916/FREEZE-MANIFEST.json) is 37,322 bytes, with SHA-256 `9542edc5d2fc316d0f370f9e40504dd3a47eee1085e9628b9db04fb4ff8f7c1f`, matching its reproduction receipt. Candidate-source-to-target changes are confined to the re-freeze package.

3. **T06–T11 evidence bindings.** An additional 161 packet-member bindings and 339 input/source pins passed inspection. Historical material was checked at its recorded commits. T07 preserves 912 assertions in each default/jitless result; T08 preserves 344 assertions in each normal/optimized result. Original and corrected T10 corpus trees remain unchanged across the F13-01 repair and frozen target. This checks preserved evidence and provenance; it does not regenerate expectations or establish numerical correctness anew.

4. **Exact-target execution evidence.** Existing Actions archives were read into memory and their ZIP hashes matched GitHub’s recorded digests:
   - [T09 run 35079144095](https://github.com/licklider-ai/nomue-protocol/actions/runs/35079144095): 54/54 recorded cases passed.
   - [T10 run 35079148074](https://github.com/licklider-ai/nomue-protocol/actions/runs/35079148074): 348/348 recorded invocations passed; all 348 delivered results matched the preserved historical T10 results.
   - [T11 run 35079150779](https://github.com/licklider-ai/nomue-protocol/actions/runs/35079150779): seven recorded commands exited zero, their output hashes matched, and the saved full-check log records 520 passing tests.

   All three runs identify the exact frozen target. Both T09/T10 staging inventories matched the reconstructed 1,927-file source inventory. An in-memory build from fixed Git sources reproduced `app.mjs` SHA-256 `4686786a5d81c8efdda12c9725fea84cf5952218dcad35419bfbbbaec2235cdf`. No new Linux execution or regression campaign was performed.

5. **F13-01 closure and failure precedence.** The [repair evidence](https://github.com/licklider-ai/nomue-protocol/blob/88a5f488db8a777c691afbf85282f9be99fb00d4/governance/drafts/release-4-preparation/t13-f13-01-repair-20260915/REPORT.md), fixed source and saved exact-target runs agree: byte `FF` retains `execution_refusal`, `parse_error`, `NRS-PARSE-FAILED`, exit 2, no completed report and zero numerical-core invocations. Deadline, resource and internal failures retain their classifications. New, limited in-memory checks of the fixed finalizer/delivery functions passed 12 failure-precedence cases and rejected three incompatible UTF-8 mappings in each normal/optimized compilation mode. These are this review’s checks; they do not authenticate the original reviewer’s reported checks.

6. **Intake accuracy and decision boundary.** The [T13 intake](https://github.com/licklider-ai/nomue-protocol/blob/554818683d037d378ef3c11f1758b848adca1ec3/governance/drafts/release-4-preparation/r4-adoption-readiness-a1-20260917/T13-RESULT-INTAKE.md) materially matches the independently establishable target, evidence, F13-01 closure, F13-02 finding and non-promotion boundary. Its own 5,015-byte content matches SHA-256 `0a2ab991f37838b2a5bc3d9b07a464ac2a32437e17e36ed0169c27f5ebcd2847` in its manifest and INPUTS. This authenticates the stored intake’s binding, not its missing source receipt. Protected formal/Public surfaces match the declared baseline; the candidate bundle remains `supported: false`. Release 4 remains **UNISSUED CANDIDATE**.

Findings:

- **SP-01 — NOTE**
  - **Evidence:** T13 intake, “Source and integrity limits,” and its INPUTS binding.
  - **Observed issue:** Original receipt metadata and the original reviewer’s precise activity remain unauthenticated.
  - **Why it matters:** Reported historical review activity must remain distinguishable from this independently observed evidence.
  - **Minimum correction:** Preserve those unknowns and retain this report explicitly as a separate `substitute provenance review`.
  - **Full T13 re-review required:** No. The missing metadata does not prevent the bounded, independently verified result from informing a decision.

- **SP-02 — NOTE**
  - **Evidence:** Frozen re-freeze REPORT and [correction commit 9ec48f29…](https://github.com/licklider-ai/nomue-protocol/commit/9ec48f29aebbd46b327e8693efb3be2bf6606193).
  - **Observed issue:** The frozen REPORT calls `84627967…` the direct repair parent; the immediate parent is `4dea1b07…`. The intake accurately records this existing F13-02 finding.
  - **Why it matters:** Immediate parentage and repair ancestry are distinct; the manifest’s source binding remains valid.
  - **Minimum correction:** Already supplied by the subsequent documentation/hash correction. Preserve the original target and cite the correction separately.
  - **Full T13 re-review required:** No.

The supplementary Actions archives currently expire on 2026-12-15. Retaining their bytes and digest metadata alongside the substitute-review intake would preserve this additional corroboration.

- **Review target:** `88a5f488db8a777c691afbf85282f9be99fb00d4`
- **Candidate source:** `c62ba0f4ffe0e7a1992968f84adc81bd4546b217`
- **Review type:** `substitute provenance review`
- **Verdict:** **R4 T13 SUBSTITUTE PROVENANCE REVIEW — GO**
- **BLOCKER count:** 0
- **SHOULD-FIX count:** 0
- **Establishes:** Independent corroboration of target identity, evidence bindings, F13-01 closure, preservation claims and the bounded reuse of the reported T13 result.
- **Does not establish:** Original-receipt authenticity, reviewer continuity, a new full scientific/numerical review, T14/A1/R2-equivalence clearance, or release adoption.
- **EQ-01 replacement evidence:** Yes, for the narrowly specified T13 provenance gap.
- **Recommended next action:** Preserve this report as a distinct substitute-review receipt for steward intake. No full T13 re-review is necessary. No files, commits, pushes, PRs or merges were created; the review stops here.
