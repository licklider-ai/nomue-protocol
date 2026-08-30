import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { evaluatePairedTRuntimeSeriesCandidate } from "./paired-t-runtime-series-candidate.js";
import {
  validatePairedTTruthBoundaryCandidate,
  type PairedTTruthBoundaryCandidate,
} from "./paired-t-truth-boundary-candidate.js";

const HEX64 = /^[0-9a-f]{16}$/u;
const COMMIT = /^[0-9a-f]{40}$/u;
const HASH = /^([0-9a-f]{64})  ([A-Za-z0-9._-]+)$/u;
const PYTHON_312 = /^3\.12\.[0-9]+$/u;
const SCOPE = "selected_df_projection_transition_search_not_protocol_support";
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const sourceMappings = {
  "truth-boundary-generator.py":
    "tooling/r2-paired-t-runtime-series/generate_truth_boundary_evidence.py",
  "truth-boundary-cases.json": "tooling/r2-paired-t-runtime-series/truth-boundary-cases.json",
  "runtime-series-generator.py": "tooling/r2-paired-t-runtime-series/generate_evidence.py",
  "runtime-series-candidate.ts": "tooling/src/spikes/paired-t-runtime-series-candidate.ts",
  "runtime-series-candidate.json":
    "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json",
  "truth-boundary-candidate.json":
    "governance/drafts/release-2-candidate/numerical/truth-boundary-candidate.json",
} as const;
const expectedFiles = new Set([
  "MANIFEST.sha256",
  "environment.json",
  "truth-boundary-evidence.json",
  ...Object.keys(sourceMappings),
]);
const TRANSITIONS = [
  ["rounded_one_to_positive_normal", "rounded_one", "normal"],
  ["positive_normal_to_positive_subnormal", "normal", "subnormal"],
  ["positive_subnormal_to_zero", "subnormal", "zero"],
] as const;
const DFS = [1, 2, 3, 10, 30, 100, 200] as const;
const MANIFEST_KEYS = [
  "status",
  "scope",
  "degrees_of_freedom",
  "transition_families",
  "contiguous_input_domain_claimed",
  "supported_degrees_of_freedom_max",
  "runtime_support_claimed",
] as const;
const ENVIRONMENT_KEYS = ["status", "python", "python_flint", "flint", "platform"] as const;
const EVIDENCE_KEYS = [
  "status",
  "scope",
  "generator_commit",
  "runtime_support_claimed",
  "global_truth_error_bound_selected",
  "global_truth_error_bound_ulp",
  "finite_corpus_maximum_is_a_guarantee",
  "projection_margin_runtime_activated",
  "supported_degrees_of_freedom_max",
  "transition_count",
  "pointwise_maximum_observed_ulp",
  "pointwise_maximum_witness_case_ids",
  "graph_truth_projection_class_disagreement_endpoint_count",
  "source_hashes",
  "environment_hash",
  "transitions",
] as const;
const TRANSITION_KEYS = [
  "case_id",
  "degrees_of_freedom",
  "transition_key",
  "input_statistics_are_adjacent_binary64",
  "inverse_beta_constant",
  "left",
  "right",
] as const;
const ENDPOINT_KEYS = [
  "test_statistic_binary64_hex",
  "test_statistic_exact",
  "truth",
  "graph",
  "graph_to_truth_ulp_distance",
  "graph_truth_projection_class_agree",
] as const;
const INVERSE_KEYS = ["definition", "arb_enclosure", "projection"] as const;
const INTERVAL_KEYS = ["lower", "upper"] as const;
const TRUTH_KEYS = [
  "method",
  "enclosure",
  "projection",
  "projection_class",
  "precision_history_bits",
] as const;
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

type Rational = { numerator: bigint; denominator: bigint };
type Projection = {
  binary64_hex: string;
  cell_lower: string;
  cell_upper: string;
  strict_containment: boolean;
};
type Endpoint = {
  test_statistic_binary64_hex: string;
  test_statistic_exact: string;
  truth: {
    method: string;
    enclosure: { lower: string; upper: string };
    projection: Projection;
    projection_class: string;
    precision_history_bits: number[];
  };
  graph: Record<string, unknown>;
  graph_to_truth_ulp_distance: number;
  graph_truth_projection_class_agree: boolean;
};

