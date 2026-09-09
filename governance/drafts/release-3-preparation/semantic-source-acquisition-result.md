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

---

## Part E — SR-C synthesis and bounded review handoff (2026-09-07)

### E.1. Evidence basis and role

This author-side synthesis appends to the exact Part D result at
`6f0679629a8b37ea98bc3c4fc661a5c5e923fed6`, blob
`06b98ef96abcd9ed13f8ed94644f90017465dad0`; all earlier bytes are preserved.
The commission remains the blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`
at `f39100161cb45de15767bdb19ed54aba9489b41a`. The comparison remains the
semantic result at `7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob
`8f21526040924b891f64724c2d0fde9ea94eff92`. No catalogue entry is rewritten.

OpenAI assistant support prepared this increment in the continuing author context.
This is not an independent pass. The earlier human-responsibility/partial-Claude
account and review provenance are retained, not reconstructed or contradicted here.

Evidence layers are distinguished throughout:

- **Recorded primary inspection:** C.2/C.3 and C.7 at the preserved repaired head
  contain the earlier author investigation of suppliers 11, 12, 13, 14 and 18.
  Their hashes and pinpoints are reused. These five PDFs are not present in this
  workspace; no new reading of them is claimed.
- **Current primary inspection:** supplier 22, Shaffer, hash in D.2, was read
  through printed pp.826–831 including the appendix and references. The core
  formulas and variants at pp.827–830 were also inspected as rendered images.
  The current computation below checks one specified combinatorial claim; it
  does not reproduce all numerical illustrations or certify the appendix.
- **Investigator synthesis:** the cross-entry assumptions, output gaps and
  dispositions below are deductions from those two evidence layers, not new
  statements attributed verbatim to the papers.

### E.2. Entry-by-entry claim and impact matrix

| Entry / claim                     | Evidence and pinpoint                                                                          | Supported characterization and target                                                                                               | Assumptions and output boundary                                                                                                                                                                                              | Impact                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| PVL-06 / C-C1                     | Recorded: Simes, 11, pp.751–752 theorem and p.754                                              | Global intersection-null test; reject if some ordered p-value meets its rank-scaled threshold                                       | Independent uniform null p-values supply exact level in the recorded theorem. A global rejection does not identify individual false nulls or establish individual strong FWER. No arbitrary-dependence claim                 | Supports the global-test characterization; retain RES-ONLY                      |
| PVL-07 / C-C2                     | Recorded: Hochberg, 12, pp.800–801, with 11                                                    | Step-up rejection through the largest qualifying rank; threshold alpha/(m-i+1); strong FWER subject to the relevant Simes validity  | A declared finite family alone does not suffice: validity is needed for the relevant true-null intersections. Independence is the recorded sufficient basis. Exact adjusted-p derivation and conventions remain E.4 work     | Narrows any unrestricted reading; retain R3-CAND, pending the source gate       |
| PVL-08 / C-C3                     | Recorded: Hommel, 13, pp.383–385, with 11                                                      | Closed-Simes construction supports elementary-hypothesis strong FWER when the local intersection tests are valid                    | Invalid local tests are not repaired by closure. The saved summary supports the construction, but does not fully document the computational shortcut or adjusted-output equivalence                                          | Supports the qualified construction; retain RES-ONLY                            |
| PVL-09 / C-C4                     | Current: Shaffer, 22, pp.826–827 Sections 1–2; pp.827–828 Section 3.1; pp.829–830 Sections 4–6 | Logical constraints sharpen Holm's sequential rejection; familywise probability of at least one false rejection is bounded by alpha | Valid marginal tests and correct logical constraints; no additional joint-independence requirement for the basic Bonferroni argument. Count-based, identity-sensitive and prior-composite-test variants remain distinct; E.3 | Supports the pairwise logical-constraint characterization; retain RES-ONLY      |
| PVL-10 / C-C5, Rom                | Recorded: 14, pp.663–664 equation (2), Table 1; C.7                                            | Sharpened step-up procedure with recursively calibrated constants                                                                   | Independence basis; the printed constant and recurrence conflict retained below prevents treating the printed table as a validated numerical authority                                                                       | Supports the qualified family description; retain RES-ONLY; unresolved constant |
| PVL-10 / C-C5, Holland–Copenhaver | Recorded: 18, pp.418–422                                                                       | Step-down product-form threshold 1-(1-alpha)^(1/t_i), stopping at first failure; t_i bounds the remaining possible true-null count  | The stated positive lower-orthant dependence condition is not merely positive pairwise correlation. Do not borrow Rom's algorithm or attach a universal dependence claim                                                     | Supports this separate variant; retain RES-ONLY                                 |

For these generic p-value procedures, sampling distribution, variance, balance and
degrees of freedom enter through the validity of the underlying tests; the papers
are not a blanket authorization to use arbitrary p-values from any data model.
Order by observed p-values is part of the procedure, not permission to select the
hypothesis family after observing results. A later implementation needs an explicit
family, sidedness, individual-test model and tie/output convention.

The fixed semantic Section 9 lists adjusted p-values for PVL-07 and PVL-08.
The saved source summaries justify rejection mechanisms, but do not alone complete
that output claim. E.4 names this gap instead of silently deleting the output or
claiming that a source printed an investigator-derived formula.

### E.3. Shaffer procedure distinctions and reproducible check

**Source statements:** Section 2, p.827, orders the marginal significance
probabilities and replaces Holm's stage denominator with the largest attainable
true-null count compatible with at least j-1 false hypotheses. The sequential
procedure stops at failure, as in the Section 1 construction. Section 3.1 uses
partitions into equivalence classes for all pairwise equality hypotheses; equation
(3.2) and Table 2 give attainable counts. Section 6, p.830, distinguishes logical
information from further distributional information.

Section 4.1, p.829, treats an initial level-alpha rejection of a more comprehensive
hypothesis that implies at least r component hypotheses are false. It is not an
arbitrary screening step. Section 4.2 instead uses the identities of previously
rejected hypotheses to tighten the compatible true-null count. Section 5's
illustrations apply those distinct modifications, including a balanced factorial
example. They are not one undifferentiated algorithm called Shaffer.

**Investigator interpretation:** PVL-09's pairwise logical-constraint description
is supported. The most direct bounded variant is Section 2 with Section 3.1's
attainable-count set. A later proposal to use Section 4.1 or 4.2 needs its own
explicit family and algorithm specification; this synthesis selects none of them.
A gate or rejection is statistical evidence, not an assertion that the rejected
null is logically known false. The source's error-control argument includes the
possibility of a false rejection. No R4 interaction method is approved by this
example, and the Scheffe 1969 footnote deletion remains effective.

The following author-side diagnostic uses exact integer arithmetic. It compares
(3.2) with a separate enumeration of integer partitions, then compares the displayed
sets with Table 2 at p.828. Every row for k=3 through 10 matches. These are source
combinatorics, not a reference implementation or an independent-review oracle.

```python
from math import comb

def partitions(n, minimum=1):
    if n == 0:
        yield ()
    for first in range(minimum, n + 1):
        for rest in partitions(n - first, first):
            yield (first,) + rest

s = [{0}, {0}]
for k in range(2, 11):
    s.append({comb(j, 2) + x for j in range(1, k + 1)
              for x in s[k-j]})
    direct = {sum(comb(j, 2) for j in part) for part in partitions(k)}
    assert s[k] == direct
    if k >= 3:
        print(k, sorted(s[k]))
print('k=4 stage denominators:',
      [max(x for x in s[4] if x <= 6-j+1) for j in range(1, 7)])
```

Observed output:

```text
3 [0, 1, 3]
4 [0, 1, 2, 3, 6]
5 [0, 1, 2, 3, 4, 6, 10]
6 [0, 1, 2, 3, 4, 6, 7, 10, 15]
7 [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 15, 21]
8 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 21, 28]
9 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 18, 21, 22, 28, 36]
10 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 24, 28, 29, 36, 45]
k=4 stage denominators: [6, 3, 3, 3, 2, 1]
```

No simulation of FWER, adjusted-p algorithm, or reproduction of the illustrative
normal-range critical values 3.68 and 3.53 at p.830 is claimed.

### E.4. Named gaps, disposition and reopening

SR-C's proposed author-result disposition is **PARTIAL**, replacing C.5's
INPUT_INCOMPLETE for this hold only. All six assigned originals have recorded
custody and the five entry descriptions now have primary-inspection evidence;
remaining gaps concern claims and outputs rather than an unreceived Shaffer PDF.
This is not formal hold closure. In particular:

1. Complete the source-to-computation trace for Hommel and the adjusted-output
   claims for PVL-07/PVL-08, checking the actual five older originals against
   their saved hashes. Distinguish any investigator derivation from printed
   formulas; specify ties, comparison boundary and truncation conventions.
2. Resolve or explicitly bound the Rom Table 1 discrepancy: C.7 records the
   alpha=.01, n=10 recurrence result and a conflict with the printed cell.
   Neither a convenient choice of value nor this synthesis is an erratum.
   The investigator has not found or verified a formal correction in this pass.
3. An independent six-source review tests C-C1 through C-C5, the cross-entry
   assumptions, the source/computation trace and whether any residual is
   compatible with a strictly bounded CLOSED source-result proposal. Until
   then, no such proposal or formal acceptance is issued here.

Reopen the relevant claim if the hypothesis family or equality constraints change;
if independence/Simes-validity/lower-orthant conditions are relaxed; if the underlying
marginal test or sidedness changes; if count-based Shaffer is replaced by an
identity-sensitive or initial-composite-test variant; if the output expands from
rejection to adjusted p-values or intervals; or if a changed artifact, correction,
threshold, tie rule or contradictory theorem affects the source-to-entry mapping.
The two PVL-10 variants remain separate in analysis under the unchanged shared ID.

| Hold   | Current proposed disposition | Basis                                                                                        |
| ------ | ---------------------------- | -------------------------------------------------------------------------------------------- |
| SR-A   | INPUT_INCOMPLETE             | Carry C.5 with D's new custody facts; no whole-hold reassessment here                        |
| SR-B   | INPUT_INCOMPLETE             | Carry C.5 with D's new custody facts; no whole-hold reassessment here                        |
| SR-C   | PARTIAL                      | Six-source synthesis; named computational/output and constant gaps above                     |
| SR-D   | INPUT_INCOMPLETE             | C.5 unchanged                                                                                |
| SR-E   | INPUT_INCOMPLETE             | C.5 unchanged                                                                                |
| SR-F   | INPUT_INCOMPLETE             | C.5 disposition retained; D's new custody facts apply                                        |
| SR-G   | CLOSED                       | Preserved candidate; separate formal acceptance remains pending                              |
| SR-H   | INPUT_INCOMPLETE             | C.5 disposition retained; D's new custody facts apply                                        |
| SR-I   | INPUT_INCOMPLETE             | C.5 disposition retained; D's new custody facts apply                                        |
| SR-J   | INPUT_INCOMPLETE             | C.5 disposition retained; D's new custody facts and X-8 remain                               |
| SR-K   | CLOSED                       | Preserved limited source candidate; all-pairs/I-03 and formal acceptance boundaries retained |
| SR-L   | CLOSED                       | Inherited prior disposition                                                                  |
| RSM-01 | INPUT_INCOMPLETE             | C.5 unchanged                                                                                |
| RSM-02 | INPUT_INCOMPLETE             | C.5 disposition retained; Troendle custody does not close all variants                       |

Counts: three CLOSED, one PARTIAL, ten INPUT_INCOMPLETE. Overall disposition is
**INPUT_INCOMPLETE**. The semantic programme remains NARROW; SOURCE_SET_READY is
not reached. No other entry classification or adoption status changes.

### E.5. Independent-review instruction for this increment

Use the exact successor commit containing this section, as recorded in the PR,
not a moving branch. Read AGENTS and its Read first documents, the pinned commission,
the fixed semantic entries and the saved result identities in E.1. Verify all
Parts A–D bytes are preserved. Record the actual reviewer role, non-authorship
boundary, context separation and ordinary model provenance without demanding
unavailable exact-build logs. This author context cannot supply the independent pass.

The six originals are 11, 12, 13, 14 and 18 from C.2, plus 22 from D.2. The reviewer
needs actual source access, not just hash tables or prior GO on a different set.
If an original is unavailable, identify the affected claim as SOURCE_ACCESS_INCOMPLETE
and continue separable checks; do not substitute a saved author summary for the
reviewer's primary-source inspection. PRs 187/188/192 do not cover these six sources.

Check C-C1 through C-C5, all E.2 rows and E.3's variants against the printed papers;
reproduce the exact combinatorial diagnostic; assess E.4's PARTIAL rather than
assuming that receipt implies CLOSED. Inspect Rom's disputed cell and recurrence,
Hommel's computational form, and the fixed adjusted-output claims. Separate source
statements, reviewer deductions and adoption decisions. Return per-claim findings,
severity, content verdict, actual independence evidence and remaining scope.

Write a new English review result on an unused review branch starting at the exact
input head, preserving every investigation and old review file. A suitable path is
`review-inputs/r3-src-six-source-synthesis/REVIEW-RESULT.md`; use an unused suffix
if necessary. Run format, Markdown lint, direct validator and diff checks; report
actual results. Open a draft review PR only. Do not merge, close holds, amend rules,
open discussion, adopt a procedure or publish a release. Any changed result needs
review against its new exact identity.

---

## Part F — SR-C original recheck and output derivations (2026-09-07)

### F.1. Custody and inspection boundary

The user supplied the five originals requested after Part E: Simes (11), Hochberg
(12), Hommel (13), Rom (14), and Holland–Copenhaver (18). Every SHA-256, byte length
and PDF page count matches C.2. The filename suffix `(1)` does not identify a new
version. Cumulative receipt remains 35 items, not 40. Together with Shaffer (22),
all six SR-C originals are now accessible in this author workspace.

This increment preserves all bytes of the result at
`fb1a2f647d3157083a1aaceee207b75624385480`, blob
`6cebcde5ead3dc5496f747a24ab0669d33b05469`. E.1/E.5's missing-local-original
statements are historical and superseded by this receipt. The pinned commission,
semantic comparison, assistance provenance and independent-review boundary remain.

Current reading covered the supplied article text: 11 pp.751–754; 12 pp.800–802;
13 pp.383–386; 14 pp.663–665; 18 pp.417–423. The critical pages 12 p.801,
13 pp.384–385 and 14 p.664 were also inspected as rendered images. This does not
claim to verify all references cited by these articles or to repeat their simulation
studies. No original, extracted full text or page image is published here.

### F.2. Source-to-output trace

**Simes:** p.752 proves exact global level for independent uniform null p-values
and explicitly states that the inequality is not general. The simulations at
pp.752–753 are not a theorem for arbitrary dependence. Page 754 treats additional
individual rejections from the global procedure as exploratory. This confirms
E.2's separation of a global rejection and individual strong FWER.

**Hochberg:** p.801 equation (8) uses the non-strict comparison and the following
paragraph gives the descending scan. For sorted p-values p_(1),...,p_(m), reject
through the largest j satisfying p_(j) <= alpha/(m-j+1). For rank i, this is
an existence statement over j >= i. Taking the smallest corresponding level gives

```text
Hochberg adjusted p_(i) = min(1, min over j >= i of (m-j+1)*p_(j)).
```

This expression is **investigator algebraic inversion of the printed rejection
rule**, not a formula claimed to be printed in the 1988 paper. For input p-values
in [0,1], reject when the derived value is <= alpha. Equal raw p-values get equal
adjusted values: among tied ranks the later ranks supply the same or a smaller
multiplier. Rank ties therefore do not create label-dependent decisions in this
bounded formula. Capping at 1 is an explicit output convention; it does not
change decisions at alpha in [0,1] for this construction. The error guarantee
still requires the source's qualified Simes basis, not merely this algebra.

**Hommel:** p.384 Section 2 prints the following shortcut. For each i=1,...,n,
consider the largest i p-values and check whether p_(n-i+k) > k*alpha/i for
**every** k=1,...,i. Let j be the largest i satisfying those inequalities. If
none exists, reject all individual hypotheses; otherwise reject those with
p <= alpha/j. The strict comparison in finding j and the non-strict final
rejection comparison are distinct and were checked on the page image.

For a nonempty subset I, define its local Simes threshold from its own ordered
p-values. Inverting the closed-testing conjunction in the theorem on p.384 gives

```text
s(I) = min(1, min over k=1,...,size(I) of size(I)*p_I(k)/k)
Hommel general adjusted p_i = max over all I containing i of s(I).
```

This is an **investigator derivation**: all supersets containing an elementary
hypothesis need local rejection, so their maximum threshold is the first level
where the conjunction holds. The paper supplies the closure theorem and shortcut;
it does not print this adjusted-output expression. This formula is deliberately
a direct subset construction, not a claim to have sourced or optimized a modern
software implementation. Its general-family meaning is not silently extended to
the logically restricted improvement in Section 3. It gives the same value to
equal raw p-values by symmetry, keeps values in [0,1], and makes the <= boundary
explicit. No simultaneous confidence interval construction follows here.

For the printed ten p-values at p.385 and alpha=.05, the shortcut yields j=5 and
three rejections. Restricting the admissible counts to {1,2,3,4,6,10}, as in
Section 3's five-distribution family, yields j=4 and five rejections. Both match
the paper. The latter calculation reproduces a rule; it does not elevate the
paper's pairwise-normal simulation into a universal Simes-validity theorem.

**Holland–Copenhaver:** p.420 Definition 3.1 and Theorem 3.1 supply the
lower-orthant product inequality for large-statistic rejection and the threshold
1-(1-alpha)^(1/t_i), stopping at the first strict exceedance. Page 418 assumes
valid uniform marginal p-values and describes the logical bound. Page 419 warns
that deleting comparisons changes the needed bounds. Consequently, neither a
count-only table nor positive pairwise correlation alone justifies an arbitrary
selected-family application. The paper's distributional examples at pp.421–422
cite additional sources; their universal applicability is not newly certified here.
This remains a separate PVL-10 variant from Rom's step-up procedure.

### F.3. Rom discrepancy retained with exact pinpoint

At p.664 equation (2), with c_(n,n)=alpha and b_n=c_(1,n), rearrangement gives

```text
b_1 = alpha
b_n = (sum(i=1,...,n-1, alpha^i)
       - sum(i=1,...,n-2, choose(n,i)*b_(i+1)^(n-i))) / n.
```

Exact rational arithmetic gives b_10 = 0.001004472598983613... at alpha=.01.
At the table's three-significant-digit precision this is 1.00 x 10^-3. The image
of Table 1 prints **1.01 x 10^-3** in row 10, MH, alpha=.01. The other nineteen
MH cells at alpha=.05/.01 match at that precision in this diagnostic. Thus this
is not solely an extraction problem, nor a rounding difference at the printed
precision. It reproduces and localizes C.7's existing conflict; it is not a newly
found second discrepancy.

No formal erratum was verified. A limited web discovery check on 2026-09-07
searched the title with correction/corrigendum and Rom/1990/correction, including
Oxford Academic-targeted queries. No relevant correction was identified in the
returned results; unrelated results were not evidence. This is not proof that no
correction exists. The source's recurrence and printed cell remain separately
recorded. This increment neither changes the original table nor approves either
value for Protocol numerical use.

### F.4. Reproducible author-side diagnostics

The following exact-rational calculations check the two derived outputs against
the direct source rules on 251 multisets with n=1,...,5 from the grid
{0,.01,.05,.5,1}, supplied in reverse order to exercise label mapping. Checks use
all distinct derived thresholds, endpoints and intervening midpoints (1395 levels).
This includes ties, zero/one and equality boundaries. It is a finite algebraic
regression check, not a proof of FWER or a claim to cover every input. The subset
formula's justification is the closure argument in F.2. The diagnostic also
reproduces Hommel's example and the Rom cell comparison.

```python
from fractions import Fraction as F
from itertools import combinations, combinations_with_replacement
from math import comb
import platform

def local(p):
    return min(F(1), min(len(p)*x/k for k,x in enumerate(sorted(p),1)))
def closure(p):
    a=[F(0)]*len(p)
    for n in range(1,len(p)+1):
        for ids in combinations(range(len(p)),n):
            v=local([p[i] for i in ids])
            for i in ids:a[i]=max(a[i],v)
    return a

def hommel(p,alpha,allowed=None):
    n=len(p); v=sorted(p)
    j=max((i for i in (range(1,n+1) if allowed is None else allowed)
           if all(v[n-i+k-1]>k*alpha/i for k in range(1,i+1))),default=0)
    return j,[j==0 or x<=alpha/j for x in p]

def hochberg(p,alpha):
    v=sorted(p);n=len(p)
    j=max((i for i,x in enumerate(v,1) if x<=alpha/(n-i+1)),default=0)
    return [j>0 and x<=v[j-1] for x in p]
def hochberg_adjust(p):
    v=sorted(p);n=len(p)
    return [min(F(1),min((n-j)*v[j] for j in range(n) if v[j]>=x)) for x in p]

cases=levels=0
for n in range(1,6):
 for v in combinations_with_replacement(map(F,['0','.01','.05','.5','1']),n):
    p=list(reversed(v));a=closure(p);b=hochberg_adjust(p)
    points=sorted(set([F(0),F(1)]+a+b))
    points+= [(x+y)/2 for x,y in zip(points,points[1:])]
    for alpha in points:
        assert hommel(p,alpha)[1]==[x<=alpha for x in a]
        assert hochberg(p,alpha)==[x<=alpha for x in b]
        levels+=1
    cases+=1
print('Python',platform.python_version())
print('grid multisets',cases,'level checks',levels,'both equivalences passed')
p=list(map(F,['.0021','.0074','.0093','.0106','.0121','.0218','.0238','.0352','.0466','.0605']))
for name,allowed in [('general',None),('logical',{1,2,3,4,6,10})]:
 j,reject=hommel(p,F('.05'),allowed); print('Hommel example',name,'j',j,'rejected',sum(reject))
assert hommel(p,F('.05'))==(5,[True]*3+[False]*7)
assert hommel(p,F('.05'),{1,2,3,4,6,10})==(4,[True]*5+[False]*5)
print('general Hommel adjusted:',','.join(str(x) for x in closure(p)))

printed={'.05':['.05','.025','.0169','.0127','.0102','.00851','.00730','.00639','.00568','.00511'],
         '.01':['.01','.005','.00334','.00251','.00201','.00167','.00143','.00126','.00112','.00101']}
for text,expected in printed.items():
 alpha=F(text);b={1:alpha}
 for n in range(2,11):
    b[n]=(sum(alpha**i for i in range(1,n))-sum(comb(n,i)*b[i+1]**(n-i) for i in range(1,n-1)))/n
 for n in range(1,11):
    if F(format(float(b[n]),'.3g'))!=F(expected[n-1]):
        print('Rom mismatch alpha',text,'row',n,'computed',format(float(b[n]),'.16g'),'printed',expected[n-1])
```

Observed output:

```text
Python 3.12.13
grid multisets 251 level checks 1395 both equivalences passed
Hommel example general j 5 rejected 3
Hommel example logical j 4 rejected 5
general Hommel adjusted: 21/1000,111/2500,119/2500,53/1000,233/4000,121/2000,121/2000,121/2000,121/2000,121/2000
Rom mismatch alpha .01 row 10 computed 0.001004472598983613 printed .00101
```

### F.5. Updated findings and exact-head review handoff

| Part E gap                               | Current author finding                                                                           | Review boundary                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Missing local originals                  | RESOLVED; five supplied copies match C.2                                                         | All six actual originals remain necessary in the reviewer workspace                           |
| Hommel computational trace               | RESOLVED for Section 2's general individual-rejection shortcut and the printed example; F.2/F.4  | Does not claim all-intersection software, or adopt Section 3's variant                        |
| PVL-07/08 adjusted-output substantiation | RESOLVED as explicit algebraic derivations from primary rules, with ties and boundaries; F.2/F.4 | Independent review assesses the derivations; no implementation or numerical guarantee adopted |
| Rom constant conflict                    | OPEN at p.664 Table 1, row 10, alpha=.01, MH                                                     | Require independent assessment and an explicit scope/adjudication; no silent correction       |

SR-C remains **PARTIAL** pending the named Rom conflict and its scope assessment;
no new CLOSED proposal is issued. E.4's other thirteen dispositions remain:
three CLOSED, one PARTIAL, ten INPUT_INCOMPLETE in total; overall INPUT_INCOMPLETE,
semantic NARROW and R4 PRELIM/source gaps remain. The fixed candidate/research-only
classifications, I-03 and SR-K's limited reading are unchanged. Resolving an
algebraic-output gap does not select that output for a Contract.

E.5's review instruction now applies to the exact successor containing Part F,
as pinned in the PR. Scope the review to C-C1 through C-C5 and Parts E/F with the
necessary C.2/C.3/C.7 and Shaffer D/E context. In particular inspect the five
reattached originals plus 22, verify their hashes, assess the two output derivations
and non-strict boundaries, reproduce the diagnostics, and judge the Rom discrepancy
without erasing it. Report whether PARTIAL is accurate and what bounded resolution
would permit a later CLOSED proposal. Do not demand unrelated R3/R4 PDFs for this
six-source pass. Carry optional old SR-K/SR-G findings without revising those heads.

The reviewer is independent of this continuing author-side work. Record actual
role/context/model evidence and distinguish content verdict from formal acceptance;
no extra exact-build-log format is required. Preserve the old reviews, and follow
E.5's new-file/draft-PR and validation instructions. No merge, hold closure, rule
amendment, public discussion, adoption, ratification or release has been performed.

---

## Part G — SR-C limited source-closure proposal after steward adjudication

### G.1. Fixed evidence and recorded approval

Status: author-side CLOSED source-result proposal; independent review of this
increment and formal hold acceptance remain pending. This is not implementation,
method adoption, numerical certification, public discussion or a release.

All 259026 bytes of Parts A–F at
`eb6c0b2657b0b8b1f5b4ca64e48ad0436319ecc4`, blob
`6ce3fbaa88ece237c27091a355e6f920ca175179`, SHA-256
`938dea980fae84411b53a4cbe08745b14211b96988d14b5e8add6576a32f9025`,
are preserved. The commission and fixed semantic comparison remain as in E.1.
The source set remains suppliers 11, 12, 13, 14, 18 and 22 with C.2/D.2 identities.
No new primary-source inspection or computation is claimed in this increment.

PR 195's independent primary completion at
`c36318971244c26073078b848ab2f3c52f46010b`, review blob
`8e2c0299d9ddc8da6bc165bb5317e8d6262ecf74`, supports C-C1 through C-C5
and the limited Rom adjudication. PR 194's separable review is preserved and its
original-access limitation is superseded only for these six sources. Their
source checks, independent integrations and validation are attributed to those
reports, not rerun here.

The user/steward explicitly approved the two proposed decisions in continuation
record Section 10. Approval is recorded in Section 11 at commit
`a5d886c56c5c0b9c9e60f19a10d15778dbad7c44`, blob
`3e2919865ca1a40421dcc3586fff2a687a0aacf8`, path
`governance/drafts/research-continuation-2026-09-07.md`.
The approval covers the bounded Rom conflict adjudication and the scoped
independence evidence; it does not approve final hold closure or merging.

### G.2. Decision applied to the source result

Rom p.664 Table 1, alpha=.01, row 10, MH retains its printed value 1.01 x 10^-3
as a conflicting value. The equation (2) result recorded in F.3 remains
0.001004472598983613... . Neither source value is silently replaced. The approved
boundary grounds PVL-10's methodological characterization in equation (2) and
the procedure; Table 1 is not adopted as numerical authority. Any later constants
require separately reviewed computation and the applicable numerical gates.
This is not a publisher erratum or a choice to implement Rom.

Accordingly the proposed source-result disposition for SR-C becomes **CLOSED**:
the six assigned primary texts support the bounded methodological claims, output
derivations are explicitly investigator algebra, and the material source conflict
now has an approved treatment. CLOSED here removes the specified source-acquisition
obstacle only. It does not promise arbitrary-dependence validity, general all-pairs
Simes validity, a production adjusted-p algorithm, an adopted numerical constant,
a simultaneous interval construction, or unrestricted use of logical constraints.
The fixed PVL-06/08/09/10 RES-ONLY and PVL-07 R3-CAND classifications remain.

For this current six-source recheck and Parts D–F, the steward accepted the
first-hand OpenAI author-side record and the Claude Fable 5.1 reviewer testimony,
primary-source inspection and non-involvement as establishing the distinct-model
pass. Historical review PENDING is preserved; a later acceptance relies on the
separate dated determination rather than modifying old testimony. This does not
resolve the separate historical SR-K/SR-G acceptance question. Part G itself was
prepared with OpenAI assistant support in the continuing author role; it requires
its own independent delta review.

### G.3. Proposed disposition ledger and limits

| Hold   | Proposed disposition | Basis / remaining boundary                                                                                   |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| SR-A   | INPUT_INCOMPLETE     | Prior disposition retained; new custody is not full synthesis                                                |
| SR-B   | INPUT_INCOMPLETE     | Prior disposition retained; new custody is not full synthesis                                                |
| SR-C   | CLOSED               | Six-source GO and approved limited Rom adjudication; this proposal awaits delta review and formal acceptance |
| SR-D   | INPUT_INCOMPLETE     | Prior source gaps retained                                                                                   |
| SR-E   | INPUT_INCOMPLETE     | Prior source gaps retained                                                                                   |
| SR-F   | INPUT_INCOMPLETE     | Prior disposition with Part D custody retained                                                               |
| SR-G   | CLOSED               | Preserved source-supported candidate; separate formal acceptance pending                                     |
| SR-H   | INPUT_INCOMPLETE     | Prior disposition with Part D custody retained                                                               |
| SR-I   | INPUT_INCOMPLETE     | Prior disposition with Part D custody retained                                                               |
| SR-J   | INPUT_INCOMPLETE     | Prior disposition with Part D custody and X-8 retained                                                       |
| SR-K   | CLOSED               | Preserved bounded candidate; all-pairs/I-03 and separate formal acceptance remain                            |
| SR-L   | CLOSED               | Inherited prior disposition                                                                                  |
| RSM-01 | INPUT_INCOMPLETE     | Prior source gaps retained                                                                                   |
| RSM-02 | INPUT_INCOMPLETE     | Prior disposition; Troendle custody does not cover all variants                                              |

Candidate counts: four CLOSED, zero PARTIAL, ten INPUT_INCOMPLETE. Overall
INPUT_INCOMPLETE and semantic NARROW remain; no SOURCE_SET_READY determination.
These are candidate result dispositions, not a claim that four holds have now
been formally accepted. Every other entry impact remains as in the prior tables.

The six-source review contains only one Part D original, 22. The other fifteen
Part D sources (08, 20, 21, 23–30, 32, 33, 35, 36) remain outside its scope.
The review's phrase "ten other Part D papers" is not used as a coverage count.
N-D4 stays open. No approval of all thirty-five collected artifacts follows.

Carry PR 195 N-P1–N-P4, PR 194 N-D1 and N-F1 as optional follow-up, with N-D2/N-D3
answered in review. In particular, Shaffer Section 4.1's printed index is not
adopted or repaired by this proposal; later selection of that variant requires
explicit treatment of N-P3. E.4's family, equality-constraint, dependence,
underlying-test, sidedness, variant, output, artifact and theorem reopen triggers
remain. Reopen the Rom claim if the adjudicated basis or future numerical use
changes, or a correction changes the interpretation of equation (2).

### G.4. Independent delta-review handoff

Pin the exact commit containing Part G from the PR, with sole parent eb6c0b26... .
Verify the sole changed path, the full A–F prefix, the unchanged six-source hashes,
PR 195's review identity and the approval record above. Review G.2's use of the
adjudication, the distinction between candidate CLOSED and formal acceptance,
the ledger counts, retained entry classes and reopen triggers. Assess the scope
of the approved independence determination without rewriting earlier PENDING.

