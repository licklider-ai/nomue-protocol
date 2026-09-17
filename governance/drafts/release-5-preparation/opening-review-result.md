# Release 5 opening proposal independent review result

**Status: informative independent pre-opening review; non-normative; not adopted.**
This report answers the [opening review handoff](opening-review-handoff.md) against
one fixed repository target. It opens no public issue, issues no identifier or
Requirement ID, modifies no normative artifact, closes no readiness gate, and claims
no steward approval.

**Final recommendation: `REPAIR_AND_REREVIEW`** (Section 11).

## 1. Verdict summary

| Dimension                        | Result                                                                                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Input integrity                  | `MATCH`: PR #342 head, parent, tree, base, and all six blobs equal the expected identities (Section 2)                                                               |
| Preservation                     | `INTACT`: the base-to-head diff touches only six governance draft files; no authoritative, generated, schema, registry, fixture, or reference file changes           |
| Layer 1 scope (R5-P1)            | `CONFIRMED` with one repair: the stored-decision framing is inside NRS-CORE-0001/0002; the unowned "selection-policy identity" is the only Layer 2 leak risk (`B-1`) |
| Selection meaning (R5-P4)        | `NOT_FIXED`: two incompatible readings of "successful selection" remain possible (`B-1`)                                                                             |
| Declaration ownership            | `NOT_FIXED`: no owner named for a cross-family declaration vocabulary (`B-2`)                                                                                        |
| Family boundary and dependencies | conditional as claimed, except that the first row implies an issued independent-two-group Contract that does not exist (`S-1`)                                       |
| Stability tier                   | `STABLE-INTENT` and 30 days are defensible only if the new non-claim is a successor clause rather than an edit to NRS-CORE-0009 (`S-4`, Section 7)                   |
| Historical preservation          | additive by construction at this head; no test or plan yet exists, so R5-P6 is not `PREPARED` (`S-8`, Section 8)                                                     |
| Findings                         | 2 `BLOCKER`, 8 `SHOULD-FIX`, 4 `NICE-TO-HAVE`                                                                                                                        |
| Validation                       | see Section 10                                                                                                                                                       |

## 2. Reviewed inputs

| Field               | Value                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Draft PR            | `https://github.com/licklider-ai/nomue-protocol/pull/342` (draft, open, base `main`)                                                              |
| Head commit         | `dffbcc87bdd2471ca3cb6dc77cfb5cff04add8fe` ("Format Release 5 preparation documents", 2026-09-16T12:18:41Z)                                       |
| Parent commit       | `28eb0d308f25eac6480a3fe817aa2e146fe9437f` ("Prepare Release 5 selection-evidence discussion")                                                    |
| Head tree           | `eb587fa1fbe9723754cd0d6e461c601f15fae7a0`                                                                                                        |
| PR base at creation | `07b373655110afb34ab4bcc3933f83c69fba6f2c`; `origin/main` at review time was the same commit                                                      |
| Base-to-head diff   | 6 files, +455 / −2: five new files under `governance/drafts/release-5-preparation/` and two rows of `governance/drafts/release-horizon-r3-r20.md` |
| Parent-to-head diff | formatting only (25 lines, table alignment)                                                                                                       |

Blobs at the head:

| Path                                                                     | Blob                                       |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| `governance/drafts/release-5-preparation/README.md`                      | `dbee83598e0a775f8eb12057fefab95f396ee149` |
| `governance/drafts/release-5-preparation/opening-rfc-candidate.md`       | `652fed84a5dcf9ce57ce730c845cc5e4aad093d3` |
| `governance/drafts/release-5-preparation/research-commission.md`         | `198335483ed79004169e24f957e14cd933e4ac11` |
| `governance/drafts/release-5-preparation/public-discussion-readiness.md` | `0087549cb40649a94dc13932947f93e98d094a22` |
| `governance/drafts/release-5-preparation/opening-review-handoff.md`      | `4bd6662c6c43231ef880235628d9797191b6bbf7` |
| `governance/drafts/release-horizon-r3-r20.md`                            | `e1619f1e843d131c087b651b336a74c6c25a6285` |

The governance and specification blobs read for this review are listed in the
[research result](research-result.md), Section 1. The companion research result is
this reviewer's own Part A work and is cited here as such, not as an independent
external review.

## 3. Independence disclosure

