# Release 4 formal decision packet repair confirmation

## Verdict

GO

This is a close-only confirmation of the author-side repair. It closes the
packet-review findings only. It is not a formal FD1-FD6 decision, adoption,
implementation authority, support activation, RFC action, issuance, publication,
or Release 4 release approval.

## Exact confirmed target

| Field      | Value                                      |
| ---------- | ------------------------------------------ |
| Head       | `ab5607be20abbe6077e935cfbb5c6bdd8420a81c` |
| Parent     | `369d4c7e392372a4c810c2f0a83766aa687842c1` |
| Tree       | `7f8908d7abb9773b215c56a700270bcede358b48` |
| Base/main  | `c2e65489f0bd9d909f9c42ab87898da0c479567c` |
| Merge base | `c2e65489f0bd9d909f9c42ab87898da0c479567c` |

The remote branch `preparation/r4-formal-decision-packet-20260918` and remote
`main` matched the stated head and base during confirmation.

## Finding closure

| Original finding                      | Status | Close-only result                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M-1: D07 indeterminate-only CLI gap   | CLOSED | FD5 now requires terminal-only completed outcomes or deferral to a separately versioned NRS-VERIFY-0025 successor. It expressly makes code `0` unavailable and rejects `anyFail ? 2 : 0` as precedent. Landing gate 8 requires a compatibility/drift test proving that an indeterminate-only completed report never exits `0`. No successor CLI is adopted. |
| m-1: amendment clock 19 seconds early | CLOSED | The packet consistently distinguishes the body timestamp `2026-09-18T01:50:49Z` from platform `created_at` `2026-09-18T01:51:08Z`, and conservatively controls on `2026-10-18T01:51:08Z`.                                                                                                                                                                   |
| m-2: lifecycle carrier omitted        | CLOSED | The landing outline and required-disposition list include NRS-CORE-0022, `balanced-two-factor-lifecycle.md`, carrier-domain fixtures, the `lifecycle.ts` mapping, and no new state-invariant entry.                                                                                                                                                         |
| Fixed-input scope drift               | NONE   | The repair delta leaves the T03 policy, A1 directory, and preserved original review result unchanged. Its changes are decision-preparation/navigation prose plus the repair disposition.                                                                                                                                                                    |

## Custody and scope

The imported original review bytes match blob
`acfc1d4dc3e462b9ddfc3c8f74722d267a1b5bde` and SHA-256
`989f56c273f2c0a1560a0ac152eece1eab4e9d03bd15fe23fe2679846457088a`.
The fixed source commits named by the packet are present.

The confirmation was a read-only, separate-agent close review of the repair delta
and its direct packet context. It did not re-adjudicate the scientific or numerical
candidate and did not make a formal FD1-FD6 decision.

NOT_RUN: no implementation/landing drift test was run because no landing exists;
only the repaired requirement to run it was verified. The reviewer did not make a
fresh live GitHub API query for the comment `created_at`; its custody is the
preserved original review and repaired packet text.

No adoption, Issue or pull-request action, merge, publication, implementation,
issuance, release action, or RFC action was performed by the close-only review.
