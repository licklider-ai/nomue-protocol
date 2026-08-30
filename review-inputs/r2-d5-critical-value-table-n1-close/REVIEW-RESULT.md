# R2-D5 critical-value table evidence N1 close-only review result

## Verdict

**CLOSED.**

The accepted N1 repair at commit `0738558902dbcc851adbfd037a4f8f157370a46d` may merge, and the
original candidate-scoped `GO` for the fixed-95 critical-value table evidence remains valid. No
`BLOCKER`, `SHOULD-FIX`, or `NICE-TO-HAVE` finding was identified in this close review.

This verdict is close-only. It does not approve a final table or hash, supported df, endpoint
truth, platform support, runtime support, a Public Check, a bundle, R2-D5 completion, Release 2
publication, or RFC closure. RFC issue #25 remains open.

## 1. Identity

| Item                    | Value                                                                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository              | `https://github.com/licklider-ai/nomue-protocol`                                                                                                                                             |
| Review protocol         | `governance/drafts/release-2-candidate/reviews/d5-critical-value-table-evidence-n1-close-review-protocol.md`, read in full at review-input commit `943a36fc82cacf163a20d49d58aff6e2e9988a27` |
| Baseline (PR #47 merge) | `c0d6b2d8512e473111f98f9dba91ffc8bc97f3b8`                                                                                                                                                   |
| Repair commit           | `0738558902dbcc851adbfd037a4f8f157370a46d`                                                                                                                                                   |
| Repair tree             | `678e12058907010de8e3170af0f35d78948e1ec8` (verified)                                                                                                                                        |
| Repair parent           | `c0d6b2d8…` only (single parent, verified)                                                                                                                                                   |
| Review type             | Independent, adversarial, close-only; fresh clone, detached exact-hash checkouts                                                                                                             |

All checks below ran in a genuine fresh clone with the repair commit pinned by exact hash. The
repair branch and implementation files were not modified; all probes ran outside the repository.

Lineage confirmations:

- the baseline `c0d6b2d8…` is a two-parent merge of `612d0b94…` and the originally reviewed
  implementation `19139d51aad108125ef9854c304c698ce9b15ade`, and its tree equals the reviewed
  implementation tree `e90992e1…` (the PR #47 merge introduced no content change);
- the original independent review-result commit `24456c9d3d7faef56bbb731dac57045401780ea6` is a
  direct child of `19139d51…`, adds exactly one file (the review result), and still reports
  `GO` with zero `BLOCKER`, zero `SHOULD-FIX`, and exactly one finding ID — `N1`;
- the review-input commit `943a36fc…` is a direct child of the repair commit and adds only the
  close-review protocol and a review-disposition document under governance drafts.

The baseline-to-repair delta is exactly the four declared paths —
`tooling/r2-paired-t-evidence/README.md`,
`tooling/src/spikes/validate-paired-t-critical-value-table-evidence.ts`,
`tooling/src/spikes/probe-paired-t-critical-value-table-evidence.ts`,
`tooling/tests/paired-t-critical-value-table-evidence.test.ts` — with **70 insertions and
2 deletions**, matching the intended delta exactly. `git diff --check` is clean. No generator,
certificate core, case manifest, candidate checkpoint, reviewed table cell, evidence hash,
registry, schema, conformance fixture, verifier path, or Release 1 artifact changed
(the checkpoint diff across the repair is empty, and no path outside the four files appears).

## 2. Documentation-boundary result

The README now contains a dedicated paragraph immediately after the mutation-rejection
sentence:

> The validator proves byte binding, structure, authority posture, cross-df monotonicity, and
> the internal exact-rational consistency of recorded claims. It does not execute the rigorous
> numerical methods or establish cell-level mathematical truth for an externally supplied
> bundle; that truth requires regeneration from the pinned source and independent numerical
> review.

This states both required claims without ambiguity: what standalone validation proves (byte
binding, structure, authority posture, cross-df monotonicity, internal exact-rational
consistency) and what it does not (cell-level mathematical truth, which requires regeneration
from pinned source plus independent numerical review). Nothing in the revised wording implies
that a matching hash, an internally coherent certificate, or a successful standalone validator
run proves the recorded numerical enclosures true. This closes the documentation half of N1.

## 3. Monotonicity and hostile-input results

The comparison itself was inspected, not trusted by name.
`arePositiveFiniteBinary64HexesStrictlyDecreasing` accepts only strings matching lowercase
`[0-9a-f]{16}`, rejects a set sign bit (negative values and negative zero), exponent `0x7ff`
(infinities and NaNs), and positive zero, and then requires each entry's unsigned bit pattern to
be strictly smaller than its predecessor's. For positive finite binary64 values — subnormals
included — the unsigned bit encoding is strictly monotone in numerical value, which the
reviewer confirmed both structurally (sign-cleared IEEE 754 ordering) and empirically over
200,000 randomized positive-finite bit-pattern pairs with **zero** order mismatches. The
validator invokes the helper over the 200 table cells whenever all entries pass shape checks and
pushes the dedicated error when it fails, so each later df cell must have strictly smaller bits
than its predecessor.

Direct helper exercise (reviewer harness, 23 cases, all as required):

- strictly decreasing sequences pass — including the real regenerated 200-cell table and a
  decreasing positive-subnormal pair (positive finite, so in scope);
- equal adjacent cells fail; an increasing adjacent pair fails; the reversed real table fails;
  the real table with one equal or one incremented neighbour fails;
- positive zero, negative zero, negative values, `+Infinity`, `NaN`, malformed hex, uppercase
  and mixed-case hex (with genuinely alphabetic digits), short hex, long hex, whitespace-padded
  hex, non-string entries, and `null` entries are all not accepted as a valid decreasing table.

Bundle-level exact-error requirement: starting from the valid regenerated bundle, the reviewer
made cell df=150 equal to cell df=149, rebuilt the ordered-table hash, certificate-bundle hash,
and `MANIFEST.sha256` with the repository's exact byte formats, and ran the exported validator.
It rejected the bundle with the exact required error present in its error list:

```text
critical-value table cells must be strictly decreasing as df increases
```

Probe failure-mode requirement: the probe's new third tuple element asserts
`errors.includes(expectedError)` and throws
`expected validator error was not reported: …` when the exact string is absent, so it cannot
pass on an unrelated rejection. This was confirmed by inspection and demonstrated empirically
with a counterfactual: the same equal-cell mutation with the table truncated to 199 cells is
still rejected by the validator, but **without** the monotonicity error (the count error fires
instead) — precisely the state in which the probe's assertion would throw rather than count a
pass.

## 4. Regenerated bundle, probe, and ordered-hash results

From the fresh clone at the exact repair commit, with a fresh Python virtual environment holding
only the pinned dependency:

- generation: 200/200 critical-value certificates, no uncaught exception
  (CPython 3.12.3, python-flint 0.9.0, FLINT 3.6.0, single-threaded);
- the unmodified bundle validates: `paired-t fixed-95 critical-value table evidence bundle: valid`;
- the bundled mutation probe rejects **21/21** mutations (the 20 original probes plus the new
  `nondecreasing critical-value cells` probe) with no uncaught exception;
- the ordered-cell hash was independently recomputed from a from-scratch byte reconstruction of
  the header, target line, and 200 `df=<df>;binary64=<hex>` lines:
  `sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0` — unchanged from
  the original review and equal to the regenerated manifest's `table_content_sha256`, proving
  every reviewed df/hex cell is byte-identical to the originally reviewed table;
- the 200 regenerated values remain strictly decreasing;
- the new unit coverage runs green (10/10 tests in the dedicated test file).

## 5. Authority and Release 1 invariance

- The content-addressed authoritative snapshot hash is byte-identical at the baseline and the
  repair commit: `sha256:d934f1781ead93c909571ec2c9af820f178568e999b39628076a38537408ed4c`.
- The candidate checkpoint is untouched by the repair (empty diff), and the regenerated bundle's
  checkpoint copy validates byte-for-byte against the checkout and against the closed expected
  surface: `status` non-authoritative, `issuance` unissued, selection state
  `evidence_evaluation_only_not_table_selected`, `runtime_support_enabled` false,
  `final_table_selected` false, `supported_maximum` null, `table_content_hash` null,
  `independent_review_complete` false, all six held decisions and all five prohibited claims
  intact — endpoint truth, platform, Public Check, bundle, R2-D5, and Release 2 states all
  unchanged.
- No registry, schema, conformance, reference, specification, generated, or Release 1 evidence
  path appears in the delta.

## 6. Repository-wide check result

From the clean exact checkout at the repair commit:

- `corepack pnpm install --frozen-lockfile`: success;
- `corepack pnpm check`: exit 0 (full suite — format, markdown lint, typecheck, validate,
  tests, generated-file checks, Phase 1 and Phase 2A suites);
- the `tsx` entry points ran normally in this environment, so no substitution was needed and no
  underlying check was waived;
- `git status --porcelain` afterward: empty, with `HEAD` still at the exact repair commit.

## 7. Findings

None. No `BLOCKER`, no `SHOULD-FIX`, no `NICE-TO-HAVE`.

## 8. Close-only verdict

**CLOSED.** The accepted N1 repair does exactly the four intended things — the validator-limit
clarification, the strict positive-finite binary64 cross-df monotonicity check, the dedicated
coherently rehashed mutation probe bound to the exact error, and direct unit coverage of the
comparison helper — and changes no reviewed numerical content, evidence hash, or authority
state. The original candidate-scoped `GO` recorded at `24456c9d…` remains valid, with its
explicitly unapproved claims unchanged.

## Provenance

- Contributor role: independent close-only reviewer, separate from the repair author; the same
  reviewing role that recorded the original N1 finding.
- Review scope: the four-file delta `c0d6b2d8…` → `0738558902…` (tree `678e1205…`), the
  close-review protocol at `943a36fc…`, and the invariance of the previously reviewed evidence
  surfaces as dependencies.
- Independence boundary: the monotonicity helper, exported validator, and mutation probe were
  exercised through reviewer-owned harnesses with reviewer-constructed inputs and coherent
  rebuilds in the repository's byte formats; the 200-cell bundle was regenerated from pinned
  source rather than trusted; the completed 200-cell numerical review was not repeated, per the
  protocol's scope.
- Date: 2026-08-30.
