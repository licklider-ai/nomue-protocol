# Release 4 Normal-Model Review Response - Independent Repair-Confirmation Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                          | Result                                                                                                                                                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Successor identity                 | **`MATCH`**: successor `438470501f…` has the author delivery `c78d4d27…` as its sole parent; exactly five files under `governance/drafts/release-4-preparation/` differ; every pin in the review response resolves to the object it names (Section 3)  |
| Preservation                       | **`INTACT`**: the author probe, its result JSON, the review handoff, the PR 240 review blob and every artifact outside the five listed files are byte-identical to the author delivery; the PR 246 review blob is unchanged at its commit (Section 3)  |
| S-A (`SHOULD-FIX`)                 | **`CONFIRMED`**: the per-claim evidence map splits paper contribution from derivation contribution exactly as PR 246 Sections 5 and 12 ask; each row was checked against the review's Section 5 passage table and Section 6 reconstruction (Section 5) |
| N-A through N-D (`NICE-TO-HAVE`)   | **`CONFIRMED`** at the successor's exact text; N-A is confirmed against the review's recorded observation, not against the page image, which was not supplied to this session (Section 5)                                                              |
| Other successor prose              | Status lines, README navigation and the opening-scope replacement paragraph describe PR 246 accurately and claim no confirmation, closure or opening (Section 6)                                                                                       |
| Reproduction                       | **`REPRODUCED`**: the unchanged author probe returns 147 checks and parsed JSON identical to the committed result (Section 8)                                                                                                                          |
| Steward evidence/scope disposition | The proposed disposition is consistent with PR 246 Sections 9 and 14 and names the residual evidence gap correctly; it is assessed here for consistency only and is **not decided** by this review (Section 7)                                         |
| Opening decision                   | **`NOT_READY`**, unchanged; no assembled-proposal review has occurred and this record is not one (Section 7)                                                                                                                                           |
| Findings                           | 0 `BLOCKER`, 0 `SHOULD-FIX`, 3 `NICE-TO-HAVE` (Section 9); none changes a value, a derivation step, a scope boundary or a verdict of PR 246                                                                                                            |
| Independence                       | model, provider and work-context independence from the OpenAI Codex author context; same model identifier as the PR 246 reviewer in a different session; not human-investigator independence (Section 2)                                               |

`CONFIRMED` here means only that the author's prose responses to PR 246's five
findings say what the findings asked for, at the successor's exact text, and
that nothing else in the reviewed input changed. It is not merge approval,
S5 closure, method adoption, identifier allocation, an RFC window or a Release 3
change. It does not re-adjudicate PR 246's source or derivation verdicts.

## 2. Independence, roles and boundary

- **Commission.** `governance/drafts/release-4-preparation/normal-model-review-response.md`
  at successor commit `438470501fe39d8f186e06fa3a52eb96adfb3213` (blob
  `a9a8712864e93eea82dc623188e54ea0486b6ac2`), whose "Confirmation instructions"
  section asks a confirmer to read PR 246 Sections 5, 9 and 12 at the pinned review
  commit, inspect the successor's evidence map and responses, confirm S-A and N-A
  through N-D, verify the probe, result and handoff are byte-identical to the author
  delivery, and keep repair confirmation, steward disposition and the eventual
  opening decision distinct. The user supplied the file link in the task message.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in Claude Code remote session
  `session_01E3jMjQqiHqHwJm2bKgyZ22` (container CLI 2.1.266, `anthropic_cloud`
  environment). The session service reported both `session_context.model` and
  `external_metadata.last_served_model` as `claude-fable-5-1`. Exact model-build
  identity beyond that identifier is not available as authenticated runtime metadata.
- **Author.** The reviewed increment records OpenAI Codex assistance in the existing
  author context. This session shares no context with that authoring session and did
  not consult any intermediate author material.
- **Relation to PR 246.** The PR 246 review was produced by the same model identifier
  in a different session (`session_016nuoZmpjBu2Hzo7R1PUtPx`). This review checks the
  author's responses against that review's recorded text. It does not re-derive the
  bounded proposition, does not re-inspect the paper and does not re-adjudicate the
  bounded source GO, the derivation GO or the staging assessment.
- **Prior involvement.** None. This session had not read, reviewed or authored any part
  of the input, the handoff, the delivery, the review or the successor before this task.
