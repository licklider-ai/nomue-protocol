/** UNISSUED CANDIDATE: shape/relations only; no numerical or final report evaluation. */
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import {
  parseStrictJson,
  StrictJsonError,
} from "../../../../reference/verifier/src/strict-json.js";
import { checkRawSize, checkParsedLimits } from "../../../../reference/verifier/src/limits.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../../..");
const readMetadata = (path: string) => JSON.parse(readFileSync(path, "utf8"));
export const candidate = readMetadata(
  resolve(here, "../t06-candidate-requirement-surfaces-20260915/CANDIDATE.json"),
);
export const ids: Record<string, string> = Object.fromEntries(
  candidate.identifiers.map((x: { key: string; id: string }) => [x.key, x.id]),
);
export const schemas: Record<string, any>[] = readdirSync(resolve(here, "schemas"))
  .filter((x) => x.endsWith(".schema.json"))
  .sort()
  .map((x) => readMetadata(resolve(here, "schemas", x)));
const ajv = new Ajv2020({
  strict: true,
  strictRequired: false,
  strictTypes: false,
  allErrors: true,
  strictNumbers: true,
  validateFormats: false,
});
ajv.addSchema(readMetadata(resolve(root, "schemas/common/identifier.schema.json")));
for (const schema of schemas) ajv.addSchema(schema);
export const schemaFor = (id: string): ValidateFunction => {
  const validator = ajv.getSchema(id);
  if (!validator) throw new Error("Unresolved local candidate schema: " + id);
  return validator;
};
for (const schema of schemas) {
  schemaFor(schema.$id);
  for (const name of Object.keys(schema.$defs ?? {})) schemaFor(schema.$id + "#/$defs/" + name);
}

type Observation = {
  observation_id: string;
  experimental_unit_id: string;
  cell_id: string;
  outcome_value: number;
};
type Cell = { cell_id: string; levels: [string, string] };
type Factor = { factor_id: string; level_order: [string, string] };
type Summary = { cell_id: string; n: number; mean: number };
type Contrast = {
  kind: string;
  signed_estimate: number;
  sum_of_squares: number;
  f_statistic: number;
  p_value: number;
};
export interface RecordCandidate {
  $schema: string;
  record_type: string;
  record_id: string;
  revision_id: string;
  created_at: string;
  interpretation_bundle_id: string;
  profile_id: string;
  integrity: {
    canonicalization_id: string;
    digest_algorithm: string;
    digest_scope: string;
    content_digest: string;
  };
  payload: {
    dataset: { dataset_id: string; observations: Observation[] };
    design: {
      design_id: string;
      dataset_id: string;
      factor_order: [string, string];
      factors: Factor[];
      cells: Cell[];
      model_applicability_declared: boolean;
    };
    analysis: { analysis_id: string; design_id: string; contract_id: string };
    result: {
      result_id: string;
      analysis_id: string;
      cell_summaries: Summary[];
      residual_sum_of_squares: number;
      residual_degrees_of_freedom: number;
      contrasts: Contrast[];
    };
  };
}
export type Category =
  | "accepted"
  | "input_refusal"
  | "resource_refusal"
  | "unsupported_bundle"
  | "conformance_failure"
  | "admissibility_failure"
  | "boundary_failure";
