# Release 4 Assembled Opening Candidate - Independent Pre-Opening Review

**Status: informative independent review; non-normative; not adopted.**

## 1. Verdict

| Dimension                           | Result                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input integrity                     | **`MATCH`**: input commit, sole parent, input tree and all five blobs match the handoff; the delivery commit adds the handoff and a two-line README link only (Section 3)                                                                                                                                                 |
| Preservation                        | **`INTACT`**: the parent-to-delivery diff touches exactly the six listed Markdown paths; the three preserved review blobs, every authoritative artifact, numerical probe, source-copy record and Release 3 file are byte-identical (Section 3)                                                                            |
| Intervening main changes            | **`NONE`**: `origin/main` was the parent `0abdca8f…` when fetched on 2026-09-09 (Section 3)                                                                                                                                                                                                                               |
| Q1 model and formulas               | **`GO`** (bounded): the retained model, contrasts, SS identities, `nu = 4(n-1)`, individual nulls with nuisance effects unrestricted, shared denominator and non-claims match the accepted scope; no new statistical assertion needing source review; every displayed identity re-derived in exact arithmetic (Section 5) |
| Q2 clauses and allocation           | **`GO`** (bounded) with repairs: one-owner Contract/Profile/schema/check allocation and CORE-0021 binding are sound; two proposed clauses restate CORE meaning (S-3); the crosswalk omits fourteen applicable existing IDs, six of them CORE (S-2); one open item is already fixed by a CORE clause (S-4) (Section 6)     |
| Q3 payload, identifiers, draft gate | **`GO`** (bounded) for grammar, availability, exact-bundle treatment and no-alias rule; the RFC draft gate's "exact artifact changes" is not yet met for the schemas and registries, and the concrete missing text is named (S-1, S-6, S-7, S-9, N-1 to N-5) (Section 7)                                                  |
| Q4 additive compatibility           | **`CONFIRMED`** additive at the Record, report, refusal, routing, digest and dispatch level against the actual schemas and reference code; four authoritative meta-schemas and three other coupled owners are missing from the candidate's coupled-change list (S-1, S-8) (Section 8)                                     |
| Q5 highest affected tier            | **`STABLE-INTENT`**, at least 30 calendar days, is supportable only with S-4 and S-5 repaired as successor clauses; editing NRS-CORE-0004, NRS-CANON-0009 or NRS-VERIFY-0017 instead would be a CORE change with CORE's window (Section 9)                                                                                |
| Q6 numerical holds                  | None of the nine holds hides a scientific premise or widens the accepted model; two are decision-bearing for the draft text, not for the science: the zero-SSE representation rule (S-7) and the per-contrast scope decision (S-9). The rest are implementation or supported-execution gates (Section 10)                 |
| Q7 Release 3                        | **`VERIFIED`**: both pinned R3 blobs match at the parent; no R3 identifier, field spelling or procedure appears in any authoritative tree; no ordering condition exists; no actual dependency requires another review at this baseline (Section 11)                                                                       |
| Findings                            | 0 `BLOCKER`, 9 `SHOULD-FIX`, 6 `NICE-TO-HAVE` (Section 13)                                                                                                                                                                                                                                                                |
| Validation                          | delivery tree `3e650079…` and fixed input tree `2f9286c1…`: format, Markdown lint, typecheck, repository validation, generated-drift and `git diff --check` all pass (Section 14)                                                                                                                                         |
| Preparation versus opening          | Preparation **`GO`** (bounded). Opening **`NOT_READY`** at this fixed input: no unsupported claim, but the `SHOULD-FIX` items are draft-text repairs the RFC Draft stage requires before a discussion window can fairly start (Section 12)                                                                                |
| Independence                        | model, provider and work-context independence from the OpenAI-assisted author; same model identifier as the preserved reviews, in a new session with no prior involvement; not human-investigator independence (Section 2)                                                                                                |

`GO` here means that the candidate at `98187a14…` states the accepted bounded
scope, its evidence split, its non-claims and its holds accurately against the
parent `0abdca8f…`, and that the proposed identifiers, allocations and additive
surfaces are consistent with ID-POLICY, ADR-0032, the registries and the actual
schemas. It is not an opening GO. This review closes no hold, allocates no
identifier or namespace token, registers nothing, starts no clock, ratifies
nothing and changes nothing in Release 3.

## 2. Independence, roles and boundary

- **Commission.** `governance/drafts/release-4-preparation/opening-rfc-review-handoff.md`
  at delivery commit `6adfc8a0080e30ce7634a5912c4dbb32e97ecd17` (blob
  `e50cea34…`, see Section 3), reached through the branch locator
  `research/r4-opening-rfc-candidate`, which pointed at that commit when fetched on
  2026-09-09. The user supplied the handoff link in the task message. The handoff is
  a later author-side instruction and is not part of the five-file input.
- **Reviewer.** An Anthropic model, `claude-fable-5-1`, in Claude Code remote session
  `session_01SzjSXxurxni5pxpcqPCTnk` (container CLI 2.1.266, `anthropic_cloud`
  environment, effort level `high`). The session service reported both
  `session_context.model` and `external_metadata.last_served_model` as
  `claude-fable-5-1`. Exact model-build identity beyond that identifier is not
  available as authenticated runtime metadata.
- **Author.** The candidate and the handoff record OpenAI Codex assistance in the
  existing authoring context with no separate investigator. The reviewer shares no
  context with that authoring session.
- **Prior involvement.** None. This session had not read, reviewed or authored any
  part of the input, the handoff, the parent or the preserved reviews before this
  review. The preserved reviews under `review-inputs/r4-*` record the same model
  identifier in other sessions. Independence is at the model, provider and
  work-context level relative to the author. It is not human-investigator
  independence and is not claimed as such; model separation does not establish it.
- **Assistance.** No other model, service or person contributed. Code executed: the
  repository's own tooling (Section 14), git object inspection, three short
  reviewer-written Python scripts (registry cross-tabulation, an exact-arithmetic
  probe of the candidate's displayed identities, and an informative numerical
  normalization check of the `F(1, nu)` density; Section 5).
