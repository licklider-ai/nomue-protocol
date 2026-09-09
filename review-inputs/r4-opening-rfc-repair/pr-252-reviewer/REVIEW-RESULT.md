# Release 4 Opening Proposal Repair - Confirmation by the PR 252 Reviewer

**Status: informative same-session repair confirmation; non-normative; not adopted.**

## 1. Verdict

| Dimension                          | Result                                                                                                                                                                                                                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input integrity                    | **`MATCH`**: repaired input, sole parent, tree and all six blobs match the handoff; the delivery adds the handoff and a two-line README link only; `origin/main` is still the authority baseline `0abdca8f…` (Section 3)                                                                                   |
| Preservation                       | **`INTACT`**: both copied reviews are byte-identical to their original commits; the formula fence is byte-identical to the reviewed candidate; every accepted review, probe, source record, authoritative artifact, the original handoff and both Release 3 files are unchanged (Section 3)                |
| PR 252 S-1 to S-9                  | **`CONFIRMED`** (nine of nine) at the repaired text, with one remaining boundary defect that the repairs expose rather than introduce (R-1) (Section 5)                                                                                                                                                    |
| PR 252 N-1 to N-6                  | **`CONFIRMED`** (six of six) (Section 5)                                                                                                                                                                                                                                                                   |
| PR 251 S-1, S-2, N-1, N-2          | **`CONFIRMED`** (four of four) (Section 5)                                                                                                                                                                                                                                                                 |
| Self-correction of PR 252          | Two PR 252 statements were over-broad and the author's adjudication is right: NRS-VERIFY-0020 and NRS-VERIFY-0021 are check-scoped by their registry notes, and PR 252's "fourteen" counted table rows, not IDs (Section 5)                                                                                |
| Meta-schema changes                | **`VERIFIED`** against the four authoritative files: fields, grammar, legacy preservation, snapshot/version treatment, optional Contract pin, fixtures and tooling coupling are named; one fifth authoritative registry is wrongly declared out of scope (R-1) (Section 6)                                 |
| Distinct checks and propagation    | **`PRESERVED`**: VERIFY-0013/0017 stated as fixed; successor no-dereference, parsed-binary64, provenance and security bindings are new clauses, not widenings of CORE-0004, CANON-0009, PROV-0001 or SEC-0002 (Section 7)                                                                                  |
| New representation choices         | **`SOUND`**: boolean assertion, count and df bounds (arithmetic verified), strictly positive declared SSE with required F/tails, exact-zero disposition, sign and range rules, orientation changes; one classification boundary differs from the ITGC precedent without disclosure (R-1) (Section 8)       |
| Report scope and surfaces          | **`SOUND`**: keys are unambiguous and complete, no ITGC common definition is widened, eight guarantee keys explicit, incomplete execution cannot emit numerical success, PCS-0001 precedent adopted, lifecycle carrier bound; two precedent departures worth a sentence (R-2, R-3) (Section 9)             |
| Allocation, IDs, tier, draft gate  | One owner per meaning; all sixteen proposed IDs available at the baseline; highest tier **`STABLE-INTENT`**, at least 30 days; the RFC draft gate is met except for R-1 (Section 10)                                                                                                                       |
| Source, model, formulas, Release 3 | **`PRESERVED`**: no new retained premise; accepted evidence split, source-copy acceptance and staged holds unchanged; Yates not relied upon; R3 pins match (Section 11)                                                                                                                                    |
| Findings                           | 0 `BLOCKER`, 1 `SHOULD-FIX`, 2 `NICE-TO-HAVE` (Section 13)                                                                                                                                                                                                                                                 |
| Validation                         | fixed input tree `d21f634c…` and delivery tree `cea3f5aa…`: format, Markdown lint, typecheck, repository validation, generated-drift and `git diff --check` all pass (Section 14)                                                                                                                          |
| Opening                            | Preparation **`GO`** (bounded). Opening **`NOT_READY`** at this fixed input by one prose repair (R-1); after that repair is pinned and confirmed, this reviewer knows of no remaining draft-text or scientific condition for the steward's conditional opening authorization at STABLE-INTENT (Section 12) |
| Independence                       | Same session and model as PR 252; this is a repair confirmation by the original reviewer, not a second independent investigator; PR 251's separate limits are untouched (Section 2)                                                                                                                        |

## 2. Independence, roles and boundary

