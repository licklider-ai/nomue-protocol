# Release 2 Paired-t Evidence Generator

**Status: non-authoritative candidate evidence tooling.** This directory is not
part of the shipped verifier. It does not issue an identifier, register support,
select a supported domain or tolerance, or close R2-D5.

The generator lifts each finite binary64 input from its exact bit pattern to a
rational value. It then produces a small pilot bundle containing:

- regularized-incomplete-beta Arb enclosures;
- method-distinct Student-t density quadrature with an analytic tail bound for
  df greater than 2;
- executed df=1 and df=2 closed-form secondary certificates where applicable;
- exact rational binary64 rounding cells;
- fixed-95-percent critical-value midpoint brackets and an ordered table-level
  evidence manifest;
- boundary probes for p near one, small positive normal and subnormal p,
  positive p without a positive binary64 representation, and df=1 and df=2 at
  maximum finite t; and
- hashes binding the generator, environment, and raw oracle output.

The secondary route is method-distinct, not library-independent. It shares Arb
ball arithmetic with the primary and closed-form routes, so agreement between
these routes provides only weak independence against shared-library defects.

The committed `cases.json` is deliberately an explicit research seed. Its fixed-95
coverage is exactly `df = 1, 2, 4, 5, 6, 10, 30, 100, 1000`; the gaps are deliberate
and prevent the seed from being mistaken for contiguous runtime support. A
successful run proves only that this evidence route works for those cases. The
numerical readiness file therefore remains `incomplete`; table completeness, the
support domain, runtime procedure, refusal policy, and comparison tolerances remain
open.

For df greater than 2, the critical-value secondary route integrates over geometric
finite segments. It expands the final endpoint until the rigorous analytic tail
bound is no more than one quarter of the primary enclosure's strict margin at the
two inset test points. This ceiling is an evidence-generation stopping condition,
not a runtime comparison tolerance or support-domain boundary. For df=1 and df=2,
the executed Cauchy and algebraic closed forms are the secondary route; this avoids
claiming that a numerically unresolved quadrature interval is independent evidence.

`critical-value-table-manifest.json` binds the ordered df/hex research seed, the
certificate bundle, and every certificate hash. It explicitly records
`contiguous_runtime_support_claimed: false` and `supported_df_max: null`.

## Contiguous critical-value table evidence candidate

`generate_critical_value_table_evidence.py` extends only the evidence coverage to
every integer `df` from `1` through `200`. For each df, it performs a monotone
binary search over binary64 rounding-cell upper midpoints. Arb must strictly prove
each search predicate. The first cell whose upper midpoint is above the mathematical
quantile is then passed to the existing certificate core for the primary midpoint
bracket and the method-distinct secondary route.

The generator cross-checks every overlapping cell against the committed nine-cell
research seed. Its table manifest binds the ordered 200 cells, all individual
certificate hashes, the complete certificate bundle, the raw traces, the pinned
environment, and the copied source files. The dedicated validator also rejects
coherently rehashed promotion, cell, inequality, provenance, source, and dependency
mutations.

The validator proves byte binding, structure, authority posture, cross-df monotonicity,
and the internal exact-rational consistency of recorded claims. It does not execute the
rigorous numerical methods or establish cell-level mathematical truth for an externally
supplied bundle; that truth requires regeneration from the pinned source and independent
numerical review.

The contiguous range is an evidence-evaluation target, not contiguous Protocol
support. `supported_degrees_of_freedom_max` and the checkpoint's table hash remain
null; runtime support, final table selection, confidence-interval endpoint truth,
R2-D5 completion, and issuance all remain prohibited. Independent review of the
generated artifact is still required.

## Local run

Create a disposable virtual environment and install the exact dependency:

```bash
python3 -m venv /tmp/nomue-r2-paired-t-evidence
/tmp/nomue-r2-paired-t-evidence/bin/python -m pip install -r tooling/r2-paired-t-evidence/requirements.txt
NOMUE_GENERATOR_COMMIT=<full-40-hex-checkout-commit> \
  /tmp/nomue-r2-paired-t-evidence/bin/python \
  tooling/r2-paired-t-evidence/generate_certificates.py \
  --cases tooling/r2-paired-t-evidence/cases.json \
  --output /tmp/nomue-r2-paired-t-evidence-output
pnpm evidence:r2-paired-t:validate \
  /tmp/nomue-r2-paired-t-evidence-output \
  <full-40-hex-checkout-commit>

NOMUE_GENERATOR_COMMIT=<full-40-hex-checkout-commit> \
  /tmp/nomue-r2-paired-t-evidence/bin/python \
  tooling/r2-paired-t-evidence/generate_critical_value_table_evidence.py \
  --output /tmp/nomue-r2-paired-t-critical-value-table
pnpm evidence:r2-paired-t-critical-value-table:validate \
  /tmp/nomue-r2-paired-t-critical-value-table \
  <full-40-hex-checkout-commit>
pnpm evidence:r2-paired-t-critical-value-table:probe \
  /tmp/nomue-r2-paired-t-critical-value-table \
  <full-40-hex-checkout-commit>
```

The generator refuses to overwrite an existing output directory. A missing
`python-flint` dependency fails the evidence run; there is no lower-precision or
non-rigorous fallback.

## Review boundary

Before this pilot output is used to close any R2-D5 evidence item, a separate
numerical reviewer must inspect the finite-quadrature tail bound, exact endpoint
extraction, critical-value monotonic bracket, low-df formulas, provenance binding,
adaptive truncation rule, table-level bindings, and all generated certificate
intervals. That review is narrower than a new review of the already-closed D5
guardrails.
