# FND-1 Multiplicity Primary-Text Closure Result

## 0. Investigation metadata

| Item                                                      | Response                                                                                                         |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Commission                                                | `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-primary-text-closure-commission.md`         |
| Commission commit SHA (fixed)                             | `74ca285111de2a4cc4f87d264b94f9745fb0ffbb`                                                                       |
| Investigator role                                         | Independent primary-text investigator                                                                            |
| Investigation date                                        | 2026-08-30                                                                                                       |
| Reconciled FND-1 result read for hold identification only | `evidence/research/foundation-identity/fnd-1/2026-08-30-independent-research-result.md` at commit `74ca285…ffbb` |
| Holds addressed                                           | `FND1-H01`, `FND1-H02`, `FND1-H03` (no other FND-1 finding reopened)                                             |
| Repository operation                                      | None (no commit, push, or branch created by the investigator)                                                    |
| Public attribution                                        | Independent primary-text investigator                                                                            |
| Received report-body SHA-256 before repository formatting | `a1b686f76aa6a37e322d3346b4dc8be0914af9147f39e61e527825ace9b4b314`                                               |

## 1. Input and access checks

### 1.1 Commission and hold intake

- Commission text: fully retrieved at the fixed commit; instructions read
  verbatim.
- Reconciled FND-1 result: retrieved at the fixed commit; used only to identify
  the three holds.
  - `FND1-H01`: direct Holm (1979) inspection for control and dependence
    conditions; blocks formal Holm semantics and support.
  - `FND1-H02`: direct Benjamini-Hochberg (1995) theorem inspection; blocks
    formal BH semantics and support.
  - `FND1-H03`: direct Dunnett (1955) and Tukey (1949) original-paper inspection;
    blocks named many-to-one and all-pairs semantics.
- No other prior investigator report is used as evidence in this pass,
  consistent with the commission's exclusion.

### 1.2 Source-access outcome

The commission mandates inspection of the complete original papers, not
abstracts, reviews, textbooks, later corrections, extensions, or regulatory
summaries. Attempts made in this session:

| Paper                     | Canonical location attempted                          | Alternate location attempted                                                     | Result                    |
| ------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------- |
| Holm (1979)               | JSTOR 4615733                                         | Scribd (`475646736`); academia.edu (`77036515`); Chalmers and Gothenburg mirrors | Original PDF `NOT_OPENED` |
| Benjamini-Hochberg (1995) | Wiley DOI `10.1111/j.2517-6161.1995.tb02031.x`        | jcu.cz mirror; tau.ac.il mirrors (`fdrame.pdf`, `KBY -- adaptive FDR.pdf`)       | Original PDF `NOT_OPENED` |
| Dunnett (1955)            | Taylor & Francis DOI `10.1080/01621459.1955.10501294` | Scribd mirrors (`766961687`, `881543691`)                                        | Original PDF `NOT_OPENED` |
| Tukey (1949)              | JSTOR DOI `10.2307/3001913`                           | Semantic Scholar; PMC secondary review                                           | Original PDF `NOT_OPENED` |

Because none of the four original papers could be opened in this session, the
commission's precondition for closure—“all four original texts were inspected
and every decision-bearing claim has a pinpoint”—is not met.

## 2. Executive disposition

