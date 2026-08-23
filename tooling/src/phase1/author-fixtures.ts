/**
 * Development-time authoring aid for conformance/fixtures/, the conformance
 * manifest, and examples/minimal-itgc-record/.
 *
 * Expectations are DECLARED in this script (exit code, conformance outcome,
 * per-check execution/outcome, reason codes) and asserted against the
 * reference verifier; authoring aborts on any disagreement. Declared Welch
 * numbers come from the reference statistics kernel and are cross-checked
 * against independent oracles (SciPy, mpmath) with the comparison recorded in
 * evidence/development/phase-1/oracle/. Digest expectations rest on the
 * canonicalization vectors, which are differentially checked against an
 * independent JCS implementation.
 *
 * Semantic-projection hashes pin cross-platform agreement; they are derived
 * from the verifier and are equality pins, not independent correctness
 * evidence on their own. Independent correctness evidence for the shipped
 * numerical checks is the disjoint-lineage oracle comparison under gate
 * R1-08, which is closed with decision "pass" (authority/release-1-gates.yaml,
 * tooling/r1-08-oracle/README.md).
 *
 * Re-running rewrites fixtures and the manifest; changes require review.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { stringify as yamlStringify } from "yaml";
import { welchTwoSampleTTest } from "../../../reference/stats-kernel/src/kernel.js";
import {
  recomputeContentDigest,
  canonicalProjection,
} from "../../../reference/verifier/src/digest.js";
import { sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { semanticProjectionHash } from "../../../reference/verifier/src/projection.js";
import { loadVerifierResources, CHECK_IDS } from "../../../reference/verifier/src/resources.js";
import {
  verifyRecordText,
  type VerificationReport,
} from "../../../reference/verifier/src/verify.js";
import { repoRoot } from "../lib/repo.js";
import { buildPhase2a021Fixtures } from "../phase2a/author-fixtures-021.js";
import { buildPhase2aExample, buildPhase2aFixtures } from "../phase2a/author-fixtures-2a.js";
import { buildApprovalFixtures } from "./author-approval-fixtures.js";
import { buildLifecycleFixtures } from "./author-lifecycle-fixtures.js";
import { buildEmitterFixtures } from "./author-emitter-fixtures.js";
import { buildRoutingFixtures } from "./author-routing.js";
import { buildStrictJsonFixtures } from "./author-strict-json.js";

const BUNDLE = "urn:nomue:bundle:itgc-minimal:0.1.0-draft.1";
const PROFILE = "urn:nomue:profile:itgc:0.1.0-draft.1";
const RECORD_SCHEMA = "urn:nomue:schema:record:0.1.0-draft.1";
const WELCH_METHOD = "urn:nomue:method:welch-two-sample-t:1";
const CREATED_AT = "2026-08-09T00:00:00Z";

const uuidUrn = (n: number): string =>
  `urn:uuid:00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;

interface Json {
  [key: string]: unknown;
}

function buildRecord(opts: {
  serial: number;
  groupA: number[];
  groupB: number[];
  declaredFromKernel?: boolean;
  declaredResultOverride?: Json;
}): Json {
  const observations: Json[] = [];
  let unit = 1;
  opts.groupA.forEach((value, i) => {
    observations.push({
      observation_id: `observation-${i + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-a",
      outcome_value: value,
    });
    unit += 1;
  });
  opts.groupB.forEach((value, i) => {
    observations.push({
      observation_id: `observation-${opts.groupA.length + i + 1}`,
      experimental_unit_id: `unit-${unit}`,
      group_id: "group-b",
      outcome_value: value,
    });
    unit += 1;
  });

  let result: Json;
  if (opts.declaredResultOverride !== undefined) {
    result = opts.declaredResultOverride;
  } else {
    const welch = welchTwoSampleTTest(
      { group_id: "group-a", values: opts.groupA },
      { group_id: "group-b", values: opts.groupB },
    );
    result = {
      result_id: "result-1",
      analysis_id: "analysis-1",
      group_summaries: welch.group_summaries.map((s) => ({
        group_id: s.group_id,
        n: s.n,
        mean: s.mean,
        sample_variance: s.sample_variance,
      })),
      mean_difference: welch.mean_difference,
      test_statistic: welch.test_statistic,
      degrees_of_freedom: welch.degrees_of_freedom,
      p_value: welch.p_value,
    };
  }

  const record: Json = {
    $schema: RECORD_SCHEMA,
    record_type: "nomue-record",
    record_id: uuidUrn(opts.serial * 2),
    revision_id: uuidUrn(opts.serial * 2 + 1),
    created_at: CREATED_AT,
    interpretation_bundle_id: BUNDLE,
    profile_id: PROFILE,
    payload: {
      dataset: { dataset_id: "dataset-1", observations },
      design: {
        design_id: "design-1",
        dataset_id: "dataset-1",
        experimental_unit_type: "biological replicate",
        groups: [
          { group_id: "group-a", label: "Control" },
          { group_id: "group-b", label: "Treatment" },
        ],
        group_order: ["group-a", "group-b"],
        outcome: {
          outcome_id: "outcome-1",
          label: "Synthetic continuous outcome",
          scale: "continuous",
        },
        independence_declared: true,
      },
      analysis: {
        analysis_id: "analysis-1",
        design_id: "design-1",
        method_id: WELCH_METHOD,
        alternative: "two_sided",
      },
      result,
    },
  };
  return record;
}

/** Attach a freshly recomputed (correct) integrity block. */
function seal(record: Json): Json {
  record["integrity"] = {
    canonicalization_id: "urn:nomue:canonicalization:jcs:0.2.0-draft.1",
    digest_algorithm: "sha-256",
    digest_scope: "record_without_integrity",
    content_digest: recomputeContentDigest(record as Record<string, unknown>),
  };
  return record;
}

interface ExpectedCheck {
  check_id: string;
  execution: "completed" | "not_run" | "error";
  outcome: "pass" | "fail" | null;
  reason_codes: string[];
}

interface FixtureSpec {
  fixture_id: string;
  family: "structural" | "semantic" | "public_checks" | "verifier_behavior";
  classification: string;
  purpose: string;
  requirement_ids: string[];
  build: () => Json | string;
  expected:
    | {
        kind: "record";
        cli_exit_code: 0 | 2;
        conformance: { execution: "completed"; outcome: "pass" | "fail"; reason_codes: string[] };
        checks: ExpectedCheck[];
      }
    | {
        kind: "refusal";
        cli_exit_code: 2 | 3 | 4;
        refusal_kind: string;
        refusal_reason_codes: string[];
      }
    | { kind: "report_schema"; schema_valid: false };
}

