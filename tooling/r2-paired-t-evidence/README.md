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
