# Candidate A normal-model source and derivation

Status: author-side source inspection and derivation, 2026-09-09. Independent
review of the original input is recorded in PR 246; the prose repairs below
await confirmation. No source hold or public-opening condition is closed.
Parent: `e59d2aaa43a28857396f1acfcdd0c44e96e555b9`.

## Supplied source identity and inspection

| Item                        | Observed value                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| File supplied in the task   | `tian2006.pdf`                                                                                                                                   |
| Bytes                       | 127754                                                                                                                                           |
| SHA-256                     | `baeb2fcbf82c80e9843ade396919845df42b73657d5fae3b28bce23434ebbd49`                                                                               |
| Pages                       | 9; printed 2659-2667                                                                                                                             |
| Identity on first page      | Yongge Tian and George P. H. Styan, Cochran's statistical theorem revisited, Journal of Statistical Planning and Inference 136 (2006), 2659-2667 |
| DOI                         | `10.1016/j.jspi.2004.09.016`                                                                                                                     |
| Dates printed on first page | Received 3 November 2002; accepted 24 September 2004; online 24 December 2004                                                                    |
| Custody                     | User supplied this copy; download operator, actual download URL and acquisition date not established by the attachment                           |
| Inspection                  | All nine pages extracted and read; supplied-file page images 1, 5, 6 and 8 inspected for identity and decision-bearing notation                  |

The earlier web retrieval was not a hashed acquisition. This supplied copy now
provides stable bytes for review; no equality to that earlier web representation
is asserted. The PDF is not added to the public repository. Give the independent
reviewer this exact attachment with these pins, through a permitted channel.

## What the paper supplies, and what is derived here

Page 2659 restates Cochran's classical normal quadratic-form theorem; page 2660
states its matrix version. These passages are attributed prior results, not new
proofs of every probability fact. Pages 2661-2662 prove Theorem 1.2 by block rank
identities. Page 2663 states distribution/independence criteria and cites prior
work. Pages 2663-2665 develop the matrix extension; page 2666 presents Theorem 2.4
for normal quadratic forms. The latter includes the identity-covariance case
used below. This is original research with cited prerequisites, not an inspected
copy of Cochran (1934).

The Candidate A application, population definitions, nuisance-mean argument,
residual rank and F-ratio derivation below are this author's work. They are not
claimed as factorial formulas printed in Tian/Styan. The original commission asked the independent investigator to decide whether
the source and explicit derivation suffice for the retained bounded claim,
and to identify a concrete missing premise if not. PR 246 supplies that
assessment; the evidence-map repair is recorded below. The
mere presence of references does not automatically impose acquisition of every
cited ancestor; neither does publication of this paper automatically close S5.

The probability claims have the following distinct evidence roles. The paper
proves none of the probability facts used by this application: its page 2663
criteria are cited as well known, and Theorem 2.4 reuses those criteria without
stating degrees of freedom, noncentrality or a ratio distribution.

| Retained claim                                | Paper contribution                                                                             | Derivation contribution                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Chi-square criterion for the projected errors | Page 2663 cites the quadratic-form criterion; at identity covariance it reduces to idempotence | Orthogonal-coordinate density argument establishes the law for these projectors                |
| Degrees of freedom one and nu                 | Theorem 2.4 gives no degrees-of-freedom identification                                         | Four-column geometry and residual rank identify the counts                                     |
| Numerator/residual independence               | Page 2663 cites the zero-product criterion; Theorem 2.4 reuses it                              | Disjoint coordinates and density factorization establish independence for each individual null |
| Chi-square densities                          | No proof of these densities in the supplied paper                                              | Polar-coordinate integration supplies the gamma densities                                      |
| F density, normalization and upper tail       | No ratio law or tail derivation in Theorem 2.4                                                 | Gamma-ratio change of variables and beta integration supply these steps                        |

