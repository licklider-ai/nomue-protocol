# FND-1 Claude Code Repository-Analysis Result

## 0. Pass metadata

| Item                                                           | Response                                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Package                                                        | `FND-1`                                                                                                                                                 |
| Pass                                                           | Claude Code repository analysis (one of two isolated passes)                                                                                            |
| Investigator or model                                          | Claude Code (session model identifier `claude-fable-5`)                                                                                                 |
| Investigation date                                             | 2026-08-30                                                                                                                                              |
| Knowledge or source cutoff                                     | Model training cutoff January 2026; not used as evidence (see Section 1.2)                                                                              |
| Instruction path and commit                                    | `evidence/research/foundation-identity/fnd-1/2026-08-30-claude-code-repository-analysis-prompt.md` at commit `28165f97d0d30ac6832f783839ba89514a3d522c` |
| Corpus path and version                                        | `evidence/research/foundation-identity/2026-08-30-counterexample-corpus-v1.md`, Version 1                                                               |
| Template path and version                                      | `evidence/research/foundation-identity/2026-08-30-common-response-template-v1.md`, Version 1.0                                                          |
| Reviewer branch                                                | `review/fnd-1-repo-analysis-20260830`, created from the commit above                                                                                    |
| Web and repository access                                      | Repository: `AVAILABLE`. External web: `UNAVAILABLE` (egress allowlist; every attempted publisher refused, Section 3)                                   |
| Other FND result viewed                                        | `NO`                                                                                                                                                    |
| Earlier nomue conclusions, v2, or adjudication material viewed | `NO`, with one disclosed partial exposure (Section 1.2)                                                                                                 |

This pass is the repository-analysis half of the FND-1 dual-pass commission. It
does not claim to complete the external primary-source basis assigned to the
independent primary-source pass, and none of its conclusions is a Protocol
adoption, schema, identifier, or release decision.

## 1. Input, access, and independence checks

### 1.1 Input completeness

- Decision: `INPUT_COMPLETE`
- Repository commit investigated: `28165f97d0d30ac6832f783839ba89514a3d522c`
- Files received and read (the four commission inputs, in order):
  1. `fnd-1/2026-08-30-claude-code-repository-analysis-prompt.md`
  2. `fnd-1/README.md` (including the preserved FND-1 scientific question set)
  3. `../2026-08-30-counterexample-corpus-v1.md`
  4. `../2026-08-30-common-response-template-v1.md`
- Missing or unreadable files: none.
- Assigned case IDs: `FND1-01` through `FND1-12`, plus two investigator-created
  cases (`FND1-X1`, `FND1-X2` below).
- Can all explicit exclusions be honored: `YES` (with the one disclosed
  exposure below).

### 1.2 Independence

- No other model's answer used as evidence: confirmed.
- No nomue candidate conclusion assumed: confirmed; the four-relation
  vocabulary and candidate attributes are treated as falsifiable hypotheses.
- No search snippet, blog, or generated answer used as a primary basis:
  confirmed. No external publisher was reachable, and no training-memory
  reconstruction of any external source is promoted to a fact; all external
  semantic claims are marked `NOT_VERIFIABLE`.
- Excluded material not read: `fnd-1/2026-08-30-genspark-primary-source-prompt.md`,
  `fnd-1/2026-08-30-genspark-primary-source-result.md`,
  `fnd-1/2026-08-30-independent-research-result.md`, everything under `fnd-2/`,
  every `review/*` branch other than this pass's own branch,
  `governance/drafts/release-2-*` (directory and files), and the paired-t and
  t-family numerical-contract tooling directories (`tooling/r2-paired-t-*`,
  `governance/drafts/p1a-paired-t-l1-design.md`).
- Unavoidable exposure, disclosed: `spec/profiles/README.md` was opened as part
  of the required profile-surface inventory and turned out to embed the
  informative "P1-A paired and rank-based inference" Research Gate handoff,
  which includes a paired-t successor-direction subsection. No content from
  that file is used as evidence in this report. Source `REPO-19` is retained
  only to record the exposure and its exclusion from the evidence basis.
- Automatically supplied context: the commissioning system notice restated the
  commission operationally; it contained no result content from either pass.

## 2. Executive verdict

### 2.1 Research disposition

**Selection:** `NARROW`

**One-paragraph rationale:** The repository investigation supports the core
FND-1 direction — the nomue repository already distinguishes method identity,
estimand declaration, check-version-owned supported semantics, and
implementation identity as separate things, already fails closed on unsupported
estimand, alternative, and method declarations, and already refuses
diagnostic-driven method switching — so the candidate concepts have real,
non-colliding landing surfaces. But three findings force narrowing rather than
plain advancement: (1) the provisional four-relation taxonomy is not sufficient
as a single-axis vocabulary — several corpus cases (FND1-02, FND1-08, FND1-09)
have a clean answer only when estimand identity, inference-procedure identity,
guarantee-family identity, and admissibility status are separated into distinct
axes, and the boundary between `parallel_not_combinable` and `not_comparable`
is under-specified; (2) two candidate hypotheses (H1, H2) hold only in
corrected narrow forms; and (3) every external primary-source semantic claim
(ICH E9(R1), FDA multiple-endpoints guidance, Holm, Benjamini–Hochberg,
Dunnett, Tukey, ASA p-value statement) is `NOT_VERIFIABLE` in this pass because
the execution environment's egress allowlist blocked every publisher, so
nothing in this report may be read as confirming external-source content. The
repository findings stand on their own scope; the external basis belongs to the
primary-source pass.

**Protocol adoption:** `NO`

### 2.2 Conclusion summary

| Item                         | Conclusion                                                                                                             | Confidence | Principal evidence             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------ |
| Core hypotheses              | H1, H2 hold only in narrowed forms; H3 supported logically, externally unverified; H5 untestable this pass             | MEDIUM     | CLM-10, CLM-11, CLM-12, CLM-15 |
| Candidate taxonomy           | Not sufficient as one axis; needs `unresolved` plus a multi-axis decomposition                                         | HIGH       | Cases FND1-02/-08/-09; CLM-20  |
| Minimum candidate attributes | All ten candidate groups earn a role; several are conditional; bearer split (Record vs check version) must be explicit | MEDIUM     | Section 7.1; CLM-01, CLM-02    |
| Strongest counterexample     | FND1-08/FND1-09: same estimand, different hypothesis or protected family, breaks single-axis classification            | HIGH       | Section 6                      |
| Largest unresolved issue     | Entire external primary-source basis `NOT_VERIFIABLE`; awaits the independent primary-source pass                      | HIGH       | Section 3, HOLD-01             |

## 3. Research method and access record

### 3.1 Repository operation

1. Verified checkout at commit `28165f97d0d30ac6832f783839ba89514a3d522c` on
   the reviewer-owned branch `review/fnd-1-repo-analysis-20260830` (created
   from exactly that commit; no work on `main`).
2. Read repository `AGENTS.md` and the governance files it requires
   (`CHARTER.md`, `AUTHORITY.md`, `authority/authority-manifest.yaml`,
   `registries/requirements.yaml`, `governance/ID-POLICY.md`,
   `governance/RFC.md`), then the four commission inputs, before broader
   inspection.
3. Performed mechanical searches (`rg`) across the working tree with the
   commissioned exclusions expressed as glob filters
   (`!evidence/research/**` results other than the four inputs,
   `!governance/drafts/release-2-*`, `!governance/drafts/p1a-paired-t-*`,
   `!tooling/r2-paired-t-*`, `!node_modules`), for at least these terms:
   `estimand`, `multiplicity`, `FWER`, `FDR`, `hypothesis famil*`,
   `familywise`, `analysis_population`, `analysis set`, `routing`,
   `sensitivity`, `aligned`, `not_comparable`, `parallel_not_combinable`,
   `inadmissible_or_unsupported`, `alternative`, `two_sided`, `one_sided`,
   `unit`, `ng/mL`, `transformation`, `provenance`, `fixed before`,
   `prespecif*`/`pre-specif*`, `preregistration`.
4. Read, in full or in the relevant part, the surfaces listed in Section 4,
   recording exact paths, anchors, requirement IDs, registry keys, and
   versions.
5. Wrote only this assigned result file; no other file was modified.

### 3.2 External access record (all failed)

Outbound HTTPS from this environment passes through an egress allowlist
(GitHub git reads and package registries). Each attempted primary-source
retrieval below failed identically with a proxy-level refusal
(`curl: (56) CONNECT tunnel failed, response 403`, effective HTTP code `000`),
attempted on 2026-08-30 with `curl -L --max-time 20`:

