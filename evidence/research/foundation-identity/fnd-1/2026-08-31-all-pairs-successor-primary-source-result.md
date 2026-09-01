# FND-1 All-Pairs Successor Primary-Source Result — Pass A

**Status: informative primary-source investigation; non-normative; not
adopted.** Scope limited to the successor-source requirement retained after
the narrowed closure of `FND1-H03`. This pass selects no all-pairs procedure,
defines no method identifier, authorizes no implementation, closes no part of
the FND-1 Research Gate, and affects no release.

## 1. Identity, input, access, and independence checks

| Field                                                                                     | Value                                                                                                     |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Role                                                                                      | independent external primary-source investigator (Pass A)                                                 |
| Investigation and access date                                                             | 2026-08-31                                                                                                |
| Commission commit SHA                                                                     | `34b5362338de035e2891f1525b63d7b69157a22b`                                                                |
| Commission path                                                                           | `evidence/research/foundation-identity/fnd-1/2026-08-31-all-pairs-successor-source-closure-commission.md` |
| Inputs read before source work                                                            | this commission only, in full                                                                             |
| Baseline records of Section 2                                                             | not opened by this pass                                                                                   |
| Pass B result, reconciliations, review branches, Release 2 material, private repositories | not opened                                                                                                |
| Repository operation                                                                      | none; no file change, commit, push, or branch is performed or claimed                                     |
| Report form                                                                               | one complete Markdown report returned to the steward                                                      |

Access-environment record. The investigation environment's outbound network
policy permits a general-purpose public search index but blocks direct
retrieval from the scholarly hosts holding the candidate texts. Every
full-text and catalog-page retrieval attempt failed at the network layer:

| Attempt target                                                          | Method                      | Outcome                          |
| ----------------------------------------------------------------------- | --------------------------- | -------------------------------- |
| `www.jstor.org/stable/3001469` (Kramer 1956)                            | direct fetch and page fetch | blocked by network egress policy |
| `doi.org/10.2307/3001469` (Kramer 1956 DOI)                             | direct fetch                | blocked                          |
| `projecteuclid.org` article page `10.1214/aos/1176346392` (Hayter 1984) | direct fetch and page fetch | blocked                          |
| `archive.org` (search for archival copies)                              | direct fetch                | blocked                          |
| `onlinelibrary.wiley.com` (Biometrics publisher route)                  | direct fetch                | blocked                          |
| `taylorfrancis.com` (Collected Works publisher route)                   | direct fetch                | blocked                          |

The public search index was used only to locate candidate texts and to read
catalog-type bibliographic entries. Search-result fragments, abstracts,
encyclopedia pages, blog posts, and secondary reports were **not** used as
substitutes for primary sources anywhere in this report, in accordance with
the commission's source-access rules. No primary source was opened in full;
therefore no decision-bearing source claim is verified in this pass.
Quotation count from every candidate source: zero words (nothing was
inspected to quote).

## 2. Executive disposition

**Disposition: `DEFER`.**

No candidate primary text could be inspected in full from this environment.
Under the commission's access rules, decision-bearing source claims require
full text with exact pinpoints; every such claim in this pass is therefore
`NOT_VERIFIABLE`, and the retained successor-source requirement cannot be
closed or narrowed by this pass. The pass completes everything that does not
require full text: a source-discovery and candidate-identity record, a
version-fixed register of access attempts, the claim structure that
inspection must resolve, the misattribution risks it must survive, and an
exact acquisition list for the next attempt.

## 3. Source-discovery and source-identity record

Discovery method: the two commissioned procedure families were traced
through catalog-type bibliographic entries surfaced by a public search
index (publisher catalog metadata, journal volume/issue listings, and a
peer-reviewed memorial survey's citation apparatus used strictly as
bibliographic records). Identity fields below are supported at
bibliographic-record level only; no inspected artifact confirms them, so
they remain **candidate identities to be verified at acquisition**, exactly
as the commission requires them to be treated.

