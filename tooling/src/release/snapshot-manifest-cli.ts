/**
 * CLI for Release 1 Protocol snapshot and candidate-freeze manifests.
 *
 *   pnpm snapshot:manifest                         - print Protocol snapshot manifest
 *   pnpm snapshot:manifest --hash-only             - print Protocol snapshot hash
 *   pnpm snapshot:manifest --check                 - mechanism sanity check
 *   pnpm snapshot:manifest --check-public-boundary - reject private-only release paths
 *   pnpm snapshot:manifest --candidate-freeze      - print frozen candidate inventory
 *   pnpm snapshot:manifest --check-candidate       - compare current files with inventory
 */

import {
  buildCandidateFreezeManifest,
  buildSnapshotManifest,
  checkCandidateEquivalence,
  checkSnapshotManifestMechanism,
  snapshotHash,
} from "./snapshot-manifest.js";
import {
  assertPublicReleaseBoundary,
  checkPublicReleaseBoundary,
} from "./public-release-boundary.js";

function main(): void {
  const arg = process.argv[2];

  if (arg === "--check") {
    const result = checkSnapshotManifestMechanism();
    if (!result.ok) {
      console.error(`snapshot:manifest --check: FAILED - ${result.message}`);
      process.exitCode = 1;
      return;
    }
    console.log(`snapshot:manifest --check: OK (${result.message})`);
    return;
  }

  if (arg === "--check-public-boundary") {
    const result = checkPublicReleaseBoundary();
    if (!result.ok) {
      console.error(`snapshot:manifest --check-public-boundary: FAILED - ${result.message}`);
      process.exitCode = 1;
      return;
    }
    console.log(`snapshot:manifest --check-public-boundary: OK (${result.message})`);
    return;
  }

  if (arg === "--candidate-freeze") {
    try {
      assertPublicReleaseBoundary();
      console.log(JSON.stringify(buildCandidateFreezeManifest(), null, 2));
    } catch (error) {
      console.error(`snapshot:manifest --candidate-freeze: FAILED - ${String(error)}`);
      process.exitCode = 1;
    }
    return;
  }

  if (arg === "--check-candidate") {
    try {
      assertPublicReleaseBoundary();
    } catch (error) {
      console.error(`snapshot:manifest --check-candidate: FAILED - ${String(error)}`);
      process.exitCode = 1;
      return;
    }
    const result = checkCandidateEquivalence();
    if (!result.ok) {
      console.error(`snapshot:manifest --check-candidate: FAILED - ${result.message}`);
      process.exitCode = 1;
      return;
    }
    console.log(`snapshot:manifest --check-candidate: OK (${result.message})`);
    return;
  }

  const manifest = buildSnapshotManifest();

  if (arg === "--hash-only") {
    console.log(snapshotHash(manifest));
    return;
  }

  if (arg !== undefined) {
    console.error(`snapshot:manifest: unknown argument ${arg}`);
    process.exitCode = 2;
    return;
  }

  console.log(JSON.stringify({ ...manifest, snapshot_hash: snapshotHash(manifest) }, null, 2));
}

main();