- **Commission.** `governance/drafts/release-4-preparation/opening-rfc-repair-confirmation.md`
  at delivery commit `40e723d30c1e235591b0795d8c4535639ff4fc32` (blob `16bb4c38…`),
  reached through the branch locator `research/r4-opening-rfc-candidate`, which
  pointed at that commit when fetched on 2026-09-09. The user supplied the handoff
  link in the task message. The handoff is a later author-side instruction and is
  not part of the six-file input.
- **Reviewer.** The same Anthropic model and session that produced PR 252:
  `claude-fable-5-1`, Claude Code remote session `session_01SzjSXxurxni5pxpcqPCTnk`
  (container CLI 2.1.266, `anthropic_cloud`). At the start of this session the
  service reported both `session_context.model` and
  `external_metadata.last_served_model` as `claude-fable-5-1`; that reading was not
  repeated for this confirmation. Exact model-build identity is not available as
  authenticated runtime metadata.
- **Prior involvement.** Full. This session authored PR 252 and therefore reviewed
  the parent candidate, the handoff, the accepted evidence and the repository. It had
  not read PR 251, the repaired candidate or the response before this confirmation.
  This is a same-session repair confirmation, reported as such per the handoff. It
  is not a second independent scientific investigator, and model separation from the
  OpenAI-assisted author does not establish human-investigator independence.
- **Author and other reviewer.** The candidate, response and handoff record OpenAI
  Codex assistance in the existing authoring context. PR 251 records OpenAI Codex in
  a new task conversation and discloses that different-model or different-provider
  independence from the author is not established. Those limits are preserved here
  and are not conflated with this session's.
- **Assistance.** No other model, service or person. Code executed: the repository's
  tooling (Section 14), git object inspection and one short integer-arithmetic check
  of the proposed count and degrees-of-freedom ceilings. PR 251's structural probe
  was not rerun; the author reproduced its output hash and no remaining finding
  depends on it.
- **Source access.** No PDF or source copy was received or requested; nothing is
  certified about any copy. No source acquired, no external message sent.
- **Not performed.** No edit to any candidate, spec, registry, schema, probe, source
  or accepted review; no identifier allocation, merge, ratification, discussion
  clock, Release 3 change or steward decision.

## 3. Exact identity, preservation and main

| Object                                             | Handoff value | Observed                                                   |
| -------------------------------------------------- | ------------- | ---------------------------------------------------------- |
| Repaired input                                     | `60a7caf0…`   | `60a7caf05ebb4812e367a48c70621f092c26fedb`                 |
| Sole parent (PR 252 review delivery)               | `6adfc8a0…`   | `6adfc8a0080e30ce7634a5912c4dbb32e97ecd17`                 |
| Input tree                                         | `d21f634c…`   | `d21f634c7964581fad2bbc1f3bacc4b6eb4f8135`                 |
| Authority/main baseline                            | `0abdca8f…`   | `0abdca8f822d0de3faf35f218f762a951fd75e9e`                 |
| `opening-rfc-candidate.md`                         | `4446e910…`   | match                                                      |
| `opening-rfc-review-response.md`                   | `f54dfece…`   | match                                                      |
| `README.md`                                        | `e2d47a5b…`   | match                                                      |
| `public-discussion-readiness.md`                   | `7c6f6eef…`   | match                                                      |
| `review-inputs/r4-opening-rfc/PR-251-REVIEW.md`    | `08879103…`   | match; equals PR 251 commit `e4db34eb…` original path blob |
| `review-inputs/r4-opening-rfc/PR-252-REVIEW.md`    | `d3995503…`   | match; equals PR 252 commit `fdc5364a…` original path blob |
| Delivery commit                                    | locator only  | `40e723d30c1e235591b0795d8c4535639ff4fc32`                 |
| Delivery tree                                      | not stated    | `cea3f5aa544e59f8c201f9e1bea68600b39ef5bd`                 |
| Handoff blob                                       | not stated    | `16bb4c383861c7267151d7be8e72b2cc0fb3ab40`                 |
| `origin/main` when fetched                         | not stated    | `0abdca8f…`; no intervening change                         |
| Release 3 README / readiness audit at the baseline | candidate     | `4dbb5170…` / `bc0bb942…`; match                           |

