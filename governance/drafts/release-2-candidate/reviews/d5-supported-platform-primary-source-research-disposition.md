# D5 supported-platform primary-source research disposition

## Research identity

- Baseline: `cb4c04ad5898d6e95797d252c5ecd2d839fc42c7`
- Research type: three independent primary-source investigations followed by a
  separate adjudication
- Commission:
  `d5-supported-platform-primary-source-research-commission.md`
- Independent results:
  `review-inputs/r2-d5-supported-platform-primary-source-research/`
- Disposition: **RESEARCH CLOSED; IMPLEMENTATION CANDIDATE AUTHORIZED**
- Runtime support: unchanged and disabled
- Supported platform: unselected

This is non-authoritative candidate-development material. Closing the research
question does not establish conformance of a deployed runtime.

## Facts accepted

The research establishes the following source-grounded facts:

1. Current ECMAScript specifies Number as IEEE 754 binary64 and specifies
   roundTiesToEven results for the ordinary operations used by the tail graph.
   ECMAScript 2025 and 2026 also specify the Number value of the exact square root;
   the implementation-approximated description belongs to the 2024 edition.
2. A conforming implementation may use any internal instruction sequence, but it
   may not expose a fused or extended-precision result that differs from the
   separately specified Number operations.
3. Node build identifiers and support tiers are necessary deployment metadata but
   do not attest to numerical semantics or active floating-point state.
4. V8 source exposes denormal flushing as mutable process/thread state, and Node can
   host same-process native code. A static OS/architecture/version tuple cannot by
   itself establish the proof premise at the point of use.
5. Test262, startup tests, and cross-platform corpora are finite. They provide
   valuable admission and regression evidence but not a universal proof.
6. The existing R2-D5 truth-error evaluator proves properties of a separate replay
   and compares its final graph identity. It does not yet exactly verify every
   primitive result of the one execution whose value is returned.
7. The present result is tail-only. It does not close the upstream G4
   data-to-statistic graph.

## Project inference

Under a non-malicious pinned-runtime threat model, a support decision can be made
fail-closed without requiring a native FP register guard when all of the following
are combined:

- an exact, reviewable runtime/platform/build allowlist;
- an enforceable controlled execution profile;
- startup and per-invocation diagnostics;
- one immutable trace of the actual returned computation;
- independent exact verification of every actual ordinary arithmetic result and
  every actual square-root result; and
- cross-platform admission evidence for every proposed allowlist member.

The trace verifier converts the platform premise from a broad assertion about every
future engine execution into a checked property of the actual accepted invocation.
It remains conditional on the stated trusted-runtime boundary.

## Candidate decision

The next R2-D5 increment will implement a **supported execution predicate
candidate**, rather than treating a platform-name matrix as sufficient. The
candidate will:

1. preserve the exact existing table, graph, truth-error derivation, and authority
   state unless a separately reviewed change is unavoidable;
2. produce the returned p-value and the proof input from one operation trace;
3. bind every operation label, operand bits, result bits, branch, iteration, table
   identity, and returned value;
4. verify `+`, `-`, `*`, and `/` by exact dyadic/BigInt roundTiesToEven logic;
5. verify every executed `Math.sqrt` by the existing exact rounding-cell method;
6. fail closed on an incomplete, reordered, duplicated, mutated, unverifiable, or
   resource-exhausting trace;
7. add startup and per-invocation sentinels without treating them as the proof;
8. define an initially narrow process profile that excludes unreviewed native
   integration; and
9. remain non-authoritative and unissued until independent adversarial review and
   the complete cross-platform matrix corpus pass.

A platform-specific native FP-state guard is held as optional hardening. It is not
part of the minimum first candidate and cannot replace exact trace verification.

## Machine-checkpoint handling

The previously reviewed runtime-input reason-code checkpoint still records
`independent_primary_source_platform_review` as the blocker that existed when that
checkpoint was closed. This research increment does not rewrite that historical,
exactly validated checkpoint. The next implementation candidate will supersede the
blocker with implementation, resource-bound, cross-platform-evidence, and
independent-review conditions while keeping the public reason code unissued.

## Held decisions

The research does not choose:

- exact Node/V8 releases or executable digests;
- operating systems, architectures, or CPU-feature coverage;
- the final controlled-process mechanism;
- trace serialization, digest, or maximum resource cost;
- exact sentinel vectors;
- cross-platform runner identities;
- a public unsupported-platform reason code; or
- the upstream G4 closure method.

These are implementation and evidence decisions. None may be inferred from the
repository's current `node >=20` declaration or existing CI matrix.

## Required independent review of the next increment

The implementation review must independently attack at least:

- exact rounding around normal, subnormal, zero, overflow, and tie boundaries;
- trace completeness, label order, duplicate and omission handling, and binding to
  the returned value;
- graph/proof divergence with equal final bits;
- mutation after startup diagnostics;
- intrinsic identity and restricted-process enforcement;
- resource-exhaustion and fail-closed behavior;
- every proposed runtime/platform tuple, including cold and optimized paths; and
- any attempted authority, support, Public Check, bundle, or Release 2 promotion.

## Non-effects

This disposition does not select a platform matrix, supported df range, runtime
truth-error bound, final table, reason code, Public Check, bundle, or supported
domain. It does not activate paired-t support, complete R2-D5, close public review
issue #25, or publish Release 2.
