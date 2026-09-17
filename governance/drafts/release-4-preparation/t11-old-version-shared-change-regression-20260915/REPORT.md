# T11 regression preservation: blocked execution receipt

Status: UNISSUED CANDIDATE; T11 NOT READY.

Starting HEAD: db2efb3e301ba66797c1093f914b2466326e2d81.
Branch: research/r4-t11-regression-preservation-20260915.
Inventory baseline (T06): ae1ad029179f31ae463882e8467e9367398263c9.

## Change surface and support inventory

T07 through T10 adds 137 files: candidate-only research artifacts and two
branch-scoped workflows. Every net change relative to T06 is additive. No existing
reference implementation, formal schema, registry, conformance expectation, package
or TypeScript configuration changed. Reference/tooling entry points do not import
these T07-T10 candidate modules. Candidate modules consume unchanged public helpers.

The current authority is registries/interpretation-bundles.yaml (registry 0.6.0):

- urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1 is the sole public_release=true
  target; it remains EXPERIMENTAL, not a Stable release assertion.
- urn:nomue:bundle:itgc-minimal:0.1.0-draft.1 and
  urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1 are immutable historical/development
  surfaces with public_release=false; the reference dispatches all three exactly.
- Refusal draft.3 is the current bundle-independent output protocol; draft.1 and
  draft.2 are superseded and retained, not reinterpreted.
- R2 paired-t and R4 balanced-two-factor remain unissued candidates. Candidate
  evidence is not public support or reference dispatcher registration.

| Change                      | Existing path potentially affected              | Evidence                                                                   | Result                                                                |
| --------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| T07 local schemas/validator | strict JSON, limits, identifier schema, Ajv     | Git diff and imports; existing unit suite                                  | Shared dependencies unchanged; validator instance local               |
| T08 adapter/loader          | T07 validation; fixed G5 numerical modules      | Git diff and dependency direction                                          | Candidate-only; no production dispatch integration                    |
| T09 report/lifecycle        | digest, strict JSON, refusal schema             | Existing verifier, exit-code, routing and lifecycle tests in full unit run | Shared source unchanged; focused rerun still pending                  |
| T09 limited repair          | report assembly exception classification        | C=083c292090c2d921022af954888b9a74418f1237; source inspection              | Catch local to candidate assembly; T11 focused/F-01 execution pending |
| T10 comparison support      | repository-wide formatting; dedicated workflows | pnpm check logs                                                            | Two raw receipts fail formatting; narrow ignore correction below      |

## Executed checks and failures

Host: Windows x64, Node 24.14.0. Full pnpm check was executed on the starting
source with only the formatting exclusions described below.

- Reference source sync: 24 mirrored files, one local adapter; four tests PASS.
- Original format check: FAIL on T10 raw HOST.json and SUMMARY.json.
- After two exact-path exclusions: format PASS, Markdown lint 647 files PASS,
  typecheck PASS, repository validation PASS.
- Vitest: 53 files PASS, two files FAIL; 517 tests PASS, three tests FAIL.
- Because pnpm check short-circuits, generated checks and Phase 1/2A/0.2.1
  conformance/evidence commands were not reached. They are not claimed green.

The three failures are in the R2 candidate admission/selection suites, not an
observed formally supported bundle failure. Expected admission ok=true and empty
errors; actual reports that filesystem-read grants do not bind the executable and
compiled candidate tree. Two selection checks return the existing generic evidence
mismatch diagnostic. The Linux synthetic paths are inspected with host-native
path.resolve/path.sep and raw modulePath.startsWith, which differs on Windows.
Environment-only failure is a supported hypothesis, not a completed Linux proof.

Six R2 preserved evidence files match their recorded byte lengths and SHA-256
exactly, including artifact-manifest SHA-256
2aef6ddd1177a6bcae62d32325a03486c7b0ee838b48f57d6b11078fa7cf42f2.
No R2 source or expected value was edited. The admission source/test last changed
at 5563bae511069cc3bc73a2e3db24d8448de9fe2a; selection source/test at
32549c855a3ecbdfb8761a617b1a3753cb7caa01. All are unchanged since T06.

## Formatting preservation correction

T10 final evidence commit db2efb3 introduced two byte-preserved raw JSON receipts
that the global formatter attempted to reformat. Only those two exact paths are
added to .prettierignore, consistent with existing immutable evidence exclusions.
No evidence bytes, expected behavior, numerical source or formal authority changed.
This is a validation-configuration issue, not a reason to regenerate old evidence.

## Blocker and remaining work

Additional targeted tests, remaining old-version suites and the proposed Linux
collector/workflow were rejected before execution by automatic approval review:
Selected model is at capacity. Repeated attempts after source/safety inspection
were also rejected. The collector/workflow was not created. No rejection was
bypassed. Required execution remains unavailable, so the user stop condition applies.

Remaining: Phase 1/2A/0.2.1 and generated checks; T09 focused, normal/optimized
controls and F-01; Linux full check to confirm the environment classification;
final evidence preservation checks. No new material semantics are needed or adopted.
No additional semantic review is currently requested. T01-T10 are not reopened.

T11 OLD-VERSION / SHARED-CHANGE REGRESSION — NOT READY.
T12 not started. Commit/push and final working-tree state are reported separately
in the task reply and are not presumed by this packet.