Reuse PR 195's actual six-source pass and PR 194's separable work with attribution;
do not automatically repeat all original reading or calculations for this
administrative delta. Revisit an original only to resolve a concrete new concern.
If a source-level claim changes, report the expanded review needed. This review
does not authorize a merge or final hold closure.

Write a new English review on an unused neutral branch starting at the exact
successor, at `review-inputs/r3-src-closure-proposal/REVIEW-RESULT.md`. Preserve
all prior reviews and investigation heads; no force-push. Report per-scope GO /
REPAIR_REQUIRED / SOURCE_ACCESS_INCOMPLETE, findings, actual independence and
remaining acceptance steps. Run format:check, Markdown lint, direct validator and
diff checks with the review file; open a draft review PR. No formal acceptance,
hold update, public discussion, adoption, ratification or release.

---

## Part H. SR-B primary-source completion: Dunn and Sidak

**Status: author-side source-completion proposal; independent review and SR-B
acceptance pending.** Date: 2026-09-07. The continuing OpenAI-assisted investigator
appends this increment, not an independent review. Parts A-G are preserved as the
exact 267540-byte prefix from PR 196, commit
`80ad520cf25e8cdf647f20e7d08d5bb426a85633`, blob
`34f01d4e14b0e0feac7ef934f11e886535c90c41`. The fixed semantic input and acquisition
commission remain those pinned in the earlier parts. No catalogue entry is edited.

### H.1. Custody, inspection and prior-work reuse

D.2/D.3 already record receipt and routing of suppliers 20 and 21. This pass first
consulted those records and the saved inventory, then confirmed the local PDFs'
hashes and lengths before extending the initial intake into content inspection.
Neither is newly acquired or counted again: the received supplier total stays 35.

| Supplier / source | Original identity                                                                                       | Bibliography and inspection                                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20 / SRC-13       | SHA-256 `6cd0ccda87a138d447391991c9858f5cea4294bfaeccaa8518754d2854d89533`; 641762 bytes; 9 PDF pages   | Sidak (1967), Rectangular Confidence Regions for the Means of Multivariate Normal Distributions, JASA 62(318), 626-633; DOI 10.1080/01621459.1967.10482935. One publisher cover plus eight printed pages. |
| 21 / SRC-14       | SHA-256 `14aa5adbbf07da8e7a73f4451a04d62bd7da198f6053e120afab29145a422488`; 1385001 bytes; 14 PDF pages | Dunn (1961), Multiple Comparisons among Means, JASA 56(293), 52-64; DOI 10.1080/01621459.1961.10482090. One publisher cover plus thirteen printed pages.                                                  |

Acquisition route: previously supplied publisher-purchase ZIP, preserved locally;
no new external acquisition attempted. Inspected the saved text extraction across
both papers, with focused page-image checks of Sidak pp.627-631 and Dunn pp.53-54, 61 and 63. Equation-level claims below rely on those images where extraction was damaged.
The comparative tables are not comprehensively transcribed or recalculated here.
No PDF, full extraction, or table facsimile is included in the repository.

### H.2. Direct source findings

| Claim                                         | Primary pinpoint                                                                                 | What the original supports and its limits                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B-1: finite planned family and attribution    | Dunn pp.52-54, Section 2, equations (1)-(6)                                                      | Select m linear combinations in advance, rather than all possible post-selection contrasts. The mean estimators are normally distributed, their covariance matrix is known up to a common scale, and an independent variance estimate has the stated chi-square degrees of freedom. Each standardized combination has a Student t marginal. Dunn explicitly invokes a Bonferroni inequality without needing the joint t distribution; equation (4) bounds simultaneous coverage from below. |
| B-2: equal allocation and supported intervals | Dunn p.54, equations (5)-(7) and the displayed tail integral                                     | Choose the upper t tail to equal alpha/(2m); the two-sided marginal noncoverage is alpha/m. The intervals cover all m planned targets with probability at least 1-alpha. The source's occasional description as level 1-alpha does not convert the lower bound into exact joint coverage. Equation (7) permits unequal sample sizes with the stated common-scale model.                                                                                                                     |
| B-3: Gaussian symmetric rectangles            | Sidak pp.626-628, Theorem 1, equation (1), singular-limit paragraph and Corollary 1 equation (4) | For a centered multivariate normal vector, arbitrary variances and correlation matrix, the probability of a coordinatewise symmetric rectangle is at least the product of its marginal probabilities. The paper extends the result to singular distributions by a limiting argument. No positive pairwise-correlation restriction is imposed for this symmetric result.                                                                                                                     |
| B-4: independent-coordinate calibration       | Sidak pp.628-629, Section 3, equation (5) and following normal-quantile expression               | With known variances, choose marginal coverage probabilities whose product is 1-alpha. Equal allocation gives marginal coverage (1-alpha)^(1/k). This is conservative for the dependent Gaussian coordinates covered by B-3; independence gives the calibration case.                                                                                                                                                                                                                       |
| B-5: common random scale and boundary         | Sidak pp.629-631, Theorem 2 equation (6), Corollary 2 equation (8), Section 5 and Remarks 2-3    | The extension uses one positive random scale independent of the Gaussian vector and the same scale distribution under the compared laws. Corollary 2 bounds joint coverage by the product of marginal coverages. Section 5 gives an unknown-equal-variance construction using one coordinate's sample variance and n-1 degrees of freedom. It does not license arbitrary coordinate-specific standard errors.                                                                               |
| B-6: pooled-scale qualification               | Sidak p.631, Remark 2; p.632, Discussion                                                         | For the mentioned pooled estimate, the paper says its comparison to the intermediate independent-coordinate law cannot be established by the stated method; it separately asserts that the first-to-last product bound remains true by a similar proof. Preserve that distinction. The discussion distinguishes the unknown-unequal-variance case; do not transfer the equal-variance construction to arbitrary Welch statistics.                                                           |

Dunn pp.52-53 is a directly inspected primary account of this application of the
Bonferroni inequality, not proof of historical priority: Dunn herself leaves prior
use open. SRC-14 attribution is resolved as the assigned source for the procedure,
not as a claim that Dunn invented the inequality or was its first user.

Sidak p.628 also mentions a one-sided comparison result attributed to Slepian.
That mention is not the symmetric-rectangle theorem and its cited original was
not inspected in this pass. No general one-sided guarantee is attributed to B-3.

### H.3. Investigator derivations and catalogue reconciliation

These are mathematical deductions from the stated marginal and joint bounds,
not adjusted-p formulas transcribed from the originals. Fix a finite family of
m >= 1 hypotheses before selection and alpha in (0,1). Each true-null p value is
valid: P(p_i <= u) <= u for every u in [0,1]. Let I0 be the true-null subset.

**PVL-01.** Reject at p_i <= alpha/m. The union bound gives
P(any false rejection) <= sum over I0 of P(p_i <= alpha/m)
<= count(I0)*alpha/m <= alpha. Thus the abstract rule has strong FWER control
under arbitrary dependence of valid marginals. Dunn's Student-t interval model is
one sourced construction of those marginals, not a necessary normality condition
for the abstract probability argument. Inverting the single-step threshold yields
adjusted p_i = min(1, m*p_i); the cap is the investigator's [0,1] output convention.
This does not approve a general marginal-p generator or a production implementation.

**PVL-02.** Let t = 1-(1-alpha)^(1/m). Independence of the true-null p values,
or more generally the explicit bound
P(all p_i > t for i in I0) >= product over I0 of P(p_i > t),
yields P(any false rejection) <= 1-(1-t)^count(I0) <= alpha.
For strong control the bound is required under every configuration of false nulls,
not just under the complete null. The empty true-null set has false-rejection
probability zero. Independence and valid marginals imply this bound directly;
exact uniform independent p values give equality when all m nulls are true.

The source-backed dependent example is the continuous two-sided Gaussian pivot
family in B-3/B-4 (or a justified common-scale family in B-5). Apply the rectangle
bound to the true-null subvector. Its centered Gaussian law and covariance
assumptions must continue to hold under the relevant parameter configuration.
The continuous boundary has zero marginal probability, so the strict no-rejection
event matches the source's non-strict rectangle for this purpose. Inverting the
threshold gives adjusted p_i = 1-(1-p_i)^m. This inversion alone does not establish
the joint bound or strong FWER for an arbitrary dependent p-value family.

The fixed catalogue's shorthand "independence/orthant condition" is therefore
reconciled by the explicit no-rejection product bound above and these sourced
Gaussian cases. A claim of arbitrary dependence, merely nonnegative pairwise
correlations, or an unspecified positive-dependence label is not supported.
This is a clarification of the source condition, not expansion to a new method.
Both PVL-01 and PVL-02 retain R3-CAND as research classifications; neither is selected.

Dunn's planned finite-family intervals and Sidak's specified rectangles are actual
source outputs. Their presence does not create a simultaneous-interval Contract
for every abstract adjusted-p procedure. Neither paper supplies Protocol tolerance,
rounding, implementation, deterministic-output or numerical-oracle requirements.

### H.4. Conflicts and reopening boundaries

Two source observations are preserved outside the decision-bearing PVL-01/02 basis:

- Sidak p.631 Table 1 and p.632 explicitly question the reproduced k=2,
  infinite-degrees-of-freedom value 2.23 (the other column gives 2.24). This is
  the original author's printed observation, not a publisher erratum found here.
  No value from that table is adopted or independently recomputed in this pass.
- Dunn p.61 Section 5 prints n(a-1)(b-1) for the example's pooled-variance degrees
  of freedom. The p.63 Table 7 headers instead list 24 for a=3,b=4,n=3
  and 60 for a=4,b=5,n=4; these equal ab(n-1), not the p.61 expression.
  The p.61 expression and both table headers were confirmed in page images.
  This is a flagged example-level
  discrepancy, not a formal erratum or an adopted replacement formula. Section 2's
  generic assumed degrees of freedom, used for B-1/B-2, does not depend on it.
  Carry it to R4 before reusing this factorial example; it resolves none of
  PR 184's source-access findings.

Reopen SR-B if the intended family is selected after examining results, marginals
are not valid, the true-null product condition cannot be established for PVL-02,
a different tail/scale construction is proposed, priority rather than assigned-source
attribution becomes decision-bearing, or new primary evidence changes the scoped
reading. Any numerical use of the flagged tables/example requires separate review
and, if material to a decision, adjudication. No conflicting cell is silently fixed.

### H.5. Proposed disposition and independent handoff

**SR-B: CLOSED proposed for its source-acquisition obstacle**, subject to an
independent primary-source review of H.2-H.4 and the narrowing interpretation in
H.3. The assigned originals are identified and directly inspected; the necessary
source claims for PVL-01 attribution and the bounded PVL-02 characterization have
pinpoints. The restrictions above are explicit unsupported-domain boundaries,
not claims that the method is universally valid. This author verdict is not GO
from an independent reviewer and is not formal SR-B acceptance.

With this proposal the candidate ledger is:

| Disposition      | Entries                                                  | Count |
| ---------------- | -------------------------------------------------------- | ----: |
| CLOSED           | SR-B, SR-C, SR-G, SR-K, SR-L                             |     5 |
| PARTIAL          | none                                                     |     0 |
| INPUT_INCOMPLETE | SR-A, SR-D, SR-E, SR-F, SR-H, SR-I, SR-J, RSM-01, RSM-02 |     9 |

Overall **INPUT_INCOMPLETE**; existing semantic **NARROW** retained. Thirteen
non-SR-B dispositions are carried from G.3, not re-reviewed here. SR-C's separate
steward acceptance is recorded in continuation Section 12 at commit
`e048cc0622bd5e063b692c7e6072674f1631df85`, blob
`1b09b81f8bd6a9e368111d21e1c7733d09a47de7`; the candidate count does not assert five
formally accepted holds. SR-K/SR-G acceptance remains separate.

Next reviewer: use the exact new PR head, verify its sole parent and result blob,
preserve the 267540-byte Parts A-G prefix and prior reviews, and supply the two
originals at H.1 identities. Reuse prior custody and PR 197's Part G review with
attribution; directly check B-1 through B-6, the assumptions and true-null-subset
argument, adjusted-output derivations, source conflicts and CLOSED proposal.
If the proposed narrowing does not satisfy the commissioned source claims, record
the precise residual gap and an appropriate disposition instead of assuming closure.
The other thirty-three supplied sources are outside this pass. Record context,
non-involvement and ordinary model provenance; do not request exact-build logs.
Write a separate English review under
`review-inputs/r3-srb-primary-completion/REVIEW-RESULT.md` on an unused neutral
branch created from the new exact head. Run format check, Markdown lint, direct
validator and diff check, then open a draft PR only. Do not merge, accept a hold,
move the reviewed head, alter historical reviews, open discussion, adopt a method
or publish a release.

RELEASE 3 PART H AUTHOR SOURCE WORK COMPLETE - SR-B CLOSED PROPOSED - INDEPENDENT
PRIMARY REVIEW AND SR-B ACCEPTANCE PENDING - OVERALL INPUT_INCOMPLETE - NOT ADOPTED

---

## Part I. SR-H source work: protected and modified LSD

**Status: author-side bounded source investigation; independent review pending.**
Date: 2026-09-08. This continuing OpenAI-assisted investigator inspected the
previously received Hayter (1986) original for C-H4, APR-13 and APR-14. This is
not an independent review, an SR-H closure proposal or an implementation decision.

### I.1. Fixed inputs, custody and scope

Parent result: PR 198 at `f6d39534e85920a8331941126a6eb384244e34f1`, blob
`b0679cbad8d384158b93ce414f8dfb7f2270ea74`. Its 283253-byte Parts A-H prefix
is preserved exactly. The acquisition commission and fixed semantic comparison
remain those pinned earlier. SR-B's scoped acceptance, with the S-H1/S-H2
addendum, is recorded in continuation Section 14 at
`03ce30ec67904e08da70d80afd1fd6de36909dad`, blob
`bc16345d5058d0b5d122c71577008716db49a89f`. That acceptance is not applied to
this new source work. Historical result and review verdicts remain unchanged.

Supplier 26 / SRC-35: Anthony J. Hayter (1986), The Maximum Familywise Error Rate
of Fisher's Least Significant Difference Test, JASA 81(396), 1000-1004;
DOI `10.1080/01621459.1986.10478364`. Original SHA-256
`33000fec094c81a4dbb581653d28d3a72bb8a2379a8baafbc1dafab1d6032eed`,
582732 bytes, six PDF pages: publisher cover followed by pp.1000-1004.

Consulted D.2/D.3 and the saved inventory before rechecking this original's hash
and length. Used the previously supplied publisher-purchase ZIP copy; no external
reacquisition. Read the extracted text of pp.1000-1004, including references,
and page images of pp.1000-1003 for the model, equations, theorems, proof and
Table 1. Supplier 26 is not newly counted; custody remains 35. The full extraction,
PDF and images remain outside Git. This increment reviews neither the remaining
SR-H papers nor all supplied originals.

### I.2. Primary-source findings for C-H4

| Topic                         | Direct pinpoint                                                | Source statement and scope                                                                                                                                                                                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Population and family         | pp.1000-1001, Sections 1-2                                     | Independent normal observations in a fixed-effects one-way model with common variance; k >= 3 populations; all k(k-1)/2 two-sided pairwise equality tests. S squared estimates the common variance independently of the means and has scaled chi-square law with nu degrees of freedom, ordinarily sum(n_i)-k. Equal n_i defines balance.                 |
| Protected LSD procedure       | p.1000, Section 1; p.1001 equation (2.2)                       | Stage 1 is an alpha-level overall ANOVA F test. Only after rejection does stage 2 perform the pairwise alpha-level t tests. Under the complete null, the false-rejection event is contained in the stage-1 rejection event, so FWER is at most alpha.                                                                                                     |
| Original LSD worst-case error | p.1001 Theorem 1 equation (2.1); p.1002 equations (2.9)-(2.12) | For balanced designs and unbalanced k=3 designs, MFWER equals P(Q_(k-1,nu) > sqrt(2)*t_(alpha/2,nu)), with t denoting an upper-tail critical value. For general unbalanced k>=4 designs this expression is an upper bound, not a universal equality.                                                                                                      |
| Worst-case construction       | pp.1001-1002 equations (2.3)-(2.11)                            | Partition the population means into equal-mean clusters. Separate distinct cluster means without bound so the omnibus gate rejects with probability tending to one. The extremal partition used in the proof has k-1 equal means and one separated mean.                                                                                                  |
| Unbalanced qualification      | p.1002, paragraph after equation (2.12)                        | The paper additionally establishes equality when k-1 sample sizes are equal. Its claim that the bound is usually close for other imbalances cites external simulation/calculation; those cited studies are not independently inspected here and no uniform closeness guarantee is inferred.                                                               |
| Modified LSD                  | pp.1002-1003, Section 3 and Theorem 2                          | Retain the stage-1 gate and replace the stage-2 t critical value by q_(alpha,k-1,nu)/sqrt(2), where q is the upper alpha Studentized-range quantile. MFWER equals alpha for balanced models and unbalanced k=3; it is at most alpha for unbalanced k>=4.                                                                                                  |
| Proof dependencies            | p.1003, Appendix Theorems A.1/A.2                              | A.1 compares unequal-precision independent normal pairwise ranges with equal-precision ranges; its proof is referred to Hayter (1984), not reproduced. A.2 supplies the strict product inequality for grouped independent-normal ranges and includes its proof here. This pass inspects the 1986 statements and proof use, not the referenced 1984 proof. |

The source's term MFWER concerns false pairwise rejections over configurations of
population means. It does not mean that failing to reject establishes equality.
Its language declaring means equal after a non-rejection is procedural wording,
not a Protocol equivalence claim.

### I.3. Investigator interpretation and implications

These implications are investigator deductions, distinguished from I.2:

- APR-13 is the protected two-stage procedure, not an unprotected collection of
  t tests. The complete-null bound establishes weak control. The balanced-model
  worst-case expression for k>3 can exceed alpha, so the fixed catalogue's
  strong-FWER warning is supported. Do not reinterpret this as saying that
  every parameter configuration, or every unequal-sample-size design, exceeds
  alpha. For k=3, Q_(2,nu) has the distribution of sqrt(2)*abs(t_nu), so the
  expression reduces to alpha under the source model.
- The paper uses a maximum notation, but its separation argument approaches the
  extremal error in a limit. Retain the worst-case/supremum interpretation rather
  than claiming a finite mean vector necessarily attains that value.
- Let T_ij = abs(mean_i-mean_j)/(S*sqrt(1/n_i+1/n_j)). Modified LSD rejects a
  pair only if the omnibus gate rejects and T_ij exceeds
  q_(alpha,k-1,nu)/sqrt(2). Equivalently the absolute difference exceeds
  q_(alpha,k-1,nu)*S*sqrt((1/n_i+1/n_j)/2). This algebra translates the
  printed critical value; it is not a new sourced procedure or certified code.
- The range dimension is k-1, while the member set still contains all
  k(k-1)/2 pairs. The dimension is not the number of pairwise hypotheses and
  does not remove one observed group from the family.
- Theorem 2 gives strong FWER control for the modified procedure under its
  model, with exact worst-case equality only in the stated cases. Removing the
  stage-1 gate is not licensed by this result. Common variance, normality and
  the independent variance estimator do not carry over to arbitrary Welch pairs.
- Source outputs are rejection decisions and worst-case error characterizations.
  No adjusted-p algorithm, simultaneous confidence-interval contract, grouping
  convention, numerical tolerance or production quantile implementation is
  adopted. An adjusted-output or interval claim would need its own derivation
  and review before use.

### I.4. Limited author-side calculation and printed-table precision

As a diagnostic, recomputed three cells of p.1002 Table 1 at alpha=.05 and
nu=infinity, without using the Studentized-range distribution implementation.
For r=k-1 and q=sqrt(2)_Phi_inverse(1-alpha/2), the normal-range CDF is
r times the integral of phi(x)_(Phi(x+q)-Phi(x))^(r-1) over the real line.
The following Python/SciPy 1.17.0 calculation truncates to [-12,12]; outside
this interval the integrand is bounded above by r*phi(x). The quadrature error
estimate is diagnostic, not a rigorous enclosure or a Protocol tolerance.

```python
from math import exp, pi, sqrt
from scipy.integrate import quad
from scipy.special import ndtr, ndtri

q = sqrt(2) * ndtri(1 - .05 / 2)
for k in (3, 4, 10):
    r = k - 1
    cdf, err = quad(
        lambda x: r * exp(-x*x/2) / sqrt(2*pi)
        * (ndtr(x+q)-ndtr(x))**(r-1),
        -12, 12, epsabs=1e-12, epsrel=1e-12,
    )
    print(k, 1-cdf, err)
```

|   k | Printed Table 1 | Author diagnostic tail | Reported quadrature error |
| --: | --------------: | ---------------------: | ------------------------: |
|   3 |           .0500 |     .04999999999999993 |                  7.14e-13 |
|   4 |           .1222 |     .12226630594424204 |                  3.84e-13 |
|  10 |           .5715 |      .5715912453416663 |                  1.71e-14 |

The k=4 and k=10 diagnostic values round to .1223 and .5716 at four decimals,
not the printed .1222 and .5715. Preserve both representations. This pass has
not established whether historical approximation, truncation or another cause
explains those last-place differences; it has not found or searched for a formal
erratum. The theorem, not the printed rounded table, is the characterization
basis. No table value or substitute is adopted. This is an author-side check,
not independent review, full-table validation or finite-nu numerical closure.

### I.5. Entry impact, remaining source work and review handoff

| Entry                | Current increment                                               | Remaining boundary                                                                                                                               |
| -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| APR-10 Newman-Keuls  | Saved C.3 Newman findings retained; no new content claim        | Keuls and the complete range step-down/error characterization still require detailed synthesis and review.                                       |
| APR-11 Duncan        | Saved C.3 Duncan findings retained; no new content claim        | Carry the protection-level versus familywise-error distinction into the joint SR-H synthesis and review.                                         |
| APR-12 REGWQ         | D.2 custody of Ryan, Einot-Gabriel and Welsch retained          | Exact variants, stagewise critical levels, guarantees and the mapping to the fixed combined entry remain to be synthesized from those originals. |
| APR-13 protected LSD | C-H4 source characterization supported by Theorem 1 and I.2/I.3 | RES-ONLY retained; no implementation, unrestricted strong-FWER claim or numerical table adoption.                                                |
| APR-14 modified LSD  | C-H4 source characterization supported by Theorem 2 and I.2/I.3 | RES-ONLY retained; retain the gate, model and k-1 range dimension; independent review pending.                                                   |

C-H4 is now source-supported on the author side for this bounded characterization;
that is not a new SR hold or an independent GO. **SR-H remains INPUT_INCOMPLETE**
because required C-H1/C-H3 source work is still incomplete, even though copies
have been received. Receipt and completion of content inspection are distinct.
No independent content approval of Newman/Duncan or the other SR-H papers is
inferred from this one-paper pass.

All fourteen H.5 dispositions are retained: five CLOSED candidates, zero PARTIAL,
nine INPUT_INCOMPLETE. Overall INPUT_INCOMPLETE and semantic NARROW remain.
SR-B/SR-C accepted research dispositions are not method adoption; SR-K/SR-G's
separate acceptance question is unchanged. No source restriction is relaxed.

Reopen C-H4 before a change to the gate, tails, family, balance/variance model,
scale estimator, range dimension, or claimed output. Any future numerical use of
Table 1 requires resolving the recorded precision discrepancies and satisfying
its own numerical evidence requirements. A complete proof audit of the unequal-size
comparison would also require the cited Hayter (1984) proof; this pass does not
claim that audit. R4's existing source gaps and Dunn-example conflicts remain.

Independent reviewer: pin this increment's exact head and sole parent; verify
that Parts A-H remain a 283253-byte prefix and that supplier 26 matches I.1/D.2.
Directly inspect Hayter (1986) at the stated printed pinpoints, assess C-H4,
Theorems 1/2, exact-versus-bound distinctions, the gate and model restrictions,
the proof-dependency disclosure, the diagnostic integral and the table differences.
Do not rely on the author check as an independent oracle. Reuse earlier identities
with attribution, without repeating unrelated source reviews. The other 34 supplied
originals and C-H1/C-H2/C-H3 content verdicts are outside this bounded pass.
Record ordinary model/context/non-involvement evidence without exact-build-log
requirements. Save a separate English review at
`review-inputs/r3-srh-lsd-primary/REVIEW-RESULT.md` on an unused neutral branch
from the exact head; run format check, Markdown lint, direct validator and diff
check and open a draft review PR. Do not rewrite this result or prior reviews,
merge, accept SR-H, open discussion, adopt a method or publish a release.

RELEASE 3 PART I C-H4 AUTHOR SOURCE WORK COMPLETE - INDEPENDENT REVIEW PENDING -
SR-H AND OVERALL INPUT_INCOMPLETE - NO METHOD OR NUMERICAL VALUE ADOPTED

## Part J. Part I review repairs: table discrepancy scope and formula display

### J.1. Scope, provenance and preserved input

Date: 2026-09-08. This continuing OpenAI-assisted author appends a bounded
repair after the user's explicit steward approval of PR 201's submitted matters.
Parts A–I are preserved byte-for-byte: 297669 bytes at
`81835178ac49f189064e20d9babda219acfd7c5f`, result blob
`8774beb8d1736baa8637ef60945d53834a0affb0`. This increment supplies no new
independent review and does not rewrite the historical Part I status line.

Independent review basis: PR 201, commit
`92867850f00d9d3a0f0f62b527707cb198196f51`, review blob
`39232d73052774cabeab6c090c29deed64b6126c`, path
`review-inputs/r3-srh-lsd-primary/REVIEW-RESULT.md`. Its GO is bounded to C-H4;
S-I1/S-I2 concern record precision and leave the disposition unchanged. The
steward's Part I acceptance and scoped independence determination are recorded
separately in continuation Section 15. That determination does not establish
independence for the present author-side Part J repair or alter past PENDING
statements. The exact continuation identity is supplied in this PR's handoff.

### J.2. S-I1: expanded table-discrepancy record

I.4 reports only its actual three-cell author diagnostic. It is not a complete
description of the discrepancies in Hayter (1986), printed p.1002 Table 1.
PR 201 Section 7 extends the comparison to all 54 cells, using a separate
mpmath computation of the infinite-df expression. Its reported results are:

| alpha | Cells differing at four-decimal rounding | Approximate largest absolute computed-minus-printed difference | Direction among differing cells |
| ----- | ---------------------------------------- | -------------------------------------------------------------- | ------------------------------- |
| .01   | 16 of 18                                 | .00065 (k=20)                                                  | printed below computed          |
| .05   | 14 of 18                                 | .00013 (k=15)                                                  | printed below computed          |
| .10   | 8 of 18                                  | .00012 (k=8)                                                   | printed above computed          |

Thus 38 of 54 cells differ, with a column-dependent pattern. Future work cannot
treat the issue as only two last-place differences. This paragraph supersedes
that limited reading of I.4, while preserving the earlier diagnostic's actual
scope and outputs. The expanded observations and calculations belong to the
independent reviewer; this repair has not rerun them or reinspected the PDF.

The cause is not established. No formal erratum, replacement values or guaranteed
three-decimal accuracy follows from the diagnostic. The printed table remains
preserved and is not adopted as numerical authority. Any future numerical use
requires separately reviewed calculations and resolution of the discrepancy;
neither the quadrature error estimates nor these observed differences become
Protocol tolerances. The theorem-based characterization remains unchanged.

### J.3. S-I2: literal multiplication in the I.4 prose formula

The two prose expressions in I.4 lost multiplication signs through Markdown
emphasis formatting. Read them as follows, matching the unchanged Python code:

- `r = k - 1` and `q = sqrt(2) * Phi_inverse(1 - alpha/2)`.
- The normal-range CDF is the integral, over the entire real line, of
  `r * phi(x) * (Phi(x + q) - Phi(x))**(r - 1)`.

Here `phi` and `Phi` are the standard normal density and CDF. Code spans preserve
the literal multiplication signs. This corrects presentation only: I.4's code,
transcript, integration truncation and diagnostic limitations are unchanged.

### J.4. Disposition and bounded repair-review handoff

S-I1/S-I2 are addressed on the author side; independent close-only review of this
delta is pending. PR 201's seven optional findings remain carried forward rather
than silently adopted. C-H4's accepted scope stays bounded to Part I read with
these precision corrections. SR-H remains INPUT_INCOMPLETE, APR-13/14 RES-ONLY,
and the candidate ledger 5 CLOSED / 0 PARTIAL / 9 INPUT_INCOMPLETE. Overall
INPUT_INCOMPLETE, semantic NARROW, the 35-original custody count, all other holds,
R4 source gaps and Dunn numerical conflicts remain unchanged. No method, table
value, implementation, numerical guarantee, public opening or release is adopted.

The independent repair pass checks the exact new head and sole parent, the
297669-byte prefix, J.2 against PR 201 Sections 7/10, J.3 against I.4's code,
attribution, scoped approval, and unchanged limits and ledger. Reuse PR 201's
primary-source findings explicitly; no new original inspection or 54-cell
recalculation is needed for this transcription/presentation-only scope. If a
source claim is reopened, request only the necessary original and record the
access limitation rather than claiming inspection. Save an English review at
`review-inputs/r3-srh-lsd-repair/REVIEW-RESULT.md` on a new neutral branch
from the exact repair head, and open a draft review PR targeting the repair
branch. Do not change this result, historical reviews or acceptance records.
Report actual format, Markdown lint, direct-validator and diff-check results,
and disclose context/model independence without exact-build-log requirements.

RELEASE 3 PART J REPAIRS RECORDED - INDEPENDENT DELTA REVIEW PENDING -
SR-H AND OVERALL INPUT_INCOMPLETE - NO METHOD OR NUMERICAL VALUE ADOPTED

## Part K. Ordered-range source synthesis and procedure boundaries

### K.1. Identity, custody and inspection scope

