# D5 evidence-generator adversarial-review disposition

## Review identity

- Reviewed head: `c2dd0493c9a69c10db95eb848186962eeb816b41`
- Review bundle manifest: 728 entries, all verified
- Pilot-evidence manifest: 6 entries, all verified
- Review type: external, independent adversarial review
- Verdict: **GO**
- External research requested: none

The reviewer reconstructed the exact repository head from the included Git
bundle, checked the extracted tree against the review copy, verified every
certificate provenance binding, and reproduced the generator in the pinned
python-flint and FLINT environment.

## Evidence established by the review

The review independently checked the exact binary64 input lifts and rounding
cells, primary regularized-incomplete-beta enclosures, secondary density
quadrature and analytic tail bound, df=1 and df=2 closed forms, fixed-95-percent
critical-value brackets, provenance bindings, deterministic regeneration, and
the authority boundary. All generated enclosures contained an independent
250-digit mpmath value. Thirty-three bundle and generator mutations failed
closed as intended.

This establishes the rigor and reproducibility of the pilot evidence route. It
does not establish a complete critical-value table, select a supported domain
or comparison tolerance, define the runtime tail procedure or refusal codes,
or close R2-D5.

## Non-blocking follow-up

The review found no blocker or should-fix item. It identified three
nice-to-have hardening changes, applied in the direct follow-up to this review:

- disclose that the method-distinct routes share Arb ball arithmetic and
  therefore provide only weak independence against shared-library defects;
- classify both positive and negative binary64 zero as zero projections; and
- fail if repository source files are unavailable instead of silently skipping
  source-copy verification.

These changes do not alter the mathematical target, certificate contents,
support policy, comparison policy, identifier state, or authoritative surface.
They do not restart the public review window.
