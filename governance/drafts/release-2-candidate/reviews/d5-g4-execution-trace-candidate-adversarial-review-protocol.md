# R2-D5 G4 actual-execution trace candidate adversarial review protocol

## Commission

Perform an independent, adversarial, delta-scoped review of the Release 2 paired-t
G4 actual-execution trace candidate. The exact implementation commit below may
remain in the repository only as non-authoritative, unissued R2-D5
decision-preparation material if this review returns `GO` with no unresolved
blocker.

This review does not select a G4 mathematical-truth error bound, compose G4 with the
Student-t tail or confidence-interval paths, select a supported pair or trace-node
bound, select a supported platform or execution predicate, register a supported
domain, issue a Public Check or bundle, close R2-D5, or authorize Release 2.

## Independence and source boundary

The reviewer must be independent of the implementation authoring context and must
work from a genuine fresh clone. Repository tests are regression evidence only.
Every decision-bearing property below also requires reviewer-owned code, an
independently derived oracle or schedule, or direct code and byte inspection.

No new numerical or statistical premise is introduced by this increment. The
candidate traces the already reviewed G4 operation graph and reuses the already
reviewed exact primitive verifier. If review identifies a need to change the G4
formula, reduction tree, first-failure order, primitive semantics, support boundary,
or mathematical-truth model, stop and require a separately scoped research or
implementation increment.

## Exact review target

- Implementation commit:
  `12eff9025386eb5b73db107ff4b838613b09174d`
- Implementation tree:
  `d66bac8af947f28cf6fc01d00362538d6dd74808`
- Sole parent / baseline:
  `28a04792fe8dfedd4d858780cf7c2b0a4eaa88c2`
- Baseline tree:
  `d76c479c9259c5e831969e9858ec211b713295cb`
- Baseline identity: merge of PR #54
- Expected implementation delta: exactly 9 paths, 1,501 insertions, 0 deletions

The public review-input commit adds only this protocol and the review-protocol index
entry to the implementation commit. Record both commits and trees, verify the direct
parent relationship, and reproduce the exact implementation delta before reviewing
semantics. Any mismatch is a blocker.

The implementation paths are:

1. `governance/drafts/release-2-candidate/README.md`
2. `governance/drafts/release-2-candidate/numerical/README.md`
3. `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
4. `governance/drafts/release-2-candidate/numerical/g4-execution-trace-candidate.json`
5. `governance/drafts/release-2-steward-ratification-package.md`
6. `tooling/src/spikes/paired-t-g4-execution-trace-candidate.ts`
7. `tooling/src/spikes/paired-t-numerical-readiness.ts`
8. `tooling/tests/paired-t-g4-execution-trace-candidate.test.ts`
9. `tooling/tests/paired-t-numerical-readiness.test.ts`

Confirm separately that the existing reference G4 source, tail implementation,
truth-error implementation, reviewed table bytes, candidate evidence, authoritative
paths, and generated authority snapshot are byte-identical to the baseline.

## Required repository context

Read at least:

- `AGENTS.md`;
- `CHARTER.md`;
- `AUTHORITY.md`;
- `governance/RFC.md`;
- `governance/ID-POLICY.md`;
- `governance/drafts/release-2-foundation-and-paired-t-rfc.md`;
- `governance/drafts/release-2-steward-ratification-package.md`;
- `governance/drafts/release-2-candidate/README.md`;
- `governance/drafts/release-2-candidate/numerical/README.md`;
- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`;
- `governance/drafts/release-2-candidate/numerical/g4-execution-trace-candidate.json`;
- `governance/drafts/release-2-candidate/numerical/support-domain-candidate.json`;
- `governance/drafts/release-2-candidate/numerical/support-domain-boundary-cases.json`;
- `governance/drafts/release-2-candidate/numerical/supported-execution-predicate-candidate.json`;
- `governance/drafts/release-2-candidate/reviews/d5-support-domain-predicate-adversarial-review-disposition.md`;
- `governance/drafts/release-2-candidate/reviews/d5-numerical-contract-decision-candidate-adversarial-review-disposition.md`;
- `governance/drafts/release-2-candidate/reviews/d5-supported-execution-predicate-adversarial-review-disposition.md`;
- `reference/spikes/paired-t.ts`;
- `tooling/src/spikes/paired-t-supported-execution-candidate.ts`;
- all changed implementation and test files; and
- all review results referenced by the three dispositions above.

Confirm that public RFC issue #25 remains open. Its state does not authorize support
or issuance during this review.

## Review questions

### A. Identity, delta, and authority boundary

