import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";

// Source inventory validation only. This is not an R5 verifier or a JSON Schema validator.
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../../..");
const inventory = JSON.parse(readFileSync(resolve(here, "inventory.json"), "utf8"));
function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}
function pointer(document, path) {
  requireCondition(path.startsWith("/"), "Expected a non-root JSON Pointer");
  return path
    .slice(1)
    .split("/")
    .reduce((node, token) => {
      const key = token.replaceAll("~1", "/").replaceAll("~0", "~");
      requireCondition(
        node !== null && typeof node === "object" && Object.hasOwn(node, key),
        `Missing pointer ${path}`,
      );
      return node[key];
    }, document);
}
const documents = {};
for (const [key, source] of Object.entries(inventory.sources)) {
  requireCondition(
    !source.path.split("/").includes("..") && !source.path.startsWith("/"),
    `Invalid source path ${key}`,
  );
  const bytes = readFileSync(resolve(root, source.path));
  requireCondition(
    createHash("sha256").update(bytes).digest("hex") === source.sha256,
    `Source drift: ${source.path}`,
  );
  if (source.path.endsWith(".json")) documents[key] = JSON.parse(bytes.toString("utf8"));
}
const facts = [
  "outcome_type",
  "experimental_unit_structure",
  "relationship",
  "group_or_condition_count",
  "pair_identity_presence",
  "repeated_structure",
  "clustered_structure",
  "analysis_population_status",
];
const names = ["independent_two_group", "paired_two_condition", "independent_multi_group"];
requireCondition(
  isDeepStrictEqual(
    inventory.families.map((family) => family.family),
    names,
  ),
  "Family inventory changed",
);
let evidenceCount = 0;
function checkEvidence(evidence) {
  requireCondition(
    Object.hasOwn(documents, evidence.source),
    `Unknown JSON source ${evidence.source}`,
  );
  requireCondition(
    isDeepStrictEqual(
      pointer(documents[evidence.source], evidence.schema_pointer),
      evidence.expected_schema_fragment,
    ),
    `Fragment drift: ${evidence.source}${evidence.schema_pointer}`,
  );
  requireCondition(
    typeof evidence.instance_path_notation === "string" &&
      evidence.instance_path_notation.length > 0,
    "Missing descriptive instance path",
  );
  evidenceCount += 1;
}
for (const family of inventory.families) {
  requireCondition(
    family.r5_admission === "blocked_pending_separately_accepted_successors",
    "Inventory cannot admit an R5 family",
  );
  requireCondition(
    isDeepStrictEqual(
      family.rows.map((row) => row.fact),
      facts,
    ),
    `Incomplete fact inventory: ${family.family}`,
  );
  for (const row of family.rows) {
    requireCondition(
      ["carrier_gap", "mapping_open"].includes(row.disposition),
      "Mapping cannot be accepted by this inventory",
    );
    requireCondition(row.review_question.length > 0, "Missing review question");
    requireCondition(
      (row.disposition === "carrier_gap") === (row.evidence.length === 0),
      "Carrier-gap/evidence disagreement",
    );
    row.evidence.forEach(checkEvidence);
  }
}
inventory.extra_evidence.forEach(checkEvidence);
console.log(
  JSON.stringify(
    {
      status: "source_inventory_consistent",
      sources: Object.keys(inventory.sources).length,
      family_fact_cells: facts.length * names.length,
      schema_fragments: evidenceCount,
      semantic_mapping_validation: "not_performed",
      r5_support: "not_issued",
    },
    null,
    2,
  ),
);
