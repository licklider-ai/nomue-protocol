# Release 2 D5 Table-Evidence Increment Adversarial Review Prompt

## Assignment

Perform a **targeted independent adversarial review** of the Release 2 paired-t D5
table-evidence increment. Review only the delta after the already accepted pilot
evidence-generator review. Do not reopen the D5 guardrails, the Release 2 structural
candidate surface, or unrelated Release 1 behavior unless this increment creates a
concrete regression.

The objective is to decide whether the expanded fixed-95-percent research seed is
mathematically rigorous, reproducible, internally bound, and honestly separated
from runtime support. Do not select the final df ceiling, supported domain, runtime
Student-t procedure, comparison tolerances, refusal-code spelling, Public Check
revision, or final authoritative table.

## Inputs and identity checks

The review bundle contains:

- `repository/`: the exact Git checkout under review;
- `repository.gitbundle`: a portable Git bundle containing the reviewed commit;
- `REPOSITORY-COMMIT.txt`: the expected full commit identity;
- `pilot-evidence/`: one output of the pinned generator at that commit;
- `research-inputs/`: the prior high-precision critical-value investigation and the
  accepted pilot evidence review;
- `REVIEW-PROMPT.md`: this prompt; and
- `MANIFEST.sha256`: the complete review-bundle inventory.

Before reviewing:

1. Verify every outer `MANIFEST.sha256` entry.
2. Verify `pilot-evidence/MANIFEST.sha256` independently.
3. Clone `repository.gitbundle`; confirm its head equals
   `REPOSITORY-COMMIT.txt`; compare its tracked tree byte-for-byte with
   `repository/`; and confirm the generator commit in the evidence output matches.
4. Verify the copied generator, cases, requirements, environment, raw output,
   certificate bundle, table manifest, and all certificate provenance hashes.
5. Record the Python, python-flint, and FLINT versions used for reproduction.

Stop and report a BLOCKER if an identity or hash check fails.

## Authority and scope boundary

Confirm all of the following remain true:

- every new artifact remains `non_authoritative_candidate` and unissued;
- both readiness closure fields remain `incomplete`;
- `supported_domain` and `comparison_tolerances` remain null;
- the table manifest says `contiguous_runtime_support_claimed: false` and
  `supported_df_max: null`;
- no identifier, registry, schema, Public Check, supported bundle, conformance
  fixture, reference verifier, or generated authoritative view changes; and
- the explicit df seed is not described as a complete table or inferred support.

Any authority leak, premature closure, hidden tolerance, or runtime-support claim is
a BLOCKER.

## A. Research-seed cell attack

The declared ordered seed is exactly:

`df = 1, 2, 4, 5, 6, 10, 30, 100, 1000`.

For every cell:

1. independently obtain or calculate the two-sided 95-percent Student-t critical
   value at substantially higher precision;
2. confirm the declared binary64 hex is the correctly rounded value;
3. reconstruct the exact binary64 rounding cell;
4. confirm the primary tail enclosure is strictly above `1/20` at the lower cell
   midpoint and strictly below `1/20` at the upper cell midpoint; and
5. try both adjacent binary64 candidates and show why they cannot certify.

Do not treat agreement among SciPy, R, Boost, or a copied lookup table as an oracle.
If the supplied research result is reused, add an independently implemented check
for at least the candidate-cell and monotonic-bracket claims.

## B. Low-df secondary-route attack

For df=1 and df=2, the increment deliberately uses the executed rigorous closed
form as the critical certificate's secondary route instead of density quadrature.
Verify:

- df=1: `cot(pi/40)`;
- df=2: `(19/20)/sqrt(39/800)`;
- both exact enclosures lie strictly inside the declared rounding cell;
- certificate `secondary` and `closed_form` are exactly cross-bound;
- the validator rejects a label-only route, a mismatched enclosure, a missing
  closed form, and use of the low-df route above df=2; and
- documentation does not count these two fields as library-independent evidence.

Classify this as weak method independence because all rigorous intervals still use
Arb ball arithmetic.

## C. Segmented quadrature and adaptive-tail attack

For every df greater than 2, independently inspect and probe the secondary route.
Derive the density normalization and the analytic tail inequality:

