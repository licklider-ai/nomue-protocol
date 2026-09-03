# FND-1 Non-Clinical Estimand Residual Review Variance Adjudication

**Status: informative research adjudication; non-normative; not adopted.** This
record resolves the material variance between two independent close reviews of
the frozen `H04-S4` animal-endpoint source result. It does not alter either
frozen result, adopt Protocol vocabulary, authorize implementation, close the
full FND-1 Research Gate, or affect a release.

## Inputs and identity

| Input                                | Repository identity                                                                                                                                                                                                                                            | Content identity                                                                                                                                                                                    | Role                       |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Frozen animal-endpoint source result | [`2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md`](2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md); blob `e70e0f1020878fc76757e895fcc85aef63acda4e`                                                                        | SHA-256 `2e354101fa17d9792dcce13886f455370efe7b7408c99d79d3b3649762642b57`                                                                                                                          | Result under review        |
| First close review                   | [`2026-09-02-nonclinical-estimand-animal-endpoint-close-review-result.md`](2026-09-02-nonclinical-estimand-animal-endpoint-close-review-result.md); intake commit `04681db2478fe5eb7d986492a4d8f3aa1402f0eb`; merge `371bb85371357c982e1ab940fd34a74a1e9d7ec4` | blob `e9f47c415aa21176663ebfa895a76a3a4855a0f2`; SHA-256 `52c1507f5ebbf57e46f985a7158380d353cd89394864cea57f0890c9a189c024`                                                                         | Independent close review A |
| Supplemental close review            | [`2026-09-03-nonclinical-estimand-animal-endpoint-supplemental-close-review-result.md`](2026-09-03-nonclinical-estimand-animal-endpoint-supplemental-close-review-result.md)                                                                                   | supplied handoff SHA-256 `c91d47be22b584b5ba2d4388125e84a1e84828f509d5578dfd446a124b525e13`; repository-formatted report SHA-256 `271619ad6901552859596e6c794b6a8132fdf856792d83056681589bf49181c4` | Independent close review B |

Both reviews inspected the same three source artifacts at the commissioned
SHA-256 values and returned `GO`. Both support the source result's
`H04-S4: NARROW_AND_CLOSE` proposal and preserve the same governance boundary.
They differ on whether four documentation defects exist. The adjudication does
not use reviewer count as a vote; it tests each disputed statement against the
frozen result and the independently recorded source-page checks.

## Common ground

The following conclusions are accepted without variance:

1. all three mandatory artifacts passed the source-access and identity gates;
2. the three-source corpus directly supports the endpoint-time-action boundary
   required by the `H04-S4` commission;
3. outcome-existence semantics and statistical missingness-mechanism semantics
   are not supplied by this animal-source corpus;
4. the difference between `humane endpoint` and `humane intervention point` is
   material source terminology and must remain visible; and
5. `NARROW_AND_CLOSE` is supported only for the bounded `H04-S4` source question,
   not for Protocol adoption or the full FND-1 Research Gate.

## Point-by-point variance ruling

| Disputed item                      | Review A                                                               | Review B                                                                                                                      | Adjudicated ruling                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AE-03` Humane Endpoints page      | Places AC-14 and the adjacent precision statement on p. 1570           | Page-image inspection places the section start and both statements on p. 1569; AC-15 remains on p. 1570                       | **Adopt review B.** The frozen result's p. 1570-only anchors are corrected in the steward record to pp. 1569–1570, with AC-14 and the precision statement on p. 1569.                                                                                                                                                   |
| `AE-01` retained-verbatim total    | Accepts 19 words                                                       | Finds 25 words when the two additional quoted search-hit strings are counted                                                  | **Adopt review B.** The frozen self-check omits six quoted words under its stated complete-count rule. The frozen total is 25 words when hyphenated compounds count as one. The accepted corrected rendering paraphrases the dental and concurrent-infection search examples, restoring the reusable total to 19 words. |
| `AE-01` 2000/2002/DOI relationship | States that the result already records the relationship transparently  | Finds that the result records the 2000 marks and ISBN filename but never explains the commission's 2002 citation or DOI route | **Adopt review B.** Direct inspection of the frozen register confirms the omission. The accepted identity is the internally dated 2000 document distributed under the later DOI/ISBN catalogue identity; it is not an internally marked 2002 edition.                                                                   |
| `AE-02r` pilot-study wording       | Accepts “pilot data expressly not usable as scientific data” as direct | Distinguishes a purpose/focus rule from a prohibition on later data use                                                       | **Adopt review B.** The direct claim is limited to the guidance's instruction that pilot studies focus on determining welfare-appropriate endpoints rather than generating usable scientific data. No prohibition on all later use of pilot data is accepted.                                                           |

The first review's `GO` verdict remains valid because none of the four defects
changes a load-bearing evidence grade, source identity, or disposition. Its
zero-`SHOULD_FIX` inventory is superseded for steward use by the four-item
inventory above. The first report remains unchanged as an independent historical
record.

## Accepted correction ledger

The frozen source result is not silently rewritten. The later steward
disposition carries these old-to-new rulings:

1. `AE-03` page anchors: p. 1570-only → section pp. 1569–1570, with AC-14 and
   the precision statement at p. 1569 and AC-15 at p. 1570.
2. `AE-01` quotation audit: the frozen rendering is 19 recorded → 25 complete
   words when hyphenated compounds count as one. The accepted corrected
   rendering paraphrases the dental and concurrent-infection search examples
   and therefore retains 19 words; later reuse follows that rendering.
3. `AE-01` artifact identity: 2000 marks and ISBN filename only → 2000 internal
   document identity plus the later DOI/ISBN distribution identity recorded by
   the commission.
4. `AE-02r` bearer 7: an express unusability rule → a directly stated pilot-study
   focus rule; the `DEFINED_DIRECTLY` grade is retained only for that narrower
   statement.

## Non-blocking observations preserved

All six distinct non-blocking observations from the two reviews remain available
for later editorial work:

1. add canonical filenames beside supplied-file names;
2. keep the CCAC 2022 same-body and role-coverage rationale distinct from a
   formal supersession notice;
3. tighten `AE-01` locators for Annex 4, paragraphs 46 and 60, and the second
   moribund gloss;
4. record the `AE-02r` roman-numbered front matter, fish experimental-unit and
   random-assignment passages, and the combined severity/approval anchor;
5. replace licence wording not used by `AE-03`, narrow the 48-hour clock to the
   stated necrosis condition, and prefer Box 3 for the control-group anchor; and
6. complete the supplementary `AE-01` search-hit record and retain its citation
   of the 1998 CCAC title only as a same-corpus role trace.

None changes the bounded disposition.

## Governance disposition

This adjudication satisfies the Research Gate requirement to preserve and
resolve material disagreement before treating the source question as settled.
It authorizes only a later steward record to use the corrected four-item ledger
while deciding `H04-S4`. It does not create Protocol meaning, close
`FND1-H04` by itself, or affect Release 2.

H04-S4 REVIEW VARIANCE ADJUDICATED - FOUR DOCUMENTATION CORRECTIONS CARRIED FORWARD - NOT PROTOCOL ADOPTION
