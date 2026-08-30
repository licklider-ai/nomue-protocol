# R2-D5 runtime-input and reason-code candidate adversarial review protocol

## Commission

Perform an independent, adversarial, delta-scoped review of the Release 2 paired-t
runtime-input and reason-code candidate. The review target is the implementation
commit identified below. The review must decide whether that exact commit may remain
in the repository as non-authoritative R2-D5 decision-preparation material.

This is not a review of a supported runtime, an issued reason-code registry, a final
supported domain, or Release 2 publication. A `GO` permits merge only in the
explicitly unissued candidate state.

## Independence and source boundary

The reviewer must be independent of the implementation authoring context and must
work from a genuine fresh clone. Do not use a private repository, private package,
unpublished implementation, or author-only scratch artifact. Repository tests may
be used as regression evidence, but each decision-bearing claim below also requires
a reviewer-owned check or direct inspection.

This increment selects no new numerical formula, error bound, statistical method,
platform guarantee, or supported-domain predicate. No additional external
methodology research is expected unless the reviewer finds that the proposed public
code spellings silently introduce new statistical or numerical meaning.

## Exact review target

- Implementation commit:
  `b4bf4195b93935c2da87d7f20994328f32b5c1da`
- Implementation tree:
  `69e141b010f3c9dfa90cdac87941c817810f24ca`
- Sole parent / baseline:
  `8c0ad51f88f5b517f3fcf45e508282ea6beb8ecf`
- Baseline identity: merge of PR #49
- Expected implementation delta: exactly 13 paths, 999 insertions, 45 deletions

The public review-input commit will add only this protocol to the implementation
commit. Record both commits, both trees, their parent relationship, and the exact
delta before reviewing semantics. A mismatch is a blocker.

The implementation paths are:

1. `governance/drafts/release-2-candidate/README.md`
2. `governance/drafts/release-2-candidate/numerical/README.md`
3. `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
4. `governance/drafts/release-2-candidate/numerical/runtime-input-reason-code-candidate.json`
5. `governance/drafts/release-2-steward-ratification-package.md`
6. `tooling/r2-paired-t-runtime-series/README.md`
7. `tooling/src/spikes/paired-t-numerical-readiness.ts`
8. `tooling/src/spikes/paired-t-runtime-input-reason-code-candidate.ts`
9. `tooling/src/spikes/paired-t-runtime-table-integration-candidate.ts`
10. `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`
11. `tooling/tests/paired-t-numerical-readiness.test.ts`
12. `tooling/tests/paired-t-runtime-input-reason-code-candidate.test.ts`
13. `tooling/tests/paired-t-runtime-table-integration-candidate.test.ts`

## Required repository context

Read at least:

- `AGENTS.md`;
- `CHARTER.md`;
- `AUTHORITY.md`;
- `governance/RFC.md`;
- `governance/ID-POLICY.md`;
- `governance/drafts/release-2-foundation-and-paired-t-rfc.md`;
- `governance/drafts/release-2-steward-ratification-package.md`;
- `governance/drafts/release-2-candidate/protocol-identifiers.json`;
- `governance/drafts/release-2-candidate/numerical/README.md`;
- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`;
- `governance/drafts/release-2-candidate/numerical/support-domain-candidate.json`;
- `governance/drafts/release-2-candidate/numerical/numerical-contract-candidate.json`;
- `governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json`;
- `governance/drafts/release-2-candidate/reviews/d5-support-domain-predicate-adversarial-review-disposition.md`;
- `governance/drafts/release-2-candidate/reviews/d5-numerical-contract-decision-candidate-adversarial-review-disposition.md`;
- `governance/drafts/release-2-candidate/reviews/d5-truth-error-support-closure-adversarial-review-disposition.md`;
- `review-inputs/r2-d5-truth-error-support-repair-close/REVIEW-RESULT.md`;
- `reference/spikes/paired-t.ts`;
- all changed implementation and test files.

Confirm that public RFC issue #25 remains open. Its state does not authorize support
or issuance during this review.

## Review questions

### A. Closed input contract

