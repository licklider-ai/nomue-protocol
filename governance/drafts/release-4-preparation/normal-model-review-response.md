# Normal-model review response

Status: author-side informative repair, 2026-09-09; NOT_READY.
No merge, source-hold closure, method adoption or public discussion is recorded.

## Fixed review and repair input

- Author delivery: `c78d4d27163ccc6128712e1818dc6a0562695515`.
- Independent review: [PR 246](https://github.com/licklider-ai/nomue-protocol/pull/246),
  commit `4013118bdd253a0420cc84af1e78c35cdf048c37`.
- Review file: `review-inputs/r4-normal-model-source/REVIEW-RESULT.md`.
- Review blob: `9efcc51a4978b3b539de4424d08c7a265c90e1ab`.
- Review verdict: bounded source and derivation GO; zero blockers, one
  SHOULD-FIX and four NICE-TO-HAVE findings; opening NOT_READY.

The review is preserved at its immutable commit and is not rewritten here.
It covers the Tian/Styan attachment and fixed author input, not the later
Yates attachments. Its independent model/provider/context disclosure remains
as recorded; no additional human independence is inferred.

## Responses

| Finding | Author response                                                                                                                                                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S-A     | Added a per-claim evidence map to the [source result](normal-model-source-result.md): cited criteria versus independently reconstructed degrees of freedom, densities, independence factorization and F-tail derivation. No probability proof is attributed to Tian/Styan. |
| N-A     | Added the bounded rectangular-dimension observation without repairing the source or relying on (2.10).                                                                                                                                                                     |
| N-B     | Explained invertibility and equivalence of the probe criterion to the paper's covariance-product criterion. The probe is unchanged.                                                                                                                                        |
| N-C     | Clarified in the [scope proposal](normal-model-opening-scope.md) that staging unbalanced S6 does not waive balanced-case independent numerical oracles.                                                                                                                    |
| N-D     | Corrected capitalization after the semicolon in the [claim map](opening-claim-map.md).                                                                                                                                                                                     |

These are author responses awaiting confirmation, not self-issued CLOSED findings.
No numerical formula, script, transcript or scope boundary has changed.

## Proposed steward disposition

For review and explicit acceptance, the proposed decision is to accept PR 246's
bounded source/derivation assessment for the stated independent, common-variance
normal fixed-factor 2 by 2 model. The probability proof rests on the explicit,
independently verified derivation; the supplied original matrix paper
corroborates cited criteria. No printed primary proof of each probability step
has been inspected. This evidentiary split is the basis of the decision request,
not a claim that every historical source was obtained.

S5 can be treated as nonblocking for this bounded marginal-F opening claim on
that basis, without closing the wider classical-calibration/interval programme.
S1/S2/P1/S3/S4/S6 can be staged outside this first proposed opening where the
review finds no retained-claim dependency; their wider obligations remain.
S6 is not executed, and balanced-case independent numerical oracles remain due.

The later Yates copies are additional evidence awaiting a separately traceable
source investigation. Their receipt does not retroactively expand PR 246's input.
They need not invalidate its finding that this bounded definition uses no
Yates-dependent attribution.

R4-P5 exact clauses, identifiers, enclosing surfaces and highest affected tier,
R3 dependency reconciliation, and R4-P6 assembled-proposal review remain.
No discussion timestamp, duration or supported runtime is issued here.

## Confirmation instructions

Read PR 246 Sections 5, 9 and 12 at the pinned review commit, then inspect this
successor's evidence map and responses. Confirm S-A and N-A through N-D against
those findings. Verify the probe, result and original handoff remain byte-identical
to the author delivery. Distinguish repair confirmation, steward evidence/scope
disposition and an eventual assembled-proposal opening decision.

Authoring assistance: OpenAI Codex in the existing author context. This response
is not an additional independent scientific review.

## Validation

Prettier, Markdown lint (395 files, zero issues), typecheck and diff whitespace
checks pass. Repository validation and the 19-file generated-content check pass
via `node --import tsx tooling/src/validate.ts` and
`node --import tsx tooling/src/generate.ts --check`. Their pnpm wrappers initially
failed because the tsx CLI IPC socket was denied (EPERM); the direct invocations
execute the same repository programs without that CLI socket.
The original probes, results, handoff, reviews and authoritative artifacts are
unchanged. No numerical re-execution was needed for this prose-only increment.
