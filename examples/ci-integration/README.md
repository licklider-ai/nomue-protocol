# CI Integration Example

**Informative, non-normative** (see [../README.md](../README.md)). A
template, not a runnable workflow of this repository: copy
[github-actions-pr-gate.yml](github-actions-pr-gate.yml) into a third
party's own repository and fill in the two `REPLACE_WITH_*` placeholders
(a pinned commit of this repository, and the path where that third party
keeps its own Record files).

## What it demonstrates

- Consuming the machine-readable `--format json` output added to
  `pnpm nomue-record verify` in the Phase 2A relying-party tooling
  increment.
- Reading the documented exit-code contract
  ([../../spec/verification/relying-party-interface.md](../../spec/verification/relying-party-interface.md),
  NRS-VERIFY-0025) rather than inventing pass/fail logic from scratch.
- Uploading the full JSON report as a build artifact instead of collapsing
  it to a single badge - the CI step's own green/red already summarizes
  more than a report alone states (NRS-VERIFY-0024), so the underlying
  scoped results stay inspectable.
- Pinning the verifier to an exact commit, since this specification makes
  no Stable 1.0 compatibility promise yet
  ([../../governance/RELEASE-POLICY.md](../../governance/RELEASE-POLICY.md)).

## What it does not demonstrate

- How to obtain or author the Record file itself - see
  [../../spec/emission/README.md](../../spec/emission/README.md).
- Any judgment about scientific validity: the workflow blocks a PR on
  structural/computational failure only, exactly as the verifier itself
  reports it, never on anything the report does not state.