| Attempted source                                    | URL attempted                                                                      | Result      |
| --------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| ICH E9(R1) Step 4 guideline PDF                     | `https://database.ich.org/sites/default/files/E9-R1_Step4_Guideline_2019_1203.pdf` | CONNECT 403 |
| FDA guidance, Multiple Endpoints in Clinical Trials | `https://www.fda.gov/media/102657/download`                                        | CONNECT 403 |
| Benjamini and Hochberg (1995), JRSS-B DOI           | `https://doi.org/10.1111/j.2517-6161.1995.tb02031.x`                               | CONNECT 403 |
| Holm (1979), Scand. J. Statist. (JSTOR)             | `https://www.jstor.org/stable/4615733`                                             | CONNECT 403 |
| ASA Statement on p-Values (2016), DOI               | `https://doi.org/10.1080/00031305.2016.1154108`                                    | CONNECT 403 |
| Dunnett (1955), JASA DOI                            | `https://doi.org/10.1080/01621459.1955.10501294`                                   | CONNECT 403 |
| Tukey (1949), Biometrics (DOI 10.2307/3001913)      | `https://doi.org/10.2307/3001913`                                                  | CONNECT 403 |

Per the commission, these failures are not a stop condition. Every claim that
would rest on the content of these texts is marked `NOT_VERIFIABLE`, and no
abstract, snippet, secondary account, or training-memory reconstruction is
substituted. In-repository citations of external standards (for example the
WRROC/BCO comparison) are used only as repo-observed facts about what the
repository asserts, never as independent verification of the external text.

### 3.3 Evidence hierarchy used

- `REPO_VERIFIED`: read directly from the repository working tree at the
  investigated commit, with exact path/anchor.
- `LOGICAL_DERIVATION`: value-independent reasoning from explicit declarations
  in the commission inputs or repository artifacts.
- `EXTERNAL_PRIMARY_VERIFIED`: none in this pass (no external text reachable).
- `POSSIBLE_PROJECT_CONVENTION`: a convention this project might adopt; never
  presented as community consensus.
- `NOT_VERIFIABLE`: would require an uninspected external primary text.

## 4. Source and repository register

| Source ID | Citation or path                                                             | Type                    | Version or date                                  | Access                        | Pinpoint                                                                                                                                  | Claim use                           |
| --------- | ---------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| REPO-01   | `CHARTER.md`                                                                 | Repo authoritative      | commit `28165f9…`                                | VERIFIED                      | Scope, Non-claims, Initial statistical profile                                                                                            | CLM-06, CLM-18                      |
| REPO-02   | `AUTHORITY.md`                                                               | Repo authoritative      | commit `28165f9…`                                | VERIFIED                      | Artifact classes; Conflict policy; Change coupling                                                                                        | CLM-18                              |
| REPO-03   | `authority/authority-manifest.yaml`                                          | Repo authoritative      | commit `28165f9…`                                | VERIFIED                      | 20 `target_id` entries (`mission-scope-non-goals` … `release-decision`)                                                                   | CLM-18                              |
| REPO-04   | `governance/RFC.md`                                                          | Repo governance         | commit `28165f9…`                                | VERIFIED                      | Research gate; shared-foundation queue lines 119–139                                                                                      | CLM-05, CLM-18                      |
| REPO-05   | `governance/ID-POLICY.md`                                                    | Repo governance         | commit `28165f9…`                                | VERIFIED                      | Namespaces; `NRS-CONTRACT-<TOKEN>` grammar; rules 1–6                                                                                     | CLM-18                              |
| REPO-06   | `registries/vocabulary.yaml`                                                 | Repo registry           | registry_version 0.1.0, updated 2026-08-18       | VERIFIED                      | Terms `Contract`, `Analysis Contract`, `Profile`, `Workflow`, `Analysis DAG`, `not asserted`                                              | CLM-19                              |
| REPO-07   | `registries/requirements.yaml`                                               | Repo registry           | commit `28165f9…`                                | VERIFIED                      | `namespaces:` block lines 10–43; searched full file                                                                                       | CLM-05                              |
| REPO-08   | `registries/public-checks.yaml`                                              | Repo registry           | commit `28165f9…`                                | VERIFIED                      | `welch-recompute:0.2.0-draft.1` `comparison_constants` lines 338–341; 0.2.1 lines 442–445                                                 | CLM-02                              |
| REPO-09   | `registries/reason-codes.yaml`                                               | Repo registry           | commit `28165f9…`                                | VERIFIED                      | 55 `- id:` entries; `NRS-UNSUPPORTED-ESTIMAND` line 612; `NRS-UNSUPPORTED-ALTERNATIVE` line 360; `NRS-CONFIDENCE-LEVEL-MISMATCH` line 633 | CLM-03, CLM-04                      |
| REPO-10   | `registries/interpretation-bundles.yaml`                                     | Repo registry           | registry_version 0.6.0, updated 2026-08-19       | VERIFIED                      | `verifier_output_contract`; `entry_order_semantics: none`                                                                                 | CLM-08, CLM-18                      |
| REPO-11   | `schemas/profiles/itgc-guarantee-0.2.schema.json`                            | Repo schema             | commit `28165f9…`                                | VERIFIED                      | `$defs/analysis/properties/estimand`; `$defs/outcome`; `alternative`                                                                      | CLM-01, CLM-06, CLM-07              |
| REPO-12   | `spec/profiles/independent-two-group-continuous/admissibility.md`            | Repo normative spec     | commit `28165f9…`                                | VERIFIED                      | NRS-PROFILE-ITGC-0019…0025; supported-values table lines 49–58                                                                            | CLM-03, CLM-07                      |
| REPO-13   | `spec/profiles/independent-two-group-continuous/effect-estimate.md`          | Repo normative spec     | commit `28165f9…`                                | VERIFIED                      | NRS-PROFILE-ITGC-0015, -0026                                                                                                              | CLM-01, CLM-10                      |
| REPO-14   | `spec/profiles/independent-two-group-continuous/phase-1-minimal-profile.md`  | Repo normative spec     | commit `28165f9…`                                | VERIFIED                      | NRS-PROFILE-ITGC-0006, -0007, -0012, -0013                                                                                                | CLM-04, CLM-11                      |
| REPO-15   | `spec/profiles/independent-two-group-continuous/non-claims.md`               | Repo normative spec     | commit `28165f9…`                                | VERIFIED                      | NRS-CORE-0009; `guarantee_boundary` note                                                                                                  | CLM-17, Section 7                   |
| REPO-16   | `spec/core/provenance-model.md`                                              | Repo normative spec     | commit `28165f9…`                                | VERIFIED                      | NRS-PROV-0001, NRS-PROV-0002                                                                                                              | CLM-12, CLM-11                      |
| REPO-17   | `spec/versioning/README.md`                                                  | Repo informative spec   | commit `28165f9…`                                | VERIFIED                      | "Version identity model" list (semantic vs representation vs implementation identity)                                                     | CLM-12                              |
| REPO-18   | `mappings/README.md`                                                         | Repo informative        | commit `28165f9…`                                | VERIFIED                      | Mapping discipline bullet list                                                                                                            | CLM-13                              |
| REPO-19   | `spec/profiles/README.md`                                                    | Repo informative        | commit `28165f9…`                                | VERIFIED (exposure disclosed) | "Cross-method decisions"; "Profile placement"; Hodges–Lehmann estimand note line 174                                                      | Exposure only; not used as evidence |
| REPO-20   | `comparison/nomue-vs-wrroc-vs-bco.md`                                        | Repo informative        | rechecked 2026-08-20 (in-doc); commit `28165f9…` | VERIFIED                      | Estimand rows lines 58, 79; source-and-validation boundary                                                                                | CLM-14                              |
| REPO-21   | `AGENTS.md`                                                                  | Repo instructions       | commit `28165f9…`                                | VERIFIED                      | Hard rule: tolerances/level/estimand owned by check versions                                                                              | CLM-02, CLM-18                      |
| REPO-22   | `spec/verification/` file set and `conformance/manifest.yaml` routing family | Repo spec + conformance | commit `28165f9…`                                | VERIFIED                      | `family: routing` (manifest line 2570); routing-refusal cases                                                                             | CLM-08                              |
| IN-01     | `fnd-1/2026-08-30-claude-code-repository-analysis-prompt.md`                 | Commission input        | commit `28165f9…`                                | VERIFIED                      | Whole document                                                                                                                            | Pass contract                       |
| IN-02     | `fnd-1/README.md`                                                            | Commission input        | commit `28165f9…`                                | VERIFIED                      | Hypotheses 1–5; questions 1–10                                                                                                            | Sections 6–9                        |
| IN-03     | `../2026-08-30-counterexample-corpus-v1.md`                                  | Commission input        | Version 1                                        | VERIFIED                      | Base E1/E2; cases FND1-01…-12; use rules                                                                                                  | Section 6                           |
| IN-04     | `../2026-08-30-common-response-template-v1.md`                               | Commission input        | Version 1.0                                      | VERIFIED                      | Headings and status vocabularies                                                                                                          | Report structure                    |
| EXT-01    | ICH E9(R1) Addendum on Estimands and Sensitivity Analysis in Clinical Trials | External normative      | Step 4, 2019 (not inspected)                     | NOT_VERIFIABLE                | none (text unreachable)                                                                                                                   | CLM-15, CLM-16, Section 8           |
| EXT-02    | FDA final guidance, Multiple Endpoints in Clinical Trials                    | External normative      | not inspected                                    | NOT_VERIFIABLE                | none                                                                                                                                      | CLM-15, Section 8                   |
| EXT-03    | Holm (1979), "A simple sequentially rejective multiple test procedure"       | External primary        | not inspected                                    | NOT_VERIFIABLE                | none                                                                                                                                      | CLM-15, Section 8                   |
| EXT-04    | Benjamini and Hochberg (1995), "Controlling the false discovery rate…"       | External primary        | not inspected                                    | NOT_VERIFIABLE                | none                                                                                                                                      | CLM-15, Section 8                   |
| EXT-05    | Dunnett (1955), "A multiple comparison procedure…"                           | External primary        | not inspected                                    | NOT_VERIFIABLE                | none                                                                                                                                      | CLM-15, Section 8                   |
| EXT-06    | Tukey (1949), "Comparing individual means in the analysis of variance"       | External primary        | not inspected                                    | NOT_VERIFIABLE                | none                                                                                                                                      | CLM-15, Section 8                   |
| EXT-07    | ASA Statement on p-Values (Wasserstein and Lazar, 2016)                      | External primary        | not inspected                                    | NOT_VERIFIABLE                | none                                                                                                                                      | CLM-15, Section 9                   |

