# Release 5 public-discussion readiness

Current state: **NOT_READY**. Public discussion is not open. Updated 2026-09-16.

## Proposed question

Should the Protocol define, for a bounded initial set of continuous-outcome
families, explicit versioned mappings from Profile-owned declarations to a common
cross-family evidence view, one successor-Record-owned selection-timing status, and
a scoped nine-item non-claim boundary?

## Reviewed decision direction

- Method-selection policy and recommendation logic remain Layer 2 product
  technology. Release 5 does not register, disclose or verify them.
- Existing conformance identifies one finalized selected tuple; R5 consumes those
  identities without creating a second binding rule or claiming unique eligibility.
- The common envelope is a deterministic projection of Profile-owned truth
  carriers through explicit versioned per-Profile mappings, not a second store.
- The cross-family check depends on Profile admissibility and does not re-adjudicate
  it.
- Existing Record tuple identities are referenced, not duplicated.
- Timing status is required and non-defaulted, uses access to observed outcome values
  as its reference event, and is repeated in check evidence. It remains an attributed
  declaration, not proof of preregistration or truth.
- No producer-side pre-Record negative workflow artifact enters the first slice.
- No opaque extra-Record provenance, attribution or attestation enters the first
  slice.
- Passed results expose the projection, source paths, mapping version, timing,
  consumed identities, admissibility dependency and non-claim boundary.
- Every family dependency is conditional, including an independent-two-group
  successor Contract.

## Readiness gates

| Gate                                  | Current state | Required closure evidence                                                                                                            |
| ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| R5-P1 bounded question and exclusions | OPEN          | Fresh-context close-only review confirms that the repaired question states the four genuine R5 additions and remains Protocol-scoped |
| R5-P2 Research Gate evidence          | PARTIAL       | Existing independent result plus full-text closure of `R5-RH-1` and methodological close-only review of the revised questions        |
| R5-P3 predecessor reconciliation      | OPEN          | Exact mapping to separately accepted Contracts, Profiles, declarations and bundles for all three families                            |
| R5-P4 decision semantics              | OPEN          | Fresh-context review confirms projection mapping ownership, timing input, nine non-claims and the inspectable report-evidence view   |
| R5-P5 authority and surface impact    | OPEN          | Exact clauses, Requirement-ID treatment, schemas, checks, bundles, reason codes, non-claims and migration analysis                   |
| R5-P6 historical preservation         | OPEN          | Reviewed plan followed by fixed tests proving no change to earlier bundle meaning, dispatch, reports or pinned conformance results   |
| R5-P7 tier and window                 | PROVISIONAL   | Complete impact assessment; STABLE-INTENT/30 days if additive, CORE/60 days if existing CORE meaning must change                     |
| R5-P8 independent opening review      | OPEN          | Fixed-input fresh-context review with findings repaired or explicitly held, followed by steward opening authorization                |

`PREPARED` means a reviewed draft contains a concrete direction. Author-side repair
does not itself move an `OPEN` gate to `PREPARED`.

## Existing reusable foundation

- exact registered bundle dispatch with no fallback;
- bundle-independent routing-envelope validation;
- immutable Record revisions and canonical integrity binding;
- separate verification reports with exact Record, bundle and check references;
- scoped checks with no overall `VERIFIED` status; and
- historical bundle and conformance preservation requirements.

Reuse of these foundations does not prove that the product selected the best method.
Release 5 needs its own research closure, authority inventory and preservation
evidence for the narrower cross-family evidence claim.

## Holds allowed during a future public window

The named full-text source hold may remain visible during public discussion so that
the public can inspect the unresolved evidence boundary. It must close before design
freeze and any adoption decision.

Procedure-specific numerical algorithms, supported execution predicates, resource
bounds, tolerances and independent numerical oracles may also remain held if the
opening proposal names them and issues no operational check or bundle. Exact
per-Profile mapping tables and report-schema encoding may remain explicit holds
during discussion but must close before design freeze. Projection meaning, timing
ownership, non-claims and separation from Layer 2 may not remain implicit because
they are the subject of the public question.

## Opening sequence

1. Complete the exact authority, schema, check, bundle, reason-code, non-claim and
   migration inventory for R5-P5.
2. Record how full-text access and methodological close-only review will close
   `R5-RH-1` before design freeze.
3. Freeze the revised opening candidate and evidence map at immutable file and
   commit identities.
4. Commission R5-P8 as a fixed-input fresh-context review.
5. Repair material findings, reassess the highest stability tier and obtain explicit
   steward authorization for that exact candidate.
6. Create the public issue, then record the actual opening UTC timestamp and earliest
   decision time. Do not predate the clock.

The end of a future minimum window would not automatically adopt the proposal.

## Independence disclosure

This readiness record is an author-side coordination artifact. It incorporates
independent findings and a steward scope decision but does not itself close a gate.
