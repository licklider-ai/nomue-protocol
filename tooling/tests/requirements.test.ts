import { describe, expect, it } from "vitest";
import { checkRequirementTraceability } from "../src/lib/checks.js";
import { loadRequirements, loadStabilityTiers } from "../src/lib/load.js";
import { markdownFiles, readText } from "../src/lib/repo.js";

const range = (prefix: string, from: number, to: number): string[] =>
  Array.from({ length: to - from + 1 }, (_, i) => `${prefix}-${String(from + i).padStart(4, "0")}`);

const PHASE0_IDS = [
  ...range("NRS-GOV", 1, 7),
  ...range("NRS-CORE", 1, 2),
  ...range("NRS-VERIFY", 1, 4),
  "NRS-SEC-0001",
  ...range("NRS-VERSION", 1, 2),
];

const PHASE1_IDS = [
  ...range("NRS-CORE", 3, 8),
  ...range("NRS-CANON", 1, 6),
  ...range("NRS-VERSION", 3, 4),
  ...range("NRS-PROFILE-ITGC", 1, 14),
  ...range("NRS-VERIFY", 5, 12),
  ...range("NRS-SEC", 2, 3),
];

const PHASE2A_IDS = [
  ...range("NRS-CORE", 9, 11),
  // NRS-CANON-0007/0008 arrived with the ADR-0018 strict-JCS-input repair.
  ...range("NRS-CANON", 7, 8),
  // NRS-VERSION-0007/0008 arrived with the ADR-0017 routing repair.
  ...range("NRS-VERSION", 5, 8),
  ...range("NRS-PROFILE-ITGC", 15, 26),
  ...range("NRS-VERIFY", 13, 18),
  ...range("NRS-SEC", 4, 5),
  // NRS-SEC-0006 (in-process time/memory bounds) arrived with ADR-0022.
  "NRS-SEC-0006",
  // Phase 2A hardening: relying-party interface (spec R1-13), the minimal
  // intra/extra-Record provenance model, and indeterminate-is-not-pass (0028).
  ...range("NRS-VERIFY", 22, 24),
  "NRS-VERIFY-0028",
  ...range("NRS-PROV", 1, 2),
  // Batch 2 U1: exit-code contract, also relying-party interface / R1-13.
  "NRS-VERIFY-0025",
  // Batch 2 U3: emitter conformance minimal set.
  "NRS-EMIT-0001",
];

/** Withdrawn digest requirements kept as tombstones (introduced_in unchanged). */
const WITHDRAWN_DIGEST_IDS = ["NRS-CANON-0002", "NRS-EMIT-0002"];

/** ADR-0029 digest-domain-separation-repair successors. */
const DIGEST_DOMAIN_SEPARATION_REPAIR_IDS = ["NRS-CANON-0022", "NRS-EMIT-0004"];

const NUMERICAL_CONTRACT_IDS = [
  ...range("NRS-CANON", 9, 11),
  "NRS-CORE-0012",
  ...range("NRS-VERIFY", 19, 21),
  "NRS-VERSION-0009",
];

// Attestation first increment (DRAFT, EXPERIMENTAL): introduced_in
// "phase-2a-attestation-draft", not "phase-2a", so kept as its own group.
const ATTESTATION_DRAFT_IDS = [...range("NRS-ATTEST", 1, 5)];

// Batch 4 ratified signature-infrastructure decisions: introduced_in
// "sig-infra-decisions" (ADR-0026, trust root, no-revocation, LTV).
const SIG_INFRA_IDS = [...range("NRS-ATTEST", 6, 11)];

// Batch 5 ratified canonicalization/input hardening (E1'-E5', ADR-0027):
// introduced_in "canonicalization-hardening".
const CANON_HARDENING_IDS = [
  ...range("NRS-CANON", 14, 21),
  "NRS-CANON-0023",
  "NRS-VERIFY-0027",
  "NRS-EMIT-0003",
];

// Approval first increment (DRAFT, EXPERIMENTAL): introduced_in
// "phase-2a-approval-draft", not "phase-2a", so kept as its own group.
const APPROVAL_DRAFT_IDS = range("NRS-APPROVE", 1, 4);

// Batch 3 S1 close: the t^2-overflow safety requirement and the decimal
// oracle reference layer, introduced_in "s1-close" (ADR-0025).
const S1_CLOSE_IDS = ["NRS-VERIFY-0026", ...range("NRS-CANON", 12, 13)];

