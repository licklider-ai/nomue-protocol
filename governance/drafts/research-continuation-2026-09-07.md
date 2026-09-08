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

## 7. User collection update, 2026-09-07

After this record's first commit, the user reported collection of exactly these
supplier numbers: 09, 10, 01, 02, 03, 04, 05, 31, 06, 07, 08, 11, 12, 13, 14, 15,
16, 17, 18, 19. In sorted order this is 01–19 and 31: twenty collected items.
All other items remain in the user's collection workflow.

This adds supplier number 08 to the reported inventory. Its file, bibliographic
identity, bytes and SHA-256 have not been supplied to this continuation session;
no mapping to a Protocol source ID, substantive reading or hold disposition is
inferred from its number. The prior nineteen-artifact C.2 intake remains the last
verified received inventory, with 01–03 duplicate bytes from Pass 2. Only five of
those originals are attached in this continuation session. The twenty reported
collected items are not twenty newly received or independently reviewed sources.

Next custody action for 08 is to receive the original and match its bibliography,
byte identity and intended claim before any source-result increment. This is not
a renewed request for the existing five attachments or a reason to suspend R4
exploratory numerical work. No acquisition or review count in Part C is overwritten.

## 8. Additional collection and review return, 2026-09-07

The user subsequently reported collection of 20, 21, 22, 23, 24, 25, 26, 27, 28,
29, 30, 32, 33, 35 and 36. With Section 7 this is 35 distinct reported collected
items: 01–33, 35 and 36. Item 34 has not been reported collected in this numbered
range. These are supplier labels, not Protocol source identifiers. None of the
fifteen new originals was attached to this update. The received and independently
reviewed inventories are unchanged.

The next requested transfer is one archive preserving original filenames for
08, 20–30, 32, 33, 35 and 36 (sixteen PDFs), with an existing number/title list if
available. Do not commission a new bibliography merely to transfer the files.
All sixteen need custody and bibliographic matching before source-to-hold priority
can be determined; a number alone does not establish that the file is Shaffer,
Keuls or any other named source. Previously supplied five closure-candidate PDFs
do not need retransmission. Retain missing source requirements until the actual
bibliographies and contents are matched; reported collection alone closes no hold.

### Returned review identities and content dispositions

Both draft PRs were retrieved from GitHub, remained open and unmerged, and had the
following identities. Parent, tree, result blob and sole changed path were also
recomputed from fetched Git objects and matched:

