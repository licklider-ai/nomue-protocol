/**
 * TypeScript binding generation from the Phase 1 JSON Schemas.
 * Output is generated and non-authoritative; the schemas govern.
 *
 * Cross-schema URN references are inlined into one self-contained schema per
 * target before json-schema-to-typescript compiles it (the compiler does not
 * resolve URN identifiers, and nothing may be fetched).
 */

import { createHash } from "node:crypto";
import { compile } from "json-schema-to-typescript";
import { loadJson, readText } from "../lib/repo.js";
import {
  PHASE1_SCHEMA_FILES,
  RECORD_2A_SCHEMA_ID,
  RECORD_SCHEMA_ID,
  REFUSAL_2A_SCHEMA_ID,
  REPORT_2A_SCHEMA_ID,
  REPORT_SCHEMA_ID,
  ROUTING_ENVELOPE_SCHEMA_ID,
} from "./schemas.js";

const PREFIX_BY_ID: Record<string, string> = {
  "urn:nomue:schema:common:identifier:0.1.0-draft.1": "CommonIdentifier",
  "urn:nomue:schema:common:execution-outcome:0.1.0-draft.1": "ExecutionOutcome",
  "urn:nomue:schema:common:execution-outcome:0.2.0-draft.1": "ExecutionOutcome2a",
  "urn:nomue:schema:profile:itgc-minimal:0.1.0-draft.1": "ItgcPayload",
  "urn:nomue:schema:profile:itgc-guarantee:0.2.0-draft.1": "ItgcGuaranteePayload",
  "urn:nomue:schema:record:0.1.0-draft.1": "RecordSchema",
  "urn:nomue:schema:record:0.2.0-draft.1": "RecordSchema2a",
  "urn:nomue:schema:verification-report:0.1.0-draft.1": "ReportSchema",
  "urn:nomue:schema:verification-report:0.2.0-draft.1": "ReportSchema2a",
  "urn:nomue:schema:verifier-refusal:0.2.0-draft.1": "RefusalSchema",
  "urn:nomue:schema:verifier-refusal:0.2.0-draft.2": "RefusalSchemaDraft2",
  "urn:nomue:schema:verifier-refusal:0.2.0-draft.3": "RefusalSchemaDraft3",
  "urn:nomue:schema:routing-envelope:0.2.0-draft.1": "RoutingEnvelope",
};

type Node = Record<string, unknown>;

function rewriteRefs(node: unknown, ownerId: string): unknown {
  if (Array.isArray(node)) return node.map((item) => rewriteRefs(item, ownerId));
  if (typeof node !== "object" || node === null) return node;
  const out: Node = {};
  for (const [key, value] of Object.entries(node as Node)) {
    if (key === "$ref" && typeof value === "string") {
      let targetId = ownerId;
      let fragment = "";
      if (value.startsWith("#")) {
        fragment = value.slice(1);
      } else {
        const [id, frag] = value.split("#", 2);
        targetId = id as string;
        fragment = frag ?? "";
      }
      const prefix = PREFIX_BY_ID[targetId];
      if (prefix === undefined) throw new Error(`unknown schema reference ${value}`);
      if (fragment === "") {
        out[key] = `#/$defs/${prefix}__root`;
      } else {
        const defName = fragment.split("/").pop() as string;
        out[key] = `#/$defs/${prefix}__${defName}`;
      }
    } else {
      out[key] = rewriteRefs(value, ownerId);
    }
  }
  return out;
}

