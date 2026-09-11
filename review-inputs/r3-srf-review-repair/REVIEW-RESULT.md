# Release 3 SR-F Review Repair (Part P) — Limited Independent Repair Review

**Status: informative independent review result; non-normative; not adopted.** This
record is the limited independent repair review of Part P of the Release 3 semantic
source-acquisition result at the fixed head of pull request #221, performed under the
instructions in Part P.6. It reviews the Part P addendum only, against the independent
review of Part O in pull request #220 at its fixed identity. It selects no procedure,
Contract, identifier, schema, Public Check, tolerance, implementation, or release
outcome; it accepts no formal hold, adopts no method, enacts no steward decision, opens
no public discussion, and merges nothing. Attribution is role-based only.

**Verdict: `GO` on content**, with zero `BLOCKER`, one `SHOULD-FIX` (F-1, an
editorial count wording in P.4 that does not change any count), and two
`NICE-TO-HAVE` (Section 9). **S-1 is `CLOSED` as a repaired review finding** and
**S-2 is `CLOSED` as a repaired review finding** (Sections 4 and 5): the corrected
rounding statement is verified by exact rational arithmetic, and the explicit APR-06
narrowing matches the fixed catalogue row and the pinned primary-source mapping of
PR #220. No regression against Parts A–O or any earlier review was found (Section 8).
The recorded successor label SR-F `PARTIAL` with single named gap R-1, the candidate
ledger 5 `CLOSED` / 2 `PARTIAL` / 7 `INPUT_INCOMPLETE`, and the separate, unapproved
bounded `CLOSED` proposal (6/1/7 if accepted) are internally consistent with the
commission and with PR #220 Section 13 (Section 7). Closing a review finding here is a
reviewer determination about the repair; the SR-F disposition itself remains a steward
decision that this record does not make.

## 1. Review identity

