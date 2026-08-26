import { Ajv2020, type ValidateFunction } from "ajv/dist/2020.js";
import { describe, expect, it } from "vitest";
import { loadRequirements } from "../src/lib/load.js";
import { loadJson, loadYaml, readText } from "../src/lib/repo.js";
import {
  validatePairedCandidateRelationships,
  validateProtocolIdentifierCandidates,
  validateRequirementNamespaceCandidates,
  type PairedCandidateRecord,
  type PairedCandidateRelationshipCode,
  type ProtocolIdentifierCandidateFile,
  type RequirementNamespaceCandidateFile,
} from "../src/spikes/release-2-candidate.js";

const CANDIDATE_ROOT = "governance/drafts/release-2-candidate";
const RECORD_SCHEMA_ID = "https://nomue.ai/id/schema/record/0.3.0-draft.1";

interface FixtureMutation {
  operation: "add" | "replace" | "remove";
  path: string;
  value?: unknown;
}

interface FixtureEntry {
  candidate_key: string;
  mutations: FixtureMutation[];
  expected_schema_valid: boolean;
  expected_relationship_codes: PairedCandidateRelationshipCode[];
}

interface FixtureManifest {
  status: "non_authoritative_candidate";
  issuance: "unissued";
  source: string;
  entries: FixtureEntry[];
}

interface AuthorityManifest {
  targets: Array<{ authoritative_artifacts: string[] }>;
  artifacts: Array<{ path: string; class: string }>;
}

function compileCandidateRecordSchema(): ValidateFunction {
  const ajv = new Ajv2020({
    allErrors: true,
    strictSchema: true,
    strictTypes: true,
    strictRequired: false,
  });
  ajv.addSchema(loadJson<Record<string, unknown>>("schemas/common/identifier.schema.json"));
  ajv.addSchema(
    loadJson<Record<string, unknown>>(
      `${CANDIDATE_ROOT}/schemas/paired-two-condition-continuous-0.1.candidate.schema.json`,
    ),
  );
  ajv.addSchema(
    loadJson<Record<string, unknown>>(`${CANDIDATE_ROOT}/schemas/record-0.3.candidate.schema.json`),
  );
  const validate = ajv.getSchema(RECORD_SCHEMA_ID);
  if (validate === undefined)
    throw new Error(`candidate schema ${RECORD_SCHEMA_ID} did not compile`);
  return validate;
}

function decodePointerSegment(segment: string): string {
  return segment.replaceAll("~1", "/").replaceAll("~0", "~");
}

function applyMutation(root: unknown, mutation: FixtureMutation): void {
  if (!mutation.path.startsWith("/")) throw new Error(`invalid JSON pointer ${mutation.path}`);
  const segments = mutation.path.slice(1).split("/").map(decodePointerSegment);
  const finalSegment = segments.pop();
  if (finalSegment === undefined) throw new Error(`empty JSON pointer ${mutation.path}`);

  let parent: unknown = root;
  for (const segment of segments) {
    if (Array.isArray(parent)) {
      parent = parent[Number(segment)];
    } else if (typeof parent === "object" && parent !== null) {
      parent = (parent as Record<string, unknown>)[segment];
    } else {
      throw new Error(`pointer does not resolve: ${mutation.path}`);
    }
  }

  if (Array.isArray(parent)) {
    const index = Number(finalSegment);
    if (!Number.isInteger(index))
      throw new Error(`array pointer is not an index: ${mutation.path}`);
    if (mutation.operation === "remove") parent.splice(index, 1);
    else parent[index] = mutation.value;
    return;
  }
  if (typeof parent !== "object" || parent === null) {
    throw new Error(`pointer parent is not a container: ${mutation.path}`);
  }
  if (mutation.operation === "remove") delete (parent as Record<string, unknown>)[finalSegment];
  else (parent as Record<string, unknown>)[finalSegment] = mutation.value;
}

