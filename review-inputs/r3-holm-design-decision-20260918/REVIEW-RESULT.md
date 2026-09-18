# R3 Holm output-design checkpoint independent review result

## Verdict

REPAIR_REQUIRED

This is a design-checkpoint verdict only. It is explicitly not adoption, release,
implementation or integration GO. The proposed graph (Record-local conformance
independent of caller context and digest agreement; faithful failure reports versus
invocation refusals; genuine versioned schema and storage results) is coherent, is
consistent with the existing Phase 1/2A treatment of schema failure as a reported
conformance failure, and keeps arithmetic gated on every prerequisite. Two design
points are underspecified in a way that would let an implementer choose the wrong
semantics: the byte base and mutual dependency of the storage (K) and digest (I)
results against NRS-CANON-0016/0017, and the not_run reason-propagation policy
against CORE NRS-VERIFY-0017. Both are textual repairs to DESIGN, ACCEPTANCE and
LANDING; neither requires new research or code.

Findings: 0 BLOCKER, 2 MAJOR, 4 MINOR. Nonblocking observations in Section 6.

## 1. Fixed target and inputs

| Field           | Value                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Repository      | `licklider-ai/nomue-protocol`                                                                                                        |
| PR              | #355 "docs: prepare R3 Holm output design decision checkpoint", branch `preparation/r3-holm-design-decision-20260918`, draft, open   |
| Reviewed head   | `804502addc26d26cec9b6e29c61f54254f5e0a49`                                                                                           |
| Sole parent     | `0c7a685a1ea6b2b2d0dbe8966c572be95b82755a` (live `main` at review time; also the merge base)                                         |
| Head tree       | `41c3eea3f05d2bdf6f67648d0a0b9f68d5e76a58`                                                                                           |
| Delta from base | 7 Markdown files, +432 / −26; five new packet files plus `governance/drafts/RELEASE-STATUS.md` and `release-3-preparation/README.md` |
| Drift           | none: GitHub PR head, base, parent and tree equal the PR description's fixed target                                                  |
| CI on head      | 12 GitHub check runs, all `success`                                                                                                  |
| Local checks    | `pnpm format:check`, `pnpm lint:markdown`, `pnpm validate` pass at the head (Node 22.22.2, pnpm 11.7.0, frozen lockfile)             |
| Review date     | 2026-09-18 (UTC)                                                                                                                     |

Packet blobs: `README.md` `048ad09a…`, `DESIGN.md` `4d37cc11…`, `ACCEPTANCE.md`
`c86e0e9e…`, `LANDING.md` `70a4fb34…`, `REVIEW-COMMISSION.md` `d67a43d8…`;
`RELEASE-STATUS.md` `b61b133d…`, `release-3-preparation/README.md` `75cab96c…`.

