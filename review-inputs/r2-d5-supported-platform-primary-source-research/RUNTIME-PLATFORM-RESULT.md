# Runtime/platform investigation result

## Identity and scope

- Provenance role: independent runtime/platform investigator
- Repository baseline: `cb4c04ad5898d6e95797d252c5ecd2d839fc42c7`
- Review mode: read-only
- Scope: Node build identity and support tiers, V8 implementation paths and
  floating-point state, native integration, and finite conformance evidence

## Primary-source ledger

| Source                                                                                                                                        | Material used                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [Node v24 process documentation](https://nodejs.org/docs/latest-v24.x/api/process.html)                                                       | `process.arch`, `process.platform`, and `process.versions` |
| [Node v24.20.0 BUILDING.md](https://github.com/nodejs/node/blob/v24.20.0/BUILDING.md)                                                         | Platform support tiers and release-test expectations       |
| [Node v24.20.0 C++ addons](https://github.com/nodejs/node/blob/v24.20.0/doc/api/addons.md)                                                    | Same-process native modules                                |
| [Node v24.20.0 permission model](https://github.com/nodejs/node/blob/v24.20.0/doc/api/permissions.md)                                         | Operational restrictions and their security boundary       |
| [V8 floating-point controls](https://github.com/v8/v8/blob/8a55ab2bed3aa45104e1987513f22f77c2e38e6d/src/base/fpu.cc)                          | FTZ/DAZ/FZ read and write paths                            |
| [V8 isolate state](https://github.com/v8/v8/blob/8a55ab2bed3aa45104e1987513f22f77c2e38e6d/src/execution/isolate.cc)                           | Captured denormal-flush state                              |
| [V8 local-isolate check](https://github.com/v8/v8/blob/8a55ab2bed3aa45104e1987513f22f77c2e38e6d/src/execution/local-isolate.cc)               | Consistency check against isolate state                    |
| [V8 Math builtin source](https://github.com/v8/v8/blob/8a55ab2bed3aa45104e1987513f22f77c2e38e6d/src/builtins/math.tq)                         | `Math.sqrt` lowering entrypoint                            |
| [V8 x64 backend](https://github.com/v8/v8/blob/8a55ab2bed3aa45104e1987513f22f77c2e38e6d/src/compiler/backend/x64/code-generator-x64.cc)       | Scalar binary64 arithmetic and square-root instructions    |
| [V8 Arm64 backend](https://github.com/v8/v8/blob/8a55ab2bed3aa45104e1987513f22f77c2e38e6d/src/compiler/backend/arm64/code-generator-arm64.cc) | Scalar binary64 arithmetic and square-root instructions    |
| [Test262 README](https://github.com/tc39/test262/blob/main/README.md)                                                                         | Conformance-suite scope and explicit incompleteness        |

## Established facts

1. `process.arch` and `process.platform` identify the target for which the Node
   binary was compiled. `process.versions` identifies Node and dependency versions,
   including V8. None of these values attests to active floating-point controls or
   numerical conformance.
2. Node platform tiers describe release engineering, test coverage, and supported
   deployment targets. They do not create a bit-level arithmetic guarantee.
3. Node native addons are dynamically linked native modules in the process. The
   permission model can restrict addon and worker use, but its own documentation
   does not present it as protection against malicious trusted code.
4. Pinned V8 source exposes denormal-flush state as mutable x86 FTZ/DAZ and Arm FZ
   controls. V8 records and checks that state in isolate-related code. A static
   operating-system and architecture tuple does not describe this state.
5. In the inspected pinned V8 source, the relevant x64 and Arm64 paths lower the
   candidate's scalar `+`, `-`, `*`, `/`, and `sqrt` operations to scalar hardware
   operations. No result-changing scalar fused contraction was identified in those
   paths. This is implementation evidence for one pinned source revision, not a
   permanent platform guarantee.
6. Test262 explicitly describes its coverage as broad but incomplete and subject to
   omissions or errors. Passing it or a smaller project corpus is useful admission
   evidence, not a proof over every future execution.

## Corrected conflict

The implementation investigation initially characterized current `Math.sqrt` as
implementation-approximated. That statement was a standards-version error and is
withdrawn. Direct adjudication of the primary standard establishes that the 2024
edition used that rule, while the 2025 and 2026 editions specify the Number value of
the exact square root. No decision in this result relies on the withdrawn statement.

## Non-guarantees

- The reviewed sources do not establish the active rounding and denormal controls
  for every invocation of an arbitrary Node process.
- They do not establish absence of same-process native interference.
- They do not extend pinned x64 and Arm64 observations to unreviewed architectures,
  future V8 revisions, custom Node builds, or arbitrary compilation flags.
- A startup test does not exclude a later state change, intrinsic mutation, or a
  different optimized execution path.

## Implications

- A static allowlist is necessary provenance and scope control but is not sufficient
  as the numerical predicate.
- A startup corpus is a useful fail-fast diagnostic but leaves a time-of-check to
  time-of-use gap.
- Checks bound to each returned invocation directly address state drift and backend
  deviation. They still operate inside a stated trusted-runtime boundary and do not
  defend against a malicious executable that can corrupt both computation and
  checking.

## Confidence

High for the Node identifier/support-tier limits and the existence of mutable V8
floating-point state. Medium-high for the pinned x64 and Arm64 backend observations.
No conclusion is made for an unreviewed build tuple.
