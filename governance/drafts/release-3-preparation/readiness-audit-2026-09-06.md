# Release 3 Readiness and Ratification Audit — 2026-09-06

**Status: informative repository-state audit and maintenance disposition.**
Release 3 is not ready for public opening, authoritative implementation, ratification,
or publication. This audit records existing evidence and repairs navigation and
preservation gaps. It creates no new gate, Protocol authority, supported capability,
numerical disposition, or release decision.

## Scope and identity

- Inspected repository: `licklider-ai/nomue-protocol` only.
- Main input: `0eb388e11c240795282b6b17d7718501757d1e43`, tree
  `fa7c1ef1ffd4ba17f52f1b2609c7f7e37af9d913`.
- Open result PR: #174, head `9f39eafd4b0a676e6615956b5a7899f195fc0358`,
  tree `9079e4ff5977f62b2bd275d92ca68a1f7ce3e524`, sole parent the main input,
  result blob `fae44794e35fc57407b73056e4c3bf3c4336b492`.
- Live records inspected: RFC issues #25 and #26; commissions #171 and #172;
  merged PR #173; open PR #174; release inventory and main commit checks.
- Reviewer role: repository readiness reviewer and informative-maintenance author.
  This work did not author the inspected research or its prior independent reviews.
  This report reviews evidence identity, status, closure conditions, and documentation;
  it is not the separate primary-source or probe-reproduction review required to
  close PR #174, reconsider `NARROW`, or satisfy R3-H7. Maintenance verification in
  this same context is not an independent review of this maintenance change.

No new primary-source inspection or numerical probe execution is claimed. Statements
about source coverage below report the inspected research records, rather than
reasserting their underlying scientific or regulatory claims.

## Development, review, and ratification are different states

| Release   | Completed evidence                                                                                                                                                          | Still undecided                                                                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Release 1 | Published experimental Public Draft; tag `release-1` resolves to `5db97826e0905a72e0fed14536d820e77af9be95`; all 83 signed-manifest file digests match that historical tree | No successor work reinterprets that snapshot; this audit did not repeat the signing ceremony                                                                       |
| Release 2 | Structural candidates; M2/M3 numerical candidate closure; reviewed Groups 1–4; preserved final review-readiness `GO` for head `35ab094c9106903e6b8e87a144cfbd8cd52ae124`    | RFC #25 decision, R2-D2/D3/D4 authoritative allocation and surfaces, final R2-D5 disposition, R2-D6 candidate scope, coupled authoritative landing and publication |
| Release 3 | Pre-public RFC, two research commissions, reviewed semantic `NARROW` catalogue, merged SR-L source closure                                                                  | Remaining primary sources, numerical result repair review, integrated R3-H1–H7 readiness, public opening, all later design/issuance/support/publication decisions  |

The Release 1 snapshot hash remains
`sha256:fc26c770538abe3598fc27a571ca6e99cc29763e0a25859a80c267ee2d80ab06`.
The repository still has only the Release 1 public release.

For Release 2, the authoritative public-review minimum remains 30 calendar days.
The exact earliest decision is `2026-09-25T20:52:54Z`
(`2026-09-26T05:52:54+09:00`). Expiry permits a recorded steward decision; it does
not approve the proposal or publish Release 2 automatically. The separate CORE
process amendment in issue #26 remains open until at least
`2026-10-25T20:53:12Z`; its proposed shorter periods are not current rules.

The Release 2 ratification package and machine-readable checkpoints retain historical
pending states by design. Read them with the preserved
[final review-readiness result](../../../review-inputs/r2-d5-final-review-readiness/REVIEW-RESULT.md).
Its `GO` is not final numerical-contract approval. The 18 source bindings and all four
closure-preservation chains were reconstructed from Git objects successfully. Release 2
material is left unchanged, including its pinned hashes.

Release 3 discussion need not wait for Release 2 publication. Reused Release 2
surfaces remain conditional, and neither candidate spelling nor a candidate review
becomes issued Protocol meaning through reuse.

## Adversarial findings and repair disposition

### 1. Completed SR-L work was absent from the preparation entry point

**Documentation finding: SHOULD-FIX; repaired in this maintenance change.**
The preparation README still described SR-A through SR-L as acquisition holds
without distinguishing the merged SR-L result. The RFC did not point to the current
source-completion state. This could cause repeated work or a mistaken inference
that the original research commission remained the complete status record.

