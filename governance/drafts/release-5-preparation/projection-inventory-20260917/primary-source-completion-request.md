# Release 5 primary-source completion request

Purpose: complete a bounded source-access follow-up for the nomue Protocol
Research Gate. The Research Gate is the repository's evidence-review process;
it does not require a ResearchGate account, university affiliation or publication
record from the project steward. This request can be handled by a contracted
researcher with access to the relevant primary literature.

Fixed research input: repository `licklider-ai/nomue-protocol`, commit
`2b8b6a829b4bc25d7cb8bed75d63af602360eaa6`, especially the
[independent research addendum](independent-research-addendum.md) and
[coordination intake](research-intake.md). The addendum's own reviewed target is
`52e39c7a6cda4a2fdee89d0b8b22e068854f4852`. Do not replace those inputs with a
floating branch without recording the change. This request does not commission
implementation, reopen the unchanged opening review or authorize publication.

## Priority 1: two unread primary articles

| Article                                                                                                                                                              | Source identity                                                                                | Exact questions to answer from the full text                                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Donald W. Zimmerman (1997), Teacher's Corner: A Note on Interpretation of the Paired-Samples t Test, Journal of Educational and Behavioral Statistics 22(3), 349–360 | DOI [10.3102/10769986022003349](https://doi.org/10.3102/10769986022003349); JSTOR item 1165289 | Which data-generating assumptions and correlation structures underlie the Type I error/power claims? What distinguishes natural pairing from observed correlation? Which exact conclusions are supported, and which cannot justify declaring pairing or independence from observed values?                                                                             |
| Donald W. Zimmerman (2004), A Note on Preliminary Tests of Equality of Variances, British Journal of Mathematical and Statistical Psychology 57(1), 173–181          | DOI [10.1348/000711004849222](https://doi.org/10.1348/000711004849222)                         | Which preliminary and final tests, sample sizes, distributions and significance levels are examined? What happens to the combined procedure's error rate under those conditions? Does the paper support any universal claim that every outcome-dependent method choice invalidates its nominal error rate? State limits and counterexamples rather than extrapolating. |

For each article, inspect its actual methods, results and limitations. An abstract,
search snippet or another paper citing it does not complete this task. A clear
statement that the paper does not support a previously broad claim is a useful
result; confirmation is not the desired answer by default.

The Protocol does not select or recommend the statistical method. Assess the
consequences only for declaration meanings, scientific non-claims and the narrow
selection-timing convention. Do not turn this task into a search for a universal
best test or a new product selection policy.

## Priority 2: reproducible copies of three already-read sources

The independent investigator inspected decision-bearing full text for these works,
but could not retain stable raw artifacts. First obtain reproducible artifacts;
repeat substantive review only if edition or content differences affect a claim.

| Article                                                                                                                               | Source identity                                                            | Already inspected scope to check against the obtained version                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Lazic (2010), The problem of pseudoreplication in neuroscientific studies                                                             | DOI [10.1186/1471-2202-11-5](https://doi.org/10.1186/1471-2202-11-5)       | Experimental unit, repeated measurements and hierarchical structure                                                              |
| Rasch, Kubinger and Moder (2011), The two-sample t test: pre-testing its assumptions does not pay off, Statistical Papers 52, 219–231 | DOI [10.1007/s00362-009-0224-x](https://doi.org/10.1007/s00362-009-0224-x) | Specific combined procedures, simulation conditions and scoped conclusion; earlier inspection used an author-upload presentation |
| Nosek et al. (2018), The preregistration revolution, PNAS 115(11), 2600–2606                                                          | DOI [10.1073/pnas.1708274114](https://doi.org/10.1073/pnas.1708274114)     | Preregistration, deviations and prior access to existing/related data; distinction from an unproved timing enum                  |

A publisher PDF, a clearly identified author manuscript, or a stable full-text
HTML/XML artifact can serve as the source. Record which version it is; do not
label an author manuscript the publisher version. Preserve the original bytes
rather than only copying text into a document. If the file is supplied to the
coordinator, the coordinator can compute SHA-256; the researcher need not install
hashing tools merely to supply it.

## Return package

1. For each of the five works: title, DOI, edition/version, retrieved URL, access date
   in UTC, filename/media type, and the full-text artifact or a usable archive
   identity. If an artifact is retained, record its byte size and SHA-256. Clearly
   mark any unavailable item.
2. For the two Priority 1 articles: a concise English claim table with the exact
   claim, inspected page/section/table, assumptions, supported scope, limitations
   and effect on the earlier R5 claim. Paraphrase rather than reproduce long passages.
3. For the three Priority 2 works: state whether the obtained version agrees with
   the addendum's bounded content summary. Report material differences with
   pinpoints; acquisition alone is not confirmation of equivalence.
4. Disclose the investigator's role, any prior contribution to the R5 proposal or
   implementation, any assistance used, and which text the investigator personally
   inspected. Distinguish document acquisition from methodological review.
5. Give each source hold its own disposition: sufficient bounded evidence,
   narrower claim required, or unresolved. Explicitly name any effect on the
   proposed declaration mappings or timing non-claims.

Supply source files through the agreed private research channel where permitted.
Do not commit copyrighted full texts to the public repository. Public output is
the bounded review, source identity/hash and pinpoints. No account credentials or
shared login are requested.

The coordinator will reconcile the returned findings, preserve attribution and
submit any remaining research decision. Receiving PDFs alone does not close the
Research Gate, adopt R5 or authorize verifier implementation.

Prepared with OpenAI Codex assistance in the continuing coordinator context.
This is an acquisition and review commission, not a new source inspection.
