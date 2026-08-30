# Release 2 D5 Evidence Generator Adversarial Review Protocol

## Assignment

Perform a **targeted adversarial review** of the non-authoritative Release 2 paired-t
p-value and fixed-95-percent critical-value pilot evidence generator. This is not a
new review of the already-closed D5 guardrails and not a review of the whole Release
2 candidate surface.

Treat the generated certificate bundle and every provenance field as hostile input.
The objective is to decide whether this pilot evidence route is mathematically
rigorous, reproducible, internally bound, and honestly scoped. Do not decide the
final supported domain, runtime Student-t procedure, comparison tolerances, Public
Check version, or table df ceiling.

## Inputs and identity checks

The review bundle contains:

- `repository/`: the exact Git checkout under review;
- `repository.gitbundle`: a portable Git bundle containing the reviewed commit;
- `REPOSITORY-COMMIT.txt`: the expected full commit identity;
- `pilot-evidence/`: one output of the pinned generator;
- `research-inputs/`: the prior Student-t enclosure investigation and D5
  adjudication report;
- `REVIEW-PROMPT.md`: this prompt; and
- `MANIFEST.sha256`: the complete review-bundle inventory.

Before reviewing:

1. Verify every `MANIFEST.sha256` entry.
2. Confirm `pilot-evidence/MANIFEST.sha256` independently.
3. Clone `repository.gitbundle`, confirm its Git head equals
   `REPOSITORY-COMMIT.txt`, compare its tracked tree with `repository/`, and confirm
   that commit equals the generator commit recorded in every certificate and in
   `pilot-evidence/environment.json`.
4. Confirm the copied generator, case manifest, requirements, environment, and raw
   output hashes match every certificate provenance field.
5. Record the exact Python, python-flint, and FLINT versions actually used for the
   reproduction.

Stop and report a BLOCKER if any identity or hash check fails.

## Authority and scope boundary

Confirm all of the following remain true:

- all artifacts say `non_authoritative_candidate`;
- both numerical readiness closure fields remain `incomplete`;
- `supported_domain` and `comparison_tolerances` remain null;
- no identifier is issued and no bundle, schema, Public Check, registry, reference
  verifier, conformance fixture, or generated authoritative view is changed;
- the pilot corpus is not described as a complete critical-value table or complete
  support-domain proof; and
- no SciPy, R, Boost, mpmath, or reference-kernel value enters certificate
  generation.

Any authority leak, premature closure claim, hidden tolerance, or support claim is a
BLOCKER.

## A. Exact-input and target-format attack

Review and independently probe:

1. all binary64 classes accepted by the helper: positive/negative normal,
   subnormal, signed zero, largest finite, and non-finite rejection;
2. exact IEEE 754 bit-pattern to rational conversion, including exponent boundaries;
3. adjacent-value and rounding-cell construction at zero, the normal/subnormal
   boundary, ordinary normal values, and the largest finite value;
4. round-to-nearest, ties-to-even behavior at both exact cell midpoints; and
5. exact `x = df / (df + t^2)` recomputation from the lifted statistic.

Use independently written probes. Try to make a wrong projected hex or wrong cell
pass the TypeScript validator.

## B. Primary Arb enclosure attack

Review the mathematical identity and code for:

- `p = I_x(df/2, 1/2)`;
- the complementary-lower branch when `x > 1/2`;
- exact-rational transfer through `fmpq` into Arb;
- extraction of outward exact endpoints through `lower()`, `upper()`, and
  `man_exp()`; and
- precision escalation and strict rounding-cell containment.

Probe the branch boundary, p near one, ordinary tails, subnormal p, df=1 at maximum
finite t, and df=2 at maximum finite t. A display string is not evidence; judge the
exact fractions.

## C. Secondary quadrature and tail-bound attack

Derive independently and check every inequality used by the secondary route:

\[
f_\nu(x)=C_\nu(1+x^2/\nu)^{-(\nu+1)/2}
\]

and

\[
2\int_T^\infty f_\nu(x)\,dx
\le 2C_\nu\nu^{(\nu-1)/2}T^{-\nu}.
\]

Then attack:

- the normalization constant;
- the factor of two;
- finite integration limits and exact endpoint transfer;
- the complex-analytic callback and branch-cut handling;
- use of the real enclosure and treatment of the imaginary enclosure;
- outward rounding of the analytic tail upper bound;
- clamping to the mathematical probability range `[0,1]`;
- primary/secondary interval overlap; and
- whether the route remains method-distinct while honestly disclosing shared Arb
  ball-arithmetic common cause.

Look especially for a sign, exponent, missing factor, false analyticity, or endpoint
conversion that would make a narrow but false interval.

## D. Low-df closed-form attack

Independently verify and execute:

- df=1 two-sided tail, including the stable reciprocal-atan branch;
- df=2 two-sided tail, including the cancellation-resistant algebraic branch;
- df=1 fixed-95-percent critical value `cot(pi/40)`; and
- df=2 fixed-95-percent critical value `(19/20)/sqrt(39/800)`.

Confirm the generated df=1 and df=2 p certificates require real enclosure overlap,
not labels or booleans. The current critical pilot has no low-df critical
certificate; do not misclassify that planned table work as a defect, but flag any
claim that it is already complete.

## E. Critical-value proof attack

For each critical pilot case:

1. recompute the candidate binary64 rounding cell exactly;
2. verify the Student-t two-sided tail is strictly greater than `1/20` at the lower
   cell midpoint and strictly less than `1/20` at the upper cell midpoint;
3. verify monotonicity is used in the correct direction;
4. inspect the secondary quadrature bracket at the two inset rational points;
5. prove that the reported quantile enclosure is strictly inside the same rounding
   cell; and
6. try the adjacent candidate floats and demonstrate that they fail.

A bracket at adjacent floats instead of cell midpoints, a non-strict comparison, or
a reversed tail inequality is a BLOCKER.

## F. Provenance and validator mutation attack

Start from a valid pilot bundle and mutate one item at a time. At minimum test:

- generator commit, generator hash, environment hash, and raw-output hash;
- copied generator, cases, requirements, raw output, certificate output, and
  manifest;
- an added unmanifested file, removed file, symlink, malformed manifest line,
  duplicate case id, missing case, and extra case;
- raw primary, secondary, closed-form, projection, and critical bracket values while
  leaving certificates unchanged;
- certificate values while leaving raw output unchanged;
- a forged overlap boolean, wrong exact x, wrong incomplete-beta branch, vacuous
  `[0,1]` secondary interval, wrong rounding cell, zero projected p certificate, and
  placeholder provenance; and
- missing `python-flint` or a different installed version.

Record whether each mutation fails in generation, manifest validation, provenance
validation, raw/certificate cross-binding, or certificate validation. A material
mutation that remains accepted is at least SHOULD-FIX and may be a BLOCKER if it can
support a false numerical certificate.

## G. Reproduction and corpus classification

Reproduce the generator from a clean checkout using only the pinned requirement.
Confirm:

- generation does not read network data or a reference implementation;
- output contains no nondeterministic timestamps or timing-dependent fields;
- the manifest is complete and the validator passes;
- the p pilot has exactly three certificates;
- the critical pilot has exactly two certificates;
- the four boundary probes have the declared projection classes;
- df=2 at maximum finite t is recorded as a positive mathematical tail that has no
  positive binary64 representation, not as exact probability zero; and
- a successful pilot is not interpreted as table or support-domain completeness.

If two clean runs in the same pinned environment produce different bytes, classify
the cause and severity.

## Required report

Return one report with:

1. **Verdict**: `GO`, `GO WITH FIXES`, or `NO-GO`.
2. **Findings**, ordered `BLOCKER`, `SHOULD-FIX`, `NICE-TO-HAVE`. Each finding must
   include the exact file/function, a minimal reproduction, actual versus expected
   behavior, the smallest repair, semantic-scope classification, and whether the
   public review window must restart.
3. **Closure table** for A through G plus authority boundary and Release 1
   invariance.
4. **Reproduced commands and results**, including mutation counts.
5. **Evidence classification**: what this pilot establishes, what remains open for
   complete R2-D5 evidence, and what belongs to the later numerical contract
   decision rather than this repair.
6. **Confirmed non-findings** for the most important attacked boundaries that held.

Do not recommend a broad redesign merely because a different architecture is
possible. Recommend the smallest change that closes an demonstrated defect. Do not
silently fix tracked files; finish with a clean worktree and report any temporary
files removed.