[PR 246](https://github.com/licklider-ai/nomue-protocol/pull/246), review commit
`4013118bdd253a0420cc84af1e78c35cdf048c37`, independently reconstructs this
bounded derivation and returns bounded source GO. This is evidence for the
steward's S5 disposition, not a claim that the cited ancestors were inspected
or that a printed primary proof of every probability step was obtained.

A notation issue was retained: the displayed blocks preceding (2.10) on page 2664
use `D` where the surrounding definitions and final rank line use `Dm`. This is
visible in the supplied page image, not an extraction repair. Its general
interpretation is not adjudicated here. The application below uses identity
covariance and a direct orthogonal-coordinate argument, not the rectangular
matrix calculation in (2.10).

PR 246 also observes that the D of (1.1) has p by n diagonal blocks,
whereas Pm M Qm has n by n blocks. For n different from p the displayed
subtraction is dimensionally incompatible; the final line itself uses Dm.
This bounded reading is recorded without editing the source or relying on
that rectangular calculation.

## Explicit model, targets and sample quantities

Let n be an integer at least two and N=4n. Cells have fixed declared order
00, 01, 10, 11, with n separate units per cell. Assume, as a proposed model,
independent errors with identical normal distribution of mean zero and variance
sigma squared, with sigma strictly positive and finite. The four fixed real
population cell means are mu00, mu01, mu10, mu11. Every observation has its cell's
mean plus its error. This assumption is not inferred from observed data or from
a producer's declaration. Finite binary64 input and future execution admission
are separate numerical-contract questions.

Proposed population contrasts:

```text
DeltaA  = (-mu00 - mu01 + mu10 + mu11)/2
DeltaB  = (-mu00 + mu01 - mu10 + mu11)/2
DeltaAB =   mu00 - mu01 - mu10 + mu11
```

Sample estimates dA, dB and dAB replace each population mean by its sample cell
mean. These are equal-cell-weighted marginal contrasts and an unhalved
difference-in-differences. No claim of causal meaning or of a particular
historical naming convention is needed to define these quantities. Each sample
mean has its corresponding population mean as its expectation, so these linear
sample contrasts estimate the stated targets without changing weights.

Use sign columns, each repeated n times by cell:

```text
v0  = ( 1,  1,  1,  1)
vA  = (-1, -1,  1,  1)
vB  = (-1,  1, -1,  1)
vAB = ( 1, -1, -1,  1)
```

Their inner products are N on the diagonal and zero otherwise. The full-model
mean lies in their four-dimensional span. With the -1/+1 coding above, the
population coefficients are betaA=DeltaA/2, betaB=DeltaB/2 and
betaAB=DeltaAB/4. Fitted coefficients have the same factors applied to dA, dB,
dAB. Keeping the interaction in the model does not require it to be zero when
testing a main-effect contrast.

## Projection and residual derivation for every admitted n

For j in {0,A,B,AB}, put Pj=vj vj' / N. Then each Pj is symmetric and
idempotent, has rank one, and Pj Pk=0 for j different from k. Define
PE=I-P0-PA-PB-PAB. It is symmetric and idempotent, annihilates the full-model
mean and all four columns, and has rank nu=N-4=4(n-1). This follows from the
orthogonal four-column span, not from enumerating a finite set of examples.

For observation vector Y, define SSj=Y'PjY and SSE=Y'PEY. Direct substitution gives:

```text
SSA  = n*dA^2
SSB  = n*dB^2
SSAB = n*dAB^2/4
SSE  = sum over cells and units of (Y_cell,unit - sample_cell_mean)^2
```

Here SS0 is the grand-mean component of the uncentered total; the centered total
excludes it. Do not conflate the decomposition of Y'Y with the centered ANOVA
total. These are exact-real identities, not a chosen floating-point graph.

## Null calibration, with other effects left unrestricted

Test Hj: Deltaj=0 for one j in {A,B,AB}. Under that null, Pj times the population
mean is zero, although the other effects and the intercept may be nonzero.
PE times the population mean is always zero in the full model. Consequently:

```text
SSj / sigma^2 = Z'PjZ
SSE / sigma^2 = Z'PEZ
Z = error / sigma, with Z distributed N(0,I_N)
```

This is the identity-covariance setting of the paper's quadratic-form statements.
It is not valid to replace the raw Y by a zero-mean normal vector without the
annihilation argument. Choose an orthonormal basis with its first direction
vj/sqrt(N), the next nu directions spanning PE and the remaining directions
spanning the other three columns. Orthogonal rotation of the standard normal
density preserves its squared norm and absolute Jacobian one; the resulting
density factorizes into independent standard normal coordinates. The two
quadratic forms are therefore disjoint sums of one and nu squared coordinates.
Their distributions are chi-square with those respective degrees of freedom,
and they are independent for this numerator/denominator pair.

Define F_j=nu*SSj/SSE in exact arithmetic when SSE>0. This gives the central
F distribution with degrees (1,nu) under Hj by the ratio definition. To make the
probability-to-tail step explicit, let U and V be the independent chi-square
variables, with gamma shapes a=1/2 and b=nu/2 and scale two. Transform U=rV/nu;
the absolute Jacobian is V/nu. Integrating the joint gamma density over V>0 gives

```text
f(r) = Gamma(a+b)/(Gamma(a)*Gamma(b))
       * nu^(-a) * r^(a-1) * (1+r/nu)^(-(a+b)), r>0.
```

This density integrates to one by the beta-integral substitution. A candidate
marginal upper-tail value is the integral from the observed exact F to infinity.
No numerical integration algorithm or tolerance is selected. The gamma density
of a sum of squared standard normal coordinates follows by polar-coordinate
integration; these density manipulations are author derivation for independent
checking, not passages claimed to appear in the paper.

The three F statistics share SSE. Pairwise numerator/denominator independence
above does not establish independence of the three ratios or a familywise
error guarantee. No significance threshold or automatic rejection output is
proposed. In the stated continuous model, SSE=0 has probability zero because
nu is positive. It remains a possible represented input; its runtime refusal or
other explicit disposition is unresolved. Rounding can also create zero or
infinite intermediate values, so this exact model proof supplies no runtime
accuracy or computability certificate.

## Proposed treatment of unavailable sources

This is a reviewed-scope decision request, not a unilateral ledger closure.

| Existing item                        | Proposal for this opening route                                                                                           | Remaining obligation                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| S5 classical calibration             | Ask independent review to accept the supplied source plus the explicit bounded derivation above                           | Resolve any concrete uncovered probability premise; no S5 closure before review and disposition     |
| S1 Yates historical factorial source | Define the four population contrasts directly; make no historical-attribution or broad-design claim dependent on Yates    | Preserve the original-source research obligation; ask whether it can be staged beyond this opening  |
| S2 Williams                          | Make no historical or wider interaction-interpretation claim                                                              | Preserve full-text investigation as separate research                                               |
| P1 randomization source              | Make no randomization or potential-outcome claim and do not use its ambiguous formula as an oracle                        | Preserve version/formula reconciliation; do not mark the discrepancy resolved                       |
| S3/S4 wider procedures               | Exclude unbalanced Type I-IV, heteroscedastic and permutation procedures from this proposed first opening                 | Preserve commissioned research without calling these alternatives invalid                           |
| S6 two-system comparison             | Propose staging it with the excluded unbalanced-design programme; no exclusion rationale depends on software disagreement | Independent review and steward disposition required for this staging; no claim that S6 was executed |
| Intervals and multiplicity           | Propose leaving both out of the first opening's supported-claim proposal                                                  | Separate source, scope and numerical work before adding either guarantee                            |

The user authorized progress without waiting for other papers and conditional
opening if requirements are met. This supports investigating the route above;
it is not evidence that its scientific or governance requirements are met.
Other papers are not automatically prerequisites solely by title, but the
independent primary-source review in AGENTS.md/RFC.md remains required.

## Verification and independence

The [companion exact-arithmetic probe](probes/normal-model-projection.py) and
[its result](probes/normal-model-projection-result.json) check projection, rank, contrast and
nuisance-null identities at selected n and an unequal-variance negative control.
The probe's unequal-variance covariance matrix is invertible. Therefore
PA Sigma PE being nonzero is equivalent to Sigma PA Sigma PE Sigma being
nonzero, the paper's independence criterion in its stated form.
It is author-side corroboration of the all-n derivation, not an independent
oracle, a distribution simulation or production conformance evidence.

All derivations and source judgments here used OpenAI Codex in the existing
authoring context. No separate investigator was used. The earlier PR 240 review
explicitly performed no source investigation and does not cover this result.
The submitted PDF was required input for PR 246, which now independently
reviews the fixed result. See the [review response](normal-model-review-response.md)
for the subsequent prose repair and outstanding decisions.
