# Draft RFC: Continuous Feedback and Bounded Public Review

**Status: Informative RFC draft being prepared for public review.** This file
does not change `governance/RFC.md`, the stability-tier registry, or any current
discussion window. The public discussion issue and exact review timestamps will
be recorded before this draft is merged.

## Summary

The RFC process should distinguish continuous public feedback from the bounded
review window that precedes an authoritative decision. Development of a candidate
implementation should be allowed during review; only authoritative landing and
the issuance of permanent Protocol meaning should wait for the decision.

The minimum review windows should change prospectively from 7/30/60 calendar days
to 7/14/30 calendar days for EXPERIMENTAL, STABLE-INTENT, and CORE material.

## Motivation

The current process leaves three points unclear or unnecessarily costly:

1. `Implementation` can be read as either developing candidate code or landing an
   authoritative change set.
2. A finite discussion window can be mistaken for the only time feedback is
   accepted.
3. The 30-day and 60-day minima have no recorded repository rationale and are long
   relative to the project's current development cadence and external participation.

A public window guarantees an opportunity to comment. It does not guarantee that
any external reviewer will participate, and silence is not evidence of consensus.

## Proposed process

### Continuous feedback

Issues, pull requests, and comments remain welcome before, during, and after an RFC
review window. Feedback received after a decision may produce an erratum, a new
proposal, or a successor RFC; it does not retroactively erase a recorded decision.

### Draft and candidate development

A proposal enters public draft development once its motivation, semantic scope,
affected authority surfaces, expected stability tiers, compatibility impact, and
research-gate disposition are concrete enough for meaningful review.

After any applicable Research Gate has been satisfied, candidate specifications,
schemas, fixtures, independent oracle artifacts, and reference implementation code
may be developed in public branches and draft pull requests while the review window
is running. Candidate identifiers may be tested only when clearly marked unissued.

This work does not issue a Requirement ID or Protocol identifier, register support,
or establish Protocol meaning. Those effects occur only when an accepted,
authoritative change set lands.

### Bounded public review

The review record identifies:

- the proposal revision and discussion location;
- the highest affected stability tier;
- the opening timestamp and earliest decision timestamp;
- material revisions made during review; and
- the final disposition of every decision-bearing objection.

There is no participation quorum. Zero external comments do not block a decision;
the decision record states that no external comments were received rather than
claiming community consensus.

Editorial clarifications, implementation progress, and added evidence that preserve
the reviewed semantic scope do not restart the clock. A material expansion or
meaning change restarts the window from the revised proposal. A steward may extend
any window when unresolved objections or the likely impact justify more time.

### Decision and landing

At or after the earliest decision timestamp, the steward records acceptance,
revision, deferral, or rejection with rationale. CORE changes retain the existing
named-steward approval rule.

Only after acceptance may the authoritative change land. Specification,
registries, schemas, conformance artifacts, reference support, and generated views
remain coupled as required by `AUTHORITY.md`.

## Proposed minimum windows

| Stability tier | Current minimum | Proposed minimum |
| -------------- | --------------- | ---------------- |
| EXPERIMENTAL   | 7 days          | 7 days           |
| STABLE-INTENT  | 30 days         | 14 days          |
| CORE           | 60 days         | 30 days           |

Fourteen days provides two full calendar weeks for STABLE-INTENT review. The IETF
standards process uses a two-week minimum Last Call for its ordinary working-group
path, while the Rust RFC process uses a ten-calendar-day final comment period. These
are comparisons, not authority for nomue; the selected values remain a project
governance decision.

- IETF RFC 2026: <https://datatracker.ietf.org/doc/rfc2026/>
- Rust RFC process: <https://github.com/rust-lang/rfcs>

The shorter minima match the project's Public Draft maturity and current absence of
external implementers. They may be reconsidered before a future Stable release or
when a real multi-implementer ecosystem exists. A minimum is never a deadline that
forces acceptance.

## Proposed authoritative changes after acceptance

The eventual change set would:

1. revise `governance/RFC.md` to define continuous feedback, candidate development,
   review records, no-quorum handling, material-change restarts, decision, and
   authoritative landing;
2. change `registries/stability-tiers.yaml` to 7/14/30 days;
3. update validation tests and generated views affected by the registry change; and
4. replace the obsolete Phase 0 statement that no RFC has been exercised.

No authoritative file is changed by this draft.

## Transition and current Release 2 RFC

Because this proposal changes CORE governance behavior, it observes the currently
registered 60-day minimum. The proposed shorter windows do not take effect before a
recorded acceptance and authoritative landing.

The Release 2 paired-t RFC therefore retains its current STABLE-INTENT 30-day
window. Its candidate implementation may proceed in parallel, but it cannot rely on
the proposed 14-day rule retroactively.

## Decision requested

At or after the current 60-day minimum, the steward is asked to accept, revise,
defer, or reject the proposed process and 7/14/30-day windows. Lack of external
comments is recorded as such and is not treated as consensus.
