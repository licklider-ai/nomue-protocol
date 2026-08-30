# D5 runtime inverse-beta table evidence adversarial-review disposition

## Review identity

- Implementation target: `5d58990e8cb25920bda791d0f0308ab29dcea3fb`
- Independent review-input commit: `73e4ae34e12aa3bb2ff2a32251caa4fa5a1ba845`
- Independent review-result commit: `ff808eb42e6d8382ad09dd36441d167d12d5c104`
- Review type: external, independent, delta-scoped adversarial review
- Verdict: **GO**
- Findings: none
- Additional primary-source research requested: none

The reviewed target is PR #37's contiguous `df = 1..200` evidence table for
`1 / B(df / 2, 1 / 2)`. The reviewer checked the pinned implementation tree,
the evidence bundle manifests and GitHub Actions artifact identity, and the
table content hash
`sha256:ba1f992199e9e153956589d62dcf5a6509575100bb7c923c170bfa45fdd76c08`.

## Evidence established by the review

The reviewer derived a third calculation route from the beta-gamma identity and
the half-integer gamma closed form, using exact rational arithmetic and a fresh
Machin-series enclosure of pi rather than a special-function library. All 200
binary64 cells and their exact secondary coefficients agreed with the generated
table.

The review also confirmed, for every entry:

- exact ascending coverage of every integer df from 1 through 200;
- containment of the independently derived truth interval in the Arb primary
  enclosure;
- reconstruction and strict isolation of the declared binary64 rounding cell;
- agreement between the table bits, certified projection, and independent
  correctly rounded value;
- deterministic regeneration with the pinned Arb/FLINT dependency;
- fail-closed behavior when the dependency, output precondition, JSON shape, or
  evidence bindings were invalid; and
- unchanged Release 1 authoritative and supported surfaces.

The built-in and reviewer-added probes rejected 53 mutation or malformed-input
scenarios with no uncaught exception. A fresh-clone `pnpm check` completed
successfully.

## Disposition

The contiguous inverse-beta table is accepted as reviewed candidate evidence.
It may be used as an exact, hash-bound input to a later non-authoritative runtime
integration candidate.

This disposition does not select a final runtime table or final table hash,
establish a supported df maximum, prove a global truth-error bound, close the
supported-platform matrix, activate runtime support, issue a Public Check or
bundle, complete R2-D5, or close the public Release 2 review. The `df = 1..200`
coverage remains an evidence-evaluation range rather than Protocol support.
