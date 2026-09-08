# Release 3 Source-Acquisition Result Part J — Independent Delta Review of the S-I1/S-I2 Repair (Hayter 1986 table-discrepancy scope and formula display)

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context, exact-head review of the Part J increment proposed in
PR #202 of the Release 3 semantic source-acquisition result. Part J is the author-side
repair of the two `SHOULD-FIX` findings (`S-I1`, `S-I2`) raised by the PR #201
independent review of Part I (SR-H claim `C-H4`, catalogue entries `APR-13` protected LSD
and `APR-14` Hayter's modified LSD, supplier 26 / `SRC-35`, Hayter 1986). The review scope
is transcription and presentation only: it checks that Part J reproduces the PR #201
observations faithfully and attributes them correctly, that the restated formula matches
the unchanged I.4 code, and that no disposition, hold, ledger count, status line or
boundary moved. It selects no Contract, procedure, identifier, schema, Public Check,
tolerance, support domain, RFC decision, R4 method, or release outcome; it updates no
hold, issue, gate, or catalogue class; it merges nothing and accepts nothing. Attribution
is role-based; material process provenance is disclosed in Sections 1 and 9.

**Content verdict: `GO` for the Part J delta** (Section 8), bounded to the repair of
`S-I1` and `S-I2` as recorded at the exact head below. **`S-I1`: `CLOSED`** on the
transcription basis (Section 4). **`S-I2`: `CLOSED`** (Section 5). Regressions: none
(Section 6). Findings: `BLOCKER` 0, `SHOULD-FIX` 0, `NICE-TO-HAVE` 2 (Section 7); neither
changes a disposition. **`SR-H` stays `INPUT_INCOMPLETE`**; `APR-13`/`APR-14` stay
`RES-ONLY`; the candidate ledger stays 5 `CLOSED` / 0 `PARTIAL` / 9 `INPUT_INCOMPLETE`;
overall `INPUT_INCOMPLETE`; semantic `NARROW`; 35 originals in custody. **Independence
status: context `ESTABLISHED`; model level: testimony-supported for the author side,
session-service-recorded for the review side; no steward determination is made here**
(Section 9). **Formal hold acceptance, merge, method adoption, table-value adoption,
numerical guarantee, public opening, release: `NOT PERFORMED`** and not authorized by this
record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                                                                                                                                                                                                       |
| Reviewed pull request | #202 (draft; head branch `research/r3-srh-lsd-repair-20260908`; base `research/r3-srh-lsd-primary-20260908`, the PR #200 head reviewed in PR #201, comparison only)                                                                                                                                                                                                                                                                          |
| Reviewed exact head   | `1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b` (the PR head at the start and at the end of this review; see Section 2)                                                                                                                                                                                                                                                                                                                           |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                                                                                                                                                                                              |
| Review date           | 2026-09-08 (UTC)                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Reviewer role         | independent close-only reviewer of the Part J delta, following result Section J.4, continuation Section 15 decision 3, and the user's request to review PR #202                                                                                                                                                                                                                                                                              |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, any of Parts A–J of the result, the continuation record, or any prior review record (including PR #201). It was started fresh on 2026-09-08 (session created 01:28:14Z, after the reviewed commit at 01:24:26Z and PR #202 at 01:25:02Z) from a new clone. PR #201 and continuation Section 15 are third-party records reused with attribution (Section 3) |
| Review posture        | falsification-oriented for everything inside scope: every identity, byte count, hash, count, difference, direction, attribution sentence, boundary sentence, ledger figure and status line in J.1–J.4 was checked against Git objects, the live PR metadata, the PR #201 review blob, continuation Section 15, and the unchanged I.4 text and code                                                                                           |
| Private material      | none read or committed; the Hayter (1986) PDF was not supplied to and not requested by this pass (Section 3)                                                                                                                                                                                                                                                                                                                                 |

**Scope (J.4).** The Part J delta only: J.1 provenance and preserved-input statements;
J.2 (S-I1) against PR #201 Sections 7 and 10 and continuation Section 15; J.3 (S-I2)
against the I.4 prose and code as preserved in the parent blob; J.4 disposition, ledger,
limits and handoff. Out of scope: re-review of Parts A–I (PR #201 stands as the Part I
review), the seven `NICE-TO-HAVE` findings `N-I1`–`N-I7` of PR #201 (carried, not
adjudicated here), any source claim, any numerical closure, acceptance of `SR-H` as a whole,
R4 source-access findings, Dunn numerical conflicts, and any other hold.

