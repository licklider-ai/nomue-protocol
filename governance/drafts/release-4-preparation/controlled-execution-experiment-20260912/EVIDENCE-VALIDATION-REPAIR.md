# Saved evidence validation repair

Status: validation tooling repair; no numerical-method or release approval.

## Scope and preservation

The source is evidence commit `2732a26fd61d4e726fbd95b4d7622574cfcd9d82`.
The historical JSON, manifest, numerical sources and original oracle remain
byte-identical. The existing oracle's tolerance and 17-value historical input
scope are unchanged. This repair does not compare new CI captures with that
oracle or claim independent mathematical review.

## Changes

- `validate_saved_evidence.py` checks the manifest against its immutable evidence
  commit, the complete 12-file inventory, repository-file hashes, the executed
  tree, 23 code bindings and the other historical source/input bindings. It also
  checks current pinned code and inputs and rejects symlinks. Changing a saved
  result and its declared digest together does not bypass the commit anchor.
- The historical workflow is checked at the executed source commit. The current
  workflow is intentionally a successor: it adds these checks and full Git
  history. The archive checker does not assert equality of the two workflows or
  authorize reuse of the old execution as a run of the successor workflow.
- `validate_tail_oracle.py` runs the unchanged historical oracle, checks strict
  JSON, exact observation count, duplicate observations, aggregate and row
  results, finite probability values and the existing numerical comparisons.
  Missing inputs, empty coverage and disagreements produce a nonzero exit.
- CI runs archive validation and the mutation suite in normal and optimized
  modes, then uses the rejecting adapter for its oracle step.

## Self-review and validation

The implementer performed this adversarial self-review with Codex, using the
public repository, the earlier review in the same conversation, and local
CPython 3.12.14. This is not an independent review or a new research-gate decision.

Mutation controls cover changed evidence, a simultaneously rehashed manifest,
missing/extra files, symlinks, runtime drift, historical-input drift, absent Git
history, false success flags, duplicate observations, non-finite values and
numerical disagreement. CLI controls reproduce the original wrong-encoding,
empty-input and missing-input cases and require failure. The unchanged baseline
and both Python optimization modes are checked as positive controls.

The checker establishes local archive consistency, not authenticity of the
original CI stdout. Downloading the original artifact and checking its raw-byte
digest and declared transformations remains a distinct provenance check. The
immutable Git anchor is a reviewable repository reference, not a signature or
an external attestation. Future changes to pinned source require a new evidence
decision rather than silently relaxing these checks.