Verify all pinned identities, the exact 9-path delta, and the absence of unrelated
changes. Confirm that the implementation did not change:

- `reference/spikes/paired-t.ts` or its G4 formula and failure order;
- the tail graph, truth-error proof, critical-value table, or their evidence;
- any authoritative registry, schema, conformance expectation, normative
  specification, generated authority view, Release 1 path, Public Check, bundle, or
  reference-verifier dispatch; or
- any selected support, platform, domain, resource bound, identifier, or reason
  code.

Recompute the authority snapshot hash. Any authority change, unreviewed numerical
change, or support promotion is a blocker.

### B. Closed input contract and G4 refusal invariance

Write a reviewer-owned hostile-input harness for the public evaluator. Verify exact
own-key, enumerable data-property, prototype, array-density, type, and length
requirements without relying only on repository tests. Include:

- ordinary, reversed-insertion, frozen, and null-prototype valid controls;
- missing, extra, inherited, symbolic, non-enumerable, accessor, class-instance,
  boxed, collection, typed-array, cyclic, and sparse shapes;
- throwing traps for prototype, own-key, descriptor, and value access;
- non-finite outcomes, signed zero, subnormal outcomes, extreme finite outcomes,
  duplicate identifiers, incomplete pairs, invalid condition declarations, and
  experimental-unit reuse; and
- observation and pair counts immediately below, at, and above the evaluation
  ceiling.

No accessor may run, no exception may escape, and no refusal may claim arithmetic
verification, support, platform, domain, or runtime. Independently compare every
existing G4 validation and first-failure classification with the unchanged reference
implementation. A new classification or reordered existing classification is a
blocker.

### C. Actual trace and deterministic schedule

Independently derive the only permitted G4 schedule for every pair count from 2
through 201. Do not call the candidate's schedule builder. Confirm the exact order,
labels, operand-source sequences, and binary64 operation kinds for:

1. one subtraction per canonical pair;
2. the floor-half recursive difference reduction;
3. mean division;
4. one centering subtraction per pair;
5. one squaring multiplication per pair;
6. the floor-half recursive squared-deviation reduction;
7. sample-variance division by `n - 1`;
8. standard-error-squared division by `n`;
9. square root; and
10. test-statistic division.

Verify that canonical pair order uses ascending code-unit pair identifiers, the
difference direction follows the declared condition order, and observation insertion
order does not alter a successful trace. Derive the node-count formula independently
and verify the exact 2,048-node boundary behavior. No successful trace may omit or
add a floating-point operation executed by the candidate graph.

### D. Exact primitive verification

Do not use `validatePairedTBinary64PrimitiveCandidate` as the oracle. Build or reuse a
reviewer-owned exact-integer or exact-rational binary64 verifier and establish that
every recorded `add`, `subtract`, `multiply`, `divide`, and `sqrt` result is the
roundTiesToEven result for the recorded operands.

Exercise exact, inexact, halfway, adjacent-halfway, cancellation, signed-zero,
subnormal, minimum-normal, overflow-adjacent, maximum-finite, and every-sign cases.
For square root, prove rounding-cell containment without using `Math.sqrt` as the
sole oracle. Run a reproducibly seeded broad primitive corpus and perturb every
recorded result by plus and minus one ULP where representable. An incorrect
acceptance, incorrect rejection, uncaught exception, or hidden dependence on the
host result being checked is a blocker.

### E. One-trace value binding, closure, and digest

Confirm that accepted returned differences, mean, sample variance, standard error,
t, and df are read from the same trace that passed verification. Verify that the
trace binds:

- canonical condition and repeated-measurement declarations;
- every pair, observation identity, experimental-unit identity, and outcome bits;
- all node sequences, labels, operations, operand sources, operand bits, and result
  bits;
- all output source sequences and output bits;
- pair count, df, node count, evaluation ceiling, format, and digest.

Independently reproduce the digest from the documented JSON payload order. Verify
deep immutability of the trace, input arrays and objects, node array and nodes, and
the returned result values.

Build coherent attacks that recompute the digest and all directly dependent fields.
At minimum mutate or forge: input outcome, pair identity, pair order, condition
order, repeated-measurement declaration, node omission, duplication, reordering,
sequence, label, operation, operand source, operand bits, result bits, output source,
output bits, pair count, df, node count, ceiling, format, and digest. Include valid
primitive operations in an invalid schedule and a forged complete graph with
internally consistent primitive results. Every attack must fail because the verifier
reconstructs the permitted schedule and outcome; a stale digest alone is not enough.

