# Release 4 review intake and repair handoff

The two review records returned at source commit `c8ce35c` are preserved verbatim
under `review-inputs/r4-public-discussion-preparation/` and
`review-inputs/r4-rfc-preparation/`. Their numerical and editorial GO verdicts
apply to `4cf3e12acc77bd38c09d5acd2588ede66ee265b2` and
`bf4004694f68018534e01bde2f2a33214accba19`, respectively, not this repair.
Their source-access and public-opening limits remain in force.

## Repair disposition

| Item                  | Author action                                                                                     | Remaining review                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Numerical SF-1 / N-2  | Add review-attributed magnitudes and exact-zero denominators beside the counts                    | Confirm faithful transcription and interpretation                            |
| Numerical SF-2 / N-3  | State interpreter is part of graph definition; record Python and NumPy counter-environments       | Confirm coverage of all three summation sites                                |
| Numerical N-1         | Leave literal comparison counts and probe bytes unchanged                                         | Optional future code cleanup; no correctness failure recorded                |
| Numerical N-4/N-5     | Deferred optional exposition/planning cleanup                                                     | No gate closure depends on these edits                                       |
| Numerical N-6         | This handoff indexes both review lanes                                                            | Navigation review                                                            |
| Editorial N-1         | Attribute unverified Yates leads to returned review                                               | Validate any actual acquired file before use                                 |
| Editorial N-2/N-3/N-5 | Clarify plural informative documents, exploratory acceptance, magnitude/interpreter evidence link | Wording check                                                                |
| Editorial N-4         | Preserve source-substitution investigation rather than invent bibliographic entries               | Independent source investigation                                             |
| R4-P5 inventory gap   | Add concrete proposed paths and existing requirement constraints                                  | Final exact clauses, new IDs, complete surface impact and tier still pending |

## Independent follow-up prompt

Read AGENTS.md and its ordered prerequisites. Resolve branch
`research/r4-reviewed-preparation-repair` once and record exact head, parent,
tree and changed blobs. The expected parent is `bf4004694f68018534e01bde2f2a33214accba19`.
Confirm both preserved review blobs match `c8ce35c`; confirm probe and result
are byte-identical to PR 218 input. Read both original review verdicts.

Review the prose-only SF-1/SF-2 changes against review Sections 5.4-5.5 and 9.
Do not require a numerical rerun solely for this transcription; rerun if a
specific inconsistency warrants it. Separately review the new impact inventory
against owning specs and registries: distinguish unchanged constraints from
meaning changes and flag missing final allocations. Record bounded repair GO
or needed correction independently of R4-P5 and public-opening readiness.

Treat the user's Cochran acquisition report as attributed testimony, not a new
full-source review. Investigate lawful library delivery or an appropriate
alternative original-source basis if available; do not repeat failed searches
as a prerequisite or waive S1/S5. No messages or purchases are authorized by
this prompt. Preserve completed provided-copy acceptance.

Write `review-inputs/r4-preparation-repair/REVIEW-RESULT.md` with exact identities,
SF disposition, inventory findings, source access and opening readiness as
separate judgments, independence disclosure and validation. Create a neutral
review branch and draft PR. Do not merge, open an RFC window, adopt a method,
allocate identifiers, or change Release 3. This author-side repair does not
supply its own independent close review.
