# Release 4 opening preparation review handoff

Status: author-side instructions, 2026-09-09. Review the preparation increment,
not a request to open public discussion. Use a separate model/context under
AGENTS.md and governance/RFC.md; disclose actual independence and prior involvement.

## Fixed input

Repository: `licklider-ai/nomue-protocol`.
Branch locator: `research/r4-opening-claim-map`; resolve the fixed commit below
rather than following a later moving head. This handoff is added after the input
commit and is not part of the five-file input it identifies.

| Object                                                                   | Identity                                   |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| Input commit                                                             | `964fe8640399a984e42723ad3e6247971c067fc8` |
| Parent, accepted main baseline                                           | `ed6e9d9bde691556b99d22e261b31c3b25df338f` |
| Input tree                                                               | `24d71fef73724303fe351c0bd063445b741ca744` |
| `governance/drafts/release-4-preparation/README.md`                      | `f54579e51c080411044a22599c57cac71773d847` |
| `governance/drafts/release-4-preparation/public-discussion-readiness.md` | `862585b1b2a0a4e39b76bf82fa268a1711f3c3fd` |
| `governance/drafts/release-4-preparation/opening-claim-map.md`           | `5c2c65e37127d06c07bbcf0a8f3c01843ae2d3e8` |
| `governance/drafts/release-4-preparation/rfc-impact-inventory.md`        | `1b2c22e08eb48592ad153752321217c9e597ccc3` |
| `governance/drafts/release-4-preparation/rfc-preparation-draft.md`       | `58cb18b01883f860549a0407e7c842585e7fd4e0` |

The input adds one file and modifies four. The delivery branch then adds this
handoff only. The README's handoff link is therefore resolved in the delivery
commit, not the fixed editorial input. Inspect both commits and report which
was validated; do not confuse the delivery tree with the fixed input tree.
All numerical scripts/results, preserved reviews, source-copy records,
authoritative artifacts and Release 3 files are unchanged from the parent.

## Preparation review

1. Read AGENTS.md and its ordered governance prerequisites. Verify the input,
   parent, tree, all five blobs and exact diff before evaluating prose.
2. Check the acceptance updates against the programme acceptance and the final
   scaling acceptance paragraph at the parent. Preserve the distinction between
   SF-2's substantive closure, the author-side C-1 repair, and steward acceptance;
   no new independent C-1 close verdict is claimed.
3. Review all eight claim-map rows. Identify any unsupported claim, implicit
   choice of interval or multiplicity semantics, invented source requirement or
   silent waiver of S1-S6/P1. Check population targets versus sample estimates.
   Numerical reproduction is not required for this prose-only increment because
   its numerical inputs are unchanged; do not infer source closure from that fact.
4. Check the concrete Contract/Profile/Public Check allocation against ADR-0032,
   ID-POLICY and the authority manifest. The earlier Profile-only placement is
   superseded as a recommendation; no normative destination is created. Review
   the six clause-subject rows and flag omitted ownership or duplicate meaning.
5. Verify the two Release 3 blob pins in the RFC draft. Review the conditional
   dependency comparison and the author's release-order interpretation against
   the RFC process. Neither R3 scope nor either release number changes.
6. Distinguish preparation completeness from public-opening readiness. R4-P1
   through P6 remain open. Exact clause/ID, enclosing schema/report, strict-input
   and tier assessment are still incomplete; no discussion clock or method
   support is authorized. State which concrete item should be completed next.
7. Run formatting, Markdown lint, typecheck, repository validation and diff checks
   on the complete delivery tree. Preserve existing evidence files byte-for-byte.

Return a bounded verdict, BLOCKER/SHOULD-FIX/NICE-TO-HAVE findings, inspected inputs,
validation outcomes and independence disclosures in
`review-inputs/r4-opening-preparation/REVIEW-RESULT.md`. A preparation GO is not an
R4-P6 opening GO. Create a draft PR targeting `research/r4-opening-claim-map`,
containing the review record only; do not merge, ratify or open an RFC.

## Separate primary-source work

The [claim map's completion packet](opening-claim-map.md#primary-source-completion-packet)
is a concrete assignment for an independent source investigator. It prioritizes
S1/S5 and retained interval claims, then S2/P1 normalization and attribution.
If this task also executes that investigation, record it separately under
`review-inputs/r4-opening-primary-sources/RESEARCH-RESULT.md`, with exact source
bytes/pages, claim mapping and source-specific dispositions. Do not present a
prose review as completed primary-source work.

If sources are unavailable, report which claims remain unsupported and the actual
access limitation. Do not invent a mandatory purchase, independent download or
specific named-paper requirement. Preserve the accepted supporting-copy status.
No purchase, external message or access-control circumvention is authorized.
Any proposed narrowed scope or staging of S6 is a recommendation for review and
steward disposition, not a unilateral closure of the existing commission.
