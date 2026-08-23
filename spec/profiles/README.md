# Profiles

**Status: Informative.**

A profile is a named, versioned subset of Record semantics for which specific
checks and guarantees are supported.

## Phase 1

The first profile exists:
[independent-two-group-continuous/](independent-two-group-continuous/README.md)
(`urn:nomue:profile:itgc:0.1.0-draft.1`, requirement namespace
`NRS-PROFILE-ITGC`), a deliberately minimal slice supporting only the
two-sided Welch two-sample t-test.

No other profile is defined. New profiles arrive one at a time via the RFC
process, each with its own schema, checks, fixtures, and oracle evidence.

## Successor research disposition: P1-A paired and rank-based inference

The material below is an **informative handoff from the completed Research Gate**
for successor capability design. It does not expand current support: no registered
bundle, schema, Public Check, or verifier path currently implements these methods.
Binding meaning is created only when a successor authoritative Contract/Profile,
machine-readable surface, version binding, Public Check, and conformance evidence
are issued.

Two independent research passes were followed by targeted primary-source work on
unresolved zero/tie questions and on confidence intervals for the Mann–Whitney
effect. The reports themselves are not canonical Protocol artifacts. The design
constraints below preserve the decision-bearing semantics so that later work does
not need to infer them from implementation defaults or reconstruct them from the
research reports.

### Profile placement

P1-A is not one successor Profile. Paired t and signed-rank require a paired-design
context and therefore do **not** extend the current independent-two-group ITGC
Profile. Mann–Whitney uses an independent-group design and can reuse or succeed the
appropriate independent-group context only if the eventual authoritative Profile
explicitly admits it. The statistical procedures themselves remain separate Analysis
Contracts from the Profile that supplies design/admissibility context.

### Cross-method decisions

Paired t, Wilcoxon signed-rank, and Mann–Whitney/rank-sum are treated as **three
separate Analysis Contracts**, not as automatic alternatives selected from the same
observed data.

The successor design does not infer paired versus independent sampling from the
values, does not use a normality/assumption diagnostic to silently switch methods,
and does not treat a rank procedure as an automatic fallback from a t procedure. The
design and Contract are declared upstream.

The first successor surfaces are two-sided only. One-sided procedures are deferred
to successor Contracts where direction and provenance can be specified explicitly.

No P1-A Contract silently removes observations to imitate a software package.
Missingness and preprocessing are part of the declared analysis population, not a
hidden behavior of the statistical procedure. Paired Contracts require explicit
one-to-one pairing; independent Contracts require independent analysis units. The
paired-design Profile also needs an explicit declaration that pairs are independent
analysis units; the Protocol can check represented declarations and structural
consistency, but it does not claim to infer whether the declared biological or
experimental independence is true from the numeric observations.

Software defaults are divergence evidence, not semantic authority. R, SciPy, Stata,
and SAS-family implementations differ in zero handling, exact/asymptotic routing,
continuity correction, returned statistics, and tie treatment. Release-dependent
software behavior is therefore never inherited silently.

### Paired t successor direction

The paired t Contract is a one-sample t procedure on explicitly paired within-pair
differences in a declared group order.

Its semantic target is the population mean paired difference. The unstandardized
point estimate is the sample mean paired difference, and the t confidence interval
refers to that same estimand. This is the cleanest of the three P1-A tracks because
the test estimand, point estimate, and interval can share one mathematical target.

A pair lacking either member is not silently dropped by the Protocol. Automatic
imputation, inferred pairing, duplicate-pair resolution, and one-to-many pairing are
outside this Contract. A successor representation needs enough structure to make the
pair relation and analysis population explicit.

At minimum, `n = 1`, zero variance of the paired differences, or another state in
which the standard error/statistic is undefined is a computability boundary rather
than a fabricated numeric result.

### Signed-rank successor direction

The initial signed-rank Contract interprets the null through a paired-difference
distribution symmetric about zero. It is **not** described as a general median-zero
test. Under symmetry the pseudomedian and median coincide; without that condition
the simple median interpretation is not retained.

The initial zero convention is **Pratt**:

- zero differences participate in ranking of absolute differences;
- their ranks do not contribute to positive or negative signed-rank sums;
- the non-zero ranks are not recomputed after zeros are removed from the sign-flip
  set.

