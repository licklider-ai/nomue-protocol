# R2-D5 p-value enclosure evidence closure adversarial review protocol

## A. Identity gate

Review the exact PR head from a clean or equivalent isolated checkout. Confirm the merge base is
the declared current `main` base and the increment is limited to the p-value enclosure evidence
closure receipt, its fail-closed validator and tests, and this protocol.

Expected base when this protocol was authored:

`43481c1ee6aa1c3775c4b09c6fe300d093421123`

The review evidence itself is an already-generated GitHub Actions artifact from exact generator
commit:

`98da47599053d3e29a2c42f274ffc9c239621ded`

Any unreviewed numerical implementation change, authority change, support promotion, or artifact
substitution is a blocker.

## B. Fixed artifact identity

Independently fetch GitHub Actions run `33452181213` and artifact `9780152851` named:

`release-2-paired-t-pilot-98da47599053d3e29a2c42f274ffc9c239621ded`

Require the downloaded ZIP SHA-256 to equal:

`sha256:cf092f0b3bfd4cdb8a32e5fb9864f564390dd0027f847b591be1262c134d1299`

Confirm the workflow run's head SHA is exactly the generator commit above. If the artifact has
expired or cannot be independently fetched, return `NO-GO`; regenerate and re-fix a new artifact
instead of reconstructing its contents from the receipt.

Verify `MANIFEST.sha256` and require the internal file hashes recorded in
`p-value-enclosure-evidence-closure-candidate.json` to match independently computed hashes.

## C. Source and environment binding

Confirm the artifact copies of `generator.py`, `cases.json`, and `requirements.txt` are byte
identical to those files at generator commit `98da475...` and that the same repository blobs are
still present at the review head. The expected Git blob identities are recorded in the receipt.

Confirm `environment.json` binds:

- CPython 3.12.14;
- python-flint 0.9.0;
- FLINT 3.6.0;
- one Arb thread;
- Linux x86_64; and
- the exact requirements hash.

Run the checked-in bundle validator against the extracted artifact with expected generator commit
`98da475...`. It must return zero errors.

## D. Closure item 1: no unconditional secondary-overlap success

Inspect `certify_p_case` and the p-value certificate validator.

For each of the three certified p-value cases:

1. parse primary and secondary exact rational enclosure endpoints independently;
2. recompute whether the two intervals overlap;
3. require `secondary.overlap_with_primary === true` only when exact overlap exists; and
4. verify generation raises on disjoint primary/secondary intervals rather than certifying on a
   boolean, label, or unconditional success path.

Mutate a valid certificate to forge the overlap flag and to create disjoint exact intervals. Both
must be rejected.

Boundary probes are not full p-value certificates. A positive boundary probe may state that
secondary evidence is still required; do not treat that disposition as a certified p-value.

## E. Closure item 2: exact enclosures and binary64 rounding cells

For all three p-value certificates and all six boundary probes:

1. parse the primary enclosure as exact rational endpoints;
2. independently decode the projected binary64 bit pattern to an exact rational;
3. derive its adjacent binary64 values and exact midpoint rounding-cell endpoints;
4. require the recorded cell endpoints to match that independent construction; and
5. require the primary enclosure to be strictly inside the cell.

Verify round-to-nearest, ties-to-even remains the target. A display decimal, ULP tolerance, or
policy-class margin is not a substitute for this exact rounding-cell proof.

## F. Closure item 3: executed df=1 and df=2 closed forms

Require the certified p-value corpus to execute and bind:

- `p-df1-t1` -> `df1-cauchy-tail`; and
- `p-df2-t1` -> `df2-closed-form-tail`.

Independently evaluate the formulas at sufficient precision and confirm their exact enclosures
overlap the primary Arb enclosures. The validator must reject missing, mislabeled, disjoint, or
wrong-df closed-form evidence.

Also confirm the maximum-finite-t boundary traces execute the same respective df=1 and df=2
closed-form routes and overlap their primary enclosures.

