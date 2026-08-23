/**
 * Builders for the non-authoritative views under generated/. Deterministic:
 * output depends only on the source registries, never on time or environment.
 * Headers pin the source artifacts by content hash.
 */

import type {
  AuthorityManifest,
  GatesRegistry,
  RequirementsRegistry,
  VocabularyRegistry,
} from "./types.js";

export interface PublicChecksView {
  check_sets: Array<{ version: string; check_ids: string[] }>;
  checks: Array<{
    check_id: string;
    title: string;
    stability: string;
    scope_kind: string;
    calculation_evidence: string;
    consistency_evidence: string;
    signature_evidence: string;
    claim_posture: string;
    implementation_status: string;
    depends_on?: string[];
    requirement_ids?: string[];
  }>;
}

export interface ReasonCodesView {
  codes: Array<{ id: string; title: string; category: string; stability: string }>;
}

export interface StateInvariantsView {
  invariants: Array<{
    invariant_id: string;
    title: string;
    scope: string;
    stability: string;
    machine_testable: boolean;
    failure_reason_code: string | null;
  }>;
}

export interface SurfacesView {
  entries: Array<{
    surface_id: string;
    title: string;
    stability: string;
    status: string;
    paths: string[];
  }>;
}

export interface BundlesView {
  entries: Array<{
    bundle_id: string;
    title: string;
    status: string;
    public_release: boolean;
    schema_version: string;
    canonicalization_version: string;
    profile_id: string;
    public_check_set_version: string;
    attestation_support: string;
    allowed_check_ids?: string[];
  }>;
}

export interface ViewSources {
  requirements: RequirementsRegistry;
  vocabulary: VocabularyRegistry;
  gates: GatesRegistry;
  manifest: AuthorityManifest;
  publicChecks: PublicChecksView;
  reasonCodes: ReasonCodesView;
  stateInvariants: StateInvariantsView;
  surfaces: SurfacesView;
  bundles: BundlesView;
  /** sha256 hex of a repository-relative source file (LF-normalized). */
  hashOf: (rel: string) => string;
}

function header(sources: string[], hashOf: (rel: string) => string): string {
  return [
    "<!--",
    "GENERATED FILE - DO NOT EDIT.",
    "",
    "Source artifacts:",
    ...sources.map((s) => `- ${s} (sha256:${hashOf(s)})`),
    "",
    "Generation command: pnpm generate",
    "-->",
    "",
  ].join("\n");
}

function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function buildReadme(hashOf: (rel: string) => string): string {
  return [
    header(
      [
        "authority/authority-manifest.yaml",
        "authority/release-1-gates.yaml",
        "registries/requirements.yaml",
        "registries/vocabulary.yaml",
        "registries/public-checks.yaml",
        "registries/reason-codes.yaml",
        "registries/state-invariants.yaml",
        "registries/public-contract-surfaces.yaml",
        "registries/interpretation-bundles.yaml",
      ],
      hashOf,
    ),
    "# Generated Views",
    "",
    "Every file in this directory (including this one) is generated from the",
    "authoritative sources named in its header. These views are",
    "**non-authoritative** conveniences for human readers; when a view and its",
    "source disagree, the source governs and the view is regenerated.",
    "",
    "Never edit these files by hand. Regenerate with `pnpm generate`; CI fails on",
    "drift via `pnpm check:generated`.",
    "",
  ].join("\n");
}

