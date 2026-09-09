# Release 4 assembled opening review

Status: informative adversarial review; not a Protocol decision.
Review date: 2026-09-09 (UTC).

## 1. Verdict and scope

**Assembled candidate: REPAIR_REQUIRED. Public opening: NOT_READY.**
There are **0 BLOCKER, 2 SHOULD-FIX and 2 NICE-TO-HAVE findings** below.
Both SHOULD-FIX items need a bounded proposal repair and confirmation before
opening GO. They concern the completeness of the proposed authoritative change
and the boundary of its unresolved choices, not a newly disproved statistical
claim. Severity and gate effect are separate: SHOULD-FIX does not mean that an
opening decision may ignore the item.

The accepted preparation, bounded model, estimands and source/derivation split
remain usable: **bounded preparation GO**. That is not approval of the entire
assembled proposal. No new primary-source prerequisite was identified for the
retained marginal-F proposition. No numerical support is certified.

The consequential findings are:

1. The proposed HTTPS identities and BTF requirement references cannot pass
   several existing authoritative registry meta-schemas. Their necessary
   changes are missing from the exact artifact inventory and are not merely
   changes to non-authoritative tooling (S-1).
2. The crosswalk omits existing constraints on distinct admissibility and
   computability checks and dependency propagation.
   The candidate leaves dependency semantics broadly unresolved
   without distinguishing its fixed dependency constraints from open numerical choices (S-2).

The likely highest affected tier remains STABLE-INTENT, with a minimum of
30 calendar days, **if the repairs preserve the existing CORE rules**. No actual
CORE semantic change is established by this review. Choosing to relax a CORE
rule would require a revised impact assessment and the CORE process, including
its 60-day minimum. Neither clock has started.

## 2. Identity, roles and access

The user commissioned review through the pinned opening handoff. The substantive
input is its five-file input commit, not mutable main and not the later handoff.
All pins below were independently checked against a fresh Git clone.

| Object                       | Inspected identity                                                      |
| ---------------------------- | ----------------------------------------------------------------------- |
| Repository                   | licklider-ai/nomue-protocol                                             |
| Input                        | `98187a14a48b38c9f2fb41fdd18060d53966a660`                              |
| Sole parent                  | `0abdca8f822d0de3faf35f218f762a951fd75e9e`                              |
| Input tree                   | `2f9286c107b64b59940269af98122d469639f0de`                              |
| Handoff delivery             | `6adfc8a0080e30ce7634a5912c4dbb32e97ecd17`                              |
| Delivery sole parent         | The input commit above                                                  |
| Delivery tree                | `3e650079b5365f7cd55ad525cd7fd09a58bd25fc`                              |
| Handoff blob                 | `e50cea3443edef5de7b2c597a0bd60fccdc01b9e`                              |
| Main inspected during review | `0abdca8f822d0de3faf35f218f762a951fd75e9e`; no intervening main changes |
| Candidate locator            | research/r4-opening-rfc-candidate, at the delivery commit; draft PR 249 |

Input paths relative to governance/drafts/release-4-preparation/:

| Path                           | Verified input blob                        |
| ------------------------------ | ------------------------------------------ |
| opening-rfc-candidate.md       | `68d3660f64cf299a90cb4ae19f802e7707c15412` |
| README.md                      | `b6aa21be9abea08cc99e7f80dbd0d7fc72866952` |
| public-discussion-readiness.md | `8b2e2c84fd778a2ab212225d90c555b8c2864ffa` |
| rfc-preparation-draft.md       | `0d1dffdf17a9348ac19b63a2648bf769c3057db7` |
| rfc-impact-inventory.md        | `c262f7200c6ed650df88847597d01c97a406ed61` |

Parent to input changes exactly those five Markdown files. Input to delivery
adds the handoff and changes only the README link paragraph. The input contains
no dangling link to that later handoff. All files outside this disclosed delta
are unchanged, including authoritative artifacts, numerical inputs and Release 3.

These reviews have the stated blobs at the parent, input and delivery:

| Preserved review path                                        | Blob                                       |
| ------------------------------------------------------------ | ------------------------------------------ |
| review-inputs/r4-opening-preparation/REVIEW-RESULT.md        | `13fb1e0fb63c96cd15efa525f3ced75c59a014c1` |
| review-inputs/r4-normal-model-source/REVIEW-RESULT.md        | `9efcc51a4978b3b539de4424d08c7a265c90e1ab` |
| review-inputs/r4-normal-model-source-repair/REVIEW-RESULT.md | `94d21ac71834043bcceb6978588a01c927f8eeea` |

