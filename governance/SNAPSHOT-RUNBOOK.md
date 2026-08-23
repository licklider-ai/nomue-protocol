# Public Draft Snapshot Runbook

**Status: Informative.** Step-by-step procedure for cutting a Public Draft
snapshot, written to satisfy gate R1-07's immutability/content-addressing
evidence requirement
([../authority/release-1-gates.yaml](../authority/release-1-gates.yaml)).
Following this runbook does not itself close gate R1-07 or any other gate;
gate decisions are steward actions taken separately against frozen candidate
content and frozen gate definitions.

This runbook implements the candidate/snapshot separation fixed by
[ADR-0033](decisions/ADR-0033-release-candidate-snapshot-separation.md) and the
C/P/R/D release-role model in [RELEASE-POLICY.md](RELEASE-POLICY.md).

## Preconditions

Before candidate freeze:

- `pnpm check` is green at the exact commit proposed as the Release 1
  candidate content commit;
- the worktree is clean;
- all intended Protocol/public content changes, including release-facing
  documentation and legal/license artifacts, are already present;
- all Release 1 gate definitions are final for this candidate;
- no further feature or statistical-scope change is intended for Release 1;
- private-only research material is absent from the public release repository
  tree. In particular, `governance/research-problems/**` MUST NOT exist in a
  Release 1 candidate. Research material may be maintained in a separate private
  research repository, but the Protocol repository does not depend on that
  repository at runtime, build time, or verification time.

Before selecting C, run:

```bash
pnpm snapshot:manifest --check-public-boundary
```

It must pass. The candidate-freeze command repeats this guard and fails closed if
private-only release paths are present.

After the release-control pin:

- `evidence/release-1/gate-index.json.release_candidate_id` names candidate C;
- `evidence/release-1/candidate-freeze-manifest.json` names the same C, records
  its frozen repository/public file set and hashes, and records the frozen
  gate-definition projection hash;
- only `authority/release-1-gates.yaml`, `evidence/release-1/**`, and
  `generated/RELEASE-1-GATES.md` may change before publication;
- changes to `authority/release-1-gates.yaml` are limited to its top-level
  `updated` value and each gate's `state`, `decision`, and `notes`; gate criteria
  themselves remain frozen;
- every applicable Release 1 gate must close with an explicit decision; there
  is no conditional pass.

## Commit roles

- **C — candidate content commit:** frozen content.
- **P — release-control pin commit:** records C and its freeze manifest.
- **R — release source commit:** exact source archived and signed for R1-14.
- **D — release-decision commit:** records completed R1-14 evidence and final
  release authorization; the Release 1 tag points to D.

D cannot contain its own SHA. Source-controlled policy and close records therefore
define D by role. D's exact SHA is recorded only after D exists, in the annotated tag
message and GitHub Release notes.

## Procedure

1. **Select candidate content commit C.**

   With all intended Release 1 content and gate criteria merged, confirm the
   public repository boundary, record the current full 40-character commit SHA
   as C, confirm `pnpm check` is green, and confirm the worktree is clean. Do not
   write C into the candidate's own files: a git commit cannot contain its own
   final SHA without changing that SHA.

2. **Capture C's candidate freeze inventory outside the checkout.**

   While still checked out exactly at C, run:

   ```bash
   pnpm snapshot:manifest --check-public-boundary
   pnpm snapshot:manifest --candidate-freeze \
     > ../candidate-freeze-manifest.json
   ```

   The output identifies C from the checkout, freezes all repository/public
   content except the explicitly mutable release-decision/evidence paths, and
   stores a separate hash of the gate-definition projection. The output is
   written outside the repository so it does not become part of the inventory
   it is creating.

3. **Create release-control pin commit P.**

   Return to the release branch at C and create one release-control commit P that:

   - sets `evidence/release-1/gate-index.json.release_candidate_id` to C; and
   - stores the exact generated inventory as
     `evidence/release-1/candidate-freeze-manifest.json`.

   No frozen content or gate criterion changes in P. Immediately run:

   ```bash
   pnpm snapshot:manifest --check-candidate
   ```

   It must pass before candidate-scoped gate evidence is generated.

4. **Perform the candidate-transition impact review.**

   When C replaces an earlier candidate, review the complete frozen-content delta
   from the prior candidate to C, not only the last repair commit. Record which
   gates require fresh evidence and why unaffected gate decisions remain valid.
   Any changed normative/conformance/canonicalization material must be assessed
   explicitly. Removed files must be checked against current gate-evidence
   references so evidence does not silently point to deleted material.

5. **Generate required gate evidence against frozen candidate content.**

   Run the verification, conformance, oracle, security, legal, external-offline,
   rebuild, canonical-case, and public-wording reviews required by the impact
   review and gate definitions. Record new evidence only under
   `evidence/release-1/`.

