# Release 2 formal decision packet independent review result

## Verdict

REPAIR_REQUIRED

The packet at PR #354 head `540e3cafa0268f1c488b4c1685fa7634b32d5169` separates
candidate-review findings from the D2 through D6 decisions, contains no path that
silently issues an identifier, Check, Bundle, reason code or supported numerical
behavior, and preserves Release 1. It is not yet a complete decision input: the D6
evidence list omits two inputs the ratification package requires, and the landing
outline omits two authority classes the RFC's proposed change set names. Both
repairs are textual. No BLOCKER.

Findings: 0 BLOCKER, 2 MAJOR, 7 MINOR.

## 1. Exact reviewed target

| Field           | Value                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| Repository      | `licklider-ai/nomue-protocol`                                                                                         |
| PR              | #354 "Prepare Release 2 formal decision packet", branch `preparation/r2-formal-decision-packet-20260918`, draft, open |
| Reviewed head   | `540e3cafa0268f1c488b4c1685fa7634b32d5169`                                                                            |
| Sole parent     | `0c7a685a1ea6b2b2d0dbe8966c572be95b82755a` (live `main` at review time; also the merge base)                          |
| Head tree       | `eaf48955cad4d8c5253ebc372ef6719d30f1689f`                                                                            |
| Delta from base | exactly 5 new files under `governance/drafts/release-2-formal-decision-packet-20260918/`, +222 / −0                   |
| CI on head      | 12 GitHub check runs, all `success`; `pnpm format:check`, `pnpm lint:markdown`, `pnpm validate` pass locally on head  |
| Review date     | 2026-09-18 (UTC)                                                                                                      |

Reviewed blobs:

| Path                               | Blob                                       |
| ---------------------------------- | ------------------------------------------ |
| `README.md`                        | `6f96cb8a52b4439069d3950a64f90cbaa925dc00` |
| `DECISION-LEDGER.md`               | `638a2e3cd03cb646934b2082714699c11df77ada` |
| `EVIDENCE-AND-DISPOSITION.md`      | `15cab5a3635333e49698598ec55112781baffd0e` |
| `AUTHORITATIVE-LANDING-OUTLINE.md` | `c0a691edcbfc4fe551517c76a0812dd8ae5bd854` |
| `INDEPENDENT-PACKET-REVIEW.md`     | `a416ef6744f00b337ace4fa8cc0f3214d24ac0e2` |

