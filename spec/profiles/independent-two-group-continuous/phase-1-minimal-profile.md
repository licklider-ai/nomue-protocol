# Phase 1 Minimal ITGC Profile

**Status: Normative.** This document binds the Phase 1 ITGC profile
preconditions and the required declared result
(`NRS-PROFILE-ITGC` namespace). The calculation itself is bound in
[welch-calculation.md](welch-calculation.md); the structural representation is
[../../../schemas/profiles/itgc-minimal.schema.json](../../../schemas/profiles/itgc-minimal.schema.json).

## Structure preconditions

<a id="NRS-PROFILE-ITGC-0001"></a>
**NRS-PROFILE-ITGC-0001 - Exactly two groups** (stability: STABLE-INTENT, status: active)
The Phase 1 ITGC profile MUST contain exactly two declared groups.

<a id="NRS-PROFILE-ITGC-0002"></a>
**NRS-PROFILE-ITGC-0002 - Unique observation identity** (stability: STABLE-INTENT, status: active)
Each observation identifier MUST be unique within the dataset.

<a id="NRS-PROFILE-ITGC-0003"></a>
**NRS-PROFILE-ITGC-0003 - Unique experimental-unit binding** (stability: STABLE-INTENT, status: active)
Each experimental-unit identifier MUST occur in exactly one observation in the
Phase 1 ITGC profile.

<a id="NRS-PROFILE-ITGC-0004"></a>
**NRS-PROFILE-ITGC-0004 - Minimum group size** (stability: STABLE-INTENT, status: active)
Each declared group MUST contain at least two observations.

<a id="NRS-PROFILE-ITGC-0005"></a>
**NRS-PROFILE-ITGC-0005 - Declared independence** (stability: STABLE-INTENT, status: active)
The Phase 1 ITGC design MUST explicitly declare independent groups.

Informative note: the verifier does not claim to detect an untruthful
independence declaration; it checks that independence is declared and that the
Record structure is consistent with the declaration (for example, that no
experimental unit appears in more than one observation).

## Method preconditions

<a id="NRS-PROFILE-ITGC-0006"></a>
**NRS-PROFILE-ITGC-0006 - Group-order direction** (stability: STABLE-INTENT, status: active)
The declared mean difference MUST use the first group in group_order minus the
second group in group_order.

<a id="NRS-PROFILE-ITGC-0007"></a>
**NRS-PROFILE-ITGC-0007 - Welch-only method** (stability: STABLE-INTENT, status: active)
The Phase 1 ITGC profile MUST use the declared two-sided Welch two-sample
t-test and MUST NOT silently switch to another method.

Informative note: there is no automatic fallback to a pooled-variance test and
no automatic switch to any other method or alternative, regardless of what the
data look like.

## Required declared result

<a id="NRS-PROFILE-ITGC-0012"></a>
**NRS-PROFILE-ITGC-0012 - Required declared result** (stability: STABLE-INTENT, status: active)
The declared result MUST include group sample sizes, means, sample variances,
mean difference, test statistic, degrees of freedom, and p-value.

## Data preconditions

<a id="NRS-PROFILE-ITGC-0013"></a>
**NRS-PROFILE-ITGC-0013 - Unsupported missing values** (stability: EXPERIMENTAL, status: active)
The Phase 1 ITGC profile MUST reject missing or non-finite outcome values
rather than applying an implicit missingness policy.

<a id="NRS-PROFILE-ITGC-0014"></a>
**NRS-PROFILE-ITGC-0014 - Zero standard-error handling** (stability: EXPERIMENTAL, status: active)
A zero standard error MUST fail the profile precondition check and MUST
prevent the Welch recomputation check from running.

Informative note: in that situation the precondition check completes with
outcome `fail` and reason code `NRS-ZERO-STANDARD-ERROR`, the Welch
recomputation check reports `execution: not_run` without an outcome, and
nothing in the report presents the research as wrong as a whole - the result
is scoped, like every other result.
