# R3 Holm full-envelope experiment

Status: unissued exploratory implementation; no registered bundle or public check.
Date: 2026-09-11. Base: `6116ea1e4ff21c312a904ccf461f59554819c848`.

This packet implements the next unit in the
[full-envelope coupling plan](../holm-envelope-coupling-plan-20260911/README.md):
all nine envelope fields, proper producer-assigned instance identifiers, stored-byte
content-digest verification, independent expected-context binding, and separate
stage-aware reports/refusals. The existing pinned Holm bridge remains unchanged.

The `https://example.invalid/nomue-exercise/` identifiers in identities.json are
local exercise sentinels. They are not allocated Protocol identifiers or aliases
of registered bundles. The supported reference verifier refuses this bundle.

## Read and reproduce

- [DESIGN.md](DESIGN.md): exact candidate choices, scope and promotion gaps.
- [VALIDATION.md](VALIDATION.md): author evidence and independence boundary.
- [INPUTS.json](INPUTS.json): fixed source/runtime identities.
- [record.schema.json](record.schema.json), [expected.schema.json](expected.schema.json): closed input shapes.
- [report.schema.json](report.schema.json), [refusal.schema.json](refusal.schema.json): distinct output shapes.
- [diagnostics.json](diagnostics.json): unissued diagnostic vocabulary.
- [envelope.mjs](envelope.mjs): byte projection, digest and staged binding/execution.
- [test_envelope.mjs](test_envelope.mjs), [RESULTS.json](RESULTS.json): executed expectations.
- [example-record.jcs](example-record.jcs), [example-expected.json](example-expected.json), [example-report.json](example-report.json): synthetic complete example.

From the repository root, using the installed lockfile dependencies:

```sh
NOMUE_EXPERIMENT_PYTHON=/absolute/path/to/python3 node --import tsx governance/drafts/release-3-preparation/holm-envelope-experiment-20260911/test_envelope.mjs
```

The test writes only this packet's examples and results. The `.jcs` file has no
trailing newline and is not formatted. The example report uses an explicitly
synthetic fixed clock; real calls default to current time. The script also runs
all registered legacy conformance fixtures without changing their expectations.

`build_schemas.py` reproduces the derived schemas and runtime manifest from the
recorded base, refusing changed source templates. Run it with Python from any
working directory, then apply repository Prettier to this packet's JSON files.
It reads diagnostics.json as the local proposed vocabulary. No generator edits
an authoritative schema or registry.
