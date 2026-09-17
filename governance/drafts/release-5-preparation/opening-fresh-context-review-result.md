# Release 5 repaired proposal fresh-context close-only review result

**Status: informative pre-opening review evidence; non-normative; not adopted.** This
report reviews the repaired Release 5 opening proposal at one fixed repository
target. It opens no public issue, starts no clock, issues no identifier, Requirement
ID, schema, check or bundle, modifies no normative artifact, closes no readiness
gate and claims no steward authorization.

**Verdict: `REPAIR_AND_REREVIEW` (narrow).** Findings: 0 `BLOCKER`, 4 `SHOULD_FIX`,
6 `NICE_TO_HAVE`. The repaired question now asks about four genuine additive
residuals, the projection model has one truth carrier per fact with explicit
versioned mappings, timing is the sole non-Profile input, provenance and
attribution are excluded consistently, R5-P1, R5-P4 and R5-P8 are correctly
`OPEN`, and additive STABLE-INTENT with a 30-day minimum remains defensible. The
remaining repairs are textual, do not change the question's structure, and can be
confirmed by a close-only diff review rather than a new full review.

## 1. Fixed target and identity check

| Field             | Value                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Repository        | `licklider-ai/nomue-protocol`                                                                                                        |
| Draft PR          | #342 "Prepare Release 5 cross-family declared-design evidence discussion", head `proposal/r5-selection-evidence`, base `main`, draft |
| Head commit       | `0d6265f6fee059d8f8f8650600483b3a1b5e2090` ("Format repaired Release 5 horizon entry")                                               |
| Parent commit     | `48f8c57c7718977a5f434917aff968f78e96e954` ("Repair Release 5 around cross-family evidence")                                         |
| Head tree         | `f6cfdc4387a98c787c37baefc2c2b2fe62526b97`                                                                                           |
| PR base           | `07b373655110afb34ab4bcc3933f83c69fba6f2c`; `origin/main` at review time was the same commit and is the merge base                   |
| Drift             | none: GitHub PR head, parent, tree and base equal the expected identities; `TARGET_DRIFT` not raised                                 |
| Base-to-head diff | 13 files, all under `governance/drafts/`; no authoritative, generated, schema, registry, fixture or reference artifact changes       |
| CI on head        | 12 GitHub check runs, all `success`                                                                                                  |

Reviewed blobs at the head:

| Path                                                                               | Blob                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------------ |
| `governance/drafts/release-5-preparation/README.md`                                | `d22c6c3e9782c06f591bcaca88f947489055a696` |
| `governance/drafts/release-5-preparation/opening-rfc-candidate.md`                 | `0b93fcfc06f658f5c1cc95842199f57738ba8540` |
| `governance/drafts/release-5-preparation/research-commission.md`                   | `67ea442e64622af31cd4d6a96b43424ae6fff5c6` |
| `governance/drafts/release-5-preparation/research-result.md`                       | `38b0779c48d7d8e0ca0eb72a0869b3d3cf1b95bb` |
| `governance/drafts/release-5-preparation/public-discussion-readiness.md`           | `af2d3632ff59ccef58263f7d78e44611dc8a5af6` |
| `governance/drafts/release-5-preparation/authority-and-surface-impact.md`          | `620c5b18c481a942c5802eca6ec133a988b95e38` |
| `governance/drafts/release-5-preparation/historical-preservation-plan.md`          | `d21a96602b17b4d8290ab19703ded4221bc787cf` |
| `governance/drafts/release-5-preparation/opening-review-result.md`                 | `226ad2f8cc94dbede1b807717e74679749e75eec` |
| `governance/drafts/release-5-preparation/opening-close-review-result.md`           | `f24d9cffc23f7d2e525c8a33b7f651fd0e66b437` |
| `governance/drafts/release-5-preparation/opening-final-review-result.md`           | `c259d4845b53c2e31dffa4999ad489d6b92da31c` |
| `governance/drafts/release-5-preparation/steward-publication-boundary-decision.md` | `437673ebe03eecbc52dd3e9579dbe2bf3e68b99f` |
| `governance/drafts/release-5-preparation/opening-review-handoff.md`                | `0680e7a1ca968d6ff5784f052714395d8c94d05f` |
| `governance/drafts/release-horizon-r3-r20.md`                                      | `e3d7fec71ae2f2442b436e46aa6bb4a2687a5f1c` |

