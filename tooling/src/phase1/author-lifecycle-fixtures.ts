/**
 * Lifecycle conformance fixture authoring (LC-*, NRS-CORE-0013..0019;
 * Batch 6 Z3-Z5). Fixture inputs are NOT Records: they are projection /
 * operation inputs ({mode, record, report, approval, notices,
 * evaluation_time}) consumed by projectState/evaluateOperation - the same
 * dedicated-kind approach as the D1 approval family. Reports embedded in
 * inputs are REAL reports produced by verifyRecordText over existing
 * pinned fixture records (no hand-crafted report objects), so every axis
 * value is derived from artifacts the suite already trusts.
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import type { Approval } from "../../../reference/verifier/src/approval.js";
import { APPROVAL_STATEMENT_ID } from "../../../reference/verifier/src/approval.js";
import type { DisclosureNotice, StateView } from "../../../reference/verifier/src/lifecycle.js";
import {
  evaluateOperation,
  loadLifecycleOperations,
  projectState,
} from "../../../reference/verifier/src/lifecycle.js";
import { loadVerifierResources } from "../../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { repoRoot } from "../lib/repo.js";

interface Json {
  [key: string]: unknown;
}

export interface LifecycleManifestFixture {
  fixture_id: string;
  family: "lifecycle";
  entry: Json;
}

const EVALUATION_TIME = "2026-08-13T00:00:00Z";

function assertEqual(actual: unknown, expected: unknown, context: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${context}: expected ${e}, got ${a}`);
}

function readFixtureRecord(rel: string): { record: Json; text: string } {
  const text = fs.readFileSync(path.join(repoRoot, rel), "utf8");
  return { record: JSON.parse(text) as Json, text };
}

function reportFor(text: string): Json {
  const outcome = verifyRecordText(text);
  if (outcome.report === undefined) throw new Error("expected a report");
  return JSON.parse(JSON.stringify(outcome.report)) as Json;
}

function approvalFor(record: Json, scopeId: string): Approval {
  void record;
  return {
    approval_id: "urn:uuid:00000000-0000-4000-8000-0000000000lc".replace("lc", "1c"),
    approver: { name: "Lifecycle Fixture Approver", approver_id: "urn:nomue:approver:lc:1" },
    scope: { kind: "record_revision", id: scopeId },
    timestamp: EVALUATION_TIME,
    statement: APPROVAL_STATEMENT_ID,
  };
}

type FixtureDisclosureNotice = DisclosureNotice & {
  $schema: "urn:nomue:schema:disclosure-notice:0.1.0-draft.1";
  notice_type: "nomue-disclosure-notice";
};

function noticeFor(record: Json, kind: "withdrawal" | "supersession"): FixtureDisclosureNotice {
  const integrity = record["integrity"] as { content_digest: string };
  const base: FixtureDisclosureNotice = {
    $schema: "urn:nomue:schema:disclosure-notice:0.1.0-draft.1",
    notice_type: "nomue-disclosure-notice",
    notice_kind: kind,
    subject: {
      record_id: String(record["record_id"]),
      revision_id: String(record["revision_id"]),
      content_digest: integrity.content_digest,
    },
    issued_at: EVALUATION_TIME,
  };
  if (kind === "supersession") base.superseded_by = "urn:uuid:00000000-0000-4000-8000-999999999999";
  return base;
}

interface LifecycleSpec {
  fixtureId: string;
  classification: string;
  purpose: string;
  requirementIds: string[];
  input: Json;
  expected: Json;
}

export function buildLifecycleFixtures(): LifecycleManifestFixture[] {
  const fixturesRoot = path.join(repoRoot, "conformance", "fixtures", "lifecycle");
  fs.mkdirSync(fixturesRoot, { recursive: true });

  const valid = readFixtureRecord("conformance/fixtures/public_checks/A2-V-001.json");
  const otherValid = readFixtureRecord("conformance/fixtures/public_checks/A2-V-002.json");
  const inadmissible = readFixtureRecord("conformance/fixtures/public_checks/A2-A-001.json");

  const validReport = reportFor(valid.text);
  const otherReport = reportFor(otherValid.text);
  const inadmissibleReport = reportFor(inadmissible.text);

  const unknownExtensionRecord: Json = { ...valid.record, custom_extension: { note: "unknown" } };
  const unknownExtensionReport = reportFor(JSON.stringify(unknownExtensionRecord));

  const revisionOf = (record: Json): string => String(record["revision_id"]);

  const projInput = (
    record: Json,
    report: Json | null,
    approval: Approval | null,
    notices: DisclosureNotice[],
    operation?: string,
  ): Json => ({
    mode: operation === undefined ? "projection" : "operation",
    ...(operation === undefined ? {} : { operation }),
    record,
    report,
    approval,
    notices,
    evaluation_time: EVALUATION_TIME,
  });

  const axes = (
    profile: string,
    check: string,
    freshness: string,
    approval: string,
    verification: string,
    disclosure: string,
  ): Json => ({
    profile_eligibility: profile,
    check,
    freshness,
    approval,
    verification,
    disclosure,
  });

  const specs: LifecycleSpec[] = [
    {
      fixtureId: "LC-001",
      classification: "lifecycle_projection",
      purpose:
        "Fully-populated happy path: fresh report over the same record, consistent approval, no notices. Every axis lands on its best value except verification, which is report_exists (nomue_attested requires a pinned trust-root key; the repository trust root is empty pre-ceremony, and that path is unit-tested with generated keys instead).",
      requirementIds: ["NRS-CORE-0013", "NRS-CORE-0016"],
      input: projInput(
        valid.record,
        validReport,
        approvalFor(valid.record, revisionOf(valid.record)),
        [],
      ),
      expected: {
        kind: "lifecycle_check",
        axes: axes(
          "eligible",
          "all_completed",
          "current",
          "scope_consistent",
          "report_exists",
          "active",
        ),
      },
    },
    {
      fixtureId: "LC-002",
      classification: "lifecycle_projection",
      purpose:
        "Bare record, no satellite artifacts: not-run/not-evaluable values everywhere, never fabricated ones - absence is reported as absence (NRS-CORE-0016).",
      requirementIds: ["NRS-CORE-0016"],
      input: projInput(valid.record, null, null, []),
      expected: {
        kind: "lifecycle_check",
        axes: axes("not_evaluated", "not_evaluated", "not_evaluable", "absent", "none", "active"),
      },
    },
    {
      fixtureId: "LC-003",
      classification: "lifecycle_projection",
      purpose:
        "Inadmissible record (A2-A-001) with its real report: profile_eligibility=ineligible from the completed-fail admissibility check; dependent checks not_run gives check=some_not_run. No aggregate verdict exists anywhere in the view (NRS-VERIFY-0001).",
      requirementIds: ["NRS-CORE-0016", "NRS-VERIFY-0001"],
      input: projInput(inadmissible.record, inadmissibleReport, null, []),
      expected: {
        kind: "lifecycle_check",
        axes: axes("ineligible", "some_not_run", "current", "absent", "report_exists", "active"),
      },
    },
    {
      fixtureId: "LC-004",
      classification: "lifecycle_projection",
      purpose:
        "Freshness=stale: the report is a real report of a DIFFERENT record (content digest and revision mismatch), so it no longer speaks about this record.",
      requirementIds: ["NRS-CORE-0016"],
      input: projInput(valid.record, otherReport, null, []),
      expected: {
        kind: "lifecycle_check",
        axes: axes("eligible", "all_completed", "stale", "absent", "report_exists", "active"),
      },
    },
    {
      fixtureId: "LC-005",
      classification: "lifecycle_projection",
      purpose:
        "Approval scope mismatch surfaces as approval=scope_mismatch (carrier: the D1 check).",
      requirementIds: ["NRS-CORE-0016"],
      input: projInput(
        valid.record,
        validReport,
        approvalFor(valid.record, "urn:nomue:revision:not-this-record"),
        [],
      ),
      expected: {
        kind: "lifecycle_check",
        axes: axes(
          "eligible",
          "all_completed",
          "current",
          "scope_mismatch",
          "report_exists",
          "active",
        ),
      },
    },
    {
      fixtureId: "LC-006",
      classification: "lifecycle_projection",
      purpose: "A withdrawal notice for this revision makes disclosure=withdrawn (NRS-CORE-0019).",
      requirementIds: ["NRS-CORE-0016", "NRS-CORE-0019"],
      input: projInput(valid.record, validReport, null, [noticeFor(valid.record, "withdrawal")]),
      expected: {
        kind: "lifecycle_check",
        axes: axes("eligible", "all_completed", "current", "absent", "report_exists", "withdrawn"),
      },
    },
    {
      fixtureId: "LC-007",
      classification: "lifecycle_projection",
      purpose:
        "A supersession notice for this revision makes disclosure=superseded; the superseding revision is named in the notice (NRS-CORE-0019).",
      requirementIds: ["NRS-CORE-0016", "NRS-CORE-0019"],
      input: projInput(valid.record, validReport, null, [noticeFor(valid.record, "supersession")]),
      expected: {
        kind: "lifecycle_check",
        axes: axes("eligible", "all_completed", "current", "absent", "report_exists", "superseded"),
      },
    },
    {
      fixtureId: "LC-008",
      classification: "lifecycle_projection",
      purpose:
        "Unknown-extension interaction as DEFINED behavior: the closed surface makes conformance fail, every check not_run - so the projection reports profile_eligibility=not_evaluated (the admissibility check did not complete), check=some_not_run, verification=report_exists. Partial verification never silently upgrades any axis.",
      requirementIds: ["NRS-CORE-0016", "NRS-CORE-0007"],
      input: projInput(unknownExtensionRecord, unknownExtensionReport, null, []),
      expected: {
        kind: "lifecycle_check",
        axes: axes("not_evaluated", "some_not_run", "current", "absent", "report_exists", "active"),
      },
    },
    {
      fixtureId: "LC-020",
      classification: "lifecycle_operation",
      purpose:
        "attest allowed: all preconditions (check=all_completed, freshness=current, not withdrawn) satisfied.",
      requirementIds: ["NRS-CORE-0014", "NRS-CORE-0017"],
      input: projInput(valid.record, validReport, null, [], "attest"),
      expected: { kind: "lifecycle_check", decision: { result: "allowed" } },
    },
    {
      fixtureId: "LC-021",
      classification: "lifecycle_operation",
      purpose:
        "attest refused on stale freshness: an explicit refusal naming the violated predicate, carrying NRS-LIFECYCLE-PRECONDITION-NOT-MET (Z3 negative, connected to the refusal taxonomy via the registered reason code).",
      requirementIds: ["NRS-CORE-0014", "NRS-CORE-0017"],
      input: projInput(valid.record, otherReport, null, [], "attest"),
      expected: {
        kind: "lifecycle_check",
        decision: {
          result: "refused",
          reason_codes: ["NRS-LIFECYCLE-PRECONDITION-NOT-MET"],
          violated: [{ axis: "freshness", predicate: "current" }],
        },
      },
    },
    {
      fixtureId: "LC-022",
      classification: "lifecycle_operation",
      purpose:
        "approve refused on a withdrawn revision (disclosure=withdrawn violates not_withdrawn).",
      requirementIds: ["NRS-CORE-0014", "NRS-CORE-0017", "NRS-CORE-0019"],
      input: projInput(
        valid.record,
        validReport,
        null,
        [noticeFor(valid.record, "withdrawal")],
        "approve",
      ),
      expected: {
        kind: "lifecycle_check",
        decision: {
          result: "refused",
          reason_codes: ["NRS-LIFECYCLE-PRECONDITION-NOT-MET"],
          violated: [{ axis: "disclosure", predicate: "not_withdrawn" }],
        },
      },
    },
    {
      fixtureId: "LC-023",
      classification: "lifecycle_operation",
      purpose:
        "attest with no report at all: structured needs_clarification (NRS-CORE-0015/0018) enumerating BOTH missing evaluations (check and freshness) with expected forms - never a bare failure, never a silent pass.",
      requirementIds: ["NRS-CORE-0015", "NRS-CORE-0018"],
      input: projInput(valid.record, null, null, [], "attest"),
      expected: {
        kind: "lifecycle_check",
        decision: {
          result: "needs_clarification",
          missing_whats: ["verification report", "verification report (freshness inputs)"],
        },
      },
    },
  ];

  const resources = loadVerifierResources();
  const registeredBundleIds = [...resources.bundles.keys()];
  const operations = loadLifecycleOperations();

  const results: LifecycleManifestFixture[] = [];
  for (const spec of specs) {
    const text = `${JSON.stringify(spec.input, null, 2)}\n`;
    fs.writeFileSync(path.join(fixturesRoot, `${spec.fixtureId}.json`), text, "utf8");
    const sha256 = createHash("sha256").update(text, "utf8").digest("hex");

    // Replay exactly what the conformance runner will do and assert the
    // declared expectation before pinning it.
    const input = spec.input;
    const view: StateView = projectState({
      record: input["record"] as Record<string, unknown>,
      report: (input["report"] ?? undefined) as never,
      approval: (input["approval"] ?? null) as never,
      notices: (input["notices"] ?? []) as never,
      registeredBundleIds,
      evaluationTimeIso: String(input["evaluation_time"]),
    });

    if (input["mode"] === "projection") {
      const actual = Object.fromEntries(
        Object.entries(view.axes).map(([axis, state]) => [axis, state.value]),
      );
      assertEqual(actual, spec.expected["axes"], `${spec.fixtureId} axes`);
    } else {
      const decision = evaluateOperation(String(input["operation"]), view, operations);
      const expectedDecision = spec.expected["decision"] as Json;
      assertEqual(decision.result, expectedDecision["result"], `${spec.fixtureId} result`);
      if (decision.result === "refused") {
        assertEqual(
          decision.reason_codes,
          expectedDecision["reason_codes"],
          `${spec.fixtureId} codes`,
        );
        assertEqual(
          decision.violated.map((v) => ({ axis: v.axis, predicate: v.predicate })),
          expectedDecision["violated"],
          `${spec.fixtureId} violated`,
        );
      }
      if (decision.result === "needs_clarification") {
        assertEqual(
          decision.clarification.missing.map((m) => m.what),
          expectedDecision["missing_whats"],
          `${spec.fixtureId} missing`,
        );
      }
    }

    results.push({
      fixture_id: spec.fixtureId,
      family: "lifecycle",
      entry: {
        fixture_id: spec.fixtureId,
        classification: spec.classification,
        purpose: spec.purpose,
        input: `conformance/fixtures/lifecycle/${spec.fixtureId}.json`,
        input_sha256: sha256,
        requirement_ids: spec.requirementIds,
        expected: spec.expected,
      },
    });
  }

  return results;
}
