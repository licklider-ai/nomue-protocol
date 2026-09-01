# R2-D5 p-value enclosure evidence closure independent numerical review result

## Verdict

GO

The fixed p-value evidence artifact satisfies the six recorded p-value enclosure evidence
closure items as a reviewed, non-authoritative evidence input. No outstanding BLOCKER,
SHOULD-FIX, or NICE-TO-HAVE finding remains in this bounded review.

This verdict does not itself mutate numerical readiness or close M2. It permits the reviewed
M2-B tail numerical selection and this reviewed p-value evidence closure to proceed to one
explicit M2 integration state transition. It does not select a supported df maximum, platform,
supported-execution predicate, supported domain, runtime support, final public reason codes,
a Public Check, a bundle, R2-D5, RFC closure, or Release 2.

## 1. Identity

- Repository: `licklider-ai/nomue-protocol`
- Review-input base: `43481c1ee6aa1c3775c4b09c6fe300d093421123`
- Review-input head: `ec2c645d9527ffeee45044c6b274d0e70f7eb88c`
- Delta: one direct-child commit, exactly four added files, `+677/-0`
- Candidate PR: `#81`
- RFC issue: `#25`, open during review

The increment adds only the p-value enclosure evidence receipt, its closed fail-closed validator
and tests, and the adversarial review protocol. Existing numerical implementations,
`evidence-readiness.json`, authority, registries, authoritative schemas, conformance, Public
Checks, bundles, and Release 1 are unchanged by the increment.

## 2. Fixed artifact identity

The review independently fetched the GitHub Actions artifact produced for exact generator
commit:

`98da47599053d3e29a2c42f274ffc9c239621ded`

- run: `33452181213`
- artifact id: `9780152851`
- artifact name: `release-2-paired-t-pilot-98da47599053d3e29a2c42f274ffc9c239621ded`
- GitHub-reported ZIP digest:
  `sha256:cf092f0b3bfd4cdb8a32e5fb9864f564390dd0027f847b591be1262c134d1299`
- independently recomputed ZIP digest: identical
- artifact expiry: `2026-11-29T23:47:55Z`

The artifact remained independently fetchable at review time. The workflow run binds the exact
head SHA above; no reconstructed or remembered artifact content was used.

## 3. Manifest and provenance

The extracted artifact contains exactly the expected closed evidence files. The review
independently recomputed the artifact's `MANIFEST.sha256` entries and the receipt's internal
hashes. All matched.

Relevant fixed hashes include:

- `cases.json`:
  `sha256:e0d724015616a5070982438a79030a9c10bfa52614e418d36ffbac4b62ba629d`
- `certificates.json`:
  `sha256:46438c6555e39c8aa8eaae16177613b51d532e0772a7cc033aa953c7e330dbb3`
- `environment.json`:
  `sha256:03ef8db98b4af9889df0beb77702aa09da28b16ca64f456a76e072b1a8e98601`
- `generator.py`:
  `sha256:8e22ab2ec10571148c33a2d7f8c096e9ef5a606c92e596da37f88f8de8cd3725`
- `raw-oracle-output.json`:
  `sha256:a1059d5461ed64fde1d83a625857b8c3d05fed1f48567059e95d824352dd7f53`
- `requirements.txt`:
  `sha256:4cef508304e84c21f73cf412712165dc26e40978cb784bc08a876948b559d90d`

The artifact copies of generator, cases, and requirements are byte-identical to the pinned
repository sources. The generator, cases, requirements, p-value certificate validator, and
bundle validator Git blobs remain identical between the fixed generator commit and the PR #81
review head.

The pinned environment reports CPython 3.12.14, python-flint 0.9.0, FLINT 3.6.0, one Arb thread,
and Linux x86_64. Certificate provenance binds the exact generator commit, generator bytes,
environment bytes, and raw oracle output bytes.

## 4. Secondary-overlap closure

All three certified p-value cases were re-read as exact rational intervals. Primary-secondary
intersection was recomputed independently and exists in every case. The declared
`overlap_with_primary` values agree with the exact interval arithmetic.

The generator was inspected directly: a disjoint primary-secondary result raises rather than
being certified. The checked-in certificate validator independently recomputes exact interval
overlap and does not allow a claimed boolean to override disjoint endpoints. Existing mutation
tests explicitly attack this condition.

The six boundary probes are not incorrectly promoted to full p-value certificates. Their role
remains projection/boundary evidence, and positive projections may explicitly state that a
secondary route is still required for full certification.

## 5. Exact binary64 rounding cells

For all three certified p-value cases and all six boundary probes, the review independently:

