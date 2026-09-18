# Release 4 formal decision packet independent review result

## Verdict

REPAIR_REQUIRED

The packet at PR #356 head `6b9f0b3` accurately assembles the closed T03-T14 and
A1 candidate inputs, both RFC 261 inputs, the post-A1 drift and the custody
limits, and it distinguishes closed candidate choices from the pending FD1-FD6
decisions. It cannot yet serve as a complete decision input because the ledger
omits one disposition the coupled decision needs: under the unchanged
NRS-VERIFY-0025, a completed Release 4 report that contains an `indeterminate`
outcome and no `fail` has no permitted exit code, and the current reference
aggregation would emit `0` for it. FD5 as written presumes a compatibility that
the existing contract does not provide. Two MINOR corrections concern the
amendment clock's platform timestamp and the landing outline's omission of the
lifecycle-carrier binding. All three are review-only repairs that leave the
fixed source inputs unchanged.

Findings: 0 BLOCKER, 1 MAJOR, 2 MINOR. Observations in Section 9.

## 1. Exact reviewed target

| Field       | Value                                                                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository  | `licklider-ai/nomue-protocol`, PR #356, branch `preparation/r4-formal-decision-packet-20260918`, draft, open, not merged, mergeable state clean |
| Head        | `6b9f0b38b45056ccb273148abd6b18d04fc3b03c` ("Complete R4 evidence-chain index")                                                                 |
| Parent      | `595dc0aee5126ec8da879bb9c2685cbc24c4d35f`; chain `07e50e1` (packet), `595dc0a` (clarifications), `6b9f0b3`                                     |
| Tree        | `d4ca0b91d6ab01c7b1d6ae78883ccefbbde1185d`                                                                                                      |
| Base        | `c2e65489f0bd9d909f9c42ab87898da0c479567c` (main after PR #352, also the merge base)                                                            |
| Delta       | 8 files, +398 / −12: six packet files, `RELEASE-STATUS.md`, `release-4-preparation/README.md`                                                   |
| Drift       | none: `refs/pull/356/head` and `refs/heads/main` equal the fixed head and base at fetch time; PR body identities match                          |
| CI          | 12 of 12 check runs `success` on the head; local `pnpm format:check`, `pnpm lint:markdown`, `pnpm validate` and `pnpm check:generated` pass     |
| Review date | 2026-09-18 (UTC)                                                                                                                                |

Packet blobs: `README.md` `9a77731b…`, `DECISION-LEDGER.md` `93bdbeec…`,
`EVIDENCE-AND-DISPOSITION.md` `26fa7f4c…`, `DISCUSSION-AND-DRIFT.md`
`8539ffff…`, `AUTHORITATIVE-LANDING-OUTLINE.md` `aa8b12a2…`,
`INDEPENDENT-PACKET-REVIEW.md` `c2ba6e38…`, `RELEASE-STATUS.md` `0af57410…`,
`release-4-preparation/README.md` `d0203358…`.

## 2. Independence and scope disclosure

- The reviewer is an Anthropic language model in a Claude Code remote session
  (configured `claude-fable-5-1`; the serving model may differ); not human
  expert review, not steward review, not a new scientific or numerical
  investigation. This session did not author the packet, the A1 packet, the
  D01/D07 amendment package, T03-T14, PR #352 or any Release 4 artifact. It
  produced earlier R2, R3 and R5 packet and implementation reviews in this
  repository; none of those is reused here.
- Inputs read, all at the fixed head or its base: the six packet files and two
  navigation files; the RFC 261 issue body and its single comment through
  GitHub; commit `21453d82` (fetched by SHA) and its candidate blob; the
  amendment package at `5996da5` and its maintenance copy at `c2e6548`;
  `r4-adoption-readiness-a1-20260917/` including the T13, T14, close-review
  intakes, evidence map, decision inventory, RFC disposition, inputs and
  manifest; `t03-candidate-numerical-policy-decision-20260914.md`; the T04-T13
  directory inventory; `opening-rfc-candidate.md`; `governance/RFC.md`,
  `registries/stability-tiers.yaml`, `governance/ID-POLICY.md`, `AUTHORITY.md`,
  `registries/requirements.yaml`, `spec/verification/relying-party-interface.md`
  (NRS-VERIFY-0025 and 0028), the registries for bundles, checks, surfaces and
  reasons, `reference/verifier/src/verify-phase1.ts`, `reference/SOURCE-PIN.json`
  and commit `0536b66f`.
- No file, Issue, pull request, branch, registry, schema, release state, RFC
  clock or authoritative artifact was modified; nothing was posted, merged,
  adopted, issued, implemented or published. This record is the only addition,
  on the reviewer branch.

## 3. Verified facts

- **Fixed inputs.** Issue #261 was created `2026-09-09T05:59:47Z`, is open, and
  has exactly one comment. Commit `21453d82` exists ("Clarify Release 4 semantic
  conformance and eligibility carrier boundaries", 2026-09-09T05:40:21Z), is not
  an ancestor of `main`, and carries `opening-rfc-candidate.md` as blob
  `807e4bf0…`; the same blob is on `main` unchanged. `88a5f488` (T12 re-freeze
  target), `c62ba0f4` (candidate source), `c36c8496` (A1 repaired target),
  `554818683` (merge of PR #350), `5996da5` ("Document D07 CLI scope boundary")
  and `0536b66f` (PR #351) all exist and are ancestors of the base. The A1
  close-review intake names `c36c8496` as the reviewed repaired target with
  A1-01, BR-02 and BR-03 closed; the T13 and T14 intakes name `88a5f488` and
  `c62ba0f4` and disclose that reviewer identity, served model and original
  receipt bytes are not established. The packet repeats those limits and does
  not upgrade them.
- **Amendment record.** The one comment on #261 (id 5723844738) fixes the
  amendment input at `5996da5`, selects STABLE-INTENT, states opening
  `2026-09-18T01:50:49Z` and earliest decision `2026-10-18T01:50:49Z`, and
  excludes CLI exit-code semantics for a completed indeterminate result. Its
  GitHub `created_at` is `2026-09-18T01:51:08Z` (see m-1). The maintenance copy
  at `c2e6548` differs from `5996da5` only by status wording, the recorded
  clock, the placeholder replacement in the amendment draft and the commission
  status line; the delta map and the D07 selection are byte-identical.
- **Clock arithmetic.** `2026-09-09T05:59:47Z` plus 30 days is
  `2026-10-09T05:59:47Z` (JST 14:59:47); `2026-09-18T01:50:49Z` plus 30 days is
  `2026-10-18T01:50:49Z` (JST 10:50:49). `stability-tiers.yaml` registers 60,
  30 and 7 days for CORE, STABLE-INTENT and EXPERIMENTAL. The packet's choice
  that the later clock controls a single coupled decision follows from
  `governance/RFC.md` (the window of the highest affected tier applies to the
  proposal as discussed) and from the amendment comment's own statement that
  the original clock is not a substitute.
- **Ledger and index.** Every T-directory the evidence index names exists at
  the base; the T04 EC1/EC2, EC3/EC4, F-01 and G5 records are present; the T09
  directory holds the report schema, reasons, lifecycle and F-01 controls the
  A1 evidence map cites. No registry at the base contains a balanced-two-factor
  entry; the only `supported` flag for the candidate is `"supported": false` in
  the T06 `CANDIDATE.json`, which the T06 checker asserts.
- **Drift.** From `554818683` to `c2e6548`, no file under the T03-T14 or A1
  directories changed; `release-4-preparation/README.md` gained navigation; the
  amendment package was added; PR #351 changed `reference/README.md`,
  `reference/SOURCE-PIN.json`, `reference/stats-kernel/src/t-distribution.ts`,
  a kernel test and an evidence intake; no registry, schema, spec or authority
  file changed. The remaining drift is Release 3 material and review intakes
  unrelated to Release 4.
- **D07 and the CLI.** NRS-VERIFY-0025 requires exactly five exit codes with
  exactly the tabulated meanings: `0` only when "every applicable check outcome
  is `pass`", `2` for a failed check or a parse/canonicalization refusal, `3`,
  `4` and `5` for refusals. NRS-VERIFY-0028 forbids treating `indeterminate` as
  `pass`. `verify-phase1.ts` aggregates `exitCode: anyFail ? 2 : 0`, so a report
  with an `indeterminate` outcome and no `fail` exits `0`; T03 records this as a
  source-inspection implication and states that "a nonzero indeterminate bucket
  is needed" and that the CLI contract "need[s] an explicit coupled change". The
  A1 RFC disposition keeps "Public CLI indeterminate-only behavior" as
  pre-adoption work. The amendment then excludes CLI semantics from Release 4.

## 4. Findings

### MAJOR

**M-1. The ledger omits the exit-code disposition for a completed
indeterminate-only Release 4 report.** Location: `DECISION-LEDGER.md` row
R4-FD5 and rule 4; `AUTHORITATIVE-LANDING-OUTLINE.md` gate 8;
`EVIDENCE-AND-DISPOSITION.md` "Required formal disposition". Reproduction: take
a Release 4 report in which every conformance and admissibility outcome is
`pass`, no quantity is a proved mismatch and one mandatory comparison is
`indeterminate` (a D07 outcome the packet adopts as a report outcome). Under
NRS-VERIFY-0025 no exit code applies: `0` requires every applicable outcome to
be `pass`, `2` requires a `fail` or a refusal, `3`-`5` are refusals. The
reference aggregation emits `0`, which is the code-`0` meaning applied to a
non-`pass` outcome, contrary to NRS-VERIFY-0028's principle. Expected: the
packet states, as a formal disposition, what happens to such a report under
the unchanged five meanings. Actual: FD5 asks the steward to adopt D07's three
report outcomes "while NRS-VERIFY-0025 and its five CLI meanings remain
unchanged" and requires only "explicit exclusion of a new CLI code"; the delta
map's required adoption choice 2 (permit completed `indeterminate` in the
supported procedure, or constrain the adopted procedure to terminal outcomes)
is not carried into the ledger. Impact: without this disposition a positive
FD5 either leaves a conforming CLI with no lawful exit code, or lets the
reference behavior silently reinterpret `0`; both are exactly what failure
questions 4 and 5 ask the packet to exclude. Minimal repair (review-only, no
change to the amendment input): add to R4-FD5 a required disposition of the
exit-code outcome for a completed report with `indeterminate` and no `fail`,
enumerating the two admissible answers, (a) constrain the adopted Release 4
supported procedure so that no completed report contains an `indeterminate`
mandatory outcome, or (b) defer that report state to a separately versioned
NRS-VERIFY-0025 successor proposal with its own tier and window, outside this
Release 4 decision; state that code `0` is not available for such a report and
that the current reference aggregation is not evidence of a permitted mapping;
mirror the point in landing gate 8 and the required-disposition list. Closure
check: the ledger names the disposition and its admissible answers; the
landing outline's compatibility row requires a drift test that a Release 4
indeterminate-only report never exits `0`.

### MINOR

**m-1. The amendment clock is stated 19 seconds earlier than the platform
timestamp.** Location: `README.md` table and paragraph, `DISCUSSION-AND-DRIFT.md`
clock table, `DECISION-LEDGER.md` FD1, `RELEASE-STATUS.md` window table. The
original RFC 261 window runs "from this issue's GitHub creation timestamp
(UTC)", and the issue's `created_at` is exactly the recorded
`2026-09-09T05:59:47Z`. The amendment comment's `created_at` is
`2026-09-18T01:51:08Z`, but its body and every packet document record the
opening as `2026-09-18T01:50:49Z` and the earliest decision as
`2026-10-18T01:50:49Z`. Impact: negligible in practice, but the packet fixes
seconds and the stated window is shorter than the platform-derived one.
Minimal repair: record both values, name the comment's platform timestamp as
the opening under the same convention as the issue, and state that the
unified decision waits for `2026-10-18T01:51:08Z` (the later of the two); do
not edit the posted comment. Closure check: the packet and status table carry
the later time or an explicit statement that the later time controls.

**m-2. The landing outline omits the lifecycle-carrier binding.** Location:
`AUTHORITATIVE-LANDING-OUTLINE.md` coupled change set;
`EVIDENCE-AND-DISPOSITION.md` required-disposition list. The opening RFC
proposes NRS-CORE-0022 and `core/balanced-two-factor-lifecycle.md`, restricts
the admissibility carrier to `pass`/`fail`, maps outcomes to eligibility, and
requires carrier-domain fixtures; T06 lists NRS-CORE-0020 through 0022 among
the sixteen candidate clauses. The outline's rows cover specification,
requirements, identifiers, schemas, checks, reasons, bundle, authority,
verifier, reference consumer, conformance, compatibility and release state, but
name neither the lifecycle carrier mapping nor its fixtures, and the
required-disposition list does not mention profile eligibility. Impact: a
landing prepared from the outline alone could leave the carrier unbound.
Minimal repair: add the lifecycle-carrier binding (CORE-0022, carrier-domain
fixtures, reference `lifecycle.ts` mapping without new state-invariant entries)
to the coupled change set and the required-disposition list. Closure check:
both lists name it.

### NONE

No BLOCKER.

## 5. FD readiness conclusions

- **FD1 (discussion):** not decidable before the controlling time; the packet's
  inputs, both openings and the feedback-disposition rule are correct subject to
  m-1. The dated snapshot "one comment, no substantive feedback" matches GitHub
  today and is correctly labelled as not a conclusion about future feedback.
- **FD2-FD4 (scope, numerical/execution contract, surfaces):** ready as decision
  input. The evidence chain, exclusions, Public-supported versus reference
  versus observed distinction, unissued identifiers with `supported: false`, and
  the no-alias rule are assembled from the closed artifacts without enlargement.
  FD4's "prepare, not issue" rule and the ID policy's no-alias migration are
  consistent.
- **FD5 (D07 and the CLI):** not ready until M-1 is repaired. D07's report
  ownership is correctly stated; the packet does not state what the unchanged
  five-code contract yields for a completed indeterminate-only report.
- **FD6 (whole target and gates):** ready in structure; its completeness depends
  on M-1 and m-2 because FD6 requires "complete decision list" and the landing
  plan.

## 6. Clocks and the D07 CLI boundary

- Original clock: confirmed. Opening `2026-09-09T05:59:47Z` equals the issue's
  creation timestamp; earliest unchanged-scope decision `2026-10-09T05:59:47Z`.
- Amendment clock: corrected per m-1. Under the convention the original opening
  uses, the amendment opened at `2026-09-18T01:51:08Z` and the unified decision
  may occur no earlier than `2026-10-18T01:51:08Z`; the packet's
  `2026-10-18T01:50:49Z` is 19 seconds early. That the later clock controls a
  single coupled decision is confirmed.
- D07 CLI boundary: the packet correctly keeps D07's three outcomes in the
  detailed report and does not propose a new or reinterpreted exit code. The
  boundary is incomplete rather than wrong: see M-1.

## 7. Drift and evidence-custody disposition

Post-A1 drift is bounded as the packet states; PR #351 is identified by its
exact commit and files; the packet correctly requires landing-time Release 1
and shared-consumer compatibility evidence against the actual post-#351 base
rather than inferring it from unchanged candidate bytes. Custody statements
reproduce the A1 intakes' limits (maintainer-supplied results, no reviewer
identity, no served-model attestation, no original receipt bytes) and add
nothing to them; the packet's own claim of "R2-equivalent" readiness is the
A1 benchmark's claim and is correctly attributed.

## 8. Actions not taken

No adoption, issuance, implementation, RFC action, support activation, merge or
publication was performed. No comment was posted to Issue #261 or PR #356. No
clock, registry, schema, gate or authoritative artifact was changed.

## 9. Observations (nonblocking)

- `RELEASE-STATUS.md` now labels the R4 row "T01-T14 and A1 ... closed" while the
  Release 4 preparation index does not itself define a T01; the A1 packet's
  lineage table starts at T02 (PR #331). A pointer to where T01 is recorded
  would remove the ambiguity.
- The evidence index's "Execution architecture/procedure" row names "G4/G5"
  without a path; the A1 evidence map carries the exact targets, and the row
  could cite it directly.
- The packet reviewer commission asks for "every public comment through the
  review timestamp"; as of this review the only comment is the amendment record.
