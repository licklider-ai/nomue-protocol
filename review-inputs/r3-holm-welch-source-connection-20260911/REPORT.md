# R3 Holm and Welch primary-source connection review

## Status and boundary

**Result: PASS for the missing bounded source-review connection.** This is an
informative, separate-model primary-source review for the ordinary unweighted
Holm procedure and Welch's 1951 several-means procedure. It does not adopt a
method, authorize implementation, change any gate state, repeal the accepted
`FND1-H01` disposition, or decide whether `OMN-02` may regain an enabling use
that the opening record excludes. `OMN-02` remains an `R3-CAND` item in the
unchanged 49-item catalogue; the unresolved reentry boundary concerns positive
opening claims, not catalogue membership.

The review session was requested and run with the `gpt-5.6-sol` model
configuration. That is a configuration disclosure, not authenticated model-build
telemetry. No human review, external-institution review, or prior non-involvement
beyond this bounded session is claimed. The reviewed repository base was
`dedd26a3e0655001b67e40ccfb741e43ecb07beb`. No additional source was used.

## Source custody and inspection

Both supplied files remained outside the repository. The hashes below are of the
exact received bytes and identify the artifacts inspected; they are not
publisher-canonical identifiers.

| Source                                                                                 | Received filename and SHA-256                                                                                   | Pagination and inspection                                                                                                                                           |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sture Holm, _A Simple Sequentially Rejective Multiple Test Procedure_, 1979            | `Holm-SimpleSequentiallyRejective-1979.pdf`; `43a5a10279f8bf1752a3e8d4a8407f9717579f8f903be4bcd62d969e82d573af` | 7 PDF pages: PDF 1 is the JSTOR cover; PDF 2-7 are printed pp. 65-70. The full file was read. Printed pp. 65-68 (PDF 2-5) were also visually inspected.             |
| B. L. Welch, _On the Comparison of Several Mean Values: An Alternative Approach_, 1951 | `07_Welch_1951.pdf`; `f86986a4850cc2c161f41a401db87460772405281677e9cce702af4321dca30d`                         | 8 PDF pages: PDF 1 is the JSTOR cover; PDF 2-8 are printed pp. 330-336. The full file was read. Printed pp. 330, 334-335 (PDF 2, 6-7) were also visually inspected. |

The prior accepted Holm primary report and steward disposition were read at the
base commit. The later applicability review at
`a5213b446df0ec1de09d557c0c6933320f470452` was read as context. Those records
correctly preserve the accepted `FND1-H01` content while observing that legacy
records omit a model identity and therefore cannot, by themselves, prove a past
distinct-model pass. This review supplies a new bounded pass; it does not rewrite
the historical provenance.

The reusable connection is therefore explicit and limited:

| Step                 | Record or artifact                                                                                   | Role in this connection                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Primary source       | Supplied Holm PDF with the hash above                                                                | Direct basis for the Scheme 1 and Theorem 1 findings.                                                  |
| Prior primary report | `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-primary-text-closure-result.md` | Source-bounded claim ledger and pinpoints accepted for `FND1-H01`.                                     |
| Prior close review   | `evidence/research/foundation-identity/fnd-1/2026-08-30-multiplicity-close-review-result.md`         | Checked the repository report without reopening the PDF; it is not treated as the missing direct pass. |
| Prior acceptance     | `evidence/research/foundation-identity/fnd-1/2026-08-31-multiplicity-steward-disposition.md`         | Preserves `FND1-H01` as narrowed and closed without selecting a Protocol method.                       |
| New limited pass     | This report and the exact supplied Holm and Welch PDFs                                               | Supplies the separate-model direct confirmation for only the claims stated below.                      |

The Welch connection is also limited. At
`7774242f0df81342c5abca97a8fbe40844306fa6`,
`governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`
Sections C.2-C.3 record the custody and reading of supplied source 07, while
Section Z.3 reuses the Welch finding without a new reading. The later
`review-inputs/r3-evidence-map-holm-7f3321b/REVIEW-RESULT.md` at
`a5213b446df0ec1de09d557c0c6933320f470452`, Sections 2-3, records that a
qualifying Welch review was not located. No existing Welch-scoped successor
acceptance is inferred here. This current pass fills only that narrow direct
primary-review leg; it does not supply an enabling-use or reentry decision.

## Claim findings

### Ordinary unweighted Holm