- **Assistance.** No other model, service or person contributed. Code executed: the
  repository's own validation tooling; the author probe unchanged; `git` object
  inspection; a four-line Python comparison of parsed JSON. No PDF was available or
  opened. No network resource other than the repository remote and the GitHub API
  for PR 246 metadata was reached.
- **Not performed.** No source acquisition, merge, RFC action, identifier allocation,
  Release 3 change, hold closure, steward decision or opening decision.

## 3. Exact identity and preservation

All objects were verified with `git rev-parse`, `git diff`, `git diff --check` and
`git cat-file` against objects fetched into the session clone on 2026-09-09.

| Object                                               | Expected (review response)                              | Observed                                                   |
| ---------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| Author delivery                                      | `c78d4d27163ccc61…`                                     | match; tree `7b73295cd73667…`                              |
| Successor (reviewed here)                            | commit named by the task link                           | `438470501fe39d8f…`, tree `ed458f0a383ba5cd…`              |
| Sole parent of the successor                         | not stated                                              | `c78d4d27163ccc61…` (the author delivery)                  |
| Branch locator                                       | not stated                                              | `research/r4-normal-model-source` (PR 243 head)            |
| Independent review commit                            | `4013118bdd253a04…`                                     | match; PR 246 head, base `research/r4-normal-model-source` |
| Review file                                          | `review-inputs/r4-normal-model-source/REVIEW-RESULT.md` | present at `4013118b…`                                     |
| Review blob                                          | `9efcc51a4978b3b5…`                                     | match; SHA-256 of content `7414ec57dc81c299…`              |
| Review verdict                                       | bounded GO; 0/1/4 findings; NOT_READY                   | match (review Sections 1, 12, 14)                          |
| Review handoff blob at delivery and successor        | not stated                                              | `5c7c42a9da62147d…` both; unchanged                        |
| `probes/normal-model-projection.py` at both          | byte-identical                                          | `b6b664c85a66fc4e…` both; unchanged                        |
| `probes/normal-model-projection-result.json` at both | byte-identical                                          | `53658f4640e4bbbe…` both; unchanged                        |
| PR 240 review blob at both                           | not stated                                              | `13fb1e0fb63c96cd…` both; unchanged                        |
| `README.md`                                          | modified                                                | `7ff4133b…` to `eee487ec…` (+3 lines)                      |
| `normal-model-opening-scope.md`                      | modified                                                | `e59c35ff…` to `4d38515d…` (+11/-4)                        |
| `normal-model-source-result.md`                      | modified                                                | `de33be2f…` to `1ed68c2e…` (+36/-6)                        |
| `opening-claim-map.md`                               | modified                                                | `cb53d258…` to `e084f3e0…` (+1/-1)                         |
| `normal-model-review-response.md`                    | added                                                   | `a9a87128…` (79 lines)                                     |

- `git diff --name-only c78d4d2 4384705` lists exactly the five paths above. No
  probe, result, review-inputs record, authority, registry, schema, conformance,
  generated or evidence artifact differs.
- `git diff --check c78d4d2 4384705` is clean.
- PR 246 remains open, draft, `mergeable_state` clean, head `4013118b…`, one commit
  adding one file. Its base branch has advanced from `c78d4d27…` to `438470501f…`
  since the review; the review branch itself is unchanged.
- The review response's statement that "no numerical formula, script, transcript or
  scope boundary has changed" is accurate for the code and result artifacts. The
  opening-scope document gained one paragraph and had one paragraph replaced
  (Section 6); neither alters a scope boundary.

## 4. Inputs read

- PR 246 review at `4013118b…`: Sections 1, 5 (including 5.1), 6, 7, 8, 9, 10, 11, 12,
  13 and 14, as the confirmation instructions require plus the sections those cite.
- Successor diff `c78d4d2..4384705` in full, and the full text of
  `normal-model-source-result.md`, `normal-model-opening-scope.md` and
  `normal-model-review-response.md` at the successor.
- The author probe source, in particular its unequal-variance block, for N-B.
- The prior repair-confirmation precedent
  `review-inputs/r4-preparation-repair/REVIEW-RESULT.md` for record shape only.

## 5. Finding confirmations