- **Source access.** No PDF, paper or source copy was supplied to or received by this
  session, and none was requested: the commission asks for an assembled opening
  decision, not a duplicate source review. No source was acquired, purchased or
  downloaded; no external message was sent. Nothing is certified about any supplied
  copy. The accepted NIST/LAPACK provided-copy status and the Yates receipt/review
  obligation are not reopened.
- **Not performed.** No merge, identifier or namespace allocation, registry edit,
  spec edit, RFC action, discussion clock, Release 3 change, edit to any accepted
  review, numerical rerun of the repository probes (none was needed to resolve a
  finding), or steward decision.

## 3. Exact identity, preservation and main

All objects were fetched by exact commit; branch names were used only as locators.

| Object                                                                   | Handoff value | Observed                                    |
| ------------------------------------------------------------------------ | ------------- | ------------------------------------------- |
| Review input commit                                                      | `98187a14…`   | `98187a14a48b38c9f2fb41fdd18060d53966a660`  |
| Sole parent (main baseline)                                              | `0abdca8f…`   | `0abdca8f822d0de3faf35f218f762a951fd75e9e`  |
| Input tree                                                               | `2f9286c1…`   | `2f9286c107b64b59940269af98122d469639f0de`  |
| `opening-rfc-candidate.md`                                               | `68d3660f…`   | match                                       |
| `README.md`                                                              | `b6aa21be…`   | match                                       |
| `public-discussion-readiness.md`                                         | `8b2e2c84…`   | match                                       |
| `rfc-preparation-draft.md`                                               | `0d1dffdf…`   | match                                       |
| `rfc-impact-inventory.md`                                                | `c262f720…`   | match                                       |
| Delivery commit (locator target)                                         | locator only  | `6adfc8a0080e30ce7634a5912c4dbb32e97ecd17`  |
| Delivery parent                                                          | not stated    | `98187a14…` (sole parent)                   |
| Delivery README blob                                                     | not stated    | `6b41df3f…`                                 |
| Handoff blob                                                             | not stated    | `e50cea34…`                                 |
| Delivery tree                                                            | not stated    | `3e650079…`                                 |
| `review-inputs/r4-opening-preparation/REVIEW-RESULT.md` at parent        | `13fb1e0f…`   | match                                       |
| `review-inputs/r4-normal-model-source/REVIEW-RESULT.md` at parent        | `9efcc51a…`   | match                                       |
| `review-inputs/r4-normal-model-source-repair/REVIEW-RESULT.md` at parent | `94d21ac7…`   | match                                       |
| `governance/drafts/release-3-preparation/README.md` at parent            | `4dbb5170…`   | match                                       |
| `readiness-audit-2026-09-06.md` at parent                                | `bc0bb942…`   | match                                       |
| `origin/main` when fetched                                               | not stated    | `0abdca8f…` = parent; no intervening change |

Diff shape: parent to input changes exactly the five listed files (one added, four
modified; 293 insertions, 3 deletions). Input to delivery adds
`opening-rfc-review-handoff.md` and replaces one README sentence with a two-line
link (125 insertions, 1 deletion). `git diff --name-only` from parent to delivery
lists exactly those six paths; nothing under `review-inputs/`, `authority/`,
`registries/`, `spec/`, `schemas/`, `canonicalization/`, `conformance/`,
`generated/`, `evidence/`, `reference/`, `tooling/`, the R4 `probes/` directory or
the Release 3 preparation directory differs. The fixed input contains no link to
the handoff, as the handoff says, and validates standalone (Section 14). No pin
mismatch was found; `INPUT_INCOMPLETE` does not apply.

## 4. Governance inputs read

Read in the order `AGENTS.md` requires: `CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`,
`governance/ID-POLICY.md`, `governance/RFC.md`; then `spec/AGENTS.md`,
`conformance/AGENTS.md`, `spec/README.md`, `spec/profiles/README.md`, ADR-0032,
`registries/stability-tiers.yaml`, `registries/public-contract-surfaces.yaml`,
`registries/interpretation-bundles.yaml`, `registries/public-checks.yaml`,
`registries/reason-codes.yaml`, `registries/lifecycle-operations.yaml`, every
normative document under `spec/` and `canonicalization/` that the crosswalk cites
or that the reviewer found applicable (Section 6), every schema under `schemas/`
that the candidate names or reuses, the reference verifier's routing, resource,
projection and lifecycle modules, the steward acceptance, source result, opening
scope and review response at the parent, and the three preserved reviews.

## 5. Q1: retained model and exact formulas against the accepted scope

The accepted scope (steward acceptance, 2026-09-09; PR 246 source review; repair
confirmation) is: fixed-factor `2 x 2`, `n >= 2` per cell, independent
`N(0, sigma^2)` errors with one common finite `sigma > 0`, fixed cell means, three
full-model contrasts, each `F_j = nu * SS_j / SSE` central `F(1, nu)` under its own
null with the other effects and intercept unrestricted, `nu = 4(n-1)`, no interval,
no multiplicity, no randomization or historical-priority claim, no post-quantization
or conditional-on-admission calibration claim.

