# Release 4 RFC Preparation Draft — Independent Editorial and Source Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                | Result                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Editorial verdict        | **`GO`** for the three documents as informative preparation at the exact head only: no unreviewed semantic or numerical result is promoted into an RFC decision (Section 4)                |
| R4-P5 (standalone RFC)   | **`NOT_CLOSED`**: the draft declares, and this review confirms, that the exact artifact and Requirement ID impact inventory needed to fix the affected tier does not yet exist (Section 5) |
| Source access            | **`SOURCE_ACCESS_INCOMPLETE`**: the author's access observations were confirmed as reported; no original was obtained here either (Section 7)                                              |
| Public-opening readiness | **`NOT_READY`**; the draft does not claim otherwise                                                                                                                                        |
| Findings                 | 0 `BLOCKER`, 0 `SHOULD-FIX`, 5 `NICE-TO-HAVE` (Section 9)                                                                                                                                  |
| Independence             | model, provider and work-context independence only (Section 2)                                                                                                                             |

`GO` means only that the draft is a coherent, bounded and accurately labelled preparation record
whose proposals are all marked as awaiting review, whose authority mapping agrees with the
authority manifest and governance documents, and whose source statements match what the author
actually obtained. It does not mean the Release 4 RFC is ready, drafted or opened.

## 2. Independence, roles and boundary

Same reviewer, session and boundary as the companion numerical review at
`review-inputs/r4-public-discussion-preparation/REVIEW-RESULT.md` (an Anthropic model,
`claude-fable-5-1`, in Claude Code remote session `session_013ko6ZfBtBaYEc9kJtVDZRk`; serving
model reported as `claude-fable-5-1`). The draft records OpenAI Codex assistance in the
maintainer's task context; this review did not consult that context. The same maintainer
commissioned both. Independence is at the model, provider and work-context level; it is not
human-investigator independence and no human expert review supplemented this pass. Commit author
metadata carries the session tooling identity. Numerical correctness was reviewed in the
companion PR 218 lane, not here, as the handoff requires.

## 3. Exact identity

| Field                | Value                                                                          | Matches handoff |
| -------------------- | ------------------------------------------------------------------------------ | --------------- |
| Branch resolved once | `research/r4-rfc-preparation-draft`                                            | yes             |
| Head                 | `bf4004694f68018534e01bde2f2a33214accba19`                                     | yes             |
| Sole parent          | `4cf3e12acc77bd38c09d5acd2588ede66ee265b2` (PR 218 input; live head of PR 218) | yes             |
| Tree                 | `e13c1999b136bc80dd98975fe188647a4bfb9201`                                     | —               |
| Delta vs parent      | 3 files added, 249 insertions, 0 deletions                                     | yes             |
| Pull request         | 219, draft, open, base `research/r4-opening-readiness-next`                    | —               |

| File (under `governance/drafts/release-4-preparation/`) | Blob                                       | SHA-256                                                            |
| ------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `rfc-preparation-draft.md`                              | `31236268480de85e858c3a338ad36e6ee09face1` | `ea56399193fb048fa301f9e1a72fac03c038cf9ff1ebfb24f6127a25b2efc07d` |
| `rfc-preparation-review-handoff.md`                     | `5ab4a6b7b9345c948846e580bcfd98f7e48caceb` | `b7886ef44d33fe006c610b777dbc29457aec81f623b3783ec656656217083f5c` |
| `source-followup-2026-09-08.md`                         | `0a6065ae55b817f4771f79b59cc97709e1fcaf1d` | `7e585b0a601832a569f2d2752df14137c5ed861427fec2ec2d32279ecd0a7972` |

The five PR 218 files (`public-discussion-readiness.md`, `public-discussion-review-prompt.md`,
`ss-f-propagation-supplement.md`, `probes/ss-f-propagation.py`,
`probes/ss-f-propagation-result.json`) have identical blob identities at parent and head
(`34db33cd…`, `28ee20ac…`, `2613a182…`, `a3f9a9a4…`, `38bd5d8e…`); their SHA-256 values are
recorded in the companion review. No identity differed from the handoff, so no moving head was
followed. The pinned readiness document and its input table were read at the parent.