Parent to input: exactly the six listed paths (three modified, one added, two
added copies; 1,517 insertions, 36 deletions). Input to delivery: the handoff and
two README lines (121 insertions). Baseline to delivery lists ten paths, all under
`governance/drafts/release-4-preparation/` or `review-inputs/r4-opening-rfc/`.
Nothing under `review-inputs/r4-opening-preparation/`,
`review-inputs/r4-normal-model-source*/`, the R4 `probes/` directory,
`authority/`, `registries/`, `spec/`, `schemas/`, `canonicalization/`,
`conformance/`, `generated/`, `evidence/`, `reference/`, `tooling/` or the Release 3
preparation directory differs. The original opening handoff blob `e50cea34…` is
unchanged. The `text` formula fence in the repaired candidate is byte-identical to
the one reviewed in PR 252. The fixed input has no link to the later handoff and
validates standalone (Section 14). `INPUT_INCOMPLETE` does not apply.

Path collision: no branch on the remote used `review-inputs/r4-opening-rfc-repair/`
when checked. Because a parallel confirmation by the PR 251 reviewer is likely
under the same handoff, this record uses the role-named subdirectory
`pr-252-reviewer/` rather than the bare directory, so two confirmations cannot
collide at one pathname.

## 4. Governance inputs read

As for PR 252 (`AGENTS.md` order, RFC.md, stability tiers, ID-POLICY, ADR-0032, the
registries, meta-schemas, schemas, normative documents and reference modules), plus
in full: PR 251's report including its Appendix A, the repaired candidate, the
response, the two README/readiness diffs, the registry notes for NRS-VERIFY-0020,
0021 and 0026, the state-invariants registry and its meta-schema, the reason-code
categories and applicability lists, the check-registry dependency edges and scope
kinds, and the reference verifier's scope construction.

## 5. Finding-by-finding disposition

Each row names what the repaired text now says and whether that repairs the
finding. Severity of a remaining defect and its opening effect are stated
separately in Section 13.

### PR 252

| Finding | Repaired text                                                                                                                                                                                                                                                                                                                            | Disposition                                                                                                                                                                                   |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-1     | New section "Authoritative registry grammar and coupling": the four `schemas/meta/` files, per-field family grammar, `requirementId` alignment, optional `contract_id`, legacy preservation, snapshot/version treatment, registry revision bumps, fixtures, `schemas/README.md`, loader, cross-checks, `resources.ts`, lifecycle carrier | **`CONFIRMED`** for the four files. The same section declares the state-invariants registry out of scope; that is the remaining defect R-1                                                    |
| S-2     | New table "Additional existing-ID treatment" enumerates CANON-0003/0004/0009, 0010/0011, 0006, VERIFY-0020, 0021/0026, 0013/0017, VERIFY-0002, SEC-0001, CORE-0009, CORE-0013 to 0019, PROV-0001/0002, VERSION-0001, VERIFY-0006/0007/0008, SEC-0002, each with owner and treatment                                                      | **`CONFIRMED`**. Every ID contained in PR 252's rows is present. PR 252's "fourteen" counted rows, not IDs, as the response says; the repaired table's explicit enumeration is the right form |
| S-3     | PROFILE-BTF-0002 limited to multiplicity and post-quantization/conditional-on-admission non-claims, "existing general non-claims retain their original owners"; VERIFY-0029 limited to BTF evidence keys, "distinct-check and non-aggregation rules retain their original owners"                                                        | **`CONFIRMED`**                                                                                                                                                                               |
| S-4     | Paragraph after the crosswalk: VERIFY-0013 and VERIFY-0017 "already require" distinct checks and `not_run` propagation; "only the concrete new check graph, ordering within that graph and remaining numerical reason assignments are open"; integrity has no admissibility dependency                                                   | **`CONFIRMED`**. Matches the registry's `depends_on` mechanism and removes the latent CORE exposure                                                                                           |
| S-5     | CORE-0020: "contract_id is an opaque identifier and is never dereferenced"; VERIFY-0030: "finite parsed binary64 inputs, interpreted exactly for its mathematical target"; CANON-0009 row: "preserve phase-qualified text"                                                                                                               | **`CONFIRMED`**. No CORE clause is edited or widened by implication                                                                                                                           |
| S-6     | "Payload and declaration": single required boolean, both values representable, `false` fails admissibility with `NRS-BTF-MODEL-NOT-DECLARED`, missing/non-boolean is `NRS-SCHEMA-INVALID`; explicit statement that the payload cannot describe or discover excluded designs, and that this differs from ITGC 0.2                         | **`CONFIRMED`**                                                                                                                                                                               |
| S-7     | "Numeric members and exact zero SSE": declared SSE strictly positive, all three F/tail pairs required, no null/NaN/infinity, so a truthful exact-zero result is not representable; observed exact SSE=0 completes computability with `fail` and `NRS-BTF-ZERO-RESIDUAL`, recomputation `not_run`; near-zero classification held          | **`CONFIRMED`**. The three cases (false declaration, structural failure, true exact zero) are distinct, as the ITGC `exclusiveMinimum` precedent and NRS-VERIFY-0013/0017 require             |
| S-8     | Surface table: PCS-0001 gains additive applicability, `schema_refs` and successor binding; PCS-0014 dataset/design/analysis, PCS-0015 declaration and result, PCS-0016 report                                                                                                                                                            | **`CONFIRMED`**. Matches the 0.2 precedent (PCS-0001 envelope; PCS-0009/0010 payload)                                                                                                         |
| S-9     | "Report scope and boundary": `scope.kind=result`, report-local definitions, `quantity_results` entries keyed by (result scope, discriminator, quantity) with exactly one applicable discriminator, no new scope kind, no edit to ITGC common definitions                                                                                 | **`CONFIRMED`**. Keys are unambiguous (Section 9)                                                                                                                                             |
| N-1     | BTF-0001: A/B from `factor_order`, 0/1 from `level_order`, level-1 minus level-0; level IDs distinct within a factor only                                                                                                                                                                                                                | **`CONFIRMED`**                                                                                                                                                                               |
| N-2     | Five existing `guarantee_boundary` keys plus `multiplicity_control`, `post_quantization_calibration`, `admission_conditional_calibration`, all constant `not_asserted`                                                                                                                                                                   | **`CONFIRMED`**                                                                                                                                                                               |
| N-3     | Finite binary64, safe integers, `n` in `[2, 2251799813685247]`, df in `[4, 9007199254740984]`, exact count/df comparison, non-negative SS and F, `p` in `[0,1]`, positive SSE, either-sign estimates                                                                                                                                     | **`CONFIRMED`**; ceilings verified: `4 × 2251799813685247 = 9007199254740988 ≤ 2^53 − 1`, `4 × (2251799813685247 − 1) = 9007199254740984`                                                     |
| N-4     | CORE-0022 binds `profile_eligibility` to the declared-design admissibility check with pass/fail/absence semantics; reference `lifecycle.ts` implements, not defines                                                                                                                                                                      | **`CONFIRMED`**; consistent with the reference derivation (only a completed check sets `eligible`/`ineligible`)                                                                               |
| N-5     | Five named unissued reasons with stated meanings; malformed structure uses `NRS-SCHEMA-INVALID`; level reversal and factor exchange are valid orientation changes                                                                                                                                                                        | **`CONFIRMED`** as names; their classification boundary is R-1                                                                                                                                |
| N-6     | Optional `contract_id` in the bundle meta-schema, required for the BTF bundle, equal to `analysis.contract_id`, pinned in the interpretation tuple                                                                                                                                                                                       | **`CONFIRMED`**                                                                                                                                                                               |