| Claim                            | Primary-text finding                                                                                                                                                                                                                                                                                                                                                                                             | Disposition                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Procedure                        | Scheme 1 orders the obtained levels from smallest to largest, compares rank \(i\) with \(\alpha/(n-i+1)\), rejects while the inclusive comparison passes, and at the first failure accepts that hypothesis and all later hypotheses. If every comparison passes, all hypotheses are rejected. Holm, printed pp. 66-67.                                                                                           | Confirmed for the ordinary unweighted Bonferroni-threshold step-down procedure.                |
| Strong family-wise scope         | The definition on printed p. 65 requires protection for every nonempty set that could be the set of true hypotheses. Theorem 1 on printed p. 67 proves Scheme 1 has that multiple level for free combinations. In modern terms this is strong FWER control, not a complete-null-only result.                                                                                                                     | Confirmed within the paper's stated object.                                                    |
| Marginal validity and dependence | The obtained level for each individual test is defined from its null tail probability on printed p. 66. Theorem 1 uses the Boole inequality over the true hypotheses. No joint independence assumption enters that proof. Thus the ordinary result requires valid individual obtained levels but no independence among them. Holm's generality statement and the continuation of the proof are on printed p. 68. | Confirmed. This does not establish that any candidate input generator produces valid p-values. |
| Excluded variants                | Printed p. 68 separately gives product-form thresholds under independent test statistics. Printed p. 69 separately introduces a weighted construction.                                                                                                                                                                                                                                                           | Both are outside this review and must not be represented as ordinary Holm.                     |

This finding agrees with the accepted source-bounded `FND1-H01` substance. The
new contribution is only the requested distinct-model direct connection to the
same supplied original and the bounded candidate question.

### Welch 1951 several-means procedure

The target on printed p. 330 is a one-way comparison of \(k\) independent normal
quantities \(y_t\), with means \(\mu_t\) and variances
\(\lambda_t\sigma_t^2\). The \(\lambda_t\) are known. Each variance estimate
\(s_t^2\) has distribution \(\sigma_t^2\chi^2_{f_t}/f_t\); these estimates are
mutually independent and independent of all \(y_t\). The null is
\(\mu_1=\cdots=\mu_k\), without imposing equal variances. For independent normal
samples, \(y_t\) may be the group mean, \(\lambda_t=1/n_t\), \(s_t^2\) the group
sample variance, and \(f_t=n_t-1\).

With \(w_t=1/(\lambda_t s_t^2)\), \(W=\sum_t w_t\), and
\(\bar y_w=\sum_t w_t y_t/W\), equations (29)-(30), printed p. 334, define

\[
V^2 =
\frac{\sum_t w_t(y_t-\bar y_w)^2/(k-1)}
{1+\frac{2(k-2)}{k^2-1}\sum_t\frac{1}{f_t}
\left(1-\frac{w_t}{W}\right)^2},
\]

and compare it with an \(F\) distribution having

\[
f_1=k-1,\qquad
f_2=\left[
\frac{3}{k^2-1}\sum_t\frac{1}{f_t}
\left(1-\frac{w_t}{W}\right)^2
\right]^{-1}.
\]

Welch labels the resulting test approximate: the probability statement is
derived to order \(1/f_t\), and the unknown population weights in the preceding
criterion are replaced by sample weights because they occur only in terms of
that order. Printed p. 335 applies exactly this statistic and degrees-of-freedom
calculation to a three-treatment example.

This is Welch's target procedure. James's procedure appears as prior work and is
shown on printed p. 336 to be equivalent only to order \(1/f_t\); that does not
make equations (29)-(30) a James procedure. Brown or Brown-Forsythe does not
appear in the supplied article and is not supported by this pass.

## Connection disposition and remaining candidate work

The bounded source connection is satisfied for:

- ordinary, unweighted Holm Scheme 1, its strong family-wise guarantee under
  valid marginal obtained levels, and the absence of a joint-independence
  requirement in that theorem; and
- Welch 1951 equations (29)-(30), limited to the stated independent-normal,
  unequal-variance several-means model and the paper's order-\(1/f_t\)
  approximation.

The following remain design or review requirements before any candidate can be
promoted:

- define the fixed Holm family, member identities, input and \(\alpha\)
  representation, admissible domain, tie handling, stopping trace, original-order
  mapping, and empty or invalid input behavior;
- derive and independently review any adjusted-p-value formula and its exact
  equivalence domain rather than attributing that later formula to Holm;
- specify exact comparison, rounding or conservative-enclosure behavior, and
  operation, bit, memory, family-size, admission, and refusal bounds;
- bind every Holm input to evidence that its producing procedure supplies valid
  marginal p-values; range membership or exact transformation alone is
  insufficient for scientific FWER;
- if Welch is reconsidered, bind the candidate exactly to the model, statistic,
  degrees of freedom, and approximation above; specify admission and numerical
  behavior and obtain the required candidate-specific numerical review; and
- keep James, Brown/Brown-Forsythe, product-form Holm, and weighted Holm outside
  these source connections unless separately sourced and reviewed.

No conclusion here changes the operative exclusions in the R3 opening record,
closes candidate numerical work, or makes either method implementation-ready.