function sha256(value: Uint8Array): string {
  return createHash("sha256").update(value).digest("hex");
}

function exactKeys(value: object, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((entry, index) => entry === wanted[index]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJson<T>(filePath: string, errors: string[]): T | undefined {
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch {
    errors.push(`${path.basename(filePath)}: not valid JSON`);
    return undefined;
  }
}

function parseRational(value: unknown): Rational | undefined {
  if (typeof value !== "string" || !/^-?(0|[1-9][0-9]*)\/[1-9][0-9]*$/u.test(value))
    return undefined;
  const [numerator, denominator] = value.split("/");
  if (numerator === undefined || denominator === undefined) return undefined;
  return { numerator: BigInt(numerator), denominator: BigInt(denominator) };
}

function compare(first: Rational, second: Rational): number {
  const delta = first.numerator * second.denominator - second.numerator * first.denominator;
  return delta < 0n ? -1 : delta > 0n ? 1 : 0;
}

function add(first: Rational, second: Rational): Rational {
  return {
    numerator: first.numerator * second.denominator + second.numerator * first.denominator,
    denominator: first.denominator * second.denominator,
  };
}

function half(value: Rational): Rational {
  return { numerator: value.numerator, denominator: value.denominator * 2n };
}

function bitsToRational(bits: bigint): Rational | undefined {
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  const fractionBits = bits & 0x000f_ffff_ffff_ffffn;
  if (bits >> 63n !== 0n || exponentBits === 0x7ff) return undefined;
  if (exponentBits === 0 && fractionBits === 0n) return { numerator: 0n, denominator: 1n };
  const significand = exponentBits === 0 ? fractionBits : (1n << 52n) | fractionBits;
  const exponent = exponentBits === 0 ? -1074 : exponentBits - 1023 - 52;
  return exponent >= 0
    ? { numerator: significand << BigInt(exponent), denominator: 1n }
    : { numerator: significand, denominator: 1n << BigInt(-exponent) };
}

function roundingCell(binary64Hex: string): [Rational, Rational] | undefined {
  if (typeof binary64Hex !== "string" || !HEX64.test(binary64Hex)) return undefined;
  const bits = BigInt(`0x${binary64Hex}`);
  if (bits > 0x7fef_ffff_ffff_ffffn) return undefined;
  const value = bitsToRational(bits);
  const down =
    bits === 0n ? { numerator: -1n, denominator: 1n << 1074n } : bitsToRational(bits - 1n);
  const up = bitsToRational(bits + 1n);
  if (value === undefined || down === undefined || up === undefined) return undefined;
  return [half(add(down, value)), half(add(value, up))];
}

function equalRational(first: Rational, second: Rational): boolean {
  return compare(first, second) === 0;
}

function floatFromHex(value: string): number | undefined {
  if (typeof value !== "string" || !HEX64.test(value)) return undefined;
  const buffer = Buffer.from(value, "hex");
  const result = buffer.readDoubleBE(0);
  return Number.isFinite(result) ? result : undefined;
}

function floatToHex(value: number): string {
  const buffer = Buffer.allocUnsafe(8);
  buffer.writeDoubleBE(value, 0);
  return buffer.toString("hex");
}

function projectionClass(value: number): string {
  if (value === 0) return "zero";
  if (value < 2 ** -1022) return "subnormal";
  if (value === 1) return "rounded_one";
  return "normal";
}

function validateEnclosureProjection(
  label: string,
  enclosure: { lower: string; upper: string },
  projection: Projection,
  errors: string[],
): number | undefined {
  const enclosureLower = parseRational(enclosure.lower);
  const enclosureUpper = parseRational(enclosure.upper);
  const cellLower = parseRational(projection.cell_lower);
  const cellUpper = parseRational(projection.cell_upper);
  const expectedCell = roundingCell(projection.binary64_hex);
  const projected = floatFromHex(projection.binary64_hex);
  if (
    enclosureLower === undefined ||
    enclosureUpper === undefined ||
    cellLower === undefined ||
    cellUpper === undefined ||
    expectedCell === undefined ||
    projected === undefined ||
    projection.strict_containment !== true ||
    !equalRational(cellLower, expectedCell[0]) ||
    !equalRational(cellUpper, expectedCell[1]) ||
    compare(cellLower, enclosureLower) >= 0 ||
    compare(enclosureUpper, cellUpper) >= 0 ||
    compare(enclosureLower, enclosureUpper) > 0
  ) {
    errors.push(`${label}: enclosure or projection cell is invalid`);
    return undefined;
  }
  return projected;
}

function validPrecisionHistory(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (entry, index) =>
        Number.isInteger(entry) && entry === 128 * 2 ** index && entry >= 128 && entry <= 8192,
    )
  );
}