Date: 2026-09-08. Continuing OpenAI-assisted author investigation, not an
independent review. Append only to PR 202 at
`1b2a1efa25d37b6cc140b788cbaab4f78e84ec2b`, result blob
`94751f095f5b669c40520c84c40aaf3080eb552a`; preserve all 303208 bytes of
Parts A–J. The acquisition commission remains blob
`3c7ddcc696f0c284213f7efe0da68e747bc238d7` at containing commit
`f39100161cb45de15767bdb19ed54aba9489b41a`; comparison remains fixed to
semantic commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`, result blob
`8f21526040924b891f64724c2d0fde9ea94eff92`. Both input blobs were verified.

The four supplier PDFs below were already received in Part D. Local SHA-256,
bytes and PDF page counts were recomputed and match D.2. No retrieval, new
purchase or new supplier count is involved; the total stays 35. Acquisition route
is the user's supplied publisher-purchase archive, as recorded in Part D.

| Supplier / original       |   Bytes | PDF pages | SHA-256                                                            |
| ------------------------- | ------: | --------: | ------------------------------------------------------------------ |
| 24 / `24_Einot_1975.pdf`  | 1211995 |        11 | `1b097f5cdf16785e0aebf9c29359b957beb94caf51bb46255eaceb3d841cd57b` |
| 25 / `25_Welsch_1977.pdf` |  954326 |        11 | `1111684b7f639503ae40caa063556f79f0da5729c34fcef6286ba9b2498a0600` |
| 35 / `35_Keuls_1952.pdf`  |  564826 |        11 | `3c15767f3d732bd3268b2dc7dacba397fd736e8181bb9ddbc0fc9a63941e1616` |
| 36 / `36_Ryan_1960.pdf`   |  750050 |        11 | `4a8b0f3429c4f538f5d34da776c6b410506b95e95b0a3d5d0bb21c6f2e522c99` |

Bibliographic identities remain D.3: Keuls (1952), _The Use of the Studentized
Range in Connection with an Analysis of Variance_, Euphytica 1:112–122;
Ryan (1960), _Significance Tests for Multiple Comparison of Proportions,
Variances, and Other Statistics_, Psychological Bulletin 57:318–328;
Einot and Gabriel (1975), _A Study of the Powers of Several Methods of Multiple
Comparisons_, JASA 70:574–583, DOI 10.1080/01621459.1975.10482474; Welsch
(1977), _Stepwise Multiple Comparison Procedures_, JASA 72:566–575,
DOI 10.1080/01621459.1977.10480614. Supplier numbers are not SRC identifiers:
all four belong to the SRC-29 collection.

Actual inspection in this pass:

- Keuls: extracted prose pp.112–122; page images pp.115–117 and 120–121.
  The graphs and complete cabbage-data table were not numerically audited.
- Ryan: text pp.318–322 and p.328, plus the beginning of the p.323 table;
  images pp.319–322. The later proportion, variance and nonparametric examples
  are not approved by this pass.
- Einot–Gabriel: text pp.574–579, closing discussion pp.582–583, and references;
  images pp.575–578 and 583. The Monte Carlo tables were not reproduced.
- Welsch: text pp.566–571 and 575; images pp.567–569, 571 and 575.
  Appendix A's computational discussion was read, but no full algorithm or
  critical-table audit is claimed; pp.572–574 tables were not inspected here.

Newman (06) and Duncan (17) evidence in C.2/C.3 is reused as prior author
inspection, not as a fresh PDF reading or independent approval. Hayter's C-H4
result/reviews remain separately fixed. Continuation Section 16 at
`0202eb00c1e9b4f62b80ae4074160e1b58e77c57`, blob
`000f27e012c5ab3446b16fd5f08f4c4d3a3b9ebb`, records Part J acceptance.
It neither accepts Part K nor establishes this new pass's review independence.

### K.2. Source statements and exact procedure distinctions

In this table, k denotes the total number of means and p a subset size unless
explicitly describing Ryan's or Welsch's original notation. These notational
translations do not change the source procedures.

| Claim / entry                                         | Primary pinpoint                                                              | Source statement and boundary                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-H1 / APR-10, Keuls construction                     | Keuls pp.116–117, 120–121, Range-test and Conclusion                          | Equal-precision normal, uncorrelated means in the balanced example; order means, test the largest span with its Studentized-range critical value, and proceed to shorter spans with their corresponding sizes. The example follows ANOVA. The discussion treats F and range as nearly equivalent in experience, not identical rejection events. The p.121 footnote explicitly distinguishes this procedure from Newman's examples.                                                                      |
| C-H1, limits of Keuls's argument                      | Keuls p.120 and p.121 Conclusion                                              | The author acknowledges neglected uncertainty from earlier conclusions and accumulation of errors as groups shrink; further mathematical study is left open. This is not a proof of strong FWER control.                                                                                                                                                                                                                                                                                                |
| C-H3 / APR-12, Ryan's actual 1960 rule                | Ryan pp.318–319, numbered rules 1–3                                           | Layered testing from the ordered extremes inward; a non-significant span stops testing inside it. For n total samples and span size k, test the extreme pair at two-sided nominal level `2*alpha/(n*(k-1))` using the applicable pairwise test. This is not a Studentized-range quantile rule.                                                                                                                                                                                                          |
| C-H3, Ryan's error allocation and outputs             | Ryan pp.320–322                                                               | The partial-null argument allocates an error budget proportional to the number of samples in each homogeneous group; p.321 discusses unused budget for a singleton and erroneous reversals. On p.322 confidence intervals use the constant pairwise level `2*alpha/(n*(n-1))`, independently of observed order; they are not intervals obtained by inverting the variable layer rule. The broad plug-in generalization is the source's claim, not a Protocol guarantee for arbitrary statistics.        |
| C-H3, Einot–Gabriel model and all-containing-set rule | Einot–Gabriel p.575 Sections 1.2–1.3, (1.1)–(1.5); p.577 Section 1.6          | Independent normal means with variances `sigma^2/n_i`, and an independent estimate with scaled chi-square law and error df. Subset homogeneity is rejected only if its statistic and every containing-set statistic exceed the relevant critical values, strictly. Retention of a containing set retains its subsets. A local threshold exceedance alone is insufficient.                                                                                                                               |
| C-H3, distinct statistics and allocations             | Einot–Gabriel p.576 (1.6)–(1.15), footnote 2                                  | The balanced range statistic is `sqrt(n)*(max(mean)-min(mean))/s`; the sum-of-squares statistic is `(p-1)*F`. NK uses `gamma_p=alpha`; the comparison's rescaled Duncan allocation is `1-(1-alpha)**((p-1)/(k-1))`; the Ryan-type allocation used here is `1-(1-alpha)**(p/k)`. Footnote 2 contrasts Ryan's more conservative `alpha*p/k`. These are different allocations, and range and F remain different procedures.                                                                                |
| C-H1/C-H3, error-control distinction                  | Einot–Gabriel pp.577–578 Section 1.7, (1.23)–(1.26)                           | For separated homogeneous blocks, a shared-scale product bound is used; for known variance the block statistics are independent. NK can yield `1-(1-alpha)**q > alpha` for q greater than one; the Ryan allocation gives a bound no greater than alpha. The rescaled Duncan comparison is also bounded, and is not the original conventional pairwise-alpha calibration.                                                                                                                                |
| C-H3, Welsch ordering and model                       | Welsch p.567 Sections 2–3                                                     | Ordered equal-sample-size means, independent Gaussian populations and an independent chi-square scale estimate. A significant stretch makes containing stretches significant; a retained stretch precludes significance inside it. Step-down starts with the full range; step-up starts with adjacent gaps. Ordered sample positions do not identify the order of true means.                                                                                                                           |
| C-H3, Welsch's distinct A/B and step-up/down variants | Welsch pp.567–568, Theorems 1–2 and Section 4                                 | In original notation t is total means and j is block size. B uses block budget `j*alpha/t`; A uses the same except `t-1` receives alpha (t also receives alpha). GAPA/GAPB calibrate a union of stretch exceedances. NKA/NKB use Studentized-range tail probabilities for individual homogeneous blocks. Both theorems require a nondecreasing critical sequence and bound overall Type I error by a sum of block probabilities. Section 4 explicitly contrasts Ryan's pairwise tests with range tests. |
| C-H3, numerical and directional boundaries            | Welsch p.569 Section 5.2 and Appendix A; p.571 top; p.575 table-use paragraph | General control of the union of Type I and Type III errors is left as a conjecture. Step-up critical construction uses Monte Carlo; step-down NKA/NKB table construction does not require it. Interpolation recommendations and printed critical numbers are not certified numerical guarantees.                                                                                                                                                                                                        |

Einot–Gabriel p.576 also describes an unequal-size statistic using the square root
of the smaller sample size and cites external work for conservativeness. This pass
records that statement but does not promote it to an audited unequal-size guarantee
or substitute a Tukey–Kramer/Welch formula. The external proof is not read here.

### K.3. Investigator deductions, separated from the originals

1. The compound catalogue label APR-12 does not identify one executable method.
   Ryan's 1960 pairwise-level procedure, Einot–Gabriel's product allocation, Welsch's
   linear A/B allocations, range versus F statistics, and step-up versus step-down
   cannot be silently interchanged. Record them as variant-split/reopen candidates;
   do not add new catalogue entries or choose a default here.
2. For Ryan's span rule, the number of possible pairs in a homogeneous block of
   d samples is `d*(d-1)/2`. Multiplication by `2*alpha/(n*(d-1))` gives
   `alpha*d/n`. A union-budget argument sums these quantities to at most alpha.
   This arithmetic explains the allocation; it is not a proof that every plug-in
   statistic, unequal-size ordering or directional claim satisfies all required
   selection and monotonicity conditions.
3. For Welsch's B allocation, sums over non-singleton true-mean blocks are at
   most alpha because their sizes sum to at most t. For A, a block of size t-1
   leaves at most a singleton (zero Type I error budget); a block of size t
   exhausts the set; otherwise the linear argument applies. Hence both budgets
   satisfy the sum condition. This uses the theorem's model and monotone critical
   sequence; a list of uncorrected quantiles alone is not a complete procedure.
   Taking successive maxima of raw critical values would only reduce tail
   probabilities, but that is investigator reasoning, not an adopted algorithm
   or a claim that every printed table used that exact construction.
4. Under known scale, two widely separated blocks of two equal means give the
   NK limiting false-rejection probability `1-(1-alpha)**2`; at alpha=.05 it is
   .0975. This illustrates the source's strong-control failure mechanism without
   asserting the same equality at finite df or for every mean configuration.
   Singleton blocks do not contribute false equality rejections. Neither Keuls's
   historical F discussion nor a complete-null guarantee repairs this mechanism.
5. Rejection/retention or grouping output is not proof of equality, a unique
   disjoint clustering, adjusted-p values or a simultaneous interval contract.
   Ryan's constant-level interval construction is separate from his layer tests.
   No range critical value, interpolation tolerance, software default or published
   power ranking is adopted. Einot–Gabriel p.583 Section 2.7 and Welsch p.569
   explicitly limit what their simulated power comparisons establish.

### K.4. Printed inconsistencies and unresolved precision

**Keuls p.115:** the image prints `s_e^2 = 2983.03 : 12 = 124.29`, while the
same page derives 24 error degrees of freedom and p.116 uses 24. Direct arithmetic
is `2983.03/12 = 248.585833...`, whereas `2983.03/24 = 124.292916...`.
Thus the printed divisor and quotient are inconsistent; 24 is a plausible intended
divisor, not a formally confirmed erratum. Retain the print and do not reuse the
example as a numerical oracle. The p.116 `176.0 - 97.7 = 78.2` also differs from
the displayed operands and p.117's 78.3; no silent correction is applied.

**Einot–Gabriel p.576 (1.10):** the page image prints
`T_p^(2) = 2 * (T_p^(1))^2` for p=2. Direct substitution into the balanced
range definition (1.8) and sum-of-squares definition (1.9) instead gives
`T_2^(2) = (T_2^(1))^2 / 2`. For n=1, means 0 and 2, and s=1,
(1.8) squared is 4 and (1.9) is 2. This is an internal coefficient discrepancy,
not an adopted repair. The nearby prose about identical statistics on pairs does
not make complete range and F procedures identical because containing-set tests
still differ. The line on p.578 cites (1.10) for NK allocation and (1.12) for Ryan
allocation, while the allocation formulas are (1.11) and (1.13); use formula
content and page locators rather than silently correcting those cross-references.

These observations were checked on page images. No formal erratum search or
publisher correction confirmation was performed. The conflict record is part of
the result, not authority to replace source values. Before numerical reuse or
selection of a formula affected by these discrepancies, obtain independent
confirmation and a separate bounded adjudication. The historical source-status
classification can be researched without adopting the disputed example or (1.10).

### K.5. Reproducible author-side arithmetic diagnostic

This is exact rational arithmetic, not a range-distribution computation, simulation,
independent oracle, or numerical implementation test. It checks the allocation
bookkeeping and two-mean coefficient only. It does not establish either theorem.

```python
from fractions import Fraction as F


def partitions(n, least=1):
    if n == 0:
        yield ()
    for j in range(least, n + 1):
        for rest in partitions(n - j, j):
            yield (j,) + rest


count = 0
for t in range(2, 21):
    for part in partitions(t):
        count += 1
        a = sum(F(0) if d == 1 else F(1) if d >= t - 1
                else F(d, t) for d in part)
        b = sum(F(d, t) for d in part if d >= 2)
        assert a <= 1 and b <= 1
print("partitions checked:", count)
print("NK two-block limit:", 1 - (1 - F(1, 20))**2)
print("two-mean augmented-F/range-squared:", F(2, 4))
```

Observed output:

```text
partitions checked: 2712
NK two-block limit: 39/400
two-mean augmented-F/range-squared: 1/2
```

### K.6. Entry impact, candidate status and reopen conditions

| Entry                  | Evidence used now                                                                     | Author-side impact; classification unchanged                                                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| APR-10 / C-H1          | Fresh Keuls reading above; Newman author record C.3 reused; Einot–Gabriel Section 1.7 | Ordered-range construction and a direct later primary analysis of failure of strong control are supported. Keuls and Newman are not asserted to be byte-identical algorithms. RES-ONLY retained.                                                                               |
| APR-11 / C-H2          | Duncan author record C.3 reused; fresh Einot–Gabriel calibration comparison           | Preserve original pairwise-alpha protection-level interpretation. Rescaled Duncan in the 1975 comparison is a distinct calibration, not a contradiction of the existing conventional-FWER warning. RES-ONLY retained; no fresh Duncan audit.                                   |
| APR-12 / C-H3          | Fresh Ryan, Einot–Gabriel and Welsch readings above                                   | Named constructions and their different guarantee conditions are source-grounded. PARTIAL characterization: a single REGWQ implementation identity is not fixed, monotone critical construction and the intended model/output scope remain named questions. RES-ONLY retained. |
| APR-13 / APR-14 / C-H4 | Parts I/J, PR 201/203 and recorded scoped acceptance reused                           | No change to accepted bounded protected/modified LSD characterization or proof limitations. RES-ONLY retained.                                                                                                                                                                 |

**SR-H candidate disposition: PARTIAL, replacing INPUT_INCOMPLETE in this
successor only.** The formerly unread Keuls and Ryan/Einot–Gabriel/Welsch texts
are now inspected for the decision-bearing characterization above; Newman and
Duncan already have the explicitly reused C.3 source readings. This does not
claim that all six originals have undergone one independent review. Remaining
named gaps are the intended APR-12 variant boundary (including the treatment of
GAPA/GAPB as separate reopen candidates), exact monotonicity/selection conditions,
and resolution or explicit exclusion of the disputed numeric/formula material
before any affected use. Independent review is asked to assess this PARTIAL
proposal, not instructed to accept it.

Reopen/closure conditions: resolve the named characterization gaps against these
fixed originals and the prior Newman/Duncan evidence; inspect any external primary
proof required by a claim that is actually retained, rather than assuming a cited
proof has been audited. A full SR-H closure review must cover or explicitly reuse
Newman/Duncan as well as the four current originals and the fixed C-H4 pass. If
an essential retained claim needs an uninspected original, use INPUT_INCOMPLETE
for that gap instead of concealing it in PARTIAL. Unequal-variance generalization,
Type III guarantees, simultaneous outputs, numerical constants or production
algorithms would be new scope and require their own source work and review.

| Holds                                              | Candidate disposition                                                 |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| SR-B, SR-C, SR-G, SR-K, SR-L                       | CLOSED (existing candidate statuses; not five new formal acceptances) |
| SR-H                                               | PARTIAL (this author-side proposal)                                   |
| SR-A, SR-D, SR-E, SR-F, SR-I, SR-J, RSM-01, RSM-02 | INPUT_INCOMPLETE                                                      |

Candidate totals: 5 CLOSED / 1 PARTIAL / 8 INPUT_INCOMPLETE, 14 entries.
Overall INPUT_INCOMPLETE and semantic NARROW remain. No public-opening gate,
R4 source-access finding, adoption, implementation, merger or release is closed.

### K.7. Independent primary-source review handoff

Review only the new Part K at the exact PR head, preserving the 303208-byte
Parts A–J prefix. Supply originals 24, 25, 35 and 36 from K.1. Verify the source
statements, pinpoints, mathematical deductions, printed inconsistencies, budget
diagnostic and PARTIAL proposal; prioritize the all-containing-set requirement,
statistic/calibration variants, monotonicity and Type I versus Type III scope.
Reuse C.3 and Parts I/J only as disclosed historical evidence. Do not claim a
fresh reading or independent approval of Newman/Duncan or the other 31 originals.
If those are necessary to decide the whole-hold status, bound the verdict and name
that exact gap. Do not approve a specific REGWQ implementation by name alone.

Read repository instructions and the pinned commission; report separate source,
inference, disposition and independence findings. The author side here is OpenAI
assistance; record actual reviewer provenance and context separation without
exact-build-log demands or rewriting older PENDING statements. Save the English
review at `review-inputs/r3-srh-range-synthesis/REVIEW-RESULT.md` on a new neutral
branch from the fixed head, targeting this result branch in a draft PR. Run
format check, Markdown lint, direct validator and diff check, reporting actual
results and any access failures. No PDF, page image or full extraction enters Git.
Do not merge, formally accept SR-H, choose methods, open discussion or release.

RELEASE 3 PART K AUTHOR RANGE SYNTHESIS COMPLETE - INDEPENDENT REVIEW PENDING -
SR-H PARTIAL CANDIDATE - OVERALL INPUT_INCOMPLETE - NO METHOD ADOPTED

## Part L. Range-review precision repair and remaining primary-review scope

### L.1. Preserved input and independent review intake

Date: 2026-09-08. Continuing OpenAI-assisted author/coordinator; not an independent
reviewer. Preserve all 326756 bytes of Parts A–K at
`070e5dd569f0dfcb6f15ec49daebc0544af217d9`, result blob
`5ee739767f3b29db6a7628f092e26d9b909830c8`.

PR 206 supplies GO for Part K with zero BLOCKER, one SHOULD-FIX and five
NICE-TO-HAVE. Exact review: commit
`f1cbcca6e1ff06670d43d44bd38bf76a7a43833a`, sole parent equal to the input
above, tree `90b49522740540e35d3af8eb0bb8dacf133902b8`, review blob
`752b7a1e8b2f4c2d3c67dc59bea6c36e69b8ad59` (56183 bytes), path
`review-inputs/r3-srh-range-synthesis/REVIEW-RESULT.md`. Live PR metadata and
fetched commit, parent, tree and blob match. The reviewer supports the PARTIAL
candidate but expressly does not independently verify Newman/Duncan or formally
accept the hold. These distinctions and the original records remain preserved.

### L.2. S-K1: source statement versus general monotonicity inference

The K.3 item 3 caution is incomplete as a description of attribution. For the
**step-up** critical-number construction, Welsch (1977), printed p.569 Appendix A,
after (A.1), explicitly specifies replacing a newly computed `C_k` below
`C_(k-1)` by `C_(k-1)` to preserve the ordering. This is a source statement for
GAPA/GAPB, not merely investigator reasoning. The p.575 GAPA usage example at
`t=5`, `nu=20` prints 3.58, 3.97, 3.97 and 4.29 in increasing stretch order;
the repeated values illustrate the monotone sequence without certifying the
numbers or independently reconstructing their computation.

For **step-down NKA/NKB**, p.568 Theorem 2 requires a nondecreasing critical
sequence. The p.571 opening paragraph describes inverse interpolation as for
C2 and says Monte Carlo is unnecessary; it does not explicitly prescribe the
same replacement step for those tables. Do not transfer the Appendix A step-up
instruction to every step-down table as a printed historical fact.

The general statement that raising a critical value cannot increase its tail
probability remains investigator reasoning. No numerical table, production
monotonization rule, guarantee or implementation is adopted. S-K1 is addressed
on the author side by this additive clarification, pending independent repair
review. The page images were inspected in Part K's author pass; PR 206's source
confirmation is reused here. No new PDF reading or numerical recomputation is
claimed in this repair.

### L.3. Optional findings and independent-coverage gap

N-K1 through N-K5 remain optional and deferred at PR 206 Section 10. In
particular, N-K2's caution about Ryan's product expression does not enlarge K.3's
claim: the result uses only the sum-budget arithmetic, subject to the stated
selection and monotonicity limits, and does not adopt an independent-block
product guarantee for general plug-in statistics.

PR 206 Section 9 identifies a material distinction in the evidence inventory:
Newman and Duncan have prior author-side C.3 readings, but the cited independent
reviews do not verify those rows. This is independent-review coverage missing,
not a reversal of their already-recorded acquisition or author inspection. This
successor commissions the minimal missing primary review before treating the
entire SR-H PARTIAL candidate as independently covered for acceptance; it does
not accept those author readings as a substitute for independent verification.

| Original             | Expected bytes / PDF pages | SHA-256                                                            | Minimum printed-page scope                                                                                                |
| -------------------- | -------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `06_Newman_1939.pdf` | 1141066 / 12               | `2a95351862462f2165a4a2f82f16572eb4a0482afcea2772c590ade02e45e974` | pp.20–24, 27–28; C.3 row 06, independent scale and two-member range/t relation; preserve the existing p.28 df doubt       |
| `17_Duncan_1955.pdf` | 4442167 / 43               | `6504e0bd884850d639ea5e0a9b5794d3c02f7d3df5895e3ca64ced6face64bdf` | pp.5–7, 16, 28, 41; C.3 row 17, equal-precision model, protection levels, containing subsets and monotone critical ranges |

These identities are reused from C.2, not rehashed in this pass: neither PDF is
present in the current upload/source-intake directories. Request these two
already-collected originals for the review environment, not a new purchase or
new supplier count. If a required statement depends on another page in the same
original, inspect that page and report the additional coverage rather than
stopping at the minimum list. No wholesale rereview of the other originals is
commissioned.

### L.4. Disposition and combined review handoff

SR-H remains a PARTIAL candidate; its formal hold-level acceptance is pending.
Ledger 5 CLOSED / 1 PARTIAL / 8 INPUT_INCOMPLETE, overall INPUT_INCOMPLETE,
semantic NARROW, 35 originals, APR-10 through APR-14 RES-ONLY, the existing
C-H4 acceptance, and all other holds and R4 limitations are unchanged. S-K1's
repair does not resolve the APR-12 variant questions or the recorded print
conflicts. The latter still require independent confirmation and a separate
bounded adjudication before affected reuse.

On the exact successor head, perform two separately reported checks:

1. Close-only review of L.2 against PR 206 Section 10 and the unchanged K.3;
   explicitly reuse the completed Welsch primary inspection. Original 25 is not
   required again unless a new source question arises. Verify the 326756-byte
   prefix and the unchanged scope and dispositions.
2. Primary-source completion for C.3 rows 06/17 and their K.6 reuse, using the
   two originals above. Verify actual assumptions, procedure, error criterion,
   degrees of freedom, source versus inference and existing doubts. Assess
   whether the combined fixed evidence supports the whole-hold PARTIAL proposal;
   do not infer CLOSED or a unique APR-12 method. Keep each conclusion separate
   if only one check can be completed. Missing originals yield an explicit
   SOURCE_ACCESS_INCOMPLETE for the affected source scope, not a source-content GO.

Read AGENTS.md and the Read first/local instructions; retain K.1's fixed
commission and semantic inputs. Save one English review at
`review-inputs/r3-srh-range-completion/REVIEW-RESULT.md` on an unused neutral
branch from the exact successor head; open a draft PR targeting this result
branch. Report source inspections, reused evidence, findings, independence and
actual format/Markdown-lint/direct-validator/diff checks separately. Author-side
assistance is OpenAI; disclose actual reviewer model/context evidence, without
exact-build-log demands, unsupported claims about different human participants,
or historical PENDING edits. No PDFs, images or full extractions enter Git.
Do not merge, accept a hold, adopt a method, open discussion or release.

RELEASE 3 PART L PRECISION REPAIR RECORDED - INDEPENDENT REPAIR AND TWO-SOURCE
COMPLETION PENDING - SR-H PARTIAL CANDIDATE - OVERALL INPUT_INCOMPLETE

## Part M — Adversarial review follow-up and monotonicity source conflict

### M.1. Fixed evidence and author role

This additive successor preserves all 334121 bytes of Parts A–L at PR 207 head
`044078d3b19ff3307dc347b0b9e7ecbbed1750c6`, result blob
`ff2ee8c3ca08b57ecc62c143a46153b02bcd04f7`. The continuing author/coordinator
uses OpenAI assistance; this is not an independent review or a new steward
approval. Date: 2026-09-08.

PR 212 supplies the adversarial review at commit
`ec0840c0ae20d71fbca715cf1e41880f3b09a20a`, sole parent equal to that input,
tree `79272100bbf9a693bd864c43a01da63568f2fa9b`, review blob
`2d1dd72a904d8097d40eafadd9b7dcc19df22ab9` (103533 bytes), path
`review-inputs/r3-srh-cross-cutting-adversarial/REVIEW-RESULT.md`.
Its overall finding supports the PARTIAL candidate with S-X1 outstanding;
it is not unconditional GO. Six originals were inspected there; Newman was
SOURCE_ACCESS_INCOMPLETE for that pass. The reviewer read the four earlier
reviews before the originals and disclosed the same review-side model family.
These limitations remain part of the evidence.

### M.2. S-X1: printed monotonicity and the uninspected proof pointer

**Source statement.** Einot and Gabriel (1975), supplier 24, printed p.576,
Section 1.4, gives critical values for methods using the same statistic and
then states `zeta_p^M < zeta_r^M if p < r` in (1.16). It refers to
`[9, Sec. 9]` for the proof. The paragraph follows (1.15), in the same section
as allocations (1.11)–(1.13). This statement was missing from K.2/K.4 and the
monotonicity-gap account. PR 212 Sections 5.3/9 confirmed it on the page image;
the author has now also checked the previously saved p.576 image. Reference
[9]'s proof has not been inspected in this work. No condition from that proof,
or formal erratum, is asserted.

**Diagnostic conflict.** PR 212 Section 6.6 and its script
`review-inputs/r3-srh-cross-cutting-adversarial/scripts/critical_sequence_monotonicity.py`
(blob `c9424d55d80ed5ea68c02e61a4255e9684356980` at the review commit)
compute raw upper-tail Studentized-range quantiles before any monotonicity
enforcement. The grid is alpha in {.01, .05}, total group count in
{3, 4, 5, 6, 8, 10, 12, 15, 20}, and error df in {3, 5, 10, 20, 60, infinity}.
The review reports no decrease for the constant-alpha Newman–Keuls allocation
on that grid, but decreases for the paper's Ryan and rescaled-Duncan allocations
at small df, and for Welsch A including infinite df. These are finite-grid
observations, not universal parameter thresholds or verified quantile bounds.
Welsch A is a later allocation and is not presented as an allocation printed
in the 1975 paper.

Representative decreases, all at alpha = .05, are recorded below. Here k is
total group count, p is subset size, and gamma_p is upper-tail probability.

| Allocation                                                                  | k   | Error df | Adjacent subset sizes | Raw quantiles, approximately |
| --------------------------------------------------------------------------- | --- | -------- | --------------------- | ---------------------------- |
| Einot–Gabriel Ryan (1.13), `gamma_p = 1-(1-alpha)^(p/k)`                    | 8   | 3        | 6 to 7                | 8.91186585 > 8.89435083      |
| Einot–Gabriel rescaled Duncan (1.12), `gamma_p = 1-(1-alpha)^((p-1)/(k-1))` | 4   | 3        | 3 to 4                | 6.86866438 > 6.82452645      |
| Welsch A, `gamma_p = alpha*p/k`, except `gamma_(k-1) = gamma_k = alpha`     | 6   | 20       | 4 to 5                | 4.23450864 > 4.23185675      |
| Welsch A, same allocation                                                   | 8   | infinity | 6 to 7                | 4.17130447 > 4.16955416      |

The author reproduced these four pairs with SciPy 1.17.0 using
`studentized_range.ppf(1-gamma_p, p, nu)`. This is a limited author-side check
using the same numerical library family as the review, not an independent
oracle or a rerun of its full grid. The second pair makes explicit the small-df
rescaled-Duncan observation. The Welsch examples agree with Section 6.6's
examples; that section's aggregate wording is not adopted as an exhaustive
threshold description (it also gives a k = 6 example). No numerical error
certificate is claimed for these floating-point values.

**Interpretation and affected-use boundary.** The diagnostics challenge an
unqualified reading of (1.16) for the raw range quantiles of the paper's own
allocations. The printed claim, the external proof pointer, and the diagnostic
counterexamples are preserved separately. The missing-proof conditions and
appropriate family characterization remain unresolved. The failure of a raw
sequence to be nondecreasing means Welsch's nondecreasing-sequence theorem
hypothesis cannot simply be assumed; it does not by itself prove that the
whole procedure exceeds its error budget. Nor does the absence of a printed
NKA/NKB enforcement step authorize inventing one. L.2's step-up attribution
remains intact. Add (1.16) and its proof dependency to the monotonicity reopen
list before any affected characterization, algorithm or table reuse. No max
rule, replacement critical value, numerical tolerance or procedure is adopted.

### M.3. Evidence precision and retained observations

PR 212 lists N-X1 through N-X8, eight identifiers, although its heading says
seven NICE-TO-HAVE. This intake uses the identifiers without rewriting that
review. N-X1 supplies page-image support for PR 211 A-N1's previously unverified
"after (A.1)" locator. N-X2/N-X3's additional Keuls/Welsch numerical observations
remain attributed to PR 212 Sections 6.5/9 and deferred; they are not new author
source checks, certified replacement values or formal errata.

N-X4: Hayter page-level inspection is PR 201; PR 203 reviewed the additive
repair and explicitly did not reread the PDF. Continuation Section 17's
combined "PR 201/203" reference is read with those separate roles.
N-X5: the commission's explicit multiple-variant instruction occurs in the
RSM-02 paragraph. For SR-H, the general Hold dispositions definition of PARTIAL
(supported claims with named gaps) is the basis. The RSM-02 sentence is not
asserted as a general SR-H rule, and multiple names alone do not establish a gap.
The unresolved APR-12 family characterization and applicability of the
monotonicity/selection conditions are the substantive gaps here.

N-X6: Git verifies artifact identity and commit order; model/session evidence
and non-involvement statements are ordinary testimony, not facts proved by a
Git name or timestamp. N-X7: the continuation record documents limited SR-C
acceptance in Section 12 and limited SR-B acceptance in Section 14; SR-K/SR-G
remain separate, SR-L is inherited without a new acceptance here. The candidate
count of five CLOSED is not a count of five formal acceptances.
N-X8: the recorded numerical print conflicts gate affected numerical reuse;
they are not, by themselves, a reason the source-acquisition hold cannot close.
The substantive SR-H gaps above remain. No prior result/review is overwritten.

Newman remains covered by PR 211 Section 8 at
`a5e921c07ea2ab4f0147864fd2323f607512ef0d`, review blob
`63ee9079012cf7fa2e3a3b909ef294538a99c70b`. This is explicit reuse of its scoped
page inspection, not a claim PR 212 or this author pass reread Newman. The later
pass's missing attachment does not erase that earlier evidence. No new source
question about Newman was raised that requires another copy for this repair.

### M.4. Status and bounded repair review commission

S-X1 is addressed on the author side, pending independent close-only review.
Review M.2 against Einot–Gabriel p.576, PR 212 Sections 5.3/6.6/9 and the pinned
script; check M.3's attribution corrections against the cited records and actual
commission. Verify the 334121-byte prefix, unchanged ledger, and the separation
of raw-quantile diagnostics from theorem or procedure guarantees. The four-pair
check may be reproduced; a full grid rerun is unnecessary unless a concrete
mismatch requires it. Do not use the review's rounded grid summary as a theorem.

Required original: only supplier 24, `24_Einot_1975.pdf`, 1211995 bytes,
11 PDF pages, SHA-256
`1b097f5cdf16785e0aebf9c29359b957beb94caf51bb46255eaceb3d841cd57b`.
Reuse existing reviews explicitly for the other source observations. If a new
source question requires more material, identify only that dependency and keep
unaffected checks separate. Output an English record at
`review-inputs/r3-srh-monotonicity-repair/REVIEW-RESULT.md` from the fixed
successor head on an unused neutral branch, with a separate draft PR targeting
this author branch. Do not modify the input, prior reviews or main.

Candidate ledger remains 5 CLOSED / 1 PARTIAL / 8 INPUT_INCOMPLETE; SR-H remains
PARTIAL candidate, formal acceptance pending. Overall INPUT_INCOMPLETE,
SOURCE_SET_READY false, semantic NARROW, APR-10–14 RES-ONLY, 35 originals.
Continuation Section 17 at `a0db221edec78377d867bf0f4636d684d44dc5af`, blob
`ea44c75032d12c5c635459129972ccf71ae73134`, still contains proposals, not enacted
Parts K/L independence or hold acceptance. No merge, adoption, R4 closure,
public opening, website publication or release follows from this supplement.

## Part N — Repair-review intake and seven additional source receipts

### N.1. Fixed review completion and provenance

Date: 2026-09-08. This continuing OpenAI-assisted author/coordinator appends
custody and review-intake information only. All 343401 bytes of Parts A–M at
PR 213 head `f7ab321477bbb4f6decefbf931615ff6966e9e6e`, result blob
`18e18eb1900f3560b752c336addf2c88bd1ff616`, are preserved. This is not a new
independent source review or a steward approval.

PR 214 records S-X1 CLOSED as an additive author-side repair, zero BLOCKER,
zero SHOULD-FIX and five optional findings. Review commit:
`c9389daf5c8b33dc769ff962e43ea392fe85ef86`; sole parent equals the Part M
head; tree `5193981144710d5b35af020a137c5f6b3fe51706`; blob
`473baa22eee31251998e82ea3e647d4c5a58a8df` (57700 bytes); path
`review-inputs/r3-srh-monotonicity-repair/REVIEW-RESULT.md`. Live metadata and
fetched Git objects match. The review's PDF checks, four-pair reproduction,
mpmath sanity check and Welsch-A grid rerun are reused, not claimed as new
coordinator executions. The remaining proof/variant gap is not closed.

PR 214 discloses prior-review reading before its page inspection (not blind),
non-involvement in the authoring or earlier reviews, and claude-fable-5-1 service
testimony. This intake preserves that evidence without determining Parts K/L
model independence or hold acceptance on the steward's behalf. Earlier PENDING
and proposal records remain historical and unmodified.

### N.2. Optional findings retained with exact review attribution

PR 214 Section 10 is the basis of these notes; no additional source reading or
calculation is claimed:

- N-M1 identifies Einot-Gabriel reference [9] from p.583 as Gabriel, K. R.
  (1964), "A Procedure for Testing the Homogeneity of All Sets of Means in
  Analysis of Variance," Biometrics 20:459–477. Its Section 9 proof remains
  uninspected. This is a bibliographic reopen target, not an inspected new source
  and not one of the seven receipts below.
- N-M2 confirms that (1.16) and its [9, Section 9] dependency are already in the
  monotonicity reopen scope. The imperative wording in M.2 does not leave a
  second, unperformed administrative task.
- N-M3 provides the finer locator: second paragraph after (1.15), immediately
  before the Section 1.5 heading. The author reuses that page observation.
- N-M4 offers the counting reconciliation for PR 212: seven new optional
  findings plus reopened N-X1 give eight identifiers. M.3's eight-versus-seven
  observation is not an assertion of an additional scientific defect.
- N-M5 notes that the grid has six allocations whereas M.2 summarizes four;
  Ryan (1.13-prime)/Welsch B and Duncan-original are the other two. No omitted
  row is silently claimed to be monotone or independently recalculated here.

These notes do not change the fixed reviewed Part M or its numerical meaning.

### N.3. Consolidated custody of seven additions

The intake records are continuation Sections 18/19 at commit
`b405512111699f262440d0b819dfa0977ad7b72a`, blob
`f7497cbee7d7a9701ffe1cd8b06f9bed014c04b0`, path
`governance/drafts/research-continuation-2026-09-07.md`.
The coordinator previously computed hashes/bytes, counted PDF pages and inspected
first-page images. This table reuses those recorded checks instead of reacquiring
or rereading the same files. It is not full-text or theorem review.

| Supplier file            | Bytes   | PDF pages | SHA-256                                                            |
| ------------------------ | ------- | --------- | ------------------------------------------------------------------ |
| `34_Games_1976.pdf`      | 994128  | 13        | `eee42d00cdd66f9f24e334c2db503e17233fc73b6a87ed5f85c6868f17a2c021` |
| `37_Hochberg_1974.pdf`   | 561598  | 11        | `4eebb9ab9e4e7c133bdc7bff7130dda98b762e498cca0ce1738680be2bb539b4` |
| `39_Ge_2003.pdf`         | 3452172 | 77        | `abe8095de12b3499f863c3e5aced94a90812f0732d80423374eadafdc20a7f68` |
| `40_Bretz_2009.pdf`      | 439933  | 19        | `87041fa4b4d17e6a2832536d586cc26b253422255df59cd00a86344f6b0a5664` |
| `41_Dmitrienko_2003.pdf` | 106251  | 14        | `c1df1453c5001cfeae4bd3d52d31e46f7248cd7b3524ec7d46e2d47ef0a07ed4` |
| `42_Dunnett_1991.pdf`    | 634124  | 9         | `ed93660e9e8286f1ff2e0026f972c783ac523ac96465e1689e17b4f99a960161` |
| `43_Wiens_2003.pdf`      | 120883  | 5         | `f9634c824d637b2f1e262d226c8bd3d7d01f540501facdaead9c1e802eed5bd7` |

| Supplier | Bibliographic identity from receipt                                                                                                                                                                    | Research routing, not acceptance                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| 34       | Games and Howell (1976), Pairwise Multiple Comparison Procedures with Unequal N's and/or Variances: A Monte Carlo Study; Journal of Educational Statistics 1(2):113–125                                | SRC-20 / SR-I / HET-01                                          |
| 37       | Hochberg (1974), Some Generalizations of the T-Method in Simultaneous Inference; Journal of Multivariate Analysis 4:224–234                                                                            | SRC-36 / SR-F / APR-05                                          |
| 39       | Ge, Dudoit and Speed (2003), Resampling-based Multiple Testing for Microarray Data Analysis; TEST 12(1), supplied pagination 1–77                                                                      | RSM-02 variant research; proposed supplemental RSM-01 relevance |
| 40       | Bretz, Maurer, Brannath and Posch (2009), A graphical approach to sequentially rejective multiple test procedures; Statistics in Medicine 28:586–604; DOI 10.1002/sim.3495                             | SRC-26 / SR-D / CLS-06                                          |
| 41       | Dmitrienko, Offen and Westfall (2003), Gatekeeping strategies for clinical trials that do not require all primary effects to be significant; Statistics in Medicine 22:2387–2400; DOI 10.1002/sim.1526 | SRC-27 / SR-D / CLS-05                                          |
| 42       | Dunnett and Tamhane (1991), Step-Down Multiple Tests for Comparing Treatments with a Control in Unbalanced One-Way Layouts; Statistics in Medicine 10:939–947                                          | SRC-28 / SR-J / MTO-02                                          |
| 43       | Wiens (2003), A fixed sequence Bonferroni procedure for testing multiple endpoints; Pharmaceutical Statistics 2:211–215; printed DOI 10.1002/pst.064                                                   | SRC-27 / SR-D / CLS-03                                          |

Supplier numbers and SRC identifiers are different systems. Ge's 77-page file
includes discussion and a rejoinder beginning at printed/PDF p.66; its entire
pagination is not attributed to the authors' main article. Bretz's first page
records online publication in December 2008 and issue year 2009. Wiens's printed
DOI retains the zero omitted in the acquisition checklist. The Dunnett-Tamhane
1991 step-down paper does not supply the separate 1992 step-up text. These
bibliographic boundaries remain as recorded at intake.

The previous 35 artifacts plus these seven distinct recorded hashes total 42:
supplier 01–37 and 39–43. Repeated 01–03 bytes from Pass 2 are not added again.
Historical 35-original statements remain valid for their fixed snapshots; 42 is
the current received inventory, not an independent-review count.

### N.4. Unavailable sources and next substantive work

The user reports supplier 38 (Naik 1975), 44 (Scheffe 1959), 45 (Tukey collected
works volume VIII) and 46 (Westfall-Young 1993) unavailable through their
acquisition effort. Their respective affected scopes are SR-J, SR-A, SR-E and
RSM-01, as recorded in continuation Section 19. No finding about all possible
access routes, unread source contents or a substitute's sufficiency follows.
Supplier 47's outcome is not reported. Required missing-source claims remain
INPUT_INCOMPLETE under the current commission; related papers do not silently
replace assigned texts.

The next content work is SR-F (37 with received 23/32 and any remaining assigned
dependencies), then SR-I (34 with its companions), followed by available SR-D
texts (15/40/41/43). Supplier 42 supports a bounded SR-J investigation while
Naik remains missing; supplier 39 needs separate main-text/discussion/variant
mapping. Source inspection, derivation and an exact-head independent review are
still required for new substantive results. No additional review is commissioned
solely to repeat this custody transcription. Any later substantive commission
will include its executable prompt and necessary original attachments.

For unavailable items, first identify the unsupported claim and minimum needed
pages. If required, prepare a documented alternate-primary-basis or reduced-scope
proposal for the steward; do not change the commission or waive an input here.
The Gabriel 1964 proof dependency is a separate reopen target, not silently
classified as one of the four reported unavailable items.

Candidate ledger remains 5 CLOSED / 1 PARTIAL / 8 INPUT_INCOMPLETE, SR-H PARTIAL
candidate with formal acceptance pending; overall INPUT_INCOMPLETE,
SOURCE_SET_READY false, semantic NARROW and method classifications unchanged.
Continuation Section 17's bounded acceptance and independence proposals remain
unenacted. No merge, hold closure, method adoption, R4 closure, public opening,
website publication or release is enacted by this intake.

## Part O — SR-F primary-source research and correction dependency (2026-09-08)

### O.1 Fixed input, custody and inspection

This is continuing author-side research with OpenAI assistant support, not an
independent review or a steward acceptance. It appends to PR #215 head
`1da537aba29bed6bf65efc1a6e97ebdc2b1f6725`, result blob
`60e680aefe64969b29a255ba62cfe47a92345463` (353310 bytes; SHA-256
`07b9dd6d3473170e82bf95606dcc974a2f17920a74c9f28101e94334797ba2b7`).
All Parts A–N bytes are preserved. The commission remains at
`f39100161cb45de15767bdb19ed54aba9489b41a`, blob
`3c7ddcc696f0c284213f7efe0da68e747bc238d7`; the fixed semantic result remains at
`7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob
`8f21526040924b891f64724c2d0fde9ea94eff92`.

