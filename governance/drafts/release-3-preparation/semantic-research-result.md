# Release 3 Independent Multi-Group Statistical Semantics Research Result

**Status: informative research result; non-normative; not adopted.** This report is the
completed output of the
[semantic research commission](semantic-research-commission.md). It selects no Contract,
procedure, identifier, schema, Public Check, support domain, or release outcome. It is
research input for a possible Release 3 RFC and is subject to independent review before
the RFC scope is treated as ready.

**Disposition: `NARROW`** (Section 20).

## 1. Repository input identity

| Field                  | Value                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Repository             | `licklider-ai/nomue-protocol` (public)                                                                     |
| Pinned commit          | `3137b9043846865cf3d01c848757b97a1c2ef4f0`                                                                 |
| Commit tree            | `c4e74fbf3f2419b3e5c38c81b68a4347dc9b3ef5`                                                                 |
| Commission path        | `governance/drafts/release-3-preparation/semantic-research-commission.md`                                  |
| Commission blob        | `c6760efc8450efe5fe2da6ccce2b2fac4846c066`                                                                 |
| Identity check outcome | All three expected object identities matched before source work began                                      |
| Investigation date     | 2026-09-03                                                                                                 |
| Investigator role      | independent primary-source investigator; did not author the Release 3 scope proposal or any implementation |

Repository inputs read in full at the pinned commit, with git blob identities:

| Input                                                                                                             | Blob                                       |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `AGENTS.md`                                                                                                       | `94dbfdcec7d099f492b08d287dfdd41d876f08fa` |
| `CHARTER.md`                                                                                                      | `1dead95488bae31f80f25424bb3a5515fda119fb` |
| `AUTHORITY.md`                                                                                                    | `7b55e8ba6698d69431d952945a9253c2331122d0` |
| `authority/authority-manifest.yaml`                                                                               | `b8ccf048a8340ebb9b64ca7c68308731f0bff241` |
| `registries/requirements.yaml`                                                                                    | `52bdd7483c7f043376e30d2e78028ff749f49528` |
| `governance/ID-POLICY.md`                                                                                         | `2bb2fe4613d156bb7ddab81d9a24a2e29f4ccdce` |
| `governance/RFC.md`                                                                                               | `9fa3bdd2e273ed9569385e34bce0bbef2559b131` |
| `governance/drafts/release-horizon-r3-r20.md`                                                                     | `46567e685a66375cbd41b9d9f5302f4f7c1aeb57` |
| `governance/drafts/release-3-preparation/README.md`                                                               | `4810e0099a1d88ce7c02ebbe8c71dbbb35ee0444` |
| `governance/drafts/release-3-preparation/semantic-research-commission.md`                                         | `c6760efc8450efe5fe2da6ccce2b2fac4846c066` |
| `governance/drafts/capability-evolution-roadmap.md`                                                               | `d8e1342e0e369629602bd836bd52ef809f7ec0c4` |
| `evidence/research/foundation-identity/fnd-1/README.md`                                                           | `a65a6a52e3b8f1d8b6b3ae2eb880e61137ce3a30` |
| `evidence/research/foundation-identity/fnd-1/2026-08-31-multiplicity-steward-disposition.md`                      | `5e8a69ba571637408c79e1c46d9167f679b57c38` |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-primary-text-closure-result.md`              | `55d81187aa297697badb3266a87584f32c732871` |
| `evidence/research/foundation-identity/fnd-1/2026-09-03-nonclinical-estimand-residual-steward-disposition.md`     | `fb735f45131f851e7c975e56b9bd637b8fd8f364` |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-supplied-completion-result.md` | `236cd949b99b558e207082c74832edf158f3839d` |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-steward-disposition.md`        | `eef626596732c707bd428e39fdf3970155710cea` |
| `evidence/research/foundation-identity/fnd-2/README.md`                                                           | `bcdce161c3105fa5673c3138ebceb99593f2a2bb` |
| `evidence/research/foundation-identity/fnd-2/2026-08-30-source-bounded-steward-disposition.md`                    | `a299d13632e7c258918aede64aa813e96e4ff3d5` |

No private repository, private work-item system, or non-public product implementation was
read or used as evidence.

## 2. Primary-source inventory and access record

### 2.1 Directly inspected primary sources reused within recorded scope

The pinned repository commit contains two steward-accepted, independently close-reviewed
primary-text investigation records whose direct full-text inspections, printed-page
pinpoints, and artifact hashes are reusable research input within their recorded scopes
(`2026-08-31-multiplicity-steward-disposition.md`;
`2026-09-01-all-pairs-successor-source-steward-disposition.md`). This report reuses those
inspections; it performs no re-inspection of the underlying PDFs, and every reused claim
in Section 4 carries the original printed-page pinpoint and the inspected artifact's
SHA-256 as recorded in the frozen result.

| ID     | Source                                                                                                                                                                   | Inspected artifact SHA-256 (as recorded)                           | Inspection record (this repository, pinned commit)                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| SRC-01 | Holm (1979), "A Simple Sequentially Rejective Multiple Test Procedure," Scand. J. Statist. 6(2):65–70                                                                    | `43a5a10279f8bf1752a3e8d4a8407f9717579f8f903be4bcd62d969e82d573af` | `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-primary-text-closure-result.md`, Section 3.1       |
| SRC-02 | Benjamini and Hochberg (1995), "Controlling the False Discovery Rate…," JRSS B 57(1):289–300; DOI `10.1111/j.2517-6161.1995.tb02031.x`                                   | `e56ee4150d8924fc85ecb3f41a0bd59987864a3ada57308ddce0cfb3c6f5ae13` | same record, Section 3.2                                                                                                |
| SRC-03 | Dunnett (1955), "A Multiple Comparison Procedure for Comparing Several Treatments with a Control," JASA 50(272):1096–1121; DOI `10.1080/01621459.1955.10501294`          | `1f5dcf567e9649618c0e330e1b97e954d17229c66d463d9a0801312497b32da0` | same record, Section 3.3                                                                                                |
| SRC-04 | Tukey (1949), "Comparing Individual Means in the Analysis of Variance," Biometrics 5(2):99–114; DOI `10.2307/3001913`                                                    | `e109637fa772b8936e0f1bb452afa742f98684962278414cf358ce729f509fe1` | same record, Section 3.4                                                                                                |
| SRC-05 | Kramer (1956), "Extension of Multiple Range Tests to Group Means with Unequal Numbers of Replications," Biometrics 12(3):307–310                                         | `6640f49f3e33db76b7ee3bfcea356b54cc2e39a87e6149f1c1c13b2005b9ff0c` | `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-supplied-completion-result.md`, §3.1 |
| SRC-06 | Hayter (1984), "A Proof of the Conjecture that the Tukey-Kramer Multiple Comparisons Procedure is Conservative," Ann. Statist. 12(1):61–75; DOI `10.1214/aos/1176346392` | `755a1cd250fd50e13f444d00a630e356c0dd679daeaebc0554b62782e49d98b4` | same record, §3.2                                                                                                       |
| SRC-07 | Spjøtvoll and Stoline (1973), "An Extension of the T-Method of Multiple Comparison…," JASA 68(344):975–978; DOI `10.1080/01621459.1973.10481458`                         | `66fb02dd75c038fccc7fc76238e4dddf64911cd3ccd2197dc7b9ff582fd81418` | same record, §3.3                                                                                                       |
| SRC-08 | Dunnett (1980), "Pairwise Multiple Comparisons in the Homogeneous Variance, Unequal Sample Size Case," JASA 75(372):789–795; DOI `10.1080/01621459.1980.10477551`        | `8c5b9b7a13db3dcd9091fe31844a7b9eebeae56ee2dd9c866330f8fdb8f3dcb1` | same record, §3.4                                                                                                       |

Reuse boundary: the multiplicity steward disposition's reopen conditions state that the
accepted findings are reusable only within the exact paper, variant, theorem, assumption,
attachment, and claim scopes recorded in the frozen results. This report stays inside
those scopes; no reused claim is extended to a later variant or a different procedure.

### 2.2 Sources identified but not inspectable in this research environment

The research environment's outbound network policy denied direct document retrieval for
every scholarly-publisher, preprint, and regulatory host attempted on 2026-09-03. HTTPS
CONNECT requests were rejected at the egress gateway (policy denial, response 403) for at
least: `www.fda.gov`, `www.ema.europa.eu`, `projecteuclid.org`, `arxiv.org`, and
`doi.org`. Only a general-purpose web search index was reachable, returning bibliographic
snippets. Snippets are secondary material and are used below for discovery and
bibliographic identity only, never as the basis of a decision-bearing semantic claim.

Every source in the following list therefore carries the access status
`ACCESS_FAILED_IN_ENVIRONMENT`, and every technique whose semantics rest only on such a
source receives an individual deferred disposition in Sections 8–9. Bibliographic
identity below was cross-checked across at least two independent search results.

| ID     | Source (bibliographic identity from documented search)                                                                                                                                           | Needed for                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| SRC-09 | Welch (1951), "On the Comparison of Several Mean Values: An Alternative Approach," Biometrika 38(3/4):330–336                                                                                    | Heteroscedastic omnibus target, statistic, df                                                    |
| SRC-10 | James (1951), Biometrika 38 (first/second-order heteroscedastic tests)                                                                                                                           | Competing heteroscedastic omnibus                                                                |
| SRC-11 | Brown and Forsythe (1974), Technometrics (modified F for unequal variances)                                                                                                                      | Competing heteroscedastic omnibus                                                                |
| SRC-12 | Scheffé (1953), "A Method for Judging All Contrasts in the Analysis of Variance," Biometrika 40(1/2):87–104                                                                                      | All-contrasts simultaneous procedure; F-projection duality                                       |
| SRC-13 | Šidák (1967), "Rectangular Confidence Regions for the Means of Multivariate Normal Distributions," JASA 62(318):626–633                                                                          | Šidák single-step inequality and its dependence scope                                            |
| SRC-14 | Dunn (1961), "Multiple Comparisons Among Means," JASA 56                                                                                                                                         | Bonferroni-inequality contrast procedure as named primary source                                 |
| SRC-15 | Simes (1986), "An Improved Bonferroni Procedure for Multiple Tests of Significance," Biometrika 73(3):751–754                                                                                    | Simes global test; basis of Hochberg and Hommel                                                  |
| SRC-16 | Hochberg (1988), "A Sharper Bonferroni Procedure for Multiple Tests of Significance," Biometrika 75(4):800–802; DOI `10.1093/biomet/75.4.800`                                                    | Hochberg step-up conditions                                                                      |
| SRC-17 | Hommel (1988), "A Stagewise Rejective Multiple Test Procedure Based on a Modified Bonferroni Test," Biometrika 75(2):383–386                                                                     | Hommel closed-Simes procedure                                                                    |
| SRC-18 | Marcus, Peritz, and Gabriel (1976), "On Closed Testing Procedures with Special Reference to Ordered Analysis of Variance," Biometrika 63(3):655–660                                              | Closed testing principle and strong FWER argument                                                |
| SRC-19 | Shaffer (1986), "Modified Sequentially Rejective Multiple Test Procedures," JASA 81(395):826–831                                                                                                 | Logical-constraint sharpening of Holm                                                            |
| SRC-20 | Games and Howell (1976), "Pairwise Multiple Comparison Procedures with Unequal N's and/or Variances: A Monte Carlo Study," J. Educ. Statist. 1(2):113–125                                        | Heteroscedastic pairwise procedure and its evidence type                                         |
| SRC-21 | Tamhane (1979), JASA 74:471–480; Dunnett (1980b), "Pairwise Multiple Comparisons in the Unequal Variance Case," JASA 75(372):796–800; DOI `10.1080/01621459.1980.10477552`                       | T2/T3/C heteroscedastic pairwise variants                                                        |
| SRC-22 | Benjamini and Yekutieli (2001), "The Control of the False Discovery Rate in Multiple Testing under Dependency," Ann. Statist. 29(4):1165–1188; DOI `10.1214/aos/1013699998`                      | PRDS condition; arbitrary-dependence FDR variant                                                 |
| SRC-23 | Benjamini, Krieger, and Yekutieli (2006), "Adaptive Linear Step-up Procedures that Control the False Discovery Rate," Biometrika 93(3):491–507                                                   | Adaptive/two-stage FDR                                                                           |
| SRC-24 | Storey (2002), "A Direct Approach to False Discovery Rates," JRSS B 64                                                                                                                           | q-value / direct FDR estimation                                                                  |
| SRC-25 | Westfall and Young (1993), _Resampling-Based Multiple Testing_, Wiley                                                                                                                            | maxT/minP resampling procedures; subset pivotality                                               |
| SRC-26 | Bretz, Maurer, Brannath, and Posch (2009), "A Graphical Approach to Sequentially Rejective Multiple Test Procedures," Statistics in Medicine 28(4):586–604                                       | Graphical weighted-Bonferroni family; gatekeeping unification                                    |
| SRC-27 | Dmitrienko, Offen, and Westfall (2003) and related gatekeeping literature; Maurer, Hothorn, Lehmacher (1995); Wiens (2003) fallback                                                              | Serial/parallel gatekeeping and fixed-sequence/fallback                                          |
| SRC-28 | Marcus (1976)/Naik (1975)/Dunnett and Tamhane (1991, 1992) step-down and step-up many-to-one procedures                                                                                          | Stepwise Dunnett variants                                                                        |
| SRC-29 | Newman (1939); Keuls (1952); Duncan (1955); Ryan (1960); Einot and Gabriel (1975); Welsch (1977)                                                                                                 | Multiple-range family and its error-control status                                               |
| SRC-30 | Hsu (1984), "Constrained Simultaneous Confidence Intervals for Multiple Comparisons with the Best," Ann. Statist. 12(3)                                                                          | Comparisons-with-the-best family                                                                 |
| SRC-31 | Kruskal and Wallis (1952), "Use of Ranks in One-Criterion Variance Analysis," JASA 47(260):583–621                                                                                               | Rank-based omnibus (boundary case)                                                               |
| SRC-32 | FDA (2022), _Multiple Endpoints in Clinical Trials: Guidance for Industry_ (final, October 2022)                                                                                                 | Regulatory FWER framing, gatekeeping vocabulary                                                  |
| SRC-33 | EMA/CPMP (2002), _Points to Consider on Multiplicity Issues in Clinical Trials_ (CPMP/EWP/908/99); EMA (2017 draft), _Guideline on Multiplicity Issues in Clinical Trials_ (EMA/CHMP/44762/2017) | Regulatory multiplicity framing                                                                  |
| SRC-34 | Tukey (1953), "The Problem of Multiple Comparisons," unpublished manuscript; archival printing in _Collected Works of John W. Tukey_, Vol. VIII (1994)                                           | Historical attribution of the balanced all-pairs procedure (already a recorded open residual)    |
| SRC-35 | Hayter (1986), "The Maximum Familywise Error Rate of Fisher's Least Significant Difference Test," JASA 81                                                                                        | Protected-LSD error-rate status                                                                  |
| SRC-36 | Hochberg (1974) GT2; Genizi and Hochberg (1978); Gabriel (1978); Stoline (1981); Kurtz (1956); Brown (1979, 1982); Kramer (1957)                                                                 | Competing unequal-size all-pairs procedures (known at report level from inspected SRC-06/SRC-08) |

### 2.3 Access-record summary

- Access date for all attempts: 2026-09-03.
- Reachable: one general-purpose web search index (snippets only).
- Not reachable: every attempted publisher, repository, preprint, and regulatory host
  (egress CONNECT rejected by the environment's network policy).
- Consequence: no new full-text primary inspection was possible in this environment. The
  only full-text primary evidence available is the reused, hash-verified inspection
  record set SRC-01 through SRC-08 (Section 2.1).

## 3. Documented search and inclusion method

### 3.1 Search protocol

- Search date: 2026-09-03.
- Instrument: a general-purpose web search index reachable from the research
  environment. No scholarly index (e.g., a citation database) was directly reachable.
- Language limit: English queries; no date limit applied.
- Verbatim queries executed (13):
  1. `Benjamini Yekutieli 2001 "control of the false discovery rate in multiple testing under dependency" Annals of Statistics projecteuclid`
  2. `FDA guidance "Multiple Endpoints in Clinical Trials" final guidance 2022 PDF`
  3. `Hochberg 1988 "sharper Bonferroni procedure" Biometrika multiple tests of significance`
  4. `Marcus Peritz Gabriel 1976 "closed testing" procedures Biometrika ordered analysis of variance`
  5. `Games Howell 1976 pairwise multiple comparison procedures unequal n unequal variances Journal of Educational Statistics`
  6. `Welch 1951 "comparison of several mean values" Biometrika heteroscedastic ANOVA James 1951 Brown Forsythe 1974`
  7. `Hommel 1988 Simes 1986 "stagewise rejective" modified Bonferroni test Biometrika improved Bonferroni procedure`
  8. `Scheffe 1953 "A method for judging all contrasts in the analysis of variance" Biometrika Sidak 1967 rectangular confidence regions JASA`
  9. `gatekeeping procedures multiple testing serial parallel Dmitrienko Bretz Maurer 2009 graphical approach sequentially rejective fixed-sequence fallback Wiens`
  10. `Westfall Young 1993 resampling-based multiple testing maxT minP permutation multiplicity adjustment subset pivotality`
  11. `Newman 1939 Keuls 1952 Duncan 1955 multiple range test does not control familywise error rate strong sense Ryan Einot Gabriel Welsch REGWQ`
  12. `Storey 2002 "direct approach to false discovery rates" Benjamini Krieger Yekutieli 2006 adaptive linear step-up two-stage`
  13. `Kruskal Wallis 1952 use of ranks one-criterion variance analysis JASA; Shaffer 1986 modified sequentially rejective logical restrictions; Hsu 1984 constrained multiple comparisons with the best Annals of Statistics`

### 3.2 Citation chaining

Backward and forward chaining was performed from two evidence classes:

1. **From inspected text (decision-grade chaining).** The reused full-text inspections
   record explicit citation networks: Hayter (1984) printed p. 62 and p. 70 chain to
   Kurtz (1956), Miller (1966), Spjøtvoll and Stoline (1973), Dunn (1974), Hochberg
   (1974a, 1975), Genizi-Hochberg (1978), Gabriel (1978), Brown (1979, 1982), Stoline
   (1981), Kramer (1957), and Tukey (1953); Dunnett (1980) printed pp. 789–790 and 795
   chain to the same competing unequal-size family plus Steel and Torrie and Box, Hunter
   and Hunter; Benjamini-Hochberg (1995) printed pp. 293–294 chain to Simes (1986),
   Hochberg (1988), Hommel (1988), and Holm (1979); Dunnett (1955) printed p. 1097
   chains to Tukey and Scheffé as the all-comparisons comparators; Kramer (1956) printed
   p. 307 chains to Newman, Keuls, Duncan, and Tukey as the multiple-range family.
2. **From search snippets (discovery-grade chaining).** Snippet-level chaining
   identified the adaptive/dependence FDR successors (SRC-22 through SRC-24), the
   graphical/gatekeeping family (SRC-26, SRC-27), stepwise Dunnett variants (SRC-28),
   the multiple-range successor family REGWQ (SRC-29), Rom (1990) and
   Holland-Copenhaver (1987) as further stepwise sharpenings, and the regulatory
   guidance documents (SRC-32, SRC-33).

### 3.3 Inclusion, exclusion, and deduplication rules

- **Inclusion boundary** (from the commission): any procedure or procedure family
  presented in inspectable primary literature or authoritative guidance as controlling
  or characterizing multiple claims arising from independent one-way continuous-group
  inference, including generic p-value procedures applicable to those claims.
- **Exclusions, each recorded in Section 8 rather than dropped:** procedures whose
  claim target is not the independent one-way continuous design (paired, repeated,
  factorial, clustered); rank and permutation procedures are catalogued as boundary
  cases and transferred rather than silently excluded; Bayesian and estimation-only
  procedures (e.g., shrinkage) are out of the commission's claim classes and are listed
  as excluded items with reasons.
- **Variant distinctness rule** (from the commission): two similarly named procedures
  are distinct entries or explicitly flagged variants when member set, assumptions,
  error criterion, guarantee strength, ordering/tie rule, output, or numerical
  construction differs materially. Applied examples: Holm's Bonferroni-threshold scheme
  versus Holm's independence-based product-form thresholds (both inside SRC-01);
  Kramer's range-test extension versus the Tukey-Kramer interval procedure; the two
  distinct Dunnett 1980 JASA papers (homogeneous variance, SRC-08, pp. 789–795; unequal
  variance T3/C, SRC-21, pp. 796–800); Kramer (1956) versus Kramer (1957).
- **Deduplication:** entries are keyed by (member set, error criterion, guarantee
  strength, statistic/threshold construction), not by eponym.

### 3.4 Catalogue closure rationale

The catalogue (Section 8) was closed on 2026-09-03 when (a) every seed procedure named
by the commission was represented, (b) decision-grade chaining from all eight inspected
texts was exhausted, and (c) two consecutive discovery queries returned no new distinct
procedure class within the inclusion boundary (queries 11–13 returned only already
catalogued classes and sharpenings). The completeness claim is bounded to this method
and date; a later-discovered material procedure triggers the reopen conditions in
Section 18 rather than being silently ignored. The catalogue is frozen by content hash:
the git blob identity of this file at its result commit is the freeze hash (reported
with the result commit).

## 4. Source-established facts

Facts in this section are established by directly inspected primary text (Section 2.1)
and carry printed-page pinpoints from the reused inspection records. Claim IDs are used
by the claim-to-source table (Section 19).

### 4.1 Error criteria and guarantee strengths

- **F-01.** The false discovery rate is defined as `E(Q)` with `Q = V/(V+S)` and `Q = 0`
  when there are no rejections (SRC-02, printed p. 291, Section 2.1).
- **F-02.** Under the complete null the FDR equals the FWER; when some nulls are false
  the FDR is no larger than the FWER, so FWER control implies FDR control and the
  converse fails (SRC-02, printed p. 291, properties (a) and (b)).
- **F-03.** Holm's "multiple level of significance for free combinations" quantifies
  over every non-empty candidate set of true nulls, i.e., it is a strong family-wise
  requirement, not a complete-null-only requirement (SRC-01, printed pp. 65–66).
- **F-04.** A simultaneous confidence guarantee is stated by Dunnett (1955) as a joint
  confidence coefficient over all `p` many-to-one interval statements; the paper does
  not restate it as a family-wise error rate, and that restatement needs a duality step
  absent from the text (SRC-03, printed pp. 1096, 1101; recorded ledger row D18).
- **F-05.** BH's step-up procedure controls the FWER only under the complete null
  configuration (weak control); Simes-type step-up use does not control FWER in the
  strong sense for some configurations, attributed in the text to Hommel (1988)
  (SRC-02, printed pp. 293, 296).

### 4.2 Member sets

- **F-06.** Dunnett (1955) protects exactly the `p` treatment-minus-control differences
  (many-to-one family) (SRC-03, printed pp. 1096, 1101).
- **F-07.** The balanced Studentized-range all-pairs procedure protects all pairwise
  differences `μ_i − μ_j` with joint coverage exactly `1 − α` under the stated model;
  this is stated in inspected later primary text (SRC-06, printed p. 61, expression
  (1.1)) and attributed there to Tukey (1953); the 1949 Tukey paper does not contain
  it (SRC-04, absence, recorded rows T10–T12).
- **F-08.** Holm (1979) and BH (1995) act on an abstract finite set of `n` (resp. `m`)
  hypotheses with valid marginal p-values; membership is an input, not derived from the
  data (SRC-01, printed pp. 65–67; SRC-02, printed pp. 291, 293).
- **F-09.** Hayter (1984) Section 3 extends the pairwise constraint set to all
  contrasts via an identity credited to Tukey (1953), with simultaneous coverage at
  least `1 − α` for all contrasts; the pairwise-width preference over competing
  procedures may not persist for all contrasts, where Scheffé's procedure may be
  preferred (SRC-06, printed pp. 69–70).

### 4.3 Assumptions and dependence conditions

- **F-10.** Holm's Theorem 1 requires no dependence or distributional condition beyond
  computable valid marginal levels; the proof uses only the Boole inequality (SRC-01,
  printed pp. 67–68).
- **F-11.** Holm's product-form thresholds `1-(1-α)^(1/(n+1-k))` are presented for
  independent test statistics and are independence-based (SRC-01, printed p. 68);
  a weighted variant (Scheme 2, Theorem 2) also attains the free-combinations level
  (SRC-01, printed p. 69).
- **F-12.** BH Theorem 1 is stated for independent test statistics and any
  configuration of false nulls, with the sharper bound `(m0/m)q* ≤ q*`; the appendix
  proof treats true-null p-values as independent uniforms; independence among false-null
  statistics is not required (SRC-02, printed pp. 293, 299–300).
- **F-13.** Dunnett (1955) assumes independent normal observations with a common
  variance and an independent variance estimate on stated degrees of freedom; the
  general construction (equations (4)–(7)) is valid at arbitrary group sizes through
  the multivariate-t correlation structure, while the supplied tables are equal-size
  instruments and the two-sided tables are conservative from a bivariate-t bound
  (SRC-03, printed pp. 1099, 1101–1105).
- **F-14.** The Tukey-Kramer unequal-size all-pairs procedure has proved conservative
  joint coverage at least `1 − α` for all `k` and all sample-size configurations under
  independent normal errors with common variance and an independent chi-square variance
  estimate; the inequality is strict when sizes are unequal (SRC-06, printed pp. 62–63
  Theorem and Remark, proof pp. 63–69).
- **F-15.** Kramer (1956) proposes the unequal-replication modification for multiple
  range tests without proof; conservativeness appears only as a referee's remark
  (SRC-05, printed pp. 307–309).
- **F-16.** Spjøtvoll-Stoline's extended T-method uses the `max(a_i, a_j)` multiplier
  with the augmented Studentized range: exact for all linear functions with the
  augmented distribution, at least `1 − α` for pairwise comparisons, and wider than
  Tukey-Kramer whenever sizes differ (SRC-07, printed pp. 975–976; cross-source
  structural comparison recorded in the inspection record).
- **F-17.** Dunnett's (1980) validity evidence for Tukey-Kramer is simulation, not
  proof; the same study reports the harmonic-mean substitution's error rates as
  excessive under diverging sizes and Gabriel's method as capable of excessive error
  under extreme imbalance (SRC-08, printed pp. 790–795).

### 4.4 Outputs and procedure structure

- **F-18.** Holm's procedure is an ordered step-down scheme with thresholds
  `α/(n+1-k)` and stop-at-first-non-rejection; sequential rejection of this type is
  coherent and consonant by construction; inversion yields nothing tighter than
  classical Bonferroni confidence sets (SRC-01, printed pp. 66–68).
- **F-19.** BH's procedure is a step-up scan: take the largest `i` with
  `P(i) ≤ (i/m)q*` and reject that hypothesis and all with smaller ordered p-values
  (SRC-02, printed p. 293, expression (1)).
- **F-20.** Dunnett (1955) outputs one-sided or two-sided simultaneous limits with
  distinct constants and tables per sidedness (SRC-03, printed pp. 1101–1105).
- **F-21.** Tukey (1949) is a three-stage gap/straggler/upper-tail-F grouping
  procedure with a conjectural composite error rate; it contains neither the
  Studentized-range all-pairs procedure nor an unequal-size extension (SRC-04, printed
  pp. 99–105; absence rows T10–T12).
- **F-22.** Numerical dependencies attested in inspected text: multivariate-t
  equicoordinate probabilities reduced to integrals of a multivariate normal against
  the variance-estimate density (SRC-03, printed p. 1103, equations (6)–(7));
  Studentized range upper points `q^{(α)}_{k,ν}` (SRC-06, printed p. 61); interpolated
  numerical tables with stated accuracy limits (SRC-03, printed p. 1105); ordering of
  p-values as a procedural input (SRC-01, SRC-02).

### 4.5 Reusable steward-accepted findings

The multiplicity steward disposition carries forward, as research input: family
membership and the controlled error quantity are meaning-bearing; a procedure name
alone does not communicate theorem conditions, dependence assumptions, member set,
sidedness, balance conditions, or the exact variant; FWER and FDR are different
controlled quantities; many-to-one, all-pairs, omnibus, planned-contrast,
fixed-sequence, and gatekeeping questions remain distinct; later variants stay bound to
their own primary evidence (`2026-08-31-multiplicity-steward-disposition.md`, "Evidence
carried forward"). (**F-23**)

## 5. Investigator inference

Inferences below are drawn from the source-established facts; none is itself a
source-established fact, and none is a Protocol decision.

- **I-01.** The five commission error criteria (per-comparison, weak FWER, strong FWER,
  FDR, simultaneous coverage) are pairwise non-substitutable meaning components: F-02,
  F-03, F-04, and F-05 jointly show that a single scalar "error rate" field cannot
  carry a guarantee; a criterion identifier plus a strength identifier plus a member-set
  identifier is the minimum.
- **I-02.** Simultaneous coverage and strong FWER are related by test-interval duality
  but are not textually interchangeable for the inspected interval procedures (F-04);
  a Protocol surface that reports intervals must therefore carry a coverage-type claim,
  not an error-rate claim, unless a sourced duality step is separately adopted.
- **I-03.** Because Holm-type validity needs only valid marginal p-values (F-10) while
  step-up (Hochberg/Hommel/BH) and product-form variants carry dependence conditions
  (F-11, F-12, SRC-15–SRC-17 pending), the dependence declaration is part of procedure
  admissibility, not an implementation detail. For one-way independent-group designs,
  marginal-level validity is plausible by design for many families, but the p-value
  joint-dependence structure induced by a shared variance estimate is not "independent
  test statistics"; whether shared-error-term p-values satisfy the step-up conditions
  is exactly the kind of claim that requires SRC-15/SRC-16/SRC-22 inspection, and it is
  held open here.
- **I-04.** The all-pairs and many-to-one families have exact or conservative
  simultaneous-interval constructions under the homoscedastic normal model with proved
  status (F-07, F-13, F-14); no inspected source provides a proved heteroscedastic
  analogue, and the heteroscedastic pairwise candidates rest on simulation-type
  evidence pending SRC-20/SRC-21 inspection.
- **I-05.** An omnibus F-type rejection and follow-up comparisons are structurally
  separate claim families: nothing in the inspected texts makes an omnibus rejection a
  license for unadjusted follow-up claims, and Tukey (1949)'s own composite-error
  conjecture (F-21) illustrates that chaining stages changes the guarantee. The common
  "significant ANOVA then post hoc" convention is a software/workflow habit, not a
  sourced guarantee, within the evidence available here.
- **I-06.** Stepwise procedures make ordering, ties, and the stopping rule part of the
  numerical construction (F-18, F-19): a result that does not preserve the ordered
  member list and tie handling is not independently recomputable.
- **I-07.** The inspected record demonstrates concretely that eponyms under-identify
  procedures (F-15 vs F-14; Kramer 1956 vs 1957; the two Dunnett 1980 JASA papers;
  Tukey 1949 vs "Tukey HSD"). Procedure identity for the Protocol must be bound to a
  variant-level definition (member set, criterion, strength, thresholds, ordering,
  sidedness, balance/variance conditions, numerical construction), never to a name.

## 6. Material disagreement and uncertainty

- **D-01.** Evidence-type disagreement in the unequal-size all-pairs lineage: proposal
  without proof (F-15), simulation support (F-17), and later proof (F-14) coexist under
  one common name. Resolved by variant identity, but the historical attribution of the
  balanced procedure to Tukey (1953) remains a recorded open residual (SRC-34).
- **D-02.** Heteroscedastic omnibus candidates (Welch, James, Brown-Forsythe) are
  competing approximations with no inspected primary text in this pass; their exact
  null targets (equality of means under unequal variances; weighted mean targets) are
  reported to differ, and this report does not adjudicate among them
  (`ACCESS_FAILED_IN_ENVIRONMENT`).
- **D-03.** Whether step-up procedures (Hochberg, Hommel) remain valid under the
  dependence induced by a shared pooled variance estimate is unresolved here; the BH
  text itself confines its theorem to independent statistics (F-12), and the
  dependence-extension literature (SRC-22) was not inspectable.
- **D-04.** The multiple-range family's error-control status (Newman-Keuls weak-only
  control; Duncan's inflated criterion) is widely reported but was not verifiable from
  primary text in this environment; the catalogue therefore records the concern as
  unverified rather than as fact.
- **D-05.** Guarantee framing for interval procedures: joint confidence coefficient
  (source language, F-04) versus family-wise error restatement (downstream inference).
  The disagreement is preserved, not harmonized.

## 7. Candidate Protocol decisions (project choices, not source facts)

Each item below is a project choice that the Release 3 RFC could adopt; sources
motivate but do not mandate them.

- **P-01.** Represent every multi-group inferential claim as a typed claim object:
  (member set, error criterion, guarantee strength, procedure variant identity,
  sidedness, level ownership by check version). Motivated by I-01, I-07, F-23.
- **P-02.** No automatic method switch: the variance model, procedure, and family are
  declared; observed data never route the procedure (consistent with the Release 3
  preparation record's boundary exclusions).
- **P-03.** Omnibus Contracts and follow-up Contracts are separate, and no Contract
  treats an omnibus rejection as authorizing another family (I-05). Protected
  hierarchical structures, if ever supported, are their own gatekeeping Contracts with
  explicit ordered families.
- **P-04.** Interval-producing Contracts carry `simultaneous_coverage` claims;
  test-producing Contracts carry `fwer_strong`, `fwer_weak`, `fdr`, or
  `per_comparison` claims; the Protocol never converts one into another without a
  sourced, adopted duality decision (I-02).
- **P-05.** Stepwise procedure results must include the ordered member list, the
  thresholds used, and the tie rule so that decisions are recomputable (I-06).
- **P-06.** Balanced-only numerical instruments are never silently applied to
  unbalanced inputs; the supported construction is declared per size configuration
  (F-13, F-14, F-15).
- **P-07.** Fail-closed exclusions: undeclared design, missing/non-finite values,
  undeclared family membership, or an unsupported (procedure × variance model × size
  configuration) combination refuse rather than degrade (Section 13).

## 8. In-scope technique catalogue

Legend — Evidence: `DIRECT` (inspected primary text reused within recorded scope, §2.1),
`REPORT` (known only through inspected later text's report of it), `SNIPPET`
(bibliographic identity only; access failed). Disposition (commission vocabulary):
`R3-CAND` = Release 3 implementation candidate; `RES-ONLY` = research-only evidence;
`TRANSFER(<target>)` = transfer to a named later release/program; `REJECT` = reject with
rationale. A trailing `†` marks a disposition blocked by a named source-acquisition hold
(Section 17); per the commission's stop rule such entries are DEFER-equivalent until
their hold closes, and nothing may be frozen on them.

### 8.1 Omnibus procedures (one-member family over the global null)

| ID     | Technique                                        | Evidence                                        | Disposition and rationale                                                                                                      |
| ------ | ------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| OMN-01 | Classical equal-variance one-way ANOVA F         | SNIPPET (SRC-12 context; no primary inspection) | `R3-CAND`† — central omnibus candidate; blocked by hold SR-A (primary text for the F test's target and assumptions)            |
| OMN-02 | Welch heteroscedastic omnibus (Welch 1951)       | SNIPPET (SRC-09)                                | `R3-CAND`† — blocked by hold SR-A; target/df semantics unverified here                                                         |
| OMN-03 | James first/second-order tests (James 1951)      | SNIPPET (SRC-10)                                | `RES-ONLY`† — competing approximation; catalogue completeness entry                                                            |
| OMN-04 | Brown-Forsythe modified F (1974)                 | SNIPPET (SRC-11)                                | `RES-ONLY`† — competing approximation; catalogue completeness entry                                                            |
| OMN-05 | Kruskal-Wallis rank omnibus (1952)               | SNIPPET (SRC-31)                                | `TRANSFER(rank-based successor program, Release 5 horizon)` — distributional target; outside the continuous-mean claim classes |
| OMN-06 | Permutation one-way tests (Fisher-Pitman family) | SNIPPET                                         | `TRANSFER(seeded-stochastic reproducibility program)` — blocked on the queued randomness-identity foundation                   |

### 8.2 Generic p-value FWER procedures

| ID     | Technique                                                | Evidence                                                                                                              | Disposition and rationale                                                                                                                                              |
| ------ | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PVL-01 | Bonferroni single-step                                   | DIRECT (partial: SRC-01 pp. 66–68 defines the classical thresholds and confidence-set equivalence) + SNIPPET (SRC-14) | `R3-CAND` — dependence-free by the Boole inequality as used in SRC-01; original-source attribution (Dunn 1961/Bonferroni) still carries hold SR-B for attribution only |
| PVL-02 | Šidák single-step                                        | SNIPPET (SRC-13)                                                                                                      | `R3-CAND`† — blocked by hold SR-B; independence/positive-orthant conditions unverified here                                                                            |
| PVL-03 | Holm step-down (Bonferroni thresholds)                   | DIRECT (SRC-01)                                                                                                       | `R3-CAND` — strong FWER, dependence-free, ordering and stop rule fully sourced (F-03, F-10, F-18)                                                                      |
| PVL-04 | Holm product-form ("Holm-Šidák") step-down               | DIRECT (SRC-01, p. 68)                                                                                                | `R3-CAND` — distinct variant; independence-based; supportable only with a declared independence condition (F-11)                                                       |
| PVL-05 | Weighted Holm (Scheme 2 / Theorem 2)                     | DIRECT (SRC-01, p. 69)                                                                                                | `RES-ONLY` — sourced, but weight semantics add declaration surface not needed by the first slice                                                                       |
| PVL-06 | Simes global test (1986)                                 | SNIPPET (SRC-15)                                                                                                      | `RES-ONLY`† — global-null test only; needed as the basis for PVL-07/PVL-08; hold SR-C                                                                                  |
| PVL-07 | Hochberg step-up (1988)                                  | SNIPPET (SRC-16)                                                                                                      | `R3-CAND`† — blocked by hold SR-C (dependence conditions; relation to Simes inequality)                                                                                |
| PVL-08 | Hommel procedure (1988, closed Simes)                    | SNIPPET (SRC-17)                                                                                                      | `RES-ONLY`† — blocked by hold SR-C; computationally heavier closed procedure                                                                                           |
| PVL-09 | Shaffer logically-restricted sequential rejection (1986) | SNIPPET (SRC-19)                                                                                                      | `RES-ONLY`† — logical-constraint sharpening for pairwise families; hold SR-C                                                                                           |
| PVL-10 | Rom (1990); Holland-Copenhaver (1987) sharpened stepwise | SNIPPET                                                                                                               | `RES-ONLY`† — completeness entries from chaining; hold SR-C                                                                                                            |

### 8.3 Closed testing, hierarchical, and gatekeeping families

| ID     | Technique                                                    | Evidence         | Disposition and rationale                                                                                          |
| ------ | ------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| CLS-01 | Closed testing principle (Marcus-Peritz-Gabriel 1976)        | SNIPPET (SRC-18) | `R3-CAND`† (as framework) — foundational strong-FWER construction; blocked by hold SR-D                            |
| CLS-02 | Fixed-sequence (hierarchical) testing                        | SNIPPET (SRC-27) | `RES-ONLY`† — ordered one-way families (e.g., ordered doses) are R3-relevant; hold SR-D                            |
| CLS-03 | Fallback procedure (Wiens 2003)                              | SNIPPET (SRC-27) | `RES-ONLY`† — hold SR-D                                                                                            |
| CLS-04 | Serial gatekeeping (Maurer-Hothorn-Lehmacher 1995 lineage)   | SNIPPET (SRC-27) | `RES-ONLY`† for R3; `TRANSFER(multiple-endpoint program, Releases 11–15 horizon)` for endpoint families; hold SR-D |
| CLS-05 | Parallel gatekeeping (Dmitrienko-Offen-Westfall 2003)        | SNIPPET (SRC-27) | Same treatment as CLS-04; hold SR-D                                                                                |
| CLS-06 | Graphical weighted-Bonferroni procedures (Bretz et al. 2009) | SNIPPET (SRC-26) | `RES-ONLY`† — unifying representation; candidate future framework; hold SR-D                                       |

### 8.4 All-pairs comparisons and simultaneous intervals (homoscedastic)

| ID     | Technique                                                                  | Evidence                                                                    | Disposition and rationale                                                                                                               |
| ------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| APR-01 | Balanced Studentized-range all-pairs intervals ("Tukey", per SRC-06 (1.1)) | DIRECT (SRC-06)                                                             | `R3-CAND` — exact joint coverage sourced (F-07); historical attribution residual SR-E (Tukey 1953) is attribution-only                  |
| APR-02 | Tukey-Kramer unequal-size all-pairs intervals                              | DIRECT (SRC-05, SRC-06)                                                     | `R3-CAND` — proved conservative coverage for all configurations (F-14, F-15)                                                            |
| APR-03 | Kramer's multiple-range unequal-replication test (as proposed 1956)        | DIRECT (SRC-05)                                                             | `RES-ONLY` — no proved guarantee in the primary text; range-test object, not an interval family (F-15)                                  |
| APR-04 | Spjøtvoll-Stoline extended T (max multiplier, augmented range)             | DIRECT (SRC-07)                                                             | `RES-ONLY` — sourced but dominated for pairwise width under imbalance (F-16); augmented-range numerics add cost                         |
| APR-05 | Hochberg GT2 (Studentized maximum modulus)                                 | REPORT (via SRC-08)                                                         | `RES-ONLY`† — analytic guarantee reported, not inspected; hold SR-F                                                                     |
| APR-06 | Genizi-Hochberg (1978)                                                     | REPORT (via SRC-08)                                                         | `RES-ONLY`† — hold SR-F                                                                                                                 |
| APR-07 | Gabriel (1978)                                                             | REPORT (via SRC-08)                                                         | `REJECT` (as R3 candidate) — inspected simulation reports excessive error under extreme imbalance (F-17); retained as research evidence |
| APR-08 | Harmonic-mean-size substitution into balanced constants                    | REPORT (via SRC-08)                                                         | `REJECT` — inspected simulation reports excessive error rates as sizes diverge (F-17)                                                   |
| APR-09 | Scheffé all-contrasts procedure (1953)                                     | SNIPPET (SRC-12); REPORT (named comparator in SRC-03 p. 1097, SRC-06 p. 70) | `R3-CAND`† — the only named candidate covering arbitrary/post-hoc contrasts; blocked by hold SR-G                                       |
| APR-10 | Newman-Keuls step-down range (1939/1952)                                   | SNIPPET (SRC-29); REPORT (Newman as comparator in SRC-04)                   | `RES-ONLY`† — reported weak-only FWER control unverified; provisional non-candidate; hold SR-H                                          |
| APR-11 | Duncan multiple range test (1955)                                          | SNIPPET (SRC-29); REPORT (named in SRC-05 p. 307)                           | `RES-ONLY`† — reported not to control FWER; provisional non-candidate; hold SR-H                                                        |
| APR-12 | Ryan / Einot-Gabriel / Welsch (REGWQ) corrected range procedures           | SNIPPET (SRC-29)                                                            | `RES-ONLY`† — hold SR-H                                                                                                                 |
| APR-13 | Fisher (protected) LSD                                                     | SNIPPET (SRC-35)                                                            | `RES-ONLY`† — reported strong-FWER failure for `k > 3`; hold SR-H                                                                       |
| APR-14 | Hayter's modified LSD (1986)                                               | SNIPPET (SRC-35)                                                            | `RES-ONLY`† — hold SR-H                                                                                                                 |

### 8.5 Heteroscedastic pairwise procedures

| ID     | Technique                                 | Evidence         | Disposition and rationale                                                                                                                 |
| ------ | ----------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| HET-01 | Games-Howell (1976)                       | SNIPPET (SRC-20) | `R3-CAND`† — seed procedure; snippet evidence indicates Monte Carlo justification, so guarantee type itself needs verification; hold SR-I |
| HET-02 | Tamhane T2 (1979)                         | SNIPPET (SRC-21) | `RES-ONLY`† — hold SR-I                                                                                                                   |
| HET-03 | Dunnett T3 and C (1980b, JASA 75:796–800) | SNIPPET (SRC-21) | `RES-ONLY`† — hold SR-I; distinct paper from SRC-08 (variant-identity example)                                                            |

### 8.6 Many-to-one and comparisons-with-the-best

| ID     | Technique                                           | Evidence         | Disposition and rationale                                                                            |
| ------ | --------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| MTO-01 | Dunnett many-to-one simultaneous intervals (1955)   | DIRECT (SRC-03)  | `R3-CAND` — general construction sourced at arbitrary sizes; instrument-level caveats sourced (F-13) |
| MTO-02 | Step-down Dunnett (Naik 1975; Dunnett-Tamhane 1991) | SNIPPET (SRC-28) | `RES-ONLY`† — hold SR-J                                                                              |
| MTO-03 | Step-up Dunnett-Tamhane (1992)                      | SNIPPET (SRC-28) | `RES-ONLY`† — hold SR-J                                                                              |
| MCB-01 | Hsu's multiple comparisons with the best (1984)     | SNIPPET (SRC-30) | `RES-ONLY`† — selection-type member set outside the commission's core claim classes; hold SR-J       |

### 8.7 FDR procedures

| ID     | Technique                                            | Evidence         | Disposition and rationale                                                                                                                                 |
| ------ | ---------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FDR-01 | Benjamini-Hochberg linear step-up (1995)             | DIRECT (SRC-02)  | `R3-CAND` — fully sourced under independence (F-01, F-02, F-12, F-19); the dependence condition for one-way shared-variance p-values is part of hold SR-K |
| FDR-02 | Benjamini-Yekutieli (2001): PRDS and `Σ1/i` variants | SNIPPET (SRC-22) | `R3-CAND`† — blocked by hold SR-K (PRDS definition and its coverage of one-way statistics)                                                                |
| FDR-03 | Adaptive / two-stage BH (BKY 2006; adaptive `m0`)    | SNIPPET (SRC-23) | `RES-ONLY`† — hold SR-K; explicitly listed by SRC-02 as outside its own theorems (F-12 boundary)                                                          |
| FDR-04 | Storey direct FDR / q-value (2002)                   | SNIPPET (SRC-24) | `TRANSFER(estimation-oriented FDR program, later release)` — estimator-based target; different output object                                              |

### 8.8 Resampling-based multiplicity procedures

| ID     | Technique                                     | Evidence         | Disposition and rationale                                                                                                                                      |
| ------ | --------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RSM-01 | Westfall-Young maxT / minP (1993)             | SNIPPET (SRC-25) | `TRANSFER(seeded-stochastic reproducibility program)` — subset-pivotality and permutation semantics need both source work and the queued randomness foundation |
| RSM-02 | Permutation-based pairwise/step-down families | SNIPPET          | Same as RSM-01                                                                                                                                                 |

### 8.9 Authoritative guidance (not procedures; framing sources)

| ID     | Item                                      | Evidence         | Disposition                                                               |
| ------ | ----------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| GUI-01 | FDA Multiple Endpoints guidance (2022)    | SNIPPET (SRC-32) | `RES-ONLY`† — required reading for FWER framing before the RFC; hold SR-L |
| GUI-02 | EMA PtC (2002) and draft guideline (2017) | SNIPPET (SRC-33) | `RES-ONLY`† — hold SR-L                                                   |

### 8.10 Recorded exclusions (not silently dropped)

| Excluded item                                               | Reason                                                                                                                             |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Paired/repeated/clustered/factorial multiplicity procedures | Outside the one-way independent design boundary; factorial transfers to Release 4                                                  |
| Bayesian multiple-comparison and shrinkage approaches       | Different inferential object; no p-value/coverage claim class in this commission; Releases 16–20 horizon                           |
| Equivalence/non-inferiority multiplicity                    | Different claim direction/margin semantics; Releases 11–15 horizon                                                                 |
| Selective-inference / post-selection inference families     | Different conditioning target; candidate later research line                                                                       |
| Tukey (1949) three-stage gap/straggler/F procedure          | Sourced (F-21) but composite guarantee is conjectural in its own text; `RES-ONLY`, catalogued in §4/§19 rather than as a candidate |

Catalogue totals: 49 procedure/variant entries across §8.1–§8.8 (plus 2 guidance
entries and 5 recorded exclusions). Dispositions: 15 `R3-CAND` (7 unblocked — PVL-01,
PVL-03, PVL-04, APR-01, APR-02, MTO-01, FDR-01 — and 8 blocked by SR-x holds),
27 `RES-ONLY` (counting CLS-04/CLS-05 by their primary Release 3 label), 5 `TRANSFER`
(OMN-05, OMN-06, FDR-04, RSM-01, RSM-02), 2 `REJECT` (APR-07, APR-08).

## 9. Cross matrix: member set × error criterion × procedure × assumptions × outputs × numerical dependencies × disposition

| Procedure (ID)                          | Member set                                         | Error criterion / strength                                               | Assumptions (as sourced or pending)                                                               | Outputs                                          | Numerical dependencies                                              | Disposition |
| --------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------- | ----------- |
| ANOVA F (OMN-01)                        | one-member omnibus                                 | per-test level on the global null                                        | normal, independent, common variance (pending SR-A)                                               | F statistic, p-value                             | F tail (num/denom integer df)                                       | `R3-CAND`†  |
| Welch omnibus (OMN-02)                  | one-member omnibus                                 | approximate per-test level                                               | normal, independent, unequal variances (pending SR-A)                                             | statistic, p-value                               | F tail with non-integer denominator df                              | `R3-CAND`†  |
| Bonferroni (PVL-01)                     | any declared finite family                         | strong FWER                                                              | valid marginal p-values only (F-10 basis)                                                         | rejection set; adjusted p; rectangular intervals | scalar division; per-member quantiles                               | `R3-CAND`   |
| Šidák (PVL-02)                          | any declared finite family                         | strong FWER under its dependence condition                               | independence/orthant condition (pending SR-B)                                                     | rejection set; adjusted p                        | product form `1-(1-α)^{1/m}`                                        | `R3-CAND`†  |
| Holm (PVL-03)                           | any declared finite family                         | strong FWER ("free combinations")                                        | valid marginal p-values; no dependence condition (F-10)                                           | ordered rejection set; adjusted p                | sort with tie rule; thresholds `α/(n+1-k)`                          | `R3-CAND`   |
| Holm product-form (PVL-04)              | any declared finite family                         | strong FWER                                                              | independent test statistics (F-11)                                                                | ordered rejection set                            | sort; product-form thresholds                                       | `R3-CAND`   |
| Hochberg (PVL-07)                       | any declared finite family                         | strong FWER under Simes-type conditions                                  | pending SR-C                                                                                      | step-up rejection set; adjusted p                | sort; step-up scan                                                  | `R3-CAND`†  |
| Hommel (PVL-08)                         | any declared finite family                         | strong FWER under Simes-type conditions                                  | pending SR-C                                                                                      | rejection set; adjusted p                        | closed-family combinatorics                                         | `RES-ONLY`† |
| Closed testing (CLS-01)                 | closure of declared family                         | strong FWER (reported)                                                   | valid local level-α tests (pending SR-D)                                                          | rejection set over elementary hypotheses         | intersection-test evaluations (up to `2^m − 1`)                     | `R3-CAND`†  |
| Fixed-sequence/gatekeeping (CLS-02..06) | ordered/structured families                        | strong FWER (reported)                                                   | prespecified order/weights (pending SR-D)                                                         | ordered rejection set; α-propagation record      | graph/weight bookkeeping                                            | `RES-ONLY`† |
| Tukey balanced (APR-01)                 | all pairs                                          | simultaneous coverage, exact `1 − α`                                     | normal, independent, common variance, balanced, independent χ² variance estimate (F-7/F-14 model) | simultaneous intervals; derived rejection set    | Studentized range quantile `q_{k,ν}`                                | `R3-CAND`   |
| Tukey-Kramer (APR-02)                   | all pairs                                          | simultaneous coverage, ≥ `1 − α` (strict under imbalance)                | as above without balance (F-14)                                                                   | simultaneous intervals                           | Studentized range quantile; per-pair `((1/n_i+1/n_j)/2)^{1/2}`      | `R3-CAND`   |
| Spjøtvoll-Stoline (APR-04)              | all linear functions / pairs                       | exact (augmented range) for linear functions; ≥ `1 − α` pairs            | normal, common variance, arbitrary known `a_i` (F-16)                                             | simultaneous intervals                           | Studentized augmented range quantile; `max(a_i,a_j)`                | `RES-ONLY`  |
| GT2 / Genizi-Hochberg (APR-05/06)       | all pairs                                          | simultaneous coverage (reported analytic)                                | pending SR-F                                                                                      | simultaneous intervals                           | Studentized maximum modulus; special tables                         | `RES-ONLY`† |
| Gabriel / harmonic-mean (APR-07/08)     | all pairs                                          | nominal coverage not attained under imbalance (F-17)                     | —                                                                                                 | —                                                | —                                                                   | `REJECT`    |
| Scheffé (APR-09)                        | all contrasts (data-dependent post-hoc admissible) | simultaneous coverage over the contrast cone                             | normal, common variance (pending SR-G)                                                            | simultaneous intervals for every contrast        | F quantile; `sqrt((k−1)F)` projection                               | `R3-CAND`†  |
| Range step-downs (APR-10..12)           | all pairs (stagewise subsets)                      | reported weak-only or non-control (pending SR-H)                         | pending SR-H                                                                                      | grouping/rejection sets                          | Studentized range at varying span                                   | `RES-ONLY`† |
| Games-Howell (HET-01)                   | all pairs                                          | approximate simultaneous coverage / FWER (evidence type pending)         | normality; unequal variances; Welch-type df (pending SR-I)                                        | intervals/tests per pair                         | Studentized range; per-pair Welch-Satterthwaite df                  | `R3-CAND`†  |
| Dunnett many-to-one (MTO-01)            | k−1 treatment-vs-control                           | simultaneous coverage (joint confidence coefficient)                     | normal, independent, common variance, independent variance estimate (F-13)                        | one- or two-sided simultaneous intervals         | equicoordinate multivariate-t probabilities; correlation from sizes | `R3-CAND`   |
| Step-down/up Dunnett (MTO-02/03)        | k−1 many-to-one                                    | strong FWER (reported)                                                   | pending SR-J                                                                                      | ordered rejection set                            | multivariate-t at shrinking subset sizes                            | `RES-ONLY`† |
| BH (FDR-01)                             | any declared finite family                         | FDR ≤ `(m0/m)q*` under independence                                      | independent true-null p-values (F-12); dependence case pending SR-K                               | step-up rejection set; adjusted p (`q`-style)    | sort; linear thresholds `(i/m)q*`                                   | `R3-CAND`   |
| BY (FDR-02)                             | any declared finite family                         | FDR under PRDS; or arbitrary dependence with `Σ1/i` inflation (reported) | pending SR-K                                                                                      | rejection set; adjusted p                        | harmonic-sum constant                                               | `R3-CAND`†  |
| Adaptive BH (FDR-03)                    | any declared finite family                         | FDR with estimated `m0` (reported)                                       | pending SR-K                                                                                      | rejection set                                    | `m0` estimator                                                      | `RES-ONLY`† |
| Westfall-Young (RSM-01)                 | any declared finite family                         | strong FWER given subset pivotality (reported)                           | resampling validity; pending source + randomness foundation                                       | adjusted p; rejection set                        | RNG identity, permutation scheme, replicate count                   | `TRANSFER`  |
| Kruskal-Wallis (OMN-05)                 | one-member omnibus                                 | per-test level on a distributional null                                  | exchangeability-type conditions (pending)                                                         | H statistic, p-value                             | rank transform; χ² or exact tail                                    | `TRANSFER`  |

## 10. Proposed dependency order for separately closable Release 3 Contracts / Public Checks

Project-choice proposal (not a decision); each stage is separately closable and none
implies the next:

1. **D0 — Design and family declaration layer.** One-way independent `k ≥ 3` group
   design object; explicit group membership; comparison-family object with enumerated
   member set, criterion, strength, sidedness, selection-timing declaration. Everything
   below depends on D0.
2. **D1 — Omnibus Contracts** (OMN-01, OMN-02 as separate Contracts; no auto-switch).
   Requires hold SR-A closure plus the F-tail numerical lane.
3. **D2 — Generic p-value FWER Contracts over declared families** (PVL-01, PVL-03,
   PVL-04). Sourced now; needs only D0 and scalar/sort numerics. Can close before D1.
4. **D3 — Many-to-one simultaneous intervals** (MTO-01). Requires the
   multivariate-t/equicoordinate numerical lane (heaviest numerics; own oracle work).
5. **D4 — All-pairs simultaneous intervals** (APR-01, APR-02). Requires the
   Studentized-range numerical lane.
6. **D5 — Step-up FWER Contracts** (PVL-07, PVL-08) after SR-C; **FDR Contracts**
   (FDR-01 now under an explicit independence declaration; FDR-02 after SR-K).
7. **D6 — All-contrasts (Scheffé) Contract** after SR-G; the only lane admitting
   data-dependent post-hoc contrasts.
8. **D7 — Heteroscedastic pairwise Contracts** (HET-01 family) after SR-I.
9. **D8 — Closed testing / gatekeeping frameworks** after SR-D.
10. **Deferred out of Release 3:** resampling lane (RSM) and rank lane (OMN-05) per
    their transfers.

## 11. Required declarations

To make the supported claims machine-checkable, a Record in this family needs at least
(declaration, not inference, in every case):

- independent-groups assertion and the experimental-unit definition (cannot be inferred
  from row order, labels, or values);
- explicit per-observation group assignment; number of groups `k`; per-group sizes;
- one-way design assertion, including the assertion that the data are not a flattened
  factorial/blocked/clustered/repeated design;
- outcome scale and finiteness declaration; the admitted observation set (no silent
  removal — an observation is admitted or the check refuses);
- analysis population definition and exclusion records;
- comparison-family object: family class (one-member omnibus / all-pairs / many-to-one
  / finite planned contrasts / data-dependent post-hoc cone / hierarchical structure),
  enumerated member set or generating rule, contrast coefficient vectors for planned
  contrasts, designated control group for many-to-one, ordering and weights for
  hierarchical families;
- selection-timing declaration: the family and procedure were fixed before outcome
  inspection (with the verification limits stated in Section 14, attack 6);
- variance-model declaration (common variance vs per-group variances) chosen a priori,
  never derived from observed sample variances;
- procedure variant identity (Protocol identifier, not an eponym), sidedness, and the
  claimed error criterion + guarantee strength;
- for stepwise procedures: the tie rule and the ordering convention;
- for any resampling procedure (deferred): randomness identity and replay class.

Confidence level, tolerances, and the supported estimand remain owned by check
versions, never by Records (existing repository rule).

## 12. Result fields

Candidate result surface per claim family (project choice):

- statistic value(s) and the reference distribution identity with all parameters,
  including non-integer degrees of freedom as exact binary64 values;
- per-member results keyed to the declared member set: estimate, interval bounds (for
  interval families), adjusted p-value (for p-value families), rejection indicator;
- the guarantee block: error criterion, strength (`per_comparison` / `fwer_weak` /
  `fwer_strong` / `fdr` / `simultaneous_coverage`), the check-version-owned level, and
  the procedure variant identifier;
- for stepwise procedures: the ordered member list actually used, thresholds per rank,
  and the stopping index, sufficient for independent recomputation;
- for simultaneous intervals: sidedness and the critical constant used;
- no overall "significant"/"verified" scalar; no cross-family aggregate.

## 13. Refusal classes

Fail-closed refusal candidates (each a candidate reason-code family, not an issued
code):

1. undeclared or inconsistent design (missing group assignment; `k < 3`; dependence
   indicators declared);
2. flattened-design declaration absent or contradicted by declared structure;
3. missing, non-finite, or non-admitted observations in a required cell;
4. empty or too-small groups for the selected procedure (e.g., any `n_i < 2` where a
   within-group variance is required);
5. zero within-group variance where the statistic's denominator degenerates
   (procedure-specific support-domain refusal);
6. unsupported (procedure × variance model) combination — e.g., a common-variance
   all-pairs Contract invoked with a per-group-variance declaration;
7. unsupported (procedure × size configuration) combination — e.g., a balanced-only
   instrument invoked with unequal sizes (F-13, F-15);
8. family/procedure mismatch — e.g., many-to-one constants requested for an all-pairs
   member set;
9. selection-timing declaration absent for a data-dependent post-hoc family that
   requires it, or a planned-contrast family without fixed coefficients;
10. guarantee mismatch — a requested claim strength the procedure does not carry
    (e.g., `fwer_strong` from a weak-only procedure);
11. output-coherence refusal — mixing adjusted p-values of one family with intervals of
    another as one claim;
12. undeclared randomness for any stochastic procedure (entire lane deferred);
13. unsupported interpretation bundle (existing rule; fail closed).

## 14. Counterexample verification results

Each commissioned attack, with the boundary that rejects it or the deferral it forces.
"Declaration" refers to Section 11; "refusal" to Section 13.

1. **Identical values routed to different valid procedures with different meanings.**
   Accepted as inherent: meaning lives in the declared family + procedure + guarantee,
   not in values (F-23, I-07). The claim object (P-01) makes the two results distinct,
   non-comparable claims; no boundary needs to forbid the routing, only the conflation.
2. **Omnibus rejection presented as "every group differs".** Rejected by member-set
   semantics: the omnibus family has one member (global null); per-group or per-pair
   claims require their own declared family (I-05; P-03). Result surface carries no
   per-pair field for an omnibus Contract.
3. **Non-rejection presented as evidence of equality.** Rejected by result semantics:
   no equality claim field exists; non-rejection is not an equivalence claim
   (equivalence families are excluded to a later release, §8.10).
4. **Post-hoc/pairwise claim inferred from an omnibus result.** Rejected: follow-up
   claims exist only inside their own declared family with its own guarantee (P-03);
   the "omnibus authorizes post hoc" convention is unsourced here (I-05).
5. **Pairwise procedure applied under an unsupported variance model.** Refusal class 6
   plus the a-priori variance-model declaration; observed variances never select the
   model (P-02).
6. **Family changed after inspecting unadjusted p-values or group means.** Requires
   the selection-timing declaration; verification limit: a value-level verifier cannot
   detect timing violations from the data alone, so this boundary is declaration-plus-
   provenance, and stronger assurance is exactly open hold `FND1-H07`
   (attestation/provenance for procedure-selection assurance). Recorded as a
   permanent residual risk, not silently claimed as checkable.
7. **Weak-FWER procedure represented as strong-FWER.** Refusal class 10; the strength
   field is mandatory (F-03 vs F-05 distinction is sourced).
8. **FDR represented as FWER, or conversely.** Refusal class 10; sourced inequality
   structure (F-02) shows the substitution is directional and invalid as an identity.
9. **Adjusted p-values from one family combined with intervals from another.** Refusal
   class 11 (output coherence); sourced basis: Holm inversion yields only Bonferroni
   sets (F-18), so p-adjusted rejections and tighter intervals are not interchangeable
   surfaces.
10. **Stepwise decisions recomputed after losing ties or original order.** Refusal via
    Section 12: stepwise results must carry ordered members, tie rule, thresholds, and
    stopping index; a result lacking them is not independently recomputable (I-06).
11. **Many-to-one critical value reused for an all-pairs family.** Refusal class 8;
    sourced: Dunnett's constants target the `p` many-to-one statements and are
    contrasted in the text with all-comparisons procedures (F-06; SRC-03 p. 1097).
12. **Balanced-design procedure silently extended to unequal group sizes.** Refusal
    class 7; sourced: equal-size tables give only approximate coverage under imbalance
    (F-13); the unequal-size all-pairs guarantee needed its own proof (F-14, F-15).
13. **Stochastic resampling result without fixed randomness and replay semantics.**
    Refusal class 12; the lane is transferred until the seeded-reproducibility
    foundation closes (RSM-01).
14. **Independence inferred from row order or distinct labels.** Rejected by
    declaration-only independence (Section 11); consistent with the carried-forward
    FND findings that identity attributes cannot be inferred from values.
15. **Variance assumption inferred from observed sample variances.** Rejected by P-02
    and refusal class 6; data-dependent switching is a boundary exclusion of the
    Release 3 preparation record.
16. **Missing rows silently removed.** Refusal class 3; an observation is admitted or
    the check refuses (no missingness semantics adopted; consistent with FND-2 holds).
17. **Factorial/blocked/clustered/repeated design flattened into one-way groups.**
    Refusal classes 1–2: the one-way assertion plus the not-flattened assertion are
    required declarations; verification limit as in attack 6 — a value-level check
    cannot always detect flattening, so the boundary is declaration plus refusal on
    any declared structure, with residual risk recorded.
18. **The same hypothesis placed in materially different comparison families.**
    Accepted as representable: family identity is part of claim identity, so the two
    placements are distinct claims; cross-claim relation vocabulary is open hold
    `FND1-H05` and is not resolved here.
19. **A project convention described as external consensus.** Rejected editorially by
    this report's structure: Sections 4 (facts), 5 (inference), and 7 (project
    choices) are separated, and every §7 item is labeled a project choice.

## 15. Reuse from Release 2

Conditional on the Release 2 authoritative disposition (nothing here treats Release 2
surfaces as issued):

- successor identifier architecture (`contract` family), exact-bundle dispatch,
  fail-closed unsupported-bundle behavior, strict-JCS input rules, binary64 numeric
  model, tolerance-ownership-by-check-version, refusal-artifact versioning, and the
  oracle-separation rule (expected values never generated from the reference
  implementation alone) — all reusable as architecture patterns;
- t-distribution and Welch-Satterthwaite degrees-of-freedom numerics from the
  two-group lane are reusable inputs to per-pair heteroscedastic constructions
  (HET-01) and to t-based thresholds, subject to the numerical commission's own lane;
- the Welch two-group Contract itself is not a multi-group omnibus and must not be
  silently generalized (OMN-02 is a distinct procedure with its own source
  requirement).

## 16. Reuse for Release 4 and later

- Reusable beyond one-way designs: the claim-object structure (P-01); the error
  criterion/strength taxonomy (F-01–F-05); the family-identity and variant-identity
  discipline (I-07); F-tail and Studentized-range numerical lanes; the generic p-value
  procedures (PVL family), which act on declared families regardless of design; the
  gatekeeping/graphical framework research (CLS) for multiple-endpoint releases.
- Not reusable without new research: factorial estimands, interaction member sets,
  design-balance semantics, non-independent mean estimates (the Tukey 1953/Kramer 1957
  correlated-estimates extension is explicitly unresolved in inspected text — SRC-06
  p. 70), covariate adjustment, and any dependence structure beyond the one-way
  independent model.

## 17. Unresolved holds

Source-acquisition holds created by this report (each names the exact next sources):

| Hold | Blocked items                           | Exact next sources                                                                                                                        |
| ---- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| SR-A | OMN-01..04                              | Fisher-lineage F-test primary formalization (e.g., Scheffé 1959 as formal secondary anchor plus original sources); SRC-09, SRC-10, SRC-11 |
| SR-B | PVL-01 attribution, PVL-02              | SRC-13, SRC-14                                                                                                                            |
| SR-C | PVL-06..10                              | SRC-15, SRC-16, SRC-17, SRC-19, plus Rom (1990), Holland-Copenhaver (1987)                                                                |
| SR-D | CLS-01..06                              | SRC-18, SRC-26, SRC-27                                                                                                                    |
| SR-E | APR-01 historical attribution           | SRC-34 (already a recorded FND-1 residual; attribution-only)                                                                              |
| SR-F | APR-05, APR-06                          | Hochberg (1974); Genizi-Hochberg (1978); Stoline (1981) (SRC-36)                                                                          |
| SR-G | APR-09                                  | SRC-12                                                                                                                                    |
| SR-H | APR-10..14                              | SRC-29, SRC-35                                                                                                                            |
| SR-I | HET-01..03                              | SRC-20, SRC-21                                                                                                                            |
| SR-J | MTO-02, MTO-03, MCB-01                  | SRC-28, SRC-30                                                                                                                            |
| SR-K | FDR-01 dependence scope; FDR-02, FDR-03 | SRC-22, SRC-23                                                                                                                            |
| SR-L | GUI-01, GUI-02                          | SRC-32, SRC-33                                                                                                                            |

Pre-existing holds implicated and left open: `FND1-H05` (relation vocabulary — needed
for attack 18), `FND1-H06` (design/units/timing declarations — Section 11 resolves only
the one-way slice's needs as candidates, closing nothing), `FND1-H07`
(procedure-selection attestation — attacks 6 and 17 residual risk), `FND1-H08`
(sensitivity links — untouched), FND-2 `HOLD-01`–`HOLD-05` (missingness and
analysis-data identity — this report adopts refusal-not-imputation and does not touch
them), the Tukey (1953) attribution residual (SR-E), and the queued seeded-stochastic
and missingness foundational lines. The numerical lane (F, t, Studentized range,
augmented range, maximum modulus, multivariate-t equicoordinate probabilities,
adjusted-p arithmetic) belongs to the parallel numerical commission and is untouched
here.

## 18. Reopen conditions

This report's findings are reusable only within these bounds; re-adjudication is needed
if any of the following occurs:

1. a material in-scope procedure or variant absent from Section 8 is identified (the
   completeness claim is bounded to the Section 3 method and the 2026-09-03 date);
2. any SR-x hold closes with primary text that materially conflicts with a report-level
   characterization recorded here;
3. a dependent proposal uses a different procedure variant, expands dependence or
   design conditions, or relies on an extension attributed to an uninspected source;
4. the Release 2 disposition changes any reused architectural pattern (Section 15);
5. the FND-1/FND-2 steward dispositions' own reopen conditions fire;
6. full-text access to the Section 2.2 sources becomes available — every affected
   entry's evidence status is then re-evaluated before RFC freeze.

## 19. Claim-to-source table

Decision-bearing claims only; report-level and snippet-level items are not listed here
because no decision rests on them (their entries are DEFER-equivalent by §8). Pinpoints
are printed pages in the inspected artifacts (Section 2.1); access dates are those in
the reused inspection records (2026-08-31 for SRC-01..04, 2026-09-01 for SRC-05..08);
this report's reuse date is 2026-09-03.

| Claim | Source (ID)     | Pinpoint                                                                     | Directly proves                                                       | Investigator addition                       |
| ----- | --------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| F-01  | SRC-02          | p. 291, §2.1, Table 1 and displayed definition                               | FDR definition with no-rejection convention                           | none                                        |
| F-02  | SRC-02          | p. 291, properties (a), (b)                                                  | FDR/FWER order relations                                              | I-01 non-substitutability                   |
| F-03  | SRC-01          | p. 65 definition; p. 67 Theorem 1                                            | free-combinations (strong) FWER attained                              | none                                        |
| F-04  | SRC-03          | pp. 1096, 1101 (ledger D18)                                                  | joint-confidence framing; no FWER restatement in text                 | I-02 duality caution                        |
| F-05  | SRC-02          | pp. 293, 296                                                                 | weak-only FWER for BH; Simes step-up strong-FWER failure (attributed) | none                                        |
| F-06  | SRC-03          | pp. 1096, 1101                                                               | many-to-one member set                                                | none                                        |
| F-07  | SRC-06          | p. 61, (1.1); SRC-04 absence rows T10–T12                                    | balanced all-pairs exact coverage (later formalization); 1949 absence | attribution boundary per SR-E               |
| F-08  | SRC-01/SRC-02   | pp. 65–67 / 291, 293                                                         | abstract declared families                                            | none                                        |
| F-09  | SRC-06          | pp. 69–70                                                                    | all-contrasts extension and its qualification                         | none                                        |
| F-10  | SRC-01          | pp. 67–68                                                                    | dependence-free Holm validity                                         | none                                        |
| F-11  | SRC-01          | pp. 68, 69                                                                   | independence-based product-form; weighted scheme                      | none                                        |
| F-12  | SRC-02          | pp. 293, 299–300                                                             | independence condition; `(m0/m)q*` bound                              | I-03 dependence question                    |
| F-13  | SRC-03          | pp. 1099, 1101–1105                                                          | model; general unequal-size construction; instrument limits           | none                                        |
| F-14  | SRC-06          | pp. 62–63, 63–69                                                             | Tukey-Kramer conservative theorem, strictness                         | none                                        |
| F-15  | SRC-05          | pp. 307–309                                                                  | proposal without proof; referee-sourced conservativeness remark       | none                                        |
| F-16  | SRC-07          | pp. 975–976                                                                  | extended-T construction, exactness/approximation split                | width comparison is cross-source (recorded) |
| F-17  | SRC-08          | pp. 790–795                                                                  | simulation evidence type; harmonic-mean and Gabriel failure modes     | rejection rationale APR-07/08               |
| F-18  | SRC-01          | pp. 66–68                                                                    | step-down structure; coherence/consonance; Bonferroni-set inversion   | I-06, attack 9                              |
| F-19  | SRC-02          | p. 293, (1)                                                                  | step-up structure                                                     | I-06                                        |
| F-20  | SRC-03          | pp. 1101–1105                                                                | sidedness-specific constants                                          | none                                        |
| F-21  | SRC-04          | pp. 99–105                                                                   | three-stage procedure; conjectural composite rate; absences           | I-05 gating caution                         |
| F-22  | SRC-03/06/01/02 | p. 1103 (6)–(7); p. 61; ordering passim                                      | numerical dependency attestations                                     | matrix column population                    |
| F-23  | steward record  | `2026-08-31-multiplicity-steward-disposition.md`, "Evidence carried forward" | reusable-finding list                                                 | applied to P-01, attack 1                   |

## 20. Final disposition

**`NARROW`.**

- What is ready: the claim-class and guarantee taxonomy, the declaration/refusal
  skeleton, the counterexample boundary analysis, and a complete, method-bounded,
  disposition-labeled catalogue. Seven catalogue entries are `R3-CAND` on directly
  inspected primary text (PVL-01, PVL-03, PVL-04, APR-01, APR-02, MTO-01, FDR-01 —
  FDR-01 under an explicit independence declaration), and two entries are rejected on
  inspected evidence.
- Why not `PROGRAM_SCOPE_READY`: the commission's comprehensive RFC question spans
  omnibus, step-up, closed/gatekeeping, heteroscedastic, all-contrasts, and
  dependence-robust FDR lanes whose primary texts could not be inspected in this
  research environment (Section 2.2/2.3). Their entries are individually
  DEFER-equivalent under holds SR-A through SR-L, and a "complete disposition ledger"
  whose majority rests on uninspected sources would not be honestly reviewable.
- Why not `DEFER` or `NO_GO`: a substantial source-established core exists and is
  sufficient to open bounded work on lanes D0, D2, D3, and D4 (Section 10) and to
  draft the RFC's taxonomy and boundary sections, provided the RFC names every SR-x
  hold rather than hiding it.
- No unsupported statistical or software convention fills any gap: every uninspected
  claim is labeled and blocked, none is promoted.

This result awaits independent review as required by the Release 3 preparation record;
this report does not perform or claim that review.

## Public-artifact self-check

- Only the pinned public repository commit and the documented external search were
  used; no private repository, work item, or product implementation was read.
- No authoritative Protocol artifact, registry, schema, conformance artifact,
  reference or candidate implementation, Release 2 artifact, or the commission text
  was modified; this file is the only change.
- Attribution is role-based; no drafting or search software, service, provider, or
  mechanism is identified; no human authorship is claimed.
- No Protocol method, default, identifier, schema, field, refusal code, public check,
  API, implementation, or release change is selected; dispositions are catalogue
  classifications for a future RFC ledger only.
- Verbatim quotation from any single source is limited to short technical phrases
  well under 25 words per source.
- Facts (§4), inference (§5), disagreement (§6), and project choices (§7) are kept in
  separate sections.

RELEASE 3 SEMANTIC RESEARCH RESULT COMPLETE - NARROW - AWAITING INDEPENDENT REVIEW - NOT PROTOCOL ADOPTION
