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
