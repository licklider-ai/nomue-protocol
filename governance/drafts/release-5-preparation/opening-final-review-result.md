# Release 5 binding proposal fixed-input opening review result

**Status: informative pre-opening review evidence; non-normative; not adopted.** This
report evaluates the Release 5 public question at one fixed repository target. It
opens no public issue, issues no identifier, Requirement ID, schema, check or bundle,
modifies no normative artifact, closes no readiness gate and claims no steward
approval.

**Verdict: `REPAIR_AND_REREVIEW`.** Findings: 1 `BLOCKER`, 7 `SHOULD_FIX`,
5 `NICE_TO_HAVE`. The product/Protocol boundary, the projection model, the timing
semantics and the conditional family set are sound. The blocker is that the
proposal's stated problem and its "selected-tuple binding" are, at the reviewed head,
already enforced by existing rules, so the public question overstates what is new.
The genuinely new content (a cross-family declaration-completeness contract, a
timing status, a successor non-claim and a cross-family report view) is real but must
be what the question asks about.

## 1. Fixed target and identity check

| Field             | Value                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Repository        | `licklider-ai/nomue-protocol`                                                                                                       |
| Draft PR          | #342 "Prepare Release 5 declared-design binding discussion", head branch `proposal/r5-selection-evidence`, base `main`, draft, open |
| Head commit       | `c96f40855d96e3a3302349c51ad9474a2746732d` ("Keep Release 5 selection policy product-side", 2026-09-16T22:07:42Z)                   |
| Parent commit     | `28611e5cdbe00b146480e41cb29e8f2155d7af9a`                                                                                          |
| Head tree         | `c5b8caf55ce77c8c8e77373461ced2b638f51d06`                                                                                          |
| PR base commit    | `07b373655110afb34ab4bcc3933f83c69fba6f2c`; `origin/main` at review time was the same commit, and it is an ancestor of the head     |
| Drift             | none: GitHub PR head, parent, tree and base equal the expected identities; `TARGET_DRIFT` not raised                                |
| Base-to-head diff | 12 files, all under `governance/drafts/`; no authoritative, generated, schema, registry, fixture or reference artifact changes      |

Reviewed blobs at the head:

| #   | Path                                                                               | Blob                                       |
| --- | ---------------------------------------------------------------------------------- | ------------------------------------------ |
| 1   | `governance/drafts/release-5-preparation/README.md`                                | `e559e4ffa559f4bf659c65729b621a28fb705d7f` |
| 2   | `governance/drafts/release-5-preparation/steward-publication-boundary-decision.md` | `e50b8c5cace7b9a64843e1e0bc985307eb8d1439` |
| 3   | `governance/drafts/release-5-preparation/opening-rfc-candidate.md`                 | `c75e4bf5a076d9ddf65162bd5612fbd11795d3a4` |
| 4   | `governance/drafts/release-5-preparation/research-commission.md`                   | `a8c21219b39ec41f33f5eae85a58ea5cb44e9a25` |
| 5   | `governance/drafts/release-5-preparation/research-result.md`                       | `38b0779c48d7d8e0ca0eb72a0869b3d3cf1b95bb` |
| 6   | `governance/drafts/release-5-preparation/authority-and-surface-impact.md`          | `7ec20775eb584cc6e9adc74329fce3f97208f18a` |
| 7   | `governance/drafts/release-5-preparation/historical-preservation-plan.md`          | `d6a5300ee0a139326cbc71919fac722e674309f6` |
| 8   | `governance/drafts/release-5-preparation/public-discussion-readiness.md`           | `862a278e25ceffa13a118687c4e739ebf76e0abe` |
| 9   | `governance/drafts/release-5-preparation/opening-review-result.md`                 | `226ad2f8cc94dbede1b807717e74679749e75eec` |
| 10  | `governance/drafts/release-5-preparation/opening-close-review-result.md`           | `f24d9cffc23f7d2e525c8a33b7f651fd0e66b437` |
| 11  | `governance/drafts/release-5-preparation/opening-review-handoff.md`                | `62d59adaebcb5d0a4e23bcb3cf24aae9fcc1bff3` |
| 12  | `governance/drafts/release-horizon-r3-r20.md`                                      | `9fb4930cc792b22d8783360f0f15f302698304ac` |

