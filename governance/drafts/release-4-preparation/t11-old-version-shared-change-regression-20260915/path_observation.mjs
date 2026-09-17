import path from "node:path";

const grant = "/candidate/compiled";
const modulePath = "/candidate/compiled/tooling/src/spikes/candidate.js";
const resolved = path.resolve(grant);

console.log(
  JSON.stringify({
    platform: process.platform,
    architecture: process.arch,
    node: process.version,
    grant,
    module_path: modulePath,
    resolved,
    separator: path.sep,
    compiled_basename: path.basename(resolved) === "compiled",
    module_under_grant: modulePath.startsWith(`${resolved}${path.sep}`),
    posix_control: modulePath.startsWith(`${path.posix.resolve(grant)}${path.posix.sep}`),
    source: "tooling/src/spikes/paired-t-supported-execution-admission-evidence-candidate.ts",
    scope: "Observation of the existing predicate; no source or expectation change",
  }),
);
