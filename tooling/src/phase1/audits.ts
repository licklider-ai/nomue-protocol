/**
 * Phase 1 code-path audits:
 *  - external URI dereference audit (NRS-CORE-0004, NRS-SEC-0001)
 *  - Record-supplied execution surface audit (NRS-SEC-0002)
 *  - prohibited overall-status detection (NRS-VERIFY-0001)
 *
 * Patterns are assembled from fragments so these sources do not flag
 * themselves. Fixture inputs are excluded from the overall-status audit
 * because negative fixtures intentionally contain the prohibited fields.
 */

import { readText, walkFiles, type Issue } from "../lib/repo.js";

const join = (...parts: string[]): string => parts.join("");

const NETWORK_MODULES = ["http", "https", "net", "dns", "tls", "dgram", "undici"];
const EXECUTION_MODULES = [join("child", "_process"), "vm", join("worker", "_threads")];

function moduleImportRegex(modules: string[]): RegExp {
  const names = modules.join("|");
  return new RegExp(
    `(?:from\\s+|require\\s*\\(\\s*|import\\s*\\(\\s*)["'](?:node:)?(?:${names})["']`,
  );
}

function sourceFiles(prefixes: string[]): string[] {
  return walkFiles(".")
    .filter((f) => !f.isSymlink)
    .map((f) => f.rel)
    .filter(
      (rel) =>
        prefixes.some((p) => rel.startsWith(p)) &&
        /\.(ts|mts|cts|js|mjs)$/.test(rel) &&
        // Excluded: a development-time-only evidence generator that legitimately
        // shells out to a disjoint-lineage Python oracle; see
        // tooling/r1-08-oracle/README.md for the exclusion rationale.
        !rel.startsWith("tooling/r1-08-oracle/") &&
        // Excluded: this file's whole purpose is to name several network
        // primitives (node:http/https/net/dns/tls and the browser-style
        // XHR global) so it can monkey-patch them to THROW (network-call
        // interception evidence, gate R1-04) - the opposite of using them.
        // See evidence/development/offline-verification/README.md.
        // export-platform-run.ts and cross-platform-deviation-report.ts in
        // the same directory are NOT excluded and stay covered normally.
        rel !== "tooling/src/evidence/run-offline-verification.ts",
    );
}

/** No code path in reference/tooling sources may reach the network. */
export function auditExternalUriDereference(): Issue[] {
  const check = "uri-dereference-audit";
  const issues: Issue[] = [];
  const importRe = moduleImportRegex(NETWORK_MODULES);
  const fetchRe = new RegExp("\\b" + join("fe", "tch") + "\\s*\\(");
  const xhrRe = new RegExp("\\b" + join("XML", "Http", "Request") + "\\b");
  const wsRe = new RegExp("\\bnew\\s+" + join("Web", "Socket") + "\\b");
  for (const rel of sourceFiles(["reference/", "tooling/", "bindings/"])) {
    const content = readText(rel);
    for (const [name, regex] of [
      ["network-module import", importRe],
      ["fetch call", fetchRe],
      ["XHR use", xhrRe],
      ["WebSocket use", wsRe],
    ] as const) {
      if (regex.test(content)) {
        issues.push({ check, file: rel, message: `forbidden ${name} in verifier/tooling code` });
      }
    }
  }
  return issues;
}

/** No code path may execute Record-supplied code, processes, or plugins. */
export function auditExecutionSurface(): Issue[] {
  const check = "execution-surface-audit";
  const issues: Issue[] = [];
  const importRe = moduleImportRegex(EXECUTION_MODULES);
  const evalRe = new RegExp("\\b" + join("ev", "al") + "\\s*\\(");
  const functionRe = new RegExp("\\bnew\\s+" + join("Fun", "ction") + "\\s*\\(");
  for (const rel of sourceFiles(["reference/", "tooling/", "bindings/"])) {
    const content = readText(rel);
    for (const [name, regex] of [
      ["process/vm module import", importRe],
      ["dynamic code evaluation", evalRe],
      ["dynamic function construction", functionRe],
    ] as const) {
      if (regex.test(content)) {
        issues.push({ check, file: rel, message: `forbidden ${name} in verifier/tooling code` });
      }
    }
  }
  return issues;
}

/**
 * The report surface and verifier must not (re)introduce an overall status,
 * a VERIFIED value, or a whole-record validity boolean.
 */
export function auditProhibitedOverallStatus(): Issue[] {
  const check = "overall-status-audit";
  const issues: Issue[] = [];
  const forbidden: Array<[string, RegExp]> = [
    ["overall status property", new RegExp('"' + join("overall", "_status") + '"')],
    ["VERIFIED property", new RegExp('"' + join("VERI", "FIED") + '"\\s*:')],
    ["whole-record validity boolean", new RegExp('"' + join("is", "_valid") + '"')],
  ];
  const scanned = walkFiles(".")
    .filter((f) => !f.isSymlink)
    .map((f) => f.rel)
    .filter(
      (rel) =>
        (rel.startsWith("schemas/") ||
          rel.startsWith("reference/") ||
          rel.startsWith("bindings/") ||
          rel.startsWith("examples/")) &&
        /\.(json|ts|mts|js|mjs)$/.test(rel),
    );
  for (const rel of scanned) {
    const content = readText(rel);
    for (const [name, regex] of forbidden) {
      if (regex.test(content)) {
        issues.push({ check, file: rel, message: `${name} must not appear in the public surface` });
      }
    }
  }
  return issues;
}