| Review                                                               | Commit                                     | Sole parent                                | Tree                                       | Result blob                                |
| -------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| [R3 PR 192](https://github.com/licklider-ai/nomue-protocol/pull/192) | `54fb11a7f1e909a0c7135563885d235987358382` | `9eee0caf6a423d509a996be71df8cff8b4d1e9df` | `25ec65fd42e5795fe7290a4dce2cdb2a9f33ba65` | `67546234a5f30c0225f462a514e5a89a05a272a7` |
| [R4 PR 191](https://github.com/licklider-ai/nomue-protocol/pull/191) | `2e3698ba32c0dae6dcd07ab8c71272d990fbaf49` | `5962cc2def5b1aca7e30d219f12a9a6486ca7b11` | `554b3e493f6ba2e5c6bdd500f03a68fc03d9e289` | `8cf64bbe35e4c9f9537dc134f8334f6e5c44178f` |

The sole new paths are respectively
`review-inputs/r3-srk-srg-additional-primary-pass/REVIEW-RESULT.md` and
`review-inputs/r4-numerical-degree-guard/REVIEW-RESULT.md`.

PR 192 records content GO for the two R3 candidates, zero BLOCKER and SHOULD-FIX,
and three new optional findings: distinguish the illustrative Storey inputs from
printed data, add the preceding BY p.1182 two-sided-scope sentence, and record the
BKY Example 2 level. The reviewer reports an independent Example 2 calculation;
this is newly available reviewer evidence, not a new calculation by this coordinator.
The prior N-4 partial and N-5 deferred author-result states, R-N1 and R-N2 remain
explicit. No optional repair justifies moving the fixed source result now.

PR 191 records delta GO and N-B1 CLOSED on content, zero BLOCKER and SHOULD-FIX.
Its fifty additional invalid calls, optimized-interpreter rejection, mutations and
mpmath checks are reviewer-reported observations, not rerun by the coordinator in
this intake. G-N1 (integer-subclass discrimination) and G-N2 (interpreter-version
line) are optional. Any later changed script/result still receives review at its
new exact head; an optional finding does not silently waive that boundary.

### Reconciliation of assistance provenance

The returned reviews frame the OpenAI/GPT assistance record and the user's Claude
assistance account as alternative explanations. They need not be mutually exclusive:
partial assistance in human-led work can include more than one assistant. Neither
the user's account nor the coordinator record establishes exclusivity. Preserve
both rather than selecting one and erasing the other.

For the exact R4 successor delta `5bae1f25…` to `5962cc2d…`, this coordinator has
first-hand execution history in the current conversation: the guard, added corpus,
prose and transcript were prepared and validated through this OpenAI assistant
session, then the tested blob `200296de…` was saved to GitHub. This is an ordinary
accountable author-side provenance statement, not an inferred serving-build ID.
PR 191 separately records reviewer-session testimony identifying
`claude-fable-5-1`, together with non-involvement and context separation. Those
records support a distinct-model comparison for this specific repair delta. The
older R3 user clarification does not negate the later, specifically observed R4
work. This scoped comparison does not establish the provenance or completeness of
all earlier R4 research and does not resolve PR 184's source-access limitations.

For R3, C.10 and the preceding coordinator record identify GPT/OpenAI assistance,
while the user's account identifies human responsibility and partial Claude
assistance. Both are retained as a mixed assistance history. PR 192 supplies the
reviewer-side model and non-involvement testimony. The coordinator cannot reconstruct
an exclusive author-side model history for all in-scope R3 source judgments from
this continuation session. Whether the documented combination satisfies the
existing requirement for the bounded source intake remains a steward adjudication;
this note does not interpret the rule as requiring disjoint sets of every tool used,
or as automatically satisfied by a provider name.

No new exact-build logs or repetition of the user's working-arrangement explanation
is requested. No further identical review is automatically commissioned merely
because the prior record says PENDING. The next action is to assess this scoped
provenance reconciliation alongside the returned reviews and record the separate
acceptance decision. The preserved PR 191/192 reports remain byte-for-byte intact,
including their historical model-level PENDING. This note supplies later evidence
and analysis; it does not rewrite reviewer testimony or issue formal acceptance.

R3 source support remains bounded to SR-K/SR-G; I-03 and the all-pairs limitation
remain. All research-programme, source-access, public-opening and adoption boundaries
remain as previously recorded. No merge, hold closure, rule amendment, waiver or
release was performed.

## 9. Actual receipt of the sixteen pending transfers

The user supplied James (08) as a PDF and fifteen PDFs (20–30, 32, 33, 35 and 36)
in an archive. [PR 193](https://github.com/licklider-ai/nomue-protocol/pull/193)
records their individual hashes, lengths, page counts, bibliographic matches and
bounded initial findings in acquisition-result Part D. Its fixed head is
`6f0679629a8b37ea98bc3c4fc661a5c5e923fed6`, sole parent
`9eee0caf6a423d509a996be71df8cff8b4d1e9df`, result blob
`06b98ef96abcd9ed13f8ed94644f90017465dad0`. The original 213491-byte result is
preserved as a prefix. PR 186 and its reviewed head remain unchanged.

This supersedes Sections 7/8's unreceived statements for custody. C.2's nineteen
received artifacts plus the sixteen new distinct artifacts give 35 supplier items:
01–33, 35 and 36. The three Pass 2 copies remain duplicates of earlier evidence.
This does not assert fresh inspection of all thirty-five originals. Archive CRC,
new PDF hashes and lengths, prefix preservation, formatting, Markdown lint and
direct repository validation passed; API retrieval matched the tested blob.

Shaffer is now received, completing custody of the six assigned SR-C texts. The
new increment is explicit about limited reading scope; complete synthesis and
independent six-source review remain. SR-B and SR-H investigations can also proceed.
No new hold disposition or formal acceptance is issued. The provenance adjudication
in Section 8 and the two separate R4 PDF gaps remain. No further transfer of these
sixteen originals is needed for the current author-side workspace.

## 10. Completed six-source review and proposed steward decisions

Status: proposed decisions, NOT APPROVED or executed. The user returned PR 195's
result; return of a review is not itself steward adjudication.

### Verified record and scope

PR 195 remains draft, open and unmerged. Fetched Git objects confirm commit
`c36318971244c26073078b848ab2f3c52f46010b`, sole parent
`eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4`, tree
`e860cda8cc3637384e8fe798f8878045e06c2eb1`, review blob
`8e2c0299d9ddc8da6bc165bb5317e8d6262ecf74`, and the sole new path
`review-inputs/r3-src-primary-completion/REVIEW-RESULT.md`.
PR 193 still points to that reviewed result head, blob
`6ce3fbaa88ece237c27091a355e6f920ca175179`.

PR 194's historical SOURCE_ACCESS_INCOMPLETE remains preserved. PR 195 supplies
the missing primary-source GO for suppliers 11, 12, 13, 14, 18 and 22 only,
with zero BLOCKER/SHOULD-FIX. Its polynomial integration, table comparisons,
original checks and validation are reviewer-reported work, not rerun in this intake.
The result's PARTIAL remains accurate pending the separate Rom decision.

Two administrative qualifications to PR 195 are recorded without rewriting it:

- Its references to the "ten other Part D papers" are arithmetically incorrect.
  Part D contains sixteen suppliers, and only 22 overlaps the six-source review.
  The fifteen Part D originals outside this pass are 08, 20, 21, 23, 24, 25,
  26, 27, 28, 29, 30, 32, 33, 35 and 36. The other five reviewed originals
  were received in Part C. The review approves neither these fifteen nor all
  thirty-five collected items. N-D4 remains outside scope.
- Section 11 says the reviewer session started after every reviewed commit,
  while its own Section 1 and PR 194 explain that Part F was appended during
  that session. The later re-pinning is documented. This chronology qualification
  does not contradict the reviewer's non-authorship testimony; no inference that
  the reviewer authored Part F follows from the overlap.

### Decision A proposed: bounded Rom conflict adjudication

The steward would retain Rom p.664 Table 1's alpha=.01, row-10 MH value
1.01 x 10^-3 as a conflicting printed value, alongside the recorded equation (2)
result 0.001004472598983613... . For the bounded PVL-10 source characterization,
the evidentiary basis would be equation (2) and the described procedure, as
supported by PR 195 Section 10. Table 1 would not be adopted as numerical
authority. Any future constants would require separately reviewed computation
and applicable numerical gates. This would neither declare a publisher erratum,
edit the original, approve a numerical constant, nor select the Rom method.

If approved, this resolves the named conflict's treatment for preparing a bounded
SR-C CLOSED source-result proposal. It is not a final hold closure. A subsequent
changed proposal is pinned and reviewed as required by the commission.

### Decision B proposed: accept scoped independence evidence

For the current six-source recheck and Parts D–F synthesis, the steward would rely
on the coordinator's first-hand authoring/execution account of this OpenAI assistant
session (including Part F's original rechecks and output derivations), together
with PR 195's reviewer testimony identifying claude-fable-5-1, separate context,
actual primary-source inspection and non-participation in authoring.

These are ordinary accountable evidence, sufficient to support a distinct-model
independent primary-source pass for this scoped work under RFC rule 2. Rule 6 does
not demand verification from Git or an exact-build-log evidence format. The
recommended determination is ESTABLISHED for this scoped pass, not an assertion
that the entire historical authoring toolset was exclusive or independently
reconstructed. Earlier human responsibility and partial-Claude accounts remain;
PR 192's older SR-K/SR-G acceptance question is not automatically decided here.
PR 194/195's historical PENDING remains unchanged as reviewer testimony, followed
by a separate dated steward determination if approved.

This proposal does not require another identical review just to reproduce model
evidence already stated. It also does not waive any unmet content or acceptance gate.

### Follow-up and retained findings

Carry N-P1 (printed free-association assumption), N-P2 (positive orthant dependence
terminology), N-P3 (Shaffer Section 4.1 printed index versus interpretation),
N-P4 (ordering pinpoint), N-D1 and N-F1 to a future increment; N-D2/N-D3 were
answered by review. N-P3 remains a source-notation issue to resolve before any
Section 4.1 implementation, not a newly adopted formula or formal erratum.
None calls for moving the reviewed head solely for optional wording.

Pending steward approval of A/B, retain SR-C PARTIAL, three CLOSED/one PARTIAL/
ten INPUT_INCOMPLETE and overall INPUT_INCOMPLETE. If approved, prepare the
limited successor proposal while preserving the reviewed head, then obtain the
required review of that change. No merge, formal hold closure, public discussion,
method adoption, rule amendment, ratification or release is included in A/B.
SR-B and SR-H research can continue using already received originals; the R4
source gaps remain independent.

## 11. Steward approval of decisions A and B

The user explicitly approved both Section 10 decisions in this conversation with
an explicit approval of both proposals. The coordinator records
that approval here; the approving role is the user/steward, not this assistant.
Sections 10's NOT APPROVED status and conditional wording are historical proposal
state, superseded for A/B by this record.

- **Decision A: APPROVED.** Retain the Rom printed conflict; ground the bounded
  PVL-10 source characterization in equation (2) and the procedure; do not adopt
  Table 1 as numerical authority; require separately reviewed future constants.
  This is a source-conflict scope adjudication, not correction of the original,
  selection of the method, or approval of a numerical constant.
- **Decision B: APPROVED.** Accept the first-hand OpenAI author-side account for
  the current six-source recheck/Parts D–F, together with PR 195's Claude
  reviewer model, primary-source and non-involvement testimony. The scoped
  independent-model criterion is ESTABLISHED on that stated evidentiary basis.
  Historical PENDING remains in the original review records. This decision does
  not retrospectively settle PR 192's separate SR-K/SR-G acceptance history.

Authorized next work is the limited SR-C CLOSED source-result proposal and its
required review at a new exact identity. Final hold closure, merge, public
discussion, method adoption, ratification and release remain outside this approval.
The reviewed result at eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4 and PR 195's
review remain unchanged.

## 12. Part G review intake, language repair and limited SR-C acceptance

Date: 2026-09-07. Following delivery of PR 197, the user/steward stated that
acceptance was appropriate and instructed the coordinator to proceed. This records
that instruction as acceptance of the limited SR-C source-acquisition disposition
reviewed below. The continuing OpenAI-assisted author/coordinator records the
steward decision; it does not issue an independent review.

### Exact evidence and review disposition

- Accepted result: PR 196, commit
  `80ad520cf25e8cdf647f20e7d08d5bb426a85633`, result blob
  `34f01d4e14b0e0feac7ef934f11e886535c90c41`, at
  `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`.
- Independent delta review: PR 197, commit
  `3828b82b0b2e79b7ba05f6eb771288c39d49435b`, sole parent the accepted result
  commit, tree `db25b3158112b6335ba2d73457f56d9f9cc9ae3c`, review blob
  `a3725411d3e6a6f32d98b0a5d798c541e401a3b3`, path
  `review-inputs/r3-src-closure-proposal/REVIEW-RESULT.md`.
- PR 197 reports GO for Part G, no blocker, and S-G1 outside the result diff.
  Its source basis is the attributed six-source primary review in PR 195,
  commit `c36318971244c26073078b848ab2f3c52f46010b`, review blob
  `8e2c0299d9ddc8da6bc165bb5317e8d6262ecf74`. The coordinator verified the
  fetched PR 197 commit, sole parent, tree and review blob; it did not rerun
  the reviewer's source inspection or calculations.

### S-G1 repair and citation treatment

Section 11 now uses an English description of the user's approval instead of
quoting its Japanese wording. This is an explicit successor correction of the
public-language defect in commit `a5d886c56c5c0b9c9e60f19a10d15778dbad7c44`,
blob `3e2919865ca1a40421dcc3586fff2a687a0aacf8`; its approval substance and
attribution are unchanged. The original Git object remains preserved.

Use PR 197 Section 8's permitted history-preserving route: retain Part G's
citation of that original exact commit as the identity of the approval at the
time Part G was authored, and record this language repair separately here.
Do not move the independently reviewed result head merely to replace the
historical citation. Sections 10 (proposals) and 11 (approval) locate the evidence.
S-G1 is repaired on the coordinator side; this is not a rewritten reviewer verdict.
N-G1/N-G2 and the previously carried optional findings remain deferred.

### Decision and limits

**SR-C: ACCEPTED AS CLOSED for the source-acquisition obstacle only**, at the
exact Part G identity above. This acceptance follows the user's current instruction,
Section 11's decisions A/B, PR 195's primary-source GO and PR 197's delta GO.
The previous statements that formal acceptance was pending are historical states,
now superseded for SR-C only by this dated record.

The bounded Rom adjudication remains in force: preserve the conflicting printed
cell, base the PVL-10 characterization on equation (2) and the described procedure,
exclude Table 1 as numerical authority, and require separately reviewed future
constants. C.7/F.3 remain the conflict record. G.2's exclusions, G.3's reopen
conditions, PVL-07 R3-CAND and PVL-06/08/09/10 RES-ONLY are unchanged.
The scoped independence determination is the steward's decision on ordinary
accountable evidence, not verification of author-side models from Git. Historical
PENDING records remain intact.

This records the research hold decision within the existing commission and RFC
process, not a new Protocol authority or a release-gate registry change. The
source-result candidate ledger remains four CLOSED and ten INPUT_INCOMPLETE;
it is not a count of four newly accepted holds. SR-L is inherited; SR-K/SR-G
retain their separate acceptance question. Overall INPUT_INCOMPLETE and the
fixed semantic NARROW remain. None of this approves all thirty-five originals.
No merge, public-discussion opening, method adoption, implementation guarantee,
ratification, release, or website publication is included.

### Next executable source work

Proceed first with SR-B: supplier 20 (Sidak 1967, SRC-13/PVL-02) and supplier 21
(Dunn 1961, SRC-14/PVL-01 attribution). Their existing D.2 custody identities are
reused; D.3 intake is not mistaken for completed content review. The bounded
questions are the exact rectangular-probability assumptions, applicability to
true-null subsets, the Bonferroni attribution, and which adjusted outputs follow
by investigator derivation rather than being printed in these sources. Preserve
the reviewed Parts A–G bytes and obtain an independent review of any new result.
SR-H can follow with the already received originals. R4 source-access findings
remain on their own lane and are not closed by this SR-C acceptance.

## 13. Part H independent review intake and acceptance proposal

Date: 2026-09-08. **Status: author/coordinator follow-up; SR-B acceptance and
Part H independence determination proposed, not yet approved.** The user supplied
PR 199's review result. Receipt of that review is not treated as a new steward
approval. This continuing OpenAI-assisted author records the findings and prepares
the bounded decision below; it is not an independent reviewer.

### Fixed result and review

- Reviewed result: PR 198, commit
  `f6d39534e85920a8331941126a6eb384244e34f1`, sole parent
  `80ad520cf25e8cdf647f20e7d08d5bb426a85633`, result blob
  `b0679cbad8d384158b93ce414f8dfb7f2270ea74`, at
  `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`.
- Review: PR 199, commit `3059f6baca76dc93b5fbf248012f09132f3881f6`,
  sole parent the reviewed result commit, tree
  `a4bdafbd8b215e5fa269bc4789f10ce7a77decc8`, review blob
  `4c8b55bac817be9f25b1b6fa7b82cbb6eb2fc813`, at
  `review-inputs/r3-srb-primary-completion/REVIEW-RESULT.md`.
- Review blob: 64338 bytes; SHA-256
  `c7b294cd3b618d0276caa9fa03d8c6c0906c126d7376a61b6e60677c56f51212`.
  Neutral review branch: `review/r3-srb-primary-completion-20260908`.

The live PRs retain those heads and remain draft/unmerged at this intake. The
coordinator checked the fetched review commit, parent, tree and blob identity.
PR 199 reports content GO, SR-B CLOSED support under H.3, zero BLOCKER, two
SHOULD-FIX and five NICE-TO-HAVE. Its source inspection, independent derivations,
quantile calculations and validation are attributed reviewer work, not rerun here.
PR 199 Section 13 permits both SHOULD-FIX items to be recorded in this continuation
record without moving the reviewed result head. That route is used below.

### S-H1: explicit correction of the equation (7) summary

The author accepts S-H1. Read H.2 B-2's final sentence with this qualification:
Dunn p.54 equation (7) is the **independent sample-means special case**, with
`a_ii = 1/n_i` and `a_ij = 0` for `i != j`, under the stated common-scale model.
It permits unequal sample sizes under those conditions. For known non-zero
covariances, equation (6), with the general variance expression of Section 2,
is the applicable sourced interval form; equation (7) is not that general form.

This corrects the omitted independence condition; it does not weaken the
arbitrary-dependence union-bound argument for valid marginal p values in H.3.
The reviewed original remains unchanged and this explicit addendum accompanies
its use. S-H1 is addressed on the author side by this qualification, not by
rewriting PR 199's findings or claiming another independent GO.

### S-H2: extend the Dunn example conflict record before numerical reuse

The author accepts the need to carry PR 199 Section 6.2's additional observation
alongside H.4's existing p.61 formula versus p.63 header discrepancy. For Dunn's
second factorial design, the reviewer reports the following comparisons at
alpha = .05, with c calculated as `t_nu(1 - .05/(2m))`:

|   m | Printed c, Tables 7/8 | Reviewer c at nu=60 | Reviewer c at nu=24 |
| --: | --------------------: | ------------------: | ------------------: |
| 195 |                  4.31 |               3.887 |               4.284 |
|  75 |                  3.93 |               3.590 |               3.907 |
| 165 |                  4.26 |               3.836 |               4.218 |
|  45 |                  3.71 |               3.426 |               3.703 |

The reviewer interprets the printed c values as consistent with nu=24 rather
than the printed header nu=60, in the context of the source's graphical
interpolation. The numbers above are not exact matches, and this record does not
claim exact reproduction or establish how the original author computed them.
The same design's printed S values 5.92 and 5.78 compare with the reviewer's
nu=60 calculations 5.91 and 5.79. This is additional evidence of an internal
example inconsistency, not an adopted replacement table or a publisher erratum.

The p.61 formula, p.63 headers, all printed c/S values and reviewer calculations
remain distinct evidence. The example remains excluded from PVL-01/02's
source basis. Before R4 or another numerical programme uses it, independently
resolve and adjudicate the intended model, degrees of freedom, calibration and
numerical values. No R4 source-access finding or numerical guarantee is closed.
S-H2's recording requirement is addressed here; the numerical discrepancy itself
remains unresolved. The coordinator has not independently rerun these values.

PR 199 Section 6.1 also reports Sidak Table 1's k=5, nu=5 first-column value
as 3.78 versus a computed 3.789, a further rounding-level discrepancy. Carry that
unadjudicated observation with the existing 2.23/2.24 record; no value from the
table is adopted. Do not present the reviewer's exploratory recomputation as a
Protocol numerical oracle or a complete table certification.

### Optional findings and provenance preservation

Carry N-H1 (positive marginal variances), N-H2 (Dunn conjecture attribution),
N-H3 (the separate Dunnett-Sobel one-sided analogue), and N-H4 (future catalogue
wording) to the next applicable increment. In particular, a future catalogue
revision should carry H.3's explicit condition instead of relying on the old
"independence/orthant" shorthand; the fixed catalogue is not edited here.

N-H5 concerns image coverage. The author's actual H.1 image list remains as
recorded. Do not add p.632 to that historical list merely because PR 199's
reviewer inspected it. This intake performs no new PDF inspection; the independent
review's additional image coverage is attributable to PR 199 only.

The user also reports that the reviewer duplicated its commit onto a
session-specified non-neutral branch. The neutral review branch and exact objects
above are the review locator. No branch is renamed, deleted or rewritten in this
intake; the reported duplicate does not change the review's substantive provenance.

### Prepared steward decision: Part H independence and limited SR-B acceptance

Recommended decision, **PENDING APPROVAL**:

1. Accept the first-hand Part H author-side OpenAI-assistance account together
   with PR 199's separate-context, non-involvement and claude-fable-5-1 testimony
   as sufficient ordinary evidence for the scoped independent-model criterion
   under RFC rule 2. Record ESTABLISHED for this Part H pass on that basis,
   not as model identity proved from Git. No exact-build logs are required.
   This is a new scope-specific determination, not automatic application of the
   earlier SR-C decision and not a claim about all historical authoring tools.
2. Accept SR-B as CLOSED solely for its source-acquisition obstacle at the
   exact PR 198 head, read together with the S-H1 qualification and S-H2 conflict
   addendum here, relying on PR 199's GO and H.3's bounded conditions.

The present record prepares those decisions but does not enact them. Historical
PENDING review statements stay preserved. SR-C's Section 12 acceptance remains
in force; SR-K/SR-G acceptance remains separate. The source-result candidate
ledger stays 5 CLOSED / 0 PARTIAL / 9 INPUT_INCOMPLETE, with overall
INPUT_INCOMPLETE and semantic NARROW. There is no assertion of five formally
accepted holds. The other thirty-three originals are outside PR 199's scope.
No merge, method adoption, public-discussion opening, ratification, release or
website publication is included in the proposed decision.

## 14. Steward approval of Part H independence and limited SR-B acceptance

Date: 2026-09-08. The user/steward explicitly approved both prepared decisions
in Section 13 and instructed the coordinator to proceed. The approved proposal
is preserved at commit `0aee03f50aaf40c333dc2e2821d5b98decc5ee64`, blob
`e752bb9e1d0bb53153015a308827d875665e394a`. This continuing OpenAI-assisted
coordinator records the user's decision; it does not supply an independent review.

1. **Part H scoped model independence: APPROVED / ESTABLISHED.** Rely on the
   first-hand OpenAI author-side account and PR 199's claude-fable-5-1,
   separate-context and non-involvement testimony, as specified in Section 13.
   This is an ordinary-evidence steward determination under RFC rule 2, not
   model identity verified from Git and not a finding about all historical work.
2. **SR-B: ACCEPTED AS CLOSED for the source-acquisition obstacle only.** The
   accepted result is PR 198 at `f6d39534e85920a8331941126a6eb384244e34f1`,
   result blob `b0679cbad8d384158b93ce414f8dfb7f2270ea74`, read together with
   Section 13's explicit S-H1 qualification and S-H2 conflict addendum. The
   independent basis is PR 199 at `3059f6baca76dc93b5fbf248012f09132f3881f6`,
   review blob `4c8b55bac817be9f25b1b6fa7b82cbb6eb2fc813`.

Section 13's proposed/pending approval state is historical and superseded for
these two decisions only. The original result and review heads, their historical
PENDING statements and source statements remain unchanged. H.3's bounded
conditions and H.4's reopen conditions remain in force. S-H1 is addressed by the
independent-means qualification for Dunn equation (7); S-H2's recording requirement
is addressed, while the example's numerical inconsistencies remain unresolved
before any R4 or other numerical reuse. No printed value or replacement is adopted.

SR-C's prior limited acceptance remains in force. SR-K/SR-G acceptance remains
separate. The candidate ledger stays five CLOSED, zero PARTIAL and nine
INPUT_INCOMPLETE; it is not a count of five newly accepted holds. Overall
INPUT_INCOMPLETE, semantic NARROW, the existing R3-CAND classifications and R4's
source-access findings are unchanged. No merge, public-discussion opening,
method adoption, implementation guarantee, ratification, release or website
publication is authorized by this decision.