1. **Candidate for the Studentized-range all-pairs procedure commonly
   associated with Tukey.** John W. Tukey, "The Problem of Multiple
   Comparisons," 1953. Bibliographic records consistently describe this as
   an **unpublished mimeographed manuscript** (Princeton University),
   circulated privately and later printed as the opening work of _The
   Collected Works of John W. Tukey, Volume VIII: Multiple Comparisons,
   1948–1983_ (Chapman and Hall, 1994, H. I. Braun, ed.). Two identity
   consequences follow and are recorded rather than assumed: (a) the
   commonly cited "Tukey (1953)" is not a peer-reviewed journal article,
   and any inspection must use the archival Collected Works printing or an
   authenticated copy of the manuscript; (b) publication status alone
   already shows that a modern eponym ("Tukey HSD") cannot be presumed to
   name one continuously published text.
2. **Candidate for the unequal-sample-size extension commonly associated
   with Kramer.** C. Y. Kramer, "Extension of Multiple Range Tests to Group
   Means with Unequal Numbers of Replications," _Biometrics_ 12(3), 1956,
   pp. 307–310; stable identifiers JSTOR `3001469`, DOI `10.2307/3001469`.
   The title's own wording ("multiple range tests") indicates the text may
   be framed around range-test methodology generally rather than around one
   Studentized-range procedure; which procedures it extends, and whether it
   proves anything or only proposes, are exactly the questions full text
   must answer.
3. **Candidate later formal source for the unequal-size guarantee.**
   A. J. Hayter, "A Proof of the Conjecture that the Tukey-Kramer Multiple
   Comparisons Procedure is Conservative," _The Annals of Statistics_
   12(1), 1984, pp. 61–75; DOI `10.1214/aos/1176346392`. Its
   bibliographic-record title alone indicates (a) that a conservativeness
   claim for the unequal-size procedure was still a **conjecture** needing
   proof as late as 1984, and (b) that the proof, if the text bears out its
   title, belongs to this later source and not to the 1956 text. Both
   consequences are recorded as identity-level signals to verify, not as
   verified content.

Resolution of the commission's Section 5 questions at the achievable level:

| #   | Question                                                     | Resolution in this pass                                                                                                          |
| --- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Work commonly cited as Tukey's all-pairs procedure           | Candidate identity recorded (1953 unpublished manuscript / 1994 archival printing); full-text verification `NOT_VERIFIABLE` here |
| 2   | Work commonly cited as Kramer's extension                    | Candidate identity recorded (Kramer 1956, _Biometrics_ 12(3):307–310); full-text verification `NOT_VERIFIABLE` here              |
| 3   | Tests, simultaneous confidence procedures, or both           | `NOT_VERIFIABLE` without full text                                                                                               |
| 4   | Whether "Tukey HSD" accurately names every inspected variant | Unresolvable without inspection; publication-status finding above already cautions against one-label identity                    |
| 5   | Later sources required for the modern implemented procedure  | Candidate: Hayter 1984 for the unequal-size guarantee; requirement status `NOT_VERIFIABLE` without full text                     |

## 4. Version-fixed primary-source register

| Source (candidate identity)                        | Stable identifier                                                                     | Publication status (record level)              | Access attempts (2026-08-31)                                     | Inspected artifact | Hash |
| -------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------- | ------------------ | ---- |
| Tukey, "The Problem of Multiple Comparisons," 1953 | none printed; archival printing in Collected Works Vol. VIII (Chapman and Hall, 1994) | unpublished manuscript; archival printing 1994 | no online full text located; publisher and archive hosts blocked | none               | none |
| Kramer, _Biometrics_ 12(3):307–310, 1956           | JSTOR `3001469`; DOI `10.2307/3001469`                                                | published journal article                      | JSTOR and DOI routes blocked at network layer                    | none               | none |
| Hayter, _Ann. Statist._ 12(1):61–75, 1984          | DOI `10.1214/aos/1176346392`                                                          | published journal article                      | publisher article page blocked at network layer                  | none               | none |

