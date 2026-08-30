# Supported-platform primary-source adjudication result

## Identity and verdict

- Provenance role: independent research adjudicator
- Repository baseline: `cb4c04ad5898d6e95797d252c5ecd2d839fc42c7`
- Review mode: read-only
- Verdict: research is sufficient to proceed to an unissued implementation
  candidate; it is not sufficient to select a platform or activate support

## Threat model

The Release 2 candidate is intended to fail closed against:

- an unsupported or drifted Node/V8/build/platform tuple;
- accidental floating-point environment changes;
- engine, JIT, or backend numerical deviations;
- mutated numerical intrinsics;
- graph/proof divergence; and
- corrupted code, table, trace, or evidence bindings.

It does not claim protection against a malicious or compromised runtime, operating
system, hypervisor, or hardware, hostile same-process native code able to bypass the
candidate, or hardware faults. The initial execution profile therefore excludes
unreviewed native addons, WASI, workers, and callbacks into native code. Enlarging
that profile requires a new isolation and attestation decision.

## Conflict resolution

One implementation-focused report incorrectly carried forward the ECMAScript 2024
description of `Math.sqrt`. Direct inspection establishes that:

- [ECMAScript 2024](https://tc39.es/ecma262/2024/multipage/numbers-and-dates.html#sec-math.sqrt)
  described `Math.sqrt` as implementation-approximated;
- [ECMAScript 2025](https://tc39.es/ecma262/2025/multipage/numbers-and-dates.html#sec-math.sqrt)
  returns the Number value of the exact square root; and
- [ECMAScript 2026](https://tc39.es/ecma262/2026/multipage/numbers-and-dates.html#sec-math.sqrt)
  retains that correctly rounded rule.

The correction changes the standards premise but not the implementation-risk
conclusion. Current ECMAScript defines the intended result; Node/V8 identity and
finite tests still do not attest to every deployed invocation.

## Reconciled facts

1. Current ECMAScript supplies the observable roundTiesToEven binary64 semantics
   required by the graph's ordinary arithmetic and `Math.sqrt`.
2. Node platform fields and support tiers identify and qualify builds; they are not
   floating-point-state or conformance attestations.
3. Pinned V8 source shows that denormal controls are concrete mutable state. Node
   also permits same-process native integration unless the execution profile
   restricts it.
4. Test262 and project corpora are finite and useful. They do not prove every
   unexecuted arithmetic cell or later runtime state.
5. The current graph-then-replay design does not bind exact verification of every
   original primitive result to the value returned.

## Minimum candidate architecture

| Layer                             | Classification              | Role and limit                                                                                                                                               |
| --------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Exact runtime/platform matrix     | Required                    | Admit only pinned, reviewed Node/V8/build/OS/architecture identities; no open-ended semver range                                                             |
| Controlled execution profile      | Required                    | Exclude unreviewed native integration and mutation paths; refuse when the profile cannot be established                                                      |
| Startup diagnostic                | Required diagnostic         | Check identities, hashes, binary64 encoding, verifier primitives, representative arithmetic, signed zero, and denormal behavior; does not prove later calls  |
| Per-invocation pre/post sentinels | Required diagnostic         | Detect observable premise drift near the returned computation; not a hostile-code security boundary                                                          |
| Single immutable actual trace     | Required proof binding      | Bind input, table, branch, operations, iterations, proof, and the value returned; a second execution is not a substitute                                     |
| Exact primitive verification      | Required proof              | Independently verify every actual `+`, `-`, `*`, and `/` result with exact integer/dyadic arithmetic and every actual square root with a rounding-cell proof |
| Cross-platform corpus             | Required admission evidence | Exercise every proposed matrix member across cold, warm, optimized, boundary, long-series, and hostile-state cases; not a universal proof                    |

The exact checker remains inside the declared trusted ECMAScript runtime. It is not
claimed to defeat a malicious engine that corrupts both Number and BigInt behavior.
Its purpose is to make support depend on the actual exercised results rather than a
runtime-name trust declaration.

## Native floating-point guard

A native guard that reads the rounding mode and MXCSR or FPCR is prudent diagnostic
hardening, but it is not required for the first Release 2 candidate if:

- the returned computation has complete exact operation verification;
- pre/post sentinels fail closed;
- the supported execution profile excludes native interference; and
- the threat model does not include malicious same-process code.

The guard cannot replace actual-trace verification and introduces a native surface
that the initial profile otherwise excludes. It becomes a new decision if native
integration is admitted or exact verification is weakened.

## Tail-only scope

This result covers the table-connected tail graph whose inputs are
`(degreesOfFreedom, testStatistic)`. The upstream G4 graph in
`reference/spikes/paired-t.ts` remains outside the current truth-error proof.
End-to-end paired-t support requires either the same trace and exact-operation
closure for G4 or an explicit public boundary that accepts `(df, t)` without
claiming the data-to-statistic path.

## Held decisions

- the initial Node, V8, executable, OS, and architecture tuples;
- official-binary identity and artifact-provenance rules;
- the enforceable process/isolation profile;
- trace schema, hash binding, and verification resource bound;
- startup and per-invocation sentinels;
- cross-platform runners and CPU-feature coverage;
- public failure classification; and
- separate upstream G4 closure.

## Reopen conditions

Reopen the adjudication if the numerical graph, proof model, table, supported input
domain, runtime family, or threat model changes; verification moves back to an
unbound replay; an operation is omitted; native integration is admitted; a matrix
tuple changes or fails admission evidence; or the claim expands to G4 or end-to-end
paired-t.

## Disposition

Proceed to a non-authoritative implementation candidate and its cross-platform
admission evidence. Keep the platform predicate, runtime support, supported domain,
Public Check, bundle, R2-D5 completion, and Release 2 issuance unselected.
