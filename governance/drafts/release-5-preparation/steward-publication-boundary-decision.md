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
- exactly one selected Contract, Profile and interpretation bundle, referenced
  through their existing identity carriers;
- the selected Profile's admissibility result;
- selection timing and attribution evidence;
- revision and integrity binding;
- scoped consistency checks and reason codes; and
- explicit non-claims.

## Claims excluded from Release 5

A conforming Record or passing check does not establish that:

- the selected tuple was the only eligible tuple;
- the product's selection rule was correct, optimal, unbiased or preregistered;
- another Contract would have been inadmissible or scientifically inferior;
- the product used any particular private policy; or
- the Protocol independently reproduced the selection decision.

The Protocol verifies what was declared and selected, and whether the selected
Profile admits that declaration. It does not verify how the product decided what to
select.

## Strategic boundary

This decision keeps the interoperable Record and verification surface public while
retaining product-specific method recommendation, interaction design, operating
data and policy improvement as potential competitive assets. A later proposal may
standardize a policy language or proof mechanism only through a new Research Gate,
Charter review and public decision.

## Consequences for the current proposal

- Remove the proposed `selection-policy` identifier family, registry, ADR,
  `vocabulary.yaml` term and authority-manifest target.
- Replace policy-result uniqueness with exact selected-tuple identity binding.
- Remove multiple-policy-match semantics and fixtures from the first slice.
- Keep the Design Declaration Envelope as a projection rather than a duplicate
  declaration store.
- Preserve timing evidence, admissibility dependency, historical compatibility and
  the separately accepted Contract requirement for every family.