The `Access` value `VERIFIED` for `REPO-*` rows means the file content was read
at the investigated commit; it asserts nothing about scientific truth.
Citation details for `EXT-*` rows (years, venues) are identification metadata
for the failed-access record, not verified facts about the texts' content.

## 5. Atomic claim-evidence ledger

| Claim ID | Atomic claim                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Status             | Evidence IDs                       | Exact scope                                                                                                                                                                                                                                                                                                                       | Confidence |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| CLM-01   | The 0.2 ITGC guarantee schema represents an estimand as exactly two free strings, `kind` and `direction`, with no population, time, unit, margin, or family slot.                                                                                                                                                                                                                                                                                                 | REPO_VERIFIED      | REPO-11, REPO-13                   | `schemas/profiles/itgc-guarantee-0.2.schema.json` `$defs/analysis/properties/estimand`, at commit `28165f9…`                                                                                                                                                                                                                      | HIGH       |
| CLM-02   | The supported estimand kind, CI method identifier, and 0.95 confidence level are owned by check versions as `comparison_constants`, never by Records.                                                                                                                                                                                                                                                                                                             | REPO_VERIFIED      | REPO-08, REPO-21                   | `registries/public-checks.yaml` `welch-recompute` 0.2.0/0.2.1 entries; `AGENTS.md` hard rule                                                                                                                                                                                                                                      | HIGH       |
| CLM-03   | An unsupported estimand, method, alternative, pairing, transformation, subset analysis, or missing-outcome declaration fails closed with a registered reason code; nothing is silently reinterpreted.                                                                                                                                                                                                                                                             | REPO_VERIFIED      | REPO-09, REPO-12                   | `registries/reason-codes.yaml` ids at lines 336, 360, 478–612; `admissibility.md` NRS-PROFILE-ITGC-0019…0025                                                                                                                                                                                                                      | HIGH       |
| CLM-04   | `two_sided` is the only supported alternative; a one-sided declaration is representable but fails admissibility with `NRS-UNSUPPORTED-ALTERNATIVE`.                                                                                                                                                                                                                                                                                                               | REPO_VERIFIED      | REPO-09, REPO-14                   | Reason-code entry line 360; NRS-PROFILE-ITGC-0007; `reference/verifier/src/semantic-2a.ts` line 241 (reference behavior, non-authoritative)                                                                                                                                                                                       | HIGH       |
| CLM-05   | No multiplicity, hypothesis-family, FWER, or FDR concept exists on any specification, schema, registry, or conformance surface; the only occurrences are the research-planning queue in `governance/RFC.md`.                                                                                                                                                                                                                                                      | REPO_VERIFIED      | REPO-04, REPO-07                   | Absence claim scoped to a case-insensitive `rg` alternation over the terms `multiplicity`, `FWER`, `FDR`, `hypothesis famil`, `familywise` across the full working tree at commit `28165f9…`, excluding the paths `node_modules`, `evidence/research/**`, `governance/drafts/**`, `tooling/r2-paired-t*/**`, and `pnpm-lock.yaml` | HIGH       |
| CLM-06   | The Record outcome surface carries only `outcome_id`, a free-text `label`, and `scale: "continuous"`; there is no structured measurement-unit, time-origin, or assessment-window field.                                                                                                                                                                                                                                                                           | REPO_VERIFIED      | REPO-11, REPO-01                   | `$defs/outcome` of the 0.2 guarantee schema; absence scoped to that schema and a case-insensitive `rg` alternation over the terms `"unit"`, `ng/mL`, `unit of measure` across `schemas/`, `spec/`, `registries/`                                                                                                                  | HIGH       |
| CLM-07   | The analysis-population declaration is a two-value enum (`all_record_observations` vs `subset_or_exclusions_present`); no selection predicate, exclusion list, or weighting structure is representable, and the subset value is unsupported.                                                                                                                                                                                                                      | REPO_VERIFIED      | REPO-12, REPO-11                   | `admissibility.md` supported-values table; NRS-PROFILE-ITGC-0024                                                                                                                                                                                                                                                                  | HIGH       |
| CLM-08   | In this repository "routing" means bundle-independent verifier dispatch (envelope validation, exact bundle selection, pre-dispatch rejection), not pre-outcome analysis-method selection.                                                                                                                                                                                                                                                                         | REPO_VERIFIED      | REPO-10, REPO-22                   | `interpretation-bundles.yaml` `verifier_output_contract`; `conformance/manifest.yaml` `family: routing`                                                                                                                                                                                                                           | HIGH       |
| CLM-09   | No "sensitivity analysis" concept, field, or vocabulary term exists anywhere in scope.                                                                                                                                                                                                                                                                                                                                                                            | REPO_VERIFIED      | REPO-06, REPO-07                   | Absence scoped to `rg -i 'sensitivity'` over the same tree/exclusions as CLM-05; only hits are unrelated (none in `spec/`, `schemas/`, `registries/`)                                                                                                                                                                             | HIGH       |
| CLM-10   | The repository already keeps method identity, estimand declaration, CI-method identity, and Public Check identity as distinct identifiers that are "never substituted for one another".                                                                                                                                                                                                                                                                           | REPO_VERIFIED      | REPO-05, REPO-08, REPO-13          | `ID-POLICY.md` Protocol semantic identifiers; `method_id` vs `estimand{kind,direction}` vs `ci_method_id` vs `check_id` in the 0.2 surfaces                                                                                                                                                                                       | HIGH       |
| CLM-11   | The repository forbids silent, data-dependent method switching (NRS-PROFILE-ITGC-0007 "MUST NOT silently switch"), but no current surface can verify _when_ an analysis choice was made relative to outcome inspection.                                                                                                                                                                                                                                           | LOGICAL_DERIVATION | REPO-14, REPO-16                   | The prohibition is repo-verified; the unverifiability of choice timing follows from NRS-PROV-0002 (software identity, pre-Record history, and inter-Record relationships out of phase)                                                                                                                                            | HIGH       |
| CLM-12   | The versioning model separates semantic identity from representation identity and implementation identity, and states implementation identity "never becomes semantic authority".                                                                                                                                                                                                                                                                                 | REPO_VERIFIED      | REPO-17, REPO-16                   | `spec/versioning/README.md` version-identity list; NRS-PROV-0002                                                                                                                                                                                                                                                                  | HIGH       |
| CLM-13   | The mapping discipline states that a matching label or similar field name is not semantic equivalence and a mapping is not an identifier alias.                                                                                                                                                                                                                                                                                                                   | REPO_VERIFIED      | REPO-18                            | `mappings/README.md` "Mapping discipline"                                                                                                                                                                                                                                                                                         | HIGH       |
| CLM-14   | The repository's own comparison work classifies "pinned analysis method + estimand + confidence level" as having no strongly standardized native representation in WRROC 0.5 / RO-Crate 1.1 or the inspected BCO schema set.                                                                                                                                                                                                                                      | REPO_VERIFIED      | REPO-20                            | `comparison/nomue-vs-wrroc-vs-bco.md` rows at lines 58 and 79; the classification's correctness about the external formats is not independently re-verified in this pass                                                                                                                                                          | MEDIUM     |
| CLM-15   | None of the seven commissioned external primary sources could be inspected from this environment; each attempt failed at the egress proxy.                                                                                                                                                                                                                                                                                                                        | REPO_VERIFIED      | Section 3.2                        | Access attempts of 2026-08-30 only; says nothing about the sources' content                                                                                                                                                                                                                                                       | HIGH       |
| CLM-16   | Any statement about what ICH E9(R1) defines (estimand attributes, intercurrent-event strategies, sensitivity-analysis definition) is unestablished in this pass.                                                                                                                                                                                                                                                                                                  | NOT_VERIFIABLE     | EXT-01                             | Applies to every ICH-content statement in Sections 6–8                                                                                                                                                                                                                                                                            | —          |
| CLM-17   | Equal or close numerical results cannot establish semantic identity under the repository's own posture: comparisons are check-owned, scoped, and never yield an overall "verified" or validity claim.                                                                                                                                                                                                                                                             | LOGICAL_DERIVATION | REPO-15, REPO-08, IN-03            | Derived from NRS-CORE-0009, check-owned tolerance policy, and corpus rule "numerical results do not establish semantic identity"                                                                                                                                                                                                  | HIGH       |
| CLM-18   | Later adoption of any FND-1 concept would mechanically touch, at minimum: a new schema version plus `registries/public-contract-surfaces.yaml` entry, new Requirement IDs (possibly a new `NRS-CONTRACT-<TOKEN>`/`NRS-PROFILE-<TOKEN>` namespace), new reason codes, new or re-versioned Public Checks, a new interpretation bundle, positive and negative conformance fixtures, vocabulary-registry terms, authority-manifest assignment, and regenerated views. | LOGICAL_DERIVATION | REPO-02, REPO-03, REPO-05, REPO-21 | Derived from the change-coupling, ID-policy, and schema-versioning hard rules; no such edit is proposed or performed here                                                                                                                                                                                                         | HIGH       |
| CLM-19   | The vocabulary registry already defines `Analysis Contract` as targeting "quantities or estimands", and defines `Workflow` and `Analysis DAG`, which partially overlap the FND-1 transformation-graph attribute.                                                                                                                                                                                                                                                  | REPO_VERIFIED      | REPO-06                            | `registries/vocabulary.yaml` terms `Analysis Contract`, `Workflow`, `Analysis DAG`                                                                                                                                                                                                                                                | HIGH       |
| CLM-20   | The four relation labels (`aligned`, `parallel_not_combinable`, `not_comparable`, `inadmissible_or_unsupported`) appear on no repository surface; the closest existing machinery is the fail-closed unsupported/refusal boundary, which corresponds only to the fourth label's "unsupported" half.                                                                                                                                                                | LOGICAL_DERIVATION | REPO-09, REPO-06, IN-03            | Absence scoped to `rg` over the same tree/exclusions as CLM-05                                                                                                                                                                                                                                                                    | HIGH       |
| CLM-21   | A one-to-one, declared, exact reparameterization can preserve the inferential target only if every co-declared quantity (estimate, interval, null boundary, margin) is transformed by the same declared map; the current Protocol has no surface on which such a map could be declared.                                                                                                                                                                           | LOGICAL_DERIVATION | CLM-01, CLM-06                     | Value-independent; conditional on declarations, not on observed values                                                                                                                                                                                                                                                            | MEDIUM     |
| CLM-22   | The confidence level is declared inside the Record _and_ owned by the check version, with `NRS-CONFIDENCE-LEVEL-MISMATCH` firing on disagreement — a deliberate dual-bearer pattern (declaration + authority) rather than a single bearer.                                                                                                                                                                                                                        | REPO_VERIFIED      | REPO-08, REPO-09                   | Reason-code entry line 633; `comparison_constants.supported_confidence_level`                                                                                                                                                                                                                                                     | HIGH       |

