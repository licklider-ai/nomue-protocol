# Public Draft Snapshot Runbook

**Status: Informative.** Step-by-step procedure for cutting a Public Draft
snapshot, written to satisfy gate R1-07's immutability/content-addressing
evidence requirement
([../authority/release-1-gates.yaml](../authority/release-1-gates.yaml)).
Following this runbook does not itself close gate R1-07 or any other gate;
gate decisions are steward actions taken separately against frozen candidate
content and frozen gate definitions.

This runbook implements the candidate/snapshot separation fixed by
[ADR-0033](decisions/ADR-0033-release-candidate-snapshot-separation.md).

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

- `evidence/release-1/gate-index.json.release_candidate_id` names the candidate
  content commit;
- `evidence/release-1/candidate-freeze-manifest.json` names the same commit,
  records its frozen repository/public file set and hashes, and records the
  frozen gate-definition projection hash;
- only `authority/release-1-gates.yaml`, `evidence/release-1/**`, and
  `generated/RELEASE-1-GATES.md` may change before publication;
- changes to `authority/release-1-gates.yaml` are limited to its top-level
  `updated` value and each gate's `state`, `decision`, and `notes`; gate criteria
  themselves remain frozen;
- every applicable Release 1 gate must close with an explicit decision; there
  is no conditional pass.

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

3. **Create the release-control pin commit.**

   Return to the release branch at C and create one release-control commit that:

   - sets `evidence/release-1/gate-index.json.release_candidate_id` to C; and
   - stores the exact generated inventory as
     `evidence/release-1/candidate-freeze-manifest.json`.

   No frozen content or gate criterion changes in this commit. Immediately run:

   ```bash
   pnpm snapshot:manifest --check-candidate
   ```

   It must pass before any gate evidence is generated.

4. **Generate gate evidence against frozen candidate content.**

   Run the required verification, conformance, oracle, security, legal,
   external-offline, rebuild, canonical-case, and public-wording reviews against
   C's frozen content and the frozen gate definitions. Record new evidence only
   under `evidence/release-1/`.

5. **Close gates without changing their criteria.**

   Gate review may change only release-state bookkeeping in
   `authority/release-1-gates.yaml`: top-level `updated` and gate `state`,
   `decision`, and `notes`. Required evidence, applicability, blocking categories,
   purpose, identities, and other gate-definition material are frozen. Evidence
   is recorded under `evidence/release-1/`.

   Gate-state changes do not change the Protocol snapshot because
   `release-decision`-only authority is outside the Protocol snapshot hash
   (ADR-0033).

6. **Establish candidate equivalence at the final release commit.**

   After all applicable gates except release signing are ready to close, run:

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

   Failure requires a new candidate before release can proceed.

7. **Produce the Protocol snapshot manifest and hash at the final release checkout.**

   Write release artifacts **outside the repository checkout**. For example:

   ```bash
   pnpm snapshot:manifest > ../release-artifacts/protocol-snapshot-manifest.json
   pnpm snapshot:manifest --hash-only
   ```

   The one-line `sha256:<hex>` output is the content-addressed identity of the
   Protocol snapshot. It depends only on the snapshot-scoped authoritative file
   set and bytes, not on candidate/final commit IDs or release evidence.

8. **Archive and prepare release-signing material.**

   Archive alongside one another:

   - the exact final release source commit as a source tarball or equivalent;
   - the Protocol snapshot manifest;
   - the candidate-freeze manifest;
   - detached release metadata identifying candidate C, the final release commit,
     and the Protocol snapshot hash.

   Then follow [RELEASE-SIGNING-RUNBOOK.md](RELEASE-SIGNING-RUNBOOK.md):

   ```bash
   pnpm release:signing:prepare -- \
     --archive ../release-artifacts/nomue-protocol-release.tar.gz \
     --snapshot-manifest ../release-artifacts/protocol-snapshot-manifest.json \
     --candidate <C> \
     --release <final-release-commit> \
     --snapshot-hash sha256:<hex> \
     --out ../release-artifacts/signing
   ```

   A steward signs the three fixed targets with the dedicated release-signing
   Cloud KMS key outside CI and then runs `pnpm release:signing:verify` with the
   published public key/fingerprint. Successful verification is required evidence
   for R1-14.

   Detached release metadata and signatures are not Protocol authority and are
   not inputs to the Protocol snapshot hash.

9. **Publish the snapshot hash without editing frozen source.**

   Publish the same snapshot hash in release notes and alongside the
   manifest/source archive. Other publication channels may repeat it. Do **not**
   write the hash into `CHARTER.md`, a normative specification, registry, schema,
   or another snapshot-scoped file: doing so would change the hash being stated.

10. **Create the release tag.**

    The human steward creates the Release 1 tag at the final release commit only
    after candidate equivalence, every applicable gate decision including R1-14,
    and artifact signing verification are complete. Agents do not autonomously
    create release tags.

11. **Re-run at the tag.**

    Check out the tagged commit and run:

    ```bash
    pnpm snapshot:manifest --check-public-boundary
    pnpm snapshot:manifest --check-candidate
    pnpm snapshot:manifest --hash-only
    ```

    The result must match the published snapshot hash byte-for-byte. A mismatch
    is a blocking defect.

## What this runbook deliberately does not decide

- **Whether** to publish after gates close (the final steward release decision).
- **Where** source/build archives are hosted.
- **Human-readable version naming** beyond the immutable snapshot hash and the
  Protocol's own versioned identifiers.

## Reproducing a published snapshot's hash

Anyone who has the archived source can reproduce the Protocol snapshot hash
independently: check out the archived final release commit, install the pinned
dependencies, and run `pnpm snapshot:manifest --hash-only`. A mismatch against
the published hash is evidence that the archive or published metadata is wrong;
it is never resolved by choosing one value after the fact.
