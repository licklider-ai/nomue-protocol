# Release 2 Paired-t Evidence Generator

**Status: non-authoritative candidate evidence tooling.** This directory is not
part of the shipped verifier. It does not issue an identifier, register support,
select a supported domain or tolerance, or close R2-D5.

The generator lifts each finite binary64 input from its exact bit pattern to a
rational value. It then produces a small pilot bundle containing:

- regularized-incomplete-beta Arb enclosures;
- method-distinct Student-t density quadrature with an analytic tail bound;
- executed df=1 and df=2 closed-form checks where applicable;
- exact rational binary64 rounding cells;
- fixed-95-percent critical-value midpoint brackets;
- boundary probes for p near one, positive subnormal p, df=1 at maximum finite
  t, and df=2 at maximum finite t; and
- hashes binding the generator, environment, and raw oracle output.

The secondary route is method-distinct, not library-independent. It shares Arb
ball arithmetic with the primary and closed-form routes, so agreement between
these routes provides only weak independence against shared-library defects.

The committed `cases.json` is deliberately a pilot corpus. A successful run proves
only that this evidence route works for those cases. The numerical readiness file
therefore remains `incomplete`; table completeness, the support domain, runtime
procedure, refusal policy, and comparison tolerances remain open.

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
and all generated certificate intervals. That review is narrower than a new review
of the already-closed D5 guardrails.