// Batch 6 record lifecycle v0 (ADR-0028): mixed placement per ruling -
// intents CORE, axis/grammar/format STABLE-INTENT, notice EXPERIMENTAL.
const LIFECYCLE_IDS = [...range("NRS-CORE", 13, 19)];
const LIFECYCLE_STABILITY: Record<string, string> = {
  "NRS-CORE-0013": "CORE",
  "NRS-CORE-0014": "CORE",
  "NRS-CORE-0015": "CORE",
  "NRS-CORE-0016": "STABLE-INTENT",
  "NRS-CORE-0017": "STABLE-INTENT",
  "NRS-CORE-0018": "STABLE-INTENT",
  "NRS-CORE-0019": "EXPERIMENTAL",
};

const NAMESPACES = [
  "NRS-GOV",
  "NRS-CORE",
  "NRS-VERIFY",
  "NRS-CANON",
  "NRS-ATTEST",
  "NRS-EXT",
  "NRS-SEC",
  "NRS-VERSION",
  "NRS-INTEROP",
  "NRS-PROV",
  "NRS-EMIT",
  "NRS-APPROVE",
  "NRS-PROFILE-ITGC",
];

/** All normative document trees (spec/ and canonicalization/). */
const normativeDocs = (): Map<string, string> =>
  new Map(
    [...markdownFiles("spec"), ...markdownFiles("canonicalization")].map((rel) => [
      rel,
      readText(rel),
    ]),
  );