Reviewer: OpenAI Codex in a new task conversation. Exact served model identifier,
model-build identifier and provider session identifier are not available as
authenticated runtime metadata. The candidate also records OpenAI Codex authoring
assistance. Therefore different-model or different-provider independence is
**not established**. This task did not author or repair the candidate. It did
receive cross-conversation project summaries and could see a pre-existing local
handoff copy during discovery; it is not claimed to be a completely blind
investigation. Findings were grounded in the fetched pins, not uncommitted
author changes. No sub-agent, other model or human expert was used in this task.
No independent human-investigator review is implied.

This is a separate task-context adversarial assessment, not a replacement for
the separate-model primary-source pass required by RFC.md. For that pass it
reuses the preserved PR 246 review, repair confirmation and explicit steward
acceptance. The acceptance records the source/derivation evidence split and
does not claim that Tian/Styan proves every probability step.

No PDF was supplied to this task or inspected. No new certification of the
Tian/Styan, Yates, NIST or LAPACK copies is made. The accepted provided-copy
status is not reopened. Repository and GitHub API access were available; there
was no external paper acquisition, numerical simulation or source-page reread.

## 3. Materials and scientific assessment

Read AGENTS.md and its ordered prerequisites: CHARTER.md, AUTHORITY.md, the
authority manifest, requirements registry, ID-POLICY.md and RFC.md. Additional
inspection covered the stability and public-surface registries, interpretation
bundles, public checks/reason-code schemas, ADR-0032, all five input documents,
the handoff, the parent normal-model acceptance/scope/source result and its
explicit derivation, relevant findings and dispositions in the three preserved
reviews, and the two pinned Release 3 documents.

The existing-ID table was checked against the actual owning specification
documents, not just registry titles. The 139 existing registry anchors resolve
to their declared documents. Also read the omitted numeric-model, numerical
comparison, profile-admissibility and provenance clauses relevant to the new
payload and holds. Record, payload, report, common execution/outcome, routing,
refusal and registry meta-schemas were inspected, together with schema loading
and registry cross-check code. This is not an audit of every research branch
or every implementation path.

| Scientific question                 | Assessment                                                                                                                                                                                                                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Factor and level orientation        | Ordered factors and ordered level pairs identify 00,01,10,11 without sorting labels. A and B use the declared first and second factor respectively. Swapping factors exchanges A/B; reversing either factor reverses its signed main contrast and AB. Squared quantities retain the appropriate invariance. |
| Population versus sample            | Delta uses the fixed population cell means; d uses sample means. The three formulas retain the accepted normalization, including the full difference in differences for AB.                                                                                                                                 |
| Full interaction and nuisance means | Every test retains the four-column full model. Under one contrast null the other contrasts and intercept are unrestricted; this is not a global-null proof or automatic interaction removal.                                                                                                                |
| SS and residual degrees of freedom  | The mutually orthogonal repeated sign columns have squared norm 4n. Their rank-one projections give SSA=n*dA^2, SSB=n*dB^2 and SSAB=n*dAB^2/4. The residual projection has rank 4n-4 and is the within-cell SSE. These are the accepted all-n identities.                                                   |
| F and tail                          | With exact SSE positive, F=nu*SS/SSE has the accepted marginal F(1,nu) null law under independent normal errors with a common strictly positive finite variance. The integral is an upper tail of that law. No runtime graph is selected by this definition.                                                |
| Signed coefficients                 | The -1/+1 fitted coefficients dA/2, dB/2 and dAB/4 are consistent with the definitions; signs are retained in the reported estimates.                                                                                                                                                                       |
| Shared denominator                  | The ratios share SSE. Neither independence of all three ratios nor joint error control is claimed.                                                                                                                                                                                                          |
| Finite input versus zero residual   | Finite observations can have exact SSE=0. The candidate explicitly makes F and its tail undefined there and grants no permission to emit NaN, infinity or guessed probabilities. Machine treatment remains held.                                                                                            |
| Quantization and admission          | The idealized continuous-model proof is not asserted as exact calibration after binary64 encoding or selection by a future admission rule. Declarations and recomputation do not validate normality, independence or common variance.                                                                       |
| Exclusions                          | Intervals, booleans, multiplicity, causal/randomization and historical-priority claims are excluded. Wider designs are staged without being declared invalid. No retained claim was found to reopen S1/S2/P1/S3/S4/S6 or wider S5.                                                                          |

The mathematical assessment checks preservation and consistency with the accepted
derivation. It does not newly certify an uninspected printed source. A finite
numerical rerun would not resolve the two findings in this review and was not
required or performed.

## 4. Proposed ownership, payload and compatibility