Repository ground truth consulted at the same head: `AGENTS.md`,
`registries/requirements.yaml` (NRS-CORE-0001/0002/0008/0009, NRS-VERIFY-0001/0011/
0013/0017, NRS-VERSION-0005/0007/0008, NRS-PROV-0002, NRS-APPROVE-0002),
`registries/stability-tiers.yaml`, `registries/public-checks.yaml`,
`registries/interpretation-bundles.yaml`, `registries/public-contract-surfaces.yaml`,
`schemas/record/record-0.2.schema.json`, `schemas/profiles/itgc-guarantee-0.2.schema.json`,
`schemas/reports/verification-report-0.2-draft-3.schema.json`,
`spec/profiles/independent-two-group-continuous/non-claims.md`,
`spec/core/layer-boundary.md`, `spec/core/provenance-model.md`,
`spec/verification/profile-admissibility-check.md`, `governance/drafts/RELEASE-STATUS.md`
and the Release 2 candidate schema
`governance/drafts/release-2-candidate/schemas/paired-two-condition-continuous-0.1.candidate.schema.json`.

## 2. Independence, mechanism and access disclosure

- **Independence.** Fresh session with no access to the proposal author's working
  context, summaries or notes. The three earlier review records were read as
  history of what was found, but every determination below was re-derived from the
  head blobs and the repository ground truth listed above; none of their conclusions
  is inherited.
- **Mechanism.** The reviewer is an Anthropic language model in a Claude Code remote
  session (session configured as `claude-fable-5-1`; the serving model can differ).
  Disclosed as material to reproducibility. This is not human-expert review and it is
  not steward review.
- **Source access.** No external source was fetched or needed. This is a close-only
  review of the repaired proposal text against the repository. Hold `R5-RH-1`
  (full-text confirmation of snippet sources) is untouched and remains open.
- **Scope of action.** No public issue was opened, no clock started, no identifier
  issued, no normative artifact modified, PR #342 not merged, no steward
  authorization claimed. This file is the only addition on the review branch.

## 3. Determinations

### 3.1 The four genuine additions (handoff question 1; task item 1)

Confirmed. "Decision requested" names exactly four additions: the cross-family
completeness contract with versioned per-Profile projection mappings, a
successor-Record-owned timing status, a successor non-claim boundary and a common
inspectable report view. "Problem" states that declarations, one selected tuple and
integrity binding are existing guarantees and that R5 consumes them. Verified against
the head: ITGC 0.2 closes its `declarations` object and requires `grouping_structure`,
`pairing`, `repeated_measurements`, `clustering` and `analysis_population`; the Record
0.2 schema carries single `interpretation_bundle_id` and `profile_id` members; no
cross-family projection, timing surface or cross-family non-claim exists anywhere in
`spec/`, `schemas/` or `registries/`. The residual framing is accurate, with one
overstatement about the Contract identity carrier (S-4).

### 3.2 One truth carrier and explicit versioned mappings (question 2; item 2)

Confirmed in principle. Invariant 4 and "Declaration ownership and projection" define
the envelope as an unstored deterministic projection with exactly one truth carrier per
fact, an explicit versioned mapping table per participating Profile version owned by
one cross-cutting specification, and no name matching. For ITGC 0.2 every projected
fact has a carrier at the head: `outcome.scale`, `experimental_unit_type`,
`grouping_structure`, `pairing`, `groups` (fixed at two), `repeated_measurements`,
`clustering`, `analysis_population`. The Release 2 candidate and Release 3 D0 surfaces
are candidates and the exact tables are correctly held under R5-P5. No circular
admissibility: the projection and admissibility both read Profile fields; the check
reads both plus the admissibility result, and admissibility never reads the check.
One ownership ambiguity remains (S-2).

### 3.3 Selection timing as the sole non-Profile input (question 3; item 3)

Confirmed as to ownership and reference event: required, non-defaulted, owned by the
successor Record surface, three closed values, reference event is access to observed
outcome values, selector input context counts as access, `pre_outcome` is not
pre-collection or pre-unblinding, the status is echoed in every result. Two gaps: the
object of "the selection decision" is undefined (S-1), and "sole" holds only if added
design-fact carriers never live in the R5 successor Record surface (S-2).

### 3.4 The nine non-claims (question 4; item 4)

