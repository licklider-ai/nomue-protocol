# Release 4 formal decision packet

Status: **PREPARED FOR INDEPENDENT PACKET REVIEW; FORMAL DECISION TIME-GATED**.

This packet assembles the already reviewed, unissued balanced two-factor Release 4
candidate for an eventual steward decision. It does not repeat T01-T14 research,
reselect D01-D07, issue an identifier, modify an authoritative public surface,
authorize implementation, or adopt or publish Release 4.

A unified decision that includes the later D01/D07 amendment may occur no earlier
than `2026-10-18T01:50:49Z`. Elapse of that window is necessary but not sufficient:
the steward must also consider discussion feedback, an exact-target independent
review of this packet, and every disposition in the decision ledger.

## Fixed decision inputs

| Input                        | Fixed identity and role                                                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RFC 261 opening              | Issue #261; proposal commit `21453d82109106e9e811571383228dcef8f60fac`; candidate blob `807e4bf0c22e5270b8fc15824329d04b5c37b146`; opened `2026-09-09T05:59:47Z` |
| Closed candidate             | T03-T14 and frozen target `88a5f488db8a777c691afbf85282f9be99fb00d4`; candidate source `c62ba0f4ffe0e7a1992968f84adc81bd4546b217`                                |
| A1 adoption-readiness packet | Repaired reviewed target `c36c8496f98cbbb4481f85a56750f5683201778c`; integrated by PR #350 at `554818683d037d378ef3c11f1758b848adca1ec3`                         |
| D01/D07 amendment            | Reviewable input `5996da5a7869f2b21ae8f73407c434285c9862bb`; opened `2026-09-18T01:50:49Z` as STABLE-INTENT                                                      |

The containing pull request fixes the exact packet head and base. The identities
above remain the source evidence even if this packet receives review-only repairs.

## Read in this order

1. [Decision ledger](DECISION-LEDGER.md) — exact steward decisions and their
   coupling rules.
2. [Evidence and disposition index](EVIDENCE-AND-DISPOSITION.md) — what the
   existing receipts establish and what still needs a formal disposition.
3. [Discussion and drift record](DISCUSSION-AND-DRIFT.md) — the two RFC clocks,
   fixed amendment input, and post-review repository drift.
4. [Authoritative landing outline](AUTHORITATIVE-LANDING-OUTLINE.md) — the
   coupled change set that may be prepared only after the required decisions.
5. [Independent packet review](INDEPENDENT-PACKET-REVIEW.md) — bounded review
   commission for this packet.

## Packet boundary

- Candidate review GO means that a fixed candidate is suitable as decision input;
  it is not an adoption, implementation, support, or release verdict.
- The detailed report, not a new or reinterpreted CLI exit code, owns the D07
  pass/proved-mismatch/completed-indeterminate distinction.
- Existing Release 1 meanings, identifiers, schemas, bundles, and signed release
  evidence remain immutable.
- The candidate Bundle remains `supported: false`; this packet does not flip or
  authorize a support flag.
- Any material semantic or scope change requires a fresh impact assessment and,
  where applicable, a new public discussion window.

Review-only repairs may clarify this packet without changing its fixed source
inputs. A repair that changes candidate meaning, the D01/D07 boundary, affected
stability tier, or proposed public surface invalidates the packet review and must
be assessed as a new decision input.
