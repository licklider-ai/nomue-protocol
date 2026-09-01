# FND-1 All-Pairs Successor-Source Reconciliation Candidate

**Status: informative steward reconciliation candidate; non-normative; not
adopted.** This document reconciles the frozen repository-analysis pass with
the initial and source-supplied primary-source passes for the retained
all-pairs successor-source requirement. It records a candidate research-state
disposition only. It selects no procedure, defines no identifier, authorizes no
implementation, closes no Research Gate, and affects no release.

## 1. Identity and fixed inputs

| Input                                   | Commit or content identity                                                                                | Role in this reconciliation                                                         |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Original successor-source commission    | commit `34b5362338de035e2891f1525b63d7b69157a22b`; blob `14b3769f7315e04859e1746d448d3b57547d4237`        | original bounded question and two-pass separation                                   |
| Initial primary-source result           | blob `8b73ce62fe64be7e0481790f329a16ccd38f61d8`                                                           | access-limited Pass A; `DEFER / KEEP_OPEN`                                          |
| Repository-analysis result              | result commit `08201a4bf18f736ee975028a42f67362b0939d9b`; blob `098a349fa203b3951d70771288be21ebcdcb2e29` | Pass B repository and attribution analysis; `DEFER / KEEP_OPEN`                     |
| Source-supplied completion commission   | commit `1af5916fbdb2c99b62f5bb6c82461861c48001f2`; blob `0fd233319d1f32243336d4f88b7bc61a376e86f8`        | reopened primary-source questions and artifact pins                                 |
| Source-supplied completion result       | intake commit `e6da40d8cb28fd8ed68bb2c0f8bae8c3fc67f14d`; blob `236cd949b99b558e207082c74832edf158f3839d` | completed primary-source evidence; `NARROW`                                         |
| Existing `FND1-H03` steward disposition | [`2026-08-31-multiplicity-steward-disposition.md`](2026-08-31-multiplicity-steward-disposition.md)        | controlling boundary: narrowed closure with a retained successor-source requirement |

The completion result's supplied file included a 36-line working transcript
before its report heading. The intake removed only that transcript and applied
repository-standard Markdown formatting. The supplied file, extracted report
body, and committed report are identified in the intake record by SHA-256.

The four source PDFs are not repository contents. Before this reconciliation
was drafted, the steward independently recomputed their four registered
SHA-256 values, confirmed the 5/15/5/8 page counts and printed-page maps, and
spot-checked the decisive proposal, simulation, theorem, strictness, and
residual-problem pinpoints. Those checks matched the completion result. This is
a bounded intake check, not another independent research pass.

## 2. Scope and exclusions

This reconciliation answers only how the source-supplied evidence changes the
retained all-pairs successor-source requirement. It excludes:

- selection or support of an all-pairs procedure;
- numerical implementation, quantile computation, tables, tolerances, or
  software behavior;
- heteroscedastic all-pairs procedures;
- public schemas, identifiers, requirements, checks, APIs, or conformance
  behavior;
- `FND1-H04` through `FND1-H08` except to preserve their open state; and
- Release 2, paired-t, and t-family numerical-contract work.

## 3. Why the passes do not conflict

Pass B and the source-supplied completion inspected different evidence at
different stages:

