# Execution and Outcome Model

**Status: Normative.** This document binds the Phase 1 execution/outcome model
for check results. The structural representation is
[../../schemas/common/execution-outcome.schema.json](../../schemas/common/execution-outcome.schema.json);
state invariants are registered in
[../../registries/state-invariants.yaml](../../registries/state-invariants.yaml).

## Model

Every check result carries an `execution` state:

- `completed` - the check ran to completion and reached a judgment.
- `not_run` - the check did not run, because a precondition or gating
  condition was not met.
- `error` - the check started but could not reach a judgment.

A completed check carries an `outcome`:

- `pass` - the covered condition held.
- `fail` - the covered condition did not hold.
- `indeterminate` - the check completed but the covered condition could not be
  decided within the check's declared scope.

## Invariant

<a id="NRS-VERIFY-0010"></a>
**NRS-VERIFY-0010 - Execution and outcome invariant** (stability: CORE, status: active)
A completed check MUST declare an outcome, while a not-run or errored check
MUST omit outcome and declare an applicable reason or error.

Informative note: concretely, `execution: completed` requires `outcome`;
`execution: not_run` forbids `outcome` and requires at least one reason code;
`execution: error` forbids `outcome` and requires an error object together
with at least one reason code. The report schema enforces this with
conditional constraints, and the state-invariant registry lists the valid
combinations.

## Informative: no overall status

There is no aggregate execution or outcome across checks. The prohibition of
an overall "VERIFIED" style status is bound by
[../core/verification-principles.md#NRS-VERIFY-0001](../core/verification-principles.md#NRS-VERIFY-0001).
