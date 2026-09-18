# Release 4 decision ledger

Status: **Informative decision-preparation ledger; every formal disposition is pending**.

## Candidate decisions already closed as inputs

T03 selected D01-D07 for the unissued candidate. T04-T14 closed the bounded
scientific, numerical, execution, schema, report, lifecycle, regression, and
freeze work summarized by the A1 packet. These are not choices to repeat inside
this packet. They are fixed inputs to the formal decisions below.

The later RFC amendment covers D01 and D07 because those material public-interface
semantics were not in the original RFC 261 opening input. Its clock controls a
unified decision containing those semantics.

## Formal decisions

| Decision | Question for the steward                                                                                                                                                                                         | Current state                          | Required disposition evidence                                                                                                                                                                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R4-FD1   | Has RFC 261, including the separate D01/D07 amendment, completed the applicable public-discussion requirements without an unresolved material objection?                                                         | OPEN; time-gated                       | Both fixed inputs, the body-declared and platform-recorded amendment timestamps, feedback disposition, tier finding, and an explicit decision at or after the controlling `2026-10-18T01:51:08Z` |
| R4-FD2   | Is the balanced replicated 2-by-2 fixed-factor normal-inference slice, with its stated prerequisites and non-claims, the complete scientific scope for Release 4?                                                | Candidate reviewed; not adopted        | T05 source/review sufficiency, T06 clauses, A1 scope judgment, and explicit exclusions                                                                                                           |
| R4-FD3   | Are D01-D07, the fixed all-22 procedure, J-cost/Z-B domain, numerical aggregation, refusal ordering, and controlled-execution boundary selected as the Release 4 numerical and execution contract?               | Candidate reviewed; not adopted        | T03/T04 decisions, T08-T14 evidence, final domain/platform statement, and exact disposition of reference-only versus Public-supported claims                                                     |
| R4-FD4   | Are the candidate Requirement meanings, HTTPS identifiers, successor schemas, ordered checks, reason/report semantics, and exact Bundle bindings selected for one coupled authoritative landing?                 | Candidate reviewed; not issued         | T06-T09 inventories, collision/versioning review, schema/report closure, public-surface impact, and a no-alias migration plan                                                                    |
| R4-FD5   | Is D07 adopted with its three detailed-report outcomes while NRS-VERIFY-0025 and its five CLI meanings remain unchanged, and how is an indeterminate-without-fail completed report kept outside code `0`?        | Amendment discussion open; not adopted | Fixed amendment input, feedback disposition, report-schema mapping, reason ownership, and one explicit permitted CLI disposition below                                                           |
| R4-FD6   | Does the selected slice constitute the entire Release 4 adoption target, with implementation, conformance, compatibility, support activation, and publication remaining gated by the authoritative landing plan? | Pending                                | Complete decision list, closed packet-review findings, source/public boundary review, implementation plan, Release 1 preservation plan, and explicit deferrals                                   |

## Decision rules

1. FD2 through FD5 form one semantic selection. A partial landing must not leave a
   public schema, Check, Requirement, reason, or Bundle without its owners and
   exact dispatch binding.
2. FD3 must state the Public-supported domain separately from finite reference and
   observed execution sets. Candidate timing or memory observations do not create
   a portable runtime guarantee.
3. FD4 may authorize preparation of an authoritative change set; it does not issue
   candidate `draft.1` identifiers by description alone.
4. FD5 preserves NRS-VERIFY-0025. It must select one of two dispositions: either
   the Release 4 supported procedure is constrained so every completed mandatory
   outcome is terminal and an indeterminate-only completed report is not a
   supported state, or that report state is deferred to a separately versioned
   successor proposal with its own impact assessment, tier finding, and public
   window outside this Release 4 decision. Exit code `0` is unavailable because it
   means that every outcome passed. The current reference implementation's
   `anyFail ? 2 : 0` aggregation is not permission or compatibility precedent.
5. FD6 cannot claim Release 4 support until the selected implementation, schemas,
   checks, conformance fixtures, dispatch, and compatibility evidence are reviewed
   together at an exact target.
6. Any material expansion or semantic change from either RFC input restarts the
   applicable impact and discussion process.

## Permitted outcomes

| Outcome                    | Consequence                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Accept FD1-FD6             | Authorize preparation and review of the coupled authoritative landing; support and publication remain separate gates |
| Accept a narrower slice    | Revise the ledger and landing outline, identify removed surfaces, and reassess RFC impact                            |
| Defer any coupled decision | Keep every Release 4 candidate artifact unissued and unsupported                                                     |
| Reject the proposal        | Preserve the research and review record without changing existing Protocol meaning                                   |

No outcome is performed by this ledger.
