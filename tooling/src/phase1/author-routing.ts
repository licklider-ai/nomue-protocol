/**
 * Routing fixture authoring (S-001 and ROUTE-001..ROUTE-008).
 *
 * Expected outcomes are NOT declared here: they come from the hand-authored
 * normative table conformance/expectations/routing-expectations.yaml. This
 * module builds the fixture inputs, replays the verifier, ASSERTS the
 * implementation against the expectations (authoring aborts on any
 * disagreement), runs the registry-order invariance procedure for the
 * ROUTE-007/ROUTE-008 fixtures, and returns manifest entries.
 *
 * S-001 keeps its Phase 1 input BYTES unchanged (asserted against the
 * historical input hash below); only its expectations were corrected by
 * ADR-0017 from "first registered bundle's schema, conformance fail" to
 * "routing refusal". The input's meaning - a Record-shaped document that
 * declares no interpretation bundle - is untouched.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { sha256HexOfUtf8 } from "../../../reference/verifier/src/digest.js";
import { loadVerifierResources } from "../../../reference/verifier/src/resources.js";
import { verifyRecordText } from "../../../reference/verifier/src/verify.js";
import { loadYaml, repoRoot } from "../lib/repo.js";
import { runRoutingInvariance, type RoutingInvarianceInput } from "./routing-invariance.js";

/**
 * Pinned Phase 1 input hash for S-001: the reclassification must not change
 * a single input byte (ADR-0017). Authoring aborts if the rebuilt input
 * drifts from this value.
 */
// Pin history: afe74c54bb4f9c45e0fb25c9dc548ea5ff2b93993ebf9b30d8dab9dbeb3d3845
// was the ADR-0017-era value; changed 2026-08-13 by the ADR-0027 pre-release
// canonicalization revision (the input embeds the canonicalization id and a
// content digest, both of which the ratified destructive revision changed).
const S001_HISTORICAL_INPUT_SHA256 =
  "480282507229c7f048c3a423f4a5f594e62b0c9f2a83c38551d9a93c2199168c";

interface Json {
  [key: string]: unknown;
}

interface RoutingExpectationEntry {
  family: string;
  classification: string;
  purpose: string;
  requirement_ids: string[];
  expected: {
    kind: "refusal" | "routing_invariance";
    cli_exit_code: number | null;
    refusal_kind?: string;
    refusal_reason_codes?: string[];
    refusal_declared_bundle_id?: string;
    registry_order?: "reversed" | "seeded_shuffle";
    outcomes_identical?: boolean;
  };
}

interface RoutingExpectationsFile {
  manifest: string;
  fixtures: Record<string, RoutingExpectationEntry>;
}

export interface RoutingManifestFixture {
  fixture_id: string;
  family: string;
  entry: Json;
}