Saved custody identities were checked before reinspection. These are existing
receipts, not three additional papers:

| Supplier | Source                                                       |   Bytes | PDF pages | SHA-256                                                            |
| -------- | ------------------------------------------------------------ | ------: | --------: | ------------------------------------------------------------------ |
| 37       | Hochberg (1974), Journal of Multivariate Analysis 4, 224–234 |  561598 |        11 | `4eebb9ab9e4e7c133bdc7bff7130dda98b762e498cca0ce1738680be2bb539b4` |
| 23       | Genizi–Hochberg (1978), JASA 73, 879–884                     | 1123267 |         7 | `21938051d7bcfd1d56babe21280976d3918b69d8ffdff4ec646c18ed3b6fe2b0` |
| 32       | Stoline (1981), The American Statistician 35, 134–141        |  910960 |         9 | `65c2ce23d2dc5adb105af5d07f6060ebc4c07c9b908dc71256abcc2b64665cb4` |

The supplied local PDFs matched these hashes, byte counts and page counts. The
last two include a publisher cover. Complete extracted text was read for all
three. Decision-bearing page images were inspected for Hochberg pp.225–226 and
228–229; Genizi–Hochberg pp.879–883; Stoline pp.136–137 and 140. Other pages were
read as extraction only, not claimed as image-verified. PDFs, extracts and images
remain outside Git. Inspection date: 2026-09-08.

### O.2 Claim-to-source results

| Claim        | Direct primary-source support                                                                                                                                                                                                                                                                                            | Boundary                                                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C-F1; APR-05 | Hochberg pp.225–226 defines normal estimators with covariance `sigma^2 B`, known `B`, and an independent chi-square scale estimator. Theorem 3.1, pp.228–229, gives simultaneous all-contrast coverage at least `1-alpha`; (3.2) gives its pairwise event with Studentized maximum modulus (SMM).                        | This is a common unknown scalar variance with known covariance shape. Unequal estimator variances do not permit arbitrary unknown population variances. The pairwise differences can be dependent.                 |
| C-F2; APR-06 | Genizi–Hochberg p.879 (1.4)–(1.5) defines `T(Q)` with `QQ'=B`, using Studentized augmented range (SAR). P.880 (1.6) gives the contrast-preserving restriction `Q1=lambda*1`, `lambda>0`, with Studentized range (SR). Pp.881–883, Sections 3/3.1/3.2, give the two-sample-size construction and its comparison criteria. | The Section 3 optimum is conditional on two explicit restrictions. The reported average-width advantage over GT2 is not pointwise dominance or a theorem for all imbalance. A correction dependency remains (O.4). |
| C-F3         | Stoline pp.136–137 compares TK, GT2, T-prime and GH, reports the 1979 retraction, and limits GH to two distinct sample sizes. P.140 identifies the corrigendum.                                                                                                                                                          | This is the paper's historical assessment. Its contemporary TK conjecture and recommendations are not substituted for later proof or Protocol adoption.                                                            |

**Source facts about outputs and variants.** For GT2 let `r=k(k-1)/2` and
`d_ij=b_ii+b_jj-2*b_ij`. Write `m(r,nu,alpha)` for the upper-alpha SMM critical
value in the source's convention. The pairwise half-width in (3.2) is
`s*sqrt(d_ij)*m(r,nu,alpha)`. The target is all pairwise differences, extended to
all contrasts by (3.1); the source gives intervals, not a stepwise rejection
ordering. It requires neither a selected subset nor sorted observed means.

For GH, distinguish all-linear-function `T(Q)` using SAR from contrast-only
`T_c(Q)` using SR. In Section 3, `m1` treatments have size `n1`, the other `m2`
have size `n2`, and `n1>n2`. The optimization preserves minimum within-size-group
pairwise widths and equal widths for all cross-size-group pairs, then minimizes
the latter. P.882 reports a computer search over `3 <= m1+m2 <= 10` and
`b=n1/n2=1.1(.1)25`; the optimizing matrices observed in that search were
contrast-preserving. This observation does not prove a universal CSP optimizer.
Section 2.6 explicitly labels the broader optimality proposition a conjecture.
The within-group `T(Q)` intervals coincide with the corresponding `T(D_a)`
intervals under those restrictions; using SR for `T_c(Q)` rather than SAR further
changes the comparison. The paper supports no-longer pairwise intervals than
`T(D_a)` in this stated construction, with strict improvement for some pairs.

Stoline p.137 reverses the sample-size indexing: its first block has the smaller
size `n`, the other `n*u`. Do not copy GH table indices into that notation without
mapping the groups. Stoline's wider optimality wording and report of an
unpublished Felzenbaum–Hochberg proof are not direct inspection of that proof.
The foundational Hochberg (1975), JRSS B 37, 426–433, is cited by these papers;
it was not inspected here. No claim is made about its full proof or every GT3
variant. It is a conditional follow-up if a later claim needs more than the
explicit constructions and author derivations recorded here.

### O.3 Author derivation and numerical diagnostic

These are investigator derivations, separate from the preceding source facts.
For a nonzero contrast `c`, put `A=sum(c_i for c_i>0)=sum(abs(c_i))/2`.
Then `c'e = sum(c_i*(-c_j)*(e_i-e_j), i positive, j negative)/A`.
The triangle inequality on the simultaneous pairwise event gives precisely the
weighted half-width of (3.1). The zero contrast is identically zero and does not
use the division by `A`. For positive difference variances, inverting these
intervals gives a single-step strong-FWER bound under the same model, since any
false rejection of a true pairwise equality lies outside that simultaneous
coverage event. This does not create an adopted hypothesis-testing interface.

The reference SMM variates have independent standard-normal numerators and one
shared independent scale `S=sqrt(chi_square_nu/nu)`. Their CDF is
`E[(2*Phi(c*S)-1)^r]`. It is not the maximum of independent Student t variables,
and it is not Studentized range. This identity supplies a research calculation,
not a numerical accuracy certificate or Protocol kernel. The all-contrast
interpretation of `T_c(Q)` likewise follows by putting `e=QZ` and observing that
`Q'c` is a contrast when `Q1=lambda*1`; SR bounds its linear form by half its L1
norm. General linear forms instead require the augmented range bound. These
arguments do not prove the optimum over all choices of `Q`.

The following diagnostic was run with Python 3.12.13 and SciPy 1.17.0. The
chi-square mixture integration and SR implementation are distinct formulas in
one library ecosystem, not independent implementation validation. The `r=1`
comparison is a useful distribution check, not proof of accuracy for all inputs.
Printed inputs are deliberately retained in the final two lines.

```python
import math
from scipy.integrate import quad
from scipy.optimize import brentq
from scipy.special import erf
from scipy.stats import chi2, studentized_range, t


def smm_cdf(c, r, nu):
    return quad(
        lambda x: erf(c * math.sqrt(x / nu) / math.sqrt(2)) ** r
        * chi2.pdf(x, nu),
        0,
        math.inf,
        epsabs=1e-11,
        epsrel=1e-11,
    )[0]


m = brentq(lambda c: smm_cdf(c, 3, 30) - .9, 1, 4, xtol=1e-12)
q = studentized_range.ppf(.9, 3, 30)
a = 2.207 * math.sqrt(1 / 17 + 1 / 8)
b = 2.207 * math.sqrt(2 / 8)
c = 3.017 * 1.3157 / math.sqrt(17)
d = 3.017 / math.sqrt(8)
print(format(m, '.12f'), format(q, '.12f'))
print(format(brentq(lambda c: smm_cdf(c, 1, 30) - .9, 1, 4)
             - t.ppf(.95, 30), '.3g'))
print(*[round(x, 9) for x in (a, a, b, (2*a+b)/3)])
print(*[round(x, 9) for x in (c, c, d, (2*c+d)/3)])
```

Observed numerical values:

```text
2.206681092596 3.017233892894
1.13e-14
0.946243444 0.946243444 1.1035 0.998662296
0.962737136 0.962737136 1.066670579 0.997381617
```

These reproduce the rounded critical values 2.207 and 3.017 and the p.883
example's half-widths. Its GH cross-group half-widths are larger than GT2's,
while its same-size half-width is smaller. The printed average 0.9986 for GT2
is not ordinary four-place rounding of either the printed four-place component
values or these reconstructed values (both round to 0.9987); it is retained,
not silently corrected. The displayed averages are half-widths even though the
paragraph calls them interval lengths. Doubling both means leaves the ordering
unchanged. No table-wide reproduction or claimed erratum follows from this check.

### O.4 Material conflicts and remaining source dependency

1. **Coverage sign.** Genizi–Hochberg p.880 (1.7) prints equality to `1-alpha`
   while calling GT2 conservative. Hochberg pp.228–229 states at least coverage
   and prints `>=` in (3.2). Both images were checked. Use the latter bounded
   characterization for APR-05; do not infer generic exact coverage from (1.7).
   This is an observed cross-source discrepancy, not a claim about a published
   correction of that sign.
2. **Kramer assertion and corrigendum.** Genizi–Hochberg p.879 claims that
   Kramer's procedure does not control the experimentwise error; p.882 calls it
   inappropriate based on the preceding comparison. Stoline p.136 explicitly
   reports that the nonconservatism statement was retracted in 1979. Its p.140
   bibliography identifies Genizi–Hochberg (1979), Corrigenda, JASA 74, 744.
   Inspection of the primary corrigendum is still missing. We do not infer its
   precise replacement language or whether it also addresses (1.7).
3. **Class optimality is not coverage impossibility.** Nonattainment of the
   smallest widths within `T(Q)` does not prove that another procedure lacks
   coverage. That logical distinction is investigator analysis. The historical
   negative Kramer claim is not accepted as evidence against modern TK coverage.
4. **Optimality and numerical scope.** The explicit constraints, the finite
   optimization search, the broader CSP conjecture and the average-width table
   are separate evidence types. A general optimizer, certified SMM/SAR critical
   values, table constants, or universal dominance would require additional
   analysis and independent numerical review. None is selected here.

Acquisition log for the newly identified correction: on 2026-09-08, web search
located the archival issue listing
<https://www.jstor.org/stable/i314251>, identifying the authors, title, p.744 and
<https://doi.org/10.2307/2287029>. Opening the item
<https://www.jstor.org/stable/2287029> returned a non-retryable access error.
A second search did not supply the correction text. The issue metadata is
bibliographic evidence only; no correction PDF was acquired, hashed or read.
This newly identified dependency has no assigned supplier number and does not
change the received total of 42. It is distinct from unavailable 38/44/45/46.

### O.5 Disposition and forward work

**SR-F remains `INPUT_INCOMPLETE`.** C-F1 now has direct construction/coverage
support with the stated narrowing; C-F2 has substantial construction and
comparison support; C-F3 has direct historical-status support. But the material
1979 correction text has not been inspected. The commission's required-source
rule is applied rather than turning three assigned papers read into automatic
`CLOSED`. No independent review of this Part O has yet occurred.

| Entry  | Effect of this research                                                                                                              | Retained classification |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| APR-05 | GT2 model, interval target and at-least coverage characterized; generic exact-coverage reading excluded                              | `RES-ONLY`              |
| APR-06 | Two-size, constrained construction and width comparison characterized; correction and any broader optimality claim remain unresolved | `RES-ONLY`              |

The remaining ledger is inherited unchanged: SR-B/C/G/K/L `CLOSED` candidates,
SR-H `PARTIAL`, and SR-A/D/E/I/J plus RSM-01/02 `INPUT_INCOMPLETE`. With SR-F,
that is **5 CLOSED / 1 PARTIAL / 8 INPUT_INCOMPLETE**, not a formal acceptance
inventory. Overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY` false, `NARROW`, all
previous classifications, old `PENDING` records and the 42-paper receipt count
remain unchanged. No merge, hold acceptance, method adoption, public discussion,
publication, R4 closure or release occurs.

Unavailable papers do not halt independent work: SR-I can use the received
Games–Howell, Tamhane and Dunnett sources; SR-D can examine the received graphical,
fallback and gatekeeping papers with missing texts named; SR-J can inspect
Dunnett–Tamhane/Hsu while keeping Naik unavailable; Ge does not silently replace
Westfall–Young for RSM-01. SR-A/SR-E historical attribution gaps also remain
explicit. This is sequencing, not a commission amendment.

### O.6 Additional research and independent review instructions

Use the draft PR's fixed full head and result blob, bytes and SHA-256 from its
body as the review input; check the live head first and stop identity-dependent
claims if it has moved. Read AGENTS.md and its ordered Read first documents,
applicable local instructions, the fixed commission and semantic input in O.1,
then Parts N/O. Remain a separate investigator, disclose prior involvement,
context and model evidence, and distinguish testimony from Git verification.
Do not request exact-build logs or treat a new authoring session as independent.

Supply originals 37, 23 and 32 with the O.1 hashes. The minimum **additional
research** input is Genizi–Hochberg (1979), Corrigenda, JASA 74(367), p.744,
DOI `10.2307/2287029`. Read the actual correction image, record hash/bytes/page
count and exact scope, and compare it with the 1978 p.879/p.882 assertions and
p.880 (1.7). Do not infer the correction's contents from Stoline's report. If
unavailable, record `SOURCE_ACCESS_INCOMPLETE` for this portion and a concrete
remaining acquisition request; do not repeat broad searches indefinitely.

Independently check C-F1/F2/F3 and O.2–O.4 against page images, including model,
shared-scale SMM versus SR/SAR, all-contrast extension, two-size constraints,
CSP conjecture versus finite search, reversed group indexing, at-least versus
exact coverage, and half-width/rounding observations. Reproduce O.3 and check the
mixture CDF by a separate justified numerical route if making precision claims.
An independent research result may propose a narrowed `PARTIAL` or `CLOSED`
only by mapping every decision-bearing claim and remaining gap to the commission;
ordinary content GO does not itself close SR-F. No new implementation or universal
optimality claim is requested. Escalate Hochberg (1975) only if a specific required
claim cannot be verified from the supplied primary text and an explicit derivation.

Preserve Parts A–O and all old reviews. Add an English report at
`review-inputs/r3-srf-primary-research/REVIEW-RESULT.md` on a new neutral branch
`review/r3-srf-primary-research-20260908` if unused, otherwise a new dated suffix.
Use the fixed author head as sole parent and its branch as draft PR base. Record
identity, inspected/uninspected pages, reused evidence, source facts versus
inferences, findings by severity, per-claim disposition, and limits. Keep PDFs,
images and extracts outside Git. Run `pnpm format:check`, `pnpm lint:markdown`,
`node --import tsx tooling/src/validate.ts`, and `git diff --check`; distinguish
actual checks from reused results. Report final commit/parent/tree/blob and live
head stability. Do not merge, change formal holds, adopt a method or release.

## Part P — SR-F review intake and corrective addendum (2026-09-08)

### P.1 Fixed evidence and role

This is continuing OpenAI-assisted author work, not an independent review or a
steward decision. It appends to PR #216 head
`4ce988231330f5702a7d3d8a352b01fac575191f`, result blob
`78feb17baba67d41d0aac274c51e2f12b507a6d3` (370999 bytes; SHA-256
`543a4c14b6e0d4fea809c6935a7bc69f08019467283edc9141f8dd1856c48596`).
All Parts A–O bytes, including the error corrected below, are preserved.

Independent review PR #220 is pinned at commit
`ca88a1550165dc9b2f5f16541e91d92d1c79ef82`, sole parent the above author head,
tree `4a4e44e7ee519d9cb3e64a5307807a923a6e5b05`. Its record is
`review-inputs/r3-srf-primary-research/REVIEW-RESULT.md`, blob
`55fe509ed5a87b263e26d0145983f1caa3d2912f` (55123 bytes; SHA-256
`cd819183d13ea970893d066e39c3c9e65482e3845f0fd076f61fdabd55e2fe1c`).
It reports content GO, zero BLOCKER, two SHOULD-FIX and five NICE-TO-HAVE,
with SR-F CLOSED proposed and a PARTIAL alternative for a pending conflict
adjudication. Its four-source page checks and independent numerical work are
reused as explicitly attributed review evidence, not claimed as repeated here.

The reviewer discloses no authoring involvement, non-blind reading order and
`claude-fable-5-1` from the session service. Part O and this addendum disclose
OpenAI author assistance. Git identities, model testimony and non-involvement
statements are different evidence. No exact-build log is requested and no old
PENDING record is rewritten. The reviewer reports a duplicate session-named
branch; this addendum uses a neutral branch and does not delete or rewrite any
review branch. Model-level acceptance remains a scoped steward determination.

### P.2 S-1 correction: rounded components and reconstructed components

**The Part O.3 assertion that both averages round to 0.9987 is incorrect.**
PR #220 Sections 10 and 12 correctly distinguish the two computations:

- Printed four-place components: `(0.9462 + 0.9462 + 1.1035)/3`
  equals `0.998633333...`, rounding to **0.9986** at four places.
- Reconstructed, not first rounded, components: the O.3 diagnostic gives
  `0.998662296...`, rounding to **0.9987**.

The first arithmetic was rechecked here with Python Decimal, independently of
the original floating-point diagnostic. The source's printed average is
consistent with averaging its printed rounded components. The difference does
not establish a source inconsistency; the earlier author characterization is
withdrawn. Printed values are retained. The half-width versus full-width label
observation remains separate; doubling both averages does not change their
ordering. No numerical kernel, diagnostic output or source table is changed.
This is the author repair of S-1, pending independent repair review.

### P.3 S-2 correction: explicit APR-06 catalogue narrowing

The fixed semantic catalogue's combined APR-05/06 shorthand assigns Studentized
maximum modulus and special tables. PR #220 Sections 7.4 and 12 identifies the
entry-level distinction that O.5 omitted. The author result is explicitly:

| Entry  | Relation to the fixed catalogue                                                                                   | Supported bounded reading                                                                                                                                                                                                                                                   | Classification |
| ------ | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| APR-05 | Supports the GT2 SMM construction with the model and at-least coverage in O.2; generic exact coverage is excluded | Hochberg pp.225–226, Theorem 3.1 p.228 and (3.2) p.229; known covariance shape, common unknown scale, independent chi-square variance estimator                                                                                                                             | `RES-ONLY`     |
| APR-06 | Narrows the combined shorthand: SMM is not the critical-value basis for this GH procedure                         | Genizi–Hochberg pp.879–880: SR for contrast-preserving `T_c(Q)`, SAR for all-linear-function `T(Q)`; Section 3 and Table 1 constants for the two-distinct-size construction, with restrictions (i)–(ii); Section 3.2 / Table 2 bounds the average-width comparison with GT2 | `RES-ONLY`     |

This is an informative catalogue comparison, not an edit to the fixed catalogue.
It does not promote general CSP optimality, arbitrary sample-size patterns,
pointwise superiority over GT2 or certified table constants. Restriction (i)
preserves minimum within-size-group pairwise widths and (ii) equal cross-size
pair widths; the optimum is within that constrained family. This is the author
repair of S-2, pending independent repair review.

### P.4 Corrigendum receipt, scope and optional observations

The supplied artifact **Corrigenda, JASA 74(367), 744, item on Genizi–Hochberg
(1978)** has 256229 bytes, two PDF pages (publisher cover plus printed p.744),
and SHA-256
`07a6c3433f77e85f2ce5034e0068e7421a7f5041679705755cbfabec7493653a`.
The prior author turn checked its hash/bytes/pages and read the p.744 page image;
PR #220 Section 4 independently checked the same identity and Section 5 its scope.
Those saved checks are reused here, without re-reading the PDF.

The inspected artifact prints publisher DOI `10.1080/01621459.1979.10481678`.
The acquisition log's `10.2307/2287029` remains the archival item identifier used
for discovery. The relevant paragraph is unsigned; calling it Genizi–Hochberg
(1979) follows Stoline's bibliography and does not establish personal authorship.
The two unrelated corrections on the same page are outside this review scope.

The text rejects the inference from nonattainment within `T(Q)` to Kramer's
pairwise intervals being liberal. It retains the within-family distinction and
leaves the proposed conservativeness to future analytical or simulation work.
It does not correct (1.7), the example, or Tables 1/2. The correction itself is
not a proof of Kramer coverage. These are the source-scope findings of PR #220
Section 5 and the preceding author PDF inspection; no renewed source search or
new broader proof is claimed.

Receipt accounting now distinguishes **42 numbered supplier originals plus one
unnumbered supplementary corrigendum artifact**, hence 43 received artifacts in
this intake chain. There are still 42 numbered originals; no supplier number is
invented and the three unrelated items on one corrigenda page are not counted
as three PDFs. O.4's unchanged total described the time before receipt. PR #220's
unchanged 42 count is retained as its numbered-original count, not used to deny
receipt of the extra artifact. Previously reported unavailable 38/44/45/46
remain unavailable; this correction is none of those four.

Optional observations from PR #220 Section 12 are carried with attribution:
N-1/N-4 are addressed by the identifiers and unsigned-item description above;
N-2 records reviewer SciPy 1.17.1 versus author 1.17.0 with identical printed
outputs, not one shared execution. N-3 reports the example's `1.3157` versus a
bounded reviewer reconstruction around `1.3152`; N-5 reports a repeated `H_11`
label in the p.882 Lemma where the second block is read as `H_12`. Neither is
adopted as a replacement value or formal erratum. Their causes are not established
here; inspect them before any numerical reuse or transcription of that Lemma.
No optional finding is independently certified closed by this author addendum.

### P.5 Remaining bounded decision and source-result ledger

There is no remaining source-acquisition request for SR-F in the reviewed scope.
Hochberg (1975) is not newly required: PR #220 Section 9 D-2 independently derives
the model-based coverage statements explicitly stated in the supplied 1978 paper.
This does not claim inspection of the 1975 proof or of wider GT3 optimality.

**Proposed bounded disposition decision, not enacted:** retain the printed
`=` in Genizi–Hochberg (1.7) as a documented discrepancy; ground the GT2
characterization in Hochberg's originating Theorem 3.1 / (3.2), using coverage
at least `1-alpha`; do not claim generic exact coverage or a published erratum
for the equality sign. Apply the explicit APR-06 narrowing in P.3. Treat SR-F
as CLOSED only in the commission's source-completion sense, not method adoption.
This proposal follows PR #220 Section 13 R-1/R-2 and requires no further paper.
It is not a presumption that the journal's text has been corrected.

Pending that bounded disposition decision, this successor records **SR-F
PARTIAL**, with the single named disposition gap R-1 and no missing source.
The two author repairs still await close-only review; they are tracked separately
from the remaining source-disposition decision. This uses the review's explicit
PARTIAL alternative rather than perpetuating O.5's historical INPUT_INCOMPLETE.
The author is not declaring RFC rule 5 adjudication or formal hold acceptance
complete. The independent repair reviewer should assess the proposed use of the
existing direct-source adjudication in PR #220, not automatically commission
another full four-paper pass.

The successor candidate ledger is **5 CLOSED / 2 PARTIAL / 7 INPUT_INCOMPLETE**:
SR-B/C/G/K/L CLOSED candidates; SR-F/H PARTIAL; SR-A/D/E/I/J and RSM-01/02
INPUT_INCOMPLETE. If the bounded decision is approved and the repair confirmed,
the proposed ledger is 6/1/7. Neither ledger is a list of formally accepted holds.
Overall INPUT_INCOMPLETE, SOURCE_SET_READY false, NARROW, RES-ONLY and the separate
R4 state remain. No merge, formal hold change, method adoption, public opening,
publication or release is made.

### P.6 Limited independent repair-review instructions

Review this addendum only, against the exact full head and result identity in its
draft PR body. Read AGENTS.md and ordered Read first documents, applicable local
instructions, the unchanged commission, Parts O/P and PR #220 Sections 4–5,
7.4, 9–13 at the fixed review identity in P.1. Preserve the 370999-byte Parts A–O
prefix and all prior reviews. Check S-1 by exact decimal/rational arithmetic;
check S-2 against the fixed catalogue and PR #220's pinned primary-source mapping.
Check the corrigendum transcription, attribution, numbered versus total-artifact
count, PARTIAL ledger and unapproved bounded CLOSED proposal. Assess whether the
proposal addresses R-1 using the direct source adjudication already in PR #220;
leave the actual steward decision distinct.

Reuse PR #220's source-image and numerical verification explicitly. No PDF is
required merely to repeat it. Request only a specific original/page if a new
material question cannot be resolved from that record. Do not repeat the whole
primary-source review, arbitrary-precision integrals or Monte Carlo by default.
Disclose independence, context/model testimony and evidence reuse without demanding
exact-build logs. Do not overwrite past PENDING or claim steward authority.

On a new neutral branch `review/r3-srf-review-repair-20260908` (or a fresh neutral
suffix if used), create one English file
`review-inputs/r3-srf-review-repair/REVIEW-RESULT.md` with the fixed author head as
sole parent. Record S-1/S-2 status, regressions, findings, actual validation and
limits, then open a draft PR against the author branch. Run format:check,
lint:markdown, the direct validator and diff check. Verify the final Git objects
and live target head. Do not mirror to a session-labelled branch, change fixed
results, commit PDFs/extracts, merge, formally close holds, adopt or release.

## Part Q — Approved SR-F source acceptance (2026-09-08)

### Q.1 Approval and fixed evidence

The steward explicitly approved all three decisions presented after PR #222:
the bounded R-1 adjudication, the scoped independence determination, and SR-F
source-completion acceptance. This records that approval from the current user
conversation on 2026-09-08. It is continuing OpenAI-assisted author/coordinator
work recording the steward's decision, not a new independent review.

The accepted research input is PR #221 head
`c6ba9c923d142e0dacbb62ea20009cbd0ecb34c5`, result blob
`ed6c56a96592fdb9bded45ad8fdf10477eb36c11` (383051 bytes; SHA-256
`33eca71fe6deb33da001f85c8a847f45bb39cf03942efb1eb95626e6bf465b1a`).
All 383051 bytes of Parts A–P are preserved, including historical pending states.
The commission remains blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`;
the fixed semantic input remains blob
`8f21526040924b891f64724c2d0fde9ea94eff92`.

