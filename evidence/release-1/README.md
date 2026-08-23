# Release 1 Evidence

This directory accumulates the evidence bundle for Release 1 gate decisions.
[gate-index.json](gate-index.json) tracks, per gate, the current state,
decision, evidence references, open deviations, reviewers, and decision time.
In Phase 0 every gate is `open` with a `null` decision and no evidence.

## Future bundle structure

A complete Release 1 evidence bundle will contain:

- `release-manifest.json` - the release candidate: source commit, content
  hashes, included artifacts.
- `gate-index.json` - per-gate state, decision, and evidence references.
- `hashes.sha256` - content addresses for every file in the bundle.
- Gate-specific evidence directories (one per gate).
- Run logs for conformance, verification, and rebuild runs.
- The fixtures and inputs those runs used.
- External review reports.
- Deviation records, each categorized; open deviations in blocking categories
  prevent release.

## Boundary

Phase 0 bootstrap validation output (CI runs of `pnpm check`) is evidence that
the authority bootstrap is coherent. It is **not** Release 1 gate evidence, and
nothing in this directory may present it as such. Gate evidence is produced
against a specific release candidate, after the gate's subject matter exists.
