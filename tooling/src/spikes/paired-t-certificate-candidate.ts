/**
 * Non-authoritative structural checks for Release 2 paired-t oracle evidence.
 *
 * This module does not calculate a Student-t probability or critical value. It
 * rejects incomplete or internally inconsistent certificate bundles before an
 * external Arb/FLINT run can be considered as R2-D5 decision input.
 */

interface Rational {
  numerator: bigint;
  denominator: bigint;
}

export interface ExactIntervalCandidate {
  lower: string;
  upper: string;
}

interface CertificateProvenanceCandidate {
  generator_commit: string;
  generator_sha256: string;
  environment_sha256: string;
  source_output_sha256: string;
}

interface EscalationCandidate {
  precision_bits_history: number[];
  precision_bits_final: number;
  precision_bits_ceiling: number;
  stopping_predicate: "strict-binary64-rounding-cell-containment";
}

interface OraclePathCandidate {
  method: string;
  exact_rational_input: true;
  escalation: EscalationCandidate;
  enclosure: ExactIntervalCandidate;
}

interface ProjectionCandidate {
  target_format: "binary64";
  rounding_mode: "roundTiesToEven";
  projected_binary64_hex: string;
  cell_lower: string;
  cell_upper: string;
  strict_containment: true;
}

export interface PValueCertificateCandidate {
  status: "non_authoritative_candidate";
  artifact_kind: "paired-t-p-value-certificate";
  result: "certified";
  input: {
    degrees_of_freedom: number;
    test_statistic_binary64_hex: string;
    exact_x_numerator: string;
    exact_x_denominator: string;
  };
  primary: OraclePathCandidate & {
    method: "arb-regularized-incomplete-beta";
    branch: "lower" | "complementary-lower";
  };
  secondary: {
    method: "rigorous-density-quadrature-with-analytic-tail-bound";
    enclosure: ExactIntervalCandidate;
    overlap_with_primary: true;
  };
  closed_form: null | {
    method: "df1-cauchy-tail" | "df2-closed-form-tail";
    enclosure: ExactIntervalCandidate;
    overlap_with_primary: true;
  };
  projection: ProjectionCandidate;
  provenance: CertificateProvenanceCandidate;
}

export interface CriticalValueCertificateCandidate {
  status: "non_authoritative_candidate";
  artifact_kind: "paired-t-fixed-95-critical-value-certificate";
  result: "certified";
  input: {
    degrees_of_freedom: number;
    two_sided_tail_target: "1/20";
    candidate_binary64_hex: string;
  };
  primary: {
    method: "arb-regularized-incomplete-beta-midpoint-bracketing";
    exact_rational_input: true;
    escalation: EscalationCandidate;
    tail_at_cell_lower: ExactIntervalCandidate;
    tail_at_cell_upper: ExactIntervalCandidate;
  };
  secondary: {
    method: "rigorous-quantile-enclosure" | "rigorous-density-quadrature";
    quantile_enclosure: ExactIntervalCandidate;
    projects_to_same_candidate: true;
  };
  closed_form: null | {
    method: "df1-cot-pi" | "df2-algebraic-sqrt";
    quantile_enclosure: ExactIntervalCandidate;
    projects_to_same_candidate: true;
  };
  projection: ProjectionCandidate;
  provenance: CertificateProvenanceCandidate;
}

const HEX64 = /^[0-9a-f]{16}$/;
const SHA256 = /^sha256:[0-9a-f]{64}$/;
const COMMIT = /^[0-9a-f]{40}$/;
const RATIONAL = /^(-?)(0|[1-9][0-9]*)\/([1-9][0-9]*)$/;

function greatestCommonDivisor(first: bigint, second: bigint): bigint {
  let left = first < 0n ? -first : first;
  let right = second;
  while (right !== 0n) {
    const remainder = left % right;
    left = right;
    right = remainder;
  }
  return left;
}