| Hold                                     | Disposition | Rationale                                                                                                                                                                        |
| ---------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FND1-H01` (Holm 1979)                   | `KEEP_OPEN` | Original text not inspected; procedure form, theorem structure, and dependence conditions remain `NOT_VERIFIABLE` at the primary-text level.                                     |
| `FND1-H02` (Benjamini-Hochberg 1995)     | `KEEP_OPEN` | Original text not inspected; the paper's definitions, exact step-up rule, and Theorem 1 bound and independence conditions remain `NOT_VERIFIABLE` at the primary-text level.     |
| `FND1-H03` (Dunnett 1955 and Tukey 1949) | `KEEP_OPEN` | Neither original text inspected; family scope, exact distributional assumptions, balance requirement, and sidedness treatment remain `NOT_VERIFIABLE` at the primary-text level. |

No method, default, identifier, field, schema, refusal code, public check, API,
implementation, or release change is selected by this report.

## 3. Original-text source register

| Source ID | Full citation                                                                                                                                                 | Stable URL or DOI                        | Host attempted                        | Access date | Bibliographic locator                 | Access status |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------- | ----------- | ------------------------------------- | ------------- |
| P-01      | Holm, S. (1979), “A Simple Sequentially Rejective Multiple Test Procedure,” _Scandinavian Journal of Statistics_ 6(2), 65–70                                  | JSTOR 4615733                            | jstor.org                             | 2026-08-30  | Article volume 6(2), pp. 65–70        | `NOT_OPENED`  |
| P-02      | Benjamini, Y. and Hochberg, Y. (1995), “Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing,” _JRSS-B_ 57(1), 289–300 | DOI `10.1111/j.2517-6161.1995.tb02031.x` | onlinelibrary.wiley.com; DOI resolver | 2026-08-30  | Article volume 57(1), pp. 289–300     | `NOT_OPENED`  |
| P-03      | Dunnett, C. W. (1955), “A Multiple Comparison Procedure for Comparing Several Treatments with a Control,” _JASA_ 50(272), 1096–1121                           | DOI `10.1080/01621459.1955.10501294`     | tandfonline.com; DOI resolver         | 2026-08-30  | Article volume 50(272), pp. 1096–1121 | `NOT_OPENED`  |
| P-04      | Tukey, J. W. (1949), “Comparing Individual Means in the Analysis of Variance,” _Biometrics_ 5(2), 99–114                                                      | DOI `10.2307/3001913`                    | jstor.org; DOI resolver               | 2026-08-30  | Article volume 5(2), pp. 99–114       | `NOT_OPENED`  |

No verbatim quotation from any of the four papers is used in this report; the
25-word-per-paper cap is therefore satisfied at zero.

## 4. Atomic claim ledger

The commission's four claim families are enumerated here so that the ledger
records what would have to be established from the original text. Because no
original text was inspected in this session, every decision-bearing atomic
claim below carries status `NOT_VERIFIABLE` at the primary-text level.
Regulatory-summary corroborations that appeared in earlier reports are
explicitly not treated as evidence here.

| Claim ID | Atomic claim (to be verified only from the original paper)                                                                                                                                                    | Status           | Pinpoint                                                           | Notes                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| PT-H01-a | Holm (1979) defines a step-down sequentially rejective procedure ordering p-values from smallest to largest and using critical values of the form α/(m−i+1).                                                  | `NOT_VERIFIABLE` | Holm (1979) pp. 65–70 (paper not opened)                           | Common secondary description; must be confirmed from the paper's procedure statement.       |
| PT-H01-b | Holm (1979) establishes strong, rather than merely weak, family-wise error-rate control.                                                                                                                      | `NOT_VERIFIABLE` | Holm (1979) theorem statement (paper not opened)                   | Requires the paper's theorem and proof.                                                     |
| PT-H01-c | Holm (1979) imposes no assumption on the joint dependence structure of the test statistics or p-values.                                                                                                       | `NOT_VERIFIABLE` | Holm (1979) statement of assumptions (paper not opened)            | Requires the paper's condition list.                                                        |
| PT-BH-a  | Benjamini-Hochberg (1995) define V (false rejections), R (total rejections), Q = V/R, with Q defined as zero when R = 0.                                                                                      | `NOT_VERIFIABLE` | Benjamini-Hochberg (1995) Section 1 (paper not opened)             | The R = 0 convention is central to the FDR definition and must be confirmed from the paper. |
| PT-BH-b  | Benjamini-Hochberg (1995) define FDR = E[Q] = E[V/R \| R > 0] · P(R > 0).                                                                                                                                     | `NOT_VERIFIABLE` | Benjamini-Hochberg (1995) Section 1 (paper not opened)             | The exact wording and equivalence must be confirmed from the paper.                         |
| PT-BH-c  | Benjamini-Hochberg (1995) define the step-up procedure: reject H_(1),…,H_(k*) where k* = max{k : p_(k) ≤ (k/m)q*}; an empty set means reject none.                                                            | `NOT_VERIFIABLE` | Benjamini-Hochberg (1995) Section 2 (paper not opened)             | The exact step-up rule and empty-set case must be confirmed from the paper.                 |
| PT-BH-d  | Benjamini-Hochberg (1995) Theorem 1 establishes FDR ≤ (m0/m)q* under independent test statistics, for any configuration of true and false nulls.                                                              | `NOT_VERIFIABLE` | Benjamini-Hochberg (1995) Theorem 1 (paper not opened)             | The theorem's exact statement and independence assumption must be read directly.            |
| PT-BH-e  | Claims of control under positive regression dependence, arbitrary dependence, or later adaptive procedures are not proven in the 1995 paper and must be attributed to later separate sources.                 | `NOT_VERIFIABLE` | Benjamini-Hochberg (1995), whole paper (paper not opened)          | Confirming that a claim is absent requires reading the paper.                               |
| PT-Dun-a | Dunnett (1955) protects the many-to-one family of comparisons between each of k treatments and a shared control.                                                                                              | `NOT_VERIFIABLE` | Dunnett (1955) Sections 1–2 (paper not opened)                     | The paper's scope statement must be read.                                                   |
| PT-Dun-b | Dunnett (1955) establishes a simultaneous confidence guarantee at joint level 1−α over the many-to-one comparisons under the paper's assumptions.                                                             | `NOT_VERIFIABLE` | Dunnett (1955) theorem statement (paper not opened)                | Requires the paper's theorem.                                                               |
| PT-Dun-c | Dunnett (1955) assumes independent normal observations with a common variance and derives critical values from a multivariate t distribution with a correlation matrix determined by the sample-size balance. | `NOT_VERIFIABLE` | Dunnett (1955) distributional section (paper not opened)           | Requires the paper's derivation.                                                            |
| PT-Dun-d | Dunnett (1955) treats both one-sided and two-sided cases; treatment of balanced and unbalanced sample sizes is stated in the paper.                                                                           | `NOT_VERIFIABLE` | Dunnett (1955) sections on sidedness and design (paper not opened) | Requires the paper's statement.                                                             |
| PT-Tuk-a | Tukey (1949) addresses the all-pairs family of comparisons among group means in a one-way analysis of variance.                                                                                               | `NOT_VERIFIABLE` | Tukey (1949) Section 1 (paper not opened)                          | Requires the paper's scope.                                                                 |
| PT-Tuk-b | Tukey (1949) establishes an exact simultaneous confidence coefficient of 1−α over all pairwise comparisons when sample sizes are equal, using the studentized range distribution.                             | `NOT_VERIFIABLE` | Tukey (1949) theorem statement (paper not opened)                  | Requires the paper's theorem.                                                               |
| PT-Tuk-c | Tukey (1949) assumes independent normal observations with a common variance; the studentized range distribution is the exact reference distribution.                                                          | `NOT_VERIFIABLE` | Tukey (1949) assumptions section (paper not opened)                | Requires the paper's assumptions.                                                           |
| PT-Tuk-d | Extension to unequal sample sizes (Tukey-Kramer, Kramer 1956) is a separate later source and is not part of the 1949 paper's guarantee.                                                                       | `NOT_VERIFIABLE` | Tukey (1949), whole paper (paper not opened)                       | Confirming an absence requires reading the paper.                                           |

## 5. Paper-by-paper findings

### 5.1 Holm (1979)

- Question 1 (procedure): `NOT_VERIFIABLE`. The paper was not opened in this
  session; the ordered p-value step-down structure with critical values of the
  form α/(m−i+1) is widely repeated in secondary sources, but the commission
  requires the primary text.
- Question 2 (weak vs strong FWER control): `NOT_VERIFIABLE`. The paper's
  theorem statement was not read.
- Question 3 (dependence assumptions): `NOT_VERIFIABLE`. The paper's assumption
  list was not read.
- Question 4 (which theorem or proof supports each answer): `NOT_VERIFIABLE`.
  Theorem and proof pinpoints require the primary text.

### 5.2 Benjamini-Hochberg (1995)

- Question 1 (definitions of V, R, Q, FDR, and the R = 0 case):
  `NOT_VERIFIABLE`. Every element requires the original definitional paragraph.
- Question 2 (step-up procedure): `NOT_VERIFIABLE`. The paper's statement,
  including the empty-set rejection case, was not read.
- Question 3 (original theorem and its assumptions): `NOT_VERIFIABLE`. Theorem 1
  and its independence condition require the primary text.
- Question 4 (claims that come only from later work): `NOT_VERIFIABLE`.
  Confirming what is not claimed in the 1995 paper, such as positive regression
  dependence, arbitrary dependence, or adaptive versions, requires reading the
  1995 paper itself; without that, the negative statement cannot be made
  responsibly.

### 5.3 Dunnett (1955)

- Question 1 (comparison family): `NOT_VERIFIABLE` at the primary-text level.
  The many-to-one framing is standard secondary usage, but the paper's scope
  must be read.
- Question 2 (simultaneous guarantee): `NOT_VERIFIABLE`. The joint
  confidence-coefficient theorem was not read.
- Question 3 (assumptions: distribution, variance, sample size, balance, and
  sidedness): `NOT_VERIFIABLE`. Each must be read from the paper.
- Question 4 (exact distribution or critical-value construction):
  `NOT_VERIFIABLE`. The multivariate t derivation and its correlation structure
  must be read directly.

### 5.4 Tukey (1949)

- Question 1 (comparison family): `NOT_VERIFIABLE` at the primary-text level.
  The all-pairs framing is standard secondary usage but must be confirmed from
  the paper.
- Question 2 (simultaneous guarantee): `NOT_VERIFIABLE`. The exact 1−α joint
  confidence claim and its scope over pairwise comparisons must be read from the
  paper.
- Question 3 (assumptions: variance, sample size, balance, and sidedness):
  `NOT_VERIFIABLE`. In particular, whether the 1949 method requires equal sample
  sizes, as distinct from the later Tukey-Kramer extension, must be documented
  from the paper itself.
- Question 4 (Tukey 1949 vs. later Tukey-Kramer variants): `NOT_VERIFIABLE` from
  primary text. Any negative statement that the 1949 paper does not extend to
  unequal sample sizes requires reading the paper.

## 6. Cross-source boundary findings

Because no primary text was inspected, the cross-source boundary can only be
restated as what would have to be checked, not concluded. The narrow items
requested by the commission are recorded below with primary-text status.

- Whether many-to-one, all-pairs, and sequential procedures define different
  protected objects or guarantee boundaries.
  - Primary-text status: `NOT_VERIFIABLE`. Each of Dunnett (1955), Tukey (1949),
    and Holm (1979) would have to be inspected for its stated family and
    guarantee scope before the boundary can be concluded from primary text.
- Whether FWER and FDR remain different quantities for the same hypothesis set.
  - Primary-text status: `NOT_VERIFIABLE`. Benjamini-Hochberg (1995) would have
    to be inspected for the FDR definition; the FWER side already has multiple
    primary references but is outside this commission's four-paper scope.
- Which original-paper conditions must be part of any future procedure identity.
  - Primary-text status: `NOT_VERIFIABLE`. This inventory can only be built from
    the primary texts, including dependence conditions in Holm and BH and
    normality, common-variance, balance, and sidedness conditions in Dunnett and
    Tukey.
- Which claims from the prior reconciliation must remain held.
  - All three holds (`FND1-H01`, `FND1-H02`, and `FND1-H03`) must remain held,
    because none of the four papers was inspected in this session.

No method, default, identifier, field, schema, refusal code, public check, API,
implementation, or release change is selected here.

## 7. Hold closure matrix

| Hold       | Question the hold poses                                                                        | Primary text needed                                                                | Inspected in this pass? | Disposition |
| ---------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `FND1-H01` | What control and dependence conditions does Holm (1979) establish?                             | Holm (1979), _Scandinavian Journal of Statistics_ 6(2), 65–70                      | No                      | `KEEP_OPEN` |
| `FND1-H02` | What does the original Benjamini-Hochberg (1995) theorem establish and under what assumptions? | Benjamini-Hochberg (1995), _JRSS-B_ 57(1), 289–300                                 | No                      | `KEEP_OPEN` |
| `FND1-H03` | What are the named many-to-one and all-pairs semantics as stated in the original papers?       | Dunnett (1955), _JASA_ 50(272), 1096–1121; Tukey (1949), _Biometrics_ 5(2), 99–114 | No, neither             | `KEEP_OPEN` |

## 8. Falsification and overclaim checks

- Would any decision-bearing claim in this report overclaim the primary-text
  evidence?
  - No. Every decision-bearing atomic claim in Section 4 is marked
    `NOT_VERIFIABLE`, and no fresh substantive claim about the four papers is
    asserted from primary text.
- Are any secondary or regulatory sources used as substitutes for primary text?
  - No. Secondary or regulatory descriptions of these procedures that appeared
    in the earlier reconciled FND-1 result were read only to identify the three
    holds. They are not used here as evidence for any Section 4 or Section 5
    statement.
- Are later corrections, generalizations, or extensions attributed
  retroactively to the original 1949, 1955, 1979, or 1995 papers?
  - No. The commission's rule that a later correction, extension, or
    generalization is a separate source is respected by refusing to assert
    primary-text claims from later or secondary sources.
- Is any procedure, default, identifier, field, schema, refusal code, public
  check, API, implementation, or release change selected here?
  - No.
- Is attribution limited to the investigator role and research provenance?
  - Yes. Attribution is “independent primary-text investigator.”

## 9. Remaining holds and next evidence

| Hold       | Next evidence required                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FND1-H01` | Open and inspect the complete original text of Holm (1979) at JSTOR 4615733 or a library-authenticated copy. Record the exact procedure statement, the theorem establishing strong or weak FWER control, and every dependence-related assumption stated in the paper, with page or section pinpoints.                                                                                                                                                                                                                                                                                     |
| `FND1-H02` | Open and inspect the complete original text of Benjamini-Hochberg (1995) at DOI `10.1111/j.2517-6161.1995.tb02031.x` or a library-authenticated copy. Record the exact definitions of V, R, Q, and FDR, including the R = 0 case, the exact step-up procedure, and Theorem 1 with its independence assumption and bound, with page or section pinpoints. Confirm what is not claimed in the 1995 paper before attributing any later claim to it.                                                                                                                                          |
| `FND1-H03` | Open and inspect the complete original texts of Dunnett (1955) at DOI `10.1080/01621459.1955.10501294` and Tukey (1949) at DOI `10.2307/3001913`, or library-authenticated copies. Record family scope, simultaneous guarantee, distributional, variance, sample-size, balance, and sidedness assumptions, and the exact reference distribution or critical-value construction, with page or section pinpoints. Confirm that unequal-sample-size extensions, including Tukey-Kramer and later Dunnett extensions, are separate later sources rather than part of the original guarantees. |

