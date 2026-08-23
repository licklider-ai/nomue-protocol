/** Phase 1 schema loading and compilation for tooling. */

import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import { loadJson, type Issue } from "../lib/repo.js";

export const PHASE1_SCHEMA_FILES = [
  "schemas/common/identifier.schema.json",
  "schemas/common/execution-outcome.schema.json",
  "schemas/common/execution-outcome-0.2.schema.json",
  "schemas/profiles/itgc-minimal.schema.json",
  "schemas/profiles/itgc-guarantee-0.2.schema.json",
  "schemas/record/record.schema.json",
  "schemas/record/record-0.2.schema.json",
  "schemas/reports/verification-report.schema.json",
  "schemas/reports/verification-report-0.2.schema.json",
  "schemas/reports/verifier-refusal-0.2.schema.json",
  "schemas/reports/verifier-refusal-0.2-draft-2.schema.json",
  "schemas/reports/verifier-refusal-0.2-draft-3.schema.json",
  "schemas/routing/routing-envelope-0.2.schema.json",
] as const;

export const RECORD_SCHEMA_ID = "urn:nomue:schema:record:0.1.0-draft.1";
export const REPORT_SCHEMA_ID = "urn:nomue:schema:verification-report:0.1.0-draft.1";
export const RECORD_2A_SCHEMA_ID = "urn:nomue:schema:record:0.2.0-draft.1";
export const REPORT_2A_SCHEMA_ID = "urn:nomue:schema:verification-report:0.2.0-draft.1";
/** Current refusal schema (draft.3 supersedes draft.2; ADR-0022). */
export const REFUSAL_2A_SCHEMA_ID = "urn:nomue:schema:verifier-refusal:0.2.0-draft.3";
/** Superseded refusal schemas, retained unmodified as historical artifacts. */
export const REFUSAL_SUPERSEDED_SCHEMA_IDS = [
  "urn:nomue:schema:verifier-refusal:0.2.0-draft.1",
  "urn:nomue:schema:verifier-refusal:0.2.0-draft.2",
] as const;
export const ROUTING_ENVELOPE_SCHEMA_ID = "urn:nomue:schema:routing-envelope:0.2.0-draft.1";

export interface CompiledPhase1Schemas {
  issues: Issue[];
  byId: Map<string, { file: string; schema: Record<string, unknown> }>;
  validateRecord?: ValidateFunction;
  validateReport?: ValidateFunction;
  validateReport2a?: ValidateFunction;
  validateRefusal?: ValidateFunction;
}

/**
 * Compile all Phase 1 schemas: parseability, $id uniqueness, reference
 * resolution (AJV resolves every $ref at compile time; nothing is fetched).
 */
export function compilePhase1Schemas(): CompiledPhase1Schemas {
  const check = "phase1-schemas";
  const issues: Issue[] = [];
  const byId = new Map<string, { file: string; schema: Record<string, unknown> }>();

  const ajv = new Ajv2020({
    allErrors: true,
    strictSchema: true,
    strictTypes: true,
    strictRequired: false,
  });

  for (const file of PHASE1_SCHEMA_FILES) {
    let schema: Record<string, unknown>;
    try {
      schema = loadJson<Record<string, unknown>>(file);
    } catch (err) {
      issues.push({ check, file, message: `failed to parse: ${String(err)}` });
      continue;
    }
    const id = schema["$id"];
    if (typeof id !== "string" || !id.startsWith("urn:")) {
      issues.push({ check, file, message: "schema $id is missing or not a URN" });
      continue;
    }
    if (byId.has(id)) {
      issues.push({ check, file, message: `duplicate schema $id ${id}` });
      continue;
    }
    byId.set(id, { file, schema });
    try {
      ajv.addSchema(schema);
    } catch (err) {
      issues.push({ check, file, message: `failed to add schema: ${String(err)}` });
    }
  }

  let validateRecord: ValidateFunction | undefined;
  let validateReport: ValidateFunction | undefined;
  let validateReport2a: ValidateFunction | undefined;
  let validateRefusal: ValidateFunction | undefined;
  try {
    validateRecord = ajv.getSchema(RECORD_SCHEMA_ID) ?? undefined;
    validateReport = ajv.getSchema(REPORT_SCHEMA_ID) ?? undefined;
    validateReport2a = ajv.getSchema(REPORT_2A_SCHEMA_ID) ?? undefined;
    validateRefusal = ajv.getSchema(REFUSAL_2A_SCHEMA_ID) ?? undefined;
    const checks: Array<[string, ValidateFunction | undefined]> = [
      [RECORD_SCHEMA_ID, validateRecord],
      [REPORT_SCHEMA_ID, validateReport],
      [RECORD_2A_SCHEMA_ID, ajv.getSchema(RECORD_2A_SCHEMA_ID) ?? undefined],
      [REPORT_2A_SCHEMA_ID, validateReport2a],
      [REFUSAL_2A_SCHEMA_ID, validateRefusal],
      [ROUTING_ENVELOPE_SCHEMA_ID, ajv.getSchema(ROUTING_ENVELOPE_SCHEMA_ID) ?? undefined],
      ...REFUSAL_SUPERSEDED_SCHEMA_IDS.map((id): [string, ValidateFunction | undefined] => [
        id,
        ajv.getSchema(id) ?? undefined,
      ]),
    ];
    for (const [id, fn] of checks) {
      if (fn === undefined) {
        issues.push({ check, message: `schema ${id} did not compile` });
      }
    }
  } catch (err) {
    issues.push({ check, message: `schema compilation failed: ${String(err)}` });
  }

  const result: CompiledPhase1Schemas = { issues, byId };
  if (validateRecord !== undefined) result.validateRecord = validateRecord;
  if (validateReport !== undefined) result.validateReport = validateReport;
  if (validateReport2a !== undefined) result.validateReport2a = validateReport2a;
  if (validateRefusal !== undefined) result.validateRefusal = validateRefusal;
  return result;
}