function validateTruthProjection(
  label: string,
  truth: Endpoint["truth"],
  errors: string[],
): number | undefined {
  const projected = validateEnclosureProjection(label, truth.enclosure, truth.projection, errors);
  if (projected === undefined) return undefined;
  if (
    projected > 1 ||
    truth.projection_class !== projectionClass(projected) ||
    truth.method !== "arb_regularized_incomplete_beta_exact_binary64_input" ||
    !validPrecisionHistory(truth.precision_history_bits)
  ) {
    errors.push(`${label}: truth method, class, or precision history is invalid`);
  }
  return projected;
}

function validateEndpoint(
  label: string,
  df: number,
  endpoint: Endpoint,
  inverseBeta: number,
  expectedTruthClass: string,
  errors: string[],
): { distance: number; disagreement: boolean } | undefined {
  const truthProjection = validateTruthProjection(label, endpoint.truth, errors);
  const statistic = floatFromHex(endpoint.test_statistic_binary64_hex);
  const exactStatistic = parseRational(endpoint.test_statistic_exact);
  const lifted = HEX64.test(endpoint.test_statistic_binary64_hex)
    ? bitsToRational(BigInt(`0x${endpoint.test_statistic_binary64_hex}`))
    : undefined;
  if (
    truthProjection === undefined ||
    statistic === undefined ||
    exactStatistic === undefined ||
    lifted === undefined ||
    !equalRational(exactStatistic, lifted) ||
    endpoint.truth.projection_class !== expectedTruthClass
  ) {
    errors.push(`${label}: statistic binding or transition class is invalid`);
    return undefined;
  }
  const result = evaluatePairedTRuntimeSeriesCandidate({
    degreesOfFreedom: df,
    testStatistic: statistic,
    inverseBeta,
  });
  if (!result.ok) {
    errors.push(`${label}: TypeScript graph refused a boundary input`);
    return undefined;
  }
  const graph = endpoint.graph;
  if (
    result.branch !== graph["branch"] ||
    result.pValueBinary64Hex !== graph["p_value_binary64_hex"] ||
    projectionClass(result.pValue) !== graph["projection_class"] ||
    result.iterations !== graph["iterations"] ||
    result.iterationCap !== graph["iteration_cap"] ||
    floatToHex(result.positiveSeriesRemainderContributionCandidate) !==
      graph["positive_series_remainder_contribution_candidate_binary64_hex"] ||
    graph["runtime_support_claimed"] !== false ||
    graph["correct_rounding_claimed"] !== false
  ) {
    errors.push(`${label}: TypeScript graph differs from the evidence mirror`);
  }
  const graphHex = graph["p_value_binary64_hex"];
  const truthHex = endpoint.truth.projection.binary64_hex;
  if (
    typeof graphHex !== "string" ||
    !HEX64.test(graphHex) ||
    typeof truthHex !== "string" ||
    !HEX64.test(truthHex)
  ) {
    errors.push(`${label}: graph projection is not binary64 hex`);
    return undefined;
  }
  const distance = Number(
    BigInt(`0x${graphHex}`) >= BigInt(`0x${truthHex}`)
      ? BigInt(`0x${graphHex}`) - BigInt(`0x${truthHex}`)
      : BigInt(`0x${truthHex}`) - BigInt(`0x${graphHex}`),
  );
  const disagreement = graph["projection_class"] !== endpoint.truth.projection_class;
  if (
    !Number.isSafeInteger(distance) ||
    endpoint.graph_to_truth_ulp_distance !== distance ||
    endpoint.graph_truth_projection_class_agree !== !disagreement
  ) {
    errors.push(`${label}: pointwise error or class agreement is inconsistent`);
  }
  return { distance, disagreement };
}

