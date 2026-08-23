# ADR-0022: In-Process Time and Memory Bounds for the Reference Verifier

**Status: Accepted** (Phase 2A hardening, 2026-08-13). Follows the same
schema-versioning pattern as [ADR-0017](ADR-0017-bundle-independent-routing.md)
and [ADR-0015](ADR-0015-versioned-verifier-refusal-artifact.md).

## Context

`security/phase-1-verifier-security.md` documented processing timeout as
"enforced by the test harness, not in-process" and did not mention a memory
bound at all. This was flagged as a gap: a verifier that is offline and
never executes Record-supplied code can still, in principle, be driven into
unbounded wall-clock or heap consumption by an unexpectedly expensive code
path within the already-declared size, depth, and observation ceilings
(NRS-SEC-0003) - for example a future check with an accidental quadratic
algorithm. Relying only on whatever timeout the invoking harness happens to
apply is not an in-process guarantee.

## Decision

1. **New requirement `NRS-SEC-0006`** (EXPERIMENTAL): the verifier MUST
   enforce declared processing-time and peak-heap limits in-process.
2. **Checkpoint-based enforcement, not preemption.** Node.js has no
   synchronous preemption, so this is implemented as a budget
   (`reference/verifier/src/limits.ts`: `startProcessingBudget`,
   `checkProcessingBudget`) checked at three points in
   `verifyInner` (`reference/verifier/src/verify.ts`): after the parsed-value
   resource-limit check, immediately before the selected bundle's pipeline
   runs, and immediately after it returns. This bounds "no single
   verification run may cross the wall-clock or heap threshold between
   checkpoints," not "an in-flight loop is interrupted mid-iteration." Given
   the existing size/depth/observation ceilings already bound how much work
   any single checkpoint segment can do, this is judged sufficient
   defense-in-depth without the complexity and blast radius of a
   worker-thread-based preemptive timeout (rejected, see below).
3. **Values**: `maxProcessingMs: 5_000`, `maxHeapBytes: 512 * 1024 * 1024`
   (512 MiB). Rationale is recorded as source comments in `limits.ts`
   (measured cost of a maximum-shape input, times a roughly 25x margin).
   These are implementation-side engineering choices, not statistical or
   scientific ones, and are expected to be revisited with real deployment
   measurements.
4. **Testability by injection, not by construction.** `ProcessingBudget`
   takes an injectable `now()`/`heapUsedBytes()` pair. Unit tests
   (`tooling/tests/verifier.test.ts`) inject a budget that already reports
   an exceeded deadline or heap usage and assert the refusal shape,
   because a genuinely slow or memory-heavy input cannot be constructed
   within the NRS-SEC-0003 ceilings - there is no conformance fixture for
   this requirement, and `NRS-SEC-0006`'s registry entry records that gap
   explicitly rather than leaving it silent.
5. **Refusal schema version**: two new `limit_category` values
   (`processing_timeout`, `memory_limit`) are new enum members, so a new
   schema version was issued -
   `urn:nomue:schema:verifier-refusal:0.2.0-draft.3`
   ([../../schemas/reports/verifier-refusal-0.2-draft-3.schema.json](../../schemas/reports/verifier-refusal-0.2-draft-3.schema.json)).
   The draft.2 schema file is retained unmodified (historical artifact,
   same convention as draft.1 under ADR-0017); the supersession is recorded
   machine-readably in `verifier_output_contract` of
   [../../registries/interpretation-bundles.yaml](../../registries/interpretation-bundles.yaml).
   No silent mutation occurred.
6. **Verifier version** advanced to `0.2.0-draft.4`
   (`reference/verifier/src/resources.ts`); this is a code-level version
   string tracked independently of the refusal schema version (see
   [../../spec/versioning/interpretation-bundle.md](../../spec/versioning/interpretation-bundle.md)'s
   informative version-axis table added alongside this change).
7. **New reason codes**: `NRS-TIMEOUT-LIMIT-EXCEEDED`,
   `NRS-MEMORY-LIMIT-EXCEEDED` (`registries/reason-codes.yaml`), following
   the existing per-limit-code pattern of `NRS-OBSERVATION-LIMIT-EXCEEDED`
   / `NRS-STRING-LIMIT-EXCEEDED` (appear only in refusal artifacts, empty
   `applicable_check_ids`).

## Rejected alternatives

- **Worker-thread preemptive timeout** (spawn verification in a
  `node:worker_threads` `Worker` with `resourceLimits` for a hard heap cap
  and `worker.terminate()` on a timer): would give true preemption and a
  hard V8-enforced heap ceiling, but changes `verifyRecordText`/
  `verifyRecordTextWithResources` from a synchronous to an asynchronous API
  used throughout the test suite, the conformance runner, and the CLI, and
  depends on `tsx`'s module-loader hooks propagating correctly into a
  spawned worker. Rejected for this increment as disproportionate blast
  radius for the actual threat (inputs are already capped in size, depth,
  and observation count); may be revisited if a future check's cost profile
  changes.
- **Instrumenting every inner loop** (the stats kernel, JCS
  canonicalization) with per-iteration budget checks: rejected as
  unnecessary given the checkpoint granularity above already bounds
  exposure between well-defined phase boundaries, and it would touch
  significantly more of the numerically-sensitive kernel code for no
  additional coverage at the current input ceilings.
- **A single fixed multiplier documented but not enforced** (status quo):
  rejected; this is exactly the "test harness enforced, not in-process" gap
  the decision addresses.

## Consequences

- `security/threat-model.md` documents the enforced values and the
  checkpoint-not-preemption caveat as part of the published threat model
  (gate R1-05 evidence).
- All existing fixtures' pinned `verifier.version` and refusal `$schema`
  values advance to `0.2.0-draft.4` / `urn:nomue:schema:verifier-refusal:0.2.0-draft.3`
  when `tooling/src/phase1/author-fixtures.ts` is re-run, following the same
  re-authoring discipline as ADR-0015 and ADR-0017. No pinned Record
  interpretation semantics, digests, or Welch results change.