### F. Graph and boundary-corpus invariance

Compare the implementation commit with its parent and the unchanged G4 reference
using a reviewer-owned corpus. At minimum include:

- every pair count from 2 through 201;
- every case in `support-domain-boundary-cases.json`;
- non-power-of-two reduction sizes and neighborhoods around powers of two;
- reversed observation insertion order and lexically difficult pair identifiers;
- positive and negative zero, minimum subnormal, maximum subnormal, minimum normal,
  large finite magnitudes, cancellation, and overflow neighborhoods;
- exact-difference variance erased by binary64 rounding;
- all operation-stage refusal classes; and
- random or reproducibly seeded ordinary inputs over broad exponents and signs.

Require exact equality of success/refusal, first-failure classification and detail,
pair order, all algebraic values, and all binary64 bits. The reference result must be
unchanged. Any unexplained difference is a blocker.

### G. Trace verifier hostile shapes and failure isolation

Attack the trace verifier and checkpoint validator with missing, extra, inherited,
accessor, symbolic, non-enumerable, custom-prototype, non-JSON, cyclic, overlong,
sparse, and throwing-proxy data at every reachable nesting level. Try malformed and
oversized hexadecimal values, sequence numbers, arrays, labels, and decimal numbers.

All attacks must return deterministic nonempty errors without invoking accessors or
throwing. Verify that a primitive-verification failure, resource-ceiling failure,
input refusal, and reconstructed-schedule disagreement remain distinguishable and
never fall through to a candidate success or any support claim.

### H. Evaluation limits and denial-of-service boundary

Independently derive maximum successful node growth and exercise counts immediately
below, at, and above both declared evaluation ceilings. Attempt oversized observation
arrays, adversarial identifiers, deeply nested trace objects, large numbers of
unknown keys, enormous strings, and graph-shaped cyclic or aliased structures.

The evaluator and validators must fail deterministically within their stated input
surface and without an uncaught exception. Record any practical resource concern
even if it is outside candidate correctness. The values 201 and 2,048 must remain
evaluation limits only; treating either as a supported maximum is a blocker.

### I. Readiness, checkpoint, and promotion attacks

Build a reviewer-owned coherent mutation harness for
`g4-execution-trace-candidate.json` and `evidence-readiness.json`. Mutate every
top-level and nested field, delete each field, add undeclared fields, reorder semantic
arrays, change format and verifier source, weaken mutation disposition, change
evaluation limits, convert them to supported bounds, mark review or error closure
complete, claim tail or interval composition, select platform/domain/runtime support,
or promote issuance, Public Check, bundle, R2-D5, or Release 2 state.

Every real mutation must produce deterministic nonempty validation errors without an
uncaught exception. An unchanged deep copy must pass. Verify that the new readiness
block cannot silently disappear or regress to a pre-implementation state.

### J. Documentation truthfulness and full regression

Documentation must clearly separate:

1. exact reproduction of the reviewed G4 binary64 graph;
2. exact verification of recorded primitives;
3. the still-missing G4 mathematical-truth error ledger;
4. the still-missing composition with the tail and confidence-interval traces;
5. review-only pair and node ceilings;
6. an unselected supported-execution predicate and supported platform;
7. an unsupported, unissued, non-authoritative candidate; and
8. incomplete R2-D5 and Release 2 state.

Run dependency installation with the frozen lockfile, the focused tests, the full
repository check, generated-file checks, and a clean-tree check in the fresh clone.
Record exact tool versions and any environment-specific workaround. A workaround
must not weaken the executed checks.

## Required report

Write only
`review-inputs/r2-d5-g4-execution-trace-candidate/REVIEW-RESULT.md` on a neutral
reviewer branch based on the public review-input commit. Do not modify implementation,
checkpoint, readiness, authority, generated, test, or protocol files.

The report must contain:

- exact commit, tree, parent, delta, environment, and clean-clone identity;
- reviewer separation and source boundary;
- methods and independently derived oracles;
- per-section evidence, counts, seeds, digests, and mutation outcomes;
- exact findings classified as `BLOCKER`, `SHOULD-FIX`, or `NICE-TO-HAVE`;
- limitations and unreviewed claims; and
- one verdict: `GO`, `GO-WITH-FOLLOW-UP`, or `NO-GO`.

`GO` permits merge only as an unissued, non-authoritative G4 actual-execution trace
candidate. It does not approve a G4 mathematical-truth bound, tail or interval
composition, supported pair or df range, trace resource bound, supported execution,
platform, domain, runtime, Public Check, bundle, R2-D5 completion, or Release 2.
