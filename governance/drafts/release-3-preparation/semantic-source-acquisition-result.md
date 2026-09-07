# Release 3 Semantic Source-Acquisition Result

**Status: informative source-acquisition result; non-normative; not adopted.** This
report is the completed output of the
[semantic source-acquisition commission](semantic-source-acquisition-commission.md).
It selects no procedure, Contract, identifier, schema, Public Check, implementation,
or release outcome. It does not open public discussion, change the fixed semantic
result, adopt its catalogue, or authorize implementation. It requires independent
exact-head primary-source review before any hold, resampling source gap,
`SOURCE_SET_READY` state, or public-opening gate is treated as closed.

**Overall disposition after the latest pass: `INPUT_INCOMPLETE`** (Pass 2, Section
B.12). The fixed 49-entry catalogue, its `NARROW` program disposition, and both reviewed
`TRANSFER` dispositions are preserved unchanged.

## Pass ledger

This file records more than one acquisition pass. Each pass is a distinct record with its
own date, routes, inspected artifacts, and dispositions; a later pass supersedes an
earlier disposition only where it says so and never rewrites the earlier record.

| Pass | Date (UTC)                 | Input                                                    | Inspected | Dispositions                                                     | Overall            | Where             |
| ---- | -------------------------- | -------------------------------------------------------- | --------- | ---------------------------------------------------------------- | ------------------ | ----------------- |
| 1    | 2026-09-04 (first attempt) | egress-restricted research environment; no supplied copy | 0         | 14 × `INPUT_INCOMPLETE`; no hold closed                          | `INPUT_INCOMPLETE` | Sections 1–13     |
| 2    | 2026-09-04 (later, 04:46+) | lawfully supplied source packet (three artifacts)        | 3         | SR-L `CLOSED`; 13 × `INPUT_INCOMPLETE`; no `PARTIAL`, no `NO_GO` | `INPUT_INCOMPLETE` | Part B (B.1–B.15) |

Sections 1–13 below are the Pass 1 record, preserved verbatim; its statements such as
"No hold changes state" describe Pass 1 only.

## 1. Repository identity

### 1.1 Identity gate

Every expected value was re-derived from Git objects in the working clone before any
source work began. Nothing was taken on trust from the execution instruction text.

