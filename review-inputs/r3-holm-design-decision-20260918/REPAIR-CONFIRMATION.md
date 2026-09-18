# R3 Holm output-design checkpoint repair confirmation

## Verdict

GO_FOR_UNISSUED_IMPLEMENTATION

Design-checkpoint verdict only. It closes the D0 checkpoint for the repaired
packet at PR #355 head `1eb6b931d7e20466bb8d3c364965545362efb2f0` and permits the
next unissued engineering step (D1). It is explicitly not adoption, release,
integration, RFC-window or publication GO; every later milestone still needs its
own evidence and disposition. All six findings of the preserved review
(`REVIEW-RESULT.md`, target `804502a`) are closed by the repair. One editorial
residual remains (Section 5).

## 1. Exact reviewed target

| Field                  | Value                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Repository             | `licklider-ai/nomue-protocol`                                                                                                             |
| PR                     | #355, branch `preparation/r3-holm-design-decision-20260918`, draft, open, not merged, mergeable state clean                               |
| Reviewed head          | `1eb6b931d7e20466bb8d3c364965545362efb2f0` ("docs: repair R3 storage digest and blocking reason design")                                  |
| Sole parent            | `dd2e697f3e1a067e08a3e26daefc71e993567359` (review intake; adds only `REVIEW-RESULT.md`, +241)                                            |
| Head tree              | `a5f8e21095f396c04819ae33a80e10b5bdd7888a`                                                                                                |
| Base main / merge base | `0c7a685a1ea6b2b2d0dbe8966c572be95b82755a`, unchanged since the original review                                                           |
| Prior reviewed head    | `804502addc26d26cec9b6e29c61f54254f5e0a49`                                                                                                |
| Drift                  | none: GitHub PR head, base, parent and tree equal the PR description                                                                      |
| Preserved review blob  | `f8bb84b0a0d9feea418ef77ff0d896bc1ff549d8`, byte-identical to reviewer commit `18c69c2`; SHA-256 `d413389d…4964ad` recomputed and matches |
| Commission blob        | `d67a43d81d50908c537819c6ff5101b42a40adb4`, unchanged from the original head                                                              |
| Repair diff            | `dd2e697..1eb6b93`: 7 Markdown files, +273 / −78 (DESIGN, ACCEPTANCE, LANDING, README, new REPAIR-DISPOSITION, RELEASE-STATUS, R3 README) |
| CI on head             | 12 GitHub check runs, all `success` (completed after the PR body was written)                                                             |
| Local checks on head   | `pnpm format:check`, `pnpm lint:markdown`, `pnpm validate` pass (Node 22.22.2, pnpm 11.7.0)                                               |

Packet blobs at the head: `DESIGN.md` `80d2aa0a…`, `ACCEPTANCE.md` `d3c3c51b…`,
`LANDING.md` `ed22f929…`, `README.md` `1f5cf5de…`, `REPAIR-DISPOSITION.md`
`dff4ec5c…`, `REVIEW-COMMISSION.md` `d67a43d8…`.

## 2. Continuity and scope disclosure

Same reviewer session as `REVIEW-RESULT.md`, acting as the close-only confirmer
the repair disposition requests. Only the repair diff and the repaired sections in
context were re-read; unchanged scope relies on the preserved review. The reviewer
is an Anthropic language model in a Claude Code remote session (configured
`claude-fable-5-1`; serving model may differ); not human-expert review, not steward
review. Inspections actually performed: `git` identity and blob checks, SHA-256
recomputation of the preserved review, the full `dd2e697..1eb6b93` diff, locator
uniqueness over `ACCEPTANCE.md`, the existing integrity-model digest construction
(`spec/core/integrity-model.md`), the candidate.4 Contract proposal's digest
paragraph and the candidate.4 refusal enum at PR #330 head `b52389fd…`, GitHub PR
and check-run reads, and the three local checks above. NOT_RUN: candidate.4
suites, actual-host CI, numerical replay, custody checks, primary sources. No
file under the packet, PR #330, registries, schemas or authoritative artifacts was
modified; no comment posted; nothing merged.

## 3. Finding-by-finding confirmation

