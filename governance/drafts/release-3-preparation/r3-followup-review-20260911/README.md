# R3 additional review disposition

Reviewed baseline: main `731d4831563717903dbed9942e09281405726d1c`.
Scope: the user-supplied review of PRs #318, #324 and #325, the clarification
covering reviews of #318–#325, and repository naming instructions.
Accountable role: repository contributor integrating the user's review findings,
using OpenAI Codex in the authoring context on 2026-09-11. This patch adds no
numerical method, independent research review, formal adoption or release decision.

## Human review correction

The user reports that the reviews covering PRs #318–#325 were performed jointly
by humans and Claude, with Claude consolidating and emitting the combined results.
This reported participation supersedes the supplied reviews' inference that an
empty GitHub review list meant no human review. Platform approvals and external
review participation are different observations. The user's statement does not
identify individual reviewers, exact timestamps or which primary sources each
participant inspected; this record does not invent those details or claim that
participation alone proves every research-gate condition. The earlier repair's
"no new human review" wording applies to that author-context repair, not to the
user's jointly conducted reviews. No extra confirmation is required to record
this clarification.

## Selected repairs and bounded conclusions

| Finding                                                                        | Disposition                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #324 Node guard loaded dependencies first                                      | Confirmed in active candidate.3. Runtime imports now occur after the guard. Reserved exit 78 already maps to unsupported_host in the supervisor. CI checks actual Node 22, absent inputs, isolated missing dependencies, a static-import mutation, and the real cgroup/public-refusal path with cleanup.                                                          |
| #324 removed identity checker                                                  | Restored read-only consistency checks for exact IDs, schema/bundle/check bindings, check-owned policy and local reason coverage; five actual mutations fail the checker. No registry allocations are made.                                                                                                                                                        |
| #324 writing tests, local Python path, NRS-looking labels, missing source pins | Already repaired by #326 in candidate.3. Observations are separate, snapshots are compared, and only the machine-local interpreter path is normalized. Reasons are candidate:holm local labels. Reference verifier, conformance and probes are included in the adoption-map closure. This follow-up additionally pins probes in the supervisor runtime preflight. |
| #324 delayed worker claim                                                      | Clarified: a trusted setTimeout runner stub with real elapsed time, not an actual delayed Python worker. It tests the checkpoint boundary, not Python cancellation.                                                                                                                                                                                               |
| #324 loader and heap scope                                                     | Clarified native Node 24.19.0 for the controlled CLI, tsx for historical-reference test imports, and exclusion of Buffer/ArrayBuffer backing stores from heapUsed. The cgroup budget remains necessary.                                                                                                                                                           |
| #324 late routing refusal                                                      | Existing policy is retained: final processing exhaustion replaces non-ingress output; raw/parsed input refusals retain ingress priority. No numerical or precedence change is introduced.                                                                                                                                                                         |
| #318 regression counts                                                         | Current REGRESSION.md already distinguishes the 82-control author suite, 93-control investigator suite and 132 legacy fixtures. They are not an 82-of-93 pass fraction. Historical uncaptured outputs remain coordinator-reported; hashing the prose now does not create the missing output.                                                                      |
| #318 initial/final run identity                                                | Recovered service metadata for both commits and artifacts; ZIPs match service digests and all four original archived members byte-for-byte. Historical receipts remain unchanged.                                                                                                                                                                                 |
| #318 rootless wording and constant host descriptions                           | Seven controls need no delegation; the dedicated run invoked the whole suite as root. They do not demonstrate non-root execution. Host labels and hard-coded inventory counts are descriptive; observed rows and captured results carry the evidence. No new non-root or environmental attestation is claimed.                                                    |
| #325 flattened ZIP members and run/head link                                   | All six exact original member names, archived paths, byte counts and hashes are recovered, with run head/event/timestamps and the original ZIP for offline reconstruction. This packet omitted INTEGRATION metadata; it did not delete #322's separate packet.                                                                                                    |
| #325 repeated RESULTS and Python path                                          | Unchanged test outcomes can produce identical JSON across runs. They do not establish runtime identity; run metadata and source trees do. The historical local snapshot has a different interpreter path from CI. No byte-equality claim between those snapshots is made.                                                                                         |
| #325 workflow did not run on archive-only PR                                   | The historical workflow's path filter skipped archive changes. It is not evidence of an explicit evidence-reuse decision. Active workflows already run on every PR and main push after #326.                                                                                                                                                                      |
| Review chronology and independence                                             | Commit/merge timestamps and empty platform approvals cannot establish the timing or absence of external review. Human participation is recorded above; unknown initial files and source-review independence are not reconstructed as proven.                                                                                                                      |

Candidate.1, candidate.2 and every old review packet remain untouched. Candidate.3
is still an unissued development target. Its source digest and regression report
snapshots change with the guarded entry and refreshed pins; numerical values,
registered schemas and registered reason codes do not change.

## Naming diagnosis and repair

Root AGENTS.md already requires domain/task/accountable-role names and preserves
material provenance. At the reviewed baseline there was no CLAUDE.md bridge, no
tracked .claude settings or repository hook directory, and no configured local
core.hooksPath in this checkout. The [official Claude Code memory documentation](https://code.claude.com/docs/en/memory#agentsmd),
checked on 2026-09-11, says Claude Code reads CLAUDE.md rather than AGENTS.md and
recommends importing the latter. Root CLAUDE.md now contains only `@AGENTS.md`,
keeping AGENTS.md as the single contribution-policy source. This technical filename
is necessary for discovery, not decorative authorship attribution.

AGENTS.md now gives task-based branch examples, distinguishes read-only
fast-forwards from new assets needing a push, and accepts an externally enforced
prefix/hook without attempts to bypass it. The user's supplied log reports such a
hook. Its external configuration is not visible here, so the missing bridge is a
confirmed gap, not proof of the sole cause. Instructions are context, not a naming
enforcement mechanism. A future Claude Code session can confirm the bridge under
`/context`; this patch does not claim to have exercised that external application.

The observed `claude/modest-darwin-lhm0dj` branch pointed to
`84117fb7b285da43ebb3168c12155f31c4c49bc7`, the already merged #325 state. It does
not contain unique changes relative to that historical main commit. Existing
branches are retained to avoid losing review assets or links. Historical branch
names and material Claude participation remain disclosed. If the host continues
to force its prefix, that limitation is accepted as the user requested.

## Reproduction and evidence limits

Run `python3 governance/drafts/release-3-preparation/r3-followup-review-20260911/check_evidence.py`
to verify the archived ZIP bytes, strict member allowlists, ten byte-identical
member mappings, run/artifact head joins, and checksums. SERVICE-METADATA.json is
a fresh service response snapshot, not a signed attestation. The original ZIPs
were already retained in the work environment; this repair matches their hashes
to freshly retrieved artifact metadata before preserving them here.

REGRESSION.md is included as an external hash reference in ZIP-CHECKS.json to
identify the prose examined, without turning it into captured execution output.
Missing local outputs, the missing #320 initial review snapshot, and remaining
formal-adoption evidence conditions retain their previously documented limits.

The candidate README contains regression commands. The dedicated public workflow
runs the Node 22 guard and cgroup/public projection controls; standard CI and the
other active R3 workflows continue to run before merge.

## Implementation verification

[CI evidence for the follow-up implementation](ci/README.md) preserves the actual
Node 22 refusal and cleanup receipt, regressions, all five successful standard
jobs and all four successful active R3 workflows. It identifies the tested commit
and the unchanged source inputs across the subsequent evidence-only addition.
