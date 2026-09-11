# Release 3 Source-Acquisition Result Parts D–F — Independent Exact-Head Review of the Sixteen-Source Intake, the SR-C Six-Source Synthesis and the Output-Derivation Recheck

**Status: informative independent review result; non-normative; not adopted.**
This record is a separate-context review of one exact commit of the Release 3
semantic source-acquisition result, covering the appended Part D (sixteen-source
intake), Part E (SR-C synthesis) and Part F (original recheck and output
derivations) requested by result Sections E.5 and F.5 and by PR #193. It selects no
Contract, procedure, identifier, schema, Public Check, tolerance, support domain,
RFC decision, R4 method, or release outcome; it updates no hold, issue, gate, or
catalogue class; it merges nothing. Attribution is role-based only; material process
provenance is disclosed in Sections 1 and 11.

**Content verdict: `SOURCE_ACCESS_INCOMPLETE` for every source-dependent claim;
`GO` for every separable check** (Section 10). None of the six originals named in
E.5/F.5 (suppliers 11, 12, 13, 14, 18 and 22) and none of the sixteen Part D files
was available to this session, and every network route to a copy of the six papers
was refused by the environment's egress policy (Section 3). Consequently no page,
theorem, table or pinpoint in D.3, D.4, E.2, E.3 or F.1–F.3 was checked against a
printed paper here. Everything that does not depend on the originals was checked and
passed: exact identities, byte-prefix preservation, hash bookkeeping, hold-count
arithmetic, catalogue routing, the E.3 and F.4 diagnostics (reproduced and
independently re-derived), the C.7 transcript, the algebra of the two F.2 output
derivations, commission conformance of the `PARTIAL` proposal, governance boundaries
and repository validation. Findings: `BLOCKER` 0, `SHOULD-FIX` 0, `NICE-TO-HAVE` 5
(Section 8).

**`SR-C` disposition assessment (F.5 question):** `PARTIAL` is accurate as a
category. All six texts have recorded identity and inspection, the derivations that
closed the E.4 output gaps are correctly labelled investigator algebra, and one named
primary-source conflict (Rom p.664 Table 1, row 10, α = .01) remains. `CLOSED` is
correctly withheld. The bounded resolution that would permit a later `CLOSED`
proposal is stated in Section 10. Source-level correctness of every supported claim
remains unverified by this record.
**Independence status: context `ESTABLISHED`, model-level `PENDING`** (Section 11).
**Formal hold acceptance: `NOT PERFORMED`** and not authorized by this record.

## 1. Review identity, scope, role, and independence

| Field                 | Value                                                                                                                                                                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository            | `licklider-ai/nomue-protocol` (public)                                                                                                                                                                                                                              |
| Reviewed pull request | #193 (draft; head branch `research/r3-additional-source-intake-20260907`; base `research/r3-source-intake-srk-20260907`, the PR #186 branch)                                                                                                                        |
| Reviewed exact head   | `eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4`                                                                                                                                                                                                                          |
| Result path           | `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`                                                                                                                                                                                     |
| Review date           | 2026-09-07 (UTC)                                                                                                                                                                                                                                                    |
| Reviewer role         | independent exact-head reviewer for Parts D, E and F, following the instructions in result Sections E.5 and F.5 and the user's request to review PR #193 independently                                                                                              |
| Non-involvement       | this review session did not author, revise, or repair the acquisition commission, Parts A–F of the result, PR #186, PR #193, the PR #187, #188 or #192 reviews, the PR #189 record, or any Release 4 record; it began after Part E and before Part F were committed |
| Review posture        | falsification-oriented for everything checkable in the repository and by computation; source-dependent statements are reported as unverified rather than endorsed, and no saved author summary is substituted for a primary-source inspection                       |
| Private material      | none; no private repository, path, package, or product implementation was read                                                                                                                                                                                      |