## 6. Counterexample classifications

Classification basis: explicit declarations in corpus Version 1 and
value-independent reasoning only. Per the corpus use rules, equal or close
numbers never justify identity (CLM-17), absent declarations are never
inferred, and `aligned` never authorizes combination or pooling. Where the
single-axis vocabulary cannot express the answer, `unresolved` is used and the
multi-axis decomposition of Section 9 is referenced. External statistical
literature was not inspectable (CLM-15), so no case cites an external primary
source; confidence values reflect that boundary.

Axis shorthand used in the reasoning column of the analysis below:
**E** = estimand identity (target quantity), **P** = inference-procedure
identity (estimator/test/uncertainty apparatus), **G** = guarantee/family
identity (protected hypothesis set and error criterion), **A** = admissibility
and declaration provenance.

| Case ID | Proposed relation                                    | Decisive attributes                                                                                                                                                                            | Evidence or claim IDs         | Missing declarations                                                                                                                                                                 | Confidence |
| ------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| FND1-01 | aligned                                              | Declared mathematical target unchanged; only implementation lineage differs                                                                                                                    | CLM-12, CLM-10, IN-03         | Implementation identity itself (software name/version/environment) has no declared slot (NRS-PROV-0002)                                                                              | HIGH       |
| FND1-02 | unresolved (aligned on E; different on P)            | Uncertainty estimator; uncertainty target; both fixed pre-outcome                                                                                                                              | CLM-01, CLM-21, IN-03         | Whether B's bootstrap interval targets the same coverage parameter and level; resampling unit; bootstrap scheme and PRNG identity                                                    | MEDIUM     |
| FND1-03 | not_comparable                                       | Assessment time (24h vs 48h) is a defining outcome attribute → different estimands                                                                                                             | CLM-06, CLM-17, IN-03         | No declared joint structure (e.g., a longitudinal family) that would make the pair `parallel_not_combinable`                                                                         | MEDIUM     |
| FND1-04 | aligned (conditional)                                | Exact declared one-to-one unit conversion; same quantity under canonical unit map                                                                                                              | CLM-21, CLM-06, IN-03         | The conversion factor, unit-system reference, and the rule that estimate/CI/margin transform together — none currently declarable                                                    | MEDIUM     |
| FND1-05 | not_comparable                                       | Population summary changes (arithmetic-mean difference vs geometric-mean ratio); transformation changes the target, not just the computation                                                   | CLM-17, CLM-13, IN-03         | None — declarations are complete; similarity of the free-text objective is not semantic equivalence (CLM-13)                                                                         | HIGH       |
| FND1-06 | not_comparable                                       | Target population declaration differs; A extrapolates from an all-female frame to all adult mice                                                                                               | IN-03, CLM-17                 | A's extrapolation justification (sampling-frame-to-population bridge) is undeclared but its absence does not make A inadmissible under value-independent rules                       | MEDIUM     |
| FND1-07 | parallel_not_combinable                              | Contrast coefficients (`mu_A - mu_C` vs `mu_B - mu_C`); shared outcome, family, and comparator                                                                                                 | IN-03, CLM-17                 | None; the shared declared family is what distinguishes this from `not_comparable`                                                                                                    | HIGH       |
| FND1-08 | unresolved (aligned on E; different on G/hypothesis) | Null boundary and claim direction; same declared contrast `mu_X - mu_C`                                                                                                                        | CLM-04, CLM-17, IN-03         | None; the vocabulary lacks a label for "same estimand, different tested hypothesis"                                                                                                  | HIGH       |
| FND1-09 | unresolved (aligned on E and P; different on G)      | Hypothesis-family member set (`{A-C,B-C,D-C}` vs all pairs) under FWER                                                                                                                         | CLM-05, IN-03; EXT gap CLM-15 | Procedure identity and version for the FWER control in each family                                                                                                                   | MEDIUM     |
| FND1-10 | parallel_not_combinable                              | Error criterion (FWER vs FDR) for the same member set → different protected guarantee                                                                                                          | CLM-05, IN-03; EXT gap CLM-15 | Procedure identity/version for each criterion; the exact exchange rate between the two guarantees is `NOT_VERIFIABLE` this pass                                                      | MEDIUM     |
| FND1-11 | inadmissible_or_unsupported                          | Routing provenance: procedure selected after inspecting a result-dependent diagnostic; accidental numerical agreement is irrelevant by construction                                            | CLM-17, CLM-11, IN-03         | B's full selection rule (which diagnostics, which decision rule) — but the case already declares enough to fail on the A axis                                                        | HIGH       |
| FND1-12 | inadmissible_or_unsupported                          | Declaration completeness: a bare label plus numbers declares no estimand attribute                                                                                                             | CLM-13, CLM-20, IN-03         | Nearly all: population, outcome and time, summary, contrast, direction, analysis population, family; indispensable minimum listed below                                              | HIGH       |
| FND1-X1 | aligned                                              | Investigator-created primary/sensitivity pair: identical E1 estimand attributes; only the prespecified variance/interval apparatus differs, with the sensitivity role declared before outcomes | CLM-21, IN-03                 | Requires a declarable "sensitivity-of" link and a shared-estimand assertion; no such surface exists today (CLM-09)                                                                   | MEDIUM     |
| FND1-X2 | not_comparable                                       | Investigator-created mislabeled "sensitivity": switches analysis population from all eligible animals to a post-missingness complete-case subset → target changes despite the label            | CLM-07, CLM-13, IN-03         | The relabeled analysis's own target-population declaration; the "sensitivity" label conflicts with the changed analysis-set attribute and must not be resolved by trusting the label | HIGH       |

Case analyses (value-independent throughout):