The README now records SR-L `CLOSED`, eleven SR holds plus two resampling source
items still `INPUT_INCOMPLETE`, and the original overall `NARROW` boundary. The RFC
links the status without adopting a procedure or changing its proposed scope.
The fixed semantic and source-acquisition results are preserved unchanged.

### 2. Decision-bearing review bodies were outside the main tree

**Preservation finding: SHOULD-FIX; repaired in this maintenance change.**
The PR #173 merge message and PR body identify an independent review, but that
review's file was absent from main. The original PR #174 finding record likewise
remained on a separate review commit. They were accessible, so this is not a claim
that review evidence was lost or that the SR-L intake was invalid. It is a durability
and discoverability gap, particularly when reviewing or pruning old branches.

This change preserves both review files byte-for-byte at their original paths:

| Review                                                                                                   | Source commit                              | Original and preserved blob                |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------ |
| [SR-L repair review](../../../review-inputs/r3-semantic-source-acquisition-sr-l-repair/REVIEW-RESULT.md) | `1e220f676deefb679eb1a3cd2b2ed0d84ebcd0b2` | `6624d4620a8c283f10bb59ce743dfe69bacc230e` |
| [Original numerical review](../../../review-inputs/r3-multiplicity-numerical-oracles/REVIEW-RESULT.md)   | `32e9f3c599eb40e9bd25a33a8595ee07bda6be28` | `7a27fe441ad784f1edf1de019240838a0434262d` |

The first review approved SR-L closure on head
`72cc0e1e3c169d9402df222799e7127ec44e5942`. Its result blob
`5465cbcfd00708facac94785d9244b79166cb81e` is identical in the reviewed head
and the main intake. The second review's `NO_GO` applies to its original head
`18563ccf8cb50a7cf1c9d74718b2adf3e2cf0537`, not automatically to every
successor. Neither preserved file is rewritten to describe today's status.

### 3. PR #174 repair claims do not establish completed independent closure

**Outstanding review obligation; not a newly discovered numerical counterexample.**
The successor addresses the visible label, path, digest, and count defects:

- it returns `INPUT_INCOMPLETE` without a numerical disposition;
- all eight embedded script SHA-256 values and all eight fenced-output SHA-256
  values match their exact bytes;
- the matrix has 49 unique procedure/variant entries; the two GUI guidance entries
  are separately excluded from numerical-path requirements;
- 50 preliminary scope assignments count MTO-01 twice for explicitly different
  scopes, rather than claiming 50 unique procedures; and
- the retained assessments are `PRELIM-*`, not adopted numerical dispositions.

However, original finding B-3 explicitly required regeneration of every changed or
mismatched output, and its successor-review instruction requires reproduction of
affected probes. Successor Sections 2.3 and 19 state that Probe B was rerun only
through the eleven enclosure cases, monotonicity checks, and first critical value.
Appendix B.2 retains the original full transcript with a corrected hash. That fenced
transcript is byte-identical to the original candidate's transcript, as independently
checked here. Hash consistency proves which text is stored, not that the incomplete
rerun reproduced its remaining results.

Therefore a blanket claim that B-1/B-2/B-3/S-1 are independently closed is unsupported.
Complete the required reproduction, record the actual environment and outputs, and
obtain the separate-context exact-head close-only review before intake. This audit
does not waive the earlier reproduction requirement, modify PR #174, or issue a
replacement close-only verdict. The optional neutral-path audit enhancement N-1
remains a separate tooling task.

Even successful repair closure would permit consideration of an informative
`INPUT_INCOMPLETE` intake only. It would not establish numerical feasibility or
satisfy the missing-primary-source research gate.

## Existing Release 3 holds and ordered work

The seven R3-H labels below are the existing RFC holds, not a parallel gate system.
No new closure is assigned by this audit.