### 4.1 Clause and identity allocation

| Proposed allocation    | Assessment                                                                                                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CONTRACT-BTF-0001/0002 | Contract ownership of orientation and population/sample targets is appropriate. The formulas should remain defined once in the calculation owner, with explicit references from design-and-estimands.            |
| CONTRACT-BTF-0003/0004 | Checkable balance, membership and unit conditions are separated from declared model premises. One finite outcome per represented unit does not prove physical independence.                                      |
| CONTRACT-BTF-0005      | Contract owns exact mathematical quantities. Check-owned numerical projection, errors and comparison do not redefine their estimands.                                                                            |
| PROFILE-BTF-0001/0002  | Profile owns the applicability assertion and non-claims, referencing the Contract premises rather than duplicating them.                                                                                         |
| VERIFY-0029/0030/0031  | Scoped evaluation, version-bound support and report evidence are appropriate subjects. S-2 constrains the stated freedom in their future dependency rules.                                                       |
| CORE-0020              | A new closed envelope/payload binding avoids widening Phase 1 and ITGC schemas in place.                                                                                                                         |
| CORE-0021              | The explicit successor binding supplies the missing new-envelope connection to the existing canonicalization procedure and exclusion of exactly root integrity. It does not change CORE-0006's historical scope. |

Both BTF prefixes and all 12 proposed Requirement IDs are absent from the
baseline allocation registry; PCS-0014 through PCS-0016 are absent too. BTF
meets the adopted capability-token grammar. The six proposed HTTPS identifiers
follow the adopted family/name/revision spelling. The main requirements
meta-schema accepts the new capability grammar, but downstream registry
meta-schemas do not (S-1). These observations reserve or issue nothing.

The new family revision 0.1.0-draft.1 does not renumber the old Record family.
The eventual bundle still needs its own complete spec/schema/check-set pins,
allowed checks, report selection and attestation-support state before issuance;
an incomplete check list cannot create support. Existing URNs are not aliases.

The proposed local chain is understandable: result to analysis to design to
dataset, observations to declared cells, cell tuples to factor-position-specific
levels, and summaries back to cells. Distinct factor IDs, two distinct levels
per factor, four unique Cartesian-product cells, unique observation/unit IDs
and one result entry for each A/B/AB remove the principal association
ambiguities. Reusing a level spelling across different factors is not itself
ambiguous because tuple positions identify the factors.

There is enough payload structure to discuss the architecture without requiring
finished JSON Schema. Exact scalar types, required members, unsupported
declaration representation and report sub-scope structure remain necessary
before a schema or supported check is issued (N-2). This review does not certify
the sketch as a schema or executable fixture.

### 4.2 Existing-ID crosswalk findings

| Candidate crosswalk group                                      | Actual owner and scope assessment                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CORE-0003/0007, CORE-0004/0005                                 | record-envelope.md: 0003/0007 are explicitly Phase 1; 0004 prohibits implicit dereference and 0005 preserves revisions. CORE-0020 appropriately adds the new structural binding rather than changing Phase 1 constants. Direct Contract identity also follows ID-POLICY/ADR-0032.                                                                |
| CORE-0006                                                      | integrity-model.md: Phase 1 projection. CORE-0021 is the explicit proposed additive successor binding; the old meaning stays unchanged.                                                                                                                                                                                                          |
| CANON-0007/0008/0014/0015/0023                                 | record-canonicalization.md: raw escaped-name duplicate detection, Unicode scalars, lexical negative zero and pre-routing priority are preserved. No schema or bundle may run ahead of these gates.                                                                                                                                               |
| CANON-0001/0005/0016/0017/0018/0020/0021/0022 and VERIFY-0027  | Same document: 0001/0022 explicitly name Phase 1; CORE-0021 binds the successor to the procedure. Other listed byte, fail-closed and normalization constraints remain intact. The exact reused identity is urn:nomue:canonicalization:jcs:0.2.0-draft.1.                                                                                         |
| VERIFY-0001/0003/0004                                          | verification-principles.md: overall-verdict prohibition, not_asserted boundary and attestation non-escalation are preserved. VERIFY-0002 and SEC-0001 also constrain the proposal although omitted from its table.                                                                                                                               |
| VERIFY-0010                                                    | execution-outcome-model.md: completed requires outcome; not_run/error omit it and carry reasons/error as applicable. New report preserves this invariant.                                                                                                                                                                                        |
| CORE-0008; VERIFY-0011/0012                                    | verification-report.md: separate artifact, exact revision/digest/bundle/check association and registered reasons remain applicable.                                                                                                                                                                                                              |
| CORE-0011; VERIFY-0018; SEC-0004/0005                          | verifier-refusal.md: verifier-level shape and no partial success on safety refusal are preserved. A zero-SSE numerical case is not automatically a global safety refusal.                                                                                                                                                                        |
| VERSION-0002/0005/0007/0008; CORE-0010; VERSION-0006           | versioning-principles.md and multi-bundle-dispatch.md: exact lookup, no fallback, pre-dispatch routing and old meanings/results are preserved.                                                                                                                                                                                                   |
| VERSION-0003/0004/0009                                         | interpretation-bundle.md and public-check-versioning.md: exact tuple declaration and versioned comparisons remain necessary. No old tolerance or numerical check is silently inherited.                                                                                                                                                          |
| VERIFY-0005/0006/0007/0008/0009; CORE-0012; SEC-0002/0003/0006 | public-checks.md: conformance separation and resource/non-guarantee rules are relevant. 0006/0007/0008 expressly name Phase 1, and SEC-0002 also says Phase 1 verifier. Preserve historical scopes; do not cite the table as automatic new-capability authority. Successor security and check bindings need explicit coverage at issuance (N-1). |