6. **Close non-signing gates without changing their criteria.**

   Gate review may change only release-state bookkeeping in
   `authority/release-1-gates.yaml`: top-level `updated` and gate `state`,
   `decision`, and `notes`. Required evidence, applicability, blocking categories,
   purpose, identities, and other gate-definition material are frozen. Evidence
   is recorded under `evidence/release-1/`.

   Gate-state changes do not change the Protocol snapshot because
   `release-decision`-only authority is outside the Protocol snapshot hash
   (ADR-0033).

7. **Establish candidate equivalence and select release source commit R.**

   After all applicable gates except R1-14 are ready, run:

   ```bash
   pnpm snapshot:manifest --check-public-boundary
   pnpm snapshot:manifest --check-candidate
   ```

   This must establish that:

   - the gate index and freeze manifest name the same candidate C;
   - every frozen path and raw file hash still matches the inventory captured at
     C;
   - the Release 1 gate-definition projection hash is unchanged; and
   - no private-only release path has re-entered the repository.

   The exact commit that satisfies these conditions and is used to generate the
   Release 1 source archive is R. Failure requires a new candidate before release
   can proceed.

8. **Produce the Protocol snapshot manifest and hash at R.**

   Check out exactly R and write release artifacts **outside the repository
   checkout**. For example:

   ```bash
   pnpm snapshot:manifest > ../release-artifacts/protocol-snapshot-manifest.json
   pnpm snapshot:manifest --hash-only
   ```

   The one-line `sha256:<hex>` output is the content-addressed identity of the
   Protocol snapshot. It depends only on the snapshot-scoped authoritative file
   set and bytes, not on C/P/R/D commit identities or release evidence.

9. **Archive R and prepare release-signing material.**

   Archive alongside one another:

   - the exact R source tree as a source tarball or equivalent;
   - the Protocol snapshot manifest generated at R;
   - the candidate-freeze manifest;
   - detached release metadata identifying C, R, and the Protocol snapshot hash.

   Then follow [RELEASE-SIGNING-RUNBOOK.md](RELEASE-SIGNING-RUNBOOK.md):

   ```bash
   pnpm release:signing:prepare -- \
     --archive ../release-artifacts/nomue-protocol-release.tar.gz \
     --snapshot-manifest ../release-artifacts/protocol-snapshot-manifest.json \
     --candidate <C> \
     --release-source <R> \
     --snapshot-hash sha256:<hex> \
     --out ../release-artifacts/signing
   ```

   A steward signs the three fixed targets with the dedicated release-signing
   Cloud KMS key outside CI and then runs `pnpm release:signing:verify` with the
   published public key/fingerprint. Successful verification is required evidence
   for R1-14.

   Independently compare the signed `protocol-snapshot-manifest.json` with the
   snapshot-scoped files at R, path by path and SHA-256 by SHA-256. Signature
   validity alone does not establish that a signed manifest describes R.

10. **Create release-decision commit D and close R1-14.**

    Commit the verified signing evidence and final steward decision only in the
    permitted release-decision/evidence surfaces. D may record C, P, and R SHAs.
    D MUST NOT record a purported SHA for D itself.

    The R1-14 close record identifies the publication target by role: the Release 1
    tag points to the release-decision commit that introduces that final close record
    and final release authorization.

11. **Perform the final D checks.**

    Check out D and run:

    ```bash
    pnpm snapshot:manifest --check-public-boundary
    pnpm snapshot:manifest --check-candidate
    pnpm snapshot:manifest --hash-only
    ```

    Then independently establish:

    - all frozen candidate paths still match C;
    - all three R1-14 signatures over R-derived targets verify;
    - the signed Protocol snapshot manifest matches the snapshot-scoped files in D
      path-by-path and by SHA-256; and
    - the snapshot hash computed at D equals the signed/published snapshot hash.

    A mismatch in any of these is a blocking defect.

12. **Create the release tag at D.**

    The human steward creates the Release 1 annotated tag pointing to D only after
    every applicable gate including R1-14 is closed and step 11 passes. The tag
    message records D's exact SHA together with C, P, R and the Protocol snapshot
    hash. D itself does not contain D's SHA.

13. **Publish release metadata without editing frozen source.**

    GitHub Release notes repeat C, P, R, D and the Protocol snapshot hash. They MUST
    state that the attached `source-archive.tar.gz` from R is the signed Release 1
    source artifact and that GitHub's automatically generated source archive for the
    D tag is not a KMS-signed target.

## What this runbook deliberately does not decide

- **Whether** to publish after gates close (the final steward release decision).
- **Where** source/build archives are hosted.
- **Human-readable version naming** beyond the immutable snapshot hash and the
  Protocol's own versioned identifiers.

## Reproducing a published snapshot's hash

Anyone who has the signed R source archive can reproduce the Protocol snapshot hash
independently: reconstruct or check out R, install the pinned dependencies, and run
`pnpm snapshot:manifest --hash-only`. Anyone checking out tagged D can independently
run the same command because D may differ from R only in release-state/evidence paths
that are outside the Protocol snapshot. A mismatch against the published hash is
evidence that the archive, tagged tree, or published metadata is wrong; it is never
resolved by choosing one value after the fact.
