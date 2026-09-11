# Author applicability intake

Date: 2026-09-11. OpenAI Codex in the continuing preparation-author context.
This file is an author-side disposition, separate from the accompanying
independent source report. It is not a second independent review.

The user supplied IEEE 754-2019 before continuation of PR #293. The uploaded
copy is identified in SOURCES.json. The earlier acquisition limitation is a
historical fact; the new clause review is its successor, not an alteration of
the old review. The licensed PDF, extracted text and rendered pages are not
included in this repository.

## Bounded applicability

| Existing artifact                                              | Intake implication                                                                                               | Boundary retained                                                                                        |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| PR #287, `da1c53dfd70f02169014f5d882aa51aec960a019`            | The accompanying independent report supplies the missing IEEE clause-level source assessment                     | Original F/beta derivations and reviews preserved; no global gate-registry change                        |
| R4 arithmetic, `2864903316b4b4b2b219a56b42c535bfec7935b3`      | Field mapping and nearest/even projection source basis can use the new report within its stated scope            | Exact represented inputs are not the original real measurements; runtime conformance not certified       |
| R4 composition, `c61e734a1f19f6572100f2594dd24b1e01ea4d49`     | No conflicting encoding/rounding rule identified by this intake                                                  | Full composition, resource domain and submitted-tail consumer remain separate                            |
| R3 Holm, `c4ad231471deba354bd018550b2378f2d740b944`            | Same nonnegative binary64 field mapping and nearest/even source facts are applicable; no author repair indicated | This is author applicability only, not an independent Holm implementation or scientific-input acceptance |
| R4 output proposal, `15c8c38f8f391d0361472892ebca6492bc968d37` | Its historical IEEE-unavailable statement now has a successor record here                                        | Positive displayed SSE, complete-output requirements and resource policy still need design review        |

No code change is indicated by the source-impact check. The independent review
qualifies exact signed zero: arithmetic deliberately maps both input zero signs
to mathematical zero and projects exact zero as +0. Input encoding identity in
the composition carrier remains distinct from that arithmetic convention.
Neither convention promises operation-by-operation IEEE signed-zero behavior. Rejecting every exact
magnitude above maximum finite is deliberately stricter than standard nearest
rounding below its overflow threshold. Likewise, negative-zero refusal for Holm
p inputs and positive displayed SSE for the R4 proposal are project policies.
They are not dictated by IEEE merely because the format and rounding mapping
are now inspected. The exact rational alpha policy remains necessary: the
binary64 encoding of decimal 0.05 is not the rational number 1/20.

## Author check scope

The author read the relevant extracted clauses and visually inspected PDF page
28 (printed page 27). The reproducible `author_checks.py` check of the pinned Holm module compared
six encodings against the clause-derived formula, checked the explicit negative
zero refusal and the 0.05 distinction. These checks found no conflict. Run it from the repository root after fetching the fixed Holm commit;
`AUTHOR-CHECKS.json` records its result. These checks do
not replace the independently written checks accompanying the source report or
the already-recorded 9499 implementation checks; no broad rerun was needed for
unchanged code.

## Next bounded action

Return to PR #293's adversarial design review, using this packet as the IEEE
source supplement. Assess complete-output and refusal choices on their own
merits; do not treat the source result as approval of those choices. After small
repair intake, the raw-input complete-output wrapper can proceed as a disposable
experiment. Supported platforms, public-check behavior and promotion still need
their applicable evidence and decisions. No merge, release, formal adoption or
public interface freeze is performed by this intake.

## Intake identity and validation

Independent report content was preserved in published commit
`bfe7d2307da8f72cd241fd6e7dc423a8e807e112`, tree
`1eaa2296c2fb7a33e6f4caae71a6c74f873c23b2`, with sole parent
`da1c53dfd70f02169014f5d882aa51aec960a019`. This author intake is a
separate child change. The four independent-review files remain unchanged.

The assembled packet passed Markdown lint (412 files), repository validation
through the Node import loader, and whitespace checks. The independent checks
passed normally and under Python -O with identical committed results.
The author check records six source-derived boundary cases and two policy
distinctions. None of this is a full runtime or statistical conformance suite.
