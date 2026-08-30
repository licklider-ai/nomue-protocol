/** Validate a generated, non-authoritative paired-t runtime-series evidence bundle. */

import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  binary64Hex,
  type CandidateProbabilityProjection,
} from "./paired-t-numerical-contract-candidate.js";
import { evaluatePairedTRuntimeSeriesCandidate } from "./paired-t-runtime-series-candidate.js";
import {
  evaluatePairedTTruthErrorSupportCandidate,
  validatePairedTTruthErrorSupportCheckpoint,
  type PairedTTruthErrorSupportCheckpoint,
} from "./paired-t-truth-error-support-candidate.js";

const SCOPE = "explicit_runtime_series_evaluation_corpus_not_protocol_support";
const COMMIT = /^[0-9a-f]{40}$/;
const HEX64 = /^[0-9a-f]{16}$/;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const EXPECTED_FILES = [
  "MANIFEST.sha256",
  "cases.json",
  "environment.json",
  "generator.py",
  "runtime-series-candidate.json",
  "runtime-series-candidate.ts",
  "runtime-series-evidence.json",
  "truth-error-support-candidate.json",
  "truth-error-support-candidate.ts",
] as const;
const CASE_MANIFEST_KEYS = [
  "status",
  "scope",
  "degrees_of_freedom_evaluation_target",
  "contiguous_evaluation_coverage_claimed",
  "supported_degrees_of_freedom_max",
  "runtime_support_claimed",
  "cases",
] as const;
const CASE_INPUT_KEYS = ["case_id", "degrees_of_freedom", "test_statistic_binary64_hex"] as const;
const EVIDENCE_KEYS = [
  "status",
  "scope",
  "generator_commit",
  "runtime_support_claimed",
  "correct_rounding_runtime_claimed",
  "contiguous_evaluation_coverage_claimed",
  "supported_degrees_of_freedom_max",
  "case_count",
  "source_hashes",
  "environment_hash",
  "cases",
] as const;
const EVIDENCE_CASE_KEYS = [
  "case_id",
  "input",
  "inverse_beta_constant",
  "binary64_graph_mirror",
  "mathematical_truth",
] as const;
const EVIDENCE_INPUT_KEYS = [
  "degrees_of_freedom",
  "test_statistic_binary64_hex",
  "test_statistic_exact",
] as const;
const INVERSE_BETA_KEYS = ["definition", "arb_enclosure", "projection"] as const;
const INTERVAL_KEYS = ["lower", "upper"] as const;
const PROJECTION_KEYS = ["binary64_hex", "cell_lower", "cell_upper", "strict_containment"] as const;
const GRAPH_KEYS = [
  "branch",
  "p_value_binary64_hex",
  "projection_class",
  "iterations",
  "iteration_cap",
  "positive_series_remainder_contribution_candidate_binary64_hex",
  "runtime_support_claimed",
  "correct_rounding_claimed",
] as const;
const TRUTH_KEYS = [
  "method",
  "enclosure",
  "projection",
  "precision_history_bits",
  "positive_series_truncation_enclosure",
  "truncation_interval_overlaps_oracle",
  "graph_to_correctly_rounded_truth_ulp_distance",
] as const;
const ENVIRONMENT_KEYS = ["status", "python", "python_flint", "flint", "platform"] as const;

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

interface RuntimeSeriesCaseManifest {
  status: string;
  scope: string;
  degrees_of_freedom_evaluation_target: number;
  contiguous_evaluation_coverage_claimed: false;
  supported_degrees_of_freedom_max: null;
  runtime_support_claimed: false;
  cases: Array<{
    case_id: string;
    degrees_of_freedom: number;
    test_statistic_binary64_hex: string;
  }>;
}