PR #330 inputs read at the preserved head `b52389fd3efc6b8968613f59f147a578d5bbb55d`
(verified as the live PR #330 head; `8262f8b7…` is its ancestor, as stated):
`EXTERNAL-REVIEW-INTAKE.md`, `CONTRACT-PROPOSAL.md`, `COUPLING.md`,
`RFC-IMPACT.md`, the candidate.4 `report.schema.json` and `refusal.schema.json`
under `holm-separated-candidate-20260912/`, and the meta-schema previews. Issue #274
comment `5650143054` was read on GitHub and matches the intake. Authority inputs at
`main`: `AGENTS.md`, `registries/requirements.yaml`,
`schemas/meta/public-checks-registry.schema.json`, `spec/verification/public-checks.md`,
`spec/verification/verifier-refusal.md`, `spec/verification/profile-admissibility-check.md`,
`spec/core/integrity-model.md`, `canonicalization/record-canonicalization.md`,
`conformance/expectations/phase-2a-expectations.yaml`,
`release-3-preparation/public-opening-record.md`.

## 2. Independence, mechanism and scope disclosure

- The reviewer did not author or repair PR #355, PR #330, candidate.4, the intake
  or any R3 receipt. This session earlier reviewed the Release 5 opening proposal
  (PR #342) and the Release 2 decision packet (PR #354); neither overlaps this scope
  and nothing from them was reused.
- The PR #330 intake attributes its external review to a session configured as
  `claude-fable-5-1`. This session is also configured as `claude-fable-5-1` but did
  not perform that review; no identity with that reviewer is claimed or denied
  beyond the shared configured model name.
- The reviewer is an Anthropic language model in a Claude Code remote session
  (serving model may differ); not human-expert review, not steward review.
- Commands actually used: `git fetch/show/diff/ls-tree/merge-base/cat-file` on the
  fixed head and PR #330 head; GitHub API reads of PR #355, PR #330, check runs and
  issue #274 comments; `pnpm format:check`, `pnpm lint:markdown`, `pnpm validate` on
  a checkout of `804502a`.
- NOT_RUN: candidate.4 envelope/public/budget/separation suites, actual-host CI,
  numerical replay, receipt custody checks, primary-source PDFs. None is needed for
  a design checkpoint and none is claimed.
- No file under the packet, PR #330, registries, schemas, fixtures, release state or
  authoritative artifacts was modified. No comment was posted to issue #274, PR
  #330 or PR #355. No adoption, issuance, implementation or RFC action was performed.
  This result is the only addition on a separate reviewer branch.

## 3. Verified facts

- Existing behavior. Phase 2A expectations report schema failure as
  `conformance: completed/fail, NRS-SCHEMA-INVALID` in a report; refusals are
  reserved for parse, routing and resource cases. The successor's Q2 direction
  therefore returns to existing Protocol behavior; candidate.4's `schema_error`
  refusal was the deviation.
- Tier claims in LANDING are accurate: NRS-VERIFY-0005 is CORE and mandates separate
  reporting only; the Phase 1 gating paragraph is headed "Informative"; NRS-CORE-0011
  is STABLE-INTENT and conditional; NRS-SEC-0004 is CORE.
- Candidate.4 `conformance.schema` is `execution: const completed`,
  `outcome: const pass` with `schema_id` only, exactly as Q3 describes. Its refusal
  vocabulary includes `schema_error`, `noncanonical_storage`,
  `expected_context_error`, `input_access_error`, `execution_cancelled`,
  `unsupported_bundle`, `canonicalization_failure`, `internal_error`,
  `parse_error`, `resource_limit`, `routing_error`.
- The `main` meta-schema fixes `dependency_propagation` to the single constant
  `not_run_with_blocking_reason_codes`; the PR #330 preview adds
  `not_run_with_prerequisite_reason`. Candidate.4's `prerequisite_failed` reason is
  generic.
- The 36 locators R3D-01 to R3D-36 are unique and sequential. Opening record and
  README agree on issue #274 opening `2026-09-09T11:50:18Z` and earliest unchanged
  scope decision `2026-10-09T11:50:18Z`; the packet does not apply that date to the
  successor.

## 4. Answers to the five failure questions

1. Record-local conformance (Q1). Sound. D depends only on S, H only on D; C uses
   independently supplied expectations and derived defaults are forbidden; S
   failure blocks expected-context reads (R3D-20); arithmetic requires K, D, H, I
   and C; resource and outer-lifecycle refusals supersede provisional results. No
   self-derived context, no unadmitted data, no broadened arithmetic claim.
2. Truthful representability (Q2). Sound for schema-invalid input, missing
   references, malformed context and resource failure after provisional passes.
   Underspecified for recomputed digest ownership when stored bytes are
   noncanonical (M-1).
3. Schema and storage as separate results (Q3). S is well defined. K's byte base
   and its relation to I are not (M-1); the not_run reason policy is not reconciled
   with the CORE propagation clause (M-2); K's "projection available" precondition
   conflicts with the refusal rule (m-1).
4. Matrix coverage (Q4). Exposes the changed behavior, impossible outputs and
   legacy drift. Missing high-impact combinations are listed in m-2; the I outcome
   in R3D-14/15 is unspecified (M-1).
5. Reuse and open joins (Q5). Prior numerical, source and host evidence is reused
   only within its recorded scope; RFC, authority and shared-verifier joins are
   correctly left as substantive open work.

## 5. Findings

### MAJOR

**M-1. Storage (K) and digest (I) results are not reconciled with
NRS-CANON-0016/0017 and NRS-VERIFY-0027, so their byte base and mutual dependency
are undefined.**
Location: `DESIGN.md` dependency table rows K and I; "Faithful-report admission"
paragraph ("independently computed content digest under the selected projection");
`ACCEPTANCE.md` R3D-14 and R3D-15; `LANDING.md` "RFC impact" (which names only
NRS-VERIFY-0005, NRS-CORE-0011 and NRS-SEC-0004).
Failure scenario: NRS-CANON-0017 requires the verify-stage digest to be computed
over the STORED bytes and forbids making re-canonicalization the only success path.
The design lets I run when K fails ("K ... failure does not suppress ... I/C";
R3D-14 "eligible D/H/I/C evaluated") without saying which bytes I digests. An
implementer who digests the re-canonicalized projection passes I for noncanonical
bytes, violating NRS-CANON-0017 and letting a report reference carry a digest that
does not describe the stored bytes. An implementer who digests the stored bytes
produces an I failure that is a mere consequence of K, with no expectation stating
so, so the independently authored expected outputs the matrix requires cannot be
written. NRS-CANON-0016 additionally requires rejection of noncanonical bytes at
ingress; the design must say whether the verifier is an ingress point and why a
K-fail report without forwarding satisfies that clause.
Minimal correction: (a) state that I and the report-reference digest are computed
over the stored bytes' integrity-excluded projection, never over a re-canonicalized
value; (b) define I's relation to K, either K fail makes I not_run with a
prerequisite identity, or I is evaluated on stored bytes and its derivative outcome
is stated; (c) rewrite R3D-14 and R3D-15 to assert the chosen I outcome and the
report-reference digest base; (d) add NRS-CANON-0005 (CORE), NRS-CANON-0016,
NRS-CANON-0017 and NRS-VERIFY-0027 (EXPERIMENTAL) to LANDING's RFC-impact
paragraph with the argument that the K disposition preserves their meaning.
Closure check: DESIGN rows I and K name the byte base and dependency; R3D-14/15
carry explicit I expectations; LANDING lists the four clauses.

**M-2. The not_run reason policy is not reconciled with CORE NRS-VERIFY-0017.**
Location: `DESIGN.md` "This changes the old linear depends_on chain" paragraph
("Do not reuse a registry policy that copies a blocking reason if the
implementation emits a generic prerequisite reason"); `ACCEPTANCE.md` R3D-31;
`LANDING.md` "RFC impact".
Failure scenario: NRS-VERIFY-0017 (CORE) requires that when admissibility fails the
dependent checks be not run "and MUST identify the blocking reason". Candidate.4's
`prerequisite_failed` is generic, and the `main` meta-schema fixes propagation to
`not_run_with_blocking_reason_codes`. If the successor emits only a generic
prerequisite reason for A after H fails, a relying party reading A cannot identify
the blocking reason, which is at least arguably a CORE meaning change, and the
meta-schema constant must change, which is a schema-version impact the packet does
not name. The packet treats this as an implementation detail ("Exact reason
mappings are part of successor implementation").
Minimal correction: state in DESIGN that every not_run row identifies both the
failed or errored prerequisite rows and their blocking reason codes, or give the
argument that prerequisite identity alone satisfies NRS-VERIFY-0017 for the steward
to dispose; add NRS-VERIFY-0017 and the `dependency_propagation` meta-schema
change to LANDING's RFC-impact and coordinated-change tables; make R3D-31's
required observation name the reason content a not_run row must carry.
Closure check: DESIGN states the policy; LANDING lists NRS-VERIFY-0017 and the
meta-schema impact; R3D-31 is explicit.

### MINOR

**m-1.** K's precondition "canonical projection is available" implies a not_run or
error state for K when the projection is unavailable, but the refusal table says an
unavailable projection is a refusal with no report. State that projection
unavailability, including canonicalization failure under NRS-CANON-0005, is always a
refusal and that K has no unavailability state inside a report.

**m-2.** Missing high-impact matrix combinations: (a) schema failure combined with
a resource or budget overrun, to prove refusal precedence over a reportable S fail
(the text defers this to "add combinations"; it belongs in the numbered matrix);
(b) K fail crossed with D fail and with C mismatch, to prove K does not suppress
Record-local or context rows; (c) expected context whose Record or revision
identity differs from the Record, with an explicit disposition (C fail as mismatch,
or C error as wrong input); (d) a legacy Phase 1/2A bundle invoked with an expected
context argument, to fix whether it is ignored or refused; (e) R3D-05 should assert
that the report reference carries the independently computed digest and never the
declared one.

**m-3.** DESIGN retires several candidate.4 refusal kinds into report states
(`schema_error` to S fail, `noncanonical_storage` to K fail,
`expected_context_error` and part of `input_access_error` to C error) but neither
DESIGN nor LANDING lists which candidate.4 kinds survive as invocation refusals.
Add that mapping so R3D-32 and R3D-34 expectations can be authored.

**m-4.** LANDING's RFC-impact paragraph should also name NRS-VERIFY-0012 (reason-code
requirement, STABLE-INTENT) for the new reason ownership, and should say that the
Q2 direction restores the existing Phase 1/2A report behavior rather than
introducing a new one, since that fact bears on the tier assessment.

## 6. Nonblocking observations

- The RFC file `release-3-independent-multigroup-rfc.md` on `main` still opens with
  "public discussion not open" while the opening record and README say open. This
  predates PR #355 and is outside its scope; a later navigation reconciliation
  should touch it.
- PR #354 and PR #355 both edit `governance/drafts/RELEASE-STATUS.md` from the same
  base; whichever lands second will need a merge.
- The packet's honesty markers are in order: no steward adoption is claimed, the
  36 cases are labelled as not executed, candidate.4 receipts are not relabelled,
  and the Codex assistance and coordinator context are disclosed.
- The RELEASE-STATUS header now says the R2 summary retains its 2026-09-11 snapshot,
  which is true on `main` at this base.

## 7. Required repairs, in order

1. M-1: fix the byte base and K/I dependency in DESIGN; update R3D-14/15; extend
   LANDING's RFC-impact list.
2. M-2: fix the not_run reason policy in DESIGN; update R3D-31; extend LANDING.
3. m-1 to m-4 as convenient before D1 starts; m-2 before expected outputs are
   authored.

The repairs change no evidence, receipt or candidate byte. A close-only diff
confirmation suffices after they land; dependent implementation should stay paused
until then, as the commission requires.

## 8. Actions not taken

No adoption, issuance, implementation, integration or RFC action was performed. No
comment was posted to issue #274, PR #330 or PR #355. Nothing was merged. No
historical receipt or candidate pin was edited.