| Check                                  | Candidate text                                                                                               | Result                                                                                                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Factor/level orientation               | cells `00,01,10,11`; `A(x) = (-x00-x01+x10+x11)/2`, `B(x) = (-x00+x01-x10+x11)/2`, `AB(x) = x00-x01-x10+x11` | Identical to the source result: first index is the first factor, contrast is level-1 average minus level-0 average, `AB` is the unhalved difference in differences (N-1) |
| Full interaction retained              | "retain the full four-column model in each individual-null calculation"                                      | Matches the accepted nuisance-unrestricted derivation                                                                                                                    |
| Sample versus population               | `Delta_j = j(mu)`, `d_j = j(m)`; `m` sample cell means, `mu` fixed population means                          | Register is correct throughout; the readiness sentence updated in this input ("now covered by the bounded normal-model acceptance") is accurate                          |
| Nuisance-unrestricted individual nulls | "Under each null `Delta_j = 0` separately, the other contrasts and intercept remain unrestricted"            | Matches; verified by the reviewer probe (`P_A mu = 0`, `P_E mu = 0` for a mean vector with `Delta_A = 0`, `Delta_B`, `Delta_AB`, intercept all nonzero)                  |
| Shared denominator                     | "The three ratios share SSE; no joint guarantee is implied"                                                  | Matches the source review's boundary                                                                                                                                     |
| SS identities and `nu`                 | `SSA = n d_A^2`, `SSB = n d_B^2`, `SSAB = n d_AB^2/4`, `SSE` residual, `nu = 4(n-1)`, `F_j = nu SS_j / SSE`  | Re-derived in exact rational arithmetic for `n in {2,3,5,8}`, 20 random datasets each: 1,920 assertions including column orthogonality, `Y'Y = SS_0+SS_A+SS_B+SS_AB+SSE` |
| Coded coefficients                     | "Under -1/+1 coding, fitted coefficients are `d_A/2, d_B/2, d_AB/4`"                                         | Verified exactly (`beta_k = Y'v_k / N`)                                                                                                                                  |
| Tail definition                        | `p_j` = integral of the `F(1, nu)` density from the observed exact `F_j`                                     | Matches the accepted density; the density's normalization was numerically checked at `nu = 4, 8, 16` (informative, `1.000000`)                                           |
| Finite input versus exact `SSE = 0`    | "Exact SSE=0 gives no defined F or tail… even though all input values may be finite"                         | Correct as a mathematical statement; its representation is a draft-text decision (S-7)                                                                                   |
| Quantization/admission non-claims      | PROFILE-BTF-0002; "no exact post-quantization or conditional-on-admission statistical guarantee"             | Matches the steward acceptance                                                                                                                                           |
| New statistical assertion?             | none found                                                                                                   | Every retained probability statement is inside the confirmed S-A evidence split; the candidate does not attribute any probability proof to Tian/Styan; Yates is not used |

No retained claim exceeds accepted evidence. No requirement to obtain any further
paper arises from this candidate.

## 6. Q2: proposed clauses, one-owner allocation and the existing-ID crosswalk

**Allocation.** Contract owns model, targets, admissibility premises and exact
calculation (BTF-0001 to 0005); Profile owns the applicability assertion and the
non-claims (PROFILE-BTF-0001/0002); the new envelope and its digest binding are
`NRS-CORE` (0020/0021); the new check obligations are `NRS-VERIFY` (0029 to 0031).
This follows ADR-0032 and the PR 240/246-confirmed inventory. The CORE-0021 binding
is correctly additive: it reuses `urn:nomue:canonicalization:jcs:0.2.0-draft.1`,
`sha-256`, `record_without_integrity` and the `nomue/record-content/v1` tag exactly
as `record.schema.json`, `record-0.2.schema.json`, NRS-CORE-0006 and NRS-CANON-0022
define them, and excludes exactly the root `integrity` member.

**Availability.** At the parent, `NRS-CORE` ends at 0019, `NRS-VERIFY` at 0028,
`NRS-PCS` at 0013; no `BTF` token, `balanced-two-factor` string or
`https://nomue.ai/id/` identifier is registered anywhere under `registries/`,
`schemas/`, `spec/`, `canonicalization/`, `authority/`, `conformance/` or
`generated/` (the only occurrence is the informative note in
`spec/core/record-envelope.md`). The requirements meta-schema already accepts
`NRS-(CONTRACT|PROFILE)-[A-Z][A-Z0-9]{1,11}-NNNN`, so the two BTF namespaces are a
registry allocation as ADR-0032 intends. The `contract`, `profile`, `schema` and
`bundle` families and the kebab-case names are well-formed under ID-POLICY's
minting grammar; `0.1.0-draft.1` is an admissible opaque revision token.

**Crosswalk accuracy.** Every one of the 48 existing IDs in the crosswalk table
resolves to exactly the owning document the table names, with the tier the table
implies; no row is wrong. The problems are omissions and overlaps.

**Omitted applicable IDs (S-2).** The following active requirements bear on the
proposal and are absent from the crosswalk. CORE-tier entries are marked.

| ID                                          | Owner                                                          | Why it applies                                                                                                                                                      |
| ------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NRS-CANON-0006 (CORE)                       | `canonicalization/numerical-comparison.md`                     | Tolerance is owned by the check version, never a Record; the candidate's "comparison rule" hold is this clause's territory                                          |
| NRS-CANON-0009 (CORE)                       | `canonicalization/phase-1-numeric-model.md`                    | Parsed binary64 authority for recomputation; its wording is "Phase 1 and Phase 2", so the successor check needs its own binding (S-5)                               |
| NRS-CANON-0010 (CORE)                       | same                                                           | Source-decimal fidelity not asserted; governs what "one finite outcome" may mean                                                                                    |
| NRS-CANON-0011 (CORE)                       | same                                                           | A supported-domain threshold is normative only when owned by a versioned check with conformance evidence; this is the rule the "supported domain" hold must satisfy |
| NRS-CANON-0003 / 0004                       | same                                                           | Finite binary64 domain and signed zero, both phase-qualified to "the Phase 1 profile"; the BTF payload's `outcome_value` needs the successor equivalent             |
| NRS-VERIFY-0013 (CORE)                      | `spec/verification/profile-admissibility-check.md`             | Admissibility and computability are distinct checks; VERIFY-0029 restates it (S-3)                                                                                  |
| NRS-VERIFY-0017 (CORE)                      | same                                                           | Admissibility failure makes dependent checks `not_run` with the blocking reason; the candidate lists "dependency not_run semantics" as open (S-4)                   |
| NRS-VERIFY-0020 (CORE)                      | `canonicalization/numerical-comparison.md`                     | A positive p-value and zero are distinct; applies to `p_j` comparison                                                                                               |
| NRS-VERIFY-0021 (CORE)                      | `spec/verification/welch-computability-check.md`               | Numerical p-value zero from finite inputs is underflow, never exact zero; wording is not Welch-specific and governs the "underflow" hold                            |
| NRS-VERIFY-0026                             | same                                                           | Precedent that a non-representable squared intermediate is an explicit refusal; the `F` overflow hold has the same shape                                            |
| NRS-VERIFY-0002 (CORE), NRS-SEC-0001 (CORE) | `spec/core/verification-principles.md`                         | Scope-bound output; offline-by-default; both preserved by the new report and dispatch, and worth listing beside VERIFY-0001/0003/0004                               |
| NRS-CORE-0009 (CORE)                        | `spec/profiles/independent-two-group-continuous/non-claims.md` | "Declaration truth is not asserted" is worded generally and is bound to NRS-PCS-0009 and 0011; PROFILE-BTF-0002 duplicates it (S-3)                                 |
| NRS-CORE-0013 to 0019                       | `spec/core/record-lifecycle.md`                                | The lifecycle axis set is generic; the `profile_eligibility` axis needs a named carrier check for the new bundle (N-4)                                              |
| NRS-PROV-0001                               | `spec/core/provenance-model.md`                                | Result to analysis to design to dataset local references; the proposed payload satisfies it and should say so                                                       |
| NRS-VERSION-0001 (CORE)                     | `spec/core/versioning-principles.md`                           | Immutable content-addressed snapshots; unaffected, but the candidate cites 0002 without 0001                                                                        |