No SHA-256 values are recorded because no artifact was received or
inspected. Nothing in this register is promoted beyond bibliographic-record
level.

## 5. Atomic claim-evidence ledger

Every decision-bearing claim this pass was commissioned to establish is
recorded with its status. No row is supported by inspected text.

| #   | Atomic claim to establish                                                                                              | Pinpoint | Status           |
| --- | ---------------------------------------------------------------------------------------------------------------------- | -------- | ---------------- |
| S1  | The 1953 manuscript defines an all-pairwise-mean-difference comparison family                                          | none     | `NOT_VERIFIABLE` |
| S2  | The 1953 manuscript states a simultaneous confidence and/or family-wise error guarantee for that family                | none     | `NOT_VERIFIABLE` |
| S3  | The 1953 manuscript's constants arise from the Studentized-range distribution, with stated sidedness and level         | none     | `NOT_VERIFIABLE` |
| S4  | The 1953 manuscript's assumptions (independence, normality, common variance, balance, variance estimation)             | none     | `NOT_VERIFIABLE` |
| S5  | The archival 1994 printing reproduces the 1953 manuscript without semantic alteration                                  | none     | `NOT_VERIFIABLE` |
| S6  | Kramer 1956 proposes an unequal-replication modification, and for which range-test family it does so                   | none     | `NOT_VERIFIABLE` |
| S7  | Kramer 1956 proves exact control, proves conservative control, argues an approximation, or only proposes               | none     | `NOT_VERIFIABLE` |
| S8  | Kramer 1956's assumptions and its balanced-case relationship to the 1953 construction                                  | none     | `NOT_VERIFIABLE` |
| S9  | Hayter 1984 proves conservativeness of the unequal-size procedure, and under exactly which conditions                  | none     | `NOT_VERIFIABLE` |
| S10 | Which text, if any, the modern procedure usually implemented as "Tukey HSD / Tukey-Kramer" actually requires           | none     | `NOT_VERIFIABLE` |
| S11 | Which statements in each text concern the mathematical construction versus printed tables or computational instruments | none     | `NOT_VERIFIABLE` |
| S12 | Which later corrections, refinements, or renamed variants must remain attributed to their own sources                  | none     | `NOT_VERIFIABLE` |

## 6. Chronology and variant-separation table

Recorded as the **candidate** chronology that inspection must confirm or
refute; only the first row rests on an already-recorded boundary.

| Period | Item                                                                           | Separation duty                                                                                                       | Status                                                              |
| ------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1949   | Tukey, _Biometrics_ 5(2):99–114                                                | Recorded boundary: does **not** contain the Studentized-range all-pairs procedure or the unequal-size extension       | Boundary recorded by the commissioning chain; not re-inspected here |
| 1953   | Tukey, unpublished manuscript                                                  | Candidate origin of the all-pairs Studentized-range procedure; must not be conflated with 1949 or with later variants | `NOT_VERIFIABLE`                                                    |
| 1956   | Kramer, _Biometrics_ 12(3)                                                     | Candidate origin of the unequal-replication modification; proof status unknown                                        | `NOT_VERIFIABLE`                                                    |
| 1984   | Hayter, _Ann. Statist._ 12(1)                                                  | Candidate origin of the conservativeness **proof** for the unequal-size procedure                                     | `NOT_VERIFIABLE`                                                    |
| 1994   | Collected Works Vol. VIII printing                                             | Archival publication of the 1953 manuscript; fidelity to the manuscript must itself be checked                        | `NOT_VERIFIABLE`                                                    |
| later  | Heteroscedastic and other renamed variants (e.g. separate-variance procedures) | Outside scope except as boundary statements; must never be attributed to the texts above                              | Excluded by commission                                              |

## 7. Required claim matrix

One row per candidate source. Because no text was inspected, only
record-level identity fields are filled; every content field is explicitly
not verifiable in this pass.

