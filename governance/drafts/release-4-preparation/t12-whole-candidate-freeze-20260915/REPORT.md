# T12 whole-candidate freeze report

Status: **UNISSUED CANDIDATE**.

## Freeze boundary

Repository: `licklider-ai/nomue-protocol`.

Branch: `research/r4-t12-candidate-freeze-20260915`.

Candidate content commit and T12 parent:
`5478f30981da04faded03eaa0d15419a6665210d`. The final containing Git commit adds
only this T12 package and is the exact T13 review target. It does not alter the
candidate content inherited from T11.

The machine-readable boundary is `FREEZE-MANIFEST.json`. It binds source and
evidence using exact commits, repository-relative paths, Git-content SHA-256 values,
and provenance categories. A reference at an earlier commit is intentionally
historical; it is not relabelled as evidence generated at the T12 commit.

## Whole-candidate inventory

T06 fixes the unissued contract, profile, schema, bundle, and five check identifiers;
16 unissued Requirement candidates; three public contract surface candidates; the
22 mandatory quantities; and their T07/T08/T09 responsibility bindings. The T06
candidate explicitly records `supported: false`.

T07 supplies three closed candidate schemas and a relational validator. It verifies
identity, version and reference closure, all 22 mandatory quantity representations,
and the structural conformance/admissibility boundary without evaluating numerical
truth.

The reviewed numerical dependency remains commit
`66fa2bc201c86c62f21bb94825479427c24d8522`. Its G5 procedure and evidence are
referenced at that commit; T12 does not regenerate numerical truth. T08 is the
limited adapter from the T07 structure to that frozen procedure and keeps schema,
numerical, and report responsibilities separate.

T09 provides the integrated check, reason, report, controlled execution, and
lifecycle candidate. Its original final head
`60ce3a41770edde6e3cf6dc67ff470cd6207af10` remains historical evidence. The only
later candidate repair is the authority-determined canonicalization classification
at `083c292090c2d921022af954888b9a74418f1237`; the repaired `report.ts` is bound
separately from the historical T09 manifest.

T10 preserves both the original failed expectation freeze and the corrected
independent freeze. The immutable chronology is A
`f18712ac5b9ca0a1facd60cb0d04184e5994c398`, B
`c262931584bbdac0018ffdef59a9b5a186b7cc5c`, C
`083c292090c2d921022af954888b9a74418f1237`, and D measurement source
`98052127e51efbed12580077c3a6e4e002af3a11`. The corrected expectation manifest
SHA-256 is `f7cea5d114c764f273006f2a0cc6f160d9ea6086c85b707e8eb39980fd916923`.

T11 binds Phase 1, Phase 2A, 0.2.1, generated consistency, T09 collateral, and unit
regression evidence. Windows recorded 517 unit passes and three classified
pre-existing platform-path failures. Linux run `34944226774`, at source commit
`2dcb4255cfbfefa2f22ad9c35b0717281cae563a`, recorded 520 passes and no failures,
plus the full repository check and T09 collateral checks.

## Evidence provenance

The manifest separates formal authority references, independently reviewed
historical evidence, independently generated expected evidence, structural/schema
evidence, Linux execution evidence, Windows execution evidence, implementation
regression evidence, unissued candidate artifacts, and newly frozen reproducibility
metadata. Reused receipts retain their original source commits and host bindings.

Finite execution evidence supports only the exercised corpus and environments. It is
not an all-domain mathematical proof or a host real-time guarantee.

## Linux bindings

T10 Linux run `34939107292` is bound to measurement source
`98052127e51efbed12580077c3a6e4e002af3a11`, Linux x86_64, CPython 3.12.14, 348
invocations, 174 mode pairs, and saved raw result hashes. T11 Linux run
`34944226774` is bound to source commit
`2dcb4255cfbfefa2f22ad9c35b0717281cae563a`, Linux x86_64, Node 24.14.0, pnpm
11.7.0, and CPython 3.12.14.

## Preserved Protocol boundaries

- Public-supported and reference-supported remain distinct.
- A finite corpus is not an all-domain guarantee.
- A research candidate is not production support.
- Execution failure is distinct from numerical indeterminate.
- A declared result is comparison input, not a truth input.
- Evaluation remains exact truth, then projection, then comparison.
- A positive p-value projected to zero is not a Public comparison pass.
- F-01 execution-failure precedence remains fixed.
- T10 expected values remain independent of candidate output.

The formal authority, registries, supported interpretation bundle, schemas,
conformance assets, specification, and production reference verifier are byte-identical
between base `3880db43a64e1758494f3c78f6850daab0e3e9e9` and the candidate content commit.
The T12 checker enforces that boundary and restricts post-T11 changes to this package.

## Disposition

No new scientific, numerical, failure, or Public admission semantics are introduced.
No historical receipt is rewritten. Release 4 remains an unissued candidate. T13 is
the independent full review of the containing freeze commit; T12 performs no T13
review or publication action.