| Existing hold | Current reviewable evidence                                                     | Remaining acceptance condition                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R3-H1         | Fixed 49-procedure catalogue and preserved semantic review; SR-L source closure | Complete and independently review SR-A–SR-K and RSM-01/02; reconsider `NARROW` explicitly before treating the comprehensive question as source-ready                   |
| R3-H2         | Candidate declaration inventory in semantic result Section 11                   | Reconcile design, unit, group, population, outcome, contrast/control/family and selection declarations against accepted sources in the RFC                             |
| R3-H3         | Candidate distinctions and result classes in Sections 8–9 and 12                | Resolve source-dependent assumptions and guarantee distinctions; map each accepted procedure to its actual output class                                                |
| R3-H4         | Candidate dependency order in Section 10                                        | Review and record a separately closable Contract/Public Check sequence without promoting a preliminary implementation choice                                           |
| R3-H5         | Unmerged numerical coverage and explicit NB-01–NB-10 holds in PR #174           | Close result-repair review and the required primary-source work; provide independently reviewed coverage or explicit numerical holds for each implementation candidate |
| R3-H6         | Conditional Release 2 reuse already stated                                      | Recheck the actual Release 2 disposition at opening and at every dependent design decision; keep unresolved surfaces conditional                                       |
| R3-H7         | No completed integrated opening review                                          | Independent review of the final proposed RFC and accepted research inputs; then a distinct steward opening action                                                      |

Recommended execution order:

1. **Source supply and identity:** resolve X-8, the Marcus (1976) bibliographic
   identity. The current record has 47–48 required source items, of which 3 were
   inspected in Pass 2 and 44–45 remain uninspected. These are artifact counts, not
   development percentages. Acquire lawful inspectable copies for SR-A–SR-K and
   RSM-01/02. The existing source record identifies SRC-22/23/24/30 as four routes
   for an initial increment; obtaining some of them does not alone close SR-J or SR-K.
2. **Semantic completion:** inspect exact sources and variants, record hashes and
   pinpoints, preserve conflicts and resampling transfer boundaries, and obtain
   independent review. Preserve SR-L and its X-7/U-5 reopen conditions. Do not turn
   one completed framing hold into approval of all procedures.
3. **Numerical repair and source work:** reproduce the affected PR #174 probes,
   complete the independent close-only review, and preserve its result before intake.
   In parallel, obtain the missing primary numerical sources. An accepted incomplete
   report is progress bookkeeping, not research-gate closure.
4. **RFC synthesis:** integrate only accepted results into R3-H1–H6, with exact
   evidence scope, exclusions/transfers, dependency order, and explicit unresolved
   numerical and structural decisions. Complete independent R3-H7 review.
5. **Public opening:** after readiness and the steward's opening decision, confirm
   the highest affected tier from the current registry and record the actual issue,
   opening time, minimum window, and earliest decision. If STABLE-INTENT remains the
   highest tier under current rules, the minimum is 30 days from actual opening.
   No Release 3 earliest-decision date exists today.
6. **Candidate development and later ratification:** after applicable research gates,
   close each selected vertical increment's semantics, numerical proof/oracles,
   operation and projection rules, resource/execution boundaries, schemas, fixtures,
   refusal order, and independent review. Numerical implementation need not be
   complete before public opening. After the public window, separately decide
   permanent allocation, authoritative coupled landing, candidate freeze, release
   evidence, and publication. Preparation does not pre-authorize those decisions.

The critical path to opening is source-backed scope and integrated readiness, not
completion of every numerical implementation or waiting for Release 2 publication.
Research lanes can proceed independently within their existing commissions.

## Validation and limits

At the main input, frozen dependency installation, formatting, Markdown lint, and
type checking passed. The ordinary `pnpm check` wrapper stopped at the environment's
`tsx` IPC permission error. Direct `node --import tsx tooling/src/validate.ts` passed,
the full test suite passed 55 files / 520 tests, and direct generated-file checking
matched all 19 files. These results are not described as a successful ordinary
`pnpm check` invocation.

Main's hosted CI run `33843459606` has five successful jobs at the exact inspected
head. Independent repository audits also confirmed the 83 Release 1 snapshot files,
18 Release 2 source bindings, four candidate closure-preservation chains, the SR-L
intake blob, and 16 numerical script/output digests. The probes themselves and the
primary documents were not rerun or reread by this audit.

Maintenance changes are confined to this audit, the two informative entry points,
and byte-identical preservation of the two prior review files. No authoritative
artifact, fixed research result, commission, Release 2 artifact, reference code,
generated file, or release state changes. Validation of the resulting maintenance
head is recorded in its pull request.