function buildAuthorityIndex(manifest: AuthorityManifest, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["authority/authority-manifest.yaml"], hashOf),
    "# Authority Index",
    "",
    "Non-authoritative view of the authority manifest.",
    "",
    "## Authority by target",
    "",
    "| Target | Description | Authoritative artifacts |",
    "| --- | --- | --- |",
  ];
  for (const target of manifest.targets) {
    const artifacts = target.authoritative_artifacts.map((a) => `\`${a}\``).join(", ");
    lines.push(`| ${cell(target.target_id)} | ${cell(target.description)} | ${artifacts} |`);
  }
  lines.push("", "## Artifact classification", "", "| Path | Class |", "| --- | --- |");
  for (const artifact of manifest.artifacts) {
    lines.push(`| \`${artifact.path}\` | ${artifact.class} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function deriveRequirementApplicability(
  publicChecks: PublicChecksView,
  bundles: BundlesView,
): Map<string, string> {
  const checkToBundles = new Map<string, string[]>();
  for (const bundle of bundles.entries) {
    for (const checkId of bundle.allowed_check_ids ?? []) {
      const list = checkToBundles.get(checkId) ?? [];
      list.push(bundle.bundle_id);
      checkToBundles.set(checkId, list);
    }
  }

  const applicability = new Map<string, string>();
  for (const check of publicChecks.checks) {
    const bundleIds = checkToBundles.get(check.check_id) ?? [];
    for (const reqId of check.requirement_ids ?? []) {
      const bundlePart =
        bundleIds.length > 0 ? ` (${bundleIds.map((b) => `\`${b}\``).join(", ")})` : "";
      const entry = `${check.check_id}${bundlePart}`;
      const existing = applicability.get(reqId);
      applicability.set(reqId, existing === undefined ? entry : `${existing}; ${entry}`);
    }
  }
  return applicability;
}

function buildRequirements(sources: ViewSources): string {
  const registry = sources.requirements;
  const hashOf = sources.hashOf;
  const applicability = deriveRequirementApplicability(sources.publicChecks, sources.bundles);
  const lines: string[] = [
    header(["registries/requirements.yaml"], hashOf),
    "# Requirements Index",
    "",
    "Non-authoritative view of the requirement registry. The normative wording",
    "of each requirement lives at its source link.",
    "",
    `Registry version: ${registry.registry_version} (updated ${registry.updated})`,
    "",
    "| ID | Title | Stability | Status | Testability | Applies to (checks / bundles) | Source |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  ];
  for (const req of registry.requirements) {
    const link = `[${req.document}#${req.anchor}](../${req.document}#${req.anchor})`;
    const applies = applicability.get(req.id) ?? "-";
    lines.push(
      `| ${req.id} | ${cell(req.title)} | ${req.stability} | ${req.status} | ${req.testability} | ${cell(applies)} | ${link} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function buildVocabulary(registry: VocabularyRegistry, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["registries/vocabulary.yaml"], hashOf),
    "# Vocabulary Index",
    "",
    "Non-authoritative view of the vocabulary registry.",
    "",
    `Registry version: ${registry.registry_version} (updated ${registry.updated})`,
    "",
    "| Term | Definition |",
    "| --- | --- |",
  ];
  for (const term of registry.terms) {
    lines.push(`| ${cell(term.term)} | ${cell(term.definition)} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function buildGates(registry: GatesRegistry, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["authority/release-1-gates.yaml"], hashOf),
    "# Release 1 Gates Index",
    "",
    "Non-authoritative view of the Release 1 gate registry. Release 1 requires",
    "every applicable gate to be closed with an explicit decision; there is no",
    "conditional pass.",
    "",
    `Registry version: ${registry.registry_version} (updated ${registry.updated})`,
    "",
    "| Gate | Title | State | Decision | Blocking categories |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const gate of registry.gates) {
    const decision = gate.decision === null ? "-" : gate.decision;
    lines.push(
      `| ${gate.gate_id} | ${cell(gate.title)} | ${gate.state} | ${decision} | ${gate.blocking_categories.join(", ")} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function buildPublicChecks(view: PublicChecksView, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["registries/public-checks.yaml"], hashOf),
    "# Public Checks Index",
    "",
    "Non-authoritative view of the public check registry. Tolerance policy",
    "belongs to check versions and lives only in the registry. Together with",
    "[PROFILE-CAPABILITY-MATRIX.md](PROFILE-CAPABILITY-MATRIX.md), this table",
    "is the published capability matrix and per-check depth analysis required",
    "as evidence for gate R1-01 (verification depth and capability matrix,",
    "authority/release-1-gates.yaml); the Requirement IDs column below is",
    "that gate's third evidence item (mapping from checks to Requirement",
    "IDs). Gate R1-01's fourth evidence item (adversarial review of overclaim",
    "risk in all public wording) is a steward review action this generated",
    "file does not itself perform.",
    "",
    "## Check sets",
    "",
    "| Set version | Checks |",
    "| --- | --- |",
  ];
  for (const set of view.check_sets) {
    lines.push(`| ${set.version} | ${set.check_ids.map((id) => `\`${id}\``).join(", ")} |`);
  }
  lines.push(
    "",
    "## Checks",
    "",
    "| Check | Title | Stability | Scope | Calculation | Consistency | Signature | Claim posture | Depends on | Requirement IDs | Implementation |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  );
  for (const check of view.checks) {
    const depends =
      check.depends_on === undefined ? "-" : check.depends_on.map((id) => `\`${id}\``).join(", ");
    const requirementIds =
      check.requirement_ids === undefined || check.requirement_ids.length === 0
        ? "-"
        : check.requirement_ids.map((id) => `\`${id}\``).join(", ");
    lines.push(
      `| \`${check.check_id}\` | ${cell(check.title)} | ${check.stability} | ${check.scope_kind} | ${check.calculation_evidence} | ${check.consistency_evidence} | ${check.signature_evidence} | ${check.claim_posture} | ${depends} | ${requirementIds} | ${check.implementation_status} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function buildCapabilityMatrix(
  checks: PublicChecksView,
  bundles: BundlesView,
  hashOf: (rel: string) => string,
): string {
  const lines: string[] = [
    header(["registries/public-checks.yaml", "registries/interpretation-bundles.yaml"], hashOf),
    "# Profile Capability Matrix",
    "",
    "Non-authoritative view of what each check establishes, per bundle. No",
    "check asserts scientific validity, declaration truth, or a standardized",
    "effect size; there is no overall status.",
    "",
  ];
  for (const bundle of bundles.entries) {
    const boundary = bundle.bundle_id.includes(":itgc-guarantee:")
      ? "scientific_validity, declaration_truth, distributional_model_validity, causal_interpretation, standardized_effect_size: all not_asserted"
      : "scientific_validity: not_asserted";
    lines.push(
      `## \`${bundle.bundle_id}\``,
      "",
      `Guarantee boundary: ${boundary}.`,
      "",
      "| Check | Scope | Conformance | Consistency | Recomputation | Signature | Claim posture |",
      "| --- | --- | --- | --- | --- | --- | --- |",
    );
    const allowed = new Set(
      checks.check_sets.find((s) => s.version === bundle.public_check_set_version)?.check_ids ?? [],
    );
    for (const check of checks.checks.filter((c) => allowed.has(c.check_id))) {
      const isConformance = check.check_id.includes(":record-conformance:");
      lines.push(
        `| \`${check.check_id}\` | ${check.scope_kind} | ${isConformance ? "judged" : "required precondition"} | ${check.consistency_evidence} | ${check.calculation_evidence} | ${check.signature_evidence} | ${check.claim_posture} |`,
      );
    }
    lines.push("");
  }
  return lines.join("\n");
}

function buildReasonCodes(view: ReasonCodesView, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["registries/reason-codes.yaml"], hashOf),
    "# Reason Codes Index",
    "",
    "Non-authoritative view of the reason code registry.",
    "",
    "| Code | Title | Category | Stability |",
    "| --- | --- | --- | --- |",
  ];
  for (const code of view.codes) {
    lines.push(`| ${code.id} | ${cell(code.title)} | ${code.category} | ${code.stability} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function buildStateInvariants(view: StateInvariantsView, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["registries/state-invariants.yaml"], hashOf),
    "# State Invariants Index",
    "",
    "Non-authoritative view of the state invariant registry.",
    "",
    "| Invariant | Title | Scope | Stability | Machine testable | Failure reason code |",
    "| --- | --- | --- | --- | --- | --- |",
  ];
  for (const invariant of view.invariants) {
    lines.push(
      `| ${invariant.invariant_id} | ${cell(invariant.title)} | ${invariant.scope} | ${invariant.stability} | ${invariant.machine_testable ? "yes" : "no"} | ${invariant.failure_reason_code ?? "-"} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function buildSurfaces(view: SurfacesView, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["registries/public-contract-surfaces.yaml"], hashOf),
    "# Public Contract Surfaces Index",
    "",
    "Non-authoritative view of the public contract surface registry. Phase 1",
    "surfaces are candidates; none is frozen.",
    "",
    "| Surface | Title | Stability | Status | Paths |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const entry of view.entries) {
    const paths = entry.paths.map((p) => `\`${p}\``).join(", ");
    lines.push(
      `| ${entry.surface_id} | ${cell(entry.title)} | ${entry.stability} | ${entry.status} | ${paths} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function buildBundles(view: BundlesView, hashOf: (rel: string) => string): string {
  const lines: string[] = [
    header(["registries/interpretation-bundles.yaml"], hashOf),
    "# Interpretation Bundles Index",
    "",
    "Non-authoritative view of the interpretation bundle registry. Unsupported",
    "combinations fail closed.",
    "",
    "| Bundle | Title | Status | Public release | Schema | Canonicalization | Profile | Check set | Attestation |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ];
  for (const entry of view.entries) {
    lines.push(
      `| \`${entry.bundle_id}\` | ${cell(entry.title)} | ${entry.status} | ${entry.public_release ? "yes" : "no"} | ${entry.schema_version} | \`${entry.canonicalization_version}\` | \`${entry.profile_id}\` | ${entry.public_check_set_version} | ${entry.attestation_support} |`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

/** Map of repository-relative path to generated content. */
export function buildGeneratedViews(sources: ViewSources): Map<string, string> {
  const { hashOf } = sources;
  return new Map<string, string>([
    ["generated/README.md", buildReadme(hashOf)],
    ["generated/AUTHORITY-INDEX.md", buildAuthorityIndex(sources.manifest, hashOf)],
    ["generated/REQUIREMENTS.md", buildRequirements(sources)],
    ["generated/VOCABULARY.md", buildVocabulary(sources.vocabulary, hashOf)],
    ["generated/RELEASE-1-GATES.md", buildGates(sources.gates, hashOf)],
    ["generated/PUBLIC-CHECKS.md", buildPublicChecks(sources.publicChecks, hashOf)],
    ["generated/REASON-CODES.md", buildReasonCodes(sources.reasonCodes, hashOf)],
    ["generated/STATE-INVARIANTS.md", buildStateInvariants(sources.stateInvariants, hashOf)],
    ["generated/PUBLIC-CONTRACT-SURFACES.md", buildSurfaces(sources.surfaces, hashOf)],
    ["generated/INTERPRETATION-BUNDLES.md", buildBundles(sources.bundles, hashOf)],
    [
      "generated/PROFILE-CAPABILITY-MATRIX.md",
      buildCapabilityMatrix(sources.publicChecks, sources.bundles, hashOf),
    ],
  ]);
}