| Finding | Location at successor                                                                      | Confirmation                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-A     | `normal-model-source-result.md`, "What the paper supplies, and what is derived here"       | **`CONFIRMED`**. A lead sentence states that the paper proves none of the probability facts used, that the page 2663 criteria are cited as well known, and that Theorem 2.4 reuses them without degrees of freedom, noncentrality or a ratio law. A five-row table maps each retained claim to a paper column and a derivation column. Row-by-row check in 5.1 below                                                      |
| N-A     | same file, paragraph after the retained notation issue                                     | **`CONFIRMED`** against the review's Section 5.1 text: `D` of (1.1) with `p x n` diagonal blocks versus `P_m M Q_m` with `n x n` blocks, dimensional incompatibility for `n != p`, and the equation's own final line using `D_m`. Recorded as a bounded reading; the source is not edited and (2.10) is not relied on. This session could not inspect the page image; agreement is with the review's recorded observation |
| N-B     | same file, "Verification and independence"                                                 | **`CONFIRMED`**. The probe's `sigma` is `diag(2, 1, ..., 1)`, hence invertible, so `P_A Sigma PE != 0` holds iff `Sigma P_A Sigma PE Sigma != 0`, which is the paper's independence criterion in its stated form. The successor says exactly this. The probe blob is unchanged (Section 3), so the option of testing the paper's form directly was not taken; the review offered either                                   |
| N-C     | `normal-model-opening-scope.md`, "Treatment of existing source and comparison obligations" | **`CONFIRMED`**. The added paragraph says independent numerical oracles for balanced Candidate A fixture expectations remain an AGENTS.md implementation obligation and that staging the unbalanced S6 comparison does not postpone or waive them. This is what the review asked for so that staging cannot later be read as a waiver                                                                                     |
| N-D     | `opening-claim-map.md`, source-traceability paragraph                                      | **`CONFIRMED`**. "…needs its own traceability; two independent retrievals…" now begins the clause in lower case. One-character change, nothing else on the line                                                                                                                                                                                                                                                           |

### 5.1 Evidence map rows against PR 246

| Successor row                                 | Paper column, checked against review Section 5                                                                                 | Derivation column, checked against review Section 6                                                                      | Result  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| Chi-square criterion for the projected errors | p. 2663 cites `Sigma A Sigma A Sigma = Sigma A Sigma` as well known; with `Sigma = I` this is `A^2 = A`, idempotence. Accurate | Item 6, orthogonal change of variables and coordinate factorization. Accurate                                            | matches |
| Degrees of freedom one and nu                 | Review: Theorem 2.4 "states no degrees of freedom". Accurate                                                                   | Items 3 and 6, four-column geometry and `rank(PE) = 4(n-1)`. Accurate                                                    | matches |
| Numerator/residual independence               | p. 2663 cites `Sigma A Sigma B Sigma = 0` as well known; Theorem 2.4 reuses it. Accurate                                       | Item 6, disjoint coordinate sums and density factorization for each individual null. Accurate                            | matches |
| Chi-square densities                          | Review: the paper proves none of the distributional facts. Accurate                                                            | Item 8, polar-coordinate route to `Gamma(k/2, 2)`. Accurate                                                              | matches |
| F density, normalization and upper tail       | Review: Theorem 2.4 states "no ratio distribution". Accurate                                                                   | Item 7, gamma-ratio Jacobian and beta-integral normalization; tail as the integral from the observed exact `F`. Accurate | matches |

The closing paragraph after the table attributes the bounded source GO to PR 246 at
its commit and says it is evidence for the steward's S5 disposition, "not a claim
that the cited ancestors were inspected or that a printed primary proof of every
probability step was obtained". This matches the residual gap the review names at
the end of its Section 9 and the review's own non-claims. The map attributes no
probability proof to Tian/Styan, as the response table states.

## 6. Other successor prose