**Scope.** Part D (D.1–D.5), Part E (E.1–E.5) and Part F (F.1–F.5) at the exact head
above, against the sole parents recorded in the PR, the pinned commission, the fixed
semantic result, and the preserved Parts A–C. Out of scope and not reviewed here:
the content of Parts A–C (reviewed by PRs #187, #188 and #192 within their scopes),
the other thirteen C.5/E.4 dispositions beyond confirming that they are carried
unchanged, Release 4, and any acceptance decision.

**Head movement during the review.** The review began against `fb1a2f64…` (Part E
head, the PR head at 2026-09-07T08:51Z). While the separable checks were being run,
the author pushed Part F (`eb6c0b26…`, committed 08:56:17Z, PR updated 08:56:50Z).
The review was then re-pinned to `eb6c0b26…`: every identity in Section 2 was
recomputed at the new head, Part F was reviewed (Section 5.6), and this record is
committed with `eb6c0b26…` as its sole parent. No finding about Parts D and E
changed, because Parts A–E are a byte-exact prefix of the new blob.

**Branch note.** E.5 asks for an unused review branch starting at the exact input
head. This record is committed on `claude/pr-193-independent-review-w0s0qx`, the
branch designated for this session; it was reset to start at `eb6c0b26…` before
the review file was added. An earlier push of this branch carried the same review
pinned to `fb1a2f64…`; it was replaced so that the branch holds one review commit
whose sole parent is the current reviewed head. The branch name is a session
locator, not a claim about the reviewer's identity.

**Model information (recorded on an ordinary accountable basis, not guessed).** This
review was performed in a managed remote execution session started
2026-09-07T08:51:15Z, separate from every authoring session. The session-management
service was queried during the review and reported
`configured_model: claude-fable-5-1` and `last_served_model: claude-fable-5-1`.
This is the reviewer-side identifier; the authoring-side account is discussed in
Section 11. No serving-build log was requested or is required.

**Environment.** Linux container (managed cloud environment); Node v22.22.2; pnpm
11.7.0 as pinned by `packageManager`; dependencies installed with
`pnpm install --frozen-lockfile` (exit 0); Python 3.11.15 and Python 3.12.3 with the
standard library only for every recomputation (exact integers and `fractions`).
Outbound HTTPS passes through an egress proxy whose policy denied every host tried
for the six papers (Section 3). No PDF library was needed because no PDF was
available.

## 2. Fixed identity verification (expected versus observed)

All values were re-derived from Git objects fetched from the public repository.

| Object                            | Expected (PR #193 / result text)                                                                   | Observed                                                                                                              | Status |
| --------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------ |
| PR #193 head                      | `eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4`                                                         | live head `eb6c0b26…` (API) at the end of the review                                                                  | match  |
| Sole parent of head               | `fb1a2f647d3157083a1aaceee207b75624385480`                                                         | exactly one parent, `fb1a2f64…`; tree `0b9f56c3c0f6f094a45bdc45bb32af62e7eb152b`                                      | match  |
| Part E commit and its sole parent | `fb1a2f64…`, parent `6f0679629a8b37ea98bc3c4fc661a5c5e923fed6`                                     | exactly one parent, `6f067962…`; tree `eb622c86ea7fd033d57f7963cc5f3438208c2d06`                                      | match  |
| Part D commit and its sole parent | `6f067962…`, parent `9eee0caf6a423d509a996be71df8cff8b4d1e9df`                                     | exactly one parent, `9eee0caf…`; tree `3462851aefee61eea0488b603d6b510e6aff4231`                                      | match  |
| PR base (PR #186 head)            | `9eee0caf…`                                                                                        | branch `research/r3-source-intake-srk-20260907` at `9eee0caf…`, unchanged                                             | match  |
| Result blob at head / bytes       | `6ce3fbaa88ece237c27091a355e6f920ca175179`                                                         | `6ce3fbaa…`; 259026 bytes; SHA-256 `938dea980fae84411b53a4cbe08745b14211b96988d14b5e8add6576a32f9025`                 | match  |
| Result blob at Part E commit      | `6cebcde5ead3dc5496f747a24ab0669d33b05469`, 245812 bytes                                           | `6cebcde5…`; 245812 bytes; SHA-256 `dd6fd26044154d44e554bbdf65e262362c66c10570908c3dfd2d9c1986dbd7b8`                 | match  |
| Result blob at Part D commit      | `06b98ef96abcd9ed13f8ed94644f90017465dad0`, 229079 bytes                                           | `06b98ef9…`; 229079 bytes                                                                                             | match  |
| Result blob at `9eee0caf…`        | `47b497d67bcf7e02382c1fe20cd69a8e615c31cf`, 213491 bytes, SHA-256 `444fa1d7…f10680`                | `47b497d6…`; 213491 bytes; `444fa1d78f585c21ea26db3e8d7c2dfe39dc0728a4d6a3d996665df060f10680`                         | match  |
| Parts A–C prefix at head          | exact 213491-byte prefix                                                                           | `cmp -n 213491`: byte-for-byte; SHA-256 of the prefix = `444fa1d7…f10680`                                             | match  |
| Parts A–D prefix at head          | exact 229079-byte prefix                                                                           | `cmp -n 229079`: byte-for-byte                                                                                        | match  |
| Parts A–E prefix at head          | exact 245812-byte prefix                                                                           | `cmp -n 245812`: byte-for-byte                                                                                        | match  |
| Changed paths `9eee0caf…` → head  | one path                                                                                           | `git diff --stat`: the result file only, +607/−0 (Part D +206, Part E +170, Part F +231)                              | match  |
| Acquisition commission            | blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at `f39100161cb45de15767bdb19ed54aba9489b41a`      | `git ls-tree f3910016…` = `3c7ddcc6…`; same blob at the head                                                          | match  |
| Semantic comparison               | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob `8f21526040924b891f64724c2d0fde9ea94eff92` | commit object present; `git ls-tree 7bd9c5ab…` carries `8f215260…` at the semantic result path; same blob at the head | match  |
| Review path unused                | `review-inputs/r3-src-six-source-synthesis/REVIEW-RESULT.md`                                       | absent from the head tree and from every remote branch other than this session's                                      | match  |

No PDF, archive, extracted text or page image is present in the head tree. Nothing
under `review-inputs/` was modified or removed by this review commit.

## 3. Source access attempted and its result

E.5 and F.5 name originals 11, 12, 13, 14, 18 and 22 as required for the six-source
pass and direct that an unavailable original yields `SOURCE_ACCESS_INCOMPLETE` for
the affected claims. F.1 reports that the five older originals were re-supplied to
the author workspace; nothing was supplied to this reviewer session. Public copies
were then sought so that at least the printed text could be inspected (with their
bytes recorded as distinct from the supplier's):

| Route                                                                                             | Result                                                      |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `www.jstor.org` (Shaffer 1986 stable URL)                                                         | refused by the egress proxy (`EGRESS_BLOCKED`)              |
| `sci2s.ugr.es` (open copies of Shaffer 1986, Hochberg 1988, Hommel 1988, Holland–Copenhaver 1987) | refused (HTTP CONNECT 403 from the proxy; `EGRESS_BLOCKED`) |
| `www2.math.uu.se` (open copy of Simes 1986)                                                       | refused (`EGRESS_BLOCKED`)                                  |
| `academic.oup.com` (Biometrika abstract pages)                                                    | refused (`EGRESS_BLOCKED`)                                  |
| `www.semanticscholar.org`, `www.researchgate.net`                                                 | refused (`EGRESS_BLOCKED`)                                  |
| Rom (1990)                                                                                        | no open copy located; publisher hosts refused as above      |

The proxy status endpoint records these as policy denials. The reviewer therefore had
no primary text for any of the six SR-C sources or the ten other Part D papers. The
commission forbids treating model memory as a substitute for a decision-bearing
primary source; where the reviewer's background knowledge bears on a statement it is
labelled below as recollection and carries no evidential weight in the verdict.

## 4. Part D — custody, bibliography and bounded findings

### 4.1 Byte identities (D.2)

- The sixteen SHA-256 strings are well-formed, mutually distinct, absent from the
  213491-byte Parts A–C prefix, and each occurs exactly once in the head blob.
  Whether each hash is the digest of the named file cannot be checked without the
  files: `SOURCE_ACCESS_INCOMPLETE`.
- Supplier-number arithmetic is correct: C.2 lists 01–07, 09–19 and 31 (19 items);
  D.2 adds 08, 20–30, 32, 33, 35 and 36 (16 items); the union is 01–33 without 34,
  plus 35 and 36, i.e. 35 distinct items as D.1 states. Item 34 is correctly reported
  as not collected. F.1's statement that the five re-supplied files keep the count at
  35 is consistent.
- Internal consistency of page counts: for every one of the sixteen rows, the
  printed page span in D.3 plus the cover convention in D.2 (one cover page for 08,
  20–30, 32, 33; none for 35 and 36) equals the recorded PDF page count. All sixteen
  agree (e.g. Shaffer 826–831 = 6 printed + 1 = 7; Keuls 112–122 = 11 + 0 = 11).
  This supports the cover mapping as stated but does not prove the counts.
- The transport ZIP length (13103742 bytes) is 92.8 percent of the sum of the fifteen
  contained PDF lengths (14121222 bytes), which is a plausible compression ratio for
  scanned-page PDFs. D.2 correctly says the transport digest does not replace the
  individual digests.

### 4.2 Bibliographic matches and routing (D.3)

Checked against the fixed semantic result (blob `8f215260…`), Sections 2.2, 8 and
17, which is a repository-verifiable comparison:

| Supplier       | D.3 route                             | Fixed semantic result                                                                       | Status     |
| -------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- | ---------- |
| 08             | SR-A / SRC-10; OMN-03                 | SRC-10 = James (1951), Biometrika 38; OMN-03 = James tests, hold SR-A                       | consistent |
| 20, 21         | SR-B / SRC-13, SRC-14; PVL-02, PVL-01 | SRC-13 = Šidák (1967) JASA 62(318):626–633; SRC-14 = Dunn (1961) JASA 56; hold SR-B         | consistent |
| 22             | SR-C / SRC-19; PVL-09                 | SRC-19 = Shaffer (1986) JASA 81(395):826–831; PVL-09; hold SR-C                             | consistent |
| 23, 32         | SR-F / SRC-36; APR-05/06              | Section 17 SR-F: Hochberg (1974); Genizi–Hochberg (1978); Stoline (1981) (SRC-36)           | consistent |
| 24, 25, 35, 36 | SR-H / SRC-29; APR-10, APR-12         | SRC-29 = Newman; Keuls (1952); Duncan; Ryan (1960); Einot and Gabriel (1975); Welsch (1977) | consistent |
| 26             | SR-H / SRC-35; APR-13/14              | SRC-35 = Hayter (1986), JASA 81; APR-13/APR-14                                              | consistent |
| 27, 28         | SR-I / SRC-21; HET-02, HET-03         | SRC-21 = Tamhane (1979) JASA 74:471–480; Dunnett (1980b) JASA 75(372):796–800               | consistent |
| 29             | SR-J / SRC-28; MTO-03                 | SRC-28 includes Dunnett and Tamhane (1991, 1992); MTO-03 = step-up Dunnett–Tamhane (1992)   | consistent |
| 30             | RSM-02; variant-specific follow-up    | RSM-02 permutation/step-down families, `TRANSFER`; no variant adopted by D.3                | consistent |
| 33             | SR-A / SRC-11; OMN-04                 | SRC-11 = Brown and Forsythe (1974), Technometrics; OMN-04                                   | consistent |

Every route points at a source identity and entry that the fixed result already names
for that hold, and D.3 adds no source to the fixed catalogue. The journal, volume and
page details printed in D.3 that go beyond the fixed result (for example the Keuls
Euphytica 1:112–122 and Ryan Psychological Bulletin 57:318–328 spans) are consistent
with the reviewer's recollection of those papers but were not verified against any
printed page: `SOURCE_ACCESS_INCOMPLETE`.

### 4.3 Targeted observations (D.4)

- **D.4.1 Shaffer.** The description of the Section 2 stage denominator (largest
  attainable true-null count compatible with at least the preceding number of false
  hypotheses), the Bonferroni-type proof, the Section 3.1 equivalence-class device
  and the k = 4 attainable set {0, 1, 2, 3, 6} are mathematically coherent with each
  other and with the E.3 computation (Section 6 below). The attribution of these to
  specific printed pages, sections and Table 1 is unverified. The investigator
  boundaries (family-dependent denominator, FWER not FDR, no adjusted-p
  representation adopted, later modifications not frozen) are correctly labelled as
  interpretation and are the appropriate boundaries for a `RES-ONLY` entry.
- **D.4.1 custody statement.** "All six assigned SR-C texts now have recorded
  custody" is consistent with C.2 (11, 12, 13, 14, 18) plus D.2 (22) and with
  Section 17's SR-C source list (SRC-15, 16, 17, 19, Rom, Holland–Copenhaver). The
  sentence that C.5's "Shaffer source absent" is superseded for custody only, not
  for closure, is the correct reading of the commission.
- **D.4.2 distinctions.** The Brown–Forsythe means-versus-variances distinction, the
  Dunnett–Tamhane 1992 step-up versus 1991 step-down distinction, the Ryan 1960
  versus 1959 distinction, the Troendle asymptotic-control caveat and the Šidák
  multivariate-normal scope are each stated as bounded observations with an explicit
  page and an explicit non-claim. They agree with the reviewer's recollection of the
  respective papers; none was verified here. No observation widens a catalogue class.

### 4.4 Follow-up table and disposition statement (D.5)

D.5 correctly repeats C.5's totals (three `CLOSED` including inherited SR-L and two
candidates awaiting formal acceptance; eleven `INPUT_INCOMPLETE`), issues no new
disposition, and keeps the PR #192 five-source approval separate from the six-source
set. The R4 row correctly states that neither arXiv 1211.2481 nor NBS SP 503 is in the
batch.

## 5. Parts E and F — SR-C synthesis and recheck

### 5.1 Evidence layering (E.1, F.1)

E.1 distinguishes recorded primary inspection (C.2/C.3/C.7 for 11, 12, 13, 14, 18;
"not present in this workspace; no new reading of them is claimed"), current primary
inspection (22) and investigator synthesis. F.1 then reports the five older originals
re-supplied to the author workspace with hashes, lengths and page counts matching
C.2, and marks the E.1/E.5 missing-original statements as historical. Every E.2
pinpoint for suppliers 11–18 was compared with the corresponding C.3 row and matches
it exactly (11: pp.751–752 theorem, p.754; 12: pp.800–801; 13: pp.383–385; 14:
pp.663–664 equation (2), Table 1; 18: pp.418–422). F.2 adds new pinpoints (11 p.752,
pp.752–753, p.754; 12 p.801 equation (8); 13 p.384 Section 2 and theorem, p.385
example; 14 p.664 equation (2) and Table 1; 18 p.418, p.419, p.420 Definition 3.1 and
Theorem 3.1, pp.421–422). None of these, and none of the F.1 hash matches, could be
checked here: `SOURCE_ACCESS_INCOMPLETE`. No C.3 statement is contradicted by E.2 or
F.2.

### 5.2 Claim matrix (E.2), commission items 1–8

| Row                       | Commission coverage                                                                                                                         | Repository/logic check                                                                                                                                                                                           | Source check               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| PVL-06 / C-C1 (Simes)     | variant, target, criterion, independence assumption, output boundary and impact stated                                                      | consistent with C.3 row 11; "global test only, not individual strong FWER" is the correct logical boundary for a global intersection test; `RES-ONLY` retained as in fixed Section 8.2                           | `SOURCE_ACCESS_INCOMPLETE` |
| PVL-07 / C-C2 (Hochberg)  | step-up rule, threshold, Simes-validity dependence, adjusted-p gap and impact stated                                                        | consistent with C.3 row 12; correctly narrows the fixed Section 9 wording "any declared finite family … under Simes-type conditions" to "validity for the relevant true-null intersections"; `R3-CAND`† retained | `SOURCE_ACCESS_INCOMPLETE` |
| PVL-08 / C-C3 (Hommel)    | closed-Simes construction, local-test validity, computational-shortcut gap stated                                                           | consistent with C.3 row 13; "invalid local tests are not repaired by closure" is the correct consequence of the closure principle recorded for CLS-01 (C.3 row 15)                                               | `SOURCE_ACCESS_INCOMPLETE` |
| PVL-09 / C-C4 (Shaffer)   | sections cited, Holm-sharpening, valid marginal tests plus correct constraints, no joint-independence requirement, variants deferred to E.3 | logically correct: a Bonferroni-type bound over the true nulls needs no dependence condition (same basis as fixed F-10 for Holm); `RES-ONLY` retained                                                            | `SOURCE_ACCESS_INCOMPLETE` |
| PVL-10 Rom                | step-up with recursively calibrated constants; independence; table/recurrence conflict retained                                             | consistent with C.3 row 14 and C.7; the C.7 recurrence re-run here reproduces 0.001004472598983613 exactly (Section 6)                                                                                           | `SOURCE_ACCESS_INCOMPLETE` |
| PVL-10 Holland–Copenhaver | product-form step-down threshold, stopping rule, t_i meaning, lower-orthant condition not mere positive correlation                         | consistent with C.3 row 18; the two PVL-10 variants remain separate under the shared ID, as C.3 already required                                                                                                 | `SOURCE_ACCESS_INCOMPLETE` |

The closing paragraphs of E.2 (valid marginal tests as the entry point for
distributional assumptions; ordering by observed p-values is not post hoc family
selection; the adjusted-p output gap) are investigator synthesis, labelled as such.
The statement that "the fixed semantic Section 9 lists adjusted p-values for PVL-07
and PVL-08" was verified: Section 9's rows for Hochberg (PVL-07) and Hommel (PVL-08)
list "adjusted p" among outputs, and Section 9 carries no rows for PVL-06, PVL-09 or
PVL-10, so the named output gap is correctly scoped to those two entries.

### 5.3 Shaffer distinctions and reproducible check (E.3)

- **Mathematics.** The recursion `S(k) = ∪_{j=1..k} { C(j,2) + x : x ∈ S(k−j) }`
  with `S(0) = S(1) = {0}` enumerates exactly the sums `Σ C(n_i, 2)` over integer
  partitions `(n_i)` of k, which is the set of attainable numbers of true pairwise
  equality hypotheses among k distributions. The E.3 code asserts equality with a
  direct partition enumeration for k = 2..10 and the assertion holds. The reviewer
  re-derived S(4) = {0, 1, 2, 3, 6} and S(6) = {0, 1, 2, 3, 4, 6, 7, 10, 15} by hand
  from the partitions of 4 and 6 and obtained the same sets. The stage-denominator
  rule `t_j = max { x ∈ S(4) : x ≤ 6 − j + 1 }` gives [6, 3, 3, 3, 2, 1], which is the
  correct count-based denominator sequence for the m = 6 pairwise family under the
  stated rule.
- **Reproduction.** The code block was executed unchanged under Python 3.11.15 and the
  output is byte-identical to the "Observed output" block (`diff` empty).
- **Correspondence to the paper.** Whether the displayed sets equal the printed
  Table 2 rows at p.828, whether the recursion is the paper's equation (3.2), and
  whether Sections 4.1, 4.2, 5 and 6 say what E.3 attributes to them, is
  `SOURCE_ACCESS_INCOMPLETE`. The reviewer's recollection of Shaffer (1986) is
  consistent with the count-based (Section 2) versus identity-sensitive (Section
  4.2) distinction and with an initial-composite-test modification; that recollection
  is not evidence.
- **Boundaries.** E.3 selects no variant, adopts no adjusted-p algorithm, does not
  reproduce the p.830 critical values, and keeps the Scheffé 1969 interaction-footnote
  deletion effective. The statement that a rejection is statistical evidence rather
  than logical knowledge of falsity is the correct reading of the error-control
  argument and is properly labelled interpretation.

### 5.4 Disposition and reopening (E.4)

- **`PARTIAL` against the commission.** The commission defines `INPUT_INCOMPLETE` as
  "required source text cannot be identified or inspected" and `PARTIAL` as "some
  claims are supported but named gaps remain". At the head, all six SR-C texts have
  recorded identity and recorded inspection (C.3 and F for five, D/E for Shaffer), and
  the named gaps are claim gaps, not access gaps. `PARTIAL` is therefore the category
  the commission prescribes, and `CLOSED` is correctly withheld because "all
  decision-bearing source claims" are not yet supported. This is an assessment of
  category consistency; whether the supported claims are in fact supported by the
  printed papers is `SOURCE_ACCESS_INCOMPLETE`.
- **Counts and precedence.** The E.4 table has fourteen rows (SR-A–SR-L, RSM-01,
  RSM-02): `CLOSED` 3 (SR-G, SR-K, SR-L), `PARTIAL` 1 (SR-C), `INPUT_INCOMPLETE` 10.
  Under the commission's precedence (no `NO_GO`; any `INPUT_INCOMPLETE` ⇒ overall
  `INPUT_INCOMPLETE`) the stated overall `INPUT_INCOMPLETE` is correct;
  `SOURCE_SET_READY` is correctly not reached; `NARROW` is correctly unchanged. All
  thirteen non-SR-C rows carry the C.5 disposition unchanged, and F.5 restates the
  same totals.
- **Reopen conditions.** Commission item 8 is satisfied: the reopen paragraph names
  family/equality-constraint changes, relaxation of independence, Simes-validity or
  lower-orthant conditions, marginal-test or sidedness changes, variant substitution,
  output expansion, and artifact or theorem changes. The two PVL-10 variants remain
  separate.

### 5.5 Review instructions (E.5, F.5)

E.5 as updated by F.5 is executable as written except for the source supply, which
is outside the repository. This record follows it: exact head, preserved bytes, role
and provenance recorded, `SOURCE_ACCESS_INCOMPLETE` where an original was
unavailable, separable checks continued, the two output derivations and non-strict
boundaries assessed, diagnostics reproduced, the Rom discrepancy judged without
erasure, `PARTIAL` accuracy reported, new file on a branch starting at the input
head, draft PR only, no unrelated R3/R4 PDFs demanded.

### 5.6 Part F — original recheck and output derivations

- **F.1 custody.** The claim that the five re-supplied files match C.2's hashes,
  lengths and page counts, and the page ranges read and image-checked, are
  `SOURCE_ACCESS_INCOMPLETE`. The statement that the receipt is a duplicate transfer
  and the cumulative count stays 35 is consistent with C.2/D.2 (Section 4.1).
- **F.2 Hochberg derivation.** The expression
  `adjusted p_(i) = min(1, min over j ≥ i of (m−j+1)·p_(j))` is the exact algebraic
  inversion of the printed-as-described step-up rule "reject through the largest j
  with p_(j) ≤ α/(m−j+1)": the hypothesis at rank i is rejected at level α iff some
  j ≥ i has (m−j+1)·p_(j) ≤ α, i.e. iff the derived value is ≤ α. The tie argument is
  correct: for a block of equal p-values at ranks i..i′, the minimum over the block is
  attained at j = i′ because the multiplier (m−j+1) is decreasing in j, so every tied
  rank receives the same adjusted value. F.2 correctly labels this as investigator
  algebra and not as a printed formula, and correctly keeps the error guarantee tied
  to the source's Simes basis. Whether p.801 equation (8) uses the non-strict
  comparison is `SOURCE_ACCESS_INCOMPLETE`.
- **F.2 Hommel derivation.** `s(I) = min(1, min_k |I|·p_I(k)/k)` is the Simes
  adjusted level of the intersection hypothesis on I, and
  `adjusted p_i = max over I ∋ i of s(I)` is the closed-testing adjusted p-value:
  H_i is rejected at α iff every intersection containing i is locally rejected, i.e.
  iff every s(I) ≤ α. This is the correct closure inversion; it is correctly labelled
  an investigator derivation and correctly not extended to the Section 3 logically
  restricted variant. The shortcut as transcribed (largest i such that
  p_(n−i+k) > kα/i for every k = 1..i; reject all if none; else reject p ≤ α/j) uses a
  strict comparison in the search and a non-strict final comparison; F.4's diagnostic
  is what establishes that this shortcut and the closure formula agree on the tested
  grid (below). Whether the shortcut and the theorem are printed as described at
  p.384, and whether the p.385 example prints j = 5 / three rejections and, under
  {1, 2, 3, 4, 6, 10}, j = 4 / five rejections, is `SOURCE_ACCESS_INCOMPLETE`. The
  reviewer notes that {1, 2, 3, 4, 6, 10} is exactly S(5) from E.3, so the
  "five-distribution family" restriction is internally consistent with Part E.
- **F.2 Simes and Holland–Copenhaver.** Both paragraphs are bounded restatements
  consistent with C.3 rows 11 and 18 and with E.2. The H–C warning that deleting
  comparisons changes the needed bounds is the correct consequence of a t_i defined
  over the declared family. All pinpoints `SOURCE_ACCESS_INCOMPLETE`.
- **F.3 Rom.** The rearranged recurrence is the C.7 formula. Exact rational
  arithmetic here reproduces b_10 = 0.001004472598983613… at α = .01, which rounds to
  1.00 × 10⁻³ at three significant digits; so if the printed cell is 1.01 × 10⁻³ as
  F.3 reports from the page image, the conflict is real and not a rounding artefact.
  Whether the cell prints 1.01 × 10⁻³, and whether the other nineteen MH cells match,
  is `SOURCE_ACCESS_INCOMPLETE` (the `printed` values in F.4 are the author's
  transcription). The reviewer's recollection of the widely reproduced Rom constants
  agrees with the α = .05 column as transcribed; recollection is not evidence. F.3
  correctly records the absence of a verified erratum as not proving absence, changes
  no source value, and approves neither value.
- **F.4 diagnostic.** Executed unchanged under Python 3.11.15 and Python 3.12.3. The
  output is identical to the "Observed output" block except for the version line
  (the author ran 3.12.13): 251 multisets (= Σ_{n=1..5} C(n+4, n), recomputed), 1395
  level checks, both equivalences pass; Hommel example general j = 5 / 3 rejections,
  logical j = 4 / 5 rejections; the general adjusted values print as listed; the Rom
  α = .01 row 10 mismatch is the only mismatch reported. The reviewer independently
  recomputed the Hochberg adjusted values for the example (0.021 then 0.0605 for the
  remaining nine, one rejection at .05) and the Hommel general adjusted values from a
  separately written closure loop; both agree with the F.4 functions. The diagnostic
  is correctly described as a finite algebraic regression check, not a proof of FWER.
- **F.5 table.** The three `RESOLVED` rows are accurate as descriptions of what F.2/F.4
  contain (algebraic derivations and a reproduced example), with the right boundary
  (no software, no Section 3 variant, no numerical guarantee adopted); the `OPEN` Rom
  row is accurate; the totals restate E.4 correctly.

## 6. Reproductions and the reviewer's own recomputation

| Item                                         | Method                                                                  | Result                                                                      |
| -------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| E.3 code block                               | executed verbatim, output diffed against the "Observed output" block    | identical                                                                   |
| E.3 sets, independent derivation             | hand enumeration of partitions of 4 and 6; `Σ C(n_i,2)`                 | {0,1,2,3,6}; {0,1,2,3,4,6,7,10,15}: equal to the displayed rows             |
| E.3 k = 4 denominators                       | rule `max{x ∈ S(4): x ≤ 7−j}` applied by hand for j = 1..6              | 6, 3, 3, 3, 2, 1: equal                                                     |
| F.4 code block                               | executed verbatim under 3.11.15 and 3.12.3, output diffed               | identical except the interpreter version line                               |
| F.2 Hochberg adjusted values, example        | separately written formula on the ten p.385 p-values                    | 0.021, then 0.0605 × 9; one rejection at .05; agrees with `hochberg_adjust` |
| F.2 Hommel adjusted values, example          | separately written closure loop                                         | 21/1000, 111/2500, 119/2500, 53/1000, 233/4000, 121/2000 × 5: agrees        |
| F.3 / C.7 Rom recurrence                     | exact rationals, α = .01, n = 10                                        | 0.001004472598983613; three-significant-digit rounding 1.00 × 10⁻³          |
| C.7 code block (unchanged since `9eee0caf…`) | executed verbatim, output diffed against the C.7 transcript             | identical                                                                   |
| Parts A–C, A–D and A–E prefixes              | `cmp -n` against the head blob; SHA-256 of the 213491-byte prefix       | byte-exact; `444fa1d7…f10680`                                               |
| Sixteen hashes                               | grep counts in the prefix and the head blob                             | 0 in the prefix, exactly 1 each in the head blob; 16 distinct               |
| Page-count consistency                       | printed span + cover convention versus PDF page count, all sixteen rows | all sixteen agree                                                           |

## 7. Prior findings and preserved reviews

PRs #187, #188 and #192 reviewed Part C at `37d3ed16…` and `9eee0caf…` for sources
04, 09, 10, 16 and 19. None of their findings concerns Parts D, E or F, and D.1, E.5
and F.5 correctly say so. Their review files live on their own branches and are not in
the head tree; nothing about them is changed by this record. The C.10 statement of
PR #187's carried items (N-4 optional part, N-5, R-N1, R-N2) is unaffected.

## 8. New findings

### BLOCKER

None.

### SHOULD-FIX

None within the separable scope. The absence of a `SHOULD-FIX` here is not a
statement about the six papers; see Section 10.

### NICE-TO-HAVE

- **N-D1 (E.3, cosmetic).** The denominator line hard-codes `6-j+1` for k = 4. Writing
  `comb(4, 2) - j + 1`, or parameterising k, would make the printed rule reproducible
  for other k without editing the literal and would tie the code to the prose rule
  visibly. No numerical consequence.
- **N-D2 (D.2/D.4.1, clarity).** D.4.1 attributes the k = 4 attainable set to Table 1
  and E.3 attributes the k = 3..10 sets to Table 2 at p.828 without stating Table 1's
  page. Adding Table 1's printed page would let the next reviewer with the original
  check both tables from one pinpoint list.
- **N-D3 (E.1, clarity).** E.1 says the Shaffer reading covered "the appendix and
  references" while D.4.1 recorded pp.826–828. Stating in E.1 which pages beyond
  p.828 were read as extracted text only (as opposed to the p.827–830 image check)
  would make the extraction-reliability caveat of D.4.1 apply unambiguously to the
  whole read range.
- **N-D4 (D.3, bibliography).** The D.3 rows for 23, 24, 25, 32, 35 and 36 print
  journal volume and page spans that are not in the fixed semantic result's SRC-29 or
  SRC-36 rows. They are consistent with the reviewer's recollection, but a future
  reviewer with the files should confirm them, because those spans are the pinpoint
  basis for the later SR-F/SR-H work. This is a follow-up note, not a defect.
- **N-F1 (F.2, clarity).** Both derived formulas cap at 1, and F.2 calls the cap an
  "explicit output convention". For inputs in [0, 1] the cap is never active: the
  Hochberg minimum includes the j = m term, which equals p_(m) ≤ 1, and each Simes
  local value includes the k = |I| term, which equals the largest p-value in I ≤ 1.
  Saying so would prevent a later reader from treating the cap as a decision-bearing
  choice (compare the R-N1 clarification carried from PR #187 for the BH adjusted
  value).

## 9. Repository validation

Executed in this session's clone with the pinned dependencies, at `fb1a2f64…`, at
`eb6c0b26…`, and again after adding this file at `eb6c0b26…`:

| Command                                                                                              | At `fb1a2f64…` and `eb6c0b26…`               | With this file                          | Exit |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | --------------------------------------- | ---: |
| `pnpm install --frozen-lockfile`                                                                     | "Done in 5.5s"                               | (same install)                          |    0 |
| `pnpm format:check`                                                                                  | "All matched files use Prettier code style!" | same                                    |    0 |
| `pnpm lint:markdown`                                                                                 | 355 files, 0 issues                          | 356 files, 0 issues                     |    0 |
| `node --import tsx tooling/src/validate.ts`                                                          | "… are clean."                               | same                                    |    0 |
| `git diff --check fb1a2f647d3157083a1aaceee207b75624385480 eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4` | no output (also `6f067962…`→`fb1a2f64…`)     | (review commit also checked, no output) |    0 |

No aggregate `pnpm check` was run; unrelated suites were not repeated. A clean
repository check is not evidence of methodological or source correctness.

## 10. Verdicts

| Determination                                                                                                                                                                                                                                     | Verdict                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source-dependent content (D.2 and F.1 digests, D.3 spans beyond the fixed result, D.4, E.2 and F.2 pinpoints, E.3 correspondence to the paper, F.3 printed cell, F.4 transcribed table)                                                           | **`SOURCE_ACCESS_INCOMPLETE`** — none of the six SR-C originals or the sixteen Part D files was available; no page was inspected; no claim is endorsed or rejected on source grounds                                                                              |
| Separable content (identities, prefixes, hash bookkeeping, count arithmetic, catalogue routing, commission conformance, logical coherence of the stated boundaries, E.3 mathematics, F.2 algebra, C.7/E.3/F.4 transcripts, governance boundaries) | **`GO`** — 0 `BLOCKER`, 0 `SHOULD-FIX`, 5 `NICE-TO-HAVE`                                                                                                                                                                                                          |
| `SR-C` proposed `PARTIAL` (F.5 question)                                                                                                                                                                                                          | **accurate** as a category: identity and inspection recorded for all six texts; output gaps closed by correctly labelled investigator algebra; one named printed-source conflict open; correctly not `CLOSED`; source-level correctness unverified by this record |
| Other thirteen dispositions, overall `INPUT_INCOMPLETE`, `NARROW`                                                                                                                                                                                 | carried unchanged from C.5; precedence applied correctly                                                                                                                                                                                                          |
| Independence — context                                                                                                                                                                                                                            | `ESTABLISHED` (Section 11)                                                                                                                                                                                                                                        |
| Independence — model level (RFC rule 2)                                                                                                                                                                                                           | `PENDING` (Section 11); not a source-access limitation                                                                                                                                                                                                            |
| Formal hold acceptance                                                                                                                                                                                                                            | `NOT PERFORMED`; not authorized by this record                                                                                                                                                                                                                    |

**What would permit a later `CLOSED` proposal (F.5 question).** Two things, in
order. First, a source-level independent pass at this exact head with the six
originals in the reviewer's workspace, confirming the C-C1–C-C5 pinpoints, the
non-strict boundaries described in F.2, and the Rom Table 1 cell as printed. Second,
an explicit adjudication of the Rom conflict as the commission requires ("record the
conflict and require separate adjudication"): a bounded resolution consistent with the
commission would record that the PVL-10 Rom characterization rests on equation (2)
and the procedure's structure, that the printed table is not adopted as a numerical
authority, and that any later constant is computed from the recurrence with the
printed cell retained as a conflicting printed value. If the steward records that
adjudication and the source-level pass supports the remaining claims, the hold's
decision-bearing claims would all be directly supported and `CLOSED` could be
proposed; without the adjudication, `PARTIAL` is the ceiling. This record does not
make that adjudication.

**What is needed to convert `SOURCE_ACCESS_INCOMPLETE` into a content verdict:**
supply the six originals (11, 12, 13, 14, 18, 22) to a reviewer session, or an
environment whose egress policy admits a publisher or open-repository copy of each
paper, and re-run E.5/F.5 at this same exact head. The separable checks above need
not be repeated unless the head changes.

## 11. Independence evidence and its limits

Kept separate from the content verdict.

- **Established: separate context and non-involvement.** This session began on
  2026-09-07T08:51:15Z, after Part E was committed (08:48:24Z) and after PR #192's
  commit, from a fresh clone of the public repository, with no access to any
  authoring or prior review session's context and no supplied files. Part F was
  committed by the author (08:56:17Z) while this session was running; this session
  had no part in it and re-pinned to it afterwards (Section 1). It authored none of
  the reviewed material.
- **Established: reviewer-side model identifier.** `claude-fable-5-1` (configured and
  last-served), read from the session-management service during the review. Recorded
  as reviewer session testimony from that service, not as provider-side telemetry.
- **Recorded, not verified: authoring-side account for this increment.** D.1, E.1 and
  the PR text state that Parts D, E and F were prepared "with OpenAI assistant
  support" in "the continuing author context"; E.1 also says the earlier
  human-responsibility and partial-Claude account for prior work is retained. Taken as
  written, the authoring assistance for this increment and the reviewing assistance
  here come from different providers; that is the record's testimony, is not
  verifiable from Git objects, and the earlier unreconciled accounts noted in PR #192
  Section 11 still apply to the prior parts.
- **Consequence.** RFC rule 2's separate-model criterion is not marked satisfied by
  this record. The steward's acceptance record should state which authoring account it
  relies on. This is an acceptance prerequisite, not missing source access, and it does
  not alter the content findings.
- **Human responsibility.** This text was produced in an LLM-assisted review session at
  the user's instruction; accountable human responsibility for commissioning and acting
  on it rests with the steward. No human authorship of this text is claimed.

## 12. Non-promotions and remaining work

- Supply of the six SR-C originals to a reviewer session and a source-level pass at
  this exact head (Section 10). The recorded C.3 and F.2 readings of 11, 12, 13, 14
  and 18 have still not been independently checked by any review PR.
- Steward adjudication of the Rom Table 1 conflict as described in Section 10;
  nothing here resolves it.
- SR-A, SR-B, SR-F, SR-H, SR-I, SR-J and RSM-02 work enabled by the Part D custody
  remains open exactly as D.5 states; the R4 source gaps (arXiv 1211.2481, NBS SP 503,
  PR #184 Section 5.4) are untouched.
- Steward acceptance of SR-K and SR-G per PR #192 Section 12, and every steward
  decision, remain outside this record.
- This record is a review input only; it is not an authoritative artifact. No source
  PDF or full-text extraction is committed with it.

## Public-artifact self-check

- [x] Only the public repository at the fixed head, parents and base, the live PR
      metadata (read at start, mid-review when the head moved, and at the end), the
      pinned commission and the fixed semantic result were used; no private repository,
      work item, or product implementation was read; no PDF was available or used.
- [x] This file is the only change in the review commit; the reviewed result, both
      commissions, the preserved reviews, and every authoritative artifact are
      unchanged.
- [x] Attribution is role-based. Material process provenance (separate LLM-assisted
      review session, reviewer model identifier, environment, egress denials, tooling,
      date, hashes, head movement) is disclosed; no unsupported human authorship or
      non-involvement is implied.
- [x] Source facts, recorded author evidence, reviewer recollection, reviewer
      inference, findings, the content verdicts, the independence status and the
      acceptance status are kept separate.
- [x] No merge, hold update, Issue change, discussion opening, method adoption,
      ratification, or release was performed, and none is authorized by this record.

RELEASE 3 PARTS D–F INDEPENDENT EXACT-HEAD REVIEW COMPLETE - SOURCE-DEPENDENT CONTENT SOURCE_ACCESS_INCOMPLETE (NO ORIGINALS AVAILABLE) - SEPARABLE CHECKS GO - SR-C PARTIAL ACCURATE, NOT CLOSED - MODEL-LEVEL INDEPENDENCE PENDING - FORMAL ACCEPTANCE NOT PERFORMED - NOT MERGE APPROVAL - NOT HOLD CLOSURE - NOT PROTOCOL ADOPTION