## G. Closure item 4: missing oracle dependencies fail closed

Run the artifact generator in an isolated Python environment without `python-flint`. A successful
fallback, silent approximation, alternate library, or partial artifact is a blocker.

The expected result is nonzero exit with the pinned dependency requirement. Then reproduce the
normal generation route using only `requirements.txt` and confirm the pinned dependency version
is used.

## H. Closure item 5: maximum-finite-t boundary cases

Require `cases.json` and raw output to contain exactly the declared boundary cases:

- `df1-max-finite-t` with statistic bits `7fefffffffffffff` and subnormal projection; and
- `df2-max-finite-t` with statistic bits `7fefffffffffffff` and zero binary64 projection.

For df=2, verify the evidence describes a positive mathematical tail that has no positive
binary64 representation. It must not claim that the mathematical probability itself is exactly
zero.

For df=1, independently verify the positive subnormal projected cell and strict enclosure.

## I. Closure item 6: provenance and output hashes

Independently recompute and cross-check:

- generator SHA-256;
- environment SHA-256;
- raw-oracle-output SHA-256;
- requirements SHA-256;
- cases and certificate bundle hashes; and
- the complete `MANIFEST.sha256` file set.

For every p-value certificate, require its provenance fields to bind the exact generator commit,
generator bytes, environment bytes, and raw oracle output bytes. Mutations of any binding must be
rejected by the existing validators.

## J. Mathematical and independence boundary

Reinspect the primary incomplete-beta identity, the complementary branch, and the method-distinct
secondary density-quadrature plus analytic-tail-bound inequality enough to ensure the six closure
repairs did not create a false certificate path.

The secondary route is method-distinct but shares Arb ball arithmetic with the primary route. This
is weak independence against shared-library defects and must remain disclosed. Do not upgrade it
to a cross-library oracle claim.

The closure decision concerns the rigor and internal binding of this explicit evidence corpus. It
does not make the finite corpus a supported domain and does not create a global truth-error bound.

## K. Mutation battery

At minimum require rejection of:

- artifact digest substitution in the closure receipt;
- generator/source blob substitution;
- internal file-hash substitution;
- false secondary-overlap state;
- weakened strict-rounding-cell state;
- deleted or altered df1/df2 maximum-finite-t case ids;
- fallback-oracle promotion;
- missing prohibited claims;
- premature `p_value_enclosure_evidence_closed = true`;
- premature `m2_closed = true`; and
- any supported df/platform/execution/domain/runtime or final-reason-code promotion.

Also attack the closure receipt validator with hidden own properties, symbol keys, accessors,
sparse arrays, throwing proxies, and cycles. It must fail closed without invoking caller-provided
getters or leaking an exception.

## L. Repository regression and invariants

Run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
```

Run the focused closure-candidate tests and the existing paired-t certificate/evidence tests.
CI is corroboration, not a substitute for semantic review.

Confirm current `evidence-readiness.json` remains byte-identical in this increment and continues
to report `p_value_enclosure_evidence.closure = incomplete`. The M2-B selection review result may
already be present, but M2 remains open until a later explicit integration sync.

Confirm RFC #25 remains open and that authority, registries, schemas, conformance, Public Checks,
bundles, Release 1, supported domain, and runtime support do not change.

## M. Verdict

Return exactly `GO` or `NO-GO`.

`GO` means only:

> The fixed p-value evidence artifact satisfies the six recorded p-value enclosure closure items
> as a reviewed, non-authoritative evidence input and may proceed to an explicit M2 integration
> state transition.

`GO` does not itself mutate `evidence-readiness.json`, close M2, select support or runtime, freeze
final reason codes, complete R2-D5, close RFC #25, or complete Release 2.

If possible, record the result on a neutral branch rooted at the exact review head by adding only:

`review-inputs/r2-d5-p-value-enclosure-evidence-closure/REVIEW-RESULT.md`
