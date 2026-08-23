# Steward Decision Record: Release 1 Final Scope Audit (2026-08-19)

**Status: evidence record.** This record documents the scope decision and
observations below; it does not define Protocol semantics or assign itself an
authority-manifest class.

## Verdict

SCOPE FIXED — RELEASE CANDIDATE NOT YET PINNED

The Release 1 feature/statistical scope is now closed for candidate preparation.
No additional analytical capability is required before Release 1.

## Planned public support target

The sole planned Record interpretation support target for Release 1 is:

```text
urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1
```

It is the numerical-contract-hardened successor of the ITGC guarantee bundle and
remains `EXPERIMENTAL` and `public_release: false` until the final candidate-content
batch is legally cleared and frozen.

The older registered bundles remain immutable and interpretable development/history
surfaces, but are not Release 1 public support targets:

- `urn:nomue:bundle:itgc-minimal:0.1.0-draft.1`
- `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1`

No default or version-proximity fallback is introduced.

## Included analytical capability

Release 1 public support is intentionally narrow:

- independent two-group continuous design under the registered ITGC Profile;
- two-sided Welch two-sample t procedure only;
- profile admissibility and numerical computability as separate checks;
- unstandardized arithmetic mean difference, Welch standard error, and two-sided
  95% Welch-Satterthwaite confidence interval;
- local/offline Record conformance, integrity, and numerical recomputation under the
  exact 0.2.1 bundle/check versions;
- scoped verification/report/refusal semantics and exact bundle dispatch.

This narrowness is intentional. Release 1 is a deep verification slice, not a survey
of statistical methods.

## Explicitly excluded from Release 1 public support

The following work may exist as research, informative design material, experimental
specification material, or future architecture, but is not Release 1 Record support:

- paired t;
- Wilcoxon signed-rank;
- Mann-Whitney / WMW;
- other statistical methods beyond the registered ITGC Welch slice;
- production attestation or any `nomue-attested` claim;
- production human-approval support in a registered Record bundle;
- figure / Legend / Methods / Results / Claim artifact-binding support;
- standardized effect-size support;
- a production extension mechanism;
- log-p or other successor numerical result surfaces.

The completed P1-A research and paired-t L1 design remain successor-development assets
and do not expand Release 1.

## Attestation boundary

Every currently registered interpretation bundle declares:

```text
attestation_support: none
```

Therefore Release 1 does not require a production nomue attestation trust-root
identity or a `nomue-attested` claim. Experimental cryptosuite/trust semantics and
test-only negative paths may remain in the repository and snapshot, but they do not
become supported merely by being present.

The first production trust-root key ceremony is deferred until a future bundle is
prepared that actually binds attestation support. This does not waive any future
cryptosuite/trust gate requirement.

## Canonical cases and external evidence

Canonical-case evidence, external clean-environment verification, independent rebuild,
release-specific oracle runs, threat/adversarial reruns, and relying-party review are
Release 1 gate evidence and are performed against the frozen candidate content.

Existing synthetic/development cases are not silently relabeled as fresh Release 1
evidence. Rights-cleared canonical cases used for Release 1 are preregistered before
evaluation, and abandoned/failed cases are disclosed under R1-10.

## Remaining pre-candidate blockers

Release Candidate pinning does **not** occur in this decision.

Before choosing candidate content commit C, at minimum:

1. public-facing documentation and gate wording must be aligned to this scope;
2. the Release 1 legal package must be adopted after legal review, including the
   actual specification/code licenses, patent implementation terms, contribution
   terms, and legal review record required by R1-12;
3. the 0.2.1 bundle must be deliberately promoted from planned target to public
   Release 1 support in the final candidate-content batch;
4. the matching public verifier/package/release-facing demo and documentation must be
   aligned to the same 0.2.1 target.

No statistical-method expansion is a pre-candidate blocker.

## Candidate sequence after those blockers close

The release process then follows ADR-0033 and the Release Policy:

```text
final candidate content commit C
-> candidate freeze manifest captured at C
-> release-control pin records C + freeze manifest
-> fresh gate evidence and steward decisions
-> candidate-equivalence check
-> detached Protocol snapshot manifest/hash + signed release artifacts
-> release tag / Public Draft publication
```

Any new Protocol/public feature added before C is selected reopens the final scope
audit. After C is frozen, candidate-frozen content changes require a new candidate.