Consistent: the same nine items (uniqueness, optimality, fairness or absence of bias,
preregistration, declaration truth, assumption truth, numerical correctness,
whole-project validity, use of any particular private policy) appear identically in
RFC invariant 6, the steward decision, the impact inventory and the PR description;
the readiness record references them by count. Not complete against the research
result's own recommended list (S-3).

### 3.5 Result evidence content (question 5; item 5)

Confirmed. "Common verification-report view" lists the selected Profile identifier and
version, mapping identifier and version, each projected fact with value and exact
source path, timing status, consumed Contract, Profile and bundle identities, the
exact depended-on admissibility result identity and outcome, and the non-claim
boundary (by stable clause reference permitted). The view is derived verifier output,
not a store, which is consistent with NRS-CORE-0008 and NRS-VERIFY-0011. Evidence for
`not_run` and errored outcomes is unspecified (N-2).

### 3.6 Opaque provenance, attribution and attestation (question 6; item 6)

Confirmed excluded consistently. The RFC excludes them in the boundary section and the
explicit exclusions; the steward decision, impact inventory and readiness record say
the same; the research commission's Q7 asks the matching question. No live document
retains an opaque product-event reference, an attribution claim, a `selection-policy`
identifier family, registry, ADR, vocabulary term, authority-manifest target,
multiple-match semantics or preference mechanism. The historical review records retain
those terms only as history. NRS-PROV-0002 is therefore not amended.

### 3.7 R5-P1, R5-P4 and R5-P8 (question 7; item 7)

Confirmed `OPEN` in the readiness table and the PR description, with the explicit rule
that author-side repair does not move an `OPEN` gate. Correct.

### 3.8 Additive STABLE-INTENT with a 30-day minimum (question 8; item 8)

Defensible. `registries/stability-tiers.yaml` sets STABLE-INTENT at 30 days and CORE at 60. Every proposed change is additive: a new cross-cutting specification, a successor
Record schema, a new check, new bundle entries, new reason codes, an additive report
schema version and a successor non-claim clause. No edit to NRS-CORE-0009,
NRS-CORE-0001/0002, NRS-VERIFY-0013/0017, NRS-VERSION-0005/0007/0008 or NRS-PROV-0002
is proposed. Conditions under which it stays defensible: the projection stays
unstored; opaque provenance stays excluded; the timing carrier and any new design-fact
carrier appear only in successor schemas bound by new bundles; the new check is added
to no existing bundle's `allowed_check_ids`. The RFC already states the CORE fallback if
the final inventory contradicts this.

### 3.9 Remaining handoff questions

- Q6 (all three families conditional): confirmed. The family table makes the two-group
  row conditional on a successor Contract and says the Release 1 legacy method binding
  is not that Contract; paired and multi-group rows are conditional on the Release 2
  and Release 3 decisions. `RELEASE-STATUS.md` shows both unissued.
- Q7 (no competing identity fields or second binding rule): confirmed; the check
  consumes existing carriers and the RFC forbids restated copies.
- Q8 (only a producer-side pre-Record negative artifact is excluded): confirmed;
  existing conformance failure and inadmissibility semantics are preserved by
  reference.
- Q9 (historical-preservation plan): the plan names six preservation claims, seven
  evidence rows, the Release 1 history guard, `pnpm regression:phase1`,
  `pnpm evidence:phase2a --check`, `pnpm oracle:phase2a` and
  `pnpm snapshot:manifest --check-candidate`, and five implementation constraints.
  Coverage of the affected historical surfaces is confirmed by this review. What
  remains before `PREPARED` is the exact fixture inventory; before close, the fixed
  tests passing at the implementation commit.
- Q11 (which issues close when): Section 6.
- Q12 (depends on admissibility without repeating it): confirmed; invariant 5 and the
  impact inventory's verification boundary match NRS-VERIFY-0017 propagation.
- Q13 (policy artifacts removed consistently): confirmed (Section 3.6).

## 4. Findings

Severity: `BLOCKER` = must be repaired before steward opening authorization can fairly
be requested; `SHOULD_FIX` = repair before opening, or name as an explicit hold in the
opening text with a design-freeze deadline; `NICE_TO_HAVE` = editorial or clarifying.

### BLOCKER

None.

### SHOULD_FIX

