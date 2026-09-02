/**
 * Non-authoritative Group 3 admission-evidence infrastructure candidate.
 *
 * This module admits no Protocol runtime. It evaluates one proposed exact
 * runtime/build/platform tuple inside a permissioned process, composes that
 * guard with the closed Group 2 full-trace candidate, and still reports every
 * public support field as false pending exact-head evidence and independent
 * review.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import {
  evaluatePairedTRuntimeNumericalContractFullTraceCandidate,
  verifyPairedTRuntimeNumericalContractFullTraceCandidate,
  type PairedTRuntimeNumericalContractFullTraceCandidateResult,
} from "./paired-t-runtime-numerical-contract-full-trace-candidate.js";

const EXPECTED_CHECKPOINT_CANONICAL_SHA256 =
  "sha256:b0adf7c9d1a7241a1aaaff67988fa74343e9dbc04b3b34307f200f63bb002e0f";
const CANDIDATE_STATUS = "non_authoritative_group_3_admission_evidence_evaluation";
const PROPOSED_TUPLE = {
  runtime: "node",
  runtimeVersion: "24.19.0",
  engine: "v8",
  engineVersion: "13.6.233.17-node.51",
  platform: "linux",
  architecture: "x64",
  executableSha256: "bc17c508ffeed0ec622934f9b7fa72f8e78da65350e63c3eceb56fa688aa5e12",
} as const;
const REQUIRED_FLAGS = [
  "--permission",
  "--no-addons",
  "--disallow-code-generation-from-strings",
  "--frozen-intrinsics",
] as const;
const MAXIMUM_CLOSED_JSON_ARRAY_LENGTH = 140_000;

type JsonRecord = Record<string, unknown>;

export interface PairedTAdmissionEnvironmentCandidate {
  runtime: typeof PROPOSED_TUPLE.runtime;
  runtimeVersion: typeof PROPOSED_TUPLE.runtimeVersion;
  engine: typeof PROPOSED_TUPLE.engine;
  engineVersion: typeof PROPOSED_TUPLE.engineVersion;
  platform: typeof PROPOSED_TUPLE.platform;
  architecture: typeof PROPOSED_TUPLE.architecture;
  executableSha256: typeof PROPOSED_TUPLE.executableSha256;
  executablePath: string;
  modulePath: string;
  execArgv: string[];
  permissions: {
    addons: false;
    childProcess: false;
    workerThreads: false;
    wasi: false;
    inspector: false;
    filesystemWrite: false;
    executableRead: true;
    moduleRead: true;
  };
  intrinsics: {
    mathFrozen: true;
    arrayPrototypeFrozen: true;
    objectPrototypeFrozen: true;
    sqrtWritable: false;
    sqrtConfigurable: false;
  };
  sentinels: {
    addNext: boolean;
    addSubnormal: boolean;
    subtract: boolean;
    multiplySubnormal: boolean;
    divideTieToZero: boolean;
    divideTenth: boolean;
    sqrtTwo: boolean;
    negativeZero: boolean;
  };
}

export type PairedTSupportedExecutionAdmissionEvidenceCandidateResult =
  | {
      ok: true;
      status: typeof CANDIDATE_STATUS;
      environment: PairedTAdmissionEnvironmentCandidate;
      group2: Extract<PairedTRuntimeNumericalContractFullTraceCandidateResult, { ok: true }>;
      candidateAdmissionPredicateSatisfied: true;
      admissionEvidenceInfrastructureImplemented: true;
      exactRuntimeAllowlistSelected: false;
      controlledProcessProfileSelected: false;
      crossPlatformAdmissionEvidenceComplete: false;
      supportedExecutionPredicateSelected: false;
      group3Complete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    }
  | {
      ok: false;
      status: typeof CANDIDATE_STATUS;
      classification:
        | "runtime_build_platform_tuple_mismatch"
        | "controlled_process_profile_not_established"
        | "group_2_full_trace_refusal"
        | "environment_changed_during_evaluation"
        | "group_2_full_trace_reverification_failed";
      environmentErrors?: string[];
      upstreamClassification?: string;
      verificationErrors?: string[];
      candidateAdmissionPredicateSatisfied: false;
      admissionEvidenceInfrastructureImplemented: true;
      exactRuntimeAllowlistSelected: false;
      controlledProcessProfileSelected: false;
      crossPlatformAdmissionEvidenceComplete: false;
      supportedExecutionPredicateSelected: false;
      group3Complete: false;
      supportedExecutionPredicateSatisfied: false;
      supportedPlatformClaimed: false;
      supportedDomainClaimed: false;
      runtimeSupportClaimed: false;
    };

function strictDataCopy(value: unknown, ancestors = new Set<object>(), sortKeys = false): unknown {
  if (
    value === undefined ||
    typeof value === "bigint" ||
    typeof value === "function" ||
    typeof value === "symbol" ||
    (typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)))
  ) {
    throw new TypeError("Group 3 candidate contains non-canonical JSON data");
  }
  if (typeof value !== "object" || value === null) return value;
  if (ancestors.has(value)) throw new TypeError("Group 3 candidate contains a cycle");
  const nextAncestors = new Set(ancestors).add(value);
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")) {
    throw new TypeError("Group 3 candidate contains symbol keys");
  }
  const descriptors = Object.getOwnPropertyDescriptors(value);
  if (Array.isArray(value)) {
    const lengthDescriptor = Reflect.getOwnPropertyDescriptor(value, "length");
    if (
      Reflect.getPrototypeOf(value) !== Array.prototype ||
      lengthDescriptor === undefined ||
      !("value" in lengthDescriptor) ||
      typeof lengthDescriptor.value !== "number" ||
      !Number.isSafeInteger(lengthDescriptor.value) ||
      lengthDescriptor.value < 0 ||
      lengthDescriptor.value > MAXIMUM_CLOSED_JSON_ARRAY_LENGTH ||
      keys.length !== lengthDescriptor.value + 1
    ) {
      throw new TypeError("Group 3 candidate contains an invalid array");
    }
    const result: unknown[] = [];
    for (let index = 0; index < lengthDescriptor.value; index += 1) {
      const descriptor = descriptors[String(index)];
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError("Group 3 candidate contains a non-data array entry");
      }
      result.push(strictDataCopy(descriptor.value, nextAncestors, sortKeys));
    }
    return result;
  }
  if (Reflect.getPrototypeOf(value) !== Object.prototype) {
    throw new TypeError("Group 3 candidate contains a non-plain object");
  }
  const entries: Array<[string, unknown]> = [];
  for (const key of keys as string[]) {
    const descriptor = descriptors[key];
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      throw new TypeError("Group 3 candidate contains hidden or accessor data");
    }
    entries.push([key, strictDataCopy(descriptor.value, nextAncestors, sortKeys)]);
  }
  if (sortKeys) {
    entries.sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0));
  }
  return Object.fromEntries(entries);
}

function canonicalSha256(value: unknown): string {
  const canonical = strictDataCopy(value, new Set<object>(), true);
  return `sha256:${createHash("sha256").update(JSON.stringify(canonical), "utf8").digest("hex")}`;
}

function hasExactKeys(value: JsonRecord, expected: readonly string[]): boolean {
  return isDeepStrictEqual(Object.keys(value).sort(), [...expected].sort());
}

function sentinelResults(): PairedTAdmissionEnvironmentCandidate["sentinels"] {
  return {
    addNext: 1 + 2 ** -52 === 1.0000000000000002,
    addSubnormal: Number.MIN_VALUE + Number.MIN_VALUE === 1e-323,
    subtract: 1 - 2 ** -52 === 0.9999999999999998,
    multiplySubnormal: Number.MIN_VALUE * 1 === Number.MIN_VALUE,
    divideTieToZero: Number.MIN_VALUE / 2 === 0,
    divideTenth: 1 / 10 === 0.1,
    sqrtTwo: Math.sqrt(2) === 1.4142135623730951,
    negativeZero: Object.is(-1 * 0, -0),
  };
}

function permissionHas(permission: string, reference?: string): boolean {
  const permissionApi = process.permission;
  if (permissionApi === undefined) return false;
  try {
    return reference === undefined
      ? permissionApi.has(permission)
      : permissionApi.has(permission, reference);
  } catch {
    return false;
  }
}

function collectEnvironment(): PairedTAdmissionEnvironmentCandidate | JsonRecord {
  const sqrtDescriptor = Object.getOwnPropertyDescriptor(Math, "sqrt");
  const modulePath = fileURLToPath(import.meta.url);
  return {
    runtime: "node",
    runtimeVersion: process.versions.node,
    engine: "v8",
    engineVersion: process.versions.v8,
    platform: process.platform,
    architecture: process.arch,
    executableSha256: createHash("sha256").update(readFileSync(process.execPath)).digest("hex"),
    executablePath: process.execPath,
    modulePath,
    execArgv: [...process.execArgv],
    permissions: {
      addons: permissionHas("addons"),
      childProcess: permissionHas("child"),
      workerThreads: permissionHas("worker"),
      wasi: permissionHas("wasi"),
      inspector: permissionHas("inspector"),
      filesystemWrite: permissionHas("fs.write"),
      executableRead: permissionHas("fs.read", process.execPath),
      moduleRead: permissionHas("fs.read", modulePath),
    },
    intrinsics: {
      mathFrozen: Object.isFrozen(Math),
      arrayPrototypeFrozen: Object.isFrozen(Array.prototype),
      objectPrototypeFrozen: Object.isFrozen(Object.prototype),
      sqrtWritable: sqrtDescriptor?.writable ?? true,
      sqrtConfigurable: sqrtDescriptor?.configurable ?? true,
    },
    sentinels: sentinelResults(),
  };
}

function validateExecArgv(
  execArgv: readonly string[],
  executablePath: unknown,
  modulePath: unknown,
): string[] {
  const errors: string[] = [];
  for (const required of REQUIRED_FLAGS) {
    if (execArgv.filter((value) => value === required).length !== 1) {
      errors.push(`required controlled-process flag is absent or duplicated: ${required}`);
    }
  }
  const readGrants = execArgv.filter((value) => value.startsWith("--allow-fs-read="));
  const grantPaths = readGrants.map((value) => value.slice("--allow-fs-read=".length));
  const broadOrEmptyGrant = grantPaths.some((grant) => {
    if (grant.trim() === "" || grant === "*") return true;
    const resolved = path.resolve(grant);
    return resolved === path.parse(resolved).root;
  });
  if (readGrants.length !== 2 || broadOrEmptyGrant) {
    errors.push("controlled process must have exactly two non-wildcard filesystem-read grants");
  }
  const executableGrantCount =
    typeof executablePath === "string"
      ? grantPaths.filter((grant) => path.resolve(grant) === path.resolve(executablePath)).length
      : 0;
  const compiledTreeGrantCount =
    typeof modulePath === "string"
      ? grantPaths.filter((grant) => {
          const resolved = path.resolve(grant);
          return (
            path.basename(resolved) === "compiled" &&
            modulePath.startsWith(`${resolved}${path.sep}`)
          );
        }).length
      : 0;
  if (
    typeof executablePath !== "string" ||
    typeof modulePath !== "string" ||
    executableGrantCount !== 1 ||
    compiledTreeGrantCount !== 1
  ) {
    errors.push("filesystem-read grants do not bind the executable and compiled candidate tree");
  }
  const allowed = new Set<string>([...REQUIRED_FLAGS, "--trace-opt"]);
  for (const value of execArgv) {
    if (!allowed.has(value) && !value.startsWith("--allow-fs-read=")) {
      errors.push(`controlled process has an undeclared execution flag: ${value}`);
    }
    if (value.startsWith("--allow-") && !value.startsWith("--allow-fs-read=")) {
      errors.push(`controlled process has a forbidden permission grant: ${value}`);
    }
  }
  return errors;
}

export function validatePairedTAdmissionEnvironmentCandidate(candidate: unknown): {
  ok: boolean;
  tupleMatches: boolean;
  profileEstablished: boolean;
  errors: string[];
} {
  try {
    const copied = strictDataCopy(candidate) as JsonRecord;
    const tupleErrors: string[] = [];
    const profileErrors: string[] = [];
    const tupleMatches =
      copied.runtime === PROPOSED_TUPLE.runtime &&
      copied.runtimeVersion === PROPOSED_TUPLE.runtimeVersion &&
      copied.engine === PROPOSED_TUPLE.engine &&
      copied.engineVersion === PROPOSED_TUPLE.engineVersion &&
      copied.platform === PROPOSED_TUPLE.platform &&
      copied.architecture === PROPOSED_TUPLE.architecture &&
      copied.executableSha256 === PROPOSED_TUPLE.executableSha256;
    if (!tupleMatches)
      tupleErrors.push("runtime/build/platform tuple does not match the evidence proposal");
    if (
      !hasExactKeys(copied, [
        "runtime",
        "runtimeVersion",
        "engine",
        "engineVersion",
        "platform",
        "architecture",
        "executableSha256",
        "executablePath",
        "modulePath",
        "execArgv",
        "permissions",
        "intrinsics",
        "sentinels",
      ]) ||
      !Array.isArray(copied.execArgv)
    ) {
      return {
        ok: false,
        tupleMatches,
        profileEstablished: false,
        errors: [...tupleErrors, "environment report has an invalid closed shape"],
      };
    }
    profileErrors.push(
      ...validateExecArgv(copied.execArgv as string[], copied.executablePath, copied.modulePath),
    );
    const expectedPermissions = {
      addons: false,
      childProcess: false,
      workerThreads: false,
      wasi: false,
      inspector: false,
      filesystemWrite: false,
      executableRead: true,
      moduleRead: true,
    };
    if (!isDeepStrictEqual(copied.permissions, expectedPermissions)) {
      profileErrors.push("controlled-process permission state is not established");
    }
    const expectedIntrinsics = {
      mathFrozen: true,
      arrayPrototypeFrozen: true,
      objectPrototypeFrozen: true,
      sqrtWritable: false,
      sqrtConfigurable: false,
    };
    if (!isDeepStrictEqual(copied.intrinsics, expectedIntrinsics)) {
      profileErrors.push("required intrinsic freeze is not established");
    }
    if (
      typeof copied.sentinels !== "object" ||
      copied.sentinels === null ||
      !Object.values(copied.sentinels).every((value) => value === true)
    ) {
      profileErrors.push("binary64 sentinel diagnostics failed");
    }
    const profileEstablished = profileErrors.length === 0;
    return {
      ok: tupleMatches && profileEstablished,
      tupleMatches,
      profileEstablished,
      errors: [...tupleErrors, ...profileErrors],
    };
  } catch {
    return {
      ok: false,
      tupleMatches: false,
      profileEstablished: false,
      errors: ["environment validation failed closed"],
    };
  }
}

function refusal(
  classification: Extract<
    PairedTSupportedExecutionAdmissionEvidenceCandidateResult,
    { ok: false }
  >["classification"],
  detail: {
    environmentErrors?: string[];
    upstreamClassification?: string;
    verificationErrors?: string[];
  } = {},
): PairedTSupportedExecutionAdmissionEvidenceCandidateResult {
  return {
    ok: false,
    status: CANDIDATE_STATUS,
    classification,
    ...detail,
    candidateAdmissionPredicateSatisfied: false,
    admissionEvidenceInfrastructureImplemented: true,
    exactRuntimeAllowlistSelected: false,
    controlledProcessProfileSelected: false,
    crossPlatformAdmissionEvidenceComplete: false,
    supportedExecutionPredicateSelected: false,
    group3Complete: false,
    supportedExecutionPredicateSatisfied: false,
    supportedPlatformClaimed: false,
    supportedDomainClaimed: false,
    runtimeSupportClaimed: false,
  };
}

export function evaluatePairedTSupportedExecutionAdmissionEvidenceCandidate(
  input: unknown,
): PairedTSupportedExecutionAdmissionEvidenceCandidateResult {
  try {
    const before = collectEnvironment();
    const beforeValidation = validatePairedTAdmissionEnvironmentCandidate(before);
    if (!beforeValidation.tupleMatches) {
      return refusal("runtime_build_platform_tuple_mismatch", {
        environmentErrors: beforeValidation.errors,
      });
    }
    if (!beforeValidation.profileEstablished) {
      return refusal("controlled_process_profile_not_established", {
        environmentErrors: beforeValidation.errors,
      });
    }
    const group2 = evaluatePairedTRuntimeNumericalContractFullTraceCandidate(input);
    if (!group2.ok) {
      return refusal("group_2_full_trace_refusal", {
        upstreamClassification: group2.classification,
      });
    }
    const after = collectEnvironment();
    const afterValidation = validatePairedTAdmissionEnvironmentCandidate(after);
    if (!afterValidation.ok || !isDeepStrictEqual(before, after)) {
      return refusal("environment_changed_during_evaluation", {
        environmentErrors: afterValidation.errors,
      });
    }
    const verification = verifyPairedTRuntimeNumericalContractFullTraceCandidate(group2.envelope);
    if (!verification.ok) {
      return refusal("group_2_full_trace_reverification_failed", {
        verificationErrors: verification.errors,
      });
    }
    deepFreeze(before);
    return deepFreeze({
      ok: true,
      status: CANDIDATE_STATUS,
      environment: before as PairedTAdmissionEnvironmentCandidate,
      group2,
      candidateAdmissionPredicateSatisfied: true,
      admissionEvidenceInfrastructureImplemented: true,
      exactRuntimeAllowlistSelected: false,
      controlledProcessProfileSelected: false,
      crossPlatformAdmissionEvidenceComplete: false,
      supportedExecutionPredicateSelected: false,
      group3Complete: false,
      supportedExecutionPredicateSatisfied: false,
      supportedPlatformClaimed: false,
      supportedDomainClaimed: false,
      runtimeSupportClaimed: false,
    });
  } catch {
    return refusal("controlled_process_profile_not_established", {
      environmentErrors: ["controlled admission evaluation failed closed"],
    });
  }
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (typeof value !== "object" || value === null || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Reflect.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

/** Fail-closed validation for the exact admission-evidence checkpoint. */
export function validatePairedTSupportedExecutionAdmissionEvidenceCheckpoint(
  candidate: unknown,
): string[] {
  try {
    return canonicalSha256(candidate) === EXPECTED_CHECKPOINT_CANONICAL_SHA256
      ? []
      : ["supported-execution admission-evidence checkpoint differs from the candidate"];
  } catch {
    return ["supported-execution admission-evidence checkpoint differs from the candidate"];
  }
}

/** Exposed only so the evidence collector can bind its read grants to this module path. */
export function pairedTAdmissionEvidenceModuleDirectory(): string {
  return path.dirname(fileURLToPath(import.meta.url));
}