The independent evidence is:

- PR #220, commit `ca88a1550165dc9b2f5f16541e91d92d1c79ef82`,
  `review-inputs/r3-srf-primary-research/REVIEW-RESULT.md`, blob
  `55fe509ed5a87b263e26d0145983f1caa3d2912f`: four-source review and direct
  adjudication, especially Sections 6, 7.3 and 13.
- PR #222, commit `eb9edc50e776bafb856273c76c21ff5d4bb2e876`, sole parent
  the accepted research head, tree `c8dc7c7b965c4923fbb601a29dd0de4d53be6b69`,
  `review-inputs/r3-srf-review-repair/REVIEW-RESULT.md`, blob
  `75e9a177a2b8ca9bd6c139462e64623d97b0cea6` (30613 bytes; SHA-256
  `dfc4f84a23a21db32359edd59b0e7b82c8de53cf638ab67f4a8d50310762e6ce`):
  content GO, S-1/S-2 independently CLOSED, no regression, zero BLOCKER,
  one editorial SHOULD-FIX and two optional observations.

PR #222 describes the former PR base at review time. PR #221 was subsequently
retargeted to `research/r3-source-receipt-42-20260908` at
`1da537aba29bed6bf65efc1a6e97ebdc2b1f6725`, consolidating Parts O/P after
PR #216 was closed without merge. The accepted commit's sole parent remains
`4ce988231330f5702a7d3d8a352b01fac575191f`; a PR base is not its commit parent.
No old review is rewritten to update that historical description.

### Q.2 Three enacted decisions

1. **R-1 adjudication accepted.** Ground the GT2 characterization in Hochberg's
   originating Theorem 3.1 and (3.2), with coverage at least `1-alpha` under
   the stated model. Retain the later printed equality in Genizi–Hochberg (1.7)
   as a discrepancy. Do not assert generic exact coverage or a published erratum
   for that sign. Apply the APR-06 narrowing in P.3. The direct primary-source
   adjudication in PR #220 and its assessment in PR #222 Section 7 are the
   RFC rule 5 basis; the corrigendum is not a proof of Kramer coverage.
2. **Scoped RFC rule 2 independence accepted as ESTABLISHED.** For Parts O/P
   and reviews #220/#222 only, the steward relies on the disclosed OpenAI
   author assistance, the reviewers' `claude-fable-5-1` service testimony, and
   their context/non-involvement disclosures. This is a determination on ordinary
   evidence, not Git verification of serving models or proof that the human
   participants are different people. Non-blind reading and shared reviewer
   model lineage remain disclosed. No exact-build log is required and no past
   PENDING record is changed or generalized to another scope.
3. **SR-F ACCEPTED AS CLOSED for source completion only.** The named
   source-acquisition obstacle is accepted as removed on the fixed evidence
   above. APR-05/06 remain `RES-ONLY`. This accepts neither an implementation
   nor numerical constants, generic optimality, arbitrary sample-size patterns,
   pointwise superiority, a public opening, or a release. Broader claims,
   new material source conflicts or numerical reuse outside the reviewed bounds
   reopen the relevant research or numerical review.

### Q.3 Editorial follow-up and evidence limits

For PR #222 F-1, replace the interpretation of P.4's phrase "three unrelated
items" with: **The three items on one corrigenda page are not counted as three
PDFs.** Two of those three items are unrelated to SR-F. The inventory remains
42 numbered originals plus one unnumbered supplementary corrigendum, or 43
artifacts. This is an author editorial correction applying the review's exact
intended sense; no new independent CLOSED verdict is claimed for this addendum.

For F-2, custody and source scope in this acceptance rely on PR #220 Sections
4–5. The earlier author PDF inspection remains conversation testimony, not an
invented earlier Git record. F-3's service-state observation is preserved without
claiming a cause. The numerical/label observations in P.4 remain constraints
before reuse, not adopted replacement values or formal errata.

No PDF was reread and no scientific calculation was rerun for this administrative
acceptance. Prior source and numerical checks are reused with attribution. Local
validation and saved identities for this addendum are reported in its PR body.

### Q.4 Current ledger and next bounded work

| Source-result disposition | Items                                        | Count |
| ------------------------- | -------------------------------------------- | ----- |
| CLOSED                    | SR-B, SR-C, SR-F, SR-G, SR-K, SR-L           | 6     |
| PARTIAL                   | SR-H                                         | 1     |
| INPUT_INCOMPLETE          | SR-A, SR-D, SR-E, SR-I, SR-J, RSM-01, RSM-02 | 7     |

This is the source-result ledger, not a list of six formally accepted holds.
This decision newly accepts SR-F only. Earlier SR-B/SR-C limited acceptances,
SR-K/SR-G separate acceptance questions, SR-L's inherited status, and SR-H's
outstanding proposals are not expanded by it. Overall `INPUT_INCOMPLETE`,
`SOURCE_SET_READY` false, `NARROW`, and the separate R4 state remain.

Next substantive author research is SR-I, using already received suppliers
34 (Games–Howell 1976), 27 (Tamhane 1979), and 28 (Dunnett 1980b, pp.796–800).
Reuse custody identities from N.2 and D.2 before any rereading. Bound the pass to
C-I1/C-I2 and HET-01/02/03: construction, assumptions, degrees of freedom,
critical-value basis, and the distinction between simulation evidence and
analytic control. Preserve current classifications until separately justified.
Supplier 28 is not Dunnett's different 1980 paper at pp.789–795. A substantive
successor will carry its own exact-head independent-review prompt and required
three-source packet; this administrative record does not commission a redundant
SR-F primary review or claim SR-I has already been investigated.

Unavailable suppliers 38/44/45/46 remain explicit gaps in their own routes.
They do not block this SR-I pass. Main integration of the wider R3 chain remains
separate from intake into its research aggregation branch. No method adoption,
public discussion opening, publication or release is enacted here.

## Part R — SR-I author result and independent-investigation intake (2026-09-09)

### R.1 Fixed inputs, roles and inspection order

This is continuing OpenAI-assisted author work, not an independent review or a
steward acceptance. It appends to Part Q at
`7cf5a5d0a14446fce0a67d0850793bbd4e117d67`, sole parent
`c6ba9c923d142e0dacbb62ea20009cbd0ecb34c5`, tree
`f806edd99e94adbc9f12193ea52ec3a08611da20`. The result blob is
`608cd7b04d2d34accb209060ee9163b39210f4f9` (389970 bytes; SHA-256
`48adf4a0f94fd2c0d2fc509aef1a579feb8651d339135c021975093578621f32`).
All Parts A–Q bytes are preserved. The commission remains blob
`3c7ddcc696f0c284213f7efe0da68e747bc238d7`; the semantic input at
`7bd9c5ab854777c3e99e624d9d2ed62731228852` remains blob
`8f21526040924b891f64724c2d0fde9ea94eff92`.

Independent investigation PR #226 is reused at commit
`a3e1c735b7878be071dc7268c63c6f4bada25a9a`, sole parent the above Part Q
commit, tree `d5f33ab36b764843bb651847389ce2e929214573`. Its
`review-inputs/r3-sri-primary-investigation/REVIEW-RESULT.md` is blob
`3520d2293bbbf855e07fee150953cc7709d6349f` (81005 bytes; SHA-256
`d36cbc12cd91fb56851aef8e594f5752517b585120545fc74b5cc68da47d8411`).
Its sibling `reproduce-sr-i.py` is blob
`19d7d172f916857fbd7ab97b2f9809c7f8bd2876` (15752 bytes; SHA-256
`289587151072cf5ac9b9f7381006a3bd269e7ca6034ab07039efa453992e6d9b`).
These identities were re-derived from fetched Git objects. The investigation
proposes source completion; it did not issue GO on this later author result.

The governing instructions were checked first; the current main versions of the
Read first documents match the fixed input. This author read PR #226's full
record, including Sections 4–14, before the three PDFs. Its Section 18 requested
the opposite order. That ordering cannot now be recreated: this pass is openly
non-blind and uses the investigation as a primary input, supplemented by direct
author source checks. It is not a parallel independent pass. No independence is
claimed merely because this is a later turn. The investigation's separate-context
and service-reported `claude-fable-5-1` disclosures are preserved; the scoped
steward determination for SR-F does not automatically cover SR-I.

### R.2 Received originals and direct reading

Previously supplied local PDFs were used, with stored D.2/N.3 identities checked
before rehashing. No network acquisition or additional purchase was needed.
All three hashes, lengths and PDF page counts matched on 2026-09-09:

| Supplier | Bibliography                                                                                                                                                            | Bytes   | PDF pages | SHA-256                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------- | ------------------------------------------------------------------ |
| 34       | Games and Howell (1976), Pairwise Multiple Comparison Procedures with Unequal N's and/or Variances: A Monte Carlo Study; Journal of Educational Statistics 1(2):113–125 | 994128  | 13        | `eee42d00cdd66f9f24e334c2db503e17233fc73b6a87ed5f85c6868f17a2c021` |
| 27       | Tamhane (1979), A Comparison of Procedures for Multiple Comparisons of Means with Unequal Variances; JASA 74:471–480; DOI `10.1080/01621459.1979.10482541`              | 1759491 | 11        | `f6183845a373361b8840040ecd9f0afce59cb8cb5170abf44c551376cd414bf0` |
| 28       | Dunnett (1980b), Pairwise Multiple Comparisons in the Unequal Variance Case; JASA 75:796–800; DOI `10.1080/01621459.1980.10477552`                                      | 726755  | 6         | `ac862081c93be6ce38ba0dc17b811cb3dd96227cf6ba50f66a7c35715a2870a0` |

The text of all printed pages was read. Additional page-image checks covered
Games–Howell pp.116–118, 121–123; Tamhane pp.471, 473–477; Dunnett pp.796–800.
PDF page 1 is printed p.113 for Games–Howell; the other two have a publisher
cover, so PDF page 2 is printed p.471 and p.796 respectively. Pages outside
that image list were read from extraction only. PyMuPDF was used for extraction
and rendering; no image, PDF or full extraction is included in Git.

Supplier 28 is not the separate Dunnett paper at pp.789–795. These are repeat
checks of received artifacts, not three new receipts: 42 numbered originals plus
one unnumbered corrigendum remain 43 artifacts. Unavailable 38/44/45/46 are
unchanged and do not block the current SR-I scope.

### R.3 Construction and claim-to-source mapping

The bounded family is all `m = k*(k-1)/2` pairs of independent normal groups,
with unknown means and possibly unequal variances and sample sizes. The target
is simultaneous two-sided intervals for the true mean differences. Ordinary
sample variances have `nu_i = n_i-1`; Tamhane p.471 and Dunnett p.796 also
state the model with an independent variance estimate on specified `nu_i` df.
The latter is not a license to insert arbitrary variance estimates.

For readable comparison define `a_i = s_i^2/n_i`,
`SE_ij = sqrt(a_i+a_j)`, and
`nu_W = (a_i+a_j)^2/(a_i^2/nu_i+a_j^2/nu_j)` where defined. Let
`q(alpha,k,nu)` denote the upper-alpha Studentized-range point and
`u = (1-(1-alpha)^(1/m))/2` the upper-tail t probability. These are notation
normalizations of the sources, not new Protocol definitions.

| Claim / variant                        | Direct primary pinpoints                                                                                | Bounded source result                                                                                                                                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-I1 / GH construction                 | Games–Howell pp.116–117, pp.122–123 Table V; Tamhane p.473; Dunnett p.796 (1.2)–(1.4)                   | Statistic is mean difference divided by `SE_ij`; interval half-width is `q(alpha,k,nu_W)*SE_ij/sqrt(2)`; Games–Howell calls it Method BF. This BF label is not Tamhane's Brown–Forsythe BF.                                     |
| C-I1 / GH evidence and claimed control | Games–Howell pp.116–118, p.120, Table III p.121; Tamhane pp.475–477 Table 3; Dunnett pp.797–799 Table 1 | Monte Carlo evidence for finite-sample error behaviour, with documented nominal-level exceedance. No general finite-sample level-alpha guarantee for GH is established by these assigned texts.                                 |
| C-I2 / T2                              | Tamhane p.473 (2.5) and T2 paragraph; Dunnett p.796 (1.4), (1.7), pp.797–799                            | Half-width `t_upper(u,nu_W)*SE_ij`; the two-sided gamma in Dunnett equals twice Tamhane's upper-tail gamma. Dunnett Table 1 supplies unmodified T2 simulation evidence.                                                         |
| C-I2 / T2-prime                        | Tamhane p.474 Section 3.2, p.475 glossary, p.477 Table 3                                                | Replaces Welch df with `n_i+n_j-2` in stated balance cases. The 1979 Table 3 evidence belongs to this primed variant, not unmodified T2.                                                                                        |
| C-I2 / T3                              | Dunnett p.796 (1.4), (1.8), p.797, pp.798–799 Table 1 and Section 4.1                                   | Half-width is the SMM upper-alpha point for `m` normal coordinates at `nu_W` df times `SE_ij`. The SMM critical law uses one shared chi-square scale; it is not the maximum of independent t variables with independent scales. |
| C-I2 / C                               | Dunnett p.796 (1.5)–(1.6), pp.798–800 Tables 1/2 and Section 4.3                                        | Half-width is `[a_i*q(alpha,k,nu_i)+a_j*q(alpha,k,nu_j)]*SE_ij/[(a_i+a_j)*sqrt(2)]`. Average the range points, not the df and not the sample variances into one common estimate.                                                |

For C, the two input df are integers in the ordinary-sample simulations;
the general model and formula do not state that every admissible variance
estimate must have integer df. The implied single range df is a descriptive
inverse, not the Welch formula. GH-prime is explicitly excluded from the GH
reading: Tamhane p.474 reports it as substantially liberal and drops it.
No new catalogue ID is minted for a primed variant or for the T3/C split.

Tamhane p.472 discusses extending pairwise intervals to contrasts through an
unread Hochberg (1975) lemma. That extension is outside the all-pairs claims here;
it is not accurate to say that the paper never discusses contrasts. One-sided
and adjusted-p outputs are not established by the present investigation.

### R.4 Evidence strength and precise simulation boundaries

The following are printed observations, not confidence guarantees for new data:

| Source                           | Design / repetitions                                                                                                                                                            | Decision-bearing observations                                                                                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Games–Howell pp.116–118, 120–121 | Four groups; four variance patterns; moderate and small sample-size configurations; normally 1000 experiments per cell, with 2000 in the marked pooled/additional rows          | Table I BF rates range .041–.071; p.118 gives .0545–.0631 as a confidence interval for the mean FWI. Table III includes .092 at sample sizes (11,8,4,3), variances (1,3,5,7), versus nominal .05.                                       |
| Tamhane pp.475–477               | Four or eight groups; eight configurations each; sample sizes 7–13; 1000 experiments per cell; .05 results printed                                                              | GH joint coverage reaches .936 for k=4 and .916 for k=8. T2-prime's k=4 row ranges .947–.968, and k=8 row .942–.973. Two k=4 cells and one k=8 cell are below .95, although none of the T2-prime cells has the paper's below-.942 flag. |
| Dunnett pp.797–799               | Three base sample-size configurations, five tabulated variance multipliers, four size/df scales including infinity; 10000 draws per set with reused draws across configurations | Table 1 finite-df GH estimates include .0622 at k=8. All printed T2/T3 rates are below .05. C finite-df rates are below .05; its Simulation II known-variance cell at c=1 is .0503. These are observed estimates, not proofs.           |

Tamhane's table reports coverage, whereas the other two tables above report
error probabilities. Thus coverage .916 corresponds to error estimate .084.
The .092 GH estimate is 4.2 percentage points above .05, or 84% relative excess;
.084 is 3.4 points / 68% relative excess. Describing all configurations as only
small or at most about 25% relative exceedances would understate these cells.
These arithmetic comparisons do not identify the unknown true error rates.

The papers' finite-df GH/T2/T3/C characterizations use approximate procedures
and simulation-based assessments. This does not mean that every statement in
all three papers lacks mathematical derivation: Tamhane includes other
procedures and distributional calculations. In particular, its p.476 Table 2
SMM constants are for GT2, not a direct T2 simulation or an early T3 definition.
Dunnett pp.799–800 asserts a known-variance GH/C bound by reference to his
other 1980 paper. That proof dependency was not checked here; an earlier
catalogue's evidence label cannot establish that the unread paper has no proof.
No known-variance guarantee is adopted in this finite-df source characterization.

The common-scale Studentized inequality in Part H is not a proof of the
heteroscedastic procedures' joint behaviour with pair-specific random standard
errors and random Welch df. Calling a procedure approximate-conservative does
not establish strong or weak level-alpha control throughout its input domain.

### R.5 S-1–S-3 response, precision corrections and retained doubts

The author accepts S-1–S-3 as **proposed informative narrowings**, pending exact-head
review and steward acceptance. They are not silently applied to the fixed catalogue:

| Finding      | Author response                                                                                                                                                                                                                                                            | Fixed classification retained                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| S-1 / HET-01 | Replace the reading of pending evidence with simulation-based approximate intervals, documented exceedances at the stated configurations, and no general finite-df level-alpha guarantee in the assigned texts. Exclude GH-prime. Do not qualify all exceedances as small. | `R3-CAND` as an unselected implementation candidate; this status alone authorizes no guaranteed-FWER Contract or implementation. |
| S-2 / HET-02 | Identify unmodified T2 with Welch df and the Dunnett 1980b experiments; separately record T2-prime and Tamhane 1979's experiments. Tamhane 1977 is an attribution through the inspected texts, not a claimed direct reading.                                               | `RES-ONLY`; variant split is a reopen trigger, not a new ID or replacement of HET-02.                                            |
| S-3 / HET-03 | Keep T3 (SMM at Welch df) and C (weighted range points at the two variance-estimate df) explicitly separate. Width comparisons depend on df and the design, not one universal preference between them.                                                                     | `RES-ONLY`; two descriptive variants under the unchanged entry.                                                                  |

Direct inspection identifies precision corrections to PR #226, which is retained
unchanged. These are author findings for the next independent reviewer:

1. **T2-prime cells and bounds.** PR #226 Sections 5.4/11 give an overbroad
   conservative-in-every-cell summary and an incorrect k=4 upper endpoint .973.
   The p.477 image gives .947–.968 for k=4 and .942–.973 for k=8. Lack of the
   source's significance flag is not equivalent to every estimate reaching .95.
2. **Tamhane p.474 comparison signs.** PR #226 Section 5.2 transcribes some
   endpoints strictly. The four printed conditions use non-strict comparisons:
   `9/10 <= n_i/n_j <= 10/9`; or `9/10 <= V <= 10/9`; or
   `4/5 <= n_i/n_j <= 5/4` and `1/2 <= V <= 2`; or
   `2/3 <= n_i/n_j <= 3/2` and `3/4 <= V <= 4/3`, with
   `V=(s_i^2/n_i)/(s_j^2/n_j)`. This transcribes T2-prime/GH-prime identity
   only; no variant is adopted. The original does not specify software handling
   when that ratio is undefined.
3. **Magnitude and proof scope.** R.4 replaces PR #226 Section 8.1's relative
   excess summary and limits the no-proof statement to the finite-df procedures
   under investigation. Known-variance proof content stays unverified.
4. **Dunnett p.800 direction.** The printed text associates the point to the
   left on a reciprocal-df plot with smaller df. Its displayed identity instead
   makes `1/nu_W` smaller and `nu_W` larger than the weighted reciprocal-df
   comparator. For `nu_i=6`, `nu_j=12`, `V=1`, that comparator is 8 and
   `nu_W=16`. The plotted direction is retained; the accompanying smaller-df
   phrase is a source inconsistency, not adopted. This refines the loose-scale
   observation reused from PR #226 Sections 6.5/9/12.5.
5. **Dunnett p.797 wording.** The text describes GH's joint confidence
   coefficient as sometimes exceeding `1-alpha` while referring to the flaw
   discussed by Tamhane. Tamhane p.477 and Dunnett's own Table 1 document
   noncoverage excess / coverage shortfall instead. Preserve the wording as a
   discrepancy; do not silently reverse its sign or call it a formal erratum.
6. **Tamhane p.476 generator expression.** The printed even-df chi-square
   expression is `-sum(log(U_i), i=1..nu/2)` without a factor 2. Under the
   stated uniform model that expression has mean `nu/2`, not `nu`.
   The author infers a missing factor 2 if the intended variate is chi-square;
   the actual historical program has not been inspected, so this is not evidence
   that the simulation itself used the printed expression. Do not certify its
   generator from this prose or rerun it literally as a chi-square sampler.

These issues affect precise description and possible numerical reuse; none
turns the assigned texts back into missing sources. A reviewer may nevertheless
identify a material unresolved source conflict and require separate adjudication.
No author claim here closes a finding independently.

PR #226 N-1 printed doubts (GH p.123 4.69; Tamhane reference years; Dunnett's
seven mentioned versus five tabulated c values) are retained as attributed
observations, without an erratum search. The GH printed value was viewed here;
its reported quantile recomputation is reused, not repeated. Other reference-year
observations were read in extraction, not newly verified in page images.

### R.6 Author inferences, diagnostic reuse and future decisions

For each of these location-invariant interval constructions, subtracting the
true mean difference removes the means from the joint noncoverage event. The
all-pairs noncoverage probability is therefore the same under different mean
vectors within the stated model. False rejections among true nulls form a subset
of that event. This supports reuse of complete-null simulations to study joint
noncoverage, but does not convert a simulated estimate into a proved alpha bound.
This is author reasoning agreeing with PR #226 I-1, not a sourced theorem.

With `w=V/(V+1)` and `h=2/(1/nu_i+1/nu_j)`, direct algebra gives
`1/nu_W = w^2/nu_i + (1-w)^2/nu_j` and
`1/nu_prime = w/nu_i + (1-w)/nu_j`, hence
`1/nu_W = 1/nu_prime - 2*w*(1-w)/h`. Exact rational arithmetic checked the
R.5 example. It also counted the T2-prime below-.95 cells and computed the
excesses reported in R.4. No quantile, quadrature or Monte Carlo was rerun.
PR #226 Section 12 is reused as attributed diagnostic evidence: its 40000-draw
spot checks are not literal agreement with printed probabilities or a replication
of every cell, and its numerical routes are not certified error bounds.

The following work allocation is proposed, not a method-selection decision:

- **Semantic lane first:** choose the exact procedure/variant, comparison family,
  sidedness, meaning of any approximation claim, minimum sample-size/df domain,
  and policy for one or both zero sample variances. The GH p.122 example explicitly
  mentions one zero variance; it does not define a complete admissibility policy.
  One zero with the other positive can yield a defined pair formula; both zero
  create undefined Welch df. Neither outcome is silently turned into a rule.
- **Semantic and numerical coordination:** decide whether the target uses the
  continuous-df law or deliberately reproduces historical rounding/interpolation.
  GH p.123 rounds a worked df; Tamhane p.476 describes harmonic interpolation for
  range tables; Dunnett p.797 uses quadratic interpolation on reciprocal df.
  These choices change results, so they are not merely implementation tuning.
- **Numerical lane after the target is fixed:** establish admissible-domain
  evaluation, tail/quantile accuracy, numerical failure handling and independent
  oracles for the chosen t, range or SMM law. Reuse of existing Welch-df or t
  numerics does not certify range/SMM kernels or statistical coverage.

Recommendation: retain HET-01's current candidate label while explicitly withholding
level-alpha guarantee and implementation approval. Reclassification, adoption of
an approximate reporting Contract, or a narrower guaranteed domain requires a
separate supported decision. Tamhane (1977) is needed only for claims depending
on its uninspected original material; Keselman–Rogan (1978) becomes relevant if
claiming more favourable GH control in a defined domain. Acquiring that study
alone would not erase the documented exceedances. Dunnett (1980a) is required
before relying on its known-variance proof pointer; check existing SRC-08 custody
before any reacquisition. The all-contrasts extension likewise reopens its own
proof dependency. None is asserted as completed here.

### R.7 Proposed disposition and full source-result ledger

C-I1 is supported as a construction and a characterization of simulation evidence,
not a guarantee of level-alpha control. C-I2 is supported with the T2/T2-prime and
T3/C distinctions. The author recommends accepting S-1–S-3 as bounded catalogue
narrowings, rather than inventing a conflict between source formulas that agree.
The new precision findings above remain explicit review inputs.

**Current successor disposition: SR-I PARTIAL**, with named remaining gaps:
independent review of this author synthesis and the proposed narrowing/disposition
acceptance. Required assigned source text is no longer unavailable. On favourable
exact-head review and scoped steward acceptance, SR-I CLOSED is proposed only
for source completion; that conditional ledger would be 7/1/6. Neither formal
acceptance nor that conditional change is enacted here. The separate-model
question for SR-I remains a scoped determination on ordinary provenance evidence;
past PENDING records and the already accepted SR-F decision remain untouched.

| Disposition      | Holds                                  | Count |
| ---------------- | -------------------------------------- | ----- |
| CLOSED           | SR-B, SR-C, SR-F, SR-G, SR-K, SR-L     | 6     |
| PARTIAL          | SR-H, SR-I                             | 2     |
| INPUT_INCOMPLETE | SR-A, SR-D, SR-E, SR-J, RSM-01, RSM-02 | 6     |

This ledger is not a list of formally accepted holds. Overall INPUT_INCOMPLETE,
SOURCE_SET_READY false, the existing semantic NARROW, other hold dispositions,
R3-CAND/RES-ONLY/TRANSFER classifications, and the separate R4 state remain.
No source result is promoted to numerical certification, method adoption,
public discussion opening or release.

### R.8 Exact-head independent review handoff

Review Part R only at the complete fixed head and result identity in this PR's
body. Start by reading AGENTS.md and its ordered Read first documents, applicable
local instructions, the unchanged commission and fixed semantic entries for
C-I1/C-I2 and HET-01/02/03. Verify the sole parent is Part Q commit
`7cf5a5d0a14446fce0a67d0850793bbd4e117d67`, the 389970-byte Parts A–Q prefix
is byte-identical, and only this result file changed. Reuse PR #226 at the full
commit/blob identities in R.1, disclosing non-blind reading and any prior role.
The reviewer must not have authored Part R and must disclose the model/context
basis without demanding exact-build logs. Do not treat this author as independent.

Attach suppliers 34/27/28 with R.2 hashes. Reuse PR #226's broad source review
and diagnostics explicitly; do not automatically rerun its entire simulations.
Directly inspect the pages needed for the new precision findings: GH pp.118,
121–123; Tamhane pp.473–477; Dunnett pp.796–800. In particular verify the four
p.474 non-strict conditions, the T2-prime table rows and coverage/error distinction,
the reciprocal-df direction, p.797 wording, and p.476 generator expression.
Check the R.3 equations, C's df boundary, HET variant mapping, source facts versus
inferences, and proposed semantic/numerical allocation. Check the six author
precision findings against the original images, not solely against PR #226.
Simple algebra/counts suffice where indicated; require further numerical work
only for a concrete remaining decision-bearing issue.