| Check                                                                              | Expected                                                        | Observed                                                                                             | Result |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------ |
| Containing commit exists and is a commit object                                    | `65a53a4f2e54c691ccd76f71814c5a6e507f0046`                      | `git cat-file -t` → `commit`; sole parent `317d19b826c7bbb81b1301fc3ed54c6634c4425c`                 | match  |
| Containing tree                                                                    | `de5075e4045b5c04ee88682154b12fc74310069a`                      | `git rev-parse 65a53a4^{tree}` → `de5075e4…`                                                         | match  |
| Operative commission blob (`semantic-source-acquisition-commission.md`)            | `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                      | `git ls-tree` at `65a53a4` → `3c7ddcc6…`                                                             | match  |
| Preparation README blob at the containing commit                                   | `97ffd65f4136c476042ddc3f25fafd3a4a27a861`                      | `git ls-tree` at `65a53a4` → `97ffd65f…`                                                             | match  |
| Semantic input snapshot commit                                                     | `7bd9c5ab854777c3e99e624d9d2ed62731228852`                      | `git cat-file -t` → `commit`                                                                         | match  |
| Semantic input snapshot tree                                                       | `f0436f5784dbe34d4c150893c20a60f0431c5d90`                      | `git rev-parse 7bd9c5a^{tree}` → `f0436f57…`                                                         | match  |
| Semantic result blob (`semantic-research-result.md`) at `7bd9c5a`                  | `8f21526040924b891f64724c2d0fde9ea94eff92`                      | `git ls-tree` → `8f215260…`; identical blob at `65a53a4`                                             | match  |
| Original semantic commission blob (`semantic-research-commission.md`) at `7bd9c5a` | `c6760efc8450efe5fe2da6ccce2b2fac4846c066`                      | `git ls-tree` → `c6760efc…`; identical blob at `65a53a4`                                             | match  |
| Preserved full review blob                                                         | `fc61decb017821c403841a6db822ccd5e5b7233d`                      | blob exists; path `review-inputs/r3-independent-multigroup-semantics/REVIEW-RESULT.md` at both pins  | match  |
| Preserved repair review blob                                                       | `e646429582d206d5299ce5ff1d0c2b8978323cd3`                      | blob exists; path `review-inputs/r3-independent-multigroup-semantics-repair/REVIEW-RESULT.md`        | match  |
| Preserved final-repair review blob                                                 | `395054fd1e2f22a5ad63460b86be0394de429605`                      | blob exists; path `review-inputs/r3-independent-multigroup-semantics-final-repair/REVIEW-RESULT.md`  | match  |
| Snapshot `7bd9c5a` does not contain the operative commission                       | absent                                                          | `git ls-tree 7bd9c5a governance/drafts/release-3-preparation/` lists four files, no acquisition file | match  |
| Diff `7bd9c5a..65a53a4`                                                            | commission added; README revised; nothing else                  | 2 paths: `README.md` (+/−), `semantic-source-acquisition-commission.md` (+165); no other path        | match  |
| Neutral result branch `research/r3-semantic-source-acquisition-65a53a4` at start   | points at `65a53a4…` with no unprocessed difference from `main` | remote ref → `65a53a4f…`; `git diff --stat origin/main <branch>` empty                               | match  |

Identity gate outcome: **passed**. Source work proceeded from the containing commit;
every decision-bearing comparison below is made against the semantic input snapshot
(`7bd9c5a`, blob `8f215260…`).

### 1.2 Repository inputs read in full at `65a53a4`

| Input                                                                                                                                            | Blob                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `AGENTS.md`                                                                                                                                      | `94dbfdcec7d099f492b08d287dfdd41d876f08fa` |
| `CHARTER.md`                                                                                                                                     | `1dead95488bae31f80f25424bb3a5515fda119fb` |
| `AUTHORITY.md`                                                                                                                                   | `7b55e8ba6698d69431d952945a9253c2331122d0` |
| `governance/RFC.md`                                                                                                                              | `9fa3bdd2e273ed9569385e34bce0bbef2559b131` |
| `governance/drafts/release-3-preparation/README.md`                                                                                              | `97ffd65f4136c476042ddc3f25fafd3a4a27a861` |
| `governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md`                                                              | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` |
| `governance/drafts/release-3-preparation/semantic-research-commission.md`                                                                        | `c6760efc8450efe5fe2da6ccce2b2fac4846c066` |
| `governance/drafts/release-3-preparation/semantic-research-result.md` (fixed input)                                                              | `8f21526040924b891f64724c2d0fde9ea94eff92` |
| `review-inputs/r3-independent-multigroup-semantics/REVIEW-RESULT.md`                                                                             | `fc61decb017821c403841a6db822ccd5e5b7233d` |
| `review-inputs/r3-independent-multigroup-semantics-repair/REVIEW-RESULT.md`                                                                      | `e646429582d206d5299ce5ff1d0c2b8978323cd3` |
| `review-inputs/r3-independent-multigroup-semantics-final-repair/REVIEW-RESULT.md`                                                                | `395054fd1e2f22a5ad63460b86be0394de429605` |
| `governance/drafts/release-3-independent-multigroup-rfc.md` (boundary context only)                                                              | `906c09d921d5f8e15563824f45c86b318d905e20` |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-supplied-completion-result.md` (record-format precedent only) | `236cd949b99b558e207082c74832edf158f3839d` |

Investigation date: 2026-09-04. Investigator role: source-acquisition investigator for
the Release 3 semantic lane; did not author the fixed semantic result, either
commission, any preserved review, or any implementation. No private repository,
work-item system, or product implementation was read.

### 1.3 Inspected source artifact identity

**No primary-source artifact was inspected in this pass.** The commission requires,
for each inspected artifact, its bibliographic identity, acquisition route,
inspection date, SHA-256, and printed pinpoints. Because no artifact could be
acquired (Section 2), there is no inspected-artifact register, no SHA-256, and no
pinpoint to report. The eight previously inspected artifacts SRC-01 through SRC-08
(fixed result Section 2.1) are not repository contents and were not available here;
they are neither re-inspected nor re-hashed by this report, and no claim below rests
on re-reading them.

## 2. Acquisition log

All attempts were made on 2026-09-04 from the research environment described in
Section 2.1. Every route is listed, including the ones that failed and the ones that
were reachable but carried no primary text.

### 2.1 Environment

Outbound HTTPS from the environment passes through a mandatory local egress proxy
that decides per host whether to open a `CONNECT` tunnel. Proxy bypass is not
available for external hosts. The environment additionally exposes two
network-mediated instruments: a page-fetch instrument (retrieves a URL and returns a
text rendering) and a general-purpose web index (returns result titles, URLs, and
short snippets). Neither instrument exposes a stable public index identity, and
neither is a scholarly citation database. Both are discovery instruments; neither is
a drafting mechanism, and neither can yield an artifact whose bytes can be hashed.

### 2.2 Route R1 — direct HTTPS retrieval through the egress proxy

Every host below was attempted with a direct HTTPS request. The proxy refused the
`CONNECT` tunnel for every scholarly, publisher, preprint, regulatory, library,
archive, and mirror host with response `HTTP/1.1 403 Forbidden` (client error
`CONNECT tunnel failed, response 403`); no TLS session was ever established, so no
document bytes, headers, or paywall pages were received. The only hosts that
completed were the repository hosting service and two package registries.

| Host                                                                                                                                    | Needed for                                                                        | Response    |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------- |
| `doi.org`                                                                                                                               | DOI resolution for every DOI-bearing source                                       | CONNECT 403 |
| `academic.oup.com`                                                                                                                      | Biometrika (SRC-09, 10, 12, 15, 16, 17, 18, 23; Rom)                              | CONNECT 403 |
| `www.jstor.org`                                                                                                                         | JSTOR archival copies (Biometrika, Biometrics, JASA)                              | CONNECT 403 |
| `www.tandfonline.com`                                                                                                                   | JASA and Technometrics (SRC-11, 13, 14, 19, 21, 28, 29, 35, 36)                   | CONNECT 403 |
| `onlinelibrary.wiley.com`                                                                                                               | Statistics in Medicine, Biometrics, Wiley book (SRC-25, 26, 27, 28)               | CONNECT 403 |
| `rss.onlinelibrary.wiley.com`                                                                                                           | JRSS B (SRC-24)                                                                   | CONNECT 403 |
| `projecteuclid.org`                                                                                                                     | Annals of Statistics (SRC-22, SRC-30)                                             | CONNECT 403 |
| `journals.sagepub.com`                                                                                                                  | Journal of Educational Statistics (SRC-20)                                        | CONNECT 403 |
| `link.springer.com`                                                                                                                     | Euphytica (SRC-29 Keuls 1952)                                                     | CONNECT 403 |
| `www.sciencedirect.com`                                                                                                                 | Journal of Multivariate Analysis (SRC-36 Hochberg 1974)                           | CONNECT 403 |
| `www.cambridge.org`                                                                                                                     | alternative publisher route                                                       | CONNECT 403 |
| `www.fda.gov`                                                                                                                           | SRC-32 (FDA 2022 guidance)                                                        | CONNECT 403 |
| `www.ema.europa.eu`                                                                                                                     | SRC-33 (EMA 2002 PtC; 2017 draft guideline)                                       | CONNECT 403 |
| `www.regulations.gov`                                                                                                                   | alternative route for SRC-32                                                      | CONNECT 403 |
| `www.govinfo.gov`                                                                                                                       | alternative route for SRC-32                                                      | CONNECT 403 |
| `pubmed.ncbi.nlm.nih.gov`, `www.ncbi.nlm.nih.gov`, `europepmc.org`                                                                      | bibliographic confirmation and open copies                                        | CONNECT 403 |
| `api.crossref.org`                                                                                                                      | DOI metadata confirmation                                                         | CONNECT 403 |
| `arxiv.org`                                                                                                                             | preprint route (control; no required source is a preprint)                        | CONNECT 403 |
| `archive.org`, `scholar.archive.org`, `catalog.hathitrust.org`, `babel.hathitrust.org`, `www.biodiversitylibrary.org`, `gallica.bnf.fr` | archival copies of older journals                                                 | CONNECT 403 |
| `www.worldcat.org`, `books.google.com`, `cir.nii.ac.jp`                                                                                 | bibliographic confirmation (SRC-25, SRC-34)                                       | CONNECT 403 |
| `zenodo.org`, `hal.science`, `core.ac.uk`, `semanticscholar.org`, `www.biorxiv.org`                                                     | open-repository routes                                                            | CONNECT 403 |
| `cran.r-project.org`, `stat.ethz.ch`, `www.jstatsoft.org`                                                                               | software documentation (not primary text; probed only to characterize the policy) | CONNECT 403 |
| `www.stat.berkeley.edu`, `www.stat.cmu.edu`, `faculty.washington.edu`, `www.ime.usp.br`, `sci2s.ugr.es`                                 | institutional or third-party mirrors surfaced by the index                        | CONNECT 403 |
| `www.google.com`, `duckduckgo.com`, `en.wikipedia.org`                                                                                  | general web (control)                                                             | CONNECT 403 |
| `github.com`, `api.github.com`, `raw.githubusercontent.com`                                                                             | repository hosting service (control)                                              | 200         |
| `registry.npmjs.org`, `pypi.org`                                                                                                        | package registries (control)                                                      | 200         |

### 2.3 Route R2 — page-fetch instrument

The page-fetch instrument was tried against the authoritative host of one source per
class and against the third-party mirror the index surfaced. Every attempt returned
the instrument's own egress refusal (`EGRESS_BLOCKED` for the named domain); the
repository hosting service was fetchable as a control.

| URL class                                                    | Domain              | Result           |
| ------------------------------------------------------------ | ------------------- | ---------------- |
| FDA final guidance download (SRC-32)                         | `www.fda.gov`       | `EGRESS_BLOCKED` |
| EMA Points to Consider PDF (SRC-33)                          | `www.ema.europa.eu` | `EGRESS_BLOCKED` |
| Annals of Statistics article page, BY 2001 (SRC-22)          | `projecteuclid.org` | `EGRESS_BLOCKED` |
| DOI resolver, Hochberg 1988 (SRC-16)                         | `doi.org`           | `EGRESS_BLOCKED` |
| Biometrika article abstract page, Hochberg 1988 (SRC-16)     | `academic.oup.com`  | `EGRESS_BLOCKED` |
| Third-party PDF mirror surfaced by the index (Hochberg 1988) | `sci2s.ugr.es`      | `EGRESS_BLOCKED` |
| Preprint abstract page (control)                             | `arxiv.org`         | `EGRESS_BLOCKED` |
| Repository issue page (control)                              | `github.com`        | fetched          |

Even had the instrument returned text, it could not have satisfied the commission's
artifact-identity requirement: it returns a rendered text derivative, not the
artifact bytes, so no SHA-256 and no printed-page map would have been obtainable. It
was therefore never a candidate route for decision-bearing inspection; it was tried to
characterize the environment completely.

### 2.4 Route R3 — general-purpose web index (snippets only)

The index was reachable. It returns titles, URLs, and short snippets, and it exposed
no stable public identity. Fourteen queries were run, one per source cluster, solely
to confirm or complete bibliographic identity so that the required-source list in
Section 11 is exact enough for a steward to supply lawful copies. Every identity item
obtained this way is labelled `SNIPPET` in Section 11 and is **not** a decision-bearing
source. No snippet is used anywhere in this report as evidence about what any source
states. Per-result identities were not retained; no two-result cross-check is
claimed.

### 2.5 Route R4 — lawfully supplied local copies

The commission permits inspection of lawfully supplied local copies. None was
supplied. The attachment and user-data mount points (`/mnt/attach`,
`/mnt/user-data/working`), the home directory, the repository tree, and a full
file-system search for `.pdf`, `.djvu`, and `.epub` files were checked; the only PDF
present is a system component unrelated to any source. No `SRC-xx` artifact exists in
this environment.

### 2.6 Route R5 — repository contents

The pinned repository contains no copy of any required primary text (consistent with
the rule against committing copyrighted source files). The frozen FND-1 inspection
records describe SRC-01 through SRC-08 but do not carry the PDFs. No required source
for any SR hold or for RSM-01/RSM-02 is a repository content.

### 2.7 Route R6 — reachable hosts that carry no primary text

The repository hosting service and the package registries were reachable. Neither
hosts an authoritative copy of any required source. Searching other repositories on
the hosting service for mirrored copies of the two public-sector guidance documents
was not performed: it is outside this session's authorized repository scope, and a
mirror without a verifiable chain to the issuing authority's host could not have
supported a `CLOSED` disposition in any case.

### 2.8 Acquisition summary

| Class                           | Count | Acquired | Inspected |
| ------------------------------- | ----- | -------- | --------- |
| SR-A through SR-L named sources | 43    | 0        | 0         |
| RSM-01 named source (SRC-25)    | 1     | 0        | 0         |
| RSM-02 identified variant texts | 4     | 0        | 0         |

Consequence: no new full-text primary inspection was possible in this environment.
This is the same access outcome the fixed semantic result recorded on 2026-09-03
(its Section 2.2/2.3), now confirmed with a complete per-host log.

## 3. Claim-to-source table

The commission requires a claim-to-source table with exact pinpoints for every
decision-bearing claim. Because no source was inspected, this table records, for each
claim the hold needs, the assigned source and the status `NOT_INSPECTED`. The
"claim" column restates the fixed catalogue's characterization that the hold exists
to verify; it is **not** a source-established fact and must not be read as one. The
pinpoint column is empty by necessity.

| Claim ID | Hold   | Claim to be verified (catalogue characterization, unverified)                                                                                                      | Assigned source(s)                                                                                 | Pinpoint | Status          |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | -------- | --------------- |
| C-A1     | SR-A   | Classical one-way F test: global null of equal means; normal, independent, common-variance model; F reference distribution with integer df                         | Fisher-lineage formalization (e.g., Scheffé 1959 as formal secondary anchor plus original sources) | —        | `NOT_INSPECTED` |
| C-A2     | SR-A   | Welch (1951) omnibus: null target under unequal variances; statistic; non-integer denominator df; approximation status                                             | SRC-09                                                                                             | —        | `NOT_INSPECTED` |
| C-A3     | SR-A   | James (1951) first/second-order tests: target, statistic, and order of approximation                                                                               | SRC-10                                                                                             | —        | `NOT_INSPECTED` |
| C-A4     | SR-A   | Brown-Forsythe (1974) modified F: target, statistic, df construction                                                                                               | SRC-11                                                                                             | —        | `NOT_INSPECTED` |
| C-B1     | SR-B   | Dunn (1961) as the named primary source of the Bonferroni-inequality contrast procedure (attribution only for PVL-01)                                              | SRC-14                                                                                             | —        | `NOT_INSPECTED` |
| C-B2     | SR-B   | Šidák (1967) inequality: single-step product-form level; the dependence/orthant condition under which it holds                                                     | SRC-13                                                                                             | —        | `NOT_INSPECTED` |
| C-C1     | SR-C   | Simes (1986) global test: statement; independence condition of its proof                                                                                           | SRC-15                                                                                             | —        | `NOT_INSPECTED` |
| C-C2     | SR-C   | Hochberg (1988) step-up: rejection rule; strong-FWER claim; dependence condition inherited from Simes                                                              | SRC-16                                                                                             | —        | `NOT_INSPECTED` |
| C-C3     | SR-C   | Hommel (1988): closed-Simes construction; strong FWER; computational form                                                                                          | SRC-17                                                                                             | —        | `NOT_INSPECTED` |
| C-C4     | SR-C   | Shaffer (1986): logical-constraint sharpening of Holm; validity condition                                                                                          | SRC-19                                                                                             | —        | `NOT_INSPECTED` |
| C-C5     | SR-C   | Rom (1990) and Holland-Copenhaver (1987): sharpened stepwise rules and their conditions                                                                            | Rom (1990); Holland-Copenhaver (1987)                                                              | —        | `NOT_INSPECTED` |
| C-D1     | SR-D   | Closed testing principle (Marcus-Peritz-Gabriel 1976): construction and strong-FWER argument; local level-α test condition                                         | SRC-18                                                                                             | —        | `NOT_INSPECTED` |
| C-D2     | SR-D   | Fixed-sequence, fallback (Wiens 2003), serial and parallel gatekeeping (Maurer et al. 1995; Dmitrienko et al. 2003): ordered/structured member sets and guarantees | SRC-27                                                                                             | —        | `NOT_INSPECTED` |
| C-D3     | SR-D   | Graphical weighted-Bonferroni (Bretz et al. 2009): representation and equivalence claims                                                                           | SRC-26                                                                                             | —        | `NOT_INSPECTED` |
| C-E1     | SR-E   | Tukey (1953) manuscript wording and printed identity for the balanced Studentized-range all-pairs procedure (historical attribution)                               | SRC-34                                                                                             | —        | `NOT_INSPECTED` |
| C-F1     | SR-F   | Hochberg (1974) GT2: Studentized maximum modulus construction and analytic coverage claim                                                                          | Hochberg (1974) (SRC-36)                                                                           | —        | `NOT_INSPECTED` |
| C-F2     | SR-F   | Genizi-Hochberg (1978): improved extension and interval-length relation to Spjøtvoll-Stoline                                                                       | Genizi-Hochberg (1978) (SRC-36)                                                                    | —        | `NOT_INSPECTED` |
| C-F3     | SR-F   | Stoline (1981): status comparison of unequal-size all-pairs procedures                                                                                             | Stoline (1981) (SRC-36)                                                                            | —        | `NOT_INSPECTED` |
| C-G1     | SR-G   | Scheffé (1953): all-contrasts simultaneous coverage over the contrast cone; `sqrt((k−1)F)` projection; admissibility of data-dependent contrasts                   | SRC-12                                                                                             | —        | `NOT_INSPECTED` |
| C-H1     | SR-H   | Newman (1939), Keuls (1952): range step-down construction; error-control status                                                                                    | SRC-29                                                                                             | —        | `NOT_INSPECTED` |
| C-H2     | SR-H   | Duncan (1955): multiple range test and its protection levels (reported non-control of FWER)                                                                        | SRC-29                                                                                             | —        | `NOT_INSPECTED` |
| C-H3     | SR-H   | Ryan (1960), Einot-Gabriel (1975), Welsch (1977): corrected range (REGWQ) constructions and guarantees                                                             | SRC-29                                                                                             | —        | `NOT_INSPECTED` |
| C-H4     | SR-H   | Hayter (1986): maximum FWER of protected LSD; failure for `k > 3`; modified LSD                                                                                    | SRC-35                                                                                             | —        | `NOT_INSPECTED` |
| C-I1     | SR-I   | Games-Howell (1976): construction; Monte Carlo evidence type; claimed control                                                                                      | SRC-20                                                                                             | —        | `NOT_INSPECTED` |
| C-I2     | SR-I   | Tamhane (1979) T2; Dunnett (1980b) T3 and C: constructions, df, and evidence type                                                                                  | SRC-21                                                                                             | —        | `NOT_INSPECTED` |
| C-J1     | SR-J   | Step-down Dunnett (Naik 1975; Dunnett-Tamhane 1991) and step-up (Dunnett-Tamhane 1992): ordered many-to-one rules and strong-FWER claims                           | SRC-28                                                                                             | —        | `NOT_INSPECTED` |
| C-J2     | SR-J   | Hsu (1984): constrained MCB intervals; selection-type member set                                                                                                   | SRC-30                                                                                             | —        | `NOT_INSPECTED` |
| C-K1     | SR-K   | Benjamini-Yekutieli (2001): PRDS definition; whether one-way shared-variance statistics fall under it; `Σ1/i` arbitrary-dependence variant                         | SRC-22                                                                                             | —        | `NOT_INSPECTED` |
| C-K2     | SR-K   | Benjamini-Krieger-Yekutieli (2006): adaptive/two-stage procedures and their conditions                                                                             | SRC-23                                                                                             | —        | `NOT_INSPECTED` |
| C-K3     | SR-K   | Storey (2002): direct FDR estimation target; q-value output                                                                                                        | SRC-24                                                                                             | —        | `NOT_INSPECTED` |
| C-L1     | SR-L   | FDA (2022): FWER framing and gatekeeping vocabulary                                                                                                                | SRC-32                                                                                             | —        | `NOT_INSPECTED` |
| C-L2     | SR-L   | EMA/CPMP (2002) and EMA (2017 draft): multiplicity framing                                                                                                         | SRC-33                                                                                             | —        | `NOT_INSPECTED` |
| C-R1     | RSM-01 | Westfall-Young (1993): maxT/minP definitions; subset pivotality; member set; adjusted-p output; strong-FWER claim                                                  | SRC-25                                                                                             | —        | `NOT_INSPECTED` |
| C-R2     | RSM-02 | Primary text(s) grounding the "permutation-based pairwise/step-down families" description (Section 9.2 candidates)                                                 | Section 9.2 candidate texts                                                                        | —        | `NOT_INSPECTED` |

## 4. Required analysis, applied under total non-acquisition

The commission's eight analysis items are applied to every affected entry. With no
inspected source, each item resolves identically, so the resolution is stated once
here and referenced from the impact table (Section 6) rather than repeated forty
times.

1. **Exact procedure and variant described by the source:** not established; no
   source text inspected.
2. **Source's stated result versus investigator inference:** no source statement is
   available; therefore no inference is drawn from any of the assigned sources. The
   only inferences in this report concern the acquisition outcome itself and are
   marked as such (Section 10).
3. **Member set, null or interval target, error criterion, guarantee strength:** not
   established from source; the catalogue's characterization (fixed result Sections
   8–9) is carried unchanged as the thing to be verified.
4. **Sampling, variance, dependence, balance, ordering, selection, and
   degrees-of-freedom assumptions:** not established from source.
5. **Result classes and numerical quantities the source actually justifies:** not
   established from source.
6. **Mismatch with the reviewed catalogue:** none can be identified; equally, none
   can be excluded. No entry is confirmed and no entry is contradicted.
7. **Support / narrow / contradict / not-resolve:** every assigned source **does not
   resolve** the catalogue characterization, because it was not inspected.
8. **Exact reopen condition:** for every entry, direct inspection of the assigned
   source artifact(s) with recorded SHA-256, page map, and pinpoints, followed by the
   eight-item analysis above.

Because nothing was inspected, no procedure variant, assumption, guarantee,
comparison family, or output claim in the fixed catalogue is changed, silently or
otherwise.

## 5. Hold dispositions

The commission's four dispositions are `CLOSED`, `PARTIAL`, `NO_GO`, and
`INPUT_INCOMPLETE`. `PARTIAL` requires that some decision-bearing claims be directly
supported by inspected text; `NO_GO` requires inspected evidence that contradicts the
catalogue. Neither condition can arise without an inspected artifact. Every hold
therefore receives `INPUT_INCOMPLETE`: the required source text could not be inspected.

| Hold | Coverage                                        | Assigned sources (fixed result §17 and §2.2)                                                                                | Acquisition outcome                                                                                                 | Disposition        |
| ---- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------ |
| SR-A | OMN-01 through OMN-04                           | Fisher-lineage F-test formalization (Scheffé 1959 as formal secondary anchor plus original sources); SRC-09; SRC-10; SRC-11 | none acquired; all hosts refused (R1), fetch blocked (R2)                                                           | `INPUT_INCOMPLETE` |
| SR-B | PVL-01 attribution; PVL-02                      | SRC-13; SRC-14                                                                                                              | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-C | PVL-06 through PVL-10                           | SRC-15; SRC-16; SRC-17; SRC-19; Rom (1990); Holland-Copenhaver (1987)                                                       | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-D | CLS-01 through CLS-06                           | SRC-18; SRC-26; SRC-27                                                                                                      | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-E | APR-01 historical attribution                   | SRC-34                                                                                                                      | none acquired; no authenticated copy of the 1953 manuscript or the 1994 archival printing exists in the environment | `INPUT_INCOMPLETE` |
| SR-F | APR-05; APR-06                                  | Hochberg (1974); Genizi-Hochberg (1978); Stoline (1981) (SRC-36)                                                            | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-G | APR-09                                          | SRC-12                                                                                                                      | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-H | APR-10 through APR-14                           | SRC-29; SRC-35                                                                                                              | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-I | HET-01 through HET-03                           | SRC-20; SRC-21                                                                                                              | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-J | MTO-02; MTO-03; MCB-01                          | SRC-28; SRC-30                                                                                                              | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-K | FDR-01 dependence scope; FDR-02; FDR-03; FDR-04 | SRC-22; SRC-23; SRC-24                                                                                                      | none acquired                                                                                                       | `INPUT_INCOMPLETE` |
| SR-L | GUI-01; GUI-02                                  | SRC-32; SRC-33                                                                                                              | none acquired; issuing-authority hosts refused                                                                      | `INPUT_INCOMPLETE` |

For SR-E specifically: the fixed result already records that the mathematical
statements for the balanced procedure rest on inspected later primary text (SRC-06)
and that the residual is attribution-only. That characterization is unchanged; the
attribution residual itself is not advanced, because SRC-34 was not inspectable.

For SR-F specifically: the fixed result's `REPORT (via SRC-08)` evidence for APR-05 and
APR-06 is not a substitute for the assigned primary texts, and this report does not
upgrade report-level knowledge to direct support.

## 6. Entry-by-entry impact table

Every item assigned to holds SR-A through SR-L, plus both resampling entries. "Fixed
disposition" is the catalogue token at blob `8f215260…`; `†` marks a hold-blocked
(DEFER-equivalent) entry exactly as in the fixed result. "Impact" states what this
pass changes: in every row, nothing. The analysis items resolve per Section 4.

| Entry  | Technique                                                | Hold           | Fixed disposition                                                      | Required source(s)                                  | Source outcome | Impact on fixed entry                                                              | Completion condition                                                      |
| ------ | -------------------------------------------------------- | -------------- | ---------------------------------------------------------------------- | --------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| OMN-01 | Classical equal-variance one-way ANOVA F                 | SR-A           | `R3-CAND`†                                                             | Fisher-lineage formalization; Scheffé 1959 anchor   | not acquired   | none; remains DEFER-equivalent                                                     | inspect assigned texts; verify C-A1                                       |
| OMN-02 | Welch heteroscedastic omnibus (1951)                     | SR-A           | `R3-CAND`†                                                             | SRC-09                                              | not acquired   | none                                                                               | inspect SRC-09; verify C-A2                                               |
| OMN-03 | James first/second-order tests (1951)                    | SR-A           | `RES-ONLY`†                                                            | SRC-10                                              | not acquired   | none                                                                               | inspect SRC-10; verify C-A3                                               |
| OMN-04 | Brown-Forsythe modified F (1974)                         | SR-A           | `RES-ONLY`†                                                            | SRC-11                                              | not acquired   | none                                                                               | inspect SRC-11; verify C-A4                                               |
| PVL-01 | Bonferroni single-step                                   | SR-B           | `R3-CAND` (by explicit inference; attribution under SR-B)              | SRC-14                                              | not acquired   | none; candidacy by inference untouched; attribution residual persists              | inspect SRC-14; verify C-B1                                               |
| PVL-02 | Šidák single-step                                        | SR-B           | `R3-CAND`†                                                             | SRC-13                                              | not acquired   | none                                                                               | inspect SRC-13; verify C-B2                                               |
| PVL-06 | Simes global test (1986)                                 | SR-C           | `RES-ONLY`†                                                            | SRC-15                                              | not acquired   | none                                                                               | inspect SRC-15; verify C-C1                                               |
| PVL-07 | Hochberg step-up (1988)                                  | SR-C           | `R3-CAND`†                                                             | SRC-16 (with SRC-15)                                | not acquired   | none                                                                               | inspect SRC-16 and SRC-15; verify C-C2                                    |
| PVL-08 | Hommel procedure (1988)                                  | SR-C           | `RES-ONLY`†                                                            | SRC-17 (with SRC-15)                                | not acquired   | none                                                                               | inspect SRC-17; verify C-C3                                               |
| PVL-09 | Shaffer logically-restricted sequential rejection (1986) | SR-C           | `RES-ONLY`†                                                            | SRC-19                                              | not acquired   | none                                                                               | inspect SRC-19; verify C-C4                                               |
| PVL-10 | Rom (1990); Holland-Copenhaver (1987)                    | SR-C           | `RES-ONLY`†                                                            | Rom (1990); Holland-Copenhaver (1987)               | not acquired   | none                                                                               | inspect both; verify C-C5                                                 |
| CLS-01 | Closed testing principle (1976)                          | SR-D           | `R3-CAND`† (as framework)                                              | SRC-18                                              | not acquired   | none                                                                               | inspect SRC-18; verify C-D1                                               |
| CLS-02 | Fixed-sequence (hierarchical) testing                    | SR-D           | `RES-ONLY`†                                                            | SRC-27 (Maurer et al. 1995)                         | not acquired   | none                                                                               | inspect SRC-27 texts; verify C-D2                                         |
| CLS-03 | Fallback procedure (Wiens 2003)                          | SR-D           | `RES-ONLY`†                                                            | SRC-27 (Wiens 2003)                                 | not acquired   | none                                                                               | inspect Wiens 2003; verify C-D2                                           |
| CLS-04 | Serial gatekeeping (1995 lineage)                        | SR-D           | `RES-ONLY`†                                                            | SRC-27                                              | not acquired   | none                                                                               | inspect SRC-27 texts; verify C-D2                                         |
| CLS-05 | Parallel gatekeeping (2003)                              | SR-D           | `RES-ONLY`†                                                            | SRC-27 (Dmitrienko et al. 2003)                     | not acquired   | none                                                                               | inspect Dmitrienko et al. 2003; verify C-D2                               |
| CLS-06 | Graphical weighted-Bonferroni (2009)                     | SR-D           | `RES-ONLY`†                                                            | SRC-26                                              | not acquired   | none                                                                               | inspect SRC-26; verify C-D3                                               |
| APR-01 | Balanced Studentized-range all-pairs intervals           | SR-E           | `R3-CAND` (sourced via SRC-06; attribution residual only)              | SRC-34                                              | not acquired   | none; candidacy on SRC-06 untouched; attribution residual persists                 | inspect SRC-34 (manuscript or authenticated 1994 printing); verify C-E1   |
| APR-05 | Hochberg GT2 (Studentized maximum modulus)               | SR-F           | `RES-ONLY`†                                                            | Hochberg (1974)                                     | not acquired   | none                                                                               | inspect Hochberg 1974; verify C-F1                                        |
| APR-06 | Genizi-Hochberg (1978)                                   | SR-F           | `RES-ONLY`†                                                            | Genizi-Hochberg (1978); Stoline (1981)              | not acquired   | none                                                                               | inspect both; verify C-F2, C-F3                                           |
| APR-09 | Scheffé all-contrasts procedure (1953)                   | SR-G           | `R3-CAND`†                                                             | SRC-12                                              | not acquired   | none                                                                               | inspect SRC-12; verify C-G1; resolve page-range identity (Section 8, X-1) |
| APR-10 | Newman-Keuls step-down range                             | SR-H           | `RES-ONLY`†                                                            | SRC-29 (Newman 1939; Keuls 1952)                    | not acquired   | none; error-control concern stays unverified, not fact                             | inspect both; verify C-H1                                                 |
| APR-11 | Duncan multiple range test (1955)                        | SR-H           | `RES-ONLY`†                                                            | SRC-29 (Duncan 1955)                                | not acquired   | none                                                                               | inspect Duncan 1955; verify C-H2                                          |
| APR-12 | Ryan / Einot-Gabriel / Welsch (REGWQ)                    | SR-H           | `RES-ONLY`†                                                            | SRC-29 (Ryan 1960; Einot-Gabriel 1975; Welsch 1977) | not acquired   | none                                                                               | inspect all three; verify C-H3                                            |
| APR-13 | Fisher (protected) LSD                                   | SR-H           | `RES-ONLY`†                                                            | SRC-35                                              | not acquired   | none                                                                               | inspect SRC-35; verify C-H4                                               |
| APR-14 | Hayter's modified LSD (1986)                             | SR-H           | `RES-ONLY`†                                                            | SRC-35                                              | not acquired   | none                                                                               | inspect SRC-35; verify C-H4                                               |
| HET-01 | Games-Howell (1976)                                      | SR-I           | `R3-CAND`†                                                             | SRC-20                                              | not acquired   | none                                                                               | inspect SRC-20; verify C-I1                                               |
| HET-02 | Tamhane T2 (1979)                                        | SR-I           | `RES-ONLY`†                                                            | SRC-21 (Tamhane 1979)                               | not acquired   | none                                                                               | inspect Tamhane 1979; verify C-I2                                         |
| HET-03 | Dunnett T3 and C (1980b)                                 | SR-I           | `RES-ONLY`†                                                            | SRC-21 (Dunnett 1980b)                              | not acquired   | none                                                                               | inspect Dunnett 1980b; verify C-I2                                        |
| MTO-02 | Step-down Dunnett (Naik 1975; Dunnett-Tamhane 1991)      | SR-J           | `RES-ONLY`†                                                            | SRC-28                                              | not acquired   | none                                                                               | inspect SRC-28 texts; verify C-J1; resolve Naik 1975 identity (X-3)       |
| MTO-03 | Step-up Dunnett-Tamhane (1992)                           | SR-J           | `RES-ONLY`†                                                            | SRC-28                                              | not acquired   | none                                                                               | inspect Dunnett-Tamhane 1992; verify C-J1                                 |
| MCB-01 | Hsu's multiple comparisons with the best (1984)          | SR-J           | `RES-ONLY`†                                                            | SRC-30                                              | not acquired   | none                                                                               | inspect SRC-30; verify C-J2                                               |
| FDR-01 | Benjamini-Hochberg linear step-up (1995)                 | SR-K           | `R3-CAND` (unblocked under explicit independence declaration)          | SRC-22 (dependence scope)                           | not acquired   | none; independence-declared candidacy untouched; dependence scope stays open       | inspect SRC-22; verify C-K1                                               |
| FDR-02 | Benjamini-Yekutieli (2001)                               | SR-K           | `R3-CAND`†                                                             | SRC-22                                              | not acquired   | none                                                                               | inspect SRC-22; verify C-K1                                               |
| FDR-03 | Adaptive / two-stage BH (2006)                           | SR-K           | `RES-ONLY`†                                                            | SRC-23                                              | not acquired   | none                                                                               | inspect SRC-23; verify C-K2                                               |
| FDR-04 | Storey direct FDR / q-value (2002)                       | SR-K           | `TRANSFER(high-dimensional or omics program, Releases 16–20 horizon)`† | SRC-24                                              | not acquired   | none; transfer target (planning basis) untouched; estimator semantics stay blocked | inspect SRC-24; verify C-K3                                               |
| GUI-01 | FDA Multiple Endpoints guidance (2022)                   | SR-L           | `RES-ONLY`†                                                            | SRC-32                                              | not acquired   | none                                                                               | inspect SRC-32 from the issuing authority's host; verify C-L1             |
| GUI-02 | EMA PtC (2002) and draft guideline (2017)                | SR-L           | `RES-ONLY`†                                                            | SRC-33                                              | not acquired   | none                                                                               | inspect SRC-33 from the issuing authority's host; verify C-L2             |
| RSM-01 | Westfall-Young maxT / minP (1993)                        | (supplemental) | `TRANSFER(seeded-stochastic reproducibility program)`                  | SRC-25                                              | not acquired   | none; `TRANSFER` preserved; source semantics remain pending                        | Section 7                                                                 |
| RSM-02 | Permutation-based pairwise/step-down families            | (supplemental) | `TRANSFER(seeded-stochastic reproducibility program)`                  | Section 9.2 candidate texts                         | not acquired   | none; `TRANSFER` preserved; fixed entry not redefined                              | Section 7                                                                 |

Count check: 40 rows = 4 (SR-A) + 2 (SR-B) + 5 (SR-C) + 6 (SR-D) + 1 (SR-E) + 2
(SR-F) + 1 (SR-G) + 5 (SR-H) + 3 (SR-I) + 3 (SR-J) + 4 (SR-K) + 2 (SR-L) + 2 (RSM).
Every ID exists in the fixed catalogue; no ID outside the hold rows is touched.

## 7. Resampling entries RSM-01 and RSM-02

These are supplemental source-completion results. They are not new SR-x holds and do
not reverse the reviewed `TRANSFER` dispositions, whose basis is the repository's
queued seeded-stochastic randomness foundation rather than source semantics.

### 7.1 RSM-01 — Westfall-Young maxT / minP

- Required: direct inspection of SRC-25 and any primary procedure text needed to
  establish the maxT/minP definitions, the subset-pivotality condition, the member set,
  and the adjusted-output claim.
- Outcome: SRC-25 is a monograph (Wiley, 1993). No copy was supplied; the publisher
  host, book-metadata hosts, and library catalogue hosts all refused the tunnel
  (Section 2.2). No chapter, page, theorem, or equation was inspected.
- Generalization guard: nothing here generalizes RSM-01 evidence (there is none) to any
  permutation or step-down family.
- **Disposition: `INPUT_INCOMPLETE`.**

### 7.2 RSM-02 — permutation-based pairwise/step-down families

- Required: identify and directly inspect the primary text or texts that ground the
  catalogue's snippet-only family description; record each identified variant as a
  reopen trigger and possible variant-split candidate, not as a redefinition.
- Identification outcome (discovery-grade, Section 9.2): the snippet-level search
  surfaces at least four distinct candidate primary texts describing materially
  different resampling step-down constructions. Their identification is recorded as
  reopen triggers and possible variant-split candidates. It is **not** used to redefine
  the fixed entry, and no variant is promoted into the catalogue.
- Inspection outcome: none of the candidate texts could be inspected (Section 2).
- Forward note (investigator inference, not a disposition): even after acquisition,
  the commission's own rule means that evidence resolving to several variants rather
  than one family characterization would yield at most `PARTIAL` with named gaps for
  RSM-02; a `CLOSED` outcome would require the reviewed family description to be
  supportable as one characterization, which the identified spread makes unlikely.
  This is noted so that the next pass plans for a variant-split decision by the
  steward, not so that any split is made now.
- **Disposition: `INPUT_INCOMPLETE`** (required primary text identified only at
  snippet level and not inspectable).

## 8. Conflicts, unresolved questions, and bibliographic uncertainties

No primary-source conflict can be recorded, because no primary source was inspected.
The material disagreements the fixed result already records (its D-01 through D-05)
remain exactly as recorded and are neither resolved nor sharpened here.

Bibliographic-identity uncertainties surfaced at snippet level (discovery-grade;
resolvable only from the artifacts):

- **X-1 (SRC-12 page range).** The fixed result records Scheffé (1953) as Biometrika
  40(1/2):87–104; an index snippet gives 87–110. The correct printed range must be
  read from the artifact; neither value is asserted here.
- **X-2 (SRC-36 "Brown (1979, 1982)").** The index returned no confident match for
  these two items under the names given; the intended references are those cited in
  the inspected Hayter (1984) reference list (SRC-06), which was not available here
  to re-read. Identity must be taken from that list when the artifact is supplied.
- **X-3 (SRC-28 Naik 1975).** No confident index match under the title queried;
  identity must be confirmed from the reference lists of Dunnett-Tamhane (1991, 1992)
  when supplied.
- **X-4 (SRC-36 Kurtz 1956).** Snippet identity: unpublished Princeton dissertation;
  wording of the title varies across snippets. A dissertation may be obtainable only
  through a library route.
- **X-5 (SRC-27 Maurer-Hothorn-Lehmacher 1995).** Snippet identity indicates a chapter
  in a German-language edited volume (_Biometrie in der chemisch-pharmazeutischen
  Industrie_), not a journal article; language and access route differ from the rest
  of SRC-27.
- **X-6 (SRC-34 Tukey 1953).** Snippets place the manuscript at pp. 1–300 of _The
  Collected Works of John W. Tukey_, Vol. VIII (Chapman and Hall, 1994). Fidelity of
  the archival printing to the manuscript remains the recorded FND-1 residual and is
  unaffected.
- **X-7 (SRC-33 EMA 2017).** The 2017 document is a draft released for consultation
  (EMA/CHMP/44762/2017); whether a final version supersedes it must be checked on the
  issuing authority's host at inspection time.

Unresolved questions carried forward unchanged from the fixed result: I-03/D-03
(step-up validity under shared-variance dependence), D-02 (heteroscedastic omnibus
targets), D-04 (multiple-range error-control status), and the SR-E attribution
residual.

## 9. Reopen conditions and variant-split candidates

### 9.1 Reopen conditions

This report's dispositions stand only while all of the following hold; any one of
them reopens the affected hold for a fresh source pass:

1. a lawfully supplied local copy, or a reachable issuing-authority or publisher
   host, becomes available for any source in Section 11 — the affected hold is then
   re-run against that artifact with SHA-256, page map, and pinpoints;
2. the fixed semantic result is superseded by a later blob (any change to the
   catalogue changes what each hold must verify);
3. the steward splits RSM-02 into variant entries (Section 9.2), which redefines the
   required source set for the resampling lane;
4. a bibliographic uncertainty in Section 8 resolves to a different artifact than the
   one named in the fixed result;
5. the fixed result's own reopen conditions (its Section 18) fire.

### 9.2 RSM-02 variant-split candidates (reopen triggers, not redefinitions)

Identified at snippet level only; none inspected; none promoted. Bibliographic details
are `SNIPPET` grade and must be confirmed from the artifacts.

| Candidate | Snippet-level identity                                                                                                       | Why it is a distinct variant candidate (snippet-level description; unverified)                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| V-1       | Westfall and Young (1993), _Resampling-Based Multiple Testing_, Wiley, ISBN 0-471-55761-7 — step-down maxT and minP chapters | step-down resampling adjusted p-values under a subset-pivotality condition (same monograph as RSM-01) |
| V-2       | Troendle (1995), "A Stepwise Resampling Method of Multiple Hypothesis Testing," JASA 90:370–378                              | stepwise resampling presented as an alternative to the analytic Dunnett-Tamhane stepwise rules        |
| V-3       | Romano and Wolf (2005), "Exact and Approximate Stepdown Methods for Multiple Hypothesis Testing," JASA 100(469):94–108       | stepdown methods stated to avoid the subset-pivotality assumption                                     |
| V-4       | Ge, Dudoit, and Speed (2003), "Resampling-based multiple testing for microarray data analysis," TEST 12(1):1–77              | resampling step-down maxT/minP restated with FWER and FDR criteria; algorithmic variants              |

If more than one of V-1 through V-4 is later inspected and found to describe a
materially different member set, assumption, guarantee, or output, the fixed RSM-02
entry is a variant-split candidate for the steward, and the resampling lane's
disposition becomes named-gap `PARTIAL` at best until the split is decided. No such
decision is made here.

## 10. Investigator inference about the acquisition outcome

These inferences concern the environment and process, not any source content.

- **N-1.** The egress policy is an allow-list (repository hosting service and package
  registries only), not a per-publisher block; every non-allow-listed host received an
  identical `CONNECT` refusal before TLS. Adding hosts to the environment policy, or
  supplying lawful local copies, are the only routes that can change the outcome.
- **N-2.** The two regulatory documents (SRC-32, SRC-33) are the only required sources
  whose issuing authorities distribute them freely; they are therefore the lowest-cost
  items for a supplied-copy completion, and their SHA-256 can be re-checked against
  the issuing host when access exists.
- **N-3.** The remaining sources are publisher-controlled journal articles and one
  monograph; lawful supply requires institutional access, purchase, or library loan.
  None may be committed to the repository.
- **N-4.** Because the outcome is identical to the 2026-09-03 access record in the
  fixed result, re-running this commission in the same environment without a policy or
  supply change would reproduce `INPUT_INCOMPLETE`; the next pass should be scheduled
  only after supply is arranged.

## 11. Required source list for a supplied-copy completion

Exact materials needed to run this commission to a decision. Bibliographic identity
is the fixed result's wording (Sections 2.2 and 17) unless marked `SNIPPET` (added
from index snippets on 2026-09-04, unverified). Every item is copyright-controlled
unless stated; none may be committed to the repository. `DOI (SNIPPET)` values are
discovery-grade and must be confirmed against the artifact's own printed identity.

| Hold   | ID / item                     | Bibliographic identity                                                                                                                                                                                                                        | Route note                                                                                   |
| ------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| SR-A   | F-test formalization          | Scheffé (1959), _The Analysis of Variance_ (formal secondary anchor) plus the original Fisher-lineage sources it cites                                                                                                                        | monograph; library or purchase                                                               |
| SR-A   | SRC-09                        | Welch (1951), "On the Comparison of Several Mean Values: An Alternative Approach," Biometrika 38(3/4):330–336; DOI (SNIPPET) `10.1093/biomet/38.3-4.330`                                                                                      | Biometrika (OUP/JSTOR)                                                                       |
| SR-A   | SRC-10                        | James (1951), "The Comparison of Several Groups of Observations When the Ratios of the Population Variances Are Unknown," Biometrika 38(3/4):324–329 (SNIPPET pages)                                                                          | Biometrika (OUP/JSTOR)                                                                       |
| SR-A   | SRC-11                        | Brown and Forsythe (1974), "The Small Sample Behavior of Some Statistics Which Test the Equality of Several Means," Technometrics 16(1):129–132 (SNIPPET pages)                                                                               | Taylor & Francis / JSTOR                                                                     |
| SR-B   | SRC-13                        | Šidák (1967), "Rectangular Confidence Regions for the Means of Multivariate Normal Distributions," JASA 62(318):626–633; DOI (SNIPPET) `10.1080/01621459.1967.10482935`                                                                       | Taylor & Francis / JSTOR                                                                     |
| SR-B   | SRC-14                        | Dunn (1961), "Multiple Comparisons Among Means," JASA 56(293):52–64 (SNIPPET pages)                                                                                                                                                           | Taylor & Francis / JSTOR                                                                     |
| SR-C   | SRC-15                        | Simes (1986), "An Improved Bonferroni Procedure for Multiple Tests of Significance," Biometrika 73(3):751–754; DOI (SNIPPET) `10.1093/biomet/73.3.751`                                                                                        | Biometrika (OUP/JSTOR)                                                                       |
| SR-C   | SRC-16                        | Hochberg (1988), "A Sharper Bonferroni Procedure for Multiple Tests of Significance," Biometrika 75(4):800–802; DOI `10.1093/biomet/75.4.800`                                                                                                 | Biometrika (OUP/JSTOR)                                                                       |
| SR-C   | SRC-17                        | Hommel (1988), "A Stagewise Rejective Multiple Test Procedure Based on a Modified Bonferroni Test," Biometrika 75(2):383–386; DOI (SNIPPET) `10.1093/biomet/75.2.383`                                                                         | Biometrika (OUP/JSTOR)                                                                       |
| SR-C   | SRC-19                        | Shaffer (1986), "Modified Sequentially Rejective Multiple Test Procedures," JASA 81(395):826–831; DOI (SNIPPET) `10.1080/01621459.1986.10478341`                                                                                              | Taylor & Francis / JSTOR                                                                     |
| SR-C   | Rom (1990)                    | Rom (1990), "A Sequentially Rejective Test Procedure Based on a Modified Bonferroni Inequality," Biometrika 77(3):663–665 (SNIPPET issue/pages)                                                                                               | Biometrika (OUP/JSTOR)                                                                       |
| SR-C   | Holland-Copenhaver (1987)     | Holland and Copenhaver (1987), "An Improved Sequentially Rejective Bonferroni Test Procedure," Biometrics 43(2):417–423 (SNIPPET pages)                                                                                                       | Biometrics (Wiley/JSTOR)                                                                     |
| SR-D   | SRC-18                        | Marcus, Peritz, and Gabriel (1976), "On Closed Testing Procedures with Special Reference to Ordered Analysis of Variance," Biometrika 63(3):655–660                                                                                           | Biometrika (OUP/JSTOR)                                                                       |
| SR-D   | SRC-26                        | Bretz, Maurer, Brannath, and Posch (2009), "A Graphical Approach to Sequentially Rejective Multiple Test Procedures," Statistics in Medicine 28(4):586–604; DOI (SNIPPET) `10.1002/sim.3495`                                                  | Wiley                                                                                        |
| SR-D   | SRC-27 (a)                    | Dmitrienko, Offen, and Westfall (2003), "Gatekeeping Strategies for Clinical Trials That Do Not Require All Primary Effects to Be Significant," Statistics in Medicine 22(15):2387–2400 (SNIPPET); DOI (SNIPPET) `10.1002/sim.1526`           | Wiley                                                                                        |
| SR-D   | SRC-27 (b)                    | Maurer, Hothorn, and Lehmacher (1995), "Multiple Comparisons in Drug Clinical Trials and Preclinical Assays: A-Priori Ordered Hypotheses," in _Biometrie in der chemisch-pharmazeutischen Industrie_ (SNIPPET; German-language edited volume) | library                                                                                      |
| SR-D   | SRC-27 (c)                    | Wiens (2003), "A Fixed Sequence Bonferroni Procedure for Testing Multiple Endpoints," Pharmaceutical Statistics 2(3):211–215 (SNIPPET); DOI (SNIPPET) `10.1002/pst.64`                                                                        | Wiley                                                                                        |
| SR-E   | SRC-34                        | Tukey (1953), "The Problem of Multiple Comparisons," unpublished manuscript; archival printing in _The Collected Works of John W. Tukey_, Vol. VIII (1994), pp. 1–300 (SNIPPET pages)                                                         | monograph; library                                                                           |
| SR-F   | SRC-36 Hochberg (1974)        | Hochberg (1974), "Some Generalizations of the T-Method in Simultaneous Inference," Journal of Multivariate Analysis 4(2):224–234 (SNIPPET)                                                                                                    | Elsevier                                                                                     |
| SR-F   | SRC-36 Genizi-Hochberg (1978) | Genizi and Hochberg (1978), "On Improved Extensions of the T-Method of Multiple Comparisons for Unbalanced Designs," JASA 73(364):879–884 (SNIPPET); DOI (SNIPPET) `10.1080/01621459.1978.10480118`                                           | Taylor & Francis / JSTOR                                                                     |
| SR-F   | SRC-36 Stoline (1981)         | Stoline (1981), "The Status of Multiple Comparisons: Simultaneous Estimation of All Pairwise Comparisons in One-Way ANOVA Designs," The American Statistician 35(3):134–141 (SNIPPET); DOI (SNIPPET) `10.1080/00031305.1981.10479331`         | Taylor & Francis / JSTOR                                                                     |
| SR-G   | SRC-12                        | Scheffé (1953), "A Method for Judging All Contrasts in the Analysis of Variance," Biometrika 40(1/2):87–104 (fixed result) / 87–110 (SNIPPET) — see X-1; DOI (SNIPPET) `10.1093/biomet/40.1-2.87`                                             | Biometrika (OUP/JSTOR)                                                                       |
| SR-H   | SRC-29 Newman (1939)          | Newman (1939), "The Distribution of Range in Samples from a Normal Population, Expressed in Terms of an Independent Estimate of Standard Deviation," Biometrika 31(1/2):20–30 (SNIPPET)                                                       | Biometrika (OUP/JSTOR)                                                                       |
| SR-H   | SRC-29 Keuls (1952)           | Keuls (1952), "The Use of the 'Studentized Range' in Connection with an Analysis of Variance," Euphytica 1(2):112–122 (SNIPPET); DOI (SNIPPET) `10.1007/BF01908269`                                                                           | Springer                                                                                     |
| SR-H   | SRC-29 Duncan (1955)          | Duncan (1955), "Multiple Range and Multiple F Tests," Biometrics 11(1):1–42 (SNIPPET); DOI (SNIPPET) `10.2307/3001478`                                                                                                                        | Biometrics (Wiley/JSTOR)                                                                     |
| SR-H   | SRC-29 Ryan (1960)            | Ryan (1960), "Significance Tests for Multiple Comparison of Proportions, Variances, and Other Statistics," Psychological Bulletin 57(4):318–328 (SNIPPET)                                                                                     | APA                                                                                          |
| SR-H   | SRC-29 Einot-Gabriel (1975)   | Einot and Gabriel (1975), "A Study of the Powers of Several Methods of Multiple Comparisons," JASA 70(351):574–583 (SNIPPET)                                                                                                                  | Taylor & Francis / JSTOR                                                                     |
| SR-H   | SRC-29 Welsch (1977)          | Welsch (1977), "Stepwise Multiple Comparison Procedures," JASA 72(359):566–575 (SNIPPET)                                                                                                                                                      | Taylor & Francis / JSTOR                                                                     |
| SR-H   | SRC-35                        | Hayter (1986), "The Maximum Familywise Error Rate of Fisher's Least Significant Difference Test," JASA 81(396):1000–1004 (SNIPPET); DOI (SNIPPET) `10.1080/01621459.1986.10478364`                                                            | Taylor & Francis / JSTOR                                                                     |
| SR-I   | SRC-20                        | Games and Howell (1976), "Pairwise Multiple Comparison Procedures with Unequal N's and/or Variances: A Monte Carlo Study," Journal of Educational Statistics 1(2):113–125; DOI (SNIPPET) `10.3102/10769986001002113`                          | SAGE                                                                                         |
| SR-I   | SRC-21 Tamhane (1979)         | Tamhane (1979), "A Comparison of Procedures for Multiple Comparisons of Means with Unequal Variances," JASA 74(366):471–480 (SNIPPET); DOI (SNIPPET) `10.1080/01621459.1979.10482541`                                                         | Taylor & Francis / JSTOR                                                                     |
| SR-I   | SRC-21 Dunnett (1980b)        | Dunnett (1980b), "Pairwise Multiple Comparisons in the Unequal Variance Case," JASA 75(372):796–800; DOI `10.1080/01621459.1980.10477552`                                                                                                     | Taylor & Francis / JSTOR                                                                     |
| SR-J   | SRC-28 Naik (1975)            | Naik (1975), Communications in Statistics — identity to be confirmed from the Dunnett-Tamhane reference lists (X-3)                                                                                                                           | Taylor & Francis                                                                             |
| SR-J   | SRC-28 Dunnett-Tamhane (1991) | Dunnett and Tamhane (1991), "Step-Down Multiple Tests for Comparing Treatments with a Control in Unbalanced One-Way Layouts," Statistics in Medicine 10(6):939–947 (SNIPPET); DOI (SNIPPET) `10.1002/sim.4780100614`                          | Wiley                                                                                        |
| SR-J   | SRC-28 Dunnett-Tamhane (1992) | Dunnett and Tamhane (1992), "A Step-Up Multiple Test Procedure," JASA 87(417):162–170 (SNIPPET); DOI (SNIPPET) `10.1080/01621459.1992.10475188`                                                                                               | Taylor & Francis / JSTOR                                                                     |
| SR-J   | SRC-30                        | Hsu (1984), "Constrained Simultaneous Confidence Intervals for Multiple Comparisons with the Best," Annals of Statistics 12(3):1136–1144 (SNIPPET); DOI (SNIPPET) `10.1214/aos/1176346732`                                                    | Project Euclid (open access likely)                                                          |
| SR-K   | SRC-22                        | Benjamini and Yekutieli (2001), "The Control of the False Discovery Rate in Multiple Testing under Dependency," Annals of Statistics 29(4):1165–1188; DOI `10.1214/aos/1013699998`                                                            | Project Euclid (open access likely)                                                          |
| SR-K   | SRC-23                        | Benjamini, Krieger, and Yekutieli (2006), "Adaptive Linear Step-up Procedures That Control the False Discovery Rate," Biometrika 93(3):491–507; DOI (SNIPPET) `10.1093/biomet/93.3.491`                                                       | Biometrika (OUP)                                                                             |
| SR-K   | SRC-24                        | Storey (2002), "A Direct Approach to False Discovery Rates," JRSS B 64(3):479–498 (SNIPPET); DOI (SNIPPET) `10.1111/1467-9868.00346`                                                                                                          | Wiley / OUP                                                                                  |
| SR-L   | SRC-32                        | FDA (October 2022), _Multiple Endpoints in Clinical Trials: Guidance for Industry_ (final)                                                                                                                                                    | issuing-authority host `www.fda.gov`; US federal work; SHA-256 re-checkable against the host |
| SR-L   | SRC-33 (a)                    | EMA/CPMP (2002), _Points to Consider on Multiplicity Issues in Clinical Trials_, CPMP/EWP/908/99                                                                                                                                              | issuing-authority host `www.ema.europa.eu`                                                   |
| SR-L   | SRC-33 (b)                    | EMA (2017 draft), _Guideline on Multiplicity Issues in Clinical Trials_, EMA/CHMP/44762/2017 — see X-7                                                                                                                                        | issuing-authority host `www.ema.europa.eu`                                                   |
| RSM-01 | SRC-25                        | Westfall and Young (1993), _Resampling-Based Multiple Testing: Examples and Methods for p-Value Adjustment_, Wiley, ISBN 0-471-55761-7 (SNIPPET ISBN), xvii + 340 pp.                                                                         | monograph; library or purchase                                                               |
| RSM-02 | V-1 … V-4                     | Section 9.2                                                                                                                                                                                                                                   | journals (JASA, TEST) and the SRC-25 monograph                                               |

Snippet-only mirrors of several articles surfaced on third-party hosts; they are not
listed as routes because their redistribution status is not established and the
commission requires lawful copies.

## 12. `NARROW` reconsideration and overall disposition

### 12.1 Can the existing `NARROW` program disposition be reconsidered?

**No.** The fixed semantic result declined `PROGRAM_SCOPE_READY` because the
comprehensive public question spans lanes whose primary texts could not be inspected
(its Section 20). This pass inspected none of them. The source basis needed to
reconsider the comprehensive Release 3 public question is therefore not reviewable,
and `NARROW` stands exactly as recorded, with every SR-x hold open and every `†` entry
DEFER-equivalent.

### 12.2 `SOURCE_SET_READY` test

`SOURCE_SET_READY` requires `CLOSED` for all of SR-A through SR-L, RSM-01, and RSM-02.
Zero of fourteen are `CLOSED`. Not satisfied.

### 12.3 Precedence and overall disposition

Applying `NO_GO` > `INPUT_INCOMPLETE` > `PARTIAL`:

- `NO_GO`: none — no inspected evidence exists that could contradict the catalogue.
- `INPUT_INCOMPLETE`: fourteen of fourteen (SR-A through SR-L, RSM-01, RSM-02).
- `PARTIAL`: none.

**Overall disposition: `INPUT_INCOMPLETE`.**

What this means: the source-acquisition obstacle recorded by the fixed result on
2026-09-03 is confirmed, fully logged per host and per route on 2026-09-04, and not
removed. No gap is filled with a snippet, a software manual, a textbook summary, or
investigator recall. The exact materials needed are enumerated in Section 11 so that a
supplied-copy completion pass can be commissioned without re-deriving the list.

## 13. Public-artifact self-check

- Only the pinned public repository and the documented environment routes were used;
  no private repository, work item, or product implementation was read.
- This file is the only added path. The fixed semantic result, both commissions, the
  RFC draft, authoritative artifacts, registries, schemas, conformance artifacts,
  reference code, generated views, and Release 2 material are unchanged.
- No copyrighted source file is committed; no source was acquired, so none could be.
- Attribution is role-based; no drafting, search, or review software, service,
  provider, or mechanism is identified; no human authorship is claimed. The page-fetch
  and web-index instruments are described by function only, as discovery instruments.
- No Protocol method, default, identifier, schema, field, refusal code, public check,
  API, implementation, or release change is selected; no catalogue entry is
  redefined, split, promoted, or demoted.
- Source-established facts (none obtained), catalogue characterizations to be verified
  (Section 3), investigator inference about the process (Section 10), and dispositions
  (Sections 5, 7, 12) are kept separate.

Pass 1 closing line (preserved; superseded by the Part B closing line):

RELEASE 3 SEMANTIC SOURCE-ACQUISITION RESULT COMPLETE - INPUT_INCOMPLETE - NO HOLD CLOSED - NARROW PRESERVED - AWAITING INDEPENDENT REVIEW - NOT PROTOCOL ADOPTION

## Part B — Completion pass 2 (2026-09-04, supplied source packet)

Sections 1–13 above are the Pass 1 record and are preserved verbatim. This Part records
a second, distinct pass run later on 2026-09-04 against a lawfully supplied local source
packet. Nothing in Part B rewrites a Pass 1 statement; where Pass 2 supersedes a Pass 1
disposition or corrects a Pass 1 count, it says so here and leaves the Pass 1 text in
place.

Provenance: Pass 2 was performed on 2026-09-04 by the Release 3 Semantic
Source-Acquisition Investigator in a work context separate from the Pass 1 investigator
and from the source-packet supplier; the first exact-head verification record of this
Part (review commit `af320c3a60ea5f1ab08da9db06969dded4153d4c`) was produced in the
Pass 2 context and therefore does not satisfy the separate-context independent-review
gate, which remains open.

### B.1 Identity gate (re-run before Pass 2 source work)

Re-derived from Git objects after a fresh fetch at 04:47 UTC on 2026-09-04.

| Check                                                                                                                                                                       | Expected                                         | Observed                                                                                | Result |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------- | ------ |
| Live head of `research/r3-semantic-source-acquisition-65a53a4` (Pass 1 head)                                                                                                | `0ef1bcd2b59b2ef95bd46476a0c5347b51f2c6ae`       | remote ref → `0ef1bcd2…`; `git cat-file -p` → tree `809699ff…`, one parent `65a53a4f…`  | match  |
| Pass 1 head tree                                                                                                                                                            | `809699ff8326f794a41d406125ee9babf3cffef8`       | as above                                                                                | match  |
| Sole parent (= `origin/main`)                                                                                                                                               | `65a53a4f2e54c691ccd76f71814c5a6e507f0046`       | `origin/main` → `65a53a4f…`                                                             | match  |
| Pass 1 result blob                                                                                                                                                          | `72de5f5a85b97f3d84aa213c16b231cf7656f7c9`       | `git ls-tree` at head → `72de5f5a…`; `git hash-object` of the shown content → same      | match  |
| Change set `65a53a4..0ef1bcd`                                                                                                                                               | one added path, the result file only             | `git diff --name-status` → `A governance/drafts/release-3-preparation/…-result.md` only | match  |
| Every Issue-pinned identity from Section 1.1 (containing tree, commission and README blobs, snapshot commit/tree, semantic result and commission blobs, three review blobs) | as in Section 1.1                                | all re-derived; all match                                                               | match  |
| Review PR state                                                                                                                                                             | open; head ref is the result branch; base `main` | open, not merged, mergeable, head `0ef1bcd2…`, base `65a53a4f…`; five checks successful | match  |

Identity gate outcome: **passed**. Decision-bearing comparisons below remain against the
semantic input snapshot (`7bd9c5a`, blob `8f215260…`).

### B.2 Supplied packet identity

A source packet was supplied to the investigator as a local file after Pass 1 was
recorded. It was verified before use and is **not** committed to the repository.

| Item                    | Value                                                                                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Packet form             | ZIP archive, 704,726 bytes, received 04:46 UTC, 2026-09-04                                                                                                                                                                                                                |
| Packet SHA-256          | `a4cc5b6ebbc6eb1a85b59b099de1da6c88b7830c6bd5afe6ae14152d294ad693` (recomputed locally; matches the value supplied with the packet)                                                                                                                                       |
| Members                 | `README.md`, `manifest.csv` (47 data rows, 18 columns), `gaps.md`, `sources/` with three PDF files                                                                                                                                                                        |
| Packet self-description | informative primary-source packet; asserts no disposition, no `SOURCE_SET_READY` decision, no catalogue edit; records RSM-02 candidates only as Section 9.2 reopen triggers                                                                                               |
| Supplier role           | external source-acquisition assistant to the steward; not the investigator; not an author of any fixed result or review                                                                                                                                                   |
| Trust posture           | the packet's manifest, gaps, hash values, and claims about issuing-host state were treated as supplier assertions and re-verified from the artifacts and Git objects wherever this environment allowed; assertions that could not be re-verified are marked as such below |

Bundled artifacts (SHA-256 recomputed locally from the extracted files; every value
matches the packet's manifest):

| Packet ID | File                                     | SHA-256                                                            | Pages | Assigned to   |
| --------- | ---------------------------------------- | ------------------------------------------------------------------ | ----- | ------------- |
| SRC-32    | `SRC-32-fda-2022-multiple-endpoints.pdf` | `40284a050aab0037799072b2340e37d4b02ab6f7f2339fff6ea1cd55673a9563` | 29    | SR-L (GUI-01) |
| SRC-33a   | `SRC-33a-ema-2002-ptc.pdf`               | `897bb9d6e9ced1865f709ca5fde8bbdcc2258ac6d89ed831cd6dcfaa0621e284` | 11    | SR-L (GUI-02) |
| SRC-33b   | `SRC-33b-ema-2017-draft.pdf`             | `1c5977c36f5f45a4845cb706ab6fc1a9c1a90a98ce68df7e6dcad240143982f7` | 15    | SR-L (GUI-02) |

The packet's remaining 44 rows carry no artifact: four are marked `GAP_LEGAL_URL_ONLY`
(SRC-22, SRC-23, SRC-24, SRC-30; supplier-recorded SHA-256 values for copies the supplier
retrieved, not bundled) and forty are marked `GAP` (external lawful route only).

### B.3 Pass 2 acquisition log

All attempts on 2026-09-04 between 04:47 and 04:49 UTC from the same environment as
Section 2.1. Route labels continue Section 2.

| Route | Target                                                                                                                                                                                                                                       | Result                                                                                                       |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| R4    | Lawfully supplied local packet (Section B.2)                                                                                                                                                                                                 | **received**; three artifacts extracted and inspected in full                                                |
| R1    | Issuing-authority download URLs recorded in the packet for SRC-32 (`www.fda.gov`) and SRC-33a (`www.ema.europa.eu`)                                                                                                                          | `CONNECT` refused, 403, before TLS — the bundled copies could **not** be re-hashed against the issuing hosts |
| R1    | SRC-22 and SRC-30 publisher PDF URLs (`projecteuclid.org`)                                                                                                                                                                                   | `CONNECT` refused, 403                                                                                       |
| R1    | SRC-23 author self-archive URL (`www.math.tau.ac.il`)                                                                                                                                                                                        | `CONNECT` refused, 403                                                                                       |
| R1    | SRC-24 author self-archive URL (`genomics.princeton.edu`)                                                                                                                                                                                    | `CONNECT` refused, 403                                                                                       |
| R1    | Re-probe of the Pass 1 host set plus `www.accessdata.fda.gov`, `www.federalregister.gov`, `hal.science`, `osf.io`, `dl.acm.org`, `www.taylorfrancis.com`, `www.wiley.com`, `www.springer.com`, `www.jstage.jst.go.jp`, `ndlsearch.ndl.go.jp` | every host `CONNECT` refused, 403; only the repository hosting service and package registries completed      |
| R2    | Page-fetch instrument against `www.fda.gov`, `www.ema.europa.eu`, `projecteuclid.org`, `doi.org`, `www.math.tau.ac.il`, `genomics.princeton.edu`                                                                                             | egress refusal for every domain                                                                              |
| R3    | Web index (control query only)                                                                                                                                                                                                               | reachable; snippets only; not used for any decision-bearing statement                                        |
| R5    | Repository tree and attachment mounts, re-checked before extraction                                                                                                                                                                          | no primary text other than the supplied packet                                                               |

Consequence: the four `GAP_LEGAL_URL_ONLY` items could not be retrieved or inspected in
this environment; their supplier-recorded SHA-256 values are carried as unverified
identity aids only. The three bundled artifacts are the only primary texts inspected in
Pass 2.

### B.4 Inspected source artifact register (Pass 2)

Inspection method for all three: full read of every page from the artifact's own text
layer, with the printed page mapping taken from the page markers printed in the
artifact; no rendering derivative, snippet, or secondary summary was used for any
statement below. PDF document-information fields are quoted as identity corroboration
only.

#### B.4.1 SRC-32 — FDA (October 2022), Multiple Endpoints in Clinical Trials: Guidance for Industry

| Field                         | Source-established value                                                                                                                                                                                                                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bibliographic identity        | _Multiple Endpoints in Clinical Trials — Guidance for Industry_; U.S. Department of Health and Human Services, Food and Drug Administration, Center for Drug Evaluation and Research (CDER) and Center for Biologics Evaluation and Research (CBER); October 2022; series label "Biostatistics" (cover and second page, both unnumbered) |
| Version / printing            | Final guidance: printed p. 1 states "This guidance represents the current thinking of the Food and Drug Administration (FDA or Agency) on this topic"; no draft banner anywhere; the document itself labels a different guidance "draft" (footnote 6, printed p. 3), so the distinction is one the artifact makes                        |
| Preparer                      | Office of Biostatistics, Office of Translational Sciences, CDER, in cooperation with CBER (footnote 1, printed p. 1)                                                                                                                                                                                                                     |
| Acquisition route             | R4, lawfully supplied packet (Section B.2); supplier-reported origin: issuing-authority download URL; origin **not** re-verifiable here (Section B.3)                                                                                                                                                                                    |
| Inspection date               | 2026-09-04                                                                                                                                                                                                                                                                                                                               |
| SHA-256                       | `40284a050aab0037799072b2340e37d4b02ab6f7f2339fff6ea1cd55673a9563`                                                                                                                                                                                                                                                                       |
| Page map                      | 29 PDF pages: cover, copies page, table of contents (unnumbered), then printed pp. 1–26 = PDF pp. 4–29; margin line numbers 1–438 are printed only on pp. 15–26 (references and appendix)                                                                                                                                                |
| Document-information fields   | Title/Subject/Keywords "Multiple Endpoints in Clinical Trials - Guidance for Industry"; Author "FDA/CDER"; creation 2022-10-18, modification 2022-10-19 (corroboration only)                                                                                                                                                             |
| Redistribution basis          | U.S. federal government work (investigator note: not stated in the artifact; the packet cites 17 U.S.C. §105); the file is in any case not committed                                                                                                                                                                                     |
| Not established from artifact | the regulatory docket number named in the packet's manifest does not appear in the artifact; it is neither confirmed nor used                                                                                                                                                                                                            |

#### B.4.2 SRC-33a — CPMP (adopted 19 September 2002), Points to Consider on Multiplicity Issues in Clinical Trials, CPMP/EWP/908/99

| Field                       | Source-established value                                                                                                                                                                                                                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bibliographic identity      | _Points to Consider on Multiplicity Issues in Clinical Trials_; Committee for Proprietary Medicinal Products (CPMP); The European Agency for the Evaluation of Medicinal Products (EMEA), London; reference CPMP/EWP/908/99; dated London, 19 September 2002 (cover)   |
| Version / printing          | Adopted version: procedural table on the cover ends "ADOPTION BY CPMP September 2002"; every printed page carries "CPMP/EWP/908/99" and "EMEA 2002"                                                                                                                    |
| Acquisition route           | R4, lawfully supplied packet; supplier-reported origin: issuing-authority document URL; origin not re-verifiable here                                                                                                                                                  |
| Inspection date             | 2026-09-04                                                                                                                                                                                                                                                             |
| SHA-256                     | `897bb9d6e9ced1865f709ca5fde8bbdcc2258ac6d89ed831cd6dcfaa0621e284`                                                                                                                                                                                                     |
| Page map                    | 11 PDF pages: cover (unnumbered) then printed "1/10" … "10/10" = PDF pp. 2–11                                                                                                                                                                                          |
| Document-information fields | Title "Points to consider on multiplicity issues in clinical trials"; Author "European Medicines Agency"; creation 2002-10-01; modification 2017-06-29 (the file was re-saved by the issuer in 2017; content identity is the 2002 adopted text, per the printed cover) |
| Printed reproduction notice | cover: "EMEA 2002 Reproduction and/or distribution of this document is authorised for non commercial purposes only provided the EMEA is acknowledged" — **narrower than the packet's stated basis** (Section B.9, U-2)                                                 |

#### B.4.3 SRC-33b — CHMP (draft, 15 December 2016; published for consultation 2017), Guideline on Multiplicity Issues in Clinical Trials, EMA/CHMP/44762/2017

| Field                       | Source-established value                                                                                                                                                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bibliographic identity      | _Guideline on multiplicity issues in clinical trials — Draft_; Committee for Human Medicinal Products (CHMP), European Medicines Agency; reference EMA/CHMP/44762/2017; dated 15 December 2016 (p. 1, lines 1–5)                                                                                                          |
| Version / printing          | Draft for consultation: "Draft agreed by Biostatistics Working Party (BSWP) November 2016; Adopted by CHMP for release for consultation 15 December 2016; Start of public consultation 01 April 2017; End of consultation (deadline for comments) 30 June 2017" (p. 1); document-information version field "CURRENT,1.11" |
| Stated relation to SRC-33a  | p. 1, lines 7–8: "This guideline replaces the 'Points to consider on multiplicity issues in clinical trials' (CPMP/EWP/908/99)" — a statement made in a draft; whether a final guideline was ever adopted is X-7 and remains unresolved (Section B.9)                                                                     |
| Acquisition route           | R4, lawfully supplied packet; supplier-reported origin: issuing-authority document URL; origin not re-verifiable here                                                                                                                                                                                                     |
| Inspection date             | 2026-09-04                                                                                                                                                                                                                                                                                                                |
| SHA-256                     | `1c5977c36f5f45a4845cb706ab6fc1a9c1a90a98ce68df7e6dcad240143982f7`                                                                                                                                                                                                                                                        |
| Page map                    | 15 PDF pages; PDF page = printed page ("Page n/15" from p. 2); margin line numbers 1–599 throughout                                                                                                                                                                                                                       |
| Document-information fields | Title "Guideline on multiplicity issues in clinical trials - for publication"; Author "European Medicines Agency"; document reference field "EMA/CHMP/44762/2017"; creation 2017-04-10                                                                                                                                    |
| Printed reproduction notice | p. 1: "© European Medicines Agency, 2017. Reproduction is authorised provided the source is acknowledged."                                                                                                                                                                                                                |

### B.5 Claim-to-source table for SR-L (Pass 2)

Pinpoints are printed pages (and margin line numbers where the artifact prints them).
"Source fact" is what the text states; "Investigator inference" is separated and marked.

| Claim ID | Claim (catalogue characterization to be verified)                                   | Source fact with pinpoint                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Relation to claim                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Status       |
| -------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| C-L1 (a) | FDA (2022): FWER framing                                                            | SRC-32 printed p. 4, §II.B: "FDA's concern for controlling the Type I error probability is to minimize the chances of a false favorable conclusion for any primary or secondary endpoints (see section III.), regardless of which and how many of these endpoints in the study have no effect. The Type I error probability associated with testing multiple endpoints of a study is called overall Type I error probability." Printed p. 13, §IV: "the probability of erroneously finding a statistically significant treatment effect in at least one endpoint regardless of the presence or absence of treatment effects in the other endpoints is the overall Type I error rate. This error rate is typically held to 0.05 (or 0.025 for one-sided tests)." Printed p. 7, §III.A.3: "The overall Type I error rate should control for the primary and secondary endpoint families all together."                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Supports, with a terminology qualification.** The quantity the guidance controls is the probability of at least one false rejection over the prespecified family, regardless of which and how many nulls are true — the strong-sense familywise error rate in substance. The artifact never uses the words "familywise", "family-wise", or "FWER" (full-text search: zero occurrences); its vocabulary is "overall Type I error probability/rate" and "family of endpoints". | `SUPPORTED`  |
| C-L1 (b) | FDA (2022): gatekeeping vocabulary                                                  | SRC-32 printed pp. 21–22, Appendix §7 "Gatekeeping Testing Strategies", lines 271–295: "Gatekeeping procedures (e.g., Dmitrienko et al. 2008, Dmitrienko and D'Agostino 2013) address the problems of testing hierarchically ordered families of null hypotheses … Different types of logical gatekeeping constraints have been studied including serial gatekeeping, parallel gatekeeping and their generalization referred to as tree-structured gatekeeping." Serial strategy: lines 283–290 (second family tested only if all primary-family hypotheses are rejected). Parallel strategy: lines 292–295 (second family tested when at least one primary-family endpoint is significant; "a separable testing method (e.g., Bonferroni method or Truncated Holm method)"). Multi-branched gatekeeping: printed p. 22, lines 308–311, with Figure A1 on printed p. 23.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Supports.** The vocabulary "serial gatekeeping", "parallel gatekeeping", "tree-structured gatekeeping", "separable testing method", and "multi-branched gatekeeping" is established verbatim from the issuing authority's text, with the definitions the guidance gives them.                                                                                                                                                                                                | `SUPPORTED`  |
| C-L1 (c) | (scope of GUI-01 as a framing source for the one-way multi-group question)          | SRC-32 printed p. 2, §II: "The issues of multiplicity and methods that apply to multiple endpoints also generally apply to other sources of multiplicity, including other estimand attributes (e.g., multiple doses, time points, or study population subgroups); however, these other sources of multiplicity will not be specifically addressed in this guidance. … This guidance focuses on the analysis and interpretation of multiple endpoints within a single clinical trial." Printed p. 18, appendix preamble, lines 110–115: "this guidance does not attempt to recommend any one method over another in most cases."                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Narrows (scope).** The guidance's framing is stated for endpoint families in a single trial, not for comparisons among several treatment groups; the applicability of its methods to "multiple doses" is asserted only as a general remark. The guidance selects no procedure. Investigator inference: GUI-01 is usable as a framing source for the error-rate concept and the gatekeeping vocabulary only; it is not a source for multi-group comparison semantics.         | `NARROWED`   |
| C-L2 (a) | EMA/CPMP (2002): multiplicity framing                                               | SRC-33a printed p. 1, §1: "Throughout this document the term 'control of type I error' rate will be used as an abbreviation for the control of the family-wise type I error in the strong sense, i.e., there is control on the probability to reject at least one true null hypothesis, regardless which subset of null hypotheses happens to be true." Printed p. 2, §2: methods controlling overall α are "multiple-level-α-tests"; α is split and hypotheses tested at fractions of α ("adjusting the type I error level"); confidence intervals consistent with the tests "are not available for many of the more complex multiple-level-α-tests (or more generally closed tests)"; for an unforeseen multiple-test situation "a conservative approach will be necessary e.g. Bonferroni's or a related procedure". Printed p. 3, §2.1: the no-adjustment situations "are members from the set of closed testing procedures that control the family-wise error rate".                                                                                                                                                                                                                                                                                                                                                                                         | **Supports.** Strong-sense familywise control is defined verbatim; the framing vocabulary (multiple-level-α tests, α splitting, closed tests, hierarchical testing) is established.                                                                                                                                                                                                                                                                                            | `SUPPORTED`  |
| C-L2 (b) | EMA/CPMP (2002): framing for designs with more than two treatment arms              | SRC-33a printed p. 5, §2.5: "As a general rule it can be stated that control of the family-wise type I error in the strong sense (i.e. application of closed test procedures) is a minimal prerequisite for confirmatory claims. It should be remembered that the usual confidence intervals for the pairwise differences between treatment groups are – except for a few instances - not consistent with the closed testing procedures, and are usually too narrow." Printed pp. 5–6, §2.5.3 (dose-response): "the control of the family-wise type I error in the strong sense is mandatory"; exploratory pairwise estimates for planning "an adjustment of the type I error is not necessary" (printed p. 6).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Supports and extends the framing to multi-arm designs.** This is the only inspected regulatory text that addresses several treatment groups directly. Investigator inference: for the Release 3 one-way question, GUI-02's 2002 text, not GUI-01, is the framing source that speaks to multi-group comparisons; the closed-test parenthetical is a framing statement, not a procedure selection.                                                                             | `SUPPORTED`  |
| C-L2 (c) | EMA (2017 draft): multiplicity framing                                              | SRC-33b p. 4, lines 105–111: "Control of the study-wise rate of false positive conclusions at an acceptable level α is an important principle … the term 'control of type I error' rate will be used as an abbreviation for the control of the study-wise type I error in the strong sense, i.e. there is control on the probability to reject at least one out of several true null hypotheses, regardless of which subset of null hypotheses happens to be true." p. 4, lines 119–121: frequentist framing at pre-specified level α. pp. 5–6, lines 173–179: "multiple-level-α tests"; "adjusting the local significance level"; "Other test procedures are available, that can be more powerful if the correlation between the test statistics are taken into account, e.g. the Dunnett's test on multiple comparisons to a single control." p. 8, lines 303–305: for more than two arms, "control of the study-wise type I error is a minimal prerequisite for confirmatory claims." pp. 9–10, lines 337–356: Phase II dose-finding "may not be required"; pivotal Phase III multi-dose "mandatory". pp. 14–15, lines 561–599: multiplicity in estimation; simultaneous confidence regions; selection bias; "simple but conservative confidence interval methods, such as Bonferroni-corrected intervals" advised when regions do not correspond to the test. | **Supports.** The draft keeps the strong-sense definition and the multi-arm prerequisite, renames "family-wise" to "study-wise", drops the 2002 parenthetical "(i.e. application of closed test procedures)", names Dunnett's many-to-one test as an example, and adds an estimation section. These are recorded as differences between the two GUI-02 texts, not as a conflict to adjudicate here (Section B.9, U-3).                                                         | `SUPPORTED`  |
| C-L2 (d) | (currency of GUI-02(b): whether the 2017 draft was superseded by a final guideline) | SRC-33b p. 1, lines 7–8 states that the guideline "replaces" CPMP/EWP/908/99, but the artifact is a draft released for consultation. No inspected artifact establishes whether a final version was adopted. The issuing host was unreachable (Section B.3); the packet's assertion that the host still lists the 2002 text as the current effective version could not be verified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Does not resolve X-7.** Not a claim about what the sources state; it is a currency question carried as a reopen condition (Section B.11).                                                                                                                                                                                                                                                                                                                                    | `OPEN (X-7)` |

Numerical statements read from the sources (illustrative in the sources; not
Protocol quantities): SRC-32 printed p. 4 names 0.05 two-sided and 0.025 one-sided as
the most widely used α; printed p. 5 computes overall Type I error of about 0.05, 7%,
and 22% for two, three, and ten independent endpoints at two-sided 0.05, and printed p. 8
computes 64% joint power for two independent co-primary endpoints each at 80%; SRC-33a
printed p. 1 and SRC-33b p. 4 compute 12% (2017: "approximately 12%") for five
independent one-sided 2.5% tests. Investigator recomputation: 0.0494, 0.0731, 0.2237,
0.64, and 0.1189 — each agrees with the source at the precision the source prints.

Reference-list corroboration (identity only, never content): SRC-32 printed pp. 15–17,
lines 1–101, lists Hochberg (1988) as Biometrika 75:800–802 (lines 46–47), Holm (1979)
as Scandinavian Journal of Statistics 6(2):65–70 (lines 52–53), Bretz et al. (2009) as
Statistics in Medicine 28:586–604 (lines 15–16), Westfall and Young (1993) as
Wiley-Interscience, New York (lines 97–98), Wiens (2003) as Pharmaceutical Statistics
2:211–215 (lines 100–101), and the CPMP (2002) Points to Consider (lines 22–26). These
agree with the identities of SRC-16, SRC-26, SRC-25, SRC-27 (c), and SRC-33 (a) recorded
in Section 11. They resolve none of X-1 through X-7.

### B.6 Required analysis for the affected entries (Pass 2)

The commission's eight items, applied to the two entries assigned to SR-L. Nothing in
this section is applied to any other entry.

#### B.6.1 GUI-01 — FDA Multiple Endpoints guidance (2022)

1. **Exact item and variant described by the source.** A final regulatory guidance
   (October 2022) on multiple endpoints within a single clinical trial; a framing
   document, not a procedure. Its appendix describes eight method classes (Bonferroni,
   Holm, Hochberg, prospective alpha allocation, fixed sequence, resampling,
   gatekeeping, graphical) as commonly used options and recommends none in most cases
   (printed p. 18, lines 110–115).
2. **Source statement versus investigator inference.** Source statements: Section B.5,
   rows C-L1 (a)–(c). Investigator inference: the "overall Type I error rate" is the
   strong-sense familywise error rate in substance; the guidance's endpoint-family scope
   means it does not itself speak to one-way multi-group comparison semantics.
3. **Member set, target, error criterion, guarantee strength.** Member set: the
   prespecified primary and secondary endpoint families of one trial (printed pp. 4–7).
   Target: false favorable conclusions on any member. Criterion: overall Type I error
   probability, defined as at-least-one-false-rejection regardless of which and how many
   nulls are true (printed p. 4, p. 13). Strength: strong-sense control is what the
   definition describes; the words "strong sense" are not used.
4. **Assumptions recorded.** For the framing itself: prespecification of endpoints and
   analyses (printed pp. 4–6). For the appendix's method descriptions: Bonferroni and
   Holm described as assumption-free with respect to correlation (printed p. 19, lines
   188–190); Hochberg described as controlling "for independent endpoint tests or for
   positively correlated dependent tests with standard test statistics in some cases"
   and failing "for some negatively correlated tests" (printed pp. 19–20, lines 190–198,
   citing Sarkar and Chang 1997 and Huque 2016); prospective alpha allocation valid for
   independent or positively correlated endpoints (printed p. 20, lines 211–213);
   resampling requiring "few, albeit important, assumptions" and large samples (printed
   p. 21, lines 261–269). **These appendix descriptions are secondary characterizations
   of procedures whose primary texts are assigned to other holds. They are recorded here
   because the source states them; they are not used to support, narrow, or close SR-B,
   SR-C, SR-D, RSM-01, or RSM-02.**
5. **Result classes and numerical quantities justified.** The guidance justifies a
   framing (control the overall Type I error for the prespecified family at 0.05
   two-sided or 0.025 one-sided) and vocabulary; it justifies no test statistic, critical
   value, or adjusted-p arithmetic for the Protocol. The illustrative inflation numbers
   are verified above.
6. **Mismatch with the reviewed catalogue.** None material. Terminology: the catalogue
   says "FWER framing"; the source says "overall Type I error rate". Scope: the
   catalogue lists GUI-01 as "required reading for FWER framing before the RFC"; the
   source's framing is endpoint-scoped, which the catalogue does not contradict but
   does not state.
7. **Support / narrow / contradict / not resolve.** Supports the "FWER framing" and
   "gatekeeping vocabulary" characterization, narrowed by the terminology and scope
   qualifications above. Nothing contradicts.
8. **Reopen condition.** Issuance of a revised or superseding FDA multiple-endpoints
   guidance; or any dependent proposal citing GUI-01 for multi-group comparison
   semantics rather than for framing and vocabulary.

#### B.6.2 GUI-02 — EMA PtC (2002) and draft guideline (2017)

1. **Exact items and variants.** (a) CPMP/EWP/908/99, adopted 19 September 2002 — a
   Points-to-Consider document; (b) EMA/CHMP/44762/2017 — a draft guideline released
   for consultation (consultation 1 April–30 June 2017) that states it replaces (a).
   Both are framing documents. Neither is a procedure.
2. **Source statement versus investigator inference.** Source statements: Section B.5,
   rows C-L2 (a)–(d). Investigator inference: (a) is the inspected regulatory text that
   directly addresses designs with more than two treatment arms; the 2002→2017
   vocabulary change ("family-wise" → "study-wise") and the dropped closed-test
   parenthetical are differences in framing emphasis, not a change in the defined
   quantity.
3. **Member set, target, error criterion, guarantee strength.** Member set: the
   confirmatory null hypotheses of one trial (endpoints, arms, doses, subgroups as
   pre-specified). Target: false positive confirmatory conclusions. Criterion:
   family-wise (2002) / study-wise (2017) type I error. Strength: **strong sense,
   stated verbatim in both texts** (2002 printed p. 1; 2017 p. 4, lines 108–111).
4. **Assumptions recorded.** Frequentist decision framework at a pre-specified α
   (2017 p. 4, lines 119–121); pre-specification of the multiplicity procedure "without
   room for choice" (2017 p. 6, lines 180–183; 2002 printed p. 2); for multi-arm
   designs, strong-sense control as a minimal prerequisite (2002 printed p. 5; 2017
   p. 8); confidence intervals consistent with complex procedures often unavailable
   (2002 printed p. 2; 2017 pp. 14–15, lines 561–572). Dunnett's many-to-one test is
   named as an example of a correlation-aware procedure (2017 p. 6, lines 177–179);
   this mention is secondary and is not used for MTO-01 or hold SR-J.
5. **Result classes and numerical quantities justified.** A framing (strong-sense
   family-/study-wise control as a prerequisite for confirmatory claims, including in
   multi-arm and multi-dose confirmatory designs) and an estimation-side framing
   (simultaneous confidence regions; Bonferroni-corrected intervals as a conservative
   fallback; selection bias). No test statistic, critical value, or adjusted-p
   arithmetic.
6. **Mismatch with the reviewed catalogue.** None. The catalogue's "regulatory
   multiplicity framing" characterization is met by both texts.
7. **Support / narrow / contradict / not resolve.** Supports. The currency of (b) (X-7)
   is not resolved.
8. **Reopen condition.** Adoption of a final EMA multiplicity guideline superseding
   the 2017 draft or the 2002 Points to Consider (X-7); or any dependent proposal
   relying on the 2017 draft's estimation section as adopted regulatory text.

### B.7 Hold dispositions after Pass 2 (all fourteen re-adjudicated)

| Hold   | Coverage                                      | Pass 2 source outcome                                                                                                    | Pass 1             | Pass 2 disposition | Basis                                                                                                                                                                                                                                                          |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SR-A   | OMN-01 … OMN-04                               | no assigned source acquired                                                                                              | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-B   | PVL-01 attribution; PVL-02                    | no assigned source acquired; SRC-32's Bonferroni description is secondary and not used                                   | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-C   | PVL-06 … PVL-10                               | no assigned source acquired; SRC-32's Holm and Hochberg descriptions are secondary and not used                          | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-D   | CLS-01 … CLS-06                               | no assigned source acquired; SRC-32's fixed-sequence, gatekeeping, and graphical descriptions are secondary and not used | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-E   | APR-01 historical attribution                 | no assigned source acquired                                                                                              | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-F   | APR-05; APR-06                                | no assigned source acquired                                                                                              | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-G   | APR-09                                        | no assigned source acquired                                                                                              | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-H   | APR-10 … APR-14                               | no assigned source acquired                                                                                              | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-I   | HET-01 … HET-03                               | no assigned source acquired                                                                                              | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-J   | MTO-02; MTO-03; MCB-01                        | no assigned source acquired (SRC-30 lawful URL refused); SRC-33b's Dunnett mention is secondary and not used             | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged; X-8 (identity of the SRC-28 "Marcus (1976)" item) recorded (Sections B.9, B.10)                                                                                                                                                                     |
| SR-K   | FDR-01 dependence scope; FDR-02 … FDR-04      | no assigned source acquired (SRC-22, SRC-23, SRC-24 lawful URLs refused)                                                 | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged                                                                                                                                                                                                                                                      |
| SR-L   | GUI-01; GUI-02                                | SRC-32, SRC-33 (a), SRC-33 (b) inspected in full with SHA-256 and printed pinpoints (Sections B.4–B.6)                   | `INPUT_INCOMPLETE` | **`CLOSED`**       | every decision-bearing claim the hold exists to verify (C-L1 a–b, C-L2 a–c) is directly supported with exact artifact identity and pinpoints; qualifications and the X-7 reopen condition are recorded, none of them being a claim the sources fail to support |
| RSM-01 | Westfall-Young maxT / minP                    | SRC-25 not acquired; SRC-32's resampling paragraph (printed p. 21) is a secondary description and is not used            | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged (Section B.8)                                                                                                                                                                                                                                        |
| RSM-02 | permutation-based pairwise/step-down families | no candidate text acquired                                                                                               | `INPUT_INCOMPLETE` | `INPUT_INCOMPLETE` | unchanged; V-1 … V-4 remain reopen triggers / variant-split candidates only (Section B.8)                                                                                                                                                                      |

What `CLOSED` for SR-L means: the source-acquisition obstacle for GUI-01 and GUI-02 is
removed and their framing characterization is verified from the issuing authorities'
texts. It selects nothing, changes no catalogue token, and does not itself lift the
hold-blocked marker on the two entries; that is the steward's catalogue action after
independent exact-head review. SR-L's closure does not bear on any other hold: the
regulatory texts describe procedures only at second hand, and no such description is
used anywhere in this report as support for a procedure entry.

### B.8 Resampling entries after Pass 2

- **RSM-01.** SRC-25 remains unacquired (monograph; publisher and library hosts refused;
  no copy supplied). SRC-32 printed p. 21, Appendix §6, describes resampling-based
  procedures citing Westfall and Young (1993) in general terms (data-based null
  distribution; bootstrap and permutation; assumptions hard to verify in small samples).
  This is a regulatory summary, not the primary text; it establishes neither the
  maxT/minP definitions nor subset pivotality nor the member set, and is not used.
  **Disposition: `INPUT_INCOMPLETE`** (unchanged).
- **RSM-02.** No candidate text (V-1 … V-4) was acquired. The candidates remain reopen
  triggers and possible variant-split candidates exactly as in Section 9.2; none is
  promoted, none redefines the fixed entry, and no evidence from any inspected source is
  generalized to a permutation or step-down family. The Pass 1 forward note (Section
  7.2) stands: if the candidates are later inspected and resolve to several materially
  different variants, the entry becomes named-gap `PARTIAL` at best and a catalogue
  reopen with a steward variant-split decision is required; that outcome is not a
  reason to treat the resampling lane as resolved. **Disposition: `INPUT_INCOMPLETE`**
  (unchanged).

### B.9 Conflicts, unresolved questions, and uncertainties surfaced in Pass 2

No primary-source conflict bearing on a catalogue procedure was found, because the only
inspected sources are framing documents. Items surfaced:

- **X-7 (carried; not resolved).** Whether a final EMA guideline superseded the 2017
  draft or the 2002 Points to Consider cannot be established from the inspected
  artifacts, and the issuing host was unreachable. The packet's statement about the
  host's current listing is unverified here.
- **X-8 (new, bibliographic; named gap).** The fixed result's SRC-28 names "Marcus
  (1976)" among the step-down many-to-one texts; Section 11 of this report carries no
  row for it (Section B.10). Its identity — the same paper as SRC-18 (Marcus, Peritz,
  and Gabriel 1976) or a distinct Marcus 1976 text — is not established and must be
  confirmed from the reference lists of Dunnett and Tamhane (1991, 1992) or another
  inspectable bibliographic source when supplied. Until it is, X-8 stays a named
  bibliographic gap: no required item is added to SR-J, and the source totals are
  stated as ranges (Section B.10). If X-8 resolves to a distinct text, its full
  bibliographic identity is added to the SR-J requirement; if it resolves to SRC-18,
  nothing is added.
- **U-1 (terminology, recorded, not a conflict).** SRC-32 does not use "familywise" or
  "FWER"; its "overall Type I error rate" is defined as the strong-sense quantity. Any
  dependent text quoting GUI-01 should use the guidance's own term or state the
  equivalence explicitly.
- **U-2 (redistribution notice discrepancy, recorded).** The printed notice on SRC-33a
  permits reproduction "for non commercial purposes only" with acknowledgment, which is
  narrower than the current website legal notice the packet cites. This does not affect
  inspection and no file is committed; a steward relying on the packet's redistribution
  basis for SRC-33a should note the artifact's own printed terms.
- **U-3 (differences between the two GUI-02 texts, recorded).** "family-wise" (2002) →
  "study-wise" (2017); the 2002 parenthetical tying the multi-arm prerequisite to
  closed test procedures is absent in 2017; 2017 adds an estimation section and names
  Dunnett's test. Both texts define the same strong-sense quantity. No adjudication is
  needed for the framing claim; a dependent proposal citing one text's specific wording
  should cite that text.
- **U-4 (source-internal identifier anomaly, recorded).** SRC-33b p. 3, lines 57–58,
  refers to the 2002 Points to Consider under the identifier "EMA/286914/2012", which
  differs from the identifier printed on SRC-33a (CPMP/EWP/908/99). Investigator
  inference: a cross-reference slip in the draft; it does not affect identity of either
  artifact, both of which are established from their own covers.
- **U-5 (origin cross-check pending).** The three bundled files could not be re-hashed
  against the issuing hosts from this environment. Identity rests on the artifacts'
  printed covers, reference numbers, dates, and document-information fields, which are
  mutually consistent. An independent reviewer with host access should re-download and
  compare SHA-256 values; a mismatch would reopen SR-L for re-inspection of the host
  copy.

Unresolved questions carried forward unchanged from the fixed result: I-03/D-03, D-02,
D-04, and the SR-E attribution residual. X-1 through X-6 are unchanged.

### B.10 Count reconciliation

Recomputed from the Pass 1 text at blob `72de5f5a…` and from the packet.

| Figure                                        | Where stated               | Stated | Recount                                                               | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------- | -------------------------- | ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SR-A through SR-L named sources               | Section 2.8                | 43     | 42 rows in Section 11 (4 + 2 + 6 + 5 + 1 + 3 + 1 + 7 + 3 + 4 + 3 + 3) | The 43 arises from counting SRC-28 as four texts — Marcus (1976), Naik (1975), Dunnett-Tamhane (1991), Dunnett-Tamhane (1992), as the fixed result's Section 2.2 names it — while Section 11 lists three SRC-28 rows under SR-J. Whether "Marcus (1976)" is the same text as SRC-18 (already a Section 11 row under SR-D) or a distinct text is unresolved (X-8). Neither Pass 1 figure is silently edited. The SR requirement is therefore stated as a range: **42–43** — 42 if X-8 resolves to SRC-18 (Section 2.8 then double-counts one text), 43 if it resolves to a distinct text (Section 11 then omits one item). |
| Section 11 SR rows                            | Section 11                 | —      | 42                                                                    | as above; plus one RSM-01 row and one RSM-02 row referencing four candidates (44 table rows)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Packet total                                  | packet README and manifest | 47     | 47                                                                    | 42 SR rows (mirroring Section 11) + 1 (SRC-25) + 4 (V-1 … V-4). Required total as a range: **47–48** — 47 if X-8 resolves to SRC-18, 48 if it resolves to a distinct text.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Lawful-URL-only items                         | packet `gaps.md` Section 1 | 3      | 4                                                                     | manifest status `GAP_LEGAL_URL_ONLY` on SRC-22, SRC-23, SRC-24, SRC-30; `gaps.md` Section 1 says 3 and its Section 3 closing paragraph corrects itself to 4; the README says 4. The Section 1 table's "36 unbundled SR" is correspondingly 35.                                                                                                                                                                                                                                                                                                                                                                            |
| Bundled items                                 | packet                     | 3      | 3                                                                     | verified by SHA-256 and cover inspection                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Items inspected in Pass 2                     | this Part                  | —      | 3                                                                     | all assigned to SR-L                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Required items still uninspected after Pass 2 | this Part                  | —      | 44–45                                                                 | 39–40 SR items (42–43 minus the 3 inspected) + 1 (SRC-25) + 4 (V-1 … V-4); 44 if X-8 resolves to SRC-18, 45 if to a distinct text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

### B.11 Reopen conditions after Pass 2

Section 9.1's conditions continue to apply. Added for SR-L:

1. a final EMA multiplicity guideline, or a revised FDA multiple-endpoints guidance, is
   published (X-7 and Section B.6 item 8) — GUI-02 or GUI-01 is then re-inspected;
2. the issuing-host copy of any bundled artifact is found to differ by SHA-256 from the
   inspected copy (U-5) — SR-L is re-inspected against the host copy;
3. a dependent proposal cites GUI-01 as a source for multi-group comparison semantics,
   or cites the 2017 draft's estimation section as adopted text — the citation is
   outside what Pass 2 verified and must be re-sourced.

### B.12 `NARROW` reconsideration and overall disposition after Pass 2

- **Can the `NARROW` program disposition be reconsidered?** No. The comprehensive public
  question spans lanes whose primary texts remain uninspected (SR-A through SR-K,
  RSM-01, RSM-02). Verifying the two framing entries does not make that source basis
  reviewable. `NARROW` stands.
- **`SOURCE_SET_READY` test.** Requires `CLOSED` on all fourteen. One of fourteen is
  `CLOSED`. **Not satisfied.**
- **Precedence `NO_GO` > `INPUT_INCOMPLETE` > `PARTIAL`.** `NO_GO`: none (no inspected
  evidence contradicts the catalogue). `INPUT_INCOMPLETE`: thirteen (SR-A through SR-K,
  RSM-01, RSM-02). `PARTIAL`: none. `CLOSED`: one (SR-L).

**Overall disposition after Pass 2: `INPUT_INCOMPLETE`.**

### B.13 Remaining supply task

Section 11 remains the required-source list, with these corrections and status notes:

- SR-J: only if X-8 resolves to a text distinct from SRC-18, add that text, with its
  full bibliographic identity, to the SR-J requirement; until then no item is added and
  the totals remain 42–43 SR / 47–48 total / 44–45 uninspected (Section B.10);
- SR-L: no further supply needed for the hold as commissioned; host-copy SHA-256
  cross-check (U-5) and the X-7 currency check are reviewer or steward actions requiring
  access to `www.fda.gov` and `www.ema.europa.eu`;
- SR-K and SR-J: SRC-22, SRC-23, SRC-24, SRC-30 have supplier-recorded lawful URLs and
  SHA-256 values in the packet; they must be supplied as local copies (or the four hosts
  added to the environment policy) — none was inspectable here;
- all other Section 11 items: unchanged; lawful supply via institutional access,
  purchase, or library loan; nothing may be committed.

Lowest-cost next increment: SRC-22 and SRC-30 (publisher free-to-read copies) would
allow SR-K's FDR-01/FDR-02 dependence-scope claims and SR-J's MCB-01 claim to be
inspected; neither hold can close on those alone (SR-K also needs SRC-23 and SRC-24;
SR-J also needs SRC-28).

### B.14 Validation record (Pass 2 head)

Run in the working clone on 2026-09-04 against the exact content committed as the Pass 2
head, after pinned dependency installation.

- `pnpm format:check`: "All matched files use Prettier code style!" — clean.
- `pnpm lint:markdown`: 350 files linted, 0 issues (a first run reported one
  heading-increment finding on the pass ledger heading, which was corrected before
  commit).
- `node --import tsx tooling/src/validate.ts`: "validate: OK" — registries,
  traceability, normative lint, authority, gates, conformance manifest, links,
  private-dependency and language audits, phase-1 schemas, cross-checks, code-path
  audits, and the snapshot manifest mechanism clean.

### B.15 Public-artifact self-check (Pass 2)

- Only this file changed. The fixed semantic result, both commissions, the RFC draft,
  authoritative artifacts, registries, schemas, conformance artifacts, reference code,
  generated views, and Release 2 material are untouched.
- No PDF, ZIP, or other primary-source file is committed. The packet's own metadata
  cells are not reproduced verbatim; only artifact-derived facts and the packet's hash
  values are recorded.
- The Pass 1 record (Sections 1–13) is preserved verbatim, including its acquisition
  log, its `INPUT_INCOMPLETE` dispositions, its Section 2.8 and Section 11 figures, and
  its closing line; Pass 2 corrections are stated in Section B.10 rather than applied to
  the Pass 1 text.
- The fixed 49-entry catalogue, its `NARROW` disposition, and both reviewed `TRANSFER`
  dispositions are unchanged. No entry is redefined, split, promoted, or demoted. RSM-02
  candidates are recorded only as reopen triggers / variant-split candidates.
- Source-established facts (Sections B.4–B.5), investigator inference (marked in
  Sections B.5–B.6 and B.9), dispositions (Sections B.7, B.8, B.12), and count
  corrections (Section B.10) are kept separate.
- Attribution is role-based; no drafting, extraction, search, or review software,
  service, provider, or mechanism is identified; no human authorship is claimed.

RELEASE 3 SEMANTIC SOURCE-ACQUISITION RESULT — PASS 2 COMPLETE - INPUT_INCOMPLETE - SR-L CLOSED - 13 OF 14 OPEN - NARROW PRESERVED - TRANSFER PRESERVED - AWAITING INDEPENDENT REVIEW - NOT PROTOCOL ADOPTION

## C. Supplied-source increment, 2026-09-07

### C.1 Status, provenance, and fixed inputs

This appended increment preserves Parts A and B as historical evidence. Their
non-acquisition statements describe those passes, not the supplied-source inventory
below. This is an author-side primary-source investigation and review candidate;
it is not independent review, a catalogue rewrite, or an implementation decision.
The Source Investigator has prior preparation, intake, and research context.
The work used an LLM-assisted authoring session, Python/PyMuPDF extraction and page
images, and exact rational arithmetic. A separate investigator and model, outside
this authoring context, is required by RFC rule 2 before promotion.

User authorization on 2026-09-07 covers integrating received sources, prioritizing
SR-K, and preparing independent review. The containing input commit is
`f39100161cb45de15767bdb19ed54aba9489b41a`; the acquisition commission blob there is
`3c7ddcc696f0c284213f7efe0da68e747bc238d7`. The prior result blob is
`5465cbcfd00708facac94785d9244b79166cb81e`.
The semantic comparison remains commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`,
tree `f0436f5784dbe34d4c150893c20a60f0431c5d90`, result blob
`8f21526040924b891f64724c2d0fde9ea94eff92`, and original commission blob
`c6760efc8450efe5fe2da6ccce2b2fac4846c066`. These identities were recomputed locally.
The preserved review blobs `fc61decb017821c403841a6db822ccd5e5b7233d`,
`e646429582d206d5299ce5ff1d0c2b8978323cd3`, and
`395054fd1e2f22a5ad63460b86be0394de429605` remain the prior review inputs, not reviews
of this increment. Their Git object types were checked; no new independent audit
of those reviews is claimed.