- **FND1-01.** The corpus fixes the declared mathematical target as unchanged;
  P vs Q is implementation lineage. The repository's own identity model places
  implementation identity on a separate axis from semantic identity (CLM-12),
  and its estimand/inference declarations nowhere reference software. So
  estimand identity and inference identity are unchanged; what differs is
  result-verification evidence (a recompute under one implementation is not a
  recompute under the other). `aligned` — with the explicit corpus caveat that
  aligned does not authorize combining, and with the missing-declaration note
  that implementation identity currently has no slot at all (NRS-PROV-0002),
  so the difference is _undeclarable_, not just undeclared.
- **FND1-02.** Both arms are fixed pre-outcome and target the same declared
  mean-difference contrast; the analytic-SE interval and the bootstrap interval
  are different uncertainty procedures. On the E axis this is the same
  estimand; on the P axis the inferential results are not the same result. The
  single-axis vocabulary offers no label that says both things, which is the
  point of the case: classifying it `aligned` silently erases the procedure
  difference; classifying it `not_comparable` falsely denies the shared
  estimand. Declarations that must agree for the E-axis claim: population,
  outcome/time, summary (arithmetic mean), contrast, direction, margin,
  analysis population. Declarations that must additionally be recorded to
  relate the P axis: uncertainty target (coverage of the same parameter),
  nominal level, resampling scheme, resampling unit, and PRNG identity.
- **FND1-03.** Assessment time is part of the outcome definition in the base
  profile ("Biomarker Y at 24 hours"), so the 48-hour analysis declares a
  different estimand. Nothing in the case declares a joint family or a
  longitudinal structure that would license `parallel_not_combinable`; under
  the sharpened boundary proposed in Section 9 (parallel requires a declared
  joint structure), the classification is `not_comparable`. The MEDIUM
  confidence reflects exactly that vocabulary ambiguity, not doubt that the
  estimands differ.
- **FND1-04.** An exact one-to-one declared unit conversion is a canonical
  reparameterization: the target quantity is the same physical contrast
  expressed in different units. Identity is preserved _conditionally_: the
  conversion must itself be declared (factor and unit system), applied to every
  co-reported quantity (estimate, interval endpoints, any margin), and be
  outcome-independent. The current Protocol cannot express any of this — units
  live inside a free-text label (CLM-06) — so today the two Records could not
  even be mechanically recognized as unit-variants. That is a representational
  gap, not a semantic obstacle.
- **FND1-05.** The arithmetic-mean difference on the original scale and the
  back-transformed geometric-mean ratio are different population summaries of
  the same outcome; the transformation changes the target, not merely the
  computation path. A similar free-text objective cannot bridge them (CLM-13).
  `not_comparable` on the E axis. This is also the clearest case against
  treating "transformation" as a computational detail: it belongs among the
  estimand-defining attributes.
- **FND1-06.** The observed data are identical; only the declared target
  population differs. A's declaration (all eligible adult mice, from an
  all-female sample) is an extrapolation, not a contradiction: under
  value-independent rules it is not inadmissible, because nothing was selected
  after outcome inspection and no declaration is missing — the inferential
  _reach_ differs. Different target population → different estimand →
  `not_comparable`. The case shows "target population" must be a first-class
  attribute separate from "analysis population": the two analyses share the
  latter and differ in the former.
- **FND1-07.** Two contrasts against the same comparator inside one declared
  four-group experiment: different questions (different contrast coefficient
  vectors), shared outcome, family, and design. This is the paradigm
  `parallel_not_combinable` case — related members of one declared structure
  that are not one combined effect. HIGH confidence because the classification
  follows from the contrast attribute alone.
- **FND1-08.** The estimand (`mu_X - mu_C`) is identical; the tested null and
  the claim direction differ. A single-axis vocabulary must either call these
  aligned (losing the hypothesis difference) or not (losing the estimand
  identity). `unresolved` with the E/G decomposition. Repository note: today
  the one-sided arm is not even admissible (CLM-04), so inside the current
  supported slice the pair could not both exist as verified Records — a
  consequence surface, not a semantic answer.
- **FND1-09.** Identical contrast, identical marginal procedure, different
  protected member set under FWER control. If H3 holds, the protected family
  is part of inferential meaning, and the two results carry different
  guarantees even when the marginal numbers agree; value-independent reasoning
  supports this (what the family protects is fixed by declaration, not by
  data). Whether the two adjusted results can be _partially_ compared depends
  on external procedure semantics that this pass could not inspect
  (CLM-15) — hence `unresolved` on the single axis and MEDIUM confidence.
- **FND1-10.** Same member set, FWER vs FDR: the error criterion names what is
  guaranteed, so the guarantee objects differ by declaration. They remain
  related analyses of one family → `parallel_not_combinable` (the declared
  shared structure exists here, unlike FND1-03). How far the two can be
  translated into each other is `NOT_VERIFIABLE` this pass.
- **FND1-11.** The corpus's own admissibility class includes declarations
  "selected after results were inspected"; B declares exactly that provenance.
  Accidental agreement of procedure and numbers is irrelevant by the
  value-independence rule (CLM-17). `inadmissible_or_unsupported`, HIGH. The
  repository can _prohibit_ this today (no silent switching, CLM-11) but
  cannot _detect_ it from Record structure: when a choice was made relative to
  outcome inspection is extra-Record provenance (NRS-PROV-0002). Routing
  provenance is therefore a declarable/attestable fact, not a structurally
  verifiable one — a necessity-versus-verifiability split that H2 must absorb
  (Section 9).
- **FND1-12.** A label plus numbers declares nothing; inferring attributes
  from the label would violate corpus rule 7 and the repository's own mapping
  discipline (a matching label is not semantic equivalence, CLM-13).
  `inadmissible_or_unsupported` in its "not classifiable, declarations
  missing" sense — the same fail-closed posture the verifier already takes
  toward unsupported declarations (CLM-03). Indispensable minimum for _any_
  relation classification, derived from which attributes were decisive across
  FND1-01…-11: outcome with assessment time, target population, unit of
  analysis, population summary with contrast and direction, analysis
  population, uncertainty procedure and level, hypothesis family with error
  criterion, and routing provenance. Classification can proceed _partially_
  without margin (defaults to none only if declared) and without
  implementation identity (affects verification, not identity, FND1-01).
- **FND1-X1 (investigator-created: genuine primary/sensitivity pair).**
  Primary: base E1 exactly. Sensitivity: identical scientific objective,
  target population, unit of analysis, outcome and time, scale, analysis
  population, summary, contrast (`mu_X - mu_C`), direction, margin — with the
  uncertainty interval computed by a prespecified alternative variance
  apparatus, and the analysis declared _in advance_ as "sensitivity of the
  primary analysis, same estimand". Every estimand-defining attribute is
  identical; only assumption-robustness apparatus varies; the sensitivity role
  and timing are declared. Relation: `aligned` on E (and the pair is the
  operational definition of a sensitivity analysis: same target, perturbed
  assumptions). Remaining uncertainty: this definition matches ICH E9(R1)'s
  only if the uninspected text says so — `NOT_VERIFIABLE` here (CLM-16);
  within this report it stands as a value-independent construction plus a
  possible project convention.
- **FND1-X2 (investigator-created: "sensitivity" that changes the estimand).**
  Primary: E1 extended by declaring that some outcomes may be missing and that
  the primary analysis targets all prospectively eligible animals under a
  declared missingness-handling strategy. "Sensitivity": labeled as a
  sensitivity analysis but defined as complete-case analysis of the subset
  with observed `y24`. The analysis-population attribute (and with it the
  effective target of inference) changes; under the FND1-06 logic the label
  does not override the attribute change. Relation of the pair:
  `not_comparable` on E despite the label — which is precisely why a
  machine-checkable "sensitivity-of" link must assert shared estimand
  attributes rather than merely carrying a role string. Decisive attributes:
  analysis population and missingness handling. This case also shows the
  danger of overloading the current binary `analysis_population` enum
  (CLM-07) to carry analysis-set semantics it cannot express.

## 7. Candidate attributes and consistency rules

### 7.1 Identity-attribute matrix

Necessity is judged by whether any corpus case turned on the attribute
(value-independently); bearer risk records where the attribute would live given
the repository's existing ownership split (Record declaration vs
check-version/Contract authority, CLM-02/CLM-22).