## 4. Check 1 — editorial preparation, not promotion

Tested against the research gate in `governance/RFC.md` and the preparation README's
requirement that each research result obtain a separate-context review before it informs an RFC,
not against the draft's own disclaimer.

- Every proposal in the "Decisions to resolve" table is paired with an "Evidence or decision
  still needed" entry; none states a decided estimand, interval, multiplicity procedure,
  algorithm, tolerance, reason code, support domain or Release 3 dependency.
- The "Numerical evidence map" cites the PR 218 probe as exploratory with "independent derivation
  and reproduction" still required, and cites the accepted QR supplement for coefficients with
  "applicability to the final chosen graph and supported domain" still required. Neither is
  treated as closure.
- The staged work stages are labelled "descriptive work stages, not registered Contract names or
  IDs", and the draft states that no probe result becomes a public fixture and that no stage
  authorises partial public support.
- Motivation, non-claims and the exclusion list match the README's Candidate A boundary and the
  semantic result's catalogue; the three-test familywise statement matches the semantic result's
  `A-FAMILY` entry (`INPUT_INCOMPLETE`).
- The draft contains no normative keyword, allocates no identifier, starts no discussion clock,
  and states that the future request is for opening discussion after R4-P1 to R4-P6 are resolved
  or explicitly bounded.

No promotion of unreviewed semantic or numerical results was found.

## 5. Check 2 — authority owners, tiers, migration and the R4-P5 gap

| Draft row                                                    | Manifest / governance check                                                                                               | Result                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Meaning and guarantees → `spec/`                             | `normative-meaning` target assigns `spec/core/*` files; other `spec/` directories exist (`profiles/`, `verification/`, …) | agrees; exact file not named (gap below) |
| Requirement IDs → `registries/requirements.yaml`             | authoritative allocation list per `governance/ID-POLICY.md`; the draft allocates nothing                                  | agrees                                   |
| JSON structure → `schemas/`                                  | `json-structure` target                                                                                                   | agrees                                   |
| Public surfaces → `registries/public-contract-surfaces.yaml` | `public-contract-surfaces` target; schema-version impact rule in `AGENTS.md`                                              | agrees                                   |
| Interpretation bundles                                       | `interpretation-bundles` target; exact-bundle dispatch rule in `AGENTS.md`                                                | agrees                                   |
| Public checks                                                | `public-checks` target; tolerance ownership rule                                                                          | agrees                                   |
| Reason codes                                                 | `reason-codes` target                                                                                                     | agrees                                   |
| Expected judgments                                           | `conformance-judgment` target; fixtures from independent truth per `AGENTS.md`                                            | agrees                                   |
| Execution → reference implementation                         | class `reference`, no authority                                                                                           | agrees                                   |
| Derived views → `generated/`                                 | class `generated`, regenerate only                                                                                        | agrees                                   |

Stability tier: `EXPERIMENTAL` exists in `registries/stability-tiers.yaml` with its own minimum
discussion window; the draft correctly defers the number to the registry (RFC.md forbids
duplicating it), states that the highest affected tier is set by the requirement impact
assessment, and that CORE process applies if CORE meaning changes. Migration: the draft preserves
historical bundle interpretation and requires explicit versioning for any correction, matching
`AGENTS.md`. Decision requested: stated (opening a bounded proposal for discussion, not adoption).

