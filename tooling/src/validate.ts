/**
 * Full validation suite:
 *   A. registry schema validation (meta-schemas, duplicates, enums)
 *   B. requirement traceability (registry <-> normative documents)
 *   C. normative language lint
 *   D. authority manifest validation
 *   E. private-dependency audit
 *   F. English-only public-surface audit
 * plus gate/gate-index mirroring, conformance skeleton checks, and link audit.
 * Any issue fails the process (authority conflicts block release).
 */

import { Ajv2020 } from "ajv/dist/2020.js";
import addFormatsModule from "ajv-formats";

// ajv-formats is CommonJS; under Node ESM interop the callable plugin is the
// `default` member of the imported module object.
const addFormats = addFormatsModule.default;
import {
  checkAuthorityManifest,
  checkConformanceManifest,
  checkGateIndex,
  checkGatesRegistry,
  checkRequirementTraceability,
  checkSpecClassification,
  checkWithdrawnNotCurrentAuthority,
} from "./lib/checks.js";
import { auditMarkdownLinks } from "./lib/links.js";
import { lintNormativeMarkdown } from "./lib/markdown.js";
import { runPrivateDependencyAudit } from "./lib/private-audit.js";
import {
  exists,
  formatIssue,
  loadJson,
  loadYaml,
  markdownFiles,
  readText,
  walkFiles,
  type Issue,
} from "./lib/repo.js";
import {
  loadAuthorityManifest,
  loadConformance,
  loadGateIndex,
  loadGates,
  loadRequirements,
  loadStabilityTiers,
  loadSurfaces,
  loadYamlDocumentFor,
  PATHS,
  SCHEMA_FOR,
} from "./lib/load.js";
import { runPhase1Audits } from "./phase1/audits.js";
import { runPhase1CrossChecks } from "./phase1/registry-cross-checks.js";
import { compilePhase1Schemas } from "./phase1/schemas.js";
import { checkSnapshotManifestMechanism } from "./release/snapshot-manifest.js";

function schemaValidationIssues(): Issue[] {
  const issues: Issue[] = [];
  // strictRequired stays off: conditional subschemas legitimately use
  // `required` without redeclaring properties (see the tolerance policy).
  const ajv = new Ajv2020({
    allErrors: true,
    strictSchema: true,
    strictTypes: true,
    strictRequired: false,
    allowUnionTypes: true,
  });
  addFormats(ajv);
  for (const { document, schema } of SCHEMA_FOR) {
    let compiled;
    try {
      compiled = ajv.compile(loadJson<object>(schema));
    } catch (err) {
      issues.push({
        check: "registry-schema",
        file: schema,
        message: `meta-schema failed to compile: ${String(err)}`,
      });
      continue;
    }
    let data: unknown;
    try {
      data = loadYamlDocumentFor(document);
    } catch (err) {
      issues.push({
        check: "registry-schema",
        file: document,
        message: `failed to parse: ${String(err)}`,
      });
      continue;
    }
    if (!compiled(data)) {
      for (const error of compiled.errors ?? []) {
        issues.push({
          check: "registry-schema",
          file: document,
          message: `${error.instancePath || "/"} ${error.message ?? "invalid"}`,
        });
      }
    }
  }
  return issues;
}

/** Normative document trees: spec/ plus the canonicalization contract. */
function normativeDocPaths(): string[] {
  return [...markdownFiles("spec"), ...markdownFiles("canonicalization")];
}

function specDocsMap(): Map<string, string> {
  return new Map(normativeDocPaths().map((rel) => [rel, readText(rel)]));
}

/**
 * Public Release 1 artifacts are English-only. This intentionally rejects
 * Hiragana, Katakana, and CJK unified ideographs anywhere in a UTF-8 file so
 * prose, fixtures, comments, and generated output cannot silently reintroduce
 * Japanese text. Binary files are skipped when UTF-8 decoding is lossy.
 */
function publicLanguageIssues(): Issue[] {
  const prohibited = /[\u3040-\u30ff\u3400-\u9fff]/u;
  return walkFiles(".").flatMap((file): Issue[] => {
    if (file.isSymlink) return [];
    const content = readText(file.rel);
    if (content.includes("\uFFFD") || !prohibited.test(content)) return [];
    const line = content.slice(0, content.search(prohibited)).split("\n").length;
    return [
      {
        check: "public-language",
        file: `${file.rel}:${line}`,
        message: "public Release 1 artifacts must use English-only prose and test data",
      },
    ];
  });
}

