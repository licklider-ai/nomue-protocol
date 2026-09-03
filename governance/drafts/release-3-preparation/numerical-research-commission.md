# Release 3 F-Distribution Numerical and Oracle Commission

**Status: informative research commission; non-normative; not adopted.** This
commission investigates whether the numerical work needed by a bounded Release 3
omnibus Contract can be made deterministic, independently checkable, and
resource-bounded. It selects no algorithm, tolerance, platform, support domain,
Public Check, or release outcome.

## Independence and posture

Assign this work to an investigator independent of the future Release 3 numerical
implementation. The investigator must inspect primary numerical literature,
standards, or authoritative upstream documentation directly and must attempt to
falsify the feasibility of the proposed verification contract.

Library agreement, a single reference implementation, and model memory are not
sufficient numerical authority. Software may be used as a probe only when its exact
version, operation, and evidentiary role are recorded.

## Fixed repository inputs

Read these public repository inputs before source work:

1. `CHARTER.md`;
2. `AUTHORITY.md`;
3. `governance/RFC.md`;
4. `governance/drafts/release-horizon-r3-r20.md`;
5. `governance/drafts/release-3-preparation/README.md`;
6. the Release 2 numerical README and final review-readiness result;
7. the Release 2 Student-t truth-error, projection, full-trace, resource, and
   supported-execution records needed to assess possible pattern reuse; and
8. the result of the Release 3 statistical semantics commission, if available.

Record exact commit, tree, and blob identities. Release 2 artifacts are precedent to
evaluate, not authority for an F-distribution procedure. Private repositories are
outside scope.

## Bounded question

Is there at least one feasible path for a Release 3 verifier to recompute the
selected nonnegative omnibus statistic and its upper-tail probability under an exact
input, operation-graph, projection, support, resource, and execution contract, with
independent mathematical-truth evidence and fail-closed refusal?

The statistical commission owns the meaning of the statistic and its degrees of
freedom. This commission owns only numerical feasibility and evidence requirements.

## Questions to answer

1. What mathematical F-distribution quantity is required for the candidate
   statistic, including upper-tail orientation and integer or non-integer numerator
   and denominator degrees of freedom?
2. Which exact identities connect that quantity to incomplete-beta or other special
   functions, and under what parameter and domain preconditions?
3. Which algorithms are credible candidates for stable direct upper-tail evaluation
   without catastrophic cancellation near zero or one?
4. Where can binary64 projection underflow, overflow, round to one, or cross a
   representational boundary? Identify refusal candidates separately from numerical
   error.
5. Can mathematical-truth enclosures or independently certified high-precision
   reference values be generated across a bounded domain? Specify the oracle,
   precision, convergence evidence, and independence requirements.
6. Which quantities require separate error ledgers: input algebra, omnibus
   statistic, degrees of freedom, special-function value, and binary64 projection?
7. Which operation graph, tables, constants, iteration ceilings, and resource
   ceilings would need to be versioned rather than inherited from a library?
8. Which boundary, metamorphic, and adversarial cases are required, including small
   and large degrees of freedom, highly unequal group sizes or variances, statistic
   near zero, far tail, subnormal projection, and first-failure ordering?
9. What can be reused from Release 2's trace, exact-rational, projection-margin,
   table-evidence, fail-closed, and controlled-execution patterns, and what cannot be
   reused because the mathematical function or degrees-of-freedom domain differs?
10. Which parts are likely reusable by a later factorial or interaction Contract?

## Required probes

Use at least two implementation-independent evidence routes where feasible. At a
minimum, probe:

- an arbitrary-precision mathematical route with stated convergence or enclosure
  evidence;
- a separately implemented or independently derived route for selected reference
  points;
- known transition neighborhoods for binary64 zero, subnormal, normal, and one;
- numerator and denominator degrees-of-freedom boundaries, including non-integer
  values if the semantic candidate permits them;
- monotonicity in the statistic and relevant parameter changes;
- coherent digest or trace tampering if an executable trace candidate is evaluated;
  and
- resource exhaustion and throwing or malformed inputs without exception leakage.

Do not infer a global bound from a finite corpus. Every proposed support bound must
follow from a proof, an exhaustively covered finite table, or an explicitly selected
and reviewed supported-execution predicate.

## Required report

Write an English report with:

1. exact repository and source identity;
2. directly established mathematical and numerical facts;
3. investigator inference;
4. candidate algorithms and alternatives without silent selection;
5. failure and refusal boundaries;
6. independent oracle and certificate strategy;
7. proposed evidence corpus and adversarial plan;
8. reusable Release 2 patterns and non-reusable assumptions;
9. reusable Release 4 foundation and limits;
10. unresolved blockers and reopen conditions; and
11. one disposition: `NUMERIC_PATH_READY`, `NARROW`, `DEFER`, or `NO_GO`.

`NUMERIC_PATH_READY` means only that at least one path appears suitable for later
candidate selection and independent review. It does not select that path, establish a
tolerance, register support, or authorize Release 3.

Every decision-bearing source claim must have a direct page, section, theorem,
equation, or authoritative documentation pinpoint. Record the exact versions and
hashes of executable probes and generated corpora.

## Stop conditions

Return `INPUT_INCOMPLETE` without a numerical disposition if required repository
inputs or primary sources cannot be identified or inspected. Return `DEFER` or
`NO_GO` when a reproducible truth reference, projection boundary, or resource-bounded
path cannot be defended.

Do not modify authoritative Protocol artifacts, tables, registries, reference
implementation code, or Release 2 evidence in this commission.