**S-1. The timing status does not say what "the selection decision" comprises.**
`opening-rfc-candidate.md`, "Timing declaration boundary", defines `pre_outcome` as
"the selection decision was completed before ... access to observed outcome values"
without defining the decision's object. A producer could fix the Contract before
outcome access, finalize the pairing or analysis-population declarations afterwards,
and still declare `pre_outcome` truthfully. The research result (Section 5, item 9)
frames the fact as "family, Contract, and declarations were fixed before outcome
inspection"; the RFC dropped the object. Repair: state that the decision comprises the
selected Contract, Profile and bundle identities and every declaration that is a
projected fact's truth carrier, and that `pre_outcome` is inapplicable if any of them
changed after access. Mirror in `public-discussion-readiness.md` ("Reviewed decision
direction"). Must close before opening: timing meaning is a subject of the public
question and the readiness record says it may not remain implicit.

**S-2. "Sole non-Profile input" is not yet guaranteed by the successor-schema
wording.** The RFC says truth carriers live "in its owning Profile or separately
accepted successor declaration schema" and that "R5-aware successor schemas are needed
only where an owning family lacks a required truth carrier", while the timing status
lives in a "successor Record surface" that the impact matrix calls a "new closed
successor Record schema". Nothing forbids that same R5 successor Record schema from
carrying a missing design fact, for example a flattened-design assertion for the
two-group family. That fact would then be a second non-Profile input owned by the
cross-cutting surface, contradicting invariant 4. Repair: state that the successor
Record surface carries only the timing status and references to existing identity
carriers, and that any missing design-fact carrier is added as a versioned successor
of the owning Profile's declaration surface and appears in that Profile version's
mapping table. Locations: RFC "Declaration ownership and projection";
`authority-and-surface-impact.md` "Declaration ownership rule" and the matrix rows
"Timing representation" and "JSON representation". Must close before opening: it is
the ownership question.

**S-3. The nine non-claims omit two items the research result recommends.**
Research result Section 8 lists (item 4) that the declarant is authenticated,
authorized or identified, and (item 7) that the family boundary is a scientific
classification rather than a Protocol convention (Q8: at k = 2 the omnibus F equals
the squared pooled t; a balanced 2-by-2 factorial is structurally four groups). Neither
appears in the nine. The exclusions list puts attribution outside the slice, but an
exclusion says what the slice does not define, not what a passed result must not be
read to mean. Repair: for (7), add one sentence to "Conditional family set" stating
that the count boundaries are Protocol conventions and add it to the non-claim list or
state explicitly why it is covered. For (4), either add it or record, with reference to
the absence of any declarant identity field in the Record 0.2 and ITGC 0.2 schemas,
why the exclusion suffices. If the count changes from nine, update the steward
decision, impact inventory, readiness record and PR description together. Must close
before opening for the same reason as S-1.

**S-4. "Existing conformance supplies exactly one Contract, Profile and bundle tuple
through the existing identity carriers" overstates the head.** Issued surfaces carry
`interpretation_bundle_id`, `profile_id` and `analysis.method_id`. A Contract identity
carrier (`analysis.contract_id`) exists only in the unissued Release 2 candidate
schema; `registries/vocabulary.yaml` defines Contract as a term but no issued schema
or bundle carries one. Repair: say the bundle and Profile carriers exist today, the
Contract carrier is supplied by each family's separately accepted successor schema,
and the two-group family has no such carrier yet. Locations: RFC "Problem" and
invariant 2; README "Reviewed direction"; readiness "Reviewed decision direction". May
remain an explicit hold during discussion under R5-P3; must close before design
freeze.

### NICE_TO_HAVE

**N-1.** `consistency_only` is a `calculation_evidence` value in
`registries/public-checks.yaml`, not a check class. Phrase the new check as "a Public
Check whose calculation evidence is `consistency_only`" in the RFC and impact tables.

**N-2.** "Every check result emits inspectable evidence" should say what a `not_run`
or errored R5 result carries: at minimum the depended-on admissibility identity and
outcome and the blocking reason codes per NRS-VERIFY-0017, and whether projection
evidence is emitted when conformance passed but admissibility failed. When
conformance fails the projection cannot be emitted at all.

**N-3.** The reference event is scoped to "observed outcome values for the declared
analysis population". Under ITGC 0.2 that equals the supplied dataset because
`analysis_population` must be `all_record_observations`, but future families may
admit subsets. Consider "any observed outcome value in the supplied dataset" or
record why the declared-population scope is sufficient.

**N-4.** The projected fact "analysis-population identity" maps, for ITGC 0.2, to a
status enum (`all_record_observations` or `subset_or_exclusions_present`), not an
identity. Decide now whether the projected value is a status or an identity so the
mapping tables do not have to reinterpret the name.

**N-5.** The research result at the head answers commission questions 1 to 10 only;
questions 11 to 14 were added to the commission afterwards and are answered nowhere
yet. The commission's addendum clause covers this, but the readiness record's R5-P2
row should say plainly that 11 to 14 are currently unanswered.

**N-6.** Frozen Release 3 research and review records still describe Release 5 as the
rank-based horizon. The horizon's sequencing note already covers this; no edit to
frozen records is wanted. A one-line pointer in `research-frontier-map.md`, if that
file is maintained as a planning index, would prevent a stale reading.

## 5. Gate-by-gate disposition

| Gate  | Subject                         | Current     | Assessment                                                                                                                                                               | Closure evidence still needed                                                            |
| ----- | ------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| R5-P1 | Bounded question and exclusions | OPEN        | Repaired question states the four genuine additions and is Protocol-scoped (Section 3.1). Eligible for `PREPARED` once S-1, S-2 and S-4 land; the steward moves the gate | Repaired text, then close-only diff confirmation                                         |
| R5-P2 | Research Gate evidence          | PARTIAL     | Unchanged; `R5-RH-1` open; commission Q11 to Q14 unanswered; this review accessed no sources                                                                             | Full-text addendum by a separate investigator answering Q11 to Q14                       |
| R5-P3 | Predecessor reconciliation      | OPEN        | No issued Contract in any family; Release 2 earliest decision 2026-09-25; two-group successor has no issuing path yet                                                    | Exact mapping to separately accepted Contracts and bundles for all three families        |
| R5-P4 | Decision semantics              | OPEN        | Projection, timing, non-claims and report view are sound in structure; S-1, S-2 and S-3 leave the timing object, ownership and non-claim completeness incomplete         | Repaired text, then close-only diff confirmation                                         |
| R5-P5 | Authority and surface impact    | OPEN        | Owners named; no clause, ID, schema, check, bundle, reason code or mapping table exists                                                                                  | Exact inventory including per-Profile mapping tables and report encoding                 |
| R5-P6 | Historical preservation         | OPEN        | Plan coverage of affected historical surfaces confirmed (Section 3.9)                                                                                                    | Exact fixture inventory for `PREPARED`; fixed tests passing at the implementation commit |
| R5-P7 | Tier and window                 | PROVISIONAL | Additive STABLE-INTENT / 30 days defensible under the conditions in Section 3.8                                                                                          | Final impact inventory confirming no CORE edit                                           |
| R5-P8 | Independent opening review      | OPEN        | This report is fixed-input, fresh-context evidence with findings to repair                                                                                               | Repairs landed; one close-only diff confirmation; then steward authorization             |

## 6. What closes when

- **Before opening:** S-1, S-2, S-3; the readiness and PR text updated to match.
- **May remain named during public discussion:** S-4 (under R5-P3), `R5-RH-1`, exact
  per-Profile mapping tables and report encoding (R5-P5), fixture inventory (R5-P6),
  N-1 to N-6.
- **Before design freeze and any adoption decision:** everything above, the full-text
  closure of `R5-RH-1`, the Q11 to Q14 addendum, the Release 2 and Release 3
  dispositions and the two-group successor Contract path.

## 7. Recommended repairs, in order

1. S-1: define the object of the timing status.
2. S-2: confine the successor Record surface to timing plus identity references; place
   any new design-fact carrier under the owning Profile's versioned declaration surface.
3. S-3: resolve the two candidate non-claims and keep the count consistent across
   documents.
4. S-4: correct the Contract-carrier statement or name it as an R5-P3 hold.
5. N-1 to N-6 as convenient.
6. Freeze the repaired head, obtain a close-only diff confirmation of items 1 to 4,
   then request steward authorization for that exact candidate.

## 8. Validation

This file is the only addition on the review branch, rooted at the fixed head.
`pnpm format:check` and `pnpm lint:markdown` were run on the branch after adding it;
results are recorded in the commit that carries this file. No authoritative,
generated, schema, registry, fixture or reference artifact was modified. GitHub
reports 12 successful check runs on `0d6265f6fee059d8f8f8650600483b3a1b5e2090`.
