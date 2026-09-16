# Release 5 steward publication-boundary decision

Status: steward direction for the Release 5 opening proposal. This record fixes the
proposal boundary but does not open public discussion, issue a Protocol identifier
or adopt normative text.

Date: 2026-09-16.

## Decision

Method-selection policy remains Layer 2 product technology. Release 5 does not place
a Selection Policy, recommendation algorithm, question sequence, preference model
or policy registry on the public royalty-free Protocol surface.

The public Release 5 proposal may standardize only the portable evidence produced
after selection:

- the Profile-owned design declarations and their defined common projection;
- explicit, versioned projection mappings for each participating Profile version;
- the existing selected Contract, Profile and interpretation-bundle identities,
  consumed without creating a second tuple-binding rule;
- the selected Profile's admissibility result;
- selection-timing evidence;
- revision and integrity binding;
- a common inspectable report view, scoped consistency checks and reason codes; and
- explicit non-claims.

## Claims excluded from Release 5

A conforming Record or passing check does not establish uniqueness, optimality,
fairness or absence of bias, preregistration, declaration truth, assumption truth,
numerical correctness, whole-project validity or use of any particular private
policy.

The Protocol verifies what was declared and selected, and whether the selected
Profile admits that declaration. It does not verify how the product decided what to
select.

## Strategic boundary

This decision keeps the interoperable Record and verification surface public while
retaining product-specific method recommendation, interaction design, operating
data and policy improvement as potential competitive assets. A later proposal may
standardize a policy language or proof mechanism only through a new Research Gate,
Charter review and public decision.

In the first slice, the candidate families are disjoint by declared structure and
the two-group and paired families have one candidate Contract each. The competitive
value of private selection rules becomes operative when a family has multiple
Contracts; this proposal does not imply a hidden first-slice selection mechanism.

## Consequences for the current proposal

- Remove the proposed `selection-policy` identifier family, registry, ADR,
  `vocabulary.yaml` term and authority-manifest target.
- Consume existing selected-tuple identities rather than adding a second binding
  rule.
- Remove multiple-policy-match semantics and fixtures from the first slice.
- Keep the Design Declaration Envelope as a projection rather than a duplicate
  declaration store.
- Preserve timing evidence, admissibility dependency, historical compatibility and
  the separately accepted Contract requirement for every family.
- Exclude opaque extra-Record provenance, attribution, attestation and approver
  identity from the first slice.
- Require versioned per-Profile mapping tables and an inspectable common report
  evidence view.
