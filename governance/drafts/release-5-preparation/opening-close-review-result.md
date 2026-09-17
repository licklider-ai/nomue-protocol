# Release 5 repaired-opening close-only review result

Status: informative review evidence. This report creates no Protocol meaning,
identifier, supported capability, public-opening authority or steward decision.

## Disposition

`REPAIR_AND_REREVIEW` (minor).

The two earlier blockers are resolved because the proposal now makes the selection
decision explicit. The chosen registered-policy direction differs from the earlier
reviewer's preferred identity-binding direction, but an exact preference mechanism
can keep the policy coherent when a family has more than one Contract. The proposal
therefore forms a reviewable public question after the repairs below.

## Fixed target

- proposal head: `0991e4e31aab159caa5cdb838cbff74eb7e4c412`;
- tree: `ca4abcb101a6d6be3bada12f3f4218d4e4cc4849`;
- pull-request base: `07b373655110afb34ab4bcc3933f83c69fba6f2c`;
- the two earlier independent reports remained byte-identical after their merge at
  `ac7b7c7da978935e70bb62227d3781e2a62efa47`; and
- the reviewed change set contained only ten governance-draft files and no
  authoritative Protocol asset.

## Findings

### S-1 — fix before disclosure: define the envelope's truth carrier

If the Design Declaration Envelope stores grouping, pairing, repeated or clustering
facts independently, it duplicates facts already owned by the ITGC 0.2
`declarations`, Release 2 candidate schema and Release 3 D0 surface. Choose one of
two models:

1. define the envelope as a projection over Profile-owned fields, preserving one
   truth carrier; or
2. if the envelope stores copies, require R5-aware successor schemas for all three
   families and state the larger dependency explicitly.

The reviewer recommends the projection model.

### S-2 — avoid duplicated judgment

The policy and Profile currently appear to judge the same independence and group
count facts. Compose each policy candidate predicate by reference to the applicable
Profile's cross-family conditions. Treat a disagreement as a policy-registration
validation failure, not as verifier-time precedence or a second admissibility
decision.

### S-3 — bound preference meaning

An abstract preference such as robustness to unequal variance would make the policy
own a new scientific mapping and would require a Research Gate for each preference.
In the first slice, limit a preference to an exact Contract identifier inside the
policy's closed candidate set.

### S-4 — define the timing event and expose it in evidence

Define what `pre_outcome` precedes: data collection, access to result values or
unblinding are different events. Because a `post_outcome` selection may still be a
successful structural selection, the check result must carry the timing value as
evidence so that a bare `passed` result cannot hide it.

### S-5 — decide the Charter publication boundary

A selector may be product technology under the Charter. Add a pre-opening steward
hold deciding whether registered Selection Policies enter the irrevocable,
royalty-free public Protocol surface.

### S-6 — complete the impact inventory

Add the new `selection-policy` identifier family's ADR adoption, terminology in
`vocabulary.yaml` and an authority-manifest target. Clarify that the selection check
depends on Profile admissibility and does not repeat that judgment.

### N-1 — construct a multiple-match fixture

The first slice may make multiple matches structurally impossible. The conformance
plan should therefore name how that negative path will be tested, such as a
test-only registered policy fixture.

### N-2 — name the Release 1 preservation checks

The historical-preservation plan should name `release-1-history.ts` and
`pnpm regression:phase1` explicitly.

## Gate assessment

| Gate  | Assessment                                                           |
| ----- | -------------------------------------------------------------------- |
| R5-P1 | `PREPARED`, subject to close-only confirmation after S-1             |
| R5-P2 | `PARTIAL`                                                            |
| R5-P3 | `OPEN`                                                               |
| R5-P4 | `PREPARED`, subject to close-only confirmation after S-1             |
| R5-P5 | `OPEN`                                                               |
| R5-P6 | `OPEN`                                                               |
| R5-P7 | `PROVISIONAL`; additive STABLE-INTENT and 30 days remain supportable |
| R5-P8 | `OPEN`                                                               |

A new registry target can be an additive authority-manifest entry and does not by
itself require changing a CORE clause.

## Independence and access disclosure

This was a same-session re-review, not a fresh-context independent close-only
review. Whether it can satisfy any part of R5-P8 is a steward decision; this report
does not claim that it does. Full-text external access remained unavailable, so a
separate investigator must close the R5-P2 research addendum.
