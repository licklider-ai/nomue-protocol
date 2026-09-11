# R3 Holm Record-body surface experiment

Status: unissued, disposable exploratory spike; author self-check only.
Date: 2026-09-11. Base and reused implementation identities: [INPUTS.json](INPUTS.json).

This packet makes the next Record-body integration question executable after the
[Holm promotion proposal](../holm-promotion-proposal-20260911/README.md) and the
[research asset integration](../../research-asset-integration-20260911/README.md).
It moves a deferred result slot into a closed declaration, supplied-input and
numeric-result body with a separately supplied expected context and scoped report.
It does not issue a Record schema, adopt a method, close B-2, or change an RFC window.

## Contents

- [DESIGN.md](DESIGN.md): candidate representation, adapter, limits and non-claims.
- [record-body.schema.json](record-body.schema.json): closed experimental body.
- [expected-context.schema.json](expected-context.schema.json): caller-owned context.
- [report-body.schema.json](report-body.schema.json): scoped experimental outcome.
- [surface.mjs](surface.mjs): strict storage admission and existing bridge adapter.
- [test_surface.mjs](test_surface.mjs): hand-authored structural controls and exact fractions.
- [example-record.jcs](example-record.jcs): canonical UTF-8 storage, without a newline.
- [example-expected.json](example-expected.json): separate illustrative caller context.
- [RESULTS.json](RESULTS.json): executed author checks.
- [REVIEW.md](REVIEW.md): independence boundary and next promotion work.

## Reproduce

From the repository root with the lockfile dependencies installed and an absolute
path to Python 3 selected for the existing isolated worker:

```sh
NOMUE_EXPERIMENT_PYTHON=/absolute/path/to/python3 node --import tsx governance/drafts/release-3-preparation/holm-record-surface-20260911/test_surface.mjs
```

The test rewrites only this packet's example and results files. Apply the repository
formatter to its JSON and source files afterwards; leave the `.jcs` bytes intact.
The candidate is deliberately outside registered schemas, supported bundles and
reference-verifier dispatch.