const notRun = (codes: string[]): ExpectedCheck[] => [
  { check_id: CHECK_IDS.integrity, execution: "not_run", outcome: null, reason_codes: codes },
  { check_id: CHECK_IDS.preconditions, execution: "not_run", outcome: null, reason_codes: codes },
  { check_id: CHECK_IDS.welch, execution: "not_run", outcome: null, reason_codes: codes },
];

const allPass: ExpectedCheck[] = [
  { check_id: CHECK_IDS.integrity, execution: "completed", outcome: "pass", reason_codes: [] },
  { check_id: CHECK_IDS.preconditions, execution: "completed", outcome: "pass", reason_codes: [] },
  { check_id: CHECK_IDS.welch, execution: "completed", outcome: "pass", reason_codes: [] },
];

const validExpectation = {
  kind: "record" as const,
  cli_exit_code: 0 as const,
  conformance: { execution: "completed" as const, outcome: "pass" as const, reason_codes: [] },
  checks: allPass,
};

function semanticFail(
  codes: string[],
  exit: 2 = 2,
): Extract<FixtureSpec["expected"], { kind: "record" }> {
  return {
    kind: "record",
    cli_exit_code: exit,
    conformance: { execution: "completed", outcome: "fail", reason_codes: codes },
    checks: notRun(codes),
  };
}

const V001 = { groupA: [1, 2, 3], groupB: [4, 5, 6] };

function v001Variant(serial: number, mutate: (r: Json) => void, resealAfterMutate: boolean): Json {
  const record = buildRecord({ serial, ...V001 });
  if (resealAfterMutate) {
    mutate(record);
    seal(record);
  } else {
    seal(record);
    mutate(record);
  }
  return record;
}

function declaredResultOverride(overrides: Json): Json {
  const welch = welchTwoSampleTTest(
    { group_id: "group-a", values: V001.groupA },
    { group_id: "group-b", values: V001.groupB },
  );
  const base: Json = {
    result_id: "result-1",
    analysis_id: "analysis-1",
    group_summaries: welch.group_summaries.map((s) => ({
      group_id: s.group_id,
      n: s.n,
      mean: s.mean,
      sample_variance: s.sample_variance,
    })),
    mean_difference: welch.mean_difference,
    test_statistic: welch.test_statistic,
    degrees_of_freedom: welch.degrees_of_freedom,
    p_value: welch.p_value,
  };
  return { ...base, ...overrides };
}

function payloadOf(record: Json): {
  dataset: { observations: Json[] };
  design: Json;
  analysis: Json;
  result: Json;
} {
  return record["payload"] as never;
}