### PR 251

| Finding | Repaired text                                                                                                                                                                                                                                        | Disposition                                                                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-1     | Same section as PR 252 S-1; does not loosen patterns to any URI, changes no historical bundle meaning, adds no canonicalization or attestation family, states that state-invariant grammar changes are needed only if BTF references are added there | **`CONFIRMED`** for what PR 251 asked, with the same reservation as R-1: the conditional about state invariants is satisfied in the wrong direction |
| S-2     | VERIFY-0013/0017 and CANON-0006/0011 named with owners; open work limited to new edges, in-graph ordering and numeric reasons; VERIFY-0020 kept Welch-scoped                                                                                         | **`CONFIRMED`**                                                                                                                                     |
| N-1     | VERIFY-0030 (parsed input), VERIFY-0032 (integrity, no Record code, conformance gating), PROFILE-BTF-0004 (local chain); VERIFY-0002, SEC-0001, CANON-0010 in the table                                                                              | **`CONFIRMED`**                                                                                                                                     |
| N-2     | Required members, exact string equality, unsupported-versus-malformed distinction, discriminator keys independent of array order, report-local definitions                                                                                           | **`CONFIRMED`**                                                                                                                                     |

### Self-correction of PR 252

- PR 252 treated NRS-VERIFY-0020 and NRS-VERIFY-0021 as CORE clauses that govern the
  BTF tail. Their registry notes read "Scoped to `urn:nomue:check:welch-recompute:0.2.1-draft.1`
  only" and "Scoped to `urn:nomue:check:welch-computability:0.2.1-draft.1` only", and
  each clause sits under a 0.2.1-successor heading. PR 251 and the response are
  right: preserve both without extension; the BTF endpoint and zero/positive rules
  are the new check's own work. The repaired candidate does this (R-2 asks for one
  consistent wording).
