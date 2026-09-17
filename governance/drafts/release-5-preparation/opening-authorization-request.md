# Release 5 opening authorization request

Status: fixed opening-package request, not steward authorization. Public discussion
is not open. Prepared 2026-09-17 UTC.

## Exact decision requested

Authorize integration of the informative preparation package in Draft PR #342 and
opening a public RFC issue titled:

> Release 5 RFC: cross-family declared-design evidence

The substantive issue body is the
[opening RFC candidate](opening-rfc-candidate.md) at the approved commit, with the
named holds below kept visible. The opening record will link that immutable commit
and this request. Its operational header will record the actual issue creation time
in UTC, the applicable tier, minimum window and earliest decision time.

Approval authorizes discussion and reversible candidate preparation. It does not
adopt R5, issue identifiers, accept predecessor releases, register supported
bundles, freeze normative design, merge implementation or publish a release.

The exact commit, parent, tree and PR base are recorded in PR #342's fixed-target
section and the approval handoff. Approval applies only to that target; a material
change requires a new assessment of the affected scope.

## Review evidence and final wording

- Reviewed target: `232c63b99a6f2525c5e9f452802b22e88ea33a26`.
- Fresh-context review commit:
  `5bca708be2004b7306db4f95d065e7e2b8bdaec7`.
- Fresh-context review blob:
  `b1a71ff1b53ad6679ebea0bde96aaee27c219a99`.
- PROCEED confirmation commit:
  `8b0310f6ada9e947a1353f25a9195640e3c83e12`.
- Confirmation blob:
  `dcc021730c455437bbe40601098bcf71572d7ad5`.

Both review records are preserved byte-for-byte. The confirmation is a continuation
by the same independent reviewer, not a second independent review.

The confirmation allowed S-2a to be repaired at opening-candidate freeze without
another reviewer pass. The candidate now says:

> The R5 addition stores no identity value: the successor Record schema composes the
> applicable family schema's existing identity carriers, which remain the sole
> carriers.

The coordinator applied that sentence and checked consistency with the ownership
inventory and readiness record. The steward can inspect it as part of this opening
decision. N-7 is repaired by saying the horizon reuses existing bundle and Profile
conformance. N-8 is repaired by stating that timing has already been obtained and
schema-validated at successful conformance, so later errors do not remove it.

## Named holds retained during discussion

| Hold            | Work still required                                                                                                                                  | Deadline                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| R5-P2 / R5-RH-1 | Independent full-text source confirmation, answers to commission Q11 to Q14, and methodological assessment of the supplied-dataset timing convention | Before normative design freeze or adoption                                                            |
| R5-P3           | Separately accepted Contract, Profile, declaration schema and bundle for every participating family, including the unissued two-group successor      | Before normative design freeze or adoption                                                            |
| R5-P5           | Exact clauses, mapping tables, schemas, Public Check, reason codes, bundle combinations, report encoding and migration inventory                     | Before normative design freeze or adoption                                                            |
| R5-P6           | Exact fixture inventory and implementation evidence proving historical preservation                                                                  | Inventory before normative design freeze; completed evidence before adoption                          |
| R5-P7           | Confirm highest affected tier against the complete impact inventory                                                                                  | Before adopting the final change set; adjust the discussion window if higher-tier meaning is affected |

No source-access hold is treated as resolved by this text or by passing CI.
No family is treated as supported before its owning successor is accepted.

## Tier and clock proposal

The reviewed additive scope supports STABLE-INTENT and a minimum 30-day public
discussion. No clock is running. If the final change set requires editing existing
CORE meaning, reassess under the CORE process and its 60-day minimum before
decision; do not rely on the initial 30-day window to authorize a higher-tier change.
Elapsed time alone never adopts a proposal or closes a hold.

## Prepared state and next action

R5-P1 and R5-P4 are PREPARED on the retained review and applied wording.
R5-P8 remains OPEN solely for steward opening authorization. R5-P2 is PARTIAL;
R5-P3/P5/P6 are OPEN and R5-P7 is PROVISIONAL.

On authorization of the fixed target, integrate the informative package, open the
issue with the named holds and record the actual UTC clock. Until then, retain
Draft PR #342 and the fixed candidate without opening a discussion clock.