All listed IDs resolve to the stated owner or pair of owners. That does **not**
make the table complete. The omitted, decision-bearing constraints are identified
in S-2; the additional binding/completeness points are N-1.

### 4.3 Structural compatibility assessed from actual files

The old record.schema.json and record-0.2.schema.json have closed roots, old
$schema/profile constants and fixed ITGC payload references. They cannot accept
the proposed factorial payload by changing a routing identifier. Separate new
Record and payload schemas are therefore appropriate.

Old report schemas have their own $schema constants and depend on common
execution/outcome definitions that constrain check IDs to URNs, scope to four
existing kinds and evidence to existing ITGC shapes. A new top-level report
identifier alone would not suffice if it blindly reused those definitions.
The proposed new report can own new local definitions, or the proposal can
explicitly introduce a separately versioned common schema. Historical common
definitions must remain unchanged; N-2 records this completion point.

The existing routing schema accepts an object containing a string bundle ID
without interpreting the other members. It can represent the new HTTPS bundle
without a schema change. The current refusal schema can carry that URI in an
unsupported-bundle refusal and otherwise remains bundle-independent. Reuse of
these two shapes is viable; listing the new bundle in PCS applicability does
not make refusal selection depend on a successfully selected bundle.

The existing envelope integrity constants are canonicalization identity above,
sha-256 and record_without_integrity. The proposed CORE-0021 preserves the
domain-tag-plus-LF-plus-JCS procedure and covers all scientific fields. New
payload member names do not themselves require a new canonicalization identity.
PCS-0006 needs the new schema reference, applicability and successor requirement
binding; its current Phase 1 references alone are not the new binding.

PCS-0014/0015/0016 as separate STABLE-INTENT surfaces is a coherent proposal,
and additive applicability for PCS-0006/0012/0013 preserves their old meanings.
The actual downstream schema blockers in S-1 still prevent a complete
compatibility-impact certification. No claim here says the unimplemented new
bundle already works or that the old runtime suite validates the new payload.

## 5. Prioritized findings and requested repairs

### S-1 - Include authoritative registry grammar changes in the proposal

**Priority: SHOULD-FIX. Gate: R4-P5 and public opening.**

Location: candidate, "Candidate structure and versioned surfaces" and
"Tier, migration and coupled implementation". The listed eventual change set
contains three new schemas and non-authoritative loader/validator changes but
omits existing authoritative meta-schema changes needed to encode its proposed
identifiers and requirement references.

Observed necessary surfaces:

| Existing authoritative file under schemas/meta/ | Concrete incompatibility                                                                                                                        |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| interpretation-bundles.schema.json              | bundle_id, profile_id and allowed_check_ids require URNs; its requirementId grammar excludes BTF. The proposed bundle/profile fail immediately. |
| public-contract-surfaces.schema.json            | applies_to_bundle_ids requires URNs; requirementId admits PROFILE-ITGC but not CONTRACT-BTF or PROFILE-BTF.                                     |
| public-checks-registry.schema.json              | check IDs in check sets, checks and dependencies require URNs; requirementId excludes BTF.                                                      |
| reason-codes-registry.schema.json               | applicable_check_ids requires URNs; requirementId excludes BTF.                                                                                 |

All four are already assigned to authoritative json-structure in the manifest.
The main requirements meta-schema has the extensible grammar, but that does not
repair its copies in other schemas. A code-only bypass would be an authority
conflict, not a compliant implementation. The in-memory probes in Appendix A
reproduce the mismatch: four current registries validate, while the targeted
candidate/synthetic substitutions produce nine pattern errors across them.
These are diagnostic mutated copies, not actual candidate registry entries or
evidence that the unmodified repository fails validation.

