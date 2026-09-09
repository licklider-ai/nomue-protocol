# Limited record-application review of the SR-D steward acceptance (Part U, PR #245)

**Status: informative limited review of one acceptance record, 2026-09-09. Verdict for
faithful record application only: `GO`, zero BLOCKER, zero SHOULD-FIX, two
NICE-TO-HAVE notes.** This review checks that an already approved decision is recorded
and applied faithfully. It does not make that approval pending again, does not grant
or extend any acceptance, and performs no merge, method adoption, additional hold
decision, public opening or release.

## 1. Task, fixed input and identity gate

The steward supplied the pinned commit `0624d98715706f1a940025407a91dccf9e8b3881`
(PR #245) and asked for Section U.5 of the result file to be executed. Every identity
below was re-derived from Git objects fetched into this clone and from local bytes.

| Fixed object                          | Verified value                                                                                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Part U commit (reviewed head)         | `0624d98715706f1a940025407a91dccf9e8b3881`; live `research/r3-srd-acceptance-20260909` head at start and immediately before this review's commit                                                              |
| Sole parent                           | `8c2c45d653a8c4d3b08fd4cafa7ef3f21ca01bc4` (PR #244; exactly one parent per `git rev-list --parents`)                                                                                                         |
| Tree                                  | `a33c2fa8ca0cc4d4e339c51b860a1730c3465851`                                                                                                                                                                    |
| Changed paths versus parent           | exactly one: `governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`, 190 insertions, 0 deletions                                                                                     |
| Result blob / bytes / SHA-256         | `7f05c96ea2d45ddfcc762bc1f785652dce51f5c3` / 466932 / `802ca0c5adfe8c489ba5365e694237d25e2d6d84a975cef15b20e4dd2fb9a376`                                                                                      |
| Parts A-T prefix                      | first 454817 bytes hash to `016605bec49391177c84fa0549ba40e6ef82b3a6873a1150c833a76e81c7de89`, equal to the Part T blob `0077a749…` at `8a1b5f9d…` (U.1's exact hash)                                         |
| Part T commit / parent / tree         | `8a1b5f9da70c654c03e0deb0229d2abd592aee44` / `00f50638d3389d2d901fcadb5e2d03a5f2bd4f78` / `f453bb9d6a5246dcefa4ac1562c9e77fe18b0c49`, as in U.1                                                               |
| PR #244 review commit / parent / tree | `8c2c45d653a8c4d3b08fd4cafa7ef3f21ca01bc4` / `8a1b5f9d…` / `3f95e2a7cdeb026cdc511ca2b426c2647aa9e97a`, as in U.1                                                                                              |
| PR #244 report at the reviewed head   | `review-inputs/r3-srd-author-synthesis/REVIEW-RESULT.md`, blob `ad5f229d36a8dcec55d8a9fdaed9ce29aaf0acb5`, 35242 bytes, SHA-256 `dd6b3318cbbed36f130704ce24eea0865fae8254aa9307084df3b1152ca0d25a`; unchanged |
| Acquisition commission blob           | `3c7ddcc696f0c284213f7efe0da68e747bc238d7` at the reviewed head                                                                                                                                               |
| PR #245 body identity block           | commit, parent, tree, blob, 466932 bytes, SHA-256 and 454817-byte prefix hash all equal to the values above                                                                                                   |
| CI runs named in U.1                  | `34305483112` (PR #242, head `8a1b5f9d…`) and `34306590720` (PR #244, head `8c2c45d6…`): both `completed` / `success`; the PR #245 run `34307192880` (head `0624d987…`) also `success`                        |
| Live `main` at start                  | `ed6e9d9bde691556b99d22e261b31c3b25df338f`                                                                                                                                                                    |

The seven Read-first files (`AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`,
`authority/authority-manifest.yaml`, `registries/requirements.yaml`,
`governance/ID-POLICY.md`, `governance/RFC.md`) have identical blob identities at the
reviewed head and at live `main`. No `AGENTS.md` exists under `review-inputs/` or
`governance/`. The reviewed head did not move between the start of this review and the
push of this report.

## 2. Role, prior involvement and model/context basis

- Role: limited record-application reviewer of Part U, executing U.5. This is a review
  of whether the approved decision is recorded and applied faithfully, not a new
  six-entry or A-D investigation and not a review of the decision's merits.
- Prior involvement, disclosed in full: **this session authored PR #244**, the
  independent synthesis review that U.1 pins and U.2 relies on, and whose four
  optional notes U.3 disposes of. This session did not author Part U, any Part A-T,
  PR #236, #237, #238 or #241, and took no part in the acceptance conversation. The
  steward assigned this record-application check to the same continuing session. The
  consequence is stated plainly: Section 4 below includes this reviewer accepting a
  correction to its own PR #244 note N-1.
- Model and context basis: the session service reports configured model
  `claude-fable-5-1` and last-served model `claude-fable-5-1`, the same session and
  context as PR #244. The record under review is, by its own account, OpenAI-assisted
  author/coordinator work. Git identity is not model evidence. No model-build
  verification is claimed.
- Not blind: U.1-U.5, the PR #245, #242 and #231 bodies, fixed Part T and the PR #244
  report were read in that order. No PDF was needed by default; two Bretz pages were
  read only for the concrete N-4 check in Section 4.

## 3. Faithful recording of the approved decision (U.1, U.2)

**Supported.** The decision U.2 records is the one that was presented for approval:

- The PR #242 receipt "Part T independent review received; formal acceptance
  proposal" states a concrete decision marked "NOT YET APPROVED": accept SR-D as
  `CLOSED` for source completion within Part T.2-T.6 only, based on Part T
  `8a1b5f9d…` and the scoped GO `8c2c45d6…`; keep the two-entry exception exactly as
  approved; keep the 1995 attribution unverified; retain all named limitations,
  conflicts and reopen conditions; accept the scoped independent-pass determination
  from PR #244's disclosed separate context; no method selection, implementation,
  merge, public opening or release. The PR #231 continuation receipt "SR-D synthesis
  review received; acceptance decision ready" cross-references it.
- U.2's four numbered points restate exactly that scope. Point 2 restates the
  existing exception "rather than granting a second or broader waiver" and names the
  same pinpoints (Wiens pp. 212-213; Dmitrienko pp. 2389-2391) and the same
  residual (SRC-27 (b) attribution and original formulation unverified). Point 4
  preserves T.4-T.6 with U.3's clarifications and says acceptance does not certify
  every cited theorem or authorize any procedure. Nothing beyond the presented
  proposal is recorded as approved.
- Both subsequent receipts (PR #242 "Scoped SR-D formal acceptance recorded" and PR
  #231 "Scoped SR-D formal acceptance recorded") state the same conversation approval
  and the same Part U identities. U.2 correctly says these are the same conversation
  decision, "not multiple independent votes or attestations", and that its text is
  not a verbatim quotation or an independently signed vote. That is the honest form
  PR #244 N-2 asked for.
- The scoped independence determination (U.2 point 3) rests on what PR #244 Section 2
  actually disclosed: separate session, no prior authorship of any SR-D artifact,
  service-reported model `claude-fable-5-1`, same model family as #236/#237/#241.
  U.2's final paragraph repeats those limits accurately and does not infer
  independence among all prior investigations or model identity from Git metadata.
  This mirrors Part S's S.4 pattern for SR-I.
- Acceptance versus adoption is kept distinct throughout: the status line, U.2 point
  4 and U.4 all deny method selection, implementation, merge, public opening and
  release.

U.1's statement that PR #237 remains a separately pinned input rather than an
ancestor was verified in PR #244 Section 1 and remains true at this head. U.1's claim
that the coordinator "read the report in full" is testimony that cannot be checked
from Git; the identities the coordinator says were re-derived are all correct.

## 4. Disposition of the four PR #244 notes (U.3)

| Note | PR #244 content                                                                    | U.3 disposition                                                                                                                           | Check                                                                                                                                                                                                                                                                              |
| ---- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N-1  | mark `min(1, p_i/w_i)` as the reviewed clipped convention; source states `p_i/w_i` | adopted; the note's sentence "decisions are identical for every `α ≤ 1`" is **rejected** at `α = 1` with the example `p = 1`, `w = 1/2`   | **U.3 is right and PR #244 N-1 was wrong at the endpoint.** Exact rationals: raw `2`, clipped `1`; `2 ≤ 1` false, `1 ≤ 1` true. For `0 ≤ α < 1` the decisions agree (a raw value above one clips to one, which still exceeds `α`). T.5 line "care at alpha=1" is retained.         |
| N-2  | restate the exception and decision in the steward's own words, as Part S did       | U.2 records the presented and approved decision; conversation approval identified honestly; no verbatim quotation or signature fabricated | matches the PR #242 receipt's presented proposal (Section 3 above); form parallels S.1-S.4                                                                                                                                                                                         |
| N-3  | separate Wiens's `Σ α'_i = α` from the author proof's "at most alpha"              | recorded: source premise equal to alpha; weaker premise is an author derivation, not a Wiens quotation                                    | Wiens p. 213 reads `Σ α'_i = α` (PR #244 Section 3); PR #238 B1 states the at-most-alpha premise as author mathematics                                                                                                                                                             |
| N-4  | add Bretz pp. 587 and 604 to the T.3 pinpoint list                                 | supplemented in U.3 (T.3 itself stays immutable); reused from PR #236 F-D-09/S-3; no new chapter access claimed                           | direct check on the supplied PDF (SHA-256 `87041fa4…`): p. 587 = PDF 2 carries "As shown by [9], all these procedures belong to a subclass of weighted Bonferroni-based closed test procedures"; p. 604 = PDF 19 carries reference 2, Maurer, Hothorn and Lehmacher 1995, pp. 3-18 |

U.3's closing paragraph is accurate: the clarifications leave Part T and the PR #244
report immutable (verified by blob identity), expand no source basis, alter no tested
procedure and change no numerical result. U.5 item 2's two specific asks are met: the
`α = 1` exception is kept and source premises are distinguished from author
derivations.

## 5. Successor state, ledger and boundaries (U.4)

- Ledger: 8 `CLOSED` (SR-B, SR-C, SR-D, SR-F, SR-G, SR-I, SR-K, SR-L) / 1 `PARTIAL`
  (SR-H) / 5 `INPUT_INCOMPLETE` (SR-A, SR-E, SR-J, RSM-01, RSM-02): identical members
  and counts to T.6. U.4 correctly says the change is SR-D's formal acceptance, not the
  counts, and not a claim that all eight `CLOSED` rows were formally accepted by this
  decision.
- SR-D status: author `CLOSED` candidate with acceptance `PENDING` (Part T) becomes
  steward-accepted `CLOSED` for source completion within the bounded scope. That is
  the presented decision and nothing wider.
- Preserved: SR-I acceptance, every other hold state, overall `INPUT_INCOMPLETE`
  (five rows remain), `SOURCE_SET_READY` false, `NARROW`, `TRANSFER`,
  `R3-CAND`/`RES-ONLY` tokens, R4, custody 42 + 1 = 43. All stated.
- Residuals: U.4 restates T.6's reopen conditions in full (1995 chapter,
  Simes/resampling, graph necessity and extensions, confidence bounds, directional
  error, improved/modified fallback, Marcus Table 1, implementation conventions, SR-J
  X-8 separate). Nothing dropped.
- Public-opening boundary: U.4 says the acceptance removes the bounded SR-D obstacle
  only and that remaining source work, RFC integration, an independent readiness
  review and the public-opening decision remain necessary. Consistent with T.6 and
  the commission.

## 6. Validation record

Run at the reviewed head in this clone (dependencies from the earlier
`pnpm install --frozen-lockfile`, exit 0, same lockfile), with this report added and
nothing else changed.

- `pnpm format:check`: "Checking formatting... All matched files use Prettier code
  style!"; exit 0.
- `pnpm lint:markdown`: "Linting: 360 files … Summary: 0 issues in 0 files"; exit 0.
  A first run reported one MD018 issue in this report (a wrapped line beginning with a
  pull-request number); the line was re-wrapped and the run repeated.
- `node --import tsx tooling/src/validate.ts`: "validate: OK - registries,
  traceability, normative lint, authority, gates, conformance manifest, links,
  private-dependency and language audits, phase-1 schemas, cross-checks, code-path
  audits, and the snapshot manifest mechanism are clean."; exit 0.
- `git diff --cached --check` with this file staged: no output; exit 0.
- Staged tree: exactly one added path, `review-inputs/r3-srd-acceptance/REVIEW-RESULT.md`.

Not run: full `pnpm check`, `pnpm test`, `pnpm typecheck`, `pnpm check:generated`, the
Phase 1 suite and every prior statistical diagnostic script. Part U changes no script
or authoritative artifact and claims none of these; the omission is disclosed. The
`α = 1` example in U.3 was recomputed with exact rationals (three lines, not
committed); no other calculation was needed.

## 7. Findings

### BLOCKER

None.

### SHOULD-FIX

None. The approved decision is recorded as presented; the two-entry exception is
restated without broadening; the independence determination is scoped to what PR #244
disclosed; all four notes are disposed of correctly, including the correction of
PR #244 N-1; the ledger, preserved state and boundaries are accurate; Parts A-T and
every prior artifact are byte-identical.

### NICE-TO-HAVE (editorial; none moves the verdict)

- **E-1 (U.1).** "The coordinator … read the report in full" and the CI run numbers
  are testimony and external state respectively; both CI runs were confirmed here as
  `success`, and the run for PR #245 itself (`34307192880`) is also `success`. A
  future record could cite the run's `head_sha` alongside its number so the pairing is
  checkable without the Actions API.
- **E-2 (U.3 N-1).** The sentence "Their threshold decisions agree for `0 <= alpha <
1`" is correct; adding the one-line reason (a raw value above one clips to one, which
  still exceeds any `α < 1`) would let a reader verify it without an example.

## 8. Verdict and preserved state

`GO` for faithful record application of Part U at
`0624d98715706f1a940025407a91dccf9e8b3881`. No repair is needed. This verdict does not
re-approve the source-basis exception or the formal SR-D acceptance, both of which
the steward already approved, and it does not make either approval pending again.

Preserved unchanged: Parts A-T as an exact 454817-byte prefix, the commission, the
semantic comparison, every prior report, script and review including the PR #244
report, ledger 8 / 1 / 5, SR-D steward-accepted `CLOSED` for the bounded
source-completion scope, overall `INPUT_INCOMPLETE`, `SOURCE_SET_READY=false`,
`NARROW`, `TRANSFER`, every `R3-CAND` and `RES-ONLY` token, the SR-I acceptance, all
other holds, historical `PENDING` records and the separate R4 state. This review adds
one file and changes nothing else. No merge, procedure adoption, additional hold
decision, public opening or release.