interface RuntimeSeriesEvidence {
  status: string;
  scope: string;
  generator_commit: string;
  runtime_support_claimed: false;
  correct_rounding_runtime_claimed: false;
  contiguous_evaluation_coverage_claimed: false;
  supported_degrees_of_freedom_max: null;
  case_count: number;
  source_hashes: Record<string, string>;
  environment_hash: string;
  cases: Array<{
    case_id: string;
    input: {
      degrees_of_freedom: number;
      test_statistic_binary64_hex: string;
      test_statistic_exact: string;
    };
    inverse_beta_constant: {
      definition: string;
      arb_enclosure: { lower: string; upper: string };
      projection: Projection;
    };
    binary64_graph_mirror: {
      branch: string;
      p_value_binary64_hex: string;
      projection_class: string;
      iterations: number;
      iteration_cap: number;
      positive_series_remainder_contribution_candidate_binary64_hex: string;
      runtime_support_claimed: false;
      correct_rounding_claimed: false;
    };
    mathematical_truth: {
      method: string;
      enclosure: { lower: string; upper: string };
      projection: Projection;
      precision_history_bits: number[];
      positive_series_truncation_enclosure: { lower: string; upper: string };
      truncation_interval_overlaps_oracle: true;
      graph_to_correctly_rounded_truth_ulp_distance: number;
    };
  }>;
}