The declared loader work is also concrete: tooling/src/phase1/schemas.ts rejects
non-URN schema IDs; registry-cross-checks.ts recognizes a Record schema through
the old urn:nomue:schema:record: prefix and extracts its version by colon
splitting. Those implementation adaptations are correctly anticipated in
principle, but do not substitute for the four authoritative repairs above.

**Requested repair:** amend the informative candidate's exact artifact inventory
to name these meta-schemas, the affected identity/reference fields, their
authority class, version/change treatment and tier rationale. Propose the
already-adopted HTTPS grammar and extensible capability grammar alongside
immutable legacy support, with exact-string equality and no aliasing. Specify
positive and negative grammar/old-registry conformance coverage. Do not simply
loosen every pattern to any URI, change historical bundle meanings, or require
an unused new canonicalization/attestation family. State-invariant requirement
grammar needs a further change only if a new entry actually references BTF.
Implementation of these changes is not required by this review-only task.

### S-2 - Bound numerical and dependency holds by existing CORE rules

**Priority: SHOULD-FIX. Gate: R4-P5, R4-P6 and public opening.**

Location: candidate paragraph after the existing-ID crosswalk, proposed
VERIFY-0029/0030 and "Numerical implementation holds".

The paragraph says final ordering, dependency not_run semantics and concrete
reason codes require their own closed versioned specification. Some details
do, but the current proposal does not identify the already fixed part:

| Omitted requirement                             | Existing rule in its actual owning clause                                                                                                                                          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NRS-VERIFY-0013, profile-admissibility-check.md | Admissibility and computability are evaluated and reported as distinct checks. Separate labels inside one aggregate check are insufficient.                                        |
| NRS-VERIFY-0017, same owner                     | Failed admissibility prevents dependent computability/recomputation from running, with the blocking reason identified. The operative clause is not limited to a named ITGC bundle. |

CANON-0006 also fixes check-owned tolerance authority, and CANON-0011 prevents
an empirical condition threshold from becoming an unversioned rejection rule.
The candidate's general preservation language is directionally right, but an
exact crosswalk that leaves these specific choices wholly unsettled is not an
adequate boundary for the proposed STABLE-INTENT opening decision. This is a
missing constraint/wording finding, not evidence that a new implementation has
already violated CORE or that the author intended to do so.

**Requested repair:** add these existing IDs and their actual owners; explicitly
preserve distinct admissibility/computability checks, the existing failed-
admissibility propagation rule, and check-owned tolerance authority. Limit the open
ordering work to the new checks' internal/dependency details consistent with
those rules. Projection, error bounds, numeric support and new reason codes may
remain held, but not the freedom to silently contradict those existing rules.
If a different meaning is intentionally proposed, name the affected CORE
change, identifier treatment and 60-day process before opening instead of
describing it as preservation.

Phase qualification checked separately: NRS-VERIFY-0020 appears under the
Phase 2A 0.2.1 successor section, and its requirements-registry note explicitly
limits it to welch-recompute:0.2.1-draft.1. This review does not treat that
check-specific rule as automatically operative on BTF or silently extend it to
older Welch checks. The factorial check must close its own p-value projection
and zero/positive comparison meaning; that remains a disclosed numerical hold.
Merely selecting a new check's explicit endpoint policy does not, by itself,
prove a change to that historical CORE requirement.

### N-1 - Complete the successor applicability and traceability checklist

**Priority: NICE-TO-HAVE for opening; required coverage before issuance.**

In the future coupled specification, make successor bindings explicit for
finite parsed-input numeric authority, independent integrity checking, no
Record-supplied code execution and the local reference chain. CANON-0009
expressly names Phase 1/2, PROV-0001 describes the existing Phase 1/2A method_id
chain, and SEC-0002 expressly names the Phase 1 verifier. Their names alone do
not provide a new Contract-bound scope. CORE-0021 solves the digest projection
binding; it should not be mistaken for all other successor bindings.

Also include VERIFY-0002, SEC-0001 and CANON-0010 in the preservation checklist
where their meaning is reused. This is not a demand to reopen their external
research or alter their historical wording. No extra-Record provenance or
source-decimal fidelity claim was found in the candidate.

### N-2 - Make representation completion criteria explicit

**Priority: NICE-TO-HAVE for opening; required before schema/check issuance.**