Repository inputs read at the same head, in the order AGENTS.md requires: `AGENTS.md`,
`spec/AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, `authority/authority-manifest.yaml`,
`registries/requirements.yaml`, `governance/ID-POLICY.md`, `governance/RFC.md`,
`registries/stability-tiers.yaml`; then `spec/core/layer-boundary.md`,
`spec/core/record-envelope.md`, `spec/core/integrity-model.md`,
`spec/core/provenance-model.md`, `spec/core/verification-principles.md`,
`spec/core/record-lifecycle.md`, `spec/versioning/multi-bundle-dispatch.md`,
`spec/verification/{public-checks,profile-admissibility-check,verification-report}.md`,
`canonicalization/record-canonicalization.md` (NRS-CANON-0007),
`spec/profiles/independent-two-group-continuous/{phase-1-minimal-profile,admissibility,non-claims}.md`,
`schemas/profiles/itgc-guarantee-0.2.schema.json`, `schemas/meta/public-checks-registry.schema.json`,
`registries/{interpretation-bundles,public-checks,vocabulary}.yaml`,
`governance/drafts/RELEASE-STATUS.md`, the Release 2 candidate schemas, the Release 2
and Release 3 RFC drafts, and the Release 3 semantic research result.

The prior review records (blobs 5, 9, 10) were read as evidence. Their conclusions
were re-derived, not adopted; where this report disagrees with them it says so
(Section 3, B-1, and Section 8).

## 2. Independence, mechanism and access disclosure

- **Context.** This review was requested as a fresh-context R5-P8 candidate. It was
  not performed in a fresh context: the same session and the same model instance
  produced `research-result.md`, `opening-review-result.md` and the chat review that
  the author preserved as `opening-close-review-result.md`. That fact cannot be changed
  by instruction and is disclosed here as material. The reviewer did not author, edit
  or advise on any proposal document, the steward decision, the horizon, or any
  implementation.
- **Consequence for R5-P8.** This report can serve as fixed-input review evidence and
  it re-evaluates every earlier conclusion independently (several are revised below).
  Whether it satisfies the readiness ledger's "fresh-context" wording is a steward
  decision; the reviewer does not claim that it does. If the steward requires literal
  fresh-context independence, commission one more pass in a new session against this
  same head and treat this report as its input.
- **Mechanism.** An Anthropic language model (`claude-fable-5-1`) in a Claude Code
  remote session, disclosed because it is material to reproducibility and to the
  RFC.md separate-model requirement. Not human-expert review. No provider or model
  name appears in the branch name, commit message or pull-request title.
- **Source access.** Every direct external document fetch was refused by the
  session's network egress policy on all hosts tried; only search excerpts were
  reachable. This review therefore relies on repository artifacts and on
  repository-recorded full-text inspections. R5-P2 is not closed by this review and
  cannot be; hold `R5-RH-1` remains open.
- **Drift.** None (Section 1).

## 3. Central question 1: what Release 5 adds beyond existing rules

Method: for each claimed component, locate the existing rule that already enforces it
at the reviewed head, then state the residual.

| Component                            | Already enforced by                                                                                                                                                                                                                                                                                                                          | Residual Release 5 content                                                                                                                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Declaration completeness             | Closed Profile schemas with `required` declaration members (ITGC 0.2 requires `grouping_structure`, `pairing`, `repeated_measurements`, `clustering`, `analysis_population`, `missing_outcomes`, `transformation`, `weighting`, `outcome.scale`); NRS-CORE-0007 closed surface; Release 2 candidate and Release 3 D0 follow the same pattern | A cross-family requirement that every future Profile carry a truth carrier for each projected fact. This is a constraint on Profile design, not on Records. It is new and useful.                                                       |
| Design Declaration Envelope          | nothing (no cross-family view exists)                                                                                                                                                                                                                                                                                                        | The projection definition and its per-Profile mapping tables. New. Because the projection is not stored, it is verifiable only as a derived view the verifier emits, not as Record content.                                             |
| Selected-tuple binding (exactly one) | `interpretation_bundle_id`, `profile_id` and (successor) `analysis.contract_id` are single string members; NRS-CANON-0007 rejects duplicate member names before routing; closed schemas reject extra identity fields; a bundle-specific schema pins `contract_id` by `const` (Release 2 candidate) and the bundle registry pins `profile_id` | None. "Exactly one tuple through existing carriers" is already a conformance fact. The only residual is a consistency check that the bundle registry lists the Record's Profile and Contract, which bundle-specific schemas already do. |
| Selection timing evidence            | nothing                                                                                                                                                                                                                                                                                                                                      | New Record-side fact with defined reference event and evidence echo. This is the one genuinely new Record field.                                                                                                                        |
| Integrity binding to the revision    | NRS-CORE-0005, NRS-CORE-0006, the record-integrity check (JCS/SHA-256 over the whole projection)                                                                                                                                                                                                                                             | None. Any new field is bound by existing digest rules automatically.                                                                                                                                                                    |
| Scoped non-claims                    | NRS-CORE-0009 (conformance and admissibility only), NRS-VERIFY-0001/0003, report `guarantee_boundary`                                                                                                                                                                                                                                        | A successor clause and additive report boundary members covering selection quality, uniqueness, timing truth and policy identity. New and necessary because NRS-CORE-0009 does not reach a binding check.                               |
| Historical preservation              | NRS-CORE-0010, NRS-VERSION-0006, release-1 history guard, pinned suites                                                                                                                                                                                                                                                                      | Process only; the plan is adequate (Section 7).                                                                                                                                                                                         |

Conclusion: Release 5 has not collapsed to re-recording identities, but its
"binding" vocabulary describes the part that _has_ collapsed. Its independent value
lies in four things: (a) the cross-family declaration-completeness contract on
Profiles, expressed as the projection definition; (b) the timing status; (c) the
successor non-claim clause and report boundary; (d) a cross-family report view a
relying party can read without knowing each Profile's vocabulary. That is enough for
an additive STABLE-INTENT increment, and it is the question the public should be
asked. See B-1.

## 4. Findings

Severity: `BLOCKER` = must be repaired before steward opening authorization is
requested; `SHOULD_FIX` = repair before opening, or name as an explicit hold in the
opening text and close before design freeze; `NICE_TO_HAVE` = editorial.

### BLOCKER

**B-1. The Problem statement and the "binding" framing rest on a premise the
repository already refutes.** `opening-rfc-candidate.md` says that "without that
binding, a product can name a valid Contract while omitting the declarations needed
to assess whether its selected Profile admits the design". At the reviewed head every
issued or candidate Profile schema requires those declarations and closes the object,
so such a Record fails conformance today (Section 3). Likewise "exactly one selected
tuple through existing identity carriers" is already guaranteed by single-valued
members, NRS-CANON-0007 and closed schemas. A public question motivated by a gap
that does not exist contains a hidden false premise and would invite discussion of
the wrong thing.
Repair: rewrite "Decision requested" and "Problem" around the residuals in Section 3:
(1) a cross-family requirement that Profiles carry the projected facts; (2) the
projection definition with per-Profile mapping tables, emitted as verifier evidence;
(3) the timing status; (4) the successor non-claim and report boundary. Keep the
tuple-binding language only as a description of what the check _consumes_ from
existing conformance, not as what Release 5 adds. Must close before opening.

### SHOULD_FIX

**S-1. Timing status has no Profile-owned truth carrier, contradicting the projection
rule.** The projection section lists "selection-timing status" among projected facts,
but invariant 4 and the impact inventory say every projected fact has one truth
carrier in its owning Profile. Timing is owned by the Release 5 successor Record
surface, not by any Profile. State that the projection has exactly one non-Profile
input, name its owner, and keep it out of the "Profile-owned" wording. Must close
before opening (it is part of the declaration-ownership question).

**S-2. The optional opaque provenance reference is extra-Record provenance, which
NRS-PROV-0002 defers.** A reference to "a product-side selection event" is a
relationship to something outside the Record. NRS-PROV-0002 (EXPERIMENTAL) states the
specification must not be read as making claims about extra-Record provenance and
defers any such format to a future phase. Including the reference would require
amending or superseding that clause and would invite exactly the "private policy was
used" reading the non-claims exclude. Exclude it from the first slice and list it
under explicit exclusions; the impact inventory already names "or its exclusion" as
an option. May be an explicit hold during discussion if the steward prefers, but the
default should be exclusion.

**S-3. "Attribution evidence" is claimed as verifiable in the steward decision but
undefined in the proposal.** `steward-publication-boundary-decision.md` lists
"selection timing and attribution evidence" as something the public Protocol may
verify. The RFC candidate defines timing only and says attribution references may be
represented but not authenticated. Attribution belongs to the approval and attestation
phases (`NRS-APPROVE-0002` already owns `approver_id`), and AGENTS.md forbids
out-of-phase fields. Remove "attribution evidence" from the steward decision's
verifiable list or define it as out of the first slice. Must close before opening
because the steward decision is the boundary the public will read.

**S-4. The non-claim list is inconsistent across the four documents.** The steward
decision excludes "only eligible", "correct, optimal, unbiased or preregistered",
"another Contract would have been inadmissible or inferior", "particular private
policy" and "independently reproduced the selection". RFC invariant 6 lists only
"truthful", "correct or optimal", "assumptions hold", "project is valid". The impact
inventory adds "authorization", "uniqueness", "numerical correctness". Consolidate one
list of nine non-claims in the RFC (uniqueness, optimality, fairness or absence of
bias, preregistration, declaration truth, assumption truth, numerical correctness,
whole-project validity, use of any particular private policy) and reference it from
the other documents. Must close before opening.

**S-5. Per-Profile projection mapping tables are not yet named as part of the
cross-cutting specification.** Mapping ITGC `pairing: none` and the Release 2
candidate `grouping_structure: paired_two_condition` onto one "independent or paired
relationship" value is safe only if the mapping is an explicit, versioned table owned
by the cross-cutting specification and referenced by each Profile. Without that, a
generic name-matching projection would silently change meaning when a Profile renames
or splits a field. State that each participating Profile version carries or is
referenced by an explicit projection table. May remain an explicit hold during
discussion; must close before design freeze.

**S-6. Ledger states R5-P1 and R5-P4 as `PREPARED` on a premise this review rejects.**
With B-1 open, the bounded question is not yet the right question. Set R5-P1 and
R5-P4 to `OPEN` until B-1 is repaired, then to `PREPARED` pending the fresh-context
confirmation the ledger already requires. Must close before opening.

**S-7. The check's evidence content is unspecified.** The candidate says every result
carries the timing status. It should also say that a passed result carries the
projection as emitted evidence and the identities of the Profile-admissibility result
it depended on, so that a relying party can see what was bound without re-deriving
it. Otherwise the `consistency_only` check has no inspectable output beyond `passed`.
May remain an explicit hold during discussion; must close before design freeze.

### NICE_TO_HAVE

**N-1.** In the first slice the three families are disjoint by declared structure and
the two-group and paired families have one candidate Contract each, so a product's
"selection" is fully reconstructible from public Profile admissibility. The strategic
framing in the steward decision (retaining selection rules as a competitive asset)
becomes operative only when a family has several Contracts. Say so; it prevents
readers from inferring a hidden mechanism.

**N-2.** For a system-based selector, state that outcome values present in the
selector's input context count as "access" for the timing status. This closes an
obvious evasion without adding a field.

**N-3.** The historical-preservation plan should also name `pnpm evidence:phase2a
--check`, `pnpm oracle:phase2a` and `pnpm snapshot:manifest --check-candidate` (when a
candidate freeze exists) among the unchanged-evidence comparisons.

**N-4.** The impact inventory's two cross-cutting rows (projection; binding and
non-claims) can be one specification document. A second document would create two
owners for closely coupled meaning.

**N-5.** Requirement-ID namespace: the projected-fact and timing clauses fit the
existing `NRS-CORE` prefix and the check fits `NRS-VERIFY`. No new prefix is needed;
say so to pre-empt a namespace debate.

## 5. Answers to the central questions

| #   | Question                          | Answer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Independent Protocol value        | Present but misdescribed (Section 3, B-1). Not a mere re-recording of identities once reframed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2   | Product/Protocol boundary         | Consistent with the Charter and with NRS-CORE-0001/0002. The Protocol does not redefine selection logic; admissibility is not used as a selector (it judges declared structure, and in the first slice its outcome coincides with the only conforming Contract, which is a public fact, N-1). The opaque reference is the one leak risk (S-2). The Protocol claims nothing beyond which tuple was selected, provided S-4 is applied.                                                                                                                                                                |
| 3   | Envelope projection boundary      | Consistent as a projection: no duplicate store, no circularity (projection and admissibility both read Profile fields; the check reads both plus the admissibility result). Two gaps: the timing input is not Profile-owned (S-1); the mapping tables are not yet named (S-5). All eight projected facts have carriers in ITGC 0.2 (`outcome.scale`, `experimental_unit_type`, `grouping_structure`, `pairing`, `groups`, `repeated_measurements`, `clustering`, `analysis_population`); the Release 2 candidate has equivalents; the Release 3 D0 surface is a candidate.                          |
| 4   | Selected-tuple binding            | "One tuple on the Record" is existing conformance. "Several Contracts eligible, product chose one" is correctly separated from Protocol claims by the non-claims (S-4). No overlap with exact dispatch: dispatch precedes interpretation; the binding check runs after admissibility inside the bundle.                                                                                                                                                                                                                                                                                             |
| 5   | Relation to Profile admissibility | Correct: `depends_on` with `not_run_with_blocking_reason_codes` is the existing mechanism (NRS-VERIFY-0017). Failure ordering: conformance, integrity, admissibility, then binding; an inadmissible Profile yields a `not_run` binding result carrying the admissibility reason codes; reason codes stay in `registries/reason-codes.yaml`. No contradiction.                                                                                                                                                                                                                                       |
| 6   | Timing meaning                    | Adequate: `pre_outcome` is defined by access to observed outcome values of the declared analysis population; explicitly not equated with pre-collection or pre-unblinding; `post_outcome` and `unknown` can pass; evidence echo is required. N-2 closes the system-selector edge.                                                                                                                                                                                                                                                                                                                   |
| 7   | Non-claims                        | All nine are present somewhere in the package but not in one place (S-4).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 8   | Conditional family set            | All three conditional; the Release 1 legacy `method_id` is explicitly not treated as a Contract; Release 4 meaning excluded and the four-group case is left to the Release 3 flattened-design declaration. Confirmed.                                                                                                                                                                                                                                                                                                                                                                               |
| 9   | Authority and surface impact      | One cross-cutting specification is needed (N-4); successor Record schema is needed for the timing member in every family and for any missing carrier; report schema needs an additive version for boundary members; `consistency_only` is the correct evidence class; bundle additions preserve `allowed_check_ids`; existing prefixes suffice (N-5); opt-in migration is right; exclude the opaque reference (S-2). Policy removal is consistent: only negations remain in the eleven live documents; the historical close-review record retains its policy findings as history, which is correct. |
| 10  | Historical preservation           | The plan covers every listed item (Section 7). Sufficient to move R5-P6 toward `PREPARED` once the fixture inventory is attached.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 11  | Tier and window                   | STABLE-INTENT and 30 days are defensible (Section 6).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 12  | Research Gate                     | The commission's revised questions 3, 4, 11, 12, 13 match the narrowed scope; no registered-policy premise remains in the commission. The research result's holds `R5-RH-3` and `R5-RH-4` are superseded by the steward decision and should be marked so in a later addendum, not by editing the frozen result. R5-P2 stays `PARTIAL`.                                                                                                                                                                                                                                                              |

## 6. Stability tier and window

Additive throughout: new cross-cutting clauses (STABLE-INTENT), new successor Record
and report schema versions (EXPERIMENTAL), new check and bundle entries, new reason
codes, no edit to NRS-CORE-0009, NRS-VERSION-0005/0007/0008, NRS-CORE-0001/0002 or
NRS-VERIFY-0013/0017. Highest affected tier STABLE-INTENT, minimum 30 days. Two
conditions: the opaque provenance reference is excluded (otherwise NRS-PROV-0002,
EXPERIMENTAL, would have to be superseded, which is not CORE but is a change to an
existing clause), and the projection is not made a stored Record object (which would
duplicate Profile-owned facts and reopen ownership).

## 7. Historical preservation

The plan names all required items: Release 1 fixtures and canonical bytes,
`release-1-history.ts`, `pnpm regression:phase1`, existing `allowed_check_ids`,
existing report schemas, no defaults into legacy Records, exact-dispatch failure for
unsupported combinations, future Release 2 and Release 3 pins, a zero-or-two-tuple
negative fixture, and no rewriting of expected outputs. Additive by construction at
this head. Remaining before `PREPARED`: attach the exact fixture inventory; before
close: the fixed tests must exist and pass at the reviewed implementation commit.
See N-3.

## 8. Counterexamples

Each row fixes a Record and names the single owner of the outcome.

| #   | Case                                                                                                                     | Owner                                                          | Outcome at the reviewed design                                                                                                                                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Two Contracts eligible for the same declarations (e.g., Release 3 omnibus vs. a Holm p-value Contract); Record names one | product-only behavior + non-claims                             | Binding passes for the named tuple; the report asserts nothing about the other Contract (S-4). Which was chosen is product behavior.                                                                                                      |
| 2   | Selected Profile does not admit the declarations (paired declared, ITGC selected)                                        | Profile admissibility                                          | Admissibility fails (NRS-PROFILE-ITGC-0019); binding is `not_run` with the blocking codes (NRS-VERIFY-0017).                                                                                                                              |
| 3   | Required declaration missing                                                                                             | schema validation                                              | Conformance failure (closed schema, `required`); nothing downstream runs. Release 5 adds the cross-Profile requirement that such a carrier must exist (Section 3).                                                                        |
| 4   | Declarations contradict each other (`grouping_structure: independent_groups` with `pairing: present`)                    | Profile admissibility                                          | Schema admits the representation; admissibility fails; binding `not_run`.                                                                                                                                                                 |
| 5   | A stored value differs from the Profile-owned truth carrier                                                              | unsupported / out of scope                                     | Cannot occur: the envelope is not stored. If a future schema stored a copy, the closed schema would reject the extra member. This is the reason the projection must stay unstored.                                                        |
| 6   | Duplicate Contract, Profile or bundle identity members                                                                   | exact bundle dispatch (pre-routing)                            | NRS-CANON-0007 rejects duplicate member names before routing; a second identity field is rejected by the closed schema. Already handled; not Release 5 content.                                                                           |
| 7   | Selected tuple disagrees with existing carriers                                                                          | schema validation / binding check                              | Cannot occur for a Record that only references the carriers (no second copy). If a bundle schema pins `contract_id` by `const`, a mismatch is a conformance failure.                                                                      |
| 8   | `post_outcome`, structurally consistent                                                                                  | binding check + verification report                            | Passes; timing status appears in evidence; the successor non-claim states that passing is not preregistration.                                                                                                                            |
| 9   | `unknown`                                                                                                                | binding check + verification report                            | Same as 8; `unknown` is a permitted attributed value, never a default.                                                                                                                                                                    |
| 10  | Product-side provenance absent or opaque                                                                                 | out of scope (S-2)                                             | No effect on any result; NRS-PROV-0002 defers extra-Record provenance.                                                                                                                                                                    |
| 11  | Independent-two-group successor Contract not yet issued                                                                  | exact bundle dispatch                                          | No R5-aware bundle can list that family; a Record naming a nonexistent bundle is refused with `NRS-UNSUPPORTED-BUNDLE`. Family remains conditional.                                                                                       |
| 12  | Legacy Record without Release 5 evidence                                                                                 | exact bundle dispatch                                          | Verifies under its historical bundle exactly as pinned; no default is added.                                                                                                                                                              |
| 13  | Release 5 evidence under a non-supporting bundle                                                                         | exact bundle dispatch / schema validation                      | Either the bundle is unsupported (refusal) or the bundle's closed schema rejects the unknown members. No fallback.                                                                                                                        |
| 14  | 2-by-2 factorial declared as one-way k = 4                                                                               | Profile admissibility (Release 3 flattened-design declaration) | The projection shows "independent, 4 groups"; it does not detect the factorial structure. The Release 3 D0 assertion is the owner; a false assertion is covered by `declaration_truth: not_asserted`. Release 4 meaning is not consulted. |

## 9. Gate-by-gate disposition

| Gate  | Subject                         | Current     | Proposed                                          | Basis                                                                                                              | Closure evidence                                                                    | Before opening | Hold during discussion | Before design freeze  |
| ----- | ------------------------------- | ----------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------- | ---------------------- | --------------------- |
| R5-P1 | Bounded question and exclusions | PREPARED    | OPEN                                              | B-1: the question is scoped to Layer 1 but is motivated by a non-existent gap                                      | Rewritten Decision and Problem sections; S-2 exclusion; S-3 alignment               | yes            | no                     | yes                   |
| R5-P2 | Research Gate evidence          | PARTIAL     | PARTIAL                                           | Full-text hold `R5-RH-1` open; this review has no external access; commission questions fit the narrowed scope     | Addendum by an investigator with full-text access answering commission 11–14        | no             | yes (named)            | yes                   |
| R5-P3 | Predecessor reconciliation      | OPEN        | OPEN                                              | No issued Contract in any family; Release 2 decision earliest 2026-09-25; Release 3 open                           | Exact mapping once Release 2 disposition and any successor two-group Contract exist | no             | yes (named)            | yes                   |
| R5-P4 | Decision semantics              | PREPARED    | OPEN                                              | Boundary, projection and timing semantics are sound; S-1, S-4, S-7 leave ownership and evidence content incomplete | Repaired text for S-1, S-4, S-7 and fresh-context confirmation                      | yes (S-1, S-4) | S-7 may be held        | yes                   |
| R5-P5 | Authority and surface impact    | OPEN        | OPEN                                              | Inventory names owners but no clauses, IDs, schemas, check or reason codes exist                                   | Exact inventory; S-2 exclusion recorded; N-4/N-5 decided                            | no             | yes (named)            | yes                   |
| R5-P6 | Historical preservation         | OPEN        | OPEN, plan adequate                               | Plan covers all required surfaces; fixture inventory not attached                                                  | Fixture inventory, then fixed tests passing at the implementation commit            | no             | yes (named)            | tests before adoption |
| R5-P7 | Tier and window                 | PROVISIONAL | PROVISIONAL (STABLE-INTENT / 30 days supportable) | Additive under the two conditions in Section 6                                                                     | Final impact inventory confirming no CORE edit                                      | tier stated    | yes                    | yes                   |
| R5-P8 | Independent opening review      | OPEN        | OPEN                                              | This report is fixed-input review evidence but not fresh-context; findings require repair                          | Repair B-1, S-1, S-3, S-4, S-6; then one fresh-context confirmation                 | yes            | no                     | yes                   |

## 10. Required repairs, in order

1. B-1: rewrite "Decision requested" and "Problem" around the four residuals.
2. S-1: name the timing status as the one non-Profile projection input and its owner.
3. S-3: align the steward decision's verifiable list with the RFC (no attribution
   evidence in the first slice).
4. S-4: one consolidated nine-item non-claim list in the RFC, referenced elsewhere.
5. S-2: move the opaque provenance reference to explicit exclusions.
6. S-6: set R5-P1 and R5-P4 to `OPEN` until the above land.
7. S-5 and S-7: resolve or name as holds with a design-freeze deadline.
8. N-1 to N-5 as convenient.
9. Freeze the repaired head; commission a fresh-context confirmation; then request
   steward authorization.

## 11. Validation on the review branch

Branch `review/r5-binding-opening-20260916`, rooted at
`c96f40855d96e3a3302349c51ad9474a2746732d`, with this file as the only addition.
Node 22.22.2, pnpm 11.7.0, frozen-lockfile install.

| Command                | Result                                                                                                                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`    | pass (all matched files use Prettier code style)                                                                                                                                                                                    |
| `pnpm lint:markdown`   | pass (662 files, 0 issues)                                                                                                                                                                                                          |
| `pnpm typecheck`       | pass                                                                                                                                                                                                                                |
| `pnpm validate`        | pass (registries, traceability, normative lint, authority, gates, conformance manifest, links, private-dependency, language and code-path audits, snapshot manifest mechanism)                                                      |
| `pnpm check:generated` | pass (19 generated files match their sources)                                                                                                                                                                                       |
| `pnpm check`           | pass: 55 test files, 520 tests; Phase 1 suite (13 schemas, 16 vectors, 132 fixtures, evidence 8 files); Phase 2A suite (88 + 44 + 8 fixtures, oracle max relative difference 8.96e-15, evidence 10 files); 0.2.1 suite (6 fixtures) |

No authoritative, generated, schema, registry, fixture or reference artifact was
modified. The `R` oracle was unavailable in the Phase 2A comparison, as the
repository's own check output records; that gate is closed separately.

## 12. Verdict

`REPAIR_AND_REREVIEW`. The proposal is inside Layer 1, keeps selection policy
product-side in a way that is consistent with the Charter, defines the envelope as a
projection without a second store, defines timing precisely, and keeps every family
conditional. It is not yet ready to request steward opening authorization because its
public question is motivated by a gap the repository already closes; once the question
is restated around what Release 5 genuinely adds, the remaining repairs are small and
one fresh-context confirmation should suffice. This report authorizes nothing.