describe("requirement registry (Phase 0 + Phase 1)", () => {
  const registry = loadRequirements();

  it("contains exactly the 138 registered requirements, no duplicates", () => {
    const ids = registry.requirements.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(
      [
        ...PHASE0_IDS,
        ...PHASE1_IDS,
        ...PHASE2A_IDS,
        ...WITHDRAWN_DIGEST_IDS.filter((id) => !PHASE1_IDS.includes(id)),
        ...NUMERICAL_CONTRACT_IDS,
        ...ATTESTATION_DRAFT_IDS,
        ...APPROVAL_DRAFT_IDS,
        ...S1_CLOSE_IDS,
        ...SIG_INFRA_IDS,
        ...CANON_HARDENING_IDS,
        ...LIFECYCLE_IDS,
        ...DIGEST_DOMAIN_SEPARATION_REPAIR_IDS,
      ].sort(),
    );
    expect(ids).toHaveLength(139);
  });

  it("reserves all thirteen namespaces", () => {
    expect(registry.namespaces.map((n) => n.prefix)).toEqual(NAMESPACES);
  });

  it("stamps the attestation first increment as phase-2a-attestation-draft, all EXPERIMENTAL", () => {
    const attest = registry.requirements.filter((r) => ATTESTATION_DRAFT_IDS.includes(r.id));
    expect(attest).toHaveLength(5);
    for (const req of attest) {
      expect(req.introduced_in, req.id).toBe("phase-2a-attestation-draft");
      expect(req.status, req.id).toBe("active");
      expect(req.stability, req.id).toBe("EXPERIMENTAL");
    }
  });

  it("stamps the signature-infrastructure decisions as sig-infra-decisions, all EXPERIMENTAL", () => {
    const sigInfra = registry.requirements.filter((r) => SIG_INFRA_IDS.includes(r.id));
    expect(sigInfra).toHaveLength(6);
    for (const req of sigInfra) {
      expect(req.introduced_in, req.id).toBe("sig-infra-decisions");
      expect(req.status, req.id).toBe("active");
      expect(req.stability, req.id).toBe("EXPERIMENTAL");
    }
  });

  it("stamps the record-lifecycle requirements with the ruled mixed placement", () => {
    const lifecycle = registry.requirements.filter((r) => LIFECYCLE_IDS.includes(r.id));
    expect(lifecycle).toHaveLength(7);
    for (const req of lifecycle) {
      expect(req.introduced_in, req.id).toBe("record-lifecycle-v0");
      expect(req.status, req.id).toBe("active");
      expect(req.stability, req.id).toBe(LIFECYCLE_STABILITY[req.id]);
    }
  });

  it("stamps the canonicalization-hardening requirements, all EXPERIMENTAL", () => {
    const hardening = registry.requirements.filter((r) => CANON_HARDENING_IDS.includes(r.id));
    expect(hardening).toHaveLength(11);
    for (const req of hardening) {
      expect(req.introduced_in, req.id).toBe("canonicalization-hardening");
      expect(req.status, req.id).toBe("active");
      expect(req.stability, req.id).toBe("EXPERIMENTAL");
    }
  });

  it("stamps the S1-close requirements as s1-close, all EXPERIMENTAL", () => {
    const s1 = registry.requirements.filter((r) => S1_CLOSE_IDS.includes(r.id));
    expect(s1).toHaveLength(3);
    for (const req of s1) {
      expect(req.introduced_in, req.id).toBe("s1-close");
      expect(req.status, req.id).toBe("active");
      expect(req.stability, req.id).toBe("EXPERIMENTAL");
    }
  });

  it("keeps every Phase 0 requirement active and CORE", () => {
    for (const id of PHASE0_IDS) {
      const req = registry.requirements.find((r) => r.id === id);
      expect(req, id).toBeDefined();
      expect(req?.status, id).toBe("active");
      expect(req?.stability, id).toBe("CORE");
      expect(req?.introduced_in, id).toBe("phase-0");
    }
  });

  it("stamps every Phase 1 requirement as phase-1 with the declared stability mix", () => {
    const phase1 = registry.requirements.filter((r) => PHASE1_IDS.includes(r.id));
    expect(phase1).toHaveLength(38);
    const byStability = new Map<string, number>();
    for (const req of phase1) {
      expect(req.introduced_in, req.id).toBe("phase-1");
      if (req.status === "withdrawn") continue;
      expect(req.status, req.id).toBe("active");
      byStability.set(req.stability, (byStability.get(req.stability) ?? 0) + 1);
    }
    expect(byStability.get("CORE")).toBe(9);
    expect(byStability.get("STABLE-INTENT")).toBe(18);
    expect(byStability.get("EXPERIMENTAL")).toBe(10);
  });

  it("stamps numerical-contract requirements as numerical-contract-0.2.1", () => {
    const nc = registry.requirements.filter((r) => NUMERICAL_CONTRACT_IDS.includes(r.id));
    expect(nc).toHaveLength(8);
    for (const req of nc) {
      expect(req.introduced_in, req.id).toBe("numerical-contract-0.2.1");
      expect(req.status, req.id).toBe("active");
    }
  });

  it("stamps approval-draft requirements as phase-2a-approval-draft, all EXPERIMENTAL", () => {
    const approval = registry.requirements.filter((r) => APPROVAL_DRAFT_IDS.includes(r.id));
    expect(approval).toHaveLength(4);
    for (const req of approval) {
      expect(req.introduced_in, req.id).toBe("phase-2a-approval-draft");
      expect(req.status, req.id).toBe("active");
      expect(req.stability, req.id).toBe("EXPERIMENTAL");
    }
  });

  it("stamps every Phase 2A requirement as phase-2a with the declared stability mix", () => {
    const phase2a = registry.requirements.filter((r) => PHASE2A_IDS.includes(r.id));
    expect(phase2a).toHaveLength(38);
    const byStability = new Map<string, number>();
    for (const req of phase2a) {
      expect(req.introduced_in, req.id).toBe("phase-2a");
      expect(req.status, req.id).toBe("active");
      byStability.set(req.stability, (byStability.get(req.stability) ?? 0) + 1);
    }
    // ADR-0017 added NRS-VERSION-0007 (CORE) and NRS-VERSION-0008
    // (STABLE-INTENT), ADR-0018 added NRS-CANON-0007/0008 (both CORE), the
    // relying-party interface / provenance model hardening added
    // NRS-VERIFY-0022..0024 and NRS-PROV-0001/0002 (all EXPERIMENTAL),
    // NRS-VERIFY-0028 (indeterminate-is-not-pass, EXPERIMENTAL),
    // ADR-0022 plus Batch 2 U1 added NRS-SEC-0006 and NRS-VERIFY-0025 (both
    // EXPERIMENTAL), and Batch 2 U3 added NRS-EMIT-0001 (EXPERIMENTAL), to
    // the original 7/11/7 Phase 2A mix. NRS-EMIT-0002 was withdrawn by
    // ADR-0029 and is no longer counted among active Phase 2A requirements.
    expect(byStability.get("CORE")).toBe(10);
    expect(byStability.get("STABLE-INTENT")).toBe(12);
    expect(byStability.get("EXPERIMENTAL")).toBe(16);
  });

  it("keeps field-level ITGC surface below CORE stability except explicit non-claims", () => {
    for (const req of registry.requirements.filter((r) => r.id.startsWith("NRS-PROFILE-ITGC"))) {
      if (req.id === "NRS-PROFILE-ITGC-0026") continue; // non-claim, deliberately CORE
      expect(req.stability, req.id).not.toBe("CORE");
    }
  });

  it("records ADR-0029 digest repair supersession without ID reuse", () => {
    for (const id of WITHDRAWN_DIGEST_IDS) {
      const req = registry.requirements.find((r) => r.id === id);
      expect(req, id).toBeDefined();
      expect(req?.status, id).toBe("withdrawn");
    }
    expect(registry.requirements.find((r) => r.id === "NRS-CANON-0002")?.superseded_by).toBe(
      "NRS-CANON-0022",
    );
    expect(registry.requirements.find((r) => r.id === "NRS-EMIT-0002")?.superseded_by).toBe(
      "NRS-EMIT-0004",
    );
    for (const id of DIGEST_DOMAIN_SEPARATION_REPAIR_IDS) {
      const req = registry.requirements.find((r) => r.id === id);
      expect(req, id).toBeDefined();
      expect(req?.status, id).toBe("active");
      expect(req?.stability, id).toBe("EXPERIMENTAL");
      expect(req?.introduced_in, id).toBe("digest-domain-separation-repair");
    }
    expect(registry.requirements.find((r) => r.id === "NRS-CANON-0022")?.supersedes).toBe(
      "NRS-CANON-0002",
    );
    expect(registry.requirements.find((r) => r.id === "NRS-EMIT-0004")?.supersedes).toBe(
      "NRS-EMIT-0002",
    );
    const activeIds = registry.requirements.filter((r) => r.status === "active").map((r) => r.id);
    for (const id of WITHDRAWN_DIGEST_IDS) {
      expect(activeIds, id).not.toContain(id);
    }
  });

  it("keeps identifiers immutable except the ADR-0029 digest repair chain", () => {
    for (const req of registry.requirements) {
      if (
        WITHDRAWN_DIGEST_IDS.includes(req.id) ||
        DIGEST_DOMAIN_SEPARATION_REPAIR_IDS.includes(req.id)
      ) {
        continue;
      }
      expect(req.supersedes, req.id).toBeNull();
      expect(req.superseded_by, req.id).toBeNull();
    }
  });
});