| Finding | Repair at head                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Result |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| M-1     | DESIGN row I now requires S and K pass and hashes the stored-byte projection; "K failure makes I not_run" is stated. A raw-preserving lexical projection P(B) is defined; the reference digest is SHA-256 of `nomue/record-content/v1` + LF + P(B) in `sha256:` hex form, which matches the existing integrity model and the candidate.4 Contract. On the S/K-pass path an independent P(B) versus JCS comparison refuses on disagreement, so a reserialized digest can never yield I pass. K-fail reports identify rejected bytes and forward nothing. LANDING lists NRS-CANON-0005/0016/0017 and NRS-VERIFY-0027 with tiers and dispositions. R3D-14/15 state I not_run with K identity and reason and the P(B) reference base; R3D-44 rejects the reserialization-only route. | Closed |
| M-2     | DESIGN retains `not_run_with_blocking_reason_codes`; every not_run row names blocking prerequisite identities and carries their actual reason codes, with transitive propagation and a deterministic deduplicated union for several blockers; generic-only, missing or unrelated reasons are excluded. PR #330's `not_run_with_prerequisite_reason` preview is explicitly not selected. LANDING adds NRS-VERIFY-0017 and NRS-VERIFY-0012 and records that report schemas, not the meta-schema constant, change. R3D-31 and R3D-42 make the required reason content explicit.                                                                                                                                                                                                     | Closed |
| m-1     | DESIGN states that canonicalization, extraction or digest unavailability always refuses under NRS-CANON-0005 and that K has no projection-unavailable report state; S-fail not_run is distinguished. R3D-43 added.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Closed |
| m-2     | R3D-37 (S fail plus resource overrun: refusal wins), R3D-38 (K with D), R3D-39 (K with C mismatch), R3D-40 (expected Record and revision identity mismatch: C fail as mismatch), R3D-41 (legacy bundle plus expected-context argument: invocation refusal) added; R3D-05 asserts the reference carries the independently computed digest, never the declared one.                                                                                                                                                                                                                                                                                                                                                                                                                | Closed |
| m-3     | DESIGN "Candidate.4 refusal migration" maps all twelve enum kinds; the twelve rows equal the candidate.4 `refusal_kind` enum exactly. Expected-only parse or access errors are distinguished from Record, resource and lifecycle failures; legacy extra-argument handling is fixed as refusal.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Closed |
| m-4     | LANDING names NRS-VERIFY-0012 and records that reportable schema failure restores Phase 1/2A behavior (NRS-SCHEMA-INVALID in the Phase 2A expectation set), scoped to that part only with no blanket window exemption.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Closed |

Repair-disposition custody claims verified: reviewer commit, blob and SHA-256
match; the commission is unchanged; the intake commit adds only the review file;
the 44 locators R3D-01 to R3D-44 are unique and sequential; README, LANDING,
RELEASE-STATUS and the R3 README carry the 44 count consistently.

## 4. Highest-risk checks named by the disposition

- No path that hashes only a reserialized value can produce I pass or forwarding:
  confirmed by the I precondition (K pass), the P(B) definition, the independent
  P(B) versus JCS comparison with refusal on disagreement, and R3D-44.
- No blocked result can discard the actual reason for its nonexecution:
  confirmed by the propagation paragraph, the retained meta-schema constant and
  R3D-31/42.
- Raw P(B) extraction does not claim a noncanonical input is canonical: the
  K-fail reference is stated to identify rejected bytes, not a valid canonical
  content digest, and the successor report contract must express that.
- Reference hashes in failure reports are not digest-agreement verdicts:
  stated explicitly in DESIGN and required of the report contract.

## 5. Residual

**E-1 (editorial).** The DESIGN dependency table still gives K the precondition
"S passes; canonical projection is available" while the text below establishes
that projection unavailability is always a refusal and K has no unavailable state
in a report. Drop the availability clause from the table row at the next touch.
No implementation ambiguity results because the prose and R3D-43 control.

## 6. Actions not taken

No adoption, issuance, implementation, integration, RFC or publication action was
performed. No comment was posted to issue #274, PR #330 or PR #355. Nothing was
merged. The original review, the commission and every historical receipt are
unchanged. This file is the only addition on the reviewer branch.