- PR 252's "fourteen applicable existing IDs, six of them CORE" counted table rows;
  the rows contained more IDs and more CORE IDs. The repaired enumeration supersedes
  the count.

## 6. Meta-schema changes

| Item                                    | Repaired text                                                                                                                                                                                                                              | Checked against                                                                                                                                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Four authoritative files                | `interpretation-bundles`, `public-contract-surfaces`, `public-checks-registry`, `reason-codes-registry` under `schemas/meta/`                                                                                                              | All four are `class: authoritative` in the manifest's `json-structure` target; their `$id`s are unversioned `urn:nrs:meta:*`, as the candidate says                                                                                            |
| Concrete identity fields                | `bundle_id`, `profile_id`, `allowed_check_ids`; `applies_to_bundle_ids`; check IDs in sets, checks and `depends_on`; `applicable_check_ids`                                                                                                | Matches the actual `^urn:nomue:…` patterns and PR 251's nine-error probe                                                                                                                                                                       |
| Capability-ID grammar                   | "align requirementId with requirements-registry.schema.json" including the capability-token branch                                                                                                                                         | Correct target grammar                                                                                                                                                                                                                         |
| Legacy preservation                     | Each field accepts its legacy grammar or its own HTTPS family; no cross-family alias; canonicalization URN and attestation state untouched; CI-method constant unused                                                                      | Consistent with ID-POLICY and the `comparison_constants` `supported_ci_method_id` pattern                                                                                                                                                      |
| Version/snapshot treatment              | Additive revision within a new content-addressed snapshot; registry revisions 0.6.0→0.7.0, 0.5.0→0.6.0, 0.2.0→0.3.0, 0.9.0→0.10.0                                                                                                          | Current revisions are 0.6.0, 0.5.0, 0.2.0 and 0.9.0; NRS-VERSION-0001 preserved                                                                                                                                                                |
| Contract pin                            | Optional `contract_id`, required for the new bundle, absent from historical entries                                                                                                                                                        | Consistent with NRS-VERSION-0004                                                                                                                                                                                                               |
| Fixtures and tooling                    | Positive/negative grammar fixtures, legacy registries, wrong families, malformed tokens, duplicate identities, unregistered references, missing Contract pin; `schemas.ts`, `registry-cross-checks.ts`, `resources.ts`, lifecycle dispatch | Complete for the four files                                                                                                                                                                                                                    |
| Not required and correctly not proposed | New scope kind, canonicalization family, attestation change, CI-method grammar                                                                                                                                                             | Agreed                                                                                                                                                                                                                                         |
| Fifth registry                          | "State-invariant meta-schema changes are not needed unless a later proposal adds BTF references there"; "no … state-invariant entry is proposed"                                                                                           | **Defect (R-1)**: `registries/state-invariants.yaml` declares itself "authoritative for the semantic invariants that conformance and verification evaluate beyond schema validation", and its meta-schema `requirementId` lacks the BTF branch |

## 7. Distinct checks, propagation and successor bindings

- NRS-VERIFY-0013 and 0017 are stated as fixed, with only new edges and in-graph
  ordering open. The registry's `dependency_propagation: not_run_with_blocking_reason_codes`
  and `depends_on` edges (conformance → admissibility → computability → recompute in
  ITGC 0.2.1) are the precedent the candidate's admissibility → computability →
  recompute chain follows. `NRS-BTF-ZERO-RESIDUAL` as a computability `fail` with
  recomputation `not_run` matches how `NRS-P-VALUE-UNDERFLOW` and
  `NRS-NUMERICAL-COMPUTABILITY-FAILED` behave today.
- NRS-VERIFY-0020: correctly kept as the Welch 0.2.1 recompute rule; no extension.
- NRS-VERIFY-0021: the candidate calls its clause "general" and its bundle
  disposition Welch-specific. The clause text is general, but the registry note
  scopes the requirement to `welch-computability:0.2.1-draft.1` only. The holds
  paragraph then cites VERIFY-0021 as the reason BTF underflow is not exact zero.
  That is a precedent, not a governing rule; the BTF check must bind its own
  underflow rule (VERIFY-0030 already says an unset rule supplies no support). R-2.
- NRS-VERIFY-0026: correctly retained as the Welch squared-t path, not an adopted
  BTF graph.
