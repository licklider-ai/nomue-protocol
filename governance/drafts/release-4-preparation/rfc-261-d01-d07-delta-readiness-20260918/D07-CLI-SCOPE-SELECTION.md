# D07 CLI scope selection for the RFC 261 amendment

Status: **Selected amendment scope — not Release 4 adoption or issuance**.

## Selection

The RFC 261 D01/D07 amendment discussion excludes CLI exit-code semantics for a
completed D07 `indeterminate` result from Release 4's supported public surface.
NRS-VERIFY-0025 remains unmodified: its existing five exit-code meanings are not
extended, reinterpreted, or used to signal an indeterminate-only report.

The D07 distinction is conveyed through the scoped detailed verification report.
Relying parties that need to distinguish pass, proved mismatch, and completed
indeterminate outcomes parse that report rather than a process exit code.

## Basis and limits

The bounded exact-head review of this preparation package identified this path as a
viable way to preserve the current CLI contract while making the proposed D07 report
semantics discussable. The review result is an input to this scope selection; it is
not an RFC decision, a public review receipt, or implementation clearance.

This selection does not issue a report schema, reason code, identifier, Public
Check, Bundle, or Release 4 procedure. Any eventual authoritative change must be
separately coupled, versioned, reviewed, and implemented after the RFC decision.