function main(): void {
  const issues: Issue[] = [];

  issues.push(...publicLanguageIssues());

  issues.push(...schemaValidationIssues());
  if (issues.length > 0) {
    // Schema-invalid artifacts make the structural checks unreliable; stop here.
    report(issues);
    return;
  }

  const requirements = loadRequirements();
  const manifest = loadAuthorityManifest();
  const gates = loadGates();
  const gateIndex = loadGateIndex();
  const conformance = loadConformance();
  const tiers = loadStabilityTiers();
  const specDocs = specDocsMap();
  const knownIds = new Set(requirements.requirements.map((r) => r.id));

  issues.push(...checkRequirementTraceability(requirements, specDocs));

  for (const [rel, content] of specDocs) {
    for (const lint of lintNormativeMarkdown(content, rel)) {
      issues.push({
        check: "normative-lint",
        file: `${lint.file}:${lint.line}`,
        message: lint.message,
      });
    }
  }

  issues.push(
    ...checkAuthorityManifest(manifest, {
      exists,
      generatedFiles: () =>
        ["generated", "bindings/typescript/generated"].flatMap((root) =>
          walkFiles(root)
            .filter((f) => !f.isSymlink)
            .map((f) => f.rel),
        ),
      specDocs: normativeDocPaths,
    }),
  );
  issues.push(...checkSpecClassification(manifest, specDocs));
  issues.push(...checkGatesRegistry(gates, knownIds));
  issues.push(...checkGateIndex(gates, gateIndex));
  issues.push(...checkConformanceManifest(conformance, knownIds));
  issues.push(
    ...checkWithdrawnNotCurrentAuthority(
      requirements,
      conformance,
      loadSurfaces() as { entries: Array<{ surface_id: string; requirement_ids?: string[] }> },
      loadYaml<{ checks: Array<{ check_id: string; requirement_ids?: string[] }> }>(
        PATHS.publicChecks,
      ),
    ),
  );

  const tierNames = new Set(tiers.tiers.map((t) => t.tier));
  if (tierNames.size !== 3) {
    issues.push({
      check: "stability-tiers",
      file: "registries/stability-tiers.yaml",
      message: "the three stability tiers must each appear exactly once",
    });
  }

  const allMarkdown = new Map(
    walkFiles(".")
      .filter((f) => !f.isSymlink && f.rel.endsWith(".md"))
      .map((f) => [f.rel, readText(f.rel)] as const),
  );
  issues.push(
    ...auditMarkdownLinks(allMarkdown, {
      exists,
      content: (rel) => (allMarkdown.has(rel) ? allMarkdown.get(rel) : undefined),
    }),
  );

  issues.push(...runPrivateDependencyAudit());

  // Phase 1: schema compilation, cross-artifact checks, and code-path audits.
  issues.push(...compilePhase1Schemas().issues);
  issues.push(...runPhase1CrossChecks(requirements));
  issues.push(...runPhase1Audits());

  // Snapshot manifest mechanism (NRS-VERSION-0001, gate R1-07): not a
  // drift check against a frozen expectation (no Public Draft exists yet),
  // but proof that the content-addressed snapshot manifest and hash can be
  // produced right now against the current authoritative file set.
  const snapshotCheck = checkSnapshotManifestMechanism();
  if (!snapshotCheck.ok) {
    issues.push({
      check: "snapshot-manifest",
      message: `snapshot manifest mechanism failed: ${snapshotCheck.message}`,
    });
  }

  report(issues);
}

function report(issues: Issue[]): void {
  if (issues.length === 0) {
    console.log("validate: OK - registries, traceability, normative lint, authority,");
    console.log("gates, conformance manifest, links, private-dependency and language audits,");
    console.log("phase-1 schemas, cross-checks, code-path audits, and the snapshot");
    console.log("manifest mechanism are clean.");
    return;
  }
  console.error(`validate: ${issues.length} issue(s) found\n`);
  for (const issue of issues) {
    console.error("  " + formatIssue(issue));
  }
  console.error("\nAuthority conflicts and audit failures block release (NRS-GOV-0003).");
  process.exitCode = 1;
}

main();
