/**
 * Approval conformance fixture authoring (D1-001..D1-003, NRS-APPROVE-0004).
 *
 * Unlike a Record fixture, an approval_check fixture's input is not a
 * Record: it is {approval, record_reference}, the exact shape
 * checkApprovalScope consumes (reference/verifier/src/approval.ts). There is
 * no bundle whose Record schema declares an approval field in this
 * increment (spec/approval/README.md), so there is nothing for
 * verifyRecordText to route this through; the expected result is computed
 * by calling checkApprovalScope directly, the same function the shared
 * conformance runner (tooling/src/phase1/conformance.ts) calls when it
 * replays these fixtures.
 */

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  APPROVAL_SCOPE_CHECK_ID,
  APPROVAL_STATEMENT_ID,
  checkApprovalScope,
  type Approval,
  type ApprovalScopeCheckInput,
} from "../../../reference/verifier/src/approval.js";
import { repoRoot } from "../lib/repo.js";

interface Json {
  [key: string]: unknown;
}

export interface ApprovalManifestFixture {
  fixture_id: string;
  family: "approval";
  entry: Json;
}

const RECORD_REFERENCE = {
  record_id: "urn:nomue:record:example:approval-draft-0001",
  revision_id: "urn:nomue:revision:example:approval-draft-0001",
  content_digest: `sha256:${"ab".repeat(32)}`,
};

function approval(scopeId: string): Approval {
  return {
    approval_id: "urn:uuid:00000000-0000-4000-8000-0000000000d1",
    approver: {
      name: "Example Approver",
      approver_id: "urn:nomue:approver:example:1",
    },
    scope: { kind: "record_revision", id: scopeId },
    timestamp: "2026-08-13T00:00:00Z",
    statement: APPROVAL_STATEMENT_ID,
  };
}

function assertEqual(actual: unknown, expected: unknown, context: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${context}: expected ${e}, got ${a}`);
}

export function buildApprovalFixtures(): ApprovalManifestFixture[] {
  const fixturesRoot = path.join(repoRoot, "conformance", "fixtures", "approval");
  fs.mkdirSync(fixturesRoot, { recursive: true });

  const specs: Array<{
    fixtureId: string;
    classification: string;
    purpose: string;
    input: ApprovalScopeCheckInput;
    expectedExecution: string;
    expectedOutcome: string | null;
    expectedReasonCodes: string[];
  }> = [
    {
      fixtureId: "D1-001",
      classification: "approval_present_scope_matches",
      purpose:
        "An approval element is present and its scope.id matches the checked record's revision_id: checkApprovalScope reports a completed pass.",
      input: {
        approval: approval(RECORD_REFERENCE.revision_id),
        record_reference: RECORD_REFERENCE,
      },
      expectedExecution: "completed",
      expectedOutcome: "pass",
      expectedReasonCodes: [],
    },
    {
      fixtureId: "D1-002",
      classification: "approval_absent",
      purpose:
        "No approval element is present (null). checkApprovalScope reports execution: not_run with NRS-APPROVAL-ABSENT, never a silent pass, since approval is optional and absence is a legitimate, distinct case.",
      input: { approval: null, record_reference: RECORD_REFERENCE },
      expectedExecution: "not_run",
      expectedOutcome: null,
      expectedReasonCodes: ["NRS-APPROVAL-ABSENT"],
    },
    {
      fixtureId: "D1-003",
      classification: "approval_scope_mismatch",
      purpose:
        "An approval element is present but its scope.id names neither the record_id nor the revision_id of the record it is checked against: checkApprovalScope reports a completed fail with NRS-APPROVAL-SCOPE-MISMATCH.",
      input: {
        approval: approval("urn:nomue:revision:example:a-different-record-entirely"),
        record_reference: RECORD_REFERENCE,
      },
      expectedExecution: "completed",
      expectedOutcome: "fail",
      expectedReasonCodes: ["NRS-APPROVAL-SCOPE-MISMATCH"],
    },
  ];

  const results: ApprovalManifestFixture[] = [];
  for (const spec of specs) {
    const text = `${JSON.stringify(spec.input, null, 2)}\n`;
    fs.writeFileSync(path.join(fixturesRoot, `${spec.fixtureId}.json`), text, "utf8");
    const sha256 = createHash("sha256").update(text, "utf8").digest("hex");

    const result = checkApprovalScope(spec.input);
    assertEqual(result.execution, spec.expectedExecution, `${spec.fixtureId} execution`);
    assertEqual(result.outcome ?? null, spec.expectedOutcome, `${spec.fixtureId} outcome`);
    assertEqual(
      [...result.reason_codes].sort(),
      [...spec.expectedReasonCodes].sort(),
      `${spec.fixtureId} reason_codes`,
    );

    results.push({
      fixture_id: spec.fixtureId,
      family: "approval",
      entry: {
        fixture_id: spec.fixtureId,
        classification: spec.classification,
        purpose: spec.purpose,
        input: `conformance/fixtures/approval/${spec.fixtureId}.json`,
        input_sha256: sha256,
        requirement_ids: ["NRS-APPROVE-0002", "NRS-APPROVE-0004"],
        expected: {
          kind: "approval_check",
          approval_result: {
            check_id: APPROVAL_SCOPE_CHECK_ID,
            execution: spec.expectedExecution,
            outcome: spec.expectedOutcome,
            reason_codes: spec.expectedReasonCodes,
          },
        },
      },
    });
  }

  return results;
}