The local associations are reviewable, but model_applicability_declared has no
exact scalar type or supported/unsupported value treatment yet, and the new
report's per-contrast/per-quantity scope has no exact representation. Specify
required members, reference target/equality rules, the distinction between
unsupported declarations and malformed input, and how A/B/AB plus quantity
remain identifiable when evidence arrays are reordered. Preserve the two-factor
and Cartesian-product constraints in semantic checks where JSON Schema cannot
express them alone.

State that new report-local definitions, or a separately versioned common
schema explicitly added to the inventory, carry new check IDs, scopes and
evidence. Do not accidentally reuse the closed ITGC common definitions and
mutate them in place. This work can occur during discussion: the present review
does not require implemented schemas merely to open a properly bounded draft.

## 6. Numerical holds: opening, decision and implementation

The table distinguishes permission to discuss an undecided item from permission
to decide a supported Contract or encode it in authoritative implementation.
Neither historical numerical GO nor this table certifies a supported domain.

| Hold                                               | Opening disposition                                                                                                                                | Decision / implementation condition                                                                                                                                    |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exact represented-input target and input domain    | May remain explicit design work while discussing the accepted exact-real formulas. No new encoded-data calibration claim.                          | Bind numerical input meaning and every target to its successor owner; identify the relation to parsed binary64 and existing non-claims before dependent design freeze. |
| Cell means and signed estimates                    | No runtime graph or projection has been chosen; disclosure is sufficient for opening.                                                              | Reviewed arithmetic, range and error/projection rules for means and signed contrasts.                                                                                  |
| SS and SSE graph                                   | Direct-cell, centering, scaling and QR remain candidates, not adopted algorithms. Finite cancellation examples support keeping the hold.           | All relevant cancellation/range analysis, supported domain and independent truth evidence before selecting a supported graph.                                          |
| F ratio                                            | Exact formula is accepted; finite SSE=0 and intermediate failures are disclosed.                                                                   | Define computability domain, range/projection and deterministic treatment of exact zero and numerical ambiguity; never encode an undefined ratio as a valid result.    |
| F tail                                             | PR 190 is described as restricted exploratory evidence, not a general certified evaluator. No extra runtime proof needed just to discuss it.       | Independently reviewed algorithm, exact parameter scope, tail error and endpoint handling; no generalization from finite probes.                                       |
| Projection and comparison tolerance                | May stay unset; unset means no support. The applicable tolerance authority remains fixed; endpoint treatment needs an explicit new-check decision. | Close per-quantity projection, comparison, error/enclosure and explicit zero/positive treatment with independent oracle expectations.                                  |
| Underflow, overflow, subnormal and uncertain cases | Numerical failure handling may be held, with no guessed scientific endpoint.                                                                       | Complete version-owned dispositions and conformance evidence; resource refusal and scoped numerical failure stay distinct.                                             |
| Result-number constraints                          | Permissible structural/numerical hold for discussion, not permission to issue a schema with placeholders.                                          | Complete finite/safe-count/range/undefined-value representation and every required field before schema issuance.                                                       |
| Check identities, version and evidence shape       | Actual identities may wait for closed procedures; structural/semantic intent must stay scoped.                                                     | Complete check set, owner, exact bundle, report scope and reason applicability together; no incomplete operational bundle.                                             |
| Check ordering and propagation                     | **Only partially open**: S-2 preserves the existing CORE constraints before opening.                                                               | Finish the new dependency graph and fault ordering within those constraints, including blocking reasons and conformance gating.                                        |
| Resource bounds and platform predicates            | May remain explicit holds. Limits are not numerical accuracy evidence.                                                                             | Pin limits and supported platforms, certify their actual execution predicates, and retain old pre-routing/historical behavior.                                         |
| Independent expected values and conformance        | No numerical rerun required for this prose increment.                                                                                              | Independent balanced-case oracles and positive/negative/boundary fixtures remain mandatory; S6 staging does not waive them.                                            |

An opening decision may explicitly authorize discussion while these holds are
open. A later decision cannot truthfully declare the corresponding design
frozen or executable while its decision-bearing premises remain unresolved.
If numerical work changes a retained estimand, guarantee, identity, surface or
tier rather than filling an implementation detail, it needs a revised proposal
and applicable review before that changed meaning is accepted.

## 7. Release 3 reconciliation and gate dispositions

The actual main-tree paths resolve to the candidate's pins:

| Release 3 path under governance/drafts/release-3-preparation/ | Blob                                       |
| ------------------------------------------------------------- | ------------------------------------------ |
| README.md                                                     | `4dbb5170f839f83ef22d3297dae832098d5cc95d` |
| readiness-audit-2026-09-06.md                                 | `bc0bb942d429fe9a9ee4e959ea483972d4dbae4d` |