### C.2 Acquisition and artifact inventory

Acquisition route: original PDFs supplied by the user in this session, inspected
on 2026-09-07. No purchase or publisher retrieval was performed in this increment.
Earlier failed routes remain recorded in Parts A/B; receiving a local PDF does not
prove that those hosts have become reachable. Original bytes remain unchanged.
No source PDF or full-text extraction is published in this repository.
The guide numbers below are supplier locator labels, not Protocol identifiers.

All 19 sizes, page counts, and SHA-256 values were recomputed. Numbers 01–03 are
identical to the three Pass 2 originals: 19 received artifacts comprise 16 additional
artifacts and 3 duplicates of already-inspected sources. Receipt counts do not
measure independent reviews or completed holds. Text reading and selected equation
images underpin the new intake; this is not a full proof audit or verification of
every table cell. Hsu required OCR with mathematical image checks. For 01–03 the
existing Part B reading is reused; hashing is not a fresh substantive review.

| Number | Original file           |   Bytes | PDF pages | SHA-256                                                            |
| ------ | ----------------------- | ------: | --------: | ------------------------------------------------------------------ |
| 01     | `01_FDA_2022.pdf`       |  324708 |        29 | `40284a050aab0037799072b2340e37d4b02ab6f7f2339fff6ea1cd55673a9563` |
| 02     | `02_EMA_2002.pdf`       |  207098 |        11 | `897bb9d6e9ced1865f709ca5fde8bbdcc2258ac6d89ed831cd6dcfaa0621e284` |
| 03     | `03_EMA_2016.pdf`       |  194065 |        15 | `1c5977c36f5f45a4845cb706ab6fc1a9c1a90a98ce68df7e6dcad240143982f7` |
| 04     | `04_Benjamini_2001.pdf` |  169653 |        24 | `4bfbec2b1099968fee729852c5d6c3a8123ba6e5748e1e9583a81d5c5ebdef27` |
| 05     | `05_Hsu_1984.pdf`       |  649578 |         9 | `ac190ceeb614141b64da413248d94e3a3cfe050ab42be31ef7b4dc8db089065b` |
| 06     | `06_Newman_1939.pdf`    | 1141066 |        12 | `2a95351862462f2165a4a2f82f16572eb4a0482afcea2772c590ade02e45e974` |
| 07     | `07_Welch_1951.pdf`     | 1626731 |         8 | `f86986a4850cc2c161f41a401db87460772405281677e9cce702af4321dca30d` |
| 09     | `09_Scheffe_1953.pdf`   |  908514 |        19 | `bb0bd080601c566697ebb657f81aa6d08cc2a02239a31d4ada7c5a7da2cda701` |
| 10     | `10_Scheffe_1969.pdf`   |  219412 |         2 | `df5671bfb92e0ab64354dad5a117be19d7b536c2d0e2a9cc22ead004b1beb9ba` |
| 11     | `11_Simes_1986.pdf`     |  642630 |         5 | `6e8a40c5bf6df814f11a0565435dc5db7430bb26fac2b50df7aee723a41a6077` |
| 12     | `12_Hochberg_1988.pdf`  |  974801 |         4 | `588aa12db5cad0741229b2eaf4e63b9344fef99abb59ebdc85f16630602793e4` |
| 13     | `13_Hommel_1988.pdf`    |  655387 |         5 | `c006eb7c7a6cec1fb86e7ec3db333a1c14ae6b0e197a35bebfaf2572adb8cbc1` |
| 14     | `14_Rom_1990.pdf`       |  436687 |         4 | `9c72d73accb55d7f95ff71e47350b2225d4c342e69bee332b4e0a9032bbaa269` |
| 15     | `15_Marcus_1976.pdf`    |  446500 |         7 | `7b81e37b502d885658249196f25db32e1682d6461f3c15f7a3d56e3732899a24` |
| 16     | `16_Benjamini_2006.pdf` | 1777550 |        18 | `d96aea58a5490bb4c6e339e3fc9528affa09c10637003ba9f5533ca0d7a632e8` |
| 17     | `17_Duncan_1955.pdf`    | 4442167 |        43 | `6504e0bd884850d639ea5e0a9b5794d3c02f7d3df5895e3ca64ced6face64bdf` |
| 18     | `18_Holland_1987.pdf`   |  964480 |         8 | `d632570b190ef5ae3bdaa1e9a929e728c72e6106fa4b6d91b31192a32b3c549d` |
| 19     | `19_Storey_2002.pdf`    |  634954 |        21 | `4eafd121b98b693aa7fb3386de536a6a4902446cc4f48d8f5c3f2e489615a046` |
| 31     | `31_Romano_2005.pdf`    |  362932 |        15 | `2623c4335cdac339333ffaf7beade68049b0437d3a2337207c59556fb1f8a4f3` |

