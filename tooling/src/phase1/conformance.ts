/**
 * Conformance fixture runner: replays every fixture pinned in
 * conformance/manifest.yaml against the reference verifier (or, for
 * report_schema fixtures, against the report schema) and compares the
 * observed behavior with the pinned expectations.
 */

import {
  checkApprovalScope,
  type ApprovalScopeCheckInput,
} from "../../../reference/verifier/src/approval.js";
import {
  evaluateOperation,
  loadLifecycleOperations,
  projectState,
} from "../../../reference/verifier/src/lifecycle.js";
import { loadVerifierResources } from "../../../reference/verifier/src/resources.js";
import { sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { semanticProjectionHash } from "../../../reference/verifier/src/projection.js";
import { parseStrictJson } from "../../../reference/verifier/src/strict-json.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { loadYaml, readText, type Issue } from "../lib/repo.js";
import { runRoutingInvariance, type RoutingInvarianceInput } from "./routing-invariance.js";
import { compilePhase1Schemas } from "./schemas.js";

interface ExpectedCheck {
  check_id: string;
  execution: string;
  outcome: string | null;
  reason_codes: string[];
}

interface FixtureEntry {
  fixture_id: string;
  classification: string;
  input: string;
  input_sha256: string;
  requirement_ids: string[];
  expected: {
    kind:
      | "record"
      | "refusal"
      | "report_schema"
      | "routing_invariance"
      | "approval_check"
      | "lifecycle_check";
    cli_exit_code?: number | null;
    conformance_check_id?: string;
    conformance?: { execution: string; outcome: string | null; reason_codes: string[] };
    checks?: ExpectedCheck[];
    approval_result?: ExpectedCheck;
    axes?: Record<string, string>;
    decision?: {
      result: string;
      reason_codes?: string[];
      violated?: Array<{ axis: string; predicate: string }>;
      missing_whats?: string[];
    };
    semantic_projection_hash?: string;
    refusal_kind?: string;
    limit_category?: string;
    refusal_reason_codes?: string[];
    refusal_declared_bundle_id?: string;
    refusal_schema_valid?: boolean;
    schema_valid?: boolean;
    outcomes_identical?: boolean;
  };
}

export interface ConformanceManifestFile {
  manifest: string;
  families: Array<{
    family: string;
    status: string;
    fixtures: FixtureEntry[];
    requirement_ids: string[];
  }>;
}

export function loadConformanceFixtures(): { family: string; fixture: FixtureEntry }[] {
  const manifest = loadYaml<ConformanceManifestFile>("conformance/manifest.yaml");
  return manifest.families.flatMap((family) =>
    family.fixtures.map((fixture) => ({ family: family.family, fixture })),
  );
}

const sorted = (values: string[]): string[] => [...values].sort();

export interface ConformanceFilter {
  includePrefix?: string;
  excludePrefix?: string;
}

export function runConformanceSuite(filter?: ConformanceFilter): {
  issues: Issue[];
  executed: number;
} {
  const check = "conformance-suite";
  const issues: Issue[] = [];
  const fixtures = loadConformanceFixtures().filter(({ fixture }) => {
    if (
      filter?.includePrefix !== undefined &&
      !fixture.fixture_id.startsWith(filter.includePrefix)
    ) {
      return false;
    }
    if (
      filter?.excludePrefix !== undefined &&
      fixture.fixture_id.startsWith(filter.excludePrefix)
    ) {
      return false;
    }
    return true;
  });
  const compiled = compilePhase1Schemas();
  const { validateReport, validateRefusal } = compiled;
  // Schema-compilation problems must fail the suite, not silently skip
  // refusal/report validation.
  issues.push(...compiled.issues);

  for (const { fixture } of fixtures) {
    const label = fixture.fixture_id;
    let input: string;
    try {
      input = readText(fixture.input);
    } catch (err) {
      issues.push({
        check,
        file: fixture.input,
        message: `${label}: missing input (${String(err)})`,
      });
      continue;
    }
    if (sha256HexOfUtf8(input) !== fixture.input_sha256) {
      issues.push({
        check,
        file: fixture.input,
        message: `${label}: input hash does not match the pinned input_sha256`,
      });
      continue;
    }

    if (fixture.expected.kind === "routing_invariance") {
      // Registry-order invariance (NRS-VERSION-0007): replay the pinned
      // probe set against a permuted bundle registry; every outcome must be
      // identical to the canonical order.
      let result;
      try {
        // The suite's own instruction files are held to the same strict
        // input standard as verifier input.
        result = runRoutingInvariance(parseStrictJson(input) as RoutingInvarianceInput);
      } catch (err) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: routing invariance run failed (${String(err)})`,
        });
        continue;
      }
      if (result.identical !== (fixture.expected.outcomes_identical ?? false)) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: outcomes identical ${result.identical} differs from expected ${String(
            fixture.expected.outcomes_identical,
          )}; ${result.mismatches.join("; ")}`,
        });
      }
      continue;
    }

    if (fixture.expected.kind === "approval_check") {
      // approval_check fixtures are not Records: the shared parser guards
      // this input the same as any verifier input, but the result is
      // computed by calling checkApprovalScope directly (NRS-APPROVE-0004),
      // not by routing through verifyRecordText - there is no bundle whose
      // schema declares an approval field yet (spec/approval/README.md).
      // The result is pinned under approval_result, not checks, precisely
      // because it is not a registries/public-checks.yaml check: reusing
      // the checks field would make registry-cross-checks.ts require it to
      // be a registered public check, which would misrepresent this
      // increment's scope (NRS-APPROVAL-ABSENT and NRS-APPROVAL-SCOPE-
      // MISMATCH are registered reason codes with applicable_check_ids: [],
      // consistent with how the attestation increment registered its own
      // non-public-check reason codes).
      let parsed: ApprovalScopeCheckInput;
      try {
        parsed = parseStrictJson(input) as ApprovalScopeCheckInput;
      } catch (err) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: approval_check input parse failed (${String(err)})`,
        });
        continue;
      }
      const result = checkApprovalScope(parsed);
      const expectedCheck = fixture.expected.approval_result;
      if (expectedCheck === undefined) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: approval_check fixture is missing expected.approval_result`,
        });
        continue;
      }
      const actualShape = {
        execution: result.execution,
        outcome: result.outcome ?? null,
        reason_codes: sorted(result.reason_codes),
      };
      const expectedShape = {
        execution: expectedCheck.execution,
        outcome: expectedCheck.outcome,
        reason_codes: sorted(expectedCheck.reason_codes),
      };
      if (JSON.stringify(actualShape) !== JSON.stringify(expectedShape)) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: approval_check ${JSON.stringify(actualShape)} differs from expected ${JSON.stringify(expectedShape)}`,
        });
      }
      continue;
    }

    if (fixture.expected.kind === "lifecycle_check") {
      // lifecycle_check fixtures are projection/operation inputs, not
      // Records: the shared strict parser guards the input, then
      // projectState/evaluateOperation (NRS-CORE-0013..0018) compute the
      // result exactly as the reference implementation defines it.
      let parsed: Record<string, unknown>;
      try {
        parsed = parseStrictJson(input) as Record<string, unknown>;
      } catch (err) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: lifecycle_check input parse failed (${String(err)})`,
        });
        continue;
      }
      const view = projectState({
        record: parsed["record"] as Record<string, unknown>,
        report: (parsed["report"] ?? undefined) as never,
        approval: (parsed["approval"] ?? null) as never,
        notices: (parsed["notices"] ?? []) as never,
        registeredBundleIds: [...loadVerifierResources().bundles.keys()],
        evaluationTimeIso: String(parsed["evaluation_time"]),
      });
      if (parsed["mode"] === "projection") {
        const actual = Object.fromEntries(
          Object.entries(view.axes).map(([axis, state]) => [axis, state.value]),
        );
        if (JSON.stringify(actual) !== JSON.stringify(fixture.expected.axes ?? {})) {
          issues.push({
            check,
            file: fixture.input,
            message: `${label}: axes ${JSON.stringify(actual)} differ from expected ${JSON.stringify(fixture.expected.axes)}`,
          });
        }
      } else {
        const decision = evaluateOperation(
          String(parsed["operation"]),
          view,
          loadLifecycleOperations(),
        );
        const expected = fixture.expected.decision;
        if (expected === undefined) {
          issues.push({
            check,
            file: fixture.input,
            message: `${label}: missing expected.decision`,
          });
          continue;
        }
        if (decision.result !== expected.result) {
          issues.push({
            check,
            file: fixture.input,
            message: `${label}: decision ${decision.result} differs from expected ${expected.result}`,
          });
          continue;
        }
        if (decision.result === "refused") {
          const actualViolated = decision.violated.map((v) => ({
            axis: v.axis,
            predicate: v.predicate,
          }));
          if (
            JSON.stringify(decision.reason_codes) !== JSON.stringify(expected.reason_codes) ||
            JSON.stringify(actualViolated) !== JSON.stringify(expected.violated)
          ) {
            issues.push({
              check,
              file: fixture.input,
              message: `${label}: refusal detail differs from expected`,
            });
          }
        }
        if (decision.result === "needs_clarification") {
          const whats = decision.clarification.missing.map((m) => m.what);
          if (JSON.stringify(whats) !== JSON.stringify(expected.missing_whats)) {
            issues.push({
              check,
              file: fixture.input,
              message: `${label}: clarification missing list differs from expected`,
            });
          }
        }
      }
      continue;
    }

    if (fixture.expected.kind === "report_schema") {
      if (validateReport === undefined) {
        issues.push({ check, message: `${label}: report schema unavailable` });
        continue;
      }
      // report_schema fixture inputs go through the same strict parser as
      // verifier input (a duplicate member here would otherwise collapse
      // silently before schema validation).
      const valid = validateReport(parseStrictJson(input)) === true;
      if (valid !== (fixture.expected.schema_valid ?? false)) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: report schema validity ${valid} differs from expected ${String(
            fixture.expected.schema_valid,
          )}`,
        });
      }
      continue;
    }

    const outcome = verifyRecordText(input);
    if (outcome.exitCode !== fixture.expected.cli_exit_code) {
      issues.push({
        check,
        file: fixture.input,
        message: `${label}: exit code ${outcome.exitCode} differs from expected ${String(
          fixture.expected.cli_exit_code,
        )}`,
      });
      continue;
    }

    if (fixture.expected.kind === "refusal") {
      const refusal = outcome.refusal;
      if (refusal === undefined) {
        issues.push({ check, file: fixture.input, message: `${label}: expected a refusal` });
        continue;
      }
      // A refusal is never a partial success: no verification report (and
      // therefore no recomputed digest) may coexist with it.
      if (outcome.report !== undefined) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: a refusal fixture produced a verification report`,
        });
      }
      if (refusal.refusal_kind !== fixture.expected.refusal_kind) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: refusal kind ${refusal.refusal_kind} differs from expected`,
        });
      }
      if (
        fixture.expected.limit_category !== undefined &&
        refusal.limit_category !== fixture.expected.limit_category
      ) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: refusal limit_category ${String(refusal.limit_category)} differs from expected`,
        });
      }
      if (
        JSON.stringify(sorted(refusal.reason_codes)) !==
        JSON.stringify(sorted(fixture.expected.refusal_reason_codes ?? []))
      ) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: refusal reason codes differ from expected`,
        });
      }
      if (
        fixture.expected.refusal_declared_bundle_id !== undefined &&
        refusal.declared_bundle_id !== fixture.expected.refusal_declared_bundle_id
      ) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: refusal declared_bundle_id ${String(refusal.declared_bundle_id)} differs from expected`,
        });
      }
      // Every emitted refusal conforms to the refusal schema (NRS-VERIFY-0018).
      if (validateRefusal === undefined) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: refusal schema unavailable; refusal cannot be validated`,
        });
      } else {
        const schemaValid = validateRefusal(refusal) === true;
        if (!schemaValid) {
          issues.push({
            check,
            file: fixture.input,
            message: `${label}: refusal does not validate against the refusal schema`,
          });
        }
        // When the manifest pins refusal_schema_valid, the observed result
        // must equal the pin (the pin is enforced, not decorative).
        if (
          fixture.expected.refusal_schema_valid !== undefined &&
          schemaValid !== fixture.expected.refusal_schema_valid
        ) {
          issues.push({
            check,
            file: fixture.input,
            message: `${label}: refusal schema validity ${schemaValid} differs from pinned ${fixture.expected.refusal_schema_valid}`,
          });
        }
      }
      continue;
    }

    const report = outcome.report;
    if (report === undefined) {
      issues.push({ check, file: fixture.input, message: `${label}: expected a report` });
      continue;
    }
    const expectedConformance = fixture.expected.conformance;
    if (expectedConformance !== undefined) {
      const actual = {
        execution: report.conformance.execution,
        outcome: report.conformance.outcome ?? null,
        reason_codes: sorted(report.conformance.reason_codes),
      };
      const expected = {
        execution: expectedConformance.execution,
        outcome: expectedConformance.outcome,
        reason_codes: sorted(expectedConformance.reason_codes),
      };
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: conformance ${JSON.stringify(actual)} differs from expected ${JSON.stringify(expected)}`,
        });
      }
    }
    for (const expectedCheck of fixture.expected.checks ?? []) {
      const actual = report.verification_results.find((r) => r.check_id === expectedCheck.check_id);
      if (actual === undefined) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: missing check ${expectedCheck.check_id}`,
        });
        continue;
      }
      const actualShape = {
        execution: actual.execution,
        outcome: actual.outcome ?? null,
        reason_codes: sorted(actual.reason_codes),
      };
      const expectedShape = {
        execution: expectedCheck.execution,
        outcome: expectedCheck.outcome,
        reason_codes: sorted(expectedCheck.reason_codes),
      };
      if (JSON.stringify(actualShape) !== JSON.stringify(expectedShape)) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label} ${expectedCheck.check_id}: ${JSON.stringify(actualShape)} differs from expected ${JSON.stringify(expectedShape)}`,
        });
      }
    }
    const expectedHash = fixture.expected.semantic_projection_hash;
    if (expectedHash !== undefined) {
      const actualHash = semanticProjectionHash(report);
      if (actualHash !== expectedHash) {
        issues.push({
          check,
          file: fixture.input,
          message: `${label}: semantic projection hash ${actualHash} differs from pinned ${expectedHash}`,
        });
      }
    }
  }

  return { issues, executed: fixtures.length };
}
