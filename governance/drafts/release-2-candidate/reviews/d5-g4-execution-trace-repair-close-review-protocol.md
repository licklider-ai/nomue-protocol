# R2-D5 G4 execution-trace refusal repair close-only review protocol

## Commission

Perform an independent, close-only adversarial review of the two blockers found in
the Release 2 paired-t G4 actual-execution trace candidate. Decide whether the exact
repair commit below closes F1 and F2 without changing any accepted value, accepted
trace, authority surface, checkpoint, readiness state, or support claim.

Do not repeat the already completed review of the closed input contract, exact
binary64 primitive verifier, trace digest, complete forged-trace resistance,
checkpoint/readiness promotion resistance, or authority boundary except where a
repair regression could affect them. A new finding outside F1/F2 must be supported by
a concrete regression or counterexample introduced by the repair.

`CLOSED` permits the candidate-scoped `GO` only for merge as unissued,
non-authoritative R2-D5 decision-preparation material. It does not approve a G4
mathematical-truth error bound, tail or confidence-interval composition, a supported
resource bound, platform, execution predicate, domain, runtime, Public Check,
bundle, R2-D5 completion, or Release 2.

## Exact identities

- Original implementation commit:
  `12eff9025386eb5b73db107ff4b838613b09174d`
- Original implementation tree:
  `d66bac8af947f28cf6fc01d00362538d6dd74808`
- Original review-input commit:
  `215de9a8cc6f245782964befd13a9ba287a8fd49`
- Original review-result commit:
  `860a3da434dbb1a1df0d6d997e166c52296639ef`
- Original review-result path:
  `review-inputs/r2-d5-g4-execution-trace-candidate/REVIEW-RESULT.md`
- Original verdict: `NO-GO`
- Original findings: exactly F1 and F2, both `BLOCKER`; no `SHOULD-FIX` or
  `NICE-TO-HAVE`
- Repair commit:
  `6c9c3e57c9c50fc39f39823f036b9423fe443f96`
- Repair tree:
  `095b7a4d49a1930f1f9b7b270deeefa367ef4431`
- Sole repair parent:
  `215de9a8cc6f245782964befd13a9ba287a8fd49`
- Expected repair delta: exactly 2 paths, 202 insertions, 46 deletions

The close-review input commit adds only this protocol and its review-index entry to
the repair commit. Work from a genuine fresh clone and detached checkouts. Verify
every commit, tree, parent, path, and line-count fact before reviewing behavior. A
mismatch is `NOT-CLOSED`.

The only repaired paths are:

1. `tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts`
2. `tooling/tests/paired-t-g4-execution-trace-candidate.test.ts`

## Required context

Read in full:

- the original adversarial review protocol;
- the original `REVIEW-RESULT.md` at its pinned commit;
- both repaired files;
- `reference/spikes/paired-t.ts`; and
- the G4 checkpoint and numerical-readiness block.

Confirm that public RFC issue #25 remains open.

## F1 close: per-pair first-failure order

The original candidate validated every sorted pair's completeness and
repeated-measurement declaration before executing any pair difference. This allowed
a later pair's structural defect to preempt an earlier pair's
`DIFFERENCE_OVERFLOW`. The reference instead performs completeness, declaration, and
difference-overflow checks together for each sorted pair.

Verify by code inspection and reviewer-owned inputs that the repair now follows the
reference order exactly. At minimum exercise:

1. earlier `DIFFERENCE_OVERFLOW`, later `INCOMPLETE_PAIR`;
2. earlier `DIFFERENCE_OVERFLOW`, later
   `EXPERIMENTAL_UNIT_DECLARATION_MISMATCH`;
3. earlier incomplete pair, later difference overflow;
4. earlier declaration mismatch, later difference overflow;
5. three or more pairs with each defect in first, middle, and last sorted position;
6. observation insertion-order reversal and reproducibly seeded permutations; and
7. lexically difficult pair identifiers whose code-unit order differs from numeric
   intuition.

For every input, compare success/refusal, first error, `pairId`, and `observationId`
with the unchanged reference implementation. There must be no mismatch, uncaught
exception, accessor activation, or support-claim leak.

Also confirm that the repair does not perform an extra untraced arithmetic pass for
accepted inputs: each accepted pair subtraction must still be represented by exactly
one trace node in canonical pair order.