### C.3 Bibliography and non-SR-K claim impacts

Pinpoints use printed pages. For 01–03 use Part B's page/line mapping. For the other
PDFs, printed page p maps to PDF page as follows: 04 p−1164; 05 p−1135; 06 p−18;
07 p−328; 09 p−85; 10 page 229 is PDF 2; 11 p−749; 12 p−798; 13 p−381;
14 p−661; 15 p−653; 16 p−489; 17 p+1; 18 p−415; 19 p−477; 31 p−93.
These mappings include supplier covers where present.

| Number | Bibliographic identity                                                                                                                                                      | Claim/entry and direct pinpoints                          | Source finding and boundary                                                                                                                                                                                                                          |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01     | FDA, Multiple Endpoints in Clinical Trials, October 2022                                                                                                                    | C-L1 / GUI-01; B.4–B.6                                    | Same bytes; no new claim or hold change                                                                                                                                                                                                              |
| 02     | EMA/CPMP, Points to Consider on Multiplicity Issues in Clinical Trials, CPMP/EWP/908/99 (2002)                                                                              | C-L2 / GUI-02; B.4–B.6                                    | Same bytes; preserve existing scope                                                                                                                                                                                                                  |
| 03     | EMA, Guideline on Multiplicity Issues in Clinical Trials, EMA/CHMP/44762/2017, draft dated 2016-12-15                                                                       | C-L2 / GUI-02; B.4–B.6                                    | Filename year 2016 does not make this a different text from the 2017 consultation draft; final/current adoption not established                                                                                                                      |
| 05     | Hsu (1984), Constrained Simultaneous Confidence Intervals for Multiple Comparisons with the Best, Ann. Statist. 12(3):1136–1144                                             | C-J2 / MCB-01; 1136–1141, Theorem 3.1                     | Target theta_i minus best OTHER mean; common continuous location model, independent equal-size samples. Intervals use min(Delta−d,0), max(Delta+d,0), with calibrated d. Not arbitrary unequal-variance MCB or guaranteed unique-best identification |
| 06     | Newman (1939), The Distribution of Range in Samples from a Normal Population, Expressed in Terms of an Independent Estimate of Standard Deviation, Biometrika 31(1/2):20–30 | C-H1 / APR-10, partial; 20–24, 27–28                      | Studentized range with independent scale estimate; two-member critical value has sqrt(2) relation to two-sided t. Keuls remains unread; a rounded table is not a certified oracle                                                                    |
| 07     | Welch (1951), On the Comparison of Several Mean Values: An Alternative Approach, Biometrika 38(3/4):330–336                                                                 | C-A2 / OMN-02; 330, 334–335 equations (29)–(30)           | Independent normal means and independent chi-square variance estimates; heteroscedastic equal-means null; weighted statistic and noninteger denominator df; approximate F reference, not exact finite-sample F                                       |
| 09     | Scheffe (1953), A Method for Judging all Contrasts in the Analysis of Variance, Biometrika 40(1/2):87–104                                                                   | C-G1 / APR-09; 87–90 equations (1)–(13), 95–96            | Simultaneous all-contrast intervals under known covariance shape, normality, independent chi-square scale and rank conditions; data-suggested contrasts allowed within that space. See C.6 corrections                                               |
| 10     | Corrections (1969), Biometrika 56(1):229, item (1) for Scheffe                                                                                                              | C-G1 and X-1; 229                                         | Explicitly identifies 1953 article as 87–104; nine corrections, including deletion of interaction footnote. Other items on this page concern different authors                                                                                       |
| 11     | Simes (1986), An Improved Bonferroni Procedure for Multiple Tests of Significance, Biometrika 73(3):751–754                                                                 | C-C1 / PVL-06; 751–752 theorem, 754                       | Global intersection test: some p_(j) ≤ j alpha/m. Independent uniform nulls give exact level; arbitrary dependence not justified; not itself individual strong-FWER rejection                                                                        |
| 12     | Hochberg (1988), A Sharper Bonferroni Procedure for Multiple Tests of Significance, Biometrika 75(4):800–802                                                                | C-C2 / PVL-07; 800–801                                    | Step-up rejects through largest i with p_(i) ≤ alpha/(m−i+1); inherits Simes validity requirements for relevant intersections, not Holm's arbitrary-dependence scope                                                                                 |
| 13     | Hommel (1988), A Stagewise Rejective Multiple Test Procedure Based on a Modified Bonferroni Test, Biometrika 75(2):383–386                                                  | C-C3 / PVL-08; 383–385                                    | Closed-Simes shortcut; valid local intersection tests support strong FWER; independence is a supplied sufficient basis, not arbitrary dependence                                                                                                     |
| 14     | Rom (1990), A Sequentially Rejective Test Procedure Based on a Modified Bonferroni Inequality, Biometrika 77(3):663–665                                                     | C-C5 / PVL-10, Rom variant; 663–664 equation (2), Table 1 | Sharpened step-up using recursively calibrated constants under independence. One printed constant conflicts with the recurrence; C.7                                                                                                                 |
| 15     | Marcus, Peritz and Gabriel (1976), On Closed Testing Procedures with Special Reference to Ordered Analysis of Variance, Biometrika 63(3):655–660                            | C-D1 / CLS-01; 655–658                                    | Every required intersection needs a level-alpha local test; dependence between valid local tests is not an extra condition. Does not make an invalid Simes local test valid. Ordered-alternative examples require a priori order                     |
| 17     | Duncan (1955), Multiple Range and Multiple F Tests, Biometrics 11(1):1–42                                                                                                   | C-H2 / APR-11; 5–7, 16, 28, 41                            | Equal-precision independent normal means and independent variance estimate; p-mean protection (1−alpha)^(p−1). Every containing ordered subset matters; p.41 monotonizes critical ranges by max with predecessor. Nominal 5% is not general 5% FWER  |
| 18     | Holland and Copenhaver (1987), An Improved Sequentially Rejective Bonferroni Test Procedure, Biometrics 43(2):417–423                                                       | C-C5 / PVL-10, separate variant; 418–422                  | Step-down critical value 1−(1−alpha)^(1/t_i), stopping at first failure; t_i bounds possible true null count under preceding rejections. POD lower-orthant condition is not merely positive pairwise correlation                                     |
| 31     | Romano and Wolf (2005), Exact and Approximate Stepdown Methods for Multiple Hypothesis Testing, JASA 100(469):94–108                                                        | C-R2 / RSM-02 candidate V-3; 98–104, Theorems 3–8         | Randomization, bootstrap and subsampling have distinct conditions. Monotone critical values alone are insufficient; transformation invariance or asymptotic assumptions still matter. No silent family-wide replacement or variant adoption          |

