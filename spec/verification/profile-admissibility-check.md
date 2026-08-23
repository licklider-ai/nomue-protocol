# Profile Admissibility Check

**Status: Normative.** This document binds the separation of profile
admissibility from numerical computability and the propagation rule for
dependent checks (`NRS-VERIFY` namespace, continued).

## Separation

<a id="NRS-VERIFY-0013"></a>
**NRS-VERIFY-0013 - Admissibility and computability separation** (stability: CORE, status: active)
Profile admissibility and numerical computability MUST be evaluated and
reported as distinct checks.

Informative note: admissibility asks whether the declared Record structure
lies inside the profile's guarantee boundary
(`urn:nomue:check:itgc-profile-admissibility:0.2.0-draft.1`); computability
asks whether the supported quantities can be computed as finite numbers from
the observations (`urn:nomue:check:welch-computability:0.2.0-draft.1`). A
Record can be admissible yet non-computable (for example a zero standard
error), and the two verdicts stay separately scoped.

## Propagation

<a id="NRS-VERIFY-0017"></a>
**NRS-VERIFY-0017 - Unsupported profile propagation** (stability: CORE, status: active)
When profile admissibility fails, dependent computability and recomputation
checks MUST be not run and MUST identify the blocking reason.

Informative note: the dependency chain is machine-readable in
[../../registries/public-checks.yaml](../../registries/public-checks.yaml)
(`depends_on` with
`dependency_propagation: not_run_with_blocking_reason_codes`): a dependent
check reports `execution: not_run` carrying the blocking check's reason
codes. The integrity check does not depend on admissibility and still runs.
Nothing in a failed admissibility presents the Record or the research as
scientifically wrong as a whole
([../profiles/independent-two-group-continuous/non-claims.md](../profiles/independent-two-group-continuous/non-claims.md)).