Assess whether S-1–S-3 are faithfully addressed and whether the bounded CLOSED
proposal is source-supportable. Distinguish content verdict from actual steward
acceptance, candidate classification and guaranteed implementation. Preserve the
6/2/6 current versus 7/1/6 conditional ledger and every wider boundary. If a new
material conflict prevents completion, identify the exact claim, necessary source
or computation and an executable additional-investigation prompt. If PDFs cannot
be inspected, partition SOURCE_ACCESS_INCOMPLETE to affected claims and continue
repository-only checks; do not report a source-level GO.

Create a fresh neutral branch `review/r3-sri-author-synthesis-20260909` (use a
new neutral suffix if already used) from the fixed author head as sole parent.
Add an English report at
`review-inputs/r3-sri-author-synthesis/REVIEW-RESULT.md`; include fixed identity,
reading order, direct and reused evidence, findings/severity, per-finding status,
actual checks and unverified scope. Do not rewrite PR #226 or any earlier file.
Keep PDFs, images and full extractions out of Git and use no session mirror branch.
Run format:check, lint:markdown, the direct validator and git diff --check after
adding the report. Open a separate draft PR against
`research/r3-sri-author-synthesis-20260909`, confirm the live author head has not
moved, and report GitHub commit/parent/tree/blob identities. Report in Japanese
with the verdict, remaining decisions and any additional-investigation prompt.
Do not merge, accept a hold, adopt a procedure, open discussion or release.

## Part S — SR-I scoped steward acceptance and review-note disposition

**Status: informative source-completion acceptance record; non-normative.**
This addendum records the three decisions approved by steward Tasuku Kobayashi
in the continuing author/coordinator conversation on 2026-09-09, after presentation
of PR #230 and the three concrete proposed decisions. The steward explicitly
approved all three. This English account records that conversation approval;
it is not a cryptographic signature or an independently recorded GitHub vote.
The OpenAI-assisted author/coordinator records the decision and remains an author,
not an independent reviewer.

### S.1 Fixed evidence and preservation

The accepted author input is PR #228, commit
`3a8bc0d86718a2cf47ce12089a9030a02e41a297`, tree
`a7ca249511be2bd84dd9135d99f63428db58cfb6`, result blob
`6c4afc4363a129e707e777ebccea2a2034d74290`, 417005 bytes, SHA-256
`52bf464832f01bcfd3f96fe0ea922fef136d0ea849ec14158008b48fcd7f44b0`.
The independent review is PR #230, commit
`06c09e6616b27124ef00b615a5ad59b0e060902a`, sole parent the accepted author
commit, tree `310991a7d13762fb44ef71837aaaf07622821410`, report at
`review-inputs/r3-sri-author-synthesis/REVIEW-RESULT.md`, blob
`722d0e46c5f9619243f80a2464893aaf49feafa9` (66324 bytes).
Its content verdict is GO, with no BLOCKER or SHOULD-FIX and four NICE-TO-HAVE
observations. Its Sections 2, 9, 10, 13 and 14 delimit the evidence and decisions.
PR #226 and its full fixed identities remain as recorded in R.1.

The full 417005-byte Parts A–R prefix is preserved. Earlier PARTIAL and PENDING
statements describe their historical state; this successor does not rewrite them.
This acceptance reuses the direct original-page checks and arithmetic recorded in
Part R and PR #230. No PDF rereading, quantile calculation or Monte Carlo rerun is
claimed for this administrative and editorial addendum.

### S.2 Decision 1 — accept the narrowings and source completion

**ACCEPTED:** S-1–S-3 are recorded catalogue narrowings, not unresolved conflicts
preventing completion of C-I1/C-I2. Games–Howell's evidence is simulation-based,
with documented nominal-level exceedances and no general finite-df level-alpha
guarantee established by the assigned texts; GH-prime is excluded. T2 and T2-prime
have distinct df/evidence mappings. T3 and C are distinct descriptive procedures.
Part R and PR #230 support these limited descriptions directly and distinguish
source statements, author inferences, printed discrepancies and uninspected
conditional dependencies.

**SR-I is formally ACCEPTED AS CLOSED for source completion only.** The assigned
source-acquisition obstacle is removed. This decision does not select or implement
any of the procedures, establish error-rate or numerical guarantees, or resolve
the separate choices concerning fractional df, zero variance, minimum sample
size, contrast extensions, or conditional proof dependencies in R.6.

### S.3 Decision 2 — retain HET-01 as an unselected candidate

**ACCEPTED:** retain HET-01's existing R3-CAND classification as an unselected
candidate, with no level-alpha guarantee or implementation approval. The label
preserves a future investigation option; it is not evidence of controlled FWER
or a commitment to ship Games–Howell. Before implementation, the supported scope,
approximation/reporting meaning and numerical conditions require their own
supported decisions. HET-02/03 remain RES-ONLY; no catalogue or Contract ID is
created, split or reinterpreted in the fixed semantic input.

### S.4 Decision 3 — scoped independent-pass determination

**ACCEPTED for this SR-I source-completion scope:** the steward relies on Part R's
OpenAI-assisted author provenance and PR #230 Section 2's service-reported
`claude-fable-5-1` reviewer model, separate context and non-involvement in authoring
Part R or PR #226. These ordinary provenance statements support the separate-model
and separate-context determination for this review of the author synthesis under
RFC research-gate rule 2. Git identities establish artifact identity, not serving
model identity. No exact-build log is required or inferred.

PR #226 and PR #230 share a reviewer model family; they are not presented as two
independent model families. The user-described human responsibility remains
respected, without inferring that the responsible humans were different people.
This determination is scoped to SR-I and does not replace any other hold's
independence decision or silently alter earlier PENDING evidence.

### S.5 Disposition of optional review notes

The following precision notes are carried forward from PR #230 Section 13, using
its direct source inspection explicitly rather than claiming new page inspection:

- N-1: retain the reported Tamhane Table 3 inconsistency: the GH k=4,
  configuration-6 value .940 lacks an asterisk despite the printed criterion and
  other marked cells. No table cell or historical simulation is corrected here.
- N-2: retain the p.797 Dunnett attribution issue: its reference to Tamhane 1979
  as evidence about T2 does not distinguish that study's T2-prime simulation.
  Part R's T2/T2-prime mapping governs the bounded source characterization.
- N-3: clarify that R.3's shared chi-square scale description of the SMM law is
  an inference from the standard distribution definition, not a sentence directly
  established in the assigned originals. The definitional references identified
  in PR #230 remain uninspected. This is no numerical-kernel certification.
- N-4: carry the additional pinpoint to GH p.120 for the extra 1000 experiments
  under NC 3 and the discussion of n=3 paired with n=11 or 8. Part R's numerical
  counts and the original table values remain unchanged.

These are editorial carry-forwards and an explicit attribution clarification,
not new statistical evidence or reasons to repeat the completed primary review.
Their incorporation is author-side; no independent close-only verdict is claimed.

### S.6 Successor ledger and remaining work

| Disposition      | Holds                                    | Count |
| ---------------- | ---------------------------------------- | ----- |
| CLOSED           | SR-B, SR-C, SR-F, SR-G, SR-I, SR-K, SR-L | 7     |
| PARTIAL          | SR-H                                     | 1     |
| INPUT_INCOMPLETE | SR-A, SR-D, SR-E, SR-J, RSM-01, RSM-02   | 6     |

Only SR-I changes from Part R's 6/2/6 source-result ledger. This is not a list of
seven formally accepted holds: the other rows retain their own acceptance history.
Overall INPUT_INCOMPLETE, SOURCE_SET_READY false, NARROW, other hold dispositions,
TRANSFER, remaining R3-CAND/RES-ONLY classifications and the separate R4 state
remain. Custody remains 42 numbered originals plus one unnumbered corrigendum,
43 artifacts; no duplicate intake or new acquisition is recorded.

Source completion is now accepted for SR-I. Implementation-specific decisions
remain open as listed above. The conditional investigations in PR #230 Section 14
are activated only when their claims are needed, not as prerequisites to this
bounded acceptance. Main integration, public discussion, method adoption and
release are separate actions and are not performed by this record.

### S.7 Limited record-application review handoff

Review only this addendum at the full fixed identity in its PR body. Read AGENTS.md,
the ordered Read first documents and applicable local instructions. Verify the
sole parent is the fixed Part R commit in S.1 and that all 417005 prefix bytes are
identical; check the one-file append-only diff and PR #230's pinned identity.
Read the three approval proposals and approval account in this PR body, then
compare S.2–S.4 with the approved scope and PR #230 Sections 2, 9, 10 and 14.
The decision was made by the steward; assess faithful recording and application,
not whether the reviewer can grant approval again. Check S.5 against Section 13,
especially source versus inference for N-3, and verify 7/1/6 and all wider limits.

Reuse the existing original-page review explicitly. No PDF is required unless a
new concrete decision-bearing issue cannot be settled from the pinned records.
Do not rerun simulations or seek exact-build logs. Disclose prior involvement,
context/model basis, direct checks, reused evidence and unverified scope. Do not
rewrite existing results, reviews or historical PENDING records.

Create a fresh neutral branch `review/r3-sri-acceptance-20260909` (a fresh suffix
if occupied), with the fixed author head as sole parent. Add only an English
report at `review-inputs/r3-sri-acceptance/REVIEW-RESULT.md`. Run format:check,
lint:markdown, the direct validator and git diff --check; report actual outputs
without overstating file counts. Open a separate draft PR against
`research/r3-sri-acceptance-20260909`, confirm the author head is unchanged and
report commit/parent/tree/blob identities. If a substantive gap appears, supply
an executable additional-investigation prompt. Do not merge, expand the accepted
scope, adopt a procedure, open discussion or release.

## Part T — SR-D author synthesis under the approved bounded primary basis

**Status: informative author source-completion result; non-normative.**
This addendum records the steward's approved source-basis change for CLS-02/04
and synthesizes the inspected evidence for CLS-01 through CLS-06. It proposes
SR-D `CLOSED` for source completion under that bounded basis. Formal SR-D hold
acceptance remains pending the synthesis review and a separate steward decision.
This is not method adoption, implementation approval or permission to open R3.

### T.1 Fixed evidence, preservation and provenance

The continuing OpenAI-assisted author/coordinator wrote this synthesis, with prior
involvement in PR #238 and the acceptance discussion. This is not an independent
review. No new PDF reading, mathematical derivation, quantile calculation or
simulation is claimed. Direct primary reading and independent recomputation are
reused only within the recorded bounds of the following immutable evidence:

| Input                              | Commit / tree                                                                           | Report blob / bytes / SHA-256                                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Part S, PR #231                    | `1c013a6bc07f7d066fa43c692abe2be91241b384` / `0f8b6baa728099dc21880016fbace8c44166e088` | `34ee7f83368462a4782d86eff02b72cf5c18a0a0` / 426114 / `736c6484f12d0e59330ae257e23e597b868f9c5930ff86809ba8cf8d4c97b044` |
| Primary investigation, PR #236     | `7190c78b58f9d6b36dad0d8a39ff1c3b29faa961` / `24c77b7098cd0eddae1469c6fcfa80ddabd586f9` | `785785bef368694d4643be5eada6524231f8e244` / 101944 / `06c9de684706f1ca1da016d6c4600093bf6bb962855d67860dc3d1f6c4e1dec1` |
| Targeted investigation, PR #237    | `ea9c74de316515dcfa592b52328b1af7005ed32d` / `2e7b4158f31bf7505427854ad6296279ce47d851` | `e0bfa5094e41ed7cdd693cd32f29699a99b97d53` / 69702 / `083f26e9a0d0e33811204eead6089e716ebf126a005b07cc7706f0f7fe69bd7b`  |
| Author corrections, PR #238        | `862dfe2bcf55b206c9f87ac06164b02b2cc3c079` / `703c4af0e6ade14634947cf5a204ef4ade1162b5` | `2c8839e3a1d12778557ea4ae3e0babda64f7c597` / 39160 / `a7a1f7111575484840cb615b57435fd63c9dad1332e7819589db2a864ea8061b`  |
| Focused correction review, PR #241 | `00f50638d3389d2d901fcadb5e2d03a5f2bd4f78` / `45ae68798fcdbc6dd269f37a42197671db8cadf0` | `fad66a294e9a966d62d2abf9335df26fe50af1be` / 25875 / `4e0bc664fc1955a75e71c929ff8dbf22c1ebeeccbdb779286a865da5d415c8d5`  |

Report paths are `review-inputs/r3-srd-primary-investigation/REVIEW-RESULT.md`,
`review-inputs/r3-srd-targeted-followup/REVIEW-RESULT.md`,
`review-inputs/r3-srd-author-followup/REVIEW-RESULT.md`, and
`review-inputs/r3-srd-author-followup-review/REVIEW-RESULT.md`, respectively.
PR #237 remains a separate fixed input; it is not implicitly included by ancestry.
Its exact commit provides access to that report and script.