function bundleSchema(targetId: string): Node {
  const schemas = new Map<string, Node>();
  for (const file of PHASE1_SCHEMA_FILES) {
    const schema = loadJson<Node>(file);
    schemas.set(schema["$id"] as string, schema);
  }
  const defs: Node = {};
  for (const [id, schema] of schemas) {
    const prefix = PREFIX_BY_ID[id];
    if (prefix === undefined) throw new Error(`no prefix for ${id}`);
    const schemaDefs = (schema["$defs"] ?? {}) as Node;
    for (const [name, def] of Object.entries(schemaDefs)) {
      defs[`${prefix}__${name}`] = rewriteRefs(def, id);
    }
    if (id !== targetId) {
      const { $defs: _defs, $id: _id, $schema: _meta, ...root } = schema;
      if (Object.keys(root).length > 0) {
        defs[`${prefix}__root`] = rewriteRefs(root, id);
      }
    }
  }
  const target = schemas.get(targetId);
  if (target === undefined) throw new Error(`target schema ${targetId} not found`);
  const { $defs: _targetDefs, ...targetRoot } = target;
  return { ...(rewriteRefs(targetRoot, targetId) as Node), $defs: defs };
}

function sourceHashes(): string[] {
  return PHASE1_SCHEMA_FILES.map((file) => {
    const normalized = readText(file).replace(/\r\n/g, "\n");
    return `${file} (sha256:${createHash("sha256").update(normalized, "utf8").digest("hex")})`;
  });
}

function banner(): string {
  return [
    "/**",
    " * GENERATED FILE - DO NOT EDIT.",
    " * Non-authoritative TypeScript binding generated from the Phase 1 JSON",
    " * Schemas; where this file and the schemas disagree, the schemas govern.",
    " *",
    " * Source schemas:",
    ...sourceHashes().map((line) => ` *   ${line}`),
    " *",
    " * Generation command: pnpm schema:generate-types (also run by pnpm generate)",
    " */",
  ].join("\n");
}

/** Build binding file contents keyed by repository-relative path. */
export async function buildTypescriptBindings(): Promise<Map<string, string>> {
  const options = {
    bannerComment: banner(),
    additionalProperties: false,
    unreachableDefinitions: false,
    style: { singleQuote: false, semi: true },
  };
  const record = await compile(
    bundleSchema(RECORD_SCHEMA_ID) as never,
    "Phase1NomueRecord",
    options,
  );
  const report = await compile(
    bundleSchema(REPORT_SCHEMA_ID) as never,
    "Phase1VerificationReport",
    options,
  );
  const record2a = await compile(
    bundleSchema(RECORD_2A_SCHEMA_ID) as never,
    "Phase2aNomueRecord",
    options,
  );
  const report2a = await compile(
    bundleSchema(REPORT_2A_SCHEMA_ID) as never,
    "Phase2aVerificationReport",
    options,
  );
  const refusalDraft1 = await compile(
    bundleSchema("urn:nomue:schema:verifier-refusal:0.2.0-draft.1") as never,
    "VerifierRefusalDraft1",
    options,
  );
  const refusalDraft2 = await compile(
    bundleSchema("urn:nomue:schema:verifier-refusal:0.2.0-draft.2") as never,
    "VerifierRefusalDraft2",
    options,
  );
  const refusal = await compile(
    bundleSchema(REFUSAL_2A_SCHEMA_ID) as never,
    "VerifierRefusal",
    options,
  );
  const routingEnvelope = await compile(
    bundleSchema(ROUTING_ENVELOPE_SCHEMA_ID) as never,
    "RoutingEnvelope",
    options,
  );
  return new Map([
    ["bindings/typescript/generated/record.ts", record],
    ["bindings/typescript/generated/verification-report.ts", report],
    ["bindings/typescript/generated/record-0.2.ts", record2a],
    ["bindings/typescript/generated/verification-report-0.2.ts", report2a],
    ["bindings/typescript/generated/verifier-refusal-0.2.ts", refusalDraft1],
    ["bindings/typescript/generated/verifier-refusal-0.2-draft-2.ts", refusalDraft2],
    ["bindings/typescript/generated/verifier-refusal-0.2-draft-3.ts", refusal],
    ["bindings/typescript/generated/routing-envelope-0.2.ts", routingEnvelope],
  ]);
}
