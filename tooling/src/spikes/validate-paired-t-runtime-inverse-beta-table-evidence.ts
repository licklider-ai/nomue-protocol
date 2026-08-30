/** Validate the generated, non-authoritative runtime inverse-beta table evidence. */

import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCOPE = "contiguous_df_1_200_inverse_beta_table_evidence_not_protocol_support";
const CANDIDATE_KEY = "paired-t-d5-runtime-inverse-beta-table-evaluation-1";
const COMMIT = /^[0-9a-f]{40}$/;
const HEX64 = /^[0-9a-f]{16}$/;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const DF_MIN = 1;
const DF_MAX = 200;
const MACHIN_TERMS = 96;
const EXPECTED_FILES = [
  "MANIFEST.sha256",
  "environment.json",
  "generator.py",
  "inverse-beta-table-evidence.json",
  "runtime-inverse-beta-table-candidate.json",
  "runtime-inverse-beta-table.json",
] as const;

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

type JsonRecord = Record<string, unknown>;

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function sha256(value: Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function exactKeys(actual: JsonRecord, expected: readonly string[]): boolean {
  const left = Object.keys(actual).sort();
  const right = [...expected].sort();
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}

function parseJson(filePath: string, errors: string[]): unknown {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as unknown;
  } catch {
    errors.push(`${path.basename(filePath)}: not valid JSON`);
    return undefined;
  }
}

function absolute(value: bigint): bigint {
  return value < 0n ? -value : value;
}

function gcd(first: bigint, second: bigint): bigint {
  let left = absolute(first);
  let right = absolute(second);
  while (right !== 0n) [left, right] = [right, left % right];
  return left;
}

function rational(numerator: bigint, denominator: bigint): Rational {
  if (denominator === 0n) throw new RangeError("zero denominator");
  const sign = denominator < 0n ? -1n : 1n;
  const divisor = gcd(numerator, denominator);
  return {
    numerator: (sign * numerator) / divisor,
    denominator: absolute(denominator) / divisor,
  };
}

function parseRational(value: unknown): Rational | undefined {
  if (typeof value !== "string") return undefined;
  const match = /^(-?(?:0|[1-9][0-9]*))\/([1-9][0-9]*)$/.exec(value);
  if (match === null || match[1] === undefined || match[2] === undefined) return undefined;
  const result = rational(BigInt(match[1]), BigInt(match[2]));
  return `${result.numerator}/${result.denominator}` === value ? result : undefined;
}

function text(value: Rational): string {
  return `${value.numerator}/${value.denominator}`;
}