export function validatePairedTTruthBoundaryEvidenceBundle(
  bundlePath: string,
  expectedCommit: string,
): string[] {
  const errors: string[] = [];
  if (!COMMIT.test(expectedCommit) || expectedCommit === "0".repeat(40)) {
    return ["expected commit must be a nonzero full lowercase SHA"];
  }
  const entries = readdirSync(bundlePath);
  if (entries.some((entry) => lstatSync(path.join(bundlePath, entry)).isSymbolicLink())) {
    errors.push("bundle must not contain symlinks");
  }
  if (entries.length !== expectedFiles.size || entries.some((entry) => !expectedFiles.has(entry))) {
    return [...errors, "bundle file set differs from the closed truth-boundary surface"];
  }
  const manifestLines = readFileSync(path.join(bundlePath, "MANIFEST.sha256"), "utf8")
    .trimEnd()
    .split("\n");
  const seen = new Set<string>();
  for (const line of manifestLines) {
    const match = HASH.exec(line);
    if (match === null || seen.has(match[2] ?? "")) {
      errors.push("manifest contains a malformed or duplicate entry");
      continue;
    }
    const [, expectedHash = "", name = ""] = match;
    seen.add(name);
    if (!expectedFiles.has(name) || name === "MANIFEST.sha256") {
      errors.push("manifest names an undeclared file");
    } else if (sha256(readFileSync(path.join(bundlePath, name))) !== expectedHash) {
      errors.push(`${name}: manifest hash mismatch`);
    }
  }
  const expectedManifestNames = [...expectedFiles].filter((name) => name !== "MANIFEST.sha256");
  if (
    seen.size !== expectedManifestNames.length ||
    expectedManifestNames.some((name) => !seen.has(name))
  ) {
    errors.push("manifest does not bind every truth-boundary bundle file");
  }

  for (const [copyName, repositoryPath] of Object.entries(sourceMappings)) {
    const repoFile = path.join(repositoryRoot, repositoryPath);
    if (readFileSync(path.join(bundlePath, copyName)).compare(readFileSync(repoFile)) !== 0) {
      errors.push(`${copyName}: bundled source differs from repository`);
    }
  }

  const manifest = parseJson<Record<string, unknown>>(
    path.join(bundlePath, "truth-boundary-cases.json"),
    errors,
  );
  const environment = parseJson<Record<string, unknown>>(
    path.join(bundlePath, "environment.json"),
    errors,
  );
  const candidate = parseJson<PairedTTruthBoundaryCandidate>(
    path.join(bundlePath, "truth-boundary-candidate.json"),
    errors,
  );
  const evidence = parseJson<Record<string, unknown>>(
    path.join(bundlePath, "truth-boundary-evidence.json"),
    errors,
  );
  if (
    manifest === undefined ||
    environment === undefined ||
    candidate === undefined ||
    evidence === undefined
  ) {
    return errors;
  }
  errors.push(...validatePairedTTruthBoundaryCandidate(candidate));
  if (!exactKeys(manifest, MANIFEST_KEYS)) {
    errors.push("truth-boundary manifest keys are incomplete or contain an undeclared item");
  }
  if (!exactKeys(evidence, EVIDENCE_KEYS)) {
    errors.push("truth-boundary evidence keys are incomplete or contain an undeclared item");
  }
  if (
    !exactKeys(environment, ENVIRONMENT_KEYS) ||
    environment["status"] !== "non_authoritative_candidate" ||
    typeof environment["python"] !== "string" ||
    !PYTHON_312.test(environment["python"]) ||
    environment["python_flint"] !== "0.9.0" ||
    environment["flint"] !== "3.6.0" ||
    typeof environment["platform"] !== "string" ||
    environment["platform"].length === 0
  ) {
    errors.push("environment does not contain the pinned candidate dependency identity");
  }
  if (
    evidence["status"] !== "non_authoritative_candidate" ||
    evidence["scope"] !== SCOPE ||
    evidence["generator_commit"] !== expectedCommit ||
    evidence["runtime_support_claimed"] !== false ||
    evidence["global_truth_error_bound_selected"] !== false ||
    evidence["global_truth_error_bound_ulp"] !== null ||
    evidence["finite_corpus_maximum_is_a_guarantee"] !== false ||
    evidence["projection_margin_runtime_activated"] !== false ||
    evidence["supported_degrees_of_freedom_max"] !== null
  ) {
    errors.push("truth-boundary evidence overclaims closure, support, or provenance");
  }
  if (
    evidence["environment_hash"] !==
    `sha256:${sha256(readFileSync(path.join(bundlePath, "environment.json")))}`
  ) {
    errors.push("environment hash does not bind the bundled environment");
  }
  const sourceHashes = evidence["source_hashes"] as Record<string, unknown> | undefined;
  if (sourceHashes === undefined || !exactKeys(sourceHashes, Object.keys(sourceMappings))) {
    errors.push("source hash set differs from the closed source-copy surface");
  } else {
    for (const name of Object.keys(sourceMappings)) {
      if (sourceHashes[name] !== `sha256:${sha256(readFileSync(path.join(bundlePath, name)))}`) {
        errors.push(`${name}: evidence source hash mismatch`);
      }
    }
  }

  const families = manifest["transition_families"] as Array<Record<string, unknown>> | undefined;
  const dfs = manifest["degrees_of_freedom"] as number[] | undefined;
  const transitions = evidence["transitions"] as Array<Record<string, unknown>> | undefined;
  if (
    manifest["status"] !== "non_authoritative_candidate" ||
    manifest["scope"] !== SCOPE ||
    manifest["contiguous_input_domain_claimed"] !== false ||
    manifest["supported_degrees_of_freedom_max"] !== null ||
    manifest["runtime_support_claimed"] !== false ||
    JSON.stringify(dfs) !== JSON.stringify(DFS) ||
    !Array.isArray(families) ||
    !Array.isArray(transitions)
  ) {
    return [...errors, "truth-boundary manifest or transition evidence is invalid"];
  }
  const expectedIdentities: Array<[string, number, string, string]> = [];
  for (const df of DFS) {
    for (const [key, leftClass, rightClass] of TRANSITIONS) {
      if (df === 1 && key === "positive_subnormal_to_zero") continue;
      expectedIdentities.push([`df${df}-${key}`, df, leftClass, rightClass]);
    }
  }
  if (
    transitions.length !== expectedIdentities.length ||
    evidence["transition_count"] !== transitions.length
  ) {
    errors.push("transition count differs from the closed boundary seed");
  }
  let maximum = 0;
  let witnesses: string[] = [];
  let disagreements = 0;
  for (const [index, expected] of expectedIdentities.entries()) {
    const transition = transitions[index];
    if (!isRecord(transition)) {
      errors.push(`transition ${index}: identity or adjacency is invalid`);
      continue;
    }
    const [caseId, df, leftClass, rightClass] = expected;
    const leftValue = transition["left"];
    const rightValue = transition["right"];
    if (!isRecord(leftValue) || !isRecord(rightValue)) {
      errors.push(`transition ${index}: identity or adjacency is invalid`);
      continue;
    }
    const left = leftValue as unknown as Endpoint;
    const right = rightValue as unknown as Endpoint;
    const leftTruth = left.truth;
    const rightTruth = right.truth;
    if (
      !isRecord(leftTruth) ||
      !isRecord(rightTruth) ||
      !isRecord(leftTruth.enclosure) ||
      !isRecord(rightTruth.enclosure) ||
      !isRecord(leftTruth.projection) ||
      !isRecord(rightTruth.projection) ||
      !isRecord(left.graph) ||
      !isRecord(right.graph)
    ) {
      errors.push(`transition ${index}: endpoint structure is invalid`);
      continue;
    }
    if (
      !exactKeys(transition, TRANSITION_KEYS) ||
      !exactKeys(left, ENDPOINT_KEYS) ||
      !exactKeys(right, ENDPOINT_KEYS) ||
      !exactKeys(leftTruth, TRUTH_KEYS) ||
      !exactKeys(rightTruth, TRUTH_KEYS) ||
      !exactKeys(leftTruth.enclosure, INTERVAL_KEYS) ||
      !exactKeys(rightTruth.enclosure, INTERVAL_KEYS) ||
      !exactKeys(leftTruth.projection, PROJECTION_KEYS) ||
      !exactKeys(rightTruth.projection, PROJECTION_KEYS) ||
      !exactKeys(left.graph, GRAPH_KEYS) ||
      !exactKeys(right.graph, GRAPH_KEYS) ||
      transition["case_id"] !== caseId ||
      transition["degrees_of_freedom"] !== df ||
      transition["transition_key"] !== caseId.slice(`df${df}-`.length) ||
      transition["input_statistics_are_adjacent_binary64"] !== true
    ) {
      errors.push(`transition ${index}: identity or adjacency is invalid`);
      continue;
    }
    const inverseValue = transition["inverse_beta_constant"];
    if (!isRecord(inverseValue)) {
      errors.push(`${caseId}: inverse-beta binding is invalid`);
      continue;
    }
    const inverse = inverseValue;
    const inverseEnclosure = inverse["arb_enclosure"];
    const inverseProjectionValue = inverse["projection"];
    if (
      !exactKeys(inverse, INVERSE_KEYS) ||
      !isRecord(inverseEnclosure) ||
      !exactKeys(inverseEnclosure, INTERVAL_KEYS) ||
      !isRecord(inverseProjectionValue) ||
      !exactKeys(inverseProjectionValue, PROJECTION_KEYS) ||
      inverse["definition"] !== "one_over_beta_df_over_two_one_half"
    ) {
      errors.push(`${caseId}: inverse-beta binding is invalid`);
      continue;
    }
    const inverseProjection = inverseProjectionValue as unknown as Projection;
    const inverseBeta = validateEnclosureProjection(
      `${caseId} inverse beta`,
      inverseEnclosure as { lower: string; upper: string },
      inverseProjection,
      errors,
    );
    if (inverseBeta === undefined || inverseBeta <= 0) {
      errors.push(`${caseId}: inverse-beta projection is not positive and certified`);
      continue;
    }
    if (
      BigInt(`0x${right.test_statistic_binary64_hex}`) !==
      BigInt(`0x${left.test_statistic_binary64_hex}`) + 1n
    ) {
      errors.push(`${caseId}: boundary statistics are not adjacent`);
    }
    for (const [side, endpoint, expectedClass] of [
      ["left", left, leftClass],
      ["right", right, rightClass],
    ] as const) {
      const result = validateEndpoint(
        `${caseId} ${side}`,
        df,
        endpoint,
        inverseBeta,
        expectedClass,
        errors,
      );
      if (result === undefined) continue;
      if (result.distance > maximum) {
        maximum = result.distance;
        witnesses = [caseId];
      } else if (result.distance === maximum && !witnesses.includes(caseId)) {
        witnesses.push(caseId);
      }
      if (result.disagreement) disagreements += 1;
    }
  }
  if (
    evidence["pointwise_maximum_observed_ulp"] !== maximum ||
    JSON.stringify(evidence["pointwise_maximum_witness_case_ids"]) !== JSON.stringify(witnesses) ||
    evidence["graph_truth_projection_class_disagreement_endpoint_count"] !== disagreements
  ) {
    errors.push("aggregate pointwise observations do not match transition evidence");
  }
  return errors;
}

const invokedPath = process.argv[1];
if (invokedPath !== undefined && path.resolve(invokedPath) === fileURLToPath(import.meta.url)) {
  const bundle = process.argv[2];
  const commit = process.argv[3];
  if (bundle === undefined || commit === undefined) {
    process.stderr.write("usage: validate-paired-t-truth-boundary-evidence <bundle> <commit>\n");
    process.exitCode = 2;
  } else {
    const errors = validatePairedTTruthBoundaryEvidenceBundle(path.resolve(bundle), commit);
    if (errors.length > 0) {
      process.stderr.write(`${errors.join("\n")}\n`);
      process.exitCode = 1;
    } else {
      process.stdout.write("paired-t truth-boundary evidence bundle: valid\n");
    }
  }
}
