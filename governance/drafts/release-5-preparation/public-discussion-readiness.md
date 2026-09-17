# Release 5 public-discussion readiness

Current state: **AWAITING_OPENING_AUTHORIZATION**. Public discussion is not open.
Updated 2026-09-17.

## Proposed question

Should the Protocol define, for a bounded initial set of continuous-outcome
families, explicit versioned mappings from Profile-owned declarations to a common
cross-family evidence view, one successor-Record-owned selection-timing status, and
a scoped eleven-item non-claim boundary?

## Reviewed decision direction

- Method-selection policy and recommendation logic remain Layer 2 product
  technology. Release 5 does not register, disclose or verify them.
- Issued conformance supplies bundle and Profile identities. Contract carriers
  depend on each family's separately accepted successor schema; none is issued
  for the two-group family. R5-P3 retains this dependency.
- The common envelope is a deterministic projection of Profile-owned truth
  carriers through explicit versioned per-Profile mappings, not a second store.
- The cross-family check depends on Profile admissibility and does not re-adjudicate
  it.
- Accepted family identity carriers are referenced, not duplicated. Design-fact
  carriers remain in the owning Profile's versioned declaration surface; the R5
  Record addition owns timing and references the composed family identity carriers;
  it stores no identity values of its own.
- Timing covers finalization of the Contract, Profile and bundle identities and all
  projected design-fact declarations. Any later change after access to any observed
  outcome value in the supplied dataset excludes `pre_outcome`, including values
  outside a later analysis subset. It remains a producer declaration, not proof of
  preregistration, timing truth or declarant identity.
- No producer-side pre-Record negative workflow artifact enters the first slice.
- No opaque extra-Record provenance, attribution or attestation enters the first
  slice.
- Passed results expose the projection, source paths, mapping version, timing,
  consumed identities, admissibility dependency and non-claim boundary.
- Every family dependency is conditional, including an independent-two-group
  successor Contract.

## Readiness gates

| Gate                                  | Current state | Required closure evidence                                                                                                                  |
| ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| R5-P1 bounded question and exclusions | PREPARED      | Retained fresh-context review and PROCEED diff confirmation establish the bounded question; opening authorization remains pending          |
| R5-P2 Research Gate evidence          | PARTIAL       | Full-text closure of `R5-RH-1` and a methodological addendum; Q11 to Q14 remain unanswered, and the repaired timing scope needs assessment |
| R5-P3 predecessor reconciliation      | OPEN          | Exact mapping to separately accepted Contracts, Profiles, declarations and bundles for all three families                                  |
| R5-P4 decision semantics              | PREPARED      | PROCEED diff confirmation retained; the prescribed S-2a sentence is applied at opening-candidate freeze                                    |
| R5-P5 authority and surface impact    | OPEN          | Exact clauses, Requirement-ID treatment, schemas, checks, bundles, reason codes, non-claims and migration analysis                         |
| R5-P6 historical preservation         | OPEN          | Reviewed plan followed by fixed tests proving no change to earlier bundle meaning, dispatch, reports or pinned conformance results         |
| R5-P7 tier and window                 | PROVISIONAL   | Complete impact assessment; STABLE-INTENT/30 days if additive, CORE/60 days if existing CORE meaning must change                           |
| R5-P8 independent opening review      | OPEN          | Reviewer-side work complete; only steward authorization of the fixed opening candidate remains                                             |

`PREPARED` means reviewed preparation is complete for opening; it is neither
adoption nor an opening authorization. P1 and P4 now record the recommendation of
[the retained PROCEED confirmation](opening-fresh-context-diff-confirmation.md),
after applying its prescribed S-2a sentence. This is coordination under the delegated
preparation scope, not a new independent review or an approval on the steward's
behalf. The reviewer expressly requires no additional review of that sentence;
the steward can inspect it in the fixed candidate before authorizing opening.

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

1. Present the fixed candidate and
   [opening authorization request](opening-authorization-request.md) to the steward,
   including the applied S-2a sentence and all named holds.
2. After explicit authorization, integrate the informative package and create the
   public RFC issue from the approved candidate, with the named holds visible.
3. Record the actual issue creation time in UTC, the applicable tier and minimum
   window, and the earliest decision time. Do not predate the clock.
4. During discussion, close the methodological addendum, predecessor acceptance,
   exact authority/surface inventory and fixture holds before design freeze or
   adoption. Opening-candidate freeze is not normative design freeze.

Reviewer-side work for the opening scope is complete. Reuse the retained review
and diff confirmation; reopen only scope affected by a new material change.

The end of a future minimum window would not automatically adopt the proposal.

## Independence disclosure

This readiness record is an author-side coordination artifact. It incorporates
independent findings and a steward scope decision but does not itself close a gate.