This choice is based on coherence/monotonicity properties identified by Pratt, not a
claim that Pratt has uniformly greater power than the reduced-sample Wilcoxon
convention. Tied absolute differences use midranks.

The initial inferential procedure is an exact conditional sign-permutation procedure
for the observed rank vector. Sign permutations apply to the non-zero observations;
zeros remain non-contributing. The initial two-sided convention is the central
doubled-tail construction: for observed statistic `t_obs`,
`lower_tail = P(T <= t_obs)` and `upper_tail = P(T >= t_obs)`, with the observed
statistic included in both corresponding inclusive tails, and
`p = min(1, 2 * min(lower_tail, upper_tail))`. Mid-p subtraction or any strict-tail
variant is a different procedure and is not part of this initial convention.

There is no silent switch to a normal approximation because of sample size, ties,
zeros, execution time, or a dependency default. If the exact procedure exceeds a
versioned resource/computability boundary, the check refuses or reports the
applicable non-computable state instead of substituting an unannounced asymptotic
result.

The Hodges–Lehmann pseudomedian is the preferred unstandardized point-estimate family
for later binding. A signed-rank confidence-interval procedure is **not yet
ratified** by this research handoff. Publication-ready support remains blocked until
a successor Contract binds the interval/coverage semantics or explicitly defines a
narrower output guarantee.

### Mann–Whitney / rank-sum successor direction

The initial Mann–Whitney Contract uses the classical two-sided **equality of
distributions (`F = G`)** interpretation under an explicitly independent-group
design. It is not described as a median test, a mean-difference test, a generic
`theta = 0.5` test under arbitrary unequal distributions, or a "nonparametric
version" of a two-sample t-test.

Ties use midranks and half credit in the oriented pairwise effect definition. The
canonical effect orientation for successor design is:

```text
theta = P(group1 > group2) + 0.5 * P(group1 = group2)
```

with point estimate equal to the correspondingly oriented Mann–Whitney pair count
divided by `n1 * n2`. Literature using the opposite orientation reports
`1 - theta`; future one-sided directions and interval endpoints cannot be compared
without resolving that orientation first.

This `theta` is a marginal comparison of independent draws from the two group
distributions. It is not, by itself, a causal estimand or the probability that a
particular individual would benefit under one condition rather than another; any
such interpretation requires a separate causal or paired-potential-outcome model.

`F = G` implies `theta = 0.5`, but the converse is false. The classical WMW test and
an interval for `theta` therefore answer different inferential questions and are not
generally dual.

The initial test procedure is an exact conditional permutation procedure for the
observed pooled ranks, using the same inclusive central doubled-tail convention
defined above. It does not silently fall back to a normal approximation or import a
software-specific sample-size threshold.

The initial Mann–Whitney Contract can report the `theta` **point estimate but does
not provide a confidence interval for `theta`**. This is a semantic boundary, not a
missing UI feature:

- no distribution-free finite-sample exact `theta` interval was established;
- WMW-compatible interval procedures require additional distributional structure or
  weaker empirical compatibility claims;
- Brunner–Munzel/studentized-permutation and newer Mann–Whitney-effect procedures
  directly target the effect under different inferential semantics and can produce
  different p-values;
- a Hodges–Lehmann shift interval has a different estimand and measurement unit and
  is not a substitute for a `theta` interval.

If interval inference for probability of superiority becomes a supported capability,
it is evaluated as a separate Analysis Contract or an explicitly versioned successor
with its own Research Gate disposition, assumptions, Public Check, and validation
evidence. Candidate families include studentized Brunner–Munzel-type procedures and
newer compatible Mann–Whitney-effect procedures; this handoff selects none of them.

Very small samples are not rejected merely because the discrete exact reference
distribution cannot attain a conventional alpha threshold. For example, some small
group-size combinations cannot achieve a two-sided p-value below `0.05` even under
complete separation. That is an inferential limitation, not a computability failure.

### Rank equality and numeric identity

The current Protocol's parsed finite binary64 values remain the numeric input
authority. Rank/tie/zero semantics cannot depend on an undocumented tolerance,
platform formatting, or a library's hidden rounding default.

Research confirms that floating-point representation can change apparent ties and
that explicit rounding can be reasonable, but it does not identify one universally
correct decimal digit count or tolerance. The exact initial rank-key rule is
therefore an implementation-blocking numerical-contract item for the successor
check. It must be defined explicitly from the parsed binary64 values before
implementation is accepted.

The successor can choose exact value-based ranking or an explicitly recorded
preprocessing/rounding rule, but it cannot import an implicit tolerance or silently
change the rule when a dependency changes. Changing the bound rank-key/equality rule
can change p-values and exact routing for tied data, so the rule belongs to a
versioned semantic/check surface with positive and negative conformance cases.

### Exactness and future asymptotic procedures

For the initial rank-based Contracts, `exact` means the explicitly specified
conditional permutation distribution, not a library flag named `exact`. Computation
mode and convention identities need to be inspectable from the versioned
Contract/Public Check rather than recoverable only from implementation behavior.

A future asymptotic procedure is a distinct versioned procedure with its own tie
variance, continuity/Edgeworth correction, routing rule, numerical tolerances, and
conformance evidence. It is not a hidden fallback branch inside the exact Contract.

The successor numerical contract also needs to bind how an exact rational
permutation probability is projected into the Protocol's finite binary64 output
domain. The integer/rational oracle value is the mathematical reference; the Record
or report representation needs one deterministic rounding rule rather than a
library-specific accumulation path.

### Independent oracle plan

The implementation plan uses different independent evidence classes for different
mathematics:

- paired t: algebraic identities for differences/statistic/df plus an independent
  high-precision t-tail reference;
- signed-rank: exhaustive sign enumeration for small cases and arbitrary-precision
  integer/rational dynamic programming for bounded larger cases under the bound
  Pratt/rank semantics;
- Mann–Whitney: exhaustive label permutations for small cases and
  arbitrary-precision integer/rational rank-sum/U calculations for bounded larger
  cases;
- R/SciPy/Stata comparisons are supplementary divergence probes, never the sole
  oracle.

Useful hand-checkable regression seeds include Pratt's zero-handling counterexample
and the published tied-data Mann–Whitney example with exact two-sided p-value
`0.0373`. When these become conformance/oracle fixtures, the fixture batch must pin
the exact input dataset, the applicable convention/version, and the expected exact
value; a literature citation or package output alone is not the oracle.

### Deliberately deferred after the Research Gate

The completed research does not itself define:

- successor Record/Profile/Contract schemas;
- permanent Contract or Public Check identifiers;
- the exact rank-key/equality mechanics beyond the explicit-versioning boundary
  above;
- exact-rational-to-binary64 output rounding beyond the requirement to bind it
  explicitly;
- exact computability thresholds/resource limits;
- signed-rank confidence-interval semantics;
- a probability-of-superiority confidence-interval Contract;
- asymptotic signed-rank or Mann–Whitney procedures;
- one-sided procedures;
- product UI exposure or publication-ready status.

Those are resolved in the smallest successor capability batch that actually needs
them. No current bundle, schema, Public Check, verifier behavior, or existing Welch
semantics changes because of this informative research disposition alone.

### Load-bearing research basis

The Research Gate drew on independent reviews of primary methodological literature
and official implementation documentation, with targeted follow-up on unresolved
questions. Load-bearing sources include Student (1908); Pratt (1959); Mann & Whitney
(1947); Hodges & Lehmann (1963); Fay & Proschan (2010); Divine et al. (2018); Fay &
Malinovsky (2018); Fay & Brittain (2018); Neuhäuser & Ruxton (2009); and Schüürhuis,
Konietschke & Brunner (2025), together with official R, SciPy, and Stata behavior used
only for divergence auditing.

The practical consequence is that P1-A is **not one method-toggle feature**. It is
three separately versioned capability tracks sharing generic Protocol infrastructure.
Paired t can proceed toward a complete effect-plus-CI surface. Signed-rank and
Mann–Whitney can proceed toward bounded native verification, but they do not become
publication-ready merely because a p-value can be recomputed; missing interval
semantics remain an explicit capability boundary rather than being filled with a CI
for a different estimand.