**Overlaps (S-3).** PROFILE-BTF-0002 "Assert neither declaration truth,
distributional validity, causality, scientific validity, multiplicity control nor
statistical calibration…" restates NRS-CORE-0009 (declaration truth) and
NRS-VERIFY-0003 (scientific validity) inside a new EXPERIMENTAL ID. VERIFY-0029
"Keep structural conformance, declared-design admissibility, numerical computability
and quantity comparison separately scoped; never combine them into an overall
verification verdict" restates NRS-VERIFY-0005, NRS-VERIFY-0013 and NRS-VERIFY-0001,
all CORE. AUTHORITY.md's one-owner rule and ID-POLICY rule 4 mean a new ID should
carry only the new meaning: for BTF-0002 the distributional-model, multiplicity and
post-quantization non-claims; for VERIFY-0029 the fourth separation (quantity
comparison as a distinct scope) if that is genuinely new, otherwise the row should
be replaced by crosswalk entries.

**Missing requirements the inventory does not list.** Beyond the crosswalk, the
candidate's own scope implies clauses or decisions it does not yet write down:
the applicability-declaration design and its admissibility disposition (S-6), the
zero-SSE representation rule (S-7), the per-contrast evidence scope (S-9), the
lifecycle carrier (N-4), the numeric constraints on declared result members (N-3),
the reason codes for the new structural admissibility failures (N-5) and the
bundle's pinning of the Contract identifier (N-6).

## 7. Q3: proposed payload, identifier grammar and the RFC draft gate

**Local references and uniqueness.** `dataset_id`, `design_id`, `analysis_id`,
`result_id`, `cell_id`, `factor_id`, level IDs, `observation_id` and
`experimental_unit_id` are producer-assigned local identifiers under ID-POLICY's
instance-identifier rule; the candidate binds them within the Record only, which
matches NRS-PROV-0001 and the ITGC `localId` precedent. The Cartesian-cover rule for
cells, the exactly-once `factor_order`, and "resolve each declared cell exactly
once; no array-order pairing shortcut" are stated. Whether level IDs must be unique
across factors or only within a factor is not stated (N-1).

**Declaration ownership (S-6).** The payload carries one
`model_applicability_declared` member under `design`, and PROFILE-BTF-0001 makes it
the producer's assertion that the Contract premises apply. This is a different
design from the ITGC 0.2 precedent (NRS-PCS-0009: structured `declarations` and
`data_handling` objects whose unsupported values are structurally representable and
fail admissibility with a specific reason code). Under the proposed payload, a
clustered, repeated-measure, transformed, weighted, imputed or subset-population
design is not declarable at all, so the candidate's sentence "a
declaration-admissibility check handles structurally representable unsupported
designs" covers only cell and unit structure. That is a legitimate bounded choice
if disclosed, but the candidate presents it as if the ITGC admissibility pattern
carried over. The type and value domain of `model_applicability_declared`, and what
happens on a false or absent assertion, are also unstated.

**Direct Contract binding and result scoping.** `analysis.contract_id` follows
ADR-0032 §1; no `method_id` is minted; the old `urn:nomue:method:*` identifiers are
untouched. Result scoping to `result_id` is stated; per-contrast scoping is not
(S-9).

**ID grammar, namespaces, numbers, versions, bundles, aliases.** All well-formed and
available (Section 6). The HTTPS bundle identifier is treated as an exact new
registry entry, and the candidate says no operational bundle can be registered
before the check list closes, which is right under NRS-VERSION-0004. No legacy
alias is created: the canonicalization identifier stays the exact legacy `urn`, and
the candidate says so.

**Draft gate.** `governance/RFC.md` Stage 1 requires "motivation, exact artifact
changes, affected Requirement IDs (existing and new), stability tier of the
affected material, migration impact, and… the evidence record and its disposition".
Motivation, clause text, new IDs, tier reasoning, migration statement and evidence
disposition are present. "Exact artifact changes" is met for the spec clauses and
registry allocations but not for the three schemas or the registry entries that
bind them: the payload is a member list, not a schema, and the candidate says so.
Concretely missing before the draft can be read as exact:

1. the coupled meta-schema changes and their owners (S-1);
2. the `model_applicability_declared` type, domain and disposition (S-6);
3. the zero-SSE representation rule for `f_statistic` and `p_value` (S-7);
4. the per-contrast evidence scope (S-9);
5. the numeric constraints on declared members (N-3);
6. the reason codes for structural admissibility failures (N-5);
7. whether the new report adds `guarantee_boundary` keys for the new non-claims
   (N-2).