| Field                      | Value                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Repository                 | `licklider-ai/nomue-protocol` (public)                                                                                                |
| Reviewed pull request      | #221 (draft, open, not merged; one commit, one changed path, +173/−0)                                                                 |
| Reviewed exact head        | `c6ba9c923d142e0dacbb62ea20009cbd0ecb34c5`                                                                                            |
| Head tree                  | `0a53610e102d547af6bb302c9fbd6376cf754299`                                                                                            |
| Sole parent / PR base      | `4ce988231330f5702a7d3d8a352b01fac575191f` (`research/r3-srf-primary-research-20260908`; PR #216 head)                                |
| Reviewed result path       | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                       |
| Reviewed result blob       | `ed6c56a96592fdb9bded45ad8fdf10477eb36c11` (383051 bytes; SHA-256 `33eca71fe6deb33da001f85c8a847f45bb39cf03942efb1eb95626e6bf465b1a`) |
| Parent result blob         | `78feb17baba67d41d0aac274c51e2f12b507a6d3` (370999 bytes; SHA-256 `543a4c14b6e0d4fea809c6935a7bc69f08019467283edc9141f8dd1856c48596`) |
| Prior review reused        | PR #220, commit `ca88a1550165dc9b2f5f16541e91d92d1c79ef82`, sole parent `4ce98823…`, tree `4a4e44e7ee519d9cb3e64a5307807a923a6e5b05`  |
| Prior review blob          | `55fe509ed5a87b263e26d0145983f1caa3d2912f` at `review-inputs/r3-srf-primary-research/REVIEW-RESULT.md`                                |
| Operative commission       | blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at the reviewed head                                                                  |
| Fixed semantic input       | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob `8f21526040924b891f64724c2d0fde9ea94eff92` (same blob at the reviewed head)   |
| Review date                | 2026-09-08 (08:44 UTC onward)                                                                                                         |
| Reviewer role              | limited independent repair reviewer for Part P; did not author Parts A–P, the commission, or the PR #220 review                       |
| Review branch              | `review/r3-srf-review-repair-20260908`, confirmed unused on the remote before creation, created from the reviewed head as sole parent |
| Files added by this review | this file only                                                                                                                        |
| Comment on the PR          | none posted                                                                                                                           |

Live pull-request state was read from the hosting service at review start: head
`c6ba9c92…`, base `research/r3-srf-primary-research-20260908` at `4ce98823…`, one
commit, one changed file, 173 additions, no comments. The remote ref
`refs/heads/research/r3-srf-review-repair-20260908` resolved to `c6ba9c92…` at review
start and again immediately before the review commit was made (Section 10). The five
hosted check runs on the head (run `34205980222`) are all `completed` / `success`; the
combined commit status on the head reports `pending` with zero statuses, and the PR read
reported `mergeable_state: unstable`. Those two service fields are recorded as observed;
every hosted check on the head succeeded and nothing in the diff explains them.

## 2. Independence, evidence reuse, and environment

- **Prior involvement.** This reviewer's work context did not participate in Parts
  A–P, in the commission, in the supply of any source PDF, or in the PR #220 review.
  The PR #221 body, Part P, Part O, and the PR #220 record (Sections 1–5, 7, 9–15)
  were read before any check was made; the reading was not blind. The
  `r3-semantic-source-acquisition-sr-l-repair` record was opened only for section
  layout; none of its findings are reused.
- **Evidence reused, explicitly, and not repeated.** As Part P.6 instructs, PR #220's
  page-image inspection of Hochberg (1974), Genizi–Hochberg (1978), Stoline (1981),
  and the 1979 Corrigenda (its Sections 4–8), its independent numerical routes (its
  Section 10: verbatim re-execution of the Part O.3 script, arbitrary-precision SMM
  quadrature, nested-integral SR check, Monte Carlo, seven Table 1 cells), and its
  per-claim disposition (its Section 13) are treated as attributed review evidence.
  **No PDF, page image, or extracted text was available to or read by this review;
  no arbitrary-precision integral or Monte Carlo was rerun.** Every statement below
  about a printed page is a statement about what PR #220 records, not a fresh
  inspection. No new material question arose that required a page, so none was
  requested.
- **Re-derived here**: all Git identities, byte counts, SHA-256 values, and the
  370999-byte prefix comparison from a fresh fetch of the two fixed commits; the S-1
  arithmetic with exact rationals and 50-digit decimals (Section 4); the ledger sums
  and the receipt count from Part N.3; the fixed catalogue row text from blob
  `8f215260…`; the commission definitions from blob `3c7ddcc6…`.
- **Environment and model disclosure.** Hosted Claude Code remote session, container
  CLI 2.1.263, Linux 6.18 (x86-64). The session-description service reports configured,
  current, and last-served model `claude-fable-5-1` (service testimony; disclosed, not
  verifiable from Git). Python 3.11.15 standard library only (`fractions`, `decimal`).
  Repository checks ran from `pnpm install --frozen-lockfile` (pnpm 11.7.0, Node
  22.22.2). No exact-build log was requested from the author.

## 3. Identity gate

Every value was re-derived from Git objects after `git fetch origin` of both fixed
commits, not taken from the PR text or from Part P.

| Check                                | Expected (PR #221 body / Part P.1)                                         | Observed                                                                                                                                                      | Result |
| ------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Live head of the PR branch           | `c6ba9c92…`                                                                | remote ref and PR `head.sha` both `c6ba9c92…` at start and before commit                                                                                      | match  |
| Sole parent                          | `4ce98823…`                                                                | one parent line, `4ce98823…`; PR #216 head and PR #220 parent                                                                                                 | match  |
| Result blob at head                  | `ed6c56a9…`, 383051 bytes, SHA-256 `33eca71f…`                             | `git ls-tree` → `ed6c56a9…`; `wc -c` 383051; `sha256sum` `33eca71f…`                                                                                          | match  |
| Parts A–O prefix preserved           | first 370999 bytes unchanged; parent blob `78feb17b…`, SHA-256 `543a4c14…` | `head -c 370999` of the head blob is byte-identical (`cmp`) to the parent blob; parent blob `78feb17b…`, 370999 bytes, `543a4c14…`                            | match  |
| Change set parent → head             | one path, +173                                                             | `git diff --numstat` → `173 0` on the result path only; the hunk starts after line 3623 (end of Part O.6)                                                     | match  |
| PR #220 review commit                | `ca88a155…`, parent `4ce98823…`, tree `4a4e44e7…`                          | `git log --format=%H %P %T` → `ca88a155… 4ce98823… 4a4e44e7…`                                                                                                 | match  |
| PR #220 review blob                  | `55fe509e…`, 55123 bytes, SHA-256 `cd819183…`                              | `git ls-tree ca88a155…` → `55fe509ed5a87b263e26d0145983f1caa3d2912f`; 55123 bytes; SHA-256 `cd819183d13ea970893d066e39c3c9e65482e3845f0fd076f61fdabd55e2fe1c` | match  |
| Earlier review records at head       | unchanged                                                                  | `git diff --stat 4ce98823… c6ba9c92… -- review-inputs` is empty                                                                                               | match  |
| Commission and fixed semantic input  | `3c7ddcc6…`; `8f215260…` at `7bd9c5ab…`                                    | both blobs present at the reviewed head with those identifiers                                                                                                | match  |
| Session-named branch reported in P.1 | a duplicate session-named branch exists for the PR #220 commit             | `refs/heads/claude/nomue-protocol-pr216-review-m3s58m` → `ca88a155…`, alongside `refs/heads/review/r3-srf-primary-research-20260908`                          | match  |
| Continuous integration on the head   | green                                                                      | five check runs on `c6ba9c92…`, all `success`                                                                                                                 | match  |
| Review branch name availability      | `review/r3-srf-review-repair-20260908` unused                              | `git ls-remote origin 'refs/heads/review/*'` shows only the PR #220 branch under the SR-F name                                                                | match  |

## 4. S-1 — rounding statement, checked by exact arithmetic

**What Part O.3 said** (parent blob, unchanged): the printed GT2 average `0.9986` "is
not ordinary four-place rounding of either the printed four-place component values or
these reconstructed values (both round to 0.9987)".

**What Part P.2 now says:** the printed components average to `0.998633333…`, rounding
to `0.9986`; only the unrounded reconstruction (`0.998662296…`) rounds to `0.9987`; the
earlier characterization is withdrawn; printed values are retained; the difference is
rounding order, not a source inconsistency.

**Exact check performed here** (Python `fractions.Fraction` and 50-digit `decimal`, not
floating point, independent of the O.3 script and of the author's stated Decimal
recheck):

| Quantity                                                     | Exact / high-precision value     | Four-place rounding                    |
| ------------------------------------------------------------ | -------------------------------- | -------------------------------------- |
| Printed GT2 components `(0.9462 + 0.9462 + 1.1035)/3`        | `29959/30000 = 0.99863333…`      | `0.9986` (half-up and half-even agree) |
| Distance below the `0.99865` rounding boundary               | `1/60000 = 0.0000166…`           | not a boundary case                    |
| Reconstructed GT2: `a = 2.207·(1/17 + 1/8)^{1/2}`            | `0.94624344352379…`              | `0.9462`                               |
| Reconstructed GT2: `b = 2.207·(2/8)^{1/2}`                   | `1.1035` exactly (`2.207 × 0.5`) | `1.1035`                               |
| Reconstructed GT2 average `(2a + b)/3`                       | `0.99866229568252…`              | `0.9987`                               |
| Printed `T_c(Q_0)` components `(0.9627 + 0.9627 + 1.0667)/3` | `0.99736666…`                    | `0.9974`                               |
| Reconstructed `T_c(Q_0)` average                             | `0.99738161690832…`              | `0.9974`                               |

Results: the O.3 statement was wrong for the printed components exactly as PR #220
Sections 10 and 12 state; Part P.2's two figures (`0.998633…` → `0.9986`;
`0.998662296…` → `0.9987`) are both correct; the reconstructed average agrees with the
O.3 diagnostic output `0.998662296` to every printed digit; doubling both averages
preserves the ordering (`1.99732…` versus `1.99476…`), as P.2 says. The printed values
are retained, no diagnostic output or table is altered, and no disposition depends on
the point. Part P.2 also correctly attributes the finding to PR #220 Sections 10 and 12.

**S-1: `CLOSED` (repair confirmed).** The residual observation in the record now reads
as PR #220 S-1 asked: printed average equals the rounding of the printed rounded
components; the unrounded reconstruction rounds one unit higher.

## 5. S-2 — explicit APR-06 catalogue narrowing

**Fixed catalogue text checked** (blob `8f215260…`, identical at the reviewed head):
the combined row "GT2 / Genizi-Hochberg (APR-05/06)" carries critical-value basis
"Studentized maximum modulus; special tables", guarantee "simultaneous coverage
(reported analytic)", assumptions "pending SR-F", classification `RES-ONLY`; the
entry table lists APR-05 as "Hochberg GT2 (Studentized maximum modulus)" and APR-06 as
"Genizi-Hochberg (1978)", both `RES-ONLY`, hold SR-F. Part P.3's description of the
shorthand is accurate.

**Commission requirement checked** (blob `3c7ddcc6…`, required-analysis items 6–7):
"identify any mismatch with the reviewed catalogue" and "state whether the source
supports, narrows, contradicts, or does not resolve the catalogue characterization".
Part O.5 gave no entry-level verdict for APR-06 (PR #220 S-2). Part P.3 now gives one
per entry with the word "Narrows" for APR-06 and "Supports … generic exact coverage is
excluded" for APR-05.

**Content checked against PR #220's pinned primary-source mapping** (its Sections 6,
7.1, 7.2, 7.4, and 13 R-2), which this review reuses and does not re-inspect:

| Part P.3 statement                                                                                        | PR #220 basis                                                                      | Result     |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------- |
| APR-05: Hochberg pp.225–226 model; Theorem 3.1 p.228; (3.2) p.229; at-least coverage; SMM with `k′`       | Section 6 (model, Theorem 3.1 "at least", (3.2) `≥`); Section 13 rows for entry 05 | consistent |
| APR-05: known covariance shape, common unknown scale, independent chi-square estimator                    | Section 6 first bullet                                                             | consistent |
| APR-06: SMM is not the critical-value basis; SR for csp `T_c(Q)`, SAR for `T(Q)`; pp.879–880              | Section 7.1 ((1.4)–(1.6)); Section 7.4                                             | consistent |
| APR-06: two-distinct-size construction; Section 3 and Table 1 constants; restrictions (i)–(ii)            | Section 7.2 (Section 3, Lemma, Table 1); Section 13 rows for entry 06              | consistent |
| APR-06: restriction (i) minimum within-size pairwise widths; (ii) equal cross-size pair widths            | Section 7.2, "Restrictions (i) … (ii) …"                                           | consistent |
| APR-06: Section 3.2 / Table 2 bounds the average-width comparison with GT2                                | Section 7.2 ((3.1), `B(m_1, m_2, ν, α)`, Table 2, "bounded … not dominance")       | consistent |
| Not promoted: general csp optimality, arbitrary size patterns, pointwise superiority, certified constants | Sections 7.2 (2.6 conjecture), 9 D-3, 10 (diagnostic only), 13                     | consistent |
| Classification `RES-ONLY` retained for both entries; informative comparison, no catalogue edit            | PR #220 S-2 ("does not change `RES-ONLY`"); fixed catalogue blob unchanged at head | consistent |

**S-2: `CLOSED` (repair confirmed).** The narrowing is stated at entry level, is
labelled a narrowing rather than a contradiction, does not touch the fixed catalogue
blob, and matches R-2 in PR #220 Section 13.

## 6. Corrigendum identification, attribution, and count

Checked against PR #220 Sections 4, 5.1, 5.3, and 12 (N-1, N-4), which are reused:

- **Identity.** Part P.4's 256229 bytes, two PDF pages (publisher cover plus printed
  p.744), and SHA-256 `07a6c343…` match PR #220 Section 4's independently recomputed
  values. Both identifiers are carried: publisher DOI `10.1080/01621459.1979.10481678`
  (printed on the artifact, PR #220 Section 4) and the archival item identifier
  `10.2307/2287029` (Part O.4 acquisition log). This addresses N-1.
- **Attribution.** Part P.4 states that the relevant paragraph is unsigned and that
  "Genizi–Hochberg (1979)" follows Stoline's bibliography without establishing
  authorship. This matches PR #220 Section 5.1 and addresses N-4. The PR #221 body's
  phrase "unsigned-item attribution" is consistent.
- **Scope.** Part P.4's four-sentence summary (rejects the liberal-Kramer inference;
  retains the within-family non-achievability; leaves conservativeness to future
  analytical or simulation work; does not correct (1.7), the example, or Tables 1/2;
  not a proof of Kramer coverage) matches PR #220 Section 5.3 sentence by sentence and
  claims no renewed search or broader proof.