| Question                                                       | Repository-analysis pass                                                                                            | Source-supplied completion                                                                                                  | Reconciled reading                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Did the fixed repository already identify the successor texts? | No. The full in-scope search found no bibliographic identity or pinned successor text.                              | Not a repository-search question.                                                                                           | Pass B's bounded absence finding remains true at its fixed commit.                |
| Can the successor texts now be identified?                     | `NOT_VERIFIABLE` without external text.                                                                             | Yes for Kramer (1956), Hayter (1984), Spjøtvoll and Stoline (1973), and Dunnett (1980), each artifact-hashed and inspected. | The later source package supplies evidence that Pass B correctly said was absent. |
| Did Kramer (1956) prove the unequal-size guarantee?            | Not answerable from repository contents.                                                                            | No. It proposes and illustrates a multiple-range construction; the conservativeness remark is attributed to a referee.      | Proposal lineage closes; proof attribution to Kramer is rejected.                 |
| Where is the general conservative guarantee proved?            | Not answerable.                                                                                                     | Hayter (1984), under the paper's stated normal, independent, common-variance model.                                         | Guarantee lineage closes to Hayter, not Kramer or Tukey.                          |
| Is the current public surface misattributed?                   | No live or normative-surface misattribution; only a superseded historical intake contains the old 1949 attribution. | Confirms that 1949 is not the successor source and separates later sources.                                                 | No corrective public-surface repair is required.                                  |

Pass B's `DEFER / KEEP_OPEN` was therefore the correct disposition for its
available evidence. The completion result does not contradict it; it satisfies
most of the source needs that Pass B handed back to the primary-source lane.

## 4. Reconciled findings

### 4.1 Balanced mathematical construction

Hayter (1984), printed p. 61 expression (1.1), directly formalizes the balanced
all-pairs simultaneous confidence procedure, its exact joint `1 - alpha`
coverage, the Studentized-range constant, and the one-way normal common-
variance model. This is direct evidence from a later primary formal source.

It is not direct evidence of the wording, pagination, or publication history of
Tukey's unavailable 1953 manuscript. Any project statement must preserve that
distinction.

### 4.2 Unequal-size proposal lineage

Kramer (1956), printed pp. 307-310, directly establishes an unequal-
replication proposal for multiple-range procedures and illustrates it using
Duncan's procedure. The article does not prove a simultaneous guarantee and
does not frame the construction as a simultaneous confidence procedure.

This component is source-closed as a proposal and source-closed against the
overclaim that Kramer supplied the later general proof.

### 4.3 Unequal-size general guarantee

Hayter (1984), printed pp. 62-69, proves the theorem from which conservative
joint coverage for the Tukey-Kramer unequal-size pairwise procedure follows.
The stated model, theorem, and strictness qualification travel with this
finding. The theorem must not be backdated to Kramer (1956), Tukey (1953), or
Dunnett (1980).

This component is source-closed for the bounded family-identity question. It
does not supply numerical implementation evidence.

### 4.4 Simulation and alternative procedures

Dunnett (1980) is simulation and comparison evidence, not the general proof.
Spjøtvoll and Stoline (1973) define a structurally different extended
T-method, including an augmented-range exact result and an ordinary-range
approximation. These sources prevent the modern label from silently collapsing
distinct constructions and evidence roles.

### 4.5 Historical attribution residual

No inspected artifact is the 1953 manuscript or the 1994 archival printing.
The smallest remaining source requirement is therefore limited to:

1. the manuscript's own wording and printed-page identity;
2. the exact wording and location of the unequal-size conservativeness
   conjecture; and
3. fidelity of the 1994 archival printing to the manuscript.

This residual concerns historical attribution. It no longer blocks the current
mathematical construction and guarantee statements, which have inspected later
primary support. It remains open until an authenticated 1953 manuscript or
1994 archival printing is inspected.

## 5. Claim disposition matrix