function compare(first: Rational, second: Rational): number {
  const difference = first.numerator * second.denominator - second.numerator * first.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function add(first: Rational, second: Rational): Rational {
  return rational(
    first.numerator * second.denominator + second.numerator * first.denominator,
    first.denominator * second.denominator,
  );
}

function subtract(first: Rational, second: Rational): Rational {
  return rational(
    first.numerator * second.denominator - second.numerator * first.denominator,
    first.denominator * second.denominator,
  );
}

function multiply(first: Rational, second: Rational): Rational {
  return rational(first.numerator * second.numerator, first.denominator * second.denominator);
}

function divide(first: Rational, second: Rational): Rational {
  return rational(first.numerator * second.denominator, first.denominator * second.numerator);
}

function integer(value: number): Rational {
  return rational(BigInt(value), 1n);
}

function power(base: bigint, exponent: number): bigint {
  let result = 1n;
  let factor = base;
  let remaining = exponent;
  while (remaining > 0) {
    if (remaining % 2 === 1) result *= factor;
    remaining = Math.floor(remaining / 2);
    if (remaining > 0) factor *= factor;
  }
  return result;
}

function arctanReciprocalInterval(reciprocal: number): [Rational, Rational] {
  let total = rational(0n, 1n);
  for (let index = 0; index < MACHIN_TERMS; index += 1) {
    const term = rational(1n, BigInt(2 * index + 1) * power(BigInt(reciprocal), 2 * index + 1));
    total = index % 2 === 0 ? add(total, term) : subtract(total, term);
  }
  const next = rational(
    1n,
    BigInt(2 * MACHIN_TERMS + 1) * power(BigInt(reciprocal), 2 * MACHIN_TERMS + 1),
  );
  const endpoint = MACHIN_TERMS % 2 === 0 ? add(total, next) : subtract(total, next);
  return compare(total, endpoint) <= 0 ? [total, endpoint] : [endpoint, total];
}

function machinPiInterval(): [Rational, Rational] {
  const five = arctanReciprocalInterval(5);
  const twoThirtyNine = arctanReciprocalInterval(239);
  return [
    subtract(multiply(integer(16), five[0]), multiply(integer(4), twoThirtyNine[1])),
    subtract(multiply(integer(16), five[1]), multiply(integer(4), twoThirtyNine[0])),
  ];
}

function recurrenceCoefficients(): Map<number, Rational> {
  const values = new Map<number, Rational>([
    [1, rational(1n, 1n)],
    [2, rational(1n, 2n)],
  ]);
  for (let df = 3; df <= DF_MAX; df += 1) {
    const previous = values.get(df - 2);
    if (previous === undefined) throw new Error("missing recurrence predecessor");
    values.set(df, multiply(previous, rational(BigInt(df - 1), BigInt(df - 2))));
  }
  return values;
}

function binary64BitsToRational(bits: bigint): Rational | undefined {
  const negative = bits >> 63n === 1n;
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  const fractionBits = bits & ((1n << 52n) - 1n);
  if (exponentBits === 0x7ff) return undefined;
  if (exponentBits === 0 && fractionBits === 0n) return rational(0n, 1n);
  const significand = exponentBits === 0 ? fractionBits : (1n << 52n) | fractionBits;
  const exponent = exponentBits === 0 ? -1074 : exponentBits - 1023 - 52;
  const signedSignificand = negative ? -significand : significand;
  return exponent >= 0
    ? rational(signedSignificand << BigInt(exponent), 1n)
    : rational(signedSignificand, 1n << BigInt(-exponent));
}

function roundingCellFromHex(hex: string): [Rational, Rational] | undefined {
  if (!HEX64.test(hex)) return undefined;
  const bits = BigInt(`0x${hex}`);
  if (bits === 0n || bits >> 63n === 1n || bits >= 0x7ff0_0000_0000_0000n) return undefined;
  const previous = binary64BitsToRational(bits - 1n);
  const value = binary64BitsToRational(bits);
  const next = binary64BitsToRational(bits + 1n);
  if (previous === undefined || value === undefined || next === undefined) return undefined;
  return [divide(add(previous, value), integer(2)), divide(add(value, next), integer(2))];
}

function parseInterval(value: unknown): [Rational, Rational] | undefined {
  if (!isRecord(value) || !exactKeys(value, ["lower", "upper"])) return undefined;
  const lower = parseRational(value["lower"]);
  const upper = parseRational(value["upper"]);
  if (lower === undefined || upper === undefined || compare(lower, upper) > 0) return undefined;
  return [lower, upper];
}

function equalInterval(value: unknown, expected: [Rational, Rational]): boolean {
  const actual = parseInterval(value);
  return (
    actual !== undefined &&
    compare(actual[0], expected[0]) === 0 &&
    compare(actual[1], expected[1]) === 0
  );
}

function validateProjection(
  label: string,
  enclosureValue: unknown,
  projectionValue: unknown,
  errors: string[],
): [Rational, Rational] | undefined {
  const enclosure = parseInterval(enclosureValue);
  if (
    enclosure === undefined ||
    !isRecord(projectionValue) ||
    !exactKeys(projectionValue, [
      "binary64_hex",
      "cell_lower",
      "cell_upper",
      "strict_containment",
    ]) ||
    typeof projectionValue["binary64_hex"] !== "string"
  ) {
    errors.push(`${label}: enclosure or projection is invalid`);
    return undefined;
  }
  const cell = roundingCellFromHex(projectionValue["binary64_hex"]);
  const declaredLower = parseRational(projectionValue["cell_lower"]);
  const declaredUpper = parseRational(projectionValue["cell_upper"]);
  if (
    cell === undefined ||
    declaredLower === undefined ||
    declaredUpper === undefined ||
    compare(cell[0], declaredLower) !== 0 ||
    compare(cell[1], declaredUpper) !== 0 ||
    compare(cell[0], enclosure[0]) >= 0 ||
    compare(enclosure[1], cell[1]) >= 0 ||
    projectionValue["strict_containment"] !== true
  ) {
    errors.push(`${label}: enclosure does not strictly isolate the declared binary64 cell`);
    return undefined;
  }
  return enclosure;
}

const EXPECTED_CANDIDATE = {
  status: "non_authoritative_candidate",
  issuance: "unissued",
  review_issue: "https://github.com/licklider-ai/nomue-protocol/issues/25",
  candidate_key: CANDIDATE_KEY,
  selection_state: "evidence_evaluation_only_not_runtime_selected",
  runtime_support_enabled: false,
  final_table_selected: false,
  degrees_of_freedom_evaluation: {
    minimum: 1,
    maximum_target: 200,
    entry_count: 200,
    contiguous_evidence_coverage_claimed: true,
    supported_maximum: null,
  },
  constant_definition: {
    expression: "one_over_beta_df_over_two_one_half",
    target_format: "binary64_round_ties_to_even",
    primary_certificate: "arb_gamma_ratio_exact_integer_df",
    secondary_certificate: "exact_even_recurrence_or_machin_pi_odd_recurrence",
    recurrence: "constant_df_plus_two_equals_constant_df_times_df_plus_one_over_df",
  },
  evidence_surface: {
    generator: "tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py",
    validator: "tooling/src/spikes/validate-paired-t-runtime-inverse-beta-table-evidence.ts",
    mutation_probe: "tooling/src/spikes/probe-paired-t-runtime-inverse-beta-table-evidence.ts",
    table_content_hash: null,
    independent_review_complete: false,
  },
  held_decisions: [
    "runtime_table_selection",
    "final_table_content_hash",
    "final_supported_degrees_of_freedom_maximum",
    "global_truth_error_bound_ulp",
    "supported_platform_matrix",
    "runtime_support_activation",
  ],
  prohibited_claims: [
    "supported_runtime_inverse_beta_table",
    "supported_df_max",
    "complete_operation_graph_truth_bound",
    "correctly_rounded_runtime_p_value",
    "authoritative_public_check_or_bundle",
  ],
} as const;

export function validatePairedTRuntimeInverseBetaTableCandidate(candidate: unknown): string[] {
  if (!isRecord(candidate)) return ["inverse-beta table candidate is not an object"];
  if (JSON.stringify(candidate) !== JSON.stringify(EXPECTED_CANDIDATE)) {
    return ["inverse-beta table candidate differs from the closed non-runtime checkpoint"];
  }
  return [];
}

function validateManifest(bundlePath: string, errors: string[]): void {
  const lines = readFileSync(path.join(bundlePath, "MANIFEST.sha256"), "utf8")
    .trimEnd()
    .split("\n");
  const expectedNames = [...EXPECTED_FILES].filter((entry) => entry !== "MANIFEST.sha256").sort();
  const actualNames: string[] = [];
  for (const line of lines) {
    const match = /^([0-9a-f]{64})  ([A-Za-z0-9._-]+)$/.exec(line);
    if (match === null || match[1] === undefined || match[2] === undefined) {
      errors.push("MANIFEST.sha256: malformed line");
      continue;
    }
    actualNames.push(match[2]);
    const filePath = path.join(bundlePath, match[2]);
    if (sha256(readFileSync(filePath)) !== `sha256:${match[1]}`) {
      errors.push(`${match[2]}: manifest hash mismatch`);
    }
  }
  if (actualNames.sort().join("\n") !== expectedNames.join("\n")) {
    errors.push("manifest file set differs from the closed evidence surface");
  }
}

export function validatePairedTRuntimeInverseBetaTableEvidenceBundle(
  bundlePath: string,
  expectedCommit: string,
): string[] {
  const errors: string[] = [];
  if (!COMMIT.test(expectedCommit)) return ["expected commit is not a full lowercase git hash"];
  const entries = readdirSync(bundlePath).sort();
  if (entries.join("\n") !== [...EXPECTED_FILES].sort().join("\n")) {
    return ["bundle file set differs from the closed evidence surface"];
  }
  for (const entry of entries) {
    if (lstatSync(path.join(bundlePath, entry)).isSymbolicLink()) {
      errors.push(`${entry}: symlinks are not allowed in the evidence bundle`);
    }
  }
  if (errors.length > 0) return errors;
  validateManifest(bundlePath, errors);

  const sourceMappings = {
    "generator.py": "tooling/r2-paired-t-runtime-series/generate_inverse_beta_table_evidence.py",
    "runtime-inverse-beta-table-candidate.json":
      "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json",
  } as const;
  for (const [copyName, repositoryPath] of Object.entries(sourceMappings)) {
    if (
      !readFileSync(path.join(bundlePath, copyName)).equals(
        readFileSync(path.join(repositoryRoot, repositoryPath)),
      )
    ) {
      errors.push(`${copyName}: bundled source differs from repository`);
    }
  }

  const candidate = parseJson(
    path.join(bundlePath, "runtime-inverse-beta-table-candidate.json"),
    errors,
  );
  const table = parseJson(path.join(bundlePath, "runtime-inverse-beta-table.json"), errors);
  const evidence = parseJson(path.join(bundlePath, "inverse-beta-table-evidence.json"), errors);
  const environmentPath = path.join(bundlePath, "environment.json");
  const environment = parseJson(environmentPath, errors);
  if (
    candidate === undefined ||
    table === undefined ||
    evidence === undefined ||
    environment === undefined
  ) {
    return errors;
  }
  errors.push(...validatePairedTRuntimeInverseBetaTableCandidate(candidate));
  if (!isRecord(table) || !isRecord(evidence) || !isRecord(environment)) {
    errors.push("table, evidence, and environment must be JSON objects");
    return errors;
  }

  if (
    !exactKeys(table, [
      "status",
      "scope",
      "candidate_key",
      "target_format",
      "degrees_of_freedom_minimum",
      "degrees_of_freedom_maximum_evaluation_target",
      "entry_count",
      "contiguous_evidence_coverage_claimed",
      "supported_degrees_of_freedom_max",
      "runtime_support_claimed",
      "final_table_selected",
      "entries",
    ]) ||
    table["status"] !== "non_authoritative_candidate" ||
    table["scope"] !== SCOPE ||
    table["candidate_key"] !== CANDIDATE_KEY ||
    table["target_format"] !== "binary64_round_ties_to_even" ||
    table["degrees_of_freedom_minimum"] !== DF_MIN ||
    table["degrees_of_freedom_maximum_evaluation_target"] !== DF_MAX ||
    table["entry_count"] !== DF_MAX ||
    table["contiguous_evidence_coverage_claimed"] !== true ||
    table["supported_degrees_of_freedom_max"] !== null ||
    table["runtime_support_claimed"] !== false ||
    table["final_table_selected"] !== false ||
    !Array.isArray(table["entries"])
  ) {
    errors.push("inverse-beta table overclaims maturity or differs from its closed surface");
    return errors;
  }

  if (
    !exactKeys(evidence, [
      "status",
      "scope",
      "generator_commit",
      "runtime_support_claimed",
      "final_table_selected",
      "supported_degrees_of_freedom_max",
      "entry_count",
      "table_content_hash",
      "source_hashes",
      "environment_hash",
      "entries",
    ]) ||
    evidence["status"] !== "non_authoritative_candidate" ||
    evidence["scope"] !== SCOPE ||
    evidence["generator_commit"] !== expectedCommit ||
    evidence["runtime_support_claimed"] !== false ||
    evidence["final_table_selected"] !== false ||
    evidence["supported_degrees_of_freedom_max"] !== null ||
    evidence["entry_count"] !== DF_MAX ||
    !Array.isArray(evidence["entries"])
  ) {
    errors.push("inverse-beta evidence overclaims maturity, support, or provenance");
    return errors;
  }

  if (
    !exactKeys(environment, ["status", "python", "python_flint", "flint", "platform"]) ||
    environment["status"] !== "non_authoritative_candidate" ||
    typeof environment["python"] !== "string" ||
    !/^3\.12(?:\.|$)/.test(environment["python"]) ||
    environment["python_flint"] !== "0.9.0" ||
    environment["flint"] !== "3.6.0" ||
    typeof environment["platform"] !== "string" ||
    environment["platform"].length === 0
  ) {
    errors.push("environment does not contain the pinned candidate dependency identity");
  }
  if (evidence["environment_hash"] !== sha256(readFileSync(environmentPath))) {
    errors.push("environment hash does not bind the bundled environment");
  }
  if (
    evidence["table_content_hash"] !==
    sha256(readFileSync(path.join(bundlePath, "runtime-inverse-beta-table.json")))
  ) {
    errors.push("table content hash does not bind the generated table");
  }
  if (
    !isRecord(evidence["source_hashes"]) ||
    !exactKeys(evidence["source_hashes"], Object.keys(sourceMappings))
  ) {
    errors.push("source hash set differs from the closed source-copy surface");
  } else {
    for (const copyName of Object.keys(sourceMappings)) {
      if (
        evidence["source_hashes"][copyName] !==
        sha256(readFileSync(path.join(bundlePath, copyName)))
      ) {
        errors.push(`${copyName}: evidence source hash mismatch`);
      }
    }
  }

  const tableEntries = table["entries"];
  const evidenceEntries = evidence["entries"];
  if (tableEntries.length !== DF_MAX || evidenceEntries.length !== DF_MAX) {
    errors.push("table and evidence must cover every integer df from 1 through 200 exactly once");
    return errors;
  }

  const piBounds = machinPiInterval();
  const coefficients = recurrenceCoefficients();
  for (let index = 0; index < DF_MAX; index += 1) {
    const df = index + 1;
    const tableEntry = tableEntries[index];
    const evidenceEntry = evidenceEntries[index];
    if (
      !isRecord(tableEntry) ||
      !exactKeys(tableEntry, ["degrees_of_freedom", "inverse_beta_binary64_hex"]) ||
      tableEntry["degrees_of_freedom"] !== df ||
      typeof tableEntry["inverse_beta_binary64_hex"] !== "string" ||
      !HEX64.test(tableEntry["inverse_beta_binary64_hex"])
    ) {
      errors.push(`df=${df}: table entry is invalid or out of order`);
      continue;
    }
    if (
      !isRecord(evidenceEntry) ||
      !exactKeys(evidenceEntry, [
        "degrees_of_freedom",
        "definition",
        "arb_primary",
        "exact_secondary",
        "projection",
        "secondary_contained_in_primary",
      ]) ||
      evidenceEntry["degrees_of_freedom"] !== df ||
      evidenceEntry["definition"] !== "one_over_beta_df_over_two_one_half" ||
      evidenceEntry["secondary_contained_in_primary"] !== true ||
      !isRecord(evidenceEntry["arb_primary"]) ||
      !exactKeys(evidenceEntry["arb_primary"], ["method", "enclosure", "precision_history_bits"]) ||
      evidenceEntry["arb_primary"]["method"] !== "arb_gamma_ratio_exact_integer_df" ||
      !isRecord(evidenceEntry["exact_secondary"]) ||
      !exactKeys(evidenceEntry["exact_secondary"], [
        "method",
        "rational_coefficient",
        "pi_enclosure",
        "machin_terms",
        "inverse_beta_enclosure",
      ])
    ) {
      errors.push(`df=${df}: evidence entry contains missing, undeclared, or invalid fields`);
      continue;
    }

    const coefficient = coefficients.get(df);
    if (coefficient === undefined) throw new Error("missing recurrence coefficient");
    const secondary = evidenceEntry["exact_secondary"];
    let expectedSecondary: [Rational, Rational];
    if (df % 2 === 0) {
      expectedSecondary = [coefficient, coefficient];
      if (
        secondary["method"] !== "exact_rational_recurrence_from_df2" ||
        secondary["pi_enclosure"] !== null ||
        secondary["machin_terms"] !== null
      ) {
        errors.push(`df=${df}: even-df secondary method is invalid`);
      }
    } else {
      expectedSecondary = [divide(coefficient, piBounds[1]), divide(coefficient, piBounds[0])];
      if (
        secondary["method"] !== "machin_pi_interval_and_exact_rational_recurrence_from_df1" ||
        !equalInterval(secondary["pi_enclosure"], piBounds) ||
        !isRecord(secondary["machin_terms"]) ||
        !exactKeys(secondary["machin_terms"], ["one_over_five", "one_over_239"]) ||
        secondary["machin_terms"]["one_over_five"] !== MACHIN_TERMS ||
        secondary["machin_terms"]["one_over_239"] !== MACHIN_TERMS
      ) {
        errors.push(`df=${df}: odd-df Machin certificate is invalid`);
      }
    }
    if (
      secondary["rational_coefficient"] !== text(coefficient) ||
      !equalInterval(secondary["inverse_beta_enclosure"], expectedSecondary)
    ) {
      errors.push(`df=${df}: exact recurrence certificate is invalid`);
    }

    const primary = validateProjection(
      `df=${df} primary`,
      evidenceEntry["arb_primary"]["enclosure"],
      evidenceEntry["projection"],
      errors,
    );
    const projection = evidenceEntry["projection"];
    if (
      !isRecord(projection) ||
      projection["binary64_hex"] !== tableEntry["inverse_beta_binary64_hex"]
    ) {
      errors.push(`df=${df}: table bits differ from the certified projection`);
    }
    const history = evidenceEntry["arb_primary"]["precision_history_bits"];
    if (
      !Array.isArray(history) ||
      history.length === 0 ||
      history[0] !== 128 ||
      history.some(
        (value, historyIndex) =>
          !Number.isInteger(value) ||
          value > 8192 ||
          (historyIndex > 0 && value !== (history[historyIndex - 1] as number) * 2),
      )
    ) {
      errors.push(`df=${df}: Arb precision history is invalid`);
    }
    if (
      primary === undefined ||
      compare(primary[0], expectedSecondary[0]) > 0 ||
      compare(expectedSecondary[1], primary[1]) > 0
    ) {
      errors.push(`df=${df}: exact secondary enclosure is not contained in the primary`);
    }
  }
  return errors;
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && path.resolve(invokedPath) === fileURLToPath(import.meta.url)) {
  const bundleArgument = process.argv[2];
  const expectedCommit = process.argv[3];
  if (bundleArgument === undefined || expectedCommit === undefined) {
    process.stderr.write(
      "usage: validate-paired-t-runtime-inverse-beta-table-evidence <bundle> <commit>\n",
    );
    process.exitCode = 2;
  } else {
    const errors = validatePairedTRuntimeInverseBetaTableEvidenceBundle(
      path.resolve(bundleArgument),
      expectedCommit,
    );
    if (errors.length > 0) {
      process.stderr.write(`${errors.join("\n")}\n`);
      process.exitCode = 1;
    } else {
      process.stdout.write("paired-t runtime inverse-beta table evidence bundle: valid\n");
    }
  }
}
