# Release 3 Acceptance Preparation and Release 4 Source Follow-up

Status: informative coordinator record, 2026-09-07; not an independent review,
acceptance decision, rule amendment, or merge authorization.

## Role and inputs

The coordinator continues the investigation/repair assistance role. A new session
does not create independence from the work being reviewed. This record was prepared
with OpenAI assistant support and public repository inspection. The user's account
of human responsibility and Claude Fable5.1 assistance is preserved below; this
record does not claim exclusively human authorship or infer past model identities.

The governing main commit is `f39100161cb45de15767bdb19ed54aba9489b41a`.
Root AGENTS, its Read first documents, the acquisition commission, R4 preparation,
the relevant result sections, and the preserved review records govern the boundaries
below. There is no directory-local AGENTS under governance.

The coordinator checked Git objects, current PR metadata and bodies, the supplied
five PDF byte identities, and the six public web records in Section 4. Hashing the
PDFs is not a fresh review of their contents. Prior reviewers' source inspections,
calculations, and validation are attributed to their records, not claimed as newly
performed here. No private repository was accessed.

## 1. Live repository reconciliation

All eight PRs below were open and unmerged at inspection. Every head matched the
handoff. PRs 186, 187, and 188 remained drafts; the R4 PRs were not drafts.

| PR                                                             | Head                                       | Role                               |
| -------------------------------------------------------------- | ------------------------------------------ | ---------------------------------- |
| [186](https://github.com/licklider-ai/nomue-protocol/pull/186) | `9eee0caf6a423d509a996be71df8cff8b4d1e9df` | R3 repaired source result          |
| [187](https://github.com/licklider-ai/nomue-protocol/pull/187) | `f8c17dba9bb2e7cc5e3ebe5a9f837f54af0fdd88` | Limited source review              |
| [188](https://github.com/licklider-ai/nomue-protocol/pull/188) | `a082036b734607c52c1219e9f396cd5bca8aec7b` | Close-only repair review           |
| [179](https://github.com/licklider-ai/nomue-protocol/pull/179) | `f8e212a8c86b83b712933e3ac785d824220eb449` | R4 preparation review              |
| [180](https://github.com/licklider-ai/nomue-protocol/pull/180) | `5bae1f2548a7126c254c51b65b0eda4ae4941343` | Preliminary numerical result       |
| [181](https://github.com/licklider-ai/nomue-protocol/pull/181) | `a2687f10719b399dafb511999cc1ef5b406a0c02` | Semantic result                    |
| [182](https://github.com/licklider-ai/nomue-protocol/pull/182) | `973ae5d2062095989d491ab00450effb16770af5` | Self-review and preparation repair |
| [184](https://github.com/licklider-ai/nomue-protocol/pull/184) | `1d493622af970145925f35c8d2cd95f6cbf03cc7` | R4 exact-head review               |

PRs 186–188 and 184 returned mergeable true. The first metadata responses for
179–182 returned false, but a second metadata request returned true for all four.
Independent `git merge-tree --write-tree --name-only` simulations of each of those
four heads against the main commit above exited 0 with no conflict paths. Therefore
no content conflict is established and no repair, rebase, or merge was performed.
These simulations do not authorize merging and do not test a combined integration.

Recomputed R3 identities:

- Result path: `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`.
- Repaired head sole parent: `37d3ed1626964c20080c26614052e2ce1971d635`;
  tree: `e72cae8b40e0c37924115162f63901b8e72a64a6`.
- Result blob: `47b497d67bcf7e02382c1fe20cd69a8e615c31cf`;
  SHA-256: `444fa1d78f585c21ea26db3e8d7c2dfe39dc0728a4d6a3d996665df060f10680`.
- Result length: 213491 bytes. The previous result blob
  `5465cbcfd00708facac94785d9244b79166cb81e` is an exact 164493-byte prefix.
- PR 187 review blob: `a92da5e6c2ed105e3074f51861c4c08d1b4df66e`;
  sole parent: `37d3ed1626964c20080c26614052e2ce1971d635`.
- PR 188 review blob: `3cd95847ee73cf0a35d0420ff7cb5980115a7964`;
  sole parent: `9eee0caf6a423d509a996be71df8cff8b4d1e9df`.

All five attached artifacts match C.2, including byte lengths; the local duplicate
filename suffix is not a new source version:

| Source number |   Bytes | SHA-256                                                            |
| ------------- | ------: | ------------------------------------------------------------------ |
| 04            |  169653 | `4bfbec2b1099968fee729852c5d6c3a8123ba6e5748e1e9583a81d5c5ebdef27` |
| 09            |  908514 | `bb0bd080601c566697ebb657f81aa6d08cc2a02239a31d4ada7c5a7da2cda701` |
| 10            |  219412 | `df5671bfb92e0ab64354dad5a117be19d7b536c2d0e2a9cc22ead004b1beb9ba` |
| 16            | 1777550 | `d96aea58a5490bb4c6e339e3fc9528affa09c10637003ba9f5533ca0d7a632e8` |
| 19            |  634954 | `4eafd121b98b693aa7fb3386de536a6a4902446cc4f48d8f5c3f2e489615a046` |

## 2. R3 acceptance conditions assessed against the actual rule

[RFC rule 2](../RFC.md#research-gate-for-externally-grounded-semantics) requires an
independent pass and, for statistical/numerical methodology, a separate LLM/model
primary-source review before implementation. Human expert review may supplement it.
Rule 6 expressly does not require a fixed evidence schema. The acquisition
commission additionally requires independent exact-head primary-source review
before treating a source hold or public-opening gate as closed.

The user already explained that humans performed the investigation/repair and each
review, with partial Claude Fable5.1 assistance, and completely separate contexts
for review assistance. PR 186's final clarification records this account and corrects
the coordinator's earlier excessive demand for exact serving-build logs.

| Question                                                             | Assessment from existing evidence                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Human responsibility                                                 | Established as the user's first-hand description of the arrangement        |
| Separate assistance contexts                                         | Established by the user's explanation and preserved reviewer statements    |
| Different human investigators and reviewers                          | Not established; do not infer from the account                             |
| Different assisting models across investigation and review           | Not established by that account; the preserved model-level PENDING remains |
| Exact serving-build logs mandatory                                   | No such required evidence format appears in RFC rules 2 or 6               |
| Human-led review automatically replaces the separate-model condition | Not supported by rule 2's supplementary-human-review wording               |
| This coordinator can issue the missing independent review            | No; the investigation/repair assistance role is continued                  |

The rule's before-implementation timing does not prohibit storing draft research or
review records. It also does not bypass the commission's earlier hold-closure gate.
No universal rule requiring different human employees is introduced here; actual
investigator independence still needs to be stated truthfully for the scoped pass.

Conclusion: retain the textual GO and source-supportable bounded dispositions, but
leave formal acceptance unperformed. The evidence is insufficient to attest the
remaining model distinction; it is not evidence that the scientific review failed.

## 3. Minimal resolution route and ready review handoff

The recommended route is one additional, genuinely independent primary-source pass
using a model whose distinction from the investigation's assisting model(s) can be
stated on an ordinary accountable basis. A reviewer/steward statement naming the
model used, work scope, date, context and non-authorship boundary is a usable evidence
form for adjudication; unavailable internal build telemetry is not a prerequisite.
Do not substitute a different UI, fresh chat, branch name, or generic provider label
for a known model distinction. If the distinction cannot be established, record
that limitation rather than guessing. Existing records can establish it if adequate
information already exists; the user need not repeat the working-arrangement account.

Ready scope for the additional reviewer:

1. Read current AGENTS and its Read first documents, then the acquisition commission
   at `f39100161cb45de15767bdb19ed54aba9489b41a`, blob
   `3c7ddcc696f0c284213f7efe0da68e747bc238d7`. Verify Section 1's exact R3 result and
   both preserved review identities. Do not review a moving branch implicitly.
2. Inspect the same five originals, hashes above. Review C.4–C.6, relevant C.3 rows,
   C.7 calculations and C.4.4/C.10 boundaries. This is a primary-source pass, not
   merely approval of PR 188's prose verdict. No other fourteen supplied PDFs are
   required for this limited scope.
3. Check BY 2001's dependence/family/range assumptions and the p.1182 distinction
   between failed PRDS/MTP2 and an unresolved BH-control question; BKY's exact
   adaptive variant and adjusted-value/output convention; Storey's estimation
   versus testing/output claims; Scheffe's rank assumptions and all nine 1969
   corrections. Preserve the interaction-footnote deletion in any R4 reuse.
4. Reproduce the in-scope C.7 calculations and assess the explicit reopen triggers.
   Use PRs 187/188 as findings to test, not substitutes for originals. Carry the
   optional N-4 extra calculation, N-5 token column, R-N1 cap-at-1 representation
   clarification and R-N2 status-line placement without misreporting completion.
5. Report source support for SR-K and SR-G separately from review independence and
   formal acceptance. SR-K CLOSED means assigned-source completion in the bounded
   C.4.4 scope; it does not resolve arbitrary all-pairs BH control or remove I-03
   for unsupported families. SR-G includes X-1 pp.87–104; no pp.105–110 purchase.
6. Preserve all old result/review blobs. Add one English result at
   `review-inputs/r3-srk-srg-additional-primary-pass/REVIEW-RESULT.md`, on a new
   neutral branch starting at `9eee0caf6a423d509a996be71df8cff8b4d1e9df`.
   If that destination already exists, inspect it and choose an unused successor.
   Run format, Markdown lint, direct validator and diff check; record actual
   outcomes. Open a draft PR, without merging or closing holds.

This is a prepared handoff, not a statement that a reviewer has been assigned or
that the pass has run. After eligible review, the steward separately records the
bounded acceptance and any merge decision. If a human-review substitution is
preferred instead, the actual change would be to RFC rule 2's compulsory
separate-model condition, with explicit treatment of affected commissions. That
requires its own governance proposal and decision; this record neither proposes
new binding wording nor applies a retroactive waiver. Additional scoped review
avoids changing the rule for this case.

The candidate count remains three CLOSED (SR-L inherited, SR-K/SR-G awaiting
acceptance), eleven INPUT_INCOMPLETE, overall INPUT_INCOMPLETE and semantic NARROW.
The twelve dispositions outside the limited review include the inherited SR-L;
they are not twelve unfinished holds. No full-inventory content approval follows.

## 4. R4 public-source follow-up completed in this session

This is author-side source inspection to assist the outstanding work in PR 184
Section 5.4, not a replacement independent review. Public rendered page text was
read on 2026-09-07. The following findings are limited to the stated locations.
No raw HTML archive hash, immutable web revision, source PDF inspection or numerical
certificate is claimed. Source URLs remain retrieval locators, not content hashes.

| Source and pinpoint                                                                                                                         | Direct observation                                                                                                                                                        | Effect on the outstanding work                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [NIST 5.6.1.5](https://itl.nist.gov/div898/handbook/pri/section6/pri615.htm), full-model and effects paragraphs                             | The worked three-factor model contains product terms and permits least-squares analysis. Its saturated example has no residual degrees of freedom for significance tests. | Supports the bounded model/product-term statement in PR 180; not a source-complete replicated two-factor F-test basis.                 |
| [NIST 1.3.6.6.5](https://www.itl.nist.gov/div898/handbook/eda/section3/eda3665.htm), CDF and percent-point sections                         | CDF is expressed as one minus a regularized incomplete beta at the complementary ratio; percent points are computed numerically.                                          | Supports PR 180's identity/quantile description, without a rounding-error certificate.                                                 |
| [DLMF 8.17](https://dlmf.nist.gov/8.17), equations 1–4, 7, 22–23                                                                            | Integral, normalization, symmetry, hypergeometric representation and continued-fraction coefficients are present under the stated parameter conditions.                   | Supports the cited identities. A convergence formula alone does not select an iteration cap, tolerance or finite-arithmetic guarantee. |
| [LAPACK DGELS](https://netlib.org/lapack/explore-html/d8/d83/group__gels_gaa65298f8ef218a625e40d0da3c95803c.html), Purpose and rank warning | QR/LQ solution assumes full rank; the routine detects exact zero triangular diagonals and warns about accuracy loss near rank deficiency.                                 | Supports the bounded warning; does not define factorial hypotheses or certify a supported numerical domain.                            |
| [Biometrika 39(1–2) contents](https://academic.oup.com/biomet/issue/39/1-2), interaction article entry                                      | Publisher lists E. J. Williams, the interaction title, pp.65–81, May 1952 and DOI `10.1093/biomet/39.1-2.65`.                                                             | Confirms the corrected attribution from a publisher record. Full article content remains uninspected; S2 stays open.                   |
| [arXiv 1211.2481](https://arxiv.org/abs/1211.2481), submission history                                                                      | Lists v1 on 2012-11-11 and v2 on 2012-11-16.                                                                                                                              | Establishes listing dates only. Does not identify the previously hashed PDF bytes or resolve its reported 2018 printed date.           |

The direct Williams article page failed at a publisher redirect; the successful
journal-issue contents page supplied the bibliographic observation, not article
full text. No claim is derived from a search snippet alone. Earlier source-access
failures in PR 184 remain accurate historical observations; the new page access
does not retroactively change that review's verdict.

Remaining exact-source work for an eligible R4 reviewer:

- P1: 330248 bytes, SHA-256
  `8cc5bb404cae91ee5c917e2dbb834ef8a178e69ce53f50d52293ce2126512d6c`;
  inspect its first-page stamp, printed pp.5–9 and 11–17, cited equations/theorems,
  and the p.7 vector transcription; reconcile version metadata without guessing.
- P2/P3 share one NBS SP 503 artifact: 22689184 bytes, SHA-256
  `7fa4e615d2846bfea23c88cf3e788e1692591a7e20497335397bc70070cce3f4`;
  inspect pp.40–45 and 66–70 against the pinned semantic source table.
- Independently inspect the four upstream pages and publisher/version records,
  recording exact retrievable versions and archive identities where available.
  This author's new observations reduce discovery work, not reviewer obligations.

The five R3 PDFs match neither missing R4 artifact. PR 184's source-incomplete
judgments and both programmes' INPUT_INCOMPLETE remain. Candidate B is balanced
a-by-b; Candidate C is unbalanced. PR 182's body already records its own CI run
34029753034, so N-C1 does not need another metadata repair. N-B1's odd-nu guard and
the other optional revisions belong in a successor with fresh changed-blob review;
none was silently folded into a fixed result here.

## 5. Next work independent of incoming papers

The bounded R3 additional-review packet is ready using the five supplied originals.
R4's source-completion reviewer can use the six public locations above while the two
PDF identities remain a separate custody task. Preparation of a guarded exploratory
numerical successor, source-to-entry mapping and later integration can proceed
without promoting PRELIM assessments. No final numerical label precedes the reviewed
semantic handoff. Shaffer remains the missing SR-C source; SRC-28/X-8 bibliographic
identity and the recorded table/formula doubts remain named work, not errata.

## 6. Validation and decision boundary

The five PDF hashes/lengths, R3 result SHA-256, parents, review blobs and Parts A/B
prefix were recomputed in this session. The four R4 merge simulations were read-only
Git object operations. Fresh frozen-lockfile dependency installation completed.
Repository hygiene results for this new Markdown file are recorded in its PR after
execution; no old reviewer validation is attributed to this coordinator.

No authoritative artifact, source result, original review, public-opening state,
method selection, tolerance, implementation, ratification, release or main branch
is changed by this record. PDFs and full-text extraction data are not included.