**Model information (recorded on an ordinary accountable basis, not guessed).** This pass
ran in a managed remote execution session (Anthropic cloud environment). The
session-management service, queried during this pass, reported
`configured_model: claude-fable-5-1`, `session_context.model: claude-fable-5-1` and
`external_metadata.last_served_model: claude-fable-5-1`. No serving-build log was
requested or is required. Part J states that its author side is a "continuing
OpenAI-assisted author"; that statement is author testimony in the result and the PR body,
not a Git fact (Section 9).

**Environment.** Linux container (managed cloud environment); Node v22.22.2; pnpm 11.7.0;
`pnpm install --frozen-lockfile` in this session, exit 0. No Python numerical stack was
used or needed: this pass performs no recomputation (Section 3).

## 2. Fixed identity verification (expected versus observed)

All identities were checked against local Git objects fetched from `origin` by hash and
against the live GitHub PR and commit metadata. Every row matches.

| Item                        | Expected (task / PR #202 / Part J)                                                                                                                                           | Observed                                                                                                                                                                                                                                                                      | Result |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| PR #202 live state at start | draft, open, head `1b2a1efa…`                                                                                                                                                | draft, open, `mergeable_state: clean`, head `1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b`, base `research/r3-srh-lsd-primary-20260908` at `81835178…`, 1 commit, 1 changed file, +87/−0; `git ls-remote` head branch = same                                                      | match  |
| PR #202 live state at end   | unchanged                                                                                                                                                                    | re-read after the review branch was pushed and the review PR opened (Section 10): head branch still `1b2a1efa…`; PR #202 still draft and open                                                                                                                                 | match  |
| Head commit                 | `1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b`                                                                                                                                   | commit present; tree `7f7b880a0dbf7b8991fb9326a4d76057f19b8e67`; author/committer date 2026-09-08T01:24:26Z; message "Append Part J corrections for Hayter table discrepancy scope and formula display"                                                                       | match  |
| Sole parent                 | `81835178ac49f189064e20d9babda219acfd7c5f`                                                                                                                                   | `git rev-list --parents -n1` lists exactly one parent, equal to the expected value; the parent is the PR #200 head reviewed in PR #201 and accepted in continuation Section 15                                                                                                | match  |
| Head tree                   | `7f7b880a0dbf7b8991fb9326a4d76057f19b8e67`                                                                                                                                   | `git rev-parse <head>^{tree}` = same                                                                                                                                                                                                                                          | match  |
| Result blob at head         | `94751f095f5b669c40520c84c40aaf3080eb552a`, 303208 bytes, SHA-256 `53f71d64663bd72ba1fd21b688179acb028c1088b7c48cd83751ed8a03457a93`                                         | `git ls-tree <head> <path>` = same blob; `git cat-file -s` = 303208; `sha256sum` of the blob bytes = same                                                                                                                                                                     | match  |
| Result blob at parent       | `8774beb8d1736baa8637ef60945d53834a0affb0`, 297669 bytes (J.1 and PR #201)                                                                                                   | `git ls-tree <parent> <path>` = same; 297669 bytes; SHA-256 `80988ef92e4e5e22e03786bd1e5c9c7e5f97961e12ed641383aaa882506dc8b5`, equal to the value PR #201 Section 2 recorded                                                                                                 | match  |
| Change set                  | Part J appended to the result file only                                                                                                                                      | `git diff-tree --stat` parent..head: one file, the result path, +87 lines, 0 deletions; one hunk `@@ -2658,3 +2658,90 @@`; Part J occupies lines 2662–2747 after the unchanged Part I status line (lines 2659–2660)                                                           | match  |
| Parts A–I prefix            | 297669 bytes preserved byte-exactly                                                                                                                                          | `head -c 297669 <head blob> \| cmp - <parent blob>` exits 0; the parent blob is an exact prefix of the head blob; the parent ends with the Part I status line and a newline, so Part J begins with a blank line and its own heading                                           | match  |
| Prior independent review    | PR #201, commit `92867850f00d9d3a0f0f62b527707cb198196f51`, blob `39232d73052774cabeab6c090c29deed64b6126c`, path `review-inputs/r3-srh-lsd-primary/REVIEW-RESULT.md`        | commit fetched by hash; sole parent `81835178…`; tree `869d21981c28706206d71037859c0733b71a9e61`; `git ls-tree` at that path = the expected blob; PR #201 live state: draft, open, head branch `review/r3-srh-lsd-primary-20260908` at the same commit                        | match  |
| Approval record             | commit `e17e825d0376be927da1541b1b565dd0fc194014`, blob `839953008ca72ed2934404ad20562a04fe5b35b8`, path `governance/drafts/research-continuation-2026-09-07.md`, Section 15 | commit fetched by hash (author date 2026-09-08T01:24:07Z); `git ls-tree` at that path = the expected blob; Section 15 "Steward acceptance of the bounded Part I result and review intake" is present with decisions 1–3 and the S-I1/S-I2 correction text quoted in Section 4 | match  |
| Commission                  | unchanged by the reviewed branch                                                                                                                                             | `git rev-parse <head>:governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md` = `3c7ddcc696f0c284213f7efe0da68e747bc238d7`, the same blob PR #201 recorded and the same blob at `origin/main` (`f39100161cb45de15767bdb19ed54aba9489b41a`)         | match  |
| Review branch name          | a neutral, unused name                                                                                                                                                       | `git ls-remote --heads origin` before creation showed `review/r3-srh-lsd-primary-20260908` (PR #201) but no `review/r3-srh-lsd-repair-20260908`; the latter was created from the exact head                                                                                   | match  |

The PR #202 body's identity block (head, sole parent, blob, bytes, SHA-256, path) agrees
with every row above. The PR body also states the continuation identity
(`e17e825d…`, blob `83995300…`); the result file itself does not (Section 7, `N-J1`).

## 3. Inspections performed and inspections reused

| Item                                                                               | Performed here                                                                                                       | Reused, with attribution                                                                                                                  | Not done                                                                       |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Git identities, byte counts, hashes, prefix, hunk, live PR state                   | yes (Section 2)                                                                                                      | —                                                                                                                                         | —                                                                              |
| PR #201 Sections 7 and 10 text (the 54-cell comparison and `S-I1`/`S-I2`)          | read from blob `39232d73…` and compared with J.2/J.3 line by line                                                    | the 54-cell mpmath comparison, its counts, maxima and directions, and the finite-ν note are **PR #201's observations**; taken as recorded | no re-run of the mpmath, SciPy or Monte Carlo computations; no 54-cell recount |
| Hayter (1986) printed pp. 1000–1004, Table 1                                       | —                                                                                                                    | **PR #201 Section 3** read the page images; **Part I** reports the author-side reading; both reused as recorded                           | the PDF was not supplied, not requested, and not read by this pass             |
| I.4 prose lines 2579–2580 and the I.4 Python code block (parent blob, unchanged)   | read from blob `8774beb8…`; compared symbol by symbol with J.3                                                       | —                                                                                                                                         | no execution of the code                                                       |
| Continuation Section 15 (approval scope, authorized corrections, preserved limits) | read from blob `83995300…`; compared with J.1, J.2 and J.4                                                           | —                                                                                                                                         | —                                                                              |
| Part I status line, ledger figures, hold states in I.5 and Parts A–H               | preserved-prefix check only (Section 2); the figures J.4 repeats were compared with Section 15 and PR #201 Section 8 | **PR #201 Section 8** verified the ledger arithmetic against the result; reused                                                           | no re-derivation of the ledger from the fourteen candidate rows                |

No new source-dependent doubt arose during this pass, so no original was requested and
no unverified source range needs to be recorded beyond the reuse rows above.

## 4. S-I1 — J.2 expanded table-discrepancy record

**Basis.** PR #201 Section 7, paragraph "Whole-table comparison (reviewer diagnostic
beyond I.4's scope)" and its three-row table; PR #201 Section 10, `S-I1`; continuation
Section 15, "Corrections authorized for the successor", paragraph S-I1.

**Figure-by-figure comparison.** Every figure in J.2 is a faithful transcription of the
PR #201 record and of the Section 15 authorization.

| Figure                               | PR #201 Section 7                                                | Continuation Section 15                         | J.2                                                                                     | Result |
| ------------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------- | ------ |
| Cells compared                       | all 54 printed cells (α = .01, .05, .10; k = 3..20)              | 54 cells of p.1002 Table 1                      | "all 54 cells"; "printed p.1002 Table 1"                                                | match  |
| Reviewer method                      | mpmath value of the ν = ∞ expression, rounded to four decimals   | "rounded infinite-df expression"                | "a separate mpmath computation of the infinite-df expression"                           | match  |
| Cells differing, α = .01             | 16 of 18                                                         | 16/18                                           | 16 of 18                                                                                | match  |
| Cells differing, α = .05             | 14 of 18                                                         | 14/18                                           | 14 of 18                                                                                | match  |
| Cells differing, α = .10             | 8 of 18                                                          | 8/18                                            | 8 of 18                                                                                 | match  |
| Total                                | 38 of 54                                                         | 38 of 54                                        | "38 of 54 cells differ"; 16 + 14 + 8 = 38 and 3 × 18 = 54 (checked)                     | match  |
| Largest \|exact − printed\|, α = .01 | 0.00065 (k = 20)                                                 | approximately .00065                            | .00065 (k=20)                                                                           | match  |
| Largest \|exact − printed\|, α = .05 | 0.00013 (k = 15)                                                 | approximately .00013                            | .00013 (k=15)                                                                           | match  |
| Largest \|exact − printed\|, α = .10 | 0.00012 (k = 8)                                                  | approximately .00012                            | .00012 (k=8)                                                                            | match  |
| Direction, α = .01 and .05           | printed below exact in all differing cells                       | printed below the computation                   | "printed below computed"                                                                | match  |
| Direction, α = .10                   | printed above exact in all differing cells                       | printed above the computation                   | "printed above computed"                                                                | match  |
| Overall characterization             | table-wide pattern, not isolated last-place rounding differences | table-wide pattern, not merely a two-cell issue | "column-dependent pattern"; "cannot treat the issue as only two last-place differences" | match  |

J.2's column heading calls the quantity "Approximate largest absolute computed-minus-printed
difference". PR #201 tabulates the same quantity as the largest absolute difference between
its computed ν = ∞ value and the printed value; Section 15 calls the figures approximate.
"Computed" in place of PR #201's "exact" is the more cautious word for a numerically
evaluated expression and does not change the meaning. J.2 reports maxima only; it does not
carry PR #201's per-column lists of differing k values or its tested-and-rejected
rounded-critical-value hypothesis (Section 7, `N-J2`). Nothing in J.2 contradicts those
details.

**Attribution.** J.2 states that "PR 201 Section 7 extends the comparison", that "the
expanded observations and calculations belong to the independent reviewer", and that "this
repair has not rerun them or reinspected the PDF". This is the required attribution: the
diagnostic is presented as the reviewer's, not as new author computation, and the author
side claims no re-inspection. J.2 also preserves I.4's actual scope ("only its actual
three-cell author diagnostic") rather than rewriting I.4.

**Boundaries.** J.2 states that the cause is not established; that no formal erratum,
replacement values or guaranteed three-decimal accuracy follows; that the printed table
remains preserved and is not adopted as numerical authority; that future numerical use
requires separately reviewed calculations and resolution of the discrepancy; that neither
the quadrature error estimates nor the observed differences become Protocol tolerances;
and that the theorem-based characterization is unchanged. Each of these matches the
Section 15 authorization ("No cause, formal erratum, replacement cell, or three-decimal
accuracy guarantee is established") and PR #201's own hedge ("no cause is asserted, and no
erratum was searched for or found").

**Intended deviation from the literal `S-I1` wording.** PR #201's `S-I1` suggested that
a successor "record that Table 1 is reliable to about three decimals against the
expression it tabulates". J.2 does not adopt that phrasing and instead states that no
three-decimal accuracy guarantee follows. This is the outcome continuation Section 15
authorized and the review instruction requires (do not treat the reported differences as
a guaranteed accuracy bound). The deviation is deliberate, disclosed by J.2's own wording,
and does not weaken the correction `S-I1` asked for (that the discrepancy is table-wide).
It is not a finding.

**Determination: `S-I1` `CLOSED`** on the transcription basis. The counts, per-column
figures, maxima, directions and characterization in J.2 are exact transcriptions of the
PR #201 record; the observations are attributed to the independent reviewer; no cause,
erratum, replacement value or accuracy guarantee is asserted. This determination reuses
PR #201's computation and page inspection as recorded and does not itself vouch for the
54-cell figures.

## 5. S-I2 — J.3 literal multiplication in the I.4 prose formula

**Basis.** PR #201 Section 10, `S-I2` (result lines 2579–2580); continuation Section 15,
paragraph S-I2; the I.4 prose and code block in the parent blob (unchanged at the head).

**Defect confirmed in the preserved text.** Parent-blob lines 2579–2580 read, byte for
byte, `q=sqrt(2)_Phi_inverse(1-alpha/2)` and `phi(x)_(Phi(x+q)-Phi(x))^(r-1)`. The
underscores stand where a product sign belongs and are emphasis delimiters in Markdown, so
the prose no longer states the product. The I.4 code block is unaffected. Line numbers
match `S-I2`.

**J.3 against the I.4 code (parent blob, unchanged).**

| Quantity       | I.4 code                                                    | J.3 prose (code spans)                              | Result                                                         |
| -------------- | ----------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------- |
| `r`            | `r = k - 1`                                                 | `` `r = k - 1` ``                                   | identical                                                      |
| `q`            | `q = sqrt(2) * ndtri(1 - .05 / 2)`                          | `` `q = sqrt(2) * Phi_inverse(1 - alpha/2)` ``      | identical with `ndtri` = Φ⁻¹ and α = .05 in the code           |
| Density factor | `exp(-x*x/2) / sqrt(2*pi)`                                  | `phi(x)` (standard normal density, as J.3 says)     | identical                                                      |
| Integrand      | `r * exp(-x*x/2) / sqrt(2*pi) * (ndtr(x+q)-ndtr(x))**(r-1)` | `` `r * phi(x) * (Phi(x + q) - Phi(x))**(r - 1)` `` | identical with `ndtr` = Φ; exponent `**(r - 1)` as in the code |
| Domain         | `quad(..., -12, 12)` with the stated tail bound             | "over the entire real line"                         | consistent with I.4's own statement of the truncation          |
| Object         | `cdf` = Pr{range ≤ q}; the table prints `1 - cdf`           | "The normal-range CDF is the integral …"            | consistent                                                     |

The restated formula is exactly the I.4 code and exactly the expression PR #201 Section 7
independently derived (`Pr{range ≤ q} = r ∫ φ(x) [Φ(x + q) − Φ(x)]^{r−1} dx`). Section 15's
authorized wording is reproduced verbatim by J.3, including the code spans.

**Markdown rendering.** In the head blob, both J.3 expressions are enclosed in backticks;
inside a code span CommonMark treats `*` and `_` literally, so the multiplication signs
survive rendering. The head blob passes `pnpm format:check` (Prettier print width 100,
`proseWrap: preserve`), so Prettier does not rewrite the spans. The presentation defect is
therefore repaired in J.3, and I.4's original lines 2579–2580 are intentionally left as
printed (preserved prefix) with J.3 as the corrective reading.

**No change to code, output or meaning.** J.3 states that I.4's code, transcript,
integration truncation and diagnostic limitations are unchanged; the preserved-prefix
check (Section 2) establishes that literally. J.3 introduces no new numerical value.

**Determination: `S-I2` `CLOSED`.**

## 6. Preservation, scope and regression checks

| Check                                    | Observed                                                                                                                                                                                                                                                                | Result |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Parts A–I unchanged                      | 297669-byte prefix identical (Section 2)                                                                                                                                                                                                                                | pass   |
| Part I status line unchanged             | lines 2659–2660 of the head blob read "RELEASE 3 PART I C-H4 AUTHOR SOURCE WORK COMPLETE - INDEPENDENT REVIEW PENDING - SR-H AND OVERALL INPUT_INCOMPLETE - NO METHOD OR NUMERICAL VALUE ADOPTED", as at the parent; J.1 states that it does not rewrite this line      | pass   |
| Historical `PENDING` statements          | none altered (prefix); J.1 says the Section 15 determination does not "alter past PENDING statements"                                                                                                                                                                   | pass   |
| Approval scope kept separate from review | J.1: the increment "supplies no new independent review"; the Section 15 determination "does not establish independence for the present author-side Part J repair"; J.4 and the Part J status line: "INDEPENDENT DELTA REVIEW PENDING"                                   | pass   |
| Approval scope matches Section 15        | J.1's "user's explicit steward approval of PR 201's submitted matters" and J.4's "C-H4's accepted scope stays bounded to Part I read with these precision corrections" match Section 15 decisions 1–3 and their limits                                                  | pass   |
| `SR-H`                                   | J.4: `INPUT_INCOMPLETE`; Section 15: same; PR #201 Section 8: same                                                                                                                                                                                                      | pass   |
| `APR-13` / `APR-14`                      | J.4: `RES-ONLY`; Section 15: same                                                                                                                                                                                                                                       | pass   |
| Candidate ledger                         | J.4: 5 `CLOSED` / 0 `PARTIAL` / 9 `INPUT_INCOMPLETE`; Section 15 and PR #201: same                                                                                                                                                                                      | pass   |
| Overall and semantic scope               | J.4: overall `INPUT_INCOMPLETE`, semantic `NARROW`; Section 15: same                                                                                                                                                                                                    | pass   |
| Custody count                            | J.4: 35 originals; Section 15: "35 collected originals"; PR #201 Section 2: supplier total 35                                                                                                                                                                           | pass   |
| No spill-over                            | J.4 keeps "all other holds, R4 source gaps and Dunn numerical conflicts" unchanged and adopts "no method, table value, implementation, numerical guarantee, public opening or release"; nothing in J.1–J.3 touches R4, another hold, a method choice or a numeric bound | pass   |
| `N-I1`–`N-I7`                            | J.4: "carried forward rather than silently adopted"; Section 15 carries them with PR #201's locators; Part J neither adopts nor rewrites them                                                                                                                           | pass   |
| Files other than the result              | none changed (Section 2, change set)                                                                                                                                                                                                                                    | pass   |
| Formatting and lint at the head          | Section 10: all four checks pass at `1b2a1efa…` before this file was added                                                                                                                                                                                              | pass   |
| Trailing whitespace, non-ASCII           | none in Part J except the en dash in "Parts A–I", consistent with Parts A–I usage                                                                                                                                                                                       | pass   |

**Regressions: none.**

## 7. Findings

**BLOCKER:** none.

**SHOULD-FIX:** none.

**NICE-TO-HAVE** (neither affects `S-I1`/`S-I2` closure or any disposition):

- **N-J1. The continuation identity is pinned only in the PR body.** J.1 refers to
  "continuation Section 15" and says "the exact continuation identity is supplied in this
  PR's handoff". The PR #202 body gives `e17e825d0376be927da1541b1b565dd0fc194014` / blob
  `839953008ca72ed2934404ad20562a04fe5b35b8`, and this review verified Section 15 at that
  identity. A PR body is editable; the result file is the durable record. A later
  increment could record the commit and blob in the result itself. No action is needed for
  this repair.
- **N-J2. J.2 omits two details PR #201 Section 7 recorded.** The per-column lists of
  differing k values (.01: every k ≥ 5; .05: k = 4..15, 17, 18; .10: k = 5, 7, 8, 9, 10,
  11, 13, 17) and the tested-and-rejected rounded-critical-value hypothesis are not
  carried into J.2. J.2 is accurate without them, and PR #201 remains the locator; a later
  increment could cite them if the discrepancy is ever followed up.

## 8. Content verdict

**`GO` for the Part J delta at `1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b`**, bounded to
the transcription and presentation repair of `S-I1` and `S-I2`:

- `S-I1`: `CLOSED` on the transcription basis (Section 4); the 54-cell figures remain
  PR #201's observations and are not certified here.
- `S-I2`: `CLOSED` (Section 5).
- Regressions: none (Section 6).
- Findings: 0 `BLOCKER`, 0 `SHOULD-FIX`, 2 `NICE-TO-HAVE` (Section 7).

This verdict does not enlarge the accepted `C-H4` characterization, does not accept
`SR-H`, does not adopt any Table 1 value or the ν = ∞ expression as Protocol authority,
does not set a tolerance, and does not touch R4, any other hold, method adoption, public
opening or release. Whether the author-side repair proposals are now "independently
closed" in the sense of continuation Section 15 decision 3 is a steward determination on
this record; it is not made here.

## 9. Independence record

- **Context separation (Git- and service-verifiable):** this review's session was created
  at 2026-09-08T01:28:14Z, after the reviewed commit (01:24:26Z) and PR #202 (01:25:02Z),
  from a fresh clone of `main` at `f39100161cb45de15767bdb19ed54aba9489b41a`. The review
  branch was created from the exact head and adds one file; the reviewed result, the
  commission, the continuation record, PR #201, all prior reviews and `main` are untouched
  (Section 10). The reviewer did not participate in the investigation, drafting or repair
  of Parts A–J. **Context: `ESTABLISHED`.**
- **Model level (ordinary evidence):** the review side is recorded from the session
  service as `claude-fable-5-1` (configured, current, and last served). The author side's
  "continuing OpenAI-assisted author" statement is first-hand testimony in Part J and the
  PR #202 body, not a Git fact.
- **Git identity is not model testimony.** The reviewed commit is authored and committed
  as the steward's Git identity; the review commit on the review branch is authored under
  this session's configured Git identity. Neither Git identity proves which model produced
  the text; the model statements above rest on the session service (review side) and on
  author testimony (author side), exactly as continuation Section 15 decision 1 treated
  Part I. **That determination was scoped to Part I; it is not applied to Part J here,
  and no new determination is made by this record.**
- **Not required:** exact serving-build logs on either side.
- Historical `PENDING` statements in Parts A–I, PR #201 and the continuation record are
  unchanged and are not reinterpreted by this record.

## 10. Deliverable identity and validation

| Item          | Value                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Review branch | `review/r3-srh-lsd-repair-20260908`, created from `1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b` (sole parent of the review commit)                                |
| Review file   | `review-inputs/r3-srh-lsd-repair/REVIEW-RESULT.md` (the only change)                                                                                           |
| Review PR     | draft, base `research/r3-srh-lsd-repair-20260908` (the PR #202 head branch); the review commit, tree and blob identities are recorded in that PR's description |
| Not committed | scratch copies of the parent, head, PR #201 and continuation blobs used for comparison                                                                         |
| Unchanged     | the reviewed result, the commission, the continuation record, PR #201, all prior review records, `main`                                                        |

Checks run on the fixed head before adding this file, and again on the final state with
this file added (both from the same `pnpm install --frozen-lockfile`, exit 0):

| Check                                       | Fixed head `1b2a1efa…`                                      | Final review state                                          |
| ------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `pnpm format:check`                         | pass ("All matched files use Prettier code style!"), exit 0 | pass ("All matched files use Prettier code style!"), exit 0 |
| `pnpm lint:markdown`                        | pass (355 files, 0 issues), exit 0                          | pass (356 files, 0 issues), exit 0                          |
| `node --import tsx tooling/src/validate.ts` | pass (final line reports the audits clean), exit 0          | pass (final line reports the audits clean), exit 0          |
| `git diff --check`                          | pass (no output), exit 0; `--cached` likewise               | pass (unstaged and `--cached`, no output), exit 0           |

No aggregate `pnpm check`, test suite, typecheck, generated-file check, numerical rerun or
PDF inspection is claimed.

## 11. Reproduction

```sh
git fetch origin 1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b 81835178ac49f189064e20d9babda219acfd7c5f \
  92867850f00d9d3a0f0f62b527707cb198196f51 e17e825d0376be927da1541b1b565dd0fc194014
P=governance/drafts/release-3-preparation/semantic-source-acquisition-result.md
git rev-list --parents -n1 1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b   # exactly one parent: 81835178…
git rev-parse 1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b^{tree}          # 7f7b880a…
git ls-tree 1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b $P               # blob 94751f09…
git cat-file -s 94751f095f5b669c40520c84c40aaf3080eb552a                # 303208
git cat-file -p 94751f095f5b669c40520c84c40aaf3080eb552a | sha256sum   # 53f71d64…
git cat-file -p 8774beb8d1736baa8637ef60945d53834a0affb0 > parent.md  # 297669 bytes
git cat-file -p 94751f095f5b669c40520c84c40aaf3080eb552a | head -c 297669 | cmp - parent.md   # exit 0
git diff 81835178ac49f189064e20d9babda219acfd7c5f 1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b --stat   # 1 file, +87
git cat-file -p 39232d73052774cabeab6c090c29deed64b6126c | awk '/^## 7\./,/^## 8\./'    # PR #201 Section 7
git cat-file -p 39232d73052774cabeab6c090c29deed64b6126c | awk '/^## 10\./,/^## 11\./'  # PR #201 Section 10
git cat-file -p 839953008ca72ed2934404ad20562a04fe5b35b8 | awk '/^## 15\./,0'          # continuation Section 15
sed -n 2575,2614p parent.md    # I.4 prose and code
sed -n 2662,2747p head.md      # Part J
```