| Candidate attribute group                                         | Identity role                                                             | Always required or conditional                                                 | Current repository surface                                                                         | Overlap and bearer risk                                                                                                          | Disposition for cross-pass comparison  |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Scientific objective and decision role                            | Discriminates primary vs secondary roles; never a semantic bridge         | Conditional (role); the objective text itself is never identity-bearing        | Free-text labels only                                                                              | Label ≠ semantics (CLM-13); FND1-05/-12 show text cannot substitute for structure                                                | KEEP (as role metadata, not identity)  |
| Target population, sampling frame, unit of analysis               | Estimand-defining (FND1-06)                                               | Always                                                                         | None (experimental_unit_type free text is the nearest neighbor)                                    | Must not be conflated with analysis population (FND1-06 vs FND1-X2)                                                              | KEEP, SPLIT from analysis population   |
| Condition, comparator, assignment semantics                       | Estimand-defining                                                         | Always                                                                         | `groups`, `group_order` (order carries direction, NRS-PROFILE-ITGC-0006)                           | Direction currently lives half in `group_order`, half in `estimand.direction` — two bearers for one fact                         | KEEP; NARROW the direction bearer      |
| Outcome, time origin, assessment window, unit, scale              | Estimand-defining (FND1-03, FND1-04)                                      | Always                                                                         | `outcome{outcome_id,label,scale}` only (CLM-06)                                                    | Unit and time are trapped in free text; FND1-04's conversion check is inexpressible                                              | KEEP; representational gap flagged     |
| Missingness, censoring, intercurrent-event handling               | Estimand-defining when present (FND1-X2)                                  | Conditional (required exactly when missingness/censoring is declared possible) | Binary `missing_outcomes: none/present`; `present` unsupported (NRS-PROFILE-ITGC-0025)             | ICE vocabulary is clinical-derived; external boundary `NOT_VERIFIABLE` (Section 8)                                               | KEEP (conditional); external hold      |
| Transformation graph                                              | Estimand-defining when it changes the summary (FND1-05)                   | Conditional                                                                    | Binary `transformation: none/present`; `present` unsupported; vocabulary has `Analysis DAG` term   | Overlaps `Analysis DAG`/`Workflow` (CLM-19); adopting a second graph concept would collide                                       | MERGE candidate with `Analysis DAG`    |
| Population summary, contrast, direction, margin                   | The core of estimand identity (FND1-05, FND1-07, FND1-08)                 | Always (margin: conditional, default only if declared)                         | `estimand.kind`, `estimand.direction`; contrast implicit in two-group structure; no margin slot    | `estimand` today means only {kind,direction} — silent widening of the same field name is the largest overload risk (Section 7.3) | KEEP; widen only under new identifiers |
| Analysis population, exclusions, weights, pairing, clustering     | Analysis-set identity; changes target when it changes who is in (FND1-X2) | Always (even if the value is "all, none excluded")                             | Enums in `data_handling` and `declarations` (CLM-07); all non-trivial values unsupported           | Binary enums cannot carry predicates; overloading them would silently reinterpret existing Records (prohibited, REPO-21)         | KEEP; SPLIT from target population     |
| Estimator, test family, uncertainty target, confidence level      | Inference-procedure identity (FND1-02); not estimand identity             | Always for relating results; not needed for E-axis identity                    | `method_id`, `ci_method_id`, `confidence_level` (dual-bearer, CLM-22)                              | Method ≠ estimand already repo practice (CLM-10); keep the axes separate                                                         | KEEP on a separate axis                |
| Hypothesis family, member set, error criterion, procedure version | Guarantee identity (FND1-09, FND1-10)                                     | Conditional (single-member family may default only by declaration)             | None (CLM-05)                                                                                      | "Family" already used for conformance fixture grouping (`family: routing`) — naming collision to avoid                           | KEEP; external semantics on hold       |
| Routing provenance (declaration timing)                           | Admissibility, not identity (FND1-11)                                     | Always for admissibility classification                                        | Prohibition exists (NRS-PROFILE-ITGC-0007); no declarable timing fact (CLM-11)                     | Collides head-on with the repo's "routing" = bundle dispatch (CLM-08); a different term is needed                                | KEEP concept; RENAME candidate         |
| Implementation lineage                                            | Verification evidence, never identity (FND1-01)                           | Not identity-bearing                                                           | Explicitly out of phase (NRS-PROV-0002); implementation identity never semantic authority (CLM-12) | None — the repository already draws this line                                                                                    | KEEP outside identity                  |

Necessity conclusion for research question 2: no attribute group could be
dropped without losing a corpus case; the always/conditional split above is the
narrowing. Bearer conclusion: the repository's existing pattern is _dual
bearing_ — the Record declares, a check version owns the supported value, and a
mismatch is a first-class failure (CLM-22). Any FND-1 adoption should decide
per attribute whether it is Record-declared, authority-owned, or dual-borne;
the corpus cases show identity attributes must at least be Record-declared,
while supported _subsets_ of their values are authority-owned.

### 7.2 Proposed value-independent internal-consistency rules

All rules read only declarations and declared results; none uses a result
value to select a procedure (routing stays declaration-fixed). `YES` means
deterministically checkable from explicit inputs today-shaped Records could
carry; `PARTIAL` means checkable only once a missing surface exists.

| Rule ID | Rule candidate                                                                                                                                                                                           | Inputs needed                                                             | Deterministic check possible | Failure class                            | Evidence or inference                                                       | Unresolved issue                                                                                                             |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ICR-01  | Declared confidence level equals the level of every reported interval for the same analysis                                                                                                              | `confidence_level`, interval declarations                                 | YES                          | declaration inconsistency                | Repo precedent: `NRS-CONFIDENCE-LEVEL-MISMATCH` (CLM-22)                    | none                                                                                                                         |
| ICR-02  | Declared direction is borne once: `estimand.direction`, `group_order`, and the sign convention of the declared contrast agree                                                                            | `estimand.direction`, `group_order`, contrast declaration                 | YES                          | declaration inconsistency                | Repo precedent: NRS-PROFILE-ITGC-0006                                       | Whether direction should have a single bearer instead (Section 7.1)                                                          |
| ICR-03  | Two-sided test at level `1 − c` and the `c` confidence interval for the same estimand under the same variance model agree on the null: `p < 1 − c` iff the declared null value lies outside the interval | test p-value, interval, declared null/margin, declared duality assumption | YES (as a consistency check) | internal result inconsistency            | Inference; duality holds only when declared to hold (same statistic family) | The duality precondition itself must be a declaration, not an assumption                                                     |
| ICR-04  | A declared margin appears in the null specification and is in the same declared unit as the estimate                                                                                                     | margin, null boundary, unit declaration                                   | PARTIAL (no unit surface)    | declaration inconsistency                | Inference from FND1-04/FND1-08                                              | Blocked on a structured unit/quantity surface (HOLD-05)                                                                      |
| ICR-05  | Declared unit conversion between two representations is exact, one-to-one, and applied uniformly to estimate, interval endpoints, and margin                                                             | both unit declarations, conversion factor                                 | PARTIAL (no unit surface)    | representation inconsistency             | Inference from FND1-04 (CLM-21)                                             | Same as ICR-04                                                                                                               |
| ICR-06  | The evaluated hypothesis is a member of its declared family; a family with more than one member declares an error criterion and a procedure identity with version                                        | family member set, error criterion, procedure id/version                  | PARTIAL (no family surface)  | declaration incompleteness               | Inference from FND1-09/FND1-10 (CLM-05)                                     | Family surface does not exist; external procedure semantics on hold                                                          |
| ICR-07  | The declared analysis population resolves to an explicit, prospectively declared predicate or enumeration, and every observation's inclusion/exclusion is derivable from it                              | analysis-set predicate, dataset keys                                      | PARTIAL (binary enum today)  | declaration incompleteness               | Inference from FND1-X2 (CLM-07)                                             | Requires an analysis-set surface richer than the current enum                                                                |
| ICR-08  | An analysis declared as "sensitivity of" another analysis has identical values for every estimand-defining attribute of its referent                                                                     | both analyses' estimand attributes, a sensitivity-link declaration        | PARTIAL (no link surface)    | estimand drift under a sensitivity label | Inference from FND1-X1/FND1-X2                                              | Link surface does not exist (CLM-09); ICH alignment `NOT_VERIFIABLE`                                                         |
| ICR-09  | Routing declaration is closed before results: the Record carries no procedure-selection rule conditioned on outcome or diagnostic values                                                                 | analysis/method declarations                                              | PARTIAL                      | admissibility                            | Repo precedent NRS-PROFILE-ITGC-0007; gap per CLM-11                        | Structural checks can only prove the _absence of a declared_ data-dependent rule; timing truth is attestable, not verifiable |

None of these rules routes on a result value: ICR-03 consumes results but only
to test declared internal agreement, and its outcome gates nothing but its own
reported consistency status — matching the repository's existing scoped-check
posture (CLM-03, REPO-15).

### 7.3 Repository implication-surface inventory

Surfaces that already express, partially express, or explicitly exclude the
candidate concepts (investigation items 5–7); no surface is edited by this
pass:

- **Already expressed (narrow slice):** estimand declaration
  (`analysis.estimand{kind,direction}`, CLM-01); supported-estimand authority
  (`comparison_constants`, CLM-02); estimand/method/CI-method identity
  separation (CLM-10); fail-closed refusal of unsupported estimand,
  alternative, method, design, and data-handling declarations (CLM-03);
  no-silent-switching (CLM-11); implementation-identity exclusion from
  semantics (CLM-12).
- **Partially expressed:** analysis set (binary `analysis_population` enum,
  CLM-07); missingness and transformation (binary enums, unsupported when
  non-trivial); direction (dual-borne, Section 7.1); confidence level
  (dual-borne, CLM-22); transformation graph (vocabulary-level `Analysis DAG`
  with no Record surface, CLM-19).