- Successor bindings: CORE-0020 (no dereference of `contract_id`), VERIFY-0030
  (parsed binary64, exact target), VERIFY-0032 (integrity, no Record code,
  conformance gating), PROFILE-BTF-0004 (local chain), PROFILE-BTF-0003 (finite
  numbers, no signed-zero meaning), CORE-0022 (lifecycle carrier). None edits
  CORE-0004, CANON-0009, CANON-0003/0004, PROV-0001, SEC-0002 or VERIFY-0006; each
  is additive and phase-neutral. No existing CORE clause is widened by implication.

## 8. The new choices themselves

| Choice                                                  | Assessment                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boolean assertion; `false` versus missing               | Sound. `false` is a readable unsupported declaration (admissibility, like `NRS-MISSING-OUTCOMES-NOT-SUPPORTED`); missing or non-boolean is structural (`NRS-SCHEMA-INVALID`). The disclosed inability to detect undeclared handling is honest and follows from choosing one assertion instead of structured declarations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Finite numbers, safe counts, df bounds                  | Sound; arithmetic verified (Section 5, N-3). The count ceiling is labelled representational, not a resource bound, which keeps NRS-CORE-0012 and NRS-SEC-0003 separate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Strictly positive declared SSE, required F/tails        | Sound and consistent with the ITGC `standard_error` precedent. Declaring SSE=0 is a schema failure; a truthful exact-zero result is unrepresentable as a complete result. This is a representation decision the discussion can see                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Exact-zero observed SSE despite fabricated declarations | Sound: computability `fail` with a scoped reason and `not_run` recompute, not a safety refusal, matches NRS-SEC-0004 and NRS-VERIFY-0013. The candidate rightly keeps _reliable detection_ as a numerical hold: for a cell of `n` identical binary64 values the floating sum divided by `n` need not reproduce the value exactly, so a floating residual can be nonzero when the exact SSE is zero. The exact-zero disposition presumes no particular detector                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Signed, non-negative and range rules                    | Sound; `p_value` zero structurally allowed but not certified, consistent with the ITGC `p_value` minimum and the underflow precedent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Valid orientation changes versus refusals               | Sound: level reversal and factor exchange are declared-orientation changes with sign consequences; mismatched numbers after them are result mismatches, not refusals                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Classification boundary of structural failures          | **Departure from precedent, undisclosed (R-1).** In ITGC, duplicate observation/unit IDs, unresolved local references, unknown group and group size below two are `category: semantic` reason codes evaluated by `record-conformance` and reported in the `conformance` section; the profile-admissibility check owns only declaration values. The candidate assigns cell coverage, unequal counts, duplicate units and unresolved references to the declared-design admissibility check with `NRS-BTF-*` reasons. Under CORE-0022 that makes a Record with a dangling reference `ineligible` rather than non-conforming, lets the integrity check run on it, and moves these invariants out of the `conformance` section. No existing invariant is contradicted (the registered ones are Phase 1/ITGC-bound), but the state-invariants registry claims authority over exactly this class of invariant and the candidate registers none |

## 9. Report scope, surfaces and lifecycle

- Keys: (result scope, discriminator, quantity) with `contrast_kind` for the four
  contrast quantities, `cell_id` for `mean` and `n`, none for SSE and df. Every
  compared quantity has exactly one key; no two entries can share one; array order
  carries nothing. Complete and unambiguous.
- No reused ITGC common definition is widened: the new report owns `checkResult`,
  `scope` and `evidence`; `execution-outcome-0.2.schema.json` is untouched.
- Guarantee keys: eight, all explicit, all constant `not_asserted`.
- Incomplete execution: "a non-executed comparison emits no invented recomputed
  value or quantity success" plus the retained execution/outcome invariant means
  numerical success cannot appear without a completed check.
- PCS-0001 versus disjoint payload surfaces: adopted correctly (Section 5, S-8).
- Lifecycle carrier: CORE-0022, single carrier, `not_evaluated` on absence.
- Two precedent departures worth one sentence each (R-3): the ITGC reference builds
  `scope.id` as `revision_id#result_id` (a URI, globally unique across Records)
  whereas the candidate uses the bare `result_id`; and ITGC's computability check is
  `analysis`-scoped whereas BTF's is `result`-scoped. Both are representable and
  harmless inside one report, since the report carries the exact record reference.

## 10. Allocation, identifiers, tier and draft completeness

- One owner per meaning holds after S-3: Contract (BTF-0001 to 0005), Profile
  (BTF-0001 to 0004), core envelope/digest/lifecycle (CORE-0020 to 0022), checks
  (VERIFY-0029 to 0032). No proposed clause restates a CORE clause.