These are source-supported, bounded characterizations; the investigator's impact
judgment is to retain every fixed catalogue classification. The shared PVL-10 entry
contains two different procedures, not interchangeable algorithms. Other unaffected
entries retain Section 6 and B.7's impact and completion conditions. The individual
newly inspected rows above do not close multi-source holds with missing texts.

### C.4 SR-K primary-source result

The three required texts are now available: 04 = SRC-22, Benjamini and Yekutieli
(2001), The Control of the False Discovery Rate in Multiple Testing under Dependency,
Ann. Statist. 29(4):1165–1188; 16 = SRC-23, Benjamini, Krieger and Yekutieli (2006),
Adaptive Linear Step-up Procedures That Control the False Discovery Rate,
Biometrika 93(3):491–507; 19 = SRC-24, Storey (2002), A Direct Approach to False
Discovery Rates, JRSS B 64(3):479–498. All three were read in the intake; key
definitions and formulas were checked against page images. BY pp.1174–1175 were
rechecked visually for the present family mapping.

#### C.4.1 C-K1: BH dependence and BY variants

| Locator in 04                                   | Source fact                                                                                                                                              | Boundary / investigator application                                                                                         |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1167 equation (1), 1169 section 2.1             | Fixed finite family of m hypotheses; V false rejections, R total rejections; FDR=E[V/(R or 1)]; BH step-up uses i q/m                                    | Error criterion is an expectation, not FWER or a bound on every realized false-discovery proportion                         |
| 1168 PRDS definition, Theorem 1.2               | For increasing D, conditional probability of X in D is nondecreasing in a true-null coordinate; BH FDR ≤ (m0/m)q under the stated condition              | PRDS applies on the true-null subset, including partial-null configurations; empirical positive correlation is insufficient |
| 1169 Theorem 1.3, 1182–1183 proof               | Replace q by q/H_m, H_m=sum(1/j), for arbitrary dependence                                                                                               | Valid (super-uniform) marginal null p-values remain necessary; correction does not repair invalid approximate p-values      |
| 1172–1173 Case 1; 1174 Corollary 3.3 and Case 3 | Certain normal numerators and their absolute values divided by an independent chi-square scale satisfy the needed dependence condition                   | Two-sided shared-denominator t tests are not automatically covered merely because the denominator is shared                 |
| 1174–1175 Case 4, 1180 Remark 4.2               | Signed Studentized normal statistics need not be globally PRDS; the relevant monotonicity suffices for one-sided tests at q<1/2                          | Preserve the range restriction and numerator covariance assumptions                                                         |
| 1175 Problems 2–3                               | Orthogonal contrasts in balanced normal designs and qualified one-sided many-to-one comparisons are applications                                         | Do not read Problem 3's shorthand PRDS statement in isolation from Case 4 and Remark 4.2                                    |
| 1182 discussion                                 | The paper states that MTP2 and PRDS do not hold for the discussed normal all-pairs statistics; whether BH controls FDR there remains open in its account | This is a limitation of this source, not a claim about the current literature                                               |

