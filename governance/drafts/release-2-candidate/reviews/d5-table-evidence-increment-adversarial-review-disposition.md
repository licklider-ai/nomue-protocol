# D5 table-evidence increment adversarial-review disposition

## Review identity

- Reviewed head: `6f58c340889de416a040ca28037736b301402f8a`
- Outer review-bundle manifest: 732 entries, all verified
- Pilot-evidence manifest: 7 entries, all verified
- Review type: external, independent, delta-scoped adversarial review
- Verdict: **GO**
- Findings: none
- External research requested: none

The reviewer reconstructed the exact Git head from the supplied bundle, compared
its tracked tree byte-for-byte with the repository copy, verified all twelve
certificate provenance bindings, and reproduced the evidence generator with the
pinned python-flint and FLINT versions.

## Evidence established by the review

The review independently checked all nine fixed-95-percent research-seed cells at
300-digit precision. Every declared binary64 value was correctly rounded, every
exact rounding cell and midpoint tail bracket was consistent, and all eighteen
adjacent candidate cells excluded the true quantile. Generator-level probes also
rejected the adjacent candidates tested for df=4 and df=1000.

The reviewer separately verified:

- the executed df=1 and df=2 closed-form secondary routes;
- gap-free segmented density quadrature for every seed df greater than 2;
- the analytic tail inequality and case-derived adaptive tail ceiling;
- the ordered table-content, certificate-bundle, per-certificate, commit, and
  source-output bindings;
- the positive-normal and positive-but-not-binary64-representable boundary cases;
- deterministic regeneration across two runs and Python versions; and
- Release 1 invariance and the non-authoritative boundary.

Twenty-three bundle mutations and four generator-level adjacent-candidate attacks
failed closed. The full repository check passed with 28 test files and 312 tests.

## Disposition

No blocker, should-fix, or nice-to-have item was reported. The table-evidence
increment is accepted as reviewed candidate evidence and requires no repair or
additional research.

This disposition does not complete R2-D5, establish a supported df range, select a
runtime tail procedure or comparison tolerance, issue an identifier, register a
Public Check or bundle, or make paired-t support authoritative. The public review
window does not restart because the accepted increment adds evidence without
changing the RFC's semantic scope.

An Engineering article may describe the reviewed candidate evidence technique after
the candidate PR merges. It must not describe paired-t as released, supported, or
authoritative, and the Latest entry must preserve that same boundary.
