# T11 regression-preservation continuation

Status: **UNISSUED CANDIDATE**. This continuation retains the earlier `NOT READY`
stop at `ea2cb95356dba3a38850998fa2e322fdff1f471e`; it does not rewrite that stop
or the original REPORT/MANIFEST.

## Completed checks

Windows x64, Node 24.14.0 and Python 3.12.10:

- generated consistency: 19 files pass;
- Phase 1: 13 schemas, 16 canonicalization vectors, 132 conformance fixtures,
  the example, and eight evidence files pass;
- Phase 2A: 88 Phase 1 regression fixtures, 44 Phase 2A fixtures, the example,
  eight refusal fixtures, seven oracle datasets, and ten evidence files pass;
- the supported 0.2.1 surface: six `A2-1-*` fixtures pass;
- T09 focused classification: nine controls pass;
- T09 normal and optimized: 263 assertions in each actual Python mode pass;
- F-01 normal and optimized: ten controls in each actual Python mode pass.

Linux x86_64, Node 24.14.0, pnpm 11.7.0 and Python 3.12.14 ran at exact source
`2dcb4255cfbfefa2f22ad9c35b0717281cae563a`. GitHub Actions run
[34944226774](https://github.com/licklider-ai/nomue-protocol/actions/runs/34944226774)
completed successfully. The full repository check passed 55 test files and 520
tests, including format, Markdown, typecheck, repository validation, generated
consistency, Phase 1, Phase 2A and 0.2.1. T09 focused, normal, optimized and both
F-01 modes also passed as separate recorded commands.

## Windows failure classification

The earlier Windows unit receipt remains historical evidence: 517 tests passed and
three R2 candidate admission/selection tests failed. The R2 source, tests and six
saved evidence files predate T07 and remain byte-identical.

The unchanged test uses `/candidate/compiled` and a POSIX module path. On Windows,
host-native `path.resolve` produces `C:\candidate\compiled`, `path.sep` is `\`, and
the unchanged POSIX module string is not judged below that path. The same predicate
observed on Linux resolves to `/candidate/compiled`, uses `/`, and returns true.
All three tests pass there as part of the 520-test suite. The two selection failures
are downstream presentations of the same environment-validation failure.

Classification: **pre-existing Windows portability defect in R2 candidate test
infrastructure**. It is not a Release 4 shared-change regression, does not alter a
supported bundle outcome, and does not indicate drift in the saved R2 evidence.
No old expectation or R2 implementation is changed in T11.

## T09 collateral conclusion

The exact overflow reproducer remains a reportless `canonicalization_failure` with
exit 2 and zero numerical calls. Negative zero, duplicate members, unpaired
surrogates and malformed JSON retain their parse classifications. Reportful schema
failures remain reportful. Generic and CanonicalizationError transport failures
remain `internal_error`; they are not captured by the report-assembly catch. F-01
continues to suppress late report resurrection. No collateral failure, taxonomy
change, or numerical change was observed.

## Preservation and completion

The `.prettierignore` delta from T10 is exactly one comment plus the two raw T10
receipt paths named in the original stop record. The raw receipt SHA-256 values
remain `13ddd09bbc46c0f664361843ec45cd976b7a2cbb050ed8265fd28882be1b5f0a`
and `58bac097fa7fccfdd5fd8af82a8813e093a77e9cee97fa715c2aa6cfe523fcc9`.
No formal registry, supported bundle, schema, production/reference dispatcher,
old expectation, numerical meaning or public-admission meaning changed. Release 4
remains unissued. No new material semantics or independent semantic review is
required.

After the final evidence commit/push/equality/clean gate is confirmed:

**T11 OLD-VERSION / SHARED-CHANGE REGRESSION PRESERVATION — GO**.

**T11 COMPLETE**.

T12 remains unstarted.
