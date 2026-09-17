# T09 limited canonicalization repair

Status: **UNISSUED CANDIDATE**. Only the canonicalization failure classification
path was reopened. T01-T08 and other T09 conclusions remain outside this repair.

Corrected independent expectation freeze (B):
`c262931584bbdac0018ffdef59a9b5a186b7cc5c`, pushed before source repair.
Original T09: `60ce3a41770edde6e3cf6dc67ff470cd6207af10`.
Original mismatch stop (A): `f18712ac5b9ca0a1facd60cb0d04184e5994c398`.

## Change

The sole existing runtime file changed is T09 report.ts. Its report-assembly
exception handler recognizes the existing CanonicalizationError class and calls
the already-defined NRS-CANONICALIZATION-FAILED refusal constructor. The generic
outer error handling remains unchanged. Transport failures, including an error of
that class raised outside report assembly, remain internal errors.

This restores the existing canonicalization_failure category, no report, required
canonicalization reason and existing exit 2. No schema, reason inventory, numerical
method, resource policy, F-01 latch, production dispatcher or registry changes.

## Focused results

REGRESSION records nine focused checks (seven ingress/report neighbors and two
transport-error controls), existing T09 tests with 263 assertions in each actual
Python mode 0/1, and ten F-01 controls in each mode. All pass on Windows / CPython
3.12.10. The overflow reproducer never invokes the numerical core and carries no
external conformance or downstream check result. F-01 still forbids late report
resurrection after an earlier failure.

These checks ran against the repaired source after the B freeze. No full T10
comparison ran before repair commit/push and the limited closure decision. The
subsequent closure record binds this repair commit and observed local/remote equality.

## Historical evidence

Original T09 manifest/measurements retain their original bytes and target; they do
not certify repaired report.ts. The original T10 failed freeze and stop files also
remain untouched. This packet's manifest pins the repaired runtime hash separately.
Old packet checkers that require the historical report hash are historical checks,
not authority to overwrite old evidence or label the repaired source as 60ce3a4.

Existing authority determines this bounded repair; no new material public behavior
or numerical method is chosen. No additional independent review is required under
the task's review policy. This does not issue formal Release 4 or start T11.