**What prevents R4-P5 closure.** RFC.md stage 1 requires a draft to list exact artifact changes
and the affected Requirement IDs, existing and new, because the highest affected tier and its
window follow from that list. The draft names artifact classes and owners but not: the exact
`spec/` document(s) that would carry factorial meaning; the existing Requirement IDs that a new
Contract, bundle, public check or reason code would touch (for example those governing bundle
dispatch, check versioning and refusal semantics); the schema-version impact on
`public-contract-surfaces.yaml`; or the interpretation-bundle identity scheme to be used. The
draft says this inventory comes "before opening". That is the correct sequencing, and the gap is
acknowledged, but it means R4-P5 cannot be closed at this head and the tier determination
remains open. No identifier should be guessed to close it.

## 6. Check 3 — no silent selection; no waiver

Candidate scope, staged checks and the Release 3 table were read for undeclared choices:
intervals (undecided, both meaning and level), multiplicity (no implicit family), algorithm and
tolerance (none selected by the probe), reason code (registered only after review), support
domain (a required decision, not a value), Release 3 dependency (conditional, pinned to `main`
`cd217f88…` including the Release 3 preparation README and the 2026-09-06 readiness audit, both
present at that commit). None is selected.

R4-P1 to R4-P6 are kept as recorded; the draft advances R4-P5 preparation only. S1–S6 are not
redefined: the draft preserves the S6 comparison obligation for wider designs and the follow-up
states that no hold is closed. The definition of done for opening discussion is unchanged from
the README's "resolved or explicitly bounded" wording, with the readiness document's correct
qualification that an unsupported scientific claim cannot be bounded away.

## 7. Check 4 — source access claims

| Author statement                                                                                                                                       | Confirmed by this review                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cochran 1934, Cambridge, 30(2), 178–191, DOI `10.1017/S0305004100016595`; extract read; full text not obtained; 2008 online date is not the paper date | bibliographic identity and the 24 October 2008 online date match search-engine metadata; the page itself and the PDF route are blocked from this container (`www.cambridge.org`, `doi.org`, `api.crossref.org`) |
| Yates 1937, Imperial Bureau of Soil Science, Technical Communication 35; search returned the 1938 Nature review, not the monograph                     | identity matches search-engine metadata; Nature 142, 90 (1938) is a review; `www.nature.com` blocked; see acquisition routes below                                                                              |
| Fisher 1925 chapters 5 and 8 via York University transcription; direct page opens failed                                                               | `psychclassics.yorku.ca` blocked from this container; search metadata describes the transcription as the 1925 first edition (Oliver and Boyd), unverified                                                       |
| No bytes saved, no acquisition hash claimed, snippets not used for inferential results                                                                 | consistent with the record; the same discipline is applied here                                                                                                                                                 |

Status: **`SOURCE_ACCESS_INCOMPLETE`**. The editorial verdict in Section 1 is separate from this
incomplete primary-source work and does not depend on it. The completed
`COMPLETE_ON_PROVIDED_COPIES` disposition for the QR supplement's two documentation pages is
preserved and was not reopened.

Acquisition routes located by search but not inspected (each must be verified on retrieval and
none is evidence): Internet Archive item `in.ernet.dli.2015.449111` (Digital Library of India
scan of the Yates monograph, reported 98 pages), HathiTrust catalogue record `002016019`,
Rothamsted Research repository item `98765`, and Google Books record `YW1OAAAAMAAJ`. All four
hosts are blocked here. The follow-up's request for provider, edition, retrieval date, byte
length, SHA-256 and missing pages per file is the right form; adding these routes would make it
actionable (N-1).

The follow-up's claim-to-source questions are well posed: Cochran is treated as a candidate for
part of S5 (distribution and independence of the quadratic forms under normality), with the null
F ratio, residual degrees of freedom and any interval formula still needing their own original
support, and randomisation-based inference kept distinct. This review adds no source-established
fact.

## 8. Check 5 — what may remain a discussion topic