interface Projection {
  binary64_hex: string;
  cell_lower: string;
  cell_upper: string;
  strict_containment: true;
}

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function sha256(value: Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function parseJson<T>(filePath: string, errors: string[]): T | undefined {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch {
    errors.push(`${path.basename(filePath)}: not valid JSON`);
    return undefined;
  }
}

function exactKeys(actual: object, expected: readonly string[]): boolean {
  const left = Object.keys(actual).sort();
  const right = [...expected].sort();
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}

function parseRational(value: string): Rational | undefined {
  const match = /^(-?(?:0|[1-9][0-9]*))\/([1-9][0-9]*)$/.exec(value);
  if (match === null) return undefined;
  const numeratorText = match[1];
  const denominatorText = match[2];
  if (numeratorText === undefined || denominatorText === undefined) return undefined;
  return { numerator: BigInt(numeratorText), denominator: BigInt(denominatorText) };
}

function compare(first: Rational, second: Rational): number {
  const difference = first.numerator * second.denominator - second.numerator * first.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function add(first: Rational, second: Rational): Rational {
  return {
    numerator: first.numerator * second.denominator + second.numerator * first.denominator,
    denominator: first.denominator * second.denominator,
  };
}

function halve(value: Rational): Rational {
  return { numerator: value.numerator, denominator: value.denominator * 2n };
}

function binary64BitsToRational(bits: bigint): Rational | undefined {
  const negative = bits >> 63n === 1n;
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  const fractionBits = bits & ((1n << 52n) - 1n);
  if (exponentBits === 0x7ff) return undefined;
  if (exponentBits === 0 && fractionBits === 0n) return { numerator: 0n, denominator: 1n };
  const significand = exponentBits === 0 ? fractionBits : (1n << 52n) | fractionBits;
  const exponent = exponentBits === 0 ? -1074 : exponentBits - 1023 - 52;
  const signedSignificand = negative ? -significand : significand;
  if (exponent >= 0) {
    return { numerator: signedSignificand << BigInt(exponent), denominator: 1n };
  }
  return { numerator: signedSignificand, denominator: 1n << BigInt(-exponent) };
}

function roundingCellFromHex(hex: string): [Rational, Rational] | undefined {
  if (!HEX64.test(hex)) return undefined;
  const bits = BigInt(`0x${hex}`);
  if (bits >> 63n === 1n || bits >= 0x7ff0_0000_0000_0000n) return undefined;
  const previousBits = bits === 0n ? 0x8000_0000_0000_0001n : bits - 1n;
  const nextBits = bits + 1n;
  const previous = binary64BitsToRational(previousBits);
  const value = binary64BitsToRational(bits);
  const next = binary64BitsToRational(nextBits);
  if (previous === undefined || value === undefined || next === undefined) return undefined;
  return [halve(add(previous, value)), halve(add(value, next))];
}

function interval(value: { lower: string; upper: string }): [Rational, Rational] | undefined {
  const lower = parseRational(value.lower);
  const upper = parseRational(value.upper);
  if (lower === undefined || upper === undefined || compare(lower, upper) > 0) return undefined;
  return [lower, upper];
}

function floatFromHex(value: string): number | undefined {
  if (!HEX64.test(value)) return undefined;
  const buffer = new ArrayBuffer(8);
  new DataView(buffer).setBigUint64(0, BigInt(`0x${value}`), false);
  const result = new DataView(buffer).getFloat64(0, false);
  return Number.isFinite(result) ? result : undefined;
}

function validateProjection(
  label: string,
  enclosureValue: { lower: string; upper: string },
  projection: Projection,
  probability: boolean,
  errors: string[],
): void {
  const enclosure = interval(enclosureValue);
  const lowerCell = parseRational(projection.cell_lower);
  const upperCell = parseRational(projection.cell_upper);
  const projected = floatFromHex(projection.binary64_hex);
  const expectedCell = roundingCellFromHex(projection.binary64_hex);
  if (
    !exactKeys(enclosureValue, INTERVAL_KEYS) ||
    !exactKeys(projection, PROJECTION_KEYS) ||
    enclosure === undefined ||
    lowerCell === undefined ||
    upperCell === undefined ||
    projected === undefined ||
    (probability && (projected < 0 || projected > 1)) ||
    (!probability && projected <= 0) ||
    expectedCell === undefined ||
    compare(lowerCell, expectedCell[0]) !== 0 ||
    compare(upperCell, expectedCell[1]) !== 0 ||
    projection.strict_containment !== true ||
    compare(lowerCell, enclosure[0]) >= 0 ||
    compare(enclosure[1], upperCell) >= 0
  ) {
    errors.push(`${label}: enclosure is not strictly inside the declared binary64 cell`);
  }
}

function validateManifest(bundlePath: string, errors: string[]): void {
  const manifestPath = path.join(bundlePath, "MANIFEST.sha256");
  const declared = new Map<string, string>();
  for (const line of readFileSync(manifestPath, "utf8").trimEnd().split("\n")) {
    const match = /^([0-9a-f]{64})  ([A-Za-z0-9.-]+)$/.exec(line);
    if (match === null || match[1] === undefined || match[2] === undefined) {
      errors.push("manifest contains a malformed entry");
      continue;
    }
    if (declared.has(match[2])) errors.push(`manifest repeats ${match[2]}`);
    declared.set(match[2], `sha256:${match[1]}`);
  }
  const expectedManifestEntries = EXPECTED_FILES.filter((entry) => entry !== "MANIFEST.sha256");
  if (!exactKeys(Object.fromEntries(declared), expectedManifestEntries)) {
    errors.push("manifest file set differs from the closed bundle surface");
  }
  for (const [name, expectedHash] of declared) {
    const filePath = path.join(bundlePath, name);
    if (sha256(readFileSync(filePath)) !== expectedHash)
      errors.push(`${name}: manifest hash mismatch`);
  }
}

function expectedProjectionClass(value: string): CandidateProbabilityProjection | undefined {
  if (value === "zero") return "refuse_positive_tail_not_representable";
  if (value === "subnormal") return "refuse_positive_subnormal";
  if (value === "rounded_one") return "supported_rounded_one";
  if (value === "normal") return "supported_positive_normal";
  return undefined;
}

function preflightEvidenceBundle(bundlePath: unknown): string[] {
  if (typeof bundlePath !== "string" || bundlePath.length === 0) {
    return ["evidence bundle path must be a nonempty string"];
  }
  let root: ReturnType<typeof lstatSync>;
  try {
    root = lstatSync(bundlePath);
  } catch {
    return ["evidence bundle cannot be read"];
  }
  if (root.isSymbolicLink()) return ["evidence bundle root must not be a symlink"];
  if (!root.isDirectory()) return ["evidence bundle root must be a directory"];

  let entries: string[];
  try {
    entries = readdirSync(bundlePath).sort();
  } catch {
    return ["evidence bundle cannot be read"];
  }
  const errors: string[] = [];
  if (entries.join("\n") !== [...EXPECTED_FILES].sort().join("\n")) {
    errors.push("bundle file set differs from the closed evidence surface");
  }
  for (const entry of entries) {
    try {
      const file = lstatSync(path.join(bundlePath, entry));
      if (file.isSymbolicLink()) {
        errors.push(`${entry}: symlinks are not allowed in the evidence bundle`);
      } else if (!file.isFile()) {
        errors.push(`${entry}: evidence bundle entries must be regular files`);
      }
    } catch {
      errors.push(`${entry}: cannot be read`);
    }
  }
  return errors;
}

function validatePairedTRuntimeSeriesEvidenceBundleInternal(
  bundlePath: string,
  expectedCommit: string,
): string[] {
  const errors: string[] = [];
  if (!COMMIT.test(expectedCommit)) return ["expected commit is not a full lowercase git hash"];
  const entries = readdirSync(bundlePath).sort();
  if (entries.join("\n") !== [...EXPECTED_FILES].sort().join("\n")) {
    errors.push("bundle file set differs from the closed evidence surface");
  }
  for (const entry of entries) {
    if (lstatSync(path.join(bundlePath, entry)).isSymbolicLink()) {
      errors.push(`${entry}: symlinks are not allowed in the evidence bundle`);
    }
  }
  if (errors.length > 0) return errors;
  validateManifest(bundlePath, errors);

  const sourceMappings = {
    "generator.py": "tooling/r2-paired-t-runtime-series/generate_evidence.py",
    "cases.json": "tooling/r2-paired-t-runtime-series/cases.json",
    "runtime-series-candidate.ts": "tooling/src/spikes/paired-t-runtime-series-candidate.ts",
    "runtime-series-candidate.json":
      "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json",
    "truth-error-support-candidate.ts":
      "tooling/src/spikes/paired-t-truth-error-support-candidate.ts",
    "truth-error-support-candidate.json":
      "governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json",
  } as const;
  for (const [copyName, repositoryPath] of Object.entries(sourceMappings)) {
    const copy = readFileSync(path.join(bundlePath, copyName));
    const repositorySource = readFileSync(path.join(repositoryRoot, repositoryPath));
    if (!copy.equals(repositorySource))
      errors.push(`${copyName}: bundled source differs from repository`);
  }

  const manifest = parseJson<RuntimeSeriesCaseManifest>(
    path.join(bundlePath, "cases.json"),
    errors,
  );
  const evidence = parseJson<RuntimeSeriesEvidence>(
    path.join(bundlePath, "runtime-series-evidence.json"),
    errors,
  );
  const environmentPath = path.join(bundlePath, "environment.json");
  const environment = parseJson<Record<string, unknown>>(environmentPath, errors);
  const truthErrorSupportCheckpoint = parseJson<PairedTTruthErrorSupportCheckpoint>(
    path.join(bundlePath, "truth-error-support-candidate.json"),
    errors,
  );
  if (
    manifest === undefined ||
    evidence === undefined ||
    environment === undefined ||
    truthErrorSupportCheckpoint === undefined
  ) {
    return errors;
  }
  errors.push(...validatePairedTTruthErrorSupportCheckpoint(truthErrorSupportCheckpoint));
  if (!exactKeys(manifest, CASE_MANIFEST_KEYS)) {
    errors.push("case manifest keys are incomplete or contain an undeclared item");
  }
  if (!exactKeys(evidence, EVIDENCE_KEYS)) {
    errors.push("runtime-series evidence keys are incomplete or contain an undeclared item");
  }
  if (!exactKeys(environment, ENVIRONMENT_KEYS)) {
    errors.push("environment keys are incomplete or contain an undeclared item");
  }
  if (
    manifest.status !== "non_authoritative_candidate" ||
    manifest.scope !== SCOPE ||
    manifest.degrees_of_freedom_evaluation_target !== 200 ||
    manifest.contiguous_evaluation_coverage_claimed !== false ||
    manifest.supported_degrees_of_freedom_max !== null ||
    manifest.runtime_support_claimed !== false
  ) {
    errors.push("case manifest overclaims maturity or runtime support");
  }
  if (
    evidence.status !== "non_authoritative_candidate" ||
    evidence.scope !== SCOPE ||
    evidence.generator_commit !== expectedCommit ||
    evidence.runtime_support_claimed !== false ||
    evidence.correct_rounding_runtime_claimed !== false ||
    evidence.contiguous_evaluation_coverage_claimed !== false ||
    evidence.supported_degrees_of_freedom_max !== null
  ) {
    errors.push("runtime-series evidence overclaims maturity, support, or provenance");
  }
  if (
    environment["status"] !== "non_authoritative_candidate" ||
    environment["python_flint"] !== "0.9.0" ||
    typeof environment["flint"] !== "string"
  ) {
    errors.push("environment does not contain the pinned candidate dependency identity");
  }
  if (evidence.environment_hash !== sha256(readFileSync(environmentPath))) {
    errors.push("environment hash does not bind the bundled environment");
  }
  if (!exactKeys(evidence.source_hashes, Object.keys(sourceMappings))) {
    errors.push("source hash set differs from the closed source-copy surface");
  }
  for (const copyName of Object.keys(sourceMappings)) {
    if (
      evidence.source_hashes[copyName] !== sha256(readFileSync(path.join(bundlePath, copyName)))
    ) {
      errors.push(`${copyName}: evidence source hash mismatch`);
    }
  }
  if (
    evidence.case_count !== manifest.cases.length ||
    evidence.cases.length !== manifest.cases.length
  ) {
    errors.push("case counts do not agree across the evidence bundle");
  }
  const caseIdentifiers = manifest.cases.map((entry) => entry.case_id);
  if (new Set(caseIdentifiers).size !== caseIdentifiers.length) {
    errors.push("case manifest contains a duplicate case identifier");
  }

  let truthErrorSupportAccepted = 0;
  const truthErrorSupportRefusals = new Map<string, number>();
  let highErrorWitnessSeen = false;
  for (const [index, declaredCase] of manifest.cases.entries()) {
    if (!exactKeys(declaredCase, CASE_INPUT_KEYS)) {
      errors.push(`case ${index}: manifest case keys are incomplete or contain an undeclared item`);
    }
    const actualCase = evidence.cases[index];
    if (actualCase === undefined || actualCase.case_id !== declaredCase.case_id) {
      errors.push(`case ${index}: evidence order or identity differs from the manifest`);
      continue;
    }
    if (
      !exactKeys(actualCase, EVIDENCE_CASE_KEYS) ||
      !exactKeys(actualCase.input, EVIDENCE_INPUT_KEYS) ||
      !exactKeys(actualCase.inverse_beta_constant, INVERSE_BETA_KEYS) ||
      !exactKeys(actualCase.binary64_graph_mirror, GRAPH_KEYS) ||
      !exactKeys(actualCase.mathematical_truth, TRUTH_KEYS)
    ) {
      errors.push(`${declaredCase.case_id}: evidence case contains missing or undeclared keys`);
    }
    if (
      actualCase.input.degrees_of_freedom !== declaredCase.degrees_of_freedom ||
      actualCase.input.test_statistic_binary64_hex !== declaredCase.test_statistic_binary64_hex
    ) {
      errors.push(`${declaredCase.case_id}: evidence input differs from the manifest`);
    }
    const exactStatistic = parseRational(actualCase.input.test_statistic_exact);
    const statisticFromBits = HEX64.test(declaredCase.test_statistic_binary64_hex)
      ? binary64BitsToRational(BigInt(`0x${declaredCase.test_statistic_binary64_hex}`))
      : undefined;
    if (
      exactStatistic === undefined ||
      statisticFromBits === undefined ||
      compare(exactStatistic, statisticFromBits) !== 0
    ) {
      errors.push(`${declaredCase.case_id}: exact statistic is not bound to its binary64 bits`);
    }
    validateProjection(
      `${declaredCase.case_id} inverse beta`,
      actualCase.inverse_beta_constant.arb_enclosure,
      actualCase.inverse_beta_constant.projection,
      false,
      errors,
    );
    validateProjection(
      `${declaredCase.case_id} truth`,
      actualCase.mathematical_truth.enclosure,
      actualCase.mathematical_truth.projection,
      true,
      errors,
    );
    const oracle = interval(actualCase.mathematical_truth.enclosure);
    const truncation = interval(actualCase.mathematical_truth.positive_series_truncation_enclosure);
    if (
      oracle === undefined ||
      truncation === undefined ||
      compare(truncation[0], oracle[1]) > 0 ||
      compare(oracle[0], truncation[1]) > 0 ||
      actualCase.mathematical_truth.truncation_interval_overlaps_oracle !== true
    ) {
      errors.push(`${declaredCase.case_id}: truncation and oracle enclosures are disjoint`);
    }
    if (
      actualCase.inverse_beta_constant.definition !== "one_over_beta_df_over_two_one_half" ||
      actualCase.mathematical_truth.method !==
        "arb_regularized_incomplete_beta_exact_binary64_input" ||
      !Array.isArray(actualCase.mathematical_truth.precision_history_bits) ||
      actualCase.mathematical_truth.precision_history_bits.length === 0 ||
      actualCase.mathematical_truth.precision_history_bits.some(
        (entry) => !Number.isInteger(entry) || entry < 128 || entry > 8192,
      ) ||
      !Number.isSafeInteger(
        actualCase.mathematical_truth.graph_to_correctly_rounded_truth_ulp_distance,
      ) ||
      actualCase.mathematical_truth.graph_to_correctly_rounded_truth_ulp_distance < 0
    ) {
      errors.push(`${declaredCase.case_id}: oracle method or precision history is invalid`);
    }

    const statistic = floatFromHex(declaredCase.test_statistic_binary64_hex);
    const inverseBeta = floatFromHex(actualCase.inverse_beta_constant.projection.binary64_hex);
    if (statistic === undefined || inverseBeta === undefined) {
      errors.push(`${declaredCase.case_id}: candidate input hex is invalid`);
      continue;
    }
    const result = evaluatePairedTRuntimeSeriesCandidate({
      degreesOfFreedom: declaredCase.degrees_of_freedom,
      testStatistic: statistic,
      inverseBeta,
    });
    if (!result.ok) {
      errors.push(`${declaredCase.case_id}: TypeScript candidate refused its evidence case`);
      continue;
    }
    const graph = actualCase.binary64_graph_mirror;
    const expectedProjection = expectedProjectionClass(graph.projection_class);
    if (
      result.branch !== graph.branch ||
      result.pValueBinary64Hex !== graph.p_value_binary64_hex ||
      result.projection !== expectedProjection ||
      result.iterations !== graph.iterations ||
      result.iterationCap !== graph.iteration_cap ||
      binary64Hex(result.positiveSeriesRemainderContributionCandidate) !==
        graph.positive_series_remainder_contribution_candidate_binary64_hex ||
      result.runtimeSupportClaimed !== false ||
      result.correctRoundingClaimed !== false ||
      graph.runtime_support_claimed !== false ||
      graph.correct_rounding_claimed !== false
    ) {
      errors.push(`${declaredCase.case_id}: TypeScript graph differs from the Python mirror`);
    }
    const graphBits = BigInt(`0x${graph.p_value_binary64_hex}`);
    const truthBits = BigInt(`0x${actualCase.mathematical_truth.projection.binary64_hex}`);
    const ulpDistance = graphBits >= truthBits ? graphBits - truthBits : truthBits - graphBits;
    if (
      ulpDistance !==
      BigInt(actualCase.mathematical_truth.graph_to_correctly_rounded_truth_ulp_distance)
    ) {
      errors.push(`${declaredCase.case_id}: recorded ULP observation is inconsistent`);
    }
    const truthErrorSupport = evaluatePairedTTruthErrorSupportCandidate({
      degreesOfFreedom: declaredCase.degrees_of_freedom,
      testStatistic: statistic,
    });
    if (truthErrorSupport.ok) {
      truthErrorSupportAccepted += 1;
      if (ulpDistance > BigInt(truthErrorSupport.proof.candidateTruthErrorBoundUlp)) {
        errors.push(`${declaredCase.case_id}: certified truth error exceeds the candidate bound`);
      }
    } else {
      truthErrorSupportRefusals.set(
        truthErrorSupport.classification,
        (truthErrorSupportRefusals.get(truthErrorSupport.classification) ?? 0) + 1,
      );
    }
    if (declaredCase.case_id === "df197-high-error-scout-witness") {
      highErrorWitnessSeen = true;
      if (
        declaredCase.degrees_of_freedom !== 197 ||
        declaredCase.test_statistic_binary64_hex !== "4049333333333333" ||
        graph.p_value_binary64_hex !== "284f4ce6230625df" ||
        actualCase.mathematical_truth.projection.binary64_hex !== "284f4ce623062755" ||
        ulpDistance !== 374n ||
        !truthErrorSupport.ok ||
        truthErrorSupport.proof.candidateTruthErrorBoundUlp !== 2978
      ) {
        errors.push("df197-high-error-scout-witness: certified pointwise binding is invalid");
      }
    }
  }
  if (!highErrorWitnessSeen) {
    errors.push("runtime-series evidence is missing df197-high-error-scout-witness");
  }
  if (
    truthErrorSupportAccepted !== 16 ||
    truthErrorSupportRefusals.get("truth_error_proof_precondition_failed") !== 3 ||
    truthErrorSupportRefusals.get("projection_margin_not_established") !== 1 ||
    [...truthErrorSupportRefusals.values()].reduce((total, count) => total + count, 0) !== 4
  ) {
    errors.push(
      "truth-error support dispositions differ from the closed 20-case evaluation corpus",
    );
  }
  return errors;
}

export function validatePairedTRuntimeSeriesEvidenceBundle(
  bundlePath: unknown,
  expectedCommit: unknown,
): string[] {
  if (typeof expectedCommit !== "string" || !COMMIT.test(expectedCommit)) {
    return ["expected commit is not a full lowercase git hash"];
  }
  const preflightErrors = preflightEvidenceBundle(bundlePath);
  if (preflightErrors.length > 0) return preflightErrors;
  try {
    return validatePairedTRuntimeSeriesEvidenceBundleInternal(bundlePath as string, expectedCommit);
  } catch {
    return ["runtime-series evidence bundle cannot be read or is structurally invalid"];
  }
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && path.resolve(invokedPath) === fileURLToPath(import.meta.url)) {
  const bundleArgument = process.argv[2];
  const expectedCommit = process.argv[3];
  if (bundleArgument === undefined || expectedCommit === undefined) {
    process.stderr.write("usage: validate-paired-t-runtime-series-evidence <bundle> <commit>\n");
    process.exitCode = 2;
  } else {
    const errors = validatePairedTRuntimeSeriesEvidenceBundle(
      path.resolve(bundleArgument),
      expectedCommit,
    );
    if (errors.length > 0) {
      process.stderr.write(`${errors.join("\n")}\n`);
      process.exitCode = 1;
    } else {
      process.stdout.write("paired-t runtime-series evidence bundle: valid\n");
    }
  }
}