Any subsequent closure pass should record the access date, host used, and page,
theorem, or equation pinpoint per claim, and should include short attributed
quotations, under 25 words per paper, where they materially aid identification
of the exact result.

## 10. Public-artifact self-check

- [x] The commission was read at the exact commit
      `74ca285111de2a4cc4f87d264b94f9745fb0ffbb` and its instructions were
      followed literally.
- [x] The reconciled FND-1 result was read only to identify holds; no earlier
      investigator report was treated as evidence.
- [x] All four target papers are addressed by paper name, DOI or JSTOR
      identifier, and question set.
- [x] Every atomic claim about the four papers uses one of `VERIFIED_DIRECT`,
      `CROSS_SOURCE_INFERENCE`, `NOT_VERIFIABLE`, or `CONTRADICTED`; in this
      pass, every such claim is `NOT_VERIFIABLE` because no primary text was
      opened.
- [x] Each hold receives exactly one disposition from `CLOSE`,
      `NARROW_AND_CLOSE`, or `KEEP_OPEN`.
- [x] No verbatim quotation from any target paper is included; the
      25-word-per-paper cap is therefore satisfied at zero.
- [x] No later correction, extension, generalization, textbook, review,
      regulatory summary, or implementation is used as evidence for a
      primary-text claim.
- [x] No Protocol adoption, method default, identifier, field, schema, refusal
      code, public check, API, implementation, or release change is selected.
- [x] No confidential material, credential, internal URL, non-public
      third-party artifact, or active-negotiation detail is present.
- [x] Attribution records only the investigator role and research provenance.
- [x] Provenance is preserved through the commission commit SHA, per-paper
      stable identifiers, access date (2026-08-30), and the received report-body
      hash recorded at repository intake.
- [x] Because not all four original texts were inspected and not every
      decision-bearing claim has a pinpoint, the closure-review readiness
      precondition is not satisfied.

---

NOT READY FOR FND-1 MULTIPLICITY CLOSURE REVIEW - NOT PROTOCOL ADOPTION
