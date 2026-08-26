/** Non-authoritative Interpretation Bundle vNext shape spike. */

import {
  validateProtocolHttpsIdentifier,
  type ProtocolIdentifierFamily,
} from "../identifiers/https-identifier.js";

export interface UnissuedIdentifierCandidate {
  state: "unissued";
  family: ProtocolIdentifierFamily;
  name: string;
  revision: string;
}

export interface SchemaBindingCandidate {
  role: "record" | "profile" | "verification_report" | "common";
  identifier: UnissuedIdentifierCandidate;
  repositoryPath: string;
}

export interface InterpretationBundleVNextSpike {
  status: "non_authoritative_spike";
  bundle: UnissuedIdentifierCandidate;
  profile: UnissuedIdentifierCandidate;
  analysisContracts: readonly UnissuedIdentifierCandidate[];
  canonicalization: UnissuedIdentifierCandidate;
  publicChecks: readonly UnissuedIdentifierCandidate[];
  schemas: readonly SchemaBindingCandidate[];
}

export interface BundleVNextSpikeValidation {
  ok: boolean;
  errors: string[];
}

function spelling(candidate: UnissuedIdentifierCandidate): string {
  return `https://nomue.ai/id/${candidate.family}/${candidate.name}/${candidate.revision}`;
}

function checkCandidate(
  errors: string[],
  label: string,
  candidate: UnissuedIdentifierCandidate,
  family: ProtocolIdentifierFamily,
): void {
  if (candidate.state !== "unissued") errors.push(`${label} is not marked unissued`);
  if (candidate.family !== family) {
    errors.push(`${label} must use the ${family} family, got ${candidate.family}`);
  }
  const validation = validateProtocolHttpsIdentifier(spelling(candidate));
  if (!validation.ok) errors.push(`${label} has invalid candidate parts: ${validation.errors.join(", ")}`);
}

/**
 * Exercise role separation without minting any identifier or registering support.
 * A caller can inspect candidate parts, but this spike never exports a registry entry.
 */
export function validateInterpretationBundleVNextSpike(
  candidate: InterpretationBundleVNextSpike,
): BundleVNextSpikeValidation {
  const errors: string[] = [];
  if (candidate.status !== "non_authoritative_spike") {
    errors.push("candidate must remain marked non_authoritative_spike");
  }
  checkCandidate(errors, "bundle", candidate.bundle, "bundle");
  checkCandidate(errors, "profile", candidate.profile, "profile");
  checkCandidate(errors, "canonicalization", candidate.canonicalization, "canonicalization");
  if (candidate.analysisContracts.length === 0) {
    errors.push("at least one Analysis Contract binding is required");
  }
  candidate.analysisContracts.forEach((entry, index) =>
    checkCandidate(errors, `analysisContracts[${index}]`, entry, "contract"),
  );
  if (candidate.publicChecks.length === 0) errors.push("at least one Public Check is required");
  candidate.publicChecks.forEach((entry, index) =>
    checkCandidate(errors, `publicChecks[${index}]`, entry, "check"),
  );
  if (candidate.schemas.length === 0) errors.push("at least one schema binding is required");
  candidate.schemas.forEach((entry, index) => {
    checkCandidate(errors, `schemas[${index}].identifier`, entry.identifier, "schema");
    if (!/^schemas\/[A-Za-z0-9][A-Za-z0-9._/-]*\.schema\.json$/.test(entry.repositoryPath)) {
      errors.push(`schemas[${index}].repositoryPath is not a repository schema path`);
    }
  });

  const identities = [
    candidate.bundle,
    candidate.profile,
    candidate.canonicalization,
    ...candidate.analysisContracts,
    ...candidate.publicChecks,
    ...candidate.schemas.map((entry) => entry.identifier),
  ].map(spelling);
  if (new Set(identities).size !== identities.length) {
    errors.push("candidate identities must be distinct across semantic roles");
  }
  return { ok: errors.length === 0, errors };
}