Fresh session; no author context, summaries, or unpublished explanation used. The
reviewer is an Anthropic language model (`claude-fable-5-1`) in a Claude Code remote
session; this is disclosed as material to reproducibility and to RFC.md's separate-model
requirement, and it is not human-expert review. Network egress blocked every direct
document fetch in this session; the effect on Part A is recorded in the research
result, Section 2, and does not affect the repository-internal findings below.

## 4. Findings

Severity: `BLOCKER` = must be repaired before steward opening authorization can fairly
be requested, because the public question would otherwise contain a hidden semantic
choice; `SHOULD-FIX` = repair before opening or name as an explicit hold in the opening
text; `NICE-TO-HAVE` = editorial.

### BLOCKER

**B-1. "Successful selection" admits two incompatible meanings, and the
"selection-policy identity" has no owner.**
`opening-rfc-candidate.md` requires "a versioned selection-policy identity" and
invariant 1 says selection uses "registered policy only", while the authority table
names no registry or specification that would own a policy. Two readings fit the text:

- _Identity-binding reading_: the check verifies that the declaration set is complete,
  not defaulted, structurally consistent, and bound to exactly the Contract, Profile,
  and bundle the Record already dispatches on. Under this reading, in a family with one
  issued Contract, a successful selection is entailed by conformance plus Profile
  admissibility (NRS-VERIFY-0013), and a separate "selection policy" is unnecessary;
  the bundle identity already fixes which Profiles and Contracts exist.
- _Policy-determined reading_: the check verifies that a registered policy maps these
  declarations to this Contract and no other. Under this reading the policy is a new
  authority target (a mapping from declarations to Contracts), the placement table is
  incomplete, the check duplicates admissibility's judgment, and the uniqueness claim
  collapses when a second Contract per family is issued (research result, Q10).

The public question cannot be reviewed without hidden semantic selection until one
reading is chosen. Recommended repair: adopt the identity-binding reading for the first
slice; delete or redefine "selection-policy identity" as the interpretation-bundle
identity; state that the checkable content beyond existing admissibility is
completeness, non-defaulting, identity binding, the attributed timing declaration, and
the non-claims; move the policy-determined reading to the explicit exclusions.

**B-2. The owner of the cross-family declaration vocabulary is unnamed.**
Selection over three families needs either a shared declaration vocabulary or
per-Profile declarations referenced by Profile identity. The two existing surfaces
differ: ITGC 0.2 uses `grouping_structure: independent_groups` with `pairing`,
`repeated_measurements`, `clustering`; the Release 2 candidate uses
`grouping_structure: paired_two_condition` with `pair_independence` and a
`within_pair_only` repeated-measurement value; the Release 3 result adds a
flattened-design assertion. The candidate's placement table assigns "contextual design
declarations" to "the applicable Profile specifications" and "exact declared design
facts used by the selection decision" to a new specification, which is two owners for
overlapping content. Recommended repair: state that the first slice defines no
cross-family enumeration; the selection evidence references each Profile's own
declaration set by Profile identity, and any shared vocabulary is a later, separately
reviewed public surface.

### SHOULD-FIX

**S-1. The family table implies an issued independent-two-group Contract; none exists.**
Row 1 says "Reuse only an issued independent-two-group Contract and bundle". At the
reviewed head no `contract` identifier is issued in any registry, schema, or bundle;
Release 1 binds a legacy `method_id`. The horizon lists no release that issues an ITGC
successor Contract. Repair: state that all three families are conditional and name the
path that would issue the independent-two-group successor Contract, or state that the
first slice may open with zero issued members.

**S-2. Selection timing is unaddressed.**
Invariant 1 forbids outcome-dependent selection but the candidate does not say how the
first slice represents it. Repair: adopt an attributed timing declaration with
`not_asserted` truth; name revision lineage and external timestamps as successors that
are out of the first slice; cite open hold `FND1-H07` and the Release 3 result §14 attack
6 as the recorded verifier limit.

**S-3. "Inadmissibility workflow states" can be read as reinterpreting an existing report outcome.**
Admissibility failure is already a Layer 1 report outcome (NRS-VERIFY-0013/0017), and
the finalized ask already has a Layer 1 shape (NRS-CORE-0015/0018). Repair: reword the
exclusion to "a producer-side, pre-Record negative-selection artifact", and state that
verifier conformance and admissibility outcomes are unchanged.

