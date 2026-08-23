import * as fs from "node:fs";
import { prepareReleaseSigningBundle, verifyReleaseSigningBundle } from "./release-signing.js";

function fail(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function option(args: string[], name: string): string {
  const index = args.indexOf(name);
  const value = index === -1 ? undefined : args[index + 1];
  if (value === undefined || value.startsWith("--")) fail(`missing required option ${name}`);
  return value;
}

function optional(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (value === undefined || value.startsWith("--")) fail(`missing value for option ${name}`);
  return value;
}

function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "prepare") {
    const result = prepareReleaseSigningBundle({
      sourceArchivePath: option(args, "--archive"),
      snapshotManifestPath: option(args, "--snapshot-manifest"),
      candidateContentCommit: option(args, "--candidate"),
      releaseSourceCommit: option(args, "--release-source"),
      protocolSnapshotHash: option(args, "--snapshot-hash"),
      outputDir: option(args, "--out"),
    });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  if (command === "verify") {
    const publicKeyPath = option(args, "--public-key");
    const result = verifyReleaseSigningBundle({
      bundleDir: option(args, "--bundle"),
      publicKeyPem: fs.readFileSync(publicKeyPath, "utf8"),
      expectedFingerprint: optional(args, "--expected-fingerprint"),
    });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exit(result.ok ? 0 : 1);
  }

  fail(
    "usage: release-signing <prepare|verify> ...\n" +
      "  prepare --archive <tar.gz> --snapshot-manifest <json> --candidate <sha> --release-source <sha> --snapshot-hash <sha256:...> --out <dir>\n" +
      "  verify --bundle <dir> --public-key <pem> [--expected-fingerprint <sha256:...>]",
  );
}

main();