## F2 close: non-root reduction overflow classification

The original recorder accepted a correctly rounded Infinity result from finite
operands. If that result occurred below the reduction root, the parent add then
received Infinity as an operand and caused `execution_trace_verification_failed`
before the graph could report its reviewed accumulation-overflow classification.

Verify by code inspection and reviewer-owned exact witnesses that every non-finite
reduction add is classified immediately after its own correctly verified trace node
and before it becomes a parent operand. At minimum exercise:

1. the original n=3 mean witness with differences
   `[1, MAX_VALUE, MAX_VALUE / 2]`;
2. an n=2 root mean-overflow control;
3. the original n=4 variance witness using `b = 1.2e154` and paired outcomes
   `[b, 0], [-b, 0], [b, 0], [-b, 1]`;
4. an n=2 root variance-overflow control;
5. non-root overflow at left and right subtrees and at more than one tree depth;
6. power-of-two and non-power-of-two pair counts; and
7. a reproducibly seeded broad extreme-exponent corpus compared with the unchanged
   reference.

Mean reduction failures must be `MEAN_ACCUMULATION_OVERFLOW`; variance reduction
failures must be `VARIANCE_ACCUMULATION_OVERFLOW`. No reachable graph overflow may
fall through to `execution_trace_verification_failed`, and an actual primitive
verification defect must not be relabeled as a graph overflow.

## Accepted-result and trace invariance

Compare the original implementation commit and repair commit directly. Use at least:

- every pair count from 2 through 201;
- all accepted support-domain boundary controls;
- non-power-of-two sizes and neighborhoods around powers of two;
- signed zero, subnormal, minimum-normal, large-finite, and cancellation cases; and
- a reproducibly seeded broad accepted corpus.

For every accepted input, require byte-identical complete serialized results,
including trace input, node schedule, operand sources, operand and result bits,
outcome source bindings, node count, digest, returned values, verification counts,
and every false completion/support claim. Report a corpus rollup hash. Any accepted
result or trace difference is `NOT-CLOSED`.

Confirm specifically that the successful node-count formula remains `5n + 3` and
the n=201 maximum remains 1,008. The review-only 201-pair and 2,048-node ceilings
must remain unselected and must not become support bounds.

## Refusal regression and hostile boundary

Re-run every case in `support-domain-boundary-cases.json` and a reviewer-owned
multi-defect refusal corpus against both the reference and repair. Require the same
first-failure classification and details. Re-run representative hostile input,
trace, and checkpoint shapes to confirm that no exception or claim leak was
introduced by moving pair checks into execution.

Confirm that the repair-specific `GraphRefusalError` cannot escape the public
evaluator and cannot be constructed from caller input. Check that resource-limit and
genuine primitive-verification failures retain their distinct candidate-level
classifications.

## State, authority, and regression boundary

Confirm byte identity between the review-input parent and repair for every path
except the two declared repaired files. In particular, the following must be
unchanged:

- G4 checkpoint and numerical readiness;
- existing reference G4 source;
- tail and truth-error implementations and evidence;
- authority, registries, schemas, conformance, specification, generated views,
  Release 1, Public Checks, bundles, and verifier dispatch; and
- all support, issuance, R2-D5, and Release 2 states.

Recompute the authority snapshot hash. Run frozen-lockfile installation, the focused
tests, full repository check, generated-file checks, and a final clean-tree check in
the fresh clone. Record exact environment versions and any non-weakening workaround.

## Required report

Write only:

`review-inputs/r2-d5-g4-execution-trace-repair-close/REVIEW-RESULT.md`

Base the neutral reviewer branch on the public close-review input commit. Do not
modify implementation, tests, checkpoint, readiness, protocol, authority, generated,
or other repository files.

Use one verdict:

- `CLOSED`: F1 and F2 are both closed, no repair regression or new actionable
  finding exists, and the bounded candidate-scoped `GO` is effective; or
- `NOT-CLOSED`: at least one blocker remains, a repair regression exists, or a new
  actionable finding prevents merge.

Report exact identities, reviewer separation, witness and corpus counts, random
seeds, accepted-result rollup hash, classification mismatches, findings, limitations,
environment, command results, output branch/commit/path, unchanged implementation
files, and clean working-tree state.