**S-4. Non-claim coverage requires a new clause, not a CORE edit.**
NRS-CORE-0009 is scoped to "a successful conformance or profile-admissibility result".
A selection-evidence result is neither. Repair: plan a new STABLE-INTENT successor
clause ("a successful selection-evidence result is not proof of declaration truth or of
scientific appropriateness") and an additive report-schema version with the new
`guarantee_boundary` members, rather than editing NRS-CORE-0009. This is also what keeps
the tier at STABLE-INTENT (Section 7).

**S-5. Identity restatement risk.**
"Bind the exact selected Contract and Profile" and "the exact interpretation bundle"
could be read as new stored copies of `analysis.contract_id`, `profile_id`, and
`interpretation_bundle_id`. Repair: state that selection evidence references the
existing carriers and that the check compares by exact string identity (ID-POLICY,
NRS-VERSION-0005); no fact is stored twice.

**S-6. The research commission omits four questions.**
Add: (a) whether any selection fact exists beyond the Profile-owned admissibility
declarations; (b) the k = 2 two-group versus multi-group boundary and the four-group
versus 2-by-2 boundary as conventions; (c) the reopen trigger of a second Contract per
family (Welch versus pooled t; paired t versus signed-rank); (d) the verifier's limit on
timing. All four are answered in the research result and can be adopted by reference.

**S-7. The candidate does not say that the first-slice check content is small.**
Without this statement the "Problem" section overstates what a relying party gains.
Repair: one paragraph stating what is entailed by existing checks and what is new.

**S-8. The readiness ledger overstates R5-P6.**
R5-P6 is marked `PREPARED` with closure evidence "fixed tests or reviewed plan". No test,
plan, or migration note exists at the head. Repair: set R5-P6 to `OPEN` and reference
the plan once it exists; keep R5-P1 `PREPARED` subject to `B-1`.

### NICE-TO-HAVE

**N-1.** README and horizon say the slice is limited to "released or separately
accepted" families; only Release 1 is released, and it has no Contract. Say "conditional
on separately decided" instead.

**N-2.** The horizon row for Release 5 duplicates the README's Layer-boundary list; keep
one and link.

**N-3.** The handoff does not ask the reviewer to record the PR base; add it so
`TARGET_DRIFT` covers base movement.

**N-4.** Add the policy-determined selection reading and the cross-family declaration
enumeration to the explicit-exclusions list once `B-1` and `B-2` are repaired.

## 5. Answers to the review determinations

Task determinations 1–12 and handoff questions 1–9 are mapped together.

| #   | Determination                                                                         | Answer                                                                                                                                                                                                                                                                                                                                                                                     |
| --- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Remains inside Layer 1 (handoff Q1)                                                   | Yes for the stored finalized decision, declarations, identities, evidence references, and non-claims (NRS-CORE-0002 permits the stored form). The candidate's Layer 2 exclusion list is complete. The one leak risk is an unowned "selection policy" that, if it identified a product's routing logic, would name a Layer 2 artifact (`B-1`).                                              |
| 2   | Stores a finalized decision rather than standardizing a selector                      | Yes under the identity-binding reading; no under the policy-determined reading, which standardizes a mapping (`B-1`).                                                                                                                                                                                                                                                                      |
| 3   | Contract selection distinct from exact bundle dispatch (handoff Q2)                   | Yes. Dispatch is identifier equality before any Record schema runs (NRS-VERSION-0005/0007/0008); selection evidence is interpreted only after dispatch, inside the bundle. Invariant 8 states this correctly. The distinction is unambiguous once `S-5` removes the restatement risk.                                                                                                      |
| 4   | Selection-evidence check distinct from numerical recomputation                        | Yes; it is a `consistency_only` check in the existing evidence-class vocabulary and must be registered as such, with no tolerance policy.                                                                                                                                                                                                                                                  |
| 5   | Avoids overall `VERIFIED` or whole-project claims                                     | Yes; exclusions and invariant 6 cover it, and NRS-VERIFY-0001/0003 remain. `S-4` adds the missing appropriateness non-claim.                                                                                                                                                                                                                                                               |
| 6   | Old Records, bundles, checks, canonicalization, pinned results unchanged (handoff Q5) | Yes at this head by construction: no authoritative file changes. The candidate's additive plan is consistent with NRS-CORE-0010 and NRS-VERSION-0006. See Section 8 for what must be shown later.                                                                                                                                                                                          |
| 7   | Three-family boundary conditional on Release 2 and Release 3 (handoff Q3)             | Conditional as written, and the candidate correctly does not adopt Release 2 or Release 3 meaning. Release 2's earliest decision is 2026-09-25; Release 3 is open with no adopted Contract. The first family is also conditional (`S-1`).                                                                                                                                                  |
| 8   | Release 4 factorial meaning not imported (handoff Q3)                                 | Not imported. The four-group versus 2-by-2 overlap must be handled by the Release 3 flattened-design assertion, not by reading Release 4 (research result, Q8).                                                                                                                                                                                                                            |
| 9   | Moving rank-based successors later is coherent (handoff Q8)                           | Yes. The P1-A research disposition in `spec/profiles/README.md` and the roadmap's rank-based handoffs are untouched by the diff; the horizon text calls it a sequencing change; no other file still describes Release 5 as rank-based. Rank-based Contracts also depend on the paired and independent Profiles that Release 2 and Release 3 create, so the order is dependency-consistent. |
| 10  | STABLE-INTENT and 30 days defensible (handoff Q6)                                     | Defensible, conditionally: see Section 7.                                                                                                                                                                                                                                                                                                                                                  |
| 11  | Every proposed meaning has one identifiable owner                                     | Not yet: selection-policy identity (`B-1`) and the declaration vocabulary (`B-2`) have zero and two candidate owners respectively. The remaining rows of the placement table are one-owner and consistent with the manifest's target model.                                                                                                                                                |
| 12  | Unsuccessful states excluded cleanly without omitting portable evidence (handoff Q4)  | Cleanly in substance: the only portable negative fact (declarations contradict the selected Contract) is already a scoped report outcome. The wording needs `S-3`.                                                                                                                                                                                                                         |
| —   | Research commission coverage (handoff Q7)                                             | Covers the design-fact, declaration, timing, overlap, attribution, non-claim, reuse, and reopen questions. Missing questions are listed in `S-6`.                                                                                                                                                                                                                                          |
| —   | What must close before opening; what may remain a hold (handoff Q9)                   | Close: `B-1`, `B-2`, `S-1`, `S-3`, `S-7`, `S-8`. May remain explicit holds: `S-2` (timing option choice), `S-4` (exact clause text), `S-5`, `S-6`, research holds `R5-RH-1`, `R5-RH-2`, `R5-RH-5`, and the numerical, execution, and tolerance holds the readiness record already allows.                                                                                                  |

Hidden defaults found: the policy-determined reading (`B-1`); a possible implied shared
declaration enum (`B-2`); an implied issued Contract (`S-1`). Duplicated authority
found: two owners for design declarations (`B-2`); possible restated identities (`S-5`).
Circular dependency found: none. The candidate does not depend on Release 5 evidence to
justify itself, and Release 2 and Release 3 do not depend on Release 5. Claims that
cannot be independently checked: selection timing and declaration truth, both to be
carried as non-claims (`S-2`, `S-4`). Accidental Layer 2 standardization: none beyond
the `B-1` risk.

## 6. Disposition for R5-P1 through R5-P8

| Gate  | Subject                         | Ledger state at head | Reviewer disposition                                                                                                                                                                              |
| ----- | ------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R5-P1 | Bounded question and exclusions | PREPARED             | `CONFIRMED_AFTER_REPAIR` of `B-1`; the question is Protocol-scoped and standardizes no Layer 2 routing                                                                                            |
| R5-P2 | Research Gate evidence          | OPEN                 | `PARTIALLY_SUPPLIED`: the research result gives a bounded basis; hold `R5-RH-1` (full-text confirmation) remains; an additional independent methodological review of that result has not occurred |
| R5-P3 | Predecessor reconciliation      | OPEN                 | `OPEN`: cannot close before the Release 2 disposition; add the independent-two-group Contract gap (`S-1`)                                                                                         |
| R5-P4 | Decision semantics              | OPEN                 | `OPEN`: `B-1` decides it; `S-3` and `S-7` complete it                                                                                                                                             |
| R5-P5 | Authority and surface impact    | OPEN                 | `OPEN`: no clause, Requirement-ID, schema, or migration inventory exists; `B-2`, `S-4`, `S-5` constrain it                                                                                        |
| R5-P6 | Historical preservation         | PREPARED             | `OPEN` (`S-8`): additive by construction, but no test or reviewed plan exists                                                                                                                     |
| R5-P7 | Tier and window                 | PROVISIONAL          | `STABLE-INTENT / 30 days` supportable subject to `S-4`; see Section 7                                                                                                                             |
| R5-P8 | Independent opening review      | OPEN                 | this review, with findings requiring repair; re-review required after repair                                                                                                                      |

## 7. Stability-tier assessment

The proposal is additive at the Record, report, check, bundle, and dispatch level. It
would create new STABLE-INTENT successor clauses (selection meaning, declaration
boundary, non-claims), new EXPERIMENTAL representation (schema layout, check version,
reason codes), and additive bundle and report-schema entries. No existing CORE clause
needs its wording changed provided that:

- the appropriateness and timing non-claims are new clauses, not edits to NRS-CORE-0009
  (`S-4`);
- the report boundary members are added in a new report schema version, not by changing
  the 0.2 schema;
- exact dispatch (NRS-VERSION-0005/0007/0008), Layer boundary (NRS-CORE-0001/0002), and
  admissibility separation (NRS-VERIFY-0013/0017) are referenced, not amended.

Under those conditions the highest affected tier is STABLE-INTENT and the registered
minimum window is 30 days. If the repair of `B-1` chooses the policy-determined reading,
the new registry is a new authority target and the check re-judges admissibility; that
would need at least an amended informative note on NRS-VERIFY-0013 and possibly a CORE
change, which would require the CORE process and a 60-day minimum. The reviewer therefore
recommends the identity-binding reading on tier grounds as well as on scientific grounds.

## 8. Historical-preservation assessment

At the reviewed head nothing authoritative changes, so preservation is trivially
intact. For the eventual change set, preservation is plausible by construction because
every Release 5 surface is additive and selected only through a new exact bundle
identifier. What must be shown, and is not yet planned anywhere in the package:

1. the Phase 1 regression suite and the Release 1 history guard remain byte-identical
   in inputs and pinned outputs;
2. no existing bundle's `allowed_check_ids` changes;
3. the 0.2 report schema is untouched and the new report schema version is registered
   separately;
4. a Record under a legacy bundle with no selection evidence verifies exactly as before;
5. a Record naming a Release 5 bundle under a verifier that does not implement it is
   refused with `NRS-UNSUPPORTED-BUNDLE` and never routed.

Setting R5-P6 to `OPEN` with this list as the plan is the recommended repair (`S-8`).

## 9. Required repairs

Ordered for a single repair round:

1. `B-1`: choose the identity-binding reading; remove or redefine "selection-policy
   identity"; add the "what is new beyond admissibility" paragraph (`S-7`).
2. `B-2`: state that no cross-family declaration enumeration exists in the first slice;
   assign declarations to their Profiles by identity.
3. `S-1`: correct the family table and README; name the independent-two-group Contract
   gap.
4. `S-3`: reword the excluded workflow states.
5. `S-8`: set R5-P6 to `OPEN` with the Section 8 plan.
6. `S-2`, `S-4`, `S-5`, `S-6`: add as explicit holds or resolve in the text.
7. `N-1` to `N-4` as convenient.
8. Re-request a fixed-input review of the repaired head; then request steward
   authorization.

## 10. Validation

Run on the review branch `review/r5-selection-evidence-opening-20260916`, rooted at
`dffbcc87bdd2471ca3cb6dc77cfb5cff04add8fe`, with this file and the research result as
the only additions, on Node 22.22.2 with pnpm 11.7.0 and a frozen lockfile install:

| Command                   | Result                                                                                                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`       | pass (all matched files use Prettier code style)                                                                                                                                                                |
| `pnpm lint:markdown`      | pass (657 files, 0 issues)                                                                                                                                                                                      |
| `pnpm typecheck`          | pass                                                                                                                                                                                                            |
| `pnpm validate`           | pass (registries, traceability, normative lint, authority, gates, links, private-dependency and code-path audits)                                                                                               |
| `pnpm check:generated`    | pass (19 generated files match their sources)                                                                                                                                                                   |
| `pnpm check` (full suite) | pass: 55 test files, 520 tests; Phase 1 suite (13 schemas, 16 vectors, 132 fixtures); Phase 2A suite (88 + 44 + 8 fixtures, oracle max relative difference 8.96e-15, evidence checks); 0.2.1 suite (6 fixtures) |

No authoritative, generated, schema, registry, fixture, or reference artifact was
modified. The `R` oracle was unavailable in the Phase 2A comparison, as the repository's
own check output records; that gate is closed separately and is unaffected by this
change.

## 11. Final recommendation

`REPAIR_AND_REREVIEW`.

The candidate is reviewable, inside Layer 1, additive, and free of any scientific
premise that the research result could not support. It is not yet ready to request
steward opening authorization because two semantic choices (`B-1`, `B-2`) remain
implicit and would be decided silently by whoever drafts the first schema. Both repairs
narrow the proposal; neither changes its direction. After repair, one further fixed-input
review can be short.