Independently verify that `parsePairedTCandidateEvaluationInput` accepts only an
object with exactly two own, enumerable data properties named
`degreesOfFreedom` and `testStatistic`, both having Number values.

At minimum, test:

- ordinary objects, reversed insertion order, frozen objects, and null-prototype
  data objects as valid controls;
- missing, extra, non-enumerable, and symbol keys;
- required properties inherited from a prototype;
- valid own keys on a custom prototype;
- getters, setters, and throwing accessors, proving that no accessor is invoked;
- arrays, functions, boxed values, dates, maps, sets, and typed arrays;
- proxies that throw from `getPrototypeOf`, `ownKeys`, or property-descriptor traps;
- non-number field values, `NaN`, infinity, negative zero, non-integer df, and df
  outside the evidence range; and
- cyclic or otherwise hostile meta-objects.

Distinguish shape parsing from later value validation: exact two-number shape may
parse even when the downstream graph must refuse the numeric values. No malformed or
hostile value may throw an uncaught exception.

Both public candidate entrypoints must use the same parser:

- table integration returns `invalid_candidate_input`; and
- truth-error evaluation returns `runtime_graph_refusal` with
  `graphClassification: invalid_candidate_input` and both support claims false.

No extra or inherited property may reach the graph. No rejected input may produce a
candidate support claim.

### B. Valid-input behavior invariance

Use a reviewer-owned corpus to compare the implementation commit with its parent.
Exercise every integer df from 1 through 200 and include, at minimum:

- positive and negative zero handling;
- the two adjacent binary64 values around `|t| = 1` and exactly `1`;
- minimum subnormal and minimum normal values;
- ordinary central and tail values;
- `t = 20`, the pinned `t = 50.4` high-error witness, and maximum finite binary64;
- odd and even df, df 1 and 2 closed forms, the longest-series neighborhood, and
  branch-boundary values.

For valid plain two-field inputs, require exact equality before and after the change
for the complete table-integration and truth-error results: branch, p-value bits,
iteration count, cap, proof values, projection margin, normalization metadata, and
every refusal classification. Any non-input-contract difference is a blocker.

Confirm separately that the reviewed inverse-beta table bytes, fixed-95 table
candidate, truth-error checkpoint, runtime-table checkpoint, evidence manifests,
and authority snapshot are unchanged.

### C. Operation-stage reason-code subset

Cross-bind the eleven selected mappings against the reviewed support-domain
candidate:

- the ten active predicates appear once and in the same ordinal order;
- the defensive `NON_FINITE_INTERMEDIATE` postcondition appears once as ordinal 11;
- each source error, failure class, and readiness key matches exactly;
- all candidate codes are unique and satisfy the existing reason-code lexical form;
- every mapping names the unissued `paired_t_computability_check` candidate; and
- every mapping remains `candidate_unissued`.

Evaluate the spellings adversarially. Flag ambiguity, misleading stage ownership,
collision with an existing registered code, accidental aliasing, or a spelling that
would be unsuitable for immutable issuance. The mappings may specialize the exact
reviewed operation-stage failures; they must not silently redefine an existing code
or claim that the complete Release 2 code inventory is present.

Confirm that none of the candidate spellings appears in the authoritative
`registries/reason-codes.yaml`, authoritative specifications, schemas, conformance
artifacts, or generated authority views.

### D. Taxonomy boundary

Verify the three-way separation:

1. selected unissued code candidates for the reviewed operation-stage subset;
2. delegated or internal-only candidate classifications; and
3. support-dependent reason-code decisions with `candidate_reason_code: null`.

Specifically verify:

- `non_finite_candidate_intermediate` delegates to the reviewed
  `NON_FINITE_INTERMEDIATE` postcondition rather than creating a duplicate code;
- `runtime_graph_refusal` delegates to `graphClassification` rather than erasing the
  underlying cause;
- malformed input, missing candidate-table data, proof-graph divergence, negative
  zero output, and invalid probability output are not mislabeled as Record-caused
  Public Check failures; and
- Profile admissibility, Record validation, and declared-result comparison code
  families are explicitly outside this numerical increment.

Search every classification emitted by the current paired-t spike, numerical
contract helper, runtime graph, table integration, projection helper, and truth-error
evaluator. Report any current classification that is falsely represented, silently
lost, or placed in the wrong ownership category.