const FIXTURES: FixtureSpec[] = [
  {
    fixture_id: "V-001",
    family: "public_checks",
    classification: "valid",
    purpose: "Minimal balanced ITGC Record; every check passes.",
    requirement_ids: ["NRS-CORE-0003", "NRS-PROFILE-ITGC-0006", "NRS-VERIFY-0008"],
    build: () => seal(buildRecord({ serial: 101, ...V001 })),
    expected: validExpectation,
  },
  {
    fixture_id: "V-002",
    family: "public_checks",
    classification: "valid",
    purpose: "Unequal group sizes and unequal variances; every check passes.",
    requirement_ids: ["NRS-VERIFY-0008", "NRS-PROFILE-ITGC-0010"],
    build: () =>
      seal(buildRecord({ serial: 102, groupA: [1.1, 2.3, 3.7, 4.1], groupB: [5.2, 7.9, 8.1] })),
    expected: validExpectation,
  },
  {
    fixture_id: "V-003",
    family: "public_checks",
    classification: "valid",
    purpose:
      "Valid Record whose numbers exercise nontrivial decimal and exponent serialization under JCS.",
    requirement_ids: ["NRS-CANON-0001", "NRS-CANON-0003", "NRS-VERIFY-0008"],
    build: () =>
      seal(
        buildRecord({
          serial: 103,
          groupA: [1e-7, 2.5e-7, 4e-7],
          groupB: [6.4e-7, 5.5e-7, 8.05e-7],
        }),
      ),
    expected: validExpectation,
  },
  // S-001 (missing interpretation_bundle_id) moved to the routing family:
  // its input is built below unchanged and authored by
  // buildRoutingFixtures against the hand-authored routing expectations
  // (ADR-0017 pre-release correction; the fixture id and input bytes are
  // preserved).
  {
    fixture_id: "S-002",
    family: "structural",
    classification: "structural_invalid",
    purpose: "An unknown top-level property is rejected by the closed Phase 1 surface.",
    requirement_ids: ["NRS-CORE-0007"],
    build: () =>
      v001Variant(
        202,
        (r) => {
          r["custom_extension"] = { note: "not allowed in Phase 1" };
        },
        false,
      ),
    expected: semanticFailSchema(),
  },
  {
    fixture_id: "S-003",
    family: "structural",
    classification: "structural_invalid",
    purpose: "A string outcome_value violates the numeric model structurally.",
    requirement_ids: ["NRS-CANON-0003", "NRS-PROFILE-ITGC-0013"],
    build: () =>
      v001Variant(
        203,
        (r) => {
          (payloadOf(r).dataset.observations[0] as Json)["outcome_value"] = "1.9";
        },
        false,
      ),
    expected: semanticFailSchema(),
  },
  {
    fixture_id: "S-004",
    family: "structural",
    classification: "structural_invalid",
    purpose: "A created_at timestamp with a numeric offset (non-Z) is rejected.",
    requirement_ids: ["NRS-CORE-0003"],
    build: () =>
      v001Variant(
        204,
        (r) => {
          r["created_at"] = "2026-08-09T09:00:00+09:00";
        },
        false,
      ),
    expected: semanticFailSchema(),
  },
  {
    fixture_id: "M-001",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "Only one declared group.",
    requirement_ids: ["NRS-PROFILE-ITGC-0001"],
    build: () =>
      v001Variant(
        301,
        (r) => {
          const design = payloadOf(r).design as Json;
          design["groups"] = [{ group_id: "group-a", label: "Control" }];
          design["group_order"] = ["group-a"];
          for (const obs of payloadOf(r).dataset.observations) {
            (obs as Json)["group_id"] = "group-a";
          }
        },
        true,
      ),
    expected: {
      kind: "record",
      cli_exit_code: 2,
      conformance: {
        execution: "completed",
        outcome: "fail",
        reason_codes: ["NRS-SCHEMA-INVALID", "NRS-GROUP-COUNT-NOT-TWO"],
      },
      checks: notRun(["NRS-SCHEMA-INVALID", "NRS-GROUP-COUNT-NOT-TWO"]),
    },
  },
  {
    fixture_id: "M-002",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "Duplicate observation_id.",
    requirement_ids: ["NRS-PROFILE-ITGC-0002"],
    build: () =>
      v001Variant(
        302,
        (r) => {
          (payloadOf(r).dataset.observations[3] as Json)["observation_id"] = "observation-1";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-DUPLICATE-OBSERVATION-ID"]),
  },
  {
    fixture_id: "M-003",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "One experimental unit appears in two observations.",
    requirement_ids: ["NRS-PROFILE-ITGC-0003"],
    build: () =>
      v001Variant(
        303,
        (r) => {
          (payloadOf(r).dataset.observations[3] as Json)["experimental_unit_id"] = "unit-1";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-DUPLICATE-EXPERIMENTAL-UNIT"]),
  },
  {
    fixture_id: "M-004",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "An observation references an undeclared group.",
    requirement_ids: ["NRS-PROFILE-ITGC-0001"],
    build: () =>
      v001Variant(
        304,
        (r) => {
          (payloadOf(r).dataset.observations[5] as Json)["group_id"] = "group-c";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-UNKNOWN-GROUP"]),
  },
  {
    fixture_id: "M-005",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "A group with a single observation is below the minimum group size.",
    requirement_ids: ["NRS-PROFILE-ITGC-0004"],
    build: () =>
      v001Variant(
        305,
        (r) => {
          const dataset = payloadOf(r).dataset;
          dataset.observations = dataset.observations.slice(0, 4);
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-GROUP-SIZE-BELOW-TWO"]),
  },
  {
    fixture_id: "M-006",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "group_order is not a permutation of the declared groups.",
    requirement_ids: ["NRS-PROFILE-ITGC-0006"],
    build: () =>
      v001Variant(
        306,
        (r) => {
          (payloadOf(r).design as Json)["group_order"] = ["group-a", "group-x"];
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED"]),
  },
  {
    fixture_id: "M-007",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "Independence is not declared.",
    requirement_ids: ["NRS-PROFILE-ITGC-0005"],
    build: () =>
      v001Variant(
        307,
        (r) => {
          (payloadOf(r).design as Json)["independence_declared"] = false;
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-INDEPENDENCE-NOT-DECLARED"]),
  },
  {
    fixture_id: "M-008",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "An unsupported method is declared; no silent method switch occurs.",
    requirement_ids: ["NRS-PROFILE-ITGC-0007"],
    build: () =>
      v001Variant(
        308,
        (r) => {
          (payloadOf(r).analysis as Json)["method_id"] = "urn:nomue:method:student-pooled-t:1";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-UNSUPPORTED-METHOD"]),
  },
  {
    fixture_id: "M-009",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "An unsupported alternative is declared.",
    requirement_ids: ["NRS-PROFILE-ITGC-0007"],
    build: () =>
      v001Variant(
        309,
        (r) => {
          (payloadOf(r).analysis as Json)["alternative"] = "one_sided_greater";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-UNSUPPORTED-ALTERNATIVE"]),
  },
  {
    fixture_id: "M-010",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "The result references an unknown analysis.",
    requirement_ids: ["NRS-PROFILE-ITGC-0012"],
    build: () =>
      v001Variant(
        310,
        (r) => {
          (payloadOf(r).result as Json)["analysis_id"] = "analysis-9";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED"]),
  },
  {
    fixture_id: "M-012",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "The design references an unknown dataset.",
    requirement_ids: ["NRS-CORE-0003"],
    build: () =>
      v001Variant(
        312,
        (r) => {
          (payloadOf(r).design as Json)["dataset_id"] = "dataset-9";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED"]),
  },
  {
    fixture_id: "M-013",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "The analysis references an unknown design.",
    requirement_ids: ["NRS-CORE-0003"],
    build: () =>
      v001Variant(
        313,
        (r) => {
          (payloadOf(r).analysis as Json)["design_id"] = "design-9";
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED"]),
  },
  {
    fixture_id: "M-014",
    family: "semantic",
    classification: "semantic_invalid",
    purpose:
      "Two declared groups share a group_id; the semantic exactly-two-groups path is exercised (schema alone cannot see the duplicate).",
    requirement_ids: ["NRS-PROFILE-ITGC-0001"],
    build: () =>
      v001Variant(
        314,
        (r) => {
          const design = payloadOf(r).design as Json;
          design["groups"] = [
            { group_id: "group-a", label: "Control" },
            { group_id: "group-a", label: "Treatment" },
          ];
          for (const obs of payloadOf(r).dataset.observations) {
            (obs as Json)["group_id"] = "group-a";
          }
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED", "NRS-GROUP-COUNT-NOT-TWO"]),
  },
  {
    fixture_id: "M-011",
    family: "semantic",
    classification: "semantic_invalid",
    purpose: "Result group summaries do not follow group_order.",
    requirement_ids: ["NRS-PROFILE-ITGC-0006", "NRS-PROFILE-ITGC-0012"],
    build: () =>
      v001Variant(
        311,
        (r) => {
          const result = payloadOf(r).result as Json;
          const summaries = result["group_summaries"] as Json[];
          result["group_summaries"] = [summaries[1], summaries[0]];
        },
        true,
      ),
    expected: semanticFail(["NRS-SEMANTIC-CONFORMANCE-FAILED"]),
  },
  {
    fixture_id: "I-001",
    family: "public_checks",
    classification: "integrity_invalid",
    purpose: "The declared content digest does not match the recomputed digest.",
    requirement_ids: ["NRS-VERIFY-0006", "NRS-CANON-0022"],
    build: () =>
      v001Variant(
        401,
        (r) => {
          (r["integrity"] as Json)["content_digest"] = `sha256:${"ab".repeat(32)}`;
        },
        false,
      ),
    expected: {
      kind: "record",
      cli_exit_code: 2,
      conformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      checks: [
        {
          check_id: CHECK_IDS.integrity,
          execution: "completed",
          outcome: "fail",
          reason_codes: ["NRS-DIGEST-MISMATCH"],
        },
        {
          check_id: CHECK_IDS.preconditions,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        { check_id: CHECK_IDS.welch, execution: "completed", outcome: "pass", reason_codes: [] },
      ],
    },
  },
  {
    fixture_id: "I-002",
    family: "public_checks",
    classification: "integrity_invalid",
    purpose: "Content changed after digest declaration without a digest update.",
    requirement_ids: ["NRS-VERIFY-0006", "NRS-CORE-0005"],
    build: () =>
      v001Variant(
        402,
        (r) => {
          ((payloadOf(r).design as Json)["groups"] as Json[])[1]!["label"] = "Treatment (renamed)";
        },
        false,
      ),
    expected: {
      kind: "record",
      cli_exit_code: 2,
      conformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      checks: [
        {
          check_id: CHECK_IDS.integrity,
          execution: "completed",
          outcome: "fail",
          reason_codes: ["NRS-DIGEST-MISMATCH"],
        },
        {
          check_id: CHECK_IDS.preconditions,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        { check_id: CHECK_IDS.welch, execution: "completed", outcome: "pass", reason_codes: [] },
      ],
    },
  },
  ...(
    [
      ["P-001", "mean", { path: "mean" }, "NRS-PROFILE-ITGC-0008"],
      ["P-002", "sample variance", { path: "sample_variance" }, "NRS-PROFILE-ITGC-0008"],
      ["P-003", "test statistic", { path: "test_statistic" }, "NRS-PROFILE-ITGC-0009"],
      ["P-004", "degrees of freedom", { path: "degrees_of_freedom" }, "NRS-PROFILE-ITGC-0010"],
      ["P-005", "p-value", { path: "p_value" }, "NRS-PROFILE-ITGC-0011"],
      [
        "P-007",
        "mean difference (group-order sign)",
        { path: "mean_difference" },
        "NRS-PROFILE-ITGC-0006",
      ],
    ] as Array<[string, string, { path: string }, string]>
  ).map(([id, label, target, reqId], index): FixtureSpec => ({
    fixture_id: id,
    family: "public_checks",
    classification: "public_check_invalid",
    purpose: `Declared ${label} differs from the recomputed value beyond tolerance.`,
    requirement_ids: ["NRS-VERIFY-0009", reqId],
    build: () => {
      const overrides: Json = {};
      if (target.path === "mean" || target.path === "sample_variance") {
        const welch = welchTwoSampleTTest(
          { group_id: "group-a", values: V001.groupA },
          { group_id: "group-b", values: V001.groupB },
        );
        overrides["group_summaries"] = welch.group_summaries.map((s, i) => ({
          group_id: s.group_id,
          n: s.n,
          mean: target.path === "mean" && i === 0 ? s.mean + 0.1 : s.mean,
          sample_variance:
            target.path === "sample_variance" && i === 0
              ? s.sample_variance + 0.25
              : s.sample_variance,
        }));
      } else if (target.path === "test_statistic") {
        overrides["test_statistic"] = -3.5;
      } else if (target.path === "degrees_of_freedom") {
        overrides["degrees_of_freedom"] = 3.5;
      } else if (target.path === "mean_difference") {
        // The classic direction error: mean_2 - mean_1 instead of the
        // declared group-order direction (NRS-PROFILE-ITGC-0006).
        overrides["mean_difference"] = 3;
      } else {
        overrides["p_value"] = 0.03;
      }
      return seal(
        buildRecord({
          serial: 501 + index,
          ...V001,
          declaredResultOverride: declaredResultOverride(overrides),
        }),
      );
    },
    expected: {
      kind: "record",
      cli_exit_code: 2,
      conformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      checks: [
        {
          check_id: CHECK_IDS.integrity,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        {
          check_id: CHECK_IDS.preconditions,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        {
          check_id: CHECK_IDS.welch,
          execution: "completed",
          outcome: "fail",
          reason_codes: ["NRS-DECLARED-RESULT-MISMATCH"],
        },
      ],
    },
  })),
  {
    fixture_id: "P-006",
    family: "public_checks",
    classification: "public_check_precondition",
    purpose:
      "Zero standard error: the precondition check fails and Welch recomputation does not run.",
    requirement_ids: ["NRS-PROFILE-ITGC-0014", "NRS-VERIFY-0007"],
    build: () =>
      seal(
        buildRecord({
          serial: 520,
          groupA: [5, 5, 5],
          groupB: [5, 5, 5],
          declaredResultOverride: {
            result_id: "result-1",
            analysis_id: "analysis-1",
            group_summaries: [
              { group_id: "group-a", n: 3, mean: 5, sample_variance: 0 },
              { group_id: "group-b", n: 3, mean: 5, sample_variance: 0 },
            ],
            mean_difference: 0,
            test_statistic: 0,
            degrees_of_freedom: 4,
            p_value: 1,
          },
        }),
      ),
    expected: {
      kind: "record",
      cli_exit_code: 2,
      conformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      checks: [
        {
          check_id: CHECK_IDS.integrity,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        {
          check_id: CHECK_IDS.preconditions,
          execution: "completed",
          outcome: "fail",
          reason_codes: ["NRS-ZERO-STANDARD-ERROR"],
        },
        {
          check_id: CHECK_IDS.welch,
          execution: "not_run",
          outcome: null,
          reason_codes: ["NRS-ZERO-STANDARD-ERROR"],
        },
      ],
    },
  },
  {
    fixture_id: "B-001",
    family: "verifier_behavior",
    classification: "behavior",
    purpose: "An unsupported interpretation bundle is refused without interpretation.",
    requirement_ids: ["NRS-VERSION-0002", "NRS-VERSION-0003"],
    build: () =>
      v001Variant(
        601,
        (r) => {
          r["interpretation_bundle_id"] = "urn:nomue:bundle:itgc-minimal:9.9.9-draft.0";
        },
        true,
      ),
    expected: {
      kind: "refusal",
      cli_exit_code: 3,
      refusal_kind: "unsupported_bundle",
      refusal_reason_codes: ["NRS-UNSUPPORTED-BUNDLE"],
    },
  },
  {
    fixture_id: "B-008",
    family: "verifier_behavior",
    classification: "behavior",
    purpose:
      "A numeric literal that parses to infinity (1e999) fails closed as a canonicalization refusal, evidencing the finite-binary64 domain and JCS fail-closed rules.",
    requirement_ids: ["NRS-CANON-0003", "NRS-CANON-0005"],
    build: () => {
      const record = v001Variant(801, () => {}, true);
      const text = JSON.stringify(record, null, 2);
      return text.replace('"outcome_value": 1', '"outcome_value": 1e999');
    },
    expected: {
      kind: "refusal",
      cli_exit_code: 2,
      refusal_kind: "canonicalization_failure",
      refusal_reason_codes: ["NRS-NON-FINITE-NUMERIC-VALUE", "NRS-CANONICALIZATION-FAILED"],
    },
  },
  {
    fixture_id: "B-007",
    family: "verifier_behavior",
    classification: "behavior",
    purpose: "Input beyond the nesting-depth limit triggers a safe refusal.",
    requirement_ids: ["NRS-SEC-0003"],
    build: () => {
      let nested = "0";
      for (let i = 0; i < 80; i += 1) nested = `{"a":${nested}}`;
      return nested;
    },
    expected: {
      kind: "refusal",
      cli_exit_code: 4,
      refusal_kind: "resource_limit",
      // Expectation corrected in Phase 2A: refusals now also carry the
      // specific limit code (old value: [NRS-RESOURCE-LIMIT-EXCEEDED]);
      // rationale and old/new values are recorded in ADR-0015.
      refusal_reason_codes: ["NRS-RESOURCE-LIMIT-EXCEEDED", "NRS-NESTING-LIMIT-EXCEEDED"],
    },
  },
  {
    fixture_id: "B-009",
    family: "verifier_behavior",
    classification: "behavior",
    purpose:
      "Hostile URI-shaped record_id and revision_id (a path-traversal-look-alike http URI and a javascript: pseudo-scheme) are accepted as opaque identifiers under the generic uri pattern, never dereferenced, and verification completes and passes exactly as it would with ordinary identifiers (NRS-CORE-0004, NRS-SEC-0001). This is part of the published adversarial corpus (security/threat-model.md).",
    requirement_ids: ["NRS-CORE-0004", "NRS-SEC-0001"],
    build: () =>
      v001Variant(
        701,
        (r) => {
          r["record_id"] = "http://attacker.example.invalid/../../../../etc/passwd?leak=1";
          r["revision_id"] = "javascript:alert(document.cookie)//not-a-real-revision";
        },
        true,
      ),
    expected: validExpectation,
  },
  {
    fixture_id: "B-010",
    family: "verifier_behavior",
    classification: "behavior",
    purpose:
      "Tiny within-group variance times an extreme between-group difference makes t^2 overflow binary64 (|t| ~ 1.8e155). The kernel refuses explicitly (NRS-VERIFY-0026, Batch 3 V3) instead of letting the tail evaluation silently collapse to an endpoint probability; preconditions fail with NRS-T-SQUARED-OVERFLOW and recomputation does not run. The constant group value is a power of two (2^505) so its recomputed mean is exact and the group variance is exactly zero - keeping the overflow in t^2, not in an upstream variance intermediate. Part of the published adversarial corpus (security/threat-model.md).",
    requirement_ids: ["NRS-VERIFY-0026"],
    build: () =>
      seal(
        buildRecord({
          serial: 702,
          groupA: [0.001, 0.002, 0.0],
          groupB: [Math.pow(2, 505), Math.pow(2, 505), Math.pow(2, 505)],
          declaredResultOverride: declaredResultOverride({}),
        }),
      ),
    expected: {
      kind: "record",
      cli_exit_code: 2,
      conformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      checks: [
        {
          check_id: CHECK_IDS.integrity,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        {
          check_id: CHECK_IDS.preconditions,
          execution: "completed",
          outcome: "fail",
          reason_codes: ["NRS-T-SQUARED-OVERFLOW"],
        },
        {
          check_id: CHECK_IDS.welch,
          execution: "not_run",
          outcome: null,
          reason_codes: ["NRS-T-SQUARED-OVERFLOW"],
        },
      ],
    },
  },
  {
    fixture_id: "B-011",
    family: "verifier_behavior",
    classification: "behavior",
    purpose:
      "Second point of the extreme-|t| series (|t| ~ 2.4e161, ordinary-scale first group, constant group at 2^532): the same explicit NRS-T-SQUARED-OVERFLOW refusal path, confirming the guard does not depend on the small-variance construction of B-010. Part of the published adversarial corpus (security/threat-model.md).",
    requirement_ids: ["NRS-VERIFY-0026"],
    build: () =>
      seal(
        buildRecord({
          serial: 703,
          groupA: [1.0, 1.1, 0.9],
          groupB: [Math.pow(2, 532), Math.pow(2, 532), Math.pow(2, 532)],
          declaredResultOverride: declaredResultOverride({}),
        }),
      ),
    expected: {
      kind: "record",
      cli_exit_code: 2,
      conformance: { execution: "completed", outcome: "pass", reason_codes: [] },
      checks: [
        {
          check_id: CHECK_IDS.integrity,
          execution: "completed",
          outcome: "pass",
          reason_codes: [],
        },
        {
          check_id: CHECK_IDS.preconditions,
          execution: "completed",
          outcome: "fail",
          reason_codes: ["NRS-T-SQUARED-OVERFLOW"],
        },
        {
          check_id: CHECK_IDS.welch,
          execution: "not_run",
          outcome: null,
          reason_codes: ["NRS-T-SQUARED-OVERFLOW"],
        },
      ],
    },
  },
];

function semanticFailSchema(): Extract<FixtureSpec["expected"], { kind: "record" }> {
  return {
    kind: "record",
    cli_exit_code: 2,
    conformance: { execution: "completed", outcome: "fail", reason_codes: ["NRS-SCHEMA-INVALID"] },
    checks: notRun(["NRS-SCHEMA-INVALID"]),
  };
}

interface ReportFixtureSpec {
  fixture_id: string;
  purpose: string;
  requirement_ids: string[];
  mutate: (report: Json) => void;
}

const REPORT_FIXTURES: ReportFixtureSpec[] = [
  {
    fixture_id: "B-002",
    purpose: "The report schema rejects an overall_status property.",
    requirement_ids: ["NRS-VERIFY-0001"],
    mutate: (report) => {
      report["overall_status"] = "passed";
    },
  },
  {
    fixture_id: "B-003",
    purpose: "The report schema rejects a VERIFIED property.",
    requirement_ids: ["NRS-VERIFY-0001"],
    mutate: (report) => {
      report["VERIFIED"] = true;
    },
  },
  {
    fixture_id: "B-004",
    purpose: "A not_run result with an outcome is invalid.",
    requirement_ids: ["NRS-VERIFY-0010"],
    mutate: (report) => {
      const results = report["verification_results"] as Json[];
      const target = results[1] as Json;
      target["execution"] = "not_run";
      target["outcome"] = "pass";
      target["reason_codes"] = ["NRS-ZERO-STANDARD-ERROR"];
      delete target["evidence"];
    },
  },
  {
    fixture_id: "B-005",
    purpose: "A completed result without an outcome is invalid.",
    requirement_ids: ["NRS-VERIFY-0010"],
    mutate: (report) => {
      const target = (report["verification_results"] as Json[])[0] as Json;
      delete target["outcome"];
    },
  },
  {
    fixture_id: "B-006",
    purpose: "An errored result without an error object is invalid.",
    requirement_ids: ["NRS-VERIFY-0010", "NRS-VERIFY-0012"],
    mutate: (report) => {
      const target = (report["verification_results"] as Json[])[0] as Json;
      target["execution"] = "error";
      delete target["outcome"];
      target["reason_codes"] = ["NRS-INTERNAL-VERIFIER-ERROR"];
    },
  },
];

const writeJson = (absPath: string, value: unknown): string => {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, text, "utf8");
  return text;
};

function assertEqual(actual: unknown, expected: unknown, context: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    throw new Error(`${context}: expected ${e}, got ${a}`);
  }
}

function main(): void {
  const fixturesRoot = path.join(repoRoot, "conformance", "fixtures");
  fs.rmSync(fixturesRoot, { recursive: true, force: true });

  interface ManifestFixture {
    fixture_id: string;
    classification: string;
    purpose: string;
    input: string;
    input_sha256: string;
    requirement_ids: string[];
    expected: Json;
  }
  const byFamily = new Map<string, ManifestFixture[]>();
  const add = (family: string, fixture: ManifestFixture): void => {
    const list = byFamily.get(family) ?? [];
    list.push(fixture);
    byFamily.set(family, list);
  };

  for (const spec of FIXTURES) {
    const built = spec.build();
    const inputRel = `conformance/fixtures/${spec.family}/${spec.fixture_id}.json`;
    const text =
      typeof built === "string"
        ? (fs.mkdirSync(path.dirname(path.join(repoRoot, inputRel)), { recursive: true }),
          fs.writeFileSync(path.join(repoRoot, inputRel), `${built}\n`, "utf8"),
          `${built}\n`)
        : writeJson(path.join(repoRoot, inputRel), built);

    const outcome = verifyRecordText(text);
    const expected: Json = {};

    if (spec.expected.kind === "record") {
      assertEqual(outcome.exitCode, spec.expected.cli_exit_code, `${spec.fixture_id} exit`);
      const report = outcome.report;
      if (report === undefined) throw new Error(`${spec.fixture_id}: expected a report`);
      assertEqual(
        {
          execution: report.conformance.execution,
          outcome: report.conformance.outcome ?? null,
          reason_codes: [...report.conformance.reason_codes].sort(),
        },
        {
          execution: spec.expected.conformance.execution,
          outcome: spec.expected.conformance.outcome,
          reason_codes: [...spec.expected.conformance.reason_codes].sort(),
        },
        `${spec.fixture_id} conformance`,
      );
      for (const expectedCheck of spec.expected.checks) {
        const actual = report.verification_results.find(
          (r) => r.check_id === expectedCheck.check_id,
        );
        if (actual === undefined)
          throw new Error(`${spec.fixture_id}: missing ${expectedCheck.check_id}`);
        assertEqual(
          {
            execution: actual.execution,
            outcome: actual.outcome ?? null,
            reason_codes: [...actual.reason_codes].sort(),
          },
          {
            execution: expectedCheck.execution,
            outcome: expectedCheck.outcome,
            reason_codes: [...expectedCheck.reason_codes].sort(),
          },
          `${spec.fixture_id} ${expectedCheck.check_id}`,
        );
      }
      expected["kind"] = "record";
      expected["cli_exit_code"] = spec.expected.cli_exit_code;
      expected["conformance"] = {
        execution: spec.expected.conformance.execution,
        outcome: spec.expected.conformance.outcome,
        reason_codes: [...spec.expected.conformance.reason_codes],
      };
      expected["checks"] = spec.expected.checks.map((c) => ({
        check_id: c.check_id,
        execution: c.execution,
        outcome: c.outcome,
        reason_codes: [...c.reason_codes],
      }));
      expected["semantic_projection_hash"] = semanticProjectionHash(report);
    } else if (spec.expected.kind === "refusal") {
      assertEqual(outcome.exitCode, spec.expected.cli_exit_code, `${spec.fixture_id} exit`);
      const refusal = outcome.refusal;
      if (refusal === undefined) throw new Error(`${spec.fixture_id}: expected a refusal`);
      assertEqual(refusal.refusal_kind, spec.expected.refusal_kind, `${spec.fixture_id} kind`);
      assertEqual(
        refusal.reason_codes,
        spec.expected.refusal_reason_codes,
        `${spec.fixture_id} refusal codes`,
      );
      expected["kind"] = "refusal";
      expected["cli_exit_code"] = spec.expected.cli_exit_code;
      expected["refusal_kind"] = spec.expected.refusal_kind;
      expected["refusal_reason_codes"] = spec.expected.refusal_reason_codes;
    }

    add(spec.family, {
      fixture_id: spec.fixture_id,
      classification: spec.classification,
      purpose: spec.purpose,
      input: inputRel,
      input_sha256: sha256HexOfUtf8(text),
      requirement_ids: spec.requirement_ids,
      expected,
    });
  }

  // Report-schema fixtures: mutate a normalized valid report.
  const resources = loadVerifierResources();
  const v001Text = fs.readFileSync(
    path.join(repoRoot, "conformance/fixtures/public_checks/V-001.json"),
    "utf8",
  );
  const baseOutcome = verifyRecordText(v001Text);
  if (baseOutcome.report === undefined) throw new Error("V-001 must verify for report fixtures");
  const normalizedBase = JSON.parse(JSON.stringify(baseOutcome.report)) as Json;
  normalizedBase["generated_at"] = CREATED_AT;
  (normalizedBase["verifier"] as Json)["source_commit"] = "0".repeat(40);
  if (resources.validateReport(normalizedBase) !== true) {
    throw new Error("normalized base report is unexpectedly schema-invalid");
  }

  for (const spec of REPORT_FIXTURES) {
    const report = JSON.parse(JSON.stringify(normalizedBase)) as Json;
    spec.mutate(report);
    if (resources.validateReport(report) === true) {
      throw new Error(`${spec.fixture_id}: mutated report unexpectedly validates`);
    }
    const inputRel = `conformance/fixtures/verifier_behavior/${spec.fixture_id}.json`;
    const text = writeJson(path.join(repoRoot, inputRel), report);
    add("verifier_behavior", {
      fixture_id: spec.fixture_id,
      classification: "report_schema_invalid",
      purpose: spec.purpose,
      input: inputRel,
      input_sha256: sha256HexOfUtf8(text),
      requirement_ids: spec.requirement_ids,
      expected: { kind: "report_schema", schema_valid: false, cli_exit_code: null },
    });
  }

  // Example record (informative, non-fixture).
  const exampleDir = path.join(repoRoot, "examples", "minimal-itgc-record");
  const exampleRecord = seal(
    buildRecord({
      serial: 901,
      groupA: [12.1, 11.8, 12.5, 12.0],
      groupB: [13.9, 14.4, 13.6, 14.1],
    }),
  );
  const exampleText = writeJson(path.join(exampleDir, "record.json"), exampleRecord);
  const exampleOutcome = verifyRecordText(exampleText);
  if (exampleOutcome.exitCode !== 0 || exampleOutcome.report === undefined) {
    throw new Error("example record must verify cleanly");
  }
  const expectedReport = JSON.parse(JSON.stringify(exampleOutcome.report)) as Json;
  expectedReport["generated_at"] = CREATED_AT;
  (expectedReport["verifier"] as Json)["source_commit"] = "0".repeat(40);
  const expectedReportText = writeJson(
    path.join(exampleDir, "expected-verification.json"),
    expectedReport,
  );
  const canonicalText = canonicalProjection(exampleRecord as Record<string, unknown>);
  fs.writeFileSync(path.join(exampleDir, "canonical-content.json"), canonicalText, "utf8");
  const hashLines = [
    `${sha256HexOfUtf8(exampleText)}  record.json`,
    `${sha256HexOfUtf8(expectedReportText)}  expected-verification.json`,
    `${sha256HexOfUtf8(canonicalText)}  canonical-content.json`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(exampleDir, "hashes.sha256"), hashLines, "utf8");

  // Conformance manifest.
  const familyMeta: Array<{
    family: string;
    status: "active" | "reserved";
    requirement_ids: string[];
    normative_scope: string;
    phase_introduced: string;
    notes?: string;
  }> = [
    {
      family: "structural",
      status: "active",
      requirement_ids: ["NRS-CORE-0003", "NRS-CORE-0007"],
      normative_scope: "Structural conformance of Record documents to the pinned Record schema.",
      phase_introduced: "phase-1",
    },
    {
      family: "semantic",
      status: "active",
      requirement_ids: [
        "NRS-PROFILE-ITGC-0001",
        "NRS-PROFILE-ITGC-0002",
        "NRS-PROFILE-ITGC-0003",
        "NRS-PROFILE-ITGC-0004",
        "NRS-PROFILE-ITGC-0005",
        "NRS-PROFILE-ITGC-0006",
        "NRS-PROFILE-ITGC-0007",
      ],
      normative_scope: "Registered state invariants beyond schema validity.",
      phase_introduced: "phase-1",
    },
    {
      family: "canonicalization",
      status: "active",
      requirement_ids: [
        "NRS-CANON-0001",
        "NRS-CANON-0020",
        "NRS-CANON-0022",
        "NRS-CANON-0004",
        "NRS-CANON-0005",
      ],
      normative_scope:
        "JCS canonical form and domain-separated SHA-256 digests of the Phase 1 digest projection.",
      phase_introduced: "phase-1",
      notes:
        "Vectors live in canonicalization/test-vectors/manifest.yaml (single authority) and run via pnpm canonicalization:test; no record-level fixtures are duplicated here.",
    },
    {
      family: "public_checks",
      status: "active",
      requirement_ids: [
        "NRS-VERIFY-0006",
        "NRS-VERIFY-0007",
        "NRS-VERIFY-0008",
        "NRS-VERIFY-0009",
        "NRS-PROFILE-ITGC-0014",
      ],
      normative_scope: "Execution and expected results of the Phase 1 public checks.",
      phase_introduced: "phase-1",
    },
    {
      family: "numerical_contract",
      status: "active",
      requirement_ids: [
        "NRS-CANON-0009",
        "NRS-CANON-0010",
        "NRS-CANON-0011",
        "NRS-VERIFY-0019",
        "NRS-VERIFY-0020",
        "NRS-VERIFY-0021",
        "NRS-VERSION-0009",
        "NRS-CORE-0012",
      ],
      normative_scope:
        "Successor bundle urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1 numerical contract: parsed binary64 authority, tail-safe p evaluation, zero separation, and underflow fail-closed behavior.",
      phase_introduced: "phase-2a",
      notes:
        "Machine gates (algorithm regression and tolerance contract lock) live in tooling/tests/numerical-contract.test.ts. Domain-boundary evidence is informative only (evidence/development/numerical-contract-0.2.1/). Expectations are hand-authored in conformance/expectations/phase-2a-021-expectations.yaml.",
    },
    {
      family: "strict_json",
      status: "active",
      requirement_ids: ["NRS-CANON-0007", "NRS-CANON-0008"],
      normative_scope:
        "Strict JCS input eligibility: duplicate object member names and non-scalar Unicode strings are rejected on the raw text before routing, canonicalization, or digest computation.",
      phase_introduced: "phase-2a",
      notes:
        "Expectations are hand-authored in conformance/expectations/strict-json-expectations.yaml (ADR-0018). Acceptance fixtures pin the absence of false positives (fake keys in string values, escaped punctuation, paired surrogates, NFC/NFD kept distinct).",
    },
    {
      family: "routing",
      status: "active",
      requirement_ids: [
        "NRS-VERSION-0003",
        "NRS-VERSION-0005",
        "NRS-VERSION-0007",
        "NRS-VERSION-0008",
      ],
      normative_scope:
        "Bundle-independent routing: envelope validation, exact registry dispatch, no default bundle, registry-order invariance.",
      phase_introduced: "phase-2a",
      notes:
        "S-001 was reclassified from structural to routing as a documented pre-release correction (ADR-0017); its input bytes are unchanged. Expectations are hand-authored in conformance/expectations/routing-expectations.yaml.",
    },
    {
      family: "attestation",
      status: "reserved",
      requirement_ids: [],
      normative_scope:
        "Attestation structure and trust semantics exist as EXPERIMENTAL specification material, but this conformance family is reserved because no registered Release 1 bundle declares attestation support.",
      phase_introduced: "attestation-experimental",
    },
    {
      family: "verifier_behavior",
      status: "active",
      requirement_ids: [
        "NRS-VERIFY-0001",
        "NRS-VERIFY-0010",
        "NRS-VERSION-0002",
        "NRS-SEC-0003",
        "NRS-CORE-0004",
        "NRS-SEC-0001",
      ],
      normative_scope:
        "Required verifier behavior: fail-closed bundle handling, execution/outcome invariants, prohibited overall status, safe refusal, and the adversarial corpus of hostile-but-well-formed inputs (security/threat-model.md) that must verify inertly rather than be dereferenced.",
      phase_introduced: "phase-1",
    },
    {
      family: "emitter",
      status: "active",
      requirement_ids: ["NRS-EMIT-0001", "NRS-EMIT-0004"],
      normative_scope:
        "Emitter conformance restated as explicit Requirement IDs (NRS-EMIT-0001 schema validity, NRS-EMIT-0004 domain-separated digest correctness); still judged by the same underlying structural/integrity behavior as any other Record, but E-family fixtures exist and their expected values are computed independently of the reference verifier (author-emitter-fixtures.ts) rather than from its output, unlike this suite's other non-numeric expectations. See spec/emission/README.md.",
      phase_introduced: "phase-2a",
      notes:
        "Batch 2 U3 (2026-08-13): moved from no dedicated fixtures to E-001..E-005. Expected schema-validity and digest values are asserted via a fresh AJV instance and an independent JCS/SHA-256 computation before the reference verifier is even invoked; the reference verifier is then run only as a consistency check, closing the audit's G5 finding for this family specifically.",
    },
    {
      family: "lifecycle",
      status: "active",
      requirement_ids: [
        "NRS-CORE-0013",
        "NRS-CORE-0014",
        "NRS-CORE-0015",
        "NRS-CORE-0016",
        "NRS-CORE-0017",
        "NRS-CORE-0018",
        "NRS-CORE-0019",
      ],
      normative_scope:
        "Record lifecycle state model v0 (spec/core/record-lifecycle.md, ADR-0028): state as a derived projection over the artifact graph (six orthogonal axes), declarative operation preconditions from the closed-vocabulary registry, structured needs_clarification, and disclosure notices. LC fixtures are projection/operation inputs replayed by a dedicated lifecycle_check kind, not Records.",
      phase_introduced: "record-lifecycle-v0",
      notes:
        "LC-001..008 cover the per-axis {valid/failing/not-run/out-of-scope} matrix including the unknown-extension interaction as defined behavior (LC-008); LC-020..023 cover allowed/refused (NRS-LIFECYCLE-PRECONDITION-NOT-MET)/needs_clarification. The nomue_attested verification value requires a pinned trust-root key and is unit-tested with generated keys (tooling/tests/lifecycle.test.ts) rather than fixture-pinned against an empty trust root.",
    },
    {
      family: "approval",
      status: "active",
      requirement_ids: ["NRS-APPROVE-0002", "NRS-APPROVE-0004"],
      normative_scope:
        "Human-approval EXPERIMENTAL increment: the minimal approval element shape (approver/scope/timestamp/statement) and scope-consistency checking. D1-family fixtures are not Records - there is no registered bundle whose schema declares an approval field yet - so expected values are computed by calling checkApprovalScope (reference/verifier/src/approval.ts) directly, replayed through a dedicated approval_check fixture kind in the shared conformance runner. See spec/approval/README.md.",
      phase_introduced: "phase-2a-approval-draft",
      notes:
        "D1-001 approval-present (scope matches, pass), D1-002 approval-absent (execution: not_run, NRS-APPROVAL-ABSENT), and D1-003 approval-scope-mismatch (fail, NRS-APPROVAL-SCOPE-MISMATCH) cover the current standalone check. Whether approval requires a signature and how it attaches to a Record schema remain explicitly undecided by this increment.",
    },
  ];

  // Phase 2A fixtures: inputs built here, expectations asserted against the
  // hand-authored table conformance/expectations/phase-2a-expectations.yaml.
  for (const phase2a of buildPhase2aFixtures()) {
    add(phase2a.family, phase2a.entry as unknown as ManifestFixture);
  }
  buildPhase2aExample();

  for (const phase2a021 of buildPhase2a021Fixtures()) {
    add(phase2a021.family, phase2a021.entry as unknown as ManifestFixture);
  }

  // Strict JCS input eligibility fixtures (JSON-DUP-*, JSON-UNI-*):
  // expectations asserted against the hand-authored table
  // conformance/expectations/strict-json-expectations.yaml. Refusal inputs
  // are raw text (duplicates cannot be expressed via JSON.stringify).
  for (const strictJson of buildStrictJsonFixtures({
    validRecordText: (serial) =>
      `${JSON.stringify(seal(buildRecord({ serial, ...V001 })), null, 2)}\n`,
    labeledRecord: (serial, label) =>
      v001Variant(
        serial,
        (r) => {
          ((payloadOf(r).design as Json)["outcome"] as Json)["label"] = label;
        },
        true,
      ),
  })) {
    add(strictJson.family, strictJson.entry as unknown as ManifestFixture);
  }

  // Routing fixtures (S-001, ROUTE-001..008): expectations asserted against
  // the hand-authored table conformance/expectations/routing-expectations.yaml.
  // Must follow the Phase 1/2A/strict-JSON fixtures: the invariance probes
  // reference V-001, A2-V-001, and the duplicate-bundle inputs by path.
  // S-001's input bytes are the unchanged Phase 1 bytes (asserted against
  // the historical hash inside the builder).
  const s001Record = v001Variant(
    201,
    (r) => {
      delete r["interpretation_bundle_id"];
    },
    false,
  );
  for (const routing of buildRoutingFixtures(s001Record)) {
    add(routing.family, routing.entry as unknown as ManifestFixture);
  }

  // Emitter conformance fixtures (E-001..E-005, NRS-EMIT-0001/0002):
  // expected values are computed independently (AJV against raw schema
  // files, independent JCS+SHA-256) BEFORE the reference verifier is
  // invoked as a consistency check - see author-emitter-fixtures.ts's
  // module comment for why this family's authoring differs from every
  // other family here.
  for (const emitter of buildEmitterFixtures()) {
    add(emitter.family, emitter.entry as unknown as ManifestFixture);
  }

  // Approval conformance fixtures (D1-001..D1-003, NRS-APPROVE-0002/0004):
  // expected values are computed by calling checkApprovalScope directly -
  // see author-approval-fixtures.ts's module comment for why this family's
  // fixtures are not Records.
  for (const approval of buildApprovalFixtures()) {
    add(approval.family, approval.entry as unknown as ManifestFixture);
  }

  // Lifecycle fixtures (LC-*, NRS-CORE-0013..0019): projection/operation
  // inputs replayed through a dedicated lifecycle_check kind - see
  // author-lifecycle-fixtures.ts. Must run AFTER the phase-2a fixtures:
  // it reads their pinned record files as projection inputs.
  for (const lifecycle of buildLifecycleFixtures()) {
    add(lifecycle.family, lifecycle.entry as unknown as ManifestFixture);
  }

  const manifest = {
    manifest: "nrs-conformance",
    manifest_version: "0.4.0",
    updated: "2026-08-10",
    suite_status: "phase-2a",
    families: familyMeta.map((meta) => ({
      family: meta.family,
      status: meta.status,
      fixtures: byFamily.get(meta.family) ?? [],
      requirement_ids: meta.requirement_ids,
      normative_scope: meta.normative_scope,
      phase_introduced: meta.phase_introduced,
      ...(meta.notes === undefined ? {} : { notes: meta.notes }),
    })),
  };

  const header = [
    "# Conformance suite manifest - authoritative for covered behavior.",
    "# Fixture files and expected results are pinned here (input_sha256,",
    "# expected reason codes, exit codes, semantic projection hashes).",
    "# Authored via tooling/src/phase1/author-fixtures.ts, which asserts every",
    "# declared expectation against the reference verifier before writing;",
    "# declared numeric values are cross-checked against independent oracles",
    "# (see evidence/development/phase-1/oracle/), and pinned reason codes are",
    "# cross-checked against the reason-code registry's applicable_check_ids",
    "# by pnpm validate.",
    "#",
    "# Known Phase 1 limitation (recorded, not hidden): non-numeric",
    "# expectations (execution states, projection hashes) originate from the",
    "# reference verifier at authoring time and pin behavior rather than",
    "# independently derive it; see the independent review record under",
    "# evidence/development/phase-1/reviews/ and gates R1-03 / R1-08.",
    "",
  ].join("\n");
  fs.writeFileSync(
    path.join(repoRoot, "conformance", "manifest.yaml"),
    header + yamlStringify(manifest),
    "utf8",
  );

  const total = [...byFamily.values()].reduce((sum, list) => sum + list.length, 0);
  console.log(`authored ${total} fixtures + example record + conformance manifest`);
}

main();
