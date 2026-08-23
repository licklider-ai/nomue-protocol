# ADR-0033: Release Candidate / Protocol Snapshot Separation

**Status: Accepted** (Release 1 pre-freeze governance repair, 2026-08-19).

## Problem

The pre-Release-1 process mixed three different things:

1. the **Protocol snapshot** whose specification meaning is being released;
2. the wider **release candidate content** submitted to gate review, including
   public documentation and reference/source material outside Protocol authority;
3. the **release-decision state** that records whether that candidate may be
   published.

That produced three circularities.

First, `authority/release-1-gates.yaml` is authoritative for the
`release-decision` target. The previous snapshot tool hashed every
`class: authoritative` artifact, including that mutable gate state. The
documented sequence froze a candidate and then closed gates, so gate closure
changed the supposed frozen snapshot.

Second, the snapshot runbook computed a hash and then instructed the steward to
write that hash into `CHARTER.md`. `CHARTER.md` is itself inside the hashed
Protocol surface, so writing the hash changed the hash.

Third, a git commit cannot contain its own final SHA as a field and keep that
same SHA. Therefore `release_candidate_id` cannot be written _inside_ the
candidate content commit that it identifies. Candidate content and the later
release-control pin must be separate commits.

The release process also needs to prevent non-authoritative but public candidate
content - such as README or reference source - from changing while external
verification and gate evidence are being collected.

## Decision

### 1. Protocol snapshot scope

A Public Draft Protocol snapshot contains artifacts that are:

- `class: authoritative` in `authority/authority-manifest.yaml`; and
- assigned to at least one authority target other than `release-decision`.

An artifact whose only authority assignment is `release-decision` is fully
authoritative about release state but is not part of the Protocol snapshot
whose meaning is being content-addressed.

At the time of this decision, this excludes
`authority/release-1-gates.yaml` from the Protocol snapshot while preserving
its release-decision authority.

Evidence, informative, generated, and reference artifacts remain outside the
Protocol snapshot hash. Their exclusion from that hash does **not** mean they
may drift during gate review; the candidate freeze below covers that wider
release content.

### 2. Candidate content commit and freeze manifest

The steward first chooses a clean, green **candidate content commit C** after all
intended Release 1 public/content changes are complete.

While checked out at C, before any release-control pin commit exists, the
steward runs the candidate-freeze command. The generated manifest names C from
the checkout's source commit and records raw SHA-256 hashes for every repository
file visible to the release tooling except paths deliberately allowed to evolve
while gates close:

- `authority/release-1-gates.yaml`;
- material under `evidence/release-1/`; and
- `generated/RELEASE-1-GATES.md`.

Repository-internal/runtime directories skipped by the repository walker (`.git`,
`node_modules`, `.venv`) are not candidate content; workspace-only
`env-report.json` is also excluded. Release artifacts are generated outside the
checkout.

The freeze manifest is written outside the candidate checkout first. A later
**release-control commit** records both:

- `evidence/release-1/gate-index.json.release_candidate_id = C`; and
- the freeze manifest at
  `evidence/release-1/candidate-freeze-manifest.json`.

This two-commit structure avoids a self-referential commit SHA while preserving
an exact byte inventory of C.

After that release-control commit, any change, addition, or removal in the
frozen file set requires a new candidate content commit and new freeze manifest,
and invalidates dependent evidence.

### 3. Candidate equivalence before publication

Before publication, release tooling rebuilds the frozen-file inventory from the
current filesystem and compares its file set and SHA-256 bytes to the stored
candidate-freeze manifest. It also requires the gate index and freeze manifest
to name the same candidate content commit.

This check does not invoke git, a shell, a subprocess, the network, or
Record-supplied code. It therefore remains inside the repository's execution
surface restrictions and behaves the same on supported environments.

A mismatch blocks release and requires a new candidate.

### 4. Content-addressed Protocol snapshot

The Protocol snapshot manifest contains the snapshot-scoped authoritative file
set and hashes only. Its snapshot hash does **not** include a source-commit
identifier: a gate/evidence-only commit must not change the content address of
otherwise byte-identical Protocol content.

The candidate content commit and final release commit are instead recorded in
detached release metadata and in archived source provenance.

### 5. Snapshot hash publication is detached

The snapshot hash is never written into a file that participates in the snapshot
hash. After all gates close and candidate equivalence passes, the steward
generates the Protocol snapshot manifest and hash from the final release
checkout.

The hash is distributed as detached release metadata alongside the
manifest/source archive and in release notes or other publication channels.
Those publication surfaces do not redefine Protocol meaning and are not inputs
to the snapshot hash.

No self-referential hash field is added to `CHARTER.md`, any normative
specification, registry, schema, or other snapshot-scoped artifact.

### 6. Release tag

The Release 1 tag points to the final release commit: the commit containing the
closed release-decision state after candidate-equivalence validation. Detached
release metadata records:

- the candidate content commit C;
- the final release commit; and
- the Protocol snapshot hash.

The candidate freeze manifest records which wider public/repository content was
held fixed while the gate evidence was produced.

## Consequences

- Gate closure no longer mutates the content-addressed Protocol snapshot.
- Gate/evidence commits do not perturb the Protocol content hash merely through
  their commit IDs.
- Candidate identity has no impossible self-reference.
- Public-facing and reference content is genuinely frozen before gate evidence
  begins even though it is not Protocol authority.
- Candidate equivalence does not require subprocess execution or git parsing.
- The full release source can retain gate decisions and evidence without granting
  them Protocol-semantic authority.
- The snapshot hash has no self-reference cycle.
- A content repair discovered after freeze causes an explicit new candidate
  rather than being smuggled into the release during gate closure.

## Non-effects

This decision changes no Record semantics, statistical semantics, Requirement
ID, public check, interpretation bundle, conformance judgment, verifier
verification behavior, or Release 1 gate criterion. It repairs only the
mechanics connecting a frozen candidate, mutable release decisions, and an
immutable Public Draft snapshot.
