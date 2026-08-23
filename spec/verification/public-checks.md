# Public Checks

**Status: Normative.** This document binds the Phase 1 public-check model
(`NRS-VERIFY` and `NRS-SEC` namespaces, continued). The machine-readable check
catalog is [../../registries/public-checks.yaml](../../registries/public-checks.yaml);
reason codes are in [../../registries/reason-codes.yaml](../../registries/reason-codes.yaml).

## Separation of conformance and verification

<a id="NRS-VERIFY-0005"></a>
**NRS-VERIFY-0005 - Conformance and verification separation** (stability: CORE, status: active)
Structural and semantic conformance MUST be reported separately from public
verification checks.

Informative note: `record-conformance` is registered in the check registry as a
covered executable rule so that its behavior is versioned and testable, but it
is conceptually a conformance judgment, not a verification check. A
verification report places it in the `conformance` section, never among
`verification_results`.

## Phase 1 verification checks

<a id="NRS-VERIFY-0006"></a>
**NRS-VERIFY-0006 - Independent integrity recomputation** (stability: EXPERIMENTAL, status: active)
A conforming Phase 1 verifier MUST independently recompute the Record content
digest and compare it with the declared digest.

<a id="NRS-VERIFY-0007"></a>
**NRS-VERIFY-0007 - Profile precondition check** (stability: EXPERIMENTAL, status: active)
The Phase 1 verifier MUST evaluate the declared ITGC profile preconditions
before running Welch recomputation.

<a id="NRS-VERIFY-0008"></a>
**NRS-VERIFY-0008 - Welch result recomputation** (stability: EXPERIMENTAL, status: active)
When all Phase 1 ITGC preconditions pass, the verifier MUST recompute the
supported Welch result from the Record observations.

<a id="NRS-VERIFY-0009"></a>
**NRS-VERIFY-0009 - Declared-result comparison** (stability: EXPERIMENTAL, status: active)
The recomputed result MUST be compared with the declared result using the
applicable public-check tolerance policy.

Informative note: the tolerance policy belongs to the public-check version, not
to the Record (see
[../../canonicalization/numerical-comparison.md](../../canonicalization/numerical-comparison.md)).

## Informative: check gating

Verification checks run only against a Record that passed conformance; when
conformance fails, every verification check reports `execution: not_run` with
the applicable reason codes. The precondition check evaluates the full set of
ITGC preconditions, including the data-dependent zero-standard-error
condition; Welch recomputation runs only when the precondition check passes.
Integrity recomputation is independent of the profile checks: a digest
mismatch is reported in its own scope and does not silently suppress or alter
other scoped results.

## Verifier security constraints

<a id="NRS-SEC-0002"></a>
**NRS-SEC-0002 - No Record-supplied code execution** (stability: CORE, status: active)
The Phase 1 verifier MUST NOT execute Record-supplied code, containers,
scripts, plugins, or commands.

<a id="NRS-SEC-0003"></a>
**NRS-SEC-0003 - Bounded Phase 1 input** (stability: EXPERIMENTAL, status: active)
The reference verifier MUST enforce declared Phase 1 limits for input size,
nesting depth, and observation count.

Informative note: the current limits are listed in
[../../security/phase-1-verifier-security.md](../../security/phase-1-verifier-security.md)
and are themselves experimental.

<a id="NRS-SEC-0006"></a>
**NRS-SEC-0006 - Bounded processing time and memory** (stability: EXPERIMENTAL, status: active)
The reference verifier MUST enforce declared processing-time and peak-heap
limits in-process, refusing verification of an input that exceeds either
rather than relying solely on an external harness to terminate it.

Informative note: this bounds wall-clock and heap exposure checked at
pipeline checkpoints; it does not preemptively interrupt a single
computation mid-flight (Node.js has no synchronous preemption). It is a
defense-in-depth check against unexpectedly expensive code paths within the
already-declared size, depth, and observation ceilings of NRS-SEC-0003, not
the primary defense against oversized input. Values and rationale are
documented in
[../../security/threat-model.md](../../security/threat-model.md). Exceeding
either limit is reported through the same resource-limit refusal path as
NRS-SEC-0003, never as an internal error, and is not represented as a
numerical accuracy guarantee (NRS-CORE-0012).

<a id="NRS-CORE-0012"></a>
**NRS-CORE-0012 - Resource limit is not a numerical guarantee** (stability: CORE, status: active)
A verifier resource limit MUST NOT be represented as evidence that all inputs
below that limit satisfy a declared numerical accuracy bound.
