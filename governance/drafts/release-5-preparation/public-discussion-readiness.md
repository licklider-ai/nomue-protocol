# Release 5 public-discussion readiness

Current state: **NOT_READY**. Public discussion is not open. Updated 2026-09-16.

## Proposed question

Should the Protocol add an independently checkable, versioned representation of the
finalized analytical decision connecting explicit design declarations to one exact
Analysis Contract, Profile and interpretation bundle for a bounded initial set of
continuous-outcome families?

## Readiness gates

| Gate                                  | Current state | Required closure evidence                                                                                                                                  |
| ------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R5-P1 bounded question and exclusions | PREPARED      | Independent review confirms that the question is Protocol-scoped and does not standardize Layer 2 routing                                                  |
| R5-P2 Research Gate evidence          | OPEN          | Primary-source report and independent methodological review from `research-commission.md`                                                                  |
| R5-P3 predecessor reconciliation      | OPEN          | Exact mapping to the accepted Release 1, Release 2 and Release 3 Contracts, Profiles, declarations and bundles; unresolved predecessors remain conditional |
| R5-P4 decision semantics              | OPEN          | Reviewed successful-selection meaning, negative-artifact exclusion and distinction from conformance, computability and numerical verification              |
| R5-P5 authority and surface impact    | OPEN          | Exact proposed clauses, existing/new Requirement-ID treatment, schemas, public surfaces, bundle/check/reason-code impact and migration analysis            |
| R5-P6 historical preservation         | PREPARED      | Fixed tests or reviewed plan proving no change to earlier bundle meaning, exact dispatch or pinned conformance results                                     |
| R5-P7 tier and window                 | PROVISIONAL   | Complete impact assessment; STABLE-INTENT/30 days unless a CORE change is identified                                                                       |
| R5-P8 independent opening review      | OPEN          | Fixed-input review with findings repaired or explicitly held, followed by steward opening authorization                                                    |

## Existing reusable foundation

- exact registered bundle dispatch with no fallback;
- bundle-independent routing-envelope validation;
- immutable Record revisions and canonical integrity binding;
- separate verification reports with exact Record, bundle and check references;
- scoped checks with no overall `VERIFIED` status; and
- historical bundle and conformance preservation requirements.

Reuse of these foundations does not prove that the proposed analysis-selection
semantics are correct. Release 5 needs its own Research Gate and additive impact
review.

## Explicit holds allowed during a future public window

Procedure-specific numerical algorithms, supported execution predicates, resource
bounds, tolerances and independent numerical oracles may remain held if the opening
proposal names them and issues no operational check or bundle. The selection meaning
itself, its declaration boundary and its separation from Layer 2 may not remain
implicit because those are the subject of the public question.

## Opening sequence

1. Complete R5-P2 through R5-P5.
2. Freeze the exact opening candidate and evidence map.
3. Commission R5-P8 against immutable file and commit identities.
4. Repair material findings and reassess the highest tier.
5. Obtain explicit steward authorization for that exact candidate.
6. Create the public issue, then record the actual opening UTC timestamp and earliest
   decision time. Do not predate the clock.

The end of a future minimum window would not automatically adopt the proposal.

## Independence disclosure

This readiness record is an author-side coordination artifact. `PREPARED` means the
draft contains the named material; it is not independent clearance or steward
closure.