/**
 * Bundle routing discipline (NRS-VERSION-0007): no default-bundle member in
 * any registry, and no positional/fallback bundle selection in the verifier.
 * Dispatch must remain exact identifier lookup only.
 */
export function auditBundleRoutingDiscipline(): Issue[] {
  const check = "bundle-routing-audit";
  const issues: Issue[] = [];

  const forbiddenIdentifiers: Array<[string, RegExp]> = [
    ["default-bundle member", new RegExp("\\b" + join("default", "_bundle"))],
    ["first-bundle member", new RegExp("\\b" + join("first", "_bundle"))],
    ["fallback-bundle member", new RegExp("\\b" + join("fall", "back_bundle"))],
  ];

  for (const rel of sourceFiles(["reference/", "tooling/", "bindings/"])) {
    const content = readText(rel);
    for (const [name, regex] of forbiddenIdentifiers) {
      if (regex.test(content)) {
        issues.push({ check, file: rel, message: `forbidden ${name} in verifier/tooling code` });
      }
    }
  }

  // Positional access into the bundle registry entry array is the seed of
  // every "first registered bundle" fallback; the verifier must never index
  // or iterate registry entries to pick behavior. This is a lint over the
  // named historical patterns, not a proof: the behavioral proof is the
  // routing fixture suite (ROUTE-001..008), and the registry side is
  // structurally closed by the interpretation-bundle meta-schema.
  const positional = new RegExp(
    join("entr", "ies") + "\\s*(?:\\[\\s*0\\s*\\]|\\.\\s*at\\s*\\(\\s*0\\s*\\))",
  );
  const iterFirst = new RegExp(
    "bundles\\s*\\.\\s*(?:values|keys|entries)\\s*\\(\\s*\\)\\s*\\.\\s*next\\b",
  );
  for (const rel of walkFiles("reference/verifier")
    .filter((f) => !f.isSymlink)
    .map((f) => f.rel)
    .filter((rel) => /\.(ts|mts|cts|js|mjs)$/.test(rel))) {
    const content = readText(rel);
    if (positional.test(content)) {
      issues.push({
        check,
        file: rel,
        message: "forbidden positional bundle-registry entry access in verifier code",
      });
    }
    if (iterFirst.test(content)) {
      issues.push({
        check,
        file: rel,
        message: "forbidden first-element iteration over the bundle map in verifier code",
      });
    }
  }

  const registryKey = new RegExp(
    "^\\s*(?:" +
      [join("default", "_bundle"), join("first", "_bundle"), join("fall", "back_bundle")].join(
        "|",
      ) +
      ")[A-Za-z0-9_]*\\s*:",
    "m",
  );
  for (const rel of walkFiles("registries")
    .filter((f) => !f.isSymlink)
    .map((f) => f.rel)
    .filter((rel) => rel.endsWith(".yaml"))) {
    if (registryKey.test(readText(rel))) {
      issues.push({
        check,
        file: rel,
        message: "forbidden default/first/fallback bundle member in a registry",
      });
    }
  }

  return issues;
}

/**
 * Strict JSON input path (NRS-CANON-0007, NRS-CANON-0008): every raw
 * verifier input must flow through parseStrictJson. Raw JSON.parse in the
 * verifier is permitted only inside strict-json.ts (the sanctioned call),
 * in resources.ts (repository-local schema/registry loading, never Record
 * input), or as the JSON.parse(JSON.stringify(...)) clone idiom. The CLI
 * and the verify pipeline must reference the strict parser, so canonicalize
 * and digest can never be laxer than verify.
 *
 * Like the routing audit, this is a lint over the plain spellings, not a
 * soundness proof (an aliased or computed call would evade it); the
 * behavioral proof is the strict_json fixture suite plus the
 * parseStrictJson-presence check below.
 */
export function auditStrictJsonInputPath(): Issue[] {
  const check = "strict-json-input-audit";
  const issues: Issue[] = [];
  const parseCallRe = new RegExp(join("JSON", "\\s*\\.\\s*parse\\s*\\("), "g");
  const cloneIdiomRe = new RegExp("^\\s*" + join("JSON", "\\s*\\.\\s*stringify\\s*\\("));
  const files = walkFiles("reference/verifier/src")
    .filter((f) => !f.isSymlink)
    .map((f) => f.rel)
    .filter((rel) => /\.(ts|mts|cts|js|mjs)$/.test(rel));

  for (const rel of files) {
    const content = readText(rel);
    const base = rel.split("/").pop() ?? rel;
    if (base === "strict-json.ts") continue;
    parseCallRe.lastIndex = 0;
    for (;;) {
      const match = parseCallRe.exec(content);
      if (match === null) break;
      const rest = content.slice(match.index + match[0].length);
      if (!cloneIdiomRe.test(rest) && base !== "resources.ts") {
        issues.push({
          check,
          file: rel,
          message:
            "raw JSON.parse outside the strict input path; verifier input must flow through parseStrictJson",
        });
      }
    }
  }

  for (const required of ["reference/verifier/src/verify.ts", "reference/verifier/src/cli.ts"]) {
    if (!readText(required).includes("parseStrictJson")) {
      issues.push({
        check,
        file: required,
        message: "strict input path missing: parseStrictJson is not referenced",
      });
    }
  }

  return issues;
}

export function runPhase1Audits(): Issue[] {
  return [
    ...auditExternalUriDereference(),
    ...auditExecutionSurface(),
    ...auditProhibitedOverallStatus(),
    ...auditBundleRoutingDiscipline(),
    ...auditStrictJsonInputPath(),
  ];
}