export type Result = {
  category: Category;
  stage: string;
  reason: string | null;
  path: string;
  record?: RecordCandidate;
};
const issue = (category: Category, stage: string, reason: string, path = ""): Result => ({
  category,
  stage,
  reason,
  path,
});
const success = (record?: RecordCandidate): Result => ({
  category: "accepted",
  stage: "complete",
  reason: null,
  path: "",
  ...(record ? { record } : {}),
});
// UTF-16 code-unit lexicographic order, not localeCompare or engine schema-error order.
const cmp = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
const pointerToken = (x: string) => x.replace(/~/g, "~0").replace(/\//g, "~1");
function parse(text: string): { value: unknown } | Result {
  if (checkRawSize(Buffer.byteLength(text, "utf8")))
    return issue("resource_refusal", "input", "NRS-FILE-SIZE-LIMIT-EXCEEDED");
  let value: unknown;
  try {
    value = parseStrictJson(text);
  } catch (error) {
    if (error instanceof RangeError)
      return issue("resource_refusal", "input", "NRS-NESTING-LIMIT-EXCEEDED");
    if (error instanceof StrictJsonError) {
      const codes = {
        DUPLICATE_JSON_MEMBER: "NRS-DUPLICATE-JSON-MEMBER",
        INVALID_UNICODE_STRING: "NRS-INVALID-UNICODE-STRING",
        NEGATIVE_ZERO_NUMBER: "NRS-NEGATIVE-ZERO-NUMBER",
      };
      return issue("input_refusal", "input", codes[error.code]);
    }
    if (error instanceof SyntaxError) return issue("input_refusal", "input", "NRS-PARSE-FAILED");
    throw error;
  }
  const limits = checkParsedLimits(value);
  if (limits.length) {
    const codes: Record<string, string> = {
      maxNestingDepth: "NRS-NESTING-LIMIT-EXCEEDED",
      maxStringLength: "NRS-STRING-LIMIT-EXCEEDED",
      maxObservations: "NRS-OBSERVATION-LIMIT-EXCEEDED",
    };
    return issue(
      "resource_refusal",
      "input",
      codes[limits[0].limit] ?? "NRS-RESOURCE-LIMIT-EXCEEDED",
    );
  }
  return { value };
}
function structural(validate: ValidateFunction, value: unknown, category: Category): Result | null {
  if (validate(value)) return null;
  const paths = (validate.errors ?? []).map(
    (e) =>
      e.instancePath +
      (e.keyword === "required"
        ? "/" + pointerToken(e.params.missingProperty as string)
        : e.keyword === "additionalProperties"
          ? "/" + pointerToken(e.params.additionalProperty as string)
          : ""),
  );
  paths.sort(cmp);
  return issue(category, "structural", "NRS-SCHEMA-INVALID", paths[0] ?? "");
}
function duplicate(values: string[]): boolean {
  return new Set(values).size !== values.length;
}
function sameSet(a: string[], b: string[]): boolean {
  return a.length === b.length && !duplicate(a) && !duplicate(b) && a.every((x) => b.includes(x));
}

/** All callers enter through strict raw parsing. The typed relational walk is private. */
export function validateRecord(text: string): Result {
  const parsed = parse(text);
  if (!("value" in parsed)) return parsed;
  const raw = parsed.value;
  if (
    raw &&
    typeof raw === "object" &&
    !Array.isArray(raw) &&
    typeof (raw as any).interpretation_bundle_id === "string" &&
    (raw as any).interpretation_bundle_id !== ids.bundle
  )
    return issue("unsupported_bundle", "routing", "NRS-UNSUPPORTED-BUNDLE");
  const invalid = structural(schemaFor(ids.record), raw, "conformance_failure");
  if (invalid) return invalid;
  const r = raw as RecordCandidate;
  const { dataset, design, analysis, result } = r.payload;
  const semantic = (reason: string, path: string) =>
    issue("conformance_failure", "semantic", reason, path);
  // Uniqueness precedes dereference: never pick one of multiple matching targets.
  const uniqueGroups: [string, string[]][] = [
    ["/payload/dataset/observations", dataset.observations.map((x) => x.observation_id)],
    ["/payload/design/factors", design.factors.map((x) => x.factor_id)],
    ["/payload/design/cells", design.cells.map((x) => x.cell_id)],
    ["/payload/design/factor_order", design.factor_order],
    ...design.factors.map((x, i): [string, string[]] => [
      "/payload/design/factors/" + i + "/level_order",
      x.level_order,
    ]),
    ["/payload/result/cell_summaries", result.cell_summaries.map((x) => x.cell_id)],
    ["/payload/result/contrasts", result.contrasts.map((x) => x.kind)],
  ];
  for (const [path, values] of uniqueGroups)
    if (duplicate(values)) return semantic("NRS-BTF-IDENTITY-AMBIGUOUS", path);
  const refs: [string, string, string][] = [
    ["/payload/design/dataset_id", design.dataset_id, dataset.dataset_id],
    ["/payload/analysis/design_id", analysis.design_id, design.design_id],
    ["/payload/result/analysis_id", result.analysis_id, analysis.analysis_id],
  ];
  for (const [path, actual, expected] of refs)
    if (actual !== expected) return semantic("NRS-BTF-LOCAL-REFERENCE-INVALID", path);
  if (
    !sameSet(
      design.factor_order,
      design.factors.map((x) => x.factor_id),
    )
  )
    return semantic("NRS-BTF-IDENTITY-AMBIGUOUS", "/payload/design/factor_order");
  const cellIds = new Set(design.cells.map((x) => x.cell_id));
  for (let i = 0; i < dataset.observations.length; i++)
    if (!cellIds.has(dataset.observations[i].cell_id))
      return semantic(
        "NRS-BTF-LOCAL-REFERENCE-INVALID",
        "/payload/dataset/observations/" + i + "/cell_id",
      );
  for (let i = 0; i < result.cell_summaries.length; i++)
    if (!cellIds.has(result.cell_summaries[i].cell_id))
      return semantic(
        "NRS-BTF-LOCAL-REFERENCE-INVALID",
        "/payload/result/cell_summaries/" + i + "/cell_id",
      );
  const factors = design.factor_order.map((id) => design.factors.find((x) => x.factor_id === id)!);
  const expectedTuples = factors[0].level_order.flatMap((a) =>
    factors[1].level_order.map((b) => JSON.stringify([a, b])),
  );
  if (
    !sameSet(
      design.cells.map((x) => JSON.stringify(x.levels)),
      expectedTuples,
    )
  )
    return semantic("NRS-BTF-CELL-COVERAGE-INVALID", "/payload/design/cells");
  // Model assertion is not a statistical test. Count/unit facts only; no declared n/df truth comparison.
  const admission = (reason: string, path: string): Result => ({
    ...issue("admissibility_failure", "admissibility", reason, path),
    record: r,
  });
  if (!design.model_applicability_declared)
    return admission("NRS-BTF-MODEL-NOT-DECLARED", "/payload/design/model_applicability_declared");
  const counts = new Map(design.cells.map((x) => [x.cell_id, 0]));
  for (const o of dataset.observations) counts.set(o.cell_id, counts.get(o.cell_id)! + 1);
  const ns = [...counts.values()];
  if (ns.some((n) => n < 2 || n > 2251799813685247 || n !== ns[0]))
    return admission("NRS-BTF-CELL-COUNTS-UNSUPPORTED", "/payload/dataset/observations");
  if (duplicate(dataset.observations.map((x) => x.experimental_unit_id)))
    return admission("NRS-BTF-UNIT-NOT-UNIQUE", "/payload/dataset/observations");
  return success(r);
}

export const componentNames = [
  "checkResult",
  "quantityResult",
  "quantityEvidence",
  "guaranteeBoundary",
  "violation",
  "profileEligibility",
] as const;
export type Component = (typeof componentNames)[number];
export function validateComponent(name: Component, text: string): Result {
  const parsed = parse(text);
  if (!("value" in parsed)) return parsed;
  return (
    structural(schemaFor(ids.report + "#/$defs/" + name), parsed.value, "boundary_failure") ??
    success()
  );
}
/** Scoped association only. Does not verify recomputed values or derive check outcomes. */
export function validateQuantityEvidence(text: string, recordText: string): Result {
  const context = validateRecord(recordText);
  if (!context.record)
    return issue("boundary_failure", "context", "NRS-BTF-LOCAL-REFERENCE-INVALID");
  const parsed = parse(text);
  if (!("value" in parsed)) return parsed;
  const bad = structural(
    schemaFor(ids.report + "#/$defs/quantityEvidence"),
    parsed.value,
    "boundary_failure",
  );
  if (bad) return bad;
  const e = parsed.value as any;
  const r = context.record;
  const fail = (path: string) =>
    issue("boundary_failure", "association", "NRS-BTF-LOCAL-REFERENCE-INVALID", path);
  if (
    e.record_reference.record_id !== r.record_id ||
    e.record_reference.revision_id !== r.revision_id
  )
    return fail("/record_reference");
  if (e.scope.id !== r.payload.result.result_id) return fail("/scope/id");
  const declarations = new Map<string, number>();
  const key = (x: any) => JSON.stringify([x.quantity, x.cell_id ?? null, x.contrast_kind ?? null]);
  for (const s of r.payload.result.cell_summaries)
    for (const quantity of ["n", "mean"] as const)
      declarations.set(key({ quantity, cell_id: s.cell_id }), s[quantity]);
  for (const x of r.payload.result.contrasts)
    for (const quantity of ["signed_estimate", "sum_of_squares", "f_statistic", "p_value"] as const)
      declarations.set(key({ quantity, contrast_kind: x.kind }), x[quantity]);
  for (const quantity of ["residual_sum_of_squares", "residual_degrees_of_freedom"] as const)
    declarations.set(key({ quantity }), r.payload.result[quantity]);
  const seen = new Set<string>();
  for (let i = 0; i < e.quantity_results.length; i++) {
    const q = e.quantity_results[i];
    const k = key(q);
    if (seen.has(k))
      return issue(
        "boundary_failure",
        "association",
        "NRS-BTF-IDENTITY-AMBIGUOUS",
        "/quantity_results/" + i,
      );
    seen.add(k);
    if (!declarations.has(k) || q.declared !== declarations.get(k))
      return fail("/quantity_results/" + i);
  }
  if (seen.size !== 22) return fail("/quantity_results");
  return success();
}

/** Check identity/version shape plus scope binding; lifecycle truth remains T09. */
export function validateCheckResult(text: string, recordText: string): Result {
  const context = validateRecord(recordText);
  if (!context.record)
    return issue("boundary_failure", "context", "NRS-BTF-LOCAL-REFERENCE-INVALID");
  const parsed = parse(text);
  if (!("value" in parsed)) return parsed;
  const bad = structural(
    schemaFor(ids.report + "#/$defs/checkResult"),
    parsed.value,
    "boundary_failure",
  );
  if (bad) return bad;
  const check = parsed.value as { scope: { kind: string; id: string } };
  const expected =
    check.scope.kind === "record_revision"
      ? context.record.revision_id
      : context.record.payload.result.result_id;
  if (check.scope.id !== expected)
    return issue("boundary_failure", "association", "NRS-BTF-LOCAL-REFERENCE-INVALID", "/scope/id");
  return success();
}
