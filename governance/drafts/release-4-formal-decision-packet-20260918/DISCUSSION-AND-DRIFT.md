# Release 4 discussion and drift record

Status: **Decision-input chronology and drift assessment; not an RFC disposition**.

## Public clocks

| Scope                     | Fixed input                                                                                                  | Opening                                                                          | Minimum window         | Earliest decision                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ---------------------- | ---------------------------------- |
| Original RFC 261 proposal | Commit `21453d82109106e9e811571383228dcef8f60fac`, candidate blob `807e4bf0c22e5270b8fc15824329d04b5c37b146` | `2026-09-09T05:59:47Z`                                                           | 30 days                | `2026-10-09T05:59:47Z`             |
| Later D01/D07 amendment   | Package at `5996da5a7869f2b21ae8f73407c434285c9862bb`                                                        | Body-declared `2026-09-18T01:50:49Z`; GitHub `created_at` `2026-09-18T01:51:08Z` | 30 days, STABLE-INTENT | `2026-10-18T01:51:08Z` controlling |

The original clock applies only to its unchanged input. This packet chooses a
single coupled Release 4 decision, so the later amendment clock controls. The
comment body declared `2026-09-18T01:50:49Z`, while the platform recorded its
creation 19 seconds later at `2026-09-18T01:51:08Z`. Consistent with the original
RFC clock's platform timestamp, the later platform time controls conservatively.
Neither date is an automatic adoption date.

## Amendment boundary

The amendment presents D01 strict binary64 projection/value equality and D07
sound candidate-set comparison. It expressly excludes a new CLI exit-code meaning.
NRS-VERIFY-0025 remains unchanged; detailed report evidence distinguishes pass,
proved mismatch, and completed indeterminate.

The integrated maintenance copy may correct navigation, replace a placeholder,
and record the posted clock. It does not replace the reviewable discussion input
at `5996da5a7869f2b21ae8f73407c434285c9862bb`.

As checked on 2026-09-18, RFC #261 has one public comment: the
[amendment-opening record](https://github.com/licklider-ai/nomue-protocol/issues/261#issuecomment-5723844738)
itself. No separate substantive feedback had yet been posted. This is a dated
snapshot, not a conclusion about feedback at the eventual decision time.

## Post-A1 drift

From the A1 integration commit
`554818683d037d378ef3c11f1758b848adca1ec3` through the M0 tree used to
prepare this packet:

- no T03-T14 candidate artifact or A1 packet file changed;
- the RFC 261 D01/D07 discussion package and Release 4 navigation were added;
- PR #351 at `0536b66f6b76721134d12296d7422034c71aebcc` changed the shared
  Release 1 reference Student-t kernel at df=1 and advanced
  `reference/SOURCE-PIN.json`; and
- no authoritative Release 4 Requirement, identifier, schema, Check, reason,
  Bundle, or support registration was added.

The df=1 reference fix does not alter the frozen Release 4 candidate artifacts.
The eventual authoritative landing must nevertheless run Release 1 and shared
reference-consumer compatibility checks against its actual post-#351 base and
record the exact source pin.

## Feedback disposition rule

Before FD1 may close, the steward record must enumerate every substantive RFC 261
comment received through the decision time and disposition it as accepted,
rejected with reasons, already addressed, or requiring a revised input/window.
This packet records no claim that future feedback is absent.