Concrete scope mapping (investigator derivation using those source conditions):

- For independent normal group means with common population variance, prespecified
  contrasts orthogonal in the covariance metric have independent normal numerators.
  With a residual variance estimate independent of those means and with the stated
  chi-square law, the two-sided absolute-statistic family is within Case 3. Balance
  alone does not establish orthogonality of an arbitrary chosen family.
- For prespecified one-sided treatment-minus-common-control comparisons, numerator
  covariances between distinct comparisons equal the positive control-mean variance
  before normalization. Under the same normal/independent chi-square scale model,
  Case 4 provides the source route at q<1/2. This is not blanket global PRDS or a
  two-sided many-to-one guarantee.
- An arbitrary set of two-sided all-pairs contrasts, data-selected family, unequal
  variance Welch comparisons, or estimated general covariance model does not get
  unadjusted BH control from these arguments. A separately justified family-specific
  result is needed; alternatively Theorem 1.3 supports the harmonic correction if
  the individual null p-values are valid. No alternative is selected here.

The source supports a conditional, family-specific answer to C-K1; it does not
support the assertion that all one-way shared-variance statistics satisfy PRDS.
This narrows applicability without contradicting the fixed catalogue, which
explicitly left the dependence question open. No new true-null or model declaration
is claimed mechanically verifiable from reported numbers alone.

