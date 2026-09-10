# Arithmetic candidate validation record

Date: 2026-09-10. These are author execution observations, not independent review.

## Environment and dependency use

- CPython 3.12.14, NumPy 2.3.5; build and platform detail in results/environment.json.
- OPENBLAS_NUM_THREADS=1, OMP_NUM_THREADS=1, MKL_NUM_THREADS=1 for the numeric runs.
- Node v24.19.0; available pnpm 11.19.0, whereas package.json specifies 11.7.0.
  This mismatch is disclosed, not a claim to reproduce the original package-manager
  environment. Pinned installed dependencies were copied locally from another
  checkout of this public repository; pnpm reported the lockfile up to date and
  dependencies already installed. No tracked dependency manifest was changed.
- Python standard-library Fraction supplies the oracle; the candidate uses integer
  arithmetic and struct decoding. No paid or remote numerical service was used.

## Numerical checks

| Command / check                                       | Result                                                                                                                                    |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| run.py with the documented thread environment         | PASS: 968 cases; 18,380 exact equalities and 18,380 projection checks                                                                     |
| Second run.py invocation into separate scratch output | PASS: deterministic numeric replay across inputs, exact-results, float-results and summary                                                |
| verify.py --rerun /tmp/r4-arithmetic-20260910-replay  | PASS: 36 present input blobs and two expected absent paths; historical corpus and replay match                                            |
| resources.py                                          | PASS: 20,470 exponent-edge decodes and four independently crosschecked workloads                                                          |
| Historical ss-f-propagation.py                        | PASS: corpus SHA-256 558b6e65da273bf836204f7d0f5b4bae08cfd85918a23374a475197c2e851ca3; original numerical summaries and diagnostics match |
| Scope/preservation check                              | Only additions under arithmetic-candidate-20260910; no baseline tracked file edited                                                       |

Timings and machine metadata are not expected to replay exactly. They are not
supported resource limits. Python/BLAS cross-platform or cross-version numerical
identity was not tested anew. The historical record's portability limits remain.

## Repository checks

The first `pnpm validate` attempt failed before the validator executed: the tsx
CLI could not create its local IPC pipe (EPERM). The same validator was then run
using `node --import tsx tooling/src/validate.ts`, which avoids that CLI server.
This does not disable an audit or alter a validation rule. The first direct run
found the not-yet-created VALIDATION.md link; creating this record repairs it.
Both initial logs are retained, and the final direct log records the final result.

| Check                                             | Final result                       |
| ------------------------------------------------- | ---------------------------------- |
| pnpm typecheck                                    | PASS                               |
| node --import tsx tooling/src/generate.ts --check | PASS: 19 generated files unchanged |
| node --import tsx tooling/src/validate.ts         | PASS                               |
| pnpm format:check                                 | PASS                               |
| pnpm lint:markdown                                | PASS                               |
| git diff --cached --check                         | PASS                               |
| SHA256SUMS verification                           | PASS                               |

The aggregate pnpm check and full release/runtime/conformance suites were not
run: this increment changes no authoritative, reference-runtime, schema,
registered conformance or generated artifact. Numerical evidence comes from
this packet's dedicated checks. Research code is not wired into a public check.
The candidate's Research Gate review, runtime budget, platform coverage, final
projection policy and Lane 2 integration remain uncompleted work, not failed tests.

## Handoff integrity

SHA256SUMS covers the packet except itself and transient bytecode caches.
After checkout, use verify.py to check input blobs, preservation, the historical
rerun and checksums. Use its --rerun option after run.py to compare fresh numeric
results. identity.py and seal.py are authoring utilities; running them rewrites
metadata/checksums and is not a substitute for validation against a fixed head.