| Question                                                  | Before opening                                                                                                        | During public discussion                     |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Candidate A boundary, estimands, normalisation            | independent review of the semantic catalogue (R4-P1); currently `INPUT_INCOMPLETE`                                    | wording, presentation, additional exclusions |
| Retained F tests as proposed verifiable claims            | S1/S5 original support, or presentation as explicitly unsupported holds                                               | which claims to keep                         |
| Intervals                                                 | nothing, if inclusion stays undecided and no coverage is asserted                                                     | inclusion, meaning, level                    |
| Multiplicity                                              | nothing, if no familywise guarantee is proposed                                                                       | whether a protected family is wanted         |
| Numerical route, tolerance, zero-residual behaviour       | nothing beyond an explicit hold and the R4-P3 feasibility map; the computability decision must be posed as a question | route, tolerance, reason-code semantics      |
| Exact artifact and Requirement ID inventory, tier, window | required (R4-P5, Section 5)                                                                                           | —                                            |
| Release 3 dependency                                      | statement of what is conditional (R4-P4)                                                                              | reconciliation as Release 3 settles          |
| S6 two-system comparison                                  | not required for Candidate A unless the exclusion rationale relies on it; remains a recorded research hold            | —                                            |
| Pre-opening review of the assembled proposal              | required (R4-P6); this review is not it                                                                               | —                                            |

Coherence of this preparation document is not readiness of the full Release 4 RFC.

## 9. Findings

### BLOCKER

None.

### SHOULD-FIX

None.

### N-1 (`NICE-TO-HAVE`)

Add the four discovered Yates acquisition routes (Section 7) to the follow-up's acquisition
request, labelled as unverified search identities.

### N-2 (`NICE-TO-HAVE`)

"Current change: this informative document only" in the draft's authority section; the increment
adds three documents. Say "these informative documents".

### N-3 (`NICE-TO-HAVE`)

The evidence-map row "Coded coefficients: accepted bounded QR cancellation supplement" would be
clearer as "accepted as an accurate exploratory record"; the acceptance reviews granted `GO` to
the record, not to the coefficient route's adequacy.

### N-4 (`NICE-TO-HAVE`)

The follow-up could list, as further unverified acquisition targets for the F-ratio distribution
itself (which Cochran's quadratic-form result does not by itself supply), the original papers
that introduced the variance-ratio distribution and its tabulation; naming them requires
bibliographic confirmation first, so this review does not assert their identities.

### N-5 (`NICE-TO-HAVE`)

Carry the companion review's SF-1 and SF-2 (magnitudes beside counts; interpreter as part of the
operation definition) into the evidence map when the supplement is repaired, so the RFC draft
does not inherit counts without magnitudes.

## 10. Bounded verdict

| Determination            | Verdict                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| Editorial preparation    | **`GO`** at `bf400469…` as informative, bounded, non-promoting preparation                           |
| R4-P5                    | **`NOT_CLOSED`**; exact artifact and Requirement ID inventory absent by the draft's own declaration  |
| Source access            | **`SOURCE_ACCESS_INCOMPLETE`**; author's access record confirmed as stated; acquisition routes added |
| Public-opening readiness | **`NOT_READY`**                                                                                      |
| Adoption, opening, merge | none requested; none granted; Release 3 untouched                                                    |

## 11. Validation record

Executed in the session clone after `pnpm install --frozen-lockfile` (pnpm 11.7.0, Node 22.22.2):
Prettier check on the two review files and repository-wide `pnpm format:check` pass; Markdown
lint 366 files, 0 issues (review branch on `main` plus the two review files); `pnpm typecheck` pass; `node --import tsx tooling/src/validate.ts` all
validators clean; `git diff --check` clean. The `pnpm check` test suite was not run: no
authoritative artifact changed. Only the two review files were created; the reviewed documents
and all other artifacts are unchanged.

RELEASE 4 RFC PREPARATION REVIEW COMPLETE - EDITORIAL GO AT bf400469 - R4-P5 NOT CLOSED - SOURCE ACCESS INCOMPLETE - NOT READY TO OPEN - MODEL-LEVEL INDEPENDENCE ONLY - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