function parseCanonicalRational(value: string): Rational | undefined {
  const match = RATIONAL.exec(value);
  if (match === null) return undefined;
  const numeratorText = match[2];
  const denominatorText = match[3];
  if (numeratorText === undefined || denominatorText === undefined) return undefined;
  const sign = match[1] === "-" ? -1n : 1n;
  const numerator = sign * BigInt(numeratorText);
  const denominator = BigInt(denominatorText);
  if (numerator === 0n && denominator !== 1n) return undefined;
  if (greatestCommonDivisor(numerator, denominator) !== 1n) return undefined;
  return { numerator, denominator };
}

function compareRationals(first: Rational, second: Rational): number {
  const difference = first.numerator * second.denominator - second.numerator * first.denominator;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}

function addRationals(first: Rational, second: Rational): Rational {
  const numerator = first.numerator * second.denominator + second.numerator * first.denominator;
  const denominator = first.denominator * second.denominator;
  const divisor = greatestCommonDivisor(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function multiplyRationals(first: Rational, second: Rational): Rational {
  const numerator = first.numerator * second.numerator;
  const denominator = first.denominator * second.denominator;
  const divisor = greatestCommonDivisor(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function divideRationals(first: Rational, second: Rational): Rational | undefined {
  if (second.numerator === 0n) return undefined;
  let numerator = first.numerator * second.denominator;
  let denominator = first.denominator * second.numerator;
  if (denominator < 0n) {
    numerator = -numerator;
    denominator = -denominator;
  }
  const divisor = greatestCommonDivisor(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function divideRationalByTwo(value: Rational): Rational {
  const denominator = value.denominator * 2n;
  const divisor = greatestCommonDivisor(value.numerator, denominator);
  return { numerator: value.numerator / divisor, denominator: denominator / divisor };
}

function rationalToString(value: Rational): string {
  return `${value.numerator}/${value.denominator}`;
}

function binary64BitsToRational(bits: bigint): Rational | undefined {
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  const fractionBits = bits & ((1n << 52n) - 1n);
  if (exponentBits === 0x7ff) return undefined;
  if (exponentBits === 0 && fractionBits === 0n) return { numerator: 0n, denominator: 1n };

  const negative = bits >> 63n === 1n;
  const significand = exponentBits === 0 ? fractionBits : (1n << 52n) | fractionBits;
  const exponent = exponentBits === 0 ? -1074 : exponentBits - 1023 - 52;
  let numerator = negative ? -significand : significand;
  let denominator = 1n;
  if (exponent >= 0) numerator <<= BigInt(exponent);
  else denominator <<= BigInt(-exponent);
  const divisor = greatestCommonDivisor(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function binary64HexToRational(hex: string): Rational | undefined {
  return HEX64.test(hex) ? binary64BitsToRational(BigInt(`0x${hex}`)) : undefined;
}

function adjacentPositiveBits(bits: bigint, direction: "down" | "up"): bigint | undefined {
  if (bits >> 63n !== 0n || bits >= 0x7ff0_0000_0000_0000n) return undefined;
  if (direction === "down") return bits === 0n ? 0x8000_0000_0000_0001n : bits - 1n;
  return bits + 1n;
}

export function binary64RoundingCellFromHex(
  hex: string,
): { lower: string; upper: string } | undefined {
  if (!HEX64.test(hex)) return undefined;
  const bits = BigInt(`0x${hex}`);
  const value = binary64BitsToRational(bits);
  const previousBits = adjacentPositiveBits(bits, "down");
  const nextBits = adjacentPositiveBits(bits, "up");
  if (value === undefined || previousBits === undefined || nextBits === undefined) return undefined;
  const previous = binary64BitsToRational(previousBits);
  const next = binary64BitsToRational(nextBits);
  if (previous === undefined || next === undefined) return undefined;
  return {
    lower: rationalToString(divideRationalByTwo(addRationals(previous, value))),
    upper: rationalToString(divideRationalByTwo(addRationals(value, next))),
  };
}

function validateInterval(label: string, interval: ExactIntervalCandidate, errors: string[]): void {
  const lower = parseCanonicalRational(interval.lower);
  const upper = parseCanonicalRational(interval.upper);
  if (lower === undefined || upper === undefined) {
    errors.push(`${label}: enclosure endpoints must be canonical exact fractions`);
  } else if (compareRationals(lower, upper) > 0) {
    errors.push(`${label}: enclosure lower endpoint exceeds upper endpoint`);
  }
}

function validateProbabilityInterval(
  label: string,
  interval: ExactIntervalCandidate,
  errors: string[],
): void {
  validateInterval(label, interval, errors);
  const values = intervalValues(interval);
  if (
    values !== undefined &&
    (compareRationals(values[0], { numerator: 0n, denominator: 1n }) < 0 ||
      compareRationals(values[1], { numerator: 1n, denominator: 1n }) > 0)
  ) {
    errors.push(`${label}: probability enclosure must stay within [0, 1]`);
  }
}

function validateNonVacuousProbabilityInterval(
  label: string,
  interval: ExactIntervalCandidate,
  errors: string[],
): void {
  validateProbabilityInterval(label, interval, errors);
  const values = intervalValues(interval);
  if (
    values !== undefined &&
    compareRationals(values[0], { numerator: 0n, denominator: 1n }) === 0 &&
    compareRationals(values[1], { numerator: 1n, denominator: 1n }) === 0
  ) {
    errors.push(`${label}: probability enclosure cannot be the vacuous [0, 1] interval`);
  }
}

function intervalValues(interval: ExactIntervalCandidate): [Rational, Rational] | undefined {
  const lower = parseCanonicalRational(interval.lower);
  const upper = parseCanonicalRational(interval.upper);
  return lower === undefined || upper === undefined ? undefined : [lower, upper];
}

function validateEscalation(
  label: string,
  escalation: EscalationCandidate,
  errors: string[],
): void {
  const history = escalation.precision_bits_history;
  if (history.length === 0 || history.some((value) => !Number.isSafeInteger(value) || value < 2)) {
    errors.push(`${label}: precision history must contain positive safe integer bit counts`);
    return;
  }
  if (history.some((value, index) => index > 0 && value <= (history[index - 1] ?? value))) {
    errors.push(`${label}: precision history must be strictly increasing`);
  }
  if (history.at(-1) !== escalation.precision_bits_final) {
    errors.push(`${label}: final precision must equal the last history entry`);
  }
  if (escalation.precision_bits_final > escalation.precision_bits_ceiling) {
    errors.push(`${label}: final precision exceeds the declared ceiling`);
  }
  if (escalation.stopping_predicate !== "strict-binary64-rounding-cell-containment") {
    errors.push(`${label}: stopping predicate is not the candidate strict-cell predicate`);
  }
}

function validateProvenance(provenance: CertificateProvenanceCandidate, errors: string[]): void {
  if (!COMMIT.test(provenance.generator_commit)) {
    errors.push("provenance: generator commit must be a full lowercase Git SHA");
  } else if (/^0+$/.test(provenance.generator_commit)) {
    errors.push("provenance: generator commit cannot be a placeholder");
  }
  if (!SHA256.test(provenance.generator_sha256)) {
    errors.push("provenance: generator hash must be sha256:<lowercase hex>");
  } else if (/^sha256:0+$/.test(provenance.generator_sha256)) {
    errors.push("provenance: generator hash cannot be a placeholder");
  }
  if (!SHA256.test(provenance.environment_sha256)) {
    errors.push("provenance: environment hash must be sha256:<lowercase hex>");
  } else if (/^sha256:0+$/.test(provenance.environment_sha256)) {
    errors.push("provenance: environment hash cannot be a placeholder");
  }
  if (!SHA256.test(provenance.source_output_sha256)) {
    errors.push("provenance: source-output hash must be sha256:<lowercase hex>");
  } else if (/^sha256:0+$/.test(provenance.source_output_sha256)) {
    errors.push("provenance: source-output hash cannot be a placeholder");
  }
}

function validateProjection(
  projection: ProjectionCandidate,
  enclosure: ExactIntervalCandidate,
  errors: string[],
): void {
  if (
    projection.target_format !== "binary64" ||
    projection.rounding_mode !== "roundTiesToEven" ||
    projection.strict_containment !== true
  ) {
    errors.push("projection: target, rounding mode, and strict containment must remain pinned");
  }
  const expectedCell = binary64RoundingCellFromHex(projection.projected_binary64_hex);
  if (expectedCell === undefined) {
    errors.push("projection: projected value must be finite, non-negative binary64 hex");
    return;
  }
  if (
    projection.cell_lower !== expectedCell.lower ||
    projection.cell_upper !== expectedCell.upper
  ) {
    errors.push("projection: exact rounding-cell endpoints do not match the projected binary64");
  }
  const ball = intervalValues(enclosure);
  const lowerCell = parseCanonicalRational(projection.cell_lower);
  const upperCell = parseCanonicalRational(projection.cell_upper);
  if (ball !== undefined && lowerCell !== undefined && upperCell !== undefined) {
    if (compareRationals(lowerCell, ball[0]) >= 0 || compareRationals(ball[1], upperCell) >= 0) {
      errors.push("projection: primary enclosure is not strictly inside the rounding cell");
    }
  }
}

function validateProjectionCell(projection: ProjectionCandidate, errors: string[]): void {
  if (
    projection.target_format !== "binary64" ||
    projection.rounding_mode !== "roundTiesToEven" ||
    projection.strict_containment !== true
  ) {
    errors.push("projection: target, rounding mode, and strict containment must remain pinned");
  }
  const expectedCell = binary64RoundingCellFromHex(projection.projected_binary64_hex);
  if (expectedCell === undefined) {
    errors.push("projection: projected value must be finite, non-negative binary64 hex");
  } else if (
    projection.cell_lower !== expectedCell.lower ||
    projection.cell_upper !== expectedCell.upper
  ) {
    errors.push("projection: exact rounding-cell endpoints do not match the projected binary64");
  }
}

function intervalsOverlap(first: ExactIntervalCandidate, second: ExactIntervalCandidate): boolean {
  const left = intervalValues(first);
  const right = intervalValues(second);
  return (
    left !== undefined &&
    right !== undefined &&
    compareRationals(left[0], right[1]) <= 0 &&
    compareRationals(right[0], left[1]) <= 0
  );
}

export function validatePValueCertificateCandidate(
  certificate: PValueCertificateCandidate,
): string[] {
  const errors: string[] = [];
  if (certificate.status !== "non_authoritative_candidate") {
    errors.push("p certificate must remain non-authoritative");
  }
  if (certificate.artifact_kind !== "paired-t-p-value-certificate") {
    errors.push("p certificate artifact kind is not pinned");
  }
  if (certificate.result !== "certified") errors.push("p certificate result must be certified");
  if (
    !Number.isSafeInteger(certificate.input.degrees_of_freedom) ||
    certificate.input.degrees_of_freedom < 1
  ) {
    errors.push("p certificate degrees of freedom must be a positive safe integer");
  }
  const exactTestStatistic = binary64HexToRational(certificate.input.test_statistic_binary64_hex);
  if (exactTestStatistic === undefined) {
    errors.push("p certificate test statistic must be exact binary64 hex");
  }
  const integerText = /^(0|[1-9][0-9]*)$/;
  const xNumerator = integerText.test(certificate.input.exact_x_numerator)
    ? BigInt(certificate.input.exact_x_numerator)
    : 0n;
  const xDenominator = integerText.test(certificate.input.exact_x_denominator)
    ? BigInt(certificate.input.exact_x_denominator)
    : 0n;
  if (
    xNumerator <= 0n ||
    xDenominator <= 0n ||
    xNumerator > xDenominator ||
    greatestCommonDivisor(xNumerator, xDenominator) !== 1n
  ) {
    errors.push("p certificate exact x must satisfy 0 < numerator <= denominator");
  } else if (
    exactTestStatistic !== undefined &&
    Number.isSafeInteger(certificate.input.degrees_of_freedom) &&
    certificate.input.degrees_of_freedom >= 1
  ) {
    const dfRational = {
      numerator: BigInt(certificate.input.degrees_of_freedom),
      denominator: 1n,
    };
    const statisticSquared = multiplyRationals(exactTestStatistic, exactTestStatistic);
    const expectedX = divideRationals(dfRational, addRationals(dfRational, statisticSquared));
    if (
      expectedX === undefined ||
      expectedX.numerator !== xNumerator ||
      expectedX.denominator !== xDenominator
    ) {
      errors.push("p certificate exact x does not match df/(df+t^2)");
    }
  }

  if (
    certificate.primary.method !== "arb-regularized-incomplete-beta" ||
    certificate.primary.exact_rational_input !== true
  ) {
    errors.push("p primary: method and exact-rational input flag are not pinned");
  }
  const expectedBranch = xNumerator * 2n > xDenominator ? "complementary-lower" : "lower";
  if (certificate.primary.branch !== expectedBranch) {
    errors.push("p primary: incomplete-beta branch does not match the exact x region");
  }
  validateEscalation("p primary", certificate.primary.escalation, errors);
  validateProbabilityInterval("p primary", certificate.primary.enclosure, errors);
  validateNonVacuousProbabilityInterval("p secondary", certificate.secondary.enclosure, errors);
  if (certificate.secondary.method !== "rigorous-density-quadrature-with-analytic-tail-bound") {
    errors.push("p secondary: method is not the candidate method-distinct path");
  }
  if (!certificate.secondary.overlap_with_primary) {
    errors.push("p secondary: overlap must be explicitly established");
  } else if (!intervalsOverlap(certificate.primary.enclosure, certificate.secondary.enclosure)) {
    errors.push("p secondary: declared overlap is false for the exact enclosures");
  }
  const df = certificate.input.degrees_of_freedom;
  if (df === 1 && certificate.closed_form?.method !== "df1-cauchy-tail") {
    errors.push("p certificate df=1 requires the Cauchy-tail closed-form path");
  }
  if (df === 2 && certificate.closed_form?.method !== "df2-closed-form-tail") {
    errors.push("p certificate df=2 requires the algebraic closed-form path");
  }
  if (df > 2 && certificate.closed_form !== null) {
    errors.push("p certificate closed-form evidence is only defined for df=1 or df=2");
  }
  if (certificate.closed_form !== null) {
    validateNonVacuousProbabilityInterval(
      "p closed form",
      certificate.closed_form.enclosure,
      errors,
    );
    if (
      !certificate.closed_form.overlap_with_primary ||
      !intervalsOverlap(certificate.primary.enclosure, certificate.closed_form.enclosure)
    ) {
      errors.push("p closed form: exact enclosure must overlap the primary enclosure");
    }
  }
  validateProjection(certificate.projection, certificate.primary.enclosure, errors);
  const projectedP = binary64HexToRational(certificate.projection.projected_binary64_hex);
  if (
    projectedP === undefined ||
    compareRationals(projectedP, { numerator: 0n, denominator: 1n }) <= 0 ||
    compareRationals(projectedP, { numerator: 1n, denominator: 1n }) > 0
  ) {
    errors.push("p projection must be a positive binary64 value no greater than one");
  }
  validateProvenance(certificate.provenance, errors);
  return errors;
}

export function validateCriticalValueCertificateCandidate(
  certificate: CriticalValueCertificateCandidate,
): string[] {
  const errors: string[] = [];
  if (certificate.status !== "non_authoritative_candidate") {
    errors.push("critical-value certificate must remain non-authoritative");
  }
  if (certificate.artifact_kind !== "paired-t-fixed-95-critical-value-certificate") {
    errors.push("critical-value certificate artifact kind is not pinned");
  }
  if (certificate.result !== "certified") {
    errors.push("critical-value certificate result must be certified");
  }
  const df = certificate.input.degrees_of_freedom;
  if (!Number.isSafeInteger(df) || df < 1) {
    errors.push("critical-value degrees of freedom must be a positive safe integer");
  }
  const expectedCell = binary64RoundingCellFromHex(certificate.input.candidate_binary64_hex);
  const candidateValue = binary64HexToRational(certificate.input.candidate_binary64_hex);
  if (
    expectedCell === undefined ||
    candidateValue === undefined ||
    compareRationals(candidateValue, { numerator: 0n, denominator: 1n }) <= 0
  ) {
    errors.push("critical-value candidate must be finite, non-negative binary64 hex");
  } else if (
    certificate.projection.projected_binary64_hex !== certificate.input.candidate_binary64_hex
  ) {
    errors.push("critical-value input and projection must bind the same binary64 value");
  }

  if (
    certificate.input.two_sided_tail_target !== "1/20" ||
    certificate.primary.method !== "arb-regularized-incomplete-beta-midpoint-bracketing" ||
    certificate.primary.exact_rational_input !== true
  ) {
    errors.push("critical primary: target, method, and exact-rational input are not pinned");
  }
  validateEscalation("critical primary", certificate.primary.escalation, errors);
  validateProbabilityInterval(
    "critical lower midpoint",
    certificate.primary.tail_at_cell_lower,
    errors,
  );
  validateProbabilityInterval(
    "critical upper midpoint",
    certificate.primary.tail_at_cell_upper,
    errors,
  );
  const target = { numerator: 1n, denominator: 20n };
  const atLower = intervalValues(certificate.primary.tail_at_cell_lower);
  const atUpper = intervalValues(certificate.primary.tail_at_cell_upper);
  if (atLower !== undefined && compareRationals(atLower[0], target) <= 0) {
    errors.push("critical lower midpoint: tail enclosure does not prove p > 1/20");
  }
  if (atUpper !== undefined && compareRationals(atUpper[1], target) >= 0) {
    errors.push("critical upper midpoint: tail enclosure does not prove p < 1/20");
  }
  if (!certificate.secondary.projects_to_same_candidate) {
    errors.push("critical secondary: independent projection must match the candidate");
  }
  if (
    certificate.secondary.method !== "rigorous-quantile-enclosure" &&
    certificate.secondary.method !== "rigorous-density-quadrature"
  ) {
    errors.push("critical secondary: method is not a recognized independent route");
  }
  validateInterval("critical secondary quantile", certificate.secondary.quantile_enclosure, errors);
  validateProjection(certificate.projection, certificate.secondary.quantile_enclosure, errors);
  if (df === 1 && certificate.closed_form?.method !== "df1-cot-pi") {
    errors.push("critical-value df=1 requires the cot-pi closed-form path");
  }
  if (df === 2 && certificate.closed_form?.method !== "df2-algebraic-sqrt") {
    errors.push("critical-value df=2 requires the algebraic-sqrt closed-form path");
  }
  if (df > 2 && certificate.closed_form !== null) {
    errors.push("critical-value closed-form evidence is only defined for df=1 or df=2");
  }
  if (certificate.closed_form !== null) {
    validateInterval(
      "critical closed-form quantile",
      certificate.closed_form.quantile_enclosure,
      errors,
    );
    validateProjection(certificate.projection, certificate.closed_form.quantile_enclosure, errors);
    if (!certificate.closed_form.projects_to_same_candidate) {
      errors.push("critical closed form: independent projection must match the candidate");
    }
  }
  validateProjectionCell(certificate.projection, errors);
  validateProvenance(certificate.provenance, errors);
  return errors;
}