The result preserves all 426114 Parts A-S bytes as an exact prefix. The new commit
has PR #241's fixed commit as sole parent, preserving the parent investigation,
author corrections and focused review in the tree. No earlier report, script,
commission, catalogue, RFC or acceptance record is rewritten. The commission
remains blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`, fixed containing commit
`f39100161cb45de15767bdb19ed54aba9489b41a`. The semantic comparison remains commit
`7bd9c5ab854777c3e99e624d9d2ed62731228852`, result blob
`8f21526040924b891f64724c2d0fde9ea94eff92`.

PR #241's GO covers the content of PR #238 only. Its reported separate context,
non-involvement and Claude model are retained as scoped provenance, distinct from
the OpenAI-assisted author work; Git identity is not model evidence. This is not
a review of Part T, an additional independent model family relative to PR #236/237,
or an extension of Part S's SR-I determination. No exact-build log is required.

### T.2 Approved source-basis change and its exact boundary

On 2026-09-09 the coordinator proposed the two-entry alternative basis in PR #238
Section 5 and the PR #231 continuation: use inspected later original papers for
the bounded procedure/guarantee descriptions, while retaining the 1995 attribution
and original formulation as unverified. Steward Tasuku Kobayashi explicitly
approved that proposal in the continuing conversation. This English account
records that conversation approval; it is not an independently signed GitHub vote
and does not imply unaided human authorship of the synthesis.

**APPROVED for CLS-02 and CLS-04 source-completion characterization only:**

| Entry  | Required decision-bearing basis after approval                                                                                                                                              | Preserved residual                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| CLS-02 | Wiens 2003 pp.212-213: prospectively fixed sequence, each test at alpha, stopping at first non-rejection; separately attributed supporting graph treatment in Bretz 2009 p.593 and Appendix | Maurer-Hothorn-Lehmacher 1995 attribution, exact original formulation and variants remain unverified |
| CLS-04 | Dmitrienko-Offen-Westfall 2003 pp.2389-2391: two-family serial weighted-Bonferroni Algorithm 2 and the closed-testing error bound                                                           | The proposed 1995 lineage remains unverified; no historical absence or priority claim                |

SRC-27(b) is removed from the required source-completion basis **for those two
bounded characterizations only**. This is the approved exception to the fixed
commission's assigned source basis, recorded here append-only. It does not change
the commission's general disposition rules or any other source obligation.
Earlier INPUT_INCOMPLETE conclusions were correct under the then-required basis
and remain historical evidence. They are not retrospectively recast as PARTIAL.

The approval does not read or certify the 1995 chapter, relabel our own proofs as
primary sources, select an adjusted-p convention, guarantee Simes or resampling,
endorse broad graphical equivalence, adopt a procedure, or formally accept SR-D.
The fixed CLS-02/04 `RES-ONLY` classifications remain. No catalogue ID is created
or redefined. This successor explains the historical label's unsupported part
rather than silently changing the fixed semantic catalogue.

### T.3 Source custody and claim-to-source map

This synthesis uses the same four artifacts. Recovered copies and hashes were
verified in PR #238; PR #241 independently re-hashed them and checked the relevant
pages. PR #236 records complete reading of all four. Those observations are reused
explicitly. No new acquisition is counted and no source file is committed.

| Supplier / primary text                   | Bytes / PDF pages | SHA-256                                                            | Decision-bearing pinpoint and evidence boundary                                                                                                                                                      |
| ----------------------------------------- | ----------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 15 Marcus, Peritz and Gabriel 1976        | 446500 / 7        | `7b81e37b502d885658249196f25db32e1682d6461f3c15f7a3d56e3732899a24` | C-D1, CLS-01: printed pp.655-656, closed family and level-alpha local tests; directional limitation pp.656-657; framework reading reused from #236 Section 4                                         |
| 43 Wiens 2003                             | 120883 / 5        | `f9634c824d637b2f1e262d226c8bd3d7d01f540501facdaead9c1e802eed5bd7` | C-D2, CLS-02/03: pp.212-213 Sections 2.2/2.3; fallback strong-FWE claim, displayed proof for I=2, general I asserted; #241 Section 5 checks reused author proof                                      |
| 41 Dmitrienko, Offen and Westfall 2003    | 106251 / 14       | `c1df1453c5001cfeae4bd3d52d31e46f7248cd7b3524ec7d46e2d47ef0a07ed4` | C-D2, CLS-04/05: pp.2389-2392, local Bonferroni condition and Algorithms 1/2; conflicting Tables I/II and Table III reconstruction pp.2391,2394-2395; weighted-Simes cited proof dependency p.2393   |
| 40 Bretz, Maurer, Brannath and Posch 2009 | 439933 / 19       | `87041fa4b4d17e6a2832536d586cc26b253422255df59cd00a86344f6b0a5664` | C-D3, CLS-06: pp.590-592, graph/update and representation limits; fixed sequence/fallback p.593; epsilon p.596; Appendix pp.601-603 states/imports shortcut result and proves graph-level properties |

Printed/PDF mapping is Marcus printed 658 = PDF 5 (JSTOR cover at PDF 1);
Bretz printed page = PDF page +585; Dmitrienko +2386; Wiens +210. Supplier 15
is the three-author closed-testing paper, not the separate Marcus single-author
paper involved in SR-J X-8. The 1995 chapter remains uninspected, not proved
unavailable worldwide. Supplier 47's receipt status is not resolved here.

### T.4 Six-entry impact and supported meaning

| Entry / existing classification | Member set, inputs and rule                                                                                                                                                                                  | Supported guarantee / outputs                                                                                                                                                                | Narrowing and future dependency                                                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CLS-01 / R3-CAND as framework   | Prespecified elementary hypotheses and their intersection-closed family; a valid level-alpha local test for each intersection; reject an elementary hypothesis only when every required intersection rejects | Strong familywise false-rejection bound via the intersection of all true nulls; rejection statements, not a general confidence-interval construction                                         | Dependence among valid local tests adds no requirement, but each local test needs its own assumptions. No directional-error guarantee or incorporation of the separate ordered-ANOVA numerical procedure          |
| CLS-02 / RES-ONLY               | Finite prospectively ordered hypotheses; each at alpha; stop at the first non-rejection                                                                                                                      | Fixed-sequence false-rejection bound under valid marginal p-values; source-defined rejection/stop rule                                                                                       | Approved Wiens basis; 1995 attribution unresolved. No observed-p ordering. Zero-level fallback equivalence is convention-dependent; no implementation convention chosen                                           |
| CLS-03 / RES-ONLY               | Fixed finite order and nonnegative prespecified allocations summing to alpha; carry preceding level after a rejection, reset to own allocation after non-rejection; continue through family                  | Wiens's strong-FWE claim; I=2 proof in source, general proof separately attributed below; decisions only in Wiens                                                                            | Original fallback only, not improved/modified variants. Adjusted-p and compatible-interval machinery require separate basis if needed                                                                             |
| CLS-04 / RES-ONLY               | Two fixed families; Algorithm 2 gives normalized gate weights if any gate remains in an intersection, otherwise normalized secondary weights; local weighted Bonferroni tests and closure                    | Strong FWER with valid marginal p-values and admissible predetermined local weights; secondary adjusted p at least maximum gate adjusted p; source supplies adjusted-p/decision construction | Strictly positive original weights for the displayed normalization formulas; two-family Bonferroni characterization only; 1995 lineage unverified; no general epsilon/multi-family theorem adopted                |
| CLS-05 / RES-ONLY               | Two fixed families with prespecified importance weights summing to one within each family; Algorithm 1's three cases for intersection weights                                                                | Weighted Bonferroni closure controls strong FWER. Raw Algorithm 1 gate values are min(1,p_i/w_i), independent of secondary values; secondary values at least minimum gate value              | Raw and normalized/Table-II reconstructions stay distinct; only raw convention retains the stated Condition 1. No variant selected. Simes/resampling excluded from this guarantee and retained as reopen triggers |
| CLS-06 / RES-ONLY               | Finite prespecified graph, nonnegative initial levels with total at most alpha, nonnegative edges, zero diagonal and outgoing sums at most one; transfer/update under weighted Bonferroni                    | Source's graph-level construction and sufficient shortcut/closure characterization; bounded rejection and adjusted-p descriptions with explicit zero/endpoint qualifications                 | Several named procedures have graph representations; not all closed/gatekeeping procedures. Compatible intervals, necessity, broad epsilon-origin and multi-family claims remain separate dependencies            |

These are source-characterization boundaries, not declarations of supported
Protocol operations. Prospective family membership, hypotheses, order and weights
are not inferred from results. The parent studies' endpoint examples are not an
approval to extend R3 beyond its declared one-way design scope.

### T.5 Proof, numerical and variant corrections carried into this synthesis

**Guarantees versus investigator proofs.** For nonempty true-null set T, closed
testing can reject a true elementary null only if its true intersection is rejected;
its local level bound gives the familywise bound. With no true null the event is
empty. This restates the Marcus argument recorded in #236, not a new theorem.
For Bonferroni, the local union bound applies to fixed nonnegative weights summing
to at most one under marginal validity; it establishes neither Simes validity nor
identity of two different gatekeeping algorithms.

The general-I fallback proof and sufficient shortcut/closure proof in #238 Section
3, independently checked in #241 Section 5, are reused as **author derivations**.
The fallback proof bounds each first-true-error event by a deterministic budget
between consecutive true nulls, whose budgets sum to at most alpha. It assumes
fixed order/allocations and valid marginal p-values, not conditional validity after
observed decisions. Shortcut equality uses monotone predetermined local levels,
a common zero-level eligibility rule, arbitrary eligible selection and stopping
only when none is eligible. These are sufficient-direction arguments, not a claim
to have inspected Hommel-Bretz-Maurer 2007 or proved necessity. Bretz's source
statement, imported theorem and Appendix graph argument remain separately identified.

**Zero and endpoint boundaries.** Allocations (.05,0), p=(.1,0) distinguish
positive-level eligibility from literal p<=level continuation. Fixed sequence
stops at the first non-rejection. True p=0 has probability zero under marginal
validity, but a false-null or represented p=0 still changes the pointwise function.
No convention is selected. Clipping an inactive adjusted value to 1 also requires
care at alpha=1: the positive-level direct rule and p-adjusted<=alpha need not agree
there. Any implementation must separately specify its alpha domain and endpoint
meaning. The parent's zero-denominator branch in `remove_vertex` is a script
convention, not a newly attributed sentence of Bretz's paper (#241 N-3).

**Graph scope.** Reuse the named positive-weight examples in #236 and the reviewed
strictly positive 2+2 serial epsilon algebra of #238/#241. The latter proves the
limit of the local weights, not equality of decisions at finite epsilon: at
alpha=.05, gate weights (.9,.1), secondary weights (.5,.5), epsilon=1e-9,
p=(.09,.004,1e-12,1) allows a secondary rejection before the first family clears;
p=(.05,.004,1,1) misses the first gate's equality rejection for every positive
epsilon. Finite-epsilon rounding is not a symbolic limit or error certificate.
PR #237 Sections 5.3-5.4 offer broader investigator proofs; **this synthesis does not
adopt those broader claims**. Their full separate review is not needed merely to
retain the bounded characterization. For a single secondary there are no
secondary-to-secondary edges, so the earlier sentence requiring a separately
defined construction solely on account of its unit weight was too restrictive
(#241 N-2). This correction does not adopt arbitrary-weight or general-family
extensions. Zero original weights that null a normalization denominator remain
an explicit unimplemented case.

**Dmitrienko conflict.** Preserve source inconsistency rather than choose authorial
intent: Algorithm 1/Table I leave singleton gates at original weights; Table II
uses full singleton level. For p=(.024,.003,.026,.002) and weights (.9,.1,.5,.5):

| Local test / weights                   | Adjusted H1 | H2     | H3     | H4     |
| -------------------------------------- | ----------- | ------ | ------ | ------ |
| Bonferroni / raw Algorithm 1           | 2/75        | 3/100  | 13/450 | 2/75   |
| Bonferroni / normalized                | 2/75        | 13/450 | 13/450 | 2/75   |
| Weighted Simes expression / raw        | 2/75        | 3/100  | 13/500 | 12/475 |
| Weighted Simes expression / normalized | 13/500      | 13/500 | 13/500 | 12/475 |

Table III's Bonferroni column matches raw weights; its Simes column matches the
normalized reconstruction. This is a computational observation, not proof of
intended convention. At alpha=.029 the two Bonferroni variants differ on H2.
For k=2 the change is in gate singletons; for k=3 full normalization also changes
proper gate-only pairs. Raw and normalized local Bonferroni tests can both be
valid yet have different values and different Condition-1 behavior. Any later
variant selection requires its own explicit decision and semantic review.

**Simes guarantee partition.** The positive-regression-dependence validity claim
on Dmitrienko p.2393 points to an uninspected unpublished Kling-Benjamini 2002
manuscript. It is not supplied by a Bonferroni weight-sum argument. The four-atom
law in #238/#241 has valid marginal p-values but Simes local error .075 at alpha=.05;
it claims no positive-regression-dependence property. Separately, the #237
Condition-2 examples, reproduced in #238 and independently in #241, show that
raw Simes at p=(.048,.03,.001,.001) can reject both secondaries before either gate,
and normalized Simes at p=(.02,.021,.001,.03) can reject H3 first. The latter full
vector is (1/45,3/100,21/1000,3/100), including the fourth value verified by #241
N-4. These disprove a general gatekeeping-order property under those conventions,
not the uninspected conditional FWER theorem. Simes/resampling are outside this
Bonferroni completion claim; future use reopens both guarantee and ordering work.

**Marcus arithmetic.** The corrected conditional numerical observation is six
rows, seven cells differing by more than .001, and 57/64 agreeing; not 58/64.
At .0005 there are 13 flagged cells, with six additional last-digit discrepancies,
as reported in #237 and checked in #241. The numerical routes share the equal-n
Stirling mixture premise; agreement is not a certified probability proof or an
acknowledged erratum. #238's mutation is a flag-dictionary counting test; #237
Section 4.5 supplies the separately attributed data-path mutation coverage
(#241 N-1). #241 reran with SciPy 1.17.1 versus the author's 1.17.0 and found
identical reported results (N-5). No table is selected as a Protocol oracle. The
handover's supposed F(1,10^9) approximation does not exist in the fixed #236 files;
the correction is retained without claiming a computation that never occurred.

### T.6 Disposition, residuals and exact reopen conditions

**Author result: SR-D CLOSED for the approved bounded source-completion question;
formal steward acceptance PENDING.** The four identified required artifacts for
that question have been inspected, its procedure descriptions/claims have direct
pinpoints, and the conflicts and derivation limits are recorded. SRC-27(b)'s
former required status is changed only by the explicit decision in T.2. This
classification does not certify every cited proof or every variant mentioned in
these papers. The decision-bearing characterization is closed testing, fixed
sequence, original fallback and the bounded weighted-Bonferroni constructions,
with explicit evidence-strength and variant limits. Broader claims are excluded,
not represented as proved or silently waived.

The old 1995-required-but-unread PARTIAL proposal is not reused. No NO_GO is
assigned merely because an excluded Simes variant fails a gatekeeping property;
that is a recorded conflict/reopen trigger outside the bounded characterization.
The following residuals do not become accepted claims through CLOSED:

- Obtain the 1995 chapter if historical attribution, its original formulation or
  a variant depending on it becomes decision-bearing. Use #236 Section 18.1 plus
  #237 Section 14; request only the identified pp.3-18 chapter with identity and
  relevant assumptions/proofs. Its receipt can reopen CLS-02/04 if conflicting.
- Before adjusted-p or rejection-set implementation, declare raw versus
  normalized gatekeeping, positive/zero-weight handling, equality/ties, alpha
  domain, stopping and resource limits. Do not import a script default.
- Reopen source work before Simes/resampling, confidence bounds, directional
  error, improved/modified fallback, general graph necessity/representability,
  epsilon-origin invariance or multi-family procedures are claimed.
- Reopen independent mathematical/source review if #237's broader graph proofs
  are promoted; they remain investigator input here. The existing narrow review
  is not stretched to cover that generalization.
- Before any Marcus Table 1 oracle use, establish the level-probability basis,
  numerical error requirements and printed discrepancies independently. SR-J X-8
  remains separate; supplier 15 does not answer that bibliographic question.

The successor **author source-result** ledger is:

| Disposition      | Holds                                          | Count |
| ---------------- | ---------------------------------------------- | ----- |
| CLOSED           | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L | 8     |
| PARTIAL          | SR-H                                           | 1     |
| INPUT_INCOMPLETE | SR-A, SR-E, SR-J, RSM-01, RSM-02               | 5     |

Only SR-D's author classification changes relative to S.6. This is **not eight
formally accepted holds**. In particular, SR-D's source-basis change is approved,
its synthesis is now reviewable, and its formal hold acceptance is still pending.
Overall INPUT_INCOMPLETE, SOURCE_SET_READY false, NARROW, TRANSFER, other holds,
R3-CAND/RES-ONLY tokens, SR-I acceptance, historical PENDING and R4 remain.
Custody stays 42 numbered originals plus one corrigendum, 43 artifacts. Main
integration and the historical preparation counts require later reconciliation.
The R3 public-opening goal still requires scoped accepted research, RFC integration
and an independent readiness pass; this source-result candidate opens nothing.

### T.7 Validation and focused synthesis-review instruction

This is an append-only synthesis of checked evidence, not a new statistical
implementation. Run format:check, lint:markdown, direct validator and staged
whitespace/prefix/diff checks. Record actual outputs and immutable successor
identity in the PR body. No full pnpm check, tests, typecheck, generated check,
parent 55-check, #237 57-check or #238 diagnostic rerun is claimed for this
synthesis. Existing same-lockfile dependencies may be reused explicitly.

**Execute the following limited independent review at the full fixed Part T
commit in the PR body.** Read AGENTS, ordered Read first files, the commission,
T.1's fixed evidence and the approval account in T.2/PR body. Verify the sole
parent is `00f50638d3389d2d901fcadb5e2d03a5f2bd4f78`, this result is the only
changed file, and all 426114 Parts A-S bytes match the T.1 hash. Check every
input identity against its fixed object; do not silently follow moving heads.
Disclose prior authorship/review and model/context basis; this author's new
synthesis has not been independently reviewed simply because #241 was GO.

Review faithful application of the already approved **two-entry** source-basis
exception. Do not ask the steward to approve it again. Check that 1995 access
remains unverified, no other source obligation is dropped and no own proof is
presented as an inspected original. For all six entries, check sources, hypotheses,
local validity/dependence, order/weights, outputs and exclusions against the fixed
investigation and corrections. In particular decide whether the bounded CLOSED
candidate is justified without hiding a remaining decision-bearing source gap;
return a named gap and its correct disposition if not. Verify the 8/1/5 author
ledger and still-pending formal SR-D acceptance.

Reuse #241's A-D checks and relevant #237 evidence explicitly. Do not repeat the
full investigation, table computations, symbolic epsilon work or general graph
programme without a concrete new issue. Confirm all five #241 optional notes are
carried accurately. Use the same four PDFs in T.3, verify their hashes, and inspect
only source passages needed to assess this synthesis: especially Marcus pp.655-656
for CLS-01 and Wiens pp.212-213 / Dmitrienko pp.2389-2391 for the approved basis.
Reuse the already reviewed numerical/variant passages unless a specific mismatch
requires direct reinspection. No new PDF is needed; the 1995 chapter is not a
prerequisite under T.2's approved scope. If a new claim needs a missing source,
state precisely why and finish unaffected partitions.

Create a fresh neutral branch `review/r3-srd-author-synthesis-20260909` (new suffix
if occupied), with the full Part T commit as sole parent. Add an English report at
`review-inputs/r3-srd-author-synthesis/REVIEW-RESULT.md`; preserve all inputs. Run
format:check, lint:markdown, direct validator and diff check, reporting actual
outputs and omissions. Open a separate draft PR against
`research/r3-srd-author-synthesis-20260909`. Record GitHub commit/parent/tree/blob,
byte count/SHA-256 and whether the reviewed head moved. Return GO or
REPAIR_REQUIRED for this synthesis, with severity and exact conditions. If more
work is needed, include an executable bounded investigation/repair prompt.
Do not grant formal hold acceptance, merge, adopt a procedure, open discussion
or release. A GO permits the separate steward acceptance decision to be presented.

## Part U — Scoped SR-D steward acceptance

**Status: informative steward acceptance record, 2026-09-09; non-normative.**
SR-D is accepted as `CLOSED` for the bounded source-completion characterization
reviewed in Part T. The previously approved CLS-02/04 source-basis exception stays
in effect. This record grants no method selection, implementation, merge,
public-opening or release permission.

### U.1 Fixed inputs and preservation

The fixed author synthesis is PR #242, commit
`8a1b5f9da70c654c03e0deb0229d2abd592aee44`, sole parent
`00f50638d3389d2d901fcadb5e2d03a5f2bd4f78`, tree
`f453bb9d6a5246dcefa4ac1562c9e77fe18b0c49`. Its result blob is
`0077a749490ac6b288eb578e520071e5fe1a1a98`, 454817 bytes, SHA-256
`016605bec49391177c84fa0549ba40e6ef82b3a6873a1150c833a76e81c7de89`.
All 454817 Parts A-T bytes are preserved as an exact prefix here, including the
426114 Parts A-S bytes identified in T.1. Earlier PENDING and INPUT_INCOMPLETE
statements remain historical records rather than being rewritten.

The independent synthesis review is PR #244, commit
`8c2c45d653a8c4d3b08fd4cafa7ef3f21ca01bc4`, sole parent the Part T commit above,
tree `3f95e2a7cdeb026cdc511ca2b426c2647aa9e97a`. Its report at
`review-inputs/r3-srd-author-synthesis/REVIEW-RESULT.md` has blob
`ad5f229d36a8dcec55d8a9fdaed9ce29aaf0acb5`, 35242 bytes, SHA-256
`dd6b3318cbbed36f130704ce24eea0865fae8254aa9307084df3b1152ca0d25a`.
The coordinator fetched these Git objects, re-derived the identities, read the
report in full and confirmed GO with zero BLOCKER, zero SHOULD-FIX and four
optional notes. CI runs 34305483112 (#242) and 34306590720 (#244) completed
successfully. This record uses the fixed #244 commit as sole parent.

All T.1 inputs, reports, scripts, the semantic comparison, original commission and
four original-artifact identities remain unchanged. PR #237 remains a separately
pinned input rather than an ancestor. No PDF, image or full extraction is added.
No new primary reading or statistical rerun is claimed. The source inspection and
calculations reported in #244 are reused with their stated boundaries.

### U.2 Decision presented and explicitly approved

After receiving PR #244, the coordinator presented a concrete proposal to steward
Tasuku Kobayashi: formally accept SR-D source completion only within the already
approved and reviewed scope, retain the unread 1995 attribution and every named
limitation, and leave method adoption, implementation, merge and public opening
outside the decision. The proposal and note handling were recorded in the PR #242
receipt, with a continuation receipt in PR #231. The steward explicitly approved
that proposal in the continuing conversation on 2026-09-09.

The following is the English record of the approved decision, not a verbatim
quotation or an independently signed GitHub vote:

1. Accept SR-D as `CLOSED` for source completion within Part T.2-T.6, supported by
   the fixed author synthesis and PR #244's scoped independent GO. The former
   author candidate is now a steward-accepted source-completion result.
2. Retain the already approved two-entry source-basis exception: Wiens 2003
   pp.212-213 supports CLS-02's prospective fixed sequence at alpha, stopping at
   the first non-rejection; Dmitrienko et al. 2003 pp.2389-2391 supports CLS-04's
   two-family serial weighted-Bonferroni construction and closed-testing bound.
   SRC-27(b), Maurer-Hothorn-Lehmacher 1995, is not required for those two bounded
   characterizations. Its attribution and exact original formulation remain
   unverified. No other source obligation changes, and the historical commission
   remains intact. This restates the existing exception rather than granting a
   second or broader waiver.
3. Accept the scoped independent-pass determination based on #244's disclosed
   separate context and non-involvement relative to the OpenAI-assisted author
   record. Do not infer independence among all prior investigations or model
   identity from Git metadata.
4. Preserve all conflicts, proof-strength qualifications, excluded variants and
   reopen conditions in T.4-T.6, with the clarifications in U.3. Accepting source
   completion does not certify every theorem cited by the originals or authorize
   any procedure as a Protocol operation.

The continuing OpenAI-assisted author/coordinator prepared this record and has
prior involvement in the author synthesis and acceptance discussion. This is not
an independent review or a claim of unaided human authorship. PR #244 Section 2
reports configured and last-served model `claude-fable-5-1`, separate session and
no prior authorship. That testimony is reused as disclosed; no independent model
build verification is claimed. The review is distinct from the author context,
but not an additional model family relative to #236/#237/#241. The approval
accounts in Part T and PR bodies record the same conversation decision, not
multiple independent votes or attestations.

### U.3 Disposition of PR #244's four optional notes

**N-1: source expression versus clipping convention.** Dmitrienko p.2392 states
the uncapped gate expression `p_i/w_i`; `min(1,p_i/w_i)` is the clipped convention
used by the reviewed calculations. They are not identical numerical expressions.
Their threshold decisions agree for `0 <= alpha < 1`. Do not adopt #244 N-1's
extension of that statement to every `alpha <= 1`: at alpha=1, p=1 and w=1/2 give
raw=2 and clipped=1, so raw<=alpha is false while clipped<=alpha is true. The
coordinator checked that example with exact rational arithmetic when receiving
PR #244. Part T.5 already preserves the alpha=1 boundary; this clarification maintains
it. No clipping, endpoint or implementation convention is selected here.

**N-2: explicit decision record.** U.2 states the exact proposal approved by the
steward and its scope, including the earlier two-entry exception and the new
formal source-completion acceptance. It identifies conversation approval honestly
and does not turn the coordinator's wording into a purported verbatim statement,
independent signature or separate vote. The steward was presented the concrete
bounded decision before approving it; no repeat approval is needed.

**N-3: source premise versus author generalization.** Wiens p.213 specifies
prescribed allocations summing to alpha. The reviewed author proof also works
when those allocations sum to at most alpha, because its deterministic first-error
budgets have that bound. The weaker premise is an author derivation, not a new
quotation from Wiens. The source's displayed I=2 proof and its general-I assertion
remain distinct from the separately reviewed author proof.

**N-4: additional source pinpoints.** Supplement T.3's Bretz row with p.587 for
the subclass statement attributed to reference [9], and p.604, reference 2, for
the supplied bibliographic identity of the 1995 chapter. These pinpoints are
reused from PR #236 F-D-09/S-3 as identified by #244 N-4. They do not establish
what the unread chapter says, priority, or the imported theorem's full proof.
No fresh PDF inspection is claimed in this record.

These clarifications leave the reviewed Part T and #244 artifacts immutable.
They do not expand the source basis, alter a tested procedure or change numerical
results. The alpha=1 sentence in #244 N-1 is not an accepted claim.

### U.4 Successor state and remaining work

| Source-result disposition | Holds                                          | Count |
| ------------------------- | ---------------------------------------------- | ----- |
| CLOSED                    | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L | 8     |
| PARTIAL                   | SR-H                                           | 1     |
| INPUT_INCOMPLETE          | SR-A, SR-E, SR-J, RSM-01, RSM-02               | 5     |

The source-result ledger remains 8/1/5. The change from Part T is SR-D's formal
acceptance, not the row counts and not a claim that all eight CLOSED rows have
been formally accepted through this decision. SR-I acceptance and all other hold
states are preserved. Overall remains `INPUT_INCOMPLETE`; `SOURCE_SET_READY`
remains false. `NARROW`, `TRANSFER`, existing `R3-CAND`/`RES-ONLY` tokens and R4
remain unchanged. Custody remains 42 numbered originals plus one corrigendum,
43 artifacts. Historical preparation counts and main integration still require
their separate reconciliation.

T.6's reopen conditions remain in full, including the 1995 chapter if historical
attribution or a dependent formulation becomes decision-bearing; Simes/resampling
validity and gatekeeping order; graph necessity, broad representability,
epsilon-origin and multi-family extensions; confidence bounds and directional
error; improved/modified fallback; Marcus Table 1 oracle work; and raw/normalized,
zero-weight, equality/tie, alpha-domain and stopping conventions before any
implementation. The separate SR-J bibliographic question remains separate.

This acceptance removes the bounded SR-D source-acquisition obstacle. It does not
make the comprehensive source set ready or open public discussion. Remaining
source work, accepted scope/RFC integration, independent readiness review and the
public-opening decision remain necessary. The four supplied PDFs suffice for
this record's reused evidence; no additional 1995 chapter acquisition is requested
for this bounded record-application step.

### U.5 Validation and limited record-application review

This change only appends Part U to the prescribed source-acquisition result.
Actual format:check, lint:markdown, direct validator, whitespace, prefix and
single-file-diff outcomes and immutable successor identity are recorded in the
PR body. Same-lockfile dependencies may be reused. No full pnpm check, tests,
typecheck, generated check, diagnostic rerun, new simulation or full source survey
is claimed. The preceding accepted scientific scope does not change.

Execute this limited review at the full fixed Part U commit in the PR body:

1. Read AGENTS and the ordered Read-first files, the acquisition commission,
   U.1-U.5, fixed Part T and PR #244. Verify the sole parent is
   `8c2c45d653a8c4d3b08fd4cafa7ef3f21ca01bc4`, only the prescribed result file
   changes, and the first 454817 bytes match U.1's exact hash. Verify the fixed
   review's commit/tree/blob/length/SHA-256. Disclose prior involvement and
   model/context basis. Do not silently follow a moving head.
2. Check faithful recording/application of the already approved decision, the
   unchanged two-entry exception, the scoped independence determination, the
   four optional notes and the distinction between acceptance and adoption.
   Do not request the source-basis or formal acceptance approval again.
   Confirm U.3 keeps the alpha=1 exception and distinguishes source premises
   from author derivations. Reuse prior source checks explicitly; no PDF is
   needed by default. Inspect a source only for a concrete new discrepancy.
3. Verify 8/1/5, SR-D's newly accepted source-completion status, preserved other
   holds and residuals, and the unchanged overall/public-opening boundary.
   Review this application record, not a new six-entry or A-D investigation.
4. Start a fresh neutral branch `review/r3-srd-acceptance-20260909` (fresh suffix
   if occupied) from the fixed Part U commit as sole parent. Add an English
   report at `review-inputs/r3-srd-acceptance/REVIEW-RESULT.md`. Preserve all
   inputs. Run format:check, lint:markdown, direct validator and diff check;
   report actual outputs and omissions. Open a separate draft PR against
   `research/r3-srd-acceptance-20260909`, with exact commit/parent/tree/blob,
   byte count/SHA-256 and whether the reviewed head moved. Use the specified
   neutral branch only; do not create a session-labelled mirror.
5. Return GO or REPAIR_REQUIRED for faithful record application. If repair is
   needed, give its exact bounded scope. No merge, procedure adoption,
   additional hold decision, public opening or release. This check does not
   reopen the steward's already approved acceptance merely by being pending.

---

## Part V. SR-J review receipt, clarifications and a pending source-basis proposal

**Status: informative author/coordinator continuation, 2026-09-09. The bounded
SR-J investigation has received an independent GO for record accuracy. SR-J
remains INPUT_INCOMPLETE. The one-entry proposal in V.5 is NOT YET APPROVED.**
This continuation receives PR #250, records its six optional notes and presents
an exact decision for the steward. It does not treat delivery of a review as
approval of a source exception or acceptance of a hold.

### V.1 Fixed inputs and receipt

The coordinator read the complete fixed review and re-derived its parent, tree,
changed-path and blob/byte/hash identities from fetched Git objects. This is the
continuing OpenAI Codex-assisted author context of PR #248, not a new independent
review or a repetition of the reviewer's source inspection.

| Input                                  | Fixed identity                                                                                                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PR #248 author commit / sole parent    | `cbbc51143b82d97b29afaa0902ee2a42456d3166` / `95683fc99403dc614e4722fb2ee7ab2760afed37`                                                                                                                 |
| Author tree                            | `027e6f895664180fc12db7af76043a1fdbdc2853`                                                                                                                                                              |
| Author report                          | `review-inputs/r3-srj-primary-followup/REVIEW-RESULT.md`; blob `572ffb3763a48b57ad77cbde30179728d8a8d5c3`; 27075 bytes; SHA-256 `2c89bd1d153c5f79467aa14009dfa962aff929466ef67cbed34e75b8872a8fbc`      |
| Author diagnostic                      | `review-inputs/r3-srj-primary-followup/check-srj.py`; blob `7cec5f5bc1e31d0075ba1b6cc9184b677a44ffd2`; 5008 bytes; SHA-256 `30c450d417828171a54900d34010945f20c282e779785be6beb22e92f11280d2`           |
| PR #250 review commit / sole parent    | `2ba1f1672af6846414439cb3db9524828d0ac8ac` / `cbbc51143b82d97b29afaa0902ee2a42456d3166`                                                                                                                 |
| Review tree                            | `405354f691b7dd23c562fa8c2007d36db2500959`                                                                                                                                                              |
| Independent review                     | `review-inputs/r3-srj-primary-followup/INDEPENDENT-REVIEW.md`; blob `87fcc45f8a9185884cc2428b83c814629523d7fc`; 28010 bytes; SHA-256 `bb0db4ea2c51b83f545568debd11739a2d0a77e0fdda227e474817e9aa99fbf8` |
| Parts A-U preserved prefix             | blob `7f05c96ea2d45ddfcc762bc1f785652dce51f5c3`; 466932 bytes; SHA-256 `802ca0c5adfe8c489ba5365e694237d25e2d6d84a975cef15b20e4dd2fb9a376`                                                               |
| Commission at both heads               | blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                                                                                                                                         |
| Fetched main snapshot for this receipt | `0abdca8f822d0de3faf35f218f762a951fd75e9e`; the seven Read-first file blobs match the review head                                                                                                       |
| Author CI                              | run `34311196515`, head `cbbc51143b82d97b29afaa0902ee2a42456d3166`: completed / success                                                                                                                 |
| Review CI                              | run `34313417076`, head `2ba1f1672af6846414439cb3db9524828d0ac8ac`: completed / success                                                                                                                 |

PR #250 adds exactly the independent-review file. The author report, diagnostic,
commission, Parts A-U and PR #247 report are unchanged. This Part starts from
PR #250's fixed commit and appends only to the commissioned result. It preserves
all 466932 prior bytes and every prior report and script.

### V.2 Meaning and limits of the received GO

PR #250 Section 10 gives GO for the accuracy of PR #248's bounded author record:
zero BLOCKER, zero SHOULD-FIX, six NICE-TO-HAVE notes. Sections 2 and 7 explicitly
exclude a source waiver, alternative-basis recommendation and hold acceptance.
Those exclusions remain operative. This receipt does not attribute V.5's proposal
to the reviewer.

The review discloses a fresh context, no authorship of PR #248, #247, #245, #244
or Parts A-U, and no participation in an acceptance conversation. It reports
service model `claude-fable-5-1`, different from the OpenAI-assisted author context,
but the same family as the prior PR #244/#247 reviewers. It is not blind: it read
the author report first. These are the reviewer's disclosed process facts, not
independently attested model-build or human-authorship evidence. The coordinator
receives the review on those stated limits; a formal scoped independence decision
can accompany a later hold-acceptance proposal rather than being inferred here.

The review independently re-hashed the three supplied PDFs, inspected the original
passages and checked the author arguments. Its Sections 4-6 report adaptive
nested quadrature, a multinomial cell-count dynamic programme and a SciPy Genz
cross-check, distinct from the author's numerical construction. Its tabulated
values are retained as reviewer evidence, not newly rerun coordinator outputs.
Only the review report was committed; this receipt does not claim that the
reviewer's auxiliary programs have been archived as reproducible code artifacts.

The actual numerical scope is **selected tables/settings**, not every value in
all cited tables: 1991 Tables II/III and the stated Table IV quantities; 1992
Table 1 at two settings, Table 6, and part of Table 7. The full step-up adjusted-p
table, two-sided step-up constants and Hsu coverage simulation were not checked.
The numerical envelope analysis supports that no numerical erratum follows from
rounded printed statistics; it does not identify the unprinted exact data.
The review did not verify the supplier-29 archive, the author's image-viewing
process, the publisher access failure or Naik's DOI, and did not read Naik.
Those remain explicitly attributed to the author custody/access record or unread.

### V.3 Disposition of the six optional notes

All six are incorporated as successor clarifications below. The fixed author
report and diagnostic remain unchanged, so the review still applies to their
exact bytes. No new algorithm, numerical result or generic implementation is
introduced.

| Note | Successor clarification                                                                                                                                                                                                                                                                                                                                                                            |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N-1  | `rectangle()` in the fixed diagnostic is a Table-II calculation with control sample size 11 hard-coded. Its `sizes` argument varies treatment sizes only. It is not a reusable general-control-size API and cannot be applied to Table IV (control size 10) unchanged. This explicit scope comment supplies the note's documentation option; the source code is preserved.                         |
| N-2  | Dunnett-Tamhane 1992 p.164 cites both the m=2 existence proof and the m=2 inequality against Hochberg to the uninspected 1990 technical report. Neither proof is printed in the inspected 1992 text. Its broad superiority claim for m>2 relies on the stated conjectured inequality; it is not promoted as a proved guarantee.                                                                    |
| N-3  | Given valid calibration for every true subset and nondecreasing constants, the author Section 5.1 event argument supplies a familywise error bound for every configuration. The least-favourable-configuration theorem is not needed for that sufficient bound. This does not supply the missing existence proof, validate arbitrary constants or establish an unequal-correlation generalization. |
| N-4  | The value .108618427 at m=1 is the marginal Bonferroni bound, not an adjusted Holm bound. The suffix maximum .170334133 is the corresponding Holm adjusted bound. This terminology supersedes the author's phrase and the diagnostic's printed label "raw Holm"; the values and inequalities remain correct.                                                                                       |
| N-5  | `ed6e9d9b...` was the main snapshot compared during authoring; `0abdca8f...` was the review-time snapshot and is also the fetched snapshot used for this receipt. Neither is a promise that main will remain at that head. The seven Read-first blobs agree at the current comparison.                                                                                                             |
| N-6  | The 1991 Table IV printed p column contains adjusted values, not local tails. PR #250 Section 4 reports local p'_1 about .727 and adjusted p_1 about .911; this is another suffix-maximum example. Those additional numerical values are reviewer results reused here, not part of the author's Table-II-only diagnostic.                                                                          |

### V.4 Three-entry evidence and bibliographic clarification

The original artifacts remain those pinned by PR #248 Section 2 and independently
checked by PR #250 Section 3. Acquisition and source reading are reused, not
recounted as new custody or fresh inspection in this Part.

| Entry             | Inspected primary basis and pinpoints                                                                                                                                                                                                        | Supported boundary retained for integration                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MTO-02 / RES-ONLY | Supplier 42, Dunnett-Tamhane 1991, 634124 bytes / 9 PDF pages, SHA-256 `ed93660e9e8286f1ff2e0026f972c783ac523ac96465e1689e17b4f99a960161`; pp.940-943 rule/model/adjusted p; pp.945-947 examples and limits                                  | Specified control; independent normal groups with common variance and an independent pooled chi-square scale; unequal sizes allowed; labelled-subset step-down maximum calibration and suffix-maximum adjusted p. Source FWER statement and separately attributed sufficient author proof remain distinct. No heteroscedastic, cross-endpoint, average-correlation or step-down-compatible interval guarantee. Naik is still required under the present basis. |
| MTO-03 / RES-ONLY | Supplier 29, Dunnett-Tamhane 1992, 1099979 bytes / 10 PDF pages, SHA-256 `f1144f4ca64d874d1d812cfc6b0b8f9d275d2251619796805d5ac955594386f6`; pp.163-165 calibration and qualifications; pp.168-170 adjusted p, examples and extension limits | Common-correlation normal estimates with common variance and independent chi-square scale; step-up ordered-event calibration, monotone constants and prefix-minimum adjusted p. Existence, imported proofs, conjectured superiority and unequal-correlation extension limits remain. Finite-df zero correlation does not imply independent t statistics.                                                                                                       |
| MCB-01 / RES-ONLY | Supplier 05, Hsu 1984, 649578 bytes / 9 PDF pages, SHA-256 `ac190ceeb614141b64da413248d94e3a3cfe050ab42be31ef7b4dc8db089065b`; pp.1137-1141 model, theorem, calibration and selection interpretation                                         | Each treatment minus the best other treatment; independent equal-size samples from a common continuous location family; simultaneous coverage at least the calibrated level under the source premises. Constrained intervals include zero and need the stated selection interpretation. Nonparametric and best-t extensions are not silently adopted.                                                                                                          |

Both original reference lists (1991 p.947, 1992 p.170) identify Naik's article as
_Some selection rules for comparing p processes with a standard_, volume 4,
pp.519-535, and identify Marcus, Peritz and Gabriel (1976), Biometrika 63:655-660.
PR #250 Section 7 independently confirms this. The current author integration
therefore records **X-3 bibliographic identity supported** and **X-8's source
mapping supported: SRC-18, no additional distinct Marcus original indicated by
these reference lists**. The bibliographic findings do not read Naik or broaden
any mathematical guarantee.

**Correction to T.3:** its sentence referring to "the separate Marcus
single-author paper involved in SR-J X-8" was too definite. X-8 had been an
unresolved identity question; the now-inspected reference lists point to the
three-author SRC-18 paper. This successor replaces that characterization for
current use while preserving the historical Part T bytes. No conclusion about
all Marcus publications or the intent behind unseen drafting is claimed.
SR-D's accepted source scope and its historical evidence are unchanged. A later
integration review should verify this correction against the pinned findings;
no duplicate source or custody increment is introduced.

### V.5 Concrete one-entry source-basis proposal: NOT YET APPROVED

The commission currently requires Naik (1975) within SRC-28. The user previously
reported supplier 38 unavailable; the bounded investigation did not recover it.
The exact acquisition target remains pp.519-535 (17 pages), not an entire book.
No finding that every lawful route is exhausted is made.

The author/coordinator recommends the following **single, narrowly scoped
exception**, for the steward to approve or decline:

1. For MTO-02 source-completion characterization only, use the directly inspected
   Dunnett-Tamhane 1991 pp.940-947 as the decision-bearing primary basis for the
   specified-control step-down construction and the bounded guarantee described
   in V.4 and PR #248 Sections 4.1-4.4, with V.3's corrections.
2. Remove Naik (1975) from the required source-completion inputs **only for that
   bounded MTO-02 characterization**. Retain the original 1975 formulation,
   historical attribution, priority and relationship between variants as
   **unverified**. Do not describe the 1991 procedure as a verified reconstruction
   of Naik's procedure, and do not infer that Naik contains no distinct variant.
3. Preserve all MTO-03 and MCB-01 obligations and every other hold's source basis.
   Keep the 1992 calibration/existence/proof/conjecture limits and all V.4 model,
   family, output and numerical limits. Author arguments remain author mathematics,
   not replacement primary texts or evidence that an unread cited proof was read.
4. This approval would authorize preparing the successor three-entry synthesis
   and its exact-head integration review. It would **not itself accept SR-J as
   CLOSED**, alter the ledger, approve a method or implementation, authorize a
   merge, open public discussion or release anything. Formal hold acceptance would
   be presented separately after that review.

This is a new coordinator proposal based on the already reviewed available-source
characterization. PR #250 neither proposed nor approved it. The earlier SR-D
exception is a process precedent only; it does not authorize this different entry.
Delivery of PR #250 is not a conversation approval of these four points.
Until the steward approves this proposal, Naik remains mandatory and SR-J remains
INPUT_INCOMPLETE. A later approval would be recorded append-only with its exact
scope and conversation provenance; this historical PENDING proposal would remain.

If the steward retains the original requirement, continue seeking the 17-page
Naik article and inspect its rule, model, guarantee and attribution before
proposing closure. If the exception is approved, acquisition remains a targeted
reopen task when its historical/original-formulation claims become necessary or
when the original becomes available. Contradictory evidence, a distinct relevant
variant, or a demand for broader guarantees also reopens the bounded synthesis.
Neither path treats required missing text as merely PARTIAL under the current
commission.

### V.6 Current ledger, checks and next execution

Current dispositions remain unchanged:

| Disposition      | Members                                        | Count |
| ---------------- | ---------------------------------------------- | ----: |
| CLOSED           | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L |     8 |
| PARTIAL          | SR-H                                           |     1 |
| INPUT_INCOMPLETE | SR-A, SR-E, SR-J, RSM-01, RSM-02               |     5 |

Overall INPUT_INCOMPLETE, SOURCE_SET_READY=false, NARROW, TRANSFER, all
R3-CAND/RES-ONLY tokens, scoped SR-D/SR-I acceptances, custody 42+1, all other
holds and R4 remain. No formal SR-J independence or acceptance decision is
recorded. This continuation neither changes source custody nor public readiness.

The receipt's PR body records actual format:check, lint:markdown, direct validator
and diff --check outcomes and its full commit/parent/tree/blob/byte/SHA-256
identity. No scientific script was changed; the prior author and review checks
are reused explicitly. Full pnpm check, tests, typecheck, generated checks,
Phase 1/2 suites and statistical recalculations are not claimed for this receipt.

Next action is the steward's decision on V.5, not another independent scientific
pass solely to acknowledge receipt. If approved, the coordinator records the
exception and prepares the three-entry synthesis, then supplies a fixed-head
integration-review handoff. That review will check identity, preservation of the
approved exception, V.3's six-note treatment, V.4's bibliography correction and
claim-to-source mapping, and all retained limits. The existing two source readings
can be reused explicitly; new direct source checks are needed for any concrete
unresolved or changed scientific claim. A formal source-completion acceptance
proposal follows a satisfactory integration review. No additional permission is
needed to prepare those already described reversible artifacts once V.5 is
approved; hold acceptance and merge remain separate decisions.

---

## Part W. Approved SR-J source-basis exception and three-entry author synthesis

**Status: informative author synthesis, 2026-09-09. V.5's one-entry source-basis
exception is APPROVED. Integration review and formal SR-J acceptance are PENDING.**
The author recommends bounded source-completion closure on the basis below; this
is a candidate for review, not an effective hold decision. The carried ledger
remains 8 CLOSED / 1 PARTIAL / 5 INPUT_INCOMPLETE until a separate acceptance
record changes it. No method, implementation, merge or public opening is approved.

### W.1 Fixed inputs, role and preservation

This is the continuing OpenAI Codex-assisted author/coordinator context that
created PR #248 and Part V. It is not the independent reviewer of PR #250 and
claims no fresh source inspection, new statistical computation or model-build
attestation in this Part. The complete source investigation and independent
review already read in this context are reused explicitly.

| Fixed input                    | Identity                                                                                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Part V / PR #253 commit        | `55a073525ec685278cf40731d61b1b17ec0882aa`                                                                                                                                                              |
| Its sole parent / tree         | `2ba1f1672af6846414439cb3db9524828d0ac8ac` / `31283beac9d9235fb696163b2815d72f4726833f`                                                                                                                 |
| Parts A-V prefix               | result blob `5f4b136bfaa76a2942e112e1e3776b247f148152`; 487459 bytes; SHA-256 `7f3fc1361a8605651b4771d2949e94634e050ce94cf57200f2f026bfd917cdc6`                                                        |
| Author investigation / PR #248 | `cbbc51143b82d97b29afaa0902ee2a42456d3166`; tree `027e6f895664180fc12db7af76043a1fdbdc2853`                                                                                                             |
| Author report                  | `review-inputs/r3-srj-primary-followup/REVIEW-RESULT.md`; blob `572ffb3763a48b57ad77cbde30179728d8a8d5c3`; 27075 bytes; SHA-256 `2c89bd1d153c5f79467aa14009dfa962aff929466ef67cbed34e75b8872a8fbc`      |
| Author diagnostic              | `review-inputs/r3-srj-primary-followup/check-srj.py`; blob `7cec5f5bc1e31d0075ba1b6cc9184b677a44ffd2`; 5008 bytes; SHA-256 `30c450d417828171a54900d34010945f20c282e779785be6beb22e92f11280d2`           |
| Independent review / PR #250   | `2ba1f1672af6846414439cb3db9524828d0ac8ac`; tree `405354f691b7dd23c562fa8c2007d36db2500959`                                                                                                             |
| Independent report             | `review-inputs/r3-srj-primary-followup/INDEPENDENT-REVIEW.md`; blob `87fcc45f8a9185884cc2428b83c814629523d7fc`; 28010 bytes; SHA-256 `bb0db4ea2c51b83f545568debd11739a2d0a77e0fdda227e474817e9aa99fbf8` |
| Acquisition commission         | blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at all three heads                                                                                                                                      |
| Fixed semantic comparison      | commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`; semantic-result blob `8f21526040924b891f64724c2d0fde9ea94eff92`                                                                                      |
| Part V CI                      | run `34313909808`, head `55a073525ec685278cf40731d61b1b17ec0882aa`: completed / success                                                                                                                 |

The parent identities were checked against fetched Git objects and PR #253
metadata. All previous artifacts and the exact 487459-byte prefix are preserved.
Only this Part is appended to the commissioned result. The repository Read-first
instructions already read in this author context continue to apply; this is not
a change to the semantic catalogue, either commission or an authoritative file.

### W.2 Approval account and exact exception

After the coordinator presented Part V.5 and PR #253, steward Tasuku Kobayashi
explicitly approved the limited V.5 change in the continuing conversation and
instructed the coordinator to create the integration record. This paragraph is
an English account of that conversation decision, not a verbatim quotation,
independently signed vote or claim of unaided human authorship. It records one
approval, not additional votes inferred from the prior review or this PR.

The approved four-point scope is recorded here in operational terms:

1. MTO-02's bounded source-completion description uses inspected Dunnett-Tamhane
   1991 pp.940-947 for the specified-control step-down construction and guarantee
   under its stated premises, with the corrections and limits in V.3-V.4 and
   PR #248 Sections 4.1-4.4.
2. Naik (1975) is removed from the required source-completion inputs only for
   that bounded description. Its original formulation, historical attribution,
   priority and relationship between variants remain unverified. The 1991 method
   is not claimed to reconstruct Naik, nor is Naik claimed to contain no distinct
   relevant variant.
3. MTO-03, MCB-01 and every other hold retain their source obligations. The 1992
   calibration, existence, imported-proof and conjecture limits remain; all
   model, family, output and numerical limits remain. Author mathematics is
   separately attributed and is not an unread original's proof.
4. The approval authorizes this synthesis and its exact-head integration review.
   It does not itself accept SR-J as CLOSED, change the ledger, select a method,
   implement, merge, open discussion or release. A formal hold-acceptance proposal
   follows a satisfactory integration review.

