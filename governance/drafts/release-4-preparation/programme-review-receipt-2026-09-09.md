# Programme review receipt and follow-up

Status: author-side receipt, 2026-09-09; no steward acceptance or merge decision.

PR 232 adds review commit `510cad76132b1d18d581da581fe9c1ee162c8b59`,
parent `f01b870bdce4e051476e4b74d56b4deb4217307e`, tree
`c8bc5ed00e38963495b20829a7399e925d46506f`. The
[review record](../../../review-inputs/r4-programme-audit/REVIEW-RESULT.md)
is preserved with blob `cf7416d89f9e30c302df4ec9818cb4c067332756` unchanged.
It reports bounded GO, SF-R1/SF-R2 CLOSED, no BLOCKER or SHOULD-FIX on the audit,
and five NICE-TO-HAVE findings. Its independently reported reproduction uses
CPython 3.12.3 / NumPy 2.3.5. This receipt does not claim a new reproduction.

## Consumed handoff discrepancy

The review consumed PR 229's original commit `176d92551185245916b5c83cbb279b2783ccc998`
and handoff blob `63a4bc1a985b022fe6b6895695f2ac119d0d9ea9`. It explicitly
applied the corrected graph-versus-summation-site reading. GitHub inspection in
this receiving session instead resolves PR 229 to repaired commit
`11175531a7904b2d887f4ae78f744831ef363cc2`, with handoff blob
`54f954e31204359d750f94cb56fd1f0ce4712fc6`. The repair is present remotely.
The reason the reviewer observed the earlier head is not established; no cache,
fetch or timing cause is inferred. The fixed PR 227 scientific input is identical
under both handoff versions, and the review records its actual consumed version.
Its Section 9 findings apply to the old instructions; the prior
[repair record](programme-handoff-repair-2026-09-09.md) describes their repairs.
The review has not independently close-checked those later instruction edits.

## Audit finding dispositions

| Finding | Successor treatment                                                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| N-A1    | Append target/projection clarification to the self-audit: exact SS/SSE leave representable range while exact F remains representable            |
| N-A2    | Append division-type clarification, distinguishing Python 0/0 exception from Python inf/inf NaN; preserve the review's broader wording verbatim |
| N-A3    | Update supplement and readiness to cite the returned closure verdict, explicitly without claiming steward acceptance                            |
| N-A4    | State finiteness for all 19845 corpus quantities; exclude the separate scale cases                                                              |
| N-A5    | Pin PR 190 input directly in the readiness numerical table                                                                                      |

The pure-Python division distinction was checked directly in this session.
The submitted graph was inspected for NumPy float64 division and errstate.
No full numerical rerun is needed for these prose-only additions; original probes,
JSON transcripts and historical review texts remain unchanged. These successor
edits are not covered by the prior exact-input GO.

The reviewer reports model/provider/context separation from the OpenAI-assisted
author and discloses prior handoff review in the same reviewer session. This
receipt preserves that disclosure without inferring human independence. No S1-S6
or P1 source hold, or R4-P1 through R4-P6 condition, is closed by receipt.
Public discussion remains NOT_READY. The next methodological work follows the
[numerical workplan](numerical-feasibility-workplan.md) alongside claim-specific
source work; neither depends on treating this receipt as adoption.

Prepared with OpenAI Codex assistance in the existing authoring context.
