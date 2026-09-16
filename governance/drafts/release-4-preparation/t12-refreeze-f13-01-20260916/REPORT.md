# T12 re-freeze report: F13-01

Status: **UNISSUED CANDIDATE**.

## Boundary

The original frozen target `752a3ef876f27595cca31c4a106e70ffc7bd04df` remains a historical record. Its manifest SHA-256 is `f43cd0d1b3ba0042425139e77975199ba24a0e1db96aa65d18bf8bf997bfe3fb`. This directory is a separate re-freeze record; it does not rewrite the original package.

The re-frozen candidate source is `c62ba0f4ffe0e7a1992968f84adc81bd4546b217`. Its direct repair parent is `84627967352206e9d1ecc54c5ca6a735319d9785`; its repair evidence is included at the source commit. Current main integration commits are not ancestors of this source and are not part of this candidate lineage.

## F13-01 closure

The repair retains an authority-defined `parse_error` / `NRS-PARSE-FAILED` refusal when the finalizer's latched internal cause is `invalid_utf8`. The external result is `execution_refusal`, exit 2, and has no completed report or numerical-core invocation. It does not translate unrelated failures or clear the T04/F-01 latch.

Invalid UTF-8 retains the authority-defined external parse refusal without weakening F-01 precedence. A latched deadline remains a timeout refusal; resource and internal neighboring causes retain their existing classifications; a later valid report cannot resurrect a completed result after an execution failure.

The repair record binds Linux T09 coverage in normal and optimized modes, Linux T11 regression preservation, and the classified Windows result. T10 corpus bytes are unchanged because its Unicode-string corpus cannot encode the raw invalid UTF-8 byte path.

## Whole-candidate preservation

The manifest reuses the original T06–T11 inventory at its original source commits and hashes. No numerical truth, expected corpus, formal authority, registry, authoritative schema, issued Requirement, supported bundle, Public Check, production dispatcher, or public CLI is changed or adopted.

Public-supported and reference-supported remain distinct. A finite corpus is not an all-domain guarantee. A research candidate is not production support. Execution failure remains distinct from numerical indeterminate. Evaluation remains exact truth, then projection, then comparison. A positive p-value projected to zero is not a Public comparison pass. F-01 execution-failure precedence remains fixed. T10 expected values remain independent of candidate output.

Release 4 remains **UNISSUED CANDIDATE**. This package prepares an independent full T13 frozen-candidate review; it performs no T13 decision.