This is the successor exception to the assigned source basis for one entry, not
a general revision of the commission's missing-source rule. The earlier
INPUT_INCOMPLETE assessments and Part V's NOT YET APPROVED text were correct at
their dates and remain historical evidence. No retrospective PARTIAL relabeling
occurs. Neither PR #250's GO nor SR-D's earlier exception supplies this approval;
the present conversation does. It is not pending again merely because integration
review remains pending.

### W.3 Source custody, pinpoints and reuse

| Supplier / original       | Bytes / PDF pages | SHA-256                                                            | Reused inspection and claim pinpoints                                                                                                                                                          |
| ------------------------- | ----------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 42 / Dunnett-Tamhane 1991 | 634124 / 9        | `ed93660e9e8286f1ff2e0026f972c783ac523ac96465e1689e17b4f99a960161` | PR #248 Sections 2/4 and PR #250 Sections 3/4: pp.940-943 model, ordered rule, tail adjustment and limitations; pp.945-947 numerical examples, confidence-bound distinction and references     |
| 29 / Dunnett-Tamhane 1992 | 1099979 / 10      | `f1144f4ca64d874d1d812cfc6b0b8f9d275d2251619796805d5ac955594386f6` | PR #248 Sections 2/5 and PR #250 Sections 3/5: pp.163-165 model, ordered-event calibration, cited proofs and conjecture; pp.168-170 adjusted p, examples, generalization limits and references |
| 05 / Hsu 1984             | 649578 / 9        | `ac190ceeb614141b64da413248d94e3a3cfe050ab42be31ef7b4dc8db089065b` | PR #248 Sections 2/6 and PR #250 Sections 3/6: pp.1137-1141 model, target, coverage theorem, calibration and selection interpretation                                                          |

Printed page = PDF page +938 for supplier 42, +160 for supplier 29's pages 2-10
(page 1 is a cover), and +1135 for supplier 05. The original custody routes and
failed Naik retrieval remain in PR #248 Sections 2/7. No new retrieval or reading
is claimed here, and custody remains 42 numbered artifacts plus one corrigendum.
The independent reviewer verified the three original PDFs but not the purchased
archive's hash or the publisher-access account; V.2 preserves that distinction.
No copyrighted PDFs, images or complete extracts are committed.

### W.4 Three-entry impact, guarantee and output map

| Entry / disposition of characterization                                          | Family, target and premises                                                                                                                                                                                                                                                               | Supported rule and output                                                                                                                                                                                                                                                                                                                                                                                                  | Scope limit                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MTO-02 / supports with narrowing under approved basis; RES-ONLY retained         | Fixed test-treatment set versus a specified control; independent normal groups with common unknown variance, independent pooled chi-square scale and fixed pooled df. Unequal group sizes allowed. One-sided mean difference no greater than a specified margin, or two-sided point null. | Relabel observations and sample-size/correlation parameters together; descend through labelled remaining-subset maximum critical values and stop at first nonrejection. Local joint-t tails become adjusted p by a suffix maximum. The source states strong FWER; PR #248 Section 4.2 gives a separate sufficient author proof checked in PR #250 Section 4.                                                               | No heteroscedastic or average-correlation guarantee; no automatic error control across endpoints or control families. Strict critical-value versus inclusive p-value boundary needs a convention before implementation. Table IV uses single-step confidence bounds, not step-down-compatible intervals. Naik lineage and original form unverified.                                             |
| MTO-03 / supports conditional characterization with narrowing; RES-ONLY retained | Fixed family of common-variance, common-correlation normal estimates with independent chi-square scale. Equal test-group sizes with possibly different control size is a supported many-to-one setting.                                                                                   | Increasing statistics: the first crossing rejects it and all larger statistics. A nondecreasing sequence is calibrated by joint ordered-statistic events for each subset size. Implicit local step-up calibrations become adjusted p by a prefix minimum. Conditional strong FWER follows from valid calibration and monotonicity; the sufficient author argument in PR #248 Section 5.1 was checked in PR #250 Section 5. | No unconditional arbitrary-size existence theorem is certified. The two m=2 proofs and least-favourable theorem are referred to an unread 1990 report; larger-m superiority against Hochberg remains conjectural. No unequal-correlation or average-correlation extension, or liberal substitution of step-down constants. Zero correlation at finite df does not imply independent t variates. |
| MCB-01 / supports with target/output clarification; RES-ONLY retained            | Fixed treatment set, independent equal-size samples from a common absolutely continuous location family, translation-equivariant statistics and the source's calibrated event. Target is each location minus the maximum over all OTHER locations.                                        | Under the theorem's event-region premises, simultaneous coverage is at least P*, with P* at least 1/k. Parametric intervals are `[min(Delta_i-d,0), max(Delta_i+d,0)]`, where Delta compares the observed location to the best other observation and d is calibrated to the model/scale. Source theorem and separate author event-inclusion argument remain distinct.                                                      | Not fixed-control or best-including-self inference; not exact equality of coverage at every configuration. Intervals contain zero and require the source's subset/indifference-zone selection interpretation. No guaranteed unique best, arbitrary univariate cutoff, general all-pairs output, or adoption of nonparametric/best-t extensions.                                                 |

The former generic shrinking-subset multivariate-t description of MTO-02/03 is
narrowed here: MTO-03 requires ordered-event calibration, not the step-down
maximum-quantile recursion. No catalogue ID or method is silently redefined.
Prospective family membership and model validity are not inferred from an observed
result. No scientific validity or numerical implementation contract is adopted.

### W.5 Corrections, numerical evidence and bibliography

V.3's six-note dispositions apply in full to this synthesis. Specifically:

- The fixed diagnostic uses control size 11 for Table II; it is not a generic
  many-to-one function and does not compute Table IV unchanged (N-1).
- Both cited m=2 proofs remain unread, and general superiority is not promoted
  from the m>2 conjecture (N-2). The sufficient conditional FWER argument does
  not need the least-favourable theorem, but still needs valid calibration and
  nondecreasing constants; it does not prove their general existence (N-3).
- .108618427 is the marginal Bonferroni bound at m=1, whereas .170334133 is the
  corresponding cumulative Holm bound. The printed p.942 upper-bound sentence
  targets the wrong quantity; local versus adjusted remains explicit (N-4).
- The author/reviewer main commits are time-specific comparison snapshots (N-5).
- Table IV's printed column is already adjusted p, with the additional local
  versus adjusted example attributed to PR #250, not newly calculated here (N-6).

The author Table-II quadrature agrees between orders 64/96, and matches the
printed tables within .001 from rounded inputs; this is not a certified error
bound or exact decimal reproduction. The independent review used a different
construction and reports selected values/settings only, as V.2 details. Its
rounding-envelope check supports that no numerical erratum follows from rounded
inputs; it does not recover exact unprinted observations. Full step-up adjusted-p
tables, two-sided step-up constants and Hsu coverage simulations remain unrun.
The author's 594-case event-inclusion check and the reviewer's additional finite
checks are not coverage proofs. Reviewer numerical programs are not archived in
the committed report; numerical evidence is attributed, not overclaimed as a
complete independently executable oracle packet.

X-3 now has a supported Naik bibliographic identity (1975, volume 4, pp.519-535);
content and lineage remain unverified under W.2. X-8 maps to the existing
Marcus-Peritz-Gabriel 1976 Biometrika 63:655-660 source, SRC-18, on both original
reference lists (1991 p.947; 1992 p.170), confirmed by PR #250 Section 7.
V.4's correction to T.3 is carried forward: the former definite reference to a
separate Marcus single-author paper is not the current characterization. No
additional distinct source or custody item is introduced by this mapping. The
SRC-18 closure-framework reading is already recorded in the accepted SR-D basis;
it is reused as framework context, not a new Naik proof or a reopened SR-D decision.

### W.6 Candidate conclusion, effective ledger and reopen conditions

**Author recommendation: bounded SR-J source-completion CLOSED candidate under
W.2-W.5, subject to integration review and separate steward acceptance.** The
1991 original supports the construction under the approved one-entry basis; the
1992 original supports the conditional characterization with its explicit limits;
Hsu supports the stated constrained MCB target and coverage. This is source
characterization, not certification of every cited theorem or variant. No other
assigned original is removed, and no author proof is relabelled as a primary text.

Per V.5 point 4, this recommendation is not yet applied to the effective ledger:

| Effective disposition                                      | Members                                        | Count |
| ---------------------------------------------------------- | ---------------------------------------------- | ----: |
| CLOSED                                                     | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L |     8 |
| PARTIAL                                                    | SR-H                                           |     1 |
| INPUT_INCOMPLETE, carried pending separate SR-J acceptance | SR-A, SR-E, SR-J, RSM-01, RSM-02               |     5 |

Naik is no longer mandatory for the approved bounded MTO-02 description; the
carried SR-J status is a pending-governance state, not a claim that this approved
exception remains undecided. The conditional post-acceptance counts would be
9/1/4 by moving only SR-J. Those counts are prospective, not current. Formal
acceptance and a scoped independence determination remain PENDING.

Overall INPUT_INCOMPLETE, SOURCE_SET_READY=false, NARROW, TRANSFER, all
R3-CAND/RES-ONLY tokens, scoped SR-D/SR-I acceptances, other holds, custody 42+1
and R4 remain unchanged. Even prospective SR-J acceptance leaves SR-A, SR-E,
RSM-01 and RSM-02 incomplete and SR-H partial; the comprehensive public question
is not ready for opening on this basis alone.

Reopen or investigate further when:

1. Naik becomes available, or the original 1975 formulation, priority, lineage or
   a possible distinct variant becomes decision-bearing; acquire pp.519-535.
2. A broader 1992 existence, least-favourable, superiority or unequal-correlation
   claim is needed; obtain the relevant original proof sources and test the
   chosen variant. The unread 1990 report is not silently waived by W.2.
3. Numerical critical values or adjusted-p computations become implementation
   evidence; supply an independently reproducible method with explicit error,
   rounding, parameter and endpoint conventions. Existing .001 checks are not
   a Public Check tolerance or a reference oracle.
4. Step-down-compatible confidence intervals, directional error, heteroscedastic
   models, cross-family error control, average-correlation approximations or a
   broader Hsu variant/output are proposed; inspect the required primary basis.
5. Contradictory source evidence, a distinct material in-scope variant, or a
   defect in a relied-upon proof/calibration appears. Record it without silently
   expanding the fixed entries or rewriting historical findings.

### W.7 Executable limited integration-review handoff

Use a separate investigator context and the full fixed Part W head supplied in
this PR body. Review the integration, approved exception's faithful scope and
candidate conclusion. Do not ask for V.5 approval again, grant hold acceptance
or treat the prior record-only GO as a review of this new synthesis.

1. Fetch the full fixed head and check it out. Read AGENTS.md, the ordered
   Read-first documents, the commission, Parts V/W, the PR #253 proposal and
   this PR's approval account, and the pinned author and independent reports.
   Disclose prior involvement, authoring context and model evidence limits.
2. Re-derive W.1's commit/parent/tree/blob/byte/hash identities. Confirm the sole
   parent is `55a073525ec685278cf40731d61b1b17ec0882aa`, one changed file and an
   unchanged 487459-byte prefix. Confirm every prior report and script unchanged.
   Compare Read-first files with a named main snapshot; do not infer timeless
   identity. Verify the PR body describes the same fixed head and approval scope.
3. Check W.2 item by item against V.5's four points and the recorded conversation
   approval. Assess faithful recording; no fresh approval is needed for the
   already approved exception. Check that no other source obligation, unverified
   attribution or proof dependency was removed, and acceptance remains pending.
4. Check W.3-W.5 against PR #248 and #250, with their evidence boundaries: all
   three entry assumptions, targets, rules, guarantees, outputs, six notes and
   bibliographic correction. Verify W.6's candidate is genuinely limited and
   the effective/prospective ledgers cannot be mistaken for an accepted closure.
   Do not upgrade the 1992 conjecture or source statement into an inspected proof.
5. Reuse the two prior original-source readings explicitly. No PDF is required by
   default for this integration-only pass. If a concrete disputed or changed
   scientific claim needs original inspection, use the exact three files/hashes
   in W.3 and state the page checked. Request the needed original if unavailable;
   do not replace it with model memory. Full scientific recalculation is not
   required merely to repeat the prior review; disclose actual checks and reuse.
6. Create neutral branch `review/r3-srj-author-synthesis-20260909` from the fixed
   Part W head (a fresh neutral suffix if occupied). Add only an English report
   at `review-inputs/r3-srj-author-synthesis/REVIEW-RESULT.md`. Record BLOCKER,
   SHOULD-FIX, NICE-TO-HAVE and GO or REPAIR_REQUIRED for this integration only.
   Run format:check, lint:markdown, the direct validator and diff --check on the
   resulting tree; record versions, actual outputs and omissions. No full-suite
   or statistical rerun is claimed unless performed.
7. Commit and open a separate draft PR against
   `research/r3-srj-author-synthesis-20260909`. Supply full head, sole parent,
   tree, report blob, bytes and SHA-256. Recheck the reviewed branch has not moved.
   Use neutral names only, no session-labelled mirror. Do not merge or accept
   SR-J, adopt a method, open public discussion or release. If a substantive gap
   remains, provide its bounded repair or additional-investigation instructions.

A satisfactory review allows the coordinator to present a separate concrete
formal SR-J acceptance proposal with a scoped independence account. It does not
make approval automatic. Repository validation and this synthesis's immutable
identity are recorded in its PR body. No statistical program changes in this Part.

---

## Part X. Scoped SR-J steward acceptance

**Status: informative acceptance record, 2026-09-09. SR-J is steward-accepted
CLOSED for bounded source completion within W.2-W.6. Effective ledger: 9 CLOSED /
1 PARTIAL / 4 INPUT_INCOMPLETE. Overall INPUT_INCOMPLETE; SOURCE_SET_READY=false.**
This records the separately approved formal acceptance. It selects no procedure
and authorizes no implementation, merge, public opening or release.

### X.1 Fixed evidence and record provenance

| Fixed input                   | Identity                                                                                                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accepted Part W / PR #254     | commit `4d61db593510466f34ca546430d7796ea42d22e1`; tree `63345297c0c8e17a46bad0d53d6e1d7cdbce2738`; sole parent `55a073525ec685278cf40731d61b1b17ec0882aa`                                         |
| Preserved Parts A-W           | result blob `00bb45c9b59bb8989e870c74e982bdabbea35821`; 512073 bytes; SHA-256 `aec2c605204539e8a5c5b935017e8fa810d2303683c8cb8904ee92e9aecea27d`                                                   |
| Integration review / PR #256  | commit `c9ca0084a377381740396f00174aba653cee0aed`; sole parent `4d61db593510466f34ca546430d7796ea42d22e1`; tree `27f4f27f507d3c1aa154ab8d960792a50f44404e`                                         |
| Integration report            | `review-inputs/r3-srj-author-synthesis/REVIEW-RESULT.md`; blob `b085d7c2c25d28a38c153f7661125dce1f86e4d1`; 30658 bytes; SHA-256 `7fb88e37aa7cabbd8c6c2fbebcfe5bd8ef0019ee9b78947e66405c2f18320695` |
| Original author investigation | PR #248, commit `cbbc51143b82d97b29afaa0902ee2a42456d3166`; report and diagnostic identities in W.1                                                                                                |
| Primary-source review         | PR #250, commit `2ba1f1672af6846414439cb3db9524828d0ac8ac`; report blob `87fcc45f8a9185884cc2428b83c814629523d7fc`; full identities in W.1                                                         |
| Acquisition commission        | blob `3c7ddcc696f0c284213f7efe0da68e747bc238d7`                                                                                                                                                    |
| Part W CI                     | run `34314429603`, head `4d61db593510466f34ca546430d7796ea42d22e1`: completed / success                                                                                                            |
| Integration CI                | run `34315306851`, head `c9ca0084a377381740396f00174aba653cee0aed`: completed / success                                                                                                            |

The continuing OpenAI Codex-assisted author/coordinator read the complete
integration review, re-derived its immutable identities from fetched Git objects
and confirmed its one-file addition and unchanged Part W. PR #256 gives GO for
limited integration, zero BLOCKER, zero SHOULD-FIX and zero NICE-TO-HAVE. This
record begins from that fixed review commit and appends only this Part, preserving
the exact 512073-byte prefix and every prior report and script.
The coordinator does not claim a new independent review or new original reading.

### X.2 Decision presented and approved

The coordinator presented a concrete four-point formal-acceptance proposal in
PR #254's receipt headed "Integration review received; concrete SR-J acceptance
proposal (NOT YET APPROVED)" and in the continuing conversation. Steward Tasuku
Kobayashi then explicitly formally approved it and instructed continuation.
This English account records that one conversation decision. It is not a
verbatim quotation, independently signed GitHub vote, second approval inferred
from review delivery, or claim of unaided human authorship.

The approved decision is applied as follows:

1. Accept SR-J as CLOSED for bounded source completion of MTO-02, MTO-03 and
   MCB-01 exactly within Part W.2-W.6 at the fixed Part W head, on the pinned
   author record, PR #250 primary-source review and PR #256 integration GO.
2. Accept the scoped independence account in X.3 for this decision only, with
   every disclosed context, provider-family, non-blindness and evidence-reuse
   limitation. No finding about every historical investigation follows.
3. Move only SR-J in the effective ledger from INPUT_INCOMPLETE to CLOSED,
   changing 8/1/5 to 9/1/4. Keep every other entry and wider state as in X.4.
4. Preserve all W.6 reopen conditions and the existing V.5/W.2 source-basis
   exception without reapproving or expanding it. Naik remains unread and its
   original formulation, attribution, priority and variant relationship remain
   unverified. The 1992 and Hsu limitations and numerical implementation
   requirements remain. Acceptance does not select a procedure or authorize
   implementation, merge, public opening or release.

The earlier source-basis approval and this formal acceptance are separate
conversation decisions. The former changed one entry's required basis; the
latter accepts the reviewed bounded source-completion result. Historical PENDING
and NOT YET APPROVED text is preserved with its original meaning and superseded
for current use by this Part. Neither decision is made pending again by the
record-application check below.

### X.3 Scoped independence determination and reused evidence

For this bounded source-completion decision, the steward accepts the disclosed
division of work: PR #250 supplies the separate primary-source pass and PR #256
the separate integration assessment.

PR #250 reports a fresh context, no authorship of the author packet, direct
reading of the three originals and independent numerical work, and
service-reported `claude-fable-5-1`. It read the author report first and is not
blind. Its model/process statements remain disclosures, not independently
verified model-build attestations. Its GO concerns the bounded author record.

PR #256 is a separate OpenAI Codex-assisted conversation with no authorship of
the fixed packets in that conversation. Historical summaries were available;
it uses the same provider family as the author. It reused the prior original
readings and performed an integration assessment, without rereading PDFs,
statistical recalculation or a third original-proof audit. It is not blind or
history-free and is not counted as a second different-provider primary-source
pass. The reviewers did not themselves grant this formal independence decision.

The present approval accepts precisely those limits. It does not infer stronger
independence, exact model builds, unaided human authorship or independence of
all earlier work. V.2/W.5's limited numerical coverage and unarchived reviewer
auxiliary-code boundary remain. No new source custody or scientific evidence is
created by this acceptance record.

### X.4 Effective ledger and preserved scope

| Disposition      | Members                                              | Count |
| ---------------- | ---------------------------------------------------- | ----: |
| CLOSED           | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-J, SR-K, SR-L |     9 |
| PARTIAL          | SR-H                                                 |     1 |
| INPUT_INCOMPLETE | SR-A, SR-E, RSM-01, RSM-02                           |     4 |

Only SR-J has moved. This decision does not claim that all nine CLOSED entries
were formally accepted by this one approval. Overall INPUT_INCOMPLETE,
SOURCE_SET_READY=false, NARROW, TRANSFER, every R3-CAND/RES-ONLY token, scoped
SR-D/SR-I acceptances, all other holds, custody 42+1 and R4 remain unchanged.
The remaining four incomplete entries and SR-H partial prevent comprehensive
source readiness; public-opening and release decisions remain separate.

The accepted source scope is W.4's three-entry map with W.2's one-entry exception
and W.5's corrections. All six PR #250 notes remain addressed; X-8 maps to SRC-18
and the T.3 correction remains in force without altering historical bytes or
accepted SR-D scope. No unresolved source assertion becomes a proved theorem.

All five W.6 reopen conditions remain active:

1. Acquire Naik pp.519-535 when available, or when its original formulation,
   priority, lineage or a distinct relevant variant becomes decision-bearing.
2. Obtain primary proof sources for broader 1992 existence, least-favourable,
   superiority or unequal-correlation claims. The unread 1990 report is not
   waived for those claims by the bounded Naik exception.
3. Before numerical implementation use, supply an independently reproducible
   method and explicit error, rounding, parameter and endpoint conventions.
   The .001 author diagnostic is not a Public Check tolerance or certified oracle.
4. Inspect the primary basis for step-down-compatible intervals, directional
   error, heteroscedasticity, cross-family control, average-correlation or broader
   Hsu variants/outputs. Do not inherit such guarantees from this acceptance.
5. Reopen on contradictory evidence, a distinct material in-scope variant or a
   defect in a relied-upon proof/calibration, preserving historical findings.

### X.5 Limited record-application check

Check only faithful recording and application of the approved decision in this
Part at the full fixed head in its PR body. This is not another source-completion
or independence-merits review. The decisions in X.2/X.3 were made by the steward;
do not seek them again or leave the accepted SR-J pending merely because this
record check is pending.

1. Read repository Read-first instructions, the commission, Parts W/X, the fixed
   PR #256 report and PR #254's four-point proposal/approval receipt. Re-derive
   X.1 identities; verify the sole parent is
   `c9ca0084a377381740396f00174aba653cee0aed`, exactly one changed file, and the
   exact 512073-byte Parts A-W prefix and every prior report/script unchanged.
2. Compare X.2 with the four approved points item by item. Check X.3 states the
   accepted independence scope without strengthening either review. Confirm
   9/1/4 moves only SR-J, retains all X.4 conditions and changes no wider state.
   Prior involvement in PR #256 can be disclosed for this limited application
   check; do not present such a check as another independent source investigation.
3. Reuse prior evidence explicitly. No PDF or statistical rerun is required by
   default. If a concrete discrepancy needs original evidence, name the issue
   and inspect only what is necessary. State direct checks, reused evidence,
   process testimony, model/context limits and omissions honestly.
4. From the fixed author head create neutral branch
   `review/r3-srj-acceptance-20260909` (fresh neutral suffix if occupied), add only
   an English report at `review-inputs/r3-srj-acceptance/REVIEW-RESULT.md`, run
   format:check, lint:markdown, direct validator and diff --check, and record
   actual results. Return GO or REPAIR_REQUIRED for faithful record application.
5. Commit and open a separate draft PR against
   `research/r3-srj-acceptance-20260909`, with full commit/parent/tree/blob,
   bytes/SHA-256 and reviewed-head recheck. Do not create a session-labelled
   mirror, merge, broaden the approval, adopt a procedure or open discussion.
   If repair is needed, identify the exact bounded record discrepancy.

The acceptance-record PR body supplies immutable identity and actual validation
outputs. This Part changes no scientific script or authoritative artifact; no
full-suite or statistical execution is claimed unless separately recorded.

## Part Y. Approved supplied-corpus cap and bounded resampling investigation

2026-09-09. The corpus restriction below is approved and effective. The new
scientific findings are an author investigation awaiting separate primary-source
review; no hold acceptance, catalogue split or method adoption occurs here.

### Y.1. Fixed input and completed SR-J sequence

This part starts from PR #259 commit
`72e4dd3b71868cf6423dfefa231751a03a1b2161`, sole parent
`7e513d174de83a564a91bea9168e45f623c58448`, tree
`0b155357bdf8de3a353adab5c2b1e330a8ebd6dc`. Its record-application review is GO,
with zero findings in every category, for the already approved limited SR-J
acceptance. That review is reused in its actual scope, not as resampling evidence.

The preserved Parts A-X result has blob
`b8e6d35ded0071f8a4c7d30d222937fb351092a8`, 523962 bytes, SHA-256
`f18f70b3b6b65accbbcc0b2a7ae27e99a303482b712d30f0a044bfe6bdc5805c`.
Those bytes remain the exact prefix of this file. The PR #259 report remains
blob `3a0dfec6456f7156f4a712e9908838a9edf9c9e6`, 26051 bytes, SHA-256
`c4172ce4a18e5cc305015c3c283b420e6131f50b932b2e99367a8cd85572fcc4`.
The fixed acquisition commission and semantic catalogue remain unchanged.

### Y.2. New steward instruction and its application

The steward confirmed proceeding and explicitly restricted originals to those
already supplied, with a correspondingly limited target scope. This is an
English account of that instruction, not a verbatim transcript or a signed
GitHub vote. It is recorded as approved now; no repeat approval is requested.

For this continuation, use the received corpus only. Do not seek or require
new originals as a condition of completing the bounded work. Claims that need
unprovided texts remain unverified and outside active verification. Earlier
minimum-acquisition requests are superseded for this task; their historical
findings and reopen conditions are preserved. A reference cited by a supplied
paper is not itself a supplied original. This decision neither asserts that
unread sources support a claim nor approves an unspecified substitute.

The inventory is unchanged: supplier 01-37 and 39-43, plus the recorded
corrigendum, or 42+1 artifacts. The inventory is reused from custody records,
not newly rehashed in full. Supplier 47 has no confirmed receipt here. No source
purchase, outside-original lookup or new receipt is part of this continuation.

### Y.3. Bounded source work and excluded claims

The complete claim-routing table and evidence are in
`review-inputs/r3-supplied-source-scope/REVIEW-RESULT.md`, Sections 2-6.
The table below records the active work boundary, not replacement dispositions.

| Entry  | Active supplied-source scope                                                          | Excluded or unresolved scope                                                                                                  |
| ------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| SR-A   | Reuse Welch 1951; next inspect supplied James 1951 (08) and Brown-Forsythe 1974 (33). | Unread Scheffe 1959/Fisher-lineage formulation and historical claims; no new OMN-01 guarantee inferred from Ge.               |
| SR-E   | Existing SRC-06-grounded mathematical scope and its limits remain available.          | Unverified Tukey 1953 manuscript wording, archival identity and priority; no new acquisition prerequisite.                    |
| SR-H   | Reuse prior supported multiple-range findings.                                        | APR-12 characterization, unresolved monotonicity/selection applicability and unsupported numerical reuse; no invented repair. |
| RSM-01 | Ge's explicit maxT/minP formulations and Westfall's included discussion.              | The unread 1993 monograph, all-variant equivalence, and broader outputs are not verified.                                     |
| RSM-02 | Ge's identified FWER algorithm slice and its conditions.                              | Universal pairwise/step-down characterization and unprovided variant texts; no catalogue split.                               |

The previously limited SR-D/SR-I/SR-J acceptances stand. Unread Naik and other
sources behind broader accepted-family claims remain unverified. Within this
capped task, the corresponding reopen conditions mark excluded claims rather
than renewed procurement obligations. Any future expansion would be separately
scoped; the present instruction is sufficient to proceed now.

### Y.4. Supplier 39 findings and limitations

The supplied `39_Ge_2003.pdf` was retrieved and independently rehashed:
3452172 bytes, 77 pages, SHA-256
`abe8095de12b3499f863c3e5aced94a90812f0732d80423374eadafdc20a7f68`.
These facts match N.3. No copyrighted PDF or extracted text is committed.
The main article, discussions and rejoinder are distinguished. The report
specifies pages actually read and nine pages inspected as images; it makes no
full-77-page, FDR/pFDR, empirical-data or historical-software certification.

The directly inspected definitions are (3.6), (3.7), (3.10), (3.11), Boxes 2-4
and the inclusive tie-rank rule (4.1). Sorted tail ranks and common permutation
columns support the fast minP computation. The no-ties p.22 index m is treated
as B, following the explicitly B-valued row and (4.1); the report records this
indexing issue rather than concealing the correction.

Strong control is conditional on valid intersection calibration and compatible
joint subset reference laws. Westfall's discussion pp.62-64 explicitly warns
that identical marginal laws do not suffice for a joint permutation test.
The main-text/rejoinder row-local argument is not accepted as an unconditional
proof of subset pivotality. Report Section 5 gives a sufficient first-error
proof and closure-equivalence derivation as author work, not as an inspected
Westfall-Young monograph proof. Different marginal distributions do not alone
invalidate that conditional proof or require maxT to equal minP.

A new exact author counterexample uses complete-reference `(U,U,1)` and
partial-null `(U,21/20-U,0)`, with U uniform on the 20 positive twentieths.
Both true marginal p-values are valid, but the changed joint subset law gives
FWER=1/10 at alpha=1/20 for complete-null-calibrated step-down minP. This is
separate from Westfall's printed normal example, which was not simulated.

The disposable standard-library program
`review-inputs/r3-supplied-source-scope/check-ge.py` checks all 729 two-by-three
integer tables on {0,1,2}, plus all 20 allocations in a six-sample balanced
example. It compares sorted ranks with direct counts and ordered suffix tests
with all nonempty closure intersections: 4414 closure/shortcut comparisons.
All passed, as did exact finite-table calibration and detection of naive tie
ranking and misaligned permutation rows. The six-sample outputs are maxT
`(1/10,1/5,1/5)` and minP `(1/10,1/5,1/10)`. The program's exact output and
limits are in report Section 6. These checks are not a separate investigator,
a general Monte Carlo theorem or a production numerical oracle.

### Y.5. Ledger and provenance

| Disposition      | Members                                              | Count |
| ---------------- | ---------------------------------------------------- | ----: |
| CLOSED           | SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-J, SR-K, SR-L |     9 |
| PARTIAL          | SR-H                                                 |     1 |
| INPUT_INCOMPLETE | SR-A, SR-E, RSM-01, RSM-02                           |     4 |

There is no transition from X.4 and no reduced-denominator readiness claim.
Overall INPUT_INCOMPLETE, SOURCE_SET_READY=false, NARROW, TRANSFER, all
R3-CAND/RES-ONLY classifications, other holds, R4 and prior limited acceptances
remain unchanged. Missing inputs in the historical full catalogue are compatible
with finishing a smaller informative investigation; they do not authorize
unsupported scientific claims.

This is an OpenAI Codex-assisted author/coordinator continuation with prior work
and historical summaries in context. It is not an independent review or a
verified model-build attestation. New reading, author proofs and diagnostics are
separated from reused prior reviews and the steward's decision. No source-cap
reapproval, formal new hold acceptance, implementation, merge or public opening
is performed.

### Y.6. Validation and concrete handoff

The resulting tree passes `pnpm format:check`, `pnpm lint:markdown`,
`node --import tsx tooling/src/validate.ts` and `git diff --cached --check`,
all exit 0. The exact diagnostic exits 0 with
`ALL BOUNDED GE DIAGNOSTICS PASSED`. Prefix and unchanged-input hashes are
verified directly before submission. Submission commit/tree/blob/bytes/SHA-256
are placed in the draft PR body to avoid self-referential output hashes.
No full pnpm check, tests, typecheck, generated checks, prior statistical
scripts, biological datasets or Monte Carlo simulation is run. No authoritative
artifact changes.

The next review instruction is report Section 8. It fixes the submitted commit,
requires the same supplied PDF, independent proof/numerical checks, and a separate
English report/draft PR on a neutral branch. It expressly excludes new-original
acquisition, renewed scope approval, hold closure, catalogue redefinition and
merge. The present author does not self-certify that independent gate.

After that bounded review, continue with the provided James and Brown-Forsythe
papers in SR-A, reusing the already recorded Welch evidence. The unavailable
Scheffe/Fisher-lineage and Tukey-original claims stay outside active verification.
