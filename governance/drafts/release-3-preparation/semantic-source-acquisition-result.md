# Release 3 Semantic Source-Acquisition Result

**Status: informative source-acquisition result; non-normative; not adopted.** This
report is the completed output of the
[semantic source-acquisition commission](semantic-source-acquisition-commission.md).
It selects no procedure, Contract, identifier, schema, Public Check, implementation,
or release outcome. It does not open public discussion, change the fixed semantic
result, adopt its catalogue, or authorize implementation. It requires independent
exact-head primary-source review before any hold, resampling source gap,
`SOURCE_SET_READY` state, or public-opening gate is treated as closed.

**Overall disposition: `INPUT_INCOMPLETE`** (Section 12). No hold changes state. The
fixed 49-entry catalogue, its `NARROW` program disposition, and both reviewed
`TRANSFER` dispositions are preserved unchanged.

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

RELEASE 3 SEMANTIC SOURCE-ACQUISITION RESULT COMPLETE - INPUT_INCOMPLETE - NO HOLD CLOSED - NARROW PRESERVED - AWAITING INDEPENDENT REVIEW - NOT PROTOCOL ADOPTION