None of these requires a closed numerical procedure, a chosen graph, a tolerance,
a supported domain or an implementation. They are draft text. The reviewer's
judgment is therefore that the gate is not yet met at this fixed input, that it can
be met by prose repairs, and that the numerical holds proper (Section 10) may
remain open when it is.

## 8. Q4: additive compatibility, inspected against the actual artifacts

| Claim                                         | Inspected                                                                                                                                                                   | Result                                                                                                                                                                                                                                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Old Record constants and payloads unchanged   | `record.schema.json`, `record-0.2.schema.json`: `$schema` and `profile_id` are per-schema constants; `interpretation_bundle_id` is deliberately not a constant              | A new schema with its own constants and payload `$ref` is additive; the 0.2 schema was added the same way                                                                                                                                                                                          |
| Strict-input priority                         | NRS-CANON-0023 fixed order; `parseStrictJson` and `routeParsedInput` run before any bundle schema                                                                           | Unchanged by a new bundle; the candidate correctly says global pre-routing ordering is not reopened                                                                                                                                                                                                |
| Digest coverage and canonicalization identity | `integrity.digest_scope = record_without_integrity`; NRS-CORE-0006 informative projection; NRS-CANON-0020/0022 tag and formula                                              | CORE-0021 proposes the same exclusion; all payload members covered; same identifier, no alias                                                                                                                                                                                                      |
| Scoped outcomes and execution/outcome model   | `execution-outcome-0.2.schema.json`: `checkResult.check_id` pattern `^urn:nomue:check:…`, `scope.kind` enum `record/record_revision/analysis/result`                        | A new report schema is needed for HTTPS check identifiers, as the candidate says; it also needs its own check-result definitions, and any per-contrast scope needs a new kind (S-9). `verification-report-0.2` fixes five `guarantee_boundary` constants (N-2)                                     |
| Refusal shape                                 | `verifier-refusal-0.2-draft-3.schema.json`; `isDeclarableBundleId` accepts any `scheme:` URI                                                                                | Reusable unchanged; an HTTPS `declared_bundle_id` is representable; the refusal kinds contain nothing numerical, consistent with the candidate's "do not map zero SSE to a global safety refusal"                                                                                                  |
| Routing and bundle dispatch                   | `routing-envelope-0.2.schema.json`; `BUNDLE_RUNNERS` keyed by exact string; `resources.ts` asserts each implemented bundle is registered                                    | Additive: a new runner and a new registry entry; no proximity inference exists to break                                                                                                                                                                                                            |
| Historical conformance                        | `conformance/manifest.yaml` pins per-fixture check IDs and projection hashes; NRS-VERSION-0006                                                                              | Unaffected by a new bundle; the candidate's fixture list is appropriate                                                                                                                                                                                                                            |
| Registries accept the proposal                | `schemas/meta/interpretation-bundles.schema.json`: `bundle_id` `^urn:nomue:bundle:`, `profile_id` `^urn:nomue:profile:`, requirement IDs fixed to ten prefixes              | **Not additive as written.** The proposed HTTPS bundle and profile identifiers and the BTF requirement IDs are rejected by the current authoritative meta-schema (S-1)                                                                                                                             |
| Same for surfaces, checks, reason codes       | `public-contract-surfaces.schema.json`, `public-checks-registry.schema.json` (also `comparison_constants` method `^urn:nomue:method:`), `reason-codes-registry.schema.json` | Their `requirement_ids` patterns lack the `(CONTRACT\|PROFILE)-<TOKEN>` branch; the check registry's `scope_kind` enum has no per-contrast kind. All four are `class: authoritative` in the manifest's `json-structure` target, so changing them is an RFC-scope schema change with fixtures (S-1) |
| Lifecycle                                     | `reference/verifier/src/lifecycle.ts` derives `profile_eligibility` from check IDs containing `itgc-profile-admissibility` or `itgc-preconditions`                          | Reference-level, but NRS-CORE-0016's axis semantics need a named carrier for the new bundle (N-4)                                                                                                                                                                                                  |