### E. Deferred decisions

Require exactly ten explicit deferred decisions, each with a null code and a truthful
blocker:

1. final supported df range;
2. supported positive-series iteration bound;
3. truth-error proof precondition;
4. truth-error bound formation;
5. projection margin;
6. positive subnormal p-value;
7. positive p-value not representable in binary64;
8. confidence-interval endpoint collapse;
9. supported-platform predicate; and
10. subnormal-intermediate first-failure order.

Attempt to promote any one of them, fill a code, remove or reorder an entry, weaken a
blocker, or reduce the declared count. Every mutation must fail validation and must
not activate runtime support.

### F. Validator and hostile checkpoint attacks

Build a reviewer-owned coherent mutation harness. At minimum mutate:

- every top-level checkpoint field;
- every field of every selected, delegated, internal-only, and deferred entry;
- candidate-code uniqueness, lexical form, ordering, and check ownership;
- input-contract key names and refusal dispositions;
- inventory-scope completeness claims;
- support, issuance, final-freeze, and authority flags;
- unknown, missing, inherited, accessor, symbol, and non-JSON fields; and
- cyclic objects and throwing proxies.

The validator must reject every real mutation, accept an unchanged deep copy, and
return a deterministic nonempty error without throwing. Do not count a rejection for
an unrelated harness defect as evidence for the intended mutation.

### G. Readiness, documentation, and authority

Confirm that the readiness checkpoint records only:

- an incomplete candidate;
- the exact artifact and validator paths;
- the exact-own-data-key input contract;
- eleven selected operation-stage code candidates;
- ten deferred code decisions;
- no final reason-code freeze; and
- no runtime support.

Documentation must distinguish a candidate spelling from issuance and the reviewed
operation-stage subset from a complete Release 2 inventory. It must not claim a
supported domain, selected platform, selected truth-error predicate, final table,
Public Check, bundle, R2-D5 completion, or Release 2 publication.

Confirm that the delta changes no authoritative registry, normative specification,
schema, conformance expectation, generated artifact, Release 1 path, or reference
verifier dispatch. Recompute the authority snapshot hash.

## Required regression execution

In the fresh clone, record Node and pnpm versions and run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

Also run the focused runtime-input, table-integration, truth-error, and numerical-
readiness tests. If the ordinary command is blocked by a reviewer-environment IPC
restriction, record the exact error and run every underlying entrypoint through an
equivalent non-IPC invocation. Repository failures unrelated to the environment are
findings.

The final checkout must be clean.

## Verdict rule

Return `GO` only if:

- identity and the 13-path delta are exact;
- valid-input behavior is unchanged;
- both entrypoints enforce the shared closed input shape without exceptions;
- all eleven code candidates are correctly and uniquely bound;
- delegated, internal-only, outside-increment, and deferred categories are truthful;
- all promotion and hostile-input attacks fail closed;
- authority and Release 1 remain unchanged; and
- the full repository checks pass.

Return `NO-GO` for any behavior regression, accessor execution, uncaught exception,
accepted extra or inherited input, reason-code collision or semantic
misclassification, missing support-dependent decision, promotion path, authority
leak, unexpected delta, or failed regression.

Classify findings as `BLOCKER`, `SHOULD-FIX`, or `NICE-TO-HAVE`. State whether any
new primary-source research is required before repair or promotion.

Even a `GO` does not issue a reason code, freeze the final code inventory, select a
truth-error predicate, select a supported df or platform, activate paired-t support,
issue a Public Check or bundle, complete R2-D5, close issue #25, or publish Release 2.

## Review artifact

Write the result in English to:

`review-inputs/r2-d5-runtime-input-reason-code-candidate/REVIEW-RESULT.md`

Create a neutral reviewer branch from the public review-input commit, for example:

`review/r2-d5-runtime-input-reason-code-b4bf419`

Commit and push only the review result. Do not modify implementation files. Record
the exact implementation commit, implementation tree, baseline, review-input commit,
review-result commit, commands, environment, mutation counts, invariance corpus, all
findings, and the limited verdict.