- **Count.** The 42 numbered originals are grounded in Part N.3 (suppliers 01–37 and
  39–43, seven distinct additions on top of 35), unchanged by Part O.4 ("does not change
  the received total of 42") and by PR #220 Section 4 ("carries no supplier number and
  does not change the received total of 42"). Part P.4's "42 numbered supplier originals
  plus one unnumbered supplementary corrigendum artifact, hence 43 received artifacts" is
  an accounting distinction, not a change to either prior figure; no supplier number is
  invented; the unavailable set 38/44/45/46 (Part N.4) is unchanged and the corrigendum
  is none of them. The PR #221 body's "42 numbered originals plus one supplementary
  corrigendum artifact (43 artifacts)" matches Part P.4.
- **Optional observations.** N-2 (SciPy 1.17.1 versus 1.17.0, identical printed
  outputs), N-3 (printed `1.3157` versus bounded reconstruction `1.3152`), and N-5
  (repeated `H_11`, second block read as `H_12`) are carried with attribution to PR #220
  Section 12 and are not adopted as replacement values or errata. This matches PR #220's
  own boundary for those findings.

Two wording points are recorded as findings F-1 and F-2 in Section 9. Neither changes
the identity, attribution, scope, or count above.

## 7. Successor label, ledger, and the unapproved bounded proposal

**Commission definitions checked** (blob `3c7ddcc6…`): `CLOSED` requires every
decision-bearing source claim to be directly supported with artifact identity and
pinpoints and "means only that the source-acquisition obstacle has been removed";
`PARTIAL` is "some claims are supported but named gaps remain"; `INPUT_INCOMPLETE` is
"required source text cannot be identified or inspected"; conflicting primary sources
"are not resolved by majority count or convenience. Record the conflict and require
separate adjudication."

**Recorded label.** Part P.5 records SR-F `PARTIAL` with the single named gap R-1 and
no missing source, "pending that bounded disposition decision". This is exactly PR #220
Section 13's stated alternative ("the correct label only if the steward holds that R-1
is a primary-source conflict that must be separately adjudicated before closure … the
single named gap is R-1 and the remaining request is an adjudication decision, not a
source"). Both labels PR #220 supports (`CLOSED` candidate or `PARTIAL`) exclude
`INPUT_INCOMPLETE`, so recording the more conservative of the two as the author-side
candidate is consistent with the commission's fourth definition and does not pre-empt
the steward: Part P.5 says so explicitly.

**Ledger arithmetic.** The commission has fourteen dispositions (SR-A through SR-L plus
RSM-01/02). Part O.5's inherited ledger was 5/1/8 with SR-F `INPUT_INCOMPLETE`. Moving
SR-F alone to `PARTIAL` gives 5 `CLOSED` (SR-B/C/G/K/L) / 2 `PARTIAL` (SR-F/H) /
7 `INPUT_INCOMPLETE` (SR-A/D/E/I/J, RSM-01/02) = 14, as Part P.5 states; moving it to
`CLOSED` gives 6/1/7 = 14, as both Part P.5 and PR #220 Section 13 state. Overall
`INPUT_INCOMPLETE` follows from the commission's precedence rule as long as any
`INPUT_INCOMPLETE` remains; `SOURCE_SET_READY` false and `NARROW` are unchanged.

**Distinction maintained.** Part P.5 separates (a) the recorded `PARTIAL` label, (b) the
"proposed bounded disposition decision, not enacted", and (c) the conditional 6/1/7
ledger "if the bounded decision is approved and the repair confirmed", and it states
that neither ledger is a list of formally accepted holds and that RFC rule 5
adjudication and formal hold acceptance are not declared complete. The PR #221 body
keeps the same three-way distinction. No steward authority is claimed.

**Does the proposal address R-1 with the adjudication already in PR #220?** PR #220's
R-1 proposed adjudication is: the originating theorem governs; the 1978 text's own
prose ("conservative") agrees with it; the catalogue and any later Contract text use
the at-least form; nothing to acquire. Part P.5's proposal is: retain the printed `=` in
(1.7) as a documented discrepancy; ground GT2 in Hochberg Theorem 3.1 / (3.2) with
coverage at least `1 − α`; claim neither generic exact coverage nor a published erratum
for the sign; apply the P.3 narrowing (R-2); treat `CLOSED` in the source-completion
sense only. Reviewer assessment: the two are substantively the same adjudication, and
PR #220's direct reading of both page images (its Sections 6 and 7.3) is the direct
primary-source adjudication that the commission's conflict rule and RFC rule 5 call
for; the corrigendum is silent on (1.7) (PR #220 Section 5.3), so no further paper
bears on it. The proposal therefore addresses R-1 using existing evidence, and R-2 is
addressed by Part P.3. What remains is the steward's decision to accept that
adjudication, which is a decision and not a source; this review does not make it and
does not recommend commissioning another full four-paper pass for it. Hochberg (1975) is
not newly required: PR #220 D-2 derives the (1.5)/(1.6) coverage statements from the
p.879 model, and Part P.5 correctly limits its reliance to that derivation without
claiming inspection of the 1975 proof.

## 8. Preservation and regression

- The first 370999 bytes of the head blob are byte-identical to the parent blob
  `78feb17b…` (`cmp` exit 0; SHA-256 `543a4c14…` recomputed). Part P is a pure
  append after the last line of Part O.6; the diff is +173/−0 on one path.
- The O.3 error that S-1 corrects is preserved verbatim in the prefix and corrected
  by addendum, as PR #220 S-1 requested ("a corrective addendum in a later Part is
  sufficient") and as Part P.1 states.
- No file under `review-inputs/` differs between the parent and the head. The PR #220
  record is not carried on the PR #221 branch because both commits share the same sole
  parent; it is unchanged on its own branch and on the session-named mirror
  (Section 3). Nothing in Part P rewrites, relabels, or reinterprets it beyond
  attributed reuse.
- No authoritative artifact, registry, schema, fixture, reference code, generated
  view, commission, or fixed semantic input is changed; the commission and fixed
  semantic input blobs are unchanged at the head. No PDF, image, or extract is
  committed. No `PENDING` record is rewritten.
- Part P's own disclosures (continuing OpenAI-assisted author role; not independent;
  model testimony versus Git evidence; no exact-build log requested) are consistent
  with Part O.1 and with PR #220 Section 2.
- The PR #221 body's identity block (head, sole parent, blob, bytes, SHA-256, prefix,
  PR #220 commit and blob) matches the Git objects at every value (Section 3).

No regression found.

## 9. Findings by severity

No `BLOCKER`.

### F-1 (`SHOULD-FIX`, editorial) — "three unrelated items" in the P.4 count paragraph

Part P.4 first says, correctly, "The two unrelated corrections on the same page are
outside this review scope", then in the count paragraph writes "the three unrelated
items on one corrigenda page are not counted as three PDFs". Printed p.744 carries
three items, of which two are unrelated (PR #220 Section 5.1). The intended sense is
"the three items on one corrigenda page are not counted as three PDFs". The 42 + 1 = 43
accounting is unaffected; the sentence is internally inconsistent with the earlier one
and should be corrected in a later addendum, not by editing the fixed blob.

### F-2 (`NICE-TO-HAVE`) — the author's own corrigendum inspection is unrecorded testimony

Part P.4 states that "the prior author turn checked its hash/bytes/pages and read the
p.744 page image". Parts A–O record no such author inspection: Part O.4 records the
correction as not acquired, and the artifact first appears in the PR #220 commissioning
message. The identity and scope Part P.4 relies on are nonetheless independently
established by PR #220 Sections 4 and 5, which P.4 reuses and cites, so nothing in the
record depends on the unrecorded author check. A later addendum could either date and
locate that author inspection or rest the custody statement on PR #220 alone.

### F-3 (`NICE-TO-HAVE`) — service state fields on the head

The PR read reported `mergeable_state: unstable` and the combined commit status
reported `pending` with zero statuses, while all five hosted check runs on the head
succeeded. This is recorded so that a later reader does not mistake it for a red check;
its cause was not determined here and it is not attributable to the one-file diff.

## 10. Validation

Actual runs on the review branch with this file present in its final form, from
`pnpm install --frozen-lockfile`; an earlier pass on the draft text gave the same four
results:

| Check                                       | Result                                           |
| ------------------------------------------- | ------------------------------------------------ |
| `pnpm format:check`                         | PASS (all matched files use Prettier code style) |
| `pnpm lint:markdown`                        | PASS (356 files, 0 issues)                       |
| `node --import tsx tooling/src/validate.ts` | PASS (`validate: OK`)                            |
| `git diff --check`                          | PASS (no whitespace errors, this file included)  |

Not run here: `pnpm check` (full suite) — the change is one informative Markdown file
outside authoritative artifacts, and the reviewed head's five hosted check runs are
green (Section 1). The author's reported validation in the PR #221 body (format,
markdown lint over 355 files, direct validator, diff check) is author testimony and is
not repeated as a claim of this review.

## 11. Provenance, boundary, and limits

- The review commit has the reviewed head `c6ba9c92…` as its sole parent and adds this
  file only; commit, tree, and blob identifiers are reported in the draft pull-request
  body because a file cannot contain its own commit hash.
- This is a limited repair review of Part P. It does not repeat the primary-source
  review of Part O, does not re-inspect any page, and does not re-run the numerical
  routes; every page-level and numerical statement above is PR #220's, reused with
  attribution. The only computation performed here is the exact rounding arithmetic in
  Section 4.
- Parts A–P and all earlier review records are untouched. No steward decision, formal
  hold acceptance, method adoption, merge, public opening, publication, or release is
  made or requested. The SR-F disposition (`PARTIAL` recorded; `CLOSED` proposed) is
  left to the steward exactly as Part P.5 and PR #220 Section 13 leave it.
- This record was produced on the neutral branch named in Part P.6 only; no
  session-labelled mirror branch was created for it.