- Sixteen proposed IDs; at the baseline `NRS-CORE` ends at 0019, `NRS-VERIFY` at
  0028, `NRS-PCS` at 0013, no BTF token, no HTTPS identifier registered. All
  available. Reason-code names match `^NRS-[A-Z][A-Z-]*[A-Z]$`.
- Highest tier: STABLE-INTENT, at least 30 calendar days. The state-invariants
  change under R-1 is EXPERIMENTAL registry content plus a structural meta-schema
  edit and does not raise the tier. No CORE clause is edited.
- Draft gate: motivation, clause text, IDs, tier, migration, evidence disposition,
  the schema-level representation decisions and the coupled authoritative changes
  are now written as reviewable prose. The gate is met except for R-1's inventory
  and classification statement. New structural choices are prose, not implemented
  schemas, and this review does not infer numerical support from the inventory.
- Decision-bearing before opening: R-1 only. It is a prose repair (one disclosure
  paragraph, one inventory row and the corresponding fixture line).

## 11. Source, model, formulas and Release 3

- The formula fence, contrast definitions, coded coefficients, `nu = 4(n-1)`,
  individual-null and shared-denominator statements are unchanged from the text PR
  252 re-derived in exact arithmetic. No new retained scientific premise appears;
  the new clauses are representation, binding and inventory text.
- Accepted source/derivation split, `COMPLETE_ON_PROVIDED_COPIES`, staged
  S1/S2/P1/S3/S4/S6 and bounded S5 are stated as before; Yates copies are not used.
  No PDF acquisition or numerical investigation was needed.
- Release 3: both blobs match at the baseline; `origin/main` unchanged; no R3
  identifier or field spelling in any authoritative tree.

## 12. Separate dispositions

| Item                 | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R4-P1                | Unchanged; bounded accepted evidence carried; wider holds staged                                                                                                                                                                                                                                                                                                                                                                                                                            |
| R4-P2                | Unchanged; accepted scope                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| R4-P3                | Holds correctly enumerated and now bounded by preserved rules; representation decisions taken; reliable zero-SSE detection, graphs, tails, domains, tolerances, platforms remain held                                                                                                                                                                                                                                                                                                       |
| R4-P4                | Reconciled; no dependency; no intervening main change                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| R4-P5                | Substantially complete; one remaining inventory/classification repair (R-1) and two wording items (R-2, R-3)                                                                                                                                                                                                                                                                                                                                                                                |
| Preparation          | **`GO`** (bounded)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Numerical support    | **`NOT_ESTABLISHED`**; not claimed by the candidate; independent oracles remain mandatory                                                                                                                                                                                                                                                                                                                                                                                                   |
| Highest tier         | **`STABLE-INTENT`**, at least 30 days                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| R4-P6 public opening | **`NOT_READY`** at this fixed input because of R-1. After R-1 is repaired, pinned and confirmed, this reviewer knows of no remaining draft-text or scientific condition; whether a same-session confirmation and PR 251's task-context assessment satisfy the "assembled-proposal review" condition of the steward acceptance is a steward decision. Independence limits: this record is not a second investigator, and PR 251 is not a different provider from the author. No clock starts |

## 13. Findings

### BLOCKER

None.

### R-1 (`SHOULD-FIX`) - semantic-invariant classification and the state-invariants registry

Observed: (a) `registries/state-invariants.yaml` is "authoritative for the semantic
invariants that conformance and verification evaluate beyond schema validation" and
registers ITGC's reference-resolution, uniqueness, group-count and group-size
invariants with `category: semantic` reason codes evaluated by `record-conformance`;
(b) the candidate assigns the equivalent BTF invariants (Cartesian cover, equal
counts, unit uniqueness, local references) to the declared-design admissibility
check, proposes no state-invariant entries, and declares the state-invariants
meta-schema out of scope, although that meta-schema's `requirementId` pattern
rejects `NRS-PROFILE-BTF-*` and `NRS-CONTRACT-BTF-*`.

Effect: an authoritative registry that claims to cover these invariants would be
silent about them; the `conformance` section, integrity gating and lifecycle
eligibility for a malformed-but-schema-valid BTF Record would differ from the ITGC
precedent without the difference being disclosed.