Read both documents. Release 3's one-way multi-group and protected-family
programme explicitly excludes factorial/interaction designs. The new candidate
uses neither its protected-family identity nor a multiplicity procedure, issued
schema or runtime. Shared exact-routing, integrity and scoped-output interfaces
come from existing main authority, not an unaccepted R3 branch. Possible F-tail,
projection or oracle research reuse remains conditional on exact scope review.
No release-number-order condition is imposed by the inspected RFC process.

There is no actual R3 dependency requiring another review for this fixed
bounded proposal. This does not certify the historical R3 progress table as
current across research branches. No R3 hold is closed or changed. Recheck main
and any shared-interface changes immediately before a future opening action.

| Item                                     | Disposition in this review                                                                                                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input/delivery identity and preservation | MATCH / INTACT; complete inspected trees pass the requested checks.                                                                                                           |
| Retained source claims                   | ACCEPTED EVIDENCE REUSED; no new uncovered retained claim found. Not a new PDF/source review; wider source commissions remain staged.                                         |
| R4-P1: meaning and sources               | BOUNDED GO for the accepted model, targets and marginal law; runtime failure representation remains expressly held. No wider source closure.                                  |
| R4-P2: first scope                       | GO for the stated Candidate A discussion scope and exclusions. No adoption or support decision.                                                                               |
| R4-P3: numerical feasibility map         | BOUNDED GO for an explicit map of exploratory evidence and unresolved holds, subject to S-2's invariant boundary; NOT a numerical-support GO.                                 |
| R4-P4: Release 3 relationship            | BOUNDED GO at the pinned main tree; no actual dependency or intervening main change found.                                                                                    |
| R4-P5: standalone RFC                    | REPAIR_REQUIRED: S-1 and S-2 prevent complete artifact/constraint/tier assessment as currently written.                                                                       |
| R4-P6: assembled review                  | This task-context assessment is completed, with the independence limits in Section 2; findings remain open and no unconditional independent-opening certification is given.   |
| Numerical support                        | NOT_ESTABLISHED; algorithms, domains, projections, checks and corresponding conformance remain held.                                                                          |
| Highest tier                             | STABLE-INTENT is supportable if repairs preserve CORE meaning; assess the added meta-schema surfaces explicitly. Minimum 30 days then; CORE changes would instead require 60. |
| Public opening                           | NOT_READY / no opening GO. Resolve and confirm S-1/S-2 first; do not start the clock from this review or PR.                                                                  |

Concrete next action: the candidate author repairs the informative proposal for
S-1/S-2, leaving this report and all accepted reviews unchanged, and supplies a
new immutable input and focused confirmation request. Confirmation should check
the exact meta-schema impact inventory, constrained hold wording, highest tier
and intervening main changes. New statistical research is needed only if that
repair expands the retained claim or exposes a concrete missing premise. A
later steward opening action, if supported, records the actual URL, input,
opening timestamp, tier and earliest decision time separately.

## 8. Verification and delivery record

Environment: Git 2.51.1; Node v24.19.0; pnpm 11.19.0; Python 3.12.14.
The packageManager field requests pnpm 11.7.0; the actually available executable
reported 11.19.0. Both checkouts installed the unchanged lockfile with
`pnpm install --frozen-lockfile --ignore-scripts`, reusing cached packages.
Relevant locked tools: Prettier 3.9.6, markdownlint-cli2 0.23.2,
TypeScript 7.0.2, tsx 4.23.11, Ajv 8.20.0 and YAML 2.9.0.

| Command / check                                   | Fixed input                                                                  | Handoff delivery          | Final review delivery                 |
| ------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------- | ------------------------------------- |
| pnpm format:check                                 | PASS                                                                         | PASS                      | PASS                                  |
| pnpm lint:markdown                                | PASS; 399 files, 0 issues                                                    | PASS; 400 files, 0 issues | PASS                                  |
| pnpm typecheck                                    | PASS                                                                         | PASS                      | PASS                                  |
| node --import tsx tooling/src/validate.ts         | PASS                                                                         | PASS                      | PASS                                  |
| node --import tsx tooling/src/generate.ts --check | PASS; 19 files match                                                         | PASS; 19 files match      | PASS                                  |
| git diff --check                                  | PASS, parent to input                                                        | PASS, input to delivery   | PASS                                  |
| Read-only schema counterexamples                  | Four valid baselines; four deliberately modified copies rejected as expected | Same schema bytes         | No mutation of registry/schema inputs |