Output/numerical boundary: BH and the harmonic variant determine a rejection set.
Source 16 p.493 gives the ordinary-BH suffix-minimum formula m p_(j)/j.
The harmonic variant m H_m p_(j)/j is investigator algebra; both are capped at 1
for the threshold-equivalent adjusted-value representation here. This transformation is not Storey's
q-value definition. It adds no adopted output contract, sorting/tie protocol or
floating-point tolerance. Member set and m remain fixed; no hypothesis selection
is silently removed from the multiplicity count.

#### C.4.2 C-K2: two-stage and other adaptive procedures

Source 16, p.495 Definition 6, defines TST: run BH at q'=q/(1+q), with r1 rejections;
if r1=0 stop with none, if r1=m stop with all, otherwise set estimated m0=m−r1 and
run BH again on all original m p-values at q' m/(m−r1).
Theorem 1 and its proof, pp.497–498 (section setup on p.496), supply FDR≤q under independence. The family
consists of the original fixed m hypotheses, the nulls those tested by valid p-values;
the output here is the rejection set. No degrees of freedom, sampling balance or
variance model is supplied by an abstract adaptive-p-value rule: those belong to
the individual p-value construction. Its guarantee does not repair invalid p-values.

Other variants are distinct: Definitions 2–5 (pp.493–495), multiple-stage Definition 7,
and Theorem 2's prespecified-rank estimator (p.498) are not all the same adaptive BH.
Theorem 1 is not transferred to a data-chosen rank, arbitrary iteration or dependence.
The pp.502–504 positive-dependence simulations do not establish a PRDS theorem.
The finite-sample examples and Storey discussion on pp.499–501 retain their correction
terms and restrictions, including the +1 and p≤lambda conditions of the compared
procedure. These are not silently inserted into Storey 2002's original estimator.

Investigator finding: the motivating p.495 equation (1) displays
(m−R)/(1−q) ≤ (m−R)(1+q), which is false for 0<q<1 and m−R>0.
The image confirms the sign. This is not used as a proof. Definition 6 and the
formal Theorem 1 are evaluated separately; the observation does not invalidate TST.
Official erratum status has not been searched in this increment.
The printed p.505 example gives ordinary BH 4 rejections and TST 8; C.7 reproduces
those decisions with exact rational arithmetic. The second example's complete
138 input p-values are absent from the supplied text and were not reproduced.

Catalogue impact: supports FDR-03 as a bounded research-only family requiring
variant identification; no expansion of its fixed RES-ONLY treatment. An adjusted
p-value for an adaptive procedure needs its own q-dependent inversion definition;
ordinary BH adjusted p-values are not substituted.

#### C.4.3 C-K3: Storey estimation and q-values

| Locator in 19                        | Source-supported statement                                                                                                                                                      | Boundary                                                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 481 Definition 1                     | pFDR=E[V/R given R>0]; FDR=pFDR Pr(R>0)                                                                                                                                         | Conditioning requires positive probability of R>0; not a per-hypothesis posterior at an exact observed statistic                    |
| 482 Theorem 1 and model              | Independent identically distributed tests, random iid Bernoulli null indicators; pFDR of a common rejection region is the posterior null probability conditional on that region | Fixed nonrandom configurations and arbitrary dependence do not automatically inherit this representation                            |
| 483 equations (5)–(10)               | W(lambda)=count(p>lambda), pi0hat=W/[m(1−lambda)], R(gamma)=count(p≤gamma); FDRhat=W gamma/[(1−lambda)(R or 1)]; pFDRhat=FDRhat/[1−(1−gamma)^m]                                 | Original estimator has no +1. Use a fixed lambda<1 and appropriate positive gamma; endpoint conventions require separate treatment  |
| 487 Theorem 2, 496–497 proof         | Expected untruncated estimates are conservative under the stated model at fixed tuning and region                                                                               | Not a pointwise upper bound, and not an immediate finite-m theorem for selecting gamma or lambda from data                          |
| 484, 488 Theorem 3                   | Truncation of a reported error-rate estimate at 1 improves MSE as stated                                                                                                        | Does not automatically preserve mean conservatism; distinguish this from truncating estimated m0 in an adaptive rejection procedure |
| 488–489 Theorem 4 and corollaries    | Limiting bias/conservatism depends on the alternative distribution and lambda                                                                                                   | Fixed lambda need not give exact consistency; data-driven tuning needs its own argument                                             |
| 490 Definitions 2–3, 491 Algorithm 2 | q-value is the infimum of pFDR over nested rejection regions containing the observation; estimated values use suffix minima of estimated pFDR at sorted p-values                | Includes the finite-m factor of this paper; not ordinary BH adjustment or an unspecified later software default                     |
| 490 last paragraph                   | Exact operating characteristics of estimated q-values are left open                                                                                                             | Theorem 2 does not certify the procedure that rejects qhat≤q                                                                        |
| 493–494                              | Bootstrap selection of lambda and interval estimation are proposed                                                                                                              | No general exact finite-sample coverage or uniform selection guarantee is inferred                                                  |

For the p-value mixture representation, the null distribution is uniform (p.483).
The alternative CDF g has g(0)=0, g(1)=1 and g(t)>t for 0<t<1 in the paper's
power setting (p.488); in particular the bound on Pr(R>0) used on pp.483/496
requires rejection probability at least gamma. Do not extend that step to arbitrary
biased tests with alternative power below their size. Concavity of g and endpoint
derivatives are additional conditions for the corresponding corollaries, not
consequences of independence. Remark 2 on p.497 refers weaker-assumption proofs to
another text; that external proof is not inspected or claimed here.

The source supports the estimator and output semantics of FDR-04 with these limits.
It does not turn the transfer target (Releases 16–20 horizon) into an R3/R4 candidate.
Required numerical objects are counts, denominator conventions, lambda/gamma,
finite-m power factor and suffix minimum; this reading supplies no numerical error,
resource, platform or probability-projection certificate. Sampling/variance/balance
and degrees of freedom of an eventual underlying test still require that test's
own source basis. A fixed rejection region with all nulls can have pFDR=1 while
FDR is much smaller; this distinction is stated in source 19 p.481; C.7 demonstrates the finite-m
estimator difference, not a simulation of the all-null identity.

#### C.4.4 SR-K reopen conditions and closure scope

The proposed CLOSED disposition concerns removal of the assigned-source acquisition
obstacle for the bounded families in C.4. It does not answer the residual all-pairs
BH-control question or remove I-03 for unsupported families. Review PR 187 Section
5.4 supports this reading but also identifies PARTIAL as the alternative if the
steward requires that residual methodological question to be resolved by the hold.
No acceptance choice between those readings is made by this author-side repair.

Reopen C-K1/SR-K before relying on unadjusted BH for all-pairs or any family outside
the stated Case 3/4 conditions, changing one/two-sidedness, the fixed member set,
normal/covariance/independent-scale assumptions or q<1/2 restriction, or relaxing
valid marginal null p-values for Theorem 1.3. Such extensions need a newly reviewed
primary-source basis; the harmonic correction is not silently adopted as a fallback.
Reopen C-K2/SR-K for an adaptive variant other than Definition 6, changes to its
stopping/counting rules, or a dependence guarantee. Reopen C-K3/SR-K for treating
Storey estimates as guaranteed rejection rules, +1 or p≤lambda modifications,
data-selected lambda/regions, changed mixture/power assumptions, or new truncation
or endpoint conventions. Reopen the affected claim for a source-version/hash
change or a material contradiction in the proofs of 04 Theorems 1.2/1.3,
16 Theorem 1, or 19 Theorem 2. Unchanged fixed catalogue classes remain in force.

### C.5 Proposed hold dispositions and entry-by-entry coverage

These are the new investigator's source-result dispositions offered for independent
review, not effective release-gate updates. Existing reviewed decisions remain the
baseline until this exact result and original artifacts pass separate review.

| Hold   | Candidate disposition | Entry coverage / remaining condition                                                                                               |
| ------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| SR-A   | INPUT_INCOMPLETE      | OMN-02 gains C-A2 evidence; OMN-01, OMN-03, OMN-04 still require their assigned texts                                              |
| SR-B   | INPUT_INCOMPLETE      | PVL-01 attribution and PVL-02 unchanged; assigned texts not supplied                                                               |
| SR-C   | INPUT_INCOMPLETE      | PVL-06/07/08 and both PVL-10 variants inspected; PVL-09 Shaffer source absent                                                      |
| SR-D   | INPUT_INCOMPLETE      | CLS-01 inspected; CLS-02/03/04/05/06 assigned sources absent                                                                       |
| SR-E   | INPUT_INCOMPLETE      | APR-01 attribution source absent                                                                                                   |
| SR-F   | INPUT_INCOMPLETE      | APR-05/06 assigned GT2, Genizi-Hochberg and Stoline texts absent                                                                   |
| SR-G   | CLOSED                | APR-09 / C-G1 and X-1 supported by 09 plus correction 10, with C.6 limits; candidate only                                          |
| SR-H   | INPUT_INCOMPLETE      | APR-10 has Newman only; APR-11 gains Duncan; Keuls and APR-12/13/14 texts absent                                                   |
| SR-I   | INPUT_INCOMPLETE      | HET-01/02/03 assigned texts absent                                                                                                 |
| SR-J   | INPUT_INCOMPLETE      | MCB-01 gains Hsu; MTO-02/03 sources and X-8 identity mapping remain unresolved                                                     |
| SR-K   | CLOSED                | FDR-01 dependence scope and FDR-02/03/04 source questions answered in C.4, including explicit unsupported variants; candidate only |
| SR-L   | CLOSED                | Part B disposition carried forward using identical 01–03 originals, no new closure                                                 |
| RSM-01 | INPUT_INCOMPLETE      | maxT/minP and subset-pivotality primary basis still absent                                                                         |
| RSM-02 | INPUT_INCOMPLETE      | V-3 source gains distinct randomization/bootstrap/subsampling descriptions; other required variant texts remain absent             |

This table, C.3 and C.4, together with unchanged entry rows in Section 6 and B.7,
cover every assigned entry without changing its catalogue classification. In
particular FDR-01 stays R3-CAND under its original explicit independence boundary;
FDR-02 stays R3-CAND with no adopted dependence extension; FDR-03 stays RES-ONLY;
FDR-04 retains TRANSFER. C.4 is new source evidence for reconsideration, not removal
of the dagger or a Protocol-supported method announcement.

Candidate totals: CLOSED 3 (including the carried SR-L), INPUT_INCOMPLETE 11,
PARTIAL 0, NO_GO 0. Overall **INPUT_INCOMPLETE**; SOURCE_SET_READY is not satisfied.
The NARROW programme cannot yet be reconsidered as source-complete for the
comprehensive public question. No numerical, RFC, discussion-opening or release
permission follows even if the two proposed closures are independently accepted.

### C.6 Scheffe correction-aware closure candidate and R4 handoff

C-G1: 09 pp.87–90 assumes jointly normal unbiased estimates with known covariance
shape sigma^2 A and an independent variance estimate with chi-square degrees of
freedom nu. For a contrast c with sum(c)=0, the simultaneous half-width is
sqrt((k−1) F_(1−alpha;k−1,nu)) sqrt(s^2 c' A c), with the paper's rank conditions (p.88): covariance rank k for unrestricted
means, or rank k−1 when both the means and their estimates satisfy restriction (1).
The F notation here uses a LOWER-tail 1−alpha quantile, equivalent to the paper's
upper-tail alpha convention. Coverage is 1−alpha for the full contrast space and
at least 1−alpha for a subset. Data-suggested contrasts within that same space are
covered (p.89); data-dependent selection between different procedures is not
licensed (pp.92–93). The global F equivalence on pp.95–96 concerns existence of
some contrast, not necessarily a pairwise difference or a prelisted finite family.

Original pp.87–104 are continuous, and correction 10 identifies that exact span.
X-1 can be resolved to 87–104 in this candidate: the alleged missing pp.105–110 are
not part of this article. This is an artifact-backed correction, not a subscription
or publisher-currentness claim. Nine corrections from 10 p.229 item (1) were read
with the original; their complete impact list follows.

| Original locator                         | Correction                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| 89, eighth line from bottom              | Estimated mu subscript 1 becomes i                                                |
| 90, line 7                               | Comma after eta_j                                                                 |
| 93, starred interaction footnote         | Delete: the compared Tukey method's equal off-diagonal covariance condition fails |
| 100, first line below (28)               | psi>A becomes psi≥A                                                               |
| 100, second and seventh lines below (28) | psi≤A becomes psi<A in both places                                                |
| 102, line 16                             | Estimated zeta subscript 1 becomes i                                              |
| 102, fifth line from bottom              | Restrict derivation to gamma<pi/2; handle equality separately through Section 4   |
| 102, fourteenth line from bottom         | Restore estimator hat on zeta_(k−1)                                               |
| 103, second line above (38)              | Restore factor w before p1 in transformed integral                                |

Do not treat the moderate/large-nu power approximations on pp.100–101 as numerical
certificates. Reopen SR-G if the supported contrast space/rank, covariance model,
selection of procedure, correction applicability or original artifact identity
changes. This closure candidate does not cover Scheffe's 1959 book, other holds,
or a specific R4 interaction interval construction.

R4 investigator implication: under independent balanced cell-mean errors of variance
v, centered interaction estimates have covariance
v(delta_ik−1/a)(delta_jl−1/b). For 2 by 2, off-diagonal values include −v/4 and +v/4.
Balance therefore does not satisfy the deleted footnote's constant-covariance
condition. This is an investigator algebraic illustration, not a theorem newly
attributed to the paper. A future R4 successor needs to compare its exact target
and contrast rank to these conditions; this increment does not repin PR 181 or
claim to review its interaction intervals.

### C.7 Reproductions and unresolved textual conflicts

The code below was run using Python standard-library exact rationals, except the
explicit exploratory float display of Storey's finite-m expression. These are
source-reading diagnostics, not reference implementation or certified oracles.

```python
from fractions import Fraction as F
from math import comb

p = list(map(F, ['.0001', '.0004', '.0019', '.0095', '.0201', '.0278',
                '.0298', '.0344', '.0459', '.3240', '.4262', '.5719',
                '.6528', '.7590', '1']))
def bh(values, q):
    return max((i for i, x in enumerate(sorted(values), 1)
                if x <= i*q/len(values)), default=0)
q = F('.05')
q1 = q/(1+q)
r1 = bh(p, q1)
q2 = q1*len(p)/(len(p)-r1)
assert (bh(p, q), r1, q2, bh(p, q2)) == (4, 4, F(5, 77), 8)
assert 1/(1-q) > 1+q
print('BKY example: BH=4, first=4, second=8; motivating inequality false')

alpha = F('.01')
b = {1: alpha}
for n in range(2, 11):
    b[n] = (sum(alpha**i for i in range(1, n))
            - sum(comb(n, i)*b[i+1]**(n-i) for i in range(1, n-1)))/n
assert format(float(b[10]), '.3g') == '0.001'
print('Rom alpha=.01 n=10:', format(float(b[10]), '.16g'))

values = [0]*20
rank = 20 - (20*q).__floor__()
critical = sorted(values)[rank-1]
assert not (0 > critical) and (0 >= critical)
assert F(sum(v >= 0 for v in values), len(values)) == 1
print('Romano-Wolf all ties: strict rejects=False, inclusive rejects=True, p=1')

assert 1-F('.95')**2 == F('.0975')
ps = list(map(F, ['.01', '.04', '.2', '.6', '.9']))
w = sum(x > F('.5') for x in ps)
gamma = F('.04')
r = sum(x <= gamma for x in ps)
fdrhat = w*gamma/(F('.5')*r)
pfdrhat = fdrhat/(1-(1-gamma)**len(ps))
assert fdrhat == F('.08')
print('Storey fixed-region estimates:', float(fdrhat), float(pfdrhat))
```

Observed transcript:

```text
BKY example: BH=4, first=4, second=8; motivating inequality false
Rom alpha=.01 n=10: 0.001004472598983613
Romano-Wolf all ties: strict rejects=False, inclusive rejects=True, p=1
Storey fixed-region estimates: 0.08 0.43330536145016
```

Additional conflicts retained for independent review:

- 06 p.28 prints f=3 while preceding f=30 and referenced table values suggest a
  discrepancy; not silently corrected or used as an oracle.
- 07 p.335 input arithmetic reproduces F=3.3509576647402737 and denominator
  df=22.567817024698538, but intermediate B=.11816236651281907 differs from the
  printed .1180. Final displayed F and df agree at their printed precision.
- 14 p.664 Table 1 gives 1.01e−3 at alpha=.01, n=10 whereas its recurrence gives
  .001004472598983613 (three significant digits 1.00e−3). No formal erratum is claimed.
- 16 p.495 motivating inequality is false as printed; separate from the formal
  TST theorem. New contradictions in that theorem would reopen C-K2/SR-K.
- 31 p.99 following (24) uses an inclusive critical-value comparison where the
  all-ties example rejects with probability 1. Counting ties with ≥ in the p-value
  remains correct; strict rejection against an order-statistic critical value is
  different. Do not reject the whole paper on this isolated finding.
- 15 p.660 cites a distinct Marcus single-author 1976 article, pages 177–183.
  Existence of that citation does not settle whether SRC-28 intended it. X-8 stays
  open; no additional source is silently added to the fixed catalogue.

Formal erratum searches and full table/proof audits remain unperformed. These
observations are not claims that the authors or publishers have acknowledged errors.

### C.8 Independent review handoff and remaining work

Repository access is required for an exact-head review (or a complete, verifiable
Git bundle with the same objects); PDFs alone cannot establish the output's parent,
diff, original fixed inputs or governance boundary. The reviewer also needs the
original supplied PDF bytes in C.2: at minimum 04/09/10/16/19 for the two proposed
closures, and all 19 to verify the full intake and other source findings. A report
or OCR extraction alone is insufficient. PDF transfer is separate from public Git;
no redistribution authorization is inferred from supply.

Review execution instructions:

1. Freeze the review PR's exact head SHA before reading; verify its sole parent is
   f39100161cb45de15767bdb19ed54aba9489b41a and its only changed path is this result.
   Record head, tree, parent, result blob and input hashes. Compare original Part A/B
   content against blob 5465cbcfd00708facac94785d9244b79166cb81e; disclose any formatting
   changes rather than treating old evidence as substantively rewritten.
2. Record non-authorship of this increment and the relevant prior preparation,
   intake and result writing. This authoring context cannot supply that independent
   pass. Read the controlling commission and fixed semantic catalogue/review inputs.
3. Recompute all available PDF hashes. Missing originals yield SOURCE_ACCESS_INCOMPLETE
   for the affected review scope, never an inferred pass from this manifest.
4. Review C-K1/C-K2/C-K3 against original pages and all eight commission analysis
   items. Adversarially test shared-denominator versus independent numerator claims,
   one-sided versus two-sided scope, PRDS versus positive correlation, q<1/2,
   fixed-family counting, TST stopping cases, and estimation versus control.
5. Review C-G1, X-1 and all nine correction entries. Check covariance/rank and
   all-contrasts versus all-pairs distinctions. Do not infer R4 method adoption.
6. Rerun C.7. Evaluate each conflict as a local observation with explicit consequences,
   not automatic rejection of its full source. Verify all 14 candidate dispositions,
   overall precedence and unchanged catalogue classes.
7. Run formatting, Markdown lint and the direct repository validator. Record exact
   commands, exits and limitations. Return findings with severities and per-scope
   disposition; a clean repository check does not prove methodological correctness.
8. Preserve review evidence separately from the authored result. Do not merge,
   edit issue instructions, close releases, or promote candidate closures as part
   of a review. Result changes require a new exact-head review.

The PR metadata supplies the frozen result head once committed; it is not necessary
or possible for this file to contain its own commit hash. No independent reviewer
has been invoked by this authoring increment.

Remaining execution order:

- First, independently review SR-K and SR-G plus the intake; resolve any findings,
  then record accepted source dispositions through the existing process.
- For SR-C, the five supplied texts now cover Simes/Hochberg/Hommel and the two
  PVL-10 variants; finish the missing Shaffer primary source before whole-hold closure.
- Complete the other named missing texts in C.5 as supplied. Receipt of the remaining
  numbered procurement papers is not itself proof that every commissioned source,
  textbook anchor or resampling variant is covered.
- Carry C.6's corrected interaction scope into a new R4 research successor. Keep the
  exact old semantic/numerical heads and review evidence unchanged.
- R4 review PR 184 at commit 1d493622af970145925f35c8d2cd95f6cbf03cc7 remains a
  separate source-access problem: its two PDF hashes/pinpoints, arXiv version/date,
  Williams publisher record and NIST/DLMF/LAPACK pages require source completion
  against the original heads. This intake does not close Section 5.4.
- Track PR 184's N-A1 version annotation, N-A2/N-B2 provenance wording (preserving
  material process disclosure), N-A3 E-SIM listing, N-A4 non-authorship enumeration
  and N-B1 even-nu input guard in successors. N-C1's PR 182 CI description was already
  supplemented in the PR body when inspected; no source review is inferred. Updating
  the two result files needs re-review; this single-file commission does not mutate
  those other heads.