Requested: decide and write one of two things. Either keep the admissibility
classification, disclose it as a departure from the ITGC semantic-conformance
precedent with its consequences (integrity runs; eligibility `ineligible`;
`conformance` passes), and add the state-invariants registry entries and its
meta-schema `requirementId` change to the coupled inventory; or classify cover,
counts, uniqueness and reference resolution as semantic conformance (existing or
new `semantic` reason codes, reported in `conformance`, gating all checks) and keep
only the assertion under admissibility, again with registry entries and the
meta-schema change listed. Severity: SHOULD-FIX. Opening effect: repair before the
next pin; prose only.

### R-2 (`NICE-TO-HAVE`) - cite NRS-VERIFY-0021 as precedent, not as the governing rule

The holds paragraph says "Finite statistic/positive-df tail underflow is not an
exact probability zero (NRS-VERIFY-0021)". The registry scopes that requirement to
`welch-computability:0.2.1-draft.1`. Say that the BTF check adopts the same rule as
its own check-owned decision, matching the treatment already given to VERIFY-0020.

### R-3 (`NICE-TO-HAVE`) - disclose the two scope departures

State that `scope.id` is the bare `result_id` rather than the ITGC reference's
`revision_id#result_id` form, and that computability is `result`-scoped rather than
`analysis`-scoped, or align with the precedent. Either is representable.

## 14. Validation record

Environment: Node v22.22.2, pnpm 11.7.0, Python 3.11.15, git 2.43.0, dependencies
installed earlier in this session with `pnpm install --frozen-lockfile`.

| Check                  | Fixed input tree `d21f634c…` at `60a7caf0…` (direct binaries)        | Delivery tree `cea3f5aa…` at `40e723d3…` (pnpm wrappers) |
| ---------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| Format                 | `prettier --check .`: pass                                           | `pnpm format:check`: pass                                |
| Markdown lint          | `markdownlint-cli2`: pass (403 files, 0 issues)                      | `pnpm lint:markdown`: pass (404 files, 0 issues)         |
| Typecheck              | `tsc --noEmit`: pass                                                 | `pnpm typecheck`: pass                                   |
| Repository validation  | `node --import tsx tooling/src/validate.ts`: pass                    | `pnpm validate`: pass                                    |
| Generated drift        | `node --import tsx tooling/src/generate.ts --check`: pass (19 files) | `pnpm check:generated`: pass (19 files)                  |
| `git diff --check`     | clean (parent to input)                                              | clean (input to delivery)                                |
| Aggregate `pnpm check` | not run; no authoritative artifact changed                           | not run; same reason                                     |

The input tree was validated by checking out `60a7caf0…` in the main clone and
returning to the review branch afterwards. No numerical or runtime suite was
rerun; the numerical artifacts and formula fence are unchanged. PR 251's probe was
not rerun. After adding this file the same checks were re-run on the review
branch; the result is recorded in the review pull request.

## 15. Bounded verdict

| Item                                    | Disposition                                                                                          |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Repaired input `60a7caf0…` (six files)  | All 19 labelled findings from both reviews **`CONFIRMED`**; one remaining SHOULD-FIX (R-1), two nits |
| Delivery commit `40e723d3…`             | Validated; accurate description of the input and its pins                                            |
| Preservation                            | Intact, including both copied reviews and the formula fence                                          |
| Meta-schema changes                     | Verified for four files; fifth registry to add (R-1)                                                 |
| Checks, propagation, successor bindings | Preserved without widening CORE                                                                      |
| New representation choices              | Sound; one undisclosed classification departure (R-1)                                                |
| Report scope, surfaces, lifecycle       | Sound; two precedent departures to disclose (R-3)                                                    |
| Highest tier                            | STABLE-INTENT, at least 30 days                                                                      |
| R4-P1 to P4                             | Unchanged                                                                                            |
| R4-P5                                   | Open by R-1 only                                                                                     |
| R4-P6 public opening                    | **`NOT_READY`** at this input; no further condition known after R-1; no clock                        |
| Independence                            | Same-session confirmation by the PR 252 reviewer; not a second investigator                          |

RELEASE 4 OPENING REPAIR CONFIRMATION COMPLETE - INPUT MATCH - MAIN UNCHANGED - COPIES AND FORMULAS PRESERVED - ALL NINETEEN LABELLED FINDINGS CONFIRMED - ONE REMAINING SHOULD-FIX - PR 252 SELF-CORRECTION RECORDED - TIER STABLE-INTENT - NO HOLD CLOSED - NOT AN OPENING GO - NOT READY TO OPEN - SAME-SESSION CONFIRMATION DISCLOSED - NOT MERGE APPROVAL - NOT PROTOCOL ADOPTION