The direct node invocations were used from the outset, as the handoff permits;
no tsx-wrapper failure is claimed in this task. Full runtime/conformance and
numerical suites were not rerun: no corresponding artifact changes, and they
cannot validate an unimplemented proposal. The additional schema tests address
the concrete compatibility gap without executing a proposed numerical method.

GitHub reported delivery CI run 34312284016 completed successfully. This hosted
result is supplementary and does not replace the two complete local-tree
checks or decide opening readiness.

Only review-inputs/r4-opening-rfc/REVIEW-RESULT.md is added on the fresh branch
review/r4-opening-rfc-assessment-20260909, based on the handoff delivery. The
submission targets research/r4-opening-rfc-candidate as a draft PR. No candidate
repair, merge, identifier issuance, ratification, discussion opening or Release 3
change is performed by this review.

## Appendix A. Reproducible structural counterexample

Run the following script with `node --input-type=module` on standard input from
the fixed checkout after dependency installation. It mutates only in-memory
copies. The synthetic review-probe check name tests the adopted grammar and is
not an allocation proposal. The code is preserved here to make the finding
reproducible without adding a second review file.

The executed script SHA-256 was
`6d3127929ede1ad8286774092eb49127f9a8638e18fca8ac4de5def6d519a7f4`;
its pretty-printed JSON output SHA-256 was
`820c2d92ccb94514922b75fad2eb66f0ddf37a41bf055e3a81c726cd6d659d75`.
Both hashes describe the executed scratch artifacts; Markdown formatting of
the code block need not preserve the script bytes.

The result was baseline_valid=true and modified_valid=false for each of the
four probes, with pattern failures at bundle/profile IDs, surface bundle/BTF
references, check-set/check/BTF references, and reason check/BTF references.
The main requirement registry grammar accepted both BTF requirement spellings.

```javascript
import fs from "node:fs";
import { Ajv2020 } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import yaml from "yaml";
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const read = (p) => yaml.parse(fs.readFileSync(p, "utf8"));
const bundle = "https://nomue.ai/id/bundle/balanced-two-factor/0.1.0-draft.1";
const profile = "https://nomue.ai/id/profile/balanced-two-factor/0.1.0-draft.1";
// Synthetic check spelling to test adopted grammar, not a proposed allocation.
const check = "https://nomue.ai/id/check/review-probe/0.1.0-draft.1";
const results = [];
function probe(name, schemaPath, registryPath, mutate) {
  const validate = ajv.compile(read(schemaPath));
  const data = read(registryPath);
  if (!validate(data)) throw new Error("Baseline invalid: " + name);
  mutate(data);
  const valid = validate(data);
  results.push({
    name,
    baseline_valid: true,
    modified_valid: valid,
    errors: (validate.errors ?? []).map((e) => ({
      path: e.instancePath,
      keyword: e.keyword,
      rule: e.params,
    })),
  });
  if (valid) throw new Error("Expected existing grammar rejection: " + name);
}
probe(
  "bundle and profile HTTPS identities",
  "schemas/meta/interpretation-bundles.schema.json",
  "registries/interpretation-bundles.yaml",
  (d) => {
    d.entries[0].bundle_id = bundle;
    d.entries[0].profile_id = profile;
  },
);
probe(
  "surface HTTPS applicability and BTF requirement",
  "schemas/meta/public-contract-surfaces.schema.json",
  "registries/public-contract-surfaces.yaml",
  (d) => {
    d.entries[0].applies_to_bundle_ids.push(bundle);
    d.entries[0].requirement_ids.push("NRS-CONTRACT-BTF-0001");
  },
);
probe(
  "check HTTPS identity and BTF requirement",
  "schemas/meta/public-checks-registry.schema.json",
  "registries/public-checks.yaml",
  (d) => {
    d.check_sets[0].check_ids.push(check);
    d.checks[0].check_id = check;
    d.checks[0].requirement_ids.push("NRS-PROFILE-BTF-0001");
  },
);
probe(
  "reason applicability and BTF requirement",
  "schemas/meta/reason-codes-registry.schema.json",
  "registries/reason-codes.yaml",
  (d) => {
    d.codes[0].applicable_check_ids.push(check);
    d.codes[0].requirement_ids.push("NRS-CONTRACT-BTF-0003");
  },
);
const requirements = read("schemas/meta/requirements-registry.schema.json");
const grammar = new RegExp(requirements.$defs.requirementId.pattern);
for (const id of ["NRS-CONTRACT-BTF-0001", "NRS-PROFILE-BTF-0001"]) {
  if (!grammar.test(id)) throw new Error("Main requirement grammar differs");
}
console.log(JSON.stringify({ results, requirement_registry_accepts_BTF_grammar: true }, null, 2));
```
