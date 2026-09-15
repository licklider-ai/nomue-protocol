# F13-01 repair and revalidation report

Status: **UNISSUED CANDIDATE**.

## Finding and authority

The independent T13 review found that input byte `FF` produced the correct
application parse refusal, but final delivery replaced it with an internal error.
The historical reviewed target remains `752a3ef876f27595cca31c4a106e70ffc7bd04df`.

Existing authority uniquely fixes the result. `verify.ts` and `cli.ts` treat a
fatal UTF-8 decode failure as `parse_error` with `NRS-PARSE-FAILED`; the relying
party contract assigns exit 2 and no report. The T09 application performs this
classification before its numerical callback, so the numerical core is not
invoked. The T04 finalizer keeps the first invocation failure authoritative.
No authority or failure semantics were changed.

## Root cause and repair

`app.ts` intentionally records the internal cause as `invalid_utf8` while retaining
the external parse refusal. `invoke.py::delivery` previously retained a refusal only
when its public reason code literally equalled the internal cause. The comparison
therefore rejected `NRS-PARSE-FAILED` and synthesized
`NRS-INTERNAL-VERIFIER-ERROR`.

Commit `84627967352206e9d1ecc54c5ca6a735319d9785` preserves the existing exact-match rule and adds one constrained
compatibility case: internal `invalid_utf8` may retain only a `parse_error` whose
sole reason is `NRS-PARSE-FAILED`. It does not clear or translate the F-01 latch.
The exit computation was factored into a helper used by both delivery and tests.

Changed source and tests:

- `t09-check-report-lifecycle-20260915/invoke.py`
- `t09-check-report-lifecycle-20260915/test_f01.py`
- `t09-check-report-lifecycle-20260915/linux_tests.py`

## Focused and neighboring results

Linux run 34953342130 executed 54 integrated cases. Both normal and optimized
`FF` cases delivered `execution_refusal`, `parse_error`,
`NRS-PARSE-FAILED`, exit 2, no final report, and zero numerical-core invocations.
Valid UTF-8 malformed JSON remained the same parse refusal. Transport remained a
resource refusal; cleanup remained internal; a latched outer deadline remained a
timeout refusal. Canonicalization and generic internal controls retained their
existing classifications.

T09 normal and optimized suites each passed 263 assertions. F-01 normal and
optimized each passed the existing 10 controls plus the focused/neighbor checks.

`T09 INVALID-UTF8 PARSE-REFUSAL DELIVERY REPAIR — GO`

`T09 LIMITED REPAIR COMPLETE`

## T10 impact

The T10 corpus stores JSON `raw` values as Unicode strings and hashes their UTF-8
encoding. Its builder includes valid UTF-8 malformed JSON but cannot encode a raw
invalid UTF-8 byte path. The generator and expectations do not import or call final
delivery. Both T10 corpus tree objects are unchanged across the repair.

`T10 IMPACT: NONE`

## Regression preservation

Linux run 34953329312 is bound to `84627967352206e9d1ecc54c5ca6a735319d9785`, Ubuntu 24.04 x86_64, Node 24.14.0,
pnpm 11.7.0, and CPython 3.12.14. `pnpm check`, path observation, canonicalization,
T09 normal/optimized, and F-01 normal/optimized all exited 0. This includes 520 unit
passes, generated consistency, Phase 1, Phase 2A, and supported 0.2.1.

Windows reproduced exactly the previously classified R2 portability result: 517
unit passes and the same three failures in the same two files. All checks after the
expected stop were run separately and passed. No old expected data changed.

Formal authority, registries, supported bundle, schemas, conformance, production
reference source, and generated trees are unchanged. Release 4 remains unissued.
No semantic review is required for this authority-determined repair. The next
independent action is a complete T13 review of the post-repair T12 re-freeze target.