| Field                     | Tukey 1953 (candidate)                                                                                              | Kramer 1956 (candidate)                                                                 | Hayter 1984 (candidate)                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Source identity           | Unpublished 1953 manuscript; archival printing: Collected Works Vol. VIII, Chapman and Hall, 1994; no artifact hash | _Biometrics_ 12(3):307–310; JSTOR `3001469`; DOI `10.2307/3001469`; no artifact hash    | _Ann. Statist._ 12(1):61–75; DOI `10.1214/aos/1176346392`; no artifact hash               |
| Procedure object          | not verifiable in this pass                                                                                         | not verifiable in this pass                                                             | not verifiable in this pass                                                               |
| Member set                | not verifiable                                                                                                      | not verifiable                                                                          | not verifiable                                                                            |
| Design                    | not verifiable                                                                                                      | record-level signal: unequal replications named in the title; conditions not verifiable | record-level signal: unequal-size procedure named in the title; conditions not verifiable |
| Variance model            | not verifiable                                                                                                      | not verifiable                                                                          | not verifiable                                                                            |
| Distributional assumption | not verifiable; no pinpoint exists                                                                                  | not verifiable; no pinpoint exists                                                      | not verifiable; no pinpoint exists                                                        |
| Guarantee                 | not verifiable                                                                                                      | not verifiable (proof-versus-proposal is the open question)                             | record-level signal: title asserts a proof of conservativeness; not verifiable            |
| Sidedness                 | not verifiable                                                                                                      | not verifiable                                                                          | not verifiable                                                                            |
| Later-work boundary       | must not absorb 1956, 1984, or heteroscedastic variants                                                             | must not absorb the 1953 construction or the 1984 proof                                 | must not be backdated onto 1953 or 1956                                                   |
| Evidence status           | not verifiable                                                                                                      | not verifiable                                                                          | not verifiable                                                                            |

Absence findings: none are made in this pass, because absence claims also
require full-text inspection with a stated searched range; no page or
section range was searchable.

## 8. Direct comparison with the Tukey (1949) boundary

The commission records, as the completed original-paper pass's finding, that
Tukey (1949) does not contain the Studentized-range all-pairs procedure or
the unequal-size extension, and it instructs this pass not to attribute the
later procedures to that paper. This pass performed no new inspection of
Tukey (1949) and makes no new claim about it. Nothing located at
bibliographic-record level contradicts the recorded boundary, and the
candidate chronology above is consistent with it: the all-pairs procedure's
candidate origin is the separate 1953 manuscript, not the 1949 article. The
boundary therefore stands unchanged, and this pass adds no strength to it
and takes none from it.

## 9. Overclaim and misattribution attacks

The attacks below are the ones the eventual evidence must survive. None can
be adjudicated in this pass; each is recorded with the failure it would
represent.

| Attack candidate                                                                                | Why it must be tested                                                                           | Status here          |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------- |
| Treating "Tukey HSD" as the name of one continuously published text                             | The candidate origin is an unpublished manuscript with a 1994 archival printing                 | `NOT_VERIFIABLE`     |
| Citing "Tukey (1953)" as if it were a peer-reviewed journal publication                         | Publication status is part of source identity under this commission                             | `NOT_VERIFIABLE`     |
| Attributing the unequal-size extension to Tukey, or the balanced construction to Kramer         | Family attribution is the core of the retained requirement                                      | `NOT_VERIFIABLE`     |
| Attributing a conservativeness **proof** to Kramer 1956                                         | The candidate record indicates the proof question was still open until a later source           | `NOT_VERIFIABLE`     |
| Backdating the 1984 proof's conditions onto the 1953 or 1956 texts                              | Each text's own assumptions must carry their own pinpoints                                      | `NOT_VERIFIABLE`     |
| Assuming two-sidedness, common variance, or balance without pinpoints                           | The commission requires exact wording for each assumption                                       | `NOT_VERIFIABLE`     |
| Treating printed tables or computational instruments as the mathematical guarantee              | The commission separates constructions from instruments                                         | `NOT_VERIFIABLE`     |
| Substituting the archival 1994 printing for the manuscript without checking editorial fidelity  | The printing is the accessible artifact; fidelity is a checkable claim, not an assumption       | `NOT_VERIFIABLE`     |
| Using secondary surveys, encyclopedias, textbooks, or software documentation as source evidence | Explicitly prohibited by the commission; also the only material reachable from this environment | avoided in this pass |