| Change                                                                                         | Assessment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`: one navigation paragraph to the review response                                   | Accurate description ("records PR 246, the evidence-map repair and outstanding steward dispositions"); link target exists                                                                                                                                                                                                                                                                                                                                                                                                               |
| `normal-model-source-result.md`: status line                                                   | Now says the independent review of the original input is recorded in PR 246 and that the prose repairs await confirmation; still says no source hold or public-opening condition is closed. Accurate at the successor                                                                                                                                                                                                                                                                                                                   |
| `normal-model-source-result.md`: commission sentence recast to past tense; PDF sentence recast | Accurate: PR 246 is the investigation the original commission asked for. The recast splices new text onto an existing line (N-R1)                                                                                                                                                                                                                                                                                                                                                                                                       |
| `normal-model-opening-scope.md`: paragraph after the staging request                           | "PR 246 independently supports this scope-specific staging and the bounded derivation, subject to its S-A evidence-map clarification. Steward disposition is still pending." Matches review Sections 9 and 14 and does not claim closure                                                                                                                                                                                                                                                                                                |
| `normal-model-opening-scope.md`: replaced closing paragraph                                    | The removed paragraph said the obstacle was the still-unreviewed source/derivation. The replacement says PR 246 supplies the assessment and confirms the parent repairs, so steps 1 and 2 of the listed sequence "have review evidence"; S-A confirmation and steward disposition pending; steps 3 and 4 incomplete; discussion not opened. Accurate: step 1 (paper, derivation, staging) is review Sections 5-9 and step 2 (PR 240 repairs at the exact input, preserved separately) is review Section 10. Nothing is marked satisfied |
| `normal-model-review-response.md`: "Fixed review and repair input"                             | Every pin verified (Section 3). The statement that the review covers the Tian/Styan attachment and not the later Yates attachments is consistent with the review, which names one attachment only                                                                                                                                                                                                                                                                                                                                       |
| `normal-model-review-response.md`: "Responses" table                                           | Each row matches the corresponding diff hunk. "These are author responses awaiting confirmation, not self-issued CLOSED findings" is the correct role statement                                                                                                                                                                                                                                                                                                                                                                         |
| `normal-model-review-response.md`: "Validation"                                                | Counts (395 Markdown files, 19 generated files) reproduced here (Section 8). The author's pnpm-wrapper EPERM is environment-specific; the wrappers run without error in this container, and both routes execute the same programs                                                                                                                                                                                                                                                                                                       |

## 7. Three distinct dispositions

The confirmation instructions ask that repair confirmation, steward evidence/scope
disposition and the eventual opening decision be kept apart. They are, as follows.

1. **Repair confirmation** (this review's act). S-A and N-A through N-D are
   `CONFIRMED` at successor `438470501f…`. This confirms prose responses only. It
   does not alter PR 246's verdict table and does not add a new independent source
   or derivation judgment.
2. **Steward evidence/scope disposition** (not this review's act). The response's
   "Proposed steward disposition" was checked for consistency with the review:
   - Accepting PR 246's bounded source/derivation assessment for the stated model is
     what review Sections 1 and 14 offer, and the response reproduces its bounds (one
     proposition, three marginal `F(1, nu)` statistics, individual nulls with
     nuisance effects unrestricted).
   - The stated evidentiary split (explicit, independently verified derivation plus
     the supplied paper corroborating cited criteria; no printed primary proof of each
     probability step inspected) is the split the review records in Sections 5, 6 and 9. The response correctly presents it as the basis of a decision request rather
     than as closure.
   - Treating S5 as nonblocking for the bounded marginal-F claim, without closing the
     wider calibration/interval programme, and staging S1/S2/P1/S3/S4/S6 where the
     review found no retained-claim dependency, follows review Section 9 item by item.
     S6 is not marked executed and balanced-case oracles remain due (N-C).
   - The review's Section 9 option, that a steward who requires a printed primary
     source for the three elementary facts may name Cochran (1934) and a primary `F`
     treatment, remains available and is not foreclosed by the response.
   - Whether to accept is the steward's decision. This review records consistency,
     not acceptance.
3. **Assembled-proposal opening decision** (not reached). R4-P5 clause, identifier,
   enclosing-surface and highest-affected-tier work, the pinned R3 comparison repeat
   and the R4-P6 assembled-proposal review remain undone, as the response says. No
   discussion timestamp, duration or runtime is issued. `NOT_READY` is unchanged.

The later Yates copies mentioned in the response are not present in any commit read
here and were not supplied to this session. Their existence, identity and content are
therefore unverified by this review; the response's own position, that they await a
separately traceable investigation and do not expand PR 246's input, is the correct
one for material outside the fixed input (N-R3).

## 8. Reproduction and validation record

Environment: Node v22.22.2, pnpm 11.7.0, `pnpm install --frozen-lockfile`;
Python 3.11.15, standard library only.

| Check                                               | Successor `438470501f…` (tree `ed458f0a…`)                                                                  |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                                 | pass                                                                                                        |
| `pnpm lint:markdown`                                | pass (395 files, 0 issues)                                                                                  |
| `pnpm typecheck`                                    | pass                                                                                                        |
| `pnpm validate`                                     | pass                                                                                                        |
| `pnpm check:generated`                              | pass (19 generated files match)                                                                             |
| `node --import tsx tooling/src/validate.ts`         | pass (same program as the wrapper)                                                                          |
| `node --import tsx tooling/src/generate.ts --check` | pass                                                                                                        |
| `git diff --check c78d4d2..4384705`                 | clean                                                                                                       |
| Author probe rerun                                  | exit 0; `checks` 49 + 49 + 49 = 147; parsed JSON equal to the committed result                              |
| Aggregate `pnpm check`                              | not run; no authoritative, registry, schema, conformance, reference, generated or evidence artifact changed |

After adding this record the same five repository checks were re-run on the review
branch; the result is stated in the commit that adds this file and in its pull
request, if one is opened.

## 9. Findings

### BLOCKER

None.

### SHOULD-FIX

None.

### N-R1 (`NICE-TO-HAVE`) - restore the wrap width on two spliced lines

`normal-model-source-result.md`: the S-A recast produced one 129-character line
("claimed as factorial formulas printed in Tian/Styan. The original commission asked
the independent investigator to decide whether") and one 93-character line in the
"Verification and independence" section, in a file otherwise wrapped near 80
columns. No lint rule fires (`MD013` is off; Prettier preserves prose wrapping).
Cosmetic only.

### N-R2 (`NICE-TO-HAVE`) - date-qualify the pending-confirmation status lines

The status line of `normal-model-source-result.md` and the closing paragraph of
`normal-model-opening-scope.md` say the prose repairs "await confirmation". Once
this record is accepted those sentences become stale without a date or commit
anchor. A "as of `438470501f…`" qualifier, or a pointer to the confirmation record,
would keep them accurate without a further edit cycle. No change of substance.

### N-R3 (`NICE-TO-HAVE`) - pin the received Yates copies before any use

The response refers to "later Yates copies" received after the review. No receipt
record (bytes, SHA-256, page range, identity line, custody statement) exists in the
tree, unlike the Tian/Styan table in the source result. Recording that identity at
receipt, in the same tabular form, would give the separate S1 investigation a fixed
input from the start. The response already states that these copies do not expand
PR 246's input; this finding asks only that their identity be pinned when they enter
the repository record.

## 10. Bounded verdict

| Item                                            | Disposition                                                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Successor `438470501f…`                         | Identity **`MATCH`**; preservation **`INTACT`**; five prose files changed, nothing else                                                          |
| Probe, result, handoff, PR 240 and PR 246 blobs | Byte-identical to their sources                                                                                                                  |
| S-A                                             | **`CONFIRMED`**: per-claim evidence map present and accurate against PR 246 Sections 5 and 6                                                     |
| N-A, N-B, N-C, N-D                              | **`CONFIRMED`** at the successor's exact text; N-A against the review's recorded observation                                                     |
| Other successor prose                           | Accurate; no confirmation, closure or opening claimed                                                                                            |
| Reproduction                                    | 147/147 author checks; parsed result identical                                                                                                   |
| Proposed steward disposition                    | Consistent with PR 246 Sections 9 and 14; steward decision required; not granted here                                                            |
| S1-S6, P1, R4-P1 through R4-P6                  | Unchanged by this review; nothing closed                                                                                                         |
| Public opening                                  | **`NOT_READY`**; no R4-P6 opening GO; this record is not an assembled-proposal review                                                            |
| Next items                                      | Steward S5/staging disposition on the confirmed evidence map; R4-P5 clause/ID/surface/tier completion; pinned R3 comparison repeat; R4-P6 review |

Files created by this review: `review-inputs/r4-normal-model-source-repair/REVIEW-RESULT.md`
only. The reviewed documents and all other artifacts are unchanged.

RELEASE 4 NORMAL-MODEL REVIEW RESPONSE CONFIRMATION COMPLETE - SUCCESSOR MATCH - PRESERVATION INTACT - S-A CONFIRMED - N-A THROUGH N-D CONFIRMED - 147 CHECKS REPRODUCED - STEWARD DISPOSITION NOT GRANTED - NO HOLD CLOSED - NOT READY TO OPEN - MODEL-LEVEL INDEPENDENCE ONLY - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
