# Release 5 public-discussion readiness

Current state: **NOT_READY**. Public discussion is not open. Updated 2026-09-16.

## Proposed question

Should the Protocol add a common Design Declaration Envelope and an independently
checkable, versioned Selection Policy that maps explicit declarations to exactly one
Analysis Contract, Profile and interpretation bundle for a bounded initial set of
continuous-outcome families?

## Reviewed decision direction

- Selection Policy is explicit Layer 1 Protocol policy, not product routing.
- Zero or multiple policy matches are not successful selections; there is no hidden
  priority or fallback.
- The common envelope owns cross-family structural facts; Profiles own
  family-specific declarations and admissibility.
- Existing Record tuple identities are referenced, not duplicated.
- Timing status is required and non-defaulted but is an attributed declaration, not
  proof of preregistration or truth.
- No producer-side pre-Record negative workflow artifact enters the first slice.
- Every family dependency is conditional, including an independent-two-group
  successor Contract.

## Readiness gates

| Gate                                  | Current state | Required closure evidence                                                                                                             |
| ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| R5-P1 bounded question and exclusions | PREPARED      | Close-only review confirms that the repaired question remains Protocol-scoped and does not standardize Layer 2 routing                |
| R5-P2 Research Gate evidence          | PARTIAL       | Existing independent result plus full-text closure of `R5-RH-1` and methodological close-only review of the repaired questions        |
| R5-P3 predecessor reconciliation      | OPEN          | Exact mapping to separately accepted Contracts, Profiles, declarations and bundles for all three families                             |
| R5-P4 decision semantics              | PREPARED      | Close-only review confirms the now-explicit policy, declaration ownership, exact-one result and timing semantics                      |
| R5-P5 authority and surface impact    | OPEN          | Exact proposed clauses, Requirement-ID treatment, schema fields, registry paths, checks, bundles, reason codes and migration analysis |
| R5-P6 historical preservation         | OPEN          | Reviewed plan followed by fixed tests proving no change to earlier bundle meaning, dispatch, reports or pinned conformance results    |
| R5-P7 tier and window                 | PROVISIONAL   | Complete impact assessment; STABLE-INTENT/30 days if additive, CORE/60 days if existing CORE meaning must change                      |
| R5-P8 independent opening review      | OPEN          | Fixed-input close-only review with findings repaired or explicitly held, followed by steward opening authorization                    |

`PREPARED` means the repaired draft contains a concrete direction. It is not
independent clearance or steward closure.

## Existing reusable foundation

- exact registered bundle dispatch with no fallback;
- bundle-independent routing-envelope validation;
- immutable Record revisions and canonical integrity binding;
- separate verification reports with exact Record, bundle and check references;
- scoped checks with no overall `VERIFIED` status; and
- historical bundle and conformance preservation requirements.

Reuse of these foundations does not prove that the proposed Selection Policy is
scientifically or procedurally sufficient. Release 5 needs its own research closure,
authority inventory and preservation evidence.

## Holds allowed during a future public window

The named full-text source hold may remain visible during public discussion so that
the public can inspect the unresolved evidence boundary. It must close before design
freeze and any adoption decision.

Procedure-specific numerical algorithms, supported execution predicates, resource
bounds, tolerances and independent numerical oracles may also remain held if the
opening proposal names them and issues no operational check or bundle. The policy
meaning, declaration ownership, exact-one result and separation from Layer 2 may not
remain implicit because they are the subject of the public question.

## Opening sequence

1. Complete the exact authority, schema, registry, check, bundle, reason-code and
   migration inventory for R5-P5.
2. Record how full-text access and methodological close-only review will close
   `R5-RH-1` before design freeze.
3. Freeze the repaired opening candidate and evidence map at immutable file and
   commit identities.
4. Commission R5-P8 as a fixed-input close-only review.
5. Repair material findings, reassess the highest stability tier and obtain explicit
   steward authorization for that exact candidate.
6. Create the public issue, then record the actual opening UTC timestamp and earliest
   decision time. Do not predate the clock.

The end of a future minimum window would not automatically adopt the proposal.

## Independence disclosure

This readiness record is an author-side coordination artifact. It incorporates
independent findings but does not itself close a gate.
