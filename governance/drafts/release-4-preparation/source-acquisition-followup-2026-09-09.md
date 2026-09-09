# Release 4 source acquisition follow-up

Date: 2026-09-09. Status: author-side discovery and limited page inspection.
This follows PR 240's request to prioritize S5/S1. It is not an independent
primary-source review, a substitution decision or closure of a source hold.

## Immediately usable acquisition candidate

Yongge Tian and George P. H. Styan, **Cochran's statistical theorem revisited**,
Journal of Statistical Planning and Inference 136 (2006), 2659-2667,
DOI `10.1016/j.jspi.2004.09.016`.

The [author upload page](https://www.researchgate.net/publication/265925136_Cochran%27s_statistical_theorem_revisited)
identifies author-provided full text. The
[PDF](https://www.researchgate.net/profile/Yongge-Tian/publication/265925136_Cochran%27s_statistical_theorem_revisited/links/63260eb9873eca0c0094f64e/Cochrans-statistical-theorem-revisited.pdf)
was readable through web retrieval as nine pages. Images of PDF pages 1, 2 and 8
(printed pages 2659, 2660 and 2666) were inspected. They show the classical
statement, a matrix formulation and Theorem 2.4 respectively. This is a different
paper from Cochran (1934). Its original matrix results are a candidate contribution
to the evidence map, not automatic original support for every classical claim
repeated in its introduction. Its applicability to Candidate A and any need for
complementary distributional evidence await independent adjudication.

Direct Python urllib retrieval returned HTTP 403. No complete PDF bytes were
saved, so no raw-PDF byte length or SHA-256 is asserted. Web-extracted text and
page images are inspected representations, not a saved, hashed source packet.
Obtain a permitted downloadable copy for stable investigator handoff.

## Remaining source tasks by priority

| Task                            | Acquisition target or reuse                                                                                                                       | Present limit and next action                                                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S5 first                        | Tian/Styan above; Cochran (1934), DOI `10.1017/S0305004100016595`, volume 30(2), pp. 178-191, as an original candidate                            | Independently determine whether the inspected alternative plus any complementary original evidence covers model assumptions, quadratic-form independence, ranks and the null F ratio; no substitution accepted |
| S1 in parallel                  | Frank Yates, The Design and Analysis of Factorial Experiments (1937), Imperial Bureau of Soil Science, Technical Communication 35                 | Actual monograph remains missing; seek lawful library access, relevant chapter copies or a permitted full copy, including title/edition and contents pages; the Nature review is not the book                  |
| P1 existing-file reconciliation | Dasgupta, Pillai and Rubin, Causal inference from 2^k factorial designs using the potential outcomes model, `arXiv:1211.2481v2`                   | Reuse the originally recorded PDF if available; reconcile the source-version/printed-date discrepancy and inspect ambiguous formulas. A newly fetched PDF does not silently replace the old bytes              |
| S2 after the first packet       | E. J. Williams, The Interpretation of Interactions in Factorial Experiments, Biometrika 39(1-2) (1952), pp. 65-81, DOI `10.1093/biomet/39.1-2.65` | Publisher metadata confirmed, full text not inspected here; obtain it if retained interpretation or attribution depends on it; the source hold is not waived                                                   |
| Accepted supporting pages       | Existing NIST/LAPACK supplied-copy packet                                                                                                         | No reacquisition needed to preserve COMPLETE_ON_PROVIDED_COPIES; this does not close S1/S5                                                                                                                     |

## Access evidence and acquisition route

The [Cochran publisher record](https://doi.org/10.1017/S0305004100016595)
confirms the article identity. A publisher PDF-shaped URL again redirected to
the extract/access page; the original was not obtained. Current purchase
availability was not established. The earlier user report of unsuccessful
purchase remains attributed testimony, not a claim that no copy exists anywhere.
Do not require another exhaustive repeat of that search circuit.

Yates's [catalogue record](https://books.google.com/books?id=YW1OAAAAMAAJ)
was discovered in search; the page open failed. The Rothamsted route was blocked
by robots policy and was not retried. Neither observation is a full-text result.
The existing unverified archive and library leads remain unverified.

The [arXiv record](https://arxiv.org/abs/1211.2481v2) identifies v2 as revised on
16 November 2012; that metadata alone does not resolve the existing PDF's printed
date or formula ambiguity. The [Williams publisher record](https://doi.org/10.1093/biomet/39.1-2.65)
is bibliographic evidence only in this increment.

For unavailable originals, a library holdings/document-delivery inquiry is the
next acquisition route. Japan's National Diet Library describes a
[remote PDF-copy service](https://ndlsearch.ndl.go.jp/help/pdfdownload), subject
to holdings, material eligibility and user registration; electronic journals
are excluded from that particular PDF service. No holding or eligibility for
these exact items has been confirmed. Ask the library to check those facts and
available delivery forms before ordering. No request or purchase was made here.

## Return packet and scientific work

Supply each available file unchanged, with its URL or supplying library, edition,
acquisition date and any missing pages. The receiving investigator can compute
SHA-256 and byte counts; the supplier need not construct an audit bundle manually.
Record PDF, raw HTML and extracted representations distinctly. Keep access to a
copy separate from permission to redistribute it in the public repository.

The independent investigator then executes the claim map's
[completion packet](opening-claim-map.md#primary-source-completion-packet):
map exact passages to the retained claims and independently derive their
Candidate A application, including numerator/residual ranks, null hypotheses,
positive variance and the relationship between sample contrasts and targets.
A theorem about quadratic forms alone is not the whole factorial inference
Contract. Record any missing F-ratio or interval support explicitly.

This work used OpenAI Codex in the existing authoring context. S1-S6/P1,
R4-P1 through P6 and NOT_READY remain unchanged.