describe("Release 2 non-authoritative candidate surface", () => {
  it("keeps Requirement namespace and first-ID candidates unissued and collision-free", () => {
    const registry = loadRequirements();
    const candidate = loadJson<RequirementNamespaceCandidateFile>(
      `${CANDIDATE_ROOT}/requirement-namespaces.json`,
    );
    expect(
      validateRequirementNamespaceCandidates(
        candidate,
        new Set(registry.namespaces.map((namespace) => namespace.prefix)),
        new Set(registry.requirements.map((requirement) => requirement.id)),
      ),
    ).toEqual([]);
  });

  it("rejects a Requirement candidate that collides with an issued namespace", () => {
    const candidate = structuredClone(
      loadJson<RequirementNamespaceCandidateFile>(`${CANDIDATE_ROOT}/requirement-namespaces.json`),
    );
    candidate.namespaces[0]!.token = "ITGC";
    candidate.namespaces[0]!.prefix = "NRS-PROFILE-ITGC";
    const errors = validateRequirementNamespaceCandidates(
      candidate,
      new Set(["NRS-PROFILE-ITGC"]),
      new Set(),
    );
    expect(errors.join("\n")).toContain("collides with a registered namespace");
  });

  it("rejects an unsafe future normative-document path", () => {
    const candidate = structuredClone(
      loadJson<RequirementNamespaceCandidateFile>(`${CANDIDATE_ROOT}/requirement-namespaces.json`),
    );
    candidate.namespaces[0]!.first_requirements[0]!.future_document =
      "spec/contracts/../outside.md";
    const errors = validateRequirementNamespaceCandidates(candidate, new Set(), new Set());
    expect(errors.join("\n")).toContain("future document must be a spec Markdown path");
  });

  it("validates exact unissued HTTPS candidates and bundle-role separation", () => {
    const candidate = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    expect(validateProtocolIdentifierCandidates(candidate)).toEqual([]);
  });

  it("rejects method/Contract double identity and a support claim", () => {
    const candidate = structuredClone(
      loadJson<ProtocolIdentifierCandidateFile>(`${CANDIDATE_ROOT}/protocol-identifiers.json`),
    );
    const contract = candidate.identifiers.find((entry) => entry.key === "paired_t_contract");
    if (contract === undefined) throw new Error("paired_t_contract candidate is missing");
    contract.family = "method";
    contract.candidate_spelling = "https://nomue.ai/id/method/paired-t/0.1.0-draft.1";
    candidate.bundle_binding.verifier_support_state = "supported" as never;
    const errors = validateProtocolIdentifierCandidates(candidate).join("\n");
    expect(errors).toContain("requires family contract");
    expect(errors).toContain("must not receive duplicate method identity");
    expect(errors).toContain("must not claim registered conformance or verifier support");
  });

  it("keeps schema identities and bound Contract/Profile constants equal to the D3 candidates", () => {
    const candidate = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    const byKey = new Map(
      candidate.identifiers.map((entry) => [entry.key, entry.candidate_spelling]),
    );
    const recordSchema = loadJson<{
      $id: string;
      properties: {
        profile_id: { const: string };
        payload: { $ref: string };
      };
    }>(`${CANDIDATE_ROOT}/schemas/record-0.3.candidate.schema.json`);
    const profileSchema = loadJson<{
      $id: string;
      $defs: { analysis: { properties: { contract_id: { const: string } } } };
    }>(`${CANDIDATE_ROOT}/schemas/paired-two-condition-continuous-0.1.candidate.schema.json`);
    expect(recordSchema.$id).toBe(byKey.get("record_schema"));
    expect(recordSchema.properties.profile_id.const).toBe(byKey.get("paired_profile"));
    expect(recordSchema.properties.payload.$ref).toBe(byKey.get("profile_schema"));
    expect(profileSchema.$id).toBe(byKey.get("profile_schema"));
    expect(profileSchema.$defs.analysis.properties.contract_id.const).toBe(
      byKey.get("paired_t_contract"),
    );
  });

  it("keeps every candidate spelling absent from authoritative artifacts", () => {
    const candidate = loadJson<ProtocolIdentifierCandidateFile>(
      `${CANDIDATE_ROOT}/protocol-identifiers.json`,
    );
    const authority = loadYaml<AuthorityManifest>("authority/authority-manifest.yaml");
    const authoritativePaths = [
      ...new Set(authority.targets.flatMap((target) => target.authoritative_artifacts)),
    ];
    expect(authority.artifacts.some((artifact) => artifact.path.startsWith(CANDIDATE_ROOT))).toBe(
      false,
    );
    for (const identifier of candidate.identifiers) {
      const owners = authoritativePaths.filter((path) =>
        readText(path).includes(identifier.candidate_spelling),
      );
      expect(owners, `${identifier.key} already appears authoritative`).toEqual([]);
    }
  });

  it("compiles the candidate schemas and exercises every hand-authored fixture disposition", () => {
    const validateRecord = compileCandidateRecordSchema();
    const manifest = loadJson<FixtureManifest>(`${CANDIDATE_ROOT}/fixtures/manifest.json`);
    expect(manifest.status).toBe("non_authoritative_candidate");
    expect(manifest.issuance).toBe("unissued");
    expect(new Set(manifest.entries.map((entry) => entry.candidate_key)).size).toBe(
      manifest.entries.length,
    );
    const source = loadJson<unknown>(manifest.source);

    for (const entry of manifest.entries) {
      const record = structuredClone(source);
      entry.mutations.forEach((mutation) => applyMutation(record, mutation));
      const schemaValid = validateRecord(record);
      expect(schemaValid, `${entry.candidate_key}: ${JSON.stringify(validateRecord.errors)}`).toBe(
        entry.expected_schema_valid,
      );
      if (!schemaValid) continue;
      const codes = [
        ...new Set(
          validatePairedCandidateRelationships(record as PairedCandidateRecord).map(
            (issue) => issue.code,
          ),
        ),
      ].sort();
      expect(codes, entry.candidate_key).toEqual([...entry.expected_relationship_codes].sort());
    }
  });
});
