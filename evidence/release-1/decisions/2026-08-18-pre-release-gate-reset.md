# Steward Decision Record: Pre-Release Gate Reset (2026-08-18)

**Class: Evidence.** Authoritative only about what was decided and observed,
never about specification meaning.

## Context

On 2026-08-11 and 2026-08-13, multiple Release 1 gates were closed with steward
decisions recorded in
[2026-08-13-gate-close-review.md](2026-08-13-gate-close-review.md) and per-gate
close records under [evidence/release-1/gates/](../gates/).

After that evidence was produced, authoritative surfaces changed, including at
least:

- [CHARTER.md](../../../CHARTER.md)
- [AUTHORITY.md](../../../AUTHORITY.md)
- [authority/authority-manifest.yaml](../../../authority/authority-manifest.yaml)
- [registries/requirements.yaml](../../../registries/requirements.yaml)
- [spec/verification/relying-party-interface.md](../../../spec/verification/relying-party-interface.md)
- other authoritative surfaces on which prior close evidence depended

Under [governance/RELEASE-POLICY.md](../../../governance/RELEASE-POLICY.md) and
[AUTHORITY.md](../../../AUTHORITY.md), gate evidence is valid only against the
exact content-addressed snapshot from which it was produced. Subsequent
authoritative changes invalidate dependent gate evidence for the current
Release 1 candidate.

## Decision

Reset the current Release 1 active gate state to pre-candidate development.

Prior close records and evidence:

- are not deleted,
- are not rewritten,
- remain available as historical evidence,
- are not treated as current pass evidence.

Until a new Release Candidate is frozen and pinned:

```text
release_candidate_id = null
all Release 1 gates = open
all current decisions = null
```

Prior close decisions were valid only against their historical evidence
snapshots and are not current Release 1 decisions after subsequent
authoritative changes.

## Rationale

Avoid re-closing gates on every Protocol authority change during active
development. Release gate closure will follow this order only:

```text
Protocol development
↓
candidate freeze
↓
release_candidate_id pin
↓
evidence generation
↓
steward review
↓
gate close
```

## Historical anomalies (not resolved by this reset)

This reset does not silently erase the following historical issues; they remain
for later historical-evidence cleanup:

- R1-08 close-record absence relative to other closed gates
- historical `decided_at` timestamps that predate some close evidence
- R1-11 "conditional close" wording that conflicts with the no-conditional-pass
  policy (historical prose only; current state is open)
- some old gate evidence referencing `evidence/development/` paths
- mismatch between the old `release_candidate_id` and some gate-evidence
  baselines

## Resulting current gate state (14 gates)

| Gate  | Current state | Current decision |
| ----- | ------------- | ---------------- |
| R1-01 | open          | null             |
| R1-02 | open          | null             |
| R1-03 | open          | null             |
| R1-04 | open          | null             |
| R1-05 | open          | null             |
| R1-06 | open          | null             |
| R1-07 | open          | null             |
| R1-08 | open          | null             |
| R1-09 | open          | null             |
| R1-10 | open          | null             |
| R1-11 | open          | null             |
| R1-12 | open          | null             |
| R1-13 | open          | null             |
| R1-14 | open          | null             |

Historical close material remains under [evidence/release-1/gates/](../gates/)
and in [2026-08-13-gate-close-review.md](2026-08-13-gate-close-review.md).
