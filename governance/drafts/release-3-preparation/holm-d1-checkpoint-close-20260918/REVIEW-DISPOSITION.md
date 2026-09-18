# Implementation review and close-only disposition

Date: 2026-09-18 UTC. Source: review reports supplied by the user in the working
conversation. No repository reviewer commit, original file/blob, signed identity
or exact submission time was supplied. This English author summary preserves
the findings and limitations; it is not a byte-for-byte original review intake.
No GitHub approval or human expert review is inferred.

## Scope and independence

The reviewer continued the same session/context across PR #22, PR #23 at
`fa5cefa6681b14736ec8f2f6617e44415f0d9caa`, and the close-only check at
`7f97a58c27cfb92d268c7eb03519bc5dc8cd0e00`. They explicitly disclaimed independent
investigator status for the RFC Research Gate and declined to issue
GO_FOR_D1_CONTINUATION. They reported direct reading of Protocol D0 `1eb6b93`.
The final supplied verdict is **CLOSED**, all five findings closed, no new finding
and no scope drift in the six-file repair. This is bounded implementation repair
confirmation only. The earlier PR #22 repair at `735e620` was also confirmed.

## Findings and confirmation

| Finding                                                         | Repair                                                                         | Reported close-only confirmation                                                                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Non-Buffer projection return escaped canonicalization refusal   | Buffer guard before canonicalStorage/hash; four return-type fault cases        | Reviewer used a separate return-site mutation anchor; undefined/string on canonical/noncanonical inputs all refused as canonicalization_failure |
| Digest catch erased typed resource errors                       | Preserve StoredInputError; digest-resource-limit case                          | All five added helper cases passed; no guessed RangeError classification                                                                        |
| Checkpoint propagation relies on helper not catching exceptions | Explicit no-catch comment in projection                                        | Both Buffer return paths inspected                                                                                                              |
| Small checkpoint fixture omitted periodic scanning              | >2 KB fixture, at least fourteen phase/scanner callbacks, three sentinel types | 245 component tests, no failures; five Python-dependent skips                                                                                   |
| Baseline source-copy receipts share the candidate inventory     | Require lane/case identity and MUTATION.json as well as hash                   | Handoff wording confirmed                                                                                                                       |

Normal projection returns use Buffer.concat or Buffer.from. The new guard
accepts both. The reviewer also confirmed the before-repair 16/20 accounting:
one of the five added cases already refused; four failed the new assertions.

Reviewer environment: Node 22 / Python 3.11. Strict TypeScript, npm test and
package smoke passed; all 32 runtime inventory entries matched, with only
stored-bytes.ts changed. Helper inner run was 19/20: the sole valid-baseline
failure was unsupported_execution from the Python version pin. It is not a
candidate defect and does not substitute for a pinned-runtime positive result.
Reviewer actual cgroup/Python 3.12.14 execution is NOT_RUN. Separate author
pinned-runtime and hosted CI results are preserved in EVIDENCE.json.

## Disposition and retained limitations

The owner instructed completion of the agreed closeout scope after supplying
this confirmation: merge PR #22 then #23, preserve evidence and restart notes,
and pause. The merges preserve the unissued development boundary; no formal
Research Gate, D1, D2/D3, support or release decision is recorded here.

The reviewer highlighted a pre-existing residual: a corrupted helper returning
a correctly typed Buffer on noncanonical bytes can still emit a report with an
incorrect stored_projection_digest. The runtime K result prevents I pass and
forwarding, but does not validate that reference. The independent raw-byte oracle
catches the retained reserialization mutant. This is the most important carryover
for the next reviewer; R3D-44 remains partial. Runtime pin checks reject unpinned
source changes separately; explicit test-copy repinning is never a trust grant.

Other existing residuals remain: earlier byte-oracle/runner and B-2 result-replay
repair review, narrower boundary matrices, actual failed cleanup/supervisor loss,
independent host assessment where required, and eventual D1/D2/D3 dispositions.
The close-only report's permission to continue tests is not used to expand this
session beyond the owner's requested stopping point.
