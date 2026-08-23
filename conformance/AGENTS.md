# Agent Instructions - conformance/

Rules for editing conformance artifacts. Root rules in
[../AGENTS.md](../AGENTS.md) also apply.

- Conformance fixtures judge the covered behavior of the specification.
  Expected values come from the specification, its registries, and its
  schemas - never from the output of an implementation alone. Numeric
  expectations are cross-checked against independent oracles before pinning.
- Never overwrite a released fixture. A correction is a new fixture that
  supersedes the old one, with the change recorded in the manifest.
- Expected results are pinned in [manifest.yaml](manifest.yaml) (input hash,
  reason codes, exit code, projection hash); a fixture without pinned
  expectations does not exist as far as conformance is concerned.
- Schema changes require both positive and negative fixtures covering the
  change.
- Fixtures are authored via `tooling/src/phase1/author-fixtures.ts`, which
  asserts every declared expectation against the reference verifier before
  writing; re-running it rewrites fixtures and requires review like any other
  authoritative change.
- Fixture inputs may intentionally contain prohibited or invalid content
  (that is their purpose); they are excluded from the prohibited-content
  audits and are never treated as format documentation.