Required coupled changes or owners the candidate does not list: the four
meta-schemas above; a check-result/evidence definition for the new report (either
a new common schema or inline definitions); `schemas/README.md`; the reference
`resources.ts` schema file list and validators (the candidate does list "reference
dispatch and schema loader"); the lifecycle carrier mapping. The candidate's own
list (spec files and `spec/README.md`, authority manifest, requirement registry,
three schemas, surface and bundle registries, checks and reason codes, conformance
manifest, fixtures, expectations, generated views) is otherwise complete.

**Surface classification (S-8).** NRS-PCS-0001's note says "The envelope is
field-identical across all registered bundles" and its `applies_to_bundle_ids`
lists every bundle; when the 0.2 Record schema was added, PCS-0001 gained
`schema_refs` and applicability, and new surfaces (0009/0010) were minted only for
the payload. The candidate instead mints NRS-PCS-0014 for "the existing envelope
member names, new schema/profile constants and a new closed payload reference" while
treating NRS-PCS-0006 (integrity, which also resolves in `record.schema.json`)
additively. Either the envelope stays under PCS-0001 with additive applicability and
PCS-0014 covers the payload, or the candidate justifies why the envelope surface is
duplicated and how PCS-0001's note survives.

## 9. Q5: highest affected tier

Independent reading of every clause the proposal touches:

- Preserved without meaning change: all 48 crosswalked IDs, including the 22 CORE
  ones, provided the repairs below are made as successor text.
- NRS-CORE-0004 (CORE) enumerates "Record, revision, schema, profile, bundle,
  method, and check identifiers". Contract identifiers are not in that list.
  ID-POLICY says implicit dereference "remains prohibited by NRS-CORE-0004; this
  policy adds no new meaning to that clause", but a reader of the clause alone will
  not find `contract_id` covered. Widening the enumeration would be a CORE wording
  change. The successor clause (CORE-0020 or a companion) should itself state that
  the Contract identifier is an identifier and is never dereferenced (S-5).
- NRS-CANON-0009 (CORE) binds parsed binary64 authority for "Phase 1 and Phase 2"
  recomputation. Editing it is a CORE change; a successor binding in VERIFY-0030's
  text is not (S-5).
- NRS-VERIFY-0017 (CORE) already fixes the dependency semantics the candidate lists
  as needing "their own closed versioned specification". Preserving it is free;
  reopening it is CORE (S-4).
- The meta-schema pattern widening (S-1) implements ADR-0032's stated consequence
  and ADR-0031's grammar; it is a structural change to authoritative artifacts
  without a requirement tier of its own and does not raise the highest tier.
- New surfaces NRS-PCS-0014 to 0016 at STABLE-INTENT, additive applicability on
  PCS-0006/0012/0013 (all STABLE-INTENT), CORE-0020/0021 and VERIFY-0031 at
  STABLE-INTENT: adequately justified as external representation. The EXPERIMENTAL
  classification of the Contract, Profile and VERIFY-0029/0030 clauses is justified
  for material under attempted falsification.

Decision: highest affected tier **STABLE-INTENT**, minimum 30 calendar days per
`registries/stability-tiers.yaml`, conditional on S-4 and S-5 being resolved as
successor clauses. If the author instead amends CORE-0004, CANON-0009 or VERIFY-0017,
the highest tier is CORE with its 60-day window and named-steward decision. No
clock starts with this review.

## 10. Q6: numerical implementation holds, one at a time

| Hold                                         | Opening gate                                                                                                                | Decision gate                                                                         | Implementation gate | Decision-bearing before opening?                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------ |
| SS/SSE/F operation graph                     | Meaning fixed as exact identities; the graph is not part of the meaning                                                     | Must be closed before a check version is issued                                       | yes                 | No                                                                 |
| `F` tail procedure (PR 190 restricted route) | Meaning fixed as the `F(1, nu)` upper-tail integral; PR 190 (open draft, head `5962cc2d…`) is correctly called exploratory  | Must be closed with independent oracle evidence                                       | yes                 | No                                                                 |
| Zero SSE                                     | Meaning fixed (no defined `F`); the **representation** of such a Record is a schema decision the discussion must see        | Refusal versus not-computable disposition and reason code belong to the check version | yes                 | **Partly**: the representation rule (S-7), not the procedure       |
| Overflow, underflow, subnormal values        | NRS-VERIFY-0021 (CORE) already fixes underflow meaning; NRS-VERIFY-0026 is the overflow precedent                           | Exact classification per check version                                                | yes                 | No, once crosswalked (S-2)                                         |
| Uncertain comparisons / comparison rule      | NRS-CANON-0006 (CORE) fixes the owner                                                                                       | Tolerances per check version with test vectors                                        | yes                 | No                                                                 |
| Check dependency ordering and reason codes   | NRS-VERIFY-0017 (CORE) and the registry `depends_on` mechanism already fix propagation; ordering follows the ITGC precedent | Reason-code names and applicability lists                                             | yes                 | Names are draft text (N-5); semantics are not open (S-4)           |
| Supported domain and endpoints               | NRS-CANON-0011 (CORE) requires a versioned check to own any threshold; the Contract's `n >= 2` is mathematics, not a domain | Domain, endpoints and evidence per check version                                      | yes                 | No                                                                 |
| Platforms and execution predicates           | Supported-execution evidence is a decision/implementation matter (NRS-CORE-0012 keeps it separate from accuracy)            | Pinning and admission evidence                                                        | yes                 | No                                                                 |
| Per-quantity evidence scope                  | VERIFY-0031 promises separate evidence per quantity; the scope vocabulary has no such kind                                  | Meta-schema or evidence-structure choice                                              | partly              | **Yes** as draft text (S-9): it changes what the report surface is |

No hold postpones an unacknowledged scientific premise or widens the accepted
model. No hold is waived here because the candidate labels it implementation; two
are reclassified as draft-text decisions. Finished implementation is not required
for opening. No numerical rerun was needed to reach any of these conclusions.

## 11. Q7: Release 3 reconciliation

- Both pinned blobs (`4dbb5170…`, `bc0bb942…`) resolve at the parent and match the
  candidate's statement.
- `origin/main` equals the parent; there is no intervening change to report.
- Actual shared interfaces: a search of `registries/`, `schemas/`, `spec/`,
  `canonicalization/`, `authority/` and `conformance/` for `release-3`,
  `multigroup`, `protected-family` and `R3-` finds nothing; the Release 3 RFC draft
  is prose and defines no payload member names, so "no R3 field spelling is
  imported" holds trivially. No issued or candidate R3 procedure, identifier or
  schema exists for the candidate to depend on.
- The R3 README's "Release 4 handoff" section calls its findings "evidence reuse,
  not automatic Release 4 adoption" and imposes no calendar ordering; the readiness
  audit contains no Release 4 condition.
- This is a main-tree interface comparison at `0abdca8f…`, not an audit of every R3
  research branch, and it does not claim the R3 progress table is current. No real
  dependency requiring another review exists at this baseline. Rechecking main
  immediately before any opening remains necessary, as the candidate says.

## 12. Q8: separate dispositions

| Item                       | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R4-P1 source/derivation    | Bounded accepted evidence correctly carried; no new claim exceeds it; S1/S2/P1/S3/S4/S6 remain staged, S5 nonblocking for the bounded claim only, none closed. Nothing to add                                                                                                                                                                                                                                                                                                                                                   |
| R4-P2 scope                | Accepted bounded scope reproduced exactly; exclusions stated as scope bounds, not invalidity findings. Nothing to add                                                                                                                                                                                                                                                                                                                                                                                                           |
| R4-P3 numerical            | Exploratory evidence correctly characterized; holds correctly enumerated; two holds reclassified as draft text (S-7, S-9). Implementation gate open, as it may be at opening                                                                                                                                                                                                                                                                                                                                                    |
| R4-P4 Release 3            | Reconciled at this baseline; no dependency; no further review required now                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| R4-P5 clauses/IDs/surfaces | Proposal present and mostly sound; not complete: S-1 to S-9 and N-1 to N-6 are repairs to this item. P5 stays open                                                                                                                                                                                                                                                                                                                                                                                                              |
| Retained source claims     | None beyond accepted evidence; no source review requested or performed; no PDF certified                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Numerical support          | Not established and not claimed; expected values will need independent oracles, not reference code                                                                                                                                                                                                                                                                                                                                                                                                                              |
| R4-P6 public opening       | **`NOT_READY`** at this fixed input. Preparation `GO` (bounded). Opening `GO` withheld because the `SHOULD-FIX` items are draft-text gaps the RFC Draft stage requires closed; none is a scientific blocker and none needs implementation. After a repaired candidate is re-pinned, a bounded confirmation of the repaired text is the remaining review step before the user's conditional authorization could be exercised with an issue URL, opening time, tier (STABLE-INTENT if Section 9 holds) and earliest decision date |

A bounded historical GO and passing tooling did not decide this review.

## 13. Findings

Review claims (what was observed) and requested repairs (what the author could
change) are kept distinct within each finding.

### BLOCKER

None.

### S-1 (`SHOULD-FIX`) - four authoritative meta-schemas are missing from the coupled-change list

Observed: `schemas/meta/interpretation-bundles.schema.json` restricts `bundle_id`,
`profile_id` and `canonicalization_version` to `urn:nomue:` patterns and requirement
IDs to ten fixed prefixes; `public-contract-surfaces.schema.json`,
`public-checks-registry.schema.json` and `reason-codes-registry.schema.json` restrict
requirement IDs the same way and the check registry's `scope_kind` and
`comparison_constants` method pattern are closed; `execution-outcome-0.2` restricts
`check_id` to `urn:nomue:check:`. All are `class: authoritative` (`json-structure`).
The candidate's "eventual coupled change" list names none of them, and its sentence
"the reference schema loader and registry validator are eventual tooling changes"
would be read as covering them.

Requested: add the meta-schema changes (HTTPS grammar for bundle/profile/check
identifiers, the `(CONTRACT|PROFILE)-<TOKEN>` branch, any new scope kind, an optional
Contract pin on bundle entries) to the coupled-change list as authoritative schema
changes with positive and negative validation fixtures, and name `schemas/README.md`,
the report's check-result definitions and the lifecycle carrier mapping alongside.

### S-2 (`SHOULD-FIX`) - crosswalk omits fourteen applicable existing IDs

Observed: Section 6 table. Six are CORE (CANON-0006/0009/0010/0011, VERIFY-0013/0017,
VERIFY-0020/0021, VERIFY-0002, SEC-0001, CORE-0009, VERSION-0001) and two are
phase-qualified numeric-domain clauses whose successor equivalent the new Profile
needs (CANON-0003/0004).

Requested: add rows with the same "required treatment" discipline, stating for each
whether it is preserved as-is, needs a successor binding, or is the owner of a hold.

### S-3 (`SHOULD-FIX`) - two proposed clauses restate CORE meaning

Observed: PROFILE-BTF-0002 restates NRS-CORE-0009 and NRS-VERIFY-0003; VERIFY-0029
restates NRS-VERIFY-0001/0005/0013.

Requested: narrow each to its new content (distributional-model, multiplicity and
post-quantization non-claims; quantity-comparison scope if new) and bind the rest by
crosswalk, so each meaning has one owner.

### S-4 (`SHOULD-FIX`) - "dependency not_run semantics" is already fixed by a CORE clause

Observed: the candidate says final ordering, "dependency not_run semantics and
concrete reason codes require their own closed versioned specification".
NRS-VERIFY-0017 (CORE) and the check registry's `depends_on` mechanism already fix
propagation.

Requested: say that VERIFY-0017 is preserved and that only the new checks' concrete
dependency edges, their order among themselves and their reason codes are open.
This also removes a latent CORE-tier exposure (Section 9).

### S-5 (`SHOULD-FIX`) - successor clauses should carry the no-dereference and binary64 bindings

Observed: NRS-CORE-0004's enumeration omits Contract identifiers; NRS-CANON-0009 is
worded for Phase 1 and Phase 2.

Requested: have CORE-0020 (or a companion) state that `contract_id` is an identifier
and is never dereferenced, and have VERIFY-0030 (or a companion) bind parsed binary64
values as the recomputation input authority for the new check, without editing the
two CORE clauses.

### S-6 (`SHOULD-FIX`) - the applicability-declaration design departs from the ITGC precedent without saying so

Observed: Section 7. One `model_applicability_declared` member replaces structured
declarations; excluded designs are not declarable; type, domain and disposition are
unstated.

Requested: state the choice explicitly (single assertion versus structured
declarations), its consequence for what the admissibility check can and cannot
refuse, the member's type and value domain, and the disposition and reason code for
a false or absent assertion.

### S-7 (`SHOULD-FIX`) - the zero-SSE representation rule is a draft decision, not only a numerical hold

Observed: each contrast "has… f_statistic and p_value"; exact `SSE = 0` yields no `F`.
The ITGC 0.2 precedent makes a zero standard error structurally unrepresentable
(`exclusiveMinimum: 0`).

Requested: choose and write the representation rule (required members, so such a
Record is not representable; or optional members with a stated admissibility or
computability disposition), leaving the numerical classification of near-zero and
rounded-to-zero SSE as the hold it is.

### S-8 (`SHOULD-FIX`) - envelope surface classification contradicts the PCS-0001 precedent

Observed: Section 8, last paragraph.

Requested: either give PCS-0001 additive applicability and `schema_refs` for the new
Record schema and confine PCS-0014 to the payload, or justify duplicating the envelope
surface and revise PCS-0001's note.

### S-9 (`SHOULD-FIX`) - per-contrast evidence has no scope vocabulary

Observed: VERIFY-0031 promises separate evidence per quantity; `scope.kind` is
`record/record_revision/analysis/result` in both the execution-outcome schema and the
check-registry meta-schema; the proposed report is otherwise unspecified.

Requested: decide and write whether the three contrasts are evidence entries under a
`result`-scoped check (mismatch entries carrying the contrast kind) or whether a new
scope kind is minted, and list the consequence under S-1.

### N-1 (`NICE-TO-HAVE`) - state the orientation mapping and level-ID uniqueness in the clause

BTF-0001 should say that the first factor in `factor_order` is factor A, the first
level in each `level_order` is level 0, and that a signed contrast is the level-1
average minus the level-0 average; the payload prose implies it. Say whether level
IDs must be unique across factors or only within a factor.

### N-2 (`NICE-TO-HAVE`) - guarantee-boundary keys of the new report

`verification-report-0.2` fixes five `not_asserted` constants. Say whether the new
report adds keys for the new non-claims (multiplicity control, post-quantization
calibration) so PROFILE-BTF-0002 is visible in the report surface.

### N-3 (`NICE-TO-HAVE`) - numeric constraints on declared members

State the intended structural constraints: `n` integer at least 2 with a safe maximum,
`residual_degrees_of_freedom` integer equal to `4(n-1)` (or declared and compared),
`residual_sum_of_squares` and `sum_of_squares` non-negative, `p_value` in `[0, 1]`,
all numbers finite. These are schema text, not tolerances.

### N-4 (`NICE-TO-HAVE`) - name the lifecycle `profile_eligibility` carrier

NRS-CORE-0016's axis set applies to every Record; name which BTF check carries
`profile_eligibility` (the declared-design admissibility check) so the reference
derivation and any state view have a registered carrier.

### N-5 (`NICE-TO-HAVE`) - reason codes for the new structural admissibility failures

The fixture list (identity mismatch, level reversal, factor swap, unequal cells,
duplicate units, unknown properties) implies reason codes the inventory does not name.
List candidate names; their applicability lists and registry entries remain coupled
work.

### N-6 (`NICE-TO-HAVE`) - bundle pinning of the Contract identifier

NRS-VERSION-0004 requires a bundle to pin schema, canonicalization, profile,
public-check and attestation state; the registry has no Contract field. Say whether
the new bundle entry pins the Contract identifier (recommended, so the exact
Contract revision is part of the interpretation tuple).

## 14. Validation record

Environment: Node v22.22.2, pnpm 11.7.0, Python 3.11.15, git 2.43.0,
`pnpm install --frozen-lockfile` on the delivery tree.

| Check                  | Delivery tree at `6adfc8a0…`                                                                                | Fixed input tree `2f9286c1…` at `98187a14…`                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `pnpm format:check`    | pass                                                                                                        | pass (direct `prettier --check .`)                                              |
| `pnpm lint:markdown`   | pass (400 files, 0 issues)                                                                                  | pass (399 files, 0 issues; direct `markdownlint-cli2`)                          |
| `pnpm typecheck`       | pass                                                                                                        | pass (direct `tsc --noEmit`)                                                    |
| Repository validation  | `pnpm validate`: pass                                                                                       | `node --import tsx tooling/src/validate.ts`: pass (standalone, no handoff link) |
| Generated drift        | `pnpm check:generated`: pass (19 files)                                                                     | `node --import tsx tooling/src/generate.ts --check`: pass (19 files)            |
| `git diff --check`     | clean (input to delivery)                                                                                   | clean (parent to input)                                                         |
| Aggregate `pnpm check` | not run; no authoritative, schema, registry, conformance, reference, generated or evidence artifact changed | not run; same reason                                                            |

Which ran through the pnpm wrapper and which ran directly is disclosed above. The
input tree was validated by checking out `98187a14…` in the main clone (a git
worktree with a symlinked `node_modules` trips the private-dependency audit on its
own `.git` file and symlink, which is an artifact of that setup, not of the input).
No numerical repository probe was rerun. The reviewer probe (Section 5) is
informative and is not committed.

After adding this review file, the same five checks and `git diff --check` were
re-run on the review branch; the result is recorded in the review pull request.

## 15. Bounded verdict

| Item                                  | Disposition                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Fixed input `98187a14…` (five files)  | Preparation **`GO`** (bounded); S-1 through S-9 to repair before the candidate is re-pinned for opening                  |
| Delivery commit `6adfc8a0…` (handoff) | Validated; accurate description of input, pins, preserved evidence and the input-versus-delivery distinction             |
| Retained model and formulas           | Match accepted scope; no new statistical assertion; identities re-derived exactly                                        |
| Clauses, allocation, crosswalk        | Allocation sound; overlaps and omissions named; no wrong row                                                             |
| Payload and identifiers               | Grammar, availability, exact-bundle and no-alias rules satisfied; draft gate not yet met for schemas; missing text named |
| Additive compatibility                | Confirmed for Record, report, refusal, routing, digest, dispatch, historical conformance; meta-schema coupling missing   |
| Highest affected tier                 | STABLE-INTENT, at least 30 days, conditional on S-4/S-5 as successor clauses; otherwise CORE                             |
| Numerical holds                       | No hidden premise; two draft-text decisions (S-7, S-9); the rest are implementation or decision gates                    |
| Release 3                             | Verified; no dependency; no intervening main change                                                                      |
| R4-P1 to P4                           | Carried accurately; unchanged                                                                                            |
| R4-P5                                 | Open; repairs listed                                                                                                     |
| R4-P6 public opening                  | **`NOT_READY`**; no opening GO; no clock                                                                                 |
| S1-S6, P1, NIST/LAPACK, Yates         | Unchanged; staged as accepted; nothing closed or reopened                                                                |

RELEASE 4 ASSEMBLED OPENING CANDIDATE REVIEW COMPLETE - INPUT MATCH - MAIN UNCHANGED - PREPARATION GO WITH NINE SHOULD-FIX DRAFT-TEXT REPAIRS - NO UNSUPPORTED CLAIM - NO NEW SOURCE REQUIREMENT - TIER STABLE-INTENT CONDITIONAL - NO HOLD CLOSED - NOT AN OPENING GO - NOT READY TO OPEN - NEW-SESSION REVIEW DISCLOSED - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
