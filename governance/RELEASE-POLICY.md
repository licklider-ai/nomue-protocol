# Release Policy

## Public Draft snapshots

- Every published Public Draft is an **immutable snapshot**: once published, its
  Protocol content never changes.
- Every snapshot is **content-addressed**: its snapshot hash depends on the
  Protocol snapshot file set and file contents, not on a git commit identifier,
  release evidence, or mutable gate state.
- Release 1 gate evidence is evaluated against one **candidate content commit**
  whose full SHA is recorded by a later release-control commit.
- Before that pin is recorded, a candidate-freeze manifest is generated at the
  candidate content commit. It records both the frozen repository/public file
  inventory and a hash of the Release 1 **gate definitions**.
- For every published snapshot, the final source archive and release metadata
  identify both the candidate content commit and final release commit alongside
  the Protocol snapshot hash.

### Protocol snapshot scope

The Protocol snapshot and the release-decision state are deliberately separate.
The snapshot contains every artifact that is both:

1. classified `authoritative` in
   [../authority/authority-manifest.yaml](../authority/authority-manifest.yaml); and
2. assigned to at least one authority target other than `release-decision`.

An artifact whose only authority assignment is `release-decision` remains
fully authoritative about whether a release may occur, but it is not part of
the content-addressed Protocol meaning being released. Evidence, informative,
generated, and reference artifacts are likewise outside the Protocol snapshot
hash.

This separation allows gate state to move from open to closed after candidate
content is frozen without changing the Protocol snapshot under review. It does
not allow Protocol or public-content changes, or changes to gate criteria, to be
smuggled in during gate review.

### Candidate freeze and pin

The release sequence deliberately avoids asking a git commit to contain its own
SHA.

1. The steward selects a clean, green **candidate content commit C** after all
   intended Release 1 content changes are complete.
2. While checked out at C, the steward runs
   `pnpm snapshot:manifest --candidate-freeze` and writes its output outside the
   checkout temporarily. The manifest identifies C from the checkout's source
   commit, freezes the repository/public file set and raw SHA-256 bytes, and
   records a hash of the gate-definition projection.
3. A later release-control commit records both:
   - `evidence/release-1/gate-index.json.release_candidate_id = C`; and
   - the generated inventory at
     `evidence/release-1/candidate-freeze-manifest.json`.
4. Gate evidence begins only after that control commit exists and the candidate
   check confirms that current frozen content and gate definitions still match
   the inventory.

The freeze manifest hashes all repository files visible to the release tooling
except the tightly permitted mutable paths:

- `authority/release-1-gates.yaml`;
- files under `evidence/release-1/`; and
- `generated/RELEASE-1-GATES.md`, which is the generated view of the gate
  registry.

The gate registry is **not** wholly mutable merely because its file is excluded
from the file inventory. The freeze manifest separately hashes a canonical gate
definition projection containing the registry identity/version and each gate's
criteria. Only release-state bookkeeping is allowed to evolve after freeze:

- top-level `updated`;
- each gate's `state`;
- each gate's `decision`; and
- each gate's historical/closure `notes`.

Changing a gate's identity, title, purpose, applicability, required evidence,
blocking categories, related Requirement IDs, or other definition material
changes the projection hash and invalidates the candidate. Release review may
close gates; it may not move the goalposts.

The release tooling already excludes repository-internal/runtime directories
such as `.git`, `node_modules`, and `.venv`; workspace-only `env-report.json` is
also excluded. Release artifacts are written outside the checkout.

Any frozen-file change or addition/removal, or any gate-definition change,
requires a new candidate content commit, freeze manifest, and release-control
pin. Evidence that depended on the prior candidate is then stale and must be
regenerated as applicable.

Before publication, `pnpm snapshot:manifest --check-candidate` recomputes the
freeze inventory from the current filesystem and compares file paths and raw
SHA-256 hashes with the stored candidate-freeze manifest. It also requires the
freeze manifest and gate index to identify the same candidate content commit and
recomputes the gate-definition projection hash. A mismatch blocks release. The
check executes no Record-supplied code, network operation, shell, or external
process.

### Producing the manifest and the one-line snapshot hash

`pnpm snapshot:manifest` (`tooling/src/release/snapshot-manifest.ts`)
enumerates the Protocol snapshot scope above, hashes each file's content, and
computes one overall snapshot hash: SHA-256 over the UTF-8 byte sequence formed
by concatenating the fixed ASCII context tag `nomue/snapshot-manifest/v1`, a
single line-feed byte (0x0A), and the UTF-8 encoding of the RFC 8785 JCS
canonical form of the resulting manifest - the same canonicalization model this
specification applies to a single Record's content digest, with a distinct
domain tag per
[NRS-CANON-0020](../canonicalization/record-canonicalization.md#NRS-CANON-0020).

- `pnpm snapshot:manifest --hash-only` prints exactly one line
  (`sha256:<hex>`) - the value to state as "the hash of this specification
  snapshot" when a Public Draft is published.
- `pnpm snapshot:manifest` (no flag) prints the full manifest, including
  every hashed file's path, for archival alongside the release.
- `pnpm snapshot:manifest --check` is a mechanism sanity check run by
  `pnpm validate` on every commit: it does not compare against a frozen
  expectation, only that every snapshot-scoped file exists and hashes and that
  the computation is deterministic.
- `pnpm snapshot:manifest --candidate-freeze` emits the candidate freeze
  inventory from the current candidate content commit.
- `pnpm snapshot:manifest --check-candidate` is the gate/release guard that
  compares current frozen content and gate definitions with the stored
  inventory.

The Protocol snapshot manifest deliberately contains no source-commit member;
otherwise gate/evidence-only commits would perturb what is meant to be a content
address for unchanged Protocol content. Candidate and final release commit IDs
are carried by detached release metadata instead.

The snapshot hash is **detached release metadata**. It is never written into
`CHARTER.md`, a normative specification, registry, schema, or any other file
that participates in the hash. Doing so would create a self-referential hash
cycle. The hash is published alongside the manifest/source archive and in
release notes or other publication channels that do not define Protocol
meaning.

Running the manifest command during development does not publish anything or
close gate R1-07. The full release procedure is
[SNAPSHOT-RUNBOOK.md](SNAPSHOT-RUNBOOK.md).

## Gates and evidence

- Release 1 requires every applicable gate in
  [../authority/release-1-gates.yaml](../authority/release-1-gates.yaml) to be
  `closed` with an explicit decision, backed by evidence in
  [../evidence/release-1/](../evidence/release-1/README.md).
- **There is no conditional pass.** The decision values are `pass`, `fail`, and
  `not_applicable`; anything else is invalid and fails validation.
- An open deviation in a blocking category - core semantics, security,
  guarantee boundary, or rights - prevents release regardless of gate states.
- Changing candidate-frozen content or gate definitions invalidates the
  candidate and any dependent evidence. Permitted release-state/evidence updates
  excluded from the freeze inventory do not invalidate the candidate by
  themselves; they are the expected mechanism for recording gate review against
  frozen candidate content.

## What Phase 0 is and is not

- Phase 0 is an internal authority bootstrap. It is **not** a public release,
  and no release tag, published snapshot, or gate decision is created in
  Phase 0.
- No Stable 1.0 compatibility promise exists at this stage. Compatibility
  between Public Draft snapshots is not guaranteed.
- Whether the newest verifier reads older Public Draft snapshots is explicitly
  **not guaranteed** before Stable 1.0; interpretation of any snapshot is
  governed by the interpretation-bundle registry, and unsupported combinations
  fail closed.
