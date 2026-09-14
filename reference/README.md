# Reference Implementations

Non-authoritative. Nothing in this directory defines specification meaning;
where an implementation and the specification disagree, the specification,
registries, schemas, and conformance suite govern (see
[../AUTHORITY.md](../AUTHORITY.md) and NRS-GOV-0006).

| Component                               | Content                                                                                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [verifier/](verifier/README.md)         | Reference verifier and CLI: parse, limits, bundle identification, schema and semantic conformance, digest recomputation, ITGC preconditions, Welch recomputation, verification report |
| [stats-kernel/](stats-kernel/README.md) | Minimal public statistics kernel: pure Welch two-sample t-test functions                                                                                                              |

Editing rules are in [AGENTS.md](AGENTS.md). Expected conformance values are
never derived from these implementations alone; numeric expectations are
cross-checked against independent oracles
([../evidence/development/phase-1/oracle/](../evidence/development/phase-1/oracle/README.md)).

## Source ownership and pinned consumption

The founder confirmed on 2026-09-14 that public reference implementation
development belongs in
[nomue-verifier](https://github.com/licklider-ai/nomue-verifier).
Protocol retains specification, registered check and conformance authority.

[SOURCE-PIN.json](SOURCE-PIN.json) identifies the exact upstream commit and
24 source files. These local files are pinned consumer copies so existing
offline conformance checks and candidate imports continue to work. They are
not a second implementation-development location. The local resources.ts
adapter is separately pinned and retains this repository's existing resource
and source-identity behavior. No numerical bytes or supported bundles change.

Make shared-source changes in Verifier first. Run
`pnpm check:reference-source` to detect local drift. With the exact upstream
commit checked out in detached-HEAD mode, run
`node tooling/reference-sync/check.mjs --source <checkout>` to compare it.
`--sync <checkout>` restores copies from the already-pinned source; it does
not adopt another version or overwrite the local adapter. To adopt a new
version, explicitly update the pin and inventory after the applicable
Protocol semantic/release gates, then run synchronization and conformance.
CI also checks against the immutable upstream commit, not only local hashes.

Existing signed releases, frozen review targets and historical tags retain
their contents. R3/R4 research/candidate work under tooling and evidence keeps
its existing ownership and completion path; moving reference source does not
promote those candidates. The imported historical experimental modules remain
experimental and are not new Release 1 support.

Migration source and retained release provenance are described in the
[Verifier ownership record](https://github.com/licklider-ai/nomue-verifier/blob/ebcb3a37ef721dd8c350a451d65381098757ef44/REFERENCE-OWNERSHIP.md).