\[
2\int_U^\infty f_\nu(x)\,dx
\le 2C_\nu\nu^{(\nu-1)/2}U^{-\nu}.
\]

Then verify:

1. geometric segmentation covers the exact interval from the inset test point to
   the final endpoint once, without gaps, overlap, or endpoint drift;
2. the Arb integral callback is analytic on every segment and its imaginary
   enclosure contains zero;
3. relative and absolute integration tolerances cannot silently underflow to zero;
4. the final tail-bound upper endpoint is outward and no larger than the declared
   ceiling;
5. the ceiling is exactly one quarter of the smaller strict primary-tail margin at
   the two inset points;
6. endpoint doubling terminates or fails closed at its declared limit;
7. integration failure or a non-finite enclosure triggers precision escalation or
   refusal rather than acceptance; and
8. the final secondary tail intervals strictly bracket `1/20` in the correct
   monotonic direction.

Attempt counterexamples at df=4, where endpoint expansion is largest, and at
df=1000, where the tail is steep. The adaptive ceiling is an evidence-generation
condition, not a runtime comparison tolerance; flag either an under-bound tail or
a leaked runtime interpretation.

## D. Table-manifest and cross-artifact mutation attack

Verify that `critical-value-table-manifest.json` binds:

- the exact ordered df/hex content;
- the table target and binary64 rounding mode;
- the complete `certificates.json` bytes;
- every individual critical certificate using the declared stable JSON encoding;
- the exact generator commit; and
- the non-supporting research-seed scope.

Starting from a valid generated bundle, mutate at least:

- one df, one candidate hex, order, deletion, duplication, and an inserted gap;
- `contiguous_runtime_support_claimed`, `supported_df_max`, table key, scope, target,
  and rounding mode;
- table content hash, bundle hash, and one certificate hash;
- the matching certificate while rebuilding only some hashes;
- the matching raw trace while rebuilding only some hashes;
- an undeclared table-manifest key and a missing declared key; and
- low-df secondary method/enclosure plus a df>2 secondary method/enclosure.

Record which layer rejects each mutation. A cross-artifact mismatch that remains
accepted is at least SHOULD-FIX; a mutation capable of presenting a false certified
cell is a BLOCKER.

## E. Boundary and corpus classification

Confirm the generated corpus contains exactly:

- three p-value certificates;
- nine critical-value certificates in the declared order; and
- six boundary probes.

Independently check the two added boundary probes:

- `small-positive-normal-p` projects to the declared positive normal binary64; and
- `positive-p-not-representable-df1000-t200` has a strictly positive mathematical
  tail but correctly projects to binary64 zero.

The latter must never be described as an exact zero probability or a certified
positive-p output. Confirm positive and negative zero hex are both handled as zero
where the generator or validator classifies projections.

## F. Reproduction, regression, and publication boundary

From a clean checkout:

1. install only the pinned dependency and regenerate twice;
2. require byte-identical output in the same environment;
3. run the evidence validator and the full repository checks;
4. confirm the working tree remains clean;
5. confirm Release 1 history, conformance, regression, oracle, and generated-file
   checks still pass; and
6. confirm an Engineering article may describe this as a reviewed candidate
   evidence technique only after the candidate PR merges, while Latest must not call
   paired-t released, supported, or authoritative.

The publication statement is a scope check, not permission to bypass the open
public review or the final R2-D5 decisions.

## Required report

Return one report containing:

1. **Verdict**: `GO`, `GO WITH FIXES`, or `NO-GO`.
2. **Findings**, ordered `BLOCKER`, `SHOULD-FIX`, `NICE-TO-HAVE`. Each finding must
   name the exact file/function, minimal reproduction, actual and expected behavior,
   smallest repair, semantic-scope classification, and public-review-window impact.
3. **Closure table** for A through F, authority boundary, and Release 1 invariance.
4. **Reproduced commands and results**, including independent numerical checks and
   mutation counts.
5. **Evidence classification**: what this increment establishes, what remains open
   for complete R2-D5, and what belongs only to the later numerical-contract
   decision.
6. **Confirmed non-findings** for the most important attacked boundaries that held.

Do not redesign the numerical contract merely because another architecture is
possible. Recommend the smallest repair for a demonstrated defect. Do not silently
edit tracked files. Remove temporary probes and finish with a clean worktree.
