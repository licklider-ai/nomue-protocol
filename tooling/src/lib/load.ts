/** Loaders for the authoritative artifacts, shared by the CLIs and tests. */

import { createHash } from "node:crypto";
import { loadJson, loadYaml, readText } from "./repo.js";
import type {
  AuthorityManifest,
  BundlesRegistry,
  ConformanceManifest,
  GateIndex,
  GatesRegistry,
  RequirementsRegistry,
  StabilityTiersRegistry,
  SurfacesRegistry,
  VocabularyRegistry,
} from "./types.js";
import type {
  BundlesView,
  ReasonCodesView,
  StateInvariantsView,
  SurfacesView,
  ViewSources,
} from "./views.js";

export const PATHS = {
  authorityManifest: "authority/authority-manifest.yaml",
  releaseGates: "authority/release-1-gates.yaml",
  requirements: "registries/requirements.yaml",
  vocabulary: "registries/vocabulary.yaml",
  stabilityTiers: "registries/stability-tiers.yaml",
  surfaces: "registries/public-contract-surfaces.yaml",
  bundles: "registries/interpretation-bundles.yaml",
  publicChecks: "registries/public-checks.yaml",
  reasonCodes: "registries/reason-codes.yaml",
  stateInvariants: "registries/state-invariants.yaml",
  conformanceManifest: "conformance/manifest.yaml",
  gateIndex: "evidence/release-1/gate-index.json",
  attestationSignatureSuites: "registries/attestation-signature-suites.yaml",
  attestationTrustRoot: "registries/attestation-trust-root.yaml",
  lifecycleOperations: "registries/lifecycle-operations.yaml",
} as const;

export const SCHEMA_FOR: ReadonlyArray<{ document: string; schema: string }> = [
  { document: PATHS.authorityManifest, schema: "schemas/meta/authority-manifest.schema.json" },
  { document: PATHS.releaseGates, schema: "schemas/meta/release-gates.schema.json" },
  { document: PATHS.requirements, schema: "schemas/meta/requirements-registry.schema.json" },
  { document: PATHS.vocabulary, schema: "schemas/meta/vocabulary-registry.schema.json" },
  { document: PATHS.stabilityTiers, schema: "schemas/meta/stability-tiers.schema.json" },
  { document: PATHS.surfaces, schema: "schemas/meta/public-contract-surfaces.schema.json" },
  { document: PATHS.bundles, schema: "schemas/meta/interpretation-bundles.schema.json" },
  { document: PATHS.publicChecks, schema: "schemas/meta/public-checks-registry.schema.json" },
  { document: PATHS.reasonCodes, schema: "schemas/meta/reason-codes-registry.schema.json" },
  { document: PATHS.stateInvariants, schema: "schemas/meta/state-invariants-registry.schema.json" },
  {
    document: PATHS.attestationSignatureSuites,
    schema: "schemas/meta/attestation-signature-suites.schema.json",
  },
  {
    document: PATHS.attestationTrustRoot,
    schema: "schemas/meta/attestation-trust-root.schema.json",
  },
  {
    document: PATHS.lifecycleOperations,
    schema: "schemas/meta/lifecycle-operations.schema.json",
  },
];

/** Parse a registry/authority YAML document without asserting its shape. */
export function loadYamlDocumentFor(document: string): unknown {
  return loadYaml<unknown>(document);
}

export const loadAuthorityManifest = (): AuthorityManifest =>
  loadYaml<AuthorityManifest>(PATHS.authorityManifest);
export const loadGates = (): GatesRegistry => loadYaml<GatesRegistry>(PATHS.releaseGates);
export const loadRequirements = (): RequirementsRegistry =>
  loadYaml<RequirementsRegistry>(PATHS.requirements);
export const loadVocabulary = (): VocabularyRegistry =>
  loadYaml<VocabularyRegistry>(PATHS.vocabulary);
export const loadStabilityTiers = (): StabilityTiersRegistry =>
  loadYaml<StabilityTiersRegistry>(PATHS.stabilityTiers);
export const loadSurfaces = (): SurfacesRegistry => loadYaml<SurfacesRegistry>(PATHS.surfaces);
export const loadBundles = (): BundlesRegistry => loadYaml<BundlesRegistry>(PATHS.bundles);
export const loadConformance = (): ConformanceManifest =>
  loadYaml<ConformanceManifest>(PATHS.conformanceManifest);
export const loadGateIndex = (): GateIndex => loadJson<GateIndex>(PATHS.gateIndex);

export function loadViewSources(): ViewSources {
  const hashOf = (rel: string): string =>
    createHash("sha256").update(readText(rel).replace(/\r\n/g, "\n"), "utf8").digest("hex");
  return {
    requirements: loadRequirements(),
    vocabulary: loadVocabulary(),
    gates: loadGates(),
    manifest: loadAuthorityManifest(),
    publicChecks: loadYaml(PATHS.publicChecks),
    reasonCodes: { codes: loadYaml<{ codes: ReasonCodesView["codes"] }>(PATHS.reasonCodes).codes },
    stateInvariants: {
      invariants: loadYaml<{ invariants: StateInvariantsView["invariants"] }>(PATHS.stateInvariants)
        .invariants,
    },
    surfaces: { entries: loadYaml<{ entries: SurfacesView["entries"] }>(PATHS.surfaces).entries },
    bundles: { entries: loadYaml<{ entries: BundlesView["entries"] }>(PATHS.bundles).entries },
    hashOf,
  };
}