function assertEqual(actual: unknown, expected: unknown, context: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${context}: expected ${e}, got ${a}`);
}

const sortCodes = (codes: string[]): string[] => [...codes].sort();

/**
 * Probe set replayed by the registry-order invariance fixtures. The
 * duplicate-bundle inputs (JSON-DUP-002/003) prove that an ambiguous
 * declaration is refused identically under any registry order - neither
 * first-wins nor last-wins dispatch exists to be order-sensitive.
 */
const INVARIANCE_PROBES = [
  "conformance/fixtures/routing/S-001.json",
  "conformance/fixtures/routing/ROUTE-001.json",
  "conformance/fixtures/routing/ROUTE-002.json",
  "conformance/fixtures/routing/ROUTE-003.json",
  "conformance/fixtures/routing/ROUTE-004.json",
  "conformance/fixtures/routing/ROUTE-005.json",
  "conformance/fixtures/routing/ROUTE-006.json",
  "conformance/fixtures/strict_json/JSON-DUP-002.json",
  "conformance/fixtures/strict_json/JSON-DUP-003.json",
  "conformance/fixtures/public_checks/V-001.json",
  "conformance/fixtures/public_checks/A2-V-001.json",
] as const;

/** Fixture input texts (routing envelopes are deliberately minimal). */
function buildRoutingInputs(s001Record: Json): Map<string, string> {
  const jsonText = (value: unknown): string => `${JSON.stringify(value, null, 2)}\n`;
  const inputs = new Map<string, string>();
  inputs.set("S-001", jsonText(s001Record));
  inputs.set("ROUTE-001", jsonText({}));
  inputs.set("ROUTE-002", jsonText({ interpretation_bundle_id: 42 }));
  inputs.set("ROUTE-003", jsonText({ interpretation_bundle_id: null }));
  inputs.set(
    "ROUTE-004",
    jsonText({ interpretation_bundle_id: "urn:nomue:bundle:never-registered:1.0.0" }),
  );
  inputs.set(
    "ROUTE-005",
    jsonText({ interpretation_bundle_id: "urn:nomue:bundle:itgc-minimal:0.1.1-draft.1" }),
  );
  inputs.set(
    "ROUTE-006",
    jsonText({ interpretation_bundle_id: "urn:nomue:bundle:itgc-guarantee:0.2.0-draft.2" }),
  );
  return inputs;
}

/**
 * Build the routing fixtures. Must run AFTER the Phase 1 and Phase 2A
 * fixtures are written: the invariance probes reference V-001 and A2-V-001
 * by path.
 */
export function buildRoutingFixtures(s001Record: Json): RoutingManifestFixture[] {
  const expectations = loadYaml<RoutingExpectationsFile>(
    "conformance/expectations/routing-expectations.yaml",
  );
  const inputs = buildRoutingInputs(s001Record);
  const resources = loadVerifierResources();
  const out: RoutingManifestFixture[] = [];

  for (const [fixtureId, spec] of Object.entries(expectations.fixtures)) {
    const inputRel = `conformance/fixtures/routing/${fixtureId}.json`;
    const abs = path.join(repoRoot, inputRel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });

    let text: string;
    if (spec.expected.kind === "routing_invariance") {
      const order = spec.expected.registry_order;
      if (order === undefined) throw new Error(`${fixtureId}: registry_order missing`);
      const invarianceInput: RoutingInvarianceInput = {
        routing_invariance: { registry_order: order, probes: [...INVARIANCE_PROBES] },
      };
      text = `${JSON.stringify(invarianceInput, null, 2)}\n`;
      fs.writeFileSync(abs, text, "utf8");
      const result = runRoutingInvariance(invarianceInput);
      assertEqual(result.identical, spec.expected.outcomes_identical, `${fixtureId} invariance`);
      out.push({
        fixture_id: fixtureId,
        family: spec.family,
        entry: {
          fixture_id: fixtureId,
          classification: spec.classification,
          purpose: spec.purpose,
          input: inputRel,
          input_sha256: sha256HexOfUtf8(text),
          requirement_ids: [...spec.requirement_ids],
          expected: {
            kind: "routing_invariance",
            cli_exit_code: null,
            outcomes_identical: spec.expected.outcomes_identical,
          },
        },
      });
      continue;
    }

    const built = inputs.get(fixtureId);
    if (built === undefined) throw new Error(`no input builder for ${fixtureId}`);
    text = built;
    fs.writeFileSync(abs, text, "utf8");

    if (fixtureId === "S-001" && sha256HexOfUtf8(text) !== S001_HISTORICAL_INPUT_SHA256) {
      throw new Error(
        `S-001 input bytes drifted from the pinned input (got ${sha256HexOfUtf8(text)}); an input change requires a documented revision (ADR-0017 discipline; last changed by ADR-0027)`,
      );
    }

    const outcome = verifyRecordText(text);
    assertEqual(outcome.exitCode, spec.expected.cli_exit_code, `${fixtureId} exit`);
    const refusal = outcome.refusal;
    if (refusal === undefined) throw new Error(`${fixtureId}: expected a refusal`);
    if (outcome.report !== undefined) throw new Error(`${fixtureId}: no report may exist`);
    assertEqual(refusal.refusal_kind, spec.expected.refusal_kind, `${fixtureId} kind`);
    assertEqual(
      sortCodes(refusal.reason_codes),
      sortCodes(spec.expected.refusal_reason_codes ?? []),
      `${fixtureId} refusal codes`,
    );
    assertEqual(
      refusal.declared_bundle_id,
      spec.expected.refusal_declared_bundle_id,
      `${fixtureId} declared bundle id`,
    );
    if (resources.validateRefusal(refusal) !== true) {
      throw new Error(
        `${fixtureId}: refusal does not validate against the refusal schema: ${JSON.stringify(
          resources.validateRefusal.errors,
        )}`,
      );
    }

    out.push({
      fixture_id: fixtureId,
      family: spec.family,
      entry: {
        fixture_id: fixtureId,
        classification: spec.classification,
        purpose: spec.purpose,
        input: inputRel,
        input_sha256: sha256HexOfUtf8(text),
        requirement_ids: [...spec.requirement_ids],
        expected: {
          kind: "refusal",
          cli_exit_code: spec.expected.cli_exit_code,
          refusal_kind: spec.expected.refusal_kind,
          refusal_reason_codes: [...(spec.expected.refusal_reason_codes ?? [])],
          ...(spec.expected.refusal_declared_bundle_id === undefined
            ? {}
            : { refusal_declared_bundle_id: spec.expected.refusal_declared_bundle_id }),
          refusal_schema_valid: true,
        },
      },
    });
  }

  return out;
}
