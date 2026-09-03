# Release 3 Multiplicity Numerical and Oracle Commission

**Status: informative research commission; non-normative; not adopted.** This
commission investigates whether the numerical work needed by the Release 3
independent multi-group inference program can be made deterministic, independently
checkable, and resource-bounded. It covers omnibus, contrast, post-hoc,
simultaneous-interval, and multiplicity procedures but selects no algorithm,
tolerance, platform, support domain, Public Check, or release outcome.

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
8. the independently reviewed catalogue result of the Release 3 statistical
   semantics commission.

Record exact commit, tree, and blob identities. Release 2 artifacts are precedent to
evaluate, not authority for any Release 3 numerical procedure. Private repositories
are outside scope.

If the reviewed semantic catalogue is unavailable, preliminary probes may be
recorded but the commission returns `INPUT_INCOMPLETE` for its program disposition.

## Bounded question

Which numerical procedure families needed by the comprehensive Release 3 catalogue
have at least one feasible verifier path under exact input, operation-graph,
projection, support, resource, and execution contracts, with independent
mathematical-truth evidence and fail-closed refusal?

The statistical commission owns hypothesis, member-set, error-criterion, and output
meaning. This commission owns only numerical feasibility, deterministic adjustment
semantics, and evidence requirements. A feasible route for one procedure must not be
generalized to another distribution or multiplicity family.

## Questions to answer

1. Which mathematical quantities are required across the catalogue: F and t tails,
   Studentized-range critical values, multivariate t or normal probabilities,
   contrast covariance, simultaneous interval endpoints, and deterministic
   adjusted-p-value transforms?
2. Which exact identities connect those quantities to incomplete beta, multivariate
   integrals, range distributions, or other special functions, and under what
   parameter and domain preconditions?
3. Which algorithms are credible candidates for stable direct tail or probability
   evaluation without catastrophic cancellation near zero or one? Separate exact,
   bounded, deterministic approximate, tabulated, and stochastic routes.
4. For Bonferroni, Sidak, Holm, Holm-Sidak, Hochberg, Hommel,
   Benjamini-Hochberg, Benjamini-Yekutieli, closed, and gatekeeping procedures, which
   ordering, tie, clipping, monotonicity, and projection rules must be versioned?
5. For Tukey, Tukey-Kramer, Dunnett, Scheffe, Games-Howell, and other selected
   follow-up candidates, which reference distribution, covariance structure,
   degrees of freedom, critical value, and simultaneous interval construction must
   be independently certified?
6. Where can binary64 projection underflow, overflow, round to zero or one, change a
   stepwise decision, or cross a critical comparison? Identify refusal candidates
   separately from numerical error.
7. Can mathematical-truth enclosures or independently certified high-precision
   reference values be generated across each bounded domain? Specify the oracle,
   precision, convergence evidence, and independence requirements separately for
   each mathematical family.
8. Which quantities require separate error ledgers: input algebra, omnibus and
   contrast statistics, covariance, degrees of freedom, unadjusted probabilities,
   multiplicity transforms, critical values, interval endpoints, and binary64
   projection?
9. Which operation graphs, tables, constants, integration or iteration ceilings,
   random-bit or seed identities, and resource ceilings need to be versioned rather
   than inherited from a library?
10. Which boundary, metamorphic, and adversarial cases are required, including small
    and large families, equal and tied p-values, ordering permutations, highly
    unequal group sizes or variances, near-critical decisions, far tails, subnormal
    projection, covariance degeneracy, and first-failure ordering?
11. Which resampling-based candidates can be made reproducible and independently
    checkable under an explicit randomness contract? Classify any candidate that
    cannot yet meet that boundary as deferred rather than substituting an unstated
    deterministic approximation.
12. What can be reused from Release 2's trace, exact-rational, projection-margin,
    table-evidence, fail-closed, and controlled-execution patterns, and what cannot
    be reused because the function, dimension, covariance, ordering, or randomness
    domain differs?
13. Which parts are likely reusable by a later factorial, interaction, or
    multiple-endpoint Contract?

## Required probes

Use at least two implementation-independent evidence routes where feasible. At a
minimum, probe:

- an arbitrary-precision mathematical route with stated convergence or enclosure
  evidence for each selected distribution family;
- a separately implemented or independently derived route for selected reference
  points and adjustment outputs;
- known transition neighborhoods for binary64 zero, subnormal, normal, and one;
- numerator and denominator degrees-of-freedom boundaries, including non-integer
  values if the semantic candidate permits them;
- p-value ordering, ties, permutation invariance, monotonicity adjustments, and
  family-size boundaries for algebraic procedures;
- correlation and dimension boundaries for joint-probability procedures;
- monotonicity in statistics, critical values, and relevant parameter changes;
- simultaneous-interval inclusion and test/interval duality where claimed;
- exact replay and cross-seed counterexamples for any stochastic candidate;
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
4. a coverage matrix for every procedure in the semantic catalogue, naming its
   numerical family and current feasibility disposition;
5. candidate algorithms and alternatives without silent selection;
6. failure and refusal boundaries;
7. independent oracle and certificate strategies by numerical family;
8. proposed evidence corpora and adversarial plans;
9. reusable Release 2 patterns and non-reusable assumptions;
10. reusable Release 4 and later multiplicity foundations and limits;
11. unresolved blockers and reopen conditions; and
12. one program disposition plus a per-procedure disposition. Program dispositions
    are `NUMERIC_PROGRAM_READY`, `NARROW`, `DEFER`, or `NO_GO`.

`NUMERIC_PROGRAM_READY` means only that every Release 3 implementation candidate has
either a feasible evidence path or an explicit blocking hold and that no technique is
silently treated as numerically covered. It does not select a path, establish a
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