- **Explicitly excluded or deferred:** multiplicity and hypothesis families
  (no surface; named in the RFC research queue and in the AGENTS.md
  no-new-phase-fields rule, CLM-05); missingness policies, standardized effect
  sizes, significance booleans (REPO-01 scope, REPO-13 NRS-PROFILE-ITGC-0026);
  extra-Record provenance including software identity (NRS-PROV-0002);
  sensitivity analysis (absent entirely, CLM-09); one-sided alternatives
  (representable, inadmissible, CLM-04).
- **Silent-overload risks (investigation item 7):**
  1. `estimand` — the field name today means only {kind, direction}; widening
     the same JSON member to carry population/time/margin semantics without a
     new schema version would be silent reinterpretation, which the repository
     prohibits (REPO-21, breaking-change rule). Risk: HIGH if adoption reuses
     the name in place.
  2. `routing` — already means bundle dispatch (CLM-08). FND-1's
     "routing/admissibility from pre-outcome declarations" needs a different
     term (candidate: "procedure-selection provenance") or every conformance
     `routing_refusal` artifact becomes ambiguous.
  3. `family` — used by `conformance/manifest.yaml` as a fixture-grouping key
     (`family: routing`); a `hypothesis family` field is semantically distant
     but lexically adjacent; term choice should be explicit.
  4. `analysis_population` — overloading the existing binary enum with
     analysis-set predicates would reinterpret every existing Record's
     declaration (CLM-07); a new surface is required instead.
  5. `aligned` — appears informally in repo prose meaning "kept in sync"
     (e.g., release-evidence documents); as a Protocol relation label it would
     need a registered vocabulary term to avoid drift.
  6. Relation labels vs verifier outcomes — `not_comparable` (a semantic
     relation) must not be conflated with `not_run`/`not_asserted` (execution
     and claim postures, REPO-06 `not asserted`); they live on different
     layers.
- **Adoption consequences (investigation item 6, no edits performed):**
  CLM-18 enumerates the mechanically coupled surfaces: schema version + PCS
  registry entry, Requirement IDs (ID-POLICY grammar allows a capability
  namespace such as a future `NRS-CONTRACT-<TOKEN>` without meta-schema
  change), reason codes, Public Check versions (family constants would live as
  check-owned authority per the CLM-02 pattern), a new interpretation bundle
  (no proximity fallback, REPO-10), positive and negative conformance
  fixtures, vocabulary terms, authority-manifest targets, and regenerated
  views. Under AGENTS.md, all of it sits behind the Research Gate and RFC
  process; this report is Research Gate input only.

## 8. Multiplicity and ICH boundary analysis

### 8.1 Multiplicity-family catalogue (limited to what this pass can establish)

The repository has no multiplicity surface (CLM-05), and no external procedure
text was inspectable (CLM-15). What this pass can establish is therefore (a)
the repo-side landing constraints and (b) the value-independent structural
slots a family declaration needs, derived from FND1-09/-10/-11. Procedure-name
rows are identification placeholders for cross-pass reconciliation, not
verified semantics.

| Catalogue element                                                                                            | What this pass establishes                                                                                                                                                                                                                                  | Basis                                | External status                       |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------- |
| Family identity slots                                                                                        | Member set (explicit enumeration), error criterion, criterion level, procedure identity, procedure version, declaration timing                                                                                                                              | LOGICAL_DERIVATION (FND1-09/-10/-11) | —                                     |
| Member-set change (many-to-one vs all-pairs)                                                                 | Changes the protected guarantee object even for an unchanged marginal contrast                                                                                                                                                                              | FND1-09                              | Comparability limits `NOT_VERIFIABLE` |
| Error-criterion change (FWER vs FDR)                                                                         | Changes what is guaranteed for the same member set; results remain related but not one result                                                                                                                                                               | FND1-10                              | Exchange semantics `NOT_VERIFIABLE`   |
| Named procedures (Holm; Benjamini–Hochberg; Dunnett; Tukey; gatekeeping/omnibus/planned-contrast structures) | Only that any future support must pin procedure identity _and_ version as declaration slots; nothing about their internal semantics                                                                                                                         | Identification only                  | `NOT_VERIFIABLE` (EXT-02…06)          |
| Repo landing constraints                                                                                     | Family constants would be check-version-owned (CLM-02 pattern); families need registered identifiers under ID-POLICY; RFC queue already names "multiplicity families and the exact meaning/versioning of FWER/FDR procedures" as shared-foundation research | REPO-04, REPO-05, REPO-08            | —                                     |
| Single-member default                                                                                        | A one-member family may be a declared default (base E1 declares it explicitly); it must never be _inferred_ from absence                                                                                                                                    | IN-03 base E1; corpus rule 7         | —                                     |

Research question 6 (in which senses do all-pairs, many-to-one,
planned-contrast, omnibus, and gatekeeping procedures address different
questions): this pass can answer only structurally — they declare different
member sets and/or different claim structures over the same experiment, so
they differ on the G axis even where every marginal estimand coincides; the
procedure-specific senses require the uninspected primary texts. Research
question 7 (how far FWER- and FDR-controlled results are comparable):
structurally, the declared guarantees differ; every stronger statement is
`NOT_VERIFIABLE` in this pass.

### 8.2 ICH boundary table

ICH E9(R1) was not inspectable (CLM-16). To keep the aligned report comparable
with the primary-source pass, the table separates the _hypothesized_ boundary
(as structure this pass can define value-independently) from anything about the
actual ICH text. Every "clinical-specific" and "abstract-structure" statement
about ICH content is `NOT_VERIFIABLE` here; the repository column is verified.

| Structural element (hypothesized from the corpus and repo, not from ICH text) | Clinical-trial-specific? (per ICH text) | Possibly reusable abstract structure (per ICH text) | Repository analogue today                                         |
| ----------------------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------- |
| Target population of the scientific question                                  | NOT_VERIFIABLE                          | NOT_VERIFIABLE                                      | None (Section 7.1)                                                |
| Variable/outcome with assessment timing                                       | NOT_VERIFIABLE                          | NOT_VERIFIABLE                                      | `outcome{label,scale}` free text; no timing slot (CLM-06)         |
| Treatment/condition specification                                             | NOT_VERIFIABLE                          | NOT_VERIFIABLE                                      | `groups` + `group_order`                                          |
| Population-level summary measure                                              | NOT_VERIFIABLE                          | NOT_VERIFIABLE                                      | `estimand.kind` (one supported value, CLM-02)                     |
| Intercurrent-event handling strategies                                        | NOT_VERIFIABLE                          | NOT_VERIFIABLE                                      | None; nearest neighbor is the unsupported missingness enum        |
| Sensitivity analysis as same-estimand assumption perturbation                 | NOT_VERIFIABLE                          | NOT_VERIFIABLE                                      | None (CLM-09); FND1-X1/X2 give the value-independent construction |

What this pass _can_ say (investigation item for H5, repo-side only): the
repository already expresses an estimand-like structure without any clinical
vocabulary (CLM-01), already needs population/timing/summary slots it lacks
(Section 7.1), and its Research Gate queue names "estimand frameworks" as
shared-foundation work (REPO-04). Whether the reusable abstraction matches
ICH's is exactly the cross-pass question; two formal non-ICH sources were
commissioned to the primary-source pass and remain its deliverable.

## 9. Falsification attempts and material disagreements

### 9.1 Falsification attempts

| Target hypothesis                                                          | Strongest attempted counterexample                                                                                                                                                                                                                      | Result                                      | Consequence                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1: a method name does not identify an estimand                            | Inside the current supported slice the mapping _is_ one-to-one: `urn:nomue:method:welch-two-sample-t:1` under the ITGC bundle co-occurs with exactly one supported estimand, so within one registered bundle the method name does identify the estimand | NARROWED                                    | Corrected narrow form: "A method identifier does not identify an estimand _in general_; a registered bundle may pin a one-to-one mapping, but relation classification across Records must read the estimand attributes, never the method name" (CLM-10; ID-POLICY: identities never substituted)                                                                                    |
| H2: routing/admissibility must be determined from pre-outcome declarations | The repository can prohibit data-dependent switching but cannot structurally verify selection timing (CLM-11): a Record with fully compliant declarations could still have been authored after peeking                                                  | NARROWED                                    | Corrected narrow form: "Admissibility classification requires a _declared_ pre-outcome routing provenance; the declaration is checkable, its truth is attestable at best (NRS-PROV-0002). Verification establishes declaration consistency, not historical truth — consistent with NRS-CORE-0009"                                                                                   |
| H3: family member set and error criterion are part of inferential meaning  | Attempted: treat the family as reporting metadata since the marginal estimand and numbers are unchanged (FND1-09). Fails value-independently: the declared protected object differs, and the corpus forbids identity-from-numbers                       | SURVIVED (repo/logical scope)               | Externally unconfirmed this pass (CLM-15); cross-pass reconciliation must supply the primary-source half                                                                                                                                                                                                                                                                            |
| H4: the four-relation taxonomy suffices                                    | FND1-02, FND1-08, FND1-09 each require asserting sameness on one axis and difference on another; FND1-03 vs FND1-07 shows the parallel/not-comparable boundary depends on a "declared joint structure" criterion the vocabulary lacks                   | FALSIFIED as sufficient; NARROWED as usable | Replacement proposal: keep the four labels as _derived_ summaries over four declared axes — E (estimand), P (inference procedure), G (guarantee family/hypothesis), A (admissibility/provenance) — with `unresolved` first-class, and define `parallel_not_combinable` as requiring a declared joint structure; ordering: A failures dominate (FND1-11/-12), then E, then G, then P |
| H5: an abstract portion of ICH E9(R1) is reusable outside clinical trials  | Not testable in this pass: the ICH text was unreachable, and testing reuse without the text would be exactly the memory-substitution the commission forbids                                                                                             | UNRESOLVED                                  | Deferred to the primary-source pass; repo-side reusability constraints recorded in Section 8.2                                                                                                                                                                                                                                                                                      |

