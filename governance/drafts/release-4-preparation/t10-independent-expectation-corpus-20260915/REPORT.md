# T10 stopped comparison assessment

Status: **UNISSUED CANDIDATE**.

**T10 INDEPENDENT EXPECTATION MISMATCH**.
**T10 INDEPENDENT-EXPECTATION CORPUS — NOT READY**. T10 is not complete.

## Frozen target and chronology

Base/direct candidate: `60ce3a41770edde6e3cf6dc67ff470cd6207af10`.
Numerical source: `66fa2bc201c86c62f21bb94825479427c24d8522`.
Main observed at start: `3880db43a64e1758494f3c78f6850daab0e3e9e9`.
Branch: `research/r4-t10-independent-expectations-20260915`.

The builder assembled and checked 174 raw Record fixtures, 15 component-only
projection vectors and seven component-only analytic tail vectors without executing
T07/T08/T09 or G5. Thirty-three source pins and a static import/subprocess allowlist
passed. Expectations were committed as `d7fcb703da0aa15a78e0d1594b24fc3d34bf622e`
before the first candidate invocation. Freeze SHA-256:
`6fe8bb5fd1b4cdcf1d71da9748a6d64fc7d184bfd10a5b2fb17a5e0ca2d8e8a8`.

Normal Windows comparison then matched 170 fixtures and stopped at fixture 171,
`structure/overflow-number`. The remaining three fixtures were not executed.
The 15 projection and seven tail component vectors were constructed and self-checked,
but were not executed against the candidate. Optimized and Linux comparison were
not started after the material contradiction. There is no cross-mode or integrated
Linux T10 success claim. The actual normal core was CPython 3.12.10, optimize=0.
The failing fixture never reaches the numerical core, so it has no core mode.

## T10-F01: frozen final expectation has a provenance defect

Input hash: `a1f676db5dbe751ebcc0ffcc684890c48f98b9dc0c7815a341d610ff14c999e1`.
The existing T07 fixture places the valid JSON numeric token `1e400` at
`/payload/result/cell_summaries/0/mean`. Parsing produces nonfinite binary64.
T07 correctly reports structural conformance failure, NRS-SCHEMA-INVALID.

T10 incorrectly lifted that local T07 category into an unconditional completed
conformance-fail report with four verification checks not_run. An input outside the
finite numeric model has no JCS digest projection. The existing verifier refusal
contract requires refusal when a normal report cannot be produced; its existing
canonicalization_failure category covers valid JSON outside that numeric model.
Therefore the frozen **end-to-end** expectation is overstrong even though its
T07-local expectation is correct. Static provenance/import checks did not detect
this layer-boundary mistake. T10 does not claim every frozen expectation is valid.

The frozen corpus remains unchanged as a historical precomparison artifact. The
post-detection authority assessment in DIAGNOSIS is not silently substituted into
expected data, and there is no rerun declared green.

## T10-F02: candidate loses the canonicalization-failure classification

Actual T09 result: execution_refusal, refusal_kind=internal_error,
NRS-INTERNAL-VERIFIER-ERROR. No report and no numerical invocation are emitted.

`reportBase` recomputes the digest before returning the conformance-failure report.
The existing JCS serializer throws `CanonicalizationError` for nonfinite numeric
input. `evaluate` catches it using the generic internal-error handler. A schema-valid
refusal is produced, but its category denotes an unexpected verifier failure instead
of the known input/canonicalization failure. This is a reporting integration defect,
not a numerical truth mismatch, resource exhaustion, or scientific invalidity claim.

Independent existing sources, inspected during bounded diagnosis:

- NRS-CORE-0011 and the refusal-kind descriptions in
  `spec/verification/verifier-refusal.md`: no fabricated report; canonicalization_failure.
- NRS-VERIFY-0025 in `spec/verification/relying-party-interface.md`: canonicalization
  refusal maps to existing exit bucket 2, internal error to 5.
- `reference/verifier/src/verify-phase2a-021.ts` catches CanonicalizationError separately;
  `verify.ts` supplies NRS-NON-FINITE-NUMERIC-VALUE and NRS-CANONICALIZATION-FAILED.
- T09's own reason inventory already includes NRS-CANONICALIZATION-FAILED.

The reference code corroborates the authority; it does not define new semantics.
The exact minimal reason-list requirement is not newly selected here. Both the
frozen report expectation and the actual internal-error category need disposition.
No public registry, schema or CLI change is performed by this diagnosis.

## Why existing green evidence did not exclude this mismatch

The T09 loop over the 49 T07 Record fixtures checked closed output validity and
whether numerical execution was bypassed. It did not bind each rejected fixture's
final reason/category. An internal-error refusal satisfies both those checks.
T10's independently fixed final-state comparison exposed the missing distinction.
A completed rejection and a safe refusal are not interchangeable golden outcomes.

## Scope and remaining work

T03-T09, all G5 source, runtime eleven, main and PR #331 are unchanged. No expectation
is adjusted to candidate output; no candidate repair, extra resource stress, T11,
whole-candidate freeze or release approval is performed. The later packet checker is
artifact preservation validation only. Historical T09 Linux evidence remains a
lifecycle reference, not a T10 candidate-vs-independent corpus run.

Prepared by the continuing task's Codex assistant from public repository artifacts.
No additional investigator, independent close review or model-build attestation is
claimed. Existing mathematical review is reused within its stated scope. The new
n=2 rational-tail cases specialize an already reviewed identity; their finite exact
rounding-cell checks are not a new whole-domain proof.