No positive claim in this report exceeds bibliographic-record level, and no
secondary account has been upgraded to primary evidence.

## 10. Successor-source disposition

**`KEEP_OPEN`.**

The retained successor-source requirement for the all-pairs and unequal-size
procedures cannot be closed, and cannot even be narrowed, without full-text
inspection of the candidate texts. No inspected evidence exists in this pass
to support `CLOSE` or `NARROW_AND_CLOSE`.

## 11. Residual holds and exact next sources

The requirement remains exactly as retained. The next attempt needs the
following artifacts, in full text, with printed-page pinpoints and, where
files are received, artifact hashes:

1. _The Collected Works of John W. Tukey, Volume VIII: Multiple
   Comparisons, 1948–1983_ (Chapman and Hall, 1994, H. I. Braun, ed.) — the
   archival printing of "The Problem of Multiple Comparisons" (1953), to
   establish the all-pairs family, guarantee, constants, sidedness, and
   assumptions, plus a fidelity statement for the printing itself; an
   authenticated copy of the mimeographed manuscript is an acceptable
   substitute.
2. Kramer, _Biometrics_ 12(3):307–310, 1956 (JSTOR `3001469`,
   DOI `10.2307/3001469`) — to establish exactly what the unequal-replication
   modification proposes, for which tests, and with what argument.
3. Hayter, _The Annals of Statistics_ 12(1):61–75, 1984
   (DOI `10.1214/aos/1176346392`) — to establish where the unequal-size
   guarantee is actually proved and under which conditions.
4. Only if items 1–3 leave the balanced-case guarantee without a printed
   proof: the additional primary text that the inspected sources themselves
   identify for that proof, resolved from their own citations rather than
   from modern eponyms.

Practical access note for the steward: this environment reaches a public
search index but no scholarly full-text host; the earlier multiplicity pass
in this research package was completed after the steward supplied the
original files directly, and the same supply route would unblock every
`NOT_VERIFIABLE` row above.

## 12. Public-artifact and sanitization self-check

- [x] Only the commission was read before and during source work; the
      Section 2 baseline records, Pass B material, reconciliations, review
      branches, Release 2 material, and private repositories were not
      opened.
- [x] No repository file was changed and no commit, push, or branch was
      performed or claimed.
- [x] No search fragment, abstract, encyclopedia, blog, textbook, or
      secondary report was used as decision-bearing evidence; such material
      was used only to locate sources and read bibliographic records, and is
      labeled as such.
- [x] Every decision-bearing source claim is marked `NOT_VERIFIABLE`; no
      content was reconstructed from memory or from secondary accounts.
- [x] Source inaccessibility did not stop the pass; all accessible work was
      completed and the access failures are recorded precisely.
- [x] Quotations used: none; the per-source 25-word limit is satisfied
      trivially.
- [x] The twelve required sections appear in the commissioned order, the
      disposition vocabulary is drawn only from the permitted sets
      (`DEFER`; `KEEP_OPEN`), and the required claim matrix and ledgers are
      present.
- [x] Attribution is role-based only ("independent external primary-source
      investigator"); no drafting or investigation software, service,
      provider, or mechanism is recorded or implied; no human authorship is
      claimed.
- [x] Nothing here selects an all-pairs procedure, method identifier,
      default, tolerance, schema, API, implementation, or release change,
      and nothing closes any FND-1 hold or the Research Gate.

FND-1 ALL-PAIRS SUCCESSOR PRIMARY-SOURCE PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION
