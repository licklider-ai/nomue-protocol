# Release 3 Multiplicity Numerical and Oracle Research Result

**Status: informative preliminary research result; non-normative; not adopted.** This
report records the preliminary output of the
[numerical research commission](numerical-research-commission.md) executed under the
Release 3 Research Gate instruction recorded in
<https://github.com/licklider-ai/nomue-protocol/issues/171>. It selects no algorithm,
tolerance, platform, support domain, resource ceiling, stochastic contract, Contract,
Public Check, identifier, or release outcome. Every finite probe result below is an
observation about the evaluated inputs; none is a global or supported bound.

**Program result: `INPUT_INCOMPLETE` without a numerical disposition** (Section 17). The
required primary numerical sources were identified but not directly inspected. The
commission's stop condition therefore controls. Every catalogue entry still receives a
numerical family and a preliminary, non-dispositive assessment so that the executed work
can be reused without silently treating any technique as numerically covered.

**Repair provenance (2026-09-04).** A work context separate from the original
investigation applied the three blockers and one should-fix finding recorded by exact-head
review commit `32e9f3c599eb40e9bd25a33a8595ee07bda6be28`. The repair changes the program
result and per-procedure labels to comply with the primary-source stop condition, removes
environment-specific identities through neutral-path probe reruns, repairs the
script/output hash chain, and clarifies the 49-entry/50-scope-label count. The durable
successor commit is recorded through the
steward account; its Git metadata records the intake actor, while this paragraph records
the repair scope and independence boundary. All mathematical derivations are preserved.
Seven probe transcripts are regenerated below from the neutral repair environment. Probe
B's complete original transcript is retained byte-for-byte with its corrected digest; a
neutral-path repair run independently reproduced its eleven enclosure cases, all three
monotonicity checks, and the first critical value before the remaining duplicate
resource-intensive work was stopped.
The review's optional repository-wide audit enhancement is not applied because this pull
request is restricted to the designated result path.

The repair also reads the subsequently merged semantic source-acquisition record at main
commit `0eb388e11c240795282b6b17d7718501757d1e43`, result blob
`5465cbcfd00708facac94785d9244b79166cb81e`. That record approves SR-L `CLOSED`, leaves
the other eleven semantic holds plus RSM-01/RSM-02 source work incomplete, and keeps
`SOURCE_SET_READY=false`. It does not alter this commission's fixed semantic input or any
numerical observation.

## 1. Repository input identity and identity gate

| Field                   | Value                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Repository              | `licklider-ai/nomue-protocol` (public)                                                                                                |
| Starting commit         | `65a53a4f2e54c691ccd76f71814c5a6e507f0046`                                                                                            |
| Commit tree             | `de5075e4045b5c04ee88682154b12fc74310069a`                                                                                            |
| Sole parent             | `317d19b826c7bbb81b1301fc3ed54c6634c4425c`                                                                                            |
| Working branch          | `research/r3-multiplicity-numerical-oracles-65a53a4`, verified to point at the starting commit with no pending diff                   |
| `main` at start of work | `65a53a4f2e54c691ccd76f71814c5a6e507f0046` (re-fetched; identical to the starting commit)                                             |
| Investigation date      | 2026-09-04                                                                                                                            |
| Investigator role       | independent numerical investigator; did not author the Release 3 scope proposal, the semantic result, or any candidate implementation |

**Identity gate outcome: PASS.** Every identity named in the execution instruction was
re-derived from Git objects before any source work or probe began, and every value
matched. No value from the instruction text was trusted without this re-derivation.

| Instruction item                                 | Path in tree `de5075e4…`                                                                      | Re-derived blob                            | Match |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------ | ----- |
| Numerical commission                             | `governance/drafts/release-3-preparation/numerical-research-commission.md`                    | `5125d5411f398269660a7a3428be733a0fcc6f30` | yes   |
| Preparation README                               | `governance/drafts/release-3-preparation/README.md`                                           | `97ffd65f4136c476042ddc3f25fafd3a4a27a861` | yes   |
| Release 3 horizon                                | `governance/drafts/release-horizon-r3-r20.md`                                                 | `46567e685a66375cbd41b9d9f5302f4f7c1aeb57` | yes   |
| Reviewed semantic result                         | `governance/drafts/release-3-preparation/semantic-research-result.md`                         | `8f21526040924b891f64724c2d0fde9ea94eff92` | yes   |
| Release 2 numerical README                       | `governance/drafts/release-2-candidate/numerical/README.md`                                   | `5d492e80c47fe168386c9bc12aa3c0e6fac3d44b` | yes   |
| Release 2 final R2-D5 review-readiness candidate | `governance/drafts/release-2-candidate/numerical/final-r2-d5-review-readiness-candidate.json` | `3c54ecf0e1f43ac1d437baec2795e3edb5b8e743` | yes   |
| Release 2 steward ratification package           | `governance/drafts/release-2-steward-ratification-package.md`                                 | `80ad7729a66a1ae16303d8c3b1da1954629b0315` | yes   |

Additional decision-bearing inputs read in full at the starting commit (recorded as the
commission requires):

| Input                                                                                                             | Blob                                       | Role                                                                    |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `AGENTS.md`                                                                                                       | `94dbfdcec7d099f492b08d287dfdd41d876f08fa` | contribution rules                                                      |
| `CHARTER.md`                                                                                                      | `1dead95488bae31f80f25424bb3a5515fda119fb` | mission and non-claims                                                  |
| `AUTHORITY.md`                                                                                                    | `7b55e8ba6698d69431d952945a9253c2331122d0` | authority model                                                         |
| `governance/RFC.md`                                                                                               | `9fa3bdd2e273ed9569385e34bce0bbef2559b131` | research gate                                                           |
| `governance/drafts/release-3-preparation/semantic-research-commission.md`                                         | `c6760efc8450efe5fe2da6ccce2b2fac4846c066` | catalogue provenance                                                    |
| `governance/drafts/release-3-preparation/semantic-source-acquisition-commission.md`                               | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` | open semantic holds SR-A..SR-L                                          |
| `governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json`                      | `f3ade9fe6ece6d28d4d73d1c494169efc0d0c67c` | Release 2 Student-t truth-error record (df = 197 witness)               |
| `governance/drafts/release-2-candidate/numerical/tail-numerical-selection-candidate.json`                         | `df57149cc63fc1948950deb9a0fa530a27646e6b` | Release 2 projection and series-closure record                          |
| `governance/drafts/release-2-candidate/numerical/runtime-numerical-contract-full-trace-candidate.json`            | `74885507600f7fcb476af4a52d612415d68229d7` | Release 2 full-trace and resource record                                |
| `governance/drafts/release-2-candidate/numerical/candidate-supported-scope-resource-bounds-candidate.json`        | `7d6572db31f40fb63619edadd9a2b76ff2b35d1e` | Release 2 resource envelope record                                      |
| `governance/drafts/release-2-candidate/numerical/supported-execution-selection-candidate.json`                    | `2b90bf761693b93dae53870acadf67599aba1f06` | Release 2 supported-execution record                                    |
| `governance/drafts/release-2-candidate/reviews/d5-supported-platform-primary-source-research-disposition.md`      | `6015f45bccd10ba603d82527c408297ac45a05de` | reused platform facts (Section 4.7)                                     |
| `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-primary-text-closure-result.md`              | `55d81187aa297697badb3266a87584f32c732871` | reused Dunnett (1955) and Holm (1979) pinpoints                         |
| `evidence/research/foundation-identity/fnd-1/2026-09-01-all-pairs-successor-source-supplied-completion-result.md` | `236cd949b99b558e207082c74832edf158f3839d` | reused Hayter (1984), Kramer (1956), Spjøtvoll-Stoline (1973) pinpoints |
| `tooling/r2-paired-t-evidence/README.md`                                                                          | `bc5e62602d2530a688d4196bcbc48d44c6d63669` | Release 2 oracle generator pattern                                      |
| `tooling/r2-paired-t-evidence/requirements.txt`                                                                   | `388b3abf3e5e746b922e1bd1ed888165685786b0` | Release 2 pinned ball-arithmetic dependency (`python-flint==0.9.0`)     |

No private repository, private work-item system, or non-public product implementation
was read or used. No authoritative Protocol artifact, table, registry, schema, conformance
artifact, reference implementation, Release 2 evidence, commission, or the fixed semantic
result was modified; this file is the only change.

## 2. Source inventory and access record

### 2.1 Primary sources reused within recorded inspection scope

The starting commit contains hash-verified full-text inspection records whose printed-page
pinpoints are reusable within their recorded scope. This report reuses only the numerical
dependency statements from them and re-inspects no PDF.

| ID     | Source                                              | Numerical pinpoint reused                                                                                                                                                                                                                                                                                                                                  | Inspection record                                                                    |
| ------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| SRC-01 | Holm (1979), Scand. J. Statist. 6(2):65–70          | thresholds `α/(n+1-k)`, ordering and stop rule (printed pp. 66–67); independence-based product-form thresholds `1-(1-α)^(1/(n+1-k))` (printed p. 68)                                                                                                                                                                                                       | `…/fnd-1/2026-08-30-multiplicity-primary-text-closure-result.md`, ledger rows L1–L13 |
| SRC-02 | Benjamini and Hochberg (1995), JRSS B 57(1):289–300 | step-up rule: largest `i` with `P(i) ≤ (i/m) q*` (printed p. 293, expression (1))                                                                                                                                                                                                                                                                          | same record, Section 3.2 (as reused by the semantic result, F-19)                    |
| SRC-03 | Dunnett (1955), JASA 50(272):1096–1121              | one- and two-sided constants defined through the joint law of the `p` t-statistics (eqs. (4)–(5), printed p. 1102); size-dependent correlation (printed p. 1103); reduction to integrals of a multivariate normal against the variance-estimate density (eqs. (6)–(7), printed p. 1103); interpolated tables with stated accuracy limits (printed p. 1105) | same record, ledger rows D6, D7, D8, D13, D17                                        |
| SRC-05 | Kramer (1956), Biometrics 12(3):307–310             | unequal-replication factor equivalent to `s sqrt((1/n_i + 1/n_j)/2)` (printed p. 308); two-mean case coincides with a t test (printed p. 308)                                                                                                                                                                                                              | `…/fnd-1/2026-09-01-all-pairs-successor-source-supplied-completion-result.md`, §4.1  |
| SRC-06 | Hayter (1984), Ann. Statist. 12(1):61–75            | balanced intervals with half-width `q^{(α)}_{k,ν} S / sqrt(n)` and exact coverage (expression (1.1), printed p. 61); `q^{(α)}_{k,ν}` as the upper `α` point of the Studentized range with parameter `k` and `ν` df (printed p. 61); Tukey-Kramer half-width factor `{(1/n_i + 1/n_j)/2}^{1/2}` (expression (1.2), printed p. 62)                           | same record, §4.2                                                                    |
| SRC-07 | Spjøtvoll and Stoline (1973), JASA 68(344):975–978  | augmented Studentized range point and `max(a_i, a_j)` multiplier; ordinary range in place of the augmented point is an approximation (printed pp. 975–976)                                                                                                                                                                                                 | same record, §4.3                                                                    |

Reuse boundary: these pinpoints establish _what quantity_ each procedure needs. They do
not establish any evaluation algorithm, and this report does not attribute an algorithm to
them.

### 2.2 Primary numerical sources identified but not inspectable in this environment

Direct retrieval from every scholarly-publisher, standards, preprint, and mathematical
reference host attempted on 2026-09-04 was denied by the research environment's outbound
network policy (HTTPS connections to the hosts below returned no response). Only a Python
package index was reachable. Each source therefore carries the access status
`ACCESS_FAILED_IN_ENVIRONMENT`. None is used as the basis of a decision-bearing claim;
where this report needs the mathematical content, it supplies a self-contained derivation
(Section 4) and executable cross-checks instead, and marks the algorithmic literature as an
uninspected candidate.

| ID     | Source (bibliographic identity)                                                                                                                                                  | Needed for                                                                                                          |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| NSR-01 | NIST Digital Library of Mathematical Functions, Chapter 8 (incomplete gamma and related functions), §8.17 (incomplete beta)                                                      | canonical statement of `I_x(a,b)` identities, symmetry `I_x(a,b) = 1 - I_{1-x}(b,a)`, integer-parameter finite sums |
| NSR-02 | Abramowitz and Stegun (1964), §26.5–26.6 (incomplete beta, F distribution)                                                                                                       | same, historical formulation                                                                                        |
| NSR-03 | IEEE Std 754-2019                                                                                                                                                                | binary64 format, roundTiesToEven, subnormal and overflow semantics                                                  |
| NSR-04 | ECMAScript Language Specification (2025 and 2026 editions), Number type and `Math.sqrt`                                                                                          | runtime arithmetic semantics (reused through the Release 2 platform research record, Section 4.7)                   |
| NSR-05 | Copenhaver and Holland (1988), J. Statist. Comput. Simul. 30:1–15 (Studentized range probabilities and quantiles)                                                                | candidate direct algorithm for the Studentized range distribution                                                   |
| NSR-06 | Lund and Lund (1983), Applied Statistics 32(2):204–210, Algorithm AS 190 (Studentized range upper quantiles)                                                                     | candidate approximate algorithm                                                                                     |
| NSR-07 | Harter (1960), Ann. Math. Statist. 31:1122–1147 (tables of range and Studentized range)                                                                                          | historical certified tables for cross-checks                                                                        |
| NSR-08 | Genz and Bretz (2002), J. Comput. Graph. Statist. 11(4):950–971; Genz and Bretz (2009), _Computation of Multivariate Normal and t Probabilities_, Springer                       | candidate algorithms for multivariate t probabilities at arbitrary correlation                                      |
| NSR-09 | Dunnett and Sobel (1955), Biometrika 42:258–260 (bivariate t); Dunnett (1989), Applied Statistics 38(3):564–579, Algorithm AS 251 (multivariate normal with product correlation) | product-correlation reduction lineage and candidate algorithm                                                       |
| NSR-10 | Welch (1951), Biometrika 38(3/4):330–336                                                                                                                                         | definition of the Welch omnibus statistic and its non-integer df                                                    |
| NSR-11 | Games and Howell (1976), J. Educ. Statist. 1(2):113–125                                                                                                                          | definition of per-pair Welch-type df used with the Studentized range                                                |
| NSR-12 | Scheffé (1953), Biometrika 40(1/2):87–104                                                                                                                                        | `sqrt((k-1) F)` projection constant                                                                                 |
| NSR-13 | Hommel (1988), Biometrika 75(2):383–386; Wright (1992), Biometrics 48:1005–1013 (adjusted-p formulations)                                                                        | closed-Simes adjusted-p algorithm                                                                                   |
| NSR-14 | Benjamini and Yekutieli (2001), Ann. Statist. 29(4):1165–1188                                                                                                                    | `Σ 1/i` inflation constant                                                                                          |
| NSR-15 | Westfall and Young (1993), _Resampling-Based Multiple Testing_, Wiley                                                                                                            | maxT/minP definitions                                                                                               |
| NSR-16 | Blackman and Vigna (2021), ACM TOMS 47(4), Article 36 (xoshiro/xoroshiro generators); Lemire (2019), ACM TOMS 29(1) (bounded integers)                                           | randomness-identity candidates for the stochastic lane                                                              |
| NSR-17 | Arb / FLINT reference documentation (upstream) for `arb_hypgeom_beta_lower`, `arb_hypgeom_gamma_lower/upper`, `acb_calc_integrate`                                               | rigorous-enclosure semantics of the ball-arithmetic probe route                                                     |

Locally inspected upstream documentation (not network-dependent): the installed
`python-flint 0.9.0` docstrings for `arb.beta_lower`, `arb.gamma`, `acb.integral`, and the
installed `mpmath 1.4.1` package documentation for `betainc`, `quad`, `gammainc`, `ncdf`,
`npdf`, `findroot`. These document the probe operations; they are software documentation,
not mathematical authority.

Because the required primary numerical literature, standards, and authoritative upstream
documentation in this subsection were not directly inspected, the commission requires this
execution to return `INPUT_INCOMPLETE` without a numerical disposition. The derivations,
probe observations, family mapping, and candidate classifications below are retained only
as preliminary work for a later source-supplied completion pass.

### 2.3 Executable probe environment

Software was used only as a probe, with the evidentiary role of each route stated per
result. The original probes ran on the research container (Linux, x86-64) under CPython
3.11.15. The neutral-path repair reran seven probes to completion on Linux x86-64 under
CPython 3.12.13 with the same package versions. It also reran Probe B through all eleven
enclosure cases, all monotonicity checks, and the first critical value before stopping the
remaining duplicate resource-intensive portion; Appendix B retains the complete original
Probe B transcript.

| Package        | Version | Wheel SHA-256                                                      | Evidentiary role                                          |
| -------------- | ------- | ------------------------------------------------------------------ | --------------------------------------------------------- |
| `mpmath`       | 1.4.1   | `dc4f0ea2304480d4a9a48a94c1020571558ade522b44a6912efac63a586e140f` | arbitrary-precision route (pure Python; non-rigorous)     |
| `python-flint` | 0.9.0   | `376b88cacd30612479e839ffdba887599d3f9c8c0e214852bf80bb2b194e4d76` | ball-arithmetic route (rigorous enclosures via Arb/FLINT) |
| `gmpy2`        | 2.3.1   | `beb43dfb4b28e541343400115f009b57d44b29fdf4c0b0435d6d3674ae52c098` | installed; not used by the recorded probes                |
| `numpy`        | 2.4.6   | `89cd468399cfd2504718f0ba50e410dca55a170b61a02ad92bb18c8a65186e93` | dependency of the falsification probe                     |
| `scipy`        | 1.17.1  | `43af8d1f3bea642559019edfe64e9b11192a8978efbd1539d7bc2aaa23d92de4` | typical-library falsification only (never an oracle)      |

The table records the original investigation wheels. The neutral CPython 3.12 repair used
the same `mpmath` and `python-flint` wheels, the `numpy 2.4.6` wheel with SHA-256
`90f9849678c75fe7afa2d348ac842c168b0a4d3d61919687216dfc547976d853`, and the
`scipy 1.17.1` wheel with SHA-256
`02ae3b274fde71c5e92ac4d54bc06c42d80e399fec704383dcd99b301df37458`.
`gmpy2` was not installed in the repair environment and remains unused.

The exact-rational route uses the CPython standard library (`fractions`, `math`, `struct`)
with no third-party dependency; it is library-independent of both routes above. The
`python-flint` version coincides with the Release 2 evidence generator's pinned dependency
(`tooling/r2-paired-t-evidence/requirements.txt`), so a later reviewer can reproduce the
Release 2 and Release 3 enclosures in one environment. Probe scripts (A through G, plus the
C-2 boundary-replay script) are reproduced in full in
Appendix A with their SHA-256 digests; their console outputs are summarized in Section 4
and reproduced verbatim in Appendix B. Probe scripts import nothing from this repository;
Probes G and C-2 import the routes of Probes B and C respectively.

## 3. Method

1. **Two implementation-independent routes per numerical family.** For every family with a
   feasible path, at least two of the following were executed and compared: (a) an exact
   rational identity evaluated in integer arithmetic; (b) a rigorous ball-arithmetic
   enclosure; (c) an arbitrary-precision pure-Python evaluation; (d) a method-distinct
   numerical integration; (e) an exact mathematical identity that connects the family to a
   different family (for example `k = 2` Studentized range to Student t). Agreement between
   (b) and (c) is agreement between two independent code bases; containment of (a) in (b) is
   a rigorous check of the enclosure against an exact value.
2. **No global bound from a finite corpus.** Every numerical observation is reported as
   pointwise. Where a bound is proposed, it rests on a stated proof, an exhaustively covered
   finite table, or an explicitly reviewable predicate (Section 8).
3. **Falsification posture.** Each probe includes cases chosen to break the candidate
   contract: binary64 class transitions, near-critical decisions, ties and permutations,
   degenerate correlations, malformed and non-finite inputs, and resource exhaustion.
4. **Separation of facts, inference, candidates, and blockers.** Section 4 contains only
   what a proof or an executed probe establishes; Section 5 contains investigator inference;
   Section 7 lists candidates without selecting; Section 16 lists blockers.
5. **Semantic authority stays with the semantic result.** Catalogue membership, member sets,
   error criteria, and dispositions in the semantic result (blob `8f215260…`) are taken as
   fixed inputs. Its `R3-CAND`, `RES-ONLY`, `TRANSFER`, and `REJECT` labels and its holds
   SR-A through SR-L are not re-adjudicated here; this report adds only a numerical
   feasibility layer.

## 4. Directly established mathematical and numerical facts

Each fact carries its basis: `PROOF` (derivation stated in this report),
`PROBE` (executed evidence; Appendix A script and Appendix B output), or `REUSED` (a
pinpoint from Section 2.1 or a Release 2 record). Probe numbers below are observations
about the evaluated inputs only.

### 4.1 F and Student t tails (families used by OMN-01, OMN-02, APR-09, PVL-01/03/04 intervals, HET-01 per-pair df)

- **N-01 (`PROOF`, `PROBE` A).** For `d1, d2 > 0` and `f ≥ 0`, with the F density
  `c · t^{d1/2-1} (1 + d1 t / d2)^{-(d1+d2)/2}`, the substitution `x = d2 / (d2 + d1 t)`
  (so `dx = -(d1 d2)/(d2 + d1 t)^2 dt`) maps `(f, ∞)` onto `(0, x_f)` and gives
  `P(F_{d1,d2} > f) = I_{x_f}(d2/2, d1/2)` with `x_f = d2/(d2 + d1 f)`, where `I` is the
  regularized incomplete beta function. The complementary form `P(F ≤ f) = I_{y}(d1/2, d2/2)`,
  `y = d1 f/(d1 f + d2) = 1 - x_f`, follows from `I_x(a,b) + I_{1-x}(b,a) = 1` (a direct
  consequence of the definition as a normalized integral). Probe A evaluated the identity on
  a 576-point grid (`d1 ∈ {1,2,3,4,10,50}`, `d2 ∈ {1,2,3,5,10,30,100,1000}`, twelve `f`
  values from `0` to the largest finite binary64) by an arbitrary-precision route (60
  digits) and a rigorous ball route (300 bits): all 576 arbitrary-precision values lie
  inside the corresponding balls (maximum relative gap `1.07e-54`, attributable to the
  60-digit working precision). A method-distinct density quadrature agreed to at least 60
  digits on six spot cases.
- **N-02 (`PROOF`, `PROBE` A).** When both `a = d2/2` and `b = d1/2` are positive integers,
  `I_x(a,b) = Σ_{j=a}^{a+b-1} C(a+b-1, j) x^j (1-x)^{a+b-1-j}` (the binomial identity for
  integer-parameter incomplete beta, provable by repeated integration by parts of
  `∫_0^x t^{a-1}(1-t)^{b-1} dt`). For a binary64 `f`, `x` is a rational number, so this sum
  is an exact rational computable in integer arithmetic with no library. Probe A evaluated it
  on all 240 both-even grid cases: every exact value lies inside the ball route's enclosure
  (exact rational containment), and every value agrees with the arbitrary-precision route to
  at least 50 digits. The largest exact denominator encountered was 551,941 bits
  (`d2 = 1000`, `f` at the largest finite binary64); typical cases (`d2 ≤ 1000`, `f ≤ 10`)
  stay below 10,000 bits and evaluate in milliseconds (Probe F: `F(50,5000)` at `f = 1.2`
  needed 142,200 denominator bits and 0.924 s in the repair run).
- **N-03 (`PROOF`, `PROBE` A).** The two-sided Student t tail is the `d1 = 1` case:
  `P(|T_ν| > t) = P(F_{1,ν} > t^2) = I_{ν/(ν+t^2)}(ν/2, 1/2)`. The Release 2 certified
  witness (`df = 197`, `t` bits `4049333333333333`, correctly rounded truth bits
  `284f4ce623062755`, from blob `f3ade9fe…`) was recomputed by both the arbitrary-precision
  route and the ball route from this identity alone; both give
  `1.588771213986757393750997533798255315047e-114`, whose nearest binary64 has bits
  `284f4ce623062755`, and the exact rounding-cell midpoints bracket the value. This is an
  independent two-library confirmation of a Release 2 Arb-generated certificate value (the
  Release 2 generator and the Release 3 ball route share the Arb library; the
  arbitrary-precision route does not).
- **N-04 (`PROBE` A).** Non-integer denominator degrees of freedom (the Welch omnibus
  family, OMN-02) present no identity change: for `d2 ∈ {7.3, 12.25, 2.0000001, 0.5, 0.99, 10^6/7}`
  the arbitrary-precision, ball (radius `≤ 3.5e-31` at 300 bits), and density-quadrature
  routes agree to at least 30 digits, except `d2 = 0.5` where the quadrature route (not the
  identity routes) lost accuracy to `8e-17` relative because of the integrable singularity of
  the density at zero. Non-integer `d2` has no exact rational route (N-02 requires integer
  parameters); a certified enclosure route is therefore mandatory for OMN-02.
- **N-05 (`PROBE` A).** The ball route's direct evaluation of `I_x(a, b)` returned a
  non-finite ball at 300-bit precision in all 16 grid cases with `f = 1e-300` (that is,
  `x` within `1e-300` of one). The complement identity `1 - I_{1-x}(b, a)`, with `1 - x`
  formed exactly as a rational, returned a finite enclosure in every such case. Consequence:
  any evaluation graph for these tails must switch to the complementary form near `x = 1`,
  and the switch point is a versioned choice (Section 12).
- **N-06 (`PROBE` A).** Binary64 projection transitions of the F upper tail are reachable
  with ordinary statistics when degrees of freedom are large. Solving `P(F > f) = τ`:

  | `d1` | `d2` | `f` where tail = `2^-1022` (smallest normal) | `f` where tail = `2^-1074` (smallest subnormal) | `f` where tail = `2^-1075` (rounds to zero) | `f` below which tail rounds to exactly one (`P(F ≤ f) < 2^-54`) |
  | ---- | ---- | -------------------------------------------- | ----------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------- |
  | 2    | 10   | `1.70e62`                                    | `2.29e65`                                       | `2.63e65`                                   | `5.55e-17`                                                      |
  | 2    | 1000 | `1561.9`                                     | `1716.1`                                        | `1719.1`                                    | `5.55e-17`                                                      |
  | 50   | 1000 | `78.65`                                      | `86.11`                                         | `86.26`                                     | `0.0982`                                                        |
  | 4    | 20   | `3.70e31`                                    | `1.36e33`                                       | `1.46e33`                                   | `5.02e-9`                                                       |
  | 10   | 100  | `1.83e7`                                     | `3.77e7`                                        | `3.82e7`                                    | `2.81e-4`                                                       |

  An F statistic of about 79 with 50 and 1000 degrees of freedom already produces a
  subnormal p-value; an F statistic below about 0.098 with the same degrees of freedom has a
  p-value that rounds to exactly one. `f = 0` (all group means equal) yields `p = 1` exactly
  in the exact rational route. The tail is non-increasing in `f` on the grid and strictly
  decreasing for `f ≥ 1e-10` (Probe A); at fixed `f = 2` and `d1 = 3` the tail decreases
  monotonically in `d2` across the grid.

- **N-07 (`PROBE` A, falsification).** A widely used scientific library (`scipy 1.17.1`,
  `f.sf`) returned values differing from the correctly rounded truth by 157, 257, 89, 153,
  and 3 binary64 units in the last place at the five probed far-tail points (for example
  `F(50,1000)` at `f = 28`: library bits `1fdd1ba952cb0b8b`, correctly rounded
  `1fdd1ba952cb0aee`). The library is not wrong beyond its documented accuracy, but this
  confirms that single-library agreement cannot serve as a correctly-rounded oracle for
  Release 3 tails.

### 4.2 Deterministic multiplicity adjustments (PVL-01..10, FDR-01..03, CLS-01..06 bookkeeping)

- **N-08 (`PROOF`, `PROBE` D).** Every finite binary64 p-value is a dyadic rational
  `m · 2^e`. Bonferroni, Holm, Hochberg, Hommel, Benjamini-Hochberg, and Benjamini-Yekutieli
  adjusted p-values are rational functions (products by integers, integer ratios, harmonic
  sums, minima and maxima) of those inputs, and the Šidák and Holm product-form thresholds
  become rational decisions after the exact rewriting
  `p ≤ 1 - (1-α)^{1/r}  ⇔  (1-p)^r ≥ 1-α` for a rational level `α` and integer `r`.
  Consequently every stepwise decision in these procedures is an exact rational comparison,
  and every adjusted p-value is an exact rational that can be correctly rounded once to
  binary64 for reporting. Probe D implemented all of them in exact integer arithmetic.
- **N-09 (`PROBE` D).** The level constant is meaning-bearing at the bit level. The
  binary64 nearest to 0.05 (bits `3fa999999999999a`) exceeds the rational `1/20` by
  `2.78e-18`. A raw p-value equal to that binary64 is rejected under the binary64 level and
  is not rejected under the rational level. For `m ∈ {7, 11, 13}` the binary64 quotient
  `0.05/m` differs from `1/(20m)` in the direction that flips the decision for a p-value
  equal to the quotient. The identity of `α` (decimal rational versus binary64) must
  therefore be versioned with the check.
- **N-10 (`PROBE` D).** Binary64 evaluation order changes stepwise decisions near the
  threshold. Among 260,000 random p-values within `±5e-15` relative of `α/m`, the three
  forms `p·m ≤ α`, `p ≤ α/m`, and the exact rational comparison disagreed 676 times (first
  witness: `m = 7`, `p` bits `3f7d41d41d41d41e`, decisions true/true/false). Among 153,000
  near-threshold Benjamini-Hochberg cases the forms `p ≤ i·q/m`, `p·m ≤ i·q`, `p·m/i ≤ q`,
  and the exact comparison disagreed 1,210 times (first witness `m = 5`, `i = 3`,
  `p` bits `3f9eb851eb851eba`, decisions true/true/false/false).
- **N-11 (`PROBE` D).** Single-rounding binary64 forms of Bonferroni (`min(1, m·p)`), Holm
  (running maximum of `(m-r)·p_(r)`), and Hochberg (running minimum) reproduced the correctly
  rounded exact adjusted value in all 12,713 sampled values across 1,200 random families
  (including ties and subnormal inputs). The two-rounding Benjamini-Hochberg form
  `(m/i)·p` differed from the correctly rounded exact value in 785 of 4,490 values (by one
  unit in the last place). The naive Šidák form `1-(1-p)^m` differed in 2,940 of 4,291
  values and returns `0` for every `p < 2^-53` (total loss); the `-expm1(m·log1p(-p))` form
  is close but not always correctly rounded (`p = 1e-17`, `m = 1000` differs in the last
  place). No decision flip at `α = 1/20` occurred in the random families; flips occur only
  in the near-threshold neighbourhoods of N-10.
- **N-12 (`PROBE` D).** The Benjamini-Yekutieli constant `c(m) = Σ_{i=1}^{m} 1/i` evaluated
  in binary64 depends on summation order from `m = 100` onward (forward, backward, and
  compensated sums give three different binary64 values at `m = 1000` and `m = 100000`).
  The exact harmonic number is a rational with 132 denominator bits at `m = 100` and 1,438
  at `m = 1000`; using it makes the BY decision exact and order-independent.
- **N-13 (`PROBE` D, exhaustive).** For Holm, Holm product-form, Hochberg, Hommel,
  Benjamini-Hochberg, and Benjamini-Yekutieli, on every multiset of size 2–5 drawn from
  `{0.01, 0.01, 0.03, 0.03, 0.05, 0.05, 0.1}` and every permutation of it (70,152
  permutations in total), the map from raw to adjusted p-value was permutation invariant,
  tied raw p-values received identical adjusted p-values, and adjusted p-values were
  monotone non-decreasing in the raw p-values. In 1,500 random families, raising one raw
  p-value never lowered any adjusted p-value (Holm, Hochberg, BH, BY, Hommel). All adjusted
  values satisfied `raw ≤ adjusted ≤ 1`, and every procedure reduced to the raw p-value at
  `m = 1`.
- **N-14 (`PROBE` D, exhaustive).** Closed testing with Bonferroni local tests gave the
  same rejection set as Holm in 200 random families of size 2–5 (a known equivalence,
  confirmed here without relying on an uninspected source); the exponential-time
  closed-Simes definition of Hommel adjusted p-values agreed with the standard quadratic-time
  algorithm on 300 random families including ties.
- **N-15 (`PROBE` D, resources).** Exact closed testing over all `2^m - 1` intersections
  took 0.01 s at `m = 10`, 0.65 s at `m = 16`, and 12.38 s at `m = 20` in the repair
  environment; exact Holm at `m = 100,000` took 1.87 s; exact quadratic Hommel at
  `m = 2,000` took 10.27 s; the exact power `(1-p)^m` for the smallest subnormal `p` has
  `1074·m + 1` denominator bits (10.7 million bits and 1.114 s at `m = 10,000`). These are
  observations that motivate versioned ceilings (Section 12), not bounds.
- **N-16 (`PROBE` D).** A guarded adjuster returned structured refusals, never an
  exception, for an empty family, a non-array, `NaN`, `±∞`, negative zero, `p > 1`,
  `p < 0`, and a non-binary64 member, while accepting exact zeros, exact ones, and subnormal
  p-values (`5e-324` adjusts to `1.5e-323` under Holm with `m = 3`).
- **N-17 (`PROBE` D).** A canonical-JSON stepwise trace (procedure identity, rational
  level, tie rule, ordered member indices, raw p bits, rational thresholds, decisions, stop
  index) with a SHA-256 digest detected all four attempted tampers: a changed decision with
  a stale digest (`DIGEST_MISMATCH`), a changed decision with a coherently recomputed digest
  (`DECISION_MISMATCH` on recomputation), a changed threshold with a coherent digest
  (`THRESHOLD_MISMATCH`), and reordered raw p bits with a coherent digest
  (`ORDER_VIOLATION`). Coherent re-digesting therefore does not defeat a verifier that
  recomputes the decisions from the bound inputs.

### 4.3 Simultaneous intervals, duality, and input algebra (APR-01/02/04, MTO-01, APR-09 outputs)

- **N-18 (`PROBE` E).** Input-algebra projection precedes any distributional question:
  two group means `1e16 + 1` and `1e16 + 3` parse to binary64 values whose difference is
  `4`, not `2`; an estimate of `1e16` with half-width `0.4` yields collapsed endpoints
  `L = U`; an estimate `12345.678` with half-width `5e-13` yields an interval of zero
  binary64 width. These are the same representational failure classes the Release 2 record
  names (difference overflow, information loss, endpoint collapse).
- **N-19 (`PROBE` E).** Test/interval duality holds exactly in rational arithmetic but not
  in binary64 evaluation: among 200,000 random `(q, se)` pairs with the observed difference
  placed at one of the three binary64 cells around the exact half-width `q·se`, the exact
  decision (`|diff| > q·se` on the exact values of the binary64 inputs) disagreed with the
  binary64 decision (`|diff| > fl(q·se)` or `0 ∉ [diff - hw, diff + hw]`) 33,458 times
  (first witness: `q = 3.1900414239523407`, `se = 1.735537816366321`, `diff` bits
  `4016254fe10c02af`: exact rejects, binary64 does not). Consequently a duality claim
  ("0 outside the interval if and only if the test rejects") is true only for a versioned
  exact comparison surface, not for independently rounded endpoints.
- **N-20 (`PROBE` E).** When the critical constant is irrational, the decision
  `stat^2 > q^2` can be made by enclosure refinement: with a rational statistic within
  `1e-38` of `q^2 = 2π`, the ball difference was undecided at 30, 53, 80, 100, and 128 bits
  and decided at 160 bits. The precision needed is input-specific and has no a-priori bound,
  so a versioned precision ceiling with fail-closed refusal is required (Section 8).
- **N-21 (`PROBE` E).** Differences of group means near the binary64 maximum overflow to
  infinity; the Release 2 `DIFFERENCE_OVERFLOW` class applies unchanged to pairwise and
  contrast differences.

### 4.4 Quantile (critical-value) certificates (APR-09, PVL-01 intervals, HET-01, MTO-01, APR-01/02)

- **N-22 (`PROBE` F).** For six `(d1, d2)` pairs including a non-integer `d2 = 7.3`, the
  upper 0.05 F quantile located by arbitrary-precision root finding was certified at the
  two binary64 cells adjacent to its nearest binary64 value by rigorous ball signs of
  `P(F > f) - 1/20` (positive at the lower cell, negative at the upper cell; ball radii
  `≤ 5e-23`). For the both-even pairs `(2,12)` and `(2,1000)` the exact rational route
  (N-02) independently confirmed the bracket. The Release 2 pattern "monotonic midpoint
  bracket at binary64 cells" therefore transfers to F quantiles, including non-integer
  denominator df, with the ball route as certifier and the exact route as a second certifier
  where degrees of freedom are even.
- **N-23 (`PROBE` F).** The Scheffé constant `sqrt((k-1) F_{α; k-1, ν})` need not be
  evaluated: the decision surface `contrast^2 / var ≤ (k-1) F` is exact-rational on the
  left and an F-quantile enclosure on the right, avoiding the square root entirely. The
  two-sided `t` critical value at `df = 10` was bracketed by the same ball method (sign
  change between bits `4001d33a7661d303` and `4001d33a7661d304`).
- **N-24 (`PROBE` F, resources and malformed inputs).** The rigorous integrator, when its
  evaluation limit is too small, returns a finite ball with a radius of order `1e12` rather
  than raising; a verifier must therefore test the returned radius against the required
  margin (a wide ball is a refusal, not a value). Out-of-domain parameters produce
  mathematically meaningless finite values without error from either library
  (`P(F_{2,5} > -1)` returned a ball at `3.586`; `d1 = 0` returned a ball at zero;
  `d1 = -2` returned exactly zero), so domain predicates (`d1, d2 > 0`, `f ≥ 0`, finite
  inputs) must be enforced before evaluation; they cannot be delegated to library behaviour.

### 4.5 Studentized range (APR-01, APR-02, APR-03, APR-10..12, APR-14, HET-01)

- **N-25 (`PROOF`, `PROBE` B).** Let `Z_1..Z_k` be iid `N(0,1)`, `R = max Z_i - min Z_i`,
  and `S = sqrt(χ²_ν/ν)` independent of the `Z_i`. The Studentized range is `Q = R/S`.
  Conditioning on `S = s`: `P(Q ≤ q) = ∫_0^∞ g_ν(s) F_k(q s) ds`, where
  `g_ν(s) = ν^{ν/2} s^{ν-1} e^{-ν s²/2} / (2^{ν/2-1} Γ(ν/2))` is the density of `S`
  (change of variables from the chi-square density) and
  `F_k(w) = k ∫ φ(z) [Φ(z) - Φ(z - w)]^{k-1} dz` is the range distribution of `k` normals
  (condition on the minimum being at `z`: the remaining `k-1` values lie in `[z, z+w]`,
  and the factor `k` counts which variable is the minimum). Two exact anchors follow:
  for `k = 2`, `R = |Z_1 - Z_2|` has the law of `sqrt 2 |Z|`, so
  `P(Q_{2,ν} ≤ q) = P(|T_ν| ≤ q/sqrt 2)`, an incomplete-beta value (N-03); and as
  `ν → ∞`, `S → 1` and `P(Q ≤ q) → F_k(q)`. Probe B's arbitrary-precision nested
  quadrature reproduced the `k = 2` identity at six `(ν, q)` pairs including `ν = 1`,
  `ν = 2`, and `ν = 200` to at least 19 significant digits, and reproduced the
  closed form `2Φ(q/sqrt 2) - 1` of `F_2` to 20 digits. This validates the integral
  representation and its truncation against an independent identity, not against a table.
- **N-26 (`PROBE` B, `PROBE` G).** A rigorous enclosure route for `P(Q_{k,ν} ≤ q)` was
  executed: nested ball-arithmetic integration on `[ε, s_max] × [-Z, Z]` with the omitted
  masses bounded exactly by `P(S ≤ ε) + P(S ≥ s_max)` (regularized incomplete gamma balls)
  and `k · 2(1 - Φ(Z))`, added as `[0, mass]` intervals. On eleven `(k, ν, q)` cases
  spanning `k ∈ {3, 4, 5, 6, 20}`, `ν ∈ {1, 2, 5, 7.3, 10, 20, 30, 60}`, and `q` from `0.5`
  to `12`, every arbitrary-precision value lay inside the enclosure. Radii and costs at
  tolerance `2^-40` and 96-bit precision: between `4.7e-14` and `8.3e-12` in 100–490 s
  for `ν ≥ 2`, but `5.2e-7` in 496 s at `ν = 1` (the heavy-tailed `S` density makes the
  truncated domain and the integrand's decay much worse). The distribution is monotone
  increasing in `q`, decreasing in `k`, and increasing in `ν` on the probed triples. Fixed
  `α = 0.05` upper points located by root finding on the arbitrary-precision route:
  `q(3,10) = 3.876776750013182`, `q(4,20) = 3.9582935609453567`, `q(3,5) = 4.601726054362567`,
  `q(2,10) = 3.151064183329408` (these agree with commonly tabulated three-decimal values,
  which are recorded only as an unverified secondary comparison). Cell-level certification:
  at tolerance `2^-48` (96 bits) the enclosure radii at the two binary64 cells adjacent to
  each root were `2.8e-15` (`k = 3, ν = 10`), `5.6e-16` (`k = 4, ν = 20`), and `6.6e-17`
  (`k = 3, ν = 5`, where the lower cell was decided and the upper cell not), all too wide
  to decide the sign against the local slope (`≈ 0.058 · ULP ≈ 2.6e-17` at `k = 3, ν = 10`).
  Probe G then showed the certificate strategy at a declared resolution: `q(3,10)` is
  rigorously bracketed within `±1e-12` (and `±1e-13`) by decided signs at both ends
  (225 s and 235 s per two-endpoint bracket), and at tolerance `2^-56` with 128-bit precision
  the enclosure radius at the root falls to `5.3e-18` in 188 s, below the cell requirement.
  Cell-level certification of Studentized-range quantiles is therefore feasible at roughly
  two to three minutes per evaluation in this environment (two evaluations per cell), which is a resource
  fact to plan around, not a bound. For `k = 2` the exact identity route certifies the
  binary64 cell directly (radius `1e-26`; `P - 0.95` is `-2.6e-17` at the lower neighbour,
  `+1.9e-19` at the nearest cell, `+2.7e-17` at the upper neighbour), so the nearest
  binary64 value `3.151064183329408` is the certified correctly rounded `q(0.05; 2, 10)`.
  Boundaries: `q = 0` gives `0`; at `k = 3, ν = 10` the value rounds to exactly one between
  `q = 50` (`1 - P = 2.1e-11`) and `q = 200` (`1 - P = 2.2e-17`); at `ν = 1` the upper
  tail decays only like `1/q` (`1 - P = 0.0068` at `q = 200`, `0.00135` at `q = 1000`),
  so a rounds-to-one boundary is effectively unreachable and the truncated-domain oracle is
  expensive; non-integer `ν = 7.3` (`k = 4`, `q = 4`) evaluates without special handling
  (`0.909180293696`); `k = 1` is not a range and must be refused; `k = 100` evaluates
  (`0.869` at `q = 6`, `ν = 50`). The `ν → ∞` limit was checked at `ν = 10^6`
  (`0.9500001699` versus the normal-range value `0.9500006124` at `k = 3, q = 3.3145`,
  consistent with monotone convergence from below).

### 4.6 Many-to-one equicoordinate multivariate t (MTO-01, MTO-02, MCB-01)

- **N-27 (`PROOF` with reused SRC-03 pinpoints, `PROBE` C).** Under the one-way normal
  model with common variance `σ²`, group sizes `n_0` (control) and `n_1..n_p`, and the
  independent estimate `S² ~ σ² χ²_ν/ν`, define
  `Z_i = (X̄_i - X̄_0 - (μ_i - μ_0)) / (σ sqrt(1/n_i + 1/n_0))`. Then
  `Cov(X̄_i - X̄_0, X̄_j - X̄_0) = σ²/n_0`, so
  `corr(Z_i, Z_j) = (1/n_0) / sqrt((1/n_i + 1/n_0)(1/n_j + 1/n_0)) = λ_i λ_j` with
  `λ_i = sqrt(n_i/(n_i + n_0))`; this is the size-dependent correlation that Dunnett's
  printed p. 1103 states, and it has product form. A product-correlation normal vector
  admits the representation `Z_i = λ_i Y + sqrt(1 - λ_i²) W_i` with `Y, W_1..W_p` iid
  `N(0,1)` (the covariance of the right-hand side is `λ_i λ_j` off the diagonal and `1` on
  it). Hence, with `T_i = Z_i / S`,
  `P(T_i ≤ d ∀i) = ∫_0^∞ g_ν(s) ∫ φ(y) Π_i Φ((d s - λ_i y)/sqrt(1-λ_i²)) dy ds`, and the
  two-sided probability replaces each factor by
  `Φ((d s - λ_i y)/c_i) - Φ((-d s - λ_i y)/c_i)`, `c_i = sqrt(1-λ_i²)`. This is the
  reduction "integrals of a multivariate normal distribution function against the density
  of the variance estimate" of Dunnett's eqs. (6)–(7), printed p. 1103 (reused pinpoint),
  made explicit through the product structure; the one-dimensional inner integral is this
  report's derivation and is not attributed to the source. Balanced designs give
  `λ_i² = 1/2`, that is `ρ = 1/2`. Probe C validated the reduction two ways: at `p = 1` it
  reproduced the Student-t identities (one-sided `P(T ≤ d)` and two-sided `P(|T| ≤ d)`) to
  18 digits at three `(ν, d)` pairs; at `p = 2` with unequal sizes it agreed with a direct
  three-dimensional quadrature of the explicit bivariate normal density (which does not use
  the product representation) to 16 digits in all four cases (one- and two-sided).
- **N-28 (`PROBE` C, `PROBE` C-2).** A rigorous enclosure route (same truncation and
  omitted-mass method as N-26, with the inner product integrand) was executed on four
  cases: balanced `p = 3` one-sided (`ν = 16`, radius `4.0e-11`, 173 s), unbalanced `p = 3`
  two-sided (`ν = 30`, `4.9e-12`, 276 s), balanced `p = 2` two-sided (`ν = 9`, `5.8e-11`,
  93 s), and balanced `p = 8` two-sided (`ν = 171`, `7.3e-12`, 1,463 s); every
  arbitrary-precision value lay inside its enclosure. Balanced (`ρ = 1/2`) one-sided
  `0.95` constants located by root finding: `d(2, 10) = 2.1506138267506874`,
  `d(3, 20) = 2.192283462387244`, `d(2, 10^6) = 1.9163340506762367`; the two-sided
  `p = 2, ν = 10` constant is `2.568338876031627`. The investigator's own unverified
  three-decimal annotations for these (`2.15`, `2.3`, `1.92`) were wrong in one case
  (`2.3` against the computed `2.19`), which is recorded as a concrete demonstration that
  remembered table values are not authority. Cell-level certification of the two-sided
  constant at tolerance `2^-44` gave radii `5.5e-14` at both adjacent cells, undecided;
  the precision scaling of N-26 applies. Correlation boundaries: with `n_1 = n_2 = 10`,
  `ν = 25`, `d = 2`, the one-sided probability moves from `0.9613` at `n_0 = 1`
  (`λ = 0.953`) through `0.9529` (`n_0 = 5`) and `0.9457` (`n_0 = 50`) to `0.9447` at
  `n_0 = 5000` (`λ = 0.045`), monotone in `λ`, with no numerical difficulty at either
  extreme because `λ < 1` strictly. Dimension: the two-sided probability decreases
  monotonically from `p = 1` to `p = 30` at fixed `d = 2.5`, `ν = 40` (`0.9834` to
  `0.7857`). The original Probe C transcript ended after those numerical sections because
  of a malformed monotonicity expression. The repair corrected that expression and reran
  Probe C in full from a neutral path. Probe C-2 independently replayed the final boundary
  checks with the unchanged routes:
  one-sided probability increasing in `d` (`0.541` to `0.9997`) and in `ν`; two-sided
  `d = 0` returning `2.6e-40` on the arbitrary-precision route (mathematically `0`; the
  residual is quadrature noise and a reminder that this route is not an enclosure);
  one-sided `d = 0` giving `0.333333333333`, the value `P(all Z_i ≤ 0) = 1/3` for `p = 2`,
  `ρ = 1/2`; and the two-sided rounds-to-one boundary for `p = 2`, `ν = 12` lying between
  `d = 30` (`1 - P = 2.3e-12`) and `d = 100` (`1 - P = 1.3e-18`). Its output is in
  Appendix B.

### 4.7 Reused platform and execution facts (Release 2 record, within recorded scope)

- **N-31 (`REUSED`, blob `6015f45b…`).** Current ECMAScript specifies Number as binary64
  with roundTiesToEven results for the ordinary operations, and the 2025 and 2026 editions
  specify the Number value of the exact square root; a conforming implementation may not
  expose fused or extended-precision results that differ from the separately specified
  operations; V8 exposes denormal flushing as mutable process/thread state; build
  identifiers do not attest to floating-point state. These facts were established by the
  Release 2 supported-platform research and adjudication and are reused only for the
  arithmetic model of a future Release 3 binary64 graph. They say nothing about the numerical
  error of any Release 3 procedure.
- **N-32 (`REUSED`, blobs `74885507…`, `2b90bf76…`).** The Release 2 candidate proves the
  actual returned computation by one immutable trace whose every `+`, `-`, `*`, `/` result
  is re-verified by exact dyadic arithmetic and every square root by exact rounding-cell
  containment, under a one-tuple controlled-process admission. The pattern is
  function-agnostic for those primitives; it is not evidence for any transcendental or
  special-function primitive, and Release 3 introduces none into a graph unless it is
  reduced to those primitives plus certified table constants.

### 4.8 Stochastic (resampling) candidates (RSM-01, RSM-02, OMN-06)

- **N-29 (`PROBE` E).** An explicitly specified integer-arithmetic generator (a 64-bit
  state-mixing seed expansion followed by a xoshiro-type output function, restated as exact
  64-bit operations), an unbiased rejection-sampling bounded-integer draw, and a
  Fisher-Yates shuffle produced a bit-identical permutation sequence and identical maxT
  adjusted p-value on replay (`p = 104/2001` at seed 1, `B = 2000`, twice). The first four
  64-bit outputs at seed 1 are `b3f2af6d0fc710c5`, `853b559647364cea`,
  `92f89756082a4514`, `642e1c7bc266a3a7` (replay identity vector). Exact replay is
  therefore a feasible verification class given a complete declaration.
- **N-30 (`PROBE` E).** On one fixed dataset of twelve observations in three groups whose
  exhaustive-enumeration maxT p-value is `1830/34650 = 0.05281`, twenty seeds at `B = 400`
  produced adjusted p-values between `0.0424` and `0.0848`, with eleven seeds not
  rejecting and nine rejecting at `α = 1/20`. Replacing the rejection-sampling mapping by a
  floor-of-uniform mapping, with the same seed and bit stream, changed the permutation
  sequence and the adjusted p-value (`0.0424` versus `0.0623`). The decision is a
  function of the seed and the mapping, not of the data alone; no deterministic
  approximation can be substituted without changing the procedure's meaning.

## 5. Investigator inference

Inferences are drawn from Section 4; none is a source-established fact or a Protocol
decision.

- **I-01 (exact decision layer).** Because binary64 inputs are dyadic rationals (N-08) and
  the level is a rational once versioned (N-09), every decision in the algebraic
  multiplicity families (PVL-01..05, PVL-07..10, FDR-01..03, CLS bookkeeping) can be
  computed exactly with no projection hazard, and every reported adjusted p-value can be
  the correctly rounded binary64 of an exact rational. A Release 3 check for these families
  needs no tolerance at all for decisions; it needs a versioned operation graph over
  rationals, a versioned level identity, a tie rule, and resource ceilings. The projection
  ledger reduces to "one correctly rounded projection per reported value".
- **I-02 (level identity is a Contract fact).** N-09 shows that "α = 0.05" is ambiguous at
  the bit level. The repository rule that check versions own the level (not Records) must be
  read as owning the _exact rational_ level; a binary64 constant inside an implementation
  is a silent reinterpretation.
- **I-03 (distributional families split into three numerical classes).**
  (a) _Exact-rational class_: F and t tails with both parameters integers after halving
  (both `d1`, `d2` even, or the balanced sub-cases where the sum reduces) admit an exact
  rational truth value (N-02). (b) _Enclosure class with one-dimensional special
  functions_: all other F and t tails and quantiles are regularized incomplete beta values,
  for which a rigorous ball route and an independent arbitrary-precision route agree
  (N-01, N-04, N-22), and for which the Release 2 table-plus-positive-series runtime pattern
  is a candidate at integer `d2` but has no established analogue at non-integer `d2`.
  (c) _Nested-integral class_: Studentized range, augmented range, Studentized maximum
  modulus, and equicoordinate multivariate t (Sections 4.5, 4.6) are two-level integrals of
  normal and chi quantities; a rigorous enclosure route exists but is orders of magnitude
  more expensive, and no binary64 runtime graph with an input-specific error proof exists
  for them in the repository or was constructed here.
- **I-04 (tables are the feasible runtime instrument for class (c)).** For procedures that
  only need a critical constant at a fixed level (APR-01, APR-02, MTO-01 intervals and
  their rejection sets), a finite, exhaustively certified table indexed by `(k, ν)` at
  integer `ν` (and, for MTO-01, a finite size-configuration grid or the balanced
  `ρ = 1/2` case) converts the runtime problem into an exact-rational comparison of the
  observed squared statistic against a certified binary64 cell with a known rounding
  margin, exactly as the Release 2 fixed-95 table does for `t`. Procedures that need the
  _distribution function_ at an arbitrary argument (adjusted p-values for Tukey-type
  procedures, Games-Howell at non-integer `ν`, step-down Dunnett at varying subset sizes)
  cannot use a finite table and remain in the oracle-only state until a runtime graph with
  a proof is constructed and reviewed.
- **I-05 (adjusted p-values for interval families are a separate numerical object).** A
  Tukey-type "adjusted p-value" is `P(Q_{k,ν} ≥ q_obs)` and needs class (c) at runtime;
  the rejection set of the same procedure needs only the table of I-04. The semantic
  result's P-04 already separates interval claims from p-value claims; numerically they
  are different feasibility classes and should be separately closable.
- **I-06 (duality must be defined on one comparison surface).** N-19 shows that
  independently rounded endpoints and a rounded test statistic can disagree at the
  boundary. If a Contract claims duality, both the interval "contains zero" decision and
  the rejection decision must be derived from the same exact-rational comparison
  `diff^2 · (denominator) ⋚ c^2 · (numerator)` against the same certified constant, with
  the reported endpoints computed afterwards and never used for the decision.
- **I-07 (near-critical decisions with irrational constants are decidable but not
  bounded).** N-20 shows that the decision `stat^2 > c^2` can be settled by refining the
  enclosure of `c^2` until the ball excludes the rational statistic; equality is impossible
  when `c^2` is irrational, but the required precision has no a-priori bound. A versioned
  precision ceiling with fail-closed refusal ("undecided at the supported precision") is
  the honest boundary; a tolerance is not.
- **I-08 (projection classes differ by family).** For tails, the Release 2 classes (normal,
  rounded-one, subnormal, zero) apply and are reachable at ordinary statistics when `d1`
  and `d2` are large (N-06). For adjusted p-values from the algebraic families, projection
  occurs once after exact computation, so the only projection classes are the four
  representational classes of the exact rational (normal, subnormal, exact zero from a
  zero raw p, exact one from clipping). For simultaneous intervals, the classes are the
  Release 2 endpoint classes plus a collapse refusal.
- **I-09 (Welch and Games-Howell families are numerically heavier than their homoscedastic
  counterparts, independent of their semantic holds).** Non-integer df removes the exact
  rational route and the table route (N-04, I-04). Their feasibility depends on either a
  runtime incomplete-beta graph with a proof at non-integer parameters or on a
  Studentized-range runtime graph; neither exists. This is a numerical finding that stands
  even if holds SR-A and SR-I close.
- **I-10 (stochastic families cannot have a truth oracle, only a replay oracle).** N-29 and
  N-30 (Section 4.8) show that the same data and procedure yield opposite decisions under
  different seeds and different bit-to-permutation mappings. The verifiable object is the
  exact replay of a declared generator, seed, mapping, replicate count, and scheme; the
  "p-value" is a property of that replay, not of the data alone. The semantic transfer of
  RSM-01, RSM-02, and OMN-06 to the seeded-stochastic program is consistent with this
  numerical boundary.
- **I-11 (single-library agreement is not authority, demonstrated).** N-07 and N-05 show
  two distinct failure modes of individual libraries at the boundaries (last-place errors
  in the far tail; non-finite direct evaluation near one). Route independence is a
  requirement, not a formality.

## 6. Coverage matrix for the 49 semantic catalogue entries

Numerical families used below:

| Family | Meaning                                                                                                                | Evidence routes demonstrated                                                                                     |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| NF-A   | Scalar F / Student-t tail or quantile through the regularized incomplete beta (N-01..N-07, N-22, N-23)                 | exact rational (integer parameters), ball enclosure, arbitrary precision, density quadrature                     |
| NF-B   | Algebraic multiplicity transform over declared p-values (sort, integer ratios, powers, harmonic sums) (N-08..N-17)     | exact rational, binary64 single-rounding forms, exhaustive invariance checks                                     |
| NF-C   | Studentized range distribution `Q_{k,ν}` and its quantiles (Section 4.5)                                               | arbitrary-precision nested quadrature, rigorous nested enclosure, exact `k = 2` and `ν → ∞` identities           |
| NF-C'  | Augmented Studentized range and Studentized maximum modulus (variants of NF-C with a different inner range functional) | none executed; same integral structure as NF-C (inference only)                                                  |
| NF-D   | Equicoordinate multivariate t with product correlation (Section 4.6)                                                   | arbitrary-precision product reduction, direct multi-dimensional quadrature, rigorous enclosure, `p = 1` identity |
| NF-E   | Closed-family combinatorics (`2^m - 1` intersections) over NF-B local tests (N-14, N-15)                               | exact rational, exhaustive equivalence                                                                           |
| NF-F   | Seeded resampling replay (Section 4.8)                                                                                 | exact replay, cross-seed and cross-mapping counterexamples, exhaustive enumeration bound                         |
| NF-G   | Rank transform with chi-square or exact permutation tail                                                               | none executed (transferred lane)                                                                                 |
| NF-0   | No numerical evaluation needed by Release 3 (rejected entry or framing source)                                         | not applicable                                                                                                   |

Preliminary numerical assessment labels (orthogonal to the semantic labels):
`PRELIM-FEASIBLE` (at least two independent evidence routes executed and a runtime candidate
pattern identified), `PRELIM-FEASIBLE-TABLE` (feasible for the rejection set and fixed-level
intervals through an exhaustively certified finite table; the distribution function at
arbitrary arguments remains oracle-only), `PRELIM-ORACLE-ONLY` (truth reference feasible by
enclosure; no runtime binary64 graph with an error proof exists), `PRELIM-DEFER` (a
reproducible truth reference, projection boundary, or resource-bounded path cannot be
defended now), `PRELIM-TRANSFER` (follows the semantic transfer; randomness or rank foundation
not closed), `PRELIM-NA` (no numerical path needed). In this `INPUT_INCOMPLETE` record these
are preliminary assessment labels, not numerical dispositions. "Gate" names the semantic
hold that blocks any Contract regardless of numerical feasibility.

| ID     | Procedure                            | Semantic disposition | Family            | Required quantities                                                                                 | Preliminary numerical assessment                                                 | Gate                      |
| ------ | ------------------------------------ | -------------------- | ----------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------- |
| OMN-01 | Classical one-way ANOVA F            | `R3-CAND`†           | NF-A              | F statistic algebra; F upper tail at integer `(k-1, N-k)`; F quantile for a fixed level             | `PRELIM-FEASIBLE`                                                                | SR-A                      |
| OMN-02 | Welch heteroscedastic omnibus        | `R3-CAND`†           | NF-A              | weighted statistic; non-integer denominator df; F tail at non-integer `d2`                          | `PRELIM-ORACLE-ONLY`                                                             | SR-A                      |
| OMN-03 | James first/second order             | `RES-ONLY`†          | NF-A              | chi-square tails plus series corrections (not probed)                                               | `PRELIM-DEFER`                                                                   | SR-A                      |
| OMN-04 | Brown-Forsythe modified F            | `RES-ONLY`†          | NF-A              | F tail at non-integer `d2`                                                                          | `PRELIM-ORACLE-ONLY`                                                             | SR-A                      |
| OMN-05 | Kruskal-Wallis                       | `TRANSFER`           | NF-G              | rank transform, ties, chi-square tail or exact permutation distribution                             | `PRELIM-TRANSFER`                                                                | —                         |
| OMN-06 | Permutation one-way tests            | `TRANSFER`           | NF-F              | randomness identity, permutation scheme, replicate count                                            | `PRELIM-TRANSFER`                                                                | —                         |
| PVL-01 | Bonferroni                           | `R3-CAND`            | NF-B (+NF-A)      | `min(1, m p)`; per-member `t` quantile at `α/(2m)` for rectangular intervals                        | `PRELIM-FEASIBLE`                                                                | SR-B (attribution only)   |
| PVL-02 | Šidák                                | `R3-CAND`†           | NF-B              | exact `(1-p)^m` decision; correctly rounded `1-(1-p)^m` report                                      | `PRELIM-FEASIBLE`                                                                | SR-B                      |
| PVL-03 | Holm step-down                       | `R3-CAND`            | NF-B              | stable sort, running maximum, `α/(m-r)` thresholds                                                  | `PRELIM-FEASIBLE`                                                                | —                         |
| PVL-04 | Holm product-form                    | `R3-CAND`            | NF-B              | exact `(1-p)^{m-r} ≥ 1-α` decisions                                                                 | `PRELIM-FEASIBLE`                                                                | —                         |
| PVL-05 | Weighted Holm                        | `RES-ONLY`           | NF-B              | rational weights; weighted thresholds                                                               | `PRELIM-FEASIBLE`                                                                | —                         |
| PVL-06 | Simes global test                    | `RES-ONLY`†          | NF-B              | `min_i (m/i) p_(i)`                                                                                 | `PRELIM-FEASIBLE`                                                                | SR-C                      |
| PVL-07 | Hochberg step-up                     | `R3-CAND`†           | NF-B              | sort, running minimum from the top                                                                  | `PRELIM-FEASIBLE`                                                                | SR-C                      |
| PVL-08 | Hommel                               | `RES-ONLY`†          | NF-B/NF-E         | quadratic-time closed-Simes algorithm; exponential definition for small-`m` cross-checks            | `PRELIM-FEASIBLE` (with ceiling)                                                 | SR-C                      |
| PVL-09 | Shaffer logically restricted         | `RES-ONLY`†          | NF-B              | per-step maximal number of true hypotheses under logical constraints (integer sequence); thresholds | `PRELIM-FEASIBLE` (integer sequence must be versioned)                           | SR-C                      |
| PVL-10 | Rom; Holland-Copenhaver              | `RES-ONLY`†          | NF-B              | Rom constants (polynomial recursion in `α`); product-form step-down                                 | `PRELIM-FEASIBLE` (constants exact-rational only if the recursion is versioned)  | SR-C                      |
| CLS-01 | Closed testing principle             | `R3-CAND`†           | NF-E              | all `2^m - 1` intersection tests over a local-test family                                           | `PRELIM-FEASIBLE` (with ceiling)                                                 | SR-D                      |
| CLS-02 | Fixed-sequence                       | `RES-ONLY`†          | NF-B              | ordered comparison at full `α`                                                                      | `PRELIM-FEASIBLE`                                                                | SR-D                      |
| CLS-03 | Fallback                             | `RES-ONLY`†          | NF-B              | rational `α`-propagation bookkeeping                                                                | `PRELIM-FEASIBLE`                                                                | SR-D                      |
| CLS-04 | Serial gatekeeping                   | `RES-ONLY`†          | NF-B/NF-E         | family-level tests (NF-B or NF-E) in sequence                                                       | `PRELIM-FEASIBLE` (with ceiling)                                                 | SR-D                      |
| CLS-05 | Parallel gatekeeping                 | `RES-ONLY`†          | NF-B/NF-E         | same                                                                                                | `PRELIM-FEASIBLE` (with ceiling)                                                 | SR-D                      |
| CLS-06 | Graphical weighted Bonferroni        | `RES-ONLY`†          | NF-B              | rational weight/transition matrices; iterative `α` reallocation                                     | `PRELIM-FEASIBLE`                                                                | SR-D                      |
| APR-01 | Balanced Studentized-range intervals | `R3-CAND`            | NF-C              | `q_{α;k,ν}` at integer `ν`; `S/sqrt(n)`; exact statistic comparison; adjusted p needs `P(Q ≥ q)`    | `PRELIM-FEASIBLE-TABLE`                                                          | — (SR-E attribution only) |
| APR-02 | Tukey-Kramer intervals               | `R3-CAND`            | NF-C              | same constant; per-pair `sqrt((1/n_i+1/n_j)/2)` (exact rational under the square)                   | `PRELIM-FEASIBLE-TABLE`                                                          | —                         |
| APR-03 | Kramer multiple-range test           | `RES-ONLY`           | NF-C              | `q` at varying span `2..k`                                                                          | `PRELIM-FEASIBLE-TABLE`                                                          | —                         |
| APR-04 | Spjøtvoll-Stoline extended T         | `RES-ONLY`           | NF-C'             | augmented Studentized range quantile; `max(a_i, a_j)`                                               | `PRELIM-DEFER`                                                                   | —                         |
| APR-05 | Hochberg GT2                         | `RES-ONLY`†          | NF-C'             | Studentized maximum modulus quantile                                                                | `PRELIM-DEFER`                                                                   | SR-F                      |
| APR-06 | Genizi-Hochberg                      | `RES-ONLY`†          | NF-C'             | special tables (uninspected)                                                                        | `PRELIM-DEFER`                                                                   | SR-F                      |
| APR-07 | Gabriel                              | `REJECT`             | NF-0              | —                                                                                                   | `PRELIM-NA`                                                                      | —                         |
| APR-08 | Harmonic-mean substitution           | `REJECT`             | NF-0              | —                                                                                                   | `PRELIM-NA`                                                                      | —                         |
| APR-09 | Scheffé all-contrasts                | `R3-CAND`†           | NF-A              | F quantile at `(k-1, ν)`; exact `contrast^2/var ≤ (k-1)F` surface                                   | `PRELIM-FEASIBLE`                                                                | SR-G                      |
| APR-10 | Newman-Keuls                         | `RES-ONLY`†          | NF-C              | `q` at spans `2..k`                                                                                 | `PRELIM-FEASIBLE-TABLE`                                                          | SR-H                      |
| APR-11 | Duncan                               | `RES-ONLY`†          | NF-C              | `q` at span-dependent levels `1-(1-α)^{s-1}`                                                        | `PRELIM-ORACLE-ONLY`                                                             | SR-H                      |
| APR-12 | REGWQ                                | `RES-ONLY`†          | NF-C              | `q` at span-dependent levels `1-(1-α)^{s/k}`                                                        | `PRELIM-ORACLE-ONLY`                                                             | SR-H                      |
| APR-13 | Fisher protected LSD                 | `RES-ONLY`†          | NF-A              | F tail then `t` quantile                                                                            | `PRELIM-FEASIBLE`                                                                | SR-H                      |
| APR-14 | Hayter modified LSD                  | `RES-ONLY`†          | NF-C              | `q_{α;k-1,ν}/sqrt 2`                                                                                | `PRELIM-FEASIBLE-TABLE`                                                          | SR-H                      |
| HET-01 | Games-Howell                         | `R3-CAND`†           | NF-C (+NF-A)      | per-pair Welch-Satterthwaite `ν_ij` (non-integer); `q_{α;k,ν_ij}`                                   | `PRELIM-ORACLE-ONLY`                                                             | SR-I                      |
| HET-02 | Tamhane T2                           | `RES-ONLY`†          | NF-A/NF-B         | per-pair `t` quantile at Šidák-adjusted level with non-integer `ν_ij`                               | `PRELIM-ORACLE-ONLY`                                                             | SR-I                      |
| HET-03 | Dunnett T3 and C                     | `RES-ONLY`†          | NF-C'/NF-C        | Studentized maximum modulus (T3) or `q` (C) at non-integer `ν_ij`                                   | `PRELIM-DEFER`                                                                   | SR-I                      |
| MTO-01 | Dunnett many-to-one intervals        | `R3-CAND`            | NF-D              | equicoordinate constant at `(p, ν, λ_1..λ_p)`; one- and two-sided                                   | `PRELIM-FEASIBLE-TABLE` (balanced grid) / `PRELIM-ORACLE-ONLY` (arbitrary sizes) | —                         |
| MTO-02 | Step-down Dunnett                    | `RES-ONLY`†          | NF-D              | constants at shrinking subset sizes                                                                 | `PRELIM-ORACLE-ONLY`                                                             | SR-J                      |
| MTO-03 | Step-up Dunnett-Tamhane              | `RES-ONLY`†          | NF-D              | step-up constants (own tables)                                                                      | `PRELIM-DEFER`                                                                   | SR-J                      |
| MCB-01 | Hsu MCB                              | `RES-ONLY`†          | NF-D              | one-sided Dunnett-type constants with constrained intervals                                         | `PRELIM-ORACLE-ONLY`                                                             | SR-J                      |
| FDR-01 | Benjamini-Hochberg                   | `R3-CAND`            | NF-B              | sort, `(i/m) q` thresholds, running minimum                                                         | `PRELIM-FEASIBLE`                                                                | — (dependence scope SR-K) |
| FDR-02 | Benjamini-Yekutieli                  | `R3-CAND`†           | NF-B              | exact harmonic constant; thresholds                                                                 | `PRELIM-FEASIBLE`                                                                | SR-K                      |
| FDR-03 | Adaptive / two-stage BH              | `RES-ONLY`†          | NF-B              | `m_0` estimator (integer count from a first pass); re-thresholding                                  | `PRELIM-FEASIBLE` (once the estimator is versioned)                              | SR-K                      |
| FDR-04 | Storey q-value                       | `TRANSFER`           | NF-B (+smoothing) | `π_0` estimation with a tuning parameter or spline smoothing                                        | `PRELIM-TRANSFER`                                                                | SR-K                      |
| RSM-01 | Westfall-Young maxT/minP             | `TRANSFER`           | NF-F              | randomness identity, permutation scheme, `B`, max statistic, empirical tail                         | `PRELIM-TRANSFER`                                                                | —                         |
| RSM-02 | Permutation pairwise/step-down       | `TRANSFER`           | NF-F              | same                                                                                                | `PRELIM-TRANSFER`                                                                | —                         |

The matrix contains 49 distinct entries and 50 scope-assessment labels because MTO-01 has
two intentionally different scope classifications. Label counts: `PRELIM-FEASIBLE` 22,
`PRELIM-FEASIBLE-TABLE` 6 (APR-01, APR-02, APR-03,
APR-10, APR-14, MTO-01 balanced), `PRELIM-ORACLE-ONLY` 9 (OMN-02, OMN-04, APR-11, APR-12,
HET-01, HET-02, MTO-02, MCB-01, and MTO-01 at arbitrary sizes counted with its table
entry), `PRELIM-DEFER` 6 (OMN-03, APR-04, APR-05, APR-06, HET-03, MTO-03), `PRELIM-TRANSFER` 5
(OMN-05, OMN-06, FDR-04, RSM-01, RSM-02), `PRELIM-NA` 2 (APR-07, APR-08). The two guidance
entries GUI-01 and GUI-02 and the five recorded exclusions need no numerical path.

For the seven semantically unblocked `R3-CAND` entries: PVL-01, PVL-03, PVL-04, FDR-01 are
`PRELIM-FEASIBLE`; APR-01 and APR-02 are `PRELIM-FEASIBLE-TABLE`; MTO-01 is
`PRELIM-FEASIBLE-TABLE` for a balanced or finite size-configuration grid and
`PRELIM-ORACLE-ONLY` for arbitrary size configurations.

### 6.1 Follow-up procedures: what must be independently certified (commission question 5)

| Procedure               | Reference distribution                                                   | Covariance / correlation structure                                                         | Degrees of freedom                                                          | Critical value                                                                                              | Simultaneous interval construction                                                                      | Certification status here                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tukey balanced (APR-01) | Studentized range `Q_{k,ν}` (SRC-06 p. 61)                               | equal variances of means; correlation structure enters only through the range              | `ν = N - k` integer                                                         | `q_{α;k,ν}`; certified by two-cell bracket with rigorous CDF signs (Section 4.5)                            | `ȳ_i - ȳ_j ± q S/sqrt(n)` (SRC-06 (1.1)); decision on the exact surface `n (ȳ_i-ȳ_j)^2 / S^2 ⋚ q^2`     | oracle: two routes plus exact `k = 2` anchor; runtime: table candidate; adjusted p: oracle-only                                                  |
| Tukey-Kramer (APR-02)   | same                                                                     | unequal sizes; per-pair factor `sqrt((1/n_i+1/n_j)/2)` (SRC-06 (1.2), SRC-05 p. 308)       | same                                                                        | same constant                                                                                               | half-width `q S sqrt((1/n_i+1/n_j)/2)`; exact surface `2 (ȳ_i-ȳ_j)^2 / (S^2 (1/n_i+1/n_j)) ⋚ q^2`       | same as APR-01; conservativeness is a semantic fact (F-14), not a numerical one                                                                  |
| Dunnett (MTO-01)        | equicoordinate multivariate t, product correlation (SRC-03 eqs. (4)–(7)) | `ρ_ij = λ_i λ_j`, `λ_i = sqrt(n_i/(n_i+n_0))` (derived in Section 4.6 from SRC-03 p. 1103) | `ν = N - k` integer                                                         | one-sided `d` and two-sided `d'` per sidedness (SRC-03 p. 1101–1105); bracket certified for one probed case | `ȳ_i - ȳ_0 ± d S sqrt(1/n_i + 1/n_0)`; exact surface per member                                         | oracle: product reduction validated by direct integral and `p = 1` identity; runtime: balanced-grid table candidate; arbitrary sizes oracle-only |
| Scheffé (APR-09)        | F at `(k-1, ν)`                                                          | any contrast `c` with `Σ c_i = 0`; variance `S^2 Σ c_i^2/n_i` (exact rational)             | `k - 1`, `N - k`                                                            | `F_{α;k-1,ν}`; two-cell bracket certified (N-22)                                                            | `c·ȳ ± sqrt((k-1) F) S sqrt(Σ c_i^2/n_i)`; exact surface `(c·ȳ)^2 / (S^2 Σ c_i^2/n_i) ⋚ (k-1) F` (N-23) | oracle and runtime feasible on the exact surface; semantic hold SR-G                                                                             |
| Games-Howell (HET-01)   | Studentized range at per-pair `ν_ij`                                     | per-pair variances `s_i^2/n_i + s_j^2/n_j`; no pooled variance                             | Welch-Satterthwaite `ν_ij` (rational function of `s_i^2, n_i`), non-integer | `q_{α;k,ν_ij}` at non-integer `ν`                                                                           | `ȳ_i - ȳ_j ± q sqrt((s_i^2/n_i + s_j^2/n_j)/2)`                                                         | oracle only (non-integer `ν`); no table; semantic hold SR-I                                                                                      |

## 7. Candidate algorithms and alternatives (no selection)

Each row lists candidates only; the classes are `exact`, `bounded` (rigorous enclosure),
`deterministic approximate` (no error proof), `tabulated`, and `stochastic`. Sources marked
NSR-xx were not inspectable (Section 2.2); their algorithms are named from bibliographic
identity only and are not endorsed.

| Quantity                                           | Exact                                                                                                                                            | Bounded                                                                                                                                                                                                                             | Deterministic approximate                                                                     | Tabulated                                                                                | Stochastic                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| F / t tail, integer df                             | finite binomial sum when both halved parameters are integers (N-02); for one odd parameter, closed forms with `arcsin`/`sqrt` terms (not probed) | ball-arithmetic regularized incomplete beta with complement switch (N-01, N-05); Release 2 positive-series graph with table-cell normalization and a-posteriori remainder (blob `df57149c…`) generalized to `1/B(d2/2, d1/2)` cells | continued-fraction incomplete beta as used by common libraries (N-07 shows last-place errors) | not applicable (arbitrary argument)                                                      | —                                                              |
| F / t tail, non-integer df                         | none                                                                                                                                             | ball-arithmetic incomplete beta (N-04); density quadrature with analytic tail bound (N-04)                                                                                                                                          | continued fraction; series                                                                    | none                                                                                     | —                                                              |
| F / t quantile at fixed level                      | none (transcendental)                                                                                                                            | monotone bracket at binary64 cells with ball signs (N-22, N-23), optionally confirmed by the exact route                                                                                                                            | Newton/Halley on a library CDF                                                                | exhaustively certified `(d1, d2)` grid at fixed level (Release 2 fixed-95 pattern)       | —                                                              |
| Studentized range CDF                              | `k = 2` reduces to `t` (Section 4.5)                                                                                                             | rigorous nested integration on truncated domains with exact omitted-mass bounds (Section 4.5)                                                                                                                                       | Copenhaver-Holland Gauss-Legendre scheme (NSR-05); AS 190 (NSR-06)                            | none at arbitrary argument                                                               | —                                                              |
| Studentized range quantile                         | none                                                                                                                                             | bracket at binary64 cells with rigorous CDF signs (Section 4.5)                                                                                                                                                                     | secant/Newton on an approximate CDF; AS 190 initial approximation                             | exhaustively certified `(k, ν)` grid at fixed level (candidate runtime instrument, I-04) | —                                                              |
| Augmented range / maximum modulus                  | none                                                                                                                                             | same nested structure with a modified inner functional (not executed)                                                                                                                                                               | —                                                                                             | historical tables (uninspected)                                                          | —                                                              |
| Equicoordinate multivariate t, product correlation | `p = 1` reduces to `t` (Section 4.6)                                                                                                             | rigorous nested integration of the product reduction (Section 4.6)                                                                                                                                                                  | Dunnett's AS 251 lineage (NSR-09); Genz-Bretz quasi-Monte Carlo is stochastic (below)         | exhaustively certified `(p, ν)` grid at `ρ = 1/2` or a finite size-configuration grid    | Genz-Bretz randomized lattice (NSR-08)                         |
| Adjusted p-values (algebraic)                      | exact rational (N-08)                                                                                                                            | —                                                                                                                                                                                                                                   | binary64 single-rounding forms (N-11)                                                         | —                                                                                        | —                                                              |
| Šidák / product-form thresholds                    | exact `(1-p)^r ≥ 1-α` (N-08)                                                                                                                     | ball enclosure of `1-(1-α)^{1/r}`                                                                                                                                                                                                   | `expm1/log1p` form (N-11)                                                                     | —                                                                                        | —                                                              |
| BY constant                                        | exact harmonic number (N-12)                                                                                                                     | —                                                                                                                                                                                                                                   | binary64 sums (order-dependent, N-12)                                                         | —                                                                                        | —                                                              |
| Closed testing                                     | exhaustive intersections with a versioned `m` ceiling (N-15)                                                                                     | —                                                                                                                                                                                                                                   | shortcut procedures (Holm for Bonferroni local tests, N-14; Hommel quadratic algorithm, N-14) | —                                                                                        | —                                                              |
| Resampling adjusted p                              | exhaustive enumeration for tiny designs (Section 4.8)                                                                                            | —                                                                                                                                                                                                                                   | —                                                                                             | —                                                                                        | replay of a declared generator, mapping, and `B` (Section 4.8) |

## 8. Failure and refusal boundaries

Refusal candidates are separated from numerical-error questions. Each is a candidate
reason-code family, not an issued code.

### 8.1 Binary64 class transitions

| Stage                               | Zero                                                                   | Subnormal                                                                                          | Normal         | One                                                                                        | Overflow / non-finite                         | Near-critical                                                                                                                     |
| ----------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Parsed observations                 | admitted                                                               | admitted unless a stage predicate refuses (Release 2 pattern)                                      | admitted       | —                                                                                          | non-finite refused at ingress (existing rule) | —                                                                                                                                 |
| Group means, differences, contrasts | exact zero difference is a valid statistic                             | subnormal difference: information-loss class candidate                                             | ordinary       | —                                                                                          | `DIFFERENCE_OVERFLOW`-type refusal (N-21)     | —                                                                                                                                 |
| Within-group variance / MSE         | zero MSE is a computability refusal (denominator degenerates)          | subnormal MSE: underflow class candidate (Release 2 `standard-error-squared underflow` analogue)   | ordinary       | —                                                                                          | overflow refusal                              | —                                                                                                                                 |
| F or t statistic                    | `f = 0` is valid (`p = 1` exactly, N-06)                               | subnormal statistic: valid mathematically; tail rounds to one                                      | ordinary       | —                                                                                          | overflow refusal                              | —                                                                                                                                 |
| Unadjusted tail probability         | positive truth projecting to `+0`: refusal candidate (Release 2 class) | positive subnormal: refusal candidate unless target-format-aware evidence exists (Release 2 class) | ordinary       | rounded-one: format success with margin proof (Release 2 class); N-06 gives the boundaries | —                                             | margin to the nearest class transition must exceed the input-specific bound (Release 2 rule)                                      |
| Adjusted p-value (algebraic)        | exact zero only from an exact-zero raw p                               | exact rational may be subnormal after clipping-free scaling; one correctly rounded projection      | ordinary       | exact one from clipping is legitimate                                                      | —                                             | decisions are exact; no near-critical numerical hazard (I-01)                                                                     |
| Critical constant lookup            | —                                                                      | —                                                                                                  | certified cell | —                                                                                          | —                                             | `stat^2` exactly equal to a cell midpoint is impossible for irrational constants; margin rule from the cell's certified enclosure |
| Interval endpoints                  | endpoint exactly zero is representable                                 | —                                                                                                  | ordinary       | —                                                                                          | endpoint overflow refusal                     | collapse (`L == U`, N-18) refusal; duality only on the exact surface (I-06)                                                       |
| Resampling                          | count zero gives `1/(B+1)`, never `0`                                  | —                                                                                                  | —              | count `B` gives exactly `1`                                                                | —                                             | seed-dependent decisions are inherent (Section 4.8); not a numerical error                                                        |

### 8.2 Ordering, ties, clipping, monotonicity, permutation invariance

- Ordering: the stable sort key is `(p value, input index)`; the ordered member list is
  part of the result (semantic P-05). With that key, N-13 shows permutation invariance of
  the adjusted values; a different tie rule would change only which index is listed first,
  never an adjusted value or a decision.
- Ties: identical raw p-values receive identical adjusted p-values and identical decisions
  in every probed procedure (N-13). This is a property to assert in the check, not to
  assume.
- Clipping: `min(1, ·)` is applied once, after the running maximum/minimum, on the exact
  rational (N-13).
- Monotonicity: adjusted p-values are monotone in the ordered position and in each raw
  p-value (N-13); a verifier can assert these as postconditions.
- Family-size boundaries: `m = 0` refuses; `m = 1` is the identity (N-13); a versioned `m`
  ceiling is required for NF-E (N-15) and for the exact power in Šidák-type transforms
  (N-15).

### 8.3 Rules to version per algebraic procedure (commission question 4)

| Procedure                    | Ordering                                     | Tie rule                                                                       | Clipping                                       | Monotonicity enforcement                                                               | Projection                                                             | Other versioned constants                                           |
| ---------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Bonferroni (PVL-01)          | none                                         | none                                                                           | `min(1, m p)` once                             | none needed                                                                            | one correctly rounded projection of the exact rational                 | exact level `α`; `m` ceiling                                        |
| Šidák (PVL-02)               | none                                         | none                                                                           | none (`1-(1-p)^m ≤ 1` exactly)                 | none needed                                                                            | one correctly rounded projection; naive binary64 form forbidden (N-11) | exact level; `m` and bit-length ceilings (N-15)                     |
| Holm (PVL-03)                | ascending by `(p, input index)`              | equal `p` get equal thresholds outcome (N-13); index breaks listing order only | `min(1, ·)` after running maximum              | running maximum over ordered positions                                                 | one projection per adjusted value                                      | exact level; stop index reported                                    |
| Holm product-form (PVL-04)   | same                                         | same                                                                           | none                                           | running maximum                                                                        | same                                                                   | exact decisions `(1-p_(r))^{m-r} ≥ 1-α`                             |
| Hochberg (PVL-07)            | same                                         | same                                                                           | `min(1, ·)` after running minimum from the top | running minimum from the top                                                           | same                                                                   | exact level                                                         |
| Hommel (PVL-08)              | same                                         | same                                                                           | `min(1, ·)`                                    | by construction of the quadratic algorithm; exhaustive cross-check at small `m` (N-14) | same                                                                   | algorithm identity (quadratic form) and `m` ceiling                 |
| Benjamini-Hochberg (FDR-01)  | same                                         | same                                                                           | `min(1, ·)` after running minimum from the top | running minimum from the top                                                           | same; two-rounding forms forbidden (N-11)                              | exact level `q`; threshold form `(i/m) q` as exact rational         |
| Benjamini-Yekutieli (FDR-02) | same                                         | same                                                                           | same                                           | same                                                                                   | same                                                                   | exact harmonic constant (N-12)                                      |
| Closed testing (CLS-01)      | none (set enumeration order is non-semantic) | none                                                                           | per local test                                 | coherence is automatic                                                                 | none (decisions only)                                                  | local-test identity; `m` ceiling (N-15)                             |
| Gatekeeping (CLS-02..06)     | declared order or graph                      | none                                                                           | per family                                     | none                                                                                   | none                                                                   | rational weights and transition matrices; propagation rule identity |

### 8.4 Covariance degeneracy and correlation boundaries

- Many-to-one product correlation `λ_i = sqrt(n_i/(n_i+n_0))` lies in `(0, 1)` for
  `n_i, n_0 ≥ 1`; `λ_i → 1` is impossible for finite sizes, so the inner integrand's
  `1/sqrt(1-λ_i^2)` is finite. `n_0 = 0` and `n_i = 0` are refusals before evaluation.
- All-pairs and many-to-one families with `ν = 0` (one observation per group) are
  computability refusals (no variance estimate); `ν = 1` and `ν = 2` are heavy-tailed cases
  that need explicit outer-domain handling (Section 4.5 uses `smax = 400` and `60`).
- A degenerate contrast (all-zero coefficients) or a contrast outside the declared family
  is a declaration refusal, not a numerical one.

### 8.5 Resource and precision refusals

- Nested rigorous integration returns a wide ball under an evaluation limit (N-24); the
  refusal predicate is "radius exceeds the required margin", never "value looks wrong".
- Enclosure-refinement decisions (I-07) refuse as `UNDECIDED_AT_SUPPORTED_PRECISION` when
  the versioned precision ceiling is reached.
- Exact-rational transforms refuse when a versioned bit-length or `m` ceiling is exceeded
  (N-15), without a support claim.
- First-failure ordering (Release 2 lesson): the order in which stage predicates are
  evaluated must be fixed and witnessed, because the same input can fail several
  predicates (for example a subnormal MSE and a later endpoint collapse).

## 9. Independent oracle and certificate strategies by numerical family

| Family                                  | Truth reference                                                                           | Precision and convergence evidence                                                                                                                                         | Independence requirement                                                                                                                                                                           | Certificate form                                                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| NF-A (integer, both-even)               | exact rational (N-02)                                                                     | none needed; integer arithmetic                                                                                                                                            | exact route plus one enclosure route (different code base) with containment                                                                                                                        | exact numerator/denominator or their hashes; binary64 rounding cell with exact midpoints                           |
| NF-A (other integer and non-integer df) | ball enclosure of `I_x(a,b)` with complement switch (N-01, N-04, N-05)                    | radius reported at the working precision; precision doubled until the radius is below the required margin (Release 2 "increasing precision history with declared ceiling") | ball route plus arbitrary-precision route from a different code base, agreement to a declared digit count; density-quadrature route as a third, method-distinct check where the density is regular | enclosure endpoints as exact rationals; rounding-cell containment; precision history                               |
| NF-A quantiles                          | monotone bracket at binary64 cells (N-22)                                                 | ball signs at both cells with radii strictly smaller than the distance to zero                                                                                             | same as above; exact route confirmation where both-even                                                                                                                                            | the two cells, the two signed enclosures, monotonicity direction                                                   |
| NF-B                                    | exact rational (N-08)                                                                     | none                                                                                                                                                                       | two independent exact implementations (for example integer-arithmetic implementations in two languages) must agree bit-for-bit on adjusted values and decisions                                    | exact rationals or a canonical trace (N-17)                                                                        |
| NF-C                                    | rigorous nested integral with exact omitted-mass bounds (Section 4.5)                     | ball radius at the requested tolerance; truncation masses reported separately; `k = 2` identity and `ν → ∞` limit as exact anchors                                         | rigorous route plus arbitrary-precision route from a different code base; exact identity checks at `k = 2`; monotonicity in `q`, `k`, `ν`                                                          | enclosure endpoints; truncation parameters `(Z, ε, smax)`; evaluation limits used; identity-anchor residuals       |
| NF-C quantiles (tables)                 | bracket at binary64 cells with rigorous CDF signs                                         | as NF-A quantiles, with the heavier per-evaluation cost recorded                                                                                                           | same as NF-C; cross-check against `k = 2` exact column                                                                                                                                             | ordered `(k, ν)` cells, per-cell certificates, table content hash (Release 2 table pattern)                        |
| NF-C'                                   | not executed; the same strategy applies once the inner functional is derived and reviewed | —                                                                                                                                                                          | —                                                                                                                                                                                                  | —                                                                                                                  |
| NF-D                                    | rigorous nested integral of the product reduction (Section 4.6)                           | ball radius; truncation masses; `p = 1` identity; direct multi-dimensional quadrature at `p = 2` as a method-distinct check that does not use the product reduction        | rigorous route plus arbitrary-precision route; direct-integral route at low dimension                                                                                                              | enclosure endpoints; the `λ_i` vector as exact rationals under the square; sidedness                               |
| NF-E                                    | exhaustive intersections (N-14)                                                           | none (finite)                                                                                                                                                              | shortcut algorithm versus exhaustive definition on small `m` (N-14)                                                                                                                                | trace of intersection tests or the equivalent shortcut trace                                                       |
| NF-F                                    | exact replay (Section 4.8); exhaustive enumeration for tiny designs                       | none (deterministic given the declaration)                                                                                                                                 | two independent implementations of the declared generator and mapping must reproduce the same permutation sequence bit-for-bit                                                                     | generator identity, seed, mapping, `B`, scheme, digest of the permutation sequence or of the sorted max-statistics |

Certificate closure rules from Release 2 (exact rational endpoints, exact rounding-cell
endpoints and strict containment, real overlap checks for the secondary path, executed
closed-form paths where applicable, monotone midpoint bracketing, increasing precision
history with a declared ceiling, generator/environment hashes) transfer unchanged in form
to NF-A, NF-C, and NF-D certificates. The Release 2 caveat that its secondary route is
method-distinct but not library-independent is addressed here by the arbitrary-precision
route and the exact route, which share no library with the ball route.

## 10. Proposed evidence corpora and adversarial plans

Corpora are executable review material; none defines a supported domain.

1. **Tail identity corpus (NF-A).** The 576-point grid of Probe A plus non-integer `d2`
   cases; each case carries the exact rational value where available, the enclosure, the
   arbitrary-precision value, and the binary64 class. Adversarial additions: `f` at each
   class transition of N-06 and at its two neighbouring binary64 cells; `x` within
   `1e-300` of one (N-05); `d1 = d2 = 1`; `d2 = 1/2`; the largest finite `f`.
2. **Release 2 witness reuse.** The `df = 197` witness and the twenty Release 2 tail-truth
   cases as `d1 = 1` members of the F corpus (cross-family consistency).
3. **Quantile bracket corpus (NF-A).** Fixed-level F quantiles on an integer
   `(d1, d2)` grid and a non-integer `d2` sample, each with the two-cell bracket
   certificate and, where both-even, the exact confirmation.
4. **Adjusted-p corpus (NF-B).** Exhaustive permutation/tie families (N-13); random
   wide-exponent families including subnormal and exact-zero p-values; near-threshold
   families constructed around `α/m` and `(i/m) q` (N-10) at each evaluation-order variant;
   the level-identity witnesses (N-09); BY constants at `m ∈ {10, 100, 1000, 10^5}` (N-12);
   `m = 1` and `m` at the ceiling; malformed inputs (N-16); trace tampers (N-17).
5. **Closed-family corpus (NF-E).** Random families at `m ≤ 5` for shortcut equivalence
   (N-14); `m` at and beyond the ceiling for refusal.
6. **Studentized range corpus (NF-C).** `k = 2` identity column across `ν`; `ν → ∞` normal
   range anchors; a `(k, ν, q)` grid with rigorous enclosures; monotonicity triples in
   `q`, `k`, `ν`; `ν ∈ {1, 2}` heavy-tail cases; `q` at the rounds-to-one boundary;
   non-integer `ν`; `k` at the proposed maximum.
7. **Many-to-one corpus (NF-D).** `p = 1` identity; `p = 2` direct-integral cross-checks
   at unequal sizes; balanced `ρ = 1/2` grid; `n_0` extremes (`1` and very large);
   dimension sweep `p = 1..30`; one- and two-sided; `d = 0` anchors (`two-sided → 0`,
   one-sided `→ P(all Z_i ≤ 0)`); large `d` rounding to one.
8. **Interval corpus.** Endpoint collapse and input-algebra cases (N-18); duality flip
   witnesses (N-19); enclosure-refinement decisions at increasing precision (N-20);
   overflow (N-21); exact power-of-two scaling and common translation metamorphisms
   (Release 2 relations) extended to `k` groups; group-label permutation invariance.
9. **Stochastic corpus.** Replay identity vectors (first outputs of the declared generator
   for fixed seeds); cross-seed decision tables at a near-critical dataset; cross-mapping
   witnesses; exhaustive-enumeration anchors for tiny designs (Section 4.8).
10. **Resource corpus.** Evaluation-limit exhaustion of the rigorous integrator (N-24);
    exact-power bit-length growth (N-15); closed-testing time at `m = 10, 16, 20`
    (N-15); malformed distributional parameters (N-24).

Metamorphic relations to assert across all families: observation permutation within a
group, group-label permutation (all-pairs families), exact power-of-two scaling of all
observations (statistics invariant), exact common translation (statistics invariant),
sign reversal (two-sided quantities invariant, one-sided quantities mirror), and family
member permutation (NF-B).

## 11. Separate error ledgers

| Ledger                             | Content                                                                                                   | Truth reference                                                                                | Release 2 analogue                |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------- |
| L1 input algebra                   | group sums, means, centered squares, MSE, differences, contrasts, `1/n_i` combinations                    | exact rational from parsed bits (Release 2 G4 pattern with `k` groups)                         | G4 truth-error envelope           |
| L2 omnibus and contrast statistics | F, Welch statistic, contrast statistic, per-pair `t`                                                      | exact rational (integer df) or rational-plus-square-root (report squares)                      | G4 test statistic                 |
| L3 covariance and correlation      | `λ_i`, `ρ_ij`, `sqrt((1/n_i + 1/n_j)/2)`: all rational under the square                                   | exact rational                                                                                 | none                              |
| L4 degrees of freedom              | integer (`N - k`, `k - 1`) or non-integer (Welch-Satterthwaite: rational function of variances and sizes) | exact rational; report as binary64 with its own rounding term                                  | integer df exact                  |
| L5 unadjusted probabilities        | F, t, range, multivariate-t tails                                                                         | enclosure (NF-A/C/D) or exact (both-even)                                                      | tail truth (input-specific bound) |
| L6 multiplicity transforms         | adjusted p-values, thresholds, decisions                                                                  | exact rational (NF-B)                                                                          | none                              |
| L7 critical values                 | table cells                                                                                               | certified cell with `abs(c - c_true) ≤ ½ ULP(c)`                                               | fixed-95 table                    |
| L8 interval endpoints              | estimate ± constant × standard error                                                                      | exact rational endpoint envelope with the cell's quantization term added once (Release 2 rule) | M3 endpoint truth                 |
| L9 binary64 projection             | class of each reported value; margin to the nearest class transition                                      | exact rounding cells                                                                           | projection margin                 |

Ledgers L3 and L4 are new relative to Release 2; L4 at non-integer df has no exact
integer relation and must carry its own rounding term into L5.

## 12. Items that must be versioned rather than inherited

- Operation graphs: group-mean and MSE reduction trees for `k` groups (the Release 2
  floor-half recursion generalizes but must be re-specified per group and for the pooled
  sum); contrast evaluation order; the exact-rational NF-B graph; the complement switch
  point for `I_x(a,b)` (N-05); the square-free comparison surfaces for duality (I-06).
- Constants: the exact rational level `α`; the exact harmonic constants `c(m)` (N-12);
  Rom and Shaffer integer/polynomial sequences if PVL-09/10 are ever adopted; normalization
  cells `1/B(d2/2, d1/2)` if a Release 2-style series graph is adopted; every table cell
  and the table content hash.
- Ceilings: `m` ceilings for NF-B exact powers and for NF-E; bit-length ceilings for exact
  rationals; precision ceilings for enclosure-refinement decisions (I-07); iteration and
  evaluation limits for any runtime series or integral; trace node ceilings.
- Truncation parameters for oracle generation (`Z`, `ε`, `smax`) and the exact omitted-mass
  bounds attached to them.
- Randomness identity (Section 4.8): generator algorithm and seeding, bounded-integer
  mapping, shuffle algorithm, replicate count, scheme.
- Supported-execution predicate and controlled-process profile (Release 2 pattern), extended
  to whatever primitives the Release 3 graph uses.

## 13. Resampling-based candidates and the randomness contract

Section 4.8 establishes that a replay contract is feasible and that a truth contract is
not. The minimum declaration for any resampling procedure to be independently checkable
is: generator algorithm (as exact integer operations), seeding procedure, bounded-integer
mapping (rejection sampling or an explicitly versioned alternative), shuffle algorithm,
replicate count `B`, the resampling scheme (which labels are permuted, whether within
strata), the statistic definition in exact arithmetic, and the tie rule for the empirical
tail count. Under that declaration the verification class is "exact replay of a declared
computation"; the resulting adjusted p-values are seed-dependent facts, not data facts
(N-29, N-30). Candidates that cannot yet meet the boundary (RSM-01, RSM-02, OMN-06) remain
`PRELIM-TRANSFER`, consistent with the semantic transfer; no deterministic approximation is
substituted. Exhaustive enumeration is exact but combinatorial (34,650 labelings at
`n = 12` in three groups of four; `5.6e12` at `n = 30`; `5.8e26` at `n = 60`), so it can
serve only as an oracle for tiny designs.

## 14. Reuse from Release 2 and non-reusable assumptions

### 14.1 Reusable patterns (conditional on the Release 2 disposition; nothing here treats Release 2 surfaces as issued)

- The three-ledger separation (graph reproduction, mathematical truth, target-format
  projection) and the "no generic tolerance" posture (blob `74885507…`).
- The exact-rational lift of binary64 inputs and the exact-dyadic verification of every
  primitive in an immutable trace (N-32); reusable for any Release 3 graph built from
  `+ - * / sqrt` and certified constants.
- The input-specific truth-error and projection-margin form, including the strict
  minimum-normal precondition and the a-posteriori positive-series remainder, for any
  Release 3 series graph derived from the same regularized incomplete beta at integer
  parameters (blob `f3ade9fe…`); the `1/B(df/2, 1/2)` table generalizes to a two-parameter
  table only at integer `d1, d2`.
- The fixed-level critical-value table pattern with per-cell certificates, monotone
  bracketing, and a content hash (blob `d923aa74…` lineage), reusable for F quantiles
  (N-22), Studentized-range quantiles, and balanced Dunnett constants (I-04).
- Fail-closed representational failure classes (difference overflow, information loss,
  underflow to zero, later overflow, endpoint collapse) and first-failure ordering.
- The supported-execution predicate and one-tuple controlled-process admission (blob
  `2b90bf76…`), reusable as a pattern; every Release 3 tuple needs its own admission
  evidence.
- The evidence-generator discipline: pinned ball-arithmetic dependency
  (`python-flint==0.9.0`, identical to this report's probe environment), hash-bound
  generator, environment, and raw output.

### 14.2 Non-reusable assumptions

- One-parameter special function: Release 2 proves a `t` tail (`I_x(ν/2, 1/2)`); Release
  3 needs two free parameters (F), non-integer parameters (Welch, Games-Howell), and nested
  integrals (range, multivariate t). The Release 2 proof does not transfer to these
  functions; each needs its own derivation.
- Dimension: Release 2 has one statistic and one interval; Release 3 has `k(k-1)/2`
  pairwise or `k-1` many-to-one members with a shared MSE. The truth-error ledger must
  carry the shared-denominator dependence, and the trace formula `5n + 3` does not apply.
- Covariance: Release 2 has no correlation structure; NF-D introduces `λ_i` and the
  product reduction (L3).
- Ordering: Release 2 has no stepwise decision; NF-B introduces ordered members, ties, and
  stop indices as result fields (N-13, N-17).
- Randomness: Release 2 has no stochastic component; NF-F introduces a replay class that
  the Release 2 predicate does not cover.
- The Release 2 integer-df relation `df = n_pairs - 1` and its `1..200` candidate range
  are paired-t facts; Release 3 degrees of freedom are `k - 1`, `N - k`, or non-integer.
- The Release 2 one-tuple execution admission covers the Release 2 compiled tree only.

## 15. Reusable Release 4 and later foundations, and limits

Reusable: the NF-A identity and certificate strategy (F tails and quantiles at integer
and non-integer df are exactly what factorial and interaction F tests need); the NF-B
exact decision layer (any declared family of p-values); the NF-E ceiling discipline
(multiple-endpoint gatekeeping); the table pattern for fixed-level constants; the
duality-on-one-surface rule (I-06); the randomness contract skeleton (Section 13). Not
reusable without new research: any correlation structure other than product correlation
(factorial contrasts and interaction families induce general correlation matrices for
which the one-dimensional reduction of NF-D fails and general multivariate-t integration
would be needed; Section 4.6 boundaries); non-independent mean estimates; non-integer df
arising from unbalanced factorial approximations; and any resource ceiling, which is
per-graph.

## 16. Unresolved blockers and reopen conditions

### 16.1 Blockers created or confirmed by this report

| Blocker | Statement                                                                                                                                                                                         | Reopen or closure condition                                                                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NB-01   | No runtime binary64 graph with an input-specific error proof exists for NF-C or NF-D; only oracle enclosures were demonstrated.                                                                   | A reviewed runtime graph and proof, or adoption of the table instrument (I-04) for fixed-level decisions with adjusted p-values excluded from the first slice. |
| NB-02   | No exact route and no table route exist at non-integer df (OMN-02, OMN-04, HET-01, HET-02, HET-03); feasibility is oracle-only.                                                                   | A reviewed runtime incomplete-beta graph with a proof at non-integer parameters (NF-A) and a Studentized-range runtime graph at non-integer `ν` (NF-C).        |
| NB-03   | Primary algorithmic literature for NF-C and NF-D (NSR-05..NSR-09) and the standards texts (NSR-01, NSR-03) were not inspectable; candidate algorithms are named from bibliographic identity only. | Full-text inspection with pinpoints; until then the self-contained derivations in Sections 4.5 and 4.6 and the executed identities are the only basis.         |
| NB-04   | The level identity (`1/20` versus binary64 `0.05`) is undecided (N-09).                                                                                                                           | A check-version decision naming the exact rational level.                                                                                                      |
| NB-05   | Ceilings for `m`, bit length, precision, evaluation limits, and trace nodes are unselected (Section 12).                                                                                          | Steward selection with witnesses at each ceiling, per the Release 2 Group 1 pattern.                                                                           |
| NB-06   | Augmented range and maximum modulus (NF-C') were not executed; APR-04/05/06 and HET-03 are `PRELIM-DEFER`.                                                                                        | Derivation of the inner functional, execution of the two-route probe, and independent review.                                                                  |
| NB-07   | The one-sided/two-sided and unbalanced Dunnett constants beyond the probed cases have no certified table; MTO-01 at arbitrary sizes is oracle-only.                                               | A finite size-configuration grid decision or a runtime NF-D graph with proof.                                                                                  |
| NB-08   | The duality claim (test versus interval) is unsupported unless a single exact comparison surface is adopted (N-19, I-06).                                                                         | A Contract-level decision to derive both decisions from the same exact comparison.                                                                             |
| NB-09   | Supported-execution admission evidence exists for no Release 3 graph.                                                                                                                             | Per-tuple admission evidence once a graph exists (Release 2 Group 3 pattern).                                                                                  |
| NB-10   | The randomness contract for NF-F has no adopted generator, mapping, or replicate-count semantics.                                                                                                 | Closure of the seeded-stochastic foundation line; until then `PRELIM-TRANSFER`.                                                                                |

### 16.2 Semantic holds that also block numerical closure

The commissioned fixed semantic result records SR-A through SR-L. The later semantic
source-acquisition intake at `0eb388e1…` approves SR-L `CLOSED`; SR-A through SR-K and the
RSM-01/RSM-02 source work remain incomplete. This report neither closes nor re-adjudicates
those items. Numerical work on a held entry may proceed as preliminary oracle evidence but
cannot be promoted to a Contract until the hold closes.

### 16.3 Reopen conditions for this report

1. Any probe result is not reproduced from Appendix A in an independent environment.
2. A primary source in Section 2.2 becomes inspectable and materially conflicts with a
   derivation in Section 4 (in particular the Studentized range and product-correlation
   reductions).
3. The Release 2 disposition changes any reused pattern in Section 14.1.
4. A Contract proposes a procedure whose numerical family is not one of NF-A through
   NF-G, or proposes non-product correlation structures.
5. A different runtime arithmetic model than N-31 is proposed.

## 17. Program result and preliminary assessments

### 17.1 Program result: `INPUT_INCOMPLETE`

The commission's stop condition requires `INPUT_INCOMPLETE` without a numerical
disposition when required primary sources cannot be identified or inspected. Section 2.2
records that NSR-01 through NSR-17 were identified but not inspectable in the investigation
environment. Prior full-text inspection records were reused within their recorded scope,
but the investigator directly re-inspected no primary-source artifact. Self-contained
derivations and two-route probes cannot replace that explicit input requirement.

Accordingly, this report assigns none of `NUMERIC_PROGRAM_READY`, `NARROW`, `DEFER`, or
`NO_GO`. A source-supplied completion pass may evaluate those dispositions after directly
inspecting the required primary numerical literature, standards, and authoritative
upstream documentation. No algorithm, tolerance, table, ceiling, platform, or stochastic
contract is selected, and no work may start on the authority of the preliminary labels
below.

### 17.2 Preliminary per-procedure assessments

The Section 6 matrix records a preliminary assessment for every catalogue entry. These
labels preserve the executed probes and planning distinctions but are not the numerical
dispositions required by the commission. Summary by assessment label:

- `PRELIM-FEASIBLE` (22): OMN-01, PVL-01, PVL-02, PVL-03, PVL-04, PVL-05, PVL-06, PVL-07,
  PVL-08, PVL-09, PVL-10, CLS-01, CLS-02, CLS-03, CLS-04, CLS-05, CLS-06, APR-09, APR-13,
  FDR-01, FDR-02, FDR-03.
- `PRELIM-FEASIBLE-TABLE` (6): APR-01, APR-02, APR-03, APR-10, APR-14, MTO-01 (balanced or
  finite size grid).
- `PRELIM-ORACLE-ONLY` (9): OMN-02, OMN-04, APR-11, APR-12, HET-01, HET-02, MTO-02, MCB-01,
  MTO-01 (arbitrary sizes).
- `PRELIM-DEFER` (6): OMN-03, APR-04, APR-05, APR-06, HET-03, MTO-03.
- `PRELIM-TRANSFER` (5): OMN-05, OMN-06, FDR-04, RSM-01, RSM-02.
- `PRELIM-NA` (2): APR-07, APR-08.

Neither `PRELIM-FEASIBLE` nor `PRELIM-FEASIBLE-TABLE` overrides a semantic hold or
authorizes work. The "Gate" column of Section 6 continues to record the semantic
dependency.

## 18. Claim-to-evidence table

Decision-bearing claims only. Probe identifiers refer to Appendix A scripts (with SHA-256)
and Appendix B outputs.

| Claim  | Basis                                                             | Pinpoint / artifact                                                               | Directly establishes                                                     | Investigator addition                                   |
| ------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| N-01   | proof (Section 4.1) + Probe A                                     | `probe_a_f_tail.py`, grid summary line                                            | F tail = regularized incomplete beta; two-library agreement on 576 cases | none                                                    |
| N-02   | proof + Probe A, Probe F                                          | same; `probe_f_quantiles_resources.py` cost lines                                 | exact rational route for both-even df; containment in enclosures         | resource observations                                   |
| N-03   | Release 2 blob `f3ade9fe…` + Probe A                              | witness section of Probe A output                                                 | independent two-library confirmation of the `df = 197` truth bits        | none                                                    |
| N-05   | Probe A                                                           | "Arb direct-form non-finite" line                                                 | direct-form failure near one; complement identity resolves               | switch-point must be versioned (I-03)                   |
| N-06   | Probe A                                                           | "projection transitions" section                                                  | reachable subnormal/zero/rounded-one boundaries                          | none                                                    |
| N-07   | Probe A                                                           | "scipy behaviour" section                                                         | last-place deviations of a single library                                | I-11                                                    |
| N-08   | proof (Section 4.2) + Probe D                                     | `probe_d_adjusted_p.py`                                                           | exact rational computability of algebraic adjustments                    | I-01                                                    |
| N-09   | Probe D                                                           | "level-constant identity" section                                                 | bit-level ambiguity of `α`                                               | I-02, NB-04                                             |
| N-10   | Probe D                                                           | "near-critical decision flips" sections                                           | evaluation-order flips in binary64                                       | none                                                    |
| N-13   | Probe D (exhaustive)                                              | "tie and permutation invariance" section                                          | invariance, tie equality, monotonicity                                   | none                                                    |
| N-19   | Probe E                                                           | "(c2) random search" line                                                         | binary64 duality flips                                                   | I-06, NB-08                                             |
| N-22   | Probe F                                                           | "F upper 0.05 quantiles" section                                                  | rigorous two-cell brackets incl. non-integer df                          | none                                                    |
| N-25   | proof (Section 4.5) + Probe B                                     | `probe_b_studentized_range.py`, identity sections                                 | Studentized-range definition validated by exact identities               | none                                                    |
| N-26   | Probe B                                                           | "B1 vs B2" and bracket sections                                                   | rigorous enclosure feasibility and cost                                  | I-03, I-04, NB-01                                       |
| N-27   | proof (Section 4.6, reused SRC-03 eqs. (6)–(7) p. 1103) + Probe C | `probe_c_dunnett.py`, identity and C1/C2 sections                                 | product-correlation reduction validated against a direct integral        | none                                                    |
| N-28   | Probe C                                                           | "C1 vs C3" and bracket sections                                                   | rigorous enclosure feasibility; boundaries                               | NB-07                                                   |
| N-29   | Probe E                                                           | replay lines                                                                      | exact replay feasibility                                                 | Section 13                                              |
| N-30   | Probe E                                                           | cross-seed and cross-mapping lines                                                | seed- and mapping-dependence of decisions                                | I-10                                                    |
| N-31   | Release 2 blob `6015f45b…`                                        | "Facts accepted" items 1–4                                                        | runtime arithmetic model                                                 | reuse scope only                                        |
| N-32   | Release 2 blobs `74885507…`, `2b90bf76…`                          | selected full-trace predicate and one-tuple selection                             | primitive-level trace verification pattern                               | reuse scope only                                        |
| SRC-03 | reused inspection (`55d81187…`)                                   | Dunnett printed p. 1102 eqs. (4)–(5); p. 1103 correlation and eqs. (6)–(7)        | the quantities MTO-01 needs                                              | product-structure derivation is this report's (N-27)    |
| SRC-06 | reused inspection (`236cd949…`)                                   | Hayter printed p. 61 expression (1.1) and `q^{(α)}_{k,ν}`; p. 62 expression (1.2) | the quantities APR-01/02 need                                            | none                                                    |
| SRC-01 | reused inspection (`55d81187…`)                                   | Holm printed pp. 66–68                                                            | thresholds and product-form variant                                      | exact rewriting `(1-p)^r ≥ 1-α` is this report's (N-08) |
| SRC-02 | reused via semantic result F-19                                   | BH printed p. 293 (1)                                                             | step-up rule                                                             | none                                                    |

## 19. Repair verification

The repair addresses the exact-head review at commit
`32e9f3c599eb40e9bd25a33a8595ee07bda6be28` without widening this pull request beyond
this result path:

1. The program result is `INPUT_INCOMPLETE` without a numerical disposition. The
   per-procedure labels are explicitly preliminary and cannot authorize implementation,
   selection, or public discussion.
2. All eight Appendix A script digests equal the SHA-256 of their fenced script bytes. All
   eight Appendix B output digests equal the SHA-256 of their fenced output bytes.
3. Seven probes were rerun to completion in the neutral repair environment and returned
   exit 0. Probe B's neutral-path partial rerun reproduced all eleven enclosure cases, all
   three monotonicity checks, and the first critical value; its complete original transcript
   is retained with a corrected digest because the remaining duplicate computation is
   resource-intensive and not necessary to repair the transcript hash.
4. The coverage matrix contains 49 distinct catalogue IDs. The Section 17 summary contains
   50 preliminary scope assignments. The additional assignment is intentional: MTO-01 has
   separate balanced/fixed-grid and arbitrary-size assessments.
5. The repaired result contains no environment-specific absolute probe path and no
   provider, model, or tool attribution identifier. Probe G and Probe C-2 import the Probe B
   and Probe C modules as siblings.
6. The post-investigation semantic record closes SR-L only. The other eleven semantic holds
   and RSM-01/RSM-02 remain incomplete, and `SOURCE_SET_READY` remains false.

## Appendix A. Probe scripts (verbatim) and digests

Each script is reproduced exactly; its SHA-256 is the digest of the file bytes as run. The
neutral-path repair reran them under CPython 3.12.13 with the Section 2.3 package versions.
For reproduction, place the scripts together in one empty neutral directory and run them
from that directory.

| Script                            | SHA-256                                                            |
| --------------------------------- | ------------------------------------------------------------------ |
| `probe_a_f_tail.py`               | `4ca77ba376fa6007c8e037d00941c33872df362a6c7062bc088dee68d88d7da5` |
| `probe_b_studentized_range.py`    | `bc0cb05a3ce0c2a3a66563a951935a850f01703bdfbcbae0dcfcb199b2ed81f3` |
| `probe_g_range_bracket.py`        | `18fe5cb8835d2b6dd9ab79af91a39cdd07e4d6322fb6247b1a89f199cb1c44ee` |
| `probe_c_dunnett.py`              | `5864fb5bc748769d2050cdd2eb5548a777787dc2edcc4b2320f035896225eb89` |
| `probe_c2_dunnett_boundaries.py`  | `932540e1c1022a811f266d896388a97a819bdc0f1e72de08b623e129d86e8078` |
| `probe_d_adjusted_p.py`           | `9ba2d82fc5de1182224155554db5a95e7dce8f18283323ec4113c29086c40c80` |
| `probe_e_stochastic_intervals.py` | `84cec14a435e29e7b1a01d1fff3de8d54603e5c749ab1558ada3f1d58f3a97ca` |
| `probe_f_quantiles_resources.py`  | `1435c67436da41658671ada61607cb5823a07f08b1ee9c4e0bb5403515e901cf` |

### A.1 Probe A — F and t tails (`probe_a_f_tail.py`)

```python
"""Probe A: F and t upper-tail probabilities through three routes.

Routes:
  R1 mpmath.betainc (regularized incomplete beta, arbitrary precision, pure Python)
  R2 python-flint Arb ball enclosure of the regularized incomplete beta (rigorous radius)
  R3 exact rational finite binomial sum when both d1/2 and d2/2 are integers
  R4 mpmath.quad of the F density (method-distinct numerical integration)
Identity under test:  P(F_{d1,d2} > f) = I_x(d2/2, d1/2),  x = d2 / (d2 + d1 f).
Binary64 projection: round-to-nearest of the exact value, with class labels.
"""
import struct, math, json, sys
sys.set_int_max_str_digits(0)
from fractions import Fraction
import mpmath
from mpmath import mp, mpf
from flint import arb, fmpq, ctx

def bits(x):
    return struct.pack('>d', x).hex()

def classify(x):
    if x == 0.0: return 'zero'
    if x == 1.0: return 'one'
    if math.isinf(x): return 'inf'
    if math.isnan(x): return 'nan'
    if abs(x) < 2.2250738585072014e-308: return 'subnormal'
    return 'normal'

def frac_to_mpf(q):
    return mpf(q.numerator) / mpf(q.denominator)

def frac_to_arb(q):
    return arb(fmpq(q.numerator, q.denominator))

def tail_r1(d1, d2, f):
    """mpmath regularized incomplete beta."""
    x = Fraction(d2) / (Fraction(d2) + Fraction(d1) * Fraction(f))
    return mpmath.betainc(frac_to_mpf(Fraction(d2) / 2), frac_to_mpf(Fraction(d1) / 2), 0, frac_to_mpf(x), regularized=True)

R2_DIRECT_NONFINITE = []
def tail_r2(d1, d2, f):
    """Arb ball enclosure (returns arb).  Direct form first; if Arb returns a
    non-finite ball (observed for x within ~1e-300 of 1) fall back to the exact
    complement identity I_x(a,b) = 1 - I_{1-x}(b,a) with 1-x computed exactly."""
    x = Fraction(d2) / (Fraction(d2) + Fraction(d1) * Fraction(f))
    a = frac_to_arb(Fraction(d2) / 2); b = frac_to_arb(Fraction(d1) / 2)
    r = frac_to_arb(x).beta_lower(a, b, regularized=True)
    if not r.is_finite():
        R2_DIRECT_NONFINITE.append((d1, d2, f))
        r = 1 - frac_to_arb(1 - x).beta_lower(b, a, regularized=True)
    return r

def tail_r3(d1, d2, f):
    """Exact rational: both d1, d2 even integers.  I_x(a,b) with integer a,b =
    sum_{j=a}^{a+b-1} C(a+b-1, j) x^j (1-x)^(a+b-1-j)."""
    a = Fraction(d2) / 2; b = Fraction(d1) / 2
    if a.denominator != 1 or b.denominator != 1:
        return None
    a = int(a); b = int(b)
    x = Fraction(d2) / (Fraction(d2) + Fraction(d1) * Fraction(f))
    n = a + b - 1
    return sum(Fraction(math.comb(n, j)) * x ** j * (1 - x) ** (n - j) for j in range(a, n + 1))

def tail_r4(d1, d2, f):
    """mpmath quadrature of the F density on (f, inf)."""
    d1m = frac_to_mpf(Fraction(d1)); d2m = frac_to_mpf(Fraction(d2)); fm = frac_to_mpf(Fraction(f))
    c = mpmath.gamma((d1m + d2m) / 2) / (mpmath.gamma(d1m / 2) * mpmath.gamma(d2m / 2)) * (d1m / d2m) ** (d1m / 2)
    dens = lambda t: c * t ** (d1m / 2 - 1) * (1 + d1m * t / d2m) ** (-(d1m + d2m) / 2)
    return mpmath.quad(dens, [fm, fm + 1, fm + 10, fm + 100, mpmath.inf])

def round_binary64_from_mpf(v):
    """Nearest binary64 to an mpf value (mpmath rounds correctly for float())."""
    return float(v)


def arb_to_fracs(a):
    """Exact rational (lower, upper) endpoints of an arb ball via mantissa/exponent."""
    m, e = a.mid().man_exp(); m = int(m); e = int(e)
    mid = Fraction(m) * (Fraction(2) ** e if e >= 0 else Fraction(1, 2 ** (-e)))
    if a.rad().is_zero():
        return mid, mid
    rm, re_ = a.rad().man_exp(); rm = int(rm); re_ = int(re_)
    rad = Fraction(rm) * (Fraction(2) ** re_ if re_ >= 0 else Fraction(1, 2 ** (-re_)))
    return mid - rad, mid + rad

mp.dps = 60
ctx.prec = 300

cases = []
d1s = [1, 2, 3, 4, 10, 50]
d2s = [1, 2, 3, 5, 10, 30, 100, 1000]
fs = [0.0, 1e-300, 1e-10, 0.5, 1.0, 2.0, 4.0, 10.0, 100.0, 1e6, 1e300, 1.7976931348623157e308]
rows = []
max_rel_r1_r2 = 0; max_rel_r1_r4 = 0; r3_checked = 0; r3_mismatch = 0; r2_contains_r3 = 0
for d1 in d1s:
    for d2 in d2s:
        for f in fs:
            p1 = tail_r1(d1, d2, f)
            p2 = tail_r2(d1, d2, f)
            p3 = tail_r3(d1, d2, f)
            lo, hi = arb_to_fracs(p2)
            lo_m = frac_to_mpf(lo); hi_m = frac_to_mpf(hi)
            # R1 inside R2 ball (allowing mpmath's own 60-digit rounding)?
            tol = mpf(10) ** -50 * max(hi_m, mpf(10) ** -320)
            inside = (lo_m - tol <= p1 <= hi_m + tol)
            gap = max(lo_m - p1, p1 - hi_m, mpf(0))
            rel_gap = gap / max(hi_m, mpf(10) ** -320)
            max_rel_r1_r2 = max(max_rel_r1_r2, rel_gap)
            if p3 is not None:
                r3_checked += 1
                p3m = frac_to_mpf(p3)
                if abs(p3m - p1) > mpf(10) ** -50 * max(p3m, mpf(10) ** -300):
                    r3_mismatch += 1
                if lo <= p3 <= hi:  # exact rational containment in the Arb ball
                    r2_contains_r3 += 1
                else:
                    print('  R3 outside Arb ball:', d1, d2, f, 'r3', mpmath.nstr(p3m, 20), 'ball', p2.str(20, radius=True))
            fl = round_binary64_from_mpf(p1)
            rows.append(dict(d1=d1, d2=d2, f=f, r1=mpmath.nstr(p1, 25), r2=p2.str(25, radius=True), r3=(mpmath.nstr(frac_to_mpf(p3), 25) if p3 is not None else None), r3_denominator_bits=(p3.denominator.bit_length() if p3 is not None else None), r1_in_r2=bool(inside), binary64=bits(fl), cls=classify(fl)))
            if not inside:
                print('R1/R2 DISAGREEMENT', d1, d2, f, p1, p2)
print('grid cases', len(rows), 'r1_inside_r2_ball', sum(r['r1_in_r2'] for r in rows), 'r3_checked', r3_checked, 'r3_mismatch', r3_mismatch, 'r2_contains_r3', r2_contains_r3)
cls_counts = {}
for r in rows:
    cls_counts[r['cls']] = cls_counts.get(r['cls'], 0) + 1
print('binary64 classes over grid', cls_counts)
print('max relative gap between mpmath value and Arb ball (mpmath dps=60):', mpmath.nstr(max_rel_r1_r2, 5))
print('largest exact-rational denominator bit length in R3:', max(r['r3_denominator_bits'] or 0 for r in rows))
print('Arb direct-form non-finite (complement identity used) count', len(R2_DIRECT_NONFINITE), R2_DIRECT_NONFINITE[:8])

# Route 4 quadrature check on a subset (slow): moderate f only
print('--- R4 quadrature cross-check (subset)')
for (d1, d2, f) in [(1, 5, 2.0), (2, 10, 4.0), (3, 30, 1.0), (4, 100, 10.0), (10, 1000, 2.0), (50, 3, 0.5)]:
    p1 = tail_r1(d1, d2, f); p4 = tail_r4(d1, d2, f)
    print(d1, d2, f, mpmath.nstr(p1, 30), mpmath.nstr(p4, 30), 'rel', mpmath.nstr(abs(p1 - p4) / p1, 5))

# Non-integer denominator df (Welch-type) : R1, R2, R4
print('--- non-integer d2 (Welch omnibus family)')
for (d1, d2, f) in [(2, Fraction(73, 10), 3.0), (3, Fraction(1225, 100), 2.5), (4, Fraction(20000001, 10000000), 5.0), (2, Fraction(1, 2), 1.0), (5, Fraction(99, 100), 4.0), (2, Fraction(10**6, 7), 2.0)]:
    p1 = tail_r1(d1, d2, f); p2 = tail_r2(d1, d2, f); p4 = tail_r4(d1, d2, f)
    print(d1, str(d2), f, mpmath.nstr(p1, 30), p2.str(30, radius=True), 'quad', mpmath.nstr(p4, 30), 'rel14', mpmath.nstr(abs(p1 - p4) / p1, 5))

# t-tail identity: P(|T_nu|>t) = P(F_{1,nu} > t^2)
print('--- t identity and R2 witness cross-check')
t = 50.4; nu = 197
assert bits(t) == '4049333333333333'
tf = Fraction(t)
p_two_sided = mpmath.betainc(frac_to_mpf(Fraction(nu) / 2), mpf(1) / 2, 0, frac_to_mpf(Fraction(nu) / (Fraction(nu) + tf * tf)), regularized=True)
pa = frac_to_arb(Fraction(nu) / (Fraction(nu) + tf * tf)).beta_lower(arb(fmpq(nu, 2)), arb(fmpq(1, 2)), regularized=True)
fl = float(p_two_sided)
print('mpmath p', mpmath.nstr(p_two_sided, 40), 'arb', pa.str(40, radius=True), 'binary64', bits(fl), 'expected R2 truth bits 284f4ce623062755', bits(fl) == '284f4ce623062755')
# neighbouring cells to show correct rounding margin
lo_cell = struct.unpack('>d', bytes.fromhex('284f4ce623062755'))[0]
print('cell value', repr(lo_cell), 'next', repr(math.nextafter(lo_cell, 1)), 'prev', repr(math.nextafter(lo_cell, 0)))
mid_up = (Fraction(lo_cell) + Fraction(math.nextafter(lo_cell, 1))) / 2
mid_dn = (Fraction(lo_cell) + Fraction(math.nextafter(lo_cell, 0))) / 2
print('truth within cell (exact midpoints):', frac_to_mpf(mid_dn) < p_two_sided < frac_to_mpf(mid_up))

# Binary64 transition neighbourhoods: locate f where P(F>f) crosses 2^-1022, 2^-1074, and where 1-P < 2^-54
print('--- projection transitions (f solving P(F>f) = threshold), mpmath findroot on log scale')
mp.dps = 40
for (d1, d2) in [(2, 10), (2, 1000), (50, 1000), (4, 20), (10, 100)]:
    for name, thr in [('min_normal 2^-1022', mpf(2) ** -1022), ('min_subnormal 2^-1074', mpf(2) ** -1074), ('half_min_subnormal 2^-1075', mpf(2) ** -1075)]:
        g = lambda lf: mpmath.log(mpmath.betainc(mpf(d2) / 2, mpf(d1) / 2, 0, mpf(d2) / (mpf(d2) + mpf(d1) * mpmath.exp(lf)), regularized=True)) - mpmath.log(thr)
        try:
            lf = mpmath.findroot(g, (mpf(0), mpf(700)), solver='bisect', tol=1e-25, maxsteps=200)
            print(d1, d2, name, 'f =', mpmath.nstr(mpmath.exp(lf), 12))
        except Exception as e:
            print(d1, d2, name, 'not found', str(e)[:60])
    # rounding to one: P(F<=f) < 2^-54
    h = lambda lf: mpmath.log(mpmath.betainc(mpf(d1) / 2, mpf(d2) / 2, 0, mpf(d1) * mpmath.exp(lf) / (mpf(d1) * mpmath.exp(lf) + mpf(d2)), regularized=True)) - mpmath.log(mpf(2) ** -54)
    lf = mpmath.findroot(h, (mpf(-200), mpf(5)), solver='bisect', tol=1e-25, maxsteps=200)
    print(d1, d2, 'rounds-to-one boundary f =', mpmath.nstr(mpmath.exp(lf), 12))

# Typical-library behaviour at the same transitions (falsification of single-library authority)
print('--- scipy behaviour at subnormal/zero transitions')
import scipy, scipy.stats
for (d1, d2, f) in [(50, 1000, 28.0), (50, 1000, 32.0), (2, 1000, 720.0), (2, 1000, 760.0), (2, 10, 1e62)]:
    s = scipy.stats.f.sf(f, d1, d2)
    p1 = tail_r1(d1, d2, f)
    print(d1, d2, f, 'scipy', repr(s), bits(s), classify(s), 'truth', mpmath.nstr(p1, 12), 'nearest', bits(float(p1)), classify(float(p1)))

# Exact rational zero-statistic and monotonicity witnesses
print('--- f = 0 gives p = 1 exactly under R3:', tail_r3(2, 10, 0.0) == 1, ' d1=4,d2=6 f=1:', tail_r3(4, 6, 1.0))
print('--- non-increasing in f (R1, d1=3,d2=7, all grid f):', all(tail_r1(3, 7, a) >= tail_r1(3, 7, b) for a, b in zip(fs[:-1], fs[1:])), ' strictly decreasing for f>=1e-10:', all(tail_r1(3, 7, a) > tail_r1(3, 7, b) for a, b in zip(fs[2:-1], fs[3:])))
print('--- R3 exact values not inside Arb ball (diagnostic):')
for r in rows:
    pass

print('--- monotone in d2 at fixed f=2, d1=3 (larger d2 -> smaller tail for f>1?):', [mpmath.nstr(tail_r1(3, d, 2.0), 8) for d in d2s])
print('versions', 'mpmath', mpmath.__version__, 'python-flint', __import__('flint').__version__, 'scipy', scipy.__version__, 'python', sys.version.split()[0])
```

### A.2 Probe B — Studentized range (`probe_b_studentized_range.py`)

```python
"""Probe B: Studentized range distribution Q_{k,nu}.

Definition used (investigator derivation from the definition Q = R / S with
R the range of k iid N(0,1) and S = sqrt(chi2_nu / nu) independent):
  P(Q <= q) = int_0^inf g_nu(s) F_k(q s) ds
  F_k(w)    = k int_{-inf}^{inf} phi(z) [Phi(z) - Phi(z - w)]^{k-1} dz     (range CDF, w >= 0)
  g_nu(s)   = nu^{nu/2} s^{nu-1} exp(-nu s^2/2) / (2^{nu/2-1} Gamma(nu/2))  (density of S)
Routes:
  B1 mpmath nested quadrature (pure Python, non-rigorous, high working precision)
  B2 Arb rigorous nested integration on truncated domains plus exact analytic tail
     mass bounds (rigorous enclosure)
  B3 exact identities: k = 2  ->  P(Q <= q) = P(|T_nu| <= q / sqrt 2)  (incomplete beta route)
                       nu -> inf  ->  F_k(q)  (normal range)
"""
import sys, time, math, struct
from fractions import Fraction
import mpmath
from mpmath import mp, mpf
from flint import arb, acb, fmpq, ctx

def bits(x): return struct.pack('>d', x).hex()

# ---------- B1: mpmath ----------
def range_cdf_mp(k, w):
    """k * int phi(z)[Phi(z)-Phi(z-w)]^(k-1) dz on [-ZT, ZT]; omitted mass < 2(1-Phi(ZT)) ~ 1e-20 at ZT=9.5."""
    if w <= 0: return mpf(0)
    f = lambda z: mpmath.npdf(z) * (mpmath.ncdf(z) - mpmath.ncdf(z - w)) ** (k - 1)
    ZT = mpf('9.5'); pts = [-ZT, -4, -2, 0, 2, 4, ZT]
    return k * mpmath.quad(f, pts, method='gauss-legendre')

def s_density_mp(nu, s):
    nu = mpf(nu)
    return nu ** (nu / 2) * s ** (nu - 1) * mpmath.exp(-nu * s * s / 2) / (2 ** (nu / 2 - 1) * mpmath.gamma(nu / 2))

def outer_points(nu_m):
    """Split points for the S-integral: the density of S = sqrt(chi2_nu/nu) concentrates at 1 with
    spread ~ 1/sqrt(2 nu); points are placed at multiples of that spread, clipped to [0, smax]."""
    sd = 1 / mpmath.sqrt(2 * nu_m)
    smax = 1 + 16 * sd if nu_m >= 3 else (mpf(400) if nu_m < 2 else mpf(60))
    raw = [0, 1 - 8 * sd, 1 - 4 * sd, 1 - 2 * sd, 1 - sd, 1, 1 + sd, 1 + 2 * sd, 1 + 4 * sd, 1 + 8 * sd, smax]
    if nu_m < 3: raw = [0, mpf('0.05'), mpf('0.25'), mpf('0.5'), 1, 2, 4, 16, 64, smax]
    pts = sorted(set(p for p in raw if 0 <= p <= smax))
    return pts, smax
def srange_cdf_mp(k, nu, q):
    """Outer integral on [0, SMAX]; omitted mass P(S > SMAX) = P(chi2_nu > nu SMAX^2) is added as a
    reported bound (F_k <= 1).  SMAX chosen so that the omitted mass is far below working precision."""
    if q <= 0: return mpf(0)
    nu_m = mpf(nu)
    g = lambda s: s_density_mp(nu, s) * range_cdf_mp(k, q * s)
    pts, smax = outer_points(nu_m)
    core = mpmath.quad(g, pts, method='gauss-legendre')
    omitted = mpmath.gammainc(nu_m / 2, nu_m * smax * smax / 2, mpmath.inf, regularized=True)
    return core + omitted / 2  # midpoint of [core, core + omitted]

# ---------- B2: Arb rigorous ----------
SQ2 = None
def Phi_acb(z):
    return (z / SQ2).erf() / 2 + arb(1) / 2  # Phi(z) = (1 + erf(z/sqrt2))/2
def phi_acb(z):
    return (-(z * z) / 2).exp() / (2 * arb.pi()).sqrt()

def range_cdf_arb(k, w, Z=arb(12), prec_tol=None):
    """Rigorous enclosure of F_k(w) for a real arb w > 0."""
    integrand = lambda z, analytic: phi_acb(z) * (Phi_acb(z) - Phi_acb(z - w)) ** (k - 1)
    inner = acb.integral(integrand, -Z, Z, rel_tol=prec_tol, abs_tol=prec_tol).real
    # omitted tails: integrand <= phi(z) on |z| > Z, total mass <= 2 (1 - Phi(Z)) = erfc(Z/sqrt2)
    tail = (Z / SQ2).erfc()
    tail_ball = arb(tail / 2, tail / 2)  # [0, tail]
    return k * (inner + tail_ball)

def s_density_acb(nu, s):
    nu = arb(nu)
    return nu ** (nu / 2) * s ** (nu - 1) * (-nu * s * s / 2).exp() / (arb(2) ** (nu / 2 - 1) * (nu / 2).gamma())

def srange_cdf_arb(k, nu, q, eps=arb('1e-6'), smax=None, tol=None):
    """Rigorous enclosure of P(Q_{k,nu} <= q).  Domain [eps, smax] with exact
    mass bounds for the omitted pieces (F_k <= 1):
      int_0^eps g <= P(S <= eps) = P(chi2_nu <= nu eps^2)  (regularized lower gamma)
      int_smax^inf g <= P(S >= smax) = regularized upper gamma."""
    nu_a = arb(nu); q_a = arb(q)
    if smax is None:
        smax = arb(1) + 16 / (2 * nu_a).sqrt() if nu_a >= 3 else arb(60)
    lo_mass = (nu_a * eps * eps / 2).gamma_lower(nu_a / 2, regularized=True)
    up_mass = (nu_a * smax * smax / 2).gamma_upper(nu_a / 2, regularized=True)
    integrand = lambda s, analytic: s_density_acb(nu_a, s) * range_cdf_arb(k, q_a * s, prec_tol=tol)
    core = acb.integral(integrand, eps, smax, rel_tol=tol, abs_tol=tol).real
    omitted = lo_mass + up_mass
    return core + arb(omitted / 2, omitted / 2)

def arb_bounds(a):
    m, e = a.mid().man_exp(); m = int(m); e = int(e)
    mid = Fraction(m) * (Fraction(2) ** e if e >= 0 else Fraction(1, 2 ** (-e)))
    if a.rad().is_zero(): return mid, mid
    rm, re_ = a.rad().man_exp(); rm = int(rm); re_ = int(re_)
    rad = Fraction(rm) * (Fraction(2) ** re_ if re_ >= 0 else Fraction(1, 2 ** (-re_)))
    return mid - rad, mid + rad

def fr(q): return mpf(q.numerator) / q.denominator

if __name__ == '__main__':
    mp.dps = 20
    ctx.prec = 96
    SQ2 = arb(2).sqrt()
    print('=== B3 identity: k=2, P(Q<=q) = P(|T_nu| <= q/sqrt2) = 1 - I_{nu/(nu+t^2)}(nu/2, 1/2)')
    for nu, q in [(5, 2.0), (10, 3.0), (30, 4.0), (1, 1.0), (2, 8.0), (200, 2.7718)]:
        t2 = mpf(q) ** 2 / 2
        ident = 1 - mpmath.betainc(mpf(nu) / 2, mpf(1) / 2, 0, mpf(nu) / (mpf(nu) + t2), regularized=True)
        t0 = time.time(); b1 = srange_cdf_mp(2, nu, mpf(q)); dt = time.time() - t0
        print(f'nu={nu} q={q} identity={mpmath.nstr(ident, 20)} B1={mpmath.nstr(b1, 20)} rel={mpmath.nstr(abs(ident-b1)/ident, 3)} ({dt:.1f}s)')
    print('=== B3 identity: nu -> infinity, F_k(q) normal range; k=2: 2 Phi(q/sqrt2) - 1')
    for q in [1.0, 2.7718, 4.0]:
        print(f'q={q} F_2(q)={mpmath.nstr(range_cdf_mp(2, mpf(q)), 20)} closed={mpmath.nstr(2*mpmath.ncdf(mpf(q)/mpmath.sqrt(2))-1, 20)}')
    for k, q in [(3, 3.3145), (4, 3.6332), (10, 4.4745)]:
        print(f'k={k} q={q} F_k(q) (nu=inf) = {mpmath.nstr(range_cdf_mp(k, mpf(q)), 15)}  large-nu(1e6) B1 = {mpmath.nstr(srange_cdf_mp(k, 10**6, mpf(q)), 12)}')

    print('=== B1 vs B2 (rigorous Arb enclosure) at selected (k, nu, q)')
    cases = [(3, 10, 3.877), (3, 10, 3.0), (4, 20, 3.958), (5, 5, 5.0), (3, 2, 8.0), (3, 1, 20.0), (6, 60, 4.16), (3, Fraction(73, 10), 4.0), (20, 30, 5.0), (3, 10, 0.5), (3, 10, 12.0)]
    for k, nu, q in cases:
        t0 = time.time(); b1 = srange_cdf_mp(k, fr(Fraction(nu)) if isinstance(nu, Fraction) else nu, mpf(q)); t1 = time.time() - t0
        nu_a = fmpq(nu.numerator, nu.denominator) if isinstance(nu, Fraction) else nu
        t0 = time.time()
        try:
            b2 = srange_cdf_arb(k, nu_a, fmpq(Fraction(q).numerator, Fraction(q).denominator), tol=arb(2) ** -40)
            lo, hi = arb_bounds(b2)
            inside = fr(lo) - mpf(10) ** -25 <= b1 <= fr(hi) + mpf(10) ** -25
            b2s = b2.str(18, radius=True)
        except Exception as e:
            inside = None; b2s = 'ERR ' + str(e)[:80]
        t2 = time.time() - t0
        print(f'k={k} nu={nu} q={q} B1={mpmath.nstr(b1, 18)} ({t1:.1f}s)  B2={b2s} ({t2:.1f}s) B1_inside_B2={inside}')

    print('=== monotonicity (B1): in q increasing; in k decreasing; in nu increasing')
    vals_q = [srange_cdf_mp(3, 10, mpf(q)) for q in [0.5, 1, 2, 3, 4, 6, 10]]
    print('q monotone:', all(a < b for a, b in zip(vals_q, vals_q[1:])))
    vals_k = [srange_cdf_mp(k, 10, mpf(3)) for k in [2, 3, 4, 6, 10]]
    print('k monotone (decreasing):', all(a > b for a, b in zip(vals_k, vals_k[1:])), [mpmath.nstr(v, 8) for v in vals_k])
    vals_nu = [srange_cdf_mp(3, nu, mpf(3)) for nu in [1, 2, 5, 10, 30, 100]]
    print('nu monotone (increasing):', all(a < b for a, b in zip(vals_nu, vals_nu[1:])), [mpmath.nstr(v, 8) for v in vals_nu])

    print('=== critical values q_{0.05;k,nu} by root finding on B1, then rigorous B2 bracket at binary64 neighbours')
    for k, nu in [(3, 10), (4, 20), (3, 5), (2, 10)]:
        t0 = time.time()
        root = mpmath.findroot(lambda q: srange_cdf_mp(k, nu, q) - mpf('0.95'), (mpf(2), mpf(8)), solver='anderson', tol=1e-22)
        dt = time.time() - t0
        qf = float(root); qlo = math.nextafter(qf, 0); qhi = math.nextafter(qf, 10)
        print(f'k={k} nu={nu}: q={mpmath.nstr(root, 22)} binary64 nearest {qf!r} ({bits(qf)}) ({dt:.1f}s)')
        if k == 2:
            # exact identity route for the k=2 bracket: P = 1 - I(...)
            for cand in [qlo, qf, qhi]:
                t2 = Fraction(cand) ** 2 / 2
                x = Fraction(nu) / (Fraction(nu) + t2)
                ball = 1 - arb(fmpq(x.numerator, x.denominator)).beta_lower(arb(fmpq(nu, 2)), arb(fmpq(1, 2)), regularized=True)
                print(f'   k=2 identity enclosure at {cand!r}: {ball.str(25, radius=True)}  minus 0.95 sign: {(ball - arb(fmpq(19,20))).str(8, radius=True)}')
        else:
            t0 = time.time()
            try:
                for cand in [qlo, qhi]:
                    ball = srange_cdf_arb(k, nu, fmpq(Fraction(cand).numerator, Fraction(cand).denominator), tol=arb(2) ** -48)
                    diff = ball - arb(fmpq(19, 20))
                    sgn = 'negative' if diff.upper() < 0 else ('positive' if diff.lower() > 0 else 'UNDECIDED (ball straddles 0.95)')
                    print(f'   B2 enclosure at {cand!r}: {ball.str(20, radius=True)}  P-0.95 is {sgn}')
            except Exception as e:
                print('   B2 error', str(e)[:100])
            print(f'   ({time.time()-t0:.1f}s)')

    print('=== boundaries: q=0, huge q (rounds to one), nu=1 heavy tail, non-integer nu, k boundaries')
    print('q=0 ->', srange_cdf_mp(3, 10, mpf(0)))
    for q in [20, 50, 200]:
        v = srange_cdf_mp(3, 10, mpf(q)); print(f'k=3 nu=10 q={q}: 1-P = {mpmath.nstr(1-v, 10)}  binary64(P) = {float(v)!r} class={"one" if float(v)==1.0 else "normal"}')
    for q in [20, 50, 200, 1000]:
        v = srange_cdf_mp(3, 1, mpf(q)); print(f'k=3 nu=1 q={q}: 1-P = {mpmath.nstr(1-v, 10)}')
    print('non-integer nu=7.3, k=4, q=4:', mpmath.nstr(srange_cdf_mp(4, mpf('7.3'), mpf(4)), 20))
    print('k=1 is not a range (degenerate): refuse; k=2 handled by exact identity; k=100 q=6 nu=50:', mpmath.nstr(srange_cdf_mp(100, 50, mpf(6)), 12))
    print('versions mpmath', mpmath.__version__, 'python-flint', __import__('flint').__version__)
```

### A.3 Probe G — Studentized range bracket at declared resolution (`probe_g_range_bracket.py`)

```python
"""Probe G: certified bracket for a Studentized-range critical value at a declared
resolution, and the precision required for a binary64-cell bracket.

Uses Probe B's rigorous route.  Certifies q_{0.05;3,10} in [q0 - h, q0 + h] for h = 1e-12
by rigorous CDF signs (radius must be below the CDF change over h, approx density * h),
then reports the enclosure radius achievable at tolerances 2^-40 .. 2^-56 and the time,
against the binary64-cell requirement (|P(q_next) - P(q)| ~ density * ULP ~ 4e-17).
"""
import time, math
from fractions import Fraction
import probe_b_studentized_range as B
from flint import arb, fmpq, ctx
from mpmath import mp, mpf
import mpmath

mp.dps = 20
q0 = Fraction('3.876776750013182')   # binary64 nearest value from Probe B root finding
k, nu = 3, 10
def enclose(q, tol_bits, prec):
    ctx.prec = prec; B.SQ2 = arb(2).sqrt()
    return B.srange_cdf_arb(k, nu, fmpq(q.numerator, q.denominator), tol=arb(2) ** -tol_bits)
print('=== declared-resolution bracket h = 1e-12 around', float(q0))
for h in [Fraction(1, 10**12), Fraction(1, 10**13)]:
    t0 = time.time()
    lo = enclose(q0 - h, 48, 96) - arb(fmpq(19, 20)); hi = enclose(q0 + h, 48, 96) - arb(fmpq(19, 20))
    s_lo = 'negative' if lo.upper() < 0 else ('positive' if lo.lower() > 0 else 'undecided')
    s_hi = 'positive' if hi.lower() > 0 else ('negative' if hi.upper() < 0 else 'undecided')
    print(f'h={float(h):.0e}: P(q0-h)-0.95 = {lo.str(6, radius=True)} {s_lo}; P(q0+h)-0.95 = {hi.str(6, radius=True)} {s_hi}; certified={s_lo=="negative" and s_hi=="positive"} ({time.time()-t0:.0f}s)')
print('=== enclosure radius versus requested tolerance at q0 (binary64-cell bracket needs radius below ~4e-17)')
for tol_bits, prec in [(40, 96), (48, 96), (56, 128)]:
    t0 = time.time(); b = enclose(q0, tol_bits, prec)
    print(f'tol=2^-{tol_bits} prec={prec}: {b.str(18, radius=True)} radius={b.rad().str(3)} ({time.time()-t0:.0f}s)')
# local slope: P(q0+h)-P(q0-h) over 2h from Probe-B route (non-rigorous), to state the cell requirement
mp.dps = 20
d = (B.srange_cdf_mp(k, nu, mpf(float(q0)) + mpf('1e-6')) - B.srange_cdf_mp(k, nu, mpf(float(q0)) - mpf('1e-6'))) / mpf('2e-6')
print('local density at q0 ~', mpmath.nstr(d, 6), '; CDF change across one binary64 ULP (', math.ulp(float(q0)), ') ~', mpmath.nstr(d * math.ulp(float(q0)), 4))
```

### A.4 Probe C — many-to-one multivariate t (`probe_c_dunnett.py`)

```python
"""Probe C: Dunnett many-to-one equicoordinate multivariate-t probabilities.

Investigator derivation (recorded in the report):
  Under the one-way normal model with common variance and control group 0,
  Z_i = (Xbar_i - Xbar_0) / (sigma sqrt(1/n_i + 1/n_0)) are N(0,1) with
  corr(Z_i, Z_j) = lambda_i lambda_j,  lambda_i = sqrt(n_i / (n_i + n_0))   (product structure).
  Hence Z_i = lambda_i Y + sqrt(1 - lambda_i^2) W_i with Y, W_i iid N(0,1), and with
  S = sqrt(chi2_nu / nu) independent,
  one-sided:  P(T_i <= d, all i) = int_0^inf g_nu(s) int phi(y) prod_i Phi((d s - lambda_i y)/sqrt(1-lambda_i^2)) dy ds
  two-sided:  P(|T_i| <= d, all i) = int_0^inf g_nu(s) int phi(y) prod_i [Phi((d s - l_i y)/c_i) - Phi((-d s - l_i y)/c_i)] dy ds
Routes:
  C1 mpmath nested 2-D quadrature of the product-structure reduction
  C2 mpmath direct 3-D quadrature (s, z1, z2) with the explicit bivariate normal density
     for p = 2 (no product reduction used) -- method-distinct
  C3 Arb rigorous nested integration on truncated domains with exact omitted-mass bounds
  C4 identity: p = 1 reduces to the t distribution (incomplete beta route)
"""
import sys, time, math, struct
from fractions import Fraction
import mpmath
from mpmath import mp, mpf
from flint import arb, acb, fmpq, ctx

def bits(x): return struct.pack('>d', x).hex()

def lambdas(ns, n0):
    return [mpmath.sqrt(mpf(n) / (mpf(n) + n0)) for n in ns]

def s_density_mp(nu, s):
    nu = mpf(nu)
    return nu ** (nu / 2) * s ** (nu - 1) * mpmath.exp(-nu * s * s / 2) / (2 ** (nu / 2 - 1) * mpmath.gamma(nu / 2))

def inner_mp(lams, d, s, two_sided):
    def f(y):
        prod = mpf(1)
        for l in lams:
            c = mpmath.sqrt(1 - l * l)
            up = mpmath.ncdf((d * s - l * y) / c)
            if two_sided:
                up -= mpmath.ncdf((-d * s - l * y) / c)
            prod *= up
        return mpmath.npdf(y) * prod
    return mpmath.quad(f, [mpf('-9.5'), -4, -2, 0, 2, 4, mpf('9.5')], method='gauss-legendre')

def outer_points(nu_m):
    """Split points for the S-integral: the density of S = sqrt(chi2_nu/nu) concentrates at 1 with
    spread ~ 1/sqrt(2 nu); points are placed at multiples of that spread, clipped to [0, smax]."""
    sd = 1 / mpmath.sqrt(2 * nu_m)
    smax = 1 + 16 * sd if nu_m >= 3 else (mpf(400) if nu_m < 2 else mpf(60))
    raw = [0, 1 - 8 * sd, 1 - 4 * sd, 1 - 2 * sd, 1 - sd, 1, 1 + sd, 1 + 2 * sd, 1 + 4 * sd, 1 + 8 * sd, smax]
    if nu_m < 3: raw = [0, mpf('0.05'), mpf('0.25'), mpf('0.5'), 1, 2, 4, 16, 64, smax]
    pts = sorted(set(p for p in raw if 0 <= p <= smax))
    return pts, smax
def dunnett_mp(ns, n0, nu, d, two_sided=False):
    lams = lambdas(ns, n0); nu_m = mpf(nu)
    g = lambda s: s_density_mp(nu, s) * inner_mp(lams, d, s, two_sided)
    pts, smax = outer_points(nu_m)
    core = mpmath.quad(g, pts, method='gauss-legendre')
    omitted = mpmath.gammainc(nu_m / 2, nu_m * smax * smax / 2, mpmath.inf, regularized=True)
    return core + omitted / 2

def dunnett_direct3d_mp(ns, n0, nu, d, two_sided=False):
    """p = 2 only: explicit bivariate normal density with rho = l1 l2, no product reduction."""
    assert len(ns) == 2
    l1, l2 = lambdas(ns, n0); rho = l1 * l2
    det = 1 - rho * rho
    def biv(z1, z2):
        return mpmath.exp(-(z1 * z1 - 2 * rho * z1 * z2 + z2 * z2) / (2 * det)) / (2 * mpmath.pi * mpmath.sqrt(det))
    def prob_given_s(s):
        lo = -d * s if two_sided else mpf(-9.5)
        return mpmath.quad(lambda z1: mpmath.quad(lambda z2: biv(z1, z2), [lo, d * s], method='gauss-legendre'), [lo, d * s], method='gauss-legendre')
    nu_m = mpf(nu); pts, smax = outer_points(nu_m)
    core = mpmath.quad(lambda s: s_density_mp(nu, s) * prob_given_s(s), pts, method='gauss-legendre')
    return core + mpmath.gammainc(nu_m / 2, nu_m * smax * smax / 2, mpmath.inf, regularized=True) / 2

# ---- Arb rigorous ----
SQ2 = None
def Phi_acb(z): return (z / SQ2).erf() / 2 + arb(1) / 2
def phi_acb(z): return (-(z * z) / 2).exp() / (2 * arb.pi()).sqrt()
def s_density_acb(nu, s):
    nu = arb(nu)
    return nu ** (nu / 2) * s ** (nu - 1) * (-nu * s * s / 2).exp() / (arb(2) ** (nu / 2 - 1) * (nu / 2).gamma())

def inner_arb(lams_a, cs_a, d, s, two_sided, Y=arb(12), tol=None):
    def f(y, analytic):
        prod = arb(1)
        for l, c in zip(lams_a, cs_a):
            up = Phi_acb((d * s - l * y) / c)
            if two_sided: up -= Phi_acb((-d * s - l * y) / c)
            prod *= up
        return phi_acb(y) * prod
    core = acb.integral(f, -Y, Y, rel_tol=tol, abs_tol=tol).real
    tail = (Y / SQ2).erfc()  # integrand <= phi(y); omitted mass <= 2(1-Phi(Y))
    return core + arb(tail / 2, tail / 2)

def dunnett_arb(ns, n0, nu, d, two_sided=False, eps=arb('1e-6'), smax=None, tol=None):
    nu_a = arb(nu); d_a = arb(d)
    lams_a = [(arb(n) / (arb(n) + n0)).sqrt() for n in ns]
    cs_a = [(1 - l * l).sqrt() for l in lams_a]
    if smax is None: smax = arb(1) + 16 / (2 * nu_a).sqrt() if nu_a >= 3 else arb(60)
    lo_mass = (nu_a * eps * eps / 2).gamma_lower(nu_a / 2, regularized=True)
    up_mass = (nu_a * smax * smax / 2).gamma_upper(nu_a / 2, regularized=True)
    core = acb.integral(lambda s, analytic: s_density_acb(nu_a, s) * inner_arb(lams_a, cs_a, d_a, s, two_sided, tol=tol), eps, smax, rel_tol=tol, abs_tol=tol).real
    om = lo_mass + up_mass
    return core + arb(om / 2, om / 2)

def arb_bounds(a):
    m, e = a.mid().man_exp(); m = int(m); e = int(e)
    mid = Fraction(m) * (Fraction(2) ** e if e >= 0 else Fraction(1, 2 ** (-e)))
    if a.rad().is_zero(): return mid, mid
    rm, re_ = a.rad().man_exp(); rm = int(rm); re_ = int(re_)
    rad = Fraction(rm) * (Fraction(2) ** re_ if re_ >= 0 else Fraction(1, 2 ** (-re_)))
    return mid - rad, mid + rad
def fr(q): return mpf(q.numerator) / q.denominator

if __name__ == '__main__':
    mp.dps = 18; ctx.prec = 96; SQ2 = arb(2).sqrt()
    print('=== C4 identity: p=1 (one treatment) one-sided = P(T_nu <= d); two-sided = P(|T_nu| <= d)')
    for nu, d in [(10, 1.812), (5, 2.0), (30, 2.5)]:
        t2 = mpf(d) ** 2
        two = 1 - mpmath.betainc(mpf(nu) / 2, mpf(1) / 2, 0, mpf(nu) / (mpf(nu) + t2), regularized=True)
        one = (1 + two) / 2
        c1 = dunnett_mp([7], 7, nu, mpf(d)); c1t = dunnett_mp([7], 7, nu, mpf(d), True)
        print(f'nu={nu} d={d}: one-sided identity {mpmath.nstr(one, 18)} C1 {mpmath.nstr(c1, 18)} | two-sided identity {mpmath.nstr(two, 18)} C1 {mpmath.nstr(c1t, 18)}')
    print('=== C1 (product reduction) vs C2 (direct 3-D bivariate) for p=2, unequal sizes')
    for ns, n0, nu, d, ts in [([5, 9], 7, 18, 2.0, False), ([5, 9], 7, 18, 2.2, True), ([3, 30], 4, 34, 2.1, False), ([10, 10], 10, 27, 1.92, False)]:
        t0 = time.time(); c1 = dunnett_mp(ns, n0, nu, mpf(d), ts); t1 = time.time() - t0
        t0 = time.time(); c2 = dunnett_direct3d_mp(ns, n0, nu, mpf(d), ts); t2 = time.time() - t0
        print(f'ns={ns} n0={n0} nu={nu} d={d} two_sided={ts}: C1={mpmath.nstr(c1, 16)} ({t1:.1f}s) C2={mpmath.nstr(c2, 16)} ({t2:.1f}s) rel={mpmath.nstr(abs(c1-c2)/c1, 3)}')
    print('=== C1 vs C3 (Arb rigorous) ')
    for ns, n0, nu, d, ts in [([5, 5, 5], 5, 16, 2.3, False), ([5, 9, 13], 7, 30, 2.6, True), ([4, 4], 4, 9, 2.5, True), ([20]*8, 20, 171, 2.6, True)]:
        t0 = time.time(); c1 = dunnett_mp(ns, n0, nu, mpf(d), ts); t1 = time.time() - t0
        t0 = time.time()
        try:
            c3 = dunnett_arb(ns, n0, nu, fmpq(Fraction(d).numerator, Fraction(d).denominator), ts, tol=arb(2) ** -36)
            lo, hi = arb_bounds(c3); inside = fr(lo) - mpf(10) ** -20 <= c1 <= fr(hi) + mpf(10) ** -20; c3s = c3.str(16, radius=True)
        except Exception as e:
            inside = None; c3s = 'ERR ' + str(e)[:80]
        print(f'ns={ns} n0={n0} nu={nu} d={d} two_sided={ts}: C1={mpmath.nstr(c1, 16)} ({t1:.1f}s) C3={c3s} ({time.time()-t0:.1f}s) C1_inside_C3={inside}')
    print('=== equal sizes rho=1/2: one-sided 0.95 constants (commonly tabulated values shown only as unverified secondary comparison)')
    for p, nu, tab in [(2, 10, 2.15), (3, 20, 2.30), (2, 10**6, 1.92)]:
        ns = [10] * p
        root = mpmath.findroot(lambda d: dunnett_mp(ns, 10, nu, d) - mpf('0.95'), (mpf(1.5), mpf(3)), solver='anderson', tol=1e-18)
        print(f'p={p} nu={nu}: d(0.95)={mpmath.nstr(root, 18)} binary64 {float(root)!r} ({bits(float(root))}) tabulated~{tab}')
    print('=== two-sided rho=1/2 p=2 nu=10 constant, and rigorous bracket at binary64 neighbours (C3)')
    root = mpmath.findroot(lambda d: dunnett_mp([10, 10], 10, 10, d, True) - mpf('0.95'), (mpf(2), mpf(3)), solver='anderson', tol=1e-18)
    df = float(root); print('root', mpmath.nstr(root, 18), 'binary64', repr(df), bits(df))
    t0 = time.time()
    for cand in [math.nextafter(df, 0), math.nextafter(df, 10)]:
        ball = dunnett_arb([10, 10], 10, 10, fmpq(Fraction(cand).numerator, Fraction(cand).denominator), True, tol=arb(2) ** -44)
        diff = ball - arb(fmpq(19, 20))
        sgn = 'negative' if diff.upper() < 0 else ('positive' if diff.lower() > 0 else 'UNDECIDED')
        print(f'  C3 at {cand!r}: {ball.str(18, radius=True)} P-0.95 {sgn}')
    print(f'  ({time.time()-t0:.1f}s)')
    print('=== correlation boundaries: n0 -> large (lambda -> 0), n0 = 1 (lambda near 1), and dimension p = 1..30 monotonicity')
    for n0 in [1, 5, 50, 5000]:
        print(f'n0={n0} ns=[10,10] nu=25 d=2: P={mpmath.nstr(dunnett_mp([10,10], n0, 25, mpf(2)), 15)}  lambda={mpmath.nstr(lambdas([10],n0)[0], 8)}')
    vals = [dunnett_mp([10] * p, 10, 40, mpf(2.5), True) for p in [1, 2, 3, 5, 10, 20, 30]]
    print('two-sided P decreasing in p:', all(a > b for a, b in zip(vals, vals[1:])), [mpmath.nstr(v, 8) for v in vals])
    vals = [dunnett_mp([5, 5], 5, 12, mpf(d)) for d in [0.5, 1, 2, 3, 5]]
    print('d monotone:', all(a < b for a, b in zip(vals, vals[1:])))
    print('nu monotone increasing at fixed d=2:', [mpmath.nstr(dunnett_mp([5,5], 5, nu, mpf(2)), 10) for nu in [1, 2, 5, 20, 100]])
    print('=== boundaries: d = 0 (two-sided -> 0), large d rounds to one, nu=1')
    print('two-sided d=0:', dunnett_mp([5,5], 5, 12, mpf(0), True), ' one-sided d=0 (=P(all Z<=0)):', mpmath.nstr(dunnett_mp([5,5], 5, 12, mpf(0)), 12))
    for d in [10, 30, 100]:
        v = dunnett_mp([5,5], 5, 12, mpf(d), True); print(f'two-sided d={d}: 1-P={mpmath.nstr(1-v, 8)} binary64={float(v)!r}')
    print('versions mpmath', mpmath.__version__, 'python-flint', __import__('flint').__version__)
```

### A.5 Probe C-2 — many-to-one boundary replay (`probe_c2_dunnett_boundaries.py`)

```python
"""Probe C-2: independently replays the boundary section of Probe C with the same
routes."""
import probe_c_dunnett as C
import mpmath
from mpmath import mp, mpf
mp.dps = 18
vals = [C.dunnett_mp([5, 5], 5, 12, mpf(d)) for d in [0.5, 1, 2, 3, 5]]
print('d monotone (one-sided P increasing in d):', all(a < b for a, b in zip(vals, vals[1:])), [mpmath.nstr(v, 10) for v in vals])
print('nu monotone increasing at fixed d=2:', [mpmath.nstr(C.dunnett_mp([5, 5], 5, nu, mpf(2)), 10) for nu in [1, 2, 5, 20, 100]])
print('=== boundaries: d = 0 (two-sided -> 0), large d rounds to one, nu=1')
print('two-sided d=0:', C.dunnett_mp([5, 5], 5, 12, mpf(0), True), ' one-sided d=0 (=P(all Z<=0)):', mpmath.nstr(C.dunnett_mp([5, 5], 5, 12, mpf(0)), 12))
for d in [10, 30, 100]:
    v = C.dunnett_mp([5, 5], 5, 12, mpf(d), True); print(f'two-sided d={d}: 1-P={mpmath.nstr(1-v, 8)} binary64={float(v)!r}')
print('versions mpmath', mpmath.__version__, 'python-flint', __import__('flint').__version__)
```

### A.6 Probe D — adjusted-p arithmetic (`probe_d_adjusted_p.py`)

```python
"""Probe D: deterministic multiplicity adjustment arithmetic.

Two routes for every procedure:
  D-exact  : exact rational arithmetic (Python fractions) on the exact dyadic values of the
             binary64 inputs; decisions are exact rational comparisons.
  D-float  : straightforward binary64 evaluation in a fixed operation order.
Procedures: Bonferroni, Sidak, Holm, Holm product-form ("Holm-Sidak"), Hochberg, Hommel,
Benjamini-Hochberg, Benjamini-Yekutieli, closed testing with Bonferroni local tests.
Checks: tie invariance, permutation invariance, monotonicity, clipping, family-size
boundaries, near-critical decision flips, level-constant identity, BY constant summation
order, Sidak cancellation, resource ceilings, malformed input refusal, trace digest tampering.
"""
import sys, math, struct, random, json, hashlib, time, itertools
from fractions import Fraction as Fr
sys.set_int_max_str_digits(0)

def bits(x): return struct.pack('>d', x).hex()

# ---------------- exact route ----------------
def holm_adj_exact(ps):
    m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i))
    adj = [None] * m; run = Fr(0)
    for r, i in enumerate(order):
        run = max(run, (m - r) * ps[i]); adj[i] = min(Fr(1), run)
    return adj
def holm_sidak_adj_exact(ps):
    m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i))
    adj = [None] * m; run = Fr(0)
    for r, i in enumerate(order):
        run = max(run, 1 - (1 - ps[i]) ** (m - r)); adj[i] = min(Fr(1), run)
    return adj
def hochberg_adj_exact(ps):
    m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i))
    adj = [None] * m; run = Fr(1)
    for r in range(m - 1, -1, -1):
        i = order[r]; run = min(run, (m - r) * ps[i]); adj[i] = min(Fr(1), run)
    return adj
def bh_adj_exact(ps):
    m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i))
    adj = [None] * m; run = Fr(1)
    for r in range(m - 1, -1, -1):
        i = order[r]; run = min(run, Fr(m, r + 1) * ps[i]); adj[i] = min(Fr(1), run)
    return adj
def by_adj_exact(ps):
    m = len(ps); c = sum(Fr(1, i) for i in range(1, m + 1))
    order = sorted(range(m), key=lambda i: (ps[i], i))
    adj = [None] * m; run = Fr(1)
    for r in range(m - 1, -1, -1):
        i = order[r]; run = min(run, Fr(m, r + 1) * c * ps[i]); adj[i] = min(Fr(1), run)
    return adj
def bonf_adj_exact(ps): return [min(Fr(1), len(ps) * p) for p in ps]
def sidak_adj_exact(ps): return [1 - (1 - p) ** len(ps) for p in ps]
def hommel_adj_exact(ps):
    """Hommel adjusted p-values via the standard closed-Simes formulation:
    adj_i = max over subsets J containing i of min_{j in J} |J| p_(j)/rank_J(j)  (exact, exponential; small m only)."""
    m = len(ps); adj = [Fr(0)] * m
    idx = list(range(m))
    for size in range(1, m + 1):
        for J in itertools.combinations(idx, size):
            sub = sorted(J, key=lambda i: ps[i])
            simes = min(Fr(size, r + 1) * ps[i] for r, i in enumerate(sub))
            for i in J:
                if simes > adj[i]: adj[i] = simes
    return [min(Fr(1), a) for a in adj]
def closed_bonferroni_exact(ps, alpha):
    """Closed testing with Bonferroni local tests: reject H_i iff every J containing i has min_{j in J} |J| p_j <= alpha."""
    m = len(ps); rej = [True] * m
    for size in range(1, m + 1):
        for J in itertools.combinations(range(m), size):
            local = min(size * ps[j] for j in J) <= alpha
            if not local:
                for i in J: rej[i] = False
    return rej

# ---------------- float route ----------------
def holm_adj_float(ps):
    m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i)); adj = [None] * m; run = 0.0
    for r, i in enumerate(order):
        run = max(run, (m - r) * ps[i]); adj[i] = min(1.0, run)
    return adj
def hochberg_adj_float(ps):
    m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i)); adj = [None] * m; run = 1.0
    for r in range(m - 1, -1, -1):
        i = order[r]; run = min(run, (m - r) * ps[i]); adj[i] = min(1.0, run)
    return adj
def bh_adj_float(ps, form='m_over_i_times_p'):
    m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i)); adj = [None] * m; run = 1.0
    for r in range(m - 1, -1, -1):
        i = order[r]
        if form == 'm_over_i_times_p': v = (m / (r + 1)) * ps[i]
        elif form == 'p_times_m_over_i': v = ps[i] * m / (r + 1)
        else: v = (ps[i] * m) / (r + 1)
        run = min(run, v); adj[i] = min(1.0, run)
    return adj
def sidak_adj_float(ps): return [1 - (1 - p) ** len(ps) for p in ps]
def sidak_adj_float_stable(ps): return [-math.expm1(len(ps) * math.log1p(-p)) for p in ps]
def bonf_adj_float(ps): return [min(1.0, len(ps) * p) for p in ps]

def rand_p(rng):
    # random binary64 in [0,1] with wide exponent coverage
    e = rng.choice([0, 0, 0, 1, 2, 5, 10, 20, 40, 60, 100, 300, 1000, 1060, 1074])
    return rng.random() * 2.0 ** (-e)

if __name__ == '__main__':
    rng = random.Random(20260904)
    print('=== level-constant identity: alpha as decimal 1/20 versus binary64 0.05')
    a64 = Fr(0.05); print('binary64 0.05 exact =', float(a64), 'as fraction bits', bits(0.05), ' > 1/20:', a64 > Fr(1, 20), ' difference', float(a64 - Fr(1, 20)))
    p = 0.05
    print('witness: raw p = binary64(0.05): reject under alpha=binary64(0.05):', Fr(p) <= a64, ' reject under alpha=1/20:', Fr(p) <= Fr(1, 20))
    for m in [3, 7, 11, 13]:
        thr_f = 0.05 / m; thr_e = Fr(1, 20) / m
        print(f'm={m}: float alpha/m = {thr_f!r} ({bits(thr_f)}), exact 1/(20m) - float = {float(Fr(thr_f) - thr_e):.3e}; p=float(alpha/m): float-reject {p<=thr_f if False else thr_f <= thr_f} exact-reject {Fr(thr_f) <= thr_e}')

    print('=== near-critical decision flips: p*m <= a versus p <= a/m in binary64 (random search near threshold)')
    flips = 0; total = 0; witness = None
    for m in [2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 17, 100, 1000]:
        base = 0.05 / m
        for _ in range(20000):
            pp = base * (1 + (rng.random() - 0.5) * 1e-14)
            total += 1
            d1 = (pp * m <= 0.05); d2 = (pp <= 0.05 / m); d3 = (Fr(pp) * m <= Fr(0.05))
            if d1 != d2 or d1 != d3 or d2 != d3:
                flips += 1
                if witness is None: witness = (m, pp, bits(pp), d1, d2, d3)
    print(f'flip count {flips} of {total}; first witness (m, p, bits, p*m<=a, p<=a/m, exact) = {witness}')
    print('=== BH threshold forms in binary64: p <= i*q/m vs p*m <= i*q vs p*m/i <= q (random near-threshold)')
    flips = 0; total = 0; witness = None
    for m in [5, 7, 10, 13, 50, 1000]:
        for i in range(1, m + 1, max(1, m // 7)):
            base = 0.05 * i / m
            for _ in range(3000):
                pp = base * (1 + (rng.random() - 0.5) * 1e-14); total += 1
                d = [(pp <= i * 0.05 / m), (pp * m <= i * 0.05), (pp * m / i <= 0.05), (Fr(pp) * m <= i * Fr(0.05))]
                if len(set(d)) > 1:
                    flips += 1
                    if witness is None: witness = (m, i, pp, bits(pp), d)
    print(f'flip count {flips} of {total}; first witness = {witness}')

    print('=== Sidak cancellation: 1-(1-p)^m for tiny p; exact vs naive float vs expm1/log1p form')
    for p, m in [(1e-17, 3), (1e-17, 1000), (2.0 ** -60, 5), (1e-300, 10), (5e-324, 2), (0.3, 4)]:
        ex = 1 - (1 - Fr(p)) ** m; naive = 1 - (1 - p) ** m; stable = -math.expm1(m * math.log1p(-p))
        exf = float(ex)  # correctly rounded (Python Fraction -> float is correctly rounded)
        print(f'p={p!r} m={m}: exact->binary64 {exf!r} naive {naive!r} expm1/log1p {stable!r} ; naive==exact {naive==exf} stable==exact {stable==exf}')
    print('resource: exact (1-p)^m denominator bits and time')
    for m in [10, 100, 1000, 10000]:
        p = 5e-324; t0 = time.time(); v = (1 - Fr(p)) ** m; dt = time.time() - t0
        print(f'  m={m}: denominator bits {v.denominator.bit_length()} time {dt:.3f}s')

    print('=== BY constant c(m)=sum 1/i: binary64 summation orders differ; exact harmonic number is a rational')
    for m in [10, 100, 1000, 100000]:
        fwd = 0.0
        for i in range(1, m + 1): fwd += 1.0 / i
        bwd = 0.0
        for i in range(m, 0, -1): bwd += 1.0 / i
        fs = math.fsum(1.0 / i for i in range(1, m + 1))
        ex = sum(Fr(1, i) for i in range(1, m + 1)) if m <= 1000 else None
        exf = float(ex) if ex is not None else None
        print(f'm={m}: forward {fwd!r} backward {bwd!r} fsum {fs!r} exact->binary64 {exf!r} all_equal={len({fwd,bwd,fs} | ({exf} if exf is not None else set()))==1}' + (f' exact denominator bits {ex.denominator.bit_length()}' if ex else ''))

    print('=== exact vs float adjusted p: random families; count binary64 adjusted values that are not the correctly rounded exact value; decision flips at alpha=1/20')
    for name, fe, ff in [('holm', holm_adj_exact, holm_adj_float), ('hochberg', hochberg_adj_exact, hochberg_adj_float), ('bh', bh_adj_exact, bh_adj_float), ('bonferroni', bonf_adj_exact, bonf_adj_float), ('sidak', sidak_adj_exact, sidak_adj_float)]:
        nvals = 0; nmis = 0; nflip = 0; fam = 0; first = None
        for _ in range(400):
            m = rng.choice([1, 2, 3, 4, 5, 8, 13, 50]); ps = [rand_p(rng) for _ in range(m)]
            if rng.random() < 0.3:  # inject ties
                ps[0] = ps[-1]
            ae = fe([Fr(p) for p in ps]); af = ff(ps); fam += 1
            for e, f in zip(ae, af):
                nvals += 1
                if float(e) != f:
                    nmis += 1
                    if first is None: first = (name, m, ps, bits(f), bits(float(e)))
                if (e <= Fr(1, 20)) != (f <= 0.05): nflip += 1
        print(f'{name}: families {fam} values {nvals} float!=correctly-rounded-exact {nmis} decision flips vs (exact, alpha=1/20) {nflip} first mismatch {first}')

    print('=== tie and permutation invariance (exhaustive small families, exact route)')
    ok = True; checked = 0
    grid = [Fr(1, 100), Fr(1, 100), Fr(3, 100), Fr(3, 100), Fr(1, 20), Fr(1, 20), Fr(1, 10)]
    for name, fe in [('holm', holm_adj_exact), ('hochberg', hochberg_adj_exact), ('bh', bh_adj_exact), ('by', by_adj_exact), ('holm_sidak', holm_sidak_adj_exact), ('hommel', hommel_adj_exact)]:
        for size in [2, 3, 4, 5]:
            for combo in itertools.combinations_with_replacement(grid, size):
                ref = None
                for perm in set(itertools.permutations(combo)):
                    adj = fe(list(perm))
                    # map back to values by (p -> adjusted p) multiset; tie invariance: equal p get equal adjusted p
                    pairs = sorted(zip(perm, adj)); checked += 1
                    if ref is None: ref = pairs
                    elif pairs != ref: ok = False; print('  INVARIANCE FAILURE', name, perm, adj)
                    for (p1, a1), (p2, a2) in zip(pairs, pairs[1:]):
                        if p1 == p2 and a1 != a2: ok = False; print('  TIE FAILURE', name, perm, adj)
                        if p1 <= p2 and a1 > a2: ok = False; print('  ORDER FAILURE (adjusted not monotone in p)', name, perm, adj)
    print('invariance/tie/order checks passed:', ok, 'permutations checked', checked)
    print('=== monotonicity: raising one raw p never lowers any adjusted p (random, exact)')
    ok = True
    for name, fe in [('holm', holm_adj_exact), ('hochberg', hochberg_adj_exact), ('bh', bh_adj_exact), ('by', by_adj_exact), ('hommel', hommel_adj_exact)]:
        for _ in range(300):
            m = rng.choice([2, 3, 5, 6]); ps = [Fr(rand_p(rng)) for _ in range(m)]
            a0 = fe(ps); j = rng.randrange(m); ps2 = list(ps); ps2[j] = min(Fr(1), ps[j] + Fr(rng.random()) / 4)
            a1 = fe(ps2)
            if any(x > y for x, y in zip(a0, a1)): ok = False; print('  MONOTONICITY FAILURE', name, ps, ps2)
    print('monotonicity passed:', ok)
    print('=== adjusted p >= raw p and <= 1 (clipping) ; m = 1 reduces to raw p')
    ps = [Fr(rand_p(rng)) for _ in range(6)]
    for name, fe in [('holm', holm_adj_exact), ('hochberg', hochberg_adj_exact), ('bh', bh_adj_exact), ('by', by_adj_exact), ('bonf', bonf_adj_exact), ('sidak', sidak_adj_exact), ('hommel', hommel_adj_exact)]:
        a = fe(ps); print(f'{name}: all >= raw {all(x >= p for x, p in zip(a, ps))} all <= 1 {all(x <= 1 for x in a)} m=1 identity {fe([Fr(0.3)]) == [Fr(0.3)]}  Bonferroni clip example m=6,p=0.3 -> {fe([Fr(0.3)]*6)[0]}')
    print('=== closed testing (Bonferroni local tests) equals Holm on rejections (exact, exhaustive m<=5)')
    ok = True
    for _ in range(200):
        m = rng.choice([2, 3, 4, 5]); ps = [Fr(rand_p(rng)) * 4 for _ in range(m)]; ps = [min(p, Fr(1)) for p in ps]
        if closed_bonferroni_exact(ps, Fr(1, 20)) != [a <= Fr(1, 20) for a in holm_adj_exact(ps)]: ok = False; print('  MISMATCH', ps)
    print('closed-Bonferroni == Holm:', ok)
    print('=== Hommel exponential definition vs standard O(m^2) algorithm on random small families')
    def hommel_adj_std(ps):
        # standard algorithm (as commonly implemented); exact rationals
        m = len(ps); order = sorted(range(m), key=lambda i: (ps[i], i)); p = [ps[i] for i in order]
        q = [min(m * pp / (r + 1) for r, pp in enumerate(p))] * m; pa = list(q)
        for mm in range(m - 1, 1, -1):
            i1 = list(range(m - mm + 1)); i2 = list(range(m - mm + 1, m))
            q1 = min(mm * p[i] / (2 + i - i2[0]) for i in i2)
            for i in i1: q[i] = min(mm * p[i], q1)
            for i in i2: q[i] = q[i1[-1]]
            pa = [max(a, b) for a, b in zip(pa, q)]
        adj = [None] * m
        for r, i in enumerate(order): adj[i] = max(pa[r], p[r])
        return [min(Fr(1), a) for a in adj]
    ok = True
    for _ in range(300):
        m = rng.choice([2, 3, 4, 5, 6]); ps = [Fr(rand_p(rng)) for _ in range(m)]
        if rng.random() < 0.3: ps[0] = ps[-1]
        if hommel_adj_exact(ps) != hommel_adj_std(ps): ok = False; print('  HOMMEL MISMATCH', [float(p) for p in ps], [float(x) for x in hommel_adj_exact(ps)], [float(x) for x in hommel_adj_std(ps)])
    print('Hommel definition == standard algorithm:', ok)
    print('=== resource ceilings: closed testing 2^m subsets; Hommel exponential; sort cost')
    for m in [10, 16, 20]:
        t0 = time.time(); closed_bonferroni_exact([Fr(1, 1000)] * m, Fr(1, 20)); print(f'closed testing m={m}: subsets {2**m-1} time {time.time()-t0:.2f}s')
    t0 = time.time(); holm_adj_exact([Fr(rand_p(rng)) for _ in range(100000)]); print(f'exact Holm m=100000: {time.time()-t0:.2f}s')
    t0 = time.time(); hommel_adj_std([Fr(rand_p(rng)) for _ in range(2000)]); print(f'exact Hommel O(m^2) m=2000: {time.time()-t0:.2f}s')
    print('=== malformed inputs: structured refusal without exception leakage')
    def guarded(ps):
        try:
            if not isinstance(ps, list) or len(ps) == 0: return {'refusal': 'EMPTY_OR_NON_ARRAY_FAMILY'}
            for p in ps:
                if type(p) is not float: return {'refusal': 'NON_BINARY64_MEMBER'}
                if math.isnan(p) or math.isinf(p): return {'refusal': 'NON_FINITE_P'}
                if math.copysign(1.0, p) < 0 and p == 0.0: return {'refusal': 'NEGATIVE_ZERO_P'}
                if p < 0.0 or p > 1.0: return {'refusal': 'P_OUTSIDE_UNIT_INTERVAL'}
            return {'adjusted': [float(x) for x in holm_adj_exact([Fr(p) for p in ps])]}
        except Exception as e:  # must never be reached
            return {'refusal': 'INTERNAL_EXCEPTION', 'detail': str(e)}
    for case in [[], 'abc', [0.1, float('nan')], [float('inf')], [-0.0, 0.5], [1.0000000000000002], [-1e-300], [0.0, 0.0, 1.0], [0.2, 1], [5e-324, 0.5, 0.5]]:
        print(repr(case)[:40], '->', guarded(case))
    print('=== stepwise trace digest: canonical JSON of ordered members, exact thresholds, decisions; tamper detection')
    ps = [0.001, 0.02, 0.02, 0.04, 0.3]; m = len(ps); alpha = Fr(1, 20)
    order = sorted(range(m), key=lambda i: (ps[i], i))
    trace = {'procedure': 'holm-bonferroni-stepdown', 'alpha': '1/20', 'tie_rule': 'stable-by-input-index', 'ordered_members': order,
             'raw_p_bits': [bits(ps[i]) for i in order], 'thresholds': [str(alpha / (m - r)) for r in range(m)],
             'decisions': [bool(Fr(ps[i]) <= alpha / (m - r)) for r, i in enumerate(order)]}
    # step-down stop: after first non-rejection all later are non-rejections
    stop = next((r for r, d in enumerate(trace['decisions']) if not d), m)
    trace['decisions'] = [r < stop for r in range(m)]; trace['stop_index'] = stop
    canon = json.dumps(trace, sort_keys=True, separators=(',', ':'))
    digest = hashlib.sha256(canon.encode()).hexdigest()
    print('trace', canon); print('digest', digest)
    def verify(tr, dg):
        c = json.dumps(tr, sort_keys=True, separators=(',', ':'))
        if hashlib.sha256(c.encode()).hexdigest() != dg: return 'DIGEST_MISMATCH'
        # recompute decisions from bits and thresholds
        mm = len(tr['ordered_members']); alpha_ = Fr(tr['alpha'])
        pv = [struct.unpack('>d', bytes.fromhex(h))[0] for h in tr['raw_p_bits']]
        if any(pv[r] > pv[r + 1] for r in range(mm - 1)): return 'ORDER_VIOLATION'
        thr = [alpha_ / (mm - r) for r in range(mm)]
        if [str(t) for t in thr] != tr['thresholds']: return 'THRESHOLD_MISMATCH'
        dec = []; stopped = False
        for r in range(mm):
            d = (not stopped) and Fr(pv[r]) <= thr[r]
            if not d: stopped = True
            dec.append(d)
        if dec != tr['decisions']: return 'DECISION_MISMATCH'
        return 'OK'
    print('verify original:', verify(trace, digest))
    import copy
    t1 = copy.deepcopy(trace); t1['decisions'][3] = True; print('tamper decision, keep digest ->', verify(t1, digest))
    t2 = copy.deepcopy(trace); t2['decisions'][3] = True; d2 = hashlib.sha256(json.dumps(t2, sort_keys=True, separators=(',', ':')).encode()).hexdigest(); print('tamper decision, coherent re-digest ->', verify(t2, d2))
    t3 = copy.deepcopy(trace); t3['thresholds'][0] = '1/50'; d3 = hashlib.sha256(json.dumps(t3, sort_keys=True, separators=(',', ':')).encode()).hexdigest(); print('tamper threshold, coherent re-digest ->', verify(t3, d3))
    t4 = copy.deepcopy(trace); t4['raw_p_bits'][1], t4['raw_p_bits'][3] = t4['raw_p_bits'][3], t4['raw_p_bits'][1]; d4 = hashlib.sha256(json.dumps(t4, sort_keys=True, separators=(',', ':')).encode()).hexdigest(); print('reorder p bits, coherent re-digest ->', verify(t4, d4))
    print('python', sys.version.split()[0])
```

### A.7 Probe E — stochastic replay and intervals (`probe_e_stochastic_intervals.py`)

```python
"""Probe E: (1) stochastic (resampling) candidate replay and cross-seed boundary;
(2) simultaneous-interval endpoint projection, collapse, and test/interval duality.

Part 1 uses an explicitly specified integer-arithmetic generator (splitmix64 state
advance + xoshiro256** output, both public-domain algorithms restated here as exact
64-bit integer operations) so that replay is a property of the stated operations, not
of any library.  Bounded integers are drawn by rejection sampling (unbiased), and a
second, deliberately different mapping (floor(u * n) with u = top 53 bits / 2^53) is
used to show that the bit-stream-to-permutation mapping is itself a versioned choice.
"""
import sys, math, struct, hashlib, itertools, time
from fractions import Fraction as Fr
sys.set_int_max_str_digits(0)
M64 = (1 << 64) - 1
def bits(x): return struct.pack('>d', x).hex()

def splitmix64(seed):
    z = (seed + 0x9E3779B97F4A7C15) & M64
    z = ((z ^ (z >> 30)) * 0xBF58476D1CE4E5B9) & M64
    z = ((z ^ (z >> 27)) * 0x94D049BB133111EB) & M64
    return (z ^ (z >> 31)) & M64, (seed + 0x9E3779B97F4A7C15) & M64
def rotl(x, k): return ((x << k) | (x >> (64 - k))) & M64
class Xoshiro256ss:
    def __init__(self, seed):
        s = seed & M64; self.s = []
        for _ in range(4):
            v, s = splitmix64(s); self.s.append(v)
    def next64(self):
        s0, s1, s2, s3 = self.s
        result = (rotl((s1 * 5) & M64, 7) * 9) & M64
        t = (s1 << 17) & M64
        s2 ^= s0; s3 ^= s1; s1 ^= s2; s0 ^= s3; s2 ^= t; s3 = rotl(s3, 45)
        self.s = [s0, s1, s2, s3]; return result
    def bounded_rejection(self, n):
        """Unbiased integer in [0, n): draw 64 bits, reject values >= floor(2^64/n)*n."""
        lim = (1 << 64) - ((1 << 64) % n)
        while True:
            v = self.next64()
            if v < lim: return v % n
    def bounded_float_floor(self, n):
        u = (self.next64() >> 11) / float(1 << 53)  # 53-bit uniform
        return int(math.floor(u * n))

def fisher_yates(gen, n, draw):
    a = list(range(n))
    for i in range(n - 1, 0, -1):
        j = draw(i + 1); a[i], a[j] = a[j], a[i]
    return a

def group_means(vals, labels, k):
    sums = [Fr(0)] * k; cnt = [0] * k
    for v, g in zip(vals, labels): sums[g] += v; cnt[g] += 1
    return [s / c for s, c in zip(sums, cnt)], cnt

def max_abs_pairwise_t(vals, labels, k):
    """max over pairs of |mean_i - mean_j| / sqrt(MSE (1/n_i + 1/n_j)) -- returned as exact
    rational of the SQUARED statistic (avoids the square root) for exact comparisons."""
    means, cnt = group_means(vals, labels, k)
    sse = sum((v - means[g]) ** 2 for v, g in zip(vals, labels)); n = len(vals)
    mse = sse / (n - k)
    best = Fr(0)
    for i in range(k):
        for j in range(i + 1, k):
            t2 = (means[i] - means[j]) ** 2 / (mse * (Fr(1, cnt[i]) + Fr(1, cnt[j])))
            best = max(best, t2)
    return best

def maxT_permutation_p(vals, labels, k, seed, B, mapping='rejection'):
    gen = Xoshiro256ss(seed); n = len(vals)
    draw = gen.bounded_rejection if mapping == 'rejection' else gen.bounded_float_floor
    obs = max_abs_pairwise_t(vals, labels, k); count = 0
    for _ in range(B):
        perm = fisher_yates(gen, n, draw)
        if max_abs_pairwise_t([vals[i] for i in perm], labels, k) >= obs: count += 1
    return Fr(count + 1, B + 1), count

if __name__ == '__main__':
    print('=== Part 1: stochastic candidate replay / cross-seed')
    vals = [Fr(x) for x in [5.1, 4.9, 5.6, 5.0, 5.9, 5.7, 5.4, 6.1, 5.3, 5.5, 5.9, 5.2]]
    labels = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2]; k = 3
    t0 = time.time(); p1, c1 = maxT_permutation_p(vals, labels, k, seed=1, B=2000); dt = time.time() - t0
    p1b, c1b = maxT_permutation_p(vals, labels, k, seed=1, B=2000)
    print(f'seed=1 B=2000: p={p1} ({float(p1):.5f}) count={c1} ({dt:.1f}s); replay identical: {p1 == p1b and c1 == c1b}')
    gen = Xoshiro256ss(1); stream = [gen.next64() for _ in range(4)]
    print('first four 64-bit outputs for seed 1 (replay identity):', [hex(v) for v in stream], 'sha256 of 4x8 bytes', hashlib.sha256(b''.join(v.to_bytes(8, 'little') for v in stream)).hexdigest()[:16])
    print('--- cross-seed decisions at alpha = 1/20 (same data, same B)')
    res = []
    for seed in range(1, 21):
        p, c = maxT_permutation_p(vals, labels, k, seed=seed, B=400); res.append((seed, p, p <= Fr(1, 20)))
    print([(s, float(p), d) for s, p, d in res])
    print('decisions differ across seeds:', len({d for _, _, d in res}) > 1, ' min/max p:', float(min(p for _, p, _ in res)), float(max(p for _, p, _ in res)))
    print('--- bit-stream-to-permutation mapping is a versioned choice: same seed, two mappings')
    for mapping in ['rejection', 'float_floor']:
        gen = Xoshiro256ss(7); draw = gen.bounded_rejection if mapping == 'rejection' else gen.bounded_float_floor
        print(mapping, fisher_yates(gen, 12, draw))
    p_r, _ = maxT_permutation_p(vals, labels, k, seed=7, B=400, mapping='rejection'); p_f, _ = maxT_permutation_p(vals, labels, k, seed=7, B=400, mapping='float_floor')
    print('adjusted p under the two mappings:', float(p_r), float(p_f), 'equal:', p_r == p_f)
    print('--- exhaustive (deterministic) alternative: complete enumeration is exact but combinatorial')
    n = len(vals); n_arr = math.factorial(n) // (math.factorial(4) ** 3)
    print(f'n=12 (4,4,4): distinct labelings {n_arr}; n=30 (10,10,10): {math.factorial(30)//(math.factorial(10)**3)}; n=60 (20,20,20): {math.factorial(60)//(math.factorial(20)**3):.3e}')
    t0 = time.time(); obs = max_abs_pairwise_t(vals, labels, k); cnt = 0; tot = 0
    for combo in itertools.combinations(range(12), 4):
        rest = [i for i in range(12) if i not in combo]
        for combo2 in itertools.combinations(rest, 4):
            lab = [0] * 12
            for i in combo2: lab[i] = 1
            for i in rest:
                if i not in combo2: lab[i] = 2
            tot += 1
            if max_abs_pairwise_t(vals, lab, k) >= obs: cnt += 1
    print(f'exact enumeration: p = {cnt}/{tot} = {cnt/tot:.5f} ({time.time()-t0:.1f}s); permutation estimates above scatter around it')

    print('=== Part 2: simultaneous-interval endpoints in binary64')
    print('--- (a) input algebra: mean differences at large magnitude lose the difference entirely')
    ys = [1e16 + 1.0, 1e16 + 3.0]; print('1e16+1 ->', repr(ys[0]), ' 1e16+3 ->', repr(ys[1]), ' binary64 difference', ys[1] - ys[0], ' exact decimal difference 2')
    print('--- (b) endpoint collapse: half-width below the ULP of the estimate')
    est = 1e16; hw = 0.4; L = est - hw; U = est + hw; print(f'estimate {est!r} half-width {hw}: L={L!r} U={U!r} collapsed(L==U)={L==U}')
    est = 12345.678; hw = 5e-13; L = est - hw; U = est + hw; print(f'estimate {est!r} half-width {hw}: L={L!r} U={U!r} width in ULPs={(U-L)/math.ulp(est):.1f}')
    print('--- (c) duality: 0 in [L,U] versus |diff| <= half-width; exact rational statistic versus rounded half-width')
    # construct: diff and se exact dyadic; q irrational (from a critical value); compare diff^2/se^2 with q^2 enclosure
    diff = Fr(0.7); se = Fr(0.25); stat2 = diff * diff / (se * se)  # exact rational (t^2)
    import mpmath
    mpmath.mp.dps = 50
    q = mpmath.mpf('2.8')  # placeholder critical constant with irrational-like enclosure demonstration below
    print('exact squared statistic', stat2, '=', float(stat2))
    # binary64 evaluation of the same decision three ways
    qf = 2.8; hw_f = qf * float(se); L_f = float(diff) - hw_f; U_f = float(diff) + hw_f
    print(f'binary64: hw={hw_f!r} L={L_f!r} U={U_f!r}  reject by interval (0 not in [L,U]) = {not (L_f <= 0.0 <= U_f)}  reject by |diff|>hw = {abs(float(diff)) > hw_f}  exact rational (diff > q se with q=14/5) = {diff > Fr(14,5)*se}')
    # near-critical: make diff exactly q*se in exact arithmetic with rational q, then perturb by one ULP
    q_r = Fr(14, 5); diff_c = q_r * se  # 0.7 exactly
    for d in [float(diff_c), math.nextafter(float(diff_c), 0), math.nextafter(float(diff_c), 1)]:
        hw_f = 2.8 * 0.25; L_f = d - hw_f; U_f = d + hw_f
        print(f'diff={d!r}: exact diff>q*se: {Fr(d) > diff_c}; binary64 |diff|>hw: {abs(d) > hw_f}; interval excludes 0: {not (L_f <= 0.0 <= U_f)}; L bits {bits(L_f)}')
    print('--- (d) enclosure-refinement decision for an irrational critical constant: stat^2 versus q^2 ball')
    from flint import arb, ctx
    # q = sqrt(2) * t_{0.975, nu} as a stand-in irrational; enclosure at increasing precision
    # stand-in irrational threshold q^2 = 2 pi; statistic^2 is the rational 2 pi truncated to 40 digits plus 1e-38
    st = Fr(int('62831853071795864769252867665590057683943'), 10 ** 40) + Fr(1, 10 ** 38)
    for prec in [30, 53, 80, 100, 128, 160, 200]:
        ctx.prec = prec
        q2 = 2 * arb.pi()
        stat2_a = arb(st.numerator) / arb(st.denominator)
        diff_ball = stat2_a - q2
        dec = 'reject (stat > q)' if diff_ball.lower() > 0 else ('accept' if diff_ball.upper() < 0 else 'UNDECIDED at this precision -> refine or refuse')
        print(f'prec={prec}: stat2 - q^2 = {diff_ball.str(6, radius=True)} -> {dec}')
    print('--- (c2) random search for duality flips: exact-rational decision on binary64 inputs vs binary64 evaluation of hw = q*se')
    import random
    rng = random.Random(7); flips = 0; total = 0; witness = None
    for _ in range(200000):
        se = rng.uniform(0.01, 3.0); q = rng.uniform(2.0, 5.0)
        hw_exact = Fr(q) * Fr(se); hw_f = q * se
        d = float(hw_exact); d = rng.choice([d, math.nextafter(d, 0), math.nextafter(d, 10)])
        total += 1
        ex = Fr(d) > hw_exact; fl = d > hw_f; iv = not ((d - hw_f) <= 0.0 <= (d + hw_f))
        if ex != fl or ex != iv:
            flips += 1
            if witness is None: witness = dict(q=q, se=se, diff=d, diff_bits=bits(d), hw_f=hw_f, exact_reject=ex, float_reject=fl, interval_excludes_zero=iv)
    print(f'flips {flips} of {total}; first witness {witness}')
    print('--- (e) overflow refusal: means near DBL_MAX')
    a = 1.7e308; b = -1.7e308; d = a - b; print('difference of extreme means:', repr(d), 'inf ->', math.isinf(d))
    print('python', sys.version.split()[0])
```

### A.8 Probe F — quantile certificates and resources (`probe_f_quantiles_resources.py`)

```python
"""Probe F: critical-value (quantile) certificates for the F and t families, the Scheffe
projection constant, integer-df exact-rational route for F quantile brackets, and resource
exhaustion / fail-closed behaviour of the rigorous integrator.
"""
import sys, math, struct, time
from fractions import Fraction as Fr
sys.set_int_max_str_digits(0)
import mpmath
from mpmath import mp, mpf
from flint import arb, acb, fmpq, ctx
def bits(x): return struct.pack('>d', x).hex()
def fa(q): q = Fr(q); return arb(fmpq(q.numerator, q.denominator))
def f_tail_arb(d1, d2, f):
    x = Fr(d2) / (Fr(d2) + Fr(d1) * Fr(f))
    r = fa(x).beta_lower(fa(Fr(d2) / 2), fa(Fr(d1) / 2), regularized=True)
    if not r.is_finite(): r = 1 - fa(1 - x).beta_lower(fa(Fr(d1) / 2), fa(Fr(d2) / 2), regularized=True)
    return r
def f_tail_exact_even(d1, d2, f):
    a = d2 // 2; b = d1 // 2; x = Fr(d2) / (Fr(d2) + Fr(d1) * Fr(f)); n = a + b - 1
    return sum(Fr(math.comb(n, j)) * x ** j * (1 - x) ** (n - j) for j in range(a, n + 1))
def f_tail_mp(d1, d2, f):
    x = mpf(d2) / (mpf(d2) + mpf(d1) * f)
    return mpmath.betainc(mpf(d2) / 2, mpf(d1) / 2, 0, x, regularized=True)

if __name__ == '__main__':
    mp.dps = 40; ctx.prec = 200
    print('=== F upper 0.05 quantiles: mpmath root, binary64 nearest, rigorous Arb sign bracket at the two neighbouring cells')
    for d1, d2 in [(2, 12), (3, 20), (4, 7), (2, 1000), (9, 90), (2, Fr(73, 10))]:
        d2m = mpf(d2.numerator) / d2.denominator if isinstance(d2, Fr) else mpf(d2)
        root = mpmath.findroot(lambda f: f_tail_mp(d1, d2m, f) - mpf(1) / 20, (mpf(1), mpf(10)), solver='anderson', tol=1e-35)
        qf = float(root); lo = math.nextafter(qf, 0); hi = math.nextafter(qf, 100)
        blo = f_tail_arb(d1, d2, lo) - fa(Fr(1, 20)); bhi = f_tail_arb(d1, d2, hi) - fa(Fr(1, 20))
        cert = blo.lower() > 0 and bhi.upper() < 0  # tail decreasing: tail(lo) > 0.05 > tail(hi)
        print(f'F({d1},{d2}) q0.05 = {mpmath.nstr(root, 25)} -> {qf!r} ({bits(qf)}); tail(lo)-0.05 {blo.str(6, radius=True)} tail(hi)-0.05 {bhi.str(6, radius=True)} certified_bracket={cert}')
        if isinstance(d2, int) and d1 % 2 == 0 and d2 % 2 == 0:
            e_lo = f_tail_exact_even(d1, d2, lo) > Fr(1, 20); e_hi = f_tail_exact_even(d1, d2, hi) < Fr(1, 20)
            print(f'   exact-rational (even df) route confirms bracket: {e_lo and e_hi}')
    print('=== Scheffe constant sqrt((k-1) F_{0.05; k-1, nu}): enclosure and binary64 rounding cell')
    for k, nu in [(3, 12), (5, 40)]:
        root = mpmath.findroot(lambda f: f_tail_mp(k - 1, nu, f) - mpf(1) / 20, (mpf(1), mpf(10)), solver='anderson', tol=1e-35)
        S = mpmath.sqrt((k - 1) * root); print(f'k={k} nu={nu}: F crit {mpmath.nstr(root, 20)} Scheffe S {mpmath.nstr(S, 20)} binary64 {float(S)!r}; S^2 = (k-1)F is the exact comparison surface (avoid the square root: compare contrast^2/(var) against (k-1)F enclosure)')
    print('=== t two-sided 0.05 critical value certificate reuse: df=10, bracket via incomplete beta ball')
    root = mpmath.findroot(lambda t: mpmath.betainc(mpf(5), mpf(1)/2, 0, mpf(10)/(10 + t*t), regularized=True) - mpf(1)/20, (mpf(1), mpf(4)), solver='anderson', tol=1e-35)
    tf = float(root)
    for c in [math.nextafter(tf, 0), tf, math.nextafter(tf, 10)]:
        x = Fr(10) / (10 + Fr(c) ** 2); b = fa(x).beta_lower(fa(5), fa(Fr(1,2)), regularized=True) - fa(Fr(1,20))
        print(f'   t={c!r} ({bits(c)}): P-0.05 = {b.str(6, radius=True)} sign {"+" if b.lower()>0 else ("-" if b.upper()<0 else "?")}')
    print('=== resource exhaustion of the rigorous integrator: eval_limit / depth_limit produce wide balls, no exception')
    f = lambda z, analytic: (-(z*z)/2).exp()
    for lim in [10, 50, 200, 2000]:
        try:
            r = acb.integral(f, -10, 10, eval_limit=lim, rel_tol=arb(2)**-60, abs_tol=arb(2)**-60).real
            print(f'eval_limit={lim}: {r.str(12, radius=True)} finite={r.is_finite()} radius_small={r.rad() < arb(2)**-40}')
        except Exception as e:
            print(f'eval_limit={lim}: EXCEPTION {type(e).__name__}: {str(e)[:80]}')
    print('=== malformed parameters: df <= 0, non-finite f, negative f -> Arb/mpmath behaviour (must be pre-checked; not relied upon)')
    for d1, d2, f in [(0, 5, 2.0), (2, 0, 2.0), (2, 5, -1.0), (2, 5, float('nan')), (2, 5, float('inf')), (-2, 5, 1.0)]:
        try:
            r = f_tail_arb(d1, d2, f) if all(math.isfinite(v) for v in [f]) else 'skipped-non-finite (Fraction refuses)'
            print(f'({d1},{d2},{f}) -> {r if isinstance(r,str) else r.str(8, radius=True)}')
        except Exception as e:
            print(f'({d1},{d2},{f}) -> EXCEPTION {type(e).__name__}: {str(e)[:60]}')
    print('=== integer-df exact route cost: both-even df, denominators; odd df needs enclosure')
    for d1, d2, f in [(2, 1000, 3.0), (10, 2000, 1.5), (50, 5000, 1.2)]:
        t0 = time.time(); v = f_tail_exact_even(d1, d2, f); dt = time.time() - t0
        print(f'F({d1},{d2}) f={f}: exact tail denominator bits {v.denominator.bit_length()} time {dt:.3f}s value {float(v)!r}')
    print('versions mpmath', mpmath.__version__, 'python-flint', __import__('flint').__version__)
```

## Appendix B. Probe console outputs (verbatim)

Except for Probe B, outputs are the verbatim neutral-path repair reruns captured on
2026-09-04. Probe B is the complete original transcript, preserved byte-for-byte with a
digest recomputed over the fenced bytes. Wall-clock timings are environment observations
only. Long numeric lines are unaltered. The repository formatter removes line-end spaces
from fenced text; each digest therefore identifies the repository's exact fenced bytes.

### B.1 Probe A — F and t tails output (`probe_a.out`, SHA-256 `e7f121651accb4b3b514c52244aac9b28922c4d1650f79bf9da2e0a9451f7157`)

```text
grid cases 576 r1_inside_r2_ball 576 r3_checked 240 r3_mismatch 0 r2_contains_r3 240
binary64 classes over grid {'one': 120, 'normal': 371, 'subnormal': 6, 'zero': 79}
max relative gap between mpmath value and Arb ball (mpmath dps=60): 1.065e-54
largest exact-rational denominator bit length in R3: 551941
Arb direct-form non-finite (complement identity used) count 16 [(1, 1, 1e-300), (1, 2, 1e-300), (1, 3, 1e-300), (1, 5, 1e-300), (1, 10, 1e-300), (1, 30, 1e-300), (1, 100, 1e-300), (1, 1000, 1e-300)]
--- R4 quadrature cross-check (subset)
1 5 2.0 0.2164372292696856481313631197 0.2164372292696856481313631197 rel 0.0
2 10 4.0 0.0529221494013446459719893647649 0.0529221494013446459719893647649 rel 1.8373e-61
3 30 1.0 0.406357266872948725508634168066 0.406357266872948725508634168066 rel 1.9143e-61
4 100 10.0 0.000000754890489185615770034604866971 0.000000754890489185615770034604866971 rel 7.8617e-61
10 1000 2.0 0.0303923761409906765662165719675 0.0303923761409906765662165719675 rel 4.1591e-60
50 3 0.5 0.874057941797381201614586361053 0.874057941797381201614586361053 rel 1.1569e-60
--- non-integer d2 (Welch omnibus family)
2 73/10 3.0 0.111961820094449868005673974184 [0.111961820094449868005673974184 +/- 2.98e-31] quad 0.111961820094449868005673974184 rel14 6.9477e-61
3 49/4 2.5 0.108135181070727797103501981213 [0.108135181070727797103501981213 +/- 2.01e-31] quad 0.108135181070727797103501981213 rel14 0.0
4 20000001/10000000 5.0 0.173553709845462120895774086366 [0.173553709845462120895774086366 +/- 1.44e-31] quad 0.173553709845462120895774086366 rel14 0.0
2 1/2 1.0 0.668740304976422024003233073259 [0.668740304976422024003233073259 +/- 3.53e-31] quad 0.668740304976421970232778968908 rel14 8.0406e-17
5 99/100 4.0 0.364035949581501535951874352664 [0.364035949581501535951874352664 +/- 1.51e-31] quad 0.364035949581501535951874352664 rel14 2.5257e-32
2 1000000/7 2.0 0.135339072606859506708996817057 [0.135339072606859506708996817057 +/- 3.29e-31] quad 0.135339072606859506708996817057 rel14 9.1789e-58
--- t identity and R2 witness cross-check
mpmath p 1.588771213986757393750997533798255315047e-114 arb [1.588771213986757393750997533798255315047e-114 +/- 4.76e-154] binary64 284f4ce623062755 expected R2 truth bits 284f4ce623062755 True
cell value 1.5887712139867575e-114 next 1.5887712139867576e-114 prev 1.5887712139867573e-114
truth within cell (exact midpoints): True
--- projection transitions (f solving P(F>f) = threshold), mpmath findroot on log scale
2 10 min_normal 2^-1022 f = 1.69629396922e+62
2 10 min_subnormal 2^-1074 f = 2.29199187085e+65
2 10 half_min_subnormal 2^-1075 f = 2.63280729171e+65
2 10 rounds-to-one boundary f = 5.55111512313e-17
2 1000 min_normal 2^-1022 f = 1561.93663759
2 1000 min_subnormal 2^-1074 f = 1716.06469573
2 1000 half_min_subnormal 2^-1075 f = 1719.13894414
2 1000 rounds-to-one boundary f = 5.55111512313e-17
50 1000 min_normal 2^-1022 f = 78.6508573593
50 1000 min_subnormal 2^-1074 f = 86.1149631457
50 1000 half_min_subnormal 2^-1075 f = 86.2638268453
50 1000 rounds-to-one boundary f = 0.098191462814
4 20 min_normal 2^-1022 f = 3.70147507871e+31
4 20 min_subnormal 2^-1074 f = 1.36060106687e+33
4 20 half_min_subnormal 2^-1075 f = 1.45825611657e+33
4 20 rounds-to-one boundary f = 5.0231804339e-9
10 100 min_normal 2^-1022 f = 18325401.3042
10 100 min_subnormal 2^-1074 f = 37681208.3104
10 100 half_min_subnormal 2^-1075 f = 38207218.5268
10 100 rounds-to-one boundary f = 0.000281178169876
--- scipy behaviour at subnormal/zero transitions
50 1000 28.0 scipy np.float64(3.3921527026803867e-155) 1fdd1ba952cb0b8b normal truth 3.39215270268e-155 nearest 1fdd1ba952cb0aee normal
50 1000 32.0 scipy np.float64(5.07019928834692e-172) 1c5f59b13c1bade0 normal truth 5.07019928835e-172 nearest 1c5f59b13c1bacdf normal
2 1000 720.0 scipy np.float64(2.0187699459557692e-194) 17b794347fda1af3 normal truth 2.01876994596e-194 nearest 17b794347fda1a9a normal
2 1000 760.0 scipy np.float64(1.994020455748416e-201) 164389755cdda1fb normal truth 1.99402045575e-201 nearest 164389755cdda294 normal
2 10 1e+62 scipy np.float64(3.1250000000000008e-307) 004c16c5c5253577 normal truth 3.125e-307 nearest 004c16c5c5253574 normal
--- f = 0 gives p = 1 exactly under R3: True  d1=4,d2=6 f=1: 297/625
--- non-increasing in f (R1, d1=3,d2=7, all grid f): True  strictly decreasing for f>=1e-10: True
--- R3 exact values not inside Arb ball (diagnostic):
--- monotone in d2 at fixed f=2, d1=3 (larger d2 -> smaller tail for f>1?): ['0.46952223', '0.35048095', '0.29179141', '0.23262392', '0.17800741', '0.1352', '0.11884247', '0.11233936']
versions mpmath 1.4.1 python-flint 0.9.0 scipy 1.17.1 python 3.12.13
```

### B.2 Probe B — Studentized range output (`probe_b.out`, SHA-256 `daaef1f2513aae261931be54da22d2a0891ec68d73206ce675c670e6d1a5e5ba`)

```text
=== B3 identity: k=2, P(Q<=q) = P(|T_nu| <= q/sqrt2) = 1 - I_{nu/(nu+t^2)}(nu/2, 1/2)
nu=5 q=2.0 identity=0.78356277073031435187 B1=0.78356277073031435187 rel=0.0 (14.9s)
nu=10 q=3.0 identity=0.94010967557444058025 B1=0.94010967557444058025 rel=0.0 (17.7s)
nu=30 q=4.0 identity=0.99174266408536862777 B1=0.99174266408536862777 rel=0.0 (19.2s)
nu=1 q=1.0 identity=0.39182655203060727017 B1=0.39182655203060727017 rel=0.0 (15.6s)
nu=2 q=8.0 identity=0.97014250014533189408 B1=0.97014250014533189408 rel=8.73e-22 (17.3s)
nu=200 q=2.7718 identity=0.94861028104137728435 B1=0.94861028104137728435 rel=8.93e-22 (26.2s)
=== B3 identity: nu -> infinity, F_k(q) normal range; k=2: 2 Phi(q/sqrt2) - 1
q=1.0 F_2(q)=0.52049987781304653768 closed=0.52049987781304653768
q=2.7718 F_2(q)=0.94999936780250307786 closed=0.94999936780250307786
q=4.0 F_2(q)=0.99532226501895273416 closed=0.99532226501895273416
k=3 q=3.3145 F_k(q) (nu=inf) = 0.950000612403939  large-nu(1e6) B1 = 0.950000169912
k=4 q=3.6332 F_k(q) (nu=inf) = 0.950003794029827  large-nu(1e6) B1 = 0.950003220762
k=10 q=4.4745 F_k(q) (nu=inf) = 0.950040038519088  large-nu(1e6) B1 = 0.950038955126
=== B1 vs B2 (rigorous Arb enclosure) at selected (k, nu, q)
k=3 nu=10 q=3.877 B1=0.950012911246745594 (17.8s)  B2=[0.950012911247 +/- 3.54e-13] (176.2s) B1_inside_B2=True
k=3 nu=10 q=3.0 B1=0.865016584810436003 (17.9s)  B2=[0.8650165848104 +/- 4.66e-14] (103.6s) B1_inside_B2=True
k=4 nu=20 q=3.958 B1=0.949978788864849565 (19.4s)  B2=[0.94997878886 +/- 8.25e-12] (176.1s) B1_inside_B2=True
k=5 nu=5 q=5.0 B1=0.921074516170004857 (19.9s)  B2=[0.9210745161700 +/- 8.61e-14] (221.6s) B1_inside_B2=True
k=3 nu=2 q=8.0 B1=0.946008999723080908 (18.6s)  B2=[0.94600899972 +/- 4.63e-12] (479.6s) B1_inside_B2=True
k=3 nu=1 q=20.0 B1=0.932630484775861867 (17.5s)  B2=[0.932631 +/- 5.16e-7] (495.6s) B1_inside_B2=True
k=6 nu=60 q=4.16 B1=0.949717156431638243 (16.5s)  B2=[0.94971715643164 +/- 7.01e-15] (205.2s) B1_inside_B2=True
k=3 nu=73/10 q=4.0 B1=0.943499499875563616 (16.7s)  B2=[0.943499499876 +/- 9.06e-13] (2.4s) B1_inside_B2=True
k=20 nu=30 q=5.0 B1=0.894735194056411775 (17.4s)  B2=[0.89473519406 +/- 5.05e-12] (486.5s) B1_inside_B2=True
k=3 nu=10 q=0.5 B1=0.0661358278495920051 (16.1s)  B2=[0.0661358278496 +/- 4.91e-14] (100.5s) B1_inside_B2=True
k=3 nu=10 q=12.0 B1=0.99998102429034977 (17.3s)  B2=[0.999981024290 +/- 4.12e-13] (352.9s) B1_inside_B2=True
=== monotonicity (B1): in q increasing; in k decreasing; in nu increasing
q monotone: True
k monotone (decreasing): True ['0.94010968', '0.86501658', '0.78888908', '0.65122809', '0.44913767']
nu monotone (increasing): True ['0.58966704', '0.71165002', '0.82010774', '0.86501658', '0.89755341', '0.90935218']
=== critical values q_{0.05;k,nu} by root finding on B1, then rigorous B2 bracket at binary64 neighbours
k=3 nu=10: q=3.876776750013181841516 binary64 nearest 3.876776750013182 (400f03a387599928) (621.4s)
   B2 enclosure at 3.8767767500131813: [0.95000000000000 +/- 2.77e-15]  P-0.95 is UNDECIDED (ball straddles 0.95)
   B2 enclosure at 3.8767767500131822: [0.95000000000000 +/- 2.82e-15]  P-0.95 is UNDECIDED (ball straddles 0.95)
   (350.0s)
k=4 nu=20: q=3.958293560945356786097 binary64 nearest 3.9582935609453567 (400faa95d081d24f) (786.3s)
   B2 enclosure at 3.9582935609453562: [0.950000000000000 +/- 5.70e-16]  P-0.95 is UNDECIDED (ball straddles 0.95)
   B2 enclosure at 3.958293560945357: [0.950000000000000 +/- 5.53e-16]  P-0.95 is UNDECIDED (ball straddles 0.95)
   (409.7s)
k=3 nu=5: q=4.601726054362567298084 binary64 nearest 4.601726054362567 (4012682adff28daa) (459.3s)
   B2 enclosure at 4.601726054362566: [0.9500000000000000 +/- 6.76e-17]  P-0.95 is negative
   B2 enclosure at 4.601726054362568: [0.9500000000000000 +/- 6.42e-17]  P-0.95 is UNDECIDED (ball straddles 0.95)
   (442.7s)
k=2 nu=10: q=3.151064183329407960758 binary64 nearest 3.151064183329408 (400935612377f95b) (462.2s)
   k=2 identity enclosure at 3.1510641833294075: [0.9499999999999999735687748 +/- 3.51e-26]  minus 0.95 sign: [-2.6431225e-17 +/- 2.36e-25]
   k=2 identity enclosure at 3.151064183329408: [0.9500000000000000001881127 +/- 1.88e-26]  minus 0.95 sign: [1.8811268e-19 +/- 1.45e-27]
   k=2 identity enclosure at 3.1510641833294084: [0.9500000000000000268074506 +/- 2.35e-27]  minus 0.95 sign: [2.6807451e-17 +/- 4.03e-25]
=== boundaries: q=0, huge q (rounds to one), nu=1 heavy tail, non-integer nu, k boundaries
q=0 -> 0.0
k=3 nu=10 q=20: 1-P = 1.683538996e-7  binary64(P) = 0.9999998316461004 class=normal
k=3 nu=10 q=50: 1-P = 2.139430936e-11  binary64(P) = 0.9999999999786057 class=normal
k=3 nu=10 q=200: 1-P = 2.169590191e-17  binary64(P) = 1.0 class=one
k=3 nu=1 q=20: 1-P = 0.06736951522
k=3 nu=1 q=50: 1-P = 0.02699959148
k=3 nu=1 q=200: 1-P = 0.006752217635
k=3 nu=1 q=1000: 1-P = 0.001350473236
non-integer nu=7.3, k=4, q=4: 0.90918029369639062666
k=1 is not a range (degenerate): refuse; k=2 handled by exact identity; k=100 q=6 nu=50: 0.869345615201
versions mpmath 1.4.1 python-flint 0.9.0
```

### B.3 Probe G — Studentized range bracket at declared resolution output (`probe_g.out`, SHA-256 `b6b70553ee8e5739d03b95045cbc80c2e74557c44ad44e0a730fd694a05fbaee`)

```text
=== declared-resolution bracket h = 1e-12 around 3.876776750013182
h=1e-12: P(q0-h)-0.95 = [-6e-14 +/- 4.96e-15] negative; P(q0+h)-0.95 = [6e-14 +/- 4.89e-15] positive; certified=True (225s)
h=1e-13: P(q0-h)-0.95 = [+/- 8.52e-15] negative; P(q0+h)-0.95 = [+/- 8.59e-15] positive; certified=True (235s)
=== enclosure radius versus requested tolerance at q0 (binary64-cell bracket needs radius below ~4e-17)
tol=2^-40 prec=96: [0.950000000000 +/- 9.92e-14] radius=[9.91e-14 +/- 8.67e-18] (112s)
tol=2^-48 prec=96: [0.95000000000000 +/- 2.80e-15] radius=[2.76e-15 +/- 2.77e-18] (111s)
tol=2^-56 prec=128: [0.95000000000000001 +/- 6.16e-18] radius=[5.32e-18 +/- 1.26e-22] (188s)
local density at q0 ~ 0.0578404 ; CDF change across one binary64 ULP ( 4.440892098500626e-16 ) ~ 2.569e-17
```

### B.4 Probe C — many-to-one multivariate t output (`probe_c.out`, SHA-256 `505e03fe30648f579f1020363ef09d9fd826e0e60b7ad15455a1e0cb7230e49d`)

```text
=== C4 identity: p=1 (one treatment) one-sided = P(T_nu <= d); two-sided = P(|T_nu| <= d)
nu=10 d=1.812: one-sided identity 0.949962368967076392 C1 0.949962368967076391 | two-sided identity 0.899924737934152783 C1 0.899924737934152783
nu=5 d=2.0: one-sided identity 0.949030260585070822 C1 0.949030260585070822 | two-sided identity 0.898060521170141644 C1 0.898060521170141644
nu=30 d=2.5: one-sided identity 0.990942175465966653 C1 0.990942175465966653 | two-sided identity 0.981884350931933306 C1 0.981884350931933306
=== C1 (product reduction) vs C2 (direct 3-D bivariate) for p=2, unequal sizes
ns=[5, 9] n0=7 nu=18 d=2.0 two_sided=False: C1=0.9458290493023317 (11.5s) C2=0.9458290493023317 (170.9s) rel=0.0
ns=[5, 9] n0=7 nu=18 d=2.2 two_sided=True: C1=0.9258209328927715 (26.7s) C2=0.9258209328927715 (75.1s) rel=0.0
ns=[3, 30] n0=4 nu=34 d=2.1 two_sided=False: C1=0.9625224804271421 (19.8s) C2=0.9625224804271421 (212.1s) rel=1.13e-19
ns=[10, 10] n0=10 nu=27 d=1.92 two_sided=False: C1=0.9418526167689369 (12.2s) C2=0.9418526167689369 (177.0s) rel=0.0
=== C1 vs C3 (Arb rigorous)
ns=[5, 5, 5] n0=5 nu=16 d=2.3 two_sided=False: C1=0.9563104423686814 (16.7s) C3=[0.9563104424 +/- 3.98e-11] (156.1s) C1_inside_C3=True
ns=[5, 9, 13] n0=7 nu=30 d=2.6 two_sided=True: C1=0.9631009000195884 (44.9s) C3=[0.96310090002 +/- 4.93e-12] (231.4s) C1_inside_C3=True
ns=[4, 4] n0=4 nu=9 d=2.5 two_sided=True: C1=0.9400080640433291 (24.0s) C3=[0.9400080640 +/- 5.79e-11] (68.7s) C1_inside_C3=True
ns=[20, 20, 20, 20, 20, 20, 20, 20] n0=20 nu=171 d=2.6 two_sided=True: C1=0.9385230853449858 (112.1s) C3=[0.93852308534 +/- 7.34e-12] (1351.3s) C1_inside_C3=True
=== equal sizes rho=1/2: one-sided 0.95 constants (commonly tabulated values shown only as unverified secondary comparison)
p=2 nu=10: d(0.95)=2.15061382675068727 binary64 2.1506138267506874 (4001347505a1c1c4) tabulated~2.15
p=3 nu=20: d(0.95)=2.192283462387244 binary64 2.192283462387244 (400189cbe9741e6e) tabulated~2.3
p=2 nu=1000000: d(0.95)=1.91633405067623679 binary64 1.9163340506762367 (3ffea94de4bdd9ad) tabulated~1.92
=== two-sided rho=1/2 p=2 nu=10 constant, and rigorous bracket at binary64 neighbours (C3)
root 2.56833887603162688 binary64 2.568338876031627 40048bf540accf55
  C3 at 2.5683388760316266: [0.9500000000000 +/- 5.48e-14] P-0.95 UNDECIDED
  C3 at 2.5683388760316275: [0.9500000000000 +/- 5.49e-14] P-0.95 UNDECIDED
  (255.4s)
=== correlation boundaries: n0 -> large (lambda -> 0), n0 = 1 (lambda near 1), and dimension p = 1..30 monotonicity
n0=1 ns=[10,10] nu=25 d=2: P=0.961346690658367  lambda=0.95346259
n0=5 ns=[10,10] nu=25 d=2: P=0.952885830970981  lambda=0.81649658
n0=50 ns=[10,10] nu=25 d=2: P=0.945697985879963  lambda=0.40824829
n0=5000 ns=[10,10] nu=25 d=2: P=0.944655319199461  lambda=0.044676705
two-sided P decreasing in p: True ['0.98337965', '0.96905298', '0.95632783', '0.93424745', '0.89101114', '0.83003033', '0.78568849']
d monotone: True
nu monotone increasing at fixed d=2: ['0.7806332358', '0.8560698754', '0.9144929205', '0.9473500562', '0.9563141184']
=== boundaries: d = 0 (two-sided -> 0), large d rounds to one, nu=1
two-sided d=0: 2.56736847487377959e-40  one-sided d=0 (=P(all Z<=0)): 0.333333333333
two-sided d=10: 1-P=6.9159078e-7 binary64=0.9999993084092206
two-sided d=30: 1-P=2.2852045e-12 binary64=0.9999999999977148
two-sided d=100: 1-P=1.3010426e-18 binary64=1.0
versions mpmath 1.4.1 python-flint 0.9.0
```

### B.5 Probe C-2 — many-to-one boundary replay output (`probe_c2.out`, SHA-256 `2aa1b24f9a7bbc85ac8e890241125d404a16b1e2fc8323900f9eee993e1e240b`)

```text
d monotone (one-sided P increasing in d): True ['0.5414954262', '0.733013703', '0.9399091649', '0.9898463329', '0.9997063086']
nu monotone increasing at fixed d=2: ['0.7806332358', '0.8560698754', '0.9144929205', '0.9473500562', '0.9563141184']
=== boundaries: d = 0 (two-sided -> 0), large d rounds to one, nu=1
two-sided d=0: 2.56736847487377959e-40  one-sided d=0 (=P(all Z<=0)): 0.333333333333
two-sided d=10: 1-P=6.9159078e-7 binary64=0.9999993084092206
two-sided d=30: 1-P=2.2852045e-12 binary64=0.9999999999977148
two-sided d=100: 1-P=1.3010426e-18 binary64=1.0
versions mpmath 1.4.1 python-flint 0.9.0
```

### B.6 Probe D — adjusted-p arithmetic output (`probe_d.out`, SHA-256 `f5dca5a615fd53cf124944c2ddfdf374b1d7460593654883ea9df80b0dcf8e98`)

```text
=== level-constant identity: alpha as decimal 1/20 versus binary64 0.05
binary64 0.05 exact = 0.05 as fraction bits 3fa999999999999a  > 1/20: True  difference 2.7755575615628915e-18
witness: raw p = binary64(0.05): reject under alpha=binary64(0.05): True  reject under alpha=1/20: False
m=3: float alpha/m = 0.016666666666666666 (3f91111111111111), exact 1/(20m) - float = -2.313e-19; p=float(alpha/m): float-reject True exact-reject True
m=7: float alpha/m = 0.0071428571428571435 (3f7d41d41d41d41e), exact 1/(20m) - float = 6.443e-19; p=float(alpha/m): float-reject True exact-reject False
m=11: float alpha/m = 0.004545454545454546 (3f729e4129e4129f), exact 1/(20m) - float = 6.466e-19; p=float(alpha/m): float-reject True exact-reject False
m=13: float alpha/m = 0.0038461538461538464 (3f6f81f81f81f820), exact 1/(20m) - float = 2.135e-19; p=float(alpha/m): float-reject True exact-reject False
=== near-critical decision flips: p*m <= a versus p <= a/m in binary64 (random search near threshold)
flip count 676 of 260000; first witness (m, p, bits, p*m<=a, p<=a/m, exact) = (7, 0.0071428571428571435, '3f7d41d41d41d41e', True, True, False)
=== BH threshold forms in binary64: p <= i*q/m vs p*m <= i*q vs p*m/i <= q (random near-threshold)
flip count 1210 of 153000; first witness = (5, 3, 0.030000000000000006, '3f9eb851eb851eba', [True, True, False, False])
=== Sidak cancellation: 1-(1-p)^m for tiny p; exact vs naive float vs expm1/log1p form
p=1e-17 m=3: exact->binary64 3e-17 naive 0.0 expm1/log1p 3e-17 ; naive==exact False stable==exact True
p=1e-17 m=1000: exact->binary64 9.999999999999951e-15 naive 0.0 expm1/log1p 9.99999999999995e-15 ; naive==exact False stable==exact False
p=8.673617379884035e-19 m=5: exact->binary64 4.336808689942018e-18 naive 0.0 expm1/log1p 4.336808689942018e-18 ; naive==exact False stable==exact True
p=1e-300 m=10: exact->binary64 1e-299 naive 0.0 expm1/log1p 1e-299 ; naive==exact False stable==exact True
p=5e-324 m=2: exact->binary64 1e-323 naive 0.0 expm1/log1p 1e-323 ; naive==exact False stable==exact True
p=0.3 m=4: exact->binary64 0.7599 naive 0.7599 expm1/log1p 0.7599 ; naive==exact True stable==exact True
resource: exact (1-p)^m denominator bits and time
  m=10: denominator bits 10741 time 0.000s
  m=100: denominator bits 107401 time 0.001s
  m=1000: denominator bits 1074001 time 0.035s
  m=10000: denominator bits 10740001 time 1.114s
=== BY constant c(m)=sum 1/i: binary64 summation orders differ; exact harmonic number is a rational
m=10: forward 2.9289682539682538 backward 2.9289682539682538 fsum 2.9289682539682538 exact->binary64 2.9289682539682538 all_equal=True exact denominator bits 12
m=100: forward 5.187377517639621 backward 5.1873775176396215 fsum 5.187377517639621 exact->binary64 5.187377517639621 all_equal=False exact denominator bits 132
m=1000: forward 7.485470860550343 backward 7.485470860550341 fsum 7.485470860550345 exact->binary64 7.485470860550345 all_equal=False exact denominator bits 1438
m=100000: forward 12.090146129863335 backward 12.090146129863408 fsum 12.090146129863427 exact->binary64 None all_equal=False
=== exact vs float adjusted p: random families; count binary64 adjusted values that are not the correctly rounded exact value; decision flips at alpha=1/20
holm: families 400 values 4438 float!=correctly-rounded-exact 0 decision flips vs (exact, alpha=1/20) 0 first mismatch None
hochberg: families 400 values 4339 float!=correctly-rounded-exact 0 decision flips vs (exact, alpha=1/20) 0 first mismatch None
bh: families 400 values 4490 float!=correctly-rounded-exact 785 decision flips vs (exact, alpha=1/20) 0 first mismatch ('bh', 4, [0.839349642481245, 4.00040650800873e-31, 4.630561638616486e-19, 4.984384911793318e-07], '3ea64cbd1c8612da', '3ea64cbd1c8612db')
bonferroni: families 400 values 3936 float!=correctly-rounded-exact 0 decision flips vs (exact, alpha=1/20) 0 first mismatch None
sidak: families 400 values 4291 float!=correctly-rounded-exact 2940 decision flips vs (exact, alpha=1/20) 0 first mismatch ('sidak', 50, [0.12396730410292833, 4.94384185035104e-13, 2.365436165377884e-91, 2.372151793397172e-31, 7.278309704294607e-07, 0.0004988917898067763, 0.19096124906377598, 0.5540629610688338, 0.1512906492343582, 0.2963377452667963, 0.08544099019954299, 0.2765901464929084, 0.33344283804180086, 0.3202858439488839, 1.3596321187352964e-302, 5.065606112624568e-13, 7.131e-320, 3.4350948258078493e-07, 0.4468353796643356, 0.0005965042467930503, 1.294272709825623e-303, 8.381561326774155e-13, 0.9589388593458931, 6.2549529705484875e-21, 3.503e-320, 0.0043703714785645435, 0.26481252213695916, 5e-324, 0.22365323817300725, 0.09219677362148071, 0.0006099303981210629, 0.7223958328517123, 0.03075161065221635, 4.634074083655782e-32, 0.004255009143119468, 0.0747033806928799, 0.17553470987892328, 0.04149315014894234, 0.9488228303435761, 5.109e-320, 6.959e-320, 6.43808294744807e-302, 2.8295e-320, 2.362212215735976e-302, 0.9635411430298039, 1.1314519888086425e-302, 0.0, 0.1320813657033969, 3.460727298909951e-05, 0.7137305646130825], '3dbb2dd000000000', '3dbb2dd6bec41db8')
=== tie and permutation invariance (exhaustive small families, exact route)
invariance/tie/order checks passed: True permutations checked 70152
=== monotonicity: raising one raw p never lowers any adjusted p (random, exact)
monotonicity passed: True
=== adjusted p >= raw p and <= 1 (clipping) ; m = 1 reduces to raw p
holm: all >= raw True all <= 1 True m=1 identity True  Bonferroni clip example m=6,p=0.3 -> 1
hochberg: all >= raw True all <= 1 True m=1 identity True  Bonferroni clip example m=6,p=0.3 -> 5404319552844595/18014398509481984
bh: all >= raw True all <= 1 True m=1 identity True  Bonferroni clip example m=6,p=0.3 -> 5404319552844595/18014398509481984
by: all >= raw True all <= 1 True m=1 identity True  Bonferroni clip example m=6,p=0.3 -> 52962331617877031/72057594037927936
bonf: all >= raw True all <= 1 True m=1 identity True  Bonferroni clip example m=6,p=0.3 -> 1
sidak: all >= raw True all <= 1 True m=1 identity True  Bonferroni clip example m=6,p=0.3 -> 30155044754109614531158979044860749799542312220321600790003822391475830018530183235285170851258055/34175792574734561318320347298712833833643272357706444319152665725155515612490248800367393390985216
hommel: all >= raw True all <= 1 True m=1 identity True  Bonferroni clip example m=6,p=0.3 -> 5404319552844595/18014398509481984
=== closed testing (Bonferroni local tests) equals Holm on rejections (exact, exhaustive m<=5)
closed-Bonferroni == Holm: True
=== Hommel exponential definition vs standard O(m^2) algorithm on random small families
Hommel definition == standard algorithm: True
=== resource ceilings: closed testing 2^m subsets; Hommel exponential; sort cost
closed testing m=10: subsets 1023 time 0.01s
closed testing m=16: subsets 65535 time 0.65s
closed testing m=20: subsets 1048575 time 12.38s
exact Holm m=100000: 1.87s
exact Hommel O(m^2) m=2000: 10.27s
=== malformed inputs: structured refusal without exception leakage
[] -> {'refusal': 'EMPTY_OR_NON_ARRAY_FAMILY'}
'abc' -> {'refusal': 'EMPTY_OR_NON_ARRAY_FAMILY'}
[0.1, nan] -> {'refusal': 'NON_FINITE_P'}
[inf] -> {'refusal': 'NON_FINITE_P'}
[-0.0, 0.5] -> {'refusal': 'NEGATIVE_ZERO_P'}
[1.0000000000000002] -> {'refusal': 'P_OUTSIDE_UNIT_INTERVAL'}
[-1e-300] -> {'refusal': 'P_OUTSIDE_UNIT_INTERVAL'}
[0.0, 0.0, 1.0] -> {'adjusted': [0.0, 0.0, 1.0]}
[0.2, 1] -> {'refusal': 'NON_BINARY64_MEMBER'}
[5e-324, 0.5, 0.5] -> {'adjusted': [1.5e-323, 1.0, 1.0]}
=== stepwise trace digest: canonical JSON of ordered members, exact thresholds, decisions; tamper detection
trace {"alpha":"1/20","decisions":[true,false,false,false,false],"ordered_members":[0,1,2,3,4],"procedure":"holm-bonferroni-stepdown","raw_p_bits":["3f50624dd2f1a9fc","3f947ae147ae147b","3f947ae147ae147b","3fa47ae147ae147b","3fd3333333333333"],"stop_index":1,"thresholds":["1/100","1/80","1/60","1/40","1/20"],"tie_rule":"stable-by-input-index"}
digest 9bb7a59c82f0462a3f9159d49ecc26cdff9aa942aa10faa01cb8b83fede8996f
verify original: OK
tamper decision, keep digest -> DIGEST_MISMATCH
tamper decision, coherent re-digest -> DECISION_MISMATCH
tamper threshold, coherent re-digest -> THRESHOLD_MISMATCH
reorder p bits, coherent re-digest -> ORDER_VIOLATION
python 3.12.13
```

### B.7 Probe E — stochastic replay and intervals output (`probe_e.out`, SHA-256 `b0b280ce636f4eeec8f0342a2d13a60684e143997ef0d2259eb8b4542e50ff29`)

```text
=== Part 1: stochastic candidate replay / cross-seed
seed=1 B=2000: p=104/2001 (0.05197) count=103 (0.2s); replay identical: True
first four 64-bit outputs for seed 1 (replay identity): ['0xb3f2af6d0fc710c5', '0x853b559647364cea', '0x92f89756082a4514', '0x642e1c7bc266a3a7'] sha256 of 4x8 bytes fcb2f40e64e93a34
--- cross-seed decisions at alpha = 1/20 (same data, same B)
[(1, 0.06234413965087282, False), (2, 0.057356608478802994, False), (3, 0.06982543640897755, False), (4, 0.04987531172069826, True), (5, 0.057356608478802994, False), (6, 0.04738154613466334, True), (7, 0.04239401496259352, True), (8, 0.05236907730673317, False), (9, 0.04987531172069826, True), (10, 0.04738154613466334, True), (11, 0.04987531172069826, True), (12, 0.05236907730673317, False), (13, 0.06234413965087282, False), (14, 0.08478802992518704, False), (15, 0.06483790523690773, False), (16, 0.04987531172069826, True), (17, 0.04987531172069826, True), (18, 0.04738154613466334, True), (19, 0.05486284289276808, False), (20, 0.06483790523690773, False)]
decisions differ across seeds: True  min/max p: 0.04239401496259352 0.08478802992518704
--- bit-stream-to-permutation mapping is a versioned choice: same seed, two mappings
rejection [3, 10, 11, 7, 1, 9, 5, 0, 4, 8, 2, 6]
float_floor [2, 10, 4, 1, 5, 0, 6, 7, 9, 11, 3, 8]
adjusted p under the two mappings: 0.04239401496259352 0.06234413965087282 equal: False
--- exhaustive (deterministic) alternative: complete enumeration is exact but combinatorial
n=12 (4,4,4): distinct labelings 34650; n=30 (10,10,10): 5550996791340; n=60 (20,20,20): 5.778e+26
exact enumeration: p = 1830/34650 = 0.05281 (2.1s); permutation estimates above scatter around it
=== Part 2: simultaneous-interval endpoints in binary64
--- (a) input algebra: mean differences at large magnitude lose the difference entirely
1e16+1 -> 1e+16  1e16+3 -> 1.0000000000000004e+16  binary64 difference 4.0  exact decimal difference 2
--- (b) endpoint collapse: half-width below the ULP of the estimate
estimate 1e+16 half-width 0.4: L=1e+16 U=1e+16 collapsed(L==U)=True
estimate 12345.678 half-width 5e-13: L=12345.678 U=12345.678 width in ULPs=0.0
--- (c) duality: 0 in [L,U] versus |diff| <= half-width; exact rational statistic versus rounded half-width
exact squared statistic 9938380705789317246726257466409/1267650600228229401496703205376 = 7.839999999999999
binary64: hw=0.7 L=0.0 U=1.4  reject by interval (0 not in [L,U]) = False  reject by |diff|>hw = False  exact rational (diff > q se with q=14/5) = False
diff=0.7: exact diff>q*se: False; binary64 |diff|>hw: False; interval excludes 0: False; L bits 0000000000000000
diff=0.6999999999999998: exact diff>q*se: False; binary64 |diff|>hw: False; interval excludes 0: False; L bits bca0000000000000
diff=0.7000000000000001: exact diff>q*se: True; binary64 |diff|>hw: True; interval excludes 0: True; L bits 3ca0000000000000
--- (d) enclosure-refinement decision for an irrational critical constant: stat^2 versus q^2 ball
prec=30: stat2 - q^2 = [+/- 1.87e-8] -> UNDECIDED at this precision -> refine or refuse
prec=53: stat2 - q^2 = [+/- 1.34e-15] -> UNDECIDED at this precision -> refine or refuse
prec=80: stat2 - q^2 = [+/- 9.93e-24] -> UNDECIDED at this precision -> refine or refuse
prec=100: stat2 - q^2 = [+/- 9.47e-30] -> UNDECIDED at this precision -> refine or refuse
prec=128: stat2 - q^2 = [+/- 3.53e-38] -> UNDECIDED at this precision -> refine or refuse
prec=160: stat2 - q^2 = [9.96120e-39 +/- 1.26e-45] -> reject (stat > q)
prec=200: stat2 - q^2 = [9.96120e-39 +/- 1.26e-45] -> reject (stat > q)
--- (c2) random search for duality flips: exact-rational decision on binary64 inputs vs binary64 evaluation of hw = q*se
flips 33458 of 200000; first witness {'q': 3.1900414239523407, 'se': 1.735537816366321, 'diff': 5.536437527044355, 'diff_bits': '4016254fe10c02af', 'hw_f': 5.536437527044355, 'exact_reject': True, 'float_reject': False, 'interval_excludes_zero': False}
--- (e) overflow refusal: means near DBL_MAX
difference of extreme means: inf inf -> True
python 3.12.13
```

### B.8 Probe F — quantile certificates and resources output (`probe_f.out`, SHA-256 `675dd4ad7b2a92b1dc994fca8f132aa1a534a4ae862619e3552c846a481bd023`)

```text
=== F upper 0.05 quantiles: mpmath root, binary64 nearest, rigorous Arb sign bracket at the two neighbouring cells
F(2,12) q0.05 = 3.885293834652394214821556 -> 3.885293834652394 (400f1514ef1975b0); tail(lo)-0.05 [1.40507e-17 +/- 3.61e-23] tail(hi)-0.05 [-1.29039e-17 +/- 2.62e-23] certified_bracket=True
   exact-rational (even df) route confirms bracket: True
F(3,20) q0.05 = 3.098391212140780099331672 -> 3.09839121214078 (4008c98154f2de1a); tail(lo)-0.05 [2.79101e-17 +/- 4.13e-23] tail(hi)-0.05 [-1.37877e-17 +/- 3.24e-23] certified_bracket=True
F(4,7) q0.05 = 4.12031172689763469329744 -> 4.120311726897635 (40107b32ff51670a); tail(lo)-0.05 [2.71305e-17 +/- 4.60e-23] tail(hi)-0.05 [-2.12575e-17 +/- 3.95e-23] certified_bracket=True
F(2,1000) q0.05 = 3.004724635577848772591231 -> 3.004724635577849 (400809ad11da56cb); tail(lo)-0.05 [1.23634e-17 +/- 9.35e-24] tail(hi)-0.05 [-3.17803e-17 +/- 4.87e-23] certified_bracket=True
   exact-rational (even df) route confirms bracket: True
F(9,90) q0.05 = 1.985594963730501166899723 -> 1.9855949637305013 (3fffc4ff3985326b); tail(lo)-0.05 [1.59615e-17 +/- 1.71e-23] tail(hi)-0.05 [-3.95129e-17 +/- 1.06e-23] certified_bracket=True
F(2,73/10) q0.05 = 4.643530356151693349779196 -> 4.643530356151693 (401292f99f269e78); tail(lo)-0.05 [2.32008e-17 +/- 2.02e-23] tail(hi)-0.05 [-1.58881e-17 +/- 2.73e-24] certified_bracket=True
=== Scheffe constant sqrt((k-1) F_{0.05; k-1, nu}): enclosure and binary64 rounding cell
k=3 nu=12: F crit 3.8852938346523942148 Scheffe S 2.7875773835545424065 binary64 2.7875773835545425; S^2 = (k-1)F is the exact comparison surface (avoid the square root: compare contrast^2/(var) against (k-1)F enclosure)
k=5 nu=40: F crit 2.6059749491238674418 Scheffe S 3.2286064790394430736 binary64 3.228606479039443; S^2 = (k-1)F is the exact comparison surface (avoid the square root: compare contrast^2/(var) against (k-1)F enclosure)
=== t two-sided 0.05 critical value certificate reuse: df=10, bracket via incomplete beta ball
   t=2.2281388519862744 (4001d33a7661d303): P-0.05 = [3.19628e-17 +/- 3.17e-23] sign +
   t=2.228138851986275 (4001d33a7661d304): P-0.05 = [-5.68260e-18 +/- 2.92e-24] sign -
   t=2.2281388519862753 (4001d33a7661d305): P-0.05 = [-4.33280e-17 +/- 2.58e-23] sign -
=== resource exhaustion of the rigorous integrator: eval_limit / depth_limit produce wide balls, no exception
eval_limit=10: [+/- 1.45e+12] finite=True radius_small=False
eval_limit=50: [+/- 7.21e+11] finite=True radius_small=False
eval_limit=200: [2.50662827463 +/- 1.01e-12] finite=True radius_small=True
eval_limit=2000: [2.50662827463 +/- 1.01e-12] finite=True radius_small=True
=== malformed parameters: df <= 0, non-finite f, negative f -> Arb/mpmath behaviour (must be pre-checked; not relied upon)
(0,5,2.0) -> [+/- 4.55e-60]
(2,0,2.0) -> 1.0000000
(2,5,-1.0) -> [3.5860957 +/- 9.07e-9]
(2,5,nan) -> skipped-non-finite (Fraction refuses)
(2,5,inf) -> skipped-non-finite (Fraction refuses)
(-2,5,1.0) -> 0
=== integer-df exact route cost: both-even df, denominators; odd df needs enclosure
F(2,1000) f=3.0: exact tail denominator bits 4488 time 0.000s value 0.05023537401574282
F(10,2000) f=1.5: exact tail denominator bits 8686 time 0.001s value 0.13301689582607396
F(50,5000) f=1.2: exact tail denominator bits 142200 time 0.924s value 0.15876795897766818
versions mpmath 1.4.1 python-flint 0.9.0
```