- Even after source completion, numerical certificates, final semantic-bound R4
  numerical work, RFC/pre-opening review and steward decisions remain distinct work.

### C.9 Validation boundary

Validation of this increment is recorded in its review PR, against its committed
head. Dependency lockfile and package.json are unchanged from the existing checkout.
An offline frozen install failed on a missing cached tarball; existing local
node_modules from that same lockfile were copied into this isolated clone for the
checks. This is not claimed as a fresh successful frozen installation.
No test expectation, authoritative file, public schema, tolerance, catalogue class,
source PDF, prior review result or fixed issue body is changed by this increment.

SOURCE-ACQUISITION INCREMENT C: INPUT_INCOMPLETE — TWO NEW SOURCE-CLOSURE CANDIDATES —
AWAITING INDEPENDENT EXACT-HEAD PRIMARY-SOURCE REVIEW — NOT PROTOCOL ADOPTION

### C.10 Repair after the limited independent review

Review PR 187: commit `f8c17dba9bb2e7cc5e3ebe5a9f837f54af0fdd88`, result blob
`a92da5e6c2ed105e3074f51861c4c08d1b4df66e`, path
`review-inputs/r3-srk-srg-source-closure/REVIEW-RESULT.md`. It reviewed the original
Part C at `37d3ed1626964c20080c26614052e2ce1971d635`, not this successor.
Its conditional GO coexists with two SHOULD-FIX findings; neither is treated as
closed by the author. S-1 is repaired in the C.4.1 all-pairs row; S-2 is repaired
in C.4.4. N-1 (explicit rank), N-2 (adjusted-p pinpoint), N-3 (reproduction wording)
and N-4's theorem pinpoint are also addressed. N-4's optional second-example
calculation and N-5's optional original-token column are deferred; the original
nine-correction ledger remains intact. No finding is independently re-reviewed here.

The review confirms separate authoring/review contexts but leaves model identity
verification to acceptance. The user's returned review report identifies the
reviewer's configured/last-served model as `claude-fable-5-1`; that is supplied
session testimony, not a model identifier independently extracted from Git. This
authoring environment identifies the assistant as GPT but does not expose a
verifiable exact serving-model identifier for the prior authoring turns. No exact
identifier is guessed, and RFC rule 2 is not marked satisfied by this repair.
A recorded comparison of the two session identities is still needed before hold
acceptance. The result does not represent an external review's conditional GO as
unconditional independent model verification.

Close-only review request: inspect this successor's exact parent/diff/blob, verify
S-1 against 04 p.1182 and S-2 against commission item 8, inspect the N-1–N-4 edits
against the same five originals, and confirm C.4.4 preserves the residual all-pairs
question and catalogue classes. Record separate findings for textual repairs,
source-closure interpretation and independence evidence. Preserve original review
187; do not overwrite it or treat its GO as covering the successor. Parts A/B,
source hashes, the C.7 code and transcript, and the candidate disposition counts
remain unchanged. No merge, hold acceptance, public opening or R4 promotion occurs.

---

## Part D — Additional sixteen-source intake and first-pass findings (2026-09-07)

### D.1. Scope, provenance and preserved input

This is an author-side acquisition increment prepared with OpenAI assistant support,
not an independent review or acceptance decision. Parts A–C are preserved as the
exact 213491-byte prefix from commit
`9eee0caf6a423d509a996be71df8cff8b4d1e9df`, result blob
`47b497d67bcf7e02382c1fe20cd69a8e615c31cf`, SHA-256
`444fa1d78f585c21ea26db3e8d7c2dfe39dc0728a4d6a3d996665df060f10680`.
PRs 187, 188 and 192 review that earlier work within their recorded scopes; none
reviews this increment. Their findings, independence qualifications and the separate
acceptance adjudication are preserved.

The user supplied item 08 as a PDF and fifteen other PDFs in a ZIP. The archive
passed its CRC integrity check. All sixteen PDFs opened and yielded extractable
text; hashes, byte lengths and page counts below were computed from the received
bytes. Opening/extracting a PDF is not a complete substantive review. The current
pass checked bibliographic headers and opening material for all sixteen, with the
additional targeted Shaffer and Ryan inspections specified below. No complete
review of every theorem, table, numerical example or reference is claimed.

The sixteen hashes are mutually distinct and absent from the preserved result.
C.2's nineteen-artifact intake plus these sixteen gives **35 distinct received
supplier items: 01–33, 35 and 36**. This carries forward the saved C.2 custody
evidence, rather than claiming all thirty-five originals are currently attached or
were freshly rehashed. Items 01–03 remain identical Pass 2 copies, not newly
acquired evidence counted a second time. Item 34 is not reported collected. These
supplier numbers are not Protocol source IDs; 35 items do not mean all commissioned
sources have been acquired.

No PDF, archive, full extracted text or page image is included in this repository.

### D.2. Received byte identities

Transport ZIP: 13103742 bytes; SHA-256
`7066b13da148d8d00034c053012f245f73583fbd51e6f7c6fa702f1f8d67c6c0`.
The transport digest does not replace the individual source digests.

| File                   |   Bytes | PDF pages | SHA-256                                                            |
| ---------------------- | ------: | --------: | ------------------------------------------------------------------ |
| `08_James_1951.pdf`    |  523245 |         7 | `34d14510ddcd10b0a5e90f21412b78e1d03359358ff0ae50c86bd93c83b62145` |
| `20_Sidak_1967.pdf`    |  641762 |         9 | `6cd0ccda87a138d447391991c9858f5cea4294bfaeccaa8518754d2854d89533` |
| `21_Dunn_1961.pdf`     | 1385001 |        14 | `14aa5adbbf07da8e7a73f4451a04d62bd7da198f6053e120afab29145a422488` |
| `22_Shaffer_1986.pdf`  |  870893 |         7 | `6ea4bb9fd390aad49e8b5360d8c51386d8931e6db62947303e71a3c7b95973c7` |
| `23_Genizi_1978.pdf`   | 1123267 |         7 | `21938051d7bcfd1d56babe21280976d3918b69d8ffdff4ec646c18ed3b6fe2b0` |
| `24_Einot_1975.pdf`    | 1211995 |        11 | `1b097f5cdf16785e0aebf9c29359b957beb94caf51bb46255eaceb3d841cd57b` |
| `25_Welsch_1977.pdf`   |  954326 |        11 | `1111684b7f639503ae40caa063556f79f0da5729c34fcef6286ba9b2498a0600` |
| `26_Hayter_1986.pdf`   |  582732 |         6 | `33000fec094c81a4dbb581653d28d3a72bb8a2379a8baafbc1dafab1d6032eed` |
| `27_Tamhane_1979.pdf`  | 1759491 |        11 | `f6183845a373361b8840040ecd9f0afce59cb8cb5170abf44c551376cd414bf0` |
| `28_Dunnett_1980.pdf`  |  726755 |         6 | `ac862081c93be6ce38ba0dc17b811cb3dd96227cf6ba50f66a7c35715a2870a0` |
| `29_Dunnett_1992.pdf`  | 1099979 |        10 | `f1144f4ca64d874d1d812cfc6b0b8f9d275d2251619796805d5ac955594386f6` |
| `30_Troendle_1995.pdf` | 1020647 |        10 | `21c9fbad95c8c29e709863aa45d314deca1f70f4bf148da1b7407f3178f08b54` |
| `32_Stoline_1981.pdf`  |  910960 |         9 | `65c2ce23d2dc5adb105af5d07f6060ebc4c07c9b908dc71256abcc2b64665cb4` |
| `33_Brown_1974.pdf`    |  518538 |         5 | `bba8ba4d8b105b47194a20704a5967b32e2ea5447f2587986ebbca5a298a6124` |
| `35_Keuls_1952.pdf`    |  564826 |        11 | `3c15767f3d732bd3268b2dc7dacba397fd736e8181bb9ddbc0fc9a63941e1616` |
| `36_Ryan_1960.pdf`     |  750050 |        11 | `4a8b0f3429c4f538f5d34da776c6b410506b95e95b0a3d5d0bb21c6f2e522c99` |

The page counts include publisher/JSTOR covers where present. For 08 and
20–30, 32 and 33, PDF page 2 is the first printed article page listed below.
For 35 and 36, PDF page 1 is the first printed article page. Printed pagination,
rather than a cover-inclusive PDF index, is used for the findings.

### D.3. Bibliographic matches and research routing

These matches use the supplied papers, compared with the existing acquisition
result. A route to a source set is not approval of all entries using that set.

| Supplier | Author, year and title                                                                                                           | Printed journal/pages                | Existing research route             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------- |
| 08       | James (1951), The Comparison of Several Groups of Observations When the Ratios of the Population Variances are Unknown           | Biometrika 38:324–329                | SR-A / SRC-10; OMN-03               |
| 20       | Šidák (1967), Rectangular Confidence Regions for the Means of Multivariate Normal Distributions                                  | JASA 62:626–633                      | SR-B / SRC-13; PVL-02               |
| 21       | Dunn (1961), Multiple Comparisons among Means                                                                                    | JASA 56:52–64                        | SR-B / SRC-14; PVL-01               |
| 22       | Shaffer (1986), Modified Sequentially Rejective Multiple Test Procedures                                                         | JASA 81:826–831                      | SR-C / SRC-19; PVL-09               |
| 23       | Genizi and Hochberg (1978), On Improved Extensions of the T-Method of Multiple Comparisons for Unbalanced Designs                | JASA 73:879–884                      | SR-F / SRC-36; APR-05/06 source set |
| 24       | Einot and Gabriel (1975), A Study of the Powers of Several Methods of Multiple Comparisons                                       | JASA 70:574–583                      | SR-H / SRC-29; APR-12               |
| 25       | Welsch (1977), Stepwise Multiple Comparison Procedures                                                                           | JASA 72:566–575                      | SR-H / SRC-29; APR-12               |
| 26       | Hayter (1986), The Maximum Familywise Error Rate of Fisher’s Least Significant Difference Test                                   | JASA 81:1000–1004                    | SR-H / SRC-35; APR-13/14            |
| 27       | Tamhane (1979), A Comparison of Procedures for Multiple Comparisons of Means with Unequal Variances                              | JASA 74:471–480                      | SR-I / SRC-21; HET-02               |
| 28       | Dunnett (1980), Pairwise Multiple Comparisons in the Unequal Variance Case                                                       | JASA 75:796–800                      | SR-I / SRC-21; HET-03               |
| 29       | Dunnett and Tamhane (1992), A Step-Up Multiple Test Procedure                                                                    | JASA 87:162–170                      | SR-J / SRC-28; MTO-03               |
| 30       | Troendle (1995), A Stepwise Resampling Method of Multiple Hypothesis Testing                                                     | JASA 90:370–378                      | RSM-02; variant-specific follow-up  |
| 32       | Stoline (1981), The Status of Multiple Comparisons: Simultaneous Estimation of All Pairwise Comparisons in One-Way ANOVA Designs | The American Statistician 35:134–141 | SR-F / SRC-36; APR-05/06 source set |
| 33       | Brown and Forsythe (1974), The Small Sample Behavior of Some Statistics Which Test the Equality of Several Means                 | Technometrics 16:129–132             | SR-A / SRC-11; OMN-04               |
| 35       | Keuls (1952), The Use of the Studentized Range in Connection with an Analysis of Variance                                        | Euphytica 1:112–122                  | SR-H / SRC-29; APR-10               |
| 36       | Ryan (1960), Significance Tests for Multiple Comparison of Proportions, Variances, and Other Statistics                          | Psychological Bulletin 57:318–328    | SR-H / SRC-29; APR-12               |

### D.4. Targeted source observations and interpretation

#### D.4.1. Shaffer: the previously missing SR-C text is now available

**Source content inspected:** pp.826–828 (PDF pages 2–4), especially Section 2
and Section 3.1; p.827 was also checked as a rendered page image because extracted
mathematical subscripts and inequality signs were unreliable. Section 2 uses the
maximum possible number of true hypotheses compatible with at least the preceding
number of false hypotheses as the stage denominator. The proof bounds the chance
of any false rejection using the true-null count and the Bonferroni argument.
Section 3.1 exploits equivalence constraints for all pairwise equality hypotheses.
For four distributions the possible true-null counts are 0, 1, 2, 3 and 6
(Table 1); the recursion (3.2) generates the attainable counts.

**Investigator interpretation:** this supplies the missing primary text behind
PVL-09's logical-constraint improvement over Holm. The denominator depends on the
actual hypothesis family and valid individual tests; it is not a universal
replacement of Holm denominators for an arbitrary family. This is familywise
error control, not an FDR claim. The inspected basic procedure does not by itself
freeze the more elaborate modifications later in the paper or a Protocol
adjusted-p representation. No new implementation or adjusted-p formula is adopted.

**Disposition:** all six assigned SR-C texts now have recorded custody: the five
C.3 items (Simes, Hochberg, Hommel, Rom and Holland–Copenhaver) plus Shaffer. The
earlier statement that Shaffer is unreceived is superseded for custody only.
Complete claim-by-claim synthesis and independent review of the six-source set
remain; SR-C is not newly declared CLOSED by this initial intake. Existing
source-specific dependence restrictions and Rom's recorded table-cell doubt remain.
The five earlier source readings are reusable recorded author evidence, not new
readings or independent approvals in this pass.

#### D.4.2. Distinguish nearby papers and scopes

- Brown–Forsythe item 33 is the paper on testing equality of **means**,
  pp.129–132; it is not the similarly associated variance-homogeneity procedure.
  The opening material at p.129 provides the relevant OMN-04 route.
- Dunnett–Tamhane item 29 is the 1992 step-up paper, not their 1991 step-down
  paper. Its p.162 setup specifies jointly normal estimates with a common known
  correlation and an independent chi-square variance estimate. Its receipt does
  not supply every SRC-28 text or settle X-8.
- Ryan item 36 matches the commissioned 1960 title. Its p.318 opening and p.328
  references distinguish the earlier 1959 means paper and a 1959 erratum.
  This is a bibliographic follow-up if a later claim depends on that earlier
  procedure; no assertion that the 1960 item is the wrong supplied paper is made.
  Neither the earlier paper nor its erratum has been inspected here.
- Troendle item 30 concerns the paper's stepwise resampling construction. Its
  p.370 abstract describes asymptotic experimentwise control; that is not a
  blanket finite-sample guarantee for every maxT/minP or Romano–Wolf variant.
- Šidák item 20 concerns multivariate-normal rectangular regions (p.626),
  not unrestricted dependence of arbitrary p-values. Dunn item 21 concerns
  multiple comparisons among means (p.52). Exact PVL-01/02 assumptions and
  output conventions remain a targeted follow-up.

### D.5. Follow-up that no longer depends on collecting these originals

| Lane               | Newly executable work                                                                                                | Boundary still retained                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| SR-C               | Finish Shaffer variants and combine with the five saved C.3 investigations; prepare the six-source exact-head review | Do not apply PR 192's five-PDF approval to this different set                                  |
| SR-B               | Read Šidák/Dunn proofs and map family, dependence, sidedness and output assumptions                                  | Custody alone does not close either entry                                                      |
| SR-A               | Compare James and Brown–Forsythe variants against the recorded Welch result                                          | F-test formalization and other assigned source requirements remain separate                    |
| SR-H               | Examine Keuls, Ryan, Einot–Gabriel, Welsch and Hayter alongside saved Newman/Duncan findings                         | Range-test variants, strong-error claims and numerical critical values need their own evidence |
| SR-F / SR-I / SR-J | Inspect the newly supplied comparison and step-up papers against the entry claims                                    | Missing companion sources and X-8 are not automatically resolved                               |
| Resampling         | Map Troendle's exact algorithm and asymptotic assumptions to the requested variant                                   | RSM-01/02 are not interchangeable                                                              |
| R4                 | Continue repository-verifiable preparation using the separate review and source-follow-up records                    | Neither arXiv 1211.2481 nor NBS SP 503 is supplied by this batch; PR 184's source gaps remain  |

No new source-hold disposition is issued here. The last candidate table remains
C.5's three CLOSED (including inherited SR-L and two candidates awaiting formal
acceptance) and eleven INPUT_INCOMPLETE. That table is a disposition record, not
a claim that newly received PDFs remain inaccessible. Overall INPUT_INCOMPLETE,
semantic NARROW, PRELIM numerical assessments and the SR-K/all-pairs/I-03 boundaries
remain. No formal acceptance, merge, hold release, public discussion, adoption,
ratification or release was performed.

An independent review of a later completed synthesis needs the exact successor
Git identity and originals for its stated scope. For an SR-C pass the originals
are supplier 11, 12, 13, 14, 18 and 22; the first five have saved C.2 identities
but are not all attached in this continuation workspace. Request them when that
review requires access, rather than repeating the already received sixteen-file
transfer. This increment is ready for custody/bibliography and bounded-finding
review, not represented as a completed six-source closure proposal.
