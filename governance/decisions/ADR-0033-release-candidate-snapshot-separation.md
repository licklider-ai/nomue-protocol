# ADR-0033: Release Candidate / Protocol Snapshot Separation

**Status: Accepted** (Release 1 pre-freeze governance repair, 2026-08-19; Release 1
pre-publication role clarification, 2026-08-24).

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
same SHA. Therefore neither `release_candidate_id` nor the eventual tagged
release-decision commit SHA can be written inside the commit that each value
identifies. Candidate content, release-control pinning, release-source signing,
and the later release decision must have explicit non-self-referential roles.

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

### 2. Candidate content commit C and release-control pin commit P

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
**release-control pin commit P** records both:

- `evidence/release-1/gate-index.json.release_candidate_id = C`; and
- the freeze manifest at
  `evidence/release-1/candidate-freeze-manifest.json`.

This two-commit structure avoids a self-referential commit SHA while preserving
an exact byte inventory of C.

After P, any change, addition, or removal in the frozen file set requires a new
candidate content commit and new freeze manifest, and invalidates dependent
evidence.

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

Candidate content commit C and the later **release source commit R** are recorded
in detached signed release metadata and archived source provenance. R is the exact
source tree used to create the signed `source-archive.tar.gz` and must remain
candidate-equivalent to C.

The later **release-decision commit D** is not a signing input. D records the
completed R1-14 evidence and final release authorization after R-derived artifacts
have been signed and verified. D is identified by the publication tag and by
external publication metadata created after D exists.

### 5. Snapshot hash publication is detached

The snapshot hash is never written into a file that participates in the snapshot
hash. After candidate equivalence passes at R, the steward generates the Protocol
snapshot manifest and hash from R.

The hash is distributed as detached release metadata alongside the
manifest/source archive and in release notes or other publication channels.
Those publication surfaces do not redefine Protocol meaning and are not inputs
to the snapshot hash.

No self-referential hash field is added to `CHARTER.md`, any normative
specification, registry, schema, or other snapshot-scoped artifact.

### 6. Release source R, release decision D, and publication tag

The Release 1 signing ceremony signs exactly the release artifacts generated from
**R**, including the source archive of R and the Protocol snapshot manifest generated
at R. Signed manifests identify C and R. They do not identify D.

After those artifacts verify, the steward creates **D**, which records the R1-14
close evidence and final release authorization. D may record the already-existing C,
P, and R SHAs. D cannot contain its own final SHA without becoming self-referential.

The Release 1 tag therefore identifies D **by role**: it points to the
release-decision commit that introduces the final R1-14 close record and final
release authorization. Source-controlled records do not embed D's exact SHA. After D
exists, the annotated tag message and GitHub Release notes record D's exact SHA
alongside C, P, R, and the Protocol snapshot hash.

Because D may differ from R only in permitted release-state/evidence paths outside the
Protocol snapshot, the signed Protocol snapshot manifest generated at R must also
match the snapshot-scoped files in tagged D path-by-path and by SHA-256. This
comparison is an independent release check in addition to cryptographic signature
verification.

GitHub's automatically generated source archive for the D tag is not the signed
Release 1 source artifact. The separately attached `source-archive.tar.gz` generated
from R is the signed source artifact, and publication metadata must state that
boundary.

## Consequences

- Gate closure no longer mutates the content-addressed Protocol snapshot.
- Gate/evidence commits do not perturb the Protocol content hash merely through
  their commit IDs.
- Candidate identity has no impossible self-reference.
- Tagged release-decision identity also has no impossible self-reference inside D.
- Public-facing and reference content is genuinely frozen before gate evidence
  begins even though it is not Protocol authority.
- Candidate equivalence does not require subprocess execution or git parsing.
- The signed source artifact has an explicit R identity distinct from tagged D.
- A valid signature over stale snapshot metadata is insufficient; R and D snapshot
  equivalence is checked independently.
- The full tagged release source can retain final gate decisions and evidence without
  granting them Protocol-semantic authority.
- The snapshot hash has no self-reference cycle.
- A content repair discovered after freeze causes an explicit new candidate rather
  than being smuggled into the release during gate closure.

## Non-effects

This decision changes no Record semantics, statistical semantics, Requirement
ID, public check, interpretation bundle, conformance judgment, verifier
verification behavior, or Release 1 gate criterion. It repairs only the
mechanics connecting a frozen candidate, mutable release decisions, signed release
source, and an immutable Public Draft snapshot.
