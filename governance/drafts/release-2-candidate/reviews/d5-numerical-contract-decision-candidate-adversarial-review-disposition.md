# D5 numerical-contract decision candidate adversarial-review disposition

## Review identity

- Reviewed implementation head: `0e7af1837fcc4a8e7c67693c8745f8c4887a3391`
- Baseline: `1359247e839a407d10ef0d04ba2e0b91feaa121c`
- GitHub transport implementation commit:
  `c879e9145ccd8e6a1f412681cd8b95146d74045b`
- Review transport head: `b39593cff32d1beb3d5370b0132d6f2779a03512`
- Review-bundle SHA-256:
  `d204f2677ad34877554e643498f9700e3e6e14a23230758458846e161af00a09`
- Review type: external, independent, candidate-scoped adversarial review
- Verdict: **GO**
- Findings: zero blockers, zero should-fix items, and one nice-to-have item
- External research requested: none

The reviewer verified all 736 manifest entries, rejected unsafe or undeclared
archive entries, resolved the exact reviewed implementation and baseline from the
bundled Git repository, and confirmed that the extracted tree was byte-identical to
the bundled repository copy. The declared twelve-file, `+785/-26` implementation
delta was exact. The GitHub transport implementation tree was also confirmed to be
identical to the reviewed implementation tree and was not substituted as the review
target.

## Evidence established by the review

The review independently attacked the separation of three numerical ledgers:

1. exact reproduction of the pinned binary64 operation graph;
2. error relative to the mathematical target; and
3. target-format projection of a positive probability.

No path was found that allowed one ledger to discharge another. Exact bit identity
remains a graph-reproduction rule rather than an accuracy tolerance, and the
probability classifier remains a non-runtime policy candidate rather than a
correct-rounding proof.

The reviewer separately verified:

- twenty-five exact-binary64 comparison boundary probes, including signed zero,
  adjacent values, non-finite values, subnormal boundaries, and decimal aliases;
- 500,115 probability-classification patterns against an independently implemented
  sign-and-exponent partition, with no mismatch and all six classes reached;
- thirty fail-closed numerical-contract checkpoint mutations, nine readiness
  mutations, and acceptance of semantically irrelevant JSON key reordering;
- cross-artifact binding of maturity, held-decision, evaluation-target, projection,
  and research-handoff fields;
- unchanged PR #29 predicate order, first-failure behavior, and eleven-case boundary
  corpus outcomes;
- absence of any supported df maximum, runtime support activation, final tolerance,
  final reason-code freeze, identifier issuance, or authoritative registration; and
- Release 1 invariance, exact dispatch, private-dependency checks, and the authority
  boundary.

The ordinary repository check passed without a fallback: 30 test files and 332
tests, all 132 conformance fixtures, Phase 1 and Phase 2A checks, generated-file
guards, and repository validation succeeded. The checkout remained clean.

## Finding disposition

One nice-to-have defense-in-depth finding was accepted for later closure. A nested
object property whose value is JavaScript `undefined` is omitted by the current
deep-equality canonicalization and is therefore not detected as an extra key. This
state is unreachable through the declared strict-JSON artifact path because JSON
cannot represent `undefined`. It does not affect truthfulness, authority, runtime
classification, or safety of the next candidate increment.

Before this validator is promoted for programmatic callers outside the strict-JSON
artifact path, non-JSON values must be rejected recursively or nested key presence
must be checked independently of JSON serialization. The next runtime-series or
evidence increment may close this item locally; it does not require a new full
review or renewed external research.

## Disposition

The numerical-contract decision candidate is accepted as independently reviewed
candidate work. It may proceed to the bounded runtime-series and evidence increment
without repair to the reviewed target.

This disposition does not complete the Student-t operation graph, establish a
mathematical-truth error bound, define a supported domain or df ceiling, select final
comparison tolerances or refusal-code spellings, activate runtime support, issue an
identifier, register a Public Check or bundle, complete R2-D5, or make paired-t
support authoritative. Public review issue #25 remains open. The public review
window does not restart because this record adds review evidence without changing
the RFC's semantic scope.