describe("requirement traceability", () => {
  it("resolves every requirement to exactly one anchor and back, zero orphans", () => {
    expect(checkRequirementTraceability(loadRequirements(), normativeDocs())).toEqual([]);
  });

  it("detects an orphan registry entry", () => {
    const registry = loadRequirements();
    const first = registry.requirements[0];
    if (first === undefined) throw new Error("empty registry");
    first.anchor = "NRS-GOV-0999";
    first.id = "NRS-GOV-0999";
    const issues = checkRequirementTraceability(registry, normativeDocs());
    expect(issues.some((i) => i.message.includes("orphan requirement"))).toBe(true);
    expect(issues.some((i) => i.message.includes("orphan anchor NRS-GOV-0001"))).toBe(true);
  });

  it("detects an anchor placed in the wrong document", () => {
    const registry = loadRequirements();
    const first = registry.requirements[0];
    if (first === undefined) throw new Error("empty registry");
    first.document = "spec/core/layer-boundary.md";
    const issues = checkRequirementTraceability(registry, normativeDocs());
    expect(issues.some((i) => i.message.includes("registry places it in"))).toBe(true);
  });
});

describe("stability tiers", () => {
  it("defines the three tiers with the chartered discussion windows", () => {
    const tiers = loadStabilityTiers().tiers;
    const days = new Map(tiers.map((t) => [t.tier, t.rfc_min_discussion_days]));
    expect(days.get("CORE")).toBe(60);
    expect(days.get("STABLE-INTENT")).toBe(30);
    expect(days.get("EXPERIMENTAL")).toBe(7);
    expect(tiers).toHaveLength(3);
  });
});