### 9.2 Material disagreements

No cross-source disagreement could be observed (no external source was
readable). Two internal tensions are preserved rather than resolved:

1. **Single-bearer vs dual-bearer identity attributes.** The repository
   deliberately dual-bears the confidence level and estimand (Record declares;
   check version owns the supported value; mismatch fails, CLM-02/CLM-22), and
   also dual-bears direction (`group_order` and `estimand.direction`,
   Section 7.1). FND-1's attribute matrix pulls toward one declared bearer per
   fact. Both postures are defensible (authority boundary vs redundancy);
   which facts should be dual-borne is a design decision for adjudication, not
   resolvable by this pass.
2. **Relation labels as classifications vs as refusals.** The corpus treats
   `inadmissible_or_unsupported` as one class; the repository mechanically
   separates "unsupported here" (a scoped, versioned refusal that asserts
   nothing about the research, CLM-03, REPO-15) from any judgment of the
   analysis itself. Folding FND1-11-style provenance inadmissibility and
   FND1-12-style incompleteness into the same label as "outside a supported
   slice" would blur a boundary the repository draws carefully. Preserved as a
   taxonomy-design question.

### 9.3 Negative and absence claims

| Claim                                                              | Inspected version or tag | Inspected scope                                                                                                                      | Search method                                                                        | Result                                        | Residual uncertainty                                                                            |
| ------------------------------------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| No multiplicity/FWER/FDR/hypothesis-family surface exists          | commit `28165f9…`        | All tracked files except `node_modules`, `evidence/research/**`, `governance/drafts/**`, `tooling/r2-paired-t*/**`, `pnpm-lock.yaml` | `rg -i 'multiplicity\|FWER\|FDR\|hypothesis famil\|familywise'`                      | Only `governance/RFC.md` research-queue prose | Excluded paths were not searched, by commission                                                 |
| No sensitivity-analysis concept exists                             | commit `28165f9…`        | Same scope as above                                                                                                                  | `rg -i 'sensitivity'`                                                                | No spec/schema/registry hits                  | Same                                                                                            |
| No structured measurement-unit/time-origin/assessment-window field | commit `28165f9…`        | `schemas/`, `spec/`, `registries/`                                                                                                   | Schema walk of `$defs/outcome` + `rg -i '"unit"\|ng/mL\|unit of measure\|uom'`       | Free-text `label` and `scale` only            | Fixture payloads embed units only inside label strings                                          |
| No four-relation label appears on any Protocol surface             | commit `28165f9…`        | Same scope as the first row                                                                                                          | `rg 'aligned\|not_comparable\|parallel_not_combinable\|inadmissible_or_unsupported'` | Only informal prose uses of "aligned"         | Same                                                                                            |
| One model file's absence is not generalized                        | —                        | Absence claims above are scoped to this repository at this commit only                                                               | —                                                                                    | —                                             | External standards' capabilities are a separate question (CLM-14 recorded as a repo claim only) |

## 10. Holds and cross-pass handoff

### 10.1 Holds

| Hold ID | Unresolved question                                                                                                                       | Evidence needed to close                                                                                                  | Repository work that remains unauthorized                               |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| HOLD-01 | Entire external primary-source basis (ICH E9(R1), FDA multiple-endpoints, Holm, B–H, Dunnett, Tukey, ASA statement, non-clinical sources) | The independent primary-source pass's version-pinned inspection; cross-pass reconciliation of every `NOT_VERIFIABLE` mark | Any normative text or registry change grounded in external methodology  |
| HOLD-02 | ICH clinical-specific vs reusable-abstract boundary (Section 8.2 external columns)                                                        | Primary text of ICH E9(R1) plus at least two formal non-ICH/general-research sources                                      | Any estimand-framework vocabulary adoption                              |
| HOLD-03 | How far FWER- and FDR-controlled results are comparable for one hypothesis set (Q7), and the procedure-specific senses of Q6              | Primary texts of the named procedures and the multiplicity guidance                                                       | Any multiplicity field, family registry, or procedure identifier        |
| HOLD-04 | Whether the four labels are kept as derived summaries over the E/P/G/A axes or replaced outright                                          | Cross-pass comparison of both passes' taxonomy attacks; steward adjudication                                              | Registering any relation vocabulary term                                |
| HOLD-05 | Structured unit/quantity, outcome-timing, margin, and analysis-set predicate representation (blocks ICR-04/05/07, FND1-04 checkability)   | A representation design pass under the RFC process, after FND-1 adjudication                                              | Any schema field addition; any change to the `analysis_population` enum |
| HOLD-06 | Verifiability class of routing provenance (declaration vs attestation vs external evidence)                                               | Cross-pass reconciliation on data-dependent-selection sources (Q8), plus the deferred provenance/attestation phases       | Any routing-provenance field or reason code                             |
| HOLD-07 | Sensitivity-link semantics (ICR-08): what a "sensitivity-of" assertion must pin                                                           | ICH E9(R1) sensitivity definition plus non-clinical sensitivity-analysis primary sources                                  | Any sensitivity-role field                                              |

### 10.2 Deliverables achieved

- 12/12 assigned cases classified, plus the two investigator-created cases
  (FND1-X1, FND1-X2), all value-independently.
- Source and repository register with exact paths, versions, pinpoints, and a
  complete failed-access record; claim-evidence ledger with scoped statuses.
- Identity-attribute matrix, nine internal-consistency rule candidates, and a
  repository implication-surface inventory including six silent-overload
  risks.
- Multiplicity catalogue and ICH boundary table bounded to this pass's
  establishable scope; falsification results for H1–H5 with corrected narrow
  forms; two preserved internal tensions.

### 10.3 Cross-pass reconciliation statement

This pass is `READY` for cross-pass reconciliation with the independent
primary-source pass: its repository findings are complete and scoped, and
every claim that depends on an uninspected external text is explicitly marked
`NOT_VERIFIABLE` for mechanical comparison against that pass's source register.
Readiness here means readiness for comparison only — not FND-1 Research Gate
closure, and not Protocol adoption. Recommended reconciliation focus: the
`NOT_VERIFIABLE` marks (HOLD-01…03, 06, 07), the H4 taxonomy replacement, and
the FND1-02/-03/-08/-09 classifications, which are the likeliest points of
material disagreement between passes. Work that remains unauthorized: every
item in the Holds table's third column, all Explicit non-decisions of the
commission (fields, schemas, identifiers, vocabularies, refusal codes,
methods, defaults, checks, APIs, implementations, release changes, Release 2
decisions), and any automatic combination of results classified `aligned`.

## 11. Public-artifact and sanitization self-check

- [x] Every assigned case was processed (FND1-01…-12, FND1-X1, FND1-X2).
- [x] Direct fact, inference, and possible project convention are separated
      (ledger `Status` column; Sections 6–8 mark each basis).
- [x] Decision-bearing claims rest on inspected repository artifacts or are
      marked `NOT_VERIFIABLE`; no external claim rests on memory or snippets.
- [x] Source version, tag, commit, or date is recorded for every register row.
- [x] Inaccessible source content is marked `NOT_VERIFIABLE`, with the failed
      attempts recorded verbatim in Section 3.2.
- [x] Semantic identity is never inferred from numerical proximity (CLM-17;
      applied in FND1-01, FND1-11, FND1-X1).
- [x] Every absence claim states its inspected scope (Section 9.3).
- [x] Release 2, paired-t work, and t-family numerical contracts remain
      excluded; the one incidental exposure is disclosed with its mitigation
      (Section 1.2).
- [x] No Protocol adoption, schema, identifier, transport, or implementation
      default is selected; only this assigned result file is modified.
- [x] No confidential strategy, personal data, credential, internal URL,
      non-public third-party material, or active-negotiation detail is
      present.
- [x] Quotations are short, attributed, and redistributable (below 25 words
      per source).

CLAUDE CODE FND-1 REPOSITORY PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION
