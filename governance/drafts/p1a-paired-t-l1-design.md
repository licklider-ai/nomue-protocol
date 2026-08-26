# P1-A Paired-t L1 Design Draft

**Status: Informative design draft.** This file is not Protocol authority, does not
issue Requirement IDs or stable semantic identifiers, and does not add current
support. It is the design-freeze candidate produced after the completed P1-A
statistical Research Gate, F-01 numerical-tolerance Research Gate, and P1-A-N1
Student-t numerical Research Gate. Binding meaning is created only by the later
normative specification/registry/schema/check/conformance change set.

## Goal

Define the smallest paired-design Profile and paired-t Analysis Contract that can
progress to L1 without importing current ITGC/Welch semantics that do not apply to
paired inference.

The design deliberately separates:

- **Profile context:** what constitutes an admissible two-condition paired
  continuous-outcome analysis context;
- **Analysis Contract:** what the two-sided paired t procedure means, which
  estimand/result it targets, and which assumptions/guarantee boundaries apply;
- **Public Check:** the later versioned numerical procedure that recomputes the
  Contract outputs and owns comparison tolerances/resource limits;
- **implementation:** any emitter, reference verifier, app, library, or optimized
  numerical path, none of which defines Protocol meaning.

## Candidate identities — not yet issued

The normative batch should mint owned HTTPS identifiers rather than new legacy
`urn:nomue:*` identifiers. Candidate spellings:

```text
contract: https://nomue.ai/id/contract/paired-t/0.1.0-draft.1
profile:  https://nomue.ai/id/profile/paired-two-condition-continuous/0.1.0-draft.1
```

The successor schema should carry the Analysis Contract identity directly as
`analysis.contract_id`. The paired-t Contract is the unique Protocol semantic
authority for this analytical operation. A second Protocol-issued `method` identifier
with the same meaning is not minted for the successor surface; existing legacy
`method_id` values remain immutable inside their historical schemas and bundles.
The versioned Public Check identifies the numerical recomputation procedure separately
from the Contract's statistical meaning.

The successor Interpretation Bundle should explicitly bind the Contract, Profile,
representation schema, canonicalization, Public Checks, and any other versioned
numerical procedure data required for exact interpretation. No identifier above is
issued merely by appearing in this draft.

Before the first paired-t Requirement ID is issued, the Requirement-ID policy should
be generalized once for scalable capability-scoped namespaces:

```text
NRS-CONTRACT-<TOKEN>-NNNN
NRS-PROFILE-<TOKEN>-NNNN
```

`TOKEN` is an allocated, immutable registry token rather than a new hard-coded
meta-schema branch per method. Candidate tokens such as `PT` and `PTCC` are not
issued by this draft. This preserves per-capability auditability without requiring a
new Requirement-ID grammar for every future Contract or Profile.

## Profile: paired two-condition continuous context

### Context owned by the Profile

The Profile is method-agnostic enough to be reused by a later signed-rank Contract.
It represents a continuous outcome observed in explicit one-to-one pairs across
exactly two declared conditions.

The eventual normative Profile should encode these decisions:

1. exactly two declared conditions, with an explicit `condition_order`;
2. one continuous outcome definition shared across both conditions;
3. explicit pair identity — no pairing inferred from row order, value similarity,
   timestamps, labels, or a software default;
4. every admitted pair contains exactly one observation for condition 1 and exactly
   one observation for condition 2;
5. every admitted observation belongs to exactly one pair;
6. the initial Profile admits only datasets in which every Record observation belongs
   to a complete pair; an unmatched/incomplete pair fails Profile admissibility and is
   never silently converted into a smaller analysis population;
7. pairs are declared to be independent analysis units;
8. the verifier checks representable pair structure and declarations but does not
   claim to infer whether biological/experimental independence is true;
9. no implicit imputation, weighting, transformation, duplicate-pair resolution, or
   one-to-many pairing occurs in the initial Profile;
10. non-finite outcomes and implicit missing values remain outside the supported
    numeric/data-handling surface.

If upstream preprocessing or exclusion creates a complete-pair analysis dataset from
a larger source dataset, that derived dataset and its provenance must be represented
before this Profile is applied. The paired statistical procedure itself performs no
complete-case selection.

### Pair identity versus experimental-unit identity

`pair_id` should be a separate instance identifier rather than being inferred from
`experimental_unit_id`.

Reason: a valid paired analysis may involve repeated measurements of one experimental
unit or an explicitly matched pair of distinct experimental units. Treating
`experimental_unit_id` itself as the pair key would collapse those designs. The
Profile's inferential analysis unit is the declared pair; experimental-unit identity
remains provenance/design information about the underlying observations.

The initial schema candidate therefore gives each observation both an
`experimental_unit_id` and a `pair_id`, plus a `condition_id` and `outcome_value`.
The exact field layout remains a schema-design item and is not fixed by this draft.

If the design declares `repeated_measurements = within_pair_only`, the two members of
an admitted pair should resolve to the same experimental-unit identity. If it declares
`repeated_measurements = none`, paired members should represent distinct experimental
units. The normative schema/admissibility batch should bind these consistency rules
and define how the design-level `experimental_unit_type` applies to each member.

### Independence declaration

Independence across pairs belongs to the Profile's contextual/admissibility
responsibility. The Profile should require an explicit declaration that pairs are
independent analysis units. This is not a claim that a verifier can diagnose
pseudoreplication or recover the true biological unit from values.

## Analysis Contract: two-sided paired t

### Statistical object

For pair `i`, let the declared condition order be `(condition_1, condition_2)` and
define the paired difference

```text
d_i = outcome_i(condition_1) - outcome_i(condition_2)
```

The Contract is the one-sample Student-t procedure on the declared difference sample
`d_1, ..., d_n` with null mean difference zero and a two-sided alternative.

Reversing `condition_order` reverses the signed estimand within the same Contract; it
does not require a new Contract. A successor Contract is required only if the Protocol
changes the direction convention itself rather than a Record declaring a different
condition order.

### Estimand and effect

The estimand is the population arithmetic mean paired difference in the declared
condition order.

The unstandardized point estimate is the sample arithmetic mean of the paired
differences. The initial Contract does not introduce a standardized paired effect
size.

The inferential test, point estimate, standard error, and confidence interval are all
bound to the same mean-paired-difference target; no median, probability-of-superiority,
or unrelated location-shift estimand is substituted.

### Model/assumption boundary

Exact Student-t reference-distribution inference requires the paired differences to
be independent across pairs and normally distributed around their population mean.
The Profile owns the pair-level independence declaration. The Contract should expose
the normal-difference model assumption as an explicit analysis/model declaration
rather than infer it from a normality diagnostic.

The verifier can check that the required declaration exists and that the represented
Record is structurally consistent with the Profile. It does not establish that the
scientific population of differences is in fact normal, that the pairs were sampled
independently, that the declared biological unit of analysis is scientifically
correct, or that the chosen model is scientifically optimal.

No normality test triggers an automatic switch to signed-rank or another method.

### Sample size and degrees of freedom

Mathematically the paired-t statistic is defined for at least two complete pairs when
the sample variance of differences is positive; `df = n - 1` is then a positive
integer.

The normative Contract should not claim that a larger minimum sample size is a
mathematical requirement. A versioned Public Check or supported bundle may bind a
narrower lower/upper `n` domain for numerical verification and validation evidence,
but such support limits do not redefine the mathematical paired-t Contract.

### Computation semantics

For complete paired differences `d_i`:

```text
mean_difference = mean(d_i)
sample_variance_difference = sum((d_i - mean_difference)^2) / (n - 1)
standard_error = sqrt(sample_variance_difference / n)
t_statistic = mean_difference / standard_error
degrees_of_freedom = n - 1
p_value = 2 * StudentTUpperTail(abs(t_statistic), degrees_of_freedom)
```

These are mathematical quantity definitions. The exact binary64 summation, variance,
and evaluation operation graph belongs to the versioned Public Check, because its
comparison evidence depends on quantity, algorithm, and supported domain.

The mathematical p-value target is the exact Student-t probability, not the output of
R, SciPy, Boost, GSL, Cephes, `@stdlib`, the reference verifier, or one closed-form
implementation.

### Confidence interval

The initial confidence level is fixed at `0.95`.

The confidence interval targets the same population mean paired difference:

```text
mean_difference +/- t_critical(df, 0.975) * standard_error
```

The fixed confidence level is intentional. It permits the Public Check to bind a
finite, independently certified table of critical values for a bounded integer-df
support domain instead of silently delegating runtime inverse-CDF semantics to a
library.

A free confidence-level parameter is a successor Contract version/capability because
it changes the supported inferential surface and reopens the inverse Student-t
numerical contract.

### Degenerate states

A zero sample variance of paired differences produces zero standard error and an
undefined ordinary t statistic. The mathematical Contract treats this as outside the
ordinary t-statistic domain. The versioned Public Check should map that state to an
explicit computability/refusal reason rather than inventing `p = 1`, `p = 0`,
infinity, or another fabricated ordinary test result. This remains one computability
class whether the corresponding mean difference is zero or nonzero.

An incomplete pair is not converted into a smaller paired dataset inside the Contract
or Profile. The initial Profile rejects a Record dataset containing an unmatched
observation. Any upstream exclusion/preprocessing that creates a new complete-pair
dataset must be explicit and provenance-bound before analysis.

## Numerical-contract handoff to the Public Check

The Research Gates closed the semantic direction but intentionally did not issue
numeric tolerance constants.

### Mathematical target versus numerical procedure

The Public Check should keep two levels distinct:

1. **semantic mathematical target:** exact Student-t probability / fixed-level
   Student-t critical quantile;
2. **versioned numerical procedure:** the deterministic algorithm used by the check
   to compute a binary64 result over its declared support domain.

A fixed operation graph can be bitwise deterministic without being the correctly
rounded binary64 image of the exact mathematical function. Determinism and
mathematical accuracy are therefore separate evidence claims.

The current L1 design intentionally remains agnostic about a universal
correctly-rounded-or-refusal runtime guarantee. The intended L2 handoff is
hierarchical: the p-value check uses a validated, versioned numerical procedure and
comparison rule over a bounded domain, while independently certified constants can
provide stronger correctly-rounded evidence for the finite 95% CI critical-value
table. A future Public Check may bind stronger runtime certification, but this draft
does not claim it.

### Integer-df fast path

Because paired-t degrees of freedom are integers, an integer-df direct evaluation
based on finite integration-by-parts/closed-form recurrences is a valid candidate
fast procedure for the initial bounded domain. It can avoid importing the branch
semantics of a general incomplete-beta library.

This is a numerical-procedure choice, not a statistical semantic split. Even-df and
odd-df implementation paths must not create different scientific Profiles or cause
the product to support only conveniently shaped sample sizes.

Before the Public Check is frozen, engineering must:

- derive a tail-direct, cancellation-resistant form/recurrence for every supported
  integer df;
- avoid `1 - CDF` for a small positive tail;
- avoid intermediate `t^2` overflow when the mathematical p-value remains
  representable;
- bind evaluation order and any contraction/reassociation/intermediate-precision
  assumptions needed by the reproducibility claim;
- validate the fast path against a structurally independent oracle.

### Independent certification/oracle

Arb/FLINT regularized incomplete-beta ball evaluation is the preferred independent
development/validation reference path for Student-t probabilities. A ball/enclosure
certificate and any working precision remain oracle evidence; they are not folded
into the Product/Public Check tolerance and they do not themselves prove the Arb
implementation is bug-free.

Where an enclosure is narrow enough that `arb_can_round_arf(..., 53, round-to-nearest)`
certifies a unique 53-bit rounded value in the normalized binary64 range, that
projection can be used as strong oracle evidence. The same call must not be described
as a complete binary64 subnormal-rounding proof: subnormal results require a
target-format-aware enclosure/rounding argument or an explicit refusal boundary.
Failure to certify at a chosen oracle resource ceiling is an indeterminate
oracle-computability state, not permission to guess or widen the Product/Public Check
tolerance.

Cross-library agreement remains a divergence probe only.

### Fixed 95% critical values

For a bounded integer-df support domain, the 0.975 Student-t critical values form a
finite table. Each entry should be certified offline with an independent
forward-probability enclosure plus monotonicity/bracketing (or an equally strong
independent route), with evidence tight enough to establish that the exact quantile
rounds uniquely to the pinned binary64 value.

The pinned critical-value table is versioned Public Check data accompanied by
certification evidence. It is not a new statistical semantic authority and is not
silently defined by a reference implementation. Runtime inverse
incomplete-beta/root-finding is not needed for this initial surface.

### Positive p versus zero

The current Protocol already distinguishes a positive p-value from zero. The paired-t
Public Check therefore needs an explicit support/representability boundary that
prevents intermediate overflow or underflow from silently changing a mathematically
positive p-value into declared `0`.

The initial design preference is fail-closed: if the supported linear-binary64
p-value surface cannot represent the positive mathematical tail under its bound
semantics, the check refuses or reports its versioned non-computable state rather than
silently emitting zero. Offline oracle certification is validation evidence, not a
runtime precondition unless a future Public Check explicitly binds runtime
certification. A future log-p/enclosure result surface is a successor decision, not an
implicit fallback.

No final `|t|`, variance, or p-magnitude threshold is selected in this draft; those
limits belong to the versioned Public Check and its oracle/conformance evidence.

### p near one

A mathematical p-value near one may correctly round to binary64 `1.0`. That does not
by itself require an additional complement field in the initial Contract. The
implementation still evaluates the relevant Student-t tail directly and avoids using
loss of `1 - p` information as an internal numerical path.

### Separate p-value and CI numerical ledgers

The p-value and confidence-interval endpoints have different numerical operations and
evidence. The eventual Public Check should not reuse one tolerance merely because both
quantities involve Student-t inference. Corpus validation and domain-bounded enclosure
or analytical evidence must also remain explicitly distinguished.

## Candidate machine-readable surface

The successor schema should remain closed and minimal. A design candidate is:

```text
payload.dataset.observations[]
  observation_id
  experimental_unit_id
  pair_id
  condition_id
  outcome_value

payload.design
  design_id
  dataset_id
  experimental_unit_type
  conditions[2]
  condition_order[2]
  outcome
  declarations
    grouping_structure = paired_two_condition
    pair_independence = declared
    repeated_measurements = none | within_pair_only
    clustering = none_declared
  data_handling
    analysis_population = all_record_observations
    missing_outcomes = none
    transformation = none
    weighting = none

payload.analysis
  analysis_id
  design_id
  contract_id = paired-t Analysis Contract identifier
  alternative = two_sided
  model
    paired_difference_distribution = normal
  estimand
    kind = arithmetic_mean_paired_difference
    direction = first_condition_minus_second_condition
  confidence_level = 0.95

payload.result
  result_id
  analysis_id
  pair_summary
    n_pairs
    mean_difference
    sample_variance_difference
  effect_estimate
    kind = arithmetic_mean_paired_difference
    estimate
    standard_error
    confidence_interval
      confidence_level
      lower
      upper
  test
    test_statistic
    degrees_of_freedom
    p_value
```

This is a design candidate, not an issued schema. In particular, preprocessing
provenance, resource-limit metadata, and exact contract/bundle binding remain to be
finalized in the normative batch. The schema/admissibility rules should ensure that
`all_record_observations` means exactly that: every observation belongs to exactly one
complete pair, and no hidden complete-case selection occurs inside the Profile.

## Non-claims to bind normatively

The eventual Contract/Profile should state that verification does not establish:

- that the declared pairs are the scientifically correct pairs;
- that pairs are truly biologically/experimentally independent;
- that the declared biological unit of analysis is scientifically correct;
- that the normal paired-difference model is true;
- that a paired t procedure is the scientifically optimal method;
- causal interpretation of the paired mean difference;
- that the paired mean difference is the probability or magnitude of benefit for a
  particular individual under one condition versus another;
- absence of selection, measurement, preprocessing, or missing-data bias;
- publication readiness outside the exact outputs and claims covered by the
  applicable Contract/Profile/Public Checks.

## Conformance and oracle plan

The implementation batch should include positive and negative fixtures covering at
least:

- one valid complete-pair dataset;
- reversed condition order and effect direction;
- unmatched pair;
- duplicate observation/pair membership;
- pair with duplicate condition;
- repeated-measurement declaration inconsistent with experimental-unit identities;
- matched-distinct-unit declaration inconsistent with experimental-unit identities;
- missing/non-finite outcome;
- unsupported Contract/alternative/model/estimand/confidence level;
- zero difference variance;
- known ordinary paired-t result;
- very small but representable positive p-value;
- candidate underflow/overflow boundary refusal;
- p near one;
- CI endpoint ordering;
- p/CI mismatch against declared values.

Independent numerical evidence should include:

- exact/algebraic checks for `n`, `df`, pair construction, and direction;
- a structurally separate calculation of mean/variance/statistic quantities;
- Arb/FLINT enclosure for Student-t probability;
- certified critical-value table generation;
- cross-environment divergence probes that are not promoted to oracle authority.

## Proposed implementation sequence

Architecture prerequisites 1 and 2 are complete: the informative checkpoint was
reviewed, and ADR-0032 adopted the `contract` family, direct
`analysis.contract_id` binding, legacy `method_id` coexistence, and the extensible
capability-scoped Requirement-ID grammar. These decisions did not issue a paired-t
identifier or Requirement ID.

The remaining sequence is:

1. keep the public paired-t vertical-slice review open through its 30-day minimum;
2. during review, prepare and test unissued candidate namespace tokens, identifiers,
   normative text, schemas, fixtures, reason codes, numerical procedures, Public
   Checks, oracle evidence, and reference verifier support in public draft branches;
3. ratify the capability namespace tokens, identifier spellings, schema/bundle
   surface, and numerical contract as their evidence becomes decision-ready;
4. at or after the earliest RFC decision timestamp, record the RFC disposition and,
   if accepted, land the complete coupled authoritative change set;
5. evaluate L2/L3 maturity and publication-ready boundary separately.

No current Welch bundle, schema, check, or result meaning changes as part of this
draft.