| Claim group                                                           | Reconciled evidence status                                                                             | Candidate disposition                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Balanced all-pairs family, constants, model, and exact joint coverage | supported directly by a later primary formalization; original manuscript uninspected                   | `NARROW_AND_CLOSE` for the mathematical statement; historical attribution remains open |
| Kramer unequal-replication proposal and worked construction           | directly inspected original article                                                                    | `CLOSE`                                                                                |
| Claim that Kramer proved exact or conservative simultaneous control   | contradicted by the inspected source's absence of proof and its referee attribution                    | `CLOSE_AS_REJECTED_OVERCLAIM`                                                          |
| Hayter general conservative guarantee under the stated model          | directly inspected theorem and proof                                                                   | `CLOSE`                                                                                |
| Dunnett as proof source                                               | contradicted; the paper is simulation evidence and explicitly leaves analytical verification desirable | `CLOSE_AS_REJECTED_OVERCLAIM`                                                          |
| Spjøtvoll-Stoline as the Tukey-Kramer procedure                       | contradicted; the construction and multiplier differ                                                   | `CLOSE_AS_REJECTED_OVERCLAIM`                                                          |
| One modern eponym as a complete source and guarantee identity         | unsupported as a single identity; source and variant identity must remain explicit                     | `NARROW_AND_CLOSE`                                                                     |
| Tukey (1953) wording, pagination, and 1994-reprint fidelity           | no authenticated artifact inspected                                                                    | `KEEP_OPEN`, historical attribution only                                               |

The labels `CLOSE_AS_REJECTED_OVERCLAIM` are reconciliation descriptions, not
new Protocol vocabulary or registered disposition values.

## 6. Overall research-state disposition

Candidate research disposition: **`NARROW`.**

Candidate subclaim disposition: **`NARROW_AND_CLOSE`** for the mathematical
family identity, proposal lineage, general guarantee lineage, and inspected
variant separations.

Overall retained successor-source requirement: **`OPEN_NARROWED`**. The only
remaining component is the historical-attribution residual in Section 4.5.
`OPEN_NARROWED` is plain-language reconciliation state, not a new registered
Protocol status.

This combination is intentional: named subclaims can be narrowed and closed
while the smaller overall residual remains open. It does not close the FND-1
Research Gate. `FND1-H04` through `FND1-H08` remain open and untouched.

## 7. Repository repair assessment

No current normative or public-contract surface mentions the all-pairs family,
the Studentized range, HSD, or either successor eponym. Pass B found no live
misattribution and proved the accepted `FND1-H03` record unchanged. The old
1949 attribution occurs only in a superseded, explicitly bounded historical
intake and was already contradicted by the accepted primary-text closure.

Candidate repair disposition: **no repair required**. An optional explanatory
manifest clause would add bookkeeping but would not change the controlling
record; this reconciliation does not perform it.

## 8. Downstream boundary

If this candidate passes close-only review and receives steward disposition:

- later FND-1 work may rely on the inspected source separation for family-
  identity research;
- any historical claim specifically attributed to Tukey (1953) remains held;
- any future procedure selection still requires its own bounded design and
  numerical evidence;
- no method becomes supported, registered, or defaulted; and
- the full FND-1 Research Gate remains open.

## 9. Required next action

Run a close-only review of this reconciliation against the frozen inputs. The
review checks identity, scope, cross-pass logic, claim-to-disposition fidelity,
the open residual, and the absence of unauthorized adoption. It does not
re-perform the primary-source investigation or inspect Release 2 material.

Only after a `GO` close review may a steward record the bounded research-state
disposition. That disposition still cannot adopt a Protocol method or close the
FND-1 Research Gate.

## 10. Public-artifact and boundary self-check

- [x] The two passes are reconciled by evidence scope, not by vote.
- [x] Direct later-primary support is not presented as inspection of Tukey
      (1953).
- [x] Proposal, simulation, alternative extension, and proof are separate.
- [x] Mathematical-source closure is separate from numerical implementation.
- [x] The overall residual is explicitly open and limited to historical
      attribution.
- [x] No current public-surface repair is asserted as necessary.
- [x] No procedure, identifier, schema, default, implementation, API, check,
      or release change is selected.
- [x] Release 2, paired-t, and t-family numerical-contract work remain excluded.
- [x] Attribution is neutral and role-based; no drafting, investigation, or
      review software, service, provider, or mechanism is identified or implied.

READY FOR FND-1 ALL-PAIRS SUCCESSOR-SOURCE CLOSE REVIEW - NOT PROTOCOL ADOPTION