Sources read at `main` `0c7a685`, as the commission permits: RFC issue #25 (GitHub),
`governance/drafts/release-2-foundation-and-paired-t-rfc.md`,
`governance/drafts/release-2-steward-ratification-package.md`,
`governance/drafts/release-2-candidate/` (README, `protocol-identifiers.json`,
`requirement-namespaces.json`, `reviews/` listing), `governance/drafts/RELEASE-STATUS.md`,
the eight review receipts named in the evidence index, `AGENTS.md`,
`reference/SOURCE-PIN.json` and commit `0536b66` (PR #351).

## 2. Independence and scope disclosure

Performed in a reviewer role, in a session that did not author the packet, the
candidate surface or any receipt. The same session earlier reviewed the Release 5
opening proposal (PR #342); that work is unrelated to Release 2 and none of it was
reused here. The reviewer is an Anthropic language model in a Claude Code remote
session (configured `claude-fable-5-1`; serving model may differ); not human-expert
review and not steward review. No file, issue, pull request, branch, registry,
schema, release state or authoritative artifact was modified; this result is the only
addition on a separate review branch. No adoption, issuance, implementation or RFC
action was performed. No external source beyond GitHub issue #25 metadata was
fetched.

## 3. Verified facts

- **Timestamps.** Issue #25 `created_at` is `2026-08-26T20:52:54Z`; the RFC file,
  the ratification package and the packet all state opening `2026-08-26T20:52:54Z`
  and earliest decision `2026-09-25T20:52:54Z`. The window has not elapsed at review
  time; the packet does not claim it has.
- **Receipts.** All eight receipts exist at the cited paths and return `GO`. D2-D4:
  0 BLOCKER, 0 SHOULD-FIX, 1 NICE-TO-HAVE at head `ba7f2e10…`. D5 readiness: no
  findings at head `35ab094c…`, with the explicit statement that a different head
  requires a new exact-head review. M2, M3 and Groups 1 to 4: `GO`, no findings.
- **Candidate-surface drift since the receipts.** From `ba7f2e10…` to `main`:
  only `release-2-candidate/README.md` and `numerical/README.md` (chronology text,
  +19). From `35ab094c…` to `main`: the same two files plus the added D2-D4 review
  protocol file (+322 total). No manifest, schema, fixture, migration matrix,
  impact table or numerical artifact changed.
- **Reference kernel.** PR #351 (`0536b66`) changed
  `reference/stats-kernel/src/t-distribution.ts` (df = 1 Cauchy center) and advanced
  `reference/SOURCE-PIN.json`. Nothing under `release-2-candidate/` references the
  stats kernel, so the R2 candidate evidence is unaffected; the landing's Release 1
  compatibility evidence must run against post-#351 `main`.
- **Candidate manifests.** `protocol-identifiers.json` and
  `requirement-namespaces.json` are marked `unissued`, declare
  `public_check_order_semantics: ordered_as_listed` and `attestation_support: none`,
  and match the ledger's D2 to D4 descriptions.
- **Discoverability.** No file outside the packet links to it at the head.

## 4. Answers to the commission questions

1. **Separation.** Yes. "Current state" uses `OPENED`, `Candidate reviewed`,
   `Review-ready; not selected` and `Pending`; the evidence index has a "does not
   establish" column for every receipt; the README states that no affirmative
   disposition is inferred. One recorded steward decision is missing (MINOR m-2).
2. **Omissions and overstatement.** No receipt is overstated. Required inputs are
   omitted for D6 (MAJOR M-1) and, less materially, for D5 (MINOR m-1); drift and
   reviewed heads are not recorded (MINOR m-3).
3. **Release 1 and one coupled change set.** Release 1 is preserved: the outline
   forbids altering any existing Bundle's dispatch or checks, reinterpreting
   historical schemas, or legacy aliases, and gate 5 requires unchanged Release 1
   behavior. The change set is stated as one reviewable set but is incomplete
   against the RFC (MAJOR M-2).
4. **Silent issuance.** None found. Every path is conditioned on recorded D2 to D6
   dispositions; the "Outcomes permitted" table and the README boundary statement
   are consistent with the ratification stop condition.
5. **Material change.** Rule 4 requires a new impact assessment and, where
   applicable, additional discussion. The RFC and issue #25 say a material scope
   expansion or semantic change restarts the window. The rule should say so
   (MINOR m-7).

## 5. Findings

### MAJOR

**M-1. D6 required evidence omits two ratification inputs.** The ratification
package lists for R2-D6: green validation/conformance suite, closed adversarial
review findings, clean Release 1 historical-integrity audit, source/public snapshot
boundary review, and explicit exclusions. The ledger's D6 row lists "Complete
decision list, all applicable prior decisions, Release 1 invariance,
validation/conformance result, and explicit exclusions". Missing: closure of
adversarial review findings, and the source/public snapshot boundary review, which
AGENTS.md makes a hard publication-boundary rule. Repair: add both to the D6 row and
to rule 3.

**M-2. The landing outline omits two RFC change-set classes and the source pin.**
The RFC's "Proposed authoritative change set" names ten classes. The outline covers
specifications, requirement registry, identifiers and registries, schemas, Bundle,
conformance, reference consumer and compatibility evidence. Missing: (7)
`registries/public-contract-surfaces.yaml` with explicit schema-version impact, an
AGENTS.md hard rule for any public-surface change; and (10) authority-manifest
assignments and regenerated views (`pnpm generate`, `pnpm check:generated`). The
"Reference consumer" row should also name the `reference/SOURCE-PIN.json` advance,
since AGENTS.md places shared verifier development in `licklider-ai/nomue-verifier`
and this repository consumes a pinned copy. Repair: add two rows and one clause;
gate 1 already requires generated artifacts to be consistent.

### MINOR

**m-1.** The D5 "Required final selection record" omits ratification and RFC
inputs: a reproducible environment record for the oracle corpus, boundary and
metamorphic tests, separate maximum-error ledgers for algebraic quantities,
p-values and interval endpoints (the packet says "quantity-specific ... policy"),
and a numerical reviewer disposition independent of the implementation authoring
context. Add them or state that the ratification list is incorporated by reference.

**m-2.** The ledger records no steward decision other than D1, but the ratification
package records a partial D5 disposition: candidate-development **APPROVED on
2026-08-27** for the bounded `numerical/` work. Show it under D5 as a recorded
partial decision distinct from candidate reviews; D6 requires "all applicable prior
decisions".

**m-3.** The evidence index cites receipts by path only. Pin each receipt's reviewed
head and record the drift measured in Section 3 (chronology READMEs and one review
protocol only; no manifest, schema, fixture or numerical artifact changed), so the
steward decides against a known delta. Also note that PR #351 changed the Release 1
reference kernel after the receipts and that compatibility evidence must run
against post-#351 `main`.

**m-4.** Receipt selection is uneven: Group 1 and Group 3 cite the `-closure`
receipts, Group 2 and Group 4 cite the pre-closure receipts although
`r2-d5-group-2-runtime-numerical-contract-closure` and
`r2-d5-group-4-final-reason-code-inventory-closure` exist. Cite the latest closure
receipt for each group, or explain the choice. The D2-D4 summary "0 BLOCKER, 0
SHOULD-FIX" is accurate but omits the one NICE-TO-HAVE.

**m-5.** The packet is unlinked from `governance/drafts/RELEASE-STATUS.md` and
`release-2-candidate/README.md`, and the PR description says "after RFC #25's
public-discussion window" although the window elapses on 2026-09-25. The packet
text itself is correct.

**m-6.** The outline's registries row should say that comparison tolerances live
only in `registries/public-checks.yaml` and that each check version records
rationale and test vectors (AGENTS.md), since D5 selects tolerances.

**m-7.** Align rule 4 with the RFC and issue #25: a material scope expansion or
semantic change restarts the discussion window, not only the impact assessment.

### NONE

Questions 3 (Release 1 preservation), 4 (silent issuance) and the decision
sequence diagram raise no finding.

## 6. Required repairs

1. M-1: extend the D6 row and rule 3.
2. M-2: add the public-contract-surface impact and authority-manifest/regenerated
   views rows; name the source-pin advance.
3. m-1 to m-7 as convenient; m-3 is recommended before the steward decision.

The repairs change no decision, receipt or boundary, so a close-only diff
confirmation suffices after they land.

## 7. Actions not taken

No adoption, issuance, implementation or RFC action was performed. No comment was
posted to issue #25 or PR #354. PR #354 was not merged. No file under the packet,
the candidate surface, registries, schemas, release state or authoritative
artifacts was modified.