1. decoded the projected binary64 bits;
2. reconstructed the adjacent binary64 values;
3. formed the exact rational midpoint rounding-cell endpoints;
4. compared those endpoints with the artifact; and
5. checked strict containment of the primary Arb enclosure.

All recorded cell endpoints match the independent reconstruction and every primary enclosure is
strictly inside its recorded cell. The target is round-to-nearest, ties-to-even. No display
decimal, ULP tolerance, or policy-class margin was used as a substitute for this cell proof.

## 6. df=1 and df=2 closed forms

The certified corpus executes:

- `p-df1-t1` through `df1-cauchy-tail`; and
- `p-df2-t1` through `df2-closed-form-tail`.

Both closed-form enclosures overlap the primary Arb enclosures. The validator requires the
correct low-df path and rejects a missing, mislabeled, vacuous, or non-overlapping low-df
certificate.

The maximum-finite-t df=1 and df=2 boundary traces also execute their respective closed-form
routes and overlap the corresponding primary enclosures.

As an additional method/library corroboration, high-precision `mpmath` values for the three
certified cases lie inside the primary and secondary enclosures:

- df=1, t=1 -> 0.5;
- df=2, t=1 -> approximately 0.42264973081037423549;
- df=10, t=20 -> approximately 2.1460623172042518e-9.

This corroboration does not replace the rigorous Arb certificates.

## 7. Missing oracle dependency

The artifact generator was executed in a Python invocation without site packages. With
`python-flint` unavailable it exits nonzero and reports that the pinned dependency is required.
No fallback oracle, silent approximation, alternate library, or partial successful evidence
artifact was produced.

The normal exact-head GitHub Actions generation succeeded using the pinned requirements,
including `python-flint==0.9.0`.

## 8. Maximum-finite-t cases

The fixed cases include:

- `df1-max-finite-t`, statistic bits `7fefffffffffffff`, projected into the subnormal class; and
- `df2-max-finite-t`, statistic bits `7fefffffffffffff`, projected to binary64 zero.

Independent high-precision corroboration gives approximately:

- df=1: `3.5413150332597765e-309`, a positive subnormal-scale mathematical probability;
- df=2: `3.094346047382579e-617`, mathematically positive but below positive binary64
  representability.

The evidence correctly distinguishes binary64 zero projection from a mathematical probability
of zero. The df=1 subnormal cell and the df=2 zero rounding cell are both supported by strict
primary enclosure containment.

## 9. Mathematical independence boundary

The primary route uses rigorous regularized incomplete-beta enclosures. The secondary route is
method-distinct density quadrature plus an analytic tail bound. The review inspected the
positive-tail bound and found it consistent with the Student-t density's power-tail majorant and
integration to infinity.

Both routes nevertheless share Arb ball arithmetic. The candidate and review protocol retain
this as weak independence and do not claim a cross-library oracle. This limitation does not
invalidate the exact-enclosure evidence, but it bounds the public interpretation.

## 10. Closure receipt fail-closed behavior

The new receipt validator accepts only the exact pending-review receipt and rejects mutations of:

- artifact digest;
- source blobs;
- secondary-overlap evidence state;
- strict rounding-cell state;
- dependency fallback state;
- p-value closure;
- M2 closure; and
- df/platform/execution/domain/runtime/final-code promotion.

Its hostile-shape tests cover hidden own properties, symbol keys, accessors, sparse arrays,
throwing proxies, and cycles. Caller-provided getters are not invoked.

## 11. Regression and CI

Exact final head `ec2c645d9527ffeee45044c6b274d0e70f7eb88c` completed:

- CI `33457731042`: success;
- paired-t candidate evidence `33457731116`: success; and
- paired-t runtime-series candidate evidence `33457731056`: success.

Formatting, markdown lint, typecheck, repository validation, test suite, generated-file checks,
Phase 1/2A regressions, oracle comparisons, and the cross-platform jobs are green.

## 12. Readiness and authority boundary

`evidence-readiness.json` remains unchanged in PR #81 and therefore still reports
`p_value_enclosure_evidence.closure = incomplete` and M2 open. That is intentional: this review
is an evidence disposition, not the integration state transition.

The reviewed M2-B selection is already durably recorded separately. A subsequent integration
increment may use both reviewed inputs to close M2 while keeping all support/runtime selections
unset.

RFC #25 remains open. No authority, supported df, platform, supported-execution predicate,
supported domain, runtime, final public reason-code, Public Check, bundle, R2-D5, or Release 2
transition is authorized here.

## 13. Findings

- BLOCKER: none.
- SHOULD-FIX: none.
- NICE-TO-HAVE: none.

## 14. Disposition

GO means only that the fixed p-value evidence artifact satisfies the six recorded p-value
closure items as a reviewed, non-authoritative evidence input and may proceed to an explicit M2
integration state transition.
