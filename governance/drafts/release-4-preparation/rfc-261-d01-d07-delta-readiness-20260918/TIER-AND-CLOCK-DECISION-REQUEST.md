# RFC 261 D01/D07 tier and clock decision request

Status: **HISTORICAL DECISION REQUEST — resolved for the amendment discussion**.

The RFC 261 amendment comment selected **STABLE-INTENT**, opened the separate
D01/D07 discussion window at `2026-09-18T01:50:49Z`, and fixed the earliest
decision time at `2026-10-18T01:50:49Z`. That selection governs only the posted
discussion scope. It is not formal Release 4 adoption, issuance, implementation,
or publication approval.

## Decision to be made

Before posting the RFC 261 amendment, an independent reviewer and then a steward
had to determine the highest tier affected by the exact D01/D07 delta in
[DELTA-MAP.md](DELTA-MAP.md). The posted amendment comment records that result,
the public input, the opening timestamp, and the earliest decision time.

The existing RFC 261 date (`2026-10-09T05:59:47Z`) applies only to the unchanged
opening input. It is neither automatically reset nor automatically extended to this
later delta.

## Required findings

| Question         | Required finding                                                                                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope            | State whether D01 and D07 are material semantic additions to the opening proposal, with a citation to the fixed input and later policy record.                                                            |
| Existing meaning | State whether D01 changes any issued Contract, Profile, Public Check, schema, Bundle, or requirement meaning. State the same separately for D07.                                                          |
| CLI              | State whether any adopted D07 path changes NRS-VERIFY-0025's existing five-code meaning. A candidate's research exit mapping is not a public allocation.                                                  |
| Tier             | Identify the highest affected tier from `registries/stability-tiers.yaml`; do not infer a tier from a draft filename or an unissued candidate ID.                                                         |
| Clock            | State the minimum window implied by that tier: EXPERIMENTAL 7 days, STABLE-INTENT 30 days, or CORE 60 days. If an existing CORE meaning changes, require a version transition and named-steward approval. |
| Public text      | Confirm that an amendment would expose the exact decision, affected surfaces, compatibility treatment, and non-claims before the clock starts.                                                            |

## Permitted outcomes

1. **Separate STABLE-INTENT amendment.** The reviewer finds additive Release 4
   representation/check semantics, no change to existing CORE meaning, and a
   public-surface impact whose highest tier is STABLE-INTENT. The amendment opens a
   fresh minimum 30-day window for D01/D07.
2. **CORE amendment.** The reviewer finds that the adopted delta changes CORE
   verification or interoperability meaning. The amendment is revised to identify
   the change, opens a fresh minimum 60-day window, and requires named-steward
   approval before implementation.
3. **Narrow the Release 4 decision.** The steward removes the public CLI or other
   affected portion from this Release 4 adoption decision. Any remaining delta must
   still receive a tier finding before it is posted.
4. **Defer.** The evidence or public-interface decision is not yet sufficiently
   bounded. No amendment is posted and no implementation is promoted.

No outcome permits silently altering NRS-VERIFY-0025, presenting a research exit
code as a public contract, or relying on the old clock without an explicit scope
finding.
