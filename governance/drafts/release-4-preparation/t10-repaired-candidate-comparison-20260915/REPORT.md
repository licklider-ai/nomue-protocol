# T10 corrected corpus assessment

Status: **UNISSUED CANDIDATE**. All technical closure checks pass. The final T10
verdict is effective after this evidence packet is committed/pushed and local/remote
HEAD equality and a clean working tree are confirmed.

## Mandatory chronology

- A: f18712ac5b9ca0a1facd60cb0d04184e5994c398, original mismatch stop; untouched.
- B: c262931584bbdac0018ffdef59a9b5a186b7cc5c, corrected independent expectation freeze;
  committed and pushed before candidate repair or re-execution.
- C: 083c292090c2d921022af954888b9a74418f1237, narrow T09 repair and focused regressions;
  committed/pushed, local=remote and clean before the limited GO and T10 comparison.
- D measurement source: 98052127e51efbed12580077c3a6e4e002af3a11, comparison runners,
  Windows evidence and Linux workflow. The final evidence-only commit follows capture.

Original T09 historical HEAD is 60ce3a41770edde6e3cf6dc67ff470cd6207af10. Neither it
nor A was reset, rebased, amended or erased. B and C were separate immutable commits.

## T09 limited repair

**T09 CANONICALIZATION FAILURE CLASSIFICATION REPAIR — GO**.
**T09 LIMITED REPAIR COMPLETE**.

This decision preceded the first full corrected T10 run and applies only to the
canonicalization classification path. C catches the existing CanonicalizationError
only around report assembly and uses the already-existing canonicalization refusal.
The outer generic failure handler, numerical code, schemas and Medium/F-01 behavior
stay unchanged. Nine focused controls, T09 263 assertions in each actual mode, and
ten F-01 controls per mode passed before C closure. T01-T08 were not reopened.

## Corrected expectation and authority

B fixes canonicalization_failure, report absent, refusal output type/schema,
NRS-CANONICALIZATION-FAILED presence and exit 2 from pre-existing authority.
No conformance report or four not_run results are invented. Core call count 0 is a
separate internal regression assertion, not an external refusal member. Extra reason
codes/order, message/timestamps and verifier implementation metadata are not selected
as normative golden data. No new failure taxonomy or reportless/reportful decision
is created. The expectation correction did not use candidate actual as its truth.

Original failed freeze SHA-256:
`6fe8bb5fd1b4cdcf1d71da9748a6d64fc7d184bfd10a5b2fb17a5e0ca2d8e8a8`.
B revised manifest SHA-256:
`f7cea5d114c764f273006f2a0cc6f160d9ea6086c85b707e8eb39980fd916923`.
All original stop/freeze files and all B files remain unchanged.

## Comparison scope

Windows CPython 3.12.10: 174/174 normal and 174/174 optimized, equal semantic results;
125 numerical calls per mode. The actual core flags are 0 and 1. Overflow invokes no
core, emits no report/check carrier, and returns canonicalization failure with exit 2.
Fifteen projection and seven analytic tail components pass in both modes.

Scientific coverage remains the 70 independent truth Records, 23 inherited declared
mutations, 28 numerical gate Records, 49 structural/admissibility/input Records and
four multiple-mismatch cases. All 22 identities have single-mismatch witnesses.
All 97 eligible numerical cases per mode compare 22 independently fixed quantities.
C<B / C=B / C>B, exact and projected SSE zero, D04, positive p underflow, positive
subnormal p, exact F zero, all A/B/AB paths and dependency boundaries are retained.

No real eligible S-C indeterminate Record is invented; generic unresolved behavior
remains separately reviewed synthetic evidence. Projection/tail component cases are
explicitly not raw-Record admission claims. Finite corpus evidence is not a universal
whole-domain proof or a host real-time guarantee.

## Independence, preservation and review

B's static check covers source pins, exactly one expectation revision, unchanged raw
inputs/components, stdlib import allowlist and source-only Git read channel. Original
numeric Level C receipts and analytic component derivations are reused. No new oracle,
scientific method or mathematical semantics were introduced by this repair cycle.

Only T09 report.ts changes among pre-existing sources. T07, T08, G5, runtime eleven,
T03/T04 decisions, Medium profile, original receipts/manifests, formal authority,
production paths, registries, main and PR #331 are preserved. No public discussion or
PR creation is performed. The dedicated workflow measures the authorized research
branch only. No additional independent review is required under the given policy:
existing authority already determines the repaired behavior. T11 remains unstarted.

## Linux and final comparison results

Linux x86_64 / CPython 3.12.14 run 34939107292 succeeded at measurement source
98052127e51efbed12580077c3a6e4e002af3a11. CAPTURE pins the downloaded raw artifact
hashes; SOURCE-MANIFEST binds the repaired C runtime bytes. All 348 invocations
(174 normal, 174 optimized) matched B. Every invocation completed cleanup. Actual
worker/supervisor modes were 0/0 and 1/1 whenever numerical work was invoked; worker
CPU 25/26 and address-space 268435456 limits remained unchanged.

Every saved Linux semantic delivery equals B and the Windows delivery. Windows and
Linux component comparisons each passed 15 projection plus seven tail cases in both
modes: 88 component comparisons total. Counts describe finite execution, not extra
independent claim families. No mismatch remains in the corrected corpus; historical
mismatch A is deliberately retained.

Packet checks resolve B and original source pins, confirm A->B->C->D ancestry,
prove only report.ts changed among pre-existing artifacts, verify original T10 and
T09 historical hashes (with the explicit repaired report exception), and validate
71 G5, 33 T06/T07 and 11 runtime pins. TypeScript, Markdown, formatting, pnpm validate
and git diff --check are run on the final packet. No unrelated full numerical
experiment or new resource stress is introduced.

## Final verdict gate

T09 CANONICALIZATION FAILURE CLASSIFICATION REPAIR — GO.
T09 LIMITED REPAIR COMPLETE.

With the evidence commit/push/equality/clean gate confirmed in the final task reply:
T10 INDEPENDENT-EXPECTATION CORPUS — GO.
T10 COMPLETE.

No extra independent review is needed for this authority-alignment repair. No
unresolved authority choice or unexplained mismatch remains. This is an unissued
candidate maturity checkpoint, not formal Protocol support or Release 4 issuance.
T11 and later tasks remain unstarted.
