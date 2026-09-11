# Individually inspected historical research assets

Status: informative archival preservation only, 2026-09-11.

These assets remained on branches after their contemporary work progressed.
Each entry in `INDEX.json` records the original commit, path, Git blob,
SHA-256 and size, together with its stored path and checksum. Original
commits remain the reproduction targets. Historical verdicts and statements
about open issues describe those targets, not current repository state.

## Preserved records

- The R4 author self-review from PR #182 is preserved without merging its
  conflicting, superseded preparation-document changes.
- The original R3 SR-L review records its count-repair findings and expressly
  disclaims a separate-context pass. Later correction records already exist.
- R2 endpoint-truth and inverse-beta reviews retain their bounded findings.
- The R2 truth-error author self-review is stored as `SELF-REVIEW-RESULT.md`,
  alongside the different independent `REVIEW-RESULT.md`. Its NO-GO and the
  independent review's GO are attributed historical conclusions, not merged
  into a fabricated common verdict or a new acceptance decision.
- The original R2 truth-boundary review and close review each contained one
  Japanese scope line. Their archival transcriptions translate only that line
  into English and add a disclosure; both original and stored hashes are
  recorded. These two files are not claimed to be byte-identical originals.

## Inert development assets

`source-snapshots/` preserves ten original source, test, candidate or review
protocol files as `.txt` snapshots. They include the alternate R2 endpoint
composition, its tests, a rational oracle, and adversarial regression probes.
This retains useful development work without registering old tests in the
current suite or adding obsolete implementations to current tooling.

The contents are byte-identical to their recorded source blobs. The added
`.txt` suffix is intentional: these files are historical text, not callable
modules. To reproduce them, use the complete original commit and its pinned
dependencies. Their original relative imports are not valid instructions to
execute them from the archive directory. No fresh numerical correctness or
compatibility verdict is issued by this preservation pass.

Temporary CI materializers and publication workflows are not restored. Old
transport bundles that deliberately fail ordinary repository formatting are
not copied wholesale; their original commits remain available. Useful review
results are retained separately with the original transport identities.

## Verification and provenance

The integration coordinator inspected each record's scope, findings and
provenance boundaries, checked source identities, and confined extraction to
the listed historical assets. Source snapshots received archival path and
dependency inspection, not a fresh scientific implementation review. No
original primary paper was reread for this collection. OpenAI Codex assistance
prepared this index and the two disclosed scope-line translations; it does
not supply a new independent review of the historical implementations.

All untransformed entries must match their original Git blobs byte for byte.
Current reference implementation, tooling, workflows, dependencies, authority,
registries and conformance remain unchanged by this collection.
